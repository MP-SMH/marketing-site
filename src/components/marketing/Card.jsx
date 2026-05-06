import { forwardRef } from 'react';

/**
 * Card - styled wrapper med 3 variants × 2 tones (BRAND-TOKENS + premium-Pulse).
 *
 * Card er en simpel wrapper - content composeres frit indeni.
 *
 * Variant × Tone matrix:
 *
 *   primary + light:    bg-mk-bg + brand-red border 1.5px + shadow-md
 *                       Standard primary (KEY-feature highlight, hjertesager)
 *   primary + dark:     glassmorphism bg-white/5 + backdrop-blur-xl
 *                       + border-white/15 + shadow-2xl + hint af brand-glow
 *                       PREMIUM-PULSE: hero-cards paa moerk bg
 *
 *   secondary + light:  bg-mk-bg + neutral border 1px + shadow-sm
 *                       Standard secondary (audience-split, differentiator)
 *   secondary + dark:   glassmorphism bg-white/5 + backdrop-blur-md
 *                       + border-white/10 (subtle Pulse-card)
 *
 *   soft + light:       bg-mk-bg-soft + ingen border + ingen shadow
 *                       Informational (insight-boxes, mini-tips)
 *   soft + dark:        bg-white/3 + ingen border + ingen shadow
 *                       Lavprofil paa moerk bg
 *
 * Hover (BRAND-TOKENS motion - 250ms ease-out):
 *   - Hover translate-y-[-8px] + shadow-loft (light tones)
 *   - Hover bg-white/10 + scale-up subtle (dark tones)
 *   - Auto-disabled paa soft (informational)
 *   - Pass hover={false} for at slukke
 *
 * Padding (sm 16px / md 24px / lg 32px).
 *
 * Props:
 *   - variant: 'primary' | 'secondary' | 'soft' (default 'secondary')
 *   - tone: 'light' | 'dark' (default 'light')
 *   - padding: 'sm' | 'md' | 'lg' (default 'md')
 *   - hover: boolean (default true, undtagen for soft)
 *   - as: HTML element tag (default 'div')
 *   - className: ekstra Tailwind classes
 *   - children: indhold (frit composeret)
 *
 * Eksempel (audience-split B2B card paa light bg):
 *   <Card variant="secondary" padding="lg">
 *     <Users className="text-brand" size={32} />
 *     <h3>For foreninger</h3>
 *     ...
 *   </Card>
 *
 * Eksempel (PREMIUM-PULSE primary paa dark hero-zone):
 *   <Card variant="primary" tone="dark" padding="lg">
 *     <Heart className="text-brand-light" size={32} />
 *     <h3 className="text-white">Anbefalet hjertesag</h3>
 *     ...
 *   </Card>
 */

// Variant × tone matrix
const VARIANT_TONE_CLASSES = {
  primary: {
    light:
      'bg-mk-bg border-[1.5px] border-brand shadow-mk-md',
    dark:
      // Glassmorphism Pulse-style med subtle brand-glow
      'bg-white/5 backdrop-blur-xl border border-white/15 shadow-2xl ' +
      'shadow-[0_8px_32px_rgba(224,25,63,0.15)]',
  },
  secondary: {
    light:
      'bg-mk-bg border border-mk-border-subtle shadow-mk-sm',
    dark:
      'bg-white/5 backdrop-blur-md border border-white/10',
  },
  soft: {
    light:
      'bg-mk-bg-soft border-0 shadow-none',
    dark:
      'bg-white/[0.03] border-0 shadow-none',
  },
};

// Hover-states per variant × tone
// Duration 250ms (BRAND-TOKENS mikro-interaktion standard)
const HOVER_CLASSES = {
  primary: {
    light:
      'transition-all duration-[250ms] ease-quart ' +
      'hover:-translate-y-2 hover:shadow-mk-xl',
    dark:
      'transition-all duration-[250ms] ease-quart ' +
      'hover:-translate-y-2 hover:bg-white/[0.07] ' +
      'hover:border-white/20 hover:shadow-[0_16px_48px_rgba(224,25,63,0.25)]',
  },
  secondary: {
    light:
      'transition-all duration-[250ms] ease-quart ' +
      'hover:-translate-y-2 hover:shadow-mk-lg',
    dark:
      'transition-all duration-[250ms] ease-quart ' +
      'hover:-translate-y-2 hover:bg-white/[0.07] hover:border-white/15',
  },
  // Soft har ingen hover - informational
  soft: {
    light: '',
    dark:  '',
  },
};

const PADDING_CLASSES = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Card = forwardRef(function Card(
  {
    variant = 'secondary',
    tone = 'light',
    padding = 'md',
    hover = true,
    as: Component = 'div',
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const variantToneMap = VARIANT_TONE_CLASSES[variant] || VARIANT_TONE_CLASSES.secondary;
  const variantClass = variantToneMap[tone] || variantToneMap.light;

  const paddingClass = PADDING_CLASSES[padding] || PADDING_CLASSES.md;

  // Hover kun hvis hover=true OG variant ikke er soft
  const hoverMap = HOVER_CLASSES[variant] || HOVER_CLASSES.secondary;
  const hoverClass = (hover && variant !== 'soft') ? (hoverMap[tone] || hoverMap.light) : '';

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
