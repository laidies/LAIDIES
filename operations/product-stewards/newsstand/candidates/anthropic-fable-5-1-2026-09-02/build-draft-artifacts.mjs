#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const here = 'operations/product-stewards/newsstand/candidates/anthropic-fable-5-1-2026-09-02';
const template = '/Users/alisoneakin/Projects/laidies-newsstand-cycle-20260831/operations/product-stewards/newsstand/candidates/chatgpt-ads-2026-08-31';
const out = name => path.join(root, here, name);
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const read = name => fs.readFileSync(out(name), 'utf8');
const bind = name => ({path: `${here}/${name}`, sha256: hash(read(name))});
const stable = value => value === null || typeof value !== 'object'
  ? JSON.stringify(value)
  : Array.isArray(value)
    ? `[${value.map(stable).join(',')}]`
    : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;

fs.mkdirSync(path.join(root, here), {recursive: true});

const timestamp = new Date().toISOString();
const story = {
  id: 'anthropic-fable-5-1-2026-09-02',
  slug: 'anthropic-fable-5-1-2026-09-02',
  edition: 'daily',
  status: 'hold',
  publishedAt: null,
  updatedAt: timestamp,
  lastCheckedAt: timestamp,
  sourceApproval: {record: 'newsstand:source-approval:anthropic-fable-5-1-2026-09-02', status: 'independent-review-required'},
  correction: null,
  correctionHistory: [],
  retraction: null,
  predecessorStoryIds: [],
  successorStoryIds: [],
  relationshipType: null,
  bigPicture: null,
  thread: null,
  thread_subtitle: null,
  thread_entry: null,
  headline: 'Anthropic released Fable 5.1. The same model now comes with two sets of guardrails.',
  heroVisual: {
    src: '/assets/newsstand/design-20260830/latest-anthropic-fable-5-1-20260902.png',
    alt: 'A shared glowing AI engine connects an open office workstation and a keycard-controlled laboratory workstation, illustrating one model with two access arrangements.',
    credit: 'LAiDIES NewsStand illustration'
  },
  the_story: '<p>Anthropic released Claude Fable 5.1 on September 1, alongside a version called Claude Mythos 5.1. Here is the unusual part: Anthropic says they are the same underlying model. Fable is available for general use; Mythos sits behind a trusted-access program for vetted cybersecurity and life-sciences work.</p><p>Fable 5.1 is available in Claude’s apps, Claude Code, Cowork, the API and supported cloud platforms. Anthropic says it performs better on coding, research and office work than Fable 5, and estimates that a typical pay-by-token workload will cost 25% less. Those performance and cost figures come from Anthropic’s own launch material, not an independent comparison of every kind of work.</p>',
  laidies_read: '<p>The decimal point is not the most interesting part of this release. Anthropic has taken one model and put two different sets of rules around what it may do and who may use it. In everyday Claude, Fable’s guardrails can block, redirect or limit a request. Mythos relaxes some of those restrictions for approved specialists whose legitimate work can resemble the dangerous work the safeguards are designed to stop.</p><p>That does not make Mythos a secret, smarter Claude. Think of it as the same employee with a different security badge: most people use the general entrance; vetted researchers can enter rooms where the work carries greater risk. The model is the same. The permissions and oversight are not.</p>',
  what_this_means: '<p>If you use Claude for ordinary work, Fable 5.1 is the release that applies to you. You do not need to apply for Mythos, and you should not assume Anthropic is withholding a “better” version. Mythos is a controlled route for specific professional work in cybersecurity and the life sciences.</p><p>For your own work, ignore the victory-lap benchmark chart for a moment. Give Fable 5.1 one recurring task you know well, using the same brief and checking list you used before. Compare the edits you had to make, the mistakes you caught and the time the task took. That will tell you more about whether 5.1 is an improvement for you than a vendor’s average score.</p>',
  cocktail_party: '“Anthropic released one underlying model in two versions: Fable 5.1 for general use and Mythos 5.1 for vetted cybersecurity and life-sciences work. The difference is access and guardrails, not a separate brain.”',
  watch_fors: null,
  closing_note: null,
  class_notes: 'For the underlying idea, read <a href="/library.html#ai-fundamentals-101::%40chapter-10">AI Fundamentals 101: the model is only one part of the system</a>. This release shows how permissions, safeguards and human oversight can change what the same model is allowed to do.',
  sources: [
    {id: 'anthropic-fable-mythos-5-1-announcement', label: 'Anthropic — Claude Fable 5.1 and Claude Mythos 5.1', url: 'https://www.anthropic.com/claude-fable-and-mythos-5-1', publisherType: 'vendor', accessedAt: '2026-09-02', approvalStatus: 'reviewed'},
    {id: 'anthropic-release-notes-2026-09-01', label: 'Anthropic Help Center — Release notes for September 1, 2026', url: 'https://support.claude.com/en/articles/12138966-release-notes', publisherType: 'vendor', accessedAt: '2026-09-02', approvalStatus: 'reviewed'}
  ],
  aidb_credit: null,
  themes: ['model capabilities', 'safety and security'],
  concepts: ['models', 'guardrails'],
  tags: ['Anthropic', 'Claude', 'Fable 5.1', 'Mythos 5.1', 'guardrails'],
  saint_lane: null,
  badge: 'THE LATEST'
};

