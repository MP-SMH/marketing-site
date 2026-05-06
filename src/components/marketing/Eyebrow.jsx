import { forwardRef } from 'react';

/**
 * Eyebrow - lille pill-component over hero H1 (pre-headline).
 *
 * Glassmorphism-styling matcher premium-Pulse design system fra smh-app.
 * Rendered som <span> for inline-flow indeni Hero's eyebrow-slot.
 *
 * Variants (tone):
 *   - light:  bg-mk-bg-elevated + border-mk-border-subtle + text-mk-secondary
 *             Til light hero (variant="light")
 *   - dark:   bg-white/[0.07] + border-white/[0.12] + backdrop-blur-xl + text-mk-inverse
 *             Til dark hero (variant="dark") - PREMIUM-PULSE GLASSMORPHISM
 *
 * Optional icon (lucide-react component):
 *   - Default: ingen icon
 *   - icon={Flag}: ikon foran tekst (14px, stroke 2)
 *
 * Eksempel (Home hero, dark variant):
 *   <Eyebrow tone="dark" icon={Flag}>
 *     Bygget til danske foreninger
 *   </Eyebrow>
 *
 * Eksempel (light variant uden ikon):
 *   <Eyebrow tone="light">
 *     Pre-launch 18. juli 2026
 *   </Eyebrow>
 */

const TONE_CLASSES = {
  light:
    'bg-mk-bg-elevated border border-mk-border-subtle text-mk-secondary',
  dark:
    // Premium glassmorphism: more refined opacity + xl backdrop-blur
    'bg-white/[0.07] border border-white/[0.12] text-mk-inverse backdrop-blur-xl',
};

const Eyebrow = forwardRef(function Eyebrow(
  {
    tone = 'light',
    icon: Icon,
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const toneClass = TONE_CLASSES[tone] || TONE_CLASSES.light;

  return (
    <span
      ref={ref}
      className={
        `inline-flex items-center gap-2 px-3 py-1.5 ` +
        `rounded-mk-full text-mk-body-sm font-medium ` +
        `${toneClass} ${className}`.trim()
      }
      {...rest}
    >
      {Icon && (
        <Icon
          size={14}
          strokeWidth={2}
          aria-hidden="true"
          className="flex-shrink-0"
        />
      )}
      <span>{children}</span>
    </span>
  );
});

export default Eyebrow;
