(function closetAccountBridgeV1() {
  "use strict";

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
      var session = await runtime.controller.getSession();
      if (!session) {
        setPersistence(
          "Device-local view: this Closet shows only the Card saved in this browser. A sign-in-link request does not make it portable.",
          "local"
        );
        return;
      }
      setPersistence(
        "Signed-in session detected. This Closet still shows only Card details saved in this browser; account-backed restoration and cross-device continuation remain unavailable.",
        "account"
      );
    } catch (_) {
      setPersistence(
        "Device-local view: the account service could not be checked. This Closet is still showing only information saved in this browser.",
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
