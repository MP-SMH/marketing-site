/**
 * OpretForeningPage - 3-step forening signup wizard
 *
 * Step 1: Email + send OTP via /api/auth/otp/request
 * Step 2: OTP-indtastning (8 cifre) via /api/auth/otp/verify
 * Step 3: Forening-data + password via /api/signup/forening
 *
 * Design: Pulse (matcher resten af platformen)
 * Trust-elementer: ALLE SYSTEMER KORER + TLS + Bygget i Danmark
 *
 * Reference: docs/strategy/auth-strategy.md Model D
 */

import { useState, useEffect, useRef } from 'react';
import { Users, ArrowLeft, ShieldCheck, ArrowRight, Loader, Mail, Check, CheckCircle2, AlertCircle, AlertTriangle, Eye, EyeOff, ChevronDown, FileText, ExternalLink } from 'lucide-react';
import zxcvbn from 'zxcvbn';
import { useNavigate, Link } from 'react-router-dom';
import { SMH_API_URL } from '@/lib/supabaseClient';
import { useSystemStatus } from '@/hooks/useSystemStatus';
import { fetchActiveConsents, ConsentFetchError } from '@/lib/consents';
import ConsentModal from '@/components/ConsentModal';
import './OpretForeningOnboarding.css';

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
const MIN_PASSWORD_LENGTH = 10;
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
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
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

