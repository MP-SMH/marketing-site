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
import { Users, ArrowLeft, ShieldCheck, ArrowRight, Loader, Mail, Check, Eye, EyeOff, ChevronDown } from 'lucide-react';
import zxcvbn from 'zxcvbn';
import { useNavigate } from 'react-router-dom';
import { SMH_API_URL } from '@/lib/supabaseClient';
import { useSystemStatus } from '@/hooks/useSystemStatus';
import { fetchActiveConsents, ConsentFetchError } from '@/lib/consents';
import ConsentModal from '@/components/ConsentModal';

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
  const [postnummer, setPostnummer] = useState('');
  const [kontaktNavn, setKontaktNavn] = useState('');
  const [kontaktRolle, setKontaktRolle] = useState('Formand');
  const [kontaktTlf, setKontaktTlf] = useState('');
  const [roleOpen, setRoleOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Step 3 consent-checkboxes (3 obligatoriske + 1 marketing UNCHECKED default)
  const [consentTermsChecked, setConsentTermsChecked] = useState(false);
  const [consentGdprChecked, setConsentGdprChecked] = useState(false);
  const [consentPiiChecked, setConsentPiiChecked] = useState(false);
  const [consentMarketingChecked, setConsentMarketingChecked] = useState(false);

  // Step 3 submit state
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Modal state: hvilken consent-type er åben (null = ingen modal aktiv)
  const [activeModalType, setActiveModalType] = useState(null);

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

      // Success - handoff_failed fallback eller cross-domain redirect
      if (data.handoff_failed && data.fallback_redirect) {
        window.location.href = data.fallback_redirect;
        return;
      }

      if (!data.redirect_url) {
        setSubmitError('Foreningen er oprettet, men overgangen til app fejlede. Prøv at logge ind manuelt.');
        setSubmitLoading(false);
        return;
      }

      // Step 4 success-skærm vises (implementeres i Patch 7)
      // Indtil videre - direkte redirect efter kort delay
      setSubmitLoading(false);
      setStep(4);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      window.location.href = data.redirect_url;
    } catch (err) {
      setSubmitError('Netværksfejl - tjek din internetforbindelse og prøv igen.');
      setSubmitLoading(false);
    }
  };


  // ===========================================================================
  // Render
  // ===========================================================================
  return (
    <div style={pageStyle}>
      <style>{ANIMATIONS_AND_INPUTS}</style>

      {/* Background grid */}
      <div style={gridStyle} />

      {/* Animated orbs (Pulse signature) */}
      <div style={orb1Style} />
      <div style={orb2Style} />
      <div style={orb3Style} />

      {/* Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${15 + i * 14}%`,
            bottom: '-5%',
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            borderRadius: '50%',
            background: `rgba(8,145,178,${0.15 + (i % 3) * 0.1})`,
            animation: `login-particles ${8 + i * 2}s linear infinite`,
            animationDelay: `${i * 1.5}s`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Top nav: wordmark + system status */}
      <nav style={navStyle}>
        <div style={wordmarkStyle} onClick={() => navigate('/')}>
          <span style={wordmarkDotStyle} />
          <span>StøtMedHjerte</span>
        </div>
        <div style={statusBadgeStyle}>
          <span
            style={{
              ...statusDotStyle,
              background: status.color,
              boxShadow: `0 0 8px ${status.color}`,
            }}
          />
          {status.label}
        </div>
      </nav>

      {/* Back button */}
      <button
        onClick={() => (step === 1 ? navigate('/') : setStep(step - 1))}
        style={backButtonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
        }}
      >
        <ArrowLeft size={14} /> {step === 1 ? 'Til forsiden' : 'Tilbage'}
      </button>

      {/* Card container */}
      <main style={mainStyle}>
        <div className="login-card" style={cardWrapperStyle}>
          <div style={cardStyle}>
            {/* Step indicator */}
            <div style={stepIndicatorStyle}>
              <span style={stepDotStyle(step >= 1)} />
              <span style={stepLineStyle(step >= 2)} />
              <span style={stepDotStyle(step >= 2)} />
              <span style={stepLineStyle(step >= 3)} />
              <span style={stepDotStyle(step >= 3)} />
              <span style={stepCounterStyle}>STEP {step} / 3</span>
            </div>

            {/* Icon */}
            <div style={iconWrapperStyle}>
              <div style={iconCircleStyle}>
                {step === 2 ? (
                  <Mail size={26} color="#3B82F6" />
                ) : (
                  <Users size={26} color="#3B82F6" />
                )}
              </div>
            </div>

            {/* Heading section */}
            <div style={headerStyle}>
              <div style={eyebrowStyle}>OPRET FORENING</div>
              <h1 style={headingStyle}>
                {step === 1 && 'Bekræft din email-adresse'}
                {step === 2 && 'Indtast bekræftelseskode'}
                {step === 3 && 'Fortæl os om foreningen'}
              </h1>
              <p style={subheadStyle}>
                {step === 1 && 'Vi sender en 8-cifret kode til din email for at verificere at du ejer adressen.'}
                {step === 2 && (
                  <>
                    Vi har sendt en kode til <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{email}</strong>. Indtast koden nedenfor for at fortsætte.
                  </>
                )}
                {step === 3 && 'Udfyld foreningens oplysninger for at færdiggøre opretelsen.'}
              </p>
            </div>

            {/* ====================================================== */}
            {/* STEP 1: Email + send OTP */}
            {/* ====================================================== */}
            {step === 1 && (
              <form onSubmit={handleSendOtp}>
                <div style={fieldStyle}>
                  <label style={labelStyle} htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="signup-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="navn@forening.dk"
                    autoComplete="email"
                    autoFocus
                    disabled={emailLoading}
                    required
                  />
                </div>

                {emailError && (
                  <div style={errorStyle}>
                    <span style={errorDotStyle} />
                    {emailError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={emailLoading || !email}
                  style={primaryButtonStyle(!emailLoading && !!email)}
                  onMouseEnter={(e) => {
                    if (!emailLoading && email) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(8,145,178,0.45)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow =
                      !emailLoading && email ? '0 4px 24px rgba(8,145,178,0.35)' : 'none';
                  }}
                >
                  {emailLoading ? (
                    <>
                      <Loader size={16} className="spin" /> Sender kode...
                    </>
                  ) : (
                    <>
                      Send bekræftelseskode <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ====================================================== */}
            {/* STEP 2: OTP-indtastning */}
            {/* ====================================================== */}
            {step === 2 && (
              <div>
                {/* OTP input grid */}
                <div style={otpGridStyle}>
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                      disabled={otpLoading}
                      style={otpInputStyle(otpError !== '')}
                    />
                  ))}
                </div>

                {/* Error besked */}
                {otpError && (
                  <div style={{ ...errorStyle, marginTop: 0 }}>
                    <span style={errorDotStyle} />
                    {otpError}
                  </div>
                )}

                {/* Loading-indikator */}
                {otpLoading && (
                  <div style={otpVerifyingStyle}>
                    <Loader size={14} className="spin" />
                    <span>Verificerer kode...</span>
                  </div>
                )}

                {/* Resend-knap */}
                <div style={resendRowStyle}>
                  {resendCooldown > 0 ? (
                    <span style={resendCooldownTextStyle}>
                      Send ny kode om {resendCooldown}s
                    </span>
                  ) : (
                    <button
                      onClick={handleResendOtp}
                      disabled={emailLoading}
                      style={resendButtonStyle}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#22d3ee')}
                    >
                      {emailLoading ? 'Sender...' : 'Send ny kode'}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ====================================================== */}
            {/* STEP 3: Forening-data formular (Patch 5a + 5b + 5c)    */}
            {/* ====================================================== */}
            {step === 3 && (
              <div style={{ padding: '20px 0' }}>
                {consentLoading && (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(255,255,255,0.5)' }}>
                    <Loader size={20} className="spin" style={{ marginBottom: 12 }} />
                    <div style={{ fontSize: 14 }}>Indlæser samtykke-tekster...</div>
                  </div>
                )}

                {consentError && !consentLoading && (
                  <div style={{ padding: '24px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 12, marginBottom: 16 }}>
                    <div style={{ fontSize: 14, color: '#fca5a5', marginBottom: 12 }}>{consentError}</div>
                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                      style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#fff', fontSize: 13, cursor: 'pointer' }}
                    >
                      Genindlæs siden
                    </button>
                  </div>
                )}

                {!consentLoading && !consentError && consentVersions && (() => {
                  const fieldsCount = 7;
                  const filled = [
                    foreningsnavn.trim().length >= 2,
                    /^\d{8}$/.test(cvrNummer),
                    /^\d{4}$/.test(postnummer),
                    kontaktNavn.trim().length >= 2,
                    /^\d{8}$/.test(kontaktTlf),
                    kontaktRolle === 'Formand' || kontaktRolle === 'Kasserer',
                    password.length >= MIN_PASSWORD_LENGTH && computePasswordScore(password) >= MIN_PASSWORD_SCORE,
                  ].filter(Boolean).length;
                  const percent = Math.round((filled / fieldsCount) * 100);
                  const allFilled = filled === fieldsCount;
                  const allConsents = consentTermsChecked && consentGdprChecked && consentPiiChecked;
                  return (
                    <form onSubmit={handleStep3Submit} noValidate>

                      {submitError && (
                        <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444', marginTop: 7, flexShrink: 0 }} />
                          <div style={{ fontSize: 13, color: '#FCA5A5', lineHeight: 1.5 }}>{submitError}</div>
                        </div>
                      )}


                        <div style={{ marginBottom: 6 }}>
                          <div style={stepCardTitleStyle}>Foreningsoplysninger</div>
                          <div style={stepCardSubtitleStyle}>Stamdata og kontaktinfo</div>
                        </div>

                        <div style={{ margin: '16px 0 18px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{filled} af {fieldsCount} felter</span>
                            <span style={{ fontSize: 13, fontWeight: 600, color: allFilled ? '#10B981' : '#0891B2' }}>{percent}%</span>
                          </div>
                          <div style={progressBarTrackStyle}>
                            <div style={progressBarFillStyle(percent, allFilled)} />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 4 }}>

                          <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4, display: 'block' }}>Foreningsnavn *</label>
                            <input
                              type="text"
                              className="signup-input"
                              value={foreningsnavn}
                              onChange={(e) => setForeningsnavn(e.target.value)}
                              disabled={submitLoading}
                              placeholder="F.eks. Hillerød Fodboldklub"
                              maxLength={200}
                              style={{ height: 42, ...(fieldErrors.foreningsnavn ? { borderColor: 'rgba(239,68,68,0.4)' } : {}) }}
                            />
                            {fieldErrors.foreningsnavn && (
                              <div style={fieldErrorStyle}>
                                <div style={fieldErrorDotStyle} />
                                <div>{fieldErrors.foreningsnavn}</div>
                              </div>
                            )}
                          </div>

                          <div>
                            <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4, display: 'block' }}>CVR-nummer *</label>
                            <input
                              type="text"
                              className="signup-input"
                              value={cvrNummer}
                              onChange={(e) => setCvrNummer(e.target.value.replace(/\D/g, '').slice(0, 8))}
                              disabled={submitLoading}
                              placeholder="12345678"
                              inputMode="numeric"
                              maxLength={8}
                              style={{ height: 42, fontFamily: 'ui-monospace, monospace', ...(fieldErrors.cvrNummer ? { borderColor: 'rgba(239,68,68,0.4)' } : {}) }}
                            />
                            {fieldErrors.cvrNummer && (
                              <div style={fieldErrorStyle}>
                                <div style={fieldErrorDotStyle} />
                                <div>{fieldErrors.cvrNummer}</div>
                              </div>
                            )}
                          </div>

                          <div>
                            <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4, display: 'block' }}>Postnummer *</label>
                            <input
                              type="text"
                              className="signup-input"
                              value={postnummer}
                              onChange={(e) => setPostnummer(e.target.value.replace(/\D/g, '').slice(0, 4))}
                              disabled={submitLoading}
                              placeholder="3400"
                              inputMode="numeric"
                              maxLength={4}
                              style={{ height: 42, fontFamily: 'ui-monospace, monospace', ...(fieldErrors.postnummer ? { borderColor: 'rgba(239,68,68,0.4)' } : {}) }}
                            />
                            {fieldErrors.postnummer && (
                              <div style={fieldErrorStyle}>
                                <div style={fieldErrorDotStyle} />
                                <div>{fieldErrors.postnummer}</div>
                              </div>
                            )}
                          </div>

                          <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4, display: 'block' }}>Kontaktperson *</label>
                            <input
                              type="text"
                              className="signup-input"
                              value={kontaktNavn}
                              onChange={(e) => setKontaktNavn(e.target.value)}
                              disabled={submitLoading}
                              placeholder="F.eks. Anders Hansen"
                              maxLength={200}
                              autoComplete="name"
                              style={{ height: 42, ...(fieldErrors.kontaktNavn ? { borderColor: 'rgba(239,68,68,0.4)' } : {}) }}
                            />
                            {fieldErrors.kontaktNavn && (
                              <div style={fieldErrorStyle}>
                                <div style={fieldErrorDotStyle} />
                                <div>{fieldErrors.kontaktNavn}</div>
                              </div>
                            )}
                          </div>

                          <div>
                            <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4, display: 'block' }}>Telefon *</label>
                            <input
                              type="tel"
                              className="signup-input"
                              value={kontaktTlf}
                              onChange={(e) => setKontaktTlf(e.target.value.replace(/\D/g, '').slice(0, 8))}
                              disabled={submitLoading}
                              placeholder="12345678"
                              inputMode="numeric"
                              maxLength={8}
                              autoComplete="tel"
                              style={{ height: 42, fontFamily: 'ui-monospace, monospace', ...(fieldErrors.kontaktTlf ? { borderColor: 'rgba(239,68,68,0.4)' } : {}) }}
                            />
                            {fieldErrors.kontaktTlf && (
                              <div style={fieldErrorStyle}>
                                <div style={fieldErrorDotStyle} />
                                <div>{fieldErrors.kontaktTlf}</div>
                              </div>
                            )}
                          </div>

                          <div style={{ position: 'relative' }}>
                            <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4, display: 'block' }}>Rolle i foreningen *</label>
                            <button
                              type="button"
                              onClick={() => !submitLoading && setRoleOpen(!roleOpen)}
                              disabled={submitLoading}
                              style={customDropdownButtonStyle(!!kontaktRolle, roleOpen, !!fieldErrors.kontaktRolle)}
                            >
                              <span>{kontaktRolle || 'Vælg rolle...'}</span>
                              <ChevronDown size={14} color="rgba(255,255,255,0.5)" style={{ transform: roleOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                            </button>
                            {roleOpen && (
                              <>
                                <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onMouseDown={() => setRoleOpen(false)} />
                                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 20, background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: 4, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
                                  {ROLES.map((r) => (
                                    <button
                                      key={r}
                                      type="button"
                                      onMouseDown={() => { setKontaktRolle(r); setRoleOpen(false); }}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        width: '100%',
                                        padding: '9px 12px',
                                        fontSize: 13,
                                        color: kontaktRolle === r ? '#0891B2' : 'rgba(255,255,255,0.7)',
                                        background: kontaktRolle === r ? 'rgba(8,145,178,0.08)' : 'transparent',
                                        border: 'none',
                                        borderRadius: 7,
                                        cursor: 'pointer',
                                        fontFamily: 'inherit',
                                        textAlign: 'left',
                                        fontWeight: kontaktRolle === r ? 600 : 400,
                                      }}
                                    >
                                      {kontaktRolle === r && <Check size={12} color="#0891B2" strokeWidth={3} />}
                                      {r}
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}
                            {fieldErrors.kontaktRolle && (
                              <div style={fieldErrorStyle}>
                                <div style={fieldErrorDotStyle} />
                                <div>{fieldErrors.kontaktRolle}</div>
                              </div>
                            )}
                          </div>

                          <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4, display: 'block' }}>Adgangskode *</label>
                            <div style={{ position: 'relative' }}>
                              <input
                                type={showPassword ? 'text' : 'password'}
                                className="signup-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={submitLoading}
                                placeholder="Mindst 10 tegn"
                                autoComplete="new-password"
                                maxLength={128}
                                style={{ height: 42, paddingRight: 44, fontFamily: 'ui-monospace, monospace', ...(fieldErrors.password ? { borderColor: 'rgba(239,68,68,0.4)' } : {}) }}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', border: 'none', padding: 0, opacity: 0.5 }}
                                tabIndex={-1}
                                aria-label={showPassword ? 'Skjul adgangskode' : 'Vis adgangskode'}
                              >
                                {showPassword ? <EyeOff size={16} color="rgba(255,255,255,0.7)" /> : <Eye size={16} color="rgba(255,255,255,0.7)" />}
                              </button>
                            </div>

                            {(() => {
                              const score = password.length === 0 ? -1 : computePasswordScore(password);
                              const meterStates = [
                                { color: '#EF4444', label: 'Meget svag' },
                                { color: '#F97316', label: 'Svag' },
                                { color: '#EAB308', label: 'Mellem' },
                                { color: '#14B8A6', label: 'God' },
                                { color: '#0891B2', label: 'Stærk' },
                              ];
                              return (
                                <div style={{ marginTop: 10 }}>
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 6 }}>
                                    {meterStates.map((s, i) => (
                                      <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        <div style={{ height: 4, borderRadius: 2, background: s.color, opacity: i === score ? 1 : 0.18, transition: 'opacity 0.2s' }} />
                                        <div style={{ fontSize: 10, textAlign: 'center', color: i === score ? s.color : 'rgba(255,255,255,0.35)', fontWeight: i === score ? 600 : 400, transition: 'color 0.2s' }}>{s.label}</div>
                                      </div>
                                    ))}
                                  </div>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    {(() => {
                                      if (score === -1) {
                                        return <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Min. 10 tegn, niveau "God" eller bedre</div>;
                                      }
                                      const messages = [
                                        { color: '#FCA5A5', text: 'Tilføj flere tegn' },
                                        { color: '#FDBA74', text: 'Brug forskellige tegn' },
                                        { color: '#FDE047', text: 'Næsten - tilføj 1-2 tegn' },
                                        { color: '#14B8A6', text: 'Din kode er stærk nok', showCheck: true },
                                        { color: '#67E8F9', text: 'Perfekt sikkerhedsniveau', showCheck: true },
                                      ];
                                      const m = messages[score];
                                      return (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                          {m.showCheck && <Check size={13} color={m.color} strokeWidth={2.5} />}
                                          <div style={{ fontSize: 12, color: m.color, fontWeight: 500 }}>{m.text}</div>
                                        </div>
                                      );
                                    })()}
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{password.length}/128</div>
                                  </div>
                                </div>
                              );
                            })()}

                            {fieldErrors.password && (
                              <div style={fieldErrorStyle}>
                                <div style={fieldErrorDotStyle} />
                                <div>{fieldErrors.password}</div>
                              </div>
                            )}
                          </div>

                        </div>

                        <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Samtykker</div>

                          {[
                            { key: 'terms', type: 'platform_terms', title: 'Vilkår og betingelser', accepted: consentTermsChecked },
                            { key: 'gdpr',  type: 'gdpr_terms',     title: 'GDPR databehandling',  accepted: consentGdprChecked },
                            { key: 'pii',   type: 'pii_consent',    title: 'Persondata-behandling', accepted: consentPiiChecked },
                          ].map((c) => (
                            <div key={c.key} style={agreementCardStyle(c.accepted)}>
                              {c.accepted ? (
                                <Check size={18} color="#10B981" strokeWidth={2.5} />
                              ) : (
                                <ShieldCheck size={18} color="#0891B2" strokeWidth={2} />
                              )}
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{c.title}</div>
                                <div style={{ fontSize: 11, color: c.accepted ? '#10B981' : 'rgba(255,255,255,0.4)' }}>
                                  {c.accepted ? 'Accepteret' : 'Læs og accepter for at fortsætte'}
                                </div>
                              </div>
                              {c.accepted ? (
                                <button
                                  type="button"
                                  onClick={() => openConsentModal(c.type)}
                                  style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 8px', fontFamily: 'inherit' }}
                                >
                                  Vis igen
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => openConsentModal(c.type)}
                                  style={{ padding: '6px 12px', background: 'rgba(8,145,178,0.1)', border: '1px solid rgba(8,145,178,0.3)', borderRadius: 8, color: '#0891B2', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'inherit' }}
                                >
                                  Læs <ArrowRight size={11} />
                                </button>
                              )}
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => !submitLoading && setConsentMarketingChecked(!consentMarketingChecked)}
                            disabled={submitLoading}
                            style={{ ...agreementCardStyle(false), width: '100%', textAlign: 'left', cursor: submitLoading ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}
                          >
                            <div style={consentCheckboxStyle(consentMarketingChecked)}>
                              {consentMarketingChecked && <Check size={11} color="#fff" strokeWidth={3.5} />}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                                Marketing-emails
                                <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 3, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Frivilligt</span>
                              </div>
                              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Tilmeld nyhedsbrev og tips</div>
                            </div>
                          </button>
                        </div>

                        <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <button
                            type="submit"
                            disabled={!canSubmitStep3()}
                            style={primaryButtonStyle(canSubmitStep3())}
                          >
                            {submitLoading ? (
                              <>
                                <Loader size={18} className="spin" />
                                <span style={{ marginLeft: 8 }}>Opretter foreningen...</span>
                              </>
                            ) : (
                              <>
                                <span>Opret foreningen</span>
                                <ArrowRight size={18} style={{ marginLeft: 8 }} />
                              </>
                            )}
                          </button>

                          <div style={{ marginTop: 14, padding: '12px 14px', background: 'rgba(8,145,178,0.06)', border: '1px solid rgba(8,145,178,0.18)', borderRadius: 10, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                            <ShieldCheck size={16} color="#0891B2" style={{ marginTop: 1, flexShrink: 0 }} />
                            <div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: '#0891B2', marginBottom: 2 }}>Dine data er beskyttet</div>
                              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>Vi krypterer dine oplysninger og deler dem aldrig. Du kan altid trække dit samtykke tilbage.</div>
                            </div>
                          </div>
                        </div>

                    </form>
                  );
                })()}
              </div>
            )}

            {/* ====================================================== */}
            {/* STEP 4: Success-skærm (1.2s transition før redirect)  */}
            {/* ====================================================== */}
            {step === 4 && (
              <div style={{ position: 'relative', minHeight: 480, padding: '40px 0', overflow: 'hidden' }}>

                <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)', animation: 'p7-float-glow 6s ease-in-out infinite', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: -80, left: -80, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(8,145,178,0.1) 0%, transparent 70%)', animation: 'p7-float-glow 7s ease-in-out infinite reverse', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 440, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>

                  <div style={{ position: 'relative', display: 'inline-block', marginBottom: 24 }}>
                    <div style={{ position: 'absolute', inset: -16, borderRadius: '50%', border: '2px solid rgba(16,185,129,0.2)', animation: 'p7-ring1 2s ease-out infinite' }} />
                    <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '2px solid rgba(16,185,129,0.4)', animation: 'p7-ring2 2s ease-out infinite 0.4s' }} />

                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0.1) 100%)', border: '2px solid rgba(16,185,129,0.5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 0 40px rgba(16,185,129,0.3)', animation: 'p7-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" style={{ strokeDasharray: 30, strokeDashoffset: 30, animation: 'p7-draw-line 0.4s ease-out 0.3s forwards' }} />
                      </svg>
                    </div>
                  </div>

                  <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 8, opacity: 0, animation: 'p7-fade-up 0.5s ease-out 0.4s forwards' }}>Foreningen er oprettet</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 32, lineHeight: 1.5, opacity: 0, animation: 'p7-fade-up 0.5s ease-out 0.5s forwards' }}>Vi gør klar til onboarding nu — det tager et øjeblik.</div>

                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20, opacity: 0, animation: 'p7-fade-up 0.5s ease-out 0.6s forwards' }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, animation: 'p7-step-pop 0.4s ease-out 0.7s both' }}>
                        <Check size={14} color="#10B981" strokeWidth={3} />
                      </div>
                      <div style={{ flex: 1, textAlign: 'left', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Konto oprettet</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, animation: 'p7-step-pop 0.4s ease-out 0.9s both' }}>
                        <Check size={14} color="#10B981" strokeWidth={3} />
                      </div>
                      <div style={{ flex: 1, textAlign: 'left', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Samtykker registreret</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(8,145,178,0.2)', border: '2px solid rgba(8,145,178,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', animation: 'p7-step-pop 0.4s ease-out 1.1s both' }}>
                        <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid rgba(8,145,178,0.4)', animation: 'p7-ring-expand 1.4s ease-out infinite 1.1s' }} />
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0891B2', animation: 'p7-core-pulse 1.2s ease-in-out infinite 1.1s' }} />
                      </div>
                      <div style={{ flex: 1, textAlign: 'left', fontSize: 13, color: '#fff', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                        Klargør sikker overførsel
                        <span style={{ display: 'inline-flex', gap: 2 }}>
                          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', animation: 'p7-dot-jump 1.4s infinite 0s' }} />
                          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', animation: 'p7-dot-jump 1.4s infinite 0.2s' }} />
                          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', animation: 'p7-dot-jump 1.4s infinite 0.4s' }} />
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', opacity: 0.4, animation: 'p7-step-fade 0.4s ease-out 1.3s both' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
                      <div style={{ flex: 1, textAlign: 'left', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Åbner onboarding</div>
                    </div>

                    <div style={{ marginTop: 16, height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden', position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(8,145,178,0.6) 50%, transparent 100%)', animation: 'p7-shimmer 2s linear infinite' }} />
                    </div>

                  </div>

                  <div style={{ marginTop: 24, fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'ui-monospace, monospace', opacity: 0, animation: 'p7-fade-up 0.5s ease-out 1.4s forwards' }}>
                    beta.stotmedhjerte.dk <span style={{ color: 'rgba(8,145,178,0.6)', animation: 'p7-arrow-pulse 1.2s ease-in-out infinite', display: 'inline-block' }}>→</span> app.stotmedhjerte.dk
                  </div>

                </div>
              </div>
            )}

            {/* Modal til konsent-tekster (portal til document.body) */}
            <ConsentModal
              isOpen={activeModalType !== null}
              onClose={closeConsentModal}
              version={activeModalType && consentVersions ? consentVersions[activeModalType] : null}
              onAccept={handleConsentAccept}
            />

            {/* Login link */}
            <div style={loginLinkRowStyle}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
                Allerede oprettet?{' '}
              </span>
              <span
                onClick={() => navigate('/login-forening')}
                style={loginLinkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#22d3ee')}
              >
                Log ind
              </span>
            </div>
          </div>

          {/* Trust badge under card */}
          <div style={trustBadgeRowStyle}>
            <ShieldCheck size={12} color="rgba(255,255,255,0.3)" />
            <span style={trustBadgeTextStyle}>Sikker krypteret forbindelse</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={footerStyle}>
        <div style={footerLeftStyle}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          KRYPTERET FORBINDELSE · TLS 1.3
        </div>
        <div style={footerRightStyle}>BYGGET I DANMARK · © 2026</div>
      </footer>
    </div>
  );
}

// ===========================================================================
// CSS animations + input-styling (inline <style> tag)
// ===========================================================================
const ANIMATIONS_AND_INPUTS = `
  @keyframes login-orb-1 { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,-40px) scale(1.15)} 66%{transform:translate(-30px,30px) scale(0.95)} 100%{transform:translate(0,0) scale(1)} }
  @keyframes login-orb-2 { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,50px) scale(1.1)} 66%{transform:translate(40px,-20px) scale(0.9)} 100%{transform:translate(0,0) scale(1)} }
  @keyframes login-orb-3 { 0%{transform:translate(0,0) scale(1);opacity:.6} 50%{transform:translate(30px,40px) scale(1.2);opacity:1} 100%{transform:translate(0,0) scale(1);opacity:.6} }
  @keyframes login-grid-drift { 0%{transform:translate(0,0)} 100%{transform:translate(60px,60px)} }
  @keyframes login-particles { 0%{transform:translateY(0) scale(1);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(-100vh) scale(0.5);opacity:0} }
  @keyframes login-fade-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes status-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes spin { to{transform:rotate(360deg)} }

  /* Patch 7: Step 4 success-screen animations */
  @keyframes p7-pop { 0%{transform:scale(0.7);opacity:0} 60%{transform:scale(1.08);opacity:1} 100%{transform:scale(1);opacity:1} }
  @keyframes p7-draw-line { to{stroke-dashoffset:0} }
  @keyframes p7-ring1 { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.4);opacity:0} }
  @keyframes p7-ring2 { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(1.5);opacity:0} }
  @keyframes p7-fade-up { 0%{opacity:0;transform:translateY(8px)} 100%{opacity:1;transform:translateY(0)} }
  @keyframes p7-step-pop { 0%{transform:scale(0.6);opacity:0} 100%{transform:scale(1);opacity:1} }
  @keyframes p7-step-fade { 0%{opacity:0} 100%{opacity:0.4} }
  @keyframes p7-core-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:0.6} }
  @keyframes p7-ring-expand { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.6);opacity:0} }
  @keyframes p7-dot-jump { 0%,60%,100%{transform:translateY(0);opacity:0.5} 30%{transform:translateY(-3px);opacity:1} }
  @keyframes p7-shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
  @keyframes p7-arrow-pulse { 0%,100%{opacity:0.6;transform:translateX(0)} 50%{opacity:1;transform:translateX(2px)} }
  @keyframes p7-float-glow { 0%,100%{transform:translate(0,0);opacity:1} 50%{transform:translate(20px,-20px);opacity:0.7} }

  .login-card { animation: login-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both; }
  .signup-input { width:100%;height:48px;border-radius:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);padding:0 14px;font-size:14px;color:#fff;outline:none;transition:all 0.2s;font-family:inherit;box-sizing:border-box; }
  .signup-input:focus { border-color:rgba(8,145,178,0.4);background:rgba(255,255,255,0.08); }
  .signup-input::placeholder { color:rgba(255,255,255,0.2); }
  .signup-input:disabled { opacity:0.5;cursor:not-allowed; }
  .spin { animation: spin 0.8s linear infinite; }
`;

// ===========================================================================
// Inline styles
// ===========================================================================
const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
};

const gridStyle = {
  position: 'absolute',
  inset: -60,
  opacity: 0.04,
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
  backgroundSize: '60px 60px',
  animation: 'login-grid-drift 20s linear infinite',
  zIndex: 0,
};

const orb1Style = {
  position: 'absolute',
  top: '10%',
  right: '15%',
  width: 350,
  height: 350,
  borderRadius: '50%',
  background: 'radial-gradient(circle,rgba(8,145,178,0.18) 0%,transparent 70%)',
  filter: 'blur(60px)',
  animation: 'login-orb-1 12s ease-in-out infinite',
  zIndex: 0,
};

const orb2Style = {
  position: 'absolute',
  bottom: '10%',
  left: '10%',
  width: 300,
  height: 300,
  borderRadius: '50%',
  background: 'radial-gradient(circle,rgba(8,145,178,0.12) 0%,transparent 70%)',
  filter: 'blur(60px)',
  animation: 'login-orb-2 15s ease-in-out infinite',
  zIndex: 0,
};

const orb3Style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  width: 200,
  height: 200,
  borderRadius: '50%',
  background: 'radial-gradient(circle,rgba(96,165,250,0.1) 0%,transparent 70%)',
  filter: 'blur(40px)',
  animation: 'login-orb-3 10s ease-in-out infinite',
  zIndex: 0,
};

const navStyle = {
  position: 'relative',
  zIndex: 10,
  padding: '20px 28px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const wordmarkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  cursor: 'pointer',
  color: '#fff',
  fontSize: 15,
  fontWeight: 600,
  letterSpacing: '-0.02em',
};

const wordmarkDotStyle = {
  width: 8,
  height: 8,
  background: BRAND_TEAL,
  borderRadius: 2,
  boxShadow: `0 0 12px rgba(8,145,178,0.4)`,
};

const statusBadgeStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 11,
  fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, monospace",
  color: 'rgba(255,255,255,0.4)',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
};

const statusDotStyle = {
  width: 6,
  height: 6,
  borderRadius: '50%',
  animation: 'status-pulse 2s ease-in-out infinite',
};

const backButtonStyle = {
  position: 'absolute',
  top: 80,
  left: 28,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 10,
  padding: '8px 14px',
  color: 'rgba(255,255,255,0.5)',
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontFamily: 'inherit',
  zIndex: 10,
};

const mainStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
  position: 'relative',
  zIndex: 2,
};

