(function () {
  "use strict";

  const claimsUrl = "/content/luminairy-claims.json";
  const receiptsUrl = "/content/luminairy-editorial-receipts.json";
  const trustedKeys = {
    "luminairy-editorial-offline-r3-20260823": {
      kty: "EC",
      crv: "P-256",
      x: "Sx-f3-ZiCYm-OOzoxfbsZjLgx6GW1AEff0gWB-C8r6Q",
      y: "X_qk0_B9K2GKckhIM8WS6_NJB-6HXRlO0T1YappGRv4"
    },
    "luminairy-editorial-offline-r4-20260902": {
      kty: "EC",
      crv: "P-256",
      x: "0SG_saUrurdGJZ4e8wFG23hvpV8vQUNm3YPad28WKWs",
      y: "Gss04vUhNOgxvRkVn6M_QwK9Js42hogAD6JGsfMZhG8"
    },
    "luminairy-editorial-offline-r5-20260902": {
      kty: "EC",
      crv: "P-256",
      x: "PbQCO9tuJRrhE83ZuXq2UU0WLbz979M3zqmDpIc58zA",
      y: "BT6SvRIfLRzXD9l_zAQyckGdAfvkcBvvOJAZtL0fwXA"
    }
  };

  function normalize(value) {
    return String(value || "").normalize("NFKC").replace(/\s+/g, " ").trim();
  }

  function bytesFromBase64(value) {
    try {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      const clean = String(value || "").replace(/[^A-Za-z0-9+/]/g, "");
      const bytes = [];
      let buffer = 0;
      let bits = 0;
      for (const character of clean) {
        buffer = (buffer << 6) | alphabet.indexOf(character);
        bits += 6;
        if (bits >= 8) {
          bits -= 8;
          bytes.push((buffer >> bits) & 255);
        }
      }
      return new Uint8Array(bytes);
    } catch (_) { return null; }
  }

  function hex(buffer) {
    return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  function utf8(value) {
    const encoded = unescape(encodeURIComponent(String(value)));
    return Uint8Array.from(encoded, (character) => character.charCodeAt(0));
  }

  function sha256Bytes(value) {
    const input = Array.from(utf8(value));
    const bitLength = input.length * 8;
    input.push(128);
    while (input.length % 64 !== 56) input.push(0);
    for (let shift = 56; shift >= 0; shift -= 8) input.push(Math.floor(bitLength / (2 ** shift)) & 255);
    const h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    const k = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
    const rotate = (number, amount) => (number >>> amount) | (number << (32 - amount));
    for (let offset = 0; offset < input.length; offset += 64) {
      const w = new Array(64);
      for (let index = 0; index < 16; index += 1) {
        const base = offset + index * 4;
        w[index] = ((input[base] << 24) | (input[base + 1] << 16) | (input[base + 2] << 8) | input[base + 3]) >>> 0;
      }
      for (let index = 16; index < 64; index += 1) {
        const s0 = rotate(w[index - 15], 7) ^ rotate(w[index - 15], 18) ^ (w[index - 15] >>> 3);
        const s1 = rotate(w[index - 2], 17) ^ rotate(w[index - 2], 19) ^ (w[index - 2] >>> 10);
        w[index] = (w[index - 16] + s0 + w[index - 7] + s1) >>> 0;
      }
      let [a,b,c,d,e,f,g,hh] = h;
      for (let index = 0; index < 64; index += 1) {
        const s1 = rotate(e, 6) ^ rotate(e, 11) ^ rotate(e, 25);
        const choose = (e & f) ^ (~e & g);
        const t1 = (hh + s1 + choose + k[index] + w[index]) >>> 0;
        const s0 = rotate(a, 2) ^ rotate(a, 13) ^ rotate(a, 22);
        const majority = (a & b) ^ (a & c) ^ (b & c);
        const t2 = (s0 + majority) >>> 0;
        hh = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      h[0]=(h[0]+a)>>>0; h[1]=(h[1]+b)>>>0; h[2]=(h[2]+c)>>>0; h[3]=(h[3]+d)>>>0;
      h[4]=(h[4]+e)>>>0; h[5]=(h[5]+f)>>>0; h[6]=(h[6]+g)>>>0; h[7]=(h[7]+hh)>>>0;
    }
    return Uint8Array.from(h.flatMap((number) => [number >>> 24, number >>> 16 & 255, number >>> 8 & 255, number & 255]));
  }

  function sha256(value) {
    if (window.crypto?.subtle && typeof TextEncoder !== "undefined") return window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(value))).then(hex);
    return Promise.resolve(hex(sha256Bytes(value)));
  }

  function profilePayload(wing, profile) {
    return JSON.stringify({ wing, profile });
  }

  function receiptPayload(receipt) {
    const payload = {
      schemaVersion: receipt.schemaVersion,
      receiptId: receipt.receiptId,
      keyId: receipt.keyId,
      product: receipt.product,
      claimId: receipt.claimId,
      wing: receipt.wing,
      profileId: receipt.profileId,
      profileSha256: receipt.profileSha256,
      sourcePacketSha256: receipt.sourcePacketSha256,
      ...(receipt.resourceEvidenceSha256 ? { resourceEvidenceSha256: receipt.resourceEvidenceSha256 } : {}),
      verifiedOn: receipt.verifiedOn,
      recheckOn: receipt.recheckOn,
      reviewedOn: receipt.reviewedOn,
      reviewerRole: receipt.reviewerRole,
      supportDecision: receipt.supportDecision
    };
    return JSON.stringify(payload);
  }

  function strictDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) return false;
    const date = new Date(value + "T00:00:00Z");
    return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
  }

  function profileMap(data) {
    const map = new Map();
    ["saints", "mavens", "trailblazers"].forEach((wing) => {
      if (!Array.isArray(data[wing])) throw new Error("profile wing missing");
      data[wing].forEach((profile) => {
        const key = wing + ":" + profile.id;
        if (!profile.id || map.has(key)) throw new Error("profile identity invalid");
        map.set(key, { wing, profile });
      });
    });
    if (data.saints.length !== 13 || data.mavens.length !== 23 || data.trailblazers.length !== 7) throw new Error("profile roster count mismatch");
    return map;
  }

  function bigIntFromBytes(bytes) {
    return BigInt("0x" + Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(""));
  }

  function decodeBase64Url(value) {
    return bytesFromBase64(String(value).replace(/-/g, "+").replace(/_/g, "/"));
  }

  function verifySignatureWithoutWebCrypto(receipt, signature, trustedKey) {
    if (typeof BigInt === "undefined" || signature.length !== 64) return false;
    const p = BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff");
    const n = BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551");
    const a = p - 3n;
    const G = {
      x: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
      y: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5")
    };
    const mod = (value, divisor) => ((value % divisor) + divisor) % divisor;
    const inverse = (value, divisor) => {
      let low = mod(value, divisor), high = divisor, x = 1n, y = 0n;
      while (low > 1n) {
        const quotient = high / low;
        [low, high] = [high - quotient * low, low];
        [x, y] = [y - quotient * x, x];
      }
      return mod(x, divisor);
    };
    const add = (left, right) => {
      if (!left) return right;
      if (!right) return left;
      if (left.x === right.x && mod(left.y + right.y, p) === 0n) return null;
      const slope = left.x === right.x && left.y === right.y
        ? mod((3n * left.x * left.x + a) * inverse(2n * left.y, p), p)
        : mod((right.y - left.y) * inverse(right.x - left.x, p), p);
      const x = mod(slope * slope - left.x - right.x, p);
      return { x, y: mod(slope * (left.x - x) - left.y, p) };
    };
    const multiply = (scalar, point) => {
      let result = null;
      let addend = point;
      for (let value = scalar; value > 0n; value >>= 1n) {
        if (value & 1n) result = add(result, addend);
        addend = add(addend, addend);
      }
      return result;
    };
    const r = bigIntFromBytes(signature.slice(0, 32));
    const s = bigIntFromBytes(signature.slice(32));
    if (r <= 0n || r >= n || s <= 0n || s >= n) return false;
    const digest = bigIntFromBytes(sha256Bytes(receiptPayload(receipt)));
    const w = inverse(s, n);
    const Q = { x: bigIntFromBytes(decodeBase64Url(trustedKey.x)), y: bigIntFromBytes(decodeBase64Url(trustedKey.y)) };
    const point = add(multiply(mod(digest * w, n), G), multiply(mod(r * w, n), Q));
    return Boolean(point && mod(point.x, n) === r);
  }

  async function verifySignature(receipt) {
    const signature = bytesFromBase64(receipt.signature);
    const trustedKey = trustedKeys[receipt.keyId];
    if (!signature || !trustedKey) return false;
    if (!window.crypto?.subtle || typeof TextEncoder === "undefined") return verifySignatureWithoutWebCrypto(receipt, signature, trustedKey);
    const key = await window.crypto.subtle.importKey("jwk", trustedKey, { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
    return window.crypto.subtle.verify({ name: "ECDSA", hash: "SHA-256" }, key, signature, new TextEncoder().encode(receiptPayload(receipt)));
  }

  async function admit(data) {
    const [claimsResponse, receiptsResponse] = await Promise.all([
      fetch(claimsUrl, { credentials: "same-origin", cache: "no-store" }),
      fetch(receiptsUrl, { credentials: "same-origin", cache: "no-store" })
    ]);
    if (!claimsResponse.ok || !receiptsResponse.ok) throw new Error("editorial admission files unavailable");
    const [claims, receipts] = await Promise.all([claimsResponse.json(), receiptsResponse.json()]);
    const profiles = profileMap(data);
    const today = new Date().toISOString().slice(0, 10);
    if (claims.schemaVersion !== 4 || claims.product !== "luminairy" || claims.admissionPolicy !== "fail-closed" || claims.receiptManifest !== receiptsUrl || !Array.isArray(claims.records)) throw new Error("claim manifest invalid");
    if (receipts.schemaVersion !== 2 || receipts.product !== "luminairy" || receipts.authorityModel !== "offline-p256-signed-profile-receipts" || !Array.isArray(receipts.receipts)) throw new Error("receipt manifest invalid");
    if (claims.records.length !== profiles.size || receipts.receipts.length !== profiles.size) throw new Error("admission coverage mismatch");

    const records = new Map();
    for (const record of claims.records) {
      const key = record.wing + ":" + record.profileId;
      const entry = profiles.get(key);
      if (!entry || records.has(record.claimId) || record.claimId !== key.replace(":", "-") || record.status !== "admitted") throw new Error("claim identity mismatch");
      if (!strictDate(record.verifiedOn) || !strictDate(record.recheckOn) || record.verifiedOn > today || record.recheckOn < today) throw new Error("claim date invalid");
      if (await sha256(profilePayload(entry.wing, entry.profile)) !== record.profileSha256) throw new Error("profile bytes do not match admission");
      if (record.wing === "saints") {
        if (record.resourceEvidenceSha256) throw new Error("Saint claim resource binding invalid");
      } else if (!/^[0-9a-f]{64}$/.test(record.resourceEvidenceSha256 || "")) throw new Error("profile resource evidence binding missing");
      records.set(record.claimId, record);
    }

    const seen = new Set();
    for (const receipt of receipts.receipts) {
      const record = records.get(receipt.claimId);
      if (!record || seen.has(receipt.claimId) || !trustedKeys[receipt.keyId] || receipt.product !== "luminairy" || receipt.profileSha256 !== record.profileSha256 || receipt.sourcePacketSha256 !== claims.sourcePacketSha256 || receipt.resourceEvidenceSha256 !== record.resourceEvidenceSha256 || receipt.wing !== record.wing || receipt.profileId !== record.profileId || receipt.verifiedOn !== record.verifiedOn || receipt.recheckOn !== record.recheckOn || receipt.supportDecision !== "exact-profile-reviewed-and-supported" || !normalize(receipt.reviewerRole) || !strictDate(receipt.reviewedOn) || receipt.reviewedOn > today || !(await verifySignature(receipt))) throw new Error("trusted editorial receipt invalid");
      seen.add(receipt.claimId);
    }
    if (seen.size !== profiles.size) throw new Error("trusted admission incomplete");
    document.documentElement.dataset.luminairyClaims = "admitted";
    return data;
  }

  window.LAIDIES_LUMINAIRY_CLAIM_GATE = { admit };
})();
