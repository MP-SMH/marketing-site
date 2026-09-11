import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SMH_API_URL } from '../lib/supabaseClient';
import SiteNav from '@/components/marketing/SiteNav';
import SiteFooter from '@/components/marketing/SiteFooter';
import { ctaBoks, CTA_MEDIUM, CTA_STOR } from '../lib/cta';
import { fmtDato, periodeVis } from '../lib/datoer';

/**
 * Offentlige indsamlingsregnskaber, detaljen. Dokumentstak for ét regnskab.
 * Offentlig gennemsigtighedsside, SKAL kunne indekseres. Ingen noindex.
 *
 * KILDE: cd-s99-final/Indsamlingsregnskaber.dc.html, niveau 3.
 * DATA: den maalte kontrakt mod staging,
 *   GET {SMH_API_URL}/api/public/indsamlingsregnskab/:id
 *   -> { forening, regnskab, linjer, erstattet_af, erklaeringer }
 *   400 ugyldig_id og 404 regnskab_findes_ikke -> samme "ikke fundet".
 *   502 opslag_fejlede -> proev igen.
 *
 * fil_url og revideret_fil_url er NULL paa erstattede dokumenter. Backend
 * tilbageholder dem bevidst. Derfor bygges INGEN handling naar de er null,
 * og der vises ingen graa knap der ikke virker.
 */

// Se noten i IndsamlingsregnskaberPage: app-tokenet --smh-muted (#6B7280,
// 4,83:1) dumper 5,5:1 under 14px. Prototypens #55606F maaler 6,39:1.
const MUTED = '#55606F';

function kr(oere) {
  const kroner = Number(oere) / 100;
  const dec = (Number(oere) % 100) !== 0;
  return (
    kroner.toLocaleString('da-DK', {
      minimumFractionDigits: dec ? 2 : 0,
      maximumFractionDigits: dec ? 2 : 0,
    }) + ' kr.'
  );
}

function stort(v) {
  if (typeof v !== 'string' || v.trim() === '') return '';
  return v.charAt(0).toUpperCase() + v.slice(1);
}

function initialer(navn) {
  if (typeof navn !== 'string' || navn.trim() === '') return '?';
  return navn
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((o) => o[0] || '')
    .join('')
    .toUpperCase();
}

const BADGE = {
  green: { bg: '#ECFDF3', fg: '#166534' },
  neutral: { bg: 'var(--alt)', fg: 'var(--body)' },
};

function badgeStil(tone) {
  const t = BADGE[tone] || BADGE.neutral;
  return {
    padding: '3px 9px',
    borderRadius: 999,
    background: t.bg,
    color: t.fg,
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: '.4px',
    whiteSpace: 'nowrap',
  };
}

function docBadge(s) {
  if (s === 'offentliggjort') return { label: 'OFFENTLIGGJORT', tone: 'green' };
  if (s === 'erstattet') return { label: 'ERSTATTET', tone: 'neutral' };
  return { label: 'IKKE OFFENTLIGGJORT', tone: 'neutral' };
}

const STIL = `
.reg-spin{width:34px;height:34px;border-radius:50%;border:3px solid var(--smh-border);border-top-color:var(--brand-hover);margin:0 auto 20px;animation:regSpin .9s linear infinite;}
@keyframes regSpin{to{transform:rotate(360deg);}}
@media (prefers-reduced-motion: reduce){.reg-spin{animation:none;}}
.reg-pdf:hover{background:var(--brand-hover) !important;}
.reg-tilbage:hover{color:var(--brand-ink) !important;}
`;

const etiketLinje = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '12px 16px',
  borderRadius: 14,
  background: 'var(--alt)',
};
const etiketLabel = {
  flexShrink: 0,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '.6px',
  textTransform: 'uppercase',
  color: 'var(--label)',
};

function DokIkon({ storrelse = 16 }) {
  return (
    <svg width={storrelse} height={storrelse} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
  );
}

function PdfKnap({ url, label = 'Se regnskabet' }) {
  if (!url) return null;
  return (
    <a
      className="reg-pdf"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...ctaBoks(CTA_MEDIUM), display: 'inline-flex', gap: 8, background: 'var(--brand)', color: '#fff', border: 'none', marginTop: 20 }}
    >
      <DokIkon />
      {label}
      <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.8 }}>PDF</span>
    </a>
  );
}

