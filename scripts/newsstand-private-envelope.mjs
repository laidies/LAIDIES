#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

export const PRIVATE_ENVELOPE_VERSION = 1;
export const MAX_PRIVATE_PAYLOAD_BYTES = 5 * 1024 * 1024;

const MAGIC = Buffer.from('NSPE', 'ascii');
const PREFIX_BYTES = 9;
const IV_BYTES = 12;
const TAG_BYTES = 16;
const MAX_METADATA_BYTES = 1_024;
const MAX_ENVELOPE_BYTES = PREFIX_BYTES + MAX_METADATA_BYTES + IV_BYTES + TAG_BYTES + MAX_PRIVATE_PAYLOAD_BYTES;
const BASE64_KEY = /^[A-Za-z0-9+/]{43}=$/;
const SAFE_FIELD_BYTES = 256;

export class PrivateEnvelopeError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'PrivateEnvelopeError';
    this.code = code;
  }
}

function fail(code, message) {
  throw new PrivateEnvelopeError(code, message);
}

function keyFromBase64(keyB64) {
  if (typeof keyB64 !== 'string' || !BASE64_KEY.test(keyB64)) {
    fail('INVALID_KEY', 'Private envelope key is invalid.');
  }
  const key = Buffer.from(keyB64, 'base64');
  if (key.length !== 32 || key.toString('base64') !== keyB64) {
    fail('INVALID_KEY', 'Private envelope key is invalid.');
  }
  return key;
}

function validateMetadata({ context, schema, runPurpose } = {}) {
  const metadata = { version: PRIVATE_ENVELOPE_VERSION, context, schema, runPurpose };
  for (const field of [context, schema, runPurpose]) {
    if (typeof field !== 'string' || field.length === 0 || Buffer.byteLength(field, 'utf8') > SAFE_FIELD_BYTES) {
      fail('INVALID_CONTEXT', 'Private envelope context is invalid.');
    }
  }
  const encoded = Buffer.from(JSON.stringify(metadata), 'utf8');
  if (encoded.length > MAX_METADATA_BYTES) fail('INVALID_CONTEXT', 'Private envelope context is invalid.');
  return { metadata, encoded };
}

function prefixFor(metadataLength) {
  const prefix = Buffer.alloc(PREFIX_BYTES);
  MAGIC.copy(prefix, 0);
  prefix.writeUInt8(PRIVATE_ENVELOPE_VERSION, 4);
  prefix.writeUInt32BE(metadataLength, 5);
  return prefix;
}

function validatePayload(payload) {
  if (!Buffer.isBuffer(payload)) fail('INVALID_PAYLOAD', 'Private envelope payload must be a binary buffer.');
  if (payload.length > MAX_PRIVATE_PAYLOAD_BYTES) fail('PAYLOAD_TOO_LARGE', 'Private envelope payload exceeds its size limit.');
}

