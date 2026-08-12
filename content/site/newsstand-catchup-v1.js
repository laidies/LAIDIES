(function installNewsstandCatchupV1(global) {
  "use strict";

  var STORAGE_KEY = "laidies_newsstand_seen_v1";
  var DAY_MS = 86400000;
  var DAILY_DESK_TYPES = ["paige_tip", "promptoscope", "career_life", "dear_miss_jeeves", "mme_claio", "song", "did_you_know", "town_note", "curiosity", "fiction"];
  var HASH = /^[a-f0-9]{64}$/;
  var data = JSON.parse(JSON.stringify(global.NEWSSTAND_DATA || { publications: {}, stories: [] }));
  var sourceStories = JSON.parse(JSON.stringify(data.stories || []));
  var contract = global.NewsstandContract;
  var derivatives = null;
  var columns = null;
  var dailyIssues = null;
  var dailyIssuesLoaded = false;
  var columnsLoaded = false;
  var currentVisitAt = new Date().toISOString();
  var currentVisitKey = "visit:" + currentVisitAt;
  var previousVisit = latestPreviousVisit(readState());
  var sharedDailyHandled = false;
  var storiesSourceHashPromise = fetch("/content/newsstand-stories.js", { credentials: "same-origin", cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("newsstand-stories-source-unavailable");
      return response.text();
    })
    .then(function (source) { return sha256Text(source); })
    .catch(function () { return ""; });

  function text(value) {
    var node = document.createElement("div");
    node.innerHTML = String(value || "");
    return (node.textContent || "").replace(/\s+/g, " ").trim();
  }

  function escapeHTML(value) {
    var node = document.createElement("div");
    node.textContent = String(value == null ? "" : value);
    return node.innerHTML;
  }

  function sentence(value) {
    var clean = text(value);
    var match = clean.match(/^(.+?[.!?])(?:\s|$)/);
    return match ? match[1] : clean;
  }

  function validTimestamp(value) {
    return /^\d{4}-\d{2}-\d{2}T/.test(String(value || "")) &&
      Number.isFinite(Date.parse(value));
  }

  function emptyState() {
    return { lastVisit: null, seen: {} };
  }

  function readState() {
    try {
      var value = JSON.parse(global.localStorage.getItem(STORAGE_KEY) || "null");
      if (!value || typeof value !== "object" || Array.isArray(value)) return emptyState();
      var result = emptyState();
      if (value.lastVisit && validTimestamp(value.lastVisit.updated_at)) {
        result.lastVisit = { updated_at: value.lastVisit.updated_at };
      }
      if (value.seen && typeof value.seen === "object" && !Array.isArray(value.seen)) {
        Object.keys(value.seen).slice(0, 300).forEach(function (key) {
          if (/^(story|daily|service|visit):[A-Za-z0-9._:-]{1,140}$/.test(key) &&
              validTimestamp(value.seen[key] && value.seen[key].updated_at)) {
            result.seen[key] = { updated_at: value.seen[key].updated_at };
          }
        });
      }
      return result;
    } catch (_) {
      return emptyState();
    }
  }

  function writeState(value) {
    try {
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      global.dispatchEvent(new CustomEvent("laidies:continuation-local-change"));
    } catch (_) {}
  }

  function markSeen(key) {
    var state = readState();
    state.seen[key] = { updated_at: new Date().toISOString() };
    writeState(state);
  }

  function latestPreviousVisit(state) {
    var candidates = [];
    if (state && state.lastVisit && validTimestamp(state.lastVisit.updated_at) &&
        state.lastVisit.updated_at < currentVisitAt) {
      candidates.push(state.lastVisit.updated_at);
    }
    Object.keys(state && state.seen || {}).forEach(function (key) {
      if (key.indexOf("visit:") !== 0 || key === currentVisitKey) return;
      var timestamp = key.slice(6);
      if (validTimestamp(timestamp) && timestamp < currentVisitAt) candidates.push(timestamp);
    });
    return candidates.sort().pop() || "";
  }

  function beginVisit() {
    var state = readState();
    state.seen[currentVisitKey] = { updated_at: currentVisitAt };
    writeState(state);
  }

  function sealVisit() {
    var state = readState();
    state.lastVisit = { updated_at: currentVisitAt };
    writeState(state);
  }

  function dateOnly(value) {
    return String(value || "").slice(0, 10);
  }

  function editorialDateOnly(value) {
    var parsed = value instanceof Date ? value : new Date(value);
    if (!Number.isFinite(parsed.getTime())) return dateOnly(value);
    var parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Vancouver", year: "numeric", month: "2-digit", day: "2-digit"
    }).formatToParts(parsed).reduce(function (result, part) {
      if (part.type !== "literal") result[part.type] = part.value;
      return result;
    }, {});
    return [parts.year, parts.month, parts.day].join("-");
  }

  function availableThroughDate() {
    var issues = dailyIssues && Array.isArray(dailyIssues.issues) ? dailyIssues.issues : [];
    var latest = issues.filter(function (item) {
      return item && item.status === "complete" && /^\d{4}-\d{2}-\d{2}$/.test(item.editionDate || "") &&
        item.admission && validTimestamp(item.admission.reviewedAt) && Date.parse(item.admission.reviewedAt) <= Date.now();
    }).sort(function (a, b) { return b.editionDate.localeCompare(a.editionDate); })[0];
    return latest ? latest.editionDate : currentDailyDate();
  }

  function syncCatchupAvailability() {
    var input = document.getElementById("ns-catchup-since");
    if (!input) return;
    input.max = availableThroughDate();
    if (input.value && input.value > input.max) input.value = input.max;
  }

  function formatDate(value) {
    var source = String(value || "");
    var parsed = /^\d{4}-\d{2}-\d{2}$/.test(source)
      ? new Date(source + "T00:00:00Z")
      : new Date(source);
    return Number.isFinite(parsed.getTime()) ? parsed.toLocaleDateString("en-CA", {
      year: "numeric", month: "long", day: "numeric",
      timeZone: /^\d{4}-\d{2}-\d{2}$/.test(source) ? "UTC" : undefined
    }) : value;
  }

  function formatCompactDate(value) {
    var source = String(value || "");
    var parsed = /^\d{4}-\d{2}-\d{2}$/.test(source)
      ? new Date(source + "T00:00:00Z")
      : new Date(source);
    if (!Number.isFinite(parsed.getTime())) return value;
    var dateOnlyValue = /^\d{4}-\d{2}-\d{2}$/.test(source);
    return parsed.toLocaleDateString("en-CA", {
      month: "short", day: "numeric", timeZone: dateOnlyValue ? "UTC" : undefined
    }) + " ’" + (dateOnlyValue ? source.slice(2, 4) : String(parsed.getFullYear()).slice(-2));
  }

  function currentDailyDate() {
    return dateOnly(data.publications && data.publications.daily &&
      (data.publications.daily.editionDate || data.publications.daily.publishedAt)) || editorialDateOnly(new Date());
  }

  function canonicalJson(value) {
    if (value === null || typeof value !== "object") return JSON.stringify(value);
    if (Array.isArray(value)) return "[" + value.map(canonicalJson).join(",") + "]";
    return "{" + Object.keys(value).sort().map(function (key) {
      return JSON.stringify(key) + ":" + canonicalJson(value[key]);
    }).join(",") + "}";
  }

  function issueEnvelopeProjection(issue) {
    return {
      schemaVersion: "daily-private-issue-v1",
      mode: "PRIVATE_DRAFT_ONLY",
      editionDate: issue.editionDate,
      editorialTimeZone: issue.editorialTimeZone,
      disposition: issue.disposition === "quiet" ? "QUIET" : "CANDIDATES_PENDING_REVIEW",
      status: issue.disposition === "quiet" ? "PRIVATE_QUIET_DRAFT" : "PRIVATE_REVIEW_DRAFT",
      storyIds: issue.storyIds,
      storySnapshots: issue.stories,
      desks: issue.desks,
      sourceIdentity: issue.sourceIdentity,
      canonicalWrite: false,
      deployActionTaken: false
    };
  }

  function sha256Text(value) {
    if (!global.crypto || !global.crypto.subtle || typeof TextEncoder === "undefined") return Promise.resolve("");
    return global.crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)).then(function (bytes) {
      return Array.from(new Uint8Array(bytes)).map(function (byte) { return byte.toString(16).padStart(2, "0"); }).join("");
    });
  }

  async function validDailyIssueStore(value) {
    if (!value || value.schemaVersion !== "daily-issues-v1" || value.owner !== "newsstand-daily" || !Array.isArray(value.issues)) return false;
    var loadedStoriesSha256 = await storiesSourceHashPromise;
    if (!loadedStoriesSha256) return false;
    var dates = new Set();
    for (var issueIndex = 0; issueIndex < value.issues.length; issueIndex += 1) {
      var issue = value.issues[issueIndex];
      if (!issue || !/^\d{4}-\d{2}-\d{2}$/.test(issue.editionDate || "") || dates.has(issue.editionDate) ||
          issue.editorialTimeZone !== "America/Vancouver" || issue.status !== "complete" ||
          ["quiet", "candidates_pending_review"].indexOf(issue.disposition) === -1 ||
          !Array.isArray(issue.storyIds) || !Array.isArray(issue.stories) || !Array.isArray(issue.serviceRecordIds) || !Array.isArray(issue.desks) ||
          issue.desks.length !== DAILY_DESK_TYPES.length || !HASH.test(issue.envelopeSha256 || "") ||
          !issue.sourceIdentity || ![issue.sourceIdentity.radarSha256, issue.sourceIdentity.storiesSha256, issue.sourceIdentity.columnsSha256].every(function (hash) { return HASH.test(hash || ""); }) ||
          issue.sourceIdentity.radarPath !== "operations/agents/aidb-intelligence-desk/daily/" + issue.editionDate + ".md" ||
          issue.sourceIdentity.storiesPath !== "content/newsstand-stories.js" || issue.sourceIdentity.storiesSha256 !== loadedStoriesSha256 ||
          issue.sourceIdentity.columnsPath !== "content/daily-edition-columns.json" ||
          !issue.admission || ["ACCEPT_LOCAL_CANONICAL_WRITE", "ACCEPT_LOCAL_CANONICAL_SUCCESSOR"].indexOf(issue.admission.decision) === -1 ||
          (issue.admission.decision === "ACCEPT_LOCAL_CANONICAL_SUCCESSOR" && !HASH.test(issue.admission.predecessorEnvelopeSha256 || "")) ||
          !/independent/i.test(issue.admission.reviewedBy || "") || !/independent/i.test(issue.admission.reviewerRole || "") ||
          !validTimestamp(issue.admission.reviewedAt) || Date.parse(issue.admission.reviewedAt) > Date.now() + 300000 ||
          Date.parse(issue.admission.reviewedAt) < Date.parse(issue.editionDate + "T00:00:00Z")) return false;
      dates.add(issue.editionDate);
      var types = new Set();
      var readyIds = [];
      var desksValid = issue.desks.every(function (desk) {
        if (!desk || DAILY_DESK_TYPES.indexOf(desk.type) === -1 || types.has(desk.type)) return false;
        types.add(desk.type);
        if (desk.state === "ready") {
          if (!desk.recordId || !desk.headline || !desk.summary || !(desk.destination === null || typeof desk.destination === "string")) return false;
          readyIds.push(desk.recordId);
          return true;
        }
        return desk.state === "empty" && desk.recordId === null && Boolean(desk.emptyState);
      });
      if (!desksValid || new Set(readyIds).size !== readyIds.length ||
          readyIds.join("\n") !== issue.serviceRecordIds.join("\n")) return false;
      if (issue.stories.map(function (story) { return story && story.id; }).join("\n") !== issue.storyIds.join("\n")) return false;
      if (issue.stories.some(function (snapshot) {
        var source = sourceStories.find(function (story) {
          return story.id === snapshot.id && story.edition === "daily" && dateOnly(story.publishedAt) === issue.editionDate &&
            ["published", "corrected"].indexOf(story.status) !== -1;
        });
        return !source || canonicalJson(source) !== canonicalJson(snapshot);
      })) return false;
      if (issue.disposition === "quiet" && (issue.storyIds.length || readyIds.length)) return false;
      if (issue.disposition === "candidates_pending_review" && !issue.storyIds.length && !readyIds.length) return false;
      var computedEnvelopeHash = await sha256Text(canonicalJson(issueEnvelopeProjection(issue)) + "\n");
      if (!computedEnvelopeHash || computedEnvelopeHash !== issue.envelopeSha256) return false;
    }
    return true;
  }

  function applyLatestDailyIssue() {
    if (!contract || !data || data.datasetStatus !== "published") return;
    var issues = dailyIssues && Array.isArray(dailyIssues.issues) ? dailyIssues.issues : [];
    var issue = issues.filter(function (item) {
      return item && item.status === "complete" && /^\d{4}-\d{2}-\d{2}$/.test(item.editionDate) &&
        item.admission && validTimestamp(item.admission.reviewedAt) && Date.parse(item.admission.reviewedAt) <= Date.now();
    }).sort(function (a, b) { return b.editionDate.localeCompare(a.editionDate); })[0];
    var publication = data.publications && data.publications.daily;
    if (!issue || !publication) return;
    publication.editionDate = issue.editionDate;
    publication.issue = {
      status: "complete",
      disposition: issue.disposition,
      storyIds: issue.storyIds || [],
      serviceRecordIds: issue.serviceRecordIds || [],
      sourceIdentity: issue.sourceIdentity || null
    };
    publication.status = "current";
    publication.publishedAt = issue.editionDate + "T12:00:00Z";
    publication.updatedAt = issue.admission && issue.admission.reviewedAt || publication.publishedAt;
    publication.lastCheckedAt = issue.admission && issue.admission.reviewedAt || publication.publishedAt;
    if (!data.lastCheckedAt || publication.lastCheckedAt > data.lastCheckedAt) {
      data.lastCheckedAt = publication.lastCheckedAt;
    }
    publication.note = issue.disposition === "quiet"
      ? "This complete edition is quiet: no consequential report or admitted service item was filed for this date."
      : publication.note;
    syncCatchupAvailability();
  }

  function publicationStatusCopy(state, publication) {
    if (state === "current") return "Current · checked " + formatDate(publication.editionDate || publication.lastCheckedAt);
    if (state === "archive") return "Latest complete edition · " + formatDate(publication.editionDate || publication.publishedAt);
    if (state === "quiet") return "Quiet · checked " + formatDate(publication.lastCheckedAt);
    if (state === "hold") return "Not published";
    if (state === "stale") return "Check overdue · not current";
    return "Unavailable";
  }

  function compactPublicationStatusCopy(state, publication) {
    var date = formatCompactDate(publication.editionDate || publication.publishedAt || publication.lastCheckedAt);
    if (state === "current") return "Current · " + date;
    if (state === "archive") return "Latest · " + date;
    if (state === "quiet") return "Quiet · " + date;
    if (state === "hold") return "Not published";
    if (state === "stale") return "Update needed";
    return "Unavailable";
  }

  function refreshPublicationChrome() {
    if (!contract || !data || data.datasetStatus !== "published" || !data.publications ||
        contract.datasetState(data, new Date().toISOString()).state !== "ready") return;
    var now = new Date().toISOString();
    var daily = data.publications.daily;
    var dailyState = contract.effectivePublicationState(daily, now);
    var statuses = document.querySelectorAll('[data-status-for="daily"]');
    var action = document.querySelector('.ns-publication[data-edition="daily"] .ns-publication__action');
    var indexAction = document.querySelector('[data-index-action-for="daily"]');
    Array.prototype.forEach.call(statuses, function (status) {
      status.textContent = status.closest(".ns-paper-index")
        ? compactPublicationStatusCopy(dailyState, daily)
        : publicationStatusCopy(dailyState, daily);
      status.setAttribute("data-state", dailyState);
    });
    if (action) {
      action.textContent = dailyState === "current" ? "Pull this paper · Opens here" :
        dailyState === "archive" ? "Pull this paper · Latest edition" :
        dailyState === "quiet" ? "Check this paper · No issue today" :
        dailyState === "hold" ? "Check this paper · Not published" :
        dailyState === "stale" ? "Check this paper · Source update needed" :
        "Check this paper · Unavailable";
    }
    if (indexAction) {
      indexAction.textContent = dailyState === "current" ? "Open issue" :
        dailyState === "archive" ? "Open latest" :
        dailyState === "quiet" ? "No issue today" :
        dailyState === "hold" ? "Not published" :
        dailyState === "stale" ? "Update needed" :
        "Unavailable";
    }

    var labels = { breaking: "The Breaking", daily: "The Daily", weekly: "The Weekly", tribune: "The Tribune" };
    var order = ["breaking", "daily", "weekly", "tribune"];
    var dataset = contract.datasetState(data, now);
    var current = order.filter(function (edition) {
      return data.publications[edition] &&
        contract.effectivePublicationState(data.publications[edition], now) === "current";
    });
    var title = document.getElementById("ns-title");
    var detail = document.getElementById("ns-state-detail");
    var system = document.getElementById("ns-system-status");
    var primary = document.querySelector(".ns-state__primary");
    if (!title || !detail || !system || !primary) return;
    if (current.length) {
      title.textContent = current.map(function (edition) { return labels[edition]; }).join(" and ") +
        (current.length === 1 ? " is current." : " are current.");
      detail.textContent = "Last desk check: " + formatDate(data.lastCheckedAt) +
        ". If there is nothing new worth printing, Paige leaves the rack quiet." +
        (dataset.staleEditions && dataset.staleEditions.length ? " One or more checks are overdue." : "") +
        (dataset.unavailableEditions && dataset.unavailableEditions.length ? " One or more records are unavailable." : "");
      system.textContent = current.length + (current.length === 1 ? " current publication." : " current publications.");
    } else {
      title.textContent = "A clear day at the NewsStand.";
      detail.textContent = "No qualified current paper is filed. Last desk check: " + formatDate(data.lastCheckedAt) + ".";
      system.textContent = "No current publication.";
    }
    if (current.length === 1) {
      primary.textContent = "Pull " + labels[current[0]].replace(/^The /, "the ");
      primary.setAttribute("data-pull", current[0]);
    } else {
      primary.textContent = "Choose a paper";
      primary.removeAttribute("data-pull");
    }
  }

  function maybeOpenSharedDailyRequest() {
    if (dailyIssuesLoaded && columnsLoaded) openSharedDailyRequest();
  }

  function eligibleDerivatives() {
    var today = availableThroughDate();
    return derivatives && Array.isArray(derivatives.records)
      ? derivatives.records.filter(function (record) {
          return ["APPROVED", "PUBLISHED"].indexOf(record.status) !== -1 &&
            record.publicEligibility === "ELIGIBLE" && record.freshness &&
            record.freshness.expiresAt >= today;
        })
      : [];
  }

  function eligibleColumns() {
    var today = availableThroughDate();
    return columns && Array.isArray(columns.records)
      ? columns.records.filter(function (record) {
          return ["APPROVED", "PUBLISHED"].indexOf(record.status) !== -1 &&
            record.publicEligibility === "ELIGIBLE" && record.freshness &&
            record.freshness.expiresAt >= today;
        })
      : [];
  }

  function columnFor(date, type) {
    return eligibleColumns().find(function (record) {
      return record.editionDate === date && record.type === type;
    });
  }

  function columnEmpty(type, fallback) {
    return columns && columns.emptyStates && columns.emptyStates[type] || fallback;
  }

  function currentDailyStories(date, issue) {
    if (!issue || !Array.isArray(issue.stories)) return [];
    return JSON.parse(JSON.stringify(issue.stories));
  }

  function canRenderDaily() {
    if (!contract || !data || data.datasetStatus !== "published" || !data.publications || !data.publications.daily) return false;
    var dataset = contract.datasetState(data, new Date().toISOString());
    var state = contract.effectivePublicationState(data.publications.daily, new Date().toISOString());
    return dataset.state === "ready" && ["current", "archive"].indexOf(state) !== -1;
  }

  function storedDailyIssue(date) {
    return dailyIssues && Array.isArray(dailyIssues.issues)
      ? dailyIssues.issues.find(function (issue) { return issue.editionDate === date && issue.status === "complete"; })
      : null;
  }

  function dailyDeskValue(issue, date, type) {
    if (issue) return issue.desks.find(function (desk) { return desk.type === type; }) || null;
    return columnFor(date, type) || null;
  }

  function updateDailyPaper() {
    if (!canRenderDaily()) return;
    var date = currentDailyDate();
    var issue = storedDailyIssue(date);
    var today = issue ? issue.desks.filter(function (desk) { return desk.state === "ready"; }) :
      eligibleColumns().filter(function (record) { return record.editionDate === date; });
    var tip = dailyDeskValue(issue, date, "paige_tip");
    var node = document.querySelector('[data-contents-for="daily"]');
    if (!node) return;
    node.setAttribute("data-story-count", "0");
    node.setAttribute("data-service-count", String(today.length));
    node.innerHTML = [
      '<span class="ns-publication__count">Complete dated edition</span>',
      '<span class="ns-publication__headline">', escapeHTML(tip && tip.state !== "empty" ? tip.headline : "Quiet edition"), '</span>',
      '<span class="ns-publication__teaser">', escapeHTML(tip && tip.state !== "empty" ? sentence(tip.body || tip.summary) :
        "No consequential report or service item cleared for " + formatDate(date) + "."), '</span>'
    ].join("");
  }

  function dailyDesk(label, status, headline, body, route) {
    return [
      '<section class="ns-daily-desk" data-desk-state="', escapeHTML(status), '">',
        '<p class="ns-daily-desk__label">', escapeHTML(label), '</p>',
        '<p class="ns-daily-desk__state">', escapeHTML(status === "ready" ? "Filed in this edition" : "Desk update"), '</p>',
        '<h3>', escapeHTML(headline), '</h3>',
        '<p>', escapeHTML(body), '</p>',
        route ? '<a href="' + escapeHTML(route) + '">Go deeper →</a>' : '',
      '</section>'
    ].join("");
  }

  function renderDaily(requestedDate) {
    var reader = document.getElementById("paper-counter");
    var rack = document.getElementById("ns-rack");
    var empty = document.getElementById("ns-empty");
    var archivedIssue = requestedDate && storedDailyIssue(requestedDate);
    if (!reader || !rack || !empty || (!canRenderDaily() && !archivedIssue)) return;
    var date = requestedDate || currentDailyDate();
    var canonicalIssue = archivedIssue || storedDailyIssue(date);
    var quietIssue = canonicalIssue && canonicalIssue.disposition === "quiet";
    var tip = dailyDeskValue(canonicalIssue, date, "paige_tip");
    var promptoscope = dailyDeskValue(canonicalIssue, date, "promptoscope");
    var career = dailyDeskValue(canonicalIssue, date, "career_life");
    var missJeeves = dailyDeskValue(canonicalIssue, date, "dear_miss_jeeves");
    var reading = dailyDeskValue(canonicalIssue, date, "mme_claio");
    var song = dailyDeskValue(canonicalIssue, date, "song");
    var fact = dailyDeskValue(canonicalIssue, date, "did_you_know");
    var townNote = dailyDeskValue(canonicalIssue, date, "town_note");
    var curiosity = dailyDeskValue(canonicalIssue, date, "curiosity");
    var fiction = dailyDeskValue(canonicalIssue, date, "fiction");
    var dailyStories = currentDailyStories(date, canonicalIssue);
    var lead = dailyStories[0];
    var html = [
      '<article class="ns-daily-issue" data-daily-date="', escapeHTML(date), '">',
        '<header class="ns-daily-issue__head">',
          '<p>The Daily · ', escapeHTML(formatDate(date)), '</p>',
          '<h2>Your complete SUNNYVA<span class="ns-brand-i">i</span>LE paper.</h2>',
          '<p>Reporting, practical help and town desks are labelled separately. An empty desk is honest; it is never filled with invented material.</p>',
        '</header>',
        '<section class="ns-daily-news">',
          '<p class="ns-daily-desk__label">Evidence desk · sourced reporting</p>',
          '<h3>', escapeHTML(lead ? lead.headline : quietIssue ? "No consequential report was filed." : "The evidence desk has no admitted lead yet."), '</h3>',
          '<p>', escapeHTML(lead ? sentence(lead.the_story) : quietIssue ?
            "The evidence desk closed this edition without a qualified lead. Nothing was carried forward to fill the paper." :
            "This edition’s sourced reporting remains at its accuracy gate. The service desks still publish; no story is invented to fill this space."), '</p>',
          lead ? '<a href="#' + escapeHTML(lead.slug) + '">Read the full report →</a>' : '',
        '</section>',
        quietIssue
          ? '<details class="ns-daily-quiet-desks"><summary>All ten service desks were checked. Open the desk-by-desk record.</summary><div class="ns-daily-service-grid">'
          : '<div class="ns-daily-service-grid">',
          dailyDesk("Paige’s practical tip", tip && tip.state !== "empty" ? "ready" : "empty",
            tip && tip.state !== "empty" ? tip.headline : "Tip check in progress.", tip && tip.state !== "empty" ? tip.summary : tip && tip.emptyState || columnEmpty("paige_tip", "Paige is checking this edition’s tip against the receipts."),
            tip && tip.state !== "empty" ? tip.destination : ""),
          dailyDesk("Promptoscope", promptoscope && promptoscope.state !== "empty" ? "ready" : "empty",
            promptoscope && promptoscope.state !== "empty" ? promptoscope.headline : "Recalibrating.",
            promptoscope && promptoscope.state !== "empty" ? promptoscope.summary : promptoscope && promptoscope.emptyState || columnEmpty("promptoscope", "The Promptoscope is recalibrating."),
            promptoscope && promptoscope.state !== "empty" ? promptoscope.destination : ""),
          dailyDesk("Work + life", career && career.state !== "empty" ? "ready" : "empty", career && career.state !== "empty" ? career.headline : "The useful move is being checked.",
            career && career.state !== "empty" ? career.summary : career && career.emptyState || columnEmpty("career_life", "No career or life item has cleared review."), career && career.state !== "empty" ? career.destination : ""),
          dailyDesk("Dear Miss Jeeves", missJeeves && missJeeves.state !== "empty" ? "ready" : "empty", missJeeves && missJeeves.state !== "empty" ? missJeeves.headline : "Miss Jeeves is checking the mechanism.",
            missJeeves && missJeeves.state !== "empty" ? missJeeves.summary : missJeeves && missJeeves.emptyState || columnEmpty("dear_miss_jeeves", "No admitted Dear Miss Jeeves column is filed this week."), missJeeves && missJeeves.state !== "empty" ? missJeeves.destination : ""),
          dailyDesk("Mme CLAi-O’s reading", reading && reading.state !== "empty" ? "ready" : "empty", reading && reading.state !== "empty" ? reading.headline : "The card is face down.",
            reading && reading.state !== "empty" ? reading.summary : reading && reading.emptyState || columnEmpty("mme_claio", "No dated reading has cleared review."), reading && reading.state !== "empty" ? reading.destination : ""),
          dailyDesk("Song of the Day", song && song.state !== "empty" ? "ready" : "empty", song && song.state !== "empty" ? song.headline : "The request line is checking the release.",
            song && song.state !== "empty" ? song.summary : song && song.emptyState || columnEmpty("song", "No exact song release has cleared review."), song && song.state !== "empty" ? song.destination : ""),
          dailyDesk("Did you know?", fact && fact.state !== "empty" ? "ready" : "empty", fact && fact.state !== "empty" ? fact.headline : "The fact desk is checking its source.",
            fact && fact.state !== "empty" ? fact.summary : fact && fact.emptyState || columnEmpty("did_you_know", "No verified fact is filed in this edition."), fact && fact.state !== "empty" ? fact.destination : ""),
          dailyDesk("Town notes", townNote && townNote.state !== "empty" ? "ready" : "empty", townNote && townNote.state !== "empty" ? townNote.headline : "The noticeboard is clear.",
            townNote && townNote.state !== "empty" ? townNote.summary : townNote && townNote.emptyState || columnEmpty("town_note", "No dated town notice is filed in this edition."), townNote && townNote.state !== "empty" ? townNote.destination : ""),
          dailyDesk("Try this today", curiosity && curiosity.state !== "empty" ? "ready" : "empty", curiosity && curiosity.state !== "empty" ? curiosity.headline : "The curiosity desk is still checking the move.",
            curiosity && curiosity.state !== "empty" ? curiosity.summary : curiosity && curiosity.emptyState || columnEmpty("curiosity", "No concrete curiosity or mutual-support action is filed in this edition."), curiosity && curiosity.state !== "empty" ? curiosity.destination : ""),
          dailyDesk("SUNNYVAiLE desk · fictional", fiction && fiction.state !== "empty" ? "ready" : "empty", fiction && fiction.state !== "empty" ? fiction.headline : "No town filler filed.",
            fiction && fiction.state !== "empty" ? fiction.summary : fiction && fiction.emptyState || columnEmpty("fiction", "No canon-reviewed fictional town item is filed in this edition."), fiction && fiction.state !== "empty" ? fiction.destination : "") ,
        quietIssue ? '</div></details>' : '</div>',
        '<footer class="ns-daily-issue__foot">',
          '<button type="button" id="ns-share-daily">Share this Daily</button>',
          '<span id="ns-share-daily-status" role="status"></span>',
        '</footer>',
      '</article>'
    ].join("");
    reader.hidden = false;
    rack.innerHTML = html;
    empty.hidden = true;
    document.getElementById("ns-reader-edition").textContent = "The Daily";
    document.getElementById("ns-reader-title").textContent = "Inside this paper.";
    document.getElementById("ns-reader-date").textContent = formatDate(date);
    document.getElementById("ns-paper-view").setAttribute("data-paper", "daily");
    Array.prototype.forEach.call(document.querySelectorAll("[data-edition]"), function (paper) {
      var selected = paper.getAttribute("data-edition") === "daily";
      paper.classList.toggle("is-selected", selected);
      paper.setAttribute("aria-pressed", String(selected));
    });
    markSeen("daily:" + date);
    reader.scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("ns-reader-title").focus({ preventScroll: true });
  }

  function openSharedDailyRequest() {
    if (sharedDailyHandled) return;
    var requested = new URL(global.location.href).searchParams.get("daily");
    if (!requested) return;
    sharedDailyHandled = true;
    if (/^\d{4}-\d{2}-\d{2}$/.test(requested) &&
        ((requested === currentDailyDate() && canRenderDaily()) || storedDailyIssue(requested))) {
      renderDaily(requested);
      return;
    }
    var target = document.getElementById("ns-catchup-results");
    if (target) {
      target.innerHTML = '<p class="ns-catchup__empty">That dated Daily is not available from the current public issue record. Choose the latest paper or search the back-issue crate.</p>';
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function catchupItems(since) {
    var now = new Date().toISOString();
    var dailyDate = currentDailyDate();
    if (!contract || !data || contract.datasetState(data, now).state !== "ready") return [];
    var admittedDailyStories = (dailyIssues && dailyIssues.issues || []).flatMap(function (issue) {
      return JSON.parse(JSON.stringify(issue.stories || []));
    });
    var archiveStories = sourceStories.filter(function (story) { return story.edition !== "daily"; }).concat(admittedDailyStories);
    var storyItems = archiveStories.filter(function (story) {
      if (dateOnly(story.publishedAt) < since || dateOnly(story.publishedAt) === dailyDate) return false;
      var datedIssue = story.edition === "daily" ? storedDailyIssue(dateOnly(story.publishedAt)) : null;
      if (datedIssue && datedIssue.storyIds.indexOf(story.id) === -1) return false;
      var decision = contract.accessDecision(data, story, { scope: "hash" }, now);
      return decision.canExpose || decision.state === "stale" || decision.preserveNotice;
    }).map(function (story) {
      var publication = data.publications && data.publications[story.edition];
      var pubState = contract && publication
        ? contract.effectivePublicationState(publication, now)
        : "unavailable";
      var storyState = contract ? contract.storyState(story) : story.status;
      var decision = contract.accessDecision(data, story, { scope: "hash" }, now);
      if (decision.state === "retracted" && decision.preserveNotice) {
        return {
          key: "story:" + story.id,
          date: dateOnly(story.publishedAt),
          kind: "The " + story.edition.charAt(0).toUpperCase() + story.edition.slice(1),
          headline: "A retracted story remains on record.",
          state: "Archive · retracted",
          points: [decision.reason],
          route: "#" + story.slug,
          canOpen: true,
          actionLabel: "Open the retraction notice"
        };
      }
      if (decision.state === "stale") {
        return {
          key: "story:" + story.id,
          date: dateOnly(story.publishedAt),
          kind: "The " + story.edition.charAt(0).toUpperCase() + story.edition.slice(1),
          headline: "An archived item needs a new source check.",
          state: "Archive · source check overdue",
          points: [decision.reason],
          route: "",
          canOpen: false,
          actionLabel: ""
        };
      }
      return {
        key: "story:" + story.id,
        date: dateOnly(story.publishedAt),
        kind: "The " + story.edition.charAt(0).toUpperCase() + story.edition.slice(1),
        headline: story.headline,
        state: storyState === "corrected" ? "Archive · corrected" : "Archive",
        points: [sentence(story.the_story), sentence(story.what_this_means)].filter(Boolean),
        route: "#" + story.slug,
        canOpen: pubState !== "stale",
        actionLabel: "Read the full story"
      };
    });
    var canonicalServiceItems = (dailyIssues && dailyIssues.issues || []).filter(function (issue) {
      return issue.editionDate >= since && issue.editionDate !== dailyDate;
    }).flatMap(function (issue) {
      return issue.desks.filter(function (desk) { return desk.state === "ready"; }).map(function (desk) {
        return {
          key: "service:" + desk.recordId,
          date: issue.editionDate,
          kind: "The Daily · " + desk.type.replace(/_/g, " "),
          headline: desk.headline,
          state: "Filed",
          points: [desk.summary],
          route: desk.destination && desk.destination.charAt(0) === "/" ? desk.destination : "",
          canOpen: Boolean(desk.destination && desk.destination.charAt(0) === "/"),
          actionLabel: "Go deeper"
        };
      });
    });
    var legacyColumns = eligibleColumns().filter(function (record) {
      return record.editionDate >= since && record.editionDate !== dailyDate && !storedDailyIssue(record.editionDate);
    }).map(function (record) {
      return {
        key: "service:" + record.id,
        date: record.editionDate,
        kind: "The Daily · " + record.type.replace(/_/g, " "),
        headline: record.headline,
        state: "Filed",
        points: [record.summary],
        route: record.destination && record.destination.charAt(0) === "/" ? record.destination : "",
        canOpen: Boolean(record.destination && record.destination.charAt(0) === "/"),
        actionLabel: "Go deeper"
      };
    });
    var serviceItems = canonicalServiceItems.concat(legacyColumns);
    var admittedSourceIds = new Set(serviceItems.map(function (item) { return item.key.replace(/^service:/, ""); }));
    eligibleDerivatives().filter(function (record) {
      return record.date >= since && record.date !== dailyDate && !storedDailyIssue(record.date) && !admittedSourceIds.has(record.id);
    }).forEach(function (record) {
      serviceItems.push({
        key: "service:" + record.id,
        date: record.date,
        kind: record.type === "paige_tip" ? "The Daily · Paige’s tip" : "The Daily · Promptoscope",
        headline: record.headline,
        state: "Filed",
        points: [record.body],
        route: record.canonicalPath && record.canonicalPath.charAt(0) === "/" ? record.canonicalPath : "",
        canOpen: Boolean(record.canonicalPath && record.canonicalPath.charAt(0) === "/"),
        actionLabel: "Go deeper"
      });
    });
    return storyItems.concat(serviceItems).sort(function (a, b) {
      return b.date.localeCompare(a.date) || a.headline.localeCompare(b.headline);
    });
  }

  function renderCatchup() {
    var input = document.getElementById("ns-catchup-since");
    var target = document.getElementById("ns-catchup-results");
    if (!input || !target) return;
    var since = input.value;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(since)) return;
    if (since > availableThroughDate()) {
      since = availableThroughDate();
      input.value = since;
    }
    var now = new Date().toISOString();
    var dataset = contract && data ? contract.datasetState(data, now) : { state: "load-failure" };
    if (dataset.state !== "ready") {
      target.innerHTML = '<p class="ns-catchup__empty">Catch Me Up is unavailable until the publication record is current. No held or unverified item is shown.</p>';
      return;
    }
    var items = catchupItems(since);
    var daily = canRenderDaily() ? [
      '<article class="ns-catchup-lead" data-catchup-role="daily">',
        '<p class="ns-catchup-item__kind">Start here · The Daily</p>',
        '<h3>Latest complete SUNNYVA<span class="ns-brand-i">i</span>LE paper.</h3>',
        '<p>Sourced reporting and every governed service desk for ', escapeHTML(formatDate(currentDailyDate())), '.</p>',
        '<button type="button" data-open-daily>Open the Daily</button>',
      '</article>'
    ].join("") : "";
    var weeklyPublication = data.publications && data.publications.weekly;
    var weeklyState = contract.effectivePublicationState(weeklyPublication, now);
    var weeklyStory = sourceStories.filter(function (story) {
      return story.edition === "weekly" && dateOnly(story.publishedAt) >= since &&
        contract.accessDecision(data, story, { scope: "search" }, now).canExpose;
    }).sort(function (a, b) { return String(b.publishedAt).localeCompare(String(a.publishedAt)); })[0];
    var weekly = weeklyStory ? [
      '<article class="ns-catchup-lead" data-catchup-role="weekly">',
        '<p class="ns-catchup-item__kind">Next · The Weekly</p>',
        '<h3>', escapeHTML(weeklyStory.headline), '</h3>',
        '<p>', escapeHTML(sentence(weeklyStory.what_this_means || weeklyStory.the_story)), '</p>',
        '<a href="#', escapeHTML(weeklyStory.slug), '">Open the Weekly →</a>',
      '</article>'
    ].join("") : [
      '<article class="ns-catchup-lead" data-catchup-role="weekly" data-catchup-state="', escapeHTML(weeklyState), '">',
        '<p class="ns-catchup-item__kind">Next · The Weekly</p>',
        '<h3>No Weekly is ready to read.</h3>',
        '<p>', escapeHTML(weeklyPublication && weeklyPublication.note || "No Weekly has cleared publication."), '</p>',
      '</article>'
    ].join("");
    var history = items.length ? '<p class="ns-catchup__count">' + items.length +
      (items.length === 1 ? " older item" : " older items") + " filed on or after " + escapeHTML(formatDate(since)) +
      '.</p><div class="ns-catchup__timeline" data-catchup-role="history">' + items.map(function (item) {
        return [
          '<details class="ns-catchup-item">',
            '<summary>',
              '<span class="ns-catchup-item__date">', escapeHTML(formatDate(item.date)), '</span>',
              '<span class="ns-catchup-item__kind">', escapeHTML(item.kind), '</span>',
              '<strong>', escapeHTML(item.headline), '</strong>',
              '<span class="ns-catchup-item__state">', escapeHTML(item.state), '</span>',
            '</summary>',
            '<div class="ns-catchup-item__body"><ul>',
              item.points.map(function (point) { return '<li>' + escapeHTML(point) + '</li>'; }).join(""),
            '</ul>',
            item.canOpen ? '<a href="' + escapeHTML(item.route) + '">' + escapeHTML(item.actionLabel) + ' →</a>' : '',
            '</div>',
          '</details>'
        ].join("");
      }).join("") + "</div>" : '<div class="ns-catchup__timeline" data-catchup-role="history"><p class="ns-catchup__empty">No older eligible item was filed on or after ' +
        escapeHTML(formatDate(since)) + '.</p></div>';
    target.innerHTML = daily + weekly + history;
  }

  function initialize() {
    var input = document.getElementById("ns-catchup-since");
    var run = document.getElementById("ns-catchup-run");
    if (!input || !run) return;
    var fallback = new Date(Date.now() - 7 * DAY_MS);
    syncCatchupAvailability();
    input.value = editorialDateOnly(previousVisit || fallback);
    var visitSealed = false;
    input.addEventListener("input", function () { input.setAttribute("data-user-edited", "true"); });
    input.addEventListener("change", function () { input.setAttribute("data-user-edited", "true"); });
    run.addEventListener("click", renderCatchup);
    document.addEventListener("click", function (event) {
      var dailyReturn = event.target.closest("#ns-return");
      var openDaily = document.querySelector(".ns-daily-issue");
      if (dailyReturn && openDaily) {
        event.preventDefault();
        event.stopImmediatePropagation();
        var reader = document.getElementById("paper-counter");
        var dailyPaper = Array.prototype.find.call(
          document.querySelectorAll('[data-edition="daily"]'),
          function (control) { return control.offsetParent !== null; }
        ) || document.querySelector('.ns-publication[data-edition="daily"]');
        reader.hidden = true;
        document.getElementById("ns-rack").innerHTML = "";
        if (dailyPaper) {
          dailyPaper.classList.remove("is-selected");
          dailyPaper.setAttribute("aria-pressed", "false");
          dailyPaper.scrollIntoView({ behavior: "smooth", block: "center" });
          dailyPaper.focus({ preventScroll: true });
        }
        return;
      }
      var daily = event.target.closest('[data-edition="daily"]');
      if (daily && canRenderDaily()) {
        event.preventDefault();
        event.stopImmediatePropagation();
        renderDaily();
        return;
      }
      if (event.target.closest("[data-open-daily]") && canRenderDaily()) {
        event.preventDefault();
        renderDaily();
        return;
      }
      var story = event.target.closest('.ns-front-story[href^="#"]');
      if (story) markSeen("story:" + story.getAttribute("href").slice(1));
    }, true);
    document.addEventListener("click", function (event) {
      if (!event.target.closest("#ns-share-daily")) return;
      var url = new URL(global.location.href);
      url.hash = "";
      url.searchParams.set("daily", currentDailyDate());
      var status = document.getElementById("ns-share-daily-status");
      var payload = { title: "The Daily · LAiDIES", text: "The latest complete SUNNYVAiLE Daily", url: url.href };
      if (navigator.share) {
        navigator.share(payload).then(function () { status.textContent = "Share sheet opened."; })
          .catch(function () { status.textContent = "Share cancelled."; });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url.href).then(function () { status.textContent = "Daily link copied."; })
          .catch(function () { status.textContent = "Copy unavailable."; });
      } else {
        status.textContent = "Copy this address: " + url.href;
      }
    });
    fetch("/content/daily-learning-derivatives.json", { credentials: "same-origin" })
      .then(function (response) { if (!response.ok) throw new Error("daily-derivatives-unavailable"); return response.json(); })
      .then(function (value) { derivatives = value; })
      .catch(function () { derivatives = null; renderCatchup(); });
    fetch("/content/newsstand-daily-issues.json", { credentials: "same-origin" })
      .then(function (response) { if (!response.ok) throw new Error("daily-issues-unavailable"); return response.json(); })
      .then(async function (value) {
        if (!await validDailyIssueStore(value)) throw new Error("daily-issues-invalid");
        dailyIssues = value;
        global.dispatchEvent(new CustomEvent("newsstand:daily-snapshots-admitted", {
          detail: { stories: value.issues.flatMap(function (issue) { return JSON.parse(JSON.stringify(issue.stories || [])); }) }
        }));
        applyLatestDailyIssue();
        refreshPublicationChrome();
        updateDailyPaper();
        renderCatchup();
      })
      .catch(function (error) { global.__newsstandDailyIssueError = String(error && error.message || error); dailyIssues = null; })
      .finally(function () { dailyIssuesLoaded = true; maybeOpenSharedDailyRequest(); });
    fetch("/content/daily-edition-columns.json", { credentials: "same-origin" })
      .then(function (response) { if (!response.ok) throw new Error("daily-columns-unavailable"); return response.json(); })
      .then(function (value) { columns = value; updateDailyPaper(); renderCatchup(); })
      .catch(function () { columns = null; updateDailyPaper(); renderCatchup(); })
      .finally(function () { columnsLoaded = true; maybeOpenSharedDailyRequest(); });
    function reconcileVisit() {
      previousVisit = latestPreviousVisit(readState());
      if (previousVisit && input.getAttribute("data-user-edited") !== "true") {
        input.value = editorialDateOnly(previousVisit);
      }
      if (!visitSealed) {
        visitSealed = true;
        sealVisit();
      }
    }
    global.addEventListener("laidies:continuation-change", reconcileVisit);
    global.addEventListener("laidies:continuation-unavailable", reconcileVisit, { once: true });
    beginVisit();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})(window);
