'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-[#EAE0D0] dark:border-[#2A364F] bg-[#FBF8F4] dark:bg-[#151C28] text-slate-700 dark:text-amber-400 hover:text-slate-950 dark:hover:text-white transition-all flex items-center gap-1.5 shadow-sm hover:scale-105"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Night Mode'}
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4 text-amber-400 fill-amber-400 animate-spin-slow" />
          <span className="text-xs font-bold hidden sm:inline text-amber-300">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-[#8C6B1B]" />
          <span className="text-xs font-bold hidden sm:inline text-slate-700">Night</span>
        </>
      )}
    </button>
  );
}