export function encryptPrivateEnvelope({ payload, keyB64, context, schema, runPurpose }) {
  validatePayload(payload);
  const { encoded: metadataBytes } = validateMetadata({ context, schema, runPurpose });
  const prefix = prefixFor(metadataBytes.length);
  const authenticatedData = Buffer.concat([prefix, metadataBytes]);
  const iv = crypto.randomBytes(IV_BYTES);
  const key = keyFromBase64(keyB64);

  try {
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv, { authTagLength: TAG_BYTES });
    cipher.setAAD(authenticatedData, { plaintextLength: payload.length });
    const ciphertext = Buffer.concat([cipher.update(payload), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([prefix, metadataBytes, iv, tag, ciphertext]);
  } catch {
    fail('ENCRYPTION_FAILED', 'Private envelope encryption failed.');
  } finally {
    key.fill(0);
  }
}

function parseEnvelope(envelope) {
  if (!Buffer.isBuffer(envelope)) fail('INVALID_ENVELOPE', 'Private envelope must be a binary buffer.');
  if (envelope.length < PREFIX_BYTES + IV_BYTES + TAG_BYTES || envelope.length > MAX_ENVELOPE_BYTES) {
    fail('INVALID_ENVELOPE', 'Private envelope is invalid.');
  }
  if (!envelope.subarray(0, MAGIC.length).equals(MAGIC)) fail('INVALID_ENVELOPE', 'Private envelope is invalid.');
  if (envelope.readUInt8(4) !== PRIVATE_ENVELOPE_VERSION) fail('UNSUPPORTED_VERSION', 'Private envelope version is unsupported.');

  const metadataLength = envelope.readUInt32BE(5);
  if (metadataLength === 0 || metadataLength > MAX_METADATA_BYTES) fail('INVALID_ENVELOPE', 'Private envelope is invalid.');
  const metadataEnd = PREFIX_BYTES + metadataLength;
  const ivEnd = metadataEnd + IV_BYTES;
  const tagEnd = ivEnd + TAG_BYTES;
  if (tagEnd > envelope.length) fail('INVALID_ENVELOPE', 'Private envelope is invalid.');

  return {
    authenticatedData: envelope.subarray(0, metadataEnd),
    metadataBytes: envelope.subarray(PREFIX_BYTES, metadataEnd),
    iv: envelope.subarray(metadataEnd, ivEnd),
    tag: envelope.subarray(ivEnd, tagEnd),
    ciphertext: envelope.subarray(tagEnd),
  };
}

export function decryptPrivateEnvelope({ envelope, keyB64, context, schema, runPurpose }) {
  validateMetadata({ context, schema, runPurpose });
  const key = keyFromBase64(keyB64);
  let plaintext;
  try {
    const parsed = parseEnvelope(envelope);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, parsed.iv, { authTagLength: TAG_BYTES });
    decipher.setAAD(parsed.authenticatedData, { plaintextLength: parsed.ciphertext.length });
    decipher.setAuthTag(parsed.tag);
    plaintext = Buffer.concat([decipher.update(parsed.ciphertext), decipher.final()]);
    if (plaintext.length > MAX_PRIVATE_PAYLOAD_BYTES) fail('PAYLOAD_TOO_LARGE', 'Private envelope payload exceeds its size limit.');

    let stored;
    try {
      stored = JSON.parse(parsed.metadataBytes.toString('utf8'));
    } catch {
      fail('AUTHENTICATION_FAILED', 'Private envelope authentication failed.');
    }
    const expected = { version: PRIVATE_ENVELOPE_VERSION, context, schema, runPurpose };
    if (!stored || typeof stored !== 'object' || Array.isArray(stored)
      || Object.keys(stored).sort().join(',') !== 'context,runPurpose,schema,version'
      || stored.version !== expected.version
      || stored.context !== expected.context
      || stored.schema !== expected.schema
      || stored.runPurpose !== expected.runPurpose) {
      fail('CONTEXT_MISMATCH', 'Private envelope context does not match.');
    }
    return plaintext;
  } catch (error) {
    if (plaintext) plaintext.fill(0);
    if (error instanceof PrivateEnvelopeError) throw error;
    fail('AUTHENTICATION_FAILED', 'Private envelope authentication failed.');
  } finally {
    key.fill(0);
  }
}

function safeRelativePath(value, root) {
  if (typeof value !== 'string' || value.length === 0 || path.isAbsolute(value) || value.includes('\\')) {
    fail('UNSAFE_PATH', 'Private envelope path is unsafe.');
  }
  const parts = value.split('/');
  if (parts.some((part) => part === '' || part === '.' || part === '..') || path.normalize(value) !== value) {
    fail('UNSAFE_PATH', 'Private envelope path is unsafe.');
  }
  const resolved = path.resolve(root, value);
  if (!resolved.startsWith(`${root}${path.sep}`)) fail('UNSAFE_PATH', 'Private envelope path is unsafe.');
  return { resolved, parts };
}

function rejectSymlinkComponents(root, parts, { createParents = false } = {}) {
  let current = root;
  for (const part of parts) {
    current = path.join(current, part);
    if (!fs.existsSync(current)) {
      if (!createParents) fail('UNSAFE_PATH', 'Private envelope path is unsafe.');
      try {
        fs.mkdirSync(current, { mode: 0o700 });
      } catch {
        fail('FILE_ACCESS_FAILED', 'Private envelope file access failed.');
      }
    }
    let stat;
    try {
      stat = fs.lstatSync(current);
    } catch {
      fail('FILE_ACCESS_FAILED', 'Private envelope file access failed.');
    }
    if (stat.isSymbolicLink() || !stat.isDirectory()) fail('UNSAFE_PATH', 'Private envelope path is unsafe.');
  }
}

function readPrivateFile(relativePath, root, maximumBytes) {
  const { resolved, parts } = safeRelativePath(relativePath, root);
  rejectSymlinkComponents(root, parts.slice(0, -1));
  let descriptor;
  try {
    const flags = fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW ?? 0);
    descriptor = fs.openSync(resolved, flags);
    const stat = fs.fstatSync(descriptor);
    if (!stat.isFile()) fail('UNSAFE_PATH', 'Private envelope path is unsafe.');
    if (stat.size > maximumBytes) fail('PAYLOAD_TOO_LARGE', 'Private envelope payload exceeds its size limit.');
    return fs.readFileSync(descriptor);
  } catch (error) {
    if (error instanceof PrivateEnvelopeError) throw error;
    fail('FILE_ACCESS_FAILED', 'Private envelope file access failed.');
  } finally {
    if (descriptor !== undefined) fs.closeSync(descriptor);
  }
}

