// ============================================================
//  StøtMedHjerte - For foreninger
//  Rute: /for-foreninger
//  Komponent: ForForeningerPage.jsx   |   CSS: ForForeninger.css
//
//  Drop-in til Vite + React. Siden importerer det FÆLLES fundament
//  (SiteNav, SiteFooter) og bygger kun sit eget indhold imellem dem.
//  Al farve går gennem var(--token). Inline HEX bruges ikke i denne
//  fil. De to side-scopede tokens (--smh-border, --smh-muted) er
//  defineret i toppen af ForForeninger.css.
//
//  Sproglig kontrakt: StøtMedHjerte rører aldrig pengene. Donor-bidrag
//  går direkte til foreningens egen MobilePay-konto. SMH tjener kun
//  på et fast månedligt abonnement.
// ============================================================

import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./ForForeninger.css";

/* ---- Ikoner: rene stroke-SVG'er (heart fyldes). currentColor styres af CSS. ---- */
const ICONS = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  heart: '<path d="M12 20.3l-1.45-1.32C5.4 14.24 2 11.16 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.66-3.4 6.74-8.55 11.49L12 20.3z"/>',
  ban: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6 18.4 18.4"/>',
  kr: '<text x="12" y="12" text-anchor="middle" dominant-baseline="central" fill="currentColor" stroke="none" font-family="Inter, system-ui, sans-serif" font-size="15.5" font-weight="700" letter-spacing="-.5">kr</text>',
  refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
  donations: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>',
  tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.4"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 14 3-3 3 3 5-6"/>',
  warning: '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
  grid: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.5a3.5 3.5 0 0 1 0 6.5"/>',
  shieldCheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
};
const FILLED = new Set(["heart"]);

function Icon({ name, size = 24, sw = 1.9, className }) {
  const filled = FILLED.has(name);
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  );
}

/* ---- Indhold (copy samlet her, så det er nemt at redigere) ---- */
const USES = [
  { icon: "heart", title: "Hjertesager", body: "Opret konkrete indsamlinger til udstyr, ture og aktiviteter, med mål og en delbar side." },
  { icon: "donations", title: "Donationer", body: "Modtag engangsbidrag via MobilePay direkte på foreningens egen konto." },
  { icon: "refresh", title: "Fast støtte", body: "Tilbyd månedlig støtte via MobilePay, så foreningen får et mere forudsigeligt grundlag." },
  { icon: "tag", title: "Journalnummer", body: "Knyt en hjertesag til foreningens tilladelse fra Indsamlingsnævnet." },
  { icon: "doc", title: "Dokumentation", body: "Saml de oplysninger, foreningen skal bruge, løbende ét sted." },
  { icon: "chart", title: "Regnskabsgrundlag", body: "Få et struktureret grundlag, bestyrelse og revisor kan bruge." },
];

const MODEL_POINTS = [
  { icon: "arrow", title: "Direkte til foreningen", body: "Bidrag lander på jeres egen MobilePay-konto." },
  { icon: "ban", title: "Vi rører ikke pengene", body: "StøtMedHjerte håndterer ikke donorbetalinger." },
  { icon: "kr", title: "Fast abonnement", body: "I betaler en fast pris, vi tager ikke en andel." },
];

const FACTS = [
  ["Anmeldelsesfrist", "Senest 14 dage før"],
  ["Journalnummer", "Bruges i SMH"],
  ["Dokumentation", "Samlet ét sted"],
];

const ORG_TYPES = [
  "Idrætsforeninger", "Spejdergrupper", "Kulturforeninger", "Patientforeninger",
  "Støtteforeninger", "Skole- og institutionsforeninger", "Sociale foreninger",
  "Lokale fællesskaber", "Klubber og frivillige organisationer",
];

const DASH_NAV = [
  { icon: "grid", label: "Oversigt", active: true },
  { icon: "heart", label: "Hjertesager" },
  { icon: "refresh", label: "Fast støtte" },
  { icon: "users", label: "Støtter" },
  { icon: "doc", label: "Regnskab" },
];

const DASH_STATS = [
  { icon: "kr", value: "8.450", unit: "kr.", label: "Donationer" },
  { icon: "chart", value: "127.450", unit: "kr.", label: "Total indsamlet" },
  { icon: "users", value: "84", unit: "", label: "Aktive støtter" },
  { icon: "heart", value: "12.300", unit: "kr.", label: "Denne måned" },
];

