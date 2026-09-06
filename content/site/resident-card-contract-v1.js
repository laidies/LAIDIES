(function installResidentCardContract(global) {
  "use strict";

  var CARD_KEY = "laidies_resident_card_v1";
  var HANDLE_KEY = "laidies_card_username";
  var FIELD_LIMITS = Object.freeze({
    activity: 160,
    archetype: 80,
    avatarSlug: 64,
    cardAvatarUrl: 131095,
    cardBg: 24,
    carry: 160,
    character: 160,
    cocktail: 160,
    displayName: 80,
    episode: 160,
    motto: 280,
    movie: 160,
    quote: 280,
    saint: 160,
    song: 160,
    storefront: 160,
    tvshow: 160
  });
  var FIELD_NAMES = Object.freeze(Object.keys(FIELD_LIMITS).sort());
  var LEGACY_KEYS = Object.freeze({
    activity: "laidies_activity",
    archetype: "laidies_archetype",
    avatarSlug: "laidies_avatar",
    cardAvatarUrl: "laidies_card_avatar_url",
    cardBg: "laidies_card_bg",
    carry: "laidies_carry",
    character: "laidies_favorite_character",
    cocktail: "laidies_favorite_cocktail",
    displayName: "laidies_display_name",
    episode: "laidies_favorite_episode",
    motto: "laidies_motto",
    movie: "laidies_favorite_movie",
    quote: "laidies_quote",
    saint: "laidies_saint",
    song: "laidies_song",
    storefront: "laidies_favorite_storefront",
    tvshow: "laidies_favorite_tvshow"
  });
  var CARD_BACKGROUNDS = Object.freeze([
    "classic", "pinklilac", "peach", "mint", "lavender", "holo", "gettingready"
  ]);
  var UNSAFE_TEXT = /[<>\u0000-\u001f\u007f\u200e\u200f\u202a-\u202e\u2066-\u2069]/;

  function isPlainObject(value) {
    if (!value || Object.prototype.toString.call(value) !== "[object Object]") {
      return false;
    }
    var prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
  }

  function hasExactKeys(value, allowed) {
    var keys = Object.keys(value).sort();
    if (keys.length !== allowed.length) return false;
    return keys.every(function (key, index) {
      return key === allowed[index];
    });
  }

  function isSafeText(value, limit) {
    return typeof value === "string" &&
      value.length <= limit &&
      !UNSAFE_TEXT.test(value);
  }

  function isSafeAssetPath(value) {
    if (typeof value !== "string" || value.length > 240 ||
        value.indexOf("%") !== -1 || value.indexOf("\\") !== -1 ||
        value.indexOf("?") !== -1 || value.indexOf("#") !== -1 ||
        value.indexOf("//") !== -1 || value.indexOf("/./") !== -1 ||
        value.indexOf("/../") !== -1) {
      return false;
    }
    try {
      if (decodeURIComponent(value) !== value) return false;
    } catch (_) {
      return false;
    }
    return /^\/assets\/[A-Za-z0-9][A-Za-z0-9._/-]*\.(?:png|jpe?g|webp|gif|avif)$/i.test(value);
  }

  function validateField(name, value) {
    if (!Object.prototype.hasOwnProperty.call(FIELD_LIMITS, name) ||
        !isSafeText(value, FIELD_LIMITS[name])) {
      return false;
    }
    if (name === "cardAvatarUrl") {
      return value === "" || isSafeAvatarSource(value);
    }
    if (name === "cardBg") {
      return value === "" || CARD_BACKGROUNDS.indexOf(value) !== -1;
    }
    if (name === "avatarSlug") {
      return value === "" || /^[a-z0-9][a-z0-9-]{0,63}$/.test(value);
    }
    return true;
  }

  function validateEnvelope(value) {
    if (!isPlainObject(value) || !hasExactKeys(value, ["fields", "version"]) ||
        value.version !== 1 || !isPlainObject(value.fields)) {
      return null;
    }
    var keys = Object.keys(value.fields).sort();
    if (!keys.length || keys.some(function (key) {
      return FIELD_NAMES.indexOf(key) === -1 ||
        !validateField(key, value.fields[key]);
    }) || keys.every(function (key) {
      return value.fields[key].trim() === "";
    })) {
      return null;
    }
    var projected = Object.create(null);
    keys.forEach(function (key) {
      projected[key] = value.fields[key].trim();
    });
    return Object.freeze({
      version: 1,
      fields: Object.freeze(projected)
    });
  }

  function parse(raw) {
    if (typeof raw !== "string" || !raw) return null;
    try {
      return validateEnvelope(JSON.parse(raw));
    } catch (_) {
      return null;
    }
  }

  function readLegacy(storage) {
    var fields = Object.create(null);
    var seen = false;
    try {
      FIELD_NAMES.forEach(function (name) {
        var raw = storage.getItem(LEGACY_KEYS[name]);
        if (raw !== null && raw !== "") {
          seen = true;
          fields[name] = raw;
        }
      });
    } catch (_) {
      return { state: "unavailable" };
    }
    if (!seen) return { state: "empty" };
    var keys = Object.keys(fields);
    if (keys.some(function (name) {
      return !validateField(name, fields[name]);
    }) || keys.every(function (name) {
      return fields[name].trim() === "";
    })) {
      return { state: "legacy-invalid" };
    }
    return {
      state: "legacy",
      fields: Object.freeze(fields)
    };
  }

  function read(storage) {
    var source = storage || global.localStorage;
    var raw;
    try {
      raw = source.getItem(CARD_KEY);
    } catch (_) {
      return { state: "unavailable" };
    }
    if (!raw) return readLegacy(source);
    var envelope = parse(raw);
    return envelope
      ? { state: "saved", envelope: envelope, fields: envelope.fields }
      : { state: "invalid" };
  }

  function buildEnvelope(fields) {
    if (!isPlainObject(fields)) return null;
    return validateEnvelope({ version: 1, fields: fields });
  }

  function readHandle(storage) {
    try {
      var value = String((storage || global.localStorage).getItem(HANDLE_KEY) || "").trim();
      return /^[a-z0-9][a-z0-9_-]{1,29}$/i.test(value) ? value : "";
    } catch (_) {
      return "";
    }
  }

  function replaceWithSafeImage(container, source, alt) {
    if (!container || !isSafeAvatarSource(source)) return false;
    var image = global.document.createElement("img");
    image.src = source;
    image.alt = String(alt || "");
    image.style.width = "100%";
    image.style.height = "100%";
    image.style.objectFit = "cover";
    image.addEventListener("error", function () {
      image.remove();
    }, { once: true });
    container.replaceChildren(image);
    return true;
  }

  // Only bounded, self-contained raster bytes; never SVG, HTML, remote URLs,
  // signed URLs or arbitrary data URLs. The maker decodes/re-encodes new images.
  function isSafeRasterPortrait(value) {
    if (typeof value !== "string" || value.length > 131095) return false;
    var match = /^data:image\/(jpeg|png);base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);
    if (!match || match[2].length % 4 !== 0) return false;
    try {
      var bytes = global.atob(match[2]);
      if (bytes.length < 64 || bytes.length > 98304 || global.btoa(bytes) !== match[2]) return false;
      if (match[1] === "jpeg") {
        return bytes.slice(0, 3) === "\xff\xd8\xff" && bytes.slice(-2) === "\xff\xd9";
      }
      return bytes.slice(0, 8) === "\x89PNG\r\n\x1a\n" &&
        bytes.slice(-12) === "\x00\x00\x00\x00IEND\xae\x42\x60\x82";
    } catch (_) { return false; }
  }

  function isSafeAvatarSource(value) {
    return isSafeAssetPath(value) || isSafeRasterPortrait(value);
  }

  global.LAIDIESResidentCard = Object.freeze({
    CARD_KEY: CARD_KEY,
    FIELD_NAMES: FIELD_NAMES,
    buildEnvelope: buildEnvelope,
    isSafeAssetPath: isSafeAssetPath,
    isSafeAvatarSource: isSafeAvatarSource,
    isSafeRasterPortrait: isSafeRasterPortrait,
    parse: parse,
    read: read,
    readHandle: readHandle,
    readLegacy: readLegacy,
    replaceWithSafeImage: replaceWithSafeImage,
    validateEnvelope: validateEnvelope
  });
})(window);
