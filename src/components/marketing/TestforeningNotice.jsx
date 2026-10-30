export default function TestforeningNotice() {
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
      Heartland United bruges kun til afprøvning. Journalnummer og dokumentgodkendelse
      afventer, og her kan du ikke give et rigtigt bidrag.
    </div>
  );
}
