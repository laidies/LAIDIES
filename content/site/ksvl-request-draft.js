(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.KSVLRequestDraft = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  var DRAFT_KEY = 'ksvl_pending_request';
  var DRAFT_TTL_MS = 6 * 60 * 60 * 1000;
  var FUTURE_SKEW_MS = 5 * 60 * 1000;
  var ALLOWED_STYLES = Object.freeze([
    'y2k-pop-anthem',
    'y2k-teen-drama-ballad',
    'y2k-rnb-slow-jam',
    'late-90s-alt-rock',
    'y2k-country-pop',
    'coffeehouse-acoustic',
    'y2k-retro-house',
    'saint-anthem',
    'deb-comedy-song'
  ]);

  function hasExactKeys(value, allowed) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
    var keys = Object.keys(value).sort();
    var expected = allowed.slice().sort();
    return keys.length === expected.length && keys.every(function (key, index) {
      return key === expected[index];
    });
  }

  function normalize(value, now) {
    var current = Number(now);
    if (!Number.isFinite(current)) return null;
    var currentKeys = ['schema_version', 'style', 'topic', 'lyrics', 'saved_at'];
    var legacyKeys = ['style', 'topic', 'lyrics', 'saved_at'];
    var isCurrent = hasExactKeys(value, currentKeys) && value.schema_version === 1;
    var isLegacy = hasExactKeys(value, legacyKeys);
    if (!isCurrent && !isLegacy) return null;
    if (typeof value.style !== 'string' || ALLOWED_STYLES.indexOf(value.style) === -1) return null;
    if (typeof value.topic !== 'string' || typeof value.lyrics !== 'string' || typeof value.saved_at !== 'string') return null;
    var topic = value.topic.trim();
    var lyrics = value.lyrics.trim();
    if (topic.length < 3 || topic.length > 200 || lyrics.length > 1000) return null;
    var savedAt = Date.parse(value.saved_at);
    if (!Number.isFinite(savedAt) || savedAt > current + FUTURE_SKEW_MS || current - savedAt > DRAFT_TTL_MS) return null;
    return {
      draft: {
        schema_version: 1,
        style: value.style,
        topic: topic,
        lyrics: lyrics,
        saved_at: new Date(savedAt).toISOString()
      },
      legacy: isLegacy
    };
  }

  function read(storage, now) {
    var raw;
    try {
      raw = storage.getItem(DRAFT_KEY);
    } catch (_) {
      return { state: 'unavailable' };
    }
    if (raw === null) return { state: 'empty' };
    var parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (_) {
      parsed = null;
    }
    var normalized = normalize(parsed, now);
    if (!normalized) {
      try { storage.removeItem(DRAFT_KEY); } catch (_) {}
      return { state: 'discarded' };
    }
    var migrated = false;
    if (normalized.legacy) {
      try {
        storage.setItem(DRAFT_KEY, JSON.stringify(normalized.draft));
        migrated = true;
      } catch (_) {}
    }
    return { state: 'restored', draft: normalized.draft, migrated: migrated };
  }

  function write(storage, input, now) {
    var draft = {
      schema_version: 1,
      style: input && input.style,
      topic: input && input.topic,
      lyrics: input && input.lyrics,
      saved_at: new Date(Number(now)).toISOString()
    };
    var normalized = normalize(draft, now);
    if (!normalized) return { state: 'invalid' };
    var serialized = JSON.stringify(normalized.draft);
    try {
      storage.setItem(DRAFT_KEY, serialized);
      if (storage.getItem(DRAFT_KEY) !== serialized) return { state: 'unavailable' };
    } catch (_) {
      return { state: 'unavailable' };
    }
    return { state: 'saved', draft: normalized.draft };
  }

  function clear(storage) {
    try {
      storage.removeItem(DRAFT_KEY);
      if (storage.getItem(DRAFT_KEY) !== null) return { state: 'unavailable' };
    } catch (_) {
      return { state: 'unavailable' };
    }
    return { state: 'cleared' };
  }

  return Object.freeze({
    DRAFT_KEY: DRAFT_KEY,
    DRAFT_TTL_MS: DRAFT_TTL_MS,
    ALLOWED_STYLES: ALLOWED_STYLES,
    read: read,
    write: write,
    clear: clear
  });
});
