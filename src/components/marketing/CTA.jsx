import { forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * CTA - call-to-action knap eller link med brand-styling.
 *
 * Renderer som <a> hvis href er sat, ellers <button>.
 *
 * Variants (matcher BRAND-TOKENS marketing palette + card-system):
 *   - primary:   brand-red bg + hvid tekst + brand-shadow (primary actions)
 *   - secondary: outline med brand-red border + brand-red tekst (secondary actions)
 *   - tertiary:  text-link uden bg/border (i-line "Se mere"-style)
 *
 * Sizes:
 *   - sm:  text-body-sm, py-2 px-4
 *   - md:  text-body-base, py-3 px-6 (default)
 *   - lg:  text-body-lg, py-4 px-8 (hero CTAs)
 *
 * Icon:
 *   - Default ArrowRight efter tekst (matcher wireframe-pattern)
 *   - Pass icon={null} for at skjule
 *   - Pass icon={CustomIcon} for andet ikon (lucide-react)
 *   - iconPosition: 'right' (default) | 'left'
 *
 * Hover/focus (matcher BRAND-TOKENS motion):
 *   - Hover: translate-y-[-2px] + skygge-loft
 *   - Focus-visible: ring-2 brand-red shadow
 *   - Click: scale-[0.97]
 *
 * Eksempel:
 *   <CTA variant="primary" href="/foreninger" size="lg">
 *     Laes mere for foreninger
 *   </CTA>
 *
 *   <CTA variant="secondary" onClick={handleClick} icon={null}>
 *     Tilbage
 *   </CTA>
 *
 *   <CTA variant="tertiary" href="/priser">
 *     Se priser og fordeling
 *   </CTA>
 */

const VARIANT_CLASSES = {
  primary:
    'bg-brand text-white shadow-brand-md ' +
    'hover:bg-brand-light hover:shadow-brand-lg hover:-translate-y-0.5 ' +
    'active:scale-[0.97] ' +
    'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none',
  secondary:
    'bg-transparent text-brand border-2 border-brand ' +
    'hover:bg-brand hover:text-white hover:-translate-y-0.5 ' +
    'active:scale-[0.97] ' +
    'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none',
  tertiary:
    'bg-transparent text-brand border-0 px-0 py-0 underline-offset-4 ' +
    'hover:underline hover:text-brand-light ' +
    'focus-visible:underline focus-visible:outline-none ' +
    'shadow-none',
};

const SIZE_CLASSES = {
  sm: 'text-mk-body-sm py-2 px-4 gap-1.5',
  md: 'text-mk-body py-3 px-6 gap-2',
  lg: 'text-mk-body-lg py-4 px-8 gap-2.5',
};

// Tertiary skipper size padding (det er en text-link, ikke en knap)
const TERTIARY_SIZE_CLASSES = {
  sm: 'text-mk-body-sm gap-1',
  md: 'text-mk-body gap-1.5',
  lg: 'text-mk-body-lg gap-2',
};

const CTA = forwardRef(function CTA(
  {
    variant = 'primary',
    size = 'md',
    icon = ArrowRight,
    iconPosition = 'right',
    href,
    type,
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const Component = href ? 'a' : 'button';
  const Icon = icon;

  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
  const sizeClass = variant === 'tertiary'
    ? (TERTIARY_SIZE_CLASSES[size] || TERTIARY_SIZE_CLASSES.md)
    : (SIZE_CLASSES[size] || SIZE_CLASSES.md);

  // Base styles for alle variants
  const baseClasses =
    'inline-flex items-center justify-center font-medium ' +
    'rounded-mk-md transition-all duration-fast ease-quart ' +
    'cursor-pointer select-none whitespace-nowrap';

  // Tertiary skipper rounded + transition (det er en text-link)
  const variantBase = variant === 'tertiary'
    ? 'inline-flex items-center font-medium cursor-pointer select-none transition-colors duration-fast'
    : baseClasses;

  // Icon-størrelse efter knap-størrelse
  const iconSize = size === 'lg' ? 20 : size === 'sm' ? 14 : 16;

  // For button: default type="button" hvis ikke specificeret (undgaar form-submit overraskelser)
  const buttonType = !href && !type ? 'button' : type;

  return (
    <Component
      ref={ref}
      href={href}
      type={buttonType}
      className={`${variantBase} ${variantClass} ${sizeClass} ${className}`.trim()}
      {...rest}
    >
      {Icon && iconPosition === 'left' && (
        <Icon size={iconSize} aria-hidden="true" strokeWidth={2} />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon size={iconSize} aria-hidden="true" strokeWidth={2} />
      )}
    </Component>
  );
});

export default CTA;
