export const CONTEXT_NAV_DISTRIBUTION_ID = "SVBN-CURATED-DISTRIBUTION-2026-07-26-v1";
export const CONTEXT_NAV_SOURCE_PATH = "content/site/sv-back-nav.js";
export const CONTEXT_NAV_SOURCE_SHA256 = "4490123a7d7ea447a125244ef1453c92c3cfdea32dca7fc86b6b096e57f9dfd3";
export const CONTEXT_NAV_VERSION_KEY = "svbn-2026-07-26-v1-4490123a7d7e";
export const CONTEXT_NAV_PUBLIC_SRC =
  `/${CONTEXT_NAV_SOURCE_PATH}?v=${CONTEXT_NAV_VERSION_KEY}`;

const CONTEXT_NAV_TAG_PATTERN =
  /<script\b(?=[^>]*\bsrc\s*=\s*(["'])\/?content\/site\/sv-back-nav\.js(?:\?[^"']*)?\1)[^>]*>\s*<\/script>/gi;

export function contextNavigationTags(source) {
  return [...source.matchAll(CONTEXT_NAV_TAG_PATTERN)].map((match) => match[0]);
}

export function contextNavigationScriptTag() {
  return `<script defer src="${CONTEXT_NAV_PUBLIC_SRC}"></script>`;
}

export function distributeContextNavigation(relative, source) {
  if (!relative.toLowerCase().endsWith(".html")) return source;

  const mounts = contextNavigationTags(source);
  if (mounts.length > 1) {
    throw new Error(
      `Context navigation duplicate source mounts rejected: ${relative} mounts=${mounts.length}`
    );
  }

  const tag = contextNavigationScriptTag();
  if (mounts.length === 1) {
    return source.replace(CONTEXT_NAV_TAG_PATTERN, tag);
  }
  if (!/<\/body\s*>/i.test(source)) {
    throw new Error(`Context navigation distribution requires </body>: ${relative}`);
  }
  return source.replace(/<\/body\s*>/i, `  ${tag}\n</body>`);
}
