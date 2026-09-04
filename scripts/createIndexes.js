const mongoose = require('mongoose');

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://churchtechonly:Livingston@church.sn67zp8.mongodb.net/daquiz?retryWrites=true&w=majority&appName=Church';

async function setupIndexes() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected! Creating production indexes...');

  const db = mongoose.connection.db;

  // Question Indexes
  await db.collection('questions').createIndex({ book: 1, isActive: 1 });
  console.log('✓ Question Index: book + isActive');

  await db.collection('questions').createIndex({ difficulty: 1 });
  console.log('✓ Question Index: difficulty');

  await db.collection('questions').createIndex({ category: 1 });
  console.log('✓ Question Index: category');

  await db.collection('questions').createIndex({ testament: 1, isActive: 1 });
  console.log('✓ Question Index: testament + isActive');

  await db.collection('questions').createIndex({ createdAt: -1 });
  console.log('✓ Question Index: createdAt');

  // QuizAttempt Indexes
  await db.collection('quizattempts').createIndex({ guestIdentifier: 1, createdAt: -1 });
  console.log('✓ QuizAttempt Index: guestIdentifier + createdAt');

  await db.collection('quizattempts').createIndex({ book: 1, createdAt: -1 });
  console.log('✓ QuizAttempt Index: book + createdAt');

  await db.collection('quizattempts').createIndex({ scoreEarned: -1 });
  console.log('✓ QuizAttempt Index: scoreEarned');

  // 90-day TTL retention
  await db.collection('quizattempts').createIndex({ createdAt: 1 }, { expireAfterSeconds: 7776000 });
  console.log('✓ QuizAttempt TTL Index: 90-day retention');

  console.log('All indexes created successfully!');
  await mongoose.disconnect();
}

setupIndexes().catch((err) => {
  console.error('Error creating indexes:', err);
  process.exit(1);
});
