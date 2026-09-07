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
  ['MISS_JEEVES_PANEL_EDGE','WHY_FROM_TO_LABELS','WOMEN_WIDE_SPACING','DISCOVERY_PALETTE'].includes(item.design_admission.owner_feedback_successor)
    ? ['missing portrait review', v => { v.design_admission.evidence = v.design_admission.evidence.filter(b => !b.path.endsWith('/independent-review.md')); }, 'missing bound evidence: independent-review.md']
    : ['missing Claude binding', v => { v.design_admission.evidence = v.design_admission.evidence.filter(b => !b.path.endsWith('/claude-review-result.json')); }, 'missing bound evidence: claude'],
  ['stale review', v => { v.design_admission.evidence[0].sha256 = '0'.repeat(64); }, 'stale evidence'],
  ['future candidate', v => { v.id = 'other-page'; }, 'wrong scoped candidate'],
  ['production promotion', v => { v.design_admission.production_release_approved = true; }, 'does not authorize production'],
];
if (item.design_admission.graphic) cases.push(['different graphic', v => { v.design_admission.graphic.sha256 = '0'.repeat(64); }, 'graphic bytes differ']);
if (item.design_admission.mallImage) cases.push(['different Mall image', v => { v.design_admission.mallImage.sha256 = '0'.repeat(64); }, 'Mall image bytes differ']);
if (item.design_admission.burst) cases.push(['different burst', v => { v.design_admission.burst.sha256 = '0'.repeat(64); }, 'burst bytes differ']);
if (item.design_admission.wallpaper) cases.push(['different wallpaper', v => { v.design_admission.wallpaper.sha256 = '0'.repeat(64); }, 'wallpaper bytes differ']);
if (item.design_admission.cover) cases.push(['different cover', v => { v.design_admission.cover.sha256 = '0'.repeat(64); }, 'cover bytes differ']);
if (item.design_admission.thumbnail) cases.push(['different thumbnail', v => { v.design_admission.thumbnail.sha256 = '0'.repeat(64); }, 'thumbnail bytes differ']);
if (item.design_admission.fairyImage) cases.push(['wrong Fairy image',v=>{v.design_admission.fairyImage.sha256='0'.repeat(64);},'current Fairy image bytes differ']);
if (item.design_admission.cards) {
  cases.push(['wrong card asset', v => {v.design_admission.cards[0].sha256='0'.repeat(64);}, 'current card bytes differ']);
  cases.push(['retired board direction', v => {v.design_admission.owner_feedback_successor='GIRL_TALK_THUMBNAIL';}, 'retired board direction rejected by owner']);
}
if(item.design_admission.owner_feedback_successor==='HOMEPAGE_CLOSEOUT') {
  for(const [key,label] of [['worker','worker'],['index','catalogue'],['indexBuilder','index builder']]) {
    cases.push(['changed '+label,v=>{v.design_admission[key].sha256='0'.repeat(64);},label+' bytes differ']);
  }
}
if(item.design_admission.sticker_palette) {
  cases.push(['wrong sticker pixels',v=>{v.design_admission.sticker_palette.asset.sha256='0'.repeat(64);},'sticker asset differs']);
  cases.push(['missing sticker pixel review',v=>{v.design_admission.sticker_palette.evidence=v.design_admission.sticker_palette.evidence.filter(e=>!e.path.endsWith('/independent-review.md'));},'missing sticker evidence']);
}
if(item.design_admission.narrow_heading_anchor) {
  cases.push(['wrong heading predecessor',v=>{v.design_admission.narrow_heading_anchor.parentSha256='0'.repeat(64);},'wrong heading predecessor']);
  cases.push(['missing heading pixel review',v=>{v.design_admission.narrow_heading_anchor.evidence=v.design_admission.narrow_heading_anchor.evidence.filter(e=>!e.path.endsWith('/review.md'));},'missing heading evidence']);
}
if(item.design_admission.intent_gradient) {
  cases.push(['missing gradient review',v=>{v.design_admission.intent_gradient.evidence=v.design_admission.intent_gradient.evidence.filter(e=>!e.path.endsWith('/review.md'));},'missing gradient evidence']);
}
if(item.design_admission.heading_outline) cases.push(['missing outline review',v=>{v.design_admission.heading_outline.evidence=v.design_admission.heading_outline.evidence.filter(e=>!e.path.endsWith('/review.md'));},'missing outline evidence']);
for (const [name, mutate, reason] of cases) {
  const candidate = structuredClone(item);
  mutate(candidate);
  assert(inspectHomepageCorrection(candidate, root).some(error => error.includes(reason)), `${name} must fail for its actual defect`);
}
console.log(`Scoped homepage admission: valid candidate accepted; ${cases.length} bad cases rejected.`);
