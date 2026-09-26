import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const inputRel = 'operations/product-stewards/newsstand/editorial-intake/coverage-progress.json';
const evidenceRel = 'operations/product-stewards/newsstand/evidence/recovery-1300-20260925/source-refresh/raw-source-observations.json';
const outputRel = 'operations/product-stewards/newsstand/evidence/recovery-1300-20260925/source-refresh/proposed-coverage-progress.json';
const summaryRel = 'operations/product-stewards/newsstand/evidence/recovery-1300-20260925/source-refresh/source-reconciliation.json';
const inventoryBaseRel = 'operations/product-stewards/newsstand/evidence/morning-20260925/source-recovery/aidb-edition-inventory-v3.json';
const inventoryRel = 'operations/product-stewards/newsstand/evidence/recovery-1300-20260925/source-refresh/aidb-edition-inventory-v2.json';
const selectionRel = 'operations/product-stewards/newsstand/evidence/recovery-1300-20260925/source-refresh/aidb-selection.json';
const cursorRel = 'operations/agents/aidb-intelligence-desk/edition-cursor.json';
const read = rel => fs.readFileSync(path.join(root, rel));
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const inputBytes = read(inputRel);
const evidenceBytes = read(evidenceRel);
const coverage = JSON.parse(inputBytes);
const evidence = JSON.parse(evidenceBytes);
const observedAt = evidence.observedAt;
const nextCheckAt = '2026-09-25T23:00:00Z';
const evidenceBinding = { path: evidenceRel, sha256: sha(evidenceBytes) };

const inventory = JSON.parse(read(inventoryBaseRel));
const sep25Url = 'https://podcasts.apple.com/us/podcast/how-people-are-actually-using-jev/id1680633614?i=1000791661738';
if (!inventory.editions.some(item => item.url === sep25Url)) inventory.editions.unshift({
  editionDate: '2026-09-25',
  title: 'How People Are Actually Using Jev',
  url: sep25Url,
  publishedAt: '2026-09-25T18:07:00Z',
  discoveryChannel: 'podcast',
  complete: false,
  pendingReason: 'Apple supplies current episode metadata and a short description only. No full audio or transcript was reviewed, and the website index does not yet establish an edition alias.',
  nextAction: 'Recover legitimate complete publisher content and explicit cross-channel identity; do not infer a transcript or merge it with a website edition from title/date alone.'
});
const sep24 = inventory.editions.find(item => item.url === 'https://aidailybrief.ai/e/2026-09-24');
if (sep24) sep24.attemptedContentUrls = [
  'https://aidailybrief.ai/e/2026-09-24.md',
  'https://aidailybrief.ai/e/2026-09-24.json',
  'https://aidailybrief.ai/e/2026-09-24/transcript.md'
];
const sep23 = inventory.editions.find(item => item.url === 'https://aidailybrief.ai/e/2026-09-23');
if (sep23) sep23.attemptedContentUrls = [
  'https://aidailybrief.ai/e/2026-09-23',
  'https://aidailybrief.ai/e/2026-09-23.md',
  'https://aidailybrief.ai/e/2026-09-23/transcript.md'
];
inventory.checkedAt = observedAt;
inventory.provenance = {
  predecessor: { path: inventoryBaseRel, sha256: sha(read(inventoryBaseRel)) },
  currentObservation: evidenceBinding,
  note: 'Successor adds the separately observed September 25 Apple episode and retains all prior incomplete editions and channel limitations.'
};
for (const channel of inventory.channelChecks) {
  if (channel.channel === 'website') {
    channel.checkedAt = observedAt;
    channel.status = 'CHECKED';
    channel.note = 'Current agent.json generated 2026-09-25T19:54:32.178Z; newest website edition remains September 24. Metadata is not complete content.';
  }
  if (channel.channel === 'podcast') {
    channel.checkedAt = observedAt;
    channel.status = 'PARTIAL';
    channel.releaseUrls = [sep25Url, ...channel.releaseUrls.filter(url => url !== sep25Url)];
    channel.note = 'Current Apple page exposed a September 25 episode plus recent episode metadata. No full transcript or audio review was performed.';
  }
}
const inventoryBytes = Buffer.from(`${JSON.stringify(inventory, null, 2)}\n`);
fs.writeFileSync(path.join(root, inventoryRel), inventoryBytes);
const { selectAidbEdition } = await import(pathToFileURL(path.join(root, 'scripts/select-aidb-edition.mjs')).href);
const selection = selectAidbEdition(inventory, JSON.parse(read(cursorRel)), '2026-09-25');
const selectionBytes = Buffer.from(`${JSON.stringify(selection, null, 2)}\n`);
fs.writeFileSync(path.join(root, selectionRel), selectionBytes);

