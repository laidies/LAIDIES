#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const checker = path.join(root, 'scripts/check-newsstand-release-scope.mjs');
const registeredScopePath = path.join(root, 'operations/release-control/newsstand-production-scope.json');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-newsstand-release-scope-'));
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const record = (filePath, value) => ({ path: filePath, bytes: Buffer.byteLength(value), sha256: digest(value) });
const storiesRaw = fs.readFileSync(path.join(root, 'content/newsstand-stories.js'), 'utf8');
const parseStories = raw => {
  const context = { window: {} };
  vm.runInNewContext(raw, context, { timeout: 1000 });
  return context.window.NEWSSTAND_DATA;
};
const serializeStories = data => `window.NEWSSTAND_DATA = ${JSON.stringify(data, null, 2)};\n`;
const addDailyStory = publishedAt => {
  const data = parseStories(storiesRaw);
  const exemplar = data.stories.find(story => story.edition === 'daily' && story.status === 'published');
  assert.ok(exemplar, 'fixture needs one real published Daily story');
  const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Vancouver', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(publishedAt));
  data.stories.push({ ...exemplar, id: `scope-release-day-${day}`, slug: `scope-release-day-${day}`, publishedAt });
  return serializeStories(data);
};
let artifactNumber = 0;
const manifest = (files, artifactStoriesRaw = storiesRaw) => {
  const artifactDirectory = path.join(temp, `artifact-${artifactNumber++}`);
  const stories = files.find(file => file.path === 'content/newsstand-stories.js');
  if (stories) {
    assert.equal(stories.sha256, digest(artifactStoriesRaw), 'scope fixtures must bind exact artifact dataset bytes');
    fs.mkdirSync(path.join(artifactDirectory, 'content'), { recursive: true });
    fs.writeFileSync(path.join(artifactDirectory, 'content/newsstand-stories.js'), artifactStoriesRaw);
  }
  return {
    schema: 'laidies-release-artifact-manifest/v1',
    artifactDirectory,
    identitySha256: digest(JSON.stringify(files)),
    files,
  };
};
const write = (name, value) => {
  const target = path.join(temp, name);
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
  return target;
};
const run = (base, candidate, scope) => spawnSync(process.execPath, [checker, base, candidate, scope], { encoding: 'utf8' });

const scope = write('scope.json', {
  schema: 'laidies.newsstand-production-scope.v1',
  project: 'laidies-sunnyvaile',
  allowedArtifactPaths: ['newsstand.html', 'content/newsstand-stories.js'],
  verificationPaths: ['index.html', 'newsstand.html', 'content/newsstand-stories.js'],
});
const base = write('base.json', manifest([
  record('index.html', 'home-v1'),
  record('newsstand.html', 'paper-v1'),
  record('content/newsstand-stories.js', storiesRaw),
]));
const valid = write('valid.json', manifest([
  record('index.html', 'home-v1'),
  record('newsstand.html', 'paper-v2'),
  record('content/newsstand-stories.js', storiesRaw),
]));

let result = run(base, valid, scope);
assert.equal(result.status, 0, result.stderr);
assert.match(result.stdout, /NEWSSTAND RELEASE SCOPE: PASS/);

// The command has no clock override. These fixture bytes use the actual release day.
const releaseNow = new Date().toISOString();
const sameDayStoriesRaw = addDailyStory(releaseNow);
const sameDayCandidate = write('same-day-daily.json', manifest([
  record('index.html', 'home-v1'),
  record('newsstand.html', 'paper-v2'),
  record('content/newsstand-stories.js', sameDayStoriesRaw),
], sameDayStoriesRaw));
result = run(base, sameDayCandidate, scope);
assert.equal(result.status, 0, result.stderr);

const oldDailyStoriesRaw = addDailyStory(new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString());
const oldDailyCandidate = write('old-daily.json', manifest([
  record('index.html', 'home-v1'),
  record('newsstand.html', 'paper-v2'),
  record('content/newsstand-stories.js', oldDailyStoriesRaw),
], oldDailyStoriesRaw));
result = run(base, oldDailyCandidate, scope);
assert.notEqual(result.status, 0);
assert.match(result.stderr, /new Daily story .*release day in Vancouver/);

