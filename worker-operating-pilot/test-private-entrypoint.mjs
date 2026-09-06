// Exercise the real fetch export with the platform's third ExecutionContext
// argument. Workflow classes use host stubs; their runtime has a separate test.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { SourceTextModule, SyntheticModule } from 'node:vm';
const source = await readFile(new URL('./src/index.js', import.meta.url), 'utf8');
const entry = new SourceTextModule(process.argv.includes('--known-bad') ? source.replace('fetch(request, env) { return privateFeedbackFetch(request, env); }', 'fetch: privateFeedbackFetch') : source);
await entry.link(async specifier => {
  let exports;
  if (specifier === 'cloudflare:workers') exports = { WorkflowEntrypoint: class {} };
  else if (specifier === 'cloudflare:workflows') exports = { NonRetryableError: Error };
  else if (specifier === './founder-workflow.js') exports = { FounderDecisionPilot: class {} };
  else exports = await import(new URL(`src/${specifier}`, import.meta.url));
  return new SyntheticModule(Object.keys(exports), function () { for (const [name, value] of Object.entries(exports)) this.setExport(name, value); });
});
await entry.evaluate();
const originalFetch = globalThis.fetch;
let providerCalls = 0;
try {
  globalThis.fetch = async () => { providerCalls++; return Response.json([]); };
  const env = { PRIVATE_FEEDBACK_ENABLED: 'true', PRIVATE_FEEDBACK_OWNER_TOKEN: 'a'.repeat(64), PRIVATE_FEEDBACK_DB_CAPABILITY: 'b'.repeat(64), PRIVATE_FEEDBACK_ANON_KEY: 'public-key', PRIVATE_FEEDBACK_SUPABASE_URL: 'https://database.example' };
  const request = new Request('https://private.example/private-feedback/api/list', { method: 'POST', headers: { Origin: 'https://private.example', Authorization: `Bearer ${env.PRIVATE_FEEDBACK_OWNER_TOKEN}`, 'Content-Type': 'application/json' }, body: '{}' });
  const response = await entry.namespace.default.fetch(request, env, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), []);
  assert.equal(providerCalls, 1);
  console.log('PRIVATE ENTRYPOINT PASS real_fetch_export_execution_context=1 provider_called=1');
} finally { globalThis.fetch = originalFetch; }

if (!process.argv.includes('--known-bad')) {
  const bad = spawnSync(process.execPath, ['--experimental-vm-modules', fileURLToPath(import.meta.url), '--known-bad'], { encoding: 'utf8' });
  assert.equal(bad.status, 1);
  assert.match(bad.stderr, /503 !== 200/);
  console.log('CALIBRATION PASS previous deployed adapter rejected');
}
