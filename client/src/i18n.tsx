import { I18nProvider as Provider } from './lib/i18n/context';
import { translations } from './lib/i18n/translations';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider translations={translations} defaultLocale="en">
      {children}
    </Provider>
  );
}

export { useI18n } from './lib/i18n/useI18n';