const futureDailyStoriesRaw = addDailyStory(new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString());
const futureDailyCandidate = write('future-daily.json', manifest([
  record('index.html', 'home-v1'),
  record('newsstand.html', 'paper-v2'),
  record('content/newsstand-stories.js', futureDailyStoriesRaw),
], futureDailyStoriesRaw));
result = run(base, futureDailyCandidate, scope);
assert.notEqual(result.status, 0);
assert.match(result.stderr, /new Daily story .*in the future/);

const unrelated = write('unrelated.json', manifest([
  record('index.html', 'home-v2'),
  record('newsstand.html', 'paper-v2'),
  record('content/newsstand-stories.js', storiesRaw),
]));
result = run(base, unrelated, scope);
assert.notEqual(result.status, 0);
assert.match(result.stderr, /outside NewsStand scope: index\.html/);

const added = write('added.json', manifest([
  record('index.html', 'home-v1'),
  record('newsstand.html', 'paper-v2'),
  record('content/newsstand-stories.js', storiesRaw),
  record('new-public-file.html', 'unexpected'),
]));
const permissiveScope = write('permissive-scope.json', {
  schema: 'laidies.newsstand-production-scope.v1',
  project: 'laidies-sunnyvaile',
  allowedArtifactPaths: ['newsstand.html', 'content/newsstand-stories.js', 'new-public-file.html'],
  verificationPaths: ['index.html'],
});
result = run(base, added, permissiveScope);
assert.notEqual(result.status, 0);
assert.match(result.stderr, /may not remove or add undeclared/);

const explicitAssetScope = write('explicit-asset-scope.json', {
  schema: 'laidies.newsstand-production-scope.v1',
  project: 'laidies-sunnyvaile',
  allowedArtifactPaths: ['newsstand.html', 'content/newsstand-stories.js', 'new-public-file.html'],
  allowedAddedArtifactPaths: ['new-public-file.html'],
  verificationPaths: ['index.html'],
});
result = run(base, added, explicitAssetScope);
assert.equal(result.status, 0, result.stderr);
assert.match(result.stdout, /new-public-file\.html/);

result = run(base, base, scope);
assert.notEqual(result.status, 0);
assert.match(result.stderr, /no public changes/);

const registeredScope = JSON.parse(fs.readFileSync(registeredScopePath, 'utf8'));
assert.ok(registeredScope.allowedArtifactPaths.includes('build-report.json'));
assert.ok(registeredScope.allowedArtifactPaths.includes('content/newsstand-daily-issues.json'));
assert.ok(registeredScope.allowedArtifactPaths.includes('content/daily-edition-columns.json'));
assert.ok(registeredScope.verificationPaths.includes('build-report.json'));
assert.ok(registeredScope.verificationPaths.includes('content/newsstand-daily-issues.json'));
assert.ok(registeredScope.verificationPaths.includes('content/daily-edition-columns.json'));

const registeredBaseFiles = registeredScope.verificationPaths.map((filePath) => record(filePath, filePath === 'content/newsstand-stories.js' ? storiesRaw : `${filePath}:v1`));
const registeredCandidateFiles = registeredBaseFiles.map((file) => {
  if (file.path === 'build-report.json' || file.path === 'content/newsstand-daily-issues.json' || file.path === 'content/daily-edition-columns.json') {
    return record(file.path, `${file.path}:v2`);
  }
  return file;
});
const registeredBase = write('registered-base.json', manifest(registeredBaseFiles));
const metadataOnlyCandidate = write('registered-metadata-only.json', manifest(registeredBaseFiles.map((file) =>
  file.path === 'build-report.json' ? record(file.path, `${file.path}:v2`) : file
)));
result = run(registeredBase, metadataOnlyCandidate, registeredScopePath);
assert.notEqual(result.status, 0);
assert.match(result.stderr, /only generated build metadata/);
const registeredCandidate = write('registered-candidate.json', manifest(registeredCandidateFiles));
result = run(registeredBase, registeredCandidate, registeredScopePath);
assert.equal(result.status, 0, result.stderr);
assert.match(result.stdout, /build-report\.json/);
assert.match(result.stdout, /content\/daily-edition-columns\.json/);
assert.match(result.stdout, /content\/newsstand-daily-issues\.json/);

console.log('NEWSSTAND RELEASE SCOPE CALIBRATION: PASS · a first-added Daily story must carry today’s non-future Vancouver publication date · older existing stories remain valid during UI/data-only changes · deterministic build metadata may accompany exact NewsStand changes but cannot create a release · explicitly declared asset addition admitted · unrelated mutation, undeclared public addition and no-op candidate rejected');
