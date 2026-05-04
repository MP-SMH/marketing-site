/**
 * ConsentModal v3 - Premium polish med rod CTA
 *
 * Design:
 *   - Slate-gradient baggrund matcher OpretForeningPage
 *   - Subtle teal radial-glow top-hojre
 *   - Gradient dividers (header, footer, section-headings)
 *   - X-ikon i header = eneste luk-handling
 *   - Full-wide rod CTA "Accepter vilkarene" (kun hvis onAccept provided)
 *
 * Props:
 *   isOpen, onClose, version (paakraevede)
 *   onAccept?: (consent_type) => void
 *   acceptLabel?: string (default 'Accepter vilkårene')
 */

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import { X, ArrowRight } from 'lucide-react';

const BRAND_RED = '#E0193F';
const BRAND_TEAL = '#0891B2';

export default function ConsentModal({
  isOpen,
  onClose,
  version,
  onAccept = null,
  acceptLabel = 'Accepter vilkårene',
}) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !version) return null;

  const formatDate = (iso) => {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleDateString('da-DK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleAccept = () => {
    if (onAccept && version) onAccept(version.consent_type);
    onClose();
  };

  // === Styles ===

  const backdropStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(15,23,42,0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    zIndex: 1000,
    animation: 'smh-modal-fade-in 200ms ease-out',
  };

  const dialogStyle = {
    position: 'relative',
    background: 'linear-gradient(135deg, rgba(15,23,42,0.96) 0%, rgba(30,41,59,0.96) 100%)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 18,
    boxShadow: '0 32px 80px rgba(0,0,0,0.65)',
    width: '100%',
    maxWidth: 560,
    maxHeight: '88vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: 'smh-modal-scale-in 220ms ease-out',
  };

  const glowStyle = {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 320,
    height: 320,
    background: `radial-gradient(circle, rgba(8,145,178,0.18) 0%, transparent 60%)`,
    pointerEvents: 'none',
    zIndex: 0,
  };

  const headerStyle = {
    position: 'relative',
    padding: '26px 32px 16px',
    flexShrink: 0,
    zIndex: 1,
  };

  const headerRowStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
  };

  const titleColStyle = { minWidth: 0, flex: 1 };

  const titleStyle = {
    margin: 0,
    fontSize: 20,
    fontWeight: 600,
    color: '#fff',
    lineHeight: 1.25,
    letterSpacing: '-0.02em',
  };

  const metaStyle = {
    marginTop: 8,
    paddingTop: 8,
    borderTop: '1px solid rgba(255,255,255,0.06)',
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  };

  const closeIconStyle = {
    flexShrink: 0,
    width: 34,
    height: 34,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.06)',
    color: 'rgba(255,255,255,0.7)',
    borderRadius: 10,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease',
  };

  const dividerStyle = {
    height: 1,
    margin: '0 32px',
    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
    flexShrink: 0,
  };

  const contentStyle = {
    padding: '22px 32px 28px',
    overflowY: 'auto',
    flex: 1,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14.5,
    lineHeight: 1.75,
    position: 'relative',
    zIndex: 1,
  };

  const footerStyle = {
    padding: '22px 32px 26px',
    background: 'rgba(8,15,30,0.65)',
    display: 'flex',
    justifyContent: 'center',
    flexShrink: 0,
    position: 'relative',
    zIndex: 1,
  };

  const ctaStyle = {
    width: '100%',
    height: 56,
    padding: '0 32px',
    background: BRAND_RED,
    color: '#fff',
    border: 'none',
    borderRadius: 14,
    fontSize: 17,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    boxShadow: '0 8px 32px rgba(224,25,63,0.55)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    letterSpacing: '0.01em',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  // Markdown styles
  const mdH1Style = { fontSize: 18, fontWeight: 600, color: '#fff', marginTop: 24, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', letterSpacing: '-0.01em' };
  const mdH2Style = { fontSize: 16, fontWeight: 600, color: '#fff', marginTop: 22, marginBottom: 10, paddingBottom: 6, borderBottom: '1px solid rgba(255,255,255,0.06)', letterSpacing: '-0.01em' };
  const mdH3Style = { fontSize: 14.5, fontWeight: 600, color: '#fff', marginTop: 18, marginBottom: 8 };
  const mdPStyle = { margin: '0 0 14px 0' };
  const mdUlStyle = { margin: '0 0 14px 0', paddingLeft: 22 };
  const mdOlStyle = { margin: '0 0 14px 0', paddingLeft: 22 };
  const mdLiStyle = { marginBottom: 6 };
  const mdAStyle = { color: BRAND_TEAL, textDecoration: 'underline' };
  const mdStrongStyle = { color: '#fff', fontWeight: 600 };
  const mdEmStyle = { fontStyle: 'italic' };
  const mdCodeStyle = {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: 13,
    background: 'rgba(255,255,255,0.06)',
    padding: '2px 7px',
    borderRadius: 4,
  };
  const mdHrStyle = { border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '24px 0' };
  const mdBlockquoteStyle = {
    borderLeft: `3px solid ${BRAND_TEAL}`,
    paddingLeft: 18,
    margin: '0 0 14px 0',
    color: 'rgba(255,255,255,0.7)',
    fontStyle: 'italic',
  };

  return createPortal(
    <>
      <style>{`
        @keyframes smh-modal-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes smh-modal-scale-in {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <div style={backdropStyle} onClick={handleBackdropClick} role="presentation">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-modal-title"
          style={dialogStyle}
        >
          <div style={glowStyle} aria-hidden="true" />

          <header style={headerStyle}>
            <div style={headerRowStyle}>
              <div style={titleColStyle}>
                <h2 id="consent-modal-title" style={titleStyle}>
                  {version.title}
                </h2>
                <div style={metaStyle}>
                  Version {version.version} · {formatDate(version.effective_from)}
                </div>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                style={closeIconStyle}
                aria-label="Luk"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <X size={18} />
              </button>
            </div>
          </header>

          <div style={dividerStyle} aria-hidden="true" />

          <div style={contentStyle}>
            <ReactMarkdown
              components={{
                h1: ({ node: _node, ...props }) => <h1 style={mdH1Style} {...props} />,
                h2: ({ node: _node, ...props }) => <h2 style={mdH2Style} {...props} />,
                h3: ({ node: _node, ...props }) => <h3 style={mdH3Style} {...props} />,
                p: ({ node: _node, ...props }) => <p style={mdPStyle} {...props} />,
                ul: ({ node: _node, ...props }) => <ul style={mdUlStyle} {...props} />,
                ol: ({ node: _node, ...props }) => <ol style={mdOlStyle} {...props} />,
                li: ({ node: _node, ...props }) => <li style={mdLiStyle} {...props} />,
                a: ({ node: _node, ...props }) => (
                  <a style={mdAStyle} target="_blank" rel="noopener noreferrer" {...props} />
                ),
                strong: ({ node: _node, ...props }) => <strong style={mdStrongStyle} {...props} />,
                em: ({ node: _node, ...props }) => <em style={mdEmStyle} {...props} />,
                code: ({ node: _node, ...props }) => <code style={mdCodeStyle} {...props} />,
                hr: ({ node: _node, ...props }) => <hr style={mdHrStyle} {...props} />,
                blockquote: ({ node: _node, ...props }) => <blockquote style={mdBlockquoteStyle} {...props} />,
              }}
            >
              {version.content_markdown}
            </ReactMarkdown>
          </div>

          {onAccept && (
            <>
              <div style={dividerStyle} aria-hidden="true" />
              <footer style={footerStyle}>
                <button
                  type="button"
                  onClick={handleAccept}
                  style={ctaStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(224,25,63,0.65)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(224,25,63,0.55)';
                  }}
                >
                  <span>{acceptLabel}</span>
                  <ArrowRight size={18} />
                </button>
              </footer>
            </>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
