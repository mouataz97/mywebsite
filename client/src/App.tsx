import { useState, useEffect, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// UI Components
import { TooltipProvider } from '../components/ui/tooltip';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { PageTransition } from '../components/ui/PageTransition';
import { Modal } from '../components/ui/Modal';

// App Components
import { Header } from '../components/Header';
import { ContactModal } from '../components/ContactModal';
import { I18nProvider, useI18n } from '../lib/i18n-new';
import { ThemeProvider } from '../contexts/ThemeContext';

// Pages
import Index from '../pages/Index';
import Services from '../pages/Services';

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
  const location = useLocation();
  const navigate = useNavigate();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Handle contact modal state
  useEffect(() => {
    if (location.state?.modal) {
      setIsContactModalOpen(true);
    }
  }, [location.state]);

  const handleContactModalClose = () => {
    setIsContactModalOpen(false);
    // Remove the modal state from history
    if (location.state?.modal) {
      navigate(-1);
    }
  };

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

      <ContactModal 
        open={isContactModalOpen}
        onClose={handleContactModalClose}
      />
      <Toaster position="top-center" />
    </div>
  );
}

function Router() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location; modal?: boolean } | undefined;
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<AppContent><Index /></AppContent>} />
        <Route path="/services" element={<AppContent><Services /></AppContent>} />
        <Route path="/contact" element={<AppContent><div>Contact Page</div></AppContent>} />
        <Route path="*" element={<AppContent><div>Not Found</div></AppContent>} />
      </Routes>

      {/* Modal route overlay when a modal navigation occurs */}
      {backgroundLocation && state?.modal && (
        <Routes>
          <Route path="/contact" element={<ContactModal open={true} onClose={() => window.history.back()} />} />
        </Routes>
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

