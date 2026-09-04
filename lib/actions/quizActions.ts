'use server';

import { connectToDatabase } from '@/lib/mongodb';
import { Question } from '@/models/Question';
import { QuizAttempt } from '@/models/QuizAttempt';
import { User } from '@/models/User';
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
  explanation?: { en: string; ta: string }; // Provided in practice mode
}

export interface SubmissionPayload {
  guestIdentifier?: string;
  userPhone?: string;
  userName?: string;
  mode?: 'competition' | 'practice' | 'book';
  book: string;
  chapter?: number;
  totalTime: number;
  answers: {
    questionId: string;
    selectedOptionId: string;
    timeSpent: number;
  }[];
}

/**
 * Get distinct books and question counts available
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
 * Get available chapters and question counts for a specific book
 */
export async function getAvailableChapters(book: string) {
  try {
    await connectToDatabase();

    const chapters = await Question.aggregate([
      { $match: { book, isActive: true } },
      {
        $group: {
          _id: '$chapter',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          chapter: '$_id',
          count: 1,
        },
      },
      { $sort: { chapter: 1 } },
    ]);

    return chapters || [];
  } catch (error: any) {
    console.warn('[GET_AVAILABLE_CHAPTERS_WARN]', error.message);
    return [];
  }
}

/**
 * Get quiz questions for a specific book and optional chapter
 * If mode === 'practice', includes explanations for instant study.
 */
export async function getQuizSession(
  book: string,
  count = 50,
  mode: 'competition' | 'practice' = 'competition',
  chapter?: number
): Promise<SanitizedQuestion[]> {
  let clientIp = 'unknown';
  try {
    const headersList = headers();
    clientIp = getClientIp(headersList);
  } catch (e) {}

  await enforceRateLimit(quizLoadLimiter, clientIp, 'Too many quiz requests');

  const validated = validateInput(QuizSessionSchema, { book, count, chapter });

  if (mode === 'practice') {
    // For practice mode, return questions with explanation
    await connectToDatabase();
    const filter: any = { book: validated.book, isActive: true };
    if (validated.chapter) {
      filter.chapter = validated.chapter;
    }

    const questions = await Question.find(filter)
      .limit(validated.count || 50)
      .select('-options.isCorrect')
      .lean();

    return questions.map((q: any) => ({
      id: q._id.toString(),
      book: q.book,
      chapter: q.chapter,
      verse: q.verse,
      difficulty: q.difficulty,
      category: q.category,
      question: q.question,
      options: q.options,
      explanation: q.explanation,
    }));
  }

  // Standard cached session for competition / regular quiz
  return getCachedQuizQuestions(validated.book, validated.count, validated.chapter);
}

/**
 * Submit quiz and verify answers server-side
 * Links attempt to registered user if phone is provided
 */
export async function verifyAndSubmitQuiz(payload: SubmissionPayload) {
  const identifier = payload.userPhone || payload.guestIdentifier || 'anonymous_guest';

  await enforceRateLimit(quizSubmissionLimiter, identifier, 'Too many quiz submissions');

  await connectToDatabase();

  const questionIds = payload.answers.map((a) => a.questionId);
  const fullQuestions = await getQuestionsForVerification(questionIds);

  if (fullQuestions.length !== questionIds.length) {
    throw new Error('One or more questions not found');
  }

  let totalScore = 0;
  let correctCount = 0;

  const reviewedAnswers = payload.answers.map((ans) => {
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
    const selectedOption = (original as any).options?.find((opt: any) => opt.id === ans.selectedOptionId);
    const isCorrect = correctOption?.id === ans.selectedOptionId;

    if (isCorrect) {
      correctCount += 1;

      const basePoints =
        (original as any).difficulty === 'hard'
          ? 200
          : (original as any).difficulty === 'medium'
            ? 150
            : 100;

      // Speed bonus
      const speedBonus = Math.max(0, Math.round(50 * ((15 - Math.min(ans.timeSpent, 15)) / 15)));
      totalScore += basePoints + speedBonus;
    }

    return {
      questionId: (original as any)._id.toString(),
      selectedOptionId: ans.selectedOptionId,
      selectedOptionText: selectedOption ? selectedOption.text : null,
      isCorrect,
      timeSpentSeconds: ans.timeSpent,
      correctOptionId: correctOption?.id,
      correctOptionText: correctOption ? correctOption.text : null,
      options: (original as any).options?.map((opt: any) => ({
        id: opt.id,
        text: opt.text,
        isCorrect: !!opt.isCorrect,
      })) || [],
      question: (original as any).question,
    };
  });

  // Store attempt
  const attempt = await QuizAttempt.create({
    userPhone: payload.userPhone,
    userName: payload.userName,
    guestIdentifier: payload.guestIdentifier || (payload.userPhone ? undefined : 'guest_anon'),
    quizType: 'book',
    mode: payload.mode || 'competition',
    book: payload.book,
    totalQuestions: payload.answers.length,
    correctAnswers: correctCount,
    scoreEarned: totalScore,
    timeTakenSeconds: payload.totalTime,
    answers: reviewedAnswers.map((r) => ({
      questionId: r.questionId,
      selectedOptionId: r.selectedOptionId,
      isCorrect: r.isCorrect,
      timeSpentSeconds: r.timeSpentSeconds,
    })),
  });

  // If user is logged in with phone, update User document
  if (payload.userPhone) {
    try {
      const user = await User.findOne({ phone: payload.userPhone });
      if (user) {
        user.totalScore += totalScore;
        if (payload.mode === 'practice') {
          user.practiceCount = (user.practiceCount || 0) + 1;
        } else {
          user.quizzesTaken = (user.quizzesTaken || 0) + 1;
        }
        user.lastActive = new Date();
        await user.save();
      }
    } catch (err: any) {
      console.warn('[USER_SCORE_UPDATE_WARN]', err.message);
    }
  }

  return {
    attemptId: attempt._id.toString(),
    score: totalScore,
    correctCount,
    totalQuestions: payload.answers.length,
    accuracy: Math.round((correctCount / payload.answers.length) * 100),
    review: reviewedAnswers,
  };
}

