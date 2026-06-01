/**
 * src/api/services.js — RAAH Technologies
 *
 * Single authoritative API client for ALL public website calls.
 * All endpoints, field names, and response shapes verified against the
 * live Swagger documentation at http://3.86.179.13:3000/api/docs
 *
 * ─── Base URL ─────────────────────────────────────────────────────────────────
 *   VITE_API_BASE_URL=http://3.86.179.13:3000
 *   No /v1 suffix — the backend does not version at the URL level.
 *
 * ─── Field mapping (frontend snake_case → backend camelCase) ─────────────────
 *   agency_name        →  agencyName
 *   contact_name       →  contactName
 *   contact_email      →  email
 *   contact_phone      →  phone
 *   estimated_patients →  patientRange  (range string: '1-25'|'26-100'|'101-250'|'251-500'|'501+')
 *   recaptcha_token    →  recaptchaToken
 *
 * ─── GET /website/quote response shape ───────────────────────────────────────
 *   { agencyName, contactName, patientRange, quotedPrice, expiresAt, alreadyPaid }
 *   — flat object, no nested data or plans array
 *
 * ─── POST /website/quote/pay response shape ──────────────────────────────────
 *   { checkoutUrl, quotedPrice, message }
 *   — note: checkoutUrl is camelCase, not checkout_url
 */

import axios from 'axios';

// ─── Guard: fail loud if env var is missing ───────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error(
    '[RAAH] VITE_API_BASE_URL is not set.\n' +
    'Add to your .env file:\n' +
    '  VITE_API_BASE_URL=http://3.86.179.13:3000\n' +
    'Never hardcode this value in source files.'
  );
}

// ─── Axios instance ───────────────────────────────────────────────────────────
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ─── Request interceptor ──────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// ─── Response interceptor ─────────────────────────────────────────────────────
// Normalises all errors to { message, fieldErrors, statusCode }
// so components never write defensive error.response?.data?.message chains.
apiClient.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status ?? 0;
    const data   = error.response?.data   ?? {};

    if (status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Normalise errors from both NestJS and Laravel shapes:
    //
    // NestJS 400 shape: { statusCode, message: string[], error: string }
    //   message is an array of validation strings — not field-keyed
    //
    // Laravel 422 shape: { message: string, errors: { field: ['msg'] } }
    //   errors is a field-keyed object
    //
    // We normalise both into: { message (string), fieldErrors (object|null), statusCode }

    let normalisedMessage = 'An unexpected error occurred.';
    let fieldErrors = null;

    if (Array.isArray(data.message)) {
      // NestJS array of validation messages — join into readable string
      normalisedMessage = data.message.join(' ');
      // Also expose as fieldErrors keyed by 'general' for components that check it
      fieldErrors = { general: data.message };
    } else if (typeof data.message === 'string') {
      normalisedMessage = data.message;
    } else if (error.message) {
      normalisedMessage = error.message;
    }

    // Laravel field-keyed errors
    if (data.errors && typeof data.errors === 'object') {
      fieldErrors = Object.fromEntries(
        Object.entries(data.errors).map(([k, v]) => [k, Array.isArray(v) ? v : [v]])
      );
    }

    error.message     = normalisedMessage;
    error.fieldErrors = fieldErrors;
    error.statusCode  = status;

    return Promise.reject(error);
  }
);

// ─── Field mappers ────────────────────────────────────────────────────────────
// Translate the form's internal snake_case keys to what the backend expects.
// patientRange must be a range string — never a bare integer.

const mapDemoFields = (data) => ({
  agencyName:        data.agency_name,
  contactName:       data.contact_name,
  email:             data.contact_email,
  phone:             data.contact_phone        || undefined,
  state:             data.state                || undefined,
  patientRange:      data.estimated_patients   || undefined,
  notes:             data.notes                || undefined,
  demoFormat:        data.demo_format          || undefined,
  primaryChallenge:  data.primary_challenge    || undefined,
  preferredDemoDate: data.preferred_demo_date  || undefined,
  recaptchaToken:    data.recaptcha_token,
});

const mapPricingFields = (data) => ({
  agencyName:    data.agency_name,
  contactName:   data.contact_name,
  email:         data.contact_email,
  phone:         data.contact_phone   || undefined,
  state:         data.state           || undefined,
  patientRange:  data.estimated_patients || undefined,
  notes:         data.notes           || undefined,
  recaptchaToken: data.recaptcha_token,
});

