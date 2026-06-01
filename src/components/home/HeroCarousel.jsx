/**
 * HeroCarousel.jsx — RAAH Technologies
 *
 * Layout: Full-viewport hero. Background image (Ken Burns) fills 100vw × 100dvh.
 * Green overlay sits on top. All text is centred and large.
 * Navbar is fixed separately and overlays the top of the hero (standard modern pattern).
 *
 * Typography: Inter Bold throughout.
 * Animation: Framer Motion 12.
 *
 * Autoplay: Continuous 7-second loop. No pause on hover.
 * 
 * Typography layout:
 *   • Headline parts stack vertically on all screens
 *   • Green accent word sits on its own isolated line, centered
 *   • Top/Bottom lines wrap naturally with balanced text distribution
 *   • Fluid typography & spacing with clamp()
 *   • Touch-friendly controls (min 44px targets)
 *   • Safe-area support for notched devices
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

// ─── Component ───────────────────────────────────────────────────────────────
const HeroCarousel = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const progressRef = useRef(null);
  const slideRef = useRef(null);

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
      {/* Global responsive styles */}
      <style>{`
        .hero-carousel-root {
          --safe-top: env(safe-area-inset-top, 0px);
          --safe-bottom: env(safe-area-inset-bottom, 0px);
          
          font-size: clamp(14px, 1.5vw, 16px);
          overflow-x: hidden;
          width: 100%;
          position: relative;
        }
        
        /* Touch targets */
        @media (hover: none) and (pointer: coarse) {
          .hero-carousel-root button,
          .hero-carousel-root a {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-carousel-root * {
            transition: none !important;
            animation: none !important;
          }
        }
        
        /* Headline text balancing */
        .hero-headline-line {
          text-wrap: balance;
          hyphens: auto;
          word-break: normal;
        }
        
        /* Prevent image stretching on small screens */
        .hero-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
        }
        
        @media (max-width: 480px) {
          .hero-bg-image {
            object-position: center 30%;
          }
        }
      `}</style>

      {/* ═════════════════════════════════════════════════════
          HERO SECTION — Full viewport, background fills entirely
          Content is vertically centered within this viewport
      ══════════════════════════════════════════════════════ */}
      <section
        className="hero-carousel-root"
        style={{ 
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
        role="region"
        aria-label="RAAH Technologies Hero"
        aria-roledescription="carousel"
      >
        <h1 className="sr-only">RAAH Technologies — Home Health Platform</h1>

        {/* ── BACKGROUND LAYER — Full viewport coverage ── */}
        <div 
          className="absolute inset-0 z-0" 
          aria-hidden="true"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <AnimatePresence mode="wait">
            <MotionDiv
              key={slide.id + '-bg'}
              variants={bgVariants}
              initial="enter"
              animate="visible"
              exit="exit"
              style={{ position: 'absolute', inset: 0 }}
            >
              <img
                src={slide.bgImage}
                alt={slide.bgAlt}
                className="hero-bg-image"
                loading="eager"
                decoding="async"
              />
            </MotionDiv>
          </AnimatePresence>

          {/* Green overlay */}
          <div 
            className="absolute inset-0 z-10" 
            style={{ background: 'rgba(5,46,22,0.38)' }} 
            aria-hidden="true" 
          />

          {/* Bottom gradient for text legibility */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ 
              background: 'linear-gradient(to bottom, transparent 25%, rgba(5,46,22,0.50) 65%, rgba(5,46,22,0.82) 100%)' 
            }}
            aria-hidden="true"
          />
        </div>

        {/* ── FOREGROUND CONTENT — Vertically centered, overlays background ── */}
        <div 
          className="relative z-20 w-full"
          style={{ 
            padding: 'clamp(24px, 4vw, 48px) clamp(16px, 4vw, 24px)',
            paddingTop: 'clamp(80px, 15vh, 120px)', /* Clears navbar area */
            paddingBottom: 'clamp(40px, 8vw, 60px)',
            boxSizing: 'border-box',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <div style={{ textAlign: 'center' }}>

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
                <span className="relative flex" style={{ width: 'clamp(4px, 1vw, 6px)', height: 'clamp(4px, 1vw, 6px)' }}>
                  <span className="animate-ping absolute inline-flex rounded-full bg-green-400 opacity-75" style={{ width: '100%', height: '100%' }} />
                  <span className="relative inline-flex rounded-full bg-green-400" style={{ width: '100%', height: '100%' }} />
                </span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(0.65rem, 2vw, 0.75rem)',
                  fontWeight: 700,
                  letterSpacing: 'clamp(0.15em, 2vw, 0.2em)',
                  textTransform: 'uppercase',
                  color: 'rgba(74,222,128,0.9)',
                  lineHeight: 1.2,
                  wordBreak: 'break-word'
                }}>
                  {slide.eyebrow}
                </span>
              </MotionDiv>
            </AnimatePresence>

            {/* Headline — 3 stacked lines, accent word isolated on its own line */}
            <AnimatePresence mode="wait">
              <div key={slide.id + '-headline'} aria-live="polite" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
                maxWidth: 'clamp(320px, 90vw, 1100px)',
                margin: '0 auto',
                gap: 'clamp(0.15em, 1.5vw, 0.3em)'
              }}>
                {/* Line 1 */}
                <MotionH1 variants={headlineVariants} initial="hidden" animate="visible" exit="exit" custom={0.06} className="hero-headline-line"
                  style={{ 
                    fontFamily: "'Inter', sans-serif", 
                    fontWeight: 900, 
                    fontSize: 'clamp(2rem, 6vw, 4rem)', 
                    lineHeight: 1.05, 
                    letterSpacing: '-0.02em', 
                    color: '#ffffff', 
                    display: 'block', 
                    width: '100%', 
                    textShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}>
                  {slide.headlineTop}
                </MotionH1>

                {/* Line 2 — Green Accent (isolated on its own line) */}
                <MotionSpan variants={headlineVariants} initial="hidden" animate="visible" exit="exit" custom={0.14} className="hero-headline-line"
                  style={{ 
                    fontFamily: "'Inter', sans-serif", 
                    fontWeight: 900, 
                    fontSize: 'clamp(2rem, 6vw, 4rem)', 
                    lineHeight: 1.05, 
                    letterSpacing: '-0.02em', 
                    color: '#4ade80', 
                    display: 'block', 
                    width: '100%', 
                    textShadow: '0 2px 12px rgba(74,222,128,0.35)'
                  }}>
                  {slide.accentWord}
                </MotionSpan>

                {/* Line 3 */}
                <MotionH1 variants={headlineVariants} initial="hidden" animate="visible" exit="exit" custom={0.22} className="hero-headline-line"
                  style={{ 
                    fontFamily: "'Inter', sans-serif", 
                    fontWeight: 900, 
                    fontSize: 'clamp(2rem, 6vw, 4rem)', 
                    lineHeight: 1.05, 
                    letterSpacing: '-0.02em', 
                    color: '#ffffff', 
                    display: 'block', 
                    width: '100%', 
                    textShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}>
                  {slide.headlineBot}
                </MotionH1>
              </div>
            </AnimatePresence>

            {/* CTAs */}
            <MotionDiv variants={fadeUp} initial="hidden" animate="visible" custom={0.32}
              style={{ 
                display: 'flex', 
                gap: 'clamp(12px, 2.5vw, 16px)', 
                marginTop: 'clamp(2rem, 5vw, 3rem)', 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                paddingHorizontal: 'clamp(8px, 2vw, 0)'
              }}>
              <Link to="/demo" style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2.2vw, 0.95rem)',
                letterSpacing: '0.07em', textTransform: 'uppercase',
                padding: 'clamp(14px, 3vw, 16px) clamp(28px, 5vw, 40px)', borderRadius: '999px',
                background: '#16a34a', color: '#ffffff', border: '2px solid #16a34a',
                boxShadow: '0 clamp(4px, 1vw, 6px) clamp(20px, 4vw, 28px) rgba(22,163,74,0.40)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(6px, 1.5vw, 8px)',
                transition: 'all 0.25s ease', textDecoration: 'none', minHeight: '48px', whiteSpace: 'nowrap',
                width: '100%', maxWidth: '280px'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.95)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(22,163,74,0.40)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                Book a Demo <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <Link to="/pricing" style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2.2vw, 0.95rem)',
                letterSpacing: '0.07em', textTransform: 'uppercase',
                padding: 'clamp(14px, 3vw, 16px) clamp(28px, 5vw, 40px)', borderRadius: '999px',
                background: 'transparent', color: 'rgba(255,255,255,0.95)', border: '2px solid rgba(255,255,255,0.4)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s ease',
                textDecoration: 'none', minHeight: '48px', whiteSpace: 'nowrap',
                width: '100%', maxWidth: '280px'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(22,163,74,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.95)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                Get Custom Pricing
              </Link>
            </MotionDiv>
          </div>
        </div>

        {/* Bottom Controls */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-20"
          style={{ 
            display: 'flex',
            justifyContent: 'center',
            paddingHorizontal: 'clamp(16px, 4vw, 24px)',
            paddingBottom: 'calc(clamp(20px, 4vw, 32px) + var(--safe-bottom))'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {SLIDES.map((s, i) => (
              <button key={s.id} onClick={() => goToSlide(i)} aria-label={`Slide ${i + 1}: ${s.eyebrow}`} aria-current={i === slideIndex ? 'true' : 'false'}
                style={{ position: 'relative', height: 'clamp(3px, 0.8vw, 4px)', width: i === slideIndex ? 'clamp(40px, 10vw, 56px)' : 'clamp(14px, 3vw, 18px)', borderRadius: '999px', overflow: 'hidden', background: 'rgba(74,222,128,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.3s ease', outline: 'none', minHeight: '24px' }}>
                {i === slideIndex && <MotionDiv style={{ position: 'absolute', top: 0, bottom: 0, left: 0, borderRadius: '999px', background: '#4ade80' }} animate={{ width: `${progress}%` }} transition={{ duration: 0.05, ease: 'linear' }} />}
              </button>
            ))}
            <div style={{ display: 'flex', gap: 'clamp(6px, 1.5vw, 8px)', marginLeft: 'clamp(4px, 1vw, 8px)' }}>
              <button onClick={prevSlide} aria-label="Previous slide" style={{ width: 'clamp(40px, 8vw, 44px)', height: 'clamp(40px, 8vw, 44px)', borderRadius: '50%', border: '1.5px solid rgba(74,222,128,0.35)', background: 'transparent', color: 'rgba(74,222,128,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease', outline: 'none', flexShrink: 0 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.95)'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(74,222,128,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.35)'; e.currentTarget.style.color = 'rgba(74,222,128,0.7)'; e.currentTarget.style.background = 'transparent'; }}>
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button onClick={nextSlide} aria-label="Next slide" style={{ width: 'clamp(40px, 8vw, 44px)', height: 'clamp(40px, 8vw, 44px)', borderRadius: '50%', border: '1.5px solid rgba(74,222,128,0.35)', background: 'transparent', color: 'rgba(74,222,128,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease', outline: 'none', flexShrink: 0 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.95)'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(74,222,128,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(74,222,128,0.35)'; e.currentTarget.style.color = 'rgba(74,222,128,0.7)'; e.currentTarget.style.background = 'transparent'; }}>
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroCarousel;