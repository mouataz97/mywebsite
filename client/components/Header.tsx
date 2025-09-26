import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n-new';
import { MobileMenu } from './MobileMenu';
import { MobileMenuButton } from './MobileMenuButton';
import { DesktopNavigation } from './DesktopNavigation';

interface NavLink {
  to: string;
  label: string;
}

export function Header() {
  const { t, locale } = useI18n();
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

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('header.home') },
    { to: '/services', label: t('header.services') },
    { to: '/about', label: t('header.about') },
    { to: '/contact', label: t('header.contact') }
  ];

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
        
        {/* Desktop Navigation */}
        <DesktopNavigation navLinks={navLinks} isArabic={isArabic} />
        
        {/* Mobile Menu Button */}
        <MobileMenuButton 
          isOpen={isMenuOpen} 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        />
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
        isArabic={isArabic}
      />
    </header>
  );
}
