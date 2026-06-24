import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  Repeat, 
  Sparkles,
  ArrowLeft,
  Sun,
  Moon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Alphabet = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeLetter, setActiveLetter] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // speech rate

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const speakLetter = (letter) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    setActiveLetter(letter);
    setIsPlaying(true);
    
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = 'en-US';
    utterance.rate = speed;
    utterance.pitch = 1.2;
    utterance.volume = 1;
    
    utterance.onend = () => {
      setIsPlaying(false);
      setActiveLetter(null);
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
      setActiveLetter(null);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setActiveLetter(null);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      <Helmet>
        <title>Alphabet</title>
      </Helmet>
      
      {/* Header */}
      <div className={`sticky top-20 z-30 backdrop-blur-md shadow-sm py-4 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Link to="/kid" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <ArrowLeft className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
              </Link>
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  🎵 Alphabet Sounds 🎵
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Click on any letter to hear its sound
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Speed control */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSpeed(Math.max(0.5, speed - 0.1))}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-l text-sm"
                >
                  -
                </button>
                <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  {speed.toFixed(1)}x
                </span>
                <button
                  onClick={() => setSpeed(Math.min(1.5, speed + 0.1))}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-r text-sm"
                >
                  +
                </button>
              </div>
              {/* Stop button */}
              <button
                onClick={stopSpeech}
                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                title="Stop sound"
              >
                <VolumeX className="w-4 h-4" />
              </button>
              {/* Dark mode */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-all ${darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alphabet Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
          {letters.map((letter, index) => (
            <motion.button
              key={letter}
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => speakLetter(letter)}
              className={`relative rounded-2xl p-6 text-center font-bold shadow-lg transition-all focus:outline-none ${
                activeLetter === letter
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 scale-105 ring-4 ring-yellow-300'
                  : darkMode
                    ? 'bg-gradient-to-br from-indigo-700 to-purple-700 hover:shadow-2xl'
                    : 'bg-gradient-to-br from-blue-400 to-purple-500 hover:shadow-2xl'
              }`}
            >
              <span className={`text-5xl text-white drop-shadow-md ${activeLetter === letter ? 'animate-bounce' : ''}`}>
                {letter}
              </span>
              {activeLetter === letter && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2"
                >
                  <Volume2 className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Currently playing indicator */}
        <AnimatePresence>
          {isPlaying && activeLetter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full shadow-xl px-6 py-3 flex items-center gap-3"
            >
              <Volume2 className="w-5 h-5 text-indigo-600 animate-pulse" />
              <span className="text-lg font-semibold text-gray-800 dark:text-white">
                Playing: {activeLetter}
              </span>
              <button
                onClick={stopSpeech}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Stop
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fun message */}
        <div className="text-center mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
          >
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Click any letter to hear its sound!
            </span>
            <Repeat className="w-4 h-4 text-blue-500" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Alphabet;