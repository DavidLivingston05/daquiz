'use server';

import { connectToDatabase } from '@/lib/mongodb';
import { Question } from '@/models/Question';
import { QuizAttempt } from '@/models/QuizAttempt';
import {
  quizSubmissionLimiter,
  quizLoadLimiter,
  questionCreationLimiter,
  enforceRateLimit,
  getClientIp,
} from '@/lib/rateLimit';
import {
  getCachedQuizQuestions,
  getQuestionsForVerification,
  invalidateQuizCache,
} from '@/lib/dbOptimizations';
import {
  QuizSubmissionSchema,
  QuizSessionSchema,
  QuestionCreationSchema,
  validateInput,
} from '@/lib/validation';
import { headers } from 'next/headers';

export interface SanitizedQuestion {
  id: string;
  book: string;
  chapter?: number;
  verse?: number;
  difficulty: string;
  category?: string;
  question: { en: string; ta: string };
  options: { id: string; text: { en: string; ta: string } }[];
}

export interface SubmissionPayload {
  guestIdentifier: string;
  book: string;
  totalTime: number;
  answers: {
    questionId: string;
    selectedOptionId: string;
    timeSpent: number;
  }[];
}

/**
 * Get distinct books and question counts available
 * Safe for Server Components with try/catch fallback
 */
export async function getAvailableBooks() {
  try {
    await connectToDatabase();

    const books = await Question.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: { book: '$book', testament: '$testament' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          book: '$_id.book',
          testament: '$_id.testament',
          count: 1,
        },
      },
      { $sort: { book: 1 } },
    ]);

    return books || [];
  } catch (error: any) {
    console.warn('[GET_AVAILABLE_BOOKS_WARN]', error.message);
    return [];
  }
}

/**
 * Get quiz questions for a specific book
 * - Rate limited
 * - Cached in Redis
 * - Optimized with .lean()
 */
export async function getQuizSession(book: string, count = 10): Promise<SanitizedQuestion[]> {
  let clientIp = 'unknown';
  try {
    const headersList = headers();
    clientIp = getClientIp(headersList);
  } catch (e) {
    // Non-fatal if headers() is unavailable
  }

  // Rate limit check (gracefully fails open if Redis not configured)
  await enforceRateLimit(quizLoadLimiter, clientIp, 'Too many quiz requests');

  // Validate input
  const validated = validateInput(QuizSessionSchema, { book, count });

  // Fetch cached or fresh sanitized questions
  return getCachedQuizQuestions(validated.book, validated.count);
}

/**
 * Submit quiz and verify answers server-side
 * - Rate limited
 * - Calculates score server-side with difficulty weighting & speed bonus
 * - Prevents client tampering
 */
export async function verifyAndSubmitQuiz(payload: SubmissionPayload) {
  // Rate limit check
  await enforceRateLimit(
    quizSubmissionLimiter,
    payload.guestIdentifier,
    'Too many quiz submissions'
  );

  // Validate input
  const validPayload = validateInput(QuizSubmissionSchema, payload);

  await connectToDatabase();

  // Fetch ONLY from database
  const questionIds = validPayload.answers.map((a) => a.questionId);
  const fullQuestions = await getQuestionsForVerification(questionIds);

  if (fullQuestions.length !== questionIds.length) {
    throw new Error('One or more questions not found');
  }

  let totalScore = 0;
  let correctCount = 0;

  const reviewedAnswers = validPayload.answers.map((ans) => {
    const original = fullQuestions.find((q: any) => q._id.toString() === ans.questionId);
    if (!original) {
      return {
        ...ans,
        isCorrect: false,
        explanation: null,
        correctOptionId: null,
        reference: '',
        question: { en: '', ta: '' },
      };
    }

    const correctOption = (original as any).options?.find((opt: any) => opt.isCorrect);
    const isCorrect = correctOption?.id === ans.selectedOptionId;

    if (isCorrect) {
      correctCount += 1;

      // Difficulty-weighted scoring
      const basePoints =
        (original as any).difficulty === 'hard'
          ? 200
          : (original as any).difficulty === 'medium'
            ? 150
            : 100;

      // Speed bonus: 0-50 points for answering within 15 seconds
      const speedBonus = Math.max(0, Math.round(50 * ((15 - Math.min(ans.timeSpent, 15)) / 15)));

      totalScore += basePoints + speedBonus;
    }

    return {
      questionId: (original as any)._id.toString(),
      selectedOptionId: ans.selectedOptionId,
      isCorrect,
      timeSpentSeconds: ans.timeSpent,
      correctOptionId: correctOption?.id,
      explanation: (original as any).explanation || { en: '', ta: '' },
      reference: `${(original as any).book} ${(original as any).chapter || 1}:${(original as any).verse || 1}`,
      question: (original as any).question,
    };
  });

  // Store attempt in database
  const attempt = await QuizAttempt.create({
    guestIdentifier: validPayload.guestIdentifier,
    quizType: 'book',
    book: validPayload.book,
    totalQuestions: validPayload.answers.length,
    correctAnswers: correctCount,
    scoreEarned: totalScore,
    timeTakenSeconds: validPayload.totalTime,
    answers: reviewedAnswers.map((r) => ({
      questionId: r.questionId,
      selectedOptionId: r.selectedOptionId,
      isCorrect: r.isCorrect,
      timeSpentSeconds: r.timeSpentSeconds,
    })),
  });

  console.log('[QUIZ_COMPLETE]', {
    attemptId: attempt._id.toString(),
    guest: validPayload.guestIdentifier,
    book: validPayload.book,
    score: totalScore,
    accuracy: Math.round((correctCount / validPayload.answers.length) * 100),
  });

  return {
    attemptId: attempt._id.toString(),
    score: totalScore,
    correctCount,
    totalQuestions: validPayload.answers.length,
    accuracy: Math.round((correctCount / validPayload.answers.length) * 100),
    review: reviewedAnswers,
  };
}