const cardWrapperStyle = {
  width: '100%',
  maxWidth: 440,
};

const cardStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 24,
  padding: '40px 36px 32px',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
};

const stepIndicatorStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  marginBottom: 28,
  fontSize: 10,
  fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, monospace",
  color: 'rgba(255,255,255,0.3)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
};

const stepDotStyle = (active) => ({
  width: 6,
  height: 6,
  borderRadius: '50%',
  background: active ? BRAND_TEAL : 'rgba(255,255,255,0.12)',
  boxShadow: active ? '0 0 8px rgba(8,145,178,0.4)' : 'none',
  transition: 'all 0.3s ease',
});

const stepLineStyle = (active) => ({
  width: 24,
  height: 1,
  background: active ? BRAND_TEAL : 'rgba(255,255,255,0.12)',
  transition: 'all 0.3s ease',
});

const stepCounterStyle = {
  marginLeft: 'auto',
};

const iconWrapperStyle = {
  textAlign: 'center',
  marginBottom: 20,
};

const iconCircleStyle = {
  width: 56,
  height: 56,
  borderRadius: 16,
  background: 'rgba(8,145,178,0.18)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: 28,
};

const eyebrowStyle = {
  fontSize: 10,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: '#22d3ee',
  marginBottom: 8,
  fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, monospace",
};