const assessmentByUrl = new Map(evidence.sourceObservations.map(x => [x.url, x]));
for (const check of coverage.sourceChecks) {
  const observation = assessmentByUrl.get(check.url);
  if (!observation) continue;
  check.previousObservation = {
    checkedAt: check.checkedAt,
    status: check.status,
    assessment: check.assessment,
    capture: check.capture ?? null
  };
  check.checkedAt = observedAt;
  check.status = observation.outcome.includes('INACCESSIBLE') ? 'BLOCKED' : 'CHECKED';
  check.assessment = observation.assessment;
  check.capture = evidenceBinding;
  check.timestampMeaning = 'Actual 13:00 Vancouver source observation bound to this receipt; not timestamp-only renewal.';
  check.nextCheckAt = nextCheckAt;
}

const aidbIndex = coverage.sourceChecks.find(x => x.url === 'https://aidailybrief.ai/agent.json');
if (aidbIndex) {
  const observation = evidence.aidbObservations.find(x => x.channel === 'website-index');
  aidbIndex.previousObservation = {
    checkedAt: aidbIndex.checkedAt,
    status: aidbIndex.status,
    assessment: aidbIndex.assessment,
    capture: aidbIndex.capture ?? null
  };
  aidbIndex.checkedAt = observedAt;
  aidbIndex.status = 'CHECKED';
  aidbIndex.assessment = observation.assessment;
  aidbIndex.capture = evidenceBinding;
  aidbIndex.timestampMeaning = 'Actual 13:00 Vancouver source observation bound to this receipt; metadata only.';
  aidbIndex.nextCheckAt = nextCheckAt;
}

for (const url of [
  'https://aidailybrief.ai/e/2026-09-23',
  'https://aidailybrief.ai/e/2026-09-23.md',
  'https://aidailybrief.ai/e/2026-09-23/transcript.md'
]) {
  const check = coverage.sourceChecks.find(x => x.url === url);
  if (!check) continue;
  check.previousObservation = {
    checkedAt: check.checkedAt,
    status: check.status,
    assessment: check.assessment,
    capture: check.capture ?? null
  };
  check.checkedAt = observedAt;
  check.status = 'BLOCKED';
  check.assessment = 'Due normal recovery attempt returned tool inaccessibility; no complete September 23 edition or transcript content was recovered.';
  check.capture = evidenceBinding;
  check.timestampMeaning = 'Actual due-route recovery attempt; failure preserved as failure.';
  check.nextCheckAt = nextCheckAt;
}

const podcastUrl = 'https://podcasts.apple.com/us/podcast/the-ai-daily-brief-artificial-intelligence-news/id1680633614';
const podcast = coverage.sourceChecks.find(x => x.url === podcastUrl);
if (podcast) {
  const observation = evidence.aidbObservations.find(x => x.channel === 'podcast');
  podcast.previousObservation = {
    checkedAt: podcast.checkedAt,
    status: podcast.status,
    assessment: podcast.assessment,
    capture: podcast.capture ?? null
  };
  podcast.checkedAt = observedAt;
  podcast.status = 'BLOCKED';
  podcast.assessment = observation.assessment;
  podcast.capture = evidenceBinding;
  podcast.timestampMeaning = 'Actual 13:00 Vancouver episode-page observation; no transcript or audio-comprehension claim.';
  podcast.missingInput = 'A legitimate full episode transcript or completed audio review plus explicit cross-channel identity evidence.';
  podcast.nextRecoveryStep = 'Recover complete publisher content without inferring it from Apple metadata or the short episode description.';
  podcast.nextCheckAt = nextCheckAt;
}

const upsertLead = lead => {
  const index = coverage.leads.findIndex(x => x.id === lead.id);
  if (index >= 0) coverage.leads[index] = { ...coverage.leads[index], ...lead };
  else coverage.leads.push(lead);
};

upsertLead({
  id: 'typesafe-jev-system-one-20260915',
  reviewedAt: observedAt,
  nextCheckAt,
  attemptedRecovery: 'The September 25 Apple AIDB episode page supplies a title, date, duration and short description of six reported use-case categories. No full transcript or audio review was available, so it does not independently validate performance, speed, cost or reliability.',
  sourceReview: evidenceRel
});

