#!/usr/bin/env node
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { reviewHostedIssue } from './review-newsstand-hosted-issue.mjs';

const sha = (value) => crypto.createHash('sha256').update(value).digest('hex');
const candidate = { story: { id: 'ordinary-news-20260926', text: 'private candidate bytes' }, candidate: { candidateId: 'ordinary-news-20260926' }, maker: 'ordinary-maker', reviewedAt: '2026-09-26T12:00:00.000Z' };
const binding = { path: 'operations/product-stewards/newsstand/candidates/ordinary/ordinary-candidate.json', sha256: 'a'.repeat(64), storyId: candidate.story.id };
const predecessor = { schemaVersion: 'daily-private-issue-v1', editionDate: '2026-09-26', mode: 'PRIVATE_DRAFT_ONLY', editorialTimeZone: 'America/Vancouver', disposition: 'SERVICE_READY', status: 'PRIVATE_REVIEW_DRAFT', storyIds: ['incumbent'], storySnapshots: [{ id: 'incumbent' }], desks: [], sourceIdentity: { storiesSha256: 'b'.repeat(64) }, canonicalWrite: false, deployActionTaken: false };
const proposed = structuredClone(predecessor); proposed.storyIds.push(candidate.story.id); proposed.storySnapshots.push(candidate.story); proposed.sourceIdentity.ordinaryCandidate = { ...binding, storyId: candidate.story.id };
const predecessorRaw = `${JSON.stringify(predecessor)}\n`, proposedRaw = `${JSON.stringify(proposed)}\n`;
const store = { schemaVersion: 'daily-issues-v1', owner: 'newsstand-daily', issues: [{ editionDate: '2026-09-26', envelopeSha256: sha(predecessorRaw) }] };
const runtime = { loadOrdinaryStoryCandidate: (actual) => { assert.deepEqual(actual, binding); return candidate; }, promoteDailyIssue: ({ envelopeRaw, decision }) => ({ changed: decision.decision === 'ACCEPT_LOCAL_CANONICAL_SUCCESSOR', issue: { envelopeSha256: sha(envelopeRaw) } }) };
const acceptedExecutor = async ({ request, model, effort }) => { assert.equal(model, 'claude-fable-5'); assert.equal(effort, 'medium'); assert.match(request.messages[1].content, /ordinary-news-20260926/); return { structured_output: { verdict: 'ACCEPT_LOCAL_CANONICAL_SUCCESSOR' } }; };
const input = { predecessorEnvelopeRaw: predecessorRaw, proposedEnvelopeRaw: proposedRaw, candidateProof: { binding, candidateId: candidate.story.id, maker: candidate.maker, reviewedAt: candidate.reviewedAt }, store, issueMaker: candidate.maker, root: '/private/runtime', reviewerIdentity: 'independent-hosted-reviewer', now: '2026-09-26T13:00:00.000Z', executor: acceptedExecutor, runtime };
const accepted = await reviewHostedIssue(input);
assert.equal(accepted.status, 'HOSTED_ISSUE_REVIEW_ACCEPTED');
assert.equal(accepted.decision.schemaVersion, 'daily-issue-news-revision-admission-v1');
assert.deepEqual(accepted.decision.addedStoryIds, [candidate.story.id]);
assert.equal(Object.keys(accepted).includes('privateResult'), false);
assert.equal((await reviewHostedIssue({ ...input, reviewerIdentity: candidate.maker })).status, 'ISSUE_REVIEW_INPUT_REJECTED');
const reordered = structuredClone(proposed); reordered.storyIds = [candidate.story.id, 'incumbent'];
assert.equal((await reviewHostedIssue({ ...input, proposedEnvelopeRaw: `${JSON.stringify(reordered)}\n` })).status, 'ISSUE_REVIEW_INPUT_REJECTED');
assert.equal((await reviewHostedIssue({ ...input, executor: async () => ({ structured_output: { verdict: 'HOLD' } }) })).status, 'ISSUE_REVIEW_HELD');
assert.equal((await reviewHostedIssue({ ...input, runtime: { ...runtime, promoteDailyIssue: () => { throw Error('stale gate'); } } })).status, 'ISSUE_REVIEW_HELD');
console.log('HOSTED ISSUE REVIEW ADAPTER PASS: exact append, distinct identities, HOLD verdict, and modern gate rejection are fail-closed. Real model not executed.');
