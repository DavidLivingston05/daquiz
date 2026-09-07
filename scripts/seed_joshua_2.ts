import mongoose from 'mongoose';
import { Question } from '../models/Question';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://churchtechonly:Livingston@church.sn67zp8.mongodb.net/daquiz?retryWrites=true&w=majority&appName=Church';

export const joshua2Questions = [
  // 1
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 1,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'From where did Joshua the son of Nun send out the two spies secretly?',
      ta: 'யோசுவா இரண்டு வேவுகாரர்களை இரகசியமாய் எங்கிருந்து அனுப்பினார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Acacia Grove / Shittim', ta: 'சித்தீம்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Gilgal', ta: 'கில்கால்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Jericho', ta: 'எரிகோ' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Mount Nebo', ta: 'நேபோ மலை' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:1 - "Now Joshua the son of Nun sent out two men from Acacia Grove (Shittim) to spy secretly."', ta: 'யோசுவா 2:1 - "நூனின் குமாரனாகிய யோசுவா சித்தீமிலிருந்து இரண்டு மனுஷரை இரகசியமாய் வேவுபார்க்கும்படி அனுப்பினான்."' },
    isActive: true,
  },
  // 2
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 1,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'How many spies did Joshua send to spy out the land?',
      ta: 'தேசத்தை வேவுபார்க்க யோசுவா எத்தனை நபர்களை அனுப்பினார்?',
    },
    options: [
      { id: 'opt_1', text: { en: '2 men', ta: '2 மனுஷர்' }, isCorrect: true },
      { id: 'opt_2', text: { en: '12 men', ta: '12 மனுஷர்' }, isCorrect: false },
      { id: 'opt_3', text: { en: '7 men', ta: '7 மனுஷர்' }, isCorrect: false },
      { id: 'opt_4', text: { en: '1 man', ta: '1 மனுஷன்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:1 - Two men were sent secretly.', ta: 'யோசுவா 2:1 - இரண்டு மனுஷரை இரகசியமாய் வேவுபார்க்கும்படி அனுப்பினான்.' },
    isActive: true,
  },
  // 3
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 1,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What specific city were the spies instructed especially to view?',
      ta: 'வேவுகாரர்கள் முக்கியமாக எந்த நகரைப் போய்ப் பார்க்கும்படி பணிக்கப்பட்டார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Jericho', ta: 'எரிகோ' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Ai', ta: 'ஆய்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Gibeon', ta: 'கிபியோன்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Hebron', ta: 'எபிரோன்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:1 - "Go, view the land, especially Jericho."', ta: 'யோசுவா 2:1 - "நீங்கள் போய், தேசத்தையும் எரிகோவையும் பார்த்து வாருங்கள்."' },
    isActive: true,
  },
  // 4
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 1,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'Into whose house did the two spies come and lodge?',
      ta: 'வேவுகாரர்கள் யாருடைய வீட்டிற்குள் சென்று தங்கினார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Rahab the harlot', ta: 'ராகாப் என்னும் வேசியின் வீடு' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Deborah', ta: 'தெபொராள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Jael', ta: 'யாகேல்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Ruth', ta: 'ரூத்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:1 - "So they went, and came to the house of a harlot named Rahab, and lodged there."', ta: 'யோசுவா 2:1 - "அவர்கள் போய், ராகாப் என்னும் பேர்கொண்ட வேசியின் வீட்டில் வந்து தங்கினார்கள்."' },
    isActive: true,
  },
  // 5
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 2,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Who was told that men from the children of Israel had come that night to search out the country?',
      ta: 'இஸ்ரவேல் புத்திரரில் சிலர் இரவில் தேசத்தை வேவுபார்க்க வந்திருக்கிறார்கள் என்று யாருக்கு அறிவிக்கப்பட்டது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The King of Jericho', ta: 'எரிகோவின் ராஜா' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The King of Ai', ta: 'ஆயின் ராஜா' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The King of Moab', ta: 'மோவாபின் ராஜா' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The King of Jerusalem', ta: 'எருசலேமின் ராஜா' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:2 - "And it was told the king of Jericho, saying..."', ta: 'யோசுவா 2:2 - "இதோ, இஸ்ரவேல் புத்திரரில் சிலர் இந்தத் தேசத்தை வேவுபார்க்கும்படி இந்த இராத்திரியிலே இங்கே வந்திருக்கிறார்கள் என்று எரிகோவின் ராஜாவுக்கு அறிவிக்கப்பட்டது."' },
    isActive: true,
  },
  // 6
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 3,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What command did the king of Jericho send to Rahab?',
      ta: 'எரிகோவின் ராஜா ராகாபுக்கு என்ன கட்டளை அனுப்பினான்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Bring out the men who came into your house', ta: 'உன் வீட்டில் வந்த மனுஷரை வெளியே கொண்டுவா' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Kill the men immediately', ta: 'அந்த மனுஷரை உடனே கொன்றுபோடு' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Pay tribute to the city gate', ta: 'நகர வாசலுக்கு கப்பம் செலுத்து' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Leave the city at once', ta: 'உடனே நகரத்தை விட்டு வெளியேறு' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:3 - "Bring out the men who have come to you, who have entered your house, for they have come to search out all the country."', ta: 'யோசுவா 2:3 - "உன்னிடத்தில் வந்து, உன் வீட்டிற்குள் பிரவேசித்த மனுஷரை வெளியே கொண்டுவா; அவர்கள் தேசத்தையெல்லாம் வேவுபார்க்க வந்தார்கள்."' },
    isActive: true,
  },
  // 7
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 4,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What did the woman Rahab do with the two men when the king\'s messengers came?',
      ta: 'ராஜாவின் ஆட்கள் வந்தபோது ராகாப் அந்த இரண்டு மனுஷரையும் என்ன செய்தாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'She took the two men and hid them', ta: 'அவள் அந்த இரண்டு மனுஷரையும் ஒளித்துவைத்தாள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'She handed them over to the guards', ta: 'காவலர்களிடம் ஒப்படைத்தாள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'She ran out into the street', ta: 'தெருவுக்குள் ஓடினாள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'She locked them in a cellar', ta: 'பாதாள அறையில் அடைத்தாள்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:4 - "Then the woman took the two men and hid them."', ta: 'யோசுவா 2:4 - "அந்த ஸ்திரீயோ அந்த இரண்டு மனுஷரையும் ஒளித்துவைத்து..."' },
    isActive: true,
  },
  // 8
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 4,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What did Rahab tell the king’s officers regarding where the men came from?',
      ta: 'அந்த மனுஷர் எங்கிருந்து வந்தார்கள் என்பது குறித்து அதிகாரிகளிடம் ராகாப் என்ன கூறினாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Yes, the men came to me, but I did not know where they were from', ta: 'மெய்தான், மனுஷர் என்னிடத்தில் வந்தார்கள், அவர்கள் எவ்விடத்தாரோ எனக்குத் தெரியாது' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'They were my relatives from Egypt', ta: 'அவர்கள் எகிப்திலிருந்து வந்த என் உறவினர்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'They never came to my house', ta: 'அவர்கள் என் வீட்டிற்கு வரவே இல்லை' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'They were merchants from Babylon', ta: 'அவர்கள் பாபிலோனிய வியாபாரிகள்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:4 - She said, "Yes, the men came to me, but I did not know where they were from."', ta: 'யோசுவா 2:4 - "மெய்தான், மனுஷர் என்னிடத்தில் வந்தார்கள், அவர்கள் எவ்விடத்தாரோ எனக்குத் தெரியாது."' },
    isActive: true,
  },
  // 9
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 5,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'At what time did Rahab say the men went out of the city?',
      ta: 'எந்த நேரத்தில் அந்த மனுஷர் வெளியே புறப்பட்டுப் போனதாக ராகாப் கூறினாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'At the time of shutting the gate, when it was dark', ta: 'இருட்டும்போது ஒலிமுகவாசல் அடைகிற சமயத்தில்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'At noon / midday', ta: 'நடுப்பகலில்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'At sunrise early in the morning', ta: 'அதிகாலையில் சூரிய உதயத்தின்போது' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'At midnight', ta: 'நள்ளிரவில்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:5 - "And it happened as the gate was being shut, when it was dark, that the men went out."', ta: 'யோசுவா 2:5 - "இருட்டும்போது ஒலிமுகவாசல் அடைகிற சமயத்தில், அந்த மனுஷர் புறப்பட்டுப் போய்விட்டார்கள்."' },
    isActive: true,
  },
  // 10
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 5,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What advice did Rahab give to the king’s officers?',
      ta: 'ராஜாவின் ஆட்களுக்கு ராகாப் என்ன ஆலோசனை கூறினாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Pursue them quickly, for you may overtake them', ta: 'சீக்கிரமாய் அவர்கள் பின்னே போங்கள், அவர்களைப் பிடித்துக்கொள்ளலாம்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Wait until tomorrow morning', ta: 'நாளை காலை வரை காத்திருங்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Search all the houses in the city', ta: 'நகரத்திலுள்ள எல்லா வீடுகளையும் சோதியுங்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Send chariots towards Egypt', ta: 'எகிப்தை நோக்கி இரதங்களை அனுப்புங்கள்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:5 - "Pursue them quickly, for you may overtake them."', ta: 'யோசுவா 2:5 - "சீக்கிரமாய் அவர்கள் பின்னே போங்கள், அவர்களைப் பிடித்துக்கொள்ளலாம் என்றாள்."' },
    isActive: true,
  },
  // 11
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 6,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Where had Rahab brought the two spies up to hide them?',
      ta: 'வேவுகாரர்களை ஒளித்துவைக்க ராகாப் அவர்களை எங்கே ஏற்றிவைத்திருந்தாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'To the roof / housetop', ta: 'வீட்டின் மேல் கூரைக்கு' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Inside a dry cistern / well', ta: 'வறண்ட கிணற்றுக்குள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'In the basement cellar', ta: 'அடித்தள அறையில்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Under a bed', ta: 'கட்டிலின் கீழ்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:6 - "But she had brought them up to the roof..."', ta: 'யோசுவா 2:6 - "அவளோ அவர்களை வீட்டின்மேல் ஏற்றி..."' },
    isActive: true,
  },
  // 12
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 6,
    difficulty: 'hard',
    category: '',
    question: {
      en: 'With what material did Rahab hide the spies on the roof?',
      ta: 'வீட்டின் மேல்கூரையில் ராகாப் அவர்களை எதற்குள் மறைத்துவைத்திருந்தாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Stalks of flax laid in order', ta: 'பரப்பி வைத்திருந்த சணல் தட்டைகளுக்குள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Sheaves of barley', ta: 'வாற்கோதுமைக் கதிர்களுக்குள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Wool fleeces', ta: 'ஆட்டு ரோமத்திற்குள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Palm leaves', ta: 'பேரீச்ச மர ஓலைகளுக்குள்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:6 - "...and hidden them with the stalks of flax, which she had laid in order on the roof."', ta: 'யோசுவா 2:6 - "வீட்டின்மேல் பரப்பிவைத்திருந்த சணல்தட்டைகளுக்குள்ளே அவர்களை மறைத்துவைத்திருந்தாள்."' },
    isActive: true,
  },
  // 13
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 7,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Along which route did the pursuers chase the spies?',
      ta: 'துரத்துகிறவர்கள் எந்த வழியாக அவர்களைத் தேடிச் சென்றார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Along the road to the Jordan, to the fords', ta: 'யோர்தானின் துறைகள் வழியாய்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Along the highway to Egypt', ta: 'எகிப்துக்குப் போகும் பெருவழி' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Towards the Dead Sea', ta: 'உப்புக்கடலை நோக்கி' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Towards the wilderness of Judah', ta: 'யூதாவின் வனாந்தரம் நோக்கி' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:7 - "Then the men pursued them by the road to the Jordan, to the fords."', ta: 'யோசுவா 2:7 - "அந்த மனுஷர் யோர்தானின் துறைகள் வழியாய் அவர்களைத் தொடர்ந்து போனார்கள்."' },
    isActive: true,
  },
  // 14
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 7,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What happened to the city gate as soon as the pursuers went out?',
      ta: 'துரத்துகிறவர்கள் வெளியே புறப்பட்டவுடனே நகர வாசலுக்கு என்ன செய்யப்பட்டது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'They shut the gate', ta: 'ஒலிமுகவாசல் அடைக்கப்பட்டது' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'They broke down the gate', ta: 'வாசல் உடைக்கப்பட்டது' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'They left it open all night', ta: 'இரவு முழுவதும் திறந்தே வைக்கப்பட்டது' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'They burned the gate with fire', ta: 'வாசல் தீயிட்டு கொளுத்தப்பட்டது' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:7 - "And as soon as those who pursued them had gone out, they shut the gate."', ta: 'யோசுவா 2:7 - "அவர்களைத் தொடருகிறவர்கள் புறப்பட்டவுடனே ஒலிமுகவாசல் அடைக்கப்பட்டது."' },
    isActive: true,
  },
  // 15
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 8,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'When did Rahab come up to the spies on the roof?',
      ta: 'ராகாப் எப்போது வீட்டின் மேல்கூரைக்கு வேவுகாரர்களிடம் ஏறிவந்தாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Before they lay down to sleep', ta: 'அவர்கள் படுத்துக்கொள்ளுமுன்னே' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Early at dawn', ta: 'அதிகாலை விடியற்காலத்தில்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'After the morning trumpet', ta: 'காலை எக்காள முழக்கத்திற்குப் பின்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Three days later', ta: 'மூன்று நாட்களுக்குப் பின்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:8 - "Now before they lay down, she came up to them on the roof."', ta: 'யோசுவா 2:8 - "அவர்கள் படுத்துக்கொள்ளுமுன்னே, அவள் வீட்டின்மேல் அவர்களிடத்தில் ஏறிப்போய்..."' },
    isActive: true,
  },
  // 16
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 9,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What great truth did Rahab declare about the LORD giving the land?',
      ta: 'தேசத்தைக் குறித்து கர்த்தரைப்பற்றி ராகாப் என்ன அறிக்கையிட்டாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'I know that the LORD has given you the land', ta: 'கர்த்தர் உங்களுக்கு இந்தத் தேசத்தைக் கொடுத்தார் என்பதை அறிவேன்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The gods of Canaan are stronger', ta: 'கானானியரின் தெய்வங்களே வல்லமையுள்ளவை' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Jericho will never fall', ta: 'எரிகோ ஒருபோதும் விழாது' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The Jordan cannot be crossed', ta: 'யோர்தானைக் கடக்க முடியாது' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:9 - "I know that the LORD has given you the land, that the terror of you has fallen on us."', ta: 'யோசுவா 2:9 - "கர்த்தர் உங்களுக்கு இந்தத் தேசத்தைக் கொடுத்தார் என்பதையும், உங்களைப்பற்றிய பயம் எங்களுக்குள் விழுந்திருக்கிறது என்பதையும் அறிவேன்."' },
    isActive: true,
  },
  // 17
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 9,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'According to Rahab, what had happened to all the inhabitants of the land because of Israel?',
      ta: 'இஸ்ரவேலர் நிமித்தம் தேசத்துக் குடிகள் அனைவருக்கும் என்ன நேரிட்டதாக ராகாப் கூறினாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'All the inhabitants are fainthearted / melt because of you', ta: 'தேசத்துக் குடிகள் எல்லாரும் உங்களுக்கு முன்பாகக் கரைந்துபோகிறார்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'They allied with Egypt', ta: 'அவர்கள் எகிப்தோடு உடன்படிக்கை செய்தார்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'They prepared mighty weapons', ta: 'பெரிய ஆயுதங்களைத் தயார் செய்தார்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'They fled across the sea', ta: 'கடல் தாண்டி ஓடினார்கள்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:9 - "...and that all the inhabitants of the land are fainthearted because of you."', ta: 'யோசுவா 2:9 - "உங்களுக்கு முன்பாகத் தேசத்துக் குடிகள் எல்லாரும் கரைந்துபோகிறார்கள் என்பதையும் அறிவேன்."' },
    isActive: true,
  },
  // 18
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 10,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What miracle did Rahab mention hearing about when Israel came out of Egypt?',
      ta: 'இஸ்ரவேலர் எகிப்திலிருந்து வந்தபோது கர்த்தர் செய்த எந்த அற்புதத்தைக் கேள்விப்பட்டதாக ராகாப் கூறினாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'How the LORD dried up the water of the Red Sea', ta: 'கர்த்தர் செங்கடலின் தண்ணீரை வற்றிப்போகப்பண்ணினது' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'How fire came down on Mount Sinai', ta: 'சீனாய் மலையில் இறங்கிய அக்கினி' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'How the sun stood still in Gibeon', ta: 'சூரியன் நின்ற அற்புதம்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'How quail filled the camp', ta: 'காடைகள் பாளயத்தில் நிரம்பியது' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:10 - "For we have heard how the LORD dried up the water of the Red Sea for you when you came out of Egypt."', ta: 'யோசுவா 2:10 - "நீங்கள் எகிப்திலிருந்து புறப்பட்டபோது, கர்த்தர் உங்களுக்கு முன்பாகச் செங்கடலின் தண்ணீரை வற்றிப்போகப்பண்ணினதையும்..."' },
    isActive: true,
  },
  // 19
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 10,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Who were the two Amorite kings on the other side of the Jordan whom Israel utterly destroyed?',
      ta: 'யோர்தானுக்கு அப்புறத்தில் இஸ்ரவேலர் நிர்மூலமாக்கின இரண்டு எமோரிய ராஜாக்கள் யார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Sihon and Og', ta: 'சீகோன் மற்றும் ஓக்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Balak and Balaam', ta: 'பாலாக் மற்றும் பிலேயாம்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Agag and Hadad', ta: 'ஆகாக் மற்றும் ஆதாத்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Abimelech and Phichol', ta: 'அபிமெலேக்கு மற்றும் பிகோல்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:10 - "...and what you did to the two kings of the Amorites who were on the other side of the Jordan, Sihon and Og, whom you utterly destroyed."', ta: 'யோசுவா 2:10 - "யோர்தானுக்கு அப்புறத்திலிருந்த எமோரியரின் இரண்டு ராஜாக்களாகிய சீகோனுக்கும் ஓகுக்கும் நீங்கள் செய்ததையும் கேள்விப்பட்டோம்."' },
    isActive: true,
  },
  // 20
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 11,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What happened to the courage of the people of Jericho when they heard these things?',
      ta: 'இவைகளைக் கேள்விப்பட்டபோது எரிகோ மக்களின் தைரியத்திற்கு என்ன நேரிட்டது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Our hearts melted; neither did there remain any more courage in anyone', ta: 'எங்கள் இருதயம் கரைந்துபோயிற்று; ஒருவருக்கும் தைரியமற்றுப்போயிற்று' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Their courage increased tenfold', ta: 'அவர்களுடைய தைரியம் பத்து மடங்கு கூடியது' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'They rejoiced and held a festival', ta: 'அவர்கள் சந்தோஷப்பட்டு பண்டிகை கொண்டாடினார்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'They built higher walls immediately', ta: 'உடனே உயரமான சுவர்களைக் கட்டினார்கள்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:11 - "And as soon as we heard these things, our hearts melted; neither did there remain any more courage in anyone because of you."', ta: 'யோசுவா 2:11 - "கேள்விப்பட்டவுடனே எங்கள் இருதயம் கரைந்துபோயிற்று; உங்களால் எ மனுஷனுக்கும் தைரியமற்றுப்போயிற்று."' },
    isActive: true,
  },
  // 21
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 11,
    difficulty: 'hard',
    category: '',
    question: {
      en: 'What remarkable confession of faith did Rahab utter about the LORD God in verse 11?',
      ta: 'வசனம் 11-ல் கர்த்தராகிய தேவனைப்பற்றி ராகாப் கூறிய விசுவாச அறிக்கை என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The LORD your God, He is God in heaven above and on earth beneath', ta: 'உங்கள் தேவனாகிய கர்த்தரே உயர வானத்திலும் கீழே பூமியிலும் தேவனானவர்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'He is the local deity of the desert', ta: 'அவர் வனாந்தரத்தின் உள்ளூர் தெய்வம்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'He is equal to the gods of Canaan', ta: 'அவர் கானானிய தெய்வங்களுக்குச் சமமானவர்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'He is only the God of Abraham\'s clan', ta: 'அவர் ஆபிரகாமின் வம்சத்தாருக்கு மட்டுமே தேவன்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:11 - "for the LORD your God, He is God in heaven above and on earth beneath."', ta: 'யோசுவா 2:11 - "உங்கள் தேவனாகிய கர்த்தரே உயர வானத்திலும் கீழே பூமியிலும் தேவனானவர்."' },
    isActive: true,
  },
  // 22
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 12,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What did Rahab ask the spies to swear by?',
      ta: 'வேவுகாரர்களை ராகாப் எதன் பேரில் ஆணையிட்டுத் தரும்படி கேட்டுக்கொண்டாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'By the LORD (Yahweh)', ta: 'கர்த்தரின் பேரில்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'By the king of Jericho', ta: 'எரிகோவின் ராஜாவின் பேரில்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'By Joshua\'s life', ta: 'யோசுவாவின் ஜீவன் பேரில்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'By the Jordan River', ta: 'யோர்தான் நதியின் பேரில்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:12 - "Now therefore, I beg you, swear to me by the LORD, since I have shown you kindness..."', ta: 'யோசுவா 2:12 - "நான் உங்களுக்குத் தயவுசெய்தபடியினால், நீங்களும் என் தகப்பன் குடும்பத்துக்குத் தயவுசெய்வோம் என்று கர்த்தர் பேரில் ஆணையிட்டு..."' },
    isActive: true,
  },
  // 23
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 12,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Whose household did Rahab specifically plead for kindness and mercy for?',
      ta: 'யாருடைய குடும்பத்திற்குத் தயவுசெய்து காக்கும்படி ராகாப் குறிப்பாக வேண்டினாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Her father\'s household / family', ta: 'தன் தகப்பன் குடும்பத்திற்கு' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The city nobles and leaders', ta: 'நகர தலைவர்களுக்கு' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The king’s servants', ta: 'ராஜாவின் ஊழியர்களுக்கு' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Only herself alone', ta: 'தன்னை மட்டும்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:12 - "...that you also will show kindness to my father\'s house, and give me a true token."', ta: 'யோசுவா 2:12 - "...என் தகப்பன் குடும்பத்துக்குத் தயவுசெய்வோம் என்று கர்த்தர் பேரில் ஆணையிட்டு, எனக்கு ஒரு மெய்யான அடையாளத்தைக் கொடுத்து..."' },
    isActive: true,
  },
  // 24
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 12,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What did Rahab ask from the spies as a guarantee of their promise?',
      ta: 'தங்கள் வாக்குறுதிக்கு உத்தரவாதமாக ராகாப் என்ன கேட்டுக்கொண்டாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'A true token / sure sign', ta: 'ஒரு மெய்யான அடையாளம்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'A bag of gold and silver', ta: 'பொன் மற்றும் வெள்ளிப் பை' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'A written letter from Moses', ta: 'மோசேயின் கடிதம்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'A royal seal ring', ta: 'ராஜ முத்திரை மோதிரம்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:12 - "...and give me a true token (sure pledge)."', ta: 'யோசுவா 2:12 - "...எனக்கு ஒரு மெய்யான அடையாளத்தைக் கொடுத்து..."' },
    isActive: true,
  },
  // 25
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 13,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Which family members of Rahab are explicitly listed to be saved from death?',
      ta: 'சாவிலிருந்து தப்புவிக்கப்பட வேண்டும் என்று ராகாப் குறிப்பிட்ட உறவினர்கள் யார் யார்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Father, mother, brothers, sisters, and all they have', ta: 'தகப்பன், தாய், சகோதரர், சகோதரிகள் மற்றும் அவர்களுக்குரிய யாவும்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Her husband and sons only', ta: 'தன் கணவன் மற்றும் மகன்கள் மட்டும்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Her neighbors and merchants', ta: 'அவள் அண்டை வீட்டாரும் வியாபாரிகளும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Her uncles and tribal chiefs', ta: 'தன் சித்தப்பாக்களும் கோத்திர தலைவர்களும்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:13 - "...and spare my father, my mother, my brothers, my sisters, and all that they have, and deliver our lives from death."', ta: 'யோசுவா 2:13 - "என் தகப்பனையும், என் தாயையும், என் சகோதரரையும், என் சகோதரிகளையும், அவர்களுக்கு உண்டான எல்லாவற்றையும் உயிரோடே வைத்து, எங்கள் ஆத்துமாக்களைச் சாவுக்கு விலக்கி இரட்சிக்கவேண்டும் என்றாள்."' },
    isActive: true,
  },
  // 26
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 14,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What did the two spies answer her regarding their own lives?',
      ta: 'தங்கள் சொந்த ஜீவனைக் குறித்து அந்த மனுஷர் அவளுக்கு என்ன பதில் கூறினார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Our lives for yours, if none of you tell this business of ours', ta: 'நீங்கள் எங்கள் காரியத்தை வெளிப்படுத்தாவிட்டால், உங்கள் ஜீவனுக்கு எங்கள் ஜீவன் ஈடு' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'We cannot make any promises', ta: 'நாங்கள் எந்த வாக்குறுதியும் கொடுக்க முடியாது' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Only if Joshua approves it later', ta: 'யோசுவா அனுமதித்தால் மட்டுமே காப்போம்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'You must pay us 100 shekels of silver', ta: '100 வெள்ளிக்காசு தரவேண்டும்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:14 - "Our lives for yours, if none of you tell this business of ours."', ta: 'யோசுவா 2:14 - "அதற்கு அந்த மனுஷர்: நீங்கள் எங்கள் காரியத்தை வெளிப்படுத்தாவிட்டால், உங்கள் ஜீவனுக்கு எங்கள் ஜீவன் ஈடு என்றார்கள்."' },
    isActive: true,
  },
  // 27
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 14,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'With what qualities did the spies promise to deal with Rahab when the LORD gave them the land?',
      ta: 'கர்த்தர் தேசத்தை ஒப்புக்கொடுக்கும் நாளில் ராகாபுக்கு என்ன செய்வோம் என்று வாக்குக் கொடுத்தார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Kindly and truly (mercy and faithfulness)', ta: 'தயவும் உண்மையும் செய்வோம்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Riches and kingdoms', ta: 'செல்வமும் அரசுகளும் கொடுப்போம்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Make her queen of Jericho', ta: 'எரிகோவின் ராணியாக்குவோம்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Grant her safe passage to Egypt', ta: 'எகிப்துக்குப் போக அனுமதிப்போம்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:14 - "And it shall be, when the LORD has given us the land, that we will deal kindly and truly with you."', ta: 'யோசுவா 2:14 - "கர்த்தர் எங்களுக்கு இந்தத் தேசத்தைத் தரும்போது, நாங்கள் உனக்குத் தயவும் உண்மையும் செய்வோம் என்றார்கள்."' },
    isActive: true,
  },
  // 28
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 15,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'How did Rahab let the two spies down from her house?',
      ta: 'ராகாப் வேவுகாரர்களை எவ்வாறு தன் வீட்டிலிருந்து கீழே இறக்கிவிட்டாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'By a rope through the window', ta: 'சன்னல் வழியாய் ஒரு கயிற்றினால்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Through a secret underground tunnel', ta: 'ரகசிய சுரங்கப்பாதை வழியே' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Through the front main gate in disguise', ta: 'மாறுவேடமிட்டு தலைவாசல் வழியே' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Using a wooden ladder', ta: 'மர ஏணியைப் பயன்படுத்தி' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:15 - "Then she let them down by a rope through the window..."', ta: 'யோசுவா 2:15 - "அப்பொழுது அவள் அவர்களைச் சன்னல்வழியாய்க் கயிற்றினாலே இறக்கிவிட்டாள்."' },
    isActive: true,
  },
  // 29
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 15,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Why was Rahab able to let them down through the window directly outside?',
      ta: 'சன்னல் வழியாக அவர்களை வெளிப்புறத்தில் இறக்கிவிட ராகாபால் ஏன் முடிந்தது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Her house was on the city wall, and she dwelt on the wall', ta: 'அவள் வீடு நகர மதிலின்மேல் இருந்தது, அவள் மதிலில் குடியிருந்தாள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Her house had tall scaffolding', ta: 'அவள் வீடு உயரமான சாரக்கட்டு கொண்டிருந்தது' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The wall had collapsed already', ta: 'மதில் ஏற்கனவே இடிந்து கிடந்தது' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Her house was outside the city gates', ta: 'அவள் வீடு நகருக்கு வெளியே இருந்தது' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:15 - "...for her house was on the city wall; she dwelt on the wall."', ta: 'யோசுவா 2:15 - "அவள் வீடு நகரமதிலின்மேல் இருந்தது, அவள் மதிலிலே குடியிருந்தாள்."' },
    isActive: true,
  },
  // 30
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 16,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'Where did Rahab advise the spies to go first to avoid the pursuers?',
      ta: 'துரத்துகிறவர்கள் எதிர்ப்படாதபடி முதலில் எங்கே போகும்படி ராகாப் அவர்களுக்கு அறிவுறுத்தினாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'To the mountain / hills', ta: 'மலைக்குப் போங்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Straight across the Jordan', ta: 'நேராக யோர்தானைத் தாண்டுங்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'To the plain of Moab', ta: 'மோவாபின் சமபூமிக்கு' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'To the camp at Gilgal', ta: 'கில்காலின் பாளயத்திற்கு' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:16 - "And she said to them, \'Get to the mountain, lest the pursuers meet you.\'"', ta: 'யோசுவா 2:16 - "அவள் அவர்களை நோக்கி: உங்களைத் தொடருகிறவர்கள் உங்களுக்கு எதிர்ப்படாதபடிக்கு, நீங்கள் மலைக்குப் போய்..."' },
    isActive: true,
  },
  // 31
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 16,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'How many days were the spies told to hide in the mountain until the pursuers returned?',
      ta: 'துரத்துகிறவர்கள் திரும்பிவரும் வரை எத்தனை நாட்கள் மலையிலே ஒளித்திருக்க வேண்டும்?',
    },
    options: [
      { id: 'opt_1', text: { en: '3 days', ta: '3 நாட்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: '7 days', ta: '7 நாட்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: '40 days', ta: '40 நாட்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: '1 day', ta: '1 நாள்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:16 - "Hide there three days, until the pursuers have returned. Afterward you may go your way."', ta: 'யோசுவா 2:16 - "துரத்துகிறவர்கள் திரும்பிவருமட்டும் மூன்று நாள் அங்கே ஒளித்திருங்கள்; பின்பு உங்கள் வழியே போகலாம் என்றாள்."' },
    isActive: true,
  },
  // 32
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 17,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What did the men say regarding the oath she made them swear?',
      ta: 'அவள் ஆணையிடப்பண்ணின ஆணையைக் குறித்து அந்த மனுஷர் அவளுக்கு என்ன கூறினார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'We will be blameless of this oath unless specific conditions are met', ta: 'நீ எங்களுக்கு ஆணையிடப்பண்ணின இந்த ஆணைக்கு நாங்கள் குற்றமற்றவர்களாயிருக்க வேண்டும்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The oath is canceled once we cross the Jordan', ta: 'யோர்தானைக் கடந்ததும் ஆணை செல்லாது' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The oath applies to all citizens of Jericho', ta: 'ஆணை எரிகோ மக்கள் அனைவருக்கும் பொருந்தும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'No oath was made before God', ta: 'தேவனுக்கு முன்பாக எந்த ஆணையும் இடப்படவில்லை' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:17 - "We will be blameless of this oath of yours which you have made us swear..."', ta: 'யோசுவா 2:17 - "அந்த மனுஷர் அவளை நோக்கி: நீ எங்களுக்கு ஆணையிடப்பண்ணின இந்த எங்கள் ஆணைக்கு நாங்கள் குற்றமற்றவர்களாயிருக்க வேண்டுமானால்..."' },
    isActive: true,
  },
  // 33
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 18,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What specific object was Rahab required to bind in the window through which she let them down?',
      ta: 'அவர்களை இறக்கிவிட்ட சன்னலிலே ராகாப் எதைக் கட்டிவைக்க வேண்டும்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'This line of scarlet cord / thread', ta: 'இந்தச் சிவப்புநூல் கயிறு' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'A white linen cloth', ta: 'ஒரு வெள்ளைத் துணி' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'A golden horn', ta: 'ஒரு பொன் எக்காளம்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'An olive branch', ta: 'ஒரு ஒலிவக் கிளை' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:18 - "...unless, when we come into the land, you bind this line of scarlet cord in the window through which you let us down."', ta: 'யோசுவா 2:18 - "நாங்கள் தேசத்துக்குள் வரும்போது, எங்களை இறக்கிவிட்ட சன்னலிலே இந்தச் சிவப்புநூல் கயிற்றைக் கட்டி..."' },
    isActive: true,
  },
  // 34
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 18,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Where were all of Rahab\'s family members required to stay during the invasion?',
      ta: 'படையெடுப்பின் போது ராகாபின் குடும்பத்தார் அனைவரும் எங்கே இருக்க வேண்டும்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Gathered inside Rahab\'s house', ta: 'ராகாபின் வீட்டிற்குள் கூடிவந்திருக்க வேண்டும்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'At the city gate waving a flag', ta: 'நகர வாசலில் கொடி பிடித்து நிற்க வேண்டும்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Hiding in the mountain caves', ta: 'மலைக் குகைகளில் ஒளிந்திருக்க வேண்டும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'At the bank of the Jordan river', ta: 'யோர்தான் நதிக்கரையில் நிற்க வேண்டும்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:18 - "...and you bring your father, your mother, your brothers, and all your father’s household to your own home."', ta: 'யோசுவா 2:18 - "...உன் தகப்பனையும், உன் தாயையும், உன் சகோதரரையும், உன் தகப்பனுடைய குடும்பத்தார் அனைவரையும் உன் வீட்டிற்குள் சேர்த்துக்கொள்வாயாக."' },
    isActive: true,
  },
  // 35
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 19,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What did the spies warn if anyone went outside the doors of Rahab\'s house into the street?',
      ta: 'ராகாபின் வீட்டு வாசற்படியை விட்டு வெளியே தெருவுக்குள் போகிற எவனுக்கும் என்ன நேரிடும்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'His blood shall be on his own head, and we will be guiltless', ta: 'அவன் இரத்தம் அவன் தலைமேல் சுமரும், நாங்கள் குற்றமற்றிருப்போம்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'He will be taken captive to Shiloh', ta: 'அவன் சீலோவுக்கு சிறைபிடிக்கப்படுவான்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The spies must rescue him from the street', ta: 'வேவுகாரர்கள் தெருவில் போய் காப்பாற்ற வேண்டும்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The king of Jericho will protect him', ta: 'எரிகோவின் ராஜா அவனைக் காப்பான்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:19 - "And it shall be that whoever goes outside the doors of your house into the street, his blood shall be on his own head, and we will be guiltless."', ta: 'யோசுவா 2:19 - "உன் வீட்டு வாசற்படியை விட்டு வெளியே தெருவில் இறங்குகிற எவனுடைய இரத்தப்பழியும அவன் தலையின்மேல் இருக்கும், நாங்கள் குற்றமற்றிருப்போம்."' },
    isActive: true,
  },
  // 36
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 19,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Whose head would the blood be on if a hand was laid on anyone who remained inside Rahab’s house?',
      ta: 'வீட்டுக்குள் இருக்கும் எவன்மேலாவது கைபோடப்பட்டால் இரத்தப்பழி யார் தலைமேல் இருக்கும்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'On the spies’ heads', ta: 'வேவுகாரரின் (எங்கள்) தலைமேல்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'On Rahab’s head', ta: 'ராகாபின் தலைமேல்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'On the king of Jericho\'s head', ta: 'எரிகோ ராஜாவின் தலைமேல்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'On the high priest’s head', ta: 'பிரதான ஆசாரியன் தலைமேல்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:19 - "And whoever is with you in the house, his blood shall be on our head if a hand is laid on him."', ta: 'யோசுவா 2:19 - "வீட்டிற்குள் உன்னோடிருக்கிற எவன்மேலாவது கைபோடப்பட்டால், அவன் இரத்தப்பழி எங்கள் தலையின்மேல் இருக்கும்."' },
    isActive: true,
  },
  // 37
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 20,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Under what condition would the spies be completely released from their oath?',
      ta: 'எந்த சூழ்நிலையில் வேவுகாரர்கள் அந்த ஆணையினின்று முற்றிலும் விடுதலையாவார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'If you tell this business of ours', ta: 'நீங்கள் எங்கள் காரியத்தை வெளிப்படுத்தினால்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'If Jericho surrenders peacefully', ta: 'எரிகோ சமாதானமாய் பணிந்தால்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'If the scarlet thread fades in color', ta: 'சிவப்புநூல் நிறம் மங்கினால்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'If it rains during the attack', ta: 'தாக்குதலின்போது மழை பெய்தால்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:20 - "And if you tell this business of ours, then we will be free of your oath which you made us swear."', ta: 'யோசுவா 2:20 - "நீ எங்கள் காரியத்தை வெளிப்படுத்தினால், நீ எங்களுக்கு ஆணையிடப்பண்ணின ஆணைக்கு நாங்கள் குற்றமற்றவர்களாயிருப்போம் என்றார்கள்."' },
    isActive: true,
  },
  // 38
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 21,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What was Rahab\'s response to the conditions set by the spies?',
      ta: 'வேவுகாரர் கூறிய நிபந்தனைகளுக்கு ராகாபின் பதில் என்னவாக இருந்தது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'According to your words, so be it', ta: 'உங்கள் வார்த்தையின்படியே ஆகக்கடவது' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'I need to negotiate better terms', ta: 'நான் கூடுதல் நிபந்தனைகள் கேட்கிறேன்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Give me another token instead', ta: 'வேறு அடையாளம் தாருங்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'I cannot accept this condition', ta: 'என்னால் இதை ஏற்றுக்கொள்ள முடியாது' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:21 - "Then she said, \'According to your words, so be it.\'"', ta: 'யோசுவா 2:21 - "அதற்கு அவள்: உங்கள் வார்த்தையின்படியே ஆகக்கடவது என்று சொல்லி..."' },
    isActive: true,
  },
  // 39
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 21,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'When did Rahab bind the scarlet cord in the window?',
      ta: 'ராகாப் எப்போது சன்னலில் சிவப்புநூல் கயிற்றைக் கட்டிவைத்தாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'As soon as they departed / sent them away', ta: 'அவர்களை அனுப்பிவிட்டவுடனே' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'On the 7th day of the siege', ta: 'முற்றுகையின் 7-ம் நாளில்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'When she heard the trumpets blowing', ta: 'எக்காள சத்தம் கேட்ட போது' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'After the walls fell down', ta: 'மதில்கள் இடிந்து விழுந்த பின்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:21 - "And she sent them away, and they departed. And she bound the scarlet cord in the window."', ta: 'யோசுவா 2:21 - "...அவர்களை அனுப்பிவிட்டாள்; அவர்கள் போய்விட்டார்கள்; பின்பு அவள் அந்தச் சிவப்புநூல் கயிற்றைச் சன்னலிலே கட்டிவைத்தாள்."' },
    isActive: true,
  },
  // 40
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 22,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'Where did the two spies stay for three days after departing from Jericho?',
      ta: 'எரிகோவை விட்டுப் புறப்பட்ட பின் அந்த இரண்டு வேவுகாரர்களும் மூன்று நாட்கள் எங்கே தங்கியிருந்தார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'In the mountain', ta: 'மலையிலே' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'In a cave at Engedi', ta: 'என்கேதி குகையில்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'In the Jordan river reeds', ta: 'யோர்தான் நதி நாணல்களுக்குள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'In the city of Ai', ta: 'ஆய் பட்டணத்தில்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:22 - "They departed and went to the mountain, and stayed there three days..."', ta: 'யோசுவா 2:22 - "அவர்கள் போய், மலைக்கு வந்து, தங்களைத் தொடர்ந்தவர்கள் திரும்புமட்டும் மூன்று நாள் அங்கே தங்கியிருந்தார்கள்."' },
    isActive: true,
  },
  // 41
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 22,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What was the outcome of the pursuers’ search all along the way?',
      ta: 'வழிநெடுகிலும் அவர்களைத் தேடித்திரிந்த துரத்துகிறவர்களின் தேடுதலின் முடிவு என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: 'The pursuers sought them throughout all the way, but did not find them', ta: 'வழியெல்லாம் அவர்களைத் தேடியும் கண்டுபிடிக்கவில்லை' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'They captured one of the spies', ta: 'ஒரு வேவுகாரனைப் பிடித்தார்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'They found their weapons near the Jordan', ta: 'அவர்களின் ஆயுதங்களைக் கண்டெடுத்தார்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'They followed their footprints to the mountain top', ta: 'அவர்களின் கால்தடங்களை மலை உச்சிவரை பின்தொடர்ந்தார்கள்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:22 - "The pursuers sought them all along the way, but did not find them."', ta: 'யோசுவா 2:22 - "தொடருகிறவர்கள் வழியெல்லாம் அவர்களைத் தேடியும் கண்டுபிடிக்கவில்லை."' },
    isActive: true,
  },
  // 42
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 23,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'After descending from the mountain and crossing over the river, to whom did the two men come?',
      ta: 'மலையிலிருந்து இறங்கி ஆற்றைக் கடந்த பின்பு வேவுகாரர் யாரிடம் வந்து சேர்ந்தார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Joshua the son of Nun', ta: 'நூனின் குமாரனாகிய யோசுவாவிடம்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Eleazar the priest', ta: 'ஆசாரியனாகிய எலெயாசாரிடம்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Caleb the son of Jephunneh', ta: 'எப்புன்னேயின் குமாரன் காலேபிடம்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Phinehas', ta: 'பினெகாசிடம்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:23 - "So the two men returned, descended from the mountain, and crossed over; and they came to Joshua the son of Nun..."', ta: 'யோசுவா 2:23 - "அப்பொழுது அந்த இரண்டு மனுஷரும் திரும்பி, மலையிலிருந்து இறங்கி, ஆற்றைக் கடந்து, நூனின் குமாரனாகிய யோசுவாவினிடத்தில் வந்து..."' },
    isActive: true,
  },
  // 43
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 23,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'What did the two spies recount to Joshua upon their return?',
      ta: 'திரும்பி வந்ததும் யோசுவாவிடம் வேவுகாரர்கள் என்ன கூறினார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'All the things that had befallen them', ta: 'தங்களுக்கு நேரிட்ட யாவற்றையும் விவரித்தார்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Only the number of chariots in Jericho', ta: 'எரிகோவின் இரதங்களின் எண்ணிக்கையை மட்டும்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'That the people were giants and invincible', ta: 'அங்குள்ள மக்கள் ராட்சதர்கள் என்று' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'That Israel should return to Egypt', ta: 'இஸ்ரவேலர் எகிப்துக்குத் திரும்ப வேண்டும் என்று' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:23 - "...and told him all the things that had befallen them."', ta: 'யோசுவா 2:23 - "...தங்களுக்கு நேரிட்ட யாவற்றையும் அவனுக்கு விவரித்துச் சொன்னார்கள்."' },
    isActive: true,
  },
  // 44
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 24,
    difficulty: 'easy',
    category: '',
    question: {
      en: 'What confident report did the spies give to Joshua in verse 24?',
      ta: 'வசனம் 24-ல் வேவுகாரர்கள் யோசுவாவிடம் கூறிய விசுவாசம் நிறைந்த அறிக்கை என்ன?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Truly the LORD has delivered all the land into our hands', ta: 'மெய்யாகவே கர்த்தர் இந்தத் தேசத்தையெல்லாம் நம்முடைய கையில் ஒப்புக்கொடுத்தார்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'We cannot conquer this fortified city', ta: 'இந்த பலத்த கோட்டையை நம்மால் ஜெயிக்க முடியாது' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'We need 100,000 more soldiers', ta: 'இன்னும் 1 லட்சம் வீரர்கள் தேவை' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The walls are too thick to breach', ta: 'மதில்கள் உடைக்க முடியாத அளவுக்கு தடிமனாக உள்ளன' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:24 - "And they said to Joshua, \'Truly the LORD has delivered all the land into our hands...\'"', ta: 'யோசுவா 2:24 - "யோசுவாவை நோக்கி: மெய்யாகவே கர்த்தர் இந்தத் தேசத்தையெல்லாம் நம்முடைய கையில் ஒப்புக்கொடுத்தார்..."' },
    isActive: true,
  },
  // 45
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 24,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'How did the spies describe the state of the inhabitants of the country to Joshua?',
      ta: 'தேசத்துக் குடிகளின் நிலையை வேவுகாரர்கள் யோசுவாவிடம் எவ்வாறு விவரித்தார்கள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'All the inhabitants of the country are fainthearted / melt because of us', ta: 'தேசத்துக் குடிகள் எல்லாரும் நமக்கு முன்பாகக் கரைந்துபோகிறார்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'They are preparing an ambush at the river', ta: 'அவர்கள் ஆற்றில் பதுங்கியிருந்து தாக்க திட்டமிடுகிறார்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'They have evacuated the city', ta: 'அவர்கள் நகரத்தை காலி செய்துவிட்டார்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'They are completely unaware of Israel', ta: 'இஸ்ரவேலைப் பற்றி அவர்களுக்குத் தெரியாது' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua 2:24 - "...for indeed all the inhabitants of the country are fainthearted because of us."', ta: 'யோசுவா 2:24 - "...தேசத்துக் குடிகள் எல்லாரும் நமக்கு முன்பாகக் கரைந்துபோகிறார்கள் என்றார்கள்."' },
    isActive: true,
  },
  // 46
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 1,
    difficulty: 'hard',
    category: '',
    question: {
      en: 'In Hebrews 11:31 and James 2:25, how is Rahab\'s action in Joshua 2 remembered in the New Testament?',
      ta: 'எபிரெயர் 11:31 மற்றும் யாக்கோபு 2:25-ல் யோசுவா 2-ன் ராகாபின் செயல் எவ்வாறு போற்றப்படுகிறது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'As an act of Faith and Justification by receiving the messengers in peace', ta: 'விசுவாசத்தினாலும் கிரியையினாலும் தூதர்களை சமாதானமாய் ஏற்றுக்கொண்ட செயல்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'As a military alliance with Joshua', ta: 'யோசுவாவுடனான இராணுவ உடன்படிக்கை' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'As a trade transaction', ta: 'ஒரு வணிக ஒப்பந்தம்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'As a coincidence of history', ta: 'தற்செயலாக நடந்த நிகழ்வு' }, isCorrect: false },
    ],
    explanation: { en: 'Hebrews 11:31 - "By faith the harlot Rahab did not perish with those who did not believe, when she had received the spies with peace."', ta: 'எபிரெயர் 11:31 - "விசுவாசத்தினாலே ராகாப் என்னும் வேசி வேவுகாரரைச் சமாதானமாய் ஏற்றுக்கொண்டு..."' },
    isActive: true,
  },
  // 47
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 18,
    difficulty: 'hard',
    category: '',
    question: {
      en: 'In Christian typology, what does the scarlet thread bound in Rahab’s window foreshadow?',
      ta: 'கிறிஸ்தவ வேத இறையியலில், ராகாபின் சன்னலில் கட்டப்பட்ட சிவப்பு நூல் எதை முன்னறிவிக்கிறது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Salvation and redemption through the shed blood of Jesus Christ', ta: 'இயேசு கிறிஸ்துவின் சிந்தப்பட்ட இரத்தத்தினாலான இரட்சிப்பு மற்றும் மீட்பு' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'The royal majesty of Solomon', ta: 'சாலொமோனின் ராஜரீக மேன்மை' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'The fire on Mount Carmel', ta: 'கர்மேல் மலையில் இறங்கிய அக்கினி' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'The veil of the temple', ta: 'தேவாலயத்தின் திரைச்சீலை' }, isCorrect: false },
    ],
    explanation: { en: 'Early Church fathers (like Clement of Rome and Justin Martyr) saw the scarlet rope as a symbol of the redeeming blood of Christ that saves from judgment.', ta: 'முற்கால திருச்சபை தந்தையர் ராகாபின் சன்னலில் உள்ள சிவப்பு நூலை கிறிஸ்துவின் மீட்பின் இரத்தத்தின் அடையாளமாகப் பார்த்தார்கள்.' },
    isActive: true,
  },
  // 48
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 1,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'How many total verses are there in Chapter 2 of the Book of Joshua?',
      ta: 'யோசுவா புத்தகம் 2-ம் அதிகாரத்தில் மொத்தம் எத்தனை வசனங்கள் உள்ளன?',
    },
    options: [
      { id: 'opt_1', text: { en: '24 verses', ta: '24 வசனங்கள்' }, isCorrect: true },
      { id: 'opt_2', text: { en: '18 verses', ta: '18 வசனங்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: '30 verses', ta: '30 வசனங்கள்' }, isCorrect: false },
      { id: 'opt_4', text: { en: '12 verses', ta: '12 வசனங்கள்' }, isCorrect: false },
    ],
    explanation: { en: 'Joshua Chapter 2 contains exactly 24 verses.', ta: 'யோசுவா 2-ம் அதிகாரத்தில் சரியாக 24 வசனங்கள் உள்ளன.' },
    isActive: true,
  },
  // 49
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 1,
    difficulty: 'hard',
    category: '',
    question: {
      en: 'In Matthew 1:5, which ancestor of King David and Jesus Christ did Rahab become?',
      ta: 'மத்தேயு 1:5-ல், தாவீது ராஜா மற்றும் இயேசு கிறிஸ்துவின் வம்சாவழியில் ராகாப் யாருடைய தாயானாள்?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Mother of Boaz (who married Ruth)', ta: 'போவாஸின் தாய் (ரூத்தை மணந்தவர்)' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Mother of Jesse', ta: 'ஈசாயின் தாய்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Mother of Obed', ta: 'ஓபேதின் தாய்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Wife of Caleb', ta: 'காலேபின் மனைவி' }, isCorrect: false },
    ],
    explanation: { en: 'Matthew 1:5 - "Salmon begot Boaz by Rahab, Boaz begot Obed by Ruth, Obed begot Jesse, and Jesse begot David the king."', ta: 'மத்தேயு 1:5 - "சல்மோன் ராகாபினிடத்தில் போவாசைப் பெற்றான்; போவாஸ் ரூத்தினிடத்தில் ஓபேதைப் பெற்றான்; ஓபேத் ஈசாயைப் பெற்றான்."' },
    isActive: true,
  },
  // 50
  {
    testament: 'OT',
    book: 'Joshua',
    chapter: 2,
    verse: 24,
    difficulty: 'medium',
    category: '',
    question: {
      en: 'How does the report of the 2 spies in Joshua 2 contrast with the report of the 10 spies in Numbers 13?',
      ta: 'எண்ணாகமம் 13-ன் 10 வேவுகாரரின் அறிக்கைக்கு மாறாக, யோசுவா 2-ன் 2 வேவுகாரரின் அறிக்கை எதனை வெளிப்படுத்துகிறது?',
    },
    options: [
      { id: 'opt_1', text: { en: 'Joshua\'s spies brought a faithful report of victory and God’s promise', ta: 'யோசுவாவின் வேவுகாரர் தேவனுடைய வாக்குத்தத்தத்தின் மீதான முழு விசுவாச அறிக்கையைக் கொண்டுவந்தனர்' }, isCorrect: true },
      { id: 'opt_2', text: { en: 'Joshua\'s spies discouraged the people with fear', ta: 'யோசுவாவின் வேவுகாரர் மக்களை பயமுறுத்தினார்கள்' }, isCorrect: false },
      { id: 'opt_3', text: { en: 'Joshua\'s spies brought huge clusters of grapes only', ta: 'திராட்சைக் குலைகளை மட்டுமே கொண்டுவந்தனர்' }, isCorrect: false },
      { id: 'opt_4', text: { en: 'Joshua\'s spies suggested appointing a new captain back to Egypt', ta: 'எகிப்துக்குத் திரும்ப புதிய தலைவனை ஏற்படுத்தச் சொன்னார்கள்' }, isCorrect: false },
    ],
    explanation: { en: 'Unlike the 10 spies in Numbers 13 who spread fear, the 2 spies declared with faith: "Truly the LORD has delivered all the land into our hands!"', ta: 'எண்ணாகமம் 13-ல் பயத்தை விதைத்த 10 வேவுகாரருக்கு மாறாக, இவ்விருவரும் "கர்த்தர் தேசத்தை நம் கையில் ஒப்புக்கொடுத்தார்" என்று விசுவாச அறிக்கை அளித்தனர்.' },
    isActive: true,
  },
];

async function runSeed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    const deleteRes = await Question.deleteMany({ book: 'Joshua', chapter: 2 });
    console.log(`Cleared previous Joshua 2 questions: ${deleteRes.deletedCount}`);

    let insertedCount = 0;
    for (const q of joshua2Questions) {
      await Question.create(q);
      insertedCount++;
    }

    console.log(`Successfully updated and inserted ${insertedCount} clean questions for OT - Joshua Chapter 2!`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

runSeed();
