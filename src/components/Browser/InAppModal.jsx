// src/components/InAppModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chrome, ExternalLink, X, Copy, Check } from 'lucide-react';

const InAppModal = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;

  const openInChrome = () => {
    // Android: chrome:// or intent
    if (/Android/i.test(navigator.userAgent)) {
      const intentUrl = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=http;package=com.android.chrome;end`;
      window.location.href = intentUrl;
      return;
    }
    // iOS: try to open in Chrome using googlechrome:// scheme
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      const chromeUrl = `googlechrome://${window.location.host}${window.location.pathname}`;
      window.location.href = chromeUrl;
      // fallback: if chrome not installed, show copy option
    }
    // Fallback: copy link
    copyLink();
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              ⚠️ বাহিরের ব্রাউজারে খুলুন
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              আপনি একটি ইন-অ্যাপ ব্রাউজার ব্যবহার করছেন। সম্পূর্ণ অভিজ্ঞতা ও ভয়েস ফিচার পেতে <br />
              <span className="font-semibold">গুগল ক্রোম</span> অথবা আপনার ডিফল্ট ব্রাউজারে খুলুন।
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {/* Open in Chrome button */}
            <button
              onClick={openInChrome}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition shadow-lg"
            >
              <Chrome className="w-5 h-5" />
              গুগল ক্রোমে খুলুন
            </button>

            {/* Copy link button */}
            <button
              onClick={copyLink}
              className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  লিংক কপি হয়েছে
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  লিংক কপি করুন
                </>
              )}
            </button>

            <p className="text-xs text-gray-400 text-center mt-2">
              লিংক কপি করে আপনার ব্রাউজারে পেস্ট করুন
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InAppModal;