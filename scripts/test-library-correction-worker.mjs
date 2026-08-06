#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import worker from '../_worker.js';

class MemoryD1 {
  constructor() { this.events = []; this.payloads = []; }
  prepare(sql) {
    const db = this;
    return {
      sql,
      values: [],
      bind(...values) { this.values = values; return this; },
      async first() {
        if (sql.includes('WHERE idempotency_key')) {
          const row = db.events.find(event => event.idempotency_key === this.values[0]);
          return row ? structuredClone(row) : null;
        }
        if (sql.includes('WHERE receipt_id')) {
          const row = db.events.find(event => event.receipt_id === this.values[0]);
          return row ? structuredClone(row) : null;
        }
        throw new Error(`unhandled first: ${sql}`);
      }
    };
  }
  async batch(statements) {
    const event = statements[0].values;
    const payload = statements[1].values;
    if (this.events.some(row => row.idempotency_key === event[2])) throw new Error('duplicate');
    this.events.push({
      correction_id: event[0], receipt_id: event[1], idempotency_key: event[2],
      request_digest: event[3], book_id: event[4], section_id: event[5], claim_id: event[6],
      source_id: event[7], content_version: event[8], category: event[9], state: 'submitted',
      record_version: 1, created_at: event[10], updated_at: event[10]
    });
    this.payloads.push({ correction_id: payload[0], finding: payload[1], evidence_url: payload[2], expires_at: payload[3] });
    return [{ success: true }, { success: true }];
  }
}

const db = new MemoryD1();
const env = { LIBRARY_CORRECTIONS_DB: db, ASSETS: { fetch: async () => new Response('STATIC') } };
const url = 'https://laidies.ai/api/library-corrections';
const submission = {
  book_id: 'concepts-101', section_id: 'book-section-token-context-window', claim_id: null,
  source_id: null, content_version: 'concepts-101-2026-08-03.1', category: 'factual-error',
  finding: 'The token explanation needs checking against its named source.', evidence_url: 'https://example.com/source'
};
async function submit(body, key = 'library-report-fixture-1', activeEnv = env) {
  return worker.fetch(new Request(url, { method: 'POST', headers: { 'content-type': 'application/json', 'idempotency-key': key }, body: JSON.stringify(body) }), activeEnv);
}

const missing = await submit(submission, 'library-report-missing', { ASSETS: env.ASSETS });
assert.equal(missing.status, 503, 'missing provider binding must fail closed');

const leaked = await submit({ ...submission, email: 'private@example.com' }, 'library-report-private');
assert.equal(leaked.status, 400, 'identity fields must be rejected');
assert.equal(db.events.length, 0, 'rejected private fields must not write');

const acceptedResponse = await submit(submission);
assert.equal(acceptedResponse.status, 201);
const accepted = await acceptedResponse.json();
assert.equal(accepted.status, 'accepted');
assert.equal(accepted.state, 'submitted');
assert.match(accepted.receipt_id, /^lr_/);
assert.match(accepted.status_reference, /^\/api\/library-corrections\/status\?receipt=/);
assert.equal(JSON.stringify(accepted).includes(submission.finding), false, 'receipt must exclude reporter text');
assert.equal(db.events[0].section_id, 'book-section-token-context-window', 'exact section must reach the immutable event');
assert.equal(db.payloads[0].finding, submission.finding, 'report text must reach only the expiring payload vault');

const replay = await (await submit(submission)).json();
assert.equal(replay.receipt_id, accepted.receipt_id, 'same request/key must replay one receipt');
assert.equal(db.events.length, 1, 'idempotent replay must not duplicate the event');

const conflict = await submit({ ...submission, finding: 'Changed body' });
assert.equal(conflict.status, 409, 'same key with changed body must conflict');

const statusResponse = await worker.fetch(new Request(`https://laidies.ai${accepted.status_reference}`), env);
assert.equal(statusResponse.status, 200);
const status = await statusResponse.json();
assert.deepEqual(Object.keys(status).sort(), ['created_at','receipt_id','state','status','updated_at']);
assert.equal(status.state, 'submitted');

const source = fs.readFileSync(path.resolve(import.meta.dirname, '..', 'library.html'), 'utf8');
assert.match(source, /section_id:scope==='section'\?activeReaderSectionId:null/, 'reader must bind exact selected section');
assert.match(source, /Nothing was lost here; try again/, 'failure must preserve the report and expose retry');
assert.match(source, /No account is required/, 'correction path must not require identity');
assert.doesNotMatch(source, /correction[^\n]{0,120}(email|required account)/i, 'correction UI must not collect identity');

const migration = fs.readFileSync(path.resolve(import.meta.dirname, '..', 'migrations/library-corrections/0001_library_corrections.sql'), 'utf8');
assert.match(migration, /library_correction_events/);
assert.match(migration, /library_correction_payload_vault/);
assert.match(migration, /expires_at/);
assert.match(migration, /append-only/);

console.log('LIBRARY CORRECTION WORKER PASS submit=1 exact_section=1 private_fields_denied=1 receipt_safe=1 replay=1 conflict=1 status=1 unavailable_retry=1');
