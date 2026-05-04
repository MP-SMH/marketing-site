/**
 * @fileoverview Consent-version fetching med enterprise-grade error handling
 *
 * Public API:
 *   - fetchActiveConsents({ signal, timeoutMs }) -> Promise<consentsByType>
 *   - ConsentFetchError (custom error class)
 *   - CONSENT_TYPES (frozen array af 4 types)
 *
 * Features:
 *   - Network timeout (default 15s)
 *   - Auto-retry op til 2x med exponential backoff (1s, 2s)
 *   - AbortController-support (cancel ved unmount)
 *   - Request deduplication (concurrent calls deler én request)
 *   - Response validation (alle 4 types skal vaere tilstede)
 *   - Custom error codes for praecis fejlhaandtering i UI
 *
 * Error codes (kastet via ConsentFetchError):
 *   - TIMEOUT          : Fetch tog laengere end timeoutMs
 *   - ABORTED          : Caller cancelled via signal
 *   - NETWORK_ERROR    : Underlying fetch fejlede (offline, DNS, etc.)
 *   - SUPABASE_ERROR   : Supabase returnerede error i response
 *   - INVALID_RESPONSE : Response havde uventet shape
 *   - MISSING_CONSENTS : Ikke alle 4 consent_types fundet
 *
 * Reference: docs/strategy/consent-strategy-v1.1.md sektion 4.1
 *            docs/specs/opgave-6-marketing-step3-spec.md krav 4
 */

import { supabase } from './supabaseClient';

// =====================================================================
// CONSTANTS
// =====================================================================

/**
 * De 4 konsent-typer der skal eksistere i consent_versions.
 * Order matcher database-seed.
 */
export const CONSENT_TYPES = Object.freeze([
  'platform_terms',
  'gdpr_terms',
  'pii_consent',
  'marketing_consent',
]);

const FETCH_TIMEOUT_MS = 15000;
const MAX_RETRIES = 2;
const BACKOFF_BASE_MS = 1000;
const LANGUAGE = 'da';

// =====================================================================
// ERROR CLASS
// =====================================================================

/**
 * Custom error class med error-code for caller-side branching.
 *
 * @property {string} code           - Identifier for fejltypen
 * @property {Error|null} originalError - Underliggende fejl (hvis relevant)
 */
export class ConsentFetchError extends Error {
  constructor(code, message, originalError = null) {
    super(message);
    this.name = 'ConsentFetchError';
    this.code = code;
    this.originalError = originalError;
  }
}

// =====================================================================
// DEDUPLICATION (module-scope state)
// =====================================================================

/**
 * Holder reference til in-flight Promise.
 * Concurrent calls til fetchActiveConsents() returnerer samme Promise
 * indtil den settler (success eller fail), hvorefter cache nulstilles.
 *
 * Dette forhindrer:
 *   - Double-fetch ved React StrictMode dobbelt-rendering i dev
 *   - Race conditions hvis component remounter hurtigt
 */
let inFlightPromise = null;

// =====================================================================
// PUBLIC API
// =====================================================================

/**
 * Henter alle 4 aktive consent_versions fra Supabase.
 *
 * @param {object} [options]
 * @param {AbortSignal} [options.signal] - Cancel ved unmount
 * @param {number} [options.timeoutMs=15000] - Timeout per attempt
 * @returns {Promise<{
 *   platform_terms: object,
 *   gdpr_terms: object,
 *   pii_consent: object,
 *   marketing_consent: object
 * }>} Indexed by consent_type, hver med felter:
 *      id, consent_type, version, title, content_markdown,
 *      effective_from, is_optional
 * @throws {ConsentFetchError}
 */
export async function fetchActiveConsents(options = {}) {
  if (inFlightPromise) {
    return inFlightPromise;
  }

  inFlightPromise = doFetchWithRetry(options).finally(() => {
    inFlightPromise = null;
  });

  return inFlightPromise;
}

// =====================================================================
// INTERNAL: Retry-loop med exponential backoff
// =====================================================================

const NON_RETRYABLE_CODES = Object.freeze([
  'ABORTED',
  'INVALID_RESPONSE',
  'MISSING_CONSENTS',
]);

async function doFetchWithRetry({ signal, timeoutMs = FETCH_TIMEOUT_MS } = {}) {
  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      return await doSingleFetch({ signal, timeoutMs });
    } catch (err) {
      lastError = err;

      // Skip retry for caller-cancellation, schema-fejl og missing data.
      // Kun network/timeout/server-fejl retryes.
      const code = err && err.code;
      if (NON_RETRYABLE_CODES.includes(code)) {
        throw err;
      }

      // Sidste forsoeg fejlede - kast videre
      if (attempt === MAX_RETRIES) {
        throw err;
      }

      // Exponential backoff: 1s, 2s
      const backoffMs = (2 ** attempt) * BACKOFF_BASE_MS;
      await sleep(backoffMs);

      // Hvis caller cancellerede under sleep, abort
      if (signal && signal.aborted) {
        throw new ConsentFetchError('ABORTED', 'Fetch cancelled by caller');
      }
    }
  }

  // Burde ikke kunne naa hertil - kast lastError som safety
  throw lastError;
}

