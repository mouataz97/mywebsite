import React, { createContext, useContext, ReactNode } from 'react';
import { useTheme } from '@/hooks/use-theme';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  mounted: boolean;
  isDark: boolean;
  isLight: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeState = useTheme();

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
