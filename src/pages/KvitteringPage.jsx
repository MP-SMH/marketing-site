import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SMH_API_URL } from '../lib/supabaseClient';
import SiteNav from '@/components/marketing/SiteNav';
import SiteFooter from '@/components/marketing/SiteFooter';
import { ctaBoks, CTA_STOR, CTA_MEDIUM } from '../lib/cta';

/**
 * Kvitteringsside. Vises efter et betalingsflow via /kvittering/:reference.
 * Uden reference i ruten vises "vi kan ikke finde den kvittering", saa en
 * donor der lander uden reference ikke ser en 404.
 *
 * KILDE: cd-s99/Kvittering.dc.html. Markup, farver og typografi er fulgt
 * 1:1 paa naer de bevidste fravalg herunder.
 *
 * IKKE KONVERTERET, alle bevidst fravalgt:
 *  - Prototype-skifteren og "Afspil betalingsflow" (kun til gennemsyn).
 *  - Fejringen: partikler, ringe, glow og optaelling. Se _celebrate() i
 *    prototypen. Success vises i sin hvilende bekraeftede tilstand med det
 *    samme, uden animation. Den tilhoerende CSS er derfor ikke medtaget.
 *  - Prototypens egne knap-tal. Knapper bygges med ctaBoks() fra lib/cta.
 *
 * ENHEDER: beloeb_oere er OERE og divideres med 100. Format som _fmtKr.
 */

// Rutens status-vaerdier afbildes praecist til de tre visningsgrupper.
const POLL_MS = 3000;
const TIMEOUT_MS = 60000;
// S102: efter TIMEOUT_MS holder siden IKKE op med at spoerge. Den skifter til
// den beroligende besked og spoerger videre i et langsommere interval.
// Begrundelse: en capture kan traekke ud uden at noget er galt, og donorens
// vigtigste oejeblik er bekraeftelsen. Giver siden op, ser donoren aldrig at
// betalingen lykkedes, selv om pengene er landet hos foreningen.
const POLL_LANGSOM_MS = 10000;

function harIndhold(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

// Praecis som _fmtKr i prototypen. Punktum som tusindtalsskilletegn, "kr."
// med punktum til slut. Oere vises kun naar beloebet ikke gaar op i hele kroner.
function fmtKr(oere) {
  const kroner = Number(oere) / 100;
  const dec = (Number(oere) % 100) !== 0;
  return (
    kroner.toLocaleString('da-DK', {
      minimumFractionDigits: dec ? 2 : 0,
      maximumFractionDigits: dec ? 2 : 0,
    }) + ' kr.'
  );
}

// Praecis som _fmtTid i prototypen.
function fmtTid(iso) {
  if (!iso) return null;
  const m = [
    'januar', 'februar', 'marts', 'april', 'maj', 'juni',
    'juli', 'august', 'september', 'oktober', 'november', 'december',
  ];
  const d = new Date(String(iso).replace(' ', 'T'));
  if (Number.isNaN(d.getTime())) return null;
  const two = (n) => String(n).padStart(2, '0');
  return `${d.getDate()}. ${m[d.getMonth()]} ${d.getFullYear()} kl. ${two(d.getHours())}.${two(d.getMinutes())}`;
}

const C = {
  brandInk: '#C8112F',
  navy: '#132238',
  body: '#4B5565',
  note: '#5A6577',
  border: '#E5E7EB',
  alt: '#F3F5F8',
  muted: '#55606F',
  greenBg: '#ECFDF3',
  greenInk: '#166534',
  linkInk: '#A00C24',
};

const S = {
  side: {
    background: 'var(--page)',
    backgroundImage: 'radial-gradient(1200px 600px at 50% -10%, #FFF6F7 0%, #F7F8FB 60%)',
    backgroundRepeat: 'no-repeat',
    minHeight: '60vh',
  },
  section: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: 'clamp(40px,7vw,80px) 20px clamp(56px,9vw,104px)',
    minHeight: '56vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 560,
    background: 'var(--surface)',
    border: `1px solid ${C.border}`,
    borderRadius: 26,
    padding: 'clamp(30px,6vw,52px) clamp(22px,5vw,44px)',
    boxShadow: '0 30px 70px -42px rgba(8,14,26,.22)',
    textAlign: 'center',
  },
  kicker: {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '.8px',
    textTransform: 'uppercase',
    color: C.brandInk,
    margin: '0 0 16px',
  },
  emblem: {
    width: 96,
    height: 96,
    borderRadius: '50%',
    background: C.greenBg,
    color: C.greenInk,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 26px',
  },
  emblemNeutral: {
    width: 76,
    height: 76,
    borderRadius: '50%',
    background: C.alt,
    color: C.muted,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 22px',
  },
  amount: {
    fontSize: 'clamp(38px,8vw,52px)',
    fontWeight: 800,
    letterSpacing: '-1.4px',
    color: C.navy,
    lineHeight: 1,
    margin: '0 0 14px',
  },
  title: {
    fontSize: 'clamp(22px,4vw,27px)',
    fontWeight: 800,
    letterSpacing: '-.6px',
    color: C.navy,
    margin: '0 0 12px',
  },
  lead: {
    fontSize: 16,
    lineHeight: 1.6,
    color: C.body,
    margin: '0 auto',
    maxWidth: 400,
  },
  note: {
    fontSize: 14,
    lineHeight: 1.55,
    color: C.note,
    margin: '16px auto 0',
    maxWidth: 390,
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    alignItems: 'center',
    margin: '24px 0 2px',
  },
  time: { fontSize: 14, color: C.note },
  direct: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    padding: '8px 15px',
    borderRadius: 999,
    background: C.greenBg,
    color: C.greenInk,
    fontSize: 13,
    fontWeight: 600,
  },
  primary: {
    ...ctaBoks(CTA_STOR),
    display: 'inline-flex',
    background: 'var(--brand)',
    color: '#FFFFFF',
    border: 'none',
    marginTop: 28,
  },
  secondary: {
    ...ctaBoks(CTA_MEDIUM),
    display: 'inline-flex',
    background: 'var(--surface)',
    border: `1px solid ${C.border}`,
    color: C.navy,
    marginTop: 18,
  },
  link: {
    display: 'inline-block',
    marginTop: 16,
    fontSize: 14,
    fontWeight: 600,
    color: C.brandInk,
    textDecoration: 'none',
  },
};

