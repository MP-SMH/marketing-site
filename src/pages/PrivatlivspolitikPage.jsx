import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';

export default function PrivatlivspolitikPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <Navbar />
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '120px 32px 60px', textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          Privatlivspolitik
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
          Sådan håndterer vi dine data
        </p>
      </div>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '60px 20px 80px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Dataansvarlig</h2>
        <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
          Heartland Collective ApS er dataansvarlig for behandling af personoplysninger i forbindelse med brug af StøtMedHjerte.
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Hvilke oplysninger indsamler vi</h2>
        <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
          Vi indsamler navn, email og betalingsoplysninger i forbindelse med donationer og abonnementer. For foreninger indsamler vi desuden CVR-nummer og kontaktoplysninger.
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Dine rettigheder</h2>
        <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
          Du har ret til indsigt, berigtigelse og sletning af dine personoplysninger. Kontakt os på kontakt@stotmedhjerte.dk.
        </p>
      </div>
      <Footer />
    </div>
  );
}