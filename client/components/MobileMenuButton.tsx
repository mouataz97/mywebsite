interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className="md:hidden h-12 w-12 flex items-center justify-center rounded-full hover:bg-accent/10 hover:text-primary transition-colors duration-200 touch-manipulation active:scale-95 relative z-50"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Menu button clicked, toggling from:', isOpen, 'to:', !isOpen);
        onClick();
      }}
    >
      {isOpen ? (
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
  );
}
