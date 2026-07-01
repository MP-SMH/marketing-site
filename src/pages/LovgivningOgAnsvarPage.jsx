import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./LovgivningOgAnsvar.css";

function Ic({ d, size = 24, sw = 1.9, stroke = "currentColor", fill = "none", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={fill === "none" ? stroke : "none"} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={style} dangerouslySetInnerHTML={{ __html: d }} />
  );
}

const CHECK = '<path d="M20 6 9 17l-5-5"/>';
const ARROW_R = '<path d="M5 12h14M13 6l6 6-6 6"/>';
const ARROW_H = '<path d="M5 12h14M13 6l6 6-6 6"/>';
const ARROW_V = '<path d="M12 5v14M6 13l6 6 6-6"/>';
const MINUS = '<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>';

const HERO_PILLS = ["Foreningen er ansvarlig indsamler", "StøtMedHjerte er ikke indsamler", "Bidrag går direkte til foreningens MobilePay"];

const PLATFORM = [
  ["01", "Hjertesager", "Konkrete formål med målbeløb, fortælling og status."],
  ["02", "Journalnummer", "Journalnummer kan knyttes til den relevante hjertesag."],
  ["03", "Dokumentation", "Bidrag og status samles undervejs."],
  ["04", "Regnskabsgrundlag", "Grundlaget er samlet, når indsamlingen skal gøres op."],
];

const NOT_GRID = ["Søger ikke tilladelse på foreningens vegne", "Garanterer ikke juridisk compliance", "Håndterer ikke donorbetalingen", "Opbevarer ikke kort-, bank- eller kontooplysninger"];

