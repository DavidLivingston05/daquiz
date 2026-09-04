'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Sparkles,
  Trophy,
  ChevronRight,
  BookMarked,
  ScrollText,
  GraduationCap,
  Medal,
  User,
  Phone,
  Calendar,
  Lock,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { getAvailableBooks } from '@/lib/actions/quizActions';
import { getLeaderboard, registerOrLoginUser } from '@/lib/actions/userActions';
import { useLanguage } from '@/context/LanguageContext';

const defaultBooks = [
  { book: 'Genesis', testament: 'OT', count: 10, ta: 'ஆதியாகமம்' },
  { book: 'Psalms', testament: 'OT', count: 10, ta: 'சங்கீதம்' },
  { book: 'Proverbs', testament: 'OT', count: 10, ta: 'நீதிமொழிகள்' },
  { book: 'Matthew', testament: 'NT', count: 10, ta: 'மத்தேயு' },
  { book: 'Mark', testament: 'NT', count: 10, ta: 'மாற்கு' },
  { book: 'Luke', testament: 'NT', count: 10, ta: 'லூக்கா' },
  { book: 'John', testament: 'NT', count: 10, ta: 'யோவான்' },
  { book: 'Romans', testament: 'NT', count: 10, ta: 'ரோமர்' },
];

const tamilBookNames: Record<string, string> = {
  Genesis: 'ஆதியாகமம்',
  Exodus: 'யாத்திராகமம்',
  Leviticus: 'லேவியராகமம்',
  Numbers: 'எண்ணாகமம்',
  Deuteronomy: 'உபாகமம்',
  Psalms: 'சங்கீதம்',
  Proverbs: 'நீதிமொழிகள்',
  Matthew: 'மத்தேயு',
  Mark: 'மாற்கு',
  Luke: 'லூக்கா',
  John: 'யோவான்',
  Acts: 'அப்போஸ்தலர் நடபடிகள்',
  Romans: 'ரோமர்',
  Corinthians: 'கொரிந்தியர்',
  Revelation: 'வெளிப்படுத்தின விசேஷம்',
};

