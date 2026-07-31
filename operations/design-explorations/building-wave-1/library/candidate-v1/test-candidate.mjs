import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const css = readFileSync(resolve(root, 'library-candidate.css'), 'utf8');
const js = readFileSync(resolve(root, 'library-candidate.js'), 'utf8');
const must = (value, message) => { if (!value) throw new Error(message); };

for (const text of ['candidate-only room study', 'review fixture demonstrates an admitted-book state', 'same device', 'honest unavailable state', 'No account, sync, admission']) must(html.includes(text), `missing truthful candidate copy: ${text}`);
for (const text of ['role="tablist"', 'role="tabpanel"', '<noscript>', 'aria-live="polite"', 'Skip to the Library actions']) must(html.includes(text), `missing accessible structure: ${text}`);
for (const text of ['held', 'preview', 'cannot open', 'localStorage', 'Escape', 'Puffy could not save']) must(js.includes(text), `missing state/failure handling: ${text}`);
for (const key of ['ArrowLeft', 'ArrowRight', 'Home', 'End', 'tabIndex']) must(js.includes(key), `missing tab keyboard behavior: ${key}`);
for (const breakpoint of ['max-width:700px', 'max-width:360px']) must(css.includes(breakpoint), `missing responsive breakpoint: ${breakpoint}`);
for (const rule of ['minmax(0,1fr)', 'min-width:0', 'max-width:100%']) must(css.includes(rule), `missing mobile containment rule: ${rule}`);
for (const asset of [
  '../../../../../assets/building-interiors/library-interior-from-credits-dechromed-v2.png',
  '../../../../../assets/video/delivery-20260714-opening-v6/shots/opening-10-miss-jeeves-approved-wide.png',
  '../../../../../assets/library-101/bright-family-v2/textbook-vocab-101.png'
]) must(existsSync(resolve(root, asset)), `missing referenced asset: ${asset}`);
console.log('LIBRARY CANDIDATE STATIC PASS: truthful states, accessible structure, responsive rules, referenced assets');