// ─── Public API surface ───────────────────────────────────────────────────────

export const publicApi = {

  // ── Lead generation ───────────────────────────────────────────────────────

  /**
   * POST /website/demo-request
   * 201 — Lead created, admin notified
   * Swagger: agencyName, contactName, email, phone, state, notes,
   *          patientRange, demoFormat, primaryChallenge, preferredDemoDate, recaptchaToken
   */
  submitDemoRequest: (data) =>
    apiClient.post('/website/demo-request', mapDemoFields(data)),

  /**
   * POST /website/pricing-request
   * 201 — Lead created, admin notified
   * Swagger: agencyName, contactName, email, phone, state, notes,
   *          patientRange, recaptchaToken
   */
  submitPricingRequest: (data) =>
    apiClient.post('/website/pricing-request', mapPricingFields(data)),

  /**
   * POST /website/contact
   * 201 — { id, message }
   * 403 — reCAPTCHA failed
   * 429 — rate limit (5 per hour per IP)
   * Swagger: name, email, phone, subject, message, source, agency, recaptchaToken
   * source must be exactly 'contact-page'
   */
  submitContact: (data) =>
    apiClient.post('/website/contact', {
      name:           data.name,
      email:          data.email,
      phone:          data.phone             || undefined,
      subject:        data.subject,
      message:        data.message,
      source:         'contact-page',
      agency:         data.agency            || undefined,
      recaptchaToken: data.recaptchaToken    || undefined,
    }),

  // ── Subscription flow ──────────────────────────────────────────────────────

  /**
   * GET /website/quote?token=
   * 200 — { agencyName, contactName, patientRange, quotedPrice, expiresAt, alreadyPaid }
   *        FLAT object — no nested data, no plans array
   * 404 — invalid or unknown token
   * 410 — expired or already paid
   */
  getQuoteDetails: (token) =>
    apiClient.get('/website/quote', { params: { token } }),

  /**
   * POST /website/quote/pay
   * 200 — { checkoutUrl, quotedPrice, message }
   *        Note: checkoutUrl is camelCase
   * 404 — invalid token
   * 409 — already paid
   * 410 — expired
   * Swagger: token, plan_id, stripePaymentMethodId?
   */
  createCheckoutSession: (token, data) =>
    apiClient.post('/website/quote/pay', { token, ...data }),

  // ── Content ────────────────────────────────────────────────────────────────

  /**
   * GET /website/testimonials
   * 10-minute server cache
   */
  getTestimonials: () =>
    apiClient.get('/website/testimonials'),

  /**
   * GET /website/stats
   * 1-hour server cache — aggregate counts only, never per-agency data
   */
  getStats: () =>
    apiClient.get('/website/stats'),

  // ── Newsletter ─────────────────────────────────────────────────────────────

  /**
   * POST /website/newsletter-subscribe
   * 200 — { success, message }
   * 403 — reCAPTCHA failed
   * Swagger: email, source, recaptchaToken
   */
  subscribeNewsletter: ({ email, source = 'website', recaptchaToken }) =>
    apiClient.post('/website/newsletter-subscribe', {
      email,
      source,
      recaptchaToken: recaptchaToken || undefined,
    }),

  /**
   * POST /website/newsletter-unsubscribe
   * 200 — { success, message }
   * 404 — token not found or already used
   * Swagger: token  ← this is the unsubscribe token from the email footer link
   *                   NOT an email address
   */
  unsubscribeNewsletter: (token) =>
    apiClient.post('/website/newsletter-unsubscribe', { token }),

  // ── Book a call ────────────────────────────────────────────────────────────

  /**
   * POST /website/book-call
   * 201 — Call booked, confirmation email sent
   * Swagger: agencyName, contactName, email, phone, state, preferredTime
   */
  bookCall: (data) =>
    apiClient.post('/website/book-call', {
      agencyName:    data.agencyName    || data.agency_name,
      contactName:   data.contactName   || data.contact_name,
      email:         data.email         || data.contact_email,
      phone:         data.phone         || data.contact_phone  || undefined,
      state:         data.state                                || undefined,
      preferredTime: data.preferredTime                        || undefined,
    }),

  // ── Infrastructure ─────────────────────────────────────────────────────────

  /**
   * GET /website/health
   * 200 — { status: 'ok', timestamp }
   * No auth, no DB query — safe to poll from uptime monitors
   */
  healthCheck: () =>
    apiClient.get('/website/health'),
};

export default apiClient;