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

if (!/Episode 05 will appear here when it is ready to read and listen to\./.test(source)) {
  errors.push('Episode 05 does not have a clear inactive coming-soon state');
}
if (/href=["'][^"']*issue-05/.test(source) || /href=["'][^"']*ep=05/.test(source)) {
  errors.push('Episode 05 exposes an active Read or Listen route');
}
if ((source.match(/<article class=["']cf-episode\s/g) || []).length !== 4) {
  errors.push('The page must expose exactly four published episode cards');
}

const imagePaths = [...source.matchAll(/<img[^>]+src=["'](\/assets\/episodes\/[^"']+)["']/g)]
  .map(match => match[1].slice(1));
if (imagePaths.length !== 4) errors.push('Each published episode must have one real episode image');
for (const imagePath of imagePaths) {
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
console.log('episode_05=COMING_SOON_NO_ACTION');
console.log('visitor_facing_internal_language=0');
