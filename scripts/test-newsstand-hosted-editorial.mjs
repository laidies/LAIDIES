#!/usr/bin/env node
import assert from 'node:assert/strict';
import {QUALIFIED_PROTOCOL, runHostedEditorial} from './run-newsstand-hosted-editorial.mjs';

const packet = {completeArtifact: 'A complete private article contains enough text for a real review packet.', paragraphs: [{id: 'P001', text: 'A complete private article contains enough text for a real review packet.', exact: 'A complete private article contains enough text for a real review packet.'}], claims: [], sources: []};
const judgment = {reader: {private: 'review output'}, facts: {private: 'fact output'}};
let seen;
const protocol = {
  requestFor(kind, received) { assert.equal(kind, 'editorial'); assert.equal(received, packet); return {outputSchema: {type: 'object'}, messages: [{role: 'system', content: 'private rubric'}, {role: 'user', content: received.completeArtifact}]}; },
  normalize(kind, received, receivedPacket) { assert.equal(kind, 'editorial'); assert.equal(received, judgment); assert.equal(receivedPacket, packet); return {verdict: 'HOLD', private: 'normalized review'}; }
};
const provider = {is_error: false, subtype: 'success', modelUsage: {'claude-fable-5': {input_tokens: 1}}, structured_output: judgment};
const success = await runHostedEditorial({packet, protocol, protocolIdentity: QUALIFIED_PROTOCOL, execute: async input => { seen = input; return provider; }});
assert.equal(success.status, 'EDITORIAL_TRANSPORT_SUCCESS');
assert.equal(success.verdict, 'HOLD');
assert.deepEqual(seen.model, 'claude-fable-5'); assert.equal(seen.effort, 'medium');
assert.equal(success.privateResult.provider, provider);
const serialised = JSON.stringify({...success, privateResult: undefined});
assert.doesNotMatch(serialised, /private article|private rubric|review output|fact output|normalized review/);
assert.doesNotMatch(serialised, /providerRaw|structured_output/i);

assert.equal((await runHostedEditorial({packet, protocol, protocolIdentity: {...QUALIFIED_PROTOCOL, sha256: '0'.repeat(64)}, execute: async () => provider})).status, 'PROTOCOL_BINDING_MISMATCH');
assert.equal((await runHostedEditorial({packet, protocol, protocolIdentity: QUALIFIED_PROTOCOL, execute: async () => ({...provider, modelUsage: {'other-model': {}})})).status, 'MODEL_MISMATCH');
assert.equal((await runHostedEditorial({packet, protocol, protocolIdentity: QUALIFIED_PROTOCOL, execute: async () => ({...provider, subtype: 'incomplete'})})).status, 'PROVIDER_INCOMPLETE');
assert.equal((await runHostedEditorial({packet, protocol, protocolIdentity: QUALIFIED_PROTOCOL, execute: async () => ({...provider, structured_output: null})})).status, 'INVALID_PROVIDER_OUTPUT');
assert.equal((await runHostedEditorial({packet, protocol: {...protocol, normalize: () => { throw Error('bad private draft'); }}, protocolIdentity: QUALIFIED_PROTOCOL, execute: async () => provider})).status, 'NORMALIZATION_REJECTED');
assert.equal((await runHostedEditorial({packet, protocol, protocolIdentity: QUALIFIED_PROTOCOL, execute: async () => { throw Error('private draft'); }})).status, 'EXECUTION_ERROR');
console.log('HOSTED EDITORIAL PASS: exact injected protocol bound, provider/model/normalization failures reject, public summary excludes private article and review bytes.');
