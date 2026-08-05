import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SMH_API_URL } from '../lib/supabaseClient';
import SiteNav from '@/components/marketing/SiteNav';
import SiteFooter from '@/components/marketing/SiteFooter';
import { CTA_MEDIUM, CTA_RADIUS, CTA_PADDING, CTA_SKRIFT, CTA_VAEGT, CTA_SPAERRING } from '../lib/cta';

/**
 * Checkout for en hjertesag. Vises som anden visning af /hjertesag/:slug.
 * Kaldes fra HjertesagPage naar stoetteknappen trykkes. Ruten aendres IKKE.
 *
 * KILDE: cd-s91/Hjertesag.dc.html linje 359-539 (checkout view) og 690-815
 * (logikken). Markup er fulgt 1:1 paa naer de afvigelser der staar herunder.
 *
 * AFVIGELSER FRA CD, alle bevidste og maalte i S91:
 *
 * 1. TILSTANDEN LUKKET ER STANDARD. CD's linje 776 lader formularen vaere
 *    aaben naar den ikke ved bedre. Her kraeves forening.payment_ready ===
 *    true. En donor maa ALDRIG udfylde en formular der ikke kan gennemfoeres.
 *
 * 2. VIPPS' KNAP INDLAESES ASYNKRONT. CD tester customElements.get() een gang
 *    under foerste tegning, hvilket naesten altid er FOER scriptet er hentet.
 *    Her bruges customElements.whenDefined() med tilstandsopdatering.
 *
 * 3. RESERVEPLADSEN KAN IKKE KLIKKES. Kan Vipps' knap ikke indlaeses, kan vi
 *    heller ikke tage imod betalingen forsvarligt. Vipps' egen regel er at kun
 *    deres knapper maa starte betalingsflowet.
 *
 * 4. KONTRAST. CD bruger var(--brand) #E0193F til 12px-tekst. Den maaler
 *    4,58:1 og kravet under 14px er 5,5:1. Trin-etiketter bruger derfor
 *    --brand-hover (5,87:1) og fejlbeskeder #B4122F (6,23:1).
 *
 * 5. KATEGORI FINDES IKKE. CD viser "Svoemning" i sammendraget. causes har
 *    ingen kategori-kolonne. Kun byen vises, og kun naar den har indhold.
 *
 * ENHEDER: beloeb regnes i KRONER i hele denne fil og ganges med 100 til
 * OERE i selve API-kaldet. Ruten kraever et heltal i minor units.
 */

// Samme graenser som mobilepay/payment-create-route.js linje 61-62.
const MIN_KRONER = 100;
const MAX_KRONER = 650000;

// Samme regex som ruten bruger paa linje 57. Frontend maa ALDRIG godkende
// noget backend afviser.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BELOEBSVALG = [100, 200, 300, 500, 1000, 2000];

const VIPPS_LIB_ID = 'vipps-checkout-button-lib';
const VIPPS_LIB_SRC = 'https://checkout.vipps.no/checkout-button/v1/vipps-checkout-button.js';

// Hvor laenge vi venter paa Vipps' bibliotek foer vi siger det hoejt.
const KNAP_TIMEOUT_MS = 8000;

// Dansk tusindtalsformat. Findes ogsaa i HjertesagPage. Boer flyttes til et
// delt modul, se BACKLOG S91-DELT-FORMATMODUL.
function kr(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return '0';
  return n.toLocaleString('da-DK', { maximumFractionDigits: 0 });
}

