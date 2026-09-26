import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dir = 'operations/product-stewards/newsstand/evidence/evening-20260925/source-refresh';
const inputRel = 'operations/product-stewards/newsstand/editorial-intake/coverage-progress.json';
const rawRel = `${dir}/raw-web-observations.json`;
const inventoryBaseRel = 'operations/product-stewards/newsstand/evidence/recovery-1300-20260925/source-refresh/aidb-edition-inventory-v2.json';
const inventoryRel = `${dir}/aidb-edition-inventory-v2.json`;
const selectionRel = `${dir}/aidb-selection.json`;
const outputRel = `${dir}/proposed-coverage-progress.json`;
const summaryRel = `${dir}/source-reconciliation.json`;
const cursorRel = 'operations/agents/aidb-intelligence-desk/edition-cursor.json';
const priorSep25Capture = 'operations/product-stewards/newsstand/evidence/recovery-1300-20260925/source-refresh/aidb-sep25-probe-raw.json';
const priorSep25Sha = 'cbb769925356a73776b11b71cf9619359b1d2152d149ab661a521f5d21cc2ef3';
const read = rel => fs.readFileSync(path.join(root, rel));
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const inputBytes = read(inputRel);
const rawBytes = read(rawRel);
const coverage = JSON.parse(inputBytes);
const raw = JSON.parse(rawBytes);
const observedAt = raw.observedAt;
const nextCheckAt = '2026-09-26T14:00:00Z';
const binding = { path: rawRel, sha256: sha(rawBytes) };

const inventory = JSON.parse(read(inventoryBaseRel));
const podcastAdditions = [
  {
    editionDate: '2026-09-24',
    title: 'AI Agents Are Moving Into the Real World',
    url: 'https://podcasts.apple.com/us/podcast/ai-agents-are-moving-into-the-real-world/id1680633614?i=1000791515455',
    publishedAt: '2026-09-24T19:06:00Z',
    discoveryChannel: 'podcast',
    complete: false,
    pendingReason: 'Apple supplies current episode metadata and a description only. No full audio or transcript was reviewed, and no explicit publisher identity record merges this with the website edition.',
    nextAction: 'Recover legitimate complete content and explicit cross-channel identity evidence before merging or processing.'
  },
  {
    editionDate: '2026-09-22',
    title: 'Agent Wars!',
    url: 'https://podcasts.apple.com/us/podcast/agent-wars/id1680633614?i=1000791160415',
    publishedAt: '2026-09-22T19:07:00Z',
    discoveryChannel: 'podcast',
    complete: false,
    pendingReason: 'Apple supplies current episode metadata and a description only. No full audio or transcript was reviewed, and no explicit publisher identity record merges this with the website edition.',
    nextAction: 'Recover legitimate complete content and explicit cross-channel identity evidence before merging or processing.'
  }
];
for (const item of podcastAdditions) {
  if (!inventory.editions.some(existing => existing.url === item.url)) inventory.editions.push(item);
}
inventory.editions.sort((a, b) => (b.publishedAt || `${b.editionDate}T00:00:00Z`).localeCompare(a.publishedAt || `${a.editionDate}T00:00:00Z`));
inventory.checkedAt = observedAt;
inventory.provenance = {
  predecessor: { path: inventoryBaseRel, sha256: sha(read(inventoryBaseRel)) },
  currentObservation: binding,
  note: 'Evening successor enumerates the current six-item Apple window, adding distinct Sep24 and Sep22 podcast identities. It retains incomplete website and podcast records separately and does not merge on date/title.'
};
const appleReleaseUrls = [
  'https://podcasts.apple.com/us/podcast/how-people-are-actually-using-jev/id1680633614?i=1000791661738',
  'https://podcasts.apple.com/us/podcast/ai-agents-are-moving-into-the-real-world/id1680633614?i=1000791515455',
  'https://podcasts.apple.com/us/podcast/opus-5-5-vs-gpt-6-sol-and-luna/id1680633614?i=1000791349868',
  'https://podcasts.apple.com/us/podcast/agent-wars/id1680633614?i=1000791160415',
  'https://podcasts.apple.com/us/podcast/the-state-of-the-ai-debate/id1680633614?i=1000790996696',
  'https://podcasts.apple.com/us/podcast/7-ways-how-we-use-ai-is-changing/id1680633614?i=1000790785321'
];
for (const channel of inventory.channelChecks) {
  if (channel.channel === 'website') {
    channel.checkedAt = observedAt;
    channel.status = 'CHECKED';
    channel.note = 'Current agent.json generated 2026-09-26T03:01:36.479Z and still ends at the Sep24 website edition. Metadata is not full content.';
  } else if (channel.channel === 'podcast') {
    channel.checkedAt = observedAt;
    channel.status = 'PARTIAL';
    channel.releaseUrls = appleReleaseUrls;
    channel.note = 'All six episode identities visible in the current Apple rolling window were enumerated. Descriptions are not transcripts; no audio-comprehension claim is made.';
  } else if (channel.channel === 'newsletter') {
    channel.status = 'UNAVAILABLE';
    channel.note = `${channel.reason || channel.note || ''} A mistaken evening open timed out and is recorded in the raw receipt, but does not renew the original nonretryable observation.`.trim();
  }
}
const inventoryBytes = Buffer.from(`${JSON.stringify(inventory, null, 2)}\n`);
fs.writeFileSync(path.join(root, inventoryRel), inventoryBytes);
const { selectAidbEdition } = await import(pathToFileURL(path.join(root, 'scripts/select-aidb-edition.mjs')).href);
const selection = selectAidbEdition(inventory, JSON.parse(read(cursorRel)), '2026-09-25');
const selectionBytes = Buffer.from(`${JSON.stringify(selection, null, 2)}\n`);
fs.writeFileSync(path.join(root, selectionRel), selectionBytes);

