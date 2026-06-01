# Installation - SMH Design System Code Phase 2

## 1. Unzip i `src/`

```bash
unzip -o smh-design-system-code.zip -d ~/Desktop/marketing-site/src/
```

Pakken er struktureret til at lande direkte i `src/`:

```txt
src/
├── components/
│   ├── hooks/
│   ├── marketing/
│   └── ui/
├── pages/
│   └── Home.jsx
└── styles/
    └── mkt-components.css
```

## 2. Sørg for dependencies

Koden forventer eksisterende projekt med:

```txt
Vite 6.4
React 18
react-router-dom
lucide-react
```

Der er ingen ekstra dependencies.

## 3. Route `Home.jsx`

Hvis projektet allerede har routing, peg forsiden på:

```jsx
import Home from './pages/Home';
```

Eksempel med HashRouter:

```jsx
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}
```

## 4. Verificering

```bash
npm run dev
```

Tjek derefter:

- Home renderer hero + alle marketingsektioner
- FAQ åbner/lukker uden scroll-jump
- AudiencePathSelector skifter mellem forening og støtter
- DashboardMockup hero og preview vises
- DistributionChart bars animerer ved viewport
- Mobile 380px layout stacker korrekt
- `prefers-reduced-motion` reducerer animationer

## 5. CSS-strategi

Denne fase bruger én central CSS-fil:

```txt
src/styles/mkt-components.css
```

`Home.jsx` importerer filen direkte. Hvis du allerede importerer global CSS i `main.jsx`, kan du flytte importen dertil.
