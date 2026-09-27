#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  createHostedProtocolExecutor,
  HostedProtocolExecutionError,
} from './execute-newsstand-hosted-protocol.mjs';

const testRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'test-newsstand-hosted-protocol-'));
const fakeCli = path.join(testRoot, 'fake-claude.mjs');
const auditPath = path.join(testRoot, 'audit.json');
const privateToken = 'private-token-must-not-leak';
const privateSystem = 'PRIVATE SYSTEM INSTRUCTION';
const privateUser = 'PRIVATE USER PACKET';
const privateResult = 'PRIVATE PROVIDER JUDGMENT';
const parentOnlySecret = 'parent-environment-secret';

const outputSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['verdict', 'reason'],
  properties: {
    verdict: { type: 'string', enum: ['PASS', 'HOLD'] },
    reason: { type: 'string' },
  },
};

const request = (userContent = privateUser) => ({
  outputSchema,
  messages: [
    { role: 'system', content: privateSystem },
    { role: 'user', content: userContent },
  ],
});

function provider(overrides = {}) {
  return {
    type: 'result',
    subtype: 'success',
    is_error: false,
    modelUsage: { 'claude-fable-5': { inputTokens: 10, outputTokens: 4 } },
    structured_output: { verdict: 'PASS', reason: privateResult },
    ...overrides,
  };
}

const fakeSource = `#!/usr/bin/env node
import fs from 'node:fs';
const args = process.argv.slice(2);
let input = '';
for await (const chunk of process.stdin) input += chunk;
const valueAfter = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};
fs.writeFileSync(${JSON.stringify(auditPath)}, JSON.stringify({
  args,
  input,
  cwd: process.cwd(),
  env: process.env,
}));
if (input === 'TIMEOUT') setTimeout(() => {}, 10_000);
else if (input === 'OUTPUT_LIMIT') process.stdout.write('x'.repeat(4_096));
else if (input === 'INVALID_JSON') process.stdout.write('private malformed provider output');
else if (input === 'NONZERO') { process.stdout.write('private provider stdout'); process.stderr.write('private provider stderr ' + process.env.CLAUDE_CODE_OAUTH_TOKEN); process.exit(8); }
else if (input === 'PROVIDER_ERROR') process.stdout.write(JSON.stringify(${JSON.stringify(provider({ is_error: true, subtype: 'error_during_execution' }))}));
else if (input === 'WRONG_MODEL') process.stdout.write(JSON.stringify(${JSON.stringify(provider({ modelUsage: { 'claude-other': {} } }))}));
else if (input === 'NON_CLAUDE_MODEL') process.stdout.write(JSON.stringify(${JSON.stringify(provider({ modelUsage: { 'claude-fable-5': {}, 'unqualified-model': {} } }))}));
else if (input === 'NO_STRUCTURED') {
  const result = ${JSON.stringify(provider())};
  delete result.structured_output;
  process.stdout.write(JSON.stringify(result));
} else process.stdout.write(JSON.stringify(${JSON.stringify(provider())}));
`;

fs.writeFileSync(fakeCli, fakeSource, { mode: 0o700 });
process.env.PARENT_ONLY_SECRET = parentOnlySecret;

const captured = [];
const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);
process.stdout.write = ((chunk, ...rest) => {
  captured.push(String(chunk));
  return true;
});
process.stderr.write = ((chunk, ...rest) => {
  captured.push(String(chunk));
  return true;
});

