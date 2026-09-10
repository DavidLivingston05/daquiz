import mongoose from 'mongoose';
import { Question } from '../models/Question';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://churchtechonly:Livingston@church.sn67zp8.mongodb.net/daquiz?retryWrites=true&w=majority&appName=Church';

export const joshua4Questions = [
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": -23,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "How many total stones were set up as memorials in the events of Joshua Chapter 4 (at Gilgal and in Jordan)?",
      "ta": "யோசுவா 4-ம் அதிகாரத்தின் நிகழ்வுகளில் நினைவுச் சின்னங்களாக நாட்டப்பட்ட மொத்த கற்கள் எத்தனை (கில்காலிலும் யோர்தானிலும்)?"
    },
    "options": [
      {
        "id": "opt_3",
        "text": {
          "en": "7 stones total",
          "ta": "மொத்தம் 7 கற்கள் மட்டுமே"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "12 stones total",
          "ta": "மொத்தம் 12 கற்கள் மட்டுமே"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "24 stones (12 in Jordan and 12 in Gilgal)",
          "ta": "24 கற்கள் (யோர்தானில் 12, கில்காலில் 12)"
        },
        "isCorrect": true
      },
      {
        "id": "opt_4",
        "text": {
          "en": "40 stones total",
          "ta": "மொத்தம் 40 கற்கள் மட்டுமே"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": -23,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "In which location did Joshua set up the twelve stones carried by the twelve representatives of the tribes?",
      "ta": "பன்னிரண்டு கோத்திரப் பிரதிநிதிகள் சுமந்து வந்த பன்னிரண்டு கற்களை யோசுவா எங்கே நாட்டினார்?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "Gilgal",
          "ta": "கில்கால்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_2",
        "text": {
          "en": "Shittim",
          "ta": "சித்தீம்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Ai",
          "ta": "ஆய்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "Jericho",
          "ta": "எரிகோ"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": -23,
    "difficulty": "hard",
    "category": "",
    "question": {
      "en": "The 10th day of the first month when Israel crossed Jordan was also significant in Exodus for what event?",
      "ta": "இஸ்ரவேலர் யோர்தானைக் கடந்த முதல் மாதம் 10-ஆம் தேதி யாத்திராகமத்தில் எந்த நிகழ்வுக்கு உரிய நாளாக இருந்தது?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "Selecting the Passover lamb",
          "ta": "பஸ்கா ஆட்டுக்குட்டியைத் தெரிந்தெடுக்கும் நாள்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_3",
        "text": {
          "en": "Feast of Tabernacles",
          "ta": "கூடாரப் பண்டிகை"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "The Day of Atonement",
          "ta": "பாவநிவாரண நாள்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Feast of Weeks / Pentecost",
          "ta": "பெந்தெகொஸ்தே பண்டிகை"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": -23,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "What did the returning waters of the Jordan do after the priests stepped onto dry land?",
      "ta": "ஆசாரியர்கள் கரையிலே ஏறியபின் திரும்பி வந்த யோர்தானின் தண்ணீர் என்ன செய்தது?"
    },
    "options": [
      {
        "id": "opt_3",
        "text": {
          "en": "Turned into sweet wine",
          "ta": "மதுரமான திராட்சரசமாக மாறியது"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "Overflowed all its banks as it did before",
          "ta": "முன்போல தன் கரைகளெல்லாம் புரண்டோடிற்று"
        },
        "isCorrect": true
      },
      {
        "id": "opt_2",
        "text": {
          "en": "Flowed backwards toward the mountains",
          "ta": "மலைகளை நோக்கிப் பின்னோக்கிப் பாய்ந்தது"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Vanished into an underground cave",
          "ta": "பூமிக்கு அடியில் உள்ள குகைக்குள் மறைந்தது"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": -23,
    "difficulty": "hard",
    "category": "",
    "question": {
      "en": "What two things did Joshua 4 declare about God’s hand and His people’s response?",
      "ta": "யோசுவா 4-ம் அதிகாரம் முடிவில் தேவனுடைய கரத்தைக் குறித்தும், ஜனங்களின் பிரதிபலிப்பைக் குறித்தும் கூறப்பட்ட இரண்டு காரியங்கள் யாவை?"
    },
    "options": [
      {
        "id": "opt_3",
        "text": {
          "en": "God's hand is only for Israel, and nations should flee",
          "ta": "தேவனின் கரம் இஸ்ரவேலுக்கு மட்டுமே, பிற ஜாதிகள் ஓட வேண்டும்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "God's hand is slow, and Israel should wait patiently",
          "ta": "தேவனின் கரம் தாமதமானது, ஜனங்கள் காத்திருக்க வேண்டும்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "The hand of the LORD is mighty, and Israel should fear Him forever",
          "ta": "கர்த்தருடைய கரம் பலத்தது என்றும், நீங்கள் அவருக்கு எந்நாளும் பயந்திருக்க வேண்டும் என்றும்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_4",
        "text": {
          "en": "God's hand needed human help to fight battles",
          "ta": "யுத்தம் செய்ய தேவனின் கரத்திற்கு மனித உதவி தேவைப்பட்டது"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": -1,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "What did the LORD command Joshua to tell the priests carrying the Ark?",
      "ta": "சாட்சிப் பெட்டியைச் சுமக்கிற ஆசாரியர்களுக்கு என்ன கட்டளையிடும்படி கர்த்தர் யோசுவாவுக்குச் சொன்னார்?"
    },
    "options": [
      {
        "id": "opt_2",
        "text": {
          "en": "\"Stay in the river until tomorrow\"",
          "ta": "\"நாளை வரை நதியிலேயே நில்லுங்கள்\""
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "\"Wash the Ark in the river\"",
          "ta": "\"பெட்டியை நதியில் கழுவுங்கள்\""
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "\"Come up out of the Jordan\"",
          "ta": "\"யோர்தானிலிருந்து கரையேறுங்கள்\""
        },
        "isCorrect": true
      },
      {
        "id": "opt_3",
        "text": {
          "en": "\"Pour oil into the waters\"",
          "ta": "\"தண்ணீரிலே எண்ணெயை ஊற்றுங்கள்\""
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 1,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "When did the LORD speak to Joshua regarding taking stones from the Jordan?",
      "ta": "யோர்தானிலிருந்து கற்களை எடுப்பது குறித்து கர்த்தர் எப்போது யோசுவாவோடு பேசினார்?"
    },
    "options": [
      {
        "id": "opt_2",
        "text": {
          "en": "Before anyone entered the river",
          "ta": "எவரும் நதியில் இறங்குவதற்கு முன்பாக"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "When all the people had completely crossed over the Jordan",
          "ta": "ஜனங்கள் எல்லாரும் யோர்தானைக் கடந்து தீர்ந்தபின்பு"
        },
        "isCorrect": true
      },
      {
        "id": "opt_3",
        "text": {
          "en": "After the walls of Jericho fell",
          "ta": "எரிகோவின் மதில்கள் இடிந்து விழுந்த பின்பு"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Seven days after entering Canaan",
          "ta": "கானானுக்குள் பிரவேசித்த ஏழு நாட்களுக்குப் பின்பு"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 2,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "How many men was Joshua commanded to select from among the people?",
      "ta": "ஜனங்களிலிருந்து எத்தனை மனுஷரைத் தெரிந்துகொள்ளும்படி யோசுவாவுக்குக் கட்டளையிடப்பட்டது?"
    },
    "options": [
      {
        "id": "opt_2",
        "text": {
          "en": "7 men",
          "ta": "7 மனுஷர்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "2 men",
          "ta": "2 மனுஷர்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "70 men",
          "ta": "70 மனுஷர்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "12 men",
          "ta": "12 மனுஷர்"
        },
        "isCorrect": true
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 2,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "How many men were chosen from each tribe of Israel according to Joshua 4:2?",
      "ta": "யோசுவா 4:2-ன்படி ஒவ்வொரு கோத்திரத்திலிருந்தும் எத்தனை மனுஷர் தெரிந்துகொள்ளப்பட்டனர்?"
    },
    "options": [
      {
        "id": "opt_3",
        "text": {
          "en": "Three men from every tribe",
          "ta": "ஒவ்வொரு கோத்திரத்திற்கும் மூன்று மனுஷர்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "Two men from every tribe",
          "ta": "ஒவ்வொரு கோத்திரத்திற்கும் இரண்டு மனுஷர்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Ten men from every tribe",
          "ta": "ஒவ்வொரு கோத்திரத்திற்கும் பத்து மனுஷர்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "One man from every tribe",
          "ta": "ஒவ்வொரு கோத்திரத்திற்கும் ஒவ்வொரு மனுஷன்"
        },
        "isCorrect": true
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 3,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "What were the twelve men commanded to take out of the midst of the Jordan?",
      "ta": "யோர்தானின் நடுவிலிருந்து அந்தப் பன்னிரண்டு மனுஷரும் எதை எடுத்துக்கொண்டு வர கட்டளையிடப்பட்டார்கள்?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "Twelve stones",
          "ta": "பன்னிரண்டு கற்கள்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Twelve fish",
          "ta": "பன்னிரண்டு மீன்கள்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "Twelve vessels of water",
          "ta": "பன்னிரண்டு தண்ணீர்ப் பாத்திரங்கள்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "Twelve olive branches",
          "ta": "பன்னிரண்டு ஒலிவ மரக் கிளைகள்"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 3,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "From which exact spot in the Jordan were the twelve stones to be taken?",
      "ta": "யோர்தானின் எந்த இடத்திலிருந்து பன்னிரண்டு கற்களும் எடுக்கப்பட வேண்டும்?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "Where the priests' feet stood firm",
          "ta": "ஆசாரியர்களின் கால்கள் நிலைத்து நின்ற இடம்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_4",
        "text": {
          "en": "From the outskirts of Jericho",
          "ta": "எரிகோவின் எல்லைப்புறம்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "From the eastern bank where they entered",
          "ta": "அவர்கள் இறங்கிய கிழக்குக் கரை"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "From the deepest underwater trench",
          "ta": "நதியின் மிக ஆழமான பள்ளம்"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 3,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "Where were the twelve stones taken from the Jordan to be placed and left?",
      "ta": "யோர்தானிலிருந்து எடுக்கப்பட்ட பன்னிரண்டு கற்களும் எங்கே கொண்டுபோய் வைக்கப்பட வேண்டும்?"
    },
    "options": [
      {
        "id": "opt_3",
        "text": {
          "en": "Inside the Tabernacle Tent",
          "ta": "ஆசரிப்புக் கூடாரத்திற்குள்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "At the top of Mount Sinai",
          "ta": "சீனாய் மலையின் உச்சியில்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Thrown into the Salt Sea",
          "ta": "உப்புக் கடலுக்குள்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "In the lodging place where they camped that night",
          "ta": "அவர்கள் அன்றிரவு தங்கும் தங்குமிடத்தில்"
        },
        "isCorrect": true
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 4,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "Whom did Joshua call together after receiving the command from the LORD?",
      "ta": "கர்த்தருடைய கட்டளையைப் பெற்ற பின்பு யோசுவா யாரை அழைத்தார்?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "The twelve men appointed from each tribe",
          "ta": "ஒவ்வொரு கோத்திரத்திலிருந்தும் நியமிக்கப்பட்ட பன்னிரண்டு மனுஷர்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_2",
        "text": {
          "en": "The army captains of Israel",
          "ta": "இஸ்ரவேலின் படைத்தலைவர்கள்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "The elders of the Canaanites",
          "ta": "கானானிய மூப்பர்கள்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "The two spies",
          "ta": "இரண்டு வேவுகாரர்கள்"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 5,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "How were the twelve men instructed to carry each stone out of the Jordan?",
      "ta": "அந்தப் பன்னிரண்டு மனுஷரும் ஒவ்வொரு கல்லையும் எவ்வாறு சுமந்து செல்லும்படி பணிக்கப்பட்டனர்?"
    },
    "options": [
      {
        "id": "opt_3",
        "text": {
          "en": "In their hands",
          "ta": "தங்கள் கைகளில்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "In a wooden cart",
          "ta": "மர வண்டியில்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "Upon his shoulder",
          "ta": "தன் தோளின் மேல்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_4",
        "text": {
          "en": "On donkeys",
          "ta": "கழுதைகளின் மேல்"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 5,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "Where were the twelve men told to cross over before taking the stones?",
      "ta": "கற்களை எடுப்பதற்கு முன்பாக அந்தப் பன்னிரண்டு மனுஷரும் எதற்கு முன்பாகக் கடந்துபோக வேண்டும்?"
    },
    "options": [
      {
        "id": "opt_4",
        "text": {
          "en": "Along the bank of Shittim",
          "ta": "சித்தீமின் கரையின் வழியே"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "Behind the entire camp of Israel",
          "ta": "இஸ்ரவேலின் முழுப் பாளையத்திற்கும் பின்னால்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "Straight to the gate of Jericho",
          "ta": "எரிகோவின் வாசலுக்கு நேராக"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "Before the Ark of the LORD your God into the midst of the Jordan",
          "ta": "உங்கள் தேவனாகிய கர்த்தரின் பெட்டிக்கு முன்பாக யோர்தானின் நடுவிலே"
        },
        "isCorrect": true
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 5,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "How was the total number of stones to be taken determined?",
      "ta": "எடுக்கப்பட வேண்டிய கற்களின் எண்ணிக்கை எதன் அடிப்படையில் தீர்மானிக்கப்பட்டது?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "According to the number of the tribes of Israel",
          "ta": "இஸ்ரவேல் புத்திரரின் கோத்திரங்களுடைய இலக்கத்திற்குச் சரியாக"
        },
        "isCorrect": true
      },
      {
        "id": "opt_2",
        "text": {
          "en": "According to the number of priests",
          "ta": "ஆசாரியர்களின் எண்ணிக்கையின்படி"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "According to the days of creation",
          "ta": "சிருஷ்டிப்பின் நாட்களின்படி"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "According to the years in the wilderness",
          "ta": "வனாந்தர வருடங்களின் எண்ணிக்கையின்படி"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 6,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "What purpose were these twelve stones intended to serve among the people?",
      "ta": "இந்தப் பன்னிரண்டு கற்களும் ஜனங்களுக்குள் என்னவாக இருக்கும்படி வைக்கப்பட்டன?"
    },
    "options": [
      {
        "id": "opt_2",
        "text": {
          "en": "A fortress wall",
          "ta": "ஒரு பாதுகாப்புக் கோட்டையாக"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "A sign among them for future generations",
          "ta": "எதிர்கால சந்ததிக்குள்ளே ஓர் அடையாளமாக"
        },
        "isCorrect": true
      },
      {
        "id": "opt_3",
        "text": {
          "en": "Weapons against enemies",
          "ta": "எதிரிகளுக்கு எதிரான ஆயுதமாக"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "A boundary marker between tribes",
          "ta": "கோத்திரங்களுக்கு இடையேயான எல்லைக் கல்லாக"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 6,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "What question did Joshua say children would ask their parents in time to come?",
      "ta": "வருங்காலத்திலே பிள்ளைகள் தங்கள் பிதாக்களை நோக்கி என்ன கேட்பார்கள் என்று யோசுவா கூறினார்?"
    },
    "options": [
      {
        "id": "opt_4",
        "text": {
          "en": "\"Who built the city of Jericho?\"",
          "ta": "\"எரிகோ பட்டணத்தைக் கட்டியது யார்?\""
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "\"What do these stones mean to you?\"",
          "ta": "\"இந்தக் கற்கள் உங்களுக்கு என்ன?\""
        },
        "isCorrect": true
      },
      {
        "id": "opt_3",
        "text": {
          "en": "\"Where is the Ark of the Covenant?\"",
          "ta": "\"உடன்படிக்கைப் பெட்டி எங்கே?\""
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "\"Why did we leave Egypt?\"",
          "ta": "\"நாம் ஏன் எகிப்தை விட்டு வந்தோம்?\""
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 7,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "What answer were parents instructed to give when asked about the meaning of the stones?",
      "ta": "கற்களின் அர்த்தத்தைக் குறித்து பிள்ளைகள் கேட்கும்போது பிதாக்கள் என்ன பதில் கூற வேண்டும்?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "The waters of the Jordan were cut off before the Ark of the Covenant",
          "ta": "கர்த்தருடைய உடன்படிக்கைப் பெட்டிக்கு முன்பாக யோர்தானின் தண்ணீர் அறுப்புண்டுபோயிற்று"
        },
        "isCorrect": true
      },
      {
        "id": "opt_3",
        "text": {
          "en": "Moses brought these stones from Mount Sinai",
          "ta": "மோசே சீனாய் மலையிலிருந்து இவற்றைக் கொண்டுவந்தார்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "These stones fell directly from the sky",
          "ta": "இக்கற்கள் வானத்திலிருந்து விழுந்தன"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "These stones were used to defeat the giants",
          "ta": "ராட்சதர்களை வீழ்த்த இந்தக் கற்கள் பயன்பட்டன"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 7,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "For how long were these stones to be a memorial to the children of Israel?",
      "ta": "இந்தக் கற்கள் இஸ்ரவேல் புத்திரருக்கு எவ்வளவு காலம் நினைவுச் சின்னமாய் இருக்க வேண்டும்?"
    },
    "options": [
      {
        "id": "opt_2",
        "text": {
          "en": "For forty years",
          "ta": "நாற்பது ஆண்டுகள் மட்டும்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "Forever",
          "ta": "என்றைக்கும்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_4",
        "text": {
          "en": "For seven generations",
          "ta": "ஏழு தலைமுறைகள் மட்டும்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "Until Joshua passed away",
          "ta": "யோசுவா மரிக்கும் வரை மட்டும்"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 8,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "Did the children of Israel obey the command given by Joshua regarding the stones?",
      "ta": "கற்களைக் குறித்து யோசுவா கட்டளையிட்டபடியே இஸ்ரவேல் புத்திரர் செய்தார்களா?"
    },
    "options": [
      {
        "id": "opt_4",
        "text": {
          "en": "They postponed it to the next day",
          "ta": "அடுத்த நாளுக்கு ஒத்திவைத்தார்கள்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "Yes, they did so just as Joshua commanded",
          "ta": "ஆம், யோசுவா கட்டளையிட்டபடியே செய்தார்கள்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_2",
        "text": {
          "en": "No, they refused and left the stones",
          "ta": "இல்லை, அவர்கள் மறுத்து கற்களை விட்டுவிட்டனர்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "They only took five stones instead",
          "ta": "ஐந்து கற்களை மட்டுமே எடுத்தார்கள்"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 8,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "Where did the twelve men carry the stones after picking them up from the riverbed?",
      "ta": "நதியின் நடுவிலிருந்து எடுத்த கற்களை அந்தப் பன்னிரண்டு மனுஷரும் எங்கே கொண்டு சென்றார்கள்?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "To the place where they lodged and laid them down there",
          "ta": "தாங்கள் தங்கும் இடத்திற்குக் கொண்டுபோய், அங்கே வைத்தார்கள்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_2",
        "text": {
          "en": "To the king of Jericho",
          "ta": "எரிகோவின் ராஜாவிடம்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "To the top of Mount Nebo",
          "ta": "நேபோ மலையின் உச்சிக்கு"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "Back into the desert of Paran",
          "ta": "பாரான் வனாந்தரத்திற்கு"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 9,
    "difficulty": "hard",
    "category": "",
    "question": {
      "en": "Where did Joshua set up another set of twelve stones according to Joshua 4:9?",
      "ta": "யோசுவா 4:9-ன்படி, யோசுவா வேறொரு பன்னிரண்டு கற்களை எங்கே நாட்டி வைத்தார்?"
    },
    "options": [
      {
        "id": "opt_2",
        "text": {
          "en": "In the center of Jericho's marketplace",
          "ta": "எரிகோவின் சந்தை நடுவில்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "At the camp of Shittim",
          "ta": "சித்தீம் பாளையத்தில்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "In the midst of the Jordan, where the priests' feet stood",
          "ta": "யோர்தானின் நடுவிலே ஆசாரியர்களின் கால்கள் நின்ற இடத்திலே"
        },
        "isCorrect": true
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Inside the city of Ai",
          "ta": "ஆய் பட்டணத்திற்குள்"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 9,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "What note does the biblical author add about the twelve stones set up in the midst of the Jordan?",
      "ta": "யோர்தானின் நடுவில் நாட்டப்பட்ட பன்னிரண்டு கற்களைக் குறித்து ஆசிரியர் என்ன குறிப்பிடுகிறார்?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "\"And they are there to this day\"",
          "ta": "\"அவைகள் இந்நாள்வரைக்கும் அங்கே இருக்கிறது\""
        },
        "isCorrect": true
      },
      {
        "id": "opt_4",
        "text": {
          "en": "\"And the priests carried them away later\"",
          "ta": "\"ஆசாரியர்கள் பின்னர் அவற்றை எடுத்துச் சென்றனர்\""
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "\"And they were washed away the next day\"",
          "ta": "\"அடுத்த நாளே அவைகள் அடித்துச் செல்லப்பட்டன\""
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "\"And the enemies destroyed them\"",
          "ta": "\"எதிரிகள் அவற்றை அழித்துப் போட்டனர்\""
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 10,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "How long did the priests bearing the Ark stand in the midst of the Jordan?",
      "ta": "உடன்படிக்கைப் பெட்டியைச் சுமந்த ஆசாரியர்கள் யோர்தானின் நடுவில் எதுவரை நின்றார்கள்?"
    },
    "options": [
      {
        "id": "opt_3",
        "text": {
          "en": "For exactly one hour",
          "ta": "ஒரு மணி நேரம் மட்டும்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "Until everything was finished that the LORD commanded Joshua",
          "ta": "கர்த்தர் யோசுவாவுக்குக் கட்டளையிட்ட எல்லாக் காரியங்களும் முடியும் வரை"
        },
        "isCorrect": true
      },
      {
        "id": "opt_2",
        "text": {
          "en": "Only until noon",
          "ta": "நண்பகல் வரை மட்டும்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Until the water began to touch their shoulders",
          "ta": "தண்ணீர் தோள்களைத் தொடும் வரை"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 10,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "In what manner did the people cross over the Jordan River according to Joshua 4:10?",
      "ta": "யோசுவா 4:10-ன்படி ஜனங்கள் யோர்தானைக் கடக்கும்போது எவ்வாறு கடந்தார்கள்?"
    },
    "options": [
      {
        "id": "opt_2",
        "text": {
          "en": "The people walked very slowly and rested",
          "ta": "ஜனங்கள் மெதுவாக நடந்து இளைப்பாறினார்கள்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "The people crawled on their knees",
          "ta": "ஜனங்கள் முழங்காலிட்டு ஊர்ந்து சென்றார்கள்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "The people hurried and crossed over",
          "ta": "ஜனங்கள் தீவிரமாய்க் கடந்துபோனார்கள்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_4",
        "text": {
          "en": "The people waited until nightfall to run",
          "ta": "இரவு வரை காத்திருந்து ஓடினார்கள்"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 10,
    "difficulty": "hard",
    "category": "",
    "question": {
      "en": "Whose previous commandment to Joshua is referenced regarding what was finished in Joshua 4:10?",
      "ta": "யோசுவா 4:10-ல் யோசுவாவுக்கு கட்டளையிட்டதாகக் குறிப்பிடப்பட்டுள்ள முந்தைய தலைவர் யார்?"
    },
    "options": [
      {
        "id": "opt_3",
        "text": {
          "en": "Caleb",
          "ta": "காலேப்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "Moses",
          "ta": "மோசே"
        },
        "isCorrect": true
      },
      {
        "id": "opt_2",
        "text": {
          "en": "Aaron",
          "ta": "ஆரோன்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Phinehas",
          "ta": "பினெகாஸ்"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 11,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "What crossed over the Jordan after all the people had completely passed over?",
      "ta": "ஜனங்கள் எல்லாரும் கடந்து தீர்ந்த பின்பு யோர்தானைக் கடந்து சென்றது எது?"
    },
    "options": [
      {
        "id": "opt_4",
        "text": {
          "en": "The chariots of Pharaoh",
          "ta": "பார்வோனின் இரதங்கள்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "The Ark of the LORD and the priests in the presence of the people",
          "ta": "கர்த்தருடைய பெட்டியும் ஆசாரியர்களும் ஜனங்களுக்கு முன்பாக"
        },
        "isCorrect": true
      },
      {
        "id": "opt_3",
        "text": {
          "en": "The captured Canaanite spies",
          "ta": "பிடிபட்ட கானானிய வேவுகாரர்கள்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "The livestock and cattle alone",
          "ta": "ஆடுமாடுகள் மட்டும் தனியாக"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 12,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "Which tribes crossed over armed before the children of Israel as Moses had directed them?",
      "ta": "மோசே தங்களுக்குச் சொல்லியிருந்தபடி இஸ்ரவேல் புத்திரருக்கு முன்பாக ஆயுதம் தரித்துக்கொண்டு கடந்துபோன கோத்திரங்கள் எவை?"
    },
    "options": [
      {
        "id": "opt_4",
        "text": {
          "en": "Zebulun, Issachar, and Naphtali",
          "ta": "செபுலோன், இசக்கார், நப்தலி"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "Judah, Benjamin, and Simeon",
          "ta": "யூதா, பென்யமீன், சிமியோன்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "Levi, Ephraim, and Dan",
          "ta": "லேவி, எப்பிராயீம், தாண்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "Reuben, Gad, and half the tribe of Manasseh",
          "ta": "ரூபன், காத், மனாசேயின் பாதிக்கோத்திரத்தார்"
        },
        "isCorrect": true
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 12,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "How did the men of Reuben, Gad, and half of Manasseh march across the Jordan?",
      "ta": "ரூபன், காத், மனாசேயின் பாதிக் கோத்திரத்தின் மனுஷர் யோர்தானை எவ்வாறு கடந்து சென்றார்கள்?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "Armed for battle before the children of Israel",
          "ta": "இஸ்ரவேல் புத்திரருக்கு முன்பாக அணிவகுத்து ஆயுதம் தரித்தவர்களாய்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_3",
        "text": {
          "en": "Trailing at the very rear of the camp",
          "ta": "பாளையத்தின் கடைசியில் பின் தங்கி"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "Without any armor or weapons",
          "ta": "ஆயுதங்கள் எதுவும் இல்லாமல்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Carrying the Tabernacle curtains",
          "ta": "கூடாரத்தின் திரைகளைச் சுமந்து"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 13,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "About how many armed men crossed over before the LORD for battle in Joshua 4:13?",
      "ta": "யோசுவா 4:13-ன்படி யுத்தத்திற்கு ஆயத்தமான ஏறக்குறைய எத்தனை பேர் கர்த்தருக்கு முன்பாகக் கடந்துபோனார்கள்?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "About 40,000",
          "ta": "ஏறக்குறைய 40,000 பேர்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_3",
        "text": {
          "en": "About 100,000",
          "ta": "ஏறக்குறைய 100,000 பேர்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "About 10,000",
          "ta": "ஏறக்குறைய 10,000 பேர்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "About 600,000",
          "ta": "ஏறக்குறைய 600,000 பேர்"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 13,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "To which specific area or plains did the armed men cross over for battle?",
      "ta": "யுத்தத்திற்கு ஆயத்தமான வீரர்கள் எந்தச் சமபூமிக்குக் கடந்துபோனார்கள்?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "The plains of Jericho",
          "ta": "எரிகோவின் சமபூமி"
        },
        "isCorrect": true
      },
      {
        "id": "opt_2",
        "text": {
          "en": "The valley of Hinnom",
          "ta": "இன்னோம் பள்ளத்தாக்கு"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "The plains of Moab",
          "ta": "மோவாபின் சமபூமி"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "The valley of Jezreel",
          "ta": "யெஸ்ரயேல் பள்ளத்தாக்கு"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 14,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "What did the LORD do for Joshua on that momentous day of crossing?",
      "ta": "யோர்தானைக் கடந்த அந்நாளில் கர்த்தர் யோசுவாவுக்கு என்ன செய்தார்?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "Exalted him in the sight of all Israel",
          "ta": "சகல இஸ்ரவேலரின் கண்களுக்கு முன்பாகவும் அவனை மேன்மைப்படுத்தினார்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_2",
        "text": {
          "en": "Sent him back to Egypt as governor",
          "ta": "அவனை எகிப்தின் ஆளுநராகத் திருப்பி அனுப்பினார்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "Gave him a golden crown",
          "ta": "அவருக்குப் பொற்கிரீடம் அளித்தார்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Replaced him with Caleb",
          "ta": "காலேபைக் கொண்டு அவரை மாற்றினார்"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 14,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "How did the people of Israel revere / fear Joshua throughout his life?",
      "ta": "இஸ்ரவேலர் யோசுவாவின் ஆயுள் நாளெல்லாம் அவருக்கு எவ்வாறு பயபக்தியாய் இருந்தார்கள்?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "As they had feared Moses",
          "ta": "மோசேக்குப் பயந்திருந்ததுபோல"
        },
        "isCorrect": true
      },
      {
        "id": "opt_2",
        "text": {
          "en": "As they feared Pharaoh",
          "ta": "பார்வோனுக்குப் பயந்திருந்ததுபோல"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Only during times of war",
          "ta": "யுத்த காலத்தில் மட்டும்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "With reluctance and rebellion",
          "ta": "முறுமுறுப்போடும் கசப்போடும்"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 14,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "For how long did the Israelites show reverence and fear toward Joshua?",
      "ta": "இஸ்ரவேல் ஜனங்கள் யோசுவாவுக்கு எவ்வளவு காலம் பயந்திருந்தார்கள்?"
    },
    "options": [
      {
        "id": "opt_3",
        "text": {
          "en": "Until they conquered Jericho",
          "ta": "எரிகோவை வெல்லும் வரை மட்டுமே"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "Only for forty days",
          "ta": "நாற்பது நாட்கள் மட்டுமே"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "For seven years",
          "ta": "ஏழு ஆண்டுகள் மட்டுமே"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "All the days of his life",
          "ta": "அவருடைய ஆயுள் நாளெல்லாம்"
        },
        "isCorrect": true
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 16,
    "difficulty": "hard",
    "category": "",
    "question": {
      "en": "By what title is the Ark referred to in Joshua 4:16 when the Lord commands the priests to come up?",
      "ta": "யோசுவா 4:16-ல் கர்த்தர் ஆசாரியர்களைக் கரையேறக் கட்டளையிடும்போது அந்தப் பெட்டி எவ்வாறு அழைக்கப்படுகிறது?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "The Ark of the Testimony",
          "ta": "சாட்சிப் பெட்டி"
        },
        "isCorrect": true
      },
      {
        "id": "opt_4",
        "text": {
          "en": "The Ark of Strength",
          "ta": "வல்லமையின் பெட்டி"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "The Ark of Gold",
          "ta": "பொற்பெட்டி"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "The Ark of Mercy",
          "ta": "கிருபையின் பெட்டி"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 17,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "What command did Joshua give to the priests after speaking with the LORD?",
      "ta": "கர்த்தரோடு பேசிய பின்பு ஆசாரியர்களுக்கு யோசுவா என்ன கட்டளையிட்டார்?"
    },
    "options": [
      {
        "id": "opt_4",
        "text": {
          "en": "\"Offer sacrifices in the riverbed\"",
          "ta": "\"நதியின் நடுவே பலியிடுங்கள்\""
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "\"March toward Jerusalem\"",
          "ta": "\"எருசலேமை நோக்கி நடங்கள்\""
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "\"Blow the trumpets\"",
          "ta": "\"எக்காளங்களை ஊதுங்கள்\""
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "\"Come up out of the Jordan\"",
          "ta": "\"யோர்தானிலிருந்து கரையேறி வாருங்கள்\""
        },
        "isCorrect": true
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 18,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "What happened the moment the soles of the priests' feet touched the dry land on the bank?",
      "ta": "ஆசாரியர்களின் உள்ளங்கால்கள் கரையின் உலர்நிலத்தில் பட்ட உடனே என்ன நடந்தது?"
    },
    "options": [
      {
        "id": "opt_4",
        "text": {
          "en": "Fire consumed the opposite bank",
          "ta": "மறுகரையில் அக்கினி பற்றி எரிந்தது"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "The river remained completely dry forever",
          "ta": "நதி என்றென்றைக்கும் காய்ந்த நிலையிலேயே இருந்தது"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "An earthquake destroyed the riverbed",
          "ta": "பூமி அதிர்ந்து நதிப்பள்ளம் அழிந்தது"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "The waters of the Jordan returned and overflowed all its banks as before",
          "ta": "யோர்தானின் தண்ணீர் தன் இடத்திற்குத் திரும்பி, முன்போல் கரைகளெல்லாம் புரண்டோடிற்று"
        },
        "isCorrect": true
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 18,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "Who were the last ones to step out of the midst of the dry Jordan riverbed?",
      "ta": "உலர்ந்த யோர்தான் நதியின் நடுவிலிருந்து கடைசியாக வெளியேறியவர்கள் யார்?"
    },
    "options": [
      {
        "id": "opt_2",
        "text": {
          "en": "The warriors of Reuben",
          "ta": "ரூபன் கோத்திர வீரர்கள்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Joshua alone",
          "ta": "யோசுவா மட்டும்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "The priests bearing the Ark of the Covenant",
          "ta": "உடன்படிக்கைப் பெட்டியைச் சுமந்த ஆசாரியர்கள்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_3",
        "text": {
          "en": "The women and children of Israel",
          "ta": "இஸ்ரவேலின் பெண்களும் குழந்தைகளும்"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 19,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "On which specific day of the month did the Israelites come up out of the Jordan?",
      "ta": "எந்த மாதத்தின் எத்தனையாம் தேதியிலே ஜனங்கள் யோர்தானிலிருந்து கரையேறினார்கள்?"
    },
    "options": [
      {
        "id": "opt_2",
        "text": {
          "en": "Fourteenth day of the first month",
          "ta": "முதல் மாதம் பதினான்காம் தேதி"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Fifteenth day of the second month",
          "ta": "இரண்டாம் மாதம் பதினைந்தாம் தேதி"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "First day of the seventh month",
          "ta": "ஏழாம் மாதம் முதல் தேதி"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "Tenth day of the first month",
          "ta": "முதல் மாதம் பத்தாம் தேதி"
        },
        "isCorrect": true
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 19,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "Where did the children of Israel camp after coming up from the Jordan?",
      "ta": "யோர்தானிலிருந்து கரையேறிய பின்பு இஸ்ரவேல் புத்திரர் எங்கே பாளயமிறங்கினார்கள்?"
    },
    "options": [
      {
        "id": "opt_2",
        "text": {
          "en": "At Mount Ebal",
          "ta": "ஏபால் மலையிலே"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "At Shiloh",
          "ta": "சீலோவிலே"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "In Bethlehem",
          "ta": "பெத்லெகேமிலே"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "In Gilgal on the eastern border of Jericho",
          "ta": "எரிகோவுக்குக் கிழக்கெல்லையான கில்காலிலே"
        },
        "isCorrect": true
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 19,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "On which side/border of Jericho was Gilgal located?",
      "ta": "எரிகோவின் எந்தப் பக்க எல்லையிலே கில்கால் அமைந்திருந்தது?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "East border",
          "ta": "கிழக்கெல்லையில்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_2",
        "text": {
          "en": "West border",
          "ta": "மேற்கெல்லையில்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "North border",
          "ta": "வடக்கெல்லையில்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "South border",
          "ta": "தெற்கெல்லையில்"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 20,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "Where did Joshua set up the twelve stones that were taken out of the Jordan?",
      "ta": "யோர்தானிலிருந்து எடுத்துக்கொண்டு வந்த பன்னிரண்டு கற்களையும் யோசுவா எங்கே நாட்டி வைத்தார்?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "In Gilgal",
          "ta": "கில்காலிலே"
        },
        "isCorrect": true
      },
      {
        "id": "opt_3",
        "text": {
          "en": "In Hebron",
          "ta": "எபிரோனிலே"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "At Bethel",
          "ta": "பெத்தேலிலே"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "In Jerusalem",
          "ta": "எருசலேமிலே"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 20,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "Who set up the twelve memorial stones in Gilgal?",
      "ta": "கில்காலிலே பன்னிரண்டு நினைவுக்கற்களை நாட்டி வைத்தவர் யார்?"
    },
    "options": [
      {
        "id": "opt_2",
        "text": {
          "en": "Eleazar the priest",
          "ta": "ஆசாரியனாகிய எலெயாசார்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "Caleb the son of Jephunneh",
          "ta": "எப்புன்னேயின் குமாரன் காலேப்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "The king of Moab",
          "ta": "மோவாபின் ராஜா"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "Joshua",
          "ta": "யோசுவா"
        },
        "isCorrect": true
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 21,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "What did Joshua say future children would ask their fathers regarding the monument in Gilgal?",
      "ta": "வருங்காலத்தில் பிள்ளைகள் தங்கள் பிதாக்களிடத்தில் எதைக் குறித்துக் கேட்பார்கள் என்று யோசுவா கூறினார்?"
    },
    "options": [
      {
        "id": "opt_3",
        "text": {
          "en": "\"Where did the manna come from?\"",
          "ta": "\"மன்னா எங்கிருந்து வந்தது?\""
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "\"How tall were the walls of Jericho?\"",
          "ta": "\"எரிகோவின் மதில்கள் எவ்வளவு உயரம்?\""
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "\"What are these stones?\"",
          "ta": "\"இந்தக் கற்கள் என்ன?\""
        },
        "isCorrect": true
      },
      {
        "id": "opt_2",
        "text": {
          "en": "\"Who will lead us into battle?\"",
          "ta": "\"நம்மை யுத்தத்திற்கு யார் வழிநடத்துவார்?\""
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 22,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "What key message were parents to tell their children according to Joshua 4:22?",
      "ta": "யோசுவா 4:22-ன்படி பெற்றோர் தங்கள் பிள்ளைகளுக்கு என்ன அறிவிக்க வேண்டும்?"
    },
    "options": [
      {
        "id": "opt_4",
        "text": {
          "en": "\"Israel flew over the river on eagles' wings\"",
          "ta": "\"இஸ்ரவேலர் கழுகின் சிறகுகளால் பறந்து கடந்தார்கள்\""
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "\"Israel crossed over this Jordan on dry land\"",
          "ta": "\"இஸ்ரவேலர் உலர்ந்த தரை வழியாய் இந்த யோர்தானைக் கடந்துவந்தார்கள்\""
        },
        "isCorrect": true
      },
      {
        "id": "opt_3",
        "text": {
          "en": "\"Israel paid gold to the Canaanite ferrymen\"",
          "ta": "\"இஸ்ரவேலர் படகோட்டிகளுக்குப் பொன் கொடுத்துக் கடந்தார்கள்\""
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "\"Israel built ships to cross the river\"",
          "ta": "\"இஸ்ரவேலர் கப்பல்களைக் கட்டி நதியைக் கடந்தார்கள்\""
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 23,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "To which prior miracle does Joshua compare the drying up of the Jordan River?",
      "ta": "யோர்தானின் தண்ணீரை உலரப்பண்ணிய அற்புதத்தை யோசுவா இதற்கு முன் நடந்த எந்த அற்புதத்தோடு ஒப்பிடுகிறார்?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "The parting and drying up of the Red Sea",
          "ta": "செங்கடலை உலரப்பண்ணின அற்புதம்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_4",
        "text": {
          "en": "Noah's flood receded from the earth",
          "ta": "நோவாவின் காலத்து வெள்ளப்பெருக்கு வற்றிய அற்புதம்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "The bitter waters of Marah turned sweet",
          "ta": "மாரா என்னுமிடத்தில் கசப்பான தண்ணீர் மதுரமான அற்புதம்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_2",
        "text": {
          "en": "Water coming from the rock at Horeb",
          "ta": "ஓரேபில் கன்மலையிலிருந்து தண்ணீர் புறப்பட்ட அற்புதம்"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 23,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "Who dried up the waters of the Jordan and the Red Sea according to Joshua 4:23?",
      "ta": "யோசுவா 4:23-ன்படி யோர்தானின் தண்ணீரையும் செங்கடலையும் உலரப்பண்ணியது யார்?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "The LORD your God",
          "ta": "உங்கள் தேவனாகிய கர்த்தர்"
        },
        "isCorrect": true
      },
      {
        "id": "opt_2",
        "text": {
          "en": "Moses through his own power",
          "ta": "மோசே தனது சொந்த வல்லமையால்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "The priests with their prayers",
          "ta": "ஆசாரியர்கள் தங்கள் ஜெபங்களால்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "Natural summer winds",
          "ta": "இயற்கையான கோடைகாலக் காற்று"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 24,
    "difficulty": "easy",
    "category": "",
    "question": {
      "en": "What did Joshua say all the peoples of the earth would know through this miracle?",
      "ta": "இந்த அற்புதத்தின் மூலம் பூமியின் சகல ஜனங்களும் என்ன அறிந்து கொள்ள வேண்டும் என்று யோசுவா கூறினார்?"
    },
    "options": [
      {
        "id": "opt_2",
        "text": {
          "en": "That Israel was the largest army on earth",
          "ta": "இஸ்ரவேலின் படை பூமியிலேயே பெரியதென்று"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "That the Jordan was a magical river",
          "ta": "யோர்தான் ஒரு மாயாஜால நதியென்று"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "That Joshua was a divine king",
          "ta": "யோசுவா ஒரு தெய்வீக ராஜாவென்று"
        },
        "isCorrect": false
      },
      {
        "id": "opt_1",
        "text": {
          "en": "That the hand of the LORD is mighty",
          "ta": "கர்த்தருடைய கரம் பலத்ததென்று"
        },
        "isCorrect": true
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  },
  {
    "testament": "OT",
    "book": "Joshua",
    "chapter": 4,
    "verse": 24,
    "difficulty": "medium",
    "category": "",
    "question": {
      "en": "What was the ultimate spiritual purpose for Israel regarding the Lord their God in Joshua 4:24?",
      "ta": "யோசுவா 4:24-ன்படி இஸ்ரவேலர் தங்கள் தேவனாகிய கர்த்தரிடத்தில் செய்ய வேண்டிய இறுதி நோக்கம் என்ன?"
    },
    "options": [
      {
        "id": "opt_1",
        "text": {
          "en": "That you may fear the LORD your God forever",
          "ta": "நீங்கள் உங்கள் தேவனாகிய கர்த்தருக்கு எந்நாளும் பயந்திருக்கும்படிக்கு"
        },
        "isCorrect": true
      },
      {
        "id": "opt_2",
        "text": {
          "en": "That they would conquer the entire world",
          "ta": "அவர்கள் உலகம் முழுவதையும் ஆள வேண்டும்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_3",
        "text": {
          "en": "That they would stop offering sacrifices",
          "ta": "அவர்கள் பலி செலுத்துவதை நிறுத்த வேண்டும்"
        },
        "isCorrect": false
      },
      {
        "id": "opt_4",
        "text": {
          "en": "That they would never build stone monuments again",
          "ta": "இனி அவர்கள் நினைவுக்கற்களை நடவே கூடாது"
        },
        "isCorrect": false
      }
    ],
    "explanation": {
      "en": "",
      "ta": ""
    },
    "isActive": true
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    const deleteRes = await Question.deleteMany({ book: 'Joshua', chapter: 4 });
    console.log(`Deleted ${deleteRes.deletedCount} existing questions for Joshua 4`);

    const insertRes = await Question.insertMany(joshua4Questions);
    console.log(`Successfully inserted ${insertRes.length} questions for Joshua 4!`);

    const count = await Question.countDocuments({ book: 'Joshua', chapter: 4 });
    console.log(`Total questions in Joshua 4: ${count}`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (err) {
    console.error('Error seeding questions:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  seed();
}
