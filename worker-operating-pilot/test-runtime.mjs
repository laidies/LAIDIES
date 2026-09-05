import assert from "node:assert/strict";
import { createServer } from "node:net";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const workflow = "laidies-operating-handoff-pilot";
const receiptJson = await readFile(join(root, "operations/runtime/hosted-handoff-pilot-20260905/receipt.json"), "utf8");
const receiptSha256 = "503a473018442c5a114586584dfd015c61503283b80784095e705b04b1a57b87";
const persistTo = await mkdtemp(join(tmpdir(), "laidies-handoff-runtime-"));
let dev;
const activeChildren = new Set();

function killProcessGroup(child, signal) {
  if (!child?.pid) return;
  try {
    process.kill(-child.pid, signal);
  } catch (error) {
    if (error?.code !== "ESRCH") child.kill(signal);
  }
}

async function stopProcessGroup(child) {
  if (!child?.pid || !processGroupExists(child)) return;
  killProcessGroup(child, "SIGTERM");
  let deadline = Date.now() + 5_000;
  while (processGroupExists(child) && Date.now() < deadline) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  if (!processGroupExists(child)) return;
  killProcessGroup(child, "SIGKILL");
  deadline = Date.now() + 2_000;
  while (processGroupExists(child) && Date.now() < deadline) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

function processGroupExists(child) {
  if (!child?.pid) return false;
  try {
    process.kill(-child.pid, 0);
    return true;
  } catch (error) {
    if (error?.code === "ESRCH") return false;
    throw error;
  }
}

function run(command, args, { timeoutMs = 30_000 } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, detached: true, stdio: ["ignore", "pipe", "pipe"] });
    activeChildren.add(child);
    let stdout = "";
    let stderr = "";
    let settled = false;
    const finish = (callback, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      callback(value);
    };
    const timeout = setTimeout(async () => {
      await stopProcessGroup(child);
      finish(reject, new Error(`${command} timed out after ${timeoutMs}ms\n${stdout}\n${stderr}`));
    }, timeoutMs);
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", (error) => { activeChildren.delete(child); finish(reject, error); });
    child.on("close", (code, signal) => {
      activeChildren.delete(child);
      finish(resolve, { code, signal, stdout, stderr });
    });
  });
}

async function freePort() {
  return await new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close((error) => error ? reject(error) : resolve(port));
    });
  });
}

function wranglerArgs(port, args) {
  return ["exec", "--yes", "--package=wrangler@4.129.0", "--", "wrangler", ...args, "--local", "--port", String(port)];
}

function jsonOutput(result, label) {
  assert.equal(result.code, 0, `${label} failed\n${result.stdout}\n${result.stderr}`);
  try {
    return JSON.parse(result.stdout);
  } catch (error) {
    throw new Error(`${label} did not return JSON\n${result.stdout}\n${result.stderr}\n${error.message}`);
  }
}

function authorityIsFalse(authority) {
  return authority?.public === false &&
    authority?.deploy === false &&
    authority?.spend === false &&
    authority?.ali_approval === false &&
    authority?.editorialDisposition === false;
}

function hasNonRetryableStepError(instance, stepName, message) {
  const step = instance.steps?.find((candidate) => candidate.name === `${stepName}-1`);
  return step?.success === false &&
    step.attempts?.[0]?.error?.name === "WorkflowFatalError" &&
    step.attempts?.[0]?.error?.message === `Step threw a NonRetryableError with message "NonRetryableError: ${message}"`;
}

