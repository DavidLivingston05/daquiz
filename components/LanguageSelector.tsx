'use client';

import React from 'react';
import { useLanguage, LanguagePreference } from '@/context/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold shadow-inner">
      <button
        type="button"
        onClick={() => setLanguage('both')}
        className={`px-3 py-1.5 rounded-lg transition-all ${
          language === 'both'
            ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black shadow-md shadow-emerald-500/20'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        Both (இருமொழி)
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-lg transition-all ${
          language === 'en'
            ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black shadow-md shadow-emerald-500/20'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        English
      </button>

      <button
        type="button"
        onClick={() => setLanguage('ta')}
        className={`px-3 py-1.5 rounded-lg font-tamil transition-all ${
          language === 'ta'
            ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black shadow-md shadow-emerald-500/20'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        தமிழ்
      </button>
    </div>
  );
}
