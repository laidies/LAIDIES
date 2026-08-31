import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(
  process.env.CONTINUATION_SOURCE || new URL("../content/site/resident-continuation-v1.js", import.meta.url),
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

function makeDevice(path, title, seed = {}, search = "") {
  let clock = Date.parse("2026-08-30T10:00:00Z");
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : [clock])); }
    static now() { return clock; }
  }
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
      search,
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
    Date: Clock,
    JSON,
    Number,
    Object,
    Array,
    String,
    RegExp,
    TypeError,
    Error
  });
  return { api: window.LAIDIESResidentContinuationV1, localStorage, tick: () => { clock += 1000; } };
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

const publicCardVisit = makeDevice(
  "/laidies-card.html",
  "Another resident's Closet | LAiDIES",
  { laidies_continuation_v1: JSON.stringify(first) },
  "?u=public_alice"
);
const publicCardBefore = publicCardVisit.localStorage.getItem("laidies_continuation_v1");
publicCardVisit.api.recordLastPage();
assert.equal(
  publicCardVisit.localStorage.getItem("laidies_continuation_v1"),
  publicCardBefore,
  "another resident's public Card must not become this resident's resume target"
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
  "private_exclusion=1 public_card_resume_exclusion=1 account_switch_isolation=1"
);

// Calibrated against the public predecessor: these assertions must fail there.
const memory = makeDevice("/laidies-card", "My Closet", {
  laidies_maven: "ada-lovelace",
  laidies_builder: "mira-murati",
  laidies_town_regular: "dj-sunnyv",
  laidies_building_visits: JSON.stringify({ library: { n: 3, first: 1000, last: 3000 } }),
  laidiesQuizProgress: JSON.stringify({ ep01: { bestScore: 4, attempts: 2, completedAt: "2026-08-29T10:00:00Z" } }),
  laidiesQuizBestScores: JSON.stringify({ ep01: 4 }),
  laidies_private_prompt_draft: "excluded"
});
const saved = memory.api.collectLocal();
assert.equal(saved.activities.luminaryMaven?.value, "ada-lovelace", "favourite must be collected");
assert.equal(saved.activities.buildingVisits.value.library.n, 3);
assert.equal(saved.activities.quizProgress.value.ep01.bestScore, 4);
memory.api.applyDocument(saved);
assert.equal(memory.localStorage.getItem("laidies_maven"), "ada-lovelace", "raw slug must not become quoted JSON");
memory.tick();
assert.equal(JSON.stringify(memory.api.collectLocal()), JSON.stringify(saved), "reads must not manufacture new edits");
const fresh = makeDevice("/laidies-card", "My Closet");
fresh.api.applyDocument(saved);
let rehydrated = 0;
fresh.api.subscribe(() => { rehydrated += 1; });
fresh.localStorage.removeItem("laidies_builder");
fresh.api.applyDocument(saved);
assert.equal(rehydrated, 1, "same-document rehydration must notify open consumers");
assert.equal(fresh.localStorage.getItem("laidies_builder"), "mira-murati");
assert.equal(JSON.parse(fresh.localStorage.getItem("laidies_building_visits")).library.n, 3);
fresh.tick();
fresh.localStorage.setItem("laidies_maven", "grace-hopper");
const edited = fresh.api.collectLocal();
const combined = memory.api.mergeDocuments(memory.api.collectLocal(), edited);
assert.equal(combined.activities.luminaryMaven.value, "grace-hopper", "newer choice wins over stale device");
fresh.api.applyDocument(combined);
fresh.tick();
fresh.localStorage.removeItem("laidies_maven");
const cleared = fresh.api.collectLocal();
const clearedMerge = memory.api.mergeDocuments(saved, cleared);
memory.api.applyDocument(clearedMerge);
assert.equal(memory.localStorage.getItem("laidies_maven"), null, "cleared favourites must not resurrect");
const improved = structuredClone(saved);
improved.activities.buildingVisits.value = { library: { n: 5, first: 2000, last: 4000 }, newsstand: { n: 1, first: 2500, last: 2500 } };
improved.activities.quizProgress.value.ep01 = { bestScore: 2, attempts: 3, completedAt: "2026-08-30T10:00:00Z" };
const progressMerge = memory.api.mergeDocuments(saved, improved);
assert.equal(progressMerge.activities.buildingVisits.value.library.n, 5, "replicated counts are not summed");
assert.equal(progressMerge.activities.buildingVisits.value.library.first, 1000);
assert.equal(progressMerge.activities.buildingVisits.value.library.last, 4000);
assert.equal(progressMerge.activities.quizProgress.value.ep01.bestScore, 4, "later lower attempt must not erase best score");
assert.equal(progressMerge.activities.quizProgress.value.ep01.attempts, 3);
memory.api.clearSupportedLocalState();
for (const key of ["laidies_maven", "laidies_builder", "laidies_town_regular", "laidies_building_visits", "laidiesQuizProgress", "laidiesQuizBestScores"]) {
  assert.equal(memory.localStorage.getItem(key), null, `account switch clears ${key}`);
}
assert.equal(memory.localStorage.getItem("laidies_private_prompt_draft"), "excluded");
console.log("CLOSET MEMORY CONTRACT PASS restore=1 raw_slug=1 stable_timestamp=1 stale_choice=1 clear=1 best_score=1 visits=1 isolation=1");

