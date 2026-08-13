(function installNewsstandCatchupV1(global) {
  "use strict";

  var STORAGE_KEY = "laidies_newsstand_seen_v1";
  var DAY_MS = 86400000;
  var DAILY_DESK_TYPES = ["paige_tip", "promptoscope", "career_life", "mme_claio", "song", "did_you_know", "town_note", "curiosity", "fiction"];
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

  function validEditorialReceiptPath(value, editionDate) {
    return value === "operations/agents/aidb-intelligence-desk/daily/" + editionDate + ".md" ||
      value === "operations/product-stewards/newsstand/editorial-intake/" + editionDate + ".md";
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
    if (!global.NEWSSTAND_DATA || global.NEWSSTAND_DATA.datasetStatus !== "published" || !contract ||
        contract.datasetState(global.NEWSSTAND_DATA, new Date().toISOString()).state !== "ready" ||
        !value || value.schemaVersion !== "daily-issues-v1" || value.owner !== "newsstand-daily" || !Array.isArray(value.issues)) return false;
    var dates = new Set();
    for (var issueIndex = 0; issueIndex < value.issues.length; issueIndex += 1) {
      var issue = value.issues[issueIndex];
      if (!issue || !/^\d{4}-\d{2}-\d{2}$/.test(issue.editionDate || "") || dates.has(issue.editionDate) ||
          issue.editorialTimeZone !== "America/Vancouver" || issue.status !== "complete" ||
          ["quiet", "candidates_pending_review"].indexOf(issue.disposition) === -1 ||
          !Array.isArray(issue.storyIds) || !Array.isArray(issue.stories) || !Array.isArray(issue.serviceRecordIds) || !Array.isArray(issue.desks) ||
          issue.desks.length !== DAILY_DESK_TYPES.length || !HASH.test(issue.envelopeSha256 || "") ||
          !issue.sourceIdentity || ![issue.sourceIdentity.radarSha256, issue.sourceIdentity.storiesSha256, issue.sourceIdentity.columnsSha256].every(function (hash) { return HASH.test(hash || ""); }) ||
          !validEditorialReceiptPath(issue.sourceIdentity.radarPath, issue.editionDate) ||
          issue.sourceIdentity.storiesPath !== "content/newsstand-stories.js" ||
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
        return !snapshot || snapshot.edition !== "daily" || dateOnly(snapshot.publishedAt) !== issue.editionDate ||
          ["published", "corrected"].indexOf(snapshot.status) === -1 || !snapshot.sourceApproval ||
          snapshot.sourceApproval.status !== "approved" || typeof snapshot.sourceApproval.record !== "string" ||
          snapshot.sourceApproval.record.indexOf("/operations/product-stewards/newsstand/evidence/stories/") !== 0 ||
          !snapshot.headline || !snapshot.the_story || !snapshot.laidies_read || !snapshot.what_this_means ||
          !Array.isArray(snapshot.sources) || !snapshot.sources.length || snapshot.sources.some(function (source) {
            return !source || !source.id || !source.label || !source.url || source.approvalStatus !== "reviewed";
          });
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

    var labels = { breaking: "The Breaking", daily: "The Daily", weekly: "The Weekly", tribune: "The Big Picture" };
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
    if (!dailyIssuesLoaded || !columnsLoaded) return;
    var requested = new URL(global.location.href).searchParams.get("daily");
    openSharedDailyRequest();
    if (!requested && !global.location.hash && canRenderDaily()) renderDaily(null, { initial: true });
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

  function archivedDerivatives() {
    return derivatives && Array.isArray(derivatives.records)
      ? derivatives.records.filter(function (record) {
          return record.status === "EXPIRED" && record.publicEligibility === "INELIGIBLE" &&
            record.freshness && record.freshness.lastCheckedAt && record.freshness.expiresAt;
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

  function dailyDesk(label, status, headline, body, route, options) {
    options = options || {};
    var bodyParts = String(body || "").split(/\n\s*\n/).map(function (part) { return part.trim(); }).filter(Boolean);
    var lead = bodyParts.shift() || "";
    var useLeadAsHeadline = Boolean(options.leadAsHeadline && lead && bodyParts.length);
    var displayHeadline = useLeadAsHeadline ? lead : headline;
    var more = options.expanded && bodyParts.length ? [
      '<div class="ns-daily-desk__body">',
        bodyParts.map(function (part) { return '<p>' + escapeHTML(part) + '</p>'; }).join(""),
      '</div>'
    ].join("") : bodyParts.length ? [
      '<details class="ns-daily-desk__full">',
        '<summary>', escapeHTML(options.summaryLabel || "Read today’s full feature"), '</summary>',
        '<div>', bodyParts.map(function (part) { return '<p>' + escapeHTML(part) + '</p>'; }).join(""), '</div>',
      '</details>'
    ].join("") : "";
    return [
      '<section class="ns-daily-desk" data-desk-state="', escapeHTML(status), '" data-desk-type="', escapeHTML(options.type || "other"), '">',
        '<p class="ns-daily-desk__label">', escapeHTML(label), '</p>',
        '<h3>', escapeHTML(displayHeadline), '</h3>',
        useLeadAsHeadline ? '' : '<p class="ns-daily-desk__lead">' + escapeHTML(lead) + '</p>',
        more,
        route ? '<a href="' + escapeHTML(route) + '">' + escapeHTML(options.routeLabel || "Go deeper →") + '</a>' : '',
      '</section>'
    ].join("");
  }

  function breakingLead() {
    if (!contract || !data || !data.publications || !data.publications.breaking) return null;
    var now = new Date().toISOString();
    if (contract.effectivePublicationState(data.publications.breaking, now) !== "current") return null;
    return contract.visibleStories(data, "breaking", now)[0] || null;
  }

  function renderDaily(requestedDate, options) {
    options = options || {};
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
    var reading = dailyDeskValue(canonicalIssue, date, "mme_claio");
    var song = dailyDeskValue(canonicalIssue, date, "song");
    var fact = dailyDeskValue(canonicalIssue, date, "did_you_know");
    var townNote = dailyDeskValue(canonicalIssue, date, "town_note");
    var curiosity = dailyDeskValue(canonicalIssue, date, "curiosity");
    var fiction = dailyDeskValue(canonicalIssue, date, "fiction");
    var dailyStories = currentDailyStories(date, canonicalIssue);
    var lead = dailyStories[0];
    var breaking = breakingLead();
    var desks = [
      { type: "paige_tip", label: "Paige’s practical AI tip", value: tip, emptyHeadline: "Tip check in progress.", emptyCopy: columnEmpty("paige_tip", "Paige is checking this edition’s tip against the receipts.") },
      { type: "promptoscope", label: "Promptoscope", value: promptoscope, emptyHeadline: "Recalibrating.", emptyCopy: columnEmpty("promptoscope", "The Promptoscope is recalibrating.") },
      { type: "career_life", label: "Career + life", value: career, emptyHeadline: "The useful move is being checked.", emptyCopy: columnEmpty("career_life", "No career or life item has cleared review.") },
      { type: "mme_claio", label: "Mme CLAi-O’s reading", value: reading, emptyHeadline: "The card is face down.", emptyCopy: columnEmpty("mme_claio", "No dated reading has cleared review.") },
      { type: "song", label: "Song of the Day", value: song, emptyHeadline: "The request line is checking the release.", emptyCopy: columnEmpty("song", "No exact song release has cleared review.") },
      { type: "did_you_know", label: "Did you know?", value: fact, emptyHeadline: "The fact desk is checking its source.", emptyCopy: columnEmpty("did_you_know", "No verified fact is available today.") },
      { type: "town_note", label: "Town notes", value: townNote, emptyHeadline: "The noticeboard is clear.", emptyCopy: columnEmpty("town_note", "No dated town notice is available today.") },
      { type: "curiosity", label: "Try this today", value: curiosity, emptyHeadline: "The curiosity desk is checking the move.", emptyCopy: columnEmpty("curiosity", "No concrete curiosity or mutual-support action is available today.") },
      { type: "fiction", label: "SUNNYVAiLE desk · fictional", value: fiction, emptyHeadline: "No town story today.", emptyCopy: columnEmpty("fiction", "No canon-reviewed fictional town item is available today.") }
    ];
    function deskMarkup(desk, overrides) {
      var ready = desk.value && desk.value.state !== "empty";
      var optionByType = {
        paige_tip: { summaryLabel: "Use the complete tip" },
        promptoscope: { summaryLabel: "Reveal tonight’s practical move" },
        career_life: { summaryLabel: "Read the advice and AI connection" },
        mme_claio: { leadAsHeadline: true, routeLabel: "Visit Mme CLAi-O →" }
      };
      var options = Object.assign({ type: desk.type }, optionByType[desk.type] || {}, overrides || {});
      return dailyDesk(desk.label, ready ? "ready" : "empty",
        ready ? desk.value.headline : desk.emptyHeadline,
        ready ? desk.value.summary : desk.value && desk.value.emptyState || desk.emptyCopy,
        ready ? desk.value.destination : "", options);
    }
    var primaryDesks = desks.slice(0, 4);
    var sideDesks = primaryDesks.slice(0, 4);
    var readySideDesks = sideDesks.filter(function (desk) { return desk.value && desk.value.state !== "empty"; });
    var spotlightDesks = [];
    var secondaryDesks = desks.slice(4);
    var readySideCount = readySideDesks.length;
    var readySecondaryDesks = secondaryDesks.filter(function (desk) { return desk.value && desk.value.state !== "empty"; });
    var sideMarkup = readySideCount ? [
      '<aside class="ns-daily-service-rail" aria-label="Today’s practical and playful desks">',
        '<div class="ns-daily-service-rail__head">',
          '<p class="ns-daily-section-flag">Today&rsquo;s desks</p>',
          '<p><span class="ns-daily-service-rail__desktop-note">Four small things worth opening.</span><span class="ns-daily-service-rail__mobile-note">Swipe for all four &rarr;</span></p>',
        '</div>',
        '<div class="ns-daily-service-grid ns-daily-service-grid--primary">', readySideDesks.map(deskMarkup).join(""), '</div>',
      '</aside>'
    ].join("") : '';
    var spotlightMarkup = spotlightDesks.length ? [
      '<section class="ns-daily-feature-strip" aria-label="Today’s Rewind reading">',
        '<p class="ns-daily-section-flag">Today&rsquo;s Rewind reading</p>',
        '<div class="ns-daily-service-grid ns-daily-service-grid--spotlight">', spotlightDesks.map(function (desk) { return deskMarkup(desk, { expanded: true }); }).join(""), '</div>',
      '</section>'
    ].join("") : "";
    var moreMarkup = readySecondaryDesks.length ? [
      '<section class="ns-daily-more-desks" aria-labelledby="ns-daily-more-title">',
        '<div class="ns-daily-more-desks__head"><p class="ns-daily-section-flag">Also in today&rsquo;s paper</p><h3 id="ns-daily-more-title">One more for the road.</h3></div>',
        '<div class="ns-daily-service-grid ns-daily-service-grid--more">' + readySecondaryDesks.map(deskMarkup).join("") + '</div>',
      '</section>'
    ].join("") : "";
    var quietNote = !readySideCount && !spotlightDesks.length && !readySecondaryDesks.length ?
      '<p class="ns-daily-brief-edition">Today&rsquo;s edition is brief. More tomorrow.</p>' : '';
    var tags = lead && Array.isArray(lead.tags) ? lead.tags.slice(0, 5) : [];
    var tagMarkup = tags.length ? [
      '<nav class="ns-daily-tags" aria-label="Find related stories"><span>Keep reading:</span>',
      tags.map(function (tag) { return '<button type="button" data-daily-topic="' + escapeHTML(tag) + '">' + escapeHTML(tag) + '</button>'; }).join(""),
      '</nav>'
    ].join("") : '';
    var html = [
      '<article class="ns-daily-issue" data-daily-date="', escapeHTML(date), '">',
        breaking ? '<aside class="ns-daily-breaking"><strong>BREAKING</strong><a href="#' + escapeHTML(breaking.slug) + '">' + escapeHTML(breaking.headline) + '</a></aside>' : '',
        '<header class="ns-daily-issue__head">',
          '<div class="ns-daily-issue__dateline"><span>SUNNYVA<span class="ns-brand-i">i</span>LE</span><span>', escapeHTML(formatDate(date)), '</span><span>MAiN Street No. 2</span></div>',
          '<h2><span>The</span> Daily</h2>',
          '<p>AI news, useful moves and a little SUNNYVA<span class="ns-brand-i">i</span>LE life.</p>',
        '</header>',
        '<nav class="ns-daily-section-switcher" aria-label="Choose a NewsStand section">',
          '<button type="button" class="is-current" aria-current="page">The Daily</button>',
          '<button type="button" data-open-paper="weekly">The Weekly</button>',
          '<button type="button" data-open-paper="tribune">The Big Picture</button>',
          '<button type="button" data-open-archive>Archive + topics</button>',
        '</nav>',
        '<div class="ns-daily-front-grid', readySideCount ? '' : ' ns-daily-front-grid--single', '">',
          '<section class="ns-daily-news">',
            '<p class="ns-daily-desk__label">Evidence desk · sourced reporting</p>',
            '<h3>', escapeHTML(lead ? lead.headline : quietIssue ? "No consequential report was filed." : "The evidence desk has no admitted lead yet."), '</h3>',
            '<p class="ns-daily-news__standfirst">', escapeHTML(lead ? lead.the_story : quietIssue ?
              "The evidence desk closed this edition without a qualified lead. Nothing was carried forward to fill the paper." :
              "This edition’s sourced reporting remains at its accuracy gate. No story is invented to fill this space."), '</p>',
            lead && lead.laidies_read ? '<div class="ns-daily-news__brief"><p class="ns-daily-section-flag">The LAiDIES read</p><p>' + escapeHTML(lead.laidies_read) + '</p></div>' : '',
            lead && lead.what_this_means ? '<aside class="ns-daily-news__move"><strong>Before you share</strong><p>' + escapeHTML(lead.what_this_means) + '</p></aside>' : '',
            tagMarkup,
            lead ? '<a href="#' + escapeHTML(lead.slug) + '">Read the full report →</a>' : '',
          '</section>',
          sideMarkup,
        '</div>',
        spotlightMarkup,
        moreMarkup,
        quietNote,
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
    if (!options.initial) {
      reader.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("ns-reader-title").focus({ preventScroll: true });
    }
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
    eligibleDerivatives().concat(archivedDerivatives()).filter(function (record) {
      return record.date >= since && record.date !== dailyDate && !storedDailyIssue(record.date) && !admittedSourceIds.has(record.id);
    }).forEach(function (record) {
      serviceItems.push({
        key: "service:" + record.id,
        date: record.date,
        kind: record.type === "paige_tip" ? "The Daily · Paige’s tip" : "The Daily · Promptoscope",
        headline: record.headline,
        state: record.status === "EXPIRED" ? "Archive · source check overdue" : "Filed",
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
      return story.edition === "weekly" &&
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
      var otherPaper = event.target.closest("[data-open-paper]");
      if (otherPaper) {
        event.preventDefault();
        var edition = otherPaper.getAttribute("data-open-paper");
        var sourceControl = document.querySelector('.ns-publication[data-edition="' + edition + '"]');
        if (sourceControl) sourceControl.click();
        return;
      }
      if (event.target.closest("[data-open-archive]")) {
        event.preventDefault();
        var archive = document.getElementById("newsstand-catchup");
        if (archive) archive.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      var topic = event.target.closest("[data-daily-topic]");
      if (topic) {
        event.preventDefault();
        var search = document.getElementById("ns-search-input");
        if (search) {
          search.value = topic.getAttribute("data-daily-topic");
          document.getElementById("ns-search-button").click();
        }
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
        applyLatestDailyIssue();
        global.dispatchEvent(new CustomEvent("newsstand:daily-snapshots-admitted", {
          detail: {
            stories: value.issues.flatMap(function (issue) { return JSON.parse(JSON.stringify(issue.stories || [])); }),
            publication: JSON.parse(JSON.stringify(data.publications && data.publications.daily || null))
          }
        }));
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
