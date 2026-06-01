/**
 * SaadanVirkerDetSection.jsx (v7)
 *
 * Per wireframe-home v1.1 sektion 3: Sådan virker det (3 trin)
 *
 * v7 changes:
 *   - SCROLL-TRIGGERED reveals (IntersectionObserver) - cards animate når sektion kommer i viewport
 *   - Stagger animation pr step (0ms / 120ms / 240ms)
 *   - Hover: rotate icon, glow effect, color shift på nummer
 *   - Standardiseret padding (96 / 112 / 128)
 *   - Premium Pulse polish
 */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, CreditCard, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    icon: Users,
    title: 'Foreningen tilmelder sig',
    body: 'Foreningen opretter en profil, bliver verificeret og vælger sine støttekanaler. Vi hjælper med Indsamlingsnævn-anmeldelse og dokumentation.',
  },
  {
    n: '02',
    icon: Heart,
    title: 'Støtter giver støtte',
    body: 'Støttere finder en forening eller hjertesag, vælger hvordan de vil støtte, og betaler sikkert. 80% af donationer og fast støtte går til foreningen.',
  },
  {
    n: '03',
    icon: CreditCard,
    title: 'Foreningen får afregning og dokumentation',
    body: 'Efter den relevante udbetalingsperiode afregnes støtten til foreningen sammen med dokumentation og regnskabsgrundlag.',
  },
];

export default function SaadanVirkerDetSection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`mkt-svd ${isVisible ? 'is-visible' : ''}`}>
      <div className="mkt-svd-inner">
        <header className="mkt-svd-head">
          <div className="mkt-svd-eyebrow">Sådan virker det</div>
          <h2 className="mkt-svd-title">Sådan fungerer det</h2>
          <p className="mkt-svd-subtitle">
            Tre enkle skridt - fra oprettelse til støtte og afregning.
          </p>
        </header>

        <div className="mkt-svd-grid">
          <div className="mkt-svd-line" aria-hidden="true" />

          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={i}
                className="mkt-svd-step"
                style={{ '--reveal-delay': `${i * 120}ms` }}
              >
                <div className="mkt-svd-step-num-row">
                  <div className="mkt-svd-step-num">{s.n}</div>
                  <div className="mkt-svd-step-icon">
                    <Icon size={20} color="#E0193F" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mkt-svd-step-title">{s.title}</h3>
                <p className="mkt-svd-step-body">{s.body}</p>
                <div className="mkt-svd-step-glow" aria-hidden="true" />
              </article>
            );
          })}
        </div>

        <div className="mkt-svd-cta">
          <button
            className="mkt-svd-cta-btn"
            onClick={() => navigate('/saadan-virker-det')}
            type="button"
          >
            <span>Se hele processen trin for trin</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <style>{`
        .mkt-svd {
          background: #F9FAFB;
          padding: 96px 0;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .mkt-svd-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .mkt-svd-head {
          text-align: center;
          margin-bottom: 64px;
        }

        .mkt-svd-eyebrow {
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

        .mkt-svd-title {
          margin: 0 auto 16px;
          max-width: 760px;
          font-size: 30px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.030em;
          color: #0F172A;
        }

        .mkt-svd-subtitle {
          margin: 0 auto;
          max-width: 580px;
          font-size: 16px;
          line-height: 1.55;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-svd-grid {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 56px;
        }

        .mkt-svd-line {
          display: none;
        }

        .mkt-svd-step {
          position: relative;
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 24px;
          padding: 32px;
          opacity: 0;
          transform: translateY(40px) scale(0.96);
          transition:
            opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay, 0ms),
            transform 700ms cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay, 0ms),
            border-color 300ms cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
        }

        .mkt-svd.is-visible .mkt-svd-step {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .mkt-svd-step:hover {
          transform: translateY(-6px) scale(1);
          border-color: rgba(224, 25, 63, 0.30);
          box-shadow:
            0 24px 60px rgba(15, 23, 42, 0.08),
            0 4px 12px rgba(224, 25, 63, 0.08);
        }

        .mkt-svd-step:hover .mkt-svd-step-glow {
          opacity: 1;
        }

        .mkt-svd-step-glow {
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(224, 25, 63, 0.12), transparent 70%);
          filter: blur(40px);
          opacity: 0;
          transition: opacity 400ms ease;
          pointer-events: none;
        }

        .mkt-svd-step-num-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
          position: relative;
          z-index: 1;
        }

        .mkt-svd-step-num {
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: rgba(224, 25, 63, 0.20);
          font-variant-numeric: tabular-nums;
          line-height: 1;
          transition: color 300ms ease;
        }

        .mkt-svd-step:hover .mkt-svd-step-num {
          color: rgba(224, 25, 63, 0.50);
        }

        .mkt-svd-step-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: #FEF2F2;
          border: 1px solid rgba(224, 25, 63, 0.20);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), background 300ms ease;
        }

        .mkt-svd-step:hover .mkt-svd-step-icon {
          transform: rotate(-6deg) scale(1.06);
          background: #FECDD3;
        }

        .mkt-svd-step-title {
          margin: 0 0 12px;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.025em;
          color: #0F172A;
          position: relative;
          z-index: 1;
        }

        .mkt-svd-step-body {
          margin: 0;
          font-size: 14.5px;
          line-height: 1.6;
          color: #475569;
          letter-spacing: -0.005em;
          position: relative;
          z-index: 1;
        }

        .mkt-svd-cta {
          text-align: center;
        }

        .mkt-svd-cta-btn {
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

        .mkt-svd-cta-btn:hover {
          background: #FEF2F2;
          border-color: #E0193F;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(224, 25, 63, 0.12);
          gap: 12px;
        }

        .mkt-svd-cta-btn:active {
          transform: scale(0.99);
        }

        @media (min-width: 768px) {
          .mkt-svd { padding: 112px 0; }
          .mkt-svd-title { font-size: 40px; letter-spacing: -0.035em; }
          .mkt-svd-grid { grid-template-columns: repeat(3, 1fr); }
          .mkt-svd-step-title { font-size: 22px; }
          .mkt-svd-step-num { font-size: 44px; }
        }

        @media (min-width: 1024px) {
          .mkt-svd { padding: 128px 0; }
          .mkt-svd-title { font-size: 48px; }

          .mkt-svd-line {
            display: block;
            position: absolute;
            top: 64px;
            left: 16.66%;
            right: 16.66%;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(224, 25, 63, 0.30), rgba(224, 25, 63, 0.30), transparent);
            z-index: 0;
            opacity: 0;
            transform: scaleX(0);
            transform-origin: center;
            transition: opacity 1000ms ease 600ms, transform 1200ms cubic-bezier(0.16, 1, 0.3, 1) 600ms;
          }

          .mkt-svd.is-visible .mkt-svd-line {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-svd-step,
          .mkt-svd-cta-btn,
          .mkt-svd-line {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
