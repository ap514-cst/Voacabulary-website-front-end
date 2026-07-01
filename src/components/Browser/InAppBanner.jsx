// src/components/InAppBanner.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, ExternalLink } from 'lucide-react';

const InAppBanner = ({ onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const openInBrowser = () => {
    // Try to open the current URL in external browser
    // For iOS, we can use window.open with a special scheme
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Open in Browser', url }).catch(() => {});
    } else {
      // For Android, we can use intent: scheme
      // For iOS, we can use the following:
      window.open(url, '_system');
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-0 right-0 z-50 mx-4 md:mx-auto max-w-4xl"
        >
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl shadow-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  ⚠️ আপনি Facebook Messenger / ইন-অ্যাপ ব্রাউজার থেকে খুলেছেন।
                </p>
                <p className="text-sm text-yellow-700">
                  ভয়েস ফিচার এই পরিবেশে কাজ নাও করতে পারে। দয়া করে Chrome বা আপনার ডিফল্ট ব্রাউজারে খুলুন।
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={openInBrowser}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                ব্রাউজারে খুলুন
              </button>
              <button
                onClick={handleClose}
                className="p-2 text-yellow-600 hover:text-yellow-800 transition"
                aria-label="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InAppBanner;