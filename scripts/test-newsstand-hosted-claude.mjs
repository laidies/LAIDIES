#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runner = path.join(ROOT, "scripts/run-newsstand-hosted-claude.mjs");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "newsstand-hosted-claude-test-"));
const fake = path.join(temp, "fake-claude.mjs");
fs.writeFileSync(fake, `#!/usr/bin/env node
let prompt=""; for await (const c of process.stdin) prompt+=c;
if(!process.env.CLAUDE_CODE_OAUTH_TOKEN) process.exit(91);
if(process.env.HOME.includes("/Users/alisoneakin") || !process.env.CLAUDE_CONFIG_DIR || process.env.CLAUDE_CODE_MAX_TURNS!=="1") process.exit(92);
const args=process.argv.slice(2).join(" "); if(!args.includes("--print")||!args.includes("--safe-mode")||!args.includes("--no-session-persistence")||!args.includes("--json-schema")) process.exit(93);
if(prompt.includes("timeout")){setTimeout(()=>{},5000);}
if(prompt.includes("refusal")){console.log(JSON.stringify({is_error:true,subtype:"error",error:"refused",modelUsage:{"claude-fable-5":{}}}));process.exit(1);}
if(prompt.includes("rate")){console.log(JSON.stringify({is_error:true,subtype:"error",error:"rate limit",modelUsage:{"claude-fable-5":{}}}));process.exit(1);}
if(prompt.includes("wrong")){console.log(JSON.stringify({is_error:false,subtype:"success",modelUsage:{"claude-fable-5":{}},structured_output:{role:"writer",draft:{}}}));process.exit(0);}
const role=prompt.includes("reviewer")?"reviewer":"writer";
const structured_output=role==="writer"?{role,draft:{body:"draft"}}:{role,verdict:"HOLD",findings:["needs source"]};
console.log(JSON.stringify({is_error:false,subtype:"success",modelUsage:{"claude-fable-5":{}},structured_output}));
`);
fs.chmodSync(fake, 0o755);
const writeRequest = (name, role, prompt) => {
  const value = path.join(temp, `${name}.json`);
  fs.writeFileSync(value, JSON.stringify({role, prompt, systemPrompt: "Return only the supplied role envelope."}));
  return value;
};
const invoke = (request, env = {}, extra = []) => spawnSync(process.execPath, [runner, "--request", request, "--timeout-ms", "1000", "--max-turns", "1", "--cli", fake, ...extra], {cwd: ROOT, env: {PATH: process.env.PATH, ...env}, encoding: "utf8", timeout: 5000});
const parsed = result => JSON.parse(result.stdout);

const missing = invoke(writeRequest("missing", "writer", "writer missing"));
assert.equal(missing.status, 2); assert.equal(parsed(missing).status, "AUTH_MISSING");

const timeout = invoke(writeRequest("timeout", "writer", "writer timeout"), {CLAUDE_CODE_OAUTH_TOKEN: "test-token"});
assert.equal(timeout.status, 2); assert.equal(parsed(timeout).status, "TIMEOUT");

const refusal = invoke(writeRequest("refusal", "reviewer", "reviewer refusal"), {CLAUDE_CODE_OAUTH_TOKEN: "test-token"});
assert.equal(refusal.status, 2); assert.equal(parsed(refusal).status, "PROVIDER_ERROR");

const rateLimited = invoke(writeRequest("rate", "reviewer", "reviewer rate"), {CLAUDE_CODE_OAUTH_TOKEN: "test-token"});
assert.equal(rateLimited.status, 2); assert.equal(parsed(rateLimited).status, "RATE_LIMITED");

const wrong = invoke(writeRequest("wrong", "reviewer", "reviewer wrong"), {CLAUDE_CODE_OAUTH_TOKEN: "test-token"});
assert.equal(wrong.status, 2); assert.equal(parsed(wrong).status, "ROLE_OUTPUT_INVALID");

const success = invoke(writeRequest("success", "reviewer", "reviewer success"), {CLAUDE_CODE_OAUTH_TOKEN: "test-token"});
assert.equal(success.status, 0); const output = parsed(success);
assert.equal(output.status, "TRANSPORT_SUCCESS"); assert.equal(output.qualification, "NOT_ESTABLISHED"); assert.equal(output.admissionAuthority, false); assert.equal(output.output.verdict, "HOLD");
const writerSuccess = invoke(writeRequest("writer-success", "writer", "writer success"), {CLAUDE_CODE_OAUTH_TOKEN: "test-token"});
assert.equal(writerSuccess.status, 0); assert.equal(parsed(writerSuccess).output.role, "writer");
for (const result of [missing, timeout, refusal, rateLimited, wrong, success, writerSuccess]) assert.doesNotMatch(`${result.stdout}\n${result.stderr}`, /test-token/, "credential must not be emitted");
fs.rmSync(temp, {recursive: true, force: true});
console.log("NEWSSTAND HOSTED CLAUDE TEST PASS auth_missing=1 timeout=1 provider_error=1 rate_limit=1 role_rejection=1 writer_transport=1 reviewer_transport=1");
