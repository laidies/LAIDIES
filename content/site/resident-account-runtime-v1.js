(function installResidentAccountRuntimeV1(global) {
  "use strict";

  var instancePromise = null;

  function localCard() {
    var contract = global.LAIDIESResidentCard;
    return contract
      ? contract.read(global.localStorage)
      : { state: "unavailable" };
  }

  function hasLocalHistory() {
    try {
      return !!(
        global.localStorage.getItem("laidies_resident_card_v1") ||
        global.localStorage.getItem("laidies_display_name") ||
        global.localStorage.getItem("laidies_card_username")
      );
    } catch (_) {
      return false;
    }
  }

  function writeLocalEnvelope(envelope) {
    var contract = global.LAIDIESResidentCard;
    var validated = contract && contract.validateEnvelope(envelope);
    if (!validated) throw new TypeError("The account Card is not a valid Resident Card.");
    var serialized = JSON.stringify(validated);
    global.localStorage.setItem(contract.CARD_KEY, serialized);
    if (global.localStorage.getItem(contract.CARD_KEY) !== serialized) {
      throw new Error("local-card-read-after-write-failed");
    }
    return validated;
  }

  function callbackCode() {
    return new URLSearchParams(global.location.search).get("code") || "";
  }

  function clearCallbackCode() {
    var url = new URL(global.location.href);
    url.searchParams.delete("code");
    global.history.replaceState({}, "", url.pathname + url.search + url.hash);
  }

  async function createRuntime() {
    var config = global.LAIDIES_SUPABASE_CONFIG;
    var identity = global.LAIDIESIdentityV1;
    if (!config || !config.url || !config.anonKey || !identity) {
      throw new Error("resident-account-dependencies-unavailable");
    }
    var module = await import(
      "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm"
    );
    var client = module.createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
        flowType: "pkce"
      }
    });
    var controller = identity.create({
      client: client,
      location: global.location,
      allowedRedirectPaths: [
        "/resident-card",
        "/resident-card.html",
        "/maikeover",
        "/maikeover.html",
        "/laidies-card",
        "/laidies-card.html"
      ],
      readLocalCard: localCard,
      hasLocalHistory: hasLocalHistory
    });
    var code = callbackCode();
    if (code) {
      await controller.exchangeCode(code);
      clearCallbackCode();
    }
    return Object.freeze({
      client: client,
      controller: controller,
      getState: controller.getState,
      localCard: localCard,
      writeLocalEnvelope: writeLocalEnvelope
    });
  }

  function get() {
    if (!instancePromise) instancePromise = createRuntime();
    return instancePromise;
  }

  global.LAIDIESResidentAccountRuntime = Object.freeze({
    get: get
  });
})(window);
