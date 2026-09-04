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
      loginTitleUser: title || 'Login to your account',
      loginSubUser: subtitle || 'Enter your details to participate and save scores.',
      loginTitleAdmin: 'Admin Portal Login',
      loginSubAdmin: 'Enter admin credentials to manage questions and participants.',
      nameLabel: 'Full Name *',
      namePlaceholder: 'e.g. David Livingston',
      phoneLabel: 'Phone Number *',
      phonePlaceholder: 'e.g. +91 9876543210',
      ageLabel: 'Age *',
      agePlaceholder: 'e.g. 24',
      adminUserLabel: 'Admin Username *',
      adminUserPlaceholder: 'admin',
      adminPassLabel: 'Admin Password *',
      adminPassPlaceholder: '••••••••',
      rememberMe: 'Remember me',
      submitUser: 'Save & Continue',
      submitAdmin: 'Login as Admin',
    },
    ta: {
      tabUser: 'பங்கேற்பாளர்',
      tabAdmin: 'நிர்வாகி',
      loginTitleUser: title || 'உங்கள் கணக்கில் உள்நுழையவும்',
      loginSubUser: subtitle || 'போட்டியில் பங்கேற்க உங்கள் விவரங்களை உள்ளிடவும்.',
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
      tabUser: 'Participant (பயனர்)',
      tabAdmin: 'Admin (நிர்வாகி)',
      loginTitleUser: title || 'Login to your account • உள்நுழையவும்',
      loginSubUser: subtitle || 'Enter details • உங்கள் விவரங்களை உள்ளிடவும்.',
      loginTitleAdmin: 'Admin Login • நிர்வாகி உள்நுழைவு',
      loginSubAdmin: 'Enter credentials • நிர்வாக கட்டுப்பாட்டு அறைக்கு உள்நுழையவும்.',
      nameLabel: 'Full Name (முழு பெயர்) *',
      namePlaceholder: 'e.g. David Livingston / உங்கள் பெயர்',
      phoneLabel: 'Phone Number (தொலைபேசி எண்) *',
      phonePlaceholder: 'e.g. +91 9876543210',
      ageLabel: 'Age (வயது) *',
      agePlaceholder: 'e.g. 24',
      adminUserLabel: 'Admin Username (பயனர்பெயர்) *',
      adminUserPlaceholder: 'admin',
      adminPassLabel: 'Admin Password (கடவுச்சொல்) *',
      adminPassPlaceholder: '••••••••',
      rememberMe: 'Remember me (நினைவில் கொள்)',
      submitUser: 'Save & Continue (தொடர்க)',
      submitAdmin: 'Login as Admin (நிர்வாகி உள்நுழைவு)',
    },
  }[lang];

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md my-auto overflow-hidden rounded-3xl bg-[#0f172a] border border-slate-700/80 p-6 sm:p-8 shadow-2xl shadow-emerald-500/10 space-y-6 animate-fadeIn">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/90 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mode Selector Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setAuthMode('user');
              setError(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
              authMode === 'user'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
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
                ? 'bg-gradient-to-r from-amber-500 to-orange-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span className={lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}>{t.tabAdmin}</span>
          </button>
        </div>

        {/* Header */}
        <div className="space-y-1.5 text-left">
          <h2 className={`text-xl sm:text-2xl font-black text-white tracking-tight leading-snug ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
            {authMode === 'user' ? t.loginTitleUser : t.loginTitleAdmin}
          </h2>
          <p className={`text-xs text-slate-400 leading-relaxed ${lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}`}>
            {authMode === 'user' ? t.loginSubUser : t.loginSubAdmin}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* User / Participant Form */}
        {authMode === 'user' ? (
          <form onSubmit={handleUserSubmit} className="space-y-4">
            {/* Name */}
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

            {/* Phone */}
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
                disabled={loading}
                className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
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
                disabled={loading}
                className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-400 hover:to-orange-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
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
