// Adapter for the existing Pages worker. No account or profile is created here.
const SUPABASE_URL = 'https://swqnkxzebxdbgyrzpdne.supabase.co';
const SUPABASE_PUBLIC_KEY = 'sb_publishable_7O-8aXJ7iNj41f2jatytZA_2llRkNtW';

function reply(status, error, extra = {}) {
  return Response.json(error ? { error, ...extra } : extra, {
    status,
    headers: {
      'Cache-Control': 'no-store, private',
      'Pragma': 'no-cache',
      'Vary': 'Authorization',
      'X-Content-Type-Options': 'nosniff',
      ...(status === 405 ? { Allow: 'POST' } : {})
    }
  });
}

async function readJson(response) {
  // Bound provider output without retaining or logging identity data.
  const reader = response.body?.getReader();
  if (!reader) throw new Error('upstream_empty');
  const decoder = new TextDecoder();
  let text = '', bytes = 0;
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 65536) throw new Error('upstream_oversize');
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally {
    await reader.cancel().catch(() => {});
  }
}

export async function communitySso(request, env, fetcher = fetch) {
  if (request.method !== 'POST') return reply(405, 'method_not_allowed');
  const origin = request.headers.get('origin');
  if ((origin && origin !== new URL(request.url).origin) ||
      request.headers.get('sec-fetch-site') === 'cross-site') {
    return reply(403, 'same_origin_required');
  }
  const authorization = request.headers.get('authorization') || '';
  if (!/^Bearer [A-Za-z0-9._~-]{20,8192}$/.test(authorization)) {
    return reply(401, 'resident_signin_required');
  }
  if (env.HYVOR_SSO_ENABLED !== 'true' ||
      typeof env.HYVOR_SSO_PRIVATE_KEY !== 'string' ||
      env.HYVOR_SSO_PRIVATE_KEY.length < 16) {
    return reply(503, 'community_signin_unavailable');
  }

  // Only the verified identity service supplies id/email/name. Ignore the body.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  const headers = { authorization, apikey: SUPABASE_PUBLIC_KEY, accept: 'application/json' };
  try {
    const auth = await fetcher(SUPABASE_URL + '/auth/v1/user', {
      method: 'GET', headers, cache: 'no-store', redirect: 'error', signal: controller.signal
    });
    if (auth.status === 401 || auth.status === 403) return reply(401, 'resident_signin_required');
    if (!auth.ok) return reply(503, 'resident_service_unavailable');
    const user = await readJson(auth);
    if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(user.id || '') || !user.email_confirmed_at ||
        typeof user.email !== 'string' || user.email.length > 256 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email) || user.is_anonymous === true) {
      return reply(401, 'resident_signin_required');
    }
    const profileResponse = await fetcher(SUPABASE_URL + '/rest/v1/rpc/get_my_resident_state_v1', {
      method: 'POST', headers: { ...headers, 'content-type': 'application/json' },
      body: '{}', cache: 'no-store', redirect: 'error', signal: controller.signal
    });
    if (profileResponse.status === 401 || profileResponse.status === 403) return reply(401, 'resident_signin_required');
    if (!profileResponse.ok) return reply(503, 'resident_service_unavailable');
    const remote = await readJson(profileResponse);
    if (!['account-without-card', 'account-backed-resident'].includes(remote.state)) {
      return reply(401, 'resident_signin_required');
    }
    const name = remote.profile?.display_name;
    if (typeof name !== 'string' || !name.trim()) return reply(409, 'community_display_name_required');
    if (name !== name.trim() || Array.from(name).length > 30 || /[<>\x00-\x1f\x7f]/.test(name)) {
      return reply(503, 'resident_profile_unavailable');
    }
    const payload = { timestamp: Math.floor(Date.now() / 1000), id: user.id, name, email: user.email };
    const bytes = new TextEncoder().encode(JSON.stringify(payload));
    const encoded = btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join(''));
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(env.HYVOR_SSO_PRIVATE_KEY),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(encoded));
    const hash = Array.from(new Uint8Array(signature), byte => byte.toString(16).padStart(2, '0')).join('');
    return reply(200, null, { user: encoded, hash });
  } catch {
    return reply(503, 'resident_service_unavailable');
  } finally {
    clearTimeout(timer);
  }
}
