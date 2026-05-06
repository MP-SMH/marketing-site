import { forwardRef } from 'react';

/**
 * HeroOrbs - premium-Pulse decoration med radial gradient orbs + grid overlay.
 *
 * Anvendelse: Pass som Hero's `decoration` prop. Renderes absolute inde
 * i Hero's relative + overflow-hidden container.
 *
 * Indeholder 3 visuelle lag (alle pointer-events-none):
 *   1. Roed brand-orb (top-right, stoer, blur, opacity 0.30)
 *   2. Lyseroed brand-orb (bottom-left, mindre, blur, opacity 0.20)
 *   3. Subtle grid-pattern overlay (opacity 0.03, 40px grid)
 *
 * Designet matcher Pulse design system fra smh-app:
 *   - Roede orbs paa moerk baggrund (brand-feel)
 *   - Subtle grid-pattern (tech/saas-feel uden at vaere paatrengende)
 *   - Radial gradients fade-out til transparent (smooth integration)
 *
 * Props:
 *   - intensity: 'subtle' | 'normal' | 'strong' (default 'normal')
 *                Justerer opacity-niveauer for orbs
 *   - showGrid:  boolean (default true) - vis/skjul grid-pattern
 *   - className: ekstra Tailwind classes
 *
 * Bemaerk: Komponenten er aria-hidden + pointer-events-none = ingen
 * indvirkning paa a11y eller user interaction.
 *
 * Eksempel:
 *   <Hero
 *     variant="dark"
 *     decoration={<HeroOrbs />}
 *     ...
 *   />
 */

const INTENSITY_CONFIG = {
  subtle: {
    orb1Opacity: 0.15,
    orb2Opacity: 0.10,
    gridOpacity: 0.02,
  },
  normal: {
    orb1Opacity: 0.15,
    orb2Opacity: 0.10,
    gridOpacity: 0.03,
  },
  strong: {
    orb1Opacity: 0.45,
    orb2Opacity: 0.30,
    gridOpacity: 0.05,
  },
};

const HeroOrbs = forwardRef(function HeroOrbs(
  {
    intensity = 'normal',
    showGrid = true,
    className = '',
    ...rest
  },
  ref,
) {
  const config = INTENSITY_CONFIG[intensity] || INTENSITY_CONFIG.normal;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`.trim()}
      {...rest}
    >
      {/* Orb 1: Top-right brand-roed */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, var(--brand-red) 0%, transparent 70%)',
          opacity: config.orb1Opacity,
        }}
      />

      {/* Orb 2: Bottom-left lyseroed */}
      <div
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, var(--brand-red-light) 0%, transparent 70%)',
          opacity: config.orb2Opacity,
        }}
      />

      {/* Grid-pattern overlay (subtle tech-feel) */}
      {showGrid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), ' +
              'linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: config.gridOpacity,
          }}
        />
      )}
    </div>
  );
});

export default HeroOrbs;