const observationsByUrl = new Map(raw.sourceObservations.map(row => [row.url, row]));
for (const check of coverage.sourceChecks) {
  const observation = observationsByUrl.get(check.url);
  if (!observation) continue;
  check.previousObservation = { checkedAt: check.checkedAt, status: check.status, assessment: check.assessment, capture: check.capture ?? null };
  check.checkedAt = observedAt;
  check.status = 'CHECKED';
  check.assessment = observation.assessment;
  check.capture = binding;
  check.timestampMeaning = 'Actual Sep25 evening Vancouver index inspection; not timestamp-only renewal.';
  check.nextCheckAt = nextCheckAt;
}
const updateCheck = (url, status, assessment, extra = {}) => {
  let check = coverage.sourceChecks.find(row => row.url === url);
  if (!check) {
    check = { url, role: 'AIDB_SOURCE_RECOVERY' };
    coverage.sourceChecks.push(check);
  } else {
    check.previousObservation = { checkedAt: check.checkedAt, status: check.status, assessment: check.assessment, capture: check.capture ?? null };
  }
  Object.assign(check, { checkedAt: observedAt, status, assessment, capture: binding, nextCheckAt, ...extra });
};
updateCheck('https://aidailybrief.ai/agent.json', 'CHECKED', 'Current index generated 2026-09-26T03:01:36.479Z; newest website edition remains Sep24. Identity metadata is not full edition content.', { timestampMeaning: 'Actual Sep25 evening Vancouver metadata inspection.' });
updateCheck('https://podcasts.apple.com/us/podcast/the-ai-daily-brief-artificial-intelligence-news/id1680633614', 'BLOCKED', 'Current Apple page enumerates six Sep20-Sep25 episode identities, including previously missing distinct Sep24 and Sep22 podcast URLs. No full transcript or audio review was performed.', { timestampMeaning: 'Actual Sep25 evening Vancouver episode enumeration; BLOCKED denotes incomplete content, not access failure.', missingInput: 'Full legitimate episode content and explicit cross-channel identity evidence.', nextRecoveryStep: 'Recover complete publisher content without inferring it from Apple descriptions.' });

