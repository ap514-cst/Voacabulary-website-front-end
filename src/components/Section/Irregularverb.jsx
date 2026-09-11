// src/components/IrregularVerb.jsx
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Volume2,
  Search,
  Play,
  Pause,
  Star,
  X,
  Moon,
  Sun,
  Filter,
  ChevronLeft,
  ChevronRight,
  Table,
  Grid,
  Bookmark,
  BookmarkX,
} from "lucide-react";
import SEO from "../SEO";

// ✅ Import central API config
import API_ENDPOINTS from '../config/api';

const SITE_URL = "https://learnixdb.netlify.app";

const SEO_TITLE = "Irregular Verbs with Bangla Meaning";
const SEO_DESCRIPTION =
  "Learn English irregular verbs with Bangla meanings, infinitive, simple past, past participle, explanations and examples. Improve your English grammar and vocabulary with LearnixDB.";
const SEO_KEYWORDS =
  "irregular verbs, irregular verbs with Bangla meaning, English irregular verbs, irregular verbs list, English verb forms, verb forms with Bangla meaning, V1 V2 V3 verbs, English grammar Bangla, learn English verbs, English vocabulary";

const IrregularVerb = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [bookmarked, setBookmarked] = useState([]);
  const [selectedVerb, setSelectedVerb] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [showFilters, setShowFilters] = useState(false);
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  const itemsPerPage = 10;

  // --------------------------------------------------
  // SEO Structured Data
  // --------------------------------------------------

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: `${SITE_URL}/irregular-verbs`,
    isPartOf: {
      "@type": "WebSite",
      name: "LearnixDB",
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: "English Irregular Verbs",
    },
    inLanguage: "bn",
  };

  const breadcrumbs = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Irregular Verbs",
      url: "/irregular-verbs",
    },
  ];

  // --------------------------------------------------
  // Dark Mode
  // --------------------------------------------------

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // --------------------------------------------------
  // Initial Data
  // --------------------------------------------------

  useEffect(() => {
    fetchVerbs();
    loadBookmarks();
    loadDarkModePreference();
  }, []);

  // --------------------------------------------------
  // ✅ UPDATED: Fetch Irregular Verbs using API_ENDPOINTS
  // --------------------------------------------------

  const fetchVerbs = async () => {
    try {
      setLoading(true);
      setError(null);

      // ✅ Using API_ENDPOINTS.irregularGet instead of hardcoded URL
      const response = await fetch(API_ENDPOINTS.irregularGet);

      if (!response.ok) {
        throw new Error("Failed to fetch irregular verbs");
      }

      const result = await response.json();

      if (!Array.isArray(result)) {
        throw new Error("Invalid data format");
      }

      setData(result);
    } catch (err) {
      console.error("Error fetching verbs:", err);
      setError("ডাটা লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Load Bookmarks
  // --------------------------------------------------

  const loadBookmarks = () => {
    try {
      const saved = localStorage.getItem("bookmarkedVerbs");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setBookmarked(parsed);
        }
      }
    } catch (err) {
      console.error("Error loading bookmarks:", err);
      setBookmarked([]);
    }
  };

  // --------------------------------------------------
  // Load Dark Mode
  // --------------------------------------------------

  const loadDarkModePreference = () => {
    try {
      const saved = localStorage.getItem("darkMode");

      if (saved !== null) {
        setDarkMode(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Error loading dark mode:", err);
    }
  };

  // --------------------------------------------------
  // Filter Data
  // --------------------------------------------------

  const filteredData = useMemo(() => {
    let filtered = [...data];

    const query = searchTerm.trim().toLowerCase();

    if (query) {
      filtered = filtered.filter((verb) => {
        return (
          verb.infinitive?.toLowerCase().includes(query) ||
          verb.simplepast?.toLowerCase().includes(query) ||
          verb.PastParitciple?.toLowerCase().includes(query) ||
          verb.Bangla?.includes(searchTerm.trim())
        );
      });
    }

    if (showOnlyBookmarked) {
      filtered = filtered.filter((verb) =>
        bookmarked.includes(verb._id || verb.id)
      );
    }

    return filtered;
  }, [data, searchTerm, showOnlyBookmarked, bookmarked]);

  // --------------------------------------------------
  // Reset Pagination When Filter Changes
  // --------------------------------------------------

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, showOnlyBookmarked]);

  // --------------------------------------------------
  // Keep Current Page Valid
  // --------------------------------------------------

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // --------------------------------------------------
  // Bookmark Toggle
  // --------------------------------------------------

  const toggleBookmark = (e, verb) => {
    e?.preventDefault();
    e?.stopPropagation();

    const verbId = verb._id || verb.id;

    if (!verbId) return;

    setBookmarked((previous) => {
      const updated = previous.includes(verbId)
        ? previous.filter((id) => id !== verbId)
        : [...previous, verbId];

      localStorage.setItem(
        "bookmarkedVerbs",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  // --------------------------------------------------
  // Dark Mode Toggle
  // --------------------------------------------------

  const toggleDarkMode = () => {
    setDarkMode((previous) => {
      const newMode = !previous;

      localStorage.setItem("darkMode", JSON.stringify(newMode));

      return newMode;
    });
  };

  // --------------------------------------------------
  // Clear All Bookmarks
  // --------------------------------------------------

  const clearAllBookmarks = () => {
    if (window.confirm("সব বুকমার্ক মুছে ফেলতে চান?")) {
      setBookmarked([]);
      localStorage.setItem("bookmarkedVerbs", JSON.stringify([]));
    }
  };

  // --------------------------------------------------
  // Speech
  // --------------------------------------------------

  const playAudio = (e, verb) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!window.speechSynthesis) {
      alert("আপনার browser speech synthesis support করছে না।");
      return;
    }

    const verbId = verb._id || verb.id;

    if (playingAudio === verbId) {
      window.speechSynthesis.cancel();
      setPlayingAudio(null);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      verb.infinitive || ""
    );

    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setPlayingAudio(verbId);
    };

    utterance.onend = () => {
      setPlayingAudio(null);
    };

    utterance.onerror = () => {
      setPlayingAudio(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // --------------------------------------------------
  // Stop Speech On Unmount
  // --------------------------------------------------

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // --------------------------------------------------
  // Open Verb Details
  // --------------------------------------------------

  const handleVerbClick = (verb) => {
    setSelectedVerb(verb);
  };

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // --------------------------------------------------
  // Shared SEO Element
  // --------------------------------------------------

  const seoElement = (
    <SEO
      title={SEO_TITLE}
      description={SEO_DESCRIPTION}
      keywords={SEO_KEYWORDS}
      canonicalUrl="/irregular-verbs"
      ogType="website"
      structuredData={structuredData}
      breadcrumbs={breadcrumbs}
      language="bn"
    />
  );

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <>
        {seoElement}

        <div
          className={`min-h-screen flex items-center justify-center ${
            darkMode
              ? "bg-gray-900"
              : "bg-gradient-to-b from-indigo-50 to-white"
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
              ইরেগুলার ভার্ব লোড হচ্ছে...
            </p>
          </div>
        </div>
      </>
    );
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------

  if (error) {
    return (
      <>
        {seoElement}

        <div
          className={`min-h-screen flex items-center justify-center ${
            darkMode
              ? "bg-gray-900"
              : "bg-gradient-to-b from-indigo-50 to-white"
          }`}
        >
          <div className="text-center p-8">
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
              {error}
            </p>

            <button
              onClick={fetchVerbs}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        </div>
      </>
    );
  }

  // --------------------------------------------------
  // Main UI
  // --------------------------------------------------

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-b from-indigo-50 to-white"
      }`}
    >
      {seoElement}

      {/* Header */}
      <div
        className={`sticky top-20 z-30 backdrop-blur-md shadow-sm py-3 transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800/80"
            : "bg-white/80"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            
            {/* Title */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg"
              >
                <BookOpen className="w-5 h-5 text-white" />
              </motion.div>

              <h1
                className={`text-xl font-bold ${
                  darkMode
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                ইরেগুলার ভার্ব

                {showOnlyBookmarked && (
                  <span className="ml-2 text-sm font-normal text-yellow-500">
                    (বুকমার্ক করা)
                  </span>
                )}
              </h1>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">

              {/* Dark Mode */}
              <button
                type="button"
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
              <div className="relative flex-1 min-w-[200px]">
                <Search
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                />

                <input
                  type="search"
                  placeholder="খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  aria-label="Search irregular verbs"
                  className={`w-full pl-8 pr-2 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                />
              </div>

              {/* View Toggle */}
              <button
                type="button"
                onClick={() =>
                  setViewMode(
                    viewMode === "table"
                      ? "grid"
                      : "table"
                  )
                }
                aria-label="Change view mode"
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                }`}
              >
                {viewMode === "table" ? (
                  <Grid className="w-5 h-5" />
                ) : (
                  <Table className="w-5 h-5" />
                )}
              </button>

              {/* Filter */}
              <button
                type="button"
                onClick={() =>
                  setShowFilters((previous) => !previous)
                }
                aria-label="Open filters"
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
                      type="button"
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
                        type="button"
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
              <Bookmark className="w-4 h-4 text-yellow-500" />

              <span>
                {bookmarked.length} টি ইরেগুলার ভার্ব বুকমার্ক করা
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {filteredData.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen
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
                ? "কোন বুকমার্ক করা ইরেগুলার ভার্ব নেই"
                : "কোন ইরেগুলার ভার্ব পাওয়া যায়নি"}
            </p>
          </div>
        ) : viewMode === "table" ? (

          /* Table View */
          <div className="overflow-x-auto rounded-lg shadow">
            <table
              className={`w-full border-collapse ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              }`}
            >
              <thead>
                <tr
                  className={
                    darkMode
                      ? "bg-gray-800"
                      : "bg-indigo-100"
                  }
                >
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    #
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Infinitive
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Simple Past
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Past Participle
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    বাংলা অর্থ
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    ব্যাখ্যা
                  </th>

                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    অ্যাকশন
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((verb, index) => {
                  const verbId = verb._id || verb.id;

                  return (
                    <motion.tr
                      key={verbId || index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: index * 0.03,
                      }}
                      className={`border-b cursor-pointer transition-colors ${
                        darkMode
                          ? "border-gray-700 hover:bg-gray-800"
                          : "border-gray-200 hover:bg-indigo-50"
                      }`}
                      onClick={() =>
                        handleVerbClick(verb)
                      }
                    >
                      <td className="px-4 py-3 text-sm">
                        {indexOfFirstItem + index + 1}
                      </td>

                      <td className="px-4 py-3 font-medium">
                        <div className="flex items-center gap-2">
                          {verb.infinitive}

                          <button
                            type="button"
                            onClick={(e) =>
                              playAudio(e, verb)
                            }
                            aria-label={`Play pronunciation of ${verb.infinitive}`}
                            className={`p-1.5 rounded-full transition-colors ${
                              darkMode
                                ? "hover:bg-gray-700 text-gray-400 hover:text-gray-300"
                                : "hover:bg-indigo-100 text-indigo-600"
                            }`}
                          >
                            {playingAudio === verbId ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-sm">
                        {verb.simplepast}
                      </td>

                      <td className="px-4 py-3 text-sm">
                        {verb.PastParitciple}
                      </td>

                      <td className="px-4 py-3 text-sm">
                        {verb.Bangla}
                      </td>

                      <td className="px-4 py-3 text-sm max-w-xs truncate">
                        {verb.explan}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={(e) =>
                            toggleBookmark(e, verb)
                          }
                          aria-label={
                            bookmarked.includes(verbId)
                              ? "Remove bookmark"
                              : "Add bookmark"
                          }
                          className={`p-1.5 rounded-full transition-colors ${
                            bookmarked.includes(verbId)
                              ? "text-yellow-400 hover:text-yellow-500"
                              : darkMode
                                ? "text-gray-600 hover:text-gray-400"
                                : "text-gray-300 hover:text-gray-400"
                          }`}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        ) : (

          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentItems.map((verb, index) => {
              const verbId = verb._id || verb.id;

              return (
                <motion.div
                  key={verbId || index}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.03,
                  }}
                  className={`rounded-xl shadow-sm border overflow-hidden cursor-pointer transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-gray-700"
                      : "bg-white border-gray-100 hover:shadow-lg"
                  }`}
                  onClick={() =>
                    handleVerbClick(verb)
                  }
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h2
                          className={`text-lg font-bold ${
                            darkMode
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          {verb.infinitive}
                        </h2>

                        <div className="flex items-center gap-2 mt-1">
                          <button
                            type="button"
                            onClick={(e) =>
                              playAudio(e, verb)
                            }
                            aria-label={`Play pronunciation of ${verb.infinitive}`}
                            className={`p-1.5 rounded-full transition-colors ${
                              darkMode
                                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                            }`}
                          >
                            {playingAudio === verbId ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) =>
                          toggleBookmark(e, verb)
                        }
                        aria-label={
                          bookmarked.includes(verbId)
                            ? "Remove bookmark"
                            : "Add bookmark"
                        }
                        className={`p-1.5 rounded-full transition-colors ${
                          bookmarked.includes(verbId)
                            ? "text-yellow-400 hover:text-yellow-500"
                            : darkMode
                              ? "text-gray-600 hover:text-gray-400"
                              : "text-gray-300 hover:text-gray-400"
                        }`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    </div>

                    <div className="space-y-2">

                      <div>
                        <p
                          className={`text-xs ${
                            darkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}
                        >
                          Simple Past
                        </p>

                        <p
                          className={`text-sm font-medium ${
                            darkMode
                              ? "text-gray-300"
                              : "text-gray-700"
                          }`}
                        >
                          {verb.simplepast}
                        </p>
                      </div>

                      <div>
                        <p
                          className={`text-xs ${
                            darkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}
                        >
                          Past Participle
                        </p>

                        <p
                          className={`text-sm font-medium ${
                            darkMode
                              ? "text-gray-300"
                              : "text-gray-700"
                          }`}
                        >
                          {verb.PastParitciple}
                        </p>
                      </div>

                      <div>
                        <p
                          className={`text-xs ${
                            darkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}
                        >
                          বাংলা অর্থ
                        </p>

                        <p
                          className={`text-sm ${
                            darkMode
                              ? "text-indigo-400"
                              : "text-indigo-600"
                          }`}
                        >
                          {verb.Bangla}
                        </p>
                      </div>

                      <div>
                        <p
                          className={`text-xs ${
                            darkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}
                        >
                          ব্যাখ্যা
                        </p>

                        <p
                          className={`text-sm line-clamp-2 ${
                            darkMode
                              ? "text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          {verb.explan}
                        </p>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(page - 1, 1)
                )
              }
              disabled={currentPage === 1}
              aria-label="Previous page"
              className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
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
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(page + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>
        )}
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedVerb && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() =>
              setSelectedVerb(null)
            }
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
                  className={`text-xl font-bold ${
                    darkMode
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  {selectedVerb.infinitive}
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedVerb(null)
                  }
                  aria-label="Close details"
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
              <div className="p-4 space-y-4">

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <p
                      className={`text-sm mb-1 ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      Simple Past
                    </p>

                    <p
                      className={`text-lg font-medium ${
                        darkMode
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {selectedVerb.simplepast}
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
                      Past Participle
                    </p>

                    <p
                      className={`text-lg font-medium ${
                        darkMode
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {selectedVerb.PastParitciple}
                    </p>
                  </div>

                </div>

                <div>
                  <p
                    className={`text-sm mb-1 ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    বাংলা অর্থ
                  </p>

                  <p
                    className={`text-xl ${
                      darkMode
                        ? "text-indigo-400"
                        : "text-indigo-600"
                    }`}
                  >
                    {selectedVerb.Bangla}
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
                    ব্যাখ্যা
                  </p>

                  <p
                    className={
                      darkMode
                        ? "text-gray-300"
                        : "text-gray-700"
                    }
                  >
                    {selectedVerb.explan}
                  </p>
                </div>

                {selectedVerb.example && (
                  <div>
                    <p
                      className={`text-sm mb-1 ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      উদাহরণ
                    </p>

                    <p
                      className={`italic ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      "{selectedVerb.example}"
                    </p>
                  </div>
                )}

              </div>

              {/* Modal Actions */}
              <div
                className={`p-4 border-t flex gap-3 ${
                  darkMode
                    ? "border-gray-700"
                    : "border-gray-100"
                }`}
              >

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudio(e, selectedVerb);
                  }}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>শুনুন</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(e, selectedVerb);
                  }}
                  className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    bookmarked.includes(
                      selectedVerb._id ||
                        selectedVerb.id
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
                      selectedVerb._id ||
                        selectedVerb.id
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
  );
};

export default IrregularVerb;