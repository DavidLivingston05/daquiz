import mongoose from 'mongoose';
import * as fs from 'fs';
import { Question } from '../models/Question';

let uri = process.env.MONGODB_URI;
if (!uri && fs.existsSync('.env.local')) {
  const envLocal = fs.readFileSync('.env.local', 'utf-8');
  const match = envLocal.match(/MONGODB_URI=(.*)/);
  if (match) uri = match[1].trim().replace(/^['"]|['"]$/g, '');
}
if (!uri) {
  uri = 'mongodb+srv://churchtechonly:Livingston@church.sn67zp8.mongodb.net/daquiz?retryWrites=true&w=majority&appName=Church';
}

export const joshua3Questions = [
  // 1
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 1,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'From where did Joshua and all the children of Israel set out early in the morning?',
      ta: 'யோசுவாவும் இஸ்ரவேல் புத்திரர் அனைவரும் அதிகாலமே எங்கிருந்து புறப்பட்டார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Acacia Grove / Shittim', ta: 'சித்தீம்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Gilgal', ta: 'கில்கால்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Jericho', ta: 'எரிகோ' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Mount Sinai', ta: 'சீனாய் மலை' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 2
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 1,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'To which river did Joshua and the Israelites come after departing from Shittim?',
      ta: 'சித்தீமிலிருந்து புறப்பட்ட யோசுவாவும் இஸ்ரவேலரும் எந்த நதிக்கு வந்து சேர்ந்தார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Jordan River', ta: 'யோர்தான் நதி' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Nile River', ta: 'நைல் நதி' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Euphrates River', ta: 'யூப்ரடீஸ் நதி' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Tigris River', ta: 'டைகிரிஸ் நதி' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 3
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 1,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What did the Israelites do at the Jordan before they crossed over?',
      ta: 'இஸ்ரவேலர் யோர்தானைக் கடந்துபோகும் முன்னே அங்கே என்ன செய்தார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Lodged / Camped there', ta: 'அங்கே தங்கித் தரித்தார்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Built a wall', ta: 'மதில் கட்டினார்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Fought a battle', ta: 'யுத்தம் செய்தார்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Turned back to Egypt', ta: 'எகிப்திற்குத் திரும்பினார்கள்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 4
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 1,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'At what time of day did Joshua rise to lead the people from Shittim to Jordan?',
      ta: 'சித்தீமிலிருந்து யோர்தானுக்குப் புறப்பட யோசுவா எந்த நேரத்தில் எழுந்தார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Early in the morning', ta: 'அதிகாலமே' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'At noon', ta: 'நண்பகலில்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'In the evening', ta: 'மாலையில்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'At midnight', ta: 'நடுஇரவில்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 5
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 2,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'After how many days did the officers pass through the camp?',
      ta: 'எத்தனை நாட்களுக்குப் பின்பு அதிபதிகள் பாளையத்தின் நடுவே நடந்துபோனார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: '3 days', ta: '3 நாட்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: '7 days', ta: '7 நாட்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: '40 days', ta: '40 நாட்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: '1 day', ta: '1 நாள்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 6
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 2,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Who went throughout the camp after three days to give instructions to the people?',
      ta: 'மூன்று நாட்களுக்குப் பின்பு பாளையத்தின் நடுவே நடந்துபோய் ஜனங்களுக்குக் கட்டளையிட்டவர்கள் யார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The officers', ta: 'அதிபதிகள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The spies', ta: 'வேவுகாரர்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The kings of Canaan', ta: 'கானானிய ராஜாக்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The elders of Moab', ta: 'மோவாபின் மூப்பர்கள்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 7
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 3,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What sacred object were the people commanded to look for and follow when it moved?',
      ta: 'எந்தப் பரிசுத்தப் பொருளைச் சுமந்துகொண்டு போகும்போது அதைப் பார்த்துப் பின்செல்லும்படி ஜனங்களுக்குக் கட்டளையிடப்பட்டது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The Ark of the Covenant', ta: 'உடன்படிக்கைப் பெட்டி' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The Golden Altar', ta: 'பொற்பீடம்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The Golden Lampstand', ta: 'பொன் குத்துவிளக்கு' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The Bronze Serpent', ta: 'வெண்கல சர்ப்பம்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 8
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 3,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'Who were designated to carry the Ark of the Covenant of the Lord?',
      ta: 'கர்த்தருடைய உடன்படிக்கைப் பெட்டியைச் சுமக்க நியமிக்கப்பட்டவர்கள் யார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The priests, the Levites', ta: 'லேவியராகிய ஆசாரியர்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The tribe of Judah', ta: 'யூதா கோத்திரத்தார்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The soldiers', ta: 'போர்வீரர்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The elders of Israel', ta: 'இஸ்ரவேலின் மூப்பர்கள்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 9
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 3,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What were the people instructed to do when they saw the Ark of the Covenant moving?',
      ta: 'ஆசாரியர்கள் உடன்படிக்கைப் பெட்டியைச் சுமந்துகொண்டு போவதைக் காணும்போது ஜனங்கள் என்ன செய்ய வேண்டும்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Set out from their place and follow it', ta: 'தங்கள் இடத்தைவிட்டுப் புறப்பட்டு, அதற்குப் பின்செல்ல வேண்டும்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Run ahead of it', ta: 'அதற்கு முன்பாக ஓட வேண்டும்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Stay inside their tents', ta: 'தங்கள் கூடாரங்களுக்குள் இருக்க வேண்டும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Offer burnt sacrifices immediately', ta: 'உடனே சர்வாங்க தகனபலிகளை இட வேண்டும்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 10
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 4,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What distance was to be kept between the people and the Ark of the Covenant?',
      ta: 'ஜனங்களுக்கும் உடன்படிக்கைப் பெட்டிக்கும் நடுவே எவ்வளவு தூரம் இடைவெளி இருக்க வேண்டும்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'About 2,000 cubits', ta: 'ஏறக்குறைய 2,000 முழம்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'About 500 cubits', ta: 'ஏறக்குறைய 500 முழம்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'About 100 cubits', ta: 'ஏறக்குறைய 100 முழம்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'About 5,000 cubits', ta: 'ஏறக்குறைய 5,000 முழம்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 11
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 4,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Why were the people instructed to keep a distance and not come near the Ark?',
      ta: 'ஜனங்கள் பெட்டிக்குச் சமீபமாய் வராமல் இடைவெளி விட்டுப் பின்செல்ல வேண்டியதன் நோக்கம் என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: 'That they may know the way by which they must go', ta: 'தாங்கள் போகவேண்டிய வழியை அறியும்படிக்கு' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Because the Ark was too heavy', ta: 'பெட்டி மிகவும் பாரமாக இருந்ததால்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'To hide it from enemy eyes', ta: 'சத்துருக்களின் கண்களுக்கு மறைக்க' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'So the priests could walk faster', ta: 'ஆசாரியர்கள் வேகமாக நடக்க' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 12
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 4,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What explanation was given for why the people needed to follow the Ark to know the way?',
      ta: 'ஜனங்கள் வழியை அறிய பெட்டியைப் பின்பற்ற வேண்டும் என்பதற்கு என்ன காரணம் கூறப்பட்டது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'For you have not passed this way before', ta: 'இதற்குமுன்னே நீங்கள் இந்த வழியாய் நடந்துபோகவில்லை' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Because the desert was full of traps', ta: 'வனாந்தரம் கண்ணிகளால் நிறைந்திருந்ததால்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Because Moses had lost the map', ta: 'மோசே வரைபடத்தை தொலைத்துவிட்டதால்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Because night was approaching', ta: 'இரவு நேரம் நெருங்கி வந்ததால்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 13
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 5,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What did Joshua command the people to do before the Lord worked miracles among them?',
      ta: 'கர்த்தர் அற்புதங்களைச் செய்வதற்கு முன்பாக ஜனங்கள் தங்களுக்கு என்ன செய்ய வேண்டும் என்று யோசுவா கட்டளையிட்டார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Sanctify yourselves', ta: 'உங்களைப் பரிசுத்தம் பண்ணிக்கொள்ளுங்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Arm yourselves with swords', ta: 'பட்டயங்களை எடுத்துக்கொள்ளுங்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Fast for forty days', ta: 'நாற்பது நாள் உபவாசியுங்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Build wooden boats', ta: 'மரப் படகுகளை உருவாக்குங்கள்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 14
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 5,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'Why did Joshua tell the people to sanctify themselves?',
      ta: 'ஜனங்கள் தங்களைப் பரிசுத்தம் பண்ணிக்கொள்ள வேண்டும் என்று யோசுவா கூறியதன் காரணம் என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: 'For tomorrow the LORD will do wonders among you', ta: 'நாளைக்குக் கர்த்தர் உங்கள் நடுவிலே அற்புதங்களைச் செய்வார்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'To prepare for a royal banquet', ta: 'ராஜ விருந்துக்கு ஆயத்தமாக' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Because enemies were attacking that night', ta: 'அன்றிரவு எதிரிகள் தாக்குவார்கள் என்பதால்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'To choose a new king', ta: 'புதிய ராஜாவைத் தேர்ந்தெடுக்க' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 15
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 5,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'When did Joshua declare that the Lord would do wonders among Israel?',
      ta: 'கர்த்தர் எப்போது இஸ்ரவேலின் நடுவில் அற்புதங்களைச் செய்வார் என்று யோசுவா கூறினார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Tomorrow', ta: 'நாளைக்கு' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Next year', ta: 'அடுத்த வருடம்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'In three months', ta: 'மூன்று மாதங்களில்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'After seven days', ta: 'ஏழு நாட்களுக்குப் பின்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 16
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 6,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What did Joshua command the priests to take up and carry before the people?',
      ta: 'ஜனங்களுக்கு முன்பாக எதை எடுத்துக்கொண்டு நடக்கும்படி ஆசாரியர்களுக்கு யோசுவா கட்டளையிட்டார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The Ark of the Covenant', ta: 'உடன்படிக்கைப் பெட்டி' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The Silver Trumpets', ta: 'வெள்ளி பூரிகைகள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The Staff of Moses', ta: 'மோசேயின் கோல்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The Table of Showbread', ta: 'சமூக அப்ப மேஜை' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 17
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 6,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Where did the priests carrying the Ark of the Covenant walk in relation to the people?',
      ta: 'உடன்படிக்கைப் பெட்டியைச் சுமந்த ஆசாரியர்கள் ஜனங்களுக்கு எங்கே நடந்துபோனார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Before the people', ta: 'ஜனங்களுக்கு முன்னே' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Behind the people', ta: 'ஜனங்களுக்குப் பின்னே' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'In the middle of the camp', ta: 'பாளையத்தின் நடுவில்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'On the sides of the hills', ta: 'மலைகளின் பக்கங்களில்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 18
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 7,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What did the LORD promise to do for Joshua on that day in the sight of all Israel?',
      ta: 'அந்நாளில் இஸ்ரவேலர் எல்லாருடைய கண்களுக்கு முன்பாகவும் யோசுவாவுக்கு என்ன செய்வதாக கர்த்தர் கூறினார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Begin to exalt / magnify him', ta: 'மேன்மைப்படுத்தத் தொடங்குவேன்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Give him gold and silver', ta: 'பொன்னையும் வெள்ளியையும் கொடுப்பேன்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Build him a grand palace', ta: 'பெரிய அரண்மனை கட்டித் தருவேன்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Crown him king of Egypt', ta: 'எகிப்தின் ராஜாவாக முடிசூட்டுவேன்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 19
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 7,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What would Israel know when the Lord exalted Joshua?',
      ta: 'கர்த்தர் யோசுவாவை மேன்மைப்படுத்தும்போது இஸ்ரவேலர் என்ன அறிந்துகொள்வார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'That as He was with Moses, so He would be with Joshua', ta: 'நான் மோசேயோடே இருந்ததுபோல, உன்னோடும் இருப்பேன் என்பதை' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'That Joshua was the greatest warrior', ta: 'யோசுவா மிகச் சிறந்த போர்வீரன் என்பதை' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'That Moses had made a mistake', ta: 'மோசே தவறு செய்தார் என்பதை' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'That the journey would end in one day', ta: 'பயணம் ஒரே நாளில் முடியும் என்பதை' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 20
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 7,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'Whom did the Lord mention saying, "As I was with ___, so I will be with you"?',
      ta: '"நான் ___ உடனே இருந்ததுபோல, உன்னோடும் இருப்பேன்" என்று கர்த்தர் யாரைக் குறிப்பிட்டுச் சொன்னார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Moses', ta: 'மோசே' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Abraham', ta: 'ஆபிரகாம்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Jacob', ta: 'யாக்கோபு' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Joseph', ta: 'யோசேப்பு' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 21
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 8,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Where were the priests bearing the Ark told to stand when they reached the edge of the Jordan waters?',
      ta: 'யோர்தான் தண்ணீரின் கரையோரத்திற்கு வரும்போது உடன்படிக்கைப் பெட்டியைச் சுமக்கிற ஆசாரியர்கள் எங்கே நிற்க வேண்டும்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Stand still in the brink / edge of the water', ta: 'யோர்தானின் கரையோரத்திலே நில்லுங்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Swim to the opposite side', ta: 'மறுகரைக்கு நீந்திச் செல்லுங்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Turn around back to camp', ta: 'திரும்பிப் பாளையத்திற்குச் செல்லுங்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Pitch tents in the water', ta: 'தண்ணீரிலே கூடாரம் போடுங்கள்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 22
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 8,
    difficulty: 'hard',
    category: '',
    question: {
      en: 'Whom was Joshua commanded by God to instruct regarding standing at the brink of the Jordan?',
      ta: 'யோர்தானின் கரையோரத்திலே நிற்கும்படி எவர்களுக்குக் கட்டளையிடுமாறு யோசுவாவுக்குக் கூறப்பட்டது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The priests who bear the Ark of the Covenant', ta: 'உடன்படிக்கைப் பெட்டியைச் சுமக்கிற ஆசாரியர்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The captains of the army', ta: 'சேனாதிபதிகள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The seventy elders', ta: 'எழுபது மூப்பர்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The tribe of Reuben', ta: 'ரூபன் கோத்திரத்தார்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 23
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 9,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What did Joshua invite the children of Israel to come and hear?',
      ta: 'இஸ்ரவேல் புத்திரரே, இங்கே சேர்ந்து எதைக் கேளுங்கள் என்று யோசுவா கூறினார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The words of the LORD your God', ta: 'உங்கள் தேவனாகிய கர்த்தரின் வார்த்தைகள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The battle plans for Jericho', ta: 'எரிகோவின் யுத்தத் திட்டங்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The laws of the Egyptians', ta: 'எகிப்தியர்களின் சட்டங்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The report of the spies', ta: 'வேவுகாரரின் அறிக்கை' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 24
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 10,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'How did Joshua describe God when telling Israel that God was among them?',
      ta: 'தேவன் தங்கள் நடுவில் இருக்கிறார் என்பதை உறுதிப்படுத்த யோசுவா அவரை எவ்வாறு குறிப்பிட்டார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The living God', ta: 'ஜீவனுள்ள தேவன்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The God of the mountains', ta: 'மலைகளின் தேவன்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The God of the valleys', ta: 'பள்ளத்தாக்குகளின் தேவன்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The silent God', ta: 'மவுனமான தேவன்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 25
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 10,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What did Joshua say the living God would without fail do regarding the inhabitants of the land?',
      ta: 'ஜீவனுள்ள தேவன் தேசத்துக் குடிகளுக்கு முன்பாக நிச்சயமாக என்ன செய்வார் என்று யோசுவா கூறினார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Drive them out from before you', ta: 'அவர்களை உங்களுக்கு முன்பாகத் துரத்திவிடுவார்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Make a covenant of peace with them', ta: 'அவர்களுடன் சமாதான உடன்படிக்கை செய்வார்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Adopt their religious customs', ta: 'அவர்களின் வழிபாட்டு முறைகளை ஏற்பார்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Pay tribute money to them', ta: 'அவர்களுக்குக் கப்பம் கட்டுவார்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 26
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 10,
    difficulty: 'hard',
    category: '',
    question: {
      en: 'How many distinct nations did Joshua list that God would drive out before Israel in Joshua 3:10?',
      ta: 'யோசுவா 3:10-ல் தேவன் துரத்திவிடுவார் என்று யோசுவா குறிப்பிட்ட ஜாதிகள் எத்தனை?',
    },
    options: [
      { id: 'opt_1', text: { en: '7 nations', ta: '7 ஜாதிகள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: '10 nations', ta: '10 ஜாதிகள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: '3 nations', ta: '3 ஜாதிகள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: '12 nations', ta: '12 ஜாதிகள்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 27
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 10,
    difficulty: 'hard',
    category: '',
    question: {
      en: 'Which of the following is NOT one of the seven nations mentioned in Joshua 3:10?',
      ta: 'யோசுவா 3:10-ல் குறிப்பிடப்பட்ட ஏழு ஜாதிகளில் இடம்பெறாதது எது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Philistines', ta: 'பெலிஸ்தியர்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Canaanites', ta: 'கானானியர்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Hittites', ta: 'ஏத்தியர்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Jebusites', ta: 'எபூசியர்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 28
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 10,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Which group among the seven nations is explicitly listed alongside the Girgashites and Amorites in Joshua 3:10?',
      ta: 'யோசுவா 3:10-ல் கிர்காசியர் மற்றும் எமோரியருடன் குறிப்பிடப்பட்டுள்ள மற்றொரு ஜாதி எது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Perizzites', ta: 'பெரிசியர்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Midianites', ta: 'மீதியானியர்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Amalekites', ta: 'அமலேக்கியர்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Edomites', ta: 'ஏதோமியர்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 29
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 11,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'How is the Ark described in Joshua 3:11 as it crosses before Israel into the Jordan?',
      ta: 'யோசுவா 3:11-ல் யோர்தானுக்குள் கடந்துபோகும் பெட்டி எவ்வாறு விவரிக்கப்பட்டுள்ளது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The Ark of the Covenant of the Lord of all the earth', ta: 'சர்வபூமிக்கும் ஆண்டவராயிருக்கிறவருடைய உடன்படிக்கைப் பெட்டி' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The Ark of the Temple', ta: 'தேவாலயத்தின் பெட்டி' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The Ark of the Wilderness', ta: 'வனாந்தரத்தின் பெட்டி' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The Ark of the Soldiers', ta: 'போர்வீரரின் பெட்டி' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 30
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 11,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'According to Joshua 3:11, the Lord is the Lord of what domain?',
      ta: 'யோசுவா 3:11-ன்படி, கர்த்தர் எதற்கு ஆண்டவராயிருக்கிறார் என்று கூறப்படுகிறது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'All the earth', ta: 'சர்வபூமிக்கும்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Only the Jordan River', ta: 'யோர்தான் நதிக்கு மட்டும்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Only the wilderness', ta: 'வனாந்தரத்திற்கு மட்டும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Only Egypt', ta: 'எகிப்திற்கு மட்டும்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 31
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 12,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'How many men from the tribes of Israel were to be chosen according to Joshua 3:12?',
      ta: 'யோசுவா 3:12-ன்படி இஸ்ரவேல் கோத்திரங்களிலிருந்து எத்தனை மனுஷரைத் தெரிந்துகொள்ள வேண்டும்?',
    },
    options: [
      { id: 'opt_1', text: { en: '12 men', ta: '12 மனுஷர்' }, isCorrect: true },
      { id: 'opt_2', text: { en: '70 men', ta: '70 மனுஷர்' }, isCorrect: false },
      { id: 'opt_3', text: { en: '2 men', ta: '2 மனுஷர்' }, isCorrect: false },
      { id: 'opt_4', text: { en: '24 men', ta: '24 மனுஷர்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 32
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 12,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'How many men were to be selected from each individual tribe of Israel?',
      ta: 'ஒவ்வொரு இஸ்ரவேல் கோத்திரத்திலிருந்தும் எத்தனை மனுஷர் தெரிந்துகொள்ளப்பட வேண்டும்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'One man from each tribe', ta: 'ஒவ்வொரு கோத்திரத்திற்கு ஒவ்வொரு மனுஷன்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Two men from each tribe', ta: 'ஒவ்வொரு கோத்திரத்திற்கு இரண்டு மனுஷர்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Ten men from each tribe', ta: 'ஒவ்வொரு கோத்திரத்திற்கு பத்து மனுஷர்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'All firstborns from each tribe', ta: 'ஒவ்வொரு கோத்திரத்தின் அனைத்து தலைச்சன் பிள்ளைகளும்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 33
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 13,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What specific action of the priests would trigger the cutting off of the Jordan waters?',
      ta: 'ஆசாரியர்களின் எந்தச் செயலால் யோர்தானின் தண்ணீர் அறுப்புண்டுபோகும் என்று கூறப்பட்டது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The soles of their feet resting in the waters of Jordan', ta: 'அவர்களின் உள்ளங்கால்கள் யோர்தானின் தண்ணீரிலே படும்போது' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Striking the water with a rod', ta: 'தண்ணீரை கோலினால் அடிக்கும்போது' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Blowing silver trumpets', ta: 'வெள்ளி எக்காளங்களை ஊதும்போது' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Shouting with a loud voice', ta: 'மகா சத்தமாய் ஆர்ப்பரிக்கும்போது' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 34
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 13,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What would happen to the waters flowing down from above when the priests stepped into the Jordan?',
      ta: 'ஆசாரியர்களின் கால்கள் யோர்தானில் பட்டவுடன் மேலேயிருந்து ஓடிவருகிற தண்ணீருக்கு என்ன நேரிடும்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'They shall stand in a heap', ta: 'ஒரு குவியலாக நிற்கும்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'They would boil with steam', ta: 'ஆவியாகி கொதிக்கும்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'They would turn to blood', ta: 'இரத்தமாக மாறும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'They would freeze into ice blocks', ta: 'பனிக்கட்டியாக உறையும்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 35
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 13,
    difficulty: 'hard',
    category: '',
    question: {
      en: 'Whose Ark were the priests bearing when their feet touched the Jordan?',
      ta: 'ஆசாரியர்களின் கால்கள் யோர்தானில் படும்போது அவர்கள் யாருடைய பெட்டியைச் சுமந்திருந்தார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The Ark of the LORD, the Lord of all the earth', ta: 'சர்வபூமிக்கும் ஆண்டவராகிய கர்த்தரின் பெட்டி' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The chest of Moses', ta: 'மோசேயின் பெட்டி' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The treasure chest of Egypt', ta: 'எகிப்தின் பொக்கிஷப் பெட்டி' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The vessel of Aaron', ta: 'ஆரோனின் பாத்திரம்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 36
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 14,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'From where did the people break camp / set out to pass over the Jordan?',
      ta: 'ஜனங்கள் யோர்தானைக் கடந்துபோக எங்கிருந்து புறப்பட்டார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'From their tents', ta: 'தங்கள் கூடாரங்களை விட்டு' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'From the city of Jericho', ta: 'எரிகோ பட்டணத்திலிருந்து' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'From the caves of Moab', ta: 'மோவாபின் குகைகளிலிருந்து' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'From Mount Nebo', ta: 'நேபோ மலையிலிருந்து' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 37
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 14,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Who went before the people as they set out from their tents to cross the Jordan?',
      ta: 'ஜனங்கள் கூடாரங்களை விட்டுப் புறப்பட்டபோது அவர்களுக்கு முன்னே சென்றவர்கள் யார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The priests bearing the Ark of the Covenant', ta: 'உடன்படிக்கைப் பெட்டியைச் சுமந்த ஆசாரியர்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The warriors of Reuben and Gad', ta: 'ரூபன் மற்றும் காத் கோத்திரத்தின் போர்வீரர்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Joshua alone on horseback', ta: 'குதிரை மேல் ஏறிய யோசுவா மட்டும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The women and children', ta: 'பெண்களும் குழந்தைகளும்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 38
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 15,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What did the Jordan River typically do all throughout the days of harvest?',
      ta: 'அறுப்புக்காலம் முழுவதும் யோர்தான் நதி எவ்விதமாயிருந்தது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Overflowed all its banks', ta: 'தன் கரைகளெல்லாம் புரண்டுபோகும்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Completely dried up naturally', ta: 'இயற்கையாகவே முற்றிலும் வற்றிப்போகும்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Became shallow and frozen', ta: 'குறைந்து உறைந்துபோகும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Stopped flowing on weekends', ta: 'வார இறுதியில் ஓடாமல் நிற்கும்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 39
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 15,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'During which agricultural season did the crossing of the Jordan take place?',
      ta: 'யோர்தானைக் கடக்கும் இந்த நிகழ்வு எந்த விவசாய காலத்தில் நடந்தது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Harvest time', ta: 'அறுப்புக்காலம்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Sowing time', ta: 'விதைப்புக்காலம்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Drought season', ta: 'பஞ்ச காலம்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Winter season', ta: 'குளிர்காலம்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 40
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 15,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What part of the priests who bore the Ark dipped into the edge of the water?',
      ta: 'பெட்டியைச் சுமந்த ஆசாரியர்களின் எந்தப் பகுதி தண்ணீரின் ஓரத்திலே தோய்ந்தது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The feet of the priests', ta: 'ஆசாரியர்களின் கால்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The hem of their garments', ta: 'அவர்களின் வஸ்திரத்தின் தொங்கல்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The base of the Ark', ta: 'பெட்டியின் அடிப்பகுதி' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Their hands', ta: 'அவர்களின் கைகள்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 41
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 16,
    difficulty: 'hard',
    category: '',
    question: {
      en: 'At which city far away did the upstream waters rise and stand in a heap?',
      ta: 'மேலேயிருந்து ஓடிவந்த தண்ணீர் மிகவும் தூரத்திலுள்ள எந்தப் பட்டணத்தின் அருகே குவியலாக எழும்பி நின்றது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Adam', ta: 'ஆதாம்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Bethel', ta: 'பெத்தேல்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Hebron', ta: 'எபிரோன்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Shechem', ta: 'சீகேம்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 42
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 16,
    difficulty: 'hard',
    category: '',
    question: {
      en: 'The city of Adam, where the waters rose up, was located beside which place?',
      ta: 'தண்ணீர் குவியலாக நின்ற ஆதாம் பட்டணம் எதற்குப் பக்கத்தில் இருந்தது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Zaretan / Zarethan', ta: 'சாரெத்தான்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Damascus', ta: 'தமஸ்கு' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Gaza', ta: 'காசா' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Tyre', ta: 'தீரு' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 43
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 16,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Into which sea were the waters flowing down that failed and were completely cut off?',
      ta: 'முற்றிலும் அறுப்புண்டுபோன கீழ்நோக்கி ஓடும் தண்ணீர் எந்தக் கடலுக்குப் பாய்ந்து கொண்டிருந்தது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The Sea of the Arabah / Salt Sea', ta: 'உப்புக்கடலாகிய சமபூமியின் கடல்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The Red Sea', ta: 'செங்கடல்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The Mediterranean Sea', ta: 'மத்திய தரைக்கடல்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The Sea of Galilee', ta: 'கலிலேயா கடல்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 44
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 16,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'Opposite which prominent city did the people cross over the Jordan River?',
      ta: 'ஜனங்கள் எந்தப் பட்டணத்திற்கு எதிரே யோர்தானைக் கடந்துபோனார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Jericho', ta: 'எரிகோ' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Jerusalem', ta: 'எருசலேம்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Ai', ta: 'ஆய்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Gibeon', ta: 'கிபியோன்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 45
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 17,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'Where did the priests bearing the Ark of the Covenant stand firm while Israel crossed?',
      ta: 'இஸ்ரவேலர் யோர்தானைக் கடக்கும்போது உடன்படிக்கைப் பெட்டியைச் சுமந்த ஆசாரியர்கள் எங்கே உறுதியாக நின்றார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'On dry ground in the midst of the Jordan', ta: 'யோர்தானின் நடுவிலே தண்ணீரில்லாத உலர்ந்த தரையில்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'On top of a hill', ta: 'ஒரு மலையின் மேல்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Inside their tents', ta: 'தங்கள் கூடாரங்களுக்குள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'At the bank in Shittim', ta: 'சித்தீமின் கரையில்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 46
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 17,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'On what type of ground did all the Israelites cross over the Jordan?',
      ta: 'எவ்விதமான தரையின் மேல் சகல இஸ்ரவேலரும் யோர்தானைக் கடந்துபோனார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Dry ground', ta: 'உலர்ந்த தரை' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Deep muddy ground', ta: 'ஆழமான சேற்றுத் தரை' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'A floating wooden bridge', ta: 'மிதக்கும் மரப்பாலம்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Thick ice sheets', ta: 'தடித்த பனிப்பாறை' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 47
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 17,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'How much of the nation of Israel crossed over Jordan on dry ground?',
      ta: 'இஸ்ரவேல் ஜனங்களில் எத்தனை பேர் யோர்தானை உலர்ந்த தரை வழியாய்க் கடந்தார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'All Israel / the entire nation', ta: 'சகல இஸ்ரவேலரும் / சகல ஜனங்களும்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Only the leaders and soldiers', ta: 'தலைவர்களும் போர்வீரர்களும் மட்டும்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Only the tribe of Levi', ta: 'லேவி கோத்திரத்தார் மட்டும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Only half of the tribes', ta: 'பாதி கோத்திரத்தார் மட்டும்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 48
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 17,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Until what point did the priests bearing the Ark remain standing in the middle of Jordan?',
      ta: 'ஆசாரியர்கள் யோர்தானின் நடுவிலே எதுவரைக்கும் உறுதியாய் நின்றார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Until all the people had completely finished crossing', ta: 'சகல ஜனங்களும் யோர்தானைக் கடந்து தீருமளவும்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Until the sun went down', ta: 'சூரியன் அஸ்தமிக்கும் வரை' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'For only ten minutes', ta: 'பத்து நிமிடங்கள் மட்டும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Until Joshua blew the horn', ta: 'யோசுவா எக்காளம் ஊதும் வரை' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 49
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 17,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What great miraculous body of water did the Israelites cross under Joshua\'s leadership in Chapter 3?',
      ta: 'யோசுவா 3-ம் அதிகாரத்தில் யோசுவாவின் தலைமையில் இஸ்ரவேலர் கடந்து சென்ற அற்புத நதி எது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The Jordan River', ta: 'யோர்தான் நதி' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The Euphrates River', ta: 'யூப்ரடீஸ் நதி' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The Nile River', ta: 'நைல் நதி' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The Kishon River', ta: 'கீசோன் நதி' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
  // 50
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 3,
    verse: 17,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What did the priests carrying the Ark of the Covenant do while all of Israel crossed the Jordan?',
      ta: 'இஸ்ரவேல் ஜனங்கள் அனைவரும் யோர்தானைக் கடந்து போகும்போது உடன்படிக்கைப் பெட்டியைச் சுமந்த ஆசாரியர்கள் என்ன செய்தார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Stood firm on dry ground in the middle of the riverbed', ta: 'நதியின் நடுவே உலர்ந்த தரையிலே காலூன்றி நின்றார்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Crossed first and ran to Jericho', ta: 'முதலில் கடந்து எரிகோவிற்கு ஓடினார்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Waited on the eastern bank of the river', ta: 'நதியின் கிழக்குக் கரையிலேயே காத்திருந்தார்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Placed the Ark in a boat', ta: 'பெட்டியை ஒரு படகில் வைத்தார்கள்' }, isCorrect: false },
    ],
    explanation: { en: '', ta: '' },
    isActive: true,
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri!);
    console.log('Connected.');

    const deleteRes = await Question.deleteMany({ book: 'Joshua', chapter: 3 });
    console.log(`Deleted ${deleteRes.deletedCount} existing questions for Joshua 3`);

    const insertRes = await Question.insertMany(joshua3Questions);
    console.log(`Successfully inserted ${insertRes.length} questions for Joshua 3!`);

    const count = await Question.countDocuments({ book: 'Joshua', chapter: 3 });
    console.log(`Total questions in Joshua 3: ${count}`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (err) {
    console.error('Error seeding questions:', err);
    process.exit(1);
  }
}

seed();
