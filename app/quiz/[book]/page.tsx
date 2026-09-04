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
} from 'lucide-react';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
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
  const [questionTimeLeft, setQuestionTimeLeft] = useState(30);
  const [questionTimeSpent, setQuestionTimeSpent] = useState(0);
  const totalQuizTimeRef = useRef(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Results state
  const [submitting, setSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load user session
  useEffect(() => {
    const savedUser = localStorage.getItem('daquiz_user');
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
        const data = await getQuizSession(book, 10, quizMode);
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
      // Check if user has registered before final competition submission
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

      // Refresh local user score
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

  const getTimerColor = () => {
    if (questionTimeLeft > 15) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (questionTimeLeft > 7) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10 animate-pulse';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-pulse">
          <BookOpen className="w-7 h-7 text-white" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-white tracking-wide">Preparing {book} Quiz</h3>
          <p className="text-xs text-slate-400 font-tamil">கேள்விகள் தயாராகின்றன...</p>
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
          <h2 className="text-xl font-extrabold text-white">Questions Needed</h2>
          <p className="text-sm text-slate-300">{errorMsg}</p>
        </div>
        <div className="pt-3 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-all"
          >
            Back to Books
          </Link>
          <Link
            href="/admin"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 text-xs font-bold shadow-lg transition-all"
          >
            Add Questions in Admin
          </Link>
        </div>
      </div>
    );
  }

  // ================= RESULT & REVIEW VIEW =================
  if (quizResult) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/80 via-[#0e1c2e] to-[#0a1220] border border-emerald-500/30 p-8 sm:p-10 text-center space-y-6 shadow-2xl glow-emerald">
          <div className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 shadow-xl shadow-yellow-500/20">
            <Trophy className="w-10 h-10 stroke-[2.2]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              {quizMode === 'practice' ? 'Practice Completed!' : 'Competition Quiz Completed!'}
            </h1>
            <p className="text-slate-300 text-sm">
              Participant:{' '}
              <span className="font-bold text-white">{currentUser?.name || 'Guest'}</span> •
              Book: <span className="font-bold text-emerald-400">{book}</span> • Accuracy:{' '}
              <span className="font-bold text-emerald-400">{quizResult.accuracy}%</span>
            </p>
          </div>

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

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl transition-all"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" /> Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700 transition-all hover:bg-slate-700"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" /> All Books
            </Link>
          </div>
        </div>

        {/* Detailed Review List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Review & Biblical Insights</span>
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
                    : 'border-rose-500/30 bg-rose-950/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-slate-800 text-slate-200 text-xs font-black flex items-center justify-center border border-slate-700">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 px-2.5 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      {item.reference}
                    </span>
                  </div>
                  <div>
                    {item.isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-300 bg-rose-500/20 border border-rose-500/30 px-3 py-1 rounded-full">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 mb-3">
                  {(langMode === 'both' || langMode === 'en') && item.question?.en && (
                    <p className="font-bold text-white text-base leading-snug">{item.question.en}</p>
                  )}
                  {(langMode === 'both' || langMode === 'ta') && item.question?.ta && (
                    <p className="text-sm font-tamil text-slate-300 leading-relaxed">{item.question.ta}</p>
                  )}
                </div>

                {item.explanation && (
                  <div className="border-t border-slate-800/80 pt-3 text-xs bg-black/20 p-3.5 rounded-xl space-y-1.5 border border-slate-800">
                    <span className="font-extrabold text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Scripture Context:
                    </span>
                    {(langMode === 'both' || langMode === 'en') && item.explanation.en && (
                      <p className="text-slate-300 leading-relaxed">{item.explanation.en}</p>
                    )}
                    {(langMode === 'both' || langMode === 'ta') && item.explanation.ta && (
                      <p className="text-slate-400 font-tamil leading-relaxed">{item.explanation.ta}</p>
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

  // ================= ACTIVE PLAY VIEW =================
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-all"
        >
          <ChevronLeft className="w-4 h-4 text-emerald-400" />
          <span>All Books</span>
        </Link>

        {/* Mode Selector (Competition / Practice) */}
        <div className="inline-flex p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setQuizMode('competition')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              quizMode === 'competition'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Competition</span>
          </button>
          <button
            onClick={() => setQuizMode('practice')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              quizMode === 'practice'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Practice Test</span>
          </button>
        </div>
      </div>

      {/* Progress & Live Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800/90 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-extrabold">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">QUESTION {currentIndex + 1}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{questions.length}</span>
          </div>

          <div className="flex items-center gap-2">
            {quizMode === 'competition' ? (
              <>
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
              </>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg font-bold">
                <GraduationCap className="w-3.5 h-3.5" /> Untimed Learning
              </span>
            )}
          </div>
        </div>

        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-slate-700/60 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Badges Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase">
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
          {(langMode === 'both' || langMode === 'en') && currentQ.question?.en && (
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight">
              {currentQ.question.en}
            </h2>
          )}
          {(langMode === 'both' || langMode === 'ta') && currentQ.question?.ta && (
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
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-all ${
                    isSelected
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/40'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : letter}
                </div>

                <div className="space-y-1 pt-0.5 flex-1">
                  {(langMode === 'both' || langMode === 'en') && opt.text?.en && (
                    <p
                      className={`text-sm sm:text-base font-bold transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-200'
                      }`}
                    >
                      {opt.text.en}
                    </p>
                  )}
                  {(langMode === 'both' || langMode === 'ta') && opt.text?.ta && (
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

        {/* Practice Mode Instant Explanation */}
        {quizMode === 'practice' && practiceRevealed && currentQ.explanation && (
          <div className="p-4 rounded-2xl bg-black/30 border border-slate-800 space-y-1.5 animate-fadeIn">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Explanation & Insight:
            </span>
            {(langMode === 'both' || langMode === 'en') && currentQ.explanation.en && (
              <p className="text-xs text-slate-300 leading-relaxed">{currentQ.explanation.en}</p>
            )}
            {(langMode === 'both' || langMode === 'ta') && currentQ.explanation.ta && (
              <p className="text-xs font-tamil text-slate-400 leading-relaxed">{currentQ.explanation.ta}</p>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => handleNextQuestion(false)}
            disabled={!currentSelectedOption || submitting}
            className={`w-full py-4 px-6 rounded-2xl font-black text-sm tracking-wide shadow-xl transition-all flex items-center justify-center gap-2.5 ${
              currentSelectedOption
                ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-emerald-500/30 hover:scale-[1.01] cursor-pointer'
                : 'bg-slate-800/80 text-slate-500 border border-slate-800 cursor-not-allowed'
            }`}
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Saving Quiz Attempt...</span>
              </span>
            ) : currentIndex + 1 < questions.length ? (
              <>
                <span>Next Question (அடுத்த கேள்வி)</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
                <span>Finish & View Score</span>
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
