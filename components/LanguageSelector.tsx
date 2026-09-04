'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage, LanguagePreference } from '@/context/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageOptions: { id: LanguagePreference; label: string; short: string; ta?: boolean }[] = [
    { id: 'ta', label: 'தமிழ்', short: 'தமிழ்', ta: true },
    { id: 'en', label: 'English', short: 'EN' },
    { id: 'both', label: 'Both (இருமொழி)', short: 'Both' },
  ];

  const current = languageOptions.find((o) => o.id === language) || languageOptions[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#FFFDF9] border border-[#EAE0D0] hover:border-[#D4AF37] text-slate-700 hover:text-slate-900 text-xs font-bold transition-all shadow-sm"
        title="Change Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#C59A3F] shrink-0" />
        <span className={current.ta ? 'font-tamil' : ''}>{current.short}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white border border-[#EAE0D0] shadow-xl p-1.5 z-50 animate-fadeIn space-y-1">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Select Language
          </div>
          {languageOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setLanguage(opt.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                language === opt.id
                  ? 'bg-[#D4AF37]/15 text-[#916B16] font-black'
                  : 'text-slate-600 hover:bg-[#FAF6EE] hover:text-slate-900'
              }`}
            >
              <span className={opt.ta ? 'font-tamil' : ''}>{opt.label}</span>
              {language === opt.id && <Check className="w-3.5 h-3.5 text-[#C59A3F]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
