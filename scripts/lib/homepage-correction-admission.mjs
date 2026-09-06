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
    if (a.owner_feedback_successor === 'MALL_BANNER_IMAGE') {
      const p = 'operations/product-stewards/town-entry-homepage/candidates/mall-thumbnail-20260906/';
      assert(item.id === homepageCorrectionId && item.review_type === 'building_page_visual', 'wrong scoped candidate');
      for (const [name,binding] of [['homepage',a.candidate],['runtime',a.runtime],['worker',a.worker],['graphic',a.graphic],['Mall image',a.mallImage]]) assert(binding && digest(binding.path) === binding.sha256, name + ' bytes differ');
      assert(a.candidate.sha256 === 'b69c4de429163a8f36baff861bbb03fa1f8044f18319c3c4dc8821bdfd67e921' && digest(p+'parent.html') === '0f044cf3411edd909653e220da382ba665b22a8621c013648ca82139f8b347a8', 'wrong Mall candidate or parent');
      assert(a.runtime.sha256 === '79b1180ad64c4256e4bc70fb1f2eb78e2e69731b1d33b0a7bf5d2fbedfa1b227' && a.worker.sha256 === '9ddfba4179ce757019a2bacf75dbc814a222410628821b17c5feaba09337e764', 'unrelated runtime changed');
      for (const binding of a.evidence || []) assert(digest(binding.path) === binding.sha256, 'stale evidence: ' + binding.path);
      for (const file of ['scope.md','parent.html','checks.json','producer-self-review.md','source-diff.patch','independent-review.md','claude-review-result.json','visuals.json','source-image.json']) assert(a.evidence?.some(b => b.path === p+file), 'missing bound evidence: ' + (file.startsWith('claude') ? 'claude' : file));
      const checks=JSON.parse(bytes(p+'checks.json'));
      assert(checks.status === 'PASS' && checks.sourceSha256 === a.candidate.sha256 && checks.oldDirectoryRejected, 'Mall checks differ');
      for (const width of [1440,390]) {
        const row=checks.rows.find(r=>r.width===width && r.kind==='candidate'),old=checks.rows.find(r=>r.width===width && r.kind==='parent');
        assert(row && old && !row.overflow && row.imageDecoded && row.image==='/assets/sunnyvaile-streets/main-street-dusk.webp' && Math.abs(row.cropOrigin[0]-925)<1 && Math.abs(row.cropOrigin[1]-100)<1 && Math.abs(row.sourceCrop[0]-300)<1 && ['text','href','height','media','allDestinations','headingColour'].every(k=>JSON.stringify(row[k])===JSON.stringify(old[k])), 'Mall fit or preservation differs');
      }
      assert(JSON.parse(bytes(p+'source-image.json')).sha256 === a.mallImage.sha256, 'source Mall image differs');
      const independent=bytes(p+'independent-review.md').toString(),claude=JSON.parse(bytes(p+'claude-review-result.json'));
      assert(independent.includes('ADMIT_FOR_OWNER_REVIEW') && independent.includes(a.candidate.sha256), 'independent Mall review differs');
      const claudeBinding=JSON.parse(bytes(p+'claude-binding-result.json'));
      assert(a.evidence?.some(b=>b.path===p+'claude-binding-result.json') && !claude.is_error && claude.modelUsage?.['claude-opus-5'] && claude.result?.includes('ADMIT_FOR_OWNER_REVIEW') && !claudeBinding.is_error && claudeBinding.session_id===claude.session_id && claudeBinding.result?.includes(a.candidate.sha256), 'actual Claude Mall review differs');
      for (const visual of JSON.parse(bytes(p+'visuals.json'))) assert(digest(visual.path)===visual.sha256,'stale visual');
      assert(a.production_release_approved === false, 'owner presentation does not authorize production');
      return errors;
    }
    if (['BANNER_BRIGHT_QUESTION_MARK','BANNER_TANGERINE_TEXT','BANNER_JEEVES_COLOUR','BANNER_GREEN_BURST','BANNER_IMAGE_BORDERS'].includes(a.owner_feedback_successor)) {
      const borders = a.owner_feedback_successor === 'BANNER_IMAGE_BORDERS';
      const burst = borders || a.owner_feedback_successor === 'BANNER_GREEN_BURST';
      const jeeves = a.owner_feedback_successor === 'BANNER_JEEVES_COLOUR';
      const warm = burst || jeeves || a.owner_feedback_successor === 'BANNER_TANGERINE_TEXT';
      const p = 'operations/product-stewards/town-entry-homepage/candidates/' + (borders ? 'banner-image-borders-20260906/' : burst ? 'banner-green-burst-20260906/' : jeeves ? 'jeeves-background-20260906/' : warm ? 'banner-tangerine-20260906/' : 'banner-graphic-20260906/');
      assert(item.id === homepageCorrectionId && item.review_type === 'building_page_visual', 'wrong scoped candidate');
      for (const [name,binding] of [['homepage',a.candidate],['runtime',a.runtime],['worker',a.worker],['graphic',a.graphic]]) assert(binding && digest(binding.path) === binding.sha256, name + ' bytes differ');
      assert(a.candidate.sha256 === (borders ? '9dfc3c62af3dcd4545a2f5438312ca44628affd2ac0cb4dd80d34a318cd12328' : burst ? '04aca83687d39fcbdfd890f7b3e4d55d1de583152b54b2a21f0665c5a3cbcc65' : jeeves ? 'c7adcb8e8d2ce9fa4c0a3d7e041c5e9829eedbfb5042e23ff1e8e66b68dc3c76' : warm ? '34166b83eea95ce8fcf146ad10e37039b1396c979f0584df8bc64477cae8f16c' : '0f044cf3411edd909653e220da382ba665b22a8621c013648ca82139f8b347a8'), 'unrelated homepage change');
      assert(digest(p+'parent.html') === (borders ? '04aca83687d39fcbdfd890f7b3e4d55d1de583152b54b2a21f0665c5a3cbcc65' : burst ? 'c7adcb8e8d2ce9fa4c0a3d7e041c5e9829eedbfb5042e23ff1e8e66b68dc3c76' : jeeves ? '34166b83eea95ce8fcf146ad10e37039b1396c979f0584df8bc64477cae8f16c' : warm ? 'b69c4de429163a8f36baff861bbb03fa1f8044f18319c3c4dc8821bdfd67e921' : 'b621c8714bfe347d1424f8355e0fcdeafeb846bb747fb25052d16667e6266ca5'), 'wrong banner parent');
      assert(a.runtime.sha256 === '79b1180ad64c4256e4bc70fb1f2eb78e2e69731b1d33b0a7bf5d2fbedfa1b227' && a.worker.sha256 === '9ddfba4179ce757019a2bacf75dbc814a222410628821b17c5feaba09337e764', 'unrelated runtime changed');
      if (burst) assert(a.burst && digest(a.burst.path) === a.burst.sha256, 'burst bytes differ');
      if (warm) assert(a.mallImage && digest(a.mallImage.path) === a.mallImage.sha256, 'Mall image bytes differ');
      for (const binding of a.evidence || []) assert(digest(binding.path) === binding.sha256, 'stale evidence: ' + binding.path);
      for (const file of ['scope.md','parent.html','checks.json','producer-self-review.md','source-diff.patch','independent-review.md','claude-review-result.json','visuals.json',...(burst && !borders ? ['burst-brief.json'] : []),...(warm ? [] : ['graphic-brief.json','asset-integrity.json','prompt.txt'])]) assert(a.evidence?.some(b => b.path === p+file), 'missing bound evidence: ' + (file.startsWith('claude') ? 'claude' : file));
      const checks=JSON.parse(bytes(p+'checks.json'));
      assert(checks.status === 'PASS' && checks.sourceSha256 === a.candidate.sha256 && checks.assetSha256 === a.graphic.sha256 && (borders ? checks.missingBorderDetected : burst ? checks.missingBurstDetected : jeeves ? checks.rejectedWhiteBackground : warm ? checks.rejectedWhiteDetected : checks.rejectedPurpleDetected), 'banner source or graphic checks differ');
      for (const width of [1440,390]) {
        const rows=checks.rows.filter(r=>r.width===width && r.kind==='candidate');
        const old=checks.rows.filter(r=>r.width===width && r.kind==='parent');
        if (borders) assert(rows.every((r,i)=>r.outlineWidth==='2px' && r.outlineStyle==='solid' && r.outlineColour===r.ctaColour && ['mediaWidth','mediaHeight','imageWidth','imageHeight'].every(k=>r[k]===old[i][k])), 'image border or crop geometry differs');
        if (burst) assert(rows.every((r,i)=>r.burstColour===r.ctaColour && r.burstMask.includes('preface-burst-v1.png') && r.burstZ==='-2' && r.burstPointerEvents==='none' && r.burstWidth===(width===390?'62px':'104px') && r.mediaBackground===old[i].mediaBackground), 'burst or preservation differs');
        if (jeeves) assert(rows.every((r,i)=>i===1 ? r.mediaBackground==='linear-gradient(135deg, rgb(255, 115, 102), rgb(242, 84, 169))' : r.mediaBackground===old[i].mediaBackground), 'Jeeves background or other media differs');
        assert(rows.length===8 && old.length===8 && rows.every((r,i)=>!r.overflow && r.colour===(warm ? 'rgb(255, 155, 61)' : 'rgb(255, 253, 251)') && r.headColour===r.colour && r.ctaColour==='rgb(183, 228, 43)' && r.stroke==='2px rgb(17, 24, 59)' && r.graphic.includes('did-you-know-question-mark-20260906.webp') && r.graphicPointerEvents==='none' && ['text','href','radio','image','height'].every(k=>r[k]===old[i][k])), 'bright banner or preservation differs');
      }
      const independent=bytes(p+'independent-review.md').toString(),claude=JSON.parse(bytes(p+'claude-review-result.json'));
      assert(independent.includes('ADMIT_FOR_OWNER_REVIEW') && independent.includes(a.candidate.sha256), 'independent graphic review differs');
      assert(!claude.is_error && claude.modelUsage?.['claude-opus-5'] && claude.result?.includes('ADMIT_FOR_OWNER_REVIEW') && claude.result.includes(a.candidate.sha256), 'actual Claude graphic review differs');
      for (const visual of JSON.parse(bytes(p+'visuals.json'))) assert(digest(visual.path)===visual.sha256,'stale visual');
      assert(a.production_release_approved === false, 'owner presentation does not authorize production');
      return errors;
    }
    if (['BANNER_COLOUR_ONLY','HEADING_BLUE_TEXT_ONLY','BANNER_ALIGNMENT_PORTRAITS'].includes(a.owner_feedback_successor)) {
      const headingOnly = a.owner_feedback_successor === 'HEADING_BLUE_TEXT_ONLY';
      const bannerPolish = a.owner_feedback_successor === 'BANNER_ALIGNMENT_PORTRAITS';
      const p = 'operations/product-stewards/town-entry-homepage/candidates/' + (bannerPolish ? 'banner-polish-20260906/' : headingOnly ? 'heading-blue-20260906/' : 'banner-colour-20260906/');
      assert(item.id === homepageCorrectionId && item.review_type === 'building_page_visual', 'wrong scoped candidate');
      for (const [name,binding] of [['homepage',a.candidate],['runtime',a.runtime],['worker',a.worker]]) assert(binding && digest(binding.path) === binding.sha256, name + ' bytes differ');
      for (const binding of a.evidence || []) assert(digest(binding.path) === binding.sha256, 'stale evidence: ' + binding.path);
      for (const file of ['scope.md','parent.html','checks.json','producer-self-review.md','source-diff.patch','independent-review.md','claude-review-result.json','visuals.json']) assert(a.evidence?.some(b => b.path === p + file), 'missing bound evidence: ' + (file.startsWith('claude') ? 'claude' : file));
      const parent = bytes(p + 'parent.html').toString();
      assert(digest(p + 'parent.html') === (bannerPolish ? '3c727e337b636a72171e5a9d73edce18c03e3393fb9a1c77e44cdfc363c54281' : headingOnly ? 'bd3531f100706c53c76d43b23e5c56568a7a80f4ab43e311a5befedf64780eb1' : '587b91d36a458f4f5d493b32ad13e20a94da610f35e4147a96c82a5f29c69b72'), 'wrong admitted colour parent');
      const original = headingOnly ? '.intent>div:first-child>h2{color:#003b9e}' : '.dyk-slim{margin:18px clamp(20px,5vw,72px);padding:14px 22px;border:3px solid var(--hp-ink);border-radius:24px;background:var(--hp-ground-warm);color:var(--hp-ink)}';
      assert(bannerPolish ? digest('index.html') === 'b621c8714bfe347d1424f8355e0fcdeafeb846bb747fb25052d16667e6266ca5' : bytes('index.html').toString() === parent.replace(original,headingOnly ? '.intent>div:first-child>h2{color:var(--hp-cobalt);-webkit-text-stroke:2px var(--hp-ink);paint-order:stroke fill}' : original.replace('background:var(--hp-ground-warm)','background:linear-gradient(135deg,var(--hp-mint),var(--hp-cyan))')), 'unrelated homepage change');
      assert(a.runtime.sha256 === '79b1180ad64c4256e4bc70fb1f2eb78e2e69731b1d33b0a7bf5d2fbedfa1b227' && a.worker.sha256 === '9ddfba4179ce757019a2bacf75dbc814a222410628821b17c5feaba09337e764', 'unrelated runtime changed');
      const checks = JSON.parse(bytes(p+'checks.json'));
      assert(checks.status === 'PASS' && checks.sourceSha256 === a.candidate.sha256, 'colour source differs');
      if (bannerPolish) {
        assert(checks.knownRaisedTextRejected && checks.minimumContrast >= 4.5, 'raised copy or contrast not proved');
        for (const width of [1440,390]) {
          const rows = checks.rows.filter(r => r.width === width && r.kind === 'candidate');
          assert(rows.length === 8 && rows.every(r => !r.overflow && r.imageDecoded && r.ctaMinHeight === '0px' && r.colour === 'rgb(59, 20, 95)' && (width === 390 || Math.abs(r.centreOffset) < 1)), 'banner fit differs');
          assert(rows[1]?.mediaBackground === 'rgb(255, 253, 251)' && rows[3]?.image === '/assets/homepage/original-restoration-20260829/ada-lovelace.png', 'updated portrait differs');
        }
      } else if (headingOnly) {
        assert(checks.knownDarkHeadingRejected, 'old heading colour not rejected');
        for (const width of [1440,390]) {
          const row = checks.rows.find(r => r.viewport === width && r.kind === 'candidate');
          const old = checks.rows.find(r => r.viewport === width && r.kind === 'parent');
          assert(row && old && row.colour === 'rgb(36, 87, 230)' && row.stroke === '2px rgb(17, 24, 59)' && row.paintOrder === 'stroke' && !row.overflow && ['text','width','height','background','banner'].every(k => row[k] === old[k]), 'heading colour or geometry differs');
        }
      } else {
        assert(checks.incumbentSameColourRejected && checks.minimumContrastWith14PercentBlackPattern >= 4.5, 'colour or contrast not proved');
        for (const width of [1440,390]) assert(checks.rows.some(r => r.width === width && r.kind === 'candidate' && r.banner !== r.below && r.slides === 8 && r.radio), 'missing colour viewport');
      }
      const independent = bytes(p+'independent-review.md').toString(), claude=JSON.parse(bytes(p+'claude-review-result.json'));
      assert(independent.includes('ADMIT_FOR_OWNER_REVIEW') && independent.includes(a.candidate.sha256), 'independent colour review differs');
      assert(!claude.is_error && claude.modelUsage?.['claude-opus-5'] && claude.result?.includes('ADMIT_FOR_OWNER_REVIEW') && claude.result.includes(headingOnly ? a.candidate.sha256 : a.candidate.sha256.slice(0,8)), 'actual Claude colour review differs');
      for (const v of JSON.parse(bytes(p+'visuals.json'))) assert(digest(v.path) === v.sha256, 'stale visual');
      assert(a.production_release_approved === false, 'owner presentation does not authorize production');
      return errors;
    }
    if (a.owner_feedback_successor === 'EXISTING_BOTTOM_RADIO_PLAYER') {
      const p = 'operations/product-stewards/town-entry-homepage/candidates/radio-bottom-player-20260906/';
      const read = file => JSON.parse(bytes(p + file));
      assert(item.id === homepageCorrectionId && item.review_type === 'building_page_visual', 'wrong scoped candidate');
      for (const [name, binding] of [['homepage', a.candidate], ['runtime', a.runtime], ['worker', a.worker]]) assert(binding && digest(binding.path) === binding.sha256, name + ' bytes differ');
      for (const binding of a.evidence || []) assert(digest(binding.path) === binding.sha256, 'stale evidence: ' + binding.path);
      for (const name of ['scope.md','manifest.json','producer-contract.json','producer-self-review.md','source-diff.patch','browser-checks.json','browser-test.mjs','calibration.json','independent-review.md','claude-review-result.json','visuals.json']) assert(a.evidence?.some(b => b.path === p + name), 'missing bound evidence: ' + (name.startsWith('claude') ? 'claude' : name));
      const manifest = read('manifest.json');
      for (const source of manifest.source) assert(digest(source.path) === source.sha256, 'manifest source differs: ' + source.path);
      assert(digest(p + 'parent.html') === '81b4f6619755e2c637fab8cc8e684026d3599ed5d03aa0522b2ee57f8d8f7edb', 'wrong radio parent');
      assert(a.worker.sha256 === '9ddfba4179ce757019a2bacf75dbc814a222410628821b17c5feaba09337e764', 'unrelated Worker changed');
      const independent = bytes(p + 'independent-review.md').toString();
      const claude = read('claude-review-result.json');
      assert(independent.includes('ADMIT_FOR_OWNER_REVIEW'), 'independent review not admitted');
      assert(!claude.is_error && claude.modelUsage?.['claude-opus-5'] && claude.result?.includes('ADMIT_FOR_OWNER_REVIEW'), 'actual Claude review not admitted');
      for (const hash of [a.candidate.sha256,a.runtime.sha256,manifest.source.find(s => s.path === 'content/site/sv-global-header.js')?.sha256]) assert(hash && independent.includes(hash) && claude.result?.includes(hash), 'review source differs');
      const checks = read('browser-checks.json');
      assert(checks.status === 'PASS' && checks.freshVisitorSilent && JSON.stringify(checks.source) === JSON.stringify(manifest.source), 'browser source or fresh visitor state differs');
      for (const width of [1440,390]) assert(checks.rows.some(c => c.width === width && c.noNewTab && c.fixedControls && c.singlePlayer && c.pauseResumeNextPrevious && c.learnPositionRetained && c.libraryControls && c.stopped && !c.errors.length), 'radio journey missing: ' + width);
      for (const route of ['/newsstand','/fun-connect','/games/dream-phone','/games/fairy-godmother','/resident-referrals','/grimoire/verification-rulebook']) assert(checks.rows.some(c => c.route === route && c.savedTrack && c.pausedRestore && c.singleFixedPlayer), 'radio receiving route missing: ' + route);
      for (const visual of read('visuals.json')) assert(digest(visual.path) === visual.sha256, 'stale visual');
      assert(read('calibration.json').incumbentRejected, 'old outgoing radio not rejected');
      const html = bytes('index.html').toString();
      assert(html.includes('<button class="dyk-slide" type="button" data-dyk-slide data-ksvl-start-live') && html.includes('<button class="homepage-radio-pill" type="button" data-ksvl-start-live'), 'radio action is not in-page player');
      assert((html.match(/data-dyk-slide/g)||[]).length === 8 && html.includes('class="intent" id="today"') && html.includes('href="/learn.html#help-now"') && html.includes('class="directory-disclosure"'), 'existing discovery changed');
      assert(bytes('operations/DECISIONS.md').toString().includes('Radio listening opens the shared bottom player'), 'owner radio scope missing');
      assert(a.production_release_approved === false, 'owner presentation does not authorize production');
      return errors;
    }
    if (['SHORTCUTS_DIRECTORY_AND_SLIM_BANNER','OWNER_EIGHT_BANNER_HIGHLIGHTS'].includes(a.owner_feedback_successor)) {
      const bannerOnly = a.owner_feedback_successor === 'OWNER_EIGHT_BANNER_HIGHLIGHTS';
      const p = 'operations/product-stewards/town-entry-homepage/candidates/' + (bannerOnly ? 'banner-highlights-20260906/' : 'shortcut-restoration-20260906/');
      const read = file => JSON.parse(bytes(p + file));
      assert(item.id === homepageCorrectionId && item.review_type === 'building_page_visual', 'wrong scoped candidate');
      for (const [name, binding] of [['homepage', a.candidate], ['runtime', a.runtime], ['worker', a.worker]]) assert(binding && digest(binding.path) === binding.sha256, name + ' bytes differ');
      for (const binding of a.evidence || []) assert(digest(binding.path) === binding.sha256, 'stale evidence: ' + binding.path);
      for (const name of ['scope.md','manifest.json','producer-contract.json','producer-self-review.md','source-diff.patch','browser-checks.json','motion-check.json','independent-review.md','claude-review-result.json','visuals.json']) assert(a.evidence?.some(b => b.path === p + name), 'missing bound evidence: ' + (name.startsWith('claude') ? 'claude' : name));
      const manifest = read('manifest.json');
      for (const source of manifest.source) assert(digest(source.path) === source.sha256, 'manifest source differs');
      assert(digest(p + 'parent.html') === (bannerOnly ? 'e44657f518fcd27810a2895080b34835b2fa60d6fb8481f4ae42ceb30f7ed977' : '58faa8ecba670e0899c14c8d3d705f83d1b7a8f7a6fb5678c9087880e773b3b6'), 'wrong restoration parent');
      assert(a.worker.sha256 === '9ddfba4179ce757019a2bacf75dbc814a222410628821b17c5feaba09337e764', 'unrelated Worker changed');
      const independent = bytes(p + 'independent-review.md').toString();
      const claude = read('claude-review-result.json');
      assert(independent.includes('ADMIT_FOR_OWNER_REVIEW'), 'independent review not admitted');
      assert(!claude.is_error && claude.modelUsage?.['claude-opus-5'] && claude.result?.includes('ADMIT_FOR_OWNER_REVIEW'), 'actual Claude review not admitted');
      for (const hash of [a.candidate.sha256,a.runtime.sha256]) assert(independent.includes(hash) && claude.result?.includes(hash), 'review source differs');
      const checks = read('browser-checks.json');
      assert(checks.status === 'PASS' && checks.sourceSha256 === a.candidate.sha256 && checks.noJavaScriptDisclosure, 'browser source or native fallback differs');
      for (const width of [1440,390]) assert(checks.checks.some(c => c.width === width && c.shortcuts === 6 && c.directLinks === 26 && c.categories === 4 && c.collapsedInitially && c.keyboardExpandCollapse && c.pillFullWidth && c.learningJourney && c.helpJourney && c.overflow <= width && !c.errors.length), 'navigation journey missing: ' + width);
      const motion = read('motion-check.json');
      assert(motion.status === 'PASS' && motion.automaticAdvance && motion.persistentPause, 'banner motion not proved');
      for (const visual of read('visuals.json')) assert(digest(visual.path) === visual.sha256, 'stale visual');
      const html = bytes('index.html').toString();
      assert(html.includes('class="intent" id="today"') && html.includes('href="/learn.html#help-now"') && html.includes('class="directory-disclosure"') && html.includes('Show the full directory') && html.includes('did-you-know dyk-slim'), 'owner navigation missing');
      assert(bytes('operations/DECISIONS.md').toString().includes('Restore existing needs shortcuts; compact directory by owner request'), 'owner scope missing');
      if (bannerOnly) {
        assert(a.runtime.sha256 === '281e247abba7e10e5594a0ad8eab17912d2403074c2e3e0a778b23c99a3e7fe5', 'unrelated runtime changed');
        assert((html.match(/data-dyk-slide/g)||[]).length === 8 && !html.includes('over 200 years'), 'owner eight highlights missing');
        const strip = text => text.replace(/    <section class="did-you-know dyk-slim"[\s\S]*?<\/section>/, '').replace(/\.dyk-slim \.dyk-copy h3\{max-width:none\}[\s\S]*?(?=<\/style>)/, '');
        assert(strip(html) === strip(bytes(p + 'parent.html').toString()), 'unrelated homepage content changed');
        assert(checks.checks.every(c => c.bannerSlides === 8 && c.stableBannerHeight), 'eight-slide fit not proved');
        assert(bytes('operations/DECISIONS.md').toString().includes('Owner supplies eight Did you know highlights'), 'banner owner scope missing');
      }
      assert(a.production_release_approved === false, 'owner presentation does not authorize production');
      return errors;
    }
    if (a.owner_feedback_successor === 'HOMEPAGE_INFORMATION_AND_INTERACTION') {
      const p = 'operations/product-stewards/town-entry-homepage/candidates/homepage-feedback-20260905/';
      const read = file => JSON.parse(bytes(p + file));
      assert(item.id === homepageCorrectionId && item.review_type === 'building_page_visual', 'wrong scoped candidate');
      for (const [name, binding] of [['homepage', a.candidate], ['runtime', a.runtime], ['worker', a.worker]]) {
        assert(binding && digest(binding.path) === binding.sha256, name + ' bytes differ');
      }
      for (const b of a.evidence || []) assert(digest(b.path) === b.sha256, 'stale evidence: ' + b.path);
      for (const file of ['producer-contract.json','producer-self-review.json','content-manifest.json','independent-review.md','claude-review-result.json','browser-checks.json','visuals.json','scope.md','source-facts.txt']) {
        assert(a.evidence?.some(b => b.path === p + file), 'missing bound evidence: ' + (file.startsWith('claude') ? 'claude' : file));
      }
      const manifest = read('content-manifest.json');
      assert(manifest.rendered.sha256 === a.candidate.sha256 && manifest.runtime.sha256 === a.runtime.sha256 && manifest.worker.sha256 === a.worker.sha256, 'reviewed manifest differs');
      const maker = read('producer-self-review.json');
      assert(maker.verdict === 'PASS' && maker.artifact.rendered.sha256 === a.candidate.sha256 && maker.artifact.manifest.sha256 === digest(p + 'content-manifest.json'), 'maker review stale');
      const independent = bytes(p + 'independent-review.md').toString();
      const claude = read('claude-review-result.json');
      assert(independent.includes('ADMIT_FOR_OWNER_REVIEW'), 'independent review not admitted');
      assert(!claude.is_error && claude.modelUsage?.['claude-opus-5'] && claude.result?.includes('ADMIT_FOR_OWNER_REVIEW'), 'actual Claude review not admitted');
      for (const hash of [a.candidate.sha256, a.runtime.sha256, a.worker.sha256]) {
        assert(independent.includes(hash) && claude.result?.includes(hash), 'independent review source identity differs');
      }
      const checks = read('browser-checks.json').checks;
      for (const width of [1440,390,320,768]) assert(checks.some(c => c.width === width && c.overflow <= width && !c.errors.length && c.episodeRollover && c.exampleDoesNotSubmit && c.retry), 'missing receiving checks: ' + width);
      const visuals = read('visuals.json');
      for (const v of visuals) assert(digest(v.path) === v.sha256, 'stale visual: ' + v.path);
      assert(visuals.some(v => v.path.includes('before-jeeves-1440')) && visuals.some(v => v.path.includes('after-jeeves-390')), 'missing incumbent/candidate comparison');
      const html = bytes('index.html').toString();
      assert(!html.includes('class="intent-grid intent-grid-5"') && html.includes('data-feature-directory'), 'narrow discovery regression');
      assert((html.match(/type="button" data-jeeves-example/g) || []).length === 3 && html.includes('id="homepage-jeeves-answer"'), 'inline question regression');
      assert(html.includes('something way better than “Have a great summer!” (brutal)') && html.includes('Ghostbuster') && html.includes('Romy and Michele') && html.includes('resident-benefits'), 'owner copy regression');
      assert(bytes('operations/DECISIONS.md').toString().includes('Owner rejects homepage information and interaction regressions'), 'owner scope missing');
      assert(a.production_release_approved === false, 'owner presentation does not authorize production');
      return errors;
    }
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
