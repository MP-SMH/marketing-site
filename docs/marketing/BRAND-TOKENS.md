# StøtMedHjerte Brand Tokens
## Master Color & Design System Reference

**Version:** 1.0
**Dato:** 5. maj 2026
**Status:** Master sandheds-kilde for alle visuelle beslutninger
**Anvendelse:** Marketing-site + smh-app + alle fremtidige produkter

---

## Hvordan dette dokument bruges

Dette er **master brand-token reference**. Alle wireframes, komponenter, og designs SKAL referere til disse tokens.

To separate paletter:
- **Marketing palette** — bruges på marketing-site (stotmedhjerte.dk)
- **Platform palette** — bruges på app.stotmedhjerte.dk (smh-app: Backend, Admin, Supporter)

De er IKKE blandede. Forskellige kontekster, forskellige farve-systemer.

---

# 🎨 PALETTE 1: Marketing Site

**Bruges på:** stotmedhjerte.dk (marketing-site)
**Design-filosofi:** Én stærk brand-farve (rød) + neutralt grundlag + sektor-accents når relevant. Konsistent. Genkendeligt. Tech-leader-feel.

## Primary Brand

```css
--brand-red:           #E0193F   /* Primary brand red - CTAs, hearts, accents */
--brand-red-light:     #FF4D6A   /* Gradient end - progress bars, soft highlights */
--brand-red-tint:      #FEF2F2   /* Hover background, soft fills */
--brand-red-shadow:    rgba(224, 25, 63, 0.08)   /* Focus rings */
--brand-red-shadow-30: rgba(224, 25, 63, 0.30)   /* Strong CTA shadows */
```

**Brug:**
- ✅ Alle primary CTAs ("Book et gratis møde", "Start gratis")
- ✅ Heart-ikoner (alle steder)
- ✅ Progress-bars (linear-gradient)
- ✅ Active states (focus rings, selected items)
- ✅ Hover backgrounds (brand-red-tint)
- ❌ **Ikke** large background-fills (overwhelms)

**Gradient pattern:**
```css
background: linear-gradient(90deg, #E0193F, #FF4D6A);
```

---

## Neutral Palette

```css
/* Text */
--text-heading:        #0F172A   /* H1, H2, large display */
--text-body:           #111827   /* Body text, dark UI */
--text-secondary:      #6B7280   /* Subheadlines, descriptions */
--text-muted:          #9CA3AF   /* Captions, labels, icon-muted */
--text-inverse:        #F1F5F9   /* Light text on dark backgrounds */

/* Borders */
--border-strong:       #E5E7EB   /* Form fields, dividers */
--border-subtle:       #EBEBEB   /* Cards, soft separators */

/* Backgrounds */
--bg-base:             #FFFFFF   /* Default page background */
--bg-soft:             #F9FAFB   /* Alternating sections */
--bg-elevated:         #F3F4F6   /* Hover states, chips */
--bg-disabled:         #D1D5DB   /* Disabled buttons, muted progress */

/* Dark backgrounds (for hero/footer/CTAs) */
--bg-dark:             #0F172A   /* Mobile menu, dark hero variants */
```

**Brug:**
- Headings altid `--text-heading`
- Body altid `--text-body`
- Subheadlines `--text-secondary`
- Cards: bg-base + border-subtle
- Section-alternation: white / bg-soft

---

## Sektor-farver (Hjertesager kun)

**Bruges KUN i hjertesager-cards og kategori-filtrering.** IKKE i kanal-cards eller features.

```css
--sektor-fodbold:      #16A34A   /* Grøn */
--sektor-gymnastik:    #7C3AED   /* Lilla */
--sektor-haandbold:    #EA580C   /* Orange */
--sektor-svoemmning:   #0284C7   /* Blå */
--sektor-kampsport:    #DC2626   /* Rød (mørk) */
--sektor-handicap:     #0891B2   /* Cyan */
--sektor-kultur:       #7C3AED   /* Lilla (samme som gymnastik) */
--sektor-velgoerenhed: #16A34A   /* Grøn (samme som fodbold) */
```

**Implementeret pattern:**
```jsx
// CATEGORY_COLORS i SearchFilter.jsx + CampaignCard.jsx
const CATEGORY_COLORS = {
  'Fodbold': '#16a34a',
  'Gymnastik': '#7c3aed',
  'Håndbold': '#ea580c',
  'Svømmeklub': '#0284c7',
  'Kampsport': '#dc2626',
  'Handicap / Special': '#0891b2',
};
```

