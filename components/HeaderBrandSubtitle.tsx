'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function HeaderBrandSubtitle() {
  const { language } = useLanguage();

  if (language === 'en') {
    return (
      <span className="text-[11px] text-slate-500 leading-none hidden sm:block">
        Bible Quiz Platform
      </span>
    );
  }

  if (language === 'ta') {
    return (
      <span className="text-[11px] font-tamil text-slate-500 leading-none hidden sm:block">
        வேத வினாடி வினா
      </span>
    );
  }

  return (
    <span className="text-[11px] font-tamil text-slate-500 leading-none hidden sm:block">
      Bible Quiz • வேத வினாடி வினா
    </span>
  );
}
