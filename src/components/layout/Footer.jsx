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
 * Interactions:
 *   Links: opacity + translateX(4px) on hover — subtle forward nudge
 *   Social: translateY(-3px) + scale(1.15) + colour → mint
 *   No external animation deps — pure CSS transitions
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home',      path: '/'        },
  { label: 'About Us',  path: '/about'   },
  { label: 'Services',  path: '/services'},
  { label: 'Pricing',   path: '/pricing' },
  { label: 'Contact',   path: '/contact' },
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
  {
    icon: MapPin,
    text: '13891 Oswego Street, Aurora CO',
    href: 'https://maps.google.com',
  },
  {
    icon: Phone,
    text: '+1 (000) 222-2890',
    href: 'tel:+10002222890',
  },
  {
    icon: Mail,
    text: 'info@raahhealth.org',
    href: 'mailto:info@raahhealth.org',
  },
];

const SOCIALS = [
  { Icon: Facebook,  href: '#', label: 'Facebook'  },
  { Icon: Twitter,   href: '#', label: 'Twitter'   },
  { Icon: Linkedin,  href: '#', label: 'LinkedIn'  },
  { Icon: Instagram, href: '#', label: 'Instagram' },
];

const LEGAL = [
  { label: 'Privacy Policy',    path: '/privacy'  },
  { label: 'Terms of Service',  path: '/terms'    },
  { label: 'HIPAA Compliance',  path: '/hipaa'    },
];

// ─── Shared style tokens ───────────────────────────────────────────────────────
const FONT_INTER   = "'Inter', sans-serif";
const FONT_POPPINS = "'Poppins', sans-serif";

const colHeadingStyle = {
  fontFamily: FONT_INTER,
  fontWeight: 700,
  fontSize: '0.95rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#ffffff',
  paddingLeft: '14px',
  borderLeft: '3px solid #4ade80',
  lineHeight: 1,
  marginBottom: '28px',
  display: 'block',
};

const linkBaseStyle = {
  fontFamily: FONT_POPPINS,
  fontSize: '0.9375rem',
  fontWeight: 400,
  color: 'rgba(255,255,255,0.78)',
  textDecoration: 'none',
  display: 'inline-block',
  transition: 'color 0.2s ease, transform 0.2s ease',
  lineHeight: 1,
};

// ─── FooterLink — with nudge hover ────────────────────────────────────────────
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

// ─── FooterExternalLink ───────────────────────────────────────────────────────
const FooterExternalLink = ({ href, children }) => (
  <a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel="noreferrer"
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
  </a>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'linear-gradient(160deg, #052e16 0%, #064e3b 45%, #052e16 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Background texture — dot grid ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      {/* ── Radial glow — top right ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-80px', right: '-80px',
          width: '480px', height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22,163,74,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Radial glow — bottom left ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-60px', left: '-60px',
          width: '360px', height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22,163,74,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ══════════════════════════════════════════
          MAIN FOOTER BODY
      ══════════════════════════════════════════ */}
      <div
        className="container-custom"
        style={{ position: 'relative', zIndex: 1, paddingTop: '80px', paddingBottom: '60px' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1.4fr',
            gap: '48px',
          }}
          className="footer-grid"
        >

          {/* ── COLUMN 1 — Brand ── */}
          <div>
            {/* Logo */}
            <Link to="/" style={{ display: 'inline-block', marginBottom: '24px' }}>
              <img
                src="/raah.png"
                alt="RAAH Technologies"
                style={{
                  height: '64px',
                  width: 'auto',
                  display: 'block',
                  filter: 'brightness(1.1)',
                  transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                  transformOrigin: 'left center',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
            </Link>

            {/* Brand statement */}
            <p
              style={{
                fontFamily: FONT_POPPINS,
                fontSize: '0.9375rem',
                fontWeight: 400,
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.70)',
                marginBottom: '32px',
                maxWidth: '280px',
              }}
            >
              The end-to-end platform built exclusively for home health agencies. Clinical, operational, and financial workflows in one connected system.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(74,222,128,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.70)',
                    transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background   = 'rgba(74,222,128,0.15)';
                    e.currentTarget.style.borderColor  = 'rgba(74,222,128,0.50)';
                    e.currentTarget.style.color        = '#4ade80';
                    e.currentTarget.style.transform    = 'translateY(-3px) scale(1.1)';
                    e.currentTarget.style.boxShadow    = '0 6px 18px rgba(74,222,128,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background   = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.borderColor  = 'rgba(74,222,128,0.15)';
                    e.currentTarget.style.color        = 'rgba(255,255,255,0.70)';
                    e.currentTarget.style.transform    = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow    = 'none';
                  }}
                >
                  {React.createElement(Icon, { size: 17, strokeWidth: 1.75 })}
                </a>
              ))}
            </div>
          </div>

          {/* ── COLUMN 2 — Navigation ── */}
          <div>
            <span style={colHeadingStyle}>Navigation</span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {SOLUTIONS.map(item => (
                <li key={item}>
                  <span
                    style={{
                      fontFamily: FONT_POPPINS,
                      fontSize: '0.9375rem',
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.78)',
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

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {CONTACT.map(({ icon, text, href }) => (
                <li key={text}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.80'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                  >
                    {/* Icon circle */}
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '9px',
                        background: 'rgba(74,222,128,0.10)',
                        border: '1px solid rgba(74,222,128,0.20)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px',
                      }}
                    >
                      {React.createElement(icon, { size: 15, color: '#4ade80', strokeWidth: 1.75 })}
                    </div>
                    <span
                      style={{
                        fontFamily: FONT_POPPINS,
                        fontSize: '0.9rem',
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.82)',
                        lineHeight: 1.6,
                        paddingTop: '7px',
                      }}
                    >
                      {text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA pill */}
            <div style={{ marginTop: '32px' }}>
              <Link
                to="/demo"
                style={{
                  fontFamily: FONT_INTER,
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '12px 22px',
                  borderRadius: '999px',
                  background: '#16a34a',
                  color: '#ffffff',
                  border: '1.5px solid #16a34a',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.22s ease',
                  boxShadow: '0 4px 16px rgba(22,163,74,0.28)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = 'transparent';
                  e.currentTarget.style.borderColor = '#4ade80';
                  e.currentTarget.style.color       = '#4ade80';
                  e.currentTarget.style.transform   = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow   = 'none';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = '#16a34a';
                  e.currentTarget.style.borderColor = '#16a34a';
                  e.currentTarget.style.color       = '#ffffff';
                  e.currentTarget.style.transform   = 'translateY(0)';
                  e.currentTarget.style.boxShadow   = '0 4px 16px rgba(22,163,74,0.28)';
                }}
              >
                Request a Demo
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════════ */}
        <div
          style={{
            marginTop: '60px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(74,222,128,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Copyright */}
          <p
            style={{
              fontFamily: FONT_POPPINS,
              fontSize: '0.8375rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.42)',
              margin: 0,
              letterSpacing: '0.02em',
            }}
          >
            &copy; {year} RAAH Technologies. All rights reserved.
          </p>

          {/* Legal links */}
          <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
            {LEGAL.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                style={{
                  fontFamily: FONT_POPPINS,
                  fontSize: '0.8375rem',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.42)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#4ade80'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.42)'; }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* ── Mobile responsive grid — injected as a style tag ── */}
      <style>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>

    </footer>
  );
};

export default Footer;