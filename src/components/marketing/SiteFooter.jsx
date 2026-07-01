// ============================================================
//  StøtMedHjerte — SiteFooter (delt footer-komponent)
//  1:1 port af Claude Design forsidens Footer. Samme markup,
//  klassenavne, kolonner, CTA'er, kontakt-/legal-række, Wordmark
//  og ruter. Eneste tekniske ændring: interne ruter <a href> ->
//  react-router <Link to>. Eksterne (mailto:, tel:) forbliver <a>.
// ============================================================

import { Link } from "react-router-dom";
import "./SiteFooter.css";

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

const FOOTER_COLS = [
  { head: "Platform", links: [
    { t: "For foreninger", href: ROUTES.forForeninger },
    { t: "For støtter", href: ROUTES.forStoetter },
    { t: "Hjertesager", href: ROUTES.hjertesager },
    { t: "Donationer", href: ROUTES.donationer },
    { t: "Fast støtte", href: ROUTES.fastStoette },
  ]},
  { head: "Viden", links: [
    { t: "Tilladelse og regnskab", href: ROUTES.tilladelse },
    { t: "Sikkerhed", href: ROUTES.sikkerhed },
    { t: "Sådan virker det", href: ROUTES.saadanVirkerDet },
    { t: "FAQ", href: ROUTES.faq },
    { t: "Support", href: ROUTES.support },
  ]},
  { head: "Virksomhed", links: [
    { t: "Om os", href: ROUTES.omOs },
    { t: "Kontakt", href: ROUTES.kontakt },
    { t: "Priser", href: ROUTES.priser },
    { t: "Log ind", href: ROUTES.logInd },
  ]},
];

/* ============================================================
   WORDMARK
   ============================================================ */
function Wordmark({ color = "var(--ink)", tm = "var(--smh-muted)", size = 19 }) {
  return (
    <span style={{ fontWeight: 550, fontSize: size, letterSpacing: "-.4px", color }}>
      StøtMedHjerte
      <span style={{ fontSize: 10, verticalAlign: "super", color: tm, fontWeight: 500, marginLeft: 1 }}>™</span>
    </span>
  );
}

/* ============================================================
   SITE FOOTER
   ============================================================ */
export default function SiteFooter() {
  const legal = ["Privatlivspolitik", "Cookiepolitik", "Vilkår", "Databehandleraftale", "Tilgængelighed"];
  return (
    <footer style={{ background: "var(--navy1)", color: "#fff", borderTop: "1px solid rgba(255,255,255,.06)" }}>
      <div className="wrap" style={{ paddingTop: 64 }}>
        <div className="foot" style={{ paddingBottom: 44, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <div>
            <div style={{ marginBottom: 16 }}><Wordmark color="#fff" tm="#9AA8BE" /></div>
            <p style={{ margin: "0 0 24px", fontSize: 14.5, lineHeight: 1.65, color: "#9AA8BE", maxWidth: 320 }}>StøtMedHjerte er en dansk platform til foreningers pengeindsamling. Hjertesager, donationer, fast støtte og regnskabsgrundlag samlet ét sted.</p>
            <div className="cta-row">
              <Link to={ROUTES.hjertesager} className="cta-w btn-white" style={{ textDecoration: "none", textAlign: "center", color: "var(--ink)", fontSize: 14.5, fontWeight: 600, padding: "13px 22px", minHeight: 48, borderRadius: 999, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Find hjertesag</Link>
              <Link to={ROUTES.opretForening + "#form"} className="cta-w btn-brand" style={{ textDecoration: "none", textAlign: "center", color: "#fff", fontSize: 14.5, fontWeight: 600, padding: "13px 22px", minHeight: 48, borderRadius: 999, background: "var(--brand)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
            </div>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.head}>
              <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "#6B7A92", marginBottom: 18 }}>{col.head}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((l) => (
                  <Link key={l.t} to={l.href} className="foot-link" style={{ textDecoration: "none", color: "#AEB9CC", fontSize: 14.5, fontWeight: 500 }}>{l.t}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ margin: "26px 0", padding: 18, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14 }}>
          <div style={{ fontSize: 14.5, fontWeight: 600, color: "#E8EDF5", marginBottom: 14 }}>Heartland Collective ApS</div>
          <div className="foot-facts" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "11px 28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13.5 }}><span style={{ color: "#6B7A92" }}>CVR</span><span style={{ color: "#AEB9CC" }}>36909722</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13.5 }}><span style={{ color: "#6B7A92" }}>Adresse</span><span style={{ color: "#AEB9CC" }}>Hillerød, Danmark</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13.5 }}><span style={{ color: "#6B7A92" }}>Email</span><a href="mailto:hej@stotmedhjerte.dk" className="foot-link" style={{ textDecoration: "none", color: "#AEB9CC" }}>hej@stotmedhjerte.dk</a></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13.5 }}><span style={{ color: "#6B7A92" }}>Telefon</span><a href="tel:+4571961212" className="foot-link" style={{ textDecoration: "none", color: "#AEB9CC" }}>71 96 12 12</a></div>
          </div>
        </div>
        <div className="foot-legal" style={{ padding: "24px 0 32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <span style={{ fontSize: 13.5, color: "#6B7A92" }}>© 2026 StøtMedHjerte. Alle rettigheder forbeholdes.</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
            {legal.map((t) => (
              <Link key={t} to={ROUTES.kontakt} className="legal-link" style={{ textDecoration: "none", color: "#6B7A92", fontSize: 13.5 }}>{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
