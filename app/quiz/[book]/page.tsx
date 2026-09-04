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
          setErrorMsg(`No active questions found for ${book}. Please seed or add questions via Admin.`);
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
          // Time's up for this question - automatically advance
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
      // Finished all questions
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
        answers: answersToSubmit.filter((a) => a.selectedOptionId && a.selectedOptionId !== 'timeout_no_answer'),
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-600 font-medium">Preparing quiz for {book}...</p>
      </div>
    );
  }

  if (errorMsg && !quizResult) {
    return (
      <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl border border-red-200 shadow-sm text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
          <XCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Quiz Unavailable</h2>
        <p className="text-sm text-slate-600">{errorMsg}</p>
        <div className="pt-4 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors"
          >
            Back to Books
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            Add Questions in Admin
          </Link>
        </div>
      </div>
    );
  }

  // RESULT & REVIEW VIEW
  if (quizResult) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
        {/* Score Card Header */}
        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <div className="inline-flex p-3 rounded-2xl bg-white/10 backdrop-blur-md text-yellow-300">
            <Award className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-extrabold">Quiz Completed!</h1>
          <p className="text-emerald-100 text-sm">
            Book: <span className="font-semibold text-white">{book}</span> • Accuracy:{' '}
            <span className="font-semibold text-white">{quizResult.accuracy}%</span>
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <span className="text-xs text-emerald-200 font-medium">Total Score</span>
              <p className="text-2xl font-black text-yellow-300">{quizResult.score}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <span className="text-xs text-emerald-200 font-medium">Correct</span>
              <p className="text-2xl font-black text-emerald-300">
                {quizResult.correctCount} / {quizResult.totalQuestions}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <span className="text-xs text-emerald-200 font-medium">Accuracy</span>
              <p className="text-2xl font-black text-white">{quizResult.accuracy}%</p>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-800 font-bold text-sm shadow hover:bg-emerald-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-600 transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Other Books
            </Link>
          </div>
        </div>

        {/* Detailed Question Reviews */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Answer Review & Explanations</span>
            <span className="text-xs font-normal text-slate-500">(விளக்கங்கள்)</span>
          </h2>

          <div className="space-y-4">
            {quizResult.review?.map((item: any, idx: number) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border bg-white space-y-3 transition-all ${
                  item.isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-red-200 bg-red-50/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {item.reference}
                    </span>
                  </div>
                  <div>
                    {item.isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  {item.question?.en && (
                    <p className="font-semibold text-slate-900 text-base">{item.question.en}</p>
                  )}
                  {item.question?.ta && (
                    <p className="text-sm text-slate-700">{item.question.ta}</p>
                  )}
                </div>

                {item.explanation && (
                  <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl space-y-1">
                    <span className="font-bold text-slate-700 block">Explanation:</span>
                    {item.explanation.en && <p>{item.explanation.en}</p>}
                    {item.explanation.ta && <p className="text-slate-500">{item.explanation.ta}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE QUIZ PLAY VIEW
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Bar: Navigation, Book, Language Toggle */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> All Books
        </Link>

        {/* Language selector toggle */}
        <div className="inline-flex p-1 rounded-xl bg-slate-200/70 text-xs font-medium">
          <button
            onClick={() => setLangMode('both')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              langMode === 'both' ? 'bg-white text-emerald-800 shadow-sm font-bold' : 'text-slate-600'
            }`}
          >
            Both (இருமொழி)
          </button>
          <button
            onClick={() => setLangMode('en')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              langMode === 'en' ? 'bg-white text-emerald-800 shadow-sm font-bold' : 'text-slate-600'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLangMode('ta')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              langMode === 'ta' ? 'bg-white text-emerald-800 shadow-sm font-bold' : 'text-slate-600'
            }`}
          >
            தமிழ்
          </button>
        </div>
      </div>

      {/* Progress & Question Counter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="flex items-center gap-1 font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            <Clock className="w-3.5 h-3.5" /> {questionTimeLeft}s
          </span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 uppercase tracking-wider">
              {currentQ.difficulty}
            </span>
            {currentQ.category && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                {currentQ.category}
              </span>
            )}
            <span className="text-xs text-slate-400 ml-auto font-medium">
              {currentQ.book} {currentQ.chapter ? `${currentQ.chapter}:${currentQ.verse || 1}` : ''}
            </span>
          </div>

          <div className="space-y-2">
            {(langMode === 'both' || langMode === 'en') && (
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {currentQ.question.en}
              </h2>
            )}
            {(langMode === 'both' || langMode === 'ta') && (
              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
                {currentQ.question.ta}
              </p>
            )}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = currentSelectedOption === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </div>

                <div className="space-y-0.5 pt-0.5">
                  {(langMode === 'both' || langMode === 'en') && (
                    <p className={`text-sm font-semibold ${isSelected ? 'text-emerald-950' : 'text-slate-800'}`}>
                      {opt.text.en}
                    </p>
                  )}
                  {(langMode === 'both' || langMode === 'ta') && (
                    <p className={`text-xs ${isSelected ? 'text-emerald-800' : 'text-slate-600'}`}>
                      {opt.text.ta}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => handleNextQuestion(false)}
            disabled={!currentSelectedOption || submitting}
            className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span>Submitting answers...</span>
            ) : currentIndex + 1 < questions.length ? (
              <>
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Finish & View Score</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
