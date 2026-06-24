// src/pages/StartPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Rocket, 
  BookOpen, 
  Brain, 
  Sparkles, 
  Baby,
  ArrowRight,
  GraduationCap,
  Languages,
  
  
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
//import { route } from '../../../../../server/router/user_router';

const Start = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // মূল লেভেল সমূহ
  const levelCards = [
    {
      id: 'basic',
      title: 'বেসিক',
      description: 'প্রাথমিক শব্দভান্ডার ও মৌলিক ইংরেজি শিক্ষা',
      icon: BookOpen,
      color: 'from-green-400 to-green-600',
      shadow: 'shadow-green-100',
      route: '/basic'
    },
    {
      id: 'intermediate',
      title: 'ইন্টারমিডিয়েট',
      description: 'দৈনন্দিন ব্যবহারের জন্য প্রয়োজনীয় শব্দ ও বাক্য',
      icon: Brain,
      color: 'from-blue-400 to-blue-600',
      shadow: 'shadow-blue-100',
      route: '/inter'
    },
    {
      id: 'advanced',
      title: 'এডভান্সড',
      description: 'জটিল শব্দ, বাগধারা ও একাডেমিক ভোকাবুলারি',
      icon: GraduationCap,
      color: 'from-purple-400 to-purple-600',
      shadow: 'shadow-purple-100',
      route: '/advanced'
    }
  ];

  // স্পেশাল সেকশন
  const specialSections = [
    {
      id: 'irregular-verb',
      title: 'Irregular Verb',
      description: 'সহায়ক ক্রিয়ার নিয়ম ও ব্যবহার শিখুন',
      icon: Languages,
      color: 'from-amber-400 to-amber-600',
      shadow: 'shadow-amber-100',
      route: '/irregula'
    },
    {
      id: 'kids',
      title: 'কিডস জোন',
      description: 'শিশুদের জন্য মজার ছবি ও শব্দ নিয়ে কার্যক্রম',
      icon: Baby,
      color: 'from-pink-400 to-pink-600',
      shadow: 'shadow-pink-100',
      route: '/kid'
    },
    {
      id: 'phrese',
      title: 'ফ্রেজ',
      description: 'দৈনন্দিন ব্যবহারের গুরুত্বপূর্ণ বাক্যাংশ',
      icon: Baby,
      color: 'from-pink-400 to-amber-600',
      shadow: 'shadow-pink-100',
      route: '/phrese'
    },
    {
      id: 'Grammar',
      title: 'গ্রামার',
      description: 'learn grammar',
      icon: Languages,
      color: 'from-green-400 to-amber-600',
      shadow: 'shadow-pink-100',
      route: '/grammar'
    }

  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      <Helmet>
        <title>ড্যাশবোর্ড</title>
      </Helmet>
      {/* হিরো সেকশন */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full opacity-10"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white rounded-full opacity-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-lg rounded-full mb-6"
          >
            <Rocket className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            আপনার শেখার যাত্রা শুরু হোক
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-indigo-100 max-w-2xl mx-auto"
          >
            আপনার দক্ষতা স্তর অনুযায়ী কোর্স বেছে নিন এবং ইংরেজি শব্দভান্ডার আয়ত্ত করুন
          </motion.p>
        </div>
      </section>

      {/* মূল লেভেল সেকশন */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            আপনার দক্ষতা স্তর নির্বাচন করুন
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            আপনার বর্তমান ইংরেজি দক্ষতার উপর ভিত্তি করে সঠিক স্তর থেকে শুরু করুন
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {levelCards.map((card) => (
            <motion.div
              key={card.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
            >
              {/*link file*/}
              <Link to={card.route} className="block">
                <div className={`h-2 w-full bg-gradient-to-r ${card.color}`}></div>
                <div className="p-8">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${card.color} bg-opacity-10 mb-4`}>
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 mb-6">{card.description}</p>
                  <div className="flex items-center text-indigo-600 font-semibold group-hover:gap-2 transition-all">
                    <span>শুরু করুন</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* স্পেশাল সেকশন */}
      <section className="bg-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              বিশেষ বিভাগ
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              নির্দিষ্ট বিষয়ভিত্তিক শেখার জন্য বিশেষায়িত বিভাগ
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {specialSections.map((section) => (
              <motion.div
                key={section.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group"
              >
                <Link to={section.route} className="block">
                  <div className={`h-2 w-full bg-gradient-to-r ${section.color}`}></div>
                  <div className="p-8">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${section.color} bg-opacity-10 mb-4`}>
                      <section.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-gray-600 mb-6">{section.description}</p>
                    <div className="flex items-center text-indigo-600 font-semibold group-hover:gap-2 transition-all">
                      <span>এক্সপ্লোর করুন</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* অনুপ্রেরণা সেকশন */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white"
        >
          <Sparkles className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            প্রতিদিন ১০ মিনিট, আজীবন দক্ষতা
          </h2>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            নিয়মিত অনুশীলনের মাধ্যমে আপনার শব্দভান্ডার সমৃদ্ধ করুন এবং ইংরেজিতে আত্মবিশ্বাসী হয়ে উঠুন
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
          >
            <Rocket className="w-5 h-5" />
            <span>এখনই শুরু করুন</span>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Start;