// =====================================================================
// INTERNAL: Single fetch attempt
// =====================================================================

async function doSingleFetch({ signal, timeoutMs }) {
  if (signal && signal.aborted) {
    throw new ConsentFetchError('ABORTED', 'Fetch cancelled by caller');
  }

  // Supabase JS query builder er thenable - kan wrappes med Promise.resolve
  const supabaseQuery = supabase
    .from('consent_versions')
    .select('id, consent_type, version, title, content_markdown, effective_from, is_optional')
    .is('effective_to', null)
    .eq('language', LANGUAGE)
    .order('consent_type');

  const result = await withTimeoutAndAbort(supabaseQuery, timeoutMs, signal);

  return validateAndIndex(result);
}

// =====================================================================
// INTERNAL: Response validation + indexing by consent_type
// =====================================================================

const REQUIRED_ROW_FIELDS = Object.freeze([
  'id',
  'consent_type',
  'version',
  'title',
  'content_markdown',
  'effective_from',
]);

function validateAndIndex(result) {
  if (!result || typeof result !== 'object') {
    throw new ConsentFetchError(
      'INVALID_RESPONSE',
      'Supabase returnerede uventet shape'
    );
  }

  if (result.error) {
    throw new ConsentFetchError(
      'SUPABASE_ERROR',
      result.error.message || 'Supabase fejl',
      result.error
    );
  }

  if (!Array.isArray(result.data)) {
    throw new ConsentFetchError(
      'INVALID_RESPONSE',
      'Forventede array af consent_versions'
    );
  }

  const byType = {};
  for (const row of result.data) {
    if (!row || typeof row !== 'object') {
      throw new ConsentFetchError(
        'INVALID_RESPONSE',
        'Consent row er ikke et object'
      );
    }
    for (const field of REQUIRED_ROW_FIELDS) {
      if (row[field] === undefined || row[field] === null) {
        throw new ConsentFetchError(
          'INVALID_RESPONSE',
          `Consent row mangler required field: ${field}`
        );
      }
    }
    byType[row.consent_type] = row;
  }

  // Verificer alle 4 types findes
  for (const type of CONSENT_TYPES) {
    if (!byType[type]) {
      throw new ConsentFetchError(
        'MISSING_CONSENTS',
        `Mangler aktiv consent_version af type: ${type}`
      );
    }
  }

  return byType;
}

// =====================================================================
// INTERNAL: Timeout + abort wrapper
// =====================================================================

/**
 * Wrap en Promise med timeout og AbortSignal.
 * Foerst-til-settle vinder (race).
 *
 * @param {Promise|Thenable} promiseLike
 * @param {number} timeoutMs
 * @param {AbortSignal|undefined} signal
 * @returns {Promise} resolves til original value, eller rejects med ConsentFetchError
 */
function withTimeoutAndAbort(promiseLike, timeoutMs, signal) {
  return new Promise((resolve, reject) => {
    let settled = false;
    let timeoutHandle = null;
    let abortHandler = null;

    const cleanup = () => {
      if (settled) return;
      settled = true;
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }
      if (signal && abortHandler) {
        signal.removeEventListener('abort', abortHandler);
        abortHandler = null;
      }
    };

    timeoutHandle = setTimeout(() => {
      if (settled) return;
      cleanup();
      reject(new ConsentFetchError(
        'TIMEOUT',
        `Fetch timed out efter ${timeoutMs}ms`
      ));
    }, timeoutMs);

    if (signal) {
      if (signal.aborted) {
        cleanup();
        reject(new ConsentFetchError('ABORTED', 'Fetch cancelled by caller'));
        return;
      }
      abortHandler = () => {
        if (settled) return;
        cleanup();
        reject(new ConsentFetchError('ABORTED', 'Fetch cancelled by caller'));
      };
      signal.addEventListener('abort', abortHandler);
    }

    Promise.resolve(promiseLike).then(
      (value) => {
        if (settled) return;
        cleanup();
        resolve(value);
      },
      (err) => {
        if (settled) return;
        cleanup();
        if (err && err.name === 'AbortError') {
          reject(new ConsentFetchError('ABORTED', 'Fetch aborted'));
        } else {
          reject(new ConsentFetchError(
            'NETWORK_ERROR',
            (err && err.message) || 'Network fejl',
            err
          ));
        }
      }
    );
  });
}

// =====================================================================
// INTERNAL: Promise-based sleep
// =====================================================================

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
