import { forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * CTA - call-to-action knap eller link med brand-styling.
 *
 * Renderer som <a> hvis href er sat, ellers <button>.
 *
 * Variants × Tones (matrix):
 *
 *   primary + light:    bg-brand + hvid tekst + brand-shadow
 *                       Hover: shadow-loft + translate-y (INGEN bg-color
 *                       change for at undgaa kontrast-bug paa lighter pink)
 *   primary + dark:     bg-brand + hvid tekst + staerk shadow-glow
 *                       Til hero/CTA-sektioner paa moerk bg
 *                       Premium-Pulse focus-ring med ring-offset paa dark
 *
 *   secondary + light:  outline brand-red + brand text
 *                       Hover: bg-brand + hvid tekst (filled)
 *   secondary + dark:   outline white/40 + hvid tekst (Pulse glassmorphism)
 *                       Hover: border-white + bg-white/10 (subtle fill)
 *
 *   tertiary + light:   text-link brand-red, underline paa hover
 *   tertiary + dark:    text-link hvid/80, underline + full hvid paa hover
 *
 * Sizes (sm / md / lg):
 *   - sm: text-mk-body-sm, py-2 px-4
 *   - md: text-mk-body, py-3 px-6 (default)
 *   - lg: text-mk-body-lg, py-4 px-8 (hero CTAs)
 *
 * Icon (lucide-react):
 *   - Default: ArrowRight efter tekst
 *   - Pass icon={null} for at skjule
 *   - Pass icon={CustomIcon} for andet ikon
 *   - iconPosition: 'right' (default) | 'left'
 *
 * Polymorphic:
 *   - href sat -> <a> tag
 *   - href ikke sat -> <button type="button">
 *
 * Eksempel (Hero paa dark bg - PREMIUM-PULSE):
 *   <CTA variant="primary" tone="dark" size="lg" href="/foreninger">
 *     Læs mere for foreninger
 *   </CTA>
 *   <CTA variant="secondary" tone="dark" size="lg" href="/hjertesager">
 *     Find en forening at støtte
 *   </CTA>
 *
 * Eksempel (light section - default):
 *   <CTA variant="primary" href="/start">Start gratis</CTA>
 *   <CTA variant="tertiary" href="/priser">Se priser og fordeling</CTA>
 */

// Variant × Tone matrix
const VARIANT_TONE_CLASSES = {
  primary: {
    light:
      'bg-brand text-white shadow-brand-md ' +
      'hover:shadow-brand-lg hover:-translate-y-0.5 ' +
      'active:scale-[0.99] ' +
      'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none',
    dark:
      'bg-brand text-white shadow-[0_10px_28px_rgba(224,25,63,0.26)] ' +
      'hover:shadow-[0_12px_32px_rgba(224,25,63,0.30)] hover:-translate-y-0.5 ' +
      'active:scale-[0.99] ' +
      'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-mk-bg-dark focus-visible:outline-none',
  },
  secondary: {
    light:
      'bg-transparent text-brand border border-brand/35 ' +
      'hover:border-brand hover:bg-brand-tint hover:-translate-y-0.5 ' +
      'active:scale-[0.99] ' +
      'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none',
    dark:
      'bg-white/[0.04] text-white border border-white/[0.16] backdrop-blur-md ' +
      'hover:bg-white/[0.08] hover:border-white/[0.28] hover:-translate-y-0.5 ' +
      'active:scale-[0.99] ' +
      'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-mk-bg-dark focus-visible:outline-none',
  },
  tertiary: {
    light:
      'bg-transparent text-brand border-0 px-0 py-0 underline-offset-4 ' +
      'hover:underline hover:text-brand-light ' +
      'focus-visible:underline focus-visible:outline-none ' +
      'shadow-none',
    dark:
      'bg-transparent text-white/80 border-0 px-0 py-0 underline-offset-4 ' +
      'hover:underline hover:text-white ' +
      'focus-visible:underline focus-visible:outline-none ' +
      'shadow-none',
  },
};

const SIZE_CLASSES = {
  sm: 'text-mk-body-sm py-2 px-4 gap-1.5',
  md: 'text-mk-body py-3 px-6 gap-2',
  lg: 'text-mk-body-lg py-4 px-8 gap-2.5',
};

// Tertiary skipper button-padding (det er en text-link)
const TERTIARY_SIZE_CLASSES = {
  sm: 'text-mk-body-sm gap-1',
  md: 'text-mk-body gap-1.5',
  lg: 'text-mk-body-lg gap-2',
};

const CTA = forwardRef(function CTA(
  {
    variant = 'primary',
    tone = 'light',
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

  const variantToneMap = VARIANT_TONE_CLASSES[variant] || VARIANT_TONE_CLASSES.primary;
  const variantClass = variantToneMap[tone] || variantToneMap.light;

  const sizeClass = variant === 'tertiary'
    ? (TERTIARY_SIZE_CLASSES[size] || TERTIARY_SIZE_CLASSES.md)
    : (SIZE_CLASSES[size] || SIZE_CLASSES.md);

  const buttonBase =
    'inline-flex items-center justify-center font-medium ' +
    'rounded-mk-md transition-all duration-fast ease-quart ' +
    'cursor-pointer select-none whitespace-nowrap';

  const tertiaryBase =
    'inline-flex items-center font-medium cursor-pointer select-none ' +
    'transition-colors duration-fast';

  const baseClass = variant === 'tertiary' ? tertiaryBase : buttonBase;

  const iconSize = size === 'lg' ? 20 : size === 'sm' ? 14 : 16;
  const buttonType = !href && !type ? 'button' : type;

  return (
    <Component
      ref={ref}
      href={href}
      type={buttonType}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`.trim()}
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
