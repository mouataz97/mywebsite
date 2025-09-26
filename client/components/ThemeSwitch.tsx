import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') as Theme || 'system';
    setTheme(storedTheme);
  }, []);

  // Update the theme when it changes
  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    
    // Clear previous theme classes
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
      root.classList.add(systemTheme);
      root.setAttribute('data-theme', systemTheme);
    } else {
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  if (!mounted) {
    return null; // Prevent flash of wrong theme on initial render
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setTheme('light')}
        className={`p-1 rounded-full ${
          theme === 'light' 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Light theme"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-1 rounded-full ${
          theme === 'dark' 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Dark theme"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-1 rounded-full ${
          theme === 'system' 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="System theme"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      </button>
    </div>
  );
}
