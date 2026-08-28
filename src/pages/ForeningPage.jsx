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
import ForeningIkkeKlar from "@/components/ForeningIkkeKlar";
import { visForeningstype, visCvr } from "../lib/foreningstype";
import { FormaalIkon } from "../lib/formaalIkoner";
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
  const [formaal, setFormaal] = useState([]);
  const [hjertesager, setHjertesager] = useState([]);
  const [kopieret, setKopieret] = useState(false);
  const [omUdvidet, setOmUdvidet] = useState(false);

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

        // Backend svarer klar:false naar siden er slaaet til men profilen
        // ikke er komplet. Saa viser vi en "snart klar"-tilstand med kun de
        // minimale data backend sender (navn, by, cvr), ikke den fulde side.
        if (data.klar === false) {
          setForening(data.forening);
          setStatus("ikke-klar");
          return;
        }

        setForening(data.forening);
        setFormaal(Array.isArray(data.formaal) ? data.formaal : []);
        setHjertesager(Array.isArray(data.hjertesager) ? data.hjertesager : []);
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
          {status === "ikke-klar" && <ForeningIkkeKlar forening={forening} />}
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

      <section className="f-wrap" style={{ paddingBottom: "clamp(48px,8vw,76px)" }}>
        <div className="f-grid">
          <div>
            <div className="f-eyebrow" style={{ color: "#C8112F" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9.5" /><path d="M12 11v5" /><circle cx="12" cy="7.8" r="1.1" fill="currentColor" stroke="none" /></svg>
              Om foreningen
            </div>

            {harIndhold(forening.lang_beskrivelse) ? (
              (() => {
                const lang = forening.lang_beskrivelse;
                return (
                  <>
                    <div style={omUdvidet ? { maxHeight: "none", overflow: "visible" } : { maxHeight: 112, overflow: "hidden", WebkitMaskImage: "linear-gradient(180deg,#000 60%,transparent)", maskImage: "linear-gradient(180deg,#000 60%,transparent)" }}>
                      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--body)", maxWidth: 620 }}>{lang}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOmUdvidet((v) => !v)}
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, background: "none", border: "none", padding: "4px 0", fontFamily: "inherit", fontSize: 14, fontWeight: 700, color: "var(--brand-hover)", cursor: "pointer" }}
                    >
                      {omUdvidet ? "Vis mindre" : "Læs mere"}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: omUdvidet ? "rotate(180deg)" : "none", transition: "transform .3s ease" }}><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                  </>
                );
              })()
            ) : (
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--body)", maxWidth: 620 }}>{`${forening.foreningsnavn} har endnu ikke skrevet en længere præsentation af sit arbejde.`}</p>
            )}

            {formaal.length > 0 && (
              <>
                <div className="f-rule" />
                <div className="f-eyebrow" style={{ color: "#C8112F" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  Hvad pengene bruges til
                </div>
                <h2 className="f-h2">Sådan bruger foreningen bidragene</h2>
                <p className="f-lead">Foreningen har selv beskrevet, hvad bidragene går til.</p>
                <div className="f-use">
                  {formaal.map((punkt, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, padding: 20, border: "1px solid var(--smh-border)", borderRadius: 20, background: "#FFFFFF", boxShadow: "0 16px 44px -34px rgba(8,14,26,.14)" }}>
                      <span style={{ width: 40, height: 40, borderRadius: 12, background: "#F0FCF4", color: "#15803D", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <FormaalIkon noegle={punkt.ikon} />
                      </span>
                      <div>
                        <h3 style={{ margin: "0 0 5px", fontSize: 15.5, fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>{punkt.titel}</h3>
                        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--body)" }}>{punkt.tekst}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Faste stoetter. Vises kun naar foreningen har fast stoette.
                Kun tom-tilstanden er bygget: ruten sender endnu ingen faste
                stoetter, fordi Recurring API ikke er bygget.

                NAAR RECURRING ER BYGGET skal denne sektion udvides med en
                rulleliste over hilsner. Vaerdierne herunder er maalt i
                CD-prototypen Forening.dc.html, saa de ikke skal maales igen.

                Ruten skal sende to ting: antallet af faste stoetter, og en
                liste med hilsner. Hver hilsen har navn, beloeb, tidspunkt og
                tekst, og navnet udelades HELT ved anonym, ikke som tom
                streng. Samme regel som stoettevaeggen paa hjertesagsruten.

                Naar der ER stoetter, erstattes tom-tilstanden af:

                h2 med className f-h2, teksten er antallet efterfulgt af
                " støtter foreningen fast hver måned". Antallet formateres
                med toLocaleString("da-DK").

                p med className f-lead: Når nogen begynder at støtte fast,
                kan de efterlade en hilsen til foreningen. De nyeste lander
                øverst, rul for at læse dem alle.

                Derefter et kort: border 1px solid var(--smh-border),
                borderRadius 22, background #FFFFFF, boxShadow
                0 16px 44px -34px rgba(8,14,26,.14), overflow hidden.

                Kortets hoved: display flex, alignItems center,
                justifyContent space-between, gap 12, padding 15px 20px,
                borderBottom 1px solid var(--smh-border).
                Til venstre en span med teksten Seneste hilsner i fontSize
                14.5, fontWeight 700, color var(--ink), letterSpacing -.2px,
                og ved siden af den et maerkat med antallet: padding 3px 9px,
                borderRadius 999, background #F3F5F8, color var(--body),
                fontSize 12, fontWeight 700.
                Til hoejre et LIVE-maerkat: display inline-flex, alignItems
                center, gap 7, padding 6px 12px, borderRadius 999,
                background #F0FCF4, border 1px solid #BBF7D0.
                Det indeholder en prik paa 7 gange 7 med borderRadius 50%,
                background #22C55E og animation "livePulse 2s infinite", og
                teksten LIVE i fontSize 11, fontWeight 800, letterSpacing
                .7px, color #15803D.

                Kortets krop: className wall-scroll, maxHeight 430,
                overflowY auto, padding 2px 20px 10px. Her ligger hilsnerne.

                CSS til rullelistens scrollbar og til livePulse ligger
                allerede klar i Forening.css. */}
            {forening.har_fast_stoette && (
              <>
                <div className="f-rule" />
                <div className="f-eyebrow" style={{ color: "#C8112F" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" /></svg>
                  Faste støtter
                </div>
                <div style={{ display: "flex", gap: 16, padding: 26, border: "1px solid #FFE4E8", borderRadius: 22, background: "#FFF1F3" }}>
                  <span style={{ width: 46, height: 46, borderRadius: 13, background: "#fff", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.7-10-9.3C.4 8.3 2 4.5 5.6 4.5c2 0 3.4 1.1 4.4 2.6C11 5.6 12.4 4.5 14.4 4.5 18 4.5 19.6 8.3 18 11.7 15.5 16.3 12 21 12 21z" /></svg>
                  </span>
                  <div>
                    <h3 style={{ margin: "0 0 6px", fontSize: 16.5, fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Bliv den første, der støtter fast</h3>
                    <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "var(--body)", maxWidth: 520 }}>Foreningen er lige gået i luften på StøtMedHjerte. En fast støtte hver måned giver foreningen ro til at planlægge sæsonen.</p>
                  </div>
                </div>
              </>
            )}

            <div className="f-rule" />
            <a id="hjertesager" style={{ position: "relative", top: -80, display: "block" }} />
            <div className="f-eyebrow" style={{ color: "#C8112F" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.7-10-9.3C.4 8.3 2 4.5 5.6 4.5c2 0 3.4 1.1 4.4 2.6C11 5.6 12.4 4.5 14.4 4.5 18 4.5 19.6 8.3 18 11.7 15.5 16.3 12 21 12 21Z" /></svg>
              Foreningens hjertesager
            </div>
            {hjertesager.length > 0 ? (
              <>
                <h2 className="f-h2">Aktive indsamlinger lige nu</h2>
                <p className="f-lead">{forening.har_fast_stoette ? "En hjertesag er en konkret indsamling med et formål og en slutdato. Vil du støtte en enkelt sag frem for foreningen som helhed, kan du gøre det her." : "En hjertesag er en konkret indsamling med et formål og en slutdato. Vælg den sag, du vil støtte."}</p>
                <div className="f-cards">
                  {hjertesager.map((hs) => {
                    const sti = slug && hs.slug ? `/hjertesag/${slug}/${hs.slug}` : null;
                    const Kort = sti ? Link : "div";
                    return (
                    <Kort
                      key={hs.slug}
                      {...(sti ? { to: sti } : {})}
                      className={sti ? "liftable" : undefined}
                      style={{ textDecoration: "none", display: "block", border: "1px solid var(--smh-border)", borderRadius: 22, overflow: "hidden", background: "#FFFFFF", boxShadow: "0 16px 44px -34px rgba(8,14,26,.16)" }}
                    >
                      <div style={{ aspectRatio: "16/9", background: "#0B1424" }}>
                        {harIndhold(hs.coverbillede) && (
                          <img src={hs.coverbillede} alt={hs.kampagnenavn} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        )}
                      </div>
                      <div style={{ padding: "18px 20px 20px" }}>
                        <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>{hs.kampagnenavn}</h3>
                        <p style={{ margin: "0 0 14px", fontSize: 13.5, lineHeight: 1.55, color: "var(--body)" }}>{hs.kort_beskrivelse}</p>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 700, color: "var(--brand-hover)" }}>
                          Se hjertesagen
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                        </span>
                      </div>
                    </Kort>
                    );
                  })}
                </div>
              </>
            ) : (
              <div style={{ display: "flex", gap: 16, padding: 26, border: "1px solid var(--smh-border)", borderRadius: 22, background: "#FFFFFF", boxShadow: "0 16px 44px -34px rgba(8,14,26,.14)" }}>
                <span style={{ width: 46, height: 46, borderRadius: 13, background: "#F3F5F8", color: "var(--body)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7.5-4.7-10-9.3C.4 8.3 2 4.5 5.6 4.5c2 0 3.4 1.1 4.4 2.6C11 5.6 12.4 4.5 14.4 4.5 18 4.5 19.6 8.3 18 11.7 15.5 16.3 12 21 12 21Z" /></svg>
                </span>
                <div>
                  <h3 style={{ margin: "0 0 6px", fontSize: 16.5, fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Foreningen har ingen aktive indsamlinger lige nu</h3>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--body)" }}>{forening.har_fast_stoette ? "Det er stadig muligt at støtte foreningen fast hver måned. Fast støtte følger foreningen selv og er ikke bundet til en enkelt indsamling." : "Foreningen opretter nye hjertesager, når der er et formål at samle ind til. Kom gerne tilbage senere."}</p>
                </div>
              </div>
            )}

            {(harIndhold(forening.indsamlingsnaevn?.status) || harIndhold(forening.indsamlingsnaevn?.journal_nr)) && (
              <>
                <div className="f-rule" />
                <div className="f-eyebrow" style={{ color: "#C8112F" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h5" /></svg>
                  Offentlig dokumentation
                </div>
                <h2 className="f-h2" style={{ marginBottom: 22 }}>Foreningen er fuldt åben om sine indsamlinger</h2>
                <div style={{ background: "#FFFFFF", border: "1px solid var(--smh-border)", borderRadius: 22, overflow: "hidden", boxShadow: "0 16px 44px -34px rgba(8,14,26,.14)" }}>
                  <div style={{ display: "flex", gap: 16, padding: "22px 24px", borderBottom: "1px solid var(--smh-border)" }}>
                    <span style={{ width: 46, height: 46, borderRadius: 13, background: "#F0FCF4", color: "#15803D", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 5 }}>
                        <h3 style={{ margin: 0, fontSize: 16.5, fontWeight: 700, color: "var(--ink)", letterSpacing: "-.3px" }}>Godkendt hos Indsamlingsnævnet</h3>
                        {harIndhold(forening.indsamlingsnaevn?.status) && (
                          <span style={{ padding: "3px 10px", borderRadius: 999, background: "#F0FCF4", color: "#15803D", fontSize: 11, fontWeight: 700, letterSpacing: ".5px" }}>{forening.indsamlingsnaevn.status.toUpperCase()}</span>
                        )}
                      </div>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--body)" }}>Foreningen har Indsamlingsnævnets tilladelse til at samle ind offentligt.</p>
                    </div>
                  </div>
                  {harIndhold(forening.indsamlingsnaevn?.journal_nr) && (
                    <div style={{ display: "flex", gap: 16, padding: "22px 24px", borderBottom: "1px solid var(--smh-border)" }}>
                      <span style={{ width: 46, height: 46, borderRadius: 13, background: "#F3F5F8", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h5" /></svg>
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 5 }}>
                          <h3 style={{ margin: 0, fontSize: 16.5, fontWeight: 700, color: "var(--ink)", letterSpacing: "-.3px" }}>Journalnummer hos Indsamlingsnævnet</h3>
                          <span style={{ padding: "3px 10px", borderRadius: 999, background: "#F3F5F8", color: "var(--ink)", fontSize: 11, fontWeight: 700, letterSpacing: ".5px" }}>{`J.NR. ${forening.indsamlingsnaevn.journal_nr}`}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--body)" }}>Foreningens indsamling er registreret offentligt og kan slås op hos myndigheden.</p>
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 16, padding: "22px 24px" }}>
                    <span style={{ width: 46, height: 46, borderRadius: 13, background: "#FFF7EC", color: "#8A3D06", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 5 }}>
                        <h3 style={{ margin: 0, fontSize: 16.5, fontWeight: 700, color: "var(--ink)", letterSpacing: "-.3px" }}>Regnskab senest 6 måneder efter</h3>
                      </div>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--body)" }}>Foreningen skal aflægge regnskab for indsamlingen til Indsamlingsnævnet senest seks måneder efter perioden. StøtMedHjerte samler tallene, så foreningen har dem klar.</p>
                    </div>
                  </div>
                </div>
                <p style={{ margin: "18px 0 0", fontSize: 13, lineHeight: 1.6, color: "var(--smh-muted)" }}>Indsamlingsnævnet er den danske myndighed, der godkender og fører tilsyn med foreningers indsamlinger. Læs mere under <Link to="/tilladelse-og-regnskab" style={{ color: "var(--brand-hover)", fontWeight: 700 }}>tilladelse og regnskab</Link>.</p>
              </>
            )}

            {harIndhold(forening.kontakt?.email) && (
              <>
                <div className="f-rule" />
                <div className="f-eyebrow" style={{ color: "#C8112F" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                  Kontakt
                </div>
                <h2 className="f-h2">Spørgsmål til foreningen</h2>
                <p className="f-lead">Skriv til foreningen, hvis du har spørgsmål til et bidrag.</p>
                <div style={{ background: "#FFFFFF", border: "1px solid var(--smh-border)", borderRadius: 22, overflow: "hidden", boxShadow: "0 16px 44px -34px rgba(8,14,26,.14)" }}>
                  <a href={`mailto:${forening.kontakt.email}`} style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", textDecoration: "none" }}>
                    <span style={{ width: 44, height: 44, borderRadius: 13, background: "#F3F5F8", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                    </span>
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: "block", fontSize: 12.5, fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase", color: "var(--smh-muted)", marginBottom: 2 }}>E-mail</span>
                      <span style={{ display: "block", fontSize: 15.5, fontWeight: 700, color: "#A00C24", wordBreak: "break-all" }}>{forening.kontakt.email}</span>
                    </span>
                  </a>
                  {harIndhold(forening.kontakt?.telefon) && (
                    <a href={`tel:${forening.kontakt.telefon.replace(/\s+/g, "")}`} style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", textDecoration: "none", borderTop: "1px solid var(--smh-border)" }}>
                      <span style={{ width: 44, height: 44, borderRadius: 13, background: "#F3F5F8", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" /></svg>
                      </span>
                      <span style={{ minWidth: 0 }}>
                        <span style={{ display: "block", fontSize: 12.5, fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase", color: "var(--smh-muted)", marginBottom: 2 }}>Telefon</span>
                        <span style={{ display: "block", fontSize: 15.5, fontWeight: 700, color: "#A00C24", wordBreak: "break-all" }}>{forening.kontakt.telefon}</span>
                      </span>
                    </a>
                  )}
                </div>
                <p style={{ margin: "16px 0 0", fontSize: 13.5, lineHeight: 1.6, color: "var(--smh-muted)" }}>Kan du ikke komme igennem, hjælper <Link to="/support" style={{ color: "var(--brand-hover)", fontWeight: 700 }}>StøtMedHjertes support</Link> dig videre.</p>
                {forening.har_fast_stoette && (
                  <div style={{ marginTop: 24, padding: "22px 24px", border: "1px solid var(--smh-border)", borderRadius: 22, background: "#F3F5F8" }}>
                    <h3 style={{ margin: "0 0 6px", fontSize: 16.5, fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Sådan stopper du din faste støtte</h3>
                    <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--body)" }}>Du stopper selv aftalen i MobilePay-appen. Du behøver ikke kontakte foreningen.</p>
                  </div>
                )}
              </>
            )}

            <div style={{ borderRadius: 24, background: "#0B1424", color: "#fff", padding: "clamp(26px,4vw,38px)", boxShadow: "0 30px 70px -40px rgba(8,14,26,.5)", marginTop: 60 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14, fontSize: 12.5, fontWeight: 700, letterSpacing: ".8px", textTransform: "uppercase", color: "#8FA0BC" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                Den rene model
              </div>
              <h2 style={{ margin: "0 0 14px", fontSize: "clamp(21px,2.8vw,26px)", fontWeight: 800, letterSpacing: "-.6px", color: "#fff" }}>Bidraget går direkte til foreningen</h2>
              <p style={{ margin: "0 0 8px", fontSize: 15, lineHeight: 1.7, color: "#AEB9CC", maxWidth: 600 }}>Bidragene går ind på foreningens egen MobilePay-konto. StøtMedHjerte er aldrig i pengestrømmen, håndterer ikke betalingen og opbevarer ikke kort-, bank- eller kontooplysninger.</p>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "#AEB9CC", maxWidth: 600 }}>Foreningen betaler et fast månedligt abonnement for at bruge platformen. StøtMedHjerte tager ikke en andel af bidragene.</p>
            </div>
          </div>

          {!forening.har_fast_stoette && (
            <aside>
              <div className="sticky-inner">
                <div style={{ background: "#FFFFFF", border: "1px solid var(--smh-border)", borderRadius: 22, padding: "clamp(20px,4vw,26px)", boxShadow: "0 30px 70px -42px rgba(8,14,26,.22)" }}>
                  {hjertesager.length > 0 ? (
                    (() => {
                      const hs = hjertesager[0];
                      const maal = Number(hs.maalbeloeb);
                      const pct = maal > 0 ? Math.min(100, Math.round((Number(hs.indsamlet_beloeb) / maal) * 100)) : 0;
                      const sti = slug && hs.slug ? `/hjertesag/${slug}/${hs.slug}` : null;
                      const Kort = sti ? Link : "div";
                      return (
                        <>
                          <h2 style={{ margin: "0 0 6px", fontSize: 19, fontWeight: 800, letterSpacing: "-.45px", color: "var(--ink)" }}>{`Støt ${forening.foreningsnavn}`}</h2>
                          <p style={{ margin: "0 0 18px", fontSize: 14, lineHeight: 1.6, color: "var(--body)" }}>Foreningen samler ind til konkrete formål. Vælg en hjertesag og giv et bidrag.</p>
                          <Kort {...(sti ? { to: sti } : {})} style={{ display: "block", textDecoration: "none", border: "1px solid var(--smh-border)", borderRadius: 18, overflow: "hidden", background: "#FFFFFF", marginBottom: 16 }}>
                            <div style={{ aspectRatio: "16/9", background: "#F3F5F8" }}>
                              {harIndhold(hs.coverbillede) && (
                                <img src={hs.coverbillede} alt={hs.kampagnenavn} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                              )}
                            </div>
                            <div style={{ padding: "14px 16px 16px" }}>
                              <h3 style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 700, letterSpacing: "-.2px", color: "var(--ink)", lineHeight: 1.3 }}>{hs.kampagnenavn}</h3>
                              <div style={{ height: 7, borderRadius: 999, background: "#F3F5F8", overflow: "hidden", marginBottom: 7 }}>
                                <div style={{ height: "100%", borderRadius: 999, background: "linear-gradient(90deg,#16A34A,#22C55E)", width: `${pct}%` }} />
                              </div>
                              <span style={{ fontSize: 12.5, fontWeight: 700, color: "#15803D" }}>{`${pct}% nået`}</span>
                            </div>
                          </Kort>
                          <a href="#hjertesager" style={{ textDecoration: "none", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 14, minHeight: 48, border: "1px solid var(--smh-border)", borderRadius: 999, background: "#FFFFFF", color: "var(--ink)", fontSize: 14.5, fontWeight: 700, boxSizing: "border-box" }}>
                            Se alle hjertesager
                          </a>
                        </>
                      );
                    })()
                  ) : (
                    <>
                      <h2 style={{ margin: "0 0 6px", fontSize: 19, fontWeight: 800, letterSpacing: "-.45px", color: "var(--ink)" }}>Foreningen er lige gået i luften</h2>
                      <p style={{ margin: "0 0 18px", fontSize: 14, lineHeight: 1.6, color: "var(--body)" }}>Der er ingen aktive indsamlinger lige nu. Kig forbi igen, eller del foreningens side, så flere kan finde den.</p>
                      <button
                        type="button"
                        onClick={kopierLink}
                        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 14, minHeight: 48, border: "1px solid var(--smh-border)", borderRadius: 999, background: "#FFFFFF", color: "var(--ink)", fontSize: 14.5, fontWeight: 700, boxSizing: "border-box", fontFamily: "inherit", cursor: "pointer" }}
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
                    </>
                  )}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 9, marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--smh-border)", fontSize: 13, lineHeight: 1.55, color: "var(--body)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M20 6 9 17l-5-5" /></svg>
                    Bidraget går direkte til foreningens egen konto.
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Stoette-panel. Vises kun ved fast stoette.
              Kun AFVENTER-tilstanden er bygget. Prototypen har tre:

              KLAR kraever Recurring API og en MobilePay-knap der tegnes af
              Vipps, ikke af os. Den viser en raekke beloebsknapper i et
              gitter, et felt til eget beloeb med rydknap, en linje med
              "Du støtter med" og det valgte beloeb i fontSize 22 og
              fontWeight 800, en advarsel i brandfarven naar beloebet er
              under minimum, MobilePay-knappen, og to beroligende linjer,
              hvoraf den foerste er "Beløbet trækkes hver måned. Du kan
              stoppe når som helst."

              AFVIST vises for donorer under 18 og kraever en
              aldersbekraeftelse der ikke findes.

              Begge bygges sammen med Recurring API. Vaerdierne staar i
              CD-prototypen Forening.dc.html. */}
          {forening.har_fast_stoette && (
            <aside>
              <div className="sticky-inner">
                <a id="stoet" style={{ position: "relative", top: -80, display: "block" }} />
                <div style={{ background: "#FFFFFF", border: "1px solid var(--smh-border)", borderRadius: 22, padding: "clamp(20px,4vw,26px)", boxShadow: "0 30px 70px -42px rgba(8,14,26,.22)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 12px", borderRadius: 999, background: "#FFF7EC", color: "#8A3D06", fontSize: 11.5, fontWeight: 800, letterSpacing: ".4px", marginBottom: 16 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9.5" /><path d="M12 7v5.5l3.5 2" /></svg>
                    PÅ VEJ
                  </span>
                  <h2 style={{ margin: "0 0 10px", fontSize: 19, fontWeight: 800, letterSpacing: "-.45px", color: "var(--ink)" }}>{`Fast støtte åbner snart hos ${forening.foreningsnavn}`}</h2>
                  <p style={{ margin: "0 0 20px", fontSize: 14, lineHeight: 1.65, color: "var(--body)" }}>Foreningens opsætning af faste aftaler er ikke helt på plads endnu. Du kan støtte en af foreningens hjertesager i mellemtiden.</p>
                  <a href="#hjertesager" style={{ textDecoration: "none", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, padding: 16, minHeight: 52, borderRadius: 999, background: "var(--brand)", color: "#fff", fontSize: 15, fontWeight: 700, boxSizing: "border-box" }}>
                    Se foreningens hjertesager
                  </a>
                  <p style={{ margin: "14px 0 0", fontSize: 12.5, lineHeight: 1.55, color: "var(--smh-muted)" }}>Vi åbner for faste aftaler, så snart opsætningen er godkendt.</p>
                </div>
              </div>
            </aside>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
