import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const runner='operations/product-stewards/newsstand/review-runtime/run-pilot.mjs';
for(const value of ['0','NaN','480001','90000.5']) {
 const r=spawnSync(process.execPath,[runner,'article','claude','--provider-timeout-ms',value],{encoding:'utf8'});
 assert.equal(r.status,1);assert.match(r.stderr,/Provider timeout must/);
}
console.log('Review timeout invalid bounds rejected before a provider call.');
