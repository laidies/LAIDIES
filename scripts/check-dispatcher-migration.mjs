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
const ciConfigurationOnly = !fixtureMode && process.env.CI === 'true';

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
if (contract.migration_status !== 'VERIFIED_ACTIVE_STANDALONE_TWICE_DAILY_DELTA') {
  errors.push('migration_status must identify the active standalone twice-daily successor');
}

const expected = contract.dispatcher;
if (expected?.required_status !== 'ACTIVE') errors.push('dispatcher.required_status must remain ACTIVE');
if (expected?.required_kind !== 'cron' || !expected?.required_rrule) errors.push('dispatcher cron identity is incomplete');
if (expected?.target_mode !== 'standalone_project') errors.push('dispatcher target_mode must be standalone_project');
if (!expected?.automation_id || !expected?.superseded_target_thread_id) {
  errors.push('dispatcher identity and retired target fields are incomplete');
}
if (!(expected?.required_prompt_fragments || []).length || !(expected?.forbidden_prompt_fragments || []).length) {
  errors.push('dispatcher prompt migration fragments are incomplete');
}

if (ciConfigurationOnly) {
  if (errors.length) {
    console.error('DISPATCHER MIGRATION CI CONTRACT FAIL');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log('DISPATCHER MIGRATION CI CONFIGURATION CONTRACT PASS — LIVE AUTOMATION STATE UNVERIFIED');
  process.exit(0);
}

const dispatcher = readAutomation(expected.automation_id);
const status = tomlString(dispatcher.text, 'status');
const kind = tomlString(dispatcher.text, 'kind');
const rrule = tomlString(dispatcher.text, 'rrule');
const target = tomlString(dispatcher.text, 'target_thread_id');
const prompt = tomlString(dispatcher.text, 'prompt') || '';
if (status !== expected.required_status) errors.push(`${expected.automation_id}: status=${status || 'MISSING'}; expected ${expected.required_status}`);
if (kind !== expected.required_kind) errors.push(`${expected.automation_id}: kind=${kind || 'MISSING'}; expected ${expected.required_kind}`);
if (rrule !== expected.required_rrule) errors.push(`${expected.automation_id}: rrule=${rrule || 'MISSING'}; expected ${expected.required_rrule}`);
if (target) errors.push(`${expected.automation_id}: standalone successor must not target a growing task; found ${target}`);
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
console.log(`${fixtureMode ? 'DISPATCHER MIGRATION FIXTURE PASS — NOT PRODUCTION EVIDENCE' : 'DISPATCHER MIGRATION PASS'} (${expected.automation_id} is ${status}; standalone=${target ? 'no' : 'yes'}; rrule=${rrule})`);
