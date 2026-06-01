// Tag - neutral metadata label.
export default function Tag({ children, icon, className = '' }) {
  return <span className={`mkt-tag ${className}`.trim()}>{icon}{children}</span>;
}
