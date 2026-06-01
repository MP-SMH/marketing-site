/**
 * IndtaegtskanalerSection.jsx
 *
 * Pixel-spec per BRIEF section 6:
 *   - 3 cards: Donationer (80%), Fast støtte (80%), Webshop (32,75%)
 *   - Light section
 *   - "Webshop skal IKKE beskrives som 80%" - explicit content rule
 */

import { useNavigate } from 'react-router-dom';
import { Heart, Repeat, ShoppingBag, ArrowRight } from 'lucide-react';

const CHANNELS = [
  {
    icon: Heart,
    iconColor: '#E0193F',
    iconBg: '#FEF2F2',
    iconBorder: 'rgba(224, 25, 63, 0.20)',
    title: 'Donationer',
    subtitle: 'Engangsstøtte',
    body: 'Modtag engangsdonationer fra medlemmer, familie og lokale støttere. Mollie-betaling, kvittering automatisk.',
    badge: '80% til foreningen',
    badgeColor: '#E0193F',
    badgeBg: '#FEF2F2',
    badgeBorder: 'rgba(224, 25, 63, 0.20)',
    cta: 'Læs om donationer',
    route: '/foreninger',
  },
  {
    icon: Repeat,
    iconColor: '#E0193F',
    iconBg: '#FEF2F2',
    iconBorder: 'rgba(224, 25, 63, 0.20)',
    title: 'Fast støtte',
    subtitle: 'Månedlig binding',
    body: 'Gør det nemt for støttere at bidrage fast hver måned. Ingen binding for støtter, kan stoppe når som helst.',
    badge: '80% til foreningen',
    badgeColor: '#E0193F',
    badgeBg: '#FEF2F2',
    badgeBorder: 'rgba(224, 25, 63, 0.20)',
    cta: 'Læs om fast støtte',
    route: '/fast-stoette',
  },
  {
    icon: ShoppingBag,
    iconColor: '#7C3AED',
    iconBg: '#F5F3FF',
    iconBorder: 'rgba(124, 58, 237, 0.20)',
    title: 'Webshop',
    subtitle: 'Print-on-demand',
    body: 'Foreningen kan få supporterprodukter uden lager og drift. Net profit afregnes pr. salg.',
    badge: '32,75% af net profit',
    badgeColor: '#7C3AED',
    badgeBg: '#F5F3FF',
    badgeBorder: 'rgba(124, 58, 237, 0.20)',
    cta: 'Læs om webshop',
    route: '/foreninger',
  },
];

export default function IndtaegtskanalerSection() {
  const navigate = useNavigate();

  return (
    <section className="mkt-chan">
      <div className="mkt-chan-inner">
        <header className="mkt-chan-head">
          <div className="mkt-chan-eyebrow">Tre indtægtskanaler</div>
          <h2 className="mkt-chan-title">
            Tre måder at modtage støtte på
          </h2>
          <p className="mkt-chan-subtitle">
            Kombinér dem som det passer foreningen. Alle samles i ét overblik.
          </p>
        </header>

        <div className="mkt-chan-grid">
          {CHANNELS.map((c, i) => {
            const Icon = c.icon;
            return (
              <article
                key={i}
                className="mkt-chan-card"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className="mkt-chan-card-icon"
                  style={{
                    background: c.iconBg,
                    borderColor: c.iconBorder,
                  }}
                >
                  <Icon size={22} color={c.iconColor} aria-hidden="true" />
                </div>

                <div className="mkt-chan-card-meta">
                  <h3 className="mkt-chan-card-title">{c.title}</h3>
                  <span className="mkt-chan-card-subtitle">{c.subtitle}</span>
                </div>

                <p className="mkt-chan-card-body">{c.body}</p>

                <div
                  className="mkt-chan-card-badge"
                  style={{
                    background: c.badgeBg,
                    borderColor: c.badgeBorder,
                    color: c.badgeColor,
                  }}
                >
                  {c.badge}
                </div>

                <button
                  className="mkt-chan-card-link"
                  onClick={() => navigate(c.route)}
                  type="button"
                >
                  {c.cta}
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .mkt-chan {
          background: #fff;
          padding: 80px 0;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .mkt-chan-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .mkt-chan-head {
          text-align: center;
          margin-bottom: 56px;
        }

        .mkt-chan-eyebrow {
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

        .mkt-chan-title {
          margin: 0 auto 16px;
          max-width: 760px;
          font-size: 30px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.030em;
          color: #0F172A;
        }

        .mkt-chan-subtitle {
          margin: 0 auto;
          max-width: 560px;
          font-size: 16px;
          line-height: 1.55;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-chan-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .mkt-chan-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 24px;
          padding: 32px;
          opacity: 0;
          animation: mkt-chan-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-chan-card:hover {
          transform: translateY(-4px);
          border-color: rgba(224, 25, 63, 0.25);
          box-shadow: 0 20px 56px rgba(15, 23, 42, 0.10), 0 4px 12px rgba(15, 23, 42, 0.04);
        }

        @keyframes mkt-chan-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mkt-chan-card-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
        }

        .mkt-chan-card-meta {
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .mkt-chan-card-title {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.030em;
          color: #0F172A;
        }

        .mkt-chan-card-subtitle {
          font-size: 13px;
          font-weight: 500;
          color: #94A3B8;
          letter-spacing: -0.005em;
        }

        .mkt-chan-card-body {
          margin: 0 0 20px;
          font-size: 14.5px;
          line-height: 1.6;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-chan-card-badge {
          display: inline-flex;
          align-self: flex-start;
          padding: 8px 14px;
          margin-bottom: 24px;
          border: 1px solid;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: -0.005em;
        }

        .mkt-chan-card-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: auto;
          padding: 10px 0;
          background: transparent;
          border: none;
          color: #E0193F;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.005em;
          cursor: pointer;
          align-self: flex-start;
          transition: gap 0.2s ease;
        }

        .mkt-chan-card-link:hover {
          gap: 10px;
        }

        @media (min-width: 768px) {
          .mkt-chan { padding: 112px 0; }
          .mkt-chan-title { font-size: 40px; letter-spacing: -0.035em; }
          .mkt-chan-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          .mkt-chan-card { padding: 36px; }
        }

        @media (min-width: 1024px) {
          .mkt-chan { padding: 128px 0; }
          .mkt-chan-title { font-size: 48px; }
          .mkt-chan-grid { gap: 24px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-chan-card,
          .mkt-chan-card-link {
            animation: none;
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
