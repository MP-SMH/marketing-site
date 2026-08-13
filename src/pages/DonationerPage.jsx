import React, { useState } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./Donationer.css";

function Ic({ d, size = 24, sw = 1.9, stroke = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={style} dangerouslySetInnerHTML={{ __html: d }} />
  );
}

const OPTS = [
  { k: "50", label: "50 kr", val: 50 },
  { k: "100", label: "100 kr", val: 100 },
  { k: "200", label: "200 kr", val: 200 },
  { k: "custom", label: "Valgfrit", val: 350 },
];

const STEPS = [
  { n: "1", title: "Vælg en hjertesag", body: "Find det formål eller den forening, du vil støtte." },
  { n: "2", title: "Vælg beløb", body: "Vælg det engangsbeløb, der passer til dig." },
  { n: "3", title: "Godkend i MobilePay", body: "Du godkender betalingen i MobilePay-appen, og bidraget går direkte til foreningens egen konto." },
];

const CARDS = [
  { title: "Beløb", body: "Se bidrag knyttet til den konkrete hjertesag.", d: '<text x="12" y="12" text-anchor="middle" dominant-baseline="central" fill="currentColor" stroke="none" font-family="Inter, system-ui, sans-serif" font-size="15.5" font-weight="700" letter-spacing="-.5">kr</text>' },
  { title: "Status", body: "Følg indsamlingens fremdrift mod målet.", d: '<path d="M3 3v18h18"/><path d="m7 14 3-4 3 2 4-6"/>' },
  { title: "Grundlag", body: "Saml oplysninger, der kan bruges i foreningens videre arbejde.", d: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>' },
];

const NOTES = [
  "Beløbet godkendes i MobilePay.",
  "Donationer går direkte til foreningens egen MobilePay-konto.",
  "Abonnement betales separat af foreningen.",
];

const FLOW = [
  { trin: "Trin 1", title: "Hjertesag", body: "Støtten finder en sag at støtte.", d: '<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1Z"/>' },
  { trin: "Trin 2", title: "Beløb", body: "Vælger et fast eller frit beløb.", d: '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.4v5.2M18 9.4v5.2"/>' },
  { trin: "Trin 3", title: "Godkendelse", body: "Godkender bidraget i sin betalingsapp.", d: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.4 2.4L15.5 9.5"/>' },
];

export default function DonationerPage() {
  const [sel, setSel] = useState("200");
  const cur = OPTS.find((o) => o.k === sel) || OPTS[2];
  const amtFmt = cur.val.toLocaleString("da-DK");

  return (
    <>
      <SiteNav />
      <main className="don-page">

        {/* ============ HERO + DONATIONS-MOCKUP ============ */}
        <section className="don-wrap" style={{ paddingTop: "clamp(40px,6vw,72px)", paddingBottom: "clamp(40px,6vw,72px)" }}>
          <div className="don-hero-split">
            <div style={{ animation: "donRise .6s ease both" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--label)", marginBottom: "18px" }}>Donationer</div>
              <h1 style={{ margin: "0 0 18px", fontSize: "clamp(30px,5vw,50px)", lineHeight: 1.07, fontWeight: 800, letterSpacing: "-1.4px", color: "var(--ink)", textWrap: "balance" }}>Engangsbidrag gjort enkelt.</h1>
              <p style={{ margin: "0 0 22px", fontSize: "clamp(16px,2.4vw,18.5px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "520px" }}>Støtter vælger en hjertesag, vælger beløb og godkender bidraget i MobilePay-appen. Bidraget går direkte til foreningens egen MobilePay-konto.</p>
              <div className="don-cta-row" style={{ marginBottom: "22px" }}>
                <Link to="/opret-forening" className="don-cta-w don-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "16px 28px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 32px rgba(224,25,63,.22)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
                <Link to="/hjertesager" className="don-cta-w don-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16px", fontWeight: 600, padding: "16px 28px", minHeight: "54px", borderRadius: "999px", border: "1px solid var(--smh-border)", background: "var(--surface)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret hjertesag</Link>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--smh-muted)", fontSize: "14.5px" }}>
                <Ic d='<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>' size={18} sw={2.2} stroke="var(--success)" />
                <span>Donationer går direkte til foreningens egen MobilePay-konto.</span>
              </div>
            </div>

            {/* 3D telefon med beloebs-vaelger */}
            <div style={{ animation: "donFloatIn .8s .1s ease both" }}>
              <div className="don-phone">
                <div style={{ position: "absolute", inset: "-6% -5% -9% -5%", background: "radial-gradient(58% 50% at 66% 38%, rgba(224,25,63,.16), transparent 72%)" }} />
                <div className="don-phone-2d">
                  <div style={{ position: "relative", borderRadius: "48px", background: "linear-gradient(155deg,#1A2335,#0B1424)", padding: "12px", boxShadow: "0 50px 90px -32px rgba(8,14,26,.55),0 0 0 1px rgba(255,255,255,.06) inset,0 1px 2px rgba(255,255,255,.1) inset" }}>
                    <div style={{ position: "absolute", left: "-2px", top: "104px", width: "3px", height: "30px", borderRadius: "3px 0 0 3px", background: "#070C16" }} />
                    <div style={{ position: "absolute", left: "-3px", top: "150px", width: "3px", height: "50px", borderRadius: "3px 0 0 3px", background: "#070C16" }} />
                    <div style={{ position: "absolute", left: "-3px", top: "212px", width: "3px", height: "50px", borderRadius: "3px 0 0 3px", background: "#070C16" }} />
                    <div style={{ position: "absolute", right: "-3px", top: "172px", width: "3px", height: "72px", borderRadius: "0 3px 3px 0", background: "#070C16" }} />
                    <div style={{ position: "relative", background: "#fff", borderRadius: "37px", overflow: "hidden" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 26px 0" }}>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink)", letterSpacing: ".3px" }}>9:41</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--ink)" }}>
                          <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="4.5" y="5.5" width="3" height="6.5" rx="1" /><rect x="9" y="3" width="3" height="9" rx="1" /><rect x="13.5" y="0" width="3" height="12" rx="1" /></svg>
                          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M1 4.2C3 2.3 5.4 1.3 8 1.3s5 1 7 2.9" /><path d="M3.4 6.9C4.7 5.7 6.3 5 8 5s3.3.7 4.6 1.9" /><path d="M5.9 9.5c.6-.6 1.3-.9 2.1-.9s1.5.3 2.1.9" /></svg>
                          <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="1" y="1" width="21" height="11" rx="3" stroke="currentColor" strokeWidth="1.2" opacity=".45" /><rect x="3" y="3" width="15" height="7" rx="1.5" fill="currentColor" /><rect x="23.5" y="4.2" width="2" height="4.6" rx="1" fill="currentColor" opacity=".45" /></svg>
                        </div>
                      </div>
                      <div style={{ padding: "18px 20px 32px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--label)" }}>
                          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)" }} />Engangsbidrag
                        </div>
                        <div style={{ marginTop: "7px", fontSize: "20px", fontWeight: 800, letterSpacing: "-.5px", color: "var(--ink)" }}>Vælg dit beløb</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "18px" }}>
                          {OPTS.map((o) => (
                            <button key={o.k} type="button" onClick={() => setSel(o.k)} className={`don-chip ${o.k === sel ? "don-chip-on" : "don-chip-off"}`}>{o.label}</button>
                          ))}
                        </div>
                        <div style={{ marginTop: "18px", paddingTop: "16px", borderTop: "1px dashed var(--smh-border)", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                          <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--smh-muted)" }}>Dit bidrag</span>
                          <span style={{ fontSize: "27px", fontWeight: 800, letterSpacing: "-.7px", color: "var(--ink)" }}><span>{amtFmt}</span> kr</span>
                        </div>
                        <button type="button" style={{ marginTop: "16px", width: "100%", minHeight: "54px", border: "none", borderRadius: "15px", background: "var(--brand)", color: "#fff", fontFamily: "inherit", fontSize: "16px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px", boxShadow: "0 16px 32px rgba(224,25,63,.28)" }}>
                          <Ic d='<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.4 2.4L15.5 9.5"/>' size={19} sw={2.3} />Godkend i app
                        </button>
                        <div style={{ marginTop: "13px", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", color: "var(--smh-muted)", fontSize: "12.5px" }}>
                          <Ic d='<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>' size={13} sw={2} />Anonymt · ingen profil
                        </div>
                      </div>
                    </div>
                    <div style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", width: "92px", height: "27px", borderRadius: "99px", background: "#05080F", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "11px" }}>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#0E1726", boxShadow: "0 0 0 1.5px #060B14,inset 0 0 2px rgba(80,120,200,.5)" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ DONATIONER UDEN EKSTRA TRIN ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="don-wrap don-sec-pad">
            <div style={{ maxWidth: "720px" }}>
              <h2 style={{ margin: "0 0 14px", fontSize: "clamp(24px,3.6vw,34px)", lineHeight: 1.15, fontWeight: 800, letterSpacing: "-.7px", color: "var(--ink)", textWrap: "balance" }}>Donationer uden ekstra trin for støtten</h2>
              <p style={{ margin: 0, fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.7, color: "var(--body)" }}>Støtter vælger en hjertesag, vælger beløb og godkender bidraget i MobilePay-appen. Bidraget går direkte til foreningens egen MobilePay-konto.</p>
            </div>
          </div>
        </section>

        {/* ============ SAADAN GIVES ET ENGANGSBIDRAG ============ */}
        <section className="don-wrap don-sec-pad">
          <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 40px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--label)", marginBottom: "14px" }}>Sådan gør du</div>
            <h2 style={{ margin: 0, fontSize: "clamp(26px,4.2vw,38px)", lineHeight: 1.14, fontWeight: 800, letterSpacing: "-.8px", color: "var(--ink)", textWrap: "balance" }}>Sådan gives et engangsbidrag.</h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
            {STEPS.map((s) => (
              <div key={s.n} className="don-step-card" style={{ flex: 1, minWidth: "240px", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "24px", padding: "30px 28px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "var(--ink)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 800, marginBottom: "18px" }}>{s.n}</div>
                <h3 style={{ margin: "0 0 9px", fontSize: "18.5px", fontWeight: 700, letterSpacing: "-.4px", color: "var(--ink)" }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.6, color: "var(--body)" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ OVERBLIK FOR FORENINGEN ============ */}
        <section className="don-wrap don-sec-pad">
          <div style={{ maxWidth: "720px", marginBottom: "40px" }}>
            <h2 style={{ margin: "0 0 14px", fontSize: "clamp(24px,3.6vw,34px)", lineHeight: 1.15, fontWeight: 800, letterSpacing: "-.7px", color: "var(--ink)", textWrap: "balance" }}>Overblik for foreningen</h2>
            <p style={{ margin: 0, fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.7, color: "var(--body)" }}>Foreningen får et samlet overblik over hjertesag, bidrag, status og relevant dokumentation. Det gør det lettere at følge indsamlingen og samle grundlaget bagefter.</p>
          </div>
          <div className="don-three">
            {CARDS.map((c) => (
              <div key={c.title} style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "22px", padding: "28px", boxShadow: "0 14px 40px -30px rgba(8,14,26,.14)" }}>
                <span style={{ display: "inline-flex", width: "48px", height: "48px", borderRadius: "14px", background: "var(--alt)", alignItems: "center", justifyContent: "center", color: "var(--ink)", marginBottom: "18px" }}><Ic d={c.d} size={24} /></span>
                <h3 style={{ margin: "0 0 8px", fontSize: "17.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>{c.title}</h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: 1.6, color: "var(--body)" }}>{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ DIREKTE TIL FORENINGEN (NAVY FLOW) ============ */}
        <section style={{ background: "var(--navy1)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-120px", right: "-80px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.14),transparent 65%)" }} />
          <div className="don-wrap" style={{ position: "relative", paddingTop: "clamp(64px,9vw,104px)", paddingBottom: "clamp(64px,9vw,104px)" }}>
            <div style={{ maxWidth: "760px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#FF8FA3", marginBottom: "14px" }}>Pengenes vej</div>
              <h2 style={{ margin: "0 0 16px", fontSize: "clamp(26px,4.2vw,40px)", lineHeight: 1.13, fontWeight: 800, letterSpacing: "-1px", color: "#fff", textWrap: "balance" }}>Direkte til foreningen</h2>
              <p style={{ margin: 0, fontSize: "clamp(16px,2.4vw,19px)", lineHeight: 1.65, color: "#AEB9CC" }}>Der er ingen mellemmand, der holder på pengene. Når støtten godkender bidraget, går det direkte til foreningens egen MobilePay-konto.</p>
            </div>

            <div className="don-flow-rail" style={{ marginTop: "clamp(34px,5vw,52px)", maxWidth: "1060px" }}>
              {FLOW.map((f, i) => (
                <React.Fragment key={f.title}>
                  <div className="don-flow-node" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "20px", padding: "24px 22px" }}>
                    <div style={{ width: "46px", height: "46px", borderRadius: "14px", background: "rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><Ic d={f.d} size={23} /></div>
                    <div style={{ marginTop: "16px", fontSize: "12px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "#6B7A92" }}>{f.trin}</div>
                    <div style={{ marginTop: "5px", fontSize: "17.5px", fontWeight: 800, letterSpacing: "-.3px", color: "#fff" }}>{f.title}</div>
                    <p style={{ margin: "7px 0 0", fontSize: "13.5px", lineHeight: 1.5, color: "#AEB9CC" }}>{f.body}</p>
                  </div>
                  <div className="don-flow-arrow"><Ic d='<path d="m9 6 6 6-6 6"/>' size={26} sw={2.2} /></div>
                </React.Fragment>
              ))}
              {/* Modtager-node (groen, pulse) */}
              <div className="don-flow-node" style={{ background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.28)", borderRadius: "20px", padding: "24px 22px" }}>
                <div className="don-pulse" style={{ animation: "donPulse 2.6s ease-out infinite", width: "46px", height: "46px", borderRadius: "14px", background: "rgba(34,197,94,.16)", display: "flex", alignItems: "center", justifyContent: "center", color: "#22C55E" }}><Ic d='<path d="M3 10.5 12 4l9 6.5M5 10v9M19 10v9M9.5 10v9M14.5 10v9M3 21h18"/>' size={23} stroke="#22C55E" /></div>
                <div style={{ marginTop: "16px", fontSize: "12px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "#5FA77C" }}>Modtager</div>
                <div style={{ marginTop: "5px", fontSize: "17.5px", fontWeight: 800, letterSpacing: "-.3px", color: "#fff" }}>Foreningens egen konto</div>
                <p style={{ margin: "7px 0 0", fontSize: "13.5px", lineHeight: 1.5, color: "#AEB9CC" }}>Bidraget lander på foreningens egen MobilePay-konto.</p>
              </div>
            </div>

            <div style={{ marginTop: "clamp(30px,4vw,42px)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 24px" }}>
              <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.6, color: "#AEB9CC", maxWidth: "540px" }}>StøtMedHjerte tager ingen andel af donationerne. Foreningen betaler et fast abonnement, ikke en procentdel.</p>
              <Link to="/priser" style={{ textDecoration: "none", color: "#fff", fontSize: "15px", fontWeight: 600, padding: "13px 24px", minHeight: "48px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 30px rgba(224,25,63,.26)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }} className="don-btn-brand">Se priser <Ic d='<path d="M5 12h13M13 6l6 6-6 6"/>' size={17} sw={2.3} /></Link>
            </div>
          </div>
        </section>

        {/* ============ MICROCOPY ============ */}
        <section className="don-wrap" style={{ paddingTop: "clamp(48px,7vw,80px)", paddingBottom: "clamp(48px,7vw,80px)" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto", background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "20px", padding: "clamp(22px,3vw,28px)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {NOTES.map((n) => (
                <div key={n} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <Ic d='<path d="M20 6 9 17l-5-5"/>' size={20} sw={2.4} stroke="var(--success)" style={{ flexShrink: 0, marginTop: "1px" }} />
                  <span style={{ fontSize: "15.5px", lineHeight: 1.5, color: "var(--body)", fontWeight: 500 }}>{n}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
