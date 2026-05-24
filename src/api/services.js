/**
 * src/api/services.js — RAAH Technologies
 *
 * Single authoritative API client for ALL public website calls.
 *
 * ─── Field name mapping (snake_case → camelCase) ─────────────────────────────
 * The frontend forms use snake_case field names internally (React convention).
 * The backend expects camelCase. This file is the translation layer —
 * components never need to know the backend's naming convention.
 *
 *   Frontend form field     →  Backend field name
 *   ─────────────────────────────────────────────
 *   agency_name             →  agencyName
 *   contact_name            →  contactName
 *   contact_email           →  email
 *   contact_phone           →  phone
 *   estimated_patients      →  patientRange
 *   recaptcha_token         →  recaptchaToken
 *   notes                   →  notes          (same)
 *   state                   →  state          (new — not collected yet)
 *
 * ─── Environment variable required ───────────────────────────────────────────
 *   VITE_API_BASE_URL=https://traceworka.ng/raahtech/api/v1
 */

import axios from 'axios';

// ─── Guard: fail loud if env var is missing ───────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error(
    '[RAAH] VITE_API_BASE_URL is not set.\n' +
    'Add to your .env file:\n' +
    '  VITE_API_BASE_URL=https://traceworka.ng/raahtech/api/v1\n' +
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
// Normalises every error into { message, fieldErrors, statusCode }
// so components never need to write defensive error.response?.data chains.
apiClient.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status ?? 0;
    const data   = error.response?.data ?? {};

    // 401 — admin session expired; kick to login
    if (status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Normalise Laravel 422 validation errors
    const fieldErrors = data.errors
      ? Object.fromEntries(
          Object.entries(data.errors).map(([k, v]) => [
            k,
            Array.isArray(v) ? v : [v],
          ])
        )
      : null;

    error.message     = data.message || error.message || 'An unexpected error occurred.';
    error.fieldErrors = fieldErrors;
    error.statusCode  = status;

    return Promise.reject(error);
  }
);

// ─── Field name mapper ────────────────────────────────────────────────────────
// Converts the frontend's snake_case form fields to the backend's camelCase.
// Called inside every public submit function — never in components.
const mapDemoFields = (data) => ({
  agencyName:     data.agency_name,
  contactName:    data.contact_name,
  email:          data.contact_email,
  phone:          data.contact_phone   || undefined,
  patientRange:   data.estimated_patients
                    ? String(data.estimated_patients)
                    : undefined,
  notes:          data.notes           || undefined,
  // Extra fields the backend may ignore but are useful for analytics
  demoFormat:     data.demo_format     || undefined,
  primaryChallenge: data.primary_challenge || undefined,
  preferredDemoDate: data.preferred_demo_date || undefined,
  recaptchaToken: data.recaptcha_token,
});

const mapPricingFields = (data) => ({
  agencyName:     data.agency_name,
  contactName:    data.contact_name,
  email:          data.contact_email,
  phone:          data.contact_phone   || undefined,
  patientRange:   data.estimated_patients
                    ? String(data.estimated_patients)
                    : undefined,
  notes:          data.notes           || undefined,
  recaptchaToken: data.recaptcha_token,
});

// ─── Public API surface ───────────────────────────────────────────────────────

export const publicApi = {

  // ── Lead generation ───────────────────────────────────────────────────────

  /**
   * POST /website/demo-request
   * Backend fields: agencyName, contactName, email, phone,
   *                 state, patientRange, notes, recaptchaToken
   */
  submitDemoRequest: (data) =>
    apiClient.post('/website/demo-request', mapDemoFields(data)),

  /**
   * POST /website/pricing-request
   * Backend fields: agencyName, contactName, email, phone,
   *                 patientRange, notes, recaptchaToken
   */
  submitPricingRequest: (data) =>
    apiClient.post('/website/pricing-request', mapPricingFields(data)),

  /**
   * POST /website/contact
   * Backend fields: name, email, phone, subject, message, source
   * Note: 'agency' field from the form is sent as extra — backend may ignore.
   */
  submitContact: (data) =>
    apiClient.post('/website/contact', {
      name:    data.name,
      email:   data.email,
      phone:   data.phone    || undefined,
      subject: data.subject,
      message: data.message,
      source:  'website',
      // agency is not in the backend spec but sent for Super Admin context
      agency:  data.agency   || undefined,
    }),

  // ── Subscription flow ──────────────────────────────────────────────────────

  /**
   * GET /website/quote?token=:token
   * Returns: { data: { agency_name, plans: [...], default_plan_id } }
   */
  getQuoteDetails: (token) =>
    apiClient.get('/website/quote', { params: { token } }),

  /**
   * POST /website/quote/pay
   * Payload: { token, plan_id }
   * Returns: { checkout_url }
   */
  createCheckoutSession: (token, data) =>
    apiClient.post('/website/quote/pay', { token, ...data }),

  // ── Content endpoints ──────────────────────────────────────────────────────

  /**
   * GET /website/testimonials
   * Returns approved testimonials for the HomePage carousel.
   */
  getTestimonials: () =>
    apiClient.get('/website/testimonials'),

  /**
   * GET /website/stats
   * Returns live platform stats for the HomePage.
   */
  getStats: () =>
    apiClient.get('/website/stats'),

  /**
   * POST /website/newsletter-subscribe
   * Payload: { email }
   */
  subscribeNewsletter: (email) =>
    apiClient.post('/website/newsletter-subscribe', { email }),

  /**
   * POST /website/newsletter-unsubscribe
   * Payload: { email }
   */
  unsubscribeNewsletter: (email) =>
    apiClient.post('/website/newsletter-unsubscribe', { email }),

  /**
   * POST /website/book-call
   * Payload: { name, email, phone?, preferredTime? }
   */
  bookCall: (data) =>
    apiClient.post('/website/book-call', data),
};

export default apiClient;