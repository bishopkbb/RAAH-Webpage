/**
 * App.jsx — RAAH Technologies
 *
 * Route definitions only. BrowserRouter lives in main.jsx — never here.
 *
 * Fix applied: the original App.jsx wrapped everything in <Router> (BrowserRouter)
 * while main.jsx also wrapped <App /> in <BrowserRouter>. This caused a nested
 * router warning and broke useSearchParams / useParams on some React Router
 * versions. Removed the inner Router — main.jsx owns the single router context.
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage          from './pages/HomePage';
import AboutPage         from './pages/AboutPage';
import ServicesPage      from './pages/ServicesPage';
import ContactPage       from './pages/ContactPage';
import DemoRequestPage   from './pages/DemoRequestPage';
import PricingRequestPage from './pages/PricingRequestPage';
import QuotePage         from './pages/QuotePage';
import SuccessPage       from './pages/SuccessPage';

function App() {
  return (
    <Routes>
      <Route path="/"               element={<HomePage />} />
      <Route path="/about"          element={<AboutPage />} />
      <Route path="/services"       element={<ServicesPage />} />
      <Route path="/contact"        element={<ContactPage />} />

      {/* Lead capture forms */}
      <Route path="/demo"           element={<DemoRequestPage />} />
      <Route path="/pricing"        element={<PricingRequestPage />} />

      {/* Subscription flow */}
      <Route path="/quote/:token"   element={<QuotePage />} />
      <Route path="/signup-success" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;