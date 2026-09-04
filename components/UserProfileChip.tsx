'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, LogIn, Trophy, ShieldCheck, LogOut, CheckCircle2 } from 'lucide-react';
import UserAuthModal from './UserAuthModal';

import { useLanguage } from '@/context/LanguageContext';

export default function UserProfileChip() {
  const { language: lang } = useLanguage();
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadAuth = () => {
    try {
      const savedUser =
        localStorage.getItem('daquiz_user') || sessionStorage.getItem('daquiz_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }

      const adminLoggedIn =
        localStorage.getItem('daquiz_admin_logged_in') === 'true' ||
        sessionStorage.getItem('daquiz_admin_logged_in') === 'true';
      setIsAdmin(adminLoggedIn);
    } catch (e) {
      setUser(null);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    loadAuth();

    const handleUserUpdated = (e: any) => {
      if (e.detail) {
        setUser(e.detail);
      } else {
        loadAuth();
      }
    };

    const handleAdminUpdated = () => {
      loadAuth();
    };

    window.addEventListener('daquiz-user-updated', handleUserUpdated);
    window.addEventListener('daquiz-admin-updated', handleAdminUpdated);
    return () => {
      window.removeEventListener('daquiz-user-updated', handleUserUpdated);
      window.removeEventListener('daquiz-admin-updated', handleAdminUpdated);
    };
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('daquiz_user');
      sessionStorage.removeItem('daquiz_user');
      localStorage.removeItem('daquiz_admin_logged_in');
      sessionStorage.removeItem('daquiz_admin_logged_in');
    } catch (e) {}
    setUser(null);
    setIsAdmin(false);
    window.dispatchEvent(new CustomEvent('daquiz-user-updated', { detail: null }));
    window.dispatchEvent(new CustomEvent('daquiz-admin-updated', { detail: false }));
  };

  const adminLabel = lang === 'ta' ? 'நிர்வாகி' : lang === 'both' ? 'Admin (நிர்வாகி)' : 'Admin';
  const ptsLabel = lang === 'ta' ? 'புள்ளிகள்' : 'pts';
  const signInLabel = lang === 'ta' ? 'உள்நுழைக' : lang === 'both' ? 'Sign In (உள்நுழை)' : 'Sign In';
  const signOutTitle = lang === 'ta' ? 'வெளியேறு' : 'Sign Out';

  return (
    <>
      <div className="flex items-center gap-2">
        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#916B16] hover:bg-[#D4AF37]/25 text-xs font-bold transition-all shadow-sm"
            title="Admin Control Center"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className={lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}>{adminLabel}</span>
          </Link>
        )}

        {user ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#EAE0D0] hover:border-[#D4AF37] text-xs font-semibold text-slate-800 transition-all shadow-sm group"
            >
              <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/20 text-[#8C6B1B] flex items-center justify-center font-bold text-[11px] border border-[#D4AF37]/30">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-slate-800 dark:text-white font-bold leading-tight truncate max-w-[100px]">
                  {user.name}
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-extrabold flex items-center gap-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5" /> {user.quizzesTaken || 0} {lang === 'ta' ? 'முடிந்தது' : 'Completed'}
                </span>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-xl bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-[#EAE0D0] transition-colors shadow-sm"
              title={signOutTitle}
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          !isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl btn-modern-gold text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
            >
              <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className={lang === 'ta' || lang === 'both' ? 'font-tamil' : ''}>{signInLabel}</span>
            </button>
          )
        )}
      </div>

      <UserAuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(newUser) => setUser(newUser)}
      />
    </>
  );
}
