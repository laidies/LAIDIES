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
    if (a.owner_restoration === 'ORIGINAL_MASTHEAD_BUTTONS') {
      // Owner-directed reuse is checked as an exact delta. Historical reviewers
      // are not falsely recorded as having reviewed the successor HTML.
      const p = homepageCorrectionPacket + 'masthead-restoration/';
      const r = JSON.parse(bytes(p + 'restoration.json'));
      const parent = bytes(p + 'reviewed-parent.html').toString();
      const hero = bytes(p + 'incumbent-masthead.html').toString();
      assert(item.id === homepageCorrectionId && item.review_type === 'building_page_visual', 'wrong scoped candidate');
      assert(digest(p + 'reviewed-parent.html') === htmlSha && r.parentSha256 === htmlSha, 'reviewed parent differs');
      assert(digest(p + 'incumbent-masthead.html') === '2669e9932e30ae1060f47288a503433b1bf92a32012312b4fa0cf19ecabd7c0a', 'incumbent masthead differs');
      assert(r.userRuling === 'I prefer the old ones.' && r.kind === 'OWNER_REQUESTED_INCUMBENT_RESTORATION', 'owner restoration direction is missing');
      let expected = parent.replace(/    <section class="hero hero-dusk"[\s\S]*?<\/section>/, hero.trimEnd());
      for (const line of r.removedStyleLines) expected = expected.replace(line + '\n', '');
      expected = expected.replace(r.mobileStyleBefore, r.mobileStyleAfter);
      let restoredSha = 'eedeb4b4e8308e6d21a5a428db73c97079589f484461dc01e9348e2571819b47';
      if (a.owner_directory_restoration === 'VISIBLE_FOUR_CATEGORIES') {
        const d = json('category-restoration/restoration.json');
        assert(d.parentSha256 === restoredSha && d.kind === 'OWNER_REQUESTED_VISIBLE_DIRECTORY_RESTORATION', 'wrong directory restoration parent');
        expected = expected.replace('<details class="feature-directory-browse"><summary id="feature-directory-title">Looking for a particular place? Browse every game, tool and building.</summary>', d.originalHeader);
        expected = expected.replace(/(<section class="feature-directory"[\s\S]*?)      <\/details>\n/, '$1');
        for (const line of d.removedStyleLines) expected = expected.replace(line + '\n', '');
        expected = expected.replace('.makeover-notice summary:focus-visible,.feature-directory-browse summary:focus-visible{', '.makeover-notice summary:focus-visible{');
        expected = expected.replace('@media(max-width:560px){.feature-directory{margin-left:20px;margin-right:20px;padding:0 20px}.makeover-notice summary{font-size:.94rem}}', '@media(max-width:560px){.makeover-notice summary{font-size:.94rem}}');
        restoredSha = 'abbd5ec8403fe2eeee7d8a6d60592ea8ab89b73fa9a151751aac5c3d53dd619a';
        const c = json('category-restoration/checks.json');
        assert(c.status === 'PASS' && c.sourceSha256 === restoredSha, 'visible directory checks are missing or stale');
        assert(bytes('operations/DECISIONS.md').toString().includes('Homepage four-category discovery remains visible'), 'directory owner ruling is not registered');
      }
      assert(a.candidate?.path === 'index.html' && a.candidate.sha256 === restoredSha && digest('index.html') === restoredSha && bytes('index.html').toString() === expected, 'homepage bytes differ from the exact owner restoration');
      assert(a.runtime?.sha256 === jsSha && digest('content/site/homepage.js') === jsSha, 'runtime bytes differ');
      for (const b of a.evidence || []) assert(digest(b.path) === b.sha256, `stale evidence: ${b.path}`);
      assert(a.evidence?.some(b => b.path === homepageCorrectionPacket + 'claude-review-result.json'), 'missing bound evidence: claude');
      assert(a.production_release_approved === false, 'owner presentation does not authorize production');
      const checks = JSON.parse(bytes(p + 'checks.json'));
      assert(checks.status === 'PASS' && checks.sourceSha256 === 'eedeb4b4e8308e6d21a5a428db73c97079589f484461dc01e9348e2571819b47', 'restored masthead checks are missing or stale');
      assert(bytes('operations/DECISIONS.md').toString().includes('Homepage masthead: restore Ali’s preferred original buttons'), 'owner ruling is not registered');
      return errors;
    }
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
