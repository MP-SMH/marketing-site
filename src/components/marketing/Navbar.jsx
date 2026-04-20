import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Menu, X, Search, ChevronDown, ArrowRight, ShieldCheck, Gift, Users, ShoppingBag, Calendar, HelpCircle, BookOpen, Mail, Eye, CreditCard, Repeat, Target, FileText } from 'lucide-react';

const DROPDOWN_DATA = {
  stoet: {
    label: 'Støt nu',
    sections: [
      {
        title: 'Giv din støtte',
        items: [
          { icon: 'Heart', label: 'Aktive hjertesager', desc: 'Udforsk indsamlinger du kan støtte', href: '/hjertesager' },
          { icon: 'Users', label: 'Find en forening', desc: 'Se alle tilknyttede foreninger', href: '/foreninger' },
          { icon: 'Repeat', label: 'Bliv fast støtter', desc: 'Månedligt abonnement fra 100 kr.', href: '/fast-stoette' },
        ],
      },
      {
        title: 'Merchandise',
        items: [
          { icon: 'ShoppingBag', label: 'Shop merchandise', desc: 'Køb og støt automatisk', href: 'https://shop.stotmedhjerte.dk', external: true },
        ],
      },
    ],
  },
  foreninger: {
    label: 'For foreninger',
    sections: [
      {
        title: 'Kom i gang',
        items: [
          { icon: 'Target', label: 'Sådan virker det', desc: 'Se hele processen fra start til udbetaling', href: '/saadan-virker-det' },
          { icon: 'CreditCard', label: 'Priser', desc: 'Gennemsigtig prissætning uden skjulte gebyrer', href: '/priser' },
          { icon: 'Calendar', label: 'Book et gratis møde', desc: '15 min. Vi viser dig præcis hvordan', href: '/book-moede' },
        ],
      },
      {
        title: 'Allerede forening?',
        items: [
          { icon: 'Eye', label: 'Se platform demo', desc: 'Prøv dashboardet uden at oprette', href: '/saadan-virker-det' },
          { icon: 'FileText', label: 'Dokumenter og aftaler', desc: 'Alt juridisk på ét sted', href: '/om-os' },
        ],
      },
    ],
  },
  om: {
    label: 'Om os',
    sections: [
      {
        title: 'StøtMedHjerte',
        items: [
          { icon: 'Heart', label: 'Vores vision', desc: 'Fremtidens fundraising for danske foreninger', href: '/om-os' },
          { icon: 'ShieldCheck', label: 'Sikkerhed og tillid', desc: '100% lovlig indsamling. Garanteret.', href: '/saadan-virker-det' },
          { icon: 'HelpCircle', label: 'FAQ', desc: 'Svar på de mest stillede spørgsmål', href: '/faq' },
        ],
      },
      {
        title: 'Ressourcer',
        items: [
          { icon: 'BookOpen', label: 'Blog', desc: 'Guides, tips og nyheder', href: '/blog' },
          { icon: 'Mail', label: 'Kontakt os', desc: 'Vi svarer inden for 24 timer', href: '/kontakt' },
        ],
      },
    ],
  },
};

const iconMap = { Heart, Users, ShoppingBag, Repeat, Target, CreditCard, Calendar, Eye, FileText, ShieldCheck, HelpCircle, BookOpen, Mail, Gift };

