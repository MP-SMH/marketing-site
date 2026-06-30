import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./ForForeninger.css";

function Ic({ d, size = 24, sw = 1.9, stroke = "currentColor", fill = "none" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={fill === "none" ? stroke : "none"} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: d }} />
  );
}

const USES = [
  { title: "Hjertesager", body: "Opret konkrete indsamlinger til udstyr, ture og aktiviteter, med mål og en delbar side.", d: '<path d="M12 20.3l-1.45-1.32C5.4 14.24 2 11.16 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.66-3.4 6.74-8.55 11.49L12 20.3z"/>' },
  { title: "Donationer", body: "Modtag engangsbidrag via MobilePay direkte på foreningens egen konto.", d: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>' },
  { title: "Fast støtte", body: "Tilbyd månedlig støtte via MobilePay, så foreningen får et mere forudsigeligt grundlag.", d: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>' },
  { title: "Journalnummer", body: "Knyt en hjertesag til foreningens tilladelse fra Indsamlingsnævnet.", d: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.4"/>' },
  { title: "Dokumentation", body: "Saml de oplysninger, foreningen skal bruge, løbende ét sted.", d: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>' },
  { title: "Regnskabsgrundlag", body: "Få et struktureret grundlag, bestyrelse og revisor kan bruge.", d: '<path d="M3 3v18h18"/><path d="m7 14 3-3 3 3 5-6"/>' },
];

const ORG_TYPES = ["Idrætsforeninger", "Spejdergrupper", "Kulturforeninger", "Patientforeninger", "Støtteforeninger", "Skole- og institutionsforeninger", "Sociale foreninger", "Lokale fællesskaber", "Klubber og frivillige organisationer"];

export default function ForForeningerPage() {
  return (
    <>
      <SiteNav />
      <main className="ff-page">

        {/* ============ HERO ============ */}
        <section className="ff-wrap" style={{ paddingTop: "48px", paddingBottom: "56px" }}>
          <div className="ff-hero-grid">
            <div style={{ animation: "ffRise .6s ease both" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 15px", borderRadius: "999px", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", marginBottom: "22px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)" }} />
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--brand-hover)", letterSpacing: "-.1px" }}>For danske foreninger</span>
              </div>
              <h1 style={{ margin: "0 0 20px", fontSize: "clamp(32px,5.4vw,54px)", lineHeight: 1.06, fontWeight: 800, letterSpacing: "-1.2px", color: "var(--ink)", textWrap: "balance" }}>Få mere overblik over jeres pengeindsamling.</h1>
              <p style={{ margin: "0 0 30px", fontSize: "clamp(16px,2.4vw,18.5px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "540px" }}>StøtMedHjerte er udviklet til foreninger, der vil samle hjertesager, donationer, fast støtte og regnskabsgrundlag i én struktureret platform.</p>
              <div className="ff-cta-row" style={{ marginBottom: "24px" }}>
                <Link to="/opret-forening" className="ff-cta-w ff-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "16px 30px", minHeight: "54px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 12px 30px rgba(224,25,63,.22)" }}>Opret forening</Link>
                <Link to="/priser" className="ff-cta-w ff-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16px", fontWeight: 600, padding: "16px 30px", minHeight: "54px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)" }}>Se priser</Link>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--smh-muted)", fontSize: "14.5px", fontWeight: 500 }}>
                <Ic d='<path d="M20 6 9 17l-5-5"/>' size={18} sw={2.2} stroke="var(--success)" />
                Bidrag går direkte til jeres egen MobilePay-konto.
              </div>
            </div>

            <div style={{ animation: "ffRise .7s .1s ease both" }}>
              <div className="ff-hero-stage">
                <div className="ff-hero-glow" />
                <figure style={{ position: "relative", zIndex: 1, margin: 0, borderRadius: "24px", overflow: "hidden", border: "1px solid var(--smh-border)", aspectRatio: "3/2", boxShadow: "0 34px 80px -36px rgba(8,14,26,.22)" }}>
                  <img src="/images/for-foreninger-kasserer-dashboard.jpg" alt="Foreningsadministrator får overblik over hjertesager og bidrag på sin laptop" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </figure>
                <div className="ff-hero-mini">
                  <div style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--label)", textTransform: "uppercase", letterSpacing: ".4px", marginBottom: "2px" }}>Foreningsoverblik</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderTop: "1px solid var(--smh-border)" }}>
                    <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "var(--brand-surface)", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic d='<path d="M19 14c1.5-1.5 2-3.5 2-5a4 4 0 0 0-7-2.6A4 4 0 0 0 7 9c0 1.5.5 3.5 2 5l5 5z"/>' size={15} sw={2} /></span>
                    <span style={{ flex: 1, fontSize: "12.5px", fontWeight: 600, color: "var(--ink)" }}>Hjertesager</span>
                    <span style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--smh-muted)", display: "inline-flex", alignItems: "center", gap: "4px" }}>3 aktive</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderTop: "1px solid var(--smh-border)" }}>
                    <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "var(--brand-surface)", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic d='<path d="M9 12l2 2 4-4"/><path d="M21 12c0 5-3.5 7.5-8.6 9a1 1 0 0 1-.8 0C6.5 19.5 3 17 3 12V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.4 1.4 0 0 1 1.6 0C13.5 3.8 16 5 18 5a1 1 0 0 1 1 1z"/>' size={15} sw={2} /></span>
                    <span style={{ flex: 1, fontSize: "12.5px", fontWeight: 600, color: "var(--ink)" }}>Journalnummer</span>
                    <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#15803D", display: "inline-flex", alignItems: "center", gap: "4px" }}><Ic d='<path d="M20 6 9 17l-5-5"/>' size={12} sw={3} stroke="#22C55E" />Registreret</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderTop: "1px solid var(--smh-border)" }}>
                    <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "var(--brand-surface)", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic d='<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>' size={15} sw={2} /></span>
                    <span style={{ flex: 1, fontSize: "12.5px", fontWeight: 600, color: "var(--ink)" }}>Regnskabsgrundlag</span>
                    <span style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--smh-muted)", display: "inline-flex", alignItems: "center", gap: "4px" }}>Klar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FORENINGENS OVERBLIK (dashboard) ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="ff-sec-pad ff-wrap">
            <div style={{ maxWidth: "760px", margin: "0 auto 44px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--brand)", marginBottom: "14px" }}>Foreningens overblik</div>
              <h2 style={{ margin: "0 0 18px", fontSize: "clamp(26px,4.2vw,38px)", lineHeight: 1.14, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>Mindre manuelt arbejde. Mere tid til foreningen.</h2>
              <p style={{ margin: 0, fontSize: "clamp(16px,2.2vw,17.5px)", lineHeight: 1.65, color: "var(--body)" }}>I de fleste foreninger ender pengeindsamlingen hos kassereren og en håndfuld frivillige. StøtMedHjerte samler hjertesager, bidrag, fast støtte og dokumentation ét sted, så I får ro og overblik uden at hoppe mellem fem værktøjer.</p>
            </div>

            <div style={{ maxWidth: "1060px", margin: "0 auto", borderRadius: "20px", overflow: "hidden", border: "1px solid var(--smh-border)", boxShadow: "0 50px 110px -50px rgba(8,14,26,.34)", background: "var(--surface)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "13px 18px", borderBottom: "1px solid var(--smh-border)", background: "var(--page)" }}>
                <div style={{ display: "flex", gap: "7px" }}><span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#E5E7EB" }} /><span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#E5E7EB" }} /><span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#E5E7EB" }} /></div>
                <div style={{ flex: 1, maxWidth: "340px", margin: "0 auto", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "999px", padding: "6px 14px", fontSize: "12px", color: "var(--smh-muted)", textAlign: "center" }}>app.stotmedhjerte.dk/dashboard</div>
              </div>
              <div className="ff-dashb">
                <aside className="ff-dash-side" style={{ background: "var(--page)", borderRight: "1px solid var(--smh-border)", padding: "20px 14px", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "0 8px 18px" }}>
                    <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="M12 20.3l-1.45-1.32C5.4 14.24 2 11.16 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.66-3.4 6.74-8.55 11.49L12 20.3z"/>' size={17} fill="#fff" /></span>
                    <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-.3px", color: "var(--ink)" }}>StøtMedHjerte</span>
                  </div>
                  <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 12px", borderRadius: "11px", fontSize: "13.5px", fontWeight: 600, background: "var(--brand-surface)", color: "var(--brand)" }}><Ic d='<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>' size={17} sw={2} />Oversigt</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 12px", borderRadius: "11px", fontSize: "13.5px", fontWeight: 600, color: "var(--smh-muted)" }}><Ic d='<path d="M19 14c1.5-1.5 2-3.5 2-5a4 4 0 0 0-7-2.6A4 4 0 0 0 7 9c0 1.5.5 3.5 2 5l5 5z"/>' size={17} sw={2} />Hjertesager</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 12px", borderRadius: "11px", fontSize: "13.5px", fontWeight: 600, color: "var(--smh-muted)" }}><Ic d='<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>' size={17} sw={2} />Fast støtte</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 12px", borderRadius: "11px", fontSize: "13.5px", fontWeight: 600, color: "var(--smh-muted)" }}><Ic d='<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.5a3.5 3.5 0 0 1 0 6.5"/>' size={17} sw={2} />Støtter</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 12px", borderRadius: "11px", fontSize: "13.5px", fontWeight: 600, color: "var(--smh-muted)" }}><Ic d='<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>' size={17} sw={2} />Regnskab</span>
                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "10px", padding: "14px 8px 0", borderTop: "1px solid var(--smh-border)" }}>
                    <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--brand-surface)", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 }}>HS</span>
                    <div><div style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--ink)" }}>Hillerød SK</div><div style={{ fontSize: "11px", color: "var(--smh-muted)" }}>Administrator</div></div>
                  </div>
                </aside>
                <div style={{ padding: "clamp(16px,2.4vw,24px)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "14px", marginBottom: "20px" }}>
                    <div><div style={{ fontSize: "clamp(17px,2.4vw,21px)", fontWeight: 800, letterSpacing: "-.5px", color: "var(--ink)" }}>Velkommen tilbage, Hillerød SK</div><div style={{ fontSize: "13px", color: "var(--smh-muted)", marginTop: "3px" }}>Jeres støttearbejde samlet ét sted</div></div>
                    <div style={{ flexShrink: 0, border: "1px solid var(--smh-border)", borderRadius: "12px", padding: "8px 13px", textAlign: "right", background: "var(--surface)" }}><div style={{ fontSize: "9.5px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--label)" }}>Seneste rapport</div><div style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>Marts 2026</div></div>
                  </div>
                  <div className="ff-dash-stats" style={{ marginBottom: "16px" }}>
                    {[
                      { d: '<text x="12" y="12" text-anchor="middle" dominant-baseline="central" fill="currentColor" stroke="none" font-family="Inter, system-ui, sans-serif" font-size="15.5" font-weight="700" letter-spacing="-.5">kr</text>', val: "8.450", unit: "kr.", label: "Donationer" },
                      { d: '<path d="M3 3v18h18"/><path d="m7 14 3-4 3 2 4-6"/>', val: "127.450", unit: "kr.", label: "Total indsamlet" },
                      { d: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.5a3.5 3.5 0 0 1 0 6.5"/>', val: "84", unit: "", label: "Aktive støtter" },
                      { d: '<path d="M19 14c1.5-1.5 2-3.5 2-5a4 4 0 0 0-7-2.6A4 4 0 0 0 7 9c0 1.5.5 3.5 2 5l5 5z"/>', val: "12.300", unit: "kr.", label: "Denne måned" },
                    ].map((s) => (
                      <div key={s.label} style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "14px", padding: "16px" }}>
                        <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "var(--brand-surface)", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}><Ic d={s.d} size={16} sw={2} /></span>
                        <div style={{ fontSize: "21px", fontWeight: 800, letterSpacing: "-.6px", color: "var(--ink)", lineHeight: 1 }}>{s.val}{s.unit && <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--smh-muted)", marginLeft: "3px" }}>{s.unit}</span>}</div>
                        <div style={{ fontSize: "12px", color: "var(--smh-muted)", marginTop: "5px" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "14px", padding: "18px", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}><span style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}>Indsamling over tid</span><span style={{ display: "flex", gap: "14px", fontSize: "11.5px", fontWeight: 600 }}><span style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "var(--smh-muted)" }}><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--brand)" }} />Donationer</span><span style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "var(--smh-muted)" }}><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#7C3AED" }} />Fast støtte</span></span></div>
                    <svg viewBox="0 0 760 180" preserveAspectRatio="none" style={{ width: "100%", height: "clamp(120px,18vw,170px)", display: "block" }}>
                      <defs><linearGradient id="ffGd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(224,25,63,.16)" /><stop offset="1" stopColor="rgba(224,25,63,0)" /></linearGradient></defs>
                      <path d="M0,120 C120,116 180,108 300,102 C420,96 480,78 600,66 C680,58 730,50 760,44 L760,180 L0,180 Z" fill="url(#ffGd)" />
                      <path d="M0,120 C120,116 180,108 300,102 C420,96 480,78 600,66 C680,58 730,50 760,44" fill="none" stroke="var(--brand)" strokeWidth="3" strokeLinecap="round" />
                      <path d="M0,150 C120,148 180,143 300,138 C420,133 480,126 600,120 C680,116 730,112 760,108" fill="none" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--label)", marginTop: "8px" }}><span>Mar 25</span><span>Aug 25</span><span>Jan 26</span><span>Maj 26</span></div>
                  </div>
                  <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "14px", padding: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}><span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--success)" }} />Seneste bidrag</span><span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--brand)" }}>Se alle</span></div>
                    {[
                      { i: "SK", n: "Sofie K.", t: "Direkte donation", a: "150,00 kr." },
                      { i: "JM", n: "Jonas M.", t: "Direkte donation", a: "350,00 kr." },
                    ].map((b) => (
                      <div key={b.i} style={{ display: "flex", alignItems: "center", gap: "13px", padding: "13px 0", borderTop: "1px solid var(--smh-border)" }}>
                        <span style={{ width: "38px", height: "38px", borderRadius: "11px", background: "var(--alt)", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12.5px", fontWeight: 700, flexShrink: 0 }}>{b.i}</span>
                        <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}>{b.n}</div><div style={{ fontSize: "12px", color: "var(--smh-muted)" }}>{b.t}</div></div>
                        <div style={{ textAlign: "right" }}><div style={{ fontSize: "14px", fontWeight: 800, color: "var(--ink)" }}>{b.a}</div><div style={{ fontSize: "11px", color: "#15803D", display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--success)" }} />nu</div></div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "9px", marginTop: "16px", padding: "13px 16px", borderRadius: "12px", background: "#ECFDF3", border: "1px solid #BBF7D0" }}>
                    <Ic d='<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>' size={17} sw={2.2} stroke="#15803D" />
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#166534" }}>Verificeret, bidrag går direkte til jeres konto</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ DET KAN I BRUGE PLATFORMEN TIL ============ */}
        <section className="ff-wrap ff-sec-pad">
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--label)", marginBottom: "14px" }}>Funktioner</div>
            <h2 style={{ margin: "0 auto", fontSize: "clamp(27px,4.4vw,40px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", maxWidth: "600px", textWrap: "balance" }}>Det kan I bruge platformen til.</h2>
          </div>
          <div className="ff-g3">
            {USES.map((u) => (
              <div key={u.title} className="ff-use-card" style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "26px", padding: "30px 28px" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px", color: "var(--brand)" }}><Ic d={u.d} size={24} sw={2} /></div>
                <h3 style={{ margin: "0 0 9px", fontSize: "18.5px", fontWeight: 700, letterSpacing: "-.4px", color: "var(--ink)" }}>{u.title}</h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.6, color: "var(--body)" }}>{u.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ REN MODEL (NAVY) ============ */}
        <section style={{ background: "var(--navy1)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-120px", right: "-80px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.16),transparent 65%)" }} />
          <div className="ff-sec-pad" style={{ maxWidth: "1080px", margin: "0 auto", paddingLeft: "20px", paddingRight: "20px", position: "relative" }}>
            <div className="ff-split">
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#8FA0BC", marginBottom: "14px" }}>Modellen</div>
                <h2 style={{ margin: "0 0 22px", fontSize: "clamp(26px,4.2vw,38px)", lineHeight: 1.14, fontWeight: 800, letterSpacing: "-.9px", color: "#fff", textWrap: "balance" }}>Bidrag går direkte til jer.</h2>
                <p style={{ margin: "0 0 26px", fontSize: "clamp(16px,2.2vw,17px)", lineHeight: 1.65, color: "#AEB9CC" }}>StøtMedHjerte håndterer ikke donorbetalinger. Bidrag går direkte til foreningens egen MobilePay-konto. Foreningen betaler et fast månedligt abonnement, og vi tager ikke en andel af det indsamlede.</p>
                <Link to="/priser" className="ff-cta-w ff-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "16px 30px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 12px 30px rgba(224,25,63,.24)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Se priser</Link>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { title: "Direkte til foreningen", body: "Bidrag lander på jeres egen MobilePay-konto.", d: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>' },
                  { title: "Vi rører ikke pengene", body: "StøtMedHjerte håndterer ikke donorbetalinger.", d: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6 18.4 18.4"/>' },
                  { title: "Fast abonnement", body: "I betaler en fast pris, vi tager ikke en andel.", d: '<text x="12" y="12" text-anchor="middle" dominant-baseline="central" fill="currentColor" stroke="none" font-family="Inter, system-ui, sans-serif" font-size="15.5" font-weight="700" letter-spacing="-.5">kr</text>' },
                ].map((m) => (
                  <div key={m.title} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 22px", borderRadius: "20px", background: "var(--navy2)", border: "1px solid rgba(255,255,255,.06)" }}>
                    <div style={{ flexShrink: 0, width: "46px", height: "46px", borderRadius: "14px", background: "rgba(224,25,63,.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF6B86" }}><Ic d={m.d} size={22} sw={2} /></div>
                    <div>
                      <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "3px", letterSpacing: "-.3px" }}>{m.title}</div>
                      <div style={{ fontSize: "14px", lineHeight: 1.5, color: "#9AA8BE" }}>{m.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ INDSAMLINGSNÆVNET ============ */}
        <section className="ff-wrap ff-sec-pad">
          <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "28px", padding: "clamp(28px,4vw,48px)", boxShadow: "0 30px 70px -36px rgba(8,14,26,.14)" }}>
            <div className="ff-naev">
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 14px", borderRadius: "999px", background: "#FFFBEB", border: "1px solid #FDE68A", marginBottom: "18px" }}>
                  <Ic d='<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>' size={14} sw={2.2} stroke="#B45309" />
                  <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#B45309" }}>Tilladelse og regnskab</span>
                </div>
                <h2 style={{ margin: "0 0 18px", fontSize: "clamp(25px,3.8vw,34px)", lineHeight: 1.14, fontWeight: 800, letterSpacing: "-.7px", color: "var(--ink)" }}>Tilladelse først. Struktur bagefter.</h2>
                <p style={{ margin: "0 0 26px", fontSize: "clamp(16px,2.2vw,16.5px)", lineHeight: 1.65, color: "var(--body)" }}>Mange indsamlinger skal anmeldes til Indsamlingsnævnet senest 14 dage før, de går i gang. Når I har jeres journalnummer, bruger I det i StøtMedHjerte, så hjertesag, dokumentation og grundlag hænger sammen fra start.</p>
                <Link to="/tilladelse-og-regnskab" className="ff-cta-w ff-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "15.5px", fontWeight: 600, padding: "15px 26px", minHeight: "52px", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Læs om tilladelse og regnskab</Link>
              </div>
              <div style={{ background: "var(--alt)", borderRadius: "22px", padding: "28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", paddingBottom: "18px", borderBottom: "1px solid var(--smh-border)" }}>
                    <span style={{ fontSize: "14.5px", color: "var(--body)", fontWeight: 500 }}>Anmeldelsesfrist</span>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)", textAlign: "right" }}>Senest 14 dage før</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", paddingBottom: "18px", borderBottom: "1px solid var(--smh-border)" }}>
                    <span style={{ fontSize: "14.5px", color: "var(--body)", fontWeight: 500 }}>Journalnummer</span>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)", textAlign: "right" }}>Bruges i SMH</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px" }}>
                    <span style={{ fontSize: "14.5px", color: "var(--body)", fontWeight: 500 }}>Dokumentation</span>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)", textAlign: "right" }}>Samlet ét sted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ HVEM KAN BRUGE SMH ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="ff-sec-pad ff-wrap" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--label)", marginBottom: "14px" }}>Hvem kan bruge StøtMedHjerte</div>
            <h2 style={{ margin: "0 auto 36px", fontSize: "clamp(26px,4.2vw,38px)", lineHeight: 1.14, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", maxWidth: "680px", textWrap: "balance" }}>Til foreninger, der vil samle penge ind mere professionelt.</h2>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", maxWidth: "860px", margin: "0 auto" }}>
              {ORG_TYPES.map((o) => (
                <span key={o} style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "13px 22px", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)", fontSize: "15px", fontWeight: 600, color: "var(--ink)" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)" }} />{o}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============ AFSLUTTENDE CTA ============ */}
        <section className="ff-wrap ff-sec-pad" style={{ textAlign: "center" }}>
          <h2 style={{ margin: "0 auto 22px", fontSize: "clamp(30px,5vw,44px)", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-1.1px", color: "var(--ink)", maxWidth: "680px", textWrap: "balance" }}>Vil I samle penge ind med bedre overblik?</h2>
          <p style={{ margin: "0 auto 32px", fontSize: "clamp(16px,2.4vw,18.5px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "600px" }}>Opret jeres forening, tilknyt MobilePay, registrér journalnummer, og gør jeres første hjertesag klar til deling.</p>
          <div className="ff-cta-row" style={{ justifyContent: "center" }}>
            <Link to="/opret-forening" className="ff-cta-w ff-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16.5px", fontWeight: 600, padding: "17px 34px", minHeight: "56px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 34px rgba(224,25,63,.24)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
