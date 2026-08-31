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
Branch: `release/newsstand-daily-20260830`. Released source:
`e6bbbcd6346c62517941393d5512cf7180def640`. Production seed:
`b2695dc7-c6a5-49a0-a194-6cb3e85124df`, artifact
`/tmp/laidies-newsstand-bank-successor.grAiqm`, manifest at the same path plus
`.manifest.json`, identity
`48cf4656a60bb79f1849549b751205bbf411b433eed2872d2e0633b40000e1d4`.
Public verification: `operations/product-stewards/newsstand/evidence/service-revision-2026-08-30/public-release.md`.
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

The date-bound and Weekly-continuity defects are repaired. Current-input tests
derive the date and membership from canonical data; historical August 4 tests
isolate Weekly authority. `test-newsstand-next-cycle.mjs` proves tomorrow's
quiet and exactly admitted service cycles, idempotence, service use after a quiet
issue, Weekly persistence at 6/7/8/14 days, original dates, held/new successor
non-substitution, exact successor selection and retraction notices. Its fixtures
are synthetic and private, never editorial admission. Run its emitted fixture
through both `test-newsstand-reader-contract.mjs` and the browser suite with
`NEWSSTAND_TEST_FIXTURE_ROOT=<fixture>` and `<fixture>/weekly`. Empty-state
negative fixtures explicitly remove quiet permission and Weekly pointers, so
they do not depend on today's service-led issue. The old deployed reader fails the Weekly cutoff test;
the repaired reader passes. `--zoom-200` uses native Chromium 200% browser zoom,
not pinch or a device-scale-only substitute (1440 outer / 720 CSS pixels).

The August 30 ordinary-story connection is now implemented locally and tested
with synthetic first-issue and same-day-append inputs through the actual CLI,
feed/archive generation and reader contract. It has not published a real story.
Run `node scripts/test-newsstand-ordinary-publication.mjs` for this branch.

Remaining conditional blockers: new ordinary prose still requires separate exact
accuracy and beginner/voice admissions. On August 31 Ali authorized routine news
without per-story human checks. Use `ordinary-news-editorial-policy.json` in this
directory: independent AI editorial analysis replaces only the human explain-back
and transfer observations for ordinary `NEWSSTAND_DAILY` `NEWS`. It does not
waive any other quality or release gate, or Big Picture's exact-version Ali review.
Do not describe
a service-only run as operational news publication. The unrelated broad episode
hook and legacy Big Picture checker remain known failures, not passing checks.
Source/browser/provider access and the local Codex host must be available.

## 1. Confirm the dated source receipt

### Service-bank candidates (prepare before composing an issue)

The private reserve is `operations/product-stewards/newsstand/candidates/service-bank.json`.
It is candidate input to the existing column/issue path, not a second publisher.
Check coverage with:

```sh
node scripts/prepare-newsstand-service-bank.mjs --date YYYY-MM-DD --reuse-admitted --check
```

Use `--output operations/product-stewards/newsstand/release-pipeline-v1/service-bank-proposals/YYYY-MM-DD.json`
instead of `--check` to prepare a private proposal. This never changes canonical
columns or grants approval. It chooses unused entries, carries full paragraphs,
questions, sources and destinations, and reports readiness separately from draft
coverage. The recurring cycle uses `--reuse-admitted`: prefer unused approved
entries; when a desk has no unused approved entry, reuse an exactly reviewed,
eligible, unexpired entry before considering unapproved candidates. Reuse creates
a new dated ID and binds `predecessorRecordId`; it never changes the original
event date, expiration, source copy or reviewed-content hash. A new independent
issue admission is still required. Without the flag, preparation stays unused-only.
`--item type=bankItemId` selects a particular item subject to those same checks. What's New
requires its original event date and a retirement date; an expired announcement
produces a gap, never a newly dated event.

