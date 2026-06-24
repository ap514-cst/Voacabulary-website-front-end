// src/components/TermsConditions.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Scale, FileText, UserCheck, AlertTriangle, BookOpen, Shield, DollarSign, Award } from 'lucide-react';

const TermsConditions = () => {
  const sections = [
    {
      icon: UserCheck,
      title: "অ্যাকাউন্ট নিবন্ধন",
      content: [
        "আপনাকে অবশ্যই সঠিক এবং সম্পূর্ণ তথ্য প্রদান করতে হবে",
        "আপনি আপনার অ্যাকাউন্টের নিরাপত্তার জন্য দায়ী",
        "আপনি ১৩ বছরের কম বয়সী হলে পিতামাতার অনুমতি নিতে হবে",
        "একাধিক অ্যাকাউন্ট তৈরি করা নিষিদ্ধ"
      ]
    },
    {
      icon: BookOpen,
      title: "প্ল্যাটফর্ম ব্যবহারের নিয়ম",
      content: [
        "শুধুমাত্র ব্যক্তিগত, অ-বাণিজ্যিক উদ্দেশ্যে ব্যবহার করা যাবে",
        "কন্টেন্ট কপি, ডিস্ট্রিবিউট বা সংশোধন করা যাবে না",
        "অন্য ব্যবহারকারীদের হয়রানি বা উত্ত্যক্ত করা যাবে না",
        "প্ল্যাটফর্মের নিরাপত্তা ব্যবস্থা ভঙ্গ করা যাবে না"
      ]
    },
    {
      icon: Award,
      title: "ইন্টেলেকচুয়াল প্রপার্টি",
      content: [
        "সমস্ত কন্টেন্ট ভোকাবুলারির মালিকানাধীন",
        "ট্রেডমার্ক এবং লোগো অনুমতি ছাড়া ব্যবহার করা যাবে না",
        "ব্যবহারকারীর তৈরি কন্টেন্ট প্ল্যাটফর্মের সম্পত্তি নয়",
        "আপনার নিজস্ব কন্টেন্টের কপিরাইট আপনার থাকে"
      ]
    },
    {
      icon: AlertTriangle,
      title: "নিষিদ্ধ কার্যকলাপ",
      content: [
        "স্প্যাম বা ফিশিং লিংক পোস্ট করা",
        "অবৈধ কার্যকলাপের জন্য প্ল্যাটফর্ম ব্যবহার করা",
        "ম্যালওয়্যার বা ভাইরাস ছড়ানো",
        "অটোমেটেড স্ক্রিপ্ট বা বট ব্যবহার করা"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Helmet>
        <title>শর্তাবলী ও নিয়ম - ভোকাবুলারি</title>
        <meta name="description" content="আমাদের প্ল্যাটফর্ম ব্যবহারের শর্তাবলী এবং নিয়ম সম্পর্কে জানুন" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Scale className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">শর্তাবলী ও নিয়ম</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              আমাদের প্ল্যাটফর্ম ব্যবহারের আগে নিয়মগুলো পড়ুন
            </p>
            <p className="text-sm mt-4 opacity-75">শেষ আপডেট: {new Date().toLocaleDateString('bn-BD')}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Acceptance */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">শর্তাবলী গ্রহণ</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              ভোকাবুলারি প্ল্যাটফর্ম ব্যবহার করে, আপনি এই শর্তাবলী মেনে চলতে সম্মত হন। 
              আপনি যদি এই শর্তাবলীর সাথে একমত না হন, তাহলে দয়া করে আমাদের প্ল্যাটফর্ম ব্যবহার করবেন না।
            </p>
          </div>

          {/* Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <section.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              </div>
              <ul className="space-y-2 ml-4">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-600">
                    <span className="text-indigo-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Termination */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">অ্যাকাউন্ট বন্ধ</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              আমরা যেকোনো সময়, যেকোনো কারণে, পূর্ব ঘোষণা ছাড়াই আপনার অ্যাকাউন্ট বন্ধ বা স্থগিত করার 
              অধিকার রাখি যদি আমরা বিশ্বাস করি যে আপনি এই শর্তাবলী লঙ্ঘন করেছেন।
            </p>
            <p className="text-gray-600 leading-relaxed">
              আপনি যেকোনো সময় আপনার অ্যাকাউন্ট মুছে ফেলতে পারেন।
            </p>
          </div>

          {/* Changes */}
          <div className="bg-yellow-50 rounded-2xl shadow-lg p-8 border border-yellow-200">
            <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">শর্তাবলীর পরিবর্তন</h2>
            <p className="text-gray-600 text-center">
              আমরা সময়ে সময়ে এই শর্তাবলী আপডেট করতে পারি। কোনো গুরুত্বপূর্ণ পরিবর্তন হলে 
              আমরা আপনাকে ইমেইলের মাধ্যমে জানাবো।
            </p>
          </div>

          {/* Contact */}
          <div className="bg-indigo-50 rounded-2xl shadow-lg p-8 text-center">
            <Scale className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">প্রশ্ন থাকলে联系我们</h2>
            <p className="text-gray-600 mb-4">
              এই শর্তাবলী সম্পর্কে আপনার কোনো প্রশ্ন থাকলে, আমাদের সাথে যোগাযোগ করুন
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="mailto:legal@vocabulary.com" className="text-indigo-600 hover:text-indigo-700">
                legal@vocabulary.com
              </a>
              <span className="text-gray-400">|</span>
              <a href="/contact" className="text-indigo-600 hover:text-indigo-700">
                যোগাযোগ ফর্ম
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsConditions;