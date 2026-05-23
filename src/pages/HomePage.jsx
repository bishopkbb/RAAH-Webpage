/**
 * HomePage.jsx — RAAH Technologies
 *
 * Section 1 — Why Choose Us:
 *   ✦ Dark green (#052e16) background — editorial, premium, brand-anchored
 *   ✦ Inter for all headings (per client direction)
 *   ✦ Poppins for all body/description text
 *   ✦ Bespoke SVG icons — geometric, brand-mark style, not Lucide defaults
 *   ✦ Cards: off-white, razor-thin green top border, layered hover state
 *   ✦ Metric stat fades up on hover — data credibility built in
 *   ✦ Intersection Observer scroll animations — stagger per card
 */

import React, { useRef, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import HeroCarousel from '../components/home/HeroCarousel';
import Navbar from '../components/layout/Navbar';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Scroll animation hook ────────────────────────────────────────────────────
const useInView = (threshold = 0.15) => {
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

// ─── Animated section wrapper ─────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ─── Global responsive CSS variables ──────────────────────────────────────────
const HomeStyles = () => (
  <style>{`
    :root {
      /* Typography */
      --font-eyebrow: clamp(0.65rem, 1.4vw, 0.75rem);
      --font-h2: clamp(1.75rem, 5vw, 3.75rem);
      --font-h3: clamp(1.125rem, 2.5vw, 1.375rem);
      --font-h4: clamp(1.1rem, 2.2vw, 1.375rem);
      --font-body-lg: clamp(1.1rem, 1.8vw, 1.3rem);
      --font-body: clamp(0.875rem, 1.7vw, 1rem);
      --font-body-sm: clamp(0.7rem, 1.4vw, 0.8rem);
      --font-metric: clamp(1.25rem, 3vw, 1.625rem);
      --font-metric-lg: clamp(1.5rem, 4vw, 2rem);
      --font-step-number: clamp(0.75rem, 1.5vw, 0.85rem);
      --font-testimonial: clamp(0.875rem, 1.8vw, 0.9875rem);
      --font-cta: clamp(0.8rem, 1.6vw, 0.9375rem);
      --font-cta-small: clamp(0.7rem, 1.4vw, 0.8rem);
      
      /* Spacing */
      --padding-section: clamp(60px, 10vw, 120px) 0 clamp(70px, 12vw, 140px);
      --padding-card: clamp(24px, 4vw, 36px) clamp(20px, 4vw, 32px) clamp(20px, 4vw, 32px);
      --padding-testimonial: clamp(32px, 5vw, 40px) clamp(28px, 4vw, 36px) clamp(24px, 4vw, 32px);
      --padding-stat: clamp(16px, 3vw, 20px) clamp(20px, 4vw, 24px);
      --padding-step: clamp(8px, 1.5vw, 10px) clamp(0px, 0vw, 0px) clamp(0px, 0vw, 36px);
      --margin-eyebrow: clamp(16px, 3vw, 20px);
      --margin-section-title: clamp(16px, 3vw, 20px);
      --margin-section-body: clamp(0px, 0vw, 0px);
      --margin-card-icon: clamp(20px, 4vw, 28px);
      --margin-card-label: clamp(6px, 1vw, 8px);
      --margin-card-title: clamp(10px, 2vw, 14px);
      --margin-card-desc: clamp(20px, 4vw, 28px);
      --margin-card-metric: clamp(16px, 3vw, 20px);
      --margin-testimonial-quote: clamp(20px, 4vw, 28px);
      --margin-testimonial-divider: clamp(16px, 3vw, 24px);
      --margin-cta: clamp(48px, 8vw, 72px);
      --margin-cta-buttons: clamp(12px, 2vw, 16px);
      --margin-cta-reassurance: clamp(20px, 4vw, 24px);
      --gap-card-icon: clamp(12px, 2.5vw, 14px);
      --gap-card-metric: clamp(12px, 2vw, 14px);
      --gap-testimonial-bottom: clamp(14px, 2.5vw, 16px);
      --gap-step: clamp(16px, 3vw, 20px);
      --gap-step-icon: clamp(8px, 1.5vw, 10px);
      --gap-cta-buttons: clamp(14px, 2.5vw, 16px);
      --gap-cta-icon: clamp(8px, 1.5vw, 10px);
      
      /* Dimensions */
      --width-container: clamp(280px, 95vw, 1200px);
      --width-card-max: clamp(280px, 90vw, 420px);
      --width-testimonial-max: clamp(280px, 95vw, 520px);
      --width-step-number: clamp(44px, 8vw, 52px);
      --width-step-icon: clamp(28px, 5vw, 32px);
      --width-icon-container: clamp(56px, 10vw, 72px);
      --width-testimonial-avatar: clamp(40px, 7vw, 48px);
      --width-stat-metric: clamp(90px, 20vw, 120px);
      --height-icon-container: clamp(56px, 10vw, 72px);
      --height-stat-bar: clamp(32px, 6vw, 36px);
      --height-stat-bar-hover: clamp(36px, 7vw, 42px);
      --radius-card: clamp(16px, 3vw, 20px);
      --radius-icon: clamp(14px, 2.5vw, 18px);
      --radius-step-number: clamp(12px, 2vw, 14px);
      --radius-testimonial: clamp(16px, 3vw, 20px);
      --radius-cta: 999px;
      --size-icon: clamp(32px, 6vw, 42px);
      --size-icon-small: clamp(16px, 3vw, 18px);
      --size-nav-btn: clamp(36px, 7vw, 44px);
      --size-pip: clamp(6px, 1vw, 8px);
      --size-pip-active: clamp(32px, 6vw, 36px);
      --size-dot: clamp(5px, 1vw, 7px);
      
      /* Borders & Shadows */
      --border-card: 1px solid;
      --border-card-hover: 1px solid rgba(74,222,128,0.30);
      --border-card-rest: 1px solid rgba(22,163,74,0.14);
      --border-icon-hover: 1.5px solid rgba(255,255,255,0.80);
      --border-icon-rest: 1.5px solid rgba(22,163,74,0.20);
      --border-step-hover: 2px solid #16a34a;
      --border-step-rest: 2px solid rgba(22,163,74,0.25);
      --border-testimonial-hover: 1px solid rgba(22,163,74,0.25);
      --border-testimonial-rest: 1px solid rgba(22,163,74,0.10);
      --border-cta: clamp(1.5px, 0.3vw, 2px) solid;
      --shadow-card-hover: 0 clamp(20px, 4vw, 24px) clamp(56px, 10vw, 64px) rgba(5,46,22,0.28), 0 clamp(4px, 0.8vw, 16px) rgba(22,163,74,0.20), inset 0 1px 0 rgba(74,222,128,0.15);
      --shadow-card-rest: 0 clamp(4px, 0.8vw, 20px) rgba(5,46,22,0.08), 0 clamp(1px, 0.2vw, 4px) rgba(5,46,22,0.04);
      --shadow-testimonial-hover: 0 clamp(16px, 3vw, 20px) clamp(48px, 9vw, 60px) rgba(5,46,22,0.12), 0 clamp(4px, 0.8vw, 16px) rgba(22,163,74,0.08);
      --shadow-testimonial-rest: 0 clamp(4px, 0.8vw, 24px) rgba(5,46,22,0.10);
      --shadow-cta: 0 clamp(6px, 1vw, 8px) clamp(28px, 5vw, 32px) rgba(22,163,74,0.40);
      --shadow-cta-lg: 0 clamp(8px, 1.5vw, 32px) rgba(22,163,74,0.40);
      
      /* Colors */
      --color-bg-section-light: #dff0df;
      --color-bg-section-dark: linear-gradient(160deg, #0d7a3e 0%, #16a34a 55%, #0d7a3e 100%);
      --color-bg-card-rest: #ffffff;
      --color-bg-card-hover: linear-gradient(145deg, #1db954 0%, #16a34a 60%, #0d8a3e 100%);
      --color-bg-icon-rest: rgba(22,163,74,0.07);
      --color-bg-icon-hover: #ffffff;
      --color-bg-step-rest: #ffffff;
      --color-bg-step-hover: linear-gradient(135deg, #0d7a3e 0%, #16a34a 100%);
      --color-bg-testimonial: #ffffff;
      --color-bg-cta-solid: #16a34a;
      --color-bg-cta-ghost: transparent;
      --color-text-primary: #0f172a;
      --color-text-secondary: #374151;
      --color-text-tertiary: #475569;
      --color-text-muted: #64748b;
      --color-text-white: #ffffff;
      --color-text-green: #16a34a;
      --color-text-green-dark: #0a6b30;
      --color-text-green-light: #4ade80;
      --color-accent-green: #16a34a;
      --color-accent-green-light: #4ade80;
      --color-accent-green-dim: rgba(22,163,74,0.10);
      --color-accent-green-dimmer: rgba(22,163,74,0.07);
      --color-overlay: rgba(5,46,22,0.38);
      --color-dot-grid: rgba(5,46,22,0.06);
      --color-dot-grid-dark: rgba(74,222,128,0.10);
      --color-watermark: transparent;
      --color-watermark-dark: rgba(255,255,255,0.055);
      --color-radial-glow: rgba(22,163,74,0.07);
      --color-radial-glow-dark: rgba(22,163,74,0.14);
      --color-shimmer: linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.06) 50%, transparent 80%);
      --color-glow-icon: radial-gradient(circle, rgba(74,222,128,0.20) 0%, transparent 70%);
      --color-glow-icon-rest: radial-gradient(circle, rgba(22,163,74,0.10) 0%, transparent 70%);
      --color-glow-step: radial-gradient(circle, rgba(22,163,74,0.14) 0%, transparent 70%);
      --color-edge-fade: linear-gradient(to right, rgba(255,255,255,0.18) 0%, transparent 30%, transparent 70%, rgba(5,46,22,0.06) 100%);
      --color-top-fade: linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 100%);
      
      /* Transitions */
      --transition-card: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
      --transition-icon: all 0.35s ease;
      --transition-text: color 0.3s ease;
      --transition-shimmer: left 0.7s cubic-bezier(0.22, 1, 0.36, 1);
      --transition-step: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      --transition-testimonial: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      --transition-cta: all 0.25s ease;
      --transition-pip: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      
      /* Grid */
      --grid-features: repeat(3, 1fr);
      --grid-caregiver: repeat(auto-fit, minmax(280px, 1fr));
      --grid-testimonials: 1fr;
    }
    
    /* Tablet - 2 column testimonials */
    @media (min-width: 768px) {
      :root {
        --grid-testimonials: repeat(2, 1fr);
      }
    }
    
    /* Mobile-specific adjustments */
    @media (max-width: 767px) {
      :root {
        --grid-features: repeat(2, 1fr);
        --font-h2: clamp(1.5rem, 6vw, 3rem);
        --font-h3: clamp(1rem, 3vw, 1.25rem);
        --padding-card: clamp(20px, 4vw, 28px) clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px);
      }
    }
    
    @media (max-width: 480px) {
      :root {
        --grid-features: 1fr;
        --font-h2: clamp(1.25rem, 7vw, 2.25rem);
        --font-h3: clamp(0.9375rem, 3.5vw, 1.125rem);
        --font-body: clamp(0.8125rem, 2vw, 0.9375rem);
        --padding-section: clamp(48px, 12vw, 96px) 0 clamp(56px, 14vw, 112px);
      }
    }
    
    /* Ensure full viewport width safety */
    .home-page, .home-page * {
      max-width: 100vw;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    
    /* Improve touch targets on mobile */
    @media (hover: none) and (pointer: coarse) {
      .home-cta, .home-nav-btn, .home-pip {
        min-height: 44px;
        min-width: 44px;
        touch-action: manipulation;
      }
    }
    
    /* Prevent text overflow */
    .home-text {
      word-break: break-word;
      hyphens: auto;
    }
    
    /* Grid utilities */
    .features-grid {
      display: grid;
      gap: clamp(20px, 4vw, 24px);
      justify-items: center;
      grid-template-columns: var(--grid-features);
    }
    
    .caregiver-grid {
      display: grid;
      gap: clamp(20px, 4vw, 24px);
      justify-items: center;
      grid-template-columns: var(--grid-caregiver);
    }
    
    .testimonials-grid {
      display: grid;
      gap: clamp(20px, 4vw, 24px);
      align-items: stretch;
      grid-template-columns: var(--grid-testimonials);
      width: 100%;
      max-width: 100%;
    }
    
    .workflow-grid {
      display: grid;
      gap: clamp(40px, 7vw, 48px);
      align-items: stretch;
      grid-template-columns: 1fr;
    }
    
    @media (min-width: 768px) {
      .workflow-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: clamp(64px, 10vw, 80px);
      }
    }
  `}</style>
);

// ─── Bespoke SVG Icons ────────────────────────────────────────────────────────
// Each is a geometric brand-mark — not stock icons.
// Designed on a 48×48 viewBox with 2px stroke, no fill unless specified.

const IconShield = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="var(--size-icon)" height="var(--size-icon)">
    {/* Outer shield */}
    <path
      d="M24 4L8 11V22C8 31.94 15.08 41.22 24 44C32.92 41.22 40 31.94 40 22V11L24 4Z"
      stroke="#16a34a" strokeWidth="2" strokeLinejoin="round"
    />
    {/* Inner shield accent */}
    <path
      d="M24 10L14 15V23C14 29.18 18.48 34.92 24 37C29.52 34.92 34 29.18 34 23V15L24 10Z"
      fill="rgba(22,163,74,0.18)" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"
    />
    {/* Checkmark */}
    <path
      d="M18 24L22 28L30 20"
      stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    />
    {/* Top dot — lock keyhole metaphor */}
    <circle cx="24" cy="14" r="2" fill="#16a34a" />
  </svg>
);

const IconEVV = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="var(--size-icon)" height="var(--size-icon)">
    {/* Map pin outer */}
    <path
      d="M24 4C17.37 4 12 9.37 12 16C12 24 24 44 24 44C24 44 36 24 36 16C36 9.37 30.63 4 24 4Z"
      stroke="#16a34a" strokeWidth="2" strokeLinejoin="round"
    />
    {/* Inner circle */}
    <circle cx="24" cy="16" r="5" fill="rgba(22,163,74,0.18)" stroke="#16a34a" strokeWidth="1.5" />
    {/* Signal rings — EVV metaphor */}
    <path d="M10 8C7 11 5 15 5 20" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M38 8C41 11 43 15 43 20" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 5C9 9 7 14 7 20" stroke="#16a34a" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
    <path d="M35 5C39 9 41 14 41 20" stroke="#16a34a" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
    {/* Centre dot */}
    <circle cx="24" cy="16" r="2" fill="#16a34a" />
  </svg>
);

const IconAnalytics = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="var(--size-icon)" height="var(--size-icon)">
    {/* Chart area background */}
    <rect x="6" y="6" width="36" height="36" rx="4" fill="rgba(22,163,74,0.10)" stroke="#16a34a" strokeWidth="1.5"/>
    {/* Bar chart bars */}
    <rect x="11" y="28" width="5" height="10" rx="1.5" fill="rgba(22,163,74,0.30)" stroke="#16a34a" strokeWidth="1"/>
    <rect x="19" y="20" width="5" height="18" rx="1.5" fill="rgba(22,163,74,0.50)" stroke="#16a34a" strokeWidth="1"/>
    <rect x="27" y="14" width="5" height="24" rx="1.5" fill="rgba(22,163,74,0.75)" stroke="#16a34a" strokeWidth="1"/>
    <rect x="35" y="10" width="5" height="28" rx="1.5" fill="#16a34a" stroke="#16a34a" strokeWidth="1"/>
    {/* Trend line */}
    <path
      d="M13.5 27L21.5 19L29.5 13L37.5 9"
      stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
    {/* Trend dot */}
    <circle cx="37.5" cy="9" r="2.5" fill="#16a34a"/>
    {/* Axis lines */}
    <line x1="6" y1="38" x2="42" y2="38" stroke="#16a34a" strokeWidth="1" opacity="0.4"/>
    <line x1="6" y1="6" x2="6" y2="38" stroke="#16a34a" strokeWidth="1" opacity="0.4"/>
  </svg>
);

const IconBilling = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="var(--size-icon)" height="var(--size-icon)">
    {/* Document */}
    <path
      d="M10 6H32L42 16V42H10V6Z"
      fill="rgba(22,163,74,0.10)" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"
    />
    {/* Folded corner */}
    <path d="M32 6V16H42" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
    {/* Dollar sign */}
    <path d="M24 16V18M24 30V32M21 19.5C21 18.12 22.34 17 24 17C25.66 17 27 18.12 27 19.5C27 20.88 25.66 22 24 22C22.34 22 21 23.12 21 24.5C21 25.88 22.34 27 24 27C25.66 27 27 25.88 27 24.5"
      stroke="#16a34a" strokeWidth="2" strokeLinecap="round"
    />
    {/* Text lines */}
    <line x1="16" y1="34" x2="32" y2="34" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <line x1="16" y1="38" x2="28" y2="38" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
    {/* Check badge */}
    <circle cx="38" cy="38" r="6" fill="#052e16" stroke="#16a34a" strokeWidth="1.5"/>
    <path d="M35 38L37 40L41 36" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSchedule = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="var(--size-icon)" height="var(--size-icon)">
    {/* Calendar */}
    <rect x="6" y="10" width="36" height="32" rx="4" fill="rgba(22,163,74,0.10)" stroke="#16a34a" strokeWidth="1.5"/>
    {/* Header bar */}
    <rect x="6" y="10" width="36" height="10" rx="4" fill="rgba(22,163,74,0.20)" stroke="#16a34a" strokeWidth="1.5"/>
    {/* Calendar pins */}
    <line x1="16" y1="6" x2="16" y2="14" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="32" y1="6" x2="32" y2="14" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Grid dots */}
    {[
      [14,26],[20,26],[26,26],[32,26],[38,26],
      [14,32],[20,32],[26,32],[32,32],
      [14,38],[20,38],
    ].map(([cx,cy]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" fill="#16a34a" opacity="0.5"/>
    ))}
    {/* Highlighted day */}
    <circle cx="26" cy="32" r="5" fill="#16a34a"/>
    <circle cx="26" cy="32" r="3" fill="#16a34a"/>
    {/* Drag arrow — scheduling metaphor */}
    <path d="M34 34L38 36L34 38" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
  </svg>
);

const IconCompliance = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="var(--size-icon)" height="var(--size-icon)">
    {/* Outer hexagon — CMS/regulatory badge metaphor */}
    <path
      d="M24 4L40 13V31L24 40L8 31V13L24 4Z"
      fill="rgba(22,163,74,0.12)" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"
    />
    {/* Inner hexagon */}
    <path
      d="M24 11L35 17.5V28.5L24 35L13 28.5V17.5L24 11Z"
      fill="rgba(22,163,74,0.18)" stroke="#16a34a" strokeWidth="1" strokeLinejoin="round"
    />
    {/* Star/seal centre */}
    <path
      d="M24 17L25.8 21.4L30.5 21.4L26.9 24L28.1 28.5L24 26L19.9 28.5L21.1 24L17.5 21.4L22.2 21.4Z"
      fill="#16a34a" stroke="#16a34a" strokeWidth="0.5"
    />
    {/* CMS text lines */}
    <line x1="10" y1="42" x2="20" y2="42" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <line x1="22" y1="42" x2="38" y2="42" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
  </svg>
);

// ─── Feature cards data ───────────────────────────────────────────────────────
const FEATURES = [
  {
    Icon: IconShield,
    label: 'Security & Privacy',
    title: 'HIPAA-Grade Protection',
    desc: 'End-to-end encryption, role-based access control, and automatic audit trails keep every patient record airtight and every regulator satisfied.',
    metric: '100%',
    metricLabel: 'Audit Pass Rate',
    accent: '#4ade80',
  },
  {
    Icon: IconEVV,
    label: 'Visit Verification',
    title: 'Real-Time EVV',
    desc: 'GPS-verified clock-in syncs directly with your state aggregator in under 3 seconds, eliminating manual entry and claim rejections at the source.',
    metric: '< 3s',
    metricLabel: 'EVV Sync Time',
    accent: '#4ade80',
  },
  {
    Icon: IconAnalytics,
    label: 'Business Intelligence',
    title: 'Clinical Insights',
    desc: 'Live dashboards surface care-gap alerts, caregiver performance, and payer mix analysis so you lead with data, not guesswork.',
    metric: '+45%',
    metricLabel: 'Operational Efficiency',
    accent: '#4ade80',
  },
  {
    Icon: IconBilling,
    label: 'Revenue Cycle',
    title: 'Automated Billing',
    desc: 'Claim scrubbing, secondary crossover billing, and 835 remittance posting, fully automated from visit completion to cash in the bank.',
    metric: '99.2%',
    metricLabel: 'Billing Accuracy',
    accent: '#4ade80',
  },
  {
    Icon: IconSchedule,
    label: 'Operations',
    title: 'Smart Scheduling',
    desc: 'Drag-and-drop visit builder with conflict detection, skill-matching, and drive-time optimisation, built for the pace of a growing agency.',
    metric: '60%',
    metricLabel: 'Scheduling Time Saved',
    accent: '#4ade80',
  },
  {
    Icon: IconCompliance,
    label: 'Regulatory',
    title: 'CMS Ready',
    desc: 'Stay ahead of CoPs, PDGM shifts, and state-specific EVV mandates. Our compliance engine updates automatically so you can focus on patients.',
    metric: 'Zero',
    metricLabel: 'Compliance Penalties',
    accent: '#4ade80',
  },
];

