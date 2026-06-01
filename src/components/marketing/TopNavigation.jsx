/**
 * TopNavigation.jsx (v6)
 *
 * - Logo: ren Elza Round Variable + ™ tekst, INGEN heart-icon
 * - Helt transparent over hero (over hero section, no glass)
 * - Solid white ved scroll (>40px)
 * - Mega-dropdowns: For foreninger / For støttere / Om os (med sub-pages)
 * - Login + Start gratis dropdowns
 * - Mobile drawer
 */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu, X, ArrowRight, ChevronDown, Users, Heart, ShieldCheck,
  CreditCard, Calendar, BookOpen, MessageCircle, FileText,
  Activity, Target, Repeat, Search,
} from 'lucide-react';

const FORENINGER_DROPDOWN = [
  { icon: Users, label: 'Forenings-hub', sub: 'Alt for foreninger samlet', route: '/foreninger' },
  { icon: Activity, label: 'Sådan virker det', sub: 'Tre enkle skridt til opstart', route: '/saadan-virker-det' },
  { icon: CreditCard, label: 'Priser og fordeling', sub: '80% / 32,75% klart forklaret', route: '/priser' },
  { icon: ShieldCheck, label: 'Sikkerhed og compliance', sub: 'GDPR, KYC, Indsamlingsnævnet', route: '/sikkerhed' },
  { icon: Calendar, label: 'Book et gratis møde', sub: '30 minutter, ingen forpligtelse', route: '/book-moede' },
];

const FORENINGSTYPER_DROPDOWN = [
  { label: 'Fodboldklub', route: '/forening/fodbold' },
  { label: 'Håndboldklub', route: '/forening/haandbold' },
  { label: 'Gymnastikforening', route: '/forening/gymnastik' },
  { label: 'Svømmeklub', route: '/forening/svoemmning' },
  { label: 'Løbeklub', route: '/forening/loeb' },
];

const STOETTER_DROPDOWN = [
  { icon: Search, label: 'Find en forening', sub: 'Hjertesager der søger støtte', route: '/hjertesager' },
  { icon: Repeat, label: 'Bliv fast støtter', sub: 'Månedlig binding, stop når som helst', route: '/fast-stoette' },
  { icon: Heart, label: 'For støttere', sub: 'Sådan virker støtte gennem SMH', route: '/stotter' },
];

const OM_OS_DROPDOWN = [
  { icon: Users, label: 'Om StøtMedHjerte', sub: 'Mission, hold og historie', route: '/om-os' },
  { icon: BookOpen, label: 'Blog', sub: 'Indsigter om dansk fundraising', route: '/blog' },
  { icon: MessageCircle, label: 'FAQ', sub: 'Svar på de mest stillede spørgsmål', route: '/faq' },
  { icon: FileText, label: 'Support', sub: 'Hjælp og dokumentation', route: '/support' },
  { icon: MessageCircle, label: 'Kontakt', sub: 'Skriv eller ring til os', route: '/kontakt' },
];

