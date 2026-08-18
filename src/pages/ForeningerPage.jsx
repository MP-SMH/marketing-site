// ============================================================
// src/pages/ForeningerPage.jsx
// Skridt 1-2 af 3 i konverteringen af foreningsoversigten.
// Dette skridt: datahentning, de fire tilstande, hero og kortgitter.
// Filterraekken kommer i skridt 3.
//
// Live data fra GET /api/public/foreninger med eget roterende froe
// (smh_foreninger_froe), saa raekkefoelgen ikke deles med
// hjertesagsoversigten. Datamoenster og afbrudt-flag foelger
// HjertesagerPage.jsx.
// ============================================================

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import { SMH_API_URL } from "../lib/supabaseClient";
import { hentFroe } from "../lib/froe";
import "./Foreninger.css";

// Hoejst to initialer fra foreningsnavnet, til logo-pladsholderen.
function initialer(navn) {
  return (navn || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((ord) => ord[0])
    .join("")
    .toUpperCase();
}

function ForeningKort({ f }) {
  const antalHjertesager = Number(f.antal_aktive_hjertesager) || 0;
  const harHjertesag = antalHjertesager >= 1;

  return (
    <Link to={`/forening/${f.slug}`} className="fl-card">
      <div style={{ aspectRatio: "16/9", background: "var(--alt)", position: "relative" }}>
        {f.coverbillede && (
          <img
            src={f.coverbillede}
            alt={`Foto fra ${f.foreningsnavn}`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            loading="lazy"
          />
        )}
        {f.har_fast_stoette && (
          <span style={{ position: "absolute", top: 12, right: 12, display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 999, background: "rgba(255,255,255,.94)", color: "var(--brand-ink)", fontSize: 11, fontWeight: 700, backdropFilter: "blur(6px)" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            Fast støtte
          </span>
        )}
      </div>

      <div style={{ padding: "20px 20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", ...(f.logo ? { background: "#fff", border: "1px solid var(--smh-border)" } : { background: "var(--brand)" }) }}>
            {f.logo
              ? <img src={f.logo} alt={f.foreningsnavn} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              : <span style={{ color: "#fff", fontSize: 15, fontWeight: 800, letterSpacing: "-.4px" }}>{initialer(f.foreningsnavn)}</span>}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h2 style={{ margin: "0 0 3px", fontSize: 16.5, fontWeight: 800, letterSpacing: "-.4px", color: "var(--ink)", lineHeight: 1.25 }}>{f.foreningsnavn}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              {f.by && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12.5, color: "var(--smh-muted)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  {f.by}
                </span>
              )}
              {f.foreningstype && (
                <span style={{ padding: "2px 8px", borderRadius: 999, background: "var(--alt)", color: "var(--body)", fontSize: 11.5, fontWeight: 700 }}>{f.foreningstype}</span>
              )}
            </div>
          </div>
        </div>

        <p style={{ margin: "0 0 16px", fontSize: 14, lineHeight: 1.6, color: "var(--body)", flex: 1 }}>{f.profiltekst}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 14, borderTop: "1px solid var(--smh-border)", justifyContent: harHjertesag ? "space-between" : "flex-end" }}>
          {harHjertesag && (
            <span style={{ fontSize: 13, color: "var(--body)", fontWeight: 600 }}>
              {antalHjertesager === 1 ? "1 hjertesag" : `${antalHjertesager} hjertesager`}
            </span>
          )}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 18px", minHeight: 44, boxSizing: "border-box", borderRadius: 999, background: "var(--brand)", color: "#fff", fontSize: 14, fontWeight: 700 }}>
            Se foreningen
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ForeningerPage() {
  const froe = useMemo(() => hentFroe("smh_foreninger_froe"), []);
  const [foreninger, setForeninger] = useState([]);
  const [status, setStatus] = useState("indlaeser");

  useEffect(() => {
    let live = true;
    fetch(`${SMH_API_URL}/api/public/foreninger?froe=${encodeURIComponent(froe)}&limit=60`)
      .then((r) => { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then((d) => { if (live) { setForeninger(d.foreninger || []); setStatus("klar"); } })
      .catch(() => { if (live) setStatus("fejl"); });
    return () => { live = false; };
  }, [froe]);

  return (
    <div style={{ background: "var(--page)", minHeight: "100vh" }}>
      <SiteNav />

      <section style={{ padding: "48px 24px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: ".8px", color: "var(--smh-muted)", marginBottom: "12px" }}>FIND EN FORENING</div>
        <h1 style={{ margin: "0 0 12px", fontSize: "34px", fontWeight: 800, color: "var(--ink)" }}>Find en forening, du vil støtte</h1>
        <p style={{ margin: "0 auto", maxWidth: "560px", fontSize: "17px", lineHeight: 1.6, color: "var(--body)" }}>Se foreningerne på StøtMedHjerte, og find den du vil støtte. Bidragene går direkte til foreningens egen MobilePay-konto.</p>
        <p style={{ margin: "16px auto 0", maxWidth: "560px", fontSize: "14px", fontWeight: 600, color: "#15803D" }}>Betaling sker med MobilePay. StøtMedHjerte er aldrig i pengestrømmen.</p>
      </section>

      <section style={{ padding: "0 0 64px" }}>
        {status === "indlaeser" ? (
          <p style={{ textAlign: "center", color: "var(--body)", fontSize: "15px" }}>Henter foreninger …</p>
        ) : status === "fejl" ? (
          <p style={{ textAlign: "center", color: "var(--body)", fontSize: "15px" }}>Vi kan ikke hente foreningerne lige nu. Prøv igen om lidt.</p>
        ) : foreninger.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--body)", fontSize: "15px" }}>Der er endnu ingen foreninger at vise.</p>
        ) : (
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ margin: "0 0 20px", fontSize: "15px", color: "var(--body)" }}>{foreninger.length === 1 ? "1 forening" : `${foreninger.length} foreninger`}</p>
            <div className="fl-grid">
              {foreninger.map((f) => <ForeningKort key={f.slug} f={f} />)}
            </div>
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
