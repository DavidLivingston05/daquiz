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
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all shadow-sm"
        title="Change Language"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className={current.ta ? 'font-tamil' : ''}>{current.short}</span>
        <ChevronDown className="w-3 h-3 text-slate-400 opacity-70" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#0f172a] border border-slate-700 shadow-2xl p-1.5 z-50 animate-fadeIn space-y-1">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
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
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                language === opt.id
                  ? 'bg-emerald-500/15 text-emerald-400 font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className={opt.ta ? 'font-tamil' : ''}>{opt.label}</span>
              {language === opt.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
