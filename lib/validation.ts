import { z } from 'zod';

/**
 * Validation schemas for daquiz
 * Ensures all user input is safe and correctly formatted
 */

// MongoDB ObjectId validation
const ObjectIdSchema = z.string().regex(/^[0-9a-f]{24}$/i, 'Invalid MongoDB ID');

// Quiz session validation
export const QuizSessionSchema = z.object({
  book: z.string().min(1).max(50, 'Book name too long').trim(),
  count: z.number().int().min(1).max(200).default(50),
});

// Quiz answer validation
export const AnswerSchema = z.object({
  questionId: ObjectIdSchema,
  selectedOptionId: z.string().min(1).max(20),
  timeSpent: z.number().int().min(0).max(60, 'Time per question cannot exceed 60 seconds'),
});

// Quiz submission validation
export const QuizSubmissionSchema = z.object({
  guestIdentifier: z
    .string()
    .min(1, 'Guest ID required')
    .max(100, 'Guest ID too long')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Invalid guest ID format'),
  book: z.string().min(1).max(50),
  totalTime: z.number().int().min(1).max(10800, 'Quiz took too long (max 3 hours)'),
  answers: z
    .array(AnswerSchema)
    .min(1, 'At least one answer required')
    .max(200, 'Too many answers (max 200)'),
});

// Question creation validation
export const QuestionCreationSchema = z.object({
  testament: z.enum(['OT', 'NT']),
  book: z.string().min(1).max(50),
  chapter: z.number().int().min(1).max(999),
  verse: z.number().int().min(1).max(999).optional().default(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  category: z.string().min(1).max(100),
  question_en: z.string().min(5).max(500),
  question_ta: z.string().min(5).max(500),
  options: z
    .array(
      z.object({
        text_en: z.string().min(1).max(200),
        text_ta: z.string().min(1).max(200),
      })
    )
    .min(2)
    .max(4, 'Options must be between 2 and 4'),
  correctOptionIndex: z.number().int().min(0).max(3),
  explanation_en: z.string().max(500).optional().default(''),
  explanation_ta: z.string().max(500).optional().default(''),
});

// Type exports for TypeScript
export type QuizSubmission = z.infer<typeof QuizSubmissionSchema>;
export type Answer = z.infer<typeof AnswerSchema>;
export type QuestionCreation = z.infer<typeof QuestionCreationSchema>;

/**
 * Safe validation wrapper
 * Returns parsed data or throws formatted error
 */
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ');
      throw new Error(`Validation failed: ${messages}`);
    }
    throw error;
  }
}