for (const lead of [
  {
    id: 'anthropic-claude-code-cloud-credits-20260923',
    event: 'Reported Claude Code cloud sessions expansion and temporary Pro/Max promotional credits',
    sourceUrls: ['https://www.bleepingcomputer.com/news/artificial-intelligence/anthropic-rolls-out-up-to-250-in-free-claude-code-credits-but-only-for-cloud-sessions/'],
    status: 'EVIDENCE_BLOCKED',
    owner: '/root',
    nextAction: 'Recover an official Anthropic eligibility and offer-terms record before reporting amounts, subscriber qualification or expiry dates as provider-confirmed facts.',
    reviewedAt: observedAt,
    sourceReview: evidenceRel,
    missingInput: 'Accessible official Anthropic record confirming eligible plans, credit amounts, claim deadline, expiry and how cloud-session usage interacts with normal plan limits.',
    attemptedRecovery: 'Read the complete BleepingComputer report and followed its linked claim route once; the provider route was restricted.',
    nextCheckAt
  },
  {
    id: 'chatgpt-pro-max-unannounced-plan-20260925',
    event: 'Reported unannounced $500 ChatGPT Pro Max interface test',
    sourceUrls: ['https://www.bleepingcomputer.com/news/artificial-intelligence/openai-is-preparing-a-500-chatgpt-pro-max-plan-with-faster-codex/'],
    status: 'EVIDENCE_BLOCKED',
    owner: '/root',
    nextAction: 'Wait for an official OpenAI plan, pricing or help record; do not produce a launch story from an interface test or speculative hardware link.',
    reviewedAt: observedAt,
    sourceReview: evidenceRel,
    missingInput: 'Official availability, final price by market, included limits and confirmed feature differences. No launch date is established.',
    attemptedRecovery: 'Read the full current report and checked the current OpenAI News index, which contains no Pro Max announcement.',
    nextCheckAt
  },
  {
    id: 'nature-lab-device-agent-interoperability-20260924',
    event: 'Nature reports an AI-controlled platform coordinating disparate laboratory devices',
    sourceUrls: ['https://www.nature.com/articles/d41586-026-02990-8'],
    status: 'EVIDENCE_BLOCKED',
    owner: '/root',
    nextAction: 'Recover the named primary platform paper or project record and assess validation, device scope, human oversight and distinct ordinary-reader value.',
    reviewedAt: observedAt,
    sourceReview: evidenceRel,
    missingInput: 'Primary methods/results and platform identity; the accessible Nature lead paragraph is not enough to establish reliability or practical adoption.',
    attemptedRecovery: 'Opened the current Nature article normally; only the lead paragraph was accessible before subscription controls.',
    nextCheckAt
  },
  {
    id: 'alphafold-virus-complex-database-20260924',
    event: 'Nature reports a database adding predicted protein complexes for common viruses',
    sourceUrls: ['https://www.nature.com/articles/d41586-026-03022-1'],
    status: 'EVIDENCE_BLOCKED',
    owner: '/root',
    nextAction: 'Recover the original database and methods publication; assess coverage and experimental validation without implying clinical or pandemic-preparedness outcomes.',
    reviewedAt: observedAt,
    sourceReview: evidenceRel,
    missingInput: 'Original database/methods record, validation details and any independent assessment. Nature says predictions need experimental confirmation and identifies structural limitations.',
    attemptedRecovery: 'Followed the Nature index item once; after its click returned Internal Error, one exact-title Nature search recovered the correct article identity and publisher excerpt.',
    nextCheckAt
  }
]) upsertLead(lead);

coverage.checkedAt = observedAt;
coverage.nextReviewAt = nextCheckAt;
coverage.asOf = '2026-09-25';
coverage.researchCompletionCertified = false;
coverage.reviewScope = 'Bounded 13:00 six-desk index refresh plus due AIDB edition/transcript recovery; not exhaustive research.';
coverage.aidbSelection = {
  ...selection,
  checkedAt: observedAt,
  inventory: { path: inventoryRel, sha256: sha(inventoryBytes) },
  selectionReceipt: { path: selectionRel, sha256: sha(selectionBytes) },
  fullContentReviewed: false
};

const output = Buffer.from(`${JSON.stringify(coverage, null, 2)}\n`);
fs.writeFileSync(path.join(root, outputRel), output);
const summary = {
  schemaVersion: 'newsstand-coverage-successor-proposal-v1',
  proposalOnly: true,
  observedAt,
  editor: '/root/california_order_producer',
  predecessor: { path: inputRel, sha256: sha(inputBytes) },
  evidence: evidenceBinding,
  aidbInventory: { path: inventoryRel, sha256: sha(inventoryBytes) },
  aidbSelection: { path: selectionRel, sha256: sha(selectionBytes) },
  successor: { path: outputRel, sha256: sha(output) },
  sourceChecksUpdated: [...assessmentByUrl.keys(), 'https://aidailybrief.ai/agent.json', podcastUrl, 'https://aidailybrief.ai/e/2026-09-23', 'https://aidailybrief.ai/e/2026-09-23.md', 'https://aidailybrief.ai/e/2026-09-23/transcript.md'],
  leadResults: evidence.leadDispositions,
  addedLeadIds: [
    'anthropic-claude-code-cloud-credits-20260923',
    'chatgpt-pro-max-unannounced-plan-20260925',
    'nature-lab-device-agent-interoperability-20260924',
    'alphafold-virus-complex-database-20260924'
  ],
  updatedLeadIds: ['typesafe-jev-system-one-20260915'],
  duplicateExistingIds: ['openai-agent-australia-medicare-20260924'],
  aidbResult: selection.status,
  fullTranscriptReviewed: false,
  canonicalWrites: 0,
  publicWrites: 0,
  completeness: evidence.completeness
};
fs.writeFileSync(path.join(root, summaryRel), `${JSON.stringify(summary, null, 2)}\n`);
