export default function TestforeningNotice({ sandboxEnabled = false }) {
  return (
    <div
      role="status"
      style={{
        background: '#FFF5E8',
        border: '2px solid #B45309',
        borderRadius: 18,
        color: '#713F12',
        padding: '18px 20px',
        lineHeight: 1.6,
        margin: '0 0 24px',
      }}
    >
      <strong style={{ display: 'block', fontSize: 16, letterSpacing: '.04em' }}>TESTFORENING</strong>
      Heartland United bruges kun til afprøvning. TEST-HU-2026-10-30 er et internt testnummer, ikke en tilladelse fra Indsamlingsnævnet. {sandboxEnabled ? 'Kun MobilePays sandboxbetaling er åben; ingen rigtige penge overføres.' : 'Betaling er lukket.'}
    </div>
  );
}
