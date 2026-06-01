/**
 * HeroCarousel.jsx — RAAH Technologies
 *
 * Layout: Full-viewport. Background image (Ken Burns) fills 100vw × 100dvh.
 * Green overlay sits on top. All text is centred and large.
 * No side image column — the photo IS the background.
 *
 * Typography: Inter Bold throughout.
 * Animation: Framer Motion 12.
 *
 * Autoplay: Continuous 7-second loop. No pause on hover.
 * 
 * Responsive fixes applied:
 *   • Navbar overlap resolved via CSS custom property + safe-area insets
 *   • Fluid typography & spacing with clamp()
 *   • Touch-friendly controls (min 44px targets)
 *   • Safe-area padding for notched devices
 *   • Reduced motion support
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const MotionDiv  = Motion.div;
const MotionH1   = Motion.h1;
const MotionSpan = Motion.span;

// ─── Timing ──────────────────────────────────────────────────────────────────
const SLIDE_DURATION = 7000;
const PROGRESS_TICK  = 50;

// ─── Slide data ───────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 'billing',
    eyebrow: 'Billing & Compliance',
    headlineTop: 'The All-in-One Home ',
    accentWord:  'Health Software ',
    headlineBot: 'Built for Growing Agencies.',
    bgImage: 'assets/banner.jpeg',
    bgAlt:   'Home health billing professional',
  },
  {
    id: 'caregivers',
    eyebrow: 'Caregiver Tools',
    headlineTop: 'Empowering Caregivers.',
    accentWord:  'Streamlining Care.',
    headlineBot: 'Improving Lives.',
    bgImage: 'assets/banner 2.jpeg',
    bgAlt:   'Home health caregiver in the field',
  },
  {
    id: 'operations',
    eyebrow: 'Agency Operations',
    headlineTop: 'Simplifying Home Health',
    accentWord:  'Care Operations',
    headlineBot: 'with Intelligent Software.',
    bgImage: 'assets/banner3.jpeg',
    bgAlt:   'Agency administrator reviewing operations dashboard',
  },
];

// ─── Motion variants ──────────────────────────────────────────────────────────
const bgVariants = {
  enter:   { scale: 1.06, opacity: 0 },
  visible: { scale: 1,    opacity: 1, transition: { duration: 1.6, ease: 'easeOut' } },
  exit:    { scale: 0.98, opacity: 0, transition: { duration: 0.6, ease: 'easeIn'  } },
};

const headlineVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

const HeroCarousel = ({ navbar, navbarHeight = 80 }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress,   setProgress]   = useState(0);

  const progressRef = useRef(null);
  const slideRef    = useRef(null);

  // Continuous autoplay — no pause on hover
  useEffect(() => {
    const start = Date.now();

    progressRef.current = setInterval(() => {
      setProgress(Math.min(((Date.now() - start) / SLIDE_DURATION) * 100, 100));
    }, PROGRESS_TICK);

    slideRef.current = setTimeout(() => {
      setSlideIndex(p => (p + 1) % SLIDES.length);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressRef.current);
      clearTimeout(slideRef.current);
    };
  }, [slideIndex]);

  // Manual navigation resets the timer cleanly
  const goToSlide = useCallback((i) => {
    clearInterval(progressRef.current);
    clearTimeout(slideRef.current);
    setProgress(0);
    setSlideIndex(i);
  }, []);

  const prevSlide = () => goToSlide((slideIndex - 1 + SLIDES.length) % SLIDES.length);
  const nextSlide = () => goToSlide((slideIndex + 1) % SLIDES.length);

  const slide = SLIDES[slideIndex];

  return (
    <>
      {/* Global responsive styles for this component */}
      <style>{`
        .hero-carousel-root {
          --navbar-offset: ${navbarHeight}px;
          --safe-top: env(safe-area-inset-top, 0px);
          --content-padding-top: calc(var(--navbar-offset) + var(--safe-top) + 16px);
        }
        
        /* Fluid base font sizing */
        .hero-carousel-root {
          font-size: clamp(14px, 1.5vw, 16px);
        }
        
        /* Prevent horizontal scroll */
        .hero-carousel-root {
          overflow-x: hidden;
          width: 100%;
        }
        
        /* Touch target enhancements for mobile */
        @media (hover: none) and (pointer: coarse) {
          .hero-carousel-root button,
          .hero-carousel-root a {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .hero-carousel-root * {
            transition: none !important;
            animation: none !important;
          }
        }
        
        /* Ensure images don't cause layout shift */
        .hero-carousel-root img {
          max-width: 100%;
          height: auto;
          display: block;
        }
      `}</style>

      <section
        className="hero-carousel-root relative w-full overflow-hidden"
        style={{ 
          minHeight: '100dvh',
          paddingTop: 'var(--content-padding-top)',
          boxSizing: 'border-box'
        }}
        role="region"
        aria-label="RAAH Technologies Hero"
        aria-roledescription="carousel"
      >
        <h1 className="sr-only">RAAH Technologies — Home Health Platform</h1>

        {/* ══════════════════════════════════════════════
            LAYER 1 — Background image, Ken Burns
        ══════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          <MotionDiv
            key={slide.id + '-bg'}
            variants={bgVariants}
            initial="enter"
            animate="visible"
            exit="exit"
            className="absolute inset-0 z-0"
            aria-hidden="true"
            style={{ top: 0 }}
          >
            <img
              src={slide.bgImage}
              alt={slide.bgAlt}
              className="w-full h-full object-cover"
              style={{ 
                objectPosition: 'top center',
                width: '100vw',
                maxWidth: 'none'
              }}
              loading="eager"
              decoding="async"
            />
          </MotionDiv>
        </AnimatePresence>

        {/* ══════════════════════════════════════════════
            LAYER 2 — Green brand overlay
        ══════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 z-10"
          style={{ 
            background: 'rgba(5,46,22,0.38)',
            top: 0
          }}
          aria-hidden="true"
        />

        {/* Bottom-up gradient — darkens only where text sits */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 25%, rgba(5,46,22,0.50) 65%, rgba(5,46,22,0.82) 100%)',
            top: 0
          }}
          aria-hidden="true"
        />

        {/* ══════════════════════════════════════════════
            LAYER 3 — All foreground content
        ══════════════════════════════════════════════ */}
        <div 
          className="relative z-20 flex flex-col" 
          style={{ 
            minHeight: 'calc(100dvh - var(--content-padding-top))',
            paddingTop: 'clamp(16px, 3vw, 24px)'
          }}
        >

          {/* Navbar lives on the overlay — positioned absolutely at top */}
          {navbar && (
            <div 
              style={{
                position: 'absolute',
                top: 'var(--safe-top)',
                left: 0,
                right: 0,
                zIndex: 30,
                width: '100%'
              }}
            >
              {navbar}
            </div>
          )}

          {/* ── Centred hero text ── */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-12">
            <div
              className="w-full max-w-5xl mx-auto"
              style={{ 
                textAlign: 'center',
                padding: 'clamp(24px, 4vw, 48px) 0'
              }}
            >

              {/* Eyebrow */}
              <AnimatePresence mode="wait">
                <MotionDiv
                  key={slide.id + '-eyebrow'}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={0}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'clamp(6px, 1.5vw, 8px)',
                    marginBottom: 'clamp(1rem, 2.5vw, 1.75rem)',
                    flexWrap: 'wrap'
                  }}
                >
                  <span className="relative flex" style={{ 
                    width: 'clamp(4px, 1vw, 6px)', 
                    height: 'clamp(4px, 1vw, 6px)' 
                  }}>
                    <span
                      className="animate-ping absolute inline-flex rounded-full bg-green-400 opacity-75"
                      style={{ width: '100%', height: '100%' }}
                    />
                    <span
                      className="relative inline-flex rounded-full bg-green-400"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 'clamp(0.65rem, 2vw, 0.75rem)',
                      fontWeight: 700,
                      letterSpacing: 'clamp(0.15em, 2vw, 0.2em)',
                      textTransform: 'uppercase',
                      color: 'rgba(74,222,128,0.85)',
                      lineHeight: 1.2
                    }}
                  >
                    {slide.eyebrow}
                  </span>
                </MotionDiv>
              </AnimatePresence>

              {/* Headline — massive, centred, 3 lines */}
              <AnimatePresence mode="wait">
                <div key={slide.id + '-headline'} aria-live="polite">

                  {/* Line 1 */}
                  <MotionH1
                    variants={headlineVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={0.06}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 900,
                      fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                      lineHeight: 1.04,
                      letterSpacing: '-0.03em',
                      color: '#ffffff',
                      display: 'block',
                      marginBottom: '0.04em',
                      wordBreak: 'break-word',
                      hyphens: 'auto'
                    }}
                  >
                    {slide.headlineTop}
                  </MotionH1>

                  {/* Accent word — green */}
                  <MotionSpan
                    variants={headlineVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={0.14}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 900,
                      fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                      lineHeight: 1.04,
                      letterSpacing: '-0.03em',
                      color: '#4ade80',
                      display: 'block',
                      marginBottom: '0.04em',
                      wordBreak: 'break-word'
                    }}
                  >
                    {slide.accentWord}
                  </MotionSpan>

                  {/* Line 3 */}
                  <MotionH1
                    variants={headlineVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={0.22}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 900,
                      fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                      lineHeight: 1.04,
                      letterSpacing: '-0.03em',
                      color: '#ffffff',
                      display: 'block',
                      wordBreak: 'break-word'
                    }}
                  >
                    {slide.headlineBot}
                  </MotionH1>

                </div>
              </AnimatePresence>

              {/* CTAs — centred row */}
              <MotionDiv
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.32}
                style={{
                  display: 'flex',
                  gap: 'clamp(10px, 2vw, 14px)',
                  marginTop: 'clamp(2rem, 4vw, 3rem)',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  paddingHorizontal: 'clamp(8px, 2vw, 0)'
                }}
              >
                {/* Solid — Request Demo */}
                <Link
                  to="/demo"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(0.85rem, 2.2vw, 0.9rem)',
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    padding: 'clamp(14px, 2.5vw, 16px) clamp(28px, 4vw, 36px)',
                    borderRadius: '999px',
                    background: '#16a34a',
                    color: '#ffffff',
                    border: '2px solid #16a34a',
                    boxShadow: '0 clamp(4px, 1vw, 6px) clamp(20px, 4vw, 28px) rgba(22,163,74,0.40)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'clamp(6px, 1.5vw, 8px)',
                    transition: 'all 0.25s ease',
                    textDecoration: 'none',
                    minHeight: '44px',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background  = 'transparent';
                    e.currentTarget.style.color       = 'rgba(255,255,255,0.90)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.38)';
                    e.currentTarget.style.boxShadow   = 'none';
                    e.currentTarget.style.transform   = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background  = '#16a34a';
                    e.currentTarget.style.color       = '#ffffff';
                    e.currentTarget.style.borderColor = '#16a34a';
                    e.currentTarget.style.boxShadow   = '0 6px 28px rgba(22,163,74,0.40)';
                    e.currentTarget.style.transform   = 'translateY(0)';
                  }}
                >
                  Book a Demo
                  <ArrowRight size={16} strokeWidth={2.5} />
                </Link>

                {/* Ghost — Get Pricing */}
                <Link
                  to="/pricing"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(0.85rem, 2.2vw, 0.9rem)',
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    padding: 'clamp(14px, 2.5vw, 16px) clamp(28px, 4vw, 36px)',
                    borderRadius: '999px',
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.90)',
                    border: '2px solid rgba(255,255,255,0.38)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    transition: 'all 0.25s ease',
                    textDecoration: 'none',
                    minHeight: '44px',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background  = '#16a34a';
                    e.currentTarget.style.color       = '#ffffff';
                    e.currentTarget.style.borderColor = '#16a34a';
                    e.currentTarget.style.boxShadow   = '0 6px 28px rgba(22,163,74,0.40)';
                    e.currentTarget.style.transform   = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background  = 'transparent';
                    e.currentTarget.style.color       = 'rgba(255,255,255,0.90)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.38)';
                    e.currentTarget.style.boxShadow   = 'none';
                    e.currentTarget.style.transform   = 'translateY(0)';
                  }}
                >
                  Get Custom Pricing
                </Link>
              </MotionDiv>

            </div>
          </div>

          {/* ── BOTTOM BAR — progress pips + prev/next, centred ── */}
          <div
            style={{
              paddingBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
              display: 'flex',
              justifyContent: 'center',
              paddingHorizontal: 'clamp(16px, 3vw, 24px)'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'clamp(8px, 1.5vw, 10px)',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>

              {/* Progress pips */}
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(i)}
                  aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                  aria-current={i === slideIndex ? 'true' : 'false'}
                  style={{
                    position: 'relative',
                    height: 'clamp(2px, 0.5vw, 3px)',
                    width: i === slideIndex ? 'clamp(40px, 8vw, 52px)' : 'clamp(14px, 3vw, 18px)',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    background: 'rgba(74,222,128,0.18)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'width 0.3s ease',
                    outline: 'none',
                    minHeight: '24px'
                  }}
                >
                  {i === slideIndex && (
                    <MotionDiv
                      style={{
                        position: 'absolute',
                        top: 0, bottom: 0, left: 0,
                        borderRadius: '999px',
                        background: '#4ade80',
                      }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.05, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}

              {/* Prev / Next */}
              <div style={{ 
                display: 'flex', 
                gap: 'clamp(6px, 1.5vw, 8px)', 
                marginLeft: 'clamp(6px, 1.5vw, 8px)' 
              }}>

                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  style={{
                    width: 'clamp(36px, 7vw, 44px)', 
                    height: 'clamp(36px, 7vw, 44px)',
                    borderRadius: '50%',
                    border: '1px solid rgba(74,222,128,0.30)',
                    background: 'transparent',
                    color: 'rgba(74,222,128,0.65)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    cursor: 'pointer', 
                    transition: 'all 0.2s ease', 
                    outline: 'none',
                    flexShrink: 0
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(74,222,128,0.9)';
                    e.currentTarget.style.color       = '#ffffff';
                    e.currentTarget.style.background  = 'rgba(74,222,128,0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(74,222,128,0.30)';
                    e.currentTarget.style.color       = 'rgba(74,222,128,0.65)';
                    e.currentTarget.style.background  = 'transparent';
                  }}
                >
                  <ChevronLeft size={14} strokeWidth={2.5} />
                </button>

                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  style={{
                    width: 'clamp(36px, 7vw, 44px)', 
                    height: 'clamp(36px, 7vw, 44px)',
                    borderRadius: '50%',
                    border: '1px solid rgba(74,222,128,0.30)',
                    background: 'transparent',
                    color: 'rgba(74,222,128,0.65)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    cursor: 'pointer', 
                    transition: 'all 0.2s ease', 
                    outline: 'none',
                    flexShrink: 0
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(74,222,128,0.9)';
                    e.currentTarget.style.color       = '#ffffff';
                    e.currentTarget.style.background  = 'rgba(74,222,128,0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(74,222,128,0.30)';
                    e.currentTarget.style.color       = 'rgba(74,222,128,0.65)';
                    e.currentTarget.style.background  = 'transparent';
                  }}
                >
                  <ChevronRight size={14} strokeWidth={2.5} />
                </button>

              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default HeroCarousel;