/** Four logical signup steps. First payment belongs to step four. */

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ShieldCheck, ArrowRight, Loader, Check, AlertCircle, AlertTriangle, ChevronDown, FileText, ChevronRight, Info } from 'lucide-react';
import zxcvbn from 'zxcvbn';
import { useNavigate, Link } from 'react-router-dom';
import { SMH_API_URL } from '@/lib/supabaseClient';
import { useSystemStatus } from '@/hooks/useSystemStatus';
import { fetchActiveConsents, ConsentFetchError } from '@/lib/consents';
import ConsentModal from '@/components/ConsentModal';
import './OpretForeningOnboarding.css';
import SignupPlanChoice from '@/components/SignupPlanChoice';
import SignupCheckout from '@/components/SignupCheckout';
import {readSignupDraft,saveSignupDraft,SIGNUP_DRAFT_KEY} from '@/lib/signup-draft';
import {signupPlan} from '@/lib/signup-plans';
import {PASSWORD_MIN_LENGTH as MIN_PASSWORD_LENGTH} from '../../../shared/account-policy';
import {SIGNUP_LOGIN_URL} from '@/lib/signup-transition';

// Brand color tokens
const BRAND_TEAL = '#0891B2';
const BRAND_TEAL_DARK = '#0e7490';

// OTP konfiguration (matcher smh-api)
const OTP_LENGTH = 8;
const RESEND_COOLDOWN_SECONDS = 30;

/**
 * Map ConsentFetchError codes til danske beskeder for visning til bruger.
 * ABORTED returnerer tom streng (caller skal ikke vise besked).
 */
function mapConsentErrorToMessage(err) {
  if (!(err instanceof ConsentFetchError)) {
    return 'Der opstod en fejl. Prøv at genindlæse siden.';
  }
  switch (err.code) {
    case 'TIMEOUT':
      return 'Forbindelsen tog for lang tid. Tjek dit internet og prøv igen.';
    case 'NETWORK_ERROR':
      return 'Kunne ikke forbinde til serveren. Tjek din internetforbindelse.';
    case 'SUPABASE_ERROR':
      return 'Server-fejl ved indlæsning af samtykke-tekster. Prøv igen om lidt.';
    case 'INVALID_RESPONSE':
    case 'MISSING_CONSENTS':
      return 'Samtykke-tekster er ikke tilgængelige. Kontakt support.';
    case 'ABORTED':
      return '';
    default:
      return 'Der opstod en fejl. Prøv at genindlæse siden.';
  }
}

// =====================================================
// S66 E2-fix: valideringshjaelpere (laa i den fjernede style-tail,
// men bruges live i trin 3). Genindsat byte-eksakt fra commit 1fd5792.
// =====================================================
const CVR_REGEX = /^\d{8}$/;
const POSTNUMMER_REGEX = /^\d{4}$/;
const TLF_REGEX = /^\d{8}$/;
const MIN_PASSWORD_SCORE = 3;

const computePasswordScore = (password) => {
  if (!password || password.length === 0) return -1;
  if (password.length < 4) return 0;
  try {
    const result = zxcvbn(password);
    return result.score;
  } catch {
    return 0;
  }
};

const validateStep3Field = (name, value) => {
  const trimmed = (value || '').trim();

  if (name === 'foreningsnavn') {
    if (trimmed.length < 2) return 'Foreningsnavnet skal være mindst 2 tegn';
    if (trimmed.length > 200) return 'Foreningsnavnet må højst være 200 tegn';
    return null;
  }

  if (name === 'cvrNummer') {
    if (!CVR_REGEX.test(trimmed)) return 'CVR-nummer skal være præcis 8 cifre';
    return null;
  }

  if (name === 'postnummer') {
    if (!POSTNUMMER_REGEX.test(trimmed)) return 'Postnummer skal være præcis 4 cifre';
    return null;
  }

  if (name === 'kontaktNavn') {
    if (trimmed.length < 2) return 'Navn skal være mindst 2 tegn';
    if (trimmed.length > 200) return 'Navn må højst være 200 tegn';
    return null;
  }

  if (name === 'kontaktRolle') {
    if (trimmed !== 'Formand' && trimmed !== 'Kasserer') {
      return 'Vælg enten Formand eller Kasserer';
    }
    return null;
  }

  if (name === 'kontaktTlf') {
    if (!TLF_REGEX.test(trimmed)) return 'Telefonnummer skal være præcis 8 cifre';
    return null;
  }

  return null;
};

const validateStep3Password = (password) => {
  if (!password || Array.from(password).length < MIN_PASSWORD_LENGTH) {
    return `Adgangskode skal være mindst ${MIN_PASSWORD_LENGTH} tegn`;
  }
  if (password.length > 128) {
    return 'Adgangskode må højst være 128 tegn';
  }
  try {
    const result = zxcvbn(password);
    if (result.score < MIN_PASSWORD_SCORE) {
      return 'Adgangskoden er for svag - tilføj flere tegn eller gør den mindre forudsigelig';
    }
  } catch {
    return 'Adgangskoden kunne ikke valideres';
  }
  return null;
};

export default function OpretForeningPage({purchaseApi=null,onPurchaseContinue}) {
  const navigate = useNavigate();
  const status = useSystemStatus();

  // Step state
  const [step, setStep] = useState(1);
  const [emailStage,setEmailStage]=useState('address');
  const [emailVerified,setEmailVerified]=useState(false);
  const contentRef=useRef(null);
  const otpLock=useRef(false);
  const emailEpoch=useRef(0);
  const cvrRequest=useRef(0);
  const [savedDraft,setSavedDraft]=useState(()=>{try{return readSignupDraft(window.localStorage);}catch{return null;}});
  const [draftNotice,setDraftNotice]=useState('');

  // Step 1: email
  const [email, setEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Step 2: OTP-indtastning
  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [_otpRemainingAttempts, setOtpRemainingAttempts] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const otpInputRefs = useRef([]);

  // ===========================================================================
  // STEP 3: Konsent-versioner (fetched ved mount)
  // ===========================================================================

  // Indexed by consent_type. Null indtil fetch er færdig.
  const [consentVersions, setConsentVersions] = useState(null);
  const [consentLoading, setConsentLoading] = useState(true);
  const [consentError, setConsentError] = useState('');

  // Step 3 form-state: 8 felter
  const [foreningsnavn, setForeningsnavn] = useState('');
  const [cvrNummer, setCvrNummer] = useState('');
  // P1-CVR-001: CVR lookup state
  // status: 'idle' | 'loading' | 'active' | 'inactive' | 'not_found' | 'error'
  const [cvrLookupState, setCvrLookupState] = useState({ status: 'idle' });
  const [postnummer, setPostnummer] = useState('');
  const [kontaktNavn, setKontaktNavn] = useState('');
  const [kontaktRolle, setKontaktRolle] = useState('Formand');
  // S66 E2-fix: ROLES (var i den fjernede style-tail, hoerer til her)
  const ROLES = ['Formand', 'Kasserer'];
  const [kontaktTlf, setKontaktTlf] = useState('');
  const [roleOpen, setRoleOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Step 3 consent-checkboxes (3 obligatoriske + 1 marketing UNCHECKED default)
  const [consentTermsChecked, setConsentTermsChecked] = useState(false);
  const [consentGdprChecked, setConsentGdprChecked] = useState(false);
  const [consentPiiChecked, setConsentPiiChecked] = useState(false);
  const [consentMarketingChecked, setConsentMarketingChecked] = useState(false);
  const [aftaleAccepteret, setAftaleAccepteret] = useState(false);
  const [aftaleTemplateUuid, setAftaleTemplateUuid] = useState(null);
  const [aftaleVersion, setAftaleVersion] = useState(null);
  const [aftaleModalOpen, setAftaleModalOpen] = useState(false);
  const [aftaleLoading,setAftaleLoading]=useState(true);
  const [aftaleError,setAftaleError]=useState('');

  // Step 3 submit state
  const submitLoading=false,signupComplete=false,signupUncertain=false;
  const [fieldErrors, setFieldErrors] = useState({});

  // Modal state: hvilken consent-type er åben (null = ingen modal aktiv)
  const [activeModalType, setActiveModalType] = useState(null);

  // --- S66 O3: additive state (roerer ikke eksisterende hooks) ---
  // Trin 6 binding-valg (persisteres juridisk via signup-payload)
  const [binding, setBinding] = useState('');
  const [product, setProduct] = useState('donationer');

  const discardDraft=()=>{try{window.localStorage.removeItem(SIGNUP_DRAFT_KEY);}catch{}setSavedDraft(null);};
  const saveDraft=()=>{try{saveSignupDraft(window.localStorage,{email,foreningsnavn,cvrNummer,postnummer,kontaktNavn,kontaktRolle,kontaktTlf,product,binding});setDraftNotice('Kladde gemt på denne enhed i op til 7 dage. Åbn oprettelsen igen for at fortsætte. Adgangskode og accepter gemmes ikke.');}catch{setDraftNotice('Browseren kunne ikke gemme kladden. Hold siden åben for at bevare oplysningerne.');}};
  const restoreDraft=()=>{if(!savedDraft)return;setEmail(savedDraft.email);setForeningsnavn(savedDraft.foreningsnavn);setCvrNummer(savedDraft.cvrNummer);setPostnummer(savedDraft.postnummer);setKontaktNavn(savedDraft.kontaktNavn);setKontaktRolle(savedDraft.kontaktRolle||'Formand');setKontaktTlf(savedDraft.kontaktTlf);setProduct(savedDraft.product);setBinding(savedDraft.binding);setSavedDraft(null);setDraftNotice('Kladden er hentet. Bekræft e-mailen igen, og vælg en adgangskode. Dokumenterne skal accepteres på ny.');};

  async function loadConsents(signal){
    setConsentLoading(true);setConsentError('');
    setConsentTermsChecked(false);setConsentGdprChecked(false);setConsentPiiChecked(false);setConsentMarketingChecked(false);
    try{const versions=await fetchActiveConsents({signal});if(!signal?.aborted)setConsentVersions(versions);}
    catch(err){if(!signal?.aborted){setConsentVersions(null);setConsentError(mapConsentErrorToMessage(err));}}
    finally{if(!signal?.aborted)setConsentLoading(false);}
  }
  useEffect(()=>{const controller=new AbortController();loadConsents(controller.signal);return()=>controller.abort();},[]);
  // A material change invalidates acceptance of the previous review.
  useEffect(()=>{setAftaleAccepteret(false);},[product,binding,email,kontaktNavn,kontaktRolle,cvrNummer,foreningsnavn,postnummer,kontaktTlf]);
  useEffect(()=>{
    if(step===1&&emailStage==='code')return;
    const heading=contentRef.current?.querySelector('h2');
    heading?.setAttribute('tabindex','-1');heading?.focus({preventScroll:true});
    contentRef.current?.scrollIntoView?.({block:'start',behavior:'instant'});
  },[step,emailStage]);

  // A failed agreement load must have a self-service retry and no stale acceptance.
  async function loadAgreement(signal){
    setAftaleLoading(true);setAftaleError('');setAftaleAccepteret(false);setAftaleTemplateUuid(null);setAftaleVersion(null);
    try{
      const response=await fetch(`${SMH_API_URL}/api/forening/aftale/skabelon`,{signal});
      if(!response.ok)throw Error('agreement');
      const data=await response.json();
      if(!data?.template_uuid||!data?.content||!data?.version)throw Error('agreement');
      if(signal?.aborted)return;
      setAftaleTemplateUuid(data.template_uuid);setAftaleVersion({title:data.title,version:data.version,content_markdown:data.content,effective_from:null});
    }catch{if(!signal?.aborted)setAftaleError('Samarbejdsaftalen kunne ikke hentes. Prøv igen; jeres oplysninger er bevaret.');}
    finally{if(!signal?.aborted)setAftaleLoading(false);}
  }
  useEffect(()=>{const controller=new AbortController();loadAgreement(controller.signal);return()=>controller.abort();},[]);

  // Modal handlers
  const openConsentModal = (consentType) => {
    setActiveModalType(consentType);
  };

  // Patch 6: Real onAccept handler - tikker checkbox baseret på consent_type
  const handleConsentAccept = (consentType) => {
    if (consentType === 'platform_terms') setConsentTermsChecked(true);
    else if (consentType === 'gdpr_terms') setConsentGdprChecked(true);
    else if (consentType === 'pii_consent') setConsentPiiChecked(true);
    else if (consentType === 'marketing_consent') setConsentMarketingChecked(true);
    closeConsentModal();
  };

    const closeConsentModal = () => {
    setActiveModalType(null);
  };

  // ===========================================================================
  // STEP 1: Send OTP-kode
  // ===========================================================================
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setEmailError('');

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Indtast en gyldig email-adresse.');
      return;
    }

    setEmailLoading(true);
    try {
      const response = await fetch(`${SMH_API_URL}/api/auth/otp/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setEmailError(data.message || 'For mange forsøg. Vent et øjeblik og prøv igen.');
        } else {
          setEmailError(data.message || 'Kunne ikke sende kode. Prøv igen.');
        }
        setEmailLoading(false);
        return;
      }

      // Success: gå videre til Step 2
      setEmail(trimmed);
      setEmailVerified(false);setEmailStage('code');
      setResendCooldown(RESEND_COOLDOWN_SECONDS);                  // start cooldown timer
    } catch (err) {
      console.error('OTP request failed:', err);
      setEmailError('Netværksfejl. Tjek din forbindelse og prøv igen.');
    } finally {
      setEmailLoading(false);
    }
  };

  // ===========================================================================
  // STEP 2: OTP-indtastning + verify
  // ===========================================================================

  // Resend cooldown timer
  useEffect(() => {
    if (step !== 1 || emailStage !== 'code' || resendCooldown <= 0) return;

    const timer = setTimeout(() => {
      setResendCooldown((s) => s - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [step, emailStage, resendCooldown]);

  // Auto-fokus paa foerste input naar vi entrerer Step 2
  useEffect(() => {
    if (step === 1 && emailStage === 'code' && otpInputRefs.current[0]) {
      otpInputRefs.current[0].focus();
    }
  }, [step,emailStage]);

  // One full-width field supports keyboard, paste and native one-time-code autofill.
  const handleOtpInput=value=>{const code=value.replace(/\D/g,'').slice(0,OTP_LENGTH);setOtpDigits(Array.from({length:OTP_LENGTH},(_,i)=>code[i]||''));setOtpError('');if(code.length===OTP_LENGTH)handleVerifyOtp(code);};

  /**
   * Handle paste-event
   * - Hvis bruger paster en 8-cifret kode, fordel ud paa alle bokse
   */
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);

    if (pasted.length === 0) return;

    const newDigits = Array(OTP_LENGTH).fill('');
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setOtpDigits(newDigits);

    // Fokus til sidste indsatte boks (eller sidste hvis fuld kode)
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    otpInputRefs.current[focusIndex]?.focus();

    // Auto-submit hvis fuld kode
    if (pasted.length === OTP_LENGTH) {
      handleVerifyOtp(pasted);
    }
  };

  /**
   * Verify OTP-koden mod backend
   */
  const handleVerifyOtp = async (code) => {
    if(otpLock.current)return;
    otpLock.current=true;const epoch=emailEpoch.current;
    setOtpError('');
    setOtpLoading(true);

    try {
      const response = await fetch(`${SMH_API_URL}/api/auth/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();
      if(epoch!==emailEpoch.current)return;

      if (!response.ok) {
        // Auto-clear felter ved fejl + fokus til foerste boks
        setOtpDigits(Array(OTP_LENGTH).fill(''));
        otpInputRefs.current[0]?.focus();

        if (response.status === 401 && data.remaining_attempts !== undefined) {
          setOtpRemainingAttempts(data.remaining_attempts);
          setOtpError(data.message || `Forkert kode. ${data.remaining_attempts} forsoeg tilbage.`);
        } else if (response.status === 429) {
          setOtpError(data.message || 'For mange forsøg. Start forfra med ny email.');
          setOtpRemainingAttempts(0);
        } else if (response.status === 404) {
          setOtpError(data.message || 'Koden er udløbet. Klik "Send ny kode" for at få en ny.');
        } else {
          setOtpError(data.message || 'Verifikation fejlede. Prøv igen.');
        }
        setOtpLoading(false);
        return;
      }

      // Success: ga til Step 3
      setEmailVerified(true);setEmailStage('verified');setOtpDigits(Array(OTP_LENGTH).fill(''));setStep(2);
    } catch (err) {
      console.error('OTP verify failed:', err);
      setOtpError('Netværksfejl. Tjek din forbindelse og prøv igen.');
      setOtpDigits(Array(OTP_LENGTH).fill(''));
      otpInputRefs.current[0]?.focus();
    } finally {
      setOtpLoading(false);otpLock.current=false;
    }
  };

  /**
   * Resend OTP-kode (genbruger Step 1 logik)
   */
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;

    setOtpError('');
    setOtpDigits(Array(OTP_LENGTH).fill(''));
    setEmailLoading(true);

    try {
      const response = await fetch(`${SMH_API_URL}/api/auth/otp/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setOtpError(data.message || 'Kunne ikke sende ny kode. Prøv igen.');
      } else {
        setResendCooldown(RESEND_COOLDOWN_SECONDS);
        setOtpRemainingAttempts(null);
        otpInputRefs.current[0]?.focus();
      }
    } catch {
      setOtpError('Netværksfejl ved gensendelse.');
    } finally {
      setEmailLoading(false);
    }
  };
  // ===================================================
  // Step 3 (Patch 4 - DEL B): canSubmit + submit handler
  // ===================================================

  const canSubmitStep3 = () => {
    if (submitLoading) return false;
    if (validateStep3Field('foreningsnavn', foreningsnavn)) return false;
    if (validateStep3Field('cvrNummer', cvrNummer)) return false;
    // P1-CVR-001: Bloker submit hvis CVR-lookup endnu ikke faerdig eller ugyldig
    if (cvrLookupState.status === 'loading' ||
        cvrLookupState.status === 'inactive' ||
        cvrLookupState.status === 'not_found') return false;
    if (validateStep3Field('postnummer', postnummer)) return false;
    if (validateStep3Field('kontaktNavn', kontaktNavn)) return false;
    if (validateStep3Field('kontaktRolle', kontaktRolle)) return false;
    if (validateStep3Field('kontaktTlf', kontaktTlf)) return false;
    if (validateStep3Password(password)) return false;
    return true;
  };

  // P1-CVR-001: CVR lookup via /cvr/lookup endpoint
  // Trigger: onBlur (kun naar CVR er 8 cifre)
  const handleCvrBlur = async () => {
    // Reset hvis ikke 8 cifre
    if (!/^\d{8}$/.test(cvrNummer)) {
      setCvrLookupState({ status: 'idle' });
      return;
    }

    const request=++cvrRequest.current;
    setCvrLookupState({ status: 'loading' });

    try {
      const res = await fetch(`${SMH_API_URL}/cvr/lookup?cvr=${cvrNummer}`);

      if(request!==cvrRequest.current)return;
      if (!res.ok) {
        // 5xx = backend/cvrapi nede - tillad signup, vis warning
        setCvrLookupState({ status: 'error' });
        return;
      }

      const data = await res.json();
      if(request!==cvrRequest.current)return;

      if (data.valid && data.active) {
        // Aktiv forening - auto-fill foreningsnavn HVIS tomt
        setCvrLookupState({
          status: 'active',
          foreningsnavn: data.foreningsnavn,
          postnummer: data.postnummer,
        });
        // Per beslutning B: kun auto-fill hvis tomt (respekter brugerens input)
        if (!foreningsnavn.trim()) {
          setForeningsnavn(data.foreningsnavn);
        }
        // S66 F1: auto-fill postnr fra CVR (redigerbart, kun hvis tomt + leveret)
        if (data.postnummer && !postnummer.trim()) {
          setPostnummer(data.postnummer);
        }
      } else if (data.valid && !data.active) {
        // Ophoert/inaktiv forening - bloker signup (compliance)
        setCvrLookupState({ status: 'inactive' });
      } else {
        // Ikke fundet i CVR-registret
        setCvrLookupState({ status: 'not_found' });
      }
    } catch (err) {
      // Ignore a previous lookup after the CVR changed.
      if(request!==cvrRequest.current)return;
      setCvrLookupState({ status: 'error' });
    }
  };

  const purchasePayload = () => {
    const selectedPlan=signupPlan(product,binding);
    if(!selectedPlan||!emailVerified||!canSubmitStep3()||!aftaleAccepteret||!aftaleTemplateUuid||!consentVersions||!consentTermsChecked||!consentGdprChecked||!consentPiiChecked)throw Error('Incomplete review');
    return {
      email,password,foreningsnavn:foreningsnavn.trim(),cvr_nummer:cvrNummer.trim(),
      kontaktperson_navn:kontaktNavn.trim(),kontaktperson_rolle:kontaktRolle,kontaktperson_tlf:kontaktTlf.trim(),
      aftale_template_uuid:aftaleTemplateUuid,aftale_accepted:true,aftale_signer_name:kontaktNavn.trim(),
      aftale_signer_role:kontaktRolle,postnummer:postnummer.trim(),
      consent_terms_id:consentVersions.platform_terms?.id,consent_gdpr_id:consentVersions.gdpr_terms?.id,
      consent_pii_id:consentVersions.pii_consent?.id,
      consent_marketing_id:consentMarketingChecked?consentVersions.marketing_consent?.id||null:null,
      abonnement_produkt:selectedPlan.product,abonnement_binding:selectedPlan.binding,
      abonnement_maanedspris:selectedPlan.monthlyAmount,
    };
  };
  const purchaseEligible=emailVerified&&canSubmitStep3()&&!!signupPlan(product,binding)&&!!aftaleAccepteret&&!!aftaleTemplateUuid&&!!consentVersions&&consentTermsChecked&&consentGdprChecked&&consentPiiChecked;

  // ===========================================================================
  // Render
  // ===========================================================================
  // --- S66 O3 (Edit D): CD .ofo-design wired til eksisterende state/handlers ---
  const ofoH = { margin: '0 0 8px', fontSize: 'clamp(20px,2.6vw,24px)', fontWeight: 800, letterSpacing: '-.5px', color: 'var(--ink)' };
  const ofoP = { margin: '0 0 20px', fontSize: 14.5, lineHeight: 1.6, color: 'var(--body)' };
  const ofoFieldErr = { marginTop: 7, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--brand)' };
  const ofoCvrRow = (color) => ({ marginTop: 9, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, fontWeight: 600, color });
  const ofoRail = [['E-mail', 1], ['Forening', 2], ['Løsning', 3], ['Gennemgå', 4]];
  const ofoPct = (step / 4) * 100;
  const pwMeter = [
    { color: '#EF4444', label: 'Meget svag' },
    { color: '#F97316', label: 'Svag' },
    { color: '#EAB308', label: 'Mellem' },
    { color: '#14B8A6', label: 'God' },
    { color: '#0891B2', label: 'Stærk' },
  ];
  const pwScore = password.length === 0 ? -1 : computePasswordScore(password);

  return (
    <div className="ofo-page">
      {/* Minimal top-bar */}
      <header className="ofo-topbar">
        <div className="ofo-wrap ofo-topbar-inner">
          <button type="button" className="ofo-back" disabled={submitLoading||signupComplete||signupUncertain} onClick={() => {if(step===1&&emailStage==='code'){++emailEpoch.current;setEmailStage('address');setEmailVerified(false);setOtpDigits(Array(OTP_LENGTH).fill(''));}else if(step===1)navigate('/opret-forening');else setStep(step-1);}} aria-label="Tilbage">
            <ArrowLeft size={18} /> Tilbage
          </button>
          <Link to="/" className="ofo-wordmark">StøtMedHjerte<sup>™</sup></Link>
          <Link to="/opret-forening" className="ofo-cancel" aria-label="Afbryd oprettelse">Afbryd</Link>
        </div>
      </header>

      {/* Wizard */}
      <main className="ofo-wrap ofo-main">
        {savedDraft&&<aside className="ofo-draft"><p>Der ligger en gemt oprettelse på denne enhed.</p><div className="ofo-draft-actions"><button type="button" className="ofo-linkbtn" onClick={restoreDraft}>Fortsæt gemt oprettelse <ArrowRight size={16}/></button><button type="button" className="ofo-linkbtn" onClick={discardDraft}>Slet kladde</button></div></aside>}
        <div className="ofo-frame">
          <div className="ofo-frame-header">
            <div className="ofo-frame-head-row">
              <div>
                <div className="ofo-kicker">Opret forening</div>
                <div className="ofo-stepcount">Trin {step} af {ofoRail.length}</div>
              </div>
              <span className="ofo-securebadge"><ShieldCheck size={13} /> Sikker oprettelse</span>
            </div>
            {/* Rail */}
            <div className="ofo-rail" aria-label="Oprettelsens fire trin">
              {(() => {
                const out = [];
                ofoRail.forEach((st, idx) => {
                  const n = st[1];
                  const done = step > n;
                  const cur = step === n;
                  out.push(
                    <div key={'n' + n} className="ofo-rail-node" aria-current={cur?'step':undefined}>
                      {done ? (
                        <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--success)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={15} /></span>
                      ) : (
                        <span style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13.5, fontWeight: 800, ...(cur ? { background: 'var(--brand)', color: '#fff', boxShadow: '0 8px 20px rgba(224,25,63,.4)' } : { background: 'rgba(255,255,255,.06)', border: '1.5px solid rgba(255,255,255,.16)', color: '#9AA8BE' }) }}>{n}</span>
                      )}
                      <span style={{ fontSize: 10, fontWeight: 600, textAlign: 'center', lineHeight: 1.2, color: (done || cur) ? '#E8EDF5' : '#9AA8BE' }}>{st[0]}</span>
                    </div>
                  );
                  if (idx < ofoRail.length - 1) {
                    out.push(<span key={'c' + n} className="ofo-rail-conn" style={{ background: step > n ? 'var(--success)' : 'rgba(255,255,255,.16)' }} />);
                  }
                });
                return out;
              })()}
            </div>
            <div className="ofo-frame-progress"><div className="ofo-frame-progress-fill" style={{ width: ofoPct + '%' }} /></div>
          </div>

          <div className="ofo-white ofo-enter" key={`${step}:${emailStage}`} ref={contentRef}>
            {/* ---- Trin 1: e-mail ---- */}
            {step === 1 && emailStage === 'address' && (
              <form onSubmit={handleSendOtp}>
                <h2 style={ofoH}>Opret din konto</h2>
                <p style={ofoP}>Vi sender en engangskode til jeres e-mail, så vi ved, at det er jer.</p>
                <label style={{ display: 'block' }}>
                  <span className="ofo-label">E-mail</span>
                  <input className="ofo-field" type="email" inputMode="email" placeholder="navn@forening.dk" value={email} onChange={(e) => {++emailEpoch.current;setEmailVerified(false);setEmail(e.target.value);}} disabled={emailLoading} autoFocus required style={emailError ? { borderColor: 'var(--brand)' } : undefined} />
                </label>
                {emailError ? <div role="alert" style={{ margin: '8px 2px 0', display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: 'var(--brand)' }}><AlertCircle size={15} />{emailError}</div> : null}
                <button type="submit" className="ofo-primary" disabled={emailLoading || !email} style={{ marginTop: 18 }}>
                  {emailLoading ? <><Loader size={16} style={{ animation: 'ofoSpin .7s linear infinite' }} /> Sender kode ...</> : <>Send bekræftelseskode <ArrowRight size={17} /></>}
                </button>
              </form>
            )}

            {step===1&&emailStage==='verified'&&<div><h2 style={ofoH}>E-mail bekræftet</h2><p style={ofoP}>{email}</p><button type="button" className="ofo-primary" onClick={()=>setStep(2)}>Fortsæt til foreningen <ArrowRight size={17}/></button><button type="button" className="ofo-linkbtn" onClick={()=>{++emailEpoch.current;setEmailVerified(false);setEmailStage('address');}}>Skift e-mail</button></div>}

            {/* ---- Trin 2: OTP (auto-verify via handleOtpChange) ---- */}
            {step === 1 && emailStage === 'code' && (
              <div>
                <h2 style={ofoH}>Indtast bekræftelseskode</h2>
                <p style={ofoP}>Vi har sendt en 8-cifret kode til <strong style={{ color: 'var(--ink)' }}>{email}</strong>. Indtast koden nedenfor.</p>
                <label className="ofo-label" htmlFor="signup-otp">Bekræftelseskode</label>
                <input id="signup-otp" ref={el=>{otpInputRefs.current[0]=el;}} className="ofo-field ofo-code-field" aria-label="Bekræftelseskode" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={OTP_LENGTH} value={otpDigits.join('')} onChange={e=>handleOtpInput(e.target.value)} onPaste={handleOtpPaste} disabled={otpLoading} aria-invalid={!!otpError} aria-describedby="signup-otp-hint"/>
                <p id="signup-otp-hint" className="ofo-note">Skriv eller indsæt alle 8 cifre. Koden bekræftes automatisk.</p>
                {otpError ? <div role="alert" style={{ margin: '12px 2px 0', display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: 'var(--brand)' }}><AlertCircle size={15} />{otpError}</div> : null}
                {otpLoading ? <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--smh-muted)' }}><Loader size={14} style={{ animation: 'ofoSpin .7s linear infinite' }} />Verificerer kode ...</div> : null}
                <div style={{ marginTop: 18, textAlign: 'center' }}>
                  {resendCooldown > 0
                    ? <span style={{ fontSize: 13, color: 'var(--smh-muted)' }}>Send ny kode om {resendCooldown}s</span>
                    : <button type="button" className="ofo-linkbtn" onClick={handleResendOtp} disabled={emailLoading}>{emailLoading ? 'Sender ...' : 'Send ny kode'}</button>}
                </div>
              </div>
            )}

            {/* ---- Trin 3: foreningsoplysninger ---- */}
            {step === 2 && (
              <div>
                <h2 style={ofoH}>Foreningsoplysninger</h2>
                <p style={ofoP}>Indtast foreningens CVR-nummer, så henter vi de officielle oplysninger. Udfyld derefter kontaktperson og adgangskode.</p>
                  <form onSubmit={(e) => { e.preventDefault(); if (canSubmitStep3()) setStep(3); }}>

                    {/* CVR-nummer: eneste org-input, resten auto-hentes */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block' }}>
                        <span className="ofo-label">CVR-nummer *</span>
                        <input className="ofo-field" value={cvrNummer} onChange={(e) => { ++cvrRequest.current;setCvrNummer(e.target.value.replace(/\D/g, '').slice(0, 8)); if (cvrLookupState.status !== 'idle') { setCvrLookupState({ status: 'idle' }); setForeningsnavn(''); setPostnummer(''); } }} onBlur={handleCvrBlur} disabled={submitLoading} placeholder="12345678" autoComplete="off" inputMode="numeric" maxLength={8} style={{ fontFamily: 'ui-monospace, monospace', ...(fieldErrors.cvrNummer ? { borderColor: 'var(--brand)' } : {}) }} />
                      </label>
                      {!fieldErrors.cvrNummer && cvrLookupState.status === 'loading' ? <div style={ofoCvrRow('var(--smh-muted)')}><Loader size={14} style={{ animation: 'ofoSpin .7s linear infinite' }} />Slår op i CVR-registret ...</div> : null}
                      {!fieldErrors.cvrNummer && cvrLookupState.status === 'inactive' ? <div style={ofoCvrRow('#B45309')}><AlertTriangle size={15} />Inaktiv eller ophørt forening. Kan ikke oprettes.</div> : null}
                      {!fieldErrors.cvrNummer && cvrLookupState.status === 'not_found' ? <div style={ofoCvrRow('var(--brand)')}><AlertCircle size={15} />CVR ikke registreret. Tjek tallet.</div> : null}
                      {!fieldErrors.cvrNummer && cvrLookupState.status === 'error' ? <div style={ofoCvrRow('#B45309')}><AlertTriangle size={15} />Kunne ikke verificere CVR lige nu. Du kan fortsætte.</div> : null}
                      {fieldErrors.cvrNummer ? <div role="alert" style={ofoFieldErr}>{fieldErrors.cvrNummer}</div> : null}
                    </div>

                    {cvrLookupState.status==='error'&&<div style={{marginBottom:20,padding:16,border:'1px solid var(--smh-border)',borderRadius:14}}><p style={ofoP}>Udfyld oplysningerne manuelt. CVR-status er endnu ikke bekræftet.</p><label style={{display:'block',marginBottom:14}}><span className="ofo-label">Foreningsnavn *</span><input className="ofo-field" value={foreningsnavn} onChange={e=>setForeningsnavn(e.target.value)} maxLength={200}/></label><label style={{display:'block'}}><span className="ofo-label">Postnummer *</span><input className="ofo-field" value={postnummer} onChange={e=>setPostnummer(e.target.value.replace(/\D/g,'').slice(0,4))} inputMode="numeric" maxLength={4}/></label></div>}

                    {/* Bekraeftelseskort: vises naar CVR er aktiv */}
                    {cvrLookupState.status === 'active' ? (
                      <div style={{ marginBottom: 20, padding: '16px 18px', borderRadius: 16, background: '#F0FDF4', border: '1px solid var(--success)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                          <Check size={16} color="#15803D" />
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#15803D' }}>Forening bekræftet i CVR-registret</span>
                        </div>
                        <div style={{ marginBottom: 14 }}>
                          <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--smh-muted)', letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: 3 }}>Foreningsnavn</span>
                          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{foreningsnavn || cvrLookupState.foreningsnavn}</div>
                        </div>
                        <label style={{ display: 'block', maxWidth: 220 }}>
                          <span className="ofo-label">Postnummer *</span>
                          <input className="ofo-field" value={postnummer} onChange={(e) => setPostnummer(e.target.value.replace(/\D/g, '').slice(0, 4))} disabled={submitLoading} placeholder="Fx 3400" inputMode="numeric" maxLength={4} style={{ background: '#fff', fontFamily: 'ui-monospace, monospace', ...(fieldErrors.postnummer ? { borderColor: 'var(--brand)' } : {}) }} />
                        </label>
                        {!postnummer.trim() && !fieldErrors.postnummer ? <div style={{ marginTop: 7, fontSize: 12, color: 'var(--smh-muted)' }}>CVR gav ikke et postnummer, udfyld det manuelt.</div> : null}
                        {fieldErrors.postnummer ? <div role="alert" style={ofoFieldErr}>{fieldErrors.postnummer}</div> : null}
                      </div>
                    ) : null}

                    {/* Kontaktperson + adgang */}
                    <div className="ofo-2col">
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block' }}>
                          <span className="ofo-label">Kontaktperson *</span>
                          <input className="ofo-field" value={kontaktNavn} onChange={(e) => setKontaktNavn(e.target.value)} disabled={submitLoading} placeholder="F.eks. Anders Hansen" maxLength={200} autoComplete="name" style={fieldErrors.kontaktNavn ? { borderColor: 'var(--brand)' } : undefined} />
                        </label>
                        {fieldErrors.kontaktNavn ? <div role="alert" style={ofoFieldErr}>{fieldErrors.kontaktNavn}</div> : null}
                      </div>

                      <div>
                        <label style={{ display: 'block' }}>
                          <span className="ofo-label">Direkte telefon *</span>
                          <div style={{ display: 'flex', alignItems: 'stretch', borderRadius: 13, border: '1px solid ' + (fieldErrors.kontaktTlf ? 'var(--brand)' : 'var(--smh-border)'), background: 'var(--surface)', overflow: 'hidden' }}>
                            <span style={{ display: 'flex', alignItems: 'center', padding: '0 13px', background: 'var(--alt)', color: 'var(--body)', fontSize: 15, fontWeight: 600, borderRight: '1px solid var(--smh-border)' }}>+45</span>
                            <input className="ofo-field" autoComplete="tel" inputMode="numeric" placeholder="12 34 56 78" value={kontaktTlf} onChange={(e) => setKontaktTlf(e.target.value.replace(/\D/g, '').slice(0, 8))} disabled={submitLoading} style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }} />
                          </div>
                        </label>
                        {fieldErrors.kontaktTlf ? <div role="alert" style={ofoFieldErr}>{fieldErrors.kontaktTlf}</div> : null}
                      </div>

                      <div>
                        <label style={{ display: 'block' }}>
                          <span className="ofo-label">Rolle i foreningen *</span>
                          <div style={{ position: 'relative' }}>
                            <select className="ofo-field" value={kontaktRolle} onChange={(e) => setKontaktRolle(e.target.value)} disabled={submitLoading} style={{ appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer', paddingRight: 38, color: kontaktRolle ? 'var(--ink)' : '#9AA8B4', ...(fieldErrors.kontaktRolle ? { borderColor: 'var(--brand)' } : {}) }}>
                              <option value="" disabled>Vælg rolle</option>
                              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                            </select>
                            <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--smh-muted)', display: 'flex' }}><ChevronDown size={16} /></span>
                          </div>
                        </label>
                        {fieldErrors.kontaktRolle ? <div role="alert" style={ofoFieldErr}>{fieldErrors.kontaktRolle}</div> : null}
                      </div>

                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block' }}>
                          <span className="ofo-label">Adgangskode *</span>
                          <div style={{ position: 'relative' }}>
                            <input className="ofo-field" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} disabled={submitLoading} placeholder={`Mindst ${MIN_PASSWORD_LENGTH} tegn`} autoComplete="new-password" maxLength={128} style={{ paddingRight: 66, fontFamily: 'ui-monospace, monospace', ...(fieldErrors.password ? { borderColor: 'var(--brand)' } : {}) }} />
                            <button type="button" className="ofo-showpw" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword?'Skjul adgangskode':'Vis adgangskode'} aria-pressed={showPassword}>{showPassword ? 'Skjul' : 'Vis'}</button>
                          </div>
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginTop: 10 }}>
                          {pwMeter.map((m, i) => (
                            <div key={i} style={{ height: 4, borderRadius: 2, background: m.color, opacity: i === pwScore ? 1 : 0.18, transition: 'opacity .2s' }} />
                          ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                          <span style={{ fontSize: 12, color: pwScore >= 3 ? '#15803D' : 'var(--smh-muted)' }}>Mindst {MIN_PASSWORD_LENGTH} tegn, niveau God eller bedre.</span>
                          {pwScore >= 0 ? <span style={{ fontSize: 12, fontWeight: 700, color: pwMeter[pwScore].color }}>{pwMeter[pwScore].label}</span> : null}
                        </div>
                        {fieldErrors.password ? <div role="alert" style={ofoFieldErr}>{fieldErrors.password}</div> : null}
                      </div>
                    </div>

                    <button type="submit" className="ofo-primary" disabled={!canSubmitStep3()} style={{ marginTop: 22 }}>
                      Fortsæt til løsning <ArrowRight size={17} />
                    </button>
                  </form>
              </div>
            )}

            {/* ---- Trin 4: Samarbejdsaftale (accept, Variant B) ---- */}
            {step === 4 && (
              <div>
                <h2 style={ofoH}>Gennemgå aftale og betal</h2>
                <p style={ofoP}>Kontrollér jeres oplysninger, læs aftalen og betal første måned. I kan rette jeres valg, før I åbner betalingsvinduet.</p>
                <div className="ofo-review-list">
                  <section><div><h3>Forening og kontakt</h3><button type="button" className="ofo-linkbtn" onClick={()=>setStep(2)} disabled={submitLoading||signupComplete||signupUncertain}>Ret oplysninger <ArrowRight size={16}/></button></div><dl><dt>Forening</dt><dd>{foreningsnavn} · CVR {cvrNummer}</dd><dt>Postnummer</dt><dd>{postnummer}</dd><dt>Kontaktperson</dt><dd>{kontaktNavn} · {kontaktRolle}</dd><dt>E-mail</dt><dd>{email}</dd><dt>Telefon</dt><dd>+45 {kontaktTlf}</dd></dl><p className="ofo-note">Du bliver foreningsadministrator og kan invitere teammedlemmer. Hvert medlem bruger sit eget login.</p></section>
                  <section><div><h3>Løsning og binding</h3><button type="button" className="ofo-linkbtn" onClick={()=>setStep(3)} disabled={submitLoading||signupComplete||signupUncertain}>Ret løsning <ArrowRight size={16}/></button></div><strong>{signupPlan(product,binding)?.title||'Vælg løsning'}</strong><p>{signupPlan(product,binding)?.monthlyAmount} kr./md. inkl. moms · {signupPlan(product,binding)?.bindingLabel}</p></section>
                </div>
                <h3 className="ofo-section-title">Samarbejdsaftale</h3>
                <p style={ofoP}>Læs aftalen for jeres valgte løsning og binding. Du accepterer på vegne af foreningen.</p>
                {aftaleError&&<div role="alert" style={{padding:16,marginBottom:20,border:'1px solid var(--brand-border)',borderRadius:14}}><p>{aftaleError}</p><button type="button" className="ofo-linkbtn" disabled={aftaleLoading} onClick={()=>loadAgreement()}>Hent aftalen igen</button></div>}
                {aftaleLoading&&<p role="status">Henter samarbejdsaftalen…</p>}
                <button type="button" onClick={() => setAftaleModalOpen(true)} disabled={!aftaleVersion} style={{ width: '100%', font: 'inherit', textAlign: 'left', cursor: aftaleVersion ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '15px 16px', borderRadius: 16, background: 'var(--brand-surface)', border: '1px solid var(--brand-border)', marginBottom: 22 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <span style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 11, background: 'var(--brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={20} /></span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>Læs samarbejdsaftalen</span>
                  </span>
                  <ChevronRight size={17} color="var(--smh-muted)" />
                </button>
                <div style={{ padding: '14px 16px', borderRadius: 14, background: 'var(--alt)', border: '1px solid var(--smh-border)', marginBottom: 18 }}>
                  <div style={{ fontSize: 12.5, color: 'var(--smh-muted)', marginBottom: 3 }}>Du accepterer på vegne af foreningen som:</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{kontaktNavn || '(dit navn)'}, {kontaktRolle}</div>
                </div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 11, cursor: 'pointer' }}>
                  <input type="checkbox" checked={aftaleAccepteret} disabled={!aftaleVersion||submitLoading||signupComplete} onChange={(e) => setAftaleAccepteret(e.target.checked)} style={{ marginTop: 3, width: 18, height: 18, flexShrink: 0, accentColor: 'var(--brand)' }} />
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink)' }}>Jeg har læst og accepterer samarbejdsaftalen på vegne af foreningen.</span>
                </label>
                    {/* Samtykke: dine 3 obligatoriske + 1 marketing */}
                    <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--smh-border)' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--smh-muted)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>Obligatoriske dokumenter</div>
                      {[
                        { type: 'platform_terms', title: 'Vilkår og betingelser', accepted: consentTermsChecked },
                        { type: 'gdpr_terms', title: 'GDPR databehandling', accepted: consentGdprChecked },
                        { type: 'pii_consent', title: 'Persondata-behandling', accepted: consentPiiChecked },
                      ].map((c) => (
                        <div key={c.type} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 14px', borderRadius: 13, border: '1px solid ' + (c.accepted ? 'var(--success)' : 'var(--smh-border)'), background: c.accepted ? '#F0FDF4' : 'var(--surface)', marginBottom: 8 }}>
                          <input id={`consent-${c.type}`} type="checkbox" checked={c.accepted} disabled={!consentVersions||submitLoading||signupComplete} onChange={e=>({platform_terms:setConsentTermsChecked,gdpr_terms:setConsentGdprChecked,pii_consent:setConsentPiiChecked}[c.type])(e.target.checked)} style={{width:18,height:18,accentColor:'var(--brand)',flexShrink:0}}/>
                          <div style={{ flex: 1 }}>
                            <label htmlFor={`consent-${c.type}`} style={{fontSize:13,fontWeight:600,color:'var(--ink)',cursor:'pointer'}}>Jeg accepterer {c.title.toLowerCase()}</label>
                            <div style={{ fontSize: 11, color: c.accepted ? '#15803D' : 'var(--smh-muted)' }}>{c.accepted ? 'Accepteret' : 'Obligatorisk'}</div>
                          </div>
                          <button type="button" className="ofo-linkbtn" onClick={() => openConsentModal(c.type)}>{c.accepted ? 'Vis igen' : 'Læs'}</button>
                        </div>
                      ))}
                      <label className="ofo-marketing"><input type="checkbox" checked={consentMarketingChecked} onChange={e=>setConsentMarketingChecked(e.target.checked)} disabled={submitLoading}/><span>Nyheder og tips fra StøtMedHjerte <small>Frivilligt · kan altid fravælges</small></span></label>
                    </div>
                {consentLoading&&<p role="status">Henter dokumenter…</p>}
                {consentError&&<div role="alert"><p>{consentError}</p><button type="button" className="ofo-linkbtn" onClick={()=>loadConsents()}>Hent dokumenterne igen</button></div>}
                <p className="ofo-note ofo-after-create"><ShieldCheck size={19} aria-hidden="true"/>Når første måned er betalt, fortsætter I til Kom godt i gang og foreningens MobilePay. I skal ikke registrere kortet igen.</p>
                <SignupCheckout api={purchaseApi} product={product} binding={binding} payload={purchasePayload} eligible={purchaseEligible} onContinue={()=>{discardDraft();setPassword('');if(onPurchaseContinue)onPurchaseContinue();else window.location.href=SIGNUP_LOGIN_URL;}}/>
                <p className="ofo-checkout-login">Har I allerede en konto eller forening? <a href={SIGNUP_LOGIN_URL}>Log ind og fortsæt jeres eksisterende forløb</a>.</p>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={e=>{e.preventDefault();if(signupPlan(product,binding))setStep(4);}}>
                <h2 style={ofoH}>Vælg jeres løsning</h2>
                <p style={ofoP}>Vælg de bidrag, I vil kunne modtage, og derefter binding. Prisen er jeres samlede abonnement hos StøtMedHjerte.</p>
                <SignupPlanChoice product={product} binding={binding} onProductChange={setProduct} onBindingChange={setBinding}/>
                <button type="submit" className="ofo-primary" disabled={!signupPlan(product,binding)}>Gennemgå aftale og betal <ArrowRight size={17}/></button>
              </form>
            )}
          </div>
        </div>
        {!signupComplete&&<div className="ofo-save"><button type="button" className="ofo-linkbtn" onClick={saveDraft} disabled={submitLoading}>Gem og fortsæt senere</button><p>Gemmer oplysninger på denne enhed. Brug kun funktionen på en enhed, du har tillid til.</p></div>}
        {draftNotice&&<div className="ofo-save"><p role="status">{draftNotice}</p></div>}
      </main>

      {/* Slim footer */}
      <footer className="ofo-foot">
        <div className="ofo-wrap ofo-foot-inner">
          <span className="ofo-foot-copy">© 2026 StøtMedHjerte</span>
          <Link to="/sikkerhed">Sikkerhed</Link>
          <Link to="/tilladelse-og-regnskab">Vilkår</Link>
          <Link to="/support">Support</Link>
        </div>
      </footer>

      {/* Consent-modal (din ConsentModal, uroert wiring) */}
      <ConsentModal
        isOpen={activeModalType !== null}
        onClose={closeConsentModal}
        version={activeModalType && consentVersions ? consentVersions[activeModalType] : null}
        onAccept={handleConsentAccept}
      />
      <ConsentModal
        isOpen={aftaleModalOpen}
        onClose={() => setAftaleModalOpen(false)}
        version={aftaleVersion}
        onAccept={() => { setAftaleAccepteret(true); setAftaleModalOpen(false); }}
        acceptLabel="Accepter samarbejdsaftalen"
      />
    </div>
  );
}
