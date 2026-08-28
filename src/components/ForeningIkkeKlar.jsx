import { useState } from "react";
import { Link } from "react-router-dom";

// Vist naar en forenings side er slaaet til men profilen ikke er komplet.
// Backend haandhaever kravet og svarer klar:false med kun navn, by og cvr.
// Den besoegende har faaet et link der endnu ikke virker, og skal moede en
// venlig "snart klar"-besked, ikke en fejl. Farver arves fra de globale
// CSS-variabler; kun layout og animation defineres her, scoped til nk-.
export default function ForeningIkkeKlar({ forening }) {
  const [kopieret, setKopieret] = useState(false);

  const navn = (forening && forening.foreningsnavn ? forening.foreningsnavn : "").trim();
  const harNavn = navn !== "";
  const overskrift = harNavn ? navn + " er snart klar" : "Foreningens side er snart klar";
  const lead = harNavn
    ? "Foreningen er ved at gøre sin side færdig. Kig forbi igen om lidt, så kan du se, hvad de samler ind til."
    : "Foreningen er ved at gøre sin side færdig. Kig forbi igen om lidt.";

  const by = (forening && forening.by ? forening.by : "").trim();
  const harBy = harNavn && by !== "";
  const cvrRaw = (forening && forening.cvr_nummer ? forening.cvr_nummer : "").trim();
  const harCvr = harNavn && cvrRaw !== "";
  const cvrLabel = harCvr ? "CVR " + cvrRaw.replace(/(\d{2})(?=\d)/g, "$1 ").trim() : "";
  const harMeta = harBy || harCvr;

  const trin = [
    { tekst: "Foreningen er oprettet og CVR-valideret", done: true },
    { tekst: "Siden er under opsætning hos foreningen", done: true },
    { tekst: "Så snart den er klar, kan du støtte herfra", done: false },
  ];

  async function kopierLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setKopieret(true);
      window.setTimeout(() => setKopieret(false), 2000);
    } catch {
      setKopieret(false);
    }
  }

  return (
    <div className="nk-wrap">
      <style>{`
        .nk-wrap{display:flex;align-items:center;justify-content:center;padding:clamp(28px,6vw,72px) 20px clamp(56px,9vw,104px);}
        .nk-card{width:100%;max-width:560px;background:var(--surface);border:1px solid var(--border);border-radius:28px;padding:clamp(30px,7vw,52px) clamp(22px,6vw,44px);box-shadow:0 30px 70px -42px rgba(8,14,26,.22);text-align:center;}
        .nk-emblem{position:relative;width:96px;height:96px;margin:0 auto 26px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:var(--brand-surface);color:var(--brand);}
        .nk-pulse{position:absolute;inset:0;border-radius:50%;border:2px solid var(--brand-border);animation:nkPulse 2.8s ease-out infinite;}
        .nk-pulse:nth-child(2){animation-delay:1.4s;}
        .nk-heart{position:relative;display:flex;animation:nkBeat 3.2s ease-in-out infinite;}
        .nk-kicker{display:inline-flex;align-items:center;gap:8px;margin-bottom:16px;padding:6px 14px;border-radius:999px;background:var(--brand-surface);color:var(--brand-ink);font-size:12.5px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;}
        .nk-name{font-size:clamp(24px,5.4vw,34px);font-weight:800;letter-spacing:-.9px;line-height:1.15;color:var(--ink);margin:0 0 12px;}
        .nk-lead{font-size:clamp(16px,2.2vw,17.5px);line-height:1.65;color:var(--body);margin:0 auto;max-width:400px;}
        .nk-meta{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:20px;}
        .nk-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;background:var(--alt);color:var(--body);font-size:12.5px;font-weight:700;letter-spacing:.2px;}
        .nk-steps{display:flex;flex-direction:column;gap:14px;margin:28px 0 4px;padding:22px;border-radius:20px;background:var(--alt);text-align:left;}
        .nk-step{display:flex;align-items:flex-start;gap:12px;font-size:14.5px;line-height:1.5;color:var(--body);}
        .nk-tick{flex-shrink:0;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-top:1px;}
        .nk-cta{display:inline-flex;align-items:center;justify-content:center;gap:9px;width:100%;height:52px;padding:0 24px;border-radius:999px;background:var(--brand);color:#fff;font-size:16px;font-weight:700;letter-spacing:-.2px;text-decoration:none;margin-top:28px;transition:background .15s;}
        .nk-cta:hover{color:#fff;background:var(--brand-hover);}
        .nk-second{display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;height:44px;margin-top:12px;padding:0 24px;border-radius:999px;background:var(--surface);border:1px solid var(--border);color:var(--ink);font-family:inherit;font-size:14px;font-weight:700;letter-spacing:-.2px;cursor:pointer;transition:background .15s;}
        .nk-second:hover{background:var(--alt);}
        .nk-note{margin:20px 0 0;font-size:13px;line-height:1.55;color:var(--muted);}
        @media(min-width:520px){.nk-cta,.nk-second{width:auto;min-width:230px;}}
        @keyframes nkPulse{0%{transform:scale(1);opacity:.9;}100%{transform:scale(1.55);opacity:0;}}
        @keyframes nkBeat{0%,100%{transform:scale(1);}8%{transform:scale(1.09);}16%{transform:scale(1);}24%{transform:scale(1.06);}32%{transform:scale(1);}}
      `}</style>

      <div className="nk-card">
        <div className="nk-emblem">
          <span className="nk-pulse" />
          <span className="nk-pulse" />
          <span className="nk-heart">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </span>
        </div>

        <span className="nk-kicker">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 7v5.5l3.5 2"/></svg>
          Snart klar
        </span>

        <h1 className="nk-name">{overskrift}</h1>
        <p className="nk-lead">{lead}</p>

        {harMeta && (
          <div className="nk-meta">
            {harBy && (
              <span className="nk-chip"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>{by}</span>
            )}
            {harCvr && (<span className="nk-chip">{cvrLabel}</span>)}
          </div>
        )}

        <div className="nk-steps">
          {trin.map((t, i) => (
            <div className="nk-step" key={"t" + i}>
              <span className="nk-tick" style={{ background: t.done ? "#ECFDF3" : "var(--brand-surface)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={t.done ? "#166534" : "var(--brand)"} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  {t.done ? <path d="M20 6 9 17l-5-5"/> : <circle cx="12" cy="12" r="7"/>}
                </svg>
              </span>
              <span style={t.done ? { color: "var(--body)" } : { color: "var(--ink)", fontWeight: 600 }}>{t.tekst}</span>
            </div>
          ))}
        </div>

        <Link className="nk-cta" to="/foreninger">Find andre foreninger</Link>
        <div>
          <button className="nk-second" onClick={kopierLink}>
            {kopieret ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#166534" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>Link kopieret</span>
            ) : (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>Gem linket til senere</>
            )}
          </button>
        </div>

        <p className="nk-note">Bidrag går altid direkte til foreningens egen MobilePay-konto.</p>
      </div>
    </div>
  );
}
