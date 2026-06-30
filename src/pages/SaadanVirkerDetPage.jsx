import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./SaadanVirkerDet.css";

/* Ikon-helper: stroke-SVG via raw path. aria-hidden, dekorativt. */
function Ic({ d, size = 24, sw = 1.9, fill = "none" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={fill === "none" ? "currentColor" : "none"}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: d }}
    />
  );
}

/* Vandret + lodret pil-forbinder (rconn) */
function Conn({ color = "#C4CCD8" }) {
  return (
    <div className="svd-rconn" style={{ color }}>
      <svg className="svd-ah" width="38" height="15" viewBox="0 0 38 15" fill="none">
        <path d="M2 7.5h28" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M27 2.5l7 5-7 5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <svg className="svd-av" width="15" height="30" viewBox="0 0 15 30" fill="none">
        <path d="M7.5 2v18" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M2.5 16l5 7 5-7" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  );
}

export default function SaadanVirkerDetPage() {
  return (
    <>
      <SiteNav />
      <main className="svd-page">

        {/* ============ HERO ============ */}
        <section className="svd-wrap" style={{ paddingTop: "54px", paddingBottom: "8px", textAlign: "center" }}>
          <div style={{ animation: "svdRise .55s ease both", maxWidth: "760px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 15px", borderRadius: "999px", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", marginBottom: "22px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)" }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--brand-hover)", letterSpacing: "-.1px" }}>Sådan virker det</span>
            </div>
            <h1 style={{ margin: "0 0 20px", fontSize: "clamp(31px,5.2vw,54px)", lineHeight: 1.06, fontWeight: 800, letterSpacing: "-1.3px", color: "var(--ink)", textWrap: "balance" }}>Sådan fungerer StøtMedHjerte.</h1>
            <p style={{ margin: "0 auto 30px", fontSize: "clamp(16.5px,2.4vw,19px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "580px" }}>Ét samlet system fra hjertesag til regnskabsgrundlag. Tre trin for støtter, fem for foreninger, bidrag går direkte til foreningens egen konto.</p>
            <div className="svd-cta-row" style={{ justifyContent: "center" }}>
              <a href="#systemflow" className="svd-cta-w svd-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "16px 30px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 12px 30px rgba(224,25,63,.22)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                Se systemflowet
                <Ic d='<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>' size={16} sw={2.4} />
              </a>
              <Link to="/opret-forening" className="svd-cta-w svd-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16px", fontWeight: 600, padding: "16px 30px", minHeight: "54px", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                Opret forening
              </Link>
            </div>
          </div>
        </section>

        {/* ============ SYSTEMFLOW (5 stops) ============ */}
        <section id="systemflow" className="svd-wrap svd-sec-pad" style={{ scrollMarginTop: "80px" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto 40px", textAlign: "center" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--label)", marginBottom: "14px" }}>Systemet samlet</div>
            <h2 style={{ margin: 0, fontSize: "clamp(26px,4.2vw,42px)", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)", textWrap: "balance" }}>Fra hjertesag til regnskabsgrundlag.</h2>
            <p style={{ margin: "16px auto 0", fontSize: "clamp(16px,2.3vw,18px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "560px" }}>Fem stadier på én linje. Hver hjertesag bevæger sig gennem det samme flow, og pengene går direkte forbi os til foreningen.</p>
          </div>

          <div style={{ position: "relative", animation: "svdRise .7s ease both" }}>
            <div style={{ position: "absolute", inset: "10% 0 -10% 0", background: "radial-gradient(56% 60% at 50% 30%, rgba(224,25,63,.08), transparent 72%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "26px", boxShadow: "0 44px 100px -56px rgba(8,14,26,.42)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "15px 22px", borderBottom: "1px solid var(--smh-border)", background: "linear-gradient(180deg,#fff,#FAFBFD)", flexWrap: "wrap" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "12px", fontWeight: 700, letterSpacing: ".5px", color: "var(--label)", textTransform: "uppercase" }}>
                  <Ic d='<path d="M3 12h18"/><path d="M14 7l5 5-5 5"/>' size={15} sw={2} />
                  Systemflow
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11.5px", fontWeight: 700, color: "var(--body)" }}><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--brand)" }} />Platform</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11.5px", fontWeight: 700, color: "var(--body)" }}><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16A34A" }} />Direkte betaling</span>
                </span>
              </div>

              <div style={{ padding: "clamp(24px,3.6vw,42px) clamp(18px,3vw,40px)" }}>
                <div className="svd-rail">
                  {/* 1 Hjertesag */}
                  <div style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "22px 14px 18px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
                    <div style={{ position: "relative", width: "52px", height: "52px", borderRadius: "15px", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand)", marginBottom: "14px" }}>
                      <Ic d='<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>' size={25} />
                      <span style={{ position: "absolute", top: "-9px", right: "-9px", width: "23px", height: "23px", borderRadius: "50%", background: "var(--ink)", color: "#fff", fontSize: "11.5px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--surface)" }}>1</span>
                    </div>
                    <div style={{ fontSize: "15.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Hjertesag</div>
                    <div style={{ fontSize: "12.5px", lineHeight: 1.45, color: "var(--smh-muted)", marginTop: "4px" }}>Foreningen opretter formålet</div>
                  </div>

                  <Conn />

                  {/* 2 Støtteflow */}
                  <div style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "22px 14px 18px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
                    <div style={{ position: "relative", width: "52px", height: "52px", borderRadius: "15px", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand)", marginBottom: "14px" }}>
                      <Ic d='<circle cx="9" cy="7" r="4"/><path d="M3 21a6 6 0 0 1 12 0"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21a6 6 0 0 0-3-5.19"/>' size={25} />
                      <span style={{ position: "absolute", top: "-9px", right: "-9px", width: "23px", height: "23px", borderRadius: "50%", background: "var(--ink)", color: "#fff", fontSize: "11.5px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--surface)" }}>2</span>
                    </div>
                    <div style={{ fontSize: "15.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Støtteflow</div>
                    <div style={{ fontSize: "12.5px", lineHeight: 1.45, color: "var(--smh-muted)", marginTop: "4px" }}>Støtter vælger beløb</div>
                  </div>

                  <Conn color="#16A34A" />

                  {/* 3 Direkte betaling (green) */}
                  <div style={{ background: "#ECFDF3", border: "1.5px solid #BBF7D0", borderRadius: "18px", padding: "22px 14px 18px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
                    <div style={{ position: "relative", width: "52px", height: "52px", borderRadius: "15px", background: "var(--surface)", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center", color: "#15803D", marginBottom: "14px" }}>
                      <Ic d='<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/>' size={24} />
                      <span style={{ position: "absolute", top: "-9px", right: "-9px", width: "23px", height: "23px", borderRadius: "50%", background: "#16A34A", color: "#fff", fontSize: "11.5px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #ECFDF3" }}>3</span>
                    </div>
                    <div style={{ fontSize: "15.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Direkte betaling</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", lineHeight: 1.4, color: "#15803D", fontWeight: 700, marginTop: "4px" }}><Ic d='<path d="M20 6 9 17l-5-5"/>' size={12} sw={3} />100% til foreningen</div>
                  </div>

                  <Conn />

                  {/* 4 Dashboard */}
                  <div style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "22px 14px 18px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
                    <div style={{ position: "relative", width: "52px", height: "52px", borderRadius: "15px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)", marginBottom: "14px" }}>
                      <Ic d='<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>' size={24} />
                      <span style={{ position: "absolute", top: "-9px", right: "-9px", width: "23px", height: "23px", borderRadius: "50%", background: "var(--ink)", color: "#fff", fontSize: "11.5px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--surface)" }}>4</span>
                    </div>
                    <div style={{ fontSize: "15.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Dashboard</div>
                    <div style={{ fontSize: "12.5px", lineHeight: 1.45, color: "var(--smh-muted)", marginTop: "4px" }}>Overblik i realtid</div>
                  </div>

                  <Conn />

                  {/* 5 Regnskabsgrundlag */}
                  <div style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "22px 14px 18px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
                    <div style={{ position: "relative", width: "52px", height: "52px", borderRadius: "15px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)", marginBottom: "14px" }}>
                      <Ic d='<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/>' size={24} />
                      <span style={{ position: "absolute", top: "-9px", right: "-9px", width: "23px", height: "23px", borderRadius: "50%", background: "var(--ink)", color: "#fff", fontSize: "11.5px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--surface)" }}>5</span>
                    </div>
                    <div style={{ fontSize: "15.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Regnskabsgrundlag</div>
                    <div style={{ fontSize: "12.5px", lineHeight: 1.45, color: "var(--smh-muted)", marginTop: "4px" }}>Klar til revision</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FOR STØTTER (3 screens) ============ */}
        <section id="stoetter" className="svd-sec-pad" style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)", scrollMarginTop: "70px" }}>
          <div className="svd-wrap">
            <div style={{ maxWidth: "680px", margin: "0 auto 38px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "var(--brand)", marginBottom: "12px" }}>For støtter</div>
              <h2 style={{ margin: 0, fontSize: "clamp(25px,3.9vw,40px)", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>Vælg, beløb, godkend.</h2>
              <p style={{ margin: "15px auto 0", fontSize: "clamp(15.5px,2.2vw,17.5px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "520px" }}>Tre trin i appen. Du godkender betalingen i MobilePay, og bidraget går direkte til foreningens egen konto.</p>
            </div>

            <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "26px", boxShadow: "0 40px 90px -56px rgba(8,14,26,.36)", overflow: "hidden", animation: "svdRise .6s ease both" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "15px 22px", borderBottom: "1px solid var(--smh-border)", background: "linear-gradient(180deg,#fff,#FAFBFD)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "12px", fontWeight: 700, letterSpacing: ".5px", color: "var(--label)", textTransform: "uppercase" }}>
                  <Ic d='<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>' size={15} sw={2} />
                  Støtteflow
                </span>
                <span style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--smh-muted)" }}>Tre trin</span>
              </div>

              <div style={{ padding: "clamp(28px,4vw,48px) clamp(18px,3vw,40px)", background: "linear-gradient(180deg,#FBFCFE,#fff)" }}>
                <div className="svd-three">
                  {/* screen 1: vælg */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: "100%", maxWidth: "236px", background: "#fff", border: "1px solid var(--smh-border)", borderRadius: "22px", boxShadow: "0 20px 50px -34px rgba(8,14,26,.34)", overflow: "hidden" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 14px 7px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink)" }}>9:41</span>
                        <span style={{ width: "15px", height: "7px", border: "1px solid var(--label)", borderRadius: "2px", display: "inline-block" }} />
                      </div>
                      <div style={{ padding: "8px 16px 18px" }}>
                        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase", color: "var(--label)", marginBottom: "10px" }}>Vælg hjertesag</div>
                        <div style={{ border: "1px solid var(--smh-border)", borderRadius: "16px", overflow: "hidden" }}>
                          <div style={{ height: "74px", background: "linear-gradient(135deg,#FFE4E8,#FFF1F3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand)" }}>
                            <Ic d='<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>' size={28} fill="currentColor" />
                          </div>
                          <div style={{ padding: "12px 13px 14px" }}>
                            <div style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.2px", lineHeight: 1.25 }}>Nye fodboldmål til U13</div>
                            <div style={{ fontSize: "11px", color: "var(--smh-muted)", marginTop: "2px" }}>Boldklubben Fremad</div>
                            <div style={{ height: "6px", borderRadius: "999px", background: "var(--alt)", marginTop: "12px", overflow: "hidden" }}><div style={{ height: "100%", width: "68%", background: "var(--brand)", borderRadius: "999px" }} /></div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", fontWeight: 600, color: "var(--body)", marginTop: "7px" }}><span>12.400 kr</span><span style={{ color: "var(--smh-muted)" }}>mål 18.000</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "16px" }}><span style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--ink)" }}>1 · Vælg hjertesag</span></div>
                  </div>

                  <Conn />

                  {/* screen 2: beløb */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: "100%", maxWidth: "236px", background: "#fff", border: "1px solid var(--smh-border)", borderRadius: "22px", boxShadow: "0 20px 50px -34px rgba(8,14,26,.34)", overflow: "hidden" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 14px 7px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink)" }}>9:41</span>
                        <span style={{ width: "15px", height: "7px", border: "1px solid var(--label)", borderRadius: "2px", display: "inline-block" }} />
                      </div>
                      <div style={{ padding: "8px 16px 18px" }}>
                        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase", color: "var(--label)", marginBottom: "12px" }}>Vælg beløb</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                          <div style={{ border: "1px solid var(--smh-border)", borderRadius: "12px", padding: "11px 0", textAlign: "center", fontSize: "12.5px", fontWeight: 600, color: "var(--body)" }}>50 kr</div>
                          <div style={{ border: "1.5px solid var(--brand)", borderRadius: "12px", padding: "11px 0", textAlign: "center", fontSize: "12.5px", fontWeight: 700, color: "#fff", background: "var(--brand)", boxShadow: "0 8px 18px rgba(224,25,63,.24)" }}>100 kr</div>
                          <div style={{ border: "1px solid var(--smh-border)", borderRadius: "12px", padding: "11px 0", textAlign: "center", fontSize: "12.5px", fontWeight: 600, color: "var(--body)" }}>250 kr</div>
                          <div style={{ border: "1px solid var(--smh-border)", borderRadius: "12px", padding: "11px 0", textAlign: "center", fontSize: "12.5px", fontWeight: 600, color: "var(--body)" }}>500 kr</div>
                        </div>
                        <div style={{ marginTop: "11px", border: "1px dashed var(--smh-border)", borderRadius: "12px", padding: "11px 13px", fontSize: "12.5px", color: "var(--smh-muted)" }}>Andet beløb …</div>
                        <div style={{ marginTop: "14px", background: "var(--ink)", color: "#fff", borderRadius: "12px", padding: "12px 0", textAlign: "center", fontSize: "13.5px", fontWeight: 700 }}>Fortsæt</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "16px" }}><span style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--ink)" }}>2 · Vælg beløb</span></div>
                  </div>

                  <Conn />

                  {/* screen 3: godkend */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: "100%", maxWidth: "236px", background: "#fff", border: "1px solid var(--smh-border)", borderRadius: "22px", boxShadow: "0 20px 50px -34px rgba(8,14,26,.34)", overflow: "hidden" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 14px 7px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink)" }}>9:41</span>
                        <span style={{ width: "15px", height: "7px", border: "1px solid var(--label)", borderRadius: "2px", display: "inline-block" }} />
                      </div>
                      <div style={{ padding: "14px 16px 18px", textAlign: "center" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 800, letterSpacing: ".3px", color: "#15803D", background: "#ECFDF3", border: "1px solid #BBF7D0", padding: "5px 11px", borderRadius: "999px", marginBottom: "14px" }}>
                          <Ic d='<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>' size={12} sw={2.6} />
                          MobilePay
                        </div>
                        <div style={{ fontSize: "30px", fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)" }}>100 kr</div>
                        <div style={{ fontSize: "12px", color: "var(--smh-muted)", marginTop: "3px" }}>til Boldklubben Fremad</div>
                        <div style={{ marginTop: "18px", background: "#15803D", color: "#fff", borderRadius: "999px", padding: "13px 0", fontSize: "13.5px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}>
                          <Ic d='<path d="M20 6 9 17l-5-5"/>' size={15} sw={3} />Godkend
                        </div>
                        <div style={{ fontSize: "10.5px", color: "var(--label)", marginTop: "11px" }}>Direkte til foreningens egen konto</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "16px" }}><span style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--ink)" }}>3 · Godkend i MobilePay</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "38px" }}>
              <Link to="/hjertesager" className="svd-cta-w svd-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "16px 30px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 34px rgba(224,25,63,.24)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                Find en hjertesag
                <Ic d='<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>' size={16} sw={2.4} />
              </Link>
            </div>
          </div>
        </section>

        {/* ============ FOR FORENINGER (dashboard) ============ */}
        <section id="foreninger" className="svd-wrap svd-sec-pad" style={{ scrollMarginTop: "70px" }}>
          <div className="svd-fgrid">
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "var(--brand)", marginBottom: "12px" }}>For foreninger</div>
              <h2 style={{ margin: 0, fontSize: "clamp(25px,3.9vw,40px)", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>Fra oprettelse til dokumentation.</h2>
              <p style={{ margin: "16px 0 0", fontSize: "clamp(15.5px,2.2vw,17.5px)", lineHeight: 1.65, color: "var(--body)" }}>Fem trin i foreningens dashboard. CVR valideres automatisk, journalnummeret registreres, og alt samles til regnskabsgrundlaget undervejs.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "24px" }}>
                {[
                  ["CVR-validering", " bekræfter foreningen automatisk."],
                  ["Journalnummer", " kobles til den offentlige indsamling."],
                  ["Dokumentation", " samles løbende til regnskabet."],
                ].map(([b, rest]) => (
                  <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "11px" }}>
                    <span style={{ width: "24px", height: "24px", borderRadius: "7px", background: "#ECFDF3", color: "#15803D", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}><Ic d='<path d="M20 6 9 17l-5-5"/>' size={14} sw={2.6} /></span>
                    <span style={{ fontSize: "15px", lineHeight: 1.5, color: "var(--ink)" }}><b style={{ fontWeight: 700 }}>{b}</b>{rest}</span>
                  </div>
                ))}
              </div>
              <div className="svd-cta-row" style={{ marginTop: "28px" }}>
                <Link to="/opret-forening" className="svd-cta-w svd-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "15px 28px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 12px 30px rgba(224,25,63,.22)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  Opret forening
                  <Ic d='<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>' size={16} sw={2.4} />
                </Link>
                <Link to="/tilladelse-og-regnskab" className="svd-cta-w svd-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16px", fontWeight: 600, padding: "15px 28px", minHeight: "54px", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  Tilladelse og regnskab
                </Link>
              </div>
            </div>

            {/* dashboard device */}
            <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 44px 100px -54px rgba(8,14,26,.5)", border: "1px solid var(--smh-border)", background: "var(--surface)", animation: "svdRise .7s ease both" }}>
              <div style={{ background: "var(--navy1)", padding: "13px 18px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-.3px", color: "#fff" }}>StøtMedHjerte <span style={{ color: "#6B7A92", fontWeight: 500 }}>/ Foreningsadmin</span></span>
                <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#fff", background: "rgba(255,255,255,.12)", padding: "6px 12px", borderRadius: "999px" }}>Kom i gang</span>
                  <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--brand)", color: "#fff", fontSize: "11px", fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>BF</span>
                </span>
              </div>

              <div className="svd-dash">
                <div className="svd-dsb" style={{ background: "var(--navy2)", flexDirection: "column", alignItems: "center", gap: "8px", padding: "16px 0", borderRight: "1px solid rgba(255,255,255,.06)" }}>
                  <span style={{ width: "34px", height: "34px", borderRadius: "10px", background: "rgba(255,255,255,.06)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>' size={17} sw={2} /></span>
                  <span style={{ width: "34px", height: "34px", borderRadius: "10px", background: "var(--brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>' size={17} sw={2} /></span>
                  <span style={{ width: "34px", height: "34px", borderRadius: "10px", background: "rgba(255,255,255,.06)", color: "#9AA8BE", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>' size={17} sw={2} /></span>
                  <span style={{ width: "34px", height: "34px", borderRadius: "10px", background: "rgba(255,255,255,.06)", color: "#9AA8BE", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>' size={17} sw={2} /></span>
                </div>

                <div style={{ padding: "clamp(18px,2.4vw,26px)", background: "var(--surface)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "18px" }}>
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--label)" }}>Opsætning</div>
                      <div style={{ fontSize: "17px", fontWeight: 800, letterSpacing: "-.4px", color: "var(--ink)", marginTop: "2px" }}>Kom godt i gang</div>
                    </div>
                    <span style={{ fontSize: "11.5px", fontWeight: 800, color: "var(--brand)", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", padding: "6px 11px", borderRadius: "999px", whiteSpace: "nowrap" }}>Trin 3 af 5</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {/* 1 done */}
                    <div style={{ display: "flex", gap: "13px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#ECFDF3", border: "1.5px solid #BBF7D0", color: "#15803D", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic d='<path d="M20 6 9 17l-5-5"/>' size={15} sw={3} /></span>
                        <span style={{ flex: 1, width: "2px", background: "#BBF7D0", marginTop: "5px", minHeight: "16px" }} />
                      </div>
                      <div style={{ paddingBottom: "16px", flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}><span style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.2px" }}>Opret forening</span><span style={{ fontSize: "10.5px", fontWeight: 700, color: "#15803D" }}>Færdig</span></div>
                        <div style={{ fontSize: "12.5px", color: "var(--smh-muted)", marginTop: "2px" }}>CVR, kontaktperson og grundoplysninger.</div>
                      </div>
                    </div>
                    {/* 2 done */}
                    <div style={{ display: "flex", gap: "13px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#ECFDF3", border: "1.5px solid #BBF7D0", color: "#15803D", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic d='<path d="M20 6 9 17l-5-5"/>' size={15} sw={3} /></span>
                        <span style={{ flex: 1, width: "2px", background: "var(--brand)", marginTop: "5px", minHeight: "16px" }} />
                      </div>
                      <div style={{ paddingBottom: "16px", flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}><span style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.2px" }}>CVR-validering</span><span style={{ fontSize: "10.5px", fontWeight: 700, color: "#15803D" }}>Færdig</span></div>
                        <div style={{ fontSize: "12.5px", color: "var(--smh-muted)", marginTop: "2px" }}>Valideret mod CVR-registret.</div>
                      </div>
                    </div>
                    {/* 3 current */}
                    <div style={{ display: "flex", gap: "13px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "var(--brand)", color: "#fff", fontSize: "12.5px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 0 4px var(--brand-surface)" }}>3</span>
                        <span style={{ flex: 1, width: "2px", background: "var(--smh-border)", marginTop: "5px", minHeight: "16px" }} />
                      </div>
                      <div style={{ paddingBottom: "16px", flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}><span style={{ fontSize: "14.5px", fontWeight: 800, color: "var(--ink)", letterSpacing: "-.2px" }}>Journalnummer</span><span style={{ fontSize: "10.5px", fontWeight: 700, color: "var(--brand)" }}>I gang</span></div>
                        <div style={{ fontSize: "12.5px", color: "var(--smh-muted)", marginTop: "2px", marginBottom: "10px" }}>Registrér indsamlingens journalnummer.</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "11px", padding: "9px 12px" }}>
                          <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: ".4px", color: "var(--ink)" }}>24-0• ••••</span>
                          <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "10.5px", fontWeight: 700, color: "#15803D" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#16A34A" }} />Indsamlingsnævnet</span>
                        </div>
                      </div>
                    </div>
                    {/* 4 upcoming */}
                    <div style={{ display: "flex", gap: "13px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "var(--surface)", border: "1.5px solid var(--smh-border)", color: "var(--label)", fontSize: "12.5px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>4</span>
                        <span style={{ flex: 1, width: "2px", background: "var(--smh-border)", marginTop: "5px", minHeight: "16px" }} />
                      </div>
                      <div style={{ paddingBottom: "16px", flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}><span style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--body)", letterSpacing: "-.2px" }}>Opret hjertesag</span><span style={{ fontSize: "10.5px", fontWeight: 700, color: "var(--label)" }}>Afventer</span></div>
                        <div style={{ fontSize: "12.5px", color: "var(--smh-muted)", marginTop: "2px" }}>Beskriv formål og indsamlingsmål.</div>
                      </div>
                    </div>
                    {/* 5 upcoming */}
                    <div style={{ display: "flex", gap: "13px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "var(--surface)", border: "1.5px solid var(--smh-border)", color: "var(--label)", fontSize: "12.5px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>5</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}><span style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--body)", letterSpacing: "-.2px" }}>Dokumentation</span><span style={{ fontSize: "10.5px", fontWeight: 700, color: "var(--label)" }}>Afventer</span></div>
                        <div style={{ fontSize: "12.5px", color: "var(--smh-muted)", marginTop: "2px" }}>Saml bilag til regnskabsgrundlaget.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ HVORFOR (4 linkkort) ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="svd-wrap svd-sec-pad">
            <div style={{ maxWidth: "640px", marginBottom: "36px" }}>
              <h2 style={{ margin: 0, fontSize: "clamp(25px,3.9vw,40px)", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>Hvorfor det er bygget sådan.</h2>
              <p style={{ margin: "15px 0 0", fontSize: "clamp(15.5px,2.2vw,17.5px)", lineHeight: 1.6, color: "var(--body)" }}>Strukturen holder penge og platform adskilt, og gør foreningens regnskab enkelt. Læs mere om principperne bag.</p>
            </div>
            <div className="svd-linkgrid">
              <Link to="/den-rene-model" className="svd-linkcard" style={{ textDecoration: "none", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "22px 20px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 14px 40px -32px rgba(8,14,26,.18)" }}>
                <span style={{ width: "40px", height: "40px", borderRadius: "11px", background: "#ECFDF3", color: "#15803D", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="M3 12h18"/><path d="M14 7l5 5-5 5"/>' size={20} /></span>
                <span style={{ fontSize: "15.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Bidrag går direkte</span>
                <span style={{ fontSize: "13px", lineHeight: 1.5, color: "var(--body)", flex: 1 }}>Pengene går forbi os til foreningens egen konto.</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: 700, color: "var(--brand)" }}>Den rene model <Ic d='<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>' size={14} sw={2.4} /></span>
              </Link>
              <Link to="/priser" className="svd-linkcard" style={{ textDecoration: "none", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "22px 20px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 14px 40px -32px rgba(8,14,26,.18)" }}>
                <span style={{ width: "40px", height: "40px", borderRadius: "11px", background: "var(--brand-surface)", color: "var(--brand)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: "15px", fontWeight: 800, letterSpacing: "-.3px", lineHeight: 1 }}>kr.</span></span>
                <span style={{ fontSize: "15.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Fast pris, ingen andel</span>
                <span style={{ fontSize: "13px", lineHeight: 1.5, color: "var(--body)", flex: 1 }}>Et fast abonnement, vi tager ingen andel af donationerne.</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: 700, color: "var(--brand)" }}>Se priser <Ic d='<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>' size={14} sw={2.4} /></span>
              </Link>
              <Link to="/sikkerhed" className="svd-linkcard" style={{ textDecoration: "none", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "22px 20px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 14px 40px -32px rgba(8,14,26,.18)" }}>
                <span style={{ width: "40px", height: "40px", borderRadius: "11px", background: "var(--brand-surface)", color: "var(--brand)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>' size={20} /></span>
                <span style={{ fontSize: "15.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>CVR-valideret adgang</span>
                <span style={{ fontSize: "13px", lineHeight: 1.5, color: "var(--body)", flex: 1 }}>Kun bekræftede foreninger får adgang til at indsamle.</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: 700, color: "var(--brand)" }}>Sikkerhed <Ic d='<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>' size={14} sw={2.4} /></span>
              </Link>
              <Link to="/tilladelse-og-regnskab" className="svd-linkcard" style={{ textDecoration: "none", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "22px 20px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 14px 40px -32px rgba(8,14,26,.18)" }}>
                <span style={{ width: "40px", height: "40px", borderRadius: "11px", background: "var(--brand-surface)", color: "var(--brand)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/>' size={20} /></span>
                <span style={{ fontSize: "15.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Tilladelse og regnskab</span>
                <span style={{ fontSize: "13px", lineHeight: 1.5, color: "var(--body)", flex: 1 }}>Indsamlingsnævnet og regnskabsgrundlag forklaret.</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: 700, color: "var(--brand)" }}>Læs mere <Ic d='<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>' size={14} sw={2.4} /></span>
              </Link>
            </div>
          </div>
        </section>

        {/* ============ AFSLUTTENDE CTA ============ */}
        <section className="svd-wrap svd-sec-pad" style={{ textAlign: "center" }}>
          <h2 style={{ margin: "0 auto 22px", fontSize: "clamp(28px,4.6vw,42px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)", maxWidth: "620px", textWrap: "balance" }}>Klar til at komme i gang?</h2>
          <p style={{ margin: "0 auto 32px", fontSize: "clamp(16px,2.4vw,18px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "520px" }}>Opret jeres forening, eller find en hjertesag at støtte i dag.</p>
          <div className="svd-cta-row" style={{ justifyContent: "center" }}>
            <Link to="/opret-forening" className="svd-cta-w svd-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16.5px", fontWeight: 600, padding: "17px 34px", minHeight: "56px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 34px rgba(224,25,63,.24)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
            <Link to="/hjertesager" className="svd-cta-w svd-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16.5px", fontWeight: 600, padding: "17px 34px", minHeight: "56px", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Find hjertesag</Link>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
