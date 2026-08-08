#!/usr/bin/env node

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const checker = path.join(root, 'scripts', 'check-episode-cues.js');
const episodeTwo = spawnSync(process.execPath, [checker, '--episode', '02'], { cwd: root, encoding: 'utf8' });
assert.equal(episodeTwo.status, 0, episodeTwo.stderr || episodeTwo.stdout);
assert.match(episodeTwo.stdout, /episode-02-cues\.json/);
assert.doesNotMatch(episodeTwo.stdout, /episode-03-cues\.json/);

const missingEpisode = spawnSync(process.execPath, [checker, '--episode', '99'], { cwd: root, encoding: 'utf8' });
assert.notEqual(missingEpisode.status, 0, 'a missing selected cue sheet must fail');
assert.match(missingEpisode.stderr, /no cue sheet found for episode 99/);

console.log('EPISODE CUE SCOPE TEST PASS');
console.log('missing_episode=FAIL_AS_CALIBRATED');
