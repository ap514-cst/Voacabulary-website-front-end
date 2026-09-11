// src/components/Phrese.jsx
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Volume2,
  Search,
  Star,
  X,
  Moon,
  Sun,
  Filter,
  ChevronLeft,
  ChevronRight,
  Bookmark as BookmarkIcon,
  BookmarkX,
  Grid,
  List as ListIcon,
  Heart,
} from "lucide-react";
import SEO from "../SEO";

// ✅ Import central API config
import API_ENDPOINTS from "../config/api"

const SITE_URL = "https://learnixdb.netlify.app";

const Phrese = () => {
  const [phrases, setPhrases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [playingAudio, setPlayingAudio] = useState(null);

  const [bookmarked, setBookmarked] = useState([]);
  const [selectedPhrase, setSelectedPhrase] = useState(null);

  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  const itemsPerPage = 9;

  /* =========================================================
     SEO
  ========================================================= */

  const seoTitle = "English Phrases with Bangla Meaning";

  const seoDescription =
    "Learn useful English phrases with Bangla meanings, examples and pronunciation. Improve your everyday English speaking and vocabulary with LearnixDB.";

  const seoKeywords =
    "English phrases with Bangla meaning, English phrase meaning in Bangla, daily English phrases, common English phrases, English speaking phrases, English sentences Bangla meaning, English vocabulary Bangla, learn English phrases, everyday English phrases";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seoTitle,
    description: seoDescription,
    url: `${SITE_URL}/phrase`,
    isPartOf: {
      "@type": "WebSite",
      name: "LearnixDB",
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: "English Phrases",
    },
    inLanguage: "bn",
  };

  const breadcrumbs = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "English Phrases",
      url: "/phrase",
    },
  ];

  /* =========================================================
     Dark Mode
  ========================================================= */

  useEffect(() => {
    try {
      const savedDarkMode = localStorage.getItem("darkMode");

      if (savedDarkMode !== null) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
    } catch (error) {
      console.error("Dark mode preference error:", error);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  /* =========================================================
     Initial Data
  ========================================================= */

  useEffect(() => {
    fetchPhrases();
    loadBookmarks();
  }, []);

  /* =========================================================
     ✅ UPDATED: Fetch Phrases using API_ENDPOINTS
  ========================================================= */

  const fetchPhrases = async () => {
    try {
      setLoading(true);
      setError(null);

      // ✅ Using API_ENDPOINTS.phrasesGet instead of hardcoded URL
      const response = await fetch(API_ENDPOINTS.phrasesGet);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setPhrases(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching phrases:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     Load Bookmarks
  ========================================================= */

  const loadBookmarks = () => {
    try {
      const saved = localStorage.getItem("bookmarkedPhrases");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setBookmarked(parsed);
        }
      }
    } catch (error) {
      console.error("Bookmark loading error:", error);
      setBookmarked([]);
    }
  };

  /* =========================================================
     Filter Phrases
  ========================================================= */

  const filteredPhrases = useMemo(() => {
    let filtered = [...phrases];

    const search = searchTerm.trim().toLowerCase();

    if (search) {
      filtered = filtered.filter((phrase) => {
        const englishWord = phrase.englishWord?.toLowerCase() || "";
        const banglaMeaning = phrase.banglaMeaning || "";

        return (
          englishWord.includes(search) ||
          banglaMeaning.includes(searchTerm.trim())
        );
      });
    }

    if (showOnlyBookmarked) {
      filtered = filtered.filter((phrase) => {
        const phraseId = phrase._id || phrase.id;
        return bookmarked.includes(phraseId);
      });
    }

    return filtered;
  }, [phrases, searchTerm, showOnlyBookmarked, bookmarked]);

  /* =========================================================
     Reset Pagination
  ========================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, showOnlyBookmarked]);

  /* =========================================================
     Bookmark
  ========================================================= */

  const toggleBookmark = (e, phrase) => {
    e.preventDefault();
    e.stopPropagation();

    const phraseId = phrase._id || phrase.id;

    if (!phraseId) return;

    setBookmarked((previous) => {
      const updated = previous.includes(phraseId)
        ? previous.filter((id) => id !== phraseId)
        : [...previous, phraseId];

      localStorage.setItem(
        "bookmarkedPhrases",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const toggleDarkMode = () => {
    setDarkMode((previous) => !previous);
  };

  const clearAllBookmarks = () => {
    if (window.confirm("সব বুকমার্ক মুছে ফেলতে চান?")) {
      setBookmarked([]);
      localStorage.setItem(
        "bookmarkedPhrases",
        JSON.stringify([])
      );
    }
  };

  /* =========================================================
     Speech
  ========================================================= */

  const speakPhrase = (e, phrase) => {
    e.preventDefault();
    e.stopPropagation();

    const phraseId = phrase._id || phrase.id;

    if (!("speechSynthesis" in window)) {
      return;
    }

    if (playingAudio === phraseId) {
      window.speechSynthesis.cancel();
      setPlayingAudio(null);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      phrase.englishWord || ""
    );

    utterance.lang = "en-US";
    utterance.rate = 0.8;

    utterance.onstart = () => {
      setPlayingAudio(phraseId);
    };

    utterance.onend = () => {
      setPlayingAudio(null);
    };

    utterance.onerror = () => {
      setPlayingAudio(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  /* =========================================================
     Phrase Modal
  ========================================================= */

  const handlePhraseClick = (phrase) => {
    setSelectedPhrase(phrase);
  };

  const closeModal = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setPlayingAudio(null);
    setSelectedPhrase(null);
  };

  /* =========================================================
     Pagination
  ========================================================= */

  const totalPages = Math.ceil(
    filteredPhrases.length / itemsPerPage
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredPhrases.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  /* =========================================================
     SEO Component
  ========================================================= */

  const seoComponent = (
    <SEO
      title={seoTitle}
      description={seoDescription}
      keywords={seoKeywords}
      canonicalUrl="/phrase"
      ogType="website"
      structuredData={structuredData}
      breadcrumbs={breadcrumbs}
      language="bn"
    />
  );

  /* =========================================================
     Loading
  ========================================================= */

  if (loading) {
    return (
      <>
        {seoComponent}

        <div
          className={`min-h-screen flex items-center justify-center ${
            darkMode
              ? "bg-gray-900"
              : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
          }`}
        >
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />

            <p
              className={
                darkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              }
            >
              ফ্রেজ লোড হচ্ছে...
            </p>
          </div>
        </div>
      </>
    );
  }

  /* =========================================================
     Error
  ========================================================= */

  if (error) {
    return (
      <>
        {seoComponent}

        <div
          className={`min-h-screen flex items-center justify-center ${
            darkMode
              ? "bg-gray-900"
              : "bg-gradient-to-br from-indigo-50 to-purple-50"
          }`}
        >
          <div className="text-center p-8 max-w-md">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-10 h-10 text-red-600" />
            </div>

            <h2
              className={`text-2xl font-bold mb-2 ${
                darkMode
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              ওহ! সমস্যা হয়েছে
            </h2>

            <p
              className={
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
            >
              ফ্রেজ লোড করতে পারছি না। আবার চেষ্টা করুন।
            </p>

            <button
              onClick={fetchPhrases}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
            >
              আবার চেষ্টা
            </button>
          </div>
        </div>
      </>
    );
  }

  /* =========================================================
     Main UI
  ========================================================= */

  return (
    <>
      {seoComponent}

      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode
            ? "bg-gray-900"
            : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
        }`}
      >
        {/* =====================================================
            Header
        ===================================================== */}

        <div
          className={`sticky top-20 z-30 backdrop-blur-md shadow-sm py-4 transition-colors duration-300 ${
            darkMode
              ? "bg-gray-800/80"
              : "bg-white/80"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{
                    rotate: 360,
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.5 }}
                  className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl"
                >
                  <BookOpen className="w-6 h-6 text-white" />
                </motion.div>

                <div>
                  <h1
                    className={`text-2xl font-bold ${
                      darkMode
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    ইংরেজি ফ্রেজ
                  </h1>

                  <p
                    className={`text-sm ${
                      darkMode
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    দৈনন্দিন ব্যবহারের গুরুত্বপূর্ণ বাক্যাংশ

                    {showOnlyBookmarked && (
                      <span className="ml-2 text-yellow-500">
                        (বুকমার্ক করা)
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Dark Mode */}

                <button
                  onClick={toggleDarkMode}
                  aria-label={
                    darkMode
                      ? "Light mode"
                      : "Dark mode"
                  }
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode
                      ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                      : "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  }`}
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>

                {/* Search */}

                <div className="relative">
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-400"
                    }`}
                  />

                  <input
                    type="search"
                    placeholder="ফ্রেজ খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    aria-label="Search English phrases"
                    className={`pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 w-64 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-200 text-gray-900"
                    }`}
                  />
                </div>

                {/* View Toggle */}

                <button
                  onClick={() =>
                    setViewMode(
                      viewMode === "grid"
                        ? "list"
                        : "grid"
                    )
                  }
                  aria-label="Change view mode"
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                  }`}
                >
                  {viewMode === "grid" ? (
                    <ListIcon className="w-5 h-5" />
                  ) : (
                    <Grid className="w-5 h-5" />
                  )}
                </button>

                {/* Filter */}

                <button
                  onClick={() =>
                    setShowFilters(
                      (previous) => !previous
                    )
                  }
                  aria-label="Show filters"
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                  }`}
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter Panel */}

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  className="overflow-hidden mt-3"
                >
                  <div
                    className={`py-3 border-t ${
                      darkMode
                        ? "border-gray-700"
                        : "border-gray-100"
                    }`}
                  >
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setShowOnlyBookmarked(
                            (previous) => !previous
                          );
                          setShowFilters(false);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                          showOnlyBookmarked
                            ? "bg-yellow-500 text-white"
                            : darkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />

                        বুকমার্ক করা ({bookmarked.length})
                      </button>

                      {bookmarked.length > 0 && (
                        <button
                          onClick={clearAllBookmarks}
                          className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-600 transition-colors"
                        >
                          <BookmarkX className="w-4 h-4" />

                          সব বুকমার্ক মুছুন
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bookmark Counter */}

            {bookmarked.length > 0 && (
              <div
                className={`mt-2 text-sm flex items-center gap-2 ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
              >
                <BookmarkIcon className="w-4 h-4 text-yellow-500" />

                <span>
                  {bookmarked.length} টি ফ্রেজ বুকমার্ক করা
                </span>
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            Main Content
        ===================================================== */}

        <main className="container mx-auto px-4 py-6">
          {filteredPhrases.length === 0 ? (
            <div className="text-center py-12">
              <Heart
                className={`w-16 h-16 mx-auto mb-4 ${
                  darkMode
                    ? "text-gray-700"
                    : "text-gray-300"
                }`}
              />

              <p
                className={
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }
              >
                {showOnlyBookmarked
                  ? "কোন বুকমার্ক করা ফ্রেজ নেই"
                  : "কোন ফ্রেজ পাওয়া যায়নি"}
              </p>
            </div>
          ) : viewMode === "grid" ? (
            /* =================================================
               Grid View
            ================================================= */

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentItems.map((phrase, index) => {
                const phraseId =
                  phrase._id || phrase.id;

                const isBookmarked =
                  bookmarked.includes(phraseId);

                const isPlaying =
                  playingAudio === phraseId;

                return (
                  <motion.div
                    key={phraseId || index}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    whileHover={{ y: -5 }}
                    className={`rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-800 hover:shadow-2xl"
                        : "bg-white hover:shadow-2xl"
                    }`}
                    onClick={() =>
                      handlePhraseClick(phrase)
                    }
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h2
                            className={`text-xl font-bold ${
                              darkMode
                                ? "text-white"
                                : "text-gray-800"
                            }`}
                          >
                            {phrase.englishWord}
                          </h2>
                        </div>

                        <button
                          onClick={(e) =>
                            toggleBookmark(
                              e,
                              phrase
                            )
                          }
                          aria-label={
                            isBookmarked
                              ? "Remove bookmark"
                              : "Add bookmark"
                          }
                          className={`p-1.5 rounded-full transition-colors ${
                            isBookmarked
                              ? "text-yellow-400 hover:text-yellow-500"
                              : darkMode
                              ? "text-gray-600 hover:text-gray-400"
                              : "text-gray-300 hover:text-gray-400"
                          }`}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      </div>

                      <p
                        className={`text-lg mb-3 ${
                          darkMode
                            ? "text-indigo-400"
                            : "text-indigo-600"
                        }`}
                      >
                        {phrase.banglaMeaning}
                      </p>

                      {phrase.example && (
                        <p
                          className={`text-sm line-clamp-2 ${
                            darkMode
                              ? "text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          {phrase.example}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-4">
                        <button
                          onClick={(e) =>
                            speakPhrase(
                              e,
                              phrase
                            )
                          }
                          aria-label={`Listen to ${phrase.englishWord}`}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
                            isPlaying
                              ? "bg-green-500 text-white"
                              : darkMode
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                          }`}
                        >
                          <Volume2 className="w-4 h-4" />

                          {isPlaying
                            ? "প্লেয়িং..."
                            : "শুনুন"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* =================================================
               List View
            ================================================= */

            <div className="space-y-3">
              {currentItems.map((phrase, index) => {
                const phraseId =
                  phrase._id || phrase.id;

                const isBookmarked =
                  bookmarked.includes(phraseId);

                const isPlaying =
                  playingAudio === phraseId;

                return (
                  <motion.div
                    key={phraseId || index}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className={`rounded-lg shadow-md overflow-hidden cursor-pointer transition-all ${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:shadow-lg"
                    }`}
                    onClick={() =>
                      handlePhraseClick(phrase)
                    }
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h2
                          className={`text-lg font-semibold truncate ${
                            darkMode
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >
                          {phrase.englishWord}
                        </h2>

                        <p
                          className={`text-sm truncate ${
                            darkMode
                              ? "text-indigo-400"
                              : "text-indigo-600"
                          }`}
                        >
                          {phrase.banglaMeaning}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 ml-3">
                        <button
                          onClick={(e) =>
                            speakPhrase(
                              e,
                              phrase
                            )
                          }
                          aria-label={`Listen to ${phrase.englishWord}`}
                          className={`p-2 rounded-full transition-colors ${
                            isPlaying
                              ? "bg-green-500 text-white"
                              : darkMode
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                          }`}
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(e) =>
                            toggleBookmark(
                              e,
                              phrase
                            )
                          }
                          aria-label={
                            isBookmarked
                              ? "Remove bookmark"
                              : "Add bookmark"
                          }
                          className={`p-2 rounded-full transition-colors ${
                            isBookmarked
                              ? "text-yellow-400"
                              : darkMode
                              ? "text-gray-600 hover:text-gray-400"
                              : "text-gray-300 hover:text-gray-400"
                          }`}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* =================================================
              Pagination
          ================================================= */}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1)
                  )
                }
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span
                className={`text-sm ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
              >
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(
                      page + 1,
                      totalPages
                    )
                  )
                }
                disabled={
                  currentPage === totalPages
                }
                aria-label="Next page"
                className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </main>

        {/* =====================================================
            Detail Modal
        ===================================================== */}

        <AnimatePresence>
          {selectedPhrase && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "tween" }}
                className={`w-full max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto ${
                  darkMode
                    ? "bg-gray-800"
                    : "bg-white"
                }`}
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                {/* Modal Header */}

                <div
                  className={`sticky top-0 p-4 flex justify-between items-center border-b ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <h2
                    className={`text-xl font-bold break-words pr-2 ${
                      darkMode
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    {selectedPhrase.englishWord}
                  </h2>

                  <button
                    onClick={closeModal}
                    aria-label="Close phrase details"
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <X
                      className={`w-5 h-5 ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>

                {/* Modal Content */}

                <div className="p-6 space-y-4">
                  <div>
                    <p
                      className={`text-sm mb-1 ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      ইংরেজি বাক্যাংশ
                    </p>

                    <p
                      className={`text-lg font-medium ${
                        darkMode
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                    >
                      {selectedPhrase.englishWord}
                    </p>
                  </div>

                  <div>
                    <p
                      className={`text-sm mb-1 ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      বাংলা অনুবাদ
                    </p>

                    <p
                      className={`text-xl ${
                        darkMode
                          ? "text-indigo-400"
                          : "text-indigo-600"
                      }`}
                    >
                      {selectedPhrase.banglaMeaning}
                    </p>
                  </div>

                  {selectedPhrase.example && (
                    <div>
                      <p
                        className={`text-sm mb-1 ${
                          darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        উদাহরণ বাক্য
                      </p>

                      <p
                        className={`italic ${
                          darkMode
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        "{selectedPhrase.example}"
                      </p>
                    </div>
                  )}

                  {selectedPhrase.notes && (
                    <div>
                      <p
                        className={`text-sm mb-1 ${
                          darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        মন্তব্য
                      </p>

                      <p
                        className={
                          darkMode
                            ? "text-gray-300"
                            : "text-gray-700"
                        }
                      >
                        {selectedPhrase.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}

                <div
                  className={`p-4 border-t flex gap-3 ${
                    darkMode
                      ? "border-gray-700"
                      : "border-gray-100"
                  }`}
                >
                  <button
                    onClick={(e) =>
                      speakPhrase(
                        e,
                        selectedPhrase
                      )
                    }
                    className="flex-1 py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
                  >
                    <Volume2 className="w-5 h-5" />

                    <span>শুনুন</span>
                  </button>

                  <button
                    onClick={(e) =>
                      toggleBookmark(
                        e,
                        selectedPhrase
                      )
                    }
                    className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      bookmarked.includes(
                        selectedPhrase._id ||
                          selectedPhrase.id
                      )
                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                        : darkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Star className="w-5 h-5 fill-current" />

                    <span>
                      {bookmarked.includes(
                        selectedPhrase._id ||
                          selectedPhrase.id
                      )
                        ? "বুকমার্ক করা"
                        : "বুকমার্ক করুন"}
                    </span>
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

export default Phrese;