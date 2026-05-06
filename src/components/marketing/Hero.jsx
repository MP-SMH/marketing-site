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
 *   - eyebrow:   lille pre-headline (pre-launch note, flag-pill, badge)
 *   - title:     H1 - rendered automatisk som <h1> hvis string,
 *                ellers respekteres React-element
 *   - subtitle:  subheadline under H1 (forklarende tekst)
 *   - actions:   CTAs (typisk 1-2 knapper, evt. ogsaa text-link)
 *   - trustRow:  TrustRow component med trust-badges
 *   - mockup:    illustration / mockup / image (kun synlig i split layout)
 *
 * Layouts:
 *   - centered: single-column, center-aligned (matcher /home v1.1)
 *   - split:    left-text + right-mockup (matcher /foreninger pattern)
 *
 * Variants (Section bg):
 *   - dark:   #0F172A bg + lys tekst (default for hero)
 *   - light:  hvid bg
 *   - soft:   #F9FAFB bg
 *
 * Padding:
 *   - default:  Section padding="generous" (py-20 / py-32)
 *   - tight:    Section padding="default" (mindre brug-cases)
 *
 * Decoration:
 *   - decoration prop: ReactNode renderet absolute inde i Section
 *     for orbs, gradients, blobs (relative + overflow-hidden saettes auto)
 *
 * Props:
 *   - layout: 'centered' | 'split' (default 'centered')
 *   - variant: 'dark' | 'light' | 'soft' (default 'dark')
 *   - padding: 'default' | 'tight' (default 'default')
 *   - eyebrow, title, subtitle, actions, trustRow, mockup: ReactNode slots
 *   - decoration: ReactNode for absolute-positioned background elementer
 *   - className: ekstra Tailwind classes paa Section
 *   - id: anchor id (default 'hero')
 *
 * Eksempel (Home hero, centered, dark):
 *   <Hero
 *     variant="dark"
 *     layout="centered"
 *     eyebrow={<Pill icon={Flag}>Bygget til danske foreninger</Pill>}
 *     title="Bygget til danske foreninger og dem, der stoetter dem"
 *     subtitle="StoetMedHjerte goer det nemmere..."
 *     actions={
 *       <>
 *         <CTA variant="primary" size="lg" href="/foreninger">
 *           Laes mere for foreninger
 *         </CTA>
 *         <CTA variant="secondary" size="lg" href="/hjertesager">
 *           Find en forening at stoette
 *         </CTA>
 *       </>
 *     }
 *     trustRow={<TrustRow variant="dark" items={trustItems} />}
 *     decoration={<HeroOrbs />}
 *   />
 *
 * Eksempel (Foreninger hero, split):
 *   <Hero
 *     layout="split"
 *     variant="dark"
 *     title="..."
 *     subtitle="..."
 *     actions={...}
 *     mockup={<DashboardMockup />}
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

  // Rendering helpers - hvis title er en string, wrap i <h1>
  const renderedTitle =
    typeof title === 'string' ? (
      <h1 className="text-mk-display-mobile md:text-mk-display tracking-mk-tight font-semibold leading-[1.05]">
        {title}
      </h1>
    ) : (
      title
    );

  const renderedSubtitle =
    typeof subtitle === 'string' ? (
      <p className="text-mk-body md:text-mk-body-lg leading-relaxed max-w-2xl">
        {subtitle}
      </p>
    ) : (
      subtitle
    );

  // Tekstfarver per variant (subtitle skal vaere lidt daempet)
  const subtitleColorClass =
    variant === 'dark'
      ? 'text-mk-inverse opacity-80'
      : 'text-mk-secondary';

  const titleColorClass =
    variant === 'dark' ? 'text-mk-inverse' : 'text-mk-heading';

  // Layout-specifikke containers
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
      {decoration && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {decoration}
        </div>
      )}

      <Container>
        <div
          className={
            isSplit
              ? 'grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10'
              : 'flex flex-col items-center text-center gap-6 md:gap-8 relative z-10 max-w-3xl mx-auto'
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
