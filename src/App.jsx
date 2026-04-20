import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
// Add page imports here
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

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
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
      <Route path="/login-stoetter" element={<StoetterAuthPage />} />
      <Route path="/login-forening" element={<ForeningAuthPage />} />
      <Route path="/opret-stoetter" element={<OpretStoetterPage />} />
      <Route path="/opret-forening" element={<OpretForeningPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App