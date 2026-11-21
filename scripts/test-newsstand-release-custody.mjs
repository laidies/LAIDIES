import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {sealReleaseCustody,openReleaseCustody} from './newsstand-release-custody.mjs';
const keyB64=crypto.randomBytes(32).toString('base64'),runId='12345',now=1795296000000;
const value={accountId:'a'.repeat(32),token:'synthetic-test-only-token-12345'};
const raw=sealReleaseCustody({...value,keyB64,runId,now}),expectedSha256=crypto.createHash('sha256').update(raw).digest('hex');
const input={raw,keyB64,runId,now,expectedSha256};
assert.deepEqual(openReleaseCustody(input),value);
assert.ok(!raw.includes(value.token));assert.ok(!raw.includes(value.accountId));
assert.throws(()=>openReleaseCustody({...input,now:now+1800000}));
assert.throws(()=>openReleaseCustody({...input,now:now-1}));
assert.throws(()=>openReleaseCustody({...input,runId:'12346'}));
assert.throws(()=>openReleaseCustody({...input,keyB64:crypto.randomBytes(32).toString('base64')}));
assert.throws(()=>openReleaseCustody({...input,expectedSha256:'0'.repeat(64)}));
for(const field of ['source','destination','runId']){const x=JSON.parse(raw);x.header[field]='substituted';const altered=Buffer.from(JSON.stringify(x));assert.throws(()=>openReleaseCustody({...input,raw:altered,expectedSha256:crypto.createHash('sha256').update(altered).digest('hex')}));}
const x=JSON.parse(raw);x.body=Buffer.from('tampered').toString('base64');const altered=Buffer.from(JSON.stringify(x));assert.throws(()=>openReleaseCustody({...input,raw:altered,expectedSha256:crypto.createHash('sha256').update(altered).digest('hex')}));
assert.throws(()=>sealReleaseCustody({...value,keyB64:'bad',runId,now}));
assert.throws(()=>sealReleaseCustody({...value,token:'bad',keyB64,runId,now}));
console.log('PASS release custody: authenticated exact run/destination, expiry, key/hash/tamper rejection; fixture only');
