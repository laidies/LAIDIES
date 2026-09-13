import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export const NEWSSTAND_VERSIONED_ASSETS = [
  'content/newsstand.css',
  'content/newsstand-design.css',
  'content/newsstand-stories.js',
  'content/newsstand-selection.js',
  'content/site/newsstand-catchup-v1.js',
  'content/site/luminairy-claim-gate.js',
];

export function checkNewsstandAssetVersions(candidate, changedPaths) {
  const assets = NEWSSTAND_VERSIONED_ASSETS.filter(file => changedPaths.includes(file));
  if (!assets.length) return;
  const record = candidate.files.find(file => file.path === 'newsstand.html');
  const htmlPath = path.join(candidate.artifactDirectory || '', 'newsstand.html');
  if (!record || !candidate.artifactDirectory || !fs.existsSync(htmlPath)) {
    throw new Error('changed NewsStand assets require the exact newsstand.html artifact for cache-version verification');
  }
  const bytes = fs.readFileSync(htmlPath);
  const digest = crypto.createHash('sha256').update(bytes).digest('hex');
  if (digest !== record.sha256 || bytes.length !== record.bytes) throw new Error('NewsStand HTML cache-version artifact differs from its manifest');
  const references = [...bytes.toString('utf8').matchAll(/(?:src|href)="([^"<>]+)"/g)]
    .map(match => new URL(match[1].replaceAll('&amp;', '&'), 'https://laidies.ai/newsstand'));
  for (const file of assets) {
    const expected = candidate.files.find(item => item.path === file)?.sha256;
    const refs = references.filter(url => url.origin === 'https://laidies.ai' && url.pathname === `/${file}`);
    if (!expected || !refs.length || refs.some(url => url.searchParams.get('v') !== expected.slice(0, 16))) {
      throw new Error(`stale NewsStand asset URL: ${file}; v must equal candidate SHA256 prefix ${expected?.slice(0, 16)}`);
    }
  }
}
