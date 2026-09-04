import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { BookOpen, Sparkles, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DaQuiz - Bilingual Bible Quiz Application',
  description: 'Test and enhance your Bible knowledge with English and Tamil Bible Quizzes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-emerald-700 hover:opacity-90">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="leading-tight text-lg">DaQuiz</span>
                <span className="text-[11px] font-normal text-slate-500 leading-none">வேத வினாடி வினா • Bible Quiz</span>
              </div>
            </Link>

            <nav className="flex items-center gap-4 text-sm font-medium">
              <Link
                href="/"
                className="px-3 py-1.5 rounded-lg text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
              >
                Books (புத்தகங்கள்)
              </Link>
              <Link
                href="/admin"
                className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Admin</span>
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>© {new Date().getFullYear()} DaQuiz Bible Ministry. All rights reserved.</div>
            <div className="flex items-center gap-1 text-emerald-700 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Growing in the Word of God together</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
