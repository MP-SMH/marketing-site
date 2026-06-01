/**
 * TrustSikkerhedSection.jsx (v9)
 *
 * Per Mario feedback: bento layout med flere "bento-grids hvor relevant"
 *
 * NEW Bento layout:
 *   - 1 hero card (Verificering) - stor, gradient bg, visualization
 *   - 3 supporting cards (Lock, Eye, Check) - mindre, light bg
 *   - Asymmetric 1.4fr / 1fr grid på desktop (samme pattern som HvorforAnderledes)
 *
 * Scroll-trigger preserved.
 */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Lock, Eye, Check, ArrowRight,
} from 'lucide-react';

const HERO_TRUST = {
  icon: ShieldCheck,
  title: 'Verificerede foreninger',
  body: 'Hver forening gennemgås, før de kan modtage støtte. Vi tjekker CVR, foreningens vedtægter og bekræfter at de opfylder kravene fra Indsamlingsnævnet, så støttere kan give med ro i sindet.',
  badges: [
    { label: 'CVR-tjek', icon: Check },
    { label: 'Indsamlingsnævnet', icon: Check },
    { label: 'KYC-verificering', icon: Check },
  ],
};

const SUPPORTING_TRUST = [
  {
    icon: Lock,
    title: 'Sikker betaling',
    body: 'Sikker betaling via certificeret betalingspartner.',
  },
  {
    icon: Eye,
    title: 'GDPR og databeskyttelse',
    body: 'Persondata håndteres med klare formål og tydelige rettigheder.',
  },
  {
    icon: Check,
    title: 'Sporbar dokumentation',
    body: 'Støtte og afregning dokumenteres med bilag og regnskabsgrundlag.',
  },
];

