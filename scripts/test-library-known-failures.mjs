#!/usr/bin/env node

import assert from 'node:assert/strict';
import { validateLibraryKnownFailures } from './lib/library-known-failures.mjs';

const assets = [
  'assets/building-interiors/delivery-20260722-library-interior-reroll-v1/library-interior-from-credits-dechromed-v4-no-baked-text.png',
  'assets/building-interiors/library-shelf/delivery-20260722-3bay-wall-case-v2-even-spacing/library-wall-case-3bay-v1.png',
  'assets/building-interiors/library-shelf/delivery-20260722-3-shelf-upright-v1/library-shelf-unit-3-shelf-upright-v1.png'
].join(' ');
const good = `<style>body{background:#fffdfb}.library-hero{background:linear-gradient(145deg,#ef4d9c,#b75cc4 58%,#6c7cd1)}.library-world{background:linear-gradient(120deg,#f2c6e5,#c7d7f5)}.jv{background:linear-gradient(125deg,#65d1e3,#9cb9ed)}.shelf-guide{background:linear-gradient(110deg,#ef6bac,#f7cf58 50%,#67bde8)}</style>
<script>const BOOK_VISIBLE_SIZE_CONTRACT={};const LIBRARY_CASE_ANCHOR_CONTRACT={};const BOOK_INFORMED_CHOICE_CONTRACT={};function resetBookPreview(){};resetBookPreview(true);returnTarget.focus({preventScroll:true});</script>
<button id="book-preview-back">Back to the shelf</button><button>Open this book</button>
<article data-book-synopsis data-book-job data-book-contents data-book-depth data-book-currentness data-book-availability><button class="bk book-open-action" data-visible-scale="1"><span class="sr-only">Open available book</span></button></article>${assets}`;

assert.deepEqual(validateLibraryKnownFailures(good), []);

const fixtures = [
  [good.replace('#9cb9ed', '#ef4d9c'), 'Miss Jeeves gradient'],
  [good.replace('#67bde8', '#ff6b61'), 'catalogue gradient'],
  [good.replace('#c7d7f5', '#19d3d1'), 'Library world gradient'],
  [good + '<section class="library-handback"></section>', 'library-handback slab'],
  [good + '<span class="bk-status">PREVIEW</span>', 'status slab'],
  [good + '<div id="shelf-pages"><button>Next</button></div>', 'pagination'],
  [good + `compactShelfLayout?'.department':'.library-room-unit'`, 'detach'],
  [good.replace('BOOK_VISIBLE_SIZE_CONTRACT', 'REMOVED_SIZE_CONTRACT'), 'visible-alpha'],
  [good.replace('LIBRARY_CASE_ANCHOR_CONTRACT', 'REMOVED_ANCHOR_CONTRACT'), 'wall/case'],
  [good.replace('data-book-currentness', 'data-currentness-removed'), 'D-093 informed-choice']
  ,[good.replace('id="book-preview-back"', 'id="preview-return-removed"'), 'one-click preview choice']
];

for (const [fixture, expected] of fixtures) {
  assert(validateLibraryKnownFailures(fixture).some(error => error.includes(expected)), `${expected} fixture must fail`);
}

console.log('LIBRARY KNOWN-FAILURE TEST PASS');
console.log(`calibrated_reject_fixtures=${fixtures.length}`);
