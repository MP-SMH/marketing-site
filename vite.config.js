import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const configDirectory = path.dirname(fileURLToPath(import.meta.url));

const profilePreview = process.env.CONTEXT === 'deploy-preview' && process.env.VITE_SMH_PUBLIC_PROFILE_PROXY === 'true';
const excludedProfileModules = [
  'src/lib/AuthContext.jsx',
  'src/pages/OpretForeningPage.jsx',
  'src/components/SignupCheckout.jsx',
  'src/pages/HjertesagCheckout.jsx',
  'src/data/pricing.js',
];
const profileBoundaryPlugin = {
  name: 'profile-preview-module-boundary',
  configResolved(config) {
    if (config.build.sourcemap !== false) throw Error('profile_preview_sourcemaps_must_be_disabled');
  },
  generateBundle(_options, bundle) {
    const modules = Object.values(bundle).filter(file => file.type === 'chunk').flatMap(chunk =>
      Object.entries(chunk.modules).filter(([, info]) => info.renderedLength > 0).map(([id]) => id.replaceAll('\\', '/'))
    );
    const present = file => modules.some(id => id.endsWith('/' + file));
    if (!present('src/ProfilePreviewApp.jsx') || !present('src/pages/ForeningPage.jsx')) this.error('profile_preview_entry_missing');
    for (const file of excludedProfileModules) if (present(file)) this.error('profile_preview_excluded_module:' + file);
    this.emitFile({type:'asset',fileName:'staging-profile-modules.json',source:JSON.stringify({
      entry_verified:true,profile_component_verified:true,excluded_module_count:excludedProfileModules.length,
      excluded_present_count:0,sourcemap:false,
    },null,2)+'\n'});
  },
};


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
  plugins: [react(), ...(profilePreview ? [profileBoundaryPlugin] : [])],
  resolve: {
    alias: {
      ...(profilePreview ? {'@/App.jsx': path.resolve(configDirectory, './src/ProfilePreviewApp.jsx')} : {}),
      '@': path.resolve(configDirectory, './src'),
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
