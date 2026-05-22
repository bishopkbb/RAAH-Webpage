/**
 * QuotePage.jsx — RAAH Technologies
 *
 * Token-gated quote acceptance page. Accessed via private link sent by RAAH staff.
 * Follows the full RAAH design system: #dff0df light sections, brand green,
 * Inter 900 headings, Poppins body, dot-grid, radial glows, Reveal animations,
 * wave dividers. All API wiring preserved exactly.
 *
 * Sections:
 *   Loading / Error states — full-screen, on-brand
 *   Header     — dark green hero strip, agency name badge, heading
 *   Body       — 2-col: plan details + features LEFT / order summary + CTA RIGHT
 *   Guarantee  — dark green strip
 */

import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { publicApi } from '../api/services';
import { CheckCircle, Loader2, AlertTriangle, ShieldCheck, CreditCard, Lock } from 'lucide-react';
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

// ─── Check SVG ────────────────────────────────────────────────────────────────
const CheckSvg = ({ white = false }) => (
  <svg viewBox="0 0 20 20" fill="none" width="18" height="18" style={{ flexShrink: 0, marginTop: '2px' }}>
    <circle cx="10" cy="10" r="9" fill={white ? 'rgba(255,255,255,0.15)' : 'rgba(22,163,74,0.10)'} />
    <path d="M6 10L8.5 12.5L14 7" stroke={white ? '#ffffff' : '#16a34a'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Billing toggle ───────────────────────────────────────────────────────────
const BillingToggle = ({ selectedPlan, yearlyPlan, onToggle }) => {
  if (!yearlyPlan) return null;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      background: '#ffffff', borderRadius: '10px',
      border: '1.5px solid rgba(22,163,74,0.20)',
      padding: '4px', gap: '2px',
      boxShadow: '0 2px 8px rgba(5,46,22,0.08)',
    }}>
      {['monthly', 'yearly'].map(interval => {
        const active = selectedPlan.billing_interval === interval;
        return (
          <button
            key={interval}
            onClick={() => selectedPlan.billing_interval !== interval && onToggle()}
            style={{
              fontFamily: FI, fontWeight: 700, fontSize: '0.8rem',
              letterSpacing: '0.04em', textTransform: 'capitalize',
              padding: '8px 18px', borderRadius: '7px', border: 'none',
              background: active ? '#16a34a' : 'transparent',
              color: active ? '#ffffff' : '#64748b',
              cursor: active ? 'default' : 'pointer',
              transition: 'all 0.22s ease',
            }}
          >
            {interval}
          </button>
        );
      })}
    </div>
  );
};

