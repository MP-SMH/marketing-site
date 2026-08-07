// ============================================================
//  StøtMedHjerte — HomeNy (forside, ny CD-port)
//  Midlertidigt navn (HomeNy) indtil verificeret, så den gamle
//  Home.jsx er urørt. 1:1 port af Claude Design forsidens main-
//  sektioner. Delt nav/footer via SiteNav/SiteFooter.
//  Links: ROUTES.* -> react-router <Link>; in-page #anchors ->
//  plain <a href> (appen kører HashRouter, så <Link to="#x">
//  ville blive tolket som en rute og ødelægge scroll).
// ============================================================

import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./Home.css";

/* ---- Route map: prototype file  ->  app route. Adjust to taste. ---- */
const ROUTES = {
  home: "/",
  hjertesager: "/hjertesager",
  forStoetter: "/for-stoetter",
  forForeninger: "/for-foreninger",
  donationer: "/donationer",
  fastStoette: "/fast-stoette",
  tilladelse: "/tilladelse-og-regnskab",
  lovgivning: "/lovgivning-og-ansvar",
  priser: "/priser",
  denReneModel: "/den-rene-model",
  sikkerhed: "/sikkerhed",
  support: "/support",
  faq: "/faq",
  omOs: "/om-os",
  voresMission: "/vores-mission",
  founder: "/founder",
  saadanVirkerDet: "/saadan-virker-det",
  kontakt: "/kontakt",
  logInd: "/log-ind",
  opretForening: "/opret-forening", // CTA deep-links to #form on that page
};

/* ============================================================
   Icon helper. `d` is raw inner SVG markup (paths/text).
   Stroke icons by default; pass fill for solid glyphs.
   ============================================================ */
function Ic({ d, size = 24, sw = 1.9, fill = false, color = "currentColor", style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : color}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      dangerouslySetInnerHTML={{ __html: d }}
    />
  );
}

const PATH = {
  chevron: '<path d="m6 9 6 6 6-6"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  heart: '<path d="M12 20.3l-1.45-1.32C5.4 14.24 2 11.16 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.66-3.4 6.74-8.55 11.49L12 20.3z"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  kr: '<text x="12" y="12" text-anchor="middle" dominant-baseline="central" fill="currentColor" stroke="none" font-family="Inter, system-ui, sans-serif" font-size="15.5" font-weight="700" letter-spacing="-.5">kr</text>',
};

/* ============================================================
   CONTENT DATA  (copy lives here so it is easy to edit / i18n)
   ============================================================ */
const TRUST_ITEMS = [
  "CVR-validerede foreninger",
  "Journalnr. fra Indsamlingsnævnet",
  "Vi rører ikke pengene",
  "MobilePay uden profil",
  "Udviklet i Danmark",
];

