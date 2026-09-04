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
            <span>Participant (பங்கேற்பாளர்)</span>
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
            <span>Admin (நிர்வாகி)</span>
          </button>
        </div>

        {/* Header */}
        <div className="space-y-1.5 text-left">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            {authMode === 'user'
              ? title || 'Login to your account'
              : 'Admin Portal Login'}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-tamil">
            {authMode === 'user'
              ? subtitle || 'உங்கள் விவரங்களை உள்ளிட்டு போட்டியில் பங்கேற்கவும்.'
              : 'நிர்வாக அணுகலுக்கு பயனர் பெயர் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.'}
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
              <label className="block text-xs font-bold text-slate-300">
                Full Name (முழு பெயர்) *
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
                  placeholder="e.g. Jackob blonde"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-slate-300">
                Phone Number (தொலைபேசி எண்) *
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
                  placeholder="e.g. +91 9876543210"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Age */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-slate-300">
                Age (வயது) *
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
                  placeholder="e.g. 24"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={rememberUser}
                  onChange={(e) => setRememberUser(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                />
                <span>Remember me</span>
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
                    <span>Enter Quiz & Save (உள்நுழை)</span>
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
              <label className="block text-xs font-bold text-slate-300">
                Admin Username (பயனர்பெயர்) *
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
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* Admin Password */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-slate-300">
                Admin Password (கடவுச்சொல்) *
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
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={rememberAdmin}
                  onChange={(e) => setRememberAdmin(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
                />
                <span>Remember me</span>
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
                    <span>Login as Admin (நிர்வாகி உள்நுழைவு)</span>
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
