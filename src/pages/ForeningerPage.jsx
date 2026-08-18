// ============================================================
// src/pages/ForeningerPage.jsx
// Skridt 1 af 3 i konverteringen af foreningsoversigten.
// Dette skridt: datahentning, de fire tilstande og hero.
// Filterraekke og kortgitter kommer i skridt 2 og 3.
//
// Live data fra GET /api/public/foreninger med eget roterende froe
// (smh_foreninger_froe), saa raekkefoelgen ikke deles med
// hjertesagsoversigten. Datamoenster og afbrudt-flag foelger
// HjertesagerPage.jsx.
// ============================================================

import { useEffect, useMemo, useState } from "react";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import { SMH_API_URL } from "../lib/supabaseClient";
import { hentFroe } from "../lib/froe";

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

      <section style={{ padding: "0 24px 64px", textAlign: "center" }}>
        {status === "indlaeser" ? (
          <p style={{ color: "var(--body)", fontSize: "15px" }}>Henter foreninger …</p>
        ) : status === "fejl" ? (
          <p style={{ color: "var(--body)", fontSize: "15px" }}>Vi kan ikke hente foreningerne lige nu. Prøv igen om lidt.</p>
        ) : foreninger.length === 0 ? (
          <p style={{ color: "var(--body)", fontSize: "15px" }}>Der er endnu ingen foreninger at vise.</p>
        ) : (
          <p style={{ color: "var(--body)", fontSize: "15px" }}>{foreninger.length} foreninger hentet.</p>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
