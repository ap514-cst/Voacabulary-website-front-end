import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';
import { ChevronRight, Volume2, Star, Bookmark, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LevelPage = () => {
  const { levelId } = useParams();
  const [bookmarked, setBookmarked] = useState([]);

  // লেভেল অনুযায়ী ডেটা
  const levelData = {
    a1: {
      title: "A1 - বিগিনার",
      description: "প্রতিদিনের ব্যবহার্য মৌলিক শব্দ ও বাক্য",
      color: "green",
      words: [
        { word: "Apple", meaning: "আপেল", pronunciation: "/ˈæp.əl/", example: "I eat an apple every day." },
        { word: "Book", meaning: "বই", pronunciation: "/bʊk/", example: "This is my book." },
        { word: "Car", meaning: "গাড়ি", pronunciation: "/kɑːr/", example: "He drives a red car." },
        { word: "Dog", meaning: "কুকুর", pronunciation: "/dɒɡ/", example: "The dog is barking." },
        { word: "House", meaning: "বাড়ি", pronunciation: "/haʊs/", example: "My house is big." },
        { word: "Pen", meaning: "কলম", pronunciation: "/pen/", example: "I need a blue pen." },
        { word: "Water", meaning: "পানি", pronunciation: "/ˈwɔː.tər/", example: "Please give me water." },
        { word: "Teacher", meaning: "শিক্ষক", pronunciation: "/ˈtiː.tʃər/", example: "My teacher is kind." }
      ]
    },
    a2: {
      title: "A2 - এলিমেন্টারি",
      description: "সাধারণ কথোপকথনের জন্য প্রয়োজনীয় শব্দ",
      color: "blue",
      words: [
        { word: "Beautiful", meaning: "সুন্দর", pronunciation: "/ˈbjuː.tɪ.fəl/", example: "The sunset is beautiful." },
        { word: "Dangerous", meaning: "বিপজ্জনক", pronunciation: "/ˈdeɪn.dʒər.əs/", example: "This road is dangerous." },
        { word: "Important", meaning: "গুরুত্বপূর্ণ", pronunciation: "/ɪmˈpɔː.tənt/", example: "This is important." },
        { word: "Interesting", meaning: "মজার", pronunciation: "/ˈɪn.trɪs.tɪŋ/", example: "The movie is interesting." },
        { word: "Different", meaning: "ভিন্ন", pronunciation: "/ˈdɪf.ər.ənt/", example: "We have different opinions." },
        { word: "Experience", meaning: "অভিজ্ঞতা", pronunciation: "/ɪkˈspɪə.ri.əns/", example: "I have work experience." },
        { word: "Government", meaning: "সরকার", pronunciation: "/ˈɡʌv.ən.mənt/", example: "The government helps people." },
        { word: "Hospital", meaning: "হাসপাতাল", pronunciation: "/ˈhɒs.pɪ.təl/", example: "She works in a hospital." }
      ]
    },
    b1: {
      title: "B1 - ইন্টারমিডিয়েট",
      description: "জটিল বিষয় নিয়ে আলোচনার জন্য শব্দ",
      color: "purple",
      words: [
        { word: "Accommodate", meaning: "স্থান দেওয়া", pronunciation: "/əˈkɒm.ə.deɪt/", example: "The hotel can accommodate 200 guests." },
        { word: "Consequence", meaning: "পরিণাম", pronunciation: "/ˈkɒn.sɪ.kwəns/", example: "Think about the consequences." },
        { word: "Develop", meaning: "উন্নয়ন করা", pronunciation: "/dɪˈvel.əp/", example: "We need to develop new skills." },
        { word: "Environment", meaning: "পরিবেশ", pronunciation: "/ɪnˈvaɪ.rən.mənt/", example: "Protect the environment." },
        { word: "Frequently", meaning: "ঘন ঘন", pronunciation: "/ˈfriː.kwənt.li/", example: "I frequently visit my parents." },
        { word: "Generate", meaning: "উৎপন্ন করা", pronunciation: "/ˈdʒen.ər.eɪt/", example: "Solar panels generate electricity." },
        { word: "Hypothesis", meaning: "অনুমান", pronunciation: "/haɪˈpɒθ.ə.sɪs/", example: "We need to test this hypothesis." },
        { word: "Innovation", meaning: "উদ্ভাবন", pronunciation: "/ˌɪn.əˈveɪ.ʃən/", example: "Innovation drives progress." }
      ]
    }
  };

  const currentLevel = levelData[levelId] || levelData.a1;

  const toggleBookmark = (word) => {
    if (bookmarked.includes(word)) {
      setBookmarked(bookmarked.filter(w => w !== word));
    } else {
      setBookmarked([...bookmarked, word]);
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  // Scroll অ্যানিমেশন কম্পোনেন্ট
  const WordCard = ({ wordData, index }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    const isBookmarked = bookmarked.includes(wordData.word);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        className="bg-white rounded-xl shadow-lg p-6 mb-4 border-l-4 border-indigo-500 hover:border-indigo-600 transition-all"
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900">{wordData.word}</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => speak(wordData.word)}
                className="p-2 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-indigo-600" />
              </motion.button>
            </div>
            <p className="text-gray-500 text-sm mb-2">{wordData.pronunciation}</p>
            <p className="text-xl text-indigo-600 font-semibold mb-2">{wordData.meaning}</p>
            <p className="text-gray-600 italic">"{wordData.example}"</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleBookmark(wordData.word)}
            className="p-2"
          >
            <Star
              className={`w-6 h-6 ${
                isBookmarked ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>হোম</span>
            </Link>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-indigo-100 rounded-lg relative"
              >
                <Bookmark className="w-5 h-5 text-indigo-600" />
                {bookmarked.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {bookmarked.length}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Level Info */}
      <section className={`bg-gradient-to-r from-${currentLevel.color}-400 to-${currentLevel.color}-600 text-white py-12`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-2">{currentLevel.title}</h1>
            <p className="text-xl opacity-90">{currentLevel.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Words List - Scroll Animation */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {currentLevel.words.map((wordData, index) => (
            <WordCard key={index} wordData={wordData} index={index} />
          ))}
        </div>
      </section>

      {/* Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 h-1 bg-indigo-600 origin-left"
        style={{ 
          width: `${(bookmarked.length / currentLevel.words.length) * 100}%`,
          maxWidth: '100%'
        }}
      />
    </div>
  );
};

export default LevelPage;