const headingStyle = {
  fontSize: 22,
  fontWeight: 800,
  color: '#fff',
  letterSpacing: '-0.03em',
  margin: '0 0 8px',
  lineHeight: 1.25,
};

const subheadStyle = {
  fontSize: 13,
  color: 'rgba(255,255,255,0.45)',
  margin: 0,
  lineHeight: 1.5,
};

const fieldStyle = {
  marginBottom: 16,
};

const labelStyle = {
  display: 'block',
  fontSize: 11,
  fontWeight: 600,
  color: 'rgba(255,255,255,0.4)',
  marginBottom: 6,
  letterSpacing: '0.02em',
};

const errorStyle = {
  marginBottom: 16,
  marginTop: 16,
  padding: '10px 14px',
  background: 'rgba(239,68,68,0.08)',
  border: '1px solid rgba(239,68,68,0.25)',
  borderRadius: 10,
  color: '#FCA5A5',
  fontSize: 13,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
};

const errorDotStyle = {
  width: 6,
  height: 6,
  borderRadius: '50%',
  background: '#EF4444',
  flexShrink: 0,
  boxShadow: '0 0 8px rgba(239,68,68,0.6)',
};

const primaryButtonStyle = (active) => ({
  width: '100%',
  height: 52,
  borderRadius: 14,
  border: 'none',
  background: active
    ? `linear-gradient(135deg, ${BRAND_TEAL}, ${BRAND_TEAL_DARK})`
    : 'rgba(255,255,255,0.06)',
  color: active ? '#fff' : 'rgba(255,255,255,0.2)',
  fontSize: 15,
  fontWeight: 700,
  cursor: active ? 'pointer' : 'not-allowed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  boxShadow: active ? '0 4px 24px rgba(8,145,178,0.35)' : 'none',
  transition: 'all 0.2s',
  fontFamily: 'inherit',
  marginTop: 4,
});

