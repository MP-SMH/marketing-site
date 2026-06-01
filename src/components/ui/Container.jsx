// Container - standard responsive max-width wrapper.
export default function Container({ children, className = '', ...props }) {
  return <div className={`mkt-container ${className}`.trim()} {...props}>{children}</div>;
}
