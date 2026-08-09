#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const value = flag => { const i = args.indexOf(flag); return i < 0 ? null : args[i + 1]; };
const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(value('--root') || defaultRoot);
const output = value('--output');
const summaryOnly = args.includes('--summary-only');
const dirtyOnly = args.includes('--dirty-only');

function gitLines(parameters) {
  return execFileSync('git', parameters, { cwd: root, encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 }).split(/\r?\n/).filter(Boolean);
}

function classify(relative, tracked, ignored) {
  if (/^(AGENTS\.md|operations\/(DECISIONS\.md|engine\/LEDGER\.md|voice\/|CODEX-WORKING-AGREEMENT\.md))/.test(relative)) return 'AUTHORITY';
  if (/^operations\/external-review\/.*(?:\/sources\/|\.zip$)/i.test(relative)) return 'HISTORICAL';
  if (/(^|\/)(archive|_archive)(\/|$)|(^|\/)_backup-|historical|audit-prompt/i.test(relative)) return 'HISTORICAL';
  if (/rejected-artifacts|known-bad|negative-fixture|rejected/i.test(relative)) return 'REJECTED';
  if (
    ignored
    || /(^|\/)(dist|build|coverage|\.cache|node_modules)(\/|$)/i.test(relative)
    || /^operations\/launch\/[^/]+\/local-public-artifact\//i.test(relative)
    || /^operations\/product-stewards\/[^/]+\/campaigns\/[^/]+\/assets\//i.test(relative)
    || /\/evidence(?:-|\/).*\.(png|jpe?g|webp|mp4|mov|mkv|json)$/i.test(relative)
    || /^operations\/(video-qa|design-explorations|review-packets|control-room\/evidence)\/.*\.(png|jpe?g|webp|mp4|mov|mkv|pdf|mp3|m4a|adts)$/i.test(relative)
  ) return 'GENERATED';
  if (/^assets\//.test(relative) && tracked) return 'APPROVED_ASSET';
  if (/^(scripts|content|operations|docs|\.codex)\//.test(relative)) return 'ACTIVE_SOURCE';
  return 'UNKNOWN';
}

function statusMap() {
  const output = execFileSync('git', ['status', '--porcelain=v1', '-z', '-uall'], {
    cwd: root,
    encoding: 'buffer',
    maxBuffer: 128 * 1024 * 1024
  });
  const records = output.toString('utf8').split('\0').filter(Boolean);
  const statuses = new Map();
  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    const code = record.slice(0, 2);
    const relative = record.slice(3);
    statuses.set(relative, code);
    if (/^[RC]/.test(code) || /[RC]$/.test(code)) {
      const destination = records[index + 1];
      if (destination) statuses.set(destination, code);
      index += 1;
    }
  }
  return statuses;
}

function gitState(relative, tracked, ignored, statuses) {
  if (ignored) return 'IGNORED';
  const code = statuses.get(relative);
  if (code === '??') return 'UNTRACKED';
  if (code && code.includes('D')) return 'TRACKED_DELETED';
  if (code) return 'TRACKED_MODIFIED';
  if (tracked) return 'TRACKED_CLEAN';
  return 'UNKNOWN';
}

function disposition(classification, state) {
  if (state === 'TRACKED_CLEAN') return 'NO_ACTION';
  if (state === 'IGNORED') return 'KEEP_OUT_OF_GIT';
  if (classification === 'UNKNOWN') return 'HOLD_UNKNOWN';
  if (classification === 'GENERATED') return state === 'TRACKED_MODIFIED'
    ? 'REVIEW_TRACKED_GENERATED_FILE'
    : 'KEEP_OUT_OF_GIT';
  if (classification === 'REJECTED' || classification === 'HISTORICAL') {
    return 'PRESERVE_THEN_ARCHIVE_AFTER_RESTORE_PROOF';
  }
  if (state === 'TRACKED_DELETED') return 'VERIFY_DELETION_IN_EXACT_PACKAGE';
  return 'REVIEW_FOR_EXACT_PACKAGE_COMMIT';
}

export function buildInventory() {
  const tracked = new Set(gitLines(['ls-files']));
  const untracked = gitLines(['ls-files', '--others', '--exclude-standard']);
  const ignored = new Set(gitLines(['ls-files', '--others', '--ignored', '--exclude-standard']));
  const statuses = statusMap();
  const paths = [...new Set([...tracked, ...untracked, ...ignored])].sort();
  const rows = [];
  const counts = {};
  let bytes = 0;
  for (const relative of paths) {
    const absolute = path.join(root, relative);
    let stat = null;
    try { stat = fs.statSync(absolute); } catch {}
    if (stat && !stat.isFile()) continue;
    if (!stat && !statuses.get(relative)?.includes('D')) continue;
    const classification = classify(relative, tracked.has(relative), ignored.has(relative));
    const state = gitState(relative, tracked.has(relative), ignored.has(relative), statuses);
    counts[classification] = (counts[classification] || 0) + 1;
    bytes += stat?.size || 0;
    rows.push({
      path: relative,
      bytes: stat?.size || 0,
      tracked: tracked.has(relative),
      ignored: ignored.has(relative),
      modified_at: stat ? stat.mtime.toISOString() : null,
      classification,
      git_state: state,
      disposition: disposition(classification, state),
      reference_count: 0
    });
  }
  const byPath = new Map(rows.map(row => [row.path, row]));
  const searchable = rows.filter(row => row.bytes <= 2_000_000 && /\.(md|json|html?|css|js|mjs|cjs|py|sh|toml|ya?ml|txt|csv|tsv)$/i.test(row.path));
  const patterns = rows.filter(row => row.classification === 'HISTORICAL' || row.classification === 'UNKNOWN').map(row => row.path);
  const chunks = [];
  for (let index = 0; index < patterns.length; index += 250) {
    const values = patterns.slice(index, index + 250);
    chunks.push({ values: new Set(values), expression: new RegExp(values.map(value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g') });
  }
  for (const source of searchable) {
    let sourceText;
    try { sourceText = fs.readFileSync(path.join(root, source.path), 'utf8'); } catch { continue; }
    for (const chunk of chunks) {
      const matches = new Set(sourceText.match(chunk.expression) || []);
      for (const candidate of matches) if (candidate !== source.path && chunk.values.has(candidate)) byPath.get(candidate).reference_count += 1;
    }
  }
  const dirtyRows = rows.filter(row => !['TRACKED_CLEAN', 'IGNORED'].includes(row.git_state));
  const dirtyCounts = {};
  const dispositionCounts = {};
  for (const row of dirtyRows) {
    dirtyCounts[row.git_state] = (dirtyCounts[row.git_state] || 0) + 1;
    dispositionCounts[row.disposition] = (dispositionCounts[row.disposition] || 0) + 1;
  }
  return {
    schema_version: 2,
    root,
    generated_at: new Date().toISOString(),
    bytes,
    file_count: rows.length,
    counts,
    dirty_file_count: dirtyRows.length,
    dirty_counts: dirtyCounts,
    disposition_counts: dispositionCounts,
    rows: dirtyOnly ? dirtyRows : rows
  };
}

const inventory = buildInventory();
const summary = {
  schema_version: inventory.schema_version,
  generated_at: inventory.generated_at,
  root: inventory.root,
  bytes: inventory.bytes,
  file_count: inventory.file_count,
  counts: inventory.counts,
  dirty_file_count: inventory.dirty_file_count,
  dirty_counts: inventory.dirty_counts,
  disposition_counts: inventory.disposition_counts,
  unknown_move_rule: 'UNKNOWN never moves',
  commit_rule: 'Only exact reviewed packages are committed; never bulk-stage the dirty tree.',
  reference_count_scope: 'Exact repository-relative path mentions in text files at or below 2 MB.'
};
if (output) fs.writeFileSync(path.resolve(output), `${JSON.stringify(inventory, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(summaryOnly ? summary : inventory, null, 2)}\n`);