async function waitForInstance(port, id, predicate, label, timeoutMs = 20_000, workflowName = workflow) {
  const deadline = Date.now() + timeoutMs;
  let last = "";
  while (Date.now() < deadline) {
    const described = await run("npm", wranglerArgs(port, ["workflows", "instances", "describe", workflowName, id, "--json"]));
    if (described.code === 0) {
      const instance = jsonOutput(described, `${label} describe`);
      last = JSON.stringify(instance);
      if (predicate(instance)) return instance;
    } else {
      last = `${described.stdout}\n${described.stderr}`;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`${label} did not reach its expected state\n${last}`);
}

function params(workId, waitSeconds = 5) {
  return JSON.stringify({ workId, receiptJson, receiptSha256, waitSeconds });
}

async function trigger(port, id, payload) {
  return jsonOutput(await run("npm", wranglerArgs(port, ["workflows", "trigger", workflow, payload, "--id", id, "--json"])), `trigger ${id}`);
}

async function sendEvent(port, id, payload) {
  return jsonOutput(await run("npm", wranglerArgs(port, ["workflows", "instances", "send-event", workflow, id, "--type", "operator-ack", "--payload", JSON.stringify(payload), "--json"])), `send event ${id}`);
}

const hardDeadline = setTimeout(() => {
  console.error("OPERATING HANDOFF PILOT RUNTIME FAIL: hard 90s deadline exceeded");
  Promise.all([...activeChildren, dev].map(stopProcessGroup)).finally(() => process.exit(1));
}, 90_000);

try {
  const port = await freePort();
  dev = spawn("npm", [
    "exec", "--yes", "--package=wrangler@4.129.0", "--", "wrangler", "dev",
    "--config", "worker-operating-pilot/wrangler.jsonc", "--local", "--port", String(port),
    "--persist-to", persistTo, "--log-level", "error", "--show-interactive-dev-session", "false"
  ], { cwd: root, detached: true, stdio: ["ignore", "pipe", "pipe"] });
  let devOutput = "";
  dev.stdout.on("data", (chunk) => { devOutput += chunk; });
  dev.stderr.on("data", (chunk) => { devOutput += chunk; });
  await new Promise((resolve, reject) => {
    let settled = false;
    const finish = (callback, value) => {
      if (settled) return;
      settled = true;
      clearInterval(interval);
      clearTimeout(timeout);
      callback(value);
    };
    const timeout = setTimeout(() => finish(reject, new Error(`wrangler dev did not become ready in 60s\n${devOutput}`)), 60_000);
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`http://127.0.0.1:${port}/`);
        if (response.status === 404) {
          finish(resolve);
        }
      } catch {
        // The dev server has not bound its local port yet.
      }
    }, 250);
    const fail = (error) => finish(reject, error);
    const ready = () => {
      if (/Ready|http:\/\/127\.0\.0\.1:/i.test(devOutput)) {
        finish(resolve);
      }
    };
    dev.stdout.on("data", ready);
    dev.stderr.on("data", ready);
    dev.once("error", fail);
    dev.once("exit", (code) => fail(new Error(`wrangler dev exited early (${code})\n${devOutput}`)));
  });

  const boundary = await fetch(`http://127.0.0.1:${port}/`);
  assert.equal(boundary.status, 404, "local fetch boundary must return 404");

  const founderWorkflow = "laidies-founder-decision-pilot";
  const founderId = "runtime-founder-invalid-001";
  jsonOutput(await run("npm", wranglerArgs(port, ["workflows", "trigger", founderWorkflow,
    JSON.stringify({ workId: founderId, action: "APPROVE" }), "--id", founderId, "--json"])), "trigger malformed founder request");
  await waitForInstance(port, founderId, instance => instance.status === "errored" &&
    hasNonRetryableStepError(instance, "bind private decision request", "invalid decision input fields"),
    "founder request rejection before any network request", 20_000, founderWorkflow);

  const mismatchId = "runtime-mismatch-001";
  await trigger(port, mismatchId, params("runtime-other-001"));
  await waitForInstance(port, mismatchId, (instance) =>
    instance.status === "errored" &&
    instance.error?.name === "WorkflowFatalError" &&
    hasNonRetryableStepError(instance, "validate receipt and checkpoint handoff", "workId must equal workflow instance ID"), "mismatched work ID");

  const timeoutId = "runtime-timeout-001";
  await trigger(port, timeoutId, params(timeoutId, 1));
  await waitForInstance(port, timeoutId, (instance) =>
    instance.status === "complete" &&
    instance.error === null &&
    instance.output?.status === "HOLD_NO_ACKNOWLEDGEMENT" &&
    instance.output?.workId === timeoutId &&
    instance.output?.receiptSha256 === receiptSha256 &&
    instance.output?.editorialReviewStillRequired === true &&
    authorityIsFalse(instance.output?.authority_truth), "timeout HOLD", 25_000);

  const acknowledgeId = "runtime-ack-001";
  await trigger(port, acknowledgeId, params(acknowledgeId, 30));
  await sendEvent(port, acknowledgeId, { workId: acknowledgeId, receiptSha256, decisionId: "operator-runtime-001", action: "ACKNOWLEDGE" });
  await waitForInstance(port, acknowledgeId, (instance) =>
    instance.status === "complete" &&
    instance.error === null &&
    instance.output?.status === "ACKNOWLEDGED_FOR_REVIEW" &&
    instance.output?.workId === acknowledgeId &&
    instance.output?.receiptSha256 === receiptSha256 &&
    instance.output?.decisionId === "operator-runtime-001" &&
    instance.output?.action === "ACKNOWLEDGE" &&
    instance.output?.acceptanceKind === "CONTROL_PLANE_OPERATOR_ONLY" &&
    instance.output?.editorialDisposition === false &&
    instance.output?.editorialReviewStillRequired === true &&
    authorityIsFalse(instance.output?.authority_truth), "valid acknowledgement");

  const wrongHashId = "runtime-wrong-hash-001";
  await trigger(port, wrongHashId, params(wrongHashId, 30));
  await sendEvent(port, wrongHashId, { workId: wrongHashId, receiptSha256: "f".repeat(64), decisionId: "operator-runtime-002", action: "ACKNOWLEDGE" });
  await waitForInstance(port, wrongHashId, (instance) =>
    instance.status === "errored" &&
    instance.error?.name === "WorkflowFatalError" &&
    hasNonRetryableStepError(instance, "record explicit operator result", "acknowledgement receipt SHA mismatch"), "wrong acknowledgement hash");

  console.log("OPERATING HANDOFF PILOT RUNTIME PASS");
  console.log("calibration=mismatched-instance-workId rejected,timeout HOLD,exact-event ACKNOWLEDGED_FOR_REVIEW,wrong-event-hash rejected,local-fetch-404");
  console.log("founder-runtime=malformed-request-nonretryable-before-network");
} finally {
  clearTimeout(hardDeadline);
  await Promise.all([...activeChildren].map(stopProcessGroup));
  await stopProcessGroup(dev);
  assert.equal(processGroupExists(dev), false, "the owned Wrangler dev process group must be gone after cleanup");
  console.log("cleanup=owned-wrangler-process-group-gone");
  await rm(persistTo, { recursive: true, force: true });
}
