import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./TilladelseOgRegnskab.css";

function Ic({ d, size = 24, sw = 1.9, stroke = "currentColor", fill = "none", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={fill === "none" ? stroke : "none"} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={style} dangerouslySetInnerHTML={{ __html: d }} />
  );
}

const CHECK = '<path d="M20 6 9 17l-5-5"/>';
const DOC = '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>';
const DOWNLOAD = '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>';
const ARROW = '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>';

const FACTS = [
  { label: "Ansøgningsfrist", big: "14 dage", body: "Ansøgningen sendes senest 14 dage før indsamlingens start." },
  { label: "Gebyr · §3-ansøgning", big: "1.300 kr.", body: "Takst for 2026, senest tjekket juni 2026. Tjek altid den aktuelle hos Indsamlingsnævnet." },
  { label: "Revisionsgrænse", big: "50.000 kr.", body: "Over dette beløb inviteres en tilknyttet revisor til gennemgang, hvorefter der kvitteres med digital signatur." },
];

const DOCS = [
  { title: "Transaktionsliste", fmt: "CSV", d: DOC },
  { title: "Bidragsoversigt", fmt: "PDF", d: '<path d="M3 3v18h18"/><path d="m7 14 3-4 3 2 4-6"/>' },
  { title: "Kvitteringer", fmt: "PDF", d: '<path d="M9 2h6a2 2 0 0 1 2 2v18l-5-3-5 3V4a2 2 0 0 1 2-2z"/>' },
  { title: "Gebyrkvittering", fmt: "PDF", kr: true },
];

