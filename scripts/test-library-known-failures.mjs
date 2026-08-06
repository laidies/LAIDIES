#!/usr/bin/env node

import assert from 'node:assert/strict';
import { validateLibraryKnownFailures } from './lib/library-known-failures.mjs';

const assets = [
  'assets/building-interiors/library-interior-purple-sign-wall-v5.png',
  'assets/building-interiors/delivery-20260722-library-interior-no-desk-v1/library-interior-no-desk-v1.png',
  'assets/building-interiors/library-shelf/delivery-20260722-3bay-wall-case-v2-even-spacing/library-wall-case-3bay-v1.png',
  'assets/building-interiors/library-shelf/delivery-20260722-transparent-v1/size-variants-v4/library-shelf-unit-2-row-full-width-v1.png',
  'assets/building-interiors/library-shelf/delivery-20260722-3-shelf-upright-v1/library-shelf-unit-3-shelf-upright-v1.png',
  'assets/library/episode-01-pop-comic-bg-v1.png'
].join(' ');
const good = `<style>body{background:#fffdfb}.library-hero{background:linear-gradient(145deg,#ef4d9c,#b75cc4 58%,#6c7cd1)}.library-world{background:linear-gradient(120deg,#f2c6e5,#c7d7f5)}.jv{background:linear-gradient(125deg,#65d1e3,#9cb9ed)}.shelf-guide{background:#67bde8 url('assets/library/episode-01-pop-comic-bg-v1.png')}</style>
<style>/* CATALOGUE_CONTROL_SHAPE_CONTRACT */.shelf-guide input,.shelf-guide button,.shelf-guide a,.shelf-guide .catalogue-controls,.shelf-guide .topic-links{border-radius:0}/* LIBRARY_WALL_CROP_CONTRACT */.library-room-unit{background-size:cover,152% auto}.library-room-unit[data-collection-room="0"]{--room-tint:pink}.library-room-unit[data-collection-room="1"]{--room-tint:cyan}.library-room-unit[data-collection-room="2"]{--room-tint:purple}.library-room-unit.is-compact-room{aspect-ratio:2/1}/* LIBRARY_SHELF_DEPTH_CONTRACT */.shelf-unit{bottom:.8%}.shelf-unit::after{z-index:5;background:url('assets/building-interiors/library-shelf/delivery-20260722-3bay-wall-case-v2-even-spacing/library-wall-case-3bay-v1.png')}.shelf-unit.is-compact{bottom:0}.shelf-unit.is-compact::after{background:url('assets/building-interiors/library-shelf/delivery-20260722-transparent-v1/size-variants-v4/library-shelf-unit-2-row-full-width-v1.png')}.brow--1{bottom:64.7%}.brow--2{bottom:38.7%}.brow--3{bottom:12.2%}.shelf-unit.is-compact .brow--1{bottom:52.6%}.shelf-unit.is-compact .brow--2{bottom:21.1%}.bk img{transform:translateY(2.5%)}</style>
<script>const BOOK_VISIBLE_SIZE_CONTRACT={};const LIBRARY_CASE_ANCHOR_CONTRACT={};const BOOK_PREVIEW_CHOICE_CONTRACT={};/* CATALOGUE_QUIET_DEFAULT_CONTRACT */const catalogueHasActiveFilter=false;const visible={length:4};const compactClass=visible.length>0&&visible.length<=4?' is-compact':'';result.textContent=!catalogueHasActiveFilter?'':'1 book found.';function resetBookPreview(){};resetBookPreview(true);returnTarget.focus({preventScroll:true});</script>
<button id="book-preview-back">Back to the shelf</button><button>Open this book</button>
<p class="library-status sr-only" id="library-status"></p><div class="library-room-unit"><div class="shelf-unit"><div class="brow brow--1" data-book-count="1"><button class="bk" data-preview-book data-visible-scale="1"><span class="sr-only">Preview book</span></button></div></div></div>${assets}`;

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
  [good.replace('LIBRARY_WALL_CROP_CONTRACT', 'REMOVED_WALL_CROP_CONTRACT'), 'cropped into the central wall'],
  [good.replace('data-collection-room="1"', 'data-room-removed="1"'), 'distinct collection wall colours'],
  [good.replace('LIBRARY_SHELF_DEPTH_CONTRACT', 'REMOVED_SHELF_DEPTH_CONTRACT'), 'foreground metal frame'],
  [good.replaceAll('library-shelf-unit-2-row-full-width-v1.png', 'missing-compact-case.png'), 'compact two-bay case'],
  [good.replace('translateY(2.5%)', 'translateY(0)'), 'shelf/rail seating geometry'],
  [good.replace('BOOK_PREVIEW_CHOICE_CONTRACT', 'REMOVED_PREVIEW_CHOICE_CONTRACT'), 'physical one-click shelf']
  ,[good.replace('id="book-preview-back"', 'id="preview-return-removed"'), 'one-click preview choice']
  ,[good + '<article class="shelf-book-record"><div class="shelf-book-copy"></div></article>', 'inline full-preview shelf']
  ,[good + '<p class="shelf-instruction">Do this first</p>', 'instruction paragraph']
  ,[good + '<p>Held books explain the hold and cannot open.</p>', 'held-book warning']
  ,[good.replace('CATALOGUE_CONTROL_SHAPE_CONTRACT', 'REMOVED_CONTROL_SHAPE_CONTRACT'), 'square-cornered catalogue']
  ,[good.replace('CATALOGUE_QUIET_DEFAULT_CONTRACT', 'REMOVED_QUIET_DEFAULT_CONTRACT'), 'quiet default catalogue']
  ,[good.replace('class="library-status sr-only"', 'class="library-status"'), 'screen-reader-only']
];

for (const [fixture, expected] of fixtures) {
  assert(validateLibraryKnownFailures(fixture).some(error => error.includes(expected)), `${expected} fixture must fail`);
}

console.log('LIBRARY KNOWN-FAILURE TEST PASS');
console.log(`calibrated_reject_fixtures=${fixtures.length}`);
