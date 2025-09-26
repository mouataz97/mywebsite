import React, { createContext, useState, useEffect, useCallback } from 'react';
import { I18nContextType, I18nProviderProps } from './types';

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ 
  children, 
  defaultLocale = 'en', 
  translations 
}: I18nProviderProps) {
  const [locale, setLocale] = useState<string>(defaultLocale);
  const availableLocales = Object.keys(translations);

  // Load saved locale or use default
  useEffect(() => {
    const savedLocale = localStorage.getItem('i18n_locale');
    if (savedLocale && availableLocales.includes(savedLocale)) {
      setLocale(savedLocale);
    } else {
      const browserLocale = navigator.language.split('-')[0];
      if (availableLocales.includes(browserLocale)) {
        setLocale(browserLocale);
      }
    }
  }, [availableLocales]);

  // Translation function
  const t = useCallback((key: string, params: Record<string, any> = {}): string => {
    try {
      const keys = key.split('.');
      let value = translations[locale];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn(`[i18n] Translation not found: ${key}`);
          return key;
        }
      }

      if (typeof value !== 'string') {
        console.warn(`[i18n] Translation value is not a string: ${key}`);
        return key;
      }

      // Replace placeholders like {{name}} with values from params
      return Object.entries(params).reduce(
        (str: string, [k, v]) => str.replace(new RegExp(`{{${k}}}`, 'g'), String(v)),
        value
      );
    } catch (error) {
      console.error(`[i18n] Error translating key: ${key}`, error);
      return key;
    }
  }, [locale, translations]);

  // Update locale
  const changeLocale = useCallback((newLocale: string) => {
    if (availableLocales.includes(newLocale)) {
      setLocale(newLocale);
      localStorage.setItem('i18n_locale', newLocale);
      document.documentElement.lang = newLocale;
    } else {
      console.warn(`[i18n] Locale not available: ${newLocale}`);
    }
  }, [availableLocales]);

  const contextValue: I18nContextType = {
    t,
    locale,
    setLocale: changeLocale,
    availableLocales,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}
