/**
 * PricingSection.jsx
 *
 * Pixel-spec per BRIEF section 8 + economic transparency rules:
 *   - Light section
 *   - Donations 80%, Fast støtte 80%, Webshop 32,75%
 *   - 1 dark "featured" card (kombi alle tre kanaler)
 *   - 1 light "open" card (compliance fordele)
 *   - Container max-w 1280
 */

import { useNavigate } from 'react-router-dom';
import { Heart, ShieldCheck, Check, ArrowRight } from 'lucide-react';

export default function PricingSection() {
  const navigate = useNavigate();

  return (
    <section className="mkt-price">
      <div className="mkt-price-inner">
        <header className="mkt-price-head">
          <div className="mkt-price-eyebrow">Priser</div>
          <h2 className="mkt-price-title">
            Klar fordeling. Ingen skjulte gebyrer.
          </h2>
          <p className="mkt-price-subtitle">
            Vi tjener kun penge når foreningen modtager støtte.
            Resten dækker betaling, drift, support og platformen.
          </p>
        </header>

        <div className="mkt-price-grid">
          {/* Featured card — dark */}
          <article className="mkt-price-card mkt-price-card-featured">
            <div className="mkt-price-card-mesh" aria-hidden="true" />
            <div className="mkt-price-card-content">
              <div className="mkt-price-card-pill">
                <Heart size={12} fill="#FF4D6A" color="#FF4D6A" aria-hidden="true" />
                <span>Foreningens andel</span>
              </div>

              <div className="mkt-price-card-rows">
                <div className="mkt-price-card-row">
                  <div className="mkt-price-card-row-label">
                    <span className="mkt-price-card-row-name">Donationer</span>
                    <span className="mkt-price-card-row-sub">Mollie engangsbetaling</span>
                  </div>
                  <div className="mkt-price-card-row-val">80%</div>
                </div>
                <div className="mkt-price-card-row">
                  <div className="mkt-price-card-row-label">
                    <span className="mkt-price-card-row-name">Fast støtte</span>
                    <span className="mkt-price-card-row-sub">Frisbii månedlig binding</span>
                  </div>
                  <div className="mkt-price-card-row-val">80%</div>
                </div>
                <div className="mkt-price-card-row">
                  <div className="mkt-price-card-row-label">
                    <span className="mkt-price-card-row-name">Webshop</span>
                    <span className="mkt-price-card-row-sub">Print-on-demand net profit</span>
                  </div>
                  <div className="mkt-price-card-row-val mkt-price-card-row-val-purple">32,75%</div>
                </div>
              </div>

              <div className="mkt-price-card-divider" />

              <ul className="mkt-price-card-list" role="list">
                <li>
                  <Check size={14} color="#FF4D6A" aria-hidden="true" />
                  <span>Gratis at oprette, ingen binding</span>
                </li>
                <li>
                  <Check size={14} color="#FF4D6A" aria-hidden="true" />
                  <span>Ingen månedlige gebyrer</span>
                </li>
                <li>
                  <Check size={14} color="#FF4D6A" aria-hidden="true" />
                  <span>Verificering, KYC og MitID inkluderet</span>
                </li>
                <li>
                  <Check size={14} color="#FF4D6A" aria-hidden="true" />
                  <span>Auto-bogføring og afregningsbilag</span>
                </li>
                <li>
                  <Check size={14} color="#FF4D6A" aria-hidden="true" />
                  <span>Hjælp til Indsamlingsnævnet</span>
                </li>
              </ul>

              <button
                className="mkt-price-card-cta"
                onClick={() => navigate('/opret-forening')}
                type="button"
              >
                Start gratis som forening
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* Open card — light */}
          <article className="mkt-price-card mkt-price-card-open">
            <div className="mkt-price-card-pill mkt-price-card-pill-light">
              <ShieldCheck size={12} color="#0891B2" aria-hidden="true" />
              <span>Hvad er inkluderet</span>
            </div>

            <h3 className="mkt-price-card-h3">
              Alt I behøver, samlet ét sted.
            </h3>

            <p className="mkt-price-card-body">
              Verificering, betaling, bogføring, afregning og dokumentation. I sætter foreningen i gang. Vi håndterer maskinrummet.
            </p>

            <ul className="mkt-price-card-list mkt-price-card-list-light" role="list">
              <li>
                <div className="mkt-price-card-list-icon">
                  <Check size={12} color="#16A34A" aria-hidden="true" />
                </div>
                <div>
                  <strong>3 indtægtskanaler</strong>
                  <span>Donationer, fast støtte og webshop</span>
                </div>
              </li>
              <li>
                <div className="mkt-price-card-list-icon">
                  <Check size={12} color="#16A34A" aria-hidden="true" />
                </div>
                <div>
                  <strong>Indsamlingsnævn-anmeldelse</strong>
                  <span>Tekstudkast, frister og regnskab</span>
                </div>
              </li>
              <li>
                <div className="mkt-price-card-list-icon">
                  <Check size={12} color="#16A34A" aria-hidden="true" />
                </div>
                <div>
                  <strong>GDPR + PCI DSS Level 1</strong>
                  <span>Compliance bygget ind fra start</span>
                </div>
              </li>
              <li>
                <div className="mkt-price-card-list-icon">
                  <Check size={12} color="#16A34A" aria-hidden="true" />
                </div>
                <div>
                  <strong>Månedlig afregning</strong>
                  <span>Med bilag til foreningens revisor</span>
                </div>
              </li>
            </ul>

            <button
              className="mkt-price-card-cta-light"
              onClick={() => navigate('/priser')}
              type="button"
            >
              Se hele prisstrukturen
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </article>
        </div>
      </div>

      <style>{`
        .mkt-price {
          background: #fff;
          padding: 80px 0;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .mkt-price-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .mkt-price-head {
          text-align: center;
          margin-bottom: 56px;
        }

        .mkt-price-eyebrow {
          display: inline-block;
          padding: 6px 14px;
          margin-bottom: 16px;
          border-radius: 999px;
          background: #FEF2F2;
          border: 1px solid rgba(224, 25, 63, 0.20);
          color: #E0193F;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .mkt-price-title {
          margin: 0 auto 16px;
          max-width: 760px;
          font-size: 30px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.030em;
          color: #0F172A;
        }

        .mkt-price-subtitle {
          margin: 0 auto;
          max-width: 580px;
          font-size: 16px;
          line-height: 1.55;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-price-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .mkt-price-card {
          position: relative;
          padding: 36px;
          border-radius: 28px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Featured (dark) card */
        .mkt-price-card-featured {
          background: #0F172A;
          color: #fff;
          box-shadow: 0 20px 60px rgba(15, 23, 42, 0.20), 0 4px 16px rgba(15, 23, 42, 0.10);
        }

        .mkt-price-card-mesh {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 80% 0%, rgba(224, 25, 63, 0.30), transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(255, 77, 106, 0.16), transparent 50%);
          pointer-events: none;
        }

        .mkt-price-card-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .mkt-price-card-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          align-self: flex-start;
          padding: 6px 12px;
          margin-bottom: 24px;
          border-radius: 999px;
          background: rgba(224, 25, 63, 0.16);
          border: 1px solid rgba(224, 25, 63, 0.32);
          color: #FCA5B5;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .mkt-price-card-pill-light {
          background: rgba(8, 145, 178, 0.10);
          border-color: rgba(8, 145, 178, 0.20);
          color: #0891B2;
        }

        .mkt-price-card-rows {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 24px;
        }

        .mkt-price-card-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 20px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
        }

        .mkt-price-card-row-label {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .mkt-price-card-row-name {
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.015em;
        }

        .mkt-price-card-row-sub {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: -0.005em;
        }

        .mkt-price-card-row-val {
          font-size: 28px;
          font-weight: 700;
          color: #FCA5B5;
          letter-spacing: -0.030em;
          font-variant-numeric: tabular-nums;
          line-height: 1;
        }

        .mkt-price-card-row-val-purple {
          color: #C4B5FD;
        }

        .mkt-price-card-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.10);
          margin-bottom: 24px;
        }

        .mkt-price-card-list {
          list-style: none;
          margin: 0 0 28px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mkt-price-card-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: -0.005em;
        }

        .mkt-price-card-list li svg {
          flex-shrink: 0;
          margin-top: 3px;
        }

        .mkt-price-card-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 56px;
          padding: 0 28px;
          margin-top: auto;
          background: #E0193F;
          color: #fff;
          border: none;
          border-radius: 16px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.005em;
          cursor: pointer;
          box-shadow: 0 16px 40px rgba(224, 25, 63, 0.28);
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-price-card-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 52px rgba(224, 25, 63, 0.34);
        }

        .mkt-price-card-cta:active {
          transform: scale(0.99);
        }

        /* Open (light) card */
        .mkt-price-card-open {
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
        }

        .mkt-price-card-h3 {
          margin: 0 0 14px;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.030em;
          color: #0F172A;
        }

        .mkt-price-card-body {
          margin: 0 0 28px;
          font-size: 15px;
          line-height: 1.55;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-price-card-list-light {
          margin-bottom: 28px;
        }

        .mkt-price-card-list-light li {
          color: #334155;
          align-items: flex-start;
          font-size: 14px;
        }

        .mkt-price-card-list-light strong {
          display: block;
          font-size: 14.5px;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.015em;
          margin-bottom: 2px;
        }

        .mkt-price-card-list-light span {
          font-size: 13px;
          color: #64748B;
          letter-spacing: -0.005em;
        }

        .mkt-price-card-list-light .mkt-price-card-list-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(22, 163, 74, 0.10);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .mkt-price-card-cta-light {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          align-self: flex-start;
          margin-top: auto;
          background: transparent;
          border: none;
          color: #E0193F;
          font-family: inherit;
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: -0.005em;
          cursor: pointer;
          padding: 12px 0;
          transition: gap 0.2s ease;
        }

        .mkt-price-card-cta-light:hover {
          gap: 10px;
        }

        @media (min-width: 768px) {
          .mkt-price { padding: 112px 0; }
          .mkt-price-title { font-size: 40px; letter-spacing: -0.035em; }
          .mkt-price-card { padding: 44px; }
          .mkt-price-card-h3 { font-size: 28px; }
          .mkt-price-card-row-val { font-size: 32px; }
        }

        @media (min-width: 1024px) {
          .mkt-price { padding: 128px 0; }
          .mkt-price-title { font-size: 48px; }

          .mkt-price-grid {
            grid-template-columns: 1.2fr 1fr;
            gap: 24px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-price-card-cta,
          .mkt-price-card-cta-light {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
