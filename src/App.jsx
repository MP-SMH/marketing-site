/**
 * App.jsx - StoetMedHjerte marketing-site
 *
 * Hovedrouter for beta.stotmedhjerte.dk (rykkes til stotmedhjerte.dk
 * naar Shopify-migration er gennemfoert).
 *
 * Arkitektur:
 *  - <AuthProvider> wrapper hele app for at give global auth-state
 *  - INGEN auth-blocker: public pages renderer instant
 *  - HashRouter bevares for at understoette eksisterende URL-struktur
 *    (skiftes til BrowserRouter naar Shopify-migration er klar)
 *  - <ScrollToTop> resetter scroll-position ved route-changes
 *  - <QueryClientProvider> deler @tanstack/react-query cache
 *
 * Routes:
 *  Public (ingen auth):
 *    /, /hjertesager, /foreninger, /saadan-virker-det, /priser,
 *    /om-os, /blog, /faq, /kontakt, /book-moede, /fast-stoette,
 *    /betingelser, /privatlivspolitik, /cookiepolitik, /support
 *
 *  Auth (signup/login forms):
 *    /opret-forening, /login-forening (B2B forening admin)
 *    /opret-stoetter, /login-stoetter (B2C stoetter)
 *
 *  Auth-required (kommer P3+):
 *    /min-profil, /min-profil/abonnementer, /min-profil/foreninger
 *
 * Migration: replaced Base44 SDK auth-blocker med Supabase-baseret
 * letvægts AuthContext (P2-006a, april 2026).
 */

import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';

import { AuthProvider } from '@/lib/AuthContext';
import PageNotFound from '@/lib/PageNotFound';

// Page imports
import Home from './pages/Home';
import HjertesagerPage from './pages/HjertesagerPage';
import ForeningerPage from './pages/ForeningerPage';
import SaadanVirkerDetPage from './pages/SaadanVirkerDetPage';
import PriserPage from './pages/PriserPage';
import OmOsPage from './pages/OmOsPage';
import BlogPage from './pages/BlogPage';
import FAQPage from './pages/FAQPage';
import KontaktPage from './pages/KontaktPage';
import BookModePage from './pages/BookModePage';
import BetingelserPage from './pages/BetingelserPage';
import PrivatlivspolitikPage from './pages/PrivatlivspolitikPage';
import CookiepolitikPage from './pages/CookiepolitikPage';
import SupportPage from './pages/SupportPage';
import FastStoettePage from './pages/FastStoettePage';
import StoetterAuthPage from './pages/StoetterAuthPage';
import ForeningAuthPage from './pages/ForeningAuthPage';
import OpretForeningPage from './pages/OpretForeningPage';
import OpretStoetterPage from './pages/OpretStoetterPage';

// Scroll-to-top ved route-changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public marketing pages */}
            <Route path="/" element={<Home />} />
            <Route path="/hjertesager" element={<HjertesagerPage />} />
            <Route path="/foreninger" element={<ForeningerPage />} />
            <Route path="/saadan-virker-det" element={<SaadanVirkerDetPage />} />
            <Route path="/priser" element={<PriserPage />} />
            <Route path="/om-os" element={<OmOsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/kontakt" element={<KontaktPage />} />
            <Route path="/book-moede" element={<BookModePage />} />
            <Route path="/betingelser" element={<BetingelserPage />} />
            <Route path="/privatlivspolitik" element={<PrivatlivspolitikPage />} />
            <Route path="/cookiepolitik" element={<CookiepolitikPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/fast-stoette" element={<FastStoettePage />} />

            {/* Auth pages (signup/login forms) */}
            <Route path="/login-stoetter" element={<StoetterAuthPage />} />
            <Route path="/login-forening" element={<ForeningAuthPage />} />
            <Route path="/opret-stoetter" element={<OpretStoetterPage />} />
            <Route path="/opret-forening" element={<OpretForeningPage />} />

            {/* 404 fallback */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
