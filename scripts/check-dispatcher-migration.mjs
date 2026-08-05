#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = process.cwd();
const fixtureMode = process.argv.includes('--fixture');
const fixtureVars = ['LAIDIES_DISPATCHER_CONTRACT_PATH','LAIDIES_AUTOMATIONS_ROOT'];
const unsafeOverrides = fixtureVars.filter(name => process.env[name]);
if (!fixtureMode && unsafeOverrides.length) {
  console.error(`DISPATCHER MIGRATION FAIL\n- fixture overrides require --fixture: ${unsafeOverrides.join(', ')}`);
  process.exit(1);
}
const contractPath = path.resolve(root, fixtureMode && process.env.LAIDIES_DISPATCHER_CONTRACT_PATH
  ? process.env.LAIDIES_DISPATCHER_CONTRACT_PATH
  : 'operations/runtime/dispatcher-migration.json');
const automationsRoot = path.resolve(fixtureMode && process.env.LAIDIES_AUTOMATIONS_ROOT
  ? process.env.LAIDIES_AUTOMATIONS_ROOT
  : path.join(os.homedir(), '.codex/automations'));
const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const errors = [];

const readAutomation = id => {
  const file = path.join(automationsRoot, id, 'automation.toml');
  if (!fs.existsSync(file)) {
    errors.push(`${id}: automation.toml is missing`);
    return { file, text: '' };
  }
  return { file, text: fs.readFileSync(file, 'utf8') };
};
const tomlString = (text, key) => {
  const match = text.match(new RegExp(`^${key} = ("(?:[^"\\\\]|\\\\.)*")$`, 'm'));
  if (!match) return null;
  try { return JSON.parse(match[1]); } catch { return null; }
};

if (contract.schema_version !== 1) errors.push('schema_version must equal 1');
if (contract.migration_status !== 'VERIFIED_CONFIGURATION_ONLY_DISPATCHER_PAUSED') {
  errors.push('migration_status must preserve the configuration-only and paused proof ceiling');
}

const expected = contract.dispatcher;
const dispatcher = readAutomation(expected.automation_id);
const status = tomlString(dispatcher.text, 'status');
const target = tomlString(dispatcher.text, 'target_thread_id');
const prompt = tomlString(dispatcher.text, 'prompt') || '';
if (status !== expected.required_status) errors.push(`${expected.automation_id}: status=${status || 'MISSING'}; expected ${expected.required_status}`);
if (target !== expected.target_thread_id) errors.push(`${expected.automation_id}: target_thread_id=${target || 'MISSING'}; expected ${expected.target_thread_id}`);
if (target === expected.superseded_target_thread_id) errors.push(`${expected.automation_id}: still targets the superseded crash-prone task`);
for (const fragment of expected.required_prompt_fragments || []) {
  if (!prompt.includes(fragment)) errors.push(`${expected.automation_id}: prompt missing ${fragment}`);
}
for (const fragment of expected.forbidden_prompt_fragments || []) {
  if (prompt.includes(fragment)) errors.push(`${expected.automation_id}: prompt retains forbidden stale authority ${fragment}`);
}

for (const related of contract.related_automations || []) {
  const automation = readAutomation(related.automation_id);
  const relatedPrompt = tomlString(automation.text, 'prompt') || '';
  if (!relatedPrompt.includes(related.required_prompt_fragment)) {
    errors.push(`${related.automation_id}: prompt missing ${related.required_prompt_fragment}`);
  }
  if (relatedPrompt.includes('operations/release/RELEASE-STATE.json')) {
    errors.push(`${related.automation_id}: prompt retains nonexistent operations/release/RELEASE-STATE.json`);
  }
}

if (errors.length) {
  console.error('DISPATCHER MIGRATION FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`${fixtureMode ? 'DISPATCHER MIGRATION FIXTURE PASS — NOT PRODUCTION EVIDENCE' : 'DISPATCHER MIGRATION PASS'} (${expected.automation_id} remains ${status}; target=${target})`);
