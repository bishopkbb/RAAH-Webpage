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
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const MotionDiv  = Motion.div;
const MotionH1   = Motion.h1;
const MotionSpan = Motion.span;

// ─── Timing ───────────────────────────────────────────────────────────────────
const SLIDE_DURATION = 7000;
const PROGRESS_TICK  = 50;

// ─── Slide data ───────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 'billing',
    eyebrow: 'Billing & Compliance',
    headlineTop: 'Protect Your',
    accentWord:  'Revenue.',
    headlineBot: 'From Day One.',
    bgImage: 'assets/banner.jpeg',
    bgAlt:   'Home health billing professional',
  },
  {
    id: 'caregivers',
    eyebrow: 'Caregiver Tools',
    headlineTop: 'Your Team,',
    accentWord:  'Empowered.',
    headlineBot: 'Everywhere.',
    bgImage: 'assets/banner 2.jpeg',
    bgAlt:   'Home health caregiver in the field',
  },
  {
    id: 'operations',
    eyebrow: 'Agency Operations',
    headlineTop: 'Run a Smarter',
    accentWord:  'Agency.',
    headlineBot: 'Not a Busier One.',
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

// ─── Global responsive CSS variables ──────────────────────────────────────────
const HeroStyles = () => (
  <style>{`
    :root {
      /* Typography */
      --font-hero-eyebrow: clamp(0.65rem, 1.4vw, 0.75rem);
      --font-hero-headline: clamp(2.25rem, 7vw, 6rem);
      --font-hero-cta: clamp(0.8rem, 1.6vw, 0.9rem);
      
      /* Spacing */
      --padding-hero-container: clamp(16px, 4vw, 24px);
      --margin-hero-eyebrow: clamp(1rem, 2vw, 1.75rem);
      --margin-hero-headline: 0.06em;
      --margin-hero-cta: clamp(2rem, 4vw, 3rem);
      --gap-hero-cta: clamp(12px, 2vw, 14px);
      --gap-hero-cta-icon: clamp(6px, 1vw, 8px);
      --padding-hero-cta: clamp(14px, 2.5vw, 16px) clamp(28px, 5vw, 36px);
      --padding-hero-bottom: clamp(1.5rem, 3vw, 2.5rem);
      
      /* Dimensions */
      --width-hero-max: clamp(280px, 90vw, 900px);
      --width-hero-pip: clamp(14px, 2.5vw, 18px);
      --width-hero-pip-active: clamp(40px, 8vw, 52px);
      --height-hero-pip: clamp(2px, 0.4vw, 3px);
      --size-hero-nav: clamp(28px, 5vw, 32px);
      --size-hero-nav-icon: clamp(12px, 2vw, 14px);
      --size-hero-dot: clamp(5px, 1vw, 6px);
      
      /* Borders & Shadows */
      --border-hero-cta: clamp(1.5px, 0.3vw, 2px);
      --border-hero-nav: clamp(1px, 0.2vw, 1px);
      --shadow-hero-cta: 0 clamp(4px, 0.8vw, 6px) clamp(24px, 4vw, 28px) rgba(22,163,74,0.40);
      
      /* Colors */
      --color-hero-overlay: rgba(5,46,22,0.38);
      --color-hero-gradient-top: transparent;
      --color-hero-gradient-mid: rgba(5,46,22,0.50);
      --color-hero-gradient-bot: rgba(5,46,22,0.82);
      --color-hero-eyebrow: rgba(74,222,128,0.80);
      --color-hero-headline: #ffffff;
      --color-hero-accent: #4ade80;
      --color-hero-cta-bg: #16a34a;
      --color-hero-cta-text: #ffffff;
      --color-hero-cta-ghost-bg: transparent;
      --color-hero-cta-ghost-text: rgba(255,255,255,0.90);
      --color-hero-cta-ghost-border: rgba(255,255,255,0.38);
      --color-hero-pip-bg: rgba(74,222,128,0.18);
      --color-hero-pip-fill: #4ade80;
      --color-hero-nav-border: rgba(74,222,128,0.30);
      --color-hero-nav-text: rgba(74,222,128,0.65);
      --color-hero-nav-hover-bg: rgba(74,222,128,0.12);
      --color-hero-nav-hover-text: #ffffff;
      --color-hero-nav-hover-border: rgba(74,222,128,0.9);
      
      /* Transitions */
      --transition-hero-cta: all 0.25s ease;
      --transition-hero-nav: all 0.2s ease;
      --transition-hero-pip: width 0.3s ease;
    }
  `}</style>
);

// ─── Component ────────────────────────────────────────────────────────────────
const HeroCarousel = ({ navbar }) => {
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
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100dvh' }}
      role="region"
      aria-label="RAAH Technologies Hero"
      aria-roledescription="carousel"
    >
      <HeroStyles />
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
        >
          <img
            src={slide.bgImage}
            alt={slide.bgAlt}
            className="w-full h-full object-cover"
            style={{ 
              objectPosition: 'top center',
              maxWidth: '100%',
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
        style={{ background: 'var(--color-hero-overlay)' }}
        aria-hidden="true"
      />

      {/* Bottom-up gradient */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, var(--color-hero-gradient-top) 25%, var(--color-hero-gradient-mid) 65%, var(--color-hero-gradient-bot) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════
          LAYER 3 — All foreground content
      ══════════════════════════════════════════════ */}
      <div className="relative z-20 flex flex-col" style={{ minHeight: '100dvh' }}>

        {/* Navbar */}
        {navbar}

        {/* ── Centred hero text ── */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className="w-full mx-auto px-4 sm:px-6 md:px-12"
            style={{ 
              textAlign: 'center',
              maxWidth: 'var(--width-hero-max)',
              padding: '0 var(--padding-hero-container)',
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
                  gap: 'clamp(6px, 1vw, 8px)',
                  marginBottom: 'var(--margin-hero-eyebrow)',
                  flexWrap: 'wrap',
                }}
              >
                <span className="relative flex" style={{ width: 'var(--size-hero-dot)', height: 'var(--size-hero-dot)' }}>
                  <span
                    className="animate-ping absolute inline-flex rounded-full bg-green-400 opacity-75"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <span
                    className="relative inline-flex rounded-full bg-green-400"
                    style={{ width: 'var(--size-hero-dot)', height: 'var(--size-hero-dot)' }}
                  />
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'var(--font-hero-eyebrow)',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-hero-eyebrow)',
                    wordBreak: 'break-word',
                    textAlign: 'center',
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
                    fontSize: 'var(--font-hero-headline)',
                    lineHeight: 1.04,
                    letterSpacing: '-0.03em',
                    color: 'var(--color-hero-headline)',
                    display: 'block',
                    marginBottom: 'var(--margin-hero-headline)',
                    wordBreak: 'break-word',
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
                    fontSize: 'var(--font-hero-headline)',
                    lineHeight: 1.04,
                    letterSpacing: '-0.03em',
                    color: 'var(--color-hero-accent)',
                    display: 'block',
                    marginBottom: 'var(--margin-hero-headline)',
                    wordBreak: 'break-word',
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
                    fontSize: 'var(--font-hero-headline)',
                    lineHeight: 1.04,
                    letterSpacing: '-0.03em',
                    color: 'var(--color-hero-headline)',
                    display: 'block',
                    wordBreak: 'break-word',
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
                gap: 'var(--gap-hero-cta)',
                marginTop: 'var(--margin-hero-cta)',
                justifyContent: 'center',
                flexWrap: 'wrap',
                width: '100%',
              }}
            >
              {/* Solid — Request Demo */}
              <Link
                to="/demo"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 'var(--font-hero-cta)',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  padding: 'var(--padding-hero-cta)',
                  borderRadius: '999px',
                  background: 'var(--color-hero-cta-bg)',
                  color: 'var(--color-hero-cta-text)',
                  border: 'var(--border-hero-cta) solid var(--color-hero-cta-bg)',
                  boxShadow: 'var(--shadow-hero-cta)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--gap-hero-cta-icon)',
                  transition: 'var(--transition-hero-cta)',
                  textDecoration: 'none',
                  minWidth: 'clamp(160px, 30vw, 200px)',
                  justifyContent: 'center',
                  wordBreak: 'break-word',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = 'transparent';
                  e.currentTarget.style.color       = 'rgba(255,255,255,0.90)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.38)';
                  e.currentTarget.style.boxShadow   = 'none';
                  e.currentTarget.style.transform   = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'var(--color-hero-cta-bg)';
                  e.currentTarget.style.color       = 'var(--color-hero-cta-text)';
                  e.currentTarget.style.borderColor = 'var(--color-hero-cta-bg)';
                  e.currentTarget.style.boxShadow   = 'var(--shadow-hero-cta)';
                  e.currentTarget.style.transform   = 'translateY(0)';
                }}
              >
                Request a Demo
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>

              {/* Ghost — Get Pricing */}
              <Link
                to="/pricing"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 'var(--font-hero-cta)',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  padding: 'var(--padding-hero-cta)',
                  borderRadius: '999px',
                  background: 'var(--color-hero-cta-ghost-bg)',
                  color: 'var(--color-hero-cta-ghost-text)',
                  border: 'var(--border-hero-cta) solid var(--color-hero-cta-ghost-border)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'var(--transition-hero-cta)',
                  textDecoration: 'none',
                  minWidth: 'clamp(160px, 30vw, 200px)',
                  justifyContent: 'center',
                  wordBreak: 'break-word',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = 'var(--color-hero-cta-bg)';
                  e.currentTarget.style.color       = 'var(--color-hero-cta-text)';
                  e.currentTarget.style.borderColor = 'var(--color-hero-cta-bg)';
                  e.currentTarget.style.boxShadow   = 'var(--shadow-hero-cta)';
                  e.currentTarget.style.transform   = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'var(--color-hero-cta-ghost-bg)';
                  e.currentTarget.style.color       = 'var(--color-hero-cta-ghost-text)';
                  e.currentTarget.style.borderColor = 'var(--color-hero-cta-ghost-border)';
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
            paddingBottom: 'var(--padding-hero-bottom)',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            padding: '0 var(--padding-hero-container)',
          }}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'clamp(8px, 1.5vw, 10px)',
            flexWrap: 'wrap',
            justifyContent: 'center',
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
                  height: 'var(--height-hero-pip)',
                  width: i === slideIndex ? 'var(--width-hero-pip-active)' : 'var(--width-hero-pip)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                  background: 'var(--color-hero-pip-bg)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'var(--transition-hero-pip)',
                  outline: 'none',
                  minWidth: 'var(--width-hero-pip)',
                  flexShrink: 0,
                }}
              >
                {i === slideIndex && (
                  <MotionDiv
                    style={{
                      position: 'absolute',
                      top: 0, bottom: 0, left: 0,
                      borderRadius: '999px',
                      background: 'var(--color-hero-pip-fill)',
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
              gap: 'clamp(6px, 1vw, 8px)', 
              marginLeft: 'clamp(6px, 1vw, 8px)',
              flexShrink: 0,
            }}>

              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                style={{
                  width: 'var(--size-hero-nav)', 
                  height: 'var(--size-hero-nav)',
                  borderRadius: '50%',
                  border: 'var(--border-hero-nav) solid var(--color-hero-nav-border)',
                  background: 'transparent',
                  color: 'var(--color-hero-nav-text)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer', 
                  transition: 'var(--transition-hero-nav)', 
                  outline: 'none',
                  flexShrink: 0,
                  touchAction: 'manipulation',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-hero-nav-hover-border)';
                  e.currentTarget.style.color       = 'var(--color-hero-nav-hover-text)';
                  e.currentTarget.style.background  = 'var(--color-hero-nav-hover-bg)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--color-hero-nav-border)';
                  e.currentTarget.style.color       = 'var(--color-hero-nav-text)';
                  e.currentTarget.style.background  = 'transparent';
                }}
              >
                <ChevronLeft size={14} strokeWidth={2.5} style={{ width: 'var(--size-hero-nav-icon)', height: 'var(--size-hero-nav-icon)' }} />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next slide"
                style={{
                  width: 'var(--size-hero-nav)', 
                  height: 'var(--size-hero-nav)',
                  borderRadius: '50%',
                  border: 'var(--border-hero-nav) solid var(--color-hero-nav-border)',
                  background: 'transparent',
                  color: 'var(--color-hero-nav-text)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer', 
                  transition: 'var(--transition-hero-nav)', 
                  outline: 'none',
                  flexShrink: 0,
                  touchAction: 'manipulation',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-hero-nav-hover-border)';
                  e.currentTarget.style.color       = 'var(--color-hero-nav-hover-text)';
                  e.currentTarget.style.background  = 'var(--color-hero-nav-hover-bg)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--color-hero-nav-border)';
                  e.currentTarget.style.color       = 'var(--color-hero-nav-text)';
                  e.currentTarget.style.background  = 'transparent';
                }}
              >
                <ChevronRight size={14} strokeWidth={2.5} style={{ width: 'var(--size-hero-nav-icon)', height: 'var(--size-hero-nav-icon)' }} />
              </button>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroCarousel;