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
    newsstandSeen: "laidies_newsstand_seen_v1",
    buildingVisits: "laidies_building_visits",
    quizProgress: "laidiesQuizProgress",
    quizBestScores: "laidiesQuizBestScores",
    luminaryMaven: "laidies_maven",
    luminaryBuilder: "laidies_builder",
    luminaryTownRegular: "laidies_town_regular"
  });
  var listeners = [];
  var syncPromise = null;
  var lastSnapshot = "";
  // Mirror the admitted profile IDs, not names or free-form profile content.
  var PREFERENCES = Object.freeze({
    luminaryMaven: "ada-lovelace grace-hopper hedy-lamarr karen-sparck-jones hannah-fry fei-fei-li timnit-gebru rachel-thomas joy-buolamwini kate-crawford meredith-whittaker emily-bender eniac-six margaret-hamilton frances-allen grace-wahba cynthia-dwork daphne-koller barbara-liskov jean-sammet adele-goldberg shafi-goldwasser lynn-conway".split(" "),
    luminaryBuilder: "mira-murati daniela-amodei lila-ibrahim fidji-simo chelsea-finn amanda-askell allie-k-miller".split(" "),
    luminaryTownRegular: "mme-claio fairy-godmother dj-sunnyv mayor-deb".split(" ")
  });
  function isPreference(name) {
    return Object.prototype.hasOwnProperty.call(PREFERENCES, name);
  }

  // These are private progress records, never currency or proof of ownership.
  function memoryValue(name, value) {
    if (isPreference(name)) {
      return value === null || value === "" ? null
        : PREFERENCES[name].indexOf(value) !== -1 ? value : undefined;
    }
    if (["buildingVisits", "quizProgress", "quizBestScores"].indexOf(name) === -1) return value;
    if (!isObject(value)) return undefined;
    var result = {};
    Object.keys(value).slice(0, 100).forEach(function (key) {
      if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/.test(key) || key === "constructor") return;
      var record = value[key];
      if (name === "quizBestScores") {
        if (Number.isFinite(record) && record >= 0 && record <= 100) result[key] = record;
        return;
      }
      if (!isObject(record)) return;
      var clean = {};
      var fields = name === "buildingVisits" ? ["n", "first", "last"]
        : ["bestScore", "latestScore", "latestCoreScore", "bestCoreScore", "maxScore", "bonusScore", "attempts"];
      fields.forEach(function (field) {
        if (Number.isFinite(record[field]) && record[field] >= 0 && record[field] <= Number.MAX_SAFE_INTEGER) clean[field] = record[field];
      });
      if (name === "quizProgress") {
        ["completedAt", "updated_at"].forEach(function (field) {
          if (safeTimestamp(record[field])) clean[field] = record[field];
        });
        // Existing quiz catalogue labels are display-only, never HTML.
        if (safeLabel(record.stickerTitle)) clean.stickerTitle = safeLabel(record.stickerTitle);
        if (safeLabel(record.stickerTier)) clean.stickerTier = safeLabel(record.stickerTier);
      }
      if (Object.keys(clean).length) result[key] = clean;
    });
    return result;
  }

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
    Object.keys(FIXED_ACTIVITIES).forEach(function (name) {
      var item = result.activities[name];
      if (!item) return;
      var clean = memoryValue(name, item.value);
      if (clean === undefined || !safeTimestamp(item.updated_at)) delete result.activities[name];
      else item.value = clean;
    });
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

  function writeLocalDocument(document, forceNotify) {
    var valid = validateDocument(document);
    if (!valid) throw new TypeError("Invalid Resident continuation document.");
    var changed = !same(readJson(DOCUMENT_KEY), valid);
    writeJson(DOCUMENT_KEY, valid);
    if (changed || forceNotify) notify(valid);
    return valid;
  }

  function clearSupportedLocalState() {
    function remove(key) {
      global.localStorage.removeItem(key);
      if (global.localStorage.getItem(key) !== null) throw new Error("continuation-local-clear-failed");
    }
    try {
      remove(DOCUMENT_KEY);
      remove("laidies_screening_progress_v1");
      Object.keys(FIXED_ACTIVITIES).forEach(function (name) {
        remove(FIXED_ACTIVITIES[name]);
      });
      Object.keys(FIXED_COLLECTIONS).forEach(function (name) {
        remove(FIXED_COLLECTIONS[name]);
      });
      for (var index = global.localStorage.length - 1;
           index >= 0;
           index -= 1) {
        var key = global.localStorage.key(index);
        if (/^laidies_tour_\d{4}-W\d{2}$/.test(key || "")) {
          remove(key);
        }
      }
    } catch (_) { throw new Error("continuation-local-clear-failed"); }
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
        if (isPreference(key) && left[section][key] && right[section][key] &&
            left[section][key].updated_at === right[section][key].updated_at &&
            (left[section][key].value === null || right[section][key].value === null)) {
          result[section][key] = entry(null, left[section][key].updated_at);
          return;
        }
        if (section === "activities" && (key === "buildingVisits" || key === "quizProgress")) {
          var l = left[section][key], r = right[section][key];
          var combined = mergeEntry(l, r, true);
          if (l && r) Object.keys(combined.value).forEach(function (id) {
            var a = l.value[id], b = r.value[id];
            if (!a || !b) return;
            if (key === "buildingVisits") {
              combined.value[id] = {
                n: Math.max(a.n || 0, b.n || 0),
                first: Math.min(a.first || Infinity, b.first || Infinity),
                last: Math.max(a.last || 0, b.last || 0)
              };
              if (!Number.isFinite(combined.value[id].first)) delete combined.value[id].first;
            } else {
              combined.value[id].bestScore = Math.max(a.bestScore || 0, b.bestScore || 0);
              combined.value[id].bestCoreScore = Math.max(a.bestCoreScore || 0, b.bestCoreScore || 0);
              combined.value[id].attempts = Math.max(a.attempts || 0, b.attempts || 0);
            }
          });
          result[section][key] = combined;
          return;
        }
        result[section][key] = mergeEntry(
          left[section][key],
          right[section][key],
          section !== "episodes" && !isPreference(key)
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
    var search = String(global.location.search || "");
    if (/\/laidies-card(?:\.html)?$/.test(global.location.pathname) &&
        /(?:^|[?&])(?:u|member)(?:=|&|$)/.test(search)) {
      return readLocalDocument();
    }
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
      value = memoryValue(name, value);
      var prior = document[section][name];
      if (value !== undefined && (value !== null || (isPreference(name) && prior))) {
        if (!prior || !same(prior.value, value)) {
          var changedAt = Math.max(Date.now(), (Date.parse(prior && prior.updated_at || "") || 0) + 1);
          document[section][name] = entry(value, new Date(changedAt).toISOString());
        }
      }
    });
  }

  function collectTours(document) {
    try {
      for (var i = 0; i < global.localStorage.length; i += 1) {
        var key = global.localStorage.key(i);
        if (!/^laidies_tour_\d{4}-W\d{2}$/.test(key)) continue;
        var value = readJson(key);
        if (Array.isArray(value)) {
          var name = key.replace("laidies_", "");
          if (!document.activities[name] || !same(document.activities[name].value, value)) {
            document.activities[name] = entry(value);
          }
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
      var item = valid.activities[name];
      if (isPreference(name)) {
        if (!item) return;
        if (item.value === null) global.localStorage.removeItem(FIXED_ACTIVITIES[name]);
        else global.localStorage.setItem(FIXED_ACTIVITIES[name], item.value);
        if (global.localStorage.getItem(FIXED_ACTIVITIES[name]) !== item.value) throw new Error("continuation-local-read-after-write-failed");
      } else {
        // The supplied document is already merged with local progress.
        applyEntry(FIXED_ACTIVITIES[name], item, false);
      }
    });
    Object.keys(valid.activities).forEach(function (name) {
      if (/^tour_\d{4}-W\d{2}$/.test(name)) {
        applyEntry("laidies_" + name, valid.activities[name], true);
      }
    });
    Object.keys(FIXED_COLLECTIONS).forEach(function (name) {
      applyEntry(FIXED_COLLECTIONS[name], valid.collections[name], true);
    });
    writeLocalDocument(valid, true);
    return valid;
  }

  function isConflict(error) {
    var message = String(error && error.message || "");
    return message.indexOf("revision-conflict") !== -1;
  }

  async function syncWith(runtime) {
    // A caller may have edited after the active request took its snapshot.
    // Wait, then collect again; joining the old promise would falsely report
    // that the caller's newer edit had reached the account.
    if (syncPromise) return syncPromise.catch(function () {}).then(function () { return syncWith(runtime); });
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
      // Bind before network work so a failed request cannot make another
      // account's staged data look like anonymous history on the next attempt.
      bindOwner(ownerId);
      writeLocalDocument(local);
      async function requireSameOwner() {
        var current = await runtime.controller.getSession();
        if (String(current && current.user && current.user.id || "") !== ownerId || boundOwner() !== ownerId) {
          throw new Error("continuation-session-changed");
        }
      }
      function ownerRpc(name, args) {
        var request = runtime.client.rpc(name, args);
        // Pin each request to the captured session, including if the SDK's
        // active account changes while it resolves authentication internally.
        if (session.access_token) {
          if (typeof request.setHeader !== "function") throw new Error("continuation-owner-binding-unavailable");
          request = request.setHeader("Authorization", "Bearer " + session.access_token);
        }
        return request;
      }
      for (var attempt = 0; attempt < 3; attempt += 1) {
        var remoteResult = await ownerRpc(
          "get_my_resident_continuation_v1"
        );
        if (remoteResult.error) throw remoteResult.error;
        await requireSameOwner();
        var remote = remoteResult.data &&
          remoteResult.data.continuation || null;
        var merged = mergeDocuments(
          collectLocal(),
          remote && remote.document
        );
        if (remote && same(merged, remote.document)) {
          applyDocument(merged);
          return { state: "account-backed", revision: remote.revision, document: merged };
        }
        var put = await ownerRpc(
          "put_my_resident_continuation_v1",
          {
            p_document: merged,
            p_idempotency_key: global.crypto.randomUUID(),
            p_expected_revision: remote && remote.revision || null
          }
        );
        if (!put.error) {
          var verified = await ownerRpc(
            "get_my_resident_continuation_v1"
          );
          if (verified.error ||
              !verified.data ||
              !verified.data.continuation ||
              verified.data.continuation.revision !== put.data.revision ||
              !same(verified.data.continuation.document, merged)) {
            throw new Error("continuation-remote-read-after-write-failed");
          }
          await requireSameOwner();
          // Preserve edits made while the request was in flight; the next
          // cycle will send them rather than overwriting them with its reply.
          applyDocument(mergeDocuments(merged, collectLocal()));
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
    function run(force) {
      var snapshot = JSON.stringify(canonical(collectLocal()));
      if (!force && snapshot === lastSnapshot) return;
      syncWith(runtime).then(function () { lastSnapshot = snapshot; }).catch(function () { lastSnapshot = ""; });
    }
    run();
    global.setInterval(function () { run(false); }, 5000);
    // Pull remote changes even when this browser has made no local edits.
    global.setInterval(function () { run(true); }, 30000);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") run(true);
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
