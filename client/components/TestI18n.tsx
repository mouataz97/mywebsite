import React, { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n-new';

export function TestI18n() {
  const { t, locale, changeLanguage, direction } = useI18n();
  const [hidden, setHidden] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('i18nTesterHidden');
      if (stored === 'true') setHidden(true);
      const storedCollapsed = localStorage.getItem('i18nTesterCollapsed');
      if (storedCollapsed === 'true') setCollapsed(true);
    } catch {}
  }, []);

  const languageNames: Record<string, string> = {
    en: 'English',
    fr: 'Français',
    ar: 'العربية',
  };

  if (hidden) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-xl min-w-[260px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-background/60 border-b border-border/50">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-primary/15 text-primary text-[10px] font-bold">i18n</span>
            <h3 className="text-sm font-medium">Translation Tester</h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const next = !collapsed;
                setCollapsed(next);
                try { localStorage.setItem('i18nTesterCollapsed', String(next)); } catch {}
              }}
              title={collapsed ? 'Expand' : 'Collapse'}
              className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-accent/20"
            >
              {collapsed ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="m18 15-6-6-6 6"/></svg>
              )}
            </button>
            <button
              onClick={() => {
                setHidden(true);
                try { localStorage.setItem('i18nTesterHidden', 'true'); } catch {}
              }}
              title="Close"
              className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-accent/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        {!collapsed && (
          <div className="p-3 space-y-3">
            {/* Language selector */}
            <label className="grid gap-1">
              <span className="text-[11px] text-muted-foreground">Language</span>
              <select
                className="h-9 rounded-md bg-background/60 border border-border/70 px-2 text-sm"
                value={locale}
                onChange={(e) => changeLanguage(e.target.value as any)}
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              >
                {Object.entries(languageNames).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name} ({code})
                  </option>
                ))}
              </select>
            </label>

            {/* Status */}
            <div className="text-xs grid gap-1">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Current</span>
                <span className="font-medium">{languageNames[locale]} ({locale})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Direction</span>
                <span className="font-medium uppercase">{direction}</span>
              </div>
            </div>

            {/* Sample translations */}
            <div className="rounded-md border border-border/60 bg-background/50 p-2">
              <div className="text-[11px] text-muted-foreground mb-1">Samples</div>
              <ul className="text-xs space-y-1" dir={direction}>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">nav.home</span>
                  <span className="font-medium">{t('nav.home')}</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">home.title</span>
                  <span className="font-medium max-w-[180px] text-right truncate" title={t('home.title')}>{t('home.title')}</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