The August 30 bank contains 18 APPROVED/ELIGIBLE entries, backed by exact
producer and independent Claude accuracy/voice receipts. Approval is checked
against the frozen text hash and raw independent judgment, not a filename or
status label. Four entries remain held: the idea-credit Corner Office source
needs replacement and fresh review, the additional Mme site fact lacks a complete
producer chain, Caboodle has an incomplete imported review field, and crossword
still needs native assistive-technology review. The current published Corner
Office and Mme selection were preserved in that release, not silently replaced by those candidates.

**August 31 Corner Office correction (Ali):** `career_life` is non-AI
workplace advice: difficult conversations, claiming credit, asking for a raise,
negotiating pay, promotion and boundaries. Each entry needs a complete column
and actual words to say, with a useful explanation and follow-up. Do not use
AI prompting/delegation mirrors or a summary linking to an unrelated Episode.
The `WORK-LIFE-AI-MIRROR-22` delegation item is rejected for this desk; its old
approval cannot authorize a new-date copy or carry-forward after this ruling.
`scripts/newsstand-career-lane.mjs` blocks that known-bad source/copy and missing
bodies at preparation, composition and projection. It is not a semantic-review
replacement: reviewers must separately judge the workplace situation and script.
The existing `corner-01-credit` draft is the requested replacement; it remains
held pending the already-required source repair and exact-content review. Do not
weaken same-day append-only rules or rewrite historical receipts to insert it.
The local preview and production still contain the older issued row until an
explicit correction or new-date successor is admitted. This correction is not
a claim that either visitor surface is repaired.
The next-date check produces seven ready desks and one crossword candidate;
it does not approve or publish tomorrow's issue. Complete
exact-content source, independent writing and format reviews before adding an
admitted dated record to `content/daily-edition-columns.json` and composing the
issue below. On August 30 Ali authorized sampled reader testing for routine
service entries instead of mandatory observed-human testing for every entry.
`recurring-service-sampling-policy.json` binds the permitted entry IDs, types
and classes. Each independent review still assesses comprehension and transfer;
the pending sample queue and correction feedback must remain explicit. Never
record a model simulation as a human observation. At least one teaching entry
per batch enters the reader-test queue. This does not approve any prose and does
not change Big Picture's Ali-review requirement, news admission, or the gates
for books, classes and episodes. Episode 1 supplies voice-only calibration for
these short services: no inherited factual claims or episode-shaped template.
Crossword also remains held for native assistive-technology review. Do not
interpret eight proposed rows as eight admitted sections.

The reader accepts optional `body`, `question`, `sourceLinks` and destination
labels on admitted records. A front card opens its full column directly;
crossword opens the puzzle directly. The browser fixture in
`scripts/test-newsstand-service-reader.mjs --serve` is loopback-only and visibly
marked unapproved. Its synthetic eligibility must never enter a release.

### Source receipt

Research the rolling seven-day window and unresolved candidates against the
actual published story IDs, not only announcements posted on the issue date.
"No new AIDB edition today" is not "nothing left worth reporting." Keep the
source's event date distinct from the newspaper's publication date. Prioritize
useful unreported developments, merge duplicate events and record the reason
for rejection/hold. A blocked review must be reported as a blocked review, not
converted to QUIET. An existing same-day issue with no admitted delta stays
unchanged; do not overwrite it with a freshly dated quiet envelope.

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
node scripts/test-newsstand-ordinary-publication.mjs
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

### New ordinary stories: private candidate input

Use the existing composer with `--story-candidate` pointing to a private JSON
package under `operations/product-stewards/newsstand/candidates/`. Do not insert
an unreviewed draft into `content/newsstand-stories.js` to satisfy composition.
This path accepts one new ordinary story per transaction; repeat only after
the prior transaction is complete. It cannot replace Front PAiGE, Big Picture,
Weekly, a correction, or an existing article.

Package contract (`scripts/validate-newsstand-ordinary-story-candidate.mjs`):

- `schemaVersion: newsstand-ordinary-story-candidate-v1`;
  `candidateStatus: READY_FOR_ISSUE_ADMISSION`; `candidateId`; `editionDate`.
- Complete `story`: same ID as candidate, `edition: daily`, `status: hold`,
  `publishedAt: null`, dated `updatedAt`/`lastCheckedAt`, source approval
  `independent-review-required`, and no correction/retraction/lineage mutation.
