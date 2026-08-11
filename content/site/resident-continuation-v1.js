(function installResidentContinuationV1(global) {
  "use strict";

  var DOCUMENT_KEY = "laidies_continuation_v1";
  var OWNER_KEY = "laidies_continuation_owner_v1";
  var SAFE_PATH = /^\/[A-Za-z0-9._~!$&'()*+,;=:@%/?#-]{0,300}$/;
  var FIXED_COLLECTIONS = Object.freeze({
    charms: "laidies_charms_found",
    tradingCards: "laidies_card_collection",
    tradingCardMeta: "laidies_cards_meta",
    puffies: "laidies_puffies_board",
    puffyPouch: "laidies_puffy_sticker_pouch",
    ritual: "laidies_ritual_done",
    express: "laidies_express_done"
  });
  var FIXED_ACTIVITIES = Object.freeze({
    welcomeTour: "laidies_welcome_tour_v1",
    tourCompletions: "laidies_tour_completions",
    tourLastRewardedWeek: "laidies_tour_last_rewarded_week",
    newsstandSeen: "laidies_newsstand_seen_v1"
  });
  var listeners = [];
  var syncPromise = null;
  var lastSnapshot = "";

  function now() {
    return new Date().toISOString();
  }

  function emptyDocument() {
    return {
      version: 1,
      last: null,
      episodes: {},
      activities: {},
      collections: {}
    };
  }

  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function isObject(value) {
    return !!value && typeof value === "object" && !Array.isArray(value);
  }

  function safeTimestamp(value) {
    var text = String(value || "");
    return /^\d{4}-\d{2}-\d{2}T/.test(text) &&
      Number.isFinite(Date.parse(text)) ? text : "";
  }

  function safePath(value) {
    var text = String(value || "");
    if (!SAFE_PATH.test(text) ||
        text.indexOf("//") === 0 ||
        text.indexOf("\\") !== -1 ||
        text.indexOf("/../") !== -1 ||
        text.indexOf("/./") !== -1) return "";
    return text;
  }

  function safeLabel(value) {
    var text = String(value || "").replace(/\s+/g, " ").trim();
    return text.length <= 120 && !/[<>\u0000-\u001f]/.test(text)
      ? text
      : "";
  }

  function canonical(value) {
    if (Array.isArray(value)) return value.map(canonical);
    if (isObject(value)) {
      return Object.keys(value).sort().reduce(function (result, key) {
        result[key] = canonical(value[key]);
        return result;
      }, {});
    }
    return value;
  }

  function same(left, right) {
    return JSON.stringify(canonical(left)) === JSON.stringify(canonical(right));
  }

  function validLast(value) {
    if (value === null) return null;
    if (!isObject(value)) return null;
    var path = safePath(value.path);
    var label = safeLabel(value.label);
    var kind = ["page", "episode", "activity", "tour", "closet"]
      .indexOf(value.kind) !== -1 ? value.kind : "";
    var updatedAt = safeTimestamp(value.updated_at);
    return path && label && kind && updatedAt
      ? { path: path, label: label, kind: kind, updated_at: updatedAt }
      : null;
  }

  function boundedMap(value, limit) {
    if (!isObject(value)) return {};
    return Object.keys(value).slice(0, limit).reduce(function (result, key) {
      if (/^[A-Za-z0-9._:-]{1,100}$/.test(key)) result[key] = clone(value[key]);
      return result;
    }, {});
  }

  function validateDocument(value) {
    if (!isObject(value) || value.version !== 1) return null;
    var result = emptyDocument();
    result.last = validLast(value.last);
    result.episodes = boundedMap(value.episodes, 50);
    result.activities = boundedMap(value.activities, 150);
    result.collections = boundedMap(value.collections, 40);
    try {
      return JSON.stringify(result).length <= 60000 ? result : null;
    } catch (_) {
      return null;
    }
  }

  function readJson(key) {
    try {
      var raw = global.localStorage.getItem(key);
      return raw == null ? null : JSON.parse(raw);
    } catch (_) {
      return null;
    }
  }

  function writeJson(key, value) {
    var serialized = JSON.stringify(value);
    global.localStorage.setItem(key, serialized);
    if (global.localStorage.getItem(key) !== serialized) {
      throw new Error("continuation-local-read-after-write-failed");
    }
  }

  function readLocalDocument() {
    return validateDocument(readJson(DOCUMENT_KEY)) || emptyDocument();
  }

  function writeLocalDocument(document) {
    var valid = validateDocument(document);
    if (!valid) throw new TypeError("Invalid Resident continuation document.");
    writeJson(DOCUMENT_KEY, valid);
    notify(valid);
    return valid;
  }

  function clearSupportedLocalState() {
    try {
      global.localStorage.removeItem(DOCUMENT_KEY);
      global.localStorage.removeItem("laidies_screening_progress_v1");
      Object.keys(FIXED_ACTIVITIES).forEach(function (name) {
        global.localStorage.removeItem(FIXED_ACTIVITIES[name]);
      });
      Object.keys(FIXED_COLLECTIONS).forEach(function (name) {
        global.localStorage.removeItem(FIXED_COLLECTIONS[name]);
      });
      for (var index = global.localStorage.length - 1;
           index >= 0;
           index -= 1) {
        var key = global.localStorage.key(index);
        if (/^laidies_tour_\d{4}-W\d{2}$/.test(key || "")) {
          global.localStorage.removeItem(key);
        }
      }
    } catch (_) {}
  }

  function boundOwner() {
    try {
      return String(global.localStorage.getItem(OWNER_KEY) || "");
    } catch (_) {
      return "";
    }
  }

  function bindOwner(ownerId) {
    var value = String(ownerId || "");
    if (!value) throw new TypeError("A continuation owner is required.");
    global.localStorage.setItem(OWNER_KEY, value);
    if (global.localStorage.getItem(OWNER_KEY) !== value) {
      throw new Error("continuation-owner-read-after-write-failed");
    }
  }

  function entry(value, updatedAt) {
    return { value: clone(value), updated_at: safeTimestamp(updatedAt) || now() };
  }

  function newest(left, right) {
    if (!left) return clone(right);
    if (!right) return clone(left);
    var lt = Date.parse(left.updated_at || "") || 0;
    var rt = Date.parse(right.updated_at || "") || 0;
    return clone(rt >= lt ? right : left);
  }

  function unionArrays(left, right) {
    var seen = new Set();
    return (Array.isArray(left) ? left : [])
      .concat(Array.isArray(right) ? right : [])
      .filter(function (item) {
        var key = JSON.stringify(canonical(item));
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function mergeValues(left, right) {
    if (Array.isArray(left) || Array.isArray(right)) {
      return unionArrays(left, right);
    }
    if (isObject(left) && isObject(right)) {
      var result = clone(left);
      Object.keys(right).forEach(function (key) {
        if (!(key in result)) {
          result[key] = clone(right[key]);
        } else if (isObject(result[key]) && isObject(right[key])) {
          var ltime = Date.parse(result[key].completedAt ||
            result[key].updated_at || result[key].savedAt || "") || 0;
          var rtime = Date.parse(right[key].completedAt ||
            right[key].updated_at || right[key].savedAt || "") || 0;
          result[key] = rtime >= ltime
            ? Object.assign({}, result[key], clone(right[key]))
            : Object.assign({}, clone(right[key]), result[key]);
        } else if (typeof result[key] === "number" &&
                   typeof right[key] === "number") {
          result[key] = Math.max(result[key], right[key]);
        }
      });
      return result;
    }
    if (typeof left === "number" && typeof right === "number") {
      return Math.max(left, right);
    }
    return clone(right == null ? left : right);
  }

  function mergeEntry(left, right, union) {
    if (!left) return clone(right);
    if (!right) return clone(left);
    if (!union) return newest(left, right);
    return {
      value: mergeValues(left.value, right.value),
      updated_at: (Date.parse(left.updated_at || "") || 0) >=
        (Date.parse(right.updated_at || "") || 0)
        ? left.updated_at
        : right.updated_at
    };
  }

  function mergeDocuments(leftValue, rightValue) {
    var left = validateDocument(leftValue) || emptyDocument();
    var right = validateDocument(rightValue) || emptyDocument();
    var result = emptyDocument();
    result.last = newest(
      left.last && { value: left.last, updated_at: left.last.updated_at },
      right.last && { value: right.last, updated_at: right.last.updated_at }
    );
    result.last = result.last ? result.last.value : null;

    ["episodes", "activities", "collections"].forEach(function (section) {
      var keys = new Set(
        Object.keys(left[section]).concat(Object.keys(right[section]))
      );
      keys.forEach(function (key) {
        result[section][key] = mergeEntry(
          left[section][key],
          right[section][key],
          section !== "episodes"
        );
      });
    });
    return validateDocument(result);
  }

  function currentPageKind() {
    var path = global.location.pathname;
    if (/\/watch(?:\.html)?$/.test(path)) return "episode";
    if (/\/laidies-card(?:\.html)?$/.test(path)) return "closet";
    if (/\/games\//.test(path) || /\/learn\//.test(path)) return "activity";
    if (/tour/.test(global.location.search + global.location.hash)) return "tour";
    return "page";
  }

  function recordLastPage() {
    var path = safePath(
      global.location.pathname + global.location.search + global.location.hash
    );
    var label = safeLabel(document.title.replace(/\s*[|·—-]\s*LAiDIES.*$/i, ""));
    if (!path || !label || path.indexOf("/resident-card") === 0) {
      return readLocalDocument();
    }
    var local = readLocalDocument();
    local.last = {
      path: path,
      label: label,
      kind: currentPageKind(),
      updated_at: now()
    };
    return writeLocalDocument(local);
  }

  function collectEpisode(document) {
    var progress = readJson("laidies_screening_progress_v1");
    var programme = String(progress && (progress.programme || progress.ep) || "");
    if (!isObject(progress) ||
        !(/^\d{1,3}$/.test(programme) || programme === "trailer") ||
        !Number.isFinite(Number(progress.time)) || Number(progress.time) < 0) return;
    var key = programme === "trailer"
      ? programme
      : programme.padStart(2, "0");
    document.episodes[key] = entry({
      position_seconds: Math.round(Number(progress.time) * 10) / 10,
      completed: progress.completed === true
    }, progress.savedAt || progress.updated_at);
  }

  function collectFixed(document, section, config) {
    Object.keys(config).forEach(function (name) {
      var value = readJson(config[name]);
      if (value === null) {
        try {
          var raw = global.localStorage.getItem(config[name]);
          if (raw !== null && raw !== "") value = raw;
        } catch (_) {}
      }
      if (value !== null) document[section][name] = entry(value);
    });
  }

  function collectTours(document) {
    try {
      for (var i = 0; i < global.localStorage.length; i += 1) {
        var key = global.localStorage.key(i);
        if (!/^laidies_tour_\d{4}-W\d{2}$/.test(key)) continue;
        var value = readJson(key);
        if (Array.isArray(value)) {
          document.activities[key.replace("laidies_", "")] = entry(value);
        }
      }
    } catch (_) {}
  }

  function collectLocal() {
    var result = readLocalDocument();
    collectEpisode(result);
    collectFixed(result, "activities", FIXED_ACTIVITIES);
    collectTours(result);
    collectFixed(result, "collections", FIXED_COLLECTIONS);
    return validateDocument(result);
  }

  function applyEntry(storageKey, remoteEntry, union) {
    if (!remoteEntry || !("value" in remoteEntry)) return;
    var local = readJson(storageKey);
    var value = union ? mergeValues(local, remoteEntry.value) : remoteEntry.value;
    writeJson(storageKey, value);
  }

  function applyDocument(document) {
    var valid = validateDocument(document);
    if (!valid) throw new TypeError("Invalid remote continuation.");
    var episodeKeys = Object.keys(valid.episodes);
    if (episodeKeys.length) {
      var current = readJson("laidies_screening_progress_v1");
      var newestEpisode = episodeKeys.map(function (key) {
        return { key: key, item: valid.episodes[key] };
      }).sort(function (a, b) {
        return (Date.parse(b.item.updated_at || "") || 0) -
          (Date.parse(a.item.updated_at || "") || 0);
      })[0];
      var remote = newestEpisode.item.value;
      if (!current ||
          (Date.parse(newestEpisode.item.updated_at || "") || 0) >=
          (Date.parse(current.savedAt || current.updated_at || "") || 0)) {
        writeJson("laidies_screening_progress_v1", {
          version: 1,
          programme: newestEpisode.key,
          time: Number(remote.position_seconds) || 0,
          completed: remote.completed === true,
          savedAt: newestEpisode.item.updated_at
        });
      }
    }
    Object.keys(FIXED_ACTIVITIES).forEach(function (name) {
      applyEntry(FIXED_ACTIVITIES[name], valid.activities[name], true);
    });
    Object.keys(valid.activities).forEach(function (name) {
      if (/^tour_\d{4}-W\d{2}$/.test(name)) {
        applyEntry("laidies_" + name, valid.activities[name], true);
      }
    });
    Object.keys(FIXED_COLLECTIONS).forEach(function (name) {
      applyEntry(FIXED_COLLECTIONS[name], valid.collections[name], true);
    });
    writeLocalDocument(valid);
    return valid;
  }

  function isConflict(error) {
    var message = String(error && error.message || "");
    return message.indexOf("revision-conflict") !== -1;
  }

  async function syncWith(runtime) {
    if (syncPromise) return syncPromise;
    syncPromise = (async function () {
      var session = await runtime.controller.getSession();
      var local = collectLocal();
      if (!session) {
        return { state: "device-local", document: writeLocalDocument(local) };
      }
      var ownerId = String(session.user && session.user.id || "");
      if (!ownerId) throw new Error("continuation-session-owner-missing");
      var previousOwner = boundOwner();
      if (previousOwner && previousOwner !== ownerId) {
        clearSupportedLocalState();
        local = emptyDocument();
      }
      for (var attempt = 0; attempt < 3; attempt += 1) {
        var remoteResult = await runtime.client.rpc(
          "get_my_resident_continuation_v1"
        );
        if (remoteResult.error) throw remoteResult.error;
        var remote = remoteResult.data &&
          remoteResult.data.continuation || null;
        var merged = mergeDocuments(
          local,
          remote && remote.document
        );
        applyDocument(merged);
        var put = await runtime.client.rpc(
          "put_my_resident_continuation_v1",
          {
            p_document: merged,
            p_idempotency_key: global.crypto.randomUUID(),
            p_expected_revision: remote && remote.revision || null
          }
        );
        if (!put.error) {
          var verified = await runtime.client.rpc(
            "get_my_resident_continuation_v1"
          );
          if (verified.error ||
              !verified.data ||
              !verified.data.continuation ||
              verified.data.continuation.revision !== put.data.revision ||
              !same(verified.data.continuation.document, merged)) {
            throw new Error("continuation-remote-read-after-write-failed");
          }
          writeLocalDocument(merged);
          bindOwner(ownerId);
          return {
            state: "account-backed",
            revision: put.data.revision,
            document: merged
          };
        }
        if (!isConflict(put.error)) throw put.error;
      }
      throw new Error("continuation-revision-conflict");
    })().finally(function () {
      syncPromise = null;
    });
    return syncPromise;
  }

  function notify(document) {
    listeners.slice().forEach(function (listener) {
      try { listener(clone(document)); } catch (_) {}
    });
    try {
      global.dispatchEvent(new CustomEvent("laidies:continuation-change", {
        detail: clone(document)
      }));
    } catch (_) {}
  }

  function subscribe(listener) {
    if (typeof listener !== "function") return function () {};
    listeners.push(listener);
    return function () {
      listeners = listeners.filter(function (item) { return item !== listener; });
    };
  }

  function resumeTarget() {
    var local = readLocalDocument();
    return local.last && safePath(local.last.path)
      ? clone(local.last)
      : null;
  }

  function startAutoSync(runtime) {
    recordLastPage();
    function run() {
      var snapshot = JSON.stringify(canonical(collectLocal()));
      if (snapshot === lastSnapshot) return;
      lastSnapshot = snapshot;
      syncWith(runtime).catch(function () {});
    }
    run();
    global.setInterval(run, 5000);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") run();
    });
  }

  global.LAIDIESResidentContinuationV1 = Object.freeze({
    DOCUMENT_KEY: DOCUMENT_KEY,
    OWNER_KEY: OWNER_KEY,
    applyDocument: applyDocument,
    clearSupportedLocalState: clearSupportedLocalState,
    collectLocal: collectLocal,
    emptyDocument: emptyDocument,
    mergeDocuments: mergeDocuments,
    readLocalDocument: readLocalDocument,
    recordLastPage: recordLastPage,
    resumeTarget: resumeTarget,
    startAutoSync: startAutoSync,
    subscribe: subscribe,
    syncWith: syncWith,
    validateDocument: validateDocument
  });
})(window);
