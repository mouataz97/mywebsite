import { useI18n } from '@/lib/i18n-new';

export function LangSwitch() {
  const { locale, changeLanguage } = useI18n();
  
  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' },
  ];
  
  return (
    <div className="flex items-center border border-border rounded-full p-1 bg-background">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code as 'en' | 'fr' | 'ar')}
          className={`px-2 py-1 text-xs rounded-full transition-colors ${
            locale === lang.code 
              ? 'bg-primary text-primary-foreground' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-label={`Switch to ${lang.code}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
