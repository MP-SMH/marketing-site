/**
 * PengestroemmenSection.jsx
 *
 * Component: Marketing-site Home page section 3 — money flow
 * Version:   v5 (BRIEF-compliant)
 *
 * Pixel-spec:
 *   - 4 horizontal glass cards (NOT vertical timeline)
 *   - Animated red flow-line connecting cards (brand red gradient)
 *   - Small dots animate along flow path
 *   - Glass cards: rounded-[24px] bg-white/[0.06] border-white/[0.10] backdrop-blur-xl
 *   - Badge "80% til foreningen" på donations/fast støtte cards
 *   - Badge "32,75% af net profit" på webshop card
 *   - Dark navy background per brief
 *   - Section padding 96-128px desktop
 */

import { Heart, CreditCard, ShieldCheck, Banknote } from 'lucide-react';

const STEPS = [
  {
    icon: Heart,
    label: 'Trin 1',
    title: 'Støtteren vælger en forening',
    body: 'Donation, fast støtte eller webshop-køb til en verificeret dansk forening.',
    badges: [
      { text: '80% til foreningen', tone: 'red' },
      { text: '32,75% af net profit', tone: 'webshop' },
    ],
  },
  {
    icon: CreditCard,
    label: 'Trin 2',
    title: 'Betalingen registreres',
    body: 'Alle bidrag bliver knyttet til den valgte forening med fuld dokumentation.',
    badges: [],
  },
  {
    icon: ShieldCheck,
    label: 'Trin 3',
    title: 'SMH håndterer administrationen',
    body: 'Verificering, bogføring og dokumentation samles ét sted automatisk.',
    badges: [],
  },
  {
    icon: Banknote,
    label: 'Trin 4',
    title: 'Foreningen får udbetaling',
    body: 'Foreningen kan følge støtte og kommende udbetalinger i deres dashboard.',
    badges: [{ text: 'Klar til udbetaling', tone: 'success' }],
  },
];

