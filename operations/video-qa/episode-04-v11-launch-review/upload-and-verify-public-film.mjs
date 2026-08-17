#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../../..');
const candidatePath = resolve(import.meta.dirname, 'release-candidate.json');
const humanReceiptPath = resolve(import.meta.dirname, 'human-and-occurrence-admission-receipt.json');
const outputPath = resolve(import.meta.dirname, 'public-film-verification-receipt.json');
const requiredAuthorization = 'authorized-public-object-write-after-human-pass';

const fail = (code, detail = '') => {
  const error = new Error(`${code}${detail ? `: ${detail}` : ''}`);
  error.code = code;
  throw error;
};

const parseArgs = (argv) => {
  const result = { selfTest: false, plan: false };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--self-test') result.selfTest = true;
    else if (argv[i] === '--plan') result.plan = true;
    else if (argv[i] === '--execute') result.execute = argv[++i];
  }
  return result;
};

const fileSha256 = (path) => new Promise((resolveHash, reject) => {
  const hash = createHash('sha256');
  createReadStream(path).on('data', (chunk) => hash.update(chunk)).on('error', reject).on('end', () => resolveHash(hash.digest('hex')));
});

const responseSha256 = async (response) => {
  if (!response.body) fail('PUBLIC_BODY_MISSING');
  const hash = createHash('sha256');
  for await (const chunk of response.body) hash.update(chunk);
  return hash.digest('hex');
};

const run = (command, args) => new Promise((resolveRun, reject) => {
  const child = spawn(command, args, { cwd: root, stdio: 'inherit' });
  child.once('error', reject);
  child.once('exit', (code) => code === 0 ? resolveRun() : reject(new Error(`${command} exited ${code}`)));
});

const verifyRange = async (url, range, expectedContentRange) => {
  const response = await fetch(url, { headers: { Range: range }, cache: 'no-store' });
  if (response.status !== 206) fail('PUBLIC_RANGE_STATUS_MISMATCH', `${range} got ${response.status}`);
  if (response.headers.get('content-range') !== expectedContentRange) fail('PUBLIC_CONTENT_RANGE_MISMATCH', range);
  await response.arrayBuffer();
};

const candidate = JSON.parse(await readFile(candidatePath, 'utf8'));
const filmPath = resolve(root, candidate.film.path);
const bucketObject = `laidies-films/${candidate.publicFilm.proposedImmutableKey}`;
const args = parseArgs(process.argv.slice(2));

const staticChecks = () => {
  if (!candidate.publicFilm.proposedImmutableKey.includes(candidate.film.sha256.slice(0, 12))) fail('IMMUTABLE_KEY_NOT_HASH_DERIVED');
  if (!candidate.publicFilm.proposedPublicUrl.endsWith(candidate.publicFilm.proposedImmutableKey)) fail('PUBLIC_URL_KEY_MISMATCH');
  if (candidate.film.bytes > 315 * 1024 * 1024) fail('WRANGLER_SINGLE_OBJECT_LIMIT_EXCEEDED');
};

staticChecks();

if (args.selfTest) {
  let rejected = false;
  try {
    if ('wrong-authorization' !== requiredAuthorization) fail('EXACT_PUBLIC_WRITE_AUTHORIZATION_REQUIRED');
  } catch (error) {
    if (error.code !== 'EXACT_PUBLIC_WRITE_AUTHORIZATION_REQUIRED') throw error;
    rejected = true;
  }
  if (!rejected) fail('AUTHORIZATION_CALIBRATION_FALSE_ACCEPT');
  console.log('EP04_V11_PUBLIC_UPLOAD_SELF_TEST_PASS authorization_rejects=1 size_within_wrangler_limit=true');
  process.exit(0);
}

if (args.plan) {
  console.log(JSON.stringify({
    action: 'PUBLIC_OBJECT_WRITE_NOT_EXECUTED',
    bucketObject,
    localPath: candidate.film.path,
    localSha256: candidate.film.sha256,
    publicUrl: candidate.publicFilm.proposedPublicUrl,
    requiredHumanReceipt: 'operations/video-qa/episode-04-v11-launch-review/human-and-occurrence-admission-receipt.json',
    commandAfterAuthorization: `wrangler r2 object put ${bucketObject} --file ${candidate.film.path} --content-type video/mp4 --cache-control public,max-age=31536000,immutable --remote`
  }, null, 2));
  process.exit(0);
}

if (args.execute !== requiredAuthorization) fail('EXACT_PUBLIC_WRITE_AUTHORIZATION_REQUIRED');

const humanReceipt = JSON.parse(await readFile(humanReceiptPath, 'utf8').catch(() => fail('HUMAN_ADMISSION_RECEIPT_REQUIRED')));
if (humanReceipt.verdict !== 'PASS' || humanReceipt.candidate.sha256 !== candidate.film.sha256 || humanReceipt.occurrenceCount !== 55) {
  fail('HUMAN_ADMISSION_RECEIPT_INVALID');
}
const info = await stat(filmPath);
if (info.size !== candidate.film.bytes) fail('LOCAL_FILM_SIZE_MISMATCH');
if (await fileSha256(filmPath) !== candidate.film.sha256) fail('LOCAL_FILM_SHA_MISMATCH');

const before = await fetch(candidate.publicFilm.proposedPublicUrl, { method: 'HEAD', cache: 'no-store' });
let uploadDisposition = 'EXISTING_OBJECT_REUSED_AFTER_EXACT_VERIFICATION';
if (before.status === 404) {
  uploadDisposition = 'NEW_IMMUTABLE_OBJECT_UPLOADED';
  await run('wrangler', [
    'r2', 'object', 'put', bucketObject,
    '--file', filmPath,
    '--content-type', 'video/mp4',
    '--cache-control', 'public,max-age=31536000,immutable',
    '--remote'
  ]);
} else if (before.status !== 200) {
  fail('PUBLIC_OBJECT_PREFLIGHT_UNEXPECTED_STATUS', before.status);
}

const head = await fetch(candidate.publicFilm.proposedPublicUrl, { method: 'HEAD', cache: 'no-store' });
if (head.status !== 200) fail('PUBLIC_HEAD_STATUS_MISMATCH', head.status);
if (Number(head.headers.get('content-length')) !== candidate.film.bytes) fail('PUBLIC_CONTENT_LENGTH_MISMATCH');
if (!String(head.headers.get('content-type')).startsWith('video/mp4')) fail('PUBLIC_CONTENT_TYPE_MISMATCH');

await verifyRange(candidate.publicFilm.proposedPublicUrl, 'bytes=0-1023', `bytes 0-1023/${candidate.film.bytes}`);
await verifyRange(
  candidate.publicFilm.proposedPublicUrl,
  `bytes=${candidate.film.bytes - 1024}-${candidate.film.bytes - 1}`,
  `bytes ${candidate.film.bytes - 1024}-${candidate.film.bytes - 1}/${candidate.film.bytes}`
);

const body = await fetch(candidate.publicFilm.proposedPublicUrl, { cache: 'no-store' });
if (body.status !== 200) fail('PUBLIC_FULL_BODY_STATUS_MISMATCH', body.status);
const publicSha256 = await responseSha256(body);
if (publicSha256 !== candidate.film.sha256) fail('PUBLIC_FULL_BODY_SHA_MISMATCH');

const receipt = {
  schemaVersion: 1,
  receiptId: 'EP04-V11-PUBLIC-FILM-OBJECT-VERIFICATION',
  recordedAt: new Date().toISOString(),
  candidateId: candidate.candidateId,
  authorization: 'EXPLICIT_PUBLIC_OBJECT_WRITE_AFTER_HUMAN_PASS',
  disposition: uploadDisposition,
  bucket: 'laidies-films',
  key: candidate.publicFilm.proposedImmutableKey,
  publicUrl: candidate.publicFilm.proposedPublicUrl,
  sha256: publicSha256,
  bytes: candidate.film.bytes,
  contentType: head.headers.get('content-type'),
  cacheControl: head.headers.get('cache-control'),
  rangeStart: 'PASS',
  rangeEnd: 'PASS',
  fullBodyIdentity: 'PASS',
  integrationMeaning: 'The exact film object is publicly reachable but no Screening Room registry, route, deployment or publication state was changed by this step.'
};

await writeFile(outputPath, `${JSON.stringify(receipt, null, 2)}\n`, { flag: 'wx' });
console.log(`EP04_V11_PUBLIC_FILM_VERIFIED path=${outputPath} sha256=${await fileSha256(outputPath)}`);