- `storySha256`: SHA-256 of the stable, key-sorted complete story JSON.
- `publicationBase: {path, sha256}`: frozen private copy of the exact canonical
  source from the confirmed current transaction base, including incumbent
  articles. The copy must equal the current source before composition.
- `sourceText: {path, sha256}`: `candidateReviewText(story)` from the validator;
  the complete record is bound, including reader-facing extra fields, not only
  three selected paragraphs. `claimMap: {path, sha256}` is the independently
  reviewed factual claim map JSON.
- `producerContract: {path, sha256}`: passing existing prevention-first NEWS
  contract for `NEWSSTAND_DAILY`, by the actual maker.
- `sources`: one `{id, url, evidence: {path, sha256}}` per public source, matching
  the independent factual review. Recheck sources on the editorial date.
- `reviewEvidence`: exact `{path, sha256}` bindings for `producer`,
  `independent`, and `independentRawReport`. Existing producer and independent
  prose contracts remain mandatory, including cross-family review and exact
  explanation assessments. Both bind the same complete review text and rendering.
  The independent receipt's `reportBinding` points to the raw JSON report with
  `candidateId`, `storySha256`, `reviewerPrincipalId`, `verdict: PASS`, and
  substantive `findings`. Do not manufacture reviewer or reader records.

### Ordinary-news reader explanation review (Ali authorized August 31)

The independent receipt may carry `newsEditorialReview: {policy: {path, sha256},
analysis: {path, sha256}}`. Policy is the exact
`operations/product-stewards/newsstand/ordinary-news-editorial-policy.json`.
The raw analysis declares `evidenceType: AI_EDITORIAL_ANALYSIS`, `candidateId`,
`reviewerPrincipalId`, `reviewTextSha256`, `checks` and `outcomes`. It is real
independent reviewer output, not a maker-generated passing receipt.

Four checks each need PASS/HOLD/FAIL, a specific observation and exact article
excerpt/locator in `artifactEvidence`:

- `incidentExplained`: who did what, what changed and why it matters are clear.
  Explain an unfamiliar company or incident when it is necessary to understand
  the story; naming “the Hugging Face incident” is not an explanation.
- `termsExplainedInContext`: explain necessary technical terms as they arise,
  using an example when useful. Do not replace jargon with vague metaphors.
- `readerConsequenceSpecific`: distinguish a current consequence from a possible
  future one; name who is affected and how. “Tools and permissions matter” is
  not enough. Do not invent personal advice; say when no reader action is needed.
- `noInternalNotesOrInventedAdvice`: coherent paragraphs and a useful ending;
  no internal planning notes, unsupported balance, slogan conclusions or
  compulsory tips. Class Notes link to actual relevant admitted material.

For both `explainBack` and `unseenTransfer`, retain the existing outcome verdict,
observation and article evidence. Replace `observedReaderEvidence` with
`aiEditorialAnalysis: {evidenceType: AI_EDITORIAL_ANALYSIS, prompt, response,
expectedEvidence, assessment}`. Bind the identical objects in the raw analysis's
`outcomes`. Explain-back must restate the story's mechanism and consequence in
ordinary language; transfer must use a different situation to reveal a likely
misunderstanding. Neither may claim to be a real reader response. Include the
receipt limitation: “AI editorial assessment only; no observed human-comprehension
evidence is claimed.” No human sampling is a routine-news publication prerequisite.

All existing clarity, voice, useful action, source/freshness, uncertainty,
calibration and anti-slop rulings still apply. A failed explanation means rewrite
and fresh independent review, not a caveat pasted into the story. These tests
validate evidence completeness and identity, not the truth of a reviewer's judgment.

The composer stores a held snapshot and the package binding. Promotion reopens
all evidence and admits that exact snapshot; projection performs the only
held-to-published conversion after issue admission. It never composes prose.
The publication timestamp comes from the independent issue admission on the
same Vancouver date; source event dates remain in the article. Canonical
insertion and repeat checks accept only the exact frozen base or exact expected
output. Evidence or source drift stops the transaction before a public write.

