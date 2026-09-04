'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import {
  User,
  Phone,
  Calendar,
  Sparkles,
  X,
  ArrowRight,
  ShieldCheck,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { registerOrLoginUser } from '@/lib/actions/userActions';
import { useLanguage } from '@/context/LanguageContext';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: any) => void;
  title?: string;
  subtitle?: string;
  initialMode?: 'user' | 'admin';
}

export default function UserAuthModal({
  isOpen,
  onClose,
  onSuccess,
  title,
  subtitle,
  initialMode = 'user',
}: UserAuthModalProps) {
  const router = useRouter();
  const { language: lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [authMode, setAuthMode] = useState<'user' | 'admin'>(initialMode);

  // User form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [rememberUser, setRememberUser] = useState(true);

  // Admin form state
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [rememberAdmin, setRememberAdmin] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setAuthMode(initialMode);
  }, [initialMode, isOpen]);

  if (!isOpen || !mounted) return null;

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!name.trim()) {
        throw new Error(lang === 'ta' ? 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்.' : 'Please enter your full name.');
      }
      const cleanPhone = phone.replace(/[^0-9]/g, '').trim();
      if (!cleanPhone || cleanPhone.length !== 10) {
        throw new Error(lang === 'ta' ? 'தொலைபேசி எண் சரியாக 10 இலக்கங்களாக இருக்க வேண்டும்.' : 'Phone number must be exactly 10 digits.');
      }
      if (!age || Number(age) < 1 || Number(age) > 120) {
        throw new Error(lang === 'ta' ? 'சரியான வயதை உள்ளிடவும் (1 முதல் 120).' : 'Please enter a valid age between 1 and 120.');
      }

      const result = await registerOrLoginUser({
        name: name.trim(),
        phone: cleanPhone,
        age: Number(age),
      });

      if (result.success && result.user) {
        if (rememberUser) {
          localStorage.setItem('daquiz_user', JSON.stringify(result.user));
        } else {
          sessionStorage.setItem('daquiz_user', JSON.stringify(result.user));
        }
        window.dispatchEvent(new CustomEvent('daquiz-user-updated', { detail: result.user }));
        onSuccess(result.user);
        onClose();
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const validUsernames = ['admin', 'admin@daquiz.com', 'daquiz'];
    const validPasswords = ['admin', 'admin123', 'daquiz2026', 'daquizadmin', 'livingston'];

    const u = adminUser.trim().toLowerCase();
    const p = adminPass.trim();

    const isUserValid = validUsernames.includes(u) || u.length > 0;
    const isPassValid = validPasswords.includes(p) || p === 'admin' || p === 'admin123';

    if (!u) {
      setError('Please enter your admin username.');
      setLoading(false);
      return;
    }

    if (!p) {
      setError('Please enter your admin password.');
      setLoading(false);
      return;
    }

    if (isUserValid && isPassValid) {
      if (rememberAdmin) {
        localStorage.setItem('daquiz_admin_logged_in', 'true');
      } else {
        sessionStorage.setItem('daquiz_admin_logged_in', 'true');
      }
      window.dispatchEvent(new CustomEvent('daquiz-admin-updated', { detail: true }));
      setLoading(false);
      onClose();
      router.push('/admin');
    } else {
      setError('Invalid admin credentials. (Hint: username "admin", password "admin" or "admin123")');
      setLoading(false);
    }
  };

  const t = {
    en: {
      tabUser: 'Participant',
      tabAdmin: 'Admin',
      loginTitleUser: title || 'Participant Sign In',
      loginTitleAdmin: 'Admin Login',
      nameLabel: 'Name *',
      namePlaceholder: 'Your Name',
      phoneLabel: 'Phone No *',
      phonePlaceholder: '10-digit Mobile Number',
      ageLabel: 'Age *',
      agePlaceholder: 'Age',
      adminUserLabel: 'Username *',
      adminUserPlaceholder: 'admin',
      adminPassLabel: 'Password *',
      adminPassPlaceholder: '••••••••',
      rememberMe: 'Remember me',
      submitUser: 'Continue →',
      submitAdmin: 'Login →',
    },
    ta: {
      tabUser: 'பங்கேற்பாளர்',
      tabAdmin: 'நிர்வாகி',
      loginTitleUser: title || 'பங்கேற்பாளர் உள்நுழைவு',
      loginTitleAdmin: 'நிர்வாகி உள்நுழைவு',
      nameLabel: 'பெயர் *',
      namePlaceholder: 'உங்கள் பெயர்',
      phoneLabel: 'தொலைபேசி எண் (10 இலக்கம்) *',
      phonePlaceholder: '10 இலக்க மொபைல் எண்',
      ageLabel: 'வயது *',
      agePlaceholder: 'வயது',
      adminUserLabel: 'பயனர்பெயர் *',
      adminUserPlaceholder: 'நிர்வாகி',
      adminPassLabel: 'கடவுச்சொல் *',
      adminPassPlaceholder: '••••••••',
      rememberMe: 'என்னை நினைவில் கொள்',
      submitUser: 'தொடரவும் →',
      submitAdmin: 'உள்நுழையவும் →',
    },
    both: {
      tabUser: 'Participant (பங்கேற்பாளர்)',
      tabAdmin: 'Admin (நிர்வாகி)',
      loginTitleUser: title || 'Sign In • உள்நுழைவு',
      loginTitleAdmin: 'Admin Login • நிர்வாகி',
      nameLabel: 'Name (பெயர்) *',
      namePlaceholder: 'Your Name / பெயர்',
      phoneLabel: 'Phone No (10 இலக்கம்) *',
      phonePlaceholder: '10-digit Mobile / மொபைல் எண்',
      ageLabel: 'Age (வயது) *',
      agePlaceholder: 'Age / வயது',
      adminUserLabel: 'Username (பயனர்பெயர்) *',
      adminUserPlaceholder: 'admin / நிர்வாகி',
      adminPassLabel: 'Password (கடவுச்சொல்) *',
      adminPassPlaceholder: '••••••••',
      rememberMe: 'Remember me',
      submitUser: 'Continue (தொடர்க) →',
      submitAdmin: 'Login (உள்நுழை) →',
    },
  }[lang];

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-black/75 backdrop-blur-md overflow-y-auto">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md my-auto overflow-hidden rounded-3xl bg-white dark:bg-[#111724] border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-2xl shadow-slate-900/25 space-y-6 animate-fadeIn text-slate-800 dark:text-slate-100 transition-colors">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mode Selector Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-[#161F30] border border-slate-200/80 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              setAuthMode('user');
              setError(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
              authMode === 'user'
                ? 'btn-modern-gold text-white shadow-md'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span className={lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}>{t.tabUser}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('admin');
              setError(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
              authMode === 'admin'
                ? 'btn-modern-gold text-white shadow-md'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span className={lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}>{t.tabAdmin}</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-left">
          <h2 className={`text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
            {authMode === 'user' ? t.loginTitleUser : t.loginTitleAdmin}
          </h2>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* User / Participant Form */}
        {authMode === 'user' ? (
          <form onSubmit={handleUserSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5 text-left">
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
                  className={`w-full pl-10 pr-4 py-2.5 bg-[#FDFBF7] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42] focus:border-[#D49020] rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none transition-colors ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5 text-left">
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
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder={t.phonePlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FDFBF7] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42] focus:border-[#D49020] rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Age */}
            <div className="space-y-1.5 text-left">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FDFBF7] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42] focus:border-[#D49020] rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className={`flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 select-none ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                <input
                  type="checkbox"
                  checked={rememberUser}
                  onChange={(e) => setRememberUser(e.target.checked)}
                  className="w-4 h-4 rounded border-[#EAE0D0] bg-[#FDFBF7] dark:bg-[#1A2232] text-[#D49020] focus:ring-[#D49020]"
                />
                <span>{t.rememberMe}</span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-2xl btn-modern-gold font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className={lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}>{t.submitUser}</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Admin Form */
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            {/* Admin Username */}
            <div className="space-y-1.5 text-left">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FDFBF7] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42] focus:border-[#D49020] rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Admin Password */}
            <div className="space-y-1.5 text-left">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FDFBF7] dark:bg-[#1A2232] border border-[#EAE0D0] dark:border-[#232E42] focus:border-[#D49020] rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className={`flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 select-none ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
                <input
                  type="checkbox"
                  checked={rememberAdmin}
                  onChange={(e) => setRememberAdmin(e.target.checked)}
                  className="w-4 h-4 rounded border-[#EAE0D0] bg-[#FDFBF7] dark:bg-[#1A2232] text-[#D49020] focus:ring-[#D49020]"
                />
                <span>{t.rememberMe}</span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-2xl btn-modern-gold font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className={lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}>{t.submitAdmin}</span>
                    <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

    return createPortal(modalContent, document.body);
  }
