import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Globe, Award, Users, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from './Section/Fotter';

const Home = () => {
  const navigate = useNavigate();

  // শুরু করুন বাটনের জন্য হ্যান্ডলার
  const handleStartClick = (e) => {
    e.preventDefault(); // ডিফল্ট আচরণ বন্ধ করুন
   
    navigate('/start');
  };

  // ডেমো দেখুন বাটনের জন্য হ্যান্ডলার
  const handleDemoClick = (e) => {
    e.preventDefault();
    console.log("Navigating to /demo");
    navigate('/demo');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      <Helmet>
        <title>Home</title>
        
      </Helmet>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block p-3 bg-indigo-100 rounded-2xl mb-6"
            >
              <BookOpen className="w-10 h-10 text-indigo-600" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              আপনার ভাষা দক্ষতা
              <span className="text-indigo-600 block mt-2">উন্নত করুন</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              ইন্টারেক্টিভ ভোকাবুলারি লেসন, কুইজ এবং ট্র্যাকিং এর মাধ্যমে ইংরেজি শব্দভান্ডার শেখার আধুনিক পদ্ধতি
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              {/* শুরু করুন বাটন - ফিক্সড */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartClick}
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2 cursor-pointer"
                type="button"
              >
                শুরু করুন
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {/* ডেমো দেখুন বাটন */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDemoClick}
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold border-2 border-indigo-200 hover:border-indigo-400 transition-all cursor-pointer"
                type="button"
              >
                ডেমো দেখুন
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-indigo-200 rounded-full opacity-20 hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 hidden lg:block"
        />
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Users, value: "১০,০০০+", label: "সক্রিয় শিক্ষার্থী" },
            { icon: Award, value: "৫০০০+", label: "শব্দভান্ডার" },
            { icon: Globe, value: "২৪/৭", label: "অনলাইন সাপোর্ট" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
            >
              <stat.icon className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          কেন আমাদের বেছে নেবেন?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "দ্রুত শেখা",
              description: "স্মার্ট অ্যালগরিদম ব্যবহার করে আপনার শেখার গতি বাড়ান"
            },
            {
              icon: BookOpen,
              title: "সমৃদ্ধ কন্টেন্ট",
              description: "বিভিন্ন ক্যাটাগরিতে ৫০০০+ শব্দ ও উদাহরণ বাক্য"
            },
            {
              icon: Award,
              title: "গ্যামিফিকেশন",
              description: "পয়েন্ট, ব্যাজ এবং লিডারবোর্ডের মাধ্যমে মজাদার শেখা"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Level Cards Preview */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          আপনার লেভেল নির্বাচন করুন
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          শুরু থেকে অ্যাডভান্সড পর্যন্ত - আপনার জন্য সঠিক লেভেল বেছে নিন
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { level: "A1", name: "বিগিনার", color: "from-green-400 to-green-500", words: "৫০০+ শব্দ", path: "basic" },
            { level: "A2", name: "এলিমেন্টারি", color: "from-blue-400 to-blue-500", words: "১০০০+ শব্দ", path: "elementary" },
            { level: "B1", name: "ইন্টারমিডিয়েট", color: "from-purple-400 to-purple-500", words: "১৫০০+ শব্দ", path: "intermediate" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="cursor-pointer"
              onClick={() => navigate(`/level/${item.path}`)}
            >
              <div className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl shadow-xl text-white`}>
                <h3 className="text-3xl font-bold mb-2">{item.level}</h3>
                <p className="text-xl mb-1">{item.name}</p>
                <p className="text-sm opacity-90">{item.words}</p>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-4 flex justify-end"
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </section>
      <Footer/>
    </div>
  );
};

export default Home;