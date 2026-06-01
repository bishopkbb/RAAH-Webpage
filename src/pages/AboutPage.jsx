/**
 * AboutPage.jsx — RAAH Technologies
 *
 * Fully rebuilt. Consistent with HomePage:
 *   Inter 900 headings, Poppins body/description
 *   Double-dash eyebrows, green accent words
 *   Dot-grid textures, ghost watermark, radial corner glows
 *   Reveal scroll animations, same card/button/hover patterns
 *   No em dashes in content
 *
 * Sections:
 *   1. Page Hero        — dark green overlay, centred headline (NO WAVE DIVIDER)
 *   2. By the Numbers   — brand green gradient, 4 stats
 *   3. What Drives Us   — white, 3 SVG-icon value columns
 *   4. How We Work      — dark green, 3-step process
 *   5. Compliance       — white, regulatory credentials grid
 *   6. CTA              — matches homepage final CTA
 */

import React, { useRef, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// ─── Fonts ────────────────────────────────────────────────────────────────────
const FI = "'Inter', sans-serif";
const FP = "'Poppins', sans-serif";

// ─── Scroll animation hook ────────────────────────────────────────────────────
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [threshold]);
  return [ref, inView];
};

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ─── Global keyframes and CSS variables ──────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @keyframes raah-pulse-ring {
      0%   { transform: scale(1);    opacity: 0.6; }
      100% { transform: scale(1.55); opacity: 0;   }
    }
    @keyframes raah-float {
      0%, 100% { transform: translateY(0px);  }
      50%       { transform: translateY(-6px); }
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { overflow-x: hidden; }
    
    :root {
      /* Typography */
      --font-hero: clamp(2rem, 6vw, 5rem);
      --font-h2: clamp(1.75rem, 5vw, 3.75rem);
      --font-h3: clamp(1.125rem, 2.5vw, 1.375rem);
      --font-body-lg: clamp(0.9375rem, 1.8vw, 1.0625rem);
      --font-body: clamp(0.875rem, 1.7vw, 1rem);
      --font-body-sm: clamp(0.7rem, 1.4vw, 0.8rem);
      --font-eyebrow: clamp(0.65rem, 1.4vw, 0.75rem);
      --font-stat-value: clamp(1.8rem, 4.5vw, 3.5rem);
      --font-stat-value-hover: clamp(2rem, 5vw, 3.8rem);
      --font-stat-label: clamp(0.875rem, 1.8vw, 1rem);
      --font-stat-sub: clamp(0.7rem, 1.4vw, 0.78rem);
      --font-badge-title: clamp(0.8rem, 1.6vw, 0.9375rem);
      --font-badge-subtitle: clamp(0.7rem, 1.4vw, 0.8rem);
      --font-process-title: clamp(1.1rem, 2.2vw, 1.3rem);
      --font-process-body: clamp(0.85rem, 1.7vw, 0.9375rem);
      --font-process-number: clamp(1.1rem, 2vw, 1.35rem);
      --font-process-number-hover: clamp(1.3rem, 2.5vw, 1.6rem);
      --font-value-label: clamp(0.7rem, 1.4vw, 0.78rem);
      --font-value-title: clamp(1.125rem, 2.5vw, 1.375rem);
      --font-value-body: clamp(0.875rem, 1.8vw, 1rem);
      --font-cta: clamp(0.8rem, 1.6vw, 0.9375rem);
      --font-cta-small: clamp(0.7rem, 1.4vw, 0.8rem);
      --font-core-value: clamp(0.75rem, 1.5vw, 0.875rem);
      
      /* Spacing */
      --padding-section: clamp(60px, 10vw, 130px);
      --padding-section-hero: clamp(80px, 15vw, 120px);
      --padding-section-cta: clamp(80px, 12vw, 120px) 0 clamp(90px, 14vw, 140px);
      --padding-card: clamp(24px, 4vw, 36px) clamp(20px, 4vw, 32px) clamp(20px, 4vw, 32px);
      --padding-card-sm: clamp(20px, 3.5vw, 28px) clamp(16px, 3vw, 24px);
      --padding-stat: clamp(24px, 4vw, 48px) clamp(16px, 3vw, 24px);
      --padding-badge: clamp(20px, 3.5vw, 28px) clamp(16px, 3vw, 24px);
      --padding-process: 0 clamp(12px, 2vw, 24px);
      --padding-narrative: 0 clamp(16px, 3vw, 24px);
      --padding-cta-container: 0 clamp(16px, 4vw, 24px);
      --margin-eyebrow: clamp(16px, 3vw, 20px);
      --margin-eyebrow-light: clamp(16px, 3vw, 20px);
      --margin-section-title: clamp(16px, 3vw, 20px);
      --margin-section-body: clamp(24px, 4vw, 40px);
      --margin-stat-value: clamp(4px, 1vw, 8px);
      --margin-stat-label: clamp(2px, 0.5vw, 4px);
      --margin-badge-title: clamp(1px, 0.3vw, 2px);
      --margin-process-title: clamp(8px, 1.5vw, 12px);
      --margin-process-number: clamp(24px, 4vw, 32px);
      --margin-value-icon: clamp(20px, 4vw, 28px);
      --margin-value-label: clamp(6px, 1vw, 8px);
      --margin-value-title: clamp(10px, 2vw, 14px);
      --gap-eyebrow: clamp(8px, 1.5vw, 10px);
      --gap-icon-text: clamp(12px, 2.5vw, 16px);
      --gap-badge: clamp(12px, 2.5vw, 16px);
      --gap-core-value: clamp(8px, 1.5vw, 12px);
      --gap-cta-buttons: clamp(12px, 2vw, 14px);
      --gap-cta-icon: clamp(8px, 1.5vw, 10px);
      
      /* Dimensions */
      --radius-card: clamp(16px, 3vw, 20px);
      --radius-card-sm: clamp(12px, 2.5vw, 16px);
      --radius-badge: clamp(10px, 2vw, 12px);
      --radius-icon: clamp(14px, 2.5vw, 18px);
      --radius-process-number: 50%;
      --height-stat: clamp(180px, 25vw, 220px);
      --height-badge: clamp(72px, 12vw, 88px);
      --height-process-number: clamp(64px, 12vw, 80px);
      --height-process-number-hover: clamp(72px, 14vw, 96px);
      --width-process-number: clamp(64px, 12vw, 80px);
      --width-process-number-hover: clamp(72px, 14vw, 96px);
      --width-pulse-ring: clamp(80px, 15vw, 96px);
      --width-pulse-ring-hover: clamp(96px, 18vw, 124px);
      --width-pulse-ring-outer: clamp(80px, 15vw, 96px);
      --width-pulse-ring-outer-hover: clamp(120px, 22vw, 148px);
      --width-icon: clamp(32px, 6vw, 42px);
      --width-icon-small: clamp(18px, 3.5vw, 22px);
      --width-icon-container: clamp(56px, 10vw, 72px);
      --width-badge-icon: clamp(40px, 7vw, 48px);
      --width-cta-button: clamp(160px, 30vw, 200px);
      --width-eyebrow-line: clamp(24px, 4vw, 32px);
      --height-eyebrow-line: clamp(1px, 0.2vw, 1.5px);
      --height-top-fade: clamp(60px, 10vw, 80px);
      --min-height-hero: clamp(50vh, 70vw, 70vh);
      --min-height-story-image: clamp(320px, 50vw, 520px);
      --max-width-hero-text: clamp(280px, 90vw, 900px);
      --max-width-hero-sub: clamp(280px, 90vw, 620px);
      --max-width-section-title: clamp(280px, 90vw, 780px);
      --max-width-section-body: clamp(280px, 90vw, 560px);
      --max-width-process-body: clamp(240px, 45vw, 280px);
      --max-width-badge-text: clamp(200px, 40vw, 280px);
      
      /* Borders & Shadows */
      --border-card: 1px solid;
      --border-card-hover: 1px solid rgba(74,222,128,0.30);
      --border-card-rest: 1px solid rgba(22,163,74,0.14);
      --border-badge-hover: 1px solid rgba(22,163,74,0.30);
      --border-badge-rest: 1px solid rgba(22,163,74,0.12);
      --border-icon-hover: 1.5px solid rgba(22,163,74,0.30);
      --border-icon-rest: 1.5px solid rgba(22,163,74,0.22);
      --border-process-number-hover: clamp(1.5px, 0.3vw, 2px) solid #4ade80;
      --border-process-number-rest: clamp(1.5px, 0.3vw, 2px) solid rgba(74,222,128,0.60);
      --border-pulse-ring-hover: clamp(1.5px, 0.3vw, 2px) solid rgba(74,222,128,0.55);
      --border-pulse-ring-rest: clamp(1.5px, 0.3vw, 2px) solid rgba(74,222,128,0.25);
      --border-pulse-ring-outer-hover: clamp(1px, 0.2vw, 1.5px) solid rgba(74,222,128,0.28);
      --border-pulse-ring-outer-rest: clamp(1px, 0.2vw, 1.5px) solid rgba(74,222,128,0.08);
      --shadow-card-hover: 0 clamp(24px, 4vw, 32px) clamp(64px, 10vw, 80px) rgba(5,46,22,0.28), 0 clamp(4px, 0.8vw, 16px) rgba(22,163,74,0.20);
      --shadow-card-rest: 0 clamp(4px, 0.8vw, 20px) rgba(5,46,22,0.08);
      --shadow-badge-hover: 0 clamp(12px, 2.5vw, 16px) clamp(40px, 7vw, 48px) rgba(5,46,22,0.12), 0 clamp(3px, 0.6vw, 4px) clamp(10px, 2vw, 12px) rgba(22,163,74,0.08);
      --shadow-badge-rest: 0 clamp(2px, 0.4vw, 2px) clamp(10px, 2vw, 12px) rgba(5,46,22,0.06);
      --shadow-process-number-hover: 0 0 0 clamp(4px, 1vw, 6px) rgba(74,222,128,0.20), 0 clamp(12px, 2.5vw, 16px) clamp(32px, 6vw, 40px) rgba(5,46,22,0.50);
      --shadow-process-number-rest: 0 0 0 clamp(8px, 1.5vw, 10px) rgba(74,222,128,0.12);
      --shadow-cta-hover: none;
      --shadow-cta-rest: 0 clamp(6px, 1vw, 8px) clamp(24px, 4vw, 32px) rgba(22,163,74,0.40);
      
      /* Colors */
      --color-bg-section-light: #dff0df;
      --color-bg-section-dark: linear-gradient(160deg, #0d7a3e 0%, #16a34a 55%, #0d7a3e 100%);
      --color-bg-card-rest: #ffffff;
      --color-bg-card-hover: linear-gradient(145deg, #1db954 0%, #16a34a 60%, #0d8a3e 100%);
      --color-bg-stat-rest: rgba(5,46,22,0.60);
      --color-bg-stat-hover: rgba(13,122,62,0.85);
      --color-text-primary: #0f172a;
      --color-text-secondary: #374151;
      --color-text-tertiary: #475569;
      --color-text-muted: #64748b;
      --color-text-white: #ffffff;
      --color-text-white-dim: rgba(255,255,255,0.90);
      --color-text-white-dimmer: rgba(220,252,231,0.65);
      --color-text-white-dimmest: rgba(220,252,231,0.55);
      --color-accent-green: #16a34a;
      --color-accent-green-light: #4ade80;
      --color-accent-green-dim: rgba(22,163,74,0.08);
      --color-accent-green-dimmer: rgba(22,163,74,0.05);
      --color-overlay: rgba(5,46,22,0.65);
      --color-overlay-gradient: linear-gradient(to bottom, transparent 40%, rgba(5,46,22,0.60) 100%);
      --color-dot-grid: rgba(5,46,22,0.06);
      --color-dot-grid-dark: rgba(74,222,128,0.08);
      --color-watermark: transparent;
      --color-watermark-dark: rgba(255,255,255,0.04);
      --color-radial-glow: rgba(22,163,74,0.07);
      --color-radial-glow-dark: rgba(22,163,74,0.14);
      --color-shimmer: linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.06) 50%, transparent 80%);
      --color-glow-icon: radial-gradient(circle, rgba(74,222,128,0.20) 0%, transparent 70%);
      --color-glow-icon-rest: radial-gradient(circle, rgba(22,163,74,0.10) 0%, transparent 70%);
      --color-glow-process: radial-gradient(circle, rgba(74,222,128,0.25) 0%, transparent 70%);
      --color-edge-fade: linear-gradient(to right, rgba(223,240,223,0.18) 0%, transparent 30%, transparent 70%, rgba(5,46,22,0.06) 100%);
      --color-top-fade: linear-gradient(to bottom, rgba(223,240,223,0.12) 0%, transparent 100%);
      
      /* Transitions */
      --transition-card: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
      --transition-icon: all 0.35s ease;
      --transition-text: color 0.3s ease;
      --transition-shimmer: left 0.7s cubic-bezier(0.22, 1, 0.36, 1);
      --transition-process: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      --transition-cta: all 0.25s ease;
      --transition-pulse: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
      --transition-pulse-outer: all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.04s;
    }
    
    /* Mobile image fix */
    .story-image-wrapper img {
      width: 100% !important;
      height: auto !important;
      min-height: 200px;
      object-fit: cover !important;
    }
    
    /* Prevent horizontal scroll */
    .about-page, .about-page * {
      max-width: 100vw;
      overflow-x: hidden;
    }
    
    /* Touch targets */
    @media (hover: none) and (pointer: coarse) {
      .about-cta, .about-nav-btn, .about-pip {
        min-height: 44px;
        min-width: 44px;
        touch-action: manipulation;
      }
    }
    
    /* Headline text balancing */
    .hero-headline-line {
      text-wrap: balance;
      hyphens: auto;
      word-break: normal;
    }
  `}</style>
);

// ─── Removed WaveDivider component entirely ─────────────────────────────────────

const DotGrid = ({ color = 'var(--color-dot-grid)' }) => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute', inset: 0,
      backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
      backgroundSize: '32px 32px',
      pointerEvents: 'none',
    }}
  />
);

const Watermark = ({ color = 'var(--color-watermark)' }) => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      fontFamily: FI, fontWeight: 900,
      fontSize: 'clamp(60px, 12vw, 180px)',
      color, letterSpacing: '-0.05em',
      whiteSpace: 'nowrap', userSelect: 'none',
      pointerEvents: 'none', lineHeight: 1,
    }}
  >
    RAAH
  </div>
);

const RadialGlow = ({ top, right, bottom, left, size = 420, opacity = 0.07 }) => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      top, right, bottom, left,
      width: size, height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, rgba(22,163,74,${opacity}) 0%, transparent 70%)`,
      pointerEvents: 'none',
    }}
  />
);

