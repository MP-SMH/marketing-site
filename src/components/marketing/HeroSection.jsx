import { Heart, ArrowRight, TrendingUp, Users, CreditCard, Bell, BarChart3, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from './MarketingAnimations';

function DashboardMockup() {
  const donations = [
    { name: 'Mette J.', amount: '500', time: '3 min.', color: '#22C55E' },
    { name: 'Lars K.', amount: '200', time: '12 min.', color: '#22C55E' },
    { name: 'Sofie M.', amount: '1.000', time: '28 min.', color: '#22C55E' },
  ];

  return (
    <div style={{
      background: '#fff', borderRadius: 20, width: '100%', maxWidth: 440,
      boxShadow: '0 32px 80px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.2)',
      position: 'relative', zIndex: 2,
      transform: 'perspective(1200px) rotateY(-4deg) rotateX(2deg)',
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      overflow: 'hidden',
    }}>
      {/* Browser top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '10px 16px', borderBottom: '1px solid #F3F4F6',
        background: '#FAFAFA',
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
        <div style={{
          flex: 1, height: 22, borderRadius: 6, background: '#F3F4F6',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginLeft: 12, fontSize: 9, color: '#9CA3AF',
        }}>
          app.stotmedhjerte.dk/admin/dashboard
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Mini sidebar */}
        <div style={{
          width: 44, background: '#0F172A', padding: '12px 0',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          flexShrink: 0,
        }}>
          <Heart size={14} color="#E0193F" fill="#E0193F" />
          <div style={{ width: 20, height: 2, background: 'rgba(255,255,255,0.1)', borderRadius: 1, marginTop: 4, marginBottom: 4 }} />
          {[BarChart3, Users, CreditCard, Bell].map((Icon, i) => (
            <div key={i} style={{
              width: 28, height: 28, borderRadius: 6,
              background: i === 0 ? 'rgba(224,25,63,0.15)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={13} color={i === 0 ? '#E0193F' : 'rgba(255,255,255,0.3)'} />
            </div>
          ))}
        </div>

        {/* Dashboard content */}
        <div style={{ flex: 1, padding: 16 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 8, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dashboard</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Hillerød Svømmeklub</div>
            </div>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', background: '#F0FDF4',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', animation: 'mkt-glow 2s ease infinite' }} />
            </div>
          </div>

          {/* KPI cards */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            {[
              { label: 'Indsamlet', val: '127.450', sub: '+12%', icon: TrendingUp, accent: '#E0193F' },
              { label: 'Støtter', val: '84', sub: '+7', icon: Users, accent: '#7C3AED' },
              { label: 'Denne md.', val: '12.300', sub: 'kr.', icon: CreditCard, accent: '#0891B2' },
            ].map((k, i) => (
              <div key={i} style={{
                flex: 1, background: '#F9FAFB', borderRadius: 10, padding: '10px 8px',
                border: '1px solid #F3F4F6',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                  <k.icon size={10} color={k.accent} />
                  <span style={{ fontSize: 8, color: '#9CA3AF' }}>{k.label}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>{k.val}</div>
                <div style={{ fontSize: 8, color: '#22C55E', fontWeight: 600, marginTop: 2 }}>{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Mini chart */}
          <div style={{
            background: '#F9FAFB', borderRadius: 10, padding: '10px 10px 6px',
            border: '1px solid #F3F4F6', marginBottom: 12,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: '#6B7280' }}>Månedlig indsamling</span>
              <span style={{ fontSize: 9, color: '#22C55E', fontWeight: 600 }}>+23% ↑</span>
            </div>
            <svg width="100%" height="40" viewBox="0 0 320 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E0193F" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#E0193F" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 35 L40 30 L80 32 L120 25 L160 20 L200 22 L240 14 L280 10 L320 6 L320 40 L0 40Z" fill="url(#chartGrad)" />
              <path d="M0 35 L40 30 L80 32 L120 25 L160 20 L200 22 L240 14 L280 10 L320 6" fill="none" stroke="#E0193F" strokeWidth="2" strokeLinecap="round" />
              <circle cx="320" cy="6" r="3" fill="#E0193F" />
              <circle cx="320" cy="6" r="6" fill="#E0193F" opacity="0.2">
                <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {/* Live feed */}
          <div style={{ fontSize: 9, fontWeight: 600, color: '#6B7280', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E', animation: 'mkt-glow 2s ease infinite' }} />
            Seneste aktivitet
          </div>
          {donations.map((d, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px',
              background: i === 0 ? '#F0FDF4' : 'transparent',
              borderRadius: 8, marginBottom: 2,
              opacity: 1 - (i * 0.2),
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', background: '#F3F4F6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 700, color: '#6B7280',
              }}>{d.name.charAt(0)}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#111827' }}>{d.name}</span>
                <span style={{ fontSize: 10, color: '#9CA3AF' }}> donerede </span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#111827' }}>{d.amount} kr.</span>
              </div>
              <span style={{ fontSize: 8, color: '#9CA3AF' }}>{d.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FloatingNotification({ style: posStyle, delay }) {
  return (
    <div style={{
      position: 'absolute', ...posStyle,
      background: '#fff', borderRadius: 14, padding: '12px 16px',
      boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
      animation: `mkt-float ${4 + delay}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      zIndex: 3,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: '#FEF2F2',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Heart size={16} color="#E0193F" fill="#E0193F" />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#111827' }}>Ny donation modtaget</div>
          <div style={{ fontSize: 10, color: '#6B7280' }}>500 kr. overført</div>
        </div>
      </div>
    </div>
  );
}

function FloatingBadge({ style: posStyle, delay, text, icon: Icon, color }) {
  return (
    <div style={{
      position: 'absolute', ...posStyle,
      background: '#fff', borderRadius: 100, padding: '8px 14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
      animation: `mkt-float ${5 + delay}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      zIndex: 3,
      display: 'flex', alignItems: 'center', gap: 6,
      fontSize: 11, fontWeight: 600, color: '#111827',
    }}>
      <Icon size={14} color={color} />
      {text}
    </div>
  );
}

export default function HeroSection() {
  const anim = useScrollAnimation();
  const navigate = useNavigate();

  return (
    <section style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Animated orbs */}
      <div style={{
        position: 'absolute', top: -100, right: -100, width: 500, height: 500,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,25,63,0.25) 0%, transparent 70%)',
        filter: 'blur(80px)', animation: 'mkt-orb 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: -200, left: -150, width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
        filter: 'blur(80px)', animation: 'mkt-orb 10s ease-in-out infinite reverse',
      }} />

      <div ref={anim.ref} style={{
        ...anim.style,
        maxWidth: 1200, margin: '0 auto', padding: '140px 32px 100px',
        display: 'flex', alignItems: 'center', gap: 60, position: 'relative', zIndex: 1,
        flexWrap: 'wrap',
      }}>
        {/* Left content */}
        <div style={{ flex: '1 1 540px', minWidth: 300 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 100, padding: '8px 18px', marginBottom: 28,
            fontSize: 13, color: 'rgba(255,255,255,0.7)',
          }}>
            <span>🇩🇰</span> Bygget til danske foreninger
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.08,
            letterSpacing: '-0.03em', color: '#fff', margin: '0 0 24px 0',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #fff 40%, #fca5b5 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Automatisk</span>{' '}
            fundraising for danske foreninger
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.6,
            color: 'rgba(255,255,255,0.65)', maxWidth: 520, margin: '0 0 36px 0',
          }}>
            Direkte donationer, faste støtteordninger og lovpligtig indsamling. Alt i én platform. Gratis at starte.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
            <button style={{
              background: '#E0193F', border: 'none', color: '#fff', borderRadius: 14,
              height: 56, padding: '0 32px', fontSize: 17, fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(224,25,63,0.4)', display: 'flex', alignItems: 'center', gap: 8,
              transition: 'transform 0.2s, box-shadow 0.2s', fontFamily: 'inherit',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(224,25,63,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(224,25,63,0.4)'; }}
              onClick={() => navigate('/opret-forening')}
            >
              Start gratis <ArrowRight size={18} />
            </button>
            <button style={{
              background: 'transparent', border: '1.5px solid rgba(255,255,255,0.3)',
              color: '#fff', borderRadius: 14, height: 56, padding: '0 28px',
              fontSize: 16, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onClick={() => document.getElementById('hvordan')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Se hvordan det virker
            </button>
          </div>

          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: '0 0 20px 0' }}>
            Tre støttekilder. Én platform. Nul administration.
          </p>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {['MitID-verificeret', 'Indsamlingsnævnet', 'PCI DSS Sikret'].map(t => (
              <span key={t} style={{
                fontSize: 11, color: 'rgba(255,255,255,0.28)', fontWeight: 500,
                letterSpacing: '0.02em', textTransform: 'uppercase',
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right mockup - impressive */}
        <div style={{
          flex: '1 1 440px', minWidth: 300,
          display: 'flex', justifyContent: 'center',
          position: 'relative', minHeight: 500,
        }} className="mkt-hero-right">
          <DashboardMockup />

          <FloatingNotification
            style={{ bottom: -10, left: -30 }}
            delay={0}
          />

          <FloatingBadge
            style={{ top: 20, right: -20 }}
            delay={1.5}
            text="84 aktive støtter"
            icon={Users}
            color="#7C3AED"
          />

          <FloatingBadge
            style={{ bottom: 80, right: -10 }}
            delay={2.5}
            text="Afregning d. 1."
            icon={CreditCard}
            color="#0891B2"
          />
        </div>
      </div>

      {/* Wave divider */}
      <svg viewBox="0 0 1440 80" fill="none" style={{ position: 'absolute', bottom: -1, left: 0, width: '100%' }}>
        <path d="M0 40C360 80 720 0 1440 40V80H0V40Z" fill="#fff" />
      </svg>

      <style>{`
        @keyframes mkt-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @media (max-width: 768px) {
          .mkt-hero-right { display: none !important; }
        }
      `}</style>
    </section>
  );
}