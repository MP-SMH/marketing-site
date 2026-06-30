// ============================================================
//  StøtMedHjerte - For støtter
//  Rute: /for-stoetter
//  Komponent: ForStoetterPage.jsx   |   CSS: ForStoetter.css
//
//  Drop-in til Vite + React. Siden importerer det FÆLLES fundament
//  (SiteNav, SiteFooter) og bygger kun sit eget indhold imellem dem.
//  Al farve går gennem var(--token). De to side-scopede tokens
//  (--smh-border, --smh-muted) er defineret i toppen af ForStoetter.css.
//
//  Sproglig kontrakt: StøtMedHjerte rører aldrig pengene. Bidrag går
//  direkte til foreningens egen MobilePay-konto. SMH er et
//  integrationslag og tjener kun på et fast månedligt abonnement.
// ============================================================

import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./ForStoetter.css";

/* ---- Ikoner: rene stroke-SVG'er. currentColor styres af CSS. ---- */
const ICONS = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>',
  shield: '<path d="M9 12l2 2 4-4"/><path d="M21 12c0 5-3.5 7.5-8.6 9a1 1 0 0 1-.8 0C6.5 19.5 3 17 3 12V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.4 1.4 0 0 1 1.6 0C13.5 3.8 16 5 18 5a1 1 0 0 1 1 1z"/>',
  eye: '<circle cx="12" cy="12" r="3"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>',
};