// ─── Feature Card ─────────────────────────────────────────────────────────────
// Rest: white card, green label, RAAH green heading, black body text.
// Hover: flips to full green gradient — all animations preserved exactly.
const FeatureCard = ({ feature, delay }) => {
  const [hovered, setHovered] = useState(false);
  const { Icon, label, title, desc, metric, metricLabel } = feature;

  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered
            ? 'var(--color-bg-card-hover)'
            : 'var(--color-bg-card-rest)',
          borderRadius: 'var(--radius-card)',
          padding: '0',
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          boxShadow: hovered
            ? 'var(--shadow-card-hover)'
            : 'var(--shadow-card-rest)',
          transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
          transition: 'var(--transition-card)',
          cursor: 'default',
          border: 'var(--border-card)',
          borderColor: hovered ? 'var(--border-card-hover)' : 'var(--border-card-rest)',
          width: '100%',
          maxWidth: 'var(--width-card-max)',
          margin: '0 auto',
        }}
      >
        {/* Shimmer sweep on hover */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: hovered ? '120%' : '-60%',
            width: '50%',
            height: '100%',
            background: 'var(--color-shimmer)',
            transform: 'skewX(-15deg)',
            transition: 'var(--transition-shimmer)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        {/* Top accent line — green on rest, mint on hover */}
        <div
          style={{
            height: 'clamp(2px, 0.4vw, 3px)',
            background: hovered
              ? 'linear-gradient(to right, #4ade80, #86efac, #4ade80)'
              : 'linear-gradient(to right, #16a34a, #22c55e)',
            transition: 'background 0.4s ease',
          }}
        />

        <div style={{ padding: 'var(--padding-card)', position: 'relative', zIndex: 1 }}>

          {/* Icon container */}
          <div
            style={{
              width: 'var(--width-icon-container)',
              height: 'var(--height-icon-container)',
              borderRadius: 'var(--radius-icon)',
              background: hovered ? 'var(--color-bg-icon-hover)' : 'var(--color-bg-icon-rest)',
              border: hovered ? 'var(--border-icon-hover)' : 'var(--border-icon-rest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--margin-card-icon)',
              transition: 'var(--transition-icon)',
              position: 'relative',
              margin: '0 auto var(--margin-card-icon)',
            }}
          >
            {/* Radial glow behind icon */}
            <div style={{
              position: 'absolute',
              inset: 'clamp(-8px, -1.5vw, -10px)',
              borderRadius: 'clamp(20px, 4vw, 26px)',
              background: hovered
                ? 'var(--color-glow-icon)'
                : 'var(--color-glow-icon-rest)',
              pointerEvents: 'none',
              transition: 'background 0.4s ease',
            }} />
            <div style={{ filter: 'none' }}>
              <Icon />
            </div>
          </div>

          {/* Label */}
          <p
            className="home-text"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'var(--font-eyebrow)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: hovered ? 'var(--color-text-white)' : 'var(--color-text-green)',
              marginBottom: 'var(--margin-card-label)',
              transition: 'var(--transition-text)',
              textAlign: 'center',
            }}
          >
            {label}
          </p>

          {/* Title — RAAH brand green at rest, white on hover */}
          <h3
            className="home-text"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'var(--font-h3)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: hovered ? 'var(--color-text-white)' : 'var(--color-text-green)',
              marginBottom: 'var(--margin-card-title)',
              lineHeight: 1.25,
              transition: 'var(--transition-text)',
              textAlign: 'center',
            }}
          >
            {title}
          </h3>

          {/* Description — near-black at rest, white on hover */}
          <p
            className="home-text"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'var(--font-body)',
              fontWeight: 400,
              lineHeight: 1.80,
              color: hovered ? 'var(--color-text-white)' : '#1a1a1a',
              marginBottom: 'var(--margin-card-desc)',
              transition: 'var(--transition-text)',
              textAlign: 'center',
            }}
          >
            {desc}
          </p>

          {/* Metric */}
          <div
            style={{
              paddingTop: 'var(--margin-card-metric)',
              borderTop: `1px solid ${hovered ? 'rgba(255,255,255,0.25)' : 'rgba(22,163,74,0.15)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--gap-card-metric)',
              transition: 'var(--transition-card)',
            }}
          >
            {/* Accent bar */}
            <div
              style={{
                width: 'clamp(3px, 0.6vw, 4px)',
                height: hovered ? 'var(--height-stat-bar-hover)' : 'var(--height-stat-bar)',
                borderRadius: '999px',
                background: hovered
                  ? 'linear-gradient(to bottom, #86efac, #4ade80)'
                  : 'linear-gradient(to bottom, #16a34a, rgba(22,163,74,0.40))',
                flexShrink: 0,
                transition: 'background 0.35s ease, height 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
            <div>
              <p
                className="home-text"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'var(--font-metric)',
                  fontWeight: 900,
                  color: hovered ? 'var(--color-text-white)' : 'var(--color-text-green-dark)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  transition: 'var(--transition-text)',
                }}
              >
                {metric}
              </p>
              <p
                className="home-text"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'var(--font-body-sm)',
                  fontWeight: 500,
                  color: hovered ? 'var(--color-text-white)' : 'var(--color-text-green)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginTop: 'clamp(2px, 0.5vw, 3px)',
                  transition: 'var(--transition-text)',
                }}
              >
                {metricLabel}
              </p>
            </div>
          </div>

        </div>
      </div>
    </Reveal>
  );
};

// ─── AnimatedSection (legacy — kept for other sections) ───────────────────────
const AnimatedSection = ({ children, className = '', animation = 'fade-in-up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => setIsVisible(e.isIntersecting)),
      { threshold: 0.1 }
    );
    const el = domRef.current;
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, []);
  return (
    <div
      ref={domRef}
      className={`${className} ${isVisible ? `animate-${animation}` : 'opacity-0'}`}
    >
      {children}
    </div>
  );
};

// ─── CaregiverCard ────────────────────────────────────────────────────────────
// White card on green section — mirrors FeatureCard rest state.
// Hover: no green flip. Instead: lifts, top accent bar sweeps in via scaleX,
// icon bounces, border greens, shadow deepens, text stays readable.
const CaregiverCard = ({ item, delay }) => {
  const [hovered, setHovered] = useState(false);
  const { label, title, desc, metric, metricLabel, icon } = item;

  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--color-bg-card-rest)',
          borderRadius: 'var(--radius-card)',
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          boxShadow: hovered
            ? '0 clamp(16px, 3vw, 20px) clamp(48px, 9vw, 56px) rgba(5,46,22,0.22), 0 clamp(4px, 0.8vw, 16px) rgba(22,163,74,0.16)'
            : 'var(--shadow-card-rest)',
          transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
          transition: 'var(--transition-card)',
          cursor: 'default',
          border: 'var(--border-card)',
          borderColor: hovered ? 'rgba(22,163,74,0.35)' : 'var(--border-card-rest)',
          width: '100%',
          maxWidth: 'var(--width-card-max)',
          margin: '0 auto',
        }}
      >
        {/* Top accent bar — hairline at rest, full sweep on hover */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: 'clamp(2px, 0.4vw, 3px)',
            background: 'linear-gradient(to right, #16a34a, #22c55e)',
            transform: hovered ? 'scaleX(1)' : 'scaleX(0.12)',
            transformOrigin: 'left',
            opacity: hovered ? 1 : 0.45,
            transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease',
            zIndex: 2,
          }}
        />

        {/* Subtle shimmer on hover — softer than FeatureCard */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: hovered ? '110%' : '-50%',
            width: '40%',
            height: '100%',
            background: 'linear-gradient(105deg, transparent 20%, rgba(22,163,74,0.04) 50%, transparent 80%)',
            transform: 'skewX(-15deg)',
            transition: 'left 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ padding: 'var(--padding-card)', position: 'relative', zIndex: 1 }}>

          {/* Icon container — bounces on hover */}
          <div
            style={{
              width: 'var(--width-icon-container)',
              height: 'var(--height-icon-container)',
              borderRadius: 'var(--radius-icon)',
              background: hovered ? 'rgba(22,163,74,0.08)' : 'var(--color-bg-icon-rest)',
              border: `1.5px solid ${hovered ? 'rgba(22,163,74,0.30)' : 'rgba(22,163,74,0.18)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--margin-card-icon)',
              transition: 'var(--transition-card)',
              transform: hovered ? 'translateY(-4px) scale(1.06)' : 'translateY(0) scale(1)',
              position: 'relative',
              flexShrink: 0,
              margin: '0 auto var(--margin-card-icon)',
            }}
          >
            {/* Glow behind icon on hover */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 'clamp(-6px, -1vw, -8px)',
                borderRadius: 'clamp(18px, 3.5vw, 24px)',
                background: hovered
                  ? 'var(--color-glow-step)'
                  : 'radial-gradient(circle, rgba(22,163,74,0.04) 0%, transparent 70%)',
                pointerEvents: 'none',
                transition: 'background 0.4s ease',
              }}
            />
            {icon}
          </div>

          {/* Label */}
          <p
            className="home-text"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'var(--font-eyebrow)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-text-green)',
              marginBottom: 'var(--margin-card-label)',
              textAlign: 'center',
            }}
          >
            {label}
          </p>

          {/* Title — RAAH green, darkens slightly on hover */}
          <h3
            className="home-text"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'var(--font-h3)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: hovered ? 'var(--color-text-green-dark)' : 'var(--color-text-green)',
              marginBottom: 'var(--margin-card-title)',
              lineHeight: 1.25,
              transition: 'var(--transition-text)',
              textAlign: 'center',
            }}
          >
            {title}
          </h3>

          {/* Description — near-black, deepens on hover */}
          <p
            className="home-text"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'var(--font-body)',
              fontWeight: 400,
              lineHeight: 1.80,
              color: hovered ? '#111111' : '#1a1a1a',
              marginBottom: 'var(--margin-card-desc)',
              transition: 'var(--transition-text)',
              textAlign: 'center',
            }}
          >
            {desc}
          </p>

          {/* Metric */}
          <div
            style={{
              paddingTop: 'var(--margin-card-metric)',
              borderTop: `1px solid ${hovered ? 'rgba(22,163,74,0.22)' : 'rgba(22,163,74,0.12)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--gap-card-metric)',
              transition: 'var(--transition-card)',
            }}
          >
            {/* Accent bar — grows on hover */}
            <div
              style={{
                width: 'clamp(3px, 0.6vw, 4px)',
                height: hovered ? 'var(--height-stat-bar-hover)' : 'var(--height-stat-bar)',
                borderRadius: '999px',
                background: 'linear-gradient(to bottom, #16a34a, rgba(22,163,74,0.40))',
                flexShrink: 0,
                transition: 'height 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
            <div>
              <p
                className="home-text"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'var(--font-metric)',
                  fontWeight: 900,
                  color: hovered ? 'var(--color-text-primary)' : 'var(--color-text-green-dark)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  transition: 'var(--transition-text)',
                }}
              >
                {metric}
              </p>
              <p
                className="home-text"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'var(--font-body-sm)',
                  fontWeight: 500,
                  color: 'var(--color-text-green)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginTop: 'clamp(2px, 0.5vw, 3px)',
                }}
              >
                {metricLabel}
              </p>
            </div>
          </div>

        </div>
      </div>
    </Reveal>
  );
};

// ─── WorkflowStep ─────────────────────────────────────────────────────────────
// Numbered step row with icon, connecting line, Inter/Poppins typography,
// and a smooth hover state that brightens the number badge.
const WorkflowStep = ({ step, isLast }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ 
        display: 'flex', 
        gap: 'var(--gap-step)', 
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
      className="sm:flex-row sm:text-left sm:items-start"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left: number + vertical connector line */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        {/* Number badge */}
        <div
          style={{
            width: 'var(--width-step-number)',
            height: 'var(--width-step-number)',
            borderRadius: 'var(--radius-step-number)',
            background: hovered
              ? 'var(--color-bg-step-hover)'
              : 'var(--color-bg-step-rest)',
            border: `2px solid ${hovered ? 'var(--color-text-green)' : 'rgba(22,163,74,0.25)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: hovered
              ? '0 clamp(6px, 1vw, 8px) clamp(20px, 4vw, 24px) rgba(5,46,22,0.20)'
              : '0 clamp(2px, 0.4vw, 8px) rgba(5,46,22,0.06)',
            transition: 'var(--transition-step)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            className="home-text"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'var(--font-step-number)',
              fontWeight: 900,
              letterSpacing: '0.06em',
              color: hovered ? 'var(--color-text-white)' : 'var(--color-text-green)',
              transition: 'var(--transition-text)',
            }}
          >
            {step.number}
          </span>
        </div>

        {/* Connector line — hidden on last step */}
        {!isLast && (
          <div
            style={{
              width: 'clamp(1.5px, 0.3vw, 2px)',
              flexGrow: 1,
              minHeight: 'clamp(32px, 6vw, 40px)',
              background: 'linear-gradient(to bottom, rgba(22,163,74,0.40), rgba(22,163,74,0.08))',
              borderRadius: '999px',
              margin: 'clamp(4px, 0.8vw, 6px) 0',
            }}
          />
        )}
      </div>

      {/* Right: text content */}
      <div style={{ paddingTop: 'clamp(8px, 1.5vw, 10px)', paddingBottom: isLast ? '0' : 'var(--padding-step)' }}>

        {/* Icon + title row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--gap-step-icon)',
            marginBottom: 'clamp(6px, 1vw, 8px)',
          }}
          className="sm:justify-start"
        >
          {/* Small inline icon */}
          <div
            style={{
              width: 'var(--width-step-icon)',
              height: 'var(--width-step-icon)',
              borderRadius: 'clamp(6px, 1vw, 8px)',
              background: hovered ? 'rgba(22,163,74,0.10)' : 'rgba(22,163,74,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.3s ease',
            }}
          >
            {step.icon}
          </div>

          <h4
            className="home-text"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 'var(--font-h4)',
              letterSpacing: '-0.02em',
              color: hovered ? 'var(--color-text-green-dark)' : 'var(--color-text-primary)',
              lineHeight: 1.2,
              transition: 'var(--transition-text)',
            }}
          >
            {step.title}
          </h4>
        </div>

        <p
          className="home-text"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'var(--font-body)',
            fontWeight: 400,
            lineHeight: 1.75,
            color: 'var(--color-text-tertiary)',
          }}
        >
          {step.text}
        </p>
      </div>
    </div>
  );
};

