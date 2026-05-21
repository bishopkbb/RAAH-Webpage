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
 *   1. Page Hero        — dark green overlay, centred headline
 *   2. Our Story        — 2-col image + narrative (Workflow layout)
 *   3. By the Numbers   — brand green gradient, 4 stats
 *   4. What Drives Us   — white, 3 SVG-icon value columns
 *   5. How We Work      — dark green, 3-step process
 *   6. Compliance       — white, regulatory credentials grid
 *   7. CTA              — matches homepage final CTA
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

// ─── Global keyframes injected once ──────────────────────────────────────────
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
  `}</style>
);

// ─── Section wave divider ─────────────────────────────────────────────────────
const WaveDivider = ({ topColor, bottomColor, flip = false }) => (
  <div style={{ position: 'relative', height: 'clamp(40px, 6vw, 80px)', overflow: 'hidden',
    background: topColor, marginBottom: '-1px' }}>
    <svg
      viewBox="0 0 1440 80" preserveAspectRatio="none"
      style={{
        position: 'absolute', bottom: 0, left: 0,
        width: '100%', height: '100%',
        transform: flip ? 'scaleX(-1)' : 'none',
      }}
    >
      <path
        d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
        fill={bottomColor}
      />
    </svg>
  </div>
);

const DotGrid = ({ color = 'rgba(5,46,22,0.08)' }) => (
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

const Watermark = ({ color = 'rgba(5,46,22,0.06)' }) => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      fontFamily: FI, fontWeight: 900,
      fontSize: 'clamp(80px, 14vw, 180px)',
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
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
    <div style={{ width: '32px', height: '1.5px', background: light ? '#4ade80' : '#16a34a', borderRadius: '999px' }} />
    <span style={{
      fontFamily: FP, fontSize: '0.75rem', fontWeight: 600,
      letterSpacing: '0.2em', textTransform: 'uppercase',
      color: light ? '#4ade80' : '#16a34a',
    }}>
      {label}
    </span>
    <div style={{ width: '32px', height: '1.5px', background: light ? '#4ade80' : '#16a34a', borderRadius: '999px' }} />
  </div>
);

// ─── Bespoke SVG icons ────────────────────────────────────────────────────────

const IconMission = () => (
  <svg viewBox="0 0 48 48" fill="none" width="42" height="42">
    <circle cx="24" cy="24" r="20" stroke="#16a34a" strokeWidth="1.5" fill="rgba(22,163,74,0.08)"/>
    <circle cx="24" cy="24" r="13" stroke="#16a34a" strokeWidth="1" fill="rgba(22,163,74,0.05)"/>
    <circle cx="24" cy="24" r="4" fill="#16a34a"/>
    <line x1="24" y1="4" x2="24" y2="11" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="37" x2="24" y2="44" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
    <line x1="4" y1="24" x2="11" y2="24" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
    <line x1="37" y1="24" x2="44" y2="24" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 11L26 20H28L24 24L20 20H22L24 11Z" fill="#16a34a" opacity="0.6"/>
  </svg>
);

const IconIntegrity = () => (
  <svg viewBox="0 0 48 48" fill="none" width="42" height="42">
    <path d="M4 22H14L20 16H28L34 22H44" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(22,163,74,0.06)"/>
    <path d="M14 22L10 32H38L34 22" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(22,163,74,0.08)"/>
    <path d="M20 16L22 10H26L28 16" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M18 27C20 25 22 28 24 26C26 24 28 27 30 25" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="22" r="2.5" fill="#16a34a"/>
    <path d="M24 34L25.2 37.6H29L26.4 39.7L27.3 43.3L24 41.3L20.7 43.3L21.6 39.7L19 37.6H22.8Z" fill="#16a34a" opacity="0.7"/>
  </svg>
);

const IconInnovation = () => (
  <svg viewBox="0 0 48 48" fill="none" width="42" height="42">
    <rect x="6" y="6" width="36" height="36" rx="6" fill="rgba(22,163,74,0.08)" stroke="#16a34a" strokeWidth="1.5"/>
    <path d="M14 24H20M28 24H34" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M24 14V20M24 28V34" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 24C20 21.8 21.8 20 24 20C26.2 20 28 21.8 28 24C28 26.2 26.2 28 24 28C21.8 28 20 26.2 20 24Z" fill="rgba(22,163,74,0.20)" stroke="#16a34a" strokeWidth="1.5"/>
    <circle cx="24" cy="24" r="2.5" fill="#16a34a"/>
    <circle cx="12" cy="12" r="2" fill="#16a34a" opacity="0.5"/>
    <circle cx="36" cy="12" r="2" fill="#16a34a" opacity="0.5"/>
    <circle cx="12" cy="36" r="2" fill="#16a34a" opacity="0.5"/>
    <circle cx="36" cy="36" r="2" fill="#16a34a" opacity="0.5"/>
    <line x1="14" y1="12" x2="20" y2="12" stroke="#16a34a" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    <line x1="28" y1="12" x2="34" y2="12" stroke="#16a34a" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    <line x1="12" y1="14" x2="12" y2="20" stroke="#16a34a" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    <line x1="12" y1="28" x2="12" y2="34" stroke="#16a34a" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

// ─── Value card ───────────────────────────────────────────────────────────────
const ValueCard = ({ icon, label, title, body, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered
            ? 'linear-gradient(145deg, #15803d 0%, #166534 60%, #14532d 100%)'
            : 'linear-gradient(145deg, #166534 0%, #14532d 60%, #052e16 100%)',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          boxShadow: hovered
            ? '0 24px 64px rgba(5,46,22,0.28), 0 4px 16px rgba(22,163,74,0.20)'
            : '0 4px 20px rgba(5,46,22,0.12)',
          transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          border: '1px solid',
          borderColor: hovered ? 'rgba(74,222,128,0.30)' : 'rgba(74,222,128,0.12)',
          width: '100%',
          maxWidth: '420px',
          margin: '0 auto',
        }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0,
          left: hovered ? '120%' : '-60%',
          width: '50%', height: '100%',
          background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.06) 50%, transparent 80%)',
          transform: 'skewX(-15deg)',
          transition: 'left 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          pointerEvents: 'none',
        }} />
        <div style={{
          height: '2px',
          background: hovered
            ? 'linear-gradient(to right, #4ade80, #86efac, #4ade80)'
            : 'linear-gradient(to right, rgba(74,222,128,0.40), rgba(74,222,128,0.15))',
          transition: 'background 0.4s ease',
        }} />
        <div style={{ padding: '36px 32px 32px', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '18px',
            background: '#ffffff',
            border: `1.5px solid ${hovered ? 'rgba(22,163,74,0.35)' : 'rgba(22,163,74,0.25)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '28px', position: 'relative',
            transition: 'all 0.35s ease',
            margin: '0 auto 28px',
          }}>
            <div aria-hidden="true" style={{
              position: 'absolute', inset: '-10px', borderRadius: '26px',
              background: hovered
                ? 'radial-gradient(circle, rgba(74,222,128,0.20) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)',
              pointerEvents: 'none', transition: 'background 0.4s ease',
            }} />
            {icon}
          </div>
          <p style={{
            fontFamily: FP, fontSize: '0.78rem', fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: hovered ? '#86efac' : '#4ade80',
            marginBottom: '8px', transition: 'color 0.3s ease',
            textAlign: 'center',
          }}>{label}</p>
          <h3 style={{
            fontFamily: FI, fontSize: '1.375rem', fontWeight: 800,
            letterSpacing: '-0.02em', color: '#ffffff',
            marginBottom: '14px', lineHeight: 1.25,
            textAlign: 'center',
          }}>{title}</h3>
          <p style={{
            fontFamily: FP, fontSize: '1rem', fontWeight: 400,
            lineHeight: 1.80,
            color: hovered ? '#ffffff' : 'rgba(255,255,255,0.88)',
            transition: 'color 0.3s ease',
            textAlign: 'center',
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
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center',
          position: 'relative', cursor: 'default',
          width: '100%',
          maxWidth: '320px',
          margin: '0 auto',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-16px',
            width: hovered ? '124px' : '96px',
            height: hovered ? '124px' : '96px',
            borderRadius: '50%',
            border: `1.5px solid ${hovered ? 'rgba(74,222,128,0.40)' : 'rgba(74,222,128,0.12)'}`,
            animation: hovered ? 'raah-pulse-ring 1.2s ease-out infinite' : 'none',
            transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-28px',
            width: hovered ? '148px' : '96px',
            height: hovered ? '148px' : '96px',
            borderRadius: '50%',
            border: `1px solid ${hovered ? 'rgba(74,222,128,0.18)' : 'transparent'}`,
            transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.04s',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            width: hovered ? '96px' : '80px',
            height: hovered ? '96px' : '80px',
            borderRadius: '50%',
            background: hovered
              ? 'linear-gradient(135deg, #166534 0%, #16a34a 100%)'
              : 'rgba(74,222,128,0.10)',
            border: `2px solid ${hovered ? '#4ade80' : 'rgba(74,222,128,0.35)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '32px', flexShrink: 0,
            boxShadow: hovered
              ? '0 0 0 6px rgba(74,222,128,0.12), 0 16px 40px rgba(5,46,22,0.40)'
              : '0 0 0 8px rgba(74,222,128,0.06)',
            animation: hovered ? 'none' : 'raah-float 3s ease-in-out infinite',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {hovered && (
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(74,222,128,0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
          )}
          <span
            style={{
              fontFamily: FI, fontWeight: 900,
              fontSize: hovered ? '1.5rem' : '1.25rem',
              color: hovered ? '#ffffff' : '#4ade80',
              letterSpacing: '-0.02em',
              transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
              lineHeight: 1,
            }}
          >
            {number}
          </span>
        </div>

        {/* Connector line — desktop only, hidden on mobile */}
        {!isLast && (
          <div aria-hidden="true" style={{
            position: 'absolute',
            top: '40px',
            left: 'calc(50% + 48px)',
            width: 'calc(100% - 96px)',
            height: '2px',
            background: 'linear-gradient(to right, rgba(74,222,128,0.40), rgba(74,222,128,0.08))',
            display: 'none',
          }} className="lg:block" />
        )}

        <h3
          style={{
            fontFamily: FI, fontWeight: 800,
            fontSize: '1.3rem',
            letterSpacing: '-0.02em',
            color: hovered ? '#ffffff' : 'rgba(255,255,255,0.90)',
            marginBottom: '12px', lineHeight: 1.2,
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1) 0.05s',
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontFamily: FP, fontSize: '0.9375rem', fontWeight: 400,
            lineHeight: 1.75,
            color: hovered ? 'rgba(220,252,231,0.95)' : 'rgba(220,252,231,0.65)',
            maxWidth: '280px',
            transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1) 0.08s',
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
          borderRadius: '16px',
          padding: '28px 24px',
          border: '1px solid',
          borderColor: hovered ? 'rgba(22,163,74,0.30)' : 'rgba(22,163,74,0.12)',
          boxShadow: hovered
            ? '0 16px 48px rgba(5,46,22,0.12), 0 4px 12px rgba(22,163,74,0.08)'
            : '0 2px 12px rgba(5,46,22,0.06)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          display: 'flex', alignItems: 'center', gap: '16px',
          width: '100%',
          maxWidth: '320px',
          margin: '0 auto',
        }}
      >
        <div style={{
          width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
          background: hovered ? '#16a34a' : 'rgba(22,163,74,0.08)',
          border: `1.5px solid ${hovered ? '#16a34a' : 'rgba(22,163,74,0.20)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s ease',
        }}>
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
            <path d="M12 2L4 5.5V11C4 16.5 7.5 21.5 12 23C16.5 21.5 20 16.5 20 11V5.5L12 2Z"
              stroke={hovered ? '#ffffff' : '#16a34a'} strokeWidth="1.5" strokeLinejoin="round"
              fill={hovered ? 'rgba(255,255,255,0.15)' : 'rgba(22,163,74,0.10)'}
            />
            <path d="M9 12L11 14L15 10" stroke={hovered ? '#ffffff' : '#16a34a'}
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p style={{
            fontFamily: FI, fontWeight: 700, fontSize: '0.9375rem',
            color: '#0f172a', marginBottom: '2px', lineHeight: 1.2,
          }}>{title}</p>
          <p style={{
            fontFamily: FP, fontWeight: 400, fontSize: '0.8rem',
            color: '#64748b', lineHeight: 1.4,
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
        1. PAGE HERO
    ══════════════════════════════════════════════════════════════ */}
    <section style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <img
        src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000&h=900&crop=top"
        alt="RAAH Technologies team"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,46,22,0.65)' }} aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(5,46,22,0.60) 100%)' }} aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} aria-hidden="true" />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: 'clamp(60px, 12vw, 120px) 24px' }}>
        <Reveal delay={0}>
          <Eyebrow label="Our Story" light />
        </Reveal>
        <Reveal delay={80}>
          <h1 style={{
            fontFamily: FI, fontWeight: 900,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            letterSpacing: '-0.03em', lineHeight: 1.05,
            color: '#ffffff', marginBottom: '24px',
            maxWidth: '900px', margin: '0 auto 24px',
          }}>
            Built for the People{' '}
            <span style={{ color: '#4ade80' }}>Who Keep</span>{' '}
            Care Moving
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p style={{
            fontFamily: FP, fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
            fontWeight: 500, lineHeight: 1.75,
            color: 'rgba(220,252,231,0.85)',
            maxWidth: '620px', margin: '0 auto 40px',
          }}>
            RAAH Technologies was built by people who understood the frustration of running a home health agency on disconnected tools, paper workflows, and reactive billing. We decided to fix it.
          </p>
        </Reveal>
      </div>
    </section>

    <WaveDivider topColor="rgba(5,46,22,0.80)" bottomColor="#ffffff" />

    {/* ══════════════════════════════════════════════════════════════
        2. OUR STORY
    ══════════════════════════════════════════════════════════════ */}
    <section style={{ background: '#ffffff', padding: 'clamp(60px, 10vw, 130px) 0', position: 'relative', overflow: 'hidden' }}>
      <DotGrid />
      <Watermark />
      <RadialGlow top="-60px" right="-60px" size={420} opacity={0.07} />
      <RadialGlow bottom="-60px" left="-60px" size={360} opacity={0.06} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <style>{`
          .story-grid {
            display: grid;
            gap: 48px;
            align-items: stretch;
          }
          @media (min-width: 768px) {
            .story-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 80px;
            }
          }
        `}</style>
        <div className="story-grid">

          {/* Image */}
          <Reveal delay={0}>
            <div style={{ position: 'relative', height: '100%', minHeight: 'clamp(320px, 50vw, 520px)' }}>
              <div aria-hidden="true" style={{
                position: 'absolute', top: '-24px', left: '-24px', right: '24px', bottom: '24px',
                borderRadius: '24px', border: '1.5px solid rgba(22,163,74,0.15)', zIndex: 0,
              }} />
              <div style={{
                position: 'relative', zIndex: 1, borderRadius: '20px', overflow: 'hidden',
                height: '100%',
                boxShadow: '0 32px 80px rgba(5,46,22,0.14), 0 8px 24px rgba(5,46,22,0.08)',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
                  alt="RAAH team collaborating"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                />
                <div aria-hidden="true" style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(5,46,22,0.10) 0%, transparent 60%)',
                }} />
              </div>
              {/* Floating pill — desktop only */}
              <div className="hidden lg:flex" style={{
                position: 'absolute', top: '-20px', right: '-20px', zIndex: 10,
                background: 'linear-gradient(135deg, #052e16 0%, #14532d 100%)',
                borderRadius: '999px', padding: '10px 18px',
                boxShadow: '0 8px 24px rgba(5,46,22,0.30)',
                border: '1px solid rgba(74,222,128,0.20)',
                alignItems: 'center', gap: '8px',
              }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', flexShrink: 0, boxShadow: '0 0 8px rgba(74,222,128,0.60)', display: 'inline-block' }} />
                <span style={{ fontFamily: FP, fontSize: '0.72rem', fontWeight: 600, color: '#ffffff', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                  Founded in Aurora, CO
                </span>
              </div>
            </div>
          </Reveal>

          {/* Narrative */}
          <Reveal delay={150}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Eyebrow label="Our Story" />
              <h2 style={{
                fontFamily: FI, fontWeight: 900,
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                letterSpacing: '-0.03em', lineHeight: 1.08,
                color: '#0f172a', marginBottom: '20px',
              }}>
                From Frustration{' '}
                <span style={{ color: '#16a34a' }}>to Platform</span>
              </h2>
              <p style={{ fontFamily: FP, fontSize: '1.0625rem', fontWeight: 500, lineHeight: 1.80, color: '#374151', marginBottom: '20px' }}>
                RAAH Technologies was founded by a team that had spent years inside home health agencies, watching skilled nurses and coordinators spend hours each day fighting their own software instead of focusing on patients.
              </p>
              <p style={{ fontFamily: FP, fontSize: '1rem', fontWeight: 400, lineHeight: 1.80, color: '#475569', marginBottom: '20px' }}>
                The problems were consistent: disconnected billing systems, manual EVV workarounds, scheduling tools that created more conflicts than they resolved, and compliance exposure that kept agency owners awake at night. Existing platforms were either too rigid or too fragmented to address all of them at once.
              </p>
              <p style={{ fontFamily: FP, fontSize: '1rem', fontWeight: 400, lineHeight: 1.80, color: '#475569', marginBottom: '36px' }}>
                We built RAAH to be the platform we wished had existed. One system that handles every clinical, operational, and financial workflow from the first patient referral to the final 835 remittance posting. Built specifically for home health, designed without compromise.
              </p>
              {/* Core values row */}
              <style>{`
                .values-grid {
                  display: grid;
                  gap: 12px;
                  grid-template-columns: 1fr;
                }
                @media (min-width: 480px) {
                  .values-grid { grid-template-columns: repeat(2, 1fr); }
                }
              `}</style>
              <div className="values-grid">
                {[
                  'HIPAA-Grade Security',
                  'Real-Time EVV Sync',
                  'Automated Billing',
                  'Built for Growth',
                ].map((item) => (
                  <div key={item} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '12px 16px', borderRadius: '10px',
                    background: 'rgba(22,163,74,0.05)',
                    border: '1px solid rgba(22,163,74,0.12)',
                  }}>
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                      <path d="M3 8L6.5 11.5L13 5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>

    <WaveDivider topColor="#ffffff" bottomColor="#052e16" flip={true} />

    {/* ══════════════════════════════════════════════════════════════
        3. BY THE NUMBERS
    ══════════════════════════════════════════════════════════════ */}
    <section style={{
      background: 'linear-gradient(160deg, #052e16 0%, #064e3b 55%, #052e16 100%)',
      padding: 'clamp(60px, 10vw, 100px) 0', position: 'relative', overflow: 'hidden',
    }}>
      <DotGrid color="rgba(74,222,128,0.08)" />
      <Watermark color="rgba(255,255,255,0.04)" />
      <RadialGlow top="-80px" right="-80px" size={500} opacity={0.14} />
      <RadialGlow bottom="-80px" left="-80px" size={400} opacity={0.10} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Eyebrow label="By The Numbers" light />
            <h2 style={{
              fontFamily: FI, fontWeight: 900,
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              letterSpacing: '-0.03em', lineHeight: 1.08,
              color: '#ffffff', maxWidth: '680px', margin: '0 auto',
            }}>
              Trusted Across the{' '}
              <span style={{ color: '#4ade80' }}>Country</span>
            </h2>
          </div>
        </Reveal>

        <style>{`
          .stats-grid {
            display: grid;
            gap: 1px;
            background: rgba(74,222,128,0.10);
            border-radius: 16px;
            overflow: hidden;
            grid-template-columns: repeat(2, 1fr);
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
              <div style={{
                background: 'rgba(5,46,22,0.60)',
                padding: 'clamp(32px, 5vw, 48px) 24px', textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: FI, fontWeight: 900,
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  letterSpacing: '-0.03em', lineHeight: 1,
                  color: '#4ade80', marginBottom: '8px',
                }}>{stat.value}</p>
                <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '1rem', color: '#ffffff', marginBottom: '4px' }}>{stat.label}</p>
                <p style={{ fontFamily: FP, fontWeight: 400, fontSize: '0.78rem', color: 'rgba(220,252,231,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <WaveDivider topColor="#052e16" bottomColor="#ffffff" />

    {/* ══════════════════════════════════════════════════════════════
        4. WHAT DRIVES US
    ══════════════════════════════════════════════════════════════ */}
    <section style={{ background: '#ffffff', padding: 'clamp(60px, 10vw, 130px) 0', position: 'relative', overflow: 'hidden' }}>
      <DotGrid />
      <Watermark />
      <RadialGlow top="-60px" right="-60px" size={420} opacity={0.07} />
      <RadialGlow bottom="-60px" left="-60px" size={360} opacity={0.06} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <Eyebrow label="What Drives Us" />
            <h2 style={{
              fontFamily: FI, fontWeight: 900,
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              letterSpacing: '-0.03em', lineHeight: 1.08,
              color: '#0f172a', maxWidth: '780px', margin: '0 auto 20px',
            }}>
              Three Principles.{' '}
              <span style={{ color: '#16a34a' }}>One Standard.</span>
            </h2>
            <p style={{
              fontFamily: FP, fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
              fontWeight: 500, lineHeight: 1.75, color: '#374151',
              maxWidth: '560px', margin: '0 auto',
            }}>
              Every product decision, every support interaction, and every line of code is shaped by the same three commitments.
            </p>
          </div>
        </Reveal>

        <style>{`
          .values-card-grid {
            display: grid;
            gap: 24px;
            justify-items: center;
            grid-template-columns: 1fr;
          }
          @media (min-width: 640px) {
            .values-card-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 1024px) {
            .values-card-grid { grid-template-columns: repeat(3, 1fr); }
          }
        `}</style>
        <div className="values-card-grid">
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

    <WaveDivider topColor="#ffffff" bottomColor="#052e16" flip={true} />

    {/* ══════════════════════════════════════════════════════════════
        5. HOW WE WORK
    ══════════════════════════════════════════════════════════════ */}
    <section style={{
      background: 'linear-gradient(160deg, #052e16 0%, #064e3b 55%, #052e16 100%)',
      padding: 'clamp(60px, 10vw, 130px) 0', position: 'relative', overflow: 'hidden',
    }}>
      <DotGrid color="rgba(74,222,128,0.08)" />
      <Watermark color="rgba(255,255,255,0.04)" />
      <RadialGlow top="-60px" right="-60px" size={420} opacity={0.12} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <Eyebrow label="How We Work" light />
            <h2 style={{
              fontFamily: FI, fontWeight: 900,
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              letterSpacing: '-0.03em', lineHeight: 1.08,
              color: '#ffffff', maxWidth: '780px', margin: '0 auto 20px',
            }}>
              From Contract to{' '}
              <span style={{ color: '#4ade80' }}>Fully Operational</span>
            </h2>
            <p style={{
              fontFamily: FP, fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
              fontWeight: 500, lineHeight: 1.75,
              color: 'rgba(220,252,231,0.85)',
              maxWidth: '560px', margin: '0 auto',
            }}>
              Most agencies are live within 24 hours. No IT department required. No months-long implementations.
            </p>
          </div>
        </Reveal>

        <style>{`
          .process-grid {
            display: grid;
            gap: 48px;
            justify-items: center;
            grid-template-columns: 1fr;
          }
          @media (min-width: 768px) {
            .process-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 48px;
            }
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

    <WaveDivider topColor="#052e16" bottomColor="#ffffff" />

    {/* ══════════════════════════════════════════════════════════════
        6. COMPLIANCE CREDENTIALS
    ══════════════════════════════════════════════════════════════ */}
    <section style={{ background: '#ffffff', padding: 'clamp(60px, 10vw, 130px) 0', position: 'relative', overflow: 'hidden' }}>
      <DotGrid />
      <Watermark />
      <RadialGlow top="-60px" right="-60px" size={420} opacity={0.07} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <style>{`
          .compliance-grid {
            display: grid;
            gap: 80px;
            align-items: center;
          }
          @media (min-width: 768px) {
            .compliance-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 80px;
            }
          }
        `}</style>
        <div className="compliance-grid">

          {/* Left — narrative */}
          <Reveal delay={0}>
            <div>
              <Eyebrow label="Compliance" />
              <h2 style={{
                fontFamily: FI, fontWeight: 900,
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                letterSpacing: '-0.03em', lineHeight: 1.08,
                color: '#0f172a', marginBottom: '20px',
              }}>
                Regulatory Confidence,{' '}
                <span style={{ color: '#16a34a' }}>Built In</span>
              </h2>
              <p style={{ fontFamily: FP, fontSize: '1.0625rem', fontWeight: 500, lineHeight: 1.80, color: '#374151', marginBottom: '20px' }}>
                Compliance in home health is not a feature you toggle on. It is the foundation every other workflow is built on. RAAH was engineered from the ground up to meet the most demanding regulatory requirements in the industry.
              </p>
              <p style={{ fontFamily: FP, fontSize: '1rem', fontWeight: 400, lineHeight: 1.80, color: '#475569', marginBottom: '20px' }}>
                Our legal and clinical teams monitor CMS rule changes, state EVV mandate updates, and payer policy shifts continuously. When regulations change, the platform updates automatically. Your agency stays ahead without lifting a finger.
              </p>
              <p style={{ fontFamily: FP, fontSize: '1rem', fontWeight: 400, lineHeight: 1.80, color: '#475569' }}>
                Every piece of patient data is encrypted at rest and in transit using AES-256. Role-based access controls ensure caregivers, coordinators, and administrators only see what they need to see. A full audit trail is maintained on every record interaction.
              </p>
            </div>
          </Reveal>

          {/* Right — badge grid */}
          <style>{`
            .badge-grid {
              display: grid;
              gap: 16px;
              justify-items: center;
              grid-template-columns: 1fr;
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

    {/* ══════════════════════════════════════════════════════════════
        7. CTA
    ══════════════════════════════════════════════════════════════ */}
    <section style={{ background: '#ffffff', padding: 'clamp(60px, 10vw, 120px) 0 clamp(70px, 12vw, 140px)', position: 'relative', overflow: 'hidden' }}>
      <DotGrid />
      <Watermark color="rgba(5,46,22,0.09)" />
      <RadialGlow top="-100px" right="-100px" size={600} opacity={0.07} />
      <RadialGlow bottom="-100px" left="-100px" size={500} opacity={0.06} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

        <Reveal delay={0}>
          <Eyebrow label="Get Started" />
        </Reveal>

        <Reveal delay={80}>
          <h2 style={{
            fontFamily: FI, fontWeight: 900,
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            letterSpacing: '-0.03em', lineHeight: 1.08,
            color: '#0f172a', maxWidth: '820px',
            margin: '0 auto 20px',
          }}>
            See What RAAH Can Do{' '}
            <span style={{ color: '#16a34a' }}>for Your Agency</span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p style={{
            fontFamily: FP, fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
            fontWeight: 500, lineHeight: 1.75, color: '#374151',
            maxWidth: '560px', margin: '0 auto 48px',
          }}>
            Book a personalised walkthrough with one of our implementation specialists. No commitment, no generic demo, just your specific workflows on our platform.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }} className="sm:flex-row sm:justify-center">
            <Link
              to="/demo"
              style={{
                fontFamily: FI, fontWeight: 700, fontSize: '0.9375rem',
                letterSpacing: '0.07em', textTransform: 'uppercase',
                padding: '18px 44px', borderRadius: '999px',
                background: '#16a34a', color: '#ffffff',
                border: '2px solid #16a34a',
                boxShadow: '0 8px 32px rgba(22,163,74,0.40)',
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                textDecoration: 'none', transition: 'all 0.25s ease', whiteSpace: 'nowrap',
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
                e.currentTarget.style.boxShadow   = '0 8px 32px rgba(22,163,74,0.40)';
              }}
            >
              Request a Demo
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link
              to="/contact"
              style={{
                fontFamily: FI, fontWeight: 700, fontSize: '0.9375rem',
                letterSpacing: '0.07em', textTransform: 'uppercase',
                padding: '18px 44px', borderRadius: '999px',
                background: 'transparent', color: '#16a34a',
                border: '2px solid #16a34a',
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                textDecoration: 'none', transition: 'all 0.25s ease', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = '#16a34a';
                e.currentTarget.style.color       = '#ffffff';
                e.currentTarget.style.transform   = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = 'transparent';
                e.currentTarget.style.color       = '#16a34a';
                e.currentTarget.style.transform   = 'translateY(0)';
              }}
            >
              Contact Us
            </Link>
          </div>
          <p style={{
            fontFamily: FP, fontSize: '0.8rem', fontWeight: 400,
            color: 'rgba(22,163,74,0.55)', marginTop: '20px', letterSpacing: '0.04em',
          }}>
            No credit card required. Live in under 24 hours.
          </p>
        </Reveal>

      </div>
    </section>

  </Layout>
);

export default AboutPage;