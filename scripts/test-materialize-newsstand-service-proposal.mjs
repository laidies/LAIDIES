#!/usr/bin/env node
import assert from 'node:assert/strict';
import childProcess from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { conceptSuccessorAllowed } from './prepare-newsstand-service-bank.mjs';
import { materializeNewsstandServiceProposal } from './materialize-newsstand-service-proposal.mjs';

const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const stable = value => value === null || typeof value !== 'object' ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(',')}]` : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
const json = value => JSON.stringify(value, null, 2) + '\n';
const clone = value => JSON.parse(JSON.stringify(value));
const now = '2026-09-05T17:00:00.000Z';
const bankPath = 'fixtures/service-bank.json';
const columnsPath = 'content/daily-edition-columns.json';

const bank = {
  schemaVersion: 'newsstand-service-bank-v1',
  items: [
    { id: 'paige-02-fix-one-thing', type: 'paige_tip', status: 'APPROVED', publicEligibility: 'ELIGIBLE' },
    { id: 'held-unrelated', type: 'dear_miss_jeeves', status: 'CANDIDATE', publicEligibility: 'INELIGIBLE' }
  ]
};
const columns = {
  schemaVersion: 'newsstand-daily-columns-v1',
  records: [{ id: 'DAILY-2026-09-04-PAIGE-01', editionDate: '2026-09-04', type: 'paige_tip', bankItemId: 'paige-01', headline: 'Older row' }]
};
const entry = {
  type: 'paige_tip',
  bankItemId: 'paige-02-fix-one-thing',
  proposalState: 'READY_FOR_INDEPENDENT_ADMISSION',
  record: {
    id: 'DAILY-2026-09-05-PAIGE-TIP-PAIGE-02-FIX-ONE-THING', editionDate: '2026-09-05', type: 'paige_tip',
    bankItemId: 'paige-02-fix-one-thing', status: 'APPROVED', publicEligibility: 'ELIGIBLE', headline: 'Fix one thing'
  }
};
function proposalFor({ records = [entry], sourceBank = bank, sourceColumns = columns, editionDate = '2026-09-05' } = {}) {
  return {
    schemaVersion: 'newsstand-service-bank-proposal-v1', mode: 'PRIVATE_PROPOSAL_ONLY', editionDate,
    selection: { reuseAdmitted: false, items: { paige_tip: 'paige-02-fix-one-thing' } },
    sourceIdentity: { bankPath, bankSha256: sha256(json(sourceBank)), columnsPath, columnsSha256: sha256(json(sourceColumns)), columnsCanonicalSha256: sha256(stable(sourceColumns)) },
    records
  };
}
function materialize({ proposal = proposalFor(), activeBank = bank, activeColumns = columns, recomputeRecords = [entry], at = now } = {}) {
  return materializeNewsstandServiceProposal({
    proposalRaw: json(proposal), bankRaw: json(activeBank), columnsRaw: json(activeColumns), bankPath,
    now: at, recompute: () => ({ records: recomputeRecords }), checkColumns: () => ({ errors: [] })
  });
}

const initialRaw = json(columns);
const valid = materialize();
assert.equal(valid.changed, true, 'an exact admitted entry materializes');
assert.deepEqual(valid.addedRecordIds, [entry.record.id]);
assert.deepEqual(valid.next.records[0], columns.records[0], 'existing records retain their semantic bytes');
assert.equal(valid.next.records.length, 2);
assert.equal(bank.items[1].status, 'CANDIDATE', 'an unrelated nonapproved item does not block an admitted entry');

const rerun = materialize({ activeColumns: valid.next });
assert.equal(rerun.changed, false, 'the exact already-added proposal is idempotent');
assert.equal(rerun.idempotent, true);
assert.throws(() => materializeNewsstandServiceProposal({
  proposalRaw: json(proposalFor()), bankRaw: json(bank), columnsRaw: json(valid.next), bankPath, now,
  recompute: () => { throw new Error('stale independent receipt'); }, checkColumns: () => ({ errors: [] })
}), /stale independent receipt/, 'an idempotent replay still reruns the full bound chain');

const conflictingColumns = clone(columns);
conflictingColumns.records.push({ ...entry.record, headline: 'Changed after admission' });
assert.throws(() => materialize({ activeColumns: conflictingColumns }), /existing record conflicts/, 'conflicting duplicate IDs reject');

const second = clone(entry);
second.record.id = 'DAILY-2026-09-05-PAIGE-TIP-SECOND';
const partialProposal = proposalFor({ records: [entry, second] });
const partialColumns = clone(columns);
partialColumns.records.push(entry.record);
assert.throws(() => materialize({ proposal: partialProposal, activeColumns: partialColumns, recomputeRecords: [entry, second] }), /partially materialized/, 'partial replay rejects instead of appending a remainder');

const driftedBank = clone(bank);
driftedBank.items[0].status = 'CANDIDATE';
assert.throws(() => materialize({ activeBank: driftedBank }), /source bindings/, 'a changed bound bank rejects');
const changedReviewProposal = proposalFor({ sourceBank: driftedBank });
assert.throws(() => materialize({ proposal: changedReviewProposal, activeBank: driftedBank }), /not currently independently admitted/, 'a changed approval state rejects even with a refreshed hash');

const invented = clone(entry);
invented.record.id = 'DAILY-2026-09-05-PAIGE-TIP-INVENTED';
assert.throws(() => materialize({ proposal: proposalFor({ records: [entry, invented] }) }), /do not match the bound bank selection/, 'invented rows reject');
assert.throws(() => materialize({ proposal: proposalFor({ editionDate: '2026-09-06' }), at: now }), /future-effective/, 'future-effective proposals reject');
const noReady = clone(entry);
noReady.proposalState = 'CANDIDATE_NOT_READY';
noReady.record.status = 'CANDIDATE';
noReady.record.publicEligibility = 'INELIGIBLE';
assert.throws(() => materializeNewsstandServiceProposal({
  proposalRaw: json(proposalFor({ records: [noReady] })), bankRaw: json(bank), columnsRaw: json(columns), bankPath, now,
  recompute: () => { throw new Error('full chain still required'); }, checkColumns: () => ({ errors: [] })
}), /full chain still required/, 'a zero-ready proposal cannot skip revalidation');

assert.equal(conceptSuccessorAllowed({ type: 'concept_week' }, '2026-09-09', { records: [{ type: 'concept_week', editionDate: '2026-09-04', bankItemId: 'concept-01' }] }), true, 'a concept successor is eligible on Wednesday');
assert.equal(conceptSuccessorAllowed({ type: 'concept_week' }, '2026-09-06', { records: [{ type: 'concept_week', editionDate: '2026-09-04', bankItemId: 'concept-01' }] }), false, 'a concept successor is rejected before downstream composition off cadence');
assert.equal(conceptSuccessorAllowed({ type: 'concept_week' }, '2026-09-06', { records: [] }), true, 'the first concept is not incorrectly delayed');

const imported = childProcess.execFileSync(process.execPath, ['--input-type=module', '--eval', "import { checkDailyEditionColumns } from './scripts/check-daily-edition-columns.mjs'; process.stdout.write(typeof checkDailyEditionColumns);"], { encoding: 'utf8' });
assert.equal(imported, 'function', 'importing the validator does not execute its CLI');
const calibration = childProcess.execFileSync(process.execPath, ['scripts/check-daily-edition-columns.mjs', '--calibrate'], { encoding: 'utf8' });
assert.match(calibration, /DAILY EDITION COLUMN CALIBRATION PASS/, 'the validator retains its executable calibration CLI');
const cliFixture = fs.mkdtempSync(path.join(process.cwd(), 'scripts', '.materialize-fixture-'));
try {
  fs.writeFileSync(path.join(cliFixture, 'proposal.json'), '{"editionDate":"2026-09-06"}\n');
  for (const name of ['bank.json', 'columns.json']) fs.writeFileSync(path.join(cliFixture, name), '{}\n');
  const cli = childProcess.spawnSync(process.execPath, ['scripts/materialize-newsstand-service-proposal.mjs', '--proposal', path.relative(process.cwd(), path.join(cliFixture, 'proposal.json')), '--bank', path.relative(process.cwd(), path.join(cliFixture, 'bank.json')), '--columns', path.relative(process.cwd(), path.join(cliFixture, 'columns.json')), '--check'], { encoding: 'utf8' });
  assert.equal(cli.status, 1, 'a future proposal fails through the full CLI');
  assert.match(cli.stderr, /future-effective/, 'the full CLI resolves repository-bound fixture paths before it applies its future-date guard');
} finally { fs.rmSync(cliFixture, { recursive: true, force: true }); }

console.log('SERVICE PROPOSAL MATERIALIZE PASS exact_append=1 idempotent=1 conflicts=1 partial=1 drift=1 review_change=1 invented=1 future=1 cadence=1 validator_import=1 validator_cli=1 cli_path=1');
