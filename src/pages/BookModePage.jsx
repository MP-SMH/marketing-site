import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";

export default function BookModePage() {
  return <><SiteNav /><main className="wrap" style={{ minHeight: "55vh", paddingTop: "clamp(56px,8vw,110px)", paddingBottom: 100 }}>
    <p style={{ color: "var(--brand-hover)", fontWeight: 700, textTransform: "uppercase" }}>For foreninger</p>
    <h1 style={{ color: "var(--ink)", fontSize: "clamp(32px,5vw,52px)", maxWidth: 700 }}>Tal med os om jeres forening</h1>
    <p style={{ color: "var(--body)", fontSize: 18, lineHeight: 1.7, maxWidth: 640 }}>Fortæl os, hvad I vil samle ind til, og hvilke spørgsmål I har. Vi vender tilbage med en konkret mulighed for at tale sammen.</p>
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 30 }}>
      <Link to="/kontakt#besked" style={{ display: "inline-flex", alignItems: "center", minHeight: 52, padding: "0 25px", borderRadius: 999, background: "var(--brand)", color: "#fff", fontWeight: 700, textDecoration: "none" }}>Skriv til os</Link>
      <a href="mailto:hej@stotmedhjerte.dk?subject=M%C3%B8de%20om%20St%C3%B8tMedHjerte" style={{ display: "inline-flex", alignItems: "center", minHeight: 52, padding: "0 25px", borderRadius: 999, border: "1px solid var(--smh-border)", color: "var(--ink)", fontWeight: 700, textDecoration: "none" }}>Send e-mail</a>
    </div>
  </main><SiteFooter /></>;
}
