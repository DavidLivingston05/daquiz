const mongoose = require('mongoose');

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://churchtechonly:Livingston@church.sn67zp8.mongodb.net/daquiz?retryWrites=true&w=majority&appName=Church';

const QuestionOptionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    text: {
      en: { type: String, required: true },
      ta: { type: String, required: true },
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

const QuestionSchema = new mongoose.Schema(
  {
    testament: { type: String, enum: ['OT', 'NT'], required: true },
    book: { type: String, required: true, trim: true },
    chapter: { type: Number, default: 1 },
    verse: { type: Number, default: 1 },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    category: { type: String, default: 'General' },
    question: {
      en: { type: String, required: true },
      ta: { type: String, required: true },
    },
    options: [QuestionOptionSchema],
    explanation: {
      en: { type: String, default: '' },
      ta: { type: String, default: '' },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

const sampleQuestions = [
  // Genesis (OT)
  {
    testament: 'OT',
    book: 'Genesis',
    chapter: 1,
    verse: 1,
    difficulty: 'easy',
    category: 'Creation',
    question: {
      en: 'In the beginning, what did God create?',
      ta: 'ஆதியிலே தேவன் எவைகளைச் சிருஷ்டித்தார்?',
    },
    options: [
      {
        id: 'opt_1',
        text: { en: 'The heavens and the earth', ta: 'வானத்தையும் பூமியையும்' },
        isCorrect: true,
      },
      {
        id: 'opt_2',
        text: { en: 'The sun and the moon', ta: 'சூரியனையும் சந்திரனையும்' },
        isCorrect: false,
      },
      {
        id: 'opt_3',
        text: { en: 'Man and woman', ta: 'ஆணையும் பெண்ணையும்' },
        isCorrect: false,
      },
      {
        id: 'opt_4',
        text: { en: 'The angels and stars', ta: 'தூதர்களையும் நட்சத்திரங்களையும்' },
        isCorrect: false,
      },
    ],
    explanation: {
      en: 'Genesis 1:1 declares: "In the beginning God created the heavens and the earth."',
      ta: 'ஆதியாகமம் 1:1 - "ஆதியிலே தேவன் வானத்தையும் பூமியையும் சிருஷ்டித்தார்."',
    },
    isActive: true,
  },
  {
    testament: 'OT',
    book: 'Genesis',
    chapter: 6,
    verse: 9,
    difficulty: 'medium',
    category: 'Patriarchs',
    question: {
      en: 'Who built the ark to save his family from the flood?',
      ta: 'பெருவெள்ளத்திலிருந்து தன் குடும்பத்தைக் காப்பாற்ற பேழையைக் கட்டியவர் யார்?',
    },
    options: [
      {
        id: 'opt_1',
        text: { en: 'Noah', ta: 'நோவா' },
        isCorrect: true,
      },
      {
        id: 'opt_2',
        text: { en: 'Abraham', ta: 'ஆபிரகாம்' },
        isCorrect: false,
      },
      {
        id: 'opt_3',
        text: { en: 'Moses', ta: 'மோசே' },
        isCorrect: false,
      },
      {
        id: 'opt_4',
        text: { en: 'Enoch', ta: 'ஏனோக்கு' },
        isCorrect: false,
      },
    ],
    explanation: {
      en: 'Noah was righteous in his generation and obeyed God to build the ark.',
      ta: 'நோவா தன் காலத்தாரில் நீதிமானாயிருந்து தேவ கட்டளைப்படி பேழையைச் செய்தார்.',
    },
    isActive: true,
  },
  // Matthew (NT)
  {
    testament: 'NT',
    book: 'Matthew',
    chapter: 5,
    verse: 3,
    difficulty: 'easy',
    category: 'Beatitudes',
    question: {
      en: 'According to Matthew 5:3, who are blessed?',
      ta: 'மத்தேயு 5:3-ன் படி, பாக்கியவான்கள் யார்?',
    },
    options: [
      {
        id: 'opt_1',
        text: { en: 'The poor in spirit', ta: 'ஆவியில் எளிமையுள்ளவர்கள்' },
        isCorrect: true,
      },
      {
        id: 'opt_2',
        text: { en: 'The rich in wealth', ta: 'ஐசுவரியமுள்ளவர்கள்' },
        isCorrect: false,
      },
      {
        id: 'opt_3',
        text: { en: 'The mighty rulers', ta: 'பராக்கிரமசாலிகள்' },
        isCorrect: false,
      },
      {
        id: 'opt_4',
        text: { en: 'The physically strong', ta: 'சரீர பெலமுள்ளவர்கள்' },
        isCorrect: false,
      },
    ],
    explanation: {
      en: 'Matthew 5:3: "Blessed are the poor in spirit, for theirs is the kingdom of heaven."',
      ta: 'மத்தேயு 5:3 - "ஆவியில் எளிமையுள்ளவர்கள் பாக்கியவான்கள்; பரலோகராஜ்யம் அவர்களுடையது."',
    },
    isActive: true,
  },
  // John (NT)
  {
    testament: 'NT',
    book: 'John',
    chapter: 3,
    verse: 16,
    difficulty: 'easy',
    category: 'Gospel',
    question: {
      en: 'For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have what?',
      ta: 'தேவன், தம்முடைய ஒரேபேறான குமாரனை விசுவாசிக்கிறவன் எவனோ அவன் கெட்டுப்போகாமல் எதைப் பெறும்படிக்கு, அவரைத் தந்தருளினார்?',
    },
    options: [
      {
        id: 'opt_1',
        text: { en: 'Eternal life', ta: 'நித்திய ஜீவன்' },
        isCorrect: true,
      },
      {
        id: 'opt_2',
        text: { en: 'Earthly kingdom', ta: 'பூலோக ராஜ்ஜியம்' },
        isCorrect: false,
      },
      {
        id: 'opt_3',
        text: { en: 'Worldly riches', ta: 'உலக ஐசுவரியம்' },
        isCorrect: false,
      },
      {
        id: 'opt_4',
        text: { en: 'Earthly fame', ta: 'மனுஷ புகழ்ச்சி' },
        isCorrect: false,
      },
    ],
    explanation: {
      en: 'John 3:16 guarantees everlasting life through faith in Jesus Christ.',
      ta: 'யோவான் 3:16 - இயேசு கிறிஸ்துவின் மூலமாய் நித்திய ஜீவன் அருளப்படுகிறது.',
    },
    isActive: true,
  },
  // Psalms (OT)
  {
    testament: 'OT',
    book: 'Psalms',
    chapter: 23,
    verse: 1,
    difficulty: 'easy',
    category: 'Praise',
    question: {
      en: 'Complete the verse: "The Lord is my shepherd; ______."',
      ta: 'வசனத்தை நிறைவு செய்க: "கர்த்தர் என் மேய்ப்பராயிருக்கிறார்; ______."',
    },
    options: [
      {
        id: 'opt_1',
        text: { en: 'I shall not want', ta: 'நான் தாழ்ச்சியடையேன்' },
        isCorrect: true,
      },
      {
        id: 'opt_2',
        text: { en: 'I will fear no evil', ta: 'நான் பயப்படேன்' },
        isCorrect: false,
      },
      {
        id: 'opt_3',
        text: { en: 'I will rejoice', ta: 'நான் சந்தோஷிப்பேன்' },
        isCorrect: false,
      },
      {
        id: 'opt_4',
        text: { en: 'He will protect me', ta: 'அவர் என்னை காப்பார்' },
        isCorrect: false,
      },
    ],
    explanation: {
      en: 'Psalm 23:1 is David\'s famous declaration of complete trust in God.',
      ta: 'சங்கீதம் 23:1 - தாவீதின் விசுவாச அறிக்கை.',
    },
    isActive: true,
  },
  // Romans (NT)
  {
    testament: 'NT',
    book: 'Romans',
    chapter: 8,
    verse: 28,
    difficulty: 'medium',
    category: 'Epistle',
    question: {
      en: 'And we know that in all things God works for the good of those who ______.',
      ta: 'அன்றியும், அவருடைய தீர்மானத்தின்படி அழைக்கப்பட்டவர்களாய் தேவனிடத்தில் ______ சகலமும் நன்மைக்கு ஏதுவாக நடக்கிறது என்று அறிந்திருக்கிறோம்.',
    },
    options: [
      {
        id: 'opt_1',
        text: { en: 'Love Him', ta: 'அன்புகூருகிறவர்களுக்கு' },
        isCorrect: true,
      },
      {
        id: 'opt_2',
        text: { en: 'Work hard', ta: 'கடினமாக உழைப்பவர்களுக்கு' },
        isCorrect: false,
      },
      {
        id: 'opt_3',
        text: { en: 'Are wealthy', ta: 'ஐசுவரியவான்களுக்கு' },
        isCorrect: false,
      },
      {
        id: 'opt_4',
        text: { en: 'Seek power', ta: 'அதிகாரம் தேடுபவர்களுக்கு' },
        isCorrect: false,
      },
    ],
    explanation: {
      en: 'Romans 8:28 promises that God works all things together for good to those who love Him.',
      ta: 'ரோமர் 8:28 - தேவனிடத்தில் அன்புகூருகிறவர்களுக்கு சகலமும் நன்மைக்கு ஏதுவாக நடக்கிறது.',
    },
    isActive: true,
  },
];

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected! Seeding initial questions...');

  for (const q of sampleQuestions) {
    const existing = await Question.findOne({
      book: q.book,
      chapter: q.chapter,
      verse: q.verse,
      'question.en': q.question.en,
    });

    if (!existing) {
      await Question.create(q);
      console.log(`✓ Inserted: ${q.book} ${q.chapter}:${q.verse}`);
    } else {
      console.log(`- Already exists: ${q.book} ${q.chapter}:${q.verse}`);
    }
  }

  console.log('Seeding complete!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