**Brug:**
- ✅ HjertesagsCard kategori-badge
- ✅ SearchFilter sektor-knapper
- ❌ **Ikke** kanal-cards (Hjertesager / Fast Støtte / Webshop)
- ❌ **Ikke** generelle UI-elementer

---

## Funktionelle farver

```css
--success:             #16A34A   /* Confirmations, positive feedback */
--success-light:       #ECFDF5   /* Success backgrounds */
--warning:             #EA580C   /* Cautions, deadlines approaching */
--warning-light:       #FFF7ED   /* Warning backgrounds */
--error:               #DC2626   /* Errors, validation failures */
--error-light:         #FEF2F2   /* Error backgrounds */
--info:                #0284C7   /* Information, tooltips */
--info-light:          #EFF6FF   /* Info backgrounds */
```

---

# 🎨 PALETTE 2: Platform (smh-app)

**Bruges på:** app.stotmedhjerte.dk (Backend, Admin, Supporter views)
**Design-filosofi:** Rolle-baserede farver så brugere altid ved hvilken kontekst de er i.

## Rolle-farver

```css
--role-backend:        #7C3AED   /* SMH-team super-admin (lilla) */
--role-admin:          #0891B2   /* Forening admin (teal) */
--role-supporter:      #E0193F   /* B2C støtter (rød) - matcher brand */
```

**Brug:**
- Backend (SMH-team views): purple borders, accents, headers
- Admin (forening views): teal borders, accents, headers
- Supporter (B2C profil): red - samme som brand-red

**Background variants:**
```css
--role-backend-bg:     #F5F3FF   /* Backend section backgrounds */
--role-admin-bg:       #ECFEFF   /* Admin section backgrounds */
--role-supporter-bg:   #FEF2F2   /* Supporter section backgrounds (= brand-red-tint) */
```

---

## Admin dark mode

```css
--dark-bg-base:        #0F172A   /* Main background */
--dark-bg-elevated:    #1E293B   /* Cards */
--dark-bg-overlay:     #334155   /* Hover states */
--dark-text:           #F1F5F9   /* Primary text on dark */
--dark-text-muted:     #94A3B8   /* Secondary text on dark */
--dark-border:         #334155   /* Dividers */
```

**Minimum kontrast:** 6.4:1 overalt (etableret standard).

---

# 📐 Typography Tokens

## Font Stack

```css
/* Logo */
--font-logo: "Elza Round Variable", system-ui, sans-serif;
/* Weight: 500, Letter-spacing: -0.05em, ™ superscript */

/* Headings */
--font-heading: -apple-system, BlinkMacSystemFont, "SF Pro Rounded", "Segoe UI", system-ui, sans-serif;

/* Body */
--font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;

/* Mono (kode, tal) */
--font-mono: "SF Mono", Menlo, Monaco, monospace;
```

## Type Scale (marketing-site)

```css
--text-display: 56px;     /* Hero H1 desktop */
--text-display-mobile: 36px;
--text-h1: 40px;          /* Section headlines */
--text-h2: 28px;          /* Subsection headlines */
--text-h3: 20px;          /* Card titles */
--text-body-lg: 18px;     /* Hero subheadline */
--text-body: 16px;        /* Default body */
--text-body-sm: 14px;     /* Captions, labels */
--text-xs: 12px;          /* Tiny labels, badges */
```

## Letter-spacing

```css
--tracking-tight: -0.05em;   /* Logo, large display */
--tracking-display: -0.03em; /* H1, H2 */
--tracking-default: -0.01em; /* Body */
--tracking-loose: 0.08em;    /* Uppercase labels */
```

---

# 📏 Spacing Tokens

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

---

# 🎬 Motion Tokens

## Easing Curves

```css
--ease-out-expo:      cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-quart:     cubic-bezier(0.25, 1, 0.5, 1);
--ease-in-out-cubic:  cubic-bezier(0.65, 0, 0.35, 1);
--ease-spring:        /* GSAP elastic.out(1, 0.5) */
```

## Durations

```css
--dur-instant: 100ms;    /* Mikro-feedback */
--dur-fast:    200ms;    /* Hover transitions */
--dur-base:    300ms;    /* Default */
--dur-medium:  500ms;    /* Section reveals */
--dur-slow:    800ms;    /* Hero animations */
--dur-extended: 1200ms;  /* Storytelling animations */
```

