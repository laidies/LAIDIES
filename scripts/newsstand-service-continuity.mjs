// Exact existing-publication continuity, never new prose admission.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
export const stableService = v => v === null || typeof v !== 'object' ? JSON.stringify(v) : Array.isArray(v)
  ? `[${v.map(stableService).join(',')}]` : `{${Object.keys(v).sort().map(k => `${JSON.stringify(k)}:${stableService(v[k])}`).join(',')}}`;
export const serviceHash = raw => createHash('sha256').update(raw).digest('hex');
const fail = message => { throw new Error(`SERVICE_CONTINUITY_REJECT: ${message}`); };
const HASH = /^[a-f0-9]{64}$/;
const day = timestamp => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Vancouver', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(timestamp));
export function serviceEligible(record, date) {
  return Boolean(record && record.editionDate <= date && ['APPROVED', 'PUBLISHED', 'CORRECTED'].includes(record.status) &&
    record.publicEligibility === 'ELIGIBLE' && record.freshness?.expiresAt >= date &&
    (!record.availableUntil || record.availableUntil >= date) && (!record.retiredAt || record.retiredAt.slice(0, 10) > date));
}
function readBound(root, binding) {
  if (!binding || Object.keys(binding).sort().join(',') !== 'path,sha256' || !HASH.test(binding.sha256 || '')) fail('invalid evidence binding');
  const absolute = path.resolve(root, binding.path || '');
  const evidence = path.resolve(root, 'operations/product-stewards/newsstand/evidence') + path.sep;
  if (!absolute.startsWith(evidence) || !fs.realpathSync(absolute).startsWith(evidence)) fail('evidence must be private NewsStand evidence');
  const raw = fs.readFileSync(absolute, 'utf8');
  if (serviceHash(raw) !== binding.sha256) fail('evidence checksum mismatch');
  return raw;
}
// The proof freezes all three public authorities, not a hand-picked service list.
// Verification observations are integrity evidence; independent issue admission
// must inspect their provenance. A file or hash is not editorial approval.
export function loadServicePredecessor(binding, { root, date, storiesRaw, columns, reviewedAt = null }) {
  const proof = JSON.parse(readBound(root, binding));
  if (proof.schemaVersion !== 'newsstand-service-predecessor-v1' || !/^[a-z0-9]{8}-[a-z0-9-]+$/.test(proof.deploymentId || '')) fail('invalid predecessor proof');
  const manifest = JSON.parse(readBound(root, proof.manifest));
  if (manifest.schema !== 'laidies-release-artifact-manifest/v1' || !Array.isArray(manifest.files) ||
      serviceHash(manifest.files.map(f => `${f.sha256}  ${f.path}\n`).join('')) !== manifest.identitySha256) fail('manifest identity mismatch');
  const raw = {};
  for (const [key, publicPath] of Object.entries({ stories: 'content/newsstand-stories.js', issues: 'content/newsstand-daily-issues.json', columns: 'content/daily-edition-columns.json' })) {
    raw[key] = readBound(root, proof[key]);
    const entries = manifest.files.filter(f => f.path === publicPath);
    if (entries.length !== 1 || entries[0].sha256 !== serviceHash(raw[key])) fail(`manifest does not bind ${publicPath}`);
  }
  const verification = JSON.parse(readBound(root, proof.verification));
  if (verification.schemaVersion !== 'newsstand-service-predecessor-verification-v1' || verification.deploymentId !== proof.deploymentId ||
      verification.providerHeadId !== proof.deploymentId || verification.artifactIdentitySha256 !== manifest.identitySha256 ||
      !Number.isFinite(Date.parse(verification.checkedAt)) || day(verification.checkedAt) !== date ||
      (reviewedAt && (Date.parse(reviewedAt) < Date.parse(verification.checkedAt) || Date.parse(reviewedAt) - Date.parse(verification.checkedAt) > 86400000))) fail('published predecessor must be freshly verified for this editorial day');
  const expected = new Map();
  for (const origin of ['https://laidies.ai', `https://${proof.deploymentId.split('-')[0]}.laidies-sunnyvaile.pages.dev`]) {
    for (const key of ['stories', 'issues', 'columns']) expected.set(`${origin}/${({ stories: 'content/newsstand-stories.js', issues: 'content/newsstand-daily-issues.json', columns: 'content/daily-edition-columns.json' })[key]}`, serviceHash(raw[key]));
  }
  for (const observation of verification.observations || []) {
    if (!expected.has(observation.url) || observation.status !== 200 || observation.sha256 !== expected.get(observation.url)) fail('public observation mismatch');
    expected.delete(observation.url);
  }
  if (expected.size) fail('custom and immutable observations for all three authorities required');
  const context = { window: {} }; vm.runInNewContext(raw.stories, context, { timeout: 1000 });
  const dataset = context.window.NEWSSTAND_DATA;
  const publication = dataset?.publications?.daily;
  const store = JSON.parse(raw.issues);
  const matches = (store.issues || []).filter(i => i.editionDate === publication?.editionDate);
  const prior = matches[0];
  const publishedStoryIds = publication?.issue?.storyIds || [];
  const issueStoryIds = prior?.storyIds || [];
  const retainedOlderStories = publishedStoryIds.filter(id => !issueStoryIds.includes(id));
  const retainedOlderStoriesValid = retainedOlderStories.every(id => {
    const stories = (dataset?.stories || []).filter(story => story.id === id);
    const story = stories[0];
    return stories.length === 1 && story.edition === 'daily' && !/^front-paige-/.test(String(story.id || '')) &&
      ['published', 'corrected'].includes(story.status) && story.sourceApproval?.status === 'approved' &&
      day(story.publishedAt) <= prior.editionDate;
  });
  if (matches.length !== 1 || prior.status !== 'complete' || !prior.admission || !HASH.test(prior.envelopeSha256 || '') ||
      prior.editionDate >= date || publication.issue?.status !== 'complete' ||
      stableService(prior.serviceRecordIds) !== stableService(publication.issue.serviceRecordIds) ||
      !issueStoryIds.every(id => publishedStoryIds.includes(id)) || !retainedOlderStoriesValid ||
      proof.predecessorEnvelopeSha256 !== prior.envelopeSha256) fail('predecessor is not the exact published issue');
  // Idempotent projection uses its frozen source. A different local issue or
  // the unreleased service rotation is never accepted as the production base.
  if (storiesRaw !== undefined && raw.stories !== storiesRaw) fail('canonical source is not the frozen published predecessor');
  const frozen = JSON.parse(raw.columns);
  const records = [];
  for (const id of prior.serviceRecordIds) {
    const matches = frozen.records.filter(r => r.id === id);
    const record = matches[0];
    const desks = prior.desks.filter(d => d.state === 'ready' && d.recordId === id);
    if (matches.length !== 1 || desks.length !== 1 || record.type !== desks[0].type || record.headline !== desks[0].headline ||
        record.summary !== desks[0].summary || (record.destination || null) !== desks[0].destination) fail('published service snapshot mismatch');
    const current = columns.records.filter(r => r.id === id);
    if (current.length !== 1 || stableService(current[0]) !== stableService(record)) fail(`altered published service ${id}`);
    if (serviceEligible(record, date)) records.push(record);
  }
  return { prior, records, storiesRaw: raw.stories, checkedAt: verification.checkedAt };
}
export function carryIdentity(prior, record) {
  return { editionDate: prior.editionDate, envelopeSha256: prior.envelopeSha256, recordSha256: serviceHash(stableService(record)), originalEditionDate: record.editionDate };
}
export function validateServiceSelection({ desks, columns, date, predecessor = null, canonicalIssue = null, sameDateNewsAppend = false }) {
  for (const desk of desks.filter(d => d.state === 'ready')) {
    const matches = columns.records.filter(r => r.id === desk.recordId);
    const record = matches[0];
    if (matches.length !== 1 || !serviceEligible(record, date)) fail(`ineligible service ${desk.recordId}`);
    if (record.editionDate === date) {
      if (desk.carriedFrom) fail('new service cannot claim carried publication');
      const previousConceptId = predecessor?.prior.desks.find(d => d.type === 'concept_week' && d.state === 'ready')?.recordId ||
        canonicalIssue?.serviceRecordIds?.find(id => columns.records.some(r => r.id === id && r.type === 'concept_week'));
      const previousConcept = columns.records.find(r => r.id === previousConceptId);
      if (record.type === 'concept_week' && previousConcept && previousConcept.editionDate < date && previousConceptId !== record.id && new Date(date + 'T12:00:00Z').getUTCDay() !== 3) fail('Concept successor requires Wednesday cadence');
      continue;
    }
    const frozen = predecessor?.records.find(r => r.id === record.id);
    if (frozen) {
      if (stableService(desk.carriedFrom) !== stableService(carryIdentity(predecessor.prior, frozen))) fail('older service lacks exact published predecessor binding');
      continue;
    }
    // A same-date ordinary-news revision may retain the already admitted
    // service desks verbatim. This is continuity, not a new selection: the
    // promoter separately compares every desk against the exact predecessor
    // issue and admits only one appended story.
    const carried = desk.carriedFrom;
    if (!sameDateNewsAppend || !canonicalIssue?.serviceRecordIds?.includes(record.id) || !carried ||
        carried.editionDate >= date || carried.originalEditionDate !== record.editionDate ||
        serviceHash(stableService(record)) !== carried.recordSha256) fail('older service lacks exact published predecessor binding');
  }
}

export function validatePublicCarry(desk, issue, store, record) {
  if (!desk.carriedFrom) return;
  const from = desk.carriedFrom;
  const predecessors = (store.issues || []).filter(i => i.editionDate === from.editionDate && i.envelopeSha256 === from.envelopeSha256);
  const prior = predecessors[0];
  const priorDesk = prior?.desks?.find(d => d.state === 'ready' && d.type === desk.type && d.recordId === desk.recordId);
  if (predecessors.length !== 1 || prior.status !== 'complete' || !prior.admission || !prior.serviceRecordIds.includes(desk.recordId) ||
      from.editionDate >= issue.editionDate || from.originalEditionDate !== record.editionDate || record.editionDate > from.editionDate ||
      serviceHash(stableService(record)) !== from.recordSha256 || !priorDesk ||
      priorDesk.headline !== desk.headline || priorDesk.summary !== desk.summary || priorDesk.destination !== desk.destination ||
      (priorDesk.carriedFrom && priorDesk.carriedFrom.recordSha256 !== from.recordSha256)) fail('public carried service predecessor mismatch');
}
