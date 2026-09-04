#!/usr/bin/env node
import assert from "node:assert/strict";
import { selectAidbEdition } from "./select-aidb-edition.mjs";

const sha = n => String(n).padStart(64, "a").slice(-64);
const item = (editionDate, n, extra = {}) => ({ editionDate, url: `https://aidailybrief.ai/e/${editionDate}`, transcriptSha256: sha(n), itemCount: n, complete: true, ...extra });
const cursor = (...items) => ({ processedEditions: items.map(({ editionDate, url, transcriptSha256, itemCount }) => ({ editionDate, url, transcriptSha256, itemCount, processedAt: "2026-09-04T14:00:00Z" })) });

assert.equal(selectAidbEdition([item("2026-09-03", 3)], cursor(), "2026-09-04").status, "PROCESS_NEW_COMPLETE_EDITION");
assert.equal(selectAidbEdition([item("2026-09-02", 2)], cursor(), "2026-09-04").edition.editionDate, "2026-09-02", "weekend or late edition is not lost");
assert.equal(selectAidbEdition([item("2026-09-01", 1), item("2026-09-03", 3)], cursor(item("2026-09-03", 3)), "2026-09-04").edition.editionDate, "2026-09-01", "older unprocessed backfill remains actionable");
assert.equal(selectAidbEdition([item("2026-09-03", 4)], cursor(item("2026-09-03", 3)), "2026-09-04").status, "RECHECK_CHANGED_TRANSCRIPT");
assert.equal(selectAidbEdition([item("2026-09-03", 3)], cursor(item("2026-09-03", 3)), "2026-09-04").status, "QUIET_NO_NEW_COMPLETE_AIDB_EDITION");
assert.equal(selectAidbEdition([item("2026-09-05", 5), item("2026-09-03", 3, { complete: false })], cursor(), "2026-09-04").status, "QUIET_NO_NEW_COMPLETE_AIDB_EDITION");
console.log("AIDB EDITION SELECTOR PASS late_previous_day=1 backfill=1 changed_transcript=1 duplicate=1 future_incomplete=1");
