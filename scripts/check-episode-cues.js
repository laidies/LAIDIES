#!/usr/bin/env node
/*
 * Validate episode cue sheets against the files that are actually in the site.
 * Missing media and invalid cue order fail the gate. Long holds, repeated files,
 * and sparse visual coverage are surfaced as production warnings for review.
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Pass a public-artifact directory to validate the exact deployable cue/media
// contract after public transforms have run. With no root argument, audit the
// working studio tree. --episode NN limits the audit to the requested title so
// one episode's gate cannot be blocked by unrelated work in another episode.
const args = process.argv.slice(2);
const episodeIndex = args.indexOf('--episode');
const requestedEpisode = episodeIndex >= 0 ? String(args[episodeIndex + 1] || '').padStart(2, '0') : null;
const rootArg = args.find((arg, index) => arg !== '--episode' && index !== episodeIndex + 1);
const ROOT = path.resolve(rootArg || path.join(__dirname, '..'));
const EPISODE_DIR = path.join(ROOT, 'content', 'episodes');
const cueFiles = fs
  .readdirSync(EPISODE_DIR)
  .filter((name) => /^episode-(?:\d{2}|trailer)-cues\.json$/.test(name))
  .filter((name) => !requestedEpisode || name === `episode-${requestedEpisode}-cues.json`)
  .sort();

if (requestedEpisode && cueFiles.length === 0) {
  console.error(`No cue sheet found for episode ${requestedEpisode}.`);
  process.exit(1);
}

const failures = [];
const warnings = [];
const hashCache = new Map();

function cleanUrl(value) {
  return value.split('#')[0].split('?')[0];
}

function resolveMedia(value) {
  const clean = cleanUrl(value);
  return clean.startsWith('/')
    ? path.join(ROOT, clean.replace(/^\/+/, ''))
    : path.join(EPISODE_DIR, clean);
}

function displayPath(absolutePath) {
  return path.relative(ROOT, absolutePath);
}

function getHash(absolutePath) {
  if (!hashCache.has(absolutePath)) {
    const digest = crypto
      .createHash('sha256')
      .update(fs.readFileSync(absolutePath))
      .digest('hex');
    hashCache.set(absolutePath, digest);
  }
  return hashCache.get(absolutePath);
}

function groupsFor(sheet) {
  const groups = [];
  if (sheet.title?.cues) groups.push(['title', sheet.title.cues]);
  if (sheet.cues) groups.push(['main', sheet.cues]);
  if (sheet.end?.cues) groups.push(['end', sheet.end.cues]);
  return groups;
}

console.log('EPISODE CUE AUDIT');

for (const filename of cueFiles) {
  const sheetPath = path.join(EPISODE_DIR, filename);
  let sheet;
  try {
    sheet = JSON.parse(fs.readFileSync(sheetPath, 'utf8'));
  } catch (error) {
    failures.push(`${filename}: invalid JSON (${error.message})`);
    continue;
  }

  const groups = groupsFor(sheet);
  const sourceRecords = [];
  let cueCount = 0;
  let sourceCount = 0;
  let videoCount = 0;
  let longestHold = 0;

  if (!groups.length) failures.push(`${filename}: contains no cue arrays`);

  if (typeof sheet.audio === 'string') {
    const audioPath = resolveMedia(sheet.audio);
    if (!fs.existsSync(audioPath)) {
      failures.push(`${filename}: missing audio ${displayPath(audioPath)}`);
    }
  } else {
    warnings.push(`${filename}: no audio path declared`);
  }

  for (const [groupName, cues] of groups) {
    cueCount += cues.length;
    let previousTime = -Infinity;

    for (let index = 0; index < cues.length; index += 1) {
      const cue = cues[index];
      if (typeof cue.t !== 'number' || !Number.isFinite(cue.t) || cue.t < 0) {
        failures.push(`${filename} ${groupName}[${index}]: invalid time ${JSON.stringify(cue.t)}`);
      } else if (cue.t < previousTime) {
        failures.push(`${filename} ${groupName}[${index}]: ${cue.t}s is earlier than the prior cue at ${previousTime}s`);
      }
      previousTime = cue.t;

      const next = cues[index + 1];
      if (next && typeof cue.t === 'number' && typeof next.t === 'number') {
        const hold = next.t - cue.t;
        longestHold = Math.max(longestHold, hold);
        if (groupName === 'main' && hold > 75) {
          warnings.push(`${filename}: ${hold.toFixed(1)}s hold after main cue ${index + 1} (${cue.type || 'untyped'}) at ${cue.t}s`);
        }
      }

      if (!cue.src) continue;
      sourceCount += 1;
      const mediaPath = resolveMedia(cue.src);
      if (!fs.existsSync(mediaPath)) {
        failures.push(`${filename} ${groupName}[${index}]: missing ${displayPath(mediaPath)}`);
        continue;
      }
      if (cue.type === 'video' || /\.(?:mp4|mov|m4v|webm)$/i.test(mediaPath)) videoCount += 1;
      sourceRecords.push({ groupName, index, cue, mediaPath, hash: getHash(mediaPath) });
    }
  }

  const byHash = new Map();
  for (const record of sourceRecords) {
    if (!byHash.has(record.hash)) byHash.set(record.hash, []);
    byHash.get(record.hash).push(record);
  }
  for (const records of byHash.values()) {
    const distinctFiles = [...new Set(records.map((record) => record.mediaPath))];
    if (distinctFiles.length > 1) {
      warnings.push(
        `${filename}: byte-identical visual files: ${distinctFiles.map(displayPath).join(' = ')}`,
      );
    }
  }

  const mainCues = groups.find(([name]) => name === 'main')?.[1] || [];
  if (/^episode-\d{2}/.test(filename) && mainCues.length < 18) {
    warnings.push(`${filename}: only ${mainCues.length} main cues; coverage is unusually sparse`);
  }

  console.log(
    `  ${filename}: ${cueCount} cues · ${sourceCount} media cues · ${videoCount} video cues · longest measured hold ${longestHold.toFixed(1)}s`,
  );
}

if (warnings.length) {
  console.log(`\nWARNINGS (${warnings.length})`);
  warnings.forEach((warning) => console.log(`  · ${warning}`));
}

if (failures.length) {
  console.error(`\nFAILURES (${failures.length})`);
  failures.forEach((failure) => console.error(`  · ${failure}`));
  process.exit(1);
}

console.log(`\n✓ EPISODE CUES: ${cueFiles.length} cue sheets have valid order and resolvable media.`);
