/**
 * ServicesPage.jsx — RAAH Technologies
 *
 * Fully rebuilt. Consistent with HomePage and AboutPage:
 *   Inter 900 headings, Poppins body, double-dash eyebrows
 *   Dot-grid textures, ghost watermark, radial corner glows
 *   Reveal scroll animations, same card/button/hover patterns
 *   Wave dividers between sections, bespoke SVG icons
 *   No em dashes in content, no PageBanner dependency
 *
 * Sections:
 *   1. Hero              — dark green overlay on image (NO WAVE DIVIDER)
 *   2. Platform Overview — white, narrative + capability pills
 *   3. Services Grid     — white, 9 expanded service cards
 *   4. Integration Story — dark green, connected platform narrative
 *   5. Comparison Table  — white, RAAH vs legacy tools
 *   6. CTA               — matches homepage
 */

import React, { useRef, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

// ─── Shared decorations ───────────────────────────────────────────────────────
const DotGrid = ({ color = 'rgba(5,46,22,0.06)' }) => (
  <div aria-hidden="true" style={{
    position: 'absolute', inset: 0,
    backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
    backgroundSize: '32px 32px', pointerEvents: 'none',
  }} />
);

const Watermark = ({ color = 'transparent' }) => (
  <div aria-hidden="true" style={{
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: FI, fontWeight: 900,
    fontSize: 'clamp(80px, 14vw, 180px)',
    color, letterSpacing: '-0.05em',
    whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none', lineHeight: 1,
  }}>RAAH</div>
);

const RadialGlow = ({ top, right, bottom, left, size = 420, opacity = 0.07 }) => (
  <div aria-hidden="true" style={{
    position: 'absolute', top, right, bottom, left,
    width: size, height: size, borderRadius: '50%',
    background: `radial-gradient(circle, rgba(22,163,74,${opacity}) 0%, transparent 70%)`,
    pointerEvents: 'none',
  }} />
);

const Eyebrow = ({ label, light = false }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
    <div style={{ width: '32px', height: '1.5px', background: light ? '#ffffff' : '#16a34a', borderRadius: '999px' }} />
    <span style={{ fontFamily: FP, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: light ? '#ffffff' : '#16a34a' }}>
      {label}
    </span>
    <div style={{ width: '32px', height: '1.5px', background: light ? '#ffffff' : '#16a34a', borderRadius: '999px' }} />
  </div>
);

// REMOVED WaveDivider component entirely

// ─── Bespoke SVG icons ────────────────────────────────────────────────────────
// [All icon components remain unchanged - omitted for brevity]

// ─── Services data ─────────────────────────────────────────────────────────────
const SERVICES = [
  // [Services data remains unchanged - omitted for brevity]
];

// ─── Service card ─────────────────────────────────────────────────────────────
const ServiceCard = ({ service, delay }) => {
  const [hovered, setHovered] = useState(false);
  const { Icon, label, title, desc, metric, metricLabel } = service;
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered
            ? 'linear-gradient(145deg, #1db954 0%, #16a34a 60%, #0d8a3e 100%)'
            : '#ffffff',
          borderRadius: '20px', overflow: 'hidden',
          position: 'relative', height: '100%',
          boxShadow: hovered
            ? '0 24px 64px rgba(5,46,22,0.28), 0 4px 16px rgba(22,163,74,0.20), inset 0 1px 0 rgba(74,222,128,0.15)'
            : '0 4px 20px rgba(5,46,22,0.08)',
          transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          border: '1px solid',
          borderColor: hovered ? 'rgba(74,222,128,0.30)' : 'rgba(22,163,74,0.14)',
        }}
      >
        {/* Shimmer */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0,
          left: hovered ? '120%' : '-60%',
          width: '50%', height: '100%',
          background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.06) 50%, transparent 80%)',
          transform: 'skewX(-15deg)',
          transition: 'left 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          pointerEvents: 'none',
        }} />
        {/* Top accent line */}
        <div style={{
          height: '2px',
          background: hovered
            ? 'linear-gradient(to right, #4ade80, #86efac, #4ade80)'
            : 'linear-gradient(to right, #16a34a, #22c55e)',
          transition: 'background 0.4s ease',
        }} />
        <div style={{ padding: '36px 32px 32px', position: 'relative', zIndex: 1 }}>
          {/* Icon */}
          <div style={{
            width: '72px', height: '72px', borderRadius: '18px',
            background: '#ffffff',
            border: `1.5px solid ${hovered ? 'rgba(22,163,74,0.35)' : 'rgba(22,163,74,0.25)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '28px', position: 'relative', transition: 'all 0.35s ease',
          }}>
            <div aria-hidden="true" style={{
              position: 'absolute', inset: '-10px', borderRadius: '26px',
              background: hovered
                ? 'radial-gradient(circle, rgba(74,222,128,0.20) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(22,163,74,0.10) 0%, transparent 70%)',
              pointerEvents: 'none', transition: 'background 0.4s ease',
            }} />
            <Icon />
          </div>
          {/* Label */}
          <p style={{ fontFamily: FP, fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: hovered ? '#ffffff' : '#16a34a', marginBottom: '8px', transition: 'color 0.3s ease' }}>
            {label}
          </p>
          {/* Title */}
          <h3 style={{ fontFamily: FI, fontSize: '1.375rem', fontWeight: 800, letterSpacing: '-0.02em', color: hovered ? '#ffffff' : '#16a34a', marginBottom: '14px', lineHeight: 1.25, transition: 'color 0.3s ease' }}>
            {title}
          </h3>
          {/* Desc */}
          <p style={{ fontFamily: FP, fontSize: '1rem', fontWeight: 400, lineHeight: 1.80, color: hovered ? '#ffffff' : '#1a1a1a', marginBottom: '28px', transition: 'color 0.3s ease' }}>
            {desc}
          </p>
          {/* Metric */}
          <div style={{ paddingTop: '20px', borderTop: `1px solid ${hovered ? 'rgba(255,255,255,0.25)' : 'rgba(22,163,74,0.15)'}`, display: 'flex', alignItems: 'center', gap: '14px', transition: 'all 0.35s ease' }}>
            <div style={{ width: '4px', height: '36px', borderRadius: '999px', background: hovered ? 'linear-gradient(to bottom, #86efac, #4ade80)' : 'linear-gradient(to bottom, #16a34a, rgba(22,163,74,0.40))', flexShrink: 0, transition: 'background 0.35s ease' }} />
            <div>
              <p style={{ fontFamily: FI, fontSize: '1.625rem', fontWeight: 900, color: hovered ? '#ffffff' : '#0a6b30', lineHeight: 1, letterSpacing: '-0.02em', transition: 'color 0.3s ease' }}>
                {metric}
              </p>
              <p style={{ fontFamily: FP, fontSize: '0.78rem', fontWeight: 500, color: hovered ? '#ffffff' : '#16a34a', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '3px', transition: 'color 0.3s ease' }}>
                {metricLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

// ─── Comparison table ─────────────────────────────────────────────────────────
const COMPARISON = [
  // [Comparison data remains unchanged - omitted for brevity]
];

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
    <circle cx="10" cy="10" r="9" fill="#16a34a" opacity="0.12"/>
    <path d="M6 10L8.5 12.5L14 7" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CrossIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
    <circle cx="10" cy="10" r="9" fill="rgba(239,68,68,0.08)"/>
    <path d="M7 7L13 13M13 7L7 13" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const PartialIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
    <circle cx="10" cy="10" r="9" fill="rgba(234,179,8,0.10)"/>
    <path d="M6 10H14" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const ServicesPage = () => (
  <Layout>
    {/* Global responsive styles */}
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
      .hero-image-wrapper img {
        width: 100% !important;
        height: auto !important;
        min-height: 200px;
        object-fit: cover !important;
      }
      
      /* Prevent horizontal scroll */
      .services-page, .services-page * {
        max-width: 100vw;
        overflow-x: hidden;
      }
      
      /* Touch targets */
      @media (hover: none) and (pointer: coarse) {
        .services-cta, .services-nav-btn, .services-pip {
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

    {/* ══ 1. HERO — NO WAVE DIVIDER, MATCHES HOMEPAGE HERO STYLE ══ */}
    <section style={{ 
      position: 'relative', 
      minHeight: 'var(--min-height-hero)', 
      display: 'flex', 
      alignItems: 'center', 
      overflow: 'hidden',
      paddingBottom: 'clamp(40px, 8vw, 60px)' // Added bottom padding to replace wave
    }}>
      <img
        src="/assets/service or any page.jpeg" // Fixed path - forward slashes
        alt="RAAH platform services"
        className="hero-image-wrapper" // Added class for mobile fix
        style={{ 
          position: 'absolute', 
          inset: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          objectPosition: 'center 30%',
          maxWidth: '100%',
        }}
        onError={(e) => {
          // Fallback image if local asset fails
          e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=600";
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--color-overlay)' }} aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--color-overlay-gradient)' }} aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} aria-hidden="true" />

      <div className="container-custom" style={{ 
        position: 'relative', 
        zIndex: 1, 
        textAlign: 'center', 
        padding: 'var(--padding-section-hero) clamp(16px, 4vw, 24px)',
        maxWidth: '100%',
      }}>
        <Reveal delay={0}>
          <Eyebrow label="The Platform" light />
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
              Every Tool
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
              Your Agency Needs
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
              to Thrive
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
            Nine integrated modules. One login. Zero gaps between your clinical, operational, and financial workflows.
          </p>
        </Reveal>
        
        <Reveal delay={220}>
          <Link to="/demo" style={{ 
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
            width: '100%',
            maxWidth: '280px',
            margin: '0 auto'
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
            See the Platform Live
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </Reveal>
      </div>
    </section>

    {/* REMOVED WAVE DIVIDER HERE */}

    {/* ══ 2. PLATFORM OVERVIEW ══ */}
    <section style={{ background: 'var(--color-bg-section-light)', padding: 'var(--padding-section) 0', position: 'relative', overflow: 'hidden' }}>
      <DotGrid />
      <Watermark />
      <RadialGlow top="-60px" right="-60px" size={420} opacity={0.07} />
      <RadialGlow bottom="-60px" left="-60px" size={360} opacity={0.06} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <style>{`
          .platform-grid {
            display: grid;
            gap: clamp(32px, 6vw, 80px);
            align-items: stretch;
            grid-template-columns: 1fr;
          }
          @media (min-width: 768px) {
            .platform-grid { grid-template-columns: 1fr 1fr; }
          }
          
          .pills-grid {
            display: grid;
            gap: clamp(12px, 2vw, 16px);
            grid-template-columns: 1fr;
          }
          @media (min-width: 480px) {
            .pills-grid { grid-template-columns: repeat(2, 1fr); }
          }
        `}</style>
        <div className="platform-grid" style={{ display: 'grid', alignItems: 'center' }}>

          <Reveal delay={0}>
            <div>
              <Eyebrow label="Platform" />
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
                One System.{' '}
                <span style={{ color: 'var(--color-accent-green)' }}>Every Workflow.</span>
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
                Most home health agencies run on three or four disconnected platforms. Scheduling in one system, billing in another, EVV in a third, documentation somewhere else. Every handoff between systems is a gap where data gets lost, errors get introduced, and staff waste time re-entering the same information.
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
                RAAH eliminates every one of those gaps. From the moment a referral arrives to the moment a remittance posts, every workflow runs inside a single connected system. One login for every role. Real-time data across every department. No re-entry, no reconciliation, no surprises.
              </p>
              <Link to="/demo" style={{ 
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
                width: '100%',
                maxWidth: '280px'
              }}
                onMouseEnter={e => { 
                  e.currentTarget.style.background = 'transparent'; 
                  e.currentTarget.style.color = 'var(--color-accent-green)'; 
                  e.currentTarget.style.borderColor = 'var(--color-accent-green)'; 
                  e.currentTarget.style.transform = 'translateY(-2px)'; 
                  e.currentTarget.style.boxShadow = 'var(--shadow-cta-hover)'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = 'var(--color-accent-green)'; 
                  e.currentTarget.style.color = '#ffffff'; 
                  e.currentTarget.style.borderColor = 'var(--color-accent-green)'; 
                  e.currentTarget.style.transform = 'translateY(0)'; 
                  e.currentTarget.style.boxShadow = 'var(--shadow-cta-rest)'; 
                }}
              >
                Request a Demo
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </Reveal>

          {/* Capability pills */}
          <Reveal delay={150}>
            <div className="pills-grid" style={{ display: 'grid', gap: 'var(--gap-badge)' }}>
              {[
                { label: 'Referral to Intake',      sub: 'Electronic referral acceptance' },
                { label: 'Scheduling',               sub: 'Conflict detection and matching' },
                { label: 'EVV at Point of Care',     sub: 'GPS and telephony verified' },
                { label: 'Clinical Documentation',   sub: 'OASIS-E, PDGM aligned' },
                { label: 'Claims and Billing',        sub: 'Auto-scrub to submission' },
                { label: 'Remittance Posting',        sub: '835 automated' },
                { label: 'Analytics',                sub: 'Live dashboards' },
                { label: 'Compliance Updates',       sub: 'Automatic, no manual work' },
              ].map((pill, i) => (
                <Reveal key={pill.label} delay={i * 40}>
                  <div style={{ 
                    padding: 'clamp(12px, 2.5vw, 16px) clamp(16px, 3vw, 20px)', 
                    borderRadius: 'var(--radius-badge)', 
                    background: 'rgba(22,163,74,0.05)', 
                    border: 'clamp(1px, 0.2vw, 1px) solid rgba(22,163,74,0.12)', 
                    transition: 'all 0.25s ease', 
                    cursor: 'default',
                    minHeight: 'clamp(60px, 10vw, 72px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                    onMouseEnter={e => { 
                      e.currentTarget.style.background = 'rgba(22,163,74,0.10)'; 
                      e.currentTarget.style.borderColor = 'rgba(22,163,74,0.28)'; 
                      e.currentTarget.style.transform = 'translateY(-2px)'; 
                    }}
                    onMouseLeave={e => { 
                      e.currentTarget.style.background = 'rgba(22,163,74,0.05)'; 
                      e.currentTarget.style.borderColor = 'rgba(22,163,74,0.12)'; 
                      e.currentTarget.style.transform = 'translateY(0)'; 
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 1vw, 8px)', marginBottom: 'clamp(2px, 0.5vw, 4px)' }}>
                      <div style={{ width: 'clamp(4px, 1vw, 6px)', height: 'clamp(4px, 1vw, 6px)', borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
                      <p style={{ fontFamily: FI, fontWeight: 700, fontSize: 'var(--font-core-value)', color: 'var(--color-text-primary)', wordBreak: 'break-word' }}>{pill.label}</p>
                    </div>
                    <p style={{ fontFamily: FP, fontSize: 'var(--font-body-sm)', color: 'var(--color-text-muted)', paddingLeft: 'clamp(12px, 2vw, 16px)', wordBreak: 'break-word' }}>{pill.sub}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>

    {/* REMOVED WAVE DIVIDER BEFORE SERVICES GRID */}

    {/* ══ 3. SERVICES GRID ══ */}
    <section style={{ 
      background: 'var(--color-bg-section-dark)', 
      padding: 'var(--padding-section) 0', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      <DotGrid color="var(--color-dot-grid-dark)" />
      <Watermark color="var(--color-watermark-dark)" />
      <RadialGlow top="-80px" right="-80px" size={500} opacity={0.14} />
      <RadialGlow bottom="-80px" left="-80px" size={400} opacity={0.10} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 8vw, 72px)' }}>
            <Eyebrow label="All Services" light />
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
              Nine Modules.{' '}
              <span style={{ 
                color: '#ffffff', 
                textDecoration: 'underline', 
                textDecorationColor: 'rgba(255,255,255,0.40)', 
                textUnderlineOffset: 'clamp(4px, 0.8vw, 6px)' 
              }}>Zero Compromises.</span>
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
              Every module is purpose-built for home health. Every metric below is from agencies running on RAAH today.
            </p>
          </div>
        </Reveal>

        <style>{`
          .services-grid {
            display: grid;
            gap: clamp(20px, 4vw, 24px);
            align-items: stretch;
            grid-template-columns: 1fr;
          }
          @media (min-width: 640px) {
            .services-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 1024px) {
            .services-grid { grid-template-columns: repeat(3, 1fr); }
          }
        `}</style>
        <div className="services-grid" style={{ display: 'grid', gap: 'var(--gap-card)', alignItems: 'stretch' }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} delay={80 + i * 60} />
          ))}
        </div>
      </div>
    </section>

    {/* REMOVED WAVE DIVIDER AFTER SERVICES GRID */}

    {/* ══ 4. COMPARISON TABLE ══ */}
    <section style={{ 
      background: 'var(--color-bg-section-light)', 
      padding: 'var(--padding-section) 0', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      <DotGrid />
      <Watermark color="var(--color-watermark)" />
      <RadialGlow top="-60px" right="-60px" size={420} opacity={0.07} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 7vw, 64px)' }}>
            <Eyebrow label="How We Compare" />
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
              RAAH vs{' '}
              <span style={{ color: 'var(--color-accent-green)' }}>Legacy Platforms</span>
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
              Legacy platforms were built for a different era of home health. See what a purpose-built modern platform delivers.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ 
            borderRadius: 'var(--radius-card)', 
            overflow: 'hidden', 
            border: 'clamp(1px, 0.2vw, 1px) solid rgba(22,163,74,0.15)', 
            boxShadow: 'var(--shadow-card-rest)',
            width: '100%',
            maxWidth: '100%',
            overflowX: 'auto'
          }}>
            {/* Table header */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr clamp(140px, 25vw, 180px) clamp(140px, 25vw, 180px)', 
              background: '#052e16',
              minWidth: '600px'
            }}>
              <div style={{ padding: 'clamp(16px, 3vw, 20px) clamp(24px, 4vw, 28px)' }}>
                <p style={{ 
                  fontFamily: FP, 
                  fontSize: 'var(--font-eyebrow)', 
                  fontWeight: 600, 
                  letterSpacing: '0.16em', 
                  textTransform: 'uppercase', 
                  color: 'rgba(74,222,128,0.70)',
                  wordBreak: 'break-word',
                }}>Feature</p>
              </div>
              <div style={{ padding: 'clamp(16px, 3vw, 20px) 0', textAlign: 'center', borderLeft: 'clamp(1px, 0.2vw, 1px) solid rgba(74,222,128,0.10)' }}>
                <p style={{ 
                  fontFamily: FI, 
                  fontWeight: 800, 
                  fontSize: 'var(--font-badge-title)', 
                  color: '#4ade80',
                  wordBreak: 'break-word',
                }}>RAAH</p>
              </div>
              <div style={{ padding: 'clamp(16px, 3vw, 20px) 0', textAlign: 'center', borderLeft: 'clamp(1px, 0.2vw, 1px) solid rgba(74,222,128,0.10)' }}>
                <p style={{ 
                  fontFamily: FI, 
                  fontWeight: 700, 
                  fontSize: 'var(--font-badge-title)', 
                  color: 'rgba(255,255,255,0.50)',
                  wordBreak: 'break-word',
                }}>Legacy Tools</p>
              </div>
            </div>

            {/* Rows */}
            {COMPARISON.map((row, i) => (
              <Reveal key={row.feature} delay={i * 30}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr clamp(140px, 25vw, 180px) clamp(140px, 25vw, 180px)', 
                  background: i % 2 === 0 ? '#ffffff' : 'rgba(22,163,74,0.02)', 
                  borderTop: 'clamp(1px, 0.2vw, 1px) solid rgba(22,163,74,0.08)', 
                  transition: 'background 0.2s ease',
                  minWidth: '600px'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(22,163,74,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? '#ffffff' : 'rgba(22,163,74,0.02)'; }}
                >
                  <div style={{ padding: 'clamp(14px, 2.5vw, 18px) clamp(24px, 4vw, 28px)', display: 'flex', alignItems: 'center' }}>
                    <p style={{ 
                      fontFamily: FP, 
                      fontSize: 'var(--font-badge-title)', 
                      fontWeight: 500, 
                      color: 'var(--color-text-secondary)',
                      wordBreak: 'break-word',
                    }}>{row.feature}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: 'clamp(1px, 0.2vw, 1px) solid rgba(22,163,74,0.08)' }}>
                    <CheckIcon />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: 'clamp(1px, 0.2vw, 1px) solid rgba(22,163,74,0.08)' }}>
                    {row.legacy === true ? <CheckIcon /> : row.legacy === 'partial' ? <PartialIcon /> : <CrossIcon />}
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Legend */}
            <div style={{ 
              padding: 'clamp(12px, 2.5vw, 16px) clamp(24px, 4vw, 28px)', 
              background: 'rgba(22,163,74,0.03)', 
              borderTop: 'clamp(1px, 0.2vw, 1px) solid rgba(22,163,74,0.08)', 
              display: 'flex', 
              gap: 'clamp(16px, 3vw, 24px)', 
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {[
                { icon: <CheckIcon />, label: 'Fully supported' },
                { icon: <PartialIcon />, label: 'Partial or add-on cost' },
                { icon: <CrossIcon />, label: 'Not supported' },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 1vw, 8px)' }}>
                  {icon}
                  <span style={{ 
                    fontFamily: FP, 
                    fontSize: 'var(--font-body-sm)', 
                    color: 'var(--color-text-muted)',
                    wordBreak: 'break-word',
                  }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* REMOVED WAVE DIVIDER BEFORE CTA */}

    {/* ══ 5. CTA ══ */}
    <section style={{ 
      background: 'var(--color-bg-section-dark)', 
      padding: 'var(--padding-section-cta)', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      <DotGrid color="var(--color-dot-grid-dark)" />
      <Watermark color="var(--color-watermark-dark)" />
      <RadialGlow top="-100px" right="-100px" size={600} opacity={0.14} />
      <RadialGlow bottom="-100px" left="-100px" size={500} opacity={0.10} />

      <div className="container-custom" style={{ 
        position: 'relative', 
        zIndex: 1, 
        textAlign: 'center',
        padding: 'var(--padding-cta-container)',
      }}>

        <Reveal delay={0}>
          <Eyebrow label="Get Started" light />
        </Reveal>

        <Reveal delay={80}>
          <h2 style={{
            fontFamily: FI, 
            fontWeight: 900,
            fontSize: 'var(--font-h2)',
            letterSpacing: '-0.03em', 
            lineHeight: 1.08,
            color: '#ffffff', 
            maxWidth: 'clamp(280px, 90vw, 820px)',
            margin: `0 auto var(--margin-section-title)`,
            wordBreak: 'break-word',
          }}>
            See All Nine Modules{' '}
            <span style={{ 
              color: '#ffffff', 
              textDecoration: 'underline', 
              textDecorationColor: 'rgba(255,255,255,0.40)', 
              textUnderlineOffset: 'clamp(4px, 0.8vw, 6px)' 
            }}>Working Together</span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p style={{
            fontFamily: FP, 
            fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
            fontWeight: 500, 
            lineHeight: 1.75, 
            color: 'var(--color-text-white-dim)',
            maxWidth: 'var(--max-width-section-body)', 
            margin: `0 auto clamp(32px, 5vw, 48px)`,
            wordBreak: 'break-word',
          }}>
            Book a personalised walkthrough built around your specific payer mix, state EVV requirements, and agency size. No commitment required.
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
                width: '100%',
                maxWidth: '280px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = 'transparent';
                e.currentTarget.style.color       = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.70)';
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
              to="/pricing"
              style={{
                fontFamily: FI, 
                fontWeight: 700, 
                fontSize: 'var(--font-cta)',
                letterSpacing: '0.07em', 
                textTransform: 'uppercase',
                padding: 'clamp(14px, 2.5vw, 18px) clamp(32px, 5vw, 44px)', 
                borderRadius: '999px',
                background: 'transparent', 
                color: '#ffffff',
                border: 'clamp(1.5px, 0.3vw, 2px) solid rgba(255,255,255,0.55)',
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 'var(--gap-cta-icon)',
                textDecoration: 'none', 
                transition: 'var(--transition-cta)', 
                whiteSpace: 'nowrap',
                minWidth: 'var(--width-cta-button)',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '280px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.90)';
                e.currentTarget.style.transform   = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)';
                e.currentTarget.style.transform   = 'translateY(0)';
              }}
            >
              View Pricing
            </Link>
          </div>
          <p style={{
            fontFamily: FP, 
            fontSize: 'var(--font-cta-small)', 
            fontWeight: 400,
            color: 'rgba(255,255,255,0.80)', 
            marginTop: 'clamp(16px, 3vw, 24px)', 
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

export default ServicesPage;