export default function TopNavigation() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    const onEscape = (e) => { if (e.key === 'Escape') setOpenDropdown(null); };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  const goTo = (route) => {
    navigate(route);
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (which) => {
    setOpenDropdown(openDropdown === which ? null : which);
  };

  return (
    <>
      <header
        className={`mkt-nav ${scrolled ? 'is-scrolled' : 'is-transparent'}`}
        ref={navRef}
      >
        <div className="mkt-nav-inner">
          <button
            className="mkt-nav-logo"
            onClick={() => goTo('/')}
            type="button"
            aria-label="StøtMedHjerte forside"
          >
            <span className="mkt-nav-logo-text">
              StøtMedHjerte<sup className="mkt-nav-logo-tm">™</sup>
            </span>
          </button>

          <nav className="mkt-nav-links" aria-label="Primær navigation">
            {/* For foreninger mega-dropdown */}
            <div className="mkt-nav-link-wrap">
              <button
                className={`mkt-nav-link ${openDropdown === 'foreninger' ? 'is-active' : ''}`}
                onClick={() => toggleDropdown('foreninger')}
                type="button"
                aria-expanded={openDropdown === 'foreninger'}
                aria-haspopup="true"
              >
                For foreninger
                <ChevronDown
                  size={13}
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: openDropdown === 'foreninger' ? 'rotate(180deg)' : 'rotate(0)',
                  }}
                />
              </button>
              {openDropdown === 'foreninger' && (
                <div className="mkt-nav-mega" role="menu">
                  <div className="mkt-nav-mega-col">
                    <div className="mkt-nav-mega-label">Platform</div>
                    {FORENINGER_DROPDOWN.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <button
                          key={item.route}
                          className="mkt-nav-mega-item"
                          onClick={() => goTo(item.route)}
                          type="button"
                          role="menuitem"
                        >
                          <div className="mkt-nav-mega-icon">
                            <ItemIcon size={16} color="#E0193F" aria-hidden="true" />
                          </div>
                          <div>
                            <div className="mkt-nav-mega-title">{item.label}</div>
                            <div className="mkt-nav-mega-sub">{item.sub}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mkt-nav-mega-col">
                    <div className="mkt-nav-mega-label">Foreningstyper</div>
                    {FORENINGSTYPER_DROPDOWN.map((item) => (
                      <button
                        key={item.route}
                        className="mkt-nav-mega-item-simple"
                        onClick={() => goTo(item.route)}
                        type="button"
                        role="menuitem"
                      >
                        <span>{item.label}</span>
                        <ArrowRight size={12} aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* For støttere */}
            <div className="mkt-nav-link-wrap">
              <button
                className={`mkt-nav-link ${openDropdown === 'stoettere' ? 'is-active' : ''}`}
                onClick={() => toggleDropdown('stoettere')}
                type="button"
                aria-expanded={openDropdown === 'stoettere'}
                aria-haspopup="true"
              >
                For støttere
                <ChevronDown
                  size={13}
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: openDropdown === 'stoettere' ? 'rotate(180deg)' : 'rotate(0)',
                  }}
                />
              </button>
              {openDropdown === 'stoettere' && (
                <div className="mkt-nav-dropdown" role="menu">
                  {STOETTER_DROPDOWN.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.route}
                        className="mkt-nav-mega-item"
                        onClick={() => goTo(item.route)}
                        type="button"
                        role="menuitem"
                      >
                        <div className="mkt-nav-mega-icon">
                          <ItemIcon size={16} color="#E0193F" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="mkt-nav-mega-title">{item.label}</div>
                          <div className="mkt-nav-mega-sub">{item.sub}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Om os */}
            <div className="mkt-nav-link-wrap">
              <button
                className={`mkt-nav-link ${openDropdown === 'omos' ? 'is-active' : ''}`}
                onClick={() => toggleDropdown('omos')}
                type="button"
                aria-expanded={openDropdown === 'omos'}
                aria-haspopup="true"
              >
                Om os
                <ChevronDown
                  size={13}
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: openDropdown === 'omos' ? 'rotate(180deg)' : 'rotate(0)',
                  }}
                />
              </button>
              {openDropdown === 'omos' && (
                <div className="mkt-nav-dropdown" role="menu">
                  {OM_OS_DROPDOWN.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.route}
                        className="mkt-nav-mega-item"
                        onClick={() => goTo(item.route)}
                        type="button"
                        role="menuitem"
                      >
                        <div className="mkt-nav-mega-icon">
                          <ItemIcon size={16} color="#E0193F" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="mkt-nav-mega-title">{item.label}</div>
                          <div className="mkt-nav-mega-sub">{item.sub}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          <div className="mkt-nav-actions">
            {/* Log ind dropdown */}
            <div className="mkt-nav-dropdown-wrap">
              <button
                className={`mkt-nav-cta mkt-nav-cta-ghost ${openDropdown === 'login' ? 'is-active' : ''}`}
                onClick={() => toggleDropdown('login')}
                aria-expanded={openDropdown === 'login'}
                aria-haspopup="true"
                type="button"
              >
                Log ind
                <ChevronDown
                  size={13}
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: openDropdown === 'login' ? 'rotate(180deg)' : 'rotate(0)',
                  }}
                />
              </button>
              {openDropdown === 'login' && (
                <div className="mkt-nav-dropdown mkt-nav-dropdown-right" role="menu">
                  <button
                    className="mkt-nav-mega-item"
                    onClick={() => goTo('/login-forening')}
                    type="button"
                    role="menuitem"
                  >
                    <div className="mkt-nav-mega-icon">
                      <Users size={16} color="#E0193F" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="mkt-nav-mega-title">Log ind som forening</div>
                      <div className="mkt-nav-mega-sub">Adgang til foreningens dashboard</div>
                    </div>
                  </button>
                  <button
                    className="mkt-nav-mega-item"
                    onClick={() => goTo('/login-stoetter')}
                    type="button"
                    role="menuitem"
                  >
                    <div className="mkt-nav-mega-icon" style={{ background: 'rgba(124,58,237,0.10)' }}>
                      <Heart size={16} color="#7C3AED" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="mkt-nav-mega-title">Log ind som støtter</div>
                      <div className="mkt-nav-mega-sub">Se dine bidrag og kvitteringer</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Start gratis dropdown */}
            <div className="mkt-nav-dropdown-wrap">
              <button
                className={`mkt-nav-cta mkt-nav-cta-primary ${openDropdown === 'signup' ? 'is-active' : ''}`}
                onClick={() => toggleDropdown('signup')}
                aria-expanded={openDropdown === 'signup'}
                aria-haspopup="true"
                type="button"
              >
                Start gratis
                <ChevronDown
                  size={13}
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: openDropdown === 'signup' ? 'rotate(180deg)' : 'rotate(0)',
                  }}
                />
              </button>
              {openDropdown === 'signup' && (
                <div className="mkt-nav-dropdown mkt-nav-dropdown-right" role="menu">
                  <button
                    className="mkt-nav-mega-item"
                    onClick={() => goTo('/opret-forening')}
                    type="button"
                    role="menuitem"
                  >
                    <div className="mkt-nav-mega-icon">
                      <Users size={16} color="#E0193F" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="mkt-nav-mega-title">Opret som forening</div>
                      <div className="mkt-nav-mega-sub">Modtag støtte fra medlemmer</div>
                    </div>
                  </button>
                  <button
                    className="mkt-nav-mega-item"
                    onClick={() => goTo('/opret-stoetter')}
                    type="button"
                    role="menuitem"
                  >
                    <div className="mkt-nav-mega-icon" style={{ background: 'rgba(124,58,237,0.10)' }}>
                      <Heart size={16} color="#7C3AED" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="mkt-nav-mega-title">Opret som støtter</div>
                      <div className="mkt-nav-mega-sub">Find foreninger at støtte</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            className="mkt-nav-burger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Luk menu' : 'Åbn menu'}
            aria-expanded={mobileOpen}
            type="button"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`mkt-nav-drawer ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen}>
        <nav className="mkt-nav-drawer-inner" aria-label="Mobil navigation">
          <div className="mkt-nav-drawer-section">
            <div className="mkt-nav-drawer-section-label">For foreninger</div>
            {[...FORENINGER_DROPDOWN, ...FORENINGSTYPER_DROPDOWN.map(t => ({ icon: Target, label: t.label, route: t.route }))].map((item) => (
              <button
                key={item.route}
                className="mkt-nav-drawer-link"
                onClick={() => goTo(item.route)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mkt-nav-drawer-section">
            <div className="mkt-nav-drawer-section-label">For støttere</div>
            {STOETTER_DROPDOWN.map((item) => (
              <button
                key={item.route}
                className="mkt-nav-drawer-link"
                onClick={() => goTo(item.route)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mkt-nav-drawer-section">
            <div className="mkt-nav-drawer-section-label">Om os</div>
            {OM_OS_DROPDOWN.map((item) => (
              <button
                key={item.route}
                className="mkt-nav-drawer-link"
                onClick={() => goTo(item.route)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mkt-nav-drawer-section">
            <div className="mkt-nav-drawer-section-label">Log ind</div>
            <button className="mkt-nav-drawer-link" onClick={() => goTo('/login-forening')} type="button">Som forening</button>
            <button className="mkt-nav-drawer-link" onClick={() => goTo('/login-stoetter')} type="button">Som støtter</button>
          </div>

          <div className="mkt-nav-drawer-section">
            <div className="mkt-nav-drawer-section-label">Opret konto</div>
            <button
              className="mkt-nav-cta mkt-nav-cta-primary mkt-nav-drawer-primary"
              onClick={() => goTo('/opret-forening')}
              type="button"
            >
              Start gratis som forening
              <ArrowRight size={14} />
            </button>
            <button
              className="mkt-nav-cta mkt-nav-cta-primary mkt-nav-drawer-primary"
              onClick={() => goTo('/opret-stoetter')}
              type="button"
              style={{ marginTop: 8, background: 'linear-gradient(135deg, #7C3AED, #A78BFA)' }}
            >
              Opret som støtter
              <ArrowRight size={14} />
            </button>
          </div>
        </nav>
      </div>

      <style>{`
        .mkt-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 0;
          transition: background 0.30s ease, backdrop-filter 0.30s ease, border-color 0.30s ease, padding 0.30s ease, box-shadow 0.30s ease;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          border-bottom: 1px solid transparent;
        }

        /* TRANSPARENT — over hero */
        .mkt-nav.is-transparent {
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        /* SOLID WHITE — when scrolled */
        .mkt-nav.is-scrolled {
          padding: 12px 0;
          background: #fff;
          border-bottom-color: #E5E7EB;
          box-shadow: 0 1px 0 rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.04);
        }

        .mkt-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        /* Logo: pure text Elza Round */
        .mkt-nav-logo {
          display: inline-flex;
          align-items: center;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .mkt-nav-logo-text {
          font-family: 'Elza Round Variable', 'Elza Round', system-ui, -apple-system, 'Segoe UI', sans-serif;
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.05em;
          white-space: nowrap;
          position: relative;
          color: #fff;
          transition: color 0.30s ease;
        }

        .mkt-nav.is-scrolled .mkt-nav-logo-text {
          color: #0F172A;
        }

        .mkt-nav-logo-tm {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0;
          margin-left: 2px;
          color: rgba(255, 255, 255, 0.55);
          vertical-align: super;
          line-height: 0;
          transition: color 0.30s ease;
        }

        .mkt-nav.is-scrolled .mkt-nav-logo-tm {
          color: rgba(15, 23, 42, 0.55);
        }

        .mkt-nav-links {
          display: none;
          flex: 1;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        .mkt-nav-link-wrap {
          position: relative;
        }

        .mkt-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 14px;
          background: transparent;
          border: none;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.005em;
          color: rgba(255, 255, 255, 0.92);
          cursor: pointer;
          border-radius: 8px;
          transition: color 0.20s ease, background 0.20s ease;
          white-space: nowrap;
        }

        .mkt-nav-link:hover,
        .mkt-nav-link.is-active {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }

        .mkt-nav.is-scrolled .mkt-nav-link {
          color: #475569;
        }

        .mkt-nav.is-scrolled .mkt-nav-link:hover,
        .mkt-nav.is-scrolled .mkt-nav-link.is-active {
          color: #0F172A;
          background: #F8FAFC;
        }

        .mkt-nav-actions {
          display: none;
          align-items: center;
          gap: 8px;
        }

        .mkt-nav-dropdown-wrap {
          position: relative;
        }

        .mkt-nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0 16px;
          height: 40px;
          border-radius: 10px;
          font-family: inherit;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: -0.005em;
          cursor: pointer;
          transition: transform 0.20s ease, box-shadow 0.20s ease, background 0.20s ease, border-color 0.20s ease, color 0.20s ease;
          white-space: nowrap;
        }

        .mkt-nav-cta-ghost {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.20);
        }

        .mkt-nav-cta-ghost:hover,
        .mkt-nav-cta-ghost.is-active {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.45);
        }

        .mkt-nav.is-scrolled .mkt-nav-cta-ghost {
          color: #0F172A;
          border-color: #E5E7EB;
        }

        .mkt-nav.is-scrolled .mkt-nav-cta-ghost:hover,
        .mkt-nav.is-scrolled .mkt-nav-cta-ghost.is-active {
          background: #F8FAFC;
          border-color: #CBD5E1;
        }

        .mkt-nav-cta-primary {
          background: #E0193F;
          color: #fff;
          border: none;
          box-shadow: 0 4px 14px rgba(224, 25, 63, 0.30);
        }

        .mkt-nav-cta-primary:hover,
        .mkt-nav-cta-primary.is-active {
          transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(224, 25, 63, 0.42);
          background: #C8112F;
        }

        /* Dropdowns / mega-menu */
        .mkt-nav-dropdown,
        .mkt-nav-mega {
          position: absolute;
          top: calc(100% + 12px);
          left: 0;
          padding: 8px;
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          box-shadow: 0 16px 48px rgba(15, 23, 42, 0.14), 0 4px 12px rgba(15, 23, 42, 0.06);
          animation: mkt-nav-drop 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
          z-index: 1001;
        }

        .mkt-nav-dropdown {
          min-width: 320px;
        }

        .mkt-nav-mega {
          display: grid;
          grid-template-columns: 320px 220px;
          gap: 8px;
          min-width: 560px;
        }

        .mkt-nav-mega-col {
          padding: 8px;
        }

        .mkt-nav-mega-label {
          padding: 4px 10px 12px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #94A3B8;
        }

        .mkt-nav-dropdown-right {
          left: auto;
          right: 0;
        }

        @keyframes mkt-nav-drop {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mkt-nav-mega-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px 12px;
          background: transparent;
          border: none;
          border-radius: 10px;
          font-family: inherit;
          text-align: left;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .mkt-nav-mega-item:hover {
          background: #F8FAFC;
        }

        .mkt-nav-mega-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(224, 25, 63, 0.10);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .mkt-nav-mega-title {
          font-size: 14px;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.015em;
        }

        .mkt-nav-mega-sub {
          font-size: 12px;
          color: #64748B;
          margin-top: 1px;
          letter-spacing: -0.005em;
        }

        .mkt-nav-mega-item-simple {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 10px 12px;
          background: transparent;
          border: none;
          border-radius: 8px;
          font-family: inherit;
          font-size: 13.5px;
          font-weight: 500;
          color: #334155;
          letter-spacing: -0.005em;
          text-align: left;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .mkt-nav-mega-item-simple:hover {
          background: #F8FAFC;
          color: #E0193F;
        }

        .mkt-nav-mega-item-simple svg {
          opacity: 0.4;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }

        .mkt-nav-mega-item-simple:hover svg {
          opacity: 1;
          transform: translateX(2px);
        }

        .mkt-nav-burger {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.20);
          border-radius: 10px;
          color: #fff;
          cursor: pointer;
          transition: background 0.20s ease, color 0.20s ease, border-color 0.20s ease;
        }

        .mkt-nav.is-scrolled .mkt-nav-burger {
          color: #0F172A;
          border-color: #E5E7EB;
        }

        .mkt-nav-burger:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .mkt-nav.is-scrolled .mkt-nav-burger:hover {
          background: #F8FAFC;
        }

        /* Mobile drawer */
        .mkt-nav-drawer {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: #fff;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease;
          overflow-y: auto;
        }

        .mkt-nav-drawer.is-open {
          opacity: 1;
          pointer-events: auto;
        }

        .mkt-nav-drawer-inner {
          padding: 80px 20px 40px;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .mkt-nav-drawer-section {
          padding-top: 22px;
          margin-top: 22px;
          border-top: 1px solid #E5E7EB;
        }

        .mkt-nav-drawer-section:first-child {
          padding-top: 0;
          margin-top: 0;
          border-top: none;
        }

        .mkt-nav-drawer-section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #94A3B8;
          margin-bottom: 12px;
          padding: 0 4px;
        }

        .mkt-nav-drawer-link {
          display: block;
          width: 100%;
          padding: 14px 16px;
          background: transparent;
          border: none;
          color: #0F172A;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          border-radius: 10px;
          transition: background 0.20s ease;
          letter-spacing: -0.005em;
        }

        .mkt-nav-drawer-link:hover {
          background: #F8FAFC;
        }

        .mkt-nav-drawer-primary {
          width: 100%;
          height: 52px;
          justify-content: center;
          font-size: 15px;
          padding: 0 22px;
        }

        @media (min-width: 1024px) {
          .mkt-nav-links { display: flex; }
          .mkt-nav-actions { display: flex; }
          .mkt-nav-burger { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-nav,
          .mkt-nav-link,
          .mkt-nav-cta,
          .mkt-nav-drawer,
          .mkt-nav-drawer-link,
          .mkt-nav-dropdown,
          .mkt-nav-mega {
            transition: none;
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
