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

/**
 * Get quiz questions with caching
 * 30-minute cache prevents database hammering
 */
export async function getCachedQuizQuestions(book: string, count = 10) {
  const cacheKey = `quiz:questions:${book}:${count}`;

  if (redis) {
    try {
      // Try cache first
      const cached = await redis.get(cacheKey);
      if (cached) {
        console.log(`[CACHE_HIT] ${cacheKey}`);
        return typeof cached === 'string' ? JSON.parse(cached) : cached;
      }
    } catch (error) {
      console.warn('[CACHE_READ_ERROR]', error);
      // Continue to database fetch
    }
  }

  // Cache miss or no Redis: fetch from database
  const questions = await getOptimizedQuizSession(book, count);

  // Store in cache
  if (redis) {
    try {
      await redis.setex(cacheKey, 1800, JSON.stringify(questions)); // 30 min TTL
      console.log(`[CACHE_SET] ${cacheKey}`);
    } catch (error) {
      console.warn('[CACHE_WRITE_ERROR]', error);
    }
  }

  return questions;
}

/**
 * Optimized quiz session retrieval
 * - Uses .lean() for ~3x speed improvement
 * - Removes correct answer hints
 * - Uses indexed queries
 */
export async function getOptimizedQuizSession(book: string, count = 10) {
  await connectToDatabase();

  const totalCount = await Question.countDocuments({ book, isActive: true });
  const skip = Math.floor(Math.random() * Math.max(0, totalCount - count + 1));

  const questions = await Question.find({ book, isActive: true })
    .skip(skip)
    .limit(count)
    .select('-options.isCorrect') // Never send correct answers to client
    .lean(); // Returns plain JS objects (2-3x faster)

  return questions.map((q: any) => ({
    id: q._id.toString(),
    book: q.book,
    chapter: q.chapter,
    verse: q.verse,
    difficulty: q.difficulty,
    category: q.category,
    question: q.question,
    options: q.options,
  }));
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
      const pattern = `quiz:questions:${book}:*`;
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
        console.log(`[CACHE_INVALIDATED] ${keys.length} keys for ${book}`);
      }
    } else {
      // Clear all quiz caches
      const keys = await redis.keys('quiz:questions:*');
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
