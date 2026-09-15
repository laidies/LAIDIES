const RETURN_KEY = 'laidies_community_signin_return_v1';
const ROOM = /^(?:\/sorority-house(?:\.html)?|\/community\/(?:ask-the-room|wins|dear-laidies|try-on-debrief|send-it-energy|mix-cd-exchange|burn-book)(?:\.html)?)$/;
export function safeCommunityReturn(value, origin) {
  if (typeof value !== 'string' || value.length > 512 || !value.startsWith('/') || value.startsWith('//')) return null;
  let url;
  try { url = new URL(value, origin); } catch { return null; }
  if (url.origin !== origin || url.username || url.password || !ROOM.test(url.pathname)) return null;
  const clean = new URL(url.pathname, origin);
  for (const key of ['wing', 'room', 'from', 'issue', 'group', 'draft']) {
    const item = url.searchParams.get(key);
    if (item && /^[a-zA-Z0-9_-]{1,64}$/.test(item)) clean.searchParams.set(key, item);
  }
  if (/^#[a-zA-Z0-9_-]{1,80}$/.test(url.hash)) clean.hash = url.hash;
  return clean.pathname + clean.search + clean.hash;
}
export function prepareCommunityReturn(location, storage, now = Date.now()) {
  const query = new URLSearchParams(location.search);
  const supplied = safeCommunityReturn(query.get('community_return'), location.origin);
  try {
    if (supplied) storage.setItem(RETURN_KEY, JSON.stringify({ path: supplied, expires: now + 30 * 60 * 1000 }));
    // Only this entry or an actual sign-in callback may consume a saved route.
    if (!supplied && !query.has('code')) return null;
    const saved = JSON.parse(storage.getItem(RETURN_KEY) || 'null');
    if (!saved || saved.expires <= now) return null;
    return safeCommunityReturn(saved.path, location.origin);
  } catch { return supplied; }
}
export function consumeCommunityReturn(storage) {
  try { storage.removeItem(RETURN_KEY); } catch {}
}
