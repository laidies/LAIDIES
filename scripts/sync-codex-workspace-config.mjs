#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = process.env.LAIDIES_CODEX_WORKSPACE_SOURCE || path.join(root, 'operations/codex-contract/workspace-config.toml');
// Default to this checkout. The outer workspace requires an explicit target;
// a worktree's parent may be a shared Projects folder, not a LAiDIES workspace.
const target = process.env.LAIDIES_CODEX_WORKSPACE_TARGET || path.join(root, '.codex', 'config.toml');
const check = process.argv.includes('--check');

const expected = fs.readFileSync(source, 'utf8');
if (check) {
  if (!fs.existsSync(target)) throw new Error(`workspace Codex config missing: ${target}`);
  const current = fs.readFileSync(target, 'utf8');
  if (current !== expected) throw new Error(`workspace Codex config drift: ${target}`);
  console.log(`CODEX WORKSPACE CONFIG PASS target=${target}`);
} else {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, expected);
  console.log(`CODEX WORKSPACE CONFIG SYNCED target=${target}`);
}
