import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SMH_API_URL } from '../lib/supabaseClient';
import SiteNav from '@/components/marketing/SiteNav';
import SiteFooter from '@/components/marketing/SiteFooter';
import HjertesagCheckout from './HjertesagCheckout';
import { CTA_STOR, CTA_MEDIUM, CTA_RADIUS, CTA_PADDING, CTA_SKRIFT, CTA_SKRIFT_SEKUNDAER, CTA_VAEGT, CTA_SPAERRING } from '../lib/cta';

/**
 * Offentlig hjertesagsside. Rute: /hjertesag/:slug
 *
 * Data hentes fra smh-api (GET /api/public/hjertesag/:slug), IKKE fra
 * Supabase i browseren: RLS kraever rollen supporter, og stoettere logger
 * aldrig ind.
 *
 * DEL 2 af 4: detaljevisning. Checkout foelger i del 3-4.
 *
 * STRUKTUR: foelger CD-prototypen Hjertesag.dc.html. Gitteret hs-detail-grid
 * har tre omraader: galleri oeverst i venstre spalte, om-teksten under, og
 * stoet-kortet i hoejre spalte over begge raekker. Reglerne staar i index.css.
 *
 * FARVER: --muted og --border er kapret af shadcn i index.css og staar der som
 * HSL-komponenter uden hsl(). De saettes derfor lokalt til CD's hex paa
 * .hs-side. Uden det falder teksten tavst tilbage til arvet farve.
 *
 * BILLEDER: fast aspect-ratio reserverer pladsen foer filen lander, saa intet
 * hopper. Cover er fetchPriority high og IKKE lazy. Kilden skal altid vaere en
 * lokal fil: eksterne vaerter modtager den besoegendes IP.
 */

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
  besked: { maxWidth: 620, margin: '0 auto', padding: '80px 20px', textAlign: 'center' },
  h1Besked: { fontSize: 28, fontWeight: 700, color: 'var(--ink)', margin: '0 0 12px' },
  pBesked: { fontSize: 15, lineHeight: 1.7, color: 'var(--body)', margin: 0 },
  h2Afsnit: {
    margin: '0 0 8px',
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: '-.6px',
    color: 'var(--ink)',
  },
  // 13px label. Kontrastkravet under 14px er 5,5:1. --brand (#E0193F) maaler
  // 4,58:1 og maa ikke bruges som tekst. --brand-hover (#C8112F) maaler 5,87:1.
  overLabel: {
    display: 'block',
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '.8px',
    textTransform: 'uppercase',
    color: 'var(--brand-hover)',
    marginBottom: 12,
  },
  sekundaerKnap: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    padding: CTA_PADDING,
    height: CTA_MEDIUM,
    border: '1px solid var(--border)',
    borderRadius: CTA_RADIUS,
    background: 'var(--surface)',
    color: 'var(--ink)',
    fontSize: CTA_SKRIFT_SEKUNDAER,
    fontWeight: CTA_VAEGT,
    letterSpacing: CTA_SPAERRING,
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
};

// Dansk tusindtalsformat. 25000 -> "25.000"
function kr(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return '0';
  return n.toLocaleString('da-DK', { maximumFractionDigits: 0 });
}

// Procent afrundet ned, altid 0-100.
function procent(indsamlet, maal) {
  const i = Number(indsamlet);
  const m = Number(maal);
  if (!Number.isFinite(i) || !Number.isFinite(m) || m <= 0) return 0;
  return Math.max(0, Math.min(100, Math.floor((i / m) * 100)));
}

