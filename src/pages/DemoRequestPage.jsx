/**
 * DemoRequestPage.jsx — RAAH Technologies
 *
 * Fully responsive layout with:
 *   - Mobile-first grid stacking
 *   - Form overflow prevention & responsive inputs
 *   - Perfectly aligned testimonial + trust cards on all screens
 *   - reCAPTCHA mobile scaling fix
 *   - No sticky positioning on mobile to prevent overlap
 *
 * ESLint fixes:
 *   - Removed unused `onReset` prop from SuccessState
 *   - Fixed 'Icon' defined but never used via React.createElement
 */

import React, { useRef, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { publicApi } from '../api/services';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';

const FI = "'Inter', sans-serif";
const FP = "'Poppins', sans-serif";

// ─── Scroll animation ─────────────────────────────────────────────────────────
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold }
    );
    obs.observe(el); return () => obs.unobserve(el);
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
    }}>{children}</div>
  );
};

// ─── Global responsive CSS variables ──────────────────────────────────────────
const DemoStyles = () => (
  <style>{`
    :root {
      /* Typography */
      --font-eyebrow: clamp(0.65rem, 1.4vw, 0.75rem);
      --font-h1: clamp(2rem, 6vw, 5rem);
      --font-h2: clamp(1.5rem, 4vw, 2.75rem);
      --font-h3: clamp(1.25rem, 2.5vw, 1.875rem);
      --font-label: clamp(0.7rem, 1.4vw, 0.8125rem);
      --font-input: clamp(0.875rem, 1.8vw, 1.0625rem);
      --font-feature-title: clamp(0.875rem, 1.8vw, 1.0625rem);
      --font-feature-body: clamp(0.8125rem, 1.6vw, 0.9375rem);
      --font-testimonial: clamp(0.875rem, 1.8vw, 1rem);
      --font-testimonial-name: clamp(0.8125rem, 1.8vw, 0.9375rem);
      --font-testimonial-role: clamp(0.72rem, 1.5vw, 0.8125rem);
      --font-trust: clamp(0.68rem, 1.5vw, 0.8rem);
      --font-trust-item: clamp(0.8125rem, 1.8vw, 0.9375rem);
      --font-strip-value: clamp(1.25rem, 2.5vw, 2.5rem);
      --font-strip-label: clamp(0.8125rem, 1.8vw, 0.9375rem);
      --font-strip-sub: clamp(0.65rem, 1.4vw, 0.75rem);
      --font-success-title: clamp(1.25rem, 3vw, 1.875rem);
      --font-success-body: clamp(0.875rem, 2vw, 1rem);
      --font-success-step: clamp(0.8125rem, 1.6vw, 0.9375rem);
      --font-cta: clamp(0.8rem, 1.8vw, 0.9375rem);
      --font-cta-small: clamp(0.75rem, 1.5vw, 0.875rem);
      --font-footer: clamp(0.7rem, 1.5vw, 0.75rem);
      
      /* Spacing */
      --padding-section: clamp(50px, 10vw, 80px) 0 clamp(60px, 12vw, 120px);
      --padding-hero: clamp(80px, 15vw, 120px) clamp(16px, 4vw, 24px);
      --padding-form: clamp(24px, 5vw, 52px);
      --padding-card: clamp(18px, 4vw, 28px);
      --padding-feature: clamp(12px, 3vw, 20px);
      --padding-strip: clamp(20px, 4vw, 36px) clamp(12px, 3vw, 24px);
      --padding-success: clamp(32px, 8vw, 72px) clamp(20px, 5vw, 48px);
      --margin-eyebrow: clamp(16px, 3vw, 20px);
      --margin-section-title: clamp(8px, 1.5vw, 12px);
      --margin-section-body: clamp(20px, 4vw, 40px);
      --margin-form-row: clamp(16px, 3vw, 20px);
      --margin-feature-gap: clamp(2px, 0.5vw, 4px);
      --margin-card-gap: clamp(16px, 3vw, 28px);
      --margin-strip-gap: clamp(24px, 4vw, 48px);
      --margin-success-icon: clamp(16px, 3vw, 24px);
      --margin-success-body: clamp(24px, 4vw, 32px);
      --margin-success-list: clamp(12px, 2vw, 16px);
      --gap-form-row: clamp(14px, 3vw, 18px);
      --gap-feature: clamp(10px, 2vw, 16px);
      --gap-card: clamp(10px, 2vw, 12px);
      --gap-trust: clamp(10px, 2vw, 14px);
      --gap-strip: clamp(8px, 1.5vw, 10px);
      --gap-success-step: clamp(8px, 1.5vw, 10px);
      
      /* Dimensions */
      --width-container: clamp(280px, 95vw, 1200px);
      --width-form: 100%;
      --width-feature-icon: clamp(36px, 7vw, 52px);
      --width-success-icon: clamp(56px, 12vw, 80px);
      --width-success-check: clamp(16px, 3vw, 20px);
      --width-strip-stat: clamp(140px, 25vw, 200px);
      --height-feature-icon: clamp(36px, 7vw, 52px);
      --height-success-icon: clamp(56px, 12vw, 80px);
      --height-wave: clamp(40px, 6vw, 80px);
      --radius-card: clamp(14px, 2.5vw, 20px);
      --radius-feature: clamp(12px, 2vw, 14px);
      --radius-input: clamp(10px, 2vw, 12px);
      --radius-cta: 999px;
      --radius-success-icon: 50%;
      --size-icon-small: clamp(12px, 2vw, 14px);
      --size-icon-med: clamp(18px, 3vw, 22px);
      --size-icon-lg: clamp(32px, 5vw, 36px);
      --size-check: clamp(12px, 2vw, 14px);
      --size-success-check: clamp(14px, 2.5vw, 20px);
      
      /* Borders & Shadows */
      --border-card: 1px solid rgba(22,163,74,0.14);
      --border-feature: 1px solid transparent;
      --border-feature-hover: 1px solid rgba(22,163,74,0.20);
      --border-input: 1.5px solid rgba(22,163,74,0.22);
      --border-input-focus: 1.5px solid #16a34a;
      --border-input-error: 1.5px solid #dc2626;
      --border-cta: 2px solid #16a34a;
      --shadow-card: 0 clamp(4px, 0.8vw, 8px) clamp(16px, 3vw, 20px) rgba(5,46,22,0.08);
      --shadow-card-lg: 0 clamp(8px, 1.5vw, 48px) rgba(5,46,22,0.10), 0 clamp(2px, 0.4vw, 12px) rgba(5,46,22,0.06);
      --shadow-success-icon: 0 clamp(10px, 2vw, 40px) rgba(22,163,74,0.35);
      --shadow-cta: 0 clamp(6px, 1vw, 24px) rgba(22,163,74,0.30);
      --shadow-cta-hover: none;
      
      /* Colors */
      --color-bg-light: #dff0df;
      --color-bg-dark: linear-gradient(160deg, #0d7a3e 0%, #16a34a 55%, #0d7a3e 100%);
      --color-bg-card: #ffffff;
      --color-bg-feature-hover: rgba(22,163,74,0.06);
      --color-bg-input: #f8fffc;
      --color-bg-success-list: #dff0df;
      --color-bg-strip: rgba(5,46,22,0.45);
      --color-text-primary: #0a0a0a;
      --color-text-secondary: #374151;
      --color-text-tertiary: #475569;
      --color-text-muted: #64748b;
      --color-text-white: #ffffff;
      --color-text-white-dim: rgba(255,255,255,0.85);
      --color-text-white-dimmer: rgba(255,255,255,0.65);
      --color-text-green: #16a34a;
      --color-text-green-dark: #0a6b30;
      --color-text-green-light: #4ade80;
      --color-text-error: #dc2626;
      --color-accent-green: #16a34a;
      --color-accent-green-light: #4ade80;
      --color-overlay: rgba(5,46,22,0.68);
      --color-overlay-gradient: linear-gradient(to bottom, transparent 30%, rgba(5,46,22,0.55) 100%);
      --color-dot-grid: rgba(5,46,22,0.06);
      --color-dot-grid-dark: rgba(74,222,128,0.08);
      --color-radial-glow: rgba(22,163,74,0.07);
      --color-radial-glow-dark: rgba(22,163,74,0.14);
      --color-border-top: linear-gradient(to right, #16a34a, #22c55e);
      --color-border-top-gradient: linear-gradient(to right, #16a34a, #4ade80, #16a34a);
      
      /* Transitions */
      --transition-feature: all 0.25s ease;
      --transition-input: border-color 0.2s ease, box-shadow 0.2s ease;
      --transition-cta: all 0.25s ease;
      --transition-card: all 0.25s ease;
      
      /* Grid */
      --grid-form: 1fr;
      --grid-top: 1fr;
      --grid-cards: 1fr;
      --grid-strip: repeat(2, 1fr);
    }
    
    /* Tablet breakpoints */
    @media (min-width: 480px) {
      :root {
        --grid-form: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 768px) {
      :root {
        --grid-top: 1fr 1.15fr;
        --grid-cards: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1024px) {
      :root {
        --grid-strip: repeat(4, 1fr);
      }
    }
    
    /* Mobile-specific adjustments */
    @media (max-width: 767px) {
      :root {
        --font-h2: clamp(1.25rem, 5vw, 2rem);
        --padding-form: clamp(20px, 5vw, 40px);
        --padding-card: clamp(16px, 4vw, 24px);
      }
    }
    
    @media (max-width: 480px) {
      :root {
        --font-h1: clamp(1.5rem, 7vw, 3rem);
        --font-h2: clamp(1.125rem, 6vw, 1.75rem);
        --padding-section: clamp(40px, 12vw, 64px) 0 clamp(48px, 14vw, 96px);
      }
    }
    
    /* Ensure full viewport width safety */
    .demo-page, .demo-page * {
      max-width: 100vw;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    
    /* Improve touch targets on mobile */
    @media (hover: none) and (pointer: coarse) {
      .demo-cta, .demo-input, .demo-select {
        min-height: 44px;
        touch-action: manipulation;
      }
    }
    
    /* Prevent text overflow */
    .demo-text {
      word-break: break-word;
      hyphens: auto;
    }
    
    /* Grid utilities */
    .form-row {
      display: grid;
      gap: var(--gap-form-row);
      grid-template-columns: var(--grid-form);
    }
    
    .demo-top-row {
      display: grid;
      gap: clamp(24px, 6vw, 48px);
      align-items: start;
      grid-template-columns: var(--grid-top);
    }
    
    .cards-aligned-row {
      display: grid;
      grid-template-columns: var(--grid-cards);
      gap: var(--margin-card-gap);
      align-items: stretch;
      margin-top: clamp(32px, 8vw, 56px);
    }
    
    .strip-grid {
      display: grid;
      gap: clamp(1px, 0.2vw, 1px);
      background: rgba(255,255,255,0.12);
      border-radius: clamp(12px, 2.5vw, 16px);
      overflow: hidden;
      grid-template-columns: var(--grid-strip);
    }
    
    /* reCAPTCHA mobile fix */
    .recaptcha-wrapper {
      display: flex;
      justify-content: center;
      padding: clamp(8px, 2vw, 16px) 0 clamp(12px, 3vw, 20px);
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      max-width: 100%;
    }
    .recaptcha-wrapper > div {
      margin: 0 auto;
      transform-origin: center;
    }
    @media (max-width: 420px) {
      .recaptcha-wrapper > div {
        transform: scale(0.9);
      }
    }
    
    /* Sticky positioning fix for mobile */
    .demo-left-sticky {
      position: relative;
    }
    @media (min-width: 1024px) {
      .demo-left-sticky {
        position: sticky;
        top: clamp(100px, 15vw, 140px);
      }
    }
    
    /* Animation keyframes */
    @keyframes demo-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `}</style>
);

