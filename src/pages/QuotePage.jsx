/**
 * QuotePage.jsx — RAAH Technologies
 *
 * Token-gated quote acceptance page. Accessed via private link sent by RAAH staff.
 *
 * ─── API shapes (verified against Swagger at http://3.86.179.13:3000/api/docs) ─
 *
 * GET /website/quote?token=
 *   200 → { agencyName, contactName, patientRange, quotedPrice, expiresAt, alreadyPaid }
 *   Flat object — no nested data property, no plans array, no billing_interval toggle.
 *   quotedPrice is a single number. There is no monthly/yearly toggle concept.
 *   404 → invalid or unknown token
 *   410 → expired or already paid
 *
 * POST /website/quote/pay
 *   Body → { token, plan_id, stripePaymentMethodId? }
 *   200  → { checkoutUrl, quotedPrice, message }
 *   Note: checkoutUrl is camelCase — not checkout_url
 *   404 → invalid token
 *   409 → already paid
 *   410 → expired
 *
 * Design: RAAH design system — #dff0df light, dark green gradient, Inter 900,
 * Poppins body, dot-grid, radial glows, WaveDividers, Reveal animations.
 */

import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { publicApi } from '../api/services';
import { CheckCircle, AlertTriangle, ShieldCheck, CreditCard, Lock, Clock } from 'lucide-react';
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
const CheckSvg = () => (
  <svg viewBox="0 0 20 20" fill="none" width="18" height="18" style={{ flexShrink: 0, marginTop: '2px' }}>
    <circle cx="10" cy="10" r="9" fill="rgba(22,163,74,0.10)" />
    <path d="M6 10L8.5 12.5L14 7" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
const ErrorState = ({ error, statusCode }) => {
  const isExpired  = statusCode === 410;
  const isNotFound = statusCode === 404;

  const title = isExpired
    ? 'Quote Has Expired'
    : isNotFound
      ? 'Quote Not Found'
      : 'Unable to Load Quote';

  const body = isExpired
    ? 'This quote link has either expired or payment has already been completed. Please contact the RAAH team for a new quote.'
    : isNotFound
      ? 'This quote link is invalid. Please check the link in your email or contact the RAAH team.'
      : error || 'Something went wrong loading your quote. Please try again or contact support.';

  return (
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
            border: isExpired ? '1px solid rgba(245,158,11,0.20)' : '1px solid rgba(220,38,38,0.12)',
            boxShadow: '0 8px 48px rgba(5,46,22,0.10)',
          }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto 24px',
              background: isExpired ? 'rgba(245,158,11,0.08)' : 'rgba(220,38,38,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {isExpired
                ? <Clock size={32} color="#d97706" />
                : <AlertTriangle size={32} color="#dc2626" />
              }
            </div>
            <h2 style={{ fontFamily: FI, fontWeight: 900, fontSize: '1.5rem', color: '#0a0a0a', marginBottom: '10px', letterSpacing: '-0.02em' }}>
              {title}
            </h2>
            <p style={{ fontFamily: FP, fontSize: '0.9375rem', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
              {body}
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
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const QuotePage = () => {
  const { token } = useParams();
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Flat quote data — matches GET /website/quote response exactly
  const [quote, setQuote] = useState(null);
  // quote shape: { agencyName, contactName, patientRange, quotedPrice, expiresAt, alreadyPaid }

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await publicApi.getQuoteDetails(token);
        // Response is a flat object — not nested under .data.data
        const data = response.data;
        if (data.alreadyPaid) {
          setStatusCode(410);
          setError('Payment has already been completed for this quote.');
          return;
        }
        setQuote(data);
      } catch (err) {
        const code = err.statusCode || err.response?.status || 0;
        setStatusCode(code);
        setError(err.message || 'Invalid or expired quote link.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
  }, [token]);

  const handlePayment = async () => {
    setProcessing(true);
    try {
      const response = await publicApi.createCheckoutSession(token, { plan_id: 1 });
      // Backend returns checkoutUrl (camelCase) — not checkout_url
      const { checkoutUrl } = response.data;
      if (!checkoutUrl) {
        throw new Error('No checkout URL returned from server.');
      }
      window.location.href = checkoutUrl;
    } catch (err) {
      if (err.statusCode === 409) {
        toast.error('Payment has already been completed for this quote.');
      } else if (err.statusCode === 410) {
        toast.error('This quote has expired. Please contact support for a new one.');
      } else {
        toast.error(err.message || 'Payment initialization failed. Please try again.');
      }
      setProcessing(false);
    }
  };

  // Format expiry date
  const formatExpiry = (iso) => {
    if (!iso) return null;
    try {
      return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      });
    } catch {
      return null;
    }
  };

  if (loading) return <LoadingState />;
  if (error || !quote) return <ErrorState error={error} statusCode={statusCode} />;

  const expiryDate = formatExpiry(quote.expiresAt);

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
        .quote-grid {
          display: grid;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .quote-grid { grid-template-columns: 1fr 360px; gap: 32px; align-items: start; }
        }
        @media (min-width: 1024px) {
          .quote-grid { grid-template-columns: 1fr 400px; gap: 40px; }
        }
        @keyframes quote-spin { to { transform: rotate(360deg); } }
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
          <Reveal delay={0}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.20)',
              borderRadius: '999px', padding: '8px 20px', marginBottom: '24px',
            }}>
              <CheckCircle size={15} color="#4ade80" />
              <span style={{ fontFamily: FP, fontWeight: 600, fontSize: '0.8125rem', color: '#ffffff', letterSpacing: '0.02em' }}>
                Quote ready for {quote.agencyName}
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
              Review your personalised quote and proceed to secure payment to activate your agency account.
            </p>
          </Reveal>
        </div>
      </section>

      <WaveDivider topColor="#0d7a3e" bottomColor="#dff0df" />

      {/* ══ BODY ══ */}
      <section style={{
        background: '#dff0df',
        padding: 'clamp(60px, 10vw, 100px) 0 clamp(80px, 14vw, 130px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <DotGrid />
        <RadialGlow top="-60px" right="-60px" size={500} opacity={0.07} />
        <RadialGlow bottom="-60px" left="-60px" size={380} opacity={0.05} />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <div className="quote-grid">

            {/* ── LEFT — Quote details ── */}
            <Reveal delay={0}>
              <div style={{
                background: '#ffffff', borderRadius: '20px',
                border: '1px solid rgba(22,163,74,0.14)',
                boxShadow: '0 8px 48px rgba(5,46,22,0.10), 0 2px 12px rgba(5,46,22,0.06)',
                overflow: 'hidden',
              }}>
                <div style={{ height: '3px', background: 'linear-gradient(to right, #16a34a, #4ade80, #16a34a)' }} />

                {/* Quote header */}
                <div style={{
                  background: 'rgba(22,163,74,0.04)',
                  borderBottom: '1px solid rgba(22,163,74,0.10)',
                  padding: 'clamp(24px, 4vw, 36px) clamp(24px, 4vw, 40px)',
                }}>
                  <p style={{ fontFamily: FP, fontWeight: 600, fontSize: '0.75rem', color: '#16a34a', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Your Custom Quote
                  </p>
                  <h2 style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '6px' }}>
                    {quote.agencyName}
                  </h2>
                  <p style={{ fontFamily: FP, fontWeight: 500, fontSize: '0.9375rem', color: '#64748b' }}>
                    Prepared for {quote.contactName}
                  </p>
                </div>

                {/* Quote body */}
                <div style={{ padding: 'clamp(28px, 5vw, 40px) clamp(24px, 4vw, 40px)' }}>

                  {/* Quoted price */}
                  <div style={{ marginBottom: '8px' }}>
                    <p style={{ fontFamily: FP, fontWeight: 600, fontSize: '0.8rem', color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Quoted Price
                    </p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1 }}>
                        ${Number(quote.quotedPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Quote meta */}
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '36px', paddingBottom: '28px', borderBottom: '1px solid rgba(22,163,74,0.10)' }}>
                    <div>
                      <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Patient Volume
                      </p>
                      <p style={{ fontFamily: FP, fontWeight: 600, fontSize: '0.9375rem', color: '#0a0a0a' }}>
                        {quote.patientRange} patients
                      </p>
                    </div>
                    {expiryDate && (
                      <div>
                        <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Quote Valid Until
                        </p>
                        <p style={{ fontFamily: FP, fontWeight: 600, fontSize: '0.9375rem', color: '#0a0a0a' }}>
                          {expiryDate}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Features */}
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

                  {/* Guarantee */}
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
                        { label: 'Agency',         value: quote.agencyName },
                        { label: 'Contact',         value: quote.contactName },
                        { label: 'Patient Range',   value: `${quote.patientRange} patients` },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(22,163,74,0.08)' }}>
                          <span style={{ fontFamily: FP, fontWeight: 500, fontSize: '0.875rem', color: '#64748b' }}>{label}</span>
                          <span style={{ fontFamily: FI, fontWeight: 600, fontSize: '0.875rem', color: '#0a0a0a', textAlign: 'right', maxWidth: '60%' }}>{value}</span>
                        </div>
                      ))}

                      {/* Total */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0 20px' }}>
                        <span style={{ fontFamily: FI, fontWeight: 800, fontSize: '1.0625rem', color: '#0a0a0a' }}>Total Due</span>
                        <span style={{ fontFamily: FI, fontWeight: 900, fontSize: '1.5rem', color: '#0a6b30', letterSpacing: '-0.02em' }}>
                          ${Number(quote.quotedPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    {/* Expiry notice */}
                    {expiryDate && (
                      <div style={{
                        background: 'rgba(245,158,11,0.06)', borderRadius: '10px',
                        padding: '10px 14px', marginBottom: '20px',
                        border: '1px solid rgba(245,158,11,0.18)',
                        display: 'flex', alignItems: 'center', gap: '8px',
                      }}>
                        <Clock size={14} color="#d97706" />
                        <span style={{ fontFamily: FP, fontWeight: 500, fontSize: '0.8125rem', color: '#92400e' }}>
                          Quote expires {expiryDate}
                        </span>
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

                {/* Support note */}
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
            .trust-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 1px;
              background: rgba(255,255,255,0.12);
              border-radius: 16px;
              overflow: hidden;
            }
            @media (min-width: 768px) { .trust-grid { grid-template-columns: repeat(4, 1fr); } }
          `}</style>
          <div className="trust-grid">
            {[
              { value: '30 days', label: 'Money-Back Guarantee', sub: 'No questions asked' },
              { value: '< 24hr',  label: 'Setup Time',           sub: 'From payment to live' },
              { value: 'Zero',    label: 'Hidden Fees',           sub: 'All modules included' },
              { value: '1-on-1',  label: 'Onboarding Session',   sub: 'Dedicated specialist' },
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