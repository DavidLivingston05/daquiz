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
  Flame,
  CheckCircle2,
  Users,
  Compass,
  Crown,
  Zap,
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
  const [leaderboardTab, setLeaderboardTab] = useState<'global' | 'group'>('global');

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
          getLeaderboard(10).catch(() => []),
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

  const handleUserLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoadingAuth(true);

    try {
      if (!name.trim()) throw new Error('Please enter your name.');
      if (!phone.trim() || phone.trim().length < 7)
        throw new Error('Please enter a valid phone number.');
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
      setAuthError('Invalid admin credentials. (Hint: username "admin", password "admin")');
      setLoadingAuth(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ================= GATED ENTRANCE (STEP 1 & STEP 2) =================
  if (!currentUser && !isAdminLoggedIn) {
    const t = {
      en: {
        step1Badge: 'Step 1 • Language',
        step1Title: 'Select Language',
        continueBtn: 'Next →',
        backBtn: '← Change Language',
        step2Indicator: 'Step 2',
        tabParticipant: 'Participant',
        tabAdmin: 'Admin',
        loginTitleUser: 'Sign In',
        loginTitleAdmin: 'Admin Login',
        nameLabel: 'Name *',
        namePlaceholder: 'Your Name',
        phoneLabel: 'Phone No *',
        phonePlaceholder: 'Phone Number',
        ageLabel: 'Age *',
        agePlaceholder: 'Age',
        adminUserLabel: 'Username *',
        adminUserPlaceholder: 'admin',
        adminPassLabel: 'Password *',
        adminPassPlaceholder: '••••••••',
        rememberMe: 'Remember me',
        submitUser: 'Enter Quiz →',
        submitAdmin: 'Login →',
      },
      ta: {
        step1Badge: 'படி 1 • மொழி',
        step1Title: 'மொழியைத் தேர்ந்தெடுக்கவும்',
        continueBtn: 'அடுத்து →',
        backBtn: '← மொழி மாற்றம்',
        step2Indicator: 'படி 2',
        tabParticipant: 'பங்கேற்பாளர்',
        tabAdmin: 'நிர்வாகி',
        loginTitleUser: 'உள்நுழையவும்',
        loginTitleAdmin: 'நிர்வாகி உள்நுழைவு',
        nameLabel: 'பெயர் *',
        namePlaceholder: 'உங்கள் பெயர்',
        phoneLabel: 'தொலைபேசி எண் *',
        phonePlaceholder: 'தொலைபேசி எண்',
        ageLabel: 'வயது *',
        agePlaceholder: 'வயது',
        adminUserLabel: 'பயனர்பெயர் *',
        adminUserPlaceholder: 'நிர்வாகி',
        adminPassLabel: 'கடவுச்சொல் *',
        adminPassPlaceholder: '••••••••',
        rememberMe: 'என்னை நினைவில் கொள்',
        submitUser: 'உள்நுழையவும் →',
        submitAdmin: 'நிர்வாகியாக உள்நுழைக →',
      },
      both: {
        step1Badge: 'Step 1 • மொழி தேர்வு',
        step1Title: 'Select Language • மொழி தேர்வு',
        continueBtn: 'Next (அடுத்து) →',
        backBtn: '← Change Language',
        step2Indicator: 'Step 2 • படி 2',
        tabParticipant: 'Participant (பங்கேற்பாளர்)',
        tabAdmin: 'Admin (நிர்வாகி)',
        loginTitleUser: 'Sign In • உள்நுழைவு',
        loginTitleAdmin: 'Admin Login • நிர்வாகி',
        nameLabel: 'Name (பெயர்) *',
        namePlaceholder: 'Your Name / பெயர்',
        phoneLabel: 'Phone No (தொலைபேசி) *',
        phonePlaceholder: 'Phone Number / எண்',
        ageLabel: 'Age (வயது) *',
        agePlaceholder: 'Age / வயது',
        adminUserLabel: 'Username (பயனர்பெயர்) *',
        adminUserPlaceholder: 'admin / நிர்வாகி',
        adminPassLabel: 'Password (கடவுச்சொல்) *',
        adminPassPlaceholder: '••••••••',
        rememberMe: 'Remember me',
        submitUser: 'Enter Quiz (உள்நுழை) →',
        submitAdmin: 'Login (நிர்வாகி) →',
      },
    }[lang];

    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white dark:bg-[#141A26] border border-[#EAE0D0] dark:border-[#232E42] rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#2C1810]/5 space-y-6 animate-fadeIn transition-colors">
          
          {/* STEP 1: LANGUAGE SELECTION FIRST */}
          {entryStep === 'language' ? (
            <div className="space-y-5">
              <div className="text-left space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF3E0] dark:bg-amber-500/15 border border-[#E8D8B8] dark:border-amber-500/30 text-[#8C6B1B] dark:text-amber-300 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#D49020] dark:text-amber-400" />
                  <span>{t.step1Badge}</span>
                </div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {t.step1Title}
                </h1>
              </div>

              {/* 3 Language Option Cards */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    lang === 'en'
                      ? 'bg-[#FAF3E0] dark:bg-amber-500/15 border-[#D49020] dark:border-amber-500/40 text-[#3D2F14] dark:text-amber-200 shadow-md ring-2 ring-[#D49020]/30'
                      : 'bg-[#FBF8F4] dark:bg-[#1A2232] border-[#EAE0D0] dark:border-[#232E42] text-slate-700 dark:text-slate-300 hover:border-[#D49020]/60 hover:bg-white dark:hover:bg-[#20293D]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl">🇬🇧</span>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900 dark:text-white">English</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Pure English quiz interface</div>
                    </div>
                  </div>
                  {lang === 'en' && (
                    <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#E8A838] to-[#B87410] text-white flex items-center justify-center text-xs font-black shadow-sm">
                      ✓
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setLanguage('ta')}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    lang === 'ta'
                      ? 'bg-[#FAF3E0] dark:bg-amber-500/15 border-[#D49020] dark:border-amber-500/40 text-[#3D2F14] dark:text-amber-200 shadow-md ring-2 ring-[#D49020]/30'
                      : 'bg-[#FBF8F4] dark:bg-[#1A2232] border-[#EAE0D0] dark:border-[#232E42] text-slate-700 dark:text-slate-300 hover:border-[#D49020]/60 hover:bg-white dark:hover:bg-[#20293D]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl">🇮🇳</span>
                    <div>
                      <div className="font-extrabold font-tamil text-sm text-slate-900 dark:text-white">தமிழ்</div>
                      <div className="text-xs font-tamil text-slate-500 dark:text-slate-400">முழுமையான தமிழ் இடைமுகம்</div>
                    </div>
                  </div>
                  {lang === 'ta' && (
                    <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#E8A838] to-[#B87410] text-white flex items-center justify-center text-xs font-black shadow-sm">
                      ✓
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setLanguage('both')}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    lang === 'both'
                      ? 'bg-[#FAF3E0] dark:bg-amber-500/15 border-[#D49020] dark:border-amber-500/40 text-[#3D2F14] dark:text-amber-200 shadow-md ring-2 ring-[#D49020]/30'
                      : 'bg-[#FBF8F4] dark:bg-[#1A2232] border-[#EAE0D0] dark:border-[#232E42] text-slate-700 dark:text-slate-300 hover:border-[#D49020]/60 hover:bg-white dark:hover:bg-[#20293D]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl">🌐</span>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900 dark:text-white">Both / இருமொழி</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">English + தமிழ் side-by-side</div>
                    </div>
                  </div>
                  {lang === 'both' && (
                    <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#E8A838] to-[#B87410] text-white flex items-center justify-center text-xs font-black shadow-sm">
                      ✓
                    </span>
                  )}
                </button>
              </div>

              {/* Continue to Step 2 Button */}
              <button
                type="button"
                onClick={() => setEntryStep('auth')}
                className="w-full py-3.5 px-6 rounded-2xl btn-modern-gold font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{t.continueBtn}</span>
              </button>
            </div>
          ) : (
            /* STEP 2: SIGN IN (PARTICIPANT OR ADMIN) */
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#EAE0D0] dark:border-[#232E42] pb-3">
                <button
                  type="button"
                  onClick={() => {
                    setEntryStep('language');
                    setAuthError(null);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-semibold transition-colors"
                >
                  <span>{t.backBtn}</span>
                </button>
                <span className="text-[11px] font-extrabold text-[#8C6B1B] dark:text-amber-300 bg-[#FAF3E0] dark:bg-amber-500/15 px-2 py-0.5 rounded-md uppercase">
                  {t.step2Indicator}
                </span>
              </div>

              {/* Mode Tabs */}
              <div className="flex items-center p-1 rounded-2xl bg-[#F4EDE2] dark:bg-[#1A2232] border border-[#E5DAC8] dark:border-[#232E42]">
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('user');
                    setAuthError(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                    authTab === 'user'
                      ? 'btn-modern-gold text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
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
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                    authTab === 'admin'
                      ? 'btn-modern-gold text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span className={lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}>{t.tabAdmin}</span>
                </button>
              </div>

              {/* Heading */}
              <div className="text-left">
                <h1 className={`text-xl font-black text-slate-900 dark:text-white tracking-tight ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                  {authTab === 'user' ? t.loginTitleUser : t.loginTitleAdmin}
                </h1>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                  {authError}
                </div>
              )}

              {/* Form */}
              {authTab === 'user' ? (
                <form onSubmit={handleUserLoginSubmit} className="space-y-4">
                  <div className="space-y-1 text-left">
                    <label className={`block text-xs font-bold text-slate-700 dark:text-slate-300 ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
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
                        className={`w-full pl-10 pr-4 py-2.5 bg-[#FBF8F4] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42] focus:border-[#D49020] focus:bg-white dark:focus:bg-[#141A26] rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none transition-colors ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className={`block text-xs font-bold text-slate-700 dark:text-slate-300 ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
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
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FBF8F4] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42] focus:border-[#D49020] focus:bg-white dark:focus:bg-[#141A26] rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className={`block text-xs font-bold text-slate-700 dark:text-slate-300 ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
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
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FBF8F4] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42] focus:border-[#D49020] focus:bg-white dark:focus:bg-[#141A26] rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className={`flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 select-none ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                      <input
                        type="checkbox"
                        checked={rememberUser}
                        onChange={(e) => setRememberUser(e.target.checked)}
                        className="w-4 h-4 rounded border-[#EAE0D0] text-[#D49020] focus:ring-[#D49020]"
                      />
                      <span>{t.rememberMe}</span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loadingAuth}
                      className="w-full py-3.5 px-6 rounded-2xl btn-modern-gold font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      {loadingAuth ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span className={lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}>{t.submitUser}</span>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                  <div className="space-y-1 text-left">
                    <label className={`block text-xs font-bold text-slate-700 dark:text-slate-300 ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
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
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FBF8F4] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42] focus:border-[#D49020] focus:bg-white dark:focus:bg-[#141A26] rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className={`block text-xs font-bold text-slate-700 dark:text-slate-300 ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
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
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FBF8F4] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42] focus:border-[#D49020] focus:bg-white dark:focus:bg-[#141A26] rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className={`flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 select-none ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                      <input
                        type="checkbox"
                        checked={rememberAdmin}
                        onChange={(e) => setRememberAdmin(e.target.checked)}
                        className="w-4 h-4 rounded border-[#EAE0D0] text-[#D49020] focus:ring-[#D49020]"
                      />
                      <span>{t.rememberMe}</span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loadingAuth}
                      className="w-full py-3.5 px-6 rounded-2xl btn-modern-gold font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      {loadingAuth ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

  // ================= MAIN HOME DASHBOARD =================
  const greetingName = currentUser?.name || (isAdminLoggedIn ? 'Admin' : 'Believer');

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* 1. TOP WELCOME GREETING & STATUS BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>
              {lang === 'ta'
                ? `வணக்கம், ${greetingName}! 👋`
                : `Welcome, ${greetingName}! 👋`}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            {lang === 'ta'
              ? 'வேத வினாடி வினாவிற்கு நீங்கள் தயாரா?'
              : 'Ready for your Scripture quiz?'}
          </p>
        </div>

        {/* Points Pill */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#FAF3E0] dark:bg-amber-500/15 border border-[#E8D8B8] dark:border-amber-500/30 text-[#8C6B1B] dark:text-amber-300 shadow-sm">
            <Zap className="w-4 h-4 text-[#D49020] dark:text-amber-400 fill-[#D49020] dark:fill-amber-400" />
            <span className="text-xs font-black">{currentUser?.totalScore || 450} XP</span>
          </div>
        </div>
      </div>

      {/* 2. BOOK EXPLORER SECTION */}
      <div id="books-section" className="space-y-8">
        {/* Old Testament */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#EAE0D0] dark:border-[#232E42] pb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FAF3E0] dark:bg-amber-500/15 border border-[#E8D8B8] dark:border-amber-500/30 text-[#8C6B1B] dark:text-amber-300 flex items-center justify-center">
                <BookMarked className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                {lang === 'ta' ? 'பழைய ஏற்பாடு' : 'Old Testament'}
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              {otBooks.length} {lang === 'ta' ? 'புத்தகங்கள்' : 'Books'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otBooks.map((item) => {
              const taName = tamilBookNames[item.book] || item.ta || '';
              return (
                <div
                  key={item.book}
                  className="warm-card warm-card-hover rounded-2xl p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-500/30 uppercase tracking-wider">
                      OT
                    </span>

                    {lang === 'en' && (
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{item.book}</h3>
                    )}
                    {lang === 'ta' && (
                      <h3 className="text-lg font-tamil font-extrabold text-slate-900 dark:text-white">{taName || item.book}</h3>
                    )}
                    {lang === 'both' && (
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{item.book}</h3>
                        {taName && (
                          <p className="text-xs font-tamil text-slate-500 dark:text-slate-400 font-semibold">{taName}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#EAE0D0] dark:border-[#232E42]">
                    <Link
                      href={`/quiz/${encodeURIComponent(item.book)}?mode=competition`}
                      className="flex-1 py-2.5 rounded-xl btn-modern-gold text-center text-xs font-extrabold shadow-sm transition-all"
                    >
                      {lang === 'ta' ? 'போட்டி' : 'Competition'}
                    </Link>
                    <Link
                      href={`/quiz/${encodeURIComponent(item.book)}?mode=practice`}
                      className="p-2.5 rounded-xl bg-[#FBF8F4] dark:bg-[#1A2232] hover:bg-white dark:hover:bg-[#20293D] border border-[#EAE0D0] dark:border-[#232E42] text-slate-600 dark:text-slate-300 transition-all"
                      title={lang === 'ta' ? 'பயிற்சி வினாடி வினா' : 'Practice Test'}
                    >
                      <GraduationCap className="w-4 h-4 text-[#D49020] dark:text-amber-400" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* New Testament */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#EAE0D0] dark:border-[#232E42] pb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 text-[#8C6B1B] dark:text-amber-300 flex items-center justify-center">
                <BookMarked className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                {lang === 'ta' ? 'புதிய ஏற்பாடு' : 'New Testament'}
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              {ntBooks.length} {lang === 'ta' ? 'புத்தகங்கள்' : 'Books'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ntBooks.map((item) => {
              const taName = tamilBookNames[item.book] || item.ta || '';
              return (
                <div
                  key={item.book}
                  className="warm-card warm-card-hover rounded-2xl p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-500/30 uppercase tracking-wider">
                      NT
                    </span>

                    {lang === 'en' && (
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{item.book}</h3>
                    )}
                    {lang === 'ta' && (
                      <h3 className="text-lg font-tamil font-extrabold text-slate-900 dark:text-white">{taName || item.book}</h3>
                    )}
                    {lang === 'both' && (
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{item.book}</h3>
                        {taName && (
                          <p className="text-xs font-tamil text-slate-500 dark:text-slate-400 font-semibold">{taName}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#EAE0D0] dark:border-[#232E42]">
                    <Link
                      href={`/quiz/${encodeURIComponent(item.book)}?mode=competition`}
                      className="flex-1 py-2.5 rounded-xl btn-modern-gold text-center text-xs font-extrabold shadow-sm transition-all"
                    >
                      {lang === 'ta' ? 'போட்டி' : 'Competition'}
                    </Link>
                    <Link
                      href={`/quiz/${encodeURIComponent(item.book)}?mode=practice`}
                      className="p-2.5 rounded-xl bg-[#FBF8F4] dark:bg-[#1A2232] hover:bg-white dark:hover:bg-[#20293D] border border-[#EAE0D0] dark:border-[#232E42] text-slate-600 dark:text-slate-300 transition-all"
                      title={lang === 'ta' ? 'பயிற்சி வினாடி வினா' : 'Practice Test'}
                    >
                      <GraduationCap className="w-4 h-4 text-[#D49020] dark:text-amber-400" />
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

