import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./OmOs.css";

function Ic({ d, size = 24, sw = 1.9, stroke = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={style} dangerouslySetInnerHTML={{ __html: d }} />
  );
}

const ARROW_R = '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>';

const FACTS = [
  { title: "Dansk virksomhed", body: "Heartland Collective ApS, CVR 36909722, med adresse i Hillerød.", d: '<path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/>' },
  { title: "Bidrag direkte til foreningen", body: "Betaling sker via MobilePay, og pengene går direkte til foreningens egen konto.", d: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/>' },
  { title: "CVR-validerede foreninger", body: "Foreninger valideres på CVR, før de kan oprette indsamlinger på platformen.", d: '<path d="M21 12c0 5-3.5 7.5-8.6 9a1 1 0 0 1-.8 0C6.5 19.5 3 17 3 12V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.4 1.4 0 0 1 1.6 0C13.5 3.8 16 5 18 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>' },
  { title: "Krypteret og logget", body: "Følsomme oplysninger krypteres, og centrale handlinger logges for tryg drift.", d: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>' },
];

const INFRA = [
  { title: "Hjertesager", body: "Konkrete formål med mål, status og delbare links.", d: '<path d="M19 14c1.5-1.5 2-3.5 2-5a4 4 0 0 0-7-2.6A4 4 0 0 0 7 9c0 1.5.5 3.5 2 5l5 5z"/>' },
  { title: "Bidrag", body: "Engangsbidrag og fast støtte via MobilePay, registreret automatisk.", d: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>' },
  { title: "Regnskabsgrundlag", body: "Bidrag og bevægelser samles løbende som grundlag for regnskab.", d: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 14h6"/><path d="M9 18h4"/>' },
];

const MORE = [
  { to: "/vores-mission", title: "Vores mission", body: "Hvorfor vi bygger StøtMedHjerte, og hvad vi vil med dansk foreningsliv." },
  { to: "/den-rene-model", title: "Den rene model", body: "Sådan tjener vi penge, og hvorfor vi ikke tager en andel af jeres indsamling." },
  { to: "/founder", title: "Founder", body: "Historien og menneskene bag platformen." },
  { to: "/lovgivning-og-ansvar", title: "Lovgivning og ansvar", body: "Roller, ansvar og reglerne for offentlig indsamling i Danmark." },
];

function SectionNum({ n, label, dark }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "11px", marginBottom: "18px" }}>
      <span style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "1px", color: dark ? "#FF7E92" : "var(--brand)", fontVariantNumeric: "tabular-nums" }}>{n}</span>
      <span style={{ width: "22px", height: "1.5px", background: dark ? "#FF7E92" : "var(--brand)", opacity: dark ? .5 : .45, borderRadius: "2px" }} />
      <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: dark ? "#8FA0BC" : "var(--label)" }}>{label}</span>
    </div>
  );
}

