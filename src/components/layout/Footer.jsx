/**
 * Footer.jsx — RAAH Technologies
 *
 * Design: Enterprise editorial. RAAH brand green (#052e16) background.
 * Same dot-grid texture and radial glows as the page section system.
 * Four columns: Brand · Navigation · Solutions · Contact.
 *
 * Typography: Inter (headings, labels) + Poppins (body, links).
 * Colours:
 *   Background  #052e16 gradient
 *   Text        rgba(255,255,255,0.88) — high visibility, not harsh
 *   Headings    #ffffff Inter 700
 *   Accent      #4ade80 (mint) — column border, link hover, icons
 *   Muted       rgba(255,255,255,0.45)
 *
 * Mobile enhancements:
 *   • All content centered on mobile (<480px) with proper alignment
 *   • Column headings adapt for centered layout (border becomes bottom accent)
 *   • Contact items stack vertically with centered icons on mobile
 *   • Social icons centered with equal spacing
 *   • Fluid spacing with clamp() throughout
 *   • Safe-area padding for notched devices
 *   • Touch-friendly tap targets (min 44px)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

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

// ✅ UPDATED CONTACT INFO
const CONTACT = [
  { icon: MapPin, text: '22960 E Roxbury Dr., Unit D, Aurora, CO, 80016', href: 'https://maps.google.com/?q=22960+E+Roxbury+Dr+Unit+D+Aurora+CO' },
  { icon: Phone,  text: '720-666-4797',                                     href: 'tel:+17206664797' },
  { icon: Mail,   text: 'info@raahhealth.org',                              href: 'mailto:info@raahhealth.org' },
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

// ─── FooterLink — internal router link with nudge hover ──────────────────────
const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    style={linkBaseStyle}
    onMouseEnter={e => {
      e.currentTarget.style.color     = '#4ade80';
      e.currentTarget.style.transform = 'translateX(4px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color     = 'rgba(255,255,255,0.78)';
      e.currentTarget.style.transform = 'translateX(0)';
    }}
  >
    {children}
  </Link>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Global responsive styles for footer */}
      <style>{`
        .footer-root {
          --safe-bottom: env(safe-area-inset-bottom, 0px);
          font-size: clamp(14px, 1.5vw, 16px);
        }
        
        /* Mobile-first centering */
        .footer-mobile-center {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        /* ✅ NEW: Contact column shifted slightly left on mobile */
        .footer-contact-col {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: clamp(8px, 2vw, 12px);
        }
        @media (min-width: 768px) {
          .footer-contact-col {
            padding-left: 0;
            align-items: flex-start;
          }
        }
        @media (max-width: 479px) {
          .footer-contact-col {
            padding-left: clamp(4px, 1.5vw, 8px);
            align-items: center;
            text-align: center;
          }
        }
        
        /* Column heading: left border on desktop, bottom accent on mobile */
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
        }
        @media (min-width: 480px) {
          .footer-col-heading {
            padding-left: clamp(10px, 2vw, 14px);
            border-left: 3px solid #4ade80;
          }
        }
        @media (max-width: 479px) {
          .footer-col-heading {
            padding-bottom: clamp(8px, 2vw, 12px);
            border-bottom: 2px solid #4ade80;
            width: 100%;
            max-width: 200px;
          }
        }
        
        /* Footer links */
        .footer-link {
          font-family: ${POPPINS};
          font-size: clamp(0.875rem, 1.8vw, 0.9375rem);
          font-weight: 400;
          color: rgba(255,255,255,0.78);
          text-decoration: none;
          display: inline-block;
          transition: color 0.2s ease, transform 0.2s ease;
          line-height: 1.4;
        }
        .footer-link:hover {
          color: #4ade80;
          transform: translateX(4px);
        }
        @media (max-width: 479px) {
          .footer-link:hover {
            transform: translateX(0) scale(1.02);
          }
        }
        
        /* Social icons */
        .footer-socials {
          display: flex;
          gap: clamp(8px, 1.5vw, 10px);
          flex-wrap: wrap;
          justify-content: flex-start;
        }
        @media (max-width: 479px) {
          .footer-socials {
            justify-content: center;
          }
        }
        .footer-social-btn {
          width: clamp(36px, 7vw, 40px);
          height: clamp(36px, 7vw, 40px);
          border-radius: 10px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(74,222,128,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.70);
          transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
          text-decoration: none;
          flex-shrink: 0;
        }
        .footer-social-btn:hover {
          background: rgba(74,222,128,0.15);
          border-color: rgba(74,222,128,0.50);
          color: #4ade80;
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 6px 18px rgba(74,222,128,0.15);
        }
        
        /* Contact items */
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: clamp(10px, 2vw, 14px);
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        @media (max-width: 479px) {
          .footer-contact-item {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: clamp(8px, 2vw, 12px);
          }
        }
        .footer-contact-icon {
          width: clamp(32px, 6vw, 36px);
          height: clamp(32px, 6vw, 36px);
          border-radius: 9px;
          background: rgba(74,222,128,0.10);
          border: 1px solid rgba(74,222,128,0.20);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: clamp(0px, 0.5vw, 1px);
        }
        @media (max-width: 479px) {
          .footer-contact-icon {
            margin-top: 0;
          }
        }
        .footer-contact-text {
          font-family: ${POPPINS};
          font-size: clamp(0.85rem, 1.8vw, 0.9rem);
          font-weight: 400;
          color: rgba(255,255,255,0.82);
          line-height: 1.6;
          padding-top: clamp(4px, 1vw, 7px);
          word-break: break-word;
        }
        @media (max-width: 479px) {
          .footer-contact-text {
            padding-top: 0;
          }
        }
        
        /* Lists */
        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 2vw, 14px);
        }
        @media (max-width: 479px) {
          .footer-list {
            align-items: center;
          }
        }
        
        /* Solutions list items */
        .footer-solution-item {
          font-family: ${POPPINS};
          font-size: clamp(0.875rem, 1.8vw, 0.9375rem);
          font-weight: 400;
          color: rgba(255,255,255,0.78);
          line-height: 1.4;
        }
        
        /* Grid layout */
        .footer-grid {
          display: grid;
          gap: clamp(32px, 6vw, 48px);
          grid-template-columns: 1fr;
        }
        @media (min-width: 480px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1fr 1.4fr;
            gap: clamp(40px, 5vw, 56px);
          }
        }
        
        /* Column containers */
        .footer-col {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 479px) {
          .footer-col {
            align-items: center;
          }
        }
        
        /* Touch targets */
        @media (hover: none) and (pointer: coarse) {
          .footer-root a,
          .footer-root button {
            min-height: 44px;
            min-width: 44px;
            padding: 8px 12px;
          }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .footer-root * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <footer
        className="footer-root"
        role="contentinfo"
        style={{
          background: 'linear-gradient(160deg, #052e16 0%, #064e3b 45%, #052e16 100%)',
          position:   'relative',
          overflow:   'hidden',
          paddingBottom: 'var(--safe-bottom)',
        }}
      >
        {/* ── Dot grid texture ── */}
        <div
          aria-hidden="true"
          style={{
            position:        'absolute',
            inset:           0,
            backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.06) 1px, transparent 1px)',
            backgroundSize:  'clamp(24px, 4vw, 28px) clamp(24px, 4vw, 28px)',
            pointerEvents:   'none',
          }}
        />

        {/* ── Radial glow — top right ── */}
        <div
          aria-hidden="true"
          style={{
            position:     'absolute',
            top:          'clamp(-60px, -10vw, -80px)',
            right:        'clamp(-60px, -10vw, -80px)',
            width:        'clamp(360px, 60vw, 480px)',
            height:       'clamp(360px, 60vw, 480px)',
            borderRadius: '50%',
            background:   'radial-gradient(circle, rgba(22,163,74,0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Radial glow — bottom left ── */}
        <div
          aria-hidden="true"
          style={{
            position:     'absolute',
            bottom:       'clamp(-40px, -8vw, -60px)',
            left:         'clamp(-40px, -8vw, -60px)',
            width:        'clamp(280px, 50vw, 360px)',
            height:       'clamp(280px, 50vw, 360px)',
            borderRadius: '50%',
            background:   'radial-gradient(circle, rgba(22,163,74,0.10) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* ══════════════════════════════════════════
            MAIN FOOTER BODY
        ══════════════════════════════════════════ */}
        <div
          className="container-custom"
          style={{ 
            position: 'relative', 
            zIndex: 1, 
            paddingTop: 'clamp(48px, 8vw, 80px)', 
            paddingBottom: 'clamp(32px, 6vw, 60px)',
            paddingInline: 'clamp(20px, 4vw, 24px)',
          }}
        >
          <div className="footer-grid">

            {/* ── COLUMN 1 — Brand ── */}
            <div className="footer-col footer-mobile-center">
              <Link to="/" style={{ display: 'inline-block', marginBottom: 'clamp(16px, 3vw, 24px)' }}>
                <img
                  src="/raah.png"
                  alt="RAAH Technologies"
                  style={{
                    height:          'clamp(48px, 8vw, 64px)',
                    width:           'auto',
                    display:         'block',
                    filter:          'brightness(1.1)',
                    transition:      'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                    transformOrigin: 'center center',
                    margin: '0 auto',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              </Link>

              <p
                style={{
                  fontFamily:   POPPINS,
                  fontSize:     'clamp(0.875rem, 1.8vw, 0.9375rem)',
                  fontWeight:   400,
                  lineHeight:   1.75,
                  color:        'rgba(255,255,255,0.70)',
                  marginBottom: 'clamp(24px, 4vw, 32px)',
                  maxWidth:     '100%',
                  marginInline: 'auto',
                }}
              >
                The end-to-end platform built exclusively for home health agencies. Clinical, operational, and financial workflows in one connected system.
              </p>

              {/* Social icons — using React.createElement to avoid ESLint alias warnings */}
              <div className="footer-socials">
                {SOCIALS.map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="footer-social-btn"
                  >
                    {React.createElement(icon, { size: 17, strokeWidth: 1.75, color: 'rgba(255,255,255,0.70)' })}
                  </a>
                ))}
              </div>
            </div>

            {/* ── COLUMN 2 — Navigation ── */}
            <div className="footer-col footer-mobile-center">
              <span className="footer-col-heading">Navigation</span>
              <ul className="footer-list">
                {NAV_LINKS.map(({ label, path }) => (
                  <li key={label}>
                    <FooterLink to={path}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── COLUMN 3 — Solutions ─ */}
            <div className="footer-col footer-mobile-center">
              <span className="footer-col-heading">Solutions</span>
              <ul className="footer-list">
                {SOLUTIONS.map(item => (
                  <li key={item}>
                    <span className="footer-solution-item">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ─ COLUMN 4 — Contact (shifted slightly left) ── */}
            <div className="footer-col footer-contact-col">
              <span className="footer-col-heading">Contact Us</span>

              <ul className="footer-list" style={{ gap: 'clamp(16px, 3vw, 20px)', width: '100%' }}>
                {CONTACT.map(({ icon, text, href }) => (
                  <li key={text} style={{ width: '100%' }}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="footer-contact-item"
                      style={{ width: '100%' }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '0.80'; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                    >
                      {/* Icon square */}
                      <div className="footer-contact-icon">
                        {React.createElement(icon, { size: 15, color: '#4ade80', strokeWidth: 1.75 })}
                      </div>

                      <span className="footer-contact-text">{text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* ══════════════════════════════════════════
              BOTTOM BAR
          ══════════════════════════════════════════ */}
          <div
            style={{
              marginTop:      'clamp(40px, 8vw, 60px)',
              paddingTop:     'clamp(20px, 4vw, 28px)',
              borderTop:      '1px solid rgba(74,222,128,0.12)',
              display:        'flex',
              justifyContent: 'center',
              alignItems:     'center',
              flexWrap:       'wrap',
              gap:            'clamp(12px, 2vw, 16px)',
              textAlign:      'center',
              flexDirection:  'column',
            }}
          >
            {/* Copyright */}
            <p
              style={{
                fontFamily:    POPPINS,
                fontSize:      'clamp(0.78rem, 1.5vw, 0.8375rem)',
                fontWeight:    400,
                color:         'rgba(255,255,255,0.42)',
                margin:        0,
                letterSpacing: '0.02em',
                lineHeight:    1.4,
              }}
            >
              &copy; {year} RAAH Technologies. All rights reserved.
            </p>

            {/* Legal links placeholder — uncomment when pages exist */}
            {/*
            <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', marginTop: '8px' }}>
              <Link to="/privacy" className="footer-link" style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.8375rem)' }}>Privacy Policy</Link>
              <Link to="/terms" className="footer-link" style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.8375rem)' }}>Terms of Service</Link>
              <Link to="/hipaa" className="footer-link" style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.8375rem)' }}>HIPAA Compliance</Link>
            </div>
            */}
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;