Use a new private envelope filename for a same-day revision, for example
`YYYY-MM-DD-news-1.json`. The composer refuses to overwrite different existing
envelope bytes. Keep all predecessor evidence.

## 4. Require independent admission

A reviewer who is not the maker inspects the exact envelope and creates only:

`operations/product-stewards/newsstand/evidence/daily-issue-admission-YYYY-MM-DD.json`

It must match schema `daily-issue-admission-v1`, decision
`ACCEPT_LOCAL_CANONICAL_WRITE`, the exact date and envelope SHA-256, and name
the reviewer, role and UTC review time. A maker cannot approve her own issue.

For a new ordinary story added to an already complete same-day issue, use
`daily-issue-news-revision-admission-v1`, decision
`ACCEPT_LOCAL_CANONICAL_SUCCESSOR`, the normal reviewer/date/envelope fields,
`predecessorEnvelopeSha256`, and `addedStoryIds` containing the one candidate ID.
This separately reviewed revision can only append that story. Existing story
copy/order, ready and empty desks, service IDs, columns bytes, Front PAiGE and
Weekly pointers must remain unchanged. Generic or service-revision decisions
cannot admit an ordinary candidate. An initial issue still uses
`daily-issue-admission-v1`.

The `daily-issue-successor-admission-v1` schema is reserved for a checksum-bound
migration of an already admitted issue. It must bind both exact predecessor and
successor envelope hashes. Do not use it to revise copy, desks, membership or
source identity; the writer rejects those changes.

`daily-issue-service-revision-admission-v1` permits a separately reviewed,
same-date empty-service-slot addition only. It binds the exact predecessor and
successor envelopes, named added records and either the original pre-projection
source or an exact manifest plus successful immutable/custom published-base
observations. It cannot replace a ready service, change any article, or change
Front PAiGE/Weekly/date continuity. The August 30 five-slot addition uses this
path; its evidence is in `evidence/service-revision-2026-08-30/`.

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

For revision filenames, pass the same explicit
`--envelope <private-path>` and `--decision <evidence-path>` to both publisher
commands. Do not overwrite the original date-only evidence files.

The projector rechecks the exact private envelope, independent decision and
stored membership. `content/newsstand-stories.js` is the sole current-edition
authority. The Daily issue store is dated history; neither it nor a local preview
may replace the current edition in the browser. Feed and archive are deterministic
derivatives of canonical data, admitted issue history and service-bank authority.

The newest admitted Front PAiGE persists under its original publication date;
it is not inserted into the new Daily's `storyIds`. Weekly uses the exact
`publications.weekly.storyId`, stays until an admitted successor or explicit
hold/retraction, and retains all original publication/update/check dates.
Wednesday triggers successor consideration, not expiration. Daily cannot clear
or replace that pointer. Catch Me Up retains it even when the visit cutoff is
newer. Missing or held Weekly remains unavailable; no ordinary story or Big
Picture text is written by projection. Older service-bank rows are opportunities,
not new-date permission: reuse requires an exactly admitted dated instance.

### Exact published-service carry-forward (August 31 local repair)

Carrying an existing publication is different from reissuing or reviewing prose.
Pass `--service-predecessor operations/product-stewards/newsstand/evidence/<run>/service-predecessor.json`
to the existing composer when retaining published desks. No automatic latest-by-type
lookup is permitted. The proof uses schema `newsstand-service-predecessor-v1` and
binds `deploymentId`, `predecessorEnvelopeSha256`, and `{path,sha256}` references
named `stories`, `issues`, `columns`, `manifest`, and `verification`. All referenced
bytes must be frozen under existing private NewsStand evidence, never a deployed
input directory. The manifest is the exact current complete production manifest.
The three source references are the exact published stories, issue store and column
store; their hashes must match the manifest and both live origins.

