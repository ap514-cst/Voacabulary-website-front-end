// src/components/InAppModal.jsx

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X, Copy, Check } from "lucide-react";
import { SiGooglechrome } from "react-icons/si";

const InAppModal = ({ onClose, browserName = "In-App Browser" }) => {
  const [copied, setCopied] = useState(false);

  const url = window.location.href;

  const handleClose = () => {
    if (onClose) onClose();
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };

  const openInChrome = () => {
    const ua = navigator.userAgent;

    // Android
    if (/Android/i.test(ua)) {
      const intent = `intent://${url.replace(
        /^https?:\/\//,
        ""
      )}#Intent;scheme=https;package=com.android.chrome;end`;

      window.location.href = intent;
      return;
    }

    // iPhone / iPad
    if (/iPhone|iPad|iPod/i.test(ua)) {
      const chromeUrl = url.replace(
        /^https?/,
        (match) => (match === "https" ? "googlechromes" : "googlechrome")
      );

      window.location.href = chromeUrl;
      return;
    }

    // Desktop
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-2xl"
        >
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
              <ExternalLink className="text-yellow-600" size={32} />
            </div>

            <h2 className="mb-2 text-xl font-bold">
              ⚠️ Open in Browser
            </h2>

            <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
              You are currently using
            </p>

            <p className="mb-4 font-semibold text-blue-600">
              {browserName}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              For the best experience (voice, login, microphone and full
              features), please open this website in Google Chrome or your
              default browser.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={openInChrome}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
            >
              <SiGooglechrome size={22} />
              Open in Chrome
            </button>

            <button
              onClick={copyLink}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 py-3 font-medium hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              {copied ? (
                <>
                  <Check className="text-green-500" size={20} />
                  Link Copied
                </>
              ) : (
                <>
                  <Copy size={20} />
                  Copy Link
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400">
              Copy the link and open it in Chrome or Safari if automatic opening
              doesn't work.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InAppModal;