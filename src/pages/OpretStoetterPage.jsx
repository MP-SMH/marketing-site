import { useState } from 'react';
import { Heart, ArrowLeft, ShieldCheck, Eye, EyeOff, Check, ArrowRight, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OpretStoetterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: '', fornavn: '', efternavn: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));
  const pwMatch = form.password && form.confirm && form.password === form.confirm;
  const pwMismatch = form.confirm && form.password !== form.confirm;
  const canSubmit = form.fornavn && form.email && form.password && pwMatch && acceptTerms;

  const socialBtnStyle = {
    width: '100%', height: 56, borderRadius: 14,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontSize: 15, fontWeight: 600,
    cursor: 'pointer', display: 'flex', alignItems: 'center',
    justifyContent: 'center', gap: 12,
    transition: 'all 0.2s', fontFamily: 'inherit',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      padding: '40px 0',
    }}>
      <style>{`
        @keyframes login-orb-1 { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,-40px) scale(1.15)} 66%{transform:translate(-30px,30px) scale(0.95)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes login-orb-2 { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,50px) scale(1.1)} 66%{transform:translate(40px,-20px) scale(0.9)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes login-orb-3 { 0%{transform:translate(0,0) scale(1);opacity:.6} 50%{transform:translate(30px,40px) scale(1.2);opacity:1} 100%{transform:translate(0,0) scale(1);opacity:.6} }
        @keyframes login-grid-drift { 0%{transform:translate(0,0)} 100%{transform:translate(60px,60px)} }
        @keyframes login-particles { 0%{transform:translateY(0) scale(1);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(-100vh) scale(0.5);opacity:0} }
        @keyframes login-heartbeat { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        @keyframes login-fade-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .login-card { animation: login-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both; }
        .signup-input { width:100%;height:48px;border-radius:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);padding:0 14px;font-size:14px;color:#fff;outline:none;transition:all 0.2s;font-family:inherit;box-sizing:border-box; }
        .signup-input:focus { border-color:rgba(224,25,63,0.4);background:rgba(255,255,255,0.08); }
        .signup-input::placeholder { color:rgba(255,255,255,0.2); }
        .social-btn:hover { background:rgba(255,255,255,0.1)!important;border-color:rgba(255,255,255,0.2)!important;transform:translateY(-1px); }
      `}</style>

      {/* Grid */}
      <div style={{ position:'absolute',inset:-60,opacity:0.04,backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',backgroundSize:'60px 60px',animation:'login-grid-drift 20s linear infinite' }} />

      {/* Orbs */}
      <div style={{ position:'absolute',top:'10%',right:'15%',width:350,height:350,borderRadius:'50%',background:'radial-gradient(circle,rgba(224,25,63,0.18) 0%,transparent 70%)',filter:'blur(60px)',animation:'login-orb-1 12s ease-in-out infinite' }} />
      <div style={{ position:'absolute',bottom:'10%',left:'10%',width:300,height:300,borderRadius:'50%',background:'radial-gradient(circle,rgba(224,25,63,0.12) 0%,transparent 70%)',filter:'blur(60px)',animation:'login-orb-2 15s ease-in-out infinite' }} />
      <div style={{ position:'absolute',top:'40%',left:'50%',width:200,height:200,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,100,130,0.1) 0%,transparent 70%)',filter:'blur(40px)',animation:'login-orb-3 10s ease-in-out infinite' }} />

      {/* Particles */}
      {[...Array(6)].map((_,i)=>(
        <div key={i} style={{ position:'absolute',left:`${15+i*14}%`,bottom:'-5%',width:3+(i%3),height:3+(i%3),borderRadius:'50%',background:`rgba(224,25,63,${0.15+(i%3)*0.1})`,animation:`login-particles ${8+i*2}s linear infinite`,animationDelay:`${i*1.5}s` }} />
      ))}

      {/* Back */}
      <button onClick={() => step === 2 ? setStep(1) : navigate('/')} style={{
        position:'absolute',top:28,left:28,display:'flex',alignItems:'center',gap:6,
        background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',
        borderRadius:10,padding:'8px 14px',color:'rgba(255,255,255,0.5)',fontSize:13,
        fontWeight:500,cursor:'pointer',transition:'all 0.2s',fontFamily:'inherit',zIndex:10,
      }}
        onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.1)';e.currentTarget.style.color='#fff';}}
        onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.color='rgba(255,255,255,0.5)';}}
      >
        <ArrowLeft size={14} /> {step === 2 ? 'Tilbage' : 'Til forsiden'}
      </button>

      {/* Card */}
      <div className="login-card" key={step} style={{ position:'relative',zIndex:2,width:'100%',maxWidth:420,padding:'0 20px' }}>
        <div style={{
          background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',
          borderRadius:24,padding:'44px 36px 36px',backdropFilter:'blur(20px)',
        }}>
          {/* Icon */}
          <div style={{ textAlign:'center',marginBottom:20 }}>
            <div style={{
              width:56,height:56,borderRadius:16,background:'rgba(224,25,63,0.12)',
              display:'inline-flex',alignItems:'center',justifyContent:'center',
              animation:'login-heartbeat 2s ease infinite',
            }}>
              <Heart size={26} color="#E0193F" fill="#E0193F" />
            </div>
          </div>

          <div style={{ textAlign:'center',marginBottom:28 }}>
            <div style={{ fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.12em',color:'#ff6b82',marginBottom:8 }}>Opret konto</div>
            <h1 style={{ fontSize:22,fontWeight:800,color:'#fff',letterSpacing:'-0.03em',margin:'0 0 6px' }}>
              {step === 1 ? 'Bliv støtter' : 'Opret med email'}
            </h1>
            <p style={{ fontSize:13,color:'rgba(255,255,255,0.45)',margin:0 }}>
              {step === 1 ? 'Vælg hvordan du vil oprette din konto' : 'Udfyld dine oplysninger herunder'}
            </p>
          </div>

          {/* STEP 1: Choose method */}
          {step === 1 && (
            <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
              <button className="social-btn" style={socialBtnStyle}>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.41l3.56-2.77z" fill="#FBBC05" transform="translate(1,0)"/>
                  <path d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.66 2.84c.87-2.6 3.3-4.16 6.16-4.16z" fill="#EA4335"/>
                </svg>
                Fortsæt med Google
              </button>

              <button className="social-btn" style={socialBtnStyle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Fortsæt med Apple
              </button>

              {/* Divider */}
              <div style={{ display:'flex',alignItems:'center',gap:12,margin:'8px 0' }}>
                <div style={{ flex:1,height:1,background:'rgba(255,255,255,0.06)' }} />
                <span style={{ fontSize:11,color:'rgba(255,255,255,0.2)' }}>eller</span>
                <div style={{ flex:1,height:1,background:'rgba(255,255,255,0.06)' }} />
              </div>

              <button className="social-btn" onClick={() => setStep(2)} style={{
                ...socialBtnStyle,
                background: 'rgba(224,25,63,0.08)',
                border: '1px solid rgba(224,25,63,0.15)',
                color: '#ff6b82',
              }}>
                <Mail size={18} color="#E0193F" />
                Fortsæt med email
              </button>
            </div>
          )}

          {/* STEP 2: Email form */}
          {step === 2 && (
            <div>
              {/* Email */}
              <div style={{ marginBottom:12 }}>
                <label style={{ display:'block',fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.4)',marginBottom:6 }}>Email</label>
                <input className="signup-input" type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="din@email.dk" autoFocus />
              </div>

              {/* Name row */}
              <div style={{ display:'flex',gap:10,marginBottom:12 }}>
                <div style={{ flex:1 }}>
                  <label style={{ display:'block',fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.4)',marginBottom:6 }}>Fornavn</label>
                  <input className="signup-input" value={form.fornavn} onChange={e=>update('fornavn',e.target.value)} placeholder="Dit fornavn" />
                </div>
                <div style={{ flex:1 }}>
                  <label style={{ display:'block',fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.4)',marginBottom:6 }}>Efternavn</label>
                  <input className="signup-input" value={form.efternavn} onChange={e=>update('efternavn',e.target.value)} placeholder="Dit efternavn" />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom:12 }}>
                <label style={{ display:'block',fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.4)',marginBottom:6 }}>Adgangskode</label>
                <div style={{ position:'relative' }}>
                  <input className="signup-input" type={showPw?'text':'password'} value={form.password} onChange={e=>update('password',e.target.value)} placeholder="Min. 8 tegn" style={{ paddingRight:44 }} />
                  <button onClick={()=>setShowPw(!showPw)} style={{ position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',padding:4,display:'flex' }}>
                    {showPw ? <EyeOff size={16} color="rgba(255,255,255,0.3)" /> : <Eye size={16} color="rgba(255,255,255,0.3)" />}
                  </button>
                </div>
              </div>

              {/* Confirm */}
              <div style={{ marginBottom:16 }}>
                <label style={{ display:'block',fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.4)',marginBottom:6 }}>Bekræft adgangskode</label>
                <input className="signup-input" type={showPw?'text':'password'} value={form.confirm} onChange={e=>update('confirm',e.target.value)} placeholder="Gentag adgangskode"
                  style={{ borderColor: pwMismatch ? 'rgba(239,68,68,0.5)' : undefined }}
                />
                {pwMismatch && <div style={{ fontSize:11,color:'#EF4444',marginTop:4 }}>Adgangskoderne matcher ikke</div>}
              </div>

              {/* Terms */}
              <div style={{ display:'flex',alignItems:'flex-start',gap:10,marginBottom:20 }}>
                <div onClick={()=>setAcceptTerms(!acceptTerms)} style={{
                  width:20,height:20,borderRadius:6,flexShrink:0,marginTop:1,
                  border:`1.5px solid ${acceptTerms?'#E0193F':'rgba(255,255,255,0.15)'}`,
                  background:acceptTerms?'#E0193F':'transparent',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  cursor:'pointer',transition:'all 0.15s',
                }}>
                  {acceptTerms && <Check size={12} color="#fff" strokeWidth={3} />}
                </div>
                <span style={{ fontSize:12,color:'rgba(255,255,255,0.35)',lineHeight:1.5 }}>
                  Jeg accepterer StøtMedHjertes{' '}
                  <span onClick={()=>navigate('/betingelser')} style={{ color:'#ff6b82',cursor:'pointer' }}>betingelser</span> og{' '}
                  <span onClick={()=>navigate('/privatlivspolitik')} style={{ color:'#ff6b82',cursor:'pointer' }}>privatlivspolitik</span>
                </span>
              </div>

              {/* Submit */}
              <button disabled={!canSubmit} style={{
                width:'100%',height:52,borderRadius:14,border:'none',
                background:canSubmit?'linear-gradient(135deg,#E0193F,#c8112e)':'rgba(255,255,255,0.06)',
                color:canSubmit?'#fff':'rgba(255,255,255,0.2)',
                fontSize:16,fontWeight:700,cursor:canSubmit?'pointer':'not-allowed',
                display:'flex',alignItems:'center',justifyContent:'center',gap:8,
                boxShadow:canSubmit?'0 4px 24px rgba(224,25,63,0.35)':'none',
                transition:'all 0.2s',fontFamily:'inherit',
              }}
                onMouseEnter={e=>{if(canSubmit){e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 32px rgba(224,25,63,0.45)';}}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=canSubmit?'0 4px 24px rgba(224,25,63,0.35)':'none';}}
              >
                <Heart size={16} fill={canSubmit?'#fff':'none'} /> Opret konto <ArrowRight size={15} />
              </button>
            </div>
          )}

          {/* Login link */}
          <div style={{ textAlign:'center',marginTop:20 }}>
            <span style={{ fontSize:13,color:'rgba(255,255,255,0.3)' }}>Har du allerede en konto? </span>
            <span onClick={()=>navigate('/login-stoetter')} style={{ fontSize:13,color:'#ff6b82',fontWeight:600,cursor:'pointer' }}>Log ind</span>
          </div>
        </div>

        {/* Trust */}
        <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:6,marginTop:20 }}>
          <ShieldCheck size={12} color="rgba(255,255,255,0.2)" />
          <span style={{ fontSize:11,color:'rgba(255,255,255,0.2)' }}>Sikker krypteret forbindelse</span>
        </div>
      </div>
    </div>
  );
}