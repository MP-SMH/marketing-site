import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./ForStoetter.css";

function Ic({ d, size = 24, sw = 1.9, stroke = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: d }} />
  );
}

const PURPOSES = ["Nyt udstyr", "Aktiviteter for børn og unge", "En tur", "Bedre faciliteter", "Et lokalt projekt"];

const STEPS = [
  { n: "1", title: "Vælg en hjertesag", body: "Find den forening eller det formål, du gerne vil støtte." },
  { n: "2", title: "Vælg beløb", body: "Støt med et beløb, der passer til dig." },
  { n: "3", title: "Betal med MobilePay", body: "Du godkender betalingen i MobilePay-appen." },
  { n: "4", title: "Bidraget går direkte til foreningen", body: "Beløbet går direkte til foreningens egen MobilePay-konto." },
];

const TRUST = [
  { title: "Direkte til foreningen", body: "Bidrag går direkte til foreningens egen MobilePay-konto.", d: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>' },
  { title: "Betaling via MobilePay", body: "Du godkender betalingen i MobilePay-appen.", d: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>' },
  { title: "CVR-validerede foreninger", body: "Foreninger valideres på CVR, før de kan bruge platformen.", d: '<path d="M9 12l2 2 4-4"/><path d="M21 12c0 5-3.5 7.5-8.6 9a1 1 0 0 1-.8 0C6.5 19.5 3 17 3 12V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.4 1.4 0 0 1 1.6 0C13.5 3.8 16 5 18 5a1 1 0 0 1 1 1z"/>' },
  { title: "Tydeligt formål", body: "Hver hjertesag viser, hvad foreningen samler ind til.", d: '<circle cx="12" cy="12" r="3"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>' },
];

export default function ForStoetterPage() {
  return (
    <>
      <SiteNav />
      <main className="fs-page">

        {/* ============ HERO ============ */}
        <section className="fs-wrap" style={{ paddingTop: "48px", paddingBottom: "56px" }}>
          <div className="fs-hero-grid">
            <div style={{ animation: "fsRise .6s ease both" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 15px", borderRadius: "999px", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", marginBottom: "22px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)" }} />
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--brand-hover)", letterSpacing: "-.1px" }}>For dig der vil støtte</span>
              </div>
              <h1 style={{ margin: "0 0 20px", fontSize: "clamp(32px,5.4vw,54px)", lineHeight: 1.06, fontWeight: 800, letterSpacing: "-1.2px", color: "var(--ink)", textWrap: "balance" }}>Støt en hjertesag uden at oprette profil.</h1>
              <p style={{ margin: "0 0 30px", fontSize: "clamp(16px,2.4vw,18.5px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "540px" }}>Find en hjertesag, vælg det beløb du vil støtte med, og godkend bidraget i MobilePay-appen, som du allerede bruger.</p>
              <div className="fs-cta-row" style={{ marginBottom: "24px" }}>
                <Link to="/hjertesager" className="fs-cta-w fs-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "16px 30px", minHeight: "54px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 12px 30px rgba(224,25,63,.22)" }}>Find hjertesag</Link>
                <a href="#saadan" className="fs-cta-w fs-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16px", fontWeight: 600, padding: "16px 30px", minHeight: "54px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)" }}>Sådan støtter du</a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--smh-muted)", fontSize: "14.5px", fontWeight: 500 }}>
                <Ic d='<path d="M20 6 9 17l-5-5"/>' size={18} sw={2.2} stroke="var(--success)" />
                Bidraget går direkte til foreningens egen MobilePay-konto.
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", animation: "fsRise .7s .12s ease both" }}>
              <div className="fs-hero-stage" style={{ width: "100%", maxWidth: "360px" }}>
                <div className="fs-hero-glow" />
                <figure style={{ position: "relative", zIndex: 1, margin: 0, borderRadius: "30px", overflow: "hidden", border: "1px solid var(--smh-border)", aspectRatio: "4/5", boxShadow: "0 40px 90px -40px rgba(8,14,26,.34)" }}>
                  <img src="/images/for-stoetter-mobilbetaling-tryg-stoette.jpg" alt="En person støtter en lokal hjertesag på sin telefon" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 28%", display: "block" }} />
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ============ HVAD KAN DU STØTTE ============ */}
        <section className="fs-wrap fs-sec-pad" style={{ textAlign: "center" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto 36px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--label)", marginBottom: "14px" }}>Hvad kan du støtte</div>
            <h2 style={{ margin: "0 0 18px", fontSize: "clamp(27px,4.4vw,40px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>Støt konkrete formål, du kan forstå.</h2>
            <p style={{ margin: 0, fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.6, color: "var(--body)" }}>En hjertesag er en indsamling til et tydeligt formål. Det kan være nyt udstyr, aktiviteter for børn og unge, en tur, bedre faciliteter eller et lokalt projekt. Når du støtter gennem StøtMedHjerte, kan du se, hvad foreningen samler ind til, og hvordan dit bidrag hjælper.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", maxWidth: "760px", margin: "0 auto" }}>
            {PURPOSES.map((p) => (
              <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "13px 22px", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)", fontSize: "15px", fontWeight: 600, color: "var(--ink)" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)" }} />{p}
              </span>
            ))}
          </div>
        </section>

        {/* ============ SÅDAN STØTTER DU ============ */}
        <section id="saadan" style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="fs-sec-pad fs-wrap">
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--label)", marginBottom: "14px" }}>Sådan støtter du</div>
              <h2 style={{ margin: "0 auto", fontSize: "clamp(27px,4.4vw,40px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", maxWidth: "560px", textWrap: "balance" }}>Det tager kun få sekunder.</h2>
            </div>
            <div className="fs-flow-steps">
              {STEPS.map((s) => (
                <div key={s.n} className="fs-flow-step">
                  <div className="fs-flow-badge">{s.n}</div>
                  <div className="fs-flow-conn" />
                  <div style={{ paddingTop: "3px" }}>
                    <h3 style={{ margin: "0 0 8px", fontSize: "17px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>{s.title}</h3>
                    <p style={{ margin: 0, fontSize: "14.5px", lineHeight: 1.55, color: "var(--body)" }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TRYGHED ============ */}
        <section className="fs-wrap fs-sec-pad">
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--label)", marginBottom: "14px" }}>Tryghed</div>
            <h2 style={{ margin: "0 auto", fontSize: "clamp(27px,4.4vw,40px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", maxWidth: "560px", textWrap: "balance" }}>Støt med ro i maven.</h2>
          </div>
          <div className="fs-g4">
            {TRUST.map((t) => (
              <div key={t.title} className="fs-trust-card" style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "26px", padding: "30px 28px" }}>
                <div style={{ width: "50px", height: "50px", borderRadius: "16px", background: "var(--brand-surface)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px", color: "var(--brand)" }}><Ic d={t.d} size={22} sw={2} /></div>
                <h3 style={{ margin: "0 0 9px", fontSize: "18px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>{t.title}</h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: 1.6, color: "var(--body)" }}>{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ FAST STØTTE ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="fs-sec-pad fs-wrap">
            <div className="fs-split">
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--brand)", marginBottom: "14px" }}>Fast støtte</div>
                <h2 style={{ margin: "0 0 18px", fontSize: "clamp(26px,4.2vw,38px)", lineHeight: 1.14, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>Gør din støtte fast.</h2>
                <p style={{ margin: "0 0 26px", fontSize: "clamp(16px,2.2vw,17.5px)", lineHeight: 1.65, color: "var(--body)" }}>Nogle foreninger tilbyder fast støtte. Det betyder, at du kan støtte med et fast månedligt beløb og være med til at give foreningen mere ro i planlægningen. Oprettelse og betaling håndteres via MobilePay-appen, som du allerede bruger.</p>
                <Link to="/hjertesager" className="fs-cta-w fs-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "16px 30px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 12px 30px rgba(224,25,63,.22)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Se foreninger med fast støtte</Link>
              </div>
              <figure className="fs-photo-on-mobile" style={{ margin: 0, borderRadius: "24px", overflow: "hidden", border: "1px solid var(--smh-border)", aspectRatio: "4/5", boxShadow: "0 30px 70px -36px rgba(8,14,26,.16)" }}>
                <img src="/images/for-stoetter-fast-stoette-forening.jpg" alt="En fast støtte bakker op om sin lokale forening via mobilen" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </figure>
            </div>
          </div>
        </section>

        {/* ============ INGEN EKSTRA PROFIL (NAVY) ============ */}
        <section style={{ background: "var(--navy1)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-120px", right: "-80px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.16),transparent 65%)" }} />
          <div className="fs-sec-pad" style={{ maxWidth: "820px", margin: "0 auto", paddingLeft: "20px", paddingRight: "20px", position: "relative", textAlign: "center" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#8FA0BC", marginBottom: "14px" }}>Enkelt for dig</div>
            <h2 style={{ margin: "0 auto 22px", fontSize: "clamp(28px,4.6vw,42px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-1px", color: "#fff", maxWidth: "640px", textWrap: "balance" }}>Du bruger bare MobilePay.</h2>
            <p style={{ margin: "0 auto 32px", fontSize: "clamp(16px,2.4vw,18px)", lineHeight: 1.65, color: "#AEB9CC", maxWidth: "620px" }}>Som støtte skal du ikke oprette en ny profil på StøtMedHjerte. Du vælger hjertesag, vælger beløb og godkender betalingen i MobilePay-appen. Det gør støtten enkel, genkendelig og hurtig for almindelige MobilePay-brugere.</p>
            <Link to="/hjertesager" className="fs-cta-w fs-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16.5px", fontWeight: 600, padding: "17px 34px", minHeight: "56px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 34px rgba(224,25,63,.28)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Find hjertesag</Link>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
