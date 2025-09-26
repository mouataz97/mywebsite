import { useTheme } from '@/hooks/use-theme';
import { Moon, Sun } from 'lucide-react';

export function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed left-6 top-1/2 -translate-y-1/2 z-[9999] w-14 h-14 rounded-full backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group ${
        theme === 'light' 
          ? 'bg-white/90 border-2 border-gray-200 hover:bg-white hover:border-gray-300' 
          : 'bg-gray-800/90 border-2 border-gray-600 hover:bg-gray-800 hover:border-gray-500'
      }`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Show Moon in light mode (to switch TO dark) */}
        <Moon 
          className={`absolute w-6 h-6 text-gray-900 hover:text-black transition-all duration-300 ${
            theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-75'
          }`}
        />
        
        {/* Show Sun in dark mode (to switch TO light) */}
        <Sun 
          className={`absolute w-6 h-6 text-yellow-100 hover:text-white transition-all duration-300 ${
            theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-75'
          }`}
        />
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Floating animation */}
      <div className="absolute inset-0 rounded-full animate-pulse bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </button>
  );
}
