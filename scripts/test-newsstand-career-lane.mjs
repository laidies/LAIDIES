import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { careerLaneErrors } from './newsstand-career-lane.mjs';
import { composeDailyEnvelope } from './compose-daily-edition.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const columns = JSON.parse(fs.readFileSync(path.join(root, 'content/daily-edition-columns.json')));
const bank = JSON.parse(fs.readFileSync(path.join(root, 'operations/product-stewards/newsstand/candidates/service-bank.json')));
const bad = columns.records.find(r => r.id === 'DAILY-2026-08-30-CAREER-DELEGATION');
assert.ok(bad);
const args = { date: '2026-08-31', root,
  radarPath: path.join(root, 'operations/agents/aidb-intelligence-desk/daily/2026-08-31.md'),
  radarRaw: '2026-08-31\n- **NewsStand:** REVIEW SERVICE. Synthetic career-service composition only.',
  storiesRaw: fs.readFileSync(path.join(root, 'content/newsstand-stories.js'), 'utf8') };
function compose(record) {
  return composeDailyEnvelope({ ...args, columnsRaw: JSON.stringify({ ...columns, records: [{ ...record, editionDate: args.date }] }) });
}
assert.throws(() => compose(bad), /Corner Office rejects/);
assert.throws(() => compose({ ...bad, id: 'renamed', headline: 'A new title', body: ['Added body'] }), /Corner Office rejects/);
assert.ok(careerLaneErrors({ type: 'career_life', body: [] }, args.date).some(e => /complete/.test(e)));
assert.deepEqual(careerLaneErrors({ ...bad, type: 'paige_tip' }, args.date), []);
assert.deepEqual(careerLaneErrors(bad, '2026-08-30'), []);
// Synthetic approval ONLY to exercise composition. This never admits bank copy.
const good = { ...bank.items.find(r => r.id === 'corner-01-credit'), status: 'APPROVED', publicEligibility: 'ELIGIBLE' };
assert.deepEqual(careerLaneErrors(good, args.date), []);
assert.equal(compose(good).envelope.desks.find(d => d.type === 'career_life').headline, good.headline);
console.log('PASS: real rejected row and renamed/redated source rejected; missing body rejected; complete career candidate composes synthetically; Paige and historical replay unchanged. No content admitted.');
