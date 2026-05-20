/**
 * ContactPage.jsx — RAAH Technologies
 *
 * Fully rebuilt. Consistent with HomePage, AboutPage, ServicesPage:
 *   Inter 900 headings, Poppins body, double-dash eyebrows
 *   Dot-grid textures, ghost watermark, radial corner glows
 *   Reveal scroll animations, wave dividers, no em dashes
 *
 * Sections:
 *   1. Hero           — dark green overlay on image
 *   2. Contact Body   — 2-col: info cards left / form right
 *   3. Map            — full-width Google Maps iframe embed (no API key)
 *   4. Support strip  — dark green, 3 support channels
 */

import React, { useRef, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';

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
    whiteSpace: 'nowrap', userSelect: 'none',
    pointerEvents: 'none', lineHeight: 1,
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

// ─── Contact info card ────────────────────────────────────────────────────────
const InfoCard = ({ icon, title, lines, link, linkLabel, delay }) => {
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
          display: 'flex',
          alignItems: 'flex-start',
          gap: '18px',
          border: '1px solid',
          borderColor: hovered ? 'rgba(22,163,74,0.28)' : 'rgba(22,163,74,0.10)',
          boxShadow: hovered
            ? '0 16px 48px rgba(5,46,22,0.12), 0 4px 12px rgba(22,163,74,0.08)'
            : '0 2px 12px rgba(5,46,22,0.06)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Icon square */}
        <div style={{
          width: '52px', height: '52px', borderRadius: '13px', flexShrink: 0,
          background: hovered ? '#16a34a' : 'rgba(22,163,74,0.08)',
          border: `1.5px solid ${hovered ? '#16a34a' : 'rgba(22,163,74,0.18)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s ease',
        }}>
          {React.createElement(icon, {
            size: 22,
            color: hovered ? '#ffffff' : '#16a34a',
            strokeWidth: 1.75,
            style: { transition: 'color 0.3s ease' },
          })}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: '6px', lineHeight: 1.2 }}>
            {title}
          </p>
          {lines.map((line, i) => (
            <p key={i} style={{ fontFamily: FP, fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
              {line}
            </p>
          ))}
          {link && (
            <a href={link} style={{
              fontFamily: FI, fontWeight: 600, fontSize: '0.8rem',
              color: '#16a34a', textDecoration: 'none',
              letterSpacing: '0.04em', marginTop: '6px',
              display: 'inline-block', transition: 'opacity 0.2s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.70'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              {linkLabel}
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
};

// ─── SVG icons ────────────────────────────────────────────────────────────────
const MapPinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 1.75} width={props.size || 22} height={props.size || 22} style={props.style} color={props.color}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="9" r="2.5" strokeLinecap="round"/>
  </svg>
);

const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 1.75} width={props.size || 22} height={props.size || 22} style={props.style} color={props.color}>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02L6.62 10.79Z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 1.75} width={props.size || 22} height={props.size || 22} style={props.style} color={props.color}>
    <rect x="2" y="4" width="20" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 8l10 7 10-7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 1.75} width={props.size || 22} height={props.size || 22} style={props.style} color={props.color}>
    <circle cx="12" cy="12" r="10" strokeLinecap="round"/>
    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChatIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 1.75} width={props.size || 22} height={props.size || 22} style={props.style} color={props.color}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Contact form ─────────────────────────────────────────────────────────────
const ContactForm = () => {
  const [fields, setFields] = useState({ name: '', email: '', agency: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setFields(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1400);
  };

  const inputStyle = {
    width: '100%', fontFamily: FP, fontSize: '0.9375rem', fontWeight: 400,
    padding: '14px 16px', borderRadius: '10px', outline: 'none',
    border: '1.5px solid rgba(22,163,74,0.18)',
    color: '#0f172a', background: '#fafffe',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    fontFamily: FI, fontSize: '0.8125rem', fontWeight: 600,
    color: '#374151', marginBottom: '6px', display: 'block',
    letterSpacing: '0.01em',
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 32px' }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #052e16 0%, #16a34a 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
          boxShadow: '0 8px 32px rgba(22,163,74,0.30)',
        }}>
          <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
            <path d="M5 13l4 4L19 7" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 style={{ fontFamily: FI, fontWeight: 800, fontSize: '1.5rem', color: '#0f172a', marginBottom: '12px' }}>
          Message Received
        </h3>
        <p style={{ fontFamily: FP, fontSize: '1rem', color: '#475569', lineHeight: 1.7, maxWidth: '320px', margin: '0 auto 28px' }}>
          Thank you for reaching out. A member of our team will be in touch within one business day.
        </p>
        <button
          onClick={() => { setSubmitted(false); setFields({ name: '', email: '', agency: '', phone: '', subject: '', message: '' }); }}
          style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '12px 28px', borderRadius: '999px', background: 'transparent', color: '#16a34a', border: '2px solid #16a34a', cursor: 'pointer', transition: 'all 0.22s ease' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.color = '#ffffff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#16a34a'; }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '40px 40px 36px' }}>
      <h3 style={{ fontFamily: FI, fontWeight: 800, fontSize: '1.375rem', color: '#0f172a', marginBottom: '6px' }}>
        Send Us a Message
      </h3>
      <p style={{ fontFamily: FP, fontSize: '0.9rem', color: '#64748b', marginBottom: '32px', lineHeight: 1.6 }}>
        We respond to all enquiries within one business day.
      </p>

      {/* Row: Name + Agency */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="grid-cols-1 sm:grid-cols-2">
        <div>
          <label style={labelStyle} htmlFor="name">Full Name *</label>
          <input id="name" name="name" type="text" required placeholder="Sarah Johnson" value={fields.name} onChange={handleChange} style={inputStyle}
            onFocus={e => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.10)'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(22,163,74,0.18)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="agency">Agency Name *</label>
          <input id="agency" name="agency" type="text" required placeholder="Caring Hands Home Health" value={fields.agency} onChange={handleChange} style={inputStyle}
            onFocus={e => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.10)'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(22,163,74,0.18)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
      </div>

      {/* Row: Email + Phone */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="grid-cols-1 sm:grid-cols-2">
        <div>
          <label style={labelStyle} htmlFor="email">Email Address *</label>
          <input id="email" name="email" type="email" required placeholder="sarah@caringhands.org" value={fields.email} onChange={handleChange} style={inputStyle}
            onFocus={e => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.10)'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(22,163,74,0.18)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" type="tel" placeholder="+1 (720) 000-0000" value={fields.phone} onChange={handleChange} style={inputStyle}
            onFocus={e => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.10)'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(22,163,74,0.18)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
      </div>

      {/* Subject */}
      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle} htmlFor="subject">Subject *</label>
        <select id="subject" name="subject" required value={fields.subject} onChange={handleChange}
          style={{ ...inputStyle, cursor: 'pointer', color: fields.subject ? '#0f172a' : '#94a3b8' }}
          onFocus={e => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.10)'; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(22,163,74,0.18)'; e.target.style.boxShadow = 'none'; }}
        >
          <option value="" disabled>Select a topic</option>
          <option value="demo">Request a Demo</option>
          <option value="pricing">Pricing Enquiry</option>
          <option value="billing">Billing Question</option>
          <option value="evv">EVV and Compliance</option>
          <option value="support">Technical Support</option>
          <option value="partnership">Partnership</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Message */}
      <div style={{ marginBottom: '28px' }}>
        <label style={labelStyle} htmlFor="message">Message *</label>
        <textarea id="message" name="message" required rows={4} placeholder="Tell us about your agency, what you are looking for, or any questions you have..." value={fields.message} onChange={handleChange}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
          onFocus={e => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.10)'; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(22,163,74,0.18)'; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      {/* Submit */}
      <button type="submit" disabled={submitting} style={{
        width: '100%', fontFamily: FI, fontWeight: 700, fontSize: '0.9rem',
        letterSpacing: '0.07em', textTransform: 'uppercase',
        padding: '16px 32px', borderRadius: '999px',
        background: submitting ? '#15803d' : '#16a34a',
        color: '#ffffff', border: '2px solid #16a34a',
        boxShadow: '0 6px 24px rgba(22,163,74,0.30)',
        cursor: submitting ? 'not-allowed' : 'pointer',
        transition: 'all 0.25s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
      }}
        onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = '#052e16'; e.currentTarget.style.borderColor = '#052e16'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(5,46,22,0.22)'; } }}
        onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(22,163,74,0.30)'; }}
      >
        {submitting ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>

      <p style={{ fontFamily: FP, fontSize: '0.78rem', color: '#94a3b8', textAlign: 'center', marginTop: '16px' }}>
        We respect your privacy. Your information will never be shared.
      </p>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </form>
  );
};

// ─── Support card — extracted to avoid useState inside .map() ─────────────────
const SUPPORT_CHANNELS = [
  {
    icon: PhoneIcon,
    title: 'Phone Support',
    body: 'Speak directly with a home health specialist during business hours. For urgent platform issues, our average response is under two hours.',
    action: 'Call +1 (000) 222-2890',
    href: 'tel:+10002222890',
    isInternal: false,
    delay: 80,
  },
  {
    icon: MailIcon,
    title: 'Email Support',
    body: 'Send a detailed enquiry and receive a thorough written response from the team member best suited to your question, within one business day.',
    action: 'Email info@raahhealth.org',
    href: 'mailto:info@raahhealth.org',
    isInternal: false,
    delay: 160,
  },
  {
    icon: ChatIcon,
    title: 'Request a Demo',
    body: 'See the full platform live with a specialist who understands your specific state, payer mix, and agency size. Tailored, not scripted.',
    action: 'Book a walkthrough',
    href: '/demo',
    isInternal: true,
    delay: 240,
  },
];

// ─── Shared arrow SVG — defined outside any component ────────────────────────
const ArrowSvg = () => (
  <svg viewBox="0 0 12 12" fill="none" width="11" height="11">
    <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SupportCard = ({ icon, title, body, action, href, isInternal, delay }) => {
  const [hovered, setHovered] = useState(false);
  const ctaStyle = {
    fontFamily: FI, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.07em',
    textTransform: 'uppercase', padding: '12px 22px', borderRadius: '999px',
    background: 'rgba(74,222,128,0.12)', color: '#4ade80',
    border: '1.5px solid rgba(74,222,128,0.30)',
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    textDecoration: 'none', transition: 'all 0.22s ease', alignSelf: 'flex-start',
  };
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered
            ? 'linear-gradient(145deg, #15803d 0%, #166534 60%, #14532d 100%)'
            : 'linear-gradient(145deg, #166534 0%, #14532d 60%, #052e16 100%)',
          borderRadius: '20px', overflow: 'hidden', position: 'relative', height: '100%',
          boxShadow: hovered ? '0 24px 64px rgba(5,46,22,0.28)' : '0 4px 20px rgba(5,46,22,0.12)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          border: '1px solid', borderColor: hovered ? 'rgba(74,222,128,0.30)' : 'rgba(74,222,128,0.12)',
        }}
      >
        {/* Shimmer */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: hovered ? '120%' : '-60%', width: '50%', height: '100%', background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.06) 50%, transparent 80%)', transform: 'skewX(-15deg)', transition: 'left 0.7s cubic-bezier(0.22, 1, 0.36, 1)', pointerEvents: 'none' }} />
        {/* Top accent line */}
        <div style={{ height: '2px', background: hovered ? 'linear-gradient(to right, #4ade80, #86efac, #4ade80)' : 'linear-gradient(to right, rgba(74,222,128,0.40), rgba(74,222,128,0.15))', transition: 'background 0.4s ease' }} />
        <div style={{ padding: '36px 32px 32px', display: 'flex', flexDirection: 'column', height: 'calc(100% - 2px)' }}>
          {/* White icon container */}
          <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: '#ffffff', border: `1.5px solid ${hovered ? 'rgba(22,163,74,0.35)' : 'rgba(22,163,74,0.25)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', flexShrink: 0, transition: 'border-color 0.35s ease' }}>
            {React.createElement(icon, { size: 22, color: '#16a34a', strokeWidth: 1.75 })}
          </div>
          <h3 style={{ fontFamily: FI, fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '12px', lineHeight: 1.2 }}>{title}</h3>
          <p style={{ fontFamily: FP, fontSize: '0.9375rem', fontWeight: 400, lineHeight: 1.75, color: hovered ? 'rgba(220,252,231,0.92)' : 'rgba(220,252,231,0.72)', marginBottom: '28px', flexGrow: 1, transition: 'color 0.3s ease' }}>{body}</p>
          {isInternal ? (
            <Link to={href} style={ctaStyle}
              onMouseEnter={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = '#16a34a'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(74,222,128,0.12)'; e.currentTarget.style.color = '#4ade80'; e.currentTarget.style.borderColor = 'rgba(74,222,128,0.30)'; }}
            >
              {action}<ArrowSvg />
            </Link>
          ) : (
            <a href={href} style={ctaStyle}
              onMouseEnter={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = '#16a34a'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(74,222,128,0.12)'; e.currentTarget.style.color = '#4ade80'; e.currentTarget.style.borderColor = 'rgba(74,222,128,0.30)'; }}
            >
              {action}<ArrowSvg />
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
};


const ContactPage = () => (
  <Layout>

    {/* ══ 1. HERO ══ */}
    <section style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2000&h=900&crop=top"
        alt="RAAH Technologies contact"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,46,22,0.65)' }} aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(5,46,22,0.60) 100%)' }} aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} aria-hidden="true" />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '120px 24px' }}>
        <Reveal delay={0}><Eyebrow label="Contact Us" light /></Reveal>
        <Reveal delay={80}>
          <h1 style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.05, color: '#ffffff', maxWidth: '900px', margin: '0 auto 24px' }}>
            Let's Talk About{' '}
            <span style={{ color: '#4ade80' }}>Your Agency</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ fontFamily: FP, fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', fontWeight: 500, lineHeight: 1.75, color: 'rgba(220,252,231,0.85)', maxWidth: '580px', margin: '0 auto' }}>
            Whether you want to see the platform, ask about pricing, or just have questions, our team responds within one business day.
          </p>
        </Reveal>
      </div>
    </section>

    <WaveDivider topColor="rgba(5,46,22,0.65)" bottomColor="#ffffff" />

    {/* ══ 2. CONTACT BODY ══ */}
    <section style={{ background: '#ffffff', padding: '100px 0 120px', position: 'relative', overflow: 'hidden' }}>
      <DotGrid />
      <Watermark />
      <RadialGlow top="-60px" right="-60px" size={420} opacity={0.07} />
      <RadialGlow bottom="-60px" left="-60px" size={360} opacity={0.06} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '64px', alignItems: 'start' }} className="grid-cols-1 lg:grid-cols-2">

          {/* Left — info cards */}
          <div>
            <Reveal delay={0}>
              <Eyebrow label="Reach Us" />
              <h2 style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.08, color: '#0f172a', marginBottom: '16px' }}>
                We Are{' '}
                <span style={{ color: '#16a34a' }}>Here to Help</span>
              </h2>
              <p style={{ fontFamily: FP, fontSize: '1rem', fontWeight: 400, lineHeight: 1.80, color: '#475569', marginBottom: '40px', maxWidth: '420px' }}>
                Our team of home health specialists is available Monday through Friday. For urgent platform issues, our support line answers within two hours during business hours.
              </p>
            </Reveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <InfoCard
                icon={MapPinIcon}
                title="Office Location"
                lines={['13891 Oswego Street', 'Aurora, Colorado 80011']}
                link="https://maps.google.com/?q=13891+Oswego+Street+Aurora+CO"
                linkLabel="Get directions"
                delay={80}
              />
              <InfoCard
                icon={PhoneIcon}
                title="Phone"
                lines={['+1 (000) 222-2890', 'Mon to Fri, 8:00 AM to 6:00 PM MT']}
                link="tel:+10002222890"
                linkLabel="Call now"
                delay={150}
              />
              <InfoCard
                icon={MailIcon}
                title="Email"
                lines={['info@raahhealth.org', 'We reply within one business day']}
                link="mailto:info@raahhealth.org"
                linkLabel="Send an email"
                delay={220}
              />
              <InfoCard
                icon={ClockIcon}
                title="Business Hours"
                lines={['Monday to Friday: 8:00 AM to 6:00 PM MT', 'Weekends: Emergency support only']}
                delay={290}
              />
            </div>

            {/* Quick links */}
            <Reveal delay={360}>
              <div style={{ marginTop: '36px', padding: '24px', borderRadius: '14px', background: 'rgba(22,163,74,0.05)', border: '1px solid rgba(22,163,74,0.12)' }}>
                <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '14px' }}>Looking for something specific?</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: 'Request a platform demo', path: '/demo' },
                    { label: 'Get a custom pricing quote', path: '/pricing' },
                    { label: 'Learn about our services', path: '/services' },
                  ].map(({ label, path }) => (
                    <Link key={path} to={path} style={{ fontFamily: FP, fontSize: '0.9rem', color: '#16a34a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', transition: 'gap 0.2s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.gap = '12px'; }}
                      onMouseLeave={e => { e.currentTarget.style.gap = '8px'; }}
                    >
                      <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — contact form */}
          <Reveal delay={100}>
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid rgba(22,163,74,0.14)',
              boxShadow: '0 8px 48px rgba(5,46,22,0.10), 0 2px 12px rgba(5,46,22,0.06)',
              overflow: 'hidden',
            }}>
              {/* Card top accent */}
              <div style={{ height: '3px', background: 'linear-gradient(to right, #16a34a, #4ade80, #16a34a)' }} />
              <ContactForm />
            </div>
          </Reveal>

        </div>
      </div>
    </section>

    <WaveDivider topColor="#ffffff" bottomColor="#052e16" flip />

    {/* ══ 3. MAP ══ */}
    <section style={{ background: '#052e16', position: 'relative', overflow: 'hidden' }}>
      <DotGrid color="rgba(74,222,128,0.06)" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Map label bar */}
        <div className="container-custom" style={{ paddingTop: '48px', paddingBottom: '24px' }}>
          <Reveal delay={0}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <p style={{ fontFamily: FP, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4ade80', marginBottom: '6px' }}>Our Location</p>
                <p style={{ fontFamily: FI, fontWeight: 700, fontSize: '1.125rem', color: '#ffffff' }}>13891 Oswego Street, Aurora, Colorado</p>
              </div>
              <a
                href="https://maps.google.com/?q=13891+Oswego+Street+Aurora+CO"
                target="_blank"
                rel="noreferrer"
                style={{ fontFamily: FI, fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '11px 22px', borderRadius: '999px', background: 'transparent', color: '#4ade80', border: '1.5px solid rgba(74,222,128,0.40)', textDecoration: 'none', transition: 'all 0.22s ease', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(74,222,128,0.12)'; e.currentTarget.style.borderColor = '#4ade80'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(74,222,128,0.40)'; }}
              >
                Open in Google Maps
                <svg viewBox="0 0 12 12" fill="none" width="11" height="11">
                  <path d="M1 11L11 1M11 1H5M11 1V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Google Maps iframe — no API key required */}
        <Reveal delay={80}>
          <div style={{ position: 'relative', width: '100%', height: '480px', borderTop: '1px solid rgba(74,222,128,0.12)', borderBottom: '1px solid rgba(74,222,128,0.12)' }}>
            <iframe
              title="RAAH Technologies Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.0!2d-104.8319!3d39.7294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c63d0c9e3e06b%3A0x0!2s13891+Oswego+St%2C+Aurora%2C+CO+80011!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', filter: 'saturate(0.9) contrast(1.05)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        {/* Bottom padding */}
        <div style={{ height: '48px' }} />
      </div>
    </section>

    <WaveDivider topColor="#052e16" bottomColor="#ffffff" />

    {/* ══ 4. SUPPORT STRIP ══ */}
    <section style={{ background: '#ffffff', padding: '100px 0 120px', position: 'relative', overflow: 'hidden' }}>
      <DotGrid />
      <RadialGlow top="-60px" right="-60px" size={420} opacity={0.07} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Eyebrow label="Support" />
            <h2 style={{ fontFamily: FI, fontWeight: 900, fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.08, color: '#0f172a', maxWidth: '680px', margin: '0 auto 16px' }}>
              Three Ways to{' '}
              <span style={{ color: '#16a34a' }}>Get Help</span>
            </h2>
            <p style={{ fontFamily: FP, fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', fontWeight: 500, lineHeight: 1.75, color: '#374151', maxWidth: '500px', margin: '0 auto' }}>
              RAAH clients get dedicated support at every stage. Not a ticket queue.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'stretch' }} className="grid-cols-1 md:grid-cols-3">
          {SUPPORT_CHANNELS.map((channel) => (
            <SupportCard key={channel.title} {...channel} />
          ))}
        </div>
      </div>
    </section>

  </Layout>
);

export default ContactPage;