/**
 * src/api/services.js — RAAH Technologies
 *
 * Single authoritative API client for ALL public website calls.
 *
 * ─── What changed and why ────────────────────────────────────────────────────
 *
 * BEFORE: Two Axios instances existed:
 *   • api/client.js  — hardcoded 'http://localhost/...' URL. No env var.
 *                      No timeout. No interceptors. Used by publicApi.
 *   • services/api.js — reads from VITE_API_BASE_URL. Has interceptors.
 *                       Used by admin pages only.
 *
 * PROBLEM: publicApi was calling the broken client (localhost), so ALL
 *   form submissions (DemoRequest, PricingRequest, QuotePage) silently
 *   failed in any non-local environment.
 *
 * ALSO: Endpoint paths were wrong:
 *   /demo-requests      → should be /website/demo-request
 *   /pricing-requests   → should be /website/pricing-request
 *   /quote/:token       → should be /website/quote?token=:token  (GET)
 *   /quote/:token/checkout → should be /website/quote/pay        (POST)
 *   Contact form had NO endpoint at all (setTimeout stub only).
 *
 * FIX:
 *   1. Kill api/client.js — replace this file with the consolidated client.
 *   2. Build one Axios instance from VITE_API_BASE_URL with timeout,
 *      content-type headers, and a response interceptor that normalises
 *      all error shapes before they reach any component.
 *   3. Wire every public endpoint with the correct paths from the handover doc.
 *   4. Export publicApi as a named export so all pages import identically.
 *
 * ─── Environment variable required ──────────────────────────────────────────
 *   VITE_API_BASE_URL=https://api.raahtech.com/api/v1   (production)
 *   VITE_API_BASE_URL=http://localhost:8000/api/v1       (local dev)
 *
 *   This file will throw a clear startup error if the var is missing
 *   so it surfaces immediately in dev rather than silently failing at runtime.
 */

import axios from 'axios';

// ─── Guard: fail loud if env var is missing ───────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error(
    '[RAAH] VITE_API_BASE_URL is not set.\n' +
    'Create a .env file at the project root with:\n' +
    '  VITE_API_BASE_URL=http://localhost:8000/api/v1\n' +
    'Never hardcode this value in source files.'
  );
}

// ─── Axios instance ───────────────────────────────────────────────────────────
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // 15 s — generous for mobile networks
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ─── Request interceptor ──────────────────────────────────────────────────────
// Attaches the admin Bearer token when present.
// Public endpoints are unauthenticated — the token is simply absent.
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
// Normalises every error into a consistent shape so components
// never need to write defensive chains like:
//   error.response?.data?.message || error.message || 'Unknown error'
//
// After this interceptor every caught error has:
//   error.message        — human-readable summary string
//   error.fieldErrors    — { fieldName: ['msg', ...] } | null
//   error.statusCode     — HTTP status | 0 for network failures
//
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

    // Normalise field errors (Laravel 422 validation shape)
    const fieldErrors = data.errors
      ? Object.fromEntries(
          Object.entries(data.errors).map(([k, v]) => [
            k,
            Array.isArray(v) ? v : [v],
          ])
        )
      : null;

    // Attach normalised props to the error object
    error.message    = data.message || error.message || 'An unexpected error occurred.';
    error.fieldErrors = fieldErrors;
    error.statusCode  = status;

    return Promise.reject(error);
  }
);

// ─── Public API surface ───────────────────────────────────────────────────────
// All paths match /website/* from the engineering handover doc exactly.
// No path should ever be guessed — if the backend changes a path, change it here.

export const publicApi = {

  // ── Lead generation ──────────────────────────────────────────────────────────

  /**
   * POST /website/demo-request
   * Payload: { agency_name, contact_name, contact_email, contact_phone?,
   *            estimated_patients, preferred_demo_date?, demo_format,
   *            primary_challenge?, recaptcha_token }
   */
  submitDemoRequest: (data) =>
    apiClient.post('/website/demo-request', data),

  /**
   * POST /website/pricing-request
   * Payload: { agency_name, contact_name, contact_email, contact_phone?,
   *            estimated_patients?, notes?, recaptcha_token }
   */
  submitPricingRequest: (data) =>
    apiClient.post('/website/pricing-request', data),

  /**
   * POST /website/contact
   * Payload: { name, agency, email, phone?, subject, message }
   */
  submitContact: (data) =>
    apiClient.post('/website/contact', data),

  // ── Subscription flow ────────────────────────────────────────────────────────

  /**
   * GET /website/quote?token=:token
   * Returns: { data: { agency_name, plans: [...], default_plan_id } }
   * Token-gated — no auth header needed, token is in the query string.
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

  // ── Dynamic content (for future wiring) ─────────────────────────────────────

  /**
   * GET /website/testimonials
   * Returns approved testimonials for the HomePage carousel.
   * Currently the HomePage uses static TESTIMONIALS data.
   * Swap to this call when the backend is ready.
   */
  getTestimonials: () =>
    apiClient.get('/website/testimonials'),

  /**
   * GET /website/stats
   * Returns live platform stats: agencies_served, visits_managed, etc.
   * Currently the HomePage uses hardcoded stat values.
   * Swap to this call when the backend is ready.
   */
  getStats: () =>
    apiClient.get('/website/stats'),

  /**
   * POST /website/newsletter-subscribe
   * Payload: { email }
   * Used by the Footer newsletter opt-in.
   */
  subscribeNewsletter: (email) =>
    apiClient.post('/website/newsletter-subscribe', { email }),
};

export default apiClient;