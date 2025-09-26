import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useI18n } from '@/lib/i18n-new';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitch } from './ThemeSwitch';

interface NavLink {
  to: string;
  label: string;
}

export function Header() {
  const { t } = useI18n();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key and outside clicks
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Close if clicking on the backdrop (not the menu content)
      if (target.closest('[role="dialog"]') && !target.closest('.menu-content')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  const navLinks = [
    { to: "/", label: t("header.home") },
    { to: "/services", label: t("header.services") },
    { to: "/about", label: t("header.about") },
    { to: "/contact", label: t("header.contact") },
  ];
  
  const renderNavLink = (link: { to: string; label: string }, isMobile = false) => {
    return (
      <NavLink
        key={link.to}
        to={link.to}
        state={link.to === "/contact" ? { modal: true, backgroundLocation: location } : undefined}
        className={({ isActive }) =>
          `transition-all duration-300 relative group ${
            isMobile 
              ? 'flex items-center w-full px-3 py-3 rounded-lg text-base min-h-[48px] touch-manipulation' 
              : 'inline-block px-4 py-3 rounded-md text-base'
          } ${
            isActive 
              ? 'text-primary font-medium bg-primary/10' 
              : 'text-muted-foreground hover:text-primary hover:bg-accent/10'
          }`
        }
        end={link.to === "/"}
        onClick={() => isMobile && setIsMenuOpen(false)}
      >
        {({ isActive }) => (
          <>
            <span className="relative z-10">{link.label}</span>
            {isMobile && isActive && (
              <span className="ml-auto">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </span>
            )}
            {!isMobile && (
              <>
                <span className={`absolute bottom-0 left-0 w-0 h-full bg-accent/5 transition-all duration-300 group-hover:w-full ${
                  isActive ? 'w-full' : ''
                }`}></span>
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4/5 -translate-x-1/2"></span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 w-4/5 h-0.5 bg-primary -translate-x-1/2"></span>
                )}
              </>
            )}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <header 
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md border-border/20 shadow-sm' 
          : 'bg-background/80 backdrop-blur-sm border-transparent'
      }`}
    >
      <div className="container h-16 flex items-center justify-between px-4 sm:px-6">
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Home"
        >
          <div className="h-6 w-6 rounded-sm bg-gradient-to-br from-primary to-primary/60 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-lg font-semibold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/70 transition-colors duration-300">
            300k.studio
          </span>
        </Link>
        
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => renderNavLink(link))}
          <div className="h-6 w-px bg-border/40 mx-2"></div>
          <div className="flex items-center gap-2 pl-1">
            <LanguageSwitcher />
            <ThemeSwitch />
          </div>
        </nav>
        
        {/* Mobile menu button */}
        <button
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden h-12 w-12 flex items-center justify-center rounded-full hover:bg-accent/10 hover:text-primary transition-colors duration-200 touch-manipulation active:scale-95"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu backdrop */}
      <div 
        className={`fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}
        role="dialog" 
        aria-modal="true"
        aria-hidden={!isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
      >
        {/* Mobile menu panel */}
        <div 
          className={`fixed top-0 right-0 h-full w-1/2 min-w-[280px] bg-background border-l border-border/20 shadow-2xl transition-transform duration-300 ease-in-out menu-content ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
            <div className="h-full overflow-y-auto">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-4 border-b border-border/20">
                <span className="text-lg font-semibold tracking-tight">Menu</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-accent/10 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
                
              {/* Mobile navigation */}
              <nav className="p-4">
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.to}>
                      {renderNavLink(link, true)}
                    </div>
                  ))}
                </div>
              </nav>
              
              {/* Mobile footer */}
              <div className="p-4 mt-auto border-t border-border/20">
                <div className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <div className="text-sm font-medium text-muted-foreground">Language</div>
                    <LanguageSwitcher />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="text-sm font-medium text-muted-foreground">Theme</div>
                    <ThemeSwitch />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </header>
  );
}
