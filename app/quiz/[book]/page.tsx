'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  getQuizSession,
  verifyAndSubmitQuiz,
  SanitizedQuestion,
} from '@/lib/actions/quizActions';
import {
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Languages,
  Sparkles,
  ChevronLeft,
  Flame,
  Check,
  HelpCircle,
  Trophy,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

type LanguageMode = 'both' | 'en' | 'ta';

export default function QuizPlayPage() {
  const params = useParams();
  const router = useRouter();
  const rawBook = params?.book;
  const bookParam = Array.isArray(rawBook) ? rawBook[0] : rawBook;
  const book = bookParam ? decodeURIComponent(bookParam) : 'Genesis';

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<SanitizedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    { questionId: string; selectedOptionId: string; timeSpent: number }[]
  >([]);
  const [currentSelectedOption, setCurrentSelectedOption] = useState<string | null>(null);
  const [langMode, setLangMode] = useState<LanguageMode>('both');
  const [guestId, setGuestId] = useState('');

  // Per-question timer
  const [questionTimeLeft, setQuestionTimeLeft] = useState(30);
  const [questionTimeSpent, setQuestionTimeSpent] = useState(0);
  const totalQuizTimeRef = useRef(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Results state
  const [submitting, setSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initialize Guest ID and load questions
  useEffect(() => {
    let gid = localStorage.getItem('daquiz_guest_id');
    if (!gid) {
      gid = `guest_${Math.random().toString(36).substring(2, 12)}_${Date.now().toString(36)}`;
      localStorage.setItem('daquiz_guest_id', gid);
    }
    setGuestId(gid);

    async function loadQuiz() {
      try {
        setLoading(true);
        setErrorMsg(null);
        const data = await getQuizSession(book, 10);
        if (!data || data.length === 0) {
          setErrorMsg(`No active questions found for ${book}. You can add questions in the Admin portal or choose another book.`);
        } else {
          setQuestions(data);
        }
      } catch (err: any) {
        console.error('Error fetching quiz:', err);
        setErrorMsg(err.message || 'Failed to load quiz session. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadQuiz();
  }, [book]);

  // Timer effect
  useEffect(() => {
    if (loading || quizResult || questions.length === 0) return;

    setQuestionTimeLeft(30);
    setQuestionTimeSpent(0);

    timerIntervalRef.current = setInterval(() => {
      totalQuizTimeRef.current += 1;
      setQuestionTimeSpent((prev) => prev + 1);
      setQuestionTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion(true);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [currentIndex, loading, quizResult, questions]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionId: string) => {
    setCurrentSelectedOption(optionId);
  };

  const handleNextQuestion = (forcedByTimeout = false) => {
    if (!currentQ) return;

    const answer = {
      questionId: currentQ.id,
      selectedOptionId: forcedByTimeout
        ? currentSelectedOption || 'timeout_no_answer'
        : currentSelectedOption || '',
      timeSpent: questionTimeSpent,
    };

    const nextAnswers = [...selectedAnswers, answer];
    setSelectedAnswers(nextAnswers);
    setCurrentSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      submitQuiz(nextAnswers);
    }
  };

  const submitQuiz = async (answersToSubmit: typeof selectedAnswers) => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setSubmitting(true);
    try {
      const payload = {
        guestIdentifier: guestId || 'anonymous_guest',
        book,
        totalTime: totalQuizTimeRef.current || 1,
        answers: answersToSubmit.filter(
          (a) => a.selectedOptionId && a.selectedOptionId !== 'timeout_no_answer'
        ),
      };

      const result = await verifyAndSubmitQuiz(payload);
      setQuizResult(result);
    } catch (err: any) {
      console.error('Submission failed:', err);
      setErrorMsg(err.message || 'Failed to verify quiz submission.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  // Timer color indicator
  const getTimerColor = () => {
    if (questionTimeLeft > 15) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (questionTimeLeft > 7) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10 animate-pulse';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] space-y-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-pulse">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -inset-2 rounded-2xl border-2 border-emerald-500/30 animate-ping pointer-events-none" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-white tracking-wide">Loading Questions</h3>
          <p className="text-xs text-slate-400 font-tamil">
            {book} புத்தகத்தின் கேள்விகள் தயாராகின்றன...
          </p>
        </div>
      </div>
    );
  }

  if (errorMsg && !quizResult) {
    return (
      <div className="max-w-lg mx-auto glass-panel p-8 rounded-3xl border border-red-500/30 text-center space-y-5 shadow-2xl mt-8">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 mx-auto flex items-center justify-center">
          <HelpCircle className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-white">Quiz Unavailable</h2>
          <p className="text-sm text-slate-300">{errorMsg}</p>
        </div>
        <div className="pt-3 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            Back to Books
          </Link>
          <Link
            href="/admin"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all"
          >
            Open Admin Portal
          </Link>
        </div>
      </div>
    );
  }

  // ================= RESULT & REVIEW VIEW =================
  if (quizResult) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
        {/* Glowing Score Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/80 via-[#0e1c2e] to-[#0a1220] border border-emerald-500/30 p-8 sm:p-10 text-center space-y-6 shadow-2xl glow-emerald">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 shadow-xl shadow-yellow-500/20 animate-float">
            <Trophy className="w-10 h-10 stroke-[2.2]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Quiz Completed!
            </h1>
            <p className="text-slate-300 text-sm">
              Book: <span className="font-bold text-emerald-400">{book}</span> • Accuracy:{' '}
              <span className="font-bold text-emerald-400">{quizResult.accuracy}%</span>
            </p>
          </div>

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 max-w-lg mx-auto">
            <div className="glass-panel rounded-2xl p-4 border border-emerald-500/20">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Total Score</span>
              <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">{quizResult.score}</p>
            </div>
            <div className="glass-panel rounded-2xl p-4 border border-emerald-500/20">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Correct</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                {quizResult.correctCount} / {quizResult.totalQuestions}
              </p>
            </div>
            <div className="glass-panel rounded-2xl p-4 border border-emerald-500/20">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Accuracy</span>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">{quizResult.accuracy}%</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.02]"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" /> Try Again (மீண்டும் விளையாடு)
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all hover:scale-[1.02]"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" /> Explore Other Books
            </Link>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Answer Review & Explanations</span>
            </h2>
            <span className="text-xs font-tamil text-slate-400">விடைகளின் விளக்கம்</span>
          </div>

          <div className="space-y-4">
            {quizResult.review?.map((item: any, idx: number) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border glass-panel transition-all ${
                  item.isCorrect
                    ? 'border-emerald-500/30 bg-emerald-950/20'
                    : 'border-red-500/30 bg-red-950/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-slate-800 text-slate-200 text-xs font-black flex items-center justify-center border border-slate-700">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase px-2.5 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      {item.reference}
                    </span>
                  </div>
                  <div>
                    {item.isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+pts)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-300 bg-rose-500/20 border border-rose-500/30 px-3 py-1 rounded-full">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {item.question?.en && (
                    <p className="font-bold text-white text-base leading-snug">{item.question.en}</p>
                  )}
                  {item.question?.ta && (
                    <p className="text-sm font-tamil text-slate-300 leading-relaxed">
                      {item.question.ta}
                    </p>
                  )}
                </div>

                {item.explanation && (
                  <div className="border-t border-slate-800/80 pt-3 text-xs bg-black/20 p-3.5 rounded-xl space-y-1.5 border border-slate-800">
                    <span className="font-extrabold text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Scripture Context:
                    </span>
                    {item.explanation.en && (
                      <p className="text-slate-300 leading-relaxed">{item.explanation.en}</p>
                    )}
                    {item.explanation.ta && (
                      <p className="text-slate-400 font-tamil leading-relaxed">
                        {item.explanation.ta}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ================= ACTIVE QUIZ PLAY VIEW =================
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-all"
        >
          <ChevronLeft className="w-4 h-4 text-emerald-400" />
          <span>All Books</span>
        </Link>

        {/* Language segmented control */}
        <div className="inline-flex p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold shadow-inner">
          <button
            onClick={() => setLangMode('both')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              langMode === 'both'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Both (இருமொழி)
          </button>
          <button
            onClick={() => setLangMode('en')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              langMode === 'en'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLangMode('ta')}
            className={`px-3 py-1.5 rounded-lg font-tamil transition-all ${
              langMode === 'ta'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            தமிழ்
          </button>
        </div>
      </div>

      {/* Progress & Live Timer Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800/90 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-extrabold">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">
              QUESTION {currentIndex + 1}
            </span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{questions.length}</span>
          </div>

          <div className="flex items-center gap-2">
            {questionTimeLeft > 15 && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md font-bold">
                <Zap className="w-3 h-3 text-amber-400" /> Speed Bonus Active
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-lg border font-bold transition-all ${getTimerColor()}`}
            >
              <Clock className="w-3.5 h-3.5" /> {questionTimeLeft}s
            </span>
          </div>
        </div>

        {/* Progress bar with glow */}
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full transition-all duration-300 shadow-sm shadow-emerald-400/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-slate-700/60 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Card Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
              {currentQ.difficulty}
            </span>
            {currentQ.category && (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                {currentQ.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-xl">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {currentQ.book} {currentQ.chapter ? `${currentQ.chapter}:${currentQ.verse || 1}` : ''}
            </span>
          </div>
        </div>

        {/* Question Text */}
        <div className="space-y-3">
          {(langMode === 'both' || langMode === 'en') && (
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight">
              {currentQ.question.en}
            </h2>
          )}
          {(langMode === 'both' || langMode === 'ta') && (
            <p className="text-base sm:text-lg font-tamil font-semibold text-emerald-200/90 leading-relaxed">
              {currentQ.question.ta}
            </p>
          )}
        </div>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((opt, idx) => {
            const isSelected = currentSelectedOption === opt.id;
            const letter = String.fromCharCode(65 + idx);

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                  isSelected
                    ? 'border-emerald-500 bg-gradient-to-r from-emerald-950/60 to-[#0c1f28] shadow-lg shadow-emerald-500/15 scale-[1.01]'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900'
                }`}
              >
                {/* Option Letter Badge */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-all ${
                    isSelected
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/40'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : letter}
                </div>

                {/* Option Content */}
                <div className="space-y-1 pt-0.5 flex-1">
                  {(langMode === 'both' || langMode === 'en') && (
                    <p
                      className={`text-sm sm:text-base font-bold transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-200'
                      }`}
                    >
                      {opt.text.en}
                    </p>
                  )}
                  {(langMode === 'both' || langMode === 'ta') && (
                    <p
                      className={`text-xs sm:text-sm font-tamil transition-colors ${
                        isSelected ? 'text-emerald-300 font-semibold' : 'text-slate-400 font-medium'
                      }`}
                    >
                      {opt.text.ta}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-3">
          <button
            onClick={() => handleNextQuestion(false)}
            disabled={!currentSelectedOption || submitting}
            className={`w-full py-4 px-6 rounded-2xl font-black text-sm tracking-wide shadow-xl transition-all flex items-center justify-center gap-2.5 ${
              currentSelectedOption
                ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-emerald-500/30 hover:shadow-emerald-500/45 hover:scale-[1.01] cursor-pointer'
                : 'bg-slate-800/80 text-slate-500 border border-slate-800 cursor-not-allowed'
            }`}
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Verifying with Server...</span>
              </span>
            ) : currentIndex + 1 < questions.length ? (
              <>
                <span>Next Question (அடுத்த கேள்வி)</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
                <span>Finish & View Score (முடிவுகளைக் காண்க)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
