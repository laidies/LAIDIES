#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import {spawn} from "node:child_process";

const ROLES = new Set(["writer", "reviewer"]);
const MODEL = "claude-fable-5";
const MAX_CAPTURE_BYTES = 1_000_000;
const ROLE_SCHEMAS = {
  writer: {
    type: "object", additionalProperties: false, required: ["role", "draft"],
    properties: {
      role: {const: "writer"},
      draft: {
        type: "object", additionalProperties: false, required: ["headline", "body"],
        properties: {headline: {type: "string", minLength: 1}, body: {type: "string", minLength: 1}}
      }
    }
  },
  reviewer: {
    type: "object", additionalProperties: false, required: ["role", "verdict", "findings"],
    properties: {
      role: {const: "reviewer"},
      verdict: {enum: ["PASS", "HOLD", "REJECT"]},
      findings: {
        type: "array", minItems: 1,
        items: {
          type: "object", additionalProperties: false, required: ["claim", "reason"],
          properties: {claim: {type: "string", minLength: 15}, reason: {type: "string", minLength: 15}}
        }
      }
    }
  }
};

const digest = value => crypto.createHash("sha256").update(value).digest("hex");
const redact = (value, token) => String(value || "").split(token).join("[REDACTED]");
const substantiveText = value => typeof value === "string" && value.trim().length >= 15;
const validWriterDraft = draft => draft && typeof draft === "object" && !Array.isArray(draft)
  && Object.keys(draft).every(key => ["headline", "body"].includes(key))
  && typeof draft.headline === "string" && draft.headline.trim().length > 0
  && typeof draft.body === "string" && draft.body.trim().length > 0;
const validReviewerFinding = finding => finding && typeof finding === "object" && !Array.isArray(finding)
  && Object.keys(finding).every(key => ["claim", "reason"].includes(key))
  && substantiveText(finding.claim) && substantiveText(finding.reason);

export function validateRequest(request) {
  const errors = [];
  if (!ROLES.has(request?.role)) errors.push("role must be writer or reviewer");
  if (typeof request?.prompt !== "string" || !request.prompt.trim()) errors.push("prompt is required");
  if (typeof request?.systemPrompt !== "string" || !request.systemPrompt.trim()) errors.push("systemPrompt is required");
  return errors;
}

function result({role, status, provider = {}, token, output = null}) {
  return {
    role, status, transportSuccess: status === "TRANSPORT_SUCCESS", qualification: "NOT_ESTABLISHED",
    admissionAuthority: false, provider: {
      isError: provider.isError ?? null, subtype: provider.subtype ?? null, model: provider.model ?? null,
      stdoutSha256: provider.stdout ? digest(provider.stdout) : null,
      stderrSha256: provider.stderr ? digest(provider.stderr) : null,
      raw: provider.stdout ? redact(provider.stdout, token) : null,
      error: provider.error ? redact(provider.error, token) : null
    }, output
  };
}

function isolatedEnv(token, configDir, home, maxTurns) {
  const env = {
    PATH: process.env.PATH || "", HOME: home, CLAUDE_CONFIG_DIR: configDir,
    XDG_CONFIG_HOME: configDir, CLAUDE_CODE_OAUTH_TOKEN: token,
    CLAUDE_CODE_MAX_TURNS: String(maxTurns), NO_COLOR: "1"
  };
  if (process.env.LANG) env.LANG = process.env.LANG;
  return env;
}