// OTP-specific styles
const otpGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  gap: 8,
  marginBottom: 20,
};

const otpInputStyle = (hasError) => ({
  width: '100%',
  height: 52,
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 600,
  borderRadius: 10,
  background: 'rgba(255,255,255,0.05)',
  border: hasError
    ? '1px solid rgba(239,68,68,0.4)'
    : '1px solid rgba(255,255,255,0.08)',
  color: '#fff',
  outline: 'none',
  fontFamily: "ui-monospace, 'SF Mono', monospace",
  transition: 'all 0.15s ease',
  padding: 0,
});

const otpVerifyingStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  fontSize: 13,
  color: 'rgba(255,255,255,0.5)',
  marginTop: 16,
  marginBottom: 16,
};

const resendRowStyle = {
  textAlign: 'center',
  marginTop: 16,
  fontSize: 13,
};

const resendCooldownTextStyle = {
  color: 'rgba(255,255,255,0.3)',
  fontFamily: "ui-monospace, 'SF Mono', monospace",
  fontSize: 12,
};

const resendButtonStyle = {
  background: 'transparent',
  border: 'none',
  color: '#22d3ee',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'color 0.2s',
  fontFamily: 'inherit',
  padding: 0,
};

const loginLinkRowStyle = {
  textAlign: 'center',
  marginTop: 24,
};

