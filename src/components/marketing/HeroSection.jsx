/**
 * HeroSection.jsx (v9)
 *
 * Changes from v8 (per Mario feedback):
 *   - REMOVED støtter-card (split-view rolled back)
 *   - Dashboard MUCH BIGGER with admin-style detail:
 *     - Foreningsnavn header med org-logo + "159 dage tilbage" badge
 *     - 4 KPI cards row (TOTAL INDSAMLET / AKTIVE STØTTERE / DENNE MÅNED / NÆSTE AFREGNING)
 *     - "Indsamling over tid" mini-chart med 3 lines (Webshop/Fast/Donationer)
 *     - 3 income channel cards (Webshop / Fast Støtte / Donationer)
 *   - Width: 600px (var 460px), height ~540px - matches Admin produkt
 *   - Floating cards distributed på begge sider preserved
 *   - All CMO content preserved fra v8
 */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck, ArrowRight, TrendingUp, Users, CreditCard,
  Bell, Settings, Home as HomeIcon, CheckCircle, Sparkles,
  Heart, Eye, Calendar, Zap, ShoppingCart, ChevronDown,
} from 'lucide-react';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isDesktop;
}

function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

function ForeningDashboard() {
  const [animateStart, setAnimateStart] = useState(false);
  const totalKr = useCountUp(75124, 1800, animateStart);
  const aktiveSt = useCountUp(19, 1400, animateStart);

  useEffect(() => {
    const t = setTimeout(() => setAnimateStart(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mkt-hero-dash">
      <div className="mkt-hero-dash-chrome">
        <span className="mkt-hero-dot" style={{ background: '#FF5F57' }} />
        <span className="mkt-hero-dot" style={{ background: '#FEBC2E' }} />
        <span className="mkt-hero-dot" style={{ background: '#28C840' }} />
        <div className="mkt-hero-url">
          <ShieldCheck size={9} aria-hidden="true" />
          app.stotmedhjerte.dk
        </div>
      </div>

      <div className="mkt-hero-dash-body">
        {/* Sidebar */}
        <aside className="mkt-hero-side">
          <div className="mkt-hero-side-org">S</div>
          <div className="mkt-hero-side-toggle" aria-hidden="true">
            <span>Admin</span>
          </div>
          <nav className="mkt-hero-side-nav">
            <div className="mkt-hero-side-icon is-active" title="Dashboard">
              <HomeIcon size={12} aria-hidden="true" />
            </div>
            <div className="mkt-hero-side-icon mkt-hero-side-with-badge" title="Notifikationer">
              <Bell size={12} aria-hidden="true" />
              <span className="mkt-hero-side-badge" />
            </div>
            <div className="mkt-hero-side-icon" title="Hjertesager">
              <Heart size={12} aria-hidden="true" />
            </div>
            <div className="mkt-hero-side-icon" title="Fast støtte">
              <Zap size={12} aria-hidden="true" />
            </div>
            <div className="mkt-hero-side-icon" title="Webshop">
              <ShoppingCart size={12} aria-hidden="true" />
            </div>
            <div className="mkt-hero-side-icon" title="Indstillinger">
              <Settings size={12} aria-hidden="true" />
            </div>
          </nav>
        </aside>

        {/* Main area */}
        <main className="mkt-hero-dash-main">
          {/* Foreningsnavn header */}
          <header className="mkt-hero-dash-foreningshead">
            <div className="mkt-hero-dash-foreningsorg">
              <div className="mkt-hero-dash-foreningsicon">N</div>
              <div className="mkt-hero-dash-foreningsmeta">
                <div className="mkt-hero-dash-foreningsname">Nordsjællands Svømmeklub</div>
                <div className="mkt-hero-dash-foreningssub">Svømmeklub &middot; Hillerød</div>
              </div>
            </div>
            <div className="mkt-hero-dash-daysleft">
              <Calendar size={10} aria-hidden="true" />
              <span>159 dage tilbage</span>
            </div>
          </header>

          {/* 4 KPI cards row */}
          <div className="mkt-hero-dash-kpis">
            <div className="mkt-hero-dash-kpi">
              <div className="mkt-hero-dash-kpi-icon mkt-hero-dash-kpi-icon-pink">
                <TrendingUp size={9} aria-hidden="true" />
              </div>
              <div className="mkt-hero-dash-kpi-label">Total indsamlet</div>
              <div className="mkt-hero-dash-kpi-val">
                {totalKr.toLocaleString('da-DK')}<span> kr.</span>
              </div>
              <div className="mkt-hero-dash-kpi-trend mkt-hero-dash-kpi-trend-up">+123% YoY</div>
            </div>
            <div className="mkt-hero-dash-kpi">
              <div className="mkt-hero-dash-kpi-icon mkt-hero-dash-kpi-icon-teal">
                <Users size={9} aria-hidden="true" />
              </div>
              <div className="mkt-hero-dash-kpi-label">Aktive støttere</div>
              <div className="mkt-hero-dash-kpi-val">{aktiveSt}</div>
              <div className="mkt-hero-dash-kpi-trend">21 total</div>
            </div>
            <div className="mkt-hero-dash-kpi">
              <div className="mkt-hero-dash-kpi-icon mkt-hero-dash-kpi-icon-purple">
                <CreditCard size={9} aria-hidden="true" />
              </div>
              <div className="mkt-hero-dash-kpi-label">Denne måned</div>
              <div className="mkt-hero-dash-kpi-val">
                18.450<span> kr.</span>
              </div>
              <div className="mkt-hero-dash-kpi-trend mkt-hero-dash-kpi-trend-up">+24%</div>
            </div>
            <div className="mkt-hero-dash-kpi">
              <div className="mkt-hero-dash-kpi-icon mkt-hero-dash-kpi-icon-green">
                <Calendar size={9} aria-hidden="true" />
              </div>
              <div className="mkt-hero-dash-kpi-label">Næste afregning</div>
              <div className="mkt-hero-dash-kpi-val">28. juli</div>
              <div className="mkt-hero-dash-kpi-trend">14.580 kr. klar</div>
            </div>
          </div>

          {/* Indsamling over tid chart */}
          <div className="mkt-hero-dash-chart-wrap">
            <div className="mkt-hero-dash-chart-head">
              <div>
                <div className="mkt-hero-dash-chart-title">Indsamling over tid</div>
                <div className="mkt-hero-dash-chart-sub">Sidste 14 måneder</div>
              </div>
              <div className="mkt-hero-dash-chart-legend">
                <span><i style={{ background: '#E0193F' }} /> Webshop</span>
                <span><i style={{ background: '#7C3AED' }} /> Fast Støtte</span>
                <span><i style={{ background: '#3B82F6' }} /> Donationer</span>
              </div>
            </div>
            <div className="mkt-hero-dash-chart">
              <svg viewBox="0 0 480 110" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="chartFillDon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Y-axis grid lines */}
                <line x1="0" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0" y1="55" x2="480" y2="55" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0" y1="90" x2="480" y2="90" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

                {/* Donationer (blue) - filled */}
                <path
                  className="mkt-hero-chart-fill"
                  d="M0,75 L40,68 L80,62 L120,55 L160,40 L200,28 L240,55 L280,30 L320,40 L360,32 L400,56 L440,70 L480,82 L480,110 L0,110 Z"
                  fill="url(#chartFillDon)"
                />
                <path
                  className="mkt-hero-chart-line mkt-hero-chart-line-1"
                  d="M0,75 L40,68 L80,62 L120,55 L160,40 L200,28 L240,55 L280,30 L320,40 L360,32 L400,56 L440,70 L480,82"
                  stroke="#3B82F6"
                />
                {/* Fast støtte (purple) - linear ascending */}
                <path
                  className="mkt-hero-chart-line mkt-hero-chart-line-2"
                  d="M0,90 L40,86 L80,80 L120,72 L160,65 L200,58 L240,50 L280,42 L320,38 L360,30 L400,20 L440,18 L480,18"
                  stroke="#7C3AED"
                />
                {/* Webshop (red) - low and steady */}
                <path
                  className="mkt-hero-chart-line mkt-hero-chart-line-3"
                  d="M0,95 L40,92 L80,88 L120,86 L160,84 L200,80 L240,82 L280,78 L320,80 L360,74 L400,76 L440,80 L480,82"
                  stroke="#E0193F"
                />
              </svg>
              <div className="mkt-hero-dash-chart-axis" aria-hidden="true">
                <span>Mar 25</span>
                <span>Aug 25</span>
                <span>Jan 26</span>
                <span>Maj 26</span>
              </div>
            </div>
          </div>

          {/* 3 income channel cards */}
          <div className="mkt-hero-dash-channels">
            <div className="mkt-hero-dash-channel">
              <div className="mkt-hero-dash-channel-icon mkt-hero-dash-channel-icon-pink">
                <ShoppingCart size={11} aria-hidden="true" />
              </div>
              <div className="mkt-hero-dash-channel-label">Webshop</div>
              <div className="mkt-hero-dash-channel-val">6.247<span>,89 kr.</span></div>
            </div>
            <div className="mkt-hero-dash-channel">
              <div className="mkt-hero-dash-channel-icon mkt-hero-dash-channel-icon-purple">
                <Heart size={11} aria-hidden="true" />
              </div>
              <div className="mkt-hero-dash-channel-label">Fast Støtte</div>
              <div className="mkt-hero-dash-channel-val">6.000<span> kr./md</span></div>
            </div>
            <div className="mkt-hero-dash-channel">
              <div className="mkt-hero-dash-channel-icon mkt-hero-dash-channel-icon-blue">
                <Zap size={11} aria-hidden="true" />
              </div>
              <div className="mkt-hero-dash-channel-label">Donationer</div>
              <div className="mkt-hero-dash-channel-val">28.316<span> kr.</span></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function FloatingCard({ icon: Icon, color, bg, title, sub, position, delay }) {
  return (
    <div
      className={`mkt-hero-float mkt-hero-float-${position}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mkt-hero-float-icon" style={{ background: bg, color }}>
        <Icon size={15} aria-hidden="true" />
      </div>
      <div>
        <div className="mkt-hero-float-title">{title}</div>
        <div className="mkt-hero-float-sub">{sub}</div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  return (
    <section className="mkt-hero">
      <div className="mkt-hero-mesh" aria-hidden="true" />
      <div className="mkt-hero-grid" aria-hidden="true" />

      <div className="mkt-hero-inner">
        <div className="mkt-hero-content">
          <div className="mkt-hero-eyebrow" style={{ animationDelay: '0ms' }}>
            <Sparkles size={13} color="#FF4D6A" aria-hidden="true" />
            <span>Verificeret fundraising for danske foreninger</span>
          </div>

          <h1 className="mkt-hero-h1" style={{ animationDelay: '80ms' }}>
            Bygget til <span className="mkt-hero-h1-em">danske foreninger</span><br />
            og dem, der støtter dem
          </h1>

          <p className="mkt-hero-subtitle" style={{ animationDelay: '160ms' }}>
            StøtMedHjerte gør det nemmere for danske foreninger at modtage støtte
            og for støttere at give på en tryg og gennemsigtig måde.
            Ved donationer og fast støtte går 80% til foreningen.
          </p>

          <div className="mkt-hero-ctas" style={{ animationDelay: '240ms' }}>
            <button
              className="mkt-cta-primary"
              onClick={() => navigate('/foreninger')}
              type="button"
            >
              <span>Læs mere for foreninger</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button
              className="mkt-cta-secondary-dark"
              onClick={() => navigate('/hjertesager')}
              type="button"
            >
              <span>Find en forening at støtte</span>
            </button>
          </div>

          <ul className="mkt-hero-trust" role="list" style={{ animationDelay: '320ms' }}>
            <li>
              <ShieldCheck size={14} color="#FF4D6A" aria-hidden="true" />
              <span>Verificerede foreninger</span>
            </li>
            <li>
              <Heart size={14} fill="#FF4D6A" color="#FF4D6A" aria-hidden="true" />
              <span>80% til foreningen</span>
            </li>
            <li>
              <Eye size={14} color="#FF4D6A" aria-hidden="true" />
              <span>Gratis at oprette, ingen binding</span>
            </li>
          </ul>

          <div className="mkt-hero-prelaunch" style={{ animationDelay: '380ms' }}>
            <Calendar size={12} aria-hidden="true" />
            <span>
              StøtMedHjerte lancerer 18. juli 2026 og bygges sammen med de første foreninger fra start.
            </span>
          </div>
        </div>

        <div className="mkt-hero-product" style={{ animationDelay: '400ms' }}>
          <div className="mkt-hero-aurora" aria-hidden="true" />
          <ForeningDashboard />

          {isDesktop && (
            <>
              <FloatingCard
                icon={TrendingUp}
                color="#16A34A"
                bg="#ECFDF5"
                title="+200 kr."
                sub="Fast støtte modtaget"
                position="top-right"
                delay={0}
              />
              <FloatingCard
                icon={Users}
                color="#0891B2"
                bg="#ECFEFF"
                title="127 støtter"
                sub="Aktive denne måned"
                position="middle-left"
                delay={1.5}
              />
              <FloatingCard
                icon={CheckCircle}
                color="#E0193F"
                bg="#FEF2F2"
                title="Klar til udbetaling"
                sub="Verificeret af SMH"
                position="bottom-right"
                delay={3}
              />
            </>
          )}
        </div>
      </div>

      <style>{`
        .mkt-hero {
          position: relative;
          overflow: hidden;
          background: #0F172A;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          padding: 128px 0 96px;
          color: #fff;
        }

        .mkt-hero-mesh {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 80% 20%, rgba(224,25,63,0.30), transparent 32%),
            radial-gradient(circle at 20% 80%, rgba(8,145,178,0.16), transparent 28%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04), transparent 40%),
            #0F172A;
          animation: mkt-mesh-drift 20s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes mkt-mesh-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-10px, 8px, 0) scale(1.02); }
        }

        .mkt-hero-grid {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image:
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .mkt-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          gap: 64px;
        }

        .mkt-hero-eyebrow,
        .mkt-hero-h1,
        .mkt-hero-subtitle,
        .mkt-hero-ctas,
        .mkt-hero-trust,
        .mkt-hero-prelaunch,
        .mkt-hero-product {
          opacity: 0;
          animation: mkt-hero-reveal 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes mkt-hero-reveal {
          from { opacity: 0; transform: translateY(12px); filter: blur(6px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .mkt-hero-eyebrow {
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
          font-size: 12.5px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.92);
          letter-spacing: -0.005em;
        }

        .mkt-hero-h1 {
          margin: 0 0 20px;
          font-size: 36px;
          line-height: 1.05;
          letter-spacing: -0.04em;
          font-weight: 600;
          color: #fff;
          max-width: 540px;
        }

        .mkt-hero-h1-em {
          background: linear-gradient(135deg, #fff 30%, #FCA5B5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mkt-hero-subtitle {
          margin: 0 0 32px;
          font-size: 16px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.78);
          max-width: 520px;
          letter-spacing: -0.005em;
        }

        .mkt-hero-ctas {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 28px;
        }

        .mkt-cta-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          height: 56px;
          padding: 0 28px;
          border-radius: 16px;
          background: linear-gradient(135deg, #E0193F 0%, #C8112F 100%);
          color: #fff;
          border: none;
          font-family: inherit;
          font-size: 15.5px;
          font-weight: 600;
          letter-spacing: -0.005em;
          cursor: pointer;
          box-shadow: 0 16px 40px rgba(224, 25, 63, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.20);
          transition: all 350ms cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .mkt-cta-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.20), transparent);
          transition: left 600ms ease;
        }

        .mkt-cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 24px 56px rgba(224, 25, 63, 0.46), inset 0 1px 0 rgba(255, 255, 255, 0.30);
        }

        .mkt-cta-primary:hover::before { left: 100%; }
        .mkt-cta-primary:hover svg { transform: translateX(4px); }
        .mkt-cta-primary svg { transition: transform 300ms ease; }
        .mkt-cta-primary:active { transform: scale(0.99); }

        .mkt-cta-secondary-dark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 56px;
          padding: 0 28px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #fff;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          font-family: inherit;
          font-size: 15.5px;
          font-weight: 500;
          letter-spacing: -0.005em;
          cursor: pointer;
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-cta-secondary-dark:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.36);
          transform: translateY(-2px);
        }
        .mkt-cta-secondary-dark:active { transform: scale(0.99); }

        .mkt-hero-trust {
          list-style: none;
          margin: 0 0 18px;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
        }

        .mkt-hero-trust li {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: -0.005em;
        }

        .mkt-hero-prelaunch {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 13px;
          background: rgba(245, 158, 11, 0.14);
          border: 1px solid rgba(245, 158, 11, 0.32);
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 500;
          color: #FCD34D;
          letter-spacing: -0.005em;
        }

        /* Product side */
        .mkt-hero-product {
          position: relative;
          width: 100%;
          min-height: 540px;
        }

        .mkt-hero-aurora {
          position: absolute;
          inset: -100px;
          background: radial-gradient(circle, rgba(224, 25, 63, 0.30), transparent 62%);
          filter: blur(56px);
          opacity: 0.65;
          pointer-events: none;
          z-index: 0;
        }

        /* DASHBOARD - admin-style with full detail */
        .mkt-hero-dash {
          position: relative;
          z-index: 1;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.99) 0%, rgba(7, 11, 22, 1) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          box-shadow:
            0 32px 80px rgba(0, 0, 0, 0.50),
            0 8px 24px rgba(8, 145, 178, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          overflow: hidden;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .mkt-hero-dash-chrome {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 12px;
          background: rgba(0, 0, 0, 0.40);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .mkt-hero-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .mkt-hero-url {
          flex: 1;
          margin-left: 8px;
          padding: 3px 9px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 6px;
          font-size: 9.5px;
          color: rgba(255, 255, 255, 0.55);
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'ui-monospace', monospace;
        }

        .mkt-hero-dash-body {
          display: flex;
          min-height: 480px;
        }

        /* Sidebar */
        .mkt-hero-side {
          width: 44px;
          padding: 10px 0;
          background: rgba(0, 0, 0, 0.30);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .mkt-hero-side-org {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          background: linear-gradient(135deg, #E0193F, #FF4D6A);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          box-shadow: 0 4px 10px rgba(224, 25, 63, 0.45);
        }

        .mkt-hero-side-toggle {
          width: 32px;
          padding: 3px 0;
          background: rgba(8, 145, 178, 0.16);
          border: 1px solid rgba(8, 145, 178, 0.32);
          border-radius: 6px;
          color: #22D3EE;
          font-size: 7.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-align: center;
          margin-bottom: 8px;
        }

        .mkt-hero-side-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          align-items: center;
        }

        .mkt-hero-side-icon {
          position: relative;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.40);
        }

        .mkt-hero-side-icon.is-active {
          background: rgba(8, 145, 178, 0.20);
          color: #22D3EE;
          box-shadow: inset 2px 0 0 #22D3EE;
        }

        .mkt-hero-side-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #FF4D6A;
          animation: mkt-hero-pulse 2s ease infinite;
        }

        /* Main content */
        .mkt-hero-dash-main {
          flex: 1;
          padding: 14px;
          min-width: 0;
        }

        /* Foreningsnavn header */
        .mkt-hero-dash-foreningshead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .mkt-hero-dash-foreningsorg {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .mkt-hero-dash-foreningsicon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, #0891B2, #22D3EE);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(8, 145, 178, 0.40);
        }

        .mkt-hero-dash-foreningsmeta { min-width: 0; }

        .mkt-hero-dash-foreningsname {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.020em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mkt-hero-dash-foreningssub {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.50);
          letter-spacing: -0.005em;
          margin-top: 1px;
        }

        .mkt-hero-dash-daysleft {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 9px;
          background: rgba(34, 197, 94, 0.14);
          border: 1px solid rgba(34, 197, 94, 0.32);
          border-radius: 6px;
          color: #4ADE80;
          font-size: 9.5px;
          font-weight: 700;
          flex-shrink: 0;
        }

        /* 4 KPI cards row */
        .mkt-hero-dash-kpis {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
          margin-bottom: 12px;
        }

        .mkt-hero-dash-kpi {
          padding: 9px 8px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          min-width: 0;
        }

        .mkt-hero-dash-kpi-icon {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 5px;
        }

        .mkt-hero-dash-kpi-icon-pink {
          background: rgba(224, 25, 63, 0.16);
          color: #FF4D6A;
        }

        .mkt-hero-dash-kpi-icon-teal {
          background: rgba(8, 145, 178, 0.16);
          color: #22D3EE;
        }

        .mkt-hero-dash-kpi-icon-purple {
          background: rgba(124, 58, 237, 0.16);
          color: #A78BFA;
        }

        .mkt-hero-dash-kpi-icon-green {
          background: rgba(34, 197, 94, 0.16);
          color: #4ADE80;
        }

        .mkt-hero-dash-kpi-label {
          font-size: 8.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 4px;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mkt-hero-dash-kpi-val {
          font-size: 13.5px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.025em;
          line-height: 1;
          margin-bottom: 4px;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mkt-hero-dash-kpi-val span {
          font-size: 9px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.40);
          margin-left: 1px;
        }

        .mkt-hero-dash-kpi-trend {
          font-size: 8.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.40);
          letter-spacing: -0.005em;
        }

        .mkt-hero-dash-kpi-trend-up {
          color: #4ADE80;
        }

        /* Chart */
        .mkt-hero-dash-chart-wrap {
          padding: 12px;
          background: rgba(0, 0, 0, 0.20);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          margin-bottom: 12px;
        }

        .mkt-hero-dash-chart-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 10px;
          gap: 10px;
        }

        .mkt-hero-dash-chart-title {
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.020em;
        }

        .mkt-hero-dash-chart-sub {
          font-size: 9px;
          color: rgba(255, 255, 255, 0.45);
          margin-top: 1px;
        }

        .mkt-hero-dash-chart-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }

        .mkt-hero-dash-chart-legend span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 8.5px;
          color: rgba(255, 255, 255, 0.65);
          letter-spacing: -0.005em;
        }

        .mkt-hero-dash-chart-legend i {
          width: 8px;
          height: 2px;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .mkt-hero-dash-chart {
          position: relative;
        }

        .mkt-hero-dash-chart svg {
          width: 100%;
          height: 80px;
          display: block;
        }

        .mkt-hero-chart-line {
          fill: none;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
        }

        .mkt-hero-chart-line-1 {
          animation: mkt-hero-line-draw 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
          filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.40));
        }

        .mkt-hero-chart-line-2 {
          animation: mkt-hero-line-draw 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards;
        }

        .mkt-hero-chart-line-3 {
          animation: mkt-hero-line-draw 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.0s forwards;
        }

        .mkt-hero-chart-fill {
          opacity: 0;
          animation: mkt-hero-fill-fade 0.6s ease 1.6s forwards;
        }

        @keyframes mkt-hero-line-draw {
          to { stroke-dashoffset: 0; }
        }

        @keyframes mkt-hero-fill-fade {
          to { opacity: 1; }
        }

        .mkt-hero-dash-chart-axis {
          display: flex;
          justify-content: space-between;
          margin-top: 4px;
          padding: 0 2px;
        }

        .mkt-hero-dash-chart-axis span {
          font-size: 8px;
          color: rgba(255, 255, 255, 0.35);
          font-variant-numeric: tabular-nums;
        }

        /* 3 income channel cards */
        .mkt-hero-dash-channels {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }

        .mkt-hero-dash-channel {
          padding: 9px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          min-width: 0;
        }

        .mkt-hero-dash-channel-icon {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
        }

        .mkt-hero-dash-channel-icon-pink {
          background: rgba(224, 25, 63, 0.16);
          color: #FF4D6A;
        }

        .mkt-hero-dash-channel-icon-purple {
          background: rgba(124, 58, 237, 0.16);
          color: #A78BFA;
        }

        .mkt-hero-dash-channel-icon-blue {
          background: rgba(59, 130, 246, 0.16);
          color: #60A5FA;
        }

        .mkt-hero-dash-channel-label {
          font-size: 9.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: -0.005em;
          margin-bottom: 3px;
        }

        .mkt-hero-dash-channel-val {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.020em;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mkt-hero-dash-channel-val span {
          font-size: 10px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.40);
        }

        @keyframes mkt-hero-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* Floating cards - hidden mobile, shown desktop only */
        .mkt-hero-float {
          display: none;
        }

        @keyframes mkt-hero-float-anim {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @media (min-width: 640px) {
          .mkt-hero { padding: 144px 0 112px; }
          .mkt-hero-h1 { font-size: 48px; line-height: 1.0; letter-spacing: -0.045em; }
          .mkt-hero-subtitle { font-size: 17px; }
          .mkt-hero-ctas { flex-direction: row; gap: 14px; }
          .mkt-cta-primary, .mkt-cta-secondary-dark { width: auto; }
        }

        @media (min-width: 1024px) {
          .mkt-hero { padding: 160px 0 128px; }

          .mkt-hero-inner {
            flex-direction: row;
            align-items: center;
            gap: 56px;
          }

          .mkt-hero-content {
            flex: 1 1 480px;
            min-width: 0;
          }

          .mkt-hero-product {
            flex: 0 0 600px;
            min-height: 580px;
          }

          .mkt-hero-h1 {
            font-size: 56px;
            line-height: 0.98;
          }

          .mkt-hero-dash {
            transform: perspective(1400px) rotateY(-6deg) rotateX(2deg);
            transform-style: preserve-3d;
            max-width: 600px;
            margin: 0 0 0 auto;
          }

          /* WHITE floating cards distributed on BOTH sides */
          .mkt-hero-float {
            position: absolute;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 11px 14px;
            background: #fff;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22), 0 4px 12px rgba(0, 0, 0, 0.10);
            animation: mkt-hero-float-anim 6s ease-in-out infinite;
            z-index: 3;
            min-width: 165px;
          }

          .mkt-hero-float-top-right {
            top: -16px;
            right: -16px;
          }

          .mkt-hero-float-middle-left {
            top: 45%;
            left: -90px;
            transform: translateY(-50%);
          }

          .mkt-hero-float-bottom-right {
            bottom: -16px;
            right: 8px;
          }

          .mkt-hero-float-icon {
            width: 30px;
            height: 30px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .mkt-hero-float-title {
            font-size: 13px;
            font-weight: 700;
            color: #0F172A;
            letter-spacing: -0.015em;
          }

          .mkt-hero-float-sub {
            font-size: 10.5px;
            color: #64748B;
            margin-top: 1px;
            letter-spacing: -0.005em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-hero-eyebrow,
          .mkt-hero-h1,
          .mkt-hero-subtitle,
          .mkt-hero-ctas,
          .mkt-hero-trust,
          .mkt-hero-prelaunch,
          .mkt-hero-product,
          .mkt-hero-mesh,
          .mkt-hero-side-badge,
          .mkt-hero-chart-line,
          .mkt-hero-chart-fill,
          .mkt-hero-float,
          .mkt-cta-primary,
          .mkt-cta-secondary-dark {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            stroke-dashoffset: 0 !important;
            transition: none !important;
          }

          .mkt-hero-dash {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
