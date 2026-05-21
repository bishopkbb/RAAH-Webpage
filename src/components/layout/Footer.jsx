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
 * ESLint fix:
 *   Using React.createElement with lowercase `icon` key instead of
 *   destructuring aliases to avoid 'defined but never used' warnings.
 *
 * Changes from original:
 *   — "Request a Demo" CTA button removed from Contact column.
 *   — Legal links (Privacy, Terms, HIPAA) commented out until pages exist.
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

const CONTACT = [
  { icon: MapPin, text: '13891 Oswego Street, Aurora CO', href: 'https://maps.google.com' },
  { icon: Phone,  text: '+1 (000) 222-2890',              href: 'tel:+10002222890'         },
  { icon: Mail,   text: 'info@raahhealth.org',            href: 'mailto:info@raahhealth.org'},
];

const SOCIALS = [
  { icon: Facebook,  href: '#', label: 'Facebook'  },
  { icon: Twitter,   href: '#', label: 'Twitter'   },
  { icon: Linkedin,  href: '#', label: 'LinkedIn'  },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

// Legal links — commented out until /privacy, /terms, /hipaa pages exist.
// Uncomment the LEGAL array and the bottom-bar block when ready.
//
// const LEGAL = [
//   { label: 'Privacy Policy',   path: '/privacy' },
//   { label: 'Terms of Service', path: '/terms'   },
//   { label: 'HIPAA Compliance', path: '/hipaa'   },
// ];

// ─── Style tokens ──────────────────────────────────────────────────────────────
const INTER   = "'Inter', sans-serif";
const POPPINS = "'Poppins', sans-serif";

const colHeadingStyle = {
  fontFamily:    INTER,
  fontWeight:    700,
  fontSize:      'clamp(0.875rem, 1.5vw, 0.95rem)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color:         '#ffffff',
  paddingLeft:   'clamp(10px, 2vw, 14px)',
  borderLeft:    '3px solid #4ade80',
  lineHeight:    1,
  marginBottom:  'clamp(20px, 4vw, 28px)',
  display:       'block',
};

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

// ─── FooterLink — internal router link with nudge hover ───────────────────────
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
    <footer
      role="contentinfo"
      style={{
        background: 'linear-gradient(160deg, #052e16 0%, #064e3b 45%, #052e16 100%)',
        position:   'relative',
        overflow:   'hidden',
      }}
    >

      {/* ── Dot grid texture ── */}
      <div
        aria-hidden="true"
        style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.06) 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
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
          paddingTop: 'clamp(60px, 10vw, 80px)', 
          paddingBottom: 'clamp(40px, 8vw, 60px)',
          paddingInline: 'clamp(16px, 4vw, 24px)',
        }}
      >
        <style>{`
          .footer-grid {
            display: grid;
            gap: clamp(32px, 6vw, 48px);
            grid-template-columns: 1fr;
          }
          @media (min-width: 480px) {
            .footer-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 768px) {
            .footer-grid { grid-template-columns: 1.5fr 1fr 1fr 1.4fr; }
          }
        `}</style>
        <div className="footer-grid">

          {/* ── COLUMN 1 — Brand ── */}
          <div>
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
                  transformOrigin: 'left center',
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
                maxWidth:     'clamp(240px, 40vw, 280px)',
              }}
            >
              The end-to-end platform built exclusively for home health agencies. Clinical, operational, and financial workflows in one connected system.
            </p>

            {/* Social icons — using React.createElement to avoid ESLint alias warnings */}
            <div style={{ display: 'flex', gap: 'clamp(8px, 1.5vw, 10px)', flexWrap: 'wrap' }}>
              {SOCIALS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    width:          'clamp(36px, 7vw, 40px)',
                    height:         'clamp(36px, 7vw, 40px)',
                    borderRadius:   '10px',
                    background:     'rgba(255,255,255,0.07)',
                    border:         '1px solid rgba(74,222,128,0.15)',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    color:          'rgba(255,255,255,0.70)',
                    transition:     'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                    textDecoration: 'none',
                    flexShrink:     0,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background  = 'rgba(74,222,128,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(74,222,128,0.50)';
                    e.currentTarget.style.color       = '#4ade80';
                    e.currentTarget.style.transform   = 'translateY(-3px) scale(1.1)';
                    e.currentTarget.style.boxShadow   = '0 6px 18px rgba(74,222,128,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background  = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.borderColor = 'rgba(74,222,128,0.15)';
                    e.currentTarget.style.color       = 'rgba(255,255,255,0.70)';
                    e.currentTarget.style.transform   = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow   = 'none';
                  }}
                >
                  {React.createElement(icon, { size: 17, strokeWidth: 1.75, color: 'rgba(255,255,255,0.70)' })}
                </a>
              ))}
            </div>
          </div>

          {/* ── COLUMN 2 — Navigation ── */}
          <div>
            <span style={colHeadingStyle}>Navigation</span>
            <ul
              style={{
                listStyle:      'none',
                padding:        0,
                margin:         0,
                display:        'flex',
                flexDirection:  'column',
                gap:            'clamp(10px, 2vw, 14px)',
              }}
            >
              {NAV_LINKS.map(({ label, path }) => (
                <li key={label}>
                  <FooterLink to={path}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COLUMN 3 — Solutions ── */}
          <div>
            <span style={colHeadingStyle}>Solutions</span>
            <ul
              style={{
                listStyle:     'none',
                padding:       0,
                margin:        0,
                display:       'flex',
                flexDirection: 'column',
                gap:           'clamp(10px, 2vw, 14px)',
              }}
            >
              {SOLUTIONS.map(item => (
                <li key={item}>
                  <span
                    style={{
                      fontFamily: POPPINS,
                      fontSize:   'clamp(0.875rem, 1.8vw, 0.9375rem)',
                      fontWeight: 400,
                      color:      'rgba(255,255,255,0.78)',
                      lineHeight: 1,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COLUMN 4 — Contact ── */}
          <div>
            <span style={colHeadingStyle}>Contact Us</span>

            {/* Contact items — using React.createElement to avoid ESLint alias warnings */}
            <ul
              style={{
                listStyle:     'none',
                padding:       0,
                margin:        0,
                display:       'flex',
                flexDirection: 'column',
                gap:           'clamp(16px, 3vw, 20px)',
              }}
            >
              {CONTACT.map(({ icon, text, href }) => (
                <li key={text}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    style={{
                      display:        'flex',
                      alignItems:     'flex-start',
                      gap:            'clamp(10px, 2vw, 14px)',
                      textDecoration: 'none',
                      transition:     'opacity 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.80'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1';    }}
                  >
                    {/* Icon square */}
                    <div
                      style={{
                        width:          'clamp(32px, 6vw, 36px)',
                        height:         'clamp(32px, 6vw, 36px)',
                        borderRadius:   '9px',
                        background:     'rgba(74,222,128,0.10)',
                        border:         '1px solid rgba(74,222,128,0.20)',
                        display:        'flex',
                        alignItems:     'center',
                        justifyContent: 'center',
                        flexShrink:     0,
                        marginTop:      'clamp(0px, 0.5vw, 1px)',
                      }}
                    >
                      {React.createElement(icon, { size: 15, color: '#4ade80', strokeWidth: 1.75 })}
                    </div>

                    <span
                      style={{
                        fontFamily: POPPINS,
                        fontSize:   'clamp(0.85rem, 1.8vw, 0.9rem)',
                        fontWeight: 400,
                        color:      'rgba(255,255,255,0.82)',
                        lineHeight: 1.6,
                        paddingTop: 'clamp(4px, 1vw, 7px)',
                        wordBreak:  'break-word',
                      }}
                    >
                      {text}
                    </span>
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
            }}
          >
            &copy; {year} RAAH Technologies. All rights reserved.
          </p>

          {/* ── Legal links — commented out until pages exist ──────────────
              Uncomment LEGAL array above and this block when
              /privacy, /terms, and /hipaa pages are ready.

          <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
            {LEGAL.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                style={{
                  fontFamily:     POPPINS,
                  fontSize:       '0.8375rem',
                  fontWeight:     400,
                  color:          'rgba(255,255,255,0.42)',
                  textDecoration: 'none',
                  transition:     'color 0.2s ease',
                  letterSpacing:  '0.02em',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#4ade80'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.42)'; }}
              >
                {label}
              </Link>
            ))}
          </div>
          ─────────────────────────────────────────────────────────────── */}

        </div>

      </div>

    </footer>
  );
};

export default Footer;