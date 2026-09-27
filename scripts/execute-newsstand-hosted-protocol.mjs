#!/usr/bin/env node

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const HOSTED_PROTOCOL_MODEL = 'claude-fable-5';
export const HOSTED_PROTOCOL_EFFORT = 'medium';
export const DEFAULT_TIMEOUT_MS = 240_000;
export const DEFAULT_MAX_OUTPUT_BYTES = 1_000_000;

const MIN_TIMEOUT_MS = 1_000;
const MAX_TIMEOUT_MS = 480_000;
const MIN_OUTPUT_BYTES = 1_024;
const MAX_OUTPUT_BYTES = 1_000_000;
const MAX_PRIVATE_DIAGNOSTIC_BYTES = 64 * 1024;

export class HostedProtocolExecutionError extends Error {
  constructor(code, message, privateEvidence = undefined) {
    super(message);
    this.name = 'HostedProtocolExecutionError';
    this.code = code;
    // The caller may place this only in its encrypted custody record.  Keeping
    // it non-enumerable makes ordinary error serialization safe by default.
    if (privateEvidence !== undefined) {
      Object.defineProperty(this, 'privateEvidence', { value: privateEvidence });
    }
  }
}

function fail(code, message) {
  throw new HostedProtocolExecutionError(code, message);
}

function privateDiagnosticText(value, token) {
  const bytes = Buffer.isBuffer(value) ? value : Buffer.from(String(value ?? ''), 'utf8');
  const clipped = bytes.subarray(0, MAX_PRIVATE_DIAGNOSTIC_BYTES).toString('utf8');
  return {
    text: typeof token === 'string' && token.length > 0 ? clipped.split(token).join('[REDACTED]') : clipped,
    truncated: bytes.length > MAX_PRIVATE_DIAGNOSTIC_BYTES,
  };
}

function executionError(code, message, privateEvidence) {
  return new HostedProtocolExecutionError(code, message, privateEvidence);
}

function isPlainObject(value) {
  return value !== null
    && typeof value === 'object'
    && !Array.isArray(value)
    && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}

function validateRequest(request) {
  if (!isPlainObject(request)) fail('INVALID_REQUEST', 'Hosted protocol request is invalid.');
  if (!isPlainObject(request.outputSchema)) fail('INVALID_REQUEST', 'Hosted protocol output schema is invalid.');
  if (!Array.isArray(request.messages) || request.messages.length !== 2) {
    fail('INVALID_REQUEST', 'Hosted protocol messages are invalid.');
  }

  const [systemMessage, userMessage] = request.messages;
  for (const [message, role] of [[systemMessage, 'system'], [userMessage, 'user']]) {
    if (!isPlainObject(message)
      || Object.keys(message).sort().join(',') !== 'content,role'
      || message.role !== role
      || typeof message.content !== 'string'
      || message.content.length === 0) {
      fail('INVALID_REQUEST', 'Hosted protocol messages are invalid.');
    }
  }

  let schema;
  try {
    schema = JSON.stringify(request.outputSchema);
  } catch {
    fail('INVALID_REQUEST', 'Hosted protocol output schema is invalid.');
  }

  return {
    schema,
    systemPrompt: systemMessage.content,
    userPrompt: userMessage.content,
  };
}

function validateConfiguration({ token, cli, timeoutMs, maxOutputBytes }) {
  if (typeof token !== 'string' || token.trim().length === 0) {
    fail('MISSING_TOKEN', 'Hosted protocol credentials are unavailable.');
  }
  if (typeof cli !== 'string' || cli.length === 0) {
    fail('INVALID_CONFIGURATION', 'Hosted protocol executable is invalid.');
  }
  if (!Number.isInteger(timeoutMs) || timeoutMs < MIN_TIMEOUT_MS || timeoutMs > MAX_TIMEOUT_MS) {
    fail('INVALID_CONFIGURATION', 'Hosted protocol timeout is invalid.');
  }
  if (!Number.isInteger(maxOutputBytes)
    || maxOutputBytes < MIN_OUTPUT_BYTES
    || maxOutputBytes > MAX_OUTPUT_BYTES) {
    fail('INVALID_CONFIGURATION', 'Hosted protocol output limit is invalid.');
  }
}

function validateProvider(provider) {
  if (!isPlainObject(provider)) {
    fail('INVALID_PROVIDER_OUTPUT', 'Hosted provider output is invalid.');
  }
  if (provider.is_error !== false || provider.subtype !== 'success') {
    fail('PROVIDER_ERROR', 'Hosted provider did not complete successfully.');
  }
  if (!isPlainObject(provider.modelUsage)) {
    fail('INVALID_PROVIDER_OUTPUT', 'Hosted provider model evidence is invalid.');
  }

  const usedModels = Object.keys(provider.modelUsage);
  if (!usedModels.includes(HOSTED_PROTOCOL_MODEL)
    || usedModels.some((model) => !model.startsWith('claude-'))) {
    fail('MODEL_MISMATCH', 'Hosted provider used an unqualified model.');
  }
  if (!isPlainObject(provider.structured_output)) {
    fail('INVALID_PROVIDER_OUTPUT', 'Hosted provider structured output is invalid.');
  }

  return provider;
}

