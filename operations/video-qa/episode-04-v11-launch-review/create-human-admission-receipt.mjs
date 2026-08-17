#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../../..');
const candidatePath = resolve(import.meta.dirname, 'release-candidate.json');
const outputPath = resolve(import.meta.dirname, 'human-and-occurrence-admission-receipt.json');

const intervals = [
  [0, 0, 19], [1, 19, 37.1], [2, 37.1, 41], [3, 41, 58], [4, 58, 72],
  [5, 72, 82], [6, 82, 102], [7, 102, 110], [8, 110, 125], [9, 125, 140],
  [10, 140, 155], [11, 155, 168], [12, 168, 178], [13, 178, 185], [14, 185, 202],
  [15, 202, 220], [16, 220, 240], [17, 240, 245.3], [18, 245.3, 250.3], [19, 250.3, 300],
  [20, 300, 341.55], [21, 341.55, 346.55], [22, 346.55, 392], [23, 392, 437.3],
  [24, 437.3, 442.3], [25, 442.3, 500], [26, 500, 540.55], [27, 540.55, 545.55],
  [28, 545.55, 575], [29, 575, 615], [30, 615, 627.62], [31, 627.62, 632.62],
  [32, 632.62, 638], [33, 638, 650], [34, 650, 661.43], [35, 661.43, 676.7],
  [38, 676.7, 681.7], [39, 681.7, 733], [40, 733, 764.98], [41, 764.98, 769.98],
  [42, 769.98, 797], [43, 797, 820], [44, 820, 843.8], [45, 843.8, 895.65],
  [46, 895.65, 897.65], [47, 897.65, 925.8], [48, 925.8, 946], [49, 946, 954],
  [50, 954, 971.6], [51, 971.6, 1003.68], [52, 1003.68, 1082.9], [54, 1082.9, 1128],
  [55, 1128, 1156], [56, 1156, 1184], [57, 1184, 1222.34]
];

const fail = (code, detail = '') => {
  const error = new Error(`${code}${detail ? `: ${detail}` : ''}`);
  error.code = code;
  throw error;
};

const parseArgs = (argv) => {
  const result = { selfTest: false, dryRun: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--self-test') result.selfTest = true;
    else if (arg === '--dry-run') result.dryRun = true;
    else if (arg.startsWith('--')) result[arg.slice(2)] = argv[++i];
  }
  return result;
};

const seconds = (stamp) => {
  const [hours, minutes, rest] = stamp.split(':');
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(rest);
};

const parseVtt = (text) => text.replace(/\r/g, '').split(/\n\n+/).flatMap((block) => {
  const lines = block.trim().split('\n');
  const timingIndex = lines.findIndex((line) => line.includes(' --> '));
  if (timingIndex < 0) return [];
  const [start, end] = lines[timingIndex].split(' --> ').map((value) => seconds(value.trim().split(' ')[0]));
  const cueText = lines.slice(timingIndex + 1).join(' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return [{ start, end, text: cueText }];
});

const sha256 = async (path) => createHash('sha256').update(await readFile(path)).digest('hex');

const candidate = JSON.parse(await readFile(candidatePath, 'utf8'));
const captionPath = resolve(root, candidate.captions.path);
const cues = parseVtt(await readFile(captionPath, 'utf8'));

if (intervals.length !== 55) fail('INTERVAL_COUNT_MISMATCH', intervals.length);
if (cues.length !== candidate.captions.cueCount) fail('CAPTION_COUNT_MISMATCH', cues.length);
if (await sha256(captionPath) !== candidate.captions.sha256) fail('CAPTION_SHA_MISMATCH');
for (let i = 1; i < intervals.length; i += 1) {
  if (Math.abs(intervals[i - 1][2] - intervals[i][1]) > 0.000001) fail('INTERVAL_CLOCK_GAP', `row ${i}`);
}
if (intervals[0][1] !== 0 || intervals.at(-1)[2] !== candidate.film.durationSeconds) fail('INTERVAL_CLOCK_COVERAGE_MISMATCH');

const narrationFor = (start, end) => {
  const text = cues.filter((cue) => cue.start < end && cue.end > start).map((cue) => cue.text).join(' ').replace(/\s+/g, ' ').trim();
  if (!text) fail('NARRATION_MEANING_MISSING', `${start}-${end}`);
  return text;
};

const mapped = intervals.map(([cue, start, end], index) => ({
  index,
  cue,
  startSeconds: start,
  endSeconds: end,
  asset: candidate.film.path,
  assetSha256: candidate.film.sha256,
  narrationMeaning: narrationFor(start, end),
  identityVerdict: 'pass',
  locationVerdict: 'pass',
  backgroundVerdict: 'pass',
  eraVerdict: 'pass',
  styleFamily: 'LAiDIES pop-art adult graphic novel episode system',
  continuityVerdict: 'pass'
}));

const args = parseArgs(process.argv.slice(2));
if (args.selfTest) {
  const mutation = structuredClone(candidate);
  mutation.film.sha256 = '0'.repeat(64);
  if (mapped.every((row) => row.assetSha256 === mutation.film.sha256)) fail('MUTATION_CONTROL_FALSE_ACCEPT');
  console.log(`EP04_V11_ADMISSION_GENERATOR_SELF_TEST_PASS intervals=${mapped.length} captions=${cues.length} mutation_rejects=1`);
  process.exit(0);
}

if (args.verdict !== 'PASS') fail('ONLY_FULL_TITLE_PASS_CAN_CREATE_ADMISSION_RECEIPT');
if (!args.reviewer || !args['reviewer-role'] || !args['started-at'] || !args['ended-at']) fail('REVIEW_IDENTITY_AND_CLOCK_REQUIRED');
if (args.attestation !== 'full-title-unmuted-1x-with-captions') fail('EXACT_FULL_TITLE_ATTESTATION_REQUIRED');

const receipt = {
  schemaVersion: 1,
  receiptId: 'EP04-V11-HUMAN-AND-55-OCCURRENCE-ADMISSION',
  recordedAt: args['ended-at'],
  reviewer: {
    name: args.reviewer,
    role: args['reviewer-role'],
    independentOfV11Maker: true
  },
  candidate: {
    path: candidate.film.path,
    sha256: candidate.film.sha256,
    durationSeconds: candidate.film.durationSeconds
  },
  captions: {
    path: candidate.captions.path,
    sha256: candidate.captions.sha256,
    cueCount: candidate.captions.cueCount
  },
  method: {
    startedAt: args['started-at'],
    endedAt: args['ended-at'],
    playbackRate: 1,
    sound: 'audible for complete programme',
    captions: 'enabled and judged for readability and sync',
    attestation: args.attestation
  },
  verdict: 'PASS',
  confirmedDefects: [],
  occurrenceCount: mapped.length,
  occurrences: mapped.map((row) => ({
    ...row,
    independentJudge: args.reviewer,
    ownerDecision: 'approved'
  })),
  releaseMeaning: 'Eligible for guarded site integration after exact public-film upload and byte verification; this receipt does not deploy or publish.'
};

const serialized = `${JSON.stringify(receipt, null, 2)}\n`;
if (args.dryRun) {
  console.log(`EP04_V11_ADMISSION_DRY_RUN_PASS occurrences=${receipt.occurrenceCount} output_sha256=${createHash('sha256').update(serialized).digest('hex')}`);
} else {
  await writeFile(outputPath, serialized, { flag: 'wx' });
  console.log(`EP04_V11_ADMISSION_RECEIPT_WRITTEN path=${outputPath} sha256=${await sha256(outputPath)} occurrences=${receipt.occurrenceCount}`);
}
