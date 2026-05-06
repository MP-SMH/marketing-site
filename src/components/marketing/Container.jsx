import { forwardRef } from 'react';

/**
 * Container - centreret content-wrapper med max-bredde og horizontal padding.
 *
 * Anvendelse: Wrap content i en Section for at faa konsistent bredde paa
 * tvaers af marketing-site. Container haandterer kun horizontal layout -
 * vertikal padding ligger paa Section-niveau.
 *
 * Sizes:
 *   - default (1200px): de fleste sider, hero, content-grids
 *   - narrow (768px):   legal pages, focused tekst, FAQ-detaljer
 *   - wide (1536px):    fuld-bredde hero, dashboards, break-out content
 *
 * Props:
 *   - size: 'default' | 'narrow' | 'wide' (default: 'default')
 *   - as: HTML element tag (default: 'div')
 *   - className: ekstra Tailwind classes
 *   - children: indhold
 *
 * Eksempel:
 *   <Container size="default">
 *     <h2>Sektion-headline</h2>
 *     <p>Body content</p>
 *   </Container>
 */

const SIZE_CLASSES = {
  default: 'max-w-[1200px]',
  narrow:  'max-w-[768px]',
  wide:    'max-w-[1536px]',
};

const Container = forwardRef(function Container(
  {
    size = 'default',
    as: Component = 'div',
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.default;

  // Horizontal padding: 16px mobile, 24px desktop (matcher BRAND-TOKENS layout)
  const baseClasses = `${sizeClass} mx-auto px-4 md:px-6`;

  return (
    <Component ref={ref} className={`${baseClasses} ${className}`.trim()} {...rest}>
      {children}
    </Component>
  );
});

export default Container;
