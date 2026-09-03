#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourcePath = process.argv[2] || 'chick-flicks.html';
const source = fs.readFileSync(path.resolve(root, sourcePath), 'utf8');
const errors = [];
const forbidden = [
  /visual held/i,
  /cover unavailable/i,
  /preview before opening/i,
  /take the tape home/i,
  /checking (?:the )?tape manifest/i,
  /rental card/i,
  /favourite tape/i,
  /as the season grows, new tapes open on the next full shelf/i,
  /now at the counter/i,
];

for (const phrase of forbidden) {
  if (phrase.test(source)) errors.push(`visitor-facing source contains ${phrase}`);
}

for (const number of ['01', '02', '03', '04']) {
  const read = new RegExp(`href=["']/issues/issue-${number}\\.html["']`, 'g');
  const listen = new RegExp(`href=["']/watch\\.html\\?ep=${number}(?:&amp;|&)mode=listen["']`, 'g');
  const watch = new RegExp(`href=["']/watch\\.html\\?ep=${number}(?:&amp;|&)mode=watch["']`, 'g');
  if (!(source.match(read) || []).length) errors.push(`Episode ${number} has no direct Read route`);
  if ((source.match(listen) || []).length !== 1 && number !== '01') errors.push(`Episode ${number} does not have exactly one direct Listen route`);
  if (!(source.match(listen) || []).length) errors.push(`Episode ${number} has no direct Listen route`);
  if ((source.match(watch) || []).length !== 1 && number !== '01') errors.push(`Episode ${number} does not have exactly one direct Watch route`);
  if (!(source.match(watch) || []).length) errors.push(`Episode ${number} has no direct Watch route`);
}

const trailerRoutes = source.match(/href=["']\/watch\.html\?ep=trailer["']/g) || [];
if (trailerRoutes.length !== 1) errors.push('The page must expose exactly one direct trailer route');
if (!/The illustrated, captioned introduction explains the town and how each episode works\./.test(source)) {
  errors.push('The trailer does not explain its orientation job');
}
const trailerImage = 'assets/sunnyvaile-interiors/episode-vhs-boxes-v2/trailer.png';
if (!source.includes(`src="/${trailerImage}"`)) errors.push('The page does not use the real trailer cover');
if (!fs.existsSync(path.join(root, trailerImage))) errors.push(`Missing trailer image: ${trailerImage}`);

if (/href=["'][^"']*issue-05/.test(source) || /href=["'][^"']*ep=05/.test(source)) {
  errors.push('Episode 05 exposes an active Read or Listen route');
}
if ((source.match(/<article class=["'][^"']*cf-rental[^"']*["'][^>]*data-episode=/g) || []).length !== 4) {
  errors.push('The page must expose exactly four released episode rental records');
}

const expectedCoverPaths = ['01', '02', '03', '04']
  .map(number => `assets/sunnyvaile-interiors/episode-vhs-boxes-v2/ep-${number}.png`);
const imagePaths = [...source.matchAll(/<img[^>]+src=["'](\/assets\/sunnyvaile-interiors\/episode-vhs-boxes-v2\/ep-(?:0[1-4])\.png)["']/g)]
  .map(match => match[1].slice(1));
if (imagePaths.length !== 4) errors.push('Each released episode must use one approved physical VHS case');
for (const imagePath of expectedCoverPaths) {
  if (!imagePaths.includes(imagePath)) errors.push(`Episode VHS case is not wired: ${imagePath}`);
  if (!fs.existsSync(path.join(root, imagePath))) errors.push(`Missing episode VHS case: ${imagePath}`);
}

const storeImage = 'assets/sunnyvaile-interiors/chick-flicks-store-v2/chick-flicks-rental-store-interior-approved-v1.png';
if (!source.includes(`src="/${storeImage}"`)) errors.push('The approved movie-rental store interior is not wired');
if (!fs.existsSync(path.join(root, storeImage))) errors.push(`Missing store interior: ${storeImage}`);
if (source.includes('sunnyvaile-masthead-chick-flicks.png')) errors.push('The long-discarded masthead image returned');
if (source.includes('chick-flicks-store-shelves-v1.png')) errors.push('The rejected office-like store room returned');
if ((source.match(/<a class=["'][^"']*cf-tape[^"']*["']/g) || []).length !== 5) {
  errors.push('The store shelves must expose the trailer plus four operable episode VHS tapes');
}
if (!/class=["'][^"']*cf-tape--trailer[^"']*["'][^>]*href=["']#trailer["']/.test(source)) {
  errors.push('The trailer must be an operable VHS tape on the shelf');
}
if (/class=["']cf-trailer["']/.test(source)) errors.push('The orphaned standalone trailer panel returned');
const comingSoonCases = source.match(/<div class=["']cf-tape cf-tape--coming["'][^>]*aria-label=["']Episode 0[5-7] coming soon["'][^>]*>[\s\S]*?<\/div>/g) || [];
if (comingSoonCases.length !== 3) errors.push('Future bays 5, 6 and 7 must each contain one inactive Coming soon VHS case');
for (const block of comingSoonCases) {
  if (/href=|data-episode=|data-program=/.test(block)) errors.push('A Coming soon VHS case exposes an active interaction');
  if (!/coming-soon-vhs-v1\.png/.test(block)) errors.push('A future bay does not use the Coming soon VHS case');
}
if (/class=["'][^"']*cf-coming(?:\s|["'])/.test(source)) errors.push('The removed standalone coming-soon panel returned');

if (errors.length) {
  console.error('CHICK FLICKS DIRECT ENTRY FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('CHICK FLICKS DIRECT ENTRY PASS');
console.log('published_episode_cards=4');
console.log('direct_read_routes=4');
console.log('direct_listen_routes=4');
console.log('direct_watch_routes=4');
console.log('direct_trailer_routes=1');
console.log('trailer_shelf_tapes=1');
console.log('future_shelf_tapes=3');
console.log('episodes_05_06_07=COMING_SOON_NO_ACTION');
console.log('visitor_facing_internal_language=0');