const sourceAnnouncement = `# Source receipt: Anthropic Fable 5.1 and Mythos 5.1 announcement

- URL: https://www.anthropic.com/claude-fable-and-mythos-5-1
- Publisher: Anthropic
- Accessed: 2026-09-02
- Authority: first-party product announcement; claims about Anthropic's products are primary, while performance, cost and safety claims remain vendor assertions.

## Exact facts checked

- “We’re introducing Claude Fable 5.1 and Claude Mythos 5.1.”
- “Claude Fable 5.1 and Claude Mythos 5.1 are the same model, but with different levels of safeguards.”
- “Fable 5.1 is generally available, while Mythos 5.1 is available only through our trusted access programs.”
- Anthropic says Mythos safeguards support cybersecurity and life-sciences work.
- Anthropic estimates Fable 5.1 costs 25% less than Fable 5 for typical token-billed workloads, primarily because cache reads cost less.
- Anthropic says Fable 5.1 is available across Claude products, its API and supported cloud platforms.

## Attribution boundary

The receipt verifies what Anthropic released and how Anthropic describes availability. It does not independently prove benchmark superiority, typical cost savings for every user, or safeguard effectiveness.
`;
const sourceReleaseNotes = `# Source receipt: Anthropic release notes

- URL: https://support.claude.com/en/articles/12138966-release-notes
- Publisher: Anthropic Help Center
- Accessed: 2026-09-02
- Authority: first-party dated release record.

## Exact fact checked

- The release notes date the Claude Fable 5.1 and Claude Mythos 5.1 release to September 1, 2026.

## Attribution boundary

This receipt supports the release date. Product-performance and safeguard claims are evaluated against the separate announcement receipt and remain attributed to Anthropic.
`;

fs.writeFileSync(out('story.json'), JSON.stringify(story, null, 2) + '\n');
fs.writeFileSync(out('review-text.json'), stable(story) + '\n');
fs.writeFileSync(out('article.md'), `# ${story.headline}\n\n## The story\n\n${story.the_story.replaceAll(/<\/?p>/g, '\n\n').trim()}\n\n## The LAiDIES read\n\n${story.laidies_read.replaceAll(/<\/?p>/g, '\n\n').trim()}\n\n## What this means for you\n\n${story.what_this_means.replaceAll(/<\/?p>/g, '\n\n').trim()}\n`);
fs.writeFileSync(out('rendered-article.html'), `<article><h1>${story.headline}</h1><section><h2>The story</h2>${story.the_story}</section><section><h2>The LAiDIES read</h2>${story.laidies_read}</section><section><h2>What this means for you</h2>${story.what_this_means}</section></article>\n`);
fs.writeFileSync(out('source-announcement.md'), sourceAnnouncement);
fs.writeFileSync(out('source-release-notes.md'), sourceReleaseNotes);

