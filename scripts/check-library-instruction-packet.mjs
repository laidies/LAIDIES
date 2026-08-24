#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const packetPath = path.join(root, 'operations/library-decisions.md');
const decisionsPath = path.join(root, 'operations/DECISIONS.md');
const errors = [];
let packet = fs.readFileSync(packetPath, 'utf8');
const decisions = fs.readFileSync(decisionsPath, 'utf8');

if (process.env.LIBRARY_INSTRUCTION_PACKET_CALIBRATION === 'stale') {
  packet += '\nThe current mobile shelf uses a horizontal shelf reel from _library-v3.html.\n';
}
if (process.env.LIBRARY_INSTRUCTION_PACKET_CALIBRATION === 'conflict') {
  packet += '\nAll matching books are visible, but use Previous and Next to page the shelf.\n';
}

const requiredSources = [
  'operations/DECISIONS.md',
  'operations/product-stewards/library/CHARTER.md',
  'operations/product-stewards/library/EXPERIENCE-BRIEF.md',
  'operations/product-stewards/library/FUNCTIONALITY-MAP.md'
];
for (const relative of requiredSources) {
  if (!packet.includes(`\`${relative}\``)) errors.push(`active packet does not route ${relative}`);
  if (!fs.existsSync(path.join(root, relative))) errors.push(`active packet source is missing: ${relative}`);
}

const retiredPatterns = [
  [/_library-v3\.html/i, '_library-v3 shell'],
  [/horizontal shelf reel/i, 'horizontal shelf reel'],
  [/CURRENT STATE[^\n]*2026-07-22/i, 'obsolete July current-state block'],
  [/7 books load their full extracted text/i, 'obsolete seven-book readiness claim'],
  [/four-shelf upright composition/i, 'superseded four-shelf composition'],
  [/wall = the homepage "lilac/i, 'superseded CSS wall recipe'],
  [/page 1 of \d/i, 'shelf pagination'],
  [/use Previous and Next to page the shelf/i, 'shelf pagination instruction']
];
for (const [pattern, label] of retiredPatterns) {
  if (pattern.test(packet)) errors.push(`active packet contains retired instruction: ${label}`);
}

if (/visible together[^\n]*Previous and Next|Previous and Next[^\n]*visible together/i.test(packet)) {
  errors.push('active packet contradicts no-pagination collection truth');
}
if (/Trust it for names and\s+architecture/i.test(decisions)) {
  errors.push('DECISIONS still assigns stale architecture authority to the Canon Index');
}
if (!packet.includes('```banned')) errors.push('active packet is missing its compact retired-input block');

const lineCount = packet.trimEnd().split(/\r?\n/).length;
if (lineCount > 90) errors.push(`active Library packet is too large for routine task intake: ${lineCount} lines (max 90)`);

if (errors.length) {
  console.error('LIBRARY INSTRUCTION PACKET FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`LIBRARY INSTRUCTION PACKET PASS sources=${requiredSources.length} lines=${lineCount}`);
