/**
 * main.jsx — RAAH Technologies
 *
 * Single entry point.
 * BrowserRouter — single router context, never duplicated in App.jsx.
 * GoogleReCaptchaProvider — wraps the entire app so any page can call
 *   useGoogleReCaptcha() to generate v3 tokens invisibly on form submit.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  </React.StrictMode>
);