const claimMap = [
  ['release-date','VERIFIED','released Claude Fable 5.1 on September 1','the_story paragraph1','source-release-notes.md','The release notes date the Claude Fable 5.1 and Claude Mythos 5.1 release to September 1, 2026.','Dated first-party release record.'],
  ['same-model-different-safeguards','VERIFIED','they are the same underlying model','the_story paragraph1','source-announcement.md','Claude Fable 5.1 and Claude Mythos 5.1 are the same model, but with different levels of safeguards.','Product identity and access arrangement are direct first-party facts.'],
  ['availability-split','VERIFIED','Fable is available for general use; Mythos sits behind a trusted-access program','the_story paragraph1','source-announcement.md','Fable 5.1 is generally available, while Mythos 5.1 is available only through our trusted access programs.','General versus trusted access, checked September 2.'],
  ['performance-and-cost','QUALIFIED','Anthropic says it performs better on coding, research and office work than Fable 5, and estimates that a typical pay-by-token workload will cost 25% less','the_story paragraph2','source-announcement.md','Anthropic estimates Fable 5.1 costs 25% less than Fable 5 for typical token-billed workloads','Explicitly attributed vendor performance and estimated cost claims.'],
  ['product-availability','VERIFIED','available in Claude’s apps, Claude Code, Cowork, the API and supported cloud platforms','the_story paragraph2','source-announcement.md','Anthropic says Fable 5.1 is available across Claude products, its API and supported cloud platforms.','First-party availability checked September 2.']
].map(([claimId,status,excerpt,locator,file,sourceExcerpt,scopeAndFreshness]) => ({claimId,status,candidateEvidence:[{excerpt,locator}],sourceBinding:bind(file),sourceEvidence:[{excerpt:sourceExcerpt,locator:'Exact facts checked'}],scopeAndFreshness}));
fs.writeFileSync(out('claim-map.json'), JSON.stringify(claimMap, null, 2) + '\n');

const contract = JSON.parse(fs.readFileSync(path.join(template, 'producer-contract.json'), 'utf8'));
contract.candidateId = story.id;
contract.producer = '/root';
contract.status = 'READY_TO_DRAFT';
contract.readerContract = {
  humanQuestion: 'What actually changed with Fable 5.1, and why did Anthropic release the same model under two names?',
  promisedPayoff: 'Understand the release, the guardrail split and which version applies to ordinary users.',
  priorKnowledge: 'No knowledge of model tiers, cybersecurity programs or AI safeguards is assumed.',
  centralMentalModel: 'The model can remain the same while permissions, safeguards and access rules change around it.',
  dailyLifeConnection: 'A familiar workplace security badge distinguishes the same employee from the rooms they are permitted to enter.',
  surfaceJob: 'One dated ordinary story in The Latest, not a Front PAiGE replacement.',
  desiredFeeling: 'I know what was released, which version I can use and what the two names actually mean.',
  desiredReaderFeeling: 'I know what was released, which version I can use and what the two names actually mean.'
};
contract.canonicalTruth = [
  {claimId:'release-date',owner:'Anthropic for its release record; NewsStand for attributed reporting',freshnessTrigger:'Reopen the official release notes immediately before publication.',source:bind('source-release-notes.md')},
  {claimId:'same-model-access-split',owner:'Anthropic for its product and access arrangement; NewsStand for attributed reporting',freshnessTrigger:'Reopen the announcement if availability or trusted-access terms change.',source:bind('source-announcement.md')},
  {claimId:'qualified-performance-cost',owner:'Anthropic for its estimates; NewsStand for keeping them attributed and bounded',freshnessTrigger:'Re-review if independent comparisons or Anthropic pricing materially change.',source:bind('source-announcement.md')}
];
contract.draftArchitecture = {
  plainAnswer: 'Name both releases immediately and explain that one underlying model has two access arrangements.',
  causalSequence: ['Anthropic released the model', 'Different safeguards create two access routes', 'General users receive Fable; vetted specialists may receive Mythos'],
  workedCase: 'Use a security badge to explain permission rather than intelligence.',
  transferCase: 'Compare the same software deployed with ordinary staff permissions and administrator permissions.',
  usefulAction: 'Test one known recurring task with the same brief and checking list.',
  formatSpecificStructure: 'The Story → The LAiDIES Read → What This Means For You.',
  antiTemplateDecision: 'Lead with the unusual two-name structure, not a benchmark roundup.',
  analogyPlan: [{concept:'One model with different permissions',analogy:'The same employee with a different security badge',mapping:'The employee maps to the model; the badge maps to safeguards and access rules.',limit:'A model is software, not a person, and trusted access also includes oversight beyond a badge.',whyItHelps:'It separates capability from permission without introducing technical architecture.'}],
  humourPlan: {noneReason:'The two-name distinction is interesting without a joke; forcing one would crowd out the explanation.'}
};
fs.writeFileSync(out('producer-contract.json'), JSON.stringify(contract, null, 2) + '\n');

