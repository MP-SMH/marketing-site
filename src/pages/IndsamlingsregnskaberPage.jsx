import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SMH_API_URL } from '../lib/supabaseClient';
import SiteNav from '@/components/marketing/SiteNav';
import SiteFooter from '@/components/marketing/SiteFooter';
import { ctaBoks, CTA_STOR, CTA_MEDIUM } from '../lib/cta';

/**
 * Offentlige indsamlingsregnskaber, listen. En offentlig
 * gennemsigtighedsside, der SKAL kunne findes i soegemaskiner. Derfor
 * ingen noindex, i modsaetning til kvitteringssiden.
 *
 * KILDE: cd-s99-final/Indsamlingsregnskaber.dc.html, niveau 1 og 2.
 * DATA: den maalte kontrakt mod staging,
 *   GET {SMH_API_URL}/api/public/indsamlingsregnskaber
 *   -> { regnskaber, antal, side, har_flere }
 * Paginering styres af serveren via limit og side. antal er det SAMLEDE
 * antal traeffere, ikke sidens laengde. Vi regner ikke selv.
 *
 * IKKE KONVERTERET: prototypens tweak-panel og tilstands-skiftere, samt
 * dens klaebende reg-stuck-adfaerd. De er gennemsyns-vaerktoej.
 */

const LIMIT = 25;

// Prototypens --muted er #55606F og maaler 6,39:1 paa hvid. App-tokenet
// --smh-muted er #6B7280 og kun 4,83:1, som dumper kravet 5,5:1 under 14px.
// Den lille daempede tekst her er 13px, saa vi bruger prototypens maalte vaerdi.
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

const MND = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];

// Datoerne fra kontrakten formateres kun hvis de ligner ISO. Er de allerede
// en dansk streng, vises de uaendret. Parses fra tekst, ikke via Date, for at
// undgaa tidszone-forskydning paa datoer uden klokkeslaet.
function fmtDato(v) {
  if (!v) return '';
  const s = String(v);
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return s;
  return `${parseInt(m[3], 10)}. ${MND[parseInt(m[2], 10) - 1]} ${m[1]}`;
}

function periodeLinjer(startRaw, slutRaw) {
  const start = fmtDato(startRaw);
  const slut = fmtDato(slutRaw);
  if (!start && !slut) return [];
  if (!start || !slut) return [[start, slut].filter(Boolean).join(' til ')];
  const sp = start.split(' ');
  const sl = slut.split(' ');
  const sAar = sp[sp.length - 1];
  const eAar = sl[sl.length - 1];
  const sDM = sp.slice(0, -1).join(' ');
  const eDM = sl.slice(0, -1).join(' ');
  if (sAar === eAar) return [`${sDM} - ${eDM}`, eAar];
  return [`${sDM} ${sAar} - ${eDM}`, eAar];
}

function stort(v) {
  if (typeof v !== 'string' || v.trim() === '') return '';
  return v.charAt(0).toUpperCase() + v.slice(1);
}

const STATUS = {
  offentliggjort: { label: 'OFFENTLIGGJORT', tone: 'green' },
  mangler_erklaering: { label: 'MANGLER ERKLÆRING', tone: 'amber' },
  afsluttet: { label: 'AFSLUTTET', tone: 'neutral' },
};

