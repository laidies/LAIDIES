# The Daily — cycle runbook (heartbeat and manual)

Use this bounded sequence inside the existing active Codex heartbeat,
`daily-allie-k-miller-and-ethan-mollick-source-check`, named **Daily LAiDIES
NewsStand research and publication cycle**, daily at 07:00 America/Vancouver.
Its target is thread `01a02f95-3838-7af0-a4c7-2f51253a133d`. The heartbeat
orchestrates research and independent reviews; no single shell command
substitutes for editorial judgment. No duplicate automation or separate
backend cron is enabled. The older Control Room dispatcher stays paused.

## Recurring entry and current released seed

Stable implementation checkout:
`/Users/alisoneakin/Projects/laidies-newsstand-daily-publication-20260830`.
Branch: `release/newsstand-daily-20260830`. Released source: `b03bcc649bf7da7f03db7e0eb95e123d4955f15a`;
initial public-verification handoff: `9690f8a6`. Production seed:
`dbc39599-5e48-493c-8513-2eac99d8244f`, artifact identity
`fe7bb68733e040a0d9c4a1182922a9ec3f762c6e788abd347c61b49b5e6af612`.
These are recovery pointers, not permission to deploy stale bytes: resolve the
actual provider head and exact immutable artifact anew before every release.
Use a clean isolated transaction worktree for each future candidate; never
mutate the public artifact while an input, review or check is unresolved.

The heartbeat reads this file, then invokes the commands below with the current
Vancouver date. Its full source/admission/release prompt remains authoritative.
The command entry after source research and preflight is:

```sh
cd /Users/alisoneakin/Projects/laidies-newsstand-daily-publication-20260830
NEWSSTAND_DAY=$(TZ=America/Vancouver date +%F)
node scripts/compose-daily-edition.mjs --date "$NEWSSTAND_DAY" \
  --radar "operations/agents/aidb-intelligence-desk/daily/$NEWSSTAND_DAY.md" \
  --output "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/$NEWSSTAND_DAY.json"
```

Execute it in the clean transaction worktree selected for that run; the `cd`
above identifies the preserved implementation entry, not permission to overwrite
an admitted same-date envelope. Continue through the independent review and
projection/release commands below, never straight from composition to deploy.

The August 30 live proving run succeeded, but the next unattended cycle must
resolve these known preflight gaps rather than bypassing them:

1. `test-newsstand-reader-browser.mjs` and `test-publish-daily-edition.mjs` bind
   August 30 fixtures. Separate immutable regression fixtures from the next
   candidate's date/membership checks before a later dated issue is admitted.
2. The latest heartbeat requires the admitted Weekly to stay until an admitted
   successor; the current composer ages it out after seven days. Reconcile that
   rule with original-date display and a calibrated Wednesday successor
   test before any future carried Weekly is published. Today's Weekly is held,
   so no existing admitted Weekly was removed by this proving run.
3. The broader heartbeat asks for 200% zoom coverage and separately identified
   accuracy and beginner/voice review for new ordinary copy. The August 30 run
   had no ordinary candidate and does not prove those future branches. Obtain
   those checks/reviews when applicable; never fabricate review observations.
4. The broad episode hook and legacy Big Picture shape checker remain unrelated
   known failures. Preserve their disclosure and exact non-NewsStand byte scope;
   do not describe them as passing. Source/browser/provider access must also be
   available when the local heartbeat runs.

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
it is not inserted into the new Daily's `storyIds`. Current implementation only
retains Weekly within a seven-day window; that is the known gap above, not the
intended policy. Required policy: consider a successor on Wednesday and retain
the admitted Weekly with its real date until an admitted successor exists.
Missing or held Weekly remains quiet. No ordinary story or Big Picture text is
written by this projection.

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
The scripts themselves do not deploy or restart any dispatcher. The existing
heartbeat's explicitly granted publication authority applies only after every
candidate admission, artifact scope and live-verification gate succeeds.

For an authorized proving run or the existing heartbeat, recover the exact provider-
confirmed production artifact, overlay only admitted NewsStand files and compare
the complete manifests with `check-newsstand-release-scope.mjs`. Commit the exact
source before deployment. Verify both immutable and custom origins on desktop
and mobile; a local check is not a published issue. The August 30 proving run did
not create a scheduler: Ali updated the existing active heartbeat separately.