function writePrivateFile(relativePath, root, contents) {
  const { resolved, parts } = safeRelativePath(relativePath, root);
  if (parts.length < 2) fail('UNSAFE_PATH', 'Private envelope output requires a private parent directory.');
  rejectSymlinkComponents(root, parts.slice(0, -1), { createParents: true });
  const parent = path.dirname(resolved);
  let parentStat;
  try {
    parentStat = fs.lstatSync(parent);
  } catch {
    fail('FILE_ACCESS_FAILED', 'Private envelope file access failed.');
  }
  if (parentStat.isSymbolicLink() || !parentStat.isDirectory() || (parentStat.mode & 0o077) !== 0) {
    fail('UNSAFE_PATH', 'Private envelope output parent is not private.');
  }

  let descriptor;
  let created = false;
  let complete = false;
  try {
    const flags = fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_EXCL | (fs.constants.O_NOFOLLOW ?? 0);
    descriptor = fs.openSync(resolved, flags, 0o600);
    created = true;
    fs.writeFileSync(descriptor, contents);
    fs.fchmodSync(descriptor, 0o600);
    complete = true;
  } catch (error) {
    if (error?.code === 'EEXIST' || error?.code === 'ELOOP') fail('OUTPUT_EXISTS', 'Private envelope output already exists.');
    if (error instanceof PrivateEnvelopeError) throw error;
    fail('FILE_ACCESS_FAILED', 'Private envelope file access failed.');
  } finally {
    if (descriptor !== undefined) fs.closeSync(descriptor);
    if (created && !complete) {
      try { fs.unlinkSync(resolved); } catch {}
    }
  }
}

function privateRoot(cwd) {
  const root = path.resolve(cwd);
  let stat;
  try {
    stat = fs.lstatSync(root);
  } catch {
    fail('FILE_ACCESS_FAILED', 'Private envelope file access failed.');
  }
  if (stat.isSymbolicLink() || !stat.isDirectory()) fail('UNSAFE_PATH', 'Private envelope path is unsafe.');
  return root;
}

function parseCli(argv) {
  const command = argv[0];
  if (!['encrypt', 'decrypt'].includes(command)) fail('INVALID_COMMAND', 'Private envelope command is invalid.');
  const options = {};
  for (let index = 1; index < argv.length; index += 2) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!value || !['--input', '--output', '--context', '--schema', '--purpose'].includes(flag) || options[flag]) {
      fail('INVALID_COMMAND', 'Private envelope command is invalid.');
    }
    options[flag] = value;
  }
  if (Object.keys(options).length !== 5) fail('INVALID_COMMAND', 'Private envelope command is invalid.');
  return {
    command,
    input: options['--input'],
    output: options['--output'],
    context: options['--context'],
    schema: options['--schema'],
    runPurpose: options['--purpose'],
  };
}

export function runPrivateEnvelopeCli({ argv, cwd = process.cwd(), keyB64 = process.env.NEWSSTAND_PRIVATE_HANDOFF_KEY_B64 }) {
  const root = privateRoot(cwd);
  const command = parseCli(argv);
  const shared = { keyB64, context: command.context, schema: command.schema, runPurpose: command.runPurpose };
  if (command.command === 'encrypt') {
    const payload = readPrivateFile(command.input, root, MAX_PRIVATE_PAYLOAD_BYTES);
    try {
      const envelope = encryptPrivateEnvelope({ payload, ...shared });
      writePrivateFile(command.output, root, envelope);
    } finally {
      payload.fill(0);
    }
  } else {
    const envelope = readPrivateFile(command.input, root, MAX_ENVELOPE_BYTES);
    const payload = decryptPrivateEnvelope({ envelope, ...shared });
    try {
      writePrivateFile(command.output, root, payload);
    } finally {
      payload.fill(0);
    }
  }
}

async function main() {
  try {
    runPrivateEnvelopeCli({ argv: process.argv.slice(2) });
  } catch (error) {
    const code = error instanceof PrivateEnvelopeError ? error.code : 'UNEXPECTED_ERROR';
    process.stderr.write(`NEWSSTAND_PRIVATE_ENVELOPE_ERROR ${code}\n`);
    process.exitCode = 2;
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) await main();
