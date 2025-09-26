import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useI18n } from '@/lib/i18n-new';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitch } from './ThemeSwitch';
import { useTheme } from '@/hooks/use-theme';

interface NavLink {
  to: string;
  label: string;
}

export function Header() {
  const { t, locale } = useI18n();
  const location = useLocation();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const isArabic = locale === 'ar';
  
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
              ? `flex items-center w-full rounded-lg text-lg min-h-[${isArabic ? '72px' : '64px'}] touch-manipulation font-medium ${isArabic ? 'px-8 py-6' : 'px-6 py-5'}` 
              : `inline-block rounded-md text-base ${isArabic ? 'px-6 py-4' : 'px-5 py-3'}`
          } ${
            isActive 
              ? 'text-primary font-medium bg-primary/10' 
              : 'text-muted-foreground hover:text-primary hover:bg-accent/10'
          } ${isArabic ? 'text-right' : ''}`
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
      className={`sticky top-0 z-[9998] border-b transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md border-border/20 shadow-sm' 
          : 'bg-background/80 backdrop-blur-sm border-transparent'
      }`}
    >
      <div className="container h-16 flex items-center justify-between px-4 sm:px-6" dir="auto">
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
        <nav className="hidden md:flex items-center gap-2" dir="auto">
          {navLinks.map(link => renderNavLink(link))}
          <div className="h-6 w-px bg-border/40 mx-3"></div>
          <div className="flex items-center gap-3 pl-2">
            <LanguageSwitcher />
            <ThemeSwitch />
          </div>
        </nav>
        
        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="md:hidden h-12 w-12 flex items-center justify-center rounded-full hover:bg-accent/10 hover:text-primary transition-colors duration-200 touch-manipulation active:scale-95 relative z-50"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu button clicked, toggling from:', isMenuOpen, 'to:', !isMenuOpen);
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
              <title>Close menu</title>
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
              <title>Open menu</title>
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-sm transition-all duration-300 ease-in-out opacity-100 visible"
          style={{ 
            zIndex: 99999,
            backgroundColor: theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' // Light overlay for dark mode - makes content visible
              : 'rgba(0, 0, 0, 0.15)' // Dark overlay for light mode
          }}
          role="dialog" 
          aria-modal="true"
          aria-hidden="false"
          aria-labelledby="mobile-menu-title"
          onClick={(e) => {
            console.log('Backdrop clicked, closing menu');
            setIsMenuOpen(false);
          }}
        />
      )}
      
      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          className="fixed top-0 right-0 h-screen bg-background border-l border-border/20 shadow-2xl transition-transform duration-300 ease-in-out menu-content translate-x-0"
          style={{ 
            zIndex: 100000,
            width: isArabic ? 'min(85vw, 400px)' : 'min(75vw, 350px)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
            <div className="h-full overflow-y-auto flex flex-col">
              {/* Header with theme toggle and close button */}
              <div className="flex items-center justify-between p-4 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <span id="mobile-menu-title" className="text-lg font-semibold tracking-tight">Menu</span>
                  <ThemeSwitch />
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-accent/10 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <title>Close menu</title>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
                
              {/* Mobile navigation */}
              <nav className="flex-1 p-6" role="navigation" aria-label="Mobile menu navigation">
                <ul className="space-y-3" role="list">
                  {navLinks.map((link) => (
                    <li key={link.to} role="listitem">
                      {renderNavLink(link, true)}
                    </li>
                  ))}
                </ul>
              </nav>
              
              {/* Mobile footer */}
              <div className="p-4 border-t border-border/20">
                <div className="space-y-6">
                  <div className="flex flex-col gap-3">
                    <div className="text-sm font-medium text-muted-foreground">Language</div>
                    <LanguageSwitcher />
                  </div>
                  
                  {/* Company info */}
                  <div className="pt-4 border-t border-border/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-6 w-6 rounded-sm bg-gradient-to-br from-primary to-primary/60" aria-hidden="true" />
                      <span className="text-lg font-semibold tracking-tight">300k.studio</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Digital solutions crafted for growth
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )}
    </header>
  );
}
