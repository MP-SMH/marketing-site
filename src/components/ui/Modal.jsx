import { useEffect } from 'react';
import Button from './Button';

// Modal - accessible dialog overlay.
export default function Modal({ open, onClose, title, children, actions }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="mkt-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="mkt-modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(e) => e.stopPropagation()}>
        <div className="mkt-card-header"><h2 style={{ margin: 0 }}>{title}</h2><Button variant="icon" aria-label="Luk" onClick={onClose}>×</Button></div>
        {children}
        {actions ? <div style={{ marginTop: 22 }}>{actions}</div> : null}
      </div>
    </div>
  );
}
