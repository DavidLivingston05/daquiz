'use client';

import React, { useState, useEffect } from 'react';
import {
  createQuestion,
  getAllQuestionsAdmin,
  updateQuestion,
  deleteQuestion,
} from '@/lib/actions/quizActions';
import { getAllUsersAdmin } from '@/lib/actions/userActions';
import {
  ShieldCheck,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Layers,
  Sparkles,
  BookOpen,
  Search,
  Edit,
  Trash2,
  Users,
  Database,
  X,
  RefreshCw,
  Check,
  Lock,
  LogOut,
  User,
  HelpCircle,
  Activity,
} from 'lucide-react';

export default function AdminPage() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  // Admin Login Inputs
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<'questions' | 'create' | 'users' | 'system'>('questions');

  // Question CRUD states
  const [questionsList, setQuestionsList] = useState<any[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState('ALL');
  const [selectedDiff, setSelectedDiff] = useState('ALL');
  const [page, setPage] = useState(1);

  // Edit Modal State
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null);
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Users Tab State
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userSearch, setUserSearch] = useState('');

  // Create Question Form State
  const [testament, setTestament] = useState<'OT' | 'NT'>('NT');
  const [book, setBook] = useState('Matthew');
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(1);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [category, setCategory] = useState('Gospel');
  const [questionEn, setQuestionEn] = useState('');
  const [questionTa, setQuestionTa] = useState('');
  const [options, setOptions] = useState([
    { text_en: '', text_ta: '' },
    { text_en: '', text_ta: '' },
    { text_en: '', text_ta: '' },
    { text_en: '', text_ta: '' },
  ]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [explanationEn, setExplanationEn] = useState('');
  const [explanationTa, setExplanationTa] = useState('');
  const [createSubmitting, setCreateSubmitting] = useState(false);

  // System Stats
  const [healthData, setHealthData] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem('daquiz_admin_logged_in') === 'true' ||
        sessionStorage.getItem('daquiz_admin_logged_in') === 'true';
      setIsAdminAuthenticated(stored);
      setAuthChecked(true);
    } catch (e) {
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    if (isAdminAuthenticated) {
      loadQuestions();
      loadUsers();

      fetch('/api/health')
        .then((res) => res.json())
        .then((data) => setHealthData(data))
        .catch(() => {});
    }
  }, [isAdminAuthenticated, page, selectedBook, selectedDiff]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);

    const validUsernames = ['admin', 'admin@daquiz.com', 'daquiz'];
    const validPasswords = ['admin', 'admin123', 'daquiz2026', 'daquizadmin', 'livingston'];

    const u = loginUser.trim().toLowerCase();
    const p = loginPass.trim();

    const isUserValid = validUsernames.includes(u) || u.length > 0;
    const isPassValid = validPasswords.includes(p) || p === 'admin' || p === 'admin123';

    if (!u) {
      setLoginError('Please enter username.');
      setLoggingIn(false);
      return;
    }

    if (!p) {
      setLoginError('Please enter password.');
      setLoggingIn(false);
      return;
    }

    if (isUserValid && isPassValid) {
      if (rememberMe) {
        localStorage.setItem('daquiz_admin_logged_in', 'true');
      } else {
        sessionStorage.setItem('daquiz_admin_logged_in', 'true');
      }
      setIsAdminAuthenticated(true);
      setLoggingIn(false);
      window.dispatchEvent(new CustomEvent('daquiz-admin-updated', { detail: true }));
    } else {
      setLoginError('Invalid admin credentials. (Hint: username "admin", password "admin")');
      setLoggingIn(false);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('daquiz_admin_logged_in');
    sessionStorage.removeItem('daquiz_admin_logged_in');
    setIsAdminAuthenticated(false);
    window.dispatchEvent(new CustomEvent('daquiz-admin-updated', { detail: false }));
  };

  const loadQuestions = async () => {
    try {
      setLoadingQuestions(true);
      const res = await getAllQuestionsAdmin({
        page,
        limit: 20,
        book: selectedBook === 'ALL' ? undefined : selectedBook,
        difficulty: selectedDiff === 'ALL' ? undefined : selectedDiff,
        search: searchQuery.trim() || undefined,
      });

      if (res && res.questions) {
        setQuestionsList(res.questions);
        setTotalQuestions(res.total || 0);
      }
    } catch (err: any) {
      console.error('Error loading questions:', err);
      setStatusMessage({ type: 'error', text: 'Failed to load questions.' });
    } finally {
      setLoadingQuestions(false);
    }
  };

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await getAllUsersAdmin();
      if (Array.isArray(res)) {
        setUsersList(res);
      }
    } catch (err: any) {
      console.error('Error loading users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleDeleteQuestion = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete this question?\n"${title}"`)) {
      return;
    }

    try {
      const res = await deleteQuestion(id);
      if (res.success) {
        setStatusMessage({ type: 'success', text: 'Question deleted successfully.' });
        loadQuestions();
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete question.' });
    }
  };

  const handleOptionChange = (index: number, field: 'text_en' | 'text_ta', value: string) => {
    const updated = [...options];
    updated[index][field] = value;
    setOptions(updated);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateSubmitting(true);
    setStatusMessage(null);

    try {
      if (!questionEn.trim() && !questionTa.trim()) {
        throw new Error('Please provide question text in either English or Tamil.');
      }

      const res = await createQuestion({
        testament,
        book: book.trim(),
        chapter: Number(chapter),
        verse: Number(verse) || 1,
        difficulty,
        category: category.trim() || 'General',
        question_en: questionEn.trim(),
        question_ta: questionTa.trim(),
        options: options.map((opt) => ({
          text_en: opt.text_en.trim(),
          text_ta: opt.text_ta.trim(),
        })),
        correctOptionIndex,
        explanation_en: explanationEn.trim() || undefined,
        explanation_ta: explanationTa.trim() || undefined,
      });

      if (res.success) {
        setStatusMessage({ type: 'success', text: 'Question created successfully!' });
        setQuestionEn('');
        setQuestionTa('');
        setOptions([
          { text_en: '', text_ta: '' },
          { text_en: '', text_ta: '' },
          { text_en: '', text_ta: '' },
          { text_en: '', text_ta: '' },
        ]);
        setExplanationEn('');
        setExplanationTa('');
        setActiveTab('questions');
        loadQuestions();
      }
    } catch (err: any) {
      console.error('Create error:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to create question.' });
    } finally {
      setCreateSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;
    setEditSubmitting(true);

    try {
      await updateQuestion({
        id: editingQuestion.id,
        testament: editingQuestion.testament,
        book: editingQuestion.book,
        chapter: Number(editingQuestion.chapter),
        verse: Number(editingQuestion.verse) || 1,
        difficulty: editingQuestion.difficulty,
        category: editingQuestion.category,
        question_en: editingQuestion.question.en,
        question_ta: editingQuestion.question.ta,
        options: editingQuestion.options,
        explanation_en: editingQuestion.explanation?.en || '',
        explanation_ta: editingQuestion.explanation?.ta || '',
      });

      setStatusMessage({ type: 'success', text: 'Question updated successfully!' });
      setEditingQuestion(null);
      loadQuestions();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to update question.' });
    } finally {
      setEditSubmitting(false);
    }
  };

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.phone.includes(userSearch)
  );

  if (!authChecked) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ================= ADMIN LOGIN SCREEN =================
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white border border-[#EAE0D0] rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#2C1810]/5 space-y-6 animate-fadeIn">
          {/* Header */}
          <div className="text-left space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF3E0] border border-[#E8D8B8] text-[#8C6B1B] text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Admin Portal</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Login to your account</h1>
            <p className="text-xs text-slate-500 font-medium">
              Enter your admin credentials to manage questions and participants.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {loginError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="block text-xs font-bold text-slate-700">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#C5A059] focus:bg-white rounded-xl text-sm text-slate-900 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="block text-xs font-bold text-slate-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#C5A059] focus:bg-white rounded-xl text-sm text-slate-900 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#EAE0D0] text-[#C5A059] focus:ring-[#C5A059]"
                />
                <span>Remember me</span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-white font-extrabold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                {loggingIn ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Login to Console →</span>
                )}
              </button>
            </div>
          </form>

          {/* Quick link to Home */}
          <div className="border-t border-[#EAE0D0] pt-4 text-center">
            <a
              href="/"
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold transition-colors"
            >
              ← Back to Bible Quiz Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ================= MAIN ADMIN CONSOLE =================
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Top Header Card */}
      <div className="warm-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF3E0] border border-[#E8D8B8] text-[#8C6B1B] flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-6 h-6 text-[#C5A059]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">DaQuiz Admin Control Center</h1>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#FAF3E0] text-[#8C6B1B] border border-[#E8D8B8] uppercase">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Directly manage question bank, publish bilingual questions, and inspect registered participants.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              loadQuestions();
              loadUsers();
            }}
            className="px-4 py-2.5 rounded-xl bg-[#FBF8F4] hover:bg-white text-slate-700 text-xs font-extrabold border border-[#EAE0D0] flex items-center gap-1.5 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#8C6B1B]" />
            <span>Sync Data</span>
          </button>

          <button
            onClick={handleAdminLogout}
            className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-extrabold border border-rose-200 flex items-center gap-1.5 transition-all"
            title="Log out from Admin Console"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Status Notifications */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center justify-between gap-3 animate-fadeIn ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4 opacity-60 hover:opacity-100" />
          </button>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#F4EDE2] border border-[#E5DAC8]">
        <button
          onClick={() => setActiveTab('questions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'questions'
              ? 'bg-[#1B3B6F] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Question Bank ({totalQuestions})</span>
        </button>

        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'create'
              ? 'bg-[#1B3B6F] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Question</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'users'
              ? 'bg-[#1B3B6F] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Registered Participants ({usersList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'system'
              ? 'bg-[#1B3B6F] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>System & Health</span>
        </button>
      </div>

      {/* ================= TAB 1: QUESTION BANK CRUD ================= */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          {/* Filter / Search Toolbar */}
          <div className="warm-card p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-2 min-w-[240px]">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && loadQuestions()}
                  placeholder="Search questions in English, Tamil, or book name..."
                  className="w-full pl-9 pr-3 py-2 bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#1B3B6F] focus:bg-white rounded-xl text-xs text-slate-900 focus:outline-none transition-colors"
                />
              </div>
              <button
                onClick={loadQuestions}
                className="px-4 py-2 rounded-xl bg-[#1B3B6F] hover:bg-[#142C54] text-white text-xs font-extrabold shadow-sm transition-all"
              >
                Search
              </button>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedDiff}
                onChange={(e) => setSelectedDiff(e.target.value)}
                className="px-3 py-2 bg-[#FBF8F4] border border-[#EAE0D0] rounded-xl text-xs text-slate-700 font-bold focus:outline-none"
              >
                <option value="ALL">All Difficulties</option>
                <option value="easy">Easy (+100)</option>
                <option value="medium">Medium (+150)</option>
                <option value="hard">Hard (+200)</option>
              </select>

              <button
                onClick={loadQuestions}
                className="p-2 rounded-xl bg-[#FBF8F4] hover:bg-white border border-[#EAE0D0] text-slate-700 transition-colors shadow-sm"
                title="Refresh Questions"
              >
                <RefreshCw className={`w-4 h-4 text-[#8C6B1B] ${loadingQuestions ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Question List Cards */}
          {loadingQuestions ? (
            <div className="py-16 text-center text-slate-500 space-y-3">
              <div className="w-8 h-8 border-3 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold">Loading question repository...</p>
            </div>
          ) : questionsList.length === 0 ? (
            <div className="warm-card p-12 rounded-3xl text-center space-y-3">
              <p className="text-slate-600 text-sm font-semibold">No questions found matching your query.</p>
              <button
                onClick={() => setActiveTab('create')}
                className="px-5 py-2.5 rounded-2xl bg-[#1B3B6F] text-white text-xs font-extrabold shadow-md transition-all"
              >
                + Add a New Question Now
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {questionsList.map((q: any) => (
                <div
                  key={q.id}
                  className="warm-card warm-card-hover p-5 rounded-2xl space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-black uppercase">
                        {q.difficulty}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-[#FAF3E0] text-[#8C6B1B] border border-[#E8D8B8] text-xs font-extrabold">
                        {q.book} Ch. {q.chapter}
                      </span>
                      {q.category && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                          {q.category}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingQuestion(q)}
                        className="px-3 py-1 rounded-xl bg-[#FBF8F4] hover:bg-white border border-[#EAE0D0] text-slate-700 hover:text-slate-950 transition-colors flex items-center gap-1.5 text-xs font-extrabold shadow-sm"
                        title="Edit Question"
                      >
                        <Edit className="w-3.5 h-3.5 text-[#1B3B6F]" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q.id, q.question.en)}
                        className="px-3 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 transition-colors flex items-center gap-1.5 text-xs font-extrabold"
                        title="Delete Question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-extrabold text-slate-900 leading-snug">{q.question.en}</p>
                    {q.question.ta && (
                      <p className="text-xs font-tamil text-slate-600 leading-relaxed font-semibold">{q.question.ta}</p>
                    )}
                  </div>

                  {/* Options display */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                    {q.options?.map((opt: any, idx: number) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                          opt.isCorrect
                            ? 'bg-[#FAF3E0] border-[#C5A059] text-[#3D2F14] font-bold shadow-sm'
                            : 'bg-[#FBF8F4] border-[#EAE0D0] text-slate-700'
                        }`}
                      >
                        <span className="font-black text-[10px] uppercase">{String.fromCharCode(65 + idx)}:</span>
                        <div className="truncate">
                          <span>{opt.text?.en}</span>
                          {opt.text?.ta && <span className="text-slate-500 font-tamil ml-1">({opt.text.ta})</span>}
                        </div>
                        {opt.isCorrect && <Check className="w-3.5 h-3.5 ml-auto text-[#C5A059] stroke-[3] shrink-0" />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: CREATE QUESTION ================= */}
      {activeTab === 'create' && (
        <form onSubmit={handleCreateSubmit} className="warm-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-[#EAE0D0] pb-4 flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-[#1B3B6F]" />
              <span>Create New Bilingual Question</span>
            </h2>
            <span className="text-xs font-bold text-[#8C6B1B] bg-[#FAF3E0] px-3 py-1 rounded-full border border-[#E8D8B8]">
              Bilingual (English + தமிழ்)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Testament</label>
              <select
                value={testament}
                onChange={(e) => setTestament(e.target.value as 'OT' | 'NT')}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#1B3B6F] focus:bg-white rounded-xl text-slate-900 font-bold focus:outline-none"
              >
                <option value="OT">Old Testament (OT)</option>
                <option value="NT">New Testament (NT)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Book Name</label>
              <input
                type="text"
                required
                value={book}
                onChange={(e) => setBook(e.target.value)}
                placeholder="e.g. Genesis, Matthew"
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#1B3B6F] focus:bg-white rounded-xl text-slate-900 font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#1B3B6F] focus:bg-white rounded-xl text-slate-900 font-bold focus:outline-none"
              >
                <option value="easy">Easy (+100 pts)</option>
                <option value="medium">Medium (+150 pts)</option>
                <option value="hard">Hard (+200 pts)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Chapter</label>
              <input
                type="number"
                min={1}
                value={chapter}
                onChange={(e) => setChapter(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#1B3B6F] focus:bg-white rounded-xl text-slate-900 font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Topic / Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Creation, Faith"
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#1B3B6F] focus:bg-white rounded-xl text-slate-900 font-bold focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Question Text (English) *</label>
              <textarea
                required
                rows={2}
                value={questionEn}
                onChange={(e) => setQuestionEn(e.target.value)}
                placeholder="Enter English question text..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#1B3B6F] focus:bg-white rounded-xl text-slate-900 font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Question Text (தமிழ் / Tamil) *</label>
              <textarea
                required
                rows={2}
                value={questionTa}
                onChange={(e) => setQuestionTa(e.target.value)}
                placeholder="தமிழில் கேள்வியை உள்ளிடவும்..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#1B3B6F] focus:bg-white rounded-xl text-slate-900 font-tamil font-medium focus:outline-none"
              />
            </div>
          </div>

          {/* 4 Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800">
                4 Options (Click any card to select the Correct Answer) *
              </label>
              <span className="text-xs text-[#8C6B1B] font-extrabold bg-[#FAF3E0] border border-[#E8D8B8] px-3 py-0.5 rounded-full">
                ✓ Option {String.fromCharCode(65 + correctOptionIndex)} Selected as Correct
              </span>
            </div>
            <div className="space-y-3">
              {options.map((opt, idx) => {
                const isSelected = correctOptionIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setCorrectOptionIndex(idx)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FAF3E0] border-[#C5A059] shadow-md ring-2 ring-[#C5A059]/20'
                        : 'bg-[#FBF8F4] border-[#EAE0D0] hover:border-[#C5A059]/50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                            isSelected
                              ? 'bg-[#C5A059] text-white shadow-sm'
                              : 'bg-[#EAE0D0] text-slate-700'
                          }`}
                        >
                          Option {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">
                          {isSelected ? 'Selected Answer' : 'Click to select'}
                        </span>
                      </div>

                      <div
                        className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-[#1B3B6F] text-white shadow-sm'
                            : 'bg-[#EAE0D0] text-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        <span>{isSelected ? 'Correct Answer' : 'Set as Correct'}</span>
                      </div>
                    </div>

                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="text"
                        required
                        value={opt.text_en}
                        onFocus={() => setCorrectOptionIndex(idx)}
                        onChange={(e) => handleOptionChange(idx, 'text_en', e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + idx)} (English)`}
                        className={`w-full px-3.5 py-2 text-xs rounded-xl transition-colors font-medium ${
                          isSelected
                            ? 'bg-white border-2 border-[#C5A059] text-slate-900'
                            : 'bg-white border border-[#EAE0D0] text-slate-800'
                        }`}
                      />
                      <input
                        type="text"
                        required
                        value={opt.text_ta}
                        onFocus={() => setCorrectOptionIndex(idx)}
                        onChange={(e) => handleOptionChange(idx, 'text_ta', e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + idx)} (தமிழ்)`}
                        className={`w-full px-3.5 py-2 text-xs rounded-xl font-tamil transition-colors font-medium ${
                          isSelected
                            ? 'bg-white border-2 border-[#C5A059] text-slate-900'
                            : 'bg-white border border-[#EAE0D0] text-slate-800'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Scripture Context (English)</label>
              <textarea
                rows={2}
                value={explanationEn}
                onChange={(e) => setExplanationEn(e.target.value)}
                placeholder="Biblical explanation..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#1B3B6F] focus:bg-white rounded-xl text-slate-900 font-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Scripture Context (தமிழ்)</label>
              <textarea
                rows={2}
                value={explanationTa}
                onChange={(e) => setExplanationTa(e.target.value)}
                placeholder="வசன விளக்கம்..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#1B3B6F] focus:bg-white rounded-xl text-slate-900 font-tamil font-medium focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={createSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-[#1B3B6F] hover:bg-[#142C54] text-white font-extrabold text-sm shadow-md hover:scale-[1.005] transition-all flex items-center justify-center gap-2"
          >
            {createSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Publish Question to Database</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* ================= TAB 3: REGISTERED PARTICIPANTS ================= */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="warm-card p-4 rounded-2xl flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search registered participants by name or phone..."
                className="w-full pl-9 pr-3 py-2 bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#1B3B6F] focus:bg-white rounded-xl text-xs text-slate-900 focus:outline-none"
              />
            </div>
            <button
              onClick={loadUsers}
              className="px-4 py-2 rounded-xl bg-[#FBF8F4] hover:bg-white border border-[#EAE0D0] text-slate-700 text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#8C6B1B] ${loadingUsers ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {loadingUsers ? (
            <div className="py-16 text-center text-slate-500">
              <div className="w-8 h-8 border-3 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="warm-card p-12 rounded-3xl text-center text-slate-500 text-xs font-semibold">
              No registered participants found yet. Users will appear here once they login or submit a quiz attempt.
            </div>
          ) : (
            <div className="warm-card rounded-2xl overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF3E0] text-slate-700 font-black uppercase border-b border-[#EAE0D0]">
                  <tr>
                    <th className="p-4">Participant Name</th>
                    <th className="p-4">Phone Number</th>
                    <th className="p-4">Age</th>
                    <th className="p-4">Total Points</th>
                    <th className="p-4">Quizzes Completed</th>
                    <th className="p-4">Practice Tests</th>
                    <th className="p-4">Registration Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE0D0]">
                  {filteredUsers.map((u: any) => (
                    <tr key={u.id} className="hover:bg-[#FBF8F4] transition-colors">
                      <td className="p-4 font-extrabold text-slate-900 flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#FAF3E0] border border-[#E8D8B8] text-[#8C6B1B] flex items-center justify-center font-black">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <span>{u.name}</span>
                      </td>
                      <td className="p-4 font-mono text-slate-600 font-semibold">{u.phone}</td>
                      <td className="p-4 text-slate-600 font-medium">{u.age} yrs</td>
                      <td className="p-4 font-black text-[#8C6B1B]">{u.totalScore} pts</td>
                      <td className="p-4 text-slate-700 font-bold">{u.quizzesTaken}</td>
                      <td className="p-4 text-slate-700 font-bold">{u.practiceCount}</td>
                      <td className="p-4 text-slate-500 text-[11px] font-medium">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 4: SYSTEM & HEALTH ================= */}
      {activeTab === 'system' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="warm-card p-6 rounded-3xl space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Database className="w-4 h-4 text-[#1B3B6F]" />
              <span>Database Status</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-[#EAE0D0]">
                <span className="text-slate-500 font-medium">Connection Status:</span>
                <span className="text-emerald-700 font-extrabold">{healthData?.status || 'Active & Connected'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#EAE0D0]">
                <span className="text-slate-500 font-medium">Total Questions:</span>
                <span className="text-slate-900 font-extrabold">{healthData?.stats?.questions || totalQuestions}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500 font-medium">Uptime:</span>
                <span className="text-slate-900 font-mono font-bold">{healthData?.uptime || 'Live'}</span>
              </div>
            </div>
          </div>

          <div className="warm-card p-6 rounded-3xl space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Admin Privileges</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Full administrative capabilities granted for publishing, updating, and removing Bible quiz questions, as well as tracking church quiz participants and leaderboard scores.
            </p>
          </div>
        </div>
      )}

      {/* ================= EDIT QUESTION MODAL ================= */}
      {editingQuestion && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative z-10 w-full max-w-2xl my-auto bg-white rounded-3xl border border-[#EAE0D0] p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setEditingQuestion(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#FBF8F4] text-slate-400 hover:text-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Edit className="w-5 h-5 text-[#1B3B6F]" />
              <span>Edit Question ({editingQuestion.book} Ch. {editingQuestion.chapter})</span>
            </h2>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Book</label>
                  <input
                    type="text"
                    value={editingQuestion.book}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, book: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#1B3B6F] focus:bg-white rounded-xl text-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Chapter</label>
                  <input
                    type="number"
                    value={editingQuestion.chapter}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, chapter: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#1B3B6F] focus:bg-white rounded-xl text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Question (English)</label>
                <textarea
                  rows={2}
                  value={editingQuestion.question.en}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      question: { ...editingQuestion.question, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#1B3B6F] focus:bg-white rounded-xl text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Question (Tamil)</label>
                <textarea
                  rows={2}
                  value={editingQuestion.question.ta}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      question: { ...editingQuestion.question, ta: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FBF8F4] border border-[#EAE0D0] focus:border-[#1B3B6F] focus:bg-white rounded-xl text-slate-900 font-tamil font-medium"
                />
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                <label className="block text-slate-800 font-bold">
                  4 Options (Click any card to mark as Correct Answer) *
                </label>
                {editingQuestion.options?.map((opt: any, idx: number) => {
                  const isSelected = opt.isCorrect;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        const newOpts = editingQuestion.options.map((o: any, i: number) => ({
                          ...o,
                          isCorrect: i === idx,
                        }));
                        setEditingQuestion({ ...editingQuestion, options: newOpts });
                      }}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FAF3E0] border-[#C5A059] shadow-sm'
                          : 'bg-[#FBF8F4] border-[#EAE0D0] hover:border-[#C5A059]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black transition-all ${
                            isSelected ? 'bg-[#C5A059] text-white' : 'bg-[#EAE0D0] text-slate-700'
                          }`}
                        >
                          Option {String.fromCharCode(65 + idx)}
                        </span>
                        <div
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
                            isSelected
                              ? 'bg-[#1B3B6F] text-white'
                              : 'bg-[#EAE0D0] text-slate-600'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          <span>{isSelected ? 'Correct Answer' : 'Click to Set Correct'}</span>
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-2 gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          value={opt.text.en}
                          onChange={(e) => {
                            const newOpts = [...editingQuestion.options];
                            newOpts[idx].text.en = e.target.value;
                            setEditingQuestion({ ...editingQuestion, options: newOpts });
                          }}
                          className={`px-3 py-1.5 rounded-xl transition-colors font-medium ${
                            isSelected
                              ? 'bg-white border-2 border-[#C5A059] text-slate-900'
                              : 'bg-white border border-[#EAE0D0] text-slate-800'
                          }`}
                        />
                        <input
                          type="text"
                          value={opt.text.ta}
                          onChange={(e) => {
                            const newOpts = [...editingQuestion.options];
                            newOpts[idx].text.ta = e.target.value;
                            setEditingQuestion({ ...editingQuestion, options: newOpts });
                          }}
                          className={`px-3 py-1.5 rounded-xl font-tamil transition-colors font-medium ${
                            isSelected
                              ? 'bg-white border-2 border-[#C5A059] text-slate-900'
                              : 'bg-white border border-[#EAE0D0] text-slate-800'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#FBF8F4] border border-[#EAE0D0] text-slate-700 font-extrabold hover:bg-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-[#1B3B6F] hover:bg-[#142C54] text-white font-extrabold shadow-sm transition-all"
                >
                  {editSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
