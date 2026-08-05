#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const calibrate = process.argv.includes('--calibrate');
const governed = [
  'content/episode-index.json',
  'content/site/site-data.js',
  'content/EPISODE-SCHEMA.md',
  'content/episodes/issue-01.json',
  'content/episodes/issue-02.json',
  'content/episodes/issue-03.json',
  'content/episodes/issue-04.json',
  'content/episodes/issue-05.json',
  'content/episodes/episode-02.canon.md',
  'content/episodes/episode-03.canon.md',
  'content/episodes/episode-04.canon.md',
  'content/issues/issue-02.md',
  'content/issues/issue-03.md',
  'scripts/run-weekly-production.js',
];
const errors = [];

for (const [index, relative] of governed.entries()) {
  const absolute = path.join(root, relative);
  if (!fs.existsSync(absolute)) { errors.push(`missing governed source ${relative}`); continue; }
  const source = fs.readFileSync(absolute, 'utf8') + (calibrate && index === 0 ? '\nHot Goss\n' : '');
  for (const [label, pattern] of [
    ['retired public name', /Hot Goss/i],
    ['retired route', /hot-goss\.html/i],
    ['retired placement field', /hotGossPlacement/],
    ['retired link type', /["']hotGoss["']/],
  ]) {
    if (pattern.test(source)) errors.push(`${relative}: ${label}`);
  }
}

const canonical = JSON.parse(fs.readFileSync(path.join(root, 'content/episode-index.json'), 'utf8'));
const siteDataSource = fs.readFileSync(path.join(root, 'content/site/site-data.js'), 'utf8');
const siteData = JSON.parse(siteDataSource.slice(siteDataSource.indexOf('{'), siteDataSource.lastIndexOf('}') + 1));
for (const episodeNumber of [2, 3]) {
  const expected = canonical.episodes.find((episode) => episode.number === episodeNumber);
  const fallback = siteData.episodes.find((episode) => episode.number === episodeNumber);
  const expectedLink = expected?.siteLinks?.find((link) => link.type === 'newsstand');
  const fallbackLink = fallback?.siteLinks?.find((link) => link.type === 'newsstand');
  if (!expectedLink || expectedLink.url !== 'newsstand.html' || expectedLink.label !== 'Read The Weekly at the NewsStand') {
    errors.push(`episode ${episodeNumber}: canonical NewsStand link is incomplete`);
  }
  if (JSON.stringify(expectedLink) !== JSON.stringify(fallbackLink)) {
    errors.push(`episode ${episodeNumber}: canonical and site-data NewsStand links diverge`);
  }
  if (expected?.websiteModules?.newsstandPlacement !== 'newsstand-weekly') {
    errors.push(`episode ${episodeNumber}: canonical NewsStand placement is incomplete`);
  }
  if (fallback?.websiteModules?.newsstandPlacement !== 'newsstand-weekly') {
    errors.push(`episode ${episodeNumber}: site-data NewsStand placement is incomplete`);
  }
}

if (errors.length) {
  console.error('NEWSSTAND CANONICAL MIGRATION FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('NEWSSTAND CANONICAL MIGRATION PASS');
console.log(`governed_sources=${governed.length}`);