export default function TrustSikkerhedSection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const HeroIcon = HERO_TRUST.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.10, rootMargin: '0px 0px -80px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`mkt-trust ${isVisible ? 'is-visible' : ''}`}>
      <div className="mkt-trust-inner">
        <header className="mkt-trust-head">
          <div className="mkt-trust-eyebrow">Tillid og sikkerhed</div>
          <h2 className="mkt-trust-title">
            Sikkerhed bygget ind i fundamentet
          </h2>
          <p className="mkt-trust-subtitle">
            Foreninger bliver verificeret, betalinger håndteres sikkert, og data behandles med respekt for GDPR.
          </p>
        </header>

        <div className="mkt-trust-bento">
          {/* HERO trust card */}
          <article className="mkt-trust-hero">
            <div className="mkt-trust-hero-bg" aria-hidden="true" />
            <div className="mkt-trust-hero-content">
              <div className="mkt-trust-hero-icon">
                <HeroIcon size={26} color="#fff" aria-hidden="true" />
                <div className="mkt-trust-hero-icon-pulse" aria-hidden="true" />
              </div>

              <h3 className="mkt-trust-hero-title">{HERO_TRUST.title}</h3>
              <p className="mkt-trust-hero-body">{HERO_TRUST.body}</p>

              <div className="mkt-trust-hero-badges">
                {HERO_TRUST.badges.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div key={i} className="mkt-trust-hero-badge" style={{ '--badge-delay': `${300 + i * 100}ms` }}>
                      <div className="mkt-trust-hero-badge-icon">
                        <Icon size={11} color="#fff" strokeWidth={3} aria-hidden="true" />
                      </div>
                      <span>{b.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

          {/* Supporting cards */}
          <div className="mkt-trust-supporting">
            {SUPPORTING_TRUST.map((t, i) => {
              const Icon = t.icon;
              return (
                <article
                  key={i}
                  className="mkt-trust-card"
                  style={{ '--card-delay': `${(i + 1) * 100}ms` }}
                >
                  <div className="mkt-trust-card-icon">
                    <Icon size={18} color="#E0193F" aria-hidden="true" />
                  </div>
                  <div className="mkt-trust-card-content">
                    <h3 className="mkt-trust-card-title">{t.title}</h3>
                    <p className="mkt-trust-card-body">{t.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mkt-trust-cta">
          <button
            className="mkt-trust-cta-btn"
            onClick={() => navigate('/sikkerhed')}
            type="button"
          >
            <span>Læs alt om sikkerhed</span>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      <style>{`
        .mkt-trust {
          background: #fff;
          padding: 96px 0;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .mkt-trust-inner {
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
          background: #FEF2F2;
          border: 1px solid rgba(224, 25, 63, 0.20);
          color: #E0193F;
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
          color: #0F172A;
        }

        .mkt-trust-subtitle {
          margin: 0 auto;
          max-width: 600px;
          font-size: 16px;
          line-height: 1.55;
          color: #475569;
          letter-spacing: -0.005em;
        }

        /* Bento grid */
        .mkt-trust-bento {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 48px;
        }

        /* HERO trust card */
        .mkt-trust-hero {
          position: relative;
          background: linear-gradient(135deg, #E0193F 0%, #FF4D6A 100%);
          border-radius: 28px;
          padding: 36px 32px;
          overflow: hidden;
          opacity: 0;
          transform: translateX(-40px);
          transition:
            opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 800ms cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 350ms cubic-bezier(0.16, 1, 0.3, 1);
          color: #fff;
          box-shadow:
            0 24px 64px rgba(224, 25, 63, 0.32),
            0 8px 20px rgba(224, 25, 63, 0.16);
          min-height: 380px;
          display: flex;
          align-items: stretch;
        }

        .mkt-trust.is-visible .mkt-trust-hero {
          opacity: 1;
          transform: translateX(0);
        }

        .mkt-trust-hero:hover {
          transform: translateY(-4px);
          box-shadow:
            0 32px 80px rgba(224, 25, 63, 0.40),
            0 12px 28px rgba(224, 25, 63, 0.24);
        }

        .mkt-trust-hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15), transparent 38%),
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08), transparent 30%);
          pointer-events: none;
        }

        .mkt-trust-hero-content {
          position: relative;
          z-index: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .mkt-trust-hero-icon {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.24);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
        }

        .mkt-trust-hero-icon-pulse {
          position: absolute;
          inset: -8px;
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.30);
          animation: mkt-trust-pulse 3s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes mkt-trust-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 0; transform: scale(1.10); }
        }

        .mkt-trust-hero-title {
          margin: 0 0 14px;
          font-size: 26px;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.030em;
          color: #fff;
        }

        .mkt-trust-hero-body {
          margin: 0 0 28px;
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.92);
          letter-spacing: -0.005em;
          max-width: 540px;
        }

        .mkt-trust-hero-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
        }

        .mkt-trust-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.20);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.005em;
          opacity: 0;
          transform: translateY(8px);
          transition:
            opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) var(--badge-delay, 0ms),
            transform 600ms cubic-bezier(0.16, 1, 0.3, 1) var(--badge-delay, 0ms);
        }

        .mkt-trust.is-visible .mkt-trust-hero-badge {
          opacity: 1;
          transform: translateY(0);
        }

        .mkt-trust-hero-badge-icon {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.20);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Supporting cards */
        .mkt-trust-supporting {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .mkt-trust-card {
          display: flex;
          gap: 16px;
          padding: 22px;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 20px;
          opacity: 0;
          transform: translateX(40px);
          transition:
            opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) var(--card-delay, 0ms),
            transform 700ms cubic-bezier(0.16, 1, 0.3, 1) var(--card-delay, 0ms),
            background 300ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 300ms cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-trust.is-visible .mkt-trust-card {
          opacity: 1;
          transform: translateX(0);
        }

        .mkt-trust-card:hover {
          background: #fff;
          transform: translateY(-3px);
          border-color: rgba(224, 25, 63, 0.30);
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06), 0 2px 8px rgba(15, 23, 42, 0.04);
        }

        .mkt-trust-card:hover .mkt-trust-card-icon {
          transform: rotate(-6deg) scale(1.06);
          background: #FECDD3;
        }

        .mkt-trust-card-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: #FEF2F2;
          border: 1px solid rgba(224, 25, 63, 0.20);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), background 300ms ease;
        }

        .mkt-trust-card-content {
          flex: 1;
          min-width: 0;
        }

        .mkt-trust-card-title {
          margin: 0 0 5px;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.020em;
          color: #0F172A;
        }

        .mkt-trust-card-body {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-trust-cta {
          text-align: center;
        }

        .mkt-trust-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 52px;
          padding: 0 26px;
          background: #fff;
          color: #E0193F;
          border: 1.5px solid rgba(224, 25, 63, 0.30);
          border-radius: 14px;
          font-family: inherit;
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: -0.005em;
          cursor: pointer;
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-trust-cta-btn:hover {
          background: #FEF2F2;
          border-color: #E0193F;
          transform: translateY(-2px);
          gap: 12px;
        }

        .mkt-trust-cta-btn:active { transform: scale(0.99); }

        @media (min-width: 768px) {
          .mkt-trust { padding: 112px 0; }
          .mkt-trust-title { font-size: 40px; letter-spacing: -0.035em; }
          .mkt-trust-hero { padding: 44px 36px; min-height: 420px; }
          .mkt-trust-hero-title { font-size: 30px; }
        }

        @media (min-width: 1024px) {
          .mkt-trust { padding: 128px 0; }
          .mkt-trust-title { font-size: 48px; }

          .mkt-trust-bento {
            grid-template-columns: 1.4fr 1fr;
            gap: 20px;
          }

          .mkt-trust-hero {
            padding: 52px 44px;
            min-height: 480px;
          }

          .mkt-trust-hero-title { font-size: 34px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-trust-hero,
          .mkt-trust-card,
          .mkt-trust-cta-btn,
          .mkt-trust-hero-badge,
          .mkt-trust-hero-icon-pulse {
            animation: none;
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