/**
 * Admin: Get all questions with filters, search, and pagination
 */
export async function getAllQuestionsAdmin(params: {
  search?: string;
  book?: string;
  difficulty?: string;
  testament?: string;
  page?: number;
  limit?: number;
  adminKeyProvided?: string;
}) {
  try {
    await connectToDatabase();

    const query: any = {};

    if (params.book && params.book !== 'ALL') {
      query.book = params.book;
    }
    if (params.difficulty && params.difficulty !== 'ALL') {
      query.difficulty = params.difficulty;
    }
    if (params.testament && params.testament !== 'ALL') {
      query.testament = params.testament;
    }

    if (params.search && params.search.trim()) {
      const s = params.search.trim();
      query.$or = [
        { 'question.en': { $regex: s, $options: 'i' } },
        { 'question.ta': { $regex: s, $options: 'i' } },
        { book: { $regex: s, $options: 'i' } },
        { category: { $regex: s, $options: 'i' } },
      ];
    }

    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(5, params.limit || 20));
    const skip = (page - 1) * limit;

    const total = await Question.countDocuments(query);
    const questions = await Question.find(query)
      .select('+options.isCorrect')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      questions: questions.map((q: any) => ({
        id: q._id.toString(),
        testament: q.testament,
        book: q.book,
        chapter: q.chapter,
        verse: q.verse,
        difficulty: q.difficulty,
        category: q.category,
        question: q.question,
        options: q.options,
        explanation: q.explanation,
        isActive: q.isActive,
        createdAt: q.createdAt,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error: any) {
    console.error('[GET_ALL_QUESTIONS_ADMIN_ERROR]', error.message);
    return {
      questions: [],
      total: 0,
      page: 1,
      totalPages: 1,
      error: error.message,
    };
  }
}

/**
 * Admin: Create new question
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
  try {
    const validated = validateInput(QuestionCreationSchema, formData);
    await connectToDatabase();

    const formattedOptions = validated.options.map((opt, index) => ({
      id: `opt_${index + 1}`,
      text: { en: opt.text_en, ta: opt.text_ta },
      isCorrect: index === validated.correctOptionIndex,
    }));

    const created = await Question.create({
      testament: validated.testament,
      book: validated.book.trim(),
      chapter: validated.chapter,
      verse: validated.verse,
      difficulty: validated.difficulty,
      category: (validated.category || '').trim(),
      question: { en: validated.question_en.trim(), ta: validated.question_ta.trim() },
      options: formattedOptions,
      explanation: {
        en: validated.explanation_en || '',
        ta: validated.explanation_ta || '',
      },
      isActive: true,
    });

    await invalidateQuizCache(validated.book);

    return { success: true, id: created._id.toString() };
  } catch (error: any) {
    console.error('[CREATE_QUESTION_ERROR]', error.message);
    throw new Error(error.message || 'Failed to create question');
  }
}

/**
 * Admin: Update an existing question (CRUD - Update)
 */
export async function updateQuestion(payload: {
  id: string;
  testament: 'OT' | 'NT';
  book: string;
  chapter: number;
  verse: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
  question_en: string;
  question_ta: string;
  options: { id?: string; text_en: string; text_ta: string; isCorrect: boolean }[];
  explanation_en?: string;
  explanation_ta?: string;
  adminKeyProvided?: string;
}) {
  try {
    await connectToDatabase();

    const formattedOptions = payload.options.map((opt, idx) => ({
      id: opt.id || `opt_${idx + 1}`,
      text: { en: opt.text_en, ta: opt.text_ta },
      isCorrect: opt.isCorrect,
    }));

    const updated = await Question.findByIdAndUpdate(
      payload.id,
      {
        testament: payload.testament,
        book: payload.book.trim(),
        chapter: Number(payload.chapter) || 1,
        verse: Number(payload.verse) || 1,
        difficulty: payload.difficulty,
        category: (payload.category || '').trim(),
        question: { en: payload.question_en.trim(), ta: payload.question_ta.trim() },
        options: formattedOptions,
        explanation: {
          en: payload.explanation_en || '',
          ta: payload.explanation_ta || '',
        },
      },
      { new: true }
    );

    if (!updated) {
      throw new Error('Question not found');
    }

    await invalidateQuizCache(payload.book);

    return { success: true, id: updated._id.toString() };
  } catch (error: any) {
    console.error('[UPDATE_QUESTION_ERROR]', error.message);
    throw new Error(error.message || 'Failed to update question');
  }
}

/**
 * Admin: Delete a question (CRUD - Delete)
 */
export async function deleteQuestion(id: string, adminKeyProvided?: string) {
  try {
    await connectToDatabase();

    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      throw new Error('Question not found');
    }

    await invalidateQuizCache((question as any).book);

    return { success: true, id };
  } catch (error: any) {
    console.error('[DELETE_QUESTION_ERROR]', error.message);
    throw new Error(error.message || 'Failed to delete question');
  }
}
