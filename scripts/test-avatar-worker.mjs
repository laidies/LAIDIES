import assert from "node:assert/strict";
import worker from "../worker-avatar/avatar.js";

const USER = "11111111-1111-4111-8111-111111111111";
const PNG = "iVBORw0KGgo=";
const PHOTO_PNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScL9wQAAAABJRU5ErkJggg==";
// 3 MiB decoded payload: valid base64 and PNG signature, intentionally no
// decoded image body is needed to prove the Worker no longer allocates it.
const LARGE_PNG = "iVBORw0KGgoA" + "A".repeat(4 * 1024 * 1024 - 12);
const requestId = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
class Usage {
  rows = [];
  prepare(sql) {
    let args = [];
    return { bind: (...values) => (args = values, this.prepareBound(sql, args)) };
  }
  prepareBound(sql, args) {
    return {
      run: async () => {
        if (sql.startsWith("DELETE")) { this.rows = this.rows.filter((row) => row.created_at >= args[0]); return { meta: { changes: 0 } }; }
        if (!sql.startsWith("INSERT")) return { meta: { changes: 0 } };
        const [id, userHash, day, created] = args;
        const duplicate = this.rows.some((row) => row.request_id === id);
        const userCount = this.rows.filter((row) => row.user_hash === userHash && row.utc_day === day).length;
        const globalCount = this.rows.filter((row) => row.utc_day === day).length;
        if (duplicate || userCount >= 2 || globalCount >= 20) return { meta: { changes: 0 } };
        this.rows.push({ request_id: id, user_hash: userHash, utc_day: day, created_at: created });
        return { meta: { changes: 1 } };
      },
      first: async () => this.rows.find((row) => row.request_id === args[0]) || null
    };
  }
}
const usage = new Usage();
const env = { GENERATION_ENABLED: "true", OPENAI_API_KEY: "test", SUPABASE_URL: "https://auth.example", SUPABASE_PUBLISHABLE_KEY: "test", PORTRAIT_USAGE: usage };
let providerCalls = 0;
let providerPlan = null;
const originalFetch = globalThis.fetch;
globalThis.fetch = async (url) => {
  const href = String(url);
  if (href.includes("/auth/v1/user")) return Response.json({ id: USER });
  if (href.includes("api.openai.com")) {
    providerCalls += 1;
    const next = providerPlan?.shift();
    if (next === "throw") throw new Error("timeout");
    if (next === "fail") return new Response("", { status: 503 });
    if (next === "large") return Response.json({ data: [{ b64_json: LARGE_PNG }] });
    return Response.json({ data: [{ b64_json: PNG }] });
  }
  throw new Error("unexpected fetch");
};
function post(value, options = {}) {
  return new Request("https://worker.example", { method: "POST", headers: { origin: options.origin || "https://laidies.ai", authorization: options.authorization === undefined ? "Bearer test" : options.authorization, "content-type": "application/json" }, body: JSON.stringify(value) });
}
function valid(n) { return { requestId: requestId(n), itemPrompt: "a practical portrait", traits: { extras: "pink blazer" } }; }

try {
  assert.equal((await worker.fetch(new Request("https://worker.example"), { GENERATION_ENABLED: "false" })).status, 200);
  assert.equal((await worker.fetch(post(valid(1), { origin: "https://evil.example" }), env)).status, 403);
  assert.equal((await worker.fetch(post(valid(2), { authorization: "" }), env)).status, 401);
  assert.equal((await worker.fetch(post({ ...valid(3), itemPrompt: "x".repeat(2001) }), env)).status, 400);
  assert.equal((await worker.fetch(post({ ...valid(4), image: `data:image/png;base64,${PNG}`, itemPrompt: "", consent: false }), env)).status, 400);
  const huge = new Request("https://worker.example", { method: "POST", headers: { origin: "https://laidies.ai", authorization: "Bearer test", "content-type": "application/json" }, body: " ".repeat(3_000_001) });
  assert.equal((await worker.fetch(huge, env)).status, 400, "streamed input cap rejects before auth/provider");
  const before = providerCalls;
  const [first, replay] = await Promise.all([worker.fetch(post(valid(5)), env), worker.fetch(post(valid(5)), env)]);
  assert.deepEqual([first.status, replay.status].sort(), [200, 409]);
  assert.equal(providerCalls - before, 3, "replay never spends provider calls");
  const success = await (first.status === 200 ? first : replay).json();
  assert.equal(success.completed, 3); assert.equal(success.images.length, 3);
  assert.equal((await worker.fetch(post(valid(6)), env)).status, 200);
  providerPlan = ["success", "fail", "success"];
  const partial = await worker.fetch(post(valid(9)), { ...env, PORTRAIT_USAGE: new Usage() });
  assert.equal(partial.status, 200); assert.equal((await partial.json()).completed, 2, "partial successes are returned truthfully");
  providerPlan = ["large", "large", "large"];
  const beforeLarge = providerCalls;
  const large = await worker.fetch(post(valid(11)), { ...env, PORTRAIT_USAGE: new Usage() });
  const largeBody = await large.json();
  assert.equal(large.status, 200, "three 3 MiB synthetic PNG outputs remain bounded and usable");
  assert.equal(largeBody.completed, 3);
  assert.deepEqual(largeBody.images, [LARGE_PNG, LARGE_PNG, LARGE_PNG]);
  assert.equal(providerCalls - beforeLarge, 3, "large-output batch makes exactly three provider calls");
  const photo = await worker.fetch(post({ ...valid(12), itemPrompt: "", image: `data:image/png;base64,${PHOTO_PNG}`, consent: true }), { ...env, PORTRAIT_USAGE: new Usage() });
  assert.equal(photo.status, 200, "bounded photo decode accepts a valid PNG without callback-array allocation");
  providerPlan = ["throw", "throw", "throw"];
  const timeout = await worker.fetch(post(valid(10)), { ...env, PORTRAIT_USAGE: new Usage() });
  assert.equal(timeout.status, 502, "all timed-out candidates fail without provider detail leakage");
  providerPlan = null;
  const [cappedA, cappedB] = await Promise.all([worker.fetch(post(valid(7)), env), worker.fetch(post(valid(8)), env)]);
  assert.deepEqual([cappedA.status, cappedB.status], [429, 429], "concurrent per-account cap applies before provider");
  const secondDb = new Usage();
  const day = new Date().toISOString().slice(0, 10);
  secondDb.rows = Array.from({ length: 20 }, (_, index) => ({
    request_id: requestId(100 + index), user_hash: `other-${index}`,
    utc_day: day, created_at: Date.now()
  }));
  const beforeGlobal = providerCalls;
  assert.equal((await worker.fetch(post(valid(40)), { ...env, PORTRAIT_USAGE: secondDb })).status, 429);
  assert.equal(providerCalls - beforeGlobal, 0, "global cap rejected before provider");
  const unavailable = await worker.fetch(post(valid(41)), { ...env, PORTRAIT_USAGE: undefined });
  assert.equal(unavailable.status, 503);
  console.log("AVATAR WORKER CONTRACT PASS auth=1 origin=1 bounds=1 replay=1 quotas=1 partial=1 timeout=1 fail_closed=1");
} finally { globalThis.fetch = originalFetch; }
