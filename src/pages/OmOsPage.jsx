import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';
import { Heart, Target, Users } from 'lucide-react';

export default function OmOsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <Navbar />
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '120px 32px 60px', textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          Om StøtMedHjerte
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
          Fremtidens fundraising for danske foreninger
        </p>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Vores vision</h2>
        <p style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.7, marginBottom: 40 }}>
          StøtMedHjerte blev grundlagt med en simpel mission: at gøre fundraising nemt, lovligt og automatisk for danske foreninger. Vi tror på, at frivillige skal bruge deres tid på det de brænder for, ikke på administration og bogføring.
        </p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[
            { icon: Heart, title: 'Foreninger først', desc: 'Alt vi bygger starter med spørgsmålet: gør dette livet nemmere for foreningen?' },
            { icon: Target, title: 'Automatisering', desc: 'Fra donation til udbetaling. Ingen manuel indgang, ingen fejl, ingen forsinkelser.' },
            { icon: Users, title: 'Fællesskab', desc: 'Vi forbinder støtter med foreninger. Gennemsigtigt, sikkert og med hjertet.' },
          ].map((item, i) => (
            <div key={i} style={{ flex: '1 1 220px', padding: 24, background: '#F9FAFB', borderRadius: 16, border: '1px solid #EBEBEB' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <item.icon size={22} color="#E0193F" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}