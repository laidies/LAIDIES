#!/usr/bin/env node
import assert from 'node:assert/strict';
import { prepareNewsstandWeekly, weeklyPeriodFor } from './prepare-newsstand-weekly.mjs';

const stamp = date => `${date}T17:00:00Z`;
const approved = id => ({ status: 'approved', record: `newsstand:source-approval:${id}` });
function story(id, date, overrides = {}) {
  return { id, slug: id, edition: 'daily', status: 'published', publishedAt: stamp(date), updatedAt: stamp(date), lastCheckedAt: stamp(date), sourceApproval: approved(id), headline: id, heroVisual: { src: '/assets/newsstand/example.png', alt: 'An adequately described approved illustration.' }, correction: null, correctionHistory: [], retraction: null, predecessorStoryIds: [], successorStoryIds: [], ...overrides };
}
function dataset({ lastCheckedAt = stamp('2026-09-05') } = {}) {
  const weekly = { id: 'weekly-prior', slug: 'weekly-prior', edition: 'weekly', status: 'published', publishedAt: stamp('2026-08-26'), updatedAt: lastCheckedAt, lastCheckedAt, sourceApproval: approved('weekly-prior'), headline: 'Prior Weekly', heroVisual: { src: '/assets/newsstand/example.png', alt: 'An adequately described approved illustration.' }, correction: null, correctionHistory: [], retraction: null, predecessorStoryIds: [], successorStoryIds: [] };
  return {
    schemaVersion: '2.0.0', generatedAt: stamp('2026-09-05'), lastCheckedAt: stamp('2026-09-05'),
    publications: { weekly: { edition: 'weekly', status: 'current', storyId: weekly.id, editionDate: '2026-08-26', editorialTimeZone: 'America/Vancouver', publishedAt: weekly.publishedAt, updatedAt: lastCheckedAt, lastCheckedAt, maxAgeHours: 192 } },
    stories: [weekly,
      story('sep-01-outside', '2026-09-01'), story('sep-02-first', '2026-09-02'), story('sep-05-last', '2026-09-05'),
      story('sep-09-future', '2026-09-09'), story('sep-03-held', '2026-09-03', { status: 'hold' }),
      story('sep-04-unapproved', '2026-09-04', { sourceApproval: { status: 'independent-review-required', record: 'newsstand:source-approval:sep-04-unapproved' } })
    ]
  };
}
const raw = data => `window.NEWSSTAND_DATA = ${JSON.stringify(data)};`;
const continuation = '| AP | **HOLD** |\n| Anthropic | **DUPLICATE / WATCH** |\n';

assert.deepEqual(weeklyPeriodFor('2026-09-09'), { startDate: '2026-09-02', endDate: '2026-09-09' }, 'Wednesday-to-Wednesday coverage is seven days, not a calendar workweek');
assert.throws(() => weeklyPeriodFor('2026-09-08'), /Wednesday/, 'non-Wednesday Weekly dates reject');
assert.throws(() => prepareNewsstandWeekly({ storiesRaw: raw(dataset()), continuationRaw: continuation, asOf: '2026-09-XX' }), /as-of date/, 'bad dates reject');

const packet = prepareNewsstandWeekly({ storiesRaw: raw(dataset()), continuationRaw: continuation, asOf: '2026-09-05' });
assert.equal(packet.publicationDate, '2026-09-09');
assert.deepEqual(packet.period, { startDate: '2026-09-02', endDate: '2026-09-09' });
assert.equal(packet.cadence.lastDueDate, '2026-09-02');
assert.equal(packet.cadence.missedIssueDate, '2026-09-02', 'an old reporting week remains missed despite a later recheck');
assert.deepEqual(packet.candidateInputs.stories.map(item => item.id), ['sep-05-last', 'sep-02-first'], 'only published, approved, nonfuture stories in the target period are packet inputs');
assert.equal(packet.candidateInputs.editorialRankingStatus, 'EDITORIAL_SELECTION_REQUIRED');
assert.equal(packet.coverage.heldOrDuplicateLeadLines.length, 2, 'source continuation holds stay visible without becoming an editorial verdict');

const refreshed = prepareNewsstandWeekly({ storiesRaw: raw(dataset({ lastCheckedAt: stamp('2026-09-05') })), continuationRaw: continuation, asOf: '2026-09-05' });
const oldCheck = prepareNewsstandWeekly({ storiesRaw: raw(dataset({ lastCheckedAt: stamp('2026-08-26') })), continuationRaw: continuation, asOf: '2026-09-05' });
assert.deepEqual(refreshed.cadence, oldCheck.cadence, 'lastCheckedAt cannot reset the missed reporting-period assessment');

const invalidPointer = dataset(); invalidPointer.publications.weekly.editionDate = '2026-08-25';
assert.throws(() => prepareNewsstandWeekly({ storiesRaw: raw(invalidPointer), continuationRaw: continuation, asOf: '2026-09-05' }), /current Weekly publication pointer/, 'an invalid current Weekly date rejects');
const wednesday = prepareNewsstandWeekly({ storiesRaw: raw(dataset()), asOf: '2026-09-09' });
assert.equal(wednesday.publicationDate, '2026-09-09', 'Wednesday preparation must not skip the issue due today');
assert.equal(wednesday.coverage.sourceAssessmentStatus, 'MISSING_DATED_SOURCE_ASSESSMENT');
assert.equal(wednesday.coverage.continuation, null, 'missing current assessment cannot silently reuse September 5');
assert.throws(() => prepareNewsstandWeekly({ storiesRaw: raw(dataset()), asOf: '2026-08-25' }), /after the assessment/, 'future incumbent cannot count as current');
assert.throws(() => prepareNewsstandWeekly({ storiesRaw: raw(dataset()), asOf: '2026-09-05', publicationDate: '2026-08-26' }), /follow the existing/, 'cannot prepare a replacement reporting week behind the incumbent');
console.log('NEWSSTAND WEEKLY PREPARE TEST PASS period=1 missed_due=1 recheck_reset=1 boundaries=1 held_unpublished=1 ordering=1 coverage_holds=1');
