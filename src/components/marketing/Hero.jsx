import { forwardRef } from 'react';
import Section from './Section';
import Container from './Container';

/**
 * Hero - hero section pattern med slot-baseret API.
 *
 * Composer Section + Container internt. Hver page bruger Hero som
 * outermost element, derefter normale Sections til resten.
 *
 * Slots (alle optional, men title forventes altid):
 *   - eyebrow:    pre-headline (Eyebrow-component eller custom node)
 *   - title:      H1 - rendered automatisk som <h1> hvis string,
 *                 ellers respekteres React-element
 *   - subtitle:   subheadline under H1 (forklarende tekst)
 *   - actions:    CTAs (typisk 1-2 knapper, evt. ogsaa text-link)
 *   - trustRow:   TrustRow component med trust-badges
 *   - mockup:     illustration / mockup / image (kun synlig i split layout)
 *   - decoration: ReactNode renderet absolute (HeroOrbs eller custom)
 *                 default null (ren hero uden orbs)
 *
 * Layouts:
 *   - centered: single-column, center-aligned, max-w-4xl (matcher /home v1.1)
 *   - split:    left-text + right-mockup (matcher /foreninger pattern)
 *
 * Variants (Section bg):
 *   - dark:   #0F172A bg + lys tekst (default for hero)
 *   - light:  hvid bg
 *   - soft:   #F9FAFB bg
 *
 * Padding:
 *   - default:  Section padding="generous" (py-20 / py-32)
 *   - tight:    Section padding="default" (py-16 / py-24)
 *
 * Premium-Pulse note:
 *   For premium-Pulse hero paa moerk bg, pass <HeroOrbs /> som decoration.
 *   Decoration renderes absolute med pointer-events-none + aria-hidden.
 *
 * Eksempel (Home hero, premium-Pulse):
 *   <Hero
 *     variant="dark"
 *     layout="centered"
 *     decoration={<HeroOrbs />}
 *     eyebrow={<Eyebrow tone="dark">Bygget til danske foreninger</Eyebrow>}
 *     title="Bygget til danske foreninger og dem, der støtter dem"
 *     subtitle="StøtMedHjerte gør det nemmere..."
 *     actions={
 *       <>
 *         <CTA variant="primary" tone="dark" size="lg" href="/foreninger">
 *           Læs mere for foreninger
 *         </CTA>
 *         <CTA variant="secondary" tone="dark" size="lg" href="/hjertesager">
 *           Find en forening at støtte
 *         </CTA>
 *       </>
 *     }
 *     trustRow={<TrustRow variant="dark" items={trustItems} />}
 *   />
 */

const PADDING_MAP = {
  default: 'generous',
  tight: 'default',
};

const Hero = forwardRef(function Hero(
  {
    layout = 'centered',
    variant = 'dark',
    padding = 'default',
    eyebrow,
    title,
    subtitle,
    actions,
    trustRow,
    mockup,
    decoration,
    id = 'hero',
    className = '',
    ...rest
  },
  ref,
) {
  const sectionPadding = PADDING_MAP[padding] || 'generous';

  // Title: hvis string, wrap i <h1> med responsive sizing.
  // leading-[1.1] (ikke 1.05) for bedre multi-line headlines
  const renderedTitle =
    typeof title === 'string' ? (
      <h1 className="text-mk-display-mobile md:text-mk-display tracking-mk-tight font-semibold leading-[1.1]">
        {title}
      </h1>
    ) : (
      title
    );

  // Subtitle: hvis string, wrap i <p>
  const renderedSubtitle =
    typeof subtitle === 'string' ? (
      <p className={`text-mk-body md:text-mk-body-lg leading-relaxed max-w-2xl ${variant === "dark" ? "text-white/80" : "text-mk-secondary"}`}>
        {subtitle}
      </p>
    ) : (
      subtitle
    );

  // Tekstfarver per variant
  const subtitleColorClass =
    variant === 'dark'
      ? 'text-white/80'  // 80% white = bedre kontrast end opacity-80
      : 'text-mk-secondary';

  const titleColorClass =
    variant === 'dark' ? 'text-white' : 'text-mk-heading';

  const isSplit = layout === 'split';

  return (
    <Section
      ref={ref}
      id={id}
      variant={variant}
      padding={sectionPadding}
      className={`relative overflow-hidden ${className}`.trim()}
      {...rest}
    >
      {/* Decoration layer (orbs, gradients) - absolute, ikke interaktivt */}
      {decoration}

      <Container>
        <div
          className={
            isSplit
              ? 'grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10'
              // Centered: max-w-4xl (896px) for plads til 2 CTAs side-om-side + trust-row
              : 'flex flex-col items-center text-center gap-6 md:gap-8 relative z-10 max-w-4xl mx-auto'
          }
        >
          {/* Text-column (i split: left, i centered: full-width) */}
          <div
            className={
              `flex flex-col gap-6 ${titleColorClass} ` +
              (isSplit ? 'text-left items-start' : 'items-center text-center')
            }
          >
            {eyebrow && <div>{eyebrow}</div>}
            {renderedTitle && <div>{renderedTitle}</div>}
            {renderedSubtitle && (
              <div className={subtitleColorClass}>{renderedSubtitle}</div>
            )}
            {actions && (
              <div
                className={
                  `flex flex-wrap gap-3 md:gap-4 mt-2 ` +
                  (isSplit ? 'justify-start' : 'justify-center')
                }
              >
                {actions}
              </div>
            )}
            {trustRow && <div className="mt-4 md:mt-6">{trustRow}</div>}
          </div>

          {/* Mockup-column (kun i split) */}
          {isSplit && mockup && (
            <div className="flex justify-center md:justify-end">{mockup}</div>
          )}
        </div>
      </Container>
    </Section>
  );
});

export default Hero;
