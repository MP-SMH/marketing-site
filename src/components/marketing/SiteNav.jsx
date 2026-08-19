// ============================================================
//  StøtMedHjerte — SiteNav (delt nav-komponent)
//  1:1 port af Claude Design forsidens TopNav. Samme markup,
//  klassenavne, mega-menu, mobil-drawer, Wordmark og ruter.
//  Eneste tekniske ændring: <a href> -> react-router <Link to>,
//  så navigation virker i SPA'en. Rutemål er identiske med CD.
// ============================================================

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SiteNav.css";

/* ---- Route map: prototype file  ->  app route. Adjust to taste. ---- */
const ROUTES = {
  home: "/",
  hjertesager: "/hjertesager",
  foreninger: "/foreninger",
  indsamlingsregnskaber: "/indsamlingsregnskaber",
  forStoetter: "/for-stoetter",
  forForeninger: "/for-foreninger",
  donationer: "/donationer",
  fastStoette: "/fast-stoette",
  tilladelse: "/tilladelse-og-regnskab",
  lovgivning: "/lovgivning-og-ansvar",
  priser: "/priser",
  denReneModel: "/den-rene-model",
  sikkerhed: "/sikkerhed",
  support: "/support",
  faq: "/faq",
  omOs: "/om-os",
  voresMission: "/vores-mission",
  founder: "/founder",
  saadanVirkerDet: "/saadan-virker-det",
  kontakt: "/kontakt",
  logInd: "/log-ind",
  opretForening: "/opret-forening", // CTA deep-links to #form on that page
};

/* ============================================================
   Icon helper. `d` is raw inner SVG markup (paths/text).
   Stroke icons by default; pass fill for solid glyphs.
   ============================================================ */
function Ic({ d, size = 24, sw = 1.9, fill = false, color = "currentColor", style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : color}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      dangerouslySetInnerHTML={{ __html: d }}
    />
  );
}

const PATH = {
  chevron: '<path d="m6 9 6 6 6-6"/>',
};

/* Header mega-menu. `w` = panel min-width override. */
const NAV_GROUPS = [
  {
    label: "For støtter",
    items: [
      { t: "Find hjertesag", s: "Støt et konkret formål", href: ROUTES.hjertesager },
      { t: "Find en forening", s: "Se foreningerne og støt dem du kender", href: ROUTES.foreninger },
      { t: "Sådan støtter du", s: "Vælg beløb, godkend i MobilePay", href: ROUTES.forStoetter },
      { t: "Sikkerhed", s: "Betaling, data og tryghed", href: ROUTES.sikkerhed },
      { t: "Indsamlingsregnskaber", s: "Se hvad foreningerne har indsamlet", href: ROUTES.indsamlingsregnskaber },
    ],
  },
  {
    label: "For foreninger",
    w: 340,
    items: [
      { t: "For foreninger", s: "Overblik og dokumentation", href: ROUTES.forForeninger },
      { t: "Donationer", s: "Engangsbidrag via MobilePay", href: ROUTES.donationer },
      { t: "Fast støtte", s: "Månedlige bidrag", href: ROUTES.fastStoette },
      { t: "Tilladelse og regnskab", s: "Indsamlingsnævnet og regnskab", href: ROUTES.tilladelse },
      { t: "Lovgivning og ansvar", s: "Ansvarsfordeling og roller", href: ROUTES.lovgivning },
    ],
  },
  {
    label: "Platform",
    items: [
      { t: "Priser", s: "Fast abonnement, ingen andel", href: ROUTES.priser },
      { t: "Den rene model", s: "Bidrag direkte til foreningen", href: ROUTES.denReneModel },
      { t: "Sikkerhed", s: "CVR-validering og adgang", href: ROUTES.sikkerhed },
      { t: "Support", s: "Hjælp til begge målgrupper", href: ROUTES.support },
      { t: "FAQ", s: "Spørgsmål og svar", href: ROUTES.faq },
    ],
  },
  {
    label: "Om os",
    items: [
      { t: "Om os", s: "Mission og foreningsliv", href: ROUTES.omOs },
      { t: "Vores mission", s: "Derfor findes vi", href: ROUTES.voresMission },
      { t: "Founder", s: "Mød grundlæggeren", href: ROUTES.founder },
      { t: "Sådan virker det", s: "Fra hjertesag til bidrag", href: ROUTES.saadanVirkerDet },
      { t: "Kontakt", s: "Skriv eller ring til os", href: ROUTES.kontakt },
    ],
  },
];