for (const url of ['https://aidailybrief.ai/e/2026-09-25','https://aidailybrief.ai/e/2026-09-25.md','https://aidailybrief.ai/e/2026-09-25/transcript.md']) {
  if (coverage.sourceChecks.some(row => row.url === url)) continue;
  coverage.sourceChecks.push({
    url,
    role: 'AIDB_SOURCE_RECOVERY',
    checkedAt: '2026-09-25T20:11:45Z',
    status: 'BLOCKED',
    assessment: 'One normal same-day expected-route probe returned tool inaccessibility; no edition or transcript content was recovered. The evening pass did not repeat this recent exact failure.',
    capture: { path: priorSep25Capture, sha256: priorSep25Sha },
    timestampMeaning: 'Actual prior same-day probe retained; not an evening timestamp renewal.',
    missingInput: 'Accessible complete Sep25 edition or transcript.',
    nextCheckAt,
    nextRecoveryStep: 'Retry once when due unless the route becomes NONRETRYABLE; do not infer content from Apple metadata.'
  });
}

const enzyme = coverage.leads.find(row => row.id === 'anthropic-claude-enzyme-system-20260923');
if (!enzyme) throw new Error('missing expected enzyme-system lead');
if (!enzyme.sourceUrls.includes('https://www.nature.com/articles/d41586-026-03039-6')) enzyme.sourceUrls.push('https://www.nature.com/articles/d41586-026-03039-6');
enzyme.reviewedAt = observedAt;
enzyme.sourceReview = rawRel;
enzyme.attemptedRecovery = 'Current Nature index supplied independent Sep25 framing and says roughly 950 agents searched for more than 21 hours. One article click redirected to a tool-classified nonretryable login route; it was not retried. The official Anthropic original remains explicit that ART function is unknown, human scientists performed all lab work, and experiments continue.';
enzyme.missingInput = 'Accessible full independent Nature report or another full independent assessment, plus technical report/preprint inspection and a concrete ordinary-reader payoff.';
enzyme.nextCheckAt = nextCheckAt;
enzyme.nextAction = 'Use a genuinely distinct legitimate route to inspect the technical report and independent limitations. Do not retry the Nature redirect or infer clinical/gene-editing applicability.';

coverage.checkedAt = observedAt;
coverage.asOf = '2026-09-25';
coverage.nextReviewAt = nextCheckAt;
coverage.researchCompletionCertified = false;
coverage.reviewScope = 'Bounded Sep25 evening six-desk index sweep and three-channel AIDB inventory; not exhaustive research.';
coverage.aidbSelection = { ...selection, checkedAt: observedAt, inventory: { path: inventoryRel, sha256: sha(inventoryBytes) }, selectionReceipt: { path: selectionRel, sha256: sha(selectionBytes) }, fullContentReviewed: false };
const outputBytes = Buffer.from(`${JSON.stringify(coverage, null, 2)}\n`);
fs.writeFileSync(path.join(root, outputRel), outputBytes);
const summary = {
  schemaVersion: 'newsstand-coverage-successor-proposal-v1',
  proposalOnly: true,
  observedAt,
  editor: '/root/california_order_producer',
  predecessor: { path: inputRel, sha256: sha(inputBytes) },
  evidence: binding,
  aidbInventory: { path: inventoryRel, sha256: sha(inventoryBytes) },
  aidbSelection: { path: selectionRel, sha256: sha(selectionBytes) },
  successor: { path: outputRel, sha256: sha(outputBytes) },
  sourceChecksUpdated: [...observationsByUrl.keys(), 'https://aidailybrief.ai/agent.json', 'https://podcasts.apple.com/us/podcast/the-ai-daily-brief-artificial-intelligence-news/id1680633614'],
  sourceChecksAddedFromPriorSameDayProbe: ['https://aidailybrief.ai/e/2026-09-25','https://aidailybrief.ai/e/2026-09-25.md','https://aidailybrief.ai/e/2026-09-25/transcript.md'],
  canonicalNonretryableRowsChanged: false,
  newsletterOriginalFailureReplaced: false,
  leadResults: raw.leadDispositions,
  aidbResult: selection.status,
  fullTranscriptReviewed: false,
  canonicalWrites: 0,
  publicWrites: 0,
  completeness: raw.completeness
};
fs.writeFileSync(path.join(root, summaryRel), `${JSON.stringify(summary, null, 2)}\n`);