/**
 * Create new question (admin only)
 * - Protected by ADMIN_SECRET_KEY
 * - Rate limited
 * - Invalidates cache
 */
export async function createQuestion(formData: {
  testament: 'OT' | 'NT';
  book: string;
  chapter: number;
  verse: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question_en: string;
  question_ta: string;
  options: { text_en: string; text_ta: string }[];
  correctOptionIndex: number;
  explanation_en?: string;
  explanation_ta?: string;
  adminKeyProvided?: string;
}) {
  const adminKey = process.env.ADMIN_SECRET_KEY;
  let providedKey = formData.adminKeyProvided;

  if (!providedKey) {
    try {
      const headersList = headers();
      providedKey = headersList.get('x-admin-key') || undefined;
    } catch (e) {
      // ignore
    }
  }

  if (!adminKey || providedKey !== adminKey) {
    throw new Error('Unauthorized: Invalid Admin Secret Key');
  }

  // Rate limit
  await enforceRateLimit(questionCreationLimiter, 'admin', 'Too many questions created');

  // Validate input
  const validated = validateInput(QuestionCreationSchema, formData);

  await connectToDatabase();

  const formattedOptions = validated.options.map((opt, index) => ({
    id: `opt_${index + 1}`,
    text: { en: opt.text_en, ta: opt.text_ta },
    isCorrect: index === validated.correctOptionIndex,
  }));

  const created = await Question.create({
    testament: validated.testament,
    book: validated.book,
    chapter: validated.chapter,
    verse: validated.verse,
    difficulty: validated.difficulty,
    category: validated.category,
    question: { en: validated.question_en, ta: validated.question_ta },
    options: formattedOptions,
    explanation: {
      en: validated.explanation_en || '',
      ta: validated.explanation_ta || '',
    },
  });

  // Invalidate cache
  await invalidateQuizCache(validated.book);

  console.log('[QUESTION_CREATED]', {
    id: created._id.toString(),
    book: validated.book,
    difficulty: validated.difficulty,
  });

  return { success: true, id: created._id.toString() };
}

/**
 * Get quiz statistics for a guest
 */
export async function getGuestStatistics(guestIdentifier: string) {
  try {
    await connectToDatabase();

    const attempts = await QuizAttempt.find({ guestIdentifier })
      .sort({ createdAt: -1 })
      .select('correctAnswers totalQuestions scoreEarned book createdAt')
      .lean();

    if (!attempts || attempts.length === 0) {
      return {
        totalAttempts: 0,
        averageScore: 0,
        averageAccuracy: 0,
        bestScore: 0,
        history: [],
      };
    }

    const totalAttempts = attempts.length;
    const averageScore = Math.round(
      attempts.reduce((sum, a) => sum + a.scoreEarned, 0) / totalAttempts
    );
    const averageAccuracy = Math.round(
      attempts.reduce((sum, a) => sum + (a.correctAnswers / a.totalQuestions) * 100, 0) / totalAttempts
    );
    const bestScore = Math.max(...attempts.map((a) => a.scoreEarned));

    return {
      totalAttempts,
      averageScore,
      averageAccuracy,
      bestScore,
      history: attempts.slice(0, 10),
    };
  } catch (error: any) {
    console.error('[GET_GUEST_STATS_ERROR]', error.message);
    return {
      totalAttempts: 0,
      averageScore: 0,
      averageAccuracy: 0,
      bestScore: 0,
      history: [],
    };
  }
}
