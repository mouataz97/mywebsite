import React, { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

// Simple modal with theme-aware backdrop
export function Modal({ 
  open, 
  onClose, 
  children, 
  ariaLabel = "Dialog", 
  className = "" 
}: ModalProps): JSX.Element | null {
  useEffect(() => {
    if (!open) return;
    
    // Store the current scroll position and prevent scrolling
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Restore scroll position and re-enable scrolling
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      {/* Backdrop: darker in light mode, lighter in dark mode */}
      <div
        className="absolute inset-0 transition-opacity"
        // When html has class is-light => use darker overlay; otherwise lighter overlay
        style={{
          background: document.documentElement.classList.contains("is-light")
            ? "rgba(0,0,0,0.40)"
            : "rgba(255,255,255,0.10)",
          backdropFilter: "blur(2px)",
        }}
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={
          "relative max-h-[85vh] w-full max-w-2xl overflow-auto rounded-xl border border-border/60 bg-card shadow-xl " +
          className
        }
      >
        {/* Close button */}
        <button
          aria-label="Close"
          className="absolute right-3 top-3 h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-accent/10"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        {children}
      </div>
    </div>
  );
}
