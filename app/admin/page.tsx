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
  Calendar,
  Trophy,
  Lock,
  LogOut,
  User,
  ArrowRight,
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
    } else {
      setLoginError('Invalid credentials. (Hint: username "admin", password "admin" or "admin123")');
      setLoggingIn(false);
    }
  };

  const handleAdminLogout = () => {
    try {
      localStorage.removeItem('daquiz_admin_logged_in');
      sessionStorage.removeItem('daquiz_admin_logged_in');
    } catch (e) {}
    setIsAdminAuthenticated(false);
  };

  const loadQuestions = async () => {
    setLoadingQuestions(true);
    try {
      const data = await getAllQuestionsAdmin({
        search: searchQuery,
        book: selectedBook,
        difficulty: selectedDiff,
        page,
        limit: 15,
      });
      setQuestionsList(data.questions || []);
      setTotalQuestions(data.total || 0);
    } catch (err: any) {
      console.warn('Failed to load questions:', err.message);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const users = await getAllUsersAdmin();
      setUsersList(users || []);
    } catch (err: any) {
      console.warn('Failed to load users:', err.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleDeleteQuestion = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete this question?\n"${title}"`)) {
      return;
    }

    try {
      await deleteQuestion(id);
      setStatusMessage({ type: 'success', text: 'Question deleted successfully.' });
      loadQuestions();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete question.' });
    }
  };

  const handleOptionChange = (
    index: number,
    field: 'text_en' | 'text_ta',
    value: string
  ) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setCreateSubmitting(true);

    try {
      const payload = {
        testament,
        book,
        chapter: Number(chapter),
        verse: 1,
        difficulty,
        category,
        question_en: questionEn,
        question_ta: questionTa,
        options,
        correctOptionIndex,
        explanation_en: explanationEn,
        explanation_ta: explanationTa,
      };

      const result = await createQuestion(payload);
      if (result.success) {
        setStatusMessage({
          type: 'success',
          text: `Question for ${book} Chapter ${chapter} created successfully!`,
        });

        // Reset form
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
        verse: Number(editingQuestion.verse),
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
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If NOT authenticated, render clean Card Login Screen (matching user's mockup)
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn">
          {/* Header */}
          <div className="text-left space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Login to your account</h1>
            <p className="text-xs text-slate-400">
              Enter your admin credentials to manage questions and participants.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              {loginError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            {/* Username */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-slate-300">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-slate-300">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-3 px-6 rounded-2xl bg-white text-slate-950 font-black text-sm shadow-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              >
                {loggingIn ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>login</span>
                )}
              </button>
            </div>
          </form>

          {/* Quick link to Home */}
          <div className="border-t border-slate-800/80 pt-4 text-center">
            <a
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Bible Quiz Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">DaQuiz Admin Control Center</h1>
            <p className="text-xs text-slate-400">
              Directly manage question bank, edit/delete questions, and view registered participants.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              loadQuestions();
              loadUsers();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sync Data</span>
          </button>

          <button
            onClick={handleAdminLogout}
            className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30 flex items-center gap-1.5 transition-all"
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
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center justify-between gap-3 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
          </button>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('questions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'questions'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Question Bank ({totalQuestions})</span>
        </button>

        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'create'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Question</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'users'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Registered Participants ({usersList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'system'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>System & Health</span>
        </button>
      </div>

      {/* ================= TAB 1: QUESTION BANK CRUD ================= */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          {/* Filter / Search Toolbar */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-2 min-w-[240px]">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && loadQuestions()}
                  placeholder="Search questions in English, Tamil, or book..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button
                onClick={loadQuestions}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-black"
              >
                Search
              </button>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedDiff}
                onChange={(e) => setSelectedDiff(e.target.value)}
                className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none"
              >
                <option value="ALL">All Difficulties</option>
                <option value="easy">Easy (+100)</option>
                <option value="medium">Medium (+150)</option>
                <option value="hard">Hard (+200)</option>
              </select>

              <button
                onClick={loadQuestions}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Refresh Questions"
              >
                <RefreshCw className={`w-4 h-4 ${loadingQuestions ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Question List Cards */}
          {loadingQuestions ? (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs">Loading question repository...</p>
            </div>
          ) : questionsList.length === 0 ? (
            <div className="glass-panel p-12 rounded-2xl text-center space-y-3">
              <p className="text-slate-400 text-sm">No questions found matching your query.</p>
              <button
                onClick={() => setActiveTab('create')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-black shadow-lg transition-all"
              >
                + Add a New Question Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {questionsList.map((q: any) => (
                <div
                  key={q.id}
                  className="glass-panel p-5 rounded-2xl border border-slate-800/90 hover:border-slate-700 space-y-3 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 text-[10px] font-black uppercase">
                        {q.difficulty}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-bold">
                        {q.book} Ch. {q.chapter}
                      </span>
                      {q.category && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] font-medium">
                          {q.category}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingQuestion(q)}
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-emerald-600/30 text-slate-300 hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
                        title="Edit Question"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q.id, q.question.en)}
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-rose-600/30 text-slate-300 hover:text-rose-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
                        title="Delete Question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white leading-snug">{q.question.en}</p>
                    <p className="text-xs font-tamil text-slate-400 leading-relaxed">{q.question.ta}</p>
                  </div>

                  {/* Options display */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                    {q.options?.map((opt: any, idx: number) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                          opt.isCorrect
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                            : 'bg-slate-900/50 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="font-bold text-[10px] uppercase">{String.fromCharCode(65 + idx)}:</span>
                        <div className="truncate">
                          <span>{opt.text?.en}</span>
                          {opt.text?.ta && <span className="text-slate-500 font-tamil ml-1">({opt.text.ta})</span>}
                        </div>
                        {opt.isCorrect && <Check className="w-3.5 h-3.5 ml-auto text-emerald-400 shrink-0" />}
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
        <form onSubmit={handleCreateSubmit} className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-400" />
              <span>Create New Bilingual Question</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Testament</label>
              <select
                value={testament}
                onChange={(e) => setTestament(e.target.value as 'OT' | 'NT')}
                className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white"
              >
                <option value="OT">Old Testament (OT)</option>
                <option value="NT">New Testament (NT)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Book Name</label>
              <input
                type="text"
                required
                value={book}
                onChange={(e) => setBook(e.target.value)}
                placeholder="e.g. Genesis, Matthew"
                className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white"
              >
                <option value="easy">Easy (+100 pts)</option>
                <option value="medium">Medium (+150 pts)</option>
                <option value="hard">Hard (+200 pts)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Chapter</label>
              <input
                type="number"
                min={1}
                value={chapter}
                onChange={(e) => setChapter(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Topic / Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Creation, Faith"
                className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Question Text (English) *</label>
              <textarea
                required
                rows={2}
                value={questionEn}
                onChange={(e) => setQuestionEn(e.target.value)}
                placeholder="Enter English question text..."
                className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Question Text (தமிழ் / Tamil) *</label>
              <textarea
                required
                rows={2}
                value={questionTa}
                onChange={(e) => setQuestionTa(e.target.value)}
                placeholder="தமிழில் கேள்வியை உள்ளிடவும்..."
                className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white font-tamil"
              />
            </div>
          </div>

          {/* 4 Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-300">
                4 Options (Click any card to select the Correct Answer) *
              </label>
              <span className="text-[11px] text-emerald-400 font-bold">
                ✓ Option {String.fromCharCode(65 + correctOptionIndex)} Selected as Correct
              </span>
            </div>
            <div className="space-y-2.5">
              {options.map((opt, idx) => {
                const isSelected = correctOptionIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setCorrectOptionIndex(idx)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-xs font-black transition-all ${
                            isSelected
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          Option {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {isSelected ? 'Selected Answer' : 'Click to select'}
                        </span>
                      </div>

                      <div
                        className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 shadow-md'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        <span>{isSelected ? 'Correct Answer' : 'Set as Correct'}</span>
                      </div>
                    </div>

                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="text"
                        required
                        value={opt.text_en}
                        onFocus={() => setCorrectOptionIndex(idx)}
                        onChange={(e) => handleOptionChange(idx, 'text_en', e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + idx)} (English)`}
                        className={`w-full px-3 py-2 text-xs rounded-xl text-white transition-colors ${
                          isSelected
                            ? 'bg-slate-900 border border-emerald-500/60 focus:border-emerald-400'
                            : 'bg-slate-950 border border-slate-700 focus:border-slate-500'
                        }`}
                      />
                      <input
                        type="text"
                        required
                        value={opt.text_ta}
                        onFocus={() => setCorrectOptionIndex(idx)}
                        onChange={(e) => handleOptionChange(idx, 'text_ta', e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + idx)} (தமிழ்)`}
                        className={`w-full px-3 py-2 text-xs rounded-xl text-white font-tamil transition-colors ${
                          isSelected
                            ? 'bg-slate-900 border border-emerald-500/60 focus:border-emerald-400'
                            : 'bg-slate-950 border border-slate-700 focus:border-slate-500'
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
              <label className="block text-xs font-bold text-slate-300 mb-1">Scripture Context (English)</label>
              <textarea
                rows={2}
                value={explanationEn}
                onChange={(e) => setExplanationEn(e.target.value)}
                placeholder="Biblical explanation..."
                className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Scripture Context (தமிழ்)</label>
              <textarea
                rows={2}
                value={explanationTa}
                onChange={(e) => setExplanationTa(e.target.value)}
                placeholder="வசன விளக்கம்..."
                className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white font-tamil"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={createSubmitting}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-sm shadow-xl hover:scale-[1.01] transition-all"
          >
            {createSubmitting ? 'Publishing...' : 'Publish Question to Database'}
          </button>
        </form>
      )}

      {/* ================= TAB 3: REGISTERED PARTICIPANTS ================= */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search registered participants by name or phone..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
              />
            </div>
            <button
              onClick={loadUsers}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingUsers ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {loadingUsers ? (
            <div className="py-16 text-center text-slate-400">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="glass-panel p-12 rounded-2xl text-center text-slate-400 text-xs">
              No registered participants found yet. Users will appear here once they login or submit a quiz attempt.
            </div>
          ) : (
            <div className="glass-panel rounded-2xl border border-slate-800 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 text-slate-400 font-extrabold uppercase border-b border-slate-800">
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
                <tbody className="divide-y divide-slate-800/60">
                  {filteredUsers.map((u: any) => (
                    <tr key={u.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-4 font-bold text-white flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <span>{u.name}</span>
                      </td>
                      <td className="p-4 font-mono text-slate-300">{u.phone}</td>
                      <td className="p-4 text-slate-300">{u.age} yrs</td>
                      <td className="p-4 font-extrabold text-amber-400">{u.totalScore} pts</td>
                      <td className="p-4 text-slate-300">{u.quizzesTaken}</td>
                      <td className="p-4 text-slate-300">{u.practiceCount}</td>
                      <td className="p-4 text-slate-500 text-[11px]">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Database Status</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Connection Status:</span>
                <span className="text-emerald-400 font-bold">{healthData?.status || 'Active'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Total Questions:</span>
                <span className="text-white font-bold">{healthData?.stats?.questions || totalQuestions}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Uptime:</span>
                <span className="text-white font-mono">{healthData?.uptime || 'Live'}</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>CRUD Access</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full access granted for creating, updating, and removing Bible quiz questions and managing church participants.
            </p>
          </div>
        </div>
      )}

      {/* ================= EDIT QUESTION MODAL ================= */}
      {editingQuestion && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative z-10 w-full max-w-2xl my-auto glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 space-y-6">
            <button
              onClick={() => setEditingQuestion(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Edit className="w-5 h-5 text-emerald-400" />
              <span>Edit Question ({editingQuestion.book} Ch. {editingQuestion.chapter})</span>
            </h2>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Book</label>
                  <input
                    type="text"
                    value={editingQuestion.book}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, book: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Chapter</label>
                  <input
                    type="number"
                    value={editingQuestion.chapter}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, chapter: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Question (English)</label>
                <textarea
                  rows={2}
                  value={editingQuestion.question.en}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      question: { ...editingQuestion.question, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Question (Tamil)</label>
                <textarea
                  rows={2}
                  value={editingQuestion.question.ta}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      question: { ...editingQuestion.question, ta: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-tamil"
                />
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                <label className="block text-slate-300 font-bold">
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
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[11px] font-black transition-all ${
                            isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Option {String.fromCharCode(65 + idx)}
                        </span>
                        <div
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
                            isSelected
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-800 text-slate-400'
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
                          onFocus={() => {
                            const newOpts = editingQuestion.options.map((o: any, i: number) => ({
                              ...o,
                              isCorrect: i === idx,
                            }));
                            setEditingQuestion({ ...editingQuestion, options: newOpts });
                          }}
                          onChange={(e) => {
                            const newOpts = [...editingQuestion.options];
                            newOpts[idx].text.en = e.target.value;
                            setEditingQuestion({ ...editingQuestion, options: newOpts });
                          }}
                          className={`px-2.5 py-1.5 rounded-lg text-white transition-colors ${
                            isSelected
                              ? 'bg-slate-900 border border-emerald-500/60 focus:border-emerald-400'
                              : 'bg-black/40 border border-slate-700'
                          }`}
                        />
                        <input
                          type="text"
                          value={opt.text.ta}
                          onFocus={() => {
                            const newOpts = editingQuestion.options.map((o: any, i: number) => ({
                              ...o,
                              isCorrect: i === idx,
                            }));
                            setEditingQuestion({ ...editingQuestion, options: newOpts });
                          }}
                          onChange={(e) => {
                            const newOpts = [...editingQuestion.options];
                            newOpts[idx].text.ta = e.target.value;
                            setEditingQuestion({ ...editingQuestion, options: newOpts });
                          }}
                          className={`px-2.5 py-1.5 rounded-lg text-white font-tamil transition-colors ${
                            isSelected
                              ? 'bg-slate-900 border border-emerald-500/60 focus:border-emerald-400'
                              : 'bg-black/40 border border-slate-700'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editSubmitting}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black"
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
