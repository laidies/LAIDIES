export const SUPABASE_ORIGIN = "https://swqnkxzebxdbgyrzpdne.supabase.co";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const HASH = /^[0-9a-f]{64}$/;
const encoder = new TextEncoder();
export class DecisionContractError extends Error {}
function requireThat(condition, message) {
  if (!condition) throw new DecisionContractError(message);
}
function object(value) { return value !== null && typeof value === "object" && !Array.isArray(value); }
function exactKeys(value, keys) {
  return object(value) && Object.keys(value).sort().join(",") === [...keys].sort().join(",");
}
function date(value) { return typeof value === "string" && Number.isFinite(Date.parse(value)); }
function uuid(value) { return typeof value === "string" && UUID.test(value); }
function hash(value) { return typeof value === "string" && HASH.test(value); }
function publicKeyOnly(value) {
  if (typeof value !== "string" || value.length <= 20 || value.length >= 4096) return false;
  if (/^sb_publishable_[A-Za-z0-9_-]+$/.test(value)) return true;
  // Classification only; Supabase verifies the actual key. Never accept a service key.
  try {
    const parts = value.split(".");
    return parts.length === 3 && JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))).role === "anon";
  } catch { return false; }
}

export function validateFounderInput(input, instanceId) {
  requireThat(exactKeys(input, ["workId", "requestId", "reviewSha256", "artifactSha256", "readCapability"]), "invalid decision input fields");
  requireThat(encoder.encode(JSON.stringify(input)).byteLength <= 2048, "decision input too large");
  requireThat(typeof input.workId === "string" && /^[A-Za-z0-9][A-Za-z0-9_-]{2,79}$/.test(input.workId) && input.workId === instanceId, "invalid decision work ID");
  requireThat(uuid(input.requestId) && hash(input.reviewSha256) && hash(input.artifactSha256) && hash(input.readCapability), "invalid decision binding");
  // The capability stays in the private Workflow input, never a checkpoint output.
  const { readCapability, ...checkpoint } = input;
  return checkpoint;
}

export function validateCanonicalDecision(value, checkpoint) {
  requireThat(exactKeys(value, ["request_id", "work_id", "review_sha256", "artifact_sha256", "expires_at", "status", "decision_id", "actor_id", "decided_at"]), "invalid canonical decision shape");
  requireThat(value.request_id === checkpoint.requestId && value.work_id === checkpoint.workId && value.review_sha256 === checkpoint.reviewSha256 && value.artifact_sha256 === checkpoint.artifactSha256, "canonical decision binding mismatch");
  requireThat(date(value.expires_at), "invalid decision expiry");
  requireThat(["PENDING", "EXPIRED", "REVOKED", "ACKNOWLEDGE", "HOLD"].includes(value.status), "invalid canonical decision status");
  if (["ACKNOWLEDGE", "HOLD"].includes(value.status)) {
    requireThat(uuid(value.decision_id) && uuid(value.actor_id) && date(value.decided_at) && Date.parse(value.decided_at) <= Date.parse(value.expires_at), "invalid persisted actor decision");
  } else {
    requireThat(value.decision_id === null && value.actor_id === null && value.decided_at === null, "unexpected persisted decision");
  }
  return value;
}

export function validateResumption(value, checkpoint, decision) {
  const outcome = decision.status === "ACKNOWLEDGE" ? "ACKNOWLEDGED_FOR_REVIEW" : "HOLD";
  requireThat(exactKeys(value, ["request_id", "decision_id", "work_id", "outcome", "created_at"]), "invalid resumption shape");
  requireThat(value.request_id === checkpoint.requestId && value.decision_id === decision.decision_id && value.work_id === checkpoint.workId && value.outcome === outcome && date(value.created_at), "resumption binding mismatch");
  return { ...checkpoint, decisionId: value.decision_id, actorId: decision.actor_id, status: outcome,
    acceptanceKind: "AUTHENTICATED_FOUNDER_REVIEW_ROUTING", authority_truth: { public: false, deploy: false, spend: false, editorialDisposition: false } };
}

// No provider error body, credential, capability or private review text enters errors.
export async function decisionRpc(publicKey, name, payload, fetcher = fetch) {
  requireThat(publicKeyOnly(publicKey), "decision service requires a public key");
  requireThat(["read_operating_decision_v1", "record_operating_resumption_v1"].includes(name), "unsupported decision RPC");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  let reader;
  try {
    const response = await fetcher(`${SUPABASE_ORIGIN}/rest/v1/rpc/${name}`, {
      method: "POST", redirect: "error", signal: controller.signal,
      headers: { apikey: publicKey, "Content-Type": "application/json" }, body: JSON.stringify(payload)
    });
    if (!response.ok || !response.body) throw new Error("RPC unavailable");
    reader = response.body.getReader();
    const chunks = []; let size = 0;
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16_384) throw new DecisionContractError("decision response too large");
      chunks.push(value);
    }
    const bytes = new Uint8Array(size); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch (error) {
    if (error instanceof DecisionContractError) throw error;
    throw new Error("decision service request failed");
  } finally {
    clearTimeout(timer);
    if (reader) { try { await reader.cancel(); } catch {} reader.releaseLock(); }
  }
}

export async function runFounderDecision(event, step, rpc, permanentError = error => error) {
  function checked(fn) {
    try { return fn(); } catch (error) { throw permanentError(error); }
  }
  const checkpoint = await step.do("bind private decision request", () => checked(() => validateFounderInput(event.payload, event.instanceId)));
  const capability = event.payload.readCapability;
  const retry = { retries: { limit: 2, delay: "5 seconds", backoff: "exponential" }, timeout: "15 seconds" };
  // At most 24 hours of half-hour fallback waits. Events are wake-up hints only.
  for (let attempt = 0; attempt < 49; attempt++) {
    const decision = await step.do(`read saved decision ${attempt}`, retry, async () => {
      const value = await rpc("read_operating_decision_v1", { p_request_id: checkpoint.requestId, p_capability: capability });
      return checked(() => validateCanonicalDecision(value, checkpoint));
    });
    if (["ACKNOWLEDGE", "HOLD"].includes(decision.status)) {
      return step.do("persist exact decision resumption", retry, async () => {
        const value = await rpc("record_operating_resumption_v1", {
          p_request_id: checkpoint.requestId, p_capability: capability, p_decision_id: decision.decision_id,
          p_work_id: checkpoint.workId, p_outcome: decision.status === "ACKNOWLEDGE" ? "ACKNOWLEDGED_FOR_REVIEW" : "HOLD"
        });
        return checked(() => validateResumption(value, checkpoint, decision));
      });
    }
    if (["EXPIRED", "REVOKED"].includes(decision.status)) return { ...checkpoint, status: `HOLD_${decision.status}` };
    if (attempt < 48) {
      try { await step.waitForEvent(`decision wake hint ${attempt}`, { type: "decision-saved", timeout: "30 minutes" }); }
      catch { /* A missing wake hint never grants authority; re-read the database. */ }
    }
  }
  return { ...checkpoint, status: "HOLD_WAIT_LIMIT" };
}
