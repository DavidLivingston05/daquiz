'use client';

import { useState, useEffect } from 'react';
import { LanguagePreference } from '@/components/LanguageSelector';

export function useLanguage(): LanguagePreference {
  const [lang, setLang] = useState<LanguagePreference>('both');

  useEffect(() => {
    const saved = localStorage.getItem('daquiz_lang') as LanguagePreference;
    if (saved && (saved === 'both' || saved === 'en' || saved === 'ta')) {
      setLang(saved);
    }

    const handleLangChange = (e: any) => {
      if (e.detail) {
        setLang(e.detail);
      }
    };

    window.addEventListener('daquiz-lang-changed', handleLangChange);
    return () => window.removeEventListener('daquiz-lang-changed', handleLangChange);
  }, []);

  return lang;
}
