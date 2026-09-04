'use server';

import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';
import { QuizAttempt } from '@/models/QuizAttempt';
import { headers } from 'next/headers';

export interface UserAuthPayload {
  name: string;
  phone: string;
  age: number;
}

/**
 * Register or login a user with Name, Phone, and Age.
 * Updates user information and returns the profile.
 */
export async function registerOrLoginUser(payload: UserAuthPayload) {
  try {
    await connectToDatabase();

    // Clean phone number to strictly 10 digits (strip country codes / leading 0 if needed)
    let cleanPhone = payload.phone.replace(/[^0-9]/g, '').trim();
    if (cleanPhone.length === 11 && cleanPhone.startsWith('0')) {
      cleanPhone = cleanPhone.slice(1);
    } else if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
      cleanPhone = cleanPhone.slice(2);
    }

    const cleanName = payload.name.trim();
    const cleanAge = Math.min(120, Math.max(1, Number(payload.age) || 18));

    if (!cleanPhone || cleanPhone.length !== 10) {
      throw new Error('Phone number must be exactly 10 digits.');
    }

    if (!cleanName || cleanName.length < 2) {
      throw new Error('Please enter a valid name (minimum 2 characters).');
    }

    let user = await User.findOne({ phone: cleanPhone });

    if (!user) {
      user = await User.create({
        name: cleanName,
        phone: cleanPhone,
        age: cleanAge,
        lastActive: new Date(),
      });
      console.log(`[USER_REGISTERED] ${user.name} (${user.phone})`);
    } else {
      // Update name & age if changed and refresh lastActive
      user.name = cleanName;
      user.age = cleanAge;
      user.lastActive = new Date();
      await user.save();
      console.log(`[USER_LOGGED_IN] ${user.name} (${user.phone})`);
    }

    return {
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        phone: user.phone,
        age: user.age,
        totalScore: user.totalScore,
        quizzesTaken: user.quizzesTaken,
        practiceCount: user.practiceCount,
      },
    };
  } catch (error: any) {
    console.error('[AUTH_ERROR]', error.message);
    throw new Error(error.message || 'Authentication failed');
  }
}

/**
 * Get user profile and recent attempts by phone number
 */
export async function getUserProfile(phone: string) {
  try {
    await connectToDatabase();
    let cleanPhone = phone.replace(/[^0-9]/g, '').trim();
    if (cleanPhone.length === 11 && cleanPhone.startsWith('0')) {
      cleanPhone = cleanPhone.slice(1);
    } else if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
      cleanPhone = cleanPhone.slice(2);
    }
    const user = await User.findOne({ phone: cleanPhone }).lean();

    if (!user) {
      return null;
    }

    const recentAttempts = await QuizAttempt.find({ userPhone: cleanPhone })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('book chapter mode scoreEarned correctAnswers totalQuestions timeTakenSeconds createdAt')
      .lean();

    return {
      user: {
        id: (user as any)._id.toString(),
        name: (user as any).name,
        phone: (user as any).phone,
        age: (user as any).age,
        totalScore: (user as any).totalScore || 0,
        quizzesTaken: (user as any).quizzesTaken || 0,
        practiceCount: (user as any).practiceCount || 0,
        createdAt: (user as any).createdAt,
      },
      recentAttempts: recentAttempts.map((a: any) => ({
        id: a._id.toString(),
        book: a.book,
        chapter: a.chapter || 1,
        mode: a.mode || 'competition',
        scoreEarned: a.scoreEarned,
        correctAnswers: a.correctAnswers,
        totalQuestions: a.totalQuestions,
        timeTakenSeconds: a.timeTakenSeconds || 0,
        accuracy: Math.round(((a.correctAnswers || 0) / (a.totalQuestions || 1)) * 100),
        createdAt: a.createdAt,
      })),
    };
  } catch (error: any) {
    console.error('[GET_USER_PROFILE_ERROR]', error.message);
    return null;
  }
}

/**
 * Get full user progress statistics, completed chapters, and attempts history
 */