// Tom streng er IKKE null i databasen. Tjek paa indhold, ikke eksistens.
function harIndhold(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

// Beloeb fra direct_donations er i OERE. causes er i KRONER. Forveksl dem ikke.
function oere(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.round(n / 100);
}

// Relativ tid paa dansk. Faldet tilbage til dato efter 30 dage.
function tidSiden(iso) {
  if (!harIndhold(iso)) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const min = Math.floor((Date.now() - d.getTime()) / 60000);
  if (min < 1) return 'lige nu';
  if (min < 60) return `for ${min} min siden`;
  const timer = Math.floor(min / 60);
  if (timer < 24) return timer === 1 ? 'for 1 time siden' : `for ${timer} timer siden`;
  const dage = Math.floor(timer / 24);
  if (dage === 1) return 'i går';
  if (dage < 30) return `for ${dage} dage siden`;
  return d.toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' });
}

// CD's avatarpalet. Fire par, valgt deterministisk paa indeks.
// KONTRAST MAALT S92 med scripts/kontrast.js. Initialerne er 13,5px,
// altsaa UNDER 14px, hvor kravet er 5,5:1 og ikke 4,5:1.
// CD's egne par maalte 4,00 / 9,52 / 4,76 / 4,73. Tre af fire faldt.
// Rettet til 6,81 / 9,52 / 6,76 / 7,19. Aendres en vaerdi, koer
// node scripts/kontrast.js igen foer commit.
const AVATAR_FARVER = [
  { bg: '#FFE4E8', fg: '#A00C24' },
  { bg: '#E7ECF5', fg: '#2A3B57' },
  { bg: '#ECFDF3', fg: '#166534' },
  { bg: '#FFF7EC', fg: '#8A3D06' },
];

function HjerteIkon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21s-7.5-4.7-10-9.3C.4 8.3 2 4.5 5.6 4.5c2 0 3.4 1.1 4.4 2.6C11 5.6 12.4 4.5 14.4 4.5 18 4.5 19.6 8.3 18 11.7 15.5 16.3 12 21 12 21z" />
    </svg>
  );
}

function initialer(navn) {
  if (!harIndhold(navn)) return '?';
  return navn
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((ord) => ord[0])
    .join('')
    .toUpperCase();
}

// Vaerdien i databasen er en noegle, ikke visningstekst.
const PARAGRAF_TEKST = {
  paragraf_3: 'efter indsamlingslovens § 3',
  paragraf_4: 'efter indsamlingslovens § 4',
};

function datoDK(iso) {
  if (!harIndhold(iso)) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' });
}

function Etiket({ farve, baggrund, mono, children }) {
  return (
    <span
      style={{
        padding: '3px 9px',
        borderRadius: mono ? 8 : 999,
        background: baggrund,
        color: farve,
        fontSize: mono ? 11 : 10.5,
        fontWeight: mono ? 700 : 800,
        letterSpacing: mono ? 0 : '.4px',
        fontFamily: mono ? 'ui-monospace, Menlo, monospace' : 'inherit',
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}

// Ikoner til dokumentationsblokken. Geometri fra CD's Hjertesag.dc.html,
// linje 336 og 344. De to sidste findes ikke i CD, fordi CD kun tegnede
// den aktive tilstand, og er tegnet i samme streg-sprog: viewBox 24,
// stroke-width 1.9, runde ender.
//
// REGEL FRA S91: ingen faelles ikonkomponent. Den kunne kun tegne path,
// saa circle blev tavst udeladt i syv ikoner. Hvert ikon staar for sig,
// og circle skrives eksplicit.
//
// Farven arves fra ikonFarve paa DokumentationsKort via currentColor,
// saa de maalte kontrastvaerdier fra S92 foelger med af sig selv.

function IkonSkjold() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IkonDokument() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </svg>
  );
}

function IkonAdvarsel() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9.5v4" />
      <path d="M12 17.2h.01" />
    </svg>
  );
}

function IkonInfo() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 16.5v-5" />
      <path d="M12 8h.01" />
    </svg>
  );
}
function DokumentationsKort({ ikon, ikonBaggrund, ikonFarve, titel, etiket, tekst, sidste }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        padding: '22px 24px',
        borderBottom: sidste ? 'none' : '1px solid var(--border)',
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 13,
          background: ikonBaggrund,
          color: ikonFarve,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {ikon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexWrap: 'wrap',
            marginBottom: 5,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 16.5,
              fontWeight: 700,
              color: 'var(--ink)',
              letterSpacing: '-.3px',
            }}
          >
            {titel}
          </h3>
          {etiket}
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--body)' }}>{tekst}</p>
      </div>
    </div>
  );
}

