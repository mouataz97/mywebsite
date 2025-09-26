import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useI18n } from '@/lib/i18n-new';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTheme } from '@/hooks/use-theme';

interface NavLink {
  to: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  isArabic: boolean;
}

export function MobileMenu({ isOpen, onClose, navLinks, isArabic }: MobileMenuProps) {
  const { t } = useI18n();
  const location = useLocation();
  const { theme } = useTheme();

  const renderNavLink = (link: { to: string; label: string }) => {
    return (
      <NavLink
        key={link.to}
        to={link.to}
        state={link.to === "/contact" ? { modal: true, backgroundLocation: location } : undefined}
        className={({ isActive }) =>
          `flex items-center w-full rounded-lg text-lg min-h-[${isArabic ? '72px' : '64px'}] touch-manipulation font-medium ${isArabic ? 'px-8 py-6 text-right' : 'px-6 py-5'} ${
            isActive 
              ? 'text-primary font-medium bg-primary/10' 
              : 'text-muted-foreground hover:text-primary hover:bg-accent/10'
          } transition-all duration-300 relative group`
        }
        end={link.to === "/"}
        onClick={onClose}
      >
        {({ isActive }) => (
          <>
            <span className="relative z-10">{link.label}</span>
            {isActive && (
              <span className="ml-auto">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </span>
            )}
          </>
        )}
      </NavLink>
    );
  };

  if (!isOpen || typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <div 
      className="mobile-menu-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        pointerEvents: 'auto'
      }}
    >
      {/* Mobile menu backdrop */}
      <div 
        className="backdrop-blur-sm"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: theme === 'dark' 
            ? 'rgba(255, 255, 255, 0.08)' 
            : 'rgba(0, 0, 0, 0.15)'
        }}
        role="dialog" 
        aria-modal="true"
        aria-hidden="false"
        aria-labelledby="mobile-menu-title"
        onClick={onClose}
      />
      
      {/* Mobile menu panel */}
      <div 
        id="mobile-menu"
        className={`bg-background border-l border-border/20 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: isArabic ? 'min(85vw, 400px)' : 'min(75vw, 350px)',
          height: '100vh',
          zIndex: 1000000
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full overflow-y-auto flex flex-col">
          {/* Header with theme toggle and close button */}
          <div className="flex items-center justify-between p-4 border-b border-border/20">
            <div className="flex items-center gap-3">
              <span id="mobile-menu-title" className="text-lg font-semibold tracking-tight">Menu</span>
            </div>
            <button
              type="button"
              onClick={onClose}
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
                  {renderNavLink(link)}
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
    </div>,
    document.body
  );
}