function Check({ storrelse = 44, tykkelse = 2.6 }) {
  return (
    <svg
      width={storrelse}
      height={storrelse}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={tykkelse}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function FejlIkon({ variant }) {
  const faelles = {
    width: 34,
    height: 34,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  if (variant === 'mislykkedes') {
    return (
      <svg {...faelles}>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    );
  }
  if (variant === 'fejl502') {
    return (
      <svg {...faelles}>
        <path d="M12 3v5M12 21v-3" />
        <path d="M5 12H2M22 12h-3" />
        <circle cx="12" cy="12" r="3.4" />
        <path d="M6.3 6.3 4.2 4.2M19.8 19.8l-2.1-2.1" />
      </svg>
    );
  }
  // ukendt
  return (
    <svg {...faelles}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

const STIL = `
.kvp-spin{width:34px;height:34px;border-radius:50%;border:3px solid ${C.border};border-top-color:${C.brandInk};margin:0 auto 24px;animation:kvpSpin .9s linear infinite;}
@keyframes kvpSpin{to{transform:rotate(360deg);}}
@media (prefers-reduced-motion: reduce){.kvp-spin{animation:none;}}
.kvp-primary:hover{background:var(--brand-hover,#C8112F) !important;color:#fff;}
.kvp-secondary:hover{background:${C.alt} !important;}
.kvp-link:hover{color:${C.linkInk} !important;}
/* Beta bruger 520px som graense: under den skal knapper fylde fuld bredde,
   som resten af fladen (Home.css .cta-w). Reglen staar lokalt her fordi den
   delte klasse cta-w kun er defineret i Home.css og SiteFooter.css og ikke
   indlaest globalt. 519px moeder Home.css' min-width 520px uden overlap.
   Den rigtige samling af reglen ligger i BACKLOG S99-CTA-BREDDE-SAMLING. */
@media (max-width: 519px){
  .kvp-primary, .kvp-secondary { width: 100%; }
}
`;

export default function KvitteringPage() {
  const { reference } = useParams();
  const [phase, setPhase] = useState('loading');
  const [data, setData] = useState(null);
  const [timeout, setTimeoutFlag] = useState(false);

  const pollRef = useRef(null);
  const startRef = useRef(0);
  const intervalRef = useRef(0);

  const stopPoll = useCallback(() => {
    if (pollRef.current) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const hentStatus = useCallback(async () => {
    if (!harIndhold(reference)) {
      stopPoll();
      setData(null);
      setPhase('ukendt');
      return;
    }

    let svar;
    try {
      svar = await fetch(`${SMH_API_URL}/api/public/donation/${encodeURIComponent(reference)}`);
    } catch {
      stopPoll();
      setPhase('fejl502');
      return;
    }

    if (svar.status === 404) {
      stopPoll();
      setPhase('ukendt');
      return;
    }
    if (!svar.ok) {
      stopPoll();
      setPhase('fejl502');
      return;
    }

    let svardata;
    try {
      svardata = await svar.json();
    } catch {
      stopPoll();
      setPhase('fejl502');
      return;
    }

    setData(svardata);
    const status = svardata && svardata.status;

    if (status === 'gennemfoert') {
      stopPoll();
      setTimeoutFlag(false);
      setPhase('gennemfoert');
      return;
    }
    if (status === 'mislykkedes') {
      stopPoll();
      setTimeoutFlag(false);
      setPhase('mislykkedes');
      return;
    }
    if (status === 'undervejs') {
      setPhase('undervejs');
      const erOvertid = Date.now() - startRef.current >= TIMEOUT_MS;
      const oensketInterval = erOvertid ? POLL_LANGSOM_MS : POLL_MS;

      if (erOvertid) {
        setTimeoutFlag(true);
      }

      // Skift interval ved overgangen til overtid, ellers ville siden blive
      // ved med at spoerge hvert tredje sekund i timevis.
      if (erOvertid && intervalRef.current !== POLL_LANGSOM_MS) {
        stopPoll();
      }

      if (!pollRef.current) {
        intervalRef.current = oensketInterval;
        pollRef.current = window.setInterval(() => { hentStatus(); }, oensketInterval);
      }
      return;
    }

    stopPoll();
    setPhase('fejl502');
  }, [reference, stopPoll]);

  // Siden viser en konkret donations beloeb, forening og hjertesag. Den maa
  // ALDRIG indekseres. HashRouter holder soegemaskiner ude i dag, men den
  // beskyttelse falder bort den dag vi skifter til BrowserRouter paa apex.
  // Derfor saettes robots-metaet direkte i head, uafhaengigt af router.
  useEffect(() => {
    const FLAG = 'kvittering-noindex';
    let meta = document.head.querySelector(`meta[data-tag="${FLAG}"]`);
    let oprettetHer = false;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      meta.setAttribute('content', 'noindex, nofollow');
      meta.setAttribute('data-tag', FLAG);
      document.head.appendChild(meta);
      oprettetHer = true;
    }
    return () => {
      if (oprettetHer && meta.parentNode) meta.parentNode.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    document.title = 'Kvittering | StøtMedHjerte';
    startRef.current = Date.now();
    setTimeoutFlag(false);
    setPhase('loading');
    hentStatus();
    return () => stopPoll();
  }, [hentStatus, stopPoll]);

  function opdater() {
    startRef.current = Date.now();
    setTimeoutFlag(false);
    setPhase('loading');
    // S102: knappen skal give oejeblikkelig virkning. Uden nulstilling ville
    // siden fortsaette i det langsomme interval, mens teksten lover et par
    // sekunder.
    stopPoll();
    intervalRef.current = 0;
    hentStatus();
  }

  const forening = harIndhold(data?.foreningsnavn) ? data.foreningsnavn : null;
  const sag = harIndhold(data?.hjertesagsnavn) ? data.hjertesagsnavn : null;
  const slug = harIndhold(data?.hjertesagsslug) ? data.hjertesagsslug : null;
  const amountStr = data ? fmtKr(data.beloeb_oere) : '';
  const timeStr = fmtTid(data?.oprettet);

  const direkte = (
    <span style={S.direct}>
      <Check storrelse={14} tykkelse={2.2} />
      Direkte til foreningens MobilePay
    </span>
  );

  function primaerTilbage() {
    if (slug) {
      return (
        <Link className="kvp-primary" to={`/hjertesag/${slug}`} style={S.primary}>
          Tilbage til hjertesagen
        </Link>
      );
    }
    return (
      <Link className="kvp-primary" to="/" style={S.primary}>
        Til forsiden
      </Link>
    );
  }

  let indhold;

  if (phase === 'gennemfoert') {
    let successLine;
    if (forening && sag) successLine = `Du har støttet ${sag} hos ${forening}.`;
    else if (sag) successLine = `Du har støttet ${sag}.`;
    else if (forening) successLine = `Du har støttet ${forening}.`;
    else successLine = 'Din støtte er registreret.';

    indhold = (
      <div>
        <p style={S.kicker}>Tak for din støtte</p>
        <div style={S.emblem}>
          <Check />
        </div>
        <div style={S.amount}>{amountStr}</div>
        <p style={S.lead}>{successLine}</p>
        <div style={S.meta}>
          {timeStr && <span style={S.time}>{timeStr}</span>}
          {direkte}
        </div>
        <div style={{ minHeight: 8 }} aria-hidden="true" />
        {primaerTilbage()}
      </div>
    );
  } else if (phase === 'undervejs' || phase === 'loading') {
    let recip = '';
    if (forening && sag) recip = ` til ${sag} hos ${forening}`;
    else if (sag) recip = ` til ${sag}`;
    else if (forening) recip = ` til ${forening}`;
    const waitingLine =
      phase === 'loading'
        ? 'Vi henter din kvittering.'
        : `Din betaling${recip} er registreret. Pengene lander om et øjeblik.`;

    indhold = (
      <div>
        <div className="kvp-spin" role="status" aria-label="Betalingen behandles" />
        {phase === 'undervejs' && <div style={S.amount}>{amountStr}</div>}
        <p style={S.lead}>{waitingLine}</p>
        {phase === 'undervejs' && !timeout && (
          <p style={S.note}>Vi tjekker automatisk hvert par sekunder.</p>
        )}
        {phase === 'undervejs' && timeout && (
          <div>
            <p style={S.note}>
              Det tager længere end normalt. Du kan roligt lukke siden. Din betaling er
              registreret, og der kræves ikke mere af dig.
            </p>
            <button type="button" className="kvp-secondary" style={S.secondary} onClick={opdater}>
              Opdater status
            </button>
          </div>
        )}
        {phase === 'undervejs' && (
          <div style={S.meta}>{direkte}</div>
        )}
      </div>
    );
  } else {
    // Fejl- og neutrale tilstande: mislykkedes, ukendt, fejl502.
    let errorTitle;
    let errorBody;
    if (phase === 'mislykkedes') {
      errorTitle = 'Betalingen blev ikke gennemført';
      errorBody =
        'Der er ikke trukket nogen penge. Du er velkommen til at prøve igen, når det passer dig.';
    } else if (phase === 'fejl502') {
      errorTitle = 'Vi kan ikke slå betalingen op lige nu';
      errorBody =
        'Betalingen kan være gået fint. Vi kan bare ikke slå den op i øjeblikket. Prøv igen om lidt.';
    } else {
      errorTitle = 'Vi kan ikke finde den kvittering';
      errorBody = 'Linket ser ikke ud til at passe til en betaling. Tjek linket, eller gå til forsiden.';
    }

    let primaer;
    let sekundaer = null;
    if (phase === 'mislykkedes') {
      primaer = primaerTilbage();
    } else if (phase === 'fejl502') {
      primaer = (
        <button type="button" className="kvp-primary" style={S.primary} onClick={opdater}>
          Prøv igen
        </button>
      );
      sekundaer = (
        <Link className="kvp-link" to="/" style={S.link}>
          Gå til forsiden
        </Link>
      );
    } else {
      primaer = (
        <Link className="kvp-primary" to="/" style={S.primary}>
          Til forsiden
        </Link>
      );
    }

    indhold = (
      <div>
        <div style={S.emblemNeutral}>
          <FejlIkon variant={phase} />
        </div>
        <h1 style={S.title}>{errorTitle}</h1>
        <p style={S.lead}>{errorBody}</p>
        {primaer}
        {sekundaer && <div>{sekundaer}</div>}
      </div>
    );
  }

  return (
    <div style={S.side}>
      <style>{STIL}</style>
      <SiteNav />
      <main style={{ position: 'relative' }}>
        <section style={S.section}>
          <div style={S.card}>{indhold}</div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
