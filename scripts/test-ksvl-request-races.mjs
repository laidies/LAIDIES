import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const source = fs.readFileSync(path.join(root, "content/site/ksvl-requests-v1.js"), "utf8");
const DRAFT_KEY = "laidies_ksvl_request_draft_v1";
const PENDING_KEY = "laidies_ksvl_request_submission_v1";
const DAY = 86_400_000;
const RECEIPT = "22222222-2222-4222-8222-222222222222";
let fixtureSequence = 0;
const account = (id, token = `${id}-token`) => ({ user: { id }, access_token: token });
const payload = (topic = "An unchanged private idea") => ({
  song_style: "y2k-pop-anthem", topic, lyric_ideas: null
});
const deferred = () => {
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  return { promise, resolve };
};
async function settle() {
  // Drain promise continuations and the client's zero-delay auth bootstrap.
  await new Promise((resolve) => setTimeout(resolve, 0));
  await new Promise((resolve) => setTimeout(resolve, 0));
}

function element() {
  return {
    value: "", textContent: "", disabled: false, children: [], listeners: {},
    classList: { add() {} }, setAttribute() {}, focus() {},
    addEventListener(name, listener) { this.listeners[name] = listener; },
    replaceChildren(...children) { this.children = children; this.textContent = ""; },
    append(...children) { this.children.push(...children); },
    appendChild(child) { this.children.push(child); }
  };
}

function fixture(text, options = {}) {
  const instanceId = String(++fixtureSequence).padStart(4, "0");
  const storage = options.storage || new Map();
  const ids = Object.fromEntries([
    "ksvl-req-style", "ksvl-req-topic", "ksvl-req-lyrics", "ksvl-request-form",
    "ksvl-req-status", "ksvl-req-submit", "ksvl-req-save-draft",
    "ksvl-req-clear-draft", "ksvl-req-abandon-pending", "ksvl-req-list"
  ].map((id) => [id, element()]));
  ids["ksvl-request-form"].reset = () => {
    for (const key of ["style", "topic", "lyrics"]) ids[`ksvl-req-${key}`].value = "";
  };
  let clock = options.clock || Date.now();
  let session = Object.hasOwn(options, "session") ? options.session : account("owner-a");
  let authChange;
  let uuidSequence = 0;
  let sessionHook = null;
  let submitHandler = async () => ({ error: { message: "synthetic-response-lost" } });
  const submissions = [];
  const runtime = {
    controller: {
      async getSession() {
        return sessionHook ? sessionHook(session) : session;
      }
    },
    client: {
      auth: {
        onAuthStateChange(listener) {
          authChange = listener;
          queueMicrotask(() => listener("INITIAL_SESSION", session));
          return { data: { subscription: { unsubscribe() {} } } };
        }
      },
      rpc(name, args) {
        return {
          async setHeader(header, value) {
            assert.equal(header, "Authorization");
            if (name === "list_my_ksvl_song_requests_v1") return { data: [], error: null };
            if (name === "submit_my_ksvl_song_request_v1") {
              submissions.push({ args: structuredClone(args), authorization: value });
              return submitHandler();
            }
            throw new Error(`Unexpected fixture RPC: ${name}`);
          }
        };
      }
    }
  };
  const sandbox = {
    window: null, Promise, setTimeout, clearTimeout,
    Date: { now: () => clock },
    document: { getElementById: (id) => ids[id] || null, createElement: element },
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: (key) => storage.delete(key)
    },
    crypto: {
      randomUUID: () => `11111111-${instanceId}-4111-8111-${String(++uuidSequence).padStart(12, "0")}`
    },
    confirm: () => true,
    LAIDIESResidentAccountRuntime: { get: async () => runtime }
  };
  sandbox.window = sandbox;
  vm.runInNewContext(text, sandbox, { filename: "ksvl-requests-v1.js" });
  return {
    ids, storage, submissions,
    async init() { await sandbox.LAIDIESKSVLRequestsV1.init(); await settle(); },
    fill(value = payload()) {
      ids["ksvl-req-style"].value = value.song_style;
      ids["ksvl-req-topic"].value = value.topic;
      ids["ksvl-req-lyrics"].value = value.lyric_ideas || "";
    },
    submit() { ids["ksvl-request-form"].listeners.submit({ preventDefault() {} }); },
    change(next, event = next ? "SIGNED_IN" : "SIGNED_OUT") {
      session = next;
      assert.ok(authChange, "auth listener was not installed");
      authChange(event, next);
    },
    advance(ms) { clock += ms; },
    onSubmit(handler) { submitHandler = handler; },
    onSession(handler) { sessionHook = handler; },
    pending() { return JSON.parse(storage.get(PENDING_KEY) || "null"); }
  };
}

