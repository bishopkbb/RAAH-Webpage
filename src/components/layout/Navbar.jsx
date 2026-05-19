/**
 * Navbar.jsx — RAAH Technologies
 *
 * heroMode={true}  → Used inside HeroCarousel on the homepage.
 *                    The TOPBAR gets a semi-transparent dark green so it blends
 *                    into the hero overlay. The MAIN NAV BAR is always solid
 *                    white — brand consistency across every page.
 *
 * heroMode={false} → Inner pages. Sticky, always white, shadow on scroll.
 *
 * DESIGN RULES (non-negotiable):
 *   ✦ Navbar background: always #ffffff — no exceptions.
 *   ✦ Nav links: 17px Inter Bold, #0f172a (near-black). Green (#16a34a) on hover/active.
 *   ✦ Underline: 2.5px green bar slides in from left on hover (scaleX transform).
 *   ✦ CTAs: identical height (padding 13px 30px). Ghost = green border. Solid = green fill.
 *     Both lift 2px + deepen shadow on hover.
 *   ✦ Topbar: always dark green (#052e16) strip — white text, green-400 icons.
 *   ✦ On scroll: white bar gains a subtle green-tinted shadow so it lifts
 *     naturally without looking disconnected from the brand.
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Clock, Facebook, Twitter, Linkedin } from 'lucide-react';

const Navbar = ({ heroMode = false }) => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const logoUrl  = '/raah.png';

  const navLinks = [
    { name: 'Home',     path: '/' },
    { name: 'About',    path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact',  path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  // Scroll shadow — only meaningful on inner pages (sticky), but harmless on hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* ── Sticky wrapper (inner pages) / static wrapper (hero) ── */}
      <div
        className={heroMode ? 'w-full' : 'sticky top-0 z-50'}
        style={{
          background: '#ffffff',
          boxShadow: scrolled
            ? '0 4px 40px rgba(5,46,22,0.09), 0 1px 0 rgba(22,163,74,0.10)'
            : '0 1px 0 rgba(22,163,74,0.12)',
          transition: 'box-shadow 0.35s ease',
        }}
      >

        {/* ════════════════════════════════════════════════
            TOPBAR — dark green strip with contact + socials
            Always dark green (#052e16) — brand anchor.
        ════════════════════════════════════════════════ */}
        <div
          className="hidden md:block"
          style={{
            background: '#052e16',
            borderBottom: '1px solid rgba(74,222,128,0.10)',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <div className="container-custom flex justify-between items-center py-2.5">

            {/* Contact details */}
            <div className="flex items-center gap-7 text-xs">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition-colors duration-200"
                style={{ color: 'rgba(187,247,208,0.65)' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(187,247,208,0.65)'; }}
              >
                <MapPin size={13} style={{ color: '#4ade80', flexShrink: 0 }} />
                13891 Oswego Street, Aurora CO
              </a>
              <a
                href="tel:+10002222890"
                className="flex items-center gap-2 transition-colors duration-200"
                style={{ color: 'rgba(187,247,208,0.65)' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(187,247,208,0.65)'; }}
              >
                <Phone size={13} style={{ color: '#4ade80', flexShrink: 0 }} />
                +1 (000) 222-2890
              </a>
              <span
                className="flex items-center gap-2 select-none"
                style={{ color: 'rgba(187,247,208,0.40)' }}
              >
                <Clock size={13} style={{ flexShrink: 0 }} />
                Mon – Fri: 8:00 AM – 6:00 PM
              </span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Linkedin].map((SocialIcon, i) => (
                <a
                  key={i}
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'rgba(187,247,208,0.40)', transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(187,247,208,0.40)'; }}
                >
                  {React.createElement(SocialIcon, { size: 13 })}
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* ════════════════════════════════════════════════
            MAIN NAV BAR — white, always
        ════════════════════════════════════════════════ */}
        <div
          style={{
            padding: scrolled ? '10px 0' : '18px 0',
            transition: 'padding 0.3s ease',
          }}
        >
          <div className="container-custom">
            <div className="flex items-center justify-between gap-6">

              {/* ── Logo ── */}
              <Link
                to="/"
                className="shrink-0"
                style={{ display: 'inline-flex', alignItems: 'center' }}
                onMouseEnter={e => {
                  e.currentTarget.querySelector('img').style.transform = 'scale(1.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                }}
              >
                <img
                  src={logoUrl}
                  alt="RAAH Technologies"
                  className="w-auto object-contain"
                  style={{
                    height: scrolled ? '52px' : '64px',   // bigger — was 40/50px
                    display: 'block',
                    transition: 'height 0.3s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                    transformOrigin: 'left center',
                  }}
                />
              </Link>

              {/* ── Desktop nav links ── */}
              <nav
                className="hidden lg:flex items-center flex-1 justify-center"
                style={{ gap: '2.5rem' }}
                aria-label="Main navigation"
              >
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="relative group select-none whitespace-nowrap"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: '1.0625rem',       // 17px — confident, premium
                        letterSpacing: '0.01em',
                        color: active ? '#16a34a' : '#0f172a',
                        padding: '6px 0',
                        display: 'inline-block',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#16a34a';
                        const bar = e.currentTarget.querySelector('[data-underline]');
                        if (bar) bar.style.transform = 'scaleX(1)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = active ? '#16a34a' : '#0f172a';
                        if (!active) {
                          const bar = e.currentTarget.querySelector('[data-underline]');
                          if (bar) bar.style.transform = 'scaleX(0)';
                        }
                      }}
                    >
                      {link.name}

                      {/* Green slide-in underline */}
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
                          transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* ── Desktop CTAs ── */}
              <div
                className="hidden lg:flex items-center gap-3 shrink-0"
                style={{
                  paddingLeft: '1.75rem',
                  borderLeft: '1px solid rgba(22,163,74,0.18)',
                }}
              >

                {/* Ghost CTA — Get Pricing */}
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center whitespace-nowrap font-bold rounded-full"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '13px 30px',           // ← bigger than before
                    border: '2px solid #16a34a',
                    color: '#16a34a',
                    background: 'transparent',
                    transition: 'all 0.22s ease',
                    display: 'inline-flex',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background   = '#16a34a';
                    e.currentTarget.style.color        = '#ffffff';
                    e.currentTarget.style.transform    = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow    = '0 8px 24px rgba(22,163,74,0.28)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background   = 'transparent';
                    e.currentTarget.style.color        = '#16a34a';
                    e.currentTarget.style.transform    = 'translateY(0)';
                    e.currentTarget.style.boxShadow    = 'none';
                  }}
                >
                  Get Pricing
                </Link>

                {/* Solid CTA — Request Demo */}
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center whitespace-nowrap font-bold rounded-full text-white"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '13px 30px',           // ← same as ghost — equal height
                    background: '#16a34a',
                    border: '2px solid #16a34a',    // same border-width keeps them equal height
                    boxShadow: '0 4px 18px rgba(22,163,74,0.30)',
                    transition: 'all 0.22s ease',
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

              {/* ── Mobile hamburger ── */}
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

      </div>{/* end sticky wrapper */}


      {/* ════════════════════════════════════════════════════════
          MOBILE MENU — full-screen slide-in from right
      ════════════════════════════════════════════════════════ */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: '#ffffff', height: '100dvh' }}
        aria-hidden={!isOpen}
      >

        {/* Menu header — aligned to navbar height */}
        <div
          className="flex items-center justify-between px-6 shrink-0"
          style={{
            height: '72px',
            borderBottom: '1px solid #f0fdf4',
            background: '#ffffff',
          }}
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

        {/* Scrollable body */}
        <div className="overflow-y-auto" style={{ height: 'calc(100dvh - 72px)' }}>
          <div className="px-6 pt-4 pb-16 flex flex-col">

            {/* Nav links */}
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-4 font-bold"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      borderBottom: '1px solid #f8fffe',
                      color: active ? '#16a34a' : '#0f172a',
                      paddingLeft: active ? '14px' : '2px',
                      borderLeft: `3px solid ${active ? '#16a34a' : 'transparent'}`,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {link.name}
                    {active && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          background: '#f0fdf4',
                          color: '#16a34a',
                        }}
                      >
                        Current
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile CTAs */}
            <div className="flex flex-col gap-3 mt-8">
              <Link
                to="/pricing"
                onClick={() => setIsOpen(false)}
                className="w-full text-center font-bold rounded-2xl"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '16px 24px',
                  border: '2px solid #16a34a',
                  color: '#16a34a',
                  background: 'transparent',
                  display: 'block',
                }}
              >
                Get Pricing
              </Link>
              <Link
                to="/demo"
                onClick={() => setIsOpen(false)}
                className="w-full text-center font-bold rounded-2xl text-white"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '16px 24px',
                  background: '#16a34a',
                  border: '2px solid #16a34a',
                  boxShadow: '0 6px 24px rgba(22,163,74,0.28)',
                  display: 'block',
                }}
              >
                Request Demo
              </Link>
            </div>

            {/* Contact block */}
            <div
              className="mt-10 pt-8 flex flex-col gap-5"
              style={{ borderTop: '1px solid #f0fdf4' }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#9ca3af',
                }}
              >
                Contact
              </p>
              {[
                { icon: Phone,  text: '+1 (000) 222-2890',          href: 'tel:+10002222890' },
                { icon: MapPin, text: '13891 Oswego St, Aurora CO', href: '#'                },
                { icon: Clock,  text: 'Mon – Fri: 8am – 6pm',       href: null               },
              ].map(({ icon, text, href }) => (
                <div key={text} className="flex items-center gap-4">
                  <div
                    className="shrink-0 flex items-center justify-center rounded-full"
                    style={{ width: '36px', height: '36px', background: '#f0fdf4' }}
                  >
                    {React.createElement(icon, { size: 16, className: 'text-green-600' })}
                  </div>
                  {href
                    ? (
                      <a
                        href={href}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.9375rem',
                          fontWeight: 500,
                          color: '#4b5563',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#16a34a'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#4b5563'; }}
                      >
                        {text}
                      </a>
                    )
                    : (
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.9375rem',
                          fontWeight: 500,
                          color: '#9ca3af',
                        }}
                      >
                        {text}
                      </span>
                    )
                  }
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