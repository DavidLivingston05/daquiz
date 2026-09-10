import { connectToDatabase } from '@/lib/mongodb';
import { Question } from '@/models/Question';
import { redis } from '@/lib/rateLimit';

/**
 * Database Optimization Layer
 * - Connection pooling
 * - Query optimization (.lean() for read-only queries)
 * - Index management
 * - Cache invalidation
 */

/**
 * Ensure all production indexes exist
 * Run once during deployment or migration
 */
export async function ensureProductionIndexes() {
  await connectToDatabase();

  try {
    // Question collection indexes
    await Question.collection.createIndex({ book: 1, isActive: 1 });
    console.log('✓ Index created: book + isActive');

    await Question.collection.createIndex({ difficulty: 1 });
    console.log('✓ Index created: difficulty');

    await Question.collection.createIndex({ category: 1 });
    console.log('✓ Index created: category');

    await Question.collection.createIndex({ testament: 1, isActive: 1 });
    console.log('✓ Index created: testament + isActive');

    await Question.collection.createIndex({ createdAt: -1 });
    console.log('✓ Index created: createdAt (descending)');

    console.log('All indexes created successfully');
  } catch (error: any) {
    if (error.code === 85) {
      // Index already exists, ignore
      console.log('✓ Indexes already exist');
    } else {
      console.error('Error creating indexes:', error);
      throw error;
    }
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Get quiz questions
 * Directly queries MongoDB with .lean() for maximum speed (<15ms)
 * and freshly shuffles both the question order and option positions on every attempt.
 */
export async function getCachedQuizQuestions(book: string, count = 50, chapter?: number) {
  await connectToDatabase();

  const filter: any = { book, isActive: true };
  if (chapter && !isNaN(Number(chapter))) {
    filter.chapter = Number(chapter);
  }

  const rawQuestions = await Question.find(filter)
    .select('-options.isCorrect')
    .lean();

  if (!rawQuestions || rawQuestions.length === 0) {
    return [];
  }

  // Double-randomization: Shuffle question sequence and slice to requested count
  const randomizedQuestions = shuffleArray(rawQuestions).slice(0, count);

  // Shuffle options for each individual question
  return randomizedQuestions.map((q: any) => ({
    id: q._id.toString(),
    book: q.book,
    chapter: q.chapter,
    verse: q.verse,
    difficulty: q.difficulty,
    category: q.category,
    question: q.question,
    options: shuffleArray<{ id: string; text: { en: string; ta: string } }>(q.options || []),
  }));
}

/**
 * Optimized quiz session retrieval (direct database fallback)
 * - Uses .lean() for speed
 * - Removes correct answer hints
 * - Shuffles question sequence and option order
 */
export async function getOptimizedQuizSession(book: string, count = 50, chapter?: number) {
  return getCachedQuizQuestions(book, count, chapter);
}

/**
 * Optimized full question fetch for verification
 * Uses .lean() and bulk operations
 */
export async function getQuestionsForVerification(questionIds: string[]) {
  await connectToDatabase();

  const questions = await Question.find({ _id: { $in: questionIds } })
    .select('+options.isCorrect') // Explicitly select correct answers (server-only)
    .lean();

  return questions;
}

/**
 * Invalidate quiz cache for a specific book
 * Call after adding/updating questions
 */
export async function invalidateQuizCache(book?: string) {
  if (!redis) return;

  try {
    if (book) {
      const keys1 = await redis.keys(`quiz:pool:${book}*`);
      const keys2 = await redis.keys(`quiz:questions:${book}*`);
      const keys = Array.from(new Set(keys1.concat(keys2)));
      if (keys.length > 0) {
        await redis.del(...keys);
        console.log(`[CACHE_INVALIDATED] ${keys.length} keys for ${book}`);
      }
    } else {
      // Clear all quiz caches
      const keys1 = await redis.keys('quiz:pool:*');
      const keys2 = await redis.keys('quiz:questions:*');
      const keys = Array.from(new Set(keys1.concat(keys2)));
      if (keys.length > 0) {
        await redis.del(...keys);
        console.log(`[CACHE_CLEARED_ALL] ${keys.length} keys`);
      }
    }
  } catch (error) {
    console.warn('[CACHE_INVALIDATION_ERROR]', error);
  }
}

/**
 * Database health check
 * Returns connection status and latency
 */
export async function checkDatabaseHealth() {
  const startTime = Date.now();
  try {
    const db = await connectToDatabase();
    await db.connection.db?.admin().ping();
    const latency = Date.now() - startTime;

    return {
      status: 'healthy',
      latency: `${latency}ms`,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    return {
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Get database statistics for monitoring
 */
export async function getDatabaseStats() {
  await connectToDatabase();

  try {
    const questionCount = await Question.countDocuments();
    const activeQuestionCount = await Question.countDocuments({ isActive: true });
    const questionsByDifficulty = await Question.aggregate([
      { $group: { _id: '$difficulty', count: { $sum: 1 } } },
    ]);

    return {
      totalQuestions: questionCount,
      activeQuestions: activeQuestionCount,
      inactiveQuestions: questionCount - activeQuestionCount,
      byDifficulty: Object.fromEntries(
        questionsByDifficulty.map((doc: any) => [doc._id, doc.count])
      ),
    };
  } catch (error: any) {
    console.error('[DB_STATS_ERROR]', error);
    throw error;
  }
}
