import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuestionOption {
  id: string;
  text: {
    en: string;
    ta: string;
  };
  isCorrect?: boolean;
}

export interface IQuestion extends Document {
  testament: 'OT' | 'NT';
  book: string;
  chapter?: number;
  verse?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
  question: {
    en: string;
    ta: string;
  };
  options: IQuestionOption[];
  explanation?: {
    en: string;
    ta: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionOptionSchema = new Schema<IQuestionOption>(
  {
    id: { type: String, required: true },
    text: {
      en: { type: String, required: true },
      ta: { type: String, required: true },
    },
    isCorrect: {
      type: Boolean,
      required: true,
      select: false, // Hidden by default from queries for client safety
    },
  },
  { _id: false }
);

const QuestionSchema = new Schema<IQuestion>(
  {
    testament: {
      type: String,
      enum: ['OT', 'NT'],
      required: true,
      index: true,
    },
    book: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    chapter: {
      type: Number,
      default: 1,
    },
    verse: {
      type: Number,
      default: 1,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
      index: true,
    },
    category: {
      type: String,
      default: '',
      index: true,
    },
    question: {
      en: { type: String, required: true },
      ta: { type: String, required: true },
    },
    options: {
      type: [QuestionOptionSchema],
      required: true,
      validate: [
        (val: IQuestionOption[]) => val.length >= 2 && val.length <= 4,
        'Options must be between 2 and 4',
      ],
    },
    explanation: {
      en: { type: String, default: '' },
      ta: { type: String, default: '' },
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for optimized quiz session fetching
QuestionSchema.index({ book: 1, isActive: 1 });
QuestionSchema.index({ testament: 1, isActive: 1 });

export const Question: Model<IQuestion> =
  mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);

export default Question;
