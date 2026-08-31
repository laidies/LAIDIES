(function installNewsstandCatchupV1(global) {
  "use strict";

  var STORAGE_KEY = "laidies_newsstand_seen_v1";
  var DAY_MS = 86400000;
  var LEGACY_DAILY_DESK_TYPES = ["paige_tip", "promptoscope", "career_life", "mme_claio", "song", "did_you_know", "town_note", "curiosity", "fiction"];
  var CURRENT_DAILY_DESK_TYPES = ["paige_tip", "career_life", "concept_week", "mme_claio", "dear_miss_jeeves", "behind_build", "around_town", "whats_new_sunnyvaile", "crossword", "song", "did_you_know", "town_note", "curiosity"];
  function dailyDeskTypesForDate(date) {
    return String(date || "") >= "2026-08-23" ? CURRENT_DAILY_DESK_TYPES : LEGACY_DAILY_DESK_TYPES;
  }
  function dailyDeskLabel(type) {
    return ({paige_tip: "Paige’s AI & Productivity Tip", career_life: "The Corner Office",
      concept_week: "Concept of the Week", mme_claio: "Mme CLAi-O", dear_miss_jeeves: "Dear Miss Jeeves",
      whats_new_sunnyvaile: "What’s New in SUNNYVAiLE", crossword: "Crossword", did_you_know: "Did You Know?",
      promptoscope: "historical Promptoscope"})[type] || String(type || "service").replace(/_/g, " ");
  }
  var HASH = /^[a-f0-9]{64}$/;
  var data = JSON.parse(JSON.stringify(global.NEWSSTAND_DATA || { publications: {}, stories: [] }));
  var sourceStories = JSON.parse(JSON.stringify(data.stories || []));
  var contract = global.NewsstandContract;
  var derivatives = null;
  var columns = null;
  var dailyIssues = null;
  var dailyIssuesLoaded = false;
  var columnsLoaded = false;
  var readingCards = null;
  var deskIllustrations = {
    dear_miss_jeeves: "jeeves-phone.png", career_life: "corner-planner.png",
    paige_tip: "paige-cassette.png", concept_week: "concept-notebook.png",
    whats_new_sunnyvaile: "town-street.png", did_you_know: "did-you-know-question-20260831.png"
  };
  var previousPublicationView = latestPublicationView(readState());
  var sharedDailyHandled = false;
  var columnReturnTarget = null;

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
    return { lastPublication: null };
  }

  function readState() {
    try {
      var value = JSON.parse(global.localStorage.getItem(STORAGE_KEY) || "null");
      if (!value || typeof value !== "object" || Array.isArray(value)) return emptyState();
      var result = emptyState();
      if (value.lastPublication && validTimestamp(value.lastPublication.viewed_at)) {
        result.lastPublication = {
          viewed_at: value.lastPublication.viewed_at
        };
      }
      var sanitized = JSON.stringify(result);
      if (global.localStorage.getItem(STORAGE_KEY) !== sanitized) {
        global.localStorage.setItem(STORAGE_KEY, sanitized);
      }
      return result;
    } catch (_) {
      try { global.localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyState())); } catch (_) {}
      return emptyState();
    }
  }

  function writeState(value) {
    try {
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      global.dispatchEvent(new CustomEvent("laidies:continuation-local-change"));
    } catch (_) {}
  }

  function markSeen(key, publicationAt) {
    if (!/^(story|daily):[A-Za-z0-9._:-]{1,140}$/.test(String(key || "")) ||
        !validTimestamp(publicationAt)) return;
    var state = readState();
    var viewedAt = new Date().toISOString();
    state.lastPublication = { viewed_at: viewedAt };
    writeState(state);
  }

  function latestPublicationView(state) {
    return state && state.lastPublication &&
      validTimestamp(state.lastPublication.viewed_at)
      ? state.lastPublication.viewed_at
      : "";
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

  function editorialToday() {
    return editorialDateOnly(new Date());
  }

  function availableThroughDate() {
    var issues = dailyIssues && Array.isArray(dailyIssues.issues) ? dailyIssues.issues : [];
    var latest = issues.filter(function (item) {
      return item && item.status === "complete" && /^\d{4}-\d{2}-\d{2}$/.test(item.editionDate || "") &&
        item.admission && validTimestamp(item.admission.reviewedAt) && Date.parse(item.admission.reviewedAt) <= Date.now();
    }).sort(function (a, b) { return b.editionDate.localeCompare(a.editionDate); })[0];
    var publicationDate = currentDailyDate();
    return latest && latest.editionDate > publicationDate ? latest.editionDate : publicationDate;
  }

  function syncCatchupAvailability() {
    var input = document.getElementById("ns-catchup-since");
    if (!input) return;
    input.max = availableThroughDate();
    if (previousPublicationView && input.getAttribute("data-user-edited") !== "true") {
      var previousDate = editorialDateOnly(previousPublicationView);
      input.value = previousDate > input.max ? input.max : previousDate;
    } else if (input.value && input.value > input.max) {
      input.value = input.max;
    }
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
    var projection = {
      schemaVersion: "daily-private-issue-v1",
      mode: "PRIVATE_DRAFT_ONLY",
      editionDate: issue.editionDate,
      editorialTimeZone: issue.editorialTimeZone,
      disposition: issue.disposition === "quiet" ? "QUIET" : issue.disposition === "service_ready" ? "SERVICE_READY" : "CANDIDATES_PENDING_REVIEW",
      status: issue.disposition === "quiet" ? "PRIVATE_QUIET_DRAFT" : "PRIVATE_REVIEW_DRAFT",
      storyIds: issue.storyIds,
      storySnapshots: issue.stories,
      desks: issue.desks,
      sourceIdentity: issue.sourceIdentity,
      canonicalWrite: false,
      deployActionTaken: false
    };
    if (Object.prototype.hasOwnProperty.call(issue, "frontPaigeStoryId")) projection.frontPaigeStoryId = issue.frontPaigeStoryId;
    if (Object.prototype.hasOwnProperty.call(issue, "weeklyStoryId")) projection.weeklyStoryId = issue.weeklyStoryId;
    return projection;
  }

  function sha256Text(value) {
    if (!global.crypto || !global.crypto.subtle || typeof TextEncoder === "undefined") return Promise.resolve("");
    return global.crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)).then(function (bytes) {
      return Array.from(new Uint8Array(bytes)).map(function (byte) { return byte.toString(16).padStart(2, "0"); }).join("");
    });
  }

  async function validDailyIssueStore(value) {
    function invalid(reason) { global.__newsstandDailyIssueValidationFailure = reason; return false; }
    if (!value || value.schemaVersion !== "daily-issues-v1" || value.owner !== "newsstand-daily" || !Array.isArray(value.issues)) return invalid("store-shape");
    var dates = new Set();
    for (var issueIndex = 0; issueIndex < value.issues.length; issueIndex += 1) {
      var issue = value.issues[issueIndex];
      if (!issue || !/^\d{4}-\d{2}-\d{2}$/.test(issue.editionDate || "") || dates.has(issue.editionDate) ||
          issue.editorialTimeZone !== "America/Vancouver" || issue.status !== "complete" ||
          ["quiet", "service_ready", "candidates_pending_review"].indexOf(issue.disposition) === -1 ||
          !Array.isArray(issue.storyIds) || !Array.isArray(issue.stories) || !Array.isArray(issue.serviceRecordIds) || !Array.isArray(issue.desks) ||
          issue.desks.length !== dailyDeskTypesForDate(issue.editionDate).length || !HASH.test(issue.envelopeSha256 || "") ||
          !issue.sourceIdentity || ![issue.sourceIdentity.radarSha256, issue.sourceIdentity.storiesSha256, issue.sourceIdentity.columnsSha256].every(function (hash) { return HASH.test(hash || ""); }) ||
          issue.sourceIdentity.radarPath !== "operations/agents/aidb-intelligence-desk/daily/" + issue.editionDate + ".md" ||
          issue.sourceIdentity.storiesPath !== "content/newsstand-stories.js" ||
          issue.sourceIdentity.columnsPath !== "content/daily-edition-columns.json" ||
          !issue.admission || ["ACCEPT_LOCAL_CANONICAL_WRITE", "ACCEPT_LOCAL_CANONICAL_SUCCESSOR"].indexOf(issue.admission.decision) === -1 ||
          (issue.admission.decision === "ACCEPT_LOCAL_CANONICAL_SUCCESSOR" && !HASH.test(issue.admission.predecessorEnvelopeSha256 || "")) ||
          !/independent/i.test(issue.admission.reviewedBy || "") || !/independent/i.test(issue.admission.reviewerRole || "") ||
          !validTimestamp(issue.admission.reviewedAt) || Date.parse(issue.admission.reviewedAt) > Date.now() + 300000 ||
          Date.parse(issue.admission.reviewedAt) < Date.parse(issue.editionDate + "T00:00:00Z")) return invalid("issue-shape:" + (issue && issue.editionDate || issueIndex));
      dates.add(issue.editionDate);
      var allowedDeskTypes = dailyDeskTypesForDate(issue.editionDate);
      var types = new Set();
      var readyIds = [];
      var desksValid = issue.desks.every(function (desk) {
        if (!desk || allowedDeskTypes.indexOf(desk.type) === -1 || types.has(desk.type)) return false;
        types.add(desk.type);
        if (desk.state === "ready") {
          if (!desk.recordId || !desk.headline || !desk.summary || !(desk.destination === null || typeof desk.destination === "string")) return false;
          readyIds.push(desk.recordId);
          return true;
        }
        return desk.state === "empty" && desk.recordId === null && Boolean(desk.emptyState);
      });
      if (!desksValid || new Set(readyIds).size !== readyIds.length ||
          readyIds.join("\n") !== issue.serviceRecordIds.join("\n")) return invalid("desk-binding:" + issue.editionDate);
      if (issue.stories.map(function (story) { return story && story.id; }).join("\n") !== issue.storyIds.join("\n")) return invalid("story-binding:" + issue.editionDate);
      if (issue.stories.some(function (snapshot) {
        return !snapshot || typeof snapshot.id !== "string" || snapshot.edition !== "daily" ||
          dateOnly(snapshot.publishedAt) !== issue.editionDate ||
          ["published", "corrected"].indexOf(snapshot.status) === -1;
      })) return invalid("story-snapshot:" + issue.editionDate);
      if (issue.disposition === "quiet" && (issue.storyIds.length || readyIds.length)) return invalid("quiet-has-content:" + issue.editionDate);
      if (issue.disposition === "candidates_pending_review" && !issue.storyIds.length && !readyIds.length) return invalid("candidate-empty:" + issue.editionDate);
      var computedEnvelopeHash = await sha256Text(canonicalJson(issueEnvelopeProjection(issue)) + "\n");
      if (!computedEnvelopeHash || computedEnvelopeHash !== issue.envelopeSha256) return invalid("envelope-hash:" + issue.editionDate + ":" + computedEnvelopeHash);
    }
    return true;
  }

  function applyLatestDailyIssue() {
    // Snapshot history cannot promote itself. Schema-2 is the sole current
    // publication authority; the release transaction sets its dated pointers.
    syncCatchupAvailability();
  }

  function publicationStatusCopy(state, publication) {
    if (state === "current") return "Published " + formatDate(publication.editionDate || publication.publishedAt);
    if (state === "archive") return "From the archive · " + formatDate(publication.editionDate || publication.publishedAt);
    if (state === "quiet") return "No update";
    if (state === "hold") return "Not published";
    if (state === "stale") return "From the archive · " + formatDate(publication.editionDate || publication.publishedAt);
    return "Unavailable";
  }

  function compactPublicationStatusCopy(state, publication) {
    var date = formatCompactDate(publication.editionDate || publication.publishedAt || publication.lastCheckedAt);
    if (state === "current") return "Current · " + date;
    if (state === "archive") return "Archive · " + date;
    if (state === "quiet") return "No update";
    if (state === "hold") return "Not published";
    if (state === "stale") return "Archive · " + date;
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
    var frontId = daily.issue && daily.issue.frontPaigeStoryId;
    var front = frontId && sourceStories.find(function (story) { return story.id === frontId; });
    var readableFront = front && contract.accessDecision(data, front, { edition: "daily", scope: "feature" }, now).canExpose;
    Array.prototype.forEach.call(statuses, function (status) {
      var frontId = daily.issue && daily.issue.frontPaigeStoryId;
      var front = frontId && sourceStories.find(function (story) { return story.id === frontId; });
      status.textContent = status.closest(".ns-paper-index")
        ? compactPublicationStatusCopy(dailyState, daily)
        : status.closest(".ns-front-desk--lead") && front && contract.accessDecision(data, front, { edition: "daily", scope: "feature" }, now).canExpose
        ? "Published " + formatDate(front.publishedAt)
        : publicationStatusCopy(dailyState, daily);
      status.setAttribute("data-state", dailyState);
    });
    if (action) {
      action.textContent = readableFront ? "Read the full article →" :
        dailyState === "current" ? "Read the story →" :
        dailyState === "archive" ? "Browse the archive below" :
        dailyState === "quiet" ? "No issue today" :
        dailyState === "hold" ? "Check this paper · Not published" :
        dailyState === "stale" && latestStoredDailyIssue() ? "Browse archive · " + formatCompactDate(latestStoredDailyIssue().editionDate) :
        dailyState === "stale" ? "Browse the archive below" :
        "Check this paper · Unavailable";
    }
    if (indexAction) {
      indexAction.textContent = dailyState === "current" ? "Open issue" :
        dailyState === "archive" ? "Open latest" :
        dailyState === "quiet" ? "No issue today" :
        dailyState === "hold" ? "Not published" :
        dailyState === "stale" ? "Archive" :
        "Unavailable";
    }

    var labels = { breaking: "The Breaking", daily: "The Daily", weekly: "The Weekly", "big-picture": "The Big Picture" };
    var order = ["breaking", "daily", "weekly", "big-picture"];
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
      title.textContent = new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(current.map(function (edition) { return labels[edition]; })) +
        (current.length === 1 ? " is current." : " are current.");
      detail.textContent = "Published " + formatDate(data.lastCheckedAt) + ".";
      system.textContent = current.length + (current.length === 1 ? " current publication." : " current publications.");
    } else {
      title.textContent = "A clear day at the NewsStand.";
      detail.textContent = "There is no new edition today. Browse earlier editions in the archive.";
      system.textContent = "No current publication.";
    }
    if (current.length === 1) {
      primary.textContent = current[0] === "daily" ? "Open today’s paper" : "Open " + labels[current[0]].replace(/^The /, "the ");
      primary.setAttribute("data-pull", current[0]);
    } else {
      primary.textContent = "Choose a paper";
      primary.removeAttribute("data-pull");
    }
  }

  function refreshDailyBackIssueAction() {
    var issue = latestStoredDailyIssue();
    var publication = data.publications && data.publications.daily;
    var action = document.querySelector('.ns-publication[data-edition="daily"] .ns-publication__action');
    if (!issue || !publication || !action) return;
    var frontId = publication.issue && publication.issue.frontPaigeStoryId;
    var front = frontId && sourceStories.find(function (story) { return story.id === frontId; });
    if (front && contract.accessDecision(data, front, { edition: "daily", scope: "feature" }, new Date().toISOString()).canExpose) {
      action.textContent = "Read the full article →";
      return;
    }
    var state = contract.effectivePublicationState(publication, new Date().toISOString());
    if (["stale", "quiet", "archive"].indexOf(state) !== -1) {
      action.textContent = "Browse the archive below";
    }
  }

  function maybeOpenSharedDailyRequest() {
    if (!dailyIssuesLoaded || !columnsLoaded) return;
    var columnId = new URL(global.location.href).searchParams.get("column");
    if (columnId) {
      if (sharedDailyHandled) return;
      sharedDailyHandled = true;
      renderColumn(columnId);
      return;
    }
    openSharedDailyRequest();
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

  function columnById(id) {
    return eligibleColumns().find(function (record) { return record.id === id; });
  }

  function readableColumn(id) {
    var record = columnById(id);
    if (!record || !Array.isArray(record.body) || !record.body.length ||
        record.body.some(function (part) { return typeof part !== "string" || !part.trim(); }) ||
        record.freshness.expiresAt < editorialToday() ||
        (record.availableUntil && record.availableUntil < editorialToday())) return null;
    var issue = storedDailyIssue(record.editionDate);
    return issue && issue.desks.some(function (desk) {
      return desk.recordId === id && desk.state === "ready" && desk.type === record.type;
    }) ? record : null;
  }

  function columnHref(id) {
    var url = new URL(global.location.href);
    url.hash = "";
    url.searchParams.delete("daily");
    url.searchParams.set("column", id);
    return url.pathname + url.search;
  }

  function serviceLink(route) {
    if (typeof route !== "string" || /[\\\u0000-\u0020]/.test(route)) return "";
    if (/^\/(?!\/)/.test(route) || /^#[A-Za-z0-9]/.test(route) || /^https:\/\//.test(route)) return route;
    return "";
  }

  function columnBodyHTML(record) {
    var question = record.question;
    var links = (record.sourceLinks || []).filter(function (link) { return link && serviceLink(link.url); });
    var destination = serviceLink(record.destination);
    if (destination && !links.some(function (link) {
      return new URL(link.url, "https://laidies.ai/").href === new URL(destination, "https://laidies.ai/").href;
    })) links.unshift({label: record.destinationLabel || "Explore this on LAiDIES", url: destination});
    return '<article class="ns-service-article" data-column-id="' + escapeHTML(record.id) + '">' +
      (question ? '<blockquote class="ns-service-question"><p>' + escapeHTML(question.text) +
        '</p><footer>— ' + escapeHTML(question.signature) + '</footer></blockquote>' : '') +
      (record.type === "mme_claio" && record.body.indexOf(record.summary) === -1 ? '<p>' + escapeHTML(record.summary) + '</p>' : '') +
      record.body.map(function (paragraph) { return '<p>' + escapeHTML(paragraph) + '</p>'; }).join("") +
      (links.length ? '<footer class="ns-service-sources"><h3>Keep reading</h3><ul>' + links.map(function (link) {
        return '<li><a href="' + escapeHTML(link.url) + '">' + escapeHTML(link.label) + '</a></li>';
      }).join("") + '</ul></footer>' : '') + '</article>';
  }

  function renderColumn(id) {
    var reader = document.getElementById("paper-counter");
    var rack = document.getElementById("ns-rack");
    if (!reader || !rack) return false;
    var record = readableColumn(id);
    reader.hidden = false;
    rack.innerHTML = record ? columnBodyHTML(record) :
      '<article class="ns-service-article"><p>This column is not available. You can return to the paper for the current columns.</p></article>';
    document.getElementById("ns-empty").hidden = true;
    document.getElementById("ns-reader-edition").textContent = record ? dailyDeskLabel(record.type) : "NewsStand";
    document.getElementById("ns-reader-title").textContent = record ? record.headline : "Column unavailable";
    document.getElementById("ns-reader-date").textContent = record ? formatDate(record.editionDate) : "";
    document.getElementById("ns-paper-view").setAttribute("data-paper", "service");
    reader.scrollIntoView({behavior: "smooth", block: "start"});
    document.getElementById("ns-reader-title").focus({preventScroll: true});
    return Boolean(record);
  }

  function columnEmpty(type, fallback) {
    return columns && columns.emptyStates && columns.emptyStates[type] || fallback;
  }

  function currentCanonicalStory(snapshot) {
    if (!snapshot || !snapshot.id) return snapshot;
    var canonical = sourceStories.find(function (story) { return story.id === snapshot.id; });
    return canonical ? JSON.parse(JSON.stringify(canonical)) : JSON.parse(JSON.stringify(snapshot));
  }

  function currentDailyStories(date, issue) {
    if (issue && Array.isArray(issue.stories)) return issue.stories.map(currentCanonicalStory);
    var publication = data.publications && data.publications.daily;
    var issueIds = publication && publication.issue && Array.isArray(publication.issue.storyIds)
      ? publication.issue.storyIds
      : [];
    return issueIds.map(function (id) {
      return sourceStories.find(function (story) {
        return story.id === id && dateOnly(story.publishedAt) === date;
      });
    }).filter(Boolean).map(function (story) {
      return JSON.parse(JSON.stringify(story));
    });
  }

  function canRenderDaily() {
    if (!contract || !data || data.datasetStatus !== "published" || !data.publications || !data.publications.daily) return false;
    var dataset = contract.datasetState(data, new Date().toISOString());
    var state = contract.effectivePublicationState(data.publications.daily, new Date().toISOString());
    return dataset.state === "ready" && state === "current";
  }

  function storedDailyIssue(date) {
    return dailyIssues && Array.isArray(dailyIssues.issues)
      ? dailyIssues.issues.find(function (issue) { return issue.editionDate === date && issue.status === "complete"; })
      : null;
  }

  function latestStoredDailyIssue() {
    return dailyIssues && Array.isArray(dailyIssues.issues)
      ? dailyIssues.issues.filter(function (issue) { return issue && issue.status === "complete"; })
        .sort(function (a, b) { return b.editionDate.localeCompare(a.editionDate); })[0] || null
      : null;
  }

  function dailyDeskValue(issue, date, type) {
    if (issue) {
      var desk = issue.desks.find(function (item) { return item.type === type; }) || null;
      if (!desk || desk.state !== "ready") return desk;
      var admittedColumn = columnById(desk.recordId);
        return admittedColumn && admittedColumn.id === desk.recordId ? desk : null;
    }
    return columnFor(date, type) || null;
  }

  function renderFrontDesks() {
    var section = document.querySelector(".ns-feature-desk");
    if (!section) return;
    section.hidden = true;
    if (!dailyIssuesLoaded || !columnsLoaded || !dailyIssues || !columns || global.NEWSSTAND_LOCAL_PREVIEW) return;
    // Keep the latest admitted service desks on the counter until a newer
    // complete edition replaces them. Their dated issue remains the authority;
    // an empty calendar day must not erase the newest published NewsStand.
    var issue = storedDailyIssue(editorialToday()) || latestStoredDailyIssue();
    var labels = {
      paige_tip: "Paige’s AI & Productivity Tip",
      career_life: "The Corner Office",
      concept_week: "Concept of the Week",
      mme_claio: "Mme CLAi-O",
      dear_miss_jeeves: "Dear Miss Jeeves",
      behind_build: "Behind the Build",
      around_town: "Around Town · fictional",
      whats_new_sunnyvaile: "What’s New in SUNNYVAiLE",
      crossword: "Crossword",
      did_you_know: "Did You Know?"
    };
    var admittedCount = 0;
    Object.keys(labels).forEach(function (type) {
      var node = document.querySelector('[data-desk="' + type + '"]');
      if (!node) return;
      var desk = issue && issue.desks.find(function (item) { return item.type === type; });
      var admittedColumn = issue && desk && columnById(desk.recordId);
      var ready = desk && desk.state === "ready" && admittedColumn && admittedColumn.id === desk.recordId;
      node.setAttribute("data-desk-state", ready ? "ready" : "empty");
      var label = '<small>' + escapeHTML(labels[type]) + '</small>';
      if (ready) {
        admittedCount += 1;
        var illustrationPath = deskIllustrations[type] ? '/assets/newsstand/design-20260830/' + deskIllustrations[type] : '';
        var illustration = illustrationPath ? '<img class="ns-desk-image" src="' + illustrationPath + '" alt="" loading="lazy" width="1448" height="1086">' : '';
        if (type === "mme_claio" && readingCards) {
          var card = readingCards.find(function (item) { return item.id === admittedColumn.sourceId; });
          if (card) {
            var art = card.id === "mini-backpack" ? "/assets/newsstand/design-20260830/mini-backpack-v4.png" : "/assets/mme-claio/reading-cards/" + encodeURIComponent(card.art_slug) + ".webp";
            node.innerHTML = '<article class="ns-reading-card"><img src="' + art + '" alt="' + escapeHTML(card.card) + ' reading card" loading="lazy"><div>' + label + '<p class="ns-reading-label">Reading of the Week</p><h3>' + escapeHTML(card.card) + '</h3><p>' + escapeHTML(card.read) + '</p><p>' + escapeHTML(card.message) + '</p><p>' + escapeHTML(card.move) + '</p></div></article>';
            return;
          }
        }
        var content = illustration + label + '<strong>' + escapeHTML(desk.headline) + '</strong><span>' + escapeHTML(desk.summary) + '</span>';
        if (type === "crossword" && serviceLink(desk.destination)) {
          node.innerHTML = '<a href="' + escapeHTML(desk.destination) + '">' + content + '<span class="ns-service-action">Play the crossword →</span></a>';
          return;
        }
        if (readableColumn(desk.recordId)) {
          node.innerHTML = '<a data-open-column="' + escapeHTML(desk.recordId) + '" href="' +
            escapeHTML(columnHref(desk.recordId)) + '">' + content + '<span class="ns-service-action">Read the full column →</span></a>';
          return;
        }
        node.innerHTML = desk.destination
          ? '<a href="' + escapeHTML(desk.destination) + '">' + content + '</a>'
          : content;
        return;
      }
      node.innerHTML = label + '<strong>Not published today</strong><span>' +
        escapeHTML(desk && desk.emptyState || columnEmpty(type, "No item is available in this desk today.")) + '</span>';
    });
    section.hidden = admittedCount === 0;
  }

  function updateDailyPaper() {
    if (global.NEWSSTAND_LOCAL_PREVIEW) return;
    if (!canRenderDaily()) return;
    var date = currentDailyDate();
    var issue = storedDailyIssue(date);
    var today = issue ? issue.desks.filter(function (desk) {
      var admittedColumn = columnById(desk.recordId);
      return desk.state === "ready" && admittedColumn && admittedColumn.id === desk.recordId;
    }) :
      eligibleColumns().filter(function (record) { return record.editionDate === date; });
    var stories = currentDailyStories(date, issue);
    var tip = dailyDeskValue(issue, date, "paige_tip");
    var node = document.querySelector('[data-contents-for="daily"]');
    if (!node) return;
    var lead = node.closest(".ns-front-desk--lead");
    var promise = lead && lead.querySelector(".ns-front-paige-promise");
    if (promise) promise.hidden = true;
    node.setAttribute("data-story-count", String(stories.length));
    node.setAttribute("data-service-count", String(today.length));
    var persistentFrontId = data.publications.daily.issue && data.publications.daily.issue.frontPaigeStoryId;
    var persistentFront = persistentFrontId && sourceStories.find(function (story) { return story.id === persistentFrontId; });
    if (persistentFront && contract.accessDecision(data, persistentFront, { edition: "daily", scope: "feature" }, new Date().toISOString()).canExpose) return;
    if (stories.length) {
      node.innerHTML = [
        '<span class="ns-publication__count">Feature story</span>',
        '<span class="ns-publication__headline">', escapeHTML(stories[0].headline), '</span>',
        '<span class="ns-publication__teaser">', escapeHTML(sentence(stories[0].laidies_read || stories[0].the_story)), '</span>'
      ].join("");
      return;
    }
    node.innerHTML = [
      '<span class="ns-publication__count">The Daily · ', escapeHTML(formatDate(date)), '</span>',
      '<span class="ns-publication__headline">', escapeHTML(tip && tip.state !== "empty" ? tip.headline : "No new Daily today"), '</span>',
      '<span class="ns-publication__teaser">', escapeHTML(tip && tip.state !== "empty" ? sentence(tip.body || tip.summary) :
        "No new story or column was published for " + formatDate(date) + "."), '</span>'
    ].join("");
  }

  function dailyDesk(label, status, headline, body, route, desk) {
    var record = desk && desk.type !== "crossword" && readableColumn(desk.recordId || desk.id);
    return [
      '<section class="ns-daily-desk" data-desk-state="', escapeHTML(status), '">',
        '<p class="ns-daily-desk__label">', escapeHTML(label), '</p>',
        '<p class="ns-daily-desk__state">', escapeHTML(status === "ready" ? "In this edition" : "No item today"), '</p>',
        '<h3>', escapeHTML(headline), '</h3>',
        '<p>', escapeHTML(body), '</p>',
        record ? '<a data-open-column="' + escapeHTML(record.id) + '" href="' + escapeHTML(columnHref(record.id)) + '">Read the full column →</a>' :
          (route ? '<a href="' + escapeHTML(route) + '">' + (desk && desk.type === "crossword" ? 'Play the crossword →' : 'Go deeper →') + '</a>' : ''),
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
    var currentDeskEra = String(date || "") >= "2026-08-23";
    var tip = dailyDeskValue(canonicalIssue, date, "paige_tip");
    var concept = dailyDeskValue(canonicalIssue, date, "concept_week");
    var historicalPromptoscope = dailyDeskValue(canonicalIssue, date, "promptoscope");
    var career = dailyDeskValue(canonicalIssue, date, "career_life");
    var reading = dailyDeskValue(canonicalIssue, date, "mme_claio");
    var dearMissJeeves = dailyDeskValue(canonicalIssue, date, "dear_miss_jeeves");
    var behindBuild = dailyDeskValue(canonicalIssue, date, "behind_build");
    var aroundTown = dailyDeskValue(canonicalIssue, date, "around_town");
    var whatsNew = dailyDeskValue(canonicalIssue, date, "whats_new_sunnyvaile");
    var legacyFiction = dailyDeskValue(canonicalIssue, date, "fiction");
    var crossword = dailyDeskValue(canonicalIssue, date, "crossword");
    var song = dailyDeskValue(canonicalIssue, date, "song");
    var fact = dailyDeskValue(canonicalIssue, date, "did_you_know");
    var townNote = dailyDeskValue(canonicalIssue, date, "town_note");
    var curiosity = dailyDeskValue(canonicalIssue, date, "curiosity");
    var hasAdmittedServiceColumns = [tip, concept, historicalPromptoscope, career, reading,
      dearMissJeeves, behindBuild, aroundTown, whatsNew, legacyFiction, crossword, song,
      fact, townNote, curiosity].some(function (desk) { return desk && desk.state !== "empty"; });
    var dailyStories = currentDailyStories(date, canonicalIssue);
    var lead = dailyStories[0];
    var html = [
      '<article class="ns-daily-issue" data-daily-date="', escapeHTML(date), '">',
        '<header class="ns-daily-issue__head">',
          '<p>The Daily · ', escapeHTML(formatDate(date)), '</p>',
          '<h2>The SUNNYVA<span class="ns-brand-i">i</span>LE Daily.</h2>',
          '<p>News, practical help and life around town for ', escapeHTML(formatDate(date)), '.</p>',
        '</header>',
        '<section class="ns-daily-news">',
          '<p class="ns-daily-desk__label">Today&rsquo;s lead story</p>',
          '<h3>', escapeHTML(lead ? lead.headline : quietIssue ? "No new lead story today." : "No lead story is available yet."), '</h3>',
          '<p>', escapeHTML(lead ? sentence(lead.the_story) : quietIssue ?
            "There was no new lead story for this edition." :
            "No lead story was published in this edition."), '</p>',
          lead ? '<a href="#' + escapeHTML(lead.slug) + '">Read the full report →</a>' : '',
        '</section>',
        quietIssue
          ? '<details class="ns-daily-quiet-desks"><summary>See today&rsquo;s columns.</summary><div class="ns-daily-service-grid">'
          : '<div class="ns-daily-service-grid">',
          dailyDesk("Paige’s AI & Productivity Tip", tip && tip.state !== "empty" ? "ready" : "empty",
            tip && tip.state !== "empty" ? tip.headline : "No practical tip today.", tip && tip.state !== "empty" ? tip.summary : "Paige did not publish a practical tip in this edition.",
            tip && tip.state !== "empty" ? tip.destination : "", tip),
          historicalPromptoscope ? dailyDesk("Promptoscope · archived column", historicalPromptoscope.state !== "empty" ? "ready" : "empty",
            historicalPromptoscope.state !== "empty" ? historicalPromptoscope.headline : "No Promptoscope in this edition.",
            historicalPromptoscope.state !== "empty" ? historicalPromptoscope.summary : "This archived edition did not include a Promptoscope.",
            historicalPromptoscope.state !== "empty" ? historicalPromptoscope.destination : "") :
          dailyDesk("Concept of the Week", concept && concept.state !== "empty" ? "ready" : "empty",
            concept && concept.state !== "empty" ? concept.headline : "No Concept of the Week.",
            concept && concept.state !== "empty" ? concept.summary : "This edition did not include a Concept of the Week.",
            concept && concept.state !== "empty" ? concept.destination : "", concept),
          dailyDesk("The Corner Office", career && career.state !== "empty" ? "ready" : "empty", career && career.state !== "empty" ? career.headline : "No Corner Office column today.",
            career && career.state !== "empty" ? career.summary : "This edition did not include a Work + Life column.", career && career.state !== "empty" ? career.destination : "", career),
          dailyDesk("Mme CLAi-O’s reading", reading && reading.state !== "empty" ? "ready" : "empty", reading && reading.state !== "empty" ? reading.headline : "No daily reading today.",
            reading && reading.state !== "empty" ? reading.summary : "Mme CLAi-O did not publish a reading in this edition.", reading && reading.state !== "empty" ? reading.destination : "", reading),
          currentDeskEra ? dailyDesk("Dear Miss Jeeves", dearMissJeeves && dearMissJeeves.state !== "empty" ? "ready" : "empty", dearMissJeeves && dearMissJeeves.state !== "empty" ? dearMissJeeves.headline : "No letter at the advice desk today.",
            dearMissJeeves && dearMissJeeves.state !== "empty" ? dearMissJeeves.summary : "This edition did not include a Dear Miss Jeeves question.", dearMissJeeves && dearMissJeeves.state !== "empty" ? dearMissJeeves.destination : "", dearMissJeeves) : "",
          currentDeskEra ? dailyDesk("Behind the Build", behindBuild && behindBuild.state !== "empty" ? "ready" : "empty", behindBuild && behindBuild.state !== "empty" ? behindBuild.headline : "No Behind the Build today.",
            behindBuild && behindBuild.state !== "empty" ? behindBuild.summary : "This edition did not include a Behind the Build column.", behindBuild && behindBuild.state !== "empty" ? behindBuild.destination : "") : "",
          currentDeskEra ? dailyDesk("Around Town · fictional town news", aroundTown && aroundTown.state !== "empty" ? "ready" : "empty", aroundTown && aroundTown.state !== "empty" ? aroundTown.headline : "No Around Town story today.",
            aroundTown && aroundTown.state !== "empty" ? aroundTown.summary : "This edition did not include a fictional Around Town story.", aroundTown && aroundTown.state !== "empty" ? aroundTown.destination : "") : "",
          currentDeskEra ? dailyDesk("What’s New in SUNNYVAiLE", whatsNew && whatsNew.state !== "empty" ? "ready" : "empty", whatsNew && whatsNew.state !== "empty" ? whatsNew.headline : "No new opening today.",
            whatsNew && whatsNew.state !== "empty" ? whatsNew.summary : "This edition did not include a verified new destination.", whatsNew && whatsNew.state !== "empty" ? whatsNew.destination : "", whatsNew) : "",
          currentDeskEra ? dailyDesk("Daily crossword", crossword && crossword.state !== "empty" ? "ready" : "empty", crossword && crossword.state !== "empty" ? crossword.headline : "No crossword today.",
            crossword && crossword.state !== "empty" ? crossword.summary : "This edition did not include a crossword.", crossword && crossword.state !== "empty" ? crossword.destination : "", crossword) : "",
          dailyDesk("Song of the Day", song && song.state !== "empty" ? "ready" : "empty", song && song.state !== "empty" ? song.headline : "No Song of the Day.",
            song && song.state !== "empty" ? song.summary : "This edition did not include a Song of the Day.", song && song.state !== "empty" ? song.destination : ""),
          dailyDesk("Did you know?", fact && fact.state !== "empty" ? "ready" : "empty", fact && fact.state !== "empty" ? fact.headline : "No Did You Know today.",
            fact && fact.state !== "empty" ? fact.summary : "This edition did not include a Did You Know item.", fact && fact.state !== "empty" ? fact.destination : "", fact),
          dailyDesk("Town notes", townNote && townNote.state !== "empty" ? "ready" : "empty", townNote && townNote.state !== "empty" ? townNote.headline : "No town notes today.",
            townNote && townNote.state !== "empty" ? townNote.summary : "There were no town notes in this edition.", townNote && townNote.state !== "empty" ? townNote.destination : ""),
          dailyDesk("Try this today", curiosity && curiosity.state !== "empty" ? "ready" : "empty", curiosity && curiosity.state !== "empty" ? curiosity.headline : "No activity today.",
            curiosity && curiosity.state !== "empty" ? curiosity.summary : "This edition did not include a Try This Today activity.", curiosity && curiosity.state !== "empty" ? curiosity.destination : ""),
          currentDeskEra ? "" : dailyDesk("SUNNYVAiLE desk · archived fictional column", legacyFiction && legacyFiction.state !== "empty" ? "ready" : "empty", legacyFiction && legacyFiction.state !== "empty" ? legacyFiction.headline : "No fictional town story.",
            legacyFiction && legacyFiction.state !== "empty" ? legacyFiction.summary : "This archived edition did not include a fictional town story.", legacyFiction && legacyFiction.state !== "empty" ? legacyFiction.destination : ""),
        quietIssue ? '</div></details>' : '</div>',
        '<footer class="ns-daily-issue__foot">',
          '<button type="button" id="ns-share-daily">Share this Daily</button>',
          '<span id="ns-share-daily-status" role="status"></span>',
        '</footer>',
      '</article>'
    ].join("");
    reader.hidden = false;
    rack.innerHTML = html;
    var serviceGrid = rack.querySelector(".ns-daily-service-grid");
    if (serviceGrid && !hasAdmittedServiceColumns) serviceGrid.hidden = true;
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
    var dailyPublicationAt = canonicalIssue && canonicalIssue.admission && canonicalIssue.admission.reviewedAt ||
      data.publications && data.publications.daily && data.publications.daily.publishedAt ||
      date + "T12:00:00Z";
    markSeen("daily:" + date, dailyPublicationAt);
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
    if (!contract || !data || !data.publications) return [];
    var admittedDailyStories = (dailyIssues && dailyIssues.issues || []).flatMap(function (issue) {
      return (issue.stories || []).map(currentCanonicalStory);
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
          headline: story.headline,
          state: "From the archive",
          points: ["Preserved with its original publication and source dates."],
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
        canOpen: Boolean(decision.canExpose),
        actionLabel: "Read the full story"
      };
    });
    var canonicalServiceItems = (dailyIssues && dailyIssues.issues || []).filter(function (issue) {
      return issue.editionDate >= since && issue.editionDate !== dailyDate;
    }).flatMap(function (issue) {
      return issue.desks.filter(function (desk) {
        var admittedColumn = columnById(desk.recordId);
        return desk.state === "ready" && admittedColumn && admittedColumn.id === desk.recordId;
      }).map(function (desk) {
        return {
          key: "service:" + desk.recordId,
          date: issue.editionDate,
          kind: "The Daily · " + dailyDeskLabel(desk.type),
          headline: desk.headline,
          state: "Published",
          points: [desk.summary],
          route: readableColumn(desk.recordId) && desk.type !== "crossword" ? columnHref(desk.recordId) : serviceLink(desk.destination),
          canOpen: Boolean(readableColumn(desk.recordId) || serviceLink(desk.destination)),
          actionLabel: desk.type === "crossword" ? "Play the crossword" : readableColumn(desk.recordId) ? "Read the full column" : "Go deeper"
        };
      });
    });
    var legacyColumns = eligibleColumns().filter(function (record) {
      return record.editionDate >= since && record.editionDate !== dailyDate && !storedDailyIssue(record.editionDate);
    }).map(function (record) {
      return {
        key: "service:" + record.id,
        date: record.editionDate,
        kind: "The Daily · " + dailyDeskLabel(record.type),
        headline: record.headline,
        state: "Published",
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
        kind: record.type === "paige_tip" ? "The Daily · Paige’s tip" : "The Daily · historical Promptoscope",
        headline: record.headline,
        state: "Published",
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
    var items = catchupItems(since);
    var latestBackIssue = latestStoredDailyIssue();
    var dailyDate = canRenderDaily() ? currentDailyDate() : latestBackIssue && latestBackIssue.editionDate;
    var daily = dailyDate ? [
      '<article class="ns-catchup-lead" data-catchup-role="daily">',
        '<p class="ns-catchup-item__kind">Start here · ', canRenderDaily() ? 'The Daily' : 'Latest archive edition', '</p>',
        '<h3>', canRenderDaily() ? 'Today\'s' : 'Most recent', ' SUNNYVA<span class="ns-brand-i">i</span>LE Daily.</h3>',
        '<p>Stories and columns published for ', escapeHTML(formatDate(dailyDate)), '. ', canRenderDaily() ? '' : 'This edition is from the archive.', '</p>',
        '<button type="button" data-open-daily data-daily-date="', escapeHTML(dailyDate), '">Open the Daily</button>',
      '</article>'
    ].join("") : "";
    var weeklyPublication = data.publications && data.publications.weekly;
    var weeklyState = contract.effectivePublicationState(weeklyPublication, now);
    var weeklyStory = sourceStories.filter(function (story) {
      return story.edition === "weekly" && weeklyState === "current" && story.id === weeklyPublication.storyId &&
        contract.accessDecision(data, story, { scope: "search" }, now).canExpose;
    }).sort(function (a, b) { return String(b.publishedAt).localeCompare(String(a.publishedAt)); })[0];
    var weekly = weeklyStory ? [
      '<article class="ns-catchup-lead" data-catchup-role="weekly">',
        '<p class="ns-catchup-item__kind">Next · The Weekly</p>',
        '<h3>', escapeHTML(weeklyStory.headline), '</h3>',
        '<p class="ns-catchup-item__kind">Published ', escapeHTML(dateOnly(weeklyStory.publishedAt)), '</p>',
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
      (items.length === 1 ? " older result" : " older results") + " since " + escapeHTML(formatDate(since)) +
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
      }).join("") + "</div>" : '<div class="ns-catchup__timeline" data-catchup-role="history"><p class="ns-catchup__empty">No other stories or columns were published after ' +
        escapeHTML(formatDate(since)) + '.</p></div>';
    target.innerHTML = daily + weekly + history;
  }

  function initialize() {
    var input = document.getElementById("ns-catchup-since");
    var run = document.getElementById("ns-catchup-run");
    if (!input || !run) return;
    var fallback = new Date(Date.now() - 7 * DAY_MS);
    syncCatchupAvailability();
    input.value = editorialDateOnly(previousPublicationView || fallback);
    syncCatchupAvailability();
    input.addEventListener("input", function () { input.setAttribute("data-user-edited", "true"); });
    input.addEventListener("change", function () { input.setAttribute("data-user-edited", "true"); });
    run.addEventListener("click", renderCatchup);
    document.addEventListener("click", function (event) {
      var columnLink = event.target.closest("[data-open-column]");
      if (columnLink && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) {
        event.preventDefault();
        event.stopImmediatePropagation();
        columnReturnTarget = columnLink;
        renderColumn(columnLink.getAttribute("data-open-column"));
        return;
      }
      var dailyReturn = event.target.closest("#ns-return");
      if (dailyReturn && document.getElementById("ns-paper-view").getAttribute("data-paper") === "service") {
        event.preventDefault();
        event.stopImmediatePropagation();
        document.getElementById("paper-counter").hidden = true;
        document.getElementById("ns-rack").innerHTML = "";
        var returnTarget = columnReturnTarget && columnReturnTarget.isConnected ? columnReturnTarget :
          document.querySelector('.ns-publication[data-edition="daily"]');
        var columnURL = new URL(global.location.href);
        columnURL.searchParams.delete("column");
        global.history.replaceState(null, "", columnURL.href);
        if (returnTarget) {
          returnTarget.scrollIntoView({behavior: "smooth", block: "center"});
          returnTarget.focus({preventScroll: true});
        }
        columnReturnTarget = null;
        return;
      }
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
      if (daily && daily.classList.contains("ns-front-desk--lead") &&
        (daily.getAttribute("data-lead-slug") || daily.getAttribute("data-archive-slug"))) {
        return;
      }
      var latestBackIssue = latestStoredDailyIssue();
      if (daily && (canRenderDaily() || latestBackIssue)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        renderDaily(canRenderDaily() ? undefined : latestBackIssue.editionDate);
        return;
      }
      if (event.target.closest("[data-open-daily]") && canRenderDaily()) {
        event.preventDefault();
        renderDaily(event.target.closest("[data-open-daily]").getAttribute("data-daily-date") || undefined);
        return;
      }
      if (event.target.closest("[data-open-daily]") && latestStoredDailyIssue()) {
        event.preventDefault();
        renderDaily(event.target.closest("[data-open-daily]").getAttribute("data-daily-date") || latestStoredDailyIssue().editionDate);
        return;
      }
    }, true);
    document.addEventListener("click", function (event) {
      if (!event.target.closest("#ns-share-daily")) return;
      var url = new URL(global.location.href);
      url.hash = "";
      url.searchParams.set("daily", currentDailyDate());
      var status = document.getElementById("ns-share-daily-status");
      var payload = { title: "The Daily · LAiDIES", text: "The latest SUNNYVAiLE Daily", url: url.href };
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
    var townDate = document.getElementById("ns-town-date");
    if (townDate) {
      townDate.textContent = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Vancouver", weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(new Date());
      townDate.dateTime = editorialToday();
    }
    fetch("/content/data/mme-claio-deck.json", { credentials: "same-origin" })
      .then(function (response) { if (!response.ok) throw new Error("reading-deck-unavailable"); return response.json(); })
      .then(function (deck) { readingCards = Array.isArray(deck.cards) ? deck.cards : null; renderFrontDesks(); })
      .catch(function () { readingCards = null; });
    fetch("/content/daily-learning-derivatives.json", { credentials: "same-origin" })
      .then(function (response) { if (!response.ok) throw new Error("daily-derivatives-unavailable"); return response.json(); })
      .then(function (value) { derivatives = value; })
      .catch(function () { derivatives = null; renderCatchup(); });
    fetch("/content/newsstand-daily-issues.json", { credentials: "same-origin" })
      .then(function (response) { if (!response.ok) throw new Error("daily-issues-unavailable"); return response.json(); })
      .then(async function (value) {
        if (!await validDailyIssueStore(value)) throw new Error("daily-issues-invalid");
        var canonicalDate = currentDailyDate();
        value.issues = value.issues.filter(function (issue) { return issue.editionDate <= canonicalDate; });
        var currentIssue = value.issues.find(function (issue) { return issue.editionDate === canonicalDate; });
        var canonicalIssue = data.publications && data.publications.daily && data.publications.daily.issue;
        if (currentIssue && canonicalIssue &&
            (currentIssue.storyIds.join("\n") !== (canonicalIssue.storyIds || []).join("\n") ||
             currentIssue.serviceRecordIds.join("\n") !== (canonicalIssue.serviceRecordIds || []).join("\n") ||
             (currentIssue.frontPaigeStoryId || null) !== (canonicalIssue.frontPaigeStoryId || null) ||
             (currentIssue.weeklyStoryId || null) !== (canonicalIssue.weeklyStoryId || null))) {
          throw new Error("daily-snapshot-canonical-mismatch");
        }
        dailyIssues = value;
        global.dispatchEvent(new CustomEvent("newsstand:daily-snapshots-admitted", {
          detail: { stories: value.issues.flatMap(function (issue) { return JSON.parse(JSON.stringify(issue.stories || [])); }) }
        }));
        applyLatestDailyIssue();
        syncCatchupAvailability();
        refreshPublicationChrome();
        refreshDailyBackIssueAction();
        updateDailyPaper();
        renderCatchup();
      })
      .catch(function (error) { global.__newsstandDailyIssueError = String(error && error.message || error); dailyIssues = null; })
      .finally(function () { dailyIssuesLoaded = true; renderFrontDesks(); maybeOpenSharedDailyRequest(); });
    fetch("/content/daily-edition-columns.json", { credentials: "same-origin" })
      .then(function (response) { if (!response.ok) throw new Error("daily-columns-unavailable"); return response.json(); })
      .then(function (value) { columns = value; updateDailyPaper(); renderCatchup(); })
      .catch(function () { columns = null; updateDailyPaper(); renderCatchup(); })
      .finally(function () { columnsLoaded = true; renderFrontDesks(); maybeOpenSharedDailyRequest(); });
    function recordPublicationView(event) {
      var detail = event && event.detail || {};
      markSeen(detail.key, detail.publicationAt);
      previousPublicationView = latestPublicationView(readState());
      if (previousPublicationView && input.getAttribute("data-user-edited") !== "true") {
        input.value = editorialDateOnly(previousPublicationView);
        syncCatchupAvailability();
      }
    }
    global.addEventListener("newsstand:publication-viewed", recordPublicationView);
    (global.__newsstandPublicationViewQueue || []).splice(0).forEach(function (detail) {
      recordPublicationView({ detail: detail });
    });
    global.__newsstandPublicationViewReady = true;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})(window);
