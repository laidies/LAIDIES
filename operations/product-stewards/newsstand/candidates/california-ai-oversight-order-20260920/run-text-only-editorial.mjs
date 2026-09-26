import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { requestFor, normalize } from '../../review-runtime/protocol.mjs';
import { resolveNewsstandEditorialPacket } from '../../../../../scripts/compact-newsstand-editorial-input.mjs';
import { inspectPreparedDraft } from '../../../../../scripts/prepare-newsstand-draft.mjs';
import { inspectProseQualityReview } from '../../../../../scripts/check-prose-quality-admission.mjs';
import { validateStoryTypeCoverage } from '../../../../../scripts/validate-newsstand-story-type-coverage.mjs';

const dir = 'operations/product-stewards/newsstand/candidates/california-ai-oversight-order-20260920/';
const out = dir + 'editorial-review-v6-text-only/';
const calibrationDir = 'operations/product-stewards/newsstand/review-runtime/calibration/qualified-news-metrics-policy-20260905/';
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const read = file => fs.readFileSync(file, 'utf8');
const json = file => JSON.parse(read(file));
const write = (file, value) => fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
fs.mkdirSync(out, { recursive: true });

const story = json(dir + 'story.json');
assert.deepEqual(validateStoryTypeCoverage(json(dir + 'story-type-coverage.json'), story.themes || [], undefined, { story, root: process.cwd() }), []);
const producer = json(dir + 'producer-publication-review.json');
assert.equal(producer.verdict, 'PASS');
assert.deepEqual(inspectProseQualityReview(producer, { root: process.cwd() }).errors, []);
const draftErrors = inspectPreparedDraft(story, json(dir + 'writer-input-current.json'), json(dir + 'producer-observations.json')).errors;
assert.deepEqual(draftErrors, [`${story.id} published story image is missing or incomplete`], 'Only the legacy mandatory-image check may be bypassed for this no-image article.');
const calibration = json(calibrationDir + 'calibration-result.json');
assert.equal(calibration.status, 'CALIBRATION_PASSED');
assert.equal(calibration.providerRoute, 'claude');
assert.equal(calibration.effort || 'medium', 'medium');
assert.equal(calibration.mode, 'ORDINARY_NEWS_BLIND_REJECTION_V1');

const packet = resolveNewsstandEditorialPacket(json(dir + 'editorial-input.json'));
const request = requestFor('editorial', packet);
write(out + 'article-editorial-packet.json', packet);
write(out + 'article-editorial-request.json', request);
write(out + 'text-only-preflight.json', {
  checkedAt: new Date().toISOString(),
  status: 'PASS_WITH_EXACT_LEGACY_IMAGE_EXCEPTION',
  exception: draftErrors[0],
  rationale: 'Current assigned authority permits this article to carry no image; the older writer preflight requires a hero image for every published story. All prose, contract, source, story-type, observation, producer-review and calibration checks passed.',
  publicationAuthority: false
});

const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'news-bounded-review-'));
const args = ['--print', '--safe-mode', '--tools', '', '--permission-mode', 'dontAsk', '--no-session-persistence', '--model', 'claude-fable-5', '--effort', 'medium', '--output-format', 'json', '--json-schema', JSON.stringify(request.outputSchema), '--system-prompt', request.messages[0].content];
const startedAt = new Date().toISOString();
const response = await new Promise((resolve, reject) => {
  const child = spawn('claude', args, { cwd, stdio: ['pipe', 'pipe', 'pipe'] });
  let stdout = '', stderr = '';
  const timer = setTimeout(() => child.kill('SIGTERM'), 240000);
  child.stdout.setEncoding('utf8'); child.stderr.setEncoding('utf8');
  child.stdout.on('data', value => stdout += value); child.stderr.on('data', value => stderr += value);
  child.on('error', reject);
  child.on('close', code => { clearTimeout(timer); resolve({ code, stdout, stderr }); });
  child.stdin.end(request.messages[1].content);
});
fs.writeFileSync(out + 'article-editorial-provider.raw.json', response.stdout + '\n', { flag: 'wx' });
if (response.stderr) fs.writeFileSync(out + 'article-editorial-provider.stderr.txt', response.stderr, { flag: 'wx' });
assert.equal(response.code, 0, 'Claude provider execution failed');
const provider = JSON.parse(response.stdout);
assert.equal(provider.is_error, false);
assert.equal(provider.subtype, 'success');
const models = Object.keys(provider.modelUsage || {});
assert.ok(models.includes('claude-fable-5') && models.every(model => model.startsWith('claude-')));
const judgment = provider.structured_output || JSON.parse(provider.result.trim().replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, ''));
write(out + 'article-editorial-judgment.json', judgment);
const checked = normalize('editorial', judgment, packet);
write(out + 'article-editorial-checked.json', { kind: 'editorial', startedAt, completedAt: new Date().toISOString(), requestedModel: 'claude-fable-5', providerModel: models, providerId: provider.session_id, usage: provider.usage, requestSha256: sha(read(out + 'article-editorial-request.json')), rawSha256: sha(read(out + 'article-editorial-provider.raw.json')), ...checked });
write(out + 'article-result.json', { status: checked.verdict, reviewTextSha256: sha(read(dir + 'review-text.json')), calibrationDirectory: calibrationDir, admissionAuthority: false, reason: 'Actual combined cross-family editorial judgment using the existing Claude Max route; legacy mandatory-image preflight bypassed only for the authorized no-image article. Full review-chain admission remains required.' });
console.log(JSON.stringify({ name: 'article-editorial', verdict: checked.verdict, model: models, usage: provider.usage, noImageException: draftErrors[0] }));
if (checked.verdict !== 'PASS') process.exitCode = 1;
