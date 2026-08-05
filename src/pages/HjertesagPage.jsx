import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SMH_API_URL } from '../lib/supabaseClient';
import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';

/**
 * Offentlig hjertesagsside. Rute: /hjertesag/:slug
 *
 * Data hentes fra smh-api (GET /api/public/hjertesag/:slug), IKKE fra
 * Supabase i browseren: RLS kraever rollen supporter, og stoettere logger
 * aldrig ind.
 *
 * DEL 2 af 4: detaljevisning. Checkout foelger i del 3-4.
 *
 * FARVER: --muted og --border er kapret af shadcn i index.css og staar som
 * HSL-komponenter uden hsl(). De saettes derfor lokalt til hex paa .hs-side.
 *
 * BILLEDER: fast aspect-ratio reserverer pladsen foer filen lander, saa
 * intet hopper. Cover er fetchPriority high og IKKE lazy.
 */

const S = {
  side: {
    '--muted': '#5A6577',
    '--border': '#E6E9EF',
    background: 'var(--page)',
    minHeight: '60vh',
  },
  wrap: { maxWidth: 1080, margin: '0 auto', padding: '0 20px' },
  besked: { maxWidth: 620, margin: '0 auto', padding: '80px 20px', textAlign: 'center' },
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

function initialer(navn) {
  if (!harIndhold(navn)) return '?';
  return navn
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((o) => o[0])
    .join('')
    .toUpperCase();
}

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

function Etiket({ farve, baggrund, children }) {
  return (
    <span
      style={{
        padding: '3px 9px',
        borderRadius: 999,
        background: baggrund,
        color: farve,
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: '.4px',
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}

function DokumentationsKort({ ikonBaggrund, ikonFarve, titel, etiket, tekst }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        padding: '22px 24px',
        borderBottom: '1px solid var(--border)',
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
          fontSize: 20,
          fontWeight: 800,
        }}
        aria-hidden="true"
      >
        i
      </div>
      <div style={{ flex: 1 }}>
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
  const [udvidet, setUdvidet] = useState(false);
  const [coverFejlede, setCoverFejlede] = useState(false);

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

  if (status !== 'klar' || !hjertesag || !forening) {
    return (
      <div style={S.side} className="hs-side">
        <Navbar />
        <main style={S.besked}>
          {status === 'indlaeser' && (
            <p style={{ color: 'var(--muted)', fontSize: 15 }}>Henter hjertesagen…</p>
          )}
          {status === 'findes-ikke' && (
            <>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--ink)', margin: '0 0 12px' }}>
                Vi kunne ikke finde denne hjertesag
              </h1>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--body)', margin: 0 }}>
                Tjek linket, eller find andre hjertesager på forsiden.
              </p>
            </>
          )}
          {status === 'fejl' && (
            <>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--ink)', margin: '0 0 12px' }}>
                Noget gik galt
              </h1>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--body)', margin: 0 }}>
                Vi kunne ikke hente hjertesagen lige nu. Prøv igen om et øjeblik.
              </p>
            </>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  const pct = procent(hjertesag.indsamlet_beloeb, hjertesag.maalbeloeb);
  const mangler = Math.max(0, Number(hjertesag.maalbeloeb) - Number(hjertesag.indsamlet_beloeb));
  const visCover = harIndhold(hjertesag.coverbillede) && !coverFejlede;
  const lang = harIndhold(hjertesag.lang_beskrivelse) ? hjertesag.lang_beskrivelse : '';
  const langErLang = lang.length > 320;
  const naevn = forening.indsamlingsnaevn || {};

  return (
    <div style={S.side} className="hs-side">
      <Navbar />

      <main style={{ paddingBottom: 64 }}>
        <section style={{ ...S.wrap, paddingTop: 24 }}>
          {/* COVER. Pladsen er reserveret af aspect-ratio, saa intet hopper. */}
          <div
            style={{
              position: 'relative',
              borderRadius: 26,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: 'var(--alt)',
              aspectRatio: '3 / 2',
              maxHeight: 460,
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
        </section>

        <section
          style={{
            ...S.wrap,
            paddingTop: 32,
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,380px)',
            gap: 40,
            alignItems: 'start',
          }}
          className="hs-grid"
        >
          {/* VENSTRE: om hjertesagen + dokumentation */}
          <div>
            <h1
              style={{
                margin: '0 0 10px',
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: '-.5px',
                color: 'var(--ink)',
                lineHeight: 1.25,
              }}
            >
              {hjertesag.kampagnenavn}
            </h1>
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
                <span
                  style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '.8px',
                    textTransform: 'uppercase',
                    color: 'var(--brand-hover)',
                    marginBottom: 12,
                  }}
                >
                  Om denne hjertesag
                </span>
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

            <div style={{ height: 1, background: 'var(--border)', margin: '48px 0' }} />

            {/* DOKUMENTATION. Tre tilstande, udledt ET sted. */}
            <span
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '.8px',
                textTransform: 'uppercase',
                color: 'var(--brand-hover)',
                marginBottom: 12,
              }}
            >
              Offentlig dokumentation
            </span>
            <h2
              style={{
                margin: '0 0 22px',
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: '-.4px',
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
              {naevn.status === 'aktiv' && (
                <>
                  <DokumentationsKort
                    ikonBaggrund="#ECFDF3"
                    ikonFarve="#166534"
                    titel="Tilladelse hos Indsamlingsnævnet"
                    etiket={<Etiket farve="#166534" baggrund="#ECFDF3">AKTIV</Etiket>}
                    tekst={`Foreningen har tilladelse til at samle ind ${
                      PARAGRAF_TEKST[naevn.paragraf] || ''
                    }.${
                      datoDK(naevn.udloeb) ? ` Tilladelsen gælder til ${datoDK(naevn.udloeb)}.` : ''
                    }`}
                  />
                  {harIndhold(naevn.journal_nr) && (
                    <DokumentationsKort
                      ikonBaggrund="var(--alt)"
                      ikonFarve="var(--ink)"
                      titel="Journalnummer"
                      etiket={
                        <span
                          style={{
                            padding: '3px 9px',
                            borderRadius: 8,
                            background: 'var(--alt)',
                            color: 'var(--body)',
                            fontSize: 11,
                            fontWeight: 700,
                            fontFamily: 'ui-monospace, Menlo, monospace',
                          }}
                        >
                          {naevn.journal_nr}
                        </span>
                      }
                      tekst="Indsamlingen er registreret offentligt hos myndigheden og kan slås op der."
                    />
                  )}
                </>
              )}

              {naevn.status === 'udloebet_laast' && (
                <DokumentationsKort
                  ikonBaggrund="#FFF7EC"
                  ikonFarve="#B45309"
                  titel="Tilladelsen er udløbet"
                  etiket={<Etiket farve="#B45309" baggrund="#FFF7EC">UDLØBET</Etiket>}
                  tekst="Foreningen kan ikke modtage bidrag til denne hjertesag, før tilladelsen er fornyet hos Indsamlingsnævnet."
                />
              )}

              {naevn.status !== 'aktiv' && naevn.status !== 'udloebet_laast' && (
                <DokumentationsKort
                  ikonBaggrund="var(--alt)"
                  ikonFarve="var(--ink)"
                  titel="Ingen tilladelse registreret"
                  etiket={<Etiket farve="var(--body)" baggrund="var(--alt)">IKKE OPRETTET</Etiket>}
                  tekst="Foreningen har ikke registreret en tilladelse hos Indsamlingsnævnet på StøtMedHjerte."
                />
              )}
            </div>

            <p style={{ margin: '18px 0 0', fontSize: 13, lineHeight: 1.6, color: 'var(--muted)' }}>
              Indsamlingsnævnet er den danske myndighed, der godkender og fører tilsyn med
              foreningers indsamlinger.
            </p>
          </div>

          {/* HOEJRE: stoet-kort */}
          <aside>
            <div
              style={{
                position: 'sticky',
                top: 24,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 26,
                padding: 28,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 13, marginBottom: 22 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 13,
                    background: 'var(--navy1)',
                    color: '#fff',
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
                    <span style={{ display: 'block', fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>
                      {forening.by}
                    </span>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}
              >
                <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.8px', color: 'var(--ink)' }}>
                  {kr(hjertesag.indsamlet_beloeb)}{' '}
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--muted)' }}>kr</span>
                </span>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--brand-hover)' }}>{pct}%</span>
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
                    background: 'var(--brand)',
                  }}
                />
              </div>

              <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 22 }}>
                Der mangler {kr(mangler)} kr
              </div>

              {/* Betalingsknappen bygges i del 4. Vipps forbyder at vi tegner
                  MobilePay-knappen selv, saa den afventer paymark-afklaring. */}
              {!forening.payment_ready && (
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

              <p
                style={{
                  margin: '16px 0 0',
                  fontSize: 12.5,
                  lineHeight: 1.6,
                  color: 'var(--muted)',
                }}
              >
                Bidragene modtages direkte på foreningens egen MobilePay-konto. StøtMedHjerte tager
                ingen andel af bidragene, og abonnementet for platformen afholdes særskilt af
                foreningen og er ikke trukket fra bidragene.
              </p>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
