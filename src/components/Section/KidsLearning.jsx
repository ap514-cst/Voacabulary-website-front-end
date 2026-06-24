import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Sparkles, 
  Trophy, 
  ChevronRight, 
  Star,
  Clock,
  Award,
  ArrowRight,
  Heart,
  Brain,
  BookMarked,
  GraduationCap
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const KidsLearning = () => {
  const [darkMode, setDarkMode] = useState(false);

  const modules = [
    {
      id: 'Alfavate',
      title: 'A_Z',
      description: 'Read the letter',
      icon: BookOpen,
      color: 'from-blue-400 to-blue-600',
      bg: 'bg-blue-50',
      path: '/alp',
      badge: '5+ Stories'
    },
    {
      id: 'quiz',
      title: 'Quiz',
      description: 'Test your knowledge with interactive quizzes',
      icon: Brain,
      color: 'from-green-400 to-green-600',
      bg: 'bg-green-50',
      path: '/quiz',
      badge: '10+ Quizzes'
    },
    {
      id: 'number',
      title: 'Number(1-100)',
      description: 'Expand your vocabulary with themed word banks',
      icon: BookMarked,
      color: 'from-purple-400 to-purple-600',
      bg: 'bg-purple-50',
      path: '/number',
      badge: 'New'
    },
    {
      id: 'Stories',
      title: 'Stories',
      description: 'Master 100 essential words for A2 level',
      icon: Award,
      color: 'from-orange-400 to-orange-600',
      bg: 'bg-orange-50',
      path: '/stories',
      badge: '1-10 words'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'}`}>
      <Helmet>
          <title>Kids Learning</title>
        
      </Helmet>
      {/* Hero Section */}
      <div className={`sticky top-20 z-30 backdrop-blur-md shadow-sm py-6 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg"
              >
                <GraduationCap className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Kids section
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Kids can be learing new thinds
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-yellow-100 text-yellow-700'}`}>
                A2 Level
              </span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-all ${darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 mb-8 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-indigo-100 to-purple-100'}`}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                A2 1-100 Words
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your journey to 100 essential words
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-indigo-600'}`}>24</div>
                <div className="text-xs text-gray-500">Words learned</div>
              </div>
              <div className="w-32 h-2 bg-gray-300 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '24%' }}></div>
              </div>
              <Link to="/a2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium flex items-center gap-1"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                darkMode ? 'bg-gray-800 hover:shadow-2xl' : 'bg-white hover:shadow-2xl'
              }`}
            >
              <div className={`h-2 bg-gradient-to-r ${module.color}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${module.bg} ${darkMode ? 'bg-gray-700' : ''}`}>
                    <module.icon className={`w-8 h-8 text-${module.color.split('-')[2]}-600`} />
                  </div>
                  {module.badge && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                      {module.badge}
                    </span>
                  )}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {module.title}
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {module.description}
                </p>
                <Link to={module.path}>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-1 text-indigo-600 font-medium cursor-pointer"
                  >
                    Explore <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Section */}
        <div className="mt-12">
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Coming Soon
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className={`rounded-xl p-4 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Listening Practice</p>
            </div>
            <div className={`rounded-xl p-4 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Daily Challenge</p>
            </div>
            <div className={`rounded-xl p-4 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <Trophy className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Achievements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsLearning;