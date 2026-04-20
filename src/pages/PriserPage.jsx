import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';
import PricingSection from '../components/marketing/PricingSection';

export default function PriserPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <Navbar />
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '120px 32px 60px', textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          Priser
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
          Gennemsigtig prissætning. Ingen skjulte gebyrer.
        </p>
      </div>
      <PricingSection />
      <Footer />
    </div>
  );
}