// ─── Testimonials data ────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: 'RAAH transformed our billing process completely. We reduced claim rejections by 90% in the first month and our cash flow has never been stronger. The onboarding team held our hand the whole way.',
    name: 'Sarah Johnson',
    role: 'Director of Operations',
    company: 'Caring Hands Home Health',
    initials: 'SJ',
    metric: '90%',
    metricLabel: 'Fewer Claim Rejections',
    color: '#16a34a',
  },
  {
    quote: 'The mobile app is exactly what our caregivers needed. Training took under an hour, compliance issues disappeared, and our visit documentation is now airtight. I recommend RAAH to every agency owner I know.',
    name: 'Michael Chen',
    role: 'Owner',
    company: 'BrightPath Home Services',
    initials: 'MC',
    metric: '< 1hr',
    metricLabel: 'Staff Training Time',
    color: '#0d8a3e',
  },
  {
    quote: 'Before RAAH, our schedulers were spending six hours a day on conflict resolution. Now it takes forty minutes. The drag-and-drop builder with skill-matching is genuinely a game changer for a team our size.',
    name: 'Amara Osei',
    role: 'Agency Administrator',
    company: 'Golden Care Network',
    initials: 'AO',
    metric: '85%',
    metricLabel: 'Scheduling Time Saved',
    color: '#0d7a3e',
  },
  {
    quote: 'EVV compliance was keeping me up at night before we switched. RAAH syncs with our state aggregator in real time and I have not had a single EVV-related claim issue in eight months. That peace of mind is priceless.',
    name: 'Denise Ramirez',
    role: 'Billing Coordinator',
    company: 'Sunrise Home Health',
    initials: 'DR',
    metric: '8 mo',
    metricLabel: 'Zero EVV Claim Issues',
    color: '#16a34a',
  },
  {
    quote: 'We scaled from 40 to 120 caregivers in under a year and RAAH scaled right with us. No performance issues, no re-training, no gaps. It is genuinely built for growth and I cannot imagine running our agency without it.',
    name: 'James Okafor',
    role: 'CEO',
    company: 'LifeFirst Health Agency',
    initials: 'JO',
    metric: '3x',
    metricLabel: 'Team Growth, Zero Friction',
    color: '#0d8a3e',
  },
  {
    quote: 'The reporting dashboards alone justified the switch. I can see payer mix, caregiver performance, and care gaps on one screen before my first cup of coffee. My clinical team now makes decisions in hours, not weeks.',
    name: 'Patricia Nguyen',
    role: 'Clinical Director',
    company: 'Harmony Home Health',
    initials: 'PN',
    metric: '+52%',
    metricLabel: 'Faster Clinical Decisions',
    color: '#0d7a3e',
  },
  {
    quote: 'RAAH is the first platform that actually understands home health billing. Secondary crossover claims, PDGM compliance, 835 remittance, all handled automatically. Our revenue cycle team has gone from reactive to completely proactive.',
    name: 'Kevin Adeyemi',
    role: 'Revenue Cycle Manager',
    company: 'PrimeCare Solutions',
    initials: 'KA',
    metric: '99.2%',
    metricLabel: 'Billing Accuracy Rate',
    color: '#16a34a',
  },
];

// ─── Single testimonial card ──────────────────────────────────────────────────
const TestimonialCard = ({ t, visible }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--color-bg-testimonial)',
        borderRadius: 'var(--radius-testimonial)',
        padding: 'var(--padding-testimonial)',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: 'var(--border-card)',
        borderColor: hovered ? 'var(--border-testimonial-hover)' : 'var(--border-testimonial-rest)',
        boxShadow: hovered
          ? 'var(--shadow-testimonial-hover)'
          : 'var(--shadow-testimonial-rest)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'var(--transition-testimonial)',
        opacity: visible ? 1 : 0,
        cursor: 'default',
        width: '100%',
        maxWidth: 'var(--width-testimonial-max)',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      {/* Top green accent bar — slides in on hover */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 'clamp(2px, 0.4vw, 3px)',
          background: 'linear-gradient(to right, #16a34a, #4ade80)',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          borderRadius: 'var(--radius-testimonial) var(--radius-testimonial) 0 0',
        }}
      />

      {/* Decorative quote mark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 'clamp(20px, 4vw, 24px)',
          right: 'clamp(24px, 4vw, 28px)',
          opacity: hovered ? 0.18 : 0.08,
          transition: 'opacity 0.35s ease',
        }}
      >
        <svg width="56" height="44" viewBox="0 0 56 44" fill="none">
          <path d="M0 44V28C0 12.536 11.193 2.358 33.58 0L36 5.09C24.387 7.208 18.58 12.762 18.58 21.752H28V44H0ZM28 44V28C28 12.536 39.193 2.358 61.58 0L64 5.09C52.387 7.208 46.58 12.762 46.58 21.752H56V44H28Z"
            fill="#16a34a"
          />
        </svg>
      </div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: 'clamp(2px, 0.5vw, 3px)', marginBottom: 'clamp(16px, 3vw, 20px)', justifyContent: 'center' }}>
        {[1,2,3,4,5].map(s => (
          <svg key={s} width="16" height="16" viewBox="0 0 16 16" fill="#f59e0b">
            <path d="M8 1l1.854 3.756L14 5.528l-3 2.923.708 4.129L8 10.5l-3.708 2.08L5 8.451 2 5.528l4.146-.772z"/>
          </svg>
        ))}
      </div>

      {/* Quote text */}
      <p
        className="home-text"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 'var(--font-testimonial)',
          fontWeight: 400,
          lineHeight: 1.80,
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--margin-testimonial-quote)',
          flexGrow: 1,
          fontStyle: 'italic',
          textAlign: 'center',
        }}
      >
        "{t.quote}"
      </p>

      {/* Divider */}
      <div
        style={{
          height: 'clamp(1px, 0.2vw, 1px)',
          background: hovered ? 'rgba(22,163,74,0.18)' : 'rgba(0,0,0,0.06)',
          marginBottom: 'var(--margin-testimonial-divider)',
          transition: 'background 0.35s ease',
        }}
      />

      {/* Bottom row — avatar + name/role + metric */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--gap-testimonial-bottom)', flexWrap: 'wrap' }}>

        {/* Avatar + identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2vw, 14px)' }}>
          <div
            style={{
              width: 'var(--width-testimonial-avatar)',
              height: 'var(--width-testimonial-avatar)',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${t.color} 0%, #16a34a 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 clamp(4px, 0.8vw, 12px) rgba(5,46,22,0.20)',
            }}
          >
            <span
              className="home-text"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                color: 'var(--color-text-white)',
                letterSpacing: '0.02em',
              }}
            >
              {t.initials}
            </span>
          </div>
          <div>
            <p
              className="home-text"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(0.875rem, 1.6vw, 1rem)',
                color: 'var(--color-text-primary)',
                lineHeight: 1.2,
                marginBottom: 'clamp(1px, 0.3vw, 2px)',
                textAlign: 'center',
              }}
            >
              {t.name}
            </p>
            <p
              className="home-text"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'var(--font-body-sm)',
                fontWeight: 400,
                color: 'var(--color-text-green)',
                lineHeight: 1.3,
                textAlign: 'center',
              }}
            >
              {t.role}, {t.company}
            </p>
          </div>
        </div>

        {/* Metric callout */}
        <div
          style={{
            textAlign: 'center',
            flexShrink: 0,
            opacity: hovered ? 1 : 0.70,
            transition: 'opacity 0.35s ease',
          }}
        >
          <p
            className="home-text"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'var(--font-metric)',
              fontWeight: 900,
              color: 'var(--color-text-green-dark)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            {t.metric}
          </p>
          <p
            className="home-text"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(0.55rem, 1.2vw, 0.65rem)',
              fontWeight: 500,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginTop: 'clamp(1px, 0.3vw, 2px)',
              maxWidth: 'var(--width-stat-metric)',
            }}
          >
            {t.metricLabel}
          </p>
        </div>

      </div>
    </div>
  );
};

