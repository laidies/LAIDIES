import assert from 'node:assert/strict';
import fs from 'node:fs';
import { inspectHomepageCorrection, homepageCorrectionId } from './lib/homepage-correction-admission.mjs';

const root = process.cwd();
const queue = JSON.parse(fs.readFileSync('operations/control-room/owner-review-queue.json'));
const item = queue.review_now.find(item => item.id === homepageCorrectionId);
assert(item, 'authorized homepage candidate is required');
assert.deepEqual(inspectHomepageCorrection(item, root), []);
const cases = [
  ['different homepage', v => { v.design_admission.candidate.sha256 = '0'.repeat(64); }, 'homepage bytes differ'],
  ['different runtime', v => { v.design_admission.runtime.sha256 = '0'.repeat(64); }, 'runtime bytes differ'],
  ['missing Claude binding', v => { v.design_admission.evidence = v.design_admission.evidence.filter(b => !b.path.endsWith('/claude-review-result.json')); }, 'missing bound evidence: claude'],
  ['stale review', v => { v.design_admission.evidence[0].sha256 = '0'.repeat(64); }, 'stale evidence'],
  ['future candidate', v => { v.id = 'other-page'; }, 'wrong scoped candidate'],
  ['production promotion', v => { v.design_admission.production_release_approved = true; }, 'does not authorize production'],
];
if (item.design_admission.graphic) cases.push(['different graphic', v => { v.design_admission.graphic.sha256 = '0'.repeat(64); }, 'graphic bytes differ']);
if (item.design_admission.mallImage) cases.push(['different Mall image', v => { v.design_admission.mallImage.sha256 = '0'.repeat(64); }, 'Mall image bytes differ']);
if (item.design_admission.burst) cases.push(['different burst', v => { v.design_admission.burst.sha256 = '0'.repeat(64); }, 'burst bytes differ']);
for (const [name, mutate, reason] of cases) {
  const candidate = structuredClone(item);
  mutate(candidate);
  assert(inspectHomepageCorrection(candidate, root).some(error => error.includes(reason)), `${name} must fail for its actual defect`);
}
console.log(`Scoped homepage admission: valid candidate accepted; ${cases.length} bad cases rejected.`);
