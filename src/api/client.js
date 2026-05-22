/**
 * src/api/client.js — DEPRECATED
 *
 * This file previously contained a hardcoded Axios instance pointing at
 * 'http://localhost/projects/raahtech/api/v1'. It has been replaced.
 *
 * ─── What to do ──────────────────────────────────────────────────────────────
 * Delete this file entirely from the repository.
 * All API calls must go through:
 *
 *   import { publicApi } from '../api/services';   // public website pages
 *   import apiClient from '../api/services';        // direct axios calls if needed
 *
 * The canonical client lives in src/api/services.js and reads the base URL
 * from the VITE_API_BASE_URL environment variable.
 *
 * If you import this file anywhere, you will get a clear error pointing here.
 */

throw new Error(
  '[RAAH] src/api/client.js is deprecated and must not be imported.\n' +
  'Use: import { publicApi } from "../api/services" instead.\n' +
  'Delete this file once all imports have been updated.'
);