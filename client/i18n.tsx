import * as React from 'react';

// Import translations
import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';

// Type definitions
interface I18nContextType {
  t: (key: string, params?: Record<string, unknown>) => string;
  language: string;
  setLanguage: (lang: string) => void;
}

// Create context
export const I18nContext = React.createContext<I18nContextType | undefined>(undefined);

// Translations
const translations = { en, fr, ar };

// Provider component
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState('en');

  // Load saved language or use browser language
  React.useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && translations[savedLang as keyof typeof translations]) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (translations[browserLang as keyof typeof translations]) {
        setLanguage(browserLang);
      }
    }
  }, []);

  // Translation function
  const t = (key: string, params: Record<string, unknown> = {}): string => {
    try {
      const value = key.split('.').reduce((obj, k) => {
        if (obj && typeof obj === 'object' && k in obj) {
          return (obj as Record<string, unknown>)[k];
        }
        throw new Error(`Key not found: ${key}`);
      }, translations[language as keyof typeof translations] as unknown);

      if (typeof value !== 'string') {
        throw new Error(`Value for key ${key} is not a string`);
      }

      return Object.entries(params).reduce(
        (str, [k, v]) => str.replace(new RegExp(`{{${k}}}`, 'g'), String(v)),
        value
      );
    } catch (error) {
      console.warn(error);
      return key;
    }
  };

  // Update language
  const changeLanguage = (lang: string) => {
    if (translations[lang as keyof typeof translations]) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    }
  };

  const contextValue: I18nContextType = {
    t,
    language,
    setLanguage: changeLanguage,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook to use the i18n context
export function useI18n(): I18nContextType {
  const context = React.useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Simple test component
export function TestI18n() {
  const { language, setLanguage } = useI18n();

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    padding: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  };

  const innerDivStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  };

  const spanStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 500,
  };

  const selectStyle: React.CSSProperties = {
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    border: '1px solid #d1d5db',
    fontSize: '0.875rem',
  };

  const textStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: '#4b5563',
  };

  const boldStyle: React.CSSProperties = {
    fontWeight: 500,
  };

  return (
    <div style={containerStyle}>
      <div style={innerDivStyle}>
        <span style={spanStyle}>Language:</span>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={selectStyle}
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="ar">العربية</option>
        </select>
      </div>
      <div style={textStyle}>
        Current language: <span style={boldStyle}>{language}</span>
      </div>
    </div>
  );
}
