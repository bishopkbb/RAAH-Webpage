/**
 * PricingRequestPage.jsx — RAAH Technologies
 *
 * World-class Pricing Request page. Follows the RAAH design system exactly:
 *   Inter 900 headings, Poppins body, #dff0df light sections,
 *   #16a34a brand green, dot-grid, Reveal animations, wave dividers.
 *
 * Sections:
 *   1. Hero         — dark green overlay, eyebrow, confident heading
 *   2. Body         — 2-col sticky: left = value props + trust, right = form card
 *   3. Strip        — dark green, 4 pricing promise stats
 *
 * API preserved:
 *   publicApi.submitPricingRequest(payload) + reCAPTCHA + toast
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
const Eyebrow = ({ label, light = false }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
    <div style={{ width: '32px', height: '1.5px', background: light ? '#ffffff' : '#16a34a', borderRadius: '999px' }} />
    <span style={{ fontFamily: FP, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: light ? '#ffffff' : '#16a34a' }}>{label}</span>
    <div style={{ width: '32px', height: '1.5px', background: light ? '#ffffff' : '#16a34a', borderRadius: '999px' }} />
  </div>
);
const WaveDivider = ({ topColor, bottomColor, flip = false }) => (
  <div style={{ position: 'relative', height: '80px', overflow: 'hidden', background: topColor, marginBottom: '-1px' }}>
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', transform: flip ? 'scaleX(-1)' : 'none' }}>
      <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill={bottomColor} />
    </svg>
  </div>
);

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconAllIn = ({ color = '#16a34a' }) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <rect x="2" y="3" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5"/>
    <path d="M8 21h8M12 17v4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 8h10M7 11h6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconScale = ({ color = '#16a34a' }) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <path d="M3 17l4-4 4 4 4-6 4 3" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21H3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconShield = ({ color = '#16a34a' }) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <path d="M12 2L4 5.5V11c0 5.25 3.5 9.74 8 11 4.5-1.26 8-5.75 8-11V5.5L12 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconSupport = ({ color = '#16a34a' }) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5"/>
    <path d="M12 8v4l3 3" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.5 19.5C9.5 18.5 10.7 18 12 18s2.5.5 3.5 1.5" stroke={color} strokeWidth="1.25" strokeLinecap="round" opacity="0.6"/>
  </svg>
);
const CheckSvg = () => (
  <svg viewBox="0 0 16 16" fill="none" width="14" height="14" style={{ flexShrink: 0, marginTop: '2px' }}>
    <path d="M3 8L6.5 11.5L13 5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Value prop card — extracted (no hooks in map) ────────────────────────────
const ValuePropCard = ({ icon, title, body, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', gap: '16px', alignItems: 'flex-start',
          padding: '22px',
          borderRadius: '14px',
          background: hovered ? 'rgba(22,163,74,0.06)' : 'transparent',
          border: `1px solid ${hovered ? 'rgba(22,163,74,0.20)' : 'transparent'}`,
          transition: 'all 0.25s ease',
          cursor: 'default',
        }}
      >
        <div style={{
          width: '52px', height: '52px', borderRadius: '13px', flexShrink: 0,
          background: hovered ? '#16a34a' : 'rgba(22,163,74,0.08)',
          border: `1.5px solid ${hovered ? '#16a34a' : 'rgba(22,163,74,0.20)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.25s ease',
        }}>
          {React.createElement(icon, { color: hovered ? '#ffffff' : '#16a34a' })}
        </div>
        <div>
          <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '1.0625rem', color: '#0a0a0a', marginBottom: '5px' }}>{title}</p>
          <p style={{ fontFamily: FP, fontWeight: 500, fontSize: '0.9375rem', color: '#374151', lineHeight: 1.65 }}>{body}</p>
        </div>
      </div>
    </Reveal>
  );
};

// ─── Input styles ─────────────────────────────────────────────────────────────
const inputStyle = {
  width: '100%', fontFamily: FP, fontSize: '1.0625rem', fontWeight: 400,
  padding: '16px 20px', borderRadius: '12px', outline: 'none',
  border: '1.5px solid rgba(22,163,74,0.22)',
  color: '#0a0a0a', background: '#f8fffc',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  boxSizing: 'border-box',
};
const labelStyle = {
  fontFamily: FI, fontSize: '0.8125rem', fontWeight: 700,
  color: '#0a0a0a', marginBottom: '9px', display: 'block',
  letterSpacing: '0.05em', textTransform: 'uppercase',
};
const onFocus = e => {
  e.target.style.borderColor = '#16a34a';
  e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.10)';
};
const onBlur = e => {
  e.target.style.borderColor = 'rgba(22,163,74,0.18)';
  e.target.style.boxShadow = 'none';
};

// ─── Success state ────────────────────────────────────────────────────────────
const SuccessState = () => (
  <div style={{ textAlign: 'center', padding: '48px 32px' }}>
    <div style={{
      width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 24px',
      background: 'linear-gradient(135deg, #0d7a3e 0%, #16a34a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 12px 40px rgba(22,163,74,0.35)',
    }}>
      <svg viewBox="0 0 24 24" fill="none" width="36" height="36">
        <path d="M5 13l4 4L19 7" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <h3 style={{ fontFamily: FI, fontWeight: 800, fontSize: '1.625rem', color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.02em' }}>
      Quote Request Received
    </h3>
    <p style={{ fontFamily: FP, fontSize: '1rem', color: '#475569', lineHeight: 1.75, maxWidth: '340px', margin: '0 auto 32px' }}>
      Our team will review your agency details and send a custom proposal within one business day.
    </p>
    {/* What happens next */}
    <div style={{ background: '#dff0df', borderRadius: '14px', padding: '20px 24px', marginBottom: '28px', textAlign: 'left' }}>
      <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.8rem', color: '#16a34a', marginBottom: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>What happens next</p>
      {[
        'We review your patient volume and module needs',
        'A custom proposal is emailed within 24 hours',
        'We schedule a brief call to walk through pricing',
        'You approve and we handle the full setup',
      ].map((step, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: i < 3 ? '10px' : 0 }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
            <span style={{ fontFamily: FI, fontWeight: 900, fontSize: '0.65rem', color: '#ffffff' }}>{i + 1}</span>
          </div>
          <p style={{ fontFamily: FP, fontSize: '0.875rem', color: '#374151', lineHeight: 1.5 }}>{step}</p>
        </div>
      ))}
    </div>
    <Link to="/" style={{
      fontFamily: FI, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase',
      padding: '13px 28px', borderRadius: '999px', background: 'transparent',
      color: '#16a34a', border: '2px solid #16a34a', textDecoration: 'none',
      display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.22s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.color = '#ffffff'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#16a34a'; }}
    >
      Return to Homepage
    </Link>
  </div>
);

// ─── Validation ──────────────────────────────────────────────────────────────
const validate = (fields) => {
  const errs = {};
  if (!fields.agency_name.trim())    errs.agency_name    = 'Agency name is required.';
  if (!fields.contact_name.trim())   errs.contact_name   = 'Contact name is required.';
  if (!fields.contact_email.trim())  errs.contact_email  = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.contact_email))
                                     errs.contact_email  = 'Enter a valid email address.';
  if (fields.contact_phone && !/^[\d\s+\-()]{7,20}$/.test(fields.contact_phone))
                                     errs.contact_phone  = 'Enter a valid phone number.';
  return errs;
};

