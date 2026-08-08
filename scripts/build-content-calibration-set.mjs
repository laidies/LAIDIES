#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixtureRoot = process.env.LAIDIES_CONTENT_ROOT ? path.resolve(process.env.LAIDIES_CONTENT_ROOT) : root;
const registryPath = process.env.LAIDIES_CONTENT_EXEMPLAR_REGISTRY || path.join(root, 'operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json');
const now = new Date(process.env.LAIDIES_CALIBRATION_NOW || new Date().toISOString());
const maxPerClass = 20;
const sixMonthsAgo = new Date(now); sixMonthsAgo.setUTCMonth(sixMonthsAgo.getUTCMonth() - 6);
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

export function buildCalibrationSet(registryFile = registryPath) {
  const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
  const negatives = registry.negativeExemplars || [];
  const checked = negatives.map(item => {
    const absolute = path.resolve(fixtureRoot, item.path);
    if (!absolute.startsWith(`${fixtureRoot}${path.sep}`) || !fs.existsSync(absolute)) throw new Error(`${item.id} fixture is missing`);
    if (sha(absolute) !== item.sha256) throw new Error(`${item.id} fixture SHA does not match`);
    const lastUsed = new Date(item.lastCalibrationFailureAt || item.lastFiredAt || item.introducedAt);
    if (Number.isNaN(lastUsed.getTime())) throw new Error(`${item.id} has no valid recency time`);
    return { ...item, lastUsed };
  });
  checked.sort((a, b) => b.lastUsed - a.lastUsed || a.id.localeCompare(b.id));
  const active = checked.filter(item => item.lastUsed >= sixMonthsAgo).slice(0, maxPerClass);
  const overflow = checked.filter(item => !active.includes(item));
  return {
    schema_version: 1,
    authority: 'CALIBRATION_SELECTION_ONLY_REGISTRY_REMAINS_APPEND_ONLY',
    registry_path: path.relative(root, registryFile),
    registry_sha256: sha(registryFile),
    max_active_negative_fixtures: maxPerClass,
    active: active.map(({ lastUsed, ...item }) => item),
    excluded_from_active_calibration: overflow.map(({ lastUsed, ...item }) => ({ id: item.id, path: item.path, reason: lastUsed < sixMonthsAgo ? 'NOT_FIRED_IN_SIX_MONTHS' : 'CAP_20_NEWER_FIXTURES_RETAINED' })),
    rule: 'Exclusion reduces judge context only. It never deletes quarantine bytes or the negative registry record.'
  };
}

try { process.stdout.write(`${JSON.stringify(buildCalibrationSet(), null, 2)}\n`); }
catch (error) { console.error(`CONTENT CALIBRATION SET FAIL: ${error.message}`); process.exit(1); }