const Eyebrow = ({ label, light = false }) => (
  <div style={{ 
    display: 'inline-flex', 
    alignItems: 'center', 
    gap: 'var(--gap-eyebrow)', 
    marginBottom: 'var(--margin-eyebrow)',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }}>
    <div style={{ 
      width: 'var(--width-eyebrow-line)', 
      height: 'var(--height-eyebrow-line)', 
      background: light ? 'var(--color-accent-green-light)' : 'var(--color-accent-green)', 
      borderRadius: '999px',
      flexShrink: 0
    }} />
    <span style={{
      fontFamily: FP, 
      fontSize: 'var(--font-eyebrow)', 
      fontWeight: 600,
      letterSpacing: '0.2em', 
      textTransform: 'uppercase',
      color: light ? 'var(--color-accent-green-light)' : 'var(--color-accent-green)',
      textAlign: 'center',
      wordBreak: 'break-word'
    }}>
      {label}
    </span>
    <div style={{ 
      width: 'var(--width-eyebrow-line)', 
      height: 'var(--height-eyebrow-line)', 
      background: light ? 'var(--color-accent-green-light)' : 'var(--color-accent-green)', 
      borderRadius: '999px',
      flexShrink: 0
    }} />
  </div>
);

// ─── Bespoke SVG icons ────────────────────────────────────────────────────────
const IconMission = () => (
  <svg viewBox="0 0 48 48" fill="none" width="var(--width-icon)" height="var(--width-icon)">
    <circle cx="24" cy="24" r="20" stroke="var(--color-accent-green)" strokeWidth="1.5" fill="var(--color-accent-green-dim)"/>
    <circle cx="24" cy="24" r="13" stroke="var(--color-accent-green)" strokeWidth="1" fill="var(--color-accent-green-dimmer)"/>
    <circle cx="24" cy="24" r="4" fill="var(--color-accent-green)"/>
    <line x1="24" y1="4" x2="24" y2="11" stroke="var(--color-accent-green)" strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="37" x2="24" y2="44" stroke="var(--color-accent-green)" strokeWidth="2" strokeLinecap="round"/>
    <line x1="4" y1="24" x2="11" y2="24" stroke="var(--color-accent-green)" strokeWidth="2" strokeLinecap="round"/>
    <line x1="37" y1="24" x2="44" y2="24" stroke="var(--color-accent-green)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 11L26 20H28L24 24L20 20H22L24 11Z" fill="var(--color-accent-green)" opacity="0.6"/>
  </svg>
);

