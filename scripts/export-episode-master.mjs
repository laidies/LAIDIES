#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SECTION_SPECS = Object.freeze({
  'Export settings': 'json',
  'Written edition': 'html',
  Narration: 'text'
});
const KEY = /^[a-z][a-z0-9_]*$/;
const STATUS = 'PRODUCER_REPAIR';

function fail(message) {
  throw new Error(`episode-master: ${message}`);
}

function linesOf(source) {
  const lines = [];
  let offset = 0;
  while (offset < source.length) {
    const next = source.indexOf('\n', offset);
    const end = next === -1 ? source.length : next + 1;
    const raw = source.slice(offset, end);
    lines.push({ start: offset, end, text: raw.endsWith('\n') ? raw.slice(0, -1).replace(/\r$/, '') : raw });
    offset = end;
  }
  if (!lines.length) lines.push({ start: 0, end: 0, text: '' });
  return lines;
}

function parseSection(source, lines, heading, language) {
  const matches = lines.filter(line => line.text === `## ${heading}`);
  if (matches.length !== 1) fail(`${heading} section must appear exactly once.`);
  const headingIndex = lines.indexOf(matches[0]);
  const opener = lines[headingIndex + 1];
  if (!opener || opener.text !== `\`\`\`${language}`) fail(`${heading} must begin with an anchored \`\`\`${language} fence.`);
  let closeIndex = -1;
  for (let index = headingIndex + 2; index < lines.length; index += 1) {
    if (lines[index].text === '```') { closeIndex = index; break; }
  }
  if (closeIndex === -1) fail(`${heading} is missing its closing fence.`);
  const bodyStart = opener.end;
  let bodyEnd = lines[closeIndex].start;
  if (source.slice(bodyEnd - 2, bodyEnd) === '\r\n') bodyEnd -= 2;
  else if (source.slice(bodyEnd - 1, bodyEnd) === '\n') bodyEnd -= 1;
  const body = source.slice(bodyStart, bodyEnd);
  if (!body.length) fail(`${heading} payload must not be empty.`);
  return { headingIndex, closeIndex, body };
}

function parseSettings(raw) {
  let settings;
  try { settings = JSON.parse(raw); } catch (_) { fail('Export settings must be valid JSON.'); }
  if (!settings || typeof settings !== 'object' || Array.isArray(settings)) fail('Export settings must be an object.');
  const keys = Object.keys(settings).sort();
  if (keys.length !== 3 || keys.join(',') !== 'episode,shared,status') fail('Export settings must contain only episode, status, and shared.');
  if (!Number.isInteger(settings.episode) || settings.episode < 1 || settings.episode > 4) fail('episode must be an integer from 1 through 4.');
  if (settings.status !== STATUS) fail(`status must be ${STATUS}.`);
  if (!settings.shared || typeof settings.shared !== 'object' || Array.isArray(settings.shared)) fail('shared must be an object.');
  for (const [key, value] of Object.entries(settings.shared)) {
    if (!KEY.test(key)) fail(`shared key ${JSON.stringify(key)} is invalid.`);
    if (typeof value !== 'string' || !value.length) fail(`shared value ${JSON.stringify(key)} must be a non-empty string.`);
  }
  return settings;
}

function resolveTokens(body, shared, escape) {
  const used = new Set();
  const output = body.replace(/\{\{EP:([^}]*)\}\}/g, (token, key) => {
    if (!KEY.test(key)) fail(`invalid shared token ${JSON.stringify(token)}.`);
    if (!Object.hasOwn(shared, key)) fail(`unknown shared token ${JSON.stringify(token)}.`);
    used.add(key);
    return escape ? htmlEscape(shared[key]) : shared[key];
  });
  if (output.includes('{{EP:')) fail('unresolved shared token.');
  return { output, used };
}

function htmlEscape(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function parseMaster(source) {
  if (typeof source !== 'string') fail('master must be text.');
  const lines = linesOf(source);
  const sections = Object.fromEntries(Object.entries(SECTION_SPECS).map(([heading, language]) => [heading, parseSection(source, lines, heading, language)]));
  const indices = Object.values(sections).flatMap(section => [section.headingIndex, section.closeIndex]);
  if (new Set(indices).size !== indices.length) fail('export sections must not overlap.');
  const settings = parseSettings(sections['Export settings'].body);
  return Object.freeze({
    episode: settings.episode,
    status: settings.status,
    shared: Object.freeze({ ...settings.shared }),
    written: sections['Written edition'].body,
    narration: sections.Narration.body
  });
}

export function renderMaster(parsed) {
  if (!parsed || typeof parsed !== 'object' || !parsed.shared) fail('parsed master is required.');
  const html = resolveTokens(parsed.written, parsed.shared, true);
  const narration = resolveTokens(parsed.narration, parsed.shared, false);
  const used = new Set([...html.used, ...narration.used]);
  for (const key of Object.keys(parsed.shared)) {
    if (!used.has(key)) fail(`shared value ${JSON.stringify(key)} is unused.`);
    if (!html.used.has(key) || !narration.used.has(key)) fail(`shared value ${JSON.stringify(key)} must be bound in both editions.`);
  }
  return Object.freeze({ issueHtml: `${html.output}\n`, narration: `${narration.output}\n` });
}

export function deriveTargets(masterPath, episode) {
  const directory = path.dirname(path.resolve(masterPath));
  const number = String(episode).padStart(2, '0');
  return Object.freeze({
    issueHtml: path.join(directory, `issue-${number}.html`),
    narration: path.join(directory, `episode-${number}-narration.txt`)
  });
}

function compareOutputs(targets, rendered) {
  const drift = [];
  for (const [name, expected] of Object.entries(rendered)) {
    const target = targets[name];
    let actual = null;
    try { actual = fs.readFileSync(target, 'utf8'); } catch (_) {}
    if (actual !== expected) drift.push(target);
  }
  return drift;
}

export function exportMaster(masterPath, { check = false } = {}) {
  const source = fs.readFileSync(masterPath, 'utf8');
  const parsed = parseMaster(source);
  const rendered = renderMaster(parsed);
  const targets = deriveTargets(masterPath, parsed.episode);
  const drift = compareOutputs(targets, rendered);
  if (check) {
    if (drift.length) fail(`output drift: ${drift.join(', ')}`);
    return Object.freeze({ parsed, rendered, targets, changed: [] });
  }
  for (const target of drift) fs.writeFileSync(target, rendered[target === targets.issueHtml ? 'issueHtml' : 'narration'], 'utf8');
  return Object.freeze({ parsed, rendered, targets, changed: drift });
}

function usage() {
  console.error('Usage: node scripts/export-episode-master.mjs <master> [--check]');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const check = args.length === 2 && args[1] === '--check';
  if (!args.length || args.length > (check ? 2 : 1)) {
    usage();
    process.exitCode = 2;
  } else {
    try {
      const result = exportMaster(args[0], { check });
      console.log(check ? 'episode-master check passed' : `episode-master exported ${result.changed.length} file(s)`);
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  }
}
