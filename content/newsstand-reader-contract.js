(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.NewsstandContract = api;
})(typeof window !== "undefined" ? window : null, function () {
  "use strict";

  var EDITIONS = ["breaking", "daily", "weekly", "tribune"];
  var STORY_STATUSES = ["published", "hold", "corrected", "retracted"];
  var PUBLICATION_STATUSES = ["quiet", "current", "hold", "unavailable"];

  function validDate(value) {
    return typeof value === "string" && !isNaN(Date.parse(value));
  }

  function validate(data) {
    var errors = [];
    if (!data || typeof data !== "object") return ["dataset is missing"];
    if (data.schemaVersion !== "1.0.0") errors.push("unsupported schemaVersion");
    if (!validDate(data.generatedAt) || !validDate(data.lastCheckedAt)) errors.push("dataset timestamps are invalid");
    if (!data.publications || typeof data.publications !== "object") {
      errors.push("publications are missing");
    } else {
      EDITIONS.forEach(function (edition) {
        var item = data.publications[edition];
        if (!item || item.edition !== edition) errors.push(edition + " publication record is missing");
        else {
          if (PUBLICATION_STATUSES.indexOf(item.status) === -1) errors.push(edition + " publication status is invalid");
          if (!validDate(item.updatedAt) || !validDate(item.lastCheckedAt)) errors.push(edition + " timestamps are invalid");
          if (!(Number(item.maxAgeHours) > 0)) errors.push(edition + " maxAgeHours is invalid");
          if (edition === "daily" && item.status === "current") {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(String(item.editionDate || ""))) errors.push("daily editionDate is invalid");
            if (!item.issue || item.issue.status !== "complete") errors.push("daily issue readiness is incomplete");
            var issueItems = item.issue && [].concat(item.issue.storyIds || [], item.issue.serviceRecordIds || []);
            var quietIssue = item.issue && item.issue.disposition === "quiet" && item.issue.sourceIdentity &&
              /^[a-f0-9]{64}$/.test(String(item.issue.sourceIdentity.radarSha256 || ""));
            if ((!issueItems || !issueItems.length) && !quietIssue) errors.push("daily issue has no admitted story or service item and no governed quiet disposition");
          }
        }
      });
    }
    if (!Array.isArray(data.stories)) {
      errors.push("stories must be an array");
    } else {
      data.stories.forEach(function (story, index) {
        var label = story && (story.slug || story.id) || "story " + index;
        if (EDITIONS.indexOf(story && story.edition) === -1) errors.push(label + " edition is invalid");
        if (STORY_STATUSES.indexOf(story && story.status) === -1) errors.push(label + " status is invalid");
        if (!validDate(story && story.publishedAt) || !validDate(story && story.updatedAt) || !validDate(story && story.lastCheckedAt)) {
          errors.push(label + " timestamps are invalid");
        }
        if (!story || !story.sourceApproval || !story.sourceApproval.status || !story.sourceApproval.record) {
          errors.push(label + " source approval is missing");
        }
        if (!story || !Object.prototype.hasOwnProperty.call(story, "correction") ||
            !Object.prototype.hasOwnProperty.call(story, "retraction")) {
          errors.push(label + " correction/retraction fields are missing");
        }
        if (story && story.status === "corrected" &&
            (!story.correction || !validDate(story.correction.correctedAt) ||
             !story.correction.summary || !story.correction.owner || !story.correction.record)) {
          errors.push(label + " correction binding is incomplete");
        }
        if (story && story.status === "retracted" &&
            (!story.retraction || !validDate(story.retraction.retractedAt) ||
             !story.retraction.reason || !story.retraction.owner || !story.retraction.record)) {
          errors.push(label + " retraction binding is incomplete");
        }
      });
    }
    return errors;
  }

  function ageHours(iso, now) {
    return (Date.parse(now) - Date.parse(iso)) / 3600000;
  }

  function calendarDateInZone(iso, timeZone) {
    var parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: timeZone || "America/Vancouver",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date(iso));
    var values = {};
    parts.forEach(function (part) { values[part.type] = part.value; });
    return [values.year, values.month, values.day].join("-");
  }

  function effectivePublicationState(publication, now) {
    if (!publication) return "unavailable";
    if (publication.status === "hold" || publication.status === "unavailable" || publication.status === "quiet") {
      return publication.status;
    }
    if (ageHours(publication.lastCheckedAt, now) > Number(publication.maxAgeHours)) return "stale";
    if (publication.edition === "daily" && publication.editionDate &&
        publication.editionDate !== calendarDateInZone(now, publication.editorialTimeZone)) {
      return "archive";
    }
    return "current";
  }

  function visibleStories(data, edition, now) {
    return (data.stories || []).filter(function (story) {
      return story.edition === edition &&
        accessDecision(data, story, { edition: edition, scope: "listing" }, now).canExpose;
    });
  }

  function storyState(story) {
    if (!story) return "unavailable";
    if (story.status === "retracted") return "retracted";
    if (story.status === "hold" || !story.sourceApproval || story.sourceApproval.status !== "approved") return "hold";
    if (story.status === "corrected" && story.correction) return "corrected";
    return "published";
  }

  function datasetState(data, now) {
    var errors = validate(data);
    if (errors.length) return { state: "load-failure", errors: errors, publications: {} };
    if (data.datasetStatus === "hold") return { state: "hold", errors: [], publications: {} };
    var governedQuietDaily = data.publications && data.publications.daily &&
      effectivePublicationState(data.publications.daily, now) === "current" &&
      data.publications.daily.issue && data.publications.daily.issue.status === "complete" &&
      data.publications.daily.issue.disposition === "quiet";
    if (!data.stories.length && !governedQuietDaily) return { state: "no-data", errors: [], publications: {} };
    var publications = {};
    EDITIONS.forEach(function (edition) {
      publications[edition] = effectivePublicationState(data.publications[edition], now);
    });
    var current = EDITIONS.filter(function (edition) { return publications[edition] === "current"; });
    var stale = EDITIONS.filter(function (edition) { return publications[edition] === "stale"; });
    var unavailable = EDITIONS.filter(function (edition) { return publications[edition] === "unavailable"; });
    var state = current.length ? "ready" :
      stale.length ? "stale" :
      unavailable.length ? "unavailable" :
      "clear";
    return {
      state: state,
      errors: [],
      publications: publications,
      currentEditions: current,
      staleEditions: stale,
      unavailableEditions: unavailable
    };
  }

  function accessDecision(data, story, context, now) {
    var dataset = datasetState(data, now);
    var edition = story && story.edition || context && context.edition || null;
    if (dataset.state === "load-failure") {
      return { canExpose: false, state: "load-failure", reason: "The publication record did not load. Nothing is available from this desk." };
    }
    if (dataset.state === "hold") {
      return { canExpose: false, state: "hold", reason: "The NewsStand is not publishing stories right now. Please check back soon." };
    }
    if (dataset.state === "no-data") {
      return { canExpose: false, state: "no-data", reason: "The publication record contains no approved story data." };
    }
    if (!edition) {
      return {
        canExpose: dataset.state === "ready" || dataset.state === "clear",
        state: dataset.state,
        reason: dataset.state === "stale"
          ? "These stories need an update before they can be shown again."
          : dataset.state === "unavailable"
            ? "Part of the publication desk is unavailable. No story is exposed without its publication record."
            : ""
      };
    }

    var publication = data.publications && data.publications[edition];
    var publicationState = effectivePublicationState(publication, now);
    var directStoryState = story && context && context.scope === "hash"
      ? storyState(story)
      : null;
    if (directStoryState === "retracted") {
      return {
        canExpose: false,
        preserveNotice: true,
        state: "retracted",
        edition: edition,
        reason: story.retraction && story.retraction.reason || "This story has been withdrawn."
      };
    }
    if (directStoryState === "hold") {
      return {
        canExpose: false,
        state: "hold",
        edition: edition,
        reason: "This story is not published yet."
      };
    }
    if (publicationState === "stale") {
      return {
        canExpose: false,
        state: "stale",
        edition: edition,
        reason: "This story needs an update before it can be shown again."
      };
    }
    if (publicationState === "unavailable") {
      return { canExpose: false, state: "unavailable", edition: edition, reason: "This publication record is unavailable. Nothing is presented as current or archived from this desk." };
    }
    if (publicationState === "hold") {
      return { canExpose: false, state: "hold", edition: edition, reason: publication.note || "This edition is not published yet." };
    }
    if (publicationState === "quiet") {
      return { canExpose: false, state: "quiet", edition: edition, reason: publication.note || "No qualified issue is filed." };
    }
    if (story && ageHours(story.lastCheckedAt, now) > Number(publication.maxAgeHours)) {
      return {
        canExpose: false,
        state: "stale",
        edition: edition,
        reason: "This story needs a new source check before it can be shown again."
      };
    }
    if (!story) {
      return { canExpose: true, state: "current", edition: edition, reason: "" };
    }

    var state = storyState(story);
    if (state === "retracted") {
      return {
        canExpose: false,
        preserveNotice: true,
        state: "retracted",
        edition: edition,
        reason: story.retraction && story.retraction.reason || "This story has been withdrawn."
      };
    }
    if (state === "hold") {
      return { canExpose: false, state: "hold", edition: edition, reason: "This story is not published yet." };
    }
    if (state === "unavailable") {
      return { canExpose: false, state: "unavailable", edition: edition, reason: "This story record is unavailable." };
    }
    return {
      canExpose: true,
      state: state,
      edition: edition,
      correction: state === "corrected" ? story.correction : null,
      reason: ""
    };
  }

  return {
    EDITIONS: EDITIONS,
    validate: validate,
    ageHours: ageHours,
    datasetState: datasetState,
    accessDecision: accessDecision,
    effectivePublicationState: effectivePublicationState,
    visibleStories: visibleStories,
    storyState: storyState
  };
});