const BADGE = {
  green: { bg: '#ECFDF3', fg: '#166534' },
  amber: { bg: '#FFF7EC', fg: '#8A3D06' },
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

const STIL = `
.reg-wrap{max-width:1200px;margin:0 auto;padding-left:20px;padding-right:20px;}
.reg-filters{display:grid;grid-template-columns:1fr;gap:12px;}
.reg-selects{display:grid;grid-template-columns:1fr;gap:12px;}
.reg-filterbtn{display:none;}
@media(min-width:520px){.reg-selects{grid-template-columns:repeat(3,1fr);}}
@media(min-width:760px){.reg-filters{grid-template-columns:minmax(0,1.6fr) 1fr 1fr 1fr;align-items:center;column-gap:12px;}.reg-selects{display:contents;}}
@media(max-width:519px){
  .reg-filterbtn{display:flex;align-items:center;justify-content:center;gap:8px;height:54px;border-radius:16px;border:1.5px solid var(--smh-border);background:var(--surface);font-family:inherit;font-size:16px;font-weight:700;color:var(--ink);cursor:pointer;}
  .reg-selects{display:none;}
  .reg-selects.reg-open{display:grid;}
}
.reg-field{width:100%;min-height:54px;padding:15px 18px;border-radius:16px;border:1.5px solid var(--smh-border);background:var(--surface);font-family:inherit;font-size:16px;font-weight:600;color:var(--ink);outline:none;transition:border-color .15s,box-shadow .15s;}
.reg-field::placeholder{color:#C2C8D2;}
.reg-field:focus{border-color:var(--brand);box-shadow:0 0 0 4px rgba(224,25,63,.10);}
.reg-row{display:grid;grid-template-columns:1fr;gap:6px;width:100%;text-align:left;background:var(--surface);border:none;border-top:1px solid var(--smh-border);padding:18px 22px;cursor:pointer;font-family:inherit;text-decoration:none;transition:background .12s;}
.reg-row:first-child{border-top:none;}
.reg-row:hover{background:var(--alt);}
.reg-belob{font-variant-numeric:tabular-nums;font-size:19px;font-weight:800;color:var(--ink);}
.reg-periode{font-size:13px;color:${MUTED};font-variant-numeric:tabular-nums;line-height:1.35;}
.reg-dato{font-size:13px;color:${MUTED};font-variant-numeric:tabular-nums;}
.reg-status{display:flex;flex-direction:column;gap:6px;}
.reg-dato-lang{display:none;}
.reg-head{display:none;}
@media(max-width:519px){
  .reg-dato-kort{display:none;}
  .reg-dato-lang{display:inline;}
  .reg-c-info{order:1;}.reg-belob{order:2;}.reg-periode{order:3;}.reg-status{order:4;align-items:flex-start;}
}
@media(min-width:520px){
  .reg-row{grid-template-columns:minmax(0,1fr) 150px 118px 190px;align-items:center;gap:24px;}
  .reg-belob{font-size:15.5px;font-weight:700;text-align:right;}
  .reg-head{display:grid;grid-template-columns:minmax(0,1fr) 150px 118px 190px;gap:24px;margin-top:12px;padding:14px 23px;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--label);border-bottom:1px solid var(--smh-border);}
  .reg-h-belob{text-align:right;}
}
.reg-spin{width:34px;height:34px;border-radius:50%;border:3px solid var(--smh-border);border-top-color:var(--brand-hover);margin:0 auto 20px;animation:regSpin .9s linear infinite;}
@keyframes regSpin{to{transform:rotate(360deg);}}
@media (prefers-reduced-motion: reduce){.reg-spin{animation:none;}}
.reg-flerbtn:hover{background:var(--alt) !important;}
.reg-bar{position:sticky;top:67px;z-index:40;background:var(--page);}
.reg-filtercard{border:1px solid var(--smh-border);border-radius:24px;background:var(--surface);padding:clamp(14px,2.4vw,20px);box-shadow:0 18px 48px -30px rgba(8,14,26,.28);transition:border-radius .18s,box-shadow .18s,border-color .18s;}
.reg-barinner{transition:background .18s,border-color .18s;}
.reg-search{position:relative;}
.reg-bar::after{content:'';position:absolute;left:0;right:0;top:100%;height:14px;background:linear-gradient(rgba(247,248,251,1),rgba(247,248,251,0));pointer-events:none;opacity:0;transition:opacity .18s;}
.reg-stuck::after{opacity:1;}
.reg-stuck .reg-filtercard{border-radius:0;box-shadow:none;border-color:transparent;}
.reg-stuck .reg-barinner{background:var(--surface);border-bottom:1px solid var(--smh-border);}
.reg-stuck .reg-head{border-bottom:none;}
@media(max-width:519px){
  .reg-bar{position:static;}
  .reg-search{position:sticky;top:67px;z-index:30;}
  .reg-stuck .reg-search{box-shadow:0 6px 16px -8px rgba(8,14,26,.28);}
}
`;

function ChevronNed() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
  );
}

function SelectFelt({ value, onChange, ariaLabel, children }) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        className="reg-field"
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        style={{ appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer', paddingRight: 40 }}
      >
        {children}
      </select>
      <span style={{ position: 'absolute', right: 15, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: MUTED, display: 'flex' }}>
        <ChevronNed />
      </span>
    </div>
  );
}

