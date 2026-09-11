import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';

// Testopsaetning holdes adskilt fra vite.config.js, saa "npm run build"
// (produktions-deploy) aldrig afhaenger af testvaerktoej. Alias-opsaetningen
// (@/ -> src/) arves fra vite.config.js via mergeConfig, saa den kun findes ét sted.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: false,
      setupFiles: ['./src/test/setup.js'],
      include: ['src/**/*.{test,spec}.{js,jsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
      },
    },
  })
);
