import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// UI Components
import { TooltipProvider } from '../components/ui/tooltip';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { PageTransition } from '../components/ui/PageTransition';

// App Components
import { Header } from '../components/Header';
import { ContactModal } from '../components/ContactModal';
import { FloatingThemeToggle } from '../components/FloatingThemeToggle';
import { I18nProvider, useI18n } from '../lib/i18n-new';
import { ThemeProvider } from '../contexts/ThemeContext';

// Pages
import Index from '../pages/Index';
import Services from '../pages/Services';
import About from '../pages/About';
import ContactPage from '../pages/Contact';

// Styles
import './global.css';

const queryClient = new QueryClient();

function Footer() {
  const { t } = useI18n();
  
  return (
    <footer className="border-t border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} 300k Studio. {t('footer.copy', {})}
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a 
            href="mailto:hello@300k.studio" 
            className="hover:text-primary transition-colors duration-200"
          >
            hello@300k.studio
          </a>
          <a 
            href="https://300k.studio" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-primary transition-colors duration-200"
          >
            300k.studio
          </a>
        </div>
      </div>
    </footer>
  );
}

interface AppContentProps {
  children: ReactNode;
}

function AppContent({ children }: AppContentProps) {
  return (
    <div className="flex min-h-screen flex-col relative bg-gradient-to-b from-background to-muted/10">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Header />
        <PageTransition>
          <main className="flex-1 w-full">
            {children}
          </main>
        </PageTransition>
        <Footer />
      </div>
      {/* Floating Theme Toggle */}
      <FloatingThemeToggle />
      
      <Toaster position="top-center" />
    </div>
  );
}

function Router() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { backgroundLocation?: Location; modal?: boolean } | undefined;
  const backgroundLocation = state?.backgroundLocation;

  const handleContactClose = () => {
    if (backgroundLocation) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<AppContent><Index /></AppContent>} />
        <Route path="/services" element={<AppContent><Services /></AppContent>} />
        <Route path="/about" element={<AppContent><About /></AppContent>} />
        <Route path="/contact" element={<AppContent><ContactPage /></AppContent>} />
        <Route path="*" element={<AppContent><div>Not Found</div></AppContent>} />
      </Routes>

      {state?.modal && (
        <ContactModal open={true} onClose={handleContactClose} />
      )}
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <I18nProvider>
            <TooltipProvider>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
              <Toaster position="top-center" />
            </TooltipProvider>
          </I18nProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
