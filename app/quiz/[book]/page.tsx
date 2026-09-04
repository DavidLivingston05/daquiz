'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
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
  Sparkles,
  ChevronLeft,
  Zap,
  Check,
  HelpCircle,
  Trophy,
  GraduationCap,
  Flame,
  User,
  Share2,
} from 'lucide-react';
import Link from 'next/link';
import UserAuthModal from '@/components/UserAuthModal';
import { useLanguage } from '@/context/LanguageContext';

export default function QuizPlayPage() {
  const { language: langMode } = useLanguage();
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawBook = params?.book;
  const bookParam = Array.isArray(rawBook) ? rawBook[0] : rawBook;
  const book = bookParam ? decodeURIComponent(bookParam) : 'Genesis';

  const initialMode = searchParams.get('mode') === 'practice' ? 'practice' : 'competition';
  const [quizMode, setQuizMode] = useState<'competition' | 'practice'>(initialMode);

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<SanitizedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    { questionId: string; selectedOptionId: string; timeSpent: number }[]
  >([]);
  const [currentSelectedOption, setCurrentSelectedOption] = useState<string | null>(null);

  // Active User Profile
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Practice mode instant feedback state
  const [practiceRevealed, setPracticeRevealed] = useState(false);

  // Per-question timer (for competition mode)
  const QUESTION_TIME_LIMIT = 30;
  const [questionTimeLeft, setQuestionTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [questionTimeSpent, setQuestionTimeSpent] = useState(0);
  const totalQuizTimeRef = useRef(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Results state
  const [submitting, setSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showReviewList, setShowReviewList] = useState(false);

  // Load user session
  useEffect(() => {
    const savedUser = localStorage.getItem('daquiz_user') || sessionStorage.getItem('daquiz_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {}
    }
  }, []);

  // Load questions
  useEffect(() => {
    async function loadQuiz() {
      try {
        setLoading(true);
        setErrorMsg(null);
        const data = await getQuizSession(book, 50, quizMode);
        if (!data || data.length === 0) {
          setErrorMsg(
            `No active questions found for ${book}. You can add questions in the Admin portal or try another book.`
          );
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
  }, [book, quizMode]);

  // Timer effect (Competition mode only)
  useEffect(() => {
    if (loading || quizResult || questions.length === 0 || quizMode === 'practice') return;

    setQuestionTimeLeft(QUESTION_TIME_LIMIT);
    setQuestionTimeSpent(0);

    timerIntervalRef.current = setInterval(() => {
      totalQuizTimeRef.current += 1;
      setQuestionTimeSpent((prev) => prev + 1);
      setQuestionTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion(true);
          return QUESTION_TIME_LIMIT;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [currentIndex, loading, quizResult, questions, quizMode]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionId: string) => {
    setCurrentSelectedOption(optionId);
    if (quizMode === 'practice') {
      setPracticeRevealed(true);
    }
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
    setPracticeRevealed(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (quizMode === 'competition' && !currentUser) {
        setIsAuthModalOpen(true);
      } else {
        submitQuiz(nextAnswers, currentUser);
      }
    }
  };

  const submitQuiz = async (answersToSubmit: typeof selectedAnswers, userObj?: any) => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setSubmitting(true);
    try {
      const activeUser = userObj || currentUser;
      const payload = {
        userPhone: activeUser?.phone,
        userName: activeUser?.name,
        mode: quizMode,
        book,
        totalTime: totalQuizTimeRef.current || 1,
        answers: answersToSubmit.filter(
          (a) => a.selectedOptionId && a.selectedOptionId !== 'timeout_no_answer'
        ),
      };

      const result = await verifyAndSubmitQuiz(payload);
      setQuizResult(result);

      if (activeUser?.phone) {
        const updated = {
          ...activeUser,
          totalScore: (activeUser.totalScore || 0) + result.score,
        };
        localStorage.setItem('daquiz_user', JSON.stringify(updated));
        setCurrentUser(updated);
        window.dispatchEvent(new CustomEvent('daquiz-user-updated', { detail: updated }));
      }
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

  // Timer circle calculation
  const timerRadius = 26;
  const timerCircumference = 2 * Math.PI * timerRadius;
  const timerStrokeDashoffset =
    timerCircumference - (questionTimeLeft / QUESTION_TIME_LIMIT) * timerCircumference;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] space-y-5">
        <div className="w-12 h-12 rounded-full border-3 border-[#C5A059] border-t-transparent animate-spin" />
        <div className="text-center space-y-1">
          <h3 className="text-base font-extrabold text-slate-800">
            {langMode === 'ta' ? `${book} வினாடி வினா தயாராகிறது...` : `Preparing ${book} Quiz...`}
          </h3>
          <p className="text-xs text-slate-500">Loading scripture questions</p>
        </div>
      </div>
    );
  }

  if (errorMsg && !quizResult) {
    return (
      <div className="max-w-md mx-auto warm-card p-8 rounded-3xl text-center space-y-5 shadow-lg mt-8">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-[#8C6B1B] mx-auto flex items-center justify-center">
          <HelpCircle className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-slate-800">Questions Needed</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{errorMsg}</p>
        </div>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-[#FBF8F4] border border-[#EAE0D0] text-slate-700 text-xs font-bold hover:bg-white transition-all"
          >
            Back to Books
          </Link>
          <Link
            href="/admin"
            className="px-5 py-2.5 rounded-xl bg-[#1B3B6F] hover:bg-[#142C54] text-white text-xs font-bold shadow-md transition-all"
          >
            Add in Admin
          </Link>
        </div>
      </div>
    );
  }

  // ================= SCREEN 3: RESULTS CELEBRATION (MATCHING MOCKUP SCREEN 3) =================
  if (quizResult) {
    const totalScorePossible = questions.length * 100;
    const timeBonus = Math.max(0, quizResult.score - quizResult.correctCount * 100);
    const xpGained = quizResult.score + 10;

    return (
      <div className="max-w-xl mx-auto space-y-6 animate-fadeIn pb-12">
        <div className="warm-card rounded-3xl p-8 text-center space-y-6 shadow-xl">
          {/* Trophy Icon */}
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#E8A838] to-[#B87410] flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30 text-3xl">
              🏆
            </div>
            <span className="absolute -top-1 -right-1 text-xl animate-bounce">✨</span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {langMode === 'ta' ? 'வினாடி வினா முடிந்தது!' : 'Quiz Complete!'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {langMode === 'ta'
                ? `புத்தகம்: ${book} • அருமையான முயற்சி!`
                : `Book: ${book} • Outstanding Bible Knowledge!`}
            </p>
          </div>

          {/* Primary Score Banner */}
          <div className="bg-[#FAF3E0] dark:bg-amber-500/15 border border-[#E8D8B8] dark:border-amber-500/30 rounded-2xl p-5 max-w-sm mx-auto">
            <div className="text-xs uppercase font-extrabold text-[#8C6B1B] dark:text-amber-300 tracking-wider">
              {langMode === 'ta' ? 'மொத்த மதிப்பெண்' : 'Score'}
            </div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
              {quizResult.score} <span className="text-base text-slate-400 dark:text-slate-500 font-bold">/ {totalScorePossible}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-white dark:bg-[#141A26] border border-[#E8D8B8] dark:border-amber-500/30 text-xs font-black text-[#8C6B1B] dark:text-amber-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D49020] dark:text-amber-400" />
              <span>+{xpGained} XP Gained</span>
            </div>
          </div>

          {/* Breakdown Metrics */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-3.5 rounded-2xl bg-[#FBF8F4] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42]">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Correct</span>
              <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                {quizResult.correctCount}/{quizResult.totalQuestions}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FBF8F4] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42]">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Accuracy</span>
              <p className="text-lg font-black text-[#D49020] dark:text-amber-400 mt-0.5">{quizResult.accuracy}%</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FBF8F4] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42]">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Speed Bonus</span>
              <p className="text-lg font-black text-[#8C6B1B] dark:text-amber-300 mt-0.5">+{timeBonus}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2 max-w-md mx-auto">
            <button
              onClick={() => setShowReviewList(!showReviewList)}
              className="w-full py-3.5 px-6 rounded-2xl btn-modern-gold font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{showReviewList ? 'Hide Review' : 'Review Answers'}</span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={handleRestart}
                className="py-3 px-4 rounded-2xl bg-[#FBF8F4] dark:bg-[#1A2232] hover:bg-white dark:hover:bg-[#20293D] border border-[#EAE0D0] dark:border-[#232E42] text-slate-700 dark:text-slate-200 font-extrabold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
              <Link
                href="/"
                className="py-3 px-4 rounded-2xl bg-[#FBF8F4] dark:bg-[#1A2232] hover:bg-white dark:hover:bg-[#20293D] border border-[#EAE0D0] dark:border-[#232E42] text-slate-700 dark:text-slate-200 font-extrabold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#D49020] dark:text-amber-400" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Scripture Review (Accordion) */}
        {showReviewList && (
          <div className="space-y-4 pt-2 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#EAE0D0] dark:border-[#232E42] pb-2">
              <h2 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D49020] dark:text-amber-400" />
                <span>Scripture Review & Explanations</span>
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{quizResult.review?.length} Questions</span>
            </div>

            <div className="space-y-3">
              {quizResult.review?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className={`warm-card rounded-2xl p-5 border space-y-3 ${
                    item.isCorrect ? 'border-emerald-400/80 dark:border-emerald-500/50' : 'border-rose-400/80 dark:border-rose-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#FAF3E0] dark:bg-amber-500/15 text-[#8C6B1B] dark:text-amber-300 text-xs font-black flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">
                        {item.reference}
                      </span>
                    </div>
                    {item.isCorrect ? (
                      <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Correct
                      </span>
                    ) : (
                      <span className="text-xs font-black text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-800 flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Incorrect
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    {(langMode === 'both' || langMode === 'en') && item.question?.en && (
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{item.question.en}</p>
                    )}
                    {(langMode === 'both' || langMode === 'ta') && item.question?.ta && (
                      <p className="text-xs font-tamil text-slate-700 dark:text-slate-300 leading-relaxed">{item.question.ta}</p>
                    )}
                  </div>

                  {item.explanation && (
                    <div className="bg-[#FAF3E0]/70 dark:bg-amber-500/10 border border-[#E8D8B8] dark:border-amber-500/30 rounded-xl p-3 text-xs space-y-1">
                      <span className="font-extrabold text-[#8C6B1B] dark:text-amber-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#D49020] dark:text-amber-400" /> Scripture Insight:
                      </span>
                      {(langMode === 'both' || langMode === 'en') && item.explanation.en && (
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.explanation.en}</p>
                      )}
                      {(langMode === 'both' || langMode === 'ta') && item.explanation.ta && (
                        <p className="text-slate-700 dark:text-slate-300 font-tamil leading-relaxed">{item.explanation.ta}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ================= SCREEN 2: ACTIVE QUIZ PLAY (MATCHING MOCKUP SCREEN 2) =================
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* 1. Header with Back Button and Mode */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#141A26] border border-[#EAE0D0] dark:border-[#232E42] text-xs font-extrabold text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition-all shadow-sm"
        >
          <ChevronLeft className="w-4 h-4 text-[#D49020] dark:text-amber-400" />
          <span>{book}</span>
        </Link>

        {/* Competition / Practice Mode Pill */}
        <div className="inline-flex p-1 rounded-2xl bg-[#F4EDE2] dark:bg-[#1A2232] border border-[#E5DAC8] dark:border-[#232E42] text-xs font-extrabold">
          <button
            onClick={() => setQuizMode('competition')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
              quizMode === 'competition'
                ? 'btn-modern-gold text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-yellow-300" />
            <span>Competition</span>
          </button>
          <button
            onClick={() => setQuizMode('practice')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
              quizMode === 'practice'
                ? 'btn-modern-gold text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#D49020] dark:text-amber-400" />
            <span>Practice</span>
          </button>
        </div>
      </div>

      {/* 2. Circular Timer & Question Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="text-[11px] font-black uppercase text-[#8C6B1B] dark:text-amber-300 tracking-wider">
            QUESTION {currentIndex + 1} OF {questions.length}
          </span>
          <div className="h-1.5 w-36 bg-[#EAE0D0] dark:bg-[#232E42] rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-gradient-to-r from-[#E8A838] to-[#D49020] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Circular Countdown Ring (Mockup Screen 2) */}
        {quizMode === 'competition' && (
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r={timerRadius}
                stroke="currentColor"
                className="text-[#EAE0D0] dark:text-[#232E42]"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="28"
                cy="28"
                r={timerRadius}
                stroke={questionTimeLeft <= 7 ? '#E11D48' : '#D49020'}
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={timerCircumference}
                strokeDashoffset={timerStrokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <span
              className={`absolute text-xs font-mono font-black ${
                questionTimeLeft <= 7 ? 'text-rose-600 dark:text-rose-400 animate-pulse' : 'text-slate-900 dark:text-white'
              }`}
            >
              0:{questionTimeLeft < 10 ? `0${questionTimeLeft}` : questionTimeLeft}
            </span>
          </div>
        )}
      </div>

      {/* 3. Question Card */}
      <div className="warm-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        {/* Scripture Reference Tag */}
        <div className="flex items-center justify-between border-b border-[#EAE0D0] dark:border-[#232E42] pb-3">
          <span className="text-xs font-bold text-[#8C6B1B] dark:text-amber-300 bg-[#FAF3E0] dark:bg-amber-500/15 border border-[#E8D8B8] dark:border-amber-500/30 px-3 py-1 rounded-full">
            {currentQ.book} {currentQ.chapter ? `${currentQ.chapter}:${currentQ.verse || 1}` : ''}
          </span>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
            {currentQ.difficulty || 'General'}
          </span>
        </div>

        {/* Question Text */}
        <div className="space-y-2">
          {(langMode === 'both' || langMode === 'en') && currentQ.question?.en && (
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
              {currentQ.question.en}
            </h2>
          )}
          {(langMode === 'both' || langMode === 'ta') && currentQ.question?.ta && (
            <p className="text-base sm:text-lg font-tamil font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              {currentQ.question.ta}
            </p>
          )}
        </div>

        {/* 4. Options List (Mockup Screen 2 Pill Options) */}
        <div className="space-y-3 pt-1">
          {currentQ.options.map((opt, idx) => {
            const isSelected = currentSelectedOption === opt.id;
            const letter = String.fromCharCode(65 + idx);

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3.5 ${
                  isSelected
                    ? 'bg-[#FAF3E0] dark:bg-amber-500/15 border-[#D49020] dark:border-amber-500/50 text-[#3D2F14] dark:text-amber-200 shadow-md ring-2 ring-[#D49020]/25 scale-[1.01]'
                    : 'bg-[#FBF8F4] dark:bg-[#1A2232] border-[#EAE0D0] dark:border-[#232E42] hover:border-[#D49020]/60 hover:bg-white dark:hover:bg-[#20293D] text-slate-800 dark:text-slate-200'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-all ${
                    isSelected
                      ? 'bg-gradient-to-tr from-[#E8A838] to-[#B87410] text-white shadow-sm'
                      : 'bg-[#EAE0D0] dark:bg-[#232E42] text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : letter}
                </div>

                <div className="space-y-0.5 flex-1">
                  {(langMode === 'both' || langMode === 'en') && opt.text?.en && (
                    <p className={`text-sm font-bold ${isSelected ? 'text-[#3D2F14] dark:text-amber-200' : 'text-slate-900 dark:text-white'}`}>
                      {opt.text.en}
                    </p>
                  )}
                  {(langMode === 'both' || langMode === 'ta') && opt.text?.ta && (
                    <p
                      className={`text-xs font-tamil ${
                        isSelected ? 'text-[#8C6B1B] dark:text-amber-300 font-bold' : 'text-slate-600 dark:text-slate-400 font-medium'
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

        {/* Practice Mode Instant Explanation */}
        {quizMode === 'practice' && practiceRevealed && currentQ.explanation && (
          <div className="p-4 rounded-2xl bg-[#FAF3E0] dark:bg-amber-500/15 border border-[#E8D8B8] dark:border-amber-500/30 space-y-1.5 animate-fadeIn">
            <span className="text-xs font-extrabold text-[#8C6B1B] dark:text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D49020] dark:text-amber-400" /> Scripture Insight:
            </span>
            {(langMode === 'both' || langMode === 'en') && currentQ.explanation.en && (
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{currentQ.explanation.en}</p>
            )}
            {(langMode === 'both' || langMode === 'ta') && currentQ.explanation.ta && (
              <p className="text-xs font-tamil text-slate-700 dark:text-slate-300 leading-relaxed">{currentQ.explanation.ta}</p>
            )}
          </div>
        )}

        {/* Action Button: Next Question (Radiant Golden Glow) */}
        <div className="pt-2">
          <button
            onClick={() => handleNextQuestion(false)}
            disabled={!currentSelectedOption || submitting}
            className={`w-full py-4 px-6 rounded-2xl font-black text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 ${
              currentSelectedOption
                ? 'btn-modern-gold cursor-pointer'
                : 'bg-[#EAE0D0] dark:bg-[#1E2738] text-slate-400 dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving Quiz Attempt...</span>
              </span>
            ) : currentIndex + 1 < questions.length ? (
              <>
                <span>{langMode === 'ta' ? 'அடுத்த கேள்வி' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-200" />
                <span>{langMode === 'ta' ? 'முடிவுகளைக் காண்க' : 'Finish & View Score'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* User Login/Register Modal before saving scores */}
      <UserAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          submitQuiz(selectedAnswers, null);
        }}
        onSuccess={(newUser) => {
          setCurrentUser(newUser);
          setIsAuthModalOpen(false);
          submitQuiz(selectedAnswers, newUser);
        }}
      />
    </div>
  );
}

