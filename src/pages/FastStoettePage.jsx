import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./FastStoette.css";

function Ic({ d, size = 24, sw = 1.9, stroke = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={style} dangerouslySetInnerHTML={{ __html: d }} />
  );
}

const CARDS = [
  { title: "Forudsigelig økonomi", body: "Faste månedlige bidrag gør det lettere at lægge budget og planlægge aktiviteter.", d: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>' },
  { title: "Stabil opbakning", body: "Støtter bakker foreningen op løbende, ikke kun ved enkeltstående indsamlinger.", d: '<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1Z"/>' },
  { title: "Mindre administration", body: "Bidraget gentages automatisk via MobilePay-flowet, så I ikke skal følge op hver måned.", d: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.4 2.4L15.5 9.5"/>' },
];

const NOTES = [
  "Vælg et fast månedligt beløb.",
  "Godkend første gang i MobilePay, herefter gentages bidraget automatisk.",
  "Faste bidrag kan til enhver tid ændres eller stoppes efter MobilePays gældende flow.",
];

const WEEKDAYS = ["Ma", "Ti", "On", "To", "Fr", "Lø", "Sø"];

const CHECK = '<path d="M20 6 9 17l-5-5"/>';
const REPEAT = '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>';

const FLOW = [
  { m: "APR", received: true },
  { m: "MAJ", received: true },
  { m: "JUN", received: true },
  { m: "JUL", received: false },
];

const STATUS = [
  { ini: "LH", name: "Lene H.", amt: "100 kr", done: true },
  { ini: "MV", name: "Mads V.", amt: "150 kr", done: true },
  { ini: "KS", name: "Karen S.", amt: "75 kr", done: true },
  { ini: "JP", name: "Jonas P.", amt: "100 kr", done: false },
];

// kalender juni 2026, mandag-foerst, den 1. = tilbagevendende
function buildCalendar() {
  const Y = 2026, M = 5, RD = 1;
  const first = new Date(Y, M, 1);
  const startDow = (first.getDay() + 6) % 7;
  const dim = new Date(Y, M + 1, 0).getDate();
  const prevDim = new Date(Y, M, 0).getDate();
  const cells = [];
  for (let i = startDow - 1; i >= 0; i--) cells.push({ label: prevDim - i, muted: true });
  for (let d = 1; d <= dim; d++) cells.push({ label: d, rec: d === RD });
  let nx = 1;
  while (cells.length % 7 !== 0) cells.push({ label: nx++, muted: true });
  return cells;
}

export default function FastStoettePage() {
  const cells = buildCalendar();
  const dayBase = { height: "34px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12.5px", borderRadius: "10px" };

  return (
    <>
      <SiteNav />
      <main className="fs-page">

        {/* ============ HERO + MAANEDSKALENDER ============ */}
        <section className="fs-wrap" style={{ paddingTop: "clamp(40px,6vw,72px)", paddingBottom: "clamp(40px,6vw,72px)" }}>
          <div className="fs-hero-split">
            <div style={{ animation: "fsRise .6s ease both" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--label)", marginBottom: "18px" }}>Fast støtte</div>
              <h1 style={{ margin: "0 0 18px", fontSize: "clamp(30px,5vw,50px)", lineHeight: 1.07, fontWeight: 800, letterSpacing: "-1.4px", color: "var(--ink)", textWrap: "balance" }}>Gør støtte mere forudsigelig.</h1>
              <p style={{ margin: "0 0 22px", fontSize: "clamp(16px,2.4vw,18.5px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "520px" }}>Fast støtte er det samme beløb hver måned. Det giver foreningen et mere stabilt støtteflow og mere ro til at planlægge aktiviteter og budget.</p>
              <div className="fs-cta-row" style={{ marginBottom: "22px" }}>
                <Link to="/opret-forening" className="fs-cta-w fs-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "16px 28px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 32px rgba(224,25,63,.22)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret fast støtte</Link>
                <Link to="/priser" className="fs-cta-w fs-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16px", fontWeight: 600, padding: "16px 28px", minHeight: "54px", borderRadius: "999px", border: "1px solid var(--smh-border)", background: "var(--surface)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Se priser</Link>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--smh-muted)", fontSize: "14.5px" }}>
                <Ic d={REPEAT} size={18} sw={2.2} stroke="var(--success)" />
                <span>Godkendes én gang i MobilePay, gentages hver måned.</span>
              </div>
            </div>

            {/* Maanedskalender-mockup */}
            <div style={{ animation: "fsFloatIn .8s .1s ease both" }}>
              <div style={{ position: "relative", maxWidth: "440px", margin: "0 auto" }}>
                <div style={{ position: "absolute", inset: "-6% 0 -9% 0", background: "radial-gradient(56% 48% at 58% 34%, rgba(34,197,94,.18), transparent 72%)" }} />
                <div style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "26px", padding: "24px", boxShadow: "0 46px 92px -46px rgba(8,14,26,.34)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                      <span style={{ width: "38px", height: "38px", borderRadius: "12px", background: "var(--brand-surface)", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M16 2.5v4M8 2.5v4M3 9.5h18"/>' size={20} sw={2} /></span>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.2px" }}>Fast støtte</div>
                        <div style={{ fontSize: "12.5px", color: "var(--smh-muted)" }}>Den 1. hver måned</div>
                      </div>
                    </div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, color: "#166534", background: "#ECFDF3", border: "1px solid #BBF7D0", padding: "5px 11px", borderRadius: "999px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--success)" }} />Aktiv
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "20px 0 14px" }}>
                    <span style={{ width: "30px", height: "30px", borderRadius: "9px", border: "1px solid var(--smh-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--smh-muted)" }}><Ic d='<path d="m15 6-6 6 6 6"/>' size={15} sw={2.4} /></span>
                    <div style={{ fontSize: "15.5px", fontWeight: 800, letterSpacing: "-.3px", color: "var(--ink)" }}>Juni 2026</div>
                    <span style={{ width: "30px", height: "30px", borderRadius: "9px", border: "1px solid var(--smh-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--smh-muted)" }}><Ic d='<path d="m9 6 6 6-6 6"/>' size={15} sw={2.4} /></span>
                  </div>

                  <div className="fs-cal-wk">
                    {WEEKDAYS.map((w) => (
                      <span key={w} style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "var(--label)" }}>{w}</span>
                    ))}
                  </div>

                  <div className="fs-cal-grid">
                    {cells.map((c, i) => {
                      let extra;
                      if (c.muted) extra = { color: "var(--label)", opacity: .4, fontWeight: 500 };
                      else if (c.rec) extra = { background: "var(--success)", color: "#fff", fontWeight: 800, boxShadow: "0 8px 16px -4px rgba(34,197,94,.55)" };
                      else extra = { color: "var(--ink)", fontWeight: 600 };
                      return <span key={i} style={{ ...dayBase, ...extra }}>{c.label}</span>;
                    })}
                  </div>

                  <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: "1px dashed var(--smh-border)" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "var(--label)", marginBottom: "11px" }}>Månedligt flow</div>
                    <div className="fs-flow-strip">
                      {FLOW.map((f) => (
                        <div key={f.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "7px", padding: "11px 4px", borderRadius: "13px", ...(f.received ? { background: "#F0FBF4", border: "1px solid #CFF0DA" } : { background: "var(--alt)", border: "1px solid var(--smh-border)" }) }}>
                          <span style={{ width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", ...(f.received ? { background: "var(--success)", color: "#fff" } : { background: "#fff", border: "1px solid var(--smh-border)", color: "var(--smh-muted)" }) }}><Ic d={f.received ? CHECK : REPEAT} size={13} sw={2.6} /></span>
                          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".4px", color: f.received ? "#166534" : "var(--smh-muted)" }}>{f.m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: "18px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 17px", borderRadius: "16px", background: "var(--alt)", border: "1px solid var(--smh-border)" }}>
                    <div>
                      <div style={{ fontSize: "12px", color: "var(--smh-muted)", fontWeight: 600 }}>Månedligt beløb</div>
                      <div style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-.6px", color: "var(--ink)" }}>100 kr<span style={{ fontSize: "14px", color: "var(--smh-muted)", fontWeight: 600 }}>/md</span></div>
                    </div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12.5px", fontWeight: 700, color: "#166534", background: "#ECFDF3", border: "1px solid #BBF7D0", padding: "6px 12px", borderRadius: "999px" }}>
                      <Ic d={CHECK} size={13} sw={2.6} />Modtaget i juni
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ MERE RO ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="fs-wrap fs-sec-pad">
            <div style={{ maxWidth: "720px" }}>
              <h2 style={{ margin: "0 0 14px", fontSize: "clamp(24px,3.6vw,34px)", lineHeight: 1.15, fontWeight: 800, letterSpacing: "-.7px", color: "var(--ink)", textWrap: "balance" }}>Mere ro i planlægningen</h2>
              <p style={{ margin: 0, fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.7, color: "var(--body)" }}>Når en del af støtten kommer fast hver måned, er der mindre at gætte på. Foreningen kan planlægge aktiviteter ud fra et mere stabilt grundlag, frem for kun at læne sig op ad enkeltstående indsamlinger.</p>
            </div>
          </div>
        </section>

        {/* ============ HVAD FAST STOETTE GIVER ============ */}
        <section className="fs-wrap fs-sec-pad">
          <div style={{ maxWidth: "720px", marginBottom: "40px" }}>
            <h2 style={{ margin: "0 0 14px", fontSize: "clamp(24px,3.6vw,34px)", lineHeight: 1.15, fontWeight: 800, letterSpacing: "-.7px", color: "var(--ink)", textWrap: "balance" }}>Hvad fast støtte giver foreningen</h2>
            <p style={{ margin: 0, fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.7, color: "var(--body)" }}>Fast støtte præsenteres som en tydelig mulighed ved siden af konkrete hjertesager. Støtten vælger et månedligt beløb og godkender flowet i MobilePay, hvis løsningen er aktiveret for foreningen.</p>
          </div>
          <div className="fs-three">
            {CARDS.map((c) => (
              <div key={c.title} style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "22px", padding: "28px", boxShadow: "0 14px 40px -30px rgba(8,14,26,.14)" }}>
                <span style={{ display: "inline-flex", width: "48px", height: "48px", borderRadius: "14px", background: "var(--alt)", alignItems: "center", justifyContent: "center", color: "var(--ink)", marginBottom: "18px" }}><Ic d={c.d} size={24} /></span>
                <h3 style={{ margin: "0 0 8px", fontSize: "17.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>{c.title}</h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: 1.6, color: "var(--body)" }}>{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ OVERBLIK DASHBOARD ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="fs-wrap fs-sec-pad">
            <div style={{ maxWidth: "720px", marginBottom: "clamp(32px,4vw,44px)" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--label)", marginBottom: "14px" }}>Overblik</div>
              <h2 style={{ margin: "0 0 14px", fontSize: "clamp(24px,3.6vw,34px)", lineHeight: 1.15, fontWeight: 800, letterSpacing: "-.7px", color: "var(--ink)", textWrap: "balance" }}>Overblik for foreningen</h2>
              <p style={{ margin: 0, fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.7, color: "var(--body)" }}>Fast støtte samles med foreningens øvrige aktivitet i ét overblik: aktive faste støtter, månedlig støtte, udvikling over tid og status på de seneste bidrag.</p>
            </div>

            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "4% 0 -8% 0", background: "radial-gradient(60% 60% at 72% 18%, rgba(34,197,94,.12), transparent 70%)" }} />
              <div style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "24px", boxShadow: "0 50px 100px -52px rgba(8,14,26,.4)", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", borderBottom: "1px solid var(--smh-border)", background: "var(--page)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "var(--brand)" }} />
                    <span style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.2px" }}>Fast støtte · Overblik</span>
                  </div>
                  <span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--smh-muted)", background: "var(--surface)", border: "1px solid var(--smh-border)", padding: "6px 12px", borderRadius: "999px" }}>Seneste 6 måneder</span>
                </div>

                <div className="fs-dash-grid" style={{ padding: "clamp(16px,2.4vw,22px)" }}>
                  <div style={{ background: "var(--page)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "20px" }}>
                    <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--smh-muted)", marginBottom: "12px" }}>Aktive faste støtter</div>
                    <div style={{ fontSize: "34px", fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)", lineHeight: 1 }}>128</div>
                    <div style={{ marginTop: "13px", display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12.5px", fontWeight: 700, color: "#166534", background: "#ECFDF3", border: "1px solid #BBF7D0", padding: "4px 9px", borderRadius: "999px" }}>
                      <Ic d='<path d="M7 17 17 7M9 7h8v8"/>' size={12} sw={2.6} />+6 i juni
                    </div>
                  </div>

                  <div style={{ background: "var(--page)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "20px" }}>
                    <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--smh-muted)", marginBottom: "12px" }}>Månedlig støtte</div>
                    <div style={{ fontSize: "34px", fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)", lineHeight: 1 }}>14.200<span style={{ fontSize: "16px", color: "var(--smh-muted)", fontWeight: 700 }}> kr</span></div>
                    <div style={{ marginTop: "14px", fontSize: "12.5px", color: "var(--smh-muted)", fontWeight: 500 }}>Ca. 111 kr pr. fast støtte</div>
                  </div>

                  <div style={{ background: "var(--page)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "20px", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                      <span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--smh-muted)" }}>Udvikling</span>
                      <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#166534" }}>Aktive støtter</span>
                    </div>
                    <div style={{ flex: 1, minHeight: "92px" }}>
                      <svg viewBox="0 0 320 110" width="100%" height="100%" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
                        <path d="M12,90 L72,72 L132,61 L192,45 L252,34 L312,18 L312,104 L12,104 Z" fill="rgba(34,197,94,.12)" />
                        <path d="M12,90 L72,72 L132,61 L192,45 L252,34 L312,18" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="312" cy="18" r="4.5" fill="#22C55E" />
                      </svg>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "10.5px", fontWeight: 600, color: "var(--label)" }}>
                      <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAJ</span><span>JUN</span>
                    </div>
                  </div>

                  <div className="fs-dash-span" style={{ background: "var(--page)", border: "1px solid var(--smh-border)", borderRadius: "18px", overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px 12px" }}>
                      <span style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--ink)" }}>Status · seneste bidrag</span>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--smh-muted)" }}>Den 1. hver måned</span>
                    </div>
                    {STATUS.map((r, i) => (
                      <div key={r.ini} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "13px", padding: "12px 16px", ...(i > 0 ? { borderTop: "1px solid var(--smh-border)" } : {}) }}>
                        <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "var(--brand-surface)", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12.5px", fontWeight: 700, flexShrink: 0 }}>{r.ini}</span>
                        <div style={{ flex: 1, minWidth: "120px" }}>
                          <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>{r.name}</div>
                          <div style={{ fontSize: "12px", color: "var(--smh-muted)" }}>Fast støtte · den 1.</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "auto" }}>
                          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", whiteSpace: "nowrap" }}>{r.amt}</span>
                          {r.done ? (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: 700, color: "#166534", background: "#ECFDF3", border: "1px solid #BBF7D0", padding: "5px 10px", borderRadius: "999px", whiteSpace: "nowrap" }}><Ic d={CHECK} size={13} sw={2.6} />Modtaget</span>
                          ) : (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: 700, color: "#92400E", background: "#FEF3C7", border: "1px solid #FDE68A", padding: "5px 10px", borderRadius: "999px", whiteSpace: "nowrap" }}><Ic d={REPEAT} size={13} sw={2.6} />Planlagt 1. jul</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ IKKE EN PROFILBARRIERE (NAVY) ============ */}
        <section style={{ background: "var(--navy1)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-120px", right: "-80px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.14),transparent 65%)" }} />
          <div className="fs-wrap" style={{ position: "relative", paddingTop: "clamp(64px,9vw,104px)", paddingBottom: "clamp(64px,9vw,104px)" }}>
            <div style={{ maxWidth: "760px" }}>
              <h2 style={{ margin: "0 0 16px", fontSize: "clamp(26px,4.2vw,40px)", lineHeight: 1.13, fontWeight: 800, letterSpacing: "-1px", color: "#fff", textWrap: "balance" }}>Ikke en profilbarriere</h2>
              <p style={{ margin: "0 0 30px", fontSize: "clamp(16px,2.4vw,19px)", lineHeight: 1.65, color: "#AEB9CC" }}>Fast støtte må ikke føles tungt for støtten. Flowet skal være kort, genkendeligt og uden krav om en støtteprofil på StøtMedHjerte, godkendelsen sker i MobilePay, præcis som ved et engangsbidrag.</p>
              <Link to="/for-stoetter" className="fs-btn-navy" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#fff", fontSize: "15.5px", fontWeight: 600, padding: "14px 26px", minHeight: "50px", borderRadius: "999px", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.16)" }}>Sådan støtter du<Ic d='<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>' size={16} sw={2.2} /></Link>
            </div>
          </div>
        </section>

        {/* ============ MICROCOPY ============ */}
        <section className="fs-wrap" style={{ paddingTop: "clamp(48px,7vw,80px)", paddingBottom: "clamp(48px,7vw,80px)" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto", background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "20px", padding: "clamp(22px,3vw,28px)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {NOTES.map((n) => (
                <div key={n} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <Ic d={CHECK} size={20} sw={2.4} stroke="var(--success)" style={{ flexShrink: 0, marginTop: "1px" }} />
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
