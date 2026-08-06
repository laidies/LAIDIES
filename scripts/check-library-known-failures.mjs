#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { validateLibraryKnownFailures } from './lib/library-known-failures.mjs';

const root = process.cwd();
const sourcePath = process.env.LAIDIES_LIBRARY_SOURCE || path.join(root, 'library.html');
const source = fs.readFileSync(sourcePath, 'utf8');
const errors = validateLibraryKnownFailures(source);

if (errors.length) {
  console.error('LIBRARY KNOWN-FAILURE PREFLIGHT FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('LIBRARY KNOWN-FAILURE PREFLIGHT PASS');
console.log('scope=objective_known_failures_only qualitative_visual_review=still_required');
