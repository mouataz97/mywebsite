import React from 'react';
import { useI18n } from '../src/i18n';

const languageNames: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
};

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const availableLocales = ['en', 'fr', 'ar'];

  return (
    <div className="flex items-center gap-2">
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className="px-2 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Select language"
      >
        {availableLocales.map((lang) => (
          <option key={lang} value={lang}>
            {languageNames[lang] || lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
