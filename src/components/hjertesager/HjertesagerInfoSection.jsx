import { Heart, ShoppingBag, Gift } from 'lucide-react';

export default function HjertesagerInfoSection() {
  const steps = [
    {
      icon: Heart,
      title: 'Find en hjertesag',
      desc: 'Udforsk foreninger og vælg en hjertesag du brænder for at støtte.',
    },
    {
      icon: ShoppingBag,
      title: 'Shop som normalt',
      desc: 'Køb de produkter du vil have i vores shop eller donér direkte. Ingen merpris for dig.',
    },
    {
      icon: Gift,
      title: 'Foreningen modtager støtte',
      desc: 'Uanset om du handler eller donerer, går din støtte direkte til den valgte forening.',
    },
  ];

  return (
    <div
      id="how-it-works"
      className="hjerte-fade-up"
      style={{
        background: '#E5E7EB',
        padding: '56px 0',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        width: '100vw',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{
          fontSize: 22,
          fontWeight: 700,
          color: '#0F172A',
          marginBottom: 8,
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          Sådan fungerer det
        </h2>
        <p style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 32 }}>
          Tre enkle trin - ingen ekstra omkostninger for dig.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 32,
        }}>
          {steps.map((step, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}>
                <step.icon size={24} color="#E0193F" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, margin: 0, maxWidth: 260, marginLeft: 'auto', marginRight: 'auto' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}