// ─── Testimonials Section ─────────────────────────────────────────────────────
const TestimonialsSection = () => {
  const [current, setCurrent]   = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1); // 1=forward, -1=back
  const timerRef = useRef(null);

  // Number of cards visible: 2 desktop, 1 mobile — handled via CSS
  // Logical "pages": we advance by 1 testimonial at a time
  const total = TESTIMONIALS.length;

  const goTo = (index, dir = 1) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setCurrent((index + total) % total);
    setTimeout(() => setIsAnimating(false), 550);
  };

  const prev = () => goTo(current - 1, -1);
  const next = () => goTo(current + 1,  1);

  // Auto-slides continuously — no pause on hover
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIsAnimating(true);
      setCurrent(p => (p + 1) % total);
      setTimeout(() => setIsAnimating(false), 550);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [total]);

  // Which two testimonials are visible (desktop shows current + next)
  const visibleA = current;
  const visibleB = (current + 1) % total;

  return (
    <section
      style={{
        background: 'var(--color-bg-section-light)',
        padding: 'var(--padding-section)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Keyframe for progress pip fill sweep */}
      <style>{`
        @keyframes testimonialprogress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
      {/* Dot grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, var(--color-dot-grid) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />

      {/* Ghost watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(60px, 12vw, 180px)',
          color: 'var(--color-watermark)',
          letterSpacing: '-0.05em',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >
        RAAH
      </div>

      {/* Corner glows */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 'clamp(-48px, -8vw, -60px)', right: 'clamp(-48px, -8vw, -60px)', width: 'clamp(320px, 60vw, 420px)', height: 'clamp(320px, 60vw, 420px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 'clamp(-48px, -8vw, -60px)', left: 'clamp(-48px, -8vw, -60px)', width: 'clamp(280px, 50vw, 360px)', height: 'clamp(280px, 50vw, 360px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <Reveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(56px, 10vw, 72px)' }}>

            {/* Eyebrow */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(8px, 1.5vw, 10px)', marginBottom: 'var(--margin-eyebrow)' }}>
              <div style={{ width: 'clamp(24px, 4vw, 32px)', height: 'clamp(1px, 0.2vw, 1.5px)', background: 'var(--color-text-green)', borderRadius: '999px' }} />
              <span
                className="home-text"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'var(--font-eyebrow)',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-green)',
                }}
              >
                Client Stories
              </span>
              <div style={{ width: 'clamp(24px, 4vw, 32px)', height: 'clamp(1px, 0.2vw, 1.5px)', background: 'var(--color-text-green)', borderRadius: '999px' }} />
            </div>

            {/* Heading */}
            <h2
              className="home-text"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: 'var(--font-h2)',
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--margin-section-title)',
                maxWidth: 'clamp(280px, 90vw, 780px)',
                margin: '0 auto var(--margin-section-title)',
              }}
            >
              Trusted by{' '}
              <span style={{ color: 'var(--color-text-green)' }}>Leading Agencies</span>
            </h2>

            {/* Sub */}
            <p
              className="home-text"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'var(--font-body-lg)',
                fontWeight: 500,
                lineHeight: 1.75,
                color: 'var(--color-text-secondary)',
                maxWidth: 'clamp(280px, 90vw, 560px)',
                margin: '0 auto',
              }}
            >
              Real results from real agencies. No case studies, no composites. Just the words of operators who switched to RAAH.
            </p>

          </div>
        </Reveal>

        {/* Carousel */}
        <Reveal delay={150}>
          <div style={{ position: 'relative' }}>

            {/* Cards viewport */}
            <div className="testimonials-grid">
              {/* Card A */}
              <div
                style={{
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating
                    ? `translateX(${direction > 0 ? '-40px' : '40px'})`
                    : 'translateX(0)',
                  transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)',
                  width: '100%',
                }}
              >
                <TestimonialCard t={TESTIMONIALS[visibleA]} visible={true} />
              </div>

              {/* Card B — hidden on mobile */}
              <div
                className="hidden md:block"
                style={{
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating
                    ? `translateX(${direction > 0 ? '40px' : '-40px'})`
                    : 'translateX(0)',
                  transition: 'opacity 0.45s ease 0.06s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.06s',
                  width: '100%',
                }}
              >
                <TestimonialCard t={TESTIMONIALS[visibleB]} visible={true} />
              </div>
            </div>

            {/* Controls row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(12px, 2vw, 16px)',
                marginTop: 'clamp(40px, 7vw, 48px)',
                flexWrap: 'wrap',
              }}
            >
              {/* Prev */}
              <button
                onClick={prev}
                aria-label="Previous testimonials"
                className="home-nav-btn"
                style={{
                  width: 'var(--size-nav-btn)',
                  height: 'var(--size-nav-btn)',
                  borderRadius: '50%',
                  border: 'clamp(1px, 0.2vw, 1.5px) solid rgba(22,163,74,0.30)',
                  background: 'transparent',
                  color: 'var(--color-text-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'var(--transition-step)',
                  flexShrink: 0,
                  touchAction: 'manipulation',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background   = '#052e16';
                  e.currentTarget.style.borderColor  = '#052e16';
                  e.currentTarget.style.color        = 'var(--color-text-white)';
                  e.currentTarget.style.transform    = 'scale(1.1)';
                  e.currentTarget.style.boxShadow    = '0 clamp(4px, 0.8vw, 16px) rgba(5,46,22,0.20)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background   = 'transparent';
                  e.currentTarget.style.borderColor  = 'rgba(22,163,74,0.30)';
                  e.currentTarget.style.color        = 'var(--color-text-green)';
                  e.currentTarget.style.transform    = 'scale(1)';
                  e.currentTarget.style.boxShadow    = 'none';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Progress dots — active pip has a fill sweep animation */}
              <div style={{ display: 'flex', gap: 'clamp(6px, 1vw, 8px)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > current ? 1 : -1)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className="home-pip"
                    style={{
                      width: i === current ? 'var(--size-pip-active)' : 'var(--size-pip)',
                      height: 'var(--size-pip)',
                      borderRadius: '999px',
                      background: i === current
                        ? 'rgba(22,163,74,0.20)'
                        : i === visibleB
                          ? 'rgba(22,163,74,0.30)'
                          : 'rgba(22,163,74,0.12)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'var(--transition-pip)',
                      touchAction: 'manipulation',
                    }}
                  >
                    {i === current && (
                      <span
                        key={current}
                        style={{
                          position: 'absolute',
                          top: 0, left: 0, bottom: 0,
                          borderRadius: '999px',
                          background: 'var(--color-text-green)',
                          animation: 'testimonialprogress 5s linear forwards',
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                onClick={next}
                aria-label="Next testimonials"
                className="home-nav-btn"
                style={{
                  width: 'var(--size-nav-btn)',
                  height: 'var(--size-nav-btn)',
                  borderRadius: '50%',
                  border: 'clamp(1px, 0.2vw, 1.5px) solid rgba(22,163,74,0.30)',
                  background: 'transparent',
                  color: 'var(--color-text-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'var(--transition-step)',
                  flexShrink: 0,
                  touchAction: 'manipulation',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background   = 'var(--color-text-green)';
                  e.currentTarget.style.borderColor  = 'var(--color-text-green)';
                  e.currentTarget.style.color        = 'var(--color-text-white)';
                  e.currentTarget.style.transform    = 'scale(1.1)';
                  e.currentTarget.style.boxShadow    = '0 clamp(4px, 0.8vw, 16px) rgba(22,163,74,0.28)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background   = 'transparent';
                  e.currentTarget.style.borderColor  = 'rgba(22,163,74,0.30)';
                  e.currentTarget.style.color        = 'var(--color-text-green)';
                  e.currentTarget.style.transform    = 'scale(1)';
                  e.currentTarget.style.boxShadow    = 'none';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

            </div>

            {/* Testimonial counter */}
            <p
              className="home-text"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'var(--font-body-sm)',
                fontWeight: 500,
                color: 'var(--color-text-muted)',
                textAlign: 'center',
                marginTop: 'clamp(12px, 2vw, 16px)',
                letterSpacing: '0.06em',
              }}
            >
              {current + 1} / {total}
            </p>

          </div>
        </Reveal>

      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const HomePage = () => {
  const [sectionRef] = useInView(0.1);

  return (
    <Layout hideNav>
      <HomeStyles />

      {/* Hero */}
      <HeroCarousel navbar={<Navbar heroMode />} />

      {/* ══════════════════════════════════════════════════════════════
          WHY CHOOSE US
          White section — clean, open, generous.
          Cards are deep green — brand-anchored, premium.
      ══════════════════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        style={{
          background: 'var(--color-bg-section-light)',
          padding: 'var(--padding-section)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle dot grid texture */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, var(--color-dot-grid) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            pointerEvents: 'none',
          }}
        />

        {/* Ghost watermark — dark, barely visible on white */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(60px, 12vw, 180px)',
            color: 'var(--color-watermark)',
            letterSpacing: '-0.05em',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: 1,
          }}
        >
          RAAH
        </div>

        {/* Green radial glow — top right corner */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 'clamp(-48px, -8vw, -60px)',
            right: 'clamp(-48px, -8vw, -60px)',
            width: 'clamp(320px, 60vw, 420px)',
            height: 'clamp(320px, 60vw, 420px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--color-radial-glow) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        {/* Green radial glow — bottom left corner */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 'clamp(-48px, -8vw, -60px)',
            left: 'clamp(-48px, -8vw, -60px)',
            width: 'clamp(280px, 50vw, 360px)',
            height: 'clamp(280px, 50vw, 360px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--color-radial-glow) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>

          {/* Section header */}
          <Reveal delay={0}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(64px, 11vw, 80px)' }}>

              {/* Eyebrow */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'clamp(8px, 1.5vw, 10px)',
                  marginBottom: 'var(--margin-eyebrow)',
                }}
              >
                {/* Decorative line */}
                <div style={{ width: 'clamp(24px, 4vw, 32px)', height: 'clamp(1px, 0.2vw, 1.5px)', background: 'var(--color-text-green)', borderRadius: '999px' }} />
                <span
                  className="home-text"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 'var(--font-eyebrow)',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-green)',
                  }}
                >
                  Why Choose Us
                </span>
                <div style={{ width: 'clamp(24px, 4vw, 32px)', height: 'clamp(1px, 0.2vw, 1.5px)', background: 'var(--color-text-green)', borderRadius: '999px' }} />
              </div>

              {/* Main heading */}
              <h2
                className="home-text"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  fontSize: 'var(--font-h2)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.08,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--margin-section-title)',
                  maxWidth: 'clamp(280px, 90vw, 780px)',
                  margin: '0 auto var(--margin-section-title)',
                }}
              >
                The Platform Built{' '}
                <span style={{ color: 'var(--color-text-green)' }}>Exclusively</span>{' '}
                for Home Health
              </h2>

              {/* Sub heading */}
              <p
                className="home-text"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'var(--font-body-lg)',
                  fontWeight: 500,
                  lineHeight: 1.75,
                  color: 'var(--color-text-secondary)',
                  maxWidth: 'clamp(280px, 90vw, 600px)',
                  margin: '0 auto',
                }}
              >
                Six pillars. One platform. Everything your agency needs to operate at the highest level, and nothing you don't.
              </p>

            </div>
          </Reveal>

          {/* Cards grid */}
          <div className="features-grid">
            {FEATURES.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                delay={100 + i * 80}
              />
            ))}
          </div>

          {/* Bottom CTA row */}
          <Reveal delay={600}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 'var(--margin-cta)',
              }}
            >
              <Link
                to="/demo"
                className="home-cta"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 'var(--font-cta)',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  padding: 'var(--padding-hero-cta)',
                  borderRadius: 'var(--radius-cta)',
                  background: 'var(--color-bg-cta-solid)',
                  color: 'var(--color-text-white)',
                  border: 'var(--border-cta) var(--color-bg-cta-solid)',
                  boxShadow: 'var(--shadow-cta)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--gap-cta-icon)',
                  textDecoration: 'none',
                  transition: 'var(--transition-cta)',
                  minWidth: 'clamp(140px, 30vw, 180px)',
                  justifyContent: 'center',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = 'transparent';
                  e.currentTarget.style.color       = 'var(--color-text-green)';
                  e.currentTarget.style.borderColor = 'var(--color-text-green)';
                  e.currentTarget.style.transform   = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow   = 'none';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'var(--color-bg-cta-solid)';
                  e.currentTarget.style.color       = 'var(--color-text-white)';
                  e.currentTarget.style.borderColor = 'var(--color-bg-cta-solid)';
                  e.currentTarget.style.transform   = 'translateY(0)';
                  e.currentTarget.style.boxShadow   = 'var(--shadow-cta)';
                }}
              >
                See the Full Platform
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HOW IT WORKS — Workflow
          Two-column layout preserved. Left: image with floating stat card.
          Right: eyebrow + heading + body + numbered steps + CTA.
          Elevated with Reveal animations, Inter/Poppins, premium spacing.
      ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--color-bg-section-light)',
          padding: 'clamp(60px, 10vw, 120px) 0 clamp(60px, 10vw, 130px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle background texture */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(5,46,22,0.07) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
          }}
        />

        {/* Decorative green arc — right side */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 'clamp(-96px, -15vw, -120px)',
            right: 'clamp(-144px, -22vw, -180px)',
            width: 'clamp(448px, 80vw, 560px)',
            height: 'clamp(448px, 80vw, 560px)',
            borderRadius: '50%',
            border: 'clamp(1px, 0.2vw, 1.5px) solid rgba(22,163,74,0.08)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 'clamp(-48px, -8vw, -60px)',
            right: 'clamp(-96px, -15vw, -120px)',
            width: 'clamp(304px, 55vw, 380px)',
            height: 'clamp(304px, 55vw, 380px)',
            borderRadius: '50%',
            border: 'clamp(1px, 0.2vw, 1px) solid rgba(22,163,74,0.05)',
            pointerEvents: 'none',
          }}
        />

        {/* Bottom-left glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 'clamp(-64px, -10vw, -80px)',
            left: 'clamp(-64px, -10vw, -80px)',
            width: 'clamp(320px, 60vw, 400px)',
            height: 'clamp(320px, 60vw, 400px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <div className="workflow-grid">

            {/* ── LEFT — Image ── */}
            <Reveal delay={0} className="order-2 md:order-1">
              <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>

                {/* Large decorative ring behind image — desktop only */}
                <div
                  aria-hidden="true"
                  className="hidden md:block"
                  style={{
                    position: 'absolute',
                    top: 'clamp(-16px, -2.5vw, -24px)',
                    left: 'clamp(-16px, -2.5vw, -24px)',
                    right: 'clamp(16px, 2.5vw, 24px)',
                    bottom: 'clamp(16px, 2.5vw, 24px)',
                    borderRadius: 'clamp(16px, 2.5vw, 24px)',
                    border: 'clamp(1px, 0.2vw, 1.5px) solid rgba(22,163,74,0.15)',
                    zIndex: 0,
                  }}
                />

                {/* Main image — fills full column, blends seamlessly */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    borderRadius: 'clamp(16px, 2.5vw, 20px)',
                    overflow: 'hidden',
                    boxShadow: '0 clamp(24px, 4vw, 32px) clamp(64px, 10vw, 80px) rgba(5,46,22,0.14), 0 clamp(6px, 1vw, 8px) clamp(20px, 3.5vw, 24px) rgba(5,46,22,0.08)',
                    height: '100%',
                    minHeight: 'clamp(280px, 40vw, 520px)',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
                    alt="RAAH Platform Dashboard"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                      transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                      maxWidth: '100%',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                  {/* Left-edge fade — blends into white section background */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'var(--color-edge-fade)',
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Top fade — blends into section seamlessly */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 'clamp(60px, 10vw, 80px)',
                      background: 'var(--color-top-fade)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* ✅ Floating stat card — FIXED: responsive positioning to prevent overflow */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 'clamp(-12px, -2vw, -28px)',
                    right: 'clamp(8px, 2vw, -28px)',
                    left: 'clamp(8px, auto, auto)',
                    zIndex: 10,
                    background: 'var(--color-bg-card-rest)',
                    borderRadius: 'clamp(12px, 2.5vw, 16px)',
                    padding: 'clamp(12px, 2.5vw, 16px) clamp(16px, 3vw, 20px)',
                    boxShadow: '0 clamp(16px, 3vw, 20px) clamp(48px, 9vw, 60px) rgba(5,46,22,0.16), 0 clamp(4px, 0.8vw, 16px) rgba(5,46,22,0.08)',
                    border: 'clamp(1px, 0.2vw, 1px) solid rgba(22,163,74,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(10px, 2vw, 12px)',
                    maxWidth: 'clamp(240px, 45vw, 280px)',
                    width: 'calc(100% - clamp(12px, 2vw, 16px))',
                    boxSizing: 'border-box',
                  }}
                  className="hidden lg:flex"
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: 'clamp(32px, 6vw, 40px)',
                      height: 'clamp(32px, 6vw, 40px)',
                      borderRadius: 'clamp(8px, 1.5vw, 10px)',
                      background: 'linear-gradient(135deg, #0d7a3e 0%, #16a34a 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <BarChart3 style={{ color: 'var(--color-text-green-light)', width: 'var(--size-icon-small)', height: 'var(--size-icon-small)' }} />
                  </div>
                  <div>
                    <p
                      className="home-text"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: 'clamp(0.55rem, 1.2vw, 0.62rem)',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-green)',
                        marginBottom: 'clamp(1px, 0.3vw, 2px)',
                        lineHeight: 1.2,
                      }}
                    >
                      Operational Efficiency
                    </p>
                    <p
                      className="home-text"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                        fontWeight: 900,
                        color: 'var(--color-text-primary)',
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                      }}
                    >
                      +45%
                    </p>
                  </div>
                </div>

                {/* Floating trust pill — top left */}
                <div
                  style={{
                    position: 'absolute',
                    top: 'clamp(-16px, -2.5vw, -20px)',
                    left: 'clamp(-16px, -2.5vw, -20px)',
                    zIndex: 10,
                    background: 'linear-gradient(135deg, #0d7a3e 0%, #16a34a 100%)',
                    borderRadius: '999px',
                    padding: 'clamp(8px, 1.5vw, 10px) clamp(14px, 2.5vw, 18px)',
                    boxShadow: '0 clamp(6px, 1vw, 8px) clamp(20px, 3.5vw, 24px) rgba(5,46,22,0.30)',
                    border: 'clamp(1px, 0.2vw, 1px) solid rgba(74,222,128,0.20)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(6px, 1vw, 8px)',
                  }}
                  className="hidden lg:flex"
                >
                  <span
                    style={{
                      width: 'clamp(5px, 1vw, 7px)',
                      height: 'clamp(5px, 1vw, 7px)',
                      borderRadius: '50%',
                      background: 'var(--color-text-green-light)',
                      display: 'inline-block',
                      flexShrink: 0,
                      boxShadow: '0 0 clamp(6px, 1vw, 8px) rgba(74,222,128,0.60)',
                    }}
                  />
                  <span
                    className="home-text"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 'clamp(0.62rem, 1.3vw, 0.72rem)',
                      fontWeight: 600,
                      color: 'var(--color-text-white)',
                      letterSpacing: '0.06em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Live Platform
                  </span>
                </div>

              </div>
            </Reveal>

            {/* ── RIGHT — Content ── */}
            <Reveal delay={150} className="order-1 md:order-2">
              <div>

                {/* Eyebrow */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'clamp(8px, 1.5vw, 10px)',
                    marginBottom: 'var(--margin-eyebrow)',
                  }}
                >
                  <div
                    style={{
                      width: 'clamp(24px, 4vw, 32px)',
                      height: 'clamp(1px, 0.2vw, 1.5px)',
                      background: 'var(--color-text-green)',
                      borderRadius: '999px',
                    }}
                  />
                  <span
                    className="home-text"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 'var(--font-eyebrow)',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-green)',
                    }}
                  >
                    Workflow
                  </span>
                  <div
                    style={{
                      width: 'clamp(24px, 4vw, 32px)',
                      height: 'clamp(1px, 0.2vw, 1.5px)',
                      background: 'var(--color-text-green)',
                      borderRadius: '999px',
                    }}
                  />
                </div>

                {/* Heading */}
                <h2
                  className="home-text"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 900,
                    fontSize: 'var(--font-h2)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.08,
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--margin-section-title)',
                  }}
                >
                  Simplified Operations{' '}
                  <span style={{ color: 'var(--color-text-green)' }}>from Intake</span>{' '}
                  to Billing
                </h2>

                {/* Body */}
                <p
                  className="home-text"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 'var(--font-body-lg)',
                    fontWeight: 500,
                    lineHeight: 1.8,
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'clamp(36px, 6vw, 44px)',
                    maxWidth: 'clamp(280px, 90vw, 520px)',
                    margin: '0 auto clamp(36px, 6vw, 44px)',
                    textAlign: 'center',
                  }}
                  className="md:text-left md:ml-0"
                >
                  One connected platform unifies every workflow from first referral to final payment, cutting administrative overhead so your team can focus entirely on delivering care.
                </p>

                {/* Steps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0', maxWidth: 'clamp(280px, 90vw, 520px)', margin: '0 auto' }} className="md:ml-0">
                  {[
                    {
                      number: '01',
                      title: 'Smart Scheduling',
                      text: 'Drag-and-drop visit builder with automatic conflict detection, caregiver skill-matching, and drive-time optimisation.',
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" width="var(--size-icon-small)" height="var(--size-icon-small)">
                          <rect x="3" y="4" width="18" height="16" rx="2" stroke="#16a34a" strokeWidth="1.5"/>
                          <path d="M3 9H21" stroke="#16a34a" strokeWidth="1.5"/>
                          <line x1="8" y1="2" x2="8" y2="6" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
                          <line x1="16" y1="2" x2="16" y2="6" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="12" cy="14" r="2" fill="#16a34a"/>
                        </svg>
                      ),
                    },
                    {
                      number: '02',
                      title: 'Mobile Verification',
                      text: 'Caregivers clock in via GPS-enabled mobile app with offline support, digital signatures, and real-time sync.',
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" width="var(--size-icon-small)" height="var(--size-icon-small)">
                          <rect x="7" y="2" width="10" height="20" rx="2" stroke="#16a34a" strokeWidth="1.5"/>
                          <circle cx="12" cy="18" r="1" fill="#16a34a"/>
                          <path d="M10 6H14" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      ),
                    },
                    {
                      number: '03',
                      title: 'Instant Billing',
                      text: 'Convert completed, EVV-verified visits to clean claims in one click. Automatic scrubbing catches errors before submission.',
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" width="var(--size-icon-small)" height="var(--size-icon-small)">
                          <path d="M6 2H16L20 6V22H4V2H6Z" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
                          <path d="M16 2V6H20" stroke="#16a34a" strokeWidth="1.5"/>
                          <path d="M12 9V10M12 16V17M9 11.5C9 10.67 10.34 10 12 10C13.66 10 15 10.67 15 11.5C15 12.33 13.66 13 12 13C10.34 13 9 13.67 9 14.5C9 15.33 10.34 16 12 16C13.66 16 15 15.33 15 14.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      ),
                    },
                  ].map((step, i) => (
                    <WorkflowStep key={i} step={step} isLast={i === 2} />
                  ))}
                </div>

                {/* CTA */}
                <div style={{ marginTop: 'clamp(40px, 7vw, 48px)', textAlign: 'center' }} className="md:text-left">
                  <Link
                    to="/demo"
                    className="home-cta"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: 'var(--font-cta)',
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      padding: 'clamp(12px, 2.5vw, 15px) clamp(28px, 5vw, 36px)',
                      borderRadius: 'var(--radius-cta)',
                      background: 'var(--color-bg-cta-solid)',
                      color: 'var(--color-text-white)',
                      border: 'var(--border-cta) var(--color-bg-cta-solid)',
                      boxShadow: 'var(--shadow-cta)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--gap-cta-icon)',
                      textDecoration: 'none',
                      transition: 'var(--transition-cta)',
                      minWidth: 'clamp(140px, 30vw, 180px)',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background  = 'transparent';
                      e.currentTarget.style.color       = 'var(--color-text-green)';
                      e.currentTarget.style.borderColor = 'var(--color-text-green)';
                      e.currentTarget.style.transform   = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow   = 'none';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background  = 'var(--color-bg-cta-solid)';
                      e.currentTarget.style.color       = 'var(--color-text-white)';
                      e.currentTarget.style.borderColor = 'var(--color-bg-cta-solid)';
                      e.currentTarget.style.transform   = 'translateY(0)';
                      e.currentTarget.style.boxShadow   = 'var(--shadow-cta)';
                    }}
                  >
                    See How It Works
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </Link>
                </div>

              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          EMPOWER YOUR CAREGIVERS
          Deep brand-green background — RAAH #052e16 gradient.
          Same card treatment as Why Choose Us: white icon bg, green
          icons, shimmer, lift, glow, metric stat, Reveal animations.
          Layout: centred header + 3-column grid — preserved exactly.
      ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--color-bg-section-dark)',
          padding: 'clamp(60px, 10vw, 120px) 0 clamp(60px, 10vw, 130px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid — mint dots on dark green bg */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, var(--color-dot-grid-dark) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            pointerEvents: 'none',
          }}
        />

        {/* Ghost watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(60px, 12vw, 180px)',
            color: 'var(--color-watermark-dark)',
            letterSpacing: '-0.05em',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: 1,
          }}
        >
          RAAH
        </div>

        {/* Radial glow top-right */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 'clamp(-64px, -10vw, -80px)',
            right: 'clamp(-64px, -10vw, -80px)',
            width: 'clamp(400px, 70vw, 500px)',
            height: 'clamp(400px, 70vw, 500px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(22,163,74,0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        {/* Radial glow bottom-left */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 'clamp(-64px, -10vw, -80px)',
            left: 'clamp(-64px, -10vw, -80px)',
            width: 'clamp(320px, 60vw, 400px)',
            height: 'clamp(320px, 60vw, 400px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(22,163,74,0.10) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>

          {/* ── Section header ── */}
          <Reveal delay={0}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(64px, 11vw, 80px)' }}>

              {/* Eyebrow — double dash, matches WCU + Workflow */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'clamp(8px, 1.5vw, 10px)',
                  marginBottom: 'var(--margin-eyebrow)',
                }}
              >
                <div style={{ width: 'clamp(24px, 4vw, 32px)', height: 'clamp(1px, 0.2vw, 1.5px)', background: 'var(--color-text-white)', borderRadius: '999px' }} />
                <span
                  className="home-text"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 'var(--font-eyebrow)',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-white)',
                  }}
                >
                  Caregiver Tools
                </span>
                <div style={{ width: 'clamp(24px, 4vw, 32px)', height: 'clamp(1px, 0.2vw, 1.5px)', background: 'var(--color-text-white)', borderRadius: '999px' }} />
              </div>

              {/* Heading — exact WCU size */}
              <h2
                className="home-text"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  fontSize: 'var(--font-h2)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.08,
                  color: 'var(--color-text-white)',
                  marginBottom: 'var(--margin-section-title)',
                  maxWidth: 'clamp(280px, 90vw, 780px)',
                  margin: '0 auto var(--margin-section-title)',
                }}
              >
                Empower Your{' '}
                <span style={{ color: 'var(--color-text-white)', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.40)', textUnderlineOffset: 'clamp(4px, 0.8vw, 6px)' }}>Caregivers</span>
              </h2>

              {/* Body — exact WCU subheading size/weight/colour on dark bg */}
              <p
                className="home-text"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'var(--font-body-lg)',
                  fontWeight: 500,
                  lineHeight: 1.75,
                  color: 'var(--color-text-white)',
                  maxWidth: 'clamp(280px, 90vw, 600px)',
                  margin: '0 auto',
                }}
              >
                Your field staff get everything they need to focus on patients, not paperwork, even in areas without internet connection.
              </p>

            </div>
          </Reveal>

          {/* ── Cards grid ── */}
          <div className="caregiver-grid">
            {[
              {
                label: 'Connectivity',
                title: 'Offline Mode',
                desc: 'Document visits, vitals, and notes in full in any remote area. Everything syncs the moment connectivity is restored.',
                metric: '100%',
                metricLabel: 'Uptime Regardless of Signal',
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="var(--size-icon)" height="var(--size-icon)">
                    {/* Phone body */}
                    <rect x="12" y="4" width="24" height="40" rx="4" fill="rgba(22,163,74,0.12)" stroke="#16a34a" strokeWidth="1.5"/>
                    {/* Screen */}
                    <rect x="15" y="10" width="18" height="24" rx="2" fill="rgba(22,163,74,0.10)" stroke="#16a34a" strokeWidth="1"/>
                    {/* Home dot */}
                    <circle cx="24" cy="38" r="2" fill="#16a34a"/>
                    {/* Offline slash */}
                    <line x1="18" y1="14" x2="30" y2="30" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" opacity="0.35"/>
                    {/* Signal bars — partial, offline metaphor */}
                    <rect x="16" y="22" width="3" height="6" rx="1" fill="#16a34a" opacity="0.4"/>
                    <rect x="21" y="18" width="3" height="10" rx="1" fill="#16a34a" opacity="0.6"/>
                    <rect x="26" y="14" width="3" height="14" rx="1" fill="#16a34a" opacity="0.25"/>
                    {/* Checkmark — works offline */}
                    <circle cx="34" cy="14" r="6" fill="#052e16" stroke="#16a34a" strokeWidth="1.5"/>
                    <path d="M31 14L33 16L37 12" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                label: 'Communication',
                title: 'Real-Time Chat',
                desc: 'HIPAA-compliant encrypted messaging between office coordinators and field caregivers. No personal phones, no compliance risk.',
                metric: '0ms',
                metricLabel: 'Message Delay',
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="var(--size-icon)" height="var(--size-icon)">
                    {/* Primary bubble */}
                    <path d="M6 8H34C36.2 8 38 9.8 38 12V28C38 30.2 36.2 32 34 32H18L10 40V32H6C3.8 32 2 30.2 2 28V12C2 9.8 3.8 8 6 8Z"
                      fill="rgba(22,163,74,0.12)" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
                    {/* Secondary bubble — right offset */}
                    <path d="M38 16H42C44.2 16 46 17.8 46 20V30C46 32.2 44.2 34 42 34H40V40L34 34C32 34 38 16 38 16Z"
                      fill="rgba(22,163,74,0.08)" stroke="#16a34a" strokeWidth="1" strokeLinejoin="round" opacity="0.7"/>
                    {/* Message lines */}
                    <line x1="10" y1="17" x2="28" y2="17" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="10" y1="22" x2="22" y2="22" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="10" y1="27" x2="26" y2="27" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
                    {/* Lock badge — HIPAA compliant */}
                    <circle cx="38" cy="38" r="7" fill="#052e16" stroke="#16a34a" strokeWidth="1.5"/>
                    <rect x="35" y="37" width="6" height="5" rx="1" fill="rgba(22,163,74,0.20)" stroke="#16a34a" strokeWidth="1"/>
                    <path d="M36 37V35.5C36 34.1 38 34.1 38 35.5V37" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                label: 'Documentation',
                title: 'Digital Signatures',
                desc: 'Capture patient verification signatures directly on the device at point of care. Legally binding, EVV-compliant, instantly filed.',
                metric: '< 10s',
                metricLabel: 'Signature Capture Time',
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="var(--size-icon)" height="var(--size-icon)">
                    {/* Document */}
                    <path d="M8 4H30L42 16V44H8V4Z"
                      fill="rgba(22,163,74,0.10)" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
                    {/* Fold corner */}
                    <path d="M30 4V16H42" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
                    {/* Signature line */}
                    <line x1="14" y1="36" x2="36" y2="36" stroke="#16a34a" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
                    {/* Signature stroke — organic pen path */}
                    <path d="M14 33C16 31 17 33 19 31C21 29 22 31 24 29C26 27 27 30 29 29C31 28 32 30 34 29"
                      stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    {/* Text lines above */}
                    <line x1="14" y1="22" x2="34" y2="22" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                    <line x1="14" y1="27" x2="28" y2="27" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
                    {/* Verified check */}
                    <circle cx="38" cy="38" r="6" fill="#052e16" stroke="#16a34a" strokeWidth="1.5"/>
                    <path d="M35 38L37 40L41 36" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
            ].map((item, i) => (
              <CaregiverCard key={item.title} item={item} delay={100 + i * 100} />
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TESTIMONIALS — Trusted by Leading Agencies
          White section, consistent with Why Choose Us + Workflow.
          Auto-sliding carousel: 7 testimonials, 2 visible desktop,
          1 mobile. Pauses on hover. Progress dots + prev/next.
          No external deps — pure React state + CSS transitions.
      ══════════════════════════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ══════════════════════════════════════════════════════════════
          CTA — Ready to Transform Your Agency?
          White background — clean close before the green footer.
          Testimonials (white) -> CTA (white) -> Footer (green) flows correctly.
          Three stat callouts above CTAs: social proof at decision moment.
      ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--color-bg-section-light)',
          padding: 'clamp(60px, 10vw, 120px) 0 clamp(60px, 10vw, 130px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, var(--color-dot-grid) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            pointerEvents: 'none',
          }}
        />

        {/* Ghost watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(60px, 12vw, 180px)',
            color: 'var(--color-watermark)',
            letterSpacing: '-0.05em',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: 1,
          }}
        >
          RAAH
        </div>

        {/* Radial glow — top right */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 'clamp(-80px, -12vw, -100px)', 
            right: 'clamp(-80px, -12vw, -100px)',
            width: 'clamp(480px, 85vw, 600px)', 
            height: 'clamp(480px, 85vw, 600px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--color-radial-glow) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        {/* Radial glow — bottom left */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 'clamp(-80px, -12vw, -100px)', 
            left: 'clamp(-80px, -12vw, -100px)',
            width: 'clamp(400px, 70vw, 500px)', 
            height: 'clamp(400px, 70vw, 500px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--color-radial-glow) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

          {/* Eyebrow */}
          <Reveal delay={0}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(8px, 1.5vw, 10px)', marginBottom: 'clamp(24px, 4vw, 28px)' }}>
              <div style={{ width: 'clamp(24px, 4vw, 32px)', height: 'clamp(1px, 0.2vw, 1.5px)', background: 'var(--color-text-green)', borderRadius: '999px' }} />
              <span
                className="home-text"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'var(--font-eyebrow)',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-green)',
                }}
              >
                Get Started
              </span>
              <div style={{ width: 'clamp(24px, 4vw, 32px)', height: 'clamp(1px, 0.2vw, 1.5px)', background: 'var(--color-text-green)', borderRadius: '999px' }} />
            </div>
          </Reveal>

          {/* Heading */}
          <Reveal delay={80}>
            <h2
              className="home-text"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: 'var(--font-h2)',
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--margin-section-title)',
                maxWidth: 'clamp(280px, 90vw, 820px)',
                margin: '0 auto var(--margin-section-title)',
              }}
            >
              Ready to{' '}
              <span style={{ color: 'var(--color-text-green)' }}>Transform</span>{' '}
              Your Agency?
            </h2>
          </Reveal>

          {/* Body */}
          <Reveal delay={150}>
            <p
              className="home-text"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'var(--font-body-lg)',
                fontWeight: 500,
                lineHeight: 1.75,
                color: 'var(--color-text-secondary)',
                maxWidth: 'clamp(280px, 90vw, 580px)',
                margin: '0 auto clamp(48px, 8vw, 64px)',
              }}
            >
              Book a personalised demo today. See exactly how RAAH solves your specific challenges with no commitment required.
            </p>
          </Reveal>

          {/* Stat callouts — social proof at the decision moment */}
<Reveal delay={220}>
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'stretch',
      gap: '0',
      marginBottom: 'clamp(48px, 8vw, 56px)',
      maxWidth: 'clamp(280px, 90vw, 800px)',
      margin: '0 auto clamp(48px, 8vw, 56px)',
    }}
  >
    {[
      { value: '99.2%', label: 'Billing Accuracy' },
      { value: '90%',   label: 'Fewer Claim Rejections' },
      { value: '< 5min', label: 'Visit Documentation' },
    ].map((stat, i) => (
      <div
        key={stat.label}
        style={{
          flex: '1',
          padding: 'clamp(20px, 4vw, 28px) clamp(20px, 4vw, 24px)',
          borderRight: i < 2 ? '1px solid rgba(22,163,74,0.28)' : 'none',
          textAlign: 'center',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <p
          className="home-text"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
            letterSpacing: '-0.03em',
            color: 'var(--color-text-green-dark)',
            lineHeight: 1,
            marginBottom: 'clamp(6px, 1vw, 8px)',
          }}
        >
          {stat.value}
        </p>
        <p
          className="home-text"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(0.68rem, 1.4vw, 0.78rem)',
            fontWeight: 500,
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          {stat.label}
        </p>
      </div>
    ))}
  </div>
</Reveal>

{/* CTAs */}
<Reveal delay={300}>
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--margin-cta-buttons)',
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto',
    }}
    className="sm:flex-row sm:justify-center"
  >
    {/* Primary — Schedule Demo */}
    <Link
      to="/demo"
      className="home-cta"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: 'var(--font-cta)',
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        padding: 'clamp(14px, 2.5vw, 18px) clamp(36px, 6vw, 44px)',
        borderRadius: 'var(--radius-cta)',
        background: 'var(--color-bg-cta-solid)',
        color: 'var(--color-text-white)',
        border: 'var(--border-cta) var(--color-bg-cta-solid)',
        boxShadow: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--gap-cta-icon)',
        textDecoration: 'none',
        transition: 'var(--transition-cta)',
        width: '100%',
        maxWidth: '280px',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background  = 'transparent';
        e.currentTarget.style.color       = 'var(--color-text-green)';
        e.currentTarget.style.borderColor = 'var(--color-text-green)';
        e.currentTarget.style.transform   = 'translateY(-3px)';
        e.currentTarget.style.boxShadow   = 'none';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background  = 'var(--color-bg-cta-solid)';
        e.currentTarget.style.color       = 'var(--color-text-white)';
        e.currentTarget.style.borderColor = 'var(--color-bg-cta-solid)';
        e.currentTarget.style.transform   = 'translateY(0)';
        e.currentTarget.style.boxShadow   = 'none';
      }}
    >
      Schedule a Demo
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>

    {/* Secondary — Contact Sales */}
    <Link
      to="/contact"
      className="home-cta"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: 'var(--font-cta)',
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        padding: 'clamp(14px, 2.5vw, 18px) clamp(36px, 6vw, 44px)',
        borderRadius: 'var(--radius-cta)',
        background: 'var(--color-bg-cta-ghost)',
        color: 'var(--color-text-green)',
        border: 'var(--border-cta) var(--color-text-green)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--gap-cta-icon)',
        textDecoration: 'none',
        transition: 'var(--transition-cta)',
        width: '100%',
        maxWidth: '280px',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background  = 'var(--color-bg-cta-solid)';
        e.currentTarget.style.borderColor = 'var(--color-bg-cta-solid)';
        e.currentTarget.style.color       = 'var(--color-text-white)';
        e.currentTarget.style.transform   = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background  = 'var(--color-bg-cta-ghost)';
        e.currentTarget.style.borderColor = 'var(--color-text-green)';
        e.currentTarget.style.color       = 'var(--color-text-green)';
        e.currentTarget.style.transform   = 'translateY(0)';
      }}
    >
      Talk to Sales
    </Link>
  </div>

  {/* No-commitment reassurance */}
  <p
    className="home-text"
    style={{
      fontFamily: "'Poppins', sans-serif",
      fontSize: 'var(--font-cta-small)',
      fontWeight: 400,
      color: 'var(--color-text-green)',
      marginTop: 'var(--margin-cta-reassurance)',
      letterSpacing: '0.04em',
      textAlign: 'center',
    }}
  >
    No credit card required. Setup in under 24 hours.
  </p>
</Reveal>

        </div>
      </section>

    </Layout>
  );
};

export default HomePage;