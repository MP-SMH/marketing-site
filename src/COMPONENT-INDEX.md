# Component Index - SMH Design System Code Phase 2

| Nr. | Fil | Type | Props summary |
|---:|---|---|---|
| 1 | components/hooks/useInViewport.js | Hook | `threshold`, `rootMargin` - returns `[ref, inView]` |
| 2 | components/hooks/useCountUp.js | Hook | `target`, `{ duration, start, decimals }` |
| 3 | components/hooks/useReducedMotion.js | Hook | `defaultValue` - returns boolean |
| 4 | components/ui/Button.jsx | Atom | `variant`, `size`, `loading`, `disabled`, `as`, `iconLeft`, `iconRight` |
| 5 | components/ui/Input.jsx | Atom | `label`, `type`, `helperText`, `error`, `iconLeft`, `iconRight`, `textarea` |
| 6 | components/ui/Select.jsx | Atom | `label`, `options`, `helperText`, `error`, `children` |
| 7 | components/ui/Checkbox.jsx | Atom | `label`, `checked`, `defaultChecked`, `onChange`, `disabled` |
| 8 | components/ui/Radio.jsx | Atom | `label`, `checked`, `defaultChecked`, `onChange`, `disabled` |
| 9 | components/ui/Switch.jsx | Atom | `checked`, `onChange`, `label`, `disabled` |
| 10 | components/ui/Pill.jsx | Atom | `variant`, `icon`, `children` |
| 11 | components/ui/Tag.jsx | Atom | `icon`, `children` |
| 12 | components/ui/Chip.jsx | Atom | `icon`, `selected`, `children` |
| 13 | components/ui/Avatar.jsx | Atom | `name`, `src`, `size`, `status` |
| 14 | components/ui/StatusIndicator.jsx | Atom | `status`, `children` |
| 15 | components/ui/Skeleton.jsx | Atom | `width`, `height`, `radius` |
| 16 | components/ui/Eyebrow.jsx | Atom | `children` |
| 17 | components/ui/Container.jsx | Atom | `children`, `className` |
| 18 | components/ui/ContainerWide.jsx | Atom | `children`, `className` |
| 19 | components/ui/SurfaceProvider.jsx | Atom | `surface`, `as`, `className` |
| 20 | components/ui/FormField.jsx | Molecule | Input passthrough props |
| 21 | components/ui/Card.jsx | Molecule | `variant`, `interactive`, `as`, plus `CardHeader`, `CardFooter` |
| 22 | components/ui/StatTile.jsx | Molecule | `label`, `value`, `trend`, `icon` |
| 23 | components/ui/KpiCard.jsx | Molecule | StatTile passthrough props |
| 24 | components/ui/Tabs.jsx | Molecule | `items`, `value`, `defaultValue`, `onChange`, `variant` |
| 25 | components/ui/Pagination.jsx | Molecule | `page`, `pageCount`, `onPageChange` |
| 26 | components/ui/SearchBar.jsx | Molecule | `value`, `onChange`, `placeholder` |
| 27 | components/ui/EmptyState.jsx | Molecule | `icon`, `title`, `body`, `actionLabel`, `onAction` |
| 28 | components/ui/Toast.jsx | Molecule | `ToastProvider`, `useToast()` |
| 29 | components/ui/Tooltip.jsx | Molecule | `content`, `children` |
| 30 | components/ui/Popover.jsx | Molecule | `trigger`, `children` |
| 31 | components/ui/Section.jsx | Molecule | `variant`, `eyebrow`, `title`, `subtitle`, `centered`, `container`, `id` |
| 32 | components/ui/TopNavigation.jsx | Organism | No required props |
| 33 | components/ui/AppNavigation.jsx | Organism | TopNavigation passthrough |
| 34 | components/ui/Sidebar.jsx | Organism | `items`, `active`, `collapsed`, `onSelect` |
| 35 | components/ui/PageHeader.jsx | Organism | `eyebrow`, `title`, `subtitle`, `actions`, `tabs` |
| 36 | components/ui/Modal.jsx | Organism | `open`, `onClose`, `title`, `children`, `actions` |
| 37 | components/ui/SideSheet.jsx | Organism | Modal passthrough |
| 38 | components/ui/Drawer.jsx | Organism | `open`, `onClose`, `title`, `children` |
| 39 | components/ui/Wizard.jsx | Organism | `children`, `initialStep`, `onComplete` |
| 40 | components/ui/WizardStep.jsx | Organism | `children` |
| 41 | components/ui/DataTable.jsx | Organism | `columns`, `rows`, `pageSize` |
| 42 | components/ui/DistributionChart.jsx | Organism | `rows`, `totalLabel`, `totalValue` |
| 43 | components/ui/ActivityFeed.jsx | Organism | `items` |
| 44 | components/ui/DashboardMockup.jsx | Organism | `variant='hero'|'preview'` |
| 45 | components/ui/HjertesagCard.jsx | Organism | `title`, `location`, `amount`, `image`, `category` |
| 46 | components/ui/FaqAccordion.jsx | Organism | `items`, `allowMultiple` |
| 47 | components/ui/AudiencePathSelector.jsx | Organism | No required props |
| 48 | components/ui/DashboardWidget.jsx | Molecule | `title`, `children`, `action` |
| 49 | components/marketing/HeroSection.jsx | Marketing | No required props |
| 50 | components/marketing/AudiencePathSection.jsx | Marketing | No required props |
| 51 | components/marketing/PengestroemmenSection.jsx | Marketing | No required props |
| 52 | components/marketing/TrustStackSection.jsx | Marketing | No required props |
| 53 | components/marketing/LiveDashboardSection.jsx | Marketing | No required props |
| 54 | components/marketing/IndtaegtskanalerSection.jsx | Marketing | No required props |
| 55 | components/marketing/HowItWorksSection.jsx | Marketing | No required props |
| 56 | components/marketing/PricingSection.jsx | Marketing | No required props |
| 57 | components/marketing/FaqSection.jsx | Marketing | No required props |
| 58 | components/marketing/Testimonials.jsx | Marketing | No required props |
| 59 | components/marketing/FinalCTASection.jsx | Marketing | No required props |
| 60 | components/marketing/MarketingFooter.jsx | Marketing | No required props |
| 61 | pages/Home.jsx | Page | Composes all marketing sections |

## Notes

- Alle komponenter bruger `mkt-*` classes og central CSS i `styles/mkt-components.css`.
- Koden er JavaScript/JSX, ikke TypeScript.
- Der er ingen nye dependencies.
- Marketing-Home importerer CSS direkte fra `../styles/mkt-components.css`.
