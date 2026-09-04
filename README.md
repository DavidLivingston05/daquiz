# 📖 DaQuiz - Bilingual Bible Quiz Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2.24-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Upstash Redis](https://img.shields.io/badge/Upstash-Redis%20%26%20RateLimit-red?style=flat&logo=redis)](https://upstash.com/)

**DaQuiz** is a modern, high-performance **Bilingual (English & Tamil) Bible Quiz** web application built with **Next.js 14 (App Router)**, **MongoDB**, and **Upstash Redis**. Designed for churches, youth ministries, and scripture enthusiasts to study and test their knowledge of the Word of God interactively.

---

## ✨ Features

- 🌐 **Full Bilingual Support**: Every question, option, scripture reference, and explanation is available in both **English** and **Tamil (தமிழ்)** with real-time language toggles (Both / English / Tamil).
- 🛡️ **Server-Side Anti-Cheat Engine**: Correct answers are kept strictly on the server (`select: false`). Answers and scores are verified server-side with time-spent validation.
- ⏱️ **Interactive Quiz Experience**:
  - 30-second countdown timer per question.
  - Difficulty-weighted scoring (Easy: 100pts, Medium: 150pts, Hard: 200pts).
  - Speed bonus: Up to +50 points for answering within 15 seconds.
  - Detailed post-quiz answer reviews with biblical context and explanations.
- ⚡ **Database & Query Optimizations**:
  - Mongoose connection pooling with production keep-alive settings.
  - `.lean()` queries for 2–3x faster reads.
  - Upstash Redis query caching for high concurrency.
  - Compound indexes for sub-millisecond lookups.
  - 90-day TTL auto-retention index on guest quiz attempts.
- 🚦 **Rate Limiting & Security**:
  - Sliding window rate limiting on quiz submissions, question loading, and admin actions.
  - Security headers (CSP, XSS Protection, FrameGuard, No-Sniff) & CORS configured via Next.js Middleware.
- 🛠️ **Admin Question Portal**:
  - Dedicated portal at `/admin` protected by `ADMIN_SECRET_KEY` to publish new bilingual questions.
- 📊 **Health Check & Monitoring**:
  - `/api/health` endpoint providing live database ping latency, uptime, and collection statistics.

---

## 🏗️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose 8](https://mongoosejs.com/)
- **Caching & Rate Limiting**: [@upstash/redis](https://upstash.com/) & [@upstash/ratelimit](https://github.com/upstash/ratelimit)
- **Validation**: [Zod](https://zod.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
daquiz/
├── app/
│   ├── admin/
│   │   └── page.tsx            # Admin question authoring portal
│   ├── api/
│   │   └── health/
│   │       └── route.ts        # System & database health check
│   ├── quiz/
│   │   └── [book]/
│   │       └── page.tsx        # Interactive quiz game & review interface
│   ├── globals.css             # Global styles & Tailwind utilities
│   ├── layout.tsx              # Root layout & header navigation
│   └── page.tsx                # Main landing page (OT & NT book selector)
├── lib/
│   ├── actions/
│   │   └── quizActions.ts      # Next.js Server Actions (anti-cheat verification)
│   ├── dbOptimizations.ts      # Query layer, indexes & caching logic
│   ├── mongodb.ts              # Cached Mongoose connection pool
│   ├── rateLimit.ts            # Upstash sliding window rate limiters
│   └── validation.ts           # Zod validation schemas
├── models/
│   ├── Question.ts             # Bilingual question model
│   └── QuizAttempt.ts          # Quiz attempt & score model (90-day TTL)
├── scripts/
│   ├── createIndexes.js        # MongoDB production index generator
│   └── seed.js                 # Sample bilingual Bible quiz questions seeder
├── middleware.ts               # Security headers & CORS middleware
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── .env.local.example
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/DavidLivingston05/daquiz.git
cd daquiz
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create `.env.local` in the root directory:
```bash
cp .env.local.example .env.local
```

Fill in your configuration:
```env
# MongoDB Connection String with Connection Pooling
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/daquiz?retryWrites=true&w=majority&maxPoolSize=50&minPoolSize=10&maxIdleTimeMS=45000&serverSelectionTimeoutMS=5000&socketTimeoutMS=45000

# Upstash Redis (Optional for local development)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Admin Security Key
ADMIN_SECRET_KEY=your_secure_admin_key_here

# App Version
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 4. Seed Database & Create Indexes
```bash
# Seed initial bilingual Bible questions
npm run db:seed

# Create production compound & TTL indexes
npm run db:indexes
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts local Next.js development server on port 3000 |
| `npm run build` | Builds optimized production bundle |
| `npm start` | Starts production server |
| `npm run lint` | Runs Next.js ESLint checks |
| `npm run db:seed` | Populates database with initial questions |
| `npm run db:indexes` | Builds MongoDB indexes for questions & attempts |

---

## 🛡️ Admin Portal

Navigate to `/admin` in your browser. Enter your configured `ADMIN_SECRET_KEY` to publish new bilingual questions directly to the database.

---

## 📄 License

This project is open-source and built for educational and ministry purposes.