/* Mobile drawer (flat groups). */
const DRAWER = [
  { group: "For støtter", links: [
    { t: "Find hjertesag", href: ROUTES.hjertesager },
    { t: "Find en forening", href: ROUTES.foreninger },
    { t: "Sådan støtter du", href: ROUTES.forStoetter },
    { t: "Indsamlingsregnskaber", href: ROUTES.indsamlingsregnskaber },
  ]},
  { group: "For foreninger", links: [
    { t: "For foreninger", href: ROUTES.forForeninger },
    { t: "Donationer", href: ROUTES.donationer },
    { t: "Fast støtte", href: ROUTES.fastStoette },
    { t: "Tilladelse og regnskab", href: ROUTES.tilladelse },
    { t: "Lovgivning og ansvar", href: ROUTES.lovgivning },
  ]},
  { group: "Platform", links: [
    { t: "Priser", href: ROUTES.priser },
    { t: "Den rene model", href: ROUTES.denReneModel },
    { t: "Sikkerhed", href: ROUTES.sikkerhed },
    { t: "Support", href: ROUTES.support },
    { t: "FAQ", href: ROUTES.faq },
  ]},
  { group: "Om os", links: [
    { t: "Om os", href: ROUTES.omOs },
    { t: "Vores mission", href: ROUTES.voresMission },
    { t: "Founder", href: ROUTES.founder },
    { t: "Sådan virker det", href: ROUTES.saadanVirkerDet },
    { t: "Kontakt", href: ROUTES.kontakt },
  ]},
];

