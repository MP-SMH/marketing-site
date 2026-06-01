/**
 * HowItWorksSection.jsx
 *
 * Pixel-spec per BRIEF section 7:
 *   - "Hvordan det virker"
 *   - Light section
 *   - 3 steps with editorial alternating layout
 */

import { useNavigate } from 'react-router-dom';
import { Users, Heart, CreditCard, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    icon: Users,
    title: 'Foreningen tilmelder sig',
    body: 'Foreningen opretter en profil, bliver verificeret med MitID + KYC, og vælger sine støttekanaler. Vi hjælper med Indsamlingsnævn-anmeldelse og dokumentation.',
    highlights: [
      'Verificering på 1-3 dage',
      'Hjælp til Indsamlingsnævnet',
      'Auto-genererede dokumenter',
    ],
  },
  {
    n: '02',
    icon: Heart,
    title: 'Støtter giver støtte',
    body: 'Støttere finder en forening eller hjertesag, vælger hvordan de vil støtte, og betaler sikkert via Mollie. 80% af donationer og fast støtte går direkte til foreningen.',
    highlights: [
      'Mollie-betaling (PCI DSS Level 1)',
      'Kvittering automatisk',
      'GDPR-compliant',
    ],
  },
  {
    n: '03',
    icon: CreditCard,
    title: 'Foreningen får afregning og dokumentation',
    body: 'Efter den relevante udbetalingsperiode afregnes støtten til foreningen sammen med dokumentation og regnskabsgrundlag.',
    highlights: [
      'Månedlig afregning',
      'Bilag til bogføring',
      'Eksport til regnskab',
    ],
  },
];

export default function HowItWorksSection() {
  const navigate = useNavigate();

  return (
    <section className="mkt-how">
      <div className="mkt-how-inner">
        <header className="mkt-how-head">
          <div className="mkt-how-eyebrow">Sådan virker det</div>
          <h2 className="mkt-how-title">Tre enkle skridt til opstart</h2>
          <p className="mkt-how-subtitle">
            Fra oprettelse til støtte og afregning, uden manuelt arbejde i mellem.
          </p>
        </header>

        <div className="mkt-how-steps">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const reverse = i % 2 === 1;
            return (
              <article
                key={i}
                className={`mkt-how-step ${reverse ? 'is-reverse' : ''}`}
              >
                <div className="mkt-how-step-text">
                  <div className="mkt-how-step-num">{s.n}</div>
                  <h3 className="mkt-how-step-title">{s.title}</h3>
                  <p className="mkt-how-step-body">{s.body}</p>
                  <ul className="mkt-how-step-list" role="list">
                    {s.highlights.map((h, hi) => (
                      <li key={hi}>
                        <span className="mkt-how-step-list-dot" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mkt-how-step-visual">
                  <div className="mkt-how-step-visual-icon">
                    <Icon size={48} color="#E0193F" aria-hidden="true" />
                  </div>
                  <div className="mkt-how-step-visual-glow" aria-hidden="true" />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mkt-how-cta">
          <button
            className="mkt-how-cta-btn"
            onClick={() => navigate('/saadan-virker-det')}
            type="button"
          >
            Se hele processen trin for trin
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <style>{`
        .mkt-how {
          background: #F9FAFB;
          padding: 80px 0;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .mkt-how-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .mkt-how-head {
          text-align: center;
          margin-bottom: 56px;
        }

        .mkt-how-eyebrow {
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

        .mkt-how-title {
          margin: 0 auto 16px;
          max-width: 760px;
          font-size: 30px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.030em;
          color: #0F172A;
        }

        .mkt-how-subtitle {
          margin: 0 auto;
          max-width: 560px;
          font-size: 16px;
          line-height: 1.55;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-how-steps {
          display: flex;
          flex-direction: column;
          gap: 48px;
          margin-bottom: 56px;
        }

        .mkt-how-step {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: center;
        }

        .mkt-how-step-num {
          display: inline-block;
          padding: 6px 12px;
          margin-bottom: 16px;
          border-radius: 8px;
          background: #FEF2F2;
          border: 1px solid rgba(224, 25, 63, 0.20);
          color: #E0193F;
          font-size: 12px;
          font-weight: 800;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.05em;
        }

        .mkt-how-step-title {
          margin: 0 0 14px;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.030em;
          color: #0F172A;
        }

        .mkt-how-step-body {
          margin: 0 0 20px;
          font-size: 15.5px;
          line-height: 1.6;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-how-step-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mkt-how-step-list li {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          font-weight: 500;
          color: #334155;
          letter-spacing: -0.005em;
        }

        .mkt-how-step-list-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #E0193F;
          flex-shrink: 0;
        }

        .mkt-how-step-visual {
          position: relative;
          aspect-ratio: 4 / 3;
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .mkt-how-step-visual-icon {
          position: relative;
          z-index: 2;
          width: 110px;
          height: 110px;
          border-radius: 26px;
          background: #FEF2F2;
          border: 1px solid rgba(224, 25, 63, 0.20);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(224, 25, 63, 0.16);
        }

        .mkt-how-step-visual-glow {
          position: absolute;
          inset: 20%;
          background: radial-gradient(circle, rgba(224, 25, 63, 0.10), transparent 70%);
          filter: blur(40px);
          z-index: 1;
        }

        .mkt-how-cta {
          text-align: center;
        }

        .mkt-how-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 56px;
          padding: 0 28px;
          background: #fff;
          color: #E0193F;
          border: 1.5px solid rgba(224, 25, 63, 0.30);
          border-radius: 16px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.005em;
          cursor: pointer;
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-how-cta-btn:hover {
          background: #FEF2F2;
          border-color: #E0193F;
          transform: translateY(-2px);
        }

        .mkt-how-cta-btn:active {
          transform: scale(0.99);
        }

        @media (min-width: 768px) {
          .mkt-how { padding: 112px 0; }
          .mkt-how-title { font-size: 40px; letter-spacing: -0.035em; }

          .mkt-how-step {
            grid-template-columns: 1fr 1fr;
            gap: 64px;
          }

          .mkt-how-step.is-reverse .mkt-how-step-text {
            order: 2;
          }

          .mkt-how-steps {
            gap: 80px;
          }

          .mkt-how-step-title { font-size: 30px; }
        }

        @media (min-width: 1024px) {
          .mkt-how { padding: 128px 0; }
          .mkt-how-title { font-size: 48px; }
          .mkt-how-step-title { font-size: 36px; }

          .mkt-how-step-visual-icon {
            width: 140px;
            height: 140px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-how-cta-btn {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
