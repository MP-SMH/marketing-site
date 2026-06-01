// Eyebrow - uppercase section label.
export default function Eyebrow({ children = '🇩🇰 Verificeret fundraising for danske foreninger', className = '' }) {
  return <div className={`mkt-eyebrow ${className}`.trim()}>{children}</div>;
}
