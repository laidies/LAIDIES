#!/usr/bin/env node
// Blocks rendering a real historical woman when no likeness reference is bound.
//
// Why: operations/reference/real-people/<person>/ directories existed with
// READMEs and zero images, while the visual contract said "character-specific
// references govern identity". The model then invents a face, and no prompt
// rule can prevent it. This is the mechanical half of that problem.
//
//   node scripts/check-real-person-references.mjs            check everyone
//   node scripts/check-real-person-references.mjs ada-lovelace grace-hopper
//   node scripts/check-real-person-references.mjs --self-test  prove it can fail
//
// Exit 0 = every requested person has at least one reference image.
// Exit 1 = at least one does not. Do not render that person.

import { readdirSync, statSync, existsSync, mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.tif', '.tiff', '.avif']);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_REF_DIR = join(ROOT, 'operations', 'reference', 'real-people');

function imageCount(dir) {
  let n = 0;
  const walk = (d) => {
    for (const entry of readdirSync(d)) {
      const p = join(d, entry);
      if (statSync(p).isDirectory()) walk(p);
      else {
        const dot = entry.lastIndexOf('.');
        if (dot > -1 && IMAGE_EXT.has(entry.slice(dot).toLowerCase())) n++;
      }
    }
  };
  walk(dir);
  return n;
}

function audit(refDir, only = []) {
  if (!existsSync(refDir)) {
    return { rows: [], missingDir: refDir };
  }
  const people = readdirSync(refDir)
    .filter((e) => statSync(join(refDir, e)).isDirectory())
    .filter((e) => only.length === 0 || only.includes(e));

  return {
    rows: people.map((person) => ({ person, images: imageCount(join(refDir, person)) })),
    requested: only,
  };
}

function report({ rows, missingDir, requested = [] }, refDir) {
  if (missingDir) {
    console.error(`FAIL  reference directory does not exist: ${missingDir}`);
    return 1;
  }
  const unknown = requested.filter((r) => !rows.some((row) => row.person === r));
  for (const u of unknown) console.error(`FAIL  no reference directory for "${u}"`);

  let failed = unknown.length;
  for (const { person, images } of rows.sort((a, b) => a.person.localeCompare(b.person))) {
    if (images === 0) {
      console.error(`FAIL  ${person} — 0 reference images. Do not render this person.`);
      failed++;
    } else {
      console.log(`ok    ${person} — ${images} reference image${images === 1 ? '' : 's'}`);
    }
  }

  if (rows.length === 0 && unknown.length === 0) {
    console.error(`FAIL  no person directories found under ${refDir}`);
    return 1;
  }
  if (failed) {
    console.error(`\n${failed} person(s) have no bound likeness reference.`);
    console.error(`Add approved reference images under ${refDir}/<person>/ before rendering.`);
    return 1;
  }
  console.log(`\nAll ${rows.length} person(s) have a bound likeness reference.`);
  return 0;
}

// --- calibration: prove the check can actually fail -------------------------
function selfTest() {
  const tmp = mkdtempSync(join(tmpdir(), 'refcheck-'));
  let pass = true;
  const expect = (label, got, want) => {
    const ok = got === want;
    console.log(`${ok ? 'ok  ' : 'FAIL'}  ${label} — exit ${got}, expected ${want}`);
    if (!ok) pass = false;
  };

  // control A: a person dir with only a README must FAIL
  const bad = join(tmp, 'no-images');
  const badPerson = join(bad, 'someone');
  writeFileSync(join(mkdirp(badPerson), 'README.md'), 'notes only');
  expect('empty reference dir is rejected', report(audit(bad), bad), 1);

  // control B: a person dir with a real image file must PASS
  const good = join(tmp, 'with-images');
  const goodPerson = join(good, 'someone');
  writeFileSync(join(mkdirp(goodPerson), 'portrait.png'), 'x');
  expect('bound reference dir is accepted', report(audit(good), good), 0);

  rmSync(tmp, { recursive: true, force: true });
  console.log(pass ? '\nCALIBRATED — the check separates good from bad.' : '\nNOT CALIBRATED.');
  return pass ? 0 : 1;
}

function mkdirp(p) {
  mkdirSync(p, { recursive: true });
  return p;
}

const args = process.argv.slice(2);
process.exit(
  args[0] === '--self-test' ? selfTest() : report(audit(DEFAULT_REF_DIR, args), DEFAULT_REF_DIR)
);