## Mikro-interaktion standards

```css
/* Hover (buttons) */
transition: all 250ms ease-out;
transform: translateY(-4px);
box-shadow: 0 8px 24px rgba(224, 25, 63, 0.15);

/* Hover (cards) */
transform: translateY(-8px);
box-shadow: 0 16px 48px rgba(0, 0, 0, 0.08);

/* Click */
transform: scale(0.97);
transition: 100ms ease-out;

/* Focus */
box-shadow: 0 0 0 3px rgba(224, 25, 63, 0.08);
outline: 2px solid #E0193F;
```

---

# 🌟 Shadows

```css
--shadow-xs:  0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-sm:  0 2px 8px rgba(0, 0, 0, 0.06);
--shadow-md:  0 4px 16px rgba(0, 0, 0, 0.08);
--shadow-lg:  0 8px 24px rgba(0, 0, 0, 0.10);
--shadow-xl:  0 16px 48px rgba(0, 0, 0, 0.12);
--shadow-2xl: 0 24px 64px rgba(0, 0, 0, 0.16);

/* Brand-colored shadows */
--shadow-brand-sm: 0 2px 8px rgba(224, 25, 63, 0.20);
--shadow-brand-md: 0 4px 16px rgba(224, 25, 63, 0.25);
--shadow-brand-lg: 0 8px 24px rgba(224, 25, 63, 0.30);
```

---

# 📐 Border Radius

```css
--radius-sm:   8px;
--radius-md:   10px;
--radius-lg:   12px;
--radius-xl:   16px;
--radius-2xl:  20px;
--radius-full: 999px;
```

---

# 🎯 Icon Library

**Library:** lucide-react (eksklusivt)
**Ingen anden icon-library** bruges på marketing-site eller smh-app.

## Anvendelse

Wireframes refererer ikoner med navn (ikke emoji) for konsistens:

```jsx
import { Heart, ShieldCheck, ArrowRight } from 'lucide-react';
```

## Etablerede ikoner (faktisk brug i marketing-site)

| Ikon | Brug | Kontekst |
|---|---|---|
| **ShieldCheck** | Trust, sikkerhed, verificering | Compliance, GDPR, KYC |
| **Heart** | Hjertesager, donationer, støtte | Primary brand-ikon |
| **ArrowRight** | CTAs, "se mere", links | Universal navigation |
| **ArrowLeft** | Tilbage-navigation | Detail-sider |
| **Users** | Foreninger, fællesskab | B2B kontekst |
| **ShoppingBag** | Webshop, supporterprodukter | Webshop-kanal |
| **CreditCard** | Betaling, priser | Pricing/payment |
| **Eye** / **EyeOff** | Synlighed, anonymitet | Privacy/preview |
| **Repeat** | Fast Støtte, abonnement | Recurring payments |
| **TrendingUp** | Vækst, statistik | Growth/metrics |
| **MapPin** | Lokation, geografi | Forenings-info |
| **Check** | Bekræftelser, godkendelse | Form completion |
| **X** | Luk, fjern | Modal/close |
| **Mail** | Email, kommunikation | Notifications |
| **Bell** | Reminders, beskeder | Notifications |
| **FileText** | Dokumenter, regnskab | Documentation |
| **ChevronRight** / **ChevronLeft** | Pagination, expand | Navigation |
| **Lock** / **Unlock** | Sikkerhed, status | Security states |
| **Search** | Søgning | Filter/find |
| **SlidersHorizontal** | Filter, indstillinger | Settings |
| **Share2** | Deling, SoMe | Social sharing |
| **Target** | Mål, hjertesager | Campaign goals |
| **AlertTriangle** | Advarsler | Errors/warnings |
| **Star** | Anerkendelse, milestones | Recognition |
| **Zap** | Hurtig, instant | Speed indicators |
| **MessageCircle** | Support, kontakt | Help/chat |
| **Settings** | Indstillinger | Configuration |
| **BarChart3** | Statistik, dashboard | Data visualization |
| **Video** | Video-content | Media |
| **RefreshCw** | Refresh, opdatering | Reload states |

## Ikon-mapping per kontekst

### Verificering & sikkerhed
- KYC/MitID-tjek: `ShieldCheck`
- GDPR: `Lock`
- Audit-trail: `FileText`
- Verificeret status: `Check`

