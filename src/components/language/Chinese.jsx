
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
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
} from "lucide-react";

import SEO from "../SEO";

import {
  chineseAlphabet,
  commonPhrases,
  vocabulary,
  chineseNumbers,
  grammarRules,
  cultureFacts,
  quizQuestions,
  getVocabularyCategories,
  getPhraseCategories,
} from "./data/chineseData";

const ITEMS_PER_PAGE = 20;

const SITE_URL = "https://learnixdb.netlify.app";

const SEO_TITLE = "Chinese Language Learning";
const SEO_DESCRIPTION =
  "Learn Chinese language with Chinese characters, Pinyin, common phrases, vocabulary, numbers, grammar, culture and interactive quizzes. Learn Mandarin Chinese with Bangla explanations on LearnixDB.";

const SEO_KEYWORDS =
  "learn Chinese, Chinese language, Mandarin Chinese, learn Mandarin, Chinese vocabulary, Chinese phrases, Chinese Pinyin, Chinese grammar, Chinese numbers, Chinese language with Bangla meaning, Chinese to Bangla, Mandarin Bangla";

const ChineseLanguage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState("letters");
  const [playingAudio, setPlayingAudio] = useState(null);
  const [bookmarked, setBookmarked] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // ======================================================
  // SEO STRUCTURED DATA
  // ======================================================

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SEO_TITLE} | LearnixDB`,
    description: SEO_DESCRIPTION,
    url: `${SITE_URL}/chinese`,
    inLanguage: "bn",
    isPartOf: {
      "@type": "WebSite",
      name: "LearnixDB",
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: "Chinese Language Learning",
    },
    mainEntity: {
      "@type": "EducationalOccupationalProgram",
      name: "Chinese Language Learning",
      educationalLevel: "Beginner to Intermediate",
      teaches: [
        "Chinese characters",
        "Mandarin Pinyin",
        "Chinese vocabulary",
        "Chinese phrases",
        "Chinese numbers",
        "Chinese grammar",
        "Chinese culture",
      ],
    },
  };

  const breadcrumbs = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Chinese Language",
      url: "/chinese",
    },
  ];

  // ======================================================
  // LOAD BOOKMARKS
  // ======================================================

  useEffect(() => {
    try {
      const saved = localStorage.getItem("chineseBookmarks");

      if (!saved) return;

      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setBookmarked(parsed);
      }
    } catch {
      setBookmarked([]);
    }
  }, []);

  // ======================================================
  // SAVE BOOKMARKS
  // ======================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "chineseBookmarks",
        JSON.stringify(bookmarked)
      );
    } catch {
      // Ignore localStorage errors
    }
  }, [bookmarked]);

  // ======================================================
  // LOAD DARK MODE
  // ======================================================

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(
        "chineseDarkMode"
      );

      if (savedTheme === "true") {
        setDarkMode(true);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // ======================================================
  // SAVE DARK MODE
  // ======================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "chineseDarkMode",
        String(darkMode)
      );
    } catch {
      // Ignore localStorage errors
    }
  }, [darkMode]);

  // ======================================================
  // RESET FILTERS WHEN TAB CHANGES
  // ======================================================

  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm("");
    setSelectedCategory("all");
  }, [selectedTab]);

  // ======================================================
  // CLEANUP AUDIO ON UNMOUNT
  // ======================================================

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // ======================================================
  // NORMALIZE SEARCH
  // ======================================================

  const normalize = (value) => {
    return String(value ?? "")
      .toLowerCase()
      .trim();
  };

  // ======================================================
  // SEARCH
  // ======================================================

  const matchesSearch = (item) => {
    if (!searchTerm.trim()) {
      return true;
    }

    const term = normalize(searchTerm);

    return [
      item.letter,
      item.chinese,
      item.pinyin,
      item.english,
      item.bangla,
      item.word,
      item.pronunciation,
      item.category,
      item.title,
      item.description,
      item.number,
    ].some((value) =>
      normalize(value).includes(term)
    );
  };

  // ======================================================
  // BOOKMARK
  // ======================================================

  const getBookmarkKey = (type, id) => {
    return `${type}-${id}`;
  };

  const toggleBookmark = (key) => {
    setBookmarked((previous) => {
      if (previous.includes(key)) {
        return previous.filter(
          (item) => item !== key
        );
      }

      return [...previous, key];
    });
  };

  // ======================================================
  // AUDIO
  // ======================================================

  const speakWord = (word, lang = "zh-CN") => {
    if (!word) return;

    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(word);

    utterance.lang = lang;
    utterance.rate = 0.8;

    utterance.onstart = () => {
      setPlayingAudio(word);
    };

    utterance.onend = () => {
      setPlayingAudio(null);
    };

    utterance.onerror = () => {
      setPlayingAudio(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // ======================================================
  // FILTERED DATA
  // ======================================================

  const filteredPhrases = useMemo(() => {
    return commonPhrases.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" ||
        item.category === selectedCategory;

      return (
        matchesSearch(item) &&
        matchesCategory
      );
    });
  }, [searchTerm, selectedCategory]);

  const filteredVocabulary = useMemo(() => {
    return vocabulary.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" ||
        item.category === selectedCategory;

      return (
        matchesSearch(item) &&
        matchesCategory
      );
    });
  }, [searchTerm, selectedCategory]);

  const filteredAlphabet = useMemo(() => {
    return chineseAlphabet.filter(matchesSearch);
  }, [searchTerm]);

  const filteredNumbers = useMemo(() => {
    return chineseNumbers.filter(matchesSearch);
  }, [searchTerm]);

  // ======================================================
  // CATEGORIES
  // ======================================================

  const categories =
    selectedTab === "phrases"
      ? getPhraseCategories()
      : selectedTab === "vocabulary"
        ? getVocabularyCategories()
        : [];

  // ======================================================
  // PAGINATION
  // ======================================================

  const getPaginated = (items) => {
    const totalPages = Math.max(
      1,
      Math.ceil(
        items.length / ITEMS_PER_PAGE
      )
    );

    const safePage = Math.min(
      currentPage,
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

  const paginatedNumbers =
    getPaginated(filteredNumbers);

  // ======================================================
  // KEEP PAGE VALID
  // ======================================================

  useEffect(() => {
    if (
      currentPage >
      paginatedNumbers.totalPages
    ) {
      setCurrentPage(
        paginatedNumbers.totalPages
      );
    }
  }, [
    currentPage,
    paginatedNumbers.totalPages,
  ]);

  // ======================================================
  // MODAL
  // ======================================================

  const openItem = (item, type) => {
    setSelectedItem({
      ...item,
      _type: type,
    });
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  // ======================================================
  // QUIZ
  // ======================================================

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

  // ======================================================
  // TABS
  // ======================================================

  const tabs = [
    {
      id: "letters",
      label: "অক্ষর",
      icon: BookOpen,
    },
    {
      id: "phrases",
      label: "বাক্য",
      icon: MessageCircle,
    },
    {
      id: "vocabulary",
      label: "শব্দ",
      icon: Globe,
    },
    {
      id: "numbers",
      label: "সংখ্যা",
      icon: TrendingUp,
    },
    {
      id: "grammar",
      label: "ব্যাকরণ",
      icon: GraduationCap,
    },
    {
      id: "culture",
      label: "সংস্কৃতি",
      icon: Star,
    },
    {
      id: "quiz",
      label: "কুইজ",
      icon: Brain,
    },
  ];

  // ======================================================
  // THEME CLASSES
  // ======================================================

  const cardClass = darkMode
    ? "bg-gray-800 border-gray-700 text-white"
    : "bg-white border-gray-200 text-gray-800";

  const mutedClass = darkMode
    ? "text-gray-400"
    : "text-gray-500";

  // ======================================================
  // SEARCH + FILTER
  // ======================================================

  const renderSearchAndFilters = () => {
    const hasFilters =
      selectedTab === "phrases" ||
      selectedTab === "vocabulary";

    return (
      <div className="mb-6 space-y-3">
        <div className="relative max-w-xl">
          <Search
            aria-hidden="true"
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${mutedClass}`}
          />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(
                event.target.value
              );
              setCurrentPage(1);
            }}
            placeholder="চীনা, Pinyin, ইংরেজি বা বাংলা দিয়ে খুঁজুন..."
            aria-label="Chinese language content search"
            className={
              darkMode
                ? "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-500"
                : "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
            }
          />
        </div>

        {hasFilters && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            <FilterButton
              active={
                selectedCategory === "all"
              }
              darkMode={darkMode}
              onClick={() => {
                setSelectedCategory("all");
                setCurrentPage(1);
              }}
            >
              সব
            </FilterButton>

            {categories.map((category) => (
              <FilterButton
                key={category}
                active={
                  selectedCategory ===
                  category
                }
                darkMode={darkMode}
                onClick={() => {
                  setSelectedCategory(
                    category
                  );
                  setCurrentPage(1);
                }}
              >
                {category}
              </FilterButton>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ======================================================
  // AUDIO BUTTON
  // ======================================================

  const AudioButton = ({ word }) => {
    const isPlaying =
      playingAudio === word;

    return (
      <button
        type="button"
        aria-label={
          isPlaying
            ? "উচ্চারণ চলছে"
            : "উচ্চারণ শুনুন"
        }
        onClick={(event) => {
          event.stopPropagation();
          speakWord(word);
        }}
        className={
          isPlaying
            ? "inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-500 text-white"
            : darkMode
              ? "inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
              : "inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        }
      >
        <Volume2 className="w-4 h-4" />
      </button>
    );
  };

  // ======================================================
  // BOOKMARK BUTTON
  // ======================================================

  const BookmarkButton = ({
    type,
    id,
  }) => {
    const key = getBookmarkKey(
      type,
      id
    );

    const active =
      bookmarked.includes(key);

    return (
      <button
        type="button"
        aria-label={
          active
            ? "বুকমার্ক সরান"
            : "বুকমার্ক করুন"
        }
        aria-pressed={active}
        onClick={(event) => {
          event.stopPropagation();
          toggleBookmark(key);
        }}
        className={
          darkMode
            ? "p-2 rounded-lg hover:bg-gray-700 transition"
            : "p-2 rounded-lg hover:bg-gray-100 transition"
        }
      >
        <Star
          className={
            active
              ? "w-5 h-5 text-yellow-500 fill-current"
              : darkMode
                ? "w-5 h-5 text-gray-500"
                : "w-5 h-5 text-gray-300"
          }
        />
      </button>
    );
  };

  // ======================================================
  // ALPHABET TAB
  // ======================================================

  const renderAlphabetTab = () => {
    return (
      <div>
        {renderSearchAndFilters()}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {filteredAlphabet.map(
            (letter) => (
              <motion.div
                key={letter.id}
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
                    "alphabet"
                  )
                }
                className={`border rounded-xl p-4 text-center cursor-pointer hover:-translate-y-0.5 transition ${cardClass}`}
              >
                <div className="flex justify-end">
                  <BookmarkButton
                    type="alphabet"
                    id={letter.id}
                  />
                </div>

                <div className="text-4xl font-bold mt-1">
                  {letter.letter}
                </div>

                <p
                  className={`text-sm mt-2 ${mutedClass}`}
                >
                  {letter.english}
                </p>

                <p
                  className={`text-xs mt-1 ${mutedClass}`}
                >
                  {letter.pinyin ||
                    letter.pronunciation}
                </p>

                <div className="mt-3 flex justify-center">
                  <AudioButton
                    word={letter.letter}
                  />
                </div>
              </motion.div>
            )
          )}
        </div>

        {filteredAlphabet.length ===
          0 && <EmptyState />}
      </div>
    );
  };

  // ======================================================
  // PHRASES TAB
  // ======================================================

  const renderPhrasesTab = () => {
    return (
      <div>
        {renderSearchAndFilters()}

        <div className="space-y-3">
          {filteredPhrases.map(
            (phrase) => {
              const phraseWord =
                phrase.chinese ||
                phrase.russian ||
                phrase.word;

              return (
                <motion.div
                  key={phrase.id}
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
                      "phrase"
                    )
                  }
                  className={`border rounded-xl p-4 cursor-pointer hover:shadow-sm transition ${cardClass}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold">
                          {phraseWord}
                        </h3>

                        <AudioButton
                          word={phraseWord}
                        />

                        {phrase.category && (
                          <span
                            className={
                              darkMode
                                ? "px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300"
                                : "px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                            }
                          >
                            {phrase.category}
                          </span>
                        )}
                      </div>

                      {phrase.pinyin && (
                        <p
                          className={`text-sm mt-1 ${mutedClass}`}
                        >
                          {phrase.pinyin}
                        </p>
                      )}

                      <p
                        className={`text-sm mt-1 ${mutedClass}`}
                      >
                        {phrase.english}
                      </p>

                      {phrase.bangla && (
                        <p
                          className={
                            darkMode
                              ? "text-sm mt-1 text-red-300"
                              : "text-sm mt-1 text-red-600"
                          }
                        >
                          {phrase.bangla}
                        </p>
                      )}
                    </div>

                    <BookmarkButton
                      type="phrase"
                      id={phrase.id}
                    />
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

        {filteredPhrases.length ===
          0 && <EmptyState />}
      </div>
    );
  };

  // ======================================================
  // VOCABULARY TAB
  // ======================================================

  const renderVocabularyTab = () => {
    return (
      <div>
        {renderSearchAndFilters()}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVocabulary.map(
            (word) => {
              const chineseWord =
                word.chinese ||
                word.word ||
                word.russian;

              return (
                <motion.div
                  key={word.id}
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
                      "vocab"
                    )
                  }
                  className={`border rounded-xl p-4 cursor-pointer hover:shadow-sm transition ${cardClass}`}
                >
                  <div className="flex justify-between items-start gap-2">
                    {word.category && (
                      <span
                        className={
                          darkMode
                            ? "px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300"
                            : "px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                        }
                      >
                        {word.category}
                      </span>
                    )}

                    <BookmarkButton
                      type="vocab"
                      id={word.id}
                    />
                  </div>

                  <h3 className="text-2xl font-semibold mt-3">
                    {chineseWord}
                  </h3>

                  {word.pinyin && (
                    <p
                      className={`text-sm mt-1 ${mutedClass}`}
                    >
                      {word.pinyin}
                    </p>
                  )}

                  <p
                    className={`text-sm mt-1 ${mutedClass}`}
                  >
                    {word.english}
                  </p>

                  {word.bangla && (
                    <p
                      className={
                        darkMode
                          ? "text-sm mt-1 text-red-300"
                          : "text-sm mt-1 text-red-600"
                      }
                    >
                      {word.bangla}
                    </p>
                  )}

                  <div className="mt-3">
                    <AudioButton
                      word={chineseWord}
                    />
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

        {filteredVocabulary.length ===
          0 && <EmptyState />}
      </div>
    );
  };

  // ======================================================
  // NUMBERS TAB
  // ======================================================

  const renderNumbersTab = () => {
    return (
      <div>
        {renderSearchAndFilters()}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {paginatedNumbers.items.map(
            (num) => {
              const chineseNumber =
                num.chinese ||
                num.word ||
                num.russian;

              return (
                <motion.div
                  key={num.id}
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
                      "number"
                    )
                  }
                  className={`border rounded-xl p-4 text-center cursor-pointer hover:-translate-y-0.5 transition ${cardClass}`}
                >
                  <div className="text-2xl font-bold text-gray-400">
                    {num.number}
                  </div>

                  <h3 className="text-xl font-semibold mt-1">
                    {chineseNumber}
                  </h3>

                  {num.pinyin && (
                    <p
                      className={`text-sm mt-1 ${mutedClass}`}
                    >
                      {num.pinyin}
                    </p>
                  )}

                  <p
                    className={`text-sm ${mutedClass}`}
                  >
                    {num.english}
                  </p>

                  {num.bangla && (
                    <p
                      className={
                        darkMode
                          ? "text-xs mt-1 text-red-300"
                          : "text-xs mt-1 text-red-600"
                      }
                    >
                      {num.bangla}
                    </p>
                  )}

                  <div className="mt-3 flex justify-center">
                    <AudioButton
                      word={chineseNumber}
                    />
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

        {paginatedNumbers.items
          .length === 0 && (
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

  // ======================================================
  // GRAMMAR TAB
  // ======================================================

  const renderGrammarTab = () => {
    return (
      <div className="space-y-4">
        {grammarRules.map((grammar) => (
          <motion.article
            key={grammar.id}
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

            {Array.isArray(
              grammar.rules
            ) && (
              <ul className="mt-4 space-y-2">
                {grammar.rules.map(
                  (rule, index) => (
                    <li
                      key={index}
                      className={
                        darkMode
                          ? "flex items-start gap-2 text-sm text-gray-300"
                          : "flex items-start gap-2 text-sm text-gray-700"
                      }
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />

                      <span>{rule}</span>
                    </li>
                  )
                )}
              </ul>
            )}
          </motion.article>
        ))}

        {grammarRules.length === 0 && (
          <EmptyState />
        )}
      </div>
    );
  };

  // ======================================================
  // CULTURE TAB
  // ======================================================

  const renderCultureTab = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cultureFacts.map((fact) => (
          <motion.article
            key={fact.id}
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
              {fact.icon || "🇨🇳"}
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
        ))}

        {cultureFacts.length === 0 && (
          <EmptyState />
        )}
      </div>
    );
  };

  // ======================================================
  // QUIZ TAB
  // ======================================================

  const renderQuizTab = () => {
    if (quizSubmitted) {
      const percentage =
        quizQuestions.length > 0
          ? Math.round(
              (quizScore /
                quizQuestions.length) *
                100
            )
          : 0;

      return (
        <div
          className={`border rounded-xl p-8 text-center ${cardClass}`}
        >
          <Trophy
            className={
              quizScore >=
              Math.ceil(
                quizQuestions.length *
                  0.8
              )
                ? "w-14 h-14 mx-auto mb-4 text-yellow-500"
                : "w-14 h-14 mx-auto mb-4 text-gray-400"
            }
          />

          <h2 className="text-2xl font-bold">
            আপনার স্কোর
          </h2>

          <p className="text-4xl font-bold mt-2">
            {quizScore} /{" "}
            {quizQuestions.length}
          </p>

          <p
            className={`text-sm mt-2 mb-6 ${mutedClass}`}
          >
            {percentage === 100
              ? "🎉 অসাধারণ! Perfect score!"
              : percentage >= 60
                ? "🌟 খুব ভালো! আরও practice করুন।"
                : "📚 ভালো চেষ্টা! আবার practice করুন।"}
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
      Object.keys(quizAnswers)
        .length;

    const allAnswered =
      answered ===
      quizQuestions.length;

    return (
      <div className="space-y-4">
        {quizQuestions.map(
          (question, index) => (
            <motion.div
              key={question.id}
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
                {index + 1}.{" "}
                {question.question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {question.options.map(
                  (option) => {
                    const selected =
                      quizAnswers[
                        question.id
                      ] === option;

                    return (
                      <button
                        type="button"
                        key={option}
                        onClick={() =>
                          setQuizAnswers(
                            (previous) => ({
                              ...previous,
                              [question.id]:
                                option,
                            })
                          )
                        }
                        aria-pressed={
                          selected
                        }
                        className={
                          selected
                            ? "p-3 rounded-lg border bg-red-600 border-red-600 text-white text-left text-sm"
                            : darkMode
                              ? "p-3 rounded-lg border bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 text-left text-sm transition"
                              : "p-3 rounded-lg border bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 text-left text-sm transition"
                        }
                      >
                        {option}
                      </button>
                    );
                  }
                )}
              </div>
            </motion.div>
          )
        )}

        {quizQuestions.length > 0 && (
          <button
            type="button"
            onClick={handleQuizSubmit}
            disabled={!allAnswered}
            className={
              allAnswered
                ? "w-full py-3 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition"
                : "w-full py-3 rounded-lg font-medium bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          >
            {allAnswered
              ? "ফলাফল দেখুন"
              : `${answered}/${quizQuestions.length} উত্তর দিয়েছেন`}
          </button>
        )}
      </div>
    );
  };

  // ======================================================
  // TAB CONTENT
  // ======================================================

  const renderTabContent = () => {
    switch (selectedTab) {
      case "letters":
        return renderAlphabetTab();

      case "phrases":
        return renderPhrasesTab();

      case "vocabulary":
        return renderVocabularyTab();

      case "numbers":
        return renderNumbersTab();

      case "grammar":
        return renderGrammarTab();

      case "culture":
        return renderCultureTab();

      case "quiz":
        return renderQuizTab();

      default:
        return renderAlphabetTab();
    }
  };

  // ======================================================
  // MODAL DATA
  // ======================================================

  const modalType = selectedItem
    ? selectedItem._type
    : null;

  const modalKey = selectedItem
    ? getBookmarkKey(
        modalType,
        selectedItem.id
      )
    : null;

  const modalWord = selectedItem
    ? selectedItem.chinese ||
      selectedItem.letter ||
      selectedItem.word ||
      (selectedItem.number != null
        ? String(selectedItem.number)
        : "")
    : "";

  // ======================================================
  // RETURN
  // ======================================================

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-gray-950 text-white transition-colors"
          : "min-h-screen bg-gray-50 text-gray-800 transition-colors"
      }
    >
      {/* ==================================================
          SEO
      ================================================== */}

      <SEO
        title={SEO_TITLE}
        description={SEO_DESCRIPTION}
        keywords={SEO_KEYWORDS}
        canonicalUrl="/chinese"
        ogType="website"
        language="bn"
        structuredData={structuredData}
        breadcrumbs={breadcrumbs}
      />

      {/* ==================================================
          HEADER
      ================================================== */}

      <header
        className={
          darkMode
            ? "sticky top-0 z-30 border-b border-gray-800 bg-gray-900/95 backdrop-blur"
            : "sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur"
        }
      >
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                to="/"
                aria-label="হোমে ফিরে যান"
                className={
                  darkMode
                    ? "p-2 rounded-lg hover:bg-gray-800 transition"
                    : "p-2 rounded-lg hover:bg-gray-100 transition"
                }
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>

              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold truncate">
                  🇨🇳 Chinese Language
                </h1>

                <p
                  className={`text-xs sm:text-sm ${mutedClass}`}
                >
                  সহজে Mandarin Chinese শিখুন
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {bookmarked.length > 0 && (
                <span
                  className={
                    darkMode
                      ? "hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs bg-gray-800 text-yellow-400"
                      : "hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs bg-yellow-50 text-yellow-700"
                  }
                >
                  ⭐ {bookmarked.length}
                </span>
              )}

              <button
                type="button"
                onClick={() =>
                  setDarkMode(
                    (previous) =>
                      !previous
                  )
                }
                aria-label={
                  darkMode
                    ? "লাইট মোড চালু করুন"
                    : "ডার্ক মোড চালু করুন"
                }
                aria-pressed={darkMode}
                className={
                  darkMode
                    ? "p-2 rounded-lg border border-gray-700 bg-gray-800 text-yellow-400"
                    : "p-2 rounded-lg border border-gray-200 bg-white text-gray-700"
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

          {/* TABS */}

          <nav
            aria-label="Chinese language learning sections"
            className="flex gap-2 mt-3 overflow-x-auto pb-1"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;

              const active =
                selectedTab ===
                tab.id;

              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() =>
                    setSelectedTab(tab.id)
                  }
                  aria-current={
                    active
                      ? "page"
                      : undefined
                  }
                  className={
                    active
                      ? "shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-red-600 text-white transition"
                      : darkMode
                        ? "shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
                        : "shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  }
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {renderTabContent()}
      </main>

      {/* ==================================================
          DETAIL MODAL
      ================================================== */}

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
            role="dialog"
            aria-modal="true"
            aria-label="বিস্তারিত তথ্য"
          >
            <motion.div
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
                  ? "w-full sm:max-w-lg sm:rounded-xl rounded-t-2xl border bg-gray-900 border-gray-800"
                  : "w-full sm:max-w-lg sm:rounded-xl rounded-t-2xl border bg-white border-gray-200"
              }
            >
              <div
                className={
                  darkMode
                    ? "flex items-center justify-between p-4 border-b border-gray-800"
                    : "flex items-center justify-between p-4 border-b border-gray-100"
                }
              >
                <h2 className="text-xl font-bold">
                  {selectedItem.chinese ||
                    selectedItem.letter ||
                    selectedItem.word ||
                    selectedItem.number ||
                    selectedItem.title ||
                    "বিস্তারিত"}
                </h2>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="বন্ধ করুন"
                  className={
                    darkMode
                      ? "p-2 rounded-lg hover:bg-gray-800"
                      : "p-2 rounded-lg hover:bg-gray-100"
                  }
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {selectedItem.pinyin && (
                  <Info
                    label="Pinyin"
                    value={
                      selectedItem.pinyin
                    }
                    darkMode={darkMode}
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

                {selectedItem.english && (
                  <Info
                    label="English"
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
                      speakWord(modalWord)
                    }
                    className="w-full py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center gap-2"
                  >
                    <Volume2 className="w-5 h-5" />
                    উচ্চারণ শুনুন
                  </button>
                )}

                {selectedItem.id &&
                  modalKey && (
                    <button
                      type="button"
                      onClick={() =>
                        toggleBookmark(
                          modalKey
                        )
                      }
                      aria-pressed={bookmarked.includes(
                        modalKey
                      )}
                      className={
                        bookmarked.includes(
                          modalKey
                        )
                          ? "w-full py-2.5 rounded-lg bg-yellow-500 border border-yellow-500 text-white flex items-center justify-center gap-2"
                          : darkMode
                            ? "w-full py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 flex items-center justify-center gap-2"
                            : "w-full py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2"
                      }
                    >
                      <Star
                        className={
                          bookmarked.includes(
                            modalKey
                          )
                            ? "w-5 h-5 fill-current"
                            : "w-5 h-5"
                        }
                      />

                      {bookmarked.includes(
                        modalKey
                      )
                        ? "বুকমার্ক করা আছে"
                        : "বুকমার্ক করুন"}
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

// ======================================================
// FILTER BUTTON
// ======================================================

const FilterButton = ({
  active,
  darkMode,
  onClick,
  children,
}) => {
  let buttonClass =
    "shrink-0 px-3 py-1.5 rounded-full text-sm border transition";

  if (active) {
    buttonClass +=
      " bg-red-600 border-red-600 text-white";
  } else if (darkMode) {
    buttonClass +=
      " bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700";
  } else {
    buttonClass +=
      " bg-white border-gray-200 text-gray-600 hover:bg-gray-50";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={buttonClass}
    >
      {children}
    </button>
  );
};

// ======================================================
// INFO
// ======================================================

const Info = ({
  label,
  value,
  darkMode,
  accent = false,
}) => {
  const valueClass = accent
    ? darkMode
      ? "text-red-300"
      : "text-red-600"
    : darkMode
      ? "text-gray-200"
      : "text-gray-800";

  return (
    <div>
      <p
        className={
          darkMode
            ? "text-xs mb-1 text-gray-500"
            : "text-xs mb-1 text-gray-400"
        }
      >
        {label}
      </p>

      <p
        className={`text-base ${valueClass}`}
      >
        {value}
      </p>
    </div>
  );
};

// ======================================================
// EMPTY STATE
// ======================================================

const EmptyState = () => {
  return (
    <div className="py-12 text-center text-gray-500">
      <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />

      <p>
        কোনো ফলাফল পাওয়া যায়নি।
      </p>

      <p className="text-xs mt-1">
        অন্য শব্দ দিয়ে আবার চেষ্টা করুন।
      </p>
    </div>
  );
};

// ======================================================
// PAGINATION
// ======================================================

const Pagination = ({
  page,
  totalPages,
  setPage,
  darkMode,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        type="button"
        disabled={page === 1}
        onClick={() =>
          setPage((current) =>
            Math.max(
              current - 1,
              1
            )
          )
        }
        aria-label="আগের পৃষ্ঠা"
        className={
          darkMode
            ? "p-2 rounded-lg border bg-gray-800 border-gray-700 text-gray-200 disabled:opacity-40"
            : "p-2 rounded-lg border bg-white border-gray-200 text-gray-700 disabled:opacity-40"
        }
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <span
        className={
          darkMode
            ? "text-sm text-gray-400"
            : "text-sm text-gray-600"
        }
      >
        {page} / {totalPages}
      </span>

      <button
        type="button"
        disabled={
          page === totalPages
        }
        onClick={() =>
          setPage((current) =>
            Math.min(
              current + 1,
              totalPages
            )
          )
        }
        aria-label="পরের পৃষ্ঠা"
        className={
          darkMode
            ? "p-2 rounded-lg border bg-gray-800 border-gray-700 text-gray-200 disabled:opacity-40"
            : "p-2 rounded-lg border bg-white border-gray-200 text-gray-700 disabled:opacity-40"
        }
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChineseLanguage;

