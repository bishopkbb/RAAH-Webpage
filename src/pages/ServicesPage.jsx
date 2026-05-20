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
 *   1. Hero              — dark green overlay on image
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
const DotGrid = ({ color = 'rgba(5,46,22,0.08)' }) => (
  <div aria-hidden="true" style={{
    position: 'absolute', inset: 0,
    backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
    backgroundSize: '32px 32px', pointerEvents: 'none',
  }} />
);

const Watermark = ({ color = 'rgba(5,46,22,0.06)' }) => (
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
    <div style={{ width: '32px', height: '1.5px', background: light ? '#4ade80' : '#16a34a', borderRadius: '999px' }} />
    <span style={{ fontFamily: FP, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: light ? '#4ade80' : '#16a34a' }}>
      {label}
    </span>
    <div style={{ width: '32px', height: '1.5px', background: light ? '#4ade80' : '#16a34a', borderRadius: '999px' }} />
  </div>
);

const WaveDivider = ({ topColor, bottomColor, flip = false }) => (
  <div style={{ position: 'relative', height: '80px', overflow: 'hidden', background: topColor, marginBottom: '-1px' }}>
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{
      position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%',
      transform: flip ? 'scaleX(-1)' : 'none',
    }}>
      <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill={bottomColor} />
    </svg>
  </div>
);

// ─── Bespoke SVG icons ────────────────────────────────────────────────────────

const IconScheduling = () => (
  <svg viewBox="0 0 48 48" fill="none" width="42" height="42">
    <rect x="6" y="10" width="36" height="32" rx="4" fill="rgba(22,163,74,0.10)" stroke="#16a34a" strokeWidth="1.5"/>
    <rect x="6" y="10" width="36" height="10" rx="4" fill="rgba(22,163,74,0.20)" stroke="#16a34a" strokeWidth="1.5"/>
    <line x1="16" y1="6" x2="16" y2="14" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="32" y1="6" x2="32" y2="14" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
    {[[14,26],[20,26],[26,26],[32,26],[38,26],[14,32],[20,32],[26,32],[32,32],[14,38],[20,38]].map(([cx,cy]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" fill="#16a34a" opacity="0.5"/>
    ))}
    <circle cx="32" cy="32" r="6" fill="#16a34a"/>
    <path d="M29.5 32L31.5 34L34.5 30" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M34 26L38 28L34 30" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
  </svg>
);

const IconMobileApp = () => (
  <svg viewBox="0 0 48 48" fill="none" width="42" height="42">
    <rect x="13" y="3" width="22" height="42" rx="4" fill="rgba(22,163,74,0.10)" stroke="#16a34a" strokeWidth="1.5"/>
    <rect x="16" y="10" width="16" height="22" rx="2" fill="rgba(22,163,74,0.12)" stroke="#16a34a" strokeWidth="1"/>
    <circle cx="24" cy="40" r="2" fill="#16a34a"/>
    <path d="M18 3H30" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    <path d="M19 16L22 19L28 13" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="36" cy="12" r="6" fill="#052e16" stroke="#16a34a" strokeWidth="1.5"/>
    <path d="M33.5 12L35.5 14L38.5 10" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 24H28" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    <path d="M20 28H26" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.25"/>
  </svg>
);