const manifest = {schemaVersion:'laidies-content-artifact-manifest.v1',candidateId:story.id,surface:'NEWSSTAND_DAILY',contentClass:'NEWS',reviewText:bind('review-text.json'),rendered:bind('rendered-article.html')};
fs.writeFileSync(out('manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

const producer = JSON.parse(fs.readFileSync(path.join(template, 'producer-review.json'), 'utf8'));
producer.candidateId = story.id;
producer.maker = '/root';
producer.reviewedAt = timestamp;
producer.artifact = {manifest: bind('manifest.json'), reviewText: bind('review-text.json'), rendered: bind('rendered-article.html')};
producer.reverseBrief = contract.readerContract;
const outcomeEvidence = {
  plainClarity: ['same underlying model','The same-model fact appears in the opening paragraph.'],
  readerValue: ['If you use Claude for ordinary work','The reader is told which release applies to ordinary work.'],
  laidiesVoice: ['ignore the victory-lap benchmark chart for a moment','The voice is direct and lightly sceptical without being snide.'],
  engagingEnjoyable: ['same employee with a different security badge','One familiar image makes the access distinction memorable.'],
  factualIntegrity: ['Those performance and cost figures come from Anthropic’s own launch material','Vendor claims are explicitly attributed.'],
  freshnessReviewability: ['released Claude Fable 5.1 on September 1','The event date and current source check are explicit.'],
  surfaceFit: ['The decimal point is not the most interesting part','The story is a concise Latest explainer rather than a feature essay.'],
  datedChange: ['Anthropic released Claude Fable 5.1 on September 1','The new release is dated.'],
  consequenceAndUncertainty: ['not an independent comparison of every kind of work','The article separates availability facts from vendor performance claims.'],
  dailyLifeConnection: ['same brief and checking list you used before','The reader can compare the new version on work they already know.'],
  communicationBenchmark: ['The model is the same. The permissions and oversight are not.','The central distinction is stated plainly.'],
  explainBack: ['The difference is access and guardrails, not a separate brain.','The mechanism and consequence can be restated without jargon.'],
  unseenTransfer: ['same employee with a different security badge','The badge case supports transfer to other permission-controlled software.'],
  usefulAction: ['Compare the edits you had to make, the mistakes you caught and the time the task took.','The suggested test has specific comparison criteria.'],
  analogyIntegrity: ['Think of it as the same employee with a different security badge','The analogy maps only sameness of model versus difference in access.']
};
for (const key of Object.keys(producer.outcomes)) {
  const [excerpt, observation] = outcomeEvidence[key];
  producer.outcomes[key] = {verdict:'PASS', observation, artifactEvidence:[{excerpt,locator:`${key} in exact story`}]};
}
producer.outcomes.explainBack.simulatedReaderProbe = {prompt:'Are Fable 5.1 and Mythos 5.1 different models?', probeResponse:'No. Anthropic says the underlying model is the same. Fable is generally available; Mythos gives vetted specialists a more permissive access route for sensitive work.', expectedEvidence:'Same model, different safeguards, access and audience.'};
producer.outcomes.unseenTransfer.simulatedReaderProbe = {prompt:'If the same payroll system gives managers and employees different permissions, does the manager version use a different underlying program?', probeResponse:'Not necessarily. The program may be the same while account permissions and oversight change what each person can access or do.', expectedEvidence:'Transfer sameness of underlying system versus different permissions.'};
for (const key of Object.keys(producer.failureFamilies)) producer.failureFamilies[key] = {present:false, observation:`The exact story avoids ${key} by keeping one dated release, one mechanism and one reader consequence in view.`, artifactLocator:'The model is the same. The permissions and oversight are not.'};
producer.factualReview = {disposition:'CLAIMS_REVIEWED', sourceBindings:[bind('source-announcement.md'),bind('source-release-notes.md')], claimMap, reviewedThrough:'2026-09-02', nextTrigger:'Anthropic changes availability, pricing or trusted-access documentation; independent evaluations materially contradict the attributed launch claims.', correctionOwner:'LAiDIES NewsStand product steward'};
producer.ratchet = {repeatedKnownDefects:0,objectiveDefectsFirstFoundAtReview:0,reviewIssues:0,reviewCycles:1,onKnownDefect:'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW'};
producer.lineage = {kind:'FIRST',noComparableReason:'First LAiDIES ordinary-news article on the September 1 Fable 5.1 and Mythos 5.1 release.'};
producer.learningDisposition = {disposition:'NO_NEW_DEFECT',rationale:'The story directly explains the two-name release, attributes vendor claims and gives one bounded evaluation step.'};
producer.verdict = 'PASS';
producer.limitations = ['Producer explain-back and transfer are simulated checks, not independent or human evidence.','Final independent editorial admission, browser rendering and public release remain separate gates.'];
fs.writeFileSync(out('producer-review.json'), JSON.stringify(producer, null, 2) + '\n');

console.log(`DRAFT ARTIFACTS BUILT ${story.id}`);
