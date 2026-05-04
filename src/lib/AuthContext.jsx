/**
 * AuthContext - StoetMedHjerte marketing-site
 *
 * Letvægts global auth-state for:
 *  - Header personalisering (vis "Login" vs "Min profil" vs "Gaa til forening")
 *  - Auth-pages (signup/login forms)
 *  - Stoetter-portal pages (/min-profil/*)
 *
 * KRITISK: Denne context BLOKERER IKKE rendering. Public pages renderer
 * instant. Auth-state loades async i baggrunden.
 *
 * Tre brugertilstande:
 *  1. Anonymous (ikke logget ind)
 *     - Kan browse alt public-content
 *     - Header viser "Login" + "Opret konto"
 *
 *  2. Stoetter (logget ind som B2C)
 *     - Adgang til /min-profil/* sider
 *     - Header viser "Hej {navn}" + "Min profil"
 *
 *  3. Forening-admin (logget ind som B2B)
 *     - Header viser "Hej {navn}" + "Gaa til forening"
 *     - "Gaa til forening" -> redirect til app.stotmedhjerte.dk
 *     - Kan ogsaa stoette andre foreninger som B2C (multi-rolle)
 *
 * Enterprise-grade features:
 *  - SSR-safe: initial state = null, ikke undefined (forhindrer hydration mismatch)
 *  - Token refresh: lytter til Supabase onAuthStateChange
 *  - Cross-tab sync: Supabase BroadcastChannel inkluderet
 *  - Graceful degradation: errors logges, crasher ikke siden
 *  - GDPR: ingen 3rd party tracking i auth-state
 *  - Performance: profile-data fetched kun naar bruger er logget ind
 *
 * Reference: docs/strategy/auth-strategy.md Model D
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';

import { supabase } from './supabaseClient';

const AuthContext = createContext(null);

// ===========================================================================
// AuthProvider
// ===========================================================================

export function AuthProvider({ children }) {
  // Core state
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ---------------------------------------------------------------
  // Helper: fetch profile-data fra public.profiles
  // ---------------------------------------------------------------
  const fetchProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null);
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, role, organization_uuid, full_name, supporter_uuid')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        // Graceful degradation - log men crash ikke
        console.error('[AuthContext] fetchProfile failed:', error.message);
        setProfile(null);
        return null;
      }

      setProfile(data);
      return data;
    } catch (err) {
      console.error('[AuthContext] fetchProfile threw:', err.message);
      setProfile(null);
      return null;
    }
  }, []);

  // ---------------------------------------------------------------
  // Initial session-load + onAuthStateChange listener
  // ---------------------------------------------------------------
  useEffect(() => {
    let mounted = true;

    // Step 1: Hent initial session fra localStorage (synchronously hvor muligt)
    const initSession = async () => {
      try {
        const { data: { session: initialSession }, error } =
          await supabase.auth.getSession();

        if (!mounted) return;

        if (error) {
          console.error('[AuthContext] getSession failed:', error.message);
          setSession(null);
          setProfile(null);
        } else {
          setSession(initialSession);
          if (initialSession?.user?.id) {
            await fetchProfile(initialSession.user.id);
          }
        }
      } catch (err) {
        console.error('[AuthContext] initSession threw:', err.message);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initSession();

    // Step 2: Lyt til auth-state changes (login, logout, token-refresh)
    // Dette haandterer cross-tab sync via Supabase BroadcastChannel
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!mounted) return;

        // Events: SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_UPDATED, PASSWORD_RECOVERY
        setSession(newSession);

        if (event === 'SIGNED_OUT') {
          setProfile(null);
        } else if (newSession?.user?.id) {
          // Re-fetch profile efter login eller user-update
          if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
            await fetchProfile(newSession.user.id);
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  // ---------------------------------------------------------------
  // Logout (med graceful fallback)
  // ---------------------------------------------------------------
  const logout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('[AuthContext] logout failed:', error.message);
      }
      setSession(null);
      setProfile(null);
    } catch (err) {
      console.error('[AuthContext] logout threw:', err.message);
      // Force state reset selv om Supabase-call fejlede
      setSession(null);
      setProfile(null);
    }
  }, []);

  // ---------------------------------------------------------------
  // Computed state (derived from session + profile)
  // ---------------------------------------------------------------
  const value = useMemo(() => {
    const isAuthenticated = !!session?.user;

    // Rolle-aware helpers
    const isSupporter = isAuthenticated && profile?.role === 'supporter';
    const isForeningAdmin = isAuthenticated && profile?.role === 'admin';

    // Multi-rolle: bruger har baade organization_uuid OG supporter_uuid
    const hasMultipleRoles =
      isAuthenticated &&
      !!profile?.organization_uuid &&
      !!profile?.supporter_uuid;

    /**
     * Beregn korrekt redirect-URL efter login.
     * - Forening-admin -> app.stotmedhjerte.dk/onboarding (eller dashboard)
     * - Stoetter -> /min-profil
     * - Multi-rolle -> /vaelg-rolle (fremtidig P3+)
     */
    const getRedirectUrl = () => {
      if (!isAuthenticated || !profile) return '/';

      if (isForeningAdmin) {
        // External redirect til smh-app
        return 'https://app.stotmedhjerte.dk';
      }

      if (isSupporter) {
        return '/min-profil';
      }

      return '/';
    };

    return {
      // Raw state
      session,
      user: session?.user || null,
      profile,
      isLoading,

      // Boolean helpers
      isAuthenticated,
      isSupporter,
      isForeningAdmin,
      hasMultipleRoles,

      // Actions
      logout,
      refetchProfile: () => fetchProfile(session?.user?.id),

      // Navigation helpers
      getRedirectUrl,
    };
  }, [session, profile, isLoading, logout, fetchProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ===========================================================================
// useAuth hook
// ===========================================================================

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
