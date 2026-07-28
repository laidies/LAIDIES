import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const moduleSource = fs.readFileSync(
  new URL("../content/site/identity-client-v1.js", import.meta.url),
  "utf8"
);
const migrationSource = fs.readFileSync(
  new URL(
    "../supabase/migrations/20260726010000_resident_identity_v1.sql",
    import.meta.url
  ),
  "utf8"
);

const window = {
  location: {
    origin: "https://laidies.example",
    pathname: "/maikeover.html"
  },
  URL
};
vm.runInNewContext(moduleSource, { window, URL });
const identity = window.LAIDIESIdentityV1;

assert.equal(identity.validEmail(" resident@example.com "), "resident@example.com");
assert.equal(identity.validEmail("not-an-email"), "");
assert.equal(
  identity.safeRedirect(window.location, "/maikeover.html", ["/maikeover.html"]),
  "https://laidies.example/maikeover.html"
);
assert.equal(
  identity.safeRedirect(
    window.location,
    "https://attacker.example/maikeover.html",
    ["/maikeover.html"]
  ),
  ""
);

const envelope = Object.freeze({
  version: 1,
  fields: Object.freeze({ displayName: "Sunny" })
});
let localCard = { state: "saved", envelope };
let session = { user: { id: "resident-a" } };
let remoteRevision = null;
let remoteProfile = null;
const calls = [];
const client = {
  auth: {
    async getSession() {
      return { data: { session }, error: null };
    },
    async signInWithOtp(payload) {
      calls.push(["otp", payload]);
      return { data: {}, error: null };
    },
    async exchangeCodeForSession(code) {
      calls.push(["exchange", code]);
      return { data: { session }, error: null };
    },
    async signOut() {
      session = null;
      return { error: null };
    }
  },
  async rpc(name, payload) {
    calls.push([name, payload]);
    if (name === "claim_resident_card_v1") {
      remoteRevision = "revision-1";
      return {
        data: { state: "account-backed-resident", revision: remoteRevision },
        error: null
      };
    }
    if (name === "get_my_resident_state_v1") {
      return {
        data: remoteRevision
          ? {
              state: "account-backed-resident",
              card: { revision: remoteRevision, document: envelope },
              profile: remoteProfile
            }
          : {
              state: "account-without-card",
              card: null,
              profile: remoteProfile
            },
        error: null
      };
    }
    if (name === "revoke_my_resident_card_v1") {
      return { data: { state: "account-without-card" }, error: null };
    }
    if (name === "update_my_resident_profile_v1") {
      remoteProfile = {
        display_name: payload.p_display_name,
        card_username: payload.p_card_username,
        member_card_is_public: payload.p_member_card_is_public,
        member_card_status: payload.p_member_card_is_public
          ? "submitted"
          : "private"
      };
      return {
        data: remoteProfile,
        error: null
      };
    }
    throw new Error(`Unexpected RPC ${name}`);
  }
};

const controller = identity.create({
  client,
  location: window.location,
  allowedRedirectPaths: ["/maikeover.html"],
  readLocalCard: () => localCard.state === "saved"
    ? { state: "saved", envelope: structuredClone(localCard.envelope) }
    : localCard,
  hasLocalHistory: () => true
});

assert.equal((await controller.getState()).state, "account-without-card");
await controller.requestMagicLink("resident@example.com", "/maikeover.html");
assert.equal(calls.at(-1)[0], "otp");
await assert.rejects(
  controller.requestMagicLink(
    "resident@example.com",
    "https://attacker.example/steal"
  ),
  /not allowed/
);

const claimed = await controller.claimLocalCard(
  envelope,
  "00000000-0000-4000-8000-000000000001"
);
assert.equal(claimed.state, "account-backed-resident");
assert.equal(claimed.localPreserved, true);
assert.equal(localCard.state, "saved", "claim must not delete local Card bytes");

const profile = await controller.updateProfile(
  {
    displayName: "Sunny",
    cardUsername: "sunny",
    memberCardIsPublic: false
  },
  "00000000-0000-4000-8000-000000000002"
);
assert.equal(profile.profile.card_username, "sunny");

session = null;
assert.equal((await controller.getState()).state, "device-local-card");
localCard = { state: "empty" };
assert.equal((await controller.getState()).state, "returning-without-card");

for (const required of [
  /enable row level security/i,
  /using \(\(select auth\.uid\(\)\) = owner_id\)/i,
  /security definer[\s\S]+set search_path = ''/i,
  /revoke all on table public\.resident_cards from anon, authenticated/i,
  /revoke all on table public\.resident_identity_mutations from anon, authenticated/i,
  /revoke execute on function public\.claim_resident_card_v1[\s\S]+from public, anon/i,
  /primary key \(owner_id, idempotency_key\)/i,
  /request jsonb not null/i,
  /idempotency-conflict/i,
  /pg_advisory_xact_lock/i,
  /revision-conflict/i,
  /resident_card_v1_is_valid/i,
  /update_my_resident_profile_v1/i,
  /invalid-card-username/i,
  /card-username-not-available/i
]) {
  assert.match(migrationSource, required);
}

assert.doesNotMatch(
  moduleSource,
  /localStorage\.removeItem|service_role|serviceRole/,
  "identity adapter must not erase local Card state or embed privileged keys"
);

console.log("IDENTITY ACCOUNT CONTRACT PASS");
