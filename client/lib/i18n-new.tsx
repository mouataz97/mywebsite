import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// Import translations first to avoid hoisting issues
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import ar from '../locales/ar.json';

// Types
type Locale = 'en' | 'fr' | 'ar';

// RTL language support
const rtlLanguages = new Set<Locale>(['ar']);

const translations = { en, fr, ar };

interface I18nContextType {
  locale: Locale;
  t: (key: string, params?: Record<string, string | number>) => string;
  changeLanguage: (locale: Locale) => void;
  direction: 'ltr' | 'rtl';
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Type guard to check if a string is a valid Locale
const isLocale = (locale: string): locale is Locale => {
  return ['en', 'fr', 'ar'].includes(locale);
};

// Get browser language preference
const getBrowserLanguage = (): Locale => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language.split('-')[0];
  return isLocale(browserLang) && Object.keys(translations).includes(browserLang) 
    ? browserLang 
    : 'en';
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  
  // Initialize locale from localStorage or browser preference
  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem('language');
      const browserLocale = getBrowserLanguage();
      
      // Only use saved locale if it's a valid locale
      const initialLocale = (savedLocale && isLocale(savedLocale)) 
        ? savedLocale 
        : browserLocale;
      
      setLocale(initialLocale);
    } catch (error) {
      console.error('Error initializing locale:', error);
      setLocale('en'); // Fallback to English
    }
  }, []);

  const isRTL = rtlLanguages.has(locale);
  const direction = isRTL ? 'rtl' : 'ltr';

  // Update HTML attributes when locale changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = direction;
      
      if (isRTL) {
        document.documentElement.classList.add('rtl');
      } else {
        document.documentElement.classList.remove('rtl');
      }
    }
  }, [locale, direction, isRTL]);

  const t = useCallback((key: string, params: Record<string, string | number> = {}) => {
    if (!key) return '';
    
    // In development, log missing translations
    if (process.env.NODE_ENV === 'development') {
      console.log(`[i18n] Looking up: ${key} (${locale})`);
    }
    
    const keys = key.split('.');
    let value: any;
    
    // Try current locale first
    const currentLocaleTranslations = translations[locale as keyof typeof translations];
    if (currentLocaleTranslations) {
      value = keys.reduce((obj, k) => (obj && typeof obj === 'object') ? obj[k] : undefined, currentLocaleTranslations);
    }
    
    // If not found in current locale, try English fallback
    if (value === undefined && locale !== 'en') {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[i18n] Missing translation for key: ${key} in locale: ${locale}, falling back to English`);
      }
      value = keys.reduce((obj, k) => (obj && typeof obj === 'object') ? obj[k] : undefined, translations.en);
    }
    
    // If still not found, return the key in development, or empty string in production
    if (value === undefined) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[i18n] Missing translation for key: ${key} in all locales`);
        return `[${key}]`; // Return key in brackets for missing translations in dev
      }
      return key; // In production, return the key as fallback
    }
    
    // Convert value to string and replace placeholders with params
    let result = String(value);
    
    try {
      result = Object.entries(params).reduce(
        (str, [param, val]) => {
          // Create a regex that matches {param} but not escaped \{param\}
          const regex = new RegExp(`(?<!\\)\\{${param}\\}`, 'g');
          return str.replace(regex, String(val));
        },
        result
      );
      
      // Remove escape characters from any remaining placeholders that weren't replaced
      result = result.replace(/\\([{}])/g, '$1');
      
    } catch (error) {
      console.error(`[i18n] Error processing params for key: ${key}`, error);
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[i18n] Translation for ${key}:`, result);
    }
    return result;
  }, [locale]);

  const changeLanguage = useCallback((newLocale: Locale) => {
    setLocale(prevLocale => {
      if (prevLocale !== newLocale && typeof window !== 'undefined') {
        localStorage.setItem('language', newLocale);
      }
      return newLocale;
    });
  }, []);

  const value = useMemo<I18nContextType>(() => ({
    locale,
    t,
    changeLanguage,
    direction: direction as 'ltr' | 'rtl',
    isRTL,
  }), [locale, t, changeLanguage, direction, isRTL]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Export the Locale type for use in other files
export type { Locale };
