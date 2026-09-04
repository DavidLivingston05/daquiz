'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  BookOpen,
  Trophy,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { getAvailableChapters } from '@/lib/actions/quizActions';
import { useLanguage } from '@/context/LanguageContext';

interface ChapterSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: string;
  bookTa?: string;
  testament?: string;
  initialMode?: 'competition' | 'practice';
}

export default function ChapterSelectModal({
  isOpen,
  onClose,
  book,
  bookTa,
  testament = 'OT',
  initialMode = 'competition',
}: ChapterSelectModalProps) {
  const router = useRouter();
  const { language: lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<'competition' | 'practice'>(initialMode);
  const [chapters, setChapters] = useState<{ chapter: number; count: number }[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !book) return;
    setMode(initialMode);
    setSelectedChapter('all');

    async function loadChapters() {
      setLoading(true);
      try {
        const data = await getAvailableChapters(book);
        setChapters(data || []);
        if (data && data.length === 1) {
          setSelectedChapter(data[0].chapter);
        } else {
          setSelectedChapter('all');
        }
      } catch (e) {
        console.error('Failed to load chapters:', e);
      } finally {
        setLoading(false);
      }
    }

    loadChapters();
  }, [isOpen, book, initialMode]);

  if (!isOpen || !mounted) return null;

  const handleStartQuiz = (chapterChoice?: number | 'all') => {
    const ch = chapterChoice !== undefined ? chapterChoice : selectedChapter;
    let url = `/quiz/${encodeURIComponent(book)}?mode=${mode}`;
    if (ch !== 'all') {
      url += `&chapter=${ch}`;
    }
    onClose();
    router.push(url);
  };

  const totalQuestionsInBook = chapters.reduce((acc, c) => acc + c.count, 0);

  const t = {
    en: {
      selectTitle: 'Select Chapter',
      modeTitle: 'Quiz Mode',
      competition: 'Competition',
      competitionDesc: 'Timed test with leaderboard scoring',
      practice: 'Practice',
      practiceDesc: 'Instant answers & scripture study',
      allChapters: 'All Chapters',
      chapter: 'Chapter',
      questions: 'Questions',
      startBtn: 'Start Quiz Now',
      loading: 'Loading chapters...',
      noChapters: 'No questions added yet for this book.',
    },
    ta: {
      selectTitle: 'அதிகாரத்தைத் தேர்ந்தெடுக்கவும்',
      modeTitle: 'வினாடி வினா முறை',
      competition: 'போட்டி முறை',
      competitionDesc: 'நேர வரம்புடன் கூடிய புள்ளிப் போட்டி',
      practice: 'பயிற்சி முறை',
      practiceDesc: 'உடனடி விடைகள் & வசன ஆய்வு',
      allChapters: 'அனைத்து அதிகாரங்களும்',
      chapter: 'அதிகாரம்',
      questions: 'கேள்விகள்',
      startBtn: 'வினாடி வினாவைத் தொடங்குக',
      loading: 'அதிகாரங்கள் ஏற்றப்படுகின்றன...',
      noChapters: 'இந்த புத்தகத்தில் இன்னும் கேள்விகள் சேர்க்கப்படவில்லை.',
    },
    both: {
      selectTitle: 'Select Chapter • அதிகாரம் தேர்வு',
      modeTitle: 'Quiz Mode • முறை',
      competition: 'Competition • போட்டி',
      competitionDesc: 'Timed test with leaderboard scoring',
      practice: 'Practice • பயிற்சி',
      practiceDesc: 'Instant answers & scripture study',
      allChapters: 'All Chapters • அனைத்தும்',
      chapter: 'Chapter • அதிகாரம்',
      questions: 'Questions • கேள்விகள்',
      startBtn: 'Start Quiz (தொடங்குக) →',
      loading: 'Loading chapters...',
      noChapters: 'No questions added yet for this book.',
    },
  }[lang];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg my-auto overflow-hidden rounded-3xl bg-white dark:bg-[#141A26] border border-[#EAE0D0] dark:border-[#232E42] p-6 sm:p-8 shadow-2xl space-y-6 text-slate-800 dark:text-slate-100 transition-colors">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#FBF8F4] dark:bg-[#1A2232] text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Book Header */}
        <div className="space-y-1.5 text-left pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-500/30 text-[10px] font-black uppercase tracking-wider">
            <span>{testament}</span>
            <span>•</span>
            <span>{totalQuestionsInBook} {t.questions}</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>{book}</span>
            {bookTa && <span className="text-slate-500 dark:text-slate-400 text-lg font-tamil font-bold">({bookTa})</span>}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            {t.selectTitle}
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-[#F4EDE2] dark:bg-[#1A2232] border border-[#E5DAC8] dark:border-[#232E42]">
          <button
            type="button"
            onClick={() => setMode('competition')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
              mode === 'competition'
                ? 'btn-modern-gold text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-yellow-300" />
            <span className={lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}>{t.competition}</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('practice')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
              mode === 'practice'
                ? 'btn-modern-gold text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-yellow-300" />
            <span className={lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}>{t.practice}</span>
          </button>
        </div>

        {/* Chapters Section */}
        <div className="space-y-3 text-left">
          <label className="block text-xs font-black uppercase text-[#8C6B1B] dark:text-amber-300 tracking-wider">
            {t.selectTitle}
          </label>

          {loading ? (
            <div className="py-10 text-center text-slate-400 text-xs">
              <div className="w-6 h-6 border-2 border-[#D49020] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <span>{t.loading}</span>
            </div>
          ) : chapters.length === 0 ? (
            <div className="p-6 rounded-2xl bg-[#FBF8F4] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42] text-center text-xs text-slate-500 dark:text-slate-400 font-semibold">
              {t.noChapters}
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {/* All Chapters Option */}
              {chapters.length > 1 && (
                <button
                  type="button"
                  onClick={() => setSelectedChapter('all')}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    selectedChapter === 'all'
                      ? 'bg-[#FAF3E0] dark:bg-amber-500/15 border-[#D49020] dark:border-amber-500/50 text-[#3D2F14] dark:text-amber-200 shadow-sm ring-2 ring-[#D49020]/20 font-bold'
                      : 'bg-[#FBF8F4] dark:bg-[#1A2232] border-[#EAE0D0] dark:border-[#232E42] text-slate-700 dark:text-slate-300 hover:border-[#D49020]/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E8A838] to-[#B87410] text-white flex items-center justify-center text-xs font-black shadow-sm">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 dark:text-white">
                        {t.allChapters}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {totalQuestionsInBook} {t.questions}
                      </div>
                    </div>
                  </div>
                  {selectedChapter === 'all' && (
                    <CheckCircle2 className="w-4 h-4 text-[#D49020] dark:text-amber-400 shrink-0" />
                  )}
                </button>
              )}

              {/* Individual Chapter Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {chapters.map((ch) => (
                  <button
                    key={ch.chapter}
                    type="button"
                    onClick={() => setSelectedChapter(ch.chapter)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedChapter === ch.chapter
                        ? 'bg-[#FAF3E0] dark:bg-amber-500/15 border-[#D49020] dark:border-amber-500/50 text-[#3D2F14] dark:text-amber-200 shadow-sm ring-2 ring-[#D49020]/20 font-bold'
                        : 'bg-[#FBF8F4] dark:bg-[#1A2232] border-[#EAE0D0] dark:border-[#232E42] text-slate-700 dark:text-slate-300 hover:border-[#D49020]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FAF3E0] dark:bg-amber-500/20 border border-[#E8D8B8] dark:border-amber-500/30 text-[#8C6B1B] dark:text-amber-300 flex items-center justify-center text-xs font-black">
                        {ch.chapter}
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-900 dark:text-white">
                          {t.chapter} {ch.chapter}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                          {ch.count} {t.questions}
                        </div>
                      </div>
                    </div>
                    {selectedChapter === ch.chapter && (
                      <CheckCircle2 className="w-4 h-4 text-[#D49020] dark:text-amber-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Start Button */}
        <div className="pt-2">
          <button
            type="button"
            disabled={loading || chapters.length === 0}
            onClick={() => handleStartQuiz()}
            className="w-full py-3.5 px-6 rounded-2xl btn-modern-gold font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{t.startBtn}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
}
