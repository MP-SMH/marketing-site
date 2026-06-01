/**
 * MoedMarioSection.jsx (v9)
 *
 * Per Mario feedback: "Hillerød" fjernet fra både body og meta.
 *
 * Body changed:
 *   "...startet af Mario Paunovic fra Hillerød. Han har..."
 *   → "...startet af Mario Paunovic. Han har..."
 *
 * Meta changed:
 *   "Hillerød, Danmark" → "Danmark"
 */

import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

export default function MoedMarioSection() {
  const navigate = useNavigate();

  return (
    <section className="mkt-mario">
      <div className="mkt-mario-inner">
        <div className="mkt-mario-card">
          <div className="mkt-mario-glow" aria-hidden="true" />

          <div className="mkt-mario-content">
            <div className="mkt-mario-eyebrow">Bag platformen</div>
            <h2 className="mkt-mario-title">
              Mød personen bag StøtMedHjerte
            </h2>

            <div className="mkt-mario-body">
              <p>
                StøtMedHjerte er startet af Mario Paunovic.
                Han har arbejdet med salg, forretningsudvikling, e-commerce, logistik og automatisering,
                og bygger platformen, fordi fundraising for danske foreninger ofte er for tungt,
                for manuelt og for uigennemsigtigt.
              </p>
              <p>
                Målet er ikke at bygge den største platform hurtigst muligt.
                Målet er at bygge den rigtigt fra starten.
              </p>
            </div>

            <div className="mkt-mario-meta">
              <div className="mkt-mario-meta-item">
                <MapPin size={14} aria-hidden="true" />
                <span>Danmark</span>
              </div>
              <div className="mkt-mario-meta-divider" />
              <div className="mkt-mario-meta-item">
                <span>Heartland Collective ApS &middot; CVR 36909722</span>
              </div>
            </div>

            <button
              className="mkt-mario-cta"
              onClick={() => navigate('/om-os')}
              type="button"
            >
              Læs hele historien
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>

          <div className="mkt-mario-portrait">
            <div className="mkt-mario-portrait-frame">
              <div className="mkt-mario-portrait-initials">MP</div>
              <div className="mkt-mario-portrait-ring" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mkt-mario {
          background: #F9FAFB;
          padding: 96px 0;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .mkt-mario-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .mkt-mario-card {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 28px;
          padding: 40px 32px;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(15, 23, 42, 0.06), 0 2px 8px rgba(15, 23, 42, 0.04);
        }

        .mkt-mario-glow {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, rgba(224, 25, 63, 0.10), transparent 70%);
          filter: blur(40px);
          pointer-events: none;
        }

        .mkt-mario-content {
          position: relative;
          z-index: 1;
        }

        .mkt-mario-eyebrow {
          display: inline-block;
          padding: 6px 14px;
          margin-bottom: 18px;
          border-radius: 999px;
          background: #FEF2F2;
          border: 1px solid rgba(224, 25, 63, 0.20);
          color: #E0193F;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .mkt-mario-title {
          margin: 0 0 24px;
          font-size: 28px;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.030em;
          color: #0F172A;
        }

        .mkt-mario-body {
          margin: 0 0 28px;
        }

        .mkt-mario-body p {
          margin: 0 0 16px;
          font-size: 15px;
          line-height: 1.65;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-mario-body p:last-child { margin-bottom: 0; }

        .mkt-mario-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          padding: 14px 16px;
          background: #F8FAFC;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
        }

        .mkt-mario-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          color: #64748B;
          letter-spacing: -0.005em;
        }

        .mkt-mario-meta-divider {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #CBD5E1;
        }

        .mkt-mario-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 52px;
          padding: 0 24px;
          background: #E0193F;
          color: #fff;
          border: none;
          border-radius: 14px;
          font-family: inherit;
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: -0.005em;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(224, 25, 63, 0.25);
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-mario-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(224, 25, 63, 0.32);
        }

        .mkt-mario-cta:active { transform: scale(0.99); }

        .mkt-mario-portrait {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mkt-mario-portrait-frame {
          position: relative;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FEF2F2 0%, #FECDD3 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #fff;
          box-shadow:
            0 16px 48px rgba(224, 25, 63, 0.20),
            inset 0 0 0 1px rgba(224, 25, 63, 0.10);
        }

        .mkt-mario-portrait-initials {
          font-family: 'Elza Round Variable', 'Elza Round', system-ui, sans-serif;
          font-size: 80px;
          font-weight: 500;
          letter-spacing: -0.08em;
          color: #E0193F;
        }

        .mkt-mario-portrait-ring {
          position: absolute;
          inset: -16px;
          border: 1px dashed rgba(224, 25, 63, 0.30);
          border-radius: 50%;
          animation: mkt-mario-rotate 80s linear infinite;
        }

        @keyframes mkt-mario-rotate {
          from { transform: rotate(0); }
          to { transform: rotate(360deg); }
        }

        @media (min-width: 768px) {
          .mkt-mario { padding: 112px 0; }
          .mkt-mario-card {
            grid-template-columns: 1fr 280px;
            gap: 48px;
            padding: 56px;
          }
          .mkt-mario-title { font-size: 36px; letter-spacing: -0.035em; }
        }

        @media (min-width: 1024px) {
          .mkt-mario { padding: 128px 0; }
          .mkt-mario-card {
            grid-template-columns: 1fr 320px;
            gap: 64px;
            padding: 72px;
          }
          .mkt-mario-title { font-size: 42px; }
          .mkt-mario-portrait-frame { width: 260px; height: 260px; }
          .mkt-mario-portrait-initials { font-size: 96px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-mario-portrait-ring,
          .mkt-mario-cta {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