const HSAGER = [
  { title: "Nyt udstyr", d: '<path d="m2 7 10-4 10 4-10 4Z"/><path d="m2 7v10l10 4 10-4V7"/>' },
  { title: "Medlemsaktivitet", d: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>' },
  { title: "Fællesskabsprojekt", d: '<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1Z"/>' },
  { title: "Forbedring af rammer", d: '<path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/>' },
];

const TABLE = [
  { sag: "Nyt udstyr", amt: "18.450 kr.", jnr: "IN-2026-0142", status: "Aktiv", statusColor: "#15803D", grundlag: "Samlet", grundlagColor: "var(--smh-muted)" },
  { sag: "Medlemsaktivitet", amt: "9.800 kr.", jnr: "IN-2026-0142", status: "Aktiv", statusColor: "#15803D", grundlag: "Samlet", grundlagColor: "var(--smh-muted)" },
  { sag: "Fællesskabsprojekt", amt: "24.200 kr.", jnr: "IN-2026-0142", status: "Afsluttet", statusColor: "var(--label)", grundlag: "Klar", grundlagColor: "var(--brand)" },
];

const READ_MORE = [
  { to: "/tilladelse-og-regnskab", title: "Tilladelse og regnskab", body: "Læs om ansøgning, journalnummer, regnskab og revision efter indsamlingen.", cta: "Læs om tilladelse og regnskab", d: '<path d="M4 2h11l5 5v15H4Z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/>' },
  { to: "/den-rene-model", title: "Den rene model", body: "Se hvordan bidrag går direkte til foreningens egen MobilePay-konto.", cta: "Læs om den rene model", d: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M21 12h-6a2 2 0 0 0 0 4h6Z"/>' },
  { to: "/opret-forening", title: "Opret forening", body: "Kom i gang med hjertesager, donationer, fast støtte og regnskabsgrundlag samlet ét sted.", cta: "Opret forening", d: '<path d="M5 12h14M12 5v14"/>' },
];

function TrackArrow({ green }) {
  const col = green ? "#15803D" : "var(--brand)";
  return (
    <>
      <div className="lov-arr-h" style={{ color: col, padding: "0 3px" }}><Ic d={ARROW_H} size={15} sw={2.2} /></div>
      <div className="lov-arr-v" style={{ color: col }}><Ic d={ARROW_V} size={15} sw={2.2} /></div>
    </>
  );
}

export default function LovgivningOgAnsvarPage() {
  return (
    <>
      <SiteNav />
      <main className="lov-page">

        {/* ============ HERO ============ */}
        <section className="lov-wrap" style={{ paddingTop: "clamp(36px,4.5vw,60px)", paddingBottom: "clamp(30px,4vw,56px)" }}>
          <div className="lov-hero-grid">
            <div style={{ animation: "lovRise .6s ease both" }}>
              <div className="lov-eyebrow" style={{ marginBottom: "16px" }}>Lovgivning og ansvar</div>
              <h1 style={{ margin: "0 0 18px", fontSize: "clamp(33px,5vw,56px)", lineHeight: 1.04, fontWeight: 800, letterSpacing: "-1.4px", color: "var(--ink)", textWrap: "balance" }}>Klar ansvarsfordeling giver bedre overblik.</h1>
              <p style={{ margin: "0 0 28px", maxWidth: "550px", fontSize: "clamp(16.5px,2.2vw,18.5px)", lineHeight: 1.62, color: "var(--body)", textWrap: "pretty" }}>Når en forening samler penge ind offentligt, er det vigtigt at vide, hvem der har ansvaret for hvad. StøtMedHjerte giver struktur omkring hjertesager, journalnummer, dokumentation og regnskabsgrundlag. Foreningen er selv ansvarlig indsamler.</p>
              <div className="lov-cta-row" style={{ marginBottom: "28px" }}>
                <Link to="/tilladelse-og-regnskab" className="lov-cta-w lov-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "15.5px", fontWeight: 600, padding: "14px 26px", minHeight: "52px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 12px 30px rgba(224,25,63,.22)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Læs om tilladelse og regnskab</Link>
                <Link to="/opret-forening" className="lov-cta-w lov-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "15.5px", fontWeight: 600, padding: "14px 26px", minHeight: "52px", borderRadius: "999px", border: "1px solid var(--smh-border)", background: "var(--surface)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {HERO_PILLS.map((p) => (
                  <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "var(--body)", background: "var(--surface)", border: "1px solid var(--smh-border)", padding: "8px 13px", borderRadius: "999px" }}><Ic d={CHECK} size={15} sw={2.6} stroke="var(--brand)" />{p}</span>
                ))}
              </div>
            </div>

            {/* Hero visual: ansvar-flow */}
            <figure role="img" aria-label="Diagram der viser at bidrag går direkte til foreningens MobilePay, mens StøtMedHjerte samler hjertesager, dokumentation og regnskabsgrundlag." style={{ margin: 0, animation: "lovRise .7s ease both" }}>
              <div className="lov-card" style={{ borderRadius: "22px", padding: "clamp(18px,2.6vw,24px)", boxShadow: "0 36px 84px -42px rgba(8,14,26,.42)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "18px" }}>
                  <span style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "var(--label)" }}>Ansvar og flow</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, color: "#15803D", background: "var(--green-surface)", border: "1px solid var(--green-border)", padding: "5px 10px", borderRadius: "999px" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--success)" }} />Bidrag går direkte</span>
                </div>
                <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: ".7px", textTransform: "uppercase", color: "var(--brand)", marginBottom: "9px" }}>Pengestrøm</div>
                <div className="lov-track">
                  <div className="lov-step" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "7px", background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "13px", padding: "12px 7px" }}>
                    <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "#fff", border: "1px solid var(--smh-border)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>' size={16} stroke="var(--ink)" /></span>
                    <span style={{ fontSize: "11px", fontWeight: 600, lineHeight: 1.25, color: "var(--ink)" }}>Støtte</span>
                  </div>
                  <TrackArrow />
                  <div className="lov-step" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "7px", background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "13px", padding: "12px 7px" }}>
                    <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "#fff", border: "1px solid var(--smh-border)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="m9 12 2 2 4-4"/>' size={16} stroke="var(--ink)" /></span>
                    <span style={{ fontSize: "11px", fontWeight: 600, lineHeight: 1.25, color: "var(--ink)" }}>MobilePay-godkendelse</span>
                  </div>
                  <TrackArrow />
                  <div className="lov-step" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "7px", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", borderRadius: "13px", padding: "12px 7px" }}>
                    <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "#fff", border: "1px solid var(--brand-border)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M21 12h-6a2 2 0 0 0 0 4h6Z"/>' size={16} stroke="var(--brand)" /></span>
                    <span style={{ fontSize: "11px", fontWeight: 600, lineHeight: 1.25, color: "var(--brand-hover)" }}>Foreningens MobilePay-konto</span>
                  </div>
                </div>
                <div style={{ height: "3px", borderRadius: "2px", background: "linear-gradient(90deg,var(--brand),#FF7088)", margin: "9px 4px 0" }} />
                <p style={{ margin: "9px 0 0", fontSize: "11px", lineHeight: 1.5, color: "var(--smh-muted)", textAlign: "center" }}>Pengene går direkte til foreningens egen MobilePay-konto. De passerer ikke gennem StøtMedHjerte.</p>

                <div style={{ height: "1px", background: "var(--smh-border)", margin: "18px 0" }} />

                <div style={{ background: "var(--navy1)", borderRadius: "15px", padding: "13px 15px", display: "flex", alignItems: "center", gap: "11px" }}>
                  <span style={{ flexShrink: 0, width: "34px", height: "34px", borderRadius: "9px", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>' size={18} stroke="#fff" /></span>
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>StøtMedHjerte samler grundlaget</div>
                    <div style={{ fontSize: "11.5px", lineHeight: 1.4, color: "#AEB9CC" }}>Hjertesager, dokumentation og regnskabsgrundlag ét sted.</div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </section>

        {/* ============ HVEM HAR ANSVARET ============ */}
        <section className="lov-wrap lov-sec-pad" style={{ paddingTop: "clamp(30px,4vw,56px)" }}>
          <div className="lov-intro-c">
            <div className="lov-eyebrow">Ansvarsfordeling</div>
            <h2 className="lov-h2">Hvem har ansvaret for hvad?</h2>
            <p className="lov-lead">Ansvaret er delt klart op. Foreningen er den ansvarlige indsamler over for myndighederne. StøtMedHjerte er et værktøj, der giver struktur, men står ikke som indsamler.</p>
          </div>
          <div className="lov-split-2 lov-stretch" style={{ maxWidth: "980px", margin: "0 auto" }}>
            <div className="lov-card" style={{ borderTop: "3px solid var(--brand)", borderRadius: "20px", padding: "clamp(24px,3vw,30px)" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--brand)", marginBottom: "14px" }}>Foreningen</div>
              <h3 style={{ margin: "0 0 16px", fontSize: "19px", fontWeight: 800, letterSpacing: "-.4px", color: "var(--ink)" }}>Ansvarlig indsamler</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {["Ansøger selv om tilladelse hos Indsamlingsnævnet", "Har ansvaret for at overholde reglerne", "Ejer sin egen MobilePay-konto og bidragene", "Aflægger regnskab efter indsamlingen"].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: "11px" }}>
                    <span style={{ width: "22px", height: "22px", borderRadius: "7px", background: "var(--brand-surface)", color: "var(--brand)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}><Ic d={CHECK} size={13} sw={2.8} stroke="var(--brand)" /></span>
                    <span style={{ fontSize: "14.5px", lineHeight: 1.5, color: "var(--body)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lov-card" style={{ borderTop: "3px solid var(--navy3)", borderRadius: "20px", padding: "clamp(24px,3vw,30px)" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--smh-muted)", marginBottom: "14px" }}>StøtMedHjerte</div>
              <h3 style={{ margin: "0 0 16px", fontSize: "19px", fontWeight: 800, letterSpacing: "-.4px", color: "var(--ink)" }}>Struktur og værktøj</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {["Samler hjertesager, journalnummer og dokumentation", "Holder regnskabsgrundlaget struktureret", "Rører aldrig bidragene", "Er ikke indsamler og søger ikke tilladelser"].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: "11px" }}>
                    <span style={{ width: "22px", height: "22px", borderRadius: "7px", background: "var(--alt)", color: "var(--ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}><Ic d='<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>' size={13} sw={2.2} /></span>
                    <span style={{ fontSize: "14.5px", lineHeight: 1.5, color: "var(--body)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ PLATFORMEN SAMLER GRUNDLAGET ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="lov-wrap lov-sec-pad">
            <div className="lov-split-2">
              <div>
                <div style={{ marginBottom: "26px" }}>
                  <div className="lov-eyebrow">Ét samlet sted</div>
                  <h2 className="lov-h2">Platformen samler grundlaget.</h2>
                  <p className="lov-lead">StøtMedHjerte er udviklet til at give foreningen et samlet sted til hjertesager, journalnummer, bidrag, dokumentation og regnskabsgrundlag. Det gør arbejdet mere struktureret, men ændrer ikke på, at foreningen selv har ansvaret for indsamlingen.</p>
                </div>
                <div className="lov-grid-2x2">
                  {PLATFORM.map(([n, t, b]) => (
                    <div key={n} className="lov-card" style={{ padding: "18px" }}>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--brand)", marginBottom: "7px" }}>{n}</div>
                      <h3 style={{ margin: "0 0 5px", fontSize: "15px", fontWeight: 700, color: "var(--ink)" }}>{t}</h3>
                      <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.55, color: "var(--body)" }}>{b}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* dashboard */}
              <figure role="img" aria-label="Dashboard der viser hjertesag, journalnummer, bidrag og regnskabsgrundlag i StøtMedHjerte." style={{ margin: 0 }}>
                <div className="lov-card" style={{ overflow: "hidden", boxShadow: "0 34px 80px -42px rgba(8,14,26,.40)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "13px 16px", borderBottom: "1px solid var(--smh-border)", background: "var(--page)" }}>
                    <span style={{ display: "flex", gap: "6px" }}><span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#E2E8F0" }} /><span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#E2E8F0" }} /><span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#E2E8F0" }} /></span>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--smh-muted)", marginLeft: "4px" }}>Foreningsoverblik</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "16px" }}>
                    <div style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "14px", padding: "14px" }}>
                      <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--label)", marginBottom: "8px" }}>Aktiv hjertesag</div>
                      <div style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--ink)", marginBottom: "10px" }}>Nyt tag til klubhuset</div>
                      <div style={{ height: "7px", borderRadius: "4px", background: "#E2E8F0", overflow: "hidden" }}><div style={{ width: "68%", height: "100%", background: "var(--brand)", borderRadius: "4px" }} /></div>
                      <div style={{ fontSize: "11px", color: "var(--smh-muted)", marginTop: "7px" }}>68% af målet</div>
                    </div>
                    <div style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "14px", padding: "14px" }}>
                      <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--label)", marginBottom: "8px" }}>Journalnummer</div>
                      <div className="lov-mono" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "13px", fontWeight: 600, color: "var(--ink)", marginBottom: "10px" }}>IN-2026-0142</div>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11.5px", fontWeight: 600, color: "#15803D", background: "var(--green-surface)", border: "1px solid var(--green-border)", padding: "4px 9px", borderRadius: "999px" }}><Ic d={CHECK} size={12} sw={2.6} stroke="#15803D" />Registreret</div>
                    </div>
                    <div style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "14px", padding: "14px" }}>
                      <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--label)", marginBottom: "8px" }}>Indsamlet beløb</div>
                      <div style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-.5px", color: "var(--ink)", marginBottom: "9px" }}>88.450 kr.</div>
                      <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "26px" }}>{[40, 60, 50, 78, 92].map((h, i) => <span key={i} style={{ flex: 1, height: h + "%", background: i >= 3 ? "var(--brand)" : "#CBD5E1", borderRadius: "3px 3px 0 0" }} />)}</div>
                    </div>
                    <div style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "14px", padding: "14px" }}>
                      <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--label)", marginBottom: "8px" }}>Regnskabsgrundlag</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "9px" }}><span style={{ width: "32px", height: "32px", borderRadius: "9px", background: "#fff", border: "1px solid var(--smh-border)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="M4 2h11l5 5v15H4Z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/>' size={16} stroke="var(--brand)" /></span><div><div style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--ink)" }}>Samlet</div><div style={{ fontSize: "11px", color: "var(--smh-muted)" }}>Klar til eksport</div></div></div>
                    </div>
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </section>

        {/* ============ HVAD SMH IKKE GOER ============ */}
        <section className="lov-wrap lov-sec-pad">
          <div className="lov-intro">
            <div className="lov-eyebrow">Afgrænsning</div>
            <h2 className="lov-h2">Hvad StøtMedHjerte ikke gør.</h2>
            <p className="lov-lead">StøtMedHjerte udsteder ikke tilladelser, vurderer ikke om en konkret indsamling er lovpligtig, og erstatter ikke juridisk rådgivning. Foreningen skal selv sikre, at indsamlingen følger de regler, der gælder.</p>
          </div>
          <div style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "24px", overflow: "hidden" }}>
            <div style={{ height: "4px", background: "var(--brand)" }} />
            <div style={{ padding: "clamp(24px,3.4vw,34px)" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "14px", padding: "16px 18px", marginBottom: "13px" }}>
                <Ic d={MINUS} size={19} sw={2} stroke="#9AA3B2" style={{ flexShrink: 0, marginTop: "1px" }} /><span style={{ fontSize: "14.5px", lineHeight: 1.5, color: "var(--ink)", fontWeight: 500 }}>StøtMedHjerte er ikke indsamler</span>
              </div>
              <div className="lov-grid-2x2">
                {NOT_GRID.map((t) => (
                  <div key={t} style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "14px", padding: "16px 18px" }}>
                    <Ic d={MINUS} size={19} sw={2} stroke="#9AA3B2" style={{ flexShrink: 0, marginTop: "1px" }} /><span style={{ fontSize: "14.5px", lineHeight: 1.5, color: "var(--ink)", fontWeight: 500 }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "11px", alignItems: "flex-start", marginTop: "20px", paddingTop: "18px", borderTop: "1px solid var(--smh-border)" }}>
                <Ic d='<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>' size={18} sw={2} stroke="var(--smh-muted)" style={{ flexShrink: 0, marginTop: "1px" }} />
                <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "var(--body)" }}>Hvis I er i tvivl om regler, ansvar eller regnskab, bør foreningen søge relevant juridisk eller faglig rådgivning.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ HVORNAAR OFFENTLIG ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="lov-wrap lov-sec-pad">
            <div className="lov-split-2">
              <div>
                <div className="lov-eyebrow">Offentlig eller intern</div>
                <h2 className="lov-h2">Hvornår bliver en indsamling offentlig?</h2>
                <p className="lov-lead" style={{ marginBottom: "18px" }}>Når en forening beder en bred kreds om bidrag et sted, hvor offentligheden kan se opfordringen, er der som hovedregel tale om en offentlig indsamling. Det gælder for eksempel på hjemmeside, Facebook, Instagram, TikTok og andre åbne digitale kanaler.</p>
                <div style={{ display: "flex", gap: "11px", alignItems: "flex-start", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "16px", padding: "16px 18px" }}>
                  <Ic d='<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>' size={18} sw={2} stroke="var(--brand)" style={{ flexShrink: 0, marginTop: "1px" }} />
                  <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "var(--body)" }}>En intern indsamling blandt egne medlemmer kan i nogle tilfælde være undtaget. Men så snart opfordringen deles på sociale medier, skal den behandles som offentlig.</p>
                </div>
              </div>

              <figure role="img" aria-label="Flow der viser forskellen på intern medlemsindsamling og offentlig indsamling på hjemmeside og sociale medier." style={{ margin: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {/* Intern */}
                  <div className="lov-card" style={{ padding: "18px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "11px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "#15803D", background: "var(--green-surface)", border: "1px solid var(--green-border)", padding: "5px 11px", borderRadius: "999px", marginBottom: "14px" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--success)" }} />Intern indsamling</div>
                    <div className="lov-track">
                      <div className="lov-step" style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "12px", padding: "11px 12px", fontSize: "12.5px", fontWeight: 600, color: "var(--ink)", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>Kun egne medlemmer</div>
                      <TrackArrow green />
                      <div className="lov-step" style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "12px", padding: "11px 12px", fontSize: "12.5px", fontWeight: 600, color: "var(--ink)", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>Intern kreds</div>
                      <TrackArrow green />
                      <div className="lov-step" style={{ background: "var(--green-surface)", border: "1px solid var(--green-border)", borderRadius: "12px", padding: "11px 12px", fontSize: "12.5px", fontWeight: 700, color: "#15803D", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>Kan være undtaget</div>
                    </div>
                  </div>
                  {/* Offentlig */}
                  <div className="lov-card" style={{ padding: "18px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "11px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--brand)", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", padding: "5px 11px", borderRadius: "999px", marginBottom: "14px" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)" }} />Offentlig indsamling</div>
                    <div className="lov-track">
                      <div className="lov-step" style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "12px", padding: "11px 12px", fontSize: "12.5px", fontWeight: 600, color: "var(--ink)", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>Hjemmeside eller sociale medier</div>
                      <TrackArrow />
                      <div className="lov-step" style={{ background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "12px", padding: "11px 12px", fontSize: "12.5px", fontWeight: 600, color: "var(--ink)", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>Bred kreds kan se opfordringen</div>
                      <TrackArrow />
                      <div className="lov-step" style={{ background: "var(--brand-surface)", border: "1px solid var(--brand-border)", borderRadius: "12px", padding: "11px 12px", fontSize: "12.5px", fontWeight: 700, color: "var(--brand-hover)", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>Kræver som hovedregel tilladelse</div>
                    </div>
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </section>

        {/* ============ FLERE HJERTESAGER UNDER SAMME TILLADELSE ============ */}
        <section className="lov-wrap lov-sec-pad">
          <div className="lov-intro-c">
            <div className="lov-eyebrow">Bred tilladelse</div>
            <h2 className="lov-h2">En bred tilladelse kan rumme flere hjertesager.</h2>
            <p className="lov-lead">En indsamlingstilladelse gives til et formål. Hvis formålet er beskrevet bredt nok, kan flere hjertesager ligge under samme tilladelse, så længe de enkelte hjertesager holder sig inden for det godkendte formål.</p>
          </div>
          <p style={{ maxWidth: "760px", margin: "0 auto clamp(26px,3.4vw,36px)", fontSize: "15px", lineHeight: 1.7, color: "var(--body)", textAlign: "center", textWrap: "pretty" }}>Hvis foreningen søger tilladelse til foreningens almennyttige aktiviteter, drift og udvikling, kan det give plads til flere hjertesager, for eksempel udstyr, aktiviteter, ture, fællesskabsprojekter og forbedring af foreningens rammer.</p>

          <figure role="img" aria-label="Diagram der viser flere hjertesager under samme brede indsamlingstilladelse." style={{ margin: "0 auto", maxWidth: "900px" }}>
            <div style={{ background: "var(--navy1)", borderRadius: "18px", padding: "clamp(20px,2.8vw,26px) clamp(20px,2.8vw,28px)", display: "flex", alignItems: "center", gap: "14px", boxShadow: "0 30px 70px -40px rgba(8,14,26,.5)" }}>
              <span style={{ flexShrink: 0, width: "42px", height: "42px", borderRadius: "11px", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>' size={21} sw={1.8} stroke="#fff" /></span>
              <div>
                <div style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "#7E8CA3", marginBottom: "4px" }}>Tilladelse</div>
                <div style={{ fontSize: "clamp(15px,2vw,17px)", fontWeight: 700, letterSpacing: "-.3px", color: "#fff", lineHeight: 1.3 }}>Foreningens almennyttige aktiviteter, drift og udvikling</div>
              </div>
            </div>

            <div className="lov-bus-v" style={{ padding: "0" }}><svg width="24" height="26" viewBox="0 0 24 26" fill="none" stroke="#C7CFDB" strokeWidth="1.6" strokeLinecap="round"><path d="M12 1v24" /></svg></div>
            <div className="lov-bus-h" style={{ padding: "0 4px" }}><svg width="100%" height="30" viewBox="0 0 100 30" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}><path d="M50 0 V10 M11 10 H89 M11 10 V30 M37 10 V30 M63 10 V30 M89 10 V30" stroke="#C7CFDB" strokeWidth="1.4" fill="none" vectorEffect="non-scaling-stroke" /></svg></div>

            <div className="lov-hsag" style={{ marginTop: "4px" }}>
              {HSAGER.map((h) => (
                <div key={h.title} className="lov-card lov-lift" style={{ borderTop: "3px solid var(--brand)", padding: "18px 16px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "11px" }}><Ic d={h.d} size={17} stroke="var(--brand)" /></div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}>{h.title}</div>
                </div>
              ))}
            </div>
          </figure>

          <p style={{ maxWidth: "680px", margin: "clamp(22px,3vw,30px) auto 0", fontSize: "14px", lineHeight: 1.65, color: "var(--smh-muted)", textAlign: "center" }}>Vil I senere samle ind til noget uden for det godkendte formål, skal I søge en ny eller ændret tilladelse.</p>
        </section>

        {/* ============ REGNSKAB ADSKILT PER HJERTESAG ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="lov-wrap lov-sec-pad">
            <div className="lov-split-rev">
              <div>
                <div style={{ marginBottom: "24px" }}>
                  <div className="lov-eyebrow">Adskilt regnskab</div>
                  <h2 className="lov-h2">Regnskabet holdes adskilt per hjertesag.</h2>
                  <p className="lov-lead">Hvis foreningen har flere hjertesager under samme brede tilladelse, er det stadig vigtigt at kunne se, hvad der er kommet ind på hver enkelt hjertesag. StøtMedHjerte holder regnskabet adskilt per hjertesag, så foreningen kan følge bidrag, status og grundlag mere struktureret.</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[["Én hjertesag", "Ét samlet overblik over bidrag og status."], ["Flere hjertesager", "Hver hjertesag har sit eget regnskabsspor."], ["Samlet grundlag", "Foreningen får et bedre grundlag til arbejdet efter indsamlingen."]].map(([t, b]) => (
                    <div key={t} className="lov-card" style={{ padding: "16px 18px" }}>
                      <h3 style={{ margin: "0 0 4px", fontSize: "14.5px", fontWeight: 700, color: "var(--ink)" }}>{t}</h3>
                      <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.55, color: "var(--body)" }}>{b}</p>
                    </div>
                  ))}
                </div>
              </div>

              <figure role="img" aria-label="Dashboard der viser regnskab og bidrag adskilt per hjertesag." style={{ margin: 0 }}>
                <div className="lov-card" style={{ overflow: "hidden", boxShadow: "0 34px 80px -42px rgba(8,14,26,.40)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", padding: "14px 18px", borderBottom: "1px solid var(--smh-border)", background: "var(--navy1)" }}>
                    <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#fff" }}>Regnskab pr. hjertesag</span>
                    <span className="lov-mono" style={{ fontSize: "11.5px", fontWeight: 600, color: "#9AA8BE" }}>J.nr. IN-2026-0142</span>
                  </div>
                  {/* desktop table */}
                  <div className="lov-tbl">
                    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1.2fr .9fr .8fr", gap: "10px", padding: "11px 18px", background: "var(--page)", fontSize: "10.5px", fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase", color: "var(--label)" }}>
                      <span>Hjertesag</span><span>Indsamlet</span><span>Journalnr.</span><span>Status</span><span>Grundlag</span>
                    </div>
                    {TABLE.map((r) => (
                      <div key={r.sag} className="lov-trow">
                        <span style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--ink)" }}>{r.sag}</span>
                        <span className="lov-mono" style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>{r.amt}</span>
                        <span className="lov-mono" style={{ fontSize: "12px", color: "var(--smh-muted)" }}>{r.jnr}</span>
                        <span style={{ fontSize: "11.5px", fontWeight: 600, color: r.statusColor }}>{r.status}</span>
                        <span style={{ fontSize: "11.5px", fontWeight: 600, color: r.grundlagColor }}>{r.grundlag}</span>
                      </div>
                    ))}
                  </div>
                  {/* mobile stacked */}
                  <div className="lov-tbl-m" style={{ padding: "14px" }}>
                    {TABLE.map((r) => (
                      <div key={r.sag} style={{ border: "1px solid var(--smh-border)", borderRadius: "14px", padding: "14px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}>{r.sag}</span>
                          <span style={{ fontSize: "11px", fontWeight: 600, color: r.status === "Aktiv" ? "#15803D" : "var(--label)", background: r.status === "Aktiv" ? "var(--green-surface)" : "var(--alt)", border: r.status === "Aktiv" ? "1px solid var(--green-border)" : "1px solid var(--smh-border)", padding: "3px 9px", borderRadius: "999px" }}>{r.status}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", color: "var(--body)", padding: "4px 0" }}><span style={{ color: "var(--smh-muted)" }}>Indsamlet</span><span style={{ fontWeight: 600, color: "var(--ink)" }}>{r.amt}</span></div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", color: "var(--body)", padding: "4px 0" }}><span style={{ color: "var(--smh-muted)" }}>Grundlag</span><span style={{ fontWeight: 600, color: r.grundlag === "Klar" ? "var(--brand)" : "var(--ink)" }}>{r.grundlag}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </section>

        {/* ============ LAES VIDERE ============ */}
        <section className="lov-wrap lov-sec-pad">
          <div className="lov-intro">
            <div className="lov-eyebrow">Mere viden</div>
            <h2 className="lov-h2">Læs videre, hvis I vil gå mere i dybden.</h2>
          </div>
          <div className="lov-cta-cards">
            {READ_MORE.map((c) => (
              <Link key={c.to} to={c.to} className="lov-card lov-lift" style={{ textDecoration: "none", padding: "26px 24px", display: "flex", flexDirection: "column" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "11px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}><Ic d={c.d} size={21} stroke="var(--brand)" /></div>
                <h3 style={{ margin: "0 0 8px", fontSize: "17.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>{c.title}</h3>
                <p style={{ margin: "0 0 18px", fontSize: "14px", lineHeight: 1.6, color: "var(--body)", flex: 1 }}>{c.body}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "14px", fontWeight: 600, color: "var(--brand)" }}>{c.cta}<Ic d={ARROW_R} size={16} sw={2.2} /></span>
              </Link>
            ))}
          </div>
        </section>

        {/* ============ AFSLUTTENDE CTA ============ */}
        <section style={{ borderTop: "1px solid var(--smh-border)" }}>
          <div className="lov-wrap" style={{ paddingTop: "clamp(50px,6vw,76px)", paddingBottom: "clamp(50px,6vw,76px)" }}>
            <div style={{ border: "1px solid var(--brand-border)", borderRadius: "28px", background: "linear-gradient(160deg,#F8FBFD 0%,#FFF1F4 100%)", padding: "clamp(34px,5vw,60px)", textAlign: "center" }}>
              <h2 style={{ margin: "0 0 14px", fontSize: "clamp(25px,3.6vw,36px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.8px", color: "var(--ink)", textWrap: "balance" }}>Få struktur omkring jeres næste indsamling.</h2>
              <p style={{ margin: "0 auto 30px", maxWidth: "560px", fontSize: "clamp(15.5px,2.2vw,17.5px)", lineHeight: 1.6, color: "var(--body)", textWrap: "pretty" }}>Opret foreningen på StøtMedHjerte og saml hjertesager, journalnummer, dokumentation og regnskabsgrundlag i én platform.</p>
              <div className="lov-cta-row" style={{ justifyContent: "center" }}>
                <Link to="/opret-forening" className="lov-cta-w lov-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "16px 34px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 34px rgba(224,25,63,.24)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
                <Link to="/kontakt" className="lov-cta-w lov-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16px", fontWeight: 600, padding: "16px 32px", minHeight: "54px", borderRadius: "999px", border: "1px solid var(--smh-border)", background: "var(--surface)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Kontakt os</Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