async function staleCompletionAfterAccountSwitch(text) {
  const first = fixture(text);
  await first.init();
  const response = deferred();
  first.onSubmit(() => response.promise);
  first.fill(payload("Account A private idea"));
  first.submit();
  await settle();
  assert.equal(first.submissions.length, 1);
  assert.equal(first.submissions[0].authorization, "Bearer owner-a-token");
  first.change(account("owner-b"));
  await settle();
  first.fill(payload("Account B newly typed idea"));

  // A real second VM/tab shares localStorage but has its own request controller.
  // Its unknown-result B request must not be erased by the old A completion.
  const second = fixture(text, { storage: first.storage, session: account("owner-b") });
  await second.init();
  second.fill(payload("Account B other-tab pending idea"));
  second.submit();
  await settle();
  const pendingB = first.storage.get(PENDING_KEY);
  assert.equal(first.pending().owner_id, "owner-b");
  response.resolve({ data: { state: "received", receipt_id: RECEIPT }, error: null });
  await settle();
  assert.equal(first.ids["ksvl-req-topic"].value, "Account B newly typed idea", "stale A completion cleared B's current text");
  assert.equal(first.storage.get(PENDING_KEY), pendingB, "stale A completion erased B's retry key");
  assert.doesNotMatch(first.ids["ksvl-req-status"].textContent, /Received for station review/, "stale A completion displayed an A receipt to B");
}

async function sameOwnerTokenRefresh(text) {
  const page = fixture(text);
  await page.init();
  const response = deferred();
  page.onSubmit(() => response.promise);
  page.fill();
  page.submit();
  await settle();
  const key = page.pending().idempotency_key;
  page.change(account("owner-a", "owner-a-refreshed"), "TOKEN_REFRESHED");
  response.resolve({ data: { state: "received", receipt_id: RECEIPT }, error: null });
  await settle();
  assert.equal(page.submissions.length, 1);
  assert.equal(page.submissions[0].args.p_idempotency_key, key);
  assert.equal(page.submissions[0].authorization, "Bearer owner-a-token", "RPC lost the captured session header");
  assert.match(page.ids["ksvl-req-status"].textContent, /Received for station review/, "same-owner token refresh discarded a confirmed receipt");
  assert.equal(page.pending(), null, "confirmed request retained an unresolved retry key");
}

async function expiredUnknownRetry(text) {
  const page = fixture(text);
  await page.init();
  page.fill();
  page.submit();
  await settle();
  const key = page.pending().idempotency_key;
  assert.equal(page.submissions.length, 1);
  page.advance(DAY + 1);
  page.submit();
  await settle();
  assert.equal(page.submissions.length, 1, "expired unknown-result retry silently made another submission");
  assert.equal(page.pending()?.idempotency_key, key, "expired unknown result lost its reconciliation key");
  assert.equal(page.pending().expired, true);
  assert.equal(Object.hasOwn(page.pending(), "payload"), false, "expired pending marker retained private text");
  assert.match(page.ids["ksvl-req-status"].textContent, /prior request has an unknown result|needs reconciliation/i);
}

async function anonymousInitialAuthEvent(text) {
  const storage = new Map();
  storage.set(DRAFT_KEY, JSON.stringify({ owner_id: null, saved_at: Date.now(), payload: payload("Anonymous saved draft") }));
  const page = fixture(text, { session: null, storage });
  await page.init();
  assert.equal(page.ids["ksvl-req-topic"].value, "Anonymous saved draft", "INITIAL_SESSION cleared the same anonymous draft");
  assert.ok(storage.has(DRAFT_KEY), "INITIAL_SESSION removed the anonymous draft from storage");
  assert.equal(page.submissions.length, 0);
}

async function accountRoundTripDuringFinalConfirmation(text) {
  const page = fixture(text);
  await page.init();
  const finalSession = deferred();
  let reads = 0;
  // Submit reads: initial capture, RPC preflight, RPC postflight, then the
  // consumer's final receipt check. Hold that last read across an A -> B -> A.
  page.onSession((current) => ++reads === 4 ? finalSession.promise : current);
  page.onSubmit(async () => ({ data: { state: "received", receipt_id: RECEIPT }, error: null }));
  page.fill(payload("Old A request"));
  page.submit();
  await settle();
  assert.equal(reads, 4, "fixture did not reach the final confirmation session check");
  page.change(account("owner-b"));
  await settle();
  page.change(account("owner-a", "new-a-session"));
  await settle();
  page.fill(payload("New A session's current idea"));
  const pending = {
    owner_id: "owner-a", idempotency_key: "33333333-3333-4333-8333-333333333333",
    saved_at: Date.now(), payload: payload("New A session's pending idea"),
    fingerprint: JSON.stringify(payload("New A session's pending idea"))
  };
  page.storage.set(PENDING_KEY, JSON.stringify(pending));
  finalSession.resolve(account("owner-a", "new-a-session"));
  await settle();
  assert.equal(page.ids["ksvl-req-topic"].value, "New A session's current idea", "old A confirmation cleared a newer A auth generation");
  assert.equal(page.pending()?.idempotency_key, pending.idempotency_key, "old A confirmation erased a newer generation's retry key");
  assert.doesNotMatch(page.ids["ksvl-req-status"].textContent, /Received for station review/, "old A receipt overwrote the new generation's status");
}

