'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Sparkles,
  Trophy,
  ChevronRight,
  BookMarked,
  ScrollText,
  GraduationCap,
  Medal,
} from 'lucide-react';
import { getAvailableBooks } from '@/lib/actions/quizActions';
import { getLeaderboard } from '@/lib/actions/userActions';
import { useLanguage } from '@/context/LanguageContext';

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

export default function HomePage() {
  const { language: lang } = useLanguage();
  const [booksToDisplay, setBooksToDisplay] = useState<any[]>(defaultBooks);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [dbBooks, topLeaderboard] = await Promise.all([
          getAvailableBooks().catch(() => []),
          getLeaderboard(5).catch(() => []),
        ]);

        if (dbBooks && dbBooks.length > 0) {
          setBooksToDisplay(dbBooks);
        }
        if (topLeaderboard && topLeaderboard.length > 0) {
          setLeaderboard(topLeaderboard);
        }
      } catch (e) {
        console.warn('Using default books fallback');
      }
    }

    loadData();
  }, []);

  const otBooks = booksToDisplay.filter((b) => b.testament === 'OT');
  const ntBooks = booksToDisplay.filter((b) => b.testament === 'NT');

  // Strict text rendering based on language
  const getBannerBadge = () => {
    if (lang === 'en') return 'BIBLE QUIZ & COMPETITION PLATFORM';
    if (lang === 'ta') return 'வேத வினாடி வினா & போட்டி தளம்';
    return 'BIBLE QUIZ & COMPETITION • வேத வினாடி வினா';
  };

  const getHeroTitle = () => {
    if (lang === 'en') return 'Master the Scriptures with Speed & Knowledge';
    if (lang === 'ta') return 'வேத வசனங்களை ஆழமாகக் கற்றுக்கொள்ளுங்கள்';
    return 'Master the Scriptures in English & Tamil';
  };

  const getHeroSubtitle = () => {
    if (lang === 'en')
      return 'Study Holy Scripture books, test your Bible memory, and compete on the live leaderboard!';
    if (lang === 'ta')
      return 'பரிசுத்த வேத புத்தகங்களை படியுங்கள், உங்கள் நினைவாற்றலை சோதியுங்கள், தரவரிசையில் முதலிடம் பெறுங்கள்!';
    return 'வேத வசனங்களை ஆழமாகக் கற்றுக்கொள்ளுங்கள். போட்டிகளில் பங்கேற்று தரவரிசையைப் பெறுங்கள்!';
  };

  const getCompetitionBtnText = () => {
    if (lang === 'en') return 'Start Competition';
    if (lang === 'ta') return 'போட்டியைத் தொடங்கு';
    return 'Start Competition (போட்டி)';
  };

  const getPracticeBtnText = () => {
    if (lang === 'en') return 'Practice Test';
    if (lang === 'ta') return 'பயிற்சி வினாடி வினா';
    return 'Practice Test (பயிற்சி)';
  };

  const getOTTitle = () => {
    if (lang === 'en') return 'Old Testament';
    if (lang === 'ta') return 'பழைய ஏற்பாடு';
    return 'Old Testament (பழைய ஏற்பாடு)';
  };

  const getNTTitle = () => {
    if (lang === 'en') return 'New Testament';
    if (lang === 'ta') return 'புதிய ஏற்பாடு';
    return 'New Testament (புதிய ஏற்பாடு)';
  };

  const getLeaderboardTitle = () => {
    if (lang === 'en') return 'Top Participants Leaderboard';
    if (lang === 'ta') return 'சிறந்த வெற்றியாளர்களின் தரவரிசை';
    return 'Top Participants • சிறந்த வெற்றியாளர்கள்';
  };

  return (
    <div className="space-y-12 pb-10">
      {/* Hero Banner with Radiant Glow */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-[#0d1c2d] to-[#070e1b] border border-emerald-500/30 p-8 sm:p-12 shadow-2xl glow-emerald">
        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{getBannerBadge()}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {getHeroTitle()}
          </h1>

          <p
            className={`text-slate-300 text-sm sm:text-base leading-relaxed ${
              lang === 'ta' || lang === 'both' ? 'font-tamil' : 'font-sans'
            }`}
          >
            {getHeroSubtitle()}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="#books-section"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shadow-lg hover:scale-105 transition-all"
            >
              <Trophy className="w-4 h-4 stroke-[2.5]" />
              <span>{getCompetitionBtnText()}</span>
            </Link>

            <Link
              href="/quiz/Genesis?mode=practice"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs hover:bg-slate-700 transition-all"
            >
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>{getPracticeBtnText()}</span>
            </Link>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
          <ScrollText className="w-96 h-96 text-emerald-400" />
        </div>
      </section>

      {/* Leaderboard Podium Banner (if participants exist) */}
      {leaderboard.length > 0 && (
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/25 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Medal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white">{getLeaderboardTitle()}</h3>
              </div>
            </div>
            <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">Top 5 Ranks</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {leaderboard.map((user: any) => (
              <div
                key={user.id}
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3"
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                    user.rank === 1
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : user.rank === 2
                        ? 'bg-slate-300 text-slate-950 font-black'
                        : user.rank === 3
                          ? 'bg-amber-700 text-white font-black'
                          : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  #{user.rank}
                </div>
                <div className="truncate">
                  <span className="block text-xs font-bold text-white truncate">{user.name}</span>
                  <span className="text-[11px] font-extrabold text-amber-400">{user.totalScore} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Book Explorer Section */}
      <div id="books-section" className="space-y-10">
        {/* Old Testament */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <BookMarked className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-black text-white">{getOTTitle()}</h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold">
              {otBooks.length} {lang === 'ta' ? 'புத்தகங்கள்' : 'Books'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otBooks.map((item) => {
              const taName = tamilBookNames[item.book] || item.ta || '';
              return (
                <div
                  key={item.book}
                  className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/25 uppercase tracking-wider">
                      OT
                    </span>

                    {/* Book title strictly based on language selection */}
                    {lang === 'en' && (
                      <h3 className="text-lg font-bold text-white">{item.book}</h3>
                    )}
                    {lang === 'ta' && (
                      <h3 className="text-lg font-tamil font-bold text-white">{taName || item.book}</h3>
                    )}
                    {lang === 'both' && (
                      <div>
                        <h3 className="text-lg font-bold text-white">{item.book}</h3>
                        {taName && (
                          <p className="text-xs font-tamil text-slate-400 font-medium">{taName}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    <Link
                      href={`/quiz/${encodeURIComponent(item.book)}?mode=competition`}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 text-center text-xs font-extrabold shadow-sm transition-all"
                    >
                      {lang === 'ta' ? 'போட்டி' : 'Competition'}
                    </Link>
                    <Link
                      href={`/quiz/${encodeURIComponent(item.book)}?mode=practice`}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                      title={lang === 'ta' ? 'பயிற்சி வினாடி வினா' : 'Practice Test'}
                    >
                      <GraduationCap className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
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
              <h2 className="text-xl font-black text-white">{getNTTitle()}</h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold">
              {ntBooks.length} {lang === 'ta' ? 'புத்தகங்கள்' : 'Books'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ntBooks.map((item) => {
              const taName = tamilBookNames[item.book] || item.ta || '';
              return (
                <div
                  key={item.book}
                  className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 uppercase tracking-wider">
                      NT
                    </span>

                    {/* Book title strictly based on language selection */}
                    {lang === 'en' && (
                      <h3 className="text-lg font-bold text-white">{item.book}</h3>
                    )}
                    {lang === 'ta' && (
                      <h3 className="text-lg font-tamil font-bold text-white">{taName || item.book}</h3>
                    )}
                    {lang === 'both' && (
                      <div>
                        <h3 className="text-lg font-bold text-white">{item.book}</h3>
                        {taName && (
                          <p className="text-xs font-tamil text-slate-400 font-medium">{taName}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    <Link
                      href={`/quiz/${encodeURIComponent(item.book)}?mode=competition`}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 text-center text-xs font-extrabold shadow-sm transition-all"
                    >
                      {lang === 'ta' ? 'போட்டி' : 'Competition'}
                    </Link>
                    <Link
                      href={`/quiz/${encodeURIComponent(item.book)}?mode=practice`}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                      title={lang === 'ta' ? 'பயிற்சி வினாடி வினா' : 'Practice Test'}
                    >
                      <GraduationCap className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
