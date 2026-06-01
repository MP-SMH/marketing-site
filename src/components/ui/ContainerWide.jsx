// ContainerWide - wide responsive wrapper for mockups/grids.
export default function ContainerWide({ children, className = '', ...props }) {
  return <div className={`mkt-container-wide ${className}`.trim()} {...props}>{children}</div>;
}
