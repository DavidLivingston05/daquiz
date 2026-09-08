import mongoose from 'mongoose';
import * as fs from 'fs';

let uri = process.env.MONGODB_URI;
if (!uri && fs.existsSync('.env.local')) {
  const envLocal = fs.readFileSync('.env.local', 'utf-8');
  const match = envLocal.match(/MONGODB_URI=(.*)/);
  if (match) uri = match[1].trim().replace(/^['"]|['"]$/g, '');
}
if (!uri) {
  uri = 'mongodb+srv://churchtechonly:Livingston@church.sn67zp8.mongodb.net/daquiz?retryWrites=true&w=majority&appName=Church';
}

async function run() {
  await mongoose.connect(uri!);
  const Question = mongoose.models.Question || mongoose.model('Question', new mongoose.Schema({}, { strict: false }));
  const results = await Question.aggregate([
    { $match: { book: 'Joshua' } },
    { $group: { _id: '$chapter', count: { $sum: 1 }, active: { $sum: { $cond: ['$isActive', 1, 0] } } } },
    { $sort: { _id: 1 } }
  ]);
  console.log('Joshua Chapter Question Counts:\n', JSON.stringify(results, null, 2));

  const allBooks = await Question.aggregate([
    { $group: { _id: { book: '$book', chapter: '$chapter' }, count: { $sum: 1 }, active: { $sum: { $cond: ['$isActive', 1, 0] } } } },
    { $sort: { '_id.book': 1, '_id.chapter': 1 } }
  ]);
  console.log('All Chapters in DB:\n', JSON.stringify(allBooks, null, 2));

  await mongoose.disconnect();
}
run();
