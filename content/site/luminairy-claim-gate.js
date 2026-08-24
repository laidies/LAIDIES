(function () {
  "use strict";

  var registryUrl = "/content/luminairy-claims.json";
  var receiptManifestUrl = "/content/luminairy-editorial-receipts.json";
  var heldMessage =
    "Editorial review in progress. This profile’s claims are not published yet.";
  var claimNodes = [
    ".stop-desc",
    ".saint-back-rule",
    ".saint-back-devotion",
    ".saint-back-meta",
    ".foundress-years",
    ".foundress-title",
    ".foundress-desc"
  ].join(", ");
  var trustedKeys = {
    "luminairy-editorial-offline-r2-20260726": {
      kty: "EC",
      crv: "P-256",
      x: "aQwXrFw77FawK8rM5eAavmf21XtdjmkmNUWe3b457rI",
      y: "VNTv9rNlAfMw8Oc4fDz9ulkZopZUZj8t_027RHs4AwA"
    }
  };

  window.LAIDIES_LUMINAIRY_ADMISSIONS = Object.create(null);

  function slug(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function normalizeText(value) {
    return String(value || "").normalize("NFKC").replace(/\s+/g, " ").trim();
  }

  function sha256(value) {
    if (!window.crypto || !window.crypto.subtle || typeof TextEncoder === "undefined") {
      return Promise.reject(new Error("sha256 unavailable"));
    }
    return window.crypto.subtle
      .digest("SHA-256", new TextEncoder().encode(String(value)))
      .then(function (buffer) {
        return Array.from(new Uint8Array(buffer))
          .map(function (byte) {
            return byte.toString(16).padStart(2, "0");
          })
          .join("");
      });
  }

  function admissionPayload(record) {
    var evidence = record.evidence || {};
    return JSON.stringify({
      product: record.product,
      claimId: record.claimId,
      personId: record.personId,
      wing: record.wing,
      claimKind: record.claimKind,
      status: record.status,
      scope: normalizeText(record.scope),
      selector: record.selector,
      contentSelector: record.contentSelector,
      claimText: normalizeText(record.claimText),
      claimTextSha256: record.claimTextSha256,
      sourceUrl: evidence.sourceUrl,
      sourceType: evidence.sourceType,
      sourceTitle: normalizeText(evidence.sourceTitle),
      sourcePublisher: normalizeText(evidence.sourcePublisher),
      evidenceExcerpt: normalizeText(evidence.evidenceExcerpt),
      evidenceExcerptSha256: evidence.evidenceExcerptSha256,
      supportsClaimId: evidence.supportsClaimId,
      supportsClaimTextSha256: evidence.supportsClaimTextSha256,
      verifiedOn: record.verifiedOn,
      recheckOn: record.recheckOn,
      correctionOwner: record.correctionOwner
    });
  }

  function receiptPayload(receipt) {
    return JSON.stringify({
      schemaVersion: receipt.schemaVersion,
      receiptId: receipt.receiptId,
      keyId: receipt.keyId,
      product: receipt.product,
      claimId: receipt.claimId,
      personId: receipt.personId,
      wing: receipt.wing,
      claimKind: receipt.claimKind,
      status: receipt.status,
      scope: normalizeText(receipt.scope),
      selector: receipt.selector,
      contentSelector: receipt.contentSelector,
      claimTextSha256: receipt.claimTextSha256,
      sourceUrl: receipt.sourceUrl,
      sourceType: receipt.sourceType,
      sourceTitle: normalizeText(receipt.sourceTitle),
      sourcePublisher: normalizeText(receipt.sourcePublisher),
      evidenceExcerptSha256: receipt.evidenceExcerptSha256,
      supportsClaimId: receipt.supportsClaimId,
      supportsClaimTextSha256: receipt.supportsClaimTextSha256,
      verifiedOn: receipt.verifiedOn,
      recheckOn: receipt.recheckOn,
      correctionOwner: receipt.correctionOwner,
      admissionBindingSha256: receipt.admissionBindingSha256,
      supportDecision: receipt.supportDecision,
      reviewerRole: receipt.reviewerRole,
      reviewedOn: receipt.reviewedOn
    });
  }

  function prepareSaintIds() {
    document.querySelectorAll(".stop--saint").forEach(function (card) {
      var name = card.querySelector(".stop-name");
      if (name) card.setAttribute("data-saint-id", slug(name.textContent));
    });
  }

  function ensureHold(card, reason) {
    var existing = card.querySelector(".lum-claim-hold");
    if (!existing) {
      existing = document.createElement("p");
      existing.className = "lum-claim-hold";
      card.appendChild(existing);
    }
    existing.hidden = false;
    existing.textContent = reason || heldMessage;
  }

  function holdCard(card, reason) {
    card.setAttribute("data-editorial-status", "held");
    card.removeAttribute("data-admitted-claim-id");
    card.querySelectorAll(claimNodes).forEach(function (node) {
      node.hidden = true;
    });
    var foundressLock = card.querySelector(".foundress-lock");
    if (foundressLock) foundressLock.hidden = false;
    card.querySelectorAll(".maven-meet, .foundress-meet").forEach(function (button) {
      button.disabled = true;
      button.textContent = "Profile in review";
      button.setAttribute("aria-describedby", "lumResearchStatus");
    });
    ensureHold(card, reason);
  }

  function holdContext(block) {
    block.hidden = true;
    block.setAttribute("data-editorial-status", "held");
  }

  function failClosed(message) {
    window.LAIDIES_LUMINAIRY_ADMISSIONS = Object.create(null);
    var foundressCase = document.getElementById("foundressCase");
    if (foundressCase) foundressCase.classList.remove("is-unlocked");
    document
      .querySelectorAll(".stop--saint, .stop--maven, .stop--builder, .foundress-card")
      .forEach(function (card) {
        holdCard(card, message);
      });
    document.querySelectorAll("[data-lum-claim-block]").forEach(holdContext);
    var modal = document.getElementById("mavenModal");
    if (modal) {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    }
  }

  function strictDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) return false;
    var parts = value.split("-").map(Number);
    var date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    return (
      date.getUTCFullYear() === parts[0] &&
      date.getUTCMonth() === parts[1] - 1 &&
      date.getUTCDate() === parts[2]
    );
  }

  function validAdmissionShape(record, today) {
    var evidence = record.evidence || {};
    return (
      record.product === "luminairy" &&
      Boolean(record.personId) &&
      ["saints", "mavens", "trailblazers"].includes(record.wing) &&
      Boolean(record.claimKind) &&
      record.status === "admitted" &&
      Boolean(normalizeText(record.scope)) &&
      typeof record.contentSelector === "string" &&
      Boolean(record.contentSelector) &&
      Boolean(normalizeText(record.claimText)) &&
      /^[a-f0-9]{64}$/.test(record.claimTextSha256 || "") &&
      strictDate(record.verifiedOn) &&
      record.verifiedOn <= today &&
      strictDate(record.recheckOn) &&
      record.recheckOn >= today &&
      /^https:\/\//.test(evidence.sourceUrl || "") &&
      ["official", "primary", "institutional", "peer-reviewed"].includes(
        evidence.sourceType
      ) &&
      Boolean(normalizeText(evidence.sourceTitle)) &&
      Boolean(normalizeText(evidence.sourcePublisher)) &&
      Boolean(normalizeText(evidence.evidenceExcerpt)) &&
      /^[a-f0-9]{64}$/.test(evidence.evidenceExcerptSha256 || "") &&
      evidence.supportsClaimId === record.claimId &&
      evidence.supportsClaimTextSha256 === record.claimTextSha256 &&
      /^[a-f0-9]{64}$/.test(record.admissionBindingSha256 || "")
    );
  }

  function validRegistry(data) {
    if (!data || data.schemaVersion !== 3 || data.admissionPolicy !== "fail-closed") {
      return false;
    }
    if (
      data.product !== "luminairy" ||
      data.claimBinding !==
        "exact-identity-context-selector-text-source-evidence-envelope-plus-offline-signed-receipt" ||
      data.receiptManifest !== receiptManifestUrl ||
      !strictDate(data.generatedOn) ||
      !Array.isArray(data.records)
    ) {
      return false;
    }
    var today = new Date().toISOString().slice(0, 10);
    if (data.generatedOn > today) return false;
    var ids = new Set();
    var people = new Set();
    return data.records.every(function (record) {
      if (
        !record.claimId ||
        ids.has(record.claimId) ||
        !record.selector ||
        !record.wing ||
        !record.claimKind
      ) {
        return false;
      }
      ids.add(record.claimId);
      if (record.personId) {
        if (people.has(record.personId)) return false;
        people.add(record.personId);
      } else if (record.claimKind !== "context-block") {
        return false;
      }
      if (!["admitted", "held", "corrected", "retired"].includes(record.status)) {
        return false;
      }
      return record.status !== "admitted" || validAdmissionShape(record, today);
    });
  }

  function base64Bytes(value) {
    try {
      return Uint8Array.from(atob(value), function (character) {
        return character.charCodeAt(0);
      });
    } catch (_) {
      return null;
    }
  }

  function validReceiptShape(receipt, today) {
    return (
      receipt &&
      receipt.schemaVersion === 1 &&
      Boolean(receipt.receiptId) &&
      Boolean(trustedKeys[receipt.keyId]) &&
      receipt.product === "luminairy" &&
      receipt.status === "admitted" &&
      Boolean(receipt.claimId) &&
      Boolean(receipt.personId) &&
      Boolean(receipt.wing) &&
      Boolean(receipt.claimKind) &&
      Boolean(normalizeText(receipt.scope)) &&
      /^[a-f0-9]{64}$/.test(receipt.claimTextSha256 || "") &&
      /^[a-f0-9]{64}$/.test(receipt.evidenceExcerptSha256 || "") &&
      /^[a-f0-9]{64}$/.test(receipt.admissionBindingSha256 || "") &&
      [
        "exact-atomic-claim-supported",
        "exact-atomic-claim-supported-for-test-only"
      ].includes(receipt.supportDecision) &&
      Boolean(receipt.reviewerRole) &&
      strictDate(receipt.reviewedOn) &&
      receipt.reviewedOn <= today &&
      Boolean(base64Bytes(receipt.signature))
    );
  }

  function receiptMatchesRecord(receipt, record) {
    var evidence = record.evidence || {};
    return (
      receipt.product === record.product &&
      receipt.claimId === record.claimId &&
      receipt.personId === record.personId &&
      receipt.wing === record.wing &&
      receipt.claimKind === record.claimKind &&
      receipt.status === record.status &&
      normalizeText(receipt.scope) === normalizeText(record.scope) &&
      receipt.selector === record.selector &&
      receipt.contentSelector === record.contentSelector &&
      receipt.claimTextSha256 === record.claimTextSha256 &&
      receipt.sourceUrl === evidence.sourceUrl &&
      receipt.sourceType === evidence.sourceType &&
      normalizeText(receipt.sourceTitle) === normalizeText(evidence.sourceTitle) &&
      normalizeText(receipt.sourcePublisher) ===
        normalizeText(evidence.sourcePublisher) &&
      receipt.evidenceExcerptSha256 === evidence.evidenceExcerptSha256 &&
      receipt.supportsClaimId === evidence.supportsClaimId &&
      receipt.supportsClaimTextSha256 === evidence.supportsClaimTextSha256 &&
      receipt.verifiedOn === record.verifiedOn &&
      receipt.recheckOn === record.recheckOn &&
      receipt.correctionOwner === record.correctionOwner &&
      receipt.admissionBindingSha256 === record.admissionBindingSha256
    );
  }

  function verifyReceiptSignature(receipt) {
    var signature = base64Bytes(receipt.signature);
    if (!signature) return Promise.resolve(false);
    return window.crypto.subtle
      .importKey(
        "jwk",
        trustedKeys[receipt.keyId],
        { name: "ECDSA", namedCurve: "P-256" },
        false,
        ["verify"]
      )
      .then(function (key) {
        return window.crypto.subtle.verify(
          { name: "ECDSA", hash: "SHA-256" },
          key,
          signature,
          new TextEncoder().encode(receiptPayload(receipt))
        );
      });
  }

  function verifyAuthority(data, manifest) {
    var today = new Date().toISOString().slice(0, 10);
    if (
      !manifest ||
      manifest.schemaVersion !== 1 ||
      manifest.product !== "luminairy" ||
      manifest.authorityModel !== "offline-p256-signed-editorial-receipts" ||
      !strictDate(manifest.generatedOn) ||
      manifest.generatedOn > today ||
      !Array.isArray(manifest.receipts)
    ) {
      return Promise.reject(new Error("receipt manifest invalid"));
    }
    var records = new Map(
      data.records.map(function (record) {
        return [record.claimId, record];
      })
    );
    var receiptIds = new Set();
    var receiptClaims = new Set();
    for (var index = 0; index < manifest.receipts.length; index += 1) {
      var receipt = manifest.receipts[index];
      var record = records.get(receipt.claimId);
      if (
        !validReceiptShape(receipt, today) ||
        receiptIds.has(receipt.receiptId) ||
        receiptClaims.has(receipt.claimId) ||
        !record ||
        record.status !== "admitted" ||
        !receiptMatchesRecord(receipt, record)
      ) {
        return Promise.reject(new Error("editorial receipt mismatch"));
      }
      receiptIds.add(receipt.receiptId);
      receiptClaims.add(receipt.claimId);
    }
    var admitted = data.records.filter(function (record) {
      return record.status === "admitted";
    });
    if (
      admitted.length !== manifest.receipts.length ||
      admitted.some(function (record) {
        return !receiptClaims.has(record.claimId);
      })
    ) {
      return Promise.reject(new Error("admission lacks trusted receipt"));
    }
    return Promise.all(manifest.receipts.map(verifyReceiptSignature)).then(
      function (results) {
        if (results.some(function (valid) { return !valid; })) {
          throw new Error("editorial receipt signature invalid");
        }
      }
    );
  }

  function cardIdentity(card) {
    return (
      card.getAttribute("data-saint-id") ||
      card.getAttribute("data-maven-slug") ||
      card.getAttribute("data-foundress-slug") ||
      card.getAttribute("data-builder-slug") ||
      ""
    );
  }

  function cardWing(card) {
    if (card.classList.contains("stop--saint")) return "saints";
    if (
      card.classList.contains("stop--maven") ||
      card.classList.contains("foundress-card")
    ) {
      return "mavens";
    }
    if (card.classList.contains("stop--builder")) return "trailblazers";
    return "";
  }

  function verifyAdmission(record) {
    var cards = document.querySelectorAll(record.selector);
    if (cards.length !== 1) return Promise.reject(new Error("claim selector mismatch"));
    var card = cards[0];
    if (
      cardIdentity(card) !== record.personId ||
      cardWing(card) !== record.wing
    ) {
      return Promise.reject(new Error("claim identity/context mismatch"));
    }
    var nodes;
    try {
      nodes = card.querySelectorAll(record.contentSelector);
    } catch (_) {
      return Promise.reject(new Error("content selector invalid"));
    }
    if (nodes.length !== 1) return Promise.reject(new Error("atomic content mismatch"));
    var renderedText = normalizeText(nodes[0].textContent);
    if (renderedText !== normalizeText(record.claimText)) {
      return Promise.reject(new Error("claim text mismatch"));
    }
    return Promise.all([
      sha256(renderedText),
      sha256(normalizeText(record.evidence.evidenceExcerpt)),
      sha256(admissionPayload(record))
    ]).then(function (hashes) {
      if (
        hashes[0] !== record.claimTextSha256 ||
        hashes[1] !== record.evidence.evidenceExcerptSha256 ||
        hashes[2] !== record.admissionBindingSha256
      ) {
        throw new Error("claim/evidence binding mismatch");
      }
      return { card: card, content: nodes[0] };
    });
  }

  function admitCard(record, verified) {
    var card = verified.card;
    card.setAttribute("data-editorial-status", "admitted");
    card.setAttribute("data-admitted-claim-id", record.claimId);
    card.querySelectorAll(claimNodes).forEach(function (node) {
      node.hidden = node !== verified.content;
    });
    var foundressLock = card.querySelector(".foundress-lock");
    if (foundressLock) foundressLock.hidden = true;
    var hold = card.querySelector(".lum-claim-hold");
    if (hold) hold.hidden = true;
    var opener = card.querySelector(".maven-meet");
    if (!opener && card.classList.contains("foundress-card")) {
      opener = document.createElement("button");
      opener.type = "button";
      opener.className = "maven-meet foundress-meet";
      opener.dataset.lumProfileOpen = record.personId || "";
      card.appendChild(opener);
    }
    if (opener) {
      opener.disabled = false;
      opener.removeAttribute("aria-describedby");
      opener.textContent = "Open researched profile";
    }
    window.LAIDIES_LUMINAIRY_ADMISSIONS[record.personId] = record;
  }

  function applyRegistry(data) {
    var covered = new Set();
    var admittedRecords = data.records.filter(function (record) {
      return record.status === "admitted";
    });
    return Promise.all(admittedRecords.map(verifyAdmission)).then(function (verified) {
      var admissions = new Map();
      admittedRecords.forEach(function (record, index) {
        admissions.set(record.claimId, verified[index]);
      });
      data.records.forEach(function (record) {
        document.querySelectorAll(record.selector).forEach(function (card) {
          covered.add(card);
          if (record.status === "admitted") {
            admitCard(record, admissions.get(record.claimId));
          } else if (record.claimKind === "context-block") {
            holdContext(card);
          } else {
            holdCard(card, heldMessage);
          }
        });
      });
      document
        .querySelectorAll(".stop--saint, .stop--maven, .stop--builder, .foundress-card")
        .forEach(function (card) {
          if (!covered.has(card)) {
            holdCard(card, "Editorial record missing. This content is held.");
          }
        });
      document.querySelectorAll("[data-lum-claim-block]").forEach(function (block) {
        if (!covered.has(block)) holdContext(block);
      });
      document.documentElement.setAttribute("data-luminairy-claims", "loaded");
      window.dispatchEvent(new CustomEvent("luminairy:claims-ready"));
    });
  }

  function fetchJson(url) {
    return fetch(url, { credentials: "same-origin", cache: "no-store" }).then(
      function (response) {
        if (!response.ok) throw new Error("editorial data unavailable");
        return response.json();
      }
    );
  }

  function init() {
    prepareSaintIds();
    failClosed("Research authority is loading. Profile claims remain held.");
    Promise.all([fetchJson(registryUrl), fetchJson(receiptManifestUrl)])
      .then(function (results) {
        var data = results[0];
        var manifest = results[1];
        if (!validRegistry(data)) throw new Error("registry invalid");
        return verifyAuthority(data, manifest).then(function () {
          return applyRegistry(data);
        });
      })
      .catch(function () {
        failClosed(
          "Research authority could not be verified. Profile claims remain held."
        );
        document.documentElement.setAttribute("data-luminairy-claims", "failed");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
