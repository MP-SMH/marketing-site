/**
 * Supabase client - StoetMedHjerte marketing-site
 *
 * Singleton-instans bruges af AuthContext, OpretForeningPage,
 * StoetterAuthPage, etc.
 *
 * Sikkerhed:
 * - Anon-key er public-safe (begraenset af RLS-policies paa serveren)
 * - Service-role key er IKKE her (kun i smh-api Hetzner-backend)
 *
 * Auth-konfiguration:
 * - persistSession: true - Supabase auto-saver session i localStorage
 * - autoRefreshToken: true - tokens fornyes automatisk foer udloeb
 * - detectSessionInUrl: true - haandter OAuth callback URLs (fremtidig brug)
 *
 * Cross-tab sync:
 * - Supabase bruger BroadcastChannel internt - logout i ét tab logger
 *   ud i alle aabne tabs paa samme domain.
 *
 * Reference: docs/strategy/auth-strategy.md Model D
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase config missing: ensure VITE_SUPABASE_URL and ' +
    'VITE_SUPABASE_ANON_KEY are set in .env'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'smh-auth-session',         // Unik key for at undgaa konflikt
                                            // hvis flere Supabase-projekter
                                            // koerer paa samme domain
  },
});

// API base URL (smh-api endpoint)
export const SMH_API_URL = import.meta.env.VITE_SMH_API_URL || 'https://api.stotmedhjerte.dk';
