/**
 * SuccessPage.jsx — RAAH Technologies
 *
 * Post-payment success screen. Shown after Stripe redirects back.
 * Follows the full RAAH design system: brand green, #dff0df sections,
 * Inter 900 headings, Poppins body, dot-grid, radial glows, wave dividers.
 * All original API logic (useSearchParams, sessionId) preserved.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';

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
const Reveal = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
    }}>{children}</div>
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
const RadialGlow = ({ top, right, bottom, left, size = 420, opacity = 0.07 }) => (
  <div aria-hidden="true" style={{
    position: 'absolute', top, right, bottom, left,
    width: size, height: size, borderRadius: '50%',
    background: `radial-gradient(circle, rgba(22,163,74,${opacity}) 0%, transparent 70%)`,
    pointerEvents: 'none',
  }} />
);
const WaveDivider = ({ topColor, bottomColor, flip = false }) => (
  <div style={{ position: 'relative', height: 'clamp(40px, 6vw, 80px)', overflow: 'hidden', background: topColor, marginBottom: '-1px' }}>
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', transform: flip ? 'scaleX(-1)' : 'none' }}>
      <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill={bottomColor} />
    </svg>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Logic to verify session could go here if needed
  }, [sessionId]);

  const STEPS = [
    {
      number: '01',
      title: 'Check your inbox',
      body: 'A welcome email is on its way with your login credentials and unique agency portal link.',
    },
    {
      number: '02',
      title: 'Open your portal link',
      body: 'Click the unique link in the welcome email to reach your agency dashboard login screen.',
    },
    {
      number: '03',
      title: 'Log in and go live',
      body: 'Sign in with the temporary password provided. Your onboarding specialist will be in touch within one business day.',
    },
  ];

  return (
    <Layout>
      <style>{`
        .steps-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .steps-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
        }
      `}</style>

      {/* ══ HERO STRIP ══ */}
      <section style={{
        background: 'linear-gradient(160deg, #0d7a3e 0%, #16a34a 55%, #0d7a3e 100%)',
        padding: 'clamp(80px, 14vw, 130px) 0 clamp(90px, 16vw, 140px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <DotGrid color="rgba(74,222,128,0.08)" />
        <RadialGlow top="-80px" right="-80px" size={500} opacity={0.14} />
        <RadialGlow bottom="-80px" left="-80px" size={400} opacity={0.10} />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

          {/* Animated checkmark circle */}
          <Reveal delay={0}>
            <div style={{
              width: 'clamp(72px, 12vw, 96px)',
              height: 'clamp(72px, 12vw, 96px)',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              border: '2px solid rgba(255,255,255,0.30)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 28px',
              boxShadow: '0 0 0 16px rgba(255,255,255,0.06), 0 0 0 32px rgba(255,255,255,0.03)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" width="clamp(32px, 6vw, 44px)" height="clamp(32px, 6vw, 44px)">
                <path d="M5 13l4 4L19 7" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Reveal>

          {/* Eyebrow */}
          <Reveal delay={80}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '1.5px', background: '#ffffff', borderRadius: '999px' }} />
              <span style={{ fontFamily: FP, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffffff' }}>
                Payment Confirmed
              </span>
              <div style={{ width: '32px', height: '1.5px', background: '#ffffff', borderRadius: '999px' }} />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <h1 style={{
              fontFamily: FI, fontWeight: 900,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.03em', lineHeight: 1.05,
              color: '#ffffff', maxWidth: '860px',
              margin: '0 auto 20px',
            }}>
              Welcome to{' '}
              <span style={{ color: '#4ade80' }}>RAAH Technologies</span>
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p style={{
              fontFamily: FP, fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
              fontWeight: 500, lineHeight: 1.75,
              color: 'rgba(220,252,231,0.85)',
              maxWidth: '580px', margin: '0 auto',
            }}>
              Your agency account is being provisioned right now. Check your inbox for your login credentials and unique portal link.
            </p>
          </Reveal>

        </div>
      </section>

      <WaveDivider topColor="#0d7a3e" bottomColor="#dff0df" />

      {/* ══ NEXT STEPS ══ */}
      <section style={{
        background: '#dff0df',
        padding: 'clamp(70px, 12vw, 110px) 0 clamp(80px, 14vw, 130px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <DotGrid />
        <RadialGlow top="-60px" right="-60px" size={500} opacity={0.07} />
        <RadialGlow bottom="-60px" left="-60px" size={380} opacity={0.05} />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>

          {/* Section header */}
          <Reveal delay={0}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 8vw, 72px)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '32px', height: '1.5px', background: '#16a34a', borderRadius: '999px' }} />
                <span style={{ fontFamily: FP, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#16a34a' }}>
                  Getting Started
                </span>
                <div style={{ width: '32px', height: '1.5px', background: '#16a34a', borderRadius: '999px' }} />
              </div>
              <h2 style={{
                fontFamily: FI, fontWeight: 900,
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                letterSpacing: '-0.03em', lineHeight: 1.08,
                color: '#0f172a', maxWidth: '600px', margin: '0 auto 16px',
              }}>
                Your Next{' '}
                <span style={{ color: '#16a34a' }}>Three Steps</span>
              </h2>
              <p style={{
                fontFamily: FP, fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)',
                fontWeight: 500, color: '#374151', lineHeight: 1.75,
                maxWidth: '480px', margin: '0 auto',
              }}>
                You will be up and running within one business day. Here is exactly what happens next.
              </p>
            </div>
          </Reveal>

          {/* Step cards */}
          <div className="steps-grid">
            {STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 100}>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: 'clamp(28px, 4vw, 40px) clamp(24px, 3.5vw, 36px)',
                  border: '1px solid rgba(22,163,74,0.14)',
                  boxShadow: '0 4px 24px rgba(5,46,22,0.08)',
                  height: '100%', boxSizing: 'border-box',
                  position: 'relative', overflow: 'hidden',
                }}>
                  {/* Top accent */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, #16a34a, #22c55e)' }} />
                  {/* Step number */}
                  <div style={{
                    fontFamily: FI, fontWeight: 900,
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    color: 'rgba(22,163,74,0.12)',
                    letterSpacing: '-0.04em', lineHeight: 1,
                    marginBottom: '20px',
                  }}>
                    {step.number}
                  </div>
                  <h3 style={{
                    fontFamily: FI, fontWeight: 800,
                    fontSize: 'clamp(1rem, 2vw, 1.1875rem)',
                    color: '#0a0a0a', letterSpacing: '-0.01em',
                    marginBottom: '10px', lineHeight: 1.25,
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontFamily: FP, fontWeight: 500,
                    fontSize: 'clamp(0.875rem, 1.6vw, 0.9375rem)',
                    color: '#374151', lineHeight: 1.70,
                  }}>
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA + support */}
          <Reveal delay={400}>
            <div style={{ textAlign: 'center', marginTop: 'clamp(48px, 8vw, 72px)' }}>
              {/* Primary CTA */}
              <Link
                to="/"
                style={{
                  fontFamily: FI, fontWeight: 700, fontSize: '0.9375rem',
                  letterSpacing: '0.07em', textTransform: 'uppercase',
                  padding: '18px 44px', borderRadius: '999px',
                  background: '#16a34a', color: '#ffffff',
                  border: '2px solid #16a34a',
                  boxShadow: '0 8px 32px rgba(22,163,74,0.35)',
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  textDecoration: 'none', transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#16a34a';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#16a34a';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(22,163,74,0.35)';
                }}
              >
                Return to Homepage
                <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              {/* Support note */}
              <p style={{
                fontFamily: FP, fontSize: '0.875rem', fontWeight: 500,
                color: '#64748b', marginTop: '20px', lineHeight: 1.6,
              }}>
                Did not receive an email?{' '}
                <Link
                  to="/contact"
                  style={{ color: '#16a34a', fontWeight: 600, textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
                  onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}
                >
                  Contact our support team
                </Link>
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      <WaveDivider topColor="#dff0df" bottomColor="#0d7a3e" flip />

      {/* ══ WHAT TO EXPECT STRIP ══ */}
      <section style={{
        background: 'linear-gradient(160deg, #0d7a3e 0%, #16a34a 55%, #0d7a3e 100%)',
        padding: 'clamp(56px, 10vw, 80px) 0',
        position: 'relative', overflow: 'hidden',
      }}>
        <DotGrid color="rgba(74,222,128,0.08)" />
        <RadialGlow top="-60px" right="-60px" size={400} opacity={0.14} />
        <RadialGlow bottom="-60px" left="-60px" size={320} opacity={0.10} />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <style>{`
            .expect-grid {
              display: grid;
              gap: 1px;
              background: rgba(255,255,255,0.12);
              border-radius: 16px;
              overflow: hidden;
              grid-template-columns: repeat(2, 1fr);
            }
            @media (min-width: 768px) { .expect-grid { grid-template-columns: repeat(4, 1fr); } }
          `}</style>
          <div className="expect-grid">
            {[
              { value: '< 24hr',  label: 'Account Setup',       sub: 'From payment to live' },
              { value: '1-on-1',  label: 'Onboarding Session',  sub: 'With a named specialist' },
              { value: 'Zero',    label: 'IT Work Required',     sub: 'We handle everything' },
              { value: '30 days', label: 'Money-Back Guarantee', sub: 'If you are not satisfied' },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 60}>
                <div style={{
                  background: 'rgba(5,46,22,0.45)',
                  padding: 'clamp(24px, 4vw, 36px) clamp(16px, 3vw, 24px)',
                  textAlign: 'center', boxSizing: 'border-box',
                }}>
                  <p style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(1.375rem, 2.5vw, 2.25rem)', letterSpacing: '-0.03em', lineHeight: 1, color: '#ffffff', marginBottom: '8px' }}>
                    {stat.value}
                  </p>
                  <p style={{ fontFamily: FI, fontWeight: 700, fontSize: 'clamp(0.8125rem, 1.6vw, 0.9rem)', color: 'rgba(255,255,255,0.95)', marginBottom: '4px' }}>
                    {stat.label}
                  </p>
                  <p style={{ fontFamily: FP, fontSize: 'clamp(0.7rem, 1.4vw, 0.75rem)', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>
                    {stat.sub}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default SuccessPage;