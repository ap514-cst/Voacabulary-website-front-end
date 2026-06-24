// src/components/PrivacyPolicy.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, Database, Mail, AlertCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "আমরা কী তথ্য সংগ্রহ করি",
      content: [
        "নাম, ইমেইল ঠিকানা এবং যোগাযোগের তথ্য",
        "আপনার ব্যবহারের তথ্য (যেমন কোন লেসন দেখেছেন, কুইজ দিয়েছেন)",
        "ডিভাইসের তথ্য (ব্রাউজার টাইপ, আইপি ঠিকানা)",
        "পারফরম্যান্স ডাটা (স্কোর, অগ্রগতি)"
      ]
    },
    {
      icon: Lock,
      title: "আমরা কীভাবে আপনার তথ্য ব্যবহার করি",
      content: [
        "আপনার ব্যক্তিগতকৃত শেখার অভিজ্ঞতা তৈরি করতে",
        "প্ল্যাটফর্মের উন্নতি এবং নতুন ফিচার যোগ করতে",
        "আপনার অগ্রগতি ট্র্যাক এবং রিপোর্ট তৈরি করতে",
        "সাপোর্ট এবং জরুরি নোটিফিকেশন পাঠাতে"
      ]
    },
    {
      icon: Eye,
      title: "তথ্যের নিরাপত্তা",
      content: [
        "আমরা আপনার তথ্য সুরক্ষিত রাখতে এনক্রিপশন ব্যবহার করি",
        "SSL সার্টিফিকেট দিয়ে সকল ডাটা ট্রান্সফার সুরক্ষিত",
        "নিয়মিত নিরাপত্তা অডিট এবং আপডেট",
        "কঠোর অ্যাক্সেস কন্ট্রোল এবং মনিটরিং"
      ]
    },
    {
      icon: Mail,
      title: "আপনার অধিকার",
      content: [
        "আপনার তথ্য অ্যাক্সেস এবং সংশোধন করার অধিকার",
        "আপনার তথ্য মুছে ফেলার অনুরোধ করার অধিকার",
        "মার্কেটিং ইমেইল থেকে অপ্ট-আউট করার অধিকার",
        "আপনার ডাটার কপি গ্রহণের অধিকার"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Helmet>
        <title>গোপনীয়তা নীতি - ভোকাবুলারি</title>
        <meta name="description" content="আমাদের গোপনীয়তা নীতি সম্পর্কে জানুন - আপনার তথ্য কীভাবে সুরক্ষিত থাকে" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">গোপনীয়তা নীতি</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              আপনার তথ্য সুরক্ষা আমাদের কাছে সর্বোচ্চ গুরুত্বপূর্ণ
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
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">সূচনা</h2>
            <p className="text-gray-600 leading-relaxed">
              ভোকাবুলারি ("আমরা", "আমাদের") আপনার গোপনীয়তা রক্ষায় প্রতিশ্রুতিবদ্ধ। 
              এই গোপনীয়তা নীতি ব্যাখ্যা করে যে আমরা কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, 
              ব্যবহার এবং সুরক্ষিত করি যখন আপনি আমাদের প্ল্যাটফর্ম ব্যবহার করেন।
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

          {/* Cookies */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">কুকিজ</h2>
            <p className="text-gray-600 leading-relaxed">
              আমরা আপনার অভিজ্ঞতা উন্নত করতে কুকিজ ব্যবহার করি। আপনি আপনার ব্রাউজার সেটিংসের 
              মাধ্যমে কুকিজ নিয়ন্ত্রণ করতে পারেন, তবে কিছু ফিচার তখন সঠিকভাবে কাজ নাও করতে পারে।
            </p>
          </div>

          {/* Contact */}
          <div className="bg-indigo-50 rounded-2xl shadow-lg p-8 text-center">
            <AlertCircle className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">প্রশ্ন থাকলে联系我们</h2>
            <p className="text-gray-600 mb-4">
              এই গোপনীয়তা নীতি সম্পর্কে আপনার কোনো প্রশ্ন থাকলে, আমাদের সাথে যোগাযোগ করুন
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="mailto:privacy@vocabulary.com" className="text-indigo-600 hover:text-indigo-700">
                privacy@vocabulary.com
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

export default PrivacyPolicy;