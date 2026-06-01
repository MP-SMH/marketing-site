// SurfaceProvider - applies red, teal or purple context tokens through CSS variables.
export default function SurfaceProvider({ surface = 'red', children, className = '', as: Component = 'div', ...props }) {
  return <Component className={`mkt-surface-${surface} ${className}`.trim()} {...props}>{children}</Component>;
}
