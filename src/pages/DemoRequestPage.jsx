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
  <div style={{ position: 'relative', height: 'clamp(40px, 6vw, 80px)', overflow: 'hidden', background: topColor, marginBottom: '-1px' }}>
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', transform: flip ? 'scaleX(-1)' : 'none' }}>
      <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill={bottomColor} />
    </svg>
  </div>
);

// ─── Bespoke SVG icons ────────────────────────────────────────────────────────
const IconWalkthrough = ({ color = '#16a34a' }) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <rect x="2" y="3" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5"/>
    <path d="M8 21h8M12 17v4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9.5 9L11 10.5L14.5 7" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconExperts = ({ color = '#16a34a' }) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <circle cx="9" cy="7" r="3" stroke={color} strokeWidth="1.5"/>
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconROI = ({ color = '#16a34a' }) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <path d="M3 17l4-4 4 4 4-6 4 3" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21H3M21 3v4h-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconSetup = ({ color = '#16a34a' }) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const CheckSvg = () => (
  <svg viewBox="0 0 16 16" fill="none" width="14" height="14" style={{ flexShrink: 0, marginTop: '2px' }}>
    <path d="M3 8L6.5 11.5L13 5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
        display: 'flex', gap: 'clamp(12px, 2vw, 16px)', alignItems: 'flex-start',
        padding: 'clamp(14px, 3vw, 20px)',
        borderRadius: '14px',
        background: hovered ? 'rgba(22,163,74,0.06)' : 'transparent',
        border: `1px solid ${hovered ? 'rgba(22,163,74,0.20)' : 'transparent'}`,
        transition: 'all 0.25s ease',
        cursor: 'default',
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        width: 'clamp(44px, 7vw, 52px)', height: 'clamp(44px, 7vw, 52px)', borderRadius: '13px', flexShrink: 0,
        background: hovered ? '#16a34a' : 'rgba(22,163,74,0.08)',
        border: `1.5px solid ${hovered ? '#16a34a' : 'rgba(22,163,74,0.20)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.25s ease',
      }}>
        {React.createElement(icon, { color: hovered ? '#ffffff' : '#16a34a' })}
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontFamily: FI, fontWeight: 700, fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)', color: '#0a0a0a', marginBottom: '5px', lineHeight: 1.2 }}>{title}</p>
        <p style={{ fontFamily: FP, fontWeight: 500, fontSize: 'clamp(0.875rem, 1.6vw, 0.9375rem)', color: '#374151', lineHeight: 1.65 }}>{body}</p>
      </div>
    </div>
  );
};

// ─── Input field styles ───────────────────────────────────────────────────────
const inputStyle = {
  width: '100%', fontFamily: FP, fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)', fontWeight: 400,
  padding: 'clamp(13px, 2.5vw, 16px) clamp(16px, 3vw, 20px)', borderRadius: '12px', outline: 'none',
  border: '1.5px solid rgba(22,163,74,0.22)',
  color: '#0a0a0a', background: '#f8fffc',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  boxSizing: 'border-box', maxWidth: '100%',
};
const labelStyle = {
  fontFamily: FI, fontSize: 'clamp(0.75rem, 1.4vw, 0.8125rem)', fontWeight: 700,
  color: '#0a0a0a', marginBottom: '9px', display: 'block',
  letterSpacing: '0.05em', textTransform: 'uppercase',
};
const onFocus = e => {
  e.target.style.borderColor = '#16a34a';
  e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.10)';
};
const onBlur = e => {
  e.target.style.borderColor = 'rgba(22,163,74,0.22)';
  e.target.style.boxShadow = 'none';
};

// ─── Field error style ────────────────────────────────────────────────────────
const FieldError = ({ msg }) => msg ? (
  <p style={{ fontFamily: FP, fontSize: '0.78rem', color: '#dc2626', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
    <svg viewBox="0 0 16 16" fill="none" width="12" height="12" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.5"/>
      <path d="M8 5v3M8 11v.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round"/>
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
  <div style={{ textAlign: 'center', padding: 'clamp(40px, 8vw, 72px) clamp(24px, 5vw, 48px)' }}>
    <div style={{
      width: 'clamp(64px, 12vw, 80px)', height: 'clamp(64px, 12vw, 80px)', borderRadius: '50%', margin: '0 auto 24px',
      background: 'linear-gradient(135deg, #0d7a3e 0%, #16a34a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 12px 40px rgba(22,163,74,0.35)',
    }}>
      <svg viewBox="0 0 24 24" fill="none" width="36" height="36">
        <path d="M5 13l4 4L19 7" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <h3 style={{ fontFamily: FI, fontWeight: 800, fontSize: 'clamp(1.375rem, 3vw, 1.875rem)', color: '#0a0a0a', marginBottom: '12px', letterSpacing: '-0.02em' }}>
      Request Received
    </h3>
    <p style={{ fontFamily: FP, fontSize: 'clamp(0.9375rem, 2vw, 1rem)', fontWeight: 500, color: '#374151', lineHeight: 1.75, maxWidth: '340px', margin: '0 auto 32px' }}>
      A member of our implementation team will reach out within one business day to confirm your session.
    </p>
    <div style={{ background: '#dff0df', borderRadius: '14px', padding: 'clamp(16px, 3vw, 20px) clamp(20px, 4vw, 24px)', marginBottom: '28px', textAlign: 'left' }}>
      <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.8rem', color: '#16a34a', marginBottom: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>What happens next</p>
      {[
        'We review your agency size and use case',
        'A specialist reaches out to confirm your time',
        'You receive a calendar invite with the session link',
        'Your personalised demo is ready — no homework needed',
      ].map((step, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: i < 3 ? '10px' : 0 }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
            <span style={{ fontFamily: FI, fontWeight: 900, fontSize: '0.65rem', color: '#ffffff' }}>{i + 1}</span>
          </div>
          <p style={{ fontFamily: FP, fontSize: 'clamp(0.875rem, 1.6vw, 0.9375rem)', fontWeight: 500, color: '#374151', lineHeight: 1.5 }}>{step}</p>
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

  const fieldStyle = name => ({ ...inputStyle, borderColor: errors[name] ? '#dc2626' : undefined });

  return (
    <div style={{ padding: 'clamp(32px, 5vw, 52px)' }}>
      <h2 style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(1.375rem, 3vw, 1.875rem)', color: '#0a0a0a', marginBottom: '8px', letterSpacing: '-0.02em' }}>
        Schedule Your Demo
      </h2>
      <p style={{ fontFamily: FP, fontSize: 'clamp(0.9375rem, 1.8vw, 1rem)', fontWeight: 500, color: '#374151', marginBottom: 'clamp(24px, 4vw, 40px)', lineHeight: 1.6 }}>
        Takes 90 seconds. We respond within one business day.
      </p>

      {/* Row 1 */}
      <div className="form-row" style={{ marginBottom: '20px' }}>
        <div>
          <label style={labelStyle} htmlFor="agency_name">Agency Name *</label>
          <input id="agency_name" name="agency_name" type="text" required placeholder="Caring Hands Health"
            value={fields.agency_name} onChange={handleChange} style={fieldStyle('agency_name')}
            onFocus={onFocus} onBlur={handleBlurField} />
          <FieldError msg={errors.agency_name} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="contact_name">Contact Name *</label>
          <input id="contact_name" name="contact_name" type="text" required placeholder="Sarah Johnson"
            value={fields.contact_name} onChange={handleChange} style={fieldStyle('contact_name')}
            onFocus={onFocus} onBlur={handleBlurField} />
          <FieldError msg={errors.contact_name} />
        </div>
      </div>

      {/* Row 2 */}
      <div className="form-row" style={{ marginBottom: '20px' }}>
        <div>
          <label style={labelStyle} htmlFor="contact_email">Work Email *</label>
          <input id="contact_email" name="contact_email" type="email" required placeholder="sarah@agency.org"
            value={fields.contact_email} onChange={handleChange} style={fieldStyle('contact_email')}
            onFocus={onFocus} onBlur={handleBlurField} />
          <FieldError msg={errors.contact_email} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="contact_phone">Phone Number</label>
          <input id="contact_phone" name="contact_phone" type="tel" placeholder="+1 (720) 000-0000"
            value={fields.contact_phone} onChange={handleChange} style={fieldStyle('contact_phone')}
            onFocus={onFocus} onBlur={handleBlurField} />
          <FieldError msg={errors.contact_phone} />
        </div>
      </div>

      {/* Row 3 */}
      <div className="form-row" style={{ marginBottom: '20px' }}>
        <div>
          <label style={labelStyle} htmlFor="estimated_patients">Patient Volume *</label>
          <select id="estimated_patients" name="estimated_patients" required
            value={fields.estimated_patients} onChange={handleChange}
            style={{ ...fieldStyle('estimated_patients'), cursor: 'pointer', color: fields.estimated_patients ? '#0a0a0a' : '#94a3b8' }}
            onFocus={onFocus} onBlur={handleBlurField}>
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
            style={{ ...inputStyle, cursor: 'pointer' }} onFocus={onFocus} onBlur={onBlur}>
            <option value="live">Live Video Call</option>
            <option value="screen_share">Screen Share Walkthrough</option>
            <option value="recorded">Send Me a Recording</option>
            <option value="sandbox">Sandbox Access</option>
          </select>
        </div>
      </div>

      {/* Row 4 */}
      <div className="form-row" style={{ marginBottom: '24px' }}>
        <div>
          <label style={labelStyle} htmlFor="primary_challenge">Primary Challenge</label>
          <select id="primary_challenge" name="primary_challenge"
            value={fields.primary_challenge} onChange={handleChange}
            style={{ ...inputStyle, cursor: 'pointer', color: fields.primary_challenge ? '#0a0a0a' : '#94a3b8' }}
            onFocus={onFocus} onBlur={onBlur}>
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
            style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
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
        style={{
          width: '100%', fontFamily: FI, fontWeight: 700, fontSize: 'clamp(0.9rem, 1.8vw, 0.9375rem)',
          letterSpacing: '0.07em', textTransform: 'uppercase',
          padding: 'clamp(14px, 3vw, 16px) clamp(24px, 5vw, 32px)', borderRadius: '999px',
          background: submitting ? '#15803d' : '#16a34a',
          color: '#ffffff', border: '2px solid #16a34a',
          boxShadow: '0 6px 24px rgba(22,163,74,0.30)',
          cursor: submitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.25s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          boxSizing: 'border-box',
        }}
        onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#16a34a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'none'; } }}
        onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(22,163,74,0.30)'; }}
      >
        {submitting ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'demo-spin 1s linear infinite' }}>
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.30)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
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

      <p style={{ fontFamily: FP, fontSize: 'clamp(0.8125rem, 1.5vw, 0.875rem)', fontWeight: 500, color: '#475569', textAlign: 'center', marginTop: '18px' }}>
        No commitment. No credit card. Responds within one business day.
      </p>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const DemoRequestPage = () => (
  <Layout>

    {/* Global responsive styles */}
    <style>{`
      @keyframes demo-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .form-row { display: grid; gap: 18px; grid-template-columns: 1fr; }
      @media (min-width: 480px) { .form-row { grid-template-columns: repeat(2, 1fr); } }

      .demo-top-row { display: grid; gap: clamp(32px, 6vw, 48px); align-items: start; }
      @media (min-width: 1024px) { .demo-top-row { grid-template-columns: 1fr 1.15fr; gap: 64px; } }
      @media (min-width: 1024px) { .demo-left-sticky { position: sticky; top: clamp(100px, 15vw, 140px); } }

      .cards-aligned-row { display: grid; grid-template-columns: 1fr; gap: 20px; align-items: stretch; margin-top: clamp(40px, 8vw, 56px); }
      @media (min-width: 768px) { .cards-aligned-row { grid-template-columns: 1fr 1fr; gap: 28px; } }

      .recaptcha-wrapper {
        display: flex; justify-content: center; padding: clamp(8px, 2vw, 16px) 0 clamp(12px, 3vw, 20px);
        overflow-x: auto; -webkit-overflow-scrolling: touch; max-width: 100%;
      }
      .recaptcha-wrapper > div { margin: 0 auto; }
      @media (max-width: 420px) { .recaptcha-wrapper > div { transform: scale(0.9); transform-origin: left center; } }
    `}</style>

    {/* ══ HERO ══ */}
    <section style={{ position: 'relative', minHeight: '52vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <img
        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000&h=800&crop=top"
        alt="RAAH Technologies demo"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,46,22,0.68)' }} aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(5,46,22,0.55) 100%)' }} aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} aria-hidden="true" />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '120px 24px' }}>
        <Reveal delay={0}>
          <Eyebrow label="Free 30-Minute Session" light />
        </Reveal>
        <Reveal delay={80}>
          <h1 style={{
            fontFamily: FI, fontWeight: 900,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            letterSpacing: '-0.03em', lineHeight: 1.05,
            color: '#ffffff', marginBottom: '24px',
            maxWidth: '900px', margin: '0 auto 24px',
          }}>
            See RAAH{' '}
            <span style={{ color: '#4ade80' }}>in Action</span>{' '}
            for Your Agency
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p style={{
            fontFamily: FP, fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
            fontWeight: 500, lineHeight: 1.75,
            color: 'rgba(220,252,231,0.85)',
            maxWidth: '620px', margin: '0 auto 40px',
          }}>
            A personalised, no-script walkthrough built around your state, payer mix, and agency size. Not a generic product tour.
          </p>
        </Reveal>
      </div>
    </section>

    <WaveDivider topColor="rgba(5,46,22,0.68)" bottomColor="#dff0df" />

    {/* ══ BODY ══ */}
    <section style={{ background: '#dff0df', padding: 'clamp(50px, 10vw, 80px) 0 clamp(60px, 12vw, 120px)', position: 'relative', overflow: 'hidden' }}>
      <DotGrid />
      <RadialGlow top="-60px" right="-60px" size={500} opacity={0.07} />
      <RadialGlow bottom="-60px" left="-60px" size={380} opacity={0.05} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Top Row: Features (Left) + Form (Right) ── */}
        <div className="demo-top-row">
          <div className="demo-left-sticky">
            <Reveal delay={0}>
              <Eyebrow label="What You Will See" />
              <h2 style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-0.03em', lineHeight: 1.1, color: '#0f172a', marginBottom: '8px' }}>
                Built Around{' '}<span style={{ color: '#16a34a' }}>Your Workflow</span>
              </h2>
              <p style={{ fontFamily: FP, fontSize: 'clamp(0.9375rem, 2vw, 1rem)', fontWeight: 500, color: '#374151', lineHeight: 1.75, marginBottom: 'clamp(20px, 4vw, 32px)', maxWidth: '440px' }}>
                Every demo is configured for your specific disciplines, state EVV requirements, and payer mix before the session begins.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2px, 0.5vw, 4px)' }}>
                <DemoFeatureItem icon={IconWalkthrough} title="Live Platform Walkthrough" body="See your exact workflows: scheduling, EVV clock-in, claim scrubbing, and 835 remittance — live, not slides." />
                <DemoFeatureItem icon={IconExperts} title="Direct Q&A with Specialists" body="Ask billing, compliance, or clinical questions to the specialist who configured your session." />
                <DemoFeatureItem icon={IconROI} title="Your ROI Projection" body="We model your agency's specific numbers: claim rejection rate, scheduling hours, and billing accuracy potential." />
                <DemoFeatureItem icon={IconSetup} title="Setup and Migration Plan" body="Walk away with a clear onboarding timeline. Most agencies are live within 24 hours of signing." />
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div style={{
              background: '#ffffff', borderRadius: '20px',
              border: '1px solid rgba(22,163,74,0.14)',
              boxShadow: '0 8px 48px rgba(5,46,22,0.10), 0 2px 12px rgba(5,46,22,0.06)',
              overflow: 'hidden', width: '100%', boxSizing: 'border-box',
            }}>
              <div style={{ height: '3px', background: 'linear-gradient(to right, #16a34a, #4ade80, #16a34a)' }} />
              <DemoForm />
            </div>
          </Reveal>
        </div>

        {/* ── Bottom Row: Perfectly Aligned Cards ── */}
        <div className="cards-aligned-row">
          {/* LEFT CARD: Testimonial */}
          <Reveal delay={160}>
            <div style={{
              background: '#ffffff', borderRadius: '16px',
              padding: 'clamp(22px, 4vw, 28px)',
              border: '1px solid rgba(22,163,74,0.14)',
              boxShadow: '0 4px 20px rgba(5,46,22,0.08)',
              position: 'relative', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              height: '100%', boxSizing: 'border-box',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, #16a34a, #22c55e)' }} />
              <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="14" height="14" viewBox="0 0 16 16" fill="#f59e0b">
                    <path d="M8 1l1.854 3.756L14 5.528l-3 2.923.708 4.129L8 10.5l-3.708 2.08L5 8.451 2 5.528l4.146-.772z"/>
                  </svg>
                ))}
              </div>
              <p style={{ fontFamily: FP, fontStyle: 'italic', fontSize: 'clamp(0.9375rem, 1.8vw, 1rem)', fontWeight: 400, color: '#1e293b', lineHeight: 1.75, marginBottom: '18px', flexGrow: 1, wordBreak: 'break-word' }}>
                "RAAH transformed our billing process completely. We reduced claim rejections by 90% in the first month and our cash flow has never been stronger."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #16a34a 0%, #0d7a3e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: FI, fontWeight: 800, fontSize: '0.8rem', color: '#ffffff' }}>SJ</span>
                </div>
                <div>
                  <p style={{ fontFamily: FI, fontWeight: 700, fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)', color: '#0a0a0a', lineHeight: 1.2 }}>Sarah Johnson</p>
                  <p style={{ fontFamily: FP, fontSize: 'clamp(0.78rem, 1.5vw, 0.8125rem)', fontWeight: 500, color: '#16a34a', lineHeight: 1.3 }}>Director of Operations, Caring Hands Home Health</p>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)', color: '#0a6b30', lineHeight: 1, letterSpacing: '-0.02em' }}>90%</p>
                  <p style={{ fontFamily: FP, fontSize: 'clamp(0.65rem, 1.2vw, 0.72rem)', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Fewer Rejections</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT CARD: Trust Strip */}
          <Reveal delay={220}>
            <div style={{
              background: '#ffffff', borderRadius: '14px',
              padding: 'clamp(22px, 4vw, 28px)',
              border: '1px solid rgba(22,163,74,0.12)',
              boxShadow: '0 2px 12px rgba(5,46,22,0.06)',
              display: 'flex', flexDirection: 'column',
              height: '100%', boxSizing: 'border-box',
            }}>
              <p style={{ fontFamily: FI, fontWeight: 700, fontSize: 'clamp(0.72rem, 1.5vw, 0.8rem)', color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 'clamp(14px, 2vw, 18px)' }}>
                Trusted by agencies across 30 states
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vw, 14px)', flexGrow: 1 }}>
                {[
                  'HIPAA-compliant platform — BAA included',
                  'No credit card required to book',
                  'Live in under 24 hours after signing',
                  '500+ agencies currently on RAAH',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckSvg />
                    <span style={{ fontFamily: FP, fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)', fontWeight: 500, color: '#1e293b', lineHeight: 1.5, wordBreak: 'break-word' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>

    <WaveDivider topColor="#dff0df" bottomColor="#0d7a3e" flip={true} />

    {/* ══ REASSURANCE STRIP ══ */}
    <section style={{
      background: 'linear-gradient(160deg, #0d7a3e 0%, #16a34a 55%, #0d7a3e 100%)',
      padding: 'clamp(50px, 10vw, 80px) 0 clamp(60px, 12vw, 90px)', position: 'relative', overflow: 'hidden',
    }}>
      <DotGrid color="rgba(74,222,128,0.08)" />
      <RadialGlow top="-60px" right="-60px" size={400} opacity={0.14} />
      <RadialGlow bottom="-60px" left="-60px" size={320} opacity={0.10} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal delay={0}>
          <p style={{ fontFamily: FP, fontSize: 'clamp(0.7rem, 1.5vw, 0.75rem)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.80)', textAlign: 'center', marginBottom: 'clamp(32px, 6vw, 48px)' }}>
            Every demo includes
          </p>
        </Reveal>

        <style>{`
          .strip-grid { display: grid; gap: 1px; background: rgba(255,255,255,0.12); border-radius: 16px; overflow: hidden; grid-template-columns: repeat(2, 1fr); }
          @media (min-width: 768px) { .strip-grid { grid-template-columns: repeat(4, 1fr); } }
        `}</style>
        <div className="strip-grid">
          {[
            { value: '30 min', label: 'Session Length', sub: 'No filler, no sales pitch' },
            { value: 'Zero', label: 'Commitment Required', sub: 'Walk away anytime' },
            { value: '< 24hr', label: 'Response Time', sub: 'From our team to yours' },
            { value: '1-on-1', label: 'Specialist Session', sub: 'Not a group webinar' },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60}>
              <div style={{ background: 'rgba(5,46,22,0.45)', padding: 'clamp(24px, 4vw, 36px) clamp(16px, 3vw, 24px)', textAlign: 'center', boxSizing: 'border-box' }}>
                <p style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(1.375rem, 2.5vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1, color: '#ffffff', marginBottom: '8px' }}>{stat.value}</p>
                <p style={{ fontFamily: FI, fontWeight: 700, fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)', color: 'rgba(255,255,255,0.95)', marginBottom: '4px' }}>{stat.label}</p>
                <p style={{ fontFamily: FP, fontWeight: 400, fontSize: 'clamp(0.7rem, 1.4vw, 0.75rem)', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>{stat.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(32px, 6vw, 48px)' }}>
            <p style={{ fontFamily: FP, fontSize: 'clamp(0.85rem, 1.8vw, 0.9rem)', color: 'rgba(255,255,255,0.75)', marginBottom: '16px' }}>
              Prefer to reach us directly?
            </p>
            <Link to="/contact" style={{
              fontFamily: FI, fontWeight: 700, fontSize: 'clamp(0.75rem, 1.5vw, 0.8125rem)', letterSpacing: '0.07em', textTransform: 'uppercase',
              padding: 'clamp(10px, 2vw, 12px) clamp(24px, 4vw, 28px)', borderRadius: '999px',
              background: 'transparent', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.45)',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.22s ease',
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