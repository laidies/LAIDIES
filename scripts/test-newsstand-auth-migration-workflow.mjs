#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
const workflow=fs.readFileSync(new URL('../.github/workflows/newsstand-hosted-production.yml',import.meta.url),'utf8');
function inspect(text){
 const errors=[];
 for(const required of ['verify_codex_migration:',"inputs.verify_codex_migration != true","inputs.verify_codex_migration == true",'environment: production','scripts/test-custody-codex-auth.mjs','CODEX_AUTH_CAPSULE_B64','CODEX_AUTH_CAPSULE_METADATA_B64','scripts/custody-codex-auth.mjs restore','scripts/custody-codex-auth.mjs seal',"if: always() && steps.restore_migration.outcome == 'success'","if: always() && steps.seal_migration.outcome == 'success'",'DEDICATED_CODEX_MIGRATION_VERIFIED','if: always()\n        run: rm -rf -- "$RUNNER_TEMP/newsstand-migration"'])if(!text.includes(required))errors.push(required);
 const job=text.split('  verify-auth-migration:')[1]||'';
 if(!job || /upload-artifact[\s\S]{0,300}codex\/auth\.json/.test(job))errors.push('plaintext artifact');
 if(/echo .*CODEX_AUTH_CAPSULE|echo .*NEWSSTAND_PRIVATE_HANDOFF_KEY_B64/.test(job))errors.push('secret echo');
 if(/schedule:|cron:|pages deploy|wrangler/.test(job))errors.push('unexpected schedule or deploy');
 return errors;
}
assert.deepEqual(inspect(workflow),[]);
assert.ok(inspect(workflow.replace('scripts/custody-codex-auth.mjs seal','removed')).length);
assert.ok(inspect(workflow.replace("inputs.verify_codex_migration == true","true")).length);
console.log('PASS dedicated auth migration workflow: explicit opt-in, pinned custody, encrypted refresh, cleanup, no scheduler or deploy');
