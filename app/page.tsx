import Link from 'next/link';
import {
  BookOpen,
  Sparkles,
  Trophy,
  Flame,
  ChevronRight,
  BookMarked,
  ScrollText,
  Zap,
  Star,
} from 'lucide-react';
import { getAvailableBooks } from '@/lib/actions/quizActions';

const defaultBooks = [
  { book: 'Genesis', testament: 'OT', count: 10, ta: 'ஆதியாகமம்' },
  { book: 'Psalms', testament: 'OT', count: 10, ta: 'சங்கீதம்' },
  { book: 'Proverbs', testament: 'OT', count: 10, ta: 'நீதிமொழிகள்' },
  { book: 'Matthew', testament: 'NT', count: 10, ta: 'மத்தேயு' },
  { book: 'Mark', testament: 'NT', count: 10, ta: 'மாற்கு' },
  { book: 'Luke', testament: 'NT', count: 10, ta: 'லூக்கா' },
  { book: 'John', testament: 'NT', count: 10, ta: 'யோவான்' },
  { book: 'Romans', testament: 'NT', count: 10, ta: 'ரோமர்' },
];

const tamilBookNames: Record<string, string> = {
  Genesis: 'ஆதியாகமம்',
  Exodus: 'யாத்திராகமம்',
  Leviticus: 'லேவியராகமம்',
  Numbers: 'எண்ணாகமம்',
  Deuteronomy: 'உபாகமம்',
  Psalms: 'சங்கீதம்',
  Proverbs: 'நீதிமொழிகள்',
  Matthew: 'மத்தேயு',
  Mark: 'மாற்கு',
  Luke: 'லூக்கா',
  John: 'யோவான்',
  Acts: 'அப்போஸ்தலர் நடபடிகள்',
  Romans: 'ரோமர்',
  Corinthians: 'கொரிந்தியர்',
  Revelation: 'வெளிப்படுத்தின விசேஷம்',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let dbBooks: any[] = [];
  try {
    dbBooks = await getAvailableBooks();
  } catch (error) {
    console.warn('Fallback to default books');
  }

  const booksToDisplay = dbBooks.length > 0 ? dbBooks : defaultBooks;
  const otBooks = booksToDisplay.filter((b) => b.testament === 'OT');
  const ntBooks = booksToDisplay.filter((b) => b.testament === 'NT');

  return (
    <div className="space-y-12 pb-8">
      {/* Hero Banner with Radiant Glow */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-[#0d1c2d] to-[#070e1b] border border-emerald-500/30 p-8 sm:p-12 shadow-2xl glow-emerald">
        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Bilingual Bible Quiz (தமிழ் & English)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Master the Scriptures with Speed & Precision
          </h1>

          <p className="text-slate-300 text-sm sm:text-base font-tamil leading-relaxed">
            வேத வசனங்களை கற்றுக்கொண்டு வினாடி வினா மூலம் உங்கள் அறிவை வளர்த்துக் கொள்ளுங்கள். Choose a book below to begin!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2 glass-panel border border-slate-700/80 px-4 py-2 rounded-2xl text-xs font-bold text-amber-300">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Speed bonus + Scoring</span>
            </div>
            <div className="flex items-center gap-2 glass-panel border border-slate-700/80 px-4 py-2 rounded-2xl text-xs font-bold text-emerald-300">
              <Flame className="w-4 h-4 text-emerald-400" />
              <span>Instant Scripture Context</span>
            </div>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
          <ScrollText className="w-96 h-96 text-emerald-400" />
        </div>
      </section>

      {/* Book Explorer Section */}
      <div className="space-y-10">
        {/* Old Testament */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <BookMarked className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-black text-white">
                Old Testament <span className="text-sm font-normal font-tamil text-slate-400">(பழைய ஏற்பாடு)</span>
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold">{otBooks.length} Books Available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otBooks.map((item) => {
              const taName = tamilBookNames[item.book] || item.ta || '';
              return (
                <Link
                  key={item.book}
                  href={`/quiz/${encodeURIComponent(item.book)}`}
                  className="group relative glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/25 uppercase tracking-wider">
                      OT
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {item.book}
                    </h3>
                    {taName && (
                      <p className="text-xs font-tamil text-slate-400 font-medium">{taName}</p>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-semibold">
                    <span>{item.count ? `${item.count} Questions` : 'Ready'}</span>
                    <span className="text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                      Play <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* New Testament */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <BookMarked className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-black text-white">
                New Testament <span className="text-sm font-normal font-tamil text-slate-400">(புதிய ஏற்பாடு)</span>
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold">{ntBooks.length} Books Available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ntBooks.map((item) => {
              const taName = tamilBookNames[item.book] || item.ta || '';
              return (
                <Link
                  key={item.book}
                  href={`/quiz/${encodeURIComponent(item.book)}`}
                  className="group relative glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 uppercase tracking-wider">
                      NT
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {item.book}
                    </h3>
                    {taName && (
                      <p className="text-xs font-tamil text-slate-400 font-medium">{taName}</p>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-semibold">
                    <span>{item.count ? `${item.count} Questions` : 'Ready'}</span>
                    <span className="text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                      Play <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
