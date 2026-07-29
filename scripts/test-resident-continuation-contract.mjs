import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(
  new URL("../content/site/resident-continuation-v1.js", import.meta.url),
  "utf8"
);

class Storage {
  constructor(seed = {}) {
    this.values = new Map(Object.entries(seed));
  }
  get length() { return this.values.size; }
  key(index) { return [...this.values.keys()][index] ?? null; }
  getItem(key) { return this.values.has(key) ? this.values.get(key) : null; }
  setItem(key, value) { this.values.set(String(key), String(value)); }
  removeItem(key) { this.values.delete(String(key)); }
}

function makeDevice(path, title, seed = {}) {
  const localStorage = new Storage(seed);
  const listeners = new Map();
  const window = {
    CustomEvent: class {
      constructor(type, init) { this.type = type; this.detail = init?.detail; }
    },
    crypto: { randomUUID: () => `uuid-${Math.random()}` },
    dispatchEvent(event) {
      (listeners.get(event.type) || []).forEach((fn) => fn(event));
    },
    addEventListener(type, fn) {
      listeners.set(type, [...(listeners.get(type) || []), fn]);
    },
    localStorage,
    location: {
      pathname: path,
      search: "",
      hash: ""
    },
    setInterval() {},
    setTimeout,
    URL
  };
  const document = {
    title,
    visibilityState: "visible",
    addEventListener() {}
  };
  vm.runInNewContext(source, {
    window,
    document,
    CustomEvent: window.CustomEvent,
    URL,
    Set,
    Date,
    JSON,
    Number,
    Object,
    Array,
    String,
    RegExp,
    TypeError,
    Error
  });
  return { api: window.LAIDIESResidentContinuationV1, localStorage };
}

const d1 = makeDevice("/watch.html", "Episode 01 | LAiDIES", {
  laidies_screening_progress_v1: JSON.stringify({
    version: 1,
    programme: "01",
    time: 312.4,
    completed: false,
    savedAt: "2026-07-29T10:00:00.000Z"
  }),
  laidies_charms_found: JSON.stringify(["w1-butterfly-clip"]),
  "laidies_tour_2026-W31": JSON.stringify(["newsstand", "chick-flicks"])
});
d1.api.recordLastPage();
const first = d1.api.collectLocal();
assert.equal(first.episodes["01"].value.position_seconds, 312.4);
assert.deepEqual(
  Array.from(first.collections.charms.value),
  ["w1-butterfly-clip"]
);

const d2 = makeDevice("/laidies-card.html", "My Closet | LAiDIES", {
  laidies_screening_progress_v1: JSON.stringify({
    version: 1,
    programme: "01",
    time: 500,
    completed: false,
    savedAt: "2026-07-29T11:00:00.000Z"
  }),
  laidies_charms_found: JSON.stringify(["w2-postmark-stamp"]),
  "laidies_tour_2026-W31": JSON.stringify(["blend-snap"])
});
d2.api.recordLastPage();
const second = d2.api.collectLocal();
const merged = d1.api.mergeDocuments(first, second);
assert.equal(merged.last.path, "/laidies-card.html");
assert.equal(merged.episodes["01"].value.position_seconds, 500);
assert.deepEqual(
  Array.from(merged.collections.charms.value).sort(),
  ["w1-butterfly-clip", "w2-postmark-stamp"]
);
assert.deepEqual(
  Array.from(merged.activities["tour_2026-W31"].value).sort(),
  ["blend-snap", "chick-flicks", "newsstand"]
);

d1.api.applyDocument(merged);
const restoredProgress = JSON.parse(
  d1.localStorage.getItem("laidies_screening_progress_v1")
);
assert.equal(restoredProgress.programme, "01");
assert.equal(restoredProgress.time, 500);
assert.deepEqual(
  JSON.parse(d1.localStorage.getItem("laidies_charms_found")).sort(),
  ["w1-butterfly-clip", "w2-postmark-stamp"]
);

const malicious = structuredClone(merged);
malicious.last.path = "https://evil.example/";
assert.equal(d1.api.validateDocument(malicious).last, null);

const privateDraft = structuredClone(merged);
privateDraft.collections.promptDraft = {
  value: "confidential prompt",
  updated_at: "2026-07-29T12:00:00.000Z"
};
assert.ok(d1.api.validateDocument(privateDraft));
assert.equal(
  d1.api.collectLocal().collections.promptDraft,
  undefined,
  "unapproved/free-form local stores must not be collected"
);

const switched = makeDevice("/resident-card.html", "Resident Card | LAiDIES", {
  laidies_continuation_owner_v1: "resident-a",
  laidies_continuation_v1: JSON.stringify(merged),
  laidies_screening_progress_v1: JSON.stringify({
    version: 1,
    programme: "01",
    time: 500,
    completed: false,
    savedAt: "2026-07-29T11:00:00.000Z"
  }),
  laidies_charms_found: JSON.stringify(["resident-a-charm"]),
  laidies_private_prompt_draft: "must remain local and untouched"
});
let remoteForB = null;
const switchedRuntime = {
  controller: {
    getSession: async () => ({ user: { id: "resident-b" } })
  },
  client: {
    rpc: async (name, args) => {
      if (name === "get_my_resident_continuation_v1") {
        return {
          data: remoteForB
            ? { state: "saved", continuation: remoteForB }
            : { state: "empty", continuation: null },
          error: null
        };
      }
      remoteForB = {
        revision: "resident-b-revision",
        document: args.p_document
      };
      return {
        data: {
          state: "saved",
          revision: remoteForB.revision,
          document: remoteForB.document
        },
        error: null
      };
    }
  }
};
await switched.api.syncWith(switchedRuntime);
assert.equal(
  switched.localStorage.getItem("laidies_continuation_owner_v1"),
  "resident-b"
);
assert.equal(
  switched.localStorage.getItem("laidies_screening_progress_v1"),
  null,
  "switching accounts must not carry another resident's episode position"
);
assert.equal(
  switched.localStorage.getItem("laidies_charms_found"),
  null,
  "switching accounts must not carry another resident's collection"
);
assert.equal(
  switched.localStorage.getItem("laidies_private_prompt_draft"),
  "must remain local and untouched",
  "continuation must not inspect or delete excluded private/free-form stores"
);

console.log(
  "RESIDENT CONTINUATION CONTRACT PASS " +
  "episode_merge=1 collections_union=1 tour_union=1 safe_path=1 " +
  "private_exclusion=1 account_switch_isolation=1"
);
