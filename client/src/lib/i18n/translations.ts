import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';

export const translations = {
  en,
  fr,
  ar,
} as const;

export type Locale = keyof typeof translations;