const loginLinkStyle = {
  fontSize: 13,
  color: '#22d3ee',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'color 0.2s',
};

const trustBadgeRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  marginTop: 20,
};

const trustBadgeTextStyle = {
  fontSize: 11,
  color: 'rgba(255,255,255,0.3)',
};

const footerStyle = {
  position: 'relative',
  zIndex: 10,
  padding: '20px 28px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: 10,
  fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, monospace",
  color: 'rgba(255,255,255,0.3)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const footerLeftStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const footerRightStyle = {};

// === Step 3 smoke-test button-style (genbruges i Step 3 formular) ===
const consentTestButtonStyle = {
  padding: '10px 14px',
  background: 'rgba(8,145,178,0.08)',
  border: '1px solid rgba(8,145,178,0.25)',
  borderRadius: 8,
  color: '#0891B2',
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'all 150ms ease',
};


// =====================================================
// Step 3 (Patch 3): Password helpers + form styling
// Tilføjet 1. maj 2026 - Handoff Bridge Phase 3
// =====================================================

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

const passwordMeterColor = (score) => {
  if (score === 0) return '#EF4444';
  if (score === 1) return '#F97316';
  if (score === 2) return '#EAB308';
  if (score === 3) return '#14B8A6';
  if (score === 4) return '#0891B2';
  return 'rgba(255,255,255,0.08)';
};

const passwordMeterLabel = (score) => {
  if (score === 0) return 'Meget svag';
  if (score === 1) return 'Svag';
  if (score === 2) return 'Mellem';
  if (score === 3) return 'God';
  if (score === 4) return 'Stærk';
  return '';
};

// --- Section header ---
const sectionLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 18,
};

