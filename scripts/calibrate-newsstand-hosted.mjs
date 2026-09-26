#!/usr/bin/env node
// Full blind calibration. Inputs and detailed judgments stay runner-private.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {createHostedProtocolExecutor} from './execute-newsstand-hosted-protocol.mjs';
import {QUALIFIED_PROTOCOL} from './run-newsstand-hosted-editorial.mjs';
const sha = x => crypto.createHash('sha256').update(x).digest('hex');
const serialized = value => JSON.stringify(value,null,2)+'\n';

export async function calibrateHosted({bundle, protocol, execute, save}) {
  if (sha(bundle.protocolSource || '') !== QUALIFIED_PROTOCOL.sha256 ||
      sha(bundle.registryRaw || '') !== QUALIFIED_PROTOCOL.registrySha256) throw Error('CALIBRATION_BINDING_MISMATCH');
  const registry = JSON.parse(bundle.registryRaw);
  const positive = registry.positiveExemplars.find(x => x.useFor.includes('NEWS') && x.status !== 'SUPERSEDED_FOR_FULL_NEWS_CALIBRATION');
  const items = [...registry.negativeExemplars, positive];
  if (!positive || bundle.samples.length !== items.length || items.length < 2) throw Error('CALIBRATION_SAMPLE_MISMATCH');
  const evaluations = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i], sample = bundle.samples[i];
    if (sample.exemplarId !== item.id || sha(sample.sourceRaw) !== item.sha256) throw Error('CALIBRATION_SAMPLE_MISMATCH');
    const surface=item.appliesTo?.includes('NEWS')||item.useFor?.includes('NEWS')?'NEWS':'BOOK';
    const story=surface==='NEWS'&&item===positive?JSON.parse(sample.sourceRaw):null;
    const rebuilt=protocol.calibrationPacketFor({surface,raw:sample.sourceRaw,story,purposeAuthority:sample.packet.purposeAuthority,communicationAuthority:sample.packet.communicationAuthority});
    assert.deepEqual(sample.packet,rebuilt,'CALIBRATION_PACKET_MISMATCH');
    const request = protocol.requestFor('calibration', sample.packet);
    const name = 'sample-' + item.sha256.slice(0, 10);
    await save(name + '-packet.json', sample.packet);
    await save(name + '-request.json', request);
    let actual, provider;
    const startedAt = new Date().toISOString();
    try {
      provider = await execute({request, model: QUALIFIED_PROTOCOL.model, effort: QUALIFIED_PROTOCOL.effort});
      await save(name + '-provider.raw.json', provider);
      await save(name + '-judgment.json', provider.structured_output);
      actual = {...protocol.normalize('calibration', provider.structured_output, sample.packet),kind:'calibration',startedAt,completedAt:new Date().toISOString(),
        requestedModel:QUALIFIED_PROTOCOL.model,providerModel:Object.keys(provider.modelUsage || {}),providerId:provider.id || provider.session_id,
        usage:provider.usage,attestations:provider.structured_output.attestations,requestSha256:sha(serialized(request)),rawSha256:sha(serialized(provider)),
        protocolSha256:QUALIFIED_PROTOCOL.sha256,registrySha256:QUALIFIED_PROTOCOL.registrySha256};
      await save(name + '-checked.json', actual);
    } catch {
      evaluations.push({exemplarId:item.id, passed:false, failureKind:'EXECUTION_OR_PROTOCOL_FAILURE'});
      break;
    }
    const expected = item === positive ? 'PASS' : 'REJECT';
    const known = item.failureFamilies || [];
    const complete = known.every(f => ['clear','present','uncertain'].includes(actual.families[f]?.state) && actual.families[f]?.reason);
    const relevant = known.some(f => actual.families[f]?.state === 'present');
    const passed = actual.verdict === expected && (item === positive || (complete && relevant));
    evaluations.push({exemplarId:item.id, source:{path:item.path,sha256:item.sha256}, sample:name, expected, actual:actual.verdict, passed,
      checkedBinding:{path:name+'-checked.json',sha256:sha(serialized(actual))},rawBinding:{path:name+'-provider.raw.json',sha256:sha(serialized(provider))},
      disagreementsWithHistoricalTags:known.filter(f=>actual.families[f]?.state!=='present')});
    if (!passed) break;
  }
  const result = {status:evaluations.length === items.length && evaluations.every(x=>x.passed) ? 'CALIBRATION_PASSED' : 'HOLD_CALIBRATION',
    mode:'ORDINARY_NEWS_BLIND_REJECTION_V1',scope:'Actual hosted blind editorial calibration only; no factual admission or publication.',
    providerRoute:'claude',effort:QUALIFIED_PROTOCOL.effort,protocolSha256:QUALIFIED_PROTOCOL.sha256,registrySha256:QUALIFIED_PROTOCOL.registrySha256,
    policy:bundle.policy,notRun:items.slice(evaluations.length).map(x=>x.id),evaluations,
    hosted:{runId:process.env.GITHUB_RUN_ID || null,sourceCommit:process.env.GITHUB_SHA || null}};
  await save('calibration-result.json', result);
  return result;
}

async function main() {
  const [input, output] = process.argv.slice(2);
  if (!input || !output || fs.existsSync(output)) throw Error('CALIBRATION_PATH_INVALID');
  const bundle = JSON.parse(fs.readFileSync(input,'utf8'));
  if (sha(bundle.protocolSource || '') !== QUALIFIED_PROTOCOL.sha256) throw Error('CALIBRATION_BINDING_MISMATCH');
  fs.mkdirSync(output,{mode:0o700});
  const protocolPath = path.join(output,'protocol.mjs');
  fs.writeFileSync(protocolPath,bundle.protocolSource,{flag:'wx',mode:0o600});
  const protocol = await import(pathToFileURL(path.resolve(protocolPath)).href);
  const result = await calibrateHosted({bundle,protocol,execute:createHostedProtocolExecutor(),save:async(name,value)=>{
    fs.writeFileSync(path.join(output,name),JSON.stringify(value,null,2)+'\n',{flag:'wx',mode:0o600});
  }});
  console.log(JSON.stringify({status:result.status,samplesRun:result.evaluations.length,passed:result.evaluations.filter(x=>x.passed).length,publicationActionTaken:false}));
  if (result.status !== 'CALIBRATION_PASSED') process.exitCode = 2;
}
if (import.meta.url === pathToFileURL(process.argv[1] || '').href) main().catch(()=>{console.error('HOSTED_CALIBRATION_FAILED');process.exitCode=2;});
