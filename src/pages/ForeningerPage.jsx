// ============================================================
// src/pages/ForeningerPage.jsx
// Skridt 1-3 af 3 i konverteringen af foreningsoversigten.
// Dette skridt: venstrestillet hero, filterraekke og
// browser-filtrering af de allerede hentede foreninger.
//
// Live data fra GET /api/public/foreninger med eget roterende froe
// (smh_foreninger_froe), saa raekkefoelgen ikke deles med
// hjertesagsoversigten. Datamoenster og afbrudt-flag foelger
// HjertesagerPage.jsx.
// ============================================================

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import { SMH_API_URL } from "../lib/supabaseClient";
import { hentFroe } from "../lib/froe";
import { visForeningstype } from "../lib/foreningstype";
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

function Vaelger({ etiket, valgt, erValgt, muligheder, aaben, onToggle, onVaelg }) {
  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className="fl-field fl-trigger"
        aria-haspopup="listbox"
        aria-expanded={aaben}
        onClick={onToggle}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", color: erValgt ? "var(--ink)" : "var(--smh-muted)" }}>{etiket}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {aaben && (
        <div className="fl-menu" role="listbox">
          {muligheder.map((m) => {
            const punktValgt = m === valgt;
            return (
              <button
                key={m}
                type="button"
                className="fl-opt"
                role="option"
                aria-selected={punktValgt}
                onClick={() => onVaelg(m)}
                style={{ color: punktValgt ? "#A00C24" : "var(--body)", fontWeight: punktValgt ? 700 : 500 }}
              >
                <span>{m}</span>
                {punktValgt && (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
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
                <span style={{ padding: "2px 8px", borderRadius: 999, background: "var(--alt)", color: "var(--body)", fontSize: 11.5, fontWeight: 700 }}>{visForeningstype(f.foreningstype)}</span>
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

const STOETTE_STANDARD = "Støttemuligheder";
const STOETTE_FAST = "Tilbyder fast støtte";

export default function ForeningerPage() {
  const froe = useMemo(() => hentFroe("smh_foreninger_froe"), []);
  const [foreninger, setForeninger] = useState([]);
  const [status, setStatus] = useState("indlaeser");

  const [q, setQ] = useState("");
  const [kategori, setKategori] = useState("Alle kategorier");
  const [landsdel, setLandsdel] = useState("Hele landet");
  const [stoette, setStoette] = useState(STOETTE_STANDARD);
  const [aabenMenu, setAabenMenu] = useState(null);
  const filterRef = useRef(null);

  useEffect(() => {
    let live = true;
    fetch(`${SMH_API_URL}/api/public/foreninger?froe=${encodeURIComponent(froe)}&limit=60`)
      .then((r) => { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then((d) => { if (live) { setForeninger(d.foreninger || []); setStatus("klar"); } })
      .catch(() => { if (live) setStatus("fejl"); });
    return () => { live = false; };
  }, [froe]);

  useEffect(() => {
    if (!aabenMenu) return;
    function paaKlik(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) setAabenMenu(null);
    }
    document.addEventListener("mousedown", paaKlik);
    return () => document.removeEventListener("mousedown", paaKlik);
  }, [aabenMenu]);

  const kategorier = useMemo(() => {
    const unikke = [...new Set(foreninger.map((f) => f.foreningstype).filter(Boolean))].sort((a, b) => a.localeCompare(b, "da"));
    return ["Alle kategorier", ...unikke];
  }, [foreninger]);

  const byer = useMemo(() => {
    const unikke = [...new Set(foreninger.map((f) => f.by).filter(Boolean))].sort((a, b) => a.localeCompare(b, "da"));
    return ["Hele landet", ...unikke];
  }, [foreninger]);

  const filtrerede = useMemo(() => {
    const soeg = q.trim().toLowerCase();
    return foreninger.filter((f) => {
      if (soeg) {
        const navn = (f.foreningsnavn || "").toLowerCase();
        const by = (f.by || "").toLowerCase();
        if (!navn.includes(soeg) && !by.includes(soeg)) return false;
      }
      if (kategori !== "Alle kategorier" && f.foreningstype !== kategori) return false;
      if (landsdel !== "Hele landet" && f.by !== landsdel) return false;
      if (stoette === STOETTE_FAST && !f.har_fast_stoette) return false;
      return true;
    });
  }, [foreninger, q, kategori, landsdel, stoette]);

  const rydFiltre = () => {
    setQ("");
    setKategori("Alle kategorier");
    setLandsdel("Hele landet");
    setStoette(STOETTE_STANDARD);
    setAabenMenu(null);
  };

  const skiftMenu = (id) => setAabenMenu((nu) => (nu === id ? null : id));

  return (
    <div style={{ background: "var(--page)", minHeight: "100vh" }}>
      <SiteNav />

      <section className="fl-wrap" style={{ paddingTop: "clamp(30px,5vw,54px)", paddingBottom: "clamp(24px,3.5vw,36px)" }}>
        <div style={{ maxWidth: 720 }}>
          <div className="fl-eyebrow" style={{ color: "#C8112F" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.7-10-9.3C.4 8.3 2 4.5 5.6 4.5c2 0 3.4 1.1 4.4 2.6C11 5.6 12.4 4.5 14.4 4.5 18 4.5 19.6 8.3 18 11.7 15.5 16.3 12 21 12 21Z" /></svg>
            Find en forening
          </div>
          <h1 style={{ margin: "0 0 14px", fontSize: "clamp(29px,4.8vw,42px)", fontWeight: 800, letterSpacing: "-1.2px", lineHeight: 1.1, color: "var(--ink)" }}>Find en forening, du vil støtte</h1>
          <p style={{ margin: 0, fontSize: "clamp(16px,2vw,17.5px)", lineHeight: 1.65, color: "var(--body)" }}>Se foreningerne på StøtMedHjerte, og find den du vil støtte. Bidragene går direkte til foreningens egen MobilePay-konto.</p>
        </div>
      </section>

      {status === "klar" && foreninger.length > 0 && (
        <section className="fl-wrap" style={{ paddingBottom: "clamp(18px,2.5vw,26px)" }}>
          <div ref={filterRef} style={{ border: "1px solid var(--smh-border)", borderRadius: 24, background: "#FFFFFF", padding: "clamp(16px,2.6vw,22px)", boxShadow: "0 18px 48px -38px rgba(8,14,26,.2)" }}>
            <div className="fl-tools">
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--smh-muted)", display: "flex", pointerEvents: "none" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                </span>
                <input
                  className="fl-field"
                  style={{ paddingLeft: 44, paddingRight: 44 }}
                  placeholder="Søg på foreningsnavn eller by"
                  aria-label="Søg på foreningsnavn eller by"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
                {q && (
                  <button
                    type="button"
                    aria-label="Ryd søgning"
                    onClick={() => setQ("")}
                    style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--smh-muted)", display: "flex", padding: 0 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                  </button>
                )}
              </div>

              <div className="fl-selects">
                <Vaelger
                  etiket={kategori}
                  valgt={kategori}
                  erValgt={kategori !== "Alle kategorier"}
                  muligheder={kategorier}
                  aaben={aabenMenu === "kategori"}
                  onToggle={() => skiftMenu("kategori")}
                  onVaelg={(m) => { setKategori(m); setAabenMenu(null); }}
                />
                <Vaelger
                  etiket={landsdel}
                  valgt={landsdel}
                  erValgt={landsdel !== "Hele landet"}
                  muligheder={byer}
                  aaben={aabenMenu === "landsdel"}
                  onToggle={() => skiftMenu("landsdel")}
                  onVaelg={(m) => { setLandsdel(m); setAabenMenu(null); }}
                />
                <Vaelger
                  etiket={stoette}
                  valgt={stoette}
                  erValgt={stoette === STOETTE_FAST}
                  muligheder={[STOETTE_STANDARD, STOETTE_FAST]}
                  aaben={aabenMenu === "stoette"}
                  onToggle={() => skiftMenu("stoette")}
                  onVaelg={(m) => { setStoette(m); setAabenMenu(null); }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="fl-wrap" style={{ paddingBottom: "clamp(50px,8vw,86px)" }}>
        {status === "indlaeser" ? (
          <p style={{ textAlign: "center", color: "var(--body)", fontSize: "15px" }}>Henter foreninger …</p>
        ) : status === "fejl" ? (
          <p style={{ textAlign: "center", color: "var(--body)", fontSize: "15px" }}>Vi kan ikke hente foreningerne lige nu. Prøv igen om lidt.</p>
        ) : foreninger.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--body)", fontSize: "15px" }}>Der er endnu ingen foreninger at vise.</p>
        ) : filtrerede.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ margin: "0 0 16px", color: "var(--body)", fontSize: "15px" }}>Ingen foreninger matcher dine filtre.</p>
            <button
              type="button"
              onClick={rydFiltre}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 18px", minHeight: 44, boxSizing: "border-box", borderRadius: 999, border: "1px solid var(--smh-border)", background: "#FFFFFF", color: "var(--ink)", fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}
            >
              Ryd alle filtre
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 14, flexWrap: "wrap", margin: "22px 0 20px" }}>
              <p style={{ margin: 0, fontSize: 14.5, color: "var(--body)" }}>{filtrerede.length === 1 ? "1 forening" : `${filtrerede.length} foreninger`}</p>
            </div>
            <div className="fl-grid">
              {filtrerede.map((f) => <ForeningKort key={f.slug} f={f} />)}
            </div>
          </>
        )}
      </section>

      <section style={{ background: "#F3F5F8", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
        <div className="fl-wrap" style={{ paddingTop: "clamp(48px,7vw,80px)", paddingBottom: "clamp(48px,7vw,80px)" }}>
          <div className="fl-eyebrow" style={{ color: "#C8112F" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            Sådan støtter du
          </div>
          <h2 className="fl-h2">To måder at støtte en forening</h2>
          <p style={{ margin: "0 0 30px", fontSize: 15, lineHeight: 1.7, color: "var(--body)", maxWidth: 620 }}>Nogle foreninger tilbyder begge dele. Andre har kun hjertesager. Det står på foreningens egen side.</p>

          <div className="fl-two">
            <div className="fl-two-card">
              <span className="fl-two-ico" style={{ background: "#FFF1F3", color: "var(--brand)" }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.7-10-9.3C.4 8.3 2 4.5 5.6 4.5c2 0 3.4 1.1 4.4 2.6C11 5.6 12.4 4.5 14.4 4.5 18 4.5 19.6 8.3 18 11.7 15.5 16.3 12 21 12 21z" /></svg>
              </span>
              <div>
                <h3 style={{ margin: "0 0 6px", fontSize: 16.5, fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Støt en hjertesag</h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--body)" }}>En hjertesag er en konkret indsamling med et formål og et beløb, foreningen samler ind til. Du giver et enkelt bidrag, og du bestemmer selv hvor meget.</p>
              </div>
            </div>
            <div className="fl-two-card">
              <span className="fl-two-ico" style={{ background: "#FFF1F3", color: "#A00C24" }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              </span>
              <div>
                <h3 style={{ margin: "0 0 6px", fontSize: 16.5, fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Støt fast hver måned</h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--body)" }}>Et fast månedligt beløb til foreningen selv. Du vælger beløbet, og du kan stoppe når som helst i MobilePay-appen. Ikke alle foreninger tilbyder fast støtte.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fl-wrap" style={{ paddingTop: "clamp(48px,7vw,80px)", paddingBottom: "clamp(56px,8vw,92px)" }}>
        <div style={{ borderRadius: 24, background: "#0B1424", color: "#fff", padding: "clamp(28px,4.5vw,44px)", boxShadow: "0 30px 70px -40px rgba(8,14,26,.5)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14, fontSize: 12.5, fontWeight: 700, letterSpacing: ".8px", textTransform: "uppercase", color: "#8FA0BC" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            Den rene model
          </div>
          <h2 style={{ margin: "0 0 14px", fontSize: "clamp(21px,2.8vw,26px)", fontWeight: 800, letterSpacing: "-.6px", color: "#fff" }}>Bidraget går direkte til foreningen</h2>
          <p style={{ margin: "0 0 8px", fontSize: 15, lineHeight: 1.7, color: "#AEB9CC", maxWidth: 620 }}>Bidraget går ind på foreningens egen MobilePay-konto. StøtMedHjerte er aldrig i pengestrømmen, håndterer ikke betalingen og opbevarer ikke kort-, bank- eller kontooplysninger.</p>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "#AEB9CC", maxWidth: 620 }}>Foreningen betaler et fast månedligt abonnement for at bruge platformen. StøtMedHjerte tager ikke en andel af bidragene.</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