export default function PengestroemmenSection() {
  return (
    <section className="mkt-flow">
      <div className="mkt-flow-mesh" aria-hidden="true" />

      <div className="mkt-flow-inner">
        <header className="mkt-flow-head">
          <div className="mkt-flow-eyebrow">Pengestrømmen</div>
          <h2 className="mkt-flow-title">
            Fra støtte til udbetaling, uden manuelt kaos
          </h2>
          <p className="mkt-flow-subtitle">
            StøtMedHjerte samler betalinger, dokumentation og udbetaling i ét kontrolleret flow.
          </p>
        </header>

        <div className="mkt-flow-grid">
          {/* Animated flow line — desktop only */}
          <svg
            className="mkt-flow-line-svg"
            viewBox="0 0 1200 4"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#E0193F" stopOpacity="0" />
                <stop offset="20%" stopColor="#E0193F" stopOpacity="0.6" />
                <stop offset="80%" stopColor="#FF4D6A" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#FF4D6A" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="2" x2="1200" y2="2" stroke="url(#flowGrad)" strokeWidth="2" />
          </svg>

          {/* Animated dots */}
          <div className="mkt-flow-dot mkt-flow-dot-1" aria-hidden="true" />
          <div className="mkt-flow-dot mkt-flow-dot-2" aria-hidden="true" />

          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={i}
                className="mkt-flow-card"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mkt-flow-card-bubble">
                  <Icon size={20} color="#E0193F" aria-hidden="true" />
                </div>
                <div className="mkt-flow-card-label">{s.label}</div>
                <h3 className="mkt-flow-card-title">{s.title}</h3>
                <p className="mkt-flow-card-body">{s.body}</p>
                {s.badges.length > 0 && (
                  <div className="mkt-flow-card-badges">
                    {s.badges.map((b, bi) => (
                      <span
                        key={bi}
                        className={`mkt-flow-card-badge mkt-flow-card-badge-${b.tone}`}
                      >
                        {b.text}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .mkt-flow {
          position: relative;
          background: #0F172A;
          padding: 80px 0;
          overflow: hidden;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .mkt-flow-mesh {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 30%, rgba(224, 25, 63, 0.18), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(255, 77, 106, 0.10), transparent 40%);
          pointer-events: none;
        }

        .mkt-flow-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .mkt-flow-head {
          text-align: center;
          margin-bottom: 56px;
        }

        .mkt-flow-eyebrow {
          display: inline-block;
          padding: 6px 14px;
          margin-bottom: 16px;
          border-radius: 999px;
          background: rgba(224, 25, 63, 0.16);
          border: 1px solid rgba(224, 25, 63, 0.30);
          color: #FCA5B5;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .mkt-flow-title {
          margin: 0 auto 16px;
          max-width: 760px;
          font-size: 30px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.030em;
          color: #fff;
        }

        .mkt-flow-subtitle {
          margin: 0 auto;
          max-width: 560px;
          font-size: 16px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.78);
          letter-spacing: -0.005em;
        }

        .mkt-flow-grid {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        /* Flow line — desktop only, horizontal connecting cards */
        .mkt-flow-line-svg {
          display: none;
        }

        .mkt-flow-dot {
          display: none;
        }

        @keyframes mkt-flow-dot-travel {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        /* Glass cards per brief: rounded-[24px] bg-white/[0.06] border-white/[0.10] backdrop-blur-xl */
        .mkt-flow-card {
          position: relative;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 28px;
          opacity: 0;
          animation: mkt-flow-card-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms;
          z-index: 1;
        }

        .mkt-flow-card:hover {
          transform: translateY(-4px);
          border-color: rgba(224, 25, 63, 0.30);
        }

        @keyframes mkt-flow-card-in {
          from { opacity: 0; transform: translateY(16px); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .mkt-flow-card-bubble {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(224, 25, 63, 0.14);
          border: 1px solid rgba(224, 25, 63, 0.32);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          box-shadow: 0 4px 16px rgba(224, 25, 63, 0.20);
        }

        .mkt-flow-card-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: #FCA5B5;
          margin-bottom: 10px;
        }

        .mkt-flow-card-title {
          margin: 0 0 10px;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.020em;
          color: #fff;
        }

        .mkt-flow-card-body {
          margin: 0 0 16px;
          font-size: 14px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.78);
          letter-spacing: -0.005em;
        }

        .mkt-flow-card-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .mkt-flow-card-badge {
          display: inline-flex;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: -0.005em;
        }

        .mkt-flow-card-badge-red {
          background: rgba(224, 25, 63, 0.16);
          border: 1px solid rgba(224, 25, 63, 0.32);
          color: #FCA5B5;
        }

        .mkt-flow-card-badge-webshop {
          background: rgba(124, 58, 237, 0.16);
          border: 1px solid rgba(124, 58, 237, 0.32);
          color: #C4B5FD;
        }

        .mkt-flow-card-badge-success {
          background: rgba(34, 197, 94, 0.14);
          border: 1px solid rgba(34, 197, 94, 0.30);
          color: #86EFAC;
        }

        @media (min-width: 768px) {
          .mkt-flow {
            padding: 112px 0;
          }

          .mkt-flow-title {
            font-size: 40px;
            letter-spacing: -0.035em;
          }

          .mkt-flow-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .mkt-flow-card {
            padding: 32px;
          }
        }

        @media (min-width: 1024px) {
          .mkt-flow {
            padding: 128px 0;
          }

          .mkt-flow-title {
            font-size: 48px;
          }

          .mkt-flow-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }

          /* Show flow line on desktop */
          .mkt-flow-line-svg {
            display: block;
            position: absolute;
            top: 50px;
            left: 12.5%;
            right: 12.5%;
            width: 75%;
            height: 4px;
            z-index: 0;
            opacity: 0.7;
          }

          .mkt-flow-dot {
            display: block;
            position: absolute;
            top: 48px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #FF4D6A;
            box-shadow: 0 0 12px rgba(255, 77, 106, 0.8);
            z-index: 2;
          }

          .mkt-flow-dot-1 {
            animation: mkt-flow-dot-travel 6s linear infinite;
          }

          .mkt-flow-dot-2 {
            animation: mkt-flow-dot-travel 6s linear infinite;
            animation-delay: 3s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-flow-card,
          .mkt-flow-dot {
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
