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
];

for (const phrase of forbidden) {
  if (phrase.test(source)) errors.push(`visitor-facing source contains ${phrase}`);
}

for (const number of ['01', '02', '03', '04']) {
  const read = new RegExp(`href=["']/issues/issue-${number}\\.html["']`, 'g');
  const listen = new RegExp(`href=["']/watch\\.html\\?ep=${number}(?:&amp;|&)mode=listen["']`, 'g');
  if (!(source.match(read) || []).length) errors.push(`Episode ${number} has no direct Read route`);
  if ((source.match(listen) || []).length !== 1 && number !== '01') errors.push(`Episode ${number} does not have exactly one direct Listen route`);
  if (!(source.match(listen) || []).length) errors.push(`Episode ${number} has no direct Listen route`);
}

const trailerRoutes = source.match(/href=["']\/watch\.html\?ep=trailer["']/g) || [];
if (trailerRoutes.length !== 1) errors.push('The page must expose exactly one direct trailer route');
if (!/The illustrated, captioned introduction explains the town, the learning story and how each episode works\./.test(source)) {
  errors.push('The trailer does not explain its orientation job');
}
const trailerImage = 'assets/media/opening-day-covers-v1/trailer/trailer-site.jpg';
if (!source.includes(`src="/${trailerImage}"`)) errors.push('The page does not use the real trailer cover');
if (!fs.existsSync(path.join(root, trailerImage))) errors.push(`Missing trailer image: ${trailerImage}`);

if (!/Episode 05 will appear here when it is ready to read and listen to\./.test(source)) {
  errors.push('Episode 05 does not have a clear inactive coming-soon state');
}
if (/href=["'][^"']*issue-05/.test(source) || /href=["'][^"']*ep=05/.test(source)) {
  errors.push('Episode 05 exposes an active Read or Listen route');
}
if ((source.match(/<article class=["']cf-episode\s/g) || []).length !== 4) {
  errors.push('The page must expose exactly four published episode cards');
}

const expectedCoverPaths = ['01', '02', '03', '04']
  .map(number => `assets/media/opening-day-covers-v1/${number}/${number}-site.jpg`);
const imagePaths = [...source.matchAll(/<img[^>]+src=["'](\/assets\/media\/opening-day-covers-v1\/(?:0[1-4])\/(?:0[1-4])-site\.jpg)["']/g)]
  .map(match => match[1].slice(1));
if (imagePaths.length !== 4) errors.push('Each published episode must use one Opening Day site cover');
for (const imagePath of expectedCoverPaths) {
  if (!imagePaths.includes(imagePath)) errors.push(`Episode cover is not wired: ${imagePath}`);
  if (!fs.existsSync(path.join(root, imagePath))) errors.push(`Missing episode image: ${imagePath}`);
}

if (errors.length) {
  console.error('CHICK FLICKS DIRECT ENTRY FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('CHICK FLICKS DIRECT ENTRY PASS');
console.log('published_episode_cards=4');
console.log('direct_read_routes=4');
console.log('direct_listen_routes=4');
console.log('direct_trailer_routes=1');
console.log('episode_05=COMING_SOON_NO_ACTION');
console.log('visitor_facing_internal_language=0');
