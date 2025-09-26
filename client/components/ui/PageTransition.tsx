import { useEffect, useRef, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!mainRef.current) return;

    const mainElement = mainRef.current;

    if (firstRender.current) {
      // Skip animation on initial load
      firstRender.current = false;
      mainElement.style.pointerEvents = 'auto';
      mainElement.style.opacity = '1';
      mainElement.style.transform = 'translateY(0)';
      mainElement.style.transition = 'opacity 0ms, transform 0ms';
    } else {
      // Add fade-out effect before route change
      mainElement.style.pointerEvents = 'none';
      mainElement.style.opacity = '0';
      mainElement.style.transform = 'translateY(10px)';
      mainElement.style.transition = 'opacity 200ms ease-out, transform 200ms ease-out';

      // After a short delay, update the content and fade back in
      const timer = setTimeout(() => {
        mainElement.style.pointerEvents = 'auto';
        mainElement.style.opacity = '1';
        mainElement.style.transform = 'translateY(0)';
        // Scroll to top on route change
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <main 
      ref={mainRef}
      className={`min-h-[calc(100vh-16rem)] transition-opacity duration-300 ease-out ${className}`}
      style={{
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'opacity 300ms ease-out, transform 300ms ease-out',
      }}
    >
      {children}
    </main>
  );
}
