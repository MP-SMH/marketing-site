import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./VoresMission.css";

function Ic({ d, size = 24, sw = 1.9, stroke = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={style} dangerouslySetInnerHTML={{ __html: d }} />
  );
}

const CHECK = '<path d="M20 6 9 17l-5-5"/>';
const XMARK = '<path d="M18 6 6 18M6 6l12 12"/>';
const ARROW_R = '<path d="M5 12h14M13 6l6 6-6 6"/>';

const IKKE_MED = ["Flere opgaver", "Flere regneark", "Flere løse beskeder"];
const MEN_MED = ["Én samlet platform", "Ét fælles overblik", "Ét sted til dokumentation"];

const FOER = ["Spredte lister og regneark", "Beskeder frem og tilbage", "Manuel optælling"];
const EFTER = ["Samlet overblik", "Bidrag registreret løbende", "Dokumentation klar"];

const PRINCIPLES = [
  { n: "01", title: "Foreningen ejer pengene.", body: "Bidrag går direkte til foreningens egen konto. Vi tager ingen andel af det indsamlede." },
  { n: "02", title: "Struktur slår spredte beskeder.", body: "Ét fælles overblik er mere værd end ti tråde og en god hukommelse." },
  { n: "03", title: "Værktøjer uden oplæring.", body: "Frivillige skal kunne bruge platformen fra første dag, helt uden manual." },
  { n: "04", title: "Gennemsigtighed som standard.", body: "Et klart grundlag for regnskab og for den tilladelse, en offentlig indsamling kræver." },
];

