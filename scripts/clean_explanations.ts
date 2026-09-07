import mongoose from 'mongoose';
import { Question } from '../models/Question';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://churchtechonly:Livingston@church.sn67zp8.mongodb.net/daquiz?retryWrites=true&w=majority&appName=Church';

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB.');

  const res = await Question.updateMany(
    {},
    {
      $set: {
        'explanation.en': '',
        'explanation.ta': '',
      },
    }
  );

  console.log(`Successfully cleared references/explanations for ${res.modifiedCount} questions!`);
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
