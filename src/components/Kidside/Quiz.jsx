import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  XCircle, 
  Award,
  HelpCircle,
  Sun,
  Moon,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Sample quiz data - replace with your API data later
const sampleQuizData = [
  {
    id: 1,
    question: "What is the plural of 'child'?",
    options: [
      { text: "Childs", letter: "A" },
      { text: "Childes", letter: "B" },
      { text: "Children", letter: "C" },
      { text: "Childrens", letter: "D" }
    ],
    correct: "C"
  },
  {
    id: 2,
    question: "Which word is a verb?",
    options: [
      { text: "Beautiful", letter: "A" },
      { text: "Quickly", letter: "B" },
      { text: "Run", letter: "C" },
      { text: "Happy", letter: "D" }
    ],
    correct: "C"
  },
  {
    id: 3,
    question: "What does 'excited' mean?",
    options: [
      { text: "Bored", letter: "A" },
      { text: "Happy and enthusiastic", letter: "B" },
      { text: "Sad", letter: "C" },
      { text: "Tired", letter: "D" }
    ],
    correct: "B"
  },
  {
    id: 4,
    question: "Choose the correct spelling:",
    options: [
      { text: "Recieve", letter: "A" },
      { text: "Receive", letter: "B" },
      { text: "Reecive", letter: "C" },
      { text: "Receeve", letter: "D" }
    ],
    correct: "B"
  },
  {
    id: 5,
    question: "What is the past tense of 'go'?",
    options: [
      { text: "Goed", letter: "A" },
      { text: "Gone", letter: "B" },
      { text: "Went", letter: "C" },
      { text: "Going", letter: "D" }
    ],
    correct: "C"
  }
];

const Quiz = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [quizData, setQuizData] = useState(sampleQuizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // In a real implementation, fetch quiz data from API here
  useEffect(() => {
    // Uncomment below to fetch from your backend
    // fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:2002/api/quiz');
      const data = await response.json();
      setQuizData(data);
    } catch (err) {
      setError('Failed to load quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length;
  const selectedAnswer = selectedAnswers[currentQuestion.id];
  const isAnswered = !!selectedAnswer;

  const handleSelectAnswer = (letter) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: letter
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz finished, show results
      setIsSubmitted(true);
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setShowResult(false);
  };

  const calculateScore = () => {
    let score = 0;
    quizData.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchQuizData}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = (score / totalQuestions) * 100;
    let grade = '';
    let emoji = '';
    if (percentage >= 90) {
      grade = 'Excellent!';
      emoji = '🎉';
    } else if (percentage >= 70) {
      grade = 'Good job!';
      emoji = '👍';
    } else if (percentage >= 50) {
      grade = 'Nice try!';
      emoji = '📚';
    } else {
      grade = 'Keep learning!';
      emoji = '💪';
    }

    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        <Helmet>
          <title>Quiz</title>
        </Helmet>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`max-w-md w-full rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="p-6 text-center">
            <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Quiz Completed! {emoji}
            </h2>
            <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              You scored {score} out of {totalQuestions}
            </p>
            <div className="w-full h-4 bg-gray-200 rounded-full mb-6">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className={`text-xl font-semibold mb-6 ${darkMode ? 'text-yellow-400' : 'text-indigo-600'}`}>
              {grade}
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
              >
                Try Again
              </button>
              <Link to="/" className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition text-center">
                Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      
      {/* Header */}
      <div className={`sticky top-20 z-30 backdrop-blur-md shadow-sm py-4 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Link to="/" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <ChevronLeft className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
              </Link>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Vocabulary Quiz
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Test your knowledge
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-gray-700 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
                Question {currentQuestionIndex + 1} / {totalQuestions}
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-all ${darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Question Card */}
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-3 mb-6">
                <HelpCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                <h2 className={`text-xl md:text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswer === option.letter;
                  const isCorrect = isSubmitted && option.letter === currentQuestion.correct;
                  const isWrong = isSubmitted && isSelected && option.letter !== currentQuestion.correct;

                  return (
                    <motion.button
                      key={option.letter}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => !isSubmitted && handleSelectAnswer(option.letter)}
                      disabled={isSubmitted}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected && !isSubmitted
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30'
                          : isCorrect && isSubmitted
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : isWrong && isSubmitted
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : darkMode
                          ? 'border-gray-700 hover:border-indigo-500 bg-gray-700'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        isSelected && !isSubmitted
                          ? 'bg-indigo-600 text-white'
                          : isCorrect && isSubmitted
                          ? 'bg-green-500 text-white'
                          : isWrong && isSubmitted
                          ? 'bg-red-500 text-white'
                          : darkMode
                          ? 'bg-gray-600 text-gray-300'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {option.letter}
                      </div>
                      <span className={`flex-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {option.text}
                      </span>
                      {isCorrect && isSubmitted && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {isWrong && isSubmitted && <XCircle className="w-5 h-5 text-red-500" />}
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className={`px-6 py-2 rounded-full flex items-center gap-2 transition ${
                    currentQuestionIndex === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : darkMode
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {!isSubmitted ? (
                  <button
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    className={`px-6 py-2 rounded-full flex items-center gap-2 transition ${
                      !selectedAnswer
                        ? 'opacity-50 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowResult(true)}
                    className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                  >
                    See Results
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;