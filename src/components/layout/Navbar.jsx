/**
 * Navbar.jsx — RAAH Technologies
 *
 * FIXES IN THIS VERSION:
 *   ✦ Topbar no longer overflows into the main nav — uses a proper
 *     padding-top on the sticky nav wrapper so content is never hidden.
 *   ✦ No setState in effect body — mobile menu closes via onClick on
 *     every Link, not via a useEffect([location]) watcher.
 *   ✦ No 'Icon' alias — social icons use React.createElement with a
 *     lowercase `icon` key, satisfying ESLint's /^[A-Z_]/ rule.
 *   ✦ Social icons bigger (20px), hours text matches address/phone style.
 *   ✦ Nav links lift slightly (translateY -2px) and grow (1.1rem) on hover.
 *
 * LAYOUT:
 *   Topbar  — fixed, z-60, dark green, full width.
 *   Main nav — sticky at top: TOPBAR_HEIGHT, z-50, always white.
 *   On heroMode the whole block is rendered inside HeroCarousel's z-20 layer,
 *   so the topbar is NOT fixed there — it scrolls with the hero content.
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Clock, Facebook, Twitter, Linkedin } from 'lucide-react';

const TOPBAR_H = 44; // px — topbar height. Change here only; all offsets derive from this.

const SOCIALS = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter,  href: '#', label: 'Twitter'  },
  { icon: Linkedin, href: '#', label: 'LinkedIn'  },
];

const CONTACT_ITEMS = [
  { icon: Phone,  text: '+1 (000) 222-2890',          href: 'tel:+10002222890' },
  { icon: MapPin, text: '13891 Oswego St, Aurora CO', href: '#'                },
  { icon: Clock,  text: 'Mon – Fri: 8am – 6pm',       href: null               },
];

const NAV_LINKS = [
  { name: 'Home',     path: '/' },
  { name: 'About',    path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact',  path: '/contact' },
];

// ─── Shared inline style helpers ─────────────────────────────────────────────
const FONT = "'Inter', sans-serif";

const Navbar = ({ heroMode = false }) => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const logoUrl  = '/raah.png';

  const isActive = (path) => location.pathname === path;

  // Scroll shadow detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body scroll lock when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ── NO useEffect([location]) with setState ──────────────────────────────────
  // Mobile menu closes via onClick={() => setIsOpen(false)} on every Link below.
  // That is the correct React pattern — event handlers, not effects.

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          TOPBAR — fixed, sits above everything.
          heroMode: rendered inside HeroCarousel (z-20 layer),
                    so position stays relative to that container.
          Inner pages: truly fixed to the viewport.
      ════════════════════════════════════════════════════════ */}
      <div
        className="hidden md:block"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 70,
          height: `${TOPBAR_H}px`,
          background: '#052e16',
          borderBottom: '1px solid rgba(74,222,128,0.12)',
          fontFamily: FONT,
        }}
      >
        <div
          className="container-custom flex justify-between items-center"
          style={{ height: '100%' }}
        >

          {/* Contact strip */}
          <div className="flex items-center gap-8">
            {[
              { icon: MapPin, text: '13891 Oswego Street, Aurora CO', href: 'https://maps.google.com' },
              { icon: Phone,  text: '+1 (000) 222-2890',              href: 'tel:+10002222890'        },
              { icon: Clock,  text: 'Mon – Fri: 8:00 AM – 6:00 PM',  href: null                      },
            ].map(({ icon, text, href }) => {
              const inner = (
                <>
                  {React.createElement(icon, {
                    size: 14,
                    style: { color: '#4ade80', flexShrink: 0 },
                  })}
                  <span>{text}</span>
                </>
              );

              const sharedStyle = {
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                fontSize: '0.8125rem',   // 13px — same size for all three items
                fontWeight: 500,
                color: 'rgba(255,255,255,0.82)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              };

              return href ? (
                <a
                  key={text}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  style={sharedStyle}
                  onMouseEnter={e => { e.currentTarget.style.color = '#4ade80'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.82)'; }}
                >
                  {inner}
                </a>
              ) : (
                <span key={text} style={sharedStyle}>
                  {inner}
                </span>
              );
            })}
          </div>

          {/* Social icons — lift + grow on hover */}
          <div className="flex items-center gap-5">
            {SOCIALS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color     = '#4ade80';
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color     = 'rgba(255,255,255,0.75)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {React.createElement(icon, { size: 20, strokeWidth: 1.75 })}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          SPACER — inner pages only.
          Pushes page content below the fixed topbar so nothing
          is hidden behind it.
      ════════════════════════════════════════════════════════ */}
      {
        <div
          className="hidden md:block"
          style={{ height: `${TOPBAR_H}px`, flexShrink: 0 }}
          aria-hidden="true"
        />
      }

      {/* ════════════════════════════════════════════════════════
          MAIN NAV — always white. Sticky below the topbar.
          On heroMode it's not sticky — it flows in the hero.
      ════════════════════════════════════════════════════════ */}
      <div
        className={heroMode ? 'w-full' : 'sticky z-50'}
        style={{
          top: heroMode ? undefined : `${TOPBAR_H}px`,
          background: '#ffffff',
          boxShadow: scrolled
            ? '0 4px 40px rgba(5,46,22,0.10), 0 1px 0 rgba(22,163,74,0.10)'
            : '0 1px 0 rgba(22,163,74,0.12)',
          transition: 'box-shadow 0.35s ease',
        }}
      >
        <div
          style={{
            padding: scrolled ? '10px 0' : '18px 0',
            transition: 'padding 0.3s ease',
          }}
        >
          <div className="container-custom">
            <div className="flex items-center justify-between gap-6">

              {/* Logo */}
              <Link
                to="/"
                className="shrink-0"
                style={{ display: 'inline-flex', alignItems: 'center' }}
                onMouseEnter={e => {
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.08)';
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
                    height: scrolled ? '52px' : '64px',
                    width: 'auto',
                    display: 'block',
                    objectFit: 'contain',
                    transition: 'height 0.3s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1)',
                    transformOrigin: 'left center',
                  }}
                />
              </Link>

              {/* Desktop nav links */}
              <nav
                className="hidden lg:flex items-center flex-1 justify-center"
                style={{ gap: '2.5rem' }}
                aria-label="Main navigation"
              >
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="relative select-none whitespace-nowrap"
                      style={{
                        fontFamily: FONT,
                        fontWeight: 700,
                        fontSize: '1.0625rem',       // 17px base
                        letterSpacing: '0.01em',
                        color: active ? '#16a34a' : '#0f172a',
                        padding: '6px 0',
                        display: 'inline-block',
                        transition: 'color 0.2s ease, transform 0.2s ease, font-size 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color     = '#16a34a';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.fontSize  = '1.125rem'; // lifts + grows slightly
                        const bar = e.currentTarget.querySelector('[data-underline]');
                        if (bar) bar.style.transform = 'scaleX(1)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color     = active ? '#16a34a' : '#0f172a';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.fontSize  = '1.0625rem';
                        if (!active) {
                          const bar = e.currentTarget.querySelector('[data-underline]');
                          if (bar) bar.style.transform = 'scaleX(0)';
                        }
                      }}
                    >
                      {link.name}
                      <span
                        data-underline="true"
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          bottom: '-1px',
                          left: 0,
                          width: '100%',
                          height: '2.5px',
                          borderRadius: '999px',
                          background: '#16a34a',
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

              {/* Desktop CTAs */}
              <div
                className="hidden lg:flex items-center gap-3 shrink-0"
                style={{
                  paddingLeft: '1.75rem',
                  borderLeft: '1px solid rgba(22,163,74,0.18)',
                }}
              >
                {/* Ghost — Get Pricing */}
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full"
                  style={{
                    fontFamily: FONT,
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '13px 30px',
                    border: '2px solid #16a34a',
                    color: '#16a34a',
                    background: 'transparent',
                    transition: 'all 0.22s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background  = '#16a34a';
                    e.currentTarget.style.color       = '#ffffff';
                    e.currentTarget.style.transform   = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow   = '0 8px 24px rgba(22,163,74,0.28)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background  = 'transparent';
                    e.currentTarget.style.color       = '#16a34a';
                    e.currentTarget.style.transform   = 'translateY(0)';
                    e.currentTarget.style.boxShadow   = 'none';
                  }}
                >
                  Get Pricing
                </Link>

                {/* Solid — Request Demo */}
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full"
                  style={{
                    fontFamily: FONT,
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '13px 30px',
                    background: '#16a34a',
                    border: '2px solid #16a34a',
                    color: '#ffffff',
                    boxShadow: '0 4px 18px rgba(22,163,74,0.30)',
                    transition: 'all 0.22s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background  = '#ffffff';
                    e.currentTarget.style.borderColor = '#16a34a';
                    e.currentTarget.style.color       = '#16a34a';
                    e.currentTarget.style.boxShadow   = '0 10px 32px rgba(22,163,74,0.22)';
                    e.currentTarget.style.transform   = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background  = '#16a34a';
                    e.currentTarget.style.borderColor = '#16a34a';
                    e.currentTarget.style.color       = '#ffffff';
                    e.currentTarget.style.boxShadow   = '0 4px 18px rgba(22,163,74,0.30)';
                    e.currentTarget.style.transform   = 'translateY(0)';
                  }}
                >
                  Request Demo
                </Link>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsOpen(p => !p)}
                className="lg:hidden p-2 rounded-lg transition-all duration-200 relative z-[60]"
                style={{
                  color: '#0f172a',
                  background: isOpen ? '#f0fdf4' : 'transparent',
                }}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen
                  ? <X    size={26} strokeWidth={2} />
                  : <Menu size={26} strokeWidth={2} />
                }
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          MOBILE MENU — full-screen slide-in from right
      ════════════════════════════════════════════════════════ */}
      <div
        className={`lg:hidden fixed inset-0 z-[55] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: '#ffffff', height: '100dvh' }}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 shrink-0"
          style={{ height: '72px', borderBottom: '1px solid #f0fdf4' }}
        >
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img src={logoUrl} alt="RAAH Technologies" style={{ height: '40px' }} />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg transition-colors duration-200"
            style={{ color: '#6b7280' }}
            onMouseEnter={e => {
              e.currentTarget.style.color      = '#16a34a';
              e.currentTarget.style.background = '#f0fdf4';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color      = '#6b7280';
              e.currentTarget.style.background = 'transparent';
            }}
            aria-label="Close menu"
          >
            <X size={26} strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto" style={{ height: 'calc(100dvh - 72px)' }}>
          <div className="px-6 pt-4 pb-16 flex flex-col">

            <nav className="flex flex-col" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-4"
                    style={{
                      fontFamily: FONT,
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      borderBottom: '1px solid #f8fffe',
                      color: active ? '#16a34a' : '#0f172a',
                      paddingLeft: active ? '14px' : '2px',
                      borderLeft: `3px solid ${active ? '#16a34a' : 'transparent'}`,
                    }}
                  >
                    {link.name}
                    {active && (
                      <span style={{
                        fontSize: '0.65rem', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                        padding: '3px 10px', borderRadius: '999px',
                        background: '#f0fdf4', color: '#16a34a',
                      }}>
                        Current
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col gap-3 mt-8">
              <Link
                to="/pricing"
                onClick={() => setIsOpen(false)}
                style={{
                  fontFamily: FONT, fontSize: '0.95rem', fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '16px 24px', border: '2px solid #16a34a',
                  color: '#16a34a', background: 'transparent',
                  borderRadius: '16px', textAlign: 'center', display: 'block',
                  textDecoration: 'none',
                }}
              >
                Get Pricing
              </Link>
              <Link
                to="/demo"
                onClick={() => setIsOpen(false)}
                style={{
                  fontFamily: FONT, fontSize: '0.95rem', fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '16px 24px', background: '#16a34a',
                  border: '2px solid #16a34a', color: '#ffffff',
                  boxShadow: '0 6px 24px rgba(22,163,74,0.28)',
                  borderRadius: '16px', textAlign: 'center', display: 'block',
                  textDecoration: 'none',
                }}
              >
                Request Demo
              </Link>
            </div>

            {/* Contact block */}
            <div className="mt-10 pt-8 flex flex-col gap-5" style={{ borderTop: '1px solid #f0fdf4' }}>
              <p style={{
                fontFamily: FONT, fontSize: '0.68rem', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af',
              }}>
                Contact
              </p>
              {CONTACT_ITEMS.map(({ icon, text, href }) => (
                <div key={text} className="flex items-center gap-4">
                  <div
                    className="shrink-0 flex items-center justify-center rounded-full"
                    style={{ width: '36px', height: '36px', background: '#f0fdf4' }}
                  >
                    {React.createElement(icon, { size: 16, className: 'text-green-600' })}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      style={{ fontFamily: FONT, fontSize: '0.9375rem', fontWeight: 500, color: '#4b5563', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#16a34a'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#4b5563'; }}
                    >
                      {text}
                    </a>
                  ) : (
                    <span style={{ fontFamily: FONT, fontSize: '0.9375rem', fontWeight: 500, color: '#9ca3af' }}>
                      {text}
                    </span>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;