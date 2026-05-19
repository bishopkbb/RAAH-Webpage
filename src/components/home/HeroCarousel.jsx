/**
 * HeroCarousel.jsx — RAAH Technologies
 *
 * Layout: Full-viewport. Background image (Ken Burns) fills 100vw × 100dvh.
 * Green overlay sits on top. All text is centred and large.
 * No side image column — the photo IS the background.
 *
 * Typography: Inter Bold throughout.
 * Animation: Framer Motion 12.
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
    bgImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&q=80&w=2000&h=1200&fit=crop&crop=top',
    bgAlt:   'Home health billing professional',
  },
  {
    id: 'caregivers',
    eyebrow: 'Caregiver Tools',
    headlineTop: 'Your Team,',
    accentWord:  'Empowered.',
    headlineBot: 'Everywhere.',
    bgImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&q=80&w=2000&h=1200&fit=crop&crop=top',
    bgAlt:   'Home health caregiver in the field',
  },
  {
    id: 'operations',
    eyebrow: 'Agency Operations',
    headlineTop: 'Run a Smarter',
    accentWord:  'Agency.',
    headlineBot: 'Not a Busier One.',
    bgImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&q=80&w=2000&h=1200&fit=crop&crop=top',
    bgAlt:   'Agency administrator reviewing operations dashboard',
  },
];

// ─── Motion variants ──────────────────────────────────────────────────────────

// Background: Ken Burns zoom + cross-fade
const bgVariants = {
  enter:   { scale: 1.06, opacity: 0 },
  visible: { scale: 1,    opacity: 1, transition: { duration: 1.6, ease: 'easeOut' } },
  exit:    { scale: 0.98, opacity: 0, transition: { duration: 0.6, ease: 'easeIn'  } },
};

// Headline lines: stagger via custom delay
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

const HeroCarousel = ({ navbar }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused,   setIsPaused]   = useState(false);
  const [progress,   setProgress]   = useState(0);

  const progressRef = useRef(null);
  const slideRef    = useRef(null);

  useEffect(() => {
    if (isPaused) return;
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
  }, [slideIndex, isPaused]);

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
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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
        >
          <img
            src={slide.bgImage}
            alt={slide.bgAlt}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'top center' }}
            loading="eager"
            decoding="async"
          />
        </MotionDiv>
      </AnimatePresence>

      {/* ══════════════════════════════════════════════
          LAYER 2 — Green brand overlay
          Light brand tint at 38% — image fully visible.
          Bottom gradient ensures text legibility.
      ══════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'rgba(5,46,22,0.38)' }}
        aria-hidden="true"
      />

      {/* Bottom-up gradient — darkens only where text sits */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 25%, rgba(5,46,22,0.50) 65%, rgba(5,46,22,0.82) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════
          LAYER 3 — All foreground content
      ══════════════════════════════════════════════ */}
      <div className="relative z-20 flex flex-col" style={{ minHeight: '100dvh' }}>

        {/* Navbar lives on the overlay */}
        {navbar}

        {/* ── Centred hero text ── */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className="w-full max-w-5xl mx-auto px-6 md:px-12"
            style={{ textAlign: 'center' }}
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
                  gap: '8px',
                  marginBottom: '1.75rem',
                }}
              >
                <span className="relative flex" style={{ width: '6px', height: '6px' }}>
                  <span
                    className="animate-ping absolute inline-flex rounded-full bg-green-400 opacity-75"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <span
                    className="relative inline-flex rounded-full bg-green-400"
                    style={{ width: '6px', height: '6px' }}
                  />
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(74,222,128,0.80)',
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
                    fontSize: 'clamp(3rem, 7vw, 6rem)',
                    lineHeight: 1.04,
                    letterSpacing: '-0.03em',
                    color: '#ffffff',
                    display: 'block',
                    marginBottom: '0.06em',
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
                    fontSize: 'clamp(3rem, 7vw, 6rem)',
                    lineHeight: 1.04,
                    letterSpacing: '-0.03em',
                    color: '#4ade80',
                    display: 'block',
                    marginBottom: '0.06em',
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
                    fontSize: 'clamp(3rem, 7vw, 6rem)',
                    lineHeight: 1.04,
                    letterSpacing: '-0.03em',
                    color: '#ffffff',
                    display: 'block',
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
                gap: '14px',
                marginTop: '3rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {/* Solid — Request Demo */}
              <Link
                to="/demo"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  padding: '16px 36px',
                  borderRadius: '999px',
                  background: '#16a34a',
                  color: '#ffffff',
                  border: '2px solid #16a34a',
                  boxShadow: '0 6px 28px rgba(22,163,74,0.40)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.25s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  // Takes ghost properties on hover
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
                Request a Demo
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>

              {/* Ghost — Get Pricing */}
              <Link
                to="/pricing"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  padding: '16px 36px',
                  borderRadius: '999px',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.90)',
                  border: '2px solid rgba(255,255,255,0.38)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'all 0.25s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  // Takes solid properties on hover
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
            paddingBottom: '2.5rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

            {/* Progress pips */}
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goToSlide(i)}
                aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                aria-current={i === slideIndex ? 'true' : 'false'}
                style={{
                  position: 'relative',
                  height: '3px',
                  width: i === slideIndex ? '52px' : '18px',
                  borderRadius: '999px',
                  overflow: 'hidden',
                  background: 'rgba(74,222,128,0.18)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.3s ease',
                  outline: 'none',
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
            <div style={{ display: 'flex', gap: '8px', marginLeft: '8px' }}>

              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                style={{
                  width: '32px', height: '32px',
                  borderRadius: '50%',
                  border: '1px solid rgba(74,222,128,0.30)',
                  background: 'transparent',
                  color: 'rgba(74,222,128,0.65)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s ease', outline: 'none',
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
                  width: '32px', height: '32px',
                  borderRadius: '50%',
                  border: '1px solid rgba(74,222,128,0.30)',
                  background: 'transparent',
                  color: 'rgba(74,222,128,0.65)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s ease', outline: 'none',
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
  );
};

export default HeroCarousel;