#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workflow = fs.readFileSync(path.join(root, '.github/workflows/hot-goss-daily.yml'), 'utf8');
// Structural regression check for this workflow, not semantic admission or a
// general proof about indirect scripts/actions or credentials.
function inspect(text) {
  const errors = [];
  if (!/^  workflow_dispatch:\s*$/m.test(text)) errors.push('manual trigger required');
  if (/^\s*(schedule|push|pull_request|workflow_run|repository_dispatch):/m.test(text)) errors.push('automatic trigger forbidden');
  if (!/^  contents: read\s*$/m.test(text) || /\bwrite-all\b|^\s*\w+: write\s*$/m.test(text)) errors.push('write permission forbidden');
  if (/\bgit\s+(push|commit)\b|\bgh\s+(api|pr|release)\b/.test(text)) errors.push('publication command forbidden');
  if (!/actions\/upload-artifact@/.test(text)) errors.push('review artifact required');
  return errors;
}
assert.deepEqual(inspect(workflow), [], 'current retired workflow must remain manual and non-publishing');
assert.ok(inspect(workflow.replace('  workflow_dispatch:', '  schedule:\n    - cron: "0 12 * * *"\n  workflow_dispatch:')).includes('automatic trigger forbidden'));
assert.ok(inspect(workflow.replace('contents: read', 'contents: write')).includes('write permission forbidden'));
assert.ok(inspect(`${workflow}\n      - run: git push\n`).includes('publication command forbidden'));
assert.ok(inspect(workflow.replace('actions/upload-artifact@', 'other/action@')).includes('review artifact required'));
console.log('Legacy news workflow: automatic trigger, write access, push and missing artifact rejected. No provider call executed.');