The verification record uses `newsstand-service-predecessor-verification-v1`,
`deploymentId`, freshly observed `providerHeadId`, `artifactIdentitySha256`,
`checkedAt`, and six `observations` (`url`, `status:200`, `sha256`): all three public
paths on the custom and immutable origins. Record the real provider/origin checks,
never synthetic or inferred observations. Its check must fall on the issue's
Vancouver editorial day and precede independent issue admission by at most 24 hours.
Independent issue review must inspect that evidence's provenance; hashes and
observation JSON alone are not an independent review or a live provider check.
Recheck head/coordination immediately before any separately authorized release.

Only exact prior `serviceRecordIds` with unchanged full record bytes and matching
prior desk snapshots are carry candidates. A ready carried desk has `carriedFrom`
with predecessor `editionDate`, `envelopeSha256`, full `recordSha256`, and the
service's `originalEditionDate`. This metadata is included in the new envelope's
independent admission. It does not reseal or refresh historical prose reviews.
Original IDs, publication/event dates, destinations, review paths, expiry and
retirement remain untouched. Held, ineligible, expired and retired entries are
withheld; changed originals or mismatched predecessor proofs reject the transaction.

An exactly admitted new dated service may replace its desk through the normal
admission path. A Concept successor is considered on Wednesday; omitting the carry
proof or expiry of the prior concept cannot bypass that cadence. With no admitted
successor, the eligible incumbent remains under its original date. No existing
Concept means an initial admitted Concept can be filed without pretending it is a
weekly replacement. Historical same-date reproduction is not a new successor.

Projection preserves a checksum-bound current issue. Reader loading requires that
exact issue and the matching column records; failure does not expose arbitrary bank
rows. Carried cards show their original publication date. Back issues retain each
appearance, while archive/Catch Me Up do not turn repeated appearances into newly
dated service publications. The original source text and receipts are not modified.

Run `node scripts/test-newsstand-service-continuity.mjs` alongside the ordinary
publication, next-cycle, promoter, publisher, service-reader and derivative tests.
These are synthetic integrity/behavior regressions, not editorial approval or public
verification. Do not include the earlier local August31 service rotation in a news
release merely because it is in this checkout. Start from the freshly confirmed
published service bytes; use Library's verified successor as the eventual base.

The ordinary candidate's existing source-identity binding additionally records its
`storyId` and exact `unpublishedState` (`status`, `publishedAt`, `sourceApproval`).
The package validator checks these against the actual frozen candidate. The client
uses that state only to reconstruct the admitted private envelope checksum; it
continues displaying the admitted published snapshot. This prevents promotion's
three state changes from invalidating the original envelope on the reader. Both
governed dated radar paths (AIDB and editorial-intake) are accepted consistently.
The ordinary regression now tests a reviewed synthetic article and seven carried
services together through the real client issue-validation gate, not just the
story access predicate.

Do not rerun the promoter after projection: its input checksum deliberately binds
the pre-projection canonical bytes. Use the projector's `--check` for idempotence.

## 7. Verify the visitor result

```sh
node scripts/test-newsstand-reader-contract.mjs
node scripts/test-newsstand-reader-browser.mjs
node scripts/test-newsstand-next-cycle.mjs
node scripts/test-newsstand-reader-browser.mjs --zoom-200
```

The browser suite must exit normally. Check that the current Daily displays the
exact Vancouver edition date, dated news is not carried forward as new, and
issue-store or optional-column failure preserves a truthful fallback.
The synthetic ordinary-story test additionally runs actual compose, promote,
publish, repeat/check and derivative commands in an isolated fixture, verifies
reader eligibility, and rejects copy/review/source/base drift and missing required
review evidence. `test-prose-quality-admission.mjs` exercises the bounded AI
editorial profile as well as the unchanged human gates outside that profile.
Synthetic tests are not public or human evidence. A real ordinary story must still
pass source, prose, browser, release and custom/immutable verification before
this branch can be described as publicly operational.
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
not create a scheduler. The existing active heartbeat was updated through the
app with Ali's authorization, retaining its daily 07:00 cadence, target task and
notification policy. Its next wall-clock execution has not yet occurred; local
next-day tests and this publicly verified cycle do not prove future execution.
