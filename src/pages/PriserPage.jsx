import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./Priser.css";

function Ic({ d, size = 24, sw = 1.9, stroke = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={style} dangerouslySetInnerHTML={{ __html: d }} />
  );
}

const CHECK = '<path d="M20 6 9 17l-5-5"/>';

function GreenCheck() {
  return (
    <span style={{ flexShrink: 0, width: "20px", height: "20px", borderRadius: "50%", background: "var(--green-surface)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px" }}>
      <Ic d={CHECK} size={12} sw={3.2} stroke="#15803D" />
    </span>
  );
}
function BrandCheck() {
  return (
    <span style={{ flexShrink: 0, width: "20px", height: "20px", borderRadius: "50%", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px" }}>
      <Ic d={CHECK} size={12} sw={3.2} stroke="var(--brand)" />
    </span>
  );
}

const PLAN1 = ["Donationer via MobilePay", "Ubegrænset antal hjertesager", "CVR-validering", "Journalnummer pr. hjertesag", "Bidragsoverblik", "Dokumentation samlet ét sted"];
const PLAN2 = ["Faste månedlige bidrag via MobilePay", "Overblik over støtteaftaler", "Støttehistorik", "CVR-validering", "Dokumentation samlet ét sted", "Grundlag til regnskab"];
const PLAN3 = [["Alt i Donationer og Fast støtte", true], ["Supporter-overblik", false], ["Månedlige rapporter", false], ["Udvidet dokumentation", false], ["Indsamlingsregnskab pr. hjertesag", false]];

export default function PriserPage() {
  return (
    <>
      <SiteNav />
      <main className="pr-page">

        {/* ============ HERO ============ */}
        <section className="pr-wrap" style={{ paddingTop: "clamp(40px,5vw,68px)", paddingBottom: "clamp(30px,4vw,52px)", textAlign: "center" }}>
          <div style={{ animation: "prRise .6s ease both", maxWidth: "760px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 15px", borderRadius: "999px", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", marginBottom: "22px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)" }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--brand-hover)", letterSpacing: "-.1px" }}>Priser</span>
            </div>
            <h1 style={{ margin: "0 0 20px", fontSize: "clamp(30px,4.6vw,46px)", lineHeight: 1.08, fontWeight: 800, letterSpacing: "-1.2px", color: "var(--ink)", textWrap: "pretty" }}>Klar pris. Fast abonnement.<br />Ingen andel af donationerne.</h1>
            <p style={{ margin: "0 auto 30px", fontSize: "clamp(16.5px,2.3vw,18.5px)", lineHeight: 1.62, color: "var(--body)", maxWidth: "580px", textWrap: "pretty" }}>StøtMedHjerte tager ikke en procentdel af donationerne. Foreningen betaler et fast månedligt abonnement for at bruge platformen, og bidragene går direkte til foreningens egen MobilePay-konto.</p>
            <div className="pr-cta-row" style={{ justifyContent: "center", marginBottom: "26px" }}>
              <Link to="/opret-forening" className="pr-cta-w pr-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "16px 32px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 12px 30px rgba(224,25,63,.22)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
              <a href="#model" className="pr-cta-w pr-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16px", fontWeight: 600, padding: "16px 30px", minHeight: "54px", borderRadius: "999px", border: "1px solid var(--smh-border)", background: "var(--surface)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Sådan virker betalingen</a>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "9px" }}>
              {["Fast månedlig pris", "0% af donationerne", "Bidrag direkte til foreningen"].map((t) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "var(--body)", background: "var(--surface)", border: "1px solid var(--smh-border)", padding: "8px 13px", borderRadius: "999px" }}>
                  <Ic d={CHECK} size={15} sw={2.6} stroke="var(--brand)" />{t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PRISPLANER ============ */}
        <section className="pr-wrap" id="planer" style={{ paddingTop: "clamp(42px,4.6vw,64px)", paddingBottom: "clamp(30px,3.6vw,48px)" }}>
          <div className="pr-intro-c" style={{ marginBottom: "clamp(24px,3vw,34px)" }}>
            <div className="pr-eyebrow">Prisplaner</div>
            <h2 className="pr-h2">Tre planer, samme princip.</h2>
            <p className="pr-lead">Vælg det, der passer til foreningen. Uanset plan beholder I hele donationen.</p>
          </div>
          <div className="pr-plans">
            {/* Plan 1: Donationer */}
            <div className="pr-plan pr-card pr-lift">
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "var(--smh-muted)", marginBottom: "12px" }}>Donationer</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "7px", marginBottom: "13px" }}>
                <span style={{ fontSize: "clamp(38px,5vw,46px)", fontWeight: 800, letterSpacing: "-1.4px", color: "var(--ink)" }}>149</span>
                <span style={{ fontSize: "15px", fontWeight: 500, color: "var(--smh-muted)" }}>kr. pr. måned</span>
              </div>
              <p style={{ margin: "0 0 22px", fontSize: "14.5px", lineHeight: 1.55, color: "var(--body)", minHeight: "64px" }}>Til foreninger, der vil tage imod engangsbidrag til konkrete hjertesager.</p>
              <Link to="/opret-forening" className="pr-plan-cta pr-btn-ghost" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontSize: "15.5px", fontWeight: 600, padding: "15px", minHeight: "52px", borderRadius: "999px", color: "var(--ink)", background: "var(--surface)", border: "1px solid var(--smh-border)" }}>Vælg Donationer</Link>
              <div style={{ height: "1px", background: "var(--smh-border)", margin: "24px 0 20px" }} />
              <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--label)", marginBottom: "16px" }}>Indeholder</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
                {PLAN1.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "11px" }}><GreenCheck /><span style={{ fontSize: "14.5px", lineHeight: 1.45, color: "var(--body)" }}>{f}</span></div>
                ))}
              </div>
            </div>

            {/* Plan 2: Fast støtte */}
            <div className="pr-plan pr-card pr-lift">
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "var(--smh-muted)", marginBottom: "12px" }}>Fast støtte</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "7px", marginBottom: "13px" }}>
                <span style={{ fontSize: "clamp(38px,5vw,46px)", fontWeight: 800, letterSpacing: "-1.4px", color: "var(--ink)" }}>199</span>
                <span style={{ fontSize: "15px", fontWeight: 500, color: "var(--smh-muted)" }}>kr. pr. måned</span>
              </div>
              <p style={{ margin: "0 0 22px", fontSize: "14.5px", lineHeight: 1.55, color: "var(--body)", minHeight: "64px" }}>Til foreninger, der vil tilbyde faste månedlige støtteaftaler og mere forudsigelig økonomi.</p>
              <Link to="/opret-forening" className="pr-plan-cta pr-btn-ghost" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontSize: "15.5px", fontWeight: 600, padding: "15px", minHeight: "52px", borderRadius: "999px", color: "var(--ink)", background: "var(--surface)", border: "1px solid var(--smh-border)" }}>Vælg Fast støtte</Link>
              <div style={{ height: "1px", background: "var(--smh-border)", margin: "24px 0 20px" }} />
              <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--label)", marginBottom: "16px" }}>Indeholder</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
                {PLAN2.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "11px" }}><GreenCheck /><span style={{ fontSize: "14.5px", lineHeight: 1.45, color: "var(--body)" }}>{f}</span></div>
                ))}
              </div>
            </div>

            {/* Plan 3: Samlet løsning */}
            <div className="pr-plan pr-card pr-lift" style={{ border: "1.5px solid var(--brand)", boxShadow: "0 24px 56px -32px rgba(224,25,63,.28)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "var(--brand)" }}>Samlet løsning</span>
                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".3px", color: "var(--brand-hover)", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", padding: "5px 10px", borderRadius: "999px" }}>Begge moduler</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "7px", marginBottom: "6px" }}>
                <span style={{ fontSize: "clamp(38px,5vw,46px)", fontWeight: 800, letterSpacing: "-1.4px", color: "var(--ink)" }}>278</span>
                <span style={{ fontSize: "15px", fontWeight: 500, color: "var(--smh-muted)" }}>kr. pr. måned</span>
              </div>
              <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--smh-muted)", marginBottom: "14px" }}>Spar 70 kr. pr. måned mod hver for sig.</div>
              <p style={{ margin: "0 0 22px", fontSize: "14.5px", lineHeight: 1.55, color: "var(--body)", minHeight: "42px" }}>Til foreninger, der vil samle donationer, fast støtte, hjertesager og dokumentation i én løsning.</p>
              <Link to="/opret-forening" className="pr-plan-cta pr-btn-brand" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontSize: "15.5px", fontWeight: 600, padding: "15px", minHeight: "52px", borderRadius: "999px", color: "#fff", background: "var(--brand)", boxShadow: "0 12px 26px rgba(224,25,63,.26)" }}>Vælg samlet løsning</Link>
              <div style={{ height: "1px", background: "var(--smh-border)", margin: "24px 0 20px" }} />
              <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--label)", marginBottom: "16px" }}>Indeholder</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
                {PLAN3.map(([f, bold]) => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "11px" }}><BrandCheck /><span style={{ fontSize: "14.5px", lineHeight: 1.45, color: bold ? "var(--ink)" : "var(--body)", fontWeight: bold ? 600 : 400 }}>{f}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ MODEL: TO ADSKILTE STROEMME ============ */}
        <section id="model" style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="pr-wrap pr-sec-pad">
            <div className="pr-split-2">
              <div>
                <div className="pr-eyebrow">Den rene model</div>
                <h2 className="pr-h2">Abonnementet er adskilt fra donationerne.</h2>
                <p className="pr-lead" style={{ marginBottom: "24px" }}>Jeres økonomi afhænger ikke af prisen. Foreningen betaler et fast abonnement for platformen, mens hvert bidrag går direkte til foreningens egen MobilePay-konto. De to pengestrømme krydser aldrig hinanden.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "26px" }}>
                  {[
                    ["Fast pris uanset beløb.", " Abonnementet er det samme, om I samler 5.000 eller 500.000 kr. ind."],
                    ["0% af donationerne.", " StøtMedHjerte tager aldrig en andel af bidragene."],
                    ["Forudsigelig økonomi.", " I kender prisen på forhånd, hver måned."],
                  ].map(([b, rest]) => (
                    <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <span style={{ flexShrink: 0, width: "26px", height: "26px", borderRadius: "8px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px" }}><Ic d={CHECK} size={15} sw={2.4} stroke="var(--brand)" /></span>
                      <span style={{ fontSize: "15px", lineHeight: 1.55, color: "var(--body)" }}><b style={{ color: "var(--ink)", fontWeight: 700 }}>{b}</b>{rest}</span>
                    </div>
                  ))}
                </div>
                <Link to="/den-rene-model" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", fontSize: "15px", fontWeight: 600, color: "var(--brand)" }}>Læs mere om den rene model<Ic d='<path d="M5 12h14M13 6l6 6-6 6"/>' size={17} sw={2.2} /></Link>
              </div>

              {/* To adskilte stroemme */}
              <div role="img" aria-label="Donationer går direkte fra støtter via MobilePay til foreningens egen konto, mens foreningen separat betaler et fast månedligt abonnement til StøtMedHjerte. De to pengestrømme er helt adskilte." style={{ margin: 0 }}>
                <div className="pr-card" style={{ padding: "clamp(20px,2.8vw,26px)", boxShadow: "0 36px 84px -42px rgba(8,14,26,.40)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "18px" }}>
                    <span style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "var(--label)" }}>To adskilte strømme</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, color: "#15803D", background: "var(--green-surface)", border: "1px solid var(--green-border)", padding: "5px 10px", borderRadius: "999px" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--success)" }} />Donationer går uden om platformen</span>
                  </div>

                  {/* Stroem 1: Donationer */}
                  <div style={{ background: "var(--green-surface)", border: "1px solid var(--green-border)", borderRadius: "16px", padding: "15px 15px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "12px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "12px", fontWeight: 700, color: "#15803D" }}><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--success)" }} />Donationer</span>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#15803D", background: "#fff", border: "1px solid var(--green-border)", padding: "4px 9px", borderRadius: "999px" }}>100% til foreningen</span>
                    </div>
                    <div className="pr-track">
                      <div className="pr-step" style={{ background: "#fff", border: "1px solid var(--green-border)", borderRadius: "12px", padding: "12px 7px" }}><span style={{ width: "28px", height: "28px", borderRadius: "8px", background: "var(--green-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>' size={15} stroke="#15803D" /></span><span style={{ fontSize: "11px", fontWeight: 600, lineHeight: 1.25, color: "var(--ink)" }}>Støtter</span></div>
                      <div className="pr-arr-h" style={{ color: "#15803D", padding: "0 3px" }}><Ic d='<path d="M5 12h14M13 6l6 6-6 6"/>' size={15} sw={2.2} /></div>
                      <div className="pr-arr-v" style={{ color: "#15803D" }}><Ic d='<path d="M12 5v14M6 13l6 6 6-6"/>' size={15} sw={2.2} /></div>
                      <div className="pr-step" style={{ background: "#fff", border: "1px solid var(--green-border)", borderRadius: "12px", padding: "12px 7px" }}><span style={{ width: "28px", height: "28px", borderRadius: "8px", background: "var(--green-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="m9 12 2 2 4-4"/>' size={15} stroke="#15803D" /></span><span style={{ fontSize: "11px", fontWeight: 600, lineHeight: 1.25, color: "var(--ink)" }}>MobilePay</span></div>
                      <div className="pr-arr-h" style={{ color: "#15803D", padding: "0 3px" }}><Ic d='<path d="M5 12h14M13 6l6 6-6 6"/>' size={15} sw={2.2} /></div>
                      <div className="pr-arr-v" style={{ color: "#15803D" }}><Ic d='<path d="M12 5v14M6 13l6 6 6-6"/>' size={15} sw={2.2} /></div>
                      <div className="pr-step" style={{ background: "#fff", border: "1.5px solid var(--success)", borderRadius: "12px", padding: "12px 7px" }}><span style={{ width: "28px", height: "28px", borderRadius: "8px", background: "var(--green-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M10 7h4M10 11h4M10 15h4"/>' size={15} stroke="#15803D" /></span><span style={{ fontSize: "11px", fontWeight: 700, lineHeight: 1.25, color: "#15803D" }}>Foreningens konto</span></div>
                    </div>
                  </div>

                  {/* Adskillelse */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "15px 2px" }}>
                    <span style={{ flex: 1, height: "1px", background: "var(--smh-border)" }} />
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "11px", fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase", color: "var(--label)" }}><Ic d='<path d="M4 9h16M4 15h16"/>' size={15} sw={2} />Helt adskilt</span>
                    <span style={{ flex: 1, height: "1px", background: "var(--smh-border)" }} />
                  </div>

                  {/* Stroem 2: Abonnement */}
                  <div style={{ background: "var(--brand-surface)", border: "1px solid var(--brand-border)", borderRadius: "16px", padding: "15px 15px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "12px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "12px", fontWeight: 700, color: "var(--brand-hover)" }}><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--brand)" }} />Abonnement</span>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--brand-hover)", background: "#fff", border: "1px solid var(--brand-border)", padding: "4px 9px", borderRadius: "999px" }}>Fast pris</span>
                    </div>
                    <div className="pr-track">
                      <div className="pr-step" style={{ background: "#fff", border: "1px solid var(--brand-border)", borderRadius: "12px", padding: "12px 7px" }}><span style={{ width: "28px", height: "28px", borderRadius: "8px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M10 7h4M10 11h4M10 15h4"/>' size={15} stroke="var(--brand)" /></span><span style={{ fontSize: "11px", fontWeight: 600, lineHeight: 1.25, color: "var(--ink)" }}>Foreningen</span></div>
                      <div className="pr-arr-h" style={{ color: "var(--brand)", padding: "0 3px" }}><Ic d='<path d="M5 12h14M13 6l6 6-6 6"/>' size={15} sw={2.2} /></div>
                      <div className="pr-arr-v" style={{ color: "var(--brand)" }}><Ic d='<path d="M12 5v14M6 13l6 6 6-6"/>' size={15} sw={2.2} /></div>
                      <div className="pr-step" style={{ background: "#fff", border: "1px solid var(--brand-border)", borderRadius: "12px", padding: "12px 7px" }}><span style={{ width: "28px", height: "28px", borderRadius: "8px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/>' size={15} stroke="var(--brand)" /></span><span style={{ fontSize: "11px", fontWeight: 600, lineHeight: 1.25, color: "var(--ink)" }}>Fast beløb pr. md.</span></div>
                      <div className="pr-arr-h" style={{ color: "var(--brand)", padding: "0 3px" }}><Ic d='<path d="M5 12h14M13 6l6 6-6 6"/>' size={15} sw={2.2} /></div>
                      <div className="pr-arr-v" style={{ color: "var(--brand)" }}><Ic d='<path d="M12 5v14M6 13l6 6 6-6"/>' size={15} sw={2.2} /></div>
                      <div className="pr-step" style={{ background: "#fff", border: "1.5px solid var(--brand)", borderRadius: "12px", padding: "12px 7px" }}><span style={{ width: "28px", height: "28px", borderRadius: "8px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>' size={15} stroke="var(--brand)" /></span><span style={{ fontSize: "11px", fontWeight: 700, lineHeight: 1.25, color: "var(--brand-hover)" }}>StøtMedHjerte</span></div>
                    </div>
                  </div>

                  <p style={{ margin: "16px 0 0", fontSize: "11.5px", lineHeight: 1.5, color: "var(--smh-muted)", textAlign: "center" }}>Donationerne og abonnementet mødes aldrig. Bidragene rører ikke StøtMedHjerte.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ GENNEMSIGTIGHED ============ */}
        <section className="pr-wrap pr-sec-pad">
          <div className="pr-intro-c">
            <div className="pr-eyebrow">Gennemsigtighed</div>
            <h2 className="pr-h2">Det betaler I aldrig for.</h2>
            <p className="pr-lead">Prisen er hele prisen. Der er ingen skjulte gebyrer oven i jeres faste abonnement.</p>
          </div>
          <div className="pr-trio" style={{ marginBottom: "clamp(28px,4vw,40px)" }}>
            {[
              { d: '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>', title: "Andel af donationerne: 0%", body: "StøtMedHjerte tager aldrig en procentdel af bidragene. Donationerne går fuldt ud til foreningen." },
              { d: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>', title: "Platformsgebyr pr. bidrag", body: "Vi lægger ikke et gebyr fra StøtMedHjerte oven i det enkelte bidrag." },
              { d: '<path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/>', title: "Skjulte tillæg", body: "Ingen overraskelser oven i den faste månedspris. I ved på forhånd, hvad I betaler." },
            ].map((c) => (
              <div key={c.title} className="pr-card pr-lift" style={{ padding: "26px 24px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "11px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}><Ic d={c.d} size={21} stroke="var(--brand)" /></div>
                <h3 style={{ margin: "0 0 8px", fontSize: "17.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>{c.title}</h3>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "var(--body)" }}>{c.body}</p>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: "880px", margin: "0 auto", background: "var(--alt)", border: "1px solid var(--smh-border)", borderRadius: "24px", padding: "clamp(24px,3.4vw,32px)" }}>
            <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: "var(--label)", marginBottom: "16px" }}>Godt at vide om prisen</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                "Alle priser er inkl. moms.",
                "Bidrag går direkte til foreningens egen MobilePay-konto. StøtMedHjerte tager ikke en andel af donationerne.",
                "Gebyret til Indsamlingsnævnet betales direkte ved ansøgningen og er ikke en del af abonnementet.",
              ].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <Ic d='<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>' size={18} sw={2} stroke="var(--smh-muted)" style={{ flexShrink: 0, marginTop: "1px" }} />
                  <span style={{ fontSize: "14.5px", lineHeight: 1.55, color: "var(--body)" }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: "1px solid var(--smh-border)" }}>
              <Link to="/faq" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", fontSize: "14.5px", fontWeight: 600, color: "var(--brand)" }}>Se ofte stillede spørgsmål om pris<Ic d='<path d="M5 12h14M13 6l6 6-6 6"/>' size={16} sw={2.2} /></Link>
            </div>
          </div>
        </section>

        {/* ============ AFSLUTTENDE CTA ============ */}
        <section style={{ borderTop: "1px solid var(--smh-border)" }}>
          <div className="pr-wrap" style={{ paddingTop: "clamp(50px,6vw,76px)", paddingBottom: "clamp(50px,6vw,76px)" }}>
            <div style={{ border: "1px solid var(--brand-border)", borderRadius: "28px", background: "linear-gradient(160deg,#F8FBFD 0%,#FFF1F4 100%)", padding: "clamp(34px,5vw,60px)", textAlign: "center" }}>
              <h2 style={{ margin: "0 0 14px", fontSize: "clamp(25px,3.6vw,36px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.8px", color: "var(--ink)", textWrap: "balance" }}>Klar til at komme i gang?</h2>
              <p style={{ margin: "0 auto 30px", maxWidth: "560px", fontSize: "clamp(15.5px,2.2vw,17.5px)", lineHeight: 1.6, color: "var(--body)", textWrap: "pretty" }}>Opret jeres forening og kom i gang med hjertesager, donationer og fast støtte, samlet ét sted.</p>
              <div className="pr-cta-row" style={{ justifyContent: "center" }}>
                <Link to="/opret-forening" className="pr-cta-w pr-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "16px 34px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 34px rgba(224,25,63,.24)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
                <Link to="/kontakt" className="pr-cta-w pr-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16px", fontWeight: 600, padding: "16px 32px", minHeight: "54px", borderRadius: "999px", border: "1px solid var(--smh-border)", background: "var(--surface)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Kontakt os</Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
