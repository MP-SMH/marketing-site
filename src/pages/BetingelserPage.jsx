import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';

export default function BetingelserPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <Navbar />
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '120px 32px 60px', textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          Betingelser
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
          Vilkår for brug af StøtMedHjerte
        </p>
      </div>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '60px 20px 80px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>1. Generelt</h2>
        <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
          StøtMedHjerte drives af Heartland Collective ApS. Ved brug af platformen accepterer du disse vilkår. Platformen formidler donationer, abonnementer og merchandise-salg mellem støtter og foreninger.
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>2. For foreninger</h2>
        <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
          Foreninger der benytter platformen skal være MitID- og CVR-verificerede. Alle indsamlinger skal overholde dansk lovgivning, herunder regler fra Indsamlingsnævnet. Udbetaling sker automatisk d. 28. hver måned.
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>3. For støtter</h2>
        <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
          Donationer er endelige og kan ikke refunderes medmindre der er tale om dokumenteret svindel. Støtter kan til enhver tid opsige abonnementer via deres profil.
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>4. Priser og gebyrer</h2>
        <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
          Det er gratis for foreninger at oprette sig. Ved donationer og abonnementer fordeles beløbet med 80% til foreningen og 20% til StøtMedHjerte. Ved merchandise-salg modtager foreningen 32,75% af nettoprofitten.
        </p>
      </div>
      <Footer />
    </div>
  );
}