const sectionIconBoxStyle = {
  width: 24,
  height: 24,
  borderRadius: 7,
  background: 'rgba(8,145,178,0.18)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const sectionLabelTextStyle = {
  fontSize: 11,
  fontWeight: 600,
  color: '#0891B2',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

// --- Field label + required asterisk ---
const fieldLabelStyle = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 4,
  marginBottom: 8,
};

const fieldLabelTextStyle = {
  fontSize: 13,
  fontWeight: 500,
  color: 'rgba(255,255,255,0.9)',
};

const fieldRequiredStyle = {
  color: '#EF4444',
  fontSize: 13,
};

// --- Field error ---
const fieldErrorStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  marginTop: 8,
  fontSize: 13,
  color: '#FCA5A5',
};

const fieldErrorDotStyle = {
  width: 6,
  height: 6,
  borderRadius: '50%',
  background: '#EF4444',
  flexShrink: 0,
};

// --- Password input + toggle ---
const passwordWrapperStyle = {
  position: 'relative',
};

const passwordToggleStyle = {
  position: 'absolute',
  right: 12,
  top: '50%',
  transform: 'translateY(-50%)',
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  background: 'transparent',
  border: 'none',
  padding: 0,
  opacity: 0.5,
  transition: 'opacity 0.2s',
};

