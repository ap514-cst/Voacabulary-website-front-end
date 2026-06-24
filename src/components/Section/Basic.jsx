

//http://localhost:2002/api/data/vocGET/level?level=basic
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Volume2, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Play,
  Pause,
  Star,
  X,
  Grid,
  List as ListIcon,
  Filter,
  Moon,
  Sun,
  Bookmark as BookmarkIcon,
  BookmarkX
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const Basic = () => {
  const [words, setWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [bookmarked, setBookmarked] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  
  const wordsPerPage = 6;

  // ডার্ক মোড টগল
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // লোকাল স্টোরেজ থেকে বুকমার্ক লোড
  useEffect(() => {
    fetchWords();
    loadBookmarks();
    loadDarkModePreference();
  }, []);

  // ফিল্টার আপডেট
  useEffect(() => {
    filterWords();
  }, [words, searchTerm, showOnlyBookmarked]);

  const fetchWords = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:2002/api/data/vocGET/level?level=basic");
      const data = await response.json();
      setWords(data);
      setFilteredWords(data);
    } catch (error) {
      console.error("Error fetching words:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadBookmarks = () => {
    const saved = localStorage.getItem('bookmarkedWords');
    if (saved) {
      setBookmarked(JSON.parse(saved));
    }
  };

  const loadDarkModePreference = () => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setDarkMode(JSON.parse(saved));
    }
  };

  const filterWords = () => {
    let filtered = words;
    
    // সার্চ ফিল্টার
    if (searchTerm) {
      filtered = filtered.filter(word => 
        word.englishWord?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.banglaMeaning?.includes(searchTerm)
      );
    }
    
    // বুকমার্ক ফিল্টার
    if (showOnlyBookmarked) {
      filtered = filtered.filter(word => bookmarked.includes(word._id));
    }
    
    setFilteredWords(filtered);
    setCurrentPage(1);
  };

  const toggleBookmark = (e, word) => {
    e.preventDefault();
    e.stopPropagation();
    
    let updated;
    if (bookmarked.includes(word._id)) {
      updated = bookmarked.filter(id => id !== word._id);
    } else {
      updated = [...bookmarked, word._id];
    }
    
    setBookmarked(updated);
    localStorage.setItem('bookmarkedWords', JSON.stringify(updated));
    
    // বুকমার্ক ফিল্টার অন থাকলে তালিকা আপডেট
    if (showOnlyBookmarked) {
      filterWords();
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const clearAllBookmarks = () => {
    if (window.confirm('সব বুকমার্ক মুছে ফেলতে চান?')) {
      setBookmarked([]);
      localStorage.setItem('bookmarkedWords', JSON.stringify([]));
      if (showOnlyBookmarked) {
        setFilteredWords([]);
      }
    }
  };

  const playAudio = (e, word) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (playingAudio === word._id) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(word._id);
      if (word.audio) {
        const audio = new Audio(`http://localhost:2002/${word.audio}`);
        audio.play();
        audio.onended = () => setPlayingAudio(null);
      }
    }
  };

  const speakWord = (e, word) => {
    e.preventDefault();
    e.stopPropagation();
    
    const utterance = new SpeechSynthesisUtterance(word.englishWord);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleCardClick = (word) => {
    setSelectedWord(word);
  };

  // প্যাগিনেশন
  const indexOfLastWord = currentPage * wordsPerPage;
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = filteredWords.slice(indexOfFirstWord, indexOfLastWord);
  const totalPages = Math.ceil(filteredWords.length / wordsPerPage);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-indigo-50 to-white'}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-indigo-50 to-white'}`}>
      <Helmet>
        <title>Basic</title>
        
      </Helmet>
      {/* হেডার */}
      <div className={`sticky top-20 z-30 backdrop-blur-md shadow-sm py-3 transition-colors duration-300 ${
        darkMode ? 'bg-gray-800/80' : 'bg-white/80'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-2">
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              বেসিক শব্দ
              {showOnlyBookmarked && (
                <span className="ml-2 text-sm font-normal text-yellow-500">
                  (বুকমার্ক করা)
                </span>
              )}
            </h1>
            <div className="flex items-center gap-2">
              {/* ডার্ক মোড টগল */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
                    : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* সার্চ */}
              <div className="relative flex-1 max-w-[140px]">
                <Search className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-8 pr-2 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                />
              </div>

              {/* ভিউ টগল */}
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                {viewMode === 'grid' ? <ListIcon className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
              </button>

              {/* ফিল্টার */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ফিল্টার প্যানেল */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-3"
              >
                <div className={`py-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setShowOnlyBookmarked(!showOnlyBookmarked);
                        setShowFilters(false);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                        showOnlyBookmarked
                          ? 'bg-yellow-500 text-white'
                          : darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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

          {/* বুকমার্ক কাউন্টার */}
          {bookmarked.length > 0 && (
            <div className={`mt-2 text-sm flex items-center gap-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <BookmarkIcon className="w-4 h-4 text-yellow-500" />
              <span>{bookmarked.length} টি শব্দ বুকমার্ক করা</span>
            </div>
          )}
        </div>
      </div>

      {/* মেইন কন্টেন্ট */}
      <div className="container mx-auto px-4 py-4">
        {filteredWords.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className={`w-16 h-16 mx-auto mb-4 ${
              darkMode ? 'text-gray-700' : 'text-gray-300'
            }`} />
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {showOnlyBookmarked ? 'কোন বুকমার্ক করা শব্দ নেই' : 'কোন শব্দ পাওয়া যায়নি'}
            </p>
          </div>
        ) : (
          <>
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" 
                : "space-y-2"
            }>
              {currentWords.map((word, index) => (
                <motion.div
                  key={word._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`rounded-xl shadow-sm border overflow-hidden cursor-pointer transition-all duration-300 ${
                    viewMode === 'list' ? 'flex items-center p-3' : 'p-4'
                  } ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 hover:shadow-gray-700' 
                      : 'bg-white border-gray-100 hover:shadow-lg'
                  }`}
                  onClick={() => handleCardClick(word)}
                >
                  {viewMode === 'grid' ? (
                    // গ্রিড কার্ড
                    <>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`text-lg font-bold break-words pr-2 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {word.englishWord}
                        </h3>
                        <button
                          onClick={(e) => toggleBookmark(e, word)}
                          className={`p-1.5 rounded-full transition-colors ${
                            bookmarked.includes(word._id) 
                              ? 'text-yellow-400 hover:text-yellow-500' 
                              : darkMode
                                ? 'text-gray-600 hover:text-gray-400'
                                : 'text-gray-300 hover:text-gray-400'
                          }`}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                      <p className={`text-base mb-2 break-words ${
                        darkMode ? 'text-indigo-400' : 'text-indigo-600'
                      }`}>
                        {word.banglaMeaning}
                      </p>
                      <p className={`text-sm mb-3 line-clamp-2 break-words ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {word.explanation}
                      </p>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={(e) => playAudio(e, word)}
                          className={`p-2 rounded-full transition-colors ${
                            darkMode 
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                              : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                          }`}
                        >
                          {playingAudio === word._id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={(e) => speakWord(e, word)}
                          className={`p-2 rounded-full transition-colors ${
                            darkMode 
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                              : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                          }`}
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    // লিস্ট ভিউ
                    <>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-base font-bold truncate ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {word.englishWord}
                        </h3>
                        <p className={`text-sm truncate ${
                          darkMode ? 'text-indigo-400' : 'text-indigo-600'
                        }`}>
                          {word.banglaMeaning}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <button
                          onClick={(e) => playAudio(e, word)}
                          className={`p-2 rounded-full transition-colors ${
                            darkMode 
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                              : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                          }`}
                        >
                          {playingAudio === word._id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={(e) => toggleBookmark(e, word)}
                          className={`p-2 rounded-full transition-colors ${
                            bookmarked.includes(word._id) 
                              ? 'text-yellow-400' 
                              : darkMode
                                ? 'text-gray-600 hover:text-gray-400'
                                : 'text-gray-300 hover:text-gray-400'
                          }`}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>

            {/* প্যাগিনেশন */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ডিটেইল মোডাল */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setSelectedWord(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween' }}
              className={`w-full max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              onClick={e => e.stopPropagation()}
            >
              <div className={`sticky top-0 p-4 flex justify-between items-center border-b ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              }`}>
                <h2 className={`text-xl font-bold break-words pr-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedWord.englishWord}
                </h2>
                <button 
                  onClick={() => setSelectedWord(null)} 
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    বাংলা অর্থ
                  </p>
                  <p className={`text-xl break-words ${
                    darkMode ? 'text-indigo-400' : 'text-indigo-600'
                  }`}>
                    {selectedWord.banglaMeaning}
                  </p>
                </div>
                
                <div>
                  <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    ব্যাখ্যা
                  </p>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {selectedWord.explanation}
                  </p>
                </div>
                
                {selectedWord.example && (
                  <div>
                    <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      উদাহরণ
                    </p>
                    <p className={`italic break-words ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      "{selectedWord.example}"
                    </p>
                  </div>
                )}
                
                {selectedWord.audio && (
                  <div>
                    <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      অডিও
                    </p>
                    <audio controls className="w-full">
                      <source src={`https://voacabulary-website-back-end-2.onrender.com/${selectedWord.audio}`} />
                    </audio>
                  </div>
                )}
              </div>

              <div className={`p-4 border-t flex gap-3 ${
                darkMode ? 'border-gray-700' : 'border-gray-100'
              }`}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(e, selectedWord);
                  }}
                  className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    bookmarked.includes(selectedWord._id)
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Star className="w-5 h-5 fill-current" />
                  <span>{bookmarked.includes(selectedWord._id) ? 'বুকমার্ক করা' : 'বুকমার্ক করুন'}</span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakWord(e, selectedWord);
                  }}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>শুনুন</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Basic;