const IconBilling = () => (
  <svg viewBox="0 0 48 48" fill="none" width="42" height="42">
    <path d="M10 6H32L42 16V42H10V6Z" fill="rgba(22,163,74,0.10)" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M32 6V16H42" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M24 16V18M24 30V32M21 19.5C21 18.12 22.34 17 24 17C25.66 17 27 18.12 27 19.5C27 20.88 25.66 22 24 22C22.34 22 21 23.12 21 24.5C21 25.88 22.34 27 24 27C25.66 27 27 25.88 27 24.5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
    <line x1="16" y1="34" x2="32" y2="34" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <line x1="16" y1="38" x2="28" y2="38" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
    <circle cx="38" cy="38" r="6" fill="#052e16" stroke="#16a34a" strokeWidth="1.5"/>
    <path d="M35 38L37 40L41 36" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconClinical = () => (
  <svg viewBox="0 0 48 48" fill="none" width="42" height="42">
    <rect x="8" y="4" width="32" height="40" rx="4" fill="rgba(22,163,74,0.10)" stroke="#16a34a" strokeWidth="1.5"/>
    <path d="M18 4V10H30V4" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
    <rect x="20" y="6" width="8" height="3" rx="1" fill="#16a34a" opacity="0.4"/>
    <line x1="16" y1="18" x2="32" y2="18" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <line x1="16" y1="24" x2="32" y2="24" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <line x1="16" y1="30" x2="26" y2="30" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <circle cx="34" cy="36" r="8" fill="#052e16" stroke="#16a34a" strokeWidth="1.5"/>
    <path d="M34 32V36H38" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="34" cy="36" r="1.5" fill="#4ade80"/>
  </svg>
);

const IconEVV = () => (
  <svg viewBox="0 0 48 48" fill="none" width="42" height="42">
    <path d="M24 4C17.37 4 12 9.37 12 16C12 24 24 44 24 44C24 44 36 24 36 16C36 9.37 30.63 4 24 4Z" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(22,163,74,0.10)"/>
    <circle cx="24" cy="16" r="5" fill="rgba(22,163,74,0.18)" stroke="#16a34a" strokeWidth="1.5"/>
    <circle cx="24" cy="16" r="2" fill="#16a34a"/>
    <path d="M10 8C7 11 5 15 5 20" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M38 8C41 11 43 15 43 20" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 4C3 8 1 13 1 20" stroke="#16a34a" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
    <path d="M41 4C45 8 47 13 47 20" stroke="#16a34a" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
  </svg>
);

const IconAnalytics = () => (
  <svg viewBox="0 0 48 48" fill="none" width="42" height="42">
    <rect x="6" y="6" width="36" height="36" rx="4" fill="rgba(22,163,74,0.10)" stroke="#16a34a" strokeWidth="1.5"/>
    <rect x="11" y="28" width="5" height="10" rx="1.5" fill="rgba(22,163,74,0.30)" stroke="#16a34a" strokeWidth="1"/>
    <rect x="19" y="20" width="5" height="18" rx="1.5" fill="rgba(22,163,74,0.50)" stroke="#16a34a" strokeWidth="1"/>
    <rect x="27" y="14" width="5" height="24" rx="1.5" fill="rgba(22,163,74,0.75)" stroke="#16a34a" strokeWidth="1"/>
    <rect x="35" y="10" width="5" height="28" rx="1.5" fill="#16a34a" stroke="#16a34a" strokeWidth="1"/>
    <path d="M13.5 27L21.5 19L29.5 13L37.5 9" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="37.5" cy="9" r="2.5" fill="#16a34a"/>
    <line x1="6" y1="38" x2="42" y2="38" stroke="#16a34a" strokeWidth="1" opacity="0.4"/>
    <line x1="6" y1="6" x2="6" y2="38" stroke="#16a34a" strokeWidth="1" opacity="0.4"/>
  </svg>
);

const IconIntake = () => (
  <svg viewBox="0 0 48 48" fill="none" width="42" height="42">
    <path d="M24 4L42 14V34L24 44L6 34V14L24 4Z" fill="rgba(22,163,74,0.08)" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M24 10L36 17V31L24 38L12 31V17L24 10Z" fill="rgba(22,163,74,0.12)" stroke="#16a34a" strokeWidth="1" strokeLinejoin="round"/>
    <path d="M24 16L30 19.5V26.5L24 30L18 26.5V19.5L24 16Z" fill="#16a34a" opacity="0.6"/>
    <line x1="24" y1="4" x2="24" y2="10" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="24" y1="38" x2="24" y2="44" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 24L22 26L27 21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconStaffing = () => (
  <svg viewBox="0 0 48 48" fill="none" width="42" height="42">
    <circle cx="16" cy="14" r="7" fill="rgba(22,163,74,0.12)" stroke="#16a34a" strokeWidth="1.5"/>
    <circle cx="32" cy="14" r="7" fill="rgba(22,163,74,0.12)" stroke="#16a34a" strokeWidth="1.5"/>
    <path d="M2 38C2 30.27 8.27 24 16 24" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M32 24C39.73 24 46 30.27 46 38" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="24" cy="30" r="8" fill="rgba(22,163,74,0.15)" stroke="#16a34a" strokeWidth="1.5"/>
    <circle cx="24" cy="28" r="3" fill="#16a34a"/>
    <path d="M16 44C16 39.58 19.58 36 24 36C28.42 36 32 39.58 32 44" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="36" cy="10" r="5" fill="#052e16" stroke="#16a34a" strokeWidth="1.5"/>
    <path d="M34 10L35.5 11.5L38 9" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconMessaging = () => (
  <svg viewBox="0 0 48 48" fill="none" width="42" height="42">
    <path d="M4 8H36C38.2 8 40 9.8 40 12V28C40 30.2 38.2 32 36 32H20L12 40V32H4C1.8 32 0 30.2 0 28V12C0 9.8 1.8 8 4 8Z" fill="rgba(22,163,74,0.12)" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M40 16H44C46.2 16 48 17.8 48 20V30C48 32.2 46.2 34 44 34H42V40L36 34" fill="rgba(22,163,74,0.08)" stroke="#16a34a" strokeWidth="1" strokeLinejoin="round"/>
    <line x1="8" y1="16" x2="28" y2="16" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8" y1="21" x2="24" y2="21" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8" y1="26" x2="20" y2="26" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="38" cy="38" r="7" fill="#052e16" stroke="#16a34a" strokeWidth="1.5"/>
    <rect x="35" y="37" width="6" height="5" rx="1" fill="rgba(22,163,74,0.20)" stroke="#16a34a" strokeWidth="1"/>
    <path d="M36 37V35.5C36 34.1 38 34.1 38 35.5V37" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// ─── Services data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    Icon: IconScheduling,
    label: 'Operations',
    title: 'Smart Scheduling',
    desc: 'Drag-and-drop visit builder with automatic conflict detection, caregiver skill and location matching, and drive-time optimisation. Bulk scheduling covers entire care periods in minutes, not hours.',
    metric: '60%',
    metricLabel: 'Scheduling Time Saved',
  },
  {
    Icon: IconMobileApp,
    label: 'Field Staff',
    title: 'Caregiver Mobile App',
    desc: 'GPS-verified EVV at the point of care, offline documentation for areas without signal, digital signatures, discipline-filtered visit notes, and HIPAA-compliant in-app messaging. iOS and Android.',
    metric: '< 5 min',
    metricLabel: 'Avg Visit Documentation',
  },
  {
    Icon: IconBilling,
    label: 'Revenue Cycle',
    title: 'Automated Billing',
    desc: 'Automated claim scrubbing converts EVV-verified visits to clean CMS-1500 and UB-04 claims in one click. Secondary crossover billing, 835 remittance posting, and real-time eligibility checks built in.',
    metric: '99.2%',
    metricLabel: 'Billing Accuracy Rate',
  },
  {
    Icon: IconClinical,
    label: 'Clinical',
    title: 'Clinical Documentation',
    desc: 'OASIS-E compliant assessments, discipline-specific visit notes, PDGM-aligned care plans, and medication management. Recommendations surface automatically based on documentation to catch compliance gaps before submission.',
    metric: '100%',
    metricLabel: 'OASIS-E Compliance',
  },
  {
    Icon: IconEVV,
    label: 'Compliance',
    title: 'EVV and State Compliance',
    desc: 'Real-time sync with all state EVV aggregators. GPS and telephony verification methods supported. Automatic alerts flag missed or incomplete verifications before they become claim issues.',
    metric: '< 3s',
    metricLabel: 'EVV Sync to Aggregator',
  },
  {
    Icon: IconAnalytics,
    label: 'Business Intelligence',
    title: 'Reporting and Analytics',
    desc: 'Live dashboards surface payer mix, caregiver productivity, LUPA risk, rehospitalisation rates, and accounts receivable aging. Export-ready reports for administrators, billers, and clinical directors.',
    metric: '+52%',
    metricLabel: 'Faster Clinical Decisions',
  },
  {
    Icon: IconIntake,
    label: 'Intake',
    title: 'Patient Intake and Referrals',
    desc: 'Accept electronic referrals from hospitals, rehab centres, and physician offices. Automated eligibility verification at the point of referral. Physician order tracking from receipt to signature to filing.',
    metric: '70%',
    metricLabel: 'Faster Intake Processing',
  },
  {
    Icon: IconStaffing,
    label: 'HR and Staffing',
    title: 'HR and Credential Management',
    desc: 'Centralised caregiver profiles with licensure expiry alerts, competency tracking, and background check status. Automated shift reminders reduce no-shows. Payroll-ready timesheets export to major providers.',
    metric: '40%',
    metricLabel: 'Reduction in No-Shows',
  },
  {
    Icon: IconMessaging,
    label: 'Communication',
    title: 'HIPAA-Compliant Messaging',
    desc: 'Secure real-time messaging between office coordinators and field staff. Care team broadcasts, task assignments, and document sharing without using personal devices or unsecured channels.',
    metric: '0ms',
    metricLabel: 'Message Delivery Delay',
  },
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
            ? 'linear-gradient(145deg, #15803d 0%, #166534 60%, #14532d 100%)'
            : 'linear-gradient(145deg, #166534 0%, #14532d 60%, #052e16 100%)',
          borderRadius: '20px', overflow: 'hidden',
          position: 'relative', height: '100%',
          boxShadow: hovered
            ? '0 24px 64px rgba(5,46,22,0.28), 0 4px 16px rgba(22,163,74,0.20), inset 0 1px 0 rgba(74,222,128,0.15)'
            : '0 4px 20px rgba(5,46,22,0.12), inset 0 1px 0 rgba(74,222,128,0.08)',
          transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          border: '1px solid',
          borderColor: hovered ? 'rgba(74,222,128,0.30)' : 'rgba(74,222,128,0.12)',
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
            : 'linear-gradient(to right, rgba(74,222,128,0.40), rgba(74,222,128,0.15))',
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
                : 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)',
              pointerEvents: 'none', transition: 'background 0.4s ease',
            }} />
            <Icon />
          </div>
          {/* Label */}
          <p style={{ fontFamily: FP, fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: hovered ? '#86efac' : '#4ade80', marginBottom: '8px', transition: 'color 0.3s ease' }}>
            {label}
          </p>
          {/* Title */}
          <h3 style={{ fontFamily: FI, fontSize: '1.375rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '14px', lineHeight: 1.25 }}>
            {title}
          </h3>
          {/* Desc */}
          <p style={{ fontFamily: FP, fontSize: '1rem', fontWeight: 400, lineHeight: 1.80, color: hovered ? '#ffffff' : 'rgba(255,255,255,0.88)', marginBottom: '28px', transition: 'color 0.3s ease' }}>
            {desc}
          </p>
          {/* Metric */}
          <div style={{ paddingTop: '20px', borderTop: `1px solid ${hovered ? 'rgba(74,222,128,0.25)' : 'rgba(74,222,128,0.12)'}`, display: 'flex', alignItems: 'center', gap: '14px', transition: 'all 0.35s ease' }}>
            <div style={{ width: '4px', height: '36px', borderRadius: '999px', background: hovered ? 'linear-gradient(to bottom, #86efac, #4ade80)' : 'linear-gradient(to bottom, #4ade80, rgba(74,222,128,0.40))', flexShrink: 0, transition: 'background 0.35s ease' }} />
            <div>
              <p style={{ fontFamily: FI, fontSize: '1.625rem', fontWeight: 900, color: hovered ? '#ffffff' : 'rgba(255,255,255,0.90)', lineHeight: 1, letterSpacing: '-0.02em', transition: 'color 0.3s ease' }}>
                {metric}
              </p>
              <p style={{ fontFamily: FP, fontSize: '0.78rem', fontWeight: 500, color: hovered ? '#86efac' : 'rgba(74,222,128,0.65)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '3px', transition: 'color 0.3s ease' }}>
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
  { feature: 'Single-sign-on platform',           raah: true,  legacy: false },
  { feature: 'Real-time EVV state sync',          raah: true,  legacy: false },
  { feature: 'Automated claim scrubbing',         raah: true,  legacy: 'partial' },
  { feature: 'Offline mobile documentation',      raah: true,  legacy: false },
  { feature: 'PDGM-aligned care planning',        raah: true,  legacy: 'partial' },
  { feature: 'Secondary crossover billing',       raah: true,  legacy: false },
  { feature: 'Automatic regulatory updates',      raah: true,  legacy: false },
  { feature: 'Live onboarding in under 24 hours', raah: true,  legacy: false },
  { feature: 'Dedicated success manager',         raah: true,  legacy: 'partial' },
  { feature: 'Transparent per-agency pricing',    raah: true,  legacy: false },
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

    {/* ══ 1. HERO ══ */}
    <section style={{ position: 'relative', minHeight: '65vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <img
        src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2000&h=900&crop=top"
        alt="RAAH platform services"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,46,22,0.65)' }} aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(5,46,22,0.60) 100%)' }} aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} aria-hidden="true" />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '120px 24px' }}>
        <Reveal delay={0}><Eyebrow label="The Platform" light /></Reveal>
        <Reveal delay={80}>
          <h1 style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.05, color: '#ffffff', maxWidth: '900px', margin: '0 auto 24px' }}>
            Every Tool Your Agency{' '}
            <span style={{ color: '#4ade80' }}>Needs to Thrive</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ fontFamily: FP, fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', fontWeight: 500, lineHeight: 1.75, color: 'rgba(220,252,231,0.85)', maxWidth: '620px', margin: '0 auto 40px' }}>
            Nine integrated modules. One login. Zero gaps between your clinical, operational, and financial workflows.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <Link to="/demo" style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '16px 36px', borderRadius: '999px', background: '#16a34a', color: '#ffffff', border: '2px solid #16a34a', boxShadow: '0 6px 28px rgba(22,163,74,0.40)', display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', transition: 'all 0.25s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4ade80'; e.currentTarget.style.borderColor = '#4ade80'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'none'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(22,163,74,0.40)'; }}
          >
            See the Platform Live
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </Reveal>
      </div>
    </section>

    <WaveDivider topColor="rgba(5,46,22,0.65)" bottomColor="#ffffff" />

    {/* ══ 2. PLATFORM OVERVIEW ══ */}
    <section style={{ background: '#ffffff', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <DotGrid />
      <Watermark />
      <RadialGlow top="-60px" right="-60px" size={420} opacity={0.07} />
      <RadialGlow bottom="-60px" left="-60px" size={360} opacity={0.06} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="grid-cols-1 md:grid-cols-2">

          <Reveal delay={0}>
            <div>
              <Eyebrow label="Platform" />
              <h2 style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.08, color: '#0f172a', marginBottom: '20px' }}>
                One System.{' '}
                <span style={{ color: '#16a34a' }}>Every Workflow.</span>
              </h2>
              <p style={{ fontFamily: FP, fontSize: '1.0625rem', fontWeight: 500, lineHeight: 1.80, color: '#374151', marginBottom: '20px' }}>
                Most home health agencies run on three or four disconnected platforms. Scheduling in one system, billing in another, EVV in a third, documentation somewhere else. Every handoff between systems is a gap where data gets lost, errors get introduced, and staff waste time re-entering the same information.
              </p>
              <p style={{ fontFamily: FP, fontSize: '1rem', fontWeight: 400, lineHeight: 1.80, color: '#475569', marginBottom: '36px' }}>
                RAAH eliminates every one of those gaps. From the moment a referral arrives to the moment a remittance posts, every workflow runs inside a single connected system. One login for every role. Real-time data across every department. No re-entry, no reconciliation, no surprises.
              </p>
              <Link to="/demo" style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '15px 32px', borderRadius: '999px', background: '#16a34a', color: '#ffffff', border: '2px solid #16a34a', boxShadow: '0 6px 28px rgba(22,163,74,0.32)', display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#16a34a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'none'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(22,163,74,0.32)'; }}
              >
                Request a Demo
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </Reveal>

          {/* Capability pills */}
          <Reveal delay={150}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
                  <div style={{ padding: '16px 18px', borderRadius: '12px', background: 'rgba(22,163,74,0.05)', border: '1px solid rgba(22,163,74,0.12)', transition: 'all 0.25s ease', cursor: 'default' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(22,163,74,0.10)'; e.currentTarget.style.borderColor = 'rgba(22,163,74,0.28)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(22,163,74,0.05)'; e.currentTarget.style.borderColor = 'rgba(22,163,74,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
                      <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>{pill.label}</p>
                    </div>
                    <p style={{ fontFamily: FP, fontSize: '0.78rem', color: '#64748b', paddingLeft: '14px' }}>{pill.sub}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>

    <WaveDivider topColor="#ffffff" bottomColor="#052e16" flip />

    {/* ══ 3. SERVICES GRID ══ */}
    <section style={{ background: 'linear-gradient(160deg, #052e16 0%, #064e3b 55%, #052e16 100%)', padding: '120px 0 140px', position: 'relative', overflow: 'hidden' }}>
      <DotGrid color="rgba(74,222,128,0.08)" />
      <Watermark color="rgba(255,255,255,0.03)" />
      <RadialGlow top="-80px" right="-80px" size={500} opacity={0.14} />
      <RadialGlow bottom="-80px" left="-80px" size={400} opacity={0.10} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <Eyebrow label="All Services" light />
            <h2 style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', letterSpacing: '-0.03em', lineHeight: 1.08, color: '#ffffff', maxWidth: '780px', margin: '0 auto 20px' }}>
              Nine Modules.{' '}
              <span style={{ color: '#4ade80' }}>Zero Compromises.</span>
            </h2>
            <p style={{ fontFamily: FP, fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', fontWeight: 500, lineHeight: 1.75, color: 'rgba(220,252,231,0.85)', maxWidth: '580px', margin: '0 auto' }}>
              Every module is purpose-built for home health. Every metric below is from agencies running on RAAH today.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'stretch' }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} delay={80 + i * 60} />
          ))}
        </div>
      </div>
    </section>

    <WaveDivider topColor="#052e16" bottomColor="#ffffff" />

    {/* ══ 4. COMPARISON TABLE ══ */}
    <section style={{ background: '#ffffff', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <DotGrid />
      <Watermark color="rgba(5,46,22,0.06)" />
      <RadialGlow top="-60px" right="-60px" size={420} opacity={0.07} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <Eyebrow label="How We Compare" />
            <h2 style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', letterSpacing: '-0.03em', lineHeight: 1.08, color: '#0f172a', maxWidth: '780px', margin: '0 auto 20px' }}>
              RAAH vs{' '}
              <span style={{ color: '#16a34a' }}>Legacy Platforms</span>
            </h2>
            <p style={{ fontFamily: FP, fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', fontWeight: 500, lineHeight: 1.75, color: '#374151', maxWidth: '560px', margin: '0 auto' }}>
              Legacy platforms were built for a different era of home health. See what a purpose-built modern platform delivers.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(22,163,74,0.15)', boxShadow: '0 4px 24px rgba(5,46,22,0.08)' }}>
            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 180px', background: '#052e16' }}>
              <div style={{ padding: '20px 28px' }}>
                <p style={{ fontFamily: FP, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(74,222,128,0.70)' }}>Feature</p>
              </div>
              <div style={{ padding: '20px 0', textAlign: 'center', borderLeft: '1px solid rgba(74,222,128,0.10)' }}>
                <p style={{ fontFamily: FI, fontWeight: 800, fontSize: '0.9375rem', color: '#4ade80' }}>RAAH</p>
              </div>
              <div style={{ padding: '20px 0', textAlign: 'center', borderLeft: '1px solid rgba(74,222,128,0.10)' }}>
                <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.9375rem', color: 'rgba(255,255,255,0.50)' }}>Legacy Tools</p>
              </div>
            </div>

            {/* Rows */}
            {COMPARISON.map((row, i) => (
              <Reveal key={row.feature} delay={i * 30}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 180px', background: i % 2 === 0 ? '#ffffff' : 'rgba(22,163,74,0.02)', borderTop: '1px solid rgba(22,163,74,0.08)', transition: 'background 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(22,163,74,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? '#ffffff' : 'rgba(22,163,74,0.02)'; }}
                >
                  <div style={{ padding: '18px 28px', display: 'flex', alignItems: 'center' }}>
                    <p style={{ fontFamily: FP, fontSize: '0.9375rem', fontWeight: 500, color: '#374151' }}>{row.feature}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid rgba(22,163,74,0.08)' }}>
                    <CheckIcon />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid rgba(22,163,74,0.08)' }}>
                    {row.legacy === true ? <CheckIcon /> : row.legacy === 'partial' ? <PartialIcon /> : <CrossIcon />}
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Legend */}
            <div style={{ padding: '16px 28px', background: 'rgba(22,163,74,0.03)', borderTop: '1px solid rgba(22,163,74,0.08)', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {[
                { icon: <CheckIcon />, label: 'Fully supported' },
                { icon: <PartialIcon />, label: 'Partial or add-on cost' },
                { icon: <CrossIcon />, label: 'Not supported' },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {icon}
                  <span style={{ fontFamily: FP, fontSize: '0.78rem', color: '#64748b' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    <WaveDivider topColor="#ffffff" bottomColor="#052e16" flip />

    {/* ══ 5. CTA ══ */}
    <section style={{ background: 'linear-gradient(160deg, #052e16 0%, #064e3b 55%, #052e16 100%)', padding: '120px 0 140px', position: 'relative', overflow: 'hidden' }}>
      <DotGrid color="rgba(74,222,128,0.08)" />
      <Watermark color="rgba(255,255,255,0.055)" />
      <RadialGlow top="-80px" right="-80px" size={500} opacity={0.14} />
      <RadialGlow bottom="-80px" left="-80px" size={400} opacity={0.10} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Reveal delay={0}><Eyebrow label="Get Started" light /></Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', letterSpacing: '-0.03em', lineHeight: 1.08, color: '#ffffff', maxWidth: '820px', margin: '0 auto 20px' }}>
            See All Nine Modules{' '}
            <span style={{ color: '#4ade80' }}>Working Together</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{ fontFamily: FP, fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', fontWeight: 500, lineHeight: 1.75, color: 'rgba(220,252,231,0.85)', maxWidth: '560px', margin: '0 auto 48px' }}>
            Book a personalised walkthrough built around your specific payer mix, state EVV requirements, and agency size. No commitment required.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <Link to="/demo" style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '18px 44px', borderRadius: '999px', background: '#16a34a', color: '#ffffff', border: '2px solid #16a34a', boxShadow: '0 8px 32px rgba(22,163,74,0.40)', display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', transition: 'all 0.25s ease', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4ade80'; e.currentTarget.style.borderColor = '#4ade80'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'none'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(22,163,74,0.40)'; }}
            >
              Request a Demo
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link to="/pricing" style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '18px 44px', borderRadius: '999px', background: 'transparent', color: 'rgba(255,255,255,0.90)', border: '2px solid rgba(255,255,255,0.30)', display: 'inline-flex', alignItems: 'center', textDecoration: 'none', transition: 'all 0.25s ease', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.75)'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.30)'; e.currentTarget.style.color = 'rgba(255,255,255,0.90)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              View Pricing
            </Link>
          </div>
          <p style={{ fontFamily: FP, fontSize: '0.8rem', fontWeight: 400, color: 'rgba(74,222,128,0.50)', marginTop: '24px', letterSpacing: '0.04em' }}>
            No credit card required. Live in under 24 hours.
          </p>
        </Reveal>
      </div>
    </section>

  </Layout>
);

export default ServicesPage;