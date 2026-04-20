import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';
import { Mail, MapPin, Clock } from 'lucide-react';

export default function KontaktPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <Navbar />
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '120px 32px 60px', textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          Kontakt os
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
          Vi svarer inden for 24 timer
        </p>
      </div>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '60px 20px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            { icon: Mail, label: 'Email', value: 'kontakt@stotmedhjerte.dk' },
            { icon: MapPin, label: 'Adresse', value: 'Hillerød, Danmark' },
            { icon: Clock, label: 'Svartid', value: 'Inden for 24 timer på hverdage' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20, background: '#F9FAFB', borderRadius: 14, border: '1px solid #EBEBEB' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <item.icon size={20} color="#E0193F" />
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}