const IconIntegrity = () => (
  <svg viewBox="0 0 48 48" fill="none" width="var(--width-icon)" height="var(--width-icon)">
    <path d="M4 22H14L20 16H28L34 22H44" stroke="var(--color-accent-green)" strokeWidth="1.5" strokeLinejoin="round" fill="var(--color-accent-green-dim)"/>
    <path d="M14 22L10 32H38L34 22" stroke="var(--color-accent-green)" strokeWidth="1.5" strokeLinejoin="round" fill="var(--color-accent-green-dimmer)"/>
    <path d="M20 16L22 10H26L28 16" stroke="var(--color-accent-green)" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M18 27C20 25 22 28 24 26C26 24 28 27 30 25" stroke="var(--color-accent-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="22" r="2.5" fill="var(--color-accent-green)"/>
    <path d="M24 34L25.2 37.6H29L26.4 39.7L27.3 43.3L24 41.3L20.7 43.3L21.6 39.7L19 37.6H22.8Z" fill="var(--color-accent-green)" opacity="0.7"/>
  </svg>
);

const IconInnovation = () => (
  <svg viewBox="0 0 48 48" fill="none" width="var(--width-icon)" height="var(--width-icon)">
    <rect x="6" y="6" width="36" height="36" rx="6" fill="var(--color-accent-green-dim)" stroke="var(--color-accent-green)" strokeWidth="1.5"/>
    <path d="M14 24H20M28 24H34" stroke="var(--color-accent-green)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M24 14V20M24 28V34" stroke="var(--color-accent-green)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 24C20 21.8 21.8 20 24 20C26.2 20 28 21.8 28 24C28 26.2 26.2 28 24 28C21.8 28 20 26.2 20 24C20 21.8 21.8 20 24 20Z" fill="var(--color-accent-green-dimmer)" stroke="var(--color-accent-green)" strokeWidth="1.5"/>
    <circle cx="24" cy="24" r="2.5" fill="var(--color-accent-green)"/>
    <circle cx="12" cy="12" r="2" fill="var(--color-accent-green)" opacity="0.5"/>
    <circle cx="36" cy="12" r="2" fill="var(--color-accent-green)" opacity="0.5"/>
    <circle cx="12" cy="36" r="2" fill="var(--color-accent-green)" opacity="0.5"/>
    <circle cx="36" cy="36" r="2" fill="var(--color-accent-green)" opacity="0.5"/>
    <line x1="14" y1="12" x2="20" y2="12" stroke="var(--color-accent-green)" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    <line x1="28" y1="12" x2="34" y2="12" stroke="var(--color-accent-green)" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    <line x1="12" y1="14" x2="12" y2="20" stroke="var(--color-accent-green)" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    <line x1="12" y1="28" x2="12" y2="34" stroke="var(--color-accent-green)" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

// ─── StatCell — animated stat card ───────────────────────────────────────────
const StatCell = ({ stat }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--color-bg-stat-hover)' : 'var(--color-bg-stat-rest)',
        padding: 'var(--padding-stat)',
        textAlign: 'center',
        transition: 'background 0.3s ease',
        cursor: 'default',
        minHeight: 'var(--height-stat)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <p style={{
        fontFamily: FI, fontWeight: 900,
        fontSize: hovered ? 'var(--font-stat-value-hover)' : 'var(--font-stat-value)',
        letterSpacing: '-0.03em', lineHeight: 1,
        color: hovered ? 'var(--color-text-white)' : 'var(--color-accent-green-light)',
        marginBottom: 'var(--margin-stat-value)',
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        wordBreak: 'break-word',
      }}>{stat.value}</p>
      <p style={{
        fontFamily: FI, fontWeight: 700, 
        fontSize: 'var(--font-stat-label)',
        color: hovered ? 'var(--color-text-white)' : 'var(--color-text-white-dim)',
        marginBottom: 'var(--margin-stat-label)', 
        transition: 'var(--transition-text)',
        wordBreak: 'break-word',
      }}>{stat.label}</p>
      <p style={{
        fontFamily: FP, fontWeight: 400, 
        fontSize: 'var(--font-stat-sub)',
        color: hovered ? 'rgba(220,252,231,0.85)' : 'var(--color-text-white-dimmest)',
        textTransform: 'uppercase', 
        letterSpacing: '0.08em',
        transition: 'var(--transition-text)',
        wordBreak: 'break-word',
      }}>{stat.sub}</p>
    </div>
  );
};

