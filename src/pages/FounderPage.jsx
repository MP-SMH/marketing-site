import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./Founder.css";

function Ic({ d, size = 24, sw = 1.9, stroke = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={style} dangerouslySetInnerHTML={{ __html: d }} />
  );
}

const ARROW_R = '<path d="M5 12h14M13 6l6 6-6 6"/>';

const ORIGINS = [
  { title: "Foreninger", sub: "Lokale fællesskaber", d: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
  { title: "Platform", sub: "Ét digitalt sted", d: '<rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/>' },
  { title: "Struktur", sub: "Overblik og dokumentation", d: '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="m9 14 2 2 4-4"/>' },
];

const COMMIT = [
  { title: "Foreningen ejer pengene.", body: "Bidrag går direkte til foreningens egen konto. StøtMedHjerte tager ingen andel af det indsamlede.", d: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M21 12a2 2 0 0 0-2-2h-4a2 2 0 0 0 0 4h4a2 2 0 0 0 2-2z"/>' },
  { title: "Bygget tæt på foreningerne.", body: "Retningen sættes sammen med dem, der bruger platformen i hverdagen, ikke fra en glasfacade.", d: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' },
  { title: "Dansk, ikke globalt one-size.", body: "Lavet til danske regler, til MobilePay og til virkelig foreningsdrift, ikke en oversat skabelon.", d: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>' },
  { title: "Et langt, sejt træk.", body: "StøtMedHjerte bygges til at holde og vokse med foreningerne, ikke til en hurtig exit.", d: '<path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/>' },
];

export default function FounderPage() {
  return (
    <>
      <SiteNav />
      <main className="fo-page">

        {/* ============ HERO (split, portraet) ============ */}
        <section style={{ background: "var(--page)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,rgba(224,25,63,.25),transparent)" }} />
          <div className="fo-wrap" style={{ position: "relative", paddingTop: "clamp(40px,5.5vw,68px)", paddingBottom: "clamp(44px,6vw,72px)" }}>
            <div className="fo-hero-split">
              <div style={{ animation: "foRise .6s ease both" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "7px 14px", borderRadius: "999px", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", marginBottom: "22px" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)" }} />
                  <span style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: ".7px", textTransform: "uppercase", color: "var(--brand-hover)" }}>Fra grundlæggeren</span>
                </div>
                <h1 style={{ margin: "0 0 22px", fontSize: "clamp(31px,5vw,52px)", lineHeight: 1.08, fontWeight: 800, letterSpacing: "-1.3px", color: "var(--ink)", textWrap: "balance" }}>En founder-led platform for dansk foreningsliv.</h1>
                <p style={{ margin: "0 0 26px", fontSize: "clamp(16.5px,2.2vw,19px)", lineHeight: 1.62, color: "var(--body)", maxWidth: "540px" }}>Jeg startede StøtMedHjerte, fordi danske foreninger fortjener værktøjer, der er bygget til netop dem. Ikke en kopi af en global platform, men noget lavet til vores foreningsliv, vores regler og MobilePay.</p>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "30px" }}>
                  <div className="fo-portrait" style={{ width: "46px", height: "46px", borderRadius: "50%", overflow: "hidden", border: "1px solid var(--smh-border)", flexShrink: 0 }}>
                    <img src="/images/founder-mario-paunovic.jpg" alt="Mario Paunovic, grundlægger af StøtMedHjerte" loading="lazy" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                    <span style={{ fontSize: "15.5px", fontWeight: 700, letterSpacing: "-.2px", color: "var(--ink)" }}>Mario Paunovic</span>
                    <span style={{ fontSize: "13.5px", color: "var(--smh-muted)" }}>Grundlægger, StøtMedHjerte</span>
                  </div>
                </div>
                <div className="fo-cta-row">
                  <Link to="/kontakt" className="fo-cta-w fo-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "15px 28px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 12px 30px rgba(224,25,63,.22)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "9px" }}>Skriv til mig<Ic d='<path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>' size={17} sw={2.2} /></Link>
                  <Link to="/vores-mission" className="fo-cta-w fo-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16px", fontWeight: 600, padding: "15px 26px", minHeight: "54px", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Læs vores mission</Link>
                </div>
              </div>
              <div style={{ animation: "foRise .7s ease both" }}>
                <figure className="fo-portrait" style={{ position: "relative", margin: 0, borderRadius: "26px", overflow: "hidden", border: "1px solid var(--smh-border)", aspectRatio: "4/5", boxShadow: "0 50px 100px -50px rgba(8,14,26,.5)" }}>
                  <img src="/images/founder-mario-paunovic-portraet.jpg" alt="Portræt af Mario Paunovic, grundlægger af StøtMedHjerte" loading="lazy" style={{ position: "absolute", inset: 0 }} />
                  <figcaption style={{ position: "absolute", left: "16px", bottom: "16px", display: "inline-flex", alignItems: "center", gap: "10px", padding: "9px 15px", borderRadius: "999px", background: "rgba(255,255,255,.92)", backdropFilter: "blur(8px)", border: "1px solid var(--smh-border)" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)" }} />
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>Mario Paunovic, Grundlægger</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 1. HISTORIEN ============ */}
        <section style={{ background: "var(--surface)", borderTop: "1px solid var(--smh-border)" }}>
          <div className="fo-wrap fo-sec-pad">
            <div className="fo-split">
              <div>
                <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--brand)", marginBottom: "16px" }}>Historien</div>
                <h2 style={{ margin: 0, fontSize: "clamp(25px,3.4vw,36px)", lineHeight: 1.13, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)", textWrap: "balance" }}>Bygget tæt på problemet, ikke fra en glasfacade.</h2>
              </div>
              <div>
                <p style={{ margin: "0 0 18px", fontSize: "clamp(16px,2.1vw,18px)", lineHeight: 1.72, color: "var(--body)" }}>I mange år har jeg set foreninger knokle for at samle penge ind til det, der betyder noget lokalt. Engagementet fejler ikke noget. Det gør værktøjerne. Regneark, løse beskeder og manuel optælling stjæler tid fra det, foreningerne hellere vil bruge kræfter på.</p>
                <p style={{ margin: "0 0 26px", fontSize: "clamp(16px,2.1vw,18px)", lineHeight: 1.72, color: "var(--body)" }}>StøtMedHjerte er mit forsøg på at rette op på det. En platform, hvor en hjertesag kan oprettes på få minutter, bidrag lander direkte hos foreningen, og dokumentationen følger med af sig selv.</p>
                <blockquote style={{ margin: "0 0 26px", padding: "18px 22px", borderLeft: "3px solid var(--brand)", background: "var(--brand-surface)", borderRadius: "0 14px 14px 0" }}>
                  <p style={{ margin: 0, fontSize: "clamp(17px,2.4vw,20px)", lineHeight: 1.5, fontWeight: 600, letterSpacing: "-.3px", color: "var(--ink)" }}>Foreningslivet skal ikke tilpasse sig teknologien. Teknologien skal tilpasse sig foreningslivet.</p>
                </blockquote>
                <div style={{ marginTop: "6px" }}>
                  <span style={{ fontSize: "clamp(17px,2.3vw,20px)", fontWeight: 600, letterSpacing: "-.2px", color: "var(--ink)" }}>- Mario Paunovic</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 2. RETNINGEN (2D map) ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="fo-wrap fo-sec-pad">
            <div style={{ maxWidth: "680px", marginBottom: "clamp(34px,4vw,48px)" }}>
              <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--indigo)", marginBottom: "16px" }}>Retningen</div>
              <h2 style={{ margin: "0 0 16px", fontSize: "clamp(25px,3.4vw,36px)", lineHeight: 1.13, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)", textWrap: "balance" }}>Foreninger, platform og struktur, samlet i én retning.</h2>
              <p style={{ margin: 0, fontSize: "clamp(16px,2.1vw,18px)", lineHeight: 1.7, color: "var(--body)", maxWidth: "560px" }}>Det founder-led arbejde handler om at trække tre tråde sammen til ét tydeligt mål, i stedet for at lade dem ligge spredt.</p>
            </div>

            <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "24px", padding: "clamp(20px,3.4vw,40px)", boxShadow: "0 40px 80px -56px rgba(8,14,26,.4)" }}>
              <div className="fo-retmap">
                <div className="fo-ret-origins">
                  {ORIGINS.map((o) => (
                    <div key={o.title} style={{ display: "flex", alignItems: "center", gap: "14px", background: "var(--page)", border: "1px solid var(--smh-border)", borderRadius: "16px", padding: "15px 17px" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#EEF1FB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic d={o.d} size={21} sw={2} stroke="var(--indigo)" /></div>
                      <div><div style={{ fontSize: "16.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>{o.title}</div><div style={{ fontSize: "13px", color: "var(--smh-muted)" }}>{o.sub}</div></div>
                    </div>
                  ))}
                </div>

                <div className="fo-merge-d" aria-hidden="true">
                  <svg width="134" height="300" viewBox="0 0 134 300" fill="none" style={{ display: "block", width: "100%", height: "auto" }}>
                    <path d="M2 46 C 64 46, 70 150, 132 150" stroke="#C7CCDA" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" />
                    <path d="M2 150 L 132 150" stroke="#C7CCDA" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" />
                    <path d="M2 254 C 64 254, 70 150, 132 150" stroke="#C7CCDA" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" />
                    <circle cx="2" cy="46" r="4" fill="#4F46E5" />
                    <circle cx="2" cy="150" r="4" fill="#4F46E5" />
                    <circle cx="2" cy="254" r="4" fill="#4F46E5" />
                    <circle cx="132" cy="150" r="7" fill="var(--brand)" />
                    <circle cx="132" cy="150" r="13" fill="none" stroke="var(--brand)" strokeOpacity=".3" strokeWidth="2" />
                  </svg>
                </div>
                <div className="fo-merge-m" aria-hidden="true">
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d='<path d="M12 5v14M19 12l-7 7-7-7"/>' size={20} sw={2.4} stroke="var(--brand)" /></div>
                </div>

                <div className="fo-ret-dest">
                  <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg,#0B1424,#132238)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "20px", padding: "clamp(22px,3vw,30px)", boxShadow: "0 30px 60px -36px rgba(8,14,26,.6)" }}>
                    <div style={{ position: "absolute", top: "-60px", right: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.16),transparent 65%)" }} />
                    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)" }} />
                      <span style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: ".8px", textTransform: "uppercase", color: "#9AA8BE" }}>Målet</span>
                    </div>
                    <div style={{ position: "relative", fontSize: "clamp(22px,3vw,28px)", fontWeight: 800, letterSpacing: "-.7px", color: "#fff", marginBottom: "10px" }}>Én retning</div>
                    <p style={{ position: "relative", margin: 0, fontSize: "15px", lineHeight: 1.6, color: "#AEB9CC", maxWidth: "340px" }}>Et stærkere dansk foreningsliv, bygget på struktur i stedet for spredte lister og løse beskeder.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 3. DET JEG STAAR FOR ============ */}
        <section style={{ background: "var(--surface)" }}>
          <div className="fo-wrap fo-sec-pad">
            <div style={{ maxWidth: "680px", marginBottom: "clamp(34px,4vw,48px)" }}>
              <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#15803D", marginBottom: "16px" }}>Det jeg står for</div>
              <h2 style={{ margin: 0, fontSize: "clamp(25px,3.4vw,36px)", lineHeight: 1.13, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)", textWrap: "balance" }}>Fire ting, jeg ikke går på kompromis med.</h2>
            </div>
            <div className="fo-commit">
              {COMMIT.map((c) => (
                <div key={c.title} style={{ border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "26px 24px", background: "var(--page)" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#E7F4EC", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}><Ic d={c.d} size={22} sw={2} stroke="#15803D" /></div>
                  <div style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)", marginBottom: "9px" }}>{c.title}</div>
                  <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.62, color: "var(--body)" }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 4. PERSONLIG KONTAKT ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="fo-wrap fo-sec-pad">
            <div style={{ maxWidth: "560px", marginBottom: "clamp(28px,3.4vw,40px)" }}>
              <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#B45309", marginBottom: "16px" }}>Kontakt</div>
              <h2 style={{ margin: 0, fontSize: "clamp(25px,3.4vw,36px)", lineHeight: 1.13, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)", textWrap: "balance" }}>Du er altid velkommen til at skrive.</h2>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "22px", padding: "clamp(24px,3.2vw,36px)", boxShadow: "0 30px 70px -50px rgba(8,14,26,.4)" }}>
              <div className="fo-contact-card">
                <div className="fo-portrait" style={{ width: "108px", height: "108px", borderRadius: "22px", overflow: "hidden", border: "1px solid var(--smh-border)", flexShrink: 0 }}>
                  <img src="/images/founder-mario-paunovic.jpg" alt="Mario Paunovic" loading="lazy" />
                </div>
                <div>
                  <p style={{ margin: "0 0 20px", fontSize: "clamp(16px,2.1vw,18px)", lineHeight: 1.65, color: "var(--body)" }}>Har du spørgsmål, idéer eller bare lyst til at vende foreningsliv? Skriv til mig. Jeg læser med, og jeg svarer gerne selv.</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                    <a href="mailto:hej@stotmedhjerte.dk" className="fo-mail-btn" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "9px", color: "var(--ink)", fontSize: "15px", fontWeight: 600, padding: "12px 20px", minHeight: "48px", borderRadius: "999px", background: "var(--page)", border: "1px solid var(--smh-border)" }}><Ic d='<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>' size={17} sw={2} stroke="var(--brand)" />hej@stotmedhjerte.dk</a>
                    <Link to="/kontakt" className="fo-btn-brand" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "9px", color: "#fff", fontSize: "15px", fontWeight: 600, padding: "12px 22px", minHeight: "48px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 10px 24px rgba(224,25,63,.22)" }}>Gå til kontakt<Ic d={ARROW_R} size={16} sw={2.4} /></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ AFSLUTTENDE CTA (navy) ============ */}
        <section style={{ background: "var(--navy1)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-120px", left: "-80px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.12),transparent 65%)" }} />
          <div className="fo-wrap" style={{ position: "relative", paddingTop: "clamp(56px,7vw,84px)", paddingBottom: "clamp(56px,7vw,84px)", textAlign: "center" }}>
            <h2 style={{ margin: "0 auto 14px", maxWidth: "680px", fontSize: "clamp(25px,3.6vw,38px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-1px", color: "#fff", textWrap: "balance" }}>Vær med til at bygge et stærkere foreningsliv.</h2>
            <p style={{ margin: "0 auto 30px", maxWidth: "520px", fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.6, color: "#AEB9CC" }}>Opret din forening i dag, eller læs hvordan vi tjener penge uden at tage en andel af jeres indsamling.</p>
            <div className="fo-cta-row" style={{ justifyContent: "center" }}>
              <Link to="/opret-forening" className="fo-cta-w fo-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16.5px", fontWeight: 600, padding: "16px 32px", minHeight: "56px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 34px rgba(224,25,63,.3)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
              <Link to="/den-rene-model" className="fo-cta-w fo-btn-navy" style={{ textDecoration: "none", color: "#fff", fontSize: "16.5px", fontWeight: 600, padding: "16px 32px", minHeight: "56px", borderRadius: "999px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.16)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Den rene model</Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
