// src/hooks/useBrowserDetection.js
import { useState, useEffect } from 'react';

const UseBrowserDetection = () => {
  const [browserInfo, setBrowserInfo] = useState({
    isMessenger: false,
    isInstagram: false,
    isFacebook: false,
    isInAppBrowser: false,
    isChrome: false,
    isSafari: false,
    isIOS: false,
    isAndroid: false,
    isStandalone: false,
    userAgent: '',
  });

  useEffect(() => {
    const ua = navigator.userAgent || '';
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    const isChrome = /Chrome/i.test(ua) && !/Edg/i.test(ua);
    const isSafari = /Safari/i.test(ua) && !/Chrome/i.test(ua);
    const isStandalone = window.navigator.standalone === true;
    
    // Detect Facebook Messenger (contains 'FBAN' or 'FBAV' and 'Messenger')
    const isMessenger = /FBAN|FBAV/i.test(ua) && /Messenger/i.test(ua);
    // Detect Instagram (contains 'Instagram')
    const isInstagram = /Instagram/i.test(ua);
    // Detect Facebook app (contains 'FBAN')
    const isFacebook = /FBAN/i.test(ua) && !isMessenger;
    
    // In-app browsers often have no 'Safari' or 'Chrome' in UA or contain 'WebView'
    const isWebView = /; wv\)/.test(ua) || /WebView/i.test(ua);
    const isInAppBrowser = isMessenger || isInstagram || isFacebook || isWebView;

    setBrowserInfo({
      isMessenger,
      isInstagram,
      isFacebook,
      isInAppBrowser,
      isChrome,
      isSafari,
      isIOS,
      isAndroid,
      isStandalone,
      userAgent: ua,
    });
  }, []);

  return browserInfo;
};

export default UseBrowserDetection;