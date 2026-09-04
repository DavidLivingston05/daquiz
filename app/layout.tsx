import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { BookOpen, Sparkles, ShieldCheck } from 'lucide-react';
import { Plus_Jakarta_Sans, Noto_Sans_Tamil } from 'next/font/google';
import LanguageSelector from '@/components/LanguageSelector';
import UserProfileChip from '@/components/UserProfileChip';
import HeaderBrandSubtitle from '@/components/HeaderBrandSubtitle';
import { LanguageProvider } from '@/context/LanguageContext';

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
      <body className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white">
        <LanguageProvider>
          {/* Ambient Gradient Glows in Background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-emerald-600/20 via-teal-500/10 to-transparent blur-[120px] rounded-full" />
            <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/10 to-indigo-500/10 blur-[130px] rounded-full" />
            <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 via-amber-500/5 to-transparent blur-[140px] rounded-full" />
          </div>

          {/* Navigation Header */}
          <header className="border-b border-slate-800/80 bg-[#0d1322]/80 backdrop-blur-xl sticky top-0 z-40 transition-all">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 py-3 flex items-center justify-between gap-2">
              <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-all">
                  <BookOpen className="w-5 h-5 text-white stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                      DaQuiz
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hidden sm:inline">
                      PRO
                    </span>
                  </div>
                  <HeaderBrandSubtitle />
                </div>
              </Link>

              {/* Middle Language Switcher */}
              <div className="hidden md:block">
                <LanguageSelector />
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-2 sm:gap-3 text-sm font-semibold">
                <UserProfileChip />
              </div>
            </div>

            {/* Mobile Language Bar */}
            <div className="md:hidden px-4 pb-2.5 flex justify-center border-t border-slate-800/60 pt-2">
              <LanguageSelector />
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-800/80 bg-[#090d16]/80 backdrop-blur-md py-6 text-xs text-slate-400">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                © {new Date().getFullYear()} <span className="text-slate-200 font-semibold">DaQuiz</span> Bible Ministry.
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>Growing in the Word • வேதத்தில் இணைவோம்</span>
              </div>
            </div>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
