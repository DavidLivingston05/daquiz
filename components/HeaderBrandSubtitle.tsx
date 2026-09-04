'use client';

import React from 'react';
import { useLanguage } from '@/lib/useLanguage';

export default function HeaderBrandSubtitle() {
  const lang = useLanguage();

  if (lang === 'en') {
    return (
      <span className="text-[11px] text-slate-400 leading-none hidden sm:block">
        Bible Quiz Platform
      </span>
    );
  }

  if (lang === 'ta') {
    return (
      <span className="text-[11px] font-tamil text-slate-400 leading-none hidden sm:block">
        வேத வினாடி வினா
      </span>
    );
  }

  return (
    <span className="text-[11px] font-tamil text-slate-400 leading-none hidden sm:block">
      Bible Quiz • வேத வினாடி வினா
    </span>
  );
}
