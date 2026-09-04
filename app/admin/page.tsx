'use client';

import React, { useState, useEffect } from 'react';
import { createQuestion } from '@/lib/actions/quizActions';
import {
  ShieldCheck,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Key,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [isKeySaved, setIsKeySaved] = useState(false);

  // Form states
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

  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Health stats
  const [healthData, setHealthData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('daquiz_admin_key');
    if (saved) {
      setAdminKey(saved);
      setIsKeySaved(true);
    }

    // Fetch health data
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setHealthData(data))
      .catch(() => {});
  }, []);

  const handleSaveKey = () => {
    localStorage.setItem('daquiz_admin_key', adminKey);
    setIsKeySaved(true);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setSubmitting(true);

    try {
      const payload = {
        testament,
        book,
        chapter: Number(chapter),
        verse: Number(verse),
        difficulty,
        category,
        question_en: questionEn,
        question_ta: questionTa,
        options,
        correctOptionIndex,
        explanation_en: explanationEn,
        explanation_ta: explanationTa,
        adminKeyProvided: adminKey,
      };

      const result = await createQuestion(payload);
      if (result.success) {
        setStatusMessage({
          type: 'success',
          text: `Question for ${book} ${chapter}:${verse} created successfully! (ID: ${result.id})`,
        });

        // Reset question fields
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

        // Refresh stats
        fetch('/api/health')
          .then((res) => res.json())
          .then((data) => setHealthData(data))
          .catch(() => {});
      }
    } catch (err: any) {
      console.error('Error adding question:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to create question.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
            <h1 className="text-2xl font-black text-slate-900">Admin Question Portal</h1>
          </div>
          <p className="text-sm text-slate-500">
            Create bilingual English & Tamil questions with Scripture references.
          </p>
        </div>

        {/* Database Health Badge */}
        {healthData?.stats && (
          <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-2xl text-xs">
            <Layers className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="font-bold text-slate-700">{healthData.stats.questions}</span>
              <span className="text-slate-500 ml-1">Total Questions</span>
            </div>
          </div>
        )}
      </div>

      {/* Admin Secret Key Banner */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
          <Key className="w-4 h-4 text-emerald-700" />
          <span>Admin Authorization Key</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
          <input
            type="password"
            value={adminKey}
            onChange={(e) => {
              setAdminKey(e.target.value);
              setIsKeySaved(false);
            }}
            placeholder="Enter ADMIN_SECRET_KEY..."
            className="flex-1 px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={handleSaveKey}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-colors"
          >
            {isKeySaved ? 'Saved' : 'Save Key'}
          </button>
        </div>
      </div>

      {/* Status Notifications */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-sm flex items-start gap-3 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Question Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-emerald-600" />
          <span>New Question Details</span>
        </h2>

        {/* Metadata grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Testament</label>
            <select
              value={testament}
              onChange={(e) => setTestament(e.target.value as 'OT' | 'NT')}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="OT">Old Testament (OT)</option>
              <option value="NT">New Testament (NT)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Book Name</label>
            <input
              type="text"
              required
              value={book}
              onChange={(e) => setBook(e.target.value)}
              placeholder="e.g. Genesis, Matthew"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="easy">Easy (100 pts)</option>
              <option value="medium">Medium (150 pts)</option>
              <option value="hard">Hard (200 pts)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Chapter</label>
            <input
              type="number"
              min={1}
              value={chapter}
              onChange={(e) => setChapter(Number(e.target.value))}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Verse</label>
            <input
              type="number"
              min={1}
              value={verse}
              onChange={(e) => setVerse(Number(e.target.value))}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Category / Topic</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Parables, Miracles"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Question text */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Question Text (English) *
            </label>
            <textarea
              required
              rows={2}
              value={questionEn}
              onChange={(e) => setQuestionEn(e.target.value)}
              placeholder="Enter question in English..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Question Text (தமிழ் / Tamil) *
            </label>
            <textarea
              required
              rows={2}
              value={questionTa}
              onChange={(e) => setQuestionTa(e.target.value)}
              placeholder="தமிழில் கேள்வியை உள்ளிடவும்..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* 4 Options */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-bold text-slate-700">
            Options & Correct Answer Selection *
          </label>

          <div className="space-y-3">
            {options.map((opt, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  correctOptionIndex === idx
                    ? 'border-emerald-500 bg-emerald-50/40'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-600">
                    Option {String.fromCharCode(65 + idx)}
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-700">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={correctOptionIndex === idx}
                      onChange={() => setCorrectOptionIndex(idx)}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Mark as Correct Answer</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={opt.text_en}
                    onChange={(e) => handleOptionChange(idx, 'text_en', e.target.value)}
                    placeholder={`Option ${String.fromCharCode(65 + idx)} (English)`}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="text"
                    required
                    value={opt.text_ta}
                    onChange={(e) => handleOptionChange(idx, 'text_ta', e.target.value)}
                    placeholder={`Option ${String.fromCharCode(65 + idx)} (தமிழ்)`}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explanations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Explanation & Reference (English)
            </label>
            <textarea
              rows={2}
              value={explanationEn}
              onChange={(e) => setExplanationEn(e.target.value)}
              placeholder="Scripture reference context..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Explanation & Reference (தமிழ்)
            </label>
            <textarea
              rows={2}
              value={explanationTa}
              onChange={(e) => setExplanationTa(e.target.value)}
              placeholder="வேத வசன விளக்கம்..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{submitting ? 'Saving Question...' : 'Save & Publish Question'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
