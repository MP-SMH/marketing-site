import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./DenReneModel.css";

function Ic({ d, size = 24, sw = 1.9, stroke = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={style} dangerouslySetInnerHTML={{ __html: d }} />
  );
}

const NOT_LIST = [
  "Holder ikke på dine donationer",
  "Gemmer ikke kort- eller bankoplysninger",
  "Tager ingen andel eller transaktionsgebyr",
  "Er ikke et mellemled i betalingen",
];

export default function DenReneModelPage() {
  return (
    <>
      <SiteNav />
      <main className="drm-page">

        {/* ============ HERO + 16:9 FLOW-DEVICE ============ */}
        <section className="drm-wrap" style={{ paddingTop: "54px", paddingBottom: "10px" }}>
          <div style={{ animation: "drmRise .55s ease both", maxWidth: "760px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--label)", marginBottom: "16px" }}>Den rene model</div>
            <h1 style={{ margin: 0, fontSize: "clamp(32px,5.4vw,56px)", lineHeight: 1.04, fontWeight: 800, letterSpacing: "-1.4px", color: "var(--ink)", textWrap: "balance" }}>Bidrag går direkte til foreningen.</h1>
            <p style={{ margin: "20px 0 0", fontSize: "clamp(16.5px,2.4vw,19px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "600px" }}>Donationen går fra støtten til foreningens egen MobilePay-konto. StøtMedHjerte står ikke i pengestrømmen, vi leverer kun platformen mod et fast abonnement.</p>
            <div className="drm-cta-row" style={{ marginTop: "30px" }}>
              <Link to="/priser" className="drm-cta-w drm-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "15px 28px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 12px 30px rgba(224,25,63,.24)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Se priser</Link>
              <Link to="/saadan-virker-det" className="drm-cta-w drm-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16px", fontWeight: 600, padding: "15px 28px", minHeight: "54px", borderRadius: "999px", border: "1px solid var(--smh-border)", background: "var(--surface)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>Sådan virker det</Link>
            </div>
          </div>

          {/* 16:9 flow-device */}
          <div style={{ marginTop: "clamp(34px,5vw,52px)", position: "relative", animation: "drmRise .7s ease both" }}>
            <div style={{ position: "absolute", inset: "8% 0 -12% 0", background: "radial-gradient(58% 56% at 50% 28%, rgba(22,163,74,.12), transparent 72%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "28px", boxShadow: "0 40px 90px -52px rgba(8,14,26,.42)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "15px 22px", borderBottom: "1px solid var(--smh-border)", background: "linear-gradient(180deg,#fff,#FAFBFD)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "12px", fontWeight: 700, letterSpacing: ".5px", color: "var(--label)", textTransform: "uppercase" }}>
                  <Ic d='<path d="M3 12h18"/><path d="M14 7l5 5-5 5"/>' size={15} sw={2} />Pengestrøm
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "6px 12px", borderRadius: "999px", background: "#ECFDF3", color: "#15803D", fontSize: "12px", fontWeight: 700 }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--flow)" }} />Direkte · ingen mellemstation
                </span>
              </div>

              <div style={{ padding: "clamp(22px,3.6vw,40px)" }}>
                {/* 3 noder */}
                <div className="drm-flow3">
                  <div style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "24px 16px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ width: "46px", height: "46px", borderRadius: "13px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 11px", color: "var(--ink)" }}>
                      <Ic d='<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>' size={23} />
                    </div>
                    <div style={{ fontSize: "15.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Støtte</div>
                    <div style={{ fontSize: "12.5px", color: "var(--smh-muted)", marginTop: "2px" }}>Giver et bidrag</div>
                  </div>

                  <div className="drm-arrow-wrap" style={{ color: "var(--flow)" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#15803D", letterSpacing: ".2px", whiteSpace: "nowrap" }}>giver bidrag</span>
                    <svg className="drm-arrow-h" width="64" height="18" viewBox="0 0 64 18" fill="none"><path d="M2 9h52" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><path d="M50 3l9 6-9 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                    <svg className="drm-arrow-v" width="18" height="40" viewBox="0 0 18 40" fill="none"><path d="M9 2v28" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><path d="M3 26l6 10 6-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                  </div>

                  <div style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "24px 16px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ width: "46px", height: "46px", borderRadius: "13px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 11px", color: "var(--ink)" }}>
                      <Ic d='<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>' size={23} />
                    </div>
                    <div style={{ fontSize: "15.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>MobilePay-app</div>
                    <div style={{ fontSize: "12.5px", color: "var(--smh-muted)", marginTop: "2px" }}>Godkender betaling</div>
                  </div>

                  <div className="drm-arrow-wrap" style={{ color: "var(--flow)" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#15803D", letterSpacing: ".2px", whiteSpace: "nowrap" }}>udbetales til</span>
                    <svg className="drm-arrow-h" width="64" height="18" viewBox="0 0 64 18" fill="none"><path d="M2 9h52" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><path d="M50 3l9 6-9 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                    <svg className="drm-arrow-v" width="18" height="40" viewBox="0 0 18 40" fill="none"><path d="M9 2v28" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><path d="M3 26l6 10 6-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                  </div>

                  <div style={{ background: "#ECFDF3", border: "1.5px solid #BBF7D0", borderRadius: "18px", padding: "24px 16px", textAlign: "center", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ width: "46px", height: "46px", borderRadius: "13px", background: "var(--surface)", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 11px", color: "#15803D" }}>
                      <Ic d='<path d="M3 21h18"/><path d="M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/>' size={23} stroke="#15803D" />
                    </div>
                    <div style={{ fontSize: "15.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Foreningens egen MobilePay-konto</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12.5px", color: "#15803D", marginTop: "5px", fontWeight: 700, justifyContent: "center" }}><Ic d='<path d="M20 6 9 17l-5-5"/>' size={13} sw={3} stroke="#15803D" />Modtager 100%</div>
                  </div>
                </div>

                {/* detached platform card */}
                <div style={{ marginTop: "clamp(24px,3.4vw,34px)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                    <span style={{ flex: 1, height: "1px", background: "var(--smh-border)" }} />
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "var(--brand)", whiteSpace: "nowrap" }}>Fast abonnement · betales separat</span>
                    <span style={{ flex: 1, height: "1px", background: "var(--smh-border)" }} />
                  </div>
                  <div className="drm-smhrow" style={{ margin: "0 auto", width: "100%", maxWidth: "560px", background: "var(--brand-surface)", border: "1.5px dashed var(--brand-border)", borderRadius: "18px", padding: "16px 20px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "var(--surface)", border: "1px solid var(--brand-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand)", fontWeight: 800, fontSize: "13px", letterSpacing: "-.5px", flexShrink: 0 }}>SMH</div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: "14.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>StøtMedHjerte · platform</div>
                      <div style={{ fontSize: "12.5px", color: "var(--brand-hover)", marginTop: "1px" }}>Leverer værktøjet, tager ingen andel af donationerne</div>
                    </div>
                    <span className="drm-nostream" style={{ marginLeft: "auto", alignItems: "center", gap: "6px", padding: "6px 11px", borderRadius: "999px", background: "#fff", border: "1px solid var(--brand-border)", color: "var(--brand)", fontSize: "11.5px", fontWeight: 700, whiteSpace: "nowrap" }}>
                      <Ic d='<path d="M18 6 6 18M6 6l12 12"/>' size={12} sw={2.6} />Ikke i pengestrømmen
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ TO ADSKILTE STROEMME ============ */}
        <section className="drm-wrap drm-sec-pad">
          <div className="drm-split">
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--label)", marginBottom: "14px" }}>Fast abonnement</div>
              <h2 style={{ margin: 0, fontSize: "clamp(26px,4vw,40px)", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>To adskilte strømme.</h2>
              <p style={{ margin: "18px 0 0", fontSize: "clamp(16px,2.3vw,18px)", lineHeight: 1.7, color: "var(--body)" }}>Donationer og betaling for platformen blandes aldrig sammen. Bidrag går fra støtten direkte til foreningen. Foreningen betaler StøtMedHjerte et fast månedligt beløb for at bruge platformen, uafhængigt af hvor meget der samles ind.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "13px", marginTop: "26px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "8px", background: "#ECFDF3", color: "#15803D", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic d='<path d="M20 6 9 17l-5-5"/>' size={15} sw={2.6} stroke="#15803D" /></span>
                  <span style={{ fontSize: "15.5px", lineHeight: 1.5, color: "var(--ink)" }}><b style={{ fontWeight: 700 }}>Donationer</b>: direkte til foreningens egen konto.</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "8px", background: "var(--brand-surface)", color: "var(--brand)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic d='<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>' size={15} sw={2.2} stroke="var(--brand)" /></span>
                  <span style={{ fontSize: "15.5px", lineHeight: 1.5, color: "var(--ink)" }}><b style={{ fontWeight: 700 }}>Abonnement</b>: fast pris pr. måned, uanset indsamlet beløb.</span>
                </div>
              </div>
            </div>

            {/* lanes-infografik */}
            <div style={{ justifySelf: "center", width: "100%", maxWidth: "440px" }}>
              <div style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "24px", boxShadow: "0 30px 70px -46px rgba(8,14,26,.34)", padding: "20px" }}>
                <div className="drm-lanes">
                  {/* Lane A: donationer */}
                  <div style={{ padding: "6px clamp(8px,2vw,16px)", textAlign: "center" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 11px", borderRadius: "999px", background: "#ECFDF3", color: "#15803D", fontSize: "11.5px", fontWeight: 700, letterSpacing: ".2px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--flow)" }} />Donationer</span>
                    <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", alignItems: "center", gap: "9px" }}>
                      <div style={{ width: "100%", background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "14px", padding: "13px 8px" }}>
                        <div style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--ink)" }}>Støtte</div>
                      </div>
                      <svg width="16" height="30" viewBox="0 0 16 30" fill="none" style={{ color: "var(--flow)" }}><path d="M8 2v20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /><path d="M3 18l5 8 5-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                      <div style={{ width: "100%", background: "#ECFDF3", border: "1.5px solid #BBF7D0", borderRadius: "14px", padding: "13px 8px" }}>
                        <div style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--ink)" }}>Forening</div>
                      </div>
                    </div>
                  </div>

                  <div className="drm-lane-div-v" style={{ height: "1px", background: "var(--smh-border)", margin: "18px 8px" }} />

                  {/* Lane B: abonnement */}
                  <div style={{ padding: "6px clamp(8px,2vw,16px)", textAlign: "center", position: "relative" }}>
                    <div className="drm-lane-div-h" style={{ position: "absolute", left: 0, top: "6px", bottom: "6px", width: "1px", background: "var(--smh-border)" }} />
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 11px", borderRadius: "999px", background: "var(--brand-surface)", color: "var(--brand)", fontSize: "11.5px", fontWeight: 700, letterSpacing: ".2px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--brand)" }} />Abonnement</span>
                    <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", alignItems: "center", gap: "9px" }}>
                      <div style={{ width: "100%", background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "14px", padding: "13px 8px" }}>
                        <div style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--ink)" }}>Forening</div>
                      </div>
                      <svg width="16" height="30" viewBox="0 0 16 30" fill="none" style={{ color: "var(--brand)" }}><path d="M8 2v20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 3" /><path d="M3 18l5 8 5-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                      <div style={{ width: "100%", background: "var(--brand-surface)", border: "1.5px solid var(--brand-border)", borderRadius: "14px", padding: "13px 8px" }}>
                        <div style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--ink)" }}>StøtMedHjerte</div>
                        <div style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--brand)", marginTop: "2px" }}>Fast pris</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "18px", paddingTop: "15px", borderTop: "1px dashed var(--smh-border)", textAlign: "center", fontSize: "12.5px", fontWeight: 700, color: "var(--smh-muted)", letterSpacing: ".2px" }}>Aldrig blandet sammen</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ HVAD DET BETYDER FOR FORENINGEN ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="drm-wrap drm-sec-pad">
            <div style={{ maxWidth: "640px", marginBottom: "38px" }}>
              <h2 style={{ margin: 0, fontSize: "clamp(26px,4vw,40px)", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>Hvad det betyder for foreningen.</h2>
            </div>
            <div className="drm-cards3">
              {[
                { icon: <span style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "-.3px", lineHeight: 1 }}>kr.</span>, title: "Ingen andel til os", body: "Bidragene modtages direkte på foreningens egen MobilePay-konto. StøtMedHjerte tager ingen andel." },
                { icon: <Ic d='<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h4"/>' size={22} stroke="#15803D" />, title: "Lettere regnskab", body: "Bidrag lander direkte på foreningens egen konto. Ét sted at afstemme, ingen mellemregning." },
                { icon: <Ic d='<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>' size={22} stroke="#15803D" />, title: "Nemt at forklare", body: "Bestyrelse, medlemmer og støtter kan se præcis hvor pengene går. Ingen skjulte led." },
              ].map((c) => (
                <div key={c.title} style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "20px", padding: "26px 24px", boxShadow: "0 18px 44px -34px rgba(8,14,26,.2)" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#ECFDF3", color: "#15803D", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>{c.icon}</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-.4px", color: "var(--ink)", marginBottom: "8px" }}>{c.title}</div>
                  <p style={{ margin: 0, fontSize: "14.5px", lineHeight: 1.6, color: "var(--body)" }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ HVAD SMH IKKE GOER (navy) ============ */}
        <section style={{ background: "var(--navy1)", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-120px", right: "-80px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(224,25,63,.16), transparent 68%)", pointerEvents: "none" }} />
          <div className="drm-wrap drm-sec-pad" style={{ position: "relative" }}>
            <div style={{ maxWidth: "640px", marginBottom: "34px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#6B7A92", marginBottom: "14px" }}>Til forskel fra mange platforme</div>
              <h2 style={{ margin: 0, fontSize: "clamp(26px,4vw,40px)", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-.9px", color: "#fff", textWrap: "balance" }}>Hvad StøtMedHjerte ikke gør.</h2>
            </div>
            <div className="drm-notgrid">
              {NOT_LIST.map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: "14px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "16px", padding: "20px 22px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "rgba(224,25,63,.16)", color: "#FF6178", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic d='<path d="M18 6 6 18M6 6l12 12"/>' size={16} sw={2.6} stroke="#FF6178" /></span>
                  <span style={{ fontSize: "15.5px", lineHeight: 1.55, color: "#E8EDF5", fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ AFSLUTTENDE CTA ============ */}
        <section className="drm-wrap" style={{ paddingTop: "clamp(56px,8vw,88px)", paddingBottom: "clamp(56px,8vw,88px)", textAlign: "center" }}>
          <h2 style={{ margin: "0 auto 14px", maxWidth: "660px", fontSize: "clamp(26px,4.2vw,40px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>En fast pris. Ingen andel af donationerne.</h2>
          <p style={{ margin: "0 auto 30px", maxWidth: "520px", fontSize: "clamp(16px,2.3vw,18px)", lineHeight: 1.6, color: "var(--body)" }}>Opret foreningen og kom i gang på få minutter, eller se hvad det koster.</p>
          <div className="drm-cta-row" style={{ justifyContent: "center" }}>
            <Link to="/opret-forening" className="drm-cta-w drm-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16.5px", fontWeight: 600, padding: "17px 34px", minHeight: "56px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 34px rgba(224,25,63,.24)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
            <Link to="/priser" className="drm-cta-w drm-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16.5px", fontWeight: 600, padding: "17px 34px", minHeight: "56px", borderRadius: "999px", border: "1px solid var(--smh-border)", background: "var(--surface)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Se priser</Link>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