const AUTO = [
  { title: "Månedlige rapporter", body: "Regnskab og rapporter dannes automatisk hver måned, så overblikket altid er opdateret.", d: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/><path d="m9 16 2 2 4-4"/>' },
  { title: "Automatisk slutregnskab", body: "Når tilladelsens indsamlingsperiode udløber, danner StøtMedHjerte automatisk regnskabet til Indsamlingsnævnet.", d: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/>' },
  { title: "Revisor over 50.000 kr.", body: "Ved samlet indsamling over 50.000 kr. inviteres en tilknyttet revisor til gennemgang, hvorefter der kvitteres med digital signatur.", d: '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>' },
];

const LINKS = [
  { to: "/den-rene-model", title: "Bidrag går direkte", body: "Pengene går forbi os til foreningens egen konto.", cta: "Den rene model", icon: '<path d="M3 12h18"/><path d="M14 7l5 5-5 5"/>', bg: "#ECFDF3", fg: "#15803D" },
  { to: "/priser", title: "Fast pris, ingen andel", body: "Et fast abonnement. Gebyret til nævnet er separat.", cta: "Se priser", kr: true, bg: "var(--brand-surface)", fg: "var(--brand)" },
  { to: "/sikkerhed", title: "CVR-valideret adgang", body: "Kun bekræftede foreninger får adgang til at indsamle.", cta: "Sikkerhed", icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>', bg: "var(--brand-surface)", fg: "var(--brand)" },
  { to: "/saadan-virker-det", title: "Hele flowet", body: "Fra hjertesag til regnskabsgrundlag, trin for trin.", cta: "Sådan virker det", icon: '<path d="M3 12h18"/><path d="M14 7l5 5-5 5"/>', bg: "var(--alt)", fg: "var(--ink)" },
];

export default function TilladelseOgRegnskabPage() {
  return (
    <>
      <SiteNav />
      <main className="tor-page">

        {/* ============ HERO + DOKUMENTATIONSDASHBOARD ============ */}
        <section className="tor-wrap" style={{ paddingTop: "clamp(40px,5vw,64px)", paddingBottom: "8px" }}>
          <div className="tor-hero-grid">
            <div style={{ animation: "torRise .55s ease both" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 14px", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)", marginBottom: "20px" }}>
                <Ic d='<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>' size={14} sw={2.1} stroke="var(--brand)" />
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--body)", letterSpacing: "-.1px" }}>Tilladelse og regnskab</span>
              </div>
              <h1 style={{ margin: "0 0 18px", fontSize: "clamp(30px,4.8vw,50px)", lineHeight: 1.07, fontWeight: 800, letterSpacing: "-1.3px", color: "var(--ink)", textWrap: "balance" }}>Overblik over tilladelse, journalnummer og regnskabsgrundlag.</h1>
              <p style={{ margin: "0 0 28px", fontSize: "clamp(16px,2.3vw,18.5px)", lineHeight: 1.62, color: "var(--body)", maxWidth: "520px" }}>Foreningen har selv ansvar for tilladelsen hos Indsamlingsnævnet. StøtMedHjerte holder journalnummer, status og dokumentation samlet, så grundlaget er klar, når regnskabet skal laves.</p>
              <div className="tor-cta-row">
                <Link to="/opret-forening" className="tor-cta-w tor-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "15px 28px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 12px 30px rgba(224,25,63,.22)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
                <a href="#regnskab" className="tor-cta-w tor-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16px", fontWeight: 600, padding: "15px 28px", minHeight: "54px", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>Se regnskabsgrundlaget<Ic d='<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>' size={15} sw={2.4} /></a>
              </div>
            </div>

            {/* Dokumentationsdashboard */}
            <div style={{ position: "relative", animation: "torRise .7s ease both" }}>
              <div style={{ position: "absolute", inset: "6% 0 -8% 0", background: "radial-gradient(62% 60% at 60% 30%, rgba(224,25,63,.08), transparent 72%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "24px", boxShadow: "0 44px 100px -56px rgba(8,14,26,.42)", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "11px", padding: "14px 18px", borderBottom: "1px solid var(--smh-border)", background: "linear-gradient(180deg,#fff,#FAFBFD)" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "var(--brand-surface)", color: "var(--brand)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic d='<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/>' size={16} sw={2} /></span>
                  <div style={{ lineHeight: 1.15 }}>
                    <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--label)" }}>Foreningsadmin</div>
                    <div style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.2px" }}>Tilladelse &amp; regnskab</div>
                  </div>
                  <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "7px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--body)" }}>Boldklubben Fremad</span>
                    <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "var(--ink)", color: "#fff", fontSize: "10.5px", fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>BF</span>
                  </span>
                </div>

                <div style={{ padding: "clamp(18px,2.6vw,24px)" }}>
                  <div className="tor-hdash-body">
                    {/* col A */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "16px", padding: "16px 17px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "9px" }}>
                          <span style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--label)" }}>Journalnummer</span>
                          <span style={{ position: "relative", display: "inline-block", height: "24px", minWidth: "104px" }}>
                            <span className="tor-jn-a" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", borderRadius: "999px", background: "#FEF3C7", color: "#92400E", fontSize: "11.5px", fontWeight: 700, animation: "torJnA 6s ease-in-out infinite" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F59E0B" }} />Afventer</span>
                            <span className="tor-jn-b" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", borderRadius: "999px", background: "#ECFDF3", color: "#15803D", fontSize: "11.5px", fontWeight: 700, animation: "torJnB 6s ease-in-out infinite" }}><Ic d={CHECK} size={12} sw={3} stroke="#15803D" />Registreret</span>
                          </span>
                        </div>
                        <div className="tor-mono" style={{ fontSize: "clamp(22px,3.2vw,27px)", fontWeight: 600, letterSpacing: ".5px", color: "var(--ink)" }}>22-12-04567</div>
                        <div style={{ fontSize: "11.5px", color: "var(--smh-muted)", marginTop: "5px" }}>Knyttet til hjertesagen · Indsamlingsnævnet</div>
                      </div>

                      <div className="tor-minirow">
                        <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "14px", padding: "13px 14px" }}>
                          <span style={{ display: "inline-flex", width: "26px", height: "26px", borderRadius: "8px", background: "var(--alt)", color: "var(--ink)", alignItems: "center", justifyContent: "center", marginBottom: "9px" }}><Ic d='<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' size={15} sw={2} /></span>
                          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase", color: "var(--label)" }}>Ansøgningsfrist</div>
                          <div style={{ fontSize: "14.5px", fontWeight: 800, color: "var(--ink)", letterSpacing: "-.3px", marginTop: "2px" }}>14 dage før</div>
                        </div>
                        <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "14px", padding: "13px 14px" }}>
                          <span style={{ display: "inline-flex", width: "26px", height: "26px", borderRadius: "8px", background: "var(--alt)", color: "var(--ink)", alignItems: "center", justifyContent: "center", marginBottom: "9px", fontSize: "11px", fontWeight: 800 }}>kr.</span>
                          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase", color: "var(--label)" }}>Gebyr · §3</div>
                          <div style={{ fontSize: "14.5px", fontWeight: 800, color: "var(--ink)", letterSpacing: "-.3px", marginTop: "2px" }}>1.300 kr.</div>
                        </div>
                      </div>
                    </div>

                    {/* col B */}
                    <div style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "16px", padding: "15px 16px" }}>
                      <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--label)", marginBottom: "12px" }}>Dokumentationsstatus</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ width: "22px", height: "22px", borderRadius: "7px", background: "#ECFDF3", border: "1px solid #BBF7D0", color: "#15803D", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic d={CHECK} size={12} sw={3} stroke="#15803D" /></span>
                          <span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--ink)", flex: 1 }}>CVR-validering</span>
                          <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#15803D" }}>Bekræftet</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ width: "22px", height: "22px", borderRadius: "7px", background: "#FEF3C7", border: "1px solid #FDE68A", color: "#92400E", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F59E0B" }} /></span>
                          <span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--ink)", flex: 1 }}>Journalnummer</span>
                          <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#92400E" }}>Afventer</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ width: "22px", height: "22px", borderRadius: "7px", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", color: "var(--brand)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic d='<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 1.5"/>' size={12} sw={2.4} /></span>
                          <span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--ink)", flex: 1 }}>Indsamlingsperiode</span>
                          <span style={{ fontSize: "10.5px", fontWeight: 700, color: "var(--brand)" }}>Aktiv</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ width: "22px", height: "22px", borderRadius: "7px", background: "var(--surface)", border: "1px solid var(--smh-border)", color: "var(--label)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic d={DOC} size={12} sw={2.2} /></span>
                          <span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--ink)", flex: 1 }}>Regnskabsgrundlag</span>
                          <span style={{ fontSize: "10.5px", fontWeight: 700, color: "var(--smh-muted)" }}>Samles</span>
                        </div>
                      </div>
                      <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid var(--smh-border)", display: "flex", alignItems: "center", gap: "7px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--flow)" }} />
                        <span style={{ fontSize: "11px", color: "var(--smh-muted)" }}>Opdateres automatisk gennem indsamlingen</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ ANSVAR + ANSOEGNING ============ */}
        <section className="tor-sec-pad" style={{ scrollMarginTop: "80px" }}>
          <div className="tor-wrap">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "14px", maxWidth: "760px", margin: "0 auto 34px" }}>
              <h2 style={{ margin: 0, fontSize: "clamp(25px,3.9vw,38px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>Foreningen har ansvaret for tilladelsen.</h2>
              <p style={{ margin: 0, fontSize: "clamp(16px,2.2vw,17.5px)", lineHeight: 1.68, color: "var(--body)" }}>StøtMedHjerte udsteder ikke tilladelser og erstatter ikke juridisk rådgivning. Planlægger foreningen en offentlig indsamling, skal den selv ansøge hos <Link to="/sikkerhed" style={{ color: "var(--brand)", fontWeight: 600, textDecoration: "none" }}>Indsamlingsnævnet</Link> før start. Når tilladelsen er givet, registreres journalnummeret og kobles til hjertesagen.</p>
            </div>

            <div style={{ maxWidth: "960px", margin: "0 auto", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "22px", overflow: "hidden", boxShadow: "0 18px 50px -36px rgba(8,14,26,.2)" }}>
              <div className="tor-facts">
                {FACTS.map((f) => (
                  <div key={f.label} className="tor-factcell">
                    <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "var(--label)", marginBottom: "10px" }}>{f.label}</div>
                    <div style={{ fontSize: "clamp(28px,4.4vw,38px)", fontWeight: 800, letterSpacing: "-1.4px", color: "var(--ink)", lineHeight: 1 }}>{f.big}</div>
                    <p style={{ margin: "10px 0 0", fontSize: "13.5px", lineHeight: 1.5, color: "var(--smh-muted)" }}>{f.body}</p>
                  </div>
                ))}
              </div>
              <div style={{ padding: "15px 26px", borderTop: "1px solid var(--smh-border)", background: "var(--alt)", display: "flex", alignItems: "center", gap: "9px", flexWrap: "wrap" }}>
                <Ic d='<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>' size={15} sw={2} stroke="var(--smh-muted)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "12.5px", color: "var(--smh-muted)" }}>Gebyret betales direkte til Indsamlingsnævnet og er ikke en del af StøtMedHjertes abonnement.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ REGNSKABSGRUNDLAG (NAVY) ============ */}
        <section id="regnskab" style={{ background: "var(--navy1)", position: "relative", overflow: "hidden", scrollMarginTop: "70px" }}>
          <div style={{ position: "absolute", top: "-140px", left: "-90px", width: "460px", height: "460px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.16),transparent 64%)", pointerEvents: "none" }} />
          <div className="tor-wrap tor-sec-pad" style={{ position: "relative" }}>
            <div style={{ maxWidth: "680px", margin: "0 auto 40px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "#7E8AA0", marginBottom: "12px" }}>Regnskabsgrundlag</div>
              <h2 style={{ margin: 0, fontSize: "clamp(25px,3.9vw,40px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "#fff", textWrap: "balance" }}>Når indsamlingen er slut, er grundlaget samlet.</h2>
              <p style={{ margin: "15px auto 0", fontSize: "clamp(15.5px,2.2vw,17.5px)", lineHeight: 1.62, color: "#AEB9CC", maxWidth: "560px" }}>Den afsluttede hjertesag, bidragsoversigt og dokumentation ligger ét sted, klar til eksport og videre til foreningens regnskab.</p>
            </div>

            {/* export-view */}
            <div style={{ maxWidth: "1000px", margin: "0 auto", background: "var(--surface)", borderRadius: "22px", boxShadow: "0 50px 110px -50px rgba(0,0,0,.6)", overflow: "hidden", animation: "torRise .7s ease both" }}>
              <div className="tor-exp-toolbar" style={{ padding: "15px 20px", borderBottom: "1px solid var(--smh-border)", background: "linear-gradient(180deg,#fff,#FAFBFD)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "var(--ink)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic d='<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/>' size={16} sw={2} /></span>
                  <div style={{ lineHeight: 1.15 }}>
                    <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--ink)", letterSpacing: "-.3px" }}>Regnskabsgrundlag</div>
                    <div style={{ fontSize: "11px", color: "var(--smh-muted)" }}>Boldklubben Fremad · 2026</div>
                  </div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, color: "#15803D", background: "#ECFDF3", border: "1px solid #BBF7D0", padding: "5px 11px", borderRadius: "999px", marginLeft: "4px" }}><Ic d={CHECK} size={11} sw={3} stroke="#15803D" />Afsluttet</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {["PDF", "CSV"].map((x) => (
                    <span key={x} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, color: "var(--ink)", background: "var(--surface)", border: "1px solid var(--smh-border)", padding: "8px 13px", borderRadius: "10px" }}><Ic d={DOWNLOAD} size={13} sw={2.2} />{x}</span>
                  ))}
                </div>
              </div>

              <div className="tor-reg-body">
                {/* col A */}
                <div className="tor-reg-col">
                  <div style={{ display: "flex", alignItems: "center", gap: "13px", marginBottom: "18px" }}>
                    <span style={{ width: "46px", height: "46px", borderRadius: "13px", background: "linear-gradient(135deg,#FFE4E8,#FFF1F3)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--brand)", flexShrink: 0 }}><Ic d='<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>' size={22} fill="currentColor" /></span>
                    <div style={{ lineHeight: 1.2 }}>
                      <div style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "-.3px", color: "var(--ink)" }}>Nye fodboldmål til U13</div>
                      <div style={{ fontSize: "12.5px", color: "var(--smh-muted)", marginTop: "2px" }}>Afsluttet 30. apr 2026 · 11 uger</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-end", gap: "14px", flexWrap: "wrap", marginBottom: "20px" }}>
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--label)" }}>Indsamlet i alt</div>
                      <div className="tor-mono" style={{ fontSize: "clamp(30px,5vw,40px)", fontWeight: 600, letterSpacing: "-.5px", color: "var(--ink)", lineHeight: 1.05, marginTop: "3px" }}>23.480 kr</div>
                    </div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11.5px", fontWeight: 700, color: "#15803D", background: "#ECFDF3", border: "1px solid #BBF7D0", padding: "5px 10px", borderRadius: "999px", marginBottom: "6px" }}>Mål 18.000 kr · nået</span>
                  </div>

                  <div className="tor-statrow" style={{ marginBottom: "22px" }}>
                    {[["186", "Bidrag"], ["162", "Støtter"], ["126 kr", "Gennemsnit"]].map(([v, l]) => (
                      <div key={l} style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "13px", padding: "13px 14px" }}>
                        <div className="tor-mono" style={{ fontSize: "18px", fontWeight: 600, color: "var(--ink)" }}>{v}</div>
                        <div style={{ fontSize: "11.5px", color: "var(--smh-muted)", marginTop: "2px" }}>{l}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "11px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase", color: "var(--label)" }}>Bidragsoversigt</span>
                    <span style={{ fontSize: "11.5px", color: "var(--smh-muted)" }}>Pr. uge</span>
                  </div>
                  <div className="tor-bars">
                    {[34, 52, 44, 66, 58, 78, 70, 90, 62, 48, 38].map((h, i) => (
                      <div key={i} style={{ height: h + "%" }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "10.5px", color: "var(--label)" }}>
                    <span>Feb</span><span>Mar</span><span>Apr</span>
                  </div>
                </div>

                {/* col B */}
                <div className="tor-reg-col" style={{ background: "#FBFCFE" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase", color: "var(--label)", marginBottom: "13px" }}>Dokumentation</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                    {DOCS.map((d) => (
                      <div key={d.title} style={{ display: "flex", alignItems: "center", gap: "10px", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "11px", padding: "10px 12px" }}>
                        <span style={{ width: "26px", height: "26px", borderRadius: "8px", background: "var(--alt)", color: "var(--ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: d.kr ? "10px" : undefined, fontWeight: d.kr ? 800 : undefined }}>{d.kr ? "kr." : <Ic d={d.d} size={14} sw={2} />}</span>
                        <span style={{ flex: 1, lineHeight: 1.2 }}><span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--ink)", display: "block" }}>{d.title}</span><span style={{ fontSize: "10.5px", color: "var(--smh-muted)" }}>{d.fmt}</span></span>
                        <Ic d={CHECK} size={16} sw={2.8} stroke="#15803D" style={{ flexShrink: 0 }} />
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: "16px", paddingTop: "15px", borderTop: "1px solid var(--smh-border)" }}>
                    <div style={{ background: "var(--ink)", color: "#fff", borderRadius: "12px", padding: "13px 0", textAlign: "center", fontSize: "13.5px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      <Ic d={DOWNLOAD} size={15} sw={2.3} />Eksportér grundlag
                    </div>
                    <p style={{ margin: "11px 0 0", fontSize: "11px", lineHeight: 1.5, color: "var(--smh-muted)", textAlign: "center" }}>Denne indsamling er under 50.000 kr. og kræver ingen revision.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* navy auto-kort */}
            <div style={{ maxWidth: "1000px", margin: "34px auto 0" }}>
              <div className="tor-autorow">
                {AUTO.map((a) => (
                  <div key={a.title} style={{ background: "var(--navy2)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "16px", padding: "20px 18px" }}>
                    <span style={{ display: "inline-flex", width: "38px", height: "38px", borderRadius: "11px", background: "var(--navy3)", color: "#fff", alignItems: "center", justifyContent: "center", marginBottom: "13px" }}><Ic d={a.d} size={19} sw={2} /></span>
                    <div style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-.3px", color: "#fff", marginBottom: "6px" }}>{a.title}</div>
                    <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.55, color: "#AEB9CC" }}>{a.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <p style={{ textAlign: "center", margin: "26px auto 0", fontSize: "13.5px", lineHeight: 1.6, color: "#7E8AA0", maxWidth: "560px" }}>StøtMedHjerte samler oplysningerne. Det endelige regnskab og en eventuel revision er foreningens eget ansvar. <Link to="/den-rene-model" style={{ color: "#fff", fontWeight: 600, textDecoration: "none" }}>Læs om den rene model</Link>.</p>
          </div>
        </section>

        {/* ============ LAES MERE ============ */}
        <section className="tor-wrap tor-sec-pad">
          <div style={{ maxWidth: "640px", margin: "0 auto 36px", textAlign: "center" }}>
            <h2 style={{ margin: 0, fontSize: "clamp(24px,3.7vw,36px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.8px", color: "var(--ink)", textWrap: "balance" }}>Det hænger sammen med resten.</h2>
            <p style={{ margin: "14px auto 0", fontSize: "clamp(15.5px,2.2vw,17px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "520px" }}>Tilladelse og regnskab er ét hjørne af systemet. Her er de tilstødende dele.</p>
          </div>
          <div className="tor-linkgrid">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="tor-link-card" style={{ textDecoration: "none", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "22px 20px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 14px 40px -32px rgba(8,14,26,.18)" }}>
                <span style={{ width: "40px", height: "40px", borderRadius: "11px", background: l.bg, color: l.fg, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{l.kr ? <span style={{ fontSize: "15px", fontWeight: 800, letterSpacing: "-.3px", lineHeight: 1 }}>kr.</span> : <Ic d={l.icon} size={20} sw={1.9} />}</span>
                <span style={{ fontSize: "15.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>{l.title}</span>
                <span style={{ fontSize: "13px", lineHeight: 1.5, color: "var(--body)", flex: 1 }}>{l.body}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: 700, color: "var(--brand)" }}>{l.cta} <Ic d={ARROW} size={14} sw={2.4} /></span>
              </Link>
            ))}
          </div>
        </section>

        {/* ============ AFSLUTTENDE CTA ============ */}
        <section className="tor-wrap tor-sec-pad" style={{ textAlign: "center" }}>
          <h2 style={{ margin: "0 auto 18px", fontSize: "clamp(27px,4.5vw,42px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)", maxWidth: "620px", textWrap: "balance" }}>Klar til en mere struktureret indsamling?</h2>
          <p style={{ margin: "0 auto 32px", fontSize: "clamp(16px,2.4vw,18px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "500px" }}>Opret foreningen, og knyt journalnummeret til jeres hjertesag, når tilladelsen er givet.</p>
          <div className="tor-cta-row" style={{ justifyContent: "center" }}>
            <Link to="/opret-forening" className="tor-cta-w tor-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16.5px", fontWeight: 600, padding: "17px 34px", minHeight: "56px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 34px rgba(224,25,63,.24)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
            <Link to="/kontakt" className="tor-cta-w tor-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16.5px", fontWeight: 600, padding: "17px 34px", minHeight: "56px", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Kontakt os</Link>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