function harIndhold(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function procent(indsamlet, maal) {
  const i = Number(indsamlet);
  const m = Number(maal);
  if (!Number.isFinite(i) || !Number.isFinite(m) || m <= 0) return 0;
  return Math.max(0, Math.min(100, Math.floor((i / m) * 100)));
}

function initialer(navn) {
  if (!harIndhold(navn)) return '?';
  return navn
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((o) => o[0] || '')
    .join('')
    .toUpperCase();
}

const S = {
  side: {
    '--muted': '#55606F',
    '--border': '#E5E7EB',
    '--brand-ink': '#A00C24',
    '--label': '#566072',
    background: 'var(--page)',
    minHeight: '60vh',
  },
  wrap: { maxWidth: 1200, margin: '0 auto', padding: '0 20px' },
  kort: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 22,
    padding: 'clamp(18px,4.5vw,28px)',
    boxShadow: '0 16px 44px -36px rgba(8,14,26,.14)',
  },
  // 12px versaler. Kravet under 14px er 5,5:1. --brand maaler 4,58:1 og maa
  // ikke bruges. --brand-hover maaler 5,87:1.
  trinLabel: {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: '.6px',
    textTransform: 'uppercase',
    color: 'var(--brand-hover)',
    marginBottom: 6,
  },
  h2Trin: {
    margin: '0 0 20px',
    fontSize: 21,
    fontWeight: 800,
    letterSpacing: '-.5px',
    color: 'var(--ink)',
  },
  feltLabel: {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--body)',
    marginBottom: 8,
  },
  hjaelpetekst: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 7,
    fontSize: 12.5,
    lineHeight: 1.5,
    color: 'var(--muted)',
    marginTop: 8,
  },
  // #B4122F maaler 6,23:1. Fejl i et betalingsflow skal vaere maksimalt
  // laesbare, derfor hoejere kontrast end minimumskravet.
  fejltekst: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 7,
    fontSize: 12.5,
    lineHeight: 1.5,
    color: '#B4122F',
    fontWeight: 600,
    marginTop: 8,
  },
  tilbageKnap: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 9,
    background: 'none',
    border: 'none',
    fontFamily: 'inherit',
    cursor: 'pointer',
    color: 'var(--body)',
    fontSize: 14.5,
    fontWeight: 600,
    padding: '8px 4px',
  },
  tekstfelt: {
    width: '100%',
    minHeight: 52,
    padding: '14px 16px',
    borderRadius: 14,
    background: 'var(--surface)',
    fontFamily: 'inherit',
    fontSize: 15,
    fontWeight: 500,
    color: 'var(--ink)',
    outline: 'none',
  },
};

/**
 * IKONER. Hvert ikon staar for sig med CD-kildens praecise geometri.
 *
 * BEVIDST INGEN generisk ikonkomponent. Foerste udgave af denne fil brugte en
 * faelles komponent der kun kunne tegne <path>. Advarselsikonet og
 * stedmarkoeren bestaar af BAADE path og circle, saa cirklerne blev tavst
 * udeladt og ikonerne stod som loese streger. En indpakning der kan tabe dele
 * af en tegning uden at fejle er ikke vaerd at spare linjer paa.
 *
 * Stregtykkelser foelger CD: 2 til rolige ikoner, 2,2 til fejl og pile,
 * 2,4 til kryds og haks, 1,9 til de store 28px-ikoner.
 */

