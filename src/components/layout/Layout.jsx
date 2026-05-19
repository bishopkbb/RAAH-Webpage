/**
 * Layout.jsx — RAAH Technologies
 *
 * Shell wrapper used by every page.
 *
 * Props:
 *   hideNav  {boolean}  — Pass true on HomePage so Navbar isn't rendered
 *                         here (the hero carousel renders its own heroMode
 *                         Navbar inside the green overlay). Defaults false.
 *
 * All other pages leave hideNav unset → they get the standard solid Navbar.
 */

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, hideNav = false }) => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Standard solid navbar for inner pages */}
      {!hideNav && <Navbar />}

      {/* Page content */}
      <main className="flex-grow">
        {children}
      </main>

      <Footer />

      {/* Global toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#111827',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
          },
          success: {
            iconTheme: { primary: '#16a34a', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#dc2626', secondary: '#fff' },
          },
        }}
      />
    </div>
  );
};

export default Layout;