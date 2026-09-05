import { FeedbackContractError, validateSubmissionInput, validateIdempotencyKey, canonicalSubmissionDigest, validateAcceptedReceipt, feedbackContractLimits } from './feedback-contract.mjs';

class BoundaryError extends Error {
  constructor(code, status) { super(code); this.code = code; this.status = status; }
}
const errors = Object.freeze({ feedback_closed: 503, feedback_invalid: 400, feedback_conflict: 409, feedback_rate_limited: 429, feedback_forbidden: 403, feedback_expired: 410 });
function reply(status, value) {
  return new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...(status === 429 ? { 'Retry-After': '3600' } : {}) } });
}

// Reads wire bytes before parsing; stops unknown/chunked bodies at the same cap.
export async function boundedJson(message, limit, signal) {
  const reader = message.body?.getReader();
  if (!reader) throw new BoundaryError('feedback_invalid', 400);
  let size = 0;
  const chunks = [];
  const cancel = () => { void reader.cancel().catch(() => {}); };
  signal.addEventListener('abort', cancel, { once: true });
  try {
    while (true) {
      signal.throwIfAborted();
      const { done, value } = await reader.read();
      signal.throwIfAborted();
      if (done) break;
      size += value.byteLength;
      if (size > limit) { cancel(); throw new BoundaryError('feedback_too_large', 413); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    try { return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)); }
    catch { throw new BoundaryError('feedback_invalid', 400); }
  } finally { signal.removeEventListener('abort', cancel); reader.releaseLock(); }
}

// Only the deployment adapter may supply remoteAddress from its trusted network
// context. Never obtain it from a client-selected X-Forwarded-For header here.
export function createFeedbackHandler({ enabled = false, origin, actorSecret, store, verifyChallenge, timeoutMs = 5000 }) {
  return async function handle(request, { remoteAddress } = {}) {
    if (enabled !== true) return reply(503, { error: 'feedback_closed' });
    if (request.method !== 'POST') return reply(405, { error: 'feedback_method' });
    if (!origin || new URL(request.url).origin !== origin || request.headers.get('Origin') !== origin) return reply(403, { error: 'feedback_origin' });
    if (request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase() !== 'application/json' || request.headers.has('Content-Encoding')) return reply(415, { error: 'feedback_media_type' });
    if (typeof actorSecret !== 'string' || actorSecret.length < 32 || typeof store !== 'function' || typeof verifyChallenge !== 'function' || typeof remoteAddress !== 'string' || remoteAddress.length < 2 || remoteAddress.length > 128) return reply(503, { error: 'feedback_unavailable' });
    const controller = new AbortController();
    let timer;
    const deadline = new Promise((_, reject) => {
      timer = setTimeout(() => { controller.abort(); reject(new BoundaryError('feedback_uncertain', 503)); }, timeoutMs);
    });
    try {
      return await Promise.race([deadline, (async () => {
        const key = validateIdempotencyKey(request.headers.get('Idempotency-Key'));
        const token = request.headers.get('X-Turnstile-Token');
        if (!token || token.length > 2048) throw new BoundaryError('feedback_challenge', 403);
        const input = validateSubmissionInput(await boundedJson(request, feedbackContractLimits.maxInputBytes, controller.signal));
        if (await verifyChallenge({ token, key, remoteAddress, signal: controller.signal }) !== true) throw new BoundaryError('feedback_challenge', 403);
        controller.signal.throwIfAborted();
        const hmacKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(actorSecret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
        const digest = await canonicalSubmissionDigest(input);
        const signature = await crypto.subtle.sign('HMAC', hmacKey, new TextEncoder().encode(`town-hall:v1:${remoteAddress}`));
        const actor = Array.from(new Uint8Array(signature), byte => byte.toString(16).padStart(2, '0')).join('');
        controller.signal.throwIfAborted();
        const receipt = await store({ p_key: key, p_digest: digest, p_actor_hash: actor, p_input: input }, { signal: controller.signal });
        // A broken/echoing storage response must never be returned to the visitor.
        let safe;
        try { safe = validateAcceptedReceipt(receipt, digest); }
        catch { throw new BoundaryError('feedback_uncertain', 503); }
        return reply(200, safe);
      })()]);
    } catch (error) {
      if (error instanceof BoundaryError) return reply(error.status, { error: error.code });
      if (error instanceof FeedbackContractError) return reply(400, { error: 'feedback_invalid' });
      const status = Object.hasOwn(errors, error?.message) ? errors[error.message] : undefined;
      return reply(status || 503, { error: status ? error.message : 'feedback_uncertain' });
    } finally { clearTimeout(timer); controller.abort(); }
  };
}

// These adapters are inert until supplied server-only credentials by a deployment.
// No credential is embedded, and neither adapter logs provider replies or bodies.
export function createSupabaseFeedbackStore({ url, serverKey, fetcher = fetch }) {
  const base = new URL(url);
  if (base.protocol !== 'https:' || base.username || base.password || base.pathname !== '/' || base.search || base.hash || !serverKey) throw new Error('invalid storage configuration');
  return async (payload, { signal }) => {
    const response = await fetcher(new URL('/rest/v1/rpc/intake_town_hall_feedback_v1', base), {
      method: 'POST', redirect: 'error', signal,
      headers: { 'Content-Type': 'application/json', apikey: serverKey, Authorization: `Bearer ${serverKey}` }, body: JSON.stringify(payload)
    });
    const body = await boundedJson(response, 4096, signal);
    if (!response.ok) throw new Error(Object.hasOwn(errors, body?.message) ? body.message : 'feedback_uncertain');
    return body;
  };
}

export function createTurnstileVerifier({ secret, hostname, fetcher = fetch }) {
  if (!secret || !hostname) throw new Error('invalid challenge configuration');
  return async ({ token, key, remoteAddress, signal }) => {
    const response = await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', redirect: 'error', signal, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip: remoteAddress, idempotency_key: key })
    });
    const body = await boundedJson(response, 4096, signal);
    return response.ok && body.success === true && body.hostname === hostname && body.action === 'town_hall_feedback';
  };
}
