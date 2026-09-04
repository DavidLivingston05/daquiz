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
      <body className="min-h-screen flex flex-col bg-[#FBF8F4] dark:bg-[#0B0F17] text-slate-800 dark:text-slate-100 font-sans antialiased selection:bg-[#D4AF37] selection:text-white pb-16 sm:pb-0 transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            {/* Ambient Warm / Celestial Accents in Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-[#EEDBBB]/50 dark:from-amber-600/10 via-[#F7EFE0]/40 dark:via-blue-600/10 to-transparent blur-[100px] rounded-full" />
              <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-gradient-to-tr from-[#E6D4B5]/40 dark:from-amber-700/10 to-transparent blur-[120px] rounded-full" />
              <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-gradient-to-tr from-[#E8D7B9]/40 dark:from-amber-500/10 via-[#FAF1DF]/30 to-transparent blur-[120px] rounded-full" />
            </div>

            {/* Navigation Header */}
            <header className="border-b border-[#EAE0D0] dark:border-[#232E42] bg-[#FFFDF9]/90 dark:bg-[#111622]/90 backdrop-blur-md sticky top-0 z-40 transition-all shadow-[0_2px_15px_-3px_rgba(180,150,100,0.06)]">
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

            {/* Footer */}
            <footer className="border-t border-[#EAE0D0] dark:border-[#232E42] bg-[#FFFDF9]/80 dark:bg-[#111622]/80 backdrop-blur-md py-6 text-xs text-slate-500 dark:text-slate-400">
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

            {/* Mobile Bottom Navigation Bar */}
            <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FFFDF9]/95 dark:bg-[#111622]/95 backdrop-blur-md border-t border-[#EAE0D0] dark:border-[#232E42] px-4 py-2 flex items-center justify-around shadow-lg">
              <Link href="/" className="flex flex-col items-center gap-0.5 text-slate-800 dark:text-amber-400 font-bold text-[10px]">
                <div className="w-7 h-7 rounded-xl bg-[#FAF3E0] dark:bg-amber-500/15 text-[#8C6B1B] dark:text-amber-300 flex items-center justify-center">
                  <Home className="w-4 h-4" />
                </div>
                <span>Home</span>
              </Link>
              <Link href="/#books-section" className="flex flex-col items-center gap-0.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-semibold text-[10px]">
                <Compass className="w-4 h-4 mt-1.5" />
                <span>Browse</span>
              </Link>
              <Link href="/#leaderboard-section" className="flex flex-col items-center gap-0.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-semibold text-[10px]">
                <Trophy className="w-4 h-4 mt-1.5" />
                <span>Leaderboard</span>
              </Link>
              <Link href="/#profile" className="flex flex-col items-center gap-0.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-semibold text-[10px]">
                <User className="w-4 h-4 mt-1.5" />
                <span>Profile</span>
              </Link>
            </nav>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