function FejlKort({ titel, brod, knap }) {
  return (
    <section className="reg-wrap" style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,7vw,86px) 20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: 520, width: '100%', textAlign: 'center', background: 'var(--surface)', border: '1px solid var(--smh-border)', borderRadius: 24, padding: 'clamp(28px,6vw,44px)', boxShadow: '0 30px 70px -42px rgba(8,14,26,.22)' }}>
        <span style={{ display: 'inline-flex', width: 56, height: 56, borderRadius: 16, background: 'var(--alt)', color: MUTED, alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <DokIkon storrelse={24} />
        </span>
        <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(20px,3vw,25px)', fontWeight: 800, letterSpacing: '-.6px', color: 'var(--ink)' }}>{titel}</h1>
        <p style={{ margin: '0 auto 26px', maxWidth: 400, fontSize: 15, lineHeight: 1.65, color: 'var(--body)' }}>{brod}</p>
        {knap}
      </div>
    </section>
  );
}

export default function IndsamlingsregnskabPage() {
  const { id } = useParams();
  const [tilstand, setTilstand] = useState('henter');
  const [data, setData] = useState(null);

  const hent = useCallback(async () => {
    setTilstand('henter');
    if (!id) {
      setTilstand('ikkefundet');
      return;
    }
    let svar;
    try {
      svar = await fetch(`${SMH_API_URL}/api/public/indsamlingsregnskab/${encodeURIComponent(id)}`);
    } catch {
      setTilstand('fejl');
      return;
    }
    if (svar.status === 400 || svar.status === 404) {
      setTilstand('ikkefundet');
      return;
    }
    if (!svar.ok) {
      setTilstand('fejl');
      return;
    }
    try {
      const d = await svar.json();
      setData(d);
      setTilstand('klar');
    } catch {
      setTilstand('fejl');
    }
  }, [id]);

  useEffect(() => {
    hent();
  }, [hent]);

  useEffect(() => {
    const navn = data?.forening?.navn;
    document.title = navn
      ? `${navn} | Indsamlingsregnskab | StøtMedHjerte`
      : 'Indsamlingsregnskab | StøtMedHjerte';
  }, [data]);

  const tilbage = (
    <Link className="reg-tilbage" to="/indsamlingsregnskaber" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: 'var(--brand-hover)', textDecoration: 'none', padding: '6px 0', marginBottom: 18 }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
      Tilbage til listen
    </Link>
  );

  let krop;

  if (tilstand === 'henter') {
    krop = (
      <section className="reg-wrap" style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,7vw,86px) 20px', textAlign: 'center' }}>
        <div className="reg-spin" role="status" aria-label="Henter regnskab" />
        <p style={{ margin: 0, fontSize: 15, color: 'var(--body)' }}>Henter regnskab …</p>
      </section>
    );
  } else if (tilstand === 'ikkefundet') {
    krop = (
      <FejlKort
        titel="Vi kan ikke finde det regnskab"
        brod="Linket ser ikke ud til at passe til et regnskab. Tjek linket, eller gå tilbage til listen."
        knap={
          <Link to="/indsamlingsregnskaber" style={{ ...ctaBoks(CTA_STOR), display: 'inline-flex', background: 'var(--brand)', color: '#fff', border: 'none' }}>
            Til listen
          </Link>
        }
      />
    );
  } else if (tilstand === 'fejl') {
    krop = (
      <FejlKort
        titel="Vi kan ikke slå regnskabet op lige nu"
        brod="Prøv igen om lidt."
        knap={
          <button type="button" onClick={hent} style={{ ...ctaBoks(CTA_STOR), display: 'inline-flex', background: 'var(--brand)', color: '#fff', border: 'none' }}>
            Prøv igen
          </button>
        }
      />
    );
  } else {
    const forening = data.forening || {};
    const regnskab = data.regnskab || {};
    const linjer = Array.isArray(data.linjer) ? data.linjer : [];
    const erklaeringer = Array.isArray(data.erklaeringer) ? data.erklaeringer : [];
    const erstattetAf = data.erstattet_af || null;

    const navn = stort(forening.navn) || 'Forening uden navn';
    const erAars = forening.paragraf === 'paragraf_4';
    const parLabel = erAars ? '§4 årsregnskab' : '§3 indsamling';
    const parForklaring = erAars
      ? 'Årsregnskab for hele organisationens indsamlinger i regnskabsåret.'
      : 'Én indsamling med start og slut, aflagt som ét regnskab.';

    const hovedBadge = docBadge(regnskab.status);
    const erstattet = regnskab.status === 'erstattet';

    krop = (
      <section className="reg-wrap" style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(26px,4vw,44px) 20px clamp(50px,8vw,86px)' }}>
        {tilbage}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--smh-border)', borderRadius: 24, boxShadow: '0 18px 48px -38px rgba(8,14,26,.2)', overflow: 'hidden' }}>
          {/* Forening-header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: 'clamp(20px,3vw,28px)', borderBottom: '1px solid var(--smh-border)' }}>
            <span style={{ flexShrink: 0, width: 52, height: 52, borderRadius: 15, background: 'var(--brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, letterSpacing: '-.5px' }}>{initialer(forening.navn)}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{ margin: '0 0 6px', fontSize: 'clamp(20px,2.6vw,25px)', fontWeight: 800, letterSpacing: '-.6px', color: 'var(--ink)' }}>{navn}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                {forening.by && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13.5, color: MUTED }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                    {forening.by}
                  </span>
                )}
                <span style={{ padding: '3px 10px', borderRadius: 999, background: 'var(--alt)', color: 'var(--body)', fontSize: 12, fontWeight: 700 }}>{parLabel}</span>
                {forening.journalnummer && (
                  <span style={{ padding: '3px 10px', borderRadius: 8, background: 'var(--alt)', color: 'var(--body)', fontSize: 12, fontWeight: 700, fontFamily: 'ui-monospace,Menlo,monospace' }}>J.NR. {forening.journalnummer}</span>
                )}
              </div>
              <p style={{ margin: '8px 0 0', fontSize: 13.5, lineHeight: 1.5, color: MUTED }}>{parForklaring}</p>
            </div>
          </div>

          {/* Dokumentstak */}
          <div style={{ padding: 'clamp(18px,3vw,28px)' }}>
            {/* Periodelinje */}
            <div style={{ ...etiketLinje, marginBottom: 16 }}>
              <span style={etiketLabel}>Indsamlingsperiode</span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--body)', fontVariantNumeric: 'tabular-nums' }}>{periodeVis(regnskab.periode_start, regnskab.periode_slut)}</span>
              <span style={{ marginLeft: 'auto', fontSize: 15, fontWeight: 800, letterSpacing: '-.4px', color: 'var(--ink)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{kr(regnskab.indsamlet_oere)}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: erstattet ? 'var(--alt)' : 'var(--surface)', border: erstattet ? '1px solid var(--smh-border)' : '1.5px solid var(--brand-border)', borderRadius: 20, padding: '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', marginBottom: 10 }}>
                  <span style={badgeStil(hovedBadge.tone)}>{hovedBadge.label}</span>
                  {regnskab.revisor_paategnet === true && <span style={badgeStil('neutral')}>GODKENDT AF REVISOR</span>}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-.3px', color: erstattet ? MUTED : 'var(--ink)' }}>{erAars ? 'Årsregnskab' : 'Regnskab for perioden'}</div>
                {regnskab.offentliggjort_dato && <div style={{ fontSize: 13, color: MUTED, fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>Offentliggjort {fmtDato(regnskab.offentliggjort_dato)}</div>}

                {linjer.length > 0 && (
                  <div style={{ marginTop: 14, borderTop: '1px solid var(--smh-border)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={etiketLabel}>{erAars ? 'Indsamlinger i årsregnskabet' : 'Indsamlinger i regnskabet'}</span>
                    {linjer.map((l, i) => {
                      const bidrag = Number(l.antal_bidrag) || 0;
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: 13.5, color: 'var(--body)' }}>{stort(l.hjertesagsnavn) || 'Indsamling'}</div>
                            {l.anvendt_til && <div style={{ fontSize: 12.5, lineHeight: 1.45, color: MUTED, marginTop: 2 }}>{l.anvendt_til}</div>}
                          </div>
                          <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{kr(l.indsamlet_oere)}</div>
                            {bidrag > 0 && <div style={{ fontSize: 12, color: MUTED, fontVariantNumeric: 'tabular-nums', marginTop: 1 }}>{bidrag.toLocaleString('da-DK')} bidrag</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {erstattetAf && (
                  <p style={{ margin: '10px 0 0', fontSize: 13, lineHeight: 1.5, color: MUTED }}>
                    Erstattet af et nyere regnskab{erstattetAf.offentliggjort_dato ? `, offentliggjort ${fmtDato(erstattetAf.offentliggjort_dato)}` : ''}.
                  </p>
                )}

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <PdfKnap url={regnskab.fil_url} />
                  {regnskab.revideret_fil_url && <PdfKnap url={regnskab.revideret_fil_url} label="Se revisors påtegning" />}
                </div>
              </div>

              {erklaeringer.map((e) => {
                const b = docBadge(e.status);
                return (
                  <div key={e.id} style={{ background: 'var(--surface)', border: '1px solid var(--smh-border)', borderRadius: 16, padding: '22px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', marginBottom: 10 }}>
                      <span style={badgeStil(b.tone)}>{b.label}</span>
                    </div>
                    <div style={{ fontSize: 14.5, fontWeight: 700, letterSpacing: '-.2px', color: 'var(--ink)' }}>Overskudserklæring</div>
                    {e.periode_slut && <div style={{ fontSize: 13, color: MUTED, fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>Regnskabsår til {fmtDato(e.periode_slut)}</div>}
                    {e.offentliggjort_dato && <div style={{ fontSize: 13, color: MUTED, fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>Offentliggjort {fmtDato(e.offentliggjort_dato)}</div>}
                    <PdfKnap url={e.fil_url} />
                  </div>
                );
              })}
            </div>

            {/* Kommende */}
            {regnskab.naeste_erklaering_forventet && (
              <div style={{ ...etiketLinje, marginTop: 16 }}>
                <span style={{ flexShrink: 0, width: 15, height: 15, borderRadius: '50%', background: 'var(--surface)', border: '2px dashed #94A3B8', boxSizing: 'border-box' }} />
                <span style={etiketLabel}>Kommer</span>
                <span style={{ fontSize: 13, lineHeight: 1.45, color: MUTED }}>Overskudserklæring forventes {fmtDato(regnskab.naeste_erklaering_forventet)}, og hvert år indtil alle midler er brugt.</span>
              </div>
            )}

            {/* Afslutning */}
            {regnskab.alle_midler_anvendt === true && (
              <div style={{ ...etiketLinje, marginTop: 16 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M20 6 9 17l-5-5" /></svg>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.6px', textTransform: 'uppercase', color: '#166534' }}>Alle midler anvendt. Sporet er lukket.</span>
              </div>
            )}

            {/* Kilde */}
            {forening.journalnummer && (
              <p style={{ margin: '18px 2px 0', fontSize: 13, lineHeight: 1.6, color: MUTED }}>
                Indsamlingen er registreret hos Indsamlingsnævnet under journalnummer {forening.journalnummer}. Du kan efterprøve den hos{' '}
                <a href="https://indsamlingsnaevnet.dk" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-hover)', fontWeight: 600, textDecoration: 'none' }}>Indsamlingsnævnet</a>.
              </p>
            )}
          </div>
        </div>
        <p style={{ margin: '18px auto 0', fontSize: 13, lineHeight: 1.6, color: MUTED }}>
          Denne side er en ekstra service. Har foreningen egen hjemmeside, skal regnskabet offentliggøres der. Se det fulde materiale hos{' '}
          <Link to="/tilladelse-og-regnskab" style={{ color: 'var(--brand-hover)', fontWeight: 600, textDecoration: 'none' }}>tilladelse og regnskab</Link>.
        </p>
      </section>
    );
  }

  return (
    <div style={{ background: 'var(--page)', minHeight: '100vh' }}>
      <style>{STIL}</style>
      <SiteNav />
      <main>{krop}</main>
      <SiteFooter />
    </div>
  );
}
