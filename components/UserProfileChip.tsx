'use client';

import React, { useEffect, useState } from 'react';
import { User, LogIn, Trophy } from 'lucide-react';
import UserAuthModal from './UserAuthModal';

export default function UserProfileChip() {
  const [user, setUser] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadUser = () => {
    try {
      const saved = localStorage.getItem('daquiz_user');
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    const handleUserUpdated = (e: any) => {
      if (e.detail) {
        setUser(e.detail);
      } else {
        loadUser();
      }
    };

    window.addEventListener('daquiz-user-updated', handleUserUpdated);
    return () => window.removeEventListener('daquiz-user-updated', handleUserUpdated);
  }, []);

  return (
    <>
      {user ? (
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 text-xs font-semibold text-slate-200 transition-all group"
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] border border-emerald-500/30">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-left hidden sm:block">
            <span className="block text-white font-bold leading-tight truncate max-w-[100px]">
              {user.name}
            </span>
            <span className="text-[10px] text-amber-400 font-extrabold flex items-center gap-0.5">
              <Trophy className="w-2.5 h-2.5" /> {user.totalScore || 0} pts
            </span>
          </div>
        </button>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 text-xs font-black shadow-md shadow-emerald-500/20 hover:scale-105 transition-all"
        >
          <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Login / Register</span>
        </button>
      )}

      <UserAuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(newUser) => setUser(newUser)}
      />
    </>
  );
}
