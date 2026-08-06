#!/usr/bin/env node

import assert from 'node:assert/strict';
import { validateLibraryKnownFailures } from './lib/library-known-failures.mjs';

const assets = [
  'assets/building-interiors/delivery-20260722-library-interior-reroll-v1/library-interior-from-credits-dechromed-v4-no-baked-text.png',
  'assets/building-interiors/delivery-20260722-library-interior-no-desk-v1/library-interior-no-desk-v1.png',
  'assets/building-interiors/library-shelf/delivery-20260722-3bay-wall-case-v2-even-spacing/library-wall-case-3bay-v1.png',
  'assets/building-interiors/library-shelf/delivery-20260722-3-shelf-upright-v1/library-shelf-unit-3-shelf-upright-v1.png',
  'assets/library/episode-01-pop-comic-bg-v1.png'
].join(' ');
const good = `<style>body{background:#fffdfb}.library-hero{background:linear-gradient(145deg,#ef4d9c,#b75cc4 58%,#6c7cd1)}.library-world{background:linear-gradient(120deg,#f2c6e5,#c7d7f5)}.jv{background:linear-gradient(125deg,#65d1e3,#9cb9ed)}.shelf-guide{background:#67bde8 url('assets/library/episode-01-pop-comic-bg-v1.png')}</style>
<script>const BOOK_VISIBLE_SIZE_CONTRACT={};const LIBRARY_CASE_ANCHOR_CONTRACT={};const BOOK_PREVIEW_CHOICE_CONTRACT={};function resetBookPreview(){};resetBookPreview(true);returnTarget.focus({preventScroll:true});</script>
<button id="book-preview-back">Back to the shelf</button><button>Open this book</button>
<div class="library-room-unit"><div class="shelf-unit"><div class="brow brow--1"><button class="bk" data-preview-book data-visible-scale="1"><span class="sr-only">Preview book</span></button></div></div></div>${assets}`;

assert.deepEqual(validateLibraryKnownFailures(good), []);

const fixtures = [
  [good.replace('#9cb9ed', '#ef4d9c'), 'Miss Jeeves gradient'],
  [good.replace('assets/library/episode-01-pop-comic-bg-v1.png', 'assets/library/missing-comic.png'), 'pop-comic catalogue background'],
  [good.replace('#c7d7f5', '#19d3d1'), 'Library world gradient'],
  [good + '<section class="library-handback"></section>', 'library-handback slab'],
  [good + '<span class="bk-status">PREVIEW</span>', 'status slab'],
  [good + '<div id="shelf-pages"><button>Next</button></div>', 'pagination'],
  [good + `compactShelfLayout?'.department':'.library-room-unit'`, 'detach'],
  [good.replace('BOOK_VISIBLE_SIZE_CONTRACT', 'REMOVED_SIZE_CONTRACT'), 'visible-alpha'],
  [good.replace('LIBRARY_CASE_ANCHOR_CONTRACT', 'REMOVED_ANCHOR_CONTRACT'), 'wall/case'],
  [good.replace('BOOK_PREVIEW_CHOICE_CONTRACT', 'REMOVED_PREVIEW_CHOICE_CONTRACT'), 'physical one-click shelf']
  ,[good.replace('id="book-preview-back"', 'id="preview-return-removed"'), 'one-click preview choice']
  ,[good + '<article class="shelf-book-record"><div class="shelf-book-copy"></div></article>', 'inline full-preview shelf']
];

for (const [fixture, expected] of fixtures) {
  assert(validateLibraryKnownFailures(fixture).some(error => error.includes(expected)), `${expected} fixture must fail`);
}

console.log('LIBRARY KNOWN-FAILURE TEST PASS');
console.log(`calibrated_reject_fixtures=${fixtures.length}`);