export default function HjertesagPage() {
  const { slug } = useParams();

  const [status, setStatus] = useState('indlaeser');
  const [hjertesag, setHjertesag] = useState(null);
  const [forening, setForening] = useState(null);
  const [stoettevaeg, setStoettevaeg] = useState([]);
  const [udvidet, setUdvidet] = useState(false);
  const [coverFejlede, setCoverFejlede] = useState(false);
  const [kopieret, setKopieret] = useState(false);
  // Siden har TO visninger paa samme rute, praecis som CD-kilden. Adressen
  // aendres ikke, saa knappen "Tilbage til hjertesagen" er vejen tilbage.
  const [visning, setVisning] = useState('detalje');

  useEffect(() => {
    let afbrudt = false;

    async function hent() {
      setStatus('indlaeser');
      setCoverFejlede(false);

      try {
        const svar = await fetch(
          `${SMH_API_URL}/api/public/hjertesag/${encodeURIComponent(slug)}`
        );

        if (afbrudt) return;

        if (svar.status === 404) {
          setStatus('findes-ikke');
          return;
        }

        if (!svar.ok) {
          setStatus('fejl');
          return;
        }

        const data = await svar.json();
        if (afbrudt) return;

        setHjertesag(data.hjertesag);
        setForening(data.forening);
        setStoettevaeg(Array.isArray(data.stoettevaeg) ? data.stoettevaeg : []);
        setStatus('klar');
      } catch {
        if (!afbrudt) setStatus('fejl');
      }
    }

    hent();

    return () => {
      afbrudt = true;
    };
  }, [slug]);

  async function kopierLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setKopieret(true);
      window.setTimeout(() => setKopieret(false), 2000);
    } catch {
      setKopieret(false);
    }
  }

  if (status !== 'klar' || !hjertesag || !forening) {
    return (
      <div style={S.side} className="hs-side">
        <SiteNav />
        <main style={S.besked}>
          {status === 'indlaeser' && (
            <p style={{ color: 'var(--muted)', fontSize: 15 }}>Henter hjertesagen…</p>
          )}
          {status === 'findes-ikke' && (
            <>
              <h1 style={S.h1Besked}>Vi kunne ikke finde denne hjertesag</h1>
              <p style={S.pBesked}>Tjek linket, eller find andre hjertesager på oversigten.</p>
            </>
          )}
          {status === 'fejl' && (
            <>
              <h1 style={S.h1Besked}>Noget gik galt</h1>
              <p style={S.pBesked}>
                Vi kunne ikke hente hjertesagen lige nu. Prøv igen om et øjeblik.
              </p>
            </>
          )}
        </main>
        <SiteFooter />
      </div>
    );
  }

  const pct = procent(hjertesag.indsamlet_beloeb, hjertesag.maalbeloeb);
  const mangler = Math.max(0, Number(hjertesag.maalbeloeb) - Number(hjertesag.indsamlet_beloeb));
  const visCover = harIndhold(hjertesag.coverbillede) && !coverFejlede;
  const lang = harIndhold(hjertesag.lang_beskrivelse) ? hjertesag.lang_beskrivelse : '';
  const langErLang = lang.length > 320;
  const naevn = forening.indsamlingsnaevn || {};
  const naevnAktiv = naevn.status === 'aktiv';
  const naevnUdloebet = naevn.status === 'udloebet_laast';

  if (visning === 'checkout') {
    return (
      <HjertesagCheckout
        hjertesag={hjertesag}
        forening={forening}
        onTilbage={() => {
          setVisning('detalje');
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  return (
    <div style={S.side} className="hs-side">
      <SiteNav />

      <main style={{ paddingTop: 'clamp(24px,4vw,40px)', paddingBottom: 'clamp(40px,6vw,72px)' }}>
        <section style={{ ...S.wrap, paddingBottom: 8 }}>
          <Link
            to="/hjertesager"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              textDecoration: 'none',
              color: 'var(--body)',
              fontSize: 14.5,
              fontWeight: 600,
              padding: '8px 4px',
            }}
          >
            Tilbage til hjertesager
          </Link>
        </section>

        <section style={{ ...S.wrap, paddingTop: 16 }}>
          <div className="hs-detail-grid">
            <div className="hs-gallery">
              <div
                style={{
                  position: 'relative',
                  borderRadius: 26,
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  background: 'var(--alt)',
                  aspectRatio: '3 / 2',
                }}
              >
                {visCover ? (
                  <img
                    src={hjertesag.coverbillede}
                    alt=""
                    width="1400"
                    height="933"
                    decoding="async"
                    fetchPriority="high"
                    onError={() => setCoverFejlede(true)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--muted)',
                      fontSize: 14,
                    }}
                  >
                    Foreningen har ikke tilføjet et billede
                  </div>
                )}
              </div>
            </div>

            <aside className="hs-aside">
              <div className="hs-sticky">
                <div
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 26,
                    padding: 28,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 13,
                      marginBottom: 22,
                    }}
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
                        fontSize: 17,
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      {initialer(forening.foreningsnavn)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          display: 'block',
                          fontSize: 16,
                          fontWeight: 700,
                          color: 'var(--ink)',
                          letterSpacing: '-.3px',
                        }}
                      >
                        {forening.foreningsnavn}
                      </span>
                      {harIndhold(forening.by) && (
                        <span
                          style={{
                            display: 'block',
                            fontSize: 13,
                            color: 'var(--muted)',
                            marginTop: 3,
                          }}
                        >
                          {forening.by}
                        </span>
                      )}
                    </div>
                  </div>

                  <h1
                    style={{
                      margin: '0 0 18px',
                      fontSize: 22,
                      fontWeight: 800,
                      letterSpacing: '-.5px',
                      color: 'var(--ink)',
                      lineHeight: 1.25,
                    }}
                  >
                    {hjertesag.kampagnenavn}
                  </h1>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 26,
                        fontWeight: 800,
                        letterSpacing: '-.8px',
                        color: 'var(--ink)',
                      }}
                    >
                      {kr(hjertesag.indsamlet_beloeb)}{' '}
                      <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--muted)' }}>
                        kr
                      </span>
                    </span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--brand-hover)' }}>
                      {pct}%
                    </span>
                  </div>

                  <div style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 10 }}>
                    af {kr(hjertesag.maalbeloeb)} kr i mål
                  </div>

                  <div
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Indsamlet af målet"
                    style={{
                      height: 8,
                      borderRadius: 999,
                      background: 'var(--alt)',
                      overflow: 'hidden',
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        borderRadius: 999,
                        // DOKUMENTERET AFVIGELSE FRA KONTRASTREGLEN.
                        // Besluttet af Mario (CTO) den 5. august 2026 i S92.
                        // Maalt med scripts/kontrast.js mod banen
                        // var(--alt) = #F3F5F8: #16A34A gav 3,02:1 og
                        // #22C55E gav 2,09:1. Kravet til informationsbaerende
                        // grafik er 3,0:1 (WCAG 2.1, 1.4.11), saa den lyse
                        // ende af gradienten opfylder ikke kravet.
                        // Elementet har role=progressbar og aria-valuenow,
                        // saa vaerdien er tilgaengelig for skaermlaesere
                        // uafhaengigt af farven.
                        // Registreret i BACKLOG som S92-BJAELKE-KONTRAST.
                        // AENDRES DENNE LINJE, koer node scripts/kontrast.js.
                        background: 'linear-gradient(90deg,#16A34A,#22C55E)',
                      }}
                    />
                  </div>

                  <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 22 }}>
                    Der mangler {kr(mangler)} kr
                  </div>

                  {/* Knappen vises KUN naar foreningen faktisk kan modtage
                      bidrag. Checkout tjekker det samme igen, saa en donor
                      aldrig udfylder en formular der ikke kan gennemfoeres. */}
                  {forening.payment_ready ? (
                    <button
                      type="button"
                      onClick={() => {
                        setVisning('checkout');
                        window.scrollTo(0, 0);
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                        padding: CTA_PADDING,
                        height: CTA_STOR,
                        border: 'none',
                        borderRadius: CTA_RADIUS,
                        background: 'var(--brand)',
                        color: '#FFFFFF',
                        fontSize: CTA_SKRIFT,
                        fontWeight: CTA_VAEGT,
                        letterSpacing: CTA_SPAERRING,
                        fontFamily: 'inherit',
                        cursor: 'pointer',
                      }}
                    >
                      Støt denne sag
                    </button>
                  ) : (
                    <div
                      style={{
                        padding: '14px 16px',
                        borderRadius: 14,
                        background: 'var(--alt)',
                        fontSize: 13.5,
                        lineHeight: 1.6,
                        color: 'var(--body)',
                      }}
                    >
                      Foreningen kan ikke modtage bidrag endnu. Prøv igen senere.
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                    <button type="button" onClick={kopierLink} style={S.sekundaerKnap}>
                      {kopieret ? 'Kopieret' : 'Kopiér link'}
                    </button>
                  </div>

                  <p
                    style={{
                      margin: '16px 0 0',
                      paddingTop: 16,
                      borderTop: '1px solid var(--border)',
                      fontSize: 12.5,
                      lineHeight: 1.6,
                      color: 'var(--muted)',
                    }}
                  >
                    Bidragene modtages direkte på foreningens egen MobilePay-konto.
                    StøtMedHjerte tager ingen andel af bidragene, og abonnementet for
                    platformen afholdes særskilt af foreningen og er ikke trukket fra
                    bidragene.
                  </p>
                </div>
              </div>
            </aside>

            <div className="hs-about">
              {harIndhold(hjertesag.kort_beskrivelse) && (
                <p
                  style={{
                    margin: '0 0 32px',
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: 'var(--body)',
                    maxWidth: 620,
                  }}
                >
                  {hjertesag.kort_beskrivelse}
                </p>
              )}

              {lang && (
                <>
                  <span style={S.overLabel}>Om denne hjertesag</span>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: 'var(--body)',
                      maxWidth: 620,
                      display: langErLang && !udvidet ? '-webkit-box' : 'block',
                      WebkitLineClamp: langErLang && !udvidet ? 5 : 'none',
                      WebkitBoxOrient: 'vertical',
                      overflow: langErLang && !udvidet ? 'hidden' : 'visible',
                    }}
                  >
                    {lang}
                  </p>
                  {langErLang && (
                    <button
                      type="button"
                      onClick={() => setUdvidet((v) => !v)}
                      style={{
                        marginTop: 14,
                        background: 'none',
                        border: 'none',
                        padding: '4px 0',
                        fontFamily: 'inherit',
                        fontSize: 14,
                        fontWeight: 700,
                        color: 'var(--brand-hover)',
                        cursor: 'pointer',
                      }}
                    >
                      {udvidet ? 'Vis mindre' : 'Læs mere'}
                    </button>
                  )}
                </>
              )}

              <div style={{ height: 1, background: 'var(--border)', margin: '60px 0' }} />

              <span style={S.overLabel}>Hilsner fra støtterne</span>
              <h2 style={S.h2Afsnit}>En væg af opbakning</h2>
              <p
                style={{
                  margin: '0 0 20px',
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: 'var(--body)',
                  maxWidth: 560,
                }}
              >
                Når nogen støtter foreningen, kan de efterlade en hilsen. De nyeste står
                øverst.
              </p>

              <div
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 22,
                  background: 'var(--surface)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '15px 20px',
                    borderBottom: '1px solid var(--border)',
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
                    Seneste hilsner
                  </span>
                  <span
                    style={{
                      padding: '3px 9px',
                      borderRadius: 999,
                      background: 'var(--alt)',
                      color: 'var(--body)',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {stoettevaeg.length}
                  </span>
                </div>

                {stoettevaeg.length === 0 ? (
                  <div
                    style={{
                      padding: '40px 20px',
                      textAlign: 'center',
                      fontSize: 14.5,
                      lineHeight: 1.6,
                      color: 'var(--muted)',
                    }}
                  >
                    Der er ingen hilsner endnu. Bliv den første til at støtte denne
                    hjertesag.
                  </div>
                ) : (
                  <div style={{ maxHeight: 430, overflowY: 'auto', padding: '2px 20px 10px' }}>
                    {stoettevaeg.map((post, i) => {
                      const farve = AVATAR_FARVER[i % AVATAR_FARVER.length];
                      const nyeste = i === 0;
                      return (
                        <div
                          key={`${post.tidspunkt}-${i}`}
                          style={{
                            padding: '22px 20px',
                            margin: '0 -20px',
                            borderTop: nyeste ? 'none' : '1px solid var(--border)',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                            {post.anonym ? (
                              <span
                                style={{
                                  width: 38,
                                  height: 38,
                                  borderRadius: '50%',
                                  background: 'var(--brand-surface)',
                                  color: 'var(--brand)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}
                              >
                                <HjerteIkon />
                              </span>
                            ) : (
                              <span
                                style={{
                                  width: 38,
                                  height: 38,
                                  borderRadius: '50%',
                                  background: farve.bg,
                                  color: farve.fg,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  fontSize: 13.5,
                                  fontWeight: 800,
                                  letterSpacing: '.3px',
                                }}
                                aria-hidden="true"
                              >
                                {initialer(post.navn)}
                              </span>
                            )}

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
                                  {post.anonym || !harIndhold(post.navn)
                                    ? 'Anonym støtte'
                                    : post.navn}
                                </span>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 6,
                                  marginTop: 2,
                                }}
                              >
                                {nyeste && (
                                  <span
                                    style={{
                                      width: 7,
                                      height: 7,
                                      borderRadius: '50%',
                                      background: '#22C55E',
                                      flexShrink: 0,
                                    }}
                                  />
                                )}
                                <span
                                  style={{
                                    fontSize: 12,
                                    // 12px. Kravet under 14px er 5,5:1.
                                    // #15803D maalte 5,02:1 paa hvidt kort
                                    // og faldt. #166534 maaler 7,13:1 og er
                                    // samme groenne som etiketten laengere
                                    // nede i filen. Maalt S92 med
                                    // scripts/kontrast.js.
                                    color: nyeste ? '#166534' : 'var(--label)',
                                    fontWeight: nyeste ? 700 : 500,
                                  }}
                                >
                                  {tidSiden(post.tidspunkt)}
                                </span>
                              </div>
                            </div>

                            <span
                              style={{
                                flexShrink: 0,
                                padding: '5px 11px',
                                borderRadius: 999,
                                background: 'var(--alt)',
                                color: 'var(--body)',
                                fontSize: 12.5,
                                fontWeight: 700,
                              }}
                            >
                              {kr(oere(post.beloeb))} kr
                            </span>
                          </div>

                          {harIndhold(post.hilsen) && (
                            <p
                              style={{
                                margin: '10px 0 0',
                                fontSize: 14,
                                lineHeight: 1.6,
                                color: 'var(--body)',
                              }}
                            >
                              {`“${post.hilsen}”`}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div style={{ height: 1, background: 'var(--border)', margin: '60px 0' }} />

              <span style={S.overLabel}>Offentlig dokumentation</span>
              <h2
                style={{
                  margin: '0 0 22px',
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: '-.6px',
                  color: 'var(--ink)',
                }}
              >
                Indsamlingsnævnet
              </h2>

              <div
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 22,
                  overflow: 'hidden',
                }}
              >
                {naevnAktiv && (
                  <>
                    <DokumentationsKort
                      ikon={<IkonSkjold />}
                      ikonBaggrund="#ECFDF3"
                      ikonFarve="#166534"
                      titel="Tilladelse hos Indsamlingsnævnet"
                      etiket={
                        <Etiket farve="#166534" baggrund="#ECFDF3">
                          AKTIV
                        </Etiket>
                      }
                      tekst={`Foreningen har tilladelse til at samle ind ${
                        PARAGRAF_TEKST[naevn.paragraf] || ''
                      }.${
                        datoDK(naevn.udloeb)
                          ? ` Tilladelsen gælder til ${datoDK(naevn.udloeb)}.`
                          : ''
                      }`}
                    />
                    {harIndhold(naevn.journal_nr) && (
                      <DokumentationsKort
                        sidste
                        ikon={<IkonDokument />}
                        ikonBaggrund="var(--alt)"
                        ikonFarve="var(--ink)"
                        titel="Journalnummer"
                        etiket={
                          <Etiket mono farve="var(--body)" baggrund="var(--alt)">
                            {naevn.journal_nr}
                          </Etiket>
                        }
                        tekst="Indsamlingen er registreret offentligt hos myndigheden og kan slås op der."
                      />
                    )}
                  </>
                )}

                {naevnUdloebet && (
                  <DokumentationsKort
                    sidste
                    ikon={<IkonAdvarsel />}
                    ikonBaggrund="#FFF7EC"
                    ikonFarve="#8A3D06"
                    titel="Tilladelsen er udløbet"
                    etiket={
                      // Etiket er 10,5px. Kravet under 14px er 5,5:1.
                      // CD's #B45309 paa #FFF7EC maalte 4,73:1 og faldt.
                      // #8A3D06 maaler 7,19:1. Samme farve som avatarens
                      // ravpar, rettet samme sted i S92. Ikonstregen faar
                      // samme vaerdi, saa kortet ikke har to ravfarver.
                      <Etiket farve="#8A3D06" baggrund="#FFF7EC">
                        UDLØBET
                      </Etiket>
                    }
                    tekst="Foreningen kan ikke modtage bidrag til denne hjertesag, før tilladelsen er fornyet hos Indsamlingsnævnet."
                  />
                )}

                {!naevnAktiv && !naevnUdloebet && (
                  <DokumentationsKort
                    sidste
                    ikon={<IkonInfo />}
                    ikonBaggrund="var(--alt)"
                    ikonFarve="var(--ink)"
                    titel="Ingen tilladelse registreret"
                    etiket={
                      <Etiket farve="var(--body)" baggrund="var(--alt)">
                        IKKE OPRETTET
                      </Etiket>
                    }
                    tekst="Foreningen har ikke registreret en tilladelse hos Indsamlingsnævnet på StøtMedHjerte."
                  />
                )}
              </div>

              <p
                style={{
                  margin: '18px 0 0',
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: 'var(--muted)',
                  maxWidth: 620,
                }}
              >
                Indsamlingsnævnet er den danske myndighed, der godkender og fører tilsyn med
                foreningers indsamlinger.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