export default function IndsamlingsregnskaberPage() {
  const [q, setQ] = useState('');
  const [aar, setAar] = useState('');
  const [paragraf, setParagraf] = useState('');
  const [status, setStatus] = useState('');
  const [selectsOpen, setSelectsOpen] = useState(false);

  const [rows, setRows] = useState([]);
  const [antal, setAntal] = useState(0);
  const [harFlere, setHarFlere] = useState(false);
  const [side, setSide] = useState(0);
  const [tilstand, setTilstand] = useState('henter');
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef(null);

  // Klaebe-detektion. Sentinel ligger lige over baren. Naar den ruller op
  // over SiteNav's maalte hoejde (67px), klaeber baren og skifter til én flade.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { rootMargin: '-67px 0px 0px 0px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hentSide = useCallback(
    async (sideNr, append) => {
      if (!append) setTilstand('henter');
      const p = new URLSearchParams();
      if (q.trim()) p.set('soeg', q.trim().slice(0, 120));
      if (aar) p.set('aar', aar);
      if (paragraf) p.set('paragraf', paragraf);
      if (status) p.set('status', status);
      p.set('limit', String(LIMIT));
      p.set('side', String(sideNr));
      try {
        const svar = await fetch(`${SMH_API_URL}/api/public/indsamlingsregnskaber?${p.toString()}`);
        if (!svar.ok) throw new Error('http ' + svar.status);
        const data = await svar.json();
        const nye = Array.isArray(data.regnskaber) ? data.regnskaber : [];
        setRows((prev) => (append ? [...prev, ...nye] : nye));
        setAntal(Number(data.antal) || 0);
        setHarFlere(data.har_flere === true);
        setSide(Number.isFinite(Number(data.side)) ? Number(data.side) : sideNr);
        setTilstand('klar');
      } catch {
        // Fejl ved "vis flere" beholder den viste liste, saa vi ikke smider
        // allerede hentede regnskaber vaek. Kun foerste side viser fejltilstand.
        if (!append) {
          setRows([]);
          setTilstand('fejl');
        }
      }
    },
    [q, aar, paragraf, status]
  );

  // Debounce: hver filtraendring nulstiller til side 0 efter en kort pause,
  // saa taste i soegefeltet ikke sender et kald pr. tastetryk.
  useEffect(() => {
    document.title = 'Offentlige indsamlingsregnskaber | StøtMedHjerte';
    const t = window.setTimeout(() => hentSide(0, false), 300);
    return () => window.clearTimeout(t);
  }, [hentSide]);

  const aktiveFiltre = !!(q.trim() || aar || paragraf || status);
  const filterAntal = [aar, paragraf, status].filter(Boolean).length;

  function nulstil() {
    setQ('');
    setAar('');
    setParagraf('');
    setStatus('');
  }

  const iAar = new Date().getFullYear();
  const aarValg = [];
  for (let y = iAar + 1; y >= 2023; y--) aarValg.push(y);

  const antalTekst = antal === 1 ? '1 regnskab' : `${antal.toLocaleString('da-DK')} regnskaber`;

  let indhold;
  if (tilstand === 'henter' && rows.length === 0) {
    indhold = (
      <div style={{ textAlign: 'center', padding: 'clamp(40px,7vw,72px) 24px' }}>
        <div className="reg-spin" role="status" aria-label="Henter regnskaber" />
        <p style={{ margin: 0, fontSize: 15, color: 'var(--body)' }}>Henter regnskaber …</p>
      </div>
    );
  } else if (tilstand === 'fejl' && rows.length === 0) {
    indhold = (
      <div style={{ textAlign: 'center', padding: 'clamp(40px,7vw,72px) 24px', background: 'var(--surface)', border: '1px solid var(--smh-border)', borderRadius: 24 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 'clamp(18px,2.6vw,21px)', fontWeight: 800, letterSpacing: '-.4px', color: 'var(--ink)' }}>Vi kan ikke hente regnskaberne lige nu</h2>
        <p style={{ margin: '0 auto 22px', maxWidth: 440, fontSize: 15, lineHeight: 1.6, color: 'var(--body)' }}>Prøv igen om lidt.</p>
        <button type="button" onClick={() => hentSide(0, false)} style={{ ...ctaBoks(CTA_STOR), display: 'inline-flex', background: 'var(--brand)', color: '#fff', border: 'none' }}>
          Prøv igen
        </button>
      </div>
    );
  } else if (antal === 0 && !aktiveFiltre) {
    // Tom platform. Maa IKKE ligne en fejl. Det er den tilstand flest ser laenge.
    indhold = (
      <div style={{ textAlign: 'center', padding: 'clamp(40px,7vw,72px) 24px', background: 'var(--surface)', border: '1px solid var(--smh-border)', borderRadius: 24 }}>
        <span style={{ display: 'inline-flex', width: 56, height: 56, borderRadius: 16, background: 'var(--brand-surface)', color: 'var(--brand)', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
        </span>
        <h2 style={{ margin: '0 0 10px', fontSize: 'clamp(19px,2.6vw,23px)', fontWeight: 800, letterSpacing: '-.5px', color: 'var(--ink)' }}>De første regnskaber er på vej</h2>
        <p style={{ margin: '0 auto', maxWidth: 460, fontSize: 15, lineHeight: 1.65, color: 'var(--body)' }}>Platformen er ny, og ingen forening har afsluttet en indsamling endnu. Når en indsamlingsperiode slutter og regnskabet er offentliggjort, kan du finde det her.</p>
      </div>
    );
  } else if (antal === 0 && aktiveFiltre) {
    indhold = (
      <div style={{ textAlign: 'center', padding: 'clamp(40px,7vw,72px) 24px', background: 'var(--surface)', border: '1px solid var(--smh-border)', borderRadius: 24 }}>
        <span style={{ display: 'inline-flex', width: 54, height: 54, borderRadius: 16, background: 'var(--alt)', color: MUTED, alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></svg>
        </span>
        <h2 style={{ margin: '0 0 10px', fontSize: 'clamp(18px,2.4vw,21px)', fontWeight: 800, letterSpacing: '-.4px', color: 'var(--ink)' }}>Ingen regnskaber matcher din søgning</h2>
        <p style={{ margin: '0 auto 22px', maxWidth: 440, fontSize: 14.5, lineHeight: 1.6, color: 'var(--body)' }}>Prøv et andet foreningsnavn eller en anden by, vælg et andet år, eller nulstil filtrene og se dem alle.</p>
        <button type="button" onClick={nulstil} style={{ ...ctaBoks(CTA_STOR), display: 'inline-flex', background: 'var(--brand)', color: '#fff', border: 'none' }}>
          Nulstil filtre
        </button>
      </div>
    );
  } else {
    indhold = (
      <div>
        <p style={{ margin: '0 0 16px', fontSize: 14.5, fontWeight: 600, color: 'var(--ink)' }}>{antalTekst}</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--smh-border)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 16px 44px -36px rgba(8,14,26,.16)' }}>
          {rows.map((r) => {
            const st = STATUS[r.status] || { label: String(r.status || '').toUpperCase(), tone: 'neutral' };
            const pl = periodeLinjer(r.periode_start, r.periode_slut);
            const forening = stort(r.foreningsnavn) || 'Forening uden navn';
            const formaal = stort(r.formaal);
            const dato = fmtDato(r.offentliggjort_dato);
            return (
              <Link key={r.id} to={`/indsamlingsregnskab/${r.id}`} className="reg-row">
                <div className="reg-c-info" style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-.2px', color: 'var(--ink)' }}>
                    {forening}
                    {r.by ? <span style={{ fontWeight: 500, color: MUTED }}> · {r.by}</span> : null}
                  </div>
                  {formaal && <div style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--body)', marginTop: 2 }}>{formaal}</div>}
                </div>
                <div className="reg-periode">
                  {pl.map((linje, i) => (
                    <div key={i}>{linje}</div>
                  ))}
                </div>
                <div className="reg-belob">{kr(r.indsamlet_oere)}</div>
                <div className="reg-status">
                  {st.label && <span style={badgeStil(st.tone)}>{st.label}</span>}
                  {dato && <span className="reg-dato reg-dato-kort">{dato}</span>}
                  {dato && <span className="reg-dato reg-dato-lang">Offentliggjort {dato}</span>}
                </div>
              </Link>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 22 }}>
          <span style={{ fontSize: 13.5, color: MUTED }}>Viser {rows.length} af {antal}</span>
          {harFlere && (
            <button
              type="button"
              className="reg-flerbtn"
              onClick={() => hentSide(side + 1, true)}
              style={{ ...ctaBoks(CTA_MEDIUM), display: 'inline-flex', background: 'var(--surface)', border: '1px solid var(--smh-border)', color: 'var(--ink)' }}
            >
              Vis flere regnskaber
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--page)', minHeight: '100vh' }}>
      <style>{STIL}</style>
      <SiteNav />

      <section className="reg-wrap" style={{ paddingTop: 'clamp(30px,5vw,54px)', paddingBottom: 'clamp(20px,3vw,30px)' }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14, fontSize: 13, fontWeight: 700, letterSpacing: '.8px', textTransform: 'uppercase', color: '#C8112F' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8M16 17H8" /></svg>
            Offentlige regnskaber
          </div>
          <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(29px,4.8vw,42px)', fontWeight: 800, letterSpacing: '-1.2px', lineHeight: 1.1, color: 'var(--ink)' }}>Find et indsamlingsregnskab</h1>
          <p style={{ margin: 0, fontSize: 'clamp(16px,2vw,17.5px)', lineHeight: 1.65, color: 'var(--body)' }}>Søg blandt danske foreningers offentlige indsamlingsregnskaber. Hvert regnskab åbner en tidslinje fra indsamlingens start til det sidste er på plads.</p>
        </div>
      </section>

      <div ref={sentinelRef} aria-hidden="true" />
      <div className={stuck ? 'reg-bar reg-stuck' : 'reg-bar'}>
        <div className="reg-wrap">
          <div className="reg-barinner">
            <div className="reg-filtercard">
              <div className="reg-filters">
                <div className="reg-search">
                  <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: MUTED, display: 'flex', pointerEvents: 'none' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></svg>
                  </span>
                  <input
                    className="reg-field"
                    type="text"
                    placeholder="Søg efter forening eller by"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    maxLength={120}
                    autoComplete="off"
                    aria-label="Søg efter forening eller by"
                    style={{ paddingLeft: 46 }}
                  />
                </div>
                <button type="button" className="reg-filterbtn" onClick={() => setSelectsOpen((v) => !v)} aria-expanded={selectsOpen}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h18M6 12h12M10 19h4" /></svg>
                  Filtre {filterAntal ? `(${filterAntal})` : ''}
                </button>
                <div className={selectsOpen ? 'reg-selects reg-open' : 'reg-selects'}>
                  <SelectFelt value={aar} onChange={(e) => setAar(e.target.value)} ariaLabel="Vælg år">
                    <option value="">Alle år</option>
                    {aarValg.map((y) => (
                      <option key={y} value={String(y)}>{y}</option>
                    ))}
                  </SelectFelt>
                  <SelectFelt value={paragraf} onChange={(e) => setParagraf(e.target.value)} ariaLabel="Vælg tilladelsestype">
                    <option value="">Alle tilladelser</option>
                    <option value="paragraf_3">§3 enkelt indsamling</option>
                    <option value="paragraf_4">§4 årsregnskab</option>
                  </SelectFelt>
                  <SelectFelt value={status} onChange={(e) => setStatus(e.target.value)} ariaLabel="Vælg status">
                    <option value="">Alle statusser</option>
                    <option value="offentliggjort">Offentliggjort</option>
                    <option value="mangler_erklaering">Afventer overskudserklæring</option>
                    <option value="afsluttet">Afsluttet</option>
                  </SelectFelt>
                </div>
              </div>
            </div>
            <div className="reg-head" aria-hidden="true">
              <div>Forening og formål</div>
              <div>Periode</div>
              <div className="reg-h-belob">Indsamlet</div>
              <div>Offentliggjort</div>
            </div>
          </div>
        </div>
      </div>

      <section className="reg-wrap" style={{ paddingTop: 'clamp(20px,3vw,32px)', paddingBottom: 'clamp(50px,8vw,86px)' }}>
        <p style={{ margin: '0 0 20px', fontSize: 12.5, lineHeight: 1.5, color: MUTED }}>Du kan også søge på journalnummer fra Indsamlingsnævnet.</p>
        {indhold}
      </section>

      <SiteFooter />
    </div>
  );
}
