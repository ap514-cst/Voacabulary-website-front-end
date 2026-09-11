
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Volume2,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Moon,
  Sun,
  Trash2,
  Grid3X3,
  List,
  SlidersHorizontal,
  BookOpen,
} from "lucide-react";
import SEO from "../SEO";
import API_ENDPOINTS from "../config/api";

const SITE_URL =
  import.meta.env.VITE_APP_URL || "https://learnixdb.netlify.app";

const WORDS_PER_PAGE = 6;

const IntermediateList = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [playingAudio, setPlayingAudio] = useState(null);
  const [bookmarked, setBookmarked] = useState([]);

  const [selectedWord, setSelectedWord] = useState(null);

  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  // =========================================================
  // SEO
  // =========================================================

  const seoTitle =
    "Intermediate English Vocabulary with Bangla Meaning | LearnixDB";

  const seoDescription =
    "Learn intermediate English vocabulary with Bangla meanings, pronunciation, examples and explanations. Improve your English vocabulary with LearnixDB's free intermediate-level vocabulary lessons.";

  const seoKeywords =
    "intermediate English vocabulary, intermediate English words, English words with Bangla meaning, intermediate vocabulary Bangla, English vocabulary Bangla, English to Bangla words, learn English vocabulary, intermediate English word meaning, English vocabulary for intermediate learners";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seoTitle,
    description: seoDescription,
    url: `${SITE_URL}/intermediate`,
    isPartOf: {
      "@type": "WebSite",
      name: "LearnixDB",
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: "Intermediate English Vocabulary",
    },
    inLanguage: "en-BD",
  };

  const breadcrumbs = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Intermediate English Vocabulary",
      url: "/intermediate",
    },
  ];

  // =========================================================
  // FETCH INTERMEDIATE WORDS
  // =========================================================

  useEffect(() => {
    let isMounted = true;

    const fetchWords = async () => {
      try {
        setLoading(true);
        setError("");

        const endpoint = API_ENDPOINTS.vocByLevel("intermediate");

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch vocabulary data. Status: ${response.status}`
          );
        }

        const data = await response.json();

        if (!isMounted) return;

        // Support both:
        // 1. direct array response
        // 2. { data: [...] }
        // 3. { words: [...] }
        const vocabularyData = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.words)
          ? data.words
          : [];

        setWords(vocabularyData);
      } catch (err) {
        console.error("Vocabulary fetch error:", err);

        if (isMounted) {
          setError(
            "Unable to load intermediate vocabulary right now. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchWords();

    return () => {
      isMounted = false;
    };
  }, []);

  // =========================================================
  // LOAD BOOKMARKS
  // =========================================================

  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem("bookmarkedWords");

      if (savedBookmarks) {
        const parsedBookmarks = JSON.parse(savedBookmarks);

        if (Array.isArray(parsedBookmarks)) {
          setBookmarked(parsedBookmarks);
        }
      }
    } catch (err) {
      console.error("Bookmark loading error:", err);
      setBookmarked([]);
    }
  }, []);

  // =========================================================
  // LOAD DARK MODE
  // =========================================================

  useEffect(() => {
    try {
      const savedDarkMode = localStorage.getItem("darkMode");

      if (savedDarkMode !== null) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
    } catch (err) {
      console.error("Dark mode loading error:", err);
    }
  }, []);

  // =========================================================
  // APPLY DARK MODE
  // =========================================================

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    try {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    } catch (err) {
      console.error("Dark mode save error:", err);
    }
  }, [darkMode]);

  // =========================================================
  // FILTER WORDS
  // =========================================================

  const filteredWords = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return words.filter((word) => {
      const englishWord = String(word?.englishWord || "").toLowerCase();

      const banglaMeaning = String(
        word?.banglaMeaning || ""
      ).toLowerCase();

      const explanation = String(
        word?.explanation || ""
      ).toLowerCase();

      const example = String(word?.example || "").toLowerCase();

      const matchesSearch =
        !search ||
        englishWord.includes(search) ||
        banglaMeaning.includes(search) ||
        explanation.includes(search) ||
        example.includes(search);

      const wordId = word?._id || word?.id;

      const matchesBookmark =
        !showOnlyBookmarked || bookmarked.includes(wordId);

      return matchesSearch && matchesBookmark;
    });
  }, [words, searchTerm, bookmarked, showOnlyBookmarked]);

  // =========================================================
  // RESET PAGE WHEN FILTER CHANGES
  // =========================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, showOnlyBookmarked]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredWords.length / WORDS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * WORDS_PER_PAGE;

  const currentWords = filteredWords.slice(
    startIndex,
    startIndex + WORDS_PER_PAGE
  );

  // =========================================================
  // BOOKMARK
  // =========================================================

  const toggleBookmark = (wordId) => {
    if (!wordId) return;

    setBookmarked((previousBookmarks) => {
      let updatedBookmarks;

      if (previousBookmarks.includes(wordId)) {
        updatedBookmarks = previousBookmarks.filter(
          (id) => id !== wordId
        );
      } else {
        updatedBookmarks = [...previousBookmarks, wordId];
      }

      try {
        localStorage.setItem(
          "bookmarkedWords",
          JSON.stringify(updatedBookmarks)
        );
      } catch (err) {
        console.error("Bookmark save error:", err);
      }

      return updatedBookmarks;
    });
  };

  // =========================================================
  // CLEAR BOOKMARKS
  // =========================================================

  const clearAllBookmarks = () => {
    setBookmarked([]);

    try {
      localStorage.removeItem("bookmarkedWords");
    } catch (err) {
      console.error("Clear bookmark error:", err);
    }
  };

  // =========================================================
  // TEXT TO SPEECH
  // =========================================================

  const speakWord = (text, wordId = null) => {
    if (!text) {
      setPlayingAudio(null);
      return;
    }

    if (!("speechSynthesis" in window)) {
      setPlayingAudio(null);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      utterance.lang = "en-US";
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onend = () => {
        setPlayingAudio(null);
      };

      utterance.onerror = () => {
        setPlayingAudio(null);
      };

      setPlayingAudio(wordId);
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("Speech synthesis error:", err);
      setPlayingAudio(null);
    }
  };

  // =========================================================
  // AUDIO
  // =========================================================

  const playAudio = async (word) => {
    if (!word?.englishWord) return;

    const wordId = word?._id || word?.id;

    try {
      setPlayingAudio(wordId);

      // If backend has an audio file
      if (word.audio) {
        let audioPath = String(word.audio).trim();

        // Remove leading slash
        audioPath = audioPath.replace(/^\/+/, "");

        // If backend already returns a complete URL,
        // use it directly.
        let audioUrl;

        if (/^https?:\/\//i.test(audioPath)) {
          audioUrl = audioPath;
        } else {
          audioUrl = API_ENDPOINTS.audio(audioPath);
        }

        const audio = new Audio(audioUrl);

        audio.preload = "auto";

        audio.onended = () => {
          setPlayingAudio(null);
        };

        audio.onerror = () => {
          console.warn(
            "Audio file could not be loaded. Using browser pronunciation."
          );

          speakWord(word.englishWord, wordId);
        };

        await audio.play();

        return;
      }

      // No audio file → browser pronunciation
      speakWord(word.englishWord, wordId);
    } catch (err) {
      console.error("Audio error:", err);

      // Fallback
      speakWord(word.englishWord, wordId);
    }
  };

  // =========================================================
  // PAGINATION FUNCTIONS
  // =========================================================

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  // =========================================================
  // KEYBOARD ESCAPE FOR MODAL
  // =========================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedWord(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // =========================================================
  // STOP SPEECH WHEN COMPONENT UNMOUNTS
  // =========================================================

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // =========================================================
  // SEO
  // =========================================================

  const seoElement = (
    <SEO
      title={seoTitle}
      description={seoDescription}
      keywords={seoKeywords}
      canonicalUrl="/intermediate"
      ogType="website"
      structuredData={structuredData}
      breadcrumbs={breadcrumbs}
      language="en"
    />
  );

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <>
        {seoElement}

        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />

            <p className="text-gray-600 dark:text-gray-300">
              Loading intermediate vocabulary...
            </p>
          </div>
        </div>
      </>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <>
        {seoElement}

        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
          <div className="max-w-md w-full text-center">
            <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-red-500" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Unable to Load Vocabulary
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <>
      {seoElement}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

            {/* TOP HEADER */}

            <div className="flex items-center justify-between gap-4">

              {/* TITLE */}

              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>

                <div className="min-w-0">
                  <span className="block text-lg sm:text-xl font-bold truncate">
                    Intermediate Vocabulary
                  </span>

                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    English → Bangla
                  </span>
                </div>
              </div>

              {/* ACTIONS */}

              <div className="flex items-center gap-2">

                {/* VIEW MODE */}

                <div className="hidden sm:flex items-center rounded-xl bg-gray-100 dark:bg-gray-800 p-1">

                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    className={`p-2 rounded-lg transition ${
                      viewMode === "grid"
                        ? "bg-white dark:bg-gray-700 shadow"
                        : ""
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    className={`p-2 rounded-lg transition ${
                      viewMode === "list"
                        ? "bg-white dark:bg-gray-700 shadow"
                        : ""
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                {/* DARK MODE */}

                <button
                  type="button"
                  onClick={() => setDarkMode((value) => !value)}
                  aria-label={
                    darkMode
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* SEARCH */}

            <div className="mt-4 flex gap-2">

              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search English word or Bangla meaning..."
                  aria-label="Search vocabulary"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowFilters((value) => !value)}
                aria-label="Toggle filters"
                className="px-4 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* FILTERS */}

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 flex flex-wrap items-center gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        setShowOnlyBookmarked((value) => !value)
                      }
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                        showOnlyBookmarked
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      {showOnlyBookmarked ? (
                        <BookmarkCheck className="w-4 h-4" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}

                      Bookmarked Only
                    </button>

                    {bookmarked.length > 0 && (
                      <button
                        type="button"
                        onClick={clearAllBookmarks}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        Clear Bookmarks
                      </button>
                    )}

                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {filteredWords.length} words found
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* SEO CONTENT */}

          <section className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Intermediate English Vocabulary with Bangla Meaning
            </h1>

            <p className="max-w-3xl text-gray-600 dark:text-gray-400 leading-7">
              Improve your English vocabulary with intermediate-level
              English words, Bangla meanings, pronunciation, examples
              and useful explanations.
            </p>
          </section>

          {/* EMPTY STATE */}

          {currentWords.length === 0 ? (
            <div className="py-20 text-center">

              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Search className="w-7 h-7 text-gray-400" />
              </div>

              <h2 className="text-xl font-bold mb-2">
                No vocabulary found
              </h2>

              <p className="text-gray-500 dark:text-gray-400">
                Try another search term or change your filters.
              </p>
            </div>
          ) : (

            /* WORD CARDS */

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  : "flex flex-col gap-4"
              }
            >
              {currentWords.map((word, index) => {
                const wordId = word?._id || word?.id;

                const isBookmarked =
                  bookmarked.includes(wordId);

                const isPlaying =
                  playingAudio === wordId;

                return (
                  <motion.article
                    key={wordId || index}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                    className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition-all duration-300 p-5"
                  >
                    <div
                      className={
                        viewMode === "list"
                          ? "flex flex-col sm:flex-row sm:items-center gap-5"
                          : ""
                      }
                    >
                      <div className="flex-1 min-w-0">

                        {/* WORD HEADER */}

                        <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">

                            <span className="inline-block mb-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                              Intermediate
                            </span>

                            <h2 className="text-2xl font-bold break-words">
                              {word.englishWord}
                            </h2>

                            {word.banglaMeaning && (
                              <p className="mt-1 text-lg text-blue-600 dark:text-blue-400 font-medium">
                                {word.banglaMeaning}
                              </p>
                            )}
                          </div>

                          {/* BOOKMARK */}

                          <button
                            type="button"
                            onClick={() =>
                              toggleBookmark(wordId)
                            }
                            aria-label={
                              isBookmarked
                                ? `Remove ${word.englishWord} from bookmarks`
                                : `Bookmark ${word.englishWord}`
                            }
                            className={`shrink-0 p-2.5 rounded-xl transition ${
                              isBookmarked
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-blue-600"
                            }`}
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-5 h-5" />
                            ) : (
                              <Bookmark className="w-5 h-5" />
                            )}
                          </button>
                        </div>

                        {/* EXPLANATION */}

                        {word.explanation && (
                          <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400 line-clamp-3">
                            {word.explanation}
                          </p>
                        )}

                        {/* ACTIONS */}

                        <div className="mt-5 flex flex-wrap gap-2">

                          <button
                            type="button"
                            onClick={() => playAudio(word)}
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                              isPlaying
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            }`}
                          >
                            <Volume2
                              className={`w-4 h-4 ${
                                isPlaying
                                  ? "animate-pulse"
                                  : ""
                              }`}
                            />

                            {isPlaying
                              ? "Playing..."
                              : "Pronunciation"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedWord(word)
                            }
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          {/* ===================================================
              PAGINATION
          ==================================================== */}

          {filteredWords.length > WORDS_PER_PAGE && (
            <nav
              aria-label="Vocabulary pagination"
              className="mt-10 flex items-center justify-center gap-3"
            >
              <button
                type="button"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="px-5 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm font-semibold">
                Page {currentPage} of {totalPages}
              </div>

              <button
                type="button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </nav>
          )}

          {/* ===================================================
              PAGE SEO CONTENT
          ==================================================== */}

          <section className="mt-14 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">
              Learn Intermediate English Words with Bangla Meaning
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-7">
              LearnixDB helps English learners improve their vocabulary
              through practical intermediate English words with Bangla
              meanings, pronunciation and examples. This vocabulary
              collection is useful for students, English learners and
              anyone who wants to communicate more confidently in English.
            </p>
          </section>
        </main>

        {/* =====================================================
            WORD DETAILS MODAL
        ====================================================== */}

        <AnimatePresence>
          {selectedWord && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedWord(null)}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: 20,
                }}
                transition={{ duration: 0.2 }}
                onClick={(event) =>
                  event.stopPropagation()
                }
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-gray-900 shadow-2xl"
              >

                {/* MODAL HEADER */}

                <div className="sticky top-0 z-10 flex items-center justify-between gap-4 p-5 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur">

                  <div className="min-w-0">

                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      Intermediate Vocabulary
                    </span>

                    <h2 className="text-2xl sm:text-3xl font-bold mt-1 break-words">
                      {selectedWord.englishWord}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedWord(null)
                    }
                    aria-label="Close details"
                    className="shrink-0 p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* MODAL CONTENT */}

                <div className="p-5 sm:p-7 space-y-6">

                  {/* MEANING */}

                  {selectedWord.banglaMeaning && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                        Bangla Meaning
                      </h3>

                      <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                        {selectedWord.banglaMeaning}
                      </p>
                    </div>
                  )}

                  {/* EXPLANATION */}

                  {selectedWord.explanation && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                        Explanation
                      </h3>

                      <p className="leading-7 text-gray-700 dark:text-gray-300">
                        {selectedWord.explanation}
                      </p>
                    </div>
                  )}

                  {/* EXAMPLE */}

                  {selectedWord.example && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                        Example
                      </h3>

                      <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40">
                        <p className="italic leading-7 text-gray-700 dark:text-gray-300">
                          “{selectedWord.example}”
                        </p>
                      </div>
                    </div>
                  )}

                  {/* PRONUNCIATION */}

                  <button
                    type="button"
                    onClick={() =>
                      playAudio(selectedWord)
                    }
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                  >
                    <Volume2 className="w-5 h-5" />

                    {playingAudio ===
                    (selectedWord._id ||
                      selectedWord.id)
                      ? "Playing..."
                      : "Listen to Pronunciation"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default IntermediateList;