async function newerSameOwnerPendingSurvives(text) {
  const first = fixture(text);
  await first.init();
  const response = deferred();
  first.onSubmit(() => response.promise);
  first.fill(payload("Earlier in-flight idea"));
  first.submit();
  await settle();
  const originalKey = first.pending().idempotency_key;
  const second = fixture(text, { storage: first.storage });
  await second.init();
  second.ids["ksvl-req-abandon-pending"].listeners.click();
  second.fill(payload("Deliberate different idea from another tab"));
  second.submit();
  await settle();
  const newerPending = first.storage.get(PENDING_KEY);
  assert.notEqual(first.pending().idempotency_key, originalKey, "fixture did not create a distinct deliberate request");
  response.resolve({ data: { state: "received", receipt_id: RECEIPT }, error: null });
  await settle();
  assert.equal(first.storage.get(PENDING_KEY), newerPending, "older completion erased a newer same-owner request's retry key");
}

const scenarios = [
  ["stale-A-after-B-with-other-tab-pending", staleCompletionAfterAccountSwitch],
  ["same-owner-token-refresh", sameOwnerTokenRefresh],
  ["expired-unknown-retry-blocked", expiredUnknownRetry],
  ["anonymous-initial-auth-draft-preserved", anonymousInitialAuthEvent],
  ["A-B-A-during-final-confirmation", accountRoundTripDuringFinalConfirmation],
  ["newer-same-owner-other-tab-pending-preserved", newerSameOwnerPendingSurvives]
];

function mutateOnce(text, before, after, name) {
  assert.equal(text.split(before).length - 1, 1, `calibration ${name}: expected exactly one source anchor`);
  return text.replace(before, after);
}

// The original client was uncommitted. These named, anchored mutants reinstate
// its exact failure mechanisms; they are calibration, not a historical checkout.
const calibrations = [
  ["old-stale-completion-clear", staleCompletionAfterAccountSwitch, () => mutateOnce(source,
    'else if(error.message==="request-account-changed") return;',
    'else if(error.message==="request-account-changed") clearPrivate(view);', "stale-clear")],
  ["old-token-equality", sameOwnerTokenRefresh, () => mutateOnce(source,
    'current.user.id!==session.user.id) throw new Error("request-account-changed")',
    'current.user.id!==session.user.id || current.access_token!==session.access_token) throw new Error("request-account-changed")', "token-equality")],
  ["old-expired-key-discard", expiredUnknownRetry, () => {
    const current = source.match(/^  function pendingFor\(ownerId\).*$/m)?.[0];
    assert.ok(current, "calibration expiry: pendingFor anchor missing");
    return mutateOnce(source, current,
      '  function pendingFor(ownerId) { var pending=read(PENDING_KEY); if (!pending) return null; if (!Number.isFinite(pending.saved_at) || now()-pending.saved_at>PENDING_TTL || pending.owner_id!==ownerId || !valid(pending.payload)) { tryRemove(PENDING_KEY); return null; } return pending; }', "expired-key-discard");
  }],
  ["initial-event-clears-anonymous", anonymousInitialAuthEvent, () => mutateOnce(source,
    "if(next!==owner){", 'if(event==="INITIAL_SESSION"||next!==owner){', "initial-auth-clear")],
  ["missing-final-confirmation-generation-guard", accountRoundTripDuringFinalConfirmation, () => mutateOnce(source,
    'throw new Error("invalid-request-receipt"); await sameSession(runtime,session);currentOperation(generation);',
    'throw new Error("invalid-request-receipt"); await sameSession(runtime,session);', "final-confirmation-generation")]
];

let failures = 0;
for (const [name, run] of scenarios) {
  try { await run(source); console.log(`PASS ${name}`); }
  catch (error) { failures++; console.error(`FAIL ${name}: ${error.message}`); }
}
for (const [name, run, makeMutant] of calibrations) {
  try {
    const mutant = makeMutant();
    await assert.rejects(() => run(mutant), { name: "AssertionError" }, `known-bad mutant ${name} was not rejected`);
    console.log(`CALIBRATED ${name}: rejected`);
  } catch (error) { failures++; console.error(`CALIBRATION FAIL ${name}: ${error.message}`); }
}
if (failures) {
  console.error(`KSVL REQUEST RACES HOLD failures=${failures}`);
  process.exitCode = 1;
} else {
  console.log(`KSVL REQUEST RACES PASS scenarios=${scenarios.length} calibrated=${calibrations.length} provider=synthetic-only`);
}
