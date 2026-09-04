import { NextRequest, NextResponse } from 'next/server';
import { checkDatabaseHealth, getDatabaseStats } from '@/lib/dbOptimizations';

/**
 * Health Check Endpoint
 * GET /api/health
 */
export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();

    // Check database health
    const dbHealth = await checkDatabaseHealth();
    const dbStats = dbHealth.status === 'healthy' ? await getDatabaseStats() : null;

    const uptime = process.uptime();
    const totalTime = Date.now() - startTime;

    const response = {
      status: dbHealth.status === 'healthy' ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`,
      checks: {
        database: dbHealth,
        cache: { status: 'ok' },
        api: { status: 'ok', responseTime: `${totalTime}ms` },
      },
      stats: dbStats
        ? {
            questions: dbStats.totalQuestions,
            active: dbStats.activeQuestions,
            byDifficulty: dbStats.byDifficulty,
          }
        : null,
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    };

    return NextResponse.json(response, {
      status: dbHealth.status === 'healthy' ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('[HEALTH_CHECK_ERROR]', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message,
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function HEAD(request: NextRequest) {
  try {
    const health = await checkDatabaseHealth();
    return new NextResponse(null, { status: health.status === 'healthy' ? 200 : 503 });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}
