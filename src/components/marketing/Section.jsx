import { forwardRef } from 'react';

/**
 * Section - wraps en side-sektion med baggrund + vertikal padding.
 *
 * Anvendelse: Marketing-pages bygges som en raekke af Sections.
 * Hver Section har sin egen baggrund (light/soft/dark) for visuel
 * alternation. Composer ikke automatisk Container - eksplicit
 * <Container> indeni for content-bredde.
 *
 * Variants (BRAND-TOKENS marketing palette):
 *   - light:  hvid bg (#FFFFFF), default body-text
 *   - soft:   #F9FAFB bg, alternation paa tvaers af sektioner
 *   - dark:   #0F172A bg + lys tekst, til hero og final-CTA
 *
 * Padding:
 *   - tight:     py-12 / py-16 (kompakte sektioner)
 *   - default:   py-16 / py-24 (standard)
 *   - generous:  py-20 / py-32 (hero, final CTA, statement-sektioner)
 *
 * Props:
 *   - variant: 'light' | 'soft' | 'dark' (default: 'light')
 *   - padding: 'tight' | 'default' | 'generous' (default: 'default')
 *   - id: optional anchor-id for in-page navigation
 *   - as: HTML element tag (default: 'section')
 *   - className: ekstra Tailwind classes (eks. relative for orbs/decoration)
 *   - children: indhold (typisk Container med content indeni)
 *
 * Eksempel:
 *   <Section variant="soft" id="how-it-works">
 *     <Container>
 *       <h2>Saadan virker det</h2>
 *       <ThreeStepsGrid />
 *     </Container>
 *   </Section>
 */

const VARIANT_CLASSES = {
  light: 'bg-mk-bg text-mk-body',
  soft:  'bg-mk-bg-soft text-mk-body',
  dark:  'bg-mk-bg-dark text-mk-inverse',
};

const PADDING_CLASSES = {
  tight:    'py-12 md:py-16',
  default:  'py-16 md:py-24',
  generous: 'py-20 md:py-32',
};

const Section = forwardRef(function Section(
  {
    variant = 'light',
    padding = 'default',
    id,
    as: Component = 'section',
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.light;
  const paddingClass = PADDING_CLASSES[padding] || PADDING_CLASSES.default;

  return (
    <Component
      ref={ref}
      id={id}
      className={`${variantClass} ${paddingClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
});

export default Section;
