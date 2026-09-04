import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { BookOpen, Sparkles, Home, Compass, Trophy, User } from 'lucide-react';
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
      <body className="min-h-screen flex flex-col bg-[#FBF8F4] text-slate-800 font-sans antialiased selection:bg-[#D4AF37] selection:text-white pb-16 sm:pb-0">
        <LanguageProvider>
          {/* Ambient Warm Golden Accents in Background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-[#EEDBBB]/50 via-[#F7EFE0]/40 to-transparent blur-[100px] rounded-full" />
            <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-gradient-to-tr from-[#E6D4B5]/40 to-transparent blur-[120px] rounded-full" />
            <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-gradient-to-tr from-[#E8D7B9]/40 via-[#FAF1DF]/30 to-transparent blur-[120px] rounded-full" />
          </div>

          {/* Navigation Header */}
          <header className="border-b border-[#EAE0D0] bg-[#FFFDF9]/90 backdrop-blur-md sticky top-0 z-40 transition-all shadow-[0_2px_15px_-3px_rgba(180,150,100,0.06)]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
              <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D4AF37] via-[#C59A3F] to-[#A87B1D] text-white flex items-center justify-center shadow-md shadow-[#D4AF37]/25 group-hover:scale-105 transition-all">
                  <BookOpen className="w-5 h-5 text-white stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-xl tracking-tight text-slate-900 group-hover:text-[#A87B1D] transition-colors">
                      DaQuiz
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-[#D4AF37]/15 text-[#916B16] border border-[#D4AF37]/30 hidden sm:inline">
                      PRO
                    </span>
                  </div>
                  <HeaderBrandSubtitle />
                </div>
              </Link>

              {/* Right side controls */}
              <div className="flex items-center gap-2 sm:gap-3 text-sm font-semibold">
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
          <footer className="border-t border-[#EAE0D0] bg-[#FFFDF9]/80 backdrop-blur-md py-6 text-xs text-slate-500">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                © {new Date().getFullYear()} <span className="text-slate-800 font-bold">DaQuiz</span> Bible Ministry.
              </div>
              <div className="flex items-center gap-1.5 text-[#8C6B1B] font-semibold bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#C59A3F]" />
                <span>Growing in the Word • வேதத்தில் இணைவோம்</span>
              </div>
            </div>
          </footer>

          {/* Mobile Bottom Navigation Bar matching Mobile mockup */}
          <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#EAE0D0] px-4 py-2 flex items-center justify-around shadow-lg">
            <Link href="/" className="flex flex-col items-center gap-0.5 text-slate-800 font-bold text-[10px]">
              <div className="w-7 h-7 rounded-xl bg-[#D4AF37]/15 text-[#916B16] flex items-center justify-center">
                <Home className="w-4 h-4" />
              </div>
              <span>Home</span>
            </Link>
            <Link href="/#books-section" className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-800 font-semibold text-[10px]">
              <Compass className="w-4 h-4 mt-1.5" />
              <span>Browse</span>
            </Link>
            <Link href="/#leaderboard-section" className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-800 font-semibold text-[10px]">
              <Trophy className="w-4 h-4 mt-1.5" />
              <span>Leaderboard</span>
            </Link>
            <Link href="/#profile" className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-800 font-semibold text-[10px]">
              <User className="w-4 h-4 mt-1.5" />
              <span>Profile</span>
            </Link>
          </nav>
        </LanguageProvider>
      </body>
    </html>
  );
}