// --- Password strength meter ---
const passwordMeterWrapperStyle = {
  marginTop: 12,
};

const passwordMeterBarsStyle = {
  display: 'flex',
  gap: 4,
  marginBottom: 8,
};

const passwordMeterSegmentStyle = (active, color) => ({
  flex: 1,
  height: 4,
  borderRadius: 2,
  background: active ? color : 'rgba(255,255,255,0.08)',
  transition: 'background 0.3s',
});

const passwordMeterRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const passwordMeterLabelStyle = (color) => ({
  fontSize: 12,
  fontWeight: 500,
  color: color,
});

const passwordHintStyle = {
  fontSize: 12,
  color: 'rgba(255,255,255,0.4)',
};

// --- Consent block (required + optional) ---
const consentBlockBaseStyle = {
  background: 'rgba(255,255,255,0.04)',
  borderRadius: 12,
  padding: '14px 16px',
  marginBottom: 10,
};

const consentBlockRequiredStyle = {
  ...consentBlockBaseStyle,
  border: '1px solid rgba(239,68,68,0.22)',
};

const consentBlockOptionalStyle = {
  ...consentBlockBaseStyle,
  border: '1px solid rgba(8,145,178,0.22)',
  marginBottom: 0,
};

const consentBlockTitleRowStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 12,
  marginBottom: 10,
};

