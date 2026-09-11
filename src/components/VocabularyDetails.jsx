// src/components/VocabularyDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from './SEO';
import { 
  Volume2, Star, ChevronLeft, BookOpen, 
  Award, TrendingUp, CheckCircle, X, Bookmark,
  Share2, ArrowLeft, Home, Moon, Sun, Play
} from 'lucide-react';

// ✅ Import central API config
import API_ENDPOINTS from './config/api';

const VocabularyDetails = () => {
  const { id } = useParams();
  const [word, setWord] = useState(null);
  const [relatedWords, setRelatedWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load bookmarks and dark mode from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedWords');
    if (savedBookmarks) {
      const bookmarks = JSON.parse(savedBookmarks);
      setBookmarked(bookmarks.includes(id));
    }
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, [id]);

  useEffect(() => {
    fetchWordDetails();
    fetchRelatedWords();
  }, [id]);

  // ✅ UPDATED: Using API_ENDPOINTS.wordDetails
  const fetchWordDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.wordDetails(id));
      if (!response.ok) throw new Error('Word not found');
      const data = await response.json();
      setWord(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ NEW: Fetch related words
  const fetchRelatedWords = async () => {
    try {
      setRelatedLoading(true);
      const response = await fetch(API_ENDPOINTS.vocGet);
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      
      // Filter out current word, take 6 random ones
      const filtered = data
        .filter(w => w._id !== id && w.id !== id)
        .slice(0, 6);
      setRelatedWords(filtered);
    } catch (err) {
      console.error('Related words error:', err);
    } finally {
      setRelatedLoading(false);
    }
  };

  const speakWord = (text) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const playAudio = () => {
    if (word.audio) {
      const audio = new Audio(API_ENDPOINTS.audio(word.audio));
      audio.play();
    } else {
      speakWord(word.englishWord);
    }
  };

  const toggleBookmark = () => {
    const savedBookmarks = localStorage.getItem('bookmarkedWords');
    let bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];
    
    if (bookmarked) {
      bookmarks = bookmarks.filter(b => b !== id);
    } else {
      bookmarks.push(id);
    }
    
    localStorage.setItem('bookmarkedWords', JSON.stringify(bookmarks));
    setBookmarked(!bookmarked);
  };

  const shareWord = async () => {
    const shareData = {
      title: `${word.englishWord} - LearnixDB`,
      text: `Learn the meaning of "${word.englishWord}" (${word.banglaMeaning})`,
      url: window.location.href,
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('লিংক কপি করা হয়েছে!');
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error || !word) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
        <div className="text-center max-w-md p-8">
          <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-gray-800">শব্দটি পাওয়া যায়নি</h1>
          <p className="text-gray-600 mb-4">এই শব্দটি ডাটাবেসে নেই বা সরিয়ে ফেলা হয়েছে।</p>
          <Link 
            to="/voc" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            ভোকাবুলারি লিস্টে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  // Dynamic SEO Content
  const seoTitle = `${word.englishWord} Meaning in Bangla - ${word.banglaMeaning}`;
  const seoDescription = `Learn the meaning of "${word.englishWord}" in Bangla (${word.banglaMeaning}). Pronunciation, examples, and usage of ${word.englishWord} in English sentences. ${word.explanation ? word.explanation.substring(0, 100) : ''}`;
  const seoKeywords = `${word.englishWord}, ${word.englishWord} meaning, ${word.englishWord} bangla meaning, ${word.englishWord} meaning in bangla, ${word.banglaMeaning}, English vocabulary, word meaning, শব্দের অর্থ`;

  // Structured Data for the Word
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: word.englishWord,
    description: word.explanation || `${word.englishWord} means ${word.banglaMeaning} in Bangla`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'English-Bangla Vocabulary',
      url: 'https://learnixdb.netlify.app/voc',
    },
    alternateName: word.banglaMeaning,
    url: `https://learnixdb.netlify.app/vocabulary/${id}`,
  };

  // Breadcrumbs
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Vocabulary', url: '/voc' },
    { name: word.englishWord, url: `/vocabulary/${id}` },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-indigo-50 to-white'}`}>
      
      {/* ✅ Dynamic SEO */}
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl={`/vocabulary/${id}`}
        ogType="article"
        structuredData={structuredData}
        breadcrumbs={breadcrumbs}
        language="bn"
      />

      {/* Dark Mode Toggle - Fixed */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-24 right-4 z-40 p-3 rounded-full shadow-lg transition-all ${
          darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-yellow-400'
        }`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        
        {/* Breadcrumb Navigation (visible) */}
        <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500 dark:text-gray-400 flex-wrap" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-indigo-600 flex items-center gap-1">
            <Home className="w-3 h-3" />
            হোম
          </Link>
          <span>/</span>
          <Link to="/voc" className="hover:text-indigo-600">ভোকাবুলারি</Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-gray-300 font-medium">{word.englishWord}</span>
        </nav>

        {/* Word Card */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl shadow-xl p-6 md:p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          {/* Action Buttons Row */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-full transition ${
                bookmarked 
                  ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400' 
                  : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200'
              }`}
              aria-label="Bookmark"
            >
              <Star className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={shareWord}
              className="p-2 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 transition"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Word Header */}
          <header className="flex items-start justify-between mb-6 gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 break-words">
                {word.englishWord}
              </h1>
              {word.pronunciation && (
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  {word.pronunciation}
                </p>
              )}
            </div>
            <button
              onClick={playAudio}
              className={`p-3 rounded-full transition flex-shrink-0 ${
                isPlaying
                  ? 'bg-green-500 text-white'
                  : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200'
              }`}
              aria-label="Listen pronunciation"
            >
              {isPlaying ? <Volume2 className="w-6 h-6 animate-pulse" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </header>

          {/* Bangla Meaning */}
          <section className="mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">বাংলা অর্থ</p>
            <p className="text-2xl text-indigo-600 dark:text-indigo-400 font-semibold break-words">
              {word.banglaMeaning}
            </p>
          </section>

          {/* Explanation */}
          {word.explanation && (
            <section className="mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">ব্যাখ্যা</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {word.explanation}
              </p>
            </section>
          )}

          {/* Example */}
          {word.example && (
            <section className="mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">উদাহরণ</p>
              <p className="italic text-gray-600 dark:text-gray-400">"{word.example}"</p>
            </section>
          )}

          {/* Audio Player (if audio file exists) */}
          {word.audio && (
            <section className="mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">অডিও উচ্চারণ</p>
              <audio controls className="w-full">
                <source src={API_ENDPOINTS.audio(word.audio)} type="audio/mpeg" />
              </audio>
            </section>
          )}

          {/* Level Badge */}
          {word.level && (
            <section className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                {word.level}
              </span>
            </section>
          )}
        </motion.article>

        {/* Related Words */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            সম্পর্কিত শব্দ
          </h2>
          
          {relatedLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : relatedWords.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {relatedWords.map((relWord) => (
                <Link
                  key={relWord._id || relWord.id}
                  to={`/vocabulary/${relWord._id || relWord.id}`}
                  className={`p-4 rounded-xl shadow-md hover:shadow-lg transition-all ${
                    darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <h3 className="font-bold text-gray-800 dark:text-white truncate">
                    {relWord.englishWord}
                  </h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 truncate">
                    {relWord.banglaMeaning}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              কোনো সম্পর্কিত শব্দ পাওয়া যায়নি।
            </p>
          )}
        </section>

        {/* Back to Vocabulary */}
        <div className="mt-8 text-center">
          <Link
            to="/voc"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            সব শব্দ দেখুন
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VocabularyDetails;