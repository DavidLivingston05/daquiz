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

    const cleanPhone = payload.phone.replace(/[^0-9+]/g, '').trim();
    const cleanName = payload.name.trim();
    const cleanAge = Math.min(120, Math.max(1, Number(payload.age) || 18));

    if (!cleanPhone || cleanPhone.length < 7) {
      throw new Error('Please enter a valid phone number (minimum 7 digits).');
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
    const cleanPhone = phone.replace(/[^0-9+]/g, '').trim();
    const user = await User.findOne({ phone: cleanPhone }).lean();

    if (!user) {
      return null;
    }

    const recentAttempts = await QuizAttempt.find({ userPhone: cleanPhone })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('book mode scoreEarned correctAnswers totalQuestions createdAt')
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
      recentAttempts,
    };
  } catch (error: any) {
    console.error('[GET_USER_PROFILE_ERROR]', error.message);
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
  const adminKey = process.env.ADMIN_SECRET_KEY;
  let key = adminKeyProvided;

  if (!key) {
    try {
      const headersList = headers();
      key = headersList.get('x-admin-key') || undefined;
    } catch (e) {}
  }

  if (!adminKey || key !== adminKey) {
    throw new Error('Unauthorized: Invalid Admin Secret Key');
  }

  try {
    await connectToDatabase();

    const users = await User.find()
      .sort({ createdAt: -1 })
      .lean();

    return users.map((u: any) => ({
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
    throw error;
  }
}
