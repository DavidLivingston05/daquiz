import mongoose from 'mongoose';
import { Question } from '../models/Question';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://churchtechonly:Livingston@church.sn67zp8.mongodb.net/daquiz?retryWrites=true&w=majority&appName=Church';

export const joshua1Questions = [
  // 1
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 1,
    difficulty: 'easy',
    category: 'Leadership',
    question: {
      en: 'Who was the father of Joshua?',
      ta: 'யோசுவாவின் தகப்பனார் யார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Nun', ta: 'நூன்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Caleb', ta: 'காலேப்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Hur', ta: 'ஊர்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Eleazar', ta: 'எலெயாசார்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 2
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 1,
    difficulty: 'easy',
    category: 'Leadership',
    question: {
      en: 'What was Joshua\'s role before becoming the leader of Israel?',
      ta: 'தலைவராவதற்கு முன்பு யோசுவா என்ன பணியில் இருந்தார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Moses\' assistant / minister', ta: 'மோசேயின் ஊழியக்காரன்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Priest of Israel', ta: 'இஸ்ரவேலின் ஆசாரியன்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Army commander of Pharaoh', ta: 'பார்வோனின் படைத்தலைவன்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Judge in Egypt', ta: 'எகிப்தின் நியாயாதிபதி' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 3
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 1,
    difficulty: 'medium',
    category: 'History',
    question: {
      en: 'After whose death did the Lord speak to Joshua the son of Nun?',
      ta: 'யார் மரித்தபின்பு கர்த்தர் நூனின் குமாரனாகிய யோசுவாவிடம் பேசினார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Moses', ta: 'மோசே' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Aaron', ta: 'ஆரோன்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Hur', ta: 'ஊர்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Miriam', ta: 'மிரியாம்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 4
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 2,
    difficulty: 'easy',
    category: 'Commands',
    question: {
      en: 'What title did the Lord use when referring to Moses?',
      ta: 'கர்த்தர் மோசேயைக் குறித்துப் பேசும்போது என்ன பட்டம் கொடுத்துக் குறிப்பிட்டார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'My King', ta: 'என் ராஜா' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'My prophet', ta: 'என் தீர்க்கதரிசி' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'My servant', ta: 'என் ஊழியக்காரன்' }, isCorrect: true },
      { id: 'opt_4', text: { en: 'My priest', ta: 'என் ஆசாரியன்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 5
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 2,
    difficulty: 'easy',
    category: 'Geography',
    question: {
      en: 'Which river did the Lord command Joshua and all the people to cross?',
      ta: 'யோசுவாவும் சகல ஜனங்களும் கடந்து போகும்படி கர்த்தர் கட்டளையிட்ட நதி எது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Jordan', ta: 'யோர்தான் நதி' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Nile', ta: 'நைல் நதி' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Euphrates', ta: 'ஐபிராத்து நதி' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Tigris', ta: 'இதெக்கேல் நதி' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 6
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 2,
    difficulty: 'medium',
    category: 'Commands',
    question: {
      en: 'Who was instructed to arise and go over the Jordan into the Promised Land?',
      ta: 'எழுந்து யோர்தானைக் கடந்து வாக்குத்தத்த தேசத்திற்குள் செல்லும்படி கட்டளையிடப்பட்டது யார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Only Joshua and Caleb', ta: 'யோசுவாவும் காலேபும் மட்டும்' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'Joshua and all this people', ta: 'நீயும் இந்த ஜனங்கள் எல்லாரும்' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'Only the priests and Levites', ta: 'ஆசாரியர்களும் லேவியர்களும் மட்டும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Only the army soldiers', ta: 'யுத்த வீரர்கள் மட்டும்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 7
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 3,
    difficulty: 'easy',
    category: 'Promises',
    question: {
      en: 'What did God promise to give Joshua and the people regarding the land?',
      ta: 'தேசத்தைக் குறித்து யோசுவாவுக்கும் ஜனங்களுக்கும் தேவன் கொடுத்த வாக்குத்தத்தம் என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: 'All the silver and gold of Egypt', ta: 'எகிப்தின் வெள்ளி பொன்கள் அனைத்தையும்' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'A throne in Jerusalem', ta: 'எருசலேமில் ஒரு சிங்காசனத்தை' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Every place the sole of your foot will tread upon', ta: 'உங்கள் காலடி மிதிக்கும் இடத்தையெல்லாம்' }, isCorrect: true },
      { id: 'opt_4', text: { en: 'Ten thousand chariots of iron', ta: 'பதினாயிரம் இரும்பு இரதங்களை' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 8
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 3,
    difficulty: 'medium',
    category: 'Promises',
    question: {
      en: 'Complete the divine promise: "Every place that the sole of your foot will tread upon I have given to you, just as I ______."',
      ta: 'வாக்குத்தத்த வசனத்தை நிறைவு செய்க: "நான் ______ சொன்னபடி, உங்கள் காலடி மிதிக்கும் இடத்தையெல்லாம் உங்களுக்குக் கொடுத்தேன்."',
    },
    options: [
      { id: 'opt_1', text: { en: 'promised to Moses', ta: 'மோசேக்குச் சொன்னபடி' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'commanded Aaron', ta: 'ஆரோனுக்குச் சொன்னபடி' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'swore to Jacob', ta: 'யாக்கோபுக்கு ஆணையிட்டபடி' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'revealed to Joseph', ta: 'யோசேப்புக்கு வெளிப்படுத்தினபடி' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 9
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 4,
    difficulty: 'hard',
    category: 'Geography',
    question: {
      en: 'Which great river is specifically named as the eastern boundary of the Promised Land?',
      ta: 'வாக்குத்தத்த தேசத்தின் எல்லையாகக் குறிப்பிடப்பட்டுள்ள பெரிய நதி எது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'River Tigris', ta: 'இதெக்கேல் நதி' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'River Jordan', ta: 'யோர்தான் நதி' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'River Euphrates', ta: 'ஐபிராத்து நதி' }, isCorrect: true },
      { id: 'opt_4', text: { en: 'River Kishon', ta: 'கீசோன் நதி' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 10
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 4,
    difficulty: 'hard',
    category: 'Geography',
    question: {
      en: 'Whose whole territory is specifically mentioned within the promised boundaries?',
      ta: 'சுதந்தரிக்கப்படும் எல்லைகளில் யாருடைய தேசம் முழுவதும் அடங்கியிருப்பதாகக் கூறப்பட்டது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'All the land of the Hittites', ta: 'ஏத்தியரின் தேசம் முழுவதும்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'All the land of the Philistines', ta: 'பெலிஸ்தரின் தேசம் முழுவதும்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'All the land of Moab', ta: 'மோவாபியரின் தேசம் முழுவதும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'All the land of Ammon', ta: 'அம்மோனியரின் தேசம் முழுவதும்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 11
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 4,
    difficulty: 'hard',
    category: 'Geography',
    question: {
      en: 'Which body of water toward the going down of the sun forms the western border?',
      ta: 'சூரியன் அஸ்தமிக்கிற திசையான எந்த சமுத்திரம் எல்லையாகக் கூறப்பட்டுள்ளது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The Red Sea', ta: 'செங்கடல்' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'The Great Sea (Mediterranean)', ta: 'பெரிய சமுத்திரம்' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'The Dead Sea (Salt Sea)', ta: 'உப்புக்கடல்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The Sea of Galilee', ta: 'கலிலேயா கடல்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 12
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 4,
    difficulty: 'medium',
    category: 'Geography',
    question: {
      en: 'Which mountain region is mentioned together with the wilderness in the territorial boundaries?',
      ta: 'எல்லைகளில் வனாந்தரத்தோடு கூட குறிப்பிடப்பட்ட பிரதேசம் எது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Mount Carmel', ta: 'கர்மேல் மலை' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'Mount Hermon', ta: 'எர்மோன் மலை' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Lebanon', ta: 'லீபனோன்' }, isCorrect: true },
      { id: 'opt_4', text: { en: 'Mount Sinai', ta: 'சீனாய் மலை' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 13
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 5,
    difficulty: 'easy',
    category: 'Promises',
    question: {
      en: 'What assurance of unshakeable victory did God give to Joshua?',
      ta: 'யோசுவாவுக்கு தேவன் கொடுத்த அசைக்க முடியாத வெற்றி வாக்குறுதி என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: 'No man shall be able to stand before you all the days of your life', ta: 'நீ உயிரோடிருக்கும் நாளெல்லாம் ஒருவனும் உனக்கு முன்பாக எதிர்த்து நிற்பதில்லை' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'You will never encounter any enemies', ta: 'உனக்கு எந்த சத்துருக்களும் இருக்கமாட்டார்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'All nations will surrender without fighting', ta: 'எல்லா தேசங்களும் யுத்தமின்றி சரணடையும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'You will live for five hundred years', ta: 'நீ ஐந்நூறு ஆண்டுகள் வாழ்வாய்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 14
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 5,
    difficulty: 'medium',
    category: 'Promises',
    question: {
      en: 'Complete the promise: "Just as I was with Moses, so ______."',
      ta: 'வாக்குத்தத்தத்தை நிறைவு செய்க: "நான் மோசேயோடு இருந்ததுபோல, ______."',
    },
    options: [
      { id: 'opt_1', text: { en: 'I will punish the nations', ta: 'ஜாதிகளை தண்டிப்பேன்' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'I will be with you', ta: 'உன்னோடும் இருப்பேன்' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'you shall build an altar', ta: 'நீ பலிபீடம் கட்டுவாய்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'you will lead Aaron', ta: 'நீ ஆரோனை வழிநடத்துவாய்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 15
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 5,
    difficulty: 'easy',
    category: 'Promises',
    question: {
      en: 'What powerful promise of God\'s constant presence and faithfulness was given to Joshua?',
      ta: 'யோசுவாவுக்குக் கூறப்பட்ட தேவனின் மாறாத பிரசன்னத்தின் இரட்டை வாக்குத்தத்தம் என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: 'I will give you riches and honor', ta: 'நான் உனக்கு ஐசுவரியத்தையும் கனத்தையும் தருவேன்' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'I will not leave you or forsake you', ta: 'நான் உன்னைவிட்டு விலகுவதுமில்லை, உன்னைக் கைவிடுவதுமில்லை' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'I will make your name famous', ta: 'உன் பெயரை பிரசித்திப்படுத்துவேன்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'I will build you a great city', ta: 'உனக்கு ஒரு பெரிய நகரத்தைக் கட்டுவேன்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 16
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 6,
    difficulty: 'easy',
    category: 'Commands',
    question: {
      en: 'What command did God repeatedly give to strengthen Joshua\'s spirit?',
      ta: 'யோசுவாவை திடப்படுத்த தேவன் மீண்டும் மீண்டும் அளித்த கட்டளை என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Be strong and courageous', ta: 'திடன்கொண்டு தைரியமாயிரு' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Build an altar of stone', ta: 'கற்களினால் பலிபீடம் கட்டு' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Send twelve spies immediately', ta: 'உடனே பன்னிரண்டு வேவுகாரர்களை அனுப்பு' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Fast for forty days', ta: 'நாற்பது நாட்கள் உபவாசம் இரு' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 17
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 6,
    difficulty: 'medium',
    category: 'Prophecy',
    question: {
      en: 'Why was Joshua commanded to be strong and courageous?',
      ta: 'யோசுவா திடன்கொண்டு தைரியமாயிருக்க வேண்டியதன் முக்கிய நோக்கம் என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: 'To conquer Egypt', ta: 'எகிப்தை ஜெயிக்க' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'To cause the people to inherit the promised land', ta: 'பிதாக்களுக்கு ஆணையிட்ட தேசத்தை இந்த ஜனங்கள் சுதந்தரிக்கும்படி செய்ய' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'To appoint kings over Israel', ta: 'இஸ்ரவேலின் மேல் ராஜாக்களை நியமிக்க' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'To collect gold from the nations', ta: 'ஜாதிகளிடமிருந்து பொன் வசூலிக்க' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 18
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 6,
    difficulty: 'medium',
    category: 'Covenants',
    question: {
      en: 'To whom had the Lord sworn that He would give the Promised Land?',
      ta: 'வாக்குத்தத்தம் பண்ணப்பட்ட தேசத்தைக் கொடுப்பேன் என்று கர்த்தர் யாருக்கு ஆணையிட்டிருந்தார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The elders of Midian', ta: 'மீதியானியரின் மூப்பர்களுக்கு' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'Their fathers (ancestors)', ta: 'இவர்களுடைய பிதாக்களுக்கு' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'The kings of Edom', ta: 'ஏதோமின் ராஜாக்களுக்கு' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The rulers of Babylon', ta: 'பாபிலோனின் பிரபுக்களுக்கு' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 19
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 7,
    difficulty: 'easy',
    category: 'Commands',
    question: {
      en: 'With what emphasis did God charge Joshua regarding strength and courage?',
      ta: 'தைரியத்தைக் குறித்து தேவன் எந்த அழுத்தமான வார்த்தையைச் சொன்னார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Be slightly courageous', ta: 'கொஞ்சம் தைரியமாயிரு' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'Only be strong and very courageous', ta: 'மிகவும் பலங்கொண்டு திடமனதாயிரு' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'Be anxious and cautious', ta: 'கவலையோடும் எச்சரிக்கையோடும் இரு' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Wait patiently for years', ta: 'பல வருடங்கள் பொறுமையாய் காத்திரு' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 20
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 7,
    difficulty: 'medium',
    category: 'Law',
    question: {
      en: 'What was Joshua commanded to observe carefully and obey completely?',
      ta: 'முழுமையாகக் கீழ்ப்படிந்து செய்யும்படி யோசுவாவுக்குக் கட்டளையிடப்பட்டது எது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The military advice of Egypt', ta: 'எகிப்தியரின் போர் தந்திரங்கள்' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'All the law that Moses commanded', ta: 'மோசே கட்டளையிட்ட நியாயப்பிரமாணத்தின்படியெல்லாம்' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'The traditions of Canaan', ta: 'கானானியரின் பாரம்பரியங்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'His own personal preferences', ta: 'அவனது சொந்த விருப்பங்கள்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 21
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 7,
    difficulty: 'medium',
    category: 'Law',
    question: {
      en: 'What instruction was given concerning adherence to God\'s Law?',
      ta: 'தேவனுடைய நியாயப்பிரமாணத்தைக் கைக்கொள்வதில் கொடுக்கப்பட்ட எச்சரிக்கை என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Do not turn from it to the right hand or to the left', ta: 'அதை விட்டு வலது இடதுபுறம் விலகாதிருப்பாயாக' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Do not teach it to the younger generation', ta: 'இளைய தலைமுறைக்கு இதைக் கற்பிக்காதே' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Read it only on Sabbath days', ta: 'ஓய்வுநாளில் மட்டுமே வாசி' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Change the statutes every year', ta: 'வருடந்தோறும் கட்டளைகளை மாற்று' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 22
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 7,
    difficulty: 'medium',
    category: 'Promises',
    question: {
      en: 'What is the promised blessing of not straying to the right or left from God\'s Law?',
      ta: 'தேவனுடைய பிரமாணத்தை விட்டு வலது இடதுபுறம் விலகாமல் நடப்பதினால் கிடைக்கும் ஆசீர்வாதம் என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: 'That you may avoid all battles', ta: 'எல்லா யுத்தங்களையும் தவிர்த்துவிடலாம்' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'That you may have good success wherever you go', ta: 'நீ போகும் இடமெல்லாம் புத்திமானாய் நடந்துகொள்ளும்படி' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'That no taxes will ever be paid', ta: 'வரிகள் செலுத்தவேண்டியதில்லை' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'That all nations will surrender immediately', ta: 'எல்லா ஜாதிகளும் உடனே சரணடைவர்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 23
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 8,
    difficulty: 'easy',
    category: 'Scripture',
    question: {
      en: 'Which book was never to depart from the mouth of the leader?',
      ta: 'வாயைவிட்டுப் பிரியாதிருக்க வேண்டும் என்று கட்டளையிடப்பட்ட புஸ்தகம் எது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The Book of Jasher', ta: 'யாசேரின் புஸ்தகம்' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'This Book of the Law', ta: 'இந்த நியாயப்பிரமாண புஸ்தகம்' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'The Book of the Wars of the Lord', ta: 'கர்த்தருடைய யுத்த புஸ்தகம்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The Book of Chronicles', ta: 'நாளாகம புஸ்தகம்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 24
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 8,
    difficulty: 'easy',
    category: 'Meditation',
    question: {
      en: 'How frequently was the Book of the Law to be meditated upon?',
      ta: 'நியாயப்பிரமாண புஸ்தகத்தை எப்போது தியானித்துக்கொண்டிருக்க வேண்டும்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Day and night', ta: 'இரவும் பகலும்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Only in the morning', ta: 'காலையில் மட்டும்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Once every week', ta: 'வாரத்திற்கு ஒருமுறை' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Only during times of war', ta: 'யுத்த காலங்களில் மட்டும்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 25
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 8,
    difficulty: 'medium',
    category: 'Promises',
    question: {
      en: 'What are the two assured results of meditating on and obeying God\'s Word?',
      ta: 'வேதத்தைத் தியானித்து அதன்படி கவனமாய் நடப்பதினால் உண்டாகும் இரண்டு நன்மைகள் யாவை?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Great wealth and worldly praise', ta: 'பெரிய ஐசுவரியமும் உலகப் புகழும்' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'Make your way prosperous, and have good success', ta: 'உன் வழியை வாய்க்கப்பண்ணுவாய், புத்திமானாயும் நடந்துகொள்வாய்' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'Becoming a king and living forever', ta: 'ராஜாவாதலும் சாகாமலிருத்தலும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Defeating enemies without drawing a sword', ta: 'வாள் எடுக்காமல் சத்துருவை அழித்தல்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 26
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 9,
    difficulty: 'easy',
    category: 'Commands',
    question: {
      en: 'With what rhetorical question did the Lord affirm His divine mandate?',
      ta: 'தேவன் தம்முடைய அதிகாரப்பூர்வமான கட்டளையை எந்தக் கேள்வியோடு உறுதிப்படுத்தினார்?',
    },
    options: [
      { id: 'opt_1', text: { en: '"Have I not commanded you?"', ta: '"நான் உனக்குக் கட்டளையிடவில்லையா?"' }, isCorrect: true },
      { id: 'opt_2', text: { en: '"Listen to the people"', ta: '"ஜனங்களின் சத்தத்தைக் கேள்"' }, isCorrect: false },
      { id: 'opt_3', text: { en: '"Ask of me for signs"', ta: '"என்னிடம் அடையாளங்களைக் கேள்"' }, isCorrect: false },
      { id: 'opt_4', text: { en: '"Wait until next year"', ta: '"அடுத்த வருடம் வரை காத்திரு"' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 27
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 9,
    difficulty: 'easy',
    category: 'Encouragement',
    question: {
      en: 'Which two fears were explicitly commanded against?',
      ta: 'எந்த இரண்டு காரியங்களுக்கு இடங்கொடுக்க வேண்டாம் என்று தேவன் திட்டவட்டமாகக் கட்டளையிட்டார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Do not be angry, and do not weep', ta: 'கோபப்படாதே, அழாதே' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'Do not be frightened, and do not be dismayed', ta: 'திகையாதே, கலங்காதே' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'Do not be proud, and do not boast', ta: 'பெருமைப்படாதே, மேன்மைபாராட்டாதே' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Do not doubt, and do not hesitate', ta: 'சந்தேகப்படாதே, தயங்காதே' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 28
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 9,
    difficulty: 'easy',
    category: 'Promises',
    question: {
      en: 'What is the divine ground given for not being dismayed or afraid?',
      ta: 'கலங்காமலும் திகையாமலும் இருப்பதற்கு தேவன் அருளிய வாக்குத்தத்தம் என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: 'For you have a mighty army of soldiers', ta: 'உன்னிடம் பராக்கிரமசாலிகள் நிறைந்த படை உள்ளது' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'For the walls of the cities are weak', ta: 'கானானின் பட்டண மதில் பலவீனமானது' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'For the LORD your God is with you wherever you go', ta: 'நீ போகும் இடமெல்லாம் உன் தேவனாகிய கர்த்தர் உன்னோடே இருக்கிறார்' }, isCorrect: true },
      { id: 'opt_4', text: { en: 'For Moses will pray for you from heaven', ta: 'மோசே பரலோகத்திலிருந்து உனக்காய் ஜெபிப்பார்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 29
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 10,
    difficulty: 'medium',
    category: 'Leadership',
    question: {
      en: 'Whom did Joshua immediately summon and instruct after hearing God\'s voice?',
      ta: 'தேவனுடைய சத்தத்தைக் கேட்டவுடன் யோசுவா உடனே யாரை அழைத்து கட்டளையிட்டான்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The high priest Eleazar', ta: 'பிரதான ஆசாரியனாகிய எலெயாசாரை' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'The officers / leaders of the people', ta: 'ஜனங்களின் தலைவர்களை' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'The kings of the Amorites', ta: 'எமோரியரின் ராஜாக்களை' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The foreign merchants', ta: 'அந்நிய தேசத்து வியாபாரிகளை' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 30
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 11,
    difficulty: 'medium',
    category: 'Instructions',
    question: {
      en: 'Where were the officers told to pass through to announce the proclamation?',
      ta: 'கட்டளையை அறிவிக்கும்படி தலைவர்கள் எங்கே நடந்து செல்ல வேண்டும் என்று பணிக்கப்பட்டனர்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Pass through the midst of the camp', ta: 'பாளயத்தை உருவ நடந்துபோய்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Go up to the top of Mount Nebo', ta: 'நேபோ மலையின் உச்சிக்கு ஏறி' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Stand at the bank of the Jordan', ta: 'யோர்தானின் கரையோரம் நின்று' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Surround the tabernacle', ta: 'ஆசரிப்புக் கூடாரத்தை சூழ்ந்து' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 31
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 11,
    difficulty: 'easy',
    category: 'Instructions',
    question: {
      en: 'What were the people instructed to prepare for the journey?',
      ta: 'பிரயாணத்திற்காக ஜனங்கள் தங்களுக்கு எதை ஆயத்தம் பண்ணும்படி சொல்லப்பட்டது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Gold ornaments', ta: 'பொன் ஆபரணங்களை' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'Provisions / food', ta: 'போஜனபதார்த்தங்களை' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'Chariots and horses', ta: 'இரதங்களையும் குதிரைகளையும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'New tents', ta: 'புதிய கூடாரங்களை' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 32
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 11,
    difficulty: 'easy',
    category: 'Numbers',
    question: {
      en: 'Within how many days were the Israelites scheduled to cross the Jordan?',
      ta: 'எத்தனை நாட்களுக்குள்ளே இஸ்ரவேலர் யோர்தானைக் கடந்துபோவார்கள் என்று அறிவிக்கப்பட்டது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Within seven days', ta: 'ஏழு நாளைக்குள்ளே' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'Within forty days', ta: 'நாற்பது நாளைக்குள்ளே' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Within three days', ta: 'மூன்று நாளைக்குள்ளே' }, isCorrect: true },
      { id: 'opt_4', text: { en: 'Within twelve days', ta: 'பன்னிரண்டு நாளைக்குள்ளே' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 33
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 11,
    difficulty: 'medium',
    category: 'Purpose',
    question: {
      en: 'What was the stated objective of crossing over the river Jordan?',
      ta: 'யோர்தானைக் கடந்து செல்வதன் பிரதான நோக்கம் என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: 'To take possession of the land the LORD was giving them', ta: 'கர்த்தர் கொடுக்கிற தேசத்தைச் சுதந்தரித்துக் கொள்ளும்படிக்கு' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'To build a trading market', ta: 'வியாபார சந்தை அமைப்பதற்கு' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'To escape from the desert heat', ta: 'வனாந்தர வெப்பத்திலிருந்து தப்பிக்க' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'To make peace treaties with Canaanites', ta: 'கானானியரோடு சமாதான உடன்படிக்கை செய்ய' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 34
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 12,
    difficulty: 'easy',
    category: 'Tribes',
    question: {
      en: 'Which three tribal groups received specific instructions about their armed men crossing over?',
      ta: 'தங்கள் யுத்தவீரர்கள் கடந்துபோக வேண்டும் என்று குறிப்பாகப் பணிக்கப்பட்ட மூன்று கோத்திரப் பிரிவினர் யார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Judah, Benjamin, and Levi', ta: 'யூதா, பென்யமீன், லேவி' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'Reubenites, Gadites, and half-tribe of Manasseh', ta: 'ரூபனியர், காத்தியர், மனாசேயின் பாதிக்கோத்திரத்தார்' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'Ephraim, Dan, and Asher', ta: 'எப்பிராயீம், தாண், ஆசேர்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Simeon, Issachar, and Zebulun', ta: 'சிமியோன், இசக்கார், செபுலோன்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 35
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 12,
    difficulty: 'medium',
    category: 'Tribes',
    question: {
      en: 'Which tribe had only HALF of its people settle east of the Jordan?',
      ta: 'யோர்தானுக்கு கிழக்கே எந்தக் கோத்திரத்தின் பாதிப் பகுதி மட்டும் சுதந்தரம் பெற்றது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Half-tribe of Judah', ta: 'யூதாவின் பாதிக்கோத்திரம்' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'Half-tribe of Manasseh', ta: 'மனாசேயின் பாதிக்கோத்திரம்' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'Half-tribe of Ephraim', ta: 'எப்பிராயீமின் பாதிக்கோத்திரம்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Half-tribe of Benjamin', ta: 'பென்யமீனின் பாதிக்கோத்திரம்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 36
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 13,
    difficulty: 'medium',
    category: 'Remembrance',
    question: {
      en: 'Whose previous commandment did Joshua remind the eastern tribes to remember?',
      ta: 'யாருடைய பழைய கட்டளையை நினைவுகூரும்படி யோசுவா அந்த கோத்திரத்தாரைக் கேட்டுக்கொண்டான்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Moses the servant of the LORD', ta: 'கர்த்தரின் ஊழியக்காரனாகிய மோசே' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Abraham the patriarch', ta: 'பிதாவாகிய ஆபிரகாம்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Joseph the ruler', ta: 'அதிபதியாகிய யோசேப்பு' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Aaron the priest', ta: 'ஆசாரியனாகிய ஆரோன்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 37
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 13,
    difficulty: 'medium',
    category: 'Promises',
    question: {
      en: 'What did Moses state that the LORD had provided for the eastern tribes?',
      ta: 'கர்த்தர் அந்த இரண்டரை கோத்திரத்தாருக்கு எதைக் கட்டளையிட்டு தேசத்தைக் கொடுத்தார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'A golden crown', ta: 'பொன் முடி' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'Rest (a place of rest)', ta: 'இளைப்பாறுதல்' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'Exemption from worship', ta: 'ஆராதனையிலிருந்து விலக்கு' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Perpetual rule over Egypt', ta: 'எகிப்தின் மேல் நித்திய ஆளுகை' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 38
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 14,
    difficulty: 'medium',
    category: 'Instructions',
    question: {
      en: 'Who was permitted to stay behind in the land east of the Jordan?',
      ta: 'யோர்தானுக்குக் கிழக்குப் பகுதியில் தங்கியிருக்க அனுமதிக்கப்பட்டவர்கள் யார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Wives, little ones (children), and livestock', ta: 'மனைவிகள், பிள்ளைகள், மிருகஜீவன்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'All soldiers and generals', ta: 'எல்லா படைத்தலைவர்களும் வீரர்களும்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The tribal leaders only', ta: 'கோத்திர தலைவர்கள் மட்டும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The priests carrying the Ark', ta: 'பெட்டியோடு ஆசாரியர்கள்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 39
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 14,
    difficulty: 'medium',
    category: 'Instructions',
    question: {
      en: 'How were the fighting men of the 2.5 tribes commanded to march before their brethren?',
      ta: 'இரண்டரை கோத்திரத்து யுத்தவீரர்கள் எவ்வாறு தங்கள் சகோதரருக்கு முன்பாகச் செல்ல வேண்டும்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Unarmed and following at the very rear', ta: 'ஆயுதங்களின்றி மிக பின்னாக நடந்து' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'Armed and arrayed before their brothers', ta: 'அணிஅணியாய் உங்கள் சகோதரருக்கு முன்பாக' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'Disguised in foreign clothes', ta: 'அந்நிய உடை தரித்து' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Singing without weapons', ta: 'ஆயுதங்களின்றி பாட்டுப் பாடிக்கொண்டு' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 40
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 14,
    difficulty: 'easy',
    category: 'Purpose',
    question: {
      en: 'What was the primary purpose of the armed men crossing over ahead of Israel?',
      ta: 'முன்னதாக யோர்தானைக் கடந்துசெல்லும் யுத்தவீரர்களின் பிரதான நோக்கம் என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: 'To conquer additional land for themselves', ta: 'தங்களுக்கு நிலம் கைப்பற்ற' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'To spy out Egypt', ta: 'எகிப்தை வேவுபார்க்க' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'To help their brothers', ta: 'தங்கள் சகோதரருக்கு உதவிசெய்ய' }, isCorrect: true },
      { id: 'opt_4', text: { en: 'To build defensive walls around Jordan', ta: 'யோர்தானைச் சுற்றி மதில் கட்ட' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 41
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 15,
    difficulty: 'medium',
    category: 'Instructions',
    question: {
      en: 'Until when were the eastern tribes obligated to battle alongside their brothers?',
      ta: 'எதுவரை அந்த இரண்டரை கோத்திரத்தார் தங்கள் சகோதரரோடு போரிட்டு உதவி செய்ய வேண்டும்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Until the LORD gives rest to their brothers and they possess their land', ta: 'கர்த்தர் அவர்கள் சகோதரருக்கும் இளைப்பாறுதல் அளித்து, அவர்களும் தேசத்தைச் சுதந்தரிக்கும் வரை' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Until the end of the first year only', ta: 'முதல் வருட முடிவு வரை மட்டும்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Until Jericho alone is captured', ta: 'எரிகோ பட்டணம் பிடிபடும் வரை மட்டும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Until they capture 100 chariots', ta: '100 இரதங்களைக் கைப்பற்றும் வரை' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 42
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 15,
    difficulty: 'medium',
    category: 'Geography',
    question: {
      en: 'Where was the permanent inheritance of the 2.5 tribes situated relative to the Jordan?',
      ta: 'இரண்டரை கோத்திரத்தாரின் சுதந்தரம் யோர்தானின் எந்தத் திசையில் அமைந்திருந்தது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Toward the sunset (West)', ta: 'சூரியன் அஸ்தமிக்கும் திசை (மேற்கு)' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'Toward the sunrise (East)', ta: 'சூரியன் உதிக்கும் திசை (கிழக்கு)' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'Far North in Lebanon', ta: 'வடக்கு லீபனோன்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Deep South in Sinai', ta: 'தெற்கு சீனாய்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 43
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 16,
    difficulty: 'easy',
    category: 'Obedience',
    question: {
      en: 'What wholehearted pledge of obedience did the people make to Joshua?',
      ta: 'ஜனங்கள் யோசுவாவுக்கு அளித்த முழுமனதான கீழ்ப்படிதலின் வாக்குறுதி என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: '"All that you have commanded us we will do, and wherever you send us we will go"', ta: '"நீர் எங்களுக்குக் கட்டளையிடுகிறதையெல்லாம் செய்வோம், நீர் எங்களை அனுப்பும் இடமெல்லாம் போவோம்"' }, isCorrect: true },
      { id: 'opt_2', text: { en: '"We will only go if you pay us gold"', ta: '"பொன் கொடுத்தால் மட்டுமே போவோம்"' }, isCorrect: false },
      { id: 'opt_3', text: { en: '"Let us choose another leader first"', ta: '"வேறொரு தலைவனை முதலில் தேர்ந்தெடுப்போம்"' }, isCorrect: false },
      { id: 'opt_4', text: { en: '"We refuse to cross the river Jordan"', ta: '"நாங்கள் யோர்தானைக் கடக்க மாட்டோம்"' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 44
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 17,
    difficulty: 'easy',
    category: 'Obedience',
    question: {
      en: 'Whose obedience did the people cite as the standard for how they would obey Joshua?',
      ta: 'யோசுவாவுக்குக் கீழ்ப்படிவதை ஜனங்கள் யாருக்குக் கீழ்ப்படிந்ததோடு ஒப்பிட்டுக் கூறினார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Just as we obeyed Aaron', ta: 'ஆரோனுக்கு செவிகொடுத்ததுபோல' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'Just as we obeyed Pharaoh', ta: 'பார்வோனுக்கு செவிகொடுத்ததுபோல' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Just as we obeyed Moses in all things', ta: 'நாங்கள் மோசேக்கு எல்லாக் காரியத்திலும் செவிகொடுத்ததுபோல' }, isCorrect: true },
      { id: 'opt_4', text: { en: 'Just as we obeyed the elders in Egypt', ta: 'எகிப்தின் மூப்பர்களுக்கு செவிகொடுத்ததுபோல' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 45
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 17,
    difficulty: 'medium',
    category: 'Prayer',
    question: {
      en: 'What prayer and blessing did the people speak over Joshua\'s leadership?',
      ta: 'யோசுவாவின் தலைமைத்துவத்திற்காக ஜனங்கள் வேண்டிய ஆசீர்வாத ஜெபம் என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: '"May you live longer than Moses"', ta: '"மோசேயை விட அதிக காலம் வாழ்வீராக"' }, isCorrect: false },
      { id: 'opt_2', text: { en: '"Only may the LORD your God be with you, as He was with Moses!"', ta: '"உம்முடைய தேவனாகிய கர்த்தர் மாத்திரம் மோசேயோடு இருந்ததுபோல, உம்மோடும் இருப்பாராக!"' }, isCorrect: true },
      { id: 'opt_3', text: { en: '"May all Canaanites bow before your feet"', ta: '"கானானியர் எல்லாம் உம் காலில் விழுவார்களாக"' }, isCorrect: false },
      { id: 'opt_4', text: { en: '"May you never suffer in battle"', ta: '"யுத்தத்தில் உமக்கு எந்த துன்பமும் வராதிருக்கட்டும்"' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 46
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 18,
    difficulty: 'medium',
    category: 'Discipline',
    question: {
      en: 'What penalty was declared for anyone who rebelled against the leader\'s command?',
      ta: 'தலைவனின் கட்டளைக்கு விரோதமாய்ச் செயல்பட்டு கீழ்ப்படியாதவனுக்கு என்ன தண்டனை விதிக்கப்பட்டது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'He shall pay forty shekels of silver', ta: 'நாற்பது வெள்ளி சேக்கல் அபராதம் செலுத்தவேண்டும்' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'He shall be put to death', ta: 'அவன் கொலைசெய்யப்படக்கடவன்' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'He shall be exiled to Egypt', ta: 'எகிப்திற்கு நாடு கடத்தப்படவேண்டும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'He shall fast for one week', ta: 'ஒரு வாரம் உபவாசிக்க வேண்டும்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 47
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 18,
    difficulty: 'easy',
    category: 'Encouragement',
    question: {
      en: 'What final words of encouragement did the congregation speak to Joshua?',
      ta: 'ஜனங்கள் யோசுவாவை நோக்கி கூறிய இறுதி ஊக்கமளிக்கும் வார்த்தை என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: '"Do not leave us alone"', ta: '"எங்களை தனியே விட்டுவிடாதிரும்"' }, isCorrect: false },
      { id: 'opt_2', text: { en: '"Rest today and fight tomorrow"', ta: '"இன்று ஓய்வெடுத்து நாளை யுத்தம் செய்வோம்"' }, isCorrect: false },
      { id: 'opt_3', text: { en: '"Give us our portion now"', ta: '"எங்கள் பங்கை இப்போதே தாரும்"' }, isCorrect: false },
      { id: 'opt_4', text: { en: '"Only be strong and courageous"', ta: '"திடன்கொண்டு தைரியமாயிரும்"' }, isCorrect: true },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 48
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 1,
    difficulty: 'hard',
    category: 'Context',
    question: {
      en: 'Who was the supreme authority commissioning Joshua to lead Israel across the Jordan?',
      ta: 'இஸ்ரவேலை வழிநடத்தி யோர்தானைக் கடக்கும்படி யோசுவாவுக்குக் கட்டளையிட்ட உன்னத அதிகாரி யார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The High Priest', ta: 'பிரதான ஆசாரியன்' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'The LORD (Yahweh)', ta: 'கர்த்தர் (யேகோவா)' }, isCorrect: true },
      { id: 'opt_3', text: { en: 'The assembly of elders', ta: 'மூப்பர்களின் சபை' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The commander of the Egyptian army', ta: 'எகிப்திய சேனையின் அதிபதி' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 49
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 8,
    difficulty: 'hard',
    category: 'Scripture',
    question: {
      en: 'What specific attitude toward God\'s written word guarantees true prosperity and success?',
      ta: 'மெய்யான செழிப்பையும் நல்வெற்றியையும் உத்தரவாதப்படுத்தும் செயல் எது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Memorizing without doing', ta: 'செய்யாமல் மனப்பாடம் மட்டும் செய்வது' }, isCorrect: false },
      { id: 'opt_2', text: { en: 'Keeping the scroll locked in a box', ta: 'புஸ்தகத்தை பெட்டிக்குள் பூட்டி வைப்பது' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Being careful to do according to all that is written in it', ta: 'இதில் எழுதியிருக்கிறவைகளின்படியெல்லாம் செய்யக் கவனமாயிருப்பது' }, isCorrect: true },
      { id: 'opt_4', text: { en: 'Adding new rules every month', ta: 'மாதந்தோறும் புதிய சட்டங்களை சேர்ப்பது' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 50
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 1,
    verse: 7,
    difficulty: 'hard',
    category: 'Leadership',
    question: {
      en: 'How many times in the opening commissioning does the phrase "be strong and courageous" (or very courageous) appear?',
      ta: 'யோசுவாவின் நியமன நிகழ்வில் தேவனும் ஜனங்களும் சேர்த்து "திடன்கொண்டு தைரியமாயிரு / பலங்கொள்" என்று எத்தனை முறை வலியுறுத்துகிறார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: '1 time only', ta: '1 முறை மட்டும்' }, isCorrect: false },
      { id: 'opt_2', text: { en: '4 times', ta: '4 முறை' }, isCorrect: true },
      { id: 'opt_3', text: { en: '7 times', ta: '7 முறை' }, isCorrect: false },
      { id: 'opt_4', text: { en: '10 times', ta: '10 முறை' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
];

async function runSeed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    const deleteRes = await Question.deleteMany({ book: 'Joshua', chapter: 1 });
    console.log(`Cleared previous Joshua 1 questions: ${deleteRes.deletedCount}`);

    let insertedCount = 0;
    for (const q of joshua1Questions) {
      await Question.create(q);
      insertedCount++;
    }

    console.log(`Successfully updated and inserted ${insertedCount} clean questions for OT - Joshua Chapter 1!`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

runSeed();
