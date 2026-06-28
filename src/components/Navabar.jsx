import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  BookOpen,
  LogIn,
  UserPlus,
  List,
  Home,
  User,
  Bell,
  LogOut,
  ChevronDown,
  TrendingUp,
  Award,
  Sun,
  Moon,
  LayoutDashboard,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from "./AuthContext/AuthContext";
import { useNotifications } from './context/Notificationcontext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [startDropdownOpen, setStartDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, clearAll } = useNotifications();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // নেভিগেশন আইটেম
  const navItems = [
    { name: 'হোম', path: '/', icon: Home },
    {
      name: 'শুরু করুন',
      icon: BookOpen,
      dropdown: true,
      guard: true,
      items: [
        { name: 'বেসিক', path: '/basic', icon: BookOpen, color: 'green', guard: true },
        { name: 'ইন্টারমিডিয়েট', path: '/inter', icon: TrendingUp, color: 'blue', guard: true },
        { name: 'অ্যাডভান্সড', path: '/advanced', icon: Award, color: 'purple', guard: true }
      ]
    },
    { name: 'ভোকাবুলারি লিস্ট', path: '/voc', icon: List, guard: true },
  ];

  const isActivePath = (path) => location.pathname === path;
  const isLevelPath = () => location.pathname.includes('/level/') ||
    ['/basic', '/inter', '/advanced'].includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserDropdownOpen(false);
    setIsOpen(false);
    setShowNotifications(false);
  };

  const getUserInitial = () => {
    return user?.name?.charAt(0).toUpperCase() || 'U';
  };

  const closeAllDropdowns = () => {
    setStartDropdownOpen(false);
    setUserDropdownOpen(false);
    setShowNotifications(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      basic: 'bg-green-100 text-green-700 border-green-200',
      intermediate: 'bg-blue-100 text-blue-700 border-blue-200',
      advanced: 'bg-purple-100 text-purple-700 border-purple-200',
      kids: 'bg-pink-100 text-pink-700 border-pink-200',
      auxiliary: 'bg-orange-100 text-orange-700 border-orange-200',
      irregular: 'bg-red-100 text-red-700 border-red-200',
      a1: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      a2: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      b1: 'bg-indigo-100 text-indigo-700 border-indigo-200'
    };
    return colors[category?.toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'basic': return <BookOpen className="w-3 h-3" />;
      case 'intermediate': return <TrendingUp className="w-3 h-3" />;
      case 'advanced': return <Award className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'এখনই';
    if (minutes < 60) return `${minutes} মিনিট আগে`;
    if (hours < 24) return `${hours} ঘন্টা আগে`;
    return `${days} দিন আগে`;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-sm py-4'
          }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* লোগো */}
            <Link to="/" className="flex items-center gap-3 group" onClick={closeAllDropdowns}>
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`p-2 rounded-xl ${scrolled ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-white/20'
                  }`}
              >
                <BookOpen className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className={`text-xl font-bold leading-tight ${scrolled ? 'text-gray-800' : 'text-white'
                  }`}>
                  ভোকাবুলারি
                </span>
                <span className={`text-xs ${scrolled ? 'text-gray-500' : 'text-white/80'}`}>
                  শিখুন সহজে
                </span>
              </div>
            </Link>

            {/* ডেস্কটপ মেনু */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <div
                  key={item.path ?? item.name ?? `desktop-nav-${index}`}
                  className="relative"
                >
                  {item.dropdown ? (
                    <div
                      onMouseEnter={() => setStartDropdownOpen(true)}
                      onMouseLeave={() => setStartDropdownOpen(false)}
                    >
                      <button
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${isLevelPath()
                          ? scrolled
                            ? 'text-indigo-600 bg-indigo-50'
                            : 'text-white bg-white/20'
                          : scrolled
                            ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                            : 'text-white/90 hover:text-white hover:bg-white/20'
                          }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${startDropdownOpen ? 'rotate-180' : ''
                          }`} />
                      </button>

                      <AnimatePresence>
                        {startDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                            onMouseEnter={() => setStartDropdownOpen(true)}
                            onMouseLeave={() => setStartDropdownOpen(false)}
                          >
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className={`flex items-center gap-3 px-4 py-2 hover:bg-indigo-50 transition-colors ${location.pathname === subItem.path
                                  ? 'text-indigo-600 bg-indigo-50'
                                  : 'text-gray-700'
                                  }`}
                                onClick={() => setStartDropdownOpen(false)}
                              >
                                <subItem.icon className={`w-4 h-4 text-${subItem.color}-500`} />
                                <span>{subItem.name}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${isActivePath(item.path)
                        ? scrolled
                          ? 'text-indigo-600 bg-indigo-50'
                          : 'text-white bg-white/20'
                        : scrolled
                          ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                          : 'text-white/90 hover:text-white hover:bg-white/20'
                        }`}
                      onClick={closeAllDropdowns}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* ডান পাশের সেকশন */}
            <div className="hidden lg:flex items-center gap-3">
              {/* ড্যাশবোর্ড */}
              <Link to="/start" >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${scrolled
                    ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                    : 'text-white bg-white/20 hover:bg-white/30'
                    }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>ড্যাশবোর্ড</span>
                </motion.div>
              </Link>

              {/* নোটিফিকেশন */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setUserDropdownOpen(false);
                    setStartDropdownOpen(false);
                  }}
                  className={`p-2 rounded-lg transition-colors relative ${scrolled
                    ? 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                    : 'text-white/90 hover:text-white hover:bg-white/20'
                    }`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </motion.span>
                  )}
                </motion.button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">নোটিফিকেশন</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            নতুন শব্দ যোগ হওয়ার সময়
                          </p>
                        </div>
                        {notifications.length > 0 && (
                          <button
                            onClick={clearAll}
                            className="text-xs text-red-500 hover:text-red-600 transition-colors"
                          >
                            সব ক্লিয়ার
                          </button>
                        )}
                      </div>

                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center">
                            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">কোনো নোটিফিকেশন নেই</p>
                            <p className="text-xs text-gray-400 mt-1">নতুন শব্দ যোগ হলে এখানে দেখাবে</p>
                          </div>
                        ) : (
                          notifications.map((notif, idx) => (
                            <div
                              key={notif.id ?? notif.timestamp ?? `${notif.word}-${idx}`}
                              className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${idx < unreadCount ? 'bg-indigo-50/30 dark:bg-indigo-900/20' : ''
                                }`}
                              onClick={() => markAsRead(idx)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0">
                                  {notif.category === 'basic' && <BookOpen className="w-8 h-8 text-green-500" />}
                                  {notif.category === 'intermediate' && <TrendingUp className="w-8 h-8 text-blue-500" />}
                                  {notif.category === 'advanced' && <Award className="w-8 h-8 text-purple-500" />}
                                  {(notif.category !== 'basic' && notif.category !== 'intermediate' && notif.category !== 'advanced') &&
                                    <CheckCircle className="w-8 h-8 text-indigo-500" />
                                  }
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getCategoryColor(notif.category)}`}>
                                      {notif.category?.toUpperCase() || 'NEW WORD'}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      {formatTime(notif.timestamp)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                                    {notif.word}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {notif.message || `${notif.category} লেভেলে নতুন শব্দ যোগ হয়েছে`}
                                  </p>
                                  {notif.banglaMeaning && (
                                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                                      {notif.banglaMeaning}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {notifications.length > 0 && (
                        <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
                          <button
                            onClick={() => setShowNotifications(false)}
                            className="text-xs text-indigo-600 hover:text-indigo-700"
                          >
                            বন্ধ করুন
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ইউজার সেকশন */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    onMouseEnter={() => setUserDropdownOpen(true)}
                    onMouseLeave={() => setUserDropdownOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${scrolled ? 'hover:bg-indigo-50' : 'hover:bg-white/20'
                      }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {getUserInitial()}
                    </div>
                    <span className={`font-medium ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                      {user.name?.split(' ')[0] || 'User'}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${userDropdownOpen ? 'rotate-180' : ''} ${scrolled ? 'text-gray-600' : 'text-white/80'}`} />
                  </button>

                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                        onMouseEnter={() => setUserDropdownOpen(true)}
                        onMouseLeave={() => setUserDropdownOpen(false)}
                      >
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-50 transition-colors text-gray-700"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>প্রোফাইল</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors text-red-600"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>লগআউট</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link to="/login" onClick={closeAllDropdowns}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-all duration-300 ${scrolled
                        ? 'text-gray-700 border border-gray-300 hover:border-indigo-600 hover:text-indigo-600'
                        : 'text-white border border-white/30 hover:bg-white/20'
                        }`}
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="font-medium">লগইন</span>
                    </motion.button>
                  </Link>

                  <Link to="/register" onClick={closeAllDropdowns}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-5 py-2 rounded-lg shadow-lg transition-all duration-300 ${scrolled
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl'
                        : 'bg-white text-indigo-600 hover:bg-gray-100'
                        }`}
                    >
                      <UserPlus className="w-4 h-4" />
                      <span className="font-medium">রেজিস্টার</span>
                    </motion.button>
                  </Link>
                </>
              )}
            </div>

            {/* মোবাইল মেনু বাটন */}
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                closeAllDropdowns();
              }}
              className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* মোবাইল মেনু */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200 shadow-xl"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <React.Fragment
                      key={item.path ?? item.name ?? `mobile-nav-${index}`}
                    >
                      {item.dropdown ? (
                        <>
                          <div className="px-4 py-2 font-medium text-gray-500 flex items-center gap-2">
                            <item.icon className="w-4 h-4" />
                            {item.name}
                          </div>
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ml-4 ${location.pathname === subItem.path
                                ? 'text-indigo-600 bg-indigo-50'
                                : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                                }`}
                              onClick={() => setIsOpen(false)}
                            >
                              <subItem.icon className={`w-4 h-4 text-${subItem.color}-500`} />
                              <span className="font-medium">{subItem.name}</span>
                            </Link>
                          ))}
                        </>
                      ) : (
                        <Link
                          to={item.path}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActivePath(item.path)
                            ? 'text-indigo-600 bg-indigo-50'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                            }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      )}
                    </React.Fragment>
                  ))}

                  {/* মোবাইলে ড্যাশবোর্ড */}
                  <Link
                    to="/start"
                    guard:true
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="font-medium">ড্যাশবোর্ড</span>
                  </Link>

                  <div className="border-t border-gray-200 my-4"></div>

                  {/* মোবাইলে ইউজার সেকশন */}
                  {user ? (
                    <>
                      <div className="px-4 py-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {getUserInitial()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        <span>প্রোফাইল</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>লগআউট</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                          <LogIn className="w-5 h-5" />
                          <span className="font-medium">লগইন</span>
                        </button>
                      </Link>
                      <Link to="/register" onClick={() => setIsOpen(false)}>
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                          <UserPlus className="w-5 h-5" />
                          <span className="font-medium">রেজিস্টার</span>
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* স্পেসার */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;