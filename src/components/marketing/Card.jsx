import { forwardRef } from 'react';

/**
 * Card - styled wrapper med 3 varianter (BRAND-TOKENS card-system).
 *
 * Card er en simpel wrapper - content composeres frit indeni.
 * Slot-pattern undgaaet for at give max fleksibilitet (icon + headline +
 * body + key-points + CTAs i forskellige rakkefolger paa forskellige sider).
 *
 * Variants (per BRAND-TOKENS Visual Hierarchy Rules):
 *   - primary:   white bg + brand-red border 1.5px + shadow-md
 *                Brug: KEY-feature highlight, hjertesager-cards i sektion 5,
 *                Hero CTA-zone, "anbefalet" pricing tier
 *   - secondary: white bg + neutral border 1px + shadow-sm
 *                Brug: regular feature cards, audience-split cards,
 *                differentiator cards, trust-cards
 *   - soft:      bg-mk-bg-soft + ingen border + ingen shadow
 *                Brug: insight-boxes, mini-tips, informational sections
 *
 * Hover (BRAND-TOKENS motion):
 *   - Hover translate-y-[-8px] + shadow-mk-xl
 *   - Disabled paa soft (kun informational)
 *   - Pass hover={false} for at slukke
 *
 * Padding:
 *   - sm:       p-4 (16px)
 *   - md:       p-6 (24px) - default
 *   - lg:       p-8 (32px) - hero zones, prominent cards
 *
 * Props:
 *   - variant: 'primary' | 'secondary' | 'soft' (default 'secondary')
 *   - padding: 'sm' | 'md' | 'lg' (default 'md')
 *   - hover: boolean (default true, undtagen for soft)
 *   - as: HTML element tag (default 'div')
 *   - className: ekstra Tailwind classes
 *   - children: indhold (frit composeret)
 *
 * Eksempel (audience-split B2B card):
 *   <Card variant="secondary" padding="lg" className="flex flex-col gap-6">
 *     <Users className="text-brand" size={32} />
 *     <h3 className="text-mk-h3 text-mk-heading">For foreninger</h3>
 *     <p className="text-mk-body text-mk-secondary">Body text</p>
 *     <ul>...key-points...</ul>
 *     <CTA variant="primary">Laes mere</CTA>
 *   </Card>
 *
 * Eksempel (KEY-feature primary):
 *   <Card variant="primary" padding="lg">
 *     {prominentContent}
 *   </Card>
 */

const VARIANT_CLASSES = {
  primary:
    'bg-mk-bg border-[1.5px] border-brand shadow-mk-md',
  secondary:
    'bg-mk-bg border border-mk-border-subtle shadow-mk-sm',
  soft:
    'bg-mk-bg-soft border-0 shadow-none',
};

const HOVER_CLASSES = {
  primary:
    'transition-all duration-medium ease-quart ' +
    'hover:-translate-y-2 hover:shadow-mk-xl',
  secondary:
    'transition-all duration-medium ease-quart ' +
    'hover:-translate-y-2 hover:shadow-mk-lg',
  soft: '', // soft cards har ikke hover-state (informational)
};

const PADDING_CLASSES = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Card = forwardRef(function Card(
  {
    variant = 'secondary',
    padding = 'md',
    hover = true,
    as: Component = 'div',
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.secondary;
  const paddingClass = PADDING_CLASSES[padding] || PADDING_CLASSES.md;

  // Hover kun hvis hover=true OG variant ikke er soft
  const hoverClass = (hover && variant !== 'soft') ? HOVER_CLASSES[variant] : '';

  // Base: rounded corners
  const baseClass = 'rounded-mk-xl';

  return (
    <Component
      ref={ref}
      className={`${baseClass} ${variantClass} ${paddingClass} ${hoverClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
});

export default Card;
