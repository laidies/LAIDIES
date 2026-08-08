#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const required = [
  'operations/runtime/CANONICAL-INSTRUCTION-DEPENDENCY-MAP.md',
  'operations/CODEX-WORKING-AGREEMENT.md',
  'operations/ACTIVE-WORK.md',
  'operations/engine/LEDGER.md',
  'operations/product-stewards/OWNER-ENTRY-CONTRACT.md',
  'operations/product-stewards/VISITOR-STATE-EVALUATION-STANDARD.md',
  'operations/product-stewards/LEARNING-CONTENT-STANDARD.md',
  'operations/product-stewards/learning-content-ecosystem/CONTENT-QUALITY-ADMISSION-GATE.md',
  'operations/product-stewards/learning-content-ecosystem/FRESHNESS-SYSTEM.md',
  'operations/product-stewards/learning-content-ecosystem/AUTONOMOUS-CONTENT-EXECUTION-CONTRACT.md',
  'operations/video-qa/SITE-VIDEO-AND-ANIMATION-REVIEW-CONTRACT.md',
  'operations/product-stewards/VISUAL-ADMISSION-PROTOCOL.md',
  'docs/brand/style-creative-direction.md',
  'docs/product/butterfly-clip-economy.md',
  'docs/product/sustainable-growth-and-revenue-principles.md'
];

for (const relative of required) {
  if (!fs.existsSync(path.join(root, relative))) errors.push(`missing canonical dependency: ${relative}`);
}

const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
if (!read('operations/product-stewards/OWNER-ENTRY-CONTRACT.md').includes('operations/runtime/CANONICAL-INSTRUCTION-DEPENDENCY-MAP.md')) {
  errors.push('owner entry does not require the canonical dependency map');
}
const visitor = read('operations/product-stewards/VISITOR-STATE-EVALUATION-STANDARD.md');
for (const phrase of [
  'First-time visitor',
  'Returning visitor without a Resident Card',
  'Signed-in resident with a Resident Card',
  'Returning resident, not signed in',
  'Signed in without a completed Resident Card',
  'one passing state cannot lend its PASS to another'
]) {
  if (!visitor.includes(phrase)) errors.push(`visitor-state contract missing: ${phrase}`);
}

const map = read('operations/runtime/CANONICAL-INSTRUCTION-DEPENDENCY-MAP.md');
for (const heading of [
  'Authority and inheritance rule',
  'Mandatory sitewide dependencies',
  'Product-specific inheritance',
  'Brief and handoff admission'
]) {
  if (!map.includes(`## ${heading}`)) errors.push(`canonical map missing section: ${heading}`);
}

if (errors.length) {
  console.error('CANONICAL INSTRUCTION DEPENDENCIES FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`CANONICAL INSTRUCTION DEPENDENCIES PASS (${required.length} required sources)`);
