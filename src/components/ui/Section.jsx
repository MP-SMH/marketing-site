import Container from './Container';
import Eyebrow from './Eyebrow';

// Section - reusable marketing section shell.
export default function Section({ children, eyebrow, title, subtitle, variant = 'light', centered = false, className = '', container = true, id }) {
  const content = (
    <>
      {title || subtitle || eyebrow ? (
        <div className={`mkt-section-head ${centered ? 'center' : ''}`}>
          {eyebrow !== false ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          {title ? <h2 className="mkt-section-title">{title}</h2> : null}
          {subtitle ? <p className="mkt-subtitle">{subtitle}</p> : null}
        </div>
      ) : null}
      {children}
    </>
  );
  return (
    <section id={id} className={`mkt-section mkt-section-${variant} ${className}`.trim()}>
      {container ? <Container>{content}</Container> : content}
    </section>
  );
}
