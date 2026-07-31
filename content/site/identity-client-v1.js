(function installIdentityClientV1(global) {
  "use strict";

  var STATES = Object.freeze({
    FIRST_TIME: "first-time",
    RETURNING_NO_CARD: "returning-without-card",
    DEVICE_LOCAL_CARD: "device-local-card",
    ACCOUNT_NO_CARD: "account-without-card",
    ACCOUNT_BACKED: "account-backed-resident",
    UNKNOWN: "unknown"
  });

  function requireClient(client) {
    if (!client || !client.auth || typeof client.rpc !== "function") {
      throw new TypeError("A configured Supabase client is required.");
    }
    return client;
  }

  function validEmail(email) {
    var value = String(email || "").trim();
    return value.length <= 254 &&
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? value : "";
  }

  function safeRedirect(locationLike, requestedPath, allowedPaths) {
    var origin = String(locationLike && locationLike.origin || "");
    var currentPath = String(locationLike && locationLike.pathname || "/");
    var permitted = Array.isArray(allowedPaths) && allowedPaths.length
      ? allowedPaths.slice()
      : [currentPath];
    var candidate;
    try {
      candidate = new URL(String(requestedPath || currentPath), origin);
    } catch (_) {
      return "";
    }
    return candidate.origin === origin &&
      permitted.indexOf(candidate.pathname) !== -1 &&
      !candidate.username && !candidate.password
      ? candidate.origin + candidate.pathname
      : "";
  }

  function create(options) {
    var settings = options || {};
    var client = requireClient(settings.client);
    var locationLike = settings.location || global.location;
    var readLocalCard = typeof settings.readLocalCard === "function"
      ? settings.readLocalCard
      : function () { return { state: "empty" }; };
    var hasLocalHistory = typeof settings.hasLocalHistory === "function"
      ? settings.hasLocalHistory
      : function () { return false; };

    function sameDocument(left, right) {
      try {
        return JSON.stringify(left) === JSON.stringify(right);
      } catch (_) {
        return false;
      }
    }

    async function getSession() {
      var result = await client.auth.getSession();
      if (result.error) throw result.error;
      return result.data && result.data.session || null;
    }

    async function getState() {
      var localCard = readLocalCard();
      var session = await getSession();
      if (!session) {
        return {
          state: localCard && localCard.state === "saved"
            ? STATES.DEVICE_LOCAL_CARD
            : hasLocalHistory()
              ? STATES.RETURNING_NO_CARD
              : STATES.FIRST_TIME,
          session: null,
          localCard: localCard,
          remote: null
        };
      }
      var result = await client.rpc("get_my_resident_state_v1");
      if (result.error) {
        return {
          state: STATES.UNKNOWN,
          session: session,
          localCard: localCard,
          remote: null,
          error: result.error
        };
      }
      return {
        state: result.data && result.data.state === STATES.ACCOUNT_BACKED
          ? STATES.ACCOUNT_BACKED
          : STATES.ACCOUNT_NO_CARD,
        session: session,
        localCard: localCard,
        remote: result.data
      };
    }

    async function requestMagicLink(email, requestedPath) {
      var normalized = validEmail(email);
      var redirect = safeRedirect(
        locationLike,
        requestedPath,
        settings.allowedRedirectPaths
      );
      if (!normalized) throw new TypeError("Enter a valid email address.");
      if (!redirect) throw new TypeError("The sign-in return route is not allowed.");
      var result = await client.auth.signInWithOtp({
        email: normalized,
        options: { emailRedirectTo: redirect }
      });
      if (result.error) throw result.error;
      return { state: "magic-link-requested" };
    }

    async function exchangeCode(code) {
      var value = String(code || "").trim();
      if (!value) throw new TypeError("A callback code is required.");
      var result = await client.auth.exchangeCodeForSession(value);
      if (result.error) throw result.error;
      return getState();
    }

    async function claimLocalCard(envelope, idempotencyKey, expectedRevision) {
      var before = readLocalCard();
      if (!before || before.state !== "saved" ||
          !envelope || !sameDocument(before.envelope, envelope)) {
        throw new TypeError("The current valid local Card must be claimed explicitly.");
      }
      var session = await getSession();
      if (!session) throw new Error("authentication-required");
      var mutation = await client.rpc("claim_resident_card_v1", {
        p_document: envelope,
        p_idempotency_key: idempotencyKey,
        p_expected_revision: expectedRevision || null
      });
      if (mutation.error) throw mutation.error;
      var verified = await client.rpc("get_my_resident_state_v1");
      if (verified.error ||
          !verified.data ||
          verified.data.state !== STATES.ACCOUNT_BACKED ||
          !verified.data.card ||
          verified.data.card.revision !== mutation.data.revision ||
          !sameDocument(verified.data.card.document, envelope)) {
        throw new Error("remote-read-after-write-failed");
      }
      var after = readLocalCard();
      return {
        state: STATES.ACCOUNT_BACKED,
        localPreserved: after.state === "saved" &&
          sameDocument(after.envelope, envelope),
        remote: verified.data
      };
    }

    async function revokeCard(idempotencyKey, expectedRevision) {
      var result = await client.rpc("revoke_my_resident_card_v1", {
        p_idempotency_key: idempotencyKey,
        p_expected_revision: expectedRevision
      });
      if (result.error) throw result.error;
      return result.data;
    }

    async function updateProfile(profile, idempotencyKey) {
      var requested = profile || {};
      var mutation = await client.rpc("update_my_resident_profile_v1", {
        p_display_name: requested.displayName == null
          ? null
          : String(requested.displayName),
        p_card_username: requested.cardUsername == null
          ? null
          : String(requested.cardUsername),
        p_member_card_is_public: requested.memberCardIsPublic === true,
        p_idempotency_key: idempotencyKey
      });
      if (mutation.error) throw mutation.error;

      var verified = await client.rpc("get_my_resident_state_v1");
      if (verified.error ||
          !verified.data ||
          !sameDocument(verified.data.profile, mutation.data)) {
        throw new Error("profile-read-after-write-failed");
      }
      return {
        state: verified.data.state,
        profile: verified.data.profile
      };
    }

    async function signOut() {
      var result = await client.auth.signOut();
      if (result.error) throw result.error;
      return getState();
    }

    return Object.freeze({
      claimLocalCard: claimLocalCard,
      exchangeCode: exchangeCode,
      getSession: getSession,
      getState: getState,
      requestMagicLink: requestMagicLink,
      revokeCard: revokeCard,
      signOut: signOut,
      updateProfile: updateProfile
    });
  }

  global.LAIDIESIdentityV1 = Object.freeze({
    STATES: STATES,
    create: create,
    safeRedirect: safeRedirect,
    validEmail: validEmail
  });
})(window);
