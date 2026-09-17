// src/config/api.js

// ✅ Vite environment variables থেকে API URL নিন
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL// || 'http://localhost:2002/api';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL //|| 'http://localhost:2002';
export const AUDIO_URL = import.meta.env.VITE_AUDIO_URL// || 'http://localhost:5000';
export const APP_URL = import.meta.env.VITE_APP_URL //|| 'http://localhost:5173';

// ✅ Pre-built endpoints
export const API_ENDPOINTS = {
  // Users
  login: `${API_BASE_URL}/users/login`,
  register: `${API_BASE_URL}/users/register`,
  googleAuth: `${API_BASE_URL}/auth/google`,

  // Vocabulary
  vocGet: `${API_BASE_URL}/data/vocGET`,
  vocPost: `${API_BASE_URL}/data/vocPOST`,
  vocByLevel: (level) => `${API_BASE_URL}/data/vocGET/level?level=${level}`,

  // Phrases
  phrasesGet: `${API_BASE_URL}/phrese/getphrese`,

  // Irregular verbs
  irregularGet: `${API_BASE_URL}/data/irrGet`,

  // Word details (dynamic)
  wordDetails: (word) => `${API_BASE_URL}/word/${word}`,

  // Audio
  audio: (path) => `${AUDIO_URL}/${path}`,
};

export default API_ENDPOINTS;