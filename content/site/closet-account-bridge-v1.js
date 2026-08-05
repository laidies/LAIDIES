(function closetAccountBridgeV1() {
  "use strict";

  function canonicalJson(value) {
    if (Array.isArray(value)) {
      return value.map(canonicalJson);
    }
    if (value && typeof value === "object") {
      return Object.keys(value).sort().reduce(function (result, key) {
        result[key] = canonicalJson(value[key]);
        return result;
      }, {});
    }
    return value;
  }

  function sameDocument(left, right) {
    try {
      return JSON.stringify(canonicalJson(left)) ===
        JSON.stringify(canonicalJson(right));
    } catch (_) {
      return false;
    }
  }

  function setPersistence(message, tone) {
    var node = document.getElementById("closetPersistenceState");
    if (!node) return;
    node.textContent = message;
    if (tone === "account") {
      node.style.background = "#eef8f7";
      node.style.borderColor = "#13725f";
    } else if (tone === "error") {
      node.style.background = "#fff1f4";
      node.style.borderColor = "#b5204d";
    }
  }

  async function init() {
    var params = new URLSearchParams(window.location.search);
    if (params.has("u") || params.has("member")) return;
    try {
      var runtime = await window.LAIDIESResidentAccountRuntime.get();
      var state = await runtime.getState();
      if (state.error) throw state.error;
      if (!state.session) {
        setPersistence(
          "Device-local view: sign in at the Resident Card desk to restore your private account-backed Card on another browser.",
          "local"
        );
        return;
      }
      if (state.state !== "account-backed-resident" ||
          !state.remote ||
          !state.remote.card) {
        setPersistence(
          "Signed-in account: no account-backed Card is stored yet. Make and save one at MAiKEOVER, then keep it at the Resident Card desk.",
          "account"
        );
        return;
      }
      var local = runtime.localCard();
      var remoteDocument = state.remote.card.document;
      if (local.state !== "saved" ||
          !sameDocument(local.envelope, remoteDocument)) {
        runtime.writeLocalEnvelope(remoteDocument);
        window.location.reload();
        return;
      }
      setPersistence(
        "Account-backed view: this Closet restored the verified private Card saved with your signed-in account.",
        "account"
      );
    } catch (_) {
      setPersistence(
        "Device-local view: the account restore could not be checked. This Closet is still showing only supported information saved in this browser.",
        "error"
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
