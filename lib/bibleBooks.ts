export interface BibleBookInfo {
  name: string;
  nameTa: string;
  testament: 'OT' | 'NT';
  totalChapters: number;
}

export const OLD_TESTAMENT_BOOKS: BibleBookInfo[] = [
  { name: 'Genesis', nameTa: 'ஆதியாகமம்', testament: 'OT', totalChapters: 50 },
  { name: 'Exodus', nameTa: 'யாத்திராகமம்', testament: 'OT', totalChapters: 40 },
  { name: 'Leviticus', nameTa: 'லேவியராகமம்', testament: 'OT', totalChapters: 27 },
  { name: 'Numbers', nameTa: 'எண்ணாகமம்', testament: 'OT', totalChapters: 36 },
  { name: 'Deuteronomy', nameTa: 'உபாகமம்', testament: 'OT', totalChapters: 34 },
  { name: 'Joshua', nameTa: 'யோசுவா', testament: 'OT', totalChapters: 24 },
  { name: 'Judges', nameTa: 'நியாயாதிபதிகள்', testament: 'OT', totalChapters: 21 },
  { name: 'Ruth', nameTa: 'ரூத்', testament: 'OT', totalChapters: 4 },
  { name: '1 Samuel', nameTa: '1 சாமுவேல்', testament: 'OT', totalChapters: 31 },
  { name: '2 Samuel', nameTa: '2 சாமுவேல்', testament: 'OT', totalChapters: 24 },
  { name: '1 Kings', nameTa: '1 இராஜாக்கள்', testament: 'OT', totalChapters: 22 },
  { name: '2 Kings', nameTa: '2 இராஜாக்கள்', testament: 'OT', totalChapters: 25 },
  { name: '1 Chronicles', nameTa: '1 நாளாகமம்', testament: 'OT', totalChapters: 29 },
  { name: '2 Chronicles', nameTa: '2 நாளாகமம்', testament: 'OT', totalChapters: 36 },
  { name: 'Ezra', nameTa: 'எஸ்றா', testament: 'OT', totalChapters: 10 },
  { name: 'Nehemiah', nameTa: 'நெகேமியா', testament: 'OT', totalChapters: 13 },
  { name: 'Esther', nameTa: 'எஸ்தர்', testament: 'OT', totalChapters: 10 },
  { name: 'Job', nameTa: 'யோபு', testament: 'OT', totalChapters: 42 },
  { name: 'Psalms', nameTa: 'சங்கீதம்', testament: 'OT', totalChapters: 150 },
  { name: 'Proverbs', nameTa: 'நீதிமொழிகள்', testament: 'OT', totalChapters: 31 },
  { name: 'Ecclesiastes', nameTa: 'பிரசங்கி', testament: 'OT', totalChapters: 12 },
  { name: 'Song of Solomon', nameTa: 'உன்னதப்பாட்டு', testament: 'OT', totalChapters: 8 },
  { name: 'Isaiah', nameTa: 'ஏசாயா', testament: 'OT', totalChapters: 66 },
  { name: 'Jeremiah', nameTa: 'எரேமியா', testament: 'OT', totalChapters: 52 },
  { name: 'Lamentations', nameTa: 'புலம்பல்', testament: 'OT', totalChapters: 5 },
  { name: 'Ezekiel', nameTa: 'எசேக்கியேல்', testament: 'OT', totalChapters: 48 },
  { name: 'Daniel', nameTa: 'தானியேல்', testament: 'OT', totalChapters: 12 },
  { name: 'Hosea', nameTa: 'ஓசியா', testament: 'OT', totalChapters: 14 },
  { name: 'Joel', nameTa: 'யோவேல்', testament: 'OT', totalChapters: 3 },
  { name: 'Amos', nameTa: 'ஆமோஸ்', testament: 'OT', totalChapters: 9 },
  { name: 'Obadiah', nameTa: 'ஒபதியா', testament: 'OT', totalChapters: 1 },
  { name: 'Jonah', nameTa: 'யோனா', testament: 'OT', totalChapters: 4 },
  { name: 'Micah', nameTa: 'மீகா', testament: 'OT', totalChapters: 7 },
  { name: 'Nahum', nameTa: 'நாகூம்', testament: 'OT', totalChapters: 3 },
  { name: 'Habakkuk', nameTa: 'ஆபகூக்', testament: 'OT', totalChapters: 3 },
  { name: 'Zephaniah', nameTa: 'செப்பனியா', testament: 'OT', totalChapters: 3 },
  { name: 'Haggai', nameTa: 'ஆகாய்', testament: 'OT', totalChapters: 2 },
  { name: 'Zechariah', nameTa: 'சகரியா', testament: 'OT', totalChapters: 14 },
  { name: 'Malachi', nameTa: 'மல்கியா', testament: 'OT', totalChapters: 4 },
];

