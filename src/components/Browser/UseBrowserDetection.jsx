// src/hooks/useBrowserDetection.js
import { useState, useEffect } from 'react';

const useBrowserDetection = () => {
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || '';
    const isMessenger = /FBAN|FBAV/i.test(ua) && /Messenger/i.test(ua);
    const isInstagram = /Instagram/i.test(ua);
    const isFacebook = /FBAN/i.test(ua) && !isMessenger;
    const isWhatsApp = /WhatsApp/i.test(ua);
    const isWebView = /; wv\)/.test(ua) || /WebView/i.test(ua);
    const isInApp = isMessenger || isInstagram || isFacebook || isWhatsApp || isWebView;
    setIsInAppBrowser(isInApp);
  }, []);

  return { isInAppBrowser };
};

export default useBrowserDetection;