import Link from 'next/link';
import { BookOpen, Sparkles, Trophy, Flame, ChevronRight, BookMarked } from 'lucide-react';
import { getAvailableBooks } from '@/lib/actions/quizActions';

// Fallback books if DB has not been seeded yet
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
    console.warn('Could not fetch DB books directly, falling back to default list');
  }

  const booksToDisplay = dbBooks.length > 0 ? dbBooks : defaultBooks;

  const otBooks = booksToDisplay.filter((b) => b.testament === 'OT');
  const ntBooks = booksToDisplay.filter((b) => b.testament === 'NT');

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-100 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Bilingual Bible Quiz (தமிழ் & English)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Test Your Knowledge of the Scriptures
          </h1>

          <p className="text-emerald-100 text-base sm:text-lg leading-relaxed">
            வேத வசனங்களை கற்றுக்கொண்டு வினாடி வினா மூலம் உங்கள் அறிவை வளர்த்துக் கொள்ளுங்கள். Choose a book below to begin!
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-medium">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>Speed bonus + Difficulty scoring</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-medium">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Instant explanations & references</span>
            </div>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
          <BookOpen className="w-96 h-96 text-white" />
        </div>
      </section>

      {/* Book Selectors */}
      <div className="space-y-8">
        {/* Old Testament */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
            <BookMarked className="w-5 h-5 text-emerald-700" />
            <h2 className="text-xl font-bold text-slate-900">
              Old Testament <span className="text-sm font-normal text-slate-500">(பழைய ஏற்பாடு)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otBooks.map((item) => {
              const taName = tamilBookNames[item.book] || item.ta || '';
              return (
                <Link
                  key={item.book}
                  href={`/quiz/${encodeURIComponent(item.book)}`}
                  className="group relative bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all duration-200 rounded-2xl p-5 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">
                      OT
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {item.book}
                    </h3>
                    {taName && (
                      <p className="text-xs text-slate-500 font-medium">{taName}</p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{item.count ? `${item.count} Questions` : 'Ready to play'}</span>
                    <span className="text-emerald-600 flex items-center group-hover:translate-x-1 transition-transform">
                      Start <ChevronRight className="w-4 h-4 ml-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* New Testament */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
            <BookMarked className="w-5 h-5 text-emerald-700" />
            <h2 className="text-xl font-bold text-slate-900">
              New Testament <span className="text-sm font-normal text-slate-500">(புதிய ஏற்பாடு)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ntBooks.map((item) => {
              const taName = tamilBookNames[item.book] || item.ta || '';
              return (
                <Link
                  key={item.book}
                  href={`/quiz/${encodeURIComponent(item.book)}`}
                  className="group relative bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all duration-200 rounded-2xl p-5 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 uppercase tracking-wider">
                      NT
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {item.book}
                    </h3>
                    {taName && (
                      <p className="text-xs text-slate-500 font-medium">{taName}</p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{item.count ? `${item.count} Questions` : 'Ready to play'}</span>
                    <span className="text-emerald-600 flex items-center group-hover:translate-x-1 transition-transform">
                      Start <ChevronRight className="w-4 h-4 ml-0.5" />
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
