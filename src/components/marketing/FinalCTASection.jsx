/**
 * FinalCTASection.jsx (v9)
 *
 * Per Mario feedback: orbs SUBTLER (mindre amplitude, langsommere).
 *
 * Changes from v6:
 *   - Orb 1: 16s → 32s, amplitude -30/20 → -8/6
 *   - Orb 2: 18s → 34s, amplitude 20/-25 → 6/-8
 *   - Mesh: drift 14s → 24s, amplitude reduced
 *   - Smaller shadows for premium feel
 *
 * Content uændret fra v6.
 */

import { useNavigate } from 'react-router-dom';
import { Users, Heart, ArrowRight, ShieldCheck } from 'lucide-react';

export default function FinalCTASection() {
  const navigate = useNavigate();

  return (
    <section className="mkt-final">
      <div className="mkt-final-mesh" aria-hidden="true" />
      <div className="mkt-final-grid-bg" aria-hidden="true" />
      <div className="mkt-final-orb mkt-final-orb-1" aria-hidden="true" />
      <div className="mkt-final-orb mkt-final-orb-2" aria-hidden="true" />

      <div className="mkt-final-inner">
        <div className="mkt-final-pill">
          <ShieldCheck size={13} color="#FCA5B5" aria-hidden="true" />
          <span>Klar til at starte</span>
        </div>

        <h2 className="mkt-final-title">
          Hvad vil du gøre nu?
        </h2>

        <p className="mkt-final-subtitle">
          Vælg den vej, der passer til dig.
        </p>

        <div className="mkt-final-cards">
          <article className="mkt-final-card">
            <div className="mkt-final-card-aura" aria-hidden="true" />
            <div className="mkt-final-card-icon">
              <Users size={24} color="#FCA5B5" aria-hidden="true" />
            </div>
            <div className="mkt-final-card-eyebrow">For foreninger</div>
            <h3 className="mkt-final-card-title">
              Jeg repræsenterer en forening
            </h3>
            <p className="mkt-final-card-body">
              Få en gratis profil, modtag støtte og lad os håndtere bogføring og udbetaling.
            </p>
            <div className="mkt-final-card-ctas">
              <button
                className="mkt-final-card-cta-primary"
                onClick={() => navigate('/foreninger')}
                type="button"
              >
                Læs mere for foreninger
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <button
                className="mkt-final-card-cta-secondary"
                onClick={() => navigate('/book-moede')}
                type="button"
              >
                Book et gratis møde
              </button>
            </div>
          </article>

          <article className="mkt-final-card">
            <div className="mkt-final-card-aura" aria-hidden="true" />
            <div className="mkt-final-card-icon">
              <Heart size={24} color="#FCA5B5" aria-hidden="true" />
            </div>
            <div className="mkt-final-card-eyebrow">For støttere</div>
            <h3 className="mkt-final-card-title">
              Jeg vil støtte en forening
            </h3>
            <p className="mkt-final-card-body">
              Find en verificeret dansk forening og se tydeligt, hvor støtten går hen.
            </p>
            <div className="mkt-final-card-ctas">
              <button
                className="mkt-final-card-cta-primary"
                onClick={() => navigate('/hjertesager')}
                type="button"
              >
                Find en forening at støtte
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <button
                className="mkt-final-card-cta-secondary"
                onClick={() => navigate('/stotter')}
                type="button"
              >
                Læs om støttemuligheder
              </button>
            </div>
          </article>
        </div>

        <p className="mkt-final-trust">
          Bygget med respekt for danske foreninger og dem der støtter dem.
        </p>
      </div>

      <style>{`
        .mkt-final {
          position: relative;
          background: #0F172A;
          padding: 96px 0;
          overflow: hidden;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          color: #fff;
        }

        .mkt-final-mesh {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 80% 20%, rgba(224, 25, 63, 0.24), transparent 32%),
            radial-gradient(circle at 20% 80%, rgba(255, 77, 106, 0.14), transparent 28%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04), transparent 40%);
          animation: mkt-final-drift 28s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes mkt-final-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-8px, 5px, 0) scale(1.015); }
        }

        .mkt-final-grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image:
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* SUBTLE orbs - slower, smaller amplitude */
        .mkt-final-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
        }

        .mkt-final-orb-1 {
          top: 10%;
          left: 8%;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(224, 25, 63, 0.24), transparent 70%);
          animation: mkt-final-orb-1 32s ease-in-out infinite;
        }

        .mkt-final-orb-2 {
          bottom: 10%;
          right: 8%;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(255, 77, 106, 0.16), transparent 70%);
          animation: mkt-final-orb-2 34s ease-in-out infinite;
        }

        @keyframes mkt-final-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-8px, 6px) scale(1.03); }
        }

        @keyframes mkt-final-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(6px, -8px) scale(1.02); }
        }

        .mkt-final-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
          text-align: center;
        }

        .mkt-final-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          margin-bottom: 24px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.92);
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: -0.005em;
        }

        .mkt-final-title {
          margin: 0 auto 16px;
          max-width: 760px;
          font-size: 36px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: #fff;
        }

        .mkt-final-subtitle {
          margin: 0 auto 56px;
          max-width: 540px;
          font-size: 17px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.78);
          letter-spacing: -0.005em;
        }

        .mkt-final-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin: 0 auto 48px;
        }

        .mkt-final-card {
          position: relative;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 40px 32px;
          text-align: left;
          display: flex;
          flex-direction: column;
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .mkt-final-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(224, 25, 63, 0.30);
        }

        .mkt-final-card-aura {
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(224, 25, 63, 0.16), transparent 70%);
          filter: blur(40px);
          pointer-events: none;
          opacity: 0;
          transition: opacity 300ms ease;
        }

        .mkt-final-card:hover .mkt-final-card-aura { opacity: 1; }

        .mkt-final-card-icon {
          position: relative;
          z-index: 1;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(224, 25, 63, 0.14);
          border: 1px solid rgba(224, 25, 63, 0.32);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .mkt-final-card-eyebrow {
          position: relative;
          z-index: 1;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #FCA5B5;
          margin-bottom: 10px;
        }

        .mkt-final-card-title {
          position: relative;
          z-index: 1;
          margin: 0 0 14px;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.025em;
          color: #fff;
        }

        .mkt-final-card-body {
          position: relative;
          z-index: 1;
          margin: 0 0 28px;
          font-size: 15px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.78);
          letter-spacing: -0.005em;
          flex-grow: 1;
        }

        .mkt-final-card-ctas {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: auto;
        }

        .mkt-final-card-cta-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
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
          box-shadow: 0 8px 24px rgba(224, 25, 63, 0.32);
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-final-card-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(224, 25, 63, 0.42);
        }

        .mkt-final-card-cta-primary:active { transform: scale(0.99); }

        .mkt-final-card-cta-secondary {
          width: 100%;
          height: 44px;
          background: transparent;
          color: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.20);
          border-radius: 12px;
          font-family: inherit;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: -0.005em;
          cursor: pointer;
          transition: all 200ms ease;
        }

        .mkt-final-card-cta-secondary:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.35);
          color: #fff;
        }

        .mkt-final-trust {
          margin: 0 auto;
          max-width: 540px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: -0.005em;
        }

        @media (min-width: 768px) {
          .mkt-final { padding: 112px 0; }
          .mkt-final-title { font-size: 48px; }
          .mkt-final-cards { grid-template-columns: 1fr 1fr; gap: 24px; max-width: 880px; }
          .mkt-final-card { padding: 48px 40px; }
        }

        @media (min-width: 1024px) {
          .mkt-final { padding: 128px 0; }
          .mkt-final-title { font-size: 60px; line-height: 1; letter-spacing: -0.04em; }
          .mkt-final-card-title { font-size: 26px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-final-mesh,
          .mkt-final-orb,
          .mkt-final-card,
          .mkt-final-card-cta-primary,
          .mkt-final-card-cta-secondary {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