const FieldError = ({ msg }) => msg ? (
  <p style={{ fontFamily: FP, fontSize: '0.78rem', color: '#dc2626', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
    <svg viewBox="0 0 16 16" fill="none" width="12" height="12" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.5"/>
      <path d="M8 5v3M8 11v.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    {msg}
  </p>
) : null;

// ─── Pricing Form ─────────────────────────────────────────────────────────────
const PricingForm = () => {
  const [fields, setFields] = useState({
    agency_name: '', contact_name: '', contact_email: '',
    contact_phone: '', estimated_patients: '', notes: '',
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
      recaptcha_token: recaptchaToken,
    };
    try {
      await publicApi.submitPricingRequest(payload);
      setSubmitted(true);
      toast.success('Quote request sent successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Submission failed. Please try again.';
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

  const fieldStyle = name => ({ ...inputStyle, borderColor: errors[name] ? '#dc2626' : undefined });

  return (
    <div style={{ padding: '52px 52px 48px' }}>
      <h2 style={{ fontFamily: FI, fontWeight: 900, fontSize: '1.875rem', color: '#0a0a0a', marginBottom: '8px', letterSpacing: '-0.02em' }}>
        Request a Custom Quote
      </h2>
      <p style={{ fontFamily: FP, fontSize: '1rem', color: '#374151', fontWeight: 500, marginBottom: '40px', lineHeight: 1.6 }}>
        Takes 60 seconds. A tailored proposal arrives within one business day.
      </p>

      {/* Row 1 — Agency + Contact */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '22px' }} className="pricing-row">
        <div>
          <label style={labelStyle} htmlFor="p_agency_name">Agency Name *</label>
          <input id="p_agency_name" name="agency_name" type="text" required placeholder="Caring Hearts Health" value={fields.agency_name} onChange={handleChange} style={fieldStyle('agency_name')} onFocus={onFocus} onBlur={handleBlurField} />
          <FieldError msg={errors.agency_name} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="p_contact_name">Contact Name *</label>
          <input id="p_contact_name" name="contact_name" type="text" required placeholder="Sarah Johnson" value={fields.contact_name} onChange={handleChange} style={fieldStyle('contact_name')} onFocus={onFocus} onBlur={handleBlurField} />
          <FieldError msg={errors.contact_name} />
        </div>
      </div>

      {/* Row 2 — Email + Phone */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '22px' }} className="pricing-row">
        <div>
          <label style={labelStyle} htmlFor="p_contact_email">Work Email *</label>
          <input id="p_contact_email" name="contact_email" type="email" required placeholder="sarah@agency.org" value={fields.contact_email} onChange={handleChange} style={fieldStyle('contact_email')} onFocus={onFocus} onBlur={handleBlurField} />
          <FieldError msg={errors.contact_email} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="p_contact_phone">Phone Number</label>
          <input id="p_contact_phone" name="contact_phone" type="tel" placeholder="+1 (720) 000-0000" value={fields.contact_phone} onChange={handleChange} style={fieldStyle('contact_phone')} onFocus={onFocus} onBlur={handleBlurField} />
          <FieldError msg={errors.contact_phone} />
        </div>
      </div>

      {/* Patient count */}
      <div style={{ marginBottom: '22px' }}>
        <label style={labelStyle} htmlFor="p_estimated_patients">Active Patient Count</label>
        <input id="p_estimated_patients" name="estimated_patients" type="number" min="1" placeholder="e.g. 75" value={fields.estimated_patients} onChange={handleChange} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        <p style={{ fontFamily: FP, fontSize: '0.8125rem', color: '#16a34a', fontWeight: 600, marginTop: '7px' }}>
          We use this to recommend the most cost-effective tier for your volume.
        </p>
      </div>

      {/* Notes / challenges */}
      <div style={{ marginBottom: '24px' }}>
        <label style={labelStyle} htmlFor="p_notes">Specific Needs or Questions</label>
        <textarea
          id="p_notes" name="notes" rows={4}
          placeholder="Tell us about your current billing setup, state requirements, or any operational challenges you want to solve..."
          value={fields.notes} onChange={handleChange}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
          onFocus={onFocus} onBlur={onBlur}
        />
      </div>

      {/* What's included callout */}
      <div style={{
        background: 'rgba(22,163,74,0.05)',
        border: '1px solid rgba(22,163,74,0.14)',
        borderRadius: '12px', padding: '16px 18px', marginBottom: '24px',
      }}>
        <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.78rem', color: '#16a34a', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>
          Every RAAH plan includes
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }} className="pricing-row">
          {[
            'Unlimited users',
            'Mobile EVV app',
            'Automated billing',
            'Dedicated onboarding',
            'HIPAA compliance tools',
            'Priority support',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <CheckSvg />
              <span style={{ fontFamily: FP, fontSize: '0.875rem', color: '#1e293b', fontWeight: 500 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* reCAPTCHA */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 20px' }}>
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
        style={{
          width: '100%', fontFamily: FI, fontWeight: 700, fontSize: '0.9375rem',
          letterSpacing: '0.07em', textTransform: 'uppercase',
          padding: '16px 32px', borderRadius: '999px',
          background: submitting ? '#15803d' : '#16a34a',
          color: '#ffffff', border: '2px solid #16a34a',
          boxShadow: '0 6px 24px rgba(22,163,74,0.30)',
          cursor: submitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.25s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
        }}
        onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#16a34a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'none'; } }}
        onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(22,163,74,0.30)'; }}
      >
        {submitting ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'price-spin 1s linear infinite' }}>
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.30)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            Sending Request...
          </>
        ) : (
          <>
            Get My Custom Quote
            <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>

      <p style={{ fontFamily: FP, fontSize: '0.875rem', color: '#475569', textAlign: 'center', marginTop: '18px' }}>
        No commitment. No credit card. Custom proposal within 24 hours.
      </p>

      <style>{`
        @keyframes price-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const PricingRequestPage = () => (
  <Layout>

    {/* ══ HERO ══ */}
    <section style={{ position: 'relative', minHeight: '52vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <img
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000&h=800&crop=top"
        alt="RAAH Technologies pricing"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,46,22,0.68)' }} aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(5,46,22,0.55) 100%)' }} aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} aria-hidden="true" />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '120px 24px' }}>
        <Reveal delay={0}>
          <Eyebrow label="Transparent Pricing" light />
        </Reveal>
        <Reveal delay={80}>
          <h1 style={{
            fontFamily: FI, fontWeight: 900,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            letterSpacing: '-0.03em', lineHeight: 1.05,
            color: '#ffffff', marginBottom: '24px',
            maxWidth: '900px', margin: '0 auto 24px',
          }}>
            Pricing Built Around{' '}
            <span style={{ color: '#4ade80' }}>Your Agency</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p style={{
            fontFamily: FP, fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
            fontWeight: 500, lineHeight: 1.75,
            color: 'rgba(220,252,231,0.85)',
            maxWidth: '620px', margin: '0 auto 40px',
          }}>
            No rigid tiers. No per-module fees. A custom proposal based on your patient volume, state, and clinical disciplines.
          </p>
        </Reveal>
      </div>
    </section>

    <WaveDivider topColor="rgba(5,46,22,0.68)" bottomColor="#dff0df" />

    {/* ══ BODY ══ */}
    <section style={{ background: '#dff0df', padding: '80px 0 120px', position: 'relative', overflow: 'hidden' }}>
      <DotGrid />
      <RadialGlow top="-60px" right="-60px" size={500} opacity={0.07} />
      <RadialGlow bottom="-60px" left="-60px" size={380} opacity={0.05} />

      <style>{`
        .pricing-grid { display: grid; gap: 48px; align-items: start; }
        @media (min-width: 1024px) { .pricing-grid { grid-template-columns: 1fr 1.2fr; gap: 64px; align-items: stretch; } }
        .pricing-left-col { display: flex; flex-direction: column; }
        @media (max-width: 640px) { .pricing-row { grid-template-columns: 1fr !important; } }
      `}</style>

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <div className="pricing-grid">

          {/* ── LEFT — value column, sticky on desktop only ── */}
          <div className="pricing-left-col">

            <Reveal delay={0}>
              <Eyebrow label="Why RAAH" />
              <h2 style={{
                fontFamily: FI, fontWeight: 900,
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                letterSpacing: '-0.03em', lineHeight: 1.1,
                color: '#0f172a', marginBottom: '8px',
              }}>
                One Price.{' '}
                <span style={{ color: '#16a34a' }}>Everything Included.</span>
              </h2>
              <p style={{ fontFamily: FP, fontSize: '1rem', color: '#374151', fontWeight: 500, lineHeight: 1.75, marginBottom: '32px', maxWidth: '420px' }}>
                No nickel-and-diming for modules. No per-user limits. One flat rate that covers your entire agency from day one.
              </p>
            </Reveal>

            {/* Value props */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '32px' }}>
              <ValuePropCard
                icon={IconAllIn}
                title="All Modules, One Subscription"
                body="Scheduling, EVV, billing, clinical docs, HR, messaging, and analytics. Every module. Zero add-on fees."
                delay={80}
              />
              <ValuePropCard
                icon={IconScale}
                title="Scales With Your Growth"
                body="Your rate is anchored to patient volume. As you grow, your unit cost drops. The platform scales automatically with no re-contracting."
                delay={140}
              />
              <ValuePropCard
                icon={IconShield}
                title="HIPAA Compliance Included"
                body="Business Associate Agreement, AES-256 encryption, role-based access, and annual third-party security audits. No security add-ons."
                delay={200}
              />
              <ValuePropCard
                icon={IconSupport}
                title="Dedicated Success Manager"
                body="A named specialist handles your onboarding, monitors your first billing cycle, and is reachable by phone during business hours."
                delay={260}
              />
            </div>

            {/* Social proof snippet */}
            <Reveal delay={320}>
              <div style={{
                background: '#ffffff', borderRadius: '16px', padding: '28px',
                border: '1px solid rgba(22,163,74,0.14)',
                boxShadow: '0 4px 20px rgba(5,46,22,0.08)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, #16a34a, #22c55e)' }} />
                <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="14" height="14" viewBox="0 0 16 16" fill="#f59e0b">
                      <path d="M8 1l1.854 3.756L14 5.528l-3 2.923.708 4.129L8 10.5l-3.708 2.08L5 8.451 2 5.528l4.146-.772z"/>
                    </svg>
                  ))}
                </div>
                <p style={{ fontFamily: FP, fontStyle: 'italic', fontSize: '1rem', color: '#1e293b', lineHeight: 1.75, marginBottom: '18px' }}>
                  "RAAH is the first platform that actually understands home health billing. Secondary crossover claims, PDGM compliance, 835 remittance, all handled automatically."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, #16a34a 0%, #0d7a3e 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontFamily: FI, fontWeight: 800, fontSize: '0.8rem', color: '#ffffff' }}>KA</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.9375rem', color: '#0a0a0a', lineHeight: 1.2 }}>Kevin Adeyemi</p>
                    <p style={{ fontFamily: FP, fontSize: '0.8125rem', color: '#16a34a' }}>Revenue Cycle Manager, PrimeCare Solutions</p>
                  </div>
                  <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontFamily: FI, fontWeight: 900, fontSize: '1.25rem', color: '#052e16', lineHeight: 1, letterSpacing: '-0.02em' }}>99.2%</p>
                    <p style={{ fontFamily: FP, fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Billing Accuracy</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Trust strip */}
          </div>

          {/* ── RIGHT — Form card fills full column height ── */}
          <Reveal delay={120}>
            <div style={{ height: '100%' }}>
              <div style={{
                background: '#ffffff', borderRadius: '20px',
                border: '1px solid rgba(22,163,74,0.14)',
                boxShadow: '0 8px 48px rgba(5,46,22,0.10), 0 2px 12px rgba(5,46,22,0.06)',
                overflow: 'hidden', height: '100%',
              }}>
                <div style={{ height: '3px', background: 'linear-gradient(to right, #16a34a, #4ade80, #16a34a)' }} />
                <PricingForm />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>

    <WaveDivider topColor="#dff0df" bottomColor="#0d7a3e" flip={true} />

    {/* ══ PROMISE STRIP ══ */}
    <section style={{
      background: 'linear-gradient(160deg, #0d7a3e 0%, #16a34a 55%, #0d7a3e 100%)',
      padding: '80px 0 90px', position: 'relative', overflow: 'hidden',
    }}>
      <DotGrid color="rgba(74,222,128,0.08)" />
      <RadialGlow top="-60px" right="-60px" size={400} opacity={0.14} />
      <RadialGlow bottom="-60px" left="-60px" size={320} opacity={0.10} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal delay={0}>
          <p style={{
            fontFamily: FP, fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.80)', textAlign: 'center', marginBottom: '48px',
          }}>
            Our pricing promise
          </p>
        </Reveal>

        <style>{`
          .promise-grid { display: grid; gap: 1px; background: rgba(255,255,255,0.12); border-radius: 16px; overflow: hidden; grid-template-columns: repeat(2, 1fr); }
          @media (min-width: 768px) { .promise-grid { grid-template-columns: repeat(4, 1fr); } }
        `}</style>
        <div className="promise-grid">
          {[
            { value: 'Zero', label: 'Module Fees', sub: 'Everything in one rate' },
            { value: '< 24hr', label: 'Proposal Delivery', sub: 'Custom to your agency' },
            { value: '30 day', label: 'Money-Back Guarantee', sub: 'No questions asked' },
            { value: '1-on-1', label: 'Onboarding Session', sub: 'With a named specialist' },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60}>
              <div style={{ background: 'rgba(5,46,22,0.45)', padding: '36px 24px', textAlign: 'center' }}>
                <p style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1, color: '#ffffff', marginBottom: '8px' }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.9375rem', color: 'rgba(255,255,255,0.95)', marginBottom: '4px' }}>{stat.label}</p>
                <p style={{ fontFamily: FP, fontWeight: 400, fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>{stat.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280}>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <p style={{ fontFamily: FP, fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', marginBottom: '16px' }}>
              Want to see the platform before committing?
            </p>
            <Link to="/demo" style={{
              fontFamily: FI, fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.07em', textTransform: 'uppercase',
              padding: '12px 28px', borderRadius: '999px',
              background: 'transparent', color: '#ffffff',
              border: '1.5px solid rgba(255,255,255,0.45)',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.22s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.80)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; }}
            >
              Request a Free Demo
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

export default PricingRequestPage;