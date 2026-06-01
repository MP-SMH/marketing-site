// Chip - selectable/compact token.
export default function Chip({ children, icon, selected = false, className = '', ...props }) {
  return <span className={`mkt-chip ${selected ? 'is-selected' : ''} ${className}`.trim()} {...props}>{icon}{children}</span>;
}
