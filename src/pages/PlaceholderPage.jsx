/**
 * PlaceholderPage.jsx
 *
 * Shared shell for all placeholder marketing pages.
 * Renderer TopNavigation + simple hero + MarketingFooter.
 * Bruges på 17 stub-sider så Mario kan se sitemap-omfang.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import TopNavigation from '../components/marketing/TopNavigation';
import MarketingFooter from '../components/marketing/MarketingFooter';

export default function PlaceholderPage({ pageId, title, description, route }) {
  const navigate = useNavigate();

  return (
    <div className="page-placeholder">
      <TopNavigation />
      <main>
        <section className="ph-hero">
          <div className="ph-hero-mesh" aria-hidden="true" />
          <div className="ph-hero-grid" aria-hidden="true" />

          <div className="ph-hero-inner">
            <div className="ph-hero-pill">
              <Construction size={13} aria-hidden="true" />
              <span>Placeholder &middot; bygges senere</span>
            </div>

            <div className="ph-hero-eyebrow">{pageId}</div>

            <h1 className="ph-hero-title">{title}</h1>

            <p className="ph-hero-route">
              <code>{route}</code>
            </p>

            {description && (
              <p className="ph-hero-desc">{description}</p>
            )}

            <button
              className="ph-hero-back"
              onClick={() => navigate('/')}
              type="button"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Tilbage til forsiden
            </button>
          </div>
        </section>
      </main>
      <MarketingFooter />

      <style>{`
        .page-placeholder {
          min-height: 100vh;
          background: #fff;
        }

        .ph-hero {
          position: relative;
          background: #0F172A;
          padding: 160px 0 120px;
          overflow: hidden;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          color: #fff;
        }

        .ph-hero-mesh {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 80% 20%, rgba(224,25,63,0.20), transparent 32%),
            radial-gradient(circle at 20% 80%, rgba(255,77,106,0.14), transparent 28%),
            #0F172A;
          pointer-events: none;
        }

        .ph-hero-grid {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image:
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .ph-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 720px;
          margin: 0 auto;
          padding: 0 20px;
          text-align: center;
        }

        .ph-hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          margin-bottom: 24px;
          background: rgba(245, 158, 11, 0.14);
          border: 1px solid rgba(245, 158, 11, 0.32);
          border-radius: 999px;
          color: #FCD34D;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: -0.005em;
        }

        .ph-hero-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.50);
          margin-bottom: 14px;
        }

        .ph-hero-title {
          margin: 0 0 16px;
          font-size: 36px;
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.040em;
          color: #fff;
        }

        .ph-hero-route {
          margin: 0 0 24px;
        }

        .ph-hero-route code {
          display: inline-block;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          font-family: 'ui-monospace', 'SF Mono', Menlo, monospace;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.82);
          letter-spacing: -0.005em;
        }

        .ph-hero-desc {
          margin: 0 auto 32px;
          max-width: 520px;
          font-size: 15.5px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.70);
          letter-spacing: -0.005em;
        }

        .ph-hero-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 10px;
          color: #fff;
          font-family: inherit;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: -0.005em;
          cursor: pointer;
          transition: background 200ms ease, border-color 200ms ease;
        }

        .ph-hero-back:hover {
          background: rgba(255, 255, 255, 0.10);
          border-color: rgba(255, 255, 255, 0.30);
        }

        @media (min-width: 768px) {
          .ph-hero {
            padding: 180px 0 140px;
          }

          .ph-hero-title {
            font-size: 48px;
            letter-spacing: -0.045em;
          }
        }

        @media (min-width: 1024px) {
          .ph-hero {
            padding: 200px 0 160px;
          }

          .ph-hero-title {
            font-size: 56px;
          }
        }
      `}</style>
    </div>
  );
}
