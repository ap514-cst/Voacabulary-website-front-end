// src/hooks/useBrowserDetection.js

import { useEffect, useState } from "react";

const useBrowserDetection = () => {
  const [browserInfo, setBrowserInfo] = useState({
    isInAppBrowser: false,
    browserName: "Unknown",
    userAgent: "",
  });

  useEffect(() => {
    const ua = navigator.userAgent || "";

    // In-App Browser Detection
    const checks = {
      Facebook: /FBAN|FBAV/i.test(ua),
      Messenger: /Messenger|FB_IAB/i.test(ua),
      Instagram: /Instagram/i.test(ua),
      WhatsApp: /WhatsApp/i.test(ua),
      TikTok: /TikTok/i.test(ua),
      Line: /\bLine\b/i.test(ua),
      Snapchat: /Snapchat/i.test(ua),
      Telegram: /Telegram/i.test(ua),
      LinkedIn: /LinkedInApp/i.test(ua),
      WeChat: /MicroMessenger/i.test(ua),
      Pinterest: /Pinterest/i.test(ua),
      Twitter: /Twitter/i.test(ua),
      Gmail: /GSA/i.test(ua),
      AndroidWebView:
        /\bwv\b/i.test(ua) ||
        (/Android/i.test(ua) && /Version\/[\d.]+/i.test(ua)),
      iOSWebView:
        /iPhone|iPad|iPod/i.test(ua) &&
        /AppleWebKit/i.test(ua) &&
        !/Safari/i.test(ua),
    };

    const browserName =
      Object.keys(checks).find((key) => checks[key]) || "Browser";

    const isInAppBrowser = Object.values(checks).some(Boolean);

    setBrowserInfo({
      isInAppBrowser,
      browserName,
      userAgent: ua,
    });
  }, []);

  return browserInfo;
};

export default useBrowserDetection;