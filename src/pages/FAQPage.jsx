import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./FAQ.css";

function Ic({ d, size = 24, sw = 2, stroke = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={style} dangerouslySetInnerHTML={{ __html: d }} />
  );
}

const ARROW_R = '<path d="M5 12h14M13 6l6 6-6 6"/>';
const SEARCH = '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>';

const CATS = [
  {
    id: "stoetter", anchor: "for-stoetter", h2: "For støtter",
    desc: "Bidrag, betaling og tryghed når du støtter en hjertesag.",
    icon: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>',
    items: [
      { q: "Skal jeg oprette en profil for at støtte?", a: "Nej. Du bruger MobilePay-appen, som du allerede har. Du behøver ikke oprette en profil på StøtMedHjerte for at give et bidrag.", to: "/for-stoetter", linkLabel: "Sådan støtter du" },
      { q: "Går mit bidrag direkte til foreningen?", a: "Ja. Bidrag går direkte til foreningens egen MobilePay-konto, uden mellemled." },
      { q: "Hvordan betaler jeg?", a: "Du betaler og godkender bidraget i MobilePay-appen. StøtMedHjerte opbevarer ikke kort-, bank- eller kontooplysninger.", to: "/sikkerhed", linkLabel: "Læs om sikkerhed" },
      { q: "Kan jeg støtte fast hver måned?", a: "Ja, hvis foreningen tilbyder fast støtte. Så bidrager du med dit valgte beløb hver måned via MobilePay.", to: "/fast-stoette", linkLabel: "Om fast støtte" },
      { q: "Hvordan ved jeg, at foreningen er ægte?", a: "Alle foreninger CVR-valideres, før de kan bruge platformen og oprette hjertesager.", to: "/sikkerhed", linkLabel: "Sikkerhed og validering" },
      { q: "Kan jeg se, hvad foreningen samler ind til?", a: "Ja. Hver hjertesag viser formål, målbeløb og status, så du ved præcis, hvad du støtter.", to: "/hjertesager", linkLabel: "Se hjertesager" },
      { q: "Tager StøtMedHjerte en andel af mit bidrag?", a: "Nej. StøtMedHjerte tager ikke en andel af donationerne. Foreningen betaler i stedet et fast abonnement.", to: "/priser", linkLabel: "Se priser" },
    ],
  },
  {
    id: "foreninger", anchor: "for-foreninger", h2: "For foreninger",
    desc: "Kom i gang, opret hjertesager og få overblik over jeres indsamling.",
    icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    items: [
      { q: "Hvad kan vi bruge StøtMedHjerte til?", a: "Til hjertesager, donationer, fast støtte, journalnummer, dokumentation og regnskabsgrundlag, samlet ét sted.", to: "/for-foreninger", linkLabel: "For foreninger" },
      { q: "Går bidragene direkte til os?", a: "Ja. Bidrag går direkte til foreningens egen MobilePay-konto. StøtMedHjerte håndterer ikke donorbetalingerne.", to: "/sikkerhed", linkLabel: "Sikkerhed" },
      { q: "Skal vi have et CVR-nummer?", a: "Ja. Foreningen skal have et gyldigt CVR-nummer, som valideres, før I kan oprette hjertesager.", to: "/opret-forening", linkLabel: "Opret forening" },
      { q: "Kan vi oprette flere hjertesager?", a: "Ja. I kan oprette flere hjertesager. Foreningen sikrer selv, at tilladelser, perioder og formål passer til indsamlingerne.", to: "/hjertesager", linkLabel: "Se hjertesager" },
      { q: "Hvor hurtigt kan vi komme i gang?", a: "Når CVR er valideret, kan I oprette jeres første hjertesag med det samme. Se de fire trin i Sådan virker det.", to: "/saadan-virker-det", linkLabel: "Sådan virker det" },
    ],
  },
  {
    id: "priser", anchor: "priser-betaling", h2: "Priser og betaling",
    desc: "Hvad det koster at bruge platformen, og hvad det ikke gør.",
    icon: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
    items: [
      { q: "Hvad koster det at bruge StøtMedHjerte?", a: "Foreningen betaler et fast månedligt abonnement. Der er ingen andel af donationerne. Se de aktuelle priser på prissiden.", to: "/priser", linkLabel: "Se priser" },
      { q: "Tager I en andel af donationerne?", a: "Nej. StøtMedHjerte tager ikke en procentdel af bidragene. Alle bidrag går direkte til foreningens MobilePay-konto.", to: "/priser", linkLabel: "Se priser" },
      { q: "Er der binding eller opstartsgebyr?", a: "Abonnementet er fast og månedligt. Tjek de aktuelle vilkår og priser, før I opretter foreningen.", to: "/priser", linkLabel: "Priser og vilkår" },
    ],
  },
  {
    id: "tilladelse", anchor: "tilladelse-regnskab", h2: "Tilladelse og regnskab",
    desc: "Indsamlingsnævnet, journalnummer, revision og ansvar.",
    icon: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    items: [
      { q: "Skal vi søge tilladelse hos Indsamlingsnævnet?", a: "Planlægger I en offentlig indsamling, skal I være opmærksomme på reglerne. Ansøgningen skal sendes senest 14 dage før indsamlingen starter.", to: "/tilladelse-og-regnskab", linkLabel: "Tilladelse og regnskab" },
      { q: "Hvad koster en tilladelse?", a: "Indsamlingsnævnets gebyr for en almindelig ansøgning efter §3 er i 2026 angivet til 1.300 kr. Tjek altid den aktuelle takst hos Indsamlingsnævnet.", to: "/tilladelse-og-regnskab", linkLabel: "Læs mere" },
      { q: "Hvad er et journalnummer?", a: "Det nummer, foreningen får fra Indsamlingsnævnet, når en tilladelse er oprettet. I StøtMedHjerte knytter journalnummeret hjertesagen til den rette tilladelse.", to: "/tilladelse-og-regnskab", linkLabel: "Om journalnummer" },
      { q: "Hjælper StøtMedHjerte med regnskab?", a: "Platformen samler bidrag, status, journalnummer og dokumentation, så I får et bedre regnskabsgrundlag. Den erstatter ikke revisor eller juridisk rådgivning.", to: "/tilladelse-og-regnskab", linkLabel: "Regnskabsgrundlag" },
      { q: "Skal regnskabet revideres?", a: "Overstiger indsamlingen 50.000 kr., skal regnskabet revideres af en registreret eller statsautoriseret revisor.", to: "/tilladelse-og-regnskab", linkLabel: "Læs mere" },
      { q: "Udsteder StøtMedHjerte tilladelser?", a: "Nej. Tilladelser udstedes af Indsamlingsnævnet. StøtMedHjerte hjælper med struktur, dokumentation og overblik.", to: "/lovgivning-og-ansvar", linkLabel: "Lovgivning og ansvar" },
    ],
  },
];

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [openMap, setOpenMap] = useState({});
  const [activeCat, setActiveCat] = useState("stoetter");

  const q = query.trim().toLowerCase();
  const hasQuery = q.length > 0;

  const filtered = useMemo(() => {
    if (!hasQuery) return CATS;
    return CATS.map((c) => ({
      ...c,
      items: c.items.filter((it) => (it.q + " " + it.a).toLowerCase().includes(q)),
    })).filter((c) => c.items.length > 0);
  }, [q, hasQuery]);

  const totalResults = filtered.reduce((n, c) => n + c.items.length, 0);
  const noResults = hasQuery && totalResults === 0;

  const toggle = (id) => setOpenMap((m) => ({ ...m, [id]: !m[id] }));

  const scrollTo = (cat) => {
    setActiveCat(cat.id);
    const el = document.getElementById(cat.anchor);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SiteNav />
      <main className="faq-page">

        {/* ============ HERO + SOEGNING ============ */}
        <section className="faq-wrapc" style={{ paddingTop: "56px", paddingBottom: "8px", textAlign: "center" }}>
          <div style={{ animation: "faqRise .6s ease both", maxWidth: "680px", margin: "0 auto" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--label)", marginBottom: "18px" }}>FAQ</div>
            <h1 style={{ margin: 0, fontSize: "clamp(30px,5vw,50px)", lineHeight: 1.08, fontWeight: 800, letterSpacing: "-1.2px", color: "var(--ink)", textWrap: "balance" }}>Ofte stillede spørgsmål.</h1>
            <p style={{ margin: "18px auto 0", fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "520px", textWrap: "pretty" }}>Find hurtigt svar om støtte, foreninger, priser og tilladelse. Eller søg direkte herunder.</p>

            <div className="faq-search">
              <Ic d={SEARCH} size={20} sw={2.2} stroke="#94A3B8" style={{ flexShrink: 0 }} />
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Søg i ofte stillede spørgsmål" placeholder="Søg i spørgsmål, fx MobilePay eller tilladelse" />
              {hasQuery && (
                <button className="faq-clear" onClick={() => setQuery("")} aria-label="Ryd søgning">
                  <Ic d='<path d="M18 6 6 18M6 6l12 12"/>' size={16} sw={2.4} />
                </button>
              )}
            </div>

            {hasQuery && (
              <p style={{ margin: "16px 0 0", fontSize: "14px", color: "var(--smh-muted)" }}>{totalResults === 0 ? "Ingen resultater" : totalResults === 1 ? "1 resultat" : totalResults + " resultater"}</p>
            )}
          </div>
        </section>

        {/* ============ HJAELPECENTER: RAIL + SEKTIONER ============ */}
        <section className="faq-wrap" style={{ paddingTop: "32px", paddingBottom: "24px" }}>
          <div className="faq-grid">

            {/* venstre rail */}
            <aside className="faq-rail">
              <div className="faq-railhd">Kategorier</div>
              <div className="faq-railinner">
                {CATS.map((c) => (
                  <button key={c.id} type="button" onClick={() => scrollTo(c)} className={"faq-raillink" + (activeCat === c.id ? " is-active" : "")}>
                    <Ic d={c.icon} size={17} sw={2} style={{ flexShrink: 0 }} />
                    <span>{c.h2}</span>
                    <span className="faq-cnt">{c.items.length}</span>
                  </button>
                ))}
              </div>
              <div className="faq-railcard">
                <div style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.2px", marginBottom: "4px" }}>Fandt du ikke svaret?</div>
                <p style={{ margin: "0 0 14px", fontSize: "13px", lineHeight: 1.55, color: "var(--smh-muted)" }}>Skriv til support, så svarer vi hurtigt.</p>
                <Link to="/kontakt" className="faq-railmore">Kontakt os<Ic d={ARROW_R} size={14} sw={2.4} /></Link>
              </div>
            </aside>

            {/* hoejre: sektioner */}
            <div>
              {filtered.map((s) => (
                <section key={s.id} id={s.anchor} className="faq-sec">
                  <div style={{ display: "flex", alignItems: "center", gap: "13px", marginBottom: "6px" }}>
                    <span style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "12px", background: "var(--brand-surface)", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic d={s.icon} size={20} sw={2} /></span>
                    <h2 style={{ margin: 0, fontSize: "clamp(21px,3vw,28px)", lineHeight: 1.12, fontWeight: 800, letterSpacing: "-.6px", color: "var(--ink)" }}>{s.h2}</h2>
                  </div>
                  <p style={{ margin: "0 0 20px", fontSize: "15px", lineHeight: 1.55, color: "var(--smh-muted)" }}>{s.desc}</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {s.items.map((it, i) => {
                      const id = s.id + "-" + i;
                      const open = !!openMap[id];
                      return (
                        <div key={id} style={{ background: "var(--surface)", border: "1px solid " + (open ? "var(--brand-border)" : "var(--smh-border)"), borderRadius: "18px", overflow: "hidden", transition: "border-color .15s", boxShadow: "0 10px 30px -26px rgba(8,14,26,.14)" }}>
                          <button onClick={() => toggle(id)} aria-expanded={open} style={{ width: "100%", display: "flex", alignItems: "center", gap: "16px", padding: "19px 22px", background: "transparent", border: "none", fontFamily: "inherit", cursor: "pointer", textAlign: "left" }}>
                            <span style={{ flex: 1, fontSize: "16.5px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)", lineHeight: 1.35 }}>{it.q}</span>
                            <span style={{ flexShrink: 0, width: "30px", height: "30px", borderRadius: "9px", background: open ? "var(--brand-surface)" : "var(--alt)", color: open ? "var(--brand)" : "var(--smh-muted)", display: "flex", alignItems: "center", justifyContent: "center", transition: ".15s" }}>
                              <Ic d={open ? '<path d="M5 12h14"/>' : '<path d="M12 5v14M5 12h14"/>'} size={16} sw={2.6} />
                            </span>
                          </button>
                          {open && (
                            <div style={{ padding: "0 22px 22px" }}>
                              <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.65, color: "var(--body)", maxWidth: "660px" }}>{it.a}</p>
                              {it.to && (
                                <Link to={it.to} className="faq-morelink">{it.linkLabel}<Ic d={ARROW_R} size={14} sw={2.4} /></Link>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}

              {noResults && (
                <div style={{ textAlign: "center", padding: "48px 24px", background: "var(--surface)", border: "1px solid var(--smh-border)", borderRadius: "20px" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "var(--alt)", color: "var(--smh-muted)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Ic d={SEARCH} size={24} sw={2} /></div>
                  <h3 style={{ margin: "0 0 8px", fontSize: "19px", fontWeight: 700, letterSpacing: "-.3px", color: "var(--ink)" }}>Ingen resultater</h3>
                  <p style={{ margin: "0 auto 22px", fontSize: "15px", lineHeight: 1.6, color: "var(--body)", maxWidth: "380px" }}>Vi fandt ingen spørgsmål, der matcher det du søgte. Prøv et andet ord, eller skriv til os.</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                    <button onClick={() => setQuery("")} style={{ fontFamily: "inherit", color: "var(--ink)", fontSize: "14.5px", fontWeight: 600, padding: "12px 22px", minHeight: "48px", borderRadius: "999px", border: "1px solid var(--smh-border)", background: "var(--surface)", cursor: "pointer", transition: ".15s" }}>Ryd søgning</button>
                    <Link to="/kontakt" style={{ textDecoration: "none", color: "#fff", fontSize: "14.5px", fontWeight: 600, padding: "12px 22px", minHeight: "48px", borderRadius: "999px", background: "var(--brand)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Kontakt support</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ============ KONTAKT-CTA ============ */}
        <section style={{ background: "var(--alt)", borderTop: "1px solid var(--smh-border)", borderBottom: "1px solid var(--smh-border)" }}>
          <div className="faq-wrapc" style={{ paddingTop: "64px", paddingBottom: "64px", textAlign: "center" }}>
            <h2 style={{ margin: "0 0 14px", fontSize: "clamp(24px,3.6vw,34px)", lineHeight: 1.15, fontWeight: 800, letterSpacing: "-.7px", color: "var(--ink)" }}>Stadig spørgsmål?</h2>
            <p style={{ margin: "0 auto 30px", fontSize: "clamp(16px,2.2vw,17.5px)", lineHeight: 1.6, color: "var(--body)", maxWidth: "480px" }}>Vores support hjælper både støtter og foreninger. Skriv, så vender vi tilbage hurtigst muligt.</p>
            <div className="faq-cta-row" style={{ justifyContent: "center" }}>
              <Link to="/kontakt" className="faq-cta-w faq-btn-brand" style={{ textDecoration: "none", color: "#fff", fontSize: "16.5px", fontWeight: 600, padding: "17px 34px", minHeight: "56px", borderRadius: "999px", background: "var(--brand)", boxShadow: "0 14px 34px rgba(224,25,63,.24)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Kontakt os</Link>
              <Link to="/support" className="faq-cta-w faq-btn-ghost" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "16.5px", fontWeight: 600, padding: "17px 34px", minHeight: "56px", borderRadius: "999px", border: "1px solid var(--smh-border)", background: "var(--surface)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Besøg support</Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