export async function getUserProgressAndProfile(phone: string) {
  try {
    await connectToDatabase();
    let cleanPhone = phone.replace(/[^0-9]/g, '').trim();
    if (cleanPhone.length === 11 && cleanPhone.startsWith('0')) {
      cleanPhone = cleanPhone.slice(1);
    } else if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
      cleanPhone = cleanPhone.slice(2);
    }

    const user = await User.findOne({ phone: cleanPhone }).lean();
    if (!user) {
      return null;
    }

    const allAttempts = await QuizAttempt.find({ userPhone: cleanPhone })
      .sort({ createdAt: -1 })
      .lean();

    const totalQuestionsAttempted = allAttempts.reduce((sum, a) => sum + (a.totalQuestions || 0), 0);
    const totalCorrectAnswers = allAttempts.reduce((sum, a) => sum + (a.correctAnswers || 0), 0);
    const overallAccuracy =
      totalQuestionsAttempted > 0
        ? Math.round((totalCorrectAnswers / totalQuestionsAttempted) * 100)
        : 0;

    // Group chapters completed
    const chaptersMap: Record<
      string,
      {
        book: string;
        chapter: number;
        attemptsCount: number;
        bestAccuracy: number;
        bestCorrect: number;
        totalQuestions: number;
        lastCompletedAt: Date;
        lastMode: string;
      }
    > = {};

    allAttempts.forEach((a: any) => {
      const b = a.book || 'Unknown';
      const ch = Number(a.chapter) || 1;
      const key = `${b}_${ch}`;
      const accuracy = Math.round(((a.correctAnswers || 0) / (a.totalQuestions || 1)) * 100);

      if (!chaptersMap[key]) {
        chaptersMap[key] = {
          book: b,
          chapter: ch,
          attemptsCount: 1,
          bestAccuracy: accuracy,
          bestCorrect: a.correctAnswers || 0,
          totalQuestions: a.totalQuestions || 50,
          lastCompletedAt: a.createdAt,
          lastMode: a.mode || 'competition',
        };
      } else {
        chaptersMap[key].attemptsCount += 1;
        if (accuracy > chaptersMap[key].bestAccuracy) {
          chaptersMap[key].bestAccuracy = accuracy;
          chaptersMap[key].bestCorrect = a.correctAnswers || 0;
        }
      }
    });

    const completedChapters = Object.values(chaptersMap).sort((a, b) => {
      if (a.book === b.book) return a.chapter - b.chapter;
      return a.book.localeCompare(b.book);
    });

    return {
      user: {
        id: (user as any)._id.toString(),
        name: (user as any).name,
        phone: (user as any).phone,
        age: (user as any).age,
        totalScore: (user as any).totalScore || 0,
        quizzesTaken: (user as any).quizzesTaken || 0,
        practiceCount: (user as any).practiceCount || 0,
        createdAt: (user as any).createdAt,
      },
      stats: {
        totalAttempts: allAttempts.length,
        competitionAttempts: allAttempts.filter((a) => a.mode === 'competition').length,
        practiceAttempts: allAttempts.filter((a) => a.mode === 'practice').length,
        totalQuestionsAttempted,
        totalCorrectAnswers,
        overallAccuracy,
        distinctChaptersCompleted: completedChapters.length,
      },
      completedChapters,
      recentAttempts: allAttempts.slice(0, 20).map((a: any) => ({
        id: a._id.toString(),
        book: a.book,
        chapter: Number(a.chapter) || 1,
        mode: a.mode || 'competition',
        scoreEarned: a.scoreEarned,
        correctAnswers: a.correctAnswers,
        totalQuestions: a.totalQuestions,
        timeTakenSeconds: a.timeTakenSeconds || 0,
        accuracy: Math.round(((a.correctAnswers || 0) / (a.totalQuestions || 1)) * 100),
        createdAt: a.createdAt,
      })),
    };
  } catch (error: any) {
    console.error('[GET_USER_PROGRESS_ERROR]', error.message);
    return null;
  }
}

/**
 * Get public top leaderboard
 */
export async function getLeaderboard(limit = 10) {
  try {
    await connectToDatabase();

    const topUsers = await User.find({ totalScore: { $gt: 0 } })
      .sort({ totalScore: -1 })
      .limit(limit)
      .select('name totalScore quizzesTaken age')
      .lean();

    return topUsers.map((u: any, idx) => ({
      rank: idx + 1,
      id: u._id.toString(),
      name: u.name,
      totalScore: u.totalScore,
      quizzesTaken: u.quizzesTaken,
      age: u.age,
    }));
  } catch (error: any) {
    console.warn('[GET_LEADERBOARD_WARN]', error.message);
    return [];
  }
}

/**
 * Admin action to fetch all registered users
 */
export async function getAllUsersAdmin(adminKeyProvided?: string) {
  try {
    await connectToDatabase();

    const users = await User.find()
      .sort({ createdAt: -1 })
      .lean();

    return (users || []).map((u: any) => ({
      id: u._id.toString(),
      name: u.name,
      phone: u.phone,
      age: u.age,
      totalScore: u.totalScore || 0,
      quizzesTaken: u.quizzesTaken || 0,
      practiceCount: u.practiceCount || 0,
      lastActive: u.lastActive,
      createdAt: u.createdAt,
    }));
  } catch (error: any) {
    console.error('[GET_ALL_USERS_ADMIN_ERROR]', error.message);
    return [];
  }
}

/**
 * Admin action to delete a registered user and their attempts
 */
export async function deleteUserAdmin(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    const userPhone = user.phone;
    await Promise.all([
      User.findByIdAndDelete(userId),
      QuizAttempt.deleteMany({ userPhone }),
    ]);

    console.log(`[USER_DELETED_ADMIN] Deleted user ${userId} (${userPhone})`);
    return { success: true };
  } catch (error: any) {
    console.error('[DELETE_USER_ADMIN_ERROR]', error.message);
    throw new Error(error.message || 'Failed to delete user.');
  }
}
