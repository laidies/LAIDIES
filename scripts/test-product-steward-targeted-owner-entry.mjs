#!/usr/bin/env node
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const targeted = spawnSync(process.execPath, ['scripts/check-product-stewards.mjs', '--owner-entry', 'library'], { encoding: 'utf8' });
assert.equal(targeted.status, 0, `${targeted.stdout}${targeted.stderr}`);
assert.match(targeted.stdout, /owner_entry_product=library:PASS/);
assert.match(targeted.stdout, /owner_entry_unrelated_attention=deferred/);

const unknown = spawnSync(process.execPath, ['scripts/check-product-stewards.mjs', '--owner-entry', 'not-a-product'], { encoding: 'utf8' });
assert.notEqual(unknown.status, 0);
assert.match(`${unknown.stdout}${unknown.stderr}`, /unknown owner-entry product id/);

console.log('TARGETED OWNER ENTRY CALIBRATION PASS unrelated_global=deferred unknown_owner=blocked');
