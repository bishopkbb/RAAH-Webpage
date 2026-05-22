/**
 * main.jsx — RAAH Technologies
 *
 * Single entry point. BrowserRouter lives here — the one and only router context.
 *
 * Fix applied: the original main.jsx had a duplicate BrowserRouter import that
 * was never used (App.jsx provided its own Router). Cleaned to a single provider.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);