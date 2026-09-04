'use client';

import React, { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';

export type LanguagePreference = 'both' | 'en' | 'ta';

interface LanguageSelectorProps {
  currentLang?: LanguagePreference;
  onLanguageChange?: (lang: LanguagePreference) => void;
  variant?: 'compact' | 'full';
}

export default function LanguageSelector({
  currentLang,
  onLanguageChange,
  variant = 'compact',
}: LanguageSelectorProps) {
  const [lang, setLang] = useState<LanguagePreference>('both');

  useEffect(() => {
    const saved = localStorage.getItem('daquiz_lang') as LanguagePreference;
    if (saved && (saved === 'both' || saved === 'en' || saved === 'ta')) {
      setLang(saved);
      if (onLanguageChange && !currentLang) {
        onLanguageChange(saved);
      }
    }
  }, []);

  useEffect(() => {
    if (currentLang && currentLang !== lang) {
      setLang(currentLang);
    }
  }, [currentLang]);

  const handleSelect = (selected: LanguagePreference) => {
    setLang(selected);
    localStorage.setItem('daquiz_lang', selected);
    if (onLanguageChange) {
      onLanguageChange(selected);
    }
    // Dispatch custom event so other components sync instantly
    window.dispatchEvent(new CustomEvent('daquiz-lang-changed', { detail: selected }));
  };

  return (
    <div className="inline-flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold shadow-inner">
      <button
        type="button"
        onClick={() => handleSelect('both')}
        className={`px-3 py-1.5 rounded-lg transition-all ${
          lang === 'both'
            ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black shadow-md shadow-emerald-500/20'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        Both (இருமொழி)
      </button>

      <button
        type="button"
        onClick={() => handleSelect('en')}
        className={`px-3 py-1.5 rounded-lg transition-all ${
          lang === 'en'
            ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black shadow-md shadow-emerald-500/20'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        English
      </button>

      <button
        type="button"
        onClick={() => handleSelect('ta')}
        className={`px-3 py-1.5 rounded-lg font-tamil transition-all ${
          lang === 'ta'
            ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black shadow-md shadow-emerald-500/20'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        தமிழ்
      </button>
    </div>
  );
}