function SvgRamme({ storrelse, tykkelse, farve, children }) {
  return (
    <svg
      width={storrelse}
      height={storrelse}
      viewBox="0 0 24 24"
      fill="none"
      stroke={farve}
      strokeWidth={tykkelse}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// Cirkel med udraabstegn. Bruges til alle fejl og advarsler.
function AdvarselIkon({ storrelse = 14, tykkelse = 2.2, farve = 'currentColor' }) {
  return (
    <SvgRamme storrelse={storrelse} tykkelse={tykkelse} farve={farve}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </SvgRamme>
  );
}

function PilVenstreIkon({ storrelse = 18, farve = 'currentColor' }) {
  return (
    <SvgRamme storrelse={storrelse} tykkelse={2.2} farve={farve}>
      <path d="m15 18-6-6 6-6" />
    </SvgRamme>
  );
}

function KrydsIkon({ storrelse = 14, farve = 'currentColor' }) {
  return (
    <SvgRamme storrelse={storrelse} tykkelse={2.4} farve={farve}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </SvgRamme>
  );
}

// Naal med prik indeni. Prikken er en circle, ikke en path.
function StedIkon({ storrelse = 12, farve = 'currentColor' }) {
  return (
    <SvgRamme storrelse={storrelse} tykkelse={2} farve={farve}>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </SvgRamme>
  );
}

function OejeSlukketIkon({ storrelse = 20, farve = 'currentColor' }) {
  return (
    <SvgRamme storrelse={storrelse} tykkelse={2} farve={farve}>
      <path d="M9.9 4.2A9 9 0 0 1 21 12a8.9 8.9 0 0 1-1.2 3" />
      <path d="M6.6 6.6A9 9 0 0 0 3 12a9 9 0 0 0 13.4 6.4" />
      <path d="M2 2l20 20" />
    </SvgRamme>
  );
}

function KuvertIkon({ storrelse = 14, farve = 'currentColor' }) {
  return (
    <SvgRamme storrelse={storrelse} tykkelse={2} farve={farve}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </SvgRamme>
  );
}

function UrIkon({ storrelse = 28, farve = 'currentColor' }) {
  return (
    <SvgRamme storrelse={storrelse} tykkelse={1.9} farve={farve}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 7v5.5l3.5 2" />
    </SvgRamme>
  );
}

function SkjoldIkon({ storrelse = 14, farve = 'currentColor' }) {
  return (
    <SvgRamme storrelse={storrelse} tykkelse={2.2} farve={farve}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </SvgRamme>
  );
}

function LaasIkon({ storrelse = 14, farve = 'currentColor' }) {
  return (
    <SvgRamme storrelse={storrelse} tykkelse={2.2} farve={farve}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </SvgRamme>
  );
}

// Udfyldt hjerte. Eneste ikon uden streg.
function HjerteIkon({ storrelse = 16 }) {
  return (
    <svg
      width={storrelse}
      height={storrelse}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M12 21s-7.5-4.7-10-9.3C.4 8.3 2 4.5 5.6 4.5c2 0 3.4 1.1 4.4 2.6C11 5.6 12.4 4.5 14.4 4.5 18 4.5 19.6 8.3 18 11.7 15.5 16.3 12 21 12 21z" />
    </svg>
  );
}

export default function HjertesagCheckout({ hjertesag, forening, onTilbage }) {
  const [beloeb, setBeloeb] = useState(200);
  const [egetBeloeb, setEgetBeloeb] = useState('');
  const [email, setEmail] = useState('');
  const [navn, setNavn] = useState('');
  const [besked, setBesked] = useState('');
  const [anonym, setAnonym] = useState(false);
  const [visFejl, setVisFejl] = useState(false);
  const [sender, setSender] = useState(false);
  const [serverFejl, setServerFejl] = useState('');
  const [knapKlar, setKnapKlar] = useState(false);
  const [knapOpgivet, setKnapOpgivet] = useState(false);

  const tidsurRef = useRef(null);

  // KRITISK: kun en maalt sand vaerdi aabner formularen. Ukendt betyder lukket.
  const kanModtage = forening?.payment_ready === true;

  // Vipps' bibliotek hentes FOERST naar en donor faktisk er i checkout. Saa
  // modtager Vipps ingen forespoergsel fra besoegende der bare laeser siden.
  useEffect(() => {
    if (!kanModtage) return undefined;

    let afbrudt = false;

    if (!document.getElementById(VIPPS_LIB_ID)) {
      const s = document.createElement('script');
      s.id = VIPPS_LIB_ID;
      s.async = true;
      s.type = 'text/javascript';
      s.src = VIPPS_LIB_SRC;
      document.head.appendChild(s);
    }

    if (window.customElements && window.customElements.whenDefined) {
      window.customElements
        .whenDefined('vipps-checkout-button')
        .then(() => {
          if (!afbrudt) setKnapKlar(true);
        })
        .catch(() => {});
    }

    // whenDefined afvises aldrig; den forbliver blot uindfriet hvis scriptet
    // ikke lander. Uden tidsur ville donoren se en tom plads i det uendelige.
    tidsurRef.current = window.setTimeout(() => {
      if (!afbrudt) setKnapOpgivet(true);
    }, KNAP_TIMEOUT_MS);

    return () => {
      afbrudt = true;
      if (tidsurRef.current) window.clearTimeout(tidsurRef.current);
    };
  }, [kanModtage]);

  const egetTal = egetBeloeb === '' ? 0 : parseInt(egetBeloeb.replace(/\D/g, ''), 10) || 0;
  const effektivt = egetBeloeb !== '' ? egetTal : beloeb;

  const beloebGyldigt = effektivt >= MIN_KRONER && effektivt <= MAX_KRONER;
  const emailGyldig = EMAIL_RE.test(email.trim());
  const navnGyldigt = anonym || navn.trim() !== '';
  const gyldig = beloebGyldigt && emailGyldig && navnGyldigt;

  const beloebFejl = visFejl && !beloebGyldigt;
  const emailFejl = visFejl && !emailGyldig;
  const navnFejl = visFejl && !navnGyldigt;

  const emailFejlTekst =
    email.trim() === ''
      ? 'Skriv din e-mail, så vi kan sende din kvittering.'
      : 'Tjek din e-mail. Den ser ikke helt rigtig ud.';

  const beloebFejlTekst =
    effektivt > MAX_KRONER
      ? `Beløbet kan højst være ${kr(MAX_KRONER)} kr.`
      : `Mindstebeløbet er ${kr(MIN_KRONER)} kr.`;

  const visningsnavn = anonym ? 'Anonym støtte' : navn.trim() || 'Dit navn';
  const visningsInitialer = anonym ? '' : navn.trim() ? initialer(navn) : '?';
  const visningsBesked = besked.trim()
    ? `\u201C${besked.trim()}\u201D`
    : 'Din besked til foreningen vises her \u2026';
  const visningsBadge = anonym ? 'Anonym' : navn.trim() ? 'Tilpasset' : 'Dit navn';

  const pct = procent(hjertesag.indsamlet_beloeb, hjertesag.maalbeloeb);

  function vaelgBeloeb(v) {
    setBeloeb(v);
    setEgetBeloeb('');
  }

  function paaEgetBeloeb(e) {
    const cifre = e.target.value.replace(/\D/g, '');
    setEgetBeloeb(cifre === '' ? '' : parseInt(cifre, 10).toLocaleString('da-DK'));
  }

  function fejlTekst(status, kode) {
    if (status === 409) {
      return 'Foreningen kan ikke modtage bidrag lige nu. Prøv igen om et par dage.';
    }
    if (status === 404) {
      return 'Vi kunne ikke finde hjertesagen. Prøv at genindlæse siden.';
    }
    if (status === 400) {
      return 'Tjek dine oplysninger og prøv igen.';
    }
    if (kode === 'payment_create_failed') {
      return 'Vi kunne ikke oprette betalingen hos MobilePay. Prøv igen om lidt.';
    }
    return 'Noget gik galt. Prøv igen om lidt.';
  }

  async function betal() {
    if (sender) return;

    if (!gyldig) {
      setVisFejl(true);
      return;
    }

    setSender(true);
    setServerFejl('');

    // Ruten kraever https. Paa localhost afvises kaldet derfor med 400, og det
    // er korrekt: en returadresse over http maa ikke indgaa i et betalingsflow.
    const returUrl = `${window.location.origin}/#/hjertesag/${hjertesag.slug}`;

    const krop = {
      association_uuid: forening.association_uuid,
      hjertesag_uuid: hjertesag.hjertesag_uuid,
      amount: effektivt * 100,
      donor_email: email.trim(),
      is_anonymous: anonym,
      returnUrl: returUrl,
    };

    if (!anonym) krop.donor_name = navn.trim();
    if (besked.trim() !== '') krop.message = besked.trim();

    try {
      const svar = await fetch(`${SMH_API_URL}/api/mobilepay/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(krop),
      });

      let data = {};
      try {
        data = await svar.json();
      } catch {
        data = {};
      }

      if (svar.ok && harIndhold(data.redirectUrl)) {
        // Bevidst INGEN setSender(false): siden forlades nu.
        window.location.href = data.redirectUrl;
        return;
      }

      setServerFejl(fejlTekst(svar.status, data.error));
      setSender(false);
    } catch {
      setServerFejl('Vi kunne ikke få forbindelse. Tjek din internetforbindelse og prøv igen.');
      setSender(false);
    }
  }

  const topBjaelke = (
    <button type="button" onClick={onTilbage} style={S.tilbageKnap}>
      <PilVenstreIkon />
      Tilbage til hjertesagen
    </button>
  );

  // ---------------------------------------------------------------------
  // Foreningen kan ikke modtage bidrag. Formularen vises slet ikke.
  // ---------------------------------------------------------------------
  if (!kanModtage) {
    return (
      <div style={S.side} className="hs-side">
        <SiteNav />
        <main>
          <section style={{ ...S.wrap, paddingTop: 22, paddingBottom: 8 }}>{topBjaelke}</section>
          <section
            style={{
              ...S.wrap,
              paddingTop: 14,
              paddingBottom: 'clamp(44px,9vw,72px)',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                maxWidth: 520,
                width: '100%',
                textAlign: 'center',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 26,
                padding: 'clamp(28px,6vw,44px)',
                boxShadow: '0 30px 70px -42px rgba(8,14,26,.22)',
              }}
            >
              <span
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: 'var(--alt)',
                  color: 'var(--muted)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <UrIkon />
              </span>
              <h2
                style={{
                  margin: '0 0 12px',
                  fontSize: 'clamp(21px,3vw,26px)',
                  fontWeight: 800,
                  letterSpacing: '-.6px',
                  color: 'var(--ink)',
                }}
              >
                Foreningen kan ikke modtage bidrag endnu
              </h2>
              <p
                style={{
                  margin: '0 auto 26px',
                  maxWidth: 400,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: 'var(--body)',
                }}
              >
                Vi arbejder på at få foreningens MobilePay klar. Prøv igen om et par dage.
              </p>
              <button
                type="button"
                onClick={onTilbage}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 9,
                  padding: CTA_PADDING,
                  height: CTA_MEDIUM,
                  border: 'none',
                  borderRadius: CTA_RADIUS,
                  background: 'var(--brand)',
                  color: '#FFFFFF',
                  fontFamily: 'inherit',
                  fontSize: CTA_SKRIFT,
                  fontWeight: CTA_VAEGT,
                  letterSpacing: CTA_SPAERRING,
                  cursor: 'pointer',
                  boxShadow: '0 14px 32px rgba(224,25,63,.24)',
                }}
              >
                Tilbage til hjertesagen
              </button>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // ---------------------------------------------------------------------
  // MobilePay-knappen. Tegnes ALDRIG af os.
  // ---------------------------------------------------------------------
  let betalingsknap;

  if (!gyldig) {
    betalingsknap = (
      <button
        type="button"
        onClick={() => setVisFejl(true)}
        style={{
          width: '100%',
          height: CTA_MEDIUM,
          padding: CTA_PADDING,
          borderRadius: CTA_RADIUS,
          background: 'var(--alt)',
          border: '1px solid var(--border)',
          color: '#6B7280',
          fontFamily: 'inherit',
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <AdvarselIkon storrelse={16} />
        Udfyld beløb, e-mail og navn
      </button>
    );
  } else if (knapKlar) {
    betalingsknap = (
      <div
        onClick={betal}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') betal();
        }}
        role="button"
        tabIndex={0}
        aria-label="Betal med MobilePay"
        aria-busy={sender}
        style={{
          width: '100%',
          height: CTA_MEDIUM,
          opacity: sender ? 0.6 : 1,
          pointerEvents: sender ? 'none' : 'auto',
        }}
      >
        <vipps-checkout-button
          brand="mobilepay"
          branded="true"
          language="dk"
          verb="donate"
          variant="primary"
          stretched="true"
          rounded="true"
        />
      </div>
    );
  } else {
    // Reservepladsen kan IKKE klikkes. Kan Vipps' knap ikke indlaeses, kan vi
    // ikke tage imod betalingen forsvarligt, og en graa flade der starter et
    // betalingsflow ville reelt vaere vores egen MobilePay-knap.
    betalingsknap = (
      <div
        style={{
          width: '100%',
          height: CTA_MEDIUM,
          padding: CTA_PADDING,
          borderRadius: CTA_RADIUS,
          background: 'var(--alt)',
          border: '1px dashed var(--border)',
          color: 'var(--muted)',
          fontFamily: 'inherit',
          fontSize: 13.5,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 16px',
        }}
      >
        {knapOpgivet
          ? 'Vi kan ikke indlæse MobilePay lige nu. Prøv at genindlæse siden.'
          : 'MobilePay indlæses \u2026'}
      </div>
    );
  }

  // ---------------------------------------------------------------------
  // Formularen
  // ---------------------------------------------------------------------
  return (
    <div style={S.side} className="hs-side">
      <SiteNav />
      <main>
        <section
          style={{
            ...S.wrap,
            paddingTop: 22,
            paddingBottom: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
            flexWrap: 'wrap',
          }}
        >
          {topBjaelke}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '7px 14px',
              borderRadius: 999,
              background: '#ECFDF3',
              border: '1px solid #BBF7D0',
              color: '#15803D',
              fontSize: 12.5,
              fontWeight: 700,
              letterSpacing: '.3px',
            }}
          >
            <LaasIkon />
            SIKKER BETALING
          </span>
        </section>

        <section style={{ ...S.wrap, paddingTop: 14, paddingBottom: 'clamp(44px,9vw,72px)' }}>
          <div className="hs-co-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* TRIN 1 */}
              <div style={S.kort}>
                <div style={S.trinLabel}>Trin 1</div>
                <h2 style={S.h2Trin}>Vælg dit støttebeløb</h2>

                <div className="hs-amt-grid">
                  {BELOEBSVALG.map((v) => {
                    const valgt = egetBeloeb === '' && beloeb === v;
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => vaelgBeloeb(v)}
                        aria-pressed={valgt}
                        className="hs-liftable"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 5,
                          padding: '18px 10px',
                          borderRadius: 16,
                          fontFamily: 'inherit',
                          fontSize: 19,
                          fontWeight: 800,
                          letterSpacing: '-.3px',
                          cursor: 'pointer',
                          background: 'var(--surface)',
                          border: valgt ? '2px solid var(--brand)' : '1.5px solid var(--border)',
                          color: valgt ? 'var(--brand-hover)' : 'var(--ink)',
                          boxShadow: valgt ? '0 10px 24px rgba(224,25,63,.14)' : 'none',
                        }}
                      >
                        {kr(v)}{' '}
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>
                          kr
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop: 18 }}>
                  <label htmlFor="hs-eget-beloeb" style={S.feltLabel}>
                    Eller indtast eget beløb
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: 18,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: 16,
                        fontWeight: 700,
                        color: 'var(--muted)',
                      }}
                    >
                      kr
                    </span>
                    <input
                      id="hs-eget-beloeb"
                      className="hs-field"
                      type="text"
                      inputMode="numeric"
                      placeholder="0"
                      value={egetBeloeb}
                      onChange={paaEgetBeloeb}
                      style={{
                        paddingLeft: 48,
                        paddingRight: 46,
                        borderColor: beloebFejl ? '#B4122F' : undefined,
                      }}
                    />
                    {egetBeloeb !== '' && (
                      <button
                        type="button"
                        onClick={() => setEgetBeloeb('')}
                        aria-label="Ryd beløb"
                        title="Ryd beløb"
                        style={{
                          position: 'absolute',
                          right: 9,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 30,
                          height: 30,
                          borderRadius: '50%',
                          border: 'none',
                          background: 'var(--alt)',
                          color: 'var(--muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          padding: 0,
                        }}
                      >
                        <KrydsIkon />
                      </button>
                    )}
                  </div>

                  {beloebFejl ? (
                    <div style={S.fejltekst}>
                      <AdvarselIkon />
                      <span>{beloebFejlTekst}</span>
                    </div>
                  ) : (
                    <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 8 }}>
                      Mindstebeløb er {kr(MIN_KRONER)} kr
                    </div>
                  )}
                </div>
              </div>

              {/* TRIN 2 */}
              <div style={S.kort}>
                <div style={S.trinLabel}>Trin 2</div>
                <h2 style={{ ...S.h2Trin, marginBottom: 6 }}>Hvordan vil du gerne vises?</h2>
                <p
                  style={{
                    margin: '0 0 20px',
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: 'var(--muted)',
                  }}
                >
                  Skriv en personlig hilsen samtidig med at du viser din støtte. Du bestemmer helt
                  selv, hvad der skal stå til foreningen.
                </p>

                <div style={{ marginBottom: 18 }}>
                  <label htmlFor="hs-email" style={S.feltLabel}>
                    Din e-mail
                  </label>
                  <input
                    id="hs-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="navn@eksempel.dk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={emailFejl}
                    style={{
                      ...S.tekstfelt,
                      border: `1.5px solid ${emailFejl ? '#B4122F' : 'var(--border)'}`,
                    }}
                  />
                  {emailFejl ? (
                    <div style={S.fejltekst}>
                      <AdvarselIkon />
                      <span>{emailFejlTekst}</span>
                    </div>
                  ) : (
                    <div style={S.hjaelpetekst}>
                      <KuvertIkon />
                      <span>
                        Vi sender din kvittering hertil. Din adresse vises aldrig på støttevæggen.
                      </span>
                    </div>
                  )}
                </div>

                <div style={anonym ? { opacity: 0.45, pointerEvents: 'none' } : undefined}>
                  <label htmlFor="hs-navn" style={S.feltLabel}>
                    Navn på hilsenen
                  </label>
                  <input
                    id="hs-navn"
                    type="text"
                    maxLength={40}
                    autoComplete="name"
                    placeholder="Fx Familien Hansen"
                    value={navn}
                    onChange={(e) => setNavn(e.target.value)}
                    disabled={anonym}
                    aria-invalid={navnFejl}
                    style={{
                      ...S.tekstfelt,
                      border: `1.5px solid ${navnFejl ? '#B4122F' : 'var(--border)'}`,
                    }}
                  />
                  {navnFejl && (
                    <div style={S.fejltekst}>
                      <AdvarselIkon />
                      <span>Skriv dit navn, eller slå anonym støtte til.</span>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: 18 }}>
                  <label htmlFor="hs-besked" style={S.feltLabel}>
                    Personlig besked til foreningen{' '}
                    <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(valgfrit)</span>
                  </label>
                  <textarea
                    id="hs-besked"
                    className="hs-area"
                    maxLength={200}
                    placeholder="Skriv en kort hilsen, fx 'Held og lykke, mine børn elsker klubben!'"
                    value={besked}
                    onChange={(e) => setBesked(e.target.value)}
                  />
                  <div
                    style={{
                      textAlign: 'right',
                      fontSize: 12,
                      color: 'var(--label)',
                      marginTop: 4,
                    }}
                  >
                    {besked.length} / 200
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 8,
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    background: 'var(--alt)',
                    padding: '14px 16px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: '.6px',
                        textTransform: 'uppercase',
                        color: 'var(--label)',
                      }}
                    >
                      Sådan vises din hilsen
                    </span>
                    <span
                      style={{
                        padding: '3px 9px',
                        borderRadius: 999,
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        fontSize: 11,
                        fontWeight: 700,
                        color: 'var(--body)',
                      }}
                    >
                      {visningsBadge}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <span
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        background: 'var(--brand-surface)',
                        color: 'var(--brand-hover)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: 13.5,
                        fontWeight: 800,
                        letterSpacing: '.3px',
                      }}
                    >
                      {anonym ? (
                        <HjerteIkon />
                      ) : (
                        visningsInitialer
                      )}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 7,
                          flexWrap: 'wrap',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 14.5,
                            fontWeight: 700,
                            color: 'var(--ink)',
                            letterSpacing: '-.2px',
                          }}
                        >
                          {visningsnavn}
                        </span>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            fontSize: 12,
                            color: '#15803D',
                            fontWeight: 700,
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              background: '#22C55E',
                            }}
                          />
                          lige nu
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 13.5,
                          lineHeight: 1.5,
                          color: 'var(--body)',
                          marginTop: 3,
                        }}
                      >
                        {visningsBesked}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ height: 1, background: 'var(--border)', margin: '22px 0' }} />

                <button
                  type="button"
                  onClick={() => setAnonym((v) => !v)}
                  aria-pressed={anonym}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '16px 18px',
                    borderRadius: 18,
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    textAlign: 'left',
                    background: anonym ? 'var(--brand-surface)' : 'var(--surface)',
                    border: `1.5px solid ${anonym ? 'var(--brand)' : 'var(--border)'}`,
                  }}
                >
                  <span
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: 'var(--alt)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'var(--muted)',
                    }}
                  >
                    <OejeSlukketIkon />
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display: 'block',
                        fontSize: 15.5,
                        fontWeight: 700,
                        color: 'var(--ink)',
                      }}
                    >
                      Donér anonymt
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: 'var(--muted)',
                        marginTop: 2,
                      }}
                    >
                      Foreningen ser ikke dit navn. Din hilsen vises som &quot;Anonym støtte&quot;.
                    </span>
                  </span>
                  <span
                    style={{
                      width: 46,
                      height: 27,
                      borderRadius: 999,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      padding: 3,
                      background: anonym ? 'var(--brand)' : '#D5DAE2',
                    }}
                  >
                    <span
                      style={{
                        width: 21,
                        height: 21,
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        boxShadow: '0 1px 3px rgba(0,0,0,.25)',
                        transform: `translateX(${anonym ? 19 : 0}px)`,
                      }}
                    />
                  </span>
                </button>
              </div>
            </div>

            {/* HOEJRE: SAMMENDRAG */}
            <aside>
              <div className="hs-sticky">
                <div
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 26,
                    padding: 'clamp(18px,4.5vw,28px)',
                    boxShadow: '0 30px 70px -42px rgba(8,14,26,.22)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      letterSpacing: '.5px',
                      textTransform: 'uppercase',
                      color: 'var(--label)',
                      marginBottom: 14,
                    }}
                  >
                    Du støtter
                  </div>

                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 18 }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 13,
                        background: 'var(--navy1)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {initialer(hjertesag.kampagnenavn)}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: 'var(--ink)',
                          letterSpacing: '-.3px',
                        }}
                      >
                        {hjertesag.kampagnenavn}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 13,
                          color: 'var(--muted)',
                          marginTop: 1,
                        }}
                      >
                        {forening.foreningsnavn}
                        {harIndhold(forening.by) && (
                          <>
                            {' \u00B7 '}
                            <StedIkon />
                            {forening.by}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 8 }}>
                    {kr(hjertesag.indsamlet_beloeb)} kr af {kr(hjertesag.maalbeloeb)} kr{' '}
                    <span
                      style={{ float: 'right', fontWeight: 800, color: 'var(--brand-hover)' }}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 8,
                      borderRadius: 999,
                      background: 'var(--alt)',
                      overflow: 'hidden',
                      marginBottom: 22,
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        borderRadius: 999,
                        background: 'linear-gradient(90deg,#16A34A,#22C55E)',
                      }}
                    />
                  </div>

                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      letterSpacing: '.5px',
                      textTransform: 'uppercase',
                      color: 'var(--label)',
                      marginBottom: 14,
                    }}
                  >
                    Sammendrag
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 14,
                    }}
                  >
                    <span style={{ fontSize: 14.5, color: 'var(--body)' }}>Dit bidrag</span>
                    <span style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--ink)' }}>
                      {kr(effektivt)} kr
                    </span>
                  </div>
                  <div style={{ height: 1, background: 'var(--border)', marginBottom: 16 }} />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      marginBottom: 20,
                    }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>
                      Du betaler
                    </span>
                    <span
                      style={{
                        fontSize: 26,
                        fontWeight: 800,
                        letterSpacing: '-.8px',
                        color: 'var(--ink)',
                      }}
                    >
                      {kr(effektivt)} kr
                    </span>
                  </div>

                  <div style={{ height: CTA_MEDIUM }}>{betalingsknap}</div>

                  {harIndhold(serverFejl) && (
                    <div
                      role="alert"
                      style={{
                        marginTop: 14,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        padding: '14px 16px',
                        borderRadius: 16,
                        background: 'var(--brand-surface)',
                        border: '1px solid var(--brand-border)',
                      }}
                    >
                      <AdvarselIkon storrelse={18} tykkelse={2.4} />
                      <span
                        style={{
                          fontSize: 13.5,
                          lineHeight: 1.5,
                          color: '#B4122F',
                          fontWeight: 500,
                        }}
                      >
                        {serverFejl}
                      </span>
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 18,
                      marginTop: 16,
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 12.5,
                        color: 'var(--muted)',
                        fontWeight: 600,
                      }}
                    >
                      <LaasIkon farve="#15803D" />
                      Sikker betaling
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 12.5,
                        color: 'var(--muted)',
                        fontWeight: 600,
                      }}
                    >
                      <SkjoldIkon farve="#15803D" />
                      Foreningen er CVR-tjekket
                    </span>
                  </div>

                  <p
                    style={{
                      margin: '14px 0 0',
                      textAlign: 'center',
                      fontSize: 12,
                      lineHeight: 1.5,
                      color: 'var(--label)',
                    }}
                  >
                    Ved at donere accepterer du vores{' '}
                    <Link to="/betingelser" style={{ color: 'var(--muted)' }}>
                      betingelser
                    </Link>{' '}
                    og{' '}
                    <Link to="/privatlivspolitik" style={{ color: 'var(--muted)' }}>
                      privatlivspolitik
                    </Link>
                    .
                  </p>

                  <p
                    style={{
                      margin: '14px 0 0',
                      paddingTop: 14,
                      borderTop: '1px solid var(--border)',
                      fontSize: 12,
                      lineHeight: 1.6,
                      color: 'var(--muted)',
                    }}
                  >
                    Bidragene modtages direkte på foreningens egen MobilePay-konto. StøtMedHjerte
                    tager ingen andel af bidragene, og abonnementet for platformen afholdes
                    særskilt af foreningen og er ikke trukket fra bidragene.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