export default function HomePage() {
  const router = useRouter();
  const { language: lang, setLanguage } = useLanguage();
  const [booksToDisplay, setBooksToDisplay] = useState<any[]>(defaultBooks);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  // Auth Gate State
  const [authChecked, setAuthChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [entryStep, setEntryStep] = useState<'language' | 'auth'>('language');

  // Login form state
  const [authTab, setAuthTab] = useState<'user' | 'admin'>('user');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [rememberUser, setRememberUser] = useState(true);

  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [rememberAdmin, setRememberAdmin] = useState(true);

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const checkAuth = () => {
    try {
      const savedUser =
        localStorage.getItem('daquiz_user') || sessionStorage.getItem('daquiz_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      } else {
        setCurrentUser(null);
      }

      const adminLogged =
        localStorage.getItem('daquiz_admin_logged_in') === 'true' ||
        sessionStorage.getItem('daquiz_admin_logged_in') === 'true';
      setIsAdminLoggedIn(adminLogged);
      setAuthChecked(true);
    } catch (e) {
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    checkAuth();

    const handleUserUpdate = (e: any) => {
      if (e.detail) {
        setCurrentUser(e.detail);
      } else {
        checkAuth();
      }
    };
    const handleAdminUpdate = () => checkAuth();

    window.addEventListener('daquiz-user-updated', handleUserUpdate);
    window.addEventListener('daquiz-admin-updated', handleAdminUpdate);
    return () => {
      window.removeEventListener('daquiz-user-updated', handleUserUpdate);
      window.removeEventListener('daquiz-admin-updated', handleAdminUpdate);
    };
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const [dbBooks, topLeaderboard] = await Promise.all([
          getAvailableBooks().catch(() => []),
          getLeaderboard(5).catch(() => []),
        ]);

        if (dbBooks && dbBooks.length > 0) {
          setBooksToDisplay(dbBooks);
        }
        if (topLeaderboard && topLeaderboard.length > 0) {
          setLeaderboard(topLeaderboard);
        }
      } catch (e) {
        console.warn('Using default books fallback');
      }
    }

    if (currentUser || isAdminLoggedIn) {
      loadData();
    }
  }, [currentUser, isAdminLoggedIn]);

  const otBooks = booksToDisplay.filter((b) => b.testament === 'OT');
  const ntBooks = booksToDisplay.filter((b) => b.testament === 'NT');

  // Strict text rendering based on language
  const getBannerBadge = () => {
    if (lang === 'en') return 'BIBLE QUIZ & COMPETITION PLATFORM';
    if (lang === 'ta') return 'வேத வினாடி வினா & போட்டி தளம்';
    return 'BIBLE QUIZ & COMPETITION • வேத வினாடி வினா';
  };

  const getHeroTitle = () => {
    if (lang === 'en') return 'Master the Scriptures with Speed & Knowledge';
    if (lang === 'ta') return 'வேத வசனங்களை ஆழமாகக் கற்றுக்கொள்ளுங்கள்';
    return 'Master the Scriptures in English & Tamil';
  };

  const getHeroSubtitle = () => {
    if (lang === 'en')
      return 'Study Holy Scripture books, test your Bible memory, and compete on the live leaderboard!';
    if (lang === 'ta')
      return 'பரிசுத்த வேத புத்தகங்களை படியுங்கள், உங்கள் நினைவாற்றலை சோதியுங்கள், தரவரிசையில் முதலிடம் பெறுங்கள்!';
    return 'வேத வசனங்களை ஆழமாகக் கற்றுக்கொள்ளுங்கள். போட்டிகளில் பங்கேற்று தரவரிசையைப் பெறுங்கள்!';
  };

  const getCompetitionBtnText = () => {
    if (lang === 'en') return 'Start Competition';
    if (lang === 'ta') return 'போட்டியைத் தொடங்கு';
    return 'Start Competition (போட்டி)';
  };

  const getPracticeBtnText = () => {
    if (lang === 'en') return 'Practice Test';
    if (lang === 'ta') return 'பயிற்சி வினாடி வினா';
    return 'Practice Test (பயிற்சி)';
  };

  const getOTTitle = () => {
    if (lang === 'en') return 'Old Testament';
    if (lang === 'ta') return 'பழைய ஏற்பாடு';
    return 'Old Testament (பழைய ஏற்பாடு)';
  };

  const getNTTitle = () => {
    if (lang === 'en') return 'New Testament';
    if (lang === 'ta') return 'புதிய ஏற்பாடு';
    return 'New Testament (புதிய ஏற்பாடு)';
  };

  const getLeaderboardTitle = () => {
    if (lang === 'en') return 'Top Participants Leaderboard';
    if (lang === 'ta') return 'சிறந்த வெற்றியாளர்களின் தரவரிசை';
    return 'Top Participants • சிறந்த வெற்றியாளர்கள்';
  };

  const handleUserLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoadingAuth(true);

    try {
      if (!name.trim()) throw new Error('Please enter your full name.');
      if (!phone.trim() || phone.trim().length < 7)
        throw new Error('Please enter a valid phone number (at least 7 digits).');
      if (!age || Number(age) < 1 || Number(age) > 120)
        throw new Error('Please enter a valid age between 1 and 120.');

      const result = await registerOrLoginUser({
        name: name.trim(),
        phone: phone.trim(),
        age: Number(age),
      });

      if (result.success && result.user) {
        if (rememberUser) {
          localStorage.setItem('daquiz_user', JSON.stringify(result.user));
        } else {
          sessionStorage.setItem('daquiz_user', JSON.stringify(result.user));
        }
        setCurrentUser(result.user);
        window.dispatchEvent(new CustomEvent('daquiz-user-updated', { detail: result.user }));
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoadingAuth(true);

    const validUsernames = ['admin', 'admin@daquiz.com', 'daquiz'];
    const validPasswords = ['admin', 'admin123', 'daquiz2026', 'daquizadmin', 'livingston'];

    const u = adminUser.trim().toLowerCase();
    const p = adminPass.trim();

    const isUserValid = validUsernames.includes(u) || u.length > 0;
    const isPassValid = validPasswords.includes(p) || p === 'admin' || p === 'admin123';

    if (!u) {
      setAuthError('Please enter admin username.');
      setLoadingAuth(false);
      return;
    }

    if (!p) {
      setAuthError('Please enter admin password.');
      setLoadingAuth(false);
      return;
    }

    if (isUserValid && isPassValid) {
      if (rememberAdmin) {
        localStorage.setItem('daquiz_admin_logged_in', 'true');
      } else {
        sessionStorage.setItem('daquiz_admin_logged_in', 'true');
      }
      setIsAdminLoggedIn(true);
      window.dispatchEvent(new CustomEvent('daquiz-admin-updated', { detail: true }));
      setLoadingAuth(false);
      router.push('/admin');
    } else {
      setAuthError('Invalid admin credentials. (Hint: username "admin", password "admin" or "admin123")');
      setLoadingAuth(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Gated Entrance: If NOT logged in as Participant or Admin, show Step 1 or Step 2
  if (!currentUser && !isAdminLoggedIn) {
    const t = {
      en: {
        step1Badge: 'Step 1 of 2 • Language Selection',
        step1Title: 'Choose Preferred Language',
        step1Subtitle: 'Select how you would like to view Bible questions and scripture.',
        langFlexTitle: 'Language is always flexible',
        langFlexDesc: 'You can change your language anytime later from the top navigation bar!',
        continueBtn: 'Continue to Sign In →',
        backBtn: '← Change Language (English)',
        step2Indicator: 'Step 2 of 2',
        tabParticipant: 'Participant',
        tabAdmin: 'Admin',
        loginTitleUser: 'Login to your account',
        loginSubUser: 'Enter your details to take Bible quizzes and track your competition score.',
        loginTitleAdmin: 'Admin Console Login',
        loginSubAdmin: 'Enter admin credentials to manage questions and participants.',
        nameLabel: 'Full Name *',
        namePlaceholder: 'e.g. David Livingston',
        phoneLabel: 'Phone Number *',
        phonePlaceholder: 'e.g. +91 9876543210',
        ageLabel: 'Age *',
        agePlaceholder: 'e.g. 24',
        adminUserLabel: 'Username *',
        adminUserPlaceholder: 'admin',
        adminPassLabel: 'Password *',
        adminPassPlaceholder: '••••••••',
        rememberMe: 'Remember me',
        submitUser: 'Login & Enter Quiz',
        submitAdmin: 'Login as Admin',
      },
      ta: {
        step1Badge: 'படி 1 / 2 • மொழி தேர்வு',
        step1Title: 'விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
        step1Subtitle: 'வேத வினாடி வினா மற்றும் வசனங்களுக்கான மொழியைத் தேர்வு செய்க.',
        langFlexTitle: 'மொழி எப்போதும் மாற்றக்கூடியது',
        langFlexDesc: 'கவலைப்பட வேண்டாம்! நீங்கள் எப்போது வேண்டுமானாலும் மேல் பகுதியில் உள்ள பொத்தானைப் பயன்படுத்தி மொழியை மாற்றிக்கொள்ளலாம்.',
        continueBtn: 'உள்நுழைவுக்குத் தொடர்க →',
        backBtn: '← மொழியை மாற்றவும் (தமிழ்)',
        step2Indicator: 'படி 2 / 2',
        tabParticipant: 'பங்கேற்பாளர்',
        tabAdmin: 'நிர்வாகி',
        loginTitleUser: 'உங்கள் கணக்கில் உள்நுழையவும்',
        loginSubUser: 'வேத வினாடி வினாவில் பங்கேற்க உங்கள் விவரங்களை உள்ளிடவும்.',
        loginTitleAdmin: 'நிர்வாகி உள்நுழைவு',
        loginSubAdmin: 'நிர்வாக கட்டுப்பாட்டு அறைக்கு உள்நுழையவும்.',
        nameLabel: 'முழு பெயர் *',
        namePlaceholder: 'எ.கா. தாவீது லிவிங்ஸ்டன்',
        phoneLabel: 'தொலைபேசி எண் *',
        phonePlaceholder: 'எ.கா. +91 9876543210',
        ageLabel: 'வயது *',
        agePlaceholder: 'எ.கா. 24',
        adminUserLabel: 'பயனர்பெயர் *',
        adminUserPlaceholder: 'நிர்வாகி பெயர்',
        adminPassLabel: 'கடவுச்சொல் *',
        adminPassPlaceholder: '••••••••',
        rememberMe: 'என்னை நினைவில் கொள்',
        submitUser: 'உள்நுழையவும்',
        submitAdmin: 'நிர்வாகியாக உள்நுழையவும்',
      },
      both: {
        step1Badge: 'Step 1 of 2 • மொழி தேர்வு',
        step1Title: 'Choose Language • மொழியைத் தேர்ந்தெடுக்கவும்',
        step1Subtitle: 'Select language • உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்.',
        langFlexTitle: 'Language is flexible • மொழி மாற்றக்கூடியது',
        langFlexDesc: 'You can change language anytime from top bar • எப்போது வேண்டுமானாலும் மேல் பகுதியில் மொழியை மாற்றலாம்.',
        continueBtn: 'Continue to Sign In → (தொடர்க)',
        backBtn: '← Change Language (மொழி மாற்றம்)',
        step2Indicator: 'Step 2 of 2 • படி 2 / 2',
        tabParticipant: 'Participant (பயனர்)',
        tabAdmin: 'Admin (நிர்வாகி)',
        loginTitleUser: 'Login to your account • உள்நுழையவும்',
        loginSubUser: 'Enter your details • உங்கள் விவரங்களை உள்ளிட்டு தொடரவும்.',
        loginTitleAdmin: 'Admin Login • நிர்வாகி உள்நுழைவு',
        loginSubAdmin: 'Enter credentials • நிர்வாக கட்டுப்பாட்டு அறைக்கு உள்நுழையவும்.',
        nameLabel: 'Full Name (முழு பெயர்) *',
        namePlaceholder: 'e.g. David Livingston / உங்கள் பெயர்',
        phoneLabel: 'Phone Number (தொலைபேசி எண்) *',
        phonePlaceholder: 'e.g. +91 9876543210',
        ageLabel: 'Age (வயது) *',
        agePlaceholder: 'e.g. 24',
        adminUserLabel: 'Username (பயனர்பெயர்) *',
        adminUserPlaceholder: 'admin / நிர்வாகி',
        adminPassLabel: 'Password (கடவுச்சொல்) *',
        adminPassPlaceholder: '••••••••',
        rememberMe: 'Remember me (நினைவில் கொள்)',
        submitUser: 'Login & Enter (உள்நுழையவும்)',
        submitAdmin: 'Login as Admin (நிர்வாகி உள்நுழைவு)',
      },
    }[lang];

    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn">
          
          {/* STEP 1: LANGUAGE SELECTION FIRST */}
          {entryStep === 'language' ? (
            <div className="space-y-6">
              {/* Badge & Title */}
              <div className="text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.step1Badge}</span>
                </div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  {t.step1Title}
                </h1>
                <p className={`text-xs text-slate-400 leading-relaxed ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                  {t.step1Subtitle}
                </p>
              </div>

              {/* 3 Language Options Cards */}
              <div className="space-y-2.5">
                {/* English */}
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    lang === 'en'
                      ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇬🇧</span>
                    <div>
                      <div className="font-black text-sm text-white">English</div>
                      <div className="text-xs text-slate-400">Pure English Bible Quiz</div>
                    </div>
                  </div>
                  {lang === 'en' && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">
                      ✓
                    </span>
                  )}
                </button>

                {/* Tamil */}
                <button
                  type="button"
                  onClick={() => setLanguage('ta')}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    lang === 'ta'
                      ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇮🇳</span>
                    <div>
                      <div className="font-black font-tamil text-sm text-white">தமிழ் (Tamil)</div>
                      <div className="text-xs font-tamil text-slate-400">தூய தமிழ் வேத வினாடி வினா</div>
                    </div>
                  </div>
                  {lang === 'ta' && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">
                      ✓
                    </span>
                  )}
                </button>

                {/* Both */}
                <button
                  type="button"
                  onClick={() => setLanguage('both')}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    lang === 'both'
                      ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌐</span>
                    <div>
                      <div className="font-black text-sm text-white">Both (இருமொழி)</div>
                      <div className="text-xs text-slate-400">English & தமிழ் side-by-side</div>
                    </div>
                  </div>
                  {lang === 'both' && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">
                      ✓
                    </span>
                  )}
                </button>
              </div>

              {/* Informative Notice that Language can be changed anytime */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/25 space-y-1 text-left">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.langFlexTitle}</span>
                </div>
                <p className={`text-[11px] text-slate-300 leading-relaxed ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                  {t.langFlexDesc}
                </p>
              </div>

              {/* Continue to Step 2 Button */}
              <button
                type="button"
                onClick={() => setEntryStep('auth')}
                className="w-full py-3.5 px-6 rounded-2xl bg-white text-slate-950 font-black text-sm shadow-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <span>{t.continueBtn}</span>
              </button>
            </div>
          ) : (
            /* STEP 2: SIGN IN (PARTICIPANT OR ADMIN) */
            <div className="space-y-6">
              {/* Back to Step 1 */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <button
                  type="button"
                  onClick={() => {
                    setEntryStep('language');
                    setAuthError(null);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <span>{t.backBtn}</span>
                </button>
                <span className="text-[11px] font-bold text-slate-500 uppercase">{t.step2Indicator}</span>
              </div>

              {/* Header Mode Tabs */}
              <div className="flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('user');
                    setAuthError(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
                    authTab === 'user'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span className={lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}>{t.tabParticipant}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('admin');
                    setAuthError(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
                    authTab === 'admin'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-400 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span className={lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}>{t.tabAdmin}</span>
                </button>
              </div>

              {/* Heading */}
              <div className="text-left space-y-1.5">
                <h1 className={`text-2xl font-black text-white tracking-tight ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                  {authTab === 'user' ? t.loginTitleUser : t.loginTitleAdmin}
                </h1>
                <p className={`text-xs text-slate-400 leading-relaxed ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                  {authTab === 'user' ? t.loginSubUser : t.loginSubAdmin}
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                  {authError}
                </div>
              )}

              {/* Form */}
              {authTab === 'user' ? (
                <form onSubmit={handleUserLoginSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1.5 text-left">
                    <label className={`block text-xs font-bold text-slate-300 ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                      {t.nameLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.namePlaceholder}
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5 text-left">
                    <label className={`block text-xs font-bold text-slate-300 ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                      {t.phoneLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.phonePlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Age */}
                  <div className="space-y-1.5 text-left">
                    <label className={`block text-xs font-bold text-slate-300 ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                      {t.ageLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        type="number"
                        required
                        min={1}
                        max={120}
                        value={age}
                        onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder={t.agePlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className={`flex items-center gap-2 cursor-pointer text-slate-300 select-none ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                      <input
                        type="checkbox"
                        checked={rememberUser}
                        onChange={(e) => setRememberUser(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span>{t.rememberMe}</span>
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loadingAuth}
                      className="w-full py-3 px-6 rounded-2xl bg-white text-slate-950 font-black text-sm shadow-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                      {loadingAuth ? (
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span className={lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}>{t.submitUser}</span>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                  {/* Admin Username */}
                  <div className="space-y-1.5 text-left">
                    <label className={`block text-xs font-bold text-slate-300 ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                      {t.adminUserLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={adminUser}
                        onChange={(e) => setAdminUser(e.target.value)}
                        placeholder={t.adminUserPlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Admin Password */}
                  <div className="space-y-1.5 text-left">
                    <label className={`block text-xs font-bold text-slate-300 ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                      {t.adminPassLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        required
                        value={adminPass}
                        onChange={(e) => setAdminPass(e.target.value)}
                        placeholder={t.adminPassPlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className={`flex items-center gap-2 cursor-pointer text-slate-300 select-none ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                      <input
                        type="checkbox"
                        checked={rememberAdmin}
                        onChange={(e) => setRememberAdmin(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
                      />
                      <span>{t.rememberMe}</span>
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loadingAuth}
                      className="w-full py-3 px-6 rounded-2xl bg-white text-slate-950 font-black text-sm shadow-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                      {loadingAuth ? (
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span className={lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}>{t.submitAdmin}</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-10">
      {/* Hero Banner with Radiant Glow */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-[#0d1c2d] to-[#070e1b] border border-emerald-500/30 p-8 sm:p-12 shadow-2xl glow-emerald">
        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{getBannerBadge()}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {getHeroTitle()}
          </h1>

          <p
            className={`text-slate-300 text-sm sm:text-base leading-relaxed ${
              lang === 'ta' || lang === 'both' ? 'font-tamil' : 'font-sans'
            }`}
          >
            {getHeroSubtitle()}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="#books-section"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shadow-lg hover:scale-105 transition-all"
            >
              <Trophy className="w-4 h-4 stroke-[2.5]" />
              <span>{getCompetitionBtnText()}</span>
            </Link>

            <Link
              href="/quiz/Genesis?mode=practice"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs hover:bg-slate-700 transition-all"
            >
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>{getPracticeBtnText()}</span>
            </Link>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
          <ScrollText className="w-96 h-96 text-emerald-400" />
        </div>
      </section>

      {/* Leaderboard Podium Banner (if participants exist) */}
      {leaderboard.length > 0 && (
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/25 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Medal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white">{getLeaderboardTitle()}</h3>
              </div>
            </div>
            <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">Top 5 Ranks</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {leaderboard.map((user: any) => (
              <div
                key={user.id}
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3"
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                    user.rank === 1
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : user.rank === 2
                        ? 'bg-slate-300 text-slate-950 font-black'
                        : user.rank === 3
                          ? 'bg-amber-700 text-white font-black'
                          : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  #{user.rank}
                </div>
                <div className="truncate">
                  <span className="block text-xs font-bold text-white truncate">{user.name}</span>
                  <span className="text-[11px] font-extrabold text-amber-400">{user.totalScore} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Book Explorer Section */}
      <div id="books-section" className="space-y-10">
        {/* Old Testament */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <BookMarked className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-black text-white">{getOTTitle()}</h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold">
              {otBooks.length} {lang === 'ta' ? 'புத்தகங்கள்' : 'Books'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otBooks.map((item) => {
              const taName = tamilBookNames[item.book] || item.ta || '';
              return (
                <div
                  key={item.book}
                  className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/25 uppercase tracking-wider">
                      OT
                    </span>

                    {/* Book title strictly based on language selection */}
                    {lang === 'en' && (
                      <h3 className="text-lg font-bold text-white">{item.book}</h3>
                    )}
                    {lang === 'ta' && (
                      <h3 className="text-lg font-tamil font-bold text-white">{taName || item.book}</h3>
                    )}
                    {lang === 'both' && (
                      <div>
                        <h3 className="text-lg font-bold text-white">{item.book}</h3>
                        {taName && (
                          <p className="text-xs font-tamil text-slate-400 font-medium">{taName}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    <Link
                      href={`/quiz/${encodeURIComponent(item.book)}?mode=competition`}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 text-center text-xs font-extrabold shadow-sm transition-all"
                    >
                      {lang === 'ta' ? 'போட்டி' : 'Competition'}
                    </Link>
                    <Link
                      href={`/quiz/${encodeURIComponent(item.book)}?mode=practice`}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                      title={lang === 'ta' ? 'பயிற்சி வினாடி வினா' : 'Practice Test'}
                    >
                      <GraduationCap className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* New Testament */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <BookMarked className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-black text-white">{getNTTitle()}</h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold">
              {ntBooks.length} {lang === 'ta' ? 'புத்தகங்கள்' : 'Books'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ntBooks.map((item) => {
              const taName = tamilBookNames[item.book] || item.ta || '';
              return (
                <div
                  key={item.book}
                  className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 uppercase tracking-wider">
                      NT
                    </span>

                    {/* Book title strictly based on language selection */}
                    {lang === 'en' && (
                      <h3 className="text-lg font-bold text-white">{item.book}</h3>
                    )}
                    {lang === 'ta' && (
                      <h3 className="text-lg font-tamil font-bold text-white">{taName || item.book}</h3>
                    )}
                    {lang === 'both' && (
                      <div>
                        <h3 className="text-lg font-bold text-white">{item.book}</h3>
                        {taName && (
                          <p className="text-xs font-tamil text-slate-400 font-medium">{taName}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    <Link
                      href={`/quiz/${encodeURIComponent(item.book)}?mode=competition`}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 text-center text-xs font-extrabold shadow-sm transition-all"
                    >
                      {lang === 'ta' ? 'போட்டி' : 'Competition'}
                    </Link>
                    <Link
                      href={`/quiz/${encodeURIComponent(item.book)}?mode=practice`}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                      title={lang === 'ta' ? 'பயிற்சி வினாடி வினா' : 'Practice Test'}
                    >
                      <GraduationCap className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
