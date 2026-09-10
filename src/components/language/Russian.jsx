// src/components/RussianLanguage.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Volume2,
  Star,
  ChevronLeft,
  ChevronRight,
  Search,
  Sun,
  Moon,
  X,
  MessageCircle,
  Globe,
  TrendingUp,
  GraduationCap,
  Brain,
  Trophy,
  CheckCircle,
} from 'lucide-react';

import {
  russianAlphabet,
  commonPhrases,
  vocabulary,
  russianNumbers,
  grammarRules,
  cultureFacts,
  quizQuestions,
  getVocabularyCategories,
  getPhraseCategories,
} from './data/russianData';

const ITEMS_PER_PAGE = 20;

const RussianLanguage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState('letters');
  const [playingAudio, setPlayingAudio] = useState(null);
  const [bookmarked, setBookmarked] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('russianBookmarks');
      if (saved) setBookmarked(JSON.parse(saved));
    } catch {
      setBookmarked([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('russianBookmarks', JSON.stringify(bookmarked));
  }, [bookmarked]);

  // Reset filters/page when changing sections.
  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm('');
    setSelectedCategory('all');
  }, [selectedTab]);

  const normalize = (value) => String(value ?? '').toLowerCase().trim();

  const matchesSearch = (item) => {
    if (!searchTerm) return true;

    const term = normalize(searchTerm);
    return [
      item.letter,
      item.english,
      item.pronunciation,
      item.word,
      item.russian,
      item.bangla,
      item.category,
      item.title,
      item.description,
    ].some((value) => normalize(value).includes(term));
  };

  const toggleBookmark = (key) => {
    setBookmarked((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

  const getBookmarkKey = (type, id) => `${type}-${id}`;

  const speakWord = (word, lang = 'ru-RU') => {
    if (!word || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = lang;
    utterance.rate = 0.8;

    utterance.onstart = () => setPlayingAudio(word);
    utterance.onend = () => setPlayingAudio(null);
    utterance.onerror = () => setPlayingAudio(null);

    window.speechSynthesis.speak(utterance);
  };

  const filteredPhrases = useMemo(() => {
    return commonPhrases.filter(
      (item) =>
        matchesSearch(item) &&
        (selectedCategory === 'all' || item.category === selectedCategory)
    );
  }, [searchTerm, selectedCategory]);

  const filteredVocabulary = useMemo(() => {
    return vocabulary.filter(
      (item) =>
        matchesSearch(item) &&
        (selectedCategory === 'all' || item.category === selectedCategory)
    );
  }, [searchTerm, selectedCategory]);

  const filteredAlphabet = useMemo(
    () => russianAlphabet.filter(matchesSearch),
    [searchTerm]
  );

  const filteredNumbers = useMemo(
    () => russianNumbers.filter(matchesSearch),
    [searchTerm]
  );

  const categories =
    selectedTab === 'phrases'
      ? getPhraseCategories()
      : selectedTab === 'vocabulary'
        ? getVocabularyCategories()
        : [];

  const getPaginated = (items) => {
    const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const start = (safePage - 1) * ITEMS_PER_PAGE;

    return {
      items: items.slice(start, start + ITEMS_PER_PAGE),
      totalPages,
      page: safePage,
    };
  };

  const openItem = (item, type) => {
    setSelectedItem({ ...item, _type: type });
  };

  const closeModal = () => setSelectedItem(null);

  const handleQuizSubmit = () => {
    let score = 0;

    quizQuestions.forEach((question) => {
      if (quizAnswers[question.id] === question.correct) score += 1;
    });

    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const paginatedNumbers = getPaginated(filteredNumbers);

  const tabs = [
    { id: 'letters', label: 'অক্ষর', icon: BookOpen },
    { id: 'phrases', label: 'বাক্য', icon: MessageCircle },
    { id: 'vocabulary', label: 'শব্দ', icon: Globe },
    { id: 'numbers', label: 'সংখ্যা', icon: TrendingUp },
    { id: 'grammar', label: 'ব্যাকরণ', icon: GraduationCap },
    { id: 'culture', label: 'সংস্কৃতি', icon: Star },
    { id: 'quiz', label: 'কুইজ', icon: Brain },
  ];

  const cardClass = darkMode
    ? 'bg-gray-800 border-gray-700 text-white'
    : 'bg-white border-gray-200 text-gray-800';

  const mutedClass = darkMode ? 'text-gray-400' : 'text-gray-500';

  const renderSearchAndFilters = () => {
    const hasFilters = selectedTab === 'phrases' || selectedTab === 'vocabulary';

    return (
      <div className="mb-6 space-y-3">
        <div className="relative max-w-xl">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${mutedClass}`}
          />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="রুশ, ইংরেজি বা বাংলা দিয়ে খুঁজুন..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-red-500 ${
              darkMode
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'
            }`}
          />
        </div>

        {hasFilters && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${
                selectedCategory === 'all'
                  ? 'bg-red-600 border-red-600 text-white'
                  : darkMode
                    ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              সব
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${
                  selectedCategory === category
                    ? 'bg-red-600 border-red-600 text-white'
                    : darkMode
                      ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const AudioButton = ({ word }) => (
    <button
      type="button"
      aria-label={`${word} উচ্চারণ শুনুন`}
      onClick={(e) => {
        e.stopPropagation();
        speakWord(word);
      }}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition ${
        playingAudio === word
          ? 'bg-green-500 text-white'
          : darkMode
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Volume2 className="w-4 h-4" />
    </button>
  );

  const BookmarkButton = ({ type, id }) => {
    const key = getBookmarkKey(type, id);
    const active = bookmarked.includes(key);

    return (
      <button
        type="button"
        aria-label={active ? 'বুকমার্ক সরান' : 'বুকমার্ক করুন'}
        onClick={(e) => {
          e.stopPropagation();
          toggleBookmark(key);
        }}
        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Star
          className={`w-5 h-5 ${
            active
              ? 'text-yellow-500 fill-current'
              : darkMode
                ? 'text-gray-500'
                : 'text-gray-300'
          }`}
        />
      </button>
    );
  };

  const renderAlphabetTab = () => (
    <div>
      {renderSearchAndFilters()}

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {filteredAlphabet.map((letter) => (
          <motion.div
            key={letter.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => openItem(letter, 'alphabet')}
            className={`border rounded-xl p-4 text-center cursor-pointer hover:-translate-y-0.5 transition ${cardClass}`}
          >
            <div className="flex justify-end">
              <BookmarkButton type="alphabet" id={letter.id} />
            </div>

            <div className="text-3xl font-bold mt-1">{letter.letter}</div>
            <p className={`text-sm mt-1 ${mutedClass}`}>{letter.english}</p>
            <p className={`text-xs mt-0.5 ${mutedClass}`}>
              {letter.pronunciation}
            </p>

            <div className="mt-3">
              <AudioButton word={letter.letter} />
            </div>
          </motion.div>
        ))}
      </div>

      {filteredAlphabet.length === 0 && <EmptyState />}
    </div>
  );

  const renderPhrasesTab = () => (
    <div>
      {renderSearchAndFilters()}

      <div className="space-y-3">
        {filteredPhrases.map((phrase) => (
          <motion.div
            key={phrase.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => openItem(phrase, 'phrase')}
            className={`border rounded-xl p-4 cursor-pointer hover:shadow-sm transition ${cardClass}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-semibold">{phrase.russian}</h3>
                  <AudioButton word={phrase.russian} />
                  {phrase.category && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        darkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {phrase.category}
                    </span>
                  )}
                </div>
                <p className={`text-sm mt-1 ${mutedClass}`}>{phrase.english}</p>
                <p
                  className={`text-sm mt-1 ${
                    darkMode ? 'text-red-300' : 'text-red-600'
                  }`}
                >
                  {phrase.bangla}
                </p>
              </div>

              <BookmarkButton type="phrase" id={phrase.id} />
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPhrases.length === 0 && <EmptyState />}
    </div>
  );

  const renderVocabularyTab = () => (
    <div>
      {renderSearchAndFilters()}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVocabulary.map((word) => (
          <motion.div
            key={word.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => openItem(word, 'vocab')}
            className={`border rounded-xl p-4 cursor-pointer hover:shadow-sm transition ${cardClass}`}
          >
            <div className="flex justify-between items-start gap-2">
              {word.category && (
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {word.category}
                </span>
              )}
              <BookmarkButton type="vocab" id={word.id} />
            </div>

            <h3 className="text-xl font-semibold mt-3">{word.russian}</h3>
            <p className={`text-sm mt-1 ${mutedClass}`}>{word.english}</p>
            <p
              className={`text-sm mt-1 ${
                darkMode ? 'text-red-300' : 'text-red-600'
              }`}
            >
              {word.bangla}
            </p>

            <div className="mt-3">
              <AudioButton word={word.russian} />
            </div>
          </motion.div>
        ))}
      </div>

      {filteredVocabulary.length === 0 && <EmptyState />}
    </div>
  );

  const renderNumbersTab = () => (
    <div>
      {renderSearchAndFilters()}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {paginatedNumbers.items.map((num) => (
          <motion.div
            key={num.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => openItem(num, 'number')}
            className={`border rounded-xl p-4 text-center cursor-pointer hover:-translate-y-0.5 transition ${cardClass}`}
          >
            <div className="text-2xl font-bold text-gray-400">{num.number}</div>
            <h3 className="text-lg font-semibold mt-1">{num.russian}</h3>
            <p className={`text-sm ${mutedClass}`}>{num.english}</p>
            <p
              className={`text-xs mt-1 ${
                darkMode ? 'text-red-300' : 'text-red-600'
              }`}
            >
              {num.bangla}
            </p>
            <div className="mt-3">
              <AudioButton word={num.russian} />
            </div>
          </motion.div>
        ))}
      </div>

      {paginatedNumbers.items.length === 0 && <EmptyState />}

      <Pagination
        page={paginatedNumbers.page}
        totalPages={paginatedNumbers.totalPages}
        setPage={setCurrentPage}
        darkMode={darkMode}
      />
    </div>
  );

  const renderGrammarTab = () => (
    <div className="space-y-4">
      {grammarRules.map((grammar) => (
        <motion.article
          key={grammar.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border rounded-xl p-5 ${cardClass}`}
        >
          <h3 className="text-xl font-semibold">{grammar.title}</h3>
          <p className={`text-sm mt-2 ${mutedClass}`}>{grammar.description}</p>

          <ul className="mt-4 space-y-2">
            {grammar.rules.map((rule, index) => (
              <li
                key={index}
                className={`flex items-start gap-2 text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );

  const renderCultureTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cultureFacts.map((fact) => (
        <motion.article
          key={fact.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border rounded-xl p-5 ${cardClass}`}
        >
          <div className="text-3xl mb-3">{fact.icon}</div>
          <h3 className="text-lg font-semibold">{fact.title}</h3>
          <p className={`text-sm mt-2 leading-6 ${mutedClass}`}>
            {fact.description}
          </p>
        </motion.article>
      ))}
    </div>
  );

  const renderQuizTab = () => {
    if (quizSubmitted) {
      return (
        <div className={`border rounded-xl p-8 text-center ${cardClass}`}>
          <Trophy
            className={`w-14 h-14 mx-auto mb-4 ${
              quizScore >= Math.ceil(quizQuestions.length * 0.8)
                ? 'text-yellow-500'
                : 'text-gray-400'
            }`}
          />

          <h2 className="text-2xl font-bold">
            আপনার স্কোর: {quizScore} / {quizQuestions.length}
          </h2>

          <p className={`text-sm mt-2 mb-6 ${mutedClass}`}>
            {quizScore === quizQuestions.length
              ? '🎉 পারফেক্ট! দারুণ করেছেন!'
              : quizScore >= Math.ceil(quizQuestions.length * 0.6)
                ? '🌟 চমৎকার! আরও একটু অনুশীলন করুন।'
                : '📚 ভালো চেষ্টা! আবার অনুশীলন করুন।'}
          </p>

          <button
            onClick={resetQuiz}
            className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            আবার কুইজ দিন
          </button>
        </div>
      );
    }

    const answered = Object.keys(quizAnswers).length;
    const allAnswered = answered === quizQuestions.length;

    return (
      <div className="space-y-4">
        {quizQuestions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border rounded-xl p-5 ${cardClass}`}
          >
            <h3 className="font-semibold mb-4">
              {index + 1}. {question.question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {question.options.map((option) => {
                const selected = quizAnswers[question.id] === option;

                return (
                  <button
                    key={option}
                    onClick={() =>
                      setQuizAnswers((prev) => ({
                        ...prev,
                        [question.id]: option,
                      }))
                    }
                    className={`p-3 rounded-lg border text-left text-sm transition ${
                      selected
                        ? 'bg-red-600 border-red-600 text-white'
                        : darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}

        <button
          onClick={handleQuizSubmit}
          disabled={!allAnswered}
          className={`w-full py-3 rounded-lg font-medium transition ${
            allAnswered
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {allAnswered
            ? 'ফলাফল দেখুন'
            : `${answered}/${quizQuestions.length} উত্তর দিয়েছেন`}
        </button>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'letters':
        return renderAlphabetTab();
      case 'phrases':
        return renderPhrasesTab();
      case 'vocabulary':
        return renderVocabularyTab();
      case 'numbers':
        return renderNumbersTab();
      case 'grammar':
        return renderGrammarTab();
      case 'culture':
        return renderCultureTab();
      case 'quiz':
        return renderQuizTab();
      default:
        return renderAlphabetTab();
    }
  };

  const modalType = selectedItem?._type;
  const modalKey = selectedItem
    ? getBookmarkKey(modalType, selectedItem.id)
    : null;
  const modalWord =
    selectedItem?.russian ||
    selectedItem?.letter ||
    (selectedItem?.number != null ? String(selectedItem.number) : '');

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? 'dark bg-gray-950' : 'bg-gray-50'
      }`}
    >
      <Helmet>
        <title>রুশ ভাষা শিখুন | Russian Language Vocabulary</title>
        <meta
          name="description"
          content="সহজে রুশ ভাষা শিখুন। রুশ বর্ণমালা, বাক্য, শব্দ, সংখ্যা, ব্যাকরণ, সংস্কৃতি এবং কুইজ অনুশীলন করুন।"
        />
      </Helmet>

      {/* Simple header */}
      <header
        className={`sticky top-0 z-30 border-b ${
          darkMode
            ? 'bg-gray-900/95 border-gray-800'
            : 'bg-white/95 border-gray-200'
        } backdrop-blur`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                to="/"
                aria-label="হোমে ফিরে যান"
                className={`p-2 rounded-lg ${
                  darkMode
                    ? 'hover:bg-gray-800'
                    : 'hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>

              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold truncate">
                  🇷🇺 রুশ ভাষা
                </h1>
                <p className={`text-xs sm:text-sm ${mutedClass}`}>
                  সহজে শিখুন, প্রতিদিন অনুশীলন করুন
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {bookmarked.length > 0 && (
                <span
                  className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs ${
                    darkMode
                      ? 'bg-gray-800 text-yellow-400'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}
                >
                  ⭐ {bookmarked.length}
                </span>
              )}

              <button
                type="button"
                onClick={() => setDarkMode((value) => !value)}
                aria-label={darkMode ? 'লাইট মোড' : 'ডার্ক মোড'}
                className={`p-2 rounded-lg border ${
                  darkMode
                    ? 'border-gray-700 bg-gray-800 text-yellow-400'
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile-friendly horizontal tabs */}
          <nav
            aria-label="রুশ ভাষা শেখার বিভাগ"
            className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = selectedTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedTab(tab.id)}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    active
                      ? 'bg-red-600 text-white'
                      : darkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {renderTabContent()}
      </main>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full sm:max-w-lg sm:rounded-xl rounded-t-2xl border ${
                darkMode
                  ? 'bg-gray-900 border-gray-800'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div
                className={`flex items-center justify-between p-4 border-b ${
                  darkMode ? 'border-gray-800' : 'border-gray-100'
                }`}
              >
                <h2 className="text-xl font-bold">
                  {selectedItem.russian ||
                    selectedItem.letter ||
                    selectedItem.number ||
                    selectedItem.title ||
                    'বিস্তারিত'}
                </h2>

                <button
                  type="button"
                  onClick={closeModal}
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                  }`}
                  aria-label="বন্ধ করুন"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {selectedItem.english && (
                  <Info label="ইংরেজি" value={selectedItem.english} darkMode={darkMode} />
                )}

                {selectedItem.bangla && (
                  <Info
                    label="বাংলা"
                    value={selectedItem.bangla}
                    darkMode={darkMode}
                    accent
                  />
                )}

                {selectedItem.pronunciation && (
                  <Info
                    label="উচ্চারণ"
                    value={selectedItem.pronunciation}
                    darkMode={darkMode}
                  />
                )}

                {selectedItem.category && (
                  <Info
                    label="ক্যাটাগরি"
                    value={selectedItem.category}
                    darkMode={darkMode}
                  />
                )}

                {selectedItem.description && (
                  <Info
                    label="বিবরণ"
                    value={selectedItem.description}
                    darkMode={darkMode}
                  />
                )}

                {modalWord && (
                  <button
                    type="button"
                    onClick={() => speakWord(modalWord)}
                    className="w-full py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center gap-2"
                  >
                    <Volume2 className="w-5 h-5" />
                    উচ্চারণ শুনুন
                  </button>
                )}

                {selectedItem.id && modalKey && (
                  <button
                    type="button"
                    onClick={() => toggleBookmark(modalKey)}
                    className={`w-full py-2.5 rounded-lg border flex items-center justify-center gap-2 transition ${
                      bookmarked.includes(modalKey)
                        ? 'bg-yellow-500 border-yellow-500 text-white'
                        : darkMode
                          ? 'border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        bookmarked.includes(modalKey) ? 'fill-current' : ''
                      }`}
                    />
                    {bookmarked.includes(modalKey)
                      ? 'বুকমার্ক করা আছে'
                      : 'বুকমার্ক করুন'}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Info = ({ label, value, darkMode, accent = false }) => (
  <div>
    <p className={`text-xs mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
      {label}
    </p>
    <p
      className={`text-base ${
        accent
          ? darkMode
            ? 'text-red-300'
            : 'text-red-600'
          : darkMode
            ? 'text-gray-200'
            : 'text-gray-800'
      }`}
    >
      {value}
    </p>
  </div>
);

const EmptyState = () => (
  <div className="py-12 text-center text-gray-500">
    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
    <p>কোনো ফলাফল পাওয়া যায়নি।</p>
  </div>
);

const Pagination = ({ page, totalPages, setPage, darkMode }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => setPage((current) => Math.max(current - 1, 1))}
        className={`p-2 rounded-lg border disabled:opacity-40 ${
          darkMode
            ? 'bg-gray-800 border-gray-700 text-gray-200'
            : 'bg-white border-gray-200 text-gray-700'
        }`}
        aria-label="আগের পৃষ্ঠা"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {page} / {totalPages}
      </span>

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() =>
          setPage((current) => Math.min(current + 1, totalPages))
        }
        className={`p-2 rounded-lg border disabled:opacity-40 ${
          darkMode
            ? 'bg-gray-800 border-gray-700 text-gray-200'
            : 'bg-white border-gray-200 text-gray-700'
        }`}
        aria-label="পরের পৃষ্ঠা"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default RussianLanguage;
