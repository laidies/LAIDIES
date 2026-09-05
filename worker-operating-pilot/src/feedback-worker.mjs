import { createFeedbackHandler, createSupabaseFeedbackStore, createTurnstileVerifier } from './feedback-http.mjs';

// Prepared entrypoint only: intentionally absent from production Wrangler config.
// Must run behind Cloudflare's trusted edge; never deploy on an origin that lets
// clients supply CF-Connecting-IP. Do not forward cookies or account identifiers.
export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname !== '/api/town-hall/feedback') return new Response('Not found', { status: 404 });
    if (env.FEEDBACK_ENABLED !== 'true') return createFeedbackHandler({})(request);
    try {
      const origin = new URL(env.FEEDBACK_ORIGIN).origin;
      const handler = createFeedbackHandler({
        enabled: true,
        origin,
        actorSecret: env.FEEDBACK_ACTOR_SECRET,
        store: createSupabaseFeedbackStore({ url: env.FEEDBACK_SUPABASE_URL, serverKey: env.FEEDBACK_SERVER_KEY }),
        verifyChallenge: createTurnstileVerifier({ secret: env.FEEDBACK_TURNSTILE_SECRET, hostname: new URL(origin).hostname })
      });
      return await handler(request, { remoteAddress: request.headers.get('CF-Connecting-IP') });
    } catch {
      return new Response(JSON.stringify({ error: 'feedback_unavailable' }), { status: 503, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
    }
  }
};
