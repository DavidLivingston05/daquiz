'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguagePreference = 'both' | 'en' | 'ta';

interface LanguageContextType {
  language: LanguagePreference;
  setLanguage: (lang: LanguagePreference) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'both',
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguagePreference>('both');

  useEffect(() => {
    const saved = localStorage.getItem('daquiz_lang') as LanguagePreference;
    if (saved === 'en' || saved === 'ta' || saved === 'both') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: LanguagePreference) => {
    setLanguageState(lang);
    localStorage.setItem('daquiz_lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}
