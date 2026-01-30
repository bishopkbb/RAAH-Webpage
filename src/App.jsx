import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import DemoRequestPage from './pages/DemoRequestPage';
import PricingRequestPage from './pages/PricingRequestPage';
import QuotePage from './pages/QuotePage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Lead Forms */}
        <Route path="/demo" element={<DemoRequestPage />} />
        <Route path="/pricing" element={<PricingRequestPage />} />
        
        {/* Subscription Flow */}
        <Route path="/quote/:token" element={<QuotePage />} />
        <Route path="/signup-success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;