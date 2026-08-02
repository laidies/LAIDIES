import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const manifestPath = 'operations/video-qa/opening-day-playback-binding-v1/manifest.json';
const manifest = JSON.parse(fs.readFileSync(path.join(root, manifestPath), 'utf8'));
const admission = JSON.parse(fs.readFileSync(path.join(root, 'content/episodes/screening-room-admission.json'), 'utf8'));
const episodeIndex = JSON.parse(fs.readFileSync(path.join(root, 'content/episode-index.json'), 'utf8'));
const watch = fs.readFileSync(path.join(root, 'watch.html'), 'utf8');

const errors = [];
const sha256 = (relativePath) => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, relativePath))).digest('hex');
const checkFile = (label, file) => {
  const absolute = path.join(root, file.path);
  if (!fs.existsSync(absolute)) {
    errors.push(`${label}: missing ${file.path}`);
    return;
  }
  const actual = sha256(file.path);
  if (actual !== file.sha256) errors.push(`${label}: SHA mismatch ${file.path}; expected ${file.sha256}, got ${actual}`);
};

if (manifest.status !== 'BUILT LOCALLY / HOLD') errors.push(`manifest status must remain BUILT LOCALLY / HOLD`);
for (const [key, allowed] of Object.entries(manifest.authority)) {
  if (allowed !== false) errors.push(`authority.${key} must be false`);
}
if (!/var\s+EPISODE_FILMS\s*=\s*\{\s*\}\s*;/.test(watch)) errors.push('watch.html EPISODE_FILMS registry is not empty');

const expectedTitles = Object.fromEntries(episodeIndex.episodes.map((episode) => [String(episode.number).padStart(2, '0'), episode.title]));
for (const [key, programme] of Object.entries(manifest.programmes)) {
  checkFile(`${key} film`, programme.film);
  checkFile(`${key} captions`, programme.captions);
  checkFile(`${key} review evidence`, programme.reviewEvidence);
  checkFile(`${key} identity source`, programme.cover.identitySource);
  checkFile(`${key} current fallback`, programme.cover.currentFallback);
  if (programme.film.status !== 'BUILT LOCALLY / HOLD') errors.push(`${key}: film status is not BUILT LOCALLY / HOLD`);
  if (programme.cover.status !== 'BUILD REQUIRED') errors.push(`${key}: cover status must remain BUILD REQUIRED`);
  if (programme.readyForBinding !== false) errors.push(`${key}: readyForBinding must be false`);
  if (admission.programmes[key]?.admissionStatus !== 'hold') errors.push(`${key}: public admission status is not hold`);
  if (key !== 'trailer' && expectedTitles[key] !== programme.canonicalTitle) {
    errors.push(`${key}: canonical title mismatch; index=${expectedTitles[key]}, manifest=${programme.canonicalTitle}`);
  }
}

if (errors.length) {
  console.error('Opening-day playback binding verifier: FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Opening-day playback binding verifier: PASS');
console.log('- 5/5 exact local film, caption, evidence, identity-source and fallback hashes match');
console.log('- 5/5 public admission states remain HOLD');
console.log('- watch.html EPISODE_FILMS remains empty');
console.log('- 5/5 cover masters remain BUILD REQUIRED');
console.log('- 0/5 programmes are marked ready for binding');
