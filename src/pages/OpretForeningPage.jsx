import { useState } from 'react';
import { Users, ArrowLeft, ShieldCheck, ArrowRight, Mail, Phone, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OpretForeningPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ foreningsnavn: '', cvr: '', kontaktperson: '', email: '', telefon: '' });

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));
  const canSubmit = form.foreningsnavn && form.kontaktperson && form.email;

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
        @keyframes login-fade-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .login-card { animation: login-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both; }
        .signup-input { width:100%;height:48px;border-radius:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);padding:0 14px;font-size:14px;color:#fff;outline:none;transition:all 0.2s;font-family:inherit;box-sizing:border-box; }
        .signup-input:focus { border-color:rgba(59,130,246,0.4);background:rgba(255,255,255,0.08); }
        .signup-input::placeholder { color:rgba(255,255,255,0.2); }
        .social-btn:hover { background:rgba(255,255,255,0.1)!important;border-color:rgba(255,255,255,0.2)!important;transform:translateY(-1px); }
      `}</style>

      {/* Grid */}
      <div style={{ position:'absolute',inset:-60,opacity:0.04,backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',backgroundSize:'60px 60px',animation:'login-grid-drift 20s linear infinite' }} />

      {/* Blue orbs */}
      <div style={{ position:'absolute',top:'10%',right:'15%',width:350,height:350,borderRadius:'50%',background:'radial-gradient(circle,rgba(59,130,246,0.18) 0%,transparent 70%)',filter:'blur(60px)',animation:'login-orb-1 12s ease-in-out infinite' }} />
      <div style={{ position:'absolute',bottom:'10%',left:'10%',width:300,height:300,borderRadius:'50%',background:'radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 70%)',filter:'blur(60px)',animation:'login-orb-2 15s ease-in-out infinite' }} />
      <div style={{ position:'absolute',top:'40%',left:'50%',width:200,height:200,borderRadius:'50%',background:'radial-gradient(circle,rgba(96,165,250,0.1) 0%,transparent 70%)',filter:'blur(40px)',animation:'login-orb-3 10s ease-in-out infinite' }} />

      {/* Particles */}
      {[...Array(6)].map((_,i)=>(
        <div key={i} style={{ position:'absolute',left:`${15+i*14}%`,bottom:'-5%',width:3+(i%3),height:3+(i%3),borderRadius:'50%',background:`rgba(59,130,246,${0.15+(i%3)*0.1})`,animation:`login-particles ${8+i*2}s linear infinite`,animationDelay:`${i*1.5}s` }} />
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
              width:56,height:56,borderRadius:16,background:'rgba(59,130,246,0.12)',
              display:'inline-flex',alignItems:'center',justifyContent:'center',
            }}>
              <Users size={26} color="#3B82F6" />
            </div>
          </div>

          <div style={{ textAlign:'center',marginBottom:28 }}>
            <div style={{ fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.12em',color:'#60a5fa',marginBottom:8 }}>Forening</div>
            <h1 style={{ fontSize:22,fontWeight:800,color:'#fff',letterSpacing:'-0.03em',margin:'0 0 6px' }}>
              {step === 1 ? 'Kom i gang gratis' : 'Fortæl os om din forening'}
            </h1>
            <p style={{ fontSize:13,color:'rgba(255,255,255,0.45)',margin:0 }}>
              {step === 1 ? 'Vælg hvordan du vil komme i gang' : 'Vi kontakter dig inden for 24 timer'}
            </p>
          </div>

          {/* STEP 1: Choose method */}
          {step === 1 && (
            <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
              <button className="social-btn" onClick={() => navigate('/book-moede')} style={{
                ...socialBtnStyle,
                background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.15)',
                color: '#60a5fa',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Book et gratis møde (15 min.)
              </button>

              {/* Divider */}
              <div style={{ display:'flex',alignItems:'center',gap:12,margin:'8px 0' }}>
                <div style={{ flex:1,height:1,background:'rgba(255,255,255,0.06)' }} />
                <span style={{ fontSize:11,color:'rgba(255,255,255,0.2)' }}>eller</span>
                <div style={{ flex:1,height:1,background:'rgba(255,255,255,0.06)' }} />
              </div>

              <button className="social-btn" onClick={() => setStep(2)} style={socialBtnStyle}>
                <Mail size={18} color="rgba(255,255,255,0.5)" />
                Udfyld formular
              </button>

              {/* Info box */}
              <div style={{
                marginTop: 12, padding: '14px 16px', borderRadius: 12,
                background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.1)',
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#60a5fa', marginBottom: 4 }}>Helt gratis at starte</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
                  Ingen opstartsomkostninger. 80% af alle donationer og abonnementer går direkte til din forening.
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Forenings-formular */}
          {step === 2 && (
            <div>
              {/* Foreningsnavn */}
              <div style={{ marginBottom:12 }}>
                <label style={{ display:'block',fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.4)',marginBottom:6 }}>Foreningsnavn *</label>
                <input className="signup-input" value={form.foreningsnavn} onChange={e=>update('foreningsnavn',e.target.value)} placeholder="Fx Hillerød Svømmeklub" autoFocus />
              </div>

              {/* CVR */}
              <div style={{ marginBottom:12 }}>
                <label style={{ display:'block',fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.4)',marginBottom:6 }}>CVR-nummer (valgfrit)</label>
                <input className="signup-input" value={form.cvr} onChange={e=>update('cvr',e.target.value.replace(/\D/g,'').slice(0,8))} placeholder="12345678" inputMode="numeric" />
              </div>

              {/* Kontaktperson */}
              <div style={{ marginBottom:12 }}>
                <label style={{ display:'block',fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.4)',marginBottom:6 }}>Kontaktperson *</label>
                <input className="signup-input" value={form.kontaktperson} onChange={e=>update('kontaktperson',e.target.value)} placeholder="Fulde navn" />
              </div>

              {/* Email + Telefon */}
              <div style={{ display:'flex',gap:10,marginBottom:16 }}>
                <div style={{ flex:1 }}>
                  <label style={{ display:'block',fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.4)',marginBottom:6 }}>Email *</label>
                  <input className="signup-input" type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="kontakt@forening.dk" />
                </div>
                <div style={{ flex:1 }}>
                  <label style={{ display:'block',fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.4)',marginBottom:6 }}>Telefon</label>
                  <input className="signup-input" type="tel" value={form.telefon} onChange={e=>update('telefon',e.target.value)} placeholder="12 34 56 78" />
                </div>
              </div>

              {/* What happens next */}
              <div style={{
                padding: '14px 16px', borderRadius: 12, marginBottom: 20,
                background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.1)',
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#60a5fa', marginBottom: 6 }}>Hvad sker der nu?</div>
                <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
                  {[
                    'Vi ringer dig op inden 24 timer',
                    'Vi gennemgår platformen sammen (15 min.)',
                    'Du er klar til at modtage støtte',
                  ].map((t,i) => (
                    <div key={i} style={{ display:'flex',alignItems:'center',gap:8,fontSize:11,color:'rgba(255,255,255,0.35)' }}>
                      <div style={{ width:18,height:18,borderRadius:'50%',background:'rgba(59,130,246,0.15)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:9,fontWeight:700,color:'#60a5fa' }}>{i+1}</div>
                      {t}
                    </div>
                  ))}
                </div>
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
                Send henvendelse <ArrowRight size={15} />
              </button>
            </div>
          )}

          {/* Login link */}
          <div style={{ textAlign:'center',marginTop:20 }}>
            <span style={{ fontSize:13,color:'rgba(255,255,255,0.3)' }}>Allerede oprettet? </span>
            <span onClick={()=>navigate('/login-forening')} style={{ fontSize:13,color:'#60a5fa',fontWeight:600,cursor:'pointer' }}>Log ind</span>
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