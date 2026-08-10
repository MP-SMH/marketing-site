// ============================================================
// src/components/marketing/FilterBar.jsx
// EEN delt filterbar til baade hjertesagsoversigten og
// fast stoette-oversigten. Forskellen mellem siderne er kun
// hvilke props der sendes ind, ikke to komponenter der ligner.
//
// Farver (hex, baggrund, fontstoerrelse), maalt:
//   inputtekst/valg #080E1A paa #FFFFFF, 16px            over 15:1
//   placeholder #6B7280 paa #FFFFFF, 16px                4,83:1
//   lup + chevron #55606F paa #FFFFFF (ikon/grafik)      over 3:1
// Ingen MobilePay-blaa, jf. K6.
// ============================================================

import "./FilterBar.css";

export default function FilterBar({ q, onQ, searchPlaceholder = "Søg", selects = [] }) {
  return (
    <div className="filterbar">
      <div className="filterbar-inner">
        <div className="filterbar-search">
          <span className="filterbar-lup" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></svg>
          </span>
          <input
            type="text"
            className="filterbar-input"
            value={q}
            onChange={(e) => onQ(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            autoComplete="off"
          />
          {q && (
            <button type="button" className="filterbar-clear" aria-label="Ryd søgning" onClick={() => onQ("")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          )}
        </div>

        {selects.map((s, i) => (
          <div className="filterbar-selectwrap" key={i}>
            <select className="filterbar-select" value={s.value} onChange={(e) => s.onChange(e.target.value)} aria-label={s.ariaLabel}>
              {s.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <span className="filterbar-chevron" aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