const DASH_RECENT = [
  { initials: "SK", name: "Sofie K.", kind: "Direkte donation", amount: "150,00 kr." },
  { initials: "JM", name: "Jonas M.", kind: "Direkte donation", amount: "350,00 kr." },
];

/* ---- Lille genbrugt eyebrow-kicker (var(--ink) for 6.4:1, brand-prik som accent) ---- */
function Eyebrow({ children, light }) {
  return (
    <p className={light ? "ff-eyebrow ff-eyebrow--light" : "ff-eyebrow"}>
      <span className="ff-eyebrow-dot" aria-hidden="true" />
      {children}
    </p>
  );
}

export default function ForForeningerPage() {
  return (
    <>
      <SiteNav />

      <main className="ff-page">
        {/* ============ HERO ============ */}
        <section className="ff-section ff-hero">
          <div className="ff-wrap ff-hero-grid">
            <div className="ff-hero-copy">
              <span className="ff-badge">
                <span className="ff-badge-dot" aria-hidden="true" />
                For danske foreninger
              </span>
              <h1 className="ff-h1">Få mere overblik over jeres pengeindsamling.</h1>
              <p className="ff-lead">
                StøtMedHjerte er udviklet til foreninger, der vil samle hjertesager,
                donationer, fast støtte og regnskabsgrundlag i én struktureret platform.
              </p>
              <div className="ff-cta-row">
                <Link to="/opret-forening" className="ff-btn ff-btn--brand ff-btn--lg ff-btn--full">
                  Opret forening
                </Link>
                <Link to="/priser" className="ff-btn ff-btn--ghost ff-btn--lg ff-btn--full">
                  Se priser
                </Link>
              </div>
              <p className="ff-trust">
                <Icon name="check" size={18} sw={2.2} className="ff-trust-ic" />
                Bidrag går direkte til jeres egen MobilePay-konto.
              </p>
            </div>

            <div className="ff-hero-visual">
              <div className="ff-hero-stage">
                <span className="ff-hero-glow" aria-hidden="true" />
                <figure className="ff-hero-photo">
                  <img
                    src="/images/ff-hero.jpg"
                    width="1200"
                    height="800"
                    loading="eager"
                    alt="Foreningsadministrator får overblik over hjertesager og bidrag på sin laptop"
                  />
                </figure>
                <div className="ff-mini" aria-hidden="true">
                  <p className="ff-mini-title">Foreningsoverblik</p>
                  <div className="ff-mini-row">
                    <span className="ff-mini-ic"><Icon name="heart" size={15} /></span>
                    <span className="ff-mini-label">Hjertesager</span>
                    <span className="ff-mini-val">3 aktive</span>
                  </div>
                  <div className="ff-mini-row">
                    <span className="ff-mini-ic"><Icon name="shieldCheck" size={15} sw={2} /></span>
                    <span className="ff-mini-label">Journalnummer</span>
                    <span className="ff-mini-val ff-mini-val--ok">
                      <Icon name="check" size={12} sw={3} className="ff-mini-ok-ic" />Registreret
                    </span>
                  </div>
                  <div className="ff-mini-row">
                    <span className="ff-mini-ic"><Icon name="doc" size={15} sw={2} /></span>
                    <span className="ff-mini-label">Regnskabsgrundlag</span>
                    <span className="ff-mini-val">Klar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 1. FORENINGENS OVERBLIK ============ */}
        <section className="ff-section ff-section--alt">
          <div className="ff-wrap">
            <div className="ff-head">
              <Eyebrow>Foreningens overblik</Eyebrow>
              <h2 className="ff-h2">Mindre manuelt arbejde. Mere tid til foreningen.</h2>
              <p className="ff-head-lead">
                I de fleste foreninger ender pengeindsamlingen hos kassereren og en
                håndfuld frivillige. StøtMedHjerte samler hjertesager, bidrag, fast
                støtte og dokumentation ét sted, så I får ro og overblik uden at hoppe
                mellem fem værktøjer.
              </p>
            </div>

            {/* Produkt-mock bygget i HTML/CSS (ikke et billede) */}
            <div className="ff-dash" role="img" aria-label="Skærmbillede af foreningens overblik i StøtMedHjerte med hjertesager, bidrag og regnskabsgrundlag">
              <div className="ff-dash-bar">
                <span className="ff-dash-dots" aria-hidden="true"><i /><i /><i /></span>
                <span className="ff-dash-url">app.stotmedhjerte.dk/oversigt</span>
              </div>
              <div className="ff-dash-grid">
                <aside className="ff-dash-side">
                  <div className="ff-dbrand">
                    <span className="ff-dbrand-badge"><Icon name="heart" size={17} /></span>
                    <span className="ff-dbrand-name">StøtMedHjerte</span>
                  </div>
                  <nav className="ff-dnav">
                    {DASH_NAV.map((n) => (
                      <span key={n.label} className={n.active ? "ff-dnav-item ff-dnav-item--active" : "ff-dnav-item"}>
                        <Icon name={n.icon} size={17} sw={2} />{n.label}
                      </span>
                    ))}
                  </nav>
                  <div className="ff-duser">
                    <span className="ff-duser-avatar">HS</span>
                    <span className="ff-duser-meta">
                      <span className="ff-duser-name">Hillerød SK</span>
                      <span className="ff-duser-role">Administrator</span>
                    </span>
                  </div>
                </aside>

                <div className="ff-dash-main">
                  <div className="ff-dwelcome">
                    <div>
                      <p className="ff-dwelcome-title">Velkommen tilbage, Hillerød SK</p>
                      <p className="ff-dwelcome-sub">Jeres støttearbejde samlet ét sted</p>
                    </div>
                    <div className="ff-dreport">
                      <span className="ff-dreport-label">Seneste rapport</span>
                      <span className="ff-dreport-val">Marts 2026</span>
                    </div>
                  </div>

                  <div className="ff-dstats">
                    {DASH_STATS.map((s) => (
                      <div key={s.label} className="ff-stat">
                        <span className="ff-stat-ic"><Icon name={s.icon} size={16} sw={2} /></span>
                        <p className="ff-stat-val">{s.value}{s.unit ? <span className="ff-stat-unit">{s.unit}</span> : null}</p>
                        <p className="ff-stat-label">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="ff-dchart">
                    <div className="ff-dchart-head">
                      <span className="ff-dchart-title">Indsamling over tid</span>
                      <span className="ff-dchart-legend">
                        <span className="ff-leg"><span className="ff-leg-dot ff-leg-dot--brand" />Donationer</span>
                        <span className="ff-leg"><span className="ff-leg-dot ff-leg-dot--rec" />Fast støtte</span>
                      </span>
                    </div>
                    <svg className="ff-dchart-svg" viewBox="0 0 760 180" preserveAspectRatio="none" aria-hidden="true">
                      <defs>
                        <linearGradient id="ffGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" className="ff-grad-top" />
                          <stop offset="1" className="ff-grad-bottom" />
                        </linearGradient>
                      </defs>
                      <path d="M0,120 C120,116 180,108 300,102 C420,96 480,78 600,66 C680,58 730,50 760,44 L760,180 L0,180 Z" fill="url(#ffGrad)" />
                      <path className="ff-line ff-line--brand" d="M0,120 C120,116 180,108 300,102 C420,96 480,78 600,66 C680,58 730,50 760,44" />
                      <path className="ff-line ff-line--rec" d="M0,150 C120,148 180,143 300,138 C420,133 480,126 600,120 C680,116 730,112 760,108" />
                    </svg>
                    <div className="ff-dchart-axis"><span>Mar 25</span><span>Aug 25</span><span>Jan 26</span><span>Maj 26</span></div>
                  </div>

                  <div className="ff-drecent">
                    <div className="ff-drecent-head">
                      <span className="ff-drecent-title"><span className="ff-live-dot" aria-hidden="true" />Seneste bidrag</span>
                      <span className="ff-drecent-link">Se alle</span>
                    </div>
                    {DASH_RECENT.map((r) => (
                      <div key={r.name} className="ff-recent-row">
                        <span className="ff-recent-avatar">{r.initials}</span>
                        <span className="ff-recent-info">
                          <span className="ff-recent-name">{r.name}</span>
                          <span className="ff-recent-kind">{r.kind}</span>
                        </span>
                        <span className="ff-recent-amt">
                          <span className="ff-recent-val">{r.amount}</span>
                          <span className="ff-recent-when"><span className="ff-live-dot" aria-hidden="true" />nu</span>
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="ff-verified">
                    <Icon name="shieldCheck" size={17} sw={2.2} className="ff-verified-ic" />
                    <span>Verificeret. Bidrag går direkte til jeres konto.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 2. DET KAN I BRUGE PLATFORMEN TIL ============ */}
        <section className="ff-section">
          <div className="ff-wrap">
            <div className="ff-head">
              <Eyebrow>Funktioner</Eyebrow>
              <h2 className="ff-h2">Det kan I bruge platformen til.</h2>
              <Link to="/hjertesager" className="ff-textlink">
                Se aktive hjertesager <Icon name="arrow" size={16} sw={2.4} />
              </Link>
            </div>
            <div className="ff-grid3">
              {USES.map((u) => (
                <article key={u.title} className="ff-card">
                  <span className="ff-card-ic"><Icon name={u.icon} /></span>
                  <h3 className="ff-card-title">{u.title}</h3>
                  <p className="ff-card-text">{u.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 3. REN MODEL (NAVY) ============ */}
        <section className="ff-section ff-section--navy ff-model">
          <span className="ff-model-glow" aria-hidden="true" />
          <div className="ff-wrap ff-model-grid">
            <div>
              <Eyebrow light>Modellen</Eyebrow>
              <h2 className="ff-h2 ff-h2--onnavy">Bidrag går direkte til jer.</h2>
              <p className="ff-lead ff-lead--onnavy">
                StøtMedHjerte håndterer ikke donorbetalinger. Bidrag går direkte til
                foreningens egen MobilePay-konto. Foreningen betaler et fast månedligt
                abonnement, og vi tager ikke en andel af det indsamlede.
              </p>
              <Link to="/priser" className="ff-btn ff-btn--brand ff-btn--lg">Se priser</Link>
            </div>
            <div className="ff-model-points">
              {MODEL_POINTS.map((m) => (
                <div key={m.title} className="ff-mpoint">
                  <span className="ff-mpoint-ic"><Icon name={m.icon} /></span>
                  <div>
                    <p className="ff-mpoint-title">{m.title}</p>
                    <p className="ff-mpoint-body">{m.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 4. INDSAMLINGSNÆVNET ============ */}
        <section className="ff-section">
          <div className="ff-wrap">
            <div className="ff-permit-card">
              <div className="ff-permit-grid">
                <div>
                  <span className="ff-permit-badge">
                    <Icon name="warning" size={14} sw={2.2} className="ff-permit-badge-ic" />
                    Tilladelse og regnskab
                  </span>
                  <h2 className="ff-h2">Tilladelse først. Struktur bagefter.</h2>
                  <p className="ff-lead">
                    Mange indsamlinger skal anmeldes til Indsamlingsnævnet senest 14 dage
                    før, de går i gang. Når I har jeres journalnummer, bruger I det i
                    StøtMedHjerte, så hjertesag, dokumentation og grundlag hænger sammen
                    fra start.
                  </p>
                  <Link to="/tilladelse-og-regnskab" className="ff-btn ff-btn--ghost ff-btn--lg">
                    Læs om tilladelse og regnskab
                  </Link>
                </div>
                <div className="ff-facts">
                  {FACTS.map(([k, v], i) => (
                    <div key={k} className={i < FACTS.length - 1 ? "ff-fact ff-fact--div" : "ff-fact"}>
                      <span className="ff-fact-k">{k}</span>
                      <span className="ff-fact-v">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 5. HVEM KAN BRUGE SMH ============ */}
        <section className="ff-section ff-section--alt">
          <div className="ff-wrap ff-who">
            <Eyebrow>Hvem kan bruge StøtMedHjerte</Eyebrow>
            <h2 className="ff-h2">Til foreninger, der vil samle penge ind mere professionelt.</h2>
            <ul className="ff-pills">
              {ORG_TYPES.map((o) => (
                <li key={o} className="ff-pill"><span className="ff-pill-dot" aria-hidden="true" />{o}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ AFSLUTTENDE CTA ============ */}
        <section className="ff-section ff-final">
          <div className="ff-wrap">
            <h2 className="ff-final-h2">Vil I samle penge ind med bedre overblik?</h2>
            <p className="ff-final-lead">
              Opret jeres forening, tilknyt MobilePay, registrér journalnummer, og gør
              jeres første hjertesag klar til deling.
            </p>
            <div className="ff-cta-row ff-cta-row--center">
              <Link to="/opret-forening" className="ff-btn ff-btn--brand ff-btn--xl ff-btn--full">
                Opret forening
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
