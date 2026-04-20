import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';
import { Mail, MessageCircle, FileText, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SupportPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <Navbar />
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '120px 32px 60px', textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          Support
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
          Vi er her for at hjælpe
        </p>
      </div>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '60px 20px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { icon: Mail, title: 'Email support', desc: 'Skriv til kontakt@stotmedhjerte.dk', sub: 'Svar inden for 24 timer', href: null },
            { icon: MessageCircle, title: 'FAQ', desc: 'Find svar på de mest stillede spørgsmål', sub: 'Tilgængelig 24/7', href: '/faq' },
            { icon: FileText, title: 'Dokumentation', desc: 'Guides og vejledninger til platformen', sub: 'Kommer snart', href: null },
            { icon: Clock, title: 'Åbningstider', desc: 'Mandag til fredag, 9:00 til 16:00', sub: 'Dansk tid (CET)', href: null },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: 24, background: '#F9FAFB', borderRadius: 16, border: '1px solid #EBEBEB',
              cursor: item.href ? 'pointer' : 'default',
              transition: 'all 0.15s',
            }}
              onClick={() => item.href && navigate(item.href)}
              onMouseEnter={e => { if (item.href) { e.currentTarget.style.borderColor = '#E0193F'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#EBEBEB'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14, background: '#FEF2F2',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <item.icon size={22} color="#E0193F" />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: '#6B7280' }}>{item.desc}</div>
                <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}