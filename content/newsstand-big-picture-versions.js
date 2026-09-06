(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.NewsstandBigPictureVersions = api;
})(typeof window !== "undefined" ? window : null, function () {
  "use strict";

  // These are the public story properties the NewsStand reader or its front-card
  // renderer can use. Deliberately absent: sourceApproval, review records,
  // production notes, deployment details, and Big Picture's mutable change log.
  var ARTICLE_FIELDS = [
    "id", "slug", "edition", "status", "publishedAt", "updatedAt", "lastCheckedAt",
    "thread", "thread_subtitle", "thread_entry", "headline",
    "the_story", "laidies_read", "what_this_means", "cocktail_party", "watch_fors",
    "closing_note", "class_notes", "heroVisual", "sources", "aidb_credit",
    "themes", "concepts", "tags", "categories", "saint_lane", "badge",
    "quick_read", "quick_read_label", "examination_intro", "examination_sections",
    "examination_conclusion", "front_examination", "front_read", "front_summary",
    "relatedPeople", "weeklyHighlights", "correctionHistory"
  ];
  var SNAPSHOT_FIELDS = [
    "versionId", "replacedAt", "summary", "originallyPublishedAt",
    "lastMeaningfullyUpdatedAt", "articleSha256", "article"
  ];
  var PRIVATE_KEY = /(?:approval|review(?:er)?|draft|tool|model|deploy|manifest|record|production|internal|private|changeLog|sourceApproval|priorStory)/i;
  var SHA256 = /^[a-f0-9]{64}$/;
  var SOURCE_FIELDS = ["id", "label", "url", "publisherType", "accessedAt"];
  var HERO_FIELDS = ["src", "alt", "credit"];
  var SECTION_FIELDS = ["title", "body"];
  var PERSON_FIELDS = ["profileId", "name", "reason"];
  var CORRECTION_FIELDS = ["correctedAt", "summary", "successorStoryId"];
  var STRING_LIST_FIELDS = ["watch_fors", "themes", "concepts", "tags", "categories", "weeklyHighlights", "front_examination"];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function canonical(value) {
    if (Array.isArray(value)) return "[" + value.map(canonical).join(",") + "]";
    if (value && typeof value === "object") {
      return "{" + Object.keys(value).sort().map(function (key) {
        return JSON.stringify(key) + ":" + canonical(value[key]);
      }).join(",") + "}";
    }
    return JSON.stringify(value);
  }

  // A synchronous implementation keeps browser rendering independent of async
  // Web Crypto. This identity is integrity-only, never quality or admission.
  function syncSha256(value) {
    var bytes = typeof TextEncoder !== "undefined" ? Array.from(new TextEncoder().encode(value)) : Array.from(unescape(encodeURIComponent(value))).map(function (c) { return c.charCodeAt(0); });
    var k = [1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998];
    var h = [1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225], words = [], i, j;
    var bitLength = bytes.length * 8;
    bytes.push(128); while ((bytes.length % 64) !== 56) bytes.push(0);
    for (i = 7; i >= 0; i--) bytes.push((bitLength / Math.pow(2, i * 8)) & 255);
    for (i = 0; i < bytes.length; i += 64) {
      for (j = 0; j < 16; j++) words[j] = (bytes[i + j * 4] << 24) | (bytes[i + j * 4 + 1] << 16) | (bytes[i + j * 4 + 2] << 8) | bytes[i + j * 4 + 3];
      for (j = 16; j < 64; j++) { var a0 = words[j - 15], a1 = words[j - 2]; words[j] = (((a0 >>> 7 | a0 << 25) ^ (a0 >>> 18 | a0 << 14) ^ (a0 >>> 3)) + words[j - 7] + ((a1 >>> 17 | a1 << 15) ^ (a1 >>> 19 | a1 << 13) ^ (a1 >>> 10)) + words[j - 16]) | 0; }
      var a=h[0],b=h[1],c=h[2],d=h[3],e=h[4],f=h[5],g=h[6],q=h[7];
      for (j = 0; j < 64; j++) { var s1=(e>>>6|e<<26)^(e>>>11|e<<21)^(e>>>25|e<<7), choose=(e&f)^(~e&g), temp1=(q+s1+choose+k[j]+words[j])|0, s0=(a>>>2|a<<30)^(a>>>13|a<<19)^(a>>>22|a<<10), majority=(a&b)^(a&c)^(b&c), temp2=(s0+majority)|0; q=g;g=f;f=e;e=(d+temp1)|0;d=c;c=b;b=a;a=(temp1+temp2)|0; }
      h[0]=(h[0]+a)|0;h[1]=(h[1]+b)|0;h[2]=(h[2]+c)|0;h[3]=(h[3]+d)|0;h[4]=(h[4]+e)|0;h[5]=(h[5]+f)|0;h[6]=(h[6]+g)|0;h[7]=(h[7]+q)|0;
    }
    return h.map(function (word) { return (word >>> 0).toString(16).padStart(8, "0"); }).join("");
  }

  function sha256(value, hash) {
    if (typeof hash === "function") return hash(canonical(value));
    return syncSha256(canonical(value));
  }

  function validDate(value) {
    var match = typeof value === "string" && value.match(/^(\d{4})-(\d{2})-(\d{2})(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2}))?$/);
    if (!match || isNaN(Date.parse(value))) return false;
    var date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
    return date.getUTCFullYear() === Number(match[1]) && date.getUTCMonth() === Number(match[2]) - 1 && date.getUTCDate() === Number(match[3]);
  }

  function hasPrivateKey(value) {
    if (!value || typeof value !== "object") return false;
    return Object.keys(value).some(function (key) {
      return PRIVATE_KEY.test(key) || hasPrivateKey(value[key]);
    });
  }

  function allowedObject(value, allowed) {
    return value && typeof value === "object" && !Array.isArray(value) &&
      Object.keys(value).every(function (key) { return allowed.indexOf(key) !== -1; });
  }

  function copyAllowed(value, fields) {
    var copy = {};
    fields.forEach(function (field) {
      if (Object.prototype.hasOwnProperty.call(value || {}, field)) copy[field] = clone(value[field]);
    });
    return copy;
  }

  function validStringList(value) {
    return Array.isArray(value) && value.every(function (item) { return typeof item === "string"; });
  }

  function rawArticleErrors(prior) {
    var errors = [];
    if (!prior || typeof prior !== "object") return ["Predecessor article is missing."];
    ["id", "slug", "headline"].forEach(function (field) {
      if (typeof prior[field] !== "string" || !prior[field].trim()) errors.push("Predecessor " + field + " is missing.");
    });
    ARTICLE_FIELDS.forEach(function (field) {
      if (STRING_LIST_FIELDS.indexOf(field) !== -1 || ["sources", "heroVisual", "examination_sections", "relatedPeople", "correctionHistory"].indexOf(field) !== -1) return;
      if (prior[field] !== undefined && prior[field] !== null && typeof prior[field] !== "string") errors.push("Predecessor " + field + " is not public text.");
    });
    ["sources", "examination_sections", "relatedPeople", "correctionHistory"].forEach(function (field) {
      if (prior[field] !== undefined && !Array.isArray(prior[field])) errors.push("Predecessor " + field + " is not a public list.");
    });
    if (Array.isArray(prior.sources) && prior.sources.some(function (source) {
      return !allowedObject(source, SOURCE_FIELDS.concat(["approvalStatus"])) || Object.keys(source).some(function (key) {
        return key !== "approvalStatus" && (PRIVATE_KEY.test(key) || typeof source[key] !== "string");
      });
    })) errors.push("Predecessor sources contain unsupported or private metadata.");
    if (prior.heroVisual && (!allowedObject(prior.heroVisual, HERO_FIELDS) || hasPrivateKey(prior.heroVisual) ||
        Object.keys(prior.heroVisual).some(function (key) { return typeof prior.heroVisual[key] !== "string"; }))) errors.push("Predecessor hero contains unsupported or private metadata.");
    if (Array.isArray(prior.examination_sections) && prior.examination_sections.some(function (section) {
      return !allowedObject(section, SECTION_FIELDS) || hasPrivateKey(section) || typeof section.title !== "string" || typeof section.body !== "string";
    })) errors.push("Predecessor examination sections contain unsupported or private metadata.");
    if (Array.isArray(prior.relatedPeople) && prior.relatedPeople.some(function (person) {
      return !allowedObject(person, PERSON_FIELDS) || hasPrivateKey(person) || typeof person.profileId !== "string" || typeof person.name !== "string" || (person.reason !== undefined && typeof person.reason !== "string");
    })) errors.push("Predecessor related people contain unsupported or private metadata.");
    if (Array.isArray(prior.correctionHistory) && prior.correctionHistory.some(function (item) {
      return !allowedObject(item, CORRECTION_FIELDS.concat(["owner"])) || !validDate(item.correctedAt) ||
        typeof item.summary !== "string" || typeof item.successorStoryId !== "string";
    })) errors.push("Predecessor correction history contains unsupported or private metadata.");
    STRING_LIST_FIELDS.forEach(function (field) {
      if (prior[field] !== undefined && !validStringList(prior[field])) errors.push("Predecessor " + field + " is not a public string list.");
    });
    return errors;
  }

  function publicArticle(prior) {
    var article = {};
    ARTICLE_FIELDS.forEach(function (field) {
      if (Object.prototype.hasOwnProperty.call(prior, field)) article[field] = clone(prior[field]);
    });
    // The reader renders source label, URL and vendor flag. Approval labels are
    // production metadata, so a historical reader snapshot never carries them.
    if (Array.isArray(article.sources)) article.sources = article.sources.map(function (source) { return copyAllowed(source, SOURCE_FIELDS); });
    if (article.heroVisual) article.heroVisual = copyAllowed(article.heroVisual, HERO_FIELDS);
    if (Array.isArray(article.examination_sections)) article.examination_sections = article.examination_sections.map(function (section) { return copyAllowed(section, SECTION_FIELDS); });
    if (Array.isArray(article.relatedPeople)) article.relatedPeople = article.relatedPeople.map(function (person) { return copyAllowed(person, PERSON_FIELDS); });
    if (Array.isArray(article.correctionHistory)) article.correctionHistory = article.correctionHistory.map(function (item) { return copyAllowed(item, CORRECTION_FIELDS); });
    return article;
  }

  function articleIdentity(article, hash) {
    return sha256(article, hash);
  }

  function validateProof(prior, proof, hash) {
    var rawErrors = rawArticleErrors(prior);
    if (rawErrors.length) return { ok: false, reason: rawErrors.join(" ") };
    var article = publicArticle(prior || {});
    var expected = articleIdentity(article, hash);
    if (!expected || !SHA256.test(expected)) return { ok: false, reason: "A deterministic SHA-256 implementation is required." };
    if (!proof || proof.kind !== "verified-public-artifact.v1" || proof.verificationState !== "PUBLICLY_VERIFIED" ||
        proof.independentlyVerified !== true || !validDate(proof.verifiedAt) || typeof proof.verifier !== "string" || !proof.verifier.trim() ||
        !SHA256.test(String(proof.articleSha256 || "")) || !SHA256.test(String(proof.artifactManifestSha256 || ""))) {
      return { ok: false, reason: "An explicit independently verified public-artifact proof is required." };
    }
    if (proof.articleSha256 !== expected) return { ok: false, reason: "Verified predecessor proof does not match the exact public article bytes." };
    return { ok: true, article: article, articleSha256: expected };
  }

  function createSnapshot(prior, input, proof, hash) {
    input = input || {};
    var checked = validateProof(prior, proof, hash);
    if (!checked.ok) return { ok: false, reason: checked.reason };
    var original = prior && prior.bigPicture && prior.bigPicture.originallyPublishedAt || prior && prior.publishedAt;
    var updated = prior && prior.bigPicture && prior.bigPicture.lastMeaningfullyUpdatedAt || prior && prior.updatedAt;
    if (!prior || prior.edition !== "big-picture" || ["published", "corrected"].indexOf(prior.status) === -1 || !validDate(original) || !validDate(updated) ||
        Date.parse(updated) < Date.parse(original) || !input.versionId || !validDate(input.replacedAt) ||
        Date.parse(input.replacedAt) < Date.parse(updated) || typeof input.summary !== "string" || !input.summary.trim()) {
      return { ok: false, reason: "Snapshot identity, dates, summary, and a published Big Picture predecessor are required." };
    }
    return { ok: true, snapshot: {
      versionId: String(input.versionId),
      replacedAt: input.replacedAt,
      summary: input.summary.trim(),
      originallyPublishedAt: original,
      lastMeaningfullyUpdatedAt: updated,
      articleSha256: checked.articleSha256,
      article: checked.article
    }};
  }

  function validateSnapshots(versions, hash) {
    var errors = [];
    var ids = new Set();
    var previous = null;
    if (!Array.isArray(versions)) return ["Big Picture previousVersions must be an array."];
    versions.forEach(function (snapshot, index) {
      var label = "Big Picture previousVersions[" + index + "]";
      if (!allowedObject(snapshot, SNAPSHOT_FIELDS) || hasPrivateKey(snapshot)) errors.push(label + " contains private or unsupported metadata.");
      if (!snapshot || !snapshot.versionId || ids.has(snapshot.versionId) || !validDate(snapshot.replacedAt) ||
          !validDate(snapshot.originallyPublishedAt) || !validDate(snapshot.lastMeaningfullyUpdatedAt) ||
          Date.parse(snapshot.lastMeaningfullyUpdatedAt) < Date.parse(snapshot.originallyPublishedAt) ||
          Date.parse(snapshot.replacedAt) < Date.parse(snapshot.lastMeaningfullyUpdatedAt) ||
          typeof snapshot.summary !== "string" || !snapshot.summary.trim()) errors.push(label + " has invalid identity, summary, or dates.");
      if (!snapshot || !allowedObject(snapshot.article, ARTICLE_FIELDS) || hasPrivateKey(snapshot && snapshot.article) || rawArticleErrors(snapshot && snapshot.article).length ||
          snapshot.article && (snapshot.article.edition !== "big-picture" || ["published", "corrected"].indexOf(snapshot.article.status) === -1 ||
            String(snapshot.article.publishedAt || "").slice(0, 10) !== String(snapshot.originallyPublishedAt || "").slice(0, 10) ||
            String(snapshot.article.updatedAt || "").slice(0, 10) !== String(snapshot.lastMeaningfullyUpdatedAt || "").slice(0, 10))) errors.push(label + " lacks a public published Big Picture article.");
      var identity = snapshot && snapshot.article ? articleIdentity(snapshot.article, hash) : null;
      if (!snapshot || !SHA256.test(String(snapshot.articleSha256 || "")) || !identity || snapshot.articleSha256 !== identity) errors.push(label + " integrity identity does not match its article.");
      if (previous && snapshot && validDate(snapshot.replacedAt) && Date.parse(snapshot.replacedAt) <= Date.parse(previous)) errors.push(label + " is not chronological.");
      if (snapshot && snapshot.versionId) ids.add(snapshot.versionId);
      previous = snapshot && snapshot.replacedAt;
    });
    return errors;
  }

  function resolveSnapshot(versions, versionId, hash) {
    var errors = validateSnapshots(versions, hash);
    if (errors.length) return { state: "unavailable", reason: "A retained version is unavailable because its public snapshot is invalid.", errors: errors };
    var snapshot = versions.find(function (item) { return item.versionId === versionId; });
    if (!snapshot) return { state: "unavailable", reason: "That retained version is unavailable." };
    return { state: "available", snapshot: clone(snapshot), story: clone(snapshot.article) };
  }

  return {
    ARTICLE_FIELDS: ARTICLE_FIELDS.slice(),
    SNAPSHOT_FIELDS: SNAPSHOT_FIELDS.slice(),
    canonical: canonical,
    syncSha256: syncSha256,
    validDate: validDate,
    publicArticle: publicArticle,
    articleIdentity: articleIdentity,
    createSnapshot: createSnapshot,
    validateProof: validateProof,
    validateSnapshots: validateSnapshots,
    resolveSnapshot: resolveSnapshot
  };
});
