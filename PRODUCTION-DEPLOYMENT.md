# daquiz Production Deployment Guide

**Status:** Ready for Production  
**Last Updated:** September 4, 2026  
**Estimated Setup Time:** 4-6 hours

---

## 📋 Prerequisites Checklist

Before deploying to production:

- [ ] MongoDB cluster created and credentials ready
- [ ] GitHub repository initialized
- [ ] Vercel account created
- [ ] Upstash Redis account created
- [ ] Custom domain registered and configured
- [ ] SSL certificate ready (auto-handled by Vercel)
- [ ] Admin secret key generated

---

## 🚀 Step 1: Setup External Services

### 1.1 Upstash Redis (Rate Limiting & Caching)

1. Go to https://console.upstash.com
2. Click "Create Database"
3. Select "Redis" as type
4. Choose "Global" region for lowest latency
5. Click "Create"
6. Copy the REST URL and REST Token
7. Add to `.env.local`:
   ```env
   UPSTASH_REDIS_REST_URL=https://...
   UPSTASH_REDIS_REST_TOKEN=...
   ```

**Cost:** $0-25/month depending on usage  
**Alternative:** AWS ElastiCache if you prefer AWS

---

## 🔧 Step 2: Prepare Application Files

### 2.1 Copy New Files to Your Project

Create these files in your Next.js project:

```bash
# Copy middleware
cp middleware.ts ./

# Copy library optimizations
cp lib/validation.ts ./lib/
cp lib/rateLimit.ts ./lib/
cp lib/dbOptimizations.ts ./lib/

# Copy optimized quiz actions
cp lib/actions/quizActionsOptimized.ts ./lib/actions/quizActions.ts

# Copy health check endpoint
mkdir -p app/api/health
cp app/api/health/route.ts ./app/api/health/

# Copy environment template
cp .env.local.example ./
```

### 2.2 Install Additional Dependencies

```bash
npm install zod @upstash/ratelimit @upstash/redis
```

### 2.3 Update package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:seed": "node scripts/seed.js",
    "db:indexes": "node scripts/createIndexes.js"
  }
}
```

---

## 🗄️ Step 3: Database Setup

### 3.1 Verify MongoDB Connection

```bash
# Test connection with proper pool settings
npm run dev

# Visit http://localhost:3000/api/health to verify
```

### 3.2 Create Database Indexes

```typescript
// scripts/createIndexes.js
import { ensureProductionIndexes } from '../lib/dbOptimizations';

async function main() {
  console.log('Creating production indexes...');
  await ensureProductionIndexes();
  console.log('✓ Indexes created successfully');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
```

Run before deployment:
```bash
npm run db:indexes
```

### 3.3 Seed Initial Data (Optional)

```bash
# If using the provided seed endpoint
curl http://localhost:3000/api/seed
```

---

## 🌐 Step 4: Deploy to Vercel

### 4.1 Push to GitHub

```bash
git add .
git commit -m "feat: production-ready daquiz with optimizations"
git push origin main
```

### 4.2 Connect to Vercel

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select "Next.js" framework
5. Click "Deploy"

### 4.3 Configure Environment Variables in Vercel

1. Go to project settings → Environment Variables
2. Add each variable from `.env.local.example`:

```
MONGODB_URI = mongodb+srv://...
UPSTASH_REDIS_REST_URL = https://...
UPSTASH_REDIS_REST_TOKEN = ...
ADMIN_SECRET_KEY = (generate random: openssl rand -base64 32)
ALLOWED_ORIGINS = https://yourdomain.com
```

**Do NOT commit `.env.local` to git!** Vercel loads from settings only.

### 4.4 Deploy

After adding environment variables, Vercel will auto-redeploy.

Monitor deployment at https://vercel.com/your-project

---

## 🔒 Step 5: Security Configuration

### 5.1 Set Strong Admin Key

```bash
# Generate secure random key
openssl rand -base64 32
```

Store this in Vercel environment variables as `ADMIN_SECRET_KEY`

### 5.2 Configure CORS

Update `middleware.ts` with your domain:

```typescript
const allowedOrigins = [
  'https://daquiz.yourdomain.com',
  'https://www.daquiz.yourdomain.com',
];
```

### 5.3 MongoDB User Permissions

In MongoDB Atlas:

1. Go to Database Users
2. Create user with limited permissions:
   - Only access `daquiz` database
   - Only read/write access needed
   - Rotate password every 90 days

### 5.4 Enable HTTPS Only

In Vercel settings:
- Domains & DNS → Enable "Enforce HTTPS"
- Security → Enable all recommended security headers

---

## 📊 Step 6: Monitoring & Analytics

### 6.1 Setup Health Monitoring

Use Uptime Robot or similar service:

```
URL: https://yourdomain.com/api/health
Interval: 5 minutes
Expected: 200 status code
```

### 6.2 Configure Error Tracking (Recommended)

**Option A: Sentry**
```env
SENTRY_DSN=https://key@sentry.io/project
```

**Option B: Vercel Analytics** (Built-in)
- Enable in Vercel dashboard
- View at https://vercel.com/projects/your-project/analytics

### 6.3 Database Monitoring

MongoDB Atlas built-in tools:
1. Go to Atlas → Clusters → Monitoring
2. Set alerts for:
   - Connection pool usage > 80%
   - Query latency > 1000ms
   - Network in/out spikes

---

## 🧪 Step 7: Pre-Launch Testing

### 7.1 Smoke Tests

```bash
# Test health endpoint
curl https://yourdomain.com/api/health

# Test quiz loading
curl https://yourdomain.com/api/quiz?book=Matthew

# Check performance
curl -I https://yourdomain.com
```

### 7.2 Load Testing

Use Apache JMeter or k6:

```javascript
// k6 script
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 0 },
  ],
};