/* Reusable button style fragments (shared by several CTAs). */
const btnBase = { textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" };
const brandBtn = (pad = "16px 30px", min = 54, fs = 16) => ({
  ...btnBase, color: "#fff", fontSize: fs, fontWeight: 600, padding: pad, minHeight: min,
  borderRadius: 999, background: "var(--brand)", boxShadow: "0 12px 30px rgba(224,25,63,.22)",
});
const ghostBtn = (pad = "16px 30px", min = 54, fs = 16) => ({
  ...btnBase, color: "var(--ink)", fontSize: fs, fontWeight: 600, padding: pad, minHeight: min,
  borderRadius: 999, background: "var(--surface)", border: "1px solid var(--smh-border)",
});

/* ============================================================
   WORDMARK
   ============================================================ */
function Wordmark({ color = "var(--ink)", tm = "var(--smh-muted)", size = 19 }) {
  return (
    <span style={{ fontWeight: 550, fontSize: size, letterSpacing: "-.4px", color }}>
      StøtMedHjerte
      <span style={{ fontSize: 10, verticalAlign: "super", color: tm, fontWeight: 500, marginLeft: 1 }}>™</span>
    </span>
  );
}

/* ============================================================
   SITE NAV
   ============================================================ */
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
  const close = () => setOpen(false);
  const toggleGroup = (g) => setExpanded((m) => ({ ...m, [g]: !m[g] }));

  // Laas baggrunds-scroll naar drawer er aaben, nulstil accordion ved luk
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    } else {
      setExpanded({});
    }
  }, [open]);
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(247,248,251,.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--smh-border)" }}>
      <nav className="wrap" style={{ minHeight: 66, display: "flex", alignItems: "center", gap: 16, paddingTop: 10, paddingBottom: 10 }}>
        <Link to={ROUTES.home} style={{ textDecoration: "none", flexShrink: 0 }}><Wordmark /></Link>

        {/* desktop mega-menu */}
        <div className="smh-nav">
          {NAV_GROUPS.map((g) => (
            <div className="navgrp" key={g.label}>
              <button className="navtrigger">
                {g.label} <Ic d={PATH.chevron} size={13} sw={2.6} />
              </button>
              <div className="navpanel">
                <div className="navcard" style={g.w ? { minWidth: g.w } : undefined}>
                  {g.items.map((it) => (
                    <Link className="navlink" to={it.href} key={it.t}>
                      <b>{it.t}</b><span>{it.s}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* desktop CTAs */}
        <div className="smh-cta">
          <Link to={ROUTES.logInd} className="link-ink" style={{ textDecoration: "none", color: "var(--body)", fontSize: 14.5, fontWeight: 600, padding: "9px 6px" }}>Log ind</Link>
          <Link to={ROUTES.hjertesager} className="btn-ghost" style={{ ...ghostBtn("12px 20px", undefined, 14.5), minHeight: undefined }}>Find hjertesag</Link>
          <Link to={ROUTES.opretForening + "#form"} className="btn-brand" style={{ ...brandBtn("12px 22px", undefined, 14.5), minHeight: undefined, boxShadow: "0 6px 18px rgba(224,25,63,.22)" }}>Opret forening</Link>
        </div>

        {/* burger */}
        <button className="smh-burger" onClick={() => setOpen((v) => !v)} aria-label="Menu"
          style={{ width: 46, height: 46, borderRadius: 14, border: "1px solid var(--smh-border)", background: "var(--surface)", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--ink)" }}>
          <Ic size={22} sw={2.2} d={open ? '<path d="M18 6 6 18M6 6l12 12"/>' : '<path d="M3 6h18M3 12h18M3 18h18"/>'} />
        </button>
      </nav>

      {/* mobile drawer - accordion, fixed top + bottom */}
      {open && (
        <div className="smh-drawer" style={{ position: "fixed", inset: 0, height: "100dvh", zIndex: 60, display: "flex", flexDirection: "column", background: "var(--page)" }}>
          <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 66, padding: "10px 20px", background: "var(--page)", borderBottom: "1px solid var(--smh-border)" }}>
            <Link to={ROUTES.home} onClick={close} style={{ textDecoration: "none" }}><Wordmark /></Link>
            <button onClick={close} aria-label="Luk menu" style={{ width: 46, height: 46, borderRadius: 14, border: "1px solid var(--smh-border)", background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--ink)" }}>
              <Ic size={22} sw={2.2} d='<path d="M18 6 6 18M6 6l12 12"/>' />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "12px 20px 20px" }}>
            {DRAWER.map((sec, i) => {
              const isOpen = !!expanded[sec.group];
              return (
                <div key={sec.group} style={{ borderTop: i === 0 ? "none" : "1px solid #EDEFF3", marginTop: i === 0 ? 0 : 6, paddingTop: i === 0 ? 0 : 6 }}>
                  <button onClick={() => toggleGroup(sec.group)} aria-expanded={isOpen} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 54, padding: "6px 8px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                    <span style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", letterSpacing: "-.2px" }}>{sec.group}</span>
                    <Ic d={PATH.chevron} size={20} sw={2.4} color="#6B7280" style={{ transition: "transform .18s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </button>
                  {isOpen && sec.links.map((l) => (
                    <Link key={l.t} to={l.href} onClick={close} className="drawer-link" style={{ textDecoration: "none", display: "flex", alignItems: "center", minHeight: 48, color: "#1A2233", fontSize: 16, fontWeight: 400, padding: "9px 8px 9px 28px", borderRadius: 10 }}>{l.t}</Link>
                  ))}
                </div>
              );
            })}
          </div>

          <div style={{ flexShrink: 0, padding: "14px 20px calc(18px + env(safe-area-inset-bottom))", borderTop: "1px solid var(--smh-border)", background: "var(--page)" }}>
            <Link to={ROUTES.opretForening + "#form"} onClick={close} style={{ textDecoration: "none", textAlign: "center", color: "#fff", fontSize: 16, fontWeight: 600, padding: 15, borderRadius: 999, background: "var(--brand)", minHeight: 54, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(224,25,63,.22)" }}>Opret forening</Link>
            <Link to={ROUTES.hjertesager} onClick={close} style={{ textDecoration: "none", textAlign: "center", color: "var(--brand)", fontSize: 16, fontWeight: 600, padding: 15, borderRadius: 999, border: "1px solid var(--brand)", background: "var(--surface)", minHeight: 54, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 10 }}>Find hjertesag</Link>
            <Link to={ROUTES.logInd} onClick={close} style={{ textDecoration: "none", textAlign: "center", color: "var(--body)", fontSize: 15, fontWeight: 600, padding: 10, marginTop: 6, display: "block" }}>Log ind</Link>
          </div>
        </div>
      )}
    </header>
  );
}
