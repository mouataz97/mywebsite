import { Link, NavLink, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavLink {
  to: string;
  label: string;
}

interface DesktopNavigationProps {
  navLinks: NavLink[];
  isArabic: boolean;
}

export function DesktopNavigation({ navLinks, isArabic }: DesktopNavigationProps) {
  const location = useLocation();

  const renderNavLink = (link: { to: string; label: string }) => {
    return (
      <NavLink
        key={link.to}
        to={link.to}
        state={link.to === "/contact" ? { modal: true, backgroundLocation: location } : undefined}
        className={({ isActive }) =>
          `transition-all duration-300 relative group inline-block rounded-md text-base ${isArabic ? 'px-6 py-4' : 'px-5 py-3'} ${
            isActive 
              ? 'text-primary font-medium bg-primary/10' 
              : 'text-muted-foreground hover:text-primary hover:bg-accent/10'
          } ${isArabic ? 'text-right' : ''}`
        }
        end={link.to === "/"}
      >
        {({ isActive }) => (
          <>
            <span className="relative z-10">{link.label}</span>
            {!isActive && (
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <nav className="hidden md:flex items-center gap-2" dir="auto">
      {navLinks.map(link => renderNavLink(link))}
      <div className="h-6 w-px bg-border/40 mx-3"></div>
      <div className="flex items-center gap-3 pl-2">
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
