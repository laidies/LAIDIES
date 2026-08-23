#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const WORD = /\bplay(?:s|ed|ing)?\b/i;
const DYNAMIC_PUBLIC = [
  'script.js',
  'content/episode-page.js',
  'content/site/bronze-aige-v2.js',
  'content/site/ksvl-player.js',
  'content/site/mall-shop-v2.js',
  'content/site/mini-player.js',
  'content/site/site-data.js',
  'content/site/fairy-godmother-v2.js',
  'content/site/sunnyvaile-directory.js',
  'content/site/sv-trailer-player.js',
  'content/site/sv-welcome-tour.js',
  'games/data/receipts-stories.js',
  'games/dream-phone-bundles.js',
  'games/dream-phone-game.js'
];
const PUBLIC_JSON = [
  'content/data/character-cards.json',
  'content/data/mme-claio-deck.json',
  'content/episodes/issue-01.json',
  'content/site/site-index.json'
];

export function findVisiblePlayHtml(source) {
  const failures = [];
  const withoutCode = source
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  const attributes = /(?:aria-label|title|placeholder|data-desc|value)\s*=\s*(["'])([\s\S]*?)\1/gi;
  for (const match of withoutCode.matchAll(attributes)) if (WORD.test(match[2])) failures.push(match[2].trim());
  const text = />((?:(?!<).)*)</gs;
  for (const match of withoutCode.matchAll(text)) {
    const value = match[1].replace(/\s+/g, ' ').trim();
    if (WORD.test(value)) failures.push(value);
  }
  return failures;
}

export function findVisiblePlayJs(source) {
  const failures = [];
  const lines = source.split(/\r?\n/);
  const quoted = /(["'`])((?:\\.|(?!\1)[\s\S])*?)\1/g;
  const technicalContext = /(?:\.play\s*\(|addEventListener\s*\(\s*['"]play|setActionHandler\s*\(\s*['"]play|playbackState|class(?:Name)?\s*[:=]|getElementById|querySelector|state\.lastFailure|kind\s*:\s*['"]play|plausible|console\.|\b(?:var|let|const)\s+\w*play\w*)/i;
  const technicalLiteral = /^(?:play|playing|KSVL play|\[KSVL\] Play)$/i;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!WORD.test(line) || /^\s*(?:\/\/|\*)/.test(line)) continue;
    for (const match of line.matchAll(quoted)) {
      const value = match[2];
      if (!WORD.test(value)) continue;
      if (/^https?:\/\//i.test(value)) continue;
      if (technicalContext.test(line) || technicalLiteral.test(value) || /[{}]/.test(value) || /(?:^|[-_.#])play(?:ing)?(?:[-_.:#]|$)/i.test(value)) continue;
      failures.push({ line: index + 1, value: value.replace(/\s+/g, ' ').trim() });
    }
  }
  return failures;
}

export function findVisiblePlayJson(value, trail = '$') {
  const failures = [];
  if (typeof value === 'string') {
    if (WORD.test(value)) failures.push({ trail, value });
    return failures;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => failures.push(...findVisiblePlayJson(item, `${trail}[${index}]`)));
    return failures;
  }
  if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) failures.push(...findVisiblePlayJson(item, `${trail}.${key}`));
  }
  return failures;
}

export function checkPublicUiLanguage(root = process.cwd()) {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'operations/release-control/public-entrypoints.json'), 'utf8'));
  const failures = [];
  for (const relative of manifest.entrypoints || []) {
    const absolute = path.join(root, relative);
    if (!fs.existsSync(absolute)) { failures.push(`${relative}: missing public entrypoint`); continue; }
    const source = fs.readFileSync(absolute, 'utf8');
    for (const value of findVisiblePlayHtml(source)) failures.push(`${relative}: ${value}`);
    const scripts = [...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
    for (const script of scripts) {
      for (const result of findVisiblePlayJs(script[1])) failures.push(`${relative}:inline:${result.line}: ${result.value}`);
    }
  }
  for (const relative of DYNAMIC_PUBLIC) {
    const absolute = path.join(root, relative);
    if (!fs.existsSync(absolute)) { failures.push(`${relative}: missing dynamic public source`); continue; }
    for (const result of findVisiblePlayJs(fs.readFileSync(absolute, 'utf8'))) failures.push(`${relative}:${result.line}: ${result.value}`);
  }
  for (const relative of PUBLIC_JSON) {
    const absolute = path.join(root, relative);
    if (!fs.existsSync(absolute)) { failures.push(`${relative}: missing public JSON source`); continue; }
    const parsed = JSON.parse(fs.readFileSync(absolute, 'utf8'));
    for (const result of findVisiblePlayJson(parsed)) failures.push(`${relative}:${result.trail}: ${result.value}`);
  }
  return failures;
}

const invoked = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (invoked) {
  const failures = checkPublicUiLanguage();
  if (failures.length) {
    console.error('PUBLIC UI LANGUAGE FAIL');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  console.log('PUBLIC UI LANGUAGE PASS — visitor-visible Play/plays/played/playing=0; technical media APIs preserved');
}
