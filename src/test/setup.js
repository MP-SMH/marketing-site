// Tilfoejer jest-dom's matchers (fx toBeInTheDocument) til Vitests expect.
// globals er slaaet FRA i vite.config.js, saa testfiler importerer
// describe/it/expect/vi eksplicit fra 'vitest'. Ingen skjulte globaler.
import '@testing-library/jest-dom/vitest';
