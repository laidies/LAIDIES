#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const expected = new Map([
  ['--laidies-ink', '#11183b'],
  ['--laidies-pink', '#f254a9'],
  ['--laidies-purple', '#7137d6'],
  ['--laidies-cobalt', '#2457e6'],
  ['--laidies-cyan', '#15bce0'],
  ['--laidies-coral', '#ff7366'],
  ['--laidies-mint', '#7de2c2'],
  ['--laidies-yellow', '#ffd34d'],
  ['--laidies-orange', '#ff9b3d'],
  ['--laidies-sky', '#78c7ff'],
  ['--laidies-lilac', '#c7d7f5'],
  ['--laidies-cream', '#fffdfb'],
]);

function validate(systemCss) {
  const errors = [];

  for (const [token, value] of expected) {
    if (!systemCss.includes(`${token}: ${value};`)) {
      errors.push(`${token} must be ${value}`);
    }
  }

  for (const recipe of [
    '--laidies-bg-comic-masthead',
    '--laidies-bg-comic-section',
    '--laidies-bg-quiet-reading',
  ]) {
    if (!systemCss.includes(recipe)) errors.push(`missing background recipe ${recipe}`);
  }

  for (const file of ['index.html', 'library.html', 'chick-flicks.html', 'watch.html']) {
    if (!read(file).includes('/content/site/laidies-visual-system.css?v=')) {
      errors.push(`${file} does not load the shared visual system`);
    }
  }

  const chickCss = read('content/chick-flicks.css');
  for (const token of ['--laidies-ink', '--laidies-pink', '--laidies-cyan', '--laidies-bg-comic-masthead', '--laidies-bg-comic-section', '--laidies-bg-quiet-reading']) {
    if (!chickCss.includes(`var(${token})`)) errors.push(`Chick Flicks does not consume ${token}`);
  }

  const watchCss = read('content/watch-v2.css');
  for (const file of ['watch.html', 'content/watch-v2.css', 'chick-flicks.html', 'content/chick-flicks.css']) {
    if (read(file).includes('#4b2148')) errors.push(`${file} still contains retired deep plum`);
  }
  const currentListenStart = watchCss.indexOf('/* 2026-09-04 current-site colour correction.');
  if (currentListenStart < 0) {
    errors.push('current Listen visual-system boundary is missing');
  } else {
    const listenCss = watchCss.slice(currentListenStart);
    for (const retired of [
      '#4b2148',
      'linear-gradient(150deg, #f8ecdd',
      'linear-gradient(135deg, #57b6c0 0%, #8bbde9',
      'linear-gradient(135deg, #c96652 0%, #db7581',
    ]) {
      if (listenCss.includes(retired)) errors.push(`Listen contains retired treatment: ${retired}`);
    }
  }

  if ((watchCss.match(/--screen-ink:\s*var\(--laidies-ink\)/g) || []).length !== 1) {
    errors.push('Listen must have exactly one active token bridge');
  }
  if (!watchCss.includes('background-image: var(--laidies-bg-comic-masthead);')) {
    errors.push('Listen masthead does not consume the approved comic recipe');
  }

  return errors;
}

const systemCss = read('content/site/laidies-visual-system.css');
const errors = validate(systemCss);
if (errors.length) {
  console.error(`FAIL LAiDIES visual system (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

if (process.argv.includes('--calibrate')) {
  const knownBad = systemCss.replace('--laidies-ink: #11183b;', '--laidies-ink: #4b2148;');
  const calibrationErrors = validate(knownBad);
  if (!calibrationErrors.some((error) => error.includes('--laidies-ink must be #11183b'))) {
    console.error('FAIL calibration: retired deep-plum ink was not rejected');
    process.exit(1);
  }
  console.log('PASS calibration: rejected retired deep-plum ink');
}

console.log('PASS LAiDIES visual system: 12 colours, 3 background recipes, 4 consumers');