const consentBlockTitleStyle = {
  fontSize: 14,
  fontWeight: 500,
  color: 'rgba(255,255,255,0.95)',
};

const consentBadgeBaseStyle = {
  fontSize: 10,
  fontWeight: 600,
  padding: '3px 8px',
  borderRadius: 4,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
};

const consentBadgeRequiredStyle = {
  ...consentBadgeBaseStyle,
  color: '#FCA5A5',
  background: 'rgba(239,68,68,0.12)',
};

const consentBadgeOptionalStyle = {
  ...consentBadgeBaseStyle,
  color: '#06B6D4',
  background: 'rgba(8,145,178,0.18)',
};

const consentRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
};

const consentCheckboxStyle = (checked) => ({
  width: 18,
  height: 18,
  borderRadius: 5,
  background: checked ? '#0891B2' : 'rgba(255,255,255,0.05)',
  border: checked ? '1.5px solid #0891B2' : '1.5px solid rgba(255,255,255,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  cursor: 'pointer',
  transition: 'all 0.2s',
  padding: 0,
});

const consentLabelStyle = {
  fontSize: 13,
  color: 'rgba(255,255,255,0.85)',
  lineHeight: 1.5,
};

const consentLinkStyle = {
  color: '#22d3ee',
  textDecoration: 'underline',
  cursor: 'pointer',
  background: 'transparent',
  border: 'none',
  padding: 0,
  font: 'inherit',
};

// --- Security note (info-block under samtykker) ---
const securityNoteStyle = {
  background: 'rgba(8,145,178,0.08)',
  border: '1px solid rgba(8,145,178,0.25)',
  borderRadius: 12,
  padding: '14px 16px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
};

const securityNoteIconStyle = {
  width: 18,
  height: 18,
  flexShrink: 0,
  marginTop: 1,
  color: '#0891B2',
};

const securityNoteTitleStyle = {
  fontSize: 13,
  fontWeight: 500,
  color: '#0891B2',
  marginBottom: 3,
};

const securityNoteDetailStyle = {
  fontSize: 12,
  color: 'rgba(255,255,255,0.55)',
  lineHeight: 1.5,
};

// =====================================================
// Step 3 (Patch 4 - DEL A): Validation helpers
// Tilføjet 1. maj 2026 - Handoff Bridge Phase 3
// =====================================================

const CVR_REGEX = /^\d{8}$/;
const POSTNUMMER_REGEX = /^\d{4}$/;
const TLF_REGEX = /^\d{8}$/;
const MIN_PASSWORD_LENGTH = 10;
const MIN_PASSWORD_SCORE = 3;

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

// =====================================================
// Step 3 (Patch 5c-1): StepCard pattern + dropdown styles
// Tilføjet 2. maj 2026 - matcher smh-app onboarding-design
// =====================================================

const ROLES = ['Formand', 'Kasserer'];

const stepCardStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
  padding: 24,
};

const stepCardTitleStyle = {
  fontSize: 16,
  fontWeight: 600,
  color: '#fff',
  marginBottom: 2,
};

const stepCardSubtitleStyle = {
  fontSize: 13,
  color: 'rgba(255,255,255,0.5)',
};

const progressBarTrackStyle = {
  height: 6,
  borderRadius: 99,
  background: 'rgba(255,255,255,0.06)',
  overflow: 'hidden',
};

const progressBarFillStyle = (percent, complete) => ({
  height: '100%',
  borderRadius: 99,
  background: complete ? '#10B981' : '#0891B2',
  width: `${percent}%`,
  transition: 'width 0.4s ease',
});

const customDropdownButtonStyle = (hasValue, isOpen, hasError) => ({
  width: '100%',
  height: 42,
  padding: '0 14px',
  background: 'rgba(255,255,255,0.05)',
  border: hasError
    ? '1px solid rgba(239,68,68,0.4)'
    : isOpen
      ? '1px solid rgba(8,145,178,0.4)'
      : '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  color: hasValue ? '#fff' : 'rgba(255,255,255,0.3)',
  fontSize: 13,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s',
});

const agreementCardStyle = (accepted) => ({
  background: accepted ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.03)',
  border: accepted
    ? '1px solid rgba(16,185,129,0.18)'
    : '1px solid rgba(255,255,255,0.06)',
  borderRadius: 12,
  padding: '14px 16px',
  marginBottom: 8,
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  transition: 'all 0.25s ease',
});


