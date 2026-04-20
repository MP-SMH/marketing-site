import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';
import { Calendar, Clock, Video, Check } from 'lucide-react';

export default function BookModePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <Navbar />
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '120px 32px 60px', textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          Book et gratis møde
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
          15 minutter. Vi viser dig præcis hvordan StøtMedHjerte virker for jeres forening.
        </p>
      </div>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '60px 20px 80px' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
          {[
            { icon: Clock, text: '15 min. online møde' },
            { icon: Video, text: 'Via Google Meet eller Zoom' },
            { icon: Check, text: 'Helt uforpligtende' },
          ].map((item, i) => (
            <div key={i} style={{
              flex: '1 1 180px', display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 18px', background: '#F9FAFB', borderRadius: 12, border: '1px solid #EBEBEB',
            }}>
              <item.icon size={18} color="#E0193F" />
              <span style={{ fontSize: 14, fontWeight: 500, color: '#0F172A' }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{
          background: '#F9FAFB', borderRadius: 16, border: '1px solid #EBEBEB',
          padding: '60px 20px', textAlign: 'center',
        }}>
          <Calendar size={40} color="#E0193F" style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Vælg en tid</h3>
          <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>Cal.com booking-widget indlejres her</p>
          <a href="https://cal.com" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#E0193F', color: '#fff', padding: '14px 28px', borderRadius: 12,
            fontSize: 15, fontWeight: 600, textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(224,25,63,0.3)',
          }}>
            Book et møde <Calendar size={16} />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}