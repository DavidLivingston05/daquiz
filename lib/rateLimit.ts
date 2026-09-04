import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Rate Limiting for daquiz
 * Prevents abuse and DDoS attacks
 *
 * Requires environment variables:
 * - UPSTASH_REDIS_REST_URL
 * - UPSTASH_REDIS_REST_TOKEN
 */

const hasRedisConfig = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

// Initialize Redis client conditionally to avoid crashing when env vars are not set
export const redis = hasRedisConfig ? Redis.fromEnv() : null;

// Rate limiter: 5 quiz submissions per hour per user
export const quizSubmissionLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 h'),
      analytics: true,
      prefix: 'quiz:submit',
    })
  : null;

// Rate limiter: 30 quiz loads per 5 minutes per IP
export const quizLoadLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, '5 m'),
      analytics: true,
      prefix: 'quiz:load',
    })
  : null;

// Rate limiter: 10 question creations per 24 hours (admin)
export const questionCreationLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '24 h'),
      analytics: true,
      prefix: 'question:create',
    })
  : null;

// Rate limiter: 100 general API requests per minute per IP
export const generalApiLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, '1 m'),
      analytics: true,
      prefix: 'api:general',
    })
  : null;

/**
 * Check rate limit and throw error if exceeded
 */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{ success: boolean; remaining: number; retryAfter?: number }> {
  if (!limiter) {
    // If Redis is not configured (e.g. dev mode), allow request
    return { success: true, remaining: 100 };
  }

  try {
    const { success, remaining, reset } = await limiter.limit(identifier);

    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
      return {
        success: false,
        remaining: 0,
        retryAfter,
      };
    }

    return {
      success: true,
      remaining,
    };
  } catch (error) {
    console.error('[RATE_LIMIT_ERROR]', error);
    // Fail open: allow request if Redis fails
    return { success: true, remaining: 0 };
  }
}

/**
 * Middleware function for rate limiting
 * Call at start of server action
 */
export async function enforceRateLimit(
  limiter: Ratelimit | null,
  identifier: string,
  message = 'Too many requests. Please try again later.'
) {
  const result = await checkRateLimit(limiter, identifier);

  if (!result.success) {
    throw new Error(`${message} (Retry after ${result.retryAfter} seconds)`);
  }

  return result;
}

/**
 * Get IP address from request headers
 * Works behind proxies (Cloudflare, Vercel, etc.)
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : headers.get('x-real-ip');
  return ip?.trim() || 'unknown';
}

/**
 * Get unique guest identifier (combines IP + User-Agent)
 */
export function getGuestIdentifier(headers: Headers): string {
  const ip = getClientIp(headers);
  const userAgent = headers.get('user-agent') || 'unknown';
  // Create simple hash to avoid exposing real IP
  return `guest_${Buffer.from(`${ip}:${userAgent}`).toString('base64').slice(0, 20)}`;
}
