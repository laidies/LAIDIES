import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const moduleSource = fs.readFileSync(
  new URL("../content/site/identity-client-v1.js", import.meta.url),
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

function copy(value) {
  return value == null ? value : structuredClone(value);
}

function asError(message) {
  return { data: null, error: new Error(message) };
}

class IsolatedIdentityService {
  constructor() {
    this.accounts = new Map();
    this.usernameOwners = new Map();
    this.revision = 0;
  }

  account(ownerId) {
    if (!this.accounts.has(ownerId)) {
      this.accounts.set(ownerId, {
        card: null,
        profile: null,
        receipts: new Map()
      });
    }
    return this.accounts.get(ownerId);
  }

  nextRevision() {
    this.revision += 1;
    return `revision-${this.revision}`;
  }

  replayOrConflict(account, key, operation, request) {
    const receipt = account.receipts.get(key);
    if (!receipt) return null;
    if (receipt.operation !== operation ||
        JSON.stringify(receipt.request) !== JSON.stringify(request)) {
      throw new Error("idempotency-conflict");
    }
    return copy(receipt.response);
  }

  remember(account, key, operation, request, response) {
    account.receipts.set(key, {
      operation,
      request: copy(request),
      response: copy(response)
    });
  }

  async rpc(ownerId, name, payload = {}) {
    if (!ownerId) return asError("authentication-required");
    const account = this.account(ownerId);
    try {
      if (name === "get_my_resident_state_v1") {
        const active = account.card && !account.card.deleted;
        return {
          data: {
            state: active
              ? "account-backed-resident"
              : "account-without-card",
            profile: copy(account.profile),
            card: active
              ? {
                  schema_version: 1,
                  document: copy(account.card.document),
                  revision: account.card.revision,
                  updated_at: account.card.updatedAt
                }
              : null
          },
          error: null
        };
      }

      if (name === "claim_resident_card_v1") {
        const request = {
          document: copy(payload.p_document),
          expected_revision: payload.p_expected_revision || null
        };
        const replay = this.replayOrConflict(
          account,
          payload.p_idempotency_key,
          "claim-resident-card-v1",
          request
        );
        if (replay) return { data: replay, error: null };

        const active = account.card && !account.card.deleted;
        if ((!active && request.expected_revision !== null) ||
            (active && request.expected_revision !== account.card.revision)) {
          throw new Error("revision-conflict");
        }
        const revision = this.nextRevision();
        account.card = {
          document: copy(request.document),
          revision,
          updatedAt: `2026-07-26T18:00:0${this.revision}Z`,
          deleted: false
        };
        const response = {
          state: "account-backed-resident",
          revision,
          document: copy(request.document)
        };
        this.remember(
          account,
          payload.p_idempotency_key,
          "claim-resident-card-v1",
          request,
          response
        );
        return { data: response, error: null };
      }

      if (name === "revoke_my_resident_card_v1") {
        const request = { expected_revision: payload.p_expected_revision };
        const replay = this.replayOrConflict(
          account,
          payload.p_idempotency_key,
          "revoke-resident-card-v1",
          request
        );
        if (replay) return { data: replay, error: null };
        if (!account.card || account.card.deleted ||
            account.card.revision !== request.expected_revision) {
          throw new Error("revision-conflict");
        }
        const revision = this.nextRevision();
        account.card.revision = revision;
        account.card.deleted = true;
        const response = { state: "account-without-card", revision };
        this.remember(
          account,
          payload.p_idempotency_key,
          "revoke-resident-card-v1",
          request,
          response
        );
        return { data: response, error: null };
      }

      if (name === "update_my_resident_profile_v1") {
        const displayName = String(payload.p_display_name || "").trim() || null;
        const cardUsername =
          String(payload.p_card_username || "").trim().toLowerCase() || null;
        const request = {
          display_name: displayName,
          card_username: cardUsername,
          member_card_is_public: payload.p_member_card_is_public === true
        };
        const replay = this.replayOrConflict(
          account,
          payload.p_idempotency_key,
          "update-resident-profile-v1",
          request
        );
        if (replay) return { data: replay, error: null };
        if (displayName && (displayName.length > 30 || /[<>\u0000-\u001f]/.test(displayName))) {
          throw new Error("invalid-display-name");
        }
        if (cardUsername && !/^[a-z0-9_]{3,24}$/.test(cardUsername)) {
          throw new Error("invalid-card-username");
        }
        const currentOwner = cardUsername && this.usernameOwners.get(cardUsername);
        if (currentOwner && currentOwner !== ownerId) {
          throw new Error("card-username-not-available");
        }
        if (account.profile?.card_username &&
            account.profile.card_username !== cardUsername) {
          this.usernameOwners.delete(account.profile.card_username);
        }
        if (cardUsername) this.usernameOwners.set(cardUsername, ownerId);
        account.profile = {
          ...request,
          member_card_status: request.member_card_is_public
            ? "submitted"
            : "private"
        };
        this.remember(
          account,
          payload.p_idempotency_key,
          "update-resident-profile-v1",
          request,
          account.profile
        );
        return { data: copy(account.profile), error: null };
      }
      throw new Error(`unexpected-rpc:${name}`);
    } catch (error) {
      return { data: null, error };
    }
  }
}

function makeDevice(service, name, options = {}) {
  let ownerId = options.ownerId || null;
  let localCard = copy(options.localCard || { state: "empty" });
  let localHistory = options.localHistory === true;
  let failAfterNextClaim = false;
  const client = {
    auth: {
      async getSession() {
        return {
          data: {
            session: ownerId ? { user: { id: ownerId } } : null
          },
          error: null
        };
      },
      async signInWithOtp() {
        return { data: {}, error: null };
      },
      async exchangeCodeForSession(code) {
        ownerId = code;
        return {
          data: { session: { user: { id: ownerId } } },
          error: null
        };
      },
      async signOut() {
        ownerId = null;
        return { error: null };
      }
    },
    async rpc(rpcName, payload) {
      const result = await service.rpc(ownerId, rpcName, payload);
      if (rpcName === "claim_resident_card_v1" &&
          failAfterNextClaim &&
          !result.error) {
        failAfterNextClaim = false;
        return asError("network-outcome-unknown");
      }
      return result;
    }
  };
  const controller = identity.create({
    client,
    location: window.location,
    allowedRedirectPaths: ["/maikeover.html"],
    readLocalCard: () => copy(localCard),
    hasLocalHistory: () => localHistory
  });
  return {
    name,
    controller,
    failAfterNextClaim: () => { failAfterNextClaim = true; },
    setLocalCard: (envelope) => {
      localCard = { state: "saved", envelope: copy(envelope) };
      localHistory = true;
    },
    localCard: () => copy(localCard)
  };
}

const service = new IsolatedIdentityService();
const cardV1 = { version: 1, fields: { displayName: "Sunny" } };
const cardV2 = { version: 1, fields: { displayName: "Sunny Updated" } };
const cardV3 = { version: 1, fields: { displayName: "Stale Device" } };

const fresh = makeDevice(service, "fresh");
assert.equal((await fresh.controller.getState()).state, "first-time");
const returning = makeDevice(service, "returning", { localHistory: true });
assert.equal((await returning.controller.getState()).state, "returning-without-card");
const localOnly = makeDevice(service, "local", {
  localCard: { state: "saved", envelope: cardV1 },
  localHistory: true
});
assert.equal((await localOnly.controller.getState()).state, "device-local-card");

const aDevice1 = makeDevice(service, "a-device-1", {
  ownerId: "resident-a",
  localCard: { state: "saved", envelope: cardV1 },
  localHistory: true
});
const aDevice2 = makeDevice(service, "a-device-2", {
  ownerId: "resident-a"
});
const bDevice1 = makeDevice(service, "b-device-1", {
  ownerId: "resident-b"
});

aDevice1.failAfterNextClaim();
await assert.rejects(
  aDevice1.controller.claimLocalCard(
    cardV1,
    "10000000-0000-4000-8000-000000000001"
  ),
  /network-outcome-unknown/
);
const reconciled = await aDevice1.controller.claimLocalCard(
  cardV1,
  "10000000-0000-4000-8000-000000000001"
);
assert.equal(reconciled.localPreserved, true);
assert.equal(reconciled.remote.card.revision, "revision-1");

assert.equal((await aDevice2.controller.getState()).state, "account-backed-resident");
assert.deepEqual(
  copy((await aDevice2.controller.getState()).remote.card.document),
  cardV1
);
assert.equal((await bDevice1.controller.getState()).state, "account-without-card");

const profileKey = "10000000-0000-4000-8000-000000000002";
const profileInput = {
  displayName: "Sunny",
  cardUsername: "Sunny_Resident",
  memberCardIsPublic: false
};
const profile = await aDevice1.controller.updateProfile(profileInput, profileKey);
assert.equal(profile.profile.card_username, "sunny_resident");
assert.equal(
  (await aDevice2.controller.getState()).remote.profile.card_username,
  "sunny_resident"
);
assert.equal((await bDevice1.controller.getState()).remote.profile, null);
const profileReplay = await aDevice1.controller.updateProfile(profileInput, profileKey);
assert.deepEqual(copy(profileReplay.profile), copy(profile.profile));
await assert.rejects(
  aDevice1.controller.updateProfile(
    { ...profileInput, displayName: "Different" },
    profileKey
  ),
  /idempotency-conflict/
);
await assert.rejects(
  bDevice1.controller.updateProfile(
    {
      displayName: "Other Resident",
      cardUsername: "sunny_resident",
      memberCardIsPublic: false
    },
    "20000000-0000-4000-8000-000000000001"
  ),
  /card-username-not-available/
);

const sharedRevision = (await aDevice2.controller.getState()).remote.card.revision;
aDevice1.setLocalCard(cardV2);
const updated = await aDevice1.controller.claimLocalCard(
  cardV2,
  "10000000-0000-4000-8000-000000000003",
  sharedRevision
);
assert.equal(updated.remote.card.revision, "revision-2");
aDevice2.setLocalCard(cardV3);
await assert.rejects(
  aDevice2.controller.claimLocalCard(
    cardV3,
    "10000000-0000-4000-8000-000000000004",
    sharedRevision
  ),
  /revision-conflict/
);

assert.equal((await aDevice2.controller.signOut()).state, "device-local-card");
await aDevice2.controller.exchangeCode("resident-a");
assert.deepEqual(
  copy((await aDevice2.controller.getState()).remote.card.document),
  cardV2,
  "remote account state, not stale device-local bytes, is authoritative after login"
);

const revoked = await aDevice1.controller.revokeCard(
  "10000000-0000-4000-8000-000000000005",
  "revision-2"
);
assert.equal(revoked.state, "account-without-card");
assert.equal((await aDevice2.controller.getState()).state, "account-without-card");
assert.equal((await bDevice1.controller.getState()).state, "account-without-card");
assert.equal(
  aDevice1.localCard().state,
  "saved",
  "remote revoke must not silently delete device-local bytes"
);

console.log(
  "IDENTITY CROSS-DEVICE VERTICAL PASS " +
  "visitor_states=5 accounts=2 devices=3 retry=1 conflicts=2"
);
