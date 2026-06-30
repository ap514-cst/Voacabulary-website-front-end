import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='946839756651-ee2qm7eft0f77hg522jpbgvhreoefbi5.apps.googleusercontent.com'>
    <App />
  </GoogleOAuthProvider>


)
