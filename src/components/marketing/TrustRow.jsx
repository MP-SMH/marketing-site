import { forwardRef } from 'react';

/**
 * TrustRow - horisontal liste af trust-badges med icon + label.
 *
 * Anvendelse: Under hero-CTAs (3 badges), eller standalone som
 * trust-statement i mid-page sektioner (4-6 badges).
 *
 * Variants (matcher Hero-baggrund):
 *   - light:  Til light bg sections - tekst mk-secondary, icon brand-red
 *   - dark:   Til dark hero/CTA sections - tekst lys, icon brand-red-light
 *
 * Sizes:
 *   - sm:  text-mk-xs, icon 14px (kompakte sektioner)
 *   - md:  text-mk-body-sm, icon 16px (default)
 *   - lg:  text-mk-body, icon 20px (prominent hero placement)
 *
 * Layout:
 *   - Flex-wrap som default (mobile-friendly)
 *   - Centreret horisontalt
 *   - Gap mellem items justerer per size
 *
 * Items-spec:
 *   Array af { icon, label, key? } objekter.
 *   icon = lucide-react component (eks. ShieldCheck, Heart, Eye)
 *   label = string vist ved ikonet
 *   key = optional - default er icon-displayName eller index
 *
 * Eksempel (Home hero, dark bg):
 *   <TrustRow
 *     variant="dark"
 *     size="md"
 *     items={[
 *       { icon: ShieldCheck, label: 'Verificerede foreninger' },
 *       { icon: Heart, label: '80% til foreningen' },
 *       { icon: Eye, label: 'Gratis at oprette, ingen binding' },
 *     ]}
 *   />
 *
 * Eksempel (light section):
 *   <TrustRow
 *     variant="light"
 *     items={[
 *       { icon: Lock, label: 'GDPR-compliant' },
 *       { icon: Check, label: 'Sporbar dokumentation' },
 *     ]}
 *   />
 */

const VARIANT_CLASSES = {
  light: {
    container: 'text-mk-secondary',
    icon: 'text-brand',
  },
  dark: {
    container: 'text-mk-inverse',
    icon: 'text-brand-light',
  },
};

const SIZE_CLASSES = {
  sm: {
    text: 'text-mk-xs',
    iconSize: 14,
    gap: 'gap-x-4 gap-y-2',
    itemGap: 'gap-1.5',
  },
  md: {
    text: 'text-mk-body-sm',
    iconSize: 16,
    gap: 'gap-x-6 gap-y-3',
    itemGap: 'gap-2',
  },
  lg: {
    text: 'text-mk-body',
    iconSize: 20,
    gap: 'gap-x-8 gap-y-4',
    itemGap: 'gap-2.5',
  },
};

const TrustRow = forwardRef(function TrustRow(
  {
    variant = 'light',
    size = 'md',
    items = [],
    align = 'center',
    className = '',
    ...rest
  },
  ref,
) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const variantStyle = VARIANT_CLASSES[variant] || VARIANT_CLASSES.light;
  const sizeStyle = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  }[align] || 'justify-center';

  return (
    <ul
      ref={ref}
      className={
        `flex flex-wrap ${justifyClass} items-center ` +
        `${sizeStyle.gap} ${sizeStyle.text} ${variantStyle.container} ` +
        `list-none m-0 p-0 ${className}`.trim()
      }
      {...rest}
    >
      {items.map((item, idx) => {
        const Icon = item.icon;
        const key = item.key ?? (Icon && Icon.displayName) ?? idx;
        return (
          <li
            key={key}
            className={`inline-flex items-center ${sizeStyle.itemGap} font-medium`}
          >
            {Icon && (
              <Icon
                size={sizeStyle.iconSize}
                strokeWidth={2}
                className={`${variantStyle.icon} flex-shrink-0`}
                aria-hidden="true"
              />
            )}
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
});

export default TrustRow;
