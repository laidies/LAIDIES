import { boundedJson, createFeedbackHandler } from './feedback-http.mjs';
const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'", 'Permissions-Policy': 'camera=(), microphone=(), geolocation=()' };
const codes = { feedback_invalid: 400, feedback_forbidden: 403, feedback_expired: 410, feedback_conflict: 409, feedback_rate_limited: 429, feedback_closed: 503 };
const json = (status, value) => new Response(JSON.stringify(value), { status, headers: { ...headers, 'Content-Type': 'application/json' } });
async function authorized(request, secret) {
  const token = request.headers.get('Authorization')?.match(/^Bearer ([a-f0-9]{64})$/)?.[1];
  if (!token || !/^[a-f0-9]{64}$/.test(secret || '')) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(secret));
  return crypto.subtle.verify('HMAC', key, signature, new TextEncoder().encode(token));
}
export function createPrivateBridge(env, fetcher = fetch) {
  const base = new URL(env.PRIVATE_FEEDBACK_SUPABASE_URL);
  if (base.protocol !== 'https:' || base.username || base.password || base.pathname !== '/' || base.search || base.hash || !env.PRIVATE_FEEDBACK_ANON_KEY || !/^[a-f0-9]{64}$/.test(env.PRIVATE_FEEDBACK_DB_CAPABILITY || '')) throw new Error('feedback_closed');
  return async (action, payload, signal) => {
    const response = await fetcher(new URL('/rest/v1/rpc/private_feedback_bridge_v1', base), {
      method: 'POST', redirect: 'error', signal,
      headers: { 'Content-Type': 'application/json', apikey: env.PRIVATE_FEEDBACK_ANON_KEY, Authorization: `Bearer ${env.PRIVATE_FEEDBACK_ANON_KEY}` },
      body: JSON.stringify({ p_capability: env.PRIVATE_FEEDBACK_DB_CAPABILITY, p_action: action, p_payload: payload })
    });
    const result = await boundedJson(response, action === 'list' ? 600000 : 4096, signal);
    if (!response.ok) throw new Error(Object.hasOwn(codes, result?.message) ? result.message : 'feedback_unavailable');
    if (action === 'list' && (!Array.isArray(result) || result.length > 50)) throw new Error('feedback_unavailable');
    return result;
  };
}
export async function privateFeedbackFetch(request, env, fetcher = fetch) {
  const url = new URL(request.url);
  const assets = new Set(['/private-feedback/', '/private-feedback/index.html', '/private-feedback/app.mjs', '/private-feedback/feedback-client.mjs', '/private-feedback/feedback-contract.mjs']);
  if (assets.has(url.pathname)) {
    if (!['GET', 'HEAD'].includes(request.method)) return json(405, { error: 'feedback_method' });
    if (!env.PRIVATE_FEEDBACK_ASSETS) return json(503, { error: 'feedback_closed' });
    const asset = await env.PRIVATE_FEEDBACK_ASSETS.fetch(request);
    const response = new Response(asset.body, asset);
    for (const [name, value] of Object.entries(headers)) response.headers.set(name, value);
    return response;
  }
  const action = url.pathname.match(/^\/private-feedback\/api\/(intake|list|review)$/)?.[1];
  if (!action) return json(404, { error: 'not_found' });
  if (!await authorized(request, env.PRIVATE_FEEDBACK_OWNER_TOKEN)) return json(403, { error: 'feedback_forbidden' });
  if (env.PRIVATE_FEEDBACK_ENABLED !== 'true') return json(503, { error: 'feedback_closed' });
  if (request.method !== 'POST') return json(405, { error: 'feedback_method' });
  if (request.headers.get('Origin') !== url.origin) return json(403, { error: 'feedback_origin' });
  if (request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase() !== 'application/json' || request.headers.has('Content-Encoding')) return json(415, { error: 'feedback_media_type' });
  try {
    const bridge = createPrivateBridge(env, fetcher);
    if (action === 'intake') {
      const handler = createFeedbackHandler({ enabled: true, origin: url.origin, actorSecret: env.PRIVATE_FEEDBACK_ACTOR_SECRET,
        verifyChallenge: async ({ token }) => token === 'private-owner',
        store: (p, { signal }) => bridge('intake', { key: p.p_key, digest: p.p_digest, actor_hash: p.p_actor_hash, input: p.p_input }, signal) });
      // This single-owner private lane keys retries/rate limits to its authenticated
      // principal, not a browser-selected header or a changing network address.
      return handler(request, { remoteAddress: 'authenticated-private-owner' });
    }
    const signal = AbortSignal.timeout(5000);
    const payload = await boundedJson(request, 1024, signal);
    return json(200, await bridge(action, payload, signal));
  } catch (error) { return json(codes[error?.message] || 503, { error: Object.hasOwn(codes, error?.message) ? error.message : 'feedback_unavailable' }); }
}
