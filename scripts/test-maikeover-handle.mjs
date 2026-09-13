import assert from "node:assert/strict";
import vm from "node:vm";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../content/site/maikeover-account-v1.js", import.meta.url), "utf8");
const listeners = new Map();
const elements = new Map();
for (const id of ["moAccountStatus", "moAccountForm", "moAccountCodeForm", "moAccountReady", "moAccountRestore", "moAccountCode", "moEpisodeEmail", "moEpisodeConsent", "moAccountSend", "moAccountResend", "moAccountChange", "moAccountEmail", "moAccountVerify", "moAccountSignOut", "mo-account", "mo-maker"]) {
  elements.set(id, { hidden: false, value: "", checked: false, disabled: false, addEventListener(type, fn) { listeners.set(id + ":" + type, fn); }, focus() {}, scrollIntoView() {} });
}
let claimedHandle = "";
let claimError = null;
let hydrated = [];
let typedHandle = "";
let handleDirty = false;
let authListener = null;
let currentUser = { id: "u1", email: "a@example.com" };
let remote = { card: { revision: "revision", document: { version: 1, fields: { displayName: "Ali" } } }, profile: { card_username: "founder0001" } };
const controller = {
  async claimLocalCard(_envelope, _key, _revision, handle) {
    if (claimError) throw claimError;
    claimedHandle = handle;
    return { localPreserved: true, remote: { profile: { card_username: handle } } };
  },
  async requestEmailCode() {}, async verifyEmailCode() {}, async signOut() {}
};
const context = {
  window: null,
  document: { getElementById(id) { return elements.get(id); } },
  sessionStorage: { getItem() { return null; }, removeItem() {} },
  localStorage: {
    values: new Map(),
    getItem(key) { return this.values.has(key) ? this.values.get(key) : null; },
    setItem(key, value) { this.values.set(key, String(value)); },
    removeItem(key) { this.values.delete(key); }
  },
  crypto: { randomUUID() { return "11111111-1111-4111-8111-111111111111"; } },
  setTimeout(fn) { fn(); return 1; },
  clearTimeout() {}, confirm() { return true; },
  CustomEvent: class { constructor(type) { this.type = type; } }
};
context.window = Object.assign(context, {
  addEventListener() {}, dispatchEvent() {},
  LAIDIESPortraitSelection: null,
  LAIDIESMaikeoverHandle: { hydrate(handle, force) {
    hydrated.push([handle, force]);
    if (!/^[a-z0-9_]{3,24}$/.test(String(handle || ""))) {
      if (!force) return;
      typedHandle = "";
      handleDirty = false;
      return;
    }
    if (handleDirty && !force) return;
    typedHandle = handle;
    handleDirty = false;
  } },
  LAIDIESResidentAccountRuntime: { async get() { return {
    client: { auth: { getSession: async () => ({ data: { session: { user: currentUser } } }), onAuthStateChange(listener) { authListener = listener; } } },
    controller,
    async getState() { return { session: { user: currentUser }, remote }; },
    writeLocalEnvelope() {}
  }; } }
});
vm.runInNewContext(source, context, { filename: "maikeover-account-v1.js" });
const api = context.window.LAIDIESMaikeoverAccount;
assert.equal(api.normalizeHandle(" @Founder0001 "), "founder0001");
assert.equal(api.validHandle("founder0001"), true);
assert.equal(api.validHandle("ab"), false);
assert.equal(api.validHandle("founder-0001"), false);
const saveContext = await api.beforeSave();
assert.equal(saveContext.userId, "u1");
assert.equal(saveContext.revision, "revision");
typedHandle = "still-typing";
handleDirty = true;
authListener("TOKEN_REFRESHED");
await Promise.resolve();
await Promise.resolve();
assert.equal(typedHandle, "still-typing", "a routine refresh must not replace a typed handle draft");
await api.save({ version: 1 }, saveContext, "@Founder0001");
assert.equal(claimedHandle, "founder0001");
assert.equal(hydrated.some(([handle, force]) => handle === "founder0001" && force === true), true);
assert.equal(context.localStorage.getItem("laidies_card_username"), "founder0001");
claimError = Object.assign(new Error("card-username-not-available"), { code: "23505" });
await assert.rejects(
  () => api.save({ version: 1 }, saveContext, "@another_handle"),
  /That handle was just claimed/
);
assert.equal(context.localStorage.getItem("laidies_card_username"), "founder0001", "a rejected handle must not replace the confirmed local cache");
claimError = null;
await assert.rejects(() => api.save({ version: 1 }, saveContext, "bad-handle"));
assert.equal(claimedHandle, "founder0001", "invalid draft must not reach the account mutation");
typedHandle = "founder0001";
handleDirty = true;
currentUser = { id: "u2", email: "second@example.com" };
remote = { card: null, profile: { card_username: null } };
authListener("SIGNED_IN");
await new Promise((resolve) => globalThis.setTimeout(resolve, 0));
await new Promise((resolve) => globalThis.setTimeout(resolve, 0));
assert.equal(typedHandle, "", "an account change with no server handle must clear the previous account handle");
console.log("PASS test-maikeover-handle");
