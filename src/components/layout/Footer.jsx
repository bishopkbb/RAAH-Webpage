/**
 * Footer.jsx — RAAH Technologies
 *
 * Desktop Layout: 3 equal columns with proper spacing
 * - Solutions (Left-aligned): Green accent on left
 * - Brand (Center): Logo, description, socials, Contact button
 * - Navigation (Right-aligned): Green accent on right
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home',     path: '/'         },
  { label: 'About Us', path: '/about'    },
  { label: 'Services', path: '/services' },
  { label: 'Pricing',  path: '/pricing'  },
  { label: 'Contact',  path: '/contact'  },
];

const SOLUTIONS = [
  'Agency Management',
  'EVV Compliance',
  'Caregiver Mobile App',
  'Billing & Invoicing',
  'Clinical Documentation',
  'Scheduling & Dispatch',
];

const SOCIALS = [
  { icon: Facebook,  href: '#', label: 'Facebook'  },
  { icon: Twitter,   href: '#', label: 'Twitter'   },
  { icon: Linkedin,  href: '#', label: 'LinkedIn'  },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

// ─── Style tokens ──────────────────────────────────────────────────────────────
const INTER   = "'Inter', sans-serif";
const POPPINS = "'Poppins', sans-serif";

const linkBaseStyle = {
  fontFamily:     POPPINS,
  fontSize:       'clamp(0.875rem, 1.8vw, 0.9375rem)',
  fontWeight:     400,
  color:          'rgba(255,255,255,0.78)',
  textDecoration: 'none',
  display:        'inline-block',
  transition:     'color 0.2s ease, transform 0.2s ease',
  lineHeight:     1,
};

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    style={linkBaseStyle}
    onMouseEnter={e => {
      e.currentTarget.style.color     = '#4ade80';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color     = 'rgba(255,255,255,0.78)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    {children}
  </Link>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer-root {
          --safe-bottom: env(safe-area-inset-bottom, 0px);
          font-size: clamp(14px, 1.5vw, 16px);
        }
        
        /* Mobile centering */
        .footer-mobile-center {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        /* Hide Nav & Solutions on mobile */
        .footer-nav-col, .footer-solutions-col {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 479px) {
          .footer-nav-col, .footer-solutions-col { display: none !important; }
        }
        
        /* ✅ Solutions Column - Left aligned */
        @media (min-width: 768px) {
          .footer-solutions-col {
            text-align: left;
            align-items: flex-start;
          }
        }
        
        /* ✅ Navigation Column - Right aligned */
        @media (min-width: 768px) {
          .footer-nav-align-right {
            text-align: right;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }
          .footer-nav-align-right .footer-col-heading {
            /* Flip accent border to the right side */
            border-left: none;
            padding-left: 0;
            border-right: 3px solid #4ade80;
            padding-right: clamp(10px, 2vw, 14px);
          }
          .footer-nav-align-right .footer-list {
            align-items: flex-end;
          }
          .footer-nav-align-right .footer-link:hover {
            transform: translateX(-4px) !important;
          }
        }

        /* Contact Button */
        .footer-contact-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 1.5vw, 10px);
          padding: clamp(14px, 2.5vw, 16px) clamp(28px, 5vw, 36px);
          border-radius: 999px;
          background: #16a34a;
          color: #ffffff;
          border: 2px solid #16a34a;
          font-family: ${INTER};
          font-weight: 700;
          font-size: clamp(0.85rem, 1.8vw, 0.9375rem);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(22,163,74,0.30);
          margin-top: clamp(20px, 4vw, 28px);
          min-height: 48px;
        }
        .footer-contact-button:hover {
          background: transparent;
          color: #4ade80;
          border-color: #4ade80;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(74,222,128,0.40);
        }
        @media (max-width: 479px) {
          .footer-contact-button { width: 100%; max-width: 280px; margin-top: clamp(24px, 5vw, 32px); }
        }
        
        /* Column Headings (Default Left) */
        .footer-col-heading {
          font-family: ${INTER};
          font-weight: 700;
          font-size: clamp(0.875rem, 1.5vw, 0.95rem);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
          line-height: 1;
          margin-bottom: clamp(20px, 4vw, 28px);
          display: block;
          padding-left: clamp(10px, 2vw, 14px);
          border-left: 3px solid #4ade80;
        }
        @media (max-width: 479px) {
          .footer-col-heading {
            padding-left: 0;
            border-left: none;
            padding-bottom: clamp(8px, 2vw, 12px);
            border-bottom: 2px solid #4ade80;
            width: 100%;
            max-width: 200px;
          }
        }

        .footer-link { transition: color 0.2s ease, transform 0.2s ease; }
        .footer-link:hover { color: #4ade80; transform: translateX(4px); }
        @media (max-width: 479px) { .footer-link:hover { transform: translateX(0) scale(1.02); } }
        
        /* Socials */
        .footer-socials { display: flex; gap: clamp(8px, 1.5vw, 10px); flex-wrap: wrap; justify-content: center; }
        .footer-social-btn {
          width: clamp(36px, 7vw, 40px); height: clamp(36px, 7vw, 40px); border-radius: 10px;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(74,222,128,0.15);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.70); transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
          text-decoration: none; flex-shrink: 0;
        }
        .footer-social-btn:hover {
          background: rgba(74,222,128,0.15); border-color: rgba(74,222,128,0.50);
          color: #4ade80; transform: translateY(-3px) scale(1.1);
        }
        
        .footer-solution-item { font-family: ${POPPINS}; font-size: clamp(0.875rem, 1.8vw, 0.9375rem); color: rgba(255,255,255,0.78); line-height: 1.6; }
        .footer-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: clamp(10px, 2vw, 14px); }
        
        /* ✅ Grid Layout: 3 EQUAL columns on desktop */
        .footer-grid { display: grid; gap: clamp(32px, 6vw, 48px); grid-template-columns: 1fr; }
        @media (min-width: 480px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 768px) { 
          .footer-grid { grid-template-columns: 1fr 1fr 1fr; gap: clamp(40px, 5vw, 64px); } 
        }
        
        .footer-col { display: flex; flex-direction: column; }
        @media (max-width: 479px) { .footer-col { align-items: center; } }
        
        @media (hover: none) and (pointer: coarse) {
          .footer-root a { min-height: 44px; min-width: 44px; padding: 8px 12px; }
        }
        @media (prefers-reduced-motion: reduce) { .footer-root * { transition: none !important; animation: none !important; } }
      `}</style>

      <footer className="footer-root" role="contentinfo" style={{ background: 'linear-gradient(160deg, #052e16 0%, #064e3b 45%, #052e16 100%)', position: 'relative', overflow: 'hidden', paddingBottom: 'var(--safe-bottom)' }}>
        
        {/* Background Decorations */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.06) 1px, transparent 1px)', backgroundSize: 'clamp(24px, 4vw, 28px) clamp(24px, 4vw, 28px)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: 'clamp(-60px, -10vw, -80px)', right: 'clamp(-60px, -10vw, -80px)', width: 'clamp(360px, 60vw, 480px)', height: 'clamp(360px, 60vw, 480px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: 'clamp(-40px, -8vw, -60px)', left: 'clamp(-40px, -8vw, -60px)', width: 'clamp(280px, 50vw, 360px)', height: 'clamp(280px, 50vw, 360px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* ══════════════════════════════════════════ MAIN FOOTER BODY ══════════════════════════════════════════ */}
        <div className="container-custom" style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(48px, 8vw, 80px)', paddingBottom: 'clamp(32px, 6vw, 60px)', paddingInline: 'clamp(24px, 4vw, 48px)' }}>
          <div className="footer-grid">

            {/* ── COLUMN 1 — Solutions (Left-aligned) ── */}
            <div className="footer-col footer-solutions-col">
              <span className="footer-col-heading">Solutions</span>
              <ul className="footer-list">
                {SOLUTIONS.map(item => (
                  <li key={item}>
                    <span className="footer-solution-item">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── COLUMN 2 — Brand (Centered) ── */}
            <div className="footer-col footer-mobile-center">
              <Link to="/" style={{ display: 'inline-block', marginBottom: 'clamp(16px, 3vw, 24px)' }}>
                <img src="/raah.png" alt="RAAH Technologies" style={{ height: 'clamp(48px, 8vw, 64px)', width: 'auto', display: 'block', filter: 'brightness(1.1)', transition: 'transform 0.25s ease', transformOrigin: 'center center', margin: '0 auto' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }} />
              </Link>

              <p style={{ fontFamily: POPPINS, fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)', fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.70)', marginBottom: 'clamp(24px, 4vw, 32px)', maxWidth: '100%', marginInline: 'auto', textAlign: 'center' }}>
                The end-to-end platform built exclusively for home health agencies. Clinical, operational, and financial workflows in one connected system.
              </p>

              <div className="footer-socials">
                {SOCIALS.map(({ icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="footer-social-btn">
                    {React.createElement(icon, { size: 17, strokeWidth: 1.75, color: 'rgba(255,255,255,0.70)' })}
                  </a>
                ))}
              </div>

              <Link to="/contact" className="footer-contact-button">
                Contact Us
                <svg viewBox="0 0 16 16" fill="none" width="16" height="16" style={{ flexShrink: 0 }}>
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* ── COLUMN 3 — Navigation (Right-aligned) ── */}
            <div className="footer-col footer-nav-col footer-nav-align-right">
              <span className="footer-col-heading">Navigation</span>
              <ul className="footer-list">
                {NAV_LINKS.map(({ label, path }) => (
                  <li key={label}>
                    <FooterLink to={path}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* ══════════════════════════════════════════ BOTTOM BAR ══════════════════════════════════════════ */}
          <div style={{ marginTop: 'clamp(40px, 8vw, 60px)', paddingTop: 'clamp(20px, 4vw, 28px)', borderTop: '1px solid rgba(74,222,128,0.12)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 'clamp(12px, 2vw, 16px)', textAlign: 'center', flexDirection: 'column' }}>
            <p style={{ fontFamily: POPPINS, fontSize: 'clamp(0.78rem, 1.5vw, 0.8375rem)', fontWeight: 400, color: 'rgba(255,255,255,0.42)', margin: 0, letterSpacing: '0.02em', lineHeight: 1.4 }}>
              &copy; {year} RAAH Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;