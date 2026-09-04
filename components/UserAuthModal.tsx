'use client';

import React, { useState } from 'react';
import { User, Phone, Calendar, Sparkles, X, ArrowRight } from 'lucide-react';
import { registerOrLoginUser } from '@/lib/actions/userActions';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: any) => void;
  title?: string;
  subtitle?: string;
}

export default function UserAuthModal({
  isOpen,
  onClose,
  onSuccess,
  title = 'Join Bible Quiz & Save Scores',
  subtitle = 'Enter your details to track your competition rank and practice history.',
}: UserAuthModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
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
        localStorage.setItem('daquiz_user', JSON.stringify(result.user));
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md my-auto overflow-hidden rounded-3xl bg-[#0f172a] border border-emerald-500/40 p-6 sm:p-8 shadow-2xl shadow-emerald-500/20 space-y-6 animate-fadeIn">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/90 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Participant Profile</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            {title}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-tamil">
            {subtitle} • உங்கள் பெயர், தொலைபேசி எண், வயதை உள்ளிடவும்.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="e.g. David Livingston"
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

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Save & Continue (தொடர்க)</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
