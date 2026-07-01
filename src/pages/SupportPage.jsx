import React from "react";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./Support.css";

function Ic({ d, size = 24, sw = 1.9, stroke = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={style} dangerouslySetInnerHTML={{ __html: d }} />
  );
}

const CATEGORIES = [
  { title: "For støtter", d: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>' },
  { title: "For foreninger", d: '<path d="M3 21h18"/><path d="M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/>' },
  { title: "Betaling via MobilePay", d: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>' },
  { title: "Hjertesager", d: '<path d="M12 21s-7.5-4.7-10-9.3C.4 8.3 2 4.5 5.6 4.5c2 0 3.4 1.1 4.4 2.6C11 5.6 12.4 4.5 14.4 4.5 18 4.5 19.6 8.3 18 11.7 15.5 16.3 12 21 12 21z"/>' },
  { title: "Fast støtte", d: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>' },
  { title: "Tilladelse og journalnummer", d: '<path d="M9 12l2 2 4-4"/><path d="M21 12c0 5-3.5 7.5-8.6 9a1 1 0 0 1-.8 0C6.5 19.5 3 17 3 12V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.4 1.4 0 0 1 1.6 0C13.5 3.8 16 5 18 5a1 1 0 0 1 1 1z"/>' },
  { title: "Dokumentation", d: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>' },
  { title: "Konto og adgang for foreninger", d: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>' },
  { title: "Priser", kr: true },
  { title: "Tekniske spørgsmål", d: '<path d="M12 20h.01"/><path d="M9 9a3 3 0 1 1 4.5 2.6c-.9.5-1.5 1.2-1.5 2.4"/>' },
];

export default function SupportPage() {
  return (
    <>
      <SiteNav />
      <main className="sup-page">

        {/* ============ HERO + SOEGNING ============ */}
        <section style={{ background: "var(--alt)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="sup-wrap" style={{ paddingTop: "64px", paddingBottom: "56px", textAlign: "center" }}>
            <div style={{ animation: "supRise .6s ease both", maxWidth: "680px", margin: "0 auto" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--label)", marginBottom: "16px" }}>Support</div>
              <h1 style={{ margin: "0 0 16px", fontSize: "clamp(30px,5vw,50px)", lineHeight: 1.08, fontWeight: 800, letterSpacing: "-1.2px", color: "var(--ink)", textWrap: "balance" }}>Find hjælp til StøtMedHjerte.</h1>
              <p style={{ margin: "0 auto 32px", fontSize: "clamp(16px,2.4vw,18.5px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "540px" }}>Supporten er opdelt, så støtter og foreninger hurtigt kan finde svar på de mest almindelige spørgsmål.</p>
              <div style={{ position: "relative", maxWidth: "560px", margin: "0 auto" }}>
                <Ic d='<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>' size={20} sw={2} stroke="var(--smh-muted)" style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)" }} />
                <input className="sup-field" type="text" placeholder="Søg i hjælp" aria-label="Søg i hjælp" />
              </div>
            </div>
          </div>
        </section>

        {/* ============ KATEGORI-GRID ============ */}
        <section className="sup-wrap sup-sec-pad">
          <div className="sup-cat-grid">
            {CATEGORIES.map((c) => (
              <a key={c.title} href="#kontakt" className="sup-cat-card" style={{ textDecoration: "none", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "22px", padding: "26px 24px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 14px 40px -30px rgba(8,14,26,.12)" }}>
                <span style={{ flexShrink: 0, width: "50px", height: "50px", borderRadius: "15px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand)" }}>
                  {c.kr ? <span style={{ fontSize: "15.5px", fontWeight: 700, letterSpacing: "-.5px" }}>kr</span> : <Ic d={c.d} size={24} />}
                </span>
                <span style={{ flex: 1, fontSize: "16.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)", lineHeight: 1.25 }}>{c.title}</span>
                <Ic d='<path d="m9 18 6-6-6-6"/>' size={18} sw={2.2} stroke="var(--label)" style={{ flexShrink: 0 }} />
              </a>
            ))}
          </div>
        </section>

        {/* ============ KONTAKT (navy) ============ */}
        <section id="kontakt" style={{ background: "var(--navy1)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-120px", right: "-80px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.15),transparent 65%)" }} />
          <div className="sup-wrap" style={{ position: "relative", paddingTop: "clamp(64px,9vw,100px)", paddingBottom: "clamp(64px,9vw,100px)", textAlign: "center" }}>
            <h2 style={{ margin: "0 auto 16px", fontSize: "clamp(28px,4.6vw,42px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-1px", color: "#fff", maxWidth: "560px", textWrap: "balance" }}>Har du brug for hjælp?</h2>
            <p style={{ margin: "0 auto 32px", fontSize: "clamp(16px,2.4vw,18px)", lineHeight: 1.6, color: "#AEB9CC", maxWidth: "480px" }}>Skriv til os, så vender vi tilbage hurtigst muligt.</p>
            <a href="mailto:hej@stotmedhjerte.dk" className="sup-cta sup-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16.5px", fontWeight: 600, padding: "17px 34px", minHeight: "56px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 34px rgba(224,25,63,.28)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Kontakt support</a>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
