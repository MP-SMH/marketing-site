import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./ForeningLogin.css";

/* Ikon-helper: stroke-SVG via raw path. aria-hidden, dekorativt. */
function Ic({ d, size = 24, sw = 2, stroke = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: d }}
    />
  );
}

export default function ForeningAuthPage() {
  return (
    <>
      <SiteNav />

      {/* ============ HERO: Log ind ============ */}
      <section style={{ background: "linear-gradient(165deg,#0A1322 0%,#080E1A 55%,#0B1424 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-12%", left: "-6%", width: "640px", height: "640px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.16),transparent 62%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-26%", right: "-4%", width: "620px", height: "620px", borderRadius: "50%", background: "radial-gradient(circle,rgba(45,140,255,.10),transparent 66%)", pointerEvents: "none" }} />

        <div className="li-wrap" style={{ position: "relative", zIndex: 2, width: "100%", paddingTop: "clamp(48px,7vw,72px)", paddingBottom: "clamp(56px,8vw,72px)" }}>
          <div className="li-hero-inner">
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginBottom: "22px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "8px 13px", borderRadius: "999px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", fontSize: "12.5px", fontWeight: 600, color: "#CDD7E6" }}>
                <Ic d='<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>' size={14} sw={2.2} stroke="#4ADE80" />
                Krypteret forbindelse
              </span>
            </div>
            <h1 style={{ margin: "0 0 36px", fontSize: "clamp(28px,3.6vw,39px)", lineHeight: 1.08, fontWeight: 800, letterSpacing: "-1.2px", color: "#fff" }}>Log ind til<br />foreningens overblik.</h1>

            <div style={{ textAlign: "left", background: "rgba(13,23,38,.66)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "22px", padding: "clamp(22px,3vw,30px)", boxShadow: "0 40px 90px -42px rgba(0,0,0,.7)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <label style={{ display: "block" }}>
                  <span style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#C7D0DE", marginBottom: "8px" }}>E-mailadresse</span>
                  <input className="li-field" type="email" placeholder="navn@forening.dk" />
                </label>
                <label style={{ display: "block" }}>
                  <span style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#C7D0DE", marginBottom: "8px" }}>Adgangskode</span>
                  <input className="li-field" type="password" placeholder="Din adgangskode" />
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                    <Link to="/kontakt" style={{ textDecoration: "none", fontSize: "12.5px", fontWeight: 600, color: "#AEB9CC" }}>Glemt adgangskode?</Link>
                  </div>
                </label>

                <button style={{ marginTop: "4px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px", padding: "16px", minHeight: "54px", border: "none", borderRadius: "999px", background: "var(--brand)", color: "#fff", fontSize: "16px", fontWeight: 600, fontFamily: "inherit", cursor: "pointer", boxShadow: "0 14px 34px rgba(224,25,63,.34)" }}>Log ind</button>
              </div>

              <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.5, color: "#AEB9CC" }}>Har I ikke en konto endnu? <a href="/opret-forening#form" style={{ textDecoration: "none", color: "#fff", fontWeight: 600, borderBottom: "1px solid rgba(224,25,63,.6)" }}>Opret forening</a></p>
              </div>
            </div>

            <p style={{ margin: "16px 0 0", fontSize: "12.5px", lineHeight: 1.55, color: "#7E8CA3" }}>Login er kun for foreninger. Støtter skal aldrig logge ind for at støtte en hjertesag. <Link to="/sikkerhed" style={{ textDecoration: "none", color: "#AEB9CC", fontWeight: 600 }}>Læs om sikkerhed</Link></p>
          </div>
        </div>
      </section>

      {/* ============ SECTION: Det finder du i overblikket ============ */}
      <section style={{ background: "var(--page)", paddingTop: "clamp(56px,8vw,96px)", paddingBottom: "clamp(56px,8vw,96px)" }}>
        <div className="li-wrap">
          <div style={{ maxWidth: "640px", marginBottom: "clamp(32px,4vw,48px)" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: ".8px", textTransform: "uppercase", color: "var(--brand)", marginBottom: "14px" }}>Bag login</div>
            <h2 style={{ margin: "0 0 14px", fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)" }}>Det finder du i foreningens overblik</h2>
            <p style={{ margin: 0, fontSize: "clamp(15.5px,1.7vw,18px)", lineHeight: 1.6, color: "var(--body)" }}>Alt om foreningens indsamling samlet ét sted. Du logger ind og ser status med det samme, uden regneark og løse mails.</p>
          </div>

          <div className="li-feat-grid">
            <Link to="/hjertesager" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "12px", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "24px" }}>
              <span style={{ width: "42px", height: "42px", borderRadius: "12px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ic d='<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>' size={21} stroke="var(--brand)" />
              </span>
              <span style={{ fontSize: "17px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.3px" }}>Hjertesager</span>
              <span style={{ fontSize: "14px", lineHeight: 1.55, color: "var(--body)" }}>Følg aktive indsamlinger, mål og fremgang i realtid.</span>
              <span style={{ marginTop: "auto", paddingTop: "6px", fontSize: "13.5px", fontWeight: 600, color: "var(--brand)" }}>Se hjertesager →</span>
            </Link>

            <Link to="/donationer" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "12px", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "24px" }}>
              <span style={{ width: "42px", height: "42px", borderRadius: "12px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ic d='<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>' size={21} stroke="var(--brand)" />
              </span>
              <span style={{ fontSize: "17px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.3px" }}>Donationer</span>
              <span style={{ fontSize: "14px", lineHeight: 1.55, color: "var(--body)" }}>Se engangsbidrag og giveroversigt løbende.</span>
              <span style={{ marginTop: "auto", paddingTop: "6px", fontSize: "13.5px", fontWeight: 600, color: "var(--brand)" }}>Om donationer →</span>
            </Link>

            <Link to="/fast-stoette" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "12px", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "24px" }}>
              <span style={{ width: "42px", height: "42px", borderRadius: "12px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ic d='<path d="M17 2.1 21 6l-4 3.9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 21.9 3 18l4-3.9"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>' size={21} stroke="var(--brand)" />
              </span>
              <span style={{ fontSize: "17px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.3px" }}>Fast støtte</span>
              <span style={{ fontSize: "14px", lineHeight: 1.55, color: "var(--body)" }}>Hold styr på månedlige støtter og fornyelser.</span>
              <span style={{ marginTop: "auto", paddingTop: "6px", fontSize: "13.5px", fontWeight: 600, color: "var(--brand)" }}>Om fast støtte →</span>
            </Link>

            <Link to="/tilladelse-og-regnskab" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "12px", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "24px" }}>
              <span style={{ width: "42px", height: "42px", borderRadius: "12px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ic d='<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M9 15l2 2 4-4"/>' size={21} stroke="var(--brand)" />
              </span>
              <span style={{ fontSize: "17px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.3px" }}>Dokumentation</span>
              <span style={{ fontSize: "14px", lineHeight: 1.55, color: "var(--body)" }}>Hent regnskabsgrundlag og tilladelser, klar til revisor.</span>
              <span style={{ marginTop: "auto", paddingTop: "6px", fontSize: "13.5px", fontWeight: 600, color: "var(--brand)" }}>Tilladelse og regnskab →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SECTION: Sikker adgang ============ */}
      <section style={{ background: "var(--alt)", paddingTop: "clamp(56px,8vw,96px)", paddingBottom: "clamp(56px,8vw,96px)" }}>
        <div className="li-wrap li-sec-grid">
          <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", background: "linear-gradient(165deg,#0B1424 0%,#080E1A 100%)", borderRadius: "22px", padding: "clamp(24px,3.6vw,34px)", boxShadow: "0 40px 90px -44px rgba(8,14,26,.6)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ position: "absolute", top: "-30%", right: "-20%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.18),transparent 65%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "12px", marginBottom: "auto" }}>
              <span style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(224,25,63,.16)", border: "1px solid rgba(224,25,63,.34)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Ic d='<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>' size={24} stroke="#fff" />
              </span>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "#7E8CA3" }}>Beskyttet</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff", letterSpacing: "-.3px" }}>Foreningskonto</div>
              </div>
            </div>
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "10px", marginTop: "24px" }}>
              {["CVR-valideret forening", "Roller: administrator, kasserer, bestyrelse", "Krypteret forbindelse"].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 13px", borderRadius: "12px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)" }}>
                  <Ic d='<path d="M20 6 9 17l-5-5"/>' size={16} sw={2.6} stroke="#4ADE80" />
                  <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#E8EDF5" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: ".8px", textTransform: "uppercase", color: "var(--brand)", marginBottom: "14px" }}>Sikkerhed</div>
            <h2 style={{ margin: "0 0 16px", fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)" }}>Sikker adgang til foreningens konto</h2>
            <p style={{ margin: "0 0 26px", fontSize: "clamp(15.5px,1.7vw,18px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "520px" }}>Kontoen er knyttet til foreningens CVR. Kun betroede roller får adgang, og forbindelsen er altid krypteret.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "30px" }}>
              <div style={{ display: "flex", gap: "14px" }}>
                <span style={{ width: "38px", height: "38px", borderRadius: "11px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ic d='<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' size={18} stroke="var(--ink)" />
                </span>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--ink)", marginBottom: "4px", letterSpacing: "-.2px" }}>Adgangsstyring</div>
                  <p style={{ margin: 0, fontSize: "14.5px", lineHeight: 1.55, color: "var(--body)" }}>Tildel roller til bestyrelse og kasserer, og fjern adgang igen, når nogen stopper.</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "14px" }}>
                <span style={{ width: "38px", height: "38px", borderRadius: "11px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ic d='<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>' size={18} stroke="var(--ink)" />
                </span>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--ink)", marginBottom: "4px", letterSpacing: "-.2px" }}>Beskyttet konto</div>
                  <p style={{ margin: 0, fontSize: "14.5px", lineHeight: 1.55, color: "var(--body)" }}>Foreningens data ligger sikkert og adskilt fra støtternes betalinger.</p>
                </div>
              </div>
            </div>

            <Link to="/sikkerhed" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--ink)", fontSize: "15px", fontWeight: 600, padding: "13px 22px", borderRadius: "999px", border: "1px solid var(--smh-border)", background: "var(--surface)" }}>Læs mere om sikkerhed <span style={{ color: "var(--brand)" }}>→</span></Link>
          </div>
        </div>
      </section>

      {/* ============ SECTION: Kun foreninger logger ind ============ */}
      <section style={{ background: "var(--page)", paddingTop: "clamp(56px,8vw,96px)", paddingBottom: "clamp(56px,8vw,96px)" }}>
        <div className="li-wrap">
          <div style={{ maxWidth: "640px", marginBottom: "clamp(32px,4vw,44px)" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: ".8px", textTransform: "uppercase", color: "var(--brand)", marginBottom: "14px" }}>To roller</div>
            <h2 style={{ margin: "0 0 14px", fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)" }}>Kun foreninger logger ind</h2>
            <p style={{ margin: 0, fontSize: "clamp(15.5px,1.7vw,18px)", lineHeight: 1.6, color: "var(--body)" }}>Støtter skal aldrig oprette en profil. Login er forbeholdt foreninger, der administrerer indsamlinger.</p>
          </div>

          <div className="li-compare-grid">
            <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "20px", padding: "clamp(24px,3vw,32px)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 12px", borderRadius: "999px", background: "var(--alt)", marginBottom: "18px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--label)" }} />
                <span style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: ".3px", color: "var(--body)" }}>Som støtter</span>
              </div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--ink)", letterSpacing: "-.4px", marginBottom: "10px" }}>Ingen login</div>
              <p style={{ margin: "0 0 22px", fontSize: "15px", lineHeight: 1.6, color: "var(--body)" }}>Find en hjertesag, vælg beløb og godkend betalingen i MobilePay. Helt uden profil eller adgangskode.</p>
              <Link to="/hjertesager" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--ink)", fontSize: "14.5px", fontWeight: 600, padding: "12px 20px", borderRadius: "999px", border: "1px solid var(--smh-border)", background: "var(--page)" }}>Find hjertesag <span style={{ color: "var(--brand)" }}>→</span></Link>
            </div>

            <div style={{ background: "var(--navy2)", border: "1px solid var(--navy3)", borderRadius: "20px", padding: "clamp(24px,3vw,32px)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 12px", borderRadius: "999px", background: "rgba(224,25,63,.16)", marginBottom: "18px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--brand)" }} />
                <span style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: ".3px", color: "#FDA4B4" }}>Som forening</span>
              </div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#fff", letterSpacing: "-.4px", marginBottom: "10px" }}>Log ind</div>
              <p style={{ margin: "0 0 22px", fontSize: "15px", lineHeight: 1.6, color: "#AEB9CC" }}>Administrer hjertesager, se bidrag og fast støtte, og hent regnskab fra ét samlet overblik.</p>
              <a href="/opret-forening#form" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", color: "#fff", fontSize: "14.5px", fontWeight: 600, padding: "12px 22px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 10px 26px rgba(224,25,63,.3)" }}>Opret forening</a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION: Hjaelp til login ============ */}
      <section style={{ background: "var(--alt)", paddingTop: "clamp(56px,8vw,96px)", paddingBottom: "clamp(56px,8vw,96px)" }}>
        <div className="li-wrap">
          <div style={{ maxWidth: "640px", marginBottom: "clamp(32px,4vw,44px)" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: ".8px", textTransform: "uppercase", color: "var(--brand)", marginBottom: "14px" }}>Hjælp</div>
            <h2 style={{ margin: "0 0 14px", fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)" }}>Problemer med at logge ind?</h2>
            <p style={{ margin: 0, fontSize: "clamp(15.5px,1.7vw,18px)", lineHeight: 1.6, color: "var(--body)" }}>Vi hjælper jer hurtigt i gang igen.</p>
          </div>

          <div className="li-help-grid">
            <Link to="/kontakt" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "12px", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "24px" }}>
              <span style={{ width: "42px", height: "42px", borderRadius: "12px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ic d='<path d="m15 7 5 5-5 5"/><path d="M20 12H9"/><path d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3"/>' size={21} stroke="var(--brand)" />
              </span>
              <span style={{ fontSize: "17px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.3px" }}>Glemt adgangskode</span>
              <span style={{ fontSize: "14px", lineHeight: 1.55, color: "var(--body)" }}>Nulstil med et link til foreningens e-mail.</span>
              <span style={{ marginTop: "auto", paddingTop: "6px", fontSize: "13.5px", fontWeight: 600, color: "var(--brand)" }}>Nulstil adgang →</span>
            </Link>

            <Link to="/kontakt" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "12px", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "24px" }}>
              <span style={{ width: "42px", height: "42px", borderRadius: "12px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ic d='<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>' size={21} stroke="var(--brand)" />
              </span>
              <span style={{ fontSize: "17px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.3px" }}>Kontakt support</span>
              <span style={{ fontSize: "14px", lineHeight: 1.55, color: "var(--body)" }}>Skriv eller ring, så hjælper vi jer med adgang.</span>
              <span style={{ marginTop: "auto", paddingTop: "6px", fontSize: "13.5px", fontWeight: 600, color: "var(--brand)" }}>Kontakt os →</span>
            </Link>

            <a href="/opret-forening#form" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "12px", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "24px" }}>
              <span style={{ width: "42px", height: "42px", borderRadius: "12px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ic d='<path d="M12 5v14M5 12h14"/>' size={21} stroke="var(--brand)" />
              </span>
              <span style={{ fontSize: "17px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.3px" }}>Opret forening</span>
              <span style={{ fontSize: "14px", lineHeight: 1.55, color: "var(--body)" }}>Har I ikke en konto endnu? Kom i gang på få minutter.</span>
              <span style={{ marginTop: "auto", paddingTop: "6px", fontSize: "13.5px", fontWeight: 600, color: "var(--brand)" }}>Opret forening →</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section style={{ background: "var(--navy2)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-120px", left: "50%", transform: "translateX(-50%)", width: "560px", height: "560px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.16),transparent 64%)", pointerEvents: "none" }} />
        <div className="li-wrap" style={{ position: "relative", textAlign: "center", paddingTop: "clamp(64px,9vw,104px)", paddingBottom: "clamp(64px,9vw,104px)" }}>
          <h2 style={{ margin: "0 auto 18px", fontSize: "clamp(28px,4.4vw,44px)", lineHeight: 1.08, fontWeight: 800, letterSpacing: "-1.2px", color: "#fff", maxWidth: "680px" }}>Klar til at administrere jeres indsamling?</h2>
          <p style={{ margin: "0 auto 34px", fontSize: "clamp(16px,2vw,18.5px)", lineHeight: 1.6, color: "#AEB9CC", maxWidth: "540px" }}>Opret foreningen og få adgang til overblikket. Det tager få minutter.</p>
          <div className="li-cta-row">
            <a href="/opret-forening#form" className="li-cta-w" style={{ textDecoration: "none", textAlign: "center", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "16px 32px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 34px rgba(224,25,63,.32)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</a>
            <Link to="/kontakt" className="li-cta-w" style={{ textDecoration: "none", textAlign: "center", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "16px 32px", minHeight: "54px", borderRadius: "999px", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.16)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Kontakt support</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