// ─── Shared decorations ───────────────────────────────────────────────────────
const DotGrid = ({ color = 'var(--color-dot-grid)' }) => (
  <div aria-hidden="true" style={{
    position: 'absolute', inset: 0,
    backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
    backgroundSize: '32px 32px', pointerEvents: 'none',
  }} />
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
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(8px, 1.5vw, 10px)', marginBottom: 'var(--margin-eyebrow)' }}>
    <div style={{ width: 'clamp(24px, 4vw, 32px)', height: 'clamp(1px, 0.2vw, 1.5px)', background: light ? 'var(--color-text-white)' : 'var(--color-text-green)', borderRadius: '999px' }} />
    <span style={{ fontFamily: FP, fontSize: 'var(--font-eyebrow)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: light ? 'var(--color-text-white)' : 'var(--color-text-green)' }}>{label}</span>
    <div style={{ width: 'clamp(24px, 4vw, 32px)', height: 'clamp(1px, 0.2vw, 1.5px)', background: light ? 'var(--color-text-white)' : 'var(--color-text-green)', borderRadius: '999px' }} />
  </div>
);
const WaveDivider = ({ topColor, bottomColor, flip = false }) => (
  <div style={{ position: 'relative', height: 'var(--height-wave)', overflow: 'hidden', background: topColor, marginBottom: '-1px' }}>
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', transform: flip ? 'scaleX(-1)' : 'none' }}>
      <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill={bottomColor} />
    </svg>
  </div>
);

// ─── Bespoke SVG icons ────────────────────────────────────────────────────────
const IconWalkthrough = ({ color = 'var(--color-text-green)' }) => (
  <svg viewBox="0 0 24 24" fill="none" width="var(--size-icon-med)" height="var(--size-icon-med)">
    <rect x="2" y="3" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5"/>
    <path d="M8 21h8M12 17v4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9.5 9L11 10.5L14.5 7" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconExperts = ({ color = 'var(--color-text-green)' }) => (
  <svg viewBox="0 0 24 24" fill="none" width="var(--size-icon-med)" height="var(--size-icon-med)">
    <circle cx="9" cy="7" r="3" stroke={color} strokeWidth="1.5"/>
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconROI = ({ color = 'var(--color-text-green)' }) => (
  <svg viewBox="0 0 24 24" fill="none" width="var(--size-icon-med)" height="var(--size-icon-med)">
    <path d="M3 17l4-4 4 4 4-6 4 3" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21H3M21 3v4h-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconSetup = ({ color = 'var(--color-text-green)' }) => (
  <svg viewBox="0 0 24 24" fill="none" width="var(--size-icon-med)" height="var(--size-icon-med)">
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const CheckSvg = () => (
  <svg viewBox="0 0 16 16" fill="none" width="var(--size-check)" height="var(--size-check)" style={{ flexShrink: 0, marginTop: '2px' }}>
    <path d="M3 8L6.5 11.5L13 5" stroke="var(--color-text-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Feature item ─────────────────────────────────────────────────────────────
const DemoFeatureItem = ({ icon, title, body }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', gap: 'var(--gap-feature)', alignItems: 'flex-start',
        padding: 'var(--padding-feature)',
        borderRadius: 'var(--radius-feature)',
        background: hovered ? 'var(--color-bg-feature-hover)' : 'transparent',
        border: hovered ? 'var(--border-feature-hover)' : 'var(--border-feature)',
        transition: 'var(--transition-feature)',
        cursor: 'default',
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        width: 'var(--width-feature-icon)', height: 'var(--height-feature-icon)', borderRadius: 'var(--radius-feature)', flexShrink: 0,
        background: hovered ? 'var(--color-text-green)' : 'rgba(22,163,74,0.08)',
        border: `1.5px solid ${hovered ? 'var(--color-text-green)' : 'rgba(22,163,74,0.20)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'var(--transition-feature)',
      }}>
        {React.createElement(icon, { color: hovered ? 'var(--color-text-white)' : 'var(--color-text-green)' })}
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontFamily: FI, fontWeight: 700, fontSize: 'var(--font-feature-title)', color: 'var(--color-text-primary)', marginBottom: 'clamp(4px, 0.8vw, 5px)', lineHeight: 1.2 }}>{title}</p>
        <p style={{ fontFamily: FP, fontWeight: 500, fontSize: 'var(--font-feature-body)', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{body}</p>
      </div>
    </div>
  );
};

// ─── Input field styles ───────────────────────────────────────────────────────
const inputStyle = {
  width: '100%', fontFamily: FP, fontSize: 'var(--font-input)', fontWeight: 400,
  padding: 'clamp(12px, 2.5vw, 16px) clamp(14px, 3vw, 20px)', borderRadius: 'var(--radius-input)', outline: 'none',
  border: 'var(--border-input)',
  color: 'var(--color-text-primary)', background: 'var(--color-bg-input)',
  transition: 'var(--transition-input)',
  boxSizing: 'border-box', maxWidth: '100%',
};
const labelStyle = {
  fontFamily: FI, fontSize: 'var(--font-label)', fontWeight: 700,
  color: 'var(--color-text-primary)', marginBottom: 'clamp(8px, 1.5vw, 9px)', display: 'block',
  letterSpacing: '0.05em', textTransform: 'uppercase',
};
const onFocus = e => {
  e.target.style.borderColor = 'var(--color-text-green)';
  e.target.style.boxShadow = '0 0 0 clamp(2px, 0.4vw, 3px) rgba(22,163,74,0.10)';
};
const onBlur = e => {
  e.target.style.borderColor = 'rgba(22,163,74,0.22)';
  e.target.style.boxShadow = 'none';
};

// ─── Field error style ────────────────────────────────────────────────────────
const FieldError = ({ msg }) => msg ? (
  <p style={{ fontFamily: FP, fontSize: 'clamp(0.72rem, 1.4vw, 0.78rem)', color: 'var(--color-text-error)', marginTop: 'clamp(4px, 0.8vw, 5px)', display: 'flex', alignItems: 'center', gap: 'clamp(4px, 0.8vw, 5px)' }}>
    <svg viewBox="0 0 16 16" fill="none" width="var(--size-icon-small)" height="var(--size-icon-small)" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7" stroke="var(--color-text-error)" strokeWidth="1.5"/>
      <path d="M8 5v3M8 11v.5" stroke="var(--color-text-error)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    {msg}
  </p>
) : null;

// ─── Validate fields ─────────────────────────────────────────────────────────
const validate = (fields) => {
  const errs = {};
  if (!fields.agency_name.trim()) errs.agency_name = 'Agency name is required.';
  if (!fields.contact_name.trim()) errs.contact_name = 'Contact name is required.';
  if (!fields.contact_email.trim()) errs.contact_email = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.contact_email)) errs.contact_email = 'Enter a valid email address.';
  if (fields.contact_phone && !/^[\d\s+\-()\s]{7,20}$/.test(fields.contact_phone)) errs.contact_phone = 'Enter a valid phone number.';
  if (!fields.estimated_patients) errs.estimated_patients = 'Please select your patient volume.';
  return errs;
};

// ─── Success state ────────────────────────────────────────────────────────────
const SuccessState = () => (
  <div style={{ textAlign: 'center', padding: 'var(--padding-success)' }}>
    <div style={{
      width: 'var(--width-success-icon)', height: 'var(--height-success-icon)', borderRadius: 'var(--radius-success-icon)', margin: `0 auto var(--margin-success-icon)`,
      background: 'linear-gradient(135deg, #0d7a3e 0%, #16a34a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: 'var(--shadow-success-icon)',
    }}>
      <svg viewBox="0 0 24 24" fill="none" width="var(--size-icon-lg)" height="var(--size-icon-lg)">
        <path d="M5 13l4 4L19 7" stroke="var(--color-text-white)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <h3 style={{ fontFamily: FI, fontWeight: 800, fontSize: 'var(--font-success-title)', color: 'var(--color-text-primary)', marginBottom: 'clamp(10px, 2vw, 12px)', letterSpacing: '-0.02em' }}>
      Request Received
    </h3>
    <p style={{ fontFamily: FP, fontSize: 'var(--font-success-body)', fontWeight: 500, color: 'var(--color-text-secondary)', lineHeight: 1.75, maxWidth: 'clamp(280px, 90vw, 340px)', margin: `0 auto var(--margin-success-body)` }}>
      A member of our implementation team will reach out within one business day to confirm your session.
    </p>
    <div style={{ background: 'var(--color-bg-success-list)', borderRadius: 'var(--radius-card)', padding: 'clamp(14px, 3vw, 20px) clamp(18px, 4vw, 24px)', marginBottom: 'clamp(24px, 4vw, 28px)', textAlign: 'left' }}>
      <p style={{ fontFamily: FI, fontWeight: 700, fontSize: 'clamp(0.72rem, 1.5vw, 0.8rem)', color: 'var(--color-text-green)', marginBottom: 'clamp(10px, 2vw, 12px)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>What happens next</p>
      {[
        'We review your agency size and use case',
        'A specialist reaches out to confirm your time',
        'You receive a calendar invite with the session link',
        'Your personalised demo is ready — no homework needed',
      ].map((step, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--gap-success-step)', marginBottom: i < 3 ? 'clamp(8px, 1.5vw, 10px)' : 0 }}>
          <div style={{ width: 'var(--width-success-check)', height: 'var(--width-success-check)', borderRadius: '50%', background: 'var(--color-text-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 'clamp(1px, 0.3vw, 2px)' }}>
            <span style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(0.58rem, 1.2vw, 0.65rem)', color: 'var(--color-text-white)' }}>{i + 1}</span>
          </div>
          <p style={{ fontFamily: FP, fontSize: 'var(--font-success-step)', fontWeight: 500, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{step}</p>
        </div>
      ))}
    </div>
    <Link to="/" style={{
      fontFamily: FI, fontWeight: 700, fontSize: 'clamp(0.78rem, 1.5vw, 0.85rem)', letterSpacing: '0.06em', textTransform: 'uppercase',
      padding: 'clamp(11px, 2vw, 13px) clamp(24px, 4vw, 28px)', borderRadius: 'var(--radius-cta)', background: 'transparent',
      color: 'var(--color-text-green)', border: 'var(--border-cta)', textDecoration: 'none',
      display: 'inline-flex', alignItems: 'center', gap: 'clamp(6px, 1vw, 8px)', transition: 'var(--transition-cta)',
    }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-text-green)'; e.currentTarget.style.color = 'var(--color-text-white)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-green)'; }}
    >
      Return to Homepage
    </Link>
  </div>
);

// ─── Form ─────────────────────────────────────────────────────────────────────
const DemoForm = () => {
  const [fields, setFields] = useState({
    agency_name: '', contact_name: '', contact_email: '',
    contact_phone: '', estimated_patients: '', preferred_demo_date: '',
    demo_format: 'live', primary_challenge: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef();

  const handleChange = e => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...fields, [name]: value });
      setErrors(prev => ({ ...prev, [name]: errs[name] || null }));
    }
  };

  const handleBlurField = e => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const errs = validate(fields);
    setErrors(prev => ({ ...prev, [name]: errs[name] || null }));
    onBlur(e);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(fields).map(k => [k, true]));
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error('Please fix the highlighted fields before submitting.');
      return;
    }
    if (!recaptchaToken) { toast.error('Please verify you are human.'); return; }
    setSubmitting(true);
    const payload = {
      ...fields,
      estimated_patients: fields.estimated_patients ? parseInt(fields.estimated_patients) : null,
      preferred_demo_date: fields.preferred_demo_date || null,
      recaptcha_token: recaptchaToken,
    };
    try {
      await publicApi.submitDemoRequest(payload);
      setSubmitted(true);
      toast.success('Demo request submitted successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Submission failed. Please check your connection.';
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).flat().forEach(err => toast.error(err));
      } else {
        toast.error(errMsg);
      }
    } finally {
      setSubmitting(false);
      if (recaptchaRef.current) { recaptchaRef.current.reset(); setRecaptchaToken(null); }
    }
  };

  if (submitted) return <SuccessState />;

  const fieldStyle = name => ({ ...inputStyle, borderColor: errors[name] ? 'var(--color-text-error)' : undefined });

  return (
    <div style={{ padding: 'var(--padding-form)' }}>
      <h2 style={{ fontFamily: FI, fontWeight: 900, fontSize: 'var(--font-h3)', color: 'var(--color-text-primary)', marginBottom: 'clamp(6px, 1vw, 8px)', letterSpacing: '-0.02em' }}>
        Schedule Your Demo
      </h2>
      <p style={{ fontFamily: FP, fontSize: 'var(--font-input)', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--margin-section-body)', lineHeight: 1.6 }}>
        Takes 90 seconds. We respond within one business day.
      </p>

      {/* Row 1 */}
      <div className="form-row" style={{ marginBottom: 'var(--margin-form-row)' }}>
        <div>
          <label style={labelStyle} htmlFor="agency_name">Agency Name *</label>
          <input id="agency_name" name="agency_name" type="text" required placeholder="Caring Hands Health"
            value={fields.agency_name} onChange={handleChange} style={fieldStyle('agency_name')}
            onFocus={onFocus} onBlur={handleBlurField} className="demo-input" />
          <FieldError msg={errors.agency_name} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="contact_name">Contact Name *</label>
          <input id="contact_name" name="contact_name" type="text" required placeholder="Sarah Johnson"
            value={fields.contact_name} onChange={handleChange} style={fieldStyle('contact_name')}
            onFocus={onFocus} onBlur={handleBlurField} className="demo-input" />
          <FieldError msg={errors.contact_name} />
        </div>
      </div>

      {/* Row 2 */}
      <div className="form-row" style={{ marginBottom: 'var(--margin-form-row)' }}>
        <div>
          <label style={labelStyle} htmlFor="contact_email">Work Email *</label>
          <input id="contact_email" name="contact_email" type="email" required placeholder="sarah@agency.org"
            value={fields.contact_email} onChange={handleChange} style={fieldStyle('contact_email')}
            onFocus={onFocus} onBlur={handleBlurField} className="demo-input" />
          <FieldError msg={errors.contact_email} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="contact_phone">Phone Number</label>
          <input id="contact_phone" name="contact_phone" type="tel" placeholder="+1 (720) 000-0000"
            value={fields.contact_phone} onChange={handleChange} style={fieldStyle('contact_phone')}
            onFocus={onFocus} onBlur={handleBlurField} className="demo-input" />
          <FieldError msg={errors.contact_phone} />
        </div>
      </div>

      {/* Row 3 */}
      <div className="form-row" style={{ marginBottom: 'var(--margin-form-row)' }}>
        <div>
          <label style={labelStyle} htmlFor="estimated_patients">Patient Volume *</label>
          <select id="estimated_patients" name="estimated_patients" required
            value={fields.estimated_patients} onChange={handleChange}
            style={{ ...fieldStyle('estimated_patients'), cursor: 'pointer', color: fields.estimated_patients ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}
            onFocus={onFocus} onBlur={handleBlurField} className="demo-select">
            <option value="" disabled>Select range</option>
            <option value="25">1 to 25 patients</option>
            <option value="50">26 to 50 patients</option>
            <option value="100">51 to 100 patients</option>
            <option value="250">101 to 250 patients</option>
            <option value="500">251 to 500 patients</option>
            <option value="1000">500+ patients</option>
          </select>
          <FieldError msg={errors.estimated_patients} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="demo_format">Demo Format</label>
          <select id="demo_format" name="demo_format"
            value={fields.demo_format} onChange={handleChange}
            style={{ ...inputStyle, cursor: 'pointer' }} onFocus={onFocus} onBlur={onBlur} className="demo-select">
            <option value="live">Live Video Call</option>
            <option value="screen_share">Screen Share Walkthrough</option>
            <option value="recorded">Send Me a Recording</option>
            <option value="sandbox">Sandbox Access</option>
          </select>
        </div>
      </div>

      {/* Row 4 */}
      <div className="form-row" style={{ marginBottom: 'clamp(20px, 4vw, 24px)' }}>
        <div>
          <label style={labelStyle} htmlFor="primary_challenge">Primary Challenge</label>
          <select id="primary_challenge" name="primary_challenge"
            value={fields.primary_challenge} onChange={handleChange}
            style={{ ...inputStyle, cursor: 'pointer', color: fields.primary_challenge ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}
            onFocus={onFocus} onBlur={onBlur} className="demo-select">
            <option value="">Select a topic</option>
            <option value="billing">Billing and Revenue Cycle</option>
            <option value="evv">EVV and Compliance</option>
            <option value="scheduling">Scheduling and Operations</option>
            <option value="clinical">Clinical Documentation</option>
            <option value="reporting">Reporting and Analytics</option>
            <option value="all">All of the Above</option>
          </select>
        </div>
        <div>
          <label style={labelStyle} htmlFor="preferred_demo_date">Preferred Date</label>
          <input id="preferred_demo_date" name="preferred_demo_date" type="date"
            value={fields.preferred_demo_date} onChange={handleChange}
            style={inputStyle} onFocus={onFocus} onBlur={onBlur} className="demo-input" />
        </div>
      </div>

      {/* reCAPTCHA */}
      <div className="recaptcha-wrapper">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={setRecaptchaToken}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        onClick={handleSubmit}
        className="demo-cta"
        style={{
          width: '100%', fontFamily: FI, fontWeight: 700, fontSize: 'var(--font-cta)',
          letterSpacing: '0.07em', textTransform: 'uppercase',
          padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px)', borderRadius: 'var(--radius-cta)',
          background: submitting ? '#15803d' : 'var(--color-text-green)',
          color: 'var(--color-text-white)', border: 'var(--border-cta)',
          boxShadow: submitting ? 'none' : 'var(--shadow-cta)',
          cursor: submitting ? 'not-allowed' : 'pointer',
          transition: 'var(--transition-cta)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(8px, 1.5vw, 10px)',
          boxSizing: 'border-box',
        }}
        onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-green)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-cta-hover)'; } }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-text-green)'; e.currentTarget.style.color = 'var(--color-text-white)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-cta)'; }}
      >
        {submitting ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'demo-spin 1s linear infinite' }}>
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.30)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="var(--color-text-white)" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            Sending Request...
          </>
        ) : (
          <>
            Request My Demo Session
            <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>

      <p style={{ fontFamily: FP, fontSize: 'var(--font-cta-small)', fontWeight: 500, color: 'var(--color-text-tertiary)', textAlign: 'center', marginTop: 'clamp(16px, 3vw, 18px)' }}>
        No commitment. No credit card. Responds within one business day.
      </p>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const DemoRequestPage = () => (
  <Layout>
    <DemoStyles />

    {/* ══ HERO ══ */}
    <section style={{ position: 'relative', minHeight: 'clamp(40vh, 52vw, 52vh)', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <img
        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000&h=800&crop=top"
        alt="RAAH Technologies demo"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', maxWidth: '100%' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--color-overlay)' }} aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--color-overlay-gradient)' }} aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} aria-hidden="true" />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: 'var(--padding-hero)' }}>
        <Reveal delay={0}>
          <Eyebrow label="Free 30-Minute Session" light />
        </Reveal>
        <Reveal delay={80}>
          <h1 style={{
            fontFamily: FI, fontWeight: 900,
            fontSize: 'var(--font-h1)',
            letterSpacing: '-0.03em', lineHeight: 1.05,
            color: 'var(--color-text-white)', marginBottom: 'clamp(20px, 4vw, 24px)',
            maxWidth: 'clamp(280px, 90vw, 900px)', margin: '0 auto clamp(20px, 4vw, 24px)',
          }}>
            See RAAH{' '}
            <span style={{ color: 'var(--color-text-green-light)' }}>in Action</span>{' '}
            for Your Agency
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p style={{
            fontFamily: FP, fontSize: 'clamp(0.9375rem, 1.6vw, 1.25rem)',
            fontWeight: 500, lineHeight: 1.75,
            color: 'var(--color-text-white-dim)',
            maxWidth: 'clamp(280px, 90vw, 620px)', margin: '0 auto clamp(32px, 5vw, 40px)',
          }}>
            A personalised, no-script walkthrough built around your state, payer mix, and agency size. Not a generic product tour.
          </p>
        </Reveal>
      </div>
    </section>

    <WaveDivider topColor="var(--color-overlay)" bottomColor="var(--color-bg-light)" />

    {/* ══ BODY ══ */}
    <section style={{ background: 'var(--color-bg-light)', padding: 'var(--padding-section)', position: 'relative', overflow: 'hidden' }}>
      <DotGrid />
      <RadialGlow top="-60px" right="-60px" size={500} opacity={0.07} />
      <RadialGlow bottom="-60px" left="-60px" size={380} opacity={0.05} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Top Row: Features (Left) + Form (Right) ── */}
        <div className="demo-top-row">
          <div className="demo-left-sticky">
            <Reveal delay={0}>
              <Eyebrow label="What You Will See" />
              <h2 style={{ fontFamily: FI, fontWeight: 900, fontSize: 'var(--font-h2)', letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--color-text-primary)', marginBottom: 'var(--margin-section-title)' }}>
                Built Around{' '}<span style={{ color: 'var(--color-text-green)' }}>Your Workflow</span>
              </h2>
              <p style={{ fontFamily: FP, fontSize: 'var(--font-input)', fontWeight: 500, color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: 'clamp(16px, 4vw, 32px)', maxWidth: 'clamp(280px, 90vw, 440px)' }}>
                Every demo is configured for your specific disciplines, state EVV requirements, and payer mix before the session begins.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--margin-feature-gap)' }}>
                <DemoFeatureItem icon={IconWalkthrough} title="Live Platform Walkthrough" body="See your exact workflows: scheduling, EVV clock-in, claim scrubbing, and 835 remittance — live, not slides." />
                <DemoFeatureItem icon={IconExperts} title="Direct Q&A with Specialists" body="Ask billing, compliance, or clinical questions to the specialist who configured your session." />
                <DemoFeatureItem icon={IconROI} title="Your ROI Projection" body="We model your agency's specific numbers: claim rejection rate, scheduling hours, and billing accuracy potential." />
                <DemoFeatureItem icon={IconSetup} title="Setup and Migration Plan" body="Walk away with a clear onboarding timeline. Most agencies are live within 24 hours of signing." />
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div style={{
              background: 'var(--color-bg-card)', borderRadius: 'var(--radius-card)',
              border: 'var(--border-card)',
              boxShadow: 'var(--shadow-card-lg)',
              overflow: 'hidden', width: 'var(--width-form)', boxSizing: 'border-box',
            }}>
              <div style={{ height: 'clamp(2px, 0.4vw, 3px)', background: 'var(--color-border-top-gradient)' }} />
              <DemoForm />
            </div>
          </Reveal>
        </div>

        {/* ── Bottom Row: Perfectly Aligned Cards ── */}
        <div className="cards-aligned-row">
          {/* LEFT CARD: Testimonial */}
          <Reveal delay={160}>
            <div style={{
              background: 'var(--color-bg-card)', borderRadius: 'var(--radius-card)',
              padding: 'var(--padding-card)',
              border: 'var(--border-card)',
              boxShadow: 'var(--shadow-card)',
              position: 'relative', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              height: '100%', boxSizing: 'border-box',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 'clamp(2px, 0.4vw, 3px)', background: 'var(--color-border-top)' }} />
              <div style={{ display: 'flex', gap: 'clamp(2px, 0.5vw, 3px)', marginBottom: 'clamp(12px, 2vw, 14px)' }}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="14" height="14" viewBox="0 0 16 16" fill="#f59e0b">
                    <path d="M8 1l1.854 3.756L14 5.528l-3 2.923.708 4.129L8 10.5l-3.708 2.08L5 8.451 2 5.528l4.146-.772z"/>
                  </svg>
                ))}
              </div>
              <p style={{ fontFamily: FP, fontStyle: 'italic', fontSize: 'var(--font-testimonial)', fontWeight: 400, color: '#1e293b', lineHeight: 1.75, marginBottom: 'clamp(16px, 3vw, 18px)', flexGrow: 1, wordBreak: 'break-word' }}>
                "RAAH transformed our billing process completely. We reduced claim rejections by 90% in the first month and our cash flow has never been stronger."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-card)', flexWrap: 'wrap', marginTop: 'auto' }}>
                <div style={{ width: 'clamp(36px, 7vw, 42px)', height: 'clamp(36px, 7vw, 42px)', borderRadius: '50%', background: 'linear-gradient(135deg, #16a34a 0%, #0d7a3e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: FI, fontWeight: 800, fontSize: 'clamp(0.72rem, 1.5vw, 0.8rem)', color: 'var(--color-text-white)' }}>SJ</span>
                </div>
                <div>
                  <p style={{ fontFamily: FI, fontWeight: 700, fontSize: 'var(--font-testimonial-name)', color: 'var(--color-text-primary)', lineHeight: 1.2 }}>Sarah Johnson</p>
                  <p style={{ fontFamily: FP, fontSize: 'var(--font-testimonial-role)', fontWeight: 500, color: 'var(--color-text-green)', lineHeight: 1.3 }}>Director of Operations, Caring Hands Home Health</p>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: 'var(--color-text-green-dark)', lineHeight: 1, letterSpacing: '-0.02em' }}>90%</p>
                  <p style={{ fontFamily: FP, fontSize: 'clamp(0.58rem, 1.2vw, 0.72rem)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Fewer Rejections</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT CARD: Trust Strip */}
          <Reveal delay={220}>
            <div style={{
              background: 'var(--color-bg-card)', borderRadius: 'clamp(12px, 2.5vw, 14px)',
              padding: 'var(--padding-card)',
              border: '1px solid rgba(22,163,74,0.12)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex', flexDirection: 'column',
              height: '100%', boxSizing: 'border-box',
            }}>
              <p style={{ fontFamily: FI, fontWeight: 700, fontSize: 'var(--font-trust)', color: 'var(--color-text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 'clamp(12px, 2vw, 18px)' }}>
                Trusted by agencies across 30 states
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-trust)', flexGrow: 1 }}>
                {[
                  'HIPAA-compliant platform — BAA included',
                  'No credit card required to book',
                  'Live in under 24 hours after signing',
                  '500+ agencies currently on RAAH',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(8px, 1.5vw, 10px)' }}>
                    <CheckSvg />
                    <span style={{ fontFamily: FP, fontSize: 'var(--font-trust-item)', fontWeight: 500, color: '#1e293b', lineHeight: 1.5, wordBreak: 'break-word' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>

    <WaveDivider topColor="var(--color-bg-light)" bottomColor="#0d7a3e" flip={true} />

    {/* ══ REASSURANCE STRIP ══ */}
    <section style={{
      background: 'var(--color-bg-dark)',
      padding: 'clamp(40px, 10vw, 80px) 0 clamp(48px, 12vw, 90px)', position: 'relative', overflow: 'hidden',
    }}>
      <DotGrid color="var(--color-dot-grid-dark)" />
      <RadialGlow top="-60px" right="-60px" size={400} opacity={0.14} />
      <RadialGlow bottom="-60px" left="-60px" size={320} opacity={0.10} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal delay={0}>
          <p style={{ fontFamily: FP, fontSize: 'var(--font-footer)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-white-dim)', textAlign: 'center', marginBottom: 'clamp(24px, 6vw, 48px)' }}>
            Every demo includes
          </p>
        </Reveal>

        <div className="strip-grid">
          {[
            { value: '30 min', label: 'Session Length', sub: 'No filler, no sales pitch' },
            { value: 'Zero', label: 'Commitment Required', sub: 'Walk away anytime' },
            { value: '< 24hr', label: 'Response Time', sub: 'From our team to yours' },
            { value: '1-on-1', label: 'Specialist Session', sub: 'Not a group webinar' },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60}>
              <div style={{ background: 'var(--color-bg-strip)', padding: 'var(--padding-strip)', textAlign: 'center', boxSizing: 'border-box' }}>
                <p style={{ fontFamily: FI, fontWeight: 900, fontSize: 'var(--font-strip-value)', letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--color-text-white)', marginBottom: 'clamp(6px, 1vw, 8px)' }}>{stat.value}</p>
                <p style={{ fontFamily: FI, fontWeight: 700, fontSize: 'var(--font-strip-label)', color: 'var(--color-text-white)', marginBottom: 'clamp(3px, 0.6vw, 4px)' }}>{stat.label}</p>
                <p style={{ fontFamily: FP, fontWeight: 400, fontSize: 'var(--font-strip-sub)', color: 'var(--color-text-white-dimmer)', letterSpacing: '0.04em' }}>{stat.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(24px, 6vw, 48px)' }}>
            <p style={{ fontFamily: FP, fontSize: 'clamp(0.78rem, 1.8vw, 0.9rem)', color: 'var(--color-text-white-dimmer)', marginBottom: 'clamp(14px, 2.5vw, 16px)' }}>
              Prefer to reach us directly?
            </p>
            <Link to="/contact" style={{
              fontFamily: FI, fontWeight: 700, fontSize: 'clamp(0.68rem, 1.5vw, 0.8125rem)', letterSpacing: '0.07em', textTransform: 'uppercase',
              padding: 'clamp(9px, 2vw, 12px) clamp(20px, 4vw, 28px)', borderRadius: 'var(--radius-cta)',
              background: 'transparent', color: 'var(--color-text-white)', border: 'clamp(1px, 0.2vw, 1.5px) solid rgba(255,255,255,0.45)',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 'clamp(6px, 1vw, 8px)', transition: 'var(--transition-cta)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.80)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; }}
            >
              Contact the Team
              <svg viewBox="0 0 12 12" fill="none" width="11" height="11">
                <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>

  </Layout>
);

export default DemoRequestPage;