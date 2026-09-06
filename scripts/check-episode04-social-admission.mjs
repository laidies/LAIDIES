// Ali's 2026-09-05 authorization is limited to this exact feature.
export const socialScope = 'try-on-episode04-social-20260905';
export const socialPacket = 'operations/product-stewards/blend-snap/candidates/tryon-ep04-2026-09-05/';
export function verifyEpisode04Social(item, {verifyBinding, read, errors}) {
 const a = item.design_admission;
 const fail = message => errors.push(`${item.id}: ${message}`);
 if(item.id !== socialScope || a?.scope !== socialScope || a?.candidate?.path !== 'try-on.html') fail('two-reviewer exception is limited to Episode04 social Try-On');
 if(a?.presentation_stage !== 'IMPLEMENTED' || a?.status !== 'READY_FOR_ALI') fail('social candidate is not ready for Ali');
 const boundRead = (name, b) => { verifyBinding(`${item.id}.${name}`, b); try {return read(b.path);} catch {fail(`${name} is unreadable`);return {};}};
 const auth = boundRead('authorization', a.authorization);
 if(a.authorization?.path !== socialPacket+'social-review-authorization.json' || auth.schema !== 'laidies.episode04-social-review-authorization.v1' || auth.scope !== socialScope || auth.authorized_by !== 'Ali' || auth.decision !== 'APPROVED' || auth.required_independent_reviewers !== 2 || auth.production_approved !== false) fail('missing bounded owner authorization; this is not production approval');
 verifyBinding(`${item.id}.candidate`, a.candidate);
 const manifest = boundRead('manifest',a.manifest);
 const carousel=a.manifest?.path===socialPacket+'v3/reviewed-manifest.json';
 const packet=carousel?socialPacket+'v3/':socialPacket;
 const required = ['try-on.html','content/try-on-social.css','content/site/try-on-social.js',...(carousel?['content/site/social-zip.js']:[])];
 const renderNames = ['social-desktop-1440.png','social-mobile-390.png','social-mobile-320.png',...(carousel?['social-post-1.png','social-post-2.png','social-post-3.png','social-story-1.png','social-story-2.png','social-story-3.png']:['social-post.png','social-story.png'])];
 for(const p of [...required,...renderNames.map(n=>packet+n)]) {
  const b=(manifest.artifacts||[]).find(x=>x.path===p);
  verifyBinding(`${item.id}.manifest.${p}`,b);
  if(!(item.review_artifacts||[]).some(x=>x.path===p&&x.sha256===b?.sha256)) fail(`presentation omits ${p}`);
 }
 if(!(manifest.artifacts||[]).some(x=>x.path===a.candidate.path&&x.sha256===a.candidate.sha256)) fail('candidate does not match reviewed manifest');
 for(const name of ['brief','homepage_reference','library_reference','source_review','browser_results','calibration']) verifyBinding(`${item.id}.${name}`,a[name]);
 const browser=boundRead('browser_results',a.browser_results);
 if(!Array.isArray(browser) || ![1440,390,320].every(width=>browser.some(x=>x.width===width&&x.postAndStory===(carousel?'downloaded three valid PNGs in both formats':'downloaded valid PNGs')&&x.privateData==='untouched'&&x.otherEpisodes==='controls and saves retained'&&x.skipLink==='focused visible social content')) || !['fontFailure','noFileSharing','shareRejection','clipboardDenied','rapidSwitch'].every(key=>browser.some(x=>x[key]))) fail('source/export/privacy/failure checks are incomplete');
 if(carousel){
  for(const name of ['producer_contract','producer_review'])verifyBinding(`${item.id}.${name}`,a[name]);
  if(![1440,390,320].every(width=>browser.some(x=>x.width===width&&x.zip==='signature, names and extracted bytes verified'&&x.sharedFileCount===3)))fail('carousel download verification is incomplete');
 }
 const calibration=boundRead('calibration',a.calibration);
 if(calibration.old_candidate_sha256!=='58cb5a7b675219071d65f4ef1e772d5685b04f86dd53a5d1a356e0561120b1f1'||calibration.guard_exit_code!==1||calibration.blind_verdict!=='REJECT') fail('known-rejected candidate prevention is missing');
 const source=boundRead('source_review',a.source_review);
 if(source.verdict!=='ACCEPT'||!source.sources?.includes('https://www.cl.cam.ac.uk/archive/ksj21/ksjdigipapers/jdoc72.pdf')) fail('primary-source review is missing');
 if(a.reviewers?.length!==2) fail('exactly two independent full-experience reviews are required');
 const principals=[];
 for(const [i,b] of (a.reviewers||[]).entries()) {
  const review=boundRead(`reviewer${i+1}`,b);principals.push(review.principal);
  if(!review.principal||review.principal==='/root'||!review.model||!['ACCEPT','ADMIT'].includes(review.verdict)||review.artifact_first!==true||review.scope!==socialScope||review.manifest_sha256!==a.manifest.sha256||!review.findings?.length||review.unresolved_issues?.length!==0) fail(`reviewer${i+1} is incomplete, held, maker-authored or stale`);
 }
 if(new Set(principals).size!==2) fail('reviewer principals must be distinct');
 if(a.preview) {
  const proof=boundRead('preview.proof',a.preview.proof);
  if(!/^https:\/\/[a-f0-9]{8}\.laidies-sunnyvaile\.pages\.dev\/try-on\?issue=4&from=blend-snap$/.test(a.preview.url)||proof.url!==a.preview.url||proof.reviewed_manifest_sha256!==a.manifest.sha256||proof.result!=='VERIFIED_PREVIEW') fail('preview identity or live verification is missing');
 }
}
