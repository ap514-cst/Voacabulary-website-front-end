// src/components/Grammar.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Sun,
  Moon,
  Grid,
  List,
  Award,
  TrendingUp,
  Zap,
  Brain
} from 'lucide-react';

const Grammar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [expandedTense, setExpandedTense] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Complete Tense Data
  const tenses = [
    {
      id: 'present-simple',
      name: 'Present Simple',
      bangla: 'বর্তমান সাধারণ কাল',
      category: 'present',
      structure: 'Subject + Verb (s/es) + Object',
      rules: [
        'দৈনন্দিন কাজ বা অভ্যাস বোঝাতে',
        'সর্বজনীন সত্য বোঝাতে',
        'নির্ধারিত সময়সূচী বোঝাতে'
      ],
      examples: [
        { english: 'I eat rice every day.', bangla: 'আমি প্রতিদিন ভাত খাই।' },
        { english: 'The sun rises in the east.', bangla: 'সূর্য পূর্ব দিকে উদিত হয়।' },
        { english: 'She goes to school daily.', bangla: 'সে প্রতিদিন স্কুলে যায়।' }
      ],
      signalWords: ['always', 'usually', 'often', 'sometimes', 'never', 'every day', 'daily'],
      usage: 'অভ্যাস, সাধারণ সত্য, নিয়মিত কাজ',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'present-continuous',
      name: 'Present Continuous',
      bangla: 'বর্তমান চলমান কাল',
      category: 'present',
      structure: 'Subject + am/is/are + Verb(ing) + Object',
      rules: [
        'এখন চলছে এমন কাজ বোঝাতে',
        'বর্তমানে চলমান পরিস্থিতি বোঝাতে',
        'ভবিষ্যতের পরিকল্পনা বোঝাতে'
      ],
      examples: [
        { english: 'I am reading a book now.', bangla: 'আমি এখন একটি বই পড়ছি।' },
        { english: 'She is cooking dinner.', bangla: 'সে রাতের খাবার রান্না করছে।' },
        { english: 'They are playing football.', bangla: 'তারা ফুটবল খেলছে।' }
      ],
      signalWords: ['now', 'right now', 'at the moment', 'currently', 'today'],
      usage: 'চলমান কাজ, বর্তমান পরিস্থিতি, ভবিষ্যত পরিকল্পনা',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'present-perfect',
      name: 'Present Perfect',
      bangla: 'বর্তমান পূর্ণ কাল',
      category: 'present',
      structure: 'Subject + have/has + V3 (Past Participle) + Object',
      rules: [
        'অতীতের কাজের বর্তমান ফলাফল বোঝাতে',
        'অভিজ্ঞতা বোঝাতে',
        'অসম্পূর্ণ সময়ের কাজ বোঝাতে'
      ],
      examples: [
        { english: 'I have finished my homework.', bangla: 'আমি আমার হোমওয়ার্ক শেষ করেছি।' },
        { english: 'She has visited London.', bangla: 'সে লন্ডন ভ্রমণ করেছে।' },
        { english: 'They have lived here for 5 years.', bangla: 'তারা ৫ বছর ধরে এখানে বসবাস করছে।' }
      ],
      signalWords: ['already', 'yet', 'just', 'ever', 'never', 'for', 'since', 'recently'],
      usage: 'অতীতের কাজের বর্তমান প্রভাব, অভিজ্ঞতা, অসম্পূর্ণ সময়',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 'present-perfect-continuous',
      name: 'Present Perfect Continuous',
      bangla: 'বর্তমান পূর্ণ চলমান কাল',
      category: 'present',
      structure: 'Subject + have/has been + Verb(ing) + Object + for/since + time',
      rules: [
        'অতীতে শুরু হয়ে এখনও চলছে এমন কাজ',
        'সময়ের সাথে কাজের জোর দিতে',
        'কাজের স্থায়িত্ব বোঝাতে'
      ],
      examples: [
        { english: 'I have been studying for 3 hours.', bangla: 'আমি ৩ ঘন্টা ধরে পড়াশোনা করছি।' },
        { english: 'She has been working since morning.', bangla: 'সে সকাল থেকে কাজ করছে।' },
        { english: 'They have been waiting for you.', bangla: 'তারা তোমার জন্য অপেক্ষা করছে।' }
      ],
      signalWords: ['for', 'since', 'all day', 'whole week', 'recently'],
      usage: 'অতীতে শুরু হয়ে এখনও চলমান কাজ',
      color: 'from-pink-400 to-pink-600'
    },
    {
      id: 'past-simple',
      name: 'Past Simple',
      bangla: 'অতীত সাধারণ কাল',
      category: 'past',
      structure: 'Subject + V2 (Past Form) + Object',
      rules: [
        'অতীতের সম্পূর্ণ কাজ বোঝাতে',
        'অতীতের অভ্যাস বোঝাতে',
        'অতীতের ঘটনা বর্ণনা করতে'
      ],
      examples: [
        { english: 'I went to school yesterday.', bangla: 'আমি গতকাল স্কুলে গিয়েছিলাম।' },
        { english: 'She ate an apple.', bangla: 'সে একটি আপেল খেয়েছিল।' },
        { english: 'They played cricket last week.', bangla: 'তারা গত সপ্তাহে ক্রিকেট খেলেছিল।' }
      ],
      signalWords: ['yesterday', 'last week', 'last month', 'ago', 'in 2020', 'then'],
      usage: 'অতীতের সম্পূর্ণ কাজ, অতীতের অভ্যাস',
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 'past-continuous',
      name: 'Past Continuous',
      bangla: 'অতীত চলমান কাল',
      category: 'past',
      structure: 'Subject + was/were + Verb(ing) + Object',
      rules: [
        'অতীতের নির্দিষ্ট সময়ে চলমান কাজ',
        'অতীতের দুইটি চলমান কাজ',
        'অতীতের একটি কাজ বাধাগ্রস্ত হওয়া'
      ],
      examples: [
        { english: 'I was watching TV at 8 PM.', bangla: 'আমি রাত ৮টায় টিভি দেখছিলাম।' },
        { english: 'She was sleeping when I called.', bangla: 'আমি ফোন করলে সে ঘুমাচ্ছিল।' },
        { english: 'They were playing in the garden.', bangla: 'তারা বাগানে খেলছিল।' }
      ],
      signalWords: ['at that time', 'while', 'when', 'as', 'at 8 PM'],
      usage: 'অতীতের নির্দিষ্ট সময়ে চলমান কাজ',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 'past-perfect',
      name: 'Past Perfect',
      bangla: 'অতীত পূর্ণ কাল',
      category: 'past',
      structure: 'Subject + had + V3 (Past Participle) + Object',
      rules: [
        'অতীতের আগে ঘটে যাওয়া কাজ',
        'অতীতের দুইটি কাজের ক্রম',
        'অতীতের কোনো কাজের ফলাফল'
      ],
      examples: [
        { english: 'I had finished dinner before they came.', bangla: 'তারা আসার আগেই আমি ডিনার শেষ করেছিলাম।' },
        { english: 'She had left when I arrived.', bangla: 'আমি পৌঁছানোর আগেই সে চলে গিয়েছিল।' },
        { english: 'They had completed the project.', bangla: 'তারা প্রকল্পটি শেষ করেছিল।' }
      ],
      signalWords: ['before', 'after', 'already', 'just', 'until', 'by the time'],
      usage: 'অতীতের আগে ঘটে যাওয়া কাজ',
      color: 'from-red-400 to-red-600'
    },
    {
      id: 'past-perfect-continuous',
      name: 'Past Perfect Continuous',
      bangla: 'অতীত পূর্ণ চলমান কাল',
      category: 'past',
      structure: 'Subject + had been + Verb(ing) + Object + for/since + time',
      rules: [
        'অতীতের আগে চলমান কাজ',
        'অতীতের কোনো কাজের স্থায়িত্ব',
        'অতীতের কোনো কাজের কারণ'
      ],
      examples: [
        { english: 'I had been studying for 3 hours before he came.', bangla: 'সে আসার আগে আমি ৩ ঘন্টা পড়াশোনা করছিলাম।' },
        { english: 'She had been working there since 2010.', bangla: 'সে ২০১০ সাল থেকে সেখানে কাজ করছিল।' }
      ],
      signalWords: ['for', 'since', 'before', 'until'],
      usage: 'অতীতের আগে চলমান কাজ',
      color: 'from-teal-400 to-teal-600'
    },
    {
      id: 'future-simple',
      name: 'Future Simple',
      bangla: 'ভবিষ্যত সাধারণ কাল',
      category: 'future',
      structure: 'Subject + will/shall + Verb(base) + Object',
      rules: [
        'ভবিষ্যতের কাজ বা ঘটনা',
        'তৎক্ষণাৎ সিদ্ধান্ত',
        'প্রতিশ্রুতি বা অফার'
      ],
      examples: [
        { english: 'I will go to Dhaka tomorrow.', bangla: 'আমি আগামীকাল ঢাকায় যাব।' },
        { english: 'She will help you.', bangla: 'সে তোমাকে সাহায্য করবে।' },
        { english: 'They will come to the party.', bangla: 'তারা পার্টিতে আসবে।' }
      ],
      signalWords: ['tomorrow', 'next week', 'next month', 'soon', 'in the future'],
      usage: 'ভবিষ্যতের কাজ, প্রতিশ্রুতি, তৎক্ষণাৎ সিদ্ধান্ত',
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      id: 'future-continuous',
      name: 'Future Continuous',
      bangla: 'ভবিষ্যত চলমান কাল',
      category: 'future',
      structure: 'Subject + will be + Verb(ing) + Object',
      rules: [
        'ভবিষ্যতের নির্দিষ্ট সময়ে চলমান কাজ',
        'ভবিষ্যতের পরিকল্পিত কাজ',
        'ভবিষ্যতের স্বাভাবিক ঘটনা'
      ],
      examples: [
        { english: 'I will be watching TV at 9 PM.', bangla: 'আমি রাত ৯টায় টিভি দেখতে থাকব।' },
        { english: 'She will be working tomorrow.', bangla: 'সে আগামীকাল কাজ করতে থাকবে।' }
      ],
      signalWords: ['at that time', 'this time tomorrow', 'at 9 PM'],
      usage: 'ভবিষ্যতের নির্দিষ্ট সময়ে চলমান কাজ',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      id: 'future-perfect',
      name: 'Future Perfect',
      bangla: 'ভবিষ্যত পূর্ণ কাল',
      category: 'future',
      structure: 'Subject + will have + V3 (Past Participle) + Object',
      rules: [
        'ভবিষ্যতের কোনো নির্দিষ্ট সময়ের আগে শেষ হওয়া কাজ',
        'ভবিষ্যতের কোনো কাজের ফলাফল'
      ],
      examples: [
        { english: 'I will have finished the work by 6 PM.', bangla: 'আমি সন্ধ্যা ৬টার মধ্যে কাজটি শেষ করব।' },
        { english: 'She will have left before you arrive.', bangla: 'তুমি আসার আগেই সে চলে যাবে।' }
      ],
      signalWords: ['by', 'by the time', 'before', 'until'],
      usage: 'ভবিষ্যতের নির্দিষ্ট সময়ের আগে শেষ হওয়া কাজ',
      color: 'from-violet-400 to-violet-600'
    },
    {
      id: 'future-perfect-continuous',
      name: 'Future Perfect Continuous',
      bangla: 'ভবিষ্যত পূর্ণ চলমান কাল',
      category: 'future',
      structure: 'Subject + will have been + Verb(ing) + Object + for/since + time',
      rules: [
        'ভবিষ্যতের কোনো সময়ে চলমান কাজের স্থায়িত্ব',
        'ভবিষ্যতের নির্দিষ্ট সময় পর্যন্ত চলমান কাজ'
      ],
      examples: [
        { english: 'By next year, I will have been studying for 5 years.', bangla: 'আগামী বছর পর্যন্ত আমি ৫ বছর পড়াশোনা করছি।' },
        { english: 'She will have been working here for 10 years by 2025.', bangla: '২০২৫ সালের মধ্যে সে এখানে ১০ বছর কাজ করছে।' }
      ],
      signalWords: ['for', 'since', 'by', 'by the time'],
      usage: 'ভবিষ্যতের নির্দিষ্ট সময় পর্যন্ত চলমান কাজ',
      color: 'from-rose-400 to-rose-600'
    }
  ];

  // Filter tenses
  const filteredTenses = tenses.filter(tense => {
    const matchesSearch = 
      tense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tense.bangla.includes(searchTerm) ||
      tense.usage.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || tense.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'সব', icon: BookOpen },
    { id: 'present', name: 'বর্তমান', icon: Clock },
    { id: 'past', name: 'অতীত', icon: Calendar },
    { id: 'future', name: 'ভবিষ্যত', icon: TrendingUp }
  ];

  const toggleTense = (id) => {
    setExpandedTense(expandedTense === id ? null : id);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-indigo-50 via-white to-white'}`}>
      <Helmet>
        <title>ইংরেজি গ্রামার - টেন্সেস - ভোকাবুলারি</title>
        <meta name="description" content="ইংরেজি গ্রামারের সব টেন্সেস বাংলায় উদাহরণ সহ শিখুন। Present, Past, Future Tenses এর সম্পূর্ণ গাইড।" />
      </Helmet>

      {/* Header */}
      <div className={`sticky top-20 z-30 backdrop-blur-md shadow-sm py-4 transition-colors duration-300 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg"
              >
                <Brain className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  ইংরেজি গ্রামার
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  সহজে শিখুন সব টেন্সেস
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Search */}
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="টেন্সেস খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                />
              </div>

              {/* Dark mode */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-yellow-400'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white'
                    : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {filteredTenses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>কোন টেন্সেস পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTenses.map((tense) => (
              <motion.div
                key={tense.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl shadow-lg overflow-hidden border transition-all ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 hover:shadow-2xl' 
                    : 'bg-white border-gray-100 hover:shadow-2xl'
                }`}
              >
                {/* Tense Header - Clickable */}
                <button
                  onClick={() => toggleTense(tense.id)}
                  className="w-full text-left"
                >
                  <div className={`p-5 bg-gradient-to-r ${tense.color} text-white`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">{tense.name}</h2>
                          <p className="text-sm opacity-90">{tense.bangla}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                          {tense.category === 'present' ? 'বর্তমান' : tense.category === 'past' ? 'অতীত' : 'ভবিষ্যত'}
                        </span>
                        {expandedTense === tense.id ? (
                          <ChevronUp className="w-6 h-6" />
                        ) : (
                          <ChevronDown className="w-6 h-6" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Tense Details - Expandable */}
                <AnimatePresence>
                  {expandedTense === tense.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 space-y-6">
                        {/* Structure */}
                        <div>
                          <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            📝 গঠন প্রণালী
                          </h3>
                          <div className={`p-4 rounded-lg font-mono text-lg ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-indigo-50 text-gray-800'}`}>
                            {tense.structure}
                          </div>
                        </div>

                        {/* Rules */}
                        <div>
                          <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            📋 ব্যবহারের নিয়ম
                          </h3>
                          <ul className="space-y-1">
                            {tense.rules.map((rule, idx) => (
                              <li key={idx} className={`flex items-start gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                {rule}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Examples */}
                        <div>
                          <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            📖 উদাহরণ
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {tense.examples.map((ex, idx) => (
                              <div key={idx} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{ex.english}</p>
                                <p className={`text-sm ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{ex.bangla}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Signal Words */}
                        <div>
                          <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            🏷️ নির্দেশক শব্দ
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {tense.signalWords.map((word, idx) => (
                              <span
                                key={idx}
                                className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-indigo-100 text-indigo-700'}`}
                              >
                                {word}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Usage */}
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-indigo-50 to-purple-50'}`}>
                          <h3 className={`font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>🎯 ব্যবহার</h3>
                          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{tense.usage}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Grammar;