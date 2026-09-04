import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { BookOpen, Sparkles, Home, Compass, Trophy, User } from 'lucide-react';
import { Plus_Jakarta_Sans, Noto_Sans_Tamil } from 'next/font/google';
import LanguageSelector from '@/components/LanguageSelector';
import UserProfileChip from '@/components/UserProfileChip';
import HeaderBrandSubtitle from '@/components/HeaderBrandSubtitle';
import ThemeToggle from '@/components/ThemeToggle';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const tamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  variable: '--font-tamil',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DaQuiz - Modern Bilingual Bible Quiz Platform',
  description: 'Test and enrich your Bible knowledge in English and Tamil with speed scoring, rewards, and scripture insights.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${tamil.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F8F9FA] dark:bg-[#0A0E17] text-slate-800 dark:text-slate-100 font-sans antialiased selection:bg-[#D49020] selection:text-white transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            {/* Ambient Ultra-Clean Modern Mesh Glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[500px] bg-gradient-to-b from-amber-200/25 via-amber-100/10 dark:from-amber-500/10 dark:via-blue-900/10 to-transparent blur-[120px] rounded-full" />
              <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-amber-200/15 dark:from-indigo-900/10 to-transparent blur-[140px] rounded-full" />
              <div className="absolute -bottom-20 -right-40 w-[600px] h-[600px] bg-gradient-to-tl from-amber-100/20 dark:from-amber-600/10 to-transparent blur-[140px] rounded-full" />
            </div>

            {/* Navigation Header */}
            <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#0E131F]/90 backdrop-blur-md sticky top-0 z-40 transition-all shadow-[0_1px_3px_0_rgba(0,0,0,0.02),0_4px_16px_-4px_rgba(0,0,0,0.04)]">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
                <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E8A838] via-[#D49020] to-[#B87410] text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-all">
                    <BookOpen className="w-5 h-5 text-white stroke-[2.2]" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-[#D49020] transition-colors">
                        DaQuiz
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-[#FAF3E0] dark:bg-amber-500/15 text-[#8C6B1B] dark:text-amber-300 border border-[#E8D8B8] dark:border-amber-500/30 hidden sm:inline">
                        PRO
                      </span>
                    </div>
                    <HeaderBrandSubtitle />
                  </div>
                </Link>

                {/* Right side controls */}
                <div className="flex items-center gap-1.5 sm:gap-2.5 text-sm font-semibold">
                  <ThemeToggle />
                  <LanguageSelector />
                  <UserProfileChip />
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
              {children}
            </main>

            {/* Footer (Desktop Only) */}
            <footer className="hidden sm:block border-t border-[#EAE0D0] dark:border-[#232E42] bg-[#FFFDF9]/80 dark:bg-[#111622]/80 backdrop-blur-md py-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div>
                  © {new Date().getFullYear()} <span className="text-slate-800 dark:text-slate-200 font-bold">DaQuiz</span> Bible Ministry.
                </div>
                <div className="flex items-center gap-1.5 text-[#8C6B1B] dark:text-amber-300 font-semibold bg-[#FAF3E0] dark:bg-amber-500/15 border border-[#E8D8B8] dark:border-amber-500/30 px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-[#D49020] dark:text-amber-400" />
                  <span>Growing in the Word • வேதத்தில் இணைவோம்</span>
                </div>
              </div>
            </footer>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