export default function OpretForeningPage() {
  const navigate = useNavigate();
  const status = useSystemStatus();

  // Step state
  const [step, setStep] = useState(1);

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

  // Step 3 submit state
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Modal state: hvilken consent-type er åben (null = ingen modal aktiv)
  const [activeModalType, setActiveModalType] = useState(null);

  // --- S66 O3: additive state (roerer ikke eksisterende hooks) ---
  // Trin 4 MobilePay MSN (visuelt only, afventer partner-noegler)
  const [msn, setMsn] = useState('');
  const [msnError, setMsnError] = useState('');
  // Trin 5 abonnement (visuelt only, afventer Frisbii-checkout)
  const [billing, setBilling] = useState('aarlig');
  const [selectedPlan, setSelectedPlan] = useState('samlet');

  // Fetch consent_versions ved mount, cancel ved unmount via AbortController
  useEffect(() => {
    const abortController = new AbortController();

    setConsentLoading(true);
    setConsentError('');

    fetchActiveConsents({ signal: abortController.signal })
      .then((versions) => {
        if (abortController.signal.aborted) return;
        setConsentVersions(versions);
        setConsentLoading(false);
      })
      .catch((err) => {
        if (abortController.signal.aborted) return;
        if (err instanceof ConsentFetchError && err.code === 'ABORTED') return;
        setConsentError(mapConsentErrorToMessage(err));
        setConsentLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, []);

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
      setStep(2);
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
    if (step !== 2 || resendCooldown <= 0) return;

    const timer = setTimeout(() => {
      setResendCooldown((s) => s - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [step, resendCooldown]);

  // Auto-fokus paa foerste input naar vi entrerer Step 2
  useEffect(() => {
    if (step === 2 && otpInputRefs.current[0]) {
      otpInputRefs.current[0].focus();
    }
  }, [step]);

  /**
   * Handle OTP-input change
   * - Accepterer kun cifre
   * - Auto-tab til naeste boks ved indtastning
   * - Auto-submit naar alle 8 cifre er udfyldt
   */
  const handleOtpChange = (index, value) => {
    // Only accept digits
    const digit = value.replace(/\D/g, '').slice(-1);

    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);

    // Clear errors ved ny indtastning
    if (otpError) setOtpError('');

    // Auto-tab til naeste boks
    if (digit && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-submit naar alle cifre er udfyldt
    if (newDigits.every((d) => d !== '') && newDigits.join('').length === OTP_LENGTH) {
      handleVerifyOtp(newDigits.join(''));
    }
  };

  /**
   * Handle keyboard-events i OTP-input
   * - Backspace: clear current og fokus til forrige boks
   * - Arrow keys: naviger mellem bokse
   */
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      // Tom boks + backspace -> ga tilbage til forrige
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

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
    setOtpError('');
    setOtpLoading(true);

    try {
      const response = await fetch(`${SMH_API_URL}/api/auth/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

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
      setStep(3);
    } catch (err) {
      console.error('OTP verify failed:', err);
      setOtpError('Netværksfejl. Tjek din forbindelse og prøv igen.');
      setOtpDigits(Array(OTP_LENGTH).fill(''));
      otpInputRefs.current[0]?.focus();
    } finally {
      setOtpLoading(false);
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
    if (!consentVersions) return false;
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
    if (!consentTermsChecked) return false;
    if (!consentGdprChecked) return false;
    if (!consentPiiChecked) return false;
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

    setCvrLookupState({ status: 'loading' });

    try {
      const res = await fetch(`${SMH_API_URL}/cvr/lookup?cvr=${cvrNummer}`);

      if (!res.ok) {
        // 5xx = backend/cvrapi nede - tillad signup, vis warning
        setCvrLookupState({ status: 'error' });
        return;
      }

      const data = await res.json();

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
      // Network error / timeout
      setCvrLookupState({ status: 'error' });
    }
  };

  const handleStep3Submit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!canSubmitStep3()) return;

    setSubmitLoading(true);
    setSubmitError('');
    setFieldErrors({});

    const payload = {
      email,
      password,
      foreningsnavn: foreningsnavn.trim(),
      cvr_nummer: cvrNummer.trim(),
      kontaktperson_navn: kontaktNavn.trim(),
      kontaktperson_rolle: kontaktRolle,
      kontaktperson_tlf: kontaktTlf.trim(),
      postnummer: postnummer.trim(),
      consent_terms_id: consentVersions.platform_terms?.id,
      consent_gdpr_id: consentVersions.gdpr_terms?.id,
      consent_pii_id: consentVersions.pii_consent?.id,
      consent_marketing_id: consentMarketingChecked
        ? consentVersions.marketing_consent?.id || null
        : null,
    };

    try {
      const response = await fetch(`${SMH_API_URL}/api/signup/forening`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Field-level errors fra backend Zod-validation
        if (response.status === 400 && Array.isArray(data.field_errors)) {
          const mapped = {};
          for (const fe of data.field_errors) {
            const fieldName = fe.field || fe.path;
            if (fieldName === 'cvr_nummer') mapped.cvrNummer = fe.message || 'Ugyldigt CVR-nummer';
            else if (fieldName === 'postnummer') mapped.postnummer = fe.message || 'Ugyldigt postnummer';
            else if (fieldName === 'kontaktperson_navn') mapped.kontaktNavn = fe.message || 'Ugyldigt navn';
            else if (fieldName === 'kontaktperson_rolle') mapped.kontaktRolle = fe.message || 'Ugyldig rolle';
            else if (fieldName === 'kontaktperson_tlf') mapped.kontaktTlf = fe.message || 'Ugyldigt telefonnummer';
            else if (fieldName === 'foreningsnavn') mapped.foreningsnavn = fe.message || 'Ugyldigt foreningsnavn';
            else if (fieldName === 'password') mapped.password = fe.message || 'Ugyldig adgangskode';
          }
          setFieldErrors(mapped);
          if (Object.keys(mapped).length === 0) {
            setSubmitError(data.message || 'Nogle felter er ugyldige - tjek formularen og prøv igen.');
          }
          setSubmitLoading(false);
          return;
        }

        // Status-specifikke fejl (matcher strategy v1.3 sektion 3.4)
        if (response.status === 401) {
          setSubmitError(data.message || 'Din email-bekræftelse er udløbet. Bekræft venligst din email igen.');
        } else if (response.status === 403) {
          setSubmitError(data.message || 'Du er allerede registreret som tegningsberettiget i en anden forening. Kontakt support hvis du har behov for at oprette en yderligere forening.');
        } else if (response.status === 409) {
          if (data.error_code === 'EMAIL_ALREADY_REGISTERED') {
            setSubmitError(data.message || 'Denne email er allerede registreret. Log ind i stedet.');
          } else if (data.error_code === 'CVR_DUPLICATE') {
            setFieldErrors({ cvrNummer: 'Denne forening er allerede oprettet hos StøtMedHjerte. Kontakt support hvis du mener det er en fejl.' });
          } else {
            setSubmitError(data.message || 'Konflikt med eksisterende data. Tjek formularen.');
          }
        } else if (response.status === 429) {
          setSubmitError(data.message || 'For mange forsøg. Vent et øjeblik og prøv igen.');
        } else {
          setSubmitError(data.message || 'Noget gik galt. Prøv igen om et øjeblik.');
        }
        setSubmitLoading(false);
        return;
      }

      // ----------------------------------------------------------------
      // 3-TIER REDIRECT CASCADE (BUG-002 fix, 4/5-2026)
      //
      // PRIORITY 1: Cross-domain handoff (happy path)
      //   handoff_redirect_url = full URL til app.stotmedhjerte.dk/handoff?token=...
      //   Bruger redirectes til smh-app HandoffPage som exchanger token.
      //
      // PRIORITY 2: Same-domain fallback (handoff_failed=true)
      //   Signup lykkedes men handoff-token kunne ikke oprettes.
      //   Bruger sendes til manual login.
      //
      // PRIORITY 3: Error state (intet redirect target)
      //   Server-respons mangler både handoff_redirect_url og fallback_redirect.
      //   Vis eksplicit fejl til bruger i stedet for silent failure.
      // ----------------------------------------------------------------

      // PRIORITY 1: Cross-domain handoff (happy path)
      const isValidUrl = (url) =>
        typeof url === 'string' && url.length > 0 && /^https?:\/\//.test(url);

      if (isValidUrl(data.handoff_redirect_url)) {
        console.info('[signup] Cross-domain handoff initiated');
        setSubmitLoading(false);
        // P1-UX-001: Direct redirect — Step 4 success-skærm fjernet.
        // HandoffPage er nu det eneste opsætnings-vindue (11s trust window).
        window.location.href = data.handoff_redirect_url;
        return;
      }

      // PRIORITY 2: Same-domain fallback (handoff_failed=true)
      if (data.handoff_failed && isValidUrl(data.fallback_redirect)) {
        console.warn('[signup] Handoff failed - using fallback redirect to manual login');
        window.location.href = data.fallback_redirect;
        return;
      }

      // PRIORITY 3: Error state - no valid redirect target
      console.error('[signup] No valid redirect target in response', {
        has_handoff_url: Boolean(data.handoff_redirect_url),
        has_fallback: Boolean(data.fallback_redirect),
        handoff_failed: data.handoff_failed,
      });
      setSubmitError('Foreningen er oprettet, men overgangen til app fejlede. Prøv at logge ind manuelt.');
      setSubmitLoading(false);
    } catch (err) {
      setSubmitError('Netværksfejl - tjek din internetforbindelse og prøv igen.');
      setSubmitLoading(false);
    }
  };


  // ===========================================================================
  // Render
  // ===========================================================================
  // --- S66 O3 (Edit D): CD .ofo-design wired til eksisterende state/handlers ---
  const ofoH = { margin: '0 0 8px', fontSize: 'clamp(20px,2.6vw,24px)', fontWeight: 800, letterSpacing: '-.5px', color: 'var(--ink)' };
  const ofoP = { margin: '0 0 20px', fontSize: 14.5, lineHeight: 1.6, color: 'var(--body)' };
  const ofoFieldErr = { marginTop: 7, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--brand)' };
  const ofoCvrRow = (color) => ({ marginTop: 9, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, fontWeight: 600, color });
  const OFO_PLANS = [
    { id: 'donationer', name: 'Donationer', a: 149, m: 179, desc: 'Engangsbidrag fra støtter via MobilePay.' },
    { id: 'fast', name: 'Fast støtte', a: 199, m: 239, desc: 'Månedlige faste bidrag fra støtter.' },
    { id: 'samlet', name: 'Samlet', a: 278, m: 334, rec: true, desc: 'Begge produkter samlet, med 20% pakkerabat.' },
  ];
  const ofoRail = [['E-mail', 1], ['Bekræft', 2], ['Forening', 3], ['Aftale', 4], ['MobilePay', 5], ['Abonnement', 6]];
  const ofoPct = (step / 6) * 100;
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
          <button type="button" className="ofo-back" onClick={() => (step === 1 ? navigate('/opret-forening') : setStep(step - 1))} aria-label="Tilbage">
            <ArrowLeft size={18} /> Tilbage
          </button>
          <Link to="/" className="ofo-wordmark">StøtMedHjerte<sup>™</sup></Link>
          <Link to="/opret-forening" className="ofo-cancel" aria-label="Afbryd oprettelse">Afbryd</Link>
        </div>
      </header>

      {/* Wizard */}
      <main className="ofo-wrap ofo-main">
        <div className="ofo-frame">
          <div className="ofo-frame-header">
            <div className="ofo-frame-head-row">
              <div>
                <div className="ofo-kicker">Opret forening</div>
                <div className="ofo-stepcount">Trin {step} af 5</div>
              </div>
              <span className="ofo-securebadge"><ShieldCheck size={13} /> Sikker oprettelse</span>
            </div>
            {/* Rail */}
            <div className="ofo-rail">
              {(() => {
                const out = [];
                ofoRail.forEach((st, idx) => {
                  const n = st[1];
                  const done = step > n;
                  const cur = step === n;
                  out.push(
                    <div key={'n' + n} className="ofo-rail-node">
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

          <div className="ofo-white">
            {/* ---- Trin 1: e-mail ---- */}
            {step === 1 && (
              <form onSubmit={handleSendOtp}>
                <h2 style={ofoH}>Opret din konto</h2>
                <p style={ofoP}>Vi sender en engangskode til jeres arbejds-e-mail, så vi ved, at det er jer.</p>
                <label style={{ display: 'block' }}>
                  <span className="ofo-label">Arbejds-e-mail</span>
                  <input className="ofo-field" type="email" inputMode="email" placeholder="navn@forening.dk" value={email} onChange={(e) => setEmail(e.target.value)} disabled={emailLoading} autoFocus required style={emailError ? { borderColor: 'var(--brand)' } : undefined} />
                </label>
                {emailError ? <div style={{ margin: '8px 2px 0', display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: 'var(--brand)' }}><AlertCircle size={15} />{emailError}</div> : null}
                <button type="submit" className="ofo-primary" disabled={emailLoading || !email} style={{ marginTop: 18 }}>
                  {emailLoading ? <><Loader size={16} style={{ animation: 'ofoSpin .7s linear infinite' }} /> Sender kode ...</> : <>Send bekræftelseskode <ArrowRight size={17} /></>}
                </button>
              </form>
            )}

            {/* ---- Trin 2: OTP (auto-verify via handleOtpChange) ---- */}
            {step === 2 && (
              <div>
                <h2 style={ofoH}>Indtast bekræftelseskode</h2>
                <p style={ofoP}>Vi har sendt en 8-cifret kode til <strong style={{ color: 'var(--ink)' }}>{email}</strong>. Indtast koden nedenfor.</p>
                <div className="ofo-otp-grid">
                  {otpDigits.map((digit, index) => (
                    <input key={index} ref={(el) => (otpInputRefs.current[index] = el)} className="ofo-otp-box" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={1} value={digit} onChange={(e) => handleOtpChange(index, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(index, e)} onPaste={index === 0 ? handleOtpPaste : undefined} disabled={otpLoading} style={{ border: '1px solid ' + (otpError ? 'var(--brand)' : 'var(--smh-border)') }} />
                  ))}
                </div>
                {otpError ? <div style={{ margin: '12px 2px 0', display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: 'var(--brand)' }}><AlertCircle size={15} />{otpError}</div> : null}
                {otpLoading ? <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--smh-muted)' }}><Loader size={14} style={{ animation: 'ofoSpin .7s linear infinite' }} />Verificerer kode ...</div> : null}
                <div style={{ marginTop: 18, textAlign: 'center' }}>
                  {resendCooldown > 0
                    ? <span style={{ fontSize: 13, color: 'var(--smh-muted)' }}>Send ny kode om {resendCooldown}s</span>
                    : <button type="button" className="ofo-linkbtn" onClick={handleResendOtp} disabled={emailLoading}>{emailLoading ? 'Sender ...' : 'Send ny kode'}</button>}
                </div>
              </div>
            )}

            {/* ---- Trin 3: foreningsoplysninger ---- */}
            {step === 3 && (
              <div>
                <h2 style={ofoH}>Foreningsoplysninger</h2>
                <p style={ofoP}>Indtast foreningens CVR-nummer, så henter vi de officielle oplysninger. Udfyld derefter kontaktperson og adgangskode.</p>
                {consentLoading ? (
                  <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--smh-muted)' }}>
                    <Loader size={20} style={{ animation: 'ofoSpin .7s linear infinite', marginBottom: 10 }} />
                    <div style={{ fontSize: 14 }}>Indlæser samtykke-tekster ...</div>
                  </div>
                ) : consentError ? (
                  <div style={{ padding: 20, borderRadius: 14, background: 'var(--brand-surface)', border: '1px solid var(--brand-border)', marginBottom: 16 }}>
                    <div style={{ fontSize: 14, color: 'var(--brand-hover)', marginBottom: 12 }}>{consentError}</div>
                    <button type="button" className="ofo-linkbtn" onClick={() => window.location.reload()}>Genindlæs siden</button>
                  </div>
                ) : consentVersions ? (
                  <>
                    {submitError ? <div style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--brand)' }}><AlertCircle size={15} />{submitError}</div> : null}

                    {/* CVR-nummer: eneste org-input, resten auto-hentes */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block' }}>
                        <span className="ofo-label">CVR-nummer *</span>
                        <input className="ofo-field" value={cvrNummer} onChange={(e) => { setCvrNummer(e.target.value.replace(/\D/g, '').slice(0, 8)); if (cvrLookupState.status !== 'idle') { setCvrLookupState({ status: 'idle' }); setForeningsnavn(''); setPostnummer(''); } }} onBlur={handleCvrBlur} disabled={submitLoading} placeholder="12345678" inputMode="numeric" maxLength={8} style={{ fontFamily: 'ui-monospace, monospace', ...(fieldErrors.cvrNummer ? { borderColor: 'var(--brand)' } : {}) }} />
                      </label>
                      {!fieldErrors.cvrNummer && cvrLookupState.status === 'loading' ? <div style={ofoCvrRow('var(--smh-muted)')}><Loader size={14} style={{ animation: 'ofoSpin .7s linear infinite' }} />Slår op i CVR-registret ...</div> : null}
                      {!fieldErrors.cvrNummer && cvrLookupState.status === 'inactive' ? <div style={ofoCvrRow('#B45309')}><AlertTriangle size={15} />Inaktiv eller ophørt forening. Kan ikke oprettes.</div> : null}
                      {!fieldErrors.cvrNummer && cvrLookupState.status === 'not_found' ? <div style={ofoCvrRow('var(--brand)')}><AlertCircle size={15} />CVR ikke registreret. Tjek tallet.</div> : null}
                      {!fieldErrors.cvrNummer && cvrLookupState.status === 'error' ? <div style={ofoCvrRow('#B45309')}><AlertTriangle size={15} />Kunne ikke verificere CVR lige nu. Du kan fortsætte.</div> : null}
                      {fieldErrors.cvrNummer ? <div style={ofoFieldErr}>{fieldErrors.cvrNummer}</div> : null}
                    </div>

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
                        {fieldErrors.postnummer ? <div style={ofoFieldErr}>{fieldErrors.postnummer}</div> : null}
                      </div>
                    ) : null}

                    {/* Kontaktperson + adgang */}
                    <div className="ofo-2col">
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block' }}>
                          <span className="ofo-label">Kontaktperson *</span>
                          <input className="ofo-field" value={kontaktNavn} onChange={(e) => setKontaktNavn(e.target.value)} disabled={submitLoading} placeholder="F.eks. Anders Hansen" maxLength={200} autoComplete="name" style={fieldErrors.kontaktNavn ? { borderColor: 'var(--brand)' } : undefined} />
                        </label>
                        {fieldErrors.kontaktNavn ? <div style={ofoFieldErr}>{fieldErrors.kontaktNavn}</div> : null}
                      </div>

                      <div>
                        <label style={{ display: 'block' }}>
                          <span className="ofo-label">Direkte telefon *</span>
                          <div style={{ display: 'flex', alignItems: 'stretch', borderRadius: 13, border: '1px solid ' + (fieldErrors.kontaktTlf ? 'var(--brand)' : 'var(--smh-border)'), background: 'var(--surface)', overflow: 'hidden' }}>
                            <span style={{ display: 'flex', alignItems: 'center', padding: '0 13px', background: 'var(--alt)', color: 'var(--body)', fontSize: 15, fontWeight: 600, borderRight: '1px solid var(--smh-border)' }}>+45</span>
                            <input className="ofo-field" inputMode="numeric" placeholder="12 34 56 78" value={kontaktTlf} onChange={(e) => setKontaktTlf(e.target.value.replace(/\D/g, '').slice(0, 8))} disabled={submitLoading} style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }} />
                          </div>
                        </label>
                        {fieldErrors.kontaktTlf ? <div style={ofoFieldErr}>{fieldErrors.kontaktTlf}</div> : null}
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
                        {fieldErrors.kontaktRolle ? <div style={ofoFieldErr}>{fieldErrors.kontaktRolle}</div> : null}
                      </div>

                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block' }}>
                          <span className="ofo-label">Adgangskode *</span>
                          <div style={{ position: 'relative' }}>
                            <input className="ofo-field" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} disabled={submitLoading} placeholder="Mindst 10 tegn" autoComplete="new-password" maxLength={128} style={{ paddingRight: 66, fontFamily: 'ui-monospace, monospace', ...(fieldErrors.password ? { borderColor: 'var(--brand)' } : {}) }} />
                            <button type="button" className="ofo-showpw" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>{showPassword ? 'Skjul' : 'Vis'}</button>
                          </div>
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginTop: 10 }}>
                          {pwMeter.map((m, i) => (
                            <div key={i} style={{ height: 4, borderRadius: 2, background: m.color, opacity: i === pwScore ? 1 : 0.18, transition: 'opacity .2s' }} />
                          ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                          <span style={{ fontSize: 12, color: pwScore >= 3 ? '#15803D' : 'var(--smh-muted)' }}>Mindst 10 tegn, niveau God eller bedre.</span>
                          {pwScore >= 0 ? <span style={{ fontSize: 12, fontWeight: 700, color: pwMeter[pwScore].color }}>{pwMeter[pwScore].label}</span> : null}
                        </div>
                        {fieldErrors.password ? <div style={ofoFieldErr}>{fieldErrors.password}</div> : null}
                      </div>
                    </div>

                    {/* Samtykke: dine 3 obligatoriske + 1 marketing */}
                    <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--smh-border)' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--smh-muted)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>Samtykker</div>
                      {[
                        { type: 'platform_terms', title: 'Vilkår og betingelser', accepted: consentTermsChecked },
                        { type: 'gdpr_terms', title: 'GDPR databehandling', accepted: consentGdprChecked },
                        { type: 'pii_consent', title: 'Persondata-behandling', accepted: consentPiiChecked },
                      ].map((c) => (
                        <div key={c.type} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 14px', borderRadius: 13, border: '1px solid ' + (c.accepted ? 'var(--success)' : 'var(--smh-border)'), background: c.accepted ? '#F0FDF4' : 'var(--surface)', marginBottom: 8 }}>
                          {c.accepted ? <Check size={18} color="#15803D" /> : <ShieldCheck size={18} color="var(--brand)" />}
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{c.title}</div>
                            <div style={{ fontSize: 11, color: c.accepted ? '#15803D' : 'var(--smh-muted)' }}>{c.accepted ? 'Accepteret' : 'Læs og accepter for at fortsætte'}</div>
                          </div>
                          <button type="button" className="ofo-linkbtn" onClick={() => openConsentModal(c.type)}>{c.accepted ? 'Vis igen' : 'Læs'}</button>
                        </div>
                      ))}
                      <button type="button" onClick={() => !submitLoading && setConsentMarketingChecked(!consentMarketingChecked)} disabled={submitLoading} style={{ display: 'flex', alignItems: 'center', gap: 11, width: '100%', textAlign: 'left', padding: '12px 14px', borderRadius: 13, border: '1px solid var(--smh-border)', background: 'var(--surface)', cursor: 'pointer', fontFamily: 'inherit' }}>
                        <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', ...(consentMarketingChecked ? { background: 'var(--brand)', border: '1.5px solid var(--brand)', color: '#fff' } : { background: 'var(--surface)', border: '1.5px solid var(--smh-border)' }) }}>
                          {consentMarketingChecked ? <Check size={12} color="#fff" /> : null}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Marketing-emails <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--smh-muted)', background: 'var(--alt)', padding: '2px 6px', borderRadius: 4, letterSpacing: '.06em', textTransform: 'uppercase' }}>Frivilligt</span></div>
                          <div style={{ fontSize: 11, color: 'var(--smh-muted)' }}>Tilmeld nyhedsbrev og tips.</div>
                        </div>
                      </button>
                    </div>

                    <button type="button" className="ofo-primary" onClick={() => { if (canSubmitStep3()) setStep(4); }} disabled={!canSubmitStep3()} style={{ marginTop: 22 }}>
                      Fortsæt til MobilePay <ArrowRight size={17} />
                    </button>
                  </>
                ) : null}
              </div>
            )}

            {/* ---- Trin 4: Samarbejdsaftale (accept, Variant B) ---- */}
            {step === 4 && (
              <div>
                <h2 style={ofoH}>Underskriv samarbejdsaftalen</h2>
                <p style={ofoP}>Foreningen indgår en samarbejdsaftale med StøtMedHjerte. Læs aftalen igennem og accepter for at fortsætte.</p>
                <a href={`${SMH_API_URL}/api/forening/aftale/skabelon`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '15px 16px', borderRadius: 16, background: 'var(--brand-surface)', border: '1px solid var(--brand-border)', marginBottom: 22, textDecoration: 'none' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <span style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 11, background: 'var(--brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={20} /></span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>Læs samarbejdsaftalen</span>
                  </span>
                  <ExternalLink size={17} color="var(--smh-muted)" />
                </a>
                <div style={{ padding: '14px 16px', borderRadius: 14, background: 'var(--alt)', border: '1px solid var(--smh-border)', marginBottom: 18 }}>
                  <div style={{ fontSize: 12.5, color: 'var(--smh-muted)', marginBottom: 3 }}>Du accepterer på vegne af foreningen som:</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{kontaktNavn || '(dit navn)'}, {kontaktRolle}</div>
                </div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 11, cursor: 'pointer' }}>
                  <input type="checkbox" checked={aftaleAccepteret} onChange={(e) => setAftaleAccepteret(e.target.checked)} style={{ marginTop: 3, width: 18, height: 18, flexShrink: 0, accentColor: 'var(--brand)' }} />
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink)' }}>Jeg har læst og accepterer samarbejdsaftalen på vegne af foreningen.</span>
                </label>
                <button type="button" className="ofo-primary" onClick={() => { if (aftaleAccepteret) setStep(5); }} disabled={!aftaleAccepteret} style={{ marginTop: 22, opacity: aftaleAccepteret ? 1 : 0.5 }}>
                  Fortsæt til MobilePay <ArrowRight size={17} />
                </button>
              </div>
            )}

            {/* ---- Trin 5: MobilePay MSN (visuelt only) ---- */}
            {step === 5 && (
              <div>
                <h2 style={ofoH}>Kobl foreningens MobilePay</h2>
                <p style={ofoP}>Bidrag fra jeres støtter går direkte ind på foreningens egen MobilePay-konto. Indtast foreningens MobilePay-nummer.</p>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '15px 16px', borderRadius: 16, background: 'var(--brand-surface)', border: '1px solid var(--brand-border)', marginBottom: 22 }}>
                  <span style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 11, background: 'var(--brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={20} /></span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 2 }}>Verificeret udbetaling</div>
                    <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--body)' }}>Bidragene går direkte til foreningen. StøtMedHjerte tager ingen andel.</div>
                  </div>
                </div>
                <label style={{ display: 'block' }}>
                  <span className="ofo-label">MobilePay-nummer (MSN)</span>
                  <div style={{ display: 'flex', alignItems: 'stretch', borderRadius: 13, border: '1px solid ' + (msnError ? 'var(--brand)' : (msn.length >= 5 ? 'var(--success)' : 'var(--smh-border)')), background: 'var(--surface)', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '0 14px', background: '#5A78FF' }}>
                      <span style={{ color: '#fff', fontSize: 13.5, fontWeight: 700, letterSpacing: '-.2px', whiteSpace: 'nowrap' }}>MobilePay</span>
                    </div>
                    <input className="ofo-field" type="text" inputMode="numeric" placeholder="fx 123456" value={msn} onChange={(e) => { setMsn(e.target.value.replace(/\D/g, '').slice(0, 8)); if (msnError) setMsnError(''); }} style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }} />
                  </div>
                </label>
                <span style={{ display: 'block', marginTop: 8, fontSize: 12.5, lineHeight: 1.5, color: 'var(--smh-muted)' }}>Det 5-8 cifrede MobilePay-nummer, jeres støtter sender bidrag til. I finder det i MobilePay til erhverv.</span>
                {msnError ? <div style={{ margin: '12px 2px 0', display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: 'var(--brand)' }}><AlertCircle size={15} />{msnError}</div> : null}
                <button type="button" className="ofo-primary" onClick={() => { if (msn.length < 5) { setMsnError('Indtast et gyldigt MobilePay-nummer (mindst 5 cifre).'); return; } setMsnError(''); setStep(6); }} style={{ marginTop: 22 }}>
                  Fortsæt til abonnement <ArrowRight size={17} />
                </button>
              </div>
            )}

            {/* ---- Trin 6: abonnement -> submit (din handleStep3Submit) ---- */}
            {step === 6 && (
              <form onSubmit={handleStep3Submit}>
                <h2 style={ofoH}>Vælg jeres abonnement</h2>
                <p style={ofoP}>Foreningen vælger sit eget abonnement til StøtMedHjerte. Det gælder brugen af platformen, ikke bidrag fra jeres støtter. Årlig betaling giver den laveste pris.</p>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                  <div style={{ display: 'inline-flex', padding: 4, borderRadius: 999, background: 'var(--alt)', border: '1px solid var(--smh-border)' }}>
                    {['aarlig', 'maanedlig'].map((k) => (
                      <button key={k} type="button" onClick={() => setBilling(k)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 18px', minHeight: 42, border: 'none', borderRadius: 999, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', ...(billing === k ? { background: '#fff', color: 'var(--ink)', boxShadow: '0 2px 8px rgba(8,14,26,.1)' } : { background: 'transparent', color: 'var(--smh-muted)' }) }}>
                        {k === 'aarlig' ? 'Årlig' : 'Månedlig'}
                        {k === 'aarlig' ? <span style={{ fontSize: 11, fontWeight: 800, padding: '2px 7px', borderRadius: 999, background: 'var(--brand-surface)', color: 'var(--brand-hover)' }}>Spar 20%</span> : null}
                      </button>
                    ))}
                  </div>
                </div>
                <p style={{ margin: '0 0 22px', textAlign: 'center', fontSize: 12.5, color: 'var(--smh-muted)' }}>{billing === 'aarlig' ? 'Årlig binding er 12 måneder. Laveste pris pr. måned.' : 'Månedlig betaling. Ingen binding, lidt højere pris pr. måned.'}</p>
                <div className="ofo-plans">
                  {OFO_PLANS.map((p) => {
                    const price = billing === 'aarlig' ? p.a : p.m;
                    const sav = p.m - p.a;
                    const rec = p.rec;
                    const sel = selectedPlan === p.id;
                    const fill = rec || sel;
                    return (
                      <div key={p.id} style={{ position: 'relative', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 20, padding: '24px 20px 20px', border: rec ? '2px solid var(--brand)' : '1px solid var(--smh-border)', boxShadow: rec ? '0 24px 50px -30px rgba(224,25,63,.35)' : '0 16px 40px -32px rgba(8,14,26,.18)' }}>
                        {rec ? <span style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', padding: '5px 12px', borderRadius: 999, background: 'var(--brand)', color: '#fff', fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap' }}>Anbefalet</span> : null}
                        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>{p.name}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                          <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-1.4px', color: 'var(--ink)' }}>{price}</span>
                          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--smh-muted)' }}>kr./md.</span>
                        </div>
                        <div style={{ marginTop: 5, minHeight: 18, fontSize: 12.5, fontWeight: 600, color: billing === 'aarlig' ? '#15803D' : 'var(--smh-muted)' }}>{billing === 'aarlig' ? 'Spar ' + sav + ' kr./md. mod månedlig' : 'Faktureres månedligt'}</div>
                        <div style={{ margin: '14px 0', fontSize: 13, lineHeight: 1.5, color: 'var(--body)', flex: 1 }}>{p.desc}</div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--smh-muted)', marginBottom: 16 }}><ShieldCheck size={13} />{billing === 'aarlig' ? '12 mdr. binding' : 'Ingen binding'}</div>
                        <button type="button" onClick={() => setSelectedPlan(p.id)} style={{ width: '100%', padding: 12, minHeight: 48, borderRadius: 999, fontFamily: 'inherit', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', ...(fill ? { background: 'var(--brand)', color: '#fff', border: 'none' } : { background: '#fff', color: 'var(--ink)', border: '1px solid var(--smh-border)' }) }}>
                          {sel ? 'Valgt' : 'Vælg ' + p.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
                <p style={{ margin: '0 0 22px', padding: '14px 16px', borderRadius: 14, background: 'var(--alt)', border: '1px solid var(--smh-border)', fontSize: 12.5, lineHeight: 1.55, color: 'var(--smh-muted)', textAlign: 'center' }}>Abonnementet er foreningens betaling for at bruge platformen. Alle bidrag går direkte til foreningens egen MobilePay-konto, og StøtMedHjerte tager ikke en andel af bidragene.</p>
                {submitError ? <div style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--brand)' }}><AlertCircle size={15} />{submitError}</div> : null}
                <button type="submit" className="ofo-primary" disabled={submitLoading}>
                  {submitLoading ? <><Loader size={18} style={{ animation: 'ofoSpin .7s linear infinite' }} /> Opretter foreningen ...</> : <>Opret forening <Check size={17} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
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
    </div>
  );
}
