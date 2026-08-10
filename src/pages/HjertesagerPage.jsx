// ============================================================
// src/pages/HjertesagerPage.jsx
// Live data fra GET /api/public/hjertesager med roterende froe.
// Ingen haardkodet demodata, ingen opdigtet statistik i hero,
// ingen MobilePay-blaa (jf. K6).
//
// Godkendt = payment_ready === true OG indsamlingsnaevn_journal_nr findes.
//   Godkendt: skjold-maerke, journalnr-linje, groen bjaelke, aktiv CTA.
//   Pending:  intet maerke, "Afventer godkendelse", graa bjaelke,
//             deaktiveret CTA.
// antal_bidrag taeller bidrag, ikke personer.
// ============================================================

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import FilterBar from "@/components/marketing/FilterBar";
import { SMH_API_URL } from "../lib/supabaseClient";
import { hentFroe } from "../lib/froe";
import "./Hjertesager.css";

const kr = (v) => (v || 0).toLocaleString("da-DK") + " kr.";

// Andel, sikret mod division med nul eller manglende maalbeloeb.
const andel = (hs) => {
  const maal = Number(hs.maalbeloeb) || 0;
  if (maal <= 0) return 0;
  return (Number(hs.indsamlet_beloeb) || 0) / maal;
};

function ShieldBadge() {
  return (
    <span style={{ position: "absolute", top: "12px", left: "12px", display: "inline-flex", alignItems: "center", gap: "5px", padding: "6px 11px", borderRadius: "999px", background: "rgba(255,255,255,.94)", color: "#15803D", fontSize: "11.5px", fontWeight: 600, boxShadow: "0 4px 12px rgba(8,14,26,.1)" }}>
      <svg width="12" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
      Godkendt indsamling
    </span>
  );
}

function HjertesagKort({ hs }) {
  const f = hs.forening || {};
  const godkendt = f.payment_ready === true && !!f.indsamlingsnaevn_journal_nr;
  const pct = Math.round(andel(hs) * 100);
  const barBg = godkendt ? "linear-gradient(90deg,#16A34A,#22C55E)" : "#C6CDD8";
  const statusLine = godkendt
    ? `Journalnr. ${f.indsamlingsnaevn_journal_nr} · Indsamlingsnævnet`
    : "Afventer godkendelse hos Indsamlingsnævnet";

  const cardInner = (
    <>
      <div style={{ position: "relative", height: "170px", background: "var(--alt)", overflow: "hidden" }}>
        {hs.coverbillede
          ? <img src={hs.coverbillede} alt={hs.kampagnenavn} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--smh-muted)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="8.5" cy="9" r="1.6" /><path d="M21 16l-5-5L5 21" /></svg>
            </div>}
        {godkendt && <ShieldBadge />}
      </div>

      <div style={{ padding: "22px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "18px" }}>
          {f.logo && (
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--smh-border)", flexShrink: 0, background: "var(--alt)" }}>
              <img src={f.logo} alt={f.foreningsnavn} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            <h3 style={{ margin: "0 0 3px", fontSize: "18.5px", fontWeight: 700, letterSpacing: "-.4px", color: "var(--ink)", lineHeight: 1.25 }}>{hs.kampagnenavn}</h3>
            <div style={{ fontSize: "13.5px", color: "var(--smh-muted)" }}>{f.foreningsnavn} · {f.by}</div>
            <div style={{ fontSize: "12.5px", lineHeight: 1.4, color: "var(--smh-muted)", marginTop: "4px" }}>{statusLine}</div>
          </div>
        </div>

        <div style={{ height: "9px", borderRadius: "999px", background: "var(--alt)", overflow: "hidden", marginBottom: "8px" }}>
          <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, borderRadius: "999px", background: barBg }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "18px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: godkendt ? "#15803D" : "var(--smh-muted)" }}>{pct}% nået</span>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--smh-muted)" }}>{hs.antal_bidrag} bidrag</span>
        </div>

        <div className="hs-kpi">
          {[["Indsamlet", kr(hs.indsamlet_beloeb)], ["Mål", kr(hs.maalbeloeb)], ["Mangler", kr(Math.max((Number(hs.maalbeloeb) || 0) - (Number(hs.indsamlet_beloeb) || 0), 0))]].map(([l, v]) => (
            <div key={l}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--label)", textTransform: "uppercase", letterSpacing: ".4px", marginBottom: "3px" }}>{l}</div>
              <div style={{ fontSize: "15.5px", fontWeight: 700, color: "var(--ink)" }}>{v}</div>
            </div>
          ))}
        </div>

        {godkendt
          ? <Link to={`/hjertesag/${hs.slug}`} className="cta-flat-brand" style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "center", height: "50px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, color: "#fff", textDecoration: "none" }}>Støt hjertesagen</Link>
          : <span aria-disabled="true" style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "center", height: "50px", borderRadius: "999px", background: "var(--alt)", border: "1px solid var(--smh-border)", color: "#8A94A3", fontSize: "15px", fontWeight: 600, cursor: "not-allowed" }}>Kan ikke modtage bidrag endnu</span>}

        <div style={{ marginTop: "11px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "var(--smh-muted)", fontSize: "12px", textAlign: "center" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          Bidrag går direkte til foreningens egen MobilePay-konto.
        </div>
      </div>
    </>
  );

  const shell = { display: "flex", flexDirection: "column", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "24px", overflow: "hidden", boxShadow: "0 16px 44px -30px rgba(8,14,26,.14)", textDecoration: "none" };
  return godkendt
    ? <Link to={`/hjertesag/${hs.slug}`} style={shell}>{cardInner}</Link>
    : <div style={shell}>{cardInner}</div>;
}

