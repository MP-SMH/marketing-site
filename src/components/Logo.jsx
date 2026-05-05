/**
 * StøtMedHjerte centralized wordmark/logo component.
 *
 * Uses Adobe Fonts Elza Round Variable (kit xxf1iif).
 * Default: weight 500 (Medium), letter-spacing -0.05em.
 *
 * Adobe Fonts <link> tag i index.html loader fonten globalt.
 * Denne komponent applierer kun styles.
 *
 * @param {Object} props
 * @param {number|'small'|'medium'|'large'} [props.size=18] - font-size
 * @param {string} [props.color='currentColor'] - CSS color
 * @param {boolean} [props.withTM=true] - vis ™ superscript
 * @param {number} [props.weight=500] - font variation weight 300-800
 * @param {string} [props.letterSpacing='-0.05em'] - override letter-spacing
 * @param {Object} [props.style={}] - extra inline style
 * @param {string} [props.className=''] - extra className
 *
 * @example
 *   <Logo />                          // default 18px med ™
 *   <Logo size="large" />             // 28px
 *   <Logo size={24} color="#fff" />   // 24px hvid
 *   <Logo withTM={false} />           // uden ™
 */
const SIZE_PRESETS = { small: 14, medium: 18, large: 28 };

export default function Logo({
  size = 18,
  color = 'currentColor',
  withTM = true,
  weight = 500,
  letterSpacing = '-0.05em',
  style = {},
  className = '',
}) {
  const fontSize = typeof size === 'string' ? (SIZE_PRESETS[size] || 18) : size;

  return (
    <span
      className={className}
      style={{
        fontFamily: '"elza-round-variable-light", sans-serif',
        fontSize,
        fontVariationSettings: `'wght' ${weight}`,
        letterSpacing,
        color,
        display: 'inline-block',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      StøtMedHjerte
      {withTM && (
        <sup
          style={{
            fontSize: '0.5em',
            marginLeft: '0.05em',
            fontVariationSettings: `'wght' ${weight}`,
            verticalAlign: 'super',
            lineHeight: 1,
          }}
        >
          ™
        </sup>
      )}
    </span>
  );
}
