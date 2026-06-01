# Integration Notes - Final Fix

## Navbar
The homepage sections now have corrected contrast and surface hierarchy, but the sticky navbar belongs outside this component package.

Required navbar behavior:
- Dark/glass navbar over Hero, TrustStack and FinalCTA.
- Light navbar over light sections.
- No white navbar bar on dark content.

Suggested dark state:
```css
.mkt-navbar.is-dark {
  background: rgba(7, 11, 22, 0.78);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  color: #FFFFFF;
}
```

## File names
Versioned filenames are used for handoff clarity. Rename if your import system prefers non-versioned component filenames.
