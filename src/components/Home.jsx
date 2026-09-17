import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  ArrowRight,
  Globe,
  Award,
  Users,
  Zap,
  Mail,
  Phone,
  MapPin,
  Heart,
  Shield,
  Target,
  Sparkles,
  Star,
  CheckCircle,
  Clock,
  MessageCircle,
  TrendingUp,
  GraduationCap,
  Trophy,
  Send,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import SEO from "./SEO";
import Footer from "./Section/Fotter";

const SITE_URL = "https://learnixdb.netlify.app";

const Home = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [contactSubmitted, setContactSubmitted] = useState(false);

  // =====================================================
  // NAVIGATION
  // =====================================================

  const handleStartClick = () => {
    navigate("/start");
  };

  const handleDemoClick = () => {
    navigate("/demo");
  };

  // =====================================================
  // NEWSLETTER
  // =====================================================

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);

    setTimeout(() => {
      setSubscribed(false);
    }, 3000);

    setEmail("");
  };

  // =====================================================
  // CONTACT FORM
  // =====================================================

  const handleContactSubmit = (e) => {
    e.preventDefault();

    setContactSubmitted(true);

    setTimeout(() => {
      setContactSubmitted(false);
    }, 3000);

    setContactForm({
      name: "",
      email: "",
      message: "",
    });
  };

  // =====================================================
  // SEO STRUCTURED DATA
  // =====================================================

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "LearnixDB",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/Vicon.png`,
    },
    description:
      "Learn English, Russian and Chinese vocabulary with Bangla meanings, pronunciation, examples, quizzes and grammar lessons for free.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">

      {/* =====================================================
          SEO
      ===================================================== */}

      <SEO
        title="Learn English, Russian & Chinese Vocabulary with Bangla Meaning"
        description="Learn English, Russian and Chinese vocabulary with Bangla meanings, pronunciation, examples, quizzes and grammar lessons. Learn vocabulary online for free with LearnixDB."
        keywords={[
          "English vocabulary",
          "English meaning in Bangla",
          "English to Bangla vocabulary",
          "Bangla vocabulary",
          "English grammar",
          "English vocabulary quiz",
          "learn English online",
          "Russian vocabulary",
          "Russian meaning in Bangla",
          "learn Russian",
          "Chinese vocabulary",
          "Chinese meaning in Bangla",
          "learn Chinese",
          "language learning",
          "vocabulary learning",
        ]}
        path="/"
        type="website"
        image={`${SITE_URL}/Vicon.png`}
        structuredData={structuredData}
      />

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section
        className="relative overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

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
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className="inline-block p-3 bg-indigo-100 rounded-2xl mb-6"
            >
              <BookOpen
                className="w-10 h-10 text-indigo-600"
                aria-hidden="true"
              />
            </motion.div>

            <h1
              id="hero-heading"
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              ইংরেজি, রুশ ও চাইনিজ ভাষা শিখুন
              <span className="text-indigo-600 block mt-2">
                বাংলা অর্থসহ
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              LearnixDB-এর মাধ্যমে ইংরেজি, রুশ ও চাইনিজ ভাষার
              vocabulary, grammar, pronunciation, quiz এবং
              learning resources বাংলা অর্থসহ শিখুন।
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartClick}
                type="button"
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                শুরু করুন
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDemoClick}
                type="button"
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold border-2 border-indigo-200 hover:border-indigo-400 transition-all"
              >
                ডেমো দেখুন
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-indigo-200 rounded-full opacity-20 hidden lg:block"
          aria-hidden="true"
        />

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 hidden lg:block"
          aria-hidden="true"
        />
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section
        className="container mx-auto px-4 py-16"
        aria-labelledby="stats-heading"
      >
        <h2 id="stats-heading" className="sr-only">
          LearnixDB Statistics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              value: "১০,০০০+",
              label: "সক্রিয় শিক্ষার্থী",
            },
            {
              icon: Award,
              value: "৫০০০+",
              label: "শব্দভান্ডার",
            },
            {
              icon: Globe,
              value: "২৪/৭",
              label: "অনলাইন সাপোর্ট",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
            >
              <stat.icon
                className="w-8 h-8 text-indigo-600 mx-auto mb-3"
                aria-hidden="true"
              />

              <p className="text-2xl font-bold text-gray-900">
                {stat.value}
              </p>

              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section className="container mx-auto px-4 py-16 bg-white rounded-3xl shadow-sm my-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wide">
            আমাদের সম্পর্কে
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            কেন আমরা সেরা?
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            আমরা বিশ্বাস করি যে ভাষা শেখা সহজ এবং মজাদার হওয়া
            উচিত। আমাদের লক্ষ্য প্রতিটি শিক্ষার্থীর কাছে
            মানসম্মত শিক্ষা পৌঁছে দেওয়া।
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Target,
              title: "আমাদের লক্ষ্য",
              description:
                "বাংলাদেশের প্রতিটি শিক্ষার্থীকে বিনামূল্যে মানসম্মত ইংরেজি, রুশ এবং চাইনিজ শিক্ষা প্রদান করা",
            },
            {
              icon: Heart,
              title: "আমাদের মূল্যবোধ",
              description:
                "গুণগত মান, সততা, উদ্ভাবন এবং শিক্ষার্থীদের সাফল্য আমাদের অগ্রাধিকার",
            },
            {
              icon: Shield,
              title: "গুণগত মান",
              description:
                "বিশেষজ্ঞ শিক্ষকদের দ্বারা তৈরি কন্টেন্ট এবং নিয়মিত আপডেট",
            },
            {
              icon: Sparkles,
              title: "অভিনব পদ্ধতি",
              description:
                "গেমিফিকেশন এবং ইন্টারেক্টিভ লেসনের মাধ্যমে মজাদার শেখার অভিজ্ঞতা",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon
                  className="w-8 h-8 text-indigo-600"
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          কেন আমাদের বেছে নেবেন?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "দ্রুত শেখা",
              description:
                "স্মার্ট অ্যালগরিদম ব্যবহার করে আপনার শেখার গতি বাড়ান",
            },
            {
              icon: BookOpen,
              title: "সমৃদ্ধ কন্টেন্ট",
              description:
                "ইংরেজি, রুশ এবং চাইনিজ - তিনটি ভাষায় ৫০০০+ শব্দ ও উদাহরণ",
            },
            {
              icon: Award,
              title: "গ্যামিফিকেশন",
              description:
                "পয়েন্ট, ব্যাজ এবং লিডারবোর্ডের মাধ্যমে মজাদার শেখা",
            },
            {
              icon: GraduationCap,
              title: "ব্যাকরণ গাইড",
              description:
                "সম্পূর্ণ টেন্সেস এবং ব্যাকরণ রুলস বাংলায় ব্যাখ্যা সহ",
            },
            {
              icon: TrendingUp,
              title: "প্রগ্রেস ট্র্যাকিং",
              description:
                "আপনার শেখার অগ্রগতি ট্র্যাক করুন এবং উন্নতি দেখুন",
            },
            {
              icon: Trophy,
              title: "ইন্টারেক্টিভ কুইজ",
              description:
                "নিজের দক্ষতা যাচাই করুন বিভিন্ন লেভেলের কুইজ দিয়ে",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <feature.icon
                className="w-12 h-12 text-indigo-600 mb-4"
                aria-hidden="true"
              />

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================
          LANGUAGES
      ===================================================== */}

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          তিনটি ভাষায় শেখার সুযোগ
        </h2>

        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          ইংরেজি, রুশ এবং চাইনিজ - আপনার পছন্দের ভাষা বেছে নিন
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              flag: "🇬🇧",
              name: "English",
              bangla: "ইংরেজি",
              color: "from-blue-400 to-blue-500",
              path: "/basic",
            },
            {
              flag: "🇷🇺",
              name: "Russian",
              bangla: "রুশ",
              color: "from-red-400 to-red-500",
              path: "/language/russian",
            },
            {
              flag: "🇨🇳",
              name: "Chinese",
              bangla: "চাইনিজ",
              color: "from-yellow-400 to-orange-500",
              path: "/language/chinese",
            },
          ].map((lang, index) => (
            <Link
              key={index}
              to={lang.path}
              aria-label={`Learn ${lang.name} vocabulary`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 1 }}
              >
                <div
                  className={`bg-gradient-to-br ${lang.color} p-8 rounded-2xl shadow-xl text-white text-center`}
                >
                  <div
                    className="text-5xl mb-3"
                    aria-hidden="true"
                  >
                    {lang.flag}
                  </div>

                  <h3 className="text-2xl font-bold mb-1">
                    {lang.name}
                  </h3>

                  <p className="text-lg opacity-90">
                    {lang.bangla}
                  </p>

                  <div className="mt-4 flex justify-center">
                    <ArrowRight
                      className="w-6 h-6"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          LEVELS
      ===================================================== */}

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          আপনার লেভেল নির্বাচন করুন
        </h2>

        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          শুরু থেকে অ্যাডভান্সড পর্যন্ত - আপনার জন্য সঠিক
          লেভেল বেছে নিন
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              level: "A1",
              name: "বিগিনার",
              color: "from-green-400 to-green-500",
              words: "৫০০+ শব্দ",
              path: "basic",
            },
            {
              level: "A2",
              name: "এলিমেন্টারি",
              color: "from-blue-400 to-blue-500",
              words: "১০০০+ শব্দ",
              path: "elementary",
            },
            {
              level: "B1",
              name: "ইন্টারমিডিয়েট",
              color: "from-purple-400 to-purple-500",
              words: "১৫০০+ শব্দ",
              path: "intermediate",
            },
          ].map((item, index) => (
            <Link
              key={index}
              to={`/level/${item.path}`}
              aria-label={`Learn ${item.name} vocabulary`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 1 }}
              >
                <div
                  className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl shadow-xl text-white`}
                >
                  <h3 className="text-3xl font-bold mb-2">
                    {item.level}
                  </h3>

                  <p className="text-xl mb-1">
                    {item.name}
                  </p>

                  <p className="text-sm opacity-90">
                    {item.words}
                  </p>

                  <div className="mt-4 flex justify-end">
                    <ArrowRight
                      className="w-6 h-6"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          শিক্ষার্থীদের মতামত
        </h2>

        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          আমাদের শিক্ষার্থীরা কী বলছেন
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "রাহুল আহমেদ",
              role: "ছাত্র",
              text: "এই প্ল্যাটফর্মটি আমার ইংরেজি শেখার যাত্রা সম্পূর্ণ বদলে দিয়েছে। বিশেষ করে ভোকাবুলারি সেকশনটি দারুণ!",
              rating: 5,
            },
            {
              name: "সাদিয়া খাতুন",
              role: "শিক্ষিকা",
              text: "আমি আমার ছাত্রদের জন্য এই ওয়েবসাইট সাজেস্ট করি। বাংলা অর্থ সহ শেখার পদ্ধতিটি চমৎকার।",
              rating: 5,
            },
            {
              name: "তানভীর হাসান",
              role: "ইঞ্জিনিয়ার",
              text: "রুশ ভাষা শিখতে গিয়ে এই সাইটটি পেয়েছি। রুশ বর্ণমালা থেকে শুরু করে সব কিছু বিস্তারিত আছে।",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div
                className="flex gap-1 mb-4"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="text-gray-600 mb-4 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold"
                  aria-hidden="true"
                >
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl my-8">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wide">
            যোগাযোগ করুন
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            আমাদের সাথে যোগাযোগ করুন
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            আপনার যেকোনো প্রশ্ন বা মতামত আমাদের জানান
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* CONTACT FORM */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            {contactSubmitted && (
              <div
                className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
                role="status"
                aria-live="polite"
              >
                <CheckCircle
                  className="w-5 h-5 text-green-600"
                  aria-hidden="true"
                />

                <p className="text-green-700 text-sm">
                  আপনার বার্তা পাঠানো হয়েছে!
                </p>
              </div>
            )}

            <form
              onSubmit={handleContactSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  নাম <span className="text-red-500">*</span>
                </label>

                <input
                  id="contact-name"
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="আপনার নাম"
                  autoComplete="name"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ইমেইল <span className="text-red-500">*</span>
                </label>

                <input
                  id="contact-email"
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  বার্তা <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="contact-message"
                  rows="4"
                  required
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      message: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="আপনার বার্তা লিখুন..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send
                  className="w-5 h-5"
                  aria-hidden="true"
                />
                বার্তা পাঠান
              </motion.button>
            </form>
          </motion.div>

          {/* CONTACT INFO */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              {
                icon: Mail,
                title: "ইমেইল",
                value: "info@learnixdb.com",
                detail: "২৪ ঘন্টার মধ্যে রিপ্লাই",
              },
              {
                icon: Phone,
                title: "ফোন",
                value: "+880 1234 567890",
                detail: "সকাল ৯টা - রাত ৯টা",
              },
              {
                icon: MapPin,
                title: "ঠিকানা",
                value: "ঢাকা, বাংলাদেশ",
                detail: "মিরপুর, ধানমন্ডি",
              },
              {
                icon: Clock,
                title: "সাপোর্ট টাইম",
                value: "সপ্তাহের ৭ দিন",
                detail: "সকাল ৯টা - রাত ৯টা",
              },
            ].map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-lg flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <info.icon
                    className="w-6 h-6 text-indigo-600"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    {info.title}
                  </p>

                  <p className="font-semibold text-gray-800">
                    {info.value}
                  </p>

                  <p className="text-xs text-gray-400">
                    {info.detail}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          NEWSLETTER
      ===================================================== */}

      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <MessageCircle
            className="w-12 h-12 mx-auto mb-4"
            aria-hidden="true"
          />

          <h2 className="text-3xl font-bold mb-4">
            আপডেট থাকুন!
          </h2>

          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            নতুন লেসন, কুইজ এবং ফিচার সম্পর্কে প্রথমে জানতে
            আমাদের নিউজলেটারে সাবস্ক্রাইব করুন
          </p>

          {subscribed ? (
            <div
              className="flex items-center justify-center gap-2 text-green-300"
              role="status"
              aria-live="polite"
            >
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg font-medium">
                ধন্যবাদ! আপনি সাবস্ক্রাইব করেছেন।
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                আপনার ইমেইল
              </label>

              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল"
                autoComplete="email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                সাবস্ক্রাইব
              </motion.button>
            </form>
          )}
        </motion.div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            আজই শুরু করুন আপনার ভাষা যাত্রা!
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            বিনামূল্যে রেজিস্টার করুন এবং হাজারো শব্দ শেখা
            শুরু করুন
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition-all"
              >
                বিনামূল্যে রেজিস্টার করুন
              </motion.span>
            </Link>

            <Link to="/login">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold border-2 border-indigo-200 hover:border-indigo-400 transition-all"
              >
                লগইন করুন
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;