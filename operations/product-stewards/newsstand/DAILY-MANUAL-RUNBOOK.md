# The Daily — manual issue runbook

Use this bounded local sequence until a separate scheduler and monitor have
been built and independently verified. It does not deploy or publish. The
Control Room dispatcher stays paused.

## 1. Confirm the dated editorial receipt

For `YYYY-MM-DD`, use exactly one dated receipt from the route that actually
reconciled the source:

`operations/agents/aidb-intelligence-desk/daily/YYYY-MM-DD.md`

or:

`operations/product-stewards/newsstand/editorial-intake/YYYY-MM-DD.md`

The receipt must use the structured `- **NewsStand:** ...` form. A quiet day is
exactly `- **NewsStand:** NO NEW HANDOFF.` An editorial-intake receipt may
reconcile AIDB, the cloud intake queue or another registered source; it may not
invent a source or silently substitute an older date.

## 2. Run the fail-closed checks

```sh
node scripts/test-compose-daily-edition.mjs
node scripts/test-promote-daily-edition.mjs
node scripts/test-compile-newsstand-daily-longform.mjs
node scripts/test-promote-newsstand-story.mjs
node scripts/test-newsstand-reader-contract.mjs
```

If same-day service rows are intended for the issue, also run:

```sh
node scripts/check-daily-edition-columns.mjs --release --issue-date YYYY-MM-DD --as-of YYYY-MM-DD
```

Do not run that release-row command for a governed quiet day: the private
composer and canonical writer own quiet admission and reject any hidden story
or ready service item.

## 3. Reproduce the held story from the exact reviewed prose

Run the exact candidate compile configuration:

```sh
node scripts/compile-newsstand-longform.mjs \
  operations/product-stewards/newsstand/candidates/CANDIDATE-longform-compile.json
```

The generated held story must be byte-for-byte identical to the artifact bound
by the reviews. A changed output invalidates the old review and may not advance.

## 4. Promote each admitted new story into the canonical dataset

The story candidate remains held until all of these exact records exist:

- its checksum-bound story candidate and source/claim files;
- a story evidence manifest binding the exact prose, producer contract,
  independent review, sources, claims, correction owner and next recheck;
- Ali's approval of the exact rendered candidate;
- one observed explain-back record from an unfamiliar human; and
- an independent release decision binding all those bytes and the exact public
  story checksum.

Run the deterministic promoter without `--write` first:

```sh
node scripts/promote-newsstand-story.mjs \
  --candidate operations/product-stewards/newsstand/candidates/CANDIDATE.json \
  --evidence operations/product-stewards/newsstand/evidence/stories/STORY.json \
  --decision operations/product-stewards/newsstand/evidence/STORY-admission.json \
  --maker NEWSSTAND_STORY_MAKER_ID
```

Only an exact dry-run pass permits the same command with `--write`. Repeating
the admitted write must report `LOCAL CANONICAL IDEMPOTENT`; a changed story
with the same ID is a conflict, not a silent overwrite.

## 5. Compose one private issue envelope

```sh
node scripts/compose-daily-edition.mjs \
  --date YYYY-MM-DD \
  --radar EXACT_DATED_EDITORIAL_RECEIPT.md \
  --output operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/YYYY-MM-DD.json
```

The result must say `public_write=false`. Record its SHA-256. Its
`storySnapshots` array must contain the complete canonical object for every
admitted `storyId`; an ID-only envelope is invalid.

## 6. Require independent issue admission

A reviewer who is not the maker inspects the exact envelope and creates only:

`operations/product-stewards/newsstand/evidence/daily-issue-admission-YYYY-MM-DD.json`

It must match schema `daily-issue-admission-v1`, decision
`ACCEPT_LOCAL_CANONICAL_WRITE`, the exact date and envelope SHA-256, and name
the reviewer, role and UTC review time. A maker cannot approve her own issue.

The `daily-issue-successor-admission-v1` schema is reserved for a checksum-bound
migration of an already admitted issue. It must bind both exact predecessor and
successor envelope hashes. Do not use it to revise copy, desks, membership or
source identity; the writer rejects those changes.

## 7. Write the admitted issue to the local canonical store

```sh
node scripts/promote-daily-edition.mjs \
  --envelope operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/YYYY-MM-DD.json \
  --decision operations/product-stewards/newsstand/evidence/daily-issue-admission-YYYY-MM-DD.json \
  --maker NEWSSTAND_DAILY_MAKER_ID
```

Run the same command again. It must report `IDEMPOTENT`, not append a duplicate.

## 8. Verify the visitor result

```sh
node scripts/test-newsstand-reader-contract.mjs
node scripts/test-newsstand-reader-browser.mjs
```

The browser suite must exit normally. Check that the current Daily displays the
exact Vancouver edition date, prior-date items appear only in the archive, and
issue-store or optional-column failure preserves a truthful fallback.
It must also retain the admitted Daily headline, body, route and source after
its deliberate post-validation mutation of global story memory.

## Stop conditions

Stop the issue before canonical write if the radar date/path, checksum,
independent reviewer, story/service date, quiet disposition or reader tests do
not match. Never repair a failed issue by carrying yesterday's item forward.
This workflow authorizes no deployment, provider action, public publication or
dispatcher restart.
