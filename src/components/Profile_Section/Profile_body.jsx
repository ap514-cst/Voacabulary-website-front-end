// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  BookOpen,
  Star,
  Award,
  TrendingUp,
  Clock,
  Settings,
  LogOut,
  Edit2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Bookmark,
  Heart,
  Target,
  Zap,
  Users,
  Globe,
  MessageCircle,
  Share2,
  Copy,
  Camera,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('bookmarks');
  const [bookmarkedWords, setBookmarkedWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: ''
  });

  // Load bookmarks from localStorage
  useEffect(() => {
    loadBookmarks();
    loadDarkModePreference();
    if (user) {
      setEditData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || 'আমি ইংরেজি শিখতে ভালোবাসি 📚',
        location: user.location || 'ঢাকা, বাংলাদেশ'
      });
    }
  }, [user]);

  const loadBookmarks = () => {
    setLoading(true);
    const saved = localStorage.getItem('bookmarkedWords');
    if (saved) {
      // Simulate fetching word details from API
      // In real app, you'd fetch from your backend
      const bookmarkedIds = JSON.parse(saved);
      // For demo, create dummy data
      const dummyWords = bookmarkedIds.map((id, index) => ({
        id: id,
        englishWord: ['Apple', 'Beautiful', 'Accommodate', 'Dangerous', 'Environment'][index % 5],
        banglaMeaning: ['আপেল', 'সুন্দর', 'স্থান দেওয়া', 'বিপজ্জনক', 'পরিবেশ'][index % 5],
        level: ['basic', 'intermediate', 'advanced', 'basic', 'intermediate'][index % 5],
        category: ['ফল', 'বিশেষণ', 'ক্রিয়া', 'বিশেষণ', 'বিশেষ্য'][index % 5]
      }));
      setBookmarkedWords(dummyWords);
    }
    setLoading(false);
  };

  const loadDarkModePreference = () => {
    const saved = localStorage.getItem('profileDarkMode');
    if (saved) {
      setDarkMode(JSON.parse(saved));
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('profileDarkMode', JSON.stringify(newMode));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      handleSaveChanges();
    }
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setIsEditing(false);
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCopyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('প্রোফাইল লিংক কপি করা হয়েছে!');
  };

  // Statistics
  const stats = [
    { icon: BookOpen, value: bookmarkedWords.length, label: 'বুকমার্ক করা শব্দ', color: 'text-blue-500' },
    { icon: Award, value: '১২', label: 'কুইজ শেষ', color: 'text-yellow-500' },
    { icon: TrendingUp, value: '৮৫%', label: 'সঠিক উত্তর', color: 'text-green-500' },
    { icon: Clock, value: '১৫ ঘন্টা', label: 'শেখার সময়', color: 'text-purple-500' }
  ];

  // Activity data
  const activities = [
    { icon: BookOpen, text: 'বেসিক লেভেলে ৫টি নতুন শব্দ শিখেছেন', time: '২ ঘন্টা আগে', color: 'text-green-500' },
    { icon: Award, text: 'কুইজে ৮০% স্কোর করেছেন', time: '৫ ঘন্টা আগে', color: 'text-yellow-500' },
    { icon: Star, text: 'ইন্টারমিডিয়েট লেভেলে পৌঁছেছেন', time: 'গতকাল', color: 'text-blue-500' },
    { icon: Heart, text: '১০টি শব্দ বুকমার্ক করেছেন', time: '২ দিন আগে', color: 'text-pink-500' }
  ];

  // Get level badge
  const getLevelBadge = (level) => {
    const levels = {
      basic: { color: 'bg-green-100 text-green-700', label: 'বেসিক' },
      intermediate: { color: 'bg-blue-100 text-blue-700', label: 'ইন্টারমিডিয়েট' },
      advanced: { color: 'bg-purple-100 text-purple-700', label: 'অ্যাডভান্সড' }
    };
    return levels[level] || levels.basic;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-indigo-50 via-white to-white'}`}>
      <Helmet>
        <title>প্রোফাইল - ভোকাবুলারি</title>
        <meta name="description" content="আপনার প্রোফাইল, বুকমার্ক করা শব্দ এবং অগ্রগতি দেখুন" />
      </Helmet>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-50 border border-green-200 rounded-xl px-6 py-3 flex items-center gap-3 shadow-lg"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-700 font-medium">প্রোফাইল আপডেট হয়েছে!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className={`rounded-2xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {/* Cover Photo */}
              <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                <button className="absolute bottom-2 right-2 p-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              {/* Profile Photo */}
              <div className="relative px-6">
                <div className="relative -mt-12 mb-4">
                  <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <button className="absolute bottom-1 right-1 p-1.5 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition shadow-lg">
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                {isEditing ? (
                  <div className="space-y-3 mb-4">
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="আপনার নাম"
                    />
                    <input
                      type="text"
                      name="bio"
                      value={editData.bio}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="আপনার সম্পর্কে"
                    />
                    <input
                      type="text"
                      name="location"
                      value={editData.location}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="আপনার অবস্থান"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {user.name || 'User'}
                    </h2>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {editData.bio}
                    </p>
                    <div className={`flex items-center gap-2 text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <MapPin className="w-4 h-4" />
                      <span>{editData.location}</span>
                    </div>
                  </>
                )}

                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    অ্যাকটিভ
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    লেভেল: ইন্টারমিডিয়েট
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2">
                <button
                  onClick={handleEditToggle}
                  className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition ${
                    isEditing
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                  {isEditing ? 'সংরক্ষণ' : 'এডিট করুন'}
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  লগআউট
                </button>
              </div>
            </div>

            {/* Stats Summary */}
            <div className={`mt-4 rounded-2xl shadow-lg p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-2">
                    <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                    <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {stat.value}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`rounded-2xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {[
                  { id: 'bookmarks', label: 'বুকমার্ক', icon: Star },
                  { id: 'activity', label: 'অ্যাকটিভিটি', icon: Clock },
                  { id: 'achievements', label: 'অর্জন', icon: Award }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                      activeTab === tab.id
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : darkMode
                          ? 'text-gray-400 hover:text-gray-200'
                          : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Bookmarks Tab */}
                {activeTab === 'bookmarks' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        বুকমার্ক করা শব্দ ({bookmarkedWords.length})
                      </h3>
                      {bookmarkedWords.length > 0 && (
                        <button className="text-sm text-red-500 hover:text-red-600 transition">
                          সব মুছুন
                        </button>
                      )}
                    </div>

                    {loading ? (
                      <div className="text-center py-8">
                        <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">লোড হচ্ছে...</p>
                      </div>
                    ) : bookmarkedWords.length > 0 ? (
                      <div className="space-y-3">
                        {bookmarkedWords.map((word, index) => {
                          const levelBadge = getLevelBadge(word.level);
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className={`flex items-center justify-between p-4 rounded-xl border ${
                                darkMode
                                  ? 'border-gray-700 hover:bg-gray-700'
                                  : 'border-gray-100 hover:bg-gray-50'
                              } transition cursor-pointer`}
                              onClick={() => navigate(`/vocabulary/${word.id}`)}
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                    {word.englishWord}
                                  </h4>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${levelBadge.color}`}>
                                    {levelBadge.label}
                                  </span>
                                </div>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {word.banglaMeaning}
                                </p>
                                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                  {word.category}
                                </p>
                              </div>
                              <button className="p-2 text-gray-400 hover:text-red-500 transition">
                                <X className="w-4 h-4" />
                              </button>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Bookmark className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          এখনো কোনো শব্দ বুকমার্ক করেননি
                        </p>
                        <button
                          onClick={() => navigate('/vocabulary')}
                          className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition"
                        >
                          শব্দ ব্রাউজ করুন
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                  <div>
                    <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      সাম্প্রতিক কার্যকলাপ
                    </h3>
                    <div className="space-y-4">
                      {activities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex items-start gap-3 p-3 rounded-xl ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                          } transition`}
                        >
                          <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                            <activity.icon className={`w-5 h-5 ${activity.color}`} />
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {activity.text}
                            </p>
                            <p className="text-xs text-gray-400">{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements Tab */}
                {activeTab === 'achievements' && (
                  <div>
                    <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      অর্জন সমূহ
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { icon: Star, title: 'প্রথম বুকমার্ক', desc: 'প্রথম শব্দ বুকমার্ক করুন', unlocked: true },
                        { icon: Award, title: 'কুইজ মাস্টার', desc: '১০টি কুইজ শেষ করুন', unlocked: false },
                        { icon: TrendingUp, title: 'শিখার যাত্রা', desc: '৫০টি শব্দ শিখুন', unlocked: true },
                        { icon: Heart, title: 'নিয়মিত শিক্ষার্থী', desc: '৭ দিন ধরে শিখুন', unlocked: false },
                        { icon: Zap, title: 'দ্রুত শিক্ষার্থী', desc: 'একদিনে ২০টি শব্দ শিখুন', unlocked: true },
                        { icon: Target, title: 'লেভেল আপ', desc: 'ইন্টারমিডিয়েট লেভেলে পৌঁছান', unlocked: true }
                      ].map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`p-4 rounded-xl text-center ${
                            achievement.unlocked
                              ? darkMode
                                ? 'bg-gray-700 border border-gray-600'
                                : 'bg-indigo-50'
                              : darkMode
                                ? 'bg-gray-800 opacity-50'
                                : 'bg-gray-100 opacity-50'
                          }`}
                        >
                          <achievement.icon className={`w-8 h-8 mx-auto mb-2 ${
                            achievement.unlocked ? 'text-yellow-500' : 'text-gray-400'
                          }`} />
                          <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {achievement.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{achievement.desc}</p>
                          {achievement.unlocked && (
                            <span className="inline-block mt-2 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                              আনলক হয়েছে
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;