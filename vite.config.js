import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

/**
 * Vite config - StoetMedHjerte marketing site
 *
 * Build target: beta.stotmedhjerte.dk (Netlify hosted)
 * Migration: replaced Base44 vite-plugin med standard React+Vite config
 *
 * Path-alias '@' peger paa src/ for at matche eksisterende imports
 * (@/lib/AuthContext, @/components/ui/toaster, etc).
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
    strictPort: false,
  },
});