try {
  const execute = createHostedProtocolExecutor({ token: privateToken, cli: fakeCli, timeoutMs: 1_000 });
  const result = await execute({ request: request(), model: 'claude-fable-5', effort: 'medium' });
  assert.equal(result.structured_output.reason, privateResult, 'returns the untouched provider result in process');

  const audit = JSON.parse(fs.readFileSync(auditPath, 'utf8'));
  assert.equal(audit.input, privateUser, 'sends the exact user message on stdin');
  assert.equal(audit.env.CLAUDE_CODE_OAUTH_TOKEN, privateToken, 'passes the token only to the child environment');
  assert.equal(audit.env.CLAUDE_CODE_MAX_TURNS, '1');
  assert.equal(audit.env.PARENT_ONLY_SECRET, undefined, 'does not inherit unrelated parent environment secrets');
  assert.notEqual(audit.env.HOME, process.env.HOME, 'uses an isolated home');
  assert.equal(audit.env.CLAUDE_CONFIG_DIR, audit.env.XDG_CONFIG_HOME, 'isolates provider configuration');
  assert.ok(!fs.existsSync(audit.cwd), 'removes the isolated execution directory');

  const expectedArgs = [
    '--print', '--safe-mode', '--tools', '', '--permission-mode', 'dontAsk',
    '--no-session-persistence', '--model', 'claude-fable-5', '--effort', 'medium',
    '--output-format', 'json', '--json-schema', JSON.stringify(outputSchema),
    '--system-prompt', privateSystem,
  ];
  assert.deepEqual(audit.args, expectedArgs, 'passes the exact schema, system message, and locked execution flags');

  const failures = [
    ['INVALID_JSON', 'INVALID_PROVIDER_OUTPUT'],
    ['NONZERO', 'PROVIDER_ERROR'],
    ['PROVIDER_ERROR', 'PROVIDER_ERROR'],
    ['WRONG_MODEL', 'MODEL_MISMATCH'],
    ['NON_CLAUDE_MODEL', 'MODEL_MISMATCH'],
    ['NO_STRUCTURED', 'INVALID_PROVIDER_OUTPUT'],
    ['TIMEOUT', 'TIMEOUT'],
  ];
  for (const [input, code] of failures) {
    await assert.rejects(
      execute({ request: request(input), model: 'claude-fable-5', effort: 'medium' }),
      (error) => {
        assert.ok(error instanceof HostedProtocolExecutionError);
        assert.equal(error.code, code);
        const publicError = JSON.stringify({ name: error.name, code: error.code, message: error.message, stack: error.stack });
        for (const secret of [privateToken, privateSystem, privateUser, privateResult, parentOnlySecret, 'private provider stderr', 'private malformed provider output']) {
          assert.ok(!publicError.includes(secret), `error does not leak ${secret}`);
        }
        return true;
      },
    );
  }

  await assert.rejects(
    execute({ request: request('NONZERO'), model: 'claude-fable-5', effort: 'medium' }),
    (error) => {
      assert.ok(error instanceof HostedProtocolExecutionError);
      assert.equal(error.code, 'PROVIDER_ERROR');
      assert.equal(Object.prototype.propertyIsEnumerable.call(error, 'privateEvidence'), false, 'diagnostics stay out of ordinary error serialization');
      assert.deepEqual(error.privateEvidence, {
        event: 'process_exit',
        exitCode: 8,
        stdout: { text: 'private provider stdout', truncated: false },
        stderr: { text: 'private provider stderr [REDACTED]', truncated: false },
      }, 'private custody receives the bounded child diagnostic with credentials redacted');
      const publicError = JSON.stringify({ name: error.name, code: error.code, message: error.message, stack: error.stack });
      assert.ok(!publicError.includes('private provider stdout'));
      assert.ok(!publicError.includes('private provider stderr'));
      assert.ok(!publicError.includes(privateToken));
      return true;
    },
  );

  const outputLimited = createHostedProtocolExecutor({
    token: privateToken,
    cli: fakeCli,
    timeoutMs: 1_000,
    maxOutputBytes: 1_024,
  });
  await assert.rejects(
    outputLimited({ request: request('OUTPUT_LIMIT'), model: 'claude-fable-5', effort: 'medium' }),
    (error) => error instanceof HostedProtocolExecutionError && error.code === 'OUTPUT_LIMIT',
  );

  const missingCli = createHostedProtocolExecutor({ token: privateToken, cli: path.join(testRoot, 'missing-cli') });
  await assert.rejects(
    missingCli({ request: request(), model: 'claude-fable-5', effort: 'medium' }),
    (error) => {
      assert.ok(error instanceof HostedProtocolExecutionError);
      assert.equal(error.code, 'EXECUTION_ERROR');
      assert.equal(error.privateEvidence.event, 'spawn_error');
      assert.equal(error.privateEvidence.spawnErrorCode, 'ENOENT');
      assert.equal(error.privateEvidence.stdout.text, '');
      assert.equal(error.privateEvidence.stderr.text, '');
      return true;
    },
  );

  await assert.rejects(
    execute({ request: request(), model: 'claude-sonnet-4-5', effort: 'medium' }),
    (error) => error instanceof HostedProtocolExecutionError && error.code === 'PROTOCOL_MISMATCH',
  );
  await assert.rejects(
    execute({ request: { ...request(), messages: [...request().messages, { role: 'user', content: 'extra' }] }, model: 'claude-fable-5', effort: 'medium' }),
    (error) => error instanceof HostedProtocolExecutionError && error.code === 'INVALID_REQUEST',
  );
  assert.throws(
    () => createHostedProtocolExecutor({ token: '' }),
    (error) => error instanceof HostedProtocolExecutionError && error.code === 'MISSING_TOKEN',
  );

  const publicOutput = captured.join('');
  assert.equal(publicOutput, '', 'executor writes no provider, request, token, or error content to public output');
} finally {
  process.stdout.write = originalStdoutWrite;
  process.stderr.write = originalStderrWrite;
  delete process.env.PARENT_ONLY_SECRET;
  fs.rmSync(testRoot, { recursive: true, force: true });
}

console.log('PASS execute-newsstand-hosted-protocol: exact locked invocation, isolation, validation, caps, and no private-output leakage');
