// Pill - compact semantic label with optional icon.
export default function Pill({ children, variant = 'default', icon, className = '' }) {
  const cls = ['mkt-pill', variant !== 'default' ? `mkt-pill-${variant}` : '', className].filter(Boolean).join(' ');
  return <span className={cls}>{icon}{children}</span>;
}
