import { useState } from 'react';
import { Heart, ArrowLeft, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginStoetterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [focused, setFocused] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    }}>
      <style>{`
        @keyframes login-orb-1 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -40px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes login-orb-2 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 50px) scale(1.1); }
          66% { transform: translate(40px, -20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes login-orb-3 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          50% { transform: translate(30px, 40px) scale(1.2); opacity: 1; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
        }
        @keyframes login-grid-drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        @keyframes login-particles {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
        @keyframes login-heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes login-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .login-card { animation: login-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .login-input:focus { border-color: rgba(224,25,63,0.4) !important; background: rgba(255,255,255,0.08) !important; }
      `}</style>

      {/* Animated grid */}
      <div style={{
        position: 'absolute', inset: -60, opacity: 0.04,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        animation: 'login-grid-drift 20s linear infinite',
      }} />

      {/* Orbs */}
      <div style={{ position: 'absolute', top: '10%', right: '15%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,25,63,0.18) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'login-orb-1 12s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,25,63,0.12) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'login-orb-2 15s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: '40%', left: '50%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,100,130,0.1) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'login-orb-3 10s ease-in-out infinite' }} />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${15 + i * 14}%`,
          bottom: '-5%',
          width: 3 + (i % 3),
          height: 3 + (i % 3),
          borderRadius: '50%',
          background: `rgba(224,25,63,${0.15 + (i % 3) * 0.1})`,
          animation: `login-particles ${8 + i * 2}s linear infinite`,
          animationDelay: `${i * 1.5}s`,
        }} />
      ))}

      {/* Back button */}
      <button onClick={() => navigate('/')} style={{
        position: 'absolute', top: 28, left: 28,
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10, padding: '8px 14px',
        color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500,
        cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit', zIndex: 10,
      }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
      >
        <ArrowLeft size={14} /> Tilbage
      </button>

      {/* Login card */}
      <div className="login-card" style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 400, padding: '0 20px',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 24,
          padding: '48px 36px 40px',
          backdropFilter: 'blur(20px)',
        }}>
          {/* Heart icon */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: 'rgba(224,25,63,0.12)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              animation: 'login-heartbeat 2s ease infinite',
            }}>
              <Heart size={26} color="#E0193F" fill="#E0193F" />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ff6b82', marginBottom: 8 }}>Støtter</div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 6px' }}>Velkommen tilbage</h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: 0 }}>Se dine donationer og abonnementer</p>
          </div>

          {/* Form */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>Email</label>
            <input
              className="login-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              placeholder="din@email.dk"
              style={{
                width: '100%', height: 48, borderRadius: 12,
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${focused === 'email' ? 'rgba(224,25,63,0.4)' : 'rgba(255,255,255,0.08)'}`,
                padding: '0 14px', fontSize: 14, color: '#fff',
                outline: 'none', transition: 'all 0.2s',
                fontFamily: 'inherit', boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>Adgangskode</label>
            <div style={{ position: 'relative' }}>
              <input
                className="login-input"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused('pw')}
                onBlur={() => setFocused(null)}
                placeholder="Din adgangskode"
                style={{
                  width: '100%', height: 48, borderRadius: 12,
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${focused === 'pw' ? 'rgba(224,25,63,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  padding: '0 44px 0 14px', fontSize: 14, color: '#fff',
                  outline: 'none', transition: 'all 0.2s',
                  fontFamily: 'inherit', boxSizing: 'border-box',
                }}
              />
              <button onClick={() => setShowPw(!showPw)} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                display: 'flex', alignItems: 'center',
              }}>
                {showPw ? <EyeOff size={16} color="rgba(255,255,255,0.3)" /> : <Eye size={16} color="rgba(255,255,255,0.3)" />}
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ff6b82'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
            >Glemt adgangskode?</span>
          </div>

          <button style={{
            width: '100%', height: 52, borderRadius: 14, border: 'none',
            background: 'linear-gradient(135deg, #E0193F, #c8112e)',
            color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 24px rgba(224,25,63,0.35)',
            transition: 'all 0.2s', fontFamily: 'inherit',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(224,25,63,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(224,25,63,0.35)'; }}
          >
            <Heart size={16} fill="#fff" /> Log ind
          </button>

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Har du ikke en konto? </span>
            <span onClick={() => navigate('/opret-stoetter')} style={{ fontSize: 13, color: '#ff6b82', fontWeight: 600, cursor: 'pointer' }}>Opret gratis</span>
          </div>
        </div>

        {/* Trust footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 20 }}>
          <ShieldCheck size={12} color="rgba(255,255,255,0.2)" />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>Sikker krypteret forbindelse</span>
        </div>
      </div>
    </div>
  );
}