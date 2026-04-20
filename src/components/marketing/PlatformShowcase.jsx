import { BarChart3, FileText, ShieldCheck, Home, Users, Heart, Settings, CreditCard, TrendingUp, Bell, ArrowUpRight, ChevronRight, Zap, Globe, Lock } from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from './MarketingAnimations';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: Heart, label: 'Hjertesager' },
  { icon: Users, label: 'Støtter' },
  { icon: CreditCard, label: 'Transaktioner' },
  { icon: TrendingUp, label: 'Rapporter' },
  { icon: Bell, label: 'Notifikationer', badge: 3 },
  { icon: Settings, label: 'Indstillinger' },
];

const highlights = [
  { icon: Zap, title: 'Realtids-dashboard', desc: 'Se donationer, abonnementer og merchandise live. Alt opdateres automatisk.' },
  { icon: Lock, title: 'Automatisk bogføring', desc: 'Hvert salg og donation bogføres automatisk. Ingen manuel indgang, ingen fejl.' },
  { icon: Globe, title: 'Compliance-rapporter', desc: 'Indsamlingsnævnet-klar med et klik. Automatisk genereret regnskab.' },
];

function BrowserMockup() {
  const transactions = [
    { name: 'Mette J.', type: 'Donation', amount: '500', method: 'MobilePay', status: 'success', time: '3 min.' },
    { name: 'Lars K.', type: 'Abonnement', amount: '200/md.', method: 'Kort', status: 'success', time: '12 min.' },
    { name: 'Sofie M.', type: 'Merchandise', amount: '349', method: 'MobilePay', status: 'success', time: '28 min.' },
    { name: 'Thomas B.', type: 'Donation', amount: '1.000', method: 'Apple Pay', status: 'success', time: '1 time' },
    { name: 'Anne H.', type: 'Abonnement', amount: '500/md.', method: 'Kort', status: 'pending', time: '2 timer' },
  ];

  return (
    <div style={{
      background: '#0F172A', borderRadius: 20, overflow: 'hidden',
      boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
      maxWidth: 960, margin: '0 auto 72px',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)',
        width: '80%', height: 80, background: 'radial-gradient(ellipse, rgba(224,25,63,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)', zIndex: 0,
      }} />

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px',
        background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22C55E' }} />
        <div style={{
          flex: 1, marginLeft: 16, background: 'rgba(255,255,255,0.06)',
          borderRadius: 8, padding: '7px 14px', fontSize: 11, color: 'rgba(255,255,255,0.4)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Lock size={10} color="rgba(255,255,255,0.3)" />
          app.stotmedhjerte.dk/admin/dashboard
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 420, position: 'relative', zIndex: 1 }}>
        <div className="mkt-dash-sidebar" style={{
          width: 200, borderRight: '1px solid rgba(255,255,255,0.06)',
          padding: '20px 0', flexShrink: 0,
          background: 'rgba(0,0,0,0.15)',
        }}>
          <div style={{ padding: '0 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: 'rgba(224,25,63,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Heart size={14} color="#E0193F" fill="#E0193F" />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>Hillerød SK</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>Verificeret forening</div>
              </div>
            </div>
          </div>

          {sidebarItems.map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
                background: item.active ? 'rgba(224,25,63,0.1)' : 'transparent',
                borderLeft: item.active ? '3px solid #E0193F' : '3px solid transparent',
                color: item.active ? '#fff' : 'rgba(255,255,255,0.4)',
                fontSize: 13, fontWeight: item.active ? 600 : 400, cursor: 'default',
                position: 'relative',
              }}>
                <ItemIcon size={15} />
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{
                    marginLeft: 'auto', background: '#E0193F', color: '#fff',
                    fontSize: 9, fontWeight: 700, borderRadius: 100,
                    padding: '1px 6px', minWidth: 16, textAlign: 'center',
                  }}>{item.badge}</span>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ flex: 1, padding: 24, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Overblik</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Dashboard</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{
                padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600,
                background: 'rgba(224,25,63,0.15)', color: '#E0193F',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E', animation: 'mkt-glow 2s ease infinite' }} />
                Live
              </div>
              <div style={{
                padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 500,
                background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)',
              }}>
                Marts 2026
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            {[
              { label: 'Total indsamlet', val: '127.450', unit: 'kr.', change: '+12%', color: '#E0193F', icon: TrendingUp },
              { label: 'Aktive støtter', val: '84', unit: '', change: '+7 ny', color: '#7C3AED', icon: Users },
              { label: 'Denne måned', val: '12.300', unit: 'kr.', change: '+23%', color: '#0891B2', icon: CreditCard },
              { label: 'Næste udbetaling', val: '28. mar', unit: '', change: '9.840 kr.', color: '#22C55E', icon: ArrowUpRight },
            ].map((k, i) => (
              <div key={i} style={{
                flex: '1 1 140px', background: 'rgba(255,255,255,0.03)',
                borderRadius: 12, padding: '16px', border: '1px solid rgba(255,255,255,0.06)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: -10, right: -10, width: 40, height: 40,
                  borderRadius: '50%', background: k.color, opacity: 0.06,
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <k.icon size={12} color={k.color} />
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{k.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{k.val}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{k.unit}</span>
                </div>
                <div style={{ fontSize: 10, color: '#22C55E', fontWeight: 600, marginTop: 4 }}>{k.change}</div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '16px 16px 8px',
            border: '1px solid rgba(255,255,255,0.06)', marginBottom: 16,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Indsamling over tid</span>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { color: '#E0193F', label: 'Donation' },
                  { color: '#7C3AED', label: 'Abonnement' },
                  { color: '#0891B2', label: 'Merchandise' },
                ].map((l, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 2, background: l.color }} />
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <svg width="100%" height="80" viewBox="0 0 500 80" preserveAspectRatio="none">
              <defs>
                <linearGradient id="showcaseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E0193F" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#E0193F" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="showcaseGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 65 L28 60 L56 62 L84 55 L112 52 L140 48 L168 50 L196 45 L224 42 L252 38 L280 40 L308 35 L336 32 L364 28 L392 30 L420 25 L448 22 L476 18 L500 15 L500 80 L0 80Z" fill="url(#showcaseGrad2)" />
              <path d="M0 65 L28 60 L56 62 L84 55 L112 52 L140 48 L168 50 L196 45 L224 42 L252 38 L280 40 L308 35 L336 32 L364 28 L392 30 L420 25 L448 22 L476 18 L500 15" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.4" />
              <path d="M0 55 L28 48 L56 52 L84 42 L112 38 L140 35 L168 40 L196 32 L224 28 L252 25 L280 30 L308 22 L336 18 L364 15 L392 20 L420 12 L448 8 L476 5 L500 3 L500 80 L0 80Z" fill="url(#showcaseGrad)" />
              <path d="M0 55 L28 48 L56 52 L84 42 L112 38 L140 35 L168 40 L196 32 L224 28 L252 25 L280 30 L308 22 L336 18 L364 15 L392 20 L420 12 L448 8 L476 5 L500 3" fill="none" stroke="#E0193F" strokeWidth="2" strokeLinecap="round" />
              <circle cx="500" cy="3" r="3" fill="#E0193F" />
              <circle cx="500" cy="3" r="6" fill="#E0193F" opacity="0.2">
                <animate attributeName="r" values="4;9;4" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.02)', borderRadius: 12, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E', animation: 'mkt-glow 2s ease infinite' }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>Seneste transaktioner</span>
              </div>
              <span style={{ fontSize: 10, color: '#E0193F', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>
                Se alle <ChevronRight size={12} />
              </span>
            </div>
            {transactions.map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 16px',
                borderBottom: i < transactions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                opacity: 1 - (i * 0.12),
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: t.type === 'Donation' ? 'rgba(224,25,63,0.12)' : t.type === 'Abonnement' ? 'rgba(124,58,237,0.12)' : 'rgba(8,145,178,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {t.type === 'Donation' ? <Heart size={12} color="#E0193F" /> : t.type === 'Abonnement' ? <TrendingUp size={12} color="#7C3AED" /> : <CreditCard size={12} color="#0891B2" />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{t.name}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{t.type} via {t.method}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{t.amount} kr.</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>{t.time}</div>
                </div>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                  background: t.status === 'success' ? '#22C55E' : '#F59E0B',
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlatformShowcase() {
  const anim = useScrollAnimation();

  return (
    <section id="platform" style={{
      padding: '100px 32px 80px', background: '#111827',
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 400, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(224,25,63,0.08) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={anim.ref} style={{ ...anim.style, textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: '#E0193F',
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>PLATFORMEN</span>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#fff',
            margin: '16px 0 12px', letterSpacing: '-0.03em',
          }}>Alt hvad en forening behøver. I en skærm.</h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', margin: 0, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            Foreningens dashboard giver fuldt overblik over indsamlinger, støtter og økonomi. Automatisk og i realtid.
          </p>
        </div>

        <BrowserMockup />

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {highlights.map((h, i) => {
            const a = useStaggerAnimation(0.1 * (i + 1));
            const HIcon = h.icon;
            return (
              <div key={i} ref={a.ref} style={{
                ...a.style,
                flex: '1 1 280px', maxWidth: 360,
                background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 32,
                border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center',
                transition: 'all 0.25s',
                cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(224,25,63,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'linear-gradient(135deg, rgba(224,25,63,0.15) 0%, rgba(224,25,63,0.05) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 18px',
                }}>
                  <HIcon size={24} color="#E0193F" />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 8px 0' }}>{h.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.6 }}>{h.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .mkt-dash-sidebar { display: none !important; }
        }
      `}</style>
    </section>
  );
}