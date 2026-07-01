import React, { useState } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./Kontakt.css";

function Ic({ d, size = 19, sw = 1.9, stroke = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={style} dangerouslySetInnerHTML={{ __html: d }} />
  );
}

const ARROW_R = '<path d="M5 12h14M13 6l6 6-6 6"/>';
const CHECK = '<path d="M20 6 9 17l-5-5"/>';
const PHONE = '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>';
const MAIL = '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>';

// Metoder: to interne Link (support/opret), to eksterne (mailto/tel)
const METHODS = [
  { title: "E-mail", desc: "Skriftlige spørgsmål og dokumentation.", action: "hej@stotmedhjerte.dk", href: "mailto:hej@stotmedhjerte.dk", d: MAIL },
  { title: "Telefon", desc: "Ring til os på hverdage kl. 9 til 15.", action: "71 96 12 12", href: "tel:+4571961212", d: PHONE },
  { title: "Support", desc: "Hjælp til foreninger og støtter.", action: "Gå til support", to: "/support", d: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>' },
  { title: "Foreningsoprettelse", desc: "Kom i gang med din forening.", action: "Opret forening", to: "/opret-forening", d: '<path d="M3 21h18"/><path d="M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/>' },
];

const SHORTCUTS = [
  { title: "FAQ", desc: "De mest stillede spørgsmål.", to: "/faq", d: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>' },
  { title: "Sådan virker det", desc: "Fra hjertesag til bidrag.", to: "/saadan-virker-det", d: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' },
  { title: "Priser", desc: "Fast abonnement, ingen andel.", to: "/priser", d: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 3 12V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.6z"/><path d="M7.5 7.5h.01"/>' },
  { title: "Sikkerhed", desc: "Betaling, data og tryghed.", to: "/sikkerhed", d: '<path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5z"/>' },
];

const CONTACT = [
  { label: "", value: "StøtMedHjerte", d: '<path d="M3 21h18"/><path d="M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/>' },
  { label: "Selskab", value: "Heartland Collective ApS", d: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>' },
  { label: "CVR", value: "36909722", d: '<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>' },
  { label: "Adresse", value: "Hillerød, Danmark", d: '<path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>' },
  { label: "E-mail", value: "hej@stotmedhjerte.dk", d: MAIL },
  { label: "Telefon", value: "71 96 12 12", d: PHONE },
];

const FIELDS = [
  { key: "navn", label: "Navn", type: "text", placeholder: "Dit navn" },
  { key: "email", label: "E-mail", type: "email", placeholder: "navn@forening.dk" },
  { key: "telefon", label: "Telefon", type: "tel", inputMode: "tel", placeholder: "Fx 71 96 12 12" },
  { key: "forening", label: "Forening", type: "text", placeholder: "Foreningens navn" },
  { key: "cvr", label: "CVR", type: "text", inputMode: "numeric", placeholder: "8 cifre" },
  { key: "emne", label: "Emne", type: "text", placeholder: "Hvad handler det om?" },
];

export default function KontaktPage() {
  const [form, setForm] = useState({ navn: "", email: "", telefon: "", forening: "", cvr: "", emne: "", besked: "" });
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const submit = () => setSubmitted(true);

  return (
    <>
      <SiteNav />
      <main className="kon-page">

        {/* ============ HERO ============ */}
        <section className="kon-wrap" style={{ paddingTop: "52px", paddingBottom: "44px" }}>
          <div className="kon-hero-split">
            <div style={{ animation: "konRise .6s ease both" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--label)", marginBottom: "18px" }}>Kontakt</div>
              <h1 style={{ margin: "0 0 18px", fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.06, fontWeight: 800, letterSpacing: "-1.4px", color: "var(--ink)", textWrap: "balance" }}>Et menneske i den anden ende.</h1>
              <p style={{ margin: "0 0 28px", fontSize: "clamp(16px,2.4vw,18.5px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "520px" }}>Bag StøtMedHjerte sidder et lille, dansk team. Skriv eller ring, så får I et konkret svar fra en, der kender platformen og foreningslivet, ikke et callcenter.</p>
              <div className="kon-cta-row">
                <a href="#besked" className="kon-cta-w kon-btn-brand" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#fff", fontSize: "15.5px", fontWeight: 600, padding: "14px 24px", minHeight: "52px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 12px 26px rgba(224,25,63,.22)" }}>Skriv til os</a>
                <a href="tel:+4571961212" className="kon-cta-w kon-btn-ghost" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "var(--ink)", fontSize: "15.5px", fontWeight: 600, padding: "14px 24px", minHeight: "52px", borderRadius: "999px", border: "1px solid var(--smh-border)", background: "var(--surface)" }}><Ic d={PHONE} size={17} sw={2} />71 96 12 12</a>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px", marginTop: "26px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--body)" }}><Ic d={CHECK} size={16} sw={2.4} stroke="var(--success)" />Svar inden for 1 hverdag</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--body)" }}><Ic d={CHECK} size={16} sw={2.4} stroke="var(--success)" />Dansk team i Hillerød</span>
              </div>
            </div>
            <div style={{ position: "relative", animation: "konRise .7s ease both" }}>
              <div style={{ width: "100%", aspectRatio: "4/5" }}>
                <img src="/images/kontakt-founder-led-dialog.jpg" alt="Founder-led kontakt, rolig arbejdsplads i dialog" loading="lazy" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: "26px", border: "1px solid var(--smh-border)", boxShadow: "0 40px 80px -44px rgba(8,14,26,.4)", background: "var(--alt)" }} />
              </div>
              <div style={{ position: "absolute", left: "18px", bottom: "18px", right: "18px", display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,.94)", backdropFilter: "blur(8px)", border: "1px solid var(--smh-border)", borderRadius: "16px", padding: "12px 15px", boxShadow: "0 18px 40px -24px rgba(8,14,26,.32)" }}>
                <span style={{ flexShrink: 0, width: "38px", height: "38px", borderRadius: "11px", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand)" }}><Ic d='<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' size={19} sw={2} /></span>
                <div style={{ minWidth: 0 }}><div style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.2px" }}>Personlig kontakt</div><div style={{ fontSize: "12.5px", color: "var(--smh-muted)" }}>Vi kender din forenings hverdag</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ KONTAKTMULIGHEDER ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="kon-wrap" style={{ paddingTop: "64px", paddingBottom: "72px" }}>
            <div style={{ maxWidth: "620px", marginBottom: "36px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--label)", marginBottom: "12px" }}>Kontaktmuligheder</div>
              <h2 style={{ margin: "0 0 12px", fontSize: "clamp(24px,3.6vw,34px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.9px", color: "var(--ink)", textWrap: "balance" }}>Vælg den vej ind, der passer til dit spørgsmål.</h2>
              <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.6, color: "var(--body)" }}>Fire kanaler, ét team. Vi sender dig aldrig videre i en kø.</p>
            </div>
            <div className="kon-ovr-split">
              <div className="kon-methods">
                {METHODS.map((m) => {
                  const inner = (
                    <>
                      <span style={{ width: "42px", height: "42px", borderRadius: "12px", background: "var(--brand-surface)", border: "1px solid var(--brand-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand)" }}><Ic d={m.d} size={19} sw={1.9} /></span>
                      <div><div style={{ fontSize: "16px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.3px", marginBottom: "3px" }}>{m.title}</div><div style={{ fontSize: "13.5px", lineHeight: 1.5, color: "var(--smh-muted)" }}>{m.desc}</div></div>
                      <span style={{ marginTop: "auto", fontSize: "14px", fontWeight: 600, color: "var(--brand)", display: "inline-flex", alignItems: "center", gap: "5px" }}>{m.action} <Ic d={ARROW_R} size={14} sw={2.4} /></span>
                    </>
                  );
                  const cardStyle = { display: "flex", flexDirection: "column", gap: "12px", textDecoration: "none", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "18px", padding: "20px", minHeight: "148px" };
                  return m.to ? (
                    <Link key={m.title} to={m.to} className="kon-method-card" style={cardStyle}>{inner}</Link>
                  ) : (
                    <a key={m.title} href={m.href} className="kon-method-card" style={cardStyle}>{inner}</a>
                  );
                })}
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ width: "100%", aspectRatio: "16/9" }}>
                  <img src="/images/kontakt-muligheder-overblik.jpg" alt="Overblik over kontaktmuligheder: e-mail, telefon, support og foreningsoprettelse" loading="lazy" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: "26px", border: "1px solid var(--smh-border)", boxShadow: "0 34px 70px -42px rgba(8,14,26,.34)", background: "var(--surface)" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SPLIT: FORMULAR + INFO ============ */}
        <section id="besked" className="kon-wrap" style={{ paddingTop: "72px", paddingBottom: "72px" }}>
          <div className="kon-split">
            {/* Formular */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "24px", padding: "clamp(24px,3.5vw,40px)", boxShadow: "0 30px 70px -38px rgba(8,14,26,.16)" }}>
              <h2 style={{ margin: "0 0 24px", fontSize: "clamp(20px,3vw,25px)", fontWeight: 800, letterSpacing: "-.5px", color: "var(--ink)" }}>Send os en besked</h2>
              <div className="kon-form-grid">
                {FIELDS.map((f) => (
                  <label key={f.key} style={{ display: "block" }}>
                    <span style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: "var(--body)", marginBottom: "8px" }}>{f.label}</span>
                    <input className="kon-field" type={f.type} inputMode={f.inputMode} value={form[f.key]} onChange={set(f.key)} placeholder={f.placeholder} />
                  </label>
                ))}
                <label className="kon-col-2" style={{ display: "block" }}>
                  <span style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: "var(--body)", marginBottom: "8px" }}>Besked</span>
                  <textarea className="kon-field" value={form.besked} onChange={set("besked")} placeholder="Skriv din besked her." />
                </label>
              </div>

              <button onClick={submit} className="kon-submit" style={{ marginTop: "24px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px", padding: "16px", minHeight: "54px", border: "none", borderRadius: "999px", background: "var(--brand)", color: "#fff", fontSize: "16px", fontWeight: 600, fontFamily: "inherit", cursor: "pointer", boxShadow: "0 14px 30px rgba(224,25,63,.24)" }}>Send besked</button>

              {submitted && (
                <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "11px", padding: "16px 18px", borderRadius: "16px", background: "#ECFDF3", border: "1px solid #BBF7D0" }}>
                  <span style={{ flexShrink: 0, width: "26px", height: "26px", borderRadius: "50%", background: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d={CHECK} size={15} sw={3.2} stroke="#fff" /></span>
                  <span style={{ fontSize: "14.5px", lineHeight: 1.5, color: "#166534", fontWeight: 500 }}>Tak for din besked. Vi vender tilbage hurtigst muligt.</span>
                </div>
              )}
            </div>

            {/* Kontakt-info (navy) */}
            <div style={{ background: "var(--navy1)", borderRadius: "24px", padding: "clamp(28px,3.5vw,36px)", position: "relative", overflow: "hidden", boxShadow: "0 30px 70px -40px rgba(8,14,26,.4)" }}>
              <div style={{ position: "absolute", top: "-90px", right: "-70px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,25,63,.18),transparent 65%)" }} />
              <div style={{ position: "relative" }}>
                <h2 style={{ margin: "0 0 6px", fontSize: "20px", fontWeight: 700, letterSpacing: "-.4px", color: "#fff" }}>Kontaktoplysninger</h2>
                <p style={{ margin: "0 0 28px", fontSize: "14.5px", lineHeight: 1.6, color: "#9AA8BE" }}>Du er altid velkommen til at skrive eller ringe.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {CONTACT.map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                      <span style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "12px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF6B86" }}><Ic d={c.d} size={19} sw={1.9} /></span>
                      <div style={{ minWidth: 0 }}>
                        {c.label && <div style={{ fontSize: "11.5px", fontWeight: 600, color: "#6B7A92", textTransform: "uppercase", letterSpacing: ".4px", marginBottom: "1px" }}>{c.label}</div>}
                        <div style={{ fontSize: "15px", fontWeight: 600, color: "#E8EDF5", wordBreak: "break-word" }}>{c.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SELVBETJENING ============ */}
        <section style={{ background: "var(--navy1)" }}>
          <div className="kon-wrap" style={{ paddingTop: "64px", paddingBottom: "64px" }}>
            <div style={{ maxWidth: "600px", marginBottom: "32px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#6B7A92", marginBottom: "12px" }}>Hurtige svar</div>
              <h2 style={{ margin: "0 0 12px", fontSize: "clamp(24px,3.6vw,32px)", lineHeight: 1.14, fontWeight: 800, letterSpacing: "-.8px", color: "#fff", textWrap: "balance" }}>Mange spørgsmål er allerede besvaret.</h2>
              <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.6, color: "#9AA8BE" }}>Vil du i gang med det samme, finder du svar og næste skridt her, uden at vente på et svar.</p>
            </div>
            <div className="kon-methods">
              {SHORTCUTS.map((s) => (
                <Link key={s.title} to={s.to} className="kon-short-card" style={{ display: "flex", alignItems: "center", gap: "14px", textDecoration: "none", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "16px", padding: "18px 20px", minHeight: "64px" }}>
                  <span style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "11px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF6B86" }}><Ic d={s.d} size={19} sw={1.9} /></span>
                  <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", letterSpacing: "-.2px" }}>{s.title}</div><div style={{ fontSize: "13px", color: "#9AA8BE" }}>{s.desc}</div></div>
                  <Ic d={ARROW_R} size={17} sw={2.4} stroke="#6B7A92" />
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
