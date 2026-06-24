import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Number = () => {
  const [numbers, setNumbers] = useState([]);
  const [filteredNumbers, setFilteredNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [bookmarked, setBookmarked] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.9);
  
  const itemsPerPage = 20;

  // Generate numbers 1-100 with Bangla translations
  useEffect(() => {
    generateNumbers();
    loadBookmarks();
    loadDarkModePreference();
  }, []);

  // Filter numbers
  useEffect(() => {
    filterNumbers();
  }, [numbers, searchTerm, showOnlyBookmarked]);

  const generateNumbers = () => {
    const numbersData = [];
    const banglaNumbers = {
      1: 'এক', 2: 'দুই', 3: 'তিন', 4: 'চার', 5: 'পাঁচ',
      6: 'ছয়', 7: 'সাত', 8: 'আট', 9: 'নয়', 10: 'দশ',
      11: 'এগারো', 12: 'বারো', 13: 'তেরো', 14: 'চৌদ্দ', 15: 'পনেরো',
      16: 'ষোল', 17: 'সতেরো', 18: 'আঠারো', 19: 'উনিশ', 20: 'বিশ',
      21: 'একুশ', 22: 'বাইশ', 23: 'তেইশ', 24: 'চব্বিশ', 25: 'পঁচিশ',
      26: 'ছাব্বিশ', 27: 'সাতাশ', 28: 'আঠাশ', 29: 'ঊনত্রিশ', 30: 'ত্রিশ',
      31: 'একত্রিশ', 32: 'বত্রিশ', 33: 'তেত্রিশ', 34: 'চৌত্রিশ', 35: 'পঁয়ত্রিশ',
      36: 'ছত্রিশ', 37: 'সাঁইত্রিশ', 38: 'আটত্রিশ', 39: 'ঊনচল্লিশ', 40: 'চল্লিশ',
      41: 'একচল্লিশ', 42: 'বিয়াল্লিশ', 43: 'তেতাল্লিশ', 44: 'চুয়াল্লিশ', 45: 'পঁয়তাল্লিশ',
      46: 'ছিয়াল্লিশ', 47: 'সাতচল্লিশ', 48: 'আটচল্লিশ', 49: 'ঊনপঞ্চাশ', 50: 'পঞ্চাশ',
      51: 'একান্ন', 52: 'বায়ান্ন', 53: 'তিপ্পান্ন', 54: 'চুয়ান্ন', 55: 'পঞ্চান্ন',
      56: 'ছাপ্পান্ন', 57: 'সাতান্ন', 58: 'আটান্ন', 59: 'ঊনষাট', 60: 'ষাট',
      61: 'একষট্টি', 62: 'বাষট্টি', 63: 'তেষট্টি', 64: 'চৌষট্টি', 65: 'পঁয়ষট্টি',
      66: 'ছেষট্টি', 67: 'সাতষট্টি', 68: 'আটষট্টি', 69: 'ঊনসত্তর', 70: 'সত্তর',
      71: 'একাত্তর', 72: 'বাহাত্তর', 73: 'তিয়াত্তর', 74: 'চুয়াত্তর', 75: 'পঁচাত্তর',
      76: 'ছিয়াত্তর', 77: 'সাতাত্তর', 78: 'আটাত্তর', 79: 'ঊনআশি', 80: 'আশি',
      81: 'একাশি', 82: 'বিরাশি', 83: 'তিরাশি', 84: 'চুরাশি', 85: 'পঁচাশি',
      86: 'ছিয়াশি', 87: 'সাতাশি', 88: 'আটাশি', 89: 'ঊননব্বই', 90: 'নব্বই',
      91: 'একানব্বই', 92: 'বিরানব্বই', 93: 'তিরানব্বই', 94: 'চুরানব্বই', 95: 'পঁচানব্বই',
      96: 'ছিয়ানব্বই', 97: 'সাতানব্বই', 98: 'আটানব্বই', 99: 'নিরানব্বই', 100: 'একশ'
    };

    for (let i = 1; i <= 100; i++) {
      numbersData.push({
        id: i,
        number: i,
        englishWord: getEnglishWord(i),
        banglaMeaning: banglaNumbers[i] || i.toString(),
        type: i <= 20 ? 'basic' : i <= 50 ? 'intermediate' : 'advanced'
      });
    }
    setNumbers(numbersData);
    setFilteredNumbers(numbersData);
  };

  const getEnglishWord = (num) => {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (num === 100) return 'one hundred';
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) {
      const ten = Math.floor(num / 10);
      const one = num % 10;
      return tens[ten] + (one ? '-' + ones[one] : '');
    }
    return num.toString();
  };

  const loadBookmarks = () => {
    const saved = localStorage.getItem('bookmarkedNumbers');
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

  const filterNumbers = () => {
    let filtered = [...numbers];

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.number.toString().includes(searchTerm) ||
        item.englishWord.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.banglaMeaning.includes(searchTerm)
      );
    }

    if (showOnlyBookmarked) {
      filtered = filtered.filter(item => bookmarked.includes(item.id));
    }

    setFilteredNumbers(filtered);
    setCurrentPage(1);
  };

  const toggleBookmark = (e, number) => {
    e.preventDefault();
    e.stopPropagation();

    let updated;
    if (bookmarked.includes(number.id)) {
      updated = bookmarked.filter(id => id !== number.id);
    } else {
      updated = [...bookmarked, number.id];
    }

    setBookmarked(updated);
    localStorage.setItem('bookmarkedNumbers', JSON.stringify(updated));

    if (showOnlyBookmarked) {
      filterNumbers();
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
      localStorage.setItem('bookmarkedNumbers', JSON.stringify([]));
      if (showOnlyBookmarked) {
        setFilteredNumbers([]);
      }
    }
  };

  const speakNumber = (e, number) => {
    e.preventDefault();
    e.stopPropagation();

    if (playingAudio === number.id) {
      setPlayingAudio(null);
      window.speechSynthesis.cancel();
    } else {
      setPlayingAudio(number.id);
      const utterance = new SpeechSynthesisUtterance(number.number.toString());
      utterance.lang = 'en-US';
      utterance.rate = speechRate;
      utterance.onend = () => setPlayingAudio(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakRandom = () => {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const randomNum = numbers[randomIndex];
    const utterance = new SpeechSynthesisUtterance(randomNum.number.toString());
    utterance.lang = 'en-US';
    utterance.rate = speechRate;
    window.speechSynthesis.speak(utterance);
  };

  const handleNumberClick = (number) => {
    setSelectedNumber(number);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNumbers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNumbers.length / itemsPerPage);

  const getTypeColor = (type) => {
    switch(type) {
      case 'basic': return 'from-green-400 to-green-500';
      case 'intermediate': return 'from-blue-400 to-blue-500';
      case 'advanced': return 'from-purple-400 to-purple-500';
      default: return 'from-indigo-400 to-indigo-500';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}>
      <Helmet>
        <title>Alphabet</title>
      </Helmet>
      {/* Header */}
      <div className={`sticky top-20 z-30 backdrop-blur-md shadow-sm py-4 transition-colors duration-300 ${
        darkMode ? 'bg-gray-800/80' : 'bg-white/80'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl"
              >
                <BookOpen className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  সংখ্যা ১ - ১০০
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  ইংরেজি সংখ্যা শিখুন সহজ উপায়ে
                  {showOnlyBookmarked && (
                    <span className="ml-2 text-yellow-500">(বুকমার্ক করা)</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Speech rate control */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSpeechRate(Math.max(0.5, speechRate - 0.1))}
                  className={`px-2 py-1 rounded-l text-sm ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  -
                </button>
                <span className={`text-sm px-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  {speechRate.toFixed(1)}x
                </span>
                <button
                  onClick={() => setSpeechRate(Math.min(1.5, speechRate + 0.1))}
                  className={`px-2 py-1 rounded-r text-sm ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  +
                </button>
              </div>

              {/* Random button */}
              <button
                onClick={speakRandom}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                title="র্যান্ডম সংখ্যা শুনুন"
              >
                <Sparkles className="w-5 h-5" />
              </button>

              {/* Dark mode toggle */}
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

              {/* Search */}
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="সংখ্যা খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 w-48 transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                />
              </div>

              {/* View toggle */}
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

              {/* Filter button */}
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

          {/* Filter panel */}
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

          {/* Bookmark counter */}
          {bookmarked.length > 0 && (
            <div className={`mt-2 text-sm flex items-center gap-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <BookmarkIcon className="w-4 h-4 text-yellow-500" />
              <span>{bookmarked.length} টি সংখ্যা বুকমার্ক করা</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {filteredNumbers.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {showOnlyBookmarked ? 'কোন বুকমার্ক করা সংখ্যা নেই' : 'কোন সংখ্যা পাওয়া যায়নি'}
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {currentItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (item.id % 20) * 0.02 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800 hover:shadow-2xl' 
                    : 'bg-white hover:shadow-2xl'
                }`}
                onClick={() => handleNumberClick(item)}
              >
                <div className={`h-1 bg-gradient-to-r ${getTypeColor(item.type)}`}></div>
                <div className="p-4 text-center">
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={(e) => toggleBookmark(e, item)}
                      className={`p-1 rounded-full transition-colors ${
                        bookmarked.includes(item.id)
                          ? 'text-yellow-400'
                          : darkMode
                            ? 'text-gray-600 hover:text-gray-400'
                            : 'text-gray-300 hover:text-gray-400'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                  <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {item.number}
                  </h3>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    {item.englishWord}
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.banglaMeaning}
                  </p>
                  <button
                    onClick={(e) => speakNumber(e, item)}
                    className={`mt-3 p-1.5 rounded-full transition-colors ${
                      playingAudio === item.id
                        ? 'bg-green-500 text-white'
                        : darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-2">
            {currentItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (item.id % 20) * 0.02 }}
                className={`rounded-lg shadow-md overflow-hidden cursor-pointer transition-all ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:shadow-lg'
                }`}
                onClick={() => handleNumberClick(item)}
              >
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getTypeColor(item.type)} flex items-center justify-center text-white font-bold text-xl`}>
                      {item.number}
                    </div>
                    <div>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {item.englishWord}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.banglaMeaning}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => speakNumber(e, item)}
                      className={`p-2 rounded-full transition-colors ${
                        playingAudio === item.id
                          ? 'bg-green-500 text-white'
                          : darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => toggleBookmark(e, item)}
                      className={`p-2 rounded-full transition-colors ${
                        bookmarked.includes(item.id)
                          ? 'text-yellow-400'
                          : darkMode
                            ? 'text-gray-600 hover:text-gray-400'
                            : 'text-gray-300 hover:text-gray-400'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
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
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedNumber && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setSelectedNumber(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween' }}
              className={`w-full max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              onClick={e => e.stopPropagation()}
            >
              <div className={`sticky top-0 p-5 flex justify-between items-center border-b ${
                darkMode ? 'border-gray-700' : 'border-gray-100'
              }`}>
                <div>
                  <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedNumber.number}
                  </h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedNumber.type === 'basic' ? 'বেসিক লেভেল' : selectedNumber.type === 'intermediate' ? 'ইন্টারমিডিয়েট লেভেল' : 'অ্যাডভান্সড লেভেল'}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedNumber(null)} 
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="text-center">
                  <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${getTypeColor(selectedNumber.type)} flex items-center justify-center mb-4`}>
                    <span className="text-5xl font-bold text-white">
                      {selectedNumber.number}
                    </span>
                  </div>
                </div>

                <div>
                  <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    ইংরেজি বানান
                  </p>
                  <p className={`text-xl font-medium text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedNumber.englishWord}
                  </p>
                </div>

                <div>
                  <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    বাংলা উচ্চারণ
                  </p>
                  <p className={`text-xl text-center ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    {selectedNumber.banglaMeaning}
                  </p>
                </div>
              </div>

              <div className={`p-5 border-t flex gap-3 ${
                darkMode ? 'border-gray-700' : 'border-gray-100'
              }`}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakNumber(e, selectedNumber);
                  }}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>শুনুন</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(e, selectedNumber);
                  }}
                  className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    bookmarked.includes(selectedNumber.id)
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Star className="w-5 h-5 fill-current" />
                  <span>{bookmarked.includes(selectedNumber.id) ? 'বুকমার্ক করা' : 'বুকমার্ক করুন'}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Number;