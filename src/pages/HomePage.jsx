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
            ? 'linear-gradient(145deg, #1db954 0%, #16a34a 60%, #0d8a3e 100%)'
            : '#ffffff',
          borderRadius: '20px',
          padding: '0',
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          boxShadow: hovered
            ? '0 24px 64px rgba(5,46,22,0.28), 0 4px 16px rgba(22,163,74,0.20), inset 0 1px 0 rgba(74,222,128,0.15)'
            : '0 4px 20px rgba(5,46,22,0.08), 0 1px 4px rgba(5,46,22,0.04)',
          transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          cursor: 'default',
          border: '1px solid',
          borderColor: hovered ? 'rgba(74,222,128,0.30)' : 'rgba(22,163,74,0.14)',
          width: '100%',
          maxWidth: '420px',
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
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.06) 50%, transparent 80%)',
            transform: 'skewX(-15deg)',
            transition: 'left 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        {/* Top accent line — green on rest, mint on hover */}
        <div
          style={{
            height: '3px',
            background: hovered
              ? 'linear-gradient(to right, #4ade80, #86efac, #4ade80)'
              : 'linear-gradient(to right, #16a34a, #22c55e)',
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
              background: hovered ? '#ffffff' : 'rgba(22,163,74,0.07)',
              border: hovered ? '1.5px solid rgba(255,255,255,0.80)' : '1.5px solid rgba(22,163,74,0.20)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '28px',
              transition: 'all 0.35s ease',
              position: 'relative',
              margin: '0 auto 28px',
            }}
          >
            {/* Radial glow behind icon */}
            <div style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '26px',
              background: hovered
                ? 'radial-gradient(circle, rgba(74,222,128,0.20) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(22,163,74,0.10) 0%, transparent 70%)',
              pointerEvents: 'none',
              transition: 'background 0.4s ease',
            }} />
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
              color: hovered ? '#ffffff' : '#16a34a',
              marginBottom: '8px',
              transition: 'color 0.3s ease',
              textAlign: 'center',
            }}
          >
            {label}
          </p>

          {/* Title — RAAH brand green at rest, white on hover */}
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.375rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: hovered ? '#ffffff' : '#16a34a',
              marginBottom: '14px',
              lineHeight: 1.25,
              transition: 'color 0.3s ease',
              textAlign: 'center',
            }}
          >
            {title}
          </h3>

          {/* Description — near-black at rest, white on hover */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1rem',
              fontWeight: 400,
              lineHeight: 1.80,
              color: hovered ? '#ffffff' : '#1a1a1a',
              marginBottom: '28px',
              transition: 'color 0.3s ease',
              textAlign: 'center',
            }}
          >
            {desc}
          </p>

          {/* Metric */}
          <div
            style={{
              paddingTop: '20px',
              borderTop: `1px solid ${hovered ? 'rgba(255,255,255,0.25)' : 'rgba(22,163,74,0.15)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
                  : 'linear-gradient(to bottom, #16a34a, rgba(22,163,74,0.40))',
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
                  color: hovered ? '#ffffff' : '#0a6b30',
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
                  color: hovered ? '#ffffff' : '#16a34a',
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
          background: '#ffffff',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          boxShadow: hovered
            ? '0 20px 56px rgba(5,46,22,0.22), 0 4px 16px rgba(22,163,74,0.16)'
            : '0 4px 20px rgba(5,46,22,0.10)',
          transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          cursor: 'default',
          border: '1px solid',
          borderColor: hovered ? 'rgba(22,163,74,0.35)' : 'rgba(22,163,74,0.14)',
          width: '100%',
          maxWidth: '420px',
          margin: '0 auto',
        }}
      >
        {/* Top accent bar — hairline at rest, full sweep on hover */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '3px',
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

        <div style={{ padding: '36px 32px 32px', position: 'relative', zIndex: 1 }}>

          {/* Icon container — bounces on hover */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '18px',
              background: hovered ? 'rgba(22,163,74,0.08)' : 'rgba(22,163,74,0.06)',
              border: `1.5px solid ${hovered ? 'rgba(22,163,74,0.30)' : 'rgba(22,163,74,0.18)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '28px',
              transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              transform: hovered ? 'translateY(-4px) scale(1.06)' : 'translateY(0) scale(1)',
              position: 'relative',
              flexShrink: 0,
              margin: '0 auto 28px',
            }}
          >
            {/* Glow behind icon on hover */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '24px',
                background: hovered
                  ? 'radial-gradient(circle, rgba(22,163,74,0.14) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(22,163,74,0.04) 0%, transparent 70%)',
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
              color: '#16a34a',
              marginBottom: '8px',
              textAlign: 'center',
            }}
          >
            {label}
          </p>

          {/* Title — RAAH green, darkens slightly on hover */}
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.375rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: hovered ? '#0a6b30' : '#16a34a',
              marginBottom: '14px',
              lineHeight: 1.25,
              transition: 'color 0.3s ease',
              textAlign: 'center',
            }}
          >
            {title}
          </h3>

          {/* Description — near-black, deepens on hover */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1rem',
              fontWeight: 400,
              lineHeight: 1.80,
              color: hovered ? '#111111' : '#1a1a1a',
              marginBottom: '28px',
              transition: 'color 0.3s ease',
              textAlign: 'center',
            }}
          >
            {desc}
          </p>

          {/* Metric */}
          <div
            style={{
              paddingTop: '20px',
              borderTop: `1px solid ${hovered ? 'rgba(22,163,74,0.22)' : 'rgba(22,163,74,0.12)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              transition: 'all 0.35s ease',
            }}
          >
            {/* Accent bar — grows on hover */}
            <div
              style={{
                width: '4px',
                height: hovered ? '42px' : '36px',
                borderRadius: '999px',
                background: 'linear-gradient(to bottom, #16a34a, rgba(22,163,74,0.40))',
                flexShrink: 0,
                transition: 'height 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.625rem',
                  fontWeight: 900,
                  color: hovered ? '#052e16' : '#0a6b30',
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
                  color: '#16a34a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginTop: '3px',
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
        gap: '20px', 
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
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: hovered
              ? 'linear-gradient(135deg, #0d7a3e 0%, #16a34a 100%)'
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
              color: hovered ? '#ffffff' : '#16a34a',
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
              background: 'linear-gradient(to bottom, rgba(22,163,74,0.40), rgba(22,163,74,0.08))',
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
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '8px',
          }}
          className="sm:justify-start"
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
              color: hovered ? '#0a6b30' : '#0f172a',
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
  {
    quote: 'The implementation was seamless. Within 24 hours we were live, and within a week our team was more productive than ever. The support team is responsive and truly understands home health.',
    name: 'Lisa Thompson',
    role: 'Operations Manager',
    company: 'Premier Home Care',
    initials: 'LT',
    metric: '24hr',
    metricLabel: 'Go-Live Time',
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
        background: '#ffffff',
        borderRadius: '20px',
        padding: '40px 36px 32px',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: hovered ? 'rgba(22,163,74,0.25)' : 'rgba(22,163,74,0.10)',
        boxShadow: hovered
          ? '0 20px 60px rgba(5,46,22,0.12), 0 4px 16px rgba(22,163,74,0.08)'
          : '0 4px 24px rgba(5,46,22,0.10)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        opacity: visible ? 1 : 0,
        cursor: 'default',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
      }}
    >
      {/* Top green accent bar — slides in on hover */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '3px',
          background: 'linear-gradient(to right, #16a34a, #4ade80)',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          borderRadius: '20px 20px 0 0',
        }}
      />

      {/* Decorative quote mark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '24px',
          right: '28px',
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
      <div style={{ display: 'flex', gap: '3px', marginBottom: '20px', justifyContent: 'center' }}>
        {[1,2,3,4,5].map(s => (
          <svg key={s} width="16" height="16" viewBox="0 0 16 16" fill="#f59e0b">
            <path d="M8 1l1.854 3.756L14 5.528l-3 2.923.708 4.129L8 10.5l-3.708 2.08L5 8.451 2 5.528l4.146-.772z"/>
          </svg>
        ))}
      </div>

      {/* Quote text */}
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '0.9875rem',
          fontWeight: 400,
          lineHeight: 1.80,
          color: '#374151',
          marginBottom: '28px',
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
          height: '1px',
          background: hovered ? 'rgba(22,163,74,0.18)' : 'rgba(0,0,0,0.06)',
          marginBottom: '24px',
          transition: 'background 0.35s ease',
        }}
      />

      {/* Bottom row — avatar + name/role + metric */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>

        {/* Avatar + identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${t.color} 0%, #16a34a 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(5,46,22,0.20)',
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: '0.875rem',
                color: '#ffffff',
                letterSpacing: '0.02em',
              }}
            >
              {t.initials}
            </span>
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                color: '#0f172a',
                lineHeight: 1.2,
                marginBottom: '2px',
                textAlign: 'center',
              }}
            >
              {t.name}
            </p>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 400,
                color: '#16a34a',
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
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.25rem',
              fontWeight: 900,
              color: '#0a6b30',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            {t.metric}
          </p>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.65rem',
              fontWeight: 500,
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginTop: '2px',
              maxWidth: '90px',
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
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1); // 1=forward, -1=back
  const timerRef = useRef(null);

  const total = TESTIMONIALS.length;

  const goTo = (index, dir = 1) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setCurrent((index + total) % total);
    setTimeout(() => setIsAnimating(false), 550);
  };

  const prev = () => goTo(current - 1, -1);
  const next = () => goTo(current + 1, 1);

  // Auto-rotate through all testimonials
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIsAnimating(true);
      setCurrent(p => (p + 1) % total);
      setTimeout(() => setIsAnimating(false), 550);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [total]);

  // Calculate which testimonials to show
  const visibleA = current;
  const visibleB = (current + 1) % total;

  return (
    <section
      style={{
        background: '#dff0df',
        padding: 'clamp(60px, 10vw, 120px) 0 clamp(70px, 12vw, 140px)',
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
        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: stretch;
          justify-items: center;
        }
        @media (min-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
      {/* Dot grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(5,46,22,0.06) 1px, transparent 1px)',
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
          color: 'transparent',
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
      <div aria-hidden="true" style={{ position: 'absolute', top: '-60px', right: '-60px', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <Reveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>

            {/* Eyebrow */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
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
                Client Stories
              </span>
              <div style={{ width: '32px', height: '1.5px', background: '#16a34a', borderRadius: '999px' }} />
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
                maxWidth: '780px',
                margin: '0 auto 20px',
              }}
            >
              Trusted by{' '}
              <span style={{ color: '#16a34a' }}>Leading Agencies</span>
            </h2>

            {/* Sub */}
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
                fontWeight: 500,
                lineHeight: 1.75,
                color: '#374151',
                maxWidth: '560px',
                margin: '0 auto',
              }}
            >
              Real results from real agencies. No case studies, no composites. Just the words of operators who switched to RAAH.
            </p>

          </div>
        </Reveal>

        {/* Carousel Grid */}
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
                gap: '16px',
                marginTop: '48px',
                flexWrap: 'wrap',
              }}
            >
              {/* Prev */}
              <button
                onClick={prev}
                aria-label="Previous testimonials"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(22,163,74,0.30)',
                  background: 'transparent',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background   = '#052e16';
                  e.currentTarget.style.borderColor  = '#052e16';
                  e.currentTarget.style.color        = '#ffffff';
                  e.currentTarget.style.transform    = 'scale(1.1)';
                  e.currentTarget.style.boxShadow    = '0 4px 16px rgba(5,46,22,0.20)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background   = 'transparent';
                  e.currentTarget.style.borderColor  = 'rgba(22,163,74,0.30)';
                  e.currentTarget.style.color        = '#16a34a';
                  e.currentTarget.style.transform    = 'scale(1)';
                  e.currentTarget.style.boxShadow    = 'none';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Progress dots — active pip has a fill sweep animation */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > current ? 1 : -1)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    style={{
                      width: i === current ? '36px' : '8px',
                      height: '8px',
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
                      transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    {i === current && (
                      <span
                        key={current}
                        style={{
                          position: 'absolute',
                          top: 0, left: 0, bottom: 0,
                          borderRadius: '999px',
                          background: '#16a34a',
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
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(22,163,74,0.30)',
                  background: 'transparent',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background   = '#16a34a';
                  e.currentTarget.style.borderColor  = '#16a34a';
                  e.currentTarget.style.color        = '#ffffff';
                  e.currentTarget.style.transform    = 'scale(1.1)';
                  e.currentTarget.style.boxShadow    = '0 4px 16px rgba(22,163,74,0.28)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background   = 'transparent';
                  e.currentTarget.style.borderColor  = 'rgba(22,163,74,0.30)';
                  e.currentTarget.style.color        = '#16a34a';
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
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.78rem',
                fontWeight: 500,
                color: '#94a3b8',
                textAlign: 'center',
                marginTop: '16px',
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
          background: '#dff0df',
          padding: 'clamp(60px, 10vw, 120px) 0 clamp(70px, 12vw, 140px)',
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
            backgroundImage: 'radial-gradient(circle, rgba(5,46,22,0.06) 1px, transparent 1px)',
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
            color: 'transparent',
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
          <style>{`
            .features-grid {
              display: grid;
              gap: 24px;
              justify-items: center;
              grid-template-columns: 1fr;
            }
            @media (min-width: 640px) {
              .features-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (min-width: 1024px) {
              .features-grid { grid-template-columns: repeat(3, 1fr); }
            }
          `}</style>
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
                  e.currentTarget.style.background  = 'transparent';
                  e.currentTarget.style.color       = '#16a34a';
                  e.currentTarget.style.borderColor = '#16a34a';
                  e.currentTarget.style.transform   = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow   = 'none';
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
          background: '#dff0df',
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
          <style>{`
            .workflow-grid {
              display: grid;
              gap: 48px;
              align-items: stretch;
            }
            @media (min-width: 768px) {
              .workflow-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 80px;
              }
            }
          `}</style>
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
                    minHeight: 'clamp(280px, 40vw, 520px)',
                  }}
                >
                  <img
                    src="assets\workflow home page.jpeg"
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

                {/* ✅ Floating stat card — FIXED: responsive positioning to prevent overflow */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 'clamp(-12px, -2vw, -28px)',
                    right: 'clamp(8px, 2vw, -28px)',
                    left: 'clamp(8px, auto, auto)',
                    zIndex: 10,
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    boxShadow: '0 20px 60px rgba(5,46,22,0.16), 0 4px 16px rgba(5,46,22,0.08)',
                    border: '1px solid rgba(22,163,74,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    maxWidth: '280px',
                    width: 'calc(100% - 16px)',
                    boxSizing: 'border-box',
                  }}
                  className="hidden lg:flex"
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #0d7a3e 0%, #16a34a 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <BarChart3 style={{ color: '#4ade80', width: '18px', height: '18px' }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.62rem',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#16a34a',
                        marginBottom: '2px',
                        lineHeight: 1.2,
                      }}
                    >
                      Operational Efficiency
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1.5rem',
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
                    background: 'linear-gradient(135deg, #0d7a3e 0%, #16a34a 100%)',
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
                    margin: '0 auto 44px',
                    textAlign: 'center',
                  }}
                  className="md:text-left md:ml-0"
                >
                  One connected platform unifies every workflow from first referral to final payment, cutting administrative overhead so your team can focus entirely on delivering care.
                </p>

                {/* Steps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0', maxWidth: '520px', margin: '0 auto' }} className="md:ml-0">
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
                <div style={{ marginTop: '48px', textAlign: 'center' }} className="md:text-left">
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
                      e.currentTarget.style.background  = 'transparent';
                      e.currentTarget.style.color       = '#16a34a';
                      e.currentTarget.style.borderColor = '#16a34a';
                      e.currentTarget.style.transform   = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow   = 'none';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background  = '#16a34a';
                      e.currentTarget.style.color       = '#ffffff';
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
          background: 'linear-gradient(160deg, #0d7a3e 0%, #16a34a 55%, #0d7a3e 100%)',
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
            backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.10) 1px, transparent 1px)',
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
            color: 'rgba(255,255,255,0.055)',
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
                <div style={{ width: '32px', height: '1.5px', background: '#ffffff', borderRadius: '999px' }} />
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                  }}
                >
                  Caregiver Tools
                </span>
                <div style={{ width: '32px', height: '1.5px', background: '#ffffff', borderRadius: '999px' }} />
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
                <span style={{ color: '#ffffff', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.40)', textUnderlineOffset: '6px' }}>Caregivers</span>
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
          <style>{`
            .caregiver-grid {
              display: grid;
              gap: 24px;
              justify-items: center;
              grid-template-columns: 1fr;
            }
            @media (min-width: 640px) {
              .caregiver-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (min-width: 1024px) {
              .caregiver-grid { grid-template-columns: repeat(3, 1fr); }
            }
          `}</style>
          <div className="caregiver-grid">
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

      {/* ══════════════════════════════════════════════════════════════
          TESTIMONIALS — Trusted by Leading Agencies
          White section, consistent with Why Choose Us + Workflow.
          Auto-sliding carousel: 8 testimonials, 2 visible desktop,
          1 mobile. Progress dots + prev/next.
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
          background: '#dff0df',
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
            backgroundImage: 'radial-gradient(circle, rgba(5,46,22,0.06) 1px, transparent 1px)',
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
            color: 'transparent',
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
            top: '-100px', right: '-100px',
            width: '600px', height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        {/* Radial glow — bottom left */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-100px', left: '-100px',
            width: '500px', height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

          {/* Eyebrow */}
          <Reveal delay={0}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
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
                Get Started
              </span>
              <div style={{ width: '32px', height: '1.5px', background: '#16a34a', borderRadius: '999px' }} />
            </div>
          </Reveal>

          {/* Heading */}
          <Reveal delay={80}>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                color: '#0f172a',
                marginBottom: '20px',
                maxWidth: '820px',
                margin: '0 auto 20px',
              }}
            >
              Ready to{' '}
              <span style={{ color: '#16a34a' }}>Transform</span>{' '}
              Your Agency?
            </h2>
          </Reveal>

          {/* Body */}
          <Reveal delay={150}>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
                fontWeight: 500,
                lineHeight: 1.75,
                color: '#374151',
                maxWidth: '580px',
                margin: '0 auto 64px',
              }}
            >
              Book a personalised demo today. See exactly how RAAH solves your specific challenges with no commitment required.
            </p>
          </Reveal>

          {/* Stat callouts — social proof at the decision moment */}
          <Reveal delay={220}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth: '720px',
              margin: '0 auto clamp(32px, 6vw, 48px)', // ✅ Improved responsive spacing
            }}>
              {[
                { value: '99.2%', label: 'Billing Accuracy' },
                { value: '90%',   label: 'Fewer Claim Rejections' },
                { value: '< 5min', label: 'Visit Documentation' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: 'clamp(20px, 4vw, 32px) clamp(12px, 2vw, 20px)',
                    borderRight: i < 2 ? '2px solid #16a34a' : 'none',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 900,
                      fontSize: 'clamp(1.25rem, 4vw, 2.25rem)',
                      letterSpacing: '-0.03em',
                      color: '#0a6b30',
                      lineHeight: 1,
                      marginBottom: '8px',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 'clamp(0.65rem, 1.5vw, 0.85rem)',
                      fontWeight: 600,
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
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
                gap: '16px',
              }}
              className="sm:flex-row sm:justify-center"
            >
              {/* Primary — Schedule Demo */}
              <Link
                to="/demo"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  padding: '18px 44px',
                  borderRadius: '999px',
                  background: '#16a34a',
                  color: '#ffffff',
                  border: '2px solid #16a34a',
                  boxShadow: '0 8px 32px rgba(22,163,74,0.40)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = 'transparent';
                  e.currentTarget.style.color       = '#16a34a';
                  e.currentTarget.style.borderColor = '#16a34a';
                  e.currentTarget.style.transform   = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow   = 'none';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = '#16a34a';
                  e.currentTarget.style.color       = '#ffffff';
                  e.currentTarget.style.borderColor = '#16a34a';
                  e.currentTarget.style.transform   = 'translateY(0)';
                  e.currentTarget.style.boxShadow   = '0 8px 32px rgba(22,163,74,0.35)';
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
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  padding: '18px 44px',
                  borderRadius: '999px',
                  background: 'transparent',
                  color: '#16a34a',
                  border: '2px solid #16a34a',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = '#16a34a';
                  e.currentTarget.style.borderColor = '#16a34a';
                  e.currentTarget.style.color       = '#ffffff';
                  e.currentTarget.style.transform   = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'transparent';
                  e.currentTarget.style.borderColor = '#16a34a';
                  e.currentTarget.style.color       = '#16a34a';
                  e.currentTarget.style.transform   = 'translateY(0)';
                }}
              >
                Talk to Sales
              </Link>
            </div>

            {/* No-commitment reassurance */}
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 400,
                color: '#16a34a',
                marginTop: '24px',
                letterSpacing: '0.04em',
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