export default function HjertesagerPage() {
  const froe = useMemo(() => hentFroe(), []);
  const [alle, setAlle] = useState([]);
  const [status, setStatus] = useState("indlaeser");
  const [q, setQ] = useState("");
  const [forening, setForening] = useState("");
  const [sort, setSort] = useState("roterende");

  useEffect(() => {
    let live = true;
    fetch(`${SMH_API_URL}/api/public/hjertesager?froe=${encodeURIComponent(froe)}`)
      .then((r) => { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then((d) => { if (live) { setAlle(d.hjertesager || []); setStatus("klar"); } })
      .catch(() => { if (live) setStatus("fejl"); });
    return () => { live = false; };
  }, [froe]);

  const foreninger = useMemo(
    () => [...new Set(alle.map((h) => h.forening?.foreningsnavn).filter(Boolean))].sort((a, b) => a.localeCompare(b, "da")),
    [alle]
  );

  const vist = useMemo(() => {
    let list = [...alle];
    const s = q.trim().toLowerCase();
    if (s) list = list.filter((h) => `${h.kampagnenavn} ${h.forening?.foreningsnavn || ""} ${h.forening?.by || ""}`.toLowerCase().includes(s));
    if (forening) list = list.filter((h) => h.forening?.foreningsnavn === forening);
    if (sort === "taet") list = [...list].sort((a, b) => andel(b) - andel(a));
    return list;
  }, [alle, q, forening, sort]);

  const reset = () => { setQ(""); setForening(""); setSort("roterende"); };
  const visFilter = alle.length >= 20;

  return (
    <div style={{ background: "var(--page)", minHeight: "100vh" }}>
      <SiteNav />

      <section className="hs-wrap" style={{ padding: "clamp(44px,6vw,84px) 24px clamp(20px,3vw,32px)", textAlign: "center" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: ".8px", textTransform: "uppercase", color: "#C8112F", marginBottom: "14px" }}>Hjertesager</div>
        <h1 style={{ margin: "0 auto 16px", maxWidth: "680px", fontSize: "clamp(30px,4.4vw,44px)", fontWeight: 800, letterSpacing: "-1.2px", lineHeight: 1.1, color: "var(--ink)" }}>Find en konkret sag, du kan støtte.</h1>
        <p style={{ margin: "0 auto", maxWidth: "560px", fontSize: "17px", lineHeight: 1.6, color: "var(--body)" }}>Hver hjertesag hører til en dansk forening og et tydeligt formål. Vælg en sag, og støt direkte med MobilePay.</p>
      </section>

      <section className="hs-wrap" style={{ padding: "0 24px 64px" }}>
        {visFilter && (
          <FilterBar
            q={q}
            onQ={setQ}
            searchPlaceholder="Søg efter sag, forening eller by"
            selects={[
              { value: forening, onChange: setForening, ariaLabel: "Vælg forening",
                options: [{ value: "", label: "Alle foreninger" }, ...foreninger.map((f) => ({ value: f, label: f }))] },
              { value: sort, onChange: setSort, ariaLabel: "Vælg rækkefølge",
                options: [{ value: "roterende", label: "Vores rækkefølge" }, { value: "taet", label: "Tæt på målet" }] },
            ]}
          />
        )}

        <div className="hs-fairband">
          <span aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18" /><path d="M7 21h10" /><path d="M6 7h12" /><path d="M6 7 3.5 13a2.5 2.5 0 0 0 5 0L6 7z" /><path d="M18 7l-2.5 6a2.5 2.5 0 0 0 5 0L18 7z" /></svg>
          </span>
          <p><strong>Lige vilkår.</strong> Rækkefølgen skifter ved hvert besøg, så alle hjertesager får lige meget synlighed.</p>
        </div>

        {status === "indlaeser" ? (
          <p style={{ textAlign: "center", color: "var(--body)", fontSize: "15px" }}>Henter hjertesager …</p>
        ) : status === "fejl" ? (
          <div style={{ textAlign: "center", padding: "clamp(40px,7vw,72px) 24px", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "24px" }}>
            <h3 style={{ margin: "0 0 10px", fontSize: "clamp(18px,2.6vw,21px)", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Vi kan ikke hente hjertesagerne lige nu.</h3>
            <p style={{ margin: 0, fontSize: "15px", color: "var(--body)" }}>Prøv igen om lidt.</p>
          </div>
        ) : vist.length === 0 ? (
          <div style={{ textAlign: "center", padding: "clamp(40px,7vw,72px) 24px", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "24px" }}>
            <h3 style={{ margin: "0 0 18px", fontSize: "clamp(18px,2.6vw,21px)", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Der er ikke fundet hjertesager, der matcher din søgning.</h3>
            <button type="button" onClick={reset} className="cta-flat-ghost" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: "50px", padding: "0 24px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, color: "var(--ink)", fontFamily: "inherit", cursor: "pointer" }}>Nulstil filter</button>
          </div>
        ) : (
          <div className="hs-cards">
            {vist.map((hs) => <HjertesagKort key={hs.slug} hs={hs} />)}
          </div>
        )}
      </section>

      <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)" }}>
        <div className="hs-wrap" style={{ padding: "clamp(48px,7vw,88px) 24px", maxWidth: "760px", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: "clamp(24px,3.2vw,34px)", fontWeight: 800, letterSpacing: "-.8px", color: "var(--ink)" }}>Hvad er en hjertesag?</h2>
          <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.7, color: "var(--body)" }}>En hjertesag er en konkret indsamling til et tydeligt formål i en dansk forening, fx nye trøjer, en klubtur eller bedre udstyr. Du kan se hvad foreningen samler ind til, hvor langt de er, og støtte direkte med MobilePay. Bidraget går ind på foreningens egen konto. StøtMedHjerte tager ingen andel af bidragene.</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
