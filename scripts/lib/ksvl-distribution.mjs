// One canonical player for full visitor documents; no player inside book fragments.
export const KSVL_VERSION = '20260830-continuity-1';
const PLAYER_TAG = /<script\b[^>]*\bsrc\s*=\s*(["'])(?:\.{0,2}\/)*content\/site\/(?:ksvl-player|mini-player)\.js(?:\?[^"']*)?\1[^>]*>\s*<\/script>/gi;

export function distributeKsvl(relative, source) {
  if (!relative.endsWith('.html') || /^(?:content\/library-books\/rendered\/|grimoire\/)/.test(relative) || !/<body\b/i.test(source) ||
      /<meta\b[^>]*http-equiv\s*=\s*["']refresh["']/i.test(source)) return source;
  const matches = [...source.matchAll(PLAYER_TAG)];
  const tag = `<script defer src="/content/site/ksvl-player.js?v=${KSVL_VERSION}"></script>`;
  if (matches.length === 1 && matches[0][0] === tag) return source;
  if (!/<\/body\s*>/i.test(source)) throw new Error(`KSVL page has no closing body: ${relative}`);
  // Preserve the first loader location for existing load-order contracts.
  let inserted = false;
  const result = source.replace(PLAYER_TAG, () => {
    if (inserted) return '';
    inserted = true;
    return tag;
  });
  return inserted ? result : result.replace(/<\/body\s*>/i, `  ${tag}\n</body>`);
}
