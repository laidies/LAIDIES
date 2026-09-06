(function (root, factory) {
  "use strict";
  var api = factory(typeof module === "object" && module.exports && typeof require === "function"
    ? require("./newsstand-big-picture-versions.js") : root && root.NewsstandBigPictureVersions);
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.NewsstandContract = api;
})(typeof window !== "undefined" ? window : null, function (versions) {
  "use strict";

  var EDITIONS = ["breaking", "daily", "weekly", "big-picture"];
  var STORY_STATUSES = ["published", "hold", "corrected", "retracted"];
  var PUBLICATION_STATUSES = ["quiet", "current", "hold", "unavailable"];

  function validDate(value) {
    return typeof value === "string" && !isNaN(Date.parse(value));
  }

  function validatePublishedStoryImage(story, label) {
    var errors = [];
    if (story && ["published", "corrected"].indexOf(story.status) !== -1 &&
        (!story.heroVisual || !/^\/(?:approved-assets|assets)\/.+\.(?:png|jpe?g|webp|avif)$/i.test(String(story.heroVisual.src || "")) ||
         typeof story.heroVisual.alt !== "string" || story.heroVisual.alt.trim().length < 10)) {
      errors.push(label + " published story image is missing or incomplete");
    }
    return errors;
  }

  function validate(data) {
    var errors = [];
    if (!data || typeof data !== "object") return ["dataset is missing"];
    if (data.schemaVersion !== "2.0.0") errors.push("unsupported schemaVersion");
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
            if (item.issue && item.issue.frontPaigeStoryId !== undefined &&
                !/^front-paige-[a-z0-9-]+$/.test(String(item.issue.frontPaigeStoryId || ""))) {
              errors.push("daily Front PAiGE story ID is invalid");
            }
          }
          if (edition === "weekly" && item.status === "current") {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(String(item.editionDate || ""))) errors.push("weekly editionDate is invalid");
            else if (new Date(item.editionDate + "T12:00:00Z").getUTCDay() !== 3) errors.push("weekly editionDate must be a Wednesday");
            if (!item.editorialTimeZone) errors.push("weekly editorialTimeZone is required");
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
        if (!story || !story.sourceApproval || !story.sourceApproval.status ||
            !/^newsstand:source-approval:[a-z0-9][a-z0-9._-]{1,127}$/.test(String(story.sourceApproval.record || ""))) {
          errors.push(label + " source approval is missing");
        }
        if (!story || !Object.prototype.hasOwnProperty.call(story, "correction") ||
            !Object.prototype.hasOwnProperty.call(story, "correctionHistory") ||
            !Object.prototype.hasOwnProperty.call(story, "retraction")) {
          errors.push(label + " correction history/retraction fields are missing");
        }
        if (!story || !Array.isArray(story.correctionHistory)) {
          errors.push(label + " correction history is missing");
        } else {
          var previousCorrectionTime = null;
          story.correctionHistory.forEach(function (item) {
            if (!item || !validDate(item.correctedAt) || !item.summary || !item.owner || !item.successorStoryId ||
                Object.prototype.hasOwnProperty.call(item, "record") || Object.prototype.hasOwnProperty.call(item, "priorStorySha256")) {
              errors.push(label + " correction history entry is incomplete");
            }
            if (previousCorrectionTime && Date.parse(item.correctedAt) <= Date.parse(previousCorrectionTime)) {
              errors.push(label + " correction history is not append-only by time");
            }
            previousCorrectionTime = item && item.correctedAt;
          });
          var latestCorrection = story.correctionHistory[story.correctionHistory.length - 1] || null;
          if (JSON.stringify(story.correction) !== JSON.stringify(latestCorrection)) {
            errors.push(label + " latest correction does not match correction history");
          }
        }
        if (!story || !Array.isArray(story.predecessorStoryIds) || !Array.isArray(story.successorStoryIds)) {
          errors.push(label + " story lineage fields are missing");
        } else {
          if (new Set(story.predecessorStoryIds).size !== story.predecessorStoryIds.length) errors.push(label + " predecessor lineage contains duplicates");
          if (new Set(story.successorStoryIds).size !== story.successorStoryIds.length) errors.push(label + " successor lineage contains duplicates");
        }
        if (!story || !Array.isArray(story.themes) || !story.themes.length ||
            !Array.isArray(story.concepts) || !story.concepts.length) {
          errors.push(label + " theme/concept metadata is missing");
        }
        errors.push.apply(errors, validatePublishedStoryImage(story, label));
        if (story && story.edition === "big-picture" && (!story.bigPicture ||
            !validDate(story.bigPicture.originallyPublishedAt) ||
            !validDate(story.bigPicture.lastMeaningfullyUpdatedAt) ||
            !validDate(story.bigPicture.sourcesLastCheckedAt) ||
            !Array.isArray(story.bigPicture.changeLog) || !story.bigPicture.changeLog.length)) {
          errors.push(label + " Big Picture history is incomplete");
        }
        if (story && story.edition === "big-picture" && story.bigPicture) {
          (story.bigPicture.changeLog || []).forEach(function (change) {
            if (!change || !validDate(change.changedAt) || typeof change.summary !== "string" ||
                /Ali[’']s|Ali’s|Claude-edited|rejected draft|hidden remnant|returned draft|approved.*illustration/i.test(change.summary)) {
              errors.push(label + " Big Picture update history contains invalid or known private production notes");
            }
          });
          var snapshots = story.bigPicture.previousVersions || [];
          if (snapshots.length) {
            if (!versions) errors.push(label + " Big Picture snapshot validation is unavailable");
            else errors.push.apply(errors, versions.validateSnapshots(snapshots));
            snapshots.forEach(function (version) {
              if (!version || !version.article || version.article.id !== story.id || version.article.slug !== story.slug ||
                  version.originallyPublishedAt !== story.bigPicture.originallyPublishedAt ||
                  String(version.replacedAt).slice(0, 10) > String(story.bigPicture.lastMeaningfullyUpdatedAt).slice(0, 10)) {
                errors.push(label + " Big Picture retained version does not belong to this article and update");
              }
            });
          }
          var versionIds = new Set();
          var previousVersionTime = null;
          (story.bigPicture.previousVersions || []).forEach(function (version) {
            if (!version || !version.versionId || versionIds.has(version.versionId) || !validDate(version.replacedAt) ||
                Object.prototype.hasOwnProperty.call(version, "record") || Object.prototype.hasOwnProperty.call(version, "priorStorySha256")) {
              errors.push(label + " Big Picture previous version is invalid or duplicated");
            }
            if (previousVersionTime && Date.parse(version.replacedAt) <= Date.parse(previousVersionTime)) {
              errors.push(label + " Big Picture previous versions are not append-only by time");
            }
            if (version && version.versionId) versionIds.add(version.versionId);
            previousVersionTime = version && version.replacedAt;
          });
        }
        if (story && story.edition !== "big-picture" && story.bigPicture !== null) {
          errors.push(label + " non-Big-Picture story cannot carry Big Picture history");
        }
        if (story && story.status === "corrected" &&
            (!story.correction || !validDate(story.correction.correctedAt) ||
             !story.correction.summary || !story.correction.owner || !story.correction.successorStoryId ||
             Object.prototype.hasOwnProperty.call(story.correction, "record") ||
             Object.prototype.hasOwnProperty.call(story.correction, "priorStorySha256"))) {
          errors.push(label + " correction binding is incomplete");
        }
        if (story && story.status === "corrected" && (!story.correctionHistory || !story.correctionHistory.length)) {
          errors.push(label + " corrected story has no correction history");
        }
        if (story && story.status !== "corrected" && story.correction !== null) {
          errors.push(label + " non-corrected story cannot expose a current correction");
        }
        if (story && story.status === "retracted" &&
            (!story.retraction || !validDate(story.retraction.retractedAt) ||
             !story.retraction.reason || !story.retraction.owner ||
             Object.prototype.hasOwnProperty.call(story.retraction, "record"))) {
          errors.push(label + " retraction binding is incomplete");
        }
        if (story && story.status !== "retracted" && story.retraction !== null) {
          errors.push(label + " non-retracted story cannot expose a retraction");
        }
      });
      var storiesById = new Map();
      var storySlugs = new Set();
      data.stories.forEach(function (story) {
        if (!story || !story.id) return;
        if (storiesById.has(story.id)) errors.push(story.id + " story id is duplicated");
        storiesById.set(story.id, story);
        if (storySlugs.has(story.slug)) errors.push(story.slug + " story slug is duplicated");
        storySlugs.add(story.slug);
      });
      var dailyIssue = data.publications && data.publications.daily && data.publications.daily.issue;
      var weeklyPublication = data.publications && data.publications.weekly;
      if (weeklyPublication && weeklyPublication.status === "current") {
        var weeklyStory = storiesById.get(weeklyPublication.storyId);
        if (!weeklyStory || weeklyStory.edition !== "weekly" || storyState(weeklyStory) === "hold" || storyState(weeklyStory) === "retracted") {
          errors.push("current Weekly storyId must name an admitted Weekly story");
        }
      }
      if (dailyIssue && dailyIssue.frontPaigeStoryId) {
        var frontPaigeStory = storiesById.get(dailyIssue.frontPaigeStoryId);
        if (!frontPaigeStory || frontPaigeStory.edition !== "daily" || !/^front-paige-/.test(frontPaigeStory.id) ||
            ["published", "corrected"].indexOf(frontPaigeStory.status) === -1 ||
            !frontPaigeStory.sourceApproval || frontPaigeStory.sourceApproval.status !== "approved") {
          errors.push("daily Front PAiGE story is not an admitted published feature");
        }
        if ((dailyIssue.storyIds || []).indexOf(dailyIssue.frontPaigeStoryId) !== -1) {
          errors.push("daily Front PAiGE story must not be duplicated in date-specific Daily stories");
        }
      }
      data.stories.forEach(function (story) {
        if (!story || !story.id) return;
        if ((story.predecessorStoryIds || []).includes(story.id) || (story.successorStoryIds || []).includes(story.id)) {
          errors.push(story.id + " story lineage contains a self-link");
        }
        (story.successorStoryIds || []).forEach(function (successorId) {
          var successor = storiesById.get(successorId);
          if (!successor || !(successor.predecessorStoryIds || []).includes(story.id)) errors.push(story.id + " successor lineage is not reciprocal: " + successorId);
        });
        (story.predecessorStoryIds || []).forEach(function (predecessorId) {
          var predecessor = storiesById.get(predecessorId);
          if (!predecessor || !(predecessor.successorStoryIds || []).includes(story.id)) errors.push(story.id + " predecessor lineage is not reciprocal: " + predecessorId);
        });
        (story.correctionHistory || []).forEach(function (correction) {
          var successor = storiesById.get(correction.successorStoryId);
          if (!successor || ["published", "corrected"].indexOf(successor.status) === -1 || successor.relationshipType !== "corrects" ||
              !(story.successorStoryIds || []).includes(successor.id) || !(successor.predecessorStoryIds || []).includes(story.id)) {
            errors.push(story.id + " correction successor is missing or not linked as corrects");
          }
        });
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

  function calendarDayOffset(fromDate, toDate) {
    return (Date.parse(toDate + "T12:00:00Z") - Date.parse(fromDate + "T12:00:00Z")) / 86400000;
  }

  function withinRecentCalendarDays(publishedAt, now, dayCount, timeZone) {
    if (!validDate(publishedAt) || !validDate(now) || !(Number(dayCount) > 0)) return false;
    var publishedDate = calendarDateInZone(publishedAt, timeZone);
    var currentDate = calendarDateInZone(now, timeZone);
    var offset = calendarDayOffset(publishedDate, currentDate);
    return offset >= 0 && offset < Number(dayCount);
  }

  function effectivePublicationState(publication, now) {
    if (!publication) return "unavailable";
    if (publication.status === "hold" || publication.status === "unavailable" || publication.status === "quiet") {
      return publication.status;
    }
    if (publication.edition === "weekly") {
      if (!publication.storyId) return "unavailable";
      return publication.editionDate > calendarDateInZone(now, publication.editorialTimeZone) ? "archive" : "current";
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
      if (context && (context.scope === "search" || context.scope === "archive")) {
        return {
          canExpose: dataset.state !== "load-failure" && dataset.state !== "hold" && dataset.state !== "no-data",
          state: "archive",
          reason: ""
        };
      }
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
    var archiveScope = story && context && ["search", "archive", "hash", "feature"].indexOf(context.scope) !== -1;
    var persistentWeekly = story && edition === "weekly" && publicationState === "current" && publication.storyId === story.id;
    if (edition === "weekly" && !archiveScope && story && !persistentWeekly) {
      return { canExpose: false, state: "archive", edition: edition, reason: "This is not the current Weekly." };
    }
    if (publicationState === "stale" && !archiveScope) {
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
    if (story && !persistentWeekly && ageHours(story.lastCheckedAt, now) > Number(publication.maxAgeHours) && !archiveScope) {
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
    var archivedByAge = archiveScope && !persistentWeekly && (publicationState === "stale" ||
      ageHours(story.lastCheckedAt, now) > Number(publication.maxAgeHours));
    return {
      canExpose: true,
      state: archivedByAge && state === "published" ? "archive" : state,
      edition: edition,
      archive: archiveScope,
      correction: state === "corrected" ? story.correction : null,
      reason: ""
    };
  }

  return {
    EDITIONS: EDITIONS,
    validate: validate,
    validatePublishedStoryImage: validatePublishedStoryImage,
    ageHours: ageHours,
    withinRecentCalendarDays: withinRecentCalendarDays,
    datasetState: datasetState,
    accessDecision: accessDecision,
    effectivePublicationState: effectivePublicationState,
    visibleStories: visibleStories,
    storyState: storyState
  };
});
