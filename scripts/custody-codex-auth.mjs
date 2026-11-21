import fs from 'node:fs';
import path from 'node:path';
import {encryptPrivateEnvelope, decryptPrivateEnvelope} from './newsstand-private-envelope.mjs';

const envelopeMetadata = {
  context: 'laidies-private-newsstand',
  schema: 'codex-managed-auth-v1',
  runPurpose: 'serialized-private-runner',
};
const COMMIT = /^[0-9a-f]{40}$/;
const RUN_ID = /^[1-9][0-9]*$/;
const ISO_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
const SOURCE_REFS = new Set(['refs/heads/main', 'refs/heads/ops/newsstand-hosted-20260926']);

function validAuth(raw) {
  const value = JSON.parse(raw);
  if (!value || typeof value !== 'object' || Array.isArray(value)
    || value.auth_mode !== 'chatgpt'
    || typeof value.tokens?.access_token !== 'string'
    || typeof value.tokens?.refresh_token !== 'string'
    || typeof value.tokens?.id_token !== 'string') {
    throw Error('INVALID_MANAGED_AUTH');
  }
  return value;
}

function parseMetadata(raw) {
  const value = JSON.parse(raw);
  if (!value || typeof value !== 'object' || Array.isArray(value)
    || Object.keys(value).sort().join(',') !== 'runId,runStartedAt,sourceCommit,sourceRef,version,workflowId'
    || value.version !== 1
    || !RUN_ID.test(String(value.workflowId))
    || !RUN_ID.test(String(value.runId))
    || !ISO_TIME.test(value.runStartedAt)
    || !COMMIT.test(value.sourceCommit)
    || !SOURCE_REFS.has(value.sourceRef)) {
    throw Error('INVALID_CUSTODY_METADATA');
  }
  return value;
}

function metadataFromEnvironment() {
  return parseMetadata(JSON.stringify({
    version: 1,
    workflowId: process.env.AUTH_CUSTODY_WORKFLOW_ID,
    runId: process.env.AUTH_CUSTODY_RUN_ID,
    runStartedAt: process.env.AUTH_CUSTODY_RUN_STARTED_AT,
    sourceCommit: process.env.AUTH_CUSTODY_SOURCE_COMMIT,
    sourceRef: process.env.AUTH_CUSTODY_SOURCE_REF,
  }));
}

function sameMetadata(left, right) {
  return left.version === right.version
    && left.workflowId === right.workflowId
    && left.runId === right.runId
    && left.runStartedAt === right.runStartedAt
    && left.sourceCommit === right.sourceCommit
    && left.sourceRef === right.sourceRef;
}

function privateWrite(destination, output) {
  fs.mkdirSync(path.dirname(destination), { recursive: true, mode: 0o700 });
  fs.writeFileSync(destination, output, { mode: 0o600, flag: 'wx' });
}

function sealedPayload(auth, custody) {
  return Buffer.from(JSON.stringify({ auth, custody }), 'utf8');
}

function restorePayload(envelope, sidecar) {
  const payload = decryptPrivateEnvelope({
    envelope,
    keyB64: process.env.NEWSSTAND_PRIVATE_HANDOFF_KEY_B64,
    ...envelopeMetadata,
  });
  try {
    const decoded = JSON.parse(payload);
    if (!decoded || typeof decoded !== 'object' || Array.isArray(decoded)
      || Object.keys(decoded).sort().join(',') !== 'auth,custody'
      || !sameMetadata(parseMetadata(JSON.stringify(decoded.custody)), sidecar)) {
      throw Error('CUSTODY_PROVENANCE_MISMATCH');
    }
    return Buffer.from(JSON.stringify(validAuth(JSON.stringify(decoded.auth))), 'utf8');
  } finally {
    payload.fill(0);
  }
}

try {
  const privateRepository = process.env.GITHUB_REPOSITORY === 'laidies/newsstand-automation';
  const publicHostedRecipient = process.env.GITHUB_REPOSITORY === 'laidies/LAIDIES'
    && process.env.GITHUB_ACTIONS === 'true'
    && ['laidies/LAIDIES/.github/workflows/newsstand-cloud-intake.yml@refs/heads/main',
      'laidies/LAIDIES/.github/workflows/newsstand-hosted-production.yml@refs/heads/ops/newsstand-hosted-20260926'].includes(process.env.GITHUB_WORKFLOW_REF);
  if (!privateRepository && !publicHostedRecipient) throw Error('AUTHORIZED_REPOSITORY_REQUIRED');
  const [action, source, destination, metadataPath] = process.argv.slice(2);
  if (!source || !destination || fs.existsSync(destination)) throw Error('INVALID_CUSTODY_PATH');

  if (action === 'seed') {
    if (metadataPath || process.env.ALLOW_BOOTSTRAP !== 'true') throw Error('INVALID_CUSTODY_ACTION');
    privateWrite(destination, Buffer.from(JSON.stringify(validAuth(Buffer.from(process.env.CODEX_AUTH_JSON || ''))), 'utf8'));
    console.log('PRIVATE_AUTH_RESTORED');
  } else if (action === 'seal') {
    if (!metadataPath || fs.existsSync(metadataPath)) throw Error('INVALID_CUSTODY_PATH');
    const custody = metadataFromEnvironment();
    const auth = validAuth(fs.readFileSync(source));
    const payload = sealedPayload(auth, custody);
    try {
      const envelope = encryptPrivateEnvelope({
        payload,
        keyB64: process.env.NEWSSTAND_PRIVATE_HANDOFF_KEY_B64,
        ...envelopeMetadata,
      });
      privateWrite(destination, envelope);
      privateWrite(metadataPath, `${JSON.stringify(custody)}\n`);
    } finally {
      payload.fill(0);
    }
    console.log('ENCRYPTED_AUTH_CUSTODY_READY');
  } else if (action === 'restore') {
    if (!metadataPath || !fs.existsSync(metadataPath)) throw Error('INVALID_CUSTODY_PATH');
    const sidecar = parseMetadata(fs.readFileSync(metadataPath));
    privateWrite(destination, restorePayload(fs.readFileSync(source), sidecar));
    console.log('PRIVATE_AUTH_RESTORED');
  } else {
    throw Error('INVALID_CUSTODY_ACTION');
  }
} catch {
  console.error('CODEX_AUTH_CUSTODY_HELD');
  process.exitCode = 2;
}