const PROBLEMS = [
  { title: "Mindre manuelt arbejde", body: "Færre regneark og løse kvitteringer. Bidrag og dokumentation samles automatisk, så frivillige slipper for dobbeltarbejde.", d: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' },
  { title: "Bedre overblik", body: "Se alle jeres hjertesager, hvor langt de er nået, og hvem der har bidraget, samlet på ét sted.", d: '<path d="M3 3v18h18"/><path d="M7 14l3-3 3 3 5-6"/>' },
  { title: "Klarere grundlag", body: "Et tydeligt grundlag, kassereren kan bruge til foreningens regnskab, uden at lede efter tal i fem kanaler.", d: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>' },
];

const FEATURES = [
  { title: "Hjertesager", body: "Opret indsamlinger med mål, progress-bar og en delbar side, frivillige kan sprede på få sekunder.", d: '<path d="M12 21s-7.5-4.7-10-9.3C.4 8.3 2 4.5 5.6 4.5c2 0 3.4 1.1 4.4 2.6C11 5.6 12.4 4.5 14.4 4.5 18 4.5 19.6 8.3 18 11.7 15.5 16.3 12 21 12 21z"/>' },
  { title: "Donationer", body: "Støtter bidrager trygt via MobilePay direkte til foreningens egen konto, uden ny profil.", d: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/><path d="M6 15h4"/>' },
  { title: "Fast støtte", body: "Lad støtter give et fast månedligt bidrag, så foreningen får et mere forudsigeligt grundlag.", d: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>' },
  { title: "Tilladelse og regnskab", body: "Hold styr på journalnummer fra Indsamlingsnævnet og saml dokumentationen, I skal bruge.", d: '<path d="M9 12l2 2 4-4"/><path d="M21 12c0 5-3.5 7.5-8.6 9a1 1 0 0 1-.8 0C6.5 19.5 3 17 3 12V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.4 1.4 0 0 1 1.6 0C13.5 3.8 16 5 18 5a1 1 0 0 1 1 1z"/>' },
];

const MODEL_POINTS = [
  { title: "Direkte til foreningen", body: "Bidrag lander på foreningens egen MobilePay-konto.", d: PATH.arrow },
  { title: "Vi rører ikke pengene", body: "StøtMedHjerte håndterer ikke donorbetalinger.", d: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6 18.4 18.4"/>' },
  { title: "Fast abonnement", body: "Foreningen betaler en fast pris, vi tager ikke en andel.", d: PATH.kr },
];

const SUPPORTER_STEPS = [
  { n: "1", title: "Vælg hjertesag", body: "Find en sag, der betyder noget for dig." },
  { n: "2", title: "Vælg beløb", body: "Bestem selv, hvor meget du vil give." },
  { n: "3", title: "Betal med MobilePay", body: "Hurtigt og trygt, uden ny profil." },
  { n: "4", title: "Direkte til foreningen", body: "Bidraget går direkte til foreningen." },
];

const ASSOC_POINTS = [
  "Opret hjertesager med mål og delbar side",
  "Modtag bidrag via MobilePay direkte på jeres konto",
  "Tilknyt journalnummer fra Indsamlingsnævnet",
  "Saml dokumentation til foreningens regnskab",
];

const PLANS = [
  { name: "Donationer", desc: "Til foreninger, der vil i gang med enkelte hjertesager.", price: "149", cta: "Vælg Donationer",
    features: ["Ubegrænsede hjertesager", "Bidrag via MobilePay", "Overblik og progress"], featured: false },
  { name: "Fast støtte", desc: "Til foreninger, der vil opbygge faste, månedlige bidrag.", price: "199", cta: "Vælg Fast støtte",
    features: ["Alt i Donationer", "Faste månedlige bidrag", "Forudsigeligt grundlag"], featured: false },
  { name: "Samlet løsning", desc: "Hele platformen, donationer og fast støtte samlet.", price: "278", cta: "Vælg Samlet løsning",
    features: ["Alt i Donationer og Fast støtte", "Tilladelse og regnskabsgrundlag", "Prioriteret support"], featured: true },
];

/* Reusable button style fragments (shared by several CTAs). */
const btnBase = { textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" };
const brandBtn = (pad = "16px 30px", min = 54, fs = 16) => ({
  ...btnBase, color: "#fff", fontSize: fs, fontWeight: 600, padding: pad, minHeight: min,
  borderRadius: 999, background: "var(--brand)", boxShadow: "0 12px 30px rgba(224,25,63,.22)",
});
const ghostBtn = (pad = "16px 30px", min = 54, fs = 16) => ({
  ...btnBase, color: "var(--ink)", fontSize: fs, fontWeight: 600, padding: pad, minHeight: min,
  borderRadius: 999, background: "var(--surface)", border: "1px solid var(--smh-border)",
});

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  const heroChips = [
    "Bidrag direkte til foreningens MobilePay-konto",
    "Støtter bruger MobilePay-appen",
    "Fast abonnement for foreningen",
    "Ingen støtteprofil krævet",
  ];
  return (
    <section className="wrap" style={{ paddingTop: 48, paddingBottom: 56 }}>
      <div className="hero-grid">
        {/* left: copy */}
        <div style={{ animation: "smhRise .6s ease both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 15px", borderRadius: 999, background: "var(--brand-surface)", border: "1px solid var(--brand-border)", marginBottom: 22 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--brand)" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--brand-hover)", letterSpacing: "-.1px" }}>Dansk platform til foreningers pengeindsamling</span>
          </div>
          <h1 style={{ margin: "0 0 20px", fontSize: "clamp(32px,5.4vw,54px)", lineHeight: 1.06, fontWeight: 800, letterSpacing: "-1.2px", color: "var(--ink)", textWrap: "balance" }}>Pengeindsamling gjort enkelt for danske foreninger.</h1>
          <p style={{ margin: "0 0 30px", fontSize: "clamp(16px,2.4vw,18.5px)", lineHeight: 1.6, color: "var(--body)", maxWidth: 520 }}>StøtMedHjerte samler hjertesager, donationer, fast støtte og regnskabsgrundlag ét sted, så foreningen får bedre overblik og mindre manuelt arbejde.</p>
          <div className="cta-row" style={{ marginBottom: 24 }}>
            <a href="#foreninger" className="cta-w btn-brand" style={{ ...brandBtn("16px 30px"), display: "flex" }}>Opret forening</a>
            <a href="#hjertesager" className="cta-w btn-ghost" style={{ ...ghostBtn("16px 30px"), display: "flex" }}>Find hjertesag</a>
          </div>
          <div style={{ marginTop: 16 }}>
            <Link to={ROUTES.saadanVirkerDet} className="link-ink" style={{ textDecoration: "none", color: "var(--body)", fontSize: 15.5, fontWeight: 600, padding: "16px 14px", minHeight: 54, display: "inline-flex", alignItems: "center", gap: 6 }}>
              Se hvordan det virker <Ic d={PATH.arrow} size={16} sw={2.2} />
            </Link>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
            {heroChips.map((c) => (
              <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 13px", borderRadius: 999, background: "var(--surface)", border: "1px solid var(--smh-border)", fontSize: 13, fontWeight: 600, color: "var(--body)" }}>
                <Ic d={PATH.check} size={14} sw={2.6} color="var(--success)" />{c}
              </span>
            ))}
          </div>
        </div>

        {/* right: 2.5D platform scene */}
        <div style={{ animation: "smhRise .7s .1s ease both" }}>
          <div className="hero-stage">
            <div className="hero-glow" />
            {/* photo — REPLACE src, see ASSETS.md */}
            <figure className="hero-photo" style={{ position: "relative", zIndex: 1, margin: 0, borderRadius: 28, overflow: "hidden", border: "1px solid var(--smh-border)", boxShadow: "0 34px 80px -34px rgba(8,14,26,.22)" }}>
              <img src="/assets/forside-hero-3d-platform-foreningsliv.webp" alt="Frivillige og medlemmer samlet til et lokalt foreningsarrangement" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 38%", display: "block" }} />
            </figure>

            {/* overlapping hjertesag card */}
            <div style={{ margin: "-64px 14px 0", position: "relative", zIndex: 2, background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: 26, padding: 24, boxShadow: "0 34px 80px -30px rgba(8,14,26,.26),0 6px 18px rgba(8,14,26,.05)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 14, background: "linear-gradient(135deg,#243B57,#0B1424)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Ic size={22} sw={2} color="#fff" d='<path d="M3 14c2 1 4 1 6 0M3 18c2 1 4 1 6 0M3 10c2 1 4 1 6 0M15 7v10M19 7v10"/>' />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--label)", textTransform: "uppercase", letterSpacing: ".4px" }}>Hjertesag</div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--body)" }}>Aktiv · 19 dage tilbage</div>
                  </div>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 11px", borderRadius: 999, background: "#ECFDF3", color: "#15803D", fontSize: 12.5, fontWeight: 600 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)" }} />Verificeret
                </span>
              </div>
              <h3 style={{ margin: "0 0 4px", fontSize: 23, fontWeight: 700, letterSpacing: "-.5px", color: "var(--ink)" }}>Svømmestævner 2026</h3>
              <p style={{ margin: "0 0 22px", fontSize: 14.5, lineHeight: 1.5, color: "var(--smh-muted)" }}>Hillerød Svømmeklub · Udstyr og rejser til årets stævner</p>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 9 }}>
                <div style={{ fontSize: 27, fontWeight: 800, letterSpacing: "-.6px", color: "var(--ink)" }}>5.600 kr.</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--smh-muted)" }}>af 15.000 kr.</div>
              </div>
              <div style={{ height: 12, borderRadius: 999, background: "var(--alt)", overflow: "hidden", marginBottom: 8 }}>
                <div style={{ height: "100%", width: "37%", borderRadius: 999, background: "linear-gradient(90deg,var(--brand),#F2547A)", animation: "smhFill 1.1s .25s ease both" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--brand)" }}>37% nået</span>
                <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--smh-muted)" }}>68 støtter</span>
              </div>
              <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, padding: 15, minHeight: 52, border: "none", borderRadius: 999, background: "#080E1A", color: "#fff", fontSize: 15.5, fontWeight: 600, fontFamily: "inherit", boxShadow: "0 12px 26px rgba(8,14,26,.30)" }}>
                <Ic d={PATH.heart} size={18} fill color="#fff" />Støt med MobilePay
              </div>
              <div style={{ marginTop: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, color: "var(--smh-muted)", fontSize: 12.5, textAlign: "center" }}>
                <Ic d={PATH.lock} size={14} sw={2} style={{ flexShrink: 0 }} />Bidrag går direkte til foreningen
              </div>
            </div>

            {/* floating badges */}
            <div className="fb fb-hide-sm" style={{ top: 16, left: 12, animation: "smhFloatA 5.5s ease-in-out infinite" }}>
              <Ic d={PATH.check} size={13} sw={3} color="var(--success)" />Direkte til foreningen
            </div>
            <div className="fb fb-hide-sm" style={{ top: 16, right: 12, animation: "smhFloatB 6.5s ease-in-out infinite" }}>
              <Ic size={13} sw={2.6} color="var(--brand)" d='<circle cx="12" cy="12" r="9"/><path d="M9 12h6"/>' />Ingen profil
            </div>
            <div className="fb" style={{ top: "53%", right: 6, animation: "smhFloatA 6s ease-in-out infinite" }}>
              <Ic size={13} sw={2.3} color="var(--ink)" d='<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>' />Fast abonnement
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TRUST BAND  (toggle with showTrustBand prop)
   ============================================================ */
function TrustBand() {
  return (
    <section style={{ borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)", background: "var(--alt)" }}>
      <div className="wrap" style={{ paddingTop: 18, paddingBottom: 18, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 10 }}>
        {TRUST_ITEMS.map((t) => (
          <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 15px", borderRadius: 999, background: "var(--surface)", border: "1px solid var(--smh-border)", fontSize: 13, fontWeight: 600, letterSpacing: "-.1px", color: "var(--ink)", whiteSpace: "nowrap", boxShadow: "0 1px 2px rgba(8,14,26,.03)" }}>
            <Ic d={PATH.check} size={14} sw={2.7} color="var(--success)" style={{ flexShrink: 0 }} />{t}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   SECTION SHELLS + small bits
   ============================================================ */
const Eyebrow = ({ children, color = "var(--label)" }) => (
  <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color, marginBottom: 14 }}>{children}</div>
);

function ProblemSection() {
  return (
    <section className="wrap sec-pad">
      <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 40px" }}>
        <Eyebrow>Udfordringen</Eyebrow>
        <h2 style={{ margin: "0 0 18px", fontSize: "clamp(27px,4.4vw,40px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>En god indsamling kræver mere end et opslag.</h2>
        <p style={{ margin: 0, fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.6, color: "var(--body)" }}>Frivillige bruger ofte timer på regneark, kvitteringer og opfølgning. Overblikket forsvinder, og det bliver svært at vise, hvor pengene går hen.</p>
      </div>
      <div className="g3">
        {PROBLEMS.map((p) => (
          <div key={p.title} className="lift" style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: 26, padding: "32px 30px" }}>
            <div style={{ width: 50, height: 50, borderRadius: 16, background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: "var(--brand)" }}>
              <Ic d={p.d} />
            </div>
            <h3 style={{ margin: "0 0 9px", fontSize: 19, fontWeight: 700, letterSpacing: "-.4px", color: "var(--ink)" }}>{p.title}</h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--body)" }}>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Stat tile used inside the solution dashboard mock. */
function StatTile({ d, label, value, sub }) {
  return (
    <div style={{ background: "var(--page)", border: "1px solid var(--smh-border)", borderRadius: 16, padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
        <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--brand-surface)", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Ic d={d} size={18} />
        </span>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", letterSpacing: "-.2px" }}>{label}</span>
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.5px", color: "var(--ink)", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--smh-muted)", marginTop: 5 }}>{sub}</div>
    </div>
  );
}

function SolutionSection() {
  return (
    <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
      <div className="sec-pad" style={{ maxWidth: 1000, margin: "0 auto", paddingLeft: 20, paddingRight: 20, textAlign: "center" }}>
        <Eyebrow color="var(--brand)">Løsningen</Eyebrow>
        <h2 style={{ margin: "0 auto 20px", fontSize: "clamp(27px,4.4vw,40px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", maxWidth: 680, textWrap: "balance" }}>Fra hjertesag til regnskabsgrundlag i samme flow.</h2>
        <p style={{ margin: "0 auto 32px", fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.6, color: "var(--body)", maxWidth: 600 }}>Opret en hjertesag, modtag bidrag via MobilePay, og få et samlet grundlag, du kan bruge til foreningens regnskab, uden at hoppe mellem fem værktøjer.</p>
        <Link to={ROUTES.saadanVirkerDet} className="btn-brand" style={{ ...brandBtn("16px 30px") }}>Se hvordan det virker</Link>

        {/* dashboard mock (pure HTML/CSS, not an image) */}
        <figure style={{ margin: "48px auto 0", maxWidth: 880, position: "relative" }}>
          <div className="dfloat fb-hide-sm" style={{ top: -16, right: 14, animation: "smhFloatB 6s ease-in-out infinite", display: "inline-flex", alignItems: "center", gap: 9, padding: "10px 14px", borderRadius: 14, background: "#fff", border: "1px solid var(--smh-border)", boxShadow: "0 20px 40px -16px rgba(8,14,26,.30)" }}>
            <span style={{ width: 30, height: 30, borderRadius: 9, background: "#ECFDF3", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d={PATH.check} size={16} sw={3} color="var(--success)" /></span>
            <span style={{ textAlign: "left" }}>
              <span style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>+200 kr.</span>
              <span style={{ display: "block", fontSize: 11, color: "var(--smh-muted)" }}>Bidrag modtaget</span>
            </span>
          </div>
          <div className="dfloat fb-hide-sm" style={{ bottom: -14, left: 16, animation: "smhFloatA 6.6s ease-in-out infinite", display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 13px", borderRadius: 999, background: "#fff", border: "1px solid var(--smh-border)", boxShadow: "0 18px 38px -16px rgba(8,14,26,.28)", fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--brand)" }} />37% mod mål
          </div>

          <div style={{ position: "relative", zIndex: 1, background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: 24, padding: "clamp(18px,3vw,28px)", boxShadow: "0 44px 96px -46px rgba(8,14,26,.34)", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#243B57,#0B1424)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ic size={20} sw={2} color="#fff" d='<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>' />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", letterSpacing: "-.3px" }}>Foreningsoverblik</div>
                  <div style={{ fontSize: 12.5, color: "var(--smh-muted)" }}>Hillerød Svømmeklub</div>
                </div>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 11px", borderRadius: 999, background: "#ECFDF3", color: "#15803D", fontSize: 12, fontWeight: 700 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)" }} />Verificeret
              </span>
            </div>
            <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <StatTile d='<path d="M19 14c1.5-1.5 2-3.5 2-5a4 4 0 0 0-7-2.6A4 4 0 0 0 7 9c0 1.5.5 3.5 2 5l5 5z"/>' label="Hjertesager" value="3 aktive" sub="Svømmestævner 37% nået" />
              <StatTile d={PATH.kr} label="Donationer" value="12.400 kr." sub="Modtaget denne måned" />
              <StatTile d='<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>' label="Fast støtte" value="48 støtter" sub="Fast hver måned" />
              <StatTile d='<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/>' label="Regnskabsgrundlag" value="Klar" sub="Journalnr. tilknyttet" />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}

/* ============================================================
   TO VEJE VIDERE (two entry-point cards)
   ============================================================ */
function TwoPaths() {
  return (
    <section className="wrap sec-pad">
      <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 44px" }}>
        <Eyebrow>To veje videre</Eyebrow>
        <h2 style={{ margin: 0, fontSize: "clamp(27px,4.4vw,40px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>Find din vej ind i StøtMedHjerte.</h2>
      </div>
      <div className="veje-grid">
        {/* For støtter */}
        <Link to={ROUTES.forStoetter} className="lift-4" style={{ textDecoration: "none", display: "block", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: 28, padding: "clamp(24px,3vw,34px)", boxShadow: "0 18px 50px -34px rgba(8,14,26,.16)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 172, borderRadius: 20, background: "linear-gradient(160deg,#FFF1F3,#F3F5F8)", border: "1px solid var(--smh-border)", marginBottom: 24, overflow: "hidden" }}>
            <div style={{ width: 172, background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: 16, boxShadow: "0 22px 44px -22px rgba(8,14,26,.30)", padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--label)", marginBottom: 8 }}>Vælg beløb</div>
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                <span style={{ flex: 1, textAlign: "center", fontSize: 12, fontWeight: 700, color: "var(--smh-muted)", padding: "7px 0", borderRadius: 9, background: "var(--alt)" }}>100</span>
                <span style={{ flex: 1, textAlign: "center", fontSize: 12, fontWeight: 700, color: "#fff", padding: "7px 0", borderRadius: 9, background: "var(--brand)" }}>200</span>
                <span style={{ flex: 1, textAlign: "center", fontSize: 12, fontWeight: 700, color: "var(--smh-muted)", padding: "7px 0", borderRadius: 9, background: "var(--alt)" }}>500</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#080E1A", color: "#fff", fontSize: 11.5, fontWeight: 700, padding: 11, borderRadius: 10 }}>Støt med MobilePay</div>
            </div>
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "var(--brand)", marginBottom: 10 }}>For støtter</div>
          <h3 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 800, letterSpacing: "-.5px", color: "var(--ink)" }}>Støt en hjertesag på få sekunder.</h3>
          <p style={{ margin: "0 0 18px", fontSize: 15, lineHeight: 1.6, color: "var(--body)" }}>Vælg et formål, vælg beløb, og godkend i MobilePay. Du skal ikke oprette en profil for at støtte.</p>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>Sådan støtter du <Ic d={PATH.arrow} size={17} sw={2.4} /></span>
        </Link>
        {/* For foreninger */}
        <Link to={ROUTES.forForeninger} className="lift-4" style={{ textDecoration: "none", display: "block", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: 28, padding: "clamp(24px,3vw,34px)", boxShadow: "0 18px 50px -34px rgba(8,14,26,.16)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 172, borderRadius: 20, background: "linear-gradient(160deg,#EEF2F8,#F3F5F8)", border: "1px solid var(--smh-border)", marginBottom: 24, overflow: "hidden", padding: 20 }}>
            <div style={{ width: "100%", maxWidth: 230, background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: 16, boxShadow: "0 22px 44px -22px rgba(8,14,26,.28)", padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink)" }}>Foreningsoverblik</span>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: "#15803D", background: "#ECFDF3", padding: "3px 7px", borderRadius: 999 }}>Verificeret</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div style={{ background: "var(--page)", border: "1px solid var(--smh-border)", borderRadius: 10, padding: 9 }}><div style={{ fontSize: 9, color: "var(--smh-muted)", marginBottom: 3 }}>Hjertesager</div><div style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)" }}>3</div></div>
                <div style={{ background: "var(--page)", border: "1px solid var(--smh-border)", borderRadius: 10, padding: 9 }}><div style={{ fontSize: 9, color: "var(--smh-muted)", marginBottom: 3 }}>Donationer</div><div style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)" }}>12.4k</div></div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "var(--brand)", marginBottom: 10 }}>For foreninger</div>
          <h3 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 800, letterSpacing: "-.5px", color: "var(--ink)" }}>Saml indsamling og overblik ét sted.</h3>
          <p style={{ margin: "0 0 18px", fontSize: 15, lineHeight: 1.6, color: "var(--body)" }}>Hjertesager, donationer, fast støtte og regnskabsgrundlag samlet i én platform, bygget til frivillige.</p>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>For foreninger <Ic d={PATH.arrow} size={17} sw={2.4} /></span>
        </Link>
      </div>
    </section>
  );
}

/* ============================================================
   FOUR FEATURES
   ============================================================ */
function Features() {
  return (
    <section id="hjertesager" className="wrap sec-pad">
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <Eyebrow>Platformen</Eyebrow>
        <h2 style={{ margin: "0 auto", fontSize: "clamp(27px,4.4vw,40px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", maxWidth: 560, textWrap: "balance" }}>Fire funktioner. Én samlet platform.</h2>
      </div>
      <div className="g2">
        {FEATURES.map((f) => (
          <div key={f.title} className="lift" style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: 28, padding: 32, display: "flex", gap: 20 }}>
            <div style={{ flexShrink: 0, width: 56, height: 56, borderRadius: 18, background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand)" }}>
              <Ic d={f.d} fill={!!f.fill} />
            </div>
            <div>
              <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, letterSpacing: "-.4px", color: "var(--ink)" }}>{f.title}</h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--body)" }}>{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   CLEAN MODEL (navy)
   ============================================================ */
function CleanModel() {
  return (
    <section style={{ background: "var(--navy1)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -120, right: -80, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.16),transparent 65%)" }} />
      <div className="sec-pad" style={{ maxWidth: 1080, margin: "0 auto", paddingLeft: 20, paddingRight: 20, position: "relative" }}>
        <div className="split">
          <div>
            <Eyebrow color="#8FA0BC">Modellen</Eyebrow>
            <h2 style={{ margin: "0 0 22px", fontSize: "clamp(26px,4.2vw,38px)", lineHeight: 1.14, fontWeight: 800, letterSpacing: "-.9px", color: "#fff", textWrap: "balance" }}>En ren model, der er nem at forklare.</h2>
            <p style={{ margin: "0 0 26px", fontSize: "clamp(16px,2.2vw,17px)", lineHeight: 1.65, color: "#AEB9CC" }}>Bidrag går direkte til foreningens egen MobilePay-konto. StøtMedHjerte håndterer ikke donorbetalinger, foreningen betaler et fast abonnement, og vi tager ikke en andel af det indsamlede.</p>
            <div style={{ padding: "20px 24px", borderRadius: 20, background: "var(--navy3)", border: "1px solid rgba(255,255,255,.07)" }}>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#E8EDF5", fontWeight: 600 }}>"Pengene går til foreningen. Strukturen ligger i StøtMedHjerte."</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {MODEL_POINTS.map((m) => (
              <div key={m.title} style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 22px", borderRadius: 20, background: "var(--navy2)", border: "1px solid rgba(255,255,255,.06)" }}>
                <div style={{ flexShrink: 0, width: 46, height: 46, borderRadius: 14, background: "rgba(224,25,63,.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF6B86" }}>
                  <Ic d={m.d} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 3, letterSpacing: "-.3px" }}>{m.title}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, color: "#9AA8BE" }}>{m.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOR STØTTER (steps)
   ============================================================ */
function SupporterSection() {
  return (
    <section id="stoetter" className="wrap sec-pad">
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <Eyebrow>For støtter</Eyebrow>
        <h2 style={{ margin: "0 auto 16px", fontSize: "clamp(27px,4.4vw,40px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", maxWidth: 560, textWrap: "balance" }}>Støt det, der betyder noget for dig.</h2>
        <p style={{ margin: "0 auto", fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.6, color: "var(--body)", maxWidth: 540 }}>Fire enkle trin, uden ny profil og uden ekstra app.</p>
      </div>

      {/* photo — image-slot in prototype; REPLACE src, see ASSETS.md */}
      <figure style={{ margin: "0 0 40px", borderRadius: 24, overflow: "hidden", border: "1px solid var(--smh-border)", height: "clamp(240px,32vw,360px)", boxShadow: "0 30px 70px -36px rgba(8,14,26,.16)" }}>
        <img src="/assets/forside-stoetter-foto.webp" alt="En støtter giver et bidrag på sin telefon til en lokal hjertesag" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </figure>

      <div className="g4" style={{ marginBottom: 40 }}>
        {SUPPORTER_STEPS.map((s) => (
          <div key={s.n} style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: 24, padding: "28px 26px" }}>
            <div style={{ width: 40, height: 40, borderRadius: 13, background: "var(--ink)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, marginBottom: 18 }}>{s.n}</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>{s.title}</h3>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: "var(--body)" }}>{s.body}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <a href="#hjertesager" className="cta-w btn-brand" style={{ ...brandBtn("16px 30px") }}>Find hjertesag</a>
      </div>
    </section>
  );
}

/* ============================================================
   FOR FORENINGER
   ============================================================ */
function AssociationSection() {
  return (
    <section id="foreninger" style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
      <div className="sec-pad wrap">
        <div className="split">
          {/* photo — image-slot in prototype; REPLACE src, see ASSETS.md */}
          <figure style={{ margin: 0, borderRadius: 24, overflow: "hidden", border: "1px solid var(--smh-border)", aspectRatio: "4/3", boxShadow: "0 30px 70px -36px rgba(8,14,26,.16)" }}>
            <img src="/assets/forside-foreninger-foto.webp" alt="Frivillige fra en bestyrelse planlægger årets indsamling sammen" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </figure>
          <div>
            <Eyebrow color="var(--brand)">For foreninger</Eyebrow>
            <h2 style={{ margin: "0 0 18px", fontSize: "clamp(26px,4.2vw,38px)", lineHeight: 1.14, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>Gør pengeindsamling lettere at styre.</h2>
            <p style={{ margin: "0 0 24px", fontSize: "clamp(16px,2.2vw,17.5px)", lineHeight: 1.65, color: "var(--body)" }}>Saml jeres hjertesager, bidrag og dokumentation ét sted. Få et tydeligt overblik, frivillige kan dele, og et grundlag, kassereren faktisk kan bruge.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {ASSOC_POINTS.map((a) => (
                <div key={a} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderRadius: 18, background: "var(--surface)", border: "1px solid var(--smh-border)" }}>
                  <Ic d={PATH.check} size={20} sw={2.4} color="var(--success)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 15.5, fontWeight: 500, color: "var(--body)" }}>{a}</span>
                </div>
              ))}
            </div>
            <a href="#priser" className="cta-w btn-brand" style={{ ...brandBtn("16px 30px") }}>Opret forening</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INDSAMLINGSNÆVNET (permit + accounting callout)
   ============================================================ */
function PermitSection() {
  const rows = [
    ["Anmeldelsesfrist", "Senest 14 dage før"],
    ["§3-gebyr (2026)", "1.300 kr."],
    ["Journalnummer", "Kan tilknyttes"],
  ];
  return (
    <section id="saadan" className="wrap sec-pad">
      <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: 28, padding: "clamp(28px,4vw,48px)", boxShadow: "0 30px 70px -36px rgba(8,14,26,.14)" }}>
        <div className="naev">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: "#FFFBEB", border: "1px solid #FDE68A", marginBottom: 18 }}>
              <Ic size={14} sw={2.2} color="#B45309" d='<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>' />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "#B45309" }}>Tilladelse og regnskab</span>
            </div>
            <h2 style={{ margin: "0 0 18px", fontSize: "clamp(25px,3.8vw,34px)", lineHeight: 1.14, fontWeight: 800, letterSpacing: "-.7px", color: "var(--ink)" }}>Har I styr på tilladelsen?</h2>
            <p style={{ margin: "0 0 14px", fontSize: "clamp(16px,2.2vw,16.5px)", lineHeight: 1.65, color: "var(--body)" }}>Mange indsamlinger skal anmeldes til Indsamlingsnævnet senest 14 dage før, de går i gang. StøtMedHjerte hjælper jer med at holde styr på journalnummer og dokumentation undervejs.</p>
            <p style={{ margin: "0 0 26px", fontSize: 14, color: "var(--smh-muted)" }}>Pris senest tjekket: juni 2026.</p>
            <a href="#priser" className="cta-w btn-ghost" style={{ ...ghostBtn("15px 26px", 52, 15.5), display: "inline-flex" }}>Læs om tilladelse og regnskab</a>
          </div>
          <div style={{ background: "var(--alt)", borderRadius: 22, padding: 28 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {rows.map(([k, v], i) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, paddingBottom: i < rows.length - 1 ? 18 : 0, borderBottom: i < rows.length - 1 ? "1px solid var(--smh-border)" : "none" }}>
                  <span style={{ fontSize: 14.5, color: "var(--body)", fontWeight: 500 }}>{k}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRICING
   ============================================================ */
function Pricing() {
  return (
    <section id="priser" style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
      <div className="sec-pad wrap">
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Eyebrow>Priser</Eyebrow>
          <h2 style={{ margin: "0 auto 16px", fontSize: "clamp(27px,4.4vw,40px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", maxWidth: 600, textWrap: "balance" }}>En fast pris. Ingen andel af donationerne.</h2>
          <p style={{ margin: "0 auto", fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.6, color: "var(--body)", maxWidth: 520 }}>Vælg den løsning, der passer til foreningen. Alle priser er inkl. moms.</p>
        </div>
        <div className="g3" style={{ alignItems: "stretch" }}>
          {PLANS.map((pl) => (
            <div key={pl.name} style={{ position: "relative", background: "var(--surface)", border: pl.featured ? "2px solid var(--brand)" : "1px solid var(--smh-border)", borderRadius: 26, padding: "34px 30px", display: "flex", flexDirection: "column", boxShadow: pl.featured ? "0 30px 60px -26px rgba(224,25,63,.3)" : "none" }}>
              {pl.featured && (
                <div style={{ position: "absolute", top: 20, right: 20, padding: "6px 14px", borderRadius: 999, background: "var(--brand)", color: "#fff", fontSize: 11.5, fontWeight: 700, letterSpacing: ".3px" }}>Mest valgt</div>
              )}
              <h3 style={{ margin: "0 0 6px", fontSize: 19, fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>{pl.name}</h3>
              <p style={{ margin: "0 0 22px", fontSize: 14.5, lineHeight: 1.5, color: "var(--smh-muted)", minHeight: 42 }}>{pl.desc}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 22 }}>
                <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)" }}>{pl.price}</span>
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--smh-muted)" }}>kr./md</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {pl.features.map((feat) => (
                  <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <Ic d={PATH.check} size={17} sw={2.6} color={pl.featured ? "var(--brand)" : "var(--success)"} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 14.5, lineHeight: 1.45, color: "var(--body)" }}>{feat}</span>
                  </div>
                ))}
              </div>
              <a href="#foreninger" style={{
                ...btnBase, textAlign: "center", fontSize: 15.5, fontWeight: 600, padding: 15, minHeight: 52, borderRadius: 999, marginTop: "auto",
                ...(pl.featured
                  ? { color: "#fff", background: "var(--brand)", boxShadow: "0 12px 26px rgba(224,25,63,.24)" }
                  : { color: "var(--ink)", background: "var(--surface)", border: "1px solid var(--smh-border)" }),
              }}>{pl.cta}</a>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", margin: "30px auto 0", fontSize: 14, color: "var(--smh-muted)" }}>Ingen binding på donationerne. StøtMedHjerte tager ikke en andel af det indsamlede.</p>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA
   ============================================================ */
function FinalCTA() {
  return (
    <section id="om" className="wrap sec-pad" style={{ textAlign: "center" }}>
      <h2 style={{ margin: "0 auto 28px", fontSize: "clamp(30px,5vw,44px)", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-1.1px", color: "var(--ink)", maxWidth: 680, textWrap: "balance" }}>Klar til en mere struktureret måde at samle penge ind på?</h2>
      <div className="cta-row" style={{ justifyContent: "center" }}>
        <a href="#foreninger" className="cta-w btn-brand" style={{ ...brandBtn("17px 34px", 56, 16.5), boxShadow: "0 14px 34px rgba(224,25,63,.24)" }}>Opret forening</a>
        <a href="#priser" className="cta-w btn-ghost" style={{ ...ghostBtn("17px 34px", 56, 16.5), display: "flex" }}>Se priser</a>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE
   Optional props:
   - showTrustBand (default true): toggle the trust band strip.
   - accentColor: override brand color (sets --brand / --brand-hover
     on the page wrapper, exactly like the prototype's tweak).
   ============================================================ */
export default function HomeNy({ showTrustBand = true, accentColor }) {
  const wrapperStyle = accentColor ? { "--brand": accentColor, "--brand-hover": accentColor } : undefined;
  return (
    <div style={wrapperStyle}>
      <SiteNav />
      <main>
        <Hero />
        {showTrustBand && <TrustBand />}
        <ProblemSection />
        <SolutionSection />
        <TwoPaths />
        <Features />
        <CleanModel />
        <SupporterSection />
        <AssociationSection />
        <PermitSection />
        <Pricing />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
