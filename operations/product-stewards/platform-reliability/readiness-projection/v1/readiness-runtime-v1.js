(function installEntryReadinessV1(global) {
  "use strict";

  var VERSION = "1.0.0";
  var MAX_WINDOW_MS = 24 * 60 * 60 * 1000;
  var MAX_CLOCK_SKEW_MS = 5 * 60 * 1000;
  var SHA256 = /^[0-9a-f]{64}$/;
  var DESTINATION_STATES = ["available", "limited", "held", "withdrawn"];
  var CURRENT_STATES = ["available", "quiet", "held", "withdrawn"];
  var CURRENT_SLOTS = ["latest-episode", "breaking", "daily"];
  var ARTIFACT_KINDS = [
    "none",
    "local-evidence",
    "release-candidate",
    "deployment"
  ];
  var CANONICAL = Object.freeze([
    { destinationId: "visitors-centre", productId: "visitors-centre", ownerId: "visitors-centre-champion", name: "Visitor’s Centre", route: "/visitors-centre.html" },
    { destinationId: "newsstand", productId: "newsstand", ownerId: "newsstand-champion", name: "The NewsStand", route: "/newsstand.html" },
    { destinationId: "chick-flicks", productId: "chick-flicks", ownerId: "chick-flicks-champion", name: "The Chick Flicks", route: "/chick-flicks.html" },
    { destinationId: "blend-snap", productId: "blend-snap", ownerId: "blend-snap-champion", name: "The Blend & Snap", route: "/blend-snap.html" },
    { destinationId: "mme-claio", productId: "mme-claio", ownerId: "mme-claio-champion", name: "Mme CLAi-O's Shop", route: "/games/madame-claio.html" },
    { destinationId: "maikeover", productId: "maikeover", ownerId: "maikeover-champion", name: "MAiKEOVER on MAiN", route: "/maikeover.html" },
    { destinationId: "bronze-aige", productId: "bronze-aige", ownerId: "bronze-aige-champion", name: "The BRONZE AiGE", route: "/bronze-aige.html" },
    { destinationId: "dream-phone", productId: "dream-phone", ownerId: "dream-phone-champion", name: "The Phone Booth (Dream Phone)", route: "/games/dream-phone.html" },
    { destinationId: "mall", productId: "mall", ownerId: "mall-champion", name: "The Mall", route: "/mall.html" },
    { destinationId: "ksvl-radio", productId: "ksvl", ownerId: "ksvl-champion", name: "KSVL Community RAiDIO", route: "/radio.html" },
    { destinationId: "post-office", productId: "post-office", ownerId: "post-office-champion", name: "The SUNNYVAiLE Post Office", route: "/post-office.html" },
    { destinationId: "town-hall", productId: "town-hall", ownerId: "town-hall-champion", name: "Town Hall", route: "/town-hall.html" },
    { destinationId: "library", productId: "library", ownerId: "library-champion", name: "SUNNYVAiLE LIBRAiRY", route: "/library.html" },
    { destinationId: "sunnyvaile-high", productId: "sunnyvaile-high", ownerId: "sunnyvaile-high-champion", name: "SUNNYVAiLE High", route: "/sunnyvaile-high.html" },
    { destinationId: "fairy-godmother", productId: "fairy-godmother", ownerId: "fairy-godmother-champion", name: "The FAiRY Godmother's House", route: "/games/fairy-godmother.html" },
    { destinationId: "sorority-house", productId: "sorority-house", ownerId: "sorority-house-champion", name: "The Sorority House · Delta LAi Nu", route: "/sorority-house.html" },
    { destinationId: "sanctuary", productId: "luminairy", ownerId: "luminairy-champion", name: "The LUMINAiRY", route: "/luminairy.html" }
  ]);

  function fail(code) {
    var error = new Error(code);
    error.code = code;
    throw error;
  }

  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function canonicalize(value) {
    if (value === null || typeof value !== "object") {
      return JSON.stringify(value);
    }
    if (Array.isArray(value)) {
      return "[" + value.map(canonicalize).join(",") + "]";
    }
    return "{" + Object.keys(value).sort().map(function (key) {
      return JSON.stringify(key) + ":" + canonicalize(value[key]);
    }).join(",") + "}";
  }

  async function shaValue(value) {
    if (!global.crypto || !global.crypto.subtle || !global.TextEncoder) {
      fail("CRYPTO_UNAVAILABLE");
    }
    var bytes = new global.TextEncoder().encode(canonicalize(value));
    var digest = await global.crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest)).map(function (byte) {
      return byte.toString(16).padStart(2, "0");
    }).join("");
  }

  function exactKeys(value, expected, code) {
    if (!value || typeof value !== "object" || Array.isArray(value)) fail(code);
    var actual = Object.keys(value).sort().join(",");
    if (actual !== expected.slice().sort().join(",")) fail(code);
  }

  function timestamp(value, code) {
    var time = Date.parse(value);
    if (typeof value !== "string" || !Number.isFinite(time)) fail(code);
    return time;
  }

  function text(value, max, code) {
    if (typeof value !== "string" || !value.trim() || value.length > max) {
      fail(code);
    }
  }

  function validateEvidence(value, generatedAt) {
    exactKeys(value, ["path", "sha256", "observedAt"], "EVIDENCE_SHAPE_INVALID");
    text(value.path, 500, "EVIDENCE_PATH_INVALID");
    if (!SHA256.test(value.sha256)) fail("EVIDENCE_HASH_INVALID");
    if (timestamp(value.observedAt, "EVIDENCE_TIME_INVALID") > generatedAt) {
      fail("EVIDENCE_AFTER_PROJECTION");
    }
  }

  function validateArtifact(value) {
    exactKeys(value, ["kind", "id", "sha256"], "ARTIFACT_SHAPE_INVALID");
    if (ARTIFACT_KINDS.indexOf(value.kind) === -1) fail("ARTIFACT_KIND_INVALID");
    if (value.kind === "none") {
      if (value.id !== null || value.sha256 !== null) fail("ARTIFACT_NONE_NOT_NULL");
    } else if (
      typeof value.id !== "string" ||
      !value.id ||
      !SHA256.test(value.sha256)
    ) {
      fail("ARTIFACT_BINDING_INCOMPLETE");
    }
  }

  function validateFresh(value, generatedAt, validUntil) {
    var time = timestamp(value, "ITEM_FRESHNESS_INVALID");
    if (time <= generatedAt || time > validUntil) {
      fail("ITEM_FRESHNESS_OUTSIDE_ENVELOPE");
    }
  }

  function validatePayload(payload, now) {
    exactKeys(payload, [
      "projectionId",
      "sequence",
      "generatedAt",
      "validUntil",
      "replacesProjectionId",
      "fallbackRoute",
      "destinations",
      "currentContent"
    ], "PAYLOAD_SHAPE_INVALID");
    if (!/^readiness-[a-z0-9-]+-v[0-9]+$/.test(payload.projectionId)) {
      fail("PROJECTION_ID_INVALID");
    }
    if (!Number.isSafeInteger(payload.sequence) || payload.sequence < 1) {
      fail("PROJECTION_SEQUENCE_INVALID");
    }
    if (payload.fallbackRoute !== "/visitors-centre.html") {
      fail("FALLBACK_ROUTE_INVALID");
    }
    var generatedAt = timestamp(payload.generatedAt, "GENERATED_AT_INVALID");
    var validUntil = timestamp(payload.validUntil, "VALID_UNTIL_INVALID");
    if (generatedAt > now + MAX_CLOCK_SKEW_MS) fail("PROJECTION_FROM_FUTURE");
    if (validUntil <= now) fail("PROJECTION_STALE");
    if (validUntil <= generatedAt || validUntil - generatedAt > MAX_WINDOW_MS) {
      fail("PROJECTION_WINDOW_INVALID");
    }
    if (!Array.isArray(payload.destinations) || payload.destinations.length !== 17) {
      fail("DESTINATION_SET_INCOMPLETE");
    }
    var ids = {};
    payload.destinations.forEach(function (item) {
      exactKeys(item, [
        "destinationId",
        "productId",
        "ownerId",
        "name",
        "route",
        "state",
        "label",
        "summary",
        "limitation",
        "disposition",
        "freshUntil",
        "evidence",
        "artifact"
      ], "DESTINATION_SHAPE_INVALID");
      if (ids[item.destinationId]) fail("DESTINATION_ID_DUPLICATE");
      ids[item.destinationId] = item;
    });
    CANONICAL.forEach(function (canonical) {
      var item = ids[canonical.destinationId];
      if (!item) fail("DESTINATION_MISSING");
      ["productId", "ownerId", "name", "route"].forEach(function (key) {
        if (item[key] !== canonical[key]) fail("DESTINATION_CANON_MISMATCH");
      });
      if (DESTINATION_STATES.indexOf(item.state) === -1) {
        fail("DESTINATION_STATE_INVALID");
      }
      text(item.label, 80, "DESTINATION_LABEL_INVALID");
      text(item.summary, 240, "DESTINATION_SUMMARY_INVALID");
      text(item.limitation, 320, "DESTINATION_LIMITATION_REQUIRED");
      text(item.disposition, 100, "DESTINATION_DISPOSITION_INVALID");
      validateFresh(item.freshUntil, generatedAt, validUntil);
      validateEvidence(item.evidence, generatedAt);
      validateArtifact(item.artifact);
      if (item.state === "available" && item.artifact.kind === "none") {
        fail("AVAILABLE_WITHOUT_ARTIFACT");
      }
    });
    if (!Array.isArray(payload.currentContent) || payload.currentContent.length !== 3) {
      fail("CURRENT_SET_INCOMPLETE");
    }
    var slots = {};
    payload.currentContent.forEach(function (item) {
      exactKeys(item, [
        "slot",
        "ownerId",
        "state",
        "label",
        "title",
        "route",
        "publishedOn",
        "limitation",
        "disposition",
        "freshUntil",
        "evidence",
        "artifact"
      ], "CURRENT_ITEM_SHAPE_INVALID");
      if (CURRENT_SLOTS.indexOf(item.slot) === -1) fail("CURRENT_SLOT_INVALID");
      if (slots[item.slot]) fail("CURRENT_SLOT_DUPLICATE");
      slots[item.slot] = true;
      if (CURRENT_STATES.indexOf(item.state) === -1) fail("CURRENT_STATE_INVALID");
      text(item.ownerId, 120, "CURRENT_OWNER_INVALID");
      text(item.label, 80, "CURRENT_LABEL_INVALID");
      text(item.limitation, 320, "CURRENT_LIMITATION_REQUIRED");
      text(item.disposition, 100, "CURRENT_DISPOSITION_INVALID");
      validateFresh(item.freshUntil, generatedAt, validUntil);
      validateEvidence(item.evidence, generatedAt);
      validateArtifact(item.artifact);
      if (item.state === "quiet") {
        if (item.title !== null || item.route !== null || item.publishedOn !== null) {
          fail("QUIET_ITEM_CARRIES_CONTENT");
        }
      } else if (item.state === "withdrawn") {
        if (item.route !== null || item.artifact.kind !== "none") {
          fail("WITHDRAWN_ITEM_ACTIONABLE");
        }
      } else {
        text(item.title, 160, "CURRENT_TITLE_REQUIRED");
        if (typeof item.route !== "string" || item.route.charAt(0) !== "/") {
          fail("CURRENT_ROUTE_REQUIRED");
        }
        if (
          item.slot === "latest-episode" &&
          !/^\d{4}-\d{2}-\d{2}$/.test(item.publishedOn || "")
        ) {
          fail("EPISODE_PUBLICATION_DATE_REQUIRED");
        }
      }
    });
    CURRENT_SLOTS.forEach(function (slot) {
      if (!slots[slot]) fail("CURRENT_SLOT_MISSING");
    });
  }

  function fallback(code) {
    return {
      mode: "fail-closed",
      errorCode: code,
      projectionId: null,
      projectionSha256: null,
      sequence: null,
      replay: false,
      currentContent: [],
      destinations: CANONICAL.map(function (item) {
        return Object.assign({}, item, {
          state: "unavailable",
          label: "Current status unavailable",
          summary: "Open the named route only to check its current page.",
          limitation:
            "Current readiness could not be verified. Route arrival is navigation, not completion.",
          disposition: "FAIL_CLOSED_STATUS_UNAVAILABLE",
          completionClaim: false
        });
      })
    };
  }

  async function receive(envelope, options) {
    var settings = options || {};
    try {
      exactKeys(
        envelope,
        ["schemaVersion", "recordType", "payload", "integrity"],
        "ENVELOPE_SHAPE_INVALID"
      );
      if (
        envelope.schemaVersion !== VERSION ||
        envelope.recordType !== "readiness-current-projection"
      ) fail("ENVELOPE_VERSION_INVALID");
      exactKeys(
        envelope.integrity,
        ["algorithm", "canonicalization", "payloadSha256"],
        "INTEGRITY_SHAPE_INVALID"
      );
      if (
        envelope.integrity.algorithm !== "sha-256" ||
        envelope.integrity.canonicalization !== "RFC8785-JCS" ||
        !SHA256.test(envelope.integrity.payloadSha256)
      ) fail("INTEGRITY_CONTRACT_INVALID");
      var payloadSha256 = await shaValue(envelope.payload);
      if (payloadSha256 !== envelope.integrity.payloadSha256) {
        fail("PAYLOAD_HASH_MISMATCH");
      }
      if (
        settings.expectedPayloadSha256 &&
        settings.expectedPayloadSha256 !== payloadSha256
      ) fail("RELEASE_BINDING_MISMATCH");
      validatePayload(
        envelope.payload,
        settings.now ? new Date(settings.now).getTime() : Date.now()
      );
      var previous = settings.previousReceipt || null;
      if (previous) {
        if (envelope.payload.projectionId === previous.projectionId) {
          if (payloadSha256 !== previous.projectionSha256) {
            fail("IDEMPOTENCY_CONFLICT");
          }
          return success(envelope, payloadSha256, true);
        }
        if (envelope.payload.sequence <= previous.sequence) {
          fail("NON_MONOTONIC_PROJECTION");
        }
        if (envelope.payload.replacesProjectionId !== previous.projectionId) {
          fail("REPLACEMENT_CHAIN_GAP");
        }
      } else if (
        envelope.payload.sequence !== 1 ||
        envelope.payload.replacesProjectionId !== null
      ) fail("INITIAL_PROJECTION_INVALID");
      return success(envelope, payloadSha256, false);
    } catch (error) {
      return fallback(error && error.code || "PROJECTION_UNKNOWN_ERROR");
    }
  }

  function success(envelope, hash, replay) {
    return {
      mode: "fresh",
      errorCode: null,
      projectionId: envelope.payload.projectionId,
      projectionSha256: hash,
      sequence: envelope.payload.sequence,
      replay: replay,
      currentContent: clone(envelope.payload.currentContent),
      destinations: envelope.payload.destinations.map(function (item) {
        return Object.assign(clone(item), { completionClaim: false });
      })
    };
  }

  function visitorReceiver(receipt) {
    if (!receipt || !Array.isArray(receipt.destinations) ||
        receipt.destinations.length !== 17) {
      receipt = fallback("RECEIVER_INPUT_INVALID");
    }
    return {
      mode: receipt.mode,
      errorCode: receipt.errorCode,
      announcement: receipt.mode === "fresh"
        ? "Current destination status loaded."
        : "Current destination status is unavailable. All named routes remain available for status checking.",
      destinations: receipt.destinations.map(function (item) {
        return {
          destinationId: item.destinationId,
          name: item.name,
          route: item.state === "withdrawn"
            ? "/visitors-centre.html"
            : item.route,
          state: item.state,
          label: item.label,
          summary: item.summary,
          limitation: item.limitation,
          actionLabel: item.state === "available"
            ? "Open destination"
            : item.state === "limited"
              ? "Open destination — check limits"
              : "Open page — check current status",
          completionClaim: false
        };
      })
    };
  }

  function currentReceiver(receipt) {
    if (!receipt || receipt.mode !== "fresh" ||
        !Array.isArray(receipt.currentContent) ||
        receipt.currentContent.length !== 3) {
      return {
        mode: "fail-closed",
        errorCode: receipt && receipt.errorCode || "RECEIVER_INPUT_INVALID",
        announcement:
          "Current-content status is unavailable. Evergreen navigation remains.",
        items: []
      };
    }
    return {
      mode: "fresh",
      errorCode: null,
      announcement: "Current-content status loaded.",
      items: receipt.currentContent.map(function (item) {
        return {
          slot: item.slot,
          state: item.state,
          label: item.label,
          title: item.title,
          route: item.state === "available" ? item.route : null,
          publishedOn: item.publishedOn,
          limitation: item.limitation,
          promotable: item.state === "available",
          completionClaim: false
        };
      })
    };
  }

  global.LAIDIESEntryReadinessV1 = Object.freeze({
    VERSION: VERSION,
    CANONICAL_DESTINATIONS: CANONICAL,
    receive: receive,
    visitorCentreSemanticReceiver: visitorReceiver,
    entryCurrentContentReceiver: currentReceiver
  });
})(window);
