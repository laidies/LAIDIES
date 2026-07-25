#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../../..');
const read = (file) => readFileSync(resolve(root, file), 'utf8');
const fail = (message) => {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
};
const count = (text, pattern) => [...text.matchAll(pattern)].length;

const resident = read('resident-card.html');
const library = read('library.html');
const handbook = read('handbook.html');
const cards = read('games/trading-cards.html');

const profileButtons = [...resident.matchAll(/<button\b([^>]*\bdata-member-profile=[^>]*)>/g)];
const unnamedProfileButtons = profileButtons.filter(([, attributes]) => !/\baria-label=(['"]).+?\1/.test(attributes));
if (profileButtons.length !== 31) fail(`expected 31 Resident Card profile controls, found ${profileButtons.length}`);
if (unnamedProfileButtons.length) fail(`${unnamedProfileButtons.length} Resident Card profile control(s) lack an accessible name`);

for (const [file, source] of [['library.html', library], ['handbook.html', handbook], ['games/trading-cards.html', cards]]) {
  const imagesWithoutAlt = count(source, /<img\b(?:(?!\balt=)[^>])*>/gi);
  if (imagesWithoutAlt) fail(`${file} has ${imagesWithoutAlt} image(s) without an alt attribute`);
}

if (!library.includes('alt="Inside the SUNNYVAiLE LIBRAiRY — three curved book departments and Miss Jeeves at the reference desk"')) {
  fail('Library arrival image needs its meaningful alt text');
}
if (!handbook.includes('alt="A SUNNYVAiLE guide holds a checklist over a numbered town route"')) {
  fail('Handbook arrival image needs its meaningful alt text');
}

const tradingImages = [...cards.matchAll(/<img\b([^>]*)>/gi)];
const decorativeTradingImages = tradingImages.filter(([, attributes]) => /\balt=(['"])\1/.test(attributes));
if (tradingImages.length !== 31 || decorativeTradingImages.length !== 31) {
  fail(`Trading Cards must keep its 31 roster-preview images decorative (found ${decorativeTradingImages.length} of ${tradingImages.length})`);
}
if (count(cards, /<div class="char-deck-strip" aria-hidden="true">/g) !== 4 ||
    !cards.includes('<div class="tc-fold-preview tc-fold-preview--character" aria-hidden="true">')) {
  fail('Trading Cards decorative preview groups must remain hidden from assistive technology');
}

if (!process.exitCode) {
  console.log('PASS: 31 Resident Card profile controls named; 0 scoped images without alt; Trading Card previews remain deliberately decorative.');
}
