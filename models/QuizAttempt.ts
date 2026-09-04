import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAttemptAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface IQuizAttempt extends Document {
  userPhone?: string;
  userName?: string;
  guestIdentifier?: string;
  quizType: string;
  mode: 'competition' | 'practice' | 'book';
  book: string;
  totalQuestions: number;
  correctAnswers: number;
  scoreEarned: number;
  timeTakenSeconds: number;
  answers: IAttemptAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

const AttemptAnswerSchema = new Schema<IAttemptAnswer>(
  {
    questionId: { type: String, required: true },
    selectedOptionId: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    timeSpentSeconds: { type: Number, required: true },
  },
  { _id: false }
);

const QuizAttemptSchema = new Schema<IQuizAttempt>(
  {
    userPhone: {
      type: String,
      index: true,
      trim: true,
    },
    userName: {
      type: String,
      trim: true,
    },
    guestIdentifier: {
      type: String,
      index: true,
      trim: true,
    },
    quizType: {
      type: String,
      default: 'book',
      index: true,
    },
    mode: {
      type: String,
      enum: ['competition', 'practice', 'book'],
      default: 'competition',
      index: true,
    },
    book: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctAnswers: {
      type: Number,
      required: true,
    },
    scoreEarned: {
      type: Number,
      required: true,
    },
    timeTakenSeconds: {
      type: Number,
      required: true,
    },
    answers: {
      type: [AttemptAnswerSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for analytics and leaderboards
QuizAttemptSchema.index({ userPhone: 1, createdAt: -1 });
QuizAttemptSchema.index({ book: 1, createdAt: -1 });
QuizAttemptSchema.index({ scoreEarned: -1 });

// TTL index: auto-delete attempts older than 90 days (7,776,000 seconds)
QuizAttemptSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 });

export const QuizAttempt: Model<IQuizAttempt> =
  mongoose.models.QuizAttempt || mongoose.model<IQuizAttempt>('QuizAttempt', QuizAttemptSchema);

export default QuizAttempt;