// ─── Loading state ────────────────────────────────────────────────────────────
const LoadingState = () => (
  <Layout>
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(160deg, #0d7a3e 0%, #16a34a 55%, #0d7a3e 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <DotGrid color="rgba(74,222,128,0.08)" />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%',
          border: '3px solid rgba(74,222,128,0.30)',
          borderTopColor: '#4ade80',
          animation: 'quote-spin 0.9s linear infinite',
          margin: '0 auto 24px',
        }} />
        <p style={{ fontFamily: FP, fontWeight: 500, fontSize: '1rem', color: 'rgba(220,252,231,0.85)' }}>
          Loading your quote details...
        </p>
      </div>
      <style>{`@keyframes quote-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  </Layout>
);

// ─── Error state ──────────────────────────────────────────────────────────────
const ErrorState = ({ error }) => (
  <Layout>
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#dff0df', padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      <DotGrid />
      <RadialGlow top="-60px" right="-60px" size={400} opacity={0.07} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '480px', width: '100%' }}>
        <div style={{
          background: '#ffffff', borderRadius: '20px', padding: '48px 40px',
          border: '1px solid rgba(220,38,38,0.12)',
          boxShadow: '0 8px 48px rgba(5,46,22,0.10)',
        }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto 24px',
            background: 'rgba(220,38,38,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <AlertTriangle size={32} color="#dc2626" />
          </div>
          <h2 style={{ fontFamily: FI, fontWeight: 900, fontSize: '1.5rem', color: '#0a0a0a', marginBottom: '10px', letterSpacing: '-0.02em' }}>
            Unable to Load Quote
          </h2>
          <p style={{ fontFamily: FP, fontSize: '0.9375rem', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
            {error || 'This quote link is invalid or has expired. Please contact the RAAH team for a new link.'}
          </p>
          <Link to="/contact" style={{
            fontFamily: FI, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '13px 28px', borderRadius: '999px', background: '#16a34a',
            color: '#ffffff', border: '2px solid #16a34a', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.22s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#16a34a'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.color = '#ffffff'; }}
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  </Layout>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const QuotePage = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [agencyName, setAgencyName] = useState('');
  const [availablePlans, setAvailablePlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await publicApi.getQuoteDetails(token);
        const data = response.data.data;
        setAgencyName(data.agency_name);
        setAvailablePlans(data.plans);
        const defaultPlan = data.plans.find(p => p.id === data.default_plan_id);
        setSelectedPlan(defaultPlan || data.plans[0]);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Invalid or expired quote link.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
  }, [token]);

  const toggleInterval = () => {
    const targetInterval = selectedPlan.billing_interval === 'monthly' ? 'yearly' : 'monthly';
    const targetPlan = availablePlans.find(p => p.billing_interval === targetInterval);
    if (targetPlan) {
      setSelectedPlan(targetPlan);
    } else {
      toast.error(`Sorry, a ${targetInterval} option is not available for this plan.`);
    }
  };

  const handlePayment = async () => {
    setProcessing(true);
    try {
      const response = await publicApi.createCheckoutSession(token, { plan_id: selectedPlan.id });
      window.location.href = response.data.checkout_url;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment initialization failed.');
      setProcessing(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error || !selectedPlan) return <ErrorState error={error} />;

  const monthlyPlan = availablePlans.find(p => p.billing_interval === 'monthly');
  const yearlyPlan  = availablePlans.find(p => p.billing_interval === 'yearly');
  let savingsText = null;
  if (monthlyPlan && yearlyPlan && selectedPlan.billing_interval === 'yearly') {
    const savings = (monthlyPlan.price * 12) - yearlyPlan.price;
    if (savings > 0) savingsText = `Save $${savings.toFixed(0)} per year`;
  }

  const FEATURES = [
    'Unlimited Agency Users',
    'Caregiver Mobile App Access',
    'Real-Time EVV and GPS Verification',
    'Automated Billing and Invoicing',
    'Clinical Documentation (OASIS-E)',
    'HIPAA Compliant Secure Storage',
    '24/7 Priority Technical Support',
  ];

  return (
    <Layout>
      <style>{`
        .quote-grid { display: grid; gap: 24px; }
        @media (min-width: 768px) { .quote-grid { grid-template-columns: 1fr 360px; gap: 32px; align-items: start; } }
        @media (min-width: 1024px) { .quote-grid { grid-template-columns: 1fr 400px; gap: 40px; } }
        .plan-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
      `}</style>

      {/* ══ HERO STRIP ══ */}
      <section style={{
        background: 'linear-gradient(160deg, #0d7a3e 0%, #16a34a 55%, #0d7a3e 100%)',
        padding: 'clamp(60px, 10vw, 100px) 0 clamp(70px, 12vw, 110px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <DotGrid color="rgba(74,222,128,0.08)" />
        <RadialGlow top="-60px" right="-60px" size={500} opacity={0.14} />
        <RadialGlow bottom="-60px" left="-60px" size={400} opacity={0.10} />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Agency badge */}
          <Reveal delay={0}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.20)',
              borderRadius: '999px', padding: '8px 20px',
              marginBottom: '24px',
            }}>
              <CheckCircle size={15} color="#4ade80" />
              <span style={{ fontFamily: FP, fontWeight: 600, fontSize: '0.8125rem', color: '#ffffff', letterSpacing: '0.02em' }}>
                Quote ready for {agencyName}
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 style={{
              fontFamily: FI, fontWeight: 900,
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              letterSpacing: '-0.03em', lineHeight: 1.05,
              color: '#ffffff', margin: '0 auto 20px', maxWidth: '760px',
            }}>
              Complete Your{' '}
              <span style={{ color: '#4ade80' }}>Subscription</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p style={{
              fontFamily: FP, fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              fontWeight: 500, lineHeight: 1.75,
              color: 'rgba(220,252,231,0.85)',
              maxWidth: '540px', margin: '0 auto',
            }}>
              Review your plan details and proceed to secure payment to activate your agency account.
            </p>
          </Reveal>
        </div>
      </section>

      <WaveDivider topColor="#0d7a3e" bottomColor="#dff0df" />

      {/* ══ BODY ══ */}
      <section style={{ background: '#dff0df', padding: 'clamp(60px, 10vw, 100px) 0 clamp(80px, 14vw, 130px)', position: 'relative', overflow: 'hidden' }}>
        <DotGrid />
        <RadialGlow top="-60px" right="-60px" size={500} opacity={0.07} />
        <RadialGlow bottom="-60px" left="-60px" size={380} opacity={0.05} />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <div className="quote-grid">

            {/* ── LEFT — Plan details card ── */}
            <Reveal delay={0}>
              <div style={{
                background: '#ffffff', borderRadius: '20px',
                border: '1px solid rgba(22,163,74,0.14)',
                boxShadow: '0 8px 48px rgba(5,46,22,0.10), 0 2px 12px rgba(5,46,22,0.06)',
                overflow: 'hidden',
              }}>
                {/* Card accent */}
                <div style={{ height: '3px', background: 'linear-gradient(to right, #16a34a, #4ade80, #16a34a)' }} />

                {/* Plan header */}
                <div style={{
                  background: 'rgba(22,163,74,0.04)', borderBottom: '1px solid rgba(22,163,74,0.10)',
                  padding: 'clamp(24px, 4vw, 36px) clamp(24px, 4vw, 40px)',
                }}>
                  <div className="plan-header">
                    <div>
                      <p style={{ fontFamily: FP, fontWeight: 600, fontSize: '0.75rem', color: '#16a34a', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px' }}>
                        Selected Plan
                      </p>
                      <h2 style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        {selectedPlan.name}
                      </h2>
                    </div>
                    <BillingToggle selectedPlan={selectedPlan} yearlyPlan={yearlyPlan} onToggle={toggleInterval} />
                  </div>
                </div>

                {/* Price + features */}
                <div style={{ padding: 'clamp(28px, 5vw, 40px) clamp(24px, 4vw, 40px)' }}>
                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1 }}>
                      ${Number(selectedPlan.price).toFixed(2)}
                    </span>
                    <span style={{ fontFamily: FP, fontWeight: 500, fontSize: '1.0625rem', color: '#64748b', textTransform: 'capitalize' }}>
                      / {selectedPlan.billing_interval}
                    </span>
                  </div>

                  {/* Savings badge */}
                  {savingsText ? (
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.18)',
                      borderRadius: '999px', padding: '5px 14px', marginBottom: '36px',
                    }}>
                      <span style={{ fontSize: '14px' }}>🎉</span>
                      <span style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.8125rem', color: '#16a34a' }}>{savingsText}</span>
                    </div>
                  ) : (
                    <div style={{ marginBottom: '36px' }} />
                  )}

                  {/* Features list */}
                  <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.8125rem', color: '#0a0a0a', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '18px' }}>
                    Plan Includes
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
                    {FEATURES.map((feature, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <CheckSvg />
                        <span style={{ fontFamily: FP, fontWeight: 500, fontSize: '0.9375rem', color: '#1e293b', lineHeight: 1.5 }}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Satisfaction guarantee */}
                  <div style={{
                    background: 'rgba(22,163,74,0.04)', borderRadius: '14px', padding: '18px 20px',
                    border: '1px solid rgba(22,163,74,0.12)',
                    display: 'flex', alignItems: 'flex-start', gap: '14px',
                  }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                      background: 'rgba(22,163,74,0.10)', border: '1.5px solid rgba(22,163,74,0.22)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <ShieldCheck size={20} color="#16a34a" />
                    </div>
                    <div>
                      <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.9375rem', color: '#0a0a0a', marginBottom: '4px' }}>
                        30-Day Satisfaction Guarantee
                      </p>
                      <p style={{ fontFamily: FP, fontWeight: 400, fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                        Cancel anytime. If you are not fully satisfied within the first 30 days, we will refund your subscription in full.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── RIGHT — Order summary + CTA (sticky on desktop) ── */}
            <Reveal delay={120}>
              <div style={{ position: 'sticky', top: '120px' }}>
                <div style={{
                  background: '#ffffff', borderRadius: '20px',
                  border: '1px solid rgba(22,163,74,0.14)',
                  boxShadow: '0 8px 48px rgba(5,46,22,0.10), 0 2px 12px rgba(5,46,22,0.06)',
                  overflow: 'hidden',
                }}>
                  <div style={{ height: '3px', background: 'linear-gradient(to right, #16a34a, #4ade80, #16a34a)' }} />
                  <div style={{ padding: 'clamp(24px, 4vw, 32px)' }}>

                    <h3 style={{ fontFamily: FI, fontWeight: 800, fontSize: '1.25rem', color: '#0a0a0a', marginBottom: '24px', letterSpacing: '-0.02em' }}>
                      Order Summary
                    </h3>

                    {/* Summary rows */}
                    <div style={{ borderTop: '1px solid rgba(22,163,74,0.10)', marginBottom: '4px' }}>
                      {[
                        { label: 'Plan', value: selectedPlan.name },
                        { label: 'Billing', value: selectedPlan.billing_interval.charAt(0).toUpperCase() + selectedPlan.billing_interval.slice(1) },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(22,163,74,0.08)' }}>
                          <span style={{ fontFamily: FP, fontWeight: 500, fontSize: '0.9rem', color: '#64748b' }}>{label}</span>
                          <span style={{ fontFamily: FI, fontWeight: 600, fontSize: '0.9rem', color: '#0a0a0a' }}>{value}</span>
                        </div>
                      ))}
                      {/* Total */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0 20px' }}>
                        <span style={{ fontFamily: FI, fontWeight: 800, fontSize: '1.0625rem', color: '#0a0a0a' }}>Total Due</span>
                        <span style={{ fontFamily: FI, fontWeight: 900, fontSize: '1.5rem', color: '#0a6b30', letterSpacing: '-0.02em' }}>
                          ${Number(selectedPlan.price).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Savings callout inside summary */}
                    {savingsText && (
                      <div style={{ background: 'rgba(22,163,74,0.06)', borderRadius: '10px', padding: '11px 14px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px' }}>🎉</span>
                        <span style={{ fontFamily: FP, fontWeight: 600, fontSize: '0.8125rem', color: '#16a34a' }}>{savingsText} with annual billing</span>
                      </div>
                    )}

                    {/* Pay button */}
                    <button
                      onClick={handlePayment}
                      disabled={processing}
                      style={{
                        width: '100%', fontFamily: FI, fontWeight: 700, fontSize: '0.9375rem',
                        letterSpacing: '0.07em', textTransform: 'uppercase',
                        padding: '16px 24px', borderRadius: '999px',
                        background: processing ? '#15803d' : '#16a34a',
                        color: '#ffffff', border: '2px solid #16a34a',
                        boxShadow: '0 6px 24px rgba(22,163,74,0.35)',
                        cursor: processing ? 'not-allowed' : 'pointer',
                        transition: 'all 0.25s ease', marginBottom: '16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                        boxSizing: 'border-box',
                      }}
                      onMouseEnter={e => { if (!processing) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#16a34a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'none'; } }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(22,163,74,0.35)'; }}
                    >
                      {processing ? (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'quote-spin 0.9s linear infinite' }}>
                            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.30)" strokeWidth="3"/>
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Proceed to Payment
                          <CreditCard size={18} />
                        </>
                      )}
                    </button>

                    {/* SSL badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}>
                      <Lock size={12} color="#94a3b8" />
                      <span style={{ fontFamily: FP, fontSize: '0.78rem', color: '#94a3b8' }}>
                        Secure payment via Stripe — SSL encrypted
                      </span>
                    </div>

                  </div>
                </div>

                {/* Support note below sticky card */}
                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                  <p style={{ fontFamily: FP, fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.6 }}>
                    Questions about this quote?{' '}
                    <Link to="/contact" style={{ color: '#16a34a', fontWeight: 600, textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
                      onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}
                    >
                      Contact our team
                    </Link>
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <WaveDivider topColor="#dff0df" bottomColor="#0d7a3e" flip />

      {/* ══ TRUST STRIP ══ */}
      <section style={{
        background: 'linear-gradient(160deg, #0d7a3e 0%, #16a34a 55%, #0d7a3e 100%)',
        padding: 'clamp(56px, 10vw, 80px) 0', position: 'relative', overflow: 'hidden',
      }}>
        <DotGrid color="rgba(74,222,128,0.08)" />
        <RadialGlow top="-60px" right="-60px" size={400} opacity={0.14} />
        <RadialGlow bottom="-60px" left="-60px" size={320} opacity={0.10} />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <style>{`
            .trust-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: rgba(255,255,255,0.12); border-radius: 16px; overflow: hidden; }
            @media (min-width: 768px) { .trust-grid { grid-template-columns: repeat(4, 1fr); } }
            @keyframes quote-spin { to { transform: rotate(360deg); } }
          `}</style>
          <div className="trust-grid">
            {[
              { value: '30 days', label: 'Money-Back Guarantee', sub: 'No questions asked' },
              { value: '< 24hr', label: 'Setup Time', sub: 'From payment to live' },
              { value: 'Zero', label: 'Hidden Fees', sub: 'All modules included' },
              { value: '1-on-1', label: 'Onboarding Session', sub: 'Dedicated specialist' },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 60}>
                <div style={{ background: 'rgba(5,46,22,0.45)', padding: 'clamp(24px, 4vw, 36px) clamp(16px, 3vw, 24px)', textAlign: 'center', boxSizing: 'border-box' }}>
                  <p style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(1.375rem, 2.5vw, 2.25rem)', letterSpacing: '-0.03em', lineHeight: 1, color: '#ffffff', marginBottom: '8px' }}>
                    {stat.value}
                  </p>
                  <p style={{ fontFamily: FI, fontWeight: 700, fontSize: 'clamp(0.8125rem, 1.6vw, 0.9rem)', color: 'rgba(255,255,255,0.95)', marginBottom: '4px' }}>{stat.label}</p>
                  <p style={{ fontFamily: FP, fontSize: 'clamp(0.7rem, 1.4vw, 0.75rem)', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>{stat.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default QuotePage;