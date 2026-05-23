/**
 * Navbar.jsx — RAAH Technologies
 *
 * ARCHITECTURE:
 *   Both topbar and main nav are rendered inside a single fixed wrapper
 *   so they move as one unit and never overlap each other.
 *
 *   TOPBAR_H  = 56px at rest (generous, industry-standard)
 *   NAV_H     = 76px at rest → 58px scrolled
 *   TOTAL     = 132px at rest → 114px scrolled
 *
 *   A matching spacer div pushes page content below the fixed block.
 *   heroMode: the whole block is rendered inside HeroCarousel's overlay,
 *   position becomes relative (not fixed) and no spacer is needed.
 *
 * FIXES:
 *   ✦ No Icon alias in .map() — React.createElement with lowercase key
 *   ✦ No setState in effect body — mobile menu via onClick only
 *   ✦ ESLint-clean, zero unused imports
 *   ✦ Single toggle button: Menu ↔ X morph based on isOpen state
 *   ✦ Responsive improvements: fluid spacing, safe-area padding, proper breakpoints
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram, ChevronRight, X, Menu } from 'lucide-react';

// ─── Constants ─────────────────────────────────────────────────────────────────
const TOPBAR_H  = 56;   // px — topbar at rest
const NAV_H     = 76;   // px — main nav at rest
const NAV_H_SM  = 58;   // px — main nav scrolled
const FONT_I    = "'Inter', sans-serif";
const FONT_P    = "'Poppins', sans-serif";

// ─── Data ──────────────────────────────────────────────────────────────────────
const CONTACT_ITEMS = [
  { icon: MapPin, text: '13891 Oswego Street, Aurora CO', href: 'https://maps.google.com/?q=13891+Oswego+Street+Aurora+CO', external: true },
  { icon: Phone,  text: '+1 (000) 222-2890',              href: 'tel:+10002222890', external: false },
  { icon: Clock,  text: 'Mon – Fri  ·  8:00 AM – 6:00 PM', href: null, external: false },
];

const SOCIALS = [
  { icon: Facebook,  href: '#', label: 'Facebook'  },
  { icon: Twitter,   href: '#', label: 'Twitter'   },
  { icon: Linkedin,  href: '#', label: 'LinkedIn'  },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

const NAV_LINKS = [
  { name: 'Home',     path: '/'         },
  { name: 'About',    path: '/about'    },
  { name: 'Services', path: '/services' },
  { name: 'Contact',  path: '/contact'  },
];

// ─── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = ({ heroMode = false }) => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location  = useLocation();
  const logoUrl   = '/raah.png';
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          FIXED WRAPPER — contains both bars, moves as one unit
      ══════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 70,
          boxShadow: scrolled && !heroMode
            ? '0 4px 32px rgba(5,46,22,0.14), 0 1px 0 rgba(22,163,74,0.10)'
            : 'none',
          transition: 'box-shadow 0.35s ease',
        }}
      >

        {/* ── TOPBAR ── (hidden on mobile) */}
        <div
          className="hidden md:block"
          style={{
            height: `${TOPBAR_H}px`,
            background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle diagonal stripe texture */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'repeating-linear-gradient(105deg, transparent, transparent 40px, rgba(255,255,255,0.025) 40px, rgba(255,255,255,0.025) 80px)',
              pointerEvents: 'none',
            }}
          />

          <div
            className="container-custom"
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 1,
              padding: '0 clamp(16px, 4vw, 24px)',
            }}
          >
            {/* Contact strip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              {CONTACT_ITEMS.map(({ icon, text, href, external }, idx) => {
                const pill = (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '0 clamp(12px, 3vw, 20px)',
                      borderRight: idx < CONTACT_ITEMS.length - 1
                        ? '1px solid rgba(255,255,255,0.20)'
                        : 'none',
                      height: `${TOPBAR_H}px`,
                      flexShrink: 0,
                    }}
                  >
                    {/* Icon badge */}
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {React.createElement(icon, { size: 13, color: '#ffffff', strokeWidth: 2 })}
                    </div>
                    <span style={{
                      fontFamily: FONT_P,
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                      fontWeight: 600,
                      color: '#ffffff',
                      letterSpacing: '0.015em',
                      whiteSpace: 'nowrap',
                    }}>
                      {text}
                    </span>
                  </div>
                );

                if (!href) return <div key={text}>{pill}</div>;
                return (
                  <a
                    key={text}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    style={{ textDecoration: 'none', display: 'block' }}
                    onMouseEnter={e => {
                      const span = e.currentTarget.querySelector('span');
                      if (span) span.style.color = '#d1fae5';
                    }}
                    onMouseLeave={e => {
                      const span = e.currentTarget.querySelector('span');
                      if (span) span.style.color = '#ffffff';
                    }}
                  >
                    {pill}
                  </a>
                );
              })}
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(4px, 1vw, 6px)', flexShrink: 0 }}>
              {SOCIALS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    width: 'clamp(32px, 6vw, 36px)',
                    height: 'clamp(32px, 6vw, 36px)',
                    borderRadius: '9px',
                    border: '1px solid rgba(255,255,255,0.30)',
                    background: 'rgba(255,255,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                    textDecoration: 'none',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background   = 'rgba(255,255,255,0.30)';
                    e.currentTarget.style.borderColor  = 'rgba(255,255,255,0.80)';
                    e.currentTarget.style.transform    = 'translateY(-4px) scale(1.15)';
                    e.currentTarget.style.boxShadow    = '0 6px 18px rgba(0,0,0,0.18), 0 0 16px rgba(255,255,255,0.20)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background   = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.borderColor  = 'rgba(255,255,255,0.30)';
                    e.currentTarget.style.transform    = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow    = 'none';
                  }}
                >
                  {React.createElement(icon, { size: 16, strokeWidth: 1.75 })}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN NAV ── */}
        <div
          style={{
            height: `${scrolled ? NAV_H_SM : NAV_H}px`,
            background: '#ffffff',
            borderBottom: '1px solid rgba(22,163,74,0.12)',
            transition: 'height 0.3s ease',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="container-custom" style={{ width: '100%', padding: '0 clamp(16px, 4vw, 24px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(16px, 3vw, 24px)' }}>

              {/* Logo */}
              <Link
                to="/"
                style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}
                onMouseEnter={e => {
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.06)';
                }}
                onMouseLeave={e => {
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <img
                  src={logoUrl}
                  alt="RAAH Technologies"
                  style={{
                    height: scrolled ? 'clamp(36px, 6vw, 44px)' : 'clamp(44px, 8vw, 56px)',
                    width: 'auto',
                    display: 'block',
                    objectFit: 'contain',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    padding: 0,
                    transition: 'height 0.3s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1)',
                    transformOrigin: 'left center',
                  }}
                />
              </Link>

              {/* ✅✅✅ SINGLE TOGGLE BUTTON: Menu ↔ X morph (mobile only) */}
              <button
                className="lg:hidden flex items-center justify-center"
                onClick={() => setIsOpen(prev => !prev)}
                type="button"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                style={{
                  width: 'clamp(44px, 8vw, 48px)',
                  height: 'clamp(44px, 8vw, 48px)',
                  borderRadius: '12px',
                  border: '2px solid #16a34a',
                  background: isOpen ? '#16a34a' : 'transparent',
                  color: '#16a34a',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                  padding: 0,
                  margin: 0,
                  outline: 'none',
                  flexShrink: 0,
                  boxShadow: isOpen ? '0 4px 12px rgba(22,163,74,0.30)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!isOpen) {
                    e.currentTarget.style.background = 'rgba(22,163,74,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(22,163,74,0.40)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isOpen) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(22,163,74,0.20)';
                  }
                }}
              >
                {isOpen ? (
                  <X size={22} strokeWidth={2.5} color="#ffffff" />
                ) : (
                  <Menu size={22} strokeWidth={2} color="#16a34a" />
                )}
              </button>

              {/* Desktop nav links (hidden on mobile) */}
              <nav
                className="hidden lg:flex items-center flex-1 justify-center"
                style={{ gap: 'clamp(1.5rem, 3vw, 2.25rem)' }}
                aria-label="Main navigation"
              >
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      style={{
                        fontFamily: FONT_I,
                        fontWeight: 700,
                        fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                        letterSpacing: '0.01em',
                        color: active ? '#16a34a' : '#0f172a',
                        padding: '6px 0',
                        display: 'inline-block',
                        position: 'relative',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease, transform 0.2s ease',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color     = '#16a34a';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        const bar = e.currentTarget.querySelector('[data-underline]');
                        if (bar) bar.style.transform = 'scaleX(1)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color     = active ? '#16a34a' : '#0f172a';
                        e.currentTarget.style.transform = 'translateY(0)';
                        if (!active) {
                          const bar = e.currentTarget.querySelector('[data-underline]');
                          if (bar) bar.style.transform = 'scaleX(0)';
                        }
                      }}
                    >
                      {link.name}
                      {/* Sliding underline */}
                      <span
                        data-underline="true"
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          bottom: '-2px',
                          left: 0,
                          width: '100%',
                          height: '2.5px',
                          borderRadius: '999px',
                          background: 'linear-gradient(to right, #16a34a, #22c55e)',
                          display: 'block',
                          transform: active ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: 'left center',
                          transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
                        }}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Desktop CTAs (hidden on mobile) */}
              <div
                className="hidden lg:flex items-center gap-3"
                style={{ flexShrink: 0 }}
              >
                {/* Vertical divider */}
                <div style={{
                  width: '1px',
                  height: '32px',
                  background: 'rgba(22,163,74,0.20)',
                  marginRight: '4px',
                  flexShrink: 0,
                }} />

                {/* Ghost — Get Pricing */}
                <Link
                  to="/pricing"
                  style={{
                    fontFamily: FONT_I,
                    fontSize: 'clamp(0.75rem, 1.2vw, 0.8125rem)',
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    padding: 'clamp(10px, 2vw, 11px) clamp(18px, 3vw, 24px)',
                    borderRadius: '999px',
                    border: '2px solid #16a34a',
                    color: '#16a34a',
                    background: 'transparent',
                    transition: 'all 0.22s ease',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background  = '#16a34a';
                    e.currentTarget.style.color       = '#ffffff';
                    e.currentTarget.style.transform   = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow   = '0 6px 20px rgba(22,163,74,0.28)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background  = 'transparent';
                    e.currentTarget.style.color       = '#16a34a';
                    e.currentTarget.style.transform   = 'translateY(0)';
                    e.currentTarget.style.boxShadow   = 'none';
                  }}
                >
                  Pricing
                </Link>

                {/* Solid — Request Demo */}
                <Link
                  to="/demo"
                  style={{
                    fontFamily: FONT_I,
                    fontSize: 'clamp(0.75rem, 1.2vw, 0.8125rem)',
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    padding: 'clamp(10px, 2vw, 11px) clamp(18px, 3vw, 24px)',
                    borderRadius: '999px',
                    background: '#16a34a',
                    border: '2px solid #16a34a',
                    color: '#ffffff',
                    boxShadow: '0 4px 16px rgba(22,163,74,0.32)',
                    transition: 'all 0.22s ease',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background  = 'transparent';
                    e.currentTarget.style.color       = '#16a34a';
                    e.currentTarget.style.boxShadow   = 'none';
                    e.currentTarget.style.transform   = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background  = '#16a34a';
                    e.currentTarget.style.color       = '#ffffff';
                    e.currentTarget.style.boxShadow   = '0 4px 16px rgba(22,163,74,0.32)';
                    e.currentTarget.style.transform   = 'translateY(0)';
                  }}
                >
                  Request Demo
                  <ChevronRight size={14} strokeWidth={2.5} />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SPACER — inner pages only, not heroMode
          Prevents page content from hiding under the fixed nav.
      ══════════════════════════════════════════════════════ */}
      {!heroMode && (
        <div
          aria-hidden="true"
          style={{
            height: `${TOPBAR_H + NAV_H}px`,
            transition: 'height 0.3s ease',
            flexShrink: 0,
          }}
          className="hidden md:block"
        />
      )}
      {/* Mobile spacer — just the nav height, no topbar on mobile */}
      {!heroMode && (
        <div
          aria-hidden="true"
          style={{ height: `${NAV_H}px`, flexShrink: 0 }}
          className="block md:hidden"
        />
      )}

      {/* ══════════════════════════════════════════════════════
          ✅ MOBILE MENU — full-screen slide-in from right
          NO separate close button — uses the morphing toggle above
      ══════════════════════════════════════════════════════ */}
      <div
        id="mobile-menu"
        className="lg:hidden fixed inset-0 z-55"
        style={{
          background: '#ffffff',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
          height: '100vh',
          overflow: 'hidden',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
      >
        {/* ✅ Mobile header — NO close button, just logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '0 clamp(16px, 4vw, 20px)',
          height: `${NAV_H}px`,
          borderBottom: '1px solid rgba(22,163,74,0.10)',
          position: 'relative',
          zIndex: 10,
          background: '#ffffff',
        }}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img src={logoUrl} alt="RAAH Technologies" style={{ height: '42px', width: 'auto', border: 'none', background: 'transparent', padding: 0 }} />
          </Link>
        </div>

        {/* Scrollable body */}
        <div style={{ 
          overflowY: 'auto', 
          height: `calc(100dvh - ${NAV_H}px)`, 
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          WebkitOverflowScrolling: 'touch',
        }}>
          <div style={{ padding: 'clamp(8px, 2vw, 8px) clamp(20px, 5vw, 24px) clamp(24px, 6vw, 40px)', display: 'flex', flexDirection: 'column' }}>

            {/* Nav links */}
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {NAV_LINKS.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    style={{
                      fontFamily: FONT_I,
                      fontSize: 'clamp(1.125rem, 4vw, 1.25rem)',
                      fontWeight: 700,
                      color: active ? '#16a34a' : '#0f172a',
                      padding: 'clamp(14px, 3vw, 16px) 0',
                      borderBottom: '1px solid rgba(22,163,74,0.08)',
                      borderLeft: `3px solid ${active ? '#16a34a' : 'transparent'}`,
                      paddingLeft: active ? 'clamp(10px, 2vw, 14px)' : '0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease, padding-left 0.2s ease',
                    }}
                  >
                    {link.name}
                    {active && (
                      <span style={{
                        fontFamily: FONT_P,
                        fontSize: 'clamp(0.6rem, 2vw, 0.65rem)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        padding: 'clamp(2px, 1vw, 3px) clamp(8px, 2vw, 10px)',
                        borderRadius: '999px',
                        background: '#f0fdf4',
                        color: '#16a34a',
                      }}>Current</span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 2vw, 12px)', marginTop: 'clamp(24px, 5vw, 32px)' }}>
              <Link
                to="/pricing"
                onClick={() => setIsOpen(false)}
                style={{
                  fontFamily: FONT_I, fontSize: 'clamp(0.875rem, 2.5vw, 0.9375rem)', fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: 'clamp(12px, 3vw, 15px) clamp(20px, 4vw, 24px)', border: '2px solid #16a34a',
                  color: '#16a34a', background: 'transparent',
                  borderRadius: '14px', textAlign: 'center',
                  display: 'block', textDecoration: 'none',
                }}
              >Pricing</Link>
              <Link
                to="/demo"
                onClick={() => setIsOpen(false)}
                style={{
                  fontFamily: FONT_I, fontSize: 'clamp(0.875rem, 2.5vw, 0.9375rem)', fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: 'clamp(12px, 3vw, 15px) clamp(20px, 4vw, 24px)', background: '#16a34a',
                  border: '2px solid #16a34a', color: '#ffffff',
                  boxShadow: '0 6px 20px rgba(22,163,74,0.28)',
                  borderRadius: '14px', textAlign: 'center',
                  display: 'block', textDecoration: 'none',
                }}
              >Request Demo</Link>
            </div>

            {/* Contact block */}
            <div style={{
              marginTop: 'clamp(28px, 6vw, 36px)',
              paddingTop: 'clamp(20px, 4vw, 28px)',
              borderTop: '1px solid rgba(22,163,74,0.10)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(14px, 3vw, 18px)',
            }}>
              <p style={{
                fontFamily: FONT_I,
                fontSize: 'clamp(0.62rem, 2vw, 0.68rem)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#94a3b8',
              }}>Contact</p>
              {CONTACT_ITEMS.map(({ icon, text, href, external }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 2vw, 14px)' }}>
                  <div style={{
                    width: 'clamp(32px, 6vw, 36px)', height: 'clamp(32px, 6vw, 36px)', borderRadius: '10px',
                    background: 'rgba(22,163,74,0.08)',
                    border: '1px solid rgba(22,163,74,0.16)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {React.createElement(icon, { size: 15, color: '#16a34a', strokeWidth: 1.75 })}
                  </div>
                  {href ? (
                    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}
                      style={{ fontFamily: FONT_P, fontSize: 'clamp(0.875rem, 2.5vw, 0.9375rem)', fontWeight: 500, color: '#374151', textDecoration: 'none', wordBreak: 'break-word' }}>
                      {text}
                    </a>
                  ) : (
                    <span style={{ fontFamily: FONT_P, fontSize: 'clamp(0.875rem, 2.5vw, 0.9375rem)', fontWeight: 500, color: '#94a3b8' }}>
                      {text}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 10px)', marginTop: 'clamp(20px, 4vw, 28px)', flexWrap: 'wrap' }}>
              {SOCIALS.map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  style={{
                    width: 'clamp(36px, 7vw, 40px)', height: 'clamp(36px, 7vw, 40px)', borderRadius: '10px',
                    border: '1.5px solid rgba(22,163,74,0.20)',
                    background: 'rgba(22,163,74,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#16a34a', textDecoration: 'none',
                    flexShrink: 0,
                  }}>
                  {React.createElement(icon, { size: 16, strokeWidth: 1.75 })}
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-54"
          style={{ 
            background: 'rgba(5,46,22,0.40)', 
            backdropFilter: 'blur(2px)',
            touchAction: 'none',
          }}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;