export const NEW_TESTAMENT_BOOKS: BibleBookInfo[] = [
  { name: 'Matthew', nameTa: 'மத்தேயு', testament: 'NT', totalChapters: 28 },
  { name: 'Mark', nameTa: 'மாற்கு', testament: 'NT', totalChapters: 16 },
  { name: 'Luke', nameTa: 'லூக்கா', testament: 'NT', totalChapters: 24 },
  { name: 'John', nameTa: 'யோவான்', testament: 'NT', totalChapters: 21 },
  { name: 'Acts', nameTa: 'அப்போஸ்தலர் நடபடிகள்', testament: 'NT', totalChapters: 28 },
  { name: 'Romans', nameTa: 'ரோமர்', testament: 'NT', totalChapters: 16 },
  { name: '1 Corinthians', nameTa: '1 கொரிந்தியர்', testament: 'NT', totalChapters: 16 },
  { name: '2 Corinthians', nameTa: '2 கொரிந்தியர்', testament: 'NT', totalChapters: 13 },
  { name: 'Galatians', nameTa: 'கலாத்தியர்', testament: 'NT', totalChapters: 6 },
  { name: 'Ephesians', nameTa: 'எபேசியர்', testament: 'NT', totalChapters: 6 },
  { name: 'Philippians', nameTa: 'பிலிப்பியர்', testament: 'NT', totalChapters: 4 },
  { name: 'Colossians', nameTa: 'கொலோசெயர்', testament: 'NT', totalChapters: 4 },
  { name: '1 Thessalonians', nameTa: '1 தெசலோனிக்கேயர்', testament: 'NT', totalChapters: 5 },
  { name: '2 Thessalonians', nameTa: '2 தெசலோனிக்கேயர்', testament: 'NT', totalChapters: 3 },
  { name: '1 Timothy', nameTa: '1 தீமோத்தேயு', testament: 'NT', totalChapters: 6 },
  { name: '2 Timothy', nameTa: '2 தீமோத்தேயு', testament: 'NT', totalChapters: 4 },
  { name: 'Titus', nameTa: 'தீத்து', testament: 'NT', totalChapters: 3 },
  { name: 'Philemon', nameTa: 'பிலேமோன்', testament: 'NT', totalChapters: 1 },
  { name: 'Hebrews', nameTa: 'எபிரெயர்', testament: 'NT', totalChapters: 13 },
  { name: 'James', nameTa: 'யாக்கோபு', testament: 'NT', totalChapters: 5 },
  { name: '1 Peter', nameTa: '1 பேதுரு', testament: 'NT', totalChapters: 5 },
  { name: '2 Peter', nameTa: '2 பேதுரு', testament: 'NT', totalChapters: 3 },
  { name: '1 John', nameTa: '1 யோவான்', testament: 'NT', totalChapters: 5 },
  { name: '2 John', nameTa: '2 யோவான்', testament: 'NT', totalChapters: 1 },
  { name: '3 John', nameTa: '3 யோவான்', testament: 'NT', totalChapters: 1 },
  { name: 'Jude', nameTa: 'யூதா', testament: 'NT', totalChapters: 1 },
  { name: 'Revelation', nameTa: 'வெளிப்படுத்தின விசேஷம்', testament: 'NT', totalChapters: 22 },
];

export const ALL_BIBLE_BOOKS: BibleBookInfo[] = [
  ...OLD_TESTAMENT_BOOKS,
  ...NEW_TESTAMENT_BOOKS,
];

export const BIBLE_BOOK_MAP: Record<string, BibleBookInfo> = ALL_BIBLE_BOOKS.reduce(
  (acc, b) => {
    acc[b.name] = b;
    return acc;
  },
  {} as Record<string, BibleBookInfo>
);

export function getBooksByTestament(testament: 'OT' | 'NT'): BibleBookInfo[] {
  return testament === 'OT' ? OLD_TESTAMENT_BOOKS : NEW_TESTAMENT_BOOKS;
}
