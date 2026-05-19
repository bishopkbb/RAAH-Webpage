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
import { ArrowRight, BarChart3, Users } from 'lucide-react';
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

// ─── Bespoke SVG Icons ────────────────────────────────────────────────────────
// Each is a geometric brand-mark — not stock icons.
// Designed on a 48×48 viewBox with 2px stroke, no fill unless specified.

const IconShield = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
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
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
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
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
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
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
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
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
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
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
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
// Green background, white text. Hover: lifts, glows, reveals metric + shimmer.
const FeatureCard = ({ feature, delay }) => {
  const [hovered, setHovered] = useState(false);
  const { Icon, label, title, desc, metric, metricLabel } = feature;

  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          // Green card — deep on rest, brightens on hover
          background: hovered
            ? 'linear-gradient(145deg, #15803d 0%, #166534 60%, #14532d 100%)'
            : 'linear-gradient(145deg, #166534 0%, #14532d 60%, #052e16 100%)',
          borderRadius: '20px',
          padding: '0',
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          // Outer glow deepens on hover
          boxShadow: hovered
            ? '0 24px 64px rgba(5,46,22,0.28), 0 4px 16px rgba(22,163,74,0.20), inset 0 1px 0 rgba(74,222,128,0.15)'
            : '0 4px 20px rgba(5,46,22,0.12), inset 0 1px 0 rgba(74,222,128,0.08)',
          transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          cursor: 'default',
          border: '1px solid',
          borderColor: hovered ? 'rgba(74,222,128,0.30)' : 'rgba(74,222,128,0.12)',
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
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.06) 50%, transparent 80%)',
            transform: 'skewX(-15deg)',
            transition: 'left 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        {/* Top mint line — always visible, brightens on hover */}
        <div
          style={{
            height: '2px',
            background: hovered
              ? 'linear-gradient(to right, #4ade80, #86efac, #4ade80)'
              : 'linear-gradient(to right, rgba(74,222,128,0.40), rgba(74,222,128,0.15))',
            transition: 'background 0.4s ease',
          }}
        />

        <div style={{ padding: '36px 32px 32px', position: 'relative', zIndex: 1 }}>

          {/* Icon container */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '18px',
              background: '#ffffff',
              border: '1.5px solid rgba(22,163,74,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '28px',
              transition: 'all 0.35s ease',
              position: 'relative',
            }}
          >
            {/* Radial glow behind icon — always on, brightens on hover */}
            <div style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '26px',
              background: hovered
                ? 'radial-gradient(circle, rgba(74,222,128,0.20) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
              transition: 'background 0.4s ease',
            }} />
            {/* Re-colour SVG strokes for white-on-green context */}
            <div style={{ filter: 'none' }}>
              <Icon />
            </div>
          </div>

          {/* Label */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: hovered ? '#86efac' : '#4ade80',
              marginBottom: '8px',
              transition: 'color 0.3s ease',
            }}
          >
            {label}
          </p>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.375rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '14px',
              lineHeight: 1.25,
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1rem',
              fontWeight: 400,
              lineHeight: 1.80,
              color: hovered ? '#ffffff' : 'rgba(255,255,255,0.88)',
              marginBottom: '28px',
              transition: 'color 0.3s ease',
            }}
          >
            {desc}
          </p>

          {/* Metric — always visible, pops on hover */}
          <div
            style={{
              paddingTop: '20px',
              borderTop: `1px solid ${hovered ? 'rgba(74,222,128,0.25)' : 'rgba(74,222,128,0.12)'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              transition: 'all 0.35s ease',
            }}
          >
            {/* Accent bar */}
            <div
              style={{
                width: '4px',
                height: '36px',
                borderRadius: '999px',
                background: hovered
                  ? 'linear-gradient(to bottom, #86efac, #4ade80)'
                  : 'linear-gradient(to bottom, #4ade80, rgba(74,222,128,0.40))',
                flexShrink: 0,
                transition: 'background 0.35s ease',
              }}
            />
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.625rem',
                  fontWeight: 900,
                  color: hovered ? '#ffffff' : 'rgba(255,255,255,0.90)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  transition: 'color 0.3s ease',
                }}
              >
                {metric}
              </p>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  color: hovered ? '#86efac' : 'rgba(74,222,128,0.65)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginTop: '3px',
                  transition: 'color 0.3s ease',
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
// Identical architecture to FeatureCard — dark green bg, white icon container,
// green icons, shimmer sweep, lift + glow on hover, metric stat always visible.
// Sits on the brand-green section so the gradient is slightly lighter than the
// Why Choose Us cards to create depth against the dark background.
const CaregiverCard = ({ item, delay }) => {
  const [hovered, setHovered] = useState(false);
  const { label, title, desc, metric, metricLabel, icon } = item;

  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered
            ? 'linear-gradient(145deg, #166534 0%, #14532d 60%, #052e16 100%)'
            : 'linear-gradient(145deg, #14532d 0%, #052e16 60%, #031a0e 100%)',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          boxShadow: hovered
            ? '0 24px 64px rgba(0,0,0,0.40), 0 4px 16px rgba(22,163,74,0.18), inset 0 1px 0 rgba(74,222,128,0.15)'
            : '0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(74,222,128,0.06)',
          transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          cursor: 'default',
          border: '1px solid',
          borderColor: hovered ? 'rgba(74,222,128,0.28)' : 'rgba(74,222,128,0.10)',
        }}
      >
        {/* Shimmer sweep on hover */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: hovered ? '120%' : '-60%',
            width: '50%',
            height: '100%',
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.05) 50%, transparent 80%)',
            transform: 'skewX(-15deg)',
            transition: 'left 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
            pointerEvents: 'none',
          }}
        />

        {/* Top mint accent line */}
        <div
          style={{
            height: '2px',
            background: hovered
              ? 'linear-gradient(to right, #4ade80, #86efac, #4ade80)'
              : 'linear-gradient(to right, rgba(74,222,128,0.35), rgba(74,222,128,0.10))',
            transition: 'background 0.4s ease',
          }}
        />

        <div style={{ padding: '36px 32px 32px', position: 'relative', zIndex: 1 }}>

          {/* Icon container — white bg, green icon, glow on hover */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '18px',
              background: '#ffffff',
              border: `1.5px solid ${hovered ? 'rgba(22,163,74,0.35)' : 'rgba(22,163,74,0.20)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '28px',
              transition: 'all 0.35s ease',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: '26px',
                background: hovered
                  ? 'radial-gradient(circle, rgba(74,222,128,0.18) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
                transition: 'background 0.4s ease',
              }}
            />
            {icon}
          </div>

          {/* Label */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: hovered ? '#86efac' : '#4ade80',
              marginBottom: '8px',
              transition: 'color 0.3s ease',
            }}
          >
            {label}
          </p>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.375rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '14px',
              lineHeight: 1.25,
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1rem',
              fontWeight: 400,
              lineHeight: 1.80,
              color: hovered ? '#ffffff' : 'rgba(255,255,255,0.82)',
              marginBottom: '28px',
              transition: 'color 0.3s ease',
            }}
          >
            {desc}
          </p>

          {/* Metric */}
          <div
            style={{
              paddingTop: '20px',
              borderTop: `1px solid ${hovered ? 'rgba(74,222,128,0.22)' : 'rgba(74,222,128,0.10)'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              transition: 'all 0.35s ease',
            }}
          >
            <div
              style={{
                width: '4px',
                height: '36px',
                borderRadius: '999px',
                background: hovered
                  ? 'linear-gradient(to bottom, #86efac, #4ade80)'
                  : 'linear-gradient(to bottom, #4ade80, rgba(74,222,128,0.35))',
                flexShrink: 0,
                transition: 'background 0.35s ease',
              }}
            />
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.625rem',
                  fontWeight: 900,
                  color: hovered ? '#ffffff' : 'rgba(255,255,255,0.90)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  transition: 'color 0.3s ease',
                }}
              >
                {metric}
              </p>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  color: hovered ? '#86efac' : 'rgba(74,222,128,0.60)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginTop: '3px',
                  transition: 'color 0.3s ease',
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
      style={{ display: 'flex', gap: '20px', position: 'relative' }}
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
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: hovered
              ? 'linear-gradient(135deg, #052e16 0%, #166534 100%)'
              : '#ffffff',
            border: `2px solid ${hovered ? '#16a34a' : 'rgba(22,163,74,0.25)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: hovered
              ? '0 8px 24px rgba(5,46,22,0.20)'
              : '0 2px 8px rgba(5,46,22,0.06)',
            transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 900,
              letterSpacing: '0.06em',
              color: hovered ? '#4ade80' : '#16a34a',
              transition: 'color 0.3s ease',
            }}
          >
            {step.number}
          </span>
        </div>

        {/* Connector line — hidden on last step */}
        {!isLast && (
          <div
            style={{
              width: '2px',
              flexGrow: 1,
              minHeight: '40px',
              background: 'linear-gradient(to bottom, rgba(22,163,74,0.25), rgba(22,163,74,0.05))',
              borderRadius: '999px',
              margin: '6px 0',
            }}
          />
        )}
      </div>

      {/* Right: text content */}
      <div style={{ paddingTop: '10px', paddingBottom: isLast ? '0' : '36px' }}>

        {/* Icon + title row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '8px',
          }}
        >
          {/* Small inline icon */}
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
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
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: '1.375rem',
              letterSpacing: '-0.02em',
              color: hovered ? '#052e16' : '#0f172a',
              lineHeight: 1.2,
              transition: 'color 0.3s ease',
            }}
          >
            {step.title}
          </h4>
        </div>

        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.75,
            color: '#475569',
          }}
        >
          {step.text}
        </p>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const HomePage = () => {
  const [sectionRef] = useInView(0.1);

  return (
    <Layout hideNav>

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
          background: '#ffffff',
          padding: '120px 0 140px',
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
            backgroundImage: 'radial-gradient(circle, rgba(5,46,22,0.04) 1px, transparent 1px)',
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
            fontSize: 'clamp(80px, 14vw, 180px)',
            color: 'rgba(5,46,22,0.03)',
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
            top: '-60px',
            right: '-60px',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        {/* Green radial glow — bottom left corner */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>

          {/* Section header */}
          <Reveal delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>

              {/* Eyebrow */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                }}
              >
                {/* Decorative line */}
                <div style={{ width: '32px', height: '1.5px', background: '#16a34a', borderRadius: '999px' }} />
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#16a34a',
                  }}
                >
                  Why Choose Us
                </span>
                <div style={{ width: '32px', height: '1.5px', background: '#16a34a', borderRadius: '999px' }} />
              </div>

              {/* Main heading */}
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.08,
                  color: '#0f172a',
                  marginBottom: '20px',
                  maxWidth: '780px',
                  margin: '0 auto 20px',
                }}
              >
                The Platform Built{' '}
                <span style={{ color: '#16a34a' }}>Exclusively</span>{' '}
                for Home Health
              </h2>

              {/* Sub heading */}
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(1.25rem, 2vw, 1.55rem)',
                  fontWeight: 500,
                  lineHeight: 1.75,
                  color: '#374151',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                Six pillars. One platform. Everything your agency needs to operate at the highest level, and nothing you don't.
              </p>

            </div>
          </Reveal>

          {/* Cards grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              alignItems: 'stretch',
            }}
          >
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
                marginTop: '72px',
              }}
            >
              <Link
                to="/demo"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  padding: '16px 40px',
                  borderRadius: '999px',
                  background: '#16a34a',
                  color: '#ffffff',
                  border: '2px solid #16a34a',
                  boxShadow: '0 6px 32px rgba(22,163,74,0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.22s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = '#052e16';
                  e.currentTarget.style.color       = '#ffffff';
                  e.currentTarget.style.borderColor = '#052e16';
                  e.currentTarget.style.transform   = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow   = '0 10px 40px rgba(5,46,22,0.30)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = '#16a34a';
                  e.currentTarget.style.color       = '#ffffff';
                  e.currentTarget.style.borderColor = '#16a34a';
                  e.currentTarget.style.transform   = 'translateY(0)';
                  e.currentTarget.style.boxShadow   = '0 6px 32px rgba(22,163,74,0.30)';
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
          background: '#ffffff',
          padding: '130px 0',
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
            backgroundImage: 'radial-gradient(circle, rgba(5,46,22,0.03) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
          }}
        />

        {/* Decorative green arc — right side */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-180px',
            width: '560px',
            height: '560px',
            borderRadius: '50%',
            border: '1.5px solid rgba(22,163,74,0.08)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-120px',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            border: '1px solid rgba(22,163,74,0.05)',
            pointerEvents: 'none',
          }}
        />

        {/* Bottom-left glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '80px',
              alignItems: 'stretch',
            }}
            className="grid-cols-1 md:grid-cols-2"
          >

            {/* ── LEFT — Image ── */}
            <Reveal delay={0} className="order-2 md:order-1">
              <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>

                {/* Large decorative ring behind image */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-24px',
                    left: '-24px',
                    right: '24px',
                    bottom: '24px',
                    borderRadius: '24px',
                    border: '1.5px solid rgba(22,163,74,0.15)',
                    zIndex: 0,
                  }}
                />

                {/* Main image — fills full column, blends seamlessly */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 32px 80px rgba(5,46,22,0.14), 0 8px 24px rgba(5,46,22,0.08)',
                    height: '100%',
                    minHeight: '520px',
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
                      background: 'linear-gradient(to right, rgba(255,255,255,0.18) 0%, transparent 30%, transparent 70%, rgba(5,46,22,0.06) 100%)',
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
                      height: '80px',
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Floating stat card — bottom right */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-28px',
                    right: '-28px',
                    zIndex: 10,
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    boxShadow: '0 20px 60px rgba(5,46,22,0.16), 0 4px 16px rgba(5,46,22,0.08)',
                    border: '1px solid rgba(22,163,74,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                  className="hidden lg:flex"
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #052e16 0%, #166534 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <BarChart3 style={{ color: '#4ade80', width: '22px', height: '22px' }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#16a34a',
                        marginBottom: '2px',
                      }}
                    >
                      Operational Efficiency
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1.75rem',
                        fontWeight: 900,
                        color: '#0f172a',
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
                    top: '-20px',
                    left: '-20px',
                    zIndex: 10,
                    background: 'linear-gradient(135deg, #052e16 0%, #14532d 100%)',
                    borderRadius: '999px',
                    padding: '10px 18px',
                    boxShadow: '0 8px 24px rgba(5,46,22,0.30)',
                    border: '1px solid rgba(74,222,128,0.20)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  className="hidden lg:flex"
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#4ade80',
                      display: 'inline-block',
                      flexShrink: 0,
                      boxShadow: '0 0 8px rgba(74,222,128,0.60)',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: '#ffffff',
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
                    gap: '10px',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '1.5px',
                      background: '#16a34a',
                      borderRadius: '999px',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#16a34a',
                    }}
                  >
                    Workflow
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '1.5px',
                      background: '#16a34a',
                      borderRadius: '999px',
                    }}
                  />
                </div>

                {/* Heading */}
                <h2
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.08,
                    color: '#0f172a',
                    marginBottom: '20px',
                  }}
                >
                  Simplified Operations{' '}
                  <span style={{ color: '#16a34a' }}>from Intake</span>{' '}
                  to Billing
                </h2>

                {/* Body */}
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
                    fontWeight: 500,
                    lineHeight: 1.8,
                    color: '#374151',
                    marginBottom: '44px',
                    maxWidth: '520px',
                  }}
                >
                  One connected platform unifies every workflow from first referral to final payment, cutting administrative overhead so your team can focus entirely on delivering care.
                </p>

                {/* Steps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {[
                    {
                      number: '01',
                      title: 'Smart Scheduling',
                      text: 'Drag-and-drop visit builder with automatic conflict detection, caregiver skill-matching, and drive-time optimisation.',
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
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
                        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
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
                        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
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
                <div style={{ marginTop: '48px' }}>
                  <Link
                    to="/demo"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      padding: '15px 36px',
                      borderRadius: '999px',
                      background: '#16a34a',
                      color: '#ffffff',
                      border: '2px solid #16a34a',
                      boxShadow: '0 6px 32px rgba(22,163,74,0.35)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      textDecoration: 'none',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background  = '#052e16';
                      e.currentTarget.style.borderColor = '#052e16';
                      e.currentTarget.style.transform   = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow   = '0 10px 40px rgba(5,46,22,0.30)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background  = '#16a34a';
                      e.currentTarget.style.borderColor = '#16a34a';
                      e.currentTarget.style.transform   = 'translateY(0)';
                      e.currentTarget.style.boxShadow   = '0 6px 32px rgba(22,163,74,0.35)';
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
          background: 'linear-gradient(160deg, #052e16 0%, #064e3b 55%, #052e16 100%)',
          padding: '120px 0 140px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid — same as Why Choose Us */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.06) 1px, transparent 1px)',
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
            fontSize: 'clamp(80px, 14vw, 180px)',
            color: 'rgba(255,255,255,0.025)',
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
            top: '-80px',
            right: '-80px',
            width: '500px',
            height: '500px',
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
            bottom: '-80px',
            left: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(22,163,74,0.10) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>

          {/* ── Section header ── */}
          <Reveal delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>

              {/* Eyebrow — double dash, matches WCU + Workflow */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ width: '32px', height: '1.5px', background: '#4ade80', borderRadius: '999px' }} />
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#4ade80',
                  }}
                >
                  Caregiver Tools
                </span>
                <div style={{ width: '32px', height: '1.5px', background: '#4ade80', borderRadius: '999px' }} />
              </div>

              {/* Heading — exact WCU size */}
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.08,
                  color: '#ffffff',
                  marginBottom: '20px',
                  maxWidth: '780px',
                  margin: '0 auto 20px',
                }}
              >
                Empower Your{' '}
                <span style={{ color: '#4ade80' }}>Caregivers</span>
              </h2>

              {/* Body — exact WCU subheading size/weight/colour on dark bg */}
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
                  fontWeight: 500,
                  lineHeight: 1.75,
                  color: '#ffffff',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                Your field staff get everything they need to focus on patients, not paperwork, even in areas without internet connection.
              </p>

            </div>
          </Reveal>

          {/* ── Cards grid ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              alignItems: 'stretch',
            }}
          >
            {[
              {
                label: 'Connectivity',
                title: 'Offline Mode',
                desc: 'Document visits, vitals, and notes in full in any remote area. Everything syncs the moment connectivity is restored.',
                metric: '100%',
                metricLabel: 'Uptime Regardless of Signal',
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
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
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
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
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
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

      {/* ── 4. Testimonials ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-in-up" className="text-center mb-16">
            <h2 className="section-title">Trusted by Leading Agencies</h2>
            <div className="section-divider" />
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                quote: '"RAAH Technologies transformed our billing process. We reduced claim rejections by 90% in the first month and our cash flow has never been better. The support team is incredible."',
                name: 'Sarah Johnson',
                role: 'Director, Caring Hands Home Health',
                initials: 'SJ',
                animation: 'slide-in-left',
              },
              {
                quote: '"The mobile app is incredibly easy for our caregivers to use. Training took almost no time at all, and compliance issues have virtually disappeared. Highly recommended!"',
                name: 'Michael Chen',
                role: 'Owner, BrightPath Services',
                initials: 'MC',
                animation: 'slide-in-right',
              },
            ].map((t, i) => (
              <AnimatedSection key={i} animation={t.animation}>
                <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all relative">
                  <div className="absolute top-8 right-8 text-green-100">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                    </svg>
                  </div>
                  <div className="flex gap-1 text-yellow-400 mb-6">
                    {[1,2,3,4,5].map(s => <span key={s} className="text-xl">★</span>)}
                  </div>
                  <p style={{ fontFamily: "'Poppins', sans-serif" }} className="text-gray-700 italic mb-8 text-lg leading-relaxed">{t.quote}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                      {t.initials}
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }} className="text-gray-900 text-lg">{t.name}</p>
                      <p style={{ fontFamily: "'Poppins', sans-serif" }} className="text-green-600">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA Section ── */}
      <section className="py-28 bg-green-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-300 via-green-500 to-green-300" />
        <div className="container-custom relative z-10 text-center">
          <AnimatedSection animation="zoom-in">
            <h2
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900 }}
              className="text-4xl md:text-5xl text-gray-900 mb-8 leading-tight"
            >
              Ready to Transform Your Agency?
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif" }} className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Get started with a personalised demo today. See exactly how RAAH can solve your specific challenges. No commitment required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/demo" className="btn-primary text-xl px-12 py-5 shadow-2xl">
                Schedule Demo <Users size={20} />
              </Link>
              <Link to="/contact" className="btn-secondary text-xl px-12 py-5 border-2">
                Contact Sales
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </Layout>
  );
};

export default HomePage;