/** @type {import('tailwindcss').Config} */
/**
 * Tailwind config - StoetMedHjerte marketing-site
 * ============================================================
 *
 * Strategi:
 *   1. shadcn/ui tokens (background, foreground, card, etc.) bevares
 *      uaendret - de bruges af Radix-baserede komponenter.
 *   2. Marketing tokens tilfojes med "mk-" prefix for at undgaa
 *      kollisioner med shadcn (eks. text-mk-heading, bg-mk-soft).
 *   3. Brand-farver bruger "brand" namespace: bg-brand, text-brand.
 *   4. Alle farver mappes til CSS custom properties i src/styles/tokens.css
 *      - aendringer skete ET sted, ikke 30+.
 *
 * Naming-konvention:
 *   - brand            = primary red (E0193F)
 *   - mk-heading       = marketing text-heading
 *   - mk-body          = marketing text-body
 *   - mk-secondary     = marketing text-secondary
 *   - mk-muted         = marketing text-muted
 *   - mk-bg-*          = marketing backgrounds
 *   - mk-border-*      = marketing borders
 *   - sektor-*         = hjertesager kategori-farver
 *
 * shadcn-tokens (bevares):
 *   - background, foreground, card, popover, primary, secondary,
 *     muted, accent, destructive, border, input, ring, chart, sidebar
 * ============================================================ */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        // shadcn defaults (bevares)
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        // Marketing tokens
        'mk-sm':   'var(--radius-sm)',
        'mk-md':   'var(--radius-md)',
        'mk-lg':   'var(--radius-lg)',
        'mk-xl':   'var(--radius-xl)',
        'mk-2xl':  'var(--radius-2xl)',
        'mk-full': 'var(--radius-full)',
      },
      colors: {
        // ============================================================
        // shadcn/ui tokens (bevares uaendret)
        // ============================================================
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },

        // ============================================================
        // Marketing brand-farve (primary red)
        // ============================================================
        brand: {
          DEFAULT:    'var(--brand-red)',
          light:      'var(--brand-red-light)',
          tint:       'var(--brand-red-tint)',
        },

        // ============================================================
        // Marketing text-farver (mk- prefix)
        // ============================================================
        'mk-heading':   'var(--text-heading)',
        'mk-body':      'var(--text-body)',
        'mk-secondary': 'var(--text-secondary)',
        'mk-muted':     'var(--text-muted)',
        'mk-inverse':   'var(--text-inverse)',

        // ============================================================
        // Marketing borders
        // ============================================================
        'mk-border-strong': 'var(--border-strong)',
        'mk-border-subtle': 'var(--border-subtle)',

        // ============================================================
        // Marketing backgrounds
        // ============================================================
        'mk-bg':          'var(--bg-base)',
        'mk-bg-soft':     'var(--bg-soft)',
        'mk-bg-elevated': 'var(--bg-elevated)',
        'mk-bg-disabled': 'var(--bg-disabled)',
        'mk-bg-dark':     'var(--bg-dark)',

        // ============================================================
        // Sektor-farver (KUN til hjertesager-cards)
        // ============================================================
        sektor: {
          fodbold:      'var(--sektor-fodbold)',
          gymnastik:    'var(--sektor-gymnastik)',
          haandbold:    'var(--sektor-haandbold)',
          svoemmning:   'var(--sektor-svoemmning)',
          kampsport:    'var(--sektor-kampsport)',
          handicap:     'var(--sektor-handicap)',
          kultur:       'var(--sektor-kultur)',
          velgoerenhed: 'var(--sektor-velgoerenhed)',
        },

        // ============================================================
        // Functional colors
        // ============================================================
        success: {
          DEFAULT: 'var(--success)',
          light:   'var(--success-light)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          light:   'var(--warning-light)',
        },
        error: {
          DEFAULT: 'var(--error)',
          light:   'var(--error-light)',
        },
        info: {
          DEFAULT: 'var(--info)',
          light:   'var(--info-light)',
        },
      },
      fontFamily: {
        logo:    ['var(--font-logo)'],
        heading: ['var(--font-heading)'],
        body:    ['var(--font-body)'],
        mono:    ['var(--font-mono)'],
      },
      fontSize: {
        // Marketing type-scale
        'mk-display':         ['var(--text-display)',         { letterSpacing: 'var(--tracking-tight)',   lineHeight: '1.05' }],
        'mk-display-mobile':  ['var(--text-display-mobile)',  { letterSpacing: 'var(--tracking-tight)',   lineHeight: '1.1' }],
        'mk-h1':              ['var(--text-h1)',              { letterSpacing: 'var(--tracking-display)', lineHeight: '1.15' }],
        'mk-h2':              ['var(--text-h2)',              { letterSpacing: 'var(--tracking-display)', lineHeight: '1.25' }],
        'mk-h3':              ['var(--text-h3)',              { letterSpacing: 'var(--tracking-default)', lineHeight: '1.35' }],
        'mk-body-lg':         ['var(--text-body-lg)',         { letterSpacing: 'var(--tracking-default)', lineHeight: '1.55' }],
        'mk-body':            ['var(--text-body-base)',       { letterSpacing: 'var(--tracking-default)', lineHeight: '1.6' }],
        'mk-body-sm':         ['var(--text-body-sm)',         { lineHeight: '1.5' }],
        'mk-xs':              ['var(--text-xs)',              { letterSpacing: 'var(--tracking-loose)', lineHeight: '1.4' }],
      },
      letterSpacing: {
        'mk-tight':   'var(--tracking-tight)',
        'mk-display': 'var(--tracking-display)',
        'mk-default': 'var(--tracking-default)',
        'mk-loose':   'var(--tracking-loose)',
      },
      boxShadow: {
        // Neutral elevation
        'mk-xs':  'var(--shadow-xs)',
        'mk-sm':  'var(--shadow-sm)',
        'mk-md':  'var(--shadow-md)',
        'mk-lg':  'var(--shadow-lg)',
        'mk-xl':  'var(--shadow-xl)',
        'mk-2xl': 'var(--shadow-2xl)',
        // Brand-coloured (CTA glow)
        'brand-sm': 'var(--shadow-brand-sm)',
        'brand-md': 'var(--shadow-brand-md)',
        'brand-lg': 'var(--shadow-brand-lg)',
      },
      transitionTimingFunction: {
        'expo':  'var(--ease-out-expo)',
        'quart': 'var(--ease-out-quart)',
        'cubic': 'var(--ease-in-out-cubic)',
      },
      transitionDuration: {
        'instant':   '100ms',
        'fast':      '200ms',
        'medium':    '500ms',
        'slow':      '800ms',
        'extended': '1200ms',
      },
      maxWidth: {
        'container': 'var(--container-max)',
      },
      keyframes: {
        // shadcn accordion (bevares)
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
