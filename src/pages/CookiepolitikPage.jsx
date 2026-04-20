import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';

export default function CookiepolitikPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <Navbar />
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '120px 32px 60px', textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          Cookiepolitik
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
          Information om brug af cookies
        </p>
      </div>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '60px 20px 80px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Hvad er cookies</h2>
        <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
          Cookies er små tekstfiler der gemmes på din enhed når du besøger vores hjemmeside. Vi bruger cookies til at forbedre din oplevelse og forstå hvordan siden bruges.
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Nødvendige cookies</h2>
        <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
          Disse cookies er nødvendige for at hjemmesiden kan fungere korrekt, herunder login og betalingssikkerhed.
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Analytiske cookies</h2>
        <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
          Vi bruger anonymiserede analyseværktøjer til at forstå hvordan besøgende bruger hjemmesiden, så vi kan forbedre den.
        </p>
      </div>
      <Footer />
    </div>
  );
}