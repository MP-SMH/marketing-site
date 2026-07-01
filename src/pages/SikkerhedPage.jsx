import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./Sikkerhed.css";

function Ic({ d, size = 24, sw = 1.9, stroke = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={style} dangerouslySetInnerHTML={{ __html: d }} />
  );
}

const CHECK = '<path d="M20 6 9 17l-5-5"/>';
const ARROW_R = '<path d="M5 12h14M13 6l6 6-6 6"/>';
const XCIRCLE = '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>';

const HERO_CHIPS = ["CVR-valideret", "Kryptering", "Revisionsspor", "Roller og adgang"];

const RINGS = [
  { n: "1", label: "Adgangsstyring" },
  { n: "2", label: "CVR-validering" },
  { n: "3", label: "Kryptering" },
  { n: "4", label: "Revisionsspor" },
];

const LAYERS = [
  { lag: "LAG 01", title: "Adgangsstyring", body: "Roller for bestyrelse og kasserer. Kun de rette får adgang.", d: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
  { lag: "LAG 02", title: "CVR-validering", body: "Foreningen skal have et gyldigt, registreret CVR-nummer.", d: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 15l2 2 4-4"/>' },
  { lag: "LAG 03", title: "Kryptering", body: "Følsomme data beskyttes ved overførsel og opbevaring.", d: '<rect x="3" y="11" width="18" height="11" rx="2"/><circle cx="12" cy="16" r="1.3"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>' },
  { lag: "LAG 04", title: "Revisionsspor", body: "Centrale handlinger kan registreres og følges internt.", d: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8M13 12h8M13 18h8"/>' },
];

const FLOW = [
  { trin: "TRIN 1", title: "Støtte vælger beløb", body: "Vælger et beløb til en konkret hjertesag.", tag: "fx 200 kr", tagCyan: false, d: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>' },
  { trin: "TRIN 2", title: "Godkendes i MobilePay", body: "Betalingen bekræftes i støttens egen MobilePay-app.", tag: "Godkend i app", tagCyan: true, d: '<rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="M11 18h2"/>' },
  { trin: "TRIN 3", title: "Direkte til foreningen", body: "Beløbet udbetales til foreningens egen MobilePay-konto.", tag: "Foreningens konto", tagCyan: false, d: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>' },
];

const REGISTRERER = ["Status på det enkelte bidrag", "Kvittering og journalnummer", "Tilknyttet hjertesag og forening"];
const OPBEVARER_IKKE = ["Kortoplysninger", "Bankkontonumre", "CPR på støtter"];

const FORENINGEN = ["Ejer relationen til sine støtter og ansvaret for indsamlingen", "Står for korrekt brug af bidrag og for foreningens regnskab", "Følger gældende regler for indsamling og dokumentation"];
const SMH_ROLE = ["Leverer platform, adgangsstyring og dokumentationsgrundlag", "Behandler data efter aftale og begrænser adgang til relevante brugere", "Håndterer ikke selve donorbetalingen, den går via MobilePay"];

const FAQ = [
  { q: "Opbevarer I mine kortoplysninger?", a: "Nej. Betalingen godkendes i MobilePay, og vi opbevarer ikke kort- eller bankoplysninger på støtter." },
  { q: "Garanterer I resultatet af en indsamling?", a: "Nej. Vi stiller værktøjer til rådighed, men formidler ikke garantier for et bestemt indsamlet beløb. Bidrag går direkte til foreningen." },
];

export default function SikkerhedPage() {
  const flowCard = { background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "18px", padding: "22px", display: "flex", flexDirection: "column", gap: "11px", height: "100%" };
  const flowIcon = { width: "42px", height: "42px", borderRadius: "12px", background: "color-mix(in srgb,var(--cyan) 16%,#0B1424)", border: "1px solid color-mix(in srgb,var(--cyan) 30%,transparent)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cyan)" };

  return (
    <>
      <SiteNav />
      <main className="sik-page">

        {/* ============ HERO (navy) ============ */}
        <section style={{ background: "var(--navy1)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-160px", left: "-120px", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle,color-mix(in srgb,var(--cyan) 16%,transparent),transparent 64%)", pointerEvents: "none" }} />
          <div className="sik-wrap" style={{ position: "relative", paddingTop: "64px", paddingBottom: "68px" }}>
            <div className="sik-hero">
              <div style={{ animation: "sikRise .6s ease both" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 14px", borderRadius: "999px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", marginBottom: "22px" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 10px var(--cyan)" }} />
                  <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#AEB9CC", letterSpacing: ".3px" }}>Sikkerhed</span>
                </div>
                <h1 style={{ margin: "0 0 20px", fontSize: "clamp(31px,5vw,52px)", lineHeight: 1.06, fontWeight: 800, letterSpacing: "-1.3px", color: "#fff", textWrap: "balance" }}>Sikkerhed bygget ind i platformens struktur.</h1>
                <p style={{ margin: "0 0 26px", fontSize: "clamp(16px,2.3vw,18.5px)", lineHeight: 1.66, color: "#AEB9CC", maxWidth: "520px" }}>StøtMedHjerte er bygget, så betaling, adgang og dokumentation hænger sammen fra start. Her kan du se, hvordan vi arbejder med sikker betaling via MobilePay, CVR-validering, kryptering og revisionsspor, uden løfter vi ikke kan holde.</p>
                <div className="sik-cta-row" style={{ marginBottom: "26px" }}>
                  <Link to="/opret-forening" className="sik-cta-w sik-btn-brand" style={{ textDecoration: "none", textAlign: "center", color: "#fff", fontSize: "15.5px", fontWeight: 600, padding: "15px 26px", minHeight: "52px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 12px 30px rgba(224,25,63,.26)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
                  <a href="#betaling" className="sik-cta-w sik-btn-navy" style={{ textDecoration: "none", textAlign: "center", color: "#fff", fontSize: "15.5px", fontWeight: 600, padding: "15px 26px", minHeight: "52px", borderRadius: "999px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.16)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>Se betalingsflowet <Ic d='<path d="M12 5v14M5 12l7 7 7-7"/>' size={15} sw={2.4} /></a>
                </div>
                <div className="sik-tchips">
                  {HERO_CHIPS.map((c) => (
                    <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "7px 13px", borderRadius: "999px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", fontSize: "12.5px", fontWeight: 600, color: "#D4ECF4" }}><Ic d={CHECK} size={13} sw={3} stroke="var(--cyan)" />{c}</span>
                  ))}
                </div>
              </div>

              {/* Koncentrisk sikkerheds-ring */}
              <div style={{ animation: "sikRise .7s ease both" }}>
                <div className="sik-archpanel" role="img" aria-label="Sikkerhedsarkitektur: adgangsstyring, CVR-validering, kryptering og revisionsspor omkring foreningens data.">
                  <div className="sik-archgrid" />
                  <div className="sik-archglow" />
                  <div className="sik-ring" style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: "18px" }}>
                    <div className="sik-clab"><b>{RINGS[0].n}</b><span>{RINGS[0].label}</span></div>
                    <div className="sik-ring" style={{ border: "1px solid color-mix(in srgb,var(--cyan) 24%,transparent)", borderRadius: "16px" }}>
                      <div className="sik-clab"><b>{RINGS[1].n}</b><span>{RINGS[1].label}</span></div>
                      <div className="sik-ring" style={{ border: "1px solid color-mix(in srgb,var(--cyan) 36%,transparent)", borderRadius: "14px" }}>
                        <div className="sik-clab"><b>{RINGS[2].n}</b><span>{RINGS[2].label}</span></div>
                        <div className="sik-ring" style={{ border: "1px solid color-mix(in srgb,var(--cyan) 52%,transparent)", borderRadius: "12px" }}>
                          <div className="sik-clab"><b>{RINGS[3].n}</b><span>{RINGS[3].label}</span></div>
                          <div className="sik-core">
                            <Ic d='<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>' size={22} stroke="var(--cyan)" />
                            <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff", letterSpacing: "-.2px" }}>Foreningens data</span>
                            <span style={{ fontSize: "11.5px", color: "#A9BBD2", letterSpacing: ".2px" }}>overblik, regnskab, bidrag</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p style={{ margin: "14px 2px 0", fontSize: "12.5px", lineHeight: 1.5, color: "#7C8AA0" }}>Foreningens data ligger inderst, omkranset af fire lag. Illustrationen viser opbygningen, ikke et faktisk skærmbillede.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FIRE LAG ============ */}
        <section className="sik-wrap sik-sec-pad">
          <div style={{ maxWidth: "720px", marginBottom: "28px" }}>
            <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--cyan-ink)", marginBottom: "13px" }}>Teknisk opbygning</div>
            <h2 style={{ margin: 0, fontSize: "clamp(26px,4.2vw,38px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>Fire lag, der er bygget ind i platformen.</h2>
          </div>
          <div className="sik-laglist">
            {LAYERS.map((l) => (
              <div key={l.lag}>
                <div style={{ display: "flex", alignItems: "center", gap: "11px", marginBottom: "13px" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: "var(--cyan-surface)", border: "1px solid var(--cyan-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cyan-ink)", flexShrink: 0 }}><Ic d={l.d} size={19} /></div>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".6px", color: "var(--label)" }}>{l.lag}</span>
                </div>
                <h3 style={{ margin: "0 0 6px", fontSize: "16.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>{l.title}</h3>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: 1.55, color: "var(--body)" }}>{l.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ BETALINGSDATA FLOW ============ */}
        <section id="betaling" style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="sik-wrap sik-sec-pad">
            <div style={{ maxWidth: "680px", marginBottom: "36px" }}>
              <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--cyan-ink)", marginBottom: "13px" }}>Betalingsdata</div>
              <h2 style={{ margin: "0 0 14px", fontSize: "clamp(26px,4.2vw,38px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>Betalingen går via MobilePay, ikke gennem os.</h2>
              <p style={{ margin: 0, fontSize: "clamp(15.5px,2.2vw,17px)", lineHeight: 1.65, color: "var(--body)" }}>Når en støtte giver et bidrag, godkendes det i MobilePay-appen, og beløbet går direkte til foreningens egen MobilePay-konto. StøtMedHjerte opbevarer ikke kort- eller bankoplysninger.</p>
            </div>

            <div className="sik-archpanel" style={{ aspectRatio: "auto", display: "block", padding: "clamp(20px,3vw,34px)", containerType: "normal" }}>
              <div className="sik-archgrid" />
              <div style={{ position: "relative" }}>
                <div className="sik-flow">
                  {FLOW.map((f, i) => (
                    <React.Fragment key={f.trin}>
                      <div style={flowCard}>
                        <div style={flowIcon}><Ic d={f.d} size={21} /></div>
                        <div>
                          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".5px", color: "var(--cyan)", marginBottom: "3px" }}>{f.trin}</div>
                          <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff", letterSpacing: "-.3px", marginBottom: "5px" }}>{f.title}</div>
                          <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "#AEB9CC" }}>{f.body}</div>
                        </div>
                        <span style={{ alignSelf: "flex-start", marginTop: "2px", fontSize: "12.5px", fontWeight: 700, ...(f.tagCyan ? { color: "#7BE7F5", background: "color-mix(in srgb,var(--cyan) 14%,transparent)", border: "1px solid color-mix(in srgb,var(--cyan) 30%,transparent)" } : { color: "#fff", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)" }), padding: "5px 11px", borderRadius: "999px" }}>{f.tag}</span>
                      </div>
                      {i < FLOW.length - 1 && <div className="sik-flow-arrow"><Ic d={ARROW_R} size={22} sw={2.4} /></div>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="sik-resp" style={{ marginTop: "18px" }}>
              <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "20px", padding: "26px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "var(--cyan-surface)", border: "1px solid var(--cyan-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cyan-ink)" }}><Ic d={CHECK} size={18} sw={2.4} /></div>
                  <h3 style={{ margin: 0, fontSize: "16.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Det registrerer StøtMedHjerte</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                  {REGISTRERER.map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}><Ic d={CHECK} size={17} sw={2.6} stroke="var(--cyan-ink)" style={{ flexShrink: 0, marginTop: "2px" }} /><span style={{ fontSize: "14.5px", lineHeight: 1.5, color: "var(--body)" }}>{t}</span></div>
                  ))}
                </div>
              </div>
              <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "20px", padding: "26px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "var(--alt)", border: "1px solid var(--smh-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--smh-muted)" }}><Ic d={XCIRCLE} size={18} sw={2} /></div>
                  <h3 style={{ margin: 0, fontSize: "16.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Det opbevarer vi ikke</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                  {OPBEVARER_IKKE.map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}><Ic d={XCIRCLE} size={17} sw={2.2} stroke="var(--smh-muted)" style={{ flexShrink: 0, marginTop: "2px" }} /><span style={{ fontSize: "14.5px", lineHeight: 1.5, color: "var(--smh-muted)", textDecoration: "line-through", textDecorationColor: "#C4CBD6" }}>{t}</span></div>
                  ))}
                </div>
              </div>
            </div>
            <p style={{ margin: "18px 2px 0", fontSize: "13px", lineHeight: 1.55, color: "var(--smh-muted)" }}>Selve betalingen håndteres af MobilePay. Se MobilePays egne vilkår for behandling af betalingsdata.</p>
          </div>
        </section>

        {/* ============ DATAANSVAR OG ROLLER ============ */}
        <section className="sik-wrap sik-sec-pad">
          <div style={{ maxWidth: "680px", marginBottom: "36px" }}>
            <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--cyan-ink)", marginBottom: "13px" }}>Roller og ansvar</div>
            <h2 style={{ margin: "0 0 14px", fontSize: "clamp(26px,4.2vw,38px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>Hvem har ansvar for hvad.</h2>
            <p style={{ margin: 0, fontSize: "clamp(15.5px,2.2vw,17px)", lineHeight: 1.65, color: "var(--body)" }}>Foreningen ejer relationen til sine støtter og sit regnskab. StøtMedHjerte leverer platformen og værktøjerne omkring den.</p>
          </div>
          <div className="sik-resp">
            <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "22px", padding: "30px 28px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px", color: "var(--brand)" }}><Ic d='<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>' size={23} /></div>
              <h3 style={{ margin: "0 0 12px", fontSize: "19px", fontWeight: 700, letterSpacing: "-.4px", color: "var(--ink)" }}>Foreningen</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                {FORENINGEN.map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}><span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--brand)", flexShrink: 0, marginTop: "8px" }} /><span style={{ fontSize: "14.5px", lineHeight: 1.55, color: "var(--body)" }}>{t}</span></div>
                ))}
              </div>
              <Link to="/tilladelse-og-regnskab" style={{ display: "inline-flex", alignItems: "center", gap: "7px", textDecoration: "none", color: "var(--brand)", fontSize: "14.5px", fontWeight: 600 }}>Tilladelse og regnskab <Ic d={ARROW_R} size={15} sw={2.4} /></Link>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "22px", padding: "30px 28px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "var(--cyan-surface)", border: "1px solid var(--cyan-border)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px", color: "var(--cyan-ink)" }}><Ic d='<rect x="2" y="3" width="20" height="6" rx="1.5"/><rect x="2" y="15" width="20" height="6" rx="1.5"/><path d="M6 6h.01M6 18h.01"/>' size={23} /></div>
              <h3 style={{ margin: "0 0 12px", fontSize: "19px", fontWeight: 700, letterSpacing: "-.4px", color: "var(--ink)" }}>StøtMedHjerte</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                {SMH_ROLE.map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}><span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--cyan-ink)", flexShrink: 0, marginTop: "8px" }} /><span style={{ fontSize: "14.5px", lineHeight: 1.55, color: "var(--body)" }}>{t}</span></div>
                ))}
              </div>
              <Link to="/lovgivning-og-ansvar" style={{ display: "inline-flex", alignItems: "center", gap: "7px", textDecoration: "none", color: "var(--cyan-ink)", fontSize: "14.5px", fontWeight: 600 }}>Lovgivning og ansvar <Ic d={ARROW_R} size={15} sw={2.4} /></Link>
            </div>
          </div>
        </section>

        {/* ============ UDEN OVERCLAIMS / FAQ ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="sik-wrap sik-sec-pad">
            <div style={{ maxWidth: "680px", marginBottom: "34px" }}>
              <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--cyan-ink)", marginBottom: "13px" }}>Uden overclaims</div>
              <h2 style={{ margin: "0 0 14px", fontSize: "clamp(26px,4.2vw,38px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>Hvad vi lover, og hvad vi ikke lover.</h2>
              <p style={{ margin: 0, fontSize: "clamp(15.5px,2.2vw,17px)", lineHeight: 1.65, color: "var(--body)" }}>Vi beskriver det, platformen rent faktisk gør. Vi sælger ikke certificeringer eller garantier, vi ikke kan stå inde for.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "860px" }}>
              {FAQ.map((f) => (
                <div key={f.q} style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "24px 26px" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "16.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>{f.q}</h3>
                  <p style={{ margin: 0, fontSize: "14.5px", lineHeight: 1.6, color: "var(--body)" }}>{f.a}</p>
                </div>
              ))}
              <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "24px 26px" }}>
                <h3 style={{ margin: "0 0 8px", fontSize: "16.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Hvor kan jeg læse mere?</h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: 1.6, color: "var(--body)" }}>Se <Link to="/lovgivning-og-ansvar" style={{ color: "var(--cyan-ink)", textDecoration: "none", fontWeight: 600 }}>Lovgivning og ansvar</Link>, <Link to="/tilladelse-og-regnskab" style={{ color: "var(--cyan-ink)", textDecoration: "none", fontWeight: 600 }}>Tilladelse og regnskab</Link> eller vores samlede <Link to="/faq" style={{ color: "var(--cyan-ink)", textDecoration: "none", fontWeight: 600 }}>FAQ</Link>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ AFSLUTTENDE CTA (navy) ============ */}
        <section style={{ background: "var(--navy1)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: "-160px", right: "-110px", width: "480px", height: "480px", borderRadius: "50%", background: "radial-gradient(circle,color-mix(in srgb,var(--cyan) 13%,transparent),transparent 64%)", pointerEvents: "none" }} />
          <div className="sik-wrap" style={{ position: "relative", paddingTop: "72px", paddingBottom: "72px", textAlign: "center" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: "clamp(26px,4vw,40px)", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-1px", color: "#fff", textWrap: "balance" }}>Klar til at komme i gang?</h2>
            <p style={{ margin: "0 auto 30px", fontSize: "clamp(15.5px,2.3vw,18px)", lineHeight: 1.6, color: "#AEB9CC", maxWidth: "520px" }}>Opret din forening, eller skriv til os, hvis du har spørgsmål om data, betaling eller adgang.</p>
            <div className="sik-cta-row" style={{ justifyContent: "center" }}>
              <Link to="/opret-forening" className="sik-cta-w sik-btn-brand" style={{ textDecoration: "none", textAlign: "center", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "16px 32px", minHeight: "54px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 34px rgba(224,25,63,.26)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Opret forening</Link>
              <Link to="/kontakt" className="sik-cta-w sik-btn-navy" style={{ textDecoration: "none", textAlign: "center", color: "#fff", fontSize: "16px", fontWeight: 600, padding: "16px 32px", minHeight: "54px", borderRadius: "999px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.16)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Kontakt os</Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
