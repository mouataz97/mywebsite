import { ReactNode } from 'react';

export type TranslationKey = string;
export type TranslationParams = Record<string, string | number>;

export interface I18nContextType {
  t: (key: TranslationKey, params?: TranslationParams) => string;
  locale: string;
  setLocale: (locale: string) => void;
  availableLocales: string[];
}

export interface I18nProviderProps {
  children: ReactNode;
  defaultLocale?: string;
  translations: Record<string, Record<string, any>>;
}
