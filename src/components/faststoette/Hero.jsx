import { Heart, ArrowRight, Users, Repeat, ShieldCheck, Unlock } from 'lucide-react';

export default function Hero({ onScrollToList, onScrollToInfo }) {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      padding: '120px 32px 60px',
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Green orb */}
      <div style={{
        position: 'absolute', top: -80, right: -80, width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)',
        filter: 'blur(80px)', animation: 'mkt-orb 8s ease-in-out infinite',
      }} />

      <div style={{
        maxWidth: 800, margin: '0 auto', textAlign: 'center',
        position: 'relative', zIndex: 1,
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
          borderRadius: 100, padding: '8px 18px', marginBottom: 24,
          fontSize: 13, color: '#4ade80',
        }}>
          <Repeat size={14} color="#22C55E" />
          Fast månedlig støtte
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.1,
          letterSpacing: '-0.03em', color: '#fff', margin: '0 0 16px',
        }}>
          Støt en forening{' '}
          <span style={{
            background: 'linear-gradient(135deg, #fff 40%, #86efac 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>hver måned</span>
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.6,
          color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto 32px',
        }}>
          Fra 100 kr./md. 80% går direkte til foreningen. Ingen binding, opsig når som helst.
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 36,
          flexWrap: 'wrap',
        }}>
          {[
            { icon: Users, val: '183+', label: 'faste støtter' },
            { icon: Heart, val: '8', label: 'foreninger' },
            { icon: ShieldCheck, val: '100%', label: 'verificeret' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'rgba(34,197,94,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <s.icon size={14} color="#22C55E" />
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={onScrollToList} style={{
            background: '#E0193F', border: 'none', color: '#fff', borderRadius: 14,
            height: 52, padding: '0 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(224,25,63,0.35)',
            transition: 'transform 0.2s, box-shadow 0.2s', fontFamily: 'inherit',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(224,25,63,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(224,25,63,0.35)'; }}
          >
            <Heart size={16} fill="#fff" /> Find forening
          </button>
          <button onClick={onScrollToInfo} style={{
            background: 'transparent', border: '1.5px solid rgba(255,255,255,0.25)',
            color: '#fff', borderRadius: 14, height: 52, padding: '0 28px',
            fontSize: 15, fontWeight: 500, cursor: 'pointer',
            transition: 'all 0.2s', fontFamily: 'inherit',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
          >
            Sådan fungerer det <ArrowRight size={15} />
          </button>
        </div>

        {/* Trust */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 20, marginTop: 32, flexWrap: 'wrap',
        }}>
          {[
            { icon: ShieldCheck, label: 'MitID-verificeret' },
            { icon: Unlock, label: 'Ingen binding' },
            { icon: Repeat, label: 'Opsig når som helst' },
          ].map((item, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 500,
            }}>
              <item.icon size={13} color="rgba(255,255,255,0.2)" />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <svg viewBox="0 0 1440 60" fill="none" style={{ position: 'absolute', bottom: -1, left: 0, width: '100%' }}>
        <path d="M0 30C360 60 720 0 1440 30V60H0V30Z" fill="#fff" />
      </svg>
    </section>
  );
}