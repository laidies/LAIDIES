// A same-day service addition projects the already-published news source.
// The older service proof remains responsible only for carried record identity.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
export function loadServiceRevisionBase(binding, { root, date, sourceSha256 }) {
  const fail = message => { throw new Error(`SERVICE_REVISION_BASE_REJECT: ${message}`); };
  if (!binding || Object.keys(binding).sort().join(',') !== 'path,predecessorEnvelopeSha256,sha256' ||
      !/^operations\/product-stewards\/newsstand\/evidence\/[a-zA-Z0-9_./-]+\.js$/.test(binding.path || '') ||
      binding.path.split('/').includes('..') || !/^[a-f0-9]{64}$/.test(binding.predecessorEnvelopeSha256 || '') ||
      binding.sha256 !== sourceSha256) fail('invalid frozen base binding');
  const raw = fs.readFileSync(path.join(root, binding.path), 'utf8');
  if (createHash('sha256').update(raw).digest('hex') !== binding.sha256) fail('frozen base bytes changed');
  const context = { window: {} };
  vm.runInNewContext(raw, context, { timeout: 1000 });
  const data = context.window.NEWSSTAND_DATA;
  if (data?.schemaVersion !== '2.0.0' || data.datasetStatus !== 'published' ||
      data.publications?.daily?.editionDate !== date || data.publications.daily.issue?.status !== 'complete' ||
      data.publications.daily.issue.envelopeSha256 !== binding.predecessorEnvelopeSha256) fail('frozen base is not the same-day admitted predecessor');
  return { raw, data };
}