export async function runHostedClaude({request, token, cli = "claude", timeoutMs = 240000, maxTurns = 1}) {
  const errors = validateRequest(request);
  if (errors.length) return result({role: request?.role || null, status: "INVALID_REQUEST", token, provider: {error: errors.join("; ")}});
  if (typeof token !== "string" || !token.trim()) return result({role: request.role, status: "AUTH_MISSING", token, provider: {error: "CLAUDE_CODE_OAUTH_TOKEN is absent"}});
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1000 || timeoutMs > 480000) return result({role: request.role, status: "INVALID_REQUEST", token, provider: {error: "timeoutMs must be an integer from 1000 through 480000"}});
  if (!Number.isInteger(maxTurns) || maxTurns < 1 || maxTurns > 10) return result({role: request.role, status: "INVALID_REQUEST", token, provider: {error: "maxTurns must be an integer from 1 through 10"}});

  const root = fs.mkdtempSync(path.join(os.tmpdir(), `newsstand-hosted-${request.role}-`));
  const configDir = path.join(root, "config");
  const home = path.join(root, "home");
  fs.mkdirSync(configDir); fs.mkdirSync(home);
  const args = ["--print", "--safe-mode", "--tools", "", "--permission-mode", "dontAsk", "--no-session-persistence", "--model", MODEL, "--effort", "medium", "--output-format", "json", "--json-schema", JSON.stringify(ROLE_SCHEMAS[request.role]), "--system-prompt", request.systemPrompt];
  try {
    const execution = await new Promise(resolve => {
      const child = spawn(cli, args, {cwd: root, env: isolatedEnv(token, configDir, home, maxTurns), stdio: ["pipe", "pipe", "pipe"]});
      let stdout = "", stderr = "", timedOut = false, outputLimited = false, spawnError = null, killTimer = null;
      const terminate = hard => child.kill(hard ? "SIGKILL" : "SIGTERM");
      const timer = setTimeout(() => { timedOut = true; terminate(false); killTimer = setTimeout(() => terminate(true), 1000); }, timeoutMs);
      child.stdout.setEncoding("utf8"); child.stderr.setEncoding("utf8");
      const capture = (current, chunk) => {
        const next = current + chunk;
        if (Buffer.byteLength(next) > MAX_CAPTURE_BYTES) { outputLimited = true; terminate(false); killTimer ??= setTimeout(() => terminate(true), 1000); return next.slice(0, MAX_CAPTURE_BYTES); }
        return next;
      };
      child.stdout.on("data", chunk => { stdout = capture(stdout, chunk); }); child.stderr.on("data", chunk => { stderr = capture(stderr, chunk); });
      child.on("error", error => { spawnError = error; });
      child.on("close", code => { clearTimeout(timer); if (killTimer) clearTimeout(killTimer); resolve({code, stdout, stderr, timedOut, outputLimited, spawnError}); });
      child.stdin.end(request.prompt);
    });
    if (execution.timedOut) return result({role: request.role, status: "TIMEOUT", token, provider: {stdout: execution.stdout, stderr: execution.stderr, error: "provider execution timed out"}});
    if (execution.outputLimited) return result({role: request.role, status: "OUTPUT_LIMIT", token, provider: {stdout: execution.stdout, stderr: execution.stderr, error: `provider output exceeded ${MAX_CAPTURE_BYTES} bytes`}});
    if (execution.spawnError) return result({role: request.role, status: "EXECUTION_ERROR", token, provider: {stdout: execution.stdout, stderr: execution.stderr, error: execution.spawnError.message}});
    let provider;
    try { provider = JSON.parse(execution.stdout); }
    catch { return result({role: request.role, status: "INVALID_PROVIDER_OUTPUT", token, provider: {stdout: execution.stdout, stderr: execution.stderr, error: "Claude did not return one JSON result"}}); }
    const details = {stdout: execution.stdout, stderr: execution.stderr, isError: provider.is_error, subtype: provider.subtype, model: Object.keys(provider.modelUsage || {})};
    if (execution.code !== 0 || provider.is_error === true) {
      const error = provider.error || `Claude exited ${execution.code}`;
      return result({role: request.role, status: /rate.?limit|429/i.test(error) ? "RATE_LIMITED" : "PROVIDER_ERROR", token, provider: {...details, error}});
    }
    if (provider.subtype !== "success") return result({role: request.role, status: "PROVIDER_INCOMPLETE", token, provider: {...details, error: "Claude did not report subtype success"}});
    if (!details.model.includes(MODEL) || !details.model.every(model => model.startsWith("claude-"))) return result({role: request.role, status: "MODEL_MISMATCH", token, provider: {...details, error: "Claude did not report the pinned model"}});
    const output = provider.structured_output;
    const allowedKeys = request.role === "writer" ? ["role", "draft"] : ["role", "verdict", "findings"];
    if (!output || typeof output !== "object" || Array.isArray(output) || Object.keys(output).some(key => !allowedKeys.includes(key)) || output.role !== request.role || (request.role === "writer" && !validWriterDraft(output.draft)) || (request.role === "reviewer" && (!["PASS", "HOLD", "REJECT"].includes(output.verdict) || !Array.isArray(output.findings) || output.findings.length === 0 || !output.findings.every(validReviewerFinding)))) {
      return result({role: request.role, status: "ROLE_OUTPUT_INVALID", token, provider: {...details, error: "structured output does not match the allowlisted role envelope"}});
    }
    return result({role: request.role, status: "TRANSPORT_SUCCESS", token, provider: details, output});
  } finally {
    fs.rmSync(root, {recursive: true, force: true});
  }
}

function parseArgs(argv) {
  const args = {timeoutMs: 240000, maxTurns: 1, cli: "claude"};
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (flag === "--request") args.requestPath = argv[++index];
    else if (flag === "--timeout-ms") args.timeoutMs = Number(argv[++index]);
    else if (flag === "--max-turns") args.maxTurns = Number(argv[++index]);
    else if (flag === "--cli") args.cli = argv[++index];
    else throw new Error("usage: node scripts/run-newsstand-hosted-claude.mjs --request <request.json> [--timeout-ms 1000..480000] [--max-turns 1..10] [--cli path]");
  }
  if (!args.requestPath) throw new Error("--request is required");
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const request = JSON.parse(fs.readFileSync(args.requestPath, "utf8"));
  const outcome = await runHostedClaude({request, token: process.env.CLAUDE_CODE_OAUTH_TOKEN, cli: args.cli, timeoutMs: args.timeoutMs, maxTurns: args.maxTurns});
  process.stdout.write(`${JSON.stringify(outcome, null, 2)}\n`);
  if (!outcome.transportSuccess) process.exitCode = 2;
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