export default function () {
  let response = http.get('https://yourdomain.com/api/health');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
}
```

Run: `k6 run load-test.js`

### 7.3 Security Testing

```bash
# Check for common vulnerabilities
npm audit

# OWASP headers check
curl -I https://yourdomain.com | grep -E "X-Frame|X-Content|CSP"
```

---

## 🚨 Step 8: Post-Deployment

### 8.1 Monitor First 24 Hours

Key metrics to watch:
- Error rate (should be < 0.1%)
- Response time (p95 < 500ms)
- Database connection pool utilization
- Cache hit rate (target > 80%)

**Dashboard:** Vercel Analytics + MongoDB Atlas Monitoring

### 8.2 Setup Alerts

Configure Vercel to alert on:
- Build failures
- Deployment errors
- Unhandled exceptions

### 8.3 Backup Strategy

Enable MongoDB Atlas automatic backups:
1. Clusters → Backup → Enable
2. Set retention to 7 days
3. Test restore procedure monthly

### 8.4 Capacity Planning

Monitor and plan for growth:

| Users | Recommendations |
|-------|-----------------|
| 1-100 | Current setup |
| 100-1K | Add Redis cluster, increase DB pool |
| 1K-10K | Consider database sharding |
| 10K+ | Multi-region deployment |

---

## 📝 Maintenance Checklist

### Daily
- [ ] Check error logs in Sentry/Vercel
- [ ] Monitor response times

### Weekly
- [ ] Review database performance
- [ ] Check security alerts
- [ ] Test backup restoration

### Monthly
- [ ] Rotate admin credentials
- [ ] Review and optimize slow queries
- [ ] Security audit
- [ ] Update dependencies: `npm update`

### Quarterly
- [ ] Full security assessment
- [ ] Capacity planning review
- [ ] Disaster recovery drill

---

## 🆘 Troubleshooting

### Problem: High Database Latency

**Diagnosis:**
```bash
# Check connection pool status
curl https://yourdomain.com/api/health
```

**Solution:**
1. Increase `maxPoolSize` in MongoDB URI
2. Check if queries need indexing
3. Review slow query logs in MongoDB Atlas

### Problem: Rate Limiting Too Strict

**Adjustment:**
```typescript
// lib/rateLimit.ts
export const quizSubmissionLimiter = new Ratelimit({
  limiter: Ratelimit.slidingWindow(10, '1 h'), // Increased from 5
});
```

### Problem: Cache Invalidation Issues

**Manual cache clear:**
```bash
# Connect to Upstash Redis console and run:
KEYS quiz:questions:*
DEL [list of keys]
```

---

## 📞 Support & Resources

- **Documentation:** https://daquiz.yourdomain.com/docs
- **Status Page:** https://status.yourdomain.com
- **Issues:** Check GitHub Discussions
- **Email:** support@yourdomain.com

---

## 🎉 You're Live!

Congratulations! daquiz is now running on production infrastructure.

**Next Steps:**
1. Share with users
2. Collect feedback
3. Monitor metrics
4. Iterate on improvements

**Thank you for using daquiz!** 🙏