export default function OmOsPage() {
  return (
    <>
      <SiteNav />
      <main className="om-page">

        {/* ============ HERO (editorial) ============ */}
        <section style={{ position: "relative", overflow: "hidden", background: "var(--page)" }}>
          <div style={{ position: "absolute", top: "-160px", right: "-120px", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.07),transparent 65%)" }} />
          <div className="om-wrap" style={{ position: "relative", paddingTop: "clamp(44px,6vw,76px)", paddingBottom: "clamp(28px,4vw,40px)" }}>
            <div style={{ maxWidth: "800px", animation: "omRise .6s ease both" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 15px", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)", marginBottom: "24px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)" }} />
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--body)", letterSpacing: ".1px" }}>Om os</span>
              </div>
              <h1 style={{ margin: "0 0 22px", fontSize: "clamp(33px,6vw,58px)", lineHeight: 1.05, fontWeight: 800, letterSpacing: "-1.4px", color: "var(--ink)", textWrap: "balance" }}>Bygget til dansk foreningsliv.</h1>
              <p style={{ margin: 0, fontSize: "clamp(16.5px,2.4vw,20px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "660px" }}>StøtMedHjerte er en dansk virksomhed, der samler hjertesager, bidrag og regnskabsgrundlag ét sted. Vi bygger værktøjer, så foreninger kan samle penge ind mere professionelt uden at gøre arbejdet tungere for de frivillige.</p>
            </div>
          </div>
          <div className="om-wrap" style={{ position: "relative", paddingBottom: "clamp(40px,6vw,72px)" }}>
            <figure style={{ position: "relative", margin: 0, borderRadius: "26px", overflow: "hidden", border: "1px solid var(--smh-border)", aspectRatio: "3/2", boxShadow: "0 44px 96px -46px rgba(8,14,26,.3)", animation: "omRise .7s ease both", animationDelay: ".08s" }}>
              <img src="/images/om-os-dansk-foreningsliv.jpg" alt="Frivillige i et dansk lokalt foreningsliv samles om kaffe i en lys foreningssal" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <figcaption style={{ position: "absolute", left: "16px", bottom: "16px", display: "inline-flex", alignItems: "center", gap: "9px", padding: "10px 15px", borderRadius: "999px", background: "rgba(8,14,26,.6)", backdropFilter: "blur(10px)", color: "#fff", fontSize: "13px", fontWeight: 600, letterSpacing: ".1px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)" }} />
                Frivillige i dansk foreningsliv
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ============ 01 · HVAD SMH ER ============ */}
        <section className="om-sec-pad" style={{ background: "var(--surface)", borderTop: "1px solid var(--smh-border)" }}>
          <div className="om-wrap">
            <div className="om-two">
              <div>
                <SectionNum n="01" label="Hvad StøtMedHjerte er" />
                <h2 style={{ margin: 0, fontSize: "clamp(25px,3.6vw,34px)", lineHeight: 1.15, fontWeight: 800, letterSpacing: "-.8px", color: "var(--ink)", textWrap: "balance" }}>En platform for det arbejde, der ellers ligger hos de frivillige.</h2>
              </div>
              <div>
                <p style={{ margin: "0 0 22px", fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.75, color: "var(--body)" }}>Bag mange foreninger står frivillige, bestyrelser, kasserere, trænere og forældre, som bruger deres tid på at skabe fællesskab for andre. Men når der skal samles penge ind, bliver arbejdet ofte tungt: der skal oprettes formål, deles links, følges op på bidrag og samles dokumentation til regnskab.</p>
                <p style={{ margin: "0 0 26px", fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.75, color: "var(--body)" }}>StøtMedHjerte er udviklet for at samle den proces ét sted. Foreninger får et fælles overblik over hjertesager, bidrag og dokumentation, og støtter kan bidrage trygt med få klik via MobilePay.</p>
                <p style={{ margin: 0, paddingLeft: "20px", borderLeft: "3px solid var(--brand)", fontSize: "clamp(17.5px,2.6vw,21px)", lineHeight: 1.5, color: "var(--ink)", fontWeight: 600, letterSpacing: "-.3px" }}>Målet er enkelt: mere professionel pengeindsamling, uden at det bliver mere besværligt for de frivillige.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 02 · VIRKSOMHED OG TILLID ============ */}
        <section className="om-sec-pad" style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="om-wrap">
            <div style={{ maxWidth: "760px", margin: "0 0 40px" }}>
              <SectionNum n="02" label="Virksomhed og tillid" />
              <h2 style={{ margin: "0 0 16px", fontSize: "clamp(25px,3.6vw,34px)", lineHeight: 1.15, fontWeight: 800, letterSpacing: "-.8px", color: "var(--ink)", textWrap: "balance" }}>En dansk platform med adresse og ansvar.</h2>
              <p style={{ margin: 0, fontSize: "clamp(16px,2.2vw,17.5px)", lineHeight: 1.65, color: "var(--body)" }}>Vi er ikke en anonym indsamlingsside. StøtMedHjerte drives af en dansk virksomhed med navn, CVR og adresse, og bidrag går direkte til foreningernes egne konti.</p>
            </div>
            <div className="om-facts">
              {FACTS.map((f) => (
                <div key={f.title} style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "24px" }}>
                  <span style={{ display: "inline-flex", width: "42px", height: "42px", borderRadius: "12px", background: "var(--brand-surface)", color: "var(--brand)", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}><Ic d={f.d} size={21} sw={2} /></span>
                  <h3 style={{ margin: "0 0 7px", fontSize: "17px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>{f.title}</h3>
                  <p style={{ margin: 0, fontSize: "14.5px", lineHeight: 1.6, color: "var(--body)" }}>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 03 · PLATFORMEN ============ */}
        <section className="om-sec-pad" style={{ background: "var(--surface)" }}>
          <div className="om-wrap">
            <div style={{ maxWidth: "760px", margin: "0 0 40px" }}>
              <SectionNum n="03" label="Platformen" />
              <h2 style={{ margin: "0 0 16px", fontSize: "clamp(25px,3.6vw,34px)", lineHeight: 1.15, fontWeight: 800, letterSpacing: "-.8px", color: "var(--ink)", textWrap: "balance" }}>Én sammenhængende infrastruktur.</h2>
              <p style={{ margin: 0, fontSize: "clamp(16px,2.2vw,17.5px)", lineHeight: 1.65, color: "var(--body)" }}>Hjertesager, bidrag og regnskabsgrundlag hænger sammen som dele af den samme struktur. Det, der sker i én del, samles automatisk i foreningens overblik.</p>
            </div>

            <div style={{ position: "relative", borderRadius: "24px", border: "1px solid var(--smh-border)", background: "var(--page)", boxShadow: "0 50px 110px -54px rgba(8,14,26,.3)", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(8,14,26,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(8,14,26,.045) 1px,transparent 1px)", backgroundSize: "34px 34px" }} />
              <div style={{ position: "relative", padding: "clamp(22px,3.6vw,40px)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "clamp(20px,3vw,30px)" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: ".8px", textTransform: "uppercase", color: "var(--label)" }}>Platformstruktur</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "12px", fontWeight: 600, color: "var(--smh-muted)", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "999px", padding: "6px 12px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--success)" }} />app.stotmedhjerte.dk</span>
                </div>

                <div className="om-infra-top">
                  {INFRA.map((it) => (
                    <div key={it.title} style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "16px", padding: "18px" }}>
                      <span style={{ display: "inline-flex", width: "38px", height: "38px", borderRadius: "11px", background: "var(--brand-surface)", color: "var(--brand)", alignItems: "center", justifyContent: "center", marginBottom: "13px" }}><Ic d={it.d} size={19} sw={2} /></span>
                      <div style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-.2px", color: "var(--ink)", marginBottom: "4px" }}>{it.title}</div>
                      <div style={{ fontSize: "13px", lineHeight: 1.55, color: "var(--smh-muted)" }}>{it.body}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
                  <svg width="20" height="34" viewBox="0 0 20 34" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .55 }}><path d="M10 2v24" /><path d="m3 19 7 7 7-7" /></svg>
                </div>

                <div style={{ background: "var(--navy1)", borderRadius: "16px", padding: "clamp(18px,2.6vw,24px)", display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ display: "inline-flex", flexShrink: 0, width: "46px", height: "46px", borderRadius: "13px", background: "rgba(255,255,255,.08)", color: "#fff", alignItems: "center", justifyContent: "center" }}><Ic d='<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M7 15h4"/>' size={22} sw={2} /></span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "clamp(15px,2.2vw,17px)", fontWeight: 700, letterSpacing: "-.3px", color: "#fff", marginBottom: "3px" }}>Foreningens samlede overblik</div>
                    <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "#AEB9CC" }}>Status, bidrag og dokumentation samlet ét sted. Udbetaling går direkte til foreningens konto.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 04 · SIKKERHED OG ANSVAR (navy) ============ */}
        <section style={{ background: "var(--navy1)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-140px", right: "-100px", width: "480px", height: "480px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.13),transparent 65%)" }} />
          <div className="om-wrap" style={{ position: "relative", paddingTop: "clamp(64px,9vw,104px)", paddingBottom: "clamp(64px,9vw,104px)" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
              <SectionNum n="04" label="Sikkerhed og ansvar" dark />
              <p style={{ margin: "0 0 28px", fontSize: "clamp(15.5px,2.2vw,17px)", lineHeight: 1.7, color: "#AEB9CC", maxWidth: "680px" }}>StøtMedHjerte er udviklet med fokus på tryg drift. Følsomme oplysninger krypteres, centrale handlinger logges, og foreninger CVR-valideres, før de kan bruge platformen. Betalinger gennemføres via MobilePay, og bidrag går direkte til foreningens egen konto.</p>
              <h2 style={{ margin: "0 0 18px", fontSize: "clamp(26px,5vw,46px)", lineHeight: 1.16, fontWeight: 800, letterSpacing: "-1.2px", color: "#fff", textWrap: "balance" }}>Vi lover ikke, at teknologi kan fjerne foreningens ansvar.</h2>
              <p style={{ margin: "0 0 30px", fontSize: "clamp(16px,2.4vw,20px)", lineHeight: 1.55, fontWeight: 500, color: "#AEB9CC", maxWidth: "640px" }}>Men vi bygger værktøjer, der gør det lettere at skabe struktur, overblik og dokumentation.</p>
              <Link to="/sikkerhed" className="om-btn-navy" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#fff", fontSize: "15.5px", fontWeight: 600, padding: "14px 26px", minHeight: "50px", borderRadius: "999px", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.16)" }}>Læs mere om sikkerhed<Ic d={ARROW_R} size={16} sw={2.2} /></Link>
            </div>
          </div>
        </section>

        {/* ============ 05 · LAES MERE OM OS ============ */}
        <section className="om-sec-pad" style={{ background: "var(--surface)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="om-wrap">
            <div style={{ maxWidth: "760px", margin: "0 0 40px" }}>
              <SectionNum n="05" label="Læs mere om os" />
              <h2 style={{ margin: 0, fontSize: "clamp(25px,3.6vw,34px)", lineHeight: 1.15, fontWeight: 800, letterSpacing: "-.8px", color: "var(--ink)", textWrap: "balance" }}>Gå tættere på, hvem vi er.</h2>
            </div>
            <div className="om-links">
              {MORE.map((m) => (
                <Link key={m.to} to={m.to} className="om-link-card" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "var(--page)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "26px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <span style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-.4px", color: "var(--ink)" }}>{m.title}</span>
                    <span style={{ color: "var(--brand)" }}><Ic d={ARROW_R} size={18} sw={2.2} /></span>
                  </div>
                  <span style={{ fontSize: "14.5px", lineHeight: 1.6, color: "var(--body)" }}>{m.body}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============ AFSLUTTENDE CTA ============ */}
        <section style={{ background: "var(--alt)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="om-wrap" style={{ paddingTop: "64px", paddingBottom: "64px", textAlign: "center" }}>
            <h2 style={{ margin: "0 0 14px", fontSize: "clamp(24px,3.6vw,34px)", lineHeight: 1.15, fontWeight: 800, letterSpacing: "-.7px", color: "var(--ink)" }}>Vil du vide mere?</h2>
            <p style={{ margin: "0 auto 26px", maxWidth: "520px", fontSize: "clamp(15.5px,2.2vw,17px)", lineHeight: 1.6, color: "var(--body)" }}>Opret jeres forening, eller se hvordan en hjertesag bliver til konkrete bidrag.</p>
            <div className="om-cta-row" style={{ justifyContent: "center" }}>
              <Link to="/opret-forening" className="om-cta-w om-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16.5px", fontWeight: 600, padding: "17px 34px", minHeight: "56px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 34px rgba(224,25,63,.24)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
              <Link to="/saadan-virker-det" className="om-cta-w om-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16.5px", fontWeight: 600, padding: "17px 34px", minHeight: "56px", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Sådan virker det</Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