// ─── Value card ──────────────────────────────────────────────────────────────
const ValueCard = ({ icon, label, title, body, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? 'var(--color-bg-card-hover)' : 'var(--color-bg-card-rest)',
          borderRadius: 'var(--radius-card)',
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          boxShadow: hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card-rest)',
          transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
          transition: 'var(--transition-card)',
          border: 'var(--border-card)',
          borderColor: hovered ? 'var(--border-card-hover)' : 'var(--border-card-rest)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0,
          left: hovered ? '120%' : '-60%',
          width: '50%', height: '100%',
          background: 'var(--color-shimmer)',
          transform: 'skewX(-15deg)',
          transition: 'var(--transition-shimmer)',
          pointerEvents: 'none',
        }} />
        <div style={{
          height: 'clamp(2px, 0.3vw, 3px)',
          background: hovered
            ? 'linear-gradient(to right, #4ade80, #86efac, #4ade80)'
            : 'linear-gradient(to right, #16a34a, #22c55e)',
          transition: 'background 0.4s ease',
        }} />
        <div style={{ 
          padding: 'var(--padding-card)', 
          position: 'relative', 
          zIndex: 1,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            width: 'var(--width-icon-container)', 
            height: 'var(--width-icon-container)', 
            borderRadius: 'var(--radius-icon)',
            background: hovered ? '#ffffff' : 'var(--color-accent-green-dim)',
            border: `1.5px solid ${hovered ? 'rgba(22,163,74,0.30)' : 'rgba(22,163,74,0.22)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', transition: 'var(--transition-icon)',
            margin: `0 auto var(--margin-value-icon)`,
            flexShrink: 0,
          }}>
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 'clamp(-8px, -1.5vw, -10px)', 
              borderRadius: 'clamp(20px, 4vw, 26px)',
              background: hovered ? 'var(--color-glow-icon)' : 'var(--color-glow-icon-rest)',
              pointerEvents: 'none', transition: 'background 0.4s ease',
            }} />
            {icon}
          </div>
          <p style={{
            fontFamily: FP, 
            fontSize: 'var(--font-value-label)', 
            fontWeight: 600,
            letterSpacing: '0.18em', 
            textTransform: 'uppercase',
            color: hovered ? '#ffffff' : 'var(--color-accent-green)',
            marginBottom: 'var(--margin-value-label)', 
            transition: 'var(--transition-text)',
            textAlign: 'center',
            wordBreak: 'break-word',
          }}>{label}</p>
          <h3 style={{
            fontFamily: FI, 
            fontSize: 'var(--font-value-title)', 
            fontWeight: 800,
            letterSpacing: '-0.02em', 
            color: hovered ? '#ffffff' : 'var(--color-accent-green)',
            marginBottom: 'var(--margin-value-title)', 
            lineHeight: 1.25,
            transition: 'var(--transition-text)',
            textAlign: 'center',
            wordBreak: 'break-word',
          }}>{title}</h3>
          <p style={{
            fontFamily: FP, 
            fontSize: 'var(--font-value-body)', 
            fontWeight: 400,
            lineHeight: 1.80,
            color: hovered ? '#ffffff' : '#1a1a1a',
            transition: 'var(--transition-text)',
            flexGrow: 1,
            wordBreak: 'break-word',
          }}>{body}</p>
        </div>
      </div>
    </Reveal>
  );
};

// ─── Process step ─────────────────────────────────────────────────────────────
const ProcessStep = ({ number, title, body, isLast, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          textAlign: 'center',
          position: 'relative', 
          cursor: 'default',
          padding: 'var(--padding-process)',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 'clamp(-12px, -2vw, -16px)',
            width: hovered ? 'var(--width-pulse-ring-hover)' : 'var(--width-pulse-ring)',
            height: hovered ? 'var(--width-pulse-ring-hover)' : 'var(--width-pulse-ring)',
            borderRadius: 'var(--radius-process-number)',
            border: `var(--border-pulse-ring-rest)`,
            borderColor: hovered ? 'var(--border-pulse-ring-hover)' : 'var(--border-pulse-ring-rest)',
            animation: hovered ? 'raah-pulse-ring 1.0s ease-out infinite' : 'none',
            transition: 'var(--transition-pulse)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 'clamp(-20px, -3.5vw, -28px)',
            width: hovered ? 'var(--width-pulse-ring-outer-hover)' : 'var(--width-pulse-ring-outer)',
            height: hovered ? 'var(--width-pulse-ring-outer-hover)' : 'var(--width-pulse-ring-outer)',
            borderRadius: 'var(--radius-process-number)',
            border: `var(--border-pulse-ring-outer-rest)`,
            borderColor: hovered ? 'var(--border-pulse-ring-outer-hover)' : 'var(--border-pulse-ring-outer-rest)',
            transition: 'var(--transition-pulse-outer)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            width: hovered ? 'var(--height-process-number-hover)' : 'var(--height-process-number)',
            height: hovered ? 'var(--height-process-number-hover)' : 'var(--height-process-number)',
            borderRadius: 'var(--radius-process-number)',
            background: hovered
              ? 'linear-gradient(135deg, #0d7a3e 0%, #16a34a 100%)'
              : 'rgba(74,222,128,0.18)',
            border: `var(--border-process-number-rest)`,
            borderColor: hovered ? 'var(--border-process-number-hover)' : 'var(--border-process-number-rest)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 'var(--margin-process-number)', 
            flexShrink: 0,
            boxShadow: hovered ? 'var(--shadow-process-number-hover)' : 'var(--shadow-process-number-rest)',
            animation: hovered ? 'none' : 'raah-float 3s ease-in-out infinite',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {hovered && (
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0, borderRadius: 'var(--radius-process-number)',
              background: 'var(--color-glow-process)',
              pointerEvents: 'none',
            }} />
          )}
          <span
            style={{
              fontFamily: FI, 
              fontWeight: 900,
              fontSize: hovered ? 'var(--font-process-number-hover)' : 'var(--font-process-number)',
              color: hovered ? '#ffffff' : '#ffffff',
              letterSpacing: '-0.02em',
              transition: 'var(--transition-process)',
              lineHeight: 1,
            }}
          >
            {number}
          </span>
        </div>

        {!isLast && (
          <div aria-hidden="true" style={{
            position: 'absolute',
            top: 'clamp(32px, 6vw, 40px)',
            left: 'calc(50% + clamp(40px, 7vw, 48px))',
            width: 'calc(100% - var(--width-process-number))',
            height: 'clamp(1.5px, 0.3vw, 2px)',
            background: 'linear-gradient(to right, rgba(74,222,128,0.40), rgba(74,222,128,0.08))',
            display: 'none',
          }} className="lg:block" />
        )}

        <h3
          style={{
            fontFamily: FI, 
            fontWeight: 800,
            fontSize: 'var(--font-process-title)',
            letterSpacing: '-0.02em',
            color: hovered ? '#ffffff' : 'var(--color-text-white-dim)',
            marginBottom: 'var(--margin-process-title)', 
            lineHeight: 1.2,
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'var(--transition-process) 0.05s',
            wordBreak: 'break-word',
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontFamily: FP, 
            fontSize: 'var(--font-process-body)', 
            fontWeight: 400,
            lineHeight: 1.75,
            color: hovered ? 'rgba(220,252,231,0.95)' : 'var(--color-text-white-dimmer)',
            maxWidth: 'var(--max-width-process-body)',
            transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'var(--transition-process) 0.08s',
            wordBreak: 'break-word',
          }}
        >
          {body}
        </p>
      </div>
    </Reveal>
  );
};

// ─── Compliance badge ─────────────────────────────────────────────────────────
const Badge = ({ title, subtitle, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-badge)',
          padding: 'var(--padding-badge)',
          border: 'var(--border-card)',
          borderColor: hovered ? 'var(--border-badge-hover)' : 'var(--border-badge-rest)',
          boxShadow: hovered ? 'var(--shadow-badge-hover)' : 'var(--shadow-badge-rest)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'var(--transition-card)',
          display: 'flex', 
          alignItems: 'center', 
          gap: 'var(--gap-badge)',
          minHeight: 'var(--height-badge)',
        }}
      >
        <div style={{
          width: 'var(--width-badge-icon)', 
          height: 'var(--width-badge-icon)', 
          borderRadius: 'var(--radius-badge)', 
          flexShrink: 0,
          background: hovered ? 'var(--color-accent-green)' : 'var(--color-accent-green-dim)',
          border: `clamp(1px, 0.2vw, 1.5px) solid ${hovered ? 'var(--color-accent-green)' : 'rgba(22,163,74,0.20)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s ease',
        }}>
          <svg viewBox="0 0 24 24" fill="none" width="var(--width-icon-small)" height="var(--width-icon-small)">
            <path d="M12 2L4 5.5V11C4 16.5 7.5 21.5 12 23C16.5 21.5 20 16.5 20 11V5.5L12 2Z"
              stroke={hovered ? '#ffffff' : 'var(--color-accent-green)'} 
              strokeWidth="1.5" 
              strokeLinejoin="round"
              fill={hovered ? 'rgba(255,255,255,0.15)' : 'var(--color-accent-green-dim)'}
            />
            <path d="M9 12L11 14L15 10" 
              stroke={hovered ? '#ffffff' : 'var(--color-accent-green)'}
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{
            fontFamily: FI, 
            fontWeight: 700, 
            fontSize: 'var(--font-badge-title)',
            color: 'var(--color-text-primary)', 
            marginBottom: 'var(--margin-badge-title)', 
            lineHeight: 1.2,
            wordBreak: 'break-word',
          }}>{title}</p>
          <p style={{
            fontFamily: FP, 
            fontWeight: 400, 
            fontSize: 'var(--font-badge-subtitle)',
            color: 'var(--color-text-muted)', 
            lineHeight: 1.4,
            wordBreak: 'break-word',
          }}>{subtitle}</p>
        </div>
      </div>
    </Reveal>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const AboutPage = () => (
  <Layout>
    <GlobalStyles />

    {/* ══════════════════════════════════════════════════════════════
        1. PAGE HERO — NO WAVE DIVIDER, MATCHES HOMEPAGE HERO STYLE
    ══════════════════════════════════════════════════════════════ */}
    <section style={{ 
      position: 'relative', 
      minHeight: 'var(--min-height-hero)', 
      display: 'flex', 
      alignItems: 'center', 
      overflow: 'hidden',
      paddingBottom: 'clamp(40px, 8vw, 60px)' // Added bottom padding to replace wave
    }}>
      <img
        src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000&h=900&crop=top"
        alt="RAAH Technologies team"
        style={{ 
          position: 'absolute', 
          inset: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          objectPosition: 'center 30%',
          maxWidth: '100%',
        }}
      />
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'var(--color-overlay)',
        zIndex: 1
      }} aria-hidden="true" />
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'var(--color-overlay-gradient)',
        zIndex: 1
      }} aria-hidden="true" />
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.07) 1px, transparent 1px)', 
        backgroundSize: '32px 32px', 
        pointerEvents: 'none',
        zIndex: 1
      }} aria-hidden="true" />

      <div className="container-custom" style={{ 
        position: 'relative', 
        zIndex: 2, 
        textAlign: 'center', 
        padding: 'var(--padding-section-hero) clamp(16px, 4vw, 24px)',
        maxWidth: '100%',
      }}>
        <Reveal delay={0}>
          <Eyebrow label="Our Story" light />
        </Reveal>
        
        {/* ✅ Updated hero heading with isolated green accent line */}
        <Reveal delay={80}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            maxWidth: 'var(--max-width-hero-text)',
            margin: '0 auto',
            gap: 'clamp(0.15em, 1.5vw, 0.3em)'
          }}>
            {/* Line 1 */}
            <h1 style={{
              fontFamily: FI, 
              fontWeight: 900,
              fontSize: 'var(--font-hero)',
              letterSpacing: '-0.03em', 
              lineHeight: 1.05,
              color: '#ffffff', 
              display: 'block', 
              width: '100%',
              textShadow: '0 2px 8px rgba(0,0,0,0.15)',
              wordBreak: 'break-word',
              textWrap: 'balance'
            }}>
              Built for the People
            </h1>

            {/* Line 2 — Green Accent (isolated on its own line) */}
            <h1 style={{
              fontFamily: FI, 
              fontWeight: 900,
              fontSize: 'var(--font-hero)',
              letterSpacing: '-0.03em', 
              lineHeight: 1.05,
              color: 'var(--color-accent-green-light)', 
              display: 'block', 
              width: '100%',
              textShadow: '0 2px 12px rgba(74,222,128,0.35)',
              wordBreak: 'break-word',
              textWrap: 'balance'
            }}>
              Who Keep
            </h1>

            {/* Line 3 */}
            <h1 style={{
              fontFamily: FI, 
              fontWeight: 900,
              fontSize: 'var(--font-hero)',
              letterSpacing: '-0.03em', 
              lineHeight: 1.05,
              color: '#ffffff', 
              display: 'block', 
              width: '100%',
              textShadow: '0 2px 8px rgba(0,0,0,0.15)',
              wordBreak: 'break-word',
              textWrap: 'balance'
            }}>
              Care Moving
            </h1>
          </div>
        </Reveal>
        
        <Reveal delay={160}>
          <p style={{
            fontFamily: FP, 
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 500, 
            lineHeight: 1.75,
            color: 'rgba(220,252,231,0.85)',
            maxWidth: 'var(--max-width-hero-sub)', 
            margin: `0 auto var(--margin-section-body)`,
            wordBreak: 'break-word',
          }}>
            RAAH Technologies was built by people who understood the frustration of running a home health agency on disconnected tools, paper workflows, and reactive billing. We decided to fix it.
          </p>
        </Reveal>
      </div>
    </section>

    {/* REMOVED WAVE DIVIDER HERE */}

    {/* ══════════════════════════════════════════════════════════════
        2. OUR STORY — FIXED MOBILE IMAGE DISPLAY
    ══════════════════════════════════════════════════════════════ */}
    <section style={{ 
      background: 'var(--color-bg-section-light)', 
      padding: 'var(--padding-section) 0', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      <DotGrid />
      <Watermark />
      <RadialGlow top="-60px" right="-60px" size={420} opacity={0.07} />
      <RadialGlow bottom="-60px" left="-60px" size={360} opacity={0.06} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <style>{`
          .story-grid {
            display: grid;
            gap: clamp(32px, 6vw, 80px);
            align-items: stretch;
            grid-template-columns: 1fr;
          }
          @media (min-width: 768px) {
            .story-grid { grid-template-columns: 1fr 1fr; }
          }
        `}</style>
        <div className="story-grid">

          {/* Image — FIXED FOR MOBILE */}
          <Reveal delay={0}>
            <div style={{ 
              position: 'relative', 
              height: '100%', 
              minHeight: 'var(--min-height-story-image)',
              width: '100%'
            }}>
              <div aria-hidden="true" style={{
                position: 'absolute', 
                top: 'clamp(-16px, -2.5vw, -24px)', 
                left: 'clamp(-16px, -2.5vw, -24px)', 
                right: 'clamp(16px, 2.5vw, 24px)', 
                bottom: 'clamp(16px, 2.5vw, 24px)',
                borderRadius: 'clamp(16px, 2.5vw, 24px)', 
                border: 'clamp(1px, 0.2vw, 1.5px) solid rgba(22,163,74,0.15)', 
                zIndex: 0,
              }} />
              <div style={{
                position: 'relative', 
                zIndex: 1, 
                borderRadius: 'clamp(16px, 2.5vw, 20px)', 
                overflow: 'hidden',
                height: '100%',
                boxShadow: '0 clamp(24px, 4vw, 32px) clamp(64px, 10vw, 80px) rgba(5,46,22,0.14), 0 clamp(6px, 1vw, 8px) clamp(20px, 3.5vw, 24px) rgba(5,46,22,0.08)',
              }}>
                {/* FIXED IMAGE PATH AND STYLING */}
                <img
                  src="/assets/about page.jpeg" // Fixed path - no backslashes
                  alt="RAAH Technologies team collaborating in their office"
                  className="story-image-wrapper" // Added class for mobile fix
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    objectPosition: 'center', 
                    display: 'block',
                    transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                    maxWidth: '100%',
                  }}
                  onError={(e) => {
                    // Fallback image if local asset fails
                    e.target.src = "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200&h=600";
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
                <div aria-hidden="true" style={{
                  position: 'absolute', 
                  inset: 0,
                  background: 'var(--color-edge-fade)',
                  pointerEvents: 'none',
                }} />
                <div aria-hidden="true" style={{
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  height: 'var(--height-top-fade)',
                  background: 'var(--color-top-fade)',
                  pointerEvents: 'none',
                }} />
              </div>
              <div className="hidden lg:flex" style={{
                position: 'absolute', 
                top: 'clamp(-16px, -2.5vw, -20px)', 
                right: 'clamp(-16px, -2.5vw, -20px)', 
                zIndex: 10,
                background: 'linear-gradient(135deg, #0d7a3e 0%, #16a34a 100%)',
                borderRadius: '999px', 
                padding: 'clamp(8px, 1.5vw, 10px) clamp(14px, 2.5vw, 18px)',
                boxShadow: '0 clamp(6px, 1vw, 8px) clamp(20px, 3.5vw, 24px) rgba(5,46,22,0.30)',
                border: 'clamp(1px, 0.2vw, 1.5px) solid rgba(74,222,128,0.20)',
                alignItems: 'center', 
                gap: 'clamp(6px, 1vw, 8px)',
                maxWidth: 'var(--max-width-badge-text)',
                width: 'auto',
              }}>
                <span style={{ 
                  width: 'clamp(5px, 1vw, 7px)', 
                  height: 'clamp(5px, 1vw, 7px)', 
                  borderRadius: '50%', 
                  background: '#4ade80', 
                  flexShrink: 0, 
                  boxShadow: '0 0 clamp(6px, 1vw, 8px) rgba(74,222,128,0.60)', 
                  display: 'inline-block' 
                }} />
                <span style={{ 
                  fontFamily: FP, 
                  fontSize: 'clamp(0.65rem, 1.3vw, 0.72rem)', 
                  fontWeight: 600, 
                  color: '#ffffff', 
                  letterSpacing: '0.06em', 
                  whiteSpace: 'nowrap',
                  wordBreak: 'break-word',
                }}>
                  Founded in Aurora, CO
                </span>
              </div>
            </div>
          </Reveal>

          {/* Narrative */}
          <Reveal delay={150}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              padding: 'var(--padding-narrative)',
            }}>
              <Eyebrow label="Our Story" />
              <h2 style={{
                fontFamily: FI, 
                fontWeight: 900,
                fontSize: 'var(--font-h2)',
                letterSpacing: '-0.03em', 
                lineHeight: 1.08,
                color: 'var(--color-text-primary)', 
                marginBottom: 'var(--margin-section-title)',
                wordBreak: 'break-word',
              }}>
                From Frustration{' '}
                <span style={{ color: 'var(--color-accent-green)' }}>to Platform</span>
              </h2>
              <p style={{ 
                fontFamily: FP, 
                fontSize: 'var(--font-body-lg)', 
                fontWeight: 500, 
                lineHeight: 1.80, 
                color: 'var(--color-text-secondary)', 
                marginBottom: 'clamp(16px, 2.5vw, 20px)',
                wordBreak: 'break-word',
              }}>
                RAAH Technologies was founded by a team that had spent years inside home health agencies, watching skilled nurses and coordinators spend hours each day fighting their own software instead of focusing on patients.
              </p>
              <p style={{ 
                fontFamily: FP, 
                fontSize: 'var(--font-body)', 
                fontWeight: 400, 
                lineHeight: 1.80, 
                color: 'var(--color-text-tertiary)', 
                marginBottom: 'clamp(16px, 2.5vw, 20px)',
                wordBreak: 'break-word',
              }}>
                The problems were consistent: disconnected billing systems, manual EVV workarounds, scheduling tools that created more conflicts than they resolved, and compliance exposure that kept agency owners awake at night. Existing platforms were either too rigid or too fragmented to address all of them at once.
              </p>
              <p style={{ 
                fontFamily: FP, 
                fontSize: 'var(--font-body)', 
                fontWeight: 400, 
                lineHeight: 1.80, 
                color: 'var(--color-text-tertiary)', 
                marginBottom: 'clamp(24px, 4vw, 36px)',
                wordBreak: 'break-word',
              }}>
                We built RAAH to be the platform we wished had existed. One system that handles every clinical, operational, and financial workflow from the first patient referral to the final 835 remittance posting. Built specifically for home health, designed without compromise.
              </p>
              {/* Core values row */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: 'var(--gap-core-value)',
                width: '100%',
              }}>
                {[
                  'HIPAA-Grade Security',
                  'Real-Time EVV Sync',
                  'Automated Billing',
                  'Built for Growth',
                ].map((item) => (
                  <div key={item} style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'clamp(6px, 1vw, 10px)',
                    padding: 'clamp(8px, 1.5vw, 12px) clamp(12px, 2vw, 16px)', 
                    borderRadius: 'clamp(8px, 1.5vw, 10px)',
                    background: 'rgba(22,163,74,0.05)',
                    border: 'clamp(1px, 0.2vw, 1px) solid rgba(22,163,74,0.12)',
                    minHeight: 'clamp(48px, 8vw, 56px)',
                  }}>
                    <svg viewBox="0 0 16 16" fill="none" width="clamp(12px, 2vw, 14px)" height="clamp(12px, 2vw, 14px)">
                      <path d="M3 8L6.5 11.5L13 5" stroke="var(--color-accent-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ 
                      fontFamily: FI, 
                      fontWeight: 700, 
                      fontSize: 'var(--font-core-value)', 
                      color: 'var(--color-text-primary)',
                      wordBreak: 'break-word',
                    }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>

    {/* REMOVED WAVE DIVIDER BEFORE NUMBERS SECTION */}

    {/* ══════════════════════════════════════════════════════════════
        3. BY THE NUMBERS
    ══════════════════════════════════════════════════════════════ */}
    <section style={{
      background: 'var(--color-bg-section-dark)',
      padding: 'clamp(60px, 10vw, 100px) 0', 
      position: 'relative', 
      overflow: 'hidden',
    }}>
      <DotGrid color="var(--color-dot-grid-dark)" />
      <Watermark color="var(--color-watermark-dark)" />
      <RadialGlow top="-80px" right="-80px" size={500} opacity={0.14} />
      <RadialGlow bottom="-80px" left="-80px" size={400} opacity={0.10} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 7vw, 60px)' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 'var(--gap-eyebrow)', 
              marginBottom: 'var(--margin-eyebrow)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <div style={{ 
                width: 'var(--width-eyebrow-line)', 
                height: 'var(--height-eyebrow-line)', 
                background: '#ffffff', 
                borderRadius: '999px',
                flexShrink: 0
              }} />
              <span style={{ 
                fontFamily: FP, 
                fontSize: 'var(--font-eyebrow)', 
                fontWeight: 600, 
                letterSpacing: '0.2em', 
                textTransform: 'uppercase', 
                color: '#ffffff',
                wordBreak: 'break-word',
              }}>By The Numbers</span>
              <div style={{ 
                width: 'var(--width-eyebrow-line)', 
                height: 'var(--height-eyebrow-line)', 
                background: '#ffffff', 
                borderRadius: '999px',
                flexShrink: 0
              }} />
            </div>
            <h2 style={{
              fontFamily: FI, 
              fontWeight: 900,
              fontSize: 'var(--font-h2)',
              letterSpacing: '-0.03em', 
              lineHeight: 1.08,
              color: '#ffffff', 
              maxWidth: 'clamp(280px, 90vw, 680px)', 
              margin: '0 auto',
              wordBreak: 'break-word',
            }}>
              Trusted Across the{' '}
              <span style={{ 
                color: '#ffffff', 
                textDecoration: 'underline', 
                textDecorationColor: 'rgba(255,255,255,0.40)', 
                textUnderlineOffset: 'clamp(4px, 0.8vw, 6px)' 
              }}>Country</span>
            </h2>
          </div>
        </Reveal>

        <style>{`
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(1px, 0.2vw, 1px);
            background: rgba(74,222,128,0.10);
            border-radius: clamp(12px, 2.5vw, 16px);
            overflow: hidden;
          }
          @media (min-width: 768px) {
            .stats-grid { grid-template-columns: repeat(4, 1fr); }
          }
        `}</style>
        <div className="stats-grid">
          {[
            { value: '500+',  label: 'Agencies Served',       sub: 'Across 30 states' },
            { value: '1M+',   label: 'Visits Managed',        sub: 'Annually on the platform' },
            { value: '99.2%', label: 'Billing Accuracy',      sub: 'Industry-leading rate' },
            { value: '24hr',  label: 'Avg Setup Time',        sub: 'From contract to live' },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <StatCell stat={stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* REMOVED WAVE DIVIDER AFTER NUMBERS SECTION */}

    {/* ══════════════════════════════════════════════════════════════
        4. WHAT DRIVES US
    ══════════════════════════════════════════════════════════════ */}
    <section style={{ 
      background: 'var(--color-bg-section-light)', 
      padding: 'var(--padding-section) 0', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      <DotGrid />
      <Watermark />
      <RadialGlow top="-60px" right="-60px" size={420} opacity={0.07} />
      <RadialGlow bottom="-60px" left="-60px" size={360} opacity={0.06} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(56px, 9vw, 72px)' }}>
            <Eyebrow label="What Drives Us" />
            <h2 style={{
              fontFamily: FI, 
              fontWeight: 900,
              fontSize: 'var(--font-h2)',
              letterSpacing: '-0.03em', 
              lineHeight: 1.08,
              color: 'var(--color-text-primary)', 
              maxWidth: 'var(--max-width-section-title)', 
              margin: `0 auto var(--margin-section-title)`,
              wordBreak: 'break-word',
            }}>
              Three Principles.{' '}
              <span style={{ color: 'var(--color-accent-green)' }}>One Standard.</span>
            </h2>
            <p style={{
              fontFamily: FP, 
              fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
              fontWeight: 500, 
              lineHeight: 1.75, 
              color: 'var(--color-text-secondary)',
              maxWidth: 'var(--max-width-section-body)', 
              margin: '0 auto',
              wordBreak: 'break-word',
            }}>
              Every product decision, every support interaction, and every line of code is shaped by the same three commitments.
            </p>
          </div>
        </Reveal>

        <style>{`
          .values-grid {
            display: grid;
            gap: clamp(20px, 4vw, 24px);
            align-items: stretch;
            grid-template-columns: 1fr;
          }
          @media (min-width: 768px) {
            .values-grid { grid-template-columns: repeat(3, 1fr); }
          }
        `}</style>
        <div className="values-grid">
          <ValueCard
            delay={100}
            icon={<IconMission />}
            label="Purpose"
            title="Patient Outcomes First"
            body="We measure our success by one thing: whether our platform helps agencies deliver better care to more patients. Every feature, every update, and every workflow decision traces back to that outcome."
          />
          <ValueCard
            delay={180}
            icon={<IconIntegrity />}
            label="Character"
            title="Uncompromising Integrity"
            body="In healthcare, integrity is not a brand value, it is a clinical requirement. We hold ourselves to the same compliance standards we help our clients meet. No shortcuts, no workarounds, no exceptions."
          />
          <ValueCard
            delay={260}
            icon={<IconInnovation />}
            label="Approach"
            title="Built to Evolve"
            body="CMS regulations change. Payer requirements shift. State EVV mandates expand. Our platform evolves automatically so your team never has to scramble to stay compliant when the rules move."
          />
        </div>
      </div>
    </section>

    {/* REMOVED WAVE DIVIDER */}

    {/* ══════════════════════════════════════════════════════════════
        5. HOW WE WORK
    ══════════════════════════════════════════════════════════════ */}
    <section style={{
      background: 'var(--color-bg-section-dark)',
      padding: 'var(--padding-section) 0', 
      position: 'relative', 
      overflow: 'hidden',
    }}>
      <DotGrid color="var(--color-dot-grid-dark)" />
      <Watermark color="var(--color-watermark-dark)" />
      <RadialGlow top="-60px" right="-60px" size={420} opacity={0.12} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(60px, 10vw, 80px)' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 'var(--gap-eyebrow)', 
              marginBottom: 'var(--margin-eyebrow)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <div style={{ 
                width: 'var(--width-eyebrow-line)', 
                height: 'var(--height-eyebrow-line)', 
                background: '#ffffff', 
                borderRadius: '999px',
                flexShrink: 0
              }} />
              <span style={{ 
                fontFamily: FP, 
                fontSize: 'var(--font-eyebrow)', 
                fontWeight: 600, 
                letterSpacing: '0.2em', 
                textTransform: 'uppercase', 
                color: '#ffffff',
                wordBreak: 'break-word',
              }}>How We Work</span>
              <div style={{ 
                width: 'var(--width-eyebrow-line)', 
                height: 'var(--height-eyebrow-line)', 
                background: '#ffffff', 
                borderRadius: '999px',
                flexShrink: 0
              }} />
            </div>
            <h2 style={{
              fontFamily: FI, 
              fontWeight: 900,
              fontSize: 'var(--font-h2)',
              letterSpacing: '-0.03em', 
              lineHeight: 1.08,
              color: '#ffffff', 
              maxWidth: 'var(--max-width-section-title)', 
              margin: `0 auto var(--margin-section-title)`,
              wordBreak: 'break-word',
            }}>
              From Contract to{' '}
              <span style={{ 
                color: '#ffffff', 
                textDecoration: 'underline', 
                textDecorationColor: 'rgba(255,255,255,0.40)', 
                textUnderlineOffset: 'clamp(4px, 0.8vw, 6px)' 
              }}>Fully Operational</span>
            </h2>
            <p style={{
              fontFamily: FP, 
              fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
              fontWeight: 500, 
              lineHeight: 1.75,
              color: 'var(--color-text-white-dim)',
              maxWidth: 'var(--max-width-section-body)', 
              margin: '0 auto',
              wordBreak: 'break-word',
            }}>
              Most agencies are live within 24 hours. No IT department required. No months-long implementations.
            </p>
          </div>
        </Reveal>

        <style>{`
          .process-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: clamp(40px, 7vw, 48px);
            position: relative;
          }
          @media (min-width: 768px) {
            .process-grid { grid-template-columns: repeat(3, 1fr); }
          }
        `}</style>
        <div className="process-grid">
          <ProcessStep
            delay={100} number="01" isLast={false}
            title="Guided Onboarding"
            body="Your dedicated implementation specialist configures the platform for your specific payer mix, state EVV rules, and clinical disciplines. We do the setup. You review and approve."
          />
          <ProcessStep
            delay={200} number="02" isLast={false}
            title="Team Activation"
            body="Caregivers are onboarded to the mobile app in under an hour. Office staff receive role-specific training on scheduling, billing, and compliance tools. Average go-live is 24 hours."
          />
          <ProcessStep
            delay={300} number="03" isLast={true}
            title="Ongoing Partnership"
            body="Your account is assigned a dedicated success manager. Platform updates deploy automatically. Regulatory changes are absorbed on our end so you never have to react to a CMS shift alone."
          />
        </div>
      </div>
    </section>

    {/* REMOVED WAVE DIVIDER */}

    {/* ══════════════════════════════════════════════════════════════
        6. COMPLIANCE CREDENTIALS
    ══════════════════════════════════════════════════════════════ */}
    <section style={{ 
      background: 'var(--color-bg-section-light)', 
      padding: 'var(--padding-section) 0', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      <DotGrid />
      <Watermark />
      <RadialGlow top="-60px" right="-60px" size={420} opacity={0.07} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <style>{`
          .compliance-grid {
            display: grid;
            gap: clamp(40px, 7vw, 80px);
            grid-template-columns: 1fr;
          }
          @media (min-width: 768px) {
            .compliance-grid { 
              grid-template-columns: 1fr 1fr; 
              align-items: flex-end;
            }
          }
        `}</style>
        <div className="compliance-grid">

          {/* Left — narrative */}
          <Reveal delay={0}>
            <div style={{ padding: 'var(--padding-narrative)' }}>
              <Eyebrow label="Compliance" />
              <h2 style={{
                fontFamily: FI, 
                fontWeight: 900,
                fontSize: 'var(--font-h2)',
                letterSpacing: '-0.03em', 
                lineHeight: 1.08,
                color: 'var(--color-text-primary)', 
                marginBottom: 'var(--margin-section-title)',
                wordBreak: 'break-word',
              }}>
                Regulatory Confidence,{' '}
                <span style={{ color: 'var(--color-accent-green)' }}>Built In</span>
              </h2>
              <p style={{ 
                fontFamily: FP, 
                fontSize: 'var(--font-body-lg)', 
                fontWeight: 500, 
                lineHeight: 1.80, 
                color: 'var(--color-text-secondary)', 
                marginBottom: 'clamp(16px, 2.5vw, 20px)',
                wordBreak: 'break-word',
              }}>
                Compliance in home health is not a feature you toggle on. It is the foundation every other workflow is built on. RAAH was engineered from the ground up to meet the most demanding regulatory requirements in the industry.
              </p>
              <p style={{ 
                fontFamily: FP, 
                fontSize: 'var(--font-body)', 
                fontWeight: 400, 
                lineHeight: 1.80, 
                color: 'var(--color-text-tertiary)', 
                marginBottom: 'clamp(16px, 2.5vw, 20px)',
                wordBreak: 'break-word',
              }}>
                Our legal and clinical teams monitor CMS rule changes, state EVV mandate updates, and payer policy shifts continuously. When regulations change, the platform updates automatically. Your agency stays ahead without lifting a finger.
              </p>
              <p style={{ 
                fontFamily: FP, 
                fontSize: 'var(--font-body)', 
                fontWeight: 400, 
                lineHeight: 1.80, 
                color: 'var(--color-text-tertiary)',
                wordBreak: 'break-word',
              }}>
                Every piece of patient data is encrypted at rest and in transit using AES-256. Role-based access controls ensure caregivers, coordinators, and administrators only see what they need to see. A full audit trail is maintained on every record interaction.
              </p>
            </div>
          </Reveal>

          {/* Right — badge grid */}
          <style>{`
            .badge-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: clamp(12px, 2vw, 16px);
            }
            @media (min-width: 480px) {
              .badge-grid { grid-template-columns: repeat(2, 1fr); }
            }
          `}</style>
          <div className="badge-grid">
            {[
              { title: 'HIPAA Compliant', subtitle: 'End-to-end encryption, BAA available', delay: 100 },
              { title: 'CMS Certified',   subtitle: 'OASIS, PDGM, and HH-CAHPS aligned', delay: 180 },
              { title: 'EVV Integrated',  subtitle: 'All state aggregators supported', delay: 260 },
              { title: 'SOC 2 Type II',   subtitle: 'Annual third-party audit', delay: 340 },
              { title: '21st Century Cures', subtitle: 'Interoperability compliant', delay: 420 },
              { title: 'State Licensed',  subtitle: '30-state coverage and growing', delay: 500 },
            ].map((badge) => (
              <Badge key={badge.title} {...badge} />
            ))}
          </div>

        </div>
      </div>
    </section>

    {/* REMOVED WAVE DIVIDER */}

    {/* ══════════════════════════════════════════════════════════════
        7. CTA
    ══════════════════════════════════════════════════════════════ */}
    <section style={{ 
      background: 'var(--color-bg-section-light)', 
      padding: 'var(--padding-section-cta)', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      <DotGrid />
      <Watermark color="var(--color-watermark)" />
      <RadialGlow top="-100px" right="-100px" size={600} opacity={0.07} />
      <RadialGlow bottom="-100px" left="-100px" size={500} opacity={0.06} />

      <div className="container-custom" style={{ 
        position: 'relative', 
        zIndex: 1, 
        textAlign: 'center',
        padding: 'var(--padding-cta-container)',
      }}>

        <Reveal delay={0}>
          <Eyebrow label="Get Started" />
        </Reveal>

        <Reveal delay={80}>
          <h2 style={{
            fontFamily: FI, 
            fontWeight: 900,
            fontSize: 'var(--font-h2)',
            letterSpacing: '-0.03em', 
            lineHeight: 1.08,
            color: 'var(--color-text-primary)', 
            maxWidth: 'clamp(280px, 90vw, 820px)',
            margin: `0 auto var(--margin-section-title)`,
            wordBreak: 'break-word',
          }}>
            See What RAAH Can Do{' '}
            <span style={{ color: 'var(--color-accent-green)' }}>for Your Agency</span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p style={{
            fontFamily: FP, 
            fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
            fontWeight: 500, 
            lineHeight: 1.75, 
            color: 'var(--color-text-secondary)',
            maxWidth: 'var(--max-width-section-body)', 
            margin: `0 auto clamp(32px, 5vw, 48px)`,
            wordBreak: 'break-word',
          }}>
            Book a personalised walkthrough with one of our implementation specialists. No commitment, no generic demo, just your specific workflows on our platform.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: 'var(--gap-cta-buttons)',
            width: '100%',
          }}>
            <Link
              to="/demo"
              style={{
                fontFamily: FI, 
                fontWeight: 700, 
                fontSize: 'var(--font-cta)',
                letterSpacing: '0.07em', 
                textTransform: 'uppercase',
                padding: 'clamp(14px, 2.5vw, 18px) clamp(32px, 5vw, 44px)', 
                borderRadius: '999px',
                background: 'var(--color-accent-green)', 
                color: '#ffffff',
                border: 'clamp(1.5px, 0.3vw, 2px) solid var(--color-accent-green)',
                boxShadow: 'var(--shadow-cta-rest)',
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 'var(--gap-cta-icon)',
                textDecoration: 'none', 
                transition: 'var(--transition-cta)', 
                whiteSpace: 'nowrap',
                minWidth: 'var(--width-cta-button)',
                justifyContent: 'center',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = 'transparent';
                e.currentTarget.style.color       = 'var(--color-accent-green)';
                e.currentTarget.style.borderColor = 'var(--color-accent-green)';
                e.currentTarget.style.transform   = 'translateY(-3px)';
                e.currentTarget.style.boxShadow   = 'var(--shadow-cta-hover)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = 'var(--color-accent-green)';
                e.currentTarget.style.color       = '#ffffff';
                e.currentTarget.style.borderColor = 'var(--color-accent-green)';
                e.currentTarget.style.transform   = 'translateY(0)';
                e.currentTarget.style.boxShadow   = 'var(--shadow-cta-rest)';
              }}
            >
              Request a Demo
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link
              to="/contact"
              style={{
                fontFamily: FI, 
                fontWeight: 700, 
                fontSize: 'var(--font-cta)',
                letterSpacing: '0.07em', 
                textTransform: 'uppercase',
                padding: 'clamp(14px, 2.5vw, 18px) clamp(32px, 5vw, 44px)', 
                borderRadius: '999px',
                background: 'transparent', 
                color: 'var(--color-accent-green)',
                border: 'clamp(1.5px, 0.3vw, 2px) solid var(--color-accent-green)',
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 'var(--gap-cta-icon)',
                textDecoration: 'none', 
                transition: 'var(--transition-cta)', 
                whiteSpace: 'nowrap',
                minWidth: 'var(--width-cta-button)',
                justifyContent: 'center',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = 'var(--color-accent-green)';
                e.currentTarget.style.color       = '#ffffff';
                e.currentTarget.style.transform   = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = 'transparent';
                e.currentTarget.style.color       = 'var(--color-accent-green)';
                e.currentTarget.style.transform   = 'translateY(0)';
              }}
            >
              Contact Us
            </Link>
          </div>
          <p style={{
            fontFamily: FP, 
            fontSize: 'var(--font-cta-small)', 
            fontWeight: 400,
            color: 'var(--color-accent-green)', 
            marginTop: 'clamp(16px, 3vw, 20px)', 
            letterSpacing: '0.04em',
            wordBreak: 'break-word',
          }}>
            No credit card required. Live in under 24 hours.
          </p>
        </Reveal>

      </div>
    </section>

  </Layout>
);

export default AboutPage;