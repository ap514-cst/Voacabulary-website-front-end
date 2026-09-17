import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import SEO from "../SEO"

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

const SITE_URL = 'https://learnixdb.com';
const RUSSIAN_PAGE_URL = '/language/russian';

const SEO_TITLE =
  'Russian Language শিখুন বাংলা অর্থ ও উচ্চারণসহ';

const SEO_DESCRIPTION =
  'Learn Russian language with Bangla meaning, Russian alphabet, vocabulary, common phrases, numbers, pronunciation, grammar, culture and interactive quizzes on LearnixDB.';

const SEO_KEYWORDS = [
  'Russian language',
  'Learn Russian',
  'Russian vocabulary',
  'Russian vocabulary with Bangla meaning',
  'Russian words with Bangla meaning',
  'Russian alphabet',
  'Russian phrases',
  'Russian grammar',
  'Russian numbers',
  'Russian pronunciation',
  'Russian culture',
  'Russian quiz',
  'Russian language learning',
  'রুশ ভাষা শেখা',
  'রুশ ভাষা',
  'রুশ শব্দ',
  'রুশ ভোকাবুলারি',
  'রুশ বাংলা অর্থ',
  'রুশ উচ্চারণ',
  'রুশ ব্যাকরণ',
];

const normalize = (value) =>
  String(value ?? '')
    .toLowerCase()
    .trim();

const matchesSearch = (item, searchTerm) => {
  if (!searchTerm.trim()) {
    return true;
  }

  const term = normalize(searchTerm);

  const searchableValues = [
    item.letter,
    item.english,
    item.pronunciation,
    item.word,
    item.russian,
    item.bangla,
    item.category,
    item.title,
    item.description,
    item.number,
  ];

  return searchableValues.some((value) =>
    normalize(value).includes(term)
  );
};