function Icon({ name, size = 24, sw = 1.9, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
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
const PURPOSES = [
  "Nyt udstyr",
  "Aktiviteter for børn og unge",
  "En tur",
  "Bedre faciliteter",
  "Et lokalt projekt",
];

const STEPS = [
  { n: "1", title: "Vælg en hjertesag", body: "Find den forening eller det formål, du gerne vil støtte." },
  { n: "2", title: "Vælg beløb", body: "Støt med et beløb, der passer til dig." },
  { n: "3", title: "Betal med MobilePay", body: "Du godkender betalingen i MobilePay-appen." },
  { n: "4", title: "Bidraget går direkte til foreningen", body: "Beløbet går direkte til foreningens egen MobilePay-konto." },
];

const TRUST = [
  { icon: "arrow", title: "Direkte til foreningen", body: "Bidrag går direkte til foreningens egen MobilePay-konto." },
  { icon: "phone", title: "Betaling via MobilePay", body: "Du godkender betalingen i MobilePay-appen." },
  { icon: "shield", title: "CVR-validerede foreninger", body: "Foreninger valideres på CVR, før de kan bruge platformen." },
  { icon: "eye", title: "Tydeligt formål", body: "Hver hjertesag viser, hvad foreningen samler ind til." },
];

/* ---- Lille genbrugt eyebrow-kicker (var(--ink) for 6.4:1, brand-prik som accent) ---- */
function Eyebrow({ children, center, light }) {
  const cls = ["fs-eyebrow", center && "fs-eyebrow--center", light && "fs-eyebrow--light"].filter(Boolean).join(" ");
  return (
    <p className={cls}>
      <span className="fs-eyebrow-dot" aria-hidden="true" />
      {children}
    </p>
  );
}

export default function ForStoetterPage() {
  return (
    <>
      <SiteNav />

      <main className="fs-page">
        {/* ============ HERO ============ */}
        <section className="fs-section fs-hero">
          <div className="fs-wrap fs-hero-grid">
            <div className="fs-hero-copy">
              <span className="fs-badge">
                <span className="fs-badge-dot" aria-hidden="true" />
                For dig der vil støtte
              </span>
              <h1 className="fs-h1">Støt en hjertesag uden at oprette profil.</h1>
              <p className="fs-lead">
                Find en hjertesag, vælg det beløb du vil støtte med, og godkend
                bidraget i MobilePay-appen, som du allerede bruger.
              </p>
              <div className="fs-cta-row">
                <Link to="/hjertesager" className="fs-btn fs-btn--brand fs-btn--lg fs-btn--full">
                  Find hjertesag
                </Link>
                <Link to="/saadan-virker-det" className="fs-btn fs-btn--ghost fs-btn--lg fs-btn--full">
                  Sådan virker det
                </Link>
              </div>
              <p className="fs-trust">
                <Icon name="check" size={18} sw={2.2} className="fs-trust-ic" />
                Bidraget går direkte til foreningens egen MobilePay-konto.
              </p>
            </div>

            <div className="fs-hero-visual">
              <div className="fs-hero-stage">
                <span className="fs-hero-glow" aria-hidden="true" />
                <figure className="fs-hero-photo">
                  <img
                    src="/images/fs-hero.jpg"
                    width="1000"
                    height="1250"
                    loading="eager"
                    alt="En person støtter en lokal hjertesag på sin telefon"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 1. HVAD KAN DU STØTTE ============ */}
        <section className="fs-section">
          <div className="fs-wrap fs-center">
            <div className="fs-head">
              <Eyebrow center>Hvad kan du støtte</Eyebrow>
              <h2 className="fs-h2">Støt konkrete formål, du kan forstå.</h2>
              <p className="fs-head-lead">
                En hjertesag er en indsamling til et tydeligt formål. Det kan være nyt
                udstyr, aktiviteter for børn og unge, en tur, bedre faciliteter eller et
                lokalt projekt. Når du støtter gennem StøtMedHjerte, kan du se, hvad
                foreningen samler ind til, og hvordan dit bidrag hjælper.
              </p>
            </div>
            <ul className="fs-pills">
              {PURPOSES.map((p) => (
                <li key={p} className="fs-pill"><span className="fs-pill-dot" aria-hidden="true" />{p}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ 2. SÅDAN STØTTER DU ============ */}
        <section id="fs-saadan" className="fs-section fs-section--alt">
          <div className="fs-wrap">
            <div className="fs-head fs-head--center">
              <Eyebrow center>Sådan støtter du</Eyebrow>
              <h2 className="fs-h2">Det tager kun få sekunder.</h2>
            </div>
            <ol className="fs-flow">
              {STEPS.map((s, i) => (
                <li key={s.n} className="fs-step">
                  <span className="fs-step-badge">{s.n}</span>
                  {i < STEPS.length - 1 ? <span className="fs-step-conn" aria-hidden="true" /> : null}
                  <div className="fs-step-body">
                    <h3 className="fs-step-title">{s.title}</h3>
                    <p className="fs-step-text">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ 3. TRYGHED ============ */}
        <section className="fs-section">
          <div className="fs-wrap">
            <div className="fs-head fs-head--center">
              <Eyebrow center>Tryghed</Eyebrow>
              <h2 className="fs-h2">Støt med ro i maven.</h2>
            </div>
            <div className="fs-grid4">
              {TRUST.map((t) => (
                <article key={t.title} className="fs-card">
                  <span className="fs-card-ic"><Icon name={t.icon} /></span>
                  <h3 className="fs-card-title">{t.title}</h3>
                  <p className="fs-card-text">{t.body}</p>
                </article>
              ))}
            </div>
            <p className="fs-center-link">
              <Link to="/sikkerhed" className="fs-textlink">
                Læs mere om sikkerhed <Icon name="arrow" size={16} sw={2.4} />
              </Link>
            </p>
          </div>
        </section>

        {/* ============ 4. FAST STØTTE ============ */}
        <section className="fs-section fs-section--alt">
          <div className="fs-wrap fs-split">
            <div className="fs-split-copy">
              <Eyebrow>Fast støtte</Eyebrow>
              <h2 className="fs-h2">Gør din støtte fast.</h2>
              <p className="fs-lead">
                Nogle foreninger tilbyder fast støtte. Det betyder, at du kan støtte med
                et fast månedligt beløb og være med til at give foreningen mere ro i
                planlægningen. Oprettelse og betaling håndteres via MobilePay-appen, som
                du allerede bruger.
              </p>
              <Link to="/hjertesager" className="fs-btn fs-btn--brand fs-btn--lg">
                Se foreninger med fast støtte
              </Link>
            </div>
            <figure className="fs-split-photo">
              <img
                src="/images/fs-fast-stoette.jpg"
                width="1000"
                height="1250"
                loading="lazy"
                alt="En fast støtte bakker op om sin lokale forening via mobilen"
              />
            </figure>
          </div>
        </section>

        {/* ============ 5. INGEN EKSTRA PROFIL (NAVY) ============ */}
        <section className="fs-section fs-section--navy fs-final">
          <span className="fs-final-glow" aria-hidden="true" />
          <div className="fs-final-inner">
            <Eyebrow center light>Enkelt for dig</Eyebrow>
            <h2 className="fs-h2 fs-h2--onnavy">Du bruger bare MobilePay.</h2>
            <p className="fs-lead fs-lead--onnavy">
              Som støtte skal du ikke oprette en ny profil på StøtMedHjerte. Du vælger
              hjertesag, vælger beløb og godkender betalingen i MobilePay-appen. Det gør
              støtten enkel, genkendelig og hurtig for almindelige MobilePay-brugere.
            </p>
            <div className="fs-cta-row fs-cta-row--center">
              <Link to="/hjertesager" className="fs-btn fs-btn--brand fs-btn--xl fs-btn--full">
                Find hjertesag
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
