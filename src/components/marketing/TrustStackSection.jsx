/**
 * TrustStackSection.jsx
 *
 * Pixel-spec per BRIEF:
 *   - bg-slate-950 (#020617)
 *   - 4 pillars in glass cards
 *   - Cards: rounded-[24px] bg-white/[0.06] border-white/[0.10] backdrop-blur-xl
 *   - Icons: text-brand bg-white/[0.06] border-white/[0.10]
 */

import { Heart, ShieldCheck, Settings, MapPin } from 'lucide-react';

const PILLARS = [
  {
    icon: Heart,
    title: '80% går til foreningen',
    body: 'Ved donationer og fast støtte går 80% direkte til den valgte forening. Webshop-salg afregnes med 32,75% af net profit.',
  },
  {
    icon: ShieldCheck,
    title: 'Alle foreninger verificeres',
    body: 'Vi verificerer foreninger, ansvarlige personer og udbetalingsoplysninger inden støtte kan modtages.',
  },
  {
    icon: Settings,
    title: 'Automatisk bogføring og udbetaling',
    body: 'Donationer, fast støtte og webshop-indtægter samles i én kontrolleret model med fuld dokumentation.',
  },
  {
    icon: MapPin,
    title: 'Dansk platform. Dansk compliance.',
    body: 'Bygget til danske foreninger, betalingsflows og dokumentationskrav. Indsamlingsnævn-hjælp inkluderet.',
  },
];

export default function TrustStackSection() {
  return (
    <section className="mkt-trust">
      <div className="mkt-trust-mesh" aria-hidden="true" />

      <div className="mkt-trust-inner">
        <header className="mkt-trust-head">
          <div className="mkt-trust-eyebrow">Tillid</div>
          <h2 className="mkt-trust-title">
            Bygget til tillid fra første betaling
          </h2>
          <p className="mkt-trust-subtitle">
            Verificering, dokumentation og udbetaling er ikke noget I selv skal stå alene med.
          </p>
        </header>

        <div className="mkt-trust-grid">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <article
                key={i}
                className="mkt-trust-card"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mkt-trust-card-icon">
                  <Icon size={20} color="#FCA5B5" aria-hidden="true" />
                </div>
                <h3 className="mkt-trust-card-title">{p.title}</h3>
                <p className="mkt-trust-card-body">{p.body}</p>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .mkt-trust {
          position: relative;
          background: #020617;
          padding: 80px 0;
          overflow: hidden;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .mkt-trust-mesh {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 70% 20%, rgba(224, 25, 63, 0.10), transparent 50%),
            radial-gradient(circle at 30% 80%, rgba(255, 77, 106, 0.06), transparent 50%);
          pointer-events: none;
        }

        .mkt-trust-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .mkt-trust-head {
          text-align: center;
          margin-bottom: 56px;
        }

        .mkt-trust-eyebrow {
          display: inline-block;
          padding: 6px 14px;
          margin-bottom: 16px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          color: rgba(255, 255, 255, 0.85);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .mkt-trust-title {
          margin: 0 auto 16px;
          max-width: 760px;
          font-size: 30px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.030em;
          color: #fff;
        }

        .mkt-trust-subtitle {
          margin: 0 auto;
          max-width: 560px;
          font-size: 16px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.70);
          letter-spacing: -0.005em;
        }

        .mkt-trust-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        /* Glass cards per brief: rounded-[24px] */
        .mkt-trust-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 28px;
          opacity: 0;
          animation: mkt-trust-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms;
        }

        .mkt-trust-card:hover {
          transform: translateY(-4px);
          border-color: rgba(224, 25, 63, 0.30);
        }

        @keyframes mkt-trust-in {
          from { opacity: 0; transform: translateY(16px); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        /* Icon container per brief */
        .mkt-trust-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }

        .mkt-trust-card-title {
          margin: 0 0 10px;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.020em;
          color: #fff;
        }

        .mkt-trust-card-body {
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.72);
          letter-spacing: -0.005em;
        }

        @media (min-width: 768px) {
          .mkt-trust { padding: 112px 0; }
          .mkt-trust-title { font-size: 40px; letter-spacing: -0.035em; }
          .mkt-trust-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .mkt-trust-card { padding: 32px; }
        }

        @media (min-width: 1024px) {
          .mkt-trust { padding: 128px 0; }
          .mkt-trust-title { font-size: 48px; }
          .mkt-trust-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-trust-card {
            animation: none;
            opacity: 1;
            transform: none;
            filter: none;
          }
        }
      `}</style>
    </section>
  );
}
