#!/usr/bin/env node

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const checker = path.join(root, 'scripts', 'check-newsstand-canonical-migration.mjs');
const current = spawnSync(process.execPath, [checker], { cwd: root, encoding: 'utf8' });
assert.equal(current.status, 0, current.stderr || current.stdout);

const calibration = spawnSync(process.execPath, [checker, '--calibrate'], { cwd: root, encoding: 'utf8' });
assert.notEqual(calibration.status, 0, 'retired NewsStand naming must fail');
assert.match(calibration.stderr, /retired public name/);

console.log('NEWSSTAND CANONICAL MIGRATION TEST PASS');
console.log('retired_name=FAIL_AS_CALIBRATED');
