#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { executeHostedProduction } from './execute-newsstand-hosted-production.mjs';

const inputPath = '/private/tmp/newsstand-mai-production-input.gz';
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'test-hosted-production-execution-'));
fs.chmodSync(temp, 0o700);

try {
  const payload = JSON.parse(zlib.gunzipSync(fs.readFileSync(inputPath)));
  const protocol = 'operations/product-stewards/newsstand/review-runtime/protocol-hosted.mjs';
  const replacement = Buffer.from('export const substitutedProtocol = true;\n');
  payload.runtime.files[protocol] = {
    ...payload.runtime.files[protocol],
    content: replacement.toString('base64'),
    size: replacement.length,
    sha256: crypto.createHash('sha256').update(replacement).digest('hex'),
  };

  const outputDirectory = path.join(temp, 'result');
  const result = await executeHostedProduction({ payload, outputDirectory });
  assert.deepEqual(result, {
    schema: 'newsstand-hosted-production-result.v1',
    stage: 'EXECUTION',
    status: 'PRODUCTION_EXECUTION_HELD',
    publicationActionTaken: false,
  });
  assert.equal(fs.existsSync(path.join(outputDirectory, 'runtime')), false, 'unqualified code stops before materialization or import');
  const error = JSON.parse(fs.readFileSync(path.join(outputDirectory, 'evidence/execution-error.json'), 'utf8'));
  assert.match(error.detail, /UNQUALIFIED_RUNTIME_EXECUTABLE/);
  assert.equal(fs.existsSync(path.join(outputDirectory, 'evidence/qualification.json')), false, 'qualification and any provider-facing stage remain unreachable');
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

console.log('PASS hosted production: substituted self-consistent protocol holds before runtime materialization, import, qualification, or provider execution');
