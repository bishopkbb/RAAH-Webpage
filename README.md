# RAAH Technologies — Public Website

> End-to-end home health agency platform. This repository contains the public-facing marketing website and lead capture frontend for RAAH Technologies — a standalone React SPA that communicates with a Laravel 11 backend via a versioned REST API.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Repository Structure](#3-repository-structure)
4. [Design System](#4-design-system)
5. [Getting Started](#5-getting-started)
6. [Environment Variables](#6-environment-variables)
7. [Available Scripts](#7-available-scripts)
8. [Page Architecture](#8-page-architecture)
9. [Component Architecture](#9-component-architecture)
10. [API Integration](#10-api-integration)
11. [Form Validation](#11-form-validation)
12. [Routing](#12-routing)
13. [Deployment](#13-deployment)
14. [Contributing](#14-contributing)

---

## 1. Project Overview

The RAAH Technologies public website serves three purposes:

| Purpose | Implementation |
|---|---|
| **Marketing** | HomePage, AboutPage, ServicesPage — static, SEO-ready |
| **Lead capture** | DemoRequestPage, PricingRequestPage, ContactPage — form submissions to backend |
| **Subscription flow** | QuotePage (token-gated) → Stripe Checkout → SuccessPage |

The frontend is fully decoupled from the backend. All API communication goes through a single consolidated Axios client at `src/api/services.js`. The backend is a Laravel 11 application deployed separately.

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19 |
| Build tool | Vite | 7 |
| CSS | Tailwind CSS | v4 (CSS-first) |
| Routing | React Router DOM | v6 |
| HTTP client | Axios | — |
| Notifications | react-hot-toast | — |
| CAPTCHA | react-google-recaptcha | v2 |
| Icons | Lucide React + bespoke SVGs | — |
| Fonts | Google Fonts — Inter, Poppins | CDN via index.html |
| Backend | Laravel 11 | PHP 8.2 |
| Payments | Stripe Checkout | Server-side session creation |

---

## 3. Repository Structure

```
raah-website/
├── public/
│   ├── raah_favicon.svg          # Primary favicon (SVG with white circle background)
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-180x180.png       # Apple touch icon
│   ├── favicon-192x192.png       # Android / PWA
│   ├── favicon-512x512.png       # PWA splash
│   └── manifest.json             # PWA manifest
│
├── src/
│   ├── api/
│   │   ├── services.js           # Single API client — all calls go here
│   │   └── client.js             # Deprecated tombstone — delete this file
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx        # Shell: Navbar + children + Footer + Toaster
│   │   │   ├── Navbar.jsx        # Fixed 2-layer navbar (topbar + main nav)
│   │   │   └── Footer.jsx        # Dark green footer, 4-column grid, social links
│   │   └── home/
│   │       └── HeroCarousel.jsx  # Auto-sliding hero with Navbar in heroMode
│   │
│   ├── pages/
│   │   ├── HomePage.jsx          # Hero carousel, feature cards, workflow, testimonials
│   │   ├── AboutPage.jsx         # Mission, story, team stats, values, process
│   │   ├── ServicesPage.jsx      # 9 service cards, platform overview, comparison table
│   │   ├── ContactPage.jsx       # Info cards + contact form
│   │   ├── DemoRequestPage.jsx   # Demo request form
│   │   ├── PricingRequestPage.jsx# Pricing request form
│   │   ├── QuotePage.jsx         # Token-gated quote review and payment
│   │   └── SuccessPage.jsx       # Post-payment confirmation
│   │
│   ├── App.jsx                   # Route declarations only (no BrowserRouter)
│   ├── main.jsx                  # Entry point — single BrowserRouter lives here
│   └── index.css                 # Tailwind directives and global resets
│
├── index.html                    # Entry HTML — fonts, favicons, PWA manifest
├── .env.example                  # Environment variable template
├── .gitignore
├── package.json
└── vite.config.js
```

---

## 4. Design System

All styling uses inline React styles. Tailwind is used for a small number of responsive utility classes. Do not mix the two systems — new components must use inline styles following the patterns below.

### 4.1 Typography

```js
const FI = "'Inter', sans-serif";    // Headings — Inter 900
const FP = "'Poppins', sans-serif";  // Body copy — Poppins 400/500
```

| Element | Font | Weight | Size |
|---|---|---|---|
| Page headings h1 | Inter | 900 | `clamp(2.5rem, 6vw, 5rem)` |
| Section headings h2 | Inter | 900 | `clamp(2.25rem, 5vw, 3.75rem)` |
| Card titles h3 | Inter | 800 | `1.375rem` |
| Body copy | Poppins | 400/500 | `1rem` |
| Eyebrow labels | Poppins | 600 | `0.75rem` |
| Form labels | Inter | 700 | `0.8125rem` |
| Input text | Poppins | 400 | `1.0625rem` |
| Button text | Inter | 700 | `0.9375rem` |

### 4.2 Colour Palette

```
Primary green:      #16a34a   — buttons, links, accents, card titles
Dark green:         #0d7a3e   — gradient dark stop
Deeper green:       #0d8a3e / #0a6b30
Hover green:        #1db954   — card hover gradient start
Mint:               #4ade80   — hero accent words, dark sections only
Light mint:         #86efac   — hover states on dark sections

Light section bg:   #dff0df   — all "white" sections
Dark section bg:    linear-gradient(160deg, #0d7a3e 0%, #16a34a 55%, #0d7a3e 100%)

Text near-black:    #0a0a0a   — primary headings
Text dark:          #0f172a / #1e293b
Text mid:           #374151 / #475569
Text muted:         #64748b / #94a3b8

Error red:          #dc2626   — form validation errors
```

### 4.3 Section Patterns

**Light sections (`#dff0df`):**
- Dot grid: `radial-gradient(circle, rgba(5,46,22,0.06) 1px, transparent 1px)` at `32px`
- Watermark: `transparent`
- Corner radial glows: `rgba(22,163,74,0.07)` top-right, `rgba(22,163,74,0.05)` bottom-left
- Padding: `clamp(60px, 10vw, 120px) 0 clamp(70px, 12vw, 140px)`

**Dark sections (`#0d7a3e → #16a34a → #0d7a3e`):**
- Dot grid: `rgba(74,222,128,0.08)` — mint dots on green
- Watermark: `rgba(255,255,255,0.04)`

**Wave dividers between sections:**
```jsx
<WaveDivider topColor="#dff0df" bottomColor="#0d7a3e" flip={true} />
<WaveDivider topColor="#0d7a3e" bottomColor="#dff0df" />
```

### 4.4 Card Patterns

**Feature cards — white at rest, full green on hover:**
- Rest: `#ffffff` background, `linear-gradient(#16a34a, #22c55e)` top accent, `rgba(22,163,74,0.09)` icon tint
- Hover: `linear-gradient(145deg, #1db954, #16a34a, #0d8a3e)`, shimmer sweep, `translateY(-8px) scale(1.01)`
- All text transitions from green/black to white on hover

**Support cards — white, no colour flip:**
- Top accent bar sweeps in via `scaleX` on hover
- Icon bounces: `translateY(-4px) scale(1.06)`

### 4.5 Scroll Animation

Every page uses a consistent `useInView` + `Reveal` pattern:

```jsx
const Reveal = ({ children, delay = 0 }) => (
  <div style={{
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
  }}>
    {children}
  </div>
);
```

Stagger sibling elements with delays in `60–100ms` increments.

### 4.6 Eyebrow Component

```jsx
<Eyebrow label="Section Name" />        // Light section — green dashes and text
<Eyebrow label="Section Name" light />  // Dark section — white dashes and text
```

Never use `#4ade80` mint for eyebrows on green backgrounds — same hue family produces low contrast.

---

## 5. Getting Started

### Prerequisites

- Node.js `>= 18`
- npm `>= 9`

### Installation

```bash
# Clone the repository
git clone https://github.com/raah-technologies/raah-website.git
cd raah-website

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Fill in your environment variables (see Section 6)
nano .env

# Start development server
npm run dev
```

The app runs at `http://localhost:5173` by default.

---

## 6. Environment Variables

Copy `.env.example` to `.env` and populate all values. Never commit `.env` to version control.

```bash
# .env.example

# Laravel backend base URL — no trailing slash
# Local development:
VITE_API_BASE_URL=http://localhost:8000/api/v1
# Production:
# VITE_API_BASE_URL=https://your-backend-domain.com/api/v1

# reCAPTCHA v2 site key (public — safe to expose in the browser)
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_v2_site_key_here
```

**Rules:**
- Only `VITE_` prefixed variables are exposed to the browser by Vite
- The application throws a clear startup error if `VITE_API_BASE_URL` is missing, surfacing misconfiguration immediately rather than at runtime
- The reCAPTCHA site key must be whitelisted for every domain the app is served from

---

## 7. Available Scripts

```bash
npm run dev        # Start Vite dev server with HMR at localhost:5173
npm run build      # Production build — output to dist/
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint across src/
```

---

## 8. Page Architecture

### Marketing pages

| Route | Component | Notes |
|---|---|---|
| `/` | `HomePage` | Hero carousel, 6 feature cards, workflow section, testimonial carousel, CTA |
| `/about` | `AboutPage` | Mission, story, team stats, values cards, 3-step process |
| `/services` | `ServicesPage` | 9 service cards, platform overview narrative, comparison table |

### Lead capture pages

| Route | Component | API endpoint |
|---|---|---|
| `/demo` | `DemoRequestPage` | `POST /website/demo-request` |
| `/pricing` | `PricingRequestPage` | `POST /website/pricing-request` |
| `/contact` | `ContactPage` | `POST /website/contact` |

### Subscription flow

| Route | Component | API endpoints |
|---|---|---|
| `/quote/:token` | `QuotePage` | `GET /website/quote?token=` then `POST /website/quote/pay` |
| `/signup-success` | `SuccessPage` | Reads `?session_id=` from Stripe redirect |

---

## 9. Component Architecture

### Layout shell

```
Layout.jsx
├── Navbar.jsx        (omitted on HomePage via hideNav prop)
├── {page content}
├── Footer.jsx
└── Toaster           (react-hot-toast, position top-right)
```

`HomePage` passes `hideNav` to `Layout` and renders its own `<Navbar heroMode />` inside `HeroCarousel`, overlaying the full-bleed hero image.

### Shared component rules

These rules are enforced by ESLint and must be followed in all new code:

1. **No `useState` inside `.map()`** — extract to a named component
2. **No `Icon` alias in `.map()` callbacks** — use `React.createElement(icon, props)` with lowercase key
3. **No `<form>` HTML tags** — use `<button onClick={handleSubmit}>` to prevent default browser submission behaviour
4. **No `useEffect` setState** — use functional state updates `setState(prev => ...)`
5. **All imports must be used** — ESLint `no-unused-vars` is enforced at the `/^[A-Z_]/` threshold
6. **All JSX comments must be closed** — `{/* text */}` not `{/* text */`
7. **No em dashes in rendered content** — use commas or sentence breaks

### Responsive grid pattern

All responsive grids use injected `<style>` tags with class names. Never use inline `gridTemplateColumns` as it overrides Tailwind at all breakpoints and cannot be overridden per breakpoint:

```jsx
// Correct
<style>{`
  .feature-grid { display: grid; gap: 24px; grid-template-columns: 1fr; }
  @media (min-width: 640px)  { .feature-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .feature-grid { grid-template-columns: repeat(3, 1fr); } }
`}</style>
<div className="feature-grid">...</div>

// Incorrect — do not do this
<div style={{ gridTemplateColumns: 'repeat(3, 1fr)' }} className="grid-cols-1">
```

---

## 10. API Integration

### Single source of truth

All API calls go through `src/api/services.js`. No component should import Axios directly or construct URLs manually.

`src/api/client.js` is a deprecated tombstone file that throws on import. Delete it after confirming no stray imports remain:

```bash
grep -r "api/client" src/
# Must return nothing before deletion
```

### Field name mapping

The frontend forms use `snake_case` field names internally. The backend expects `camelCase`. This translation happens inside `services.js` — components pass their raw field names and the service layer handles the mapping:

| Frontend form field | Backend field |
|---|---|
| `agency_name` | `agencyName` |
| `contact_name` | `contactName` |
| `contact_email` | `email` |
| `contact_phone` | `phone` |
| `estimated_patients` | `patientRange` |
| `recaptcha_token` | `recaptchaToken` |

### Active endpoints

```
POST   /website/demo-request          Lead: agency requests a demo
POST   /website/pricing-request       Lead: agency requests a pricing quote
POST   /website/contact               General contact form submission
GET    /website/quote?token=          Load personalised quote by token
POST   /website/quote/pay             Create Stripe Checkout session
GET    /website/testimonials          Approved testimonials for homepage
GET    /website/stats                 Live platform statistics for homepage
POST   /website/newsletter-subscribe  Newsletter opt-in
POST   /website/newsletter-unsubscribe Newsletter opt-out
POST   /website/book-call             Sales call booking
GET    /website/health                Infrastructure health check
```

### Error handling

The response interceptor in `services.js` normalises all errors before they reach components. Every caught error exposes:

```js
error.message      // string   — human-readable summary
error.fieldErrors  // object   — { fieldName: ['message'] } from Laravel 422, or null
error.statusCode   // number   — HTTP status code, or 0 for network failures
```

Handle errors in components as follows:

```jsx
try {
  await publicApi.submitDemoRequest(payload);
  setSubmitted(true);
} catch (error) {
  if (error.fieldErrors) {
    // Surface Laravel validation errors inline on the relevant fields
    const mapped = {};
    Object.entries(error.fieldErrors).forEach(([key, msgs]) => {
      mapped[key] = msgs[0];
    });
    setErrors(prev => ({ ...prev, ...mapped }));
  } else {
    toast.error(error.message);
  }
}
```

---

## 11. Form Validation

All lead capture forms use a consistent validation pattern with no external library.

### Core pattern

```js
// 1. Pure validation function — returns an error object
const validate = (fields) => {
  const errs = {};
  if (!fields.agency_name.trim())
    errs.agency_name = 'Agency name is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.contact_email))
    errs.contact_email = 'Enter a valid email address.';
  return errs;
};

// 2. touched state — errors only shown on interacted fields
const [touched, setTouched] = useState({});

// 3. Validate on blur, mark field as touched
const handleBlurField = e => {
  const { name } = e.target;
  setTouched(prev => ({ ...prev, [name]: true }));
  const errs = validate(fields);
  setErrors(prev => ({ ...prev, [name]: errs[name] || null }));
};

// 4. Submit guard — validate all fields before API call
const handleSubmit = async e => {
  e.preventDefault();
  const errs = validate(fields);
  setErrors(errs);
  setTouched(Object.fromEntries(Object.keys(fields).map(k => [k, true])));
  if (Object.keys(errs).length > 0) {
    toast.error('Please fix the highlighted fields before submitting.');
    return;
  }
  // proceed to API call
};

// 5. Inline error display
const FieldError = ({ msg }) => msg
  ? <p style={{ color: '#dc2626', fontSize: '0.78rem' }}>{msg}</p>
  : null;
```

### Validation rules per form

| Form | Required fields | Optional with format check |
|---|---|---|
| DemoRequestPage | agency_name, contact_name, contact_email, estimated_patients | contact_phone |
| PricingRequestPage | agency_name, contact_name, contact_email | contact_phone |
| ContactPage | name, agency, email, subject, message | phone |

---

## 12. Routing

Route declarations live in `App.jsx`. `BrowserRouter` lives exclusively in `main.jsx`. This separation is intentional — nesting two `BrowserRouter` instances breaks `useSearchParams` on `SuccessPage` and `useParams` on `QuotePage` in React Router v6.

| Route | Component |
|---|---|
| `/` | `HomePage` |
| `/about` | `AboutPage` |
| `/services` | `ServicesPage` |
| `/contact` | `ContactPage` |
| `/demo` | `DemoRequestPage` |
| `/pricing` | `PricingRequestPage` |
| `/quote/:token` | `QuotePage` |
| `/signup-success` | `SuccessPage` |

---

## 13. Deployment

### Build

```bash
npm run build
```

Output is written to `dist/`. Upload the contents of `dist/` to the web server's public directory.

### SPA routing — required

Because this is a single-page application, the web server must redirect all non-asset requests to `index.html`. Without this rule, any direct URL access to `/about`, `/demo`, or `/quote/:token` returns a server 404.

**Apache — `.htaccess` in the public root:**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

If the app is served from a subdirectory (e.g. `/raahtech/`), update `RewriteBase` and the fallback path:

```apache
RewriteBase /raahtech/
RewriteRule . /raahtech/index.html [L]
```

**Nginx:**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Environment variables at build time

Vite bakes environment variables into the bundle at build time. Inject them before running the build:

```bash
VITE_API_BASE_URL=https://your-backend.com/api/v1 \
VITE_RECAPTCHA_SITE_KEY=your_production_key \
npm run build
```

### Post-deployment checklist

- [ ] `VITE_API_BASE_URL` points to the production backend
- [ ] `VITE_RECAPTCHA_SITE_KEY` is the production key registered for the live domain
- [ ] Apache `.htaccess` or Nginx rewrite rule is in place for SPA routing
- [ ] reCAPTCHA domain whitelist includes the production domain
- [ ] Backend CORS config allows requests from the production frontend origin
- [ ] `src/api/client.js` has been deleted from the repository
- [ ] `npm run lint` returns zero errors on the final build commit

---

## 14. Contributing

### Branch strategy

```
main        — production-ready code only
develop     — integration branch for reviewed PRs
feature/*   — new features branched from develop
fix/*       — bug fixes branched from develop
```

### Commit message format

Follow the Conventional Commits specification:

```
<type>(<scope>): <short description>

Examples:
feat(contact):    wire contact form to POST /website/contact
fix(api):         remove hardcoded localhost URL from client.js
style(services):  match hero text pattern to About and Contact pages
chore(env):       add .env.example with required variable documentation
refactor(quote):  extract BillingToggle into named component
```

### Pre-PR checklist

- [ ] `npm run lint` passes with zero errors or warnings
- [ ] No unclosed JSX comments — `{/* text */}` not `{/* text */`
- [ ] No `useState` calls inside `.map()` callbacks
- [ ] No unused imports
- [ ] No hardcoded URLs — all base URLs read from `import.meta.env.VITE_API_BASE_URL`
- [ ] New form fields added to the relevant `validate()` function
- [ ] New API endpoints added to `src/api/services.js` only — never call Axios directly in a component
- [ ] New responsive grids use the injected `<style>` class pattern, not inline `gridTemplateColumns`

---

## Appendix A — API Field Reference

### POST /website/demo-request

```json
{
  "agencyName": "Caring Hands Health",
  "contactName": "Sarah Johnson",
  "email": "sarah@agency.org",
  "phone": "+1 (720) 000-0000",
  "patientRange": "25",
  "notes": "Optional notes",
  "demoFormat": "live",
  "primaryChallenge": "billing",
  "preferredDemoDate": "2026-06-01",
  "recaptchaToken": "03AGdBq..."
}
```

### POST /website/pricing-request

```json
{
  "agencyName": "Caring Hands Health",
  "contactName": "Sarah Johnson",
  "email": "sarah@agency.org",
  "phone": "+1 (720) 000-0000",
  "patientRange": "75",
  "notes": "Optional needs or questions",
  "recaptchaToken": "03AGdBq..."
}
```

### POST /website/contact

```json
{
  "name": "Sarah Johnson",
  "email": "sarah@agency.org",
  "phone": "+1 (720) 000-0000",
  "subject": "demo",
  "message": "I would like to learn more about EVV compliance.",
  "source": "website",
  "agency": "Caring Hands Home Health"
}
```

### GET /website/quote?token=abc123

```json
{
  "data": {
    "agency_name": "Caring Hands Health",
    "plans": [
      {
        "id": 1,
        "name": "Growth Plan",
        "price": 299.00,
        "billing_interval": "monthly"
      },
      {
        "id": 2,
        "name": "Growth Plan Annual",
        "price": 2990.00,
        "billing_interval": "yearly"
      }
    ],
    "default_plan_id": 1
  }
}
```

### POST /website/quote/pay

```json
// Request
{ "token": "abc123", "plan_id": 1 }

// Response
{ "checkout_url": "https://checkout.stripe.com/c/pay/cs_live_..." }
```

---

## Appendix B — Design Tokens Quick Reference

```js
// Typography
const FI = "'Inter', sans-serif";
const FP = "'Poppins', sans-serif";

// Section backgrounds
const lightBg  = '#dff0df';
const darkBg   = 'linear-gradient(160deg, #0d7a3e 0%, #16a34a 55%, #0d7a3e 100%)';

// Brand colours
const green    = '#16a34a';
const darkGreen = '#0d7a3e';
const mint     = '#4ade80';   // dark sections only

// Text
const textPrimary   = '#0a0a0a';
const textSecondary = '#374151';
const textMuted     = '#64748b';
const errorRed      = '#dc2626';

// Card shadow (light section)
const cardShadow = '0 8px 48px rgba(5,46,22,0.10), 0 2px 12px rgba(5,46,22,0.06)';

// Input
const inputStyle = {
  border: '1.5px solid rgba(22,163,74,0.22)',
  background: '#f8fffc',
  borderRadius: '12px',
  padding: '16px 20px',
  fontSize: '1.0625rem',
  color: '#0a0a0a',
};

// Focus ring
const focusRing = '0 0 0 3px rgba(22,163,74,0.10)';

// Button — solid primary
const btnPrimary = {
  background: '#16a34a',
  color: '#ffffff',
  border: '2px solid #16a34a',
  borderRadius: '999px',
  padding: '16px 44px',
  boxShadow: '0 6px 24px rgba(22,163,74,0.30)',
};
```

---

*RAAH Technologies Engineering — Production Documentation*