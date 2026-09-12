// Integrity only: reject unrelated changes to the current public service scripts.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const root = process.argv[2] || process.cwd();
const baseline = JSON.parse(fs.readFileSync(path.join(here, 'baseline.json')));
const errors = [];
for (const [name, hash] of Object.entries(baseline)) {
  let candidate = fs.readFileSync(path.join(root, 'content/site', name), 'utf8');
  const split = candidate.indexOf('\n})();\n\n') + '\n})();\n\n'.length;
  const loader = candidate.slice(0, split);
  if (!loader.includes("data-sv-header-controls") || !loader.includes('visibility:hidden!important')) {
    errors.push(`${name}: missing shared placement loader or initial-render guard`);
  }
  candidate = candidate.slice(split);
  if (name === 'sv-back-nav.js') {
    candidate = candidate.replace("TITLES[refURL.pathname] || TITLES[refURL.pathname.replace(/\\/$/, '') + '.html']", 'TITLES[refURL.pathname]');
    candidate = candidate.replace('history.length > 1 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0', 'history.length > 1');
  }
  if (name === 'sv-global-header.js') candidate = candidate.replace('if (panel.contains(document.activeElement)) btn.focus(); ', '');
  const actual = crypto.createHash('sha256').update(candidate).digest('hex');
  if (actual !== hash) errors.push(`${name}: service bytes changed outside the declared placement delta`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Integrity: all ${Object.keys(baseline).length} existing public scripts retained outside the declared header delta. Does not judge layout or functionality.`);