const RussianLanguage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState('letters');

  const [playingAudio, setPlayingAudio] = useState(null);
  const [bookmarked, setBookmarked] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // ========================================
  // SEO Structured Data
  // ========================================

  const breadcrumbs = useMemo(
    () => [
      {
        name: 'Home',
        url: '/',
      },
      {
        name: 'Russian Language',
        url: RUSSIAN_PAGE_URL,
      },
    ],
    []
  );

  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: SEO_TITLE,
      description: SEO_DESCRIPTION,
      url: `${SITE_URL}${RUSSIAN_PAGE_URL}`,
      isPartOf: {
        '@type': 'WebSite',
        name: 'LearnixDB',
        url: SITE_URL,
      },
      about: {
        '@type': 'Thing',
        name: 'Russian Language Learning',
      },
      inLanguage: 'bn',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${SITE_URL}${item.url}`,
        })),
      },
    }),
    [breadcrumbs]
  );

  // ========================================
  // Load bookmarks
  // ========================================

  useEffect(() => {
    try {
      const saved = localStorage.getItem('russianBookmarks');

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setBookmarked(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
      setBookmarked([]);
    }
  }, []);

  // ========================================
  // Save bookmarks
  // ========================================

  useEffect(() => {
    try {
      localStorage.setItem(
        'russianBookmarks',
        JSON.stringify(bookmarked)
      );
    } catch (error) {
      console.error('Failed to save bookmarks:', error);
    }
  }, [bookmarked]);

  // ========================================
  // Load dark mode
  // ========================================

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('russianDarkMode');

      if (savedTheme === 'true') {
        setDarkMode(true);
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  }, []);

  // ========================================
  // Save dark mode
  // ========================================

  useEffect(() => {
    try {
      localStorage.setItem(
        'russianDarkMode',
        String(darkMode)
      );
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, [darkMode]);

  // ========================================
  // Reset filters when tab changes
  // ========================================

  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm('');
    setSelectedCategory('all');
  }, [selectedTab]);

  // ========================================
  // Escape key for modal
  // ========================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // ========================================
  // Stop speech when component unmounts
  // ========================================

  useEffect(() => {
    return () => {
      if (
        typeof window !== 'undefined' &&
        'speechSynthesis' in window
      ) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // ========================================
  // Bookmark
  // ========================================

  const getBookmarkKey = (type, id) => {
    return `${type}-${id}`;
  };

  const toggleBookmark = (key) => {
    if (!key) return;

    setBookmarked((previous) => {
      if (previous.includes(key)) {
        return previous.filter((item) => item !== key);
      }

      return [...previous, key];
    });
  };

  // ========================================
  // Text to speech
  // ========================================

  const speakWord = (word, lang = 'ru-RU') => {
    if (!word) return;

    if (
      typeof window === 'undefined' ||
      !('speechSynthesis' in window)
    ) {
      alert('আপনার browser-এ audio support নেই।');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      String(word)
    );

    utterance.lang = lang;
    utterance.rate = 0.8;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setPlayingAudio(String(word));
    };

    utterance.onend = () => {
      setPlayingAudio(null);
    };

    utterance.onerror = () => {
      setPlayingAudio(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // ========================================
  // Filtered data
  // ========================================

  const filteredPhrases = useMemo(() => {
    return commonPhrases.filter((item) => {
      const searchMatch = matchesSearch(
        item,
        searchTerm
      );

      const categoryMatch =
        selectedCategory === 'all' ||
        item.category === selectedCategory;

      return searchMatch && categoryMatch;
    });
  }, [searchTerm, selectedCategory]);

  const filteredVocabulary = useMemo(() => {
    return vocabulary.filter((item) => {
      const searchMatch = matchesSearch(
        item,
        searchTerm
      );

      const categoryMatch =
        selectedCategory === 'all' ||
        item.category === selectedCategory;

      return searchMatch && categoryMatch;
    });
  }, [searchTerm, selectedCategory]);

  const filteredAlphabet = useMemo(() => {
    return russianAlphabet.filter((item) =>
      matchesSearch(item, searchTerm)
    );
  }, [searchTerm]);

  const filteredNumbers = useMemo(() => {
    return russianNumbers.filter((item) =>
      matchesSearch(item, searchTerm)
    );
  }, [searchTerm]);

  // ========================================
  // Categories
  // ========================================

  const categories = useMemo(() => {
    if (selectedTab === 'phrases') {
      return getPhraseCategories();
    }

    if (selectedTab === 'vocabulary') {
      return getVocabularyCategories();
    }

    return [];
  }, [selectedTab]);

  // ========================================
  // Pagination
  // ========================================

  const getPaginated = (items) => {
    const totalPages = Math.max(
      1,
      Math.ceil(items.length / ITEMS_PER_PAGE)
    );

    const safePage = Math.min(
      Math.max(currentPage, 1),
      totalPages
    );

    const start =
      (safePage - 1) * ITEMS_PER_PAGE;

    return {
      items: items.slice(
        start,
        start + ITEMS_PER_PAGE
      ),
      totalPages,
      page: safePage,
    };
  };

  const paginatedAlphabet =
    getPaginated(filteredAlphabet);

  const paginatedPhrases =
    getPaginated(filteredPhrases);

  const paginatedVocabulary =
    getPaginated(filteredVocabulary);

  const paginatedNumbers =
    getPaginated(filteredNumbers);

  // ========================================
  // Modal
  // ========================================

  const openItem = (item, type) => {
    setSelectedItem({
      ...item,
      _type: type,
    });
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  // ========================================
  // Quiz
  // ========================================

  const handleQuizSubmit = () => {
    let score = 0;

    quizQuestions.forEach((question) => {
      if (
        quizAnswers[question.id] ===
        question.correct
      ) {
        score += 1;
      }
    });

    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // ========================================
  // Tabs
  // ========================================

  const tabs = [
    {
      id: 'letters',
      label: 'অক্ষর',
      icon: BookOpen,
    },
    {
      id: 'phrases',
      label: 'বাক্য',
      icon: MessageCircle,
    },
    {
      id: 'vocabulary',
      label: 'শব্দ',
      icon: Globe,
    },
    {
      id: 'numbers',
      label: 'সংখ্যা',
      icon: TrendingUp,
    },
    {
      id: 'grammar',
      label: 'ব্যাকরণ',
      icon: GraduationCap,
    },
    {
      id: 'culture',
      label: 'সংস্কৃতি',
      icon: Star,
    },
    {
      id: 'quiz',
      label: 'কুইজ',
      icon: Brain,
    },
  ];

  // ========================================
  // Theme classes
  // ========================================

  const cardClass = darkMode
    ? 'bg-gray-800 border-gray-700 text-white'
    : 'bg-white border-gray-200 text-gray-800';

  const mutedClass = darkMode
    ? 'text-gray-400'
    : 'text-gray-500';

  const inputClass = darkMode
    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
    : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400';

  // ========================================
  // Search and filters
  // ========================================

  const renderSearchAndFilters = () => {
    const hasCategoryFilter =
      selectedTab === 'phrases' ||
      selectedTab === 'vocabulary';

    return (
      <div className="mb-6 space-y-3">
        {/* Search */}

        <div className="relative max-w-xl">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${mutedClass}`}
          />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="রুশ, ইংরেজি বা বাংলা দিয়ে খুঁজুন..."
            aria-label="রুশ ভাষার শব্দ ও বাক্য খুঁজুন"
            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-red-500 ${inputClass}`}
          />
        </div>

        {/* Category filters */}

        {hasCategoryFilter &&
          categories.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setCurrentPage(1);
                }}
                aria-pressed={
                  selectedCategory === 'all'
                }
                className={
                  selectedCategory === 'all'
                    ? 'px-3 py-1.5 rounded-full text-sm border bg-red-600 border-red-600 text-white whitespace-nowrap'
                    : darkMode
                      ? 'px-3 py-1.5 rounded-full text-sm border bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 whitespace-nowrap'
                      : 'px-3 py-1.5 rounded-full text-sm border bg-white border-gray-200 text-gray-600 hover:bg-gray-50 whitespace-nowrap'
                }
              >
                সব
              </button>

              {categories.map(
                (category, categoryIndex) => {
                  const active =
                    selectedCategory === category;

                  const categoryClass = active
                    ? 'bg-red-600 border-red-600 text-white'
                    : darkMode
                      ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50';

                  return (
                    <button
                      key={`${selectedTab}-category-${category}-${categoryIndex}`}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(
                          category
                        );
                        setCurrentPage(1);
                      }}
                      aria-pressed={active}
                      className={`px-3 py-1.5 rounded-full text-sm border whitespace-nowrap transition ${categoryClass}`}
                    >
                      {category}
                    </button>
                  );
                }
              )}
            </div>
          )}
      </div>
    );
  };

  // ========================================
  // Audio button
  // ========================================

  const AudioButton = ({ word }) => {
    const isPlaying =
      playingAudio === String(word);

    let audioClass =
      'inline-flex items-center justify-center w-9 h-9 rounded-full transition';

    if (isPlaying) {
      audioClass +=
        ' bg-green-500 text-white';
    } else if (darkMode) {
      audioClass +=
        ' bg-gray-700 text-gray-200 hover:bg-gray-600';
    } else {
      audioClass +=
        ' bg-gray-100 text-gray-700 hover:bg-gray-200';
    }

    return (
      <button
        type="button"
        aria-label={`${word} উচ্চারণ শুনুন`}
        aria-pressed={isPlaying}
        onClick={(event) => {
          event.stopPropagation();
          speakWord(word);
        }}
        className={audioClass}
      >
        <Volume2 className="w-4 h-4" />
      </button>
    );
  };

  // ========================================
  // Bookmark button
  // ========================================

  const BookmarkButton = ({ type, id }) => {
    const key = getBookmarkKey(type, id);
    const active = bookmarked.includes(key);

    const buttonClass = darkMode
      ? 'p-1.5 rounded-md hover:bg-gray-700 transition'
      : 'p-1.5 rounded-md hover:bg-gray-100 transition';

    let starClass = 'w-5 h-5';

    if (active) {
      starClass +=
        ' text-yellow-500 fill-current';
    } else if (darkMode) {
      starClass += ' text-gray-500';
    } else {
      starClass += ' text-gray-300';
    }

    return (
      <button
        type="button"
        aria-label={
          active
            ? 'বুকমার্ক সরান'
            : 'বুকমার্ক করুন'
        }
        aria-pressed={active}
        onClick={(event) => {
          event.stopPropagation();
          toggleBookmark(key);
        }}
        className={buttonClass}
      >
        <Star className={starClass} />
      </button>
    );
  };

  // ========================================
  // Alphabet
  // ========================================

  const renderAlphabetTab = () => {
    return (
      <div>
        {renderSearchAndFilters()}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {paginatedAlphabet.items.map(
            (letter, index) => (
              <motion.div
                key={`alphabet-${letter.id ?? letter.letter}-${index}`}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                onClick={() =>
                  openItem(
                    letter,
                    'alphabet'
                  )
                }
                className={`border rounded-xl p-4 text-center cursor-pointer hover:-translate-y-0.5 transition ${cardClass}`}
              >
                <div className="flex justify-end">
                  <BookmarkButton
                    type="alphabet"
                    id={
                      letter.id ??
                      letter.letter
                    }
                  />
                </div>

                <div className="text-3xl font-bold mt-1">
                  {letter.letter}
                </div>

                <p
                  className={`text-sm mt-1 ${mutedClass}`}
                >
                  {letter.english}
                </p>

                <p
                  className={`text-xs mt-0.5 ${mutedClass}`}
                >
                  {letter.pronunciation}
                </p>

                <div className="mt-3">
                  <AudioButton
                    word={letter.letter}
                  />
                </div>
              </motion.div>
            )
          )}
        </div>

        {filteredAlphabet.length === 0 && (
          <EmptyState />
        )}

        <Pagination
          page={paginatedAlphabet.page}
          totalPages={
            paginatedAlphabet.totalPages
          }
          setPage={setCurrentPage}
          darkMode={darkMode}
        />
      </div>
    );
  };

  // ========================================
  // Phrases
  // ========================================

  const renderPhrasesTab = () => {
    return (
      <div>
        {renderSearchAndFilters()}

        <div className="space-y-3">
          {paginatedPhrases.items.map(
            (phrase, index) => (
              <motion.div
                key={`phrase-${phrase.id ?? phrase.russian}-${index}`}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                onClick={() =>
                  openItem(
                    phrase,
                    'phrase'
                  )
                }
                className={`border rounded-xl p-4 cursor-pointer hover:shadow-sm transition ${cardClass}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold">
                        {phrase.russian}
                      </h3>

                      <AudioButton
                        word={
                          phrase.russian
                        }
                      />

                      {phrase.category && (
                        <span
                          className={
                            darkMode
                              ? 'px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300'
                              : 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600'
                          }
                        >
                          {phrase.category}
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-sm mt-1 ${mutedClass}`}
                    >
                      {phrase.english}
                    </p>

                    <p
                      className={
                        darkMode
                          ? 'text-sm mt-1 text-red-300'
                          : 'text-sm mt-1 text-red-600'
                      }
                    >
                      {phrase.bangla}
                    </p>
                  </div>

                  <BookmarkButton
                    type="phrase"
                    id={
                      phrase.id ??
                      phrase.russian
                    }
                  />
                </div>
              </motion.div>
            )
          )}
        </div>

        {filteredPhrases.length === 0 && (
          <EmptyState />
        )}

        <Pagination
          page={paginatedPhrases.page}
          totalPages={
            paginatedPhrases.totalPages
          }
          setPage={setCurrentPage}
          darkMode={darkMode}
        />
      </div>
    );
  };

  // ========================================
  // Vocabulary
  // ========================================

  const renderVocabularyTab = () => {
    return (
      <div>
        {renderSearchAndFilters()}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedVocabulary.items.map(
            (word, index) => (
              <motion.div
                key={`vocabulary-${word.id ?? word.russian}-${index}`}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                onClick={() =>
                  openItem(
                    word,
                    'vocab'
                  )
                }
                className={`border rounded-xl p-4 cursor-pointer hover:shadow-sm transition ${cardClass}`}
              >
                <div className="flex justify-between items-start gap-2">
                  {word.category ? (
                    <span
                      className={
                        darkMode
                          ? 'px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300'
                          : 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600'
                      }
                    >
                      {word.category}
                    </span>
                  ) : (
                    <span />
                  )}

                  <BookmarkButton
                    type="vocab"
                    id={
                      word.id ??
                      word.russian
                    }
                  />
                </div>

                <h3 className="text-xl font-semibold mt-3">
                  {word.russian}
                </h3>

                <p
                  className={`text-sm mt-1 ${mutedClass}`}
                >
                  {word.english}
                </p>

                <p
                  className={
                    darkMode
                      ? 'text-sm mt-1 text-red-300'
                      : 'text-sm mt-1 text-red-600'
                  }
                >
                  {word.bangla}
                </p>

                <div className="mt-3">
                  <AudioButton
                    word={word.russian}
                  />
                </div>
              </motion.div>
            )
          )}
        </div>

        {filteredVocabulary.length === 0 && (
          <EmptyState />
        )}

        <Pagination
          page={paginatedVocabulary.page}
          totalPages={
            paginatedVocabulary.totalPages
          }
          setPage={setCurrentPage}
          darkMode={darkMode}
        />
      </div>
    );
  };

  // ========================================
  // Numbers
  // ========================================

  const renderNumbersTab = () => {
    return (
      <div>
        {renderSearchAndFilters()}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {paginatedNumbers.items.map(
            (num, index) => (
              <motion.div
                key={`number-${num.id ?? num.number}-${index}`}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                onClick={() =>
                  openItem(
                    num,
                    'number'
                  )
                }
                className={`border rounded-xl p-4 text-center cursor-pointer hover:-translate-y-0.5 transition ${cardClass}`}
              >
                <div className="text-2xl font-bold text-gray-400">
                  {num.number}
                </div>

                <h3 className="text-lg font-semibold mt-1">
                  {num.russian}
                </h3>

                <p
                  className={`text-sm ${mutedClass}`}
                >
                  {num.english}
                </p>

                <p
                  className={
                    darkMode
                      ? 'text-xs mt-1 text-red-300'
                      : 'text-xs mt-1 text-red-600'
                  }
                >
                  {num.bangla}
                </p>

                <div className="mt-3">
                  <AudioButton
                    word={num.russian}
                  />
                </div>
              </motion.div>
            )
          )}
        </div>

        {filteredNumbers.length === 0 && (
          <EmptyState />
        )}

        <Pagination
          page={paginatedNumbers.page}
          totalPages={
            paginatedNumbers.totalPages
          }
          setPage={setCurrentPage}
          darkMode={darkMode}
        />
      </div>
    );
  };

  // ========================================
  // Grammar
  // ========================================

  const renderGrammarTab = () => {
    return (
      <div className="space-y-4">
        {grammarRules.map(
          (grammar, grammarIndex) => (
            <motion.article
              key={`grammar-${grammar.id ?? grammar.title}-${grammarIndex}`}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className={`border rounded-xl p-5 ${cardClass}`}
            >
              <h3 className="text-xl font-semibold">
                {grammar.title}
              </h3>

              <p
                className={`text-sm mt-2 ${mutedClass}`}
              >
                {grammar.description}
              </p>

              <ul className="mt-4 space-y-2">
                {grammar.rules.map(
                  (rule, ruleIndex) => (
                    <li
                      key={`grammar-rule-${grammarIndex}-${ruleIndex}`}
                      className={
                        darkMode
                          ? 'flex items-start gap-2 text-sm text-gray-300'
                          : 'flex items-start gap-2 text-sm text-gray-700'
                      }
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />

                      <span>{rule}</span>
                    </li>
                  )
                )}
              </ul>
            </motion.article>
          )
        )}
      </div>
    );
  };

  // ========================================
  // Culture
  // ========================================

  const renderCultureTab = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cultureFacts.map(
          (fact, index) => (
            <motion.article
              key={`culture-${fact.id ?? fact.title}-${index}`}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className={`border rounded-xl p-5 ${cardClass}`}
            >
              <div className="text-3xl mb-3">
                {fact.icon}
              </div>

              <h3 className="text-lg font-semibold">
                {fact.title}
              </h3>

              <p
                className={`text-sm mt-2 leading-6 ${mutedClass}`}
              >
                {fact.description}
              </p>
            </motion.article>
          )
        )}
      </div>
    );
  };

  // ========================================
  // Quiz
  // ========================================

  const renderQuizTab = () => {
    if (
      !quizQuestions ||
      quizQuestions.length === 0
    ) {
      return <EmptyState />;
    }

    if (quizSubmitted) {
      const percentage = Math.round(
        (quizScore /
          quizQuestions.length) *
        100
      );

      const trophyClass =
        quizScore >=
          Math.ceil(
            quizQuestions.length * 0.8
          )
          ? 'w-14 h-14 mx-auto mb-4 text-yellow-500'
          : 'w-14 h-14 mx-auto mb-4 text-gray-400';

      let resultMessage =
        '📚 ভালো চেষ্টা! আবার অনুশীলন করুন।';

      if (
        quizScore ===
        quizQuestions.length
      ) {
        resultMessage =
          '🎉 পারফেক্ট! দারুণ করেছেন!';
      } else if (
        quizScore >=
        Math.ceil(
          quizQuestions.length * 0.6
        )
      ) {
        resultMessage =
          '🌟 চমৎকার! আরও একটু অনুশীলন করুন।';
      }

      return (
        <div
          className={`border rounded-xl p-8 text-center ${cardClass}`}
        >
          <Trophy
            className={trophyClass}
          />

          <h2 className="text-2xl font-bold">
            আপনার স্কোর: {quizScore} /{' '}
            {quizQuestions.length}
          </h2>

          <p
            className={`text-lg font-semibold mt-2 ${mutedClass}`}
          >
            {percentage}%
          </p>

          <p
            className={`text-sm mt-2 mb-6 ${mutedClass}`}
          >
            {resultMessage}
          </p>

          <button
            type="button"
            onClick={resetQuiz}
            className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            আবার কুইজ দিন
          </button>
        </div>
      );
    }

    const answered =
      Object.keys(quizAnswers).length;

    const allAnswered =
      answered === quizQuestions.length;

    return (
      <div className="space-y-4">
        {quizQuestions.map(
          (question, questionIndex) => {
            const questionKey =
              question.id ??
              `question-${questionIndex}`;

            return (
              <motion.div
                key={`quiz-question-${questionKey}-${questionIndex}`}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className={`border rounded-xl p-5 ${cardClass}`}
              >
                <h3 className="font-semibold mb-4">
                  {questionIndex + 1}.{' '}
                  {question.question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {question.options.map(
                    (
                      option,
                      optionIndex
                    ) => {
                      const selected =
                        quizAnswers[
                        question.id
                        ] === option;

                      let optionClass = '';

                      if (selected) {
                        optionClass =
                          'bg-red-600 border-red-600 text-white';
                      } else if (
                        darkMode
                      ) {
                        optionClass =
                          'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600';
                      } else {
                        optionClass =
                          'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100';
                      }

                      return (
                        <button
                          key={`quiz-option-${questionIndex}-${optionIndex}`}
                          type="button"
                          onClick={() => {
                            setQuizAnswers(
                              (previous) => ({
                                ...previous,
                                [question.id]:
                                  option,
                              })
                            );
                          }}
                          aria-pressed={selected}
                          className={`p-3 rounded-lg border text-left text-sm transition ${optionClass}`}
                        >
                          {option}
                        </button>
                      );
                    }
                  )}
                </div>
              </motion.div>
            );
          }
        )}

        <button
          type="button"
          onClick={handleQuizSubmit}
          disabled={!allAnswered}
          className={
            allAnswered
              ? 'w-full py-3 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition'
              : 'w-full py-3 rounded-lg font-medium bg-gray-200 text-gray-400 cursor-not-allowed'
          }
        >
          {allAnswered
            ? 'ফলাফল দেখুন'
            : `${answered}/${quizQuestions.length} উত্তর দিয়েছেন`}
        </button>
      </div>
    );
  };

  // ========================================
  // Render selected tab
  // ========================================

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

  // ========================================
  // Modal values
  // ========================================

  const modalType =
    selectedItem?._type;

  const getModalId = () => {
    if (!selectedItem) return null;

    if (selectedItem.id != null) {
      return selectedItem.id;
    }

    if (modalType === 'alphabet') {
      return selectedItem.letter;
    }

    if (modalType === 'phrase') {
      return selectedItem.russian;
    }

    if (modalType === 'vocab') {
      return selectedItem.russian;
    }

    if (modalType === 'number') {
      return selectedItem.number;
    }

    return (
      selectedItem.title ||
      selectedItem.russian ||
      selectedItem.letter
    );
  };

  const modalId = getModalId();

  const modalKey =
    modalType && modalId != null
      ? getBookmarkKey(
        modalType,
        modalId
      )
      : null;

  const modalWord =
    selectedItem?.russian ||
    selectedItem?.letter ||
    (selectedItem?.number != null
      ? String(selectedItem.number)
      : '');

  const modalBookmarked =
    modalKey &&
    bookmarked.includes(modalKey);

  // ========================================
  // Main UI
  // ========================================

  return (
    <div
      className={
        darkMode
          ? 'min-h-screen bg-gray-950 text-white transition-colors'
          : 'min-h-screen bg-gray-50 text-gray-800 transition-colors'
      }
    >
      {/* ================================== */}
      {/* SEO */}
      {/* ================================== */}

      <SEO
        title={SEO_TITLE}
        description={SEO_DESCRIPTION}
        keywords={SEO_KEYWORDS}
        path={RUSSIAN_PAGE_URL}
        type="website"
        image={`${SITE_URL}/Vicon.png`}
        structuredData={structuredData}
      />

      {/* ================================== */}
      {/* Header */}
      {/* ================================== */}

      <header
        className={
          darkMode
            ? 'sticky top-0 z-30 border-b border-gray-800 bg-gray-900/95 backdrop-blur'
            : 'sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur'
        }
      >
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Logo / Title */}

            <div className="flex items-center gap-3 min-w-0">
              <Link
                to="/"
                aria-label="হোমে ফিরে যান"
                className={
                  darkMode
                    ? 'p-2 rounded-lg hover:bg-gray-800 transition'
                    : 'p-2 rounded-lg hover:bg-gray-100 transition'
                }
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>

              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold truncate">
                  রুশ ভাষা শিখুন বাংলা অর্থ ও উচ্চারণসহ
                </h1>

                <p
                  className={`text-xs sm:text-sm ${mutedClass}`}
                >
                  Russian vocabulary বাংলা অর্থ, pronunciation এবং
                  প্রয়োজনীয় examples সহ শিখুন। নতুনদের জন্য সহজ
                  Russian language learning resources ব্যবহার করে
                  ধীরে ধীরে vocabulary তৈরি করুন।
                </p>
              </div>
            </div>

            {/* Header actions */}

            <div className="flex items-center gap-2 shrink-0">
              {bookmarked.length > 0 && (
                <span
                  className={
                    darkMode
                      ? 'hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs bg-gray-800 text-yellow-400'
                      : 'hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs bg-yellow-50 text-yellow-700'
                  }
                >
                  ⭐ {bookmarked.length}
                </span>
              )}

              <button
                type="button"
                onClick={() =>
                  setDarkMode(
                    (value) => !value
                  )
                }
                aria-label={
                  darkMode
                    ? 'লাইট মোড'
                    : 'ডার্ক মোড'
                }
                aria-pressed={darkMode}
                className={
                  darkMode
                    ? 'p-2 rounded-lg border border-gray-700 bg-gray-800 text-yellow-400 hover:bg-gray-700 transition'
                    : 'p-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 transition'
                }
              >
                {darkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Tabs */}

          <nav
            aria-label="রুশ ভাষা শেখার বিভাগ"
            className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active =
                selectedTab === tab.id;

              let tabClass = '';

              if (active) {
                tabClass =
                  'bg-red-600 text-white';
              } else if (darkMode) {
                tabClass =
                  'bg-gray-800 text-gray-300 hover:bg-gray-700';
              } else {
                tabClass =
                  'bg-gray-100 text-gray-700 hover:bg-gray-200';
              }

              return (
                <button
                  key={`tab-${tab.id}`}
                  type="button"
                  onClick={() => {
                    setSelectedTab(tab.id);
                  }}
                  aria-pressed={active}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${tabClass}`}
                >
                  <Icon className="w-4 h-4" />

                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ================================== */}
      {/* Main */}
      {/* ================================== */}

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Russian Vocabulary, Alphabet ও Common Phrases বাংলা অর্থসহ
          </h2>

          <p className={`max-w-3xl leading-7 ${mutedClass}`}>
            LearnixDB-তে সহজভাবে Russian ও রুশ ভাষা শিখুন। Russian
            alphabet, vocabulary, common phrases, numbers, pronunciation,
            grammar এবং Russian culture বাংলা ব্যাখ্যাসহ অনুশীলন করুন।
            নতুনদের জন্য প্রয়োজনীয় Russian words ও দৈনন্দিন কথোপকথনের
            বাক্য এক জায়গায় শিখে আপনার ভাষা দক্ষতা ধীরে ধীরে উন্নত করুন।
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm">
            <Link to="/" className="text-red-600 hover:underline">
              LearnixDB Home
            </Link>
            <Link to="/voc" className="text-red-600 hover:underline">
              English Vocabulary
            </Link>
            <Link to="/grammar" className="text-red-600 hover:underline">
              English Grammar
            </Link>
            <Link to="/language/chinese" className="text-red-600 hover:underline">
              Chinese Language
            </Link>
          </div>
        </section>

        <section
          aria-labelledby="russian-learning-overview"
          className="mb-8"
        >
          <h2
            id="russian-learning-overview"
            className="text-2xl sm:text-3xl font-bold mb-3"
          >
            Russian Language Learning: Alphabet, Vocabulary, Grammar ও Quiz
          </h2>

          <p className={`max-w-3xl leading-7 ${mutedClass}`}>
            Russian vocabulary বাংলা অর্থসহ শেখার পাশাপাশি Russian
            pronunciation শুনে অনুশীলন করুন। Russian alphabet থেকে শুরু
            করে common phrases, numbers, grammar rules, culture facts এবং
            interactive quiz ব্যবহার করে ধাপে ধাপে শেখার সুযোগ পাবেন।
          </p>
        </section>

        {renderTabContent()}
      </main>

      {/* ================================== */}
      {/* Detail Modal */}
      {/* ================================== */}

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={closeModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="russian-detail-title"
              initial={{
                y: 30,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 30,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className={
                darkMode
                  ? 'w-full sm:max-w-lg sm:rounded-xl rounded-t-2xl border bg-gray-900 border-gray-800 max-h-[90vh] overflow-y-auto'
                  : 'w-full sm:max-w-lg sm:rounded-xl rounded-t-2xl border bg-white border-gray-200 max-h-[90vh] overflow-y-auto'
              }
            >
              {/* Modal header */}

              <div
                className={
                  darkMode
                    ? 'flex items-center justify-between p-4 border-b border-gray-800'
                    : 'flex items-center justify-between p-4 border-b border-gray-100'
                }
              >
                <h2
                  id="russian-detail-title"
                  className="text-xl font-bold"
                >
                  {selectedItem.russian ||
                    selectedItem.letter ||
                    selectedItem.number ||
                    selectedItem.title ||
                    'বিস্তারিত'}
                </h2>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="বন্ধ করুন"
                  className={
                    darkMode
                      ? 'p-2 rounded-lg hover:bg-gray-800 transition'
                      : 'p-2 rounded-lg hover:bg-gray-100 transition'
                  }
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal content */}

              <div className="p-5 space-y-4">
                {selectedItem.english && (
                  <Info
                    label="ইংরেজি"
                    value={
                      selectedItem.english
                    }
                    darkMode={darkMode}
                  />
                )}

                {selectedItem.bangla && (
                  <Info
                    label="বাংলা"
                    value={
                      selectedItem.bangla
                    }
                    darkMode={darkMode}
                    accent
                  />
                )}

                {selectedItem.pronunciation && (
                  <Info
                    label="উচ্চারণ"
                    value={
                      selectedItem.pronunciation
                    }
                    darkMode={darkMode}
                  />
                )}

                {selectedItem.category && (
                  <Info
                    label="ক্যাটাগরি"
                    value={
                      selectedItem.category
                    }
                    darkMode={darkMode}
                  />
                )}

                {selectedItem.description && (
                  <Info
                    label="বিবরণ"
                    value={
                      selectedItem.description
                    }
                    darkMode={darkMode}
                  />
                )}

                {modalWord && (
                  <button
                    type="button"
                    onClick={() =>
                      speakWord(
                        modalWord
                      )
                    }
                    className="w-full py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center gap-2"
                  >
                    <Volume2 className="w-5 h-5" />

                    উচ্চারণ শুনুন
                  </button>
                )}

                {modalKey && (
                  <button
                    type="button"
                    onClick={() =>
                      toggleBookmark(
                        modalKey
                      )
                    }
                    aria-pressed={
                      modalBookmarked
                    }
                    className={
                      modalBookmarked
                        ? 'w-full py-2.5 rounded-lg border bg-yellow-500 border-yellow-500 text-white flex items-center justify-center gap-2 transition'
                        : darkMode
                          ? 'w-full py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 flex items-center justify-center gap-2 transition'
                          : 'w-full py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2 transition'
                    }
                  >
                    <Star
                      className={
                        modalBookmarked
                          ? 'w-5 h-5 fill-current'
                          : 'w-5 h-5'
                      }
                    />

                    {modalBookmarked
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

// ========================================
// Info Component
// ========================================

const Info = ({
  label,
  value,
  darkMode,
  accent = false,
}) => {
  const labelClass = darkMode
    ? 'text-xs mb-1 text-gray-500'
    : 'text-xs mb-1 text-gray-400';

  let valueClass = '';

  if (accent) {
    valueClass = darkMode
      ? 'text-base text-red-300'
      : 'text-base text-red-600';
  } else {
    valueClass = darkMode
      ? 'text-base text-gray-200'
      : 'text-base text-gray-800';
  }

  return (
    <div>
      <p className={labelClass}>
        {label}
      </p>

      <p className={valueClass}>
        {value}
      </p>
    </div>
  );
};

// ========================================
// Empty State
// ========================================

const EmptyState = () => {
  return (
    <div className="py-12 text-center text-gray-500">
      <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />

      <p>কোনো ফলাফল পাওয়া যায়নি।</p>

      <p className="text-xs mt-1">
        অন্য কোনো শব্দ দিয়ে আবার চেষ্টা করুন।
      </p>
    </div>
  );
};

// ========================================
// Pagination
// ========================================

const Pagination = ({
  page,
  totalPages,
  setPage,
  darkMode,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const buttonClass = darkMode
    ? 'p-2 rounded-lg border bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition'
    : 'p-2 rounded-lg border bg-white border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition';

  const pageClass = darkMode
    ? 'text-sm text-gray-400'
    : 'text-sm text-gray-600';

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => {
          setPage((current) =>
            Math.max(
              current - 1,
              1
            )
          );

          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
        className={buttonClass}
        aria-label="আগের পৃষ্ঠা"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <span className={pageClass}>
        {page} / {totalPages}
      </span>

      <button
        type="button"
        disabled={
          page === totalPages
        }
        onClick={() => {
          setPage((current) =>
            Math.min(
              current + 1,
              totalPages
            )
          );

          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
        className={buttonClass}
        aria-label="পরের পৃষ্ঠা"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default RussianLanguage;