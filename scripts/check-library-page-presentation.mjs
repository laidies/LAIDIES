#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { validateLibraryPagePresentation } from './lib/library-page-presentation.mjs';

const root = process.cwd();
const librarySource = fs.readFileSync(path.join(root, 'library.html'), 'utf8');
const puffySource = fs.readFileSync(path.join(root, 'content/site/puffy-bookmarks.js'), 'utf8');
const errors = validateLibraryPagePresentation(librarySource, puffySource);

if (errors.length) {
  console.error('LIBRARY PAGE PRESENTATION FAIL');
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}
console.log('LIBRARY PAGE PRESENTATION PASS');
console.log('scope=palette semantic_callouts save_controls correction_action navigation visitor_language');
