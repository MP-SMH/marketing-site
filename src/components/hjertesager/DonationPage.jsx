import React from 'react';
import { ArrowLeft, Heart, ShieldCheck, Lock, Check, CreditCard, X } from 'lucide-react';

const CATEGORY_COLORS = {
  'Fodbold': '#16a34a',
  'Gymnastik': '#7c3aed',
  'Håndbold': '#ea580c',
  'Svømmeklub': '#0284c7',
  'Kampsport': '#dc2626',
  'Handicap / Special': '#0891b2',
};

function getCatColor(type) {
  return CATEGORY_COLORS[type] || '#6B7280';
}

function formatDKK(n) {
  return n.toLocaleString('da-DK');
}

const PRESET_AMOUNTS = [1000, 2000, 3000, 5000, 7500, 10000];
const SUGGESTED_INDEX = 2;
const MIN_AMOUNT = 100;

export default function DonationPage({ campaign, onBack }) {
  const [selectedAmount, setSelectedAmount] = React.useState(null);
  const [customAmount, setCustomAmount] = React.useState('');
  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  const [tipPercent, setTipPercent] = React.useState(20);
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardExpiry, setCardExpiry] = React.useState('');
  const [cardCvc, setCardCvc] = React.useState('');
  const [cardName, setCardName] = React.useState('');
  const [amountError, setAmountError] = React.useState('');
  const [showNudge, setShowNudge] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const catColor = getCatColor(campaign.type);
  const initial = campaign.association.charAt(0).toUpperCase();
  const pct = Math.round((campaign.raised / campaign.goal) * 100);

  const rawAmount = selectedAmount || (customAmount ? Number(customAmount) : 0);
  const activeAmount = rawAmount >= MIN_AMOUNT ? rawAmount : 0;
  const tipAmount = activeAmount ? Math.round(activeAmount * tipPercent / 100) : 0;
  const donationToAssociation = activeAmount - tipAmount;
  const totalAmount = activeAmount;

  const images = campaign.images && campaign.images.length > 0
    ? campaign.images
    : [campaign.image].filter(Boolean);

  const handleCustomAmount = (val) => {
    setCustomAmount(val);
    setSelectedAmount(null);
    if (val && Number(val) < MIN_AMOUNT && Number(val) > 0) {
      setAmountError('Mindstebeløb er ' + formatDKK(MIN_AMOUNT) + ' kr.');
    } else {
      setAmountError('');
    }
  };

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const FONT = "system-ui, -apple-system, 'Segoe UI', 'Roboto', 'Ubuntu', 'Cantarell', 'Noto Sans', sans-serif";

  const paymentColors = {
    mobilepay: { border: '#5A78FF', bg: '#F0F3FF', check: '#5A78FF' },
    googlepay: { border: '#4285F4', bg: '#EEF3FF', check: '#4285F4' },
    applepay: { border: '#111827', bg: '#F3F4F6', check: '#111827' },
    card: { border: '#111827', bg: '#F3F4F6', check: '#111827' },
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFAFA',
      fontFamily: FONT,
    }}>
      {/* Header bar */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #F3F4F6',
        padding: '14px 20px',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onBack}
            style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'none', border: 'none', color: '#6B7280',
              fontSize: 14, cursor: 'pointer', padding: '4px',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#E0193F'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6B7280'; }}
          >
            <ArrowLeft size={18} />
          </button>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Støt denne hjertesag</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, color: '#9CA3AF', fontSize: 12 }}>
            <Lock size={12} />
            <span>Sikker betaling</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 20px 80px' }}>

        {/* Campaign card */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: 20,
          border: '1px solid #EBEBEB',
          display: 'flex', alignItems: 'center', gap: 16,
          marginBottom: 28,
        }}>
          {images.length > 0 ? (
            <img src={images[0]} alt="" style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
          ) : (
            <div style={{
              width: 64, height: 64, borderRadius: 12, flexShrink: 0,
              background: `linear-gradient(135deg, ${catColor}12, ${catColor}08)`,
              border: `1.5px solid ${catColor}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, fontWeight: 750, color: catColor,
            }}>{initial}</div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 2 }}>Du støtter</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>{campaign.title}</div>
            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Din støtte går til {campaign.association}</div>
          </div>
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
            <span style={{
              fontSize: 14, fontWeight: 800, color: '#E0193F',
              background: 'rgba(224,25,63,0.06)', padding: '2px 8px', borderRadius: 6,
            }}>{pct}%</span>
            <span style={{ fontSize: 11, color: '#6B7280' }}>{formatDKK(campaign.raised)} kr.</span>
          </div>
        </div>

        {/* Amount selection */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: 24,
          border: '1px solid #EBEBEB', marginBottom: 20,
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Vælg beløb</div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
            marginBottom: 16,
          }}>
            {PRESET_AMOUNTS.map((amount, i) => (
              <button
                key={amount}
                type="button"
                onClick={() => { setSelectedAmount(amount); setCustomAmount(''); setAmountError(''); }}
                style={{
                  height: 50, borderRadius: 12, border: '1.5px solid',
                  borderColor: selectedAmount === amount ? '#E0193F' : '#EBEBEB',
                  background: selectedAmount === amount ? 'rgba(224,25,63,0.04)' : '#fff',
                  color: selectedAmount === amount ? '#E0193F' : '#0F172A',
                  fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.15s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONT, position: 'relative',
                }}
                onMouseEnter={e => {
                  if (selectedAmount !== amount) {
                    e.currentTarget.style.borderColor = '#E0193F';
                    e.currentTarget.style.background = '#FFFBFB';
                  }
                }}
                onMouseLeave={e => {
                  if (selectedAmount !== amount) {
                    e.currentTarget.style.borderColor = '#EBEBEB';
                    e.currentTarget.style.background = '#fff';
                  }
                }}
              >
                <span>kr {formatDKK(amount)}</span>
                {i === SUGGESTED_INDEX && (
                  <span style={{
                    position: 'absolute', bottom: -10,
                    fontSize: 9, fontWeight: 700, color: '#15803d',
                    background: '#ECFDF5', border: '1px solid #A7F3D0',
                    padding: '1px 8px', borderRadius: 100,
                    display: 'flex', alignItems: 'center', gap: 3,
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                  }}>
                    <Heart size={8} fill="#15803d" color="#15803d" /> Foreslået
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Custom amount heading + input */}
          <div style={{ fontSize: 14, fontWeight: 600, color: '#6B7280', marginTop: 20, marginBottom: 8 }}>Eller indtast eget beløb (min. 100 kr.)</div>
          <div style={{
            border: '1.5px solid',
            borderColor: activeAmount > 0 ? '#E0193F' : (customAmount ? '#E0193F' : '#EBEBEB'),
            borderRadius: 12,
            background: activeAmount > 0 ? 'rgba(224,25,63,0.03)' : '#FAFAFA',
            padding: '14px 18px',
            marginTop: 20,
            display: 'flex', alignItems: 'center',
            transition: 'all 0.2s',
            cursor: 'text',
          }}>
            <span style={{
              fontSize: 28, fontWeight: 700,
              color: (activeAmount > 0 || customAmount) ? '#E0193F' : '#D1D5DB',
              marginRight: 12,
            }}>kr</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={selectedAmount ? formatDKK(selectedAmount) : customAmount}
              onChange={e => {
                const val = e.target.value.replace(/\D/g, '');
                setCustomAmount(val);
                setSelectedAmount(null);
                if (val && Number(val) < MIN_AMOUNT) {
                  setAmountError('Mindstebeløb er ' + formatDKK(MIN_AMOUNT) + ' kr.');
                } else {
                  setAmountError('');
                }
              }}
              onFocus={() => {
                if (selectedAmount) {
                  setCustomAmount(String(selectedAmount));
                  setSelectedAmount(null);
                }
              }}
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: 42, fontWeight: 800, color: '#111827',
                letterSpacing: '-0.02em',
                fontFamily: FONT,
                textAlign: 'right',
                opacity: activeAmount > 0 ? 1 : 0.2,
              }}
            />
          </div>
          {amountError && (
            <div style={{ fontSize: 12, color: '#DC2626', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span>⚠</span> {amountError}
            </div>
          )}
          {activeAmount > 0 && tipPercent > 0 && (
            <div style={{
              textAlign: 'right', fontSize: 13, color: '#6B7280', marginTop: 6,
            }}>
              Heraf {formatDKK(tipAmount)} kr. ({tipPercent}%) til StøtMedHjerte
            </div>
          )}

          {/* Recent donation nudge */}
          {showNudge && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginTop: 16,
              padding: '10px 14px', borderRadius: 10, background: '#F9FAFB',
            }}>
              <Heart size={16} fill="#9CA3AF" color="#9CA3AF" />
              <span style={{ fontSize: 13, color: '#6B7280' }}>
                <strong style={{ color: '#111827' }}>Sofie M.</strong> donerede DKK 500
              </span>
              <button onClick={() => setShowNudge(false)} style={{
                marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', padding: 2,
              }}>
                <X size={14} color="#9CA3AF" />
              </button>
            </div>
          )}
        </div>

        {/* Tip section */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: 24,
          border: '1px solid #EBEBEB', marginBottom: 20,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>Om din støtte</div>
          <p style={{ fontSize: 13, color: '#6B7280', margin: 0, lineHeight: 1.6 }}>
            80% af dit beløb går direkte til foreningen. 20% går til at drive og vedligeholde StøtMedHjerte platformen, så den forbliver gratis for alle foreninger.
          </p>
        </div>

        {/* Payment methods */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: 24,
          border: '1px solid #EBEBEB', marginBottom: 20,
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Betalingsmetode</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* MobilePay */}
            <button type="button" onClick={() => setPaymentMethod('mobilepay')} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              borderRadius: 12, border: '1.5px solid',
              borderColor: paymentMethod === 'mobilepay' ? paymentColors.mobilepay.border : '#EBEBEB',
              background: paymentMethod === 'mobilepay' ? paymentColors.mobilepay.bg : '#fff',
              cursor: 'pointer', transition: 'all 0.15s', width: '100%',
            }}>
              <svg width="44" height="30" viewBox="0 0 44 30">
                <rect width="44" height="30" rx="6" fill="#5A78FF"/>
                <text x="22" y="19" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700" fontFamily="system-ui">MobilePay</text>
              </svg>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>MobilePay</span>
              {paymentMethod === 'mobilepay' && <Check size={18} color={paymentColors.mobilepay.check} style={{ marginLeft: 'auto' }} />}
            </button>

            {/* Google Pay */}
            <button type="button" onClick={() => setPaymentMethod('googlepay')} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              borderRadius: 12, border: '1.5px solid',
              borderColor: paymentMethod === 'googlepay' ? paymentColors.googlepay.border : '#EBEBEB',
              background: paymentMethod === 'googlepay' ? paymentColors.googlepay.bg : '#fff',
              cursor: 'pointer', transition: 'all 0.15s', width: '100%',
            }}>
              <svg width="44" height="30" viewBox="0 0 44 30">
                <rect width="44" height="30" rx="6" fill="#fff" stroke="#DADCE0"/>
                <text x="10" y="19" fill="#4285F4" fontSize="10" fontWeight="700" fontFamily="system-ui">G</text>
                <text x="20" y="19" fill="#EA4335" fontSize="9" fontWeight="600" fontFamily="system-ui">P</text>
                <text x="27" y="19" fill="#FBBC05" fontSize="9" fontWeight="600" fontFamily="system-ui">a</text>
                <text x="33" y="19" fill="#4285F4" fontSize="9" fontWeight="600" fontFamily="system-ui">y</text>
              </svg>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>Google Pay</span>
              {paymentMethod === 'googlepay' && <Check size={18} color={paymentColors.googlepay.check} style={{ marginLeft: 'auto' }} />}
            </button>

            {/* Apple Pay */}
            <button type="button" onClick={() => setPaymentMethod('applepay')} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              borderRadius: 12, border: '1.5px solid',
              borderColor: paymentMethod === 'applepay' ? paymentColors.applepay.border : '#EBEBEB',
              background: paymentMethod === 'applepay' ? paymentColors.applepay.bg : '#fff',
              cursor: 'pointer', transition: 'all 0.15s', width: '100%',
            }}>
              <svg width="44" height="30" viewBox="0 0 44 30">
                <rect width="44" height="30" rx="6" fill="#000"/>
                <text x="22" y="19" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600" fontFamily="system-ui"> Pay</text>
              </svg>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>Apple Pay</span>
              {paymentMethod === 'applepay' && <Check size={18} color={paymentColors.applepay.check} style={{ marginLeft: 'auto' }} />}
            </button>

            {/* Card */}
            <button type="button" onClick={() => setPaymentMethod('card')} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              borderRadius: 12, border: '1.5px solid',
              borderColor: paymentMethod === 'card' ? paymentColors.card.border : '#EBEBEB',
              background: paymentMethod === 'card' ? paymentColors.card.bg : '#fff',
              cursor: 'pointer', transition: 'all 0.15s', width: '100%',
            }}>
              <div style={{
                width: 44, height: 30, borderRadius: 6, background: paymentMethod === 'card' ? '#111827' : '#F3F4F6',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                transition: 'all 0.15s',
              }}>
                <CreditCard size={18} color={paymentMethod === 'card' ? '#fff' : '#6B7280'} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>Betalingskort</span>
              {paymentMethod === 'card' && <Check size={18} color={paymentColors.card.check} style={{ marginLeft: 'auto' }} />}
            </button>
          </div>

          {/* Card input fields */}
          {paymentMethod === 'card' && (
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                placeholder="Navn på kort"
                value={cardName}
                onChange={e => setCardName(e.target.value)}
                style={{
                  height: 48, borderRadius: 10, border: '1.5px solid #EBEBEB',
                  padding: '0 14px', fontSize: 14, fontFamily: FONT,
                  outline: 'none', width: '100%', boxSizing: 'border-box',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = '#111827'; }}
                onBlur={e => { e.currentTarget.style.borderColor = '#EBEBEB'; }}
              />
              <input
                placeholder="Kortnummer"
                value={cardNumber}
                onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                style={{
                  height: 48, borderRadius: 10, border: '1.5px solid #EBEBEB',
                  padding: '0 14px', fontSize: 14, fontFamily: FONT,
                  outline: 'none', width: '100%', boxSizing: 'border-box',
                  letterSpacing: '0.05em',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = '#111827'; }}
                onBlur={e => { e.currentTarget.style.borderColor = '#EBEBEB'; }}
              />
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  placeholder="MM/ÅÅ"
                  value={cardExpiry}
                  onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                  style={{
                    flex: 1, height: 48, borderRadius: 10, border: '1.5px solid #EBEBEB',
                    padding: '0 14px', fontSize: 14, fontFamily: FONT,
                    outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#111827'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#EBEBEB'; }}
                />
                <input
                  placeholder="CVC"
                  value={cardCvc}
                  onChange={e => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  style={{
                    width: 100, height: 48, borderRadius: 10, border: '1.5px solid #EBEBEB',
                    padding: '0 14px', fontSize: 14, fontFamily: FONT,
                    outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#111827'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#EBEBEB'; }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Anonymous */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '16px 24px',
          border: '1px solid #EBEBEB', marginBottom: 24,
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <div
              onClick={() => setIsAnonymous(!isAnonymous)}
              style={{
                width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                border: `2px solid ${isAnonymous ? '#E0193F' : '#D1D5DB'}`,
                background: isAnonymous ? '#E0193F' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s', cursor: 'pointer',
              }}
            >
              {isAnonymous && <Check size={14} color="#fff" strokeWidth={3} />}
            </div>
            <span style={{ fontSize: 14, color: '#374151' }}>Vis ikke mit navn offentligt på hjertesagen</span>
          </label>
        </div>

        {/* Order summary */}
        {activeAmount > 0 && (
          <div style={{
            background: '#fff', borderRadius: 16, padding: 24,
            border: '1px solid #EBEBEB', marginBottom: 24,
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Din betaling</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: '#6B7280' }}>Til foreningen</span>
              <span style={{ fontSize: 14, color: '#111827', fontWeight: 600 }}>kr {formatDKK(donationToAssociation)}</span>
            </div>
            {tipPercent > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: '#6B7280' }}>Til StøtMedHjerte ({tipPercent}%)</span>
                <span style={{ fontSize: 14, color: '#111827', fontWeight: 600 }}>kr {formatDKK(tipAmount)}</span>
              </div>
            )}
            <div style={{ borderTop: '1px solid #F3F4F6', marginTop: 8, paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>Total</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>kr {formatDKK(totalAmount)}</span>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <button
          type="button"
          disabled={!activeAmount || !paymentMethod}
          style={{
            width: '100%', height: 56, borderRadius: 14, border: 'none',
            background: activeAmount && paymentMethod
              ? 'linear-gradient(135deg, #E0193F 0%, #c8112e 100%)'
              : '#E5E7EB',
            color: activeAmount && paymentMethod ? '#fff' : '#9CA3AF',
            fontSize: 17, fontWeight: 700, cursor: activeAmount && paymentMethod ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            fontFamily: FONT,
            boxShadow: activeAmount && paymentMethod ? '0 4px 20px rgba(224,25,63,0.3)' : 'none',
            transition: 'all 0.2s',
            marginBottom: 20,
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={e => {
            if (activeAmount && paymentMethod) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(224,25,63,0.35)';
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = activeAmount && paymentMethod ? '0 4px 20px rgba(224,25,63,0.3)' : 'none';
          }}
        >
          <Heart size={18} fill={activeAmount && paymentMethod ? '#fff' : 'none'} />
          {activeAmount ? `Støt nu - ${formatDKK(totalAmount)} kr.` : 'Støt nu'}
        </button>

        {/* Trust section */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 12,
          padding: '20px', borderRadius: 14, background: '#fff',
          border: '1px solid #EBEBEB', marginBottom: 16,
        }}>
          <ShieldCheck size={24} color="#15803d" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 4 }}>StøtMedHjerte beskytter din donation</div>
            <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
              Vi garanterer fuld refusion i op til et år i det sjældne tilfælde, at der opstår problemer.
            </div>
          </div>
        </div>

        {/* Terms */}
        <div style={{
          fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginTop: 8, lineHeight: 1.6,
        }}>
          Ved at klikke "Støt nu" accepterer du StøtMedHjertes{' '}
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>betingelser</span> og{' '}
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>privatlivspolitik</span>.
          {' '}Læs mere om <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>priser og gebyrer</span>.
        </div>
      </div>
    </div>
  );
}