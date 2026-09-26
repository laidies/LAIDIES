import assert from 'node:assert/strict';
import fs from 'node:fs';
import { assertNewsstandEvidenceTime } from './lib/newsstand-evidence-time.mjs';

const now = '2026-09-11T16:10:00Z';
const valid = {
  story: { updatedAt: '2026-09-11T08:46:55-07:00', lastCheckedAt: '2026-09-11T08:46:55-07:00' },
  producer: { reviewedAt: '2026-09-11T08:51:44-07:00' },
  independent: { reviewedAt: '2026-09-11T16:02:11.390Z' },
  evidence: [{ checkedAt: '2026-09-11T08:46:55-07:00', nextReviewAt: '2026-09-12T17:00:00Z', records: [{ accessedAt: '2026-09-11' }] }]
};
assert.doesNotThrow(() => assertNewsstandEvidenceTime(valid, now));
for (const target of ['story', 'producer', 'independent', 'evidence']) {
  const bad = structuredClone(valid);
  if (target === 'story') bad.story.lastCheckedAt = '2026-09-11T09:12:00-07:00';
  else if (target === 'evidence') bad.evidence[0].records.push({ capturedAt: '2026-09-11T16:11:00Z' });
  else bad[target].reviewedAt = '2026-09-11T16:11:00Z';
  assert.throws(() => assertNewsstandEvidenceTime(bad, now), /later than/);
}
const postReview = structuredClone(valid);
postReview.evidence[0].checkedAt = '2026-09-11T16:03:00Z';
assert.throws(() => assertNewsstandEvidenceTime(postReview, now), /later than/);
const dir = 'operations/product-stewards/newsstand/candidates/national-safety-proposals-20260911/';
const old = JSON.parse(fs.readFileSync(dir + 'independent-review/final-v1/ordinary-candidate.json'));
// Reproduce the actual observed defect at the time it was caught, not merely
// a hypothetical timestamp constructed after the fix.
assert.throws(() => assertNewsstandEvidenceTime({ ...valid, story: old.story }, '2026-09-11T15:56:38Z'), /later than/);
const fixed = JSON.parse(fs.readFileSync(dir + 'independent-review/final-ready/ordinary-candidate.json'));
assert.doesNotThrow(() => assertNewsstandEvidenceTime({ ...valid, story: fixed.story, evidence: [JSON.parse(fs.readFileSync(dir + 'source-evidence.json'))] }, now));
console.log('NEWSSTAND EVIDENCE TIME PASS: actual old candidate rejected; corrected candidate and scheduled follow-up accepted; future and post-review observations rejected');

for (const value of ['2026-02-30T00:00:00Z', '2025-02-29T00:00:00-07:00', '2026-09-10T24:00:00Z', 'tomorrow', 'invalid', '2026-09-12', '2026-09-11T15:40:00', null, 1789000000]) {
 const bad = structuredClone(valid); bad.evidence[0].checkedAt = value;
 assert.throws(() => assertNewsstandEvidenceTime(bad, now));
}
for (const field of ['updatedAt', 'lastCheckedAt']) {
 const bad = structuredClone(valid); bad.story[field] = '2026-09-11T15:55:00Z';
 assert.throws(() => assertNewsstandEvidenceTime(bad, now));
}
for (const value of ['2026-09-12', '2026-02-30']) {
 const bad = structuredClone(valid); bad.evidence[0].records[0].accessedAt = value;
 assert.throws(() => assertNewsstandEvidenceTime(bad, now));
}
