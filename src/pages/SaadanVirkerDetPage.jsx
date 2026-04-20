import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';
import HowItWorksSection from '../components/marketing/HowItWorksSection';
import ComplianceSection from '../components/marketing/ComplianceSection';

export default function SaadanVirkerDetPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <Navbar />
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '120px 32px 60px', textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          Sådan virker det
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
          Fra oprettelse til udbetaling. Alt automatisk.
        </p>
      </div>
      <HowItWorksSection />
      <ComplianceSection />
      <Footer />
    </div>
  );
}