function DropdownMenu({ data, isOpen, onClose, navigate }) {
  if (!isOpen) return null;
  return (
    <div
      onMouseLeave={onClose}
      style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        paddingTop: 12,
        zIndex: 1001,
      }}
    >
      <div style={{
        background: '#fff',
        borderRadius: 16,
        border: '1px solid #EBEBEB',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
        padding: 8,
        display: 'flex',
        gap: 4,
        animation: 'mkt-feed-in 0.2s ease',
        minWidth: 520,
      }}>
        {data.sections.map((section, si) => (
          <div key={si} style={{
            flex: 1,
            padding: '16px 12px',
            borderRight: si < data.sections.length - 1 ? '1px solid #F3F4F6' : 'none',
          }}>
            <div style={{
              fontSize: 18, fontWeight: 700, color: '#0F172A',
              letterSpacing: '-0.02em',
              padding: '0 12px 8px', marginBottom: 8,
              borderBottom: '2px solid #F3F4F6',
            }}>{section.title}</div>
            {section.items.map((item, ii) => {
              const Icon = iconMap[item.icon] || Heart;
              return (
                <a
                key={ii}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={item.external ? onClose : (e) => { e.preventDefault(); onClose(); navigate(item.href); }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    padding: '10px 12px', borderRadius: 10,
                    textDecoration: 'none', transition: 'background 0.15s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#F9FAFB'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: '#FEF2F2',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={18} color="#E0193F" />
                  </div>
                  <div>
                    <div style={{
                      fontSize: 13, fontWeight: 600, color: '#111827',
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      {item.label}
                      {item.external && <ArrowRight size={12} color="#9CA3AF" />}
                    </div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2, lineHeight: 1.4 }}>
                      {item.desc}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openDropdown = (key) => {
    clearTimeout(timeoutRef.current);
    setActiveDropdown(key);
  };

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const textColor = scrolled ? '#0F172A' : '#fff';
  const mutedColor = scrolled ? '#6B7280' : 'rgba(255,255,255,0.75)';

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #EBEBEB' : '1px solid transparent',
        transition: 'all 0.3s ease',
        fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      }}>
        <div style={{
          maxWidth: 1200, width: '100%', padding: '0 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <Heart size={24} color="#E0193F" fill="#E0193F" style={{ animation: 'mkt-heartbeat 2s ease infinite' }} />
            <span style={{ fontSize: 18, fontWeight: 700, color: textColor, letterSpacing: '-0.02em', transition: 'color 0.3s' }}>
              StøtMedHjerte
            </span>
          </div>

          {/* Desktop Links with Dropdowns */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="mkt-nav-links">
            {Object.entries(DROPDOWN_DATA).map(([key, data]) => (
              <div
                key={key}
                style={{ position: 'relative' }}
                onMouseEnter={() => openDropdown(key)}
                onMouseLeave={closeDropdown}
              >
                <button style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em',
                  color: activeDropdown === key ? (scrolled ? '#E0193F' : '#fff') : mutedColor,
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '8px 14px', borderRadius: 8,
                  transition: 'all 0.2s', fontFamily: 'inherit',
                }}>
                  {data.label}
                  <ChevronDown size={14} style={{
                    transition: 'transform 0.2s',
                    transform: activeDropdown === key ? 'rotate(180deg)' : 'rotate(0)',
                  }} />
                </button>
                <DropdownMenu
                  data={data}
                  isOpen={activeDropdown === key}
                  onClose={() => setActiveDropdown(null)}
                  navigate={navigate}
                />
              </div>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="mkt-nav-ctas">
            <button
              onClick={() => setSearchOpen(true)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 8,
                display: 'flex', alignItems: 'center', borderRadius: 8,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = scrolled ? '#F3F4F6' : 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              aria-label="Søg"
            >
              <Search size={18} color={mutedColor} />
            </button>
            <div style={{ position: 'relative' }}
              onMouseEnter={() => openDropdown('login')}
              onMouseLeave={closeDropdown}
            >
              <button style={{
                background: 'transparent', border: '1.5px solid',
                borderColor: scrolled ? '#111827' : 'rgba(255,255,255,0.35)',
                color: textColor, borderRadius: 10, padding: '8px 20px',
                fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}>Log ind</button>
              {activeDropdown === 'login' && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: 8,
                  background: '#fff', borderRadius: 14, padding: 8,
                  boxShadow: '0 16px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)',
                  minWidth: 220, zIndex: 100,
                  animation: 'mkt-feed-in 0.2s ease',
                }}>
                  <button onClick={() => { setActiveDropdown(null); navigate('/login-stoetter'); }} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10, width: '100%',
                    padding: '10px 12px', borderRadius: 10, border: 'none',
                    background: 'transparent', cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'inherit', transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#F9FAFB'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      background: 'rgba(224,25,63,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Heart size={14} color="#E0193F" />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Som støtter</div>
                      <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>Se dine donationer og abonnementer</div>
                    </div>
                  </button>
                  <button onClick={() => { setActiveDropdown(null); navigate('/login-forening'); }} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10, width: '100%',
                    padding: '10px 12px', borderRadius: 10, border: 'none',
                    background: 'transparent', cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'inherit', transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#F9FAFB'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      background: 'rgba(59,130,246,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Users size={14} color="#3B82F6" />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Som forening</div>
                      <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>Administrer din forening og hjertesager</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
            <div style={{ position: 'relative' }}
              onMouseEnter={() => openDropdown('start')}
              onMouseLeave={closeDropdown}
            >
              <button style={{
                background: '#E0193F', border: 'none', color: '#fff',
                borderRadius: 10, padding: '8px 20px',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                fontFamily: 'inherit',
                boxShadow: '0 2px 8px rgba(224,25,63,0.3)',
              }}>Start gratis</button>
              {activeDropdown === 'start' && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: 8,
                  background: '#fff', borderRadius: 14, padding: 8,
                  boxShadow: '0 16px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)',
                  minWidth: 260, zIndex: 100,
                  animation: 'mkt-feed-in 0.2s ease',
                }}>
                  <button onClick={() => { setActiveDropdown(null); navigate('/opret-stoetter'); }} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10, width: '100%',
                    padding: '10px 12px', borderRadius: 10, border: 'none',
                    background: 'transparent', cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'inherit', transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#F9FAFB'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      background: 'rgba(224,25,63,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Heart size={14} color="#E0193F" fill="#E0193F" />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Jeg vil støtte</div>
                      <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>Opret konto og støt foreninger med donationer eller abonnement</div>
                    </div>
                  </button>
                  <div style={{ height: 1, background: '#F3F4F6', margin: '4px 12px' }} />
                  <button onClick={() => { setActiveDropdown(null); navigate('/opret-forening'); }} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10, width: '100%',
                    padding: '10px 12px', borderRadius: 10, border: 'none',
                    background: 'transparent', cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'inherit', transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#F9FAFB'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      background: 'rgba(59,130,246,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Users size={14} color="#3B82F6" />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Jeg er en forening</div>
                      <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>Gratis opstart, book et uforpligtende møde på 15 min.</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="mkt-nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', padding: 4 }}
            aria-label="Menu"
          >
            {menuOpen ? <X size={26} color={textColor} /> : <Menu size={26} color={textColor} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999, background: '#0F172A',
          overflowY: 'auto', paddingTop: 80, paddingBottom: 40,
          animation: 'mkt-feed-in 0.3s ease',
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position: 'absolute', top: 22, right: 32, background: 'none', border: 'none', cursor: 'pointer',
          }}><X size={28} color="#fff" /></button>

          <div style={{ maxWidth: 400, margin: '0 auto', padding: '0 32px' }}>
            {Object.entries(DROPDOWN_DATA).map(([key, data]) => (
              <div key={key} style={{ marginBottom: 32 }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16,
                }}>{data.label}</div>
                {data.sections.map((section, si) => (
                  <div key={si}>
                    {section.items.map((item, ii) => {
                      const Icon = iconMap[item.icon] || Heart;
                      return (
                        <a
                          key={ii}
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          onClick={item.external ? () => setMenuOpen(false) : (e) => { e.preventDefault(); setMenuOpen(false); navigate(item.href); }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 14,
                            padding: '12px 0', textDecoration: 'none',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                          }}
                        >
                          <Icon size={18} color="#E0193F" />
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{item.label}</div>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{item.desc}</div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', marginBottom: 4, paddingLeft: 4 }}>Start gratis</div>
              <button onClick={() => { setMenuOpen(false); navigate('/opret-stoetter'); }} style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                background: '#E0193F', border: 'none', color: '#fff', borderRadius: 14,
                padding: '14px 16px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>
                <Heart size={16} color="#fff" fill="#fff" />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Jeg vil støtte</div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>Donationer eller abonnement</div>
                </div>
              </button>
              <button onClick={() => { setMenuOpen(false); navigate('/opret-forening'); }} style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)', color: '#fff', borderRadius: 14,
                padding: '14px 16px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>
                <Users size={16} color="#60a5fa" />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Jeg er en forening</div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>Book et gratis møde</div>
                </div>
              </button>

              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', marginTop: 12, marginBottom: 4, paddingLeft: 4 }}>Log ind</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => { setMenuOpen(false); navigate('/login-stoetter'); }} style={{
                  flex: 1, background: 'transparent', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff',
                  borderRadius: 12, padding: '12px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                }}>Som støtter</button>
                <button onClick={() => { setMenuOpen(false); navigate('/login-forening'); }} style={{
                  flex: 1, background: 'transparent', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff',
                  borderRadius: 12, padding: '12px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                }}>Som forening</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 120,
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
          onClick={() => setSearchOpen(false)}
        >
          <div style={{
            background: '#fff', borderRadius: 16, padding: 24, width: '90%', maxWidth: 560,
            boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Search size={20} color="#9CA3AF" />
              <input
                autoFocus
                placeholder="Søg efter foreninger, hjertesager..."
                style={{
                  flex: 1, border: 'none', outline: 'none', fontSize: 17, fontFamily: 'inherit', color: '#0F172A',
                }}
              />
              <button onClick={() => setSearchOpen(false)} style={{
                background: '#F3F4F6', border: 'none', borderRadius: 8, padding: '6px 12px',
                fontSize: 12, color: '#6B7280', cursor: 'pointer', fontFamily: 'inherit',
              }}>ESC</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mkt-nav-links, .mkt-nav-ctas { display: none !important; }
          .mkt-nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}