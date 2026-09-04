import mongoose from 'mongoose';
import { Question } from '../models/Question';
import { QuizAttempt } from '../models/QuizAttempt';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://churchtechonly:Livingston@church.sn67zp8.mongodb.net/daquiz?retryWrites=true&w=majority&appName=Church';

async function setupIndexes() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected! Creating indexes...');

  // Question Indexes
  await Question.collection.createIndex({ book: 1, isActive: 1 });
  console.log('✓ Question Index: book + isActive');

  await Question.collection.createIndex({ difficulty: 1 });
  console.log('✓ Question Index: difficulty');

  await Question.collection.createIndex({ category: 1 });
  console.log('✓ Question Index: category');

  await Question.collection.createIndex({ testament: 1, isActive: 1 });
  console.log('✓ Question Index: testament + isActive');

  await Question.collection.createIndex({ createdAt: -1 });
  console.log('✓ Question Index: createdAt');

  // QuizAttempt Indexes
  await QuizAttempt.collection.createIndex({ guestIdentifier: 1, createdAt: -1 });
  console.log('✓ QuizAttempt Index: guestIdentifier + createdAt');

  await QuizAttempt.collection.createIndex({ book: 1, createdAt: -1 });
  console.log('✓ QuizAttempt Index: book + createdAt');

  await QuizAttempt.collection.createIndex({ scoreEarned: -1 });
  console.log('✓ QuizAttempt Index: scoreEarned');

  // 90-day TTL Index
  await QuizAttempt.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 7776000 });
  console.log('✓ QuizAttempt TTL Index: 90-day retention');

  console.log('All indexes created successfully!');
  await mongoose.disconnect();
}

setupIndexes().catch((err) => {
  console.error('Error creating indexes:', err);
  process.exit(1);
});
