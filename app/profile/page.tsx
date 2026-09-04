'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Phone,
  Calendar,
  ChevronLeft,
  BookOpen,
  CheckCircle2,
  Trophy,
  GraduationCap,
  Sparkles,
  RotateCcw,
  LogOut,
  ArrowRight,
  Layers,
  Clock,
  Check,
  X,
  ShieldCheck,
} from 'lucide-react';
import { getUserProgressAndProfile } from '@/lib/actions/userActions';
import { useLanguage } from '@/context/LanguageContext';

const tamilBookNames: Record<string, string> = {
  Joshua: 'யோசுவா',
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

export default function ProfilePage() {
  const router = useRouter();
  const { language: lang } = useLanguage();
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [profileData, setProfileData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const savedUserStr =
          localStorage.getItem('daquiz_user') || sessionStorage.getItem('daquiz_user');
        if (!savedUserStr) {
          router.push('/');
          return;
        }

        const userObj = JSON.parse(savedUserStr);
        setCurrentUser(userObj);

        if (userObj.phone) {
          const data = await getUserProgressAndProfile(userObj.phone);
          if (data) {
            setProfileData(data);
          }
        }
      } catch (e) {
        console.error('Failed to load profile:', e);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('daquiz_user');
    sessionStorage.removeItem('daquiz_user');
    window.dispatchEvent(new CustomEvent('daquiz-user-updated', { detail: null }));
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 rounded-full border-3 border-[#D49020] border-t-transparent animate-spin" />
        <p className="text-xs font-bold text-slate-500">
          {lang === 'ta' ? 'விவரங்களை ஏற்றுகிறது...' : 'Loading profile progress...'}
        </p>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  const user = profileData?.user || currentUser;
  const stats = profileData?.stats || {
    totalAttempts: 0,
    competitionAttempts: 0,
    practiceAttempts: 0,
    totalQuestionsAttempted: 0,
    totalCorrectAnswers: 0,
    overallAccuracy: 0,
    distinctChaptersCompleted: 0,
  };
  const completedChapters: any[] = profileData?.completedChapters || [];
  const recentAttempts: any[] = profileData?.recentAttempts || [];

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* 1. Header Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#141A26] border border-[#EAE0D0] dark:border-[#232E42] text-xs font-extrabold text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition-all shadow-sm"
        >
          <ChevronLeft className="w-4 h-4 text-[#D49020] dark:text-amber-400" />
          <span>{lang === 'ta' ? 'முகப்புக்குச் செல்' : 'Back to Quizzes'}</span>
        </Link>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold transition-all shadow-sm"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{lang === 'ta' ? 'வெளியேறு' : 'Sign Out'}</span>
        </button>
      </div>

      {/* 2. User Profile Card */}
      <div className="warm-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-[#EAE0D0] dark:border-[#232E42]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#E8A838] to-[#B87410] text-white flex items-center justify-center font-black text-3xl shadow-lg shadow-amber-500/20 border-2 border-white dark:border-[#141A26]">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {user.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 dark:text-slate-400 font-bold">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#D49020]" />
                  +91 {user.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#D49020]" />
                  {user.age} {lang === 'ta' ? 'வயது' : 'Years old'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-black flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{lang === 'ta' ? 'செயலில் உள்ள உறுப்பினர்' : 'Active Participant'}</span>
            </span>
          </div>
        </div>

        {/* 3. Overall Statistics Grid (3 Cards: Competition, Practice, Chapters) */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-[#FBF8F4] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42] text-center space-y-1">
            <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
              {lang === 'ta' ? 'போட்டிகள்' : 'Competition'}
            </span>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.competitionAttempts}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF8F4] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42] text-center space-y-1">
            <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
              {lang === 'ta' ? 'பயிற்சிகள்' : 'Practice'}
            </span>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.practiceAttempts}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF8F4] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42] text-center space-y-1">
            <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
              {lang === 'ta' ? 'அதிகாரங்கள்' : 'Chapters'}
            </span>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {stats.distinctChaptersCompleted}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Completed Books & Chapters Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#EAE0D0] dark:border-[#232E42] pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FAF3E0] dark:bg-amber-500/15 border border-[#E8D8B8] dark:border-amber-500/30 text-[#8C6B1B] dark:text-amber-300 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              {lang === 'ta' ? 'முடித்த அதிகாரங்கள் & முன்னேற்றம்' : 'Completed Chapters & Progress'}
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
            {completedChapters.length} {lang === 'ta' ? 'அதிகாரங்கள்' : 'Chapters'}
          </span>
        </div>

        {completedChapters.length === 0 ? (
          <div className="warm-card rounded-2xl p-8 text-center space-y-3 border border-[#EAE0D0] dark:border-[#232E42]">
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
              {lang === 'ta'
                ? 'இன்னும் எந்த அதிகாரமும் முடிக்கப்படவில்லை.'
                : 'No chapters completed yet.'}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-modern-gold text-xs font-extrabold shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'ta' ? 'வினாடி வினாவைத் தொடங்கவும்' : 'Start Your First Quiz'}</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {completedChapters.map((item, idx) => {
              const taBook = tamilBookNames[item.book] || item.book;
              return (
                <div
                  key={idx}
                  className="warm-card rounded-2xl p-5 border border-[#EAE0D0] dark:border-[#232E42] space-y-3.5 shadow-sm hover:border-[#D49020] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200">
                        {lang === 'ta' ? `${taBook} • அதிகாரம் ${item.chapter}` : `${item.book} • Chapter ${item.chapter}`}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white pt-1">
                        {lang === 'ta' ? `${taBook} அதிகாரம் ${item.chapter}` : `${item.book} Chapter ${item.chapter}`}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[11px] font-black text-emerald-700 dark:text-emerald-300">
                        {item.bestCorrect}/{item.totalQuestions}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold pt-1 border-t border-[#EAE0D0] dark:border-[#232E42]">
                    <span>
                      {item.attemptsCount} {item.attemptsCount === 1 ? 'Attempt' : 'Attempts'}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/quiz/${encodeURIComponent(item.book)}?mode=practice&chapter=${item.chapter}`}
                        className="px-2.5 py-1 rounded-lg bg-[#FAF3E0] dark:bg-amber-500/15 text-[#8C6B1B] dark:text-amber-300 font-bold hover:bg-[#F2E5C5] transition-colors"
                      >
                        {lang === 'ta' ? 'பயிற்சி' : 'Practice'}
                      </Link>
                      <Link
                        href={`/quiz/${encodeURIComponent(item.book)}?mode=competition&chapter=${item.chapter}`}
                        className="px-2.5 py-1 rounded-lg btn-modern-gold text-white font-bold"
                      >
                        {lang === 'ta' ? 'தேர்வு' : 'Test'}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Detailed Attempt History Log */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#EAE0D0] dark:border-[#232E42] pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FAF3E0] dark:bg-amber-500/15 border border-[#E8D8B8] dark:border-amber-500/30 text-[#8C6B1B] dark:text-amber-300 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              {lang === 'ta' ? 'சமீபத்திய வினாடி வினா வரலாறு' : 'Recent Attempt History'}
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
            {recentAttempts.length} {lang === 'ta' ? 'பதிவுகள்' : 'Records'}
          </span>
        </div>

        {recentAttempts.length === 0 ? (
          <div className="warm-card rounded-2xl p-6 text-center text-slate-500 dark:text-slate-400 text-xs font-semibold">
            {lang === 'ta' ? 'சமீபத்திய முயற்சிகள் எதுவும் இல்லை.' : 'No recent attempts recorded yet.'}
          </div>
        ) : (
          <div className="space-y-3">
            {recentAttempts.map((attempt, idx) => {
              const taBook = tamilBookNames[attempt.book] || attempt.book;
              const dateStr = new Date(attempt.createdAt)
                .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                .toUpperCase();
              const mins = Math.floor(attempt.timeTakenSeconds / 60);
              const secs = attempt.timeTakenSeconds % 60;
              const durationStr = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;

              return (
                <div
                  key={attempt.id || idx}
                  className="warm-card rounded-2xl p-4 sm:p-5 border border-[#EAE0D0] dark:border-[#232E42] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Circle Score Ring */}
                    <div className="w-14 h-14 rounded-full border-3 border-blue-300 dark:border-blue-700 bg-blue-50/70 dark:bg-blue-950/30 flex items-center justify-center shrink-0">
                      <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                        {attempt.correctAnswers}/{attempt.totalQuestions}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                          {lang === 'ta'
                            ? `${taBook} • அதிகாரம் ${attempt.chapter}`
                            : `${attempt.book} • Chapter ${attempt.chapter}`}
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            attempt.mode === 'practice'
                              ? 'bg-amber-100 dark:bg-amber-950/50 text-[#8C6B1B] dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                              : 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                          }`}
                        >
                          {attempt.mode === 'practice'
                            ? lang === 'ta'
                              ? 'பயிற்சி'
                              : 'Practice'
                            : lang === 'ta'
                            ? 'போட்டி'
                            : 'Competition'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                        <span>{dateStr}</span>
                        <span>•</span>
                        <span>{durationStr}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#EAE0D0] dark:border-[#232E42] text-xs font-bold">
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-extrabold">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> {attempt.correctAnswers}/{attempt.totalQuestions}
                      </span>
                    </div>

                    <Link
                      href={`/quiz/${encodeURIComponent(attempt.book)}?mode=practice&chapter=${attempt.chapter}`}
                      className="px-3 py-1.5 rounded-xl btn-modern-gold text-xs font-extrabold shadow-sm flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{lang === 'ta' ? 'ஆய்வு' : 'Review'}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
