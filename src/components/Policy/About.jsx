// src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  BookOpen, 
  Users, 
  Target, 
  Heart, 
  Shield, 
  Sparkles,
  Award,
  Globe,
  Clock,
  CheckCircle
} from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: "১০,০০০+", label: "সক্রিয় শিক্ষার্থী" },
    { icon: BookOpen, value: "৫,০০০+", label: "শব্দভান্ডার" },
    { icon: Award, value: "৫০০+", label: "কুইজ" },
    { icon: Globe, value: "২৪/৭", label: "অনলাইন সাপোর্ট" }
  ];

  const values = [
    {
      icon: Target,
      title: "আমাদের লক্ষ্য",
      description: "বাংলাদেশের প্রতিটি শিক্ষার্থীকে বিনামূল্যে মানসম্মত ইংরেজি শিক্ষা প্রদান করা"
    },
    {
      icon: Heart,
      title: "আমাদের মূল্যবোধ",
      description: "গুণগত মান, সততা, উদ্ভাবন এবং শিক্ষার্থীদের সাফল্য আমাদের অগ্রাধিকার"
    },
    {
      icon: Shield,
      title: "গুণগত মান",
      description: "বিশেষজ্ঞ শিক্ষকদের দ্বারা তৈরি কন্টেন্ট এবং নিয়মিত আপডেট"
    },
    {
      icon: Sparkles,
      title: "অভিনব পদ্ধতি",
      description: "গেমিফিকেশন এবং ইন্টারেক্টিভ লেসনের মাধ্যমে মজাদার শেখার অভিজ্ঞতা"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Helmet>
        <title>আমাদের সম্পর্কে - ভোকাবুলারি</title>
        <meta name="description" content="ভোকাবুলারি প্ল্যাটফর্ম সম্পর্কে জানুন - আমাদের লক্ষ্য, মূল্যবোধ এবং গল্প" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">আমাদের সম্পর্কে</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              আমরা বিশ্বাস করি যে ভাষা শেখা সহজ এবং মজাদার হওয়া উচিত
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">আমাদের গল্প</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-8"></div>
            <p className="text-gray-600 leading-relaxed mb-4">
              ভোকাবুলারি শুরু হয়েছিল ২০২০ সালে, যখন একদল তরুণ শিক্ষক এবং প্রযুক্তিবিদ 
              একত্রিত হয়ে ইংরেজি শেখার একটি সহজ ও কার্যকর পদ্ধতি তৈরি করার সিদ্ধান্ত নেন।
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              আমাদের লক্ষ্য ছিল এমন একটি প্ল্যাটফর্ম তৈরি করা যেখানে যে কেউ সহজে, 
              মজাদার উপায়ে ইংরেজি শিখতে পারে। আজ আমরা গর্বিত যে হাজার হাজার শিক্ষার্থী 
              আমাদের প্ল্যাটফর্ম ব্যবহার করে তাদের ভাষা দক্ষতা উন্নত করছে।
            </p>
            <p className="text-gray-600 leading-relaxed">
              আমরা বিশ্বাস করি শিক্ষা সবার জন্য উন্মুক্ত হওয়া উচিত। তাই আমরা বিনামূল্যে 
              মানসম্মত শিক্ষা উপকরণ প্রদান করে যাচ্ছি এবং ভবিষ্যতেও এটি অব্যাহত রাখবো।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">আমাদের মূল্যবোধ</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;