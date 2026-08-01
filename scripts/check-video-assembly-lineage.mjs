#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HASH = /^[a-f0-9]{64}$/;
const ACTIVE_DISPOSITIONS = new Set(['ACTIVE_CANDIDATE', 'REVIEWED_CANDIDATE', 'ACCEPTED_COMPONENT']);
const TERMINAL_DISPOSITIONS = new Set(['SUPERSEDED', 'REJECTED']);
const ALL_DISPOSITIONS = new Set([...ACTIVE_DISPOSITIONS, ...TERMINAL_DISPOSITIONS]);

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function validateLineageManifest(manifest, manifestPath, options = {}) {
  const errors = [];
  const fail = (code, message) => errors.push({ code, message });
  const verifyFiles = options.verifyFiles !== false;
  const absoluteManifest = path.resolve(manifestPath);
  const manifestDirectory = path.dirname(absoluteManifest);
  const root = path.resolve(manifestDirectory, manifest.repository_root || '../../..');
  const resolveRepo = (relativePath) => path.resolve(root, relativePath || '');
  const verifyBoundFile = (label, relativePath, expectedHash) => {
    if (!relativePath || !HASH.test(expectedHash || '')) {
      fail('INCOMPLETE_FILE_BINDING', `${label} requires a repository-relative path and SHA-256.`);
      return false;
    }
    const file = resolveRepo(relativePath);
    const relative = path.relative(root, file);
    if (relative.startsWith(`..${path.sep}`) || relative === '..') {
      fail('UNSAFE_PATH', `${label} resolves outside the repository root.`);
      return false;
    }
    if (!verifyFiles) return true;
    if (!fs.existsSync(file)) {
      fail('MISSING_BOUND_FILE', `${label} is missing at ${relativePath}.`);
      return false;
    }
    const actual = sha256(file);
    if (actual !== expectedHash) {
      fail('CHECKSUM_MISMATCH', `${label} checksum is ${actual}, expected ${expectedHash}.`);
      return false;
    }
    return true;
  };

  if (manifest.schema_version !== 1) fail('INVALID_SCHEMA_VERSION', 'schema_version must be 1.');
  if (!manifest.lineage_id || !manifest.content_id) fail('MISSING_IDENTITY', 'lineage_id and content_id are required.');
  if (!['PREASSEMBLY_HOLD', 'SUCCESSOR_ASSEMBLED_HOLD', 'SUCCESSOR_REVIEWED'].includes(manifest.state)) {
    fail('INVALID_STATE', 'state must describe a preassembly hold or an assembled successor.');
  }
  if (!['PASS', 'HOLD', 'FAIL'].includes(manifest.admission_status)) {
    fail('INVALID_ADMISSION_STATUS', 'admission_status must be PASS, HOLD or FAIL.');
  }

  const inventory = manifest.source_inventory || {};
  const inventoryBound = verifyBoundFile('source inventory', inventory.manifest_path, inventory.sha256);
  let sourceRows = [];
  if (inventoryBound && verifyFiles) {
    try {
      const source = JSON.parse(fs.readFileSync(resolveRepo(inventory.manifest_path), 'utf8'));
      sourceRows = source[inventory.collection_key];
      if (!Array.isArray(sourceRows)) {
        fail('MISSING_SOURCE_COLLECTION', `Source inventory has no array at ${inventory.collection_key}.`);
        sourceRows = [];
      }
    } catch (error) {
      fail('INVALID_SOURCE_INVENTORY', `Source inventory could not be parsed: ${error.message}`);
    }
  } else if (!verifyFiles) {
    sourceRows = manifest.prior_sequences || [];
  }

  const prior = Array.isArray(manifest.prior_sequences) ? manifest.prior_sequences : [];
  if (!prior.length) fail('MISSING_PRIOR_SEQUENCES', 'prior_sequences must inventory every built/reviewed sequence.');
  const priorByPath = new Map();
  const priorByHash = new Map();
  for (const sequence of prior) {
    const label = sequence.sequence_id || sequence.path || '<unnamed sequence>';
    if (!sequence.sequence_id || !Array.isArray(sequence.occurrences) || sequence.occurrences.length === 0 ||
        !Array.isArray(sequence.audio_seconds) || sequence.audio_seconds.length !== 2 ||
        !Number.isFinite(sequence.audio_seconds[0]) || !Number.isFinite(sequence.audio_seconds[1]) ||
        sequence.audio_seconds[1] <= sequence.audio_seconds[0]) {
      fail('INVALID_SEQUENCE_IDENTITY', `${label} requires an id, occurrences and increasing audio_seconds.`);
    }
    if (!ALL_DISPOSITIONS.has(sequence.disposition)) {
      fail('INVALID_SEQUENCE_DISPOSITION', `${label} has invalid disposition ${sequence.disposition}.`);
    }
    verifyBoundFile(label, sequence.path, sequence.sha256);
    if (priorByPath.has(sequence.path)) fail('DUPLICATE_SEQUENCE_PATH', `${sequence.path} appears more than once.`);
    if (priorByHash.has(sequence.sha256)) fail('DUPLICATE_SEQUENCE_HASH', `${sequence.sha256} appears more than once.`);
    priorByPath.set(sequence.path, sequence);
    priorByHash.set(sequence.sha256, sequence);
  }

  if (verifyFiles && sourceRows.length) {
    for (const row of sourceRows) {
      const sequence = priorByPath.get(row.path);
      if (!sequence) {
        fail('UNINVENTORIED_PRIOR_SEQUENCE', `Source inventory sequence ${row.path} is absent from prior_sequences.`);
        continue;
      }
      if (sequence.sha256 !== row.sha256 || !sameJson(sequence.occurrences, row.occurrences) ||
          !sameJson(sequence.audio_seconds, row.audio_seconds)) {
        fail('SOURCE_SEQUENCE_MISMATCH', `${row.path} does not match its source-inventory identity.`);
      }
    }
    for (const sequence of prior) {
      if (!sourceRows.some((row) => row.path === sequence.path && row.sha256 === sequence.sha256)) {
        fail('STALE_PRIOR_SEQUENCE', `${sequence.path} is not present in the bound source inventory.`);
      }
    }
  }

  const receiptCache = new Map();
  const loadReceipt = (binding, label) => {
    if (!binding) return null;
    if (!verifyBoundFile(label, binding.path, binding.sha256)) return null;
    if (receiptCache.has(binding.path)) return receiptCache.get(binding.path);
    if (!verifyFiles && binding.inline_receipt) {
      receiptCache.set(binding.path, binding.inline_receipt);
      return binding.inline_receipt;
    }
    try {
      const receipt = JSON.parse(fs.readFileSync(resolveRepo(binding.path), 'utf8'));
      receiptCache.set(binding.path, receipt);
      return receipt;
    } catch (error) {
      fail('INVALID_SUPERSESSION_RECEIPT', `${label} could not be parsed: ${error.message}`);
      return null;
    }
  };
  const validateReceipt = (sequence, binding, includedHashes, label) => {
    const receipt = loadReceipt(binding, label);
    if (!receipt) return false;
    if (receipt.content_id !== manifest.content_id || receipt.old_path !== sequence.path ||
        receipt.old_sha256 !== sequence.sha256 || !HASH.test(receipt.new_sha256 || '') ||
        !receipt.new_path || !receipt.reason || !Array.isArray(receipt.occurrences) || !receipt.occurrences.length) {
      fail('UNBOUND_SUPERSESSION_RECEIPT', `${label} does not bind the content, old sequence, replacement, occurrences and reason.`);
      return false;
    }
    if (receipt.old_sha256 === receipt.new_sha256) {
      fail('SELF_SUPERSESSION', `${label} cannot replace a sequence with itself.`);
      return false;
    }
    const replacement = priorByHash.get(receipt.new_sha256);
    if (!replacement || replacement.path !== receipt.new_path) {
      fail('UNKNOWN_SUPERSESSION_REPLACEMENT', `${label} replacement is absent from prior_sequences.`);
      return false;
    }
    if (!receipt.occurrences.some((id) => sequence.occurrences.includes(id) && replacement.occurrences.includes(id))) {
      fail('NONOVERLAPPING_SUPERSESSION', `${label} replacement has no shared narration occurrence.`);
      return false;
    }
    if (includedHashes && !includedHashes.has(receipt.new_sha256)) {
      fail('SUPERSESSION_REPLACEMENT_NOT_INCLUDED', `${label} replacement is not included in the successor.`);
      return false;
    }
    return true;
  };

  for (const sequence of prior.filter((item) => TERMINAL_DISPOSITIONS.has(item.disposition))) {
    if (sequence.disposition === 'SUPERSEDED') {
      validateReceipt(sequence, sequence.supersession_receipt, null, `${sequence.sequence_id} supersession receipt`);
    }
  }

  const successor = manifest.successor;
  if (!successor) {
    if (manifest.state !== 'PREASSEMBLY_HOLD' || manifest.admission_status !== 'HOLD') {
      fail('MISSING_SUCCESSOR', 'A missing successor is only valid as PREASSEMBLY_HOLD / HOLD.');
    }
    if (!Array.isArray(manifest.hold_reasons) || !manifest.hold_reasons.length) {
      fail('UNEXPLAINED_PREASSEMBLY_HOLD', 'A preassembly hold requires explicit hold_reasons.');
    }
  } else {
    verifyBoundFile('successor candidate', successor.path, successor.sha256);
    const included = new Set(successor.included_sequence_sha256 || []);
    if (included.size !== (successor.included_sequence_sha256 || []).length) {
      fail('DUPLICATE_INCLUDED_SEQUENCE', 'Successor included_sequence_sha256 contains duplicates.');
    }
    for (const hash of included) {
      if (!priorByHash.has(hash)) fail('UNKNOWN_INCLUDED_SEQUENCE', `Successor includes unknown sequence ${hash}.`);
    }
    const successorReceipts = new Map((successor.supersession_receipts || []).map((binding) => [binding.old_sha256, binding]));
    for (const sequence of prior) {
      if (included.has(sequence.sha256)) continue;
      const binding = successorReceipts.get(sequence.sha256) || sequence.supersession_receipt;
      if (!binding) {
        fail('ORPHANED_SCENE', `${sequence.sequence_id} (${sequence.path}, ${sequence.sha256}) was omitted without an explicit supersession receipt.`);
        continue;
      }
      validateReceipt(sequence, binding, included, `${sequence.sequence_id} successor supersession receipt`);
    }
    if (manifest.state === 'PREASSEMBLY_HOLD') fail('STATE_SUCCESSOR_CONFLICT', 'A manifest with a successor cannot remain PREASSEMBLY_HOLD.');
  }

  return {
    valid: errors.length === 0,
    lineage_status: successor ? (errors.length ? 'FAIL' : 'RECONCILED') : (errors.length ? 'FAIL' : 'PREASSEMBLY_HOLD'),
    content_id: manifest.content_id,
    prior_sequence_count: prior.length,
    active_prior_sequence_count: prior.filter((item) => ACTIVE_DISPOSITIONS.has(item.disposition)).length,
    errors
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const manifestPath = process.argv[2];
  if (!manifestPath) {
    console.error('Usage: node scripts/check-video-assembly-lineage.mjs <lineage-manifest.json> [--require-successor]');
    process.exit(2);
  }
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const result = validateLineageManifest(manifest, manifestPath);
    if (process.argv.includes('--require-successor') && !manifest.successor) {
      result.valid = false;
      result.lineage_status = 'FAIL';
      result.errors.push({ code: 'SUCCESSOR_REQUIRED', message: 'No successor is bound to this lineage manifest.' });
    }
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.valid ? 0 : 1);
  } catch (error) {
    console.error(JSON.stringify({ valid: false, errors: [{ code: 'INVALID_LINEAGE_MANIFEST', message: error.message }] }, null, 2));
    process.exit(1);
  }
}

export { validateLineageManifest };
