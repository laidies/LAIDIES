# The Daily — manual issue runbook

Use this bounded local sequence until a separate scheduler and monitor have
been built and independently verified. It does not deploy or publish. The
Control Room dispatcher stays paused.

## 1. Confirm the dated source receipt

For `YYYY-MM-DD`, the authoritative radar input must exist at:

`operations/agents/aidb-intelligence-desk/daily/YYYY-MM-DD.md`

Its NewsStand row uses the structured `- **NewsStand:** ...` form. A quiet
day is `- **NewsStand:** NO NEW HANDOFF.`; the coordinated radar's explicit
`**Result:** QUIET` is also accepted when no NewsStand row is present.
A quiet news day may still produce a SERVICE_READY issue from exactly admitted,
unexpired bank content. Reuse requires a newly dated record with a unique ID,
`predecessorRecordId`, unchanged source copy and exact independent admission.
Never relabel an old record ID as a new publication.

## 2. Run the fail-closed checks

```sh
node scripts/test-compose-daily-edition.mjs
node scripts/test-promote-daily-edition.mjs
node scripts/test-publish-daily-edition.mjs
node scripts/test-build-newsstand-derivatives.mjs
node scripts/test-newsstand-reader-contract.mjs
```

If same-day service rows are intended for the issue, also run:

```sh
node scripts/check-daily-edition-columns.mjs --release --issue-date YYYY-MM-DD --as-of YYYY-MM-DD
```

Do not run that release-row command for a governed quiet day: the private
composer and canonical writer own quiet admission and reject any hidden story
or ready service item.

## 3. Compose one private issue envelope

```sh
node scripts/compose-daily-edition.mjs \
  --date YYYY-MM-DD \
  --radar operations/agents/aidb-intelligence-desk/daily/YYYY-MM-DD.md \
  --output operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/YYYY-MM-DD.json
```

The result must say `public_write=false`. Record its SHA-256. Its
`storySnapshots` array must contain the complete canonical object for every
admitted `storyId`; an ID-only envelope is invalid.

## 4. Require independent admission

A reviewer who is not the maker inspects the exact envelope and creates only:

`operations/product-stewards/newsstand/evidence/daily-issue-admission-YYYY-MM-DD.json`

It must match schema `daily-issue-admission-v1`, decision
`ACCEPT_LOCAL_CANONICAL_WRITE`, the exact date and envelope SHA-256, and name
the reviewer, role and UTC review time. A maker cannot approve her own issue.

The `daily-issue-successor-admission-v1` schema is reserved for a checksum-bound
migration of an already admitted issue. It must bind both exact predecessor and
successor envelope hashes. Do not use it to revise copy, desks, membership or
source identity; the writer rejects those changes.

## 5. Write the admitted issue to the local canonical store

```sh
node scripts/promote-daily-edition.mjs \
  --envelope operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/YYYY-MM-DD.json \
  --decision operations/product-stewards/newsstand/evidence/daily-issue-admission-YYYY-MM-DD.json \
  --maker NEWSSTAND_DAILY_MAKER_ID
```

Run the same command again. It must report `IDEMPOTENT`, not append a duplicate.

## 6. Project into schema 2, then generate derivatives

```sh
node scripts/publish-daily-edition.mjs --date YYYY-MM-DD
node scripts/publish-daily-edition.mjs --date YYYY-MM-DD --check
node scripts/build-newsstand-derivatives.mjs
node scripts/build-newsstand-derivatives.mjs --check
```

The projector rechecks the exact private envelope, independent decision and
stored membership. `content/newsstand-stories.js` is the sole current-edition
authority. The Daily issue store is dated history; neither it nor a local preview
may replace the current edition in the browser. Feed and archive are deterministic
derivatives of canonical data, admitted issue history and service-bank authority.

The newest admitted Front PAiGE persists under its original publication date;
it is not inserted into the new Daily's `storyIds`. A current admitted Weekly
persists within its Wednesday-to-Wednesday window. Missing or held Weekly remains
quiet. No ordinary story or Big Picture text is written by this projection.

Do not rerun the promoter after projection: its input checksum deliberately binds
the pre-projection canonical bytes. Use the projector's `--check` for idempotence.

## 7. Verify the visitor result

```sh
node scripts/test-newsstand-reader-contract.mjs
node scripts/test-newsstand-reader-browser.mjs
```

The browser suite must exit normally. Check that the current Daily displays the
exact Vancouver edition date, dated news is not carried forward as new, and
issue-store or optional-column failure preserves a truthful fallback.
It must also retain the admitted Daily headline, body, route and source after
its deliberate post-validation mutation of global story memory.

## Stop conditions

Stop the issue before canonical write if the radar date/path, checksum,
independent reviewer, story/service date, quiet disposition or reader tests do
not match. Never repair a failed issue by presenting yesterday's news as new.
This workflow authorizes no deployment, provider action, public publication or
dispatcher restart.

When Ali separately authorizes a live proving run, recover the exact provider-
confirmed production artifact, overlay only admitted NewsStand files and compare
the complete manifests with `check-newsstand-release-scope.mjs`. Commit the exact
source before deployment. Verify both immutable and custom origins on desktop
and mobile; a local check is not a published issue. The August 30 proving run does
not create a scheduler or grant future automatic publication authority.