const OUTCOMES = [
  { title: "Hurtigere i gang", body: "En hjertesag er klar på få minutter, ikke en hel eftermiddag.", d: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>' },
  { title: "Samlet overblik", body: "Donationer og faste støtter ligger samme sted, opdateret løbende.", d: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>' },
  { title: "Klar til regnskab", body: "Dokumentationen følger med, så året kan lukkes uden oprydning.", d: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/>' },
];

export default function VoresMissionPage() {
  return (
    <>
      <SiteNav />
      <main className="vm-page">

        {/* ============ HERO (editorial) ============ */}
        <section style={{ background: "var(--page)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,rgba(224,25,63,.25),transparent)" }} />
          <div className="vm-wrap" style={{ position: "relative", paddingTop: "clamp(46px,6.5vw,80px)", paddingBottom: "clamp(22px,3vw,30px)" }}>
            <div style={{ maxWidth: "860px", animation: "vmRise .6s ease both" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "7px 14px", borderRadius: "999px", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", marginBottom: "22px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)" }} />
                <span style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: ".7px", textTransform: "uppercase", color: "var(--brand-hover)" }}>Vores mission</span>
              </div>
              <h1 style={{ margin: "0 0 22px", fontSize: "clamp(32px,5.4vw,56px)", lineHeight: 1.07, fontWeight: 800, letterSpacing: "-1.4px", color: "var(--ink)", textWrap: "balance" }}>Mere overskuelig pengeindsamling for dem, der driver foreningslivet.</h1>
              <p style={{ margin: "0 0 30px", fontSize: "clamp(16.5px,2.3vw,19.5px)", lineHeight: 1.62, color: "var(--body)", maxWidth: "660px" }}>StøtMedHjerte bygger digital struktur omkring det arbejde, der ofte hviler på frivillige, bestyrelser og lokale ildsjæle. Målet er enkelt. Gør det nemmere at samle ind, og giv foreningen det fulde overblik undervejs.</p>
              <div className="vm-cta-row">
                <Link to="/opret-forening" className="vm-cta-w vm-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "15px 28px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 12px 30px rgba(224,25,63,.22)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "9px" }}>Opret forening<Ic d={ARROW_R} size={17} sw={2.4} /></Link>
                <Link to="/den-rene-model" className="vm-cta-w vm-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16px", fontWeight: 600, padding: "15px 26px", minHeight: "54px", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Den rene model</Link>
              </div>
            </div>
          </div>
          <div className="vm-wrap" style={{ position: "relative", paddingBottom: "clamp(40px,6vw,72px)" }}>
            <figure style={{ position: "relative", margin: 0, borderRadius: "24px", overflow: "hidden", border: "1px solid var(--smh-border)", aspectRatio: "16/9", boxShadow: "0 50px 100px -55px rgba(8,14,26,.55)" }}>
              <img src="/images/vores-mission-frivillige-faellesskab.jpg" alt="Frivillige i et dansk lokalt foreningsliv arbejder sammen ved en klubaktivitet" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 55%,rgba(8,14,26,.42))" }} />
              <figcaption style={{ position: "absolute", left: "18px", bottom: "18px", display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 16px", borderRadius: "999px", background: "rgba(8,14,26,.55)", backdropFilter: "blur(10px)" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)" }} />
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#fff", letterSpacing: ".1px" }}>Lokalt foreningsliv, frivillige i handling</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ============ 1. DERFOR FINDES VI ============ */}
        <section style={{ background: "var(--surface)", borderTop: "1px solid var(--smh-border)" }}>
          <div className="vm-wrap vm-sec-pad">
            <div className="vm-split">
              <div>
                <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--brand)", marginBottom: "16px" }}>Derfor findes vi</div>
                <h2 style={{ margin: 0, fontSize: "clamp(25px,3.4vw,36px)", lineHeight: 1.13, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)", textWrap: "balance" }}>Foreningslivet fortjener bedre værktøjer end regneark og løse beskeder.</h2>
              </div>
              <div>
                <p style={{ margin: "0 0 18px", fontSize: "clamp(16px,2.1vw,18px)", lineHeight: 1.72, color: "var(--body)" }}>Pengeindsamling i foreninger foregår stadig mange steder i spredte lister, håndskrevne sedler og beskeder frem og tilbage. Det koster tid, og overblikket bliver skrøbeligt, hver gang en frivillig stopper eller en sæson skifter.</p>
                <p style={{ margin: "0 0 30px", fontSize: "clamp(16px,2.1vw,18px)", lineHeight: 1.72, color: "var(--body)" }}>Vi tror på, at foreningslivet fortjener digitale værktøjer, der er lige så stærke som dem, virksomheder bruger, men enkle nok til at frivillige kan tage dem i brug uden oplæring.</p>
                <div className="vm-compare">
                  <div style={{ border: "1px solid var(--smh-border)", borderRadius: "16px", padding: "20px 20px 18px", background: "var(--page)" }}>
                    <div style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: ".7px", textTransform: "uppercase", color: "var(--smh-muted)", marginBottom: "14px" }}>Vi løser det ikke med</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                      {IKKE_MED.map((t) => (
                        <div key={t} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "var(--body)" }}><Ic d={XMARK} size={16} sw={2.4} stroke="#9AA3AF" />{t}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ border: "1px solid var(--brand-border)", borderRadius: "16px", padding: "20px 20px 18px", background: "var(--brand-surface)" }}>
                    <div style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: ".7px", textTransform: "uppercase", color: "var(--brand-hover)", marginBottom: "14px" }}>Men med</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                      {MEN_MED.map((t) => (
                        <div key={t} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: 600, color: "var(--ink)" }}><Ic d={CHECK} size={16} sw={2.6} stroke="var(--brand)" />{t}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 2. FRA MANUELT TIL STRUKTUR ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="vm-wrap vm-sec-pad">
            <div className="vm-split-img">
              <div>
                <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--indigo)", marginBottom: "16px" }}>Fra manuelt til struktur</div>
                <h2 style={{ margin: "0 0 18px", fontSize: "clamp(25px,3.4vw,36px)", lineHeight: 1.13, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)", textWrap: "balance" }}>Det, der før lå spredt, samles ét sted.</h2>
                <p style={{ margin: "0 0 26px", fontSize: "clamp(16px,2.1vw,18px)", lineHeight: 1.72, color: "var(--body)", maxWidth: "520px" }}>Lister, sedler og samtaler bliver til ét levende overblik. Foreningen ser bidrag, faste støtter og det grundlag, der skal bruges til regnskab, uden at lede efter det.</p>
                <div className="vm-compare">
                  <div style={{ border: "1px solid var(--smh-border)", borderRadius: "16px", padding: "18px", background: "var(--surface)" }}>
                    <div style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: ".7px", textTransform: "uppercase", color: "var(--smh-muted)", marginBottom: "13px" }}>Før</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14.5px", color: "var(--body)", lineHeight: 1.4 }}>
                      {FOER.map((t) => <span key={t}>{t}</span>)}
                    </div>
                  </div>
                  <div style={{ border: "1px solid #DDE3F0", borderRadius: "16px", padding: "18px", background: "#fff", boxShadow: "0 18px 36px -26px rgba(79,70,229,.4)" }}>
                    <div style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: ".7px", textTransform: "uppercase", color: "var(--indigo)", marginBottom: "13px" }}>Efter</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14.5px", fontWeight: 600, color: "var(--ink)", lineHeight: 1.4 }}>
                      {EFTER.map((t) => (
                        <span key={t} style={{ display: "flex", alignItems: "center", gap: "9px" }}><Ic d={CHECK} size={15} sw={2.6} stroke="var(--indigo)" />{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <figure style={{ position: "relative", margin: 0, borderRadius: "22px", overflow: "hidden", border: "1px solid var(--smh-border)", aspectRatio: "16/9", boxShadow: "0 44px 90px -52px rgba(8,14,26,.5)" }}>
                <img src="/images/vores-mission-fra-manuelt-til-struktur.jpg" alt="Manuelle lister og spredte kort samles til et struktureret overblik" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </figure>
            </div>
          </div>
        </section>

        {/* ============ 3. DET VI TROR PAA ============ */}
        <section style={{ background: "var(--surface)" }}>
          <div className="vm-wrap vm-sec-pad">
            <div style={{ maxWidth: "680px", marginBottom: "clamp(34px,4vw,52px)" }}>
              <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#15803D", marginBottom: "16px" }}>Det vi tror på</div>
              <h2 style={{ margin: 0, fontSize: "clamp(25px,3.4vw,36px)", lineHeight: 1.13, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)", textWrap: "balance" }}>Principperne bag platformen.</h2>
            </div>
            <div className="vm-principles">
              {PRINCIPLES.map((p) => (
                <div key={p.n} style={{ position: "relative", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "26px 24px 24px", background: "var(--page)", overflow: "hidden" }}>
                  <span style={{ position: "absolute", top: "8px", right: "18px", fontSize: "64px", fontWeight: 800, lineHeight: 1, color: "rgba(21,128,61,.08)", letterSpacing: "-3px" }}>{p.n}</span>
                  <div style={{ position: "relative", fontSize: "18px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)", marginBottom: "9px" }}>{p.title}</div>
                  <p style={{ position: "relative", margin: 0, fontSize: "15px", lineHeight: 1.62, color: "var(--body)" }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 4. HVAD DET FLYTTER (NAVY) ============ */}
        <section style={{ background: "var(--navy1)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-120px", right: "-80px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.12),transparent 65%)" }} />
          <div className="vm-wrap vm-sec-pad" style={{ position: "relative" }}>
            <div style={{ maxWidth: "680px", marginBottom: "clamp(34px,4vw,52px)" }}>
              <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--amber)", marginBottom: "16px" }}>Hvad det flytter</div>
              <h2 style={{ margin: 0, fontSize: "clamp(25px,3.4vw,36px)", lineHeight: 1.13, fontWeight: 800, letterSpacing: "-1px", color: "#fff", textWrap: "balance" }}>Hvad struktur betyder i hverdagen.</h2>
            </div>
            <div className="vm-outcomes">
              {OUTCOMES.map((o) => (
                <div key={o.title} style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: "18px", padding: "26px 24px", background: "rgba(255,255,255,.04)" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(244,183,64,.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}><Ic d={o.d} size={21} sw={2} stroke="var(--amber)" /></div>
                  <div style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-.3px", color: "#fff", marginBottom: "9px" }}>{o.title}</div>
                  <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.62, color: "#AEB9CC" }}>{o.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ AFSLUTTENDE CTA ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="vm-wrap" style={{ paddingTop: "clamp(56px,7vw,84px)", paddingBottom: "clamp(56px,7vw,84px)", textAlign: "center" }}>
            <h2 style={{ margin: "0 auto 14px", maxWidth: "680px", fontSize: "clamp(25px,3.6vw,38px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-1px", color: "var(--ink)", textWrap: "balance" }}>Vær med til at gøre foreningslivet lettere.</h2>
            <p style={{ margin: "0 auto 30px", maxWidth: "520px", fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.6, color: "var(--body)" }}>Opret en forening på få minutter, eller find en hjertesag, du vil støtte.</p>
            <div className="vm-cta-row" style={{ justifyContent: "center" }}>
              <Link to="/hjertesager" className="vm-cta-w vm-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16.5px", fontWeight: 600, padding: "16px 32px", minHeight: "56px", borderRadius: "999px", background: "var(--surface)", border: "1px solid var(--smh-border)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Find en hjertesag</Link>
              <Link to="/opret-forening" className="vm-cta-w vm-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16.5px", fontWeight: 600, padding: "16px 32px", minHeight: "56px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 34px rgba(224,25,63,.24)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
            </div>
            <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "8px 24px", justifyContent: "center" }}>
              <Link to="/saadan-virker-det" className="vm-textlink" style={{ textDecoration: "none", color: "var(--body)", fontSize: "14.5px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "6px" }}>Sådan virker det<Ic d={ARROW_R} size={15} sw={2.4} /></Link>
              <Link to="/priser" className="vm-textlink" style={{ textDecoration: "none", color: "var(--body)", fontSize: "14.5px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "6px" }}>Se priser<Ic d={ARROW_R} size={15} sw={2.4} /></Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
