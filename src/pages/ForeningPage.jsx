// ============================================================
// src/pages/ForeningPage.jsx
// Skridt 1 af 3 i konverteringen af foreningens profilside.
// Dette skridt: rute, datahentning, tilstande og hero.
// Venstre og hoejre spalte kommer i skridt 2 og 3.
//
// Data hentes fra smh-api (GET /api/public/forening/:slug), IKKE fra
// Supabase i browseren. Svaret har tre felter paa oeverste niveau:
// forening, hjertesager og formaal. Her bruges kun forening.
// Datamoenster og afbrudt-flag foelger HjertesagPage.jsx.
// ============================================================

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SMH_API_URL } from "../lib/supabaseClient";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import { visForeningstype, visCvr } from "../lib/foreningstype";
import "./Forening.css";

// Tom streng er IKKE null i databasen. Tjek paa indhold, ikke eksistens.
function harIndhold(v) {
  return typeof v === "string" && v.trim().length > 0;
}

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

export default function ForeningPage() {
  const { slug } = useParams();

  const [status, setStatus] = useState("indlaeser");
  const [forening, setForening] = useState(null);
  const [kopieret, setKopieret] = useState(false);

  useEffect(() => {
    let afbrudt = false;

    async function hent() {
      setStatus("indlaeser");

      try {
        const svar = await fetch(
          `${SMH_API_URL}/api/public/forening/${encodeURIComponent(slug)}`
        );

        if (afbrudt) return;

        if (svar.status === 404) {
          setStatus("findes-ikke");
          return;
        }

        if (!svar.ok) {
          setStatus("fejl");
          return;
        }

        const data = await svar.json();
        if (afbrudt) return;

        setForening(data.forening);
        setStatus("klar");
      } catch {
        if (!afbrudt) setStatus("fejl");
      }
    }

    hent();

    return () => {
      afbrudt = true;
    };
  }, [slug]);

  async function kopierLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setKopieret(true);
      window.setTimeout(() => setKopieret(false), 2000);
    } catch {
      setKopieret(false);
    }
  }

  if (status !== "klar" || !forening) {
    return (
      <div style={{ background: "var(--page)", minHeight: "100vh" }}>
        <SiteNav />
        <main style={{ maxWidth: 620, margin: "0 auto", padding: "80px 20px", textAlign: "center" }}>
          {status === "indlaeser" && (
            <p style={{ color: "var(--smh-muted)", fontSize: 15 }}>Henter foreningen…</p>
          )}
          {status === "findes-ikke" && (
            <>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", margin: "0 0 12px" }}>Vi kunne ikke finde denne forening</h1>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--body)", margin: 0 }}>
                Tjek linket, eller find andre foreninger på <Link to="/foreninger" style={{ color: "var(--brand-hover)", fontWeight: 700 }}>oversigten</Link>.
              </p>
            </>
          )}
          {status === "fejl" && (
            <>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", margin: "0 0 12px" }}>Noget gik galt</h1>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--body)", margin: 0 }}>
                Vi kunne ikke hente siden lige nu. Prøv igen om et øjeblik.
              </p>
            </>
          )}
        </main>
        <SiteFooter />
      </div>
    );
  }

  const visCover = harIndhold(forening.coverbillede);

  return (
    <div style={{ background: "var(--page)", minHeight: "100vh" }}>
      <SiteNav />

      <section className="f-wrap" style={{ paddingTop: "clamp(26px,4vw,44px)", paddingBottom: "clamp(22px,3.5vw,34px)" }}>
        {visCover && (
          <div className="f-cover" style={{ marginBottom: 18 }}>
            <img src={forening.coverbillede} alt={`Foto fra ${forening.foreningsnavn}`} style={{ objectPosition: `50% ${forening.coverbillede_position ?? 50}%` }} />
          </div>
        )}

        <div className={visCover ? "f-hero f-heroblock" : "f-hero"}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 28,
              flexShrink: 0,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 18px 44px -26px rgba(8,14,26,.4)",
              ...(visCover ? { marginTop: -68, position: "relative", zIndex: 1 } : null),
              ...(harIndhold(forening.logo)
                ? { background: "#fff", border: "1px solid var(--smh-border)" }
                : { background: "var(--brand)" }),
            }}
          >
            {harIndhold(forening.logo) ? (
              <img src={forening.logo} alt={forening.foreningsnavn} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            ) : (
              <span style={{ color: "#fff", fontSize: 30, fontWeight: 800, letterSpacing: "-1px" }}>{initialer(forening.foreningsnavn)}</span>
            )}
          </div>

          <div className="f-herorow">
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              {harIndhold(forening.foreningstype) && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: "#F3F5F8", color: "var(--body)", fontSize: 12.5, fontWeight: 700, letterSpacing: ".2px" }}>
                  {visForeningstype(forening.foreningstype)}
                </span>
              )}
              {harIndhold(forening.by) && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13.5, fontWeight: 700, color: "var(--body)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  {forening.by}
                </span>
              )}
              {harIndhold(forening.cvr_nummer) && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: "#F3F5F8", color: "var(--body)", fontSize: 12.5, fontWeight: 700, letterSpacing: ".2px" }}>
                  CVR {visCvr(forening.cvr_nummer)}
                </span>
              )}
            </div>

            <div className="f-herotop">
              <h1 style={{ margin: 0, fontSize: "clamp(28px,4.6vw,40px)", fontWeight: 800, letterSpacing: "-1.1px", lineHeight: 1.12, color: "var(--ink)" }}>{forening.foreningsnavn}</h1>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href={forening.har_fast_stoette ? "#stoet" : "#hjertesager"}
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, padding: "15px 26px", minHeight: 52, borderRadius: 999, background: "var(--brand)", color: "#fff", fontSize: 15, fontWeight: 700, textDecoration: "none" }}
                >
                  {forening.har_fast_stoette ? "Støt fast hver måned" : "Se foreningens hjertesager"}
                </a>
                <button
                  type="button"
                  onClick={kopierLink}
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 24px", minHeight: 52, border: "1px solid var(--smh-border)", borderRadius: 999, background: "#FFFFFF", color: "var(--ink)", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                >
                  {kopieret ? (
                    <>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                      Kopieret
                    </>
                  ) : (
                    <>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></svg>
                      Kopiér link
                    </>
                  )}
                </button>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: "clamp(16px,2vw,17.5px)", lineHeight: 1.6, color: "var(--body)", maxWidth: 620 }}>{forening.profiltekst}</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
