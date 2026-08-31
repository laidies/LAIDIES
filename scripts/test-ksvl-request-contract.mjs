import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const migrationPath = path.join(root, "supabase/migrations/20260830020000_ksvl_request_lifecycle.sql");
const clientPath = path.join(root, "content/site/ksvl-requests-v1.js");
const migration = fs.readFileSync(migrationPath, "utf8");
const client = fs.readFileSync(clientPath, "utf8");

function requireText(text, pattern, message) { assert.match(text, pattern, message); }
function rejectText(text, pattern, message) { assert.doesNotMatch(text, pattern, message); }

requireText(migration, /revoke all on table public\.ksvl_song_requests from public, anon, authenticated;/, "direct request table access remains available");
requireText(migration, /revoke all on table public\.ksvl_song_request_receipts_v1 from public, anon, authenticated;/, "receipt ledger is exposed");
requireText(migration, /revoke all \(%I\)/, "separate column grants remain exposed");
requireText(migration, /security definer\s+set search_path = ''/s, "RPCs need a pinned search path");
requireText(migration, /v_owner uuid := auth\.uid\(\)/, "owner must come from auth, not the client");
requireText(migration, /idempotency-conflict/, "same key with different payload needs rejection");
requireText(migration, /request-rate-limit/, "rate limiting is missing");
rejectText(migration, /expires_at|interval '30 days'|cron\.schedule|purge_expired_ksvl/, "unapproved automatic expiry or deletion must not ship");
requireText(migration, /delete from public\.ksvl_song_requests\s+where id = p_receipt_id and user_id = v_owner/s, "delete must be physical and owner-bound");
requireText(migration, /'y2k-pop-anthem'.*'deb-comedy-song'/s, "server style allowlist is incomplete");
requireText(migration, /pg_catalog\.sha256\(convert_to\(\s*jsonb_build_array/s, "idempotency fingerprint must be collision-resistant and unambiguous");
requireText(migration, /deleted_at timestamptz/, "receipt lifecycle needs idempotent deleted state");
rejectText(migration, /grant execute on function public\.purge_expired_ksvl_song_requests_v1\(\) to authenticated;/, "authenticated users may purge requests");
requireText(client, /LAIDIESResidentAccountRuntime\.get\(\)/, "client must use the shared resident runtime");
requireText(client, /request-owner-binding-unavailable/, "client requests need captured-session binding");
requireText(client, /data-clarity-mask/, "request fields need a Clarity mask");
requireText(client, /DRAFT_TTL = 7 \* DAY/, "local drafts need seven-day expiry");
requireText(client, /draft\.owner_id && draft\.owner_id!==ownerId/, "account state must not restore a foreign draft");
requireText(client, /retrying the unchanged idea will reuse it/, "unknown completion needs an honest retry message");
requireText(client, /delete_my_ksvl_song_request_v1/, "client needs an owner delete path");
requireText(client, /runtime\.controller\.getSession\(\)/, "client must capture the runtime controller session");
requireText(client, /onAuthStateChange/, "auth changes must clear visible private state");
requireText(client, /PENDING_TTL = DAY/, "unknown request retries must expire within one day");

// Calibration: these deliberately damaged contracts must fail, proving this is a gate.
assert.throws(() => requireText(migration.replace("request-rate-limit", "removed-rate-limit"), /request-rate-limit/, "calibration"));
assert.throws(() => requireText(client.replace("data-clarity-mask", "mask-removed"), /data-clarity-mask/, "calibration"));

// Executable client fixture: handlers attach synchronously, and two submits
// before the RPC settles produce one atomic submission.
function element() {
  return { value:"", textContent:"", disabled:false, classList:{add(){}}, setAttribute(){}, listeners:{},
    addEventListener(name, fn) { this.listeners[name] = fn; }, focus(){}, reset(){ this.resetCalled = true; },
    replaceChildren(){ this.children = []; }, append(...nodes){ (this.children ||= []).push(...nodes); } };
}
const ids = Object.fromEntries(["ksvl-req-style","ksvl-req-topic","ksvl-req-lyrics","ksvl-request-form","ksvl-req-status","ksvl-req-submit","ksvl-req-list"].map((id) => [id, element()]));
ids["ksvl-req-style"].value = "y2k-pop-anthem";
ids["ksvl-req-topic"].value = "A real bounded topic";
ids["ksvl-request-form"].reset = () => { ids["ksvl-req-style"].value = ""; ids["ksvl-req-topic"].value = ""; ids["ksvl-req-lyrics"].value = ""; };
const storage = new Map();
let session = { user:{id:"owner-a"}, access_token:"token-a" };
let submissions = 0;
let authChange;
let releaseSubmit;
const delayedSubmit = new Promise((resolve) => { releaseSubmit = resolve; });
const fakeRuntime = { controller:{getSession:async()=>session}, client:{ auth:{onAuthStateChange(fn){authChange=fn;}}, rpc(name){ return {setHeader:async()=>{
  if (name === "list_my_ksvl_song_requests_v1") return {data:[],error:null};
  if (name === "submit_my_ksvl_song_request_v1") { submissions += 1; await delayedSubmit; return {data:{state:"received",receipt_id:"22222222-2222-4222-8222-222222222222"},error:null}; }
  return {data:{state:"deleted"},error:null};
}}; } } };
const sandbox = { window:null, document:{getElementById:(id)=>ids[id]||null, createElement:element}, localStorage:{getItem:(k)=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:(k)=>storage.delete(k)}, crypto:{randomUUID:()=>"11111111-1111-4111-8111-111111111111"}, Promise, setTimeout, clearTimeout };
sandbox.window = sandbox;
sandbox.LAIDIESResidentAccountRuntime = {get:async()=>fakeRuntime};
vm.runInNewContext(client, sandbox);
await sandbox.LAIDIESKSVLRequestsV1.init();
ids["ksvl-request-form"].listeners.submit({preventDefault(){}});
ids["ksvl-request-form"].listeners.submit({preventDefault(){}});
await new Promise((resolve)=>setTimeout(resolve,0));
assert.equal(submissions, 1, "double click created a second request before the first RPC settled");
releaseSubmit();
await new Promise((resolve)=>setTimeout(resolve,0));
assert.match(ids["ksvl-req-status"].textContent, /Received for station review/, "acknowledged receipt was not retained after submit");
session = {user:{id:"owner-b"},access_token:"token-b"}; authChange('SIGNED_IN',session);
assert.equal(ids["ksvl-req-topic"].value, "", "auth switch left private request text visible");

console.log("KSVL REQUEST CONTRACT PASS calibrated=2 client-fixtures=double-submit,auth-switch direct-table=revoked rpc=owner-bound retention=unchanged-no-auto-delete");
