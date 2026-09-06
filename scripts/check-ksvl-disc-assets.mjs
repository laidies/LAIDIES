import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const source = fs.readFileSync(process.argv[2] || path.join(root, 'content/site/ksvl-player.js'), 'utf8');
const failures = [];
for (const selector of ['ksvl-np-cd-mini', 'ksvl-cd-disc']) {
  if (selector === 'ksvl-np-cd-mini' && !source.includes(selector)) continue;
  if (new RegExp('\\.' + selector + '::(?:before|after)').test(source)) failures.push(selector + ': CSS-drawn object parts are forbidden');
  const rule = source.match(new RegExp('\\.' + selector + ' \\{([^}]+)\\}'))?.[1] || '';
  if (/gradient|border-radius|box-shadow/.test(rule)) failures.push(selector + ': procedural disc drawing is forbidden');
  if (!new RegExp("el\\('img', \\{class: '" + selector + "', src: '/assets/ksvl/").test(source)) failures.push(selector + ': must use an actual image asset');
}
if (!fs.existsSync(path.join(root, 'assets/ksvl/player-cd-silver-v1.png'))) failures.push('CD image is missing');
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log('KSVL uses image assets for any retained disc placements; no CSS-drawn discs.');
