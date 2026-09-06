import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { inspectProseReviewChain } from '../check-prose-quality-admission.mjs';

// Ali approved two completed reviews for these exact homepage bytes only.
// This is not a general alternative admission policy for future candidates.
export const homepageCorrectionId = 'homepage-corrections-20260905-two-reviewer';
export const homepageCorrectionPacket = 'operations/product-stewards/town-entry-homepage/candidates/homepage-corrections-20260905/';
const htmlSha = '5629cada90e5ccd3b58c71c897bff0dacf4c48c60c88f74c35932b4c11f21303';
const jsSha = '05232f254fd17c4e031b068f62e9cf839312d6fcff1c9b714932181798c4bf47';

export function inspectHomepageCorrection(item, root) {
  const errors = [];
  const assert = (value, message) => { if (!value) errors.push(message); };
  const bytes = p => {
    const target = path.resolve(root, p);
    if (!target.startsWith(path.resolve(root) + path.sep)) throw new Error('evidence outside repository');
    return fs.readFileSync(target);
  };
  const digest = p => crypto.createHash('sha256').update(bytes(p)).digest('hex');
  const json = p => JSON.parse(bytes(homepageCorrectionPacket + p));
  try {
    const a = item.design_admission;
    assert(item.id === homepageCorrectionId && item.review_type === 'building_page_visual', 'wrong scoped candidate');
    assert(a?.candidate?.path === 'index.html' && a.candidate.sha256 === htmlSha && digest('index.html') === htmlSha, 'homepage bytes differ from approved review scope');
    assert(a?.runtime?.path === 'content/site/homepage.js' && a.runtime.sha256 === jsSha && digest(a.runtime.path) === jsSha, 'runtime bytes differ from approved review scope');
    for (const binding of a?.evidence || []) assert(digest(binding.path) === binding.sha256, `stale evidence: ${binding.path}`);
    const required = ['owner-review-authorization.json', 'producer-self-review.json', 'independent-semantic-review.json', 'independent-review.md', 'claude-review-result.json', 'functional-checks.json', 'handoff-calibration.json', 'static-fallback-checks.json', 'visuals.json'];
    for (const file of required) assert(a.evidence?.some(b => b.path === homepageCorrectionPacket + file), `missing bound evidence: ${file}`);
    const permission = json('owner-review-authorization.json');
    assert(permission.id === homepageCorrectionId && permission.userAnswer === 'Yes' && permission.scope === 'EXACT_HOMEPAGE_PREVIEW_ONLY', 'exact owner exception is missing');
    assert(permission.candidateSha256 === htmlSha && permission.runtimeSha256 === jsSha && permission.productionReleaseApproved === false, 'exception is outside the authorized preview scope');
    assert(bytes('operations/DECISIONS.md').toString().includes('Homepage correction: two-reviewer presentation exception approved'), 'canonical decision is missing');
    const producer = json('producer-self-review.json');
    const independent = json('independent-semantic-review.json');
    errors.push(...inspectProseReviewChain(producer, independent, { root }).errors);
    assert(independent.verdict === 'PASS' && independent.reviewer?.principalId === '/root/homepage_independent_review' && independent.reviewer.artifactFirst === true, 'independent artifact-first review is missing');
    const claude = json('claude-review-result.json');
    assert(claude.session_id === 'f904ddae-d1e4-4d88-810a-5ee637cb4b24' && claude.is_error === false && claude.modelUsage?.['claude-opus-5'], 'actual Claude Opus5 review is missing');
    assert(claude.result?.includes('ADMIT_FOR_OWNER_REVIEW') && claude.result.includes(htmlSha) && claude.result.includes(jsSha), 'Claude did not admit these exact bytes');
    const checks = json('functional-checks.json').results;
    for (const width of [1440, 768, 390, 320]) {
      const c = checks.find(c => c.width === width);
      assert(c && c.overflow.body <= width && c.brokenImages.length === 0 && c.pageErrors.length === 0, `missing healthy viewport ${width}`);
    }
    const fallback = json('static-fallback-checks.json').checks;
    assert([true, false].every(js => fallback.some(c => c.javaScript === js && c.arrivalHidden && c.firstActionAvailable && c.directoryDisclosure)), 'usable fallback proof is missing');
    const visuals = json('visuals.json').artifacts;
    for (const v of visuals) assert(digest(v.path) === v.sha256 && (v.role === 'incumbent' || v.candidateSourceSha256 === htmlSha), `stale reviewed pixels: ${v.path}`);
    for (const name of ['before-mobile-hero.png', 'candidate-mobile-hero.png', 'candidate-1440-top.png', 'candidate-320-top.png']) assert(visuals.some(v => v.path.endsWith('/' + name)), `missing reviewed viewport: ${name}`);
    assert(a.production_release_approved === false, 'owner presentation does not authorize production');
  } catch (error) { errors.push(`missing or invalid scoped input: ${error.message}`); }
  return errors;
}