### Indkomstkanaler
- Hjertesager: `Heart`
- Fast Støtte: `Repeat`
- Webshop: `ShoppingBag`

### Process-trin (B2B onboarding)
- Trin 1 Registrering: `Users`
- Trin 2 Verificering: `ShieldCheck` (IKKE Lock — match etableret pattern)
- Trin 3 Profil: `Eye` (preview af profil)
- Trin 4 Kanaler: `Target`
- Trin 5 Indsamlingsnævn: `FileText`
- Trin 6 Del: `Share2`

### B2C trin
- Opdag: `Search`
- Vælg: `Target`
- Konto: `Users`
- Betaling: `CreditCard`
- Følg: `TrendingUp`

### Kommunikation
- Email-kvittering: `Mail`
- Reminder: `Bell`
- Newsletter: `Mail`
- Support: `MessageCircle`

### Pricing / penge
- Pris: `CreditCard`
- Vækst: `TrendingUp`
- Stats: `BarChart3`

## ❌ Ikke brugt (undgå disse)

For at sikre konsistens, brug IKKE disse selvom de findes i lucide-react:
- `Coins`, `Banknote`, `Wallet` — brug `CreditCard` i stedet
- `Trophy`, `Medal` — brug `Star` i stedet
- `Briefcase`, `Building` — brug `Users` til foreninger
- `Mail` med variationer (`MailCheck`, etc.) — brug bare `Mail` + context
- Emoji som ikoner i UI (kun OK i wireframe-noter)

## Regler

1. **Stroke-width:** 2 (lucide default)
2. **Størrelse:** 14, 16, 18, 20, 24px (afhænger af kontekst)
3. **Farve:** Brand-red (#E0193F) i red-tint container, eller direkte brand-red
4. **Container:** Cirkel eller afrundet square med #FEF2F2 background

---

---

# 🎯 Visual Hierarchy Rules

## Marketing-site card-system

### Primary card (KEY-feature highlight)
- Background: `--bg-base` (white)
- Border: `1.5px solid #E0193F` (brand red)
- Shadow: `--shadow-md`
- Inner accent: brand-red elements
- **Brug:** Hjertesager-card i sektion 3, Hero CTA-zone

### Secondary card (regular features)
- Background: `--bg-base`
- Border: `1px solid #EBEBEB` (border-subtle)
- Shadow: `--shadow-sm`
- Inner accent: neutral with red micro-accents
- **Brug:** Fast Støtte, Webshop, generic feature cards

### Soft card (informational, low-priority)
- Background: `--bg-soft` (#F9FAFB)
- Border: none
- Shadow: none
- **Brug:** Insight-boxes, mini-tips

---

# 🔧 Implementering

## CSS Custom Properties

Alle tokens implementeres som CSS custom properties i `:root`:

```css
:root {
  /* Brand */
  --brand-red: #E0193F;
  --brand-red-light: #FF4D6A;
  /* ... etc ... */
}
```

## Tailwind config (hvis bruges)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#E0193F',
          light: '#FF4D6A',
          tint: '#FEF2F2',
        },
        // ... etc ...
      }
    }
  }
}
```

## Inline styles (current pattern i marketing-site)

Marketing-site bruger inline styles. Token-strings refereres direkte:
```jsx
<button style={{ background: '#E0193F', borderRadius: 10 }}>
```

**Note:** Refactoring til CSS custom properties er en P3-task post-launch.

---

# 📋 Hvor hver palette bruges

| Sted | Palette | Note |
|---|---|---|
| stotmedhjerte.dk (marketing) | Marketing | Primary red + neutrals |
| stotmedhjerte.dk hjertesager-cards | Marketing + sektor | Sektor-farver kun her |
| shop.stotmedhjerte.dk (Shopify) | Marketing | Behold red brand |
| app.stotmedhjerte.dk Backend | Platform - Backend | Purple |
| app.stotmedhjerte.dk Admin | Platform - Admin | Teal |
| app.stotmedhjerte.dk Supporter | Platform - Supporter | Red (= brand) |
| Email templates | Marketing | Red brand |
| PDF receipts | Marketing | Red brand |

---

# Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial brand-tokens dokument baseret på kode-audit. Definerer 2 separate paletter (Marketing + Platform). Opretter token-system for typography, spacing, motion, shadows, radius. |
