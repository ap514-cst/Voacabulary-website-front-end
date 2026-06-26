import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Connect to Socket.io server
   const socket = io(
  "https://voacabulary-website-back-end-2.onrender.com",
  {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  }
);

    socket.on('new-word', (data) => {
      // Add new notification at the top
      setNotifications(prev => [data, ...prev]);
      setUnreadCount(prev => prev + 1);
    });

    return () => socket.disconnect();
  }, []);

  const markAsRead = (index) => {
    setUnreadCount(prev => Math.max(0, prev - 1));
    // Optionally remove notification or mark read
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    clearAll
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};