const profiles = JSON.parse(fs.readFileSync(new URL("../content/luminairy-profiles.json", import.meta.url)));
const closet = fs.readFileSync(new URL("../laidies-card.html", import.meta.url), "utf8");
for (const [group,key] of [["mavens","laidies_maven"],["trailblazers","laidies_builder"]]) {
  for (const profile of profiles[group]) {
    const d = makeDevice("/luminairy", "Luminary", {[key]:profile.id});
    const name = group === "mavens" ? "luminaryMaven" : "luminaryBuilder";
    assert.equal(d.api.collectLocal().activities[name]?.value, profile.id, `${profile.id} must be admitted to sync`);
    assert.ok(closet.includes(`'${profile.id}':`), `${profile.id} needs a Closet label`);
  }
}

const racing = makeDevice("/luminairy", "Luminary", {laidies_maven:"ada-lovelace"});
let db = null, writes = 0, owner = "resident-a";
const racingRuntime = {
  controller:{getSession:async()=>({user:{id:owner}})},
  client:{rpc:async(name,args)=>{
    if(name === "get_my_resident_continuation_v1") return {data:{continuation:db},error:null};
    writes += 1;
    db = {document:structuredClone(args.p_document),revision:`revision-${writes}`};
    if(writes === 1) { racing.tick(); racing.localStorage.setItem("laidies_maven","grace-hopper"); }
    return {data:{revision:db.revision},error:null};
  }}
};
await Promise.all([racing.api.syncWith(racingRuntime),racing.api.syncWith(racingRuntime)]);
assert.equal(db.document.activities.luminaryMaven.value,"grace-hopper","queued save must send an in-flight edit");
const writeCount = writes;
await racing.api.syncWith(racingRuntime);
assert.equal(writes,writeCount,"unchanged remote snapshot must not create a mutation");
const guarded = makeDevice("/luminairy", "Luminary", {laidies_maven:"ada-lovelace",laidies_continuation_owner_v1:"resident-a"});
guarded.localStorage.removeItem = () => {};
owner = "resident-b";
await assert.rejects(guarded.api.syncWith(racingRuntime), /continuation-local-clear-failed/);
assert.equal(writes,writeCount,"failed isolation must stop before backend mutation");
const switching = makeDevice("/luminairy", "Luminary", {laidies_maven:"ada-lovelace"});
owner = "resident-a";
const changedSession = {controller:racingRuntime.controller,client:{rpc:async()=>{owner="resident-b";return {data:{continuation:db},error:null};}}};
await assert.rejects(switching.api.syncWith(changedSession), /continuation-session-changed/);
assert.equal(switching.localStorage.getItem("laidies_maven"),"ada-lovelace","foreign reply is not applied");
console.log("CLOSET MEMORY RACE CONTRACT PASS queued_edit=1 no_op=1 failed_clear=1 switched_session=1");

const stickersDevice = makeDevice('/radio','Radio', {laidies_ksvl_sticker_picks_v1:JSON.stringify({picked:true,slugs:['ksvl-community-raidio','band-the-laidies','ksvl-encore','bad']})});
const picksDoc = stickersDevice.api.collectLocal();
assert.ok(picksDoc.activities.ksvlStickerPicks, 'declaration picks must be collected');
assert.deepEqual(JSON.parse(JSON.stringify(picksDoc.activities.ksvlStickerPicks.value)), {picked:true,slugs:['band-the-laidies','ksvl-community-raidio']}, 'only declaration picks are collected');
const stablePicks = stickersDevice.api.collectLocal();
assert.equal(stablePicks.activities.ksvlStickerPicks.updated_at,picksDoc.activities.ksvlStickerPicks.updated_at);
stickersDevice.tick();
stickersDevice.localStorage.setItem('laidies_ksvl_sticker_picks_v1',JSON.stringify({picked:true,slugs:[]}));
const removedPicks = stickersDevice.api.collectLocal();
const mergedPicks = stickersDevice.api.mergeDocuments(picksDoc,removedPicks);
assert.equal(mergedPicks.activities.ksvlStickerPicks.value.slugs.length,0,'stale browser cannot resurrect removed picks');
stickersDevice.api.applyDocument(mergedPicks);
assert.equal(JSON.parse(stickersDevice.localStorage.getItem('laidies_ksvl_sticker_picks_v1')).slugs.length,0);
stickersDevice.localStorage.setItem('laidies_ksvl_stickers_earned','["band-the-laidies"]');
stickersDevice.localStorage.setItem('laidies_ksvl_stickers_picked','1');
stickersDevice.api.clearSupportedLocalState();
for (const key of ['laidies_ksvl_sticker_picks_v1','laidies_ksvl_stickers_earned','laidies_ksvl_stickers_picked']) assert.equal(stickersDevice.localStorage.getItem(key),null);
console.log('KSVL DECLARATION MEMORY PASS allowlist=1 stable=1 removal=1 legacy_account_clear=1');