function isolatedEnvironment({ token, home, config }) {
  const environment = {
    PATH: process.env.PATH ?? '',
    HOME: home,
    CLAUDE_CONFIG_DIR: config,
    XDG_CONFIG_HOME: config,
    CLAUDE_CODE_OAUTH_TOKEN: token,
    CLAUDE_CODE_MAX_TURNS: '1',
    NO_COLOR: '1',
  };
  if (typeof process.env.LANG === 'string' && process.env.LANG.length > 0) {
    environment.LANG = process.env.LANG;
  }
  return environment;
}

export function createHostedProtocolExecutor({
  token = process.env.CLAUDE_CODE_OAUTH_TOKEN,
  cli = process.env.CLAUDE_CLI_PATH ?? 'claude',
  timeoutMs = DEFAULT_TIMEOUT_MS,
  maxOutputBytes = DEFAULT_MAX_OUTPUT_BYTES,
} = {}) {
  validateConfiguration({ token, cli, timeoutMs, maxOutputBytes });

  return async function executeHostedProtocol({ request, model, effort }) {
    if (model !== HOSTED_PROTOCOL_MODEL || effort !== HOSTED_PROTOCOL_EFFORT) {
      fail('PROTOCOL_MISMATCH', 'Hosted protocol model or effort does not match the qualified protocol.');
    }
    const { schema, systemPrompt, userPrompt } = validateRequest(request);
    const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'newsstand-hosted-protocol-'));
    const home = path.join(temporaryRoot, 'home');
    const config = path.join(temporaryRoot, 'config');
    fs.mkdirSync(home, { recursive: true, mode: 0o700 });
    fs.mkdirSync(config, { recursive: true, mode: 0o700 });

    const args = [
      '--print',
      '--safe-mode',
      '--tools', '',
      '--permission-mode', 'dontAsk',
      '--no-session-persistence',
      '--model', HOSTED_PROTOCOL_MODEL,
      '--effort', HOSTED_PROTOCOL_EFFORT,
      '--output-format', 'json',
      '--json-schema', schema,
      '--system-prompt', systemPrompt,
    ];

    try {
      const execution = await new Promise((resolve, reject) => {
        let child;
        try {
          child = spawn(cli, args, {
            cwd: temporaryRoot,
            env: isolatedEnvironment({ token, home, config }),
            stdio: ['pipe', 'pipe', 'pipe'],
          });
        } catch {
          reject(new HostedProtocolExecutionError('EXECUTION_ERROR', 'Hosted provider could not be started.'));
          return;
        }

        const stdout = [];
        const stderr = [];
        let capturedBytes = 0;
        let settled = false;
        let timedOut = false;
        let outputLimited = false;

        const terminate = () => {
          child.kill('SIGTERM');
          const hardKill = setTimeout(() => child.kill('SIGKILL'), 1_000);
          hardKill.unref();
        };

        const timer = setTimeout(() => {
          timedOut = true;
          terminate();
        }, timeoutMs);

        const collect = (chunk, keep) => {
          capturedBytes += chunk.length;
          if (capturedBytes > maxOutputBytes) {
            outputLimited = true;
            terminate();
            return;
          }
          if (keep) stdout.push(chunk);
          else stderr.push(chunk);
        };

        const diagnostic = ({ event, spawnError, exitCode, signal } = {}) => ({
          event,
          ...(typeof spawnError?.code === 'string' ? { spawnErrorCode: spawnError.code } : {}),
          ...(typeof spawnError?.errno === 'string' ? { spawnErrno: spawnError.errno } : {}),
          ...(typeof spawnError?.syscall === 'string' ? { spawnSyscall: spawnError.syscall } : {}),
          ...(typeof exitCode === 'number' ? { exitCode } : {}),
          ...(typeof signal === 'string' ? { signal } : {}),
          stdout: privateDiagnosticText(Buffer.concat(stdout), token),
          stderr: privateDiagnosticText(Buffer.concat(stderr), token),
        });

        child.stdout.on('data', (chunk) => collect(chunk, true));
        child.stderr.on('data', (chunk) => collect(chunk, false));
        child.once('error', (error) => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          reject(executionError('EXECUTION_ERROR', 'Hosted provider could not be started.', diagnostic({ event: 'spawn_error', spawnError: error })));
        });
        child.once('close', (code, signal) => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          if (timedOut) {
            reject(executionError('TIMEOUT', 'Hosted provider exceeded its execution time limit.', diagnostic({ event: 'timeout', exitCode: code, signal })));
            return;
          }
          if (outputLimited) {
            reject(executionError('OUTPUT_LIMIT', 'Hosted provider exceeded its output limit.', diagnostic({ event: 'output_limit', exitCode: code, signal })));
            return;
          }
          resolve({ code, signal, stdout: Buffer.concat(stdout).toString('utf8'), diagnostic: diagnostic({ event: 'process_exit', exitCode: code, signal }) });
        });

        child.stdin.on('error', () => {});
        child.stdin.end(userPrompt);
      });

      if (execution.code !== 0) {
        throw executionError('PROVIDER_ERROR', 'Hosted provider did not complete successfully.', execution.diagnostic);
      }

      let provider;
      try {
        provider = JSON.parse(execution.stdout);
      } catch {
        throw executionError('INVALID_PROVIDER_OUTPUT', 'Hosted provider output is invalid.', execution.diagnostic);
      }
      try {
        return validateProvider(provider);
      } catch (error) {
        if (error instanceof HostedProtocolExecutionError) {
          throw executionError(error.code, error.message, execution.diagnostic);
        }
        throw error;
      }
    } finally {
      fs.rmSync(temporaryRoot, { recursive: true, force: true });
    }
  };
}
