import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LevelPage from './components/LevelPage';
import Navbar from './components/Navabar';
import StartNow from './components/Start';
import VocList from './components/Voclist';
import Login from './components/User_Auth/Login';
import Register from './components/User_Auth/Register';
import { AuthProvider } from './components/AuthContext/AuthContext';
import BasicList from './components/Section/Basic';
import Intermediate from "./components/Section/Intermediate";
import Advanced from './components/Section/Advanced';
import IrregularVerb from './components/Section/Irregularverb';
import KidsLearning from './components/Section/KidsLearning';
import Alphabet from './components/Kidside/Alphabet';
import Quiz from './components/Kidside/Quiz';
import Number from './components/Kidside/Number';
import Stories from './components/Kidside/Stories';
import { NotificationProvider } from "./components/context/Notificationcontext";
import Phrese from "./components/Section/Phrese";
import ProtctedRoute from './components/Auterouter/Protctedroute';
import WordDetails from './components/Section/Worddetails';
import { HelmetProvider } from 'react-helmet-async';
import TermsConditions from './components/Policy/Termsconditions';
import About from './components/Policy/About';
import PrivacyPolicy from './components/Policy/Privacypolicy';
import Contact from './components/Policy/Contact';
import Grammar from './components/Section/Garmmer';
import {GoogleOAuthProvider}from '@react-oauth/google';
import ErrorHandla from './components/ErrorPage/ErrorHandla';
import Profile_body from './components/Profile_Section/Profile_body';
import UserB from './components/Browser/UseBrowserDetection';
import InAppModal from './components/Browser/InAppModal';
import {useState}from 'react';     

function App() {
  const GoogleAuthWrapper=()=>{
    return (
      <GoogleOAuthProvider clientId='946839756651-ee2qm7eft0f77hg522jpbgvhreoefbi5.apps.googleusercontent.com' >
      <Login/>
    </GoogleOAuthProvider>
    )
    
  }
  const {isInAppBrowser}=UserB();

  const [modelOpen,setModelOpen]=useState(true);

  return (
    <HelmetProvider>
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <Navbar />
          {isInAppBrowser && modelOpen && (
            <InAppModal onClose={() => setModelOpen(false)} />
          )}
          <Routes>
            <Route path='/'element={<Home/>}/>
            <Route path='/login' element={<GoogleAuthWrapper/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/word/:word' element={<WordDetails/>}/>
            <Route path="/terms" element={<TermsConditions/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/*' element={
            <ErrorHandla/>
          }/>
            <Route path='/basic' element={
              <ProtctedRoute>
                <BasicList/>
              </ProtctedRoute>
            }/>
            <Route path='/inter' element={
              <ProtctedRoute>
                <Intermediate/>
              </ProtctedRoute>
            }/>
            <Route path='/advanced' element={
              <ProtctedRoute>
                <Advanced/>
              </ProtctedRoute>
            }/>
             <Route path='/voc' element={
              <ProtctedRoute>
                <VocList/>
              </ProtctedRoute>
            }/>
            <Route path="/level/:levelId" element={
              <ProtctedRoute>
                <LevelPage/>
              </ProtctedRoute>
            }/>

             <Route path="/start" element={
              <ProtctedRoute>
                <StartNow/>
              </ProtctedRoute>
            }/>
             <Route path="/irregula" element={
              <ProtctedRoute>
                <IrregularVerb/>
              </ProtctedRoute>
            }/>
            <Route path="/kid" element={
              <ProtctedRoute>
                <KidsLearning/>
              </ProtctedRoute>
            }/>
            <Route path="/alp" element={
              <ProtctedRoute>
                <Alphabet/>
              </ProtctedRoute>
            }/>

            <Route path="/quiz" element={
              <ProtctedRoute>
                <Quiz/>
              </ProtctedRoute>
            }/>
            <Route path="/number" element={
              <ProtctedRoute>
                <Number/>
              </ProtctedRoute>
            }/>

            <Route path="/stories" element={
              <ProtctedRoute>
                <Stories/>
              </ProtctedRoute>
            }/>

            <Route path="/phrese" element={
              <ProtctedRoute>
                <Phrese/>
              </ProtctedRoute>
            }/>
            <Route path="/grammar" element={
              <ProtctedRoute>
                <Grammar/>
              </ProtctedRoute>
            }/>

             <Route path='/profile' element={<ProtctedRoute>
            <Profile_body/>
          </ProtctedRoute>}/>
          
          </Routes>
         
          
        </NotificationProvider>
      </AuthProvider>
    </Router>
    </HelmetProvider>
  );
}

export default App;