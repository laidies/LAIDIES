import { distributeContextNavigation } from './context-navigation-distribution-v1.mjs';

const LIBRARY_RENDERED_FRAGMENT = /^content\/library-books\/rendered\/[^/]+\.html$/;

export function transformPublicHtml(relative, source) {
  if (!relative.toLowerCase().endsWith('.html')) return source;

  if (LIBRARY_RENDERED_FRAGMENT.test(relative) && !/<\/?(?:html|body)\b/i.test(source)) {
    if (/<script\b[^>]*\bsv-back-nav\.js/i.test(source)) {
      throw new Error(`Library reader fragment cannot mount page navigation: ${relative}`);
    }
    return source;
  }

  return distributeContextNavigation(relative, source);
}
