# The Daily — cycle runbook (heartbeat and manual)

Use this bounded sequence inside the existing active Codex heartbeat,
`daily-allie-k-miller-and-ethan-mollick-source-check`, named **Daily LAiDIES
NewsStand research and publication cycle**. The September 5 app update and
read-back confirmed 20:00 research/private drafting and 07:00 freshness/gated
publication in America/Vancouver. See the activation boundary below.
Its target is thread `01a02f95-3838-7af0-a4c7-2f51253a133d`. The heartbeat
orchestrates research and independent reviews; no single shell command
substitutes for editorial judgment. No duplicate automation or separate
backend cron is enabled. The older Control Room dispatcher stays paused.

## Recurring entry and current released seed

Current execution checkout:
`/Users/alisoneakin/Projects/laidies-newsstand-recurring-20260905`, branch
`ops/newsstand-recurring-20260905`, initially based on `b6ca03d2`. It includes
the September 5 source records and recovery/cursor state plus the local
recovery scheduling, AIDB channel discovery and research-reuse repairs.
Run from its current committed state; do not reset it to the initial commit
or overwrite newer state with a historical snapshot. If the task works in a
separate transaction worktree, bring its exact owned ledger/cursor/recovery/
intake changes back here before the next cycle, preserving newer records by
identity and review time. Do not use a temporary worktree as the only copy.

This is an execution source, not a whole-site production artifact. Recover and
reconcile the actual current public base separately before every release.
Materialize any sparse dependency required by a check before calling it a
product failure; do not bypass a check because its input is absent. The
preservation-sensitive iCloud checkout and older design work remain untouched.

Historical August 30 bootstrap and released seed (recovery only):

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
cd /Users/alisoneakin/Projects/laidies-newsstand-recurring-20260905
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
node scripts/prepare-newsstand-service-bank.mjs --date YYYY-MM-DD --reuse-admitted --check --isolate-service-hold
```

`--isolate-service-hold` is permitted only for the read-only check above. It
turns an invalid or stale service-bank chain into an explicit `SERVICE BANK
CHECK HOLD` with no proposal and no public write, so an unrelated advice-card
problem cannot abort ordinary-news research, production or review. It does not
approve, select, renew or carry a service item. A service proposal or dated
service change still uses the strict command without this flag and must pass.

### Story-first ordering and carryover

After the official-index sweep, take the highest-consequence unreported story
that has enough recoverable evidence through its complete private candidate,
claim map, producer review and maker-independent editorial review before doing
routine service replacement production or exhaustive secondary-source commentary. A
mandatory new provider release takes this slot unless a harder public-interest
story outranks it. Limit work in progress to one primary story until it passes
or reaches a specific evidence hold; then take the next candidate.

Service-desk assessment is mandatory each cycle: check Paige, Corner Office,
Concept and the other governed desks for current eligibility, due work and
unresolved intake. Reserve bounded time for due service work after the primary
story reaches admission or a named hold; do not repeatedly leave it as an
optional bank check. A quiet news day can still publish an admitted service
update through `SERVICE_READY` below. A held service stays explicit and cannot
become a successful freshness result merely because ordinary news continued.

A held story remains in the next cycle's carryover queue until it is published,
merged into a named existing story, rejected with a durable reason, or becomes
irrelevant. “No new newsletter edition” never clears this queue. Service-card
maintenance is a separate lane: preserve the currently published cards, their
original dates and their exact production-predecessor bytes while publishing
an admitted ordinary story. Never relabel an old service as newly issued.

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

### AIDB release discovery and late-publication cursor

The 07:00 Vancouver run must not ask only whether an AIDB edition has today's
date. After the official-provider sweep, compare the website/edition index with
the publisher-linked podcast release listing or RSS feed. A website masthead
is not an episode timestamp. Inventory every observed release in the rolling
seven-day window plus unresolved older releases, including episodes whose full
contents have not yet been reviewed. Then run `scripts/select-aidb-edition.mjs` against
`operations/agents/aidb-intelligence-desk/edition-cursor.json`. Process the
newest complete edition that has not been processed, even when it was published
after yesterday's scan, over a weekend, or with an older edition date. Then
process any older unprocessed edition. Do not mark a missing or incomplete
edition as processed. Bind completion to edition date, canonical URL, transcript
SHA-256 and exact item count; a changed transcript hash reopens the edition.
Update the cursor only after every edition item has a recorded disposition and
the complete ledger passes. `No edition dated today` is never a quiet-news
finding by itself.

New inventories use `schema: "aidb-edition-inventory.v2"`, `editions: [...]`
and `channelChecks: [...]`. Record one check for each `channel: "website"` and
`channel: "podcast"`, its exact `url`, actual timezone-bearing `checkedAt`,
`status: "CHECKED"` only after enumeration, and `releaseUrls` containing every
observed release URL. Use `PARTIAL` or `UNAVAILABLE` honestly when applicable.
The checks must fall on the research date in Vancouver. The helper rejects a
quiet result when a required channel was not checked or an observed URL has no
inventory entry. This is validation of the recorded work, not proof that the
source was fetched or its contents understood; the researcher must inspect it.

An episode has one stable inventory/cursor `url`. Keep `editionDate`, actual
`publishedAt`, discovery channel and discovery/check time distinct from the
intended newspaper issue date. If the publisher explicitly connects two URLs
to the same episode, keep one record with `alsoPublishedAt: [...]` and an
`identityEvidenceUrl` documenting that connection. Do not merge on date or a
similar title alone. Retain the existing cursor identity after a URL match.

Set `complete: false` for a release whose full contents have not been inspected;
record `pendingReason` and the next source to check. A title, show description,
search snippet or AI summary is not a full-episode review. Never invent its
transcript hash or item count. Resolve an unavailable transcript by inspecting
another legitimate full-content source, or retain the pending item. Only a
complete review with the existing exact identity and item dispositions can
advance the cursor.

`HOLD_AIDB_RELEASE_REVIEW` exposes released incomplete episodes in
`pendingEditions`. `HOLD_AIDB_SOURCE_COVERAGE` exposes missing reconciliation in
`coverageGaps`. An actionable complete edition still selects ahead of these
holds, with both fields retained: a delayed podcast transcript must not stop
other verified news. Inspect these fields even on `PROCESS_*` or `RECHECK_*`.
Legacy array inventories remain readable for recovery, but cannot certify quiet.
`QUIET_NO_NEW_COMPLETE_AIDB_EDITION` with `quietAllowed:true` means only that the
recorded AIDB checks have no outstanding work; it never means the news is quiet.

Before choosing stories, create an independent headline list from reported news,
official releases/authorities and relevant research. Cover the due source
families, including investigations, medicine/STEM, work/access and material
criticism. Compare that list with AIDB, then with published LAiDIES story IDs and
unresolved intake. For each consequential story, record new candidate, update,
already covered/duplicate, evidence hold with next check, or justified decline.
AIDB's framing adds questions and context; its omission cannot veto a story.
Unavailable reporting routes remain explicit coverage gaps. Do not treat the
six desk labels or a provider-only sweep as completed independent coverage.

### Research reuse: site freshness and internal practice

Every completed research cycle must disposition material findings in three
places: dated news, existing LAiDIES teaching/guidance, and internal practice.
Use the same original-source evidence and claim boundaries; each destination
has a different job and must inspect its exact existing treatment. Do not
copy one article or tip into every surface or treat a new product release as
proof that a durable concept needs rewriting.

The existing cross-site route is
`operations/product-stewards/learning-content-ecosystem/FRESHNESS-SYSTEM.md`
and its `freshness-signal-inbox.json`, not another research database. Register
a material source change with the exact current claim IDs or an explicit
unmatched review request, affected entities, source path, severity and receiving
owner/next action. Learning System & Concepts maps and accepts the claim change;
the affected owner decides `CORRECT`, `UPDATE`, `CURRENT_NOTE`, `LINK`,
`NO_CHANGE` or `HOLD` at each actual location. A new example can be useful
without changing the underlying explanation. Model names, access, prices,
privacy and product instructions require their own dated review.

Follow accepted changes through authored textbook chapters, rendered readers,
reference/search answers and exact affected lessons, quizzes, activities or
media. A chapter edit alone cannot close a correction while its old answer
remains in Miss Jeeves or another derivative. Preserve historical publication
dates and distinguish source checked, prose changed, rebuilt and publicly
verified. Record the reason when a consumer needs no change. A signal or owner
handoff is not delivery; incomplete claim registration is an explicit coverage
gap. Do not infer whole-site currency from the registered subset.

Internal guidance receives one of `ALREADY_APPLIED`, `TEST`, `ADOPT`, `WATCH`,
`DECLINE` or `NEEDS_ALI_DECISION`, with evidence and a named next action in the
existing editorial intake. Test changes to model/workflow choice on a real
bounded task before adopting a claimed productivity benefit. Carry forward
successful changes into the actual operating instructions/tools and verify the
result; a saved recommendation does not change behavior.

Surface a concise research-impact brief in the existing task: what was learned,
what site guidance needs attention, what changed internally, what remains held,
and any one concrete Ali decision. State the recommendation, likely benefit,
cost/risk and exact choice in the message; do not ask Ali to discover it in a
log. Routine authorized fixes need no new approval. Consequential changes keep
their existing authority boundaries. Unchanged runs stay quiet. Automatic
delivery must be verified separately. At the initial September 5 audit,
NewsStand used `failed_runs_only`. The adoption below changes that app setting
so meaningful successful findings can be surfaced; actual delivery still needs
an observed scheduled result. The Control Room remains PAUSED. Neither a
runbook instruction nor an inbox entry alone changes app settings.

### Evening preparation and morning freshness check

Ali proposed preparing the next day's paper at the end of the preceding day so
AIDB's treatment can inform it. Configured operating times are 20:00 Vancouver
for research and private drafting, retaining 07:00 for the morning delta and
gated publication. Activation status: ACTIVE CONFIGURATION VERIFIED at
2026-09-05 17:44 UTC (10:44 Vancouver), through the app update and saved-field
read-back. The same automation ID and target task are retained. The exact
replacement prompt and both hours matched, successful results are unmuted,
and the broader Control Room remains PAUSED. First paired scheduled execution
and automatic impact-brief delivery are NOT YET OBSERVED. This is configuration
verification, not unattended/public completion.

The evening pass reconciles independent headlines, all AIDB release channels,
open evidence holds and due columns. It preserves a resumable private queue for
the next issue. The morning pass checks both source groups again, resolves
pending releases where possible, checks material claim changes and performs
the existing publication checks. Unchanged admitted prose can be reused within
its existing validity rules; changed material must be reviewed again. A missed
evening run triggers recovery of that research in the morning, not publication
from an empty or stale queue. Neither phase may backdate an article, label an
unchecked source current, duplicate an issue, or delay urgent verified reporting
just to wait for AIDB. Scheduler adoption and an actual paired run remain required
before claiming this cadence works unattended.

Both phases run in the same existing task and preserve one durable queue.
Evening writes private research, candidate work and complete-review cursor
updates only; it does not promote tomorrow's issue or alter public dates.
Morning owns scheduled canonical promotion/publication. Keep a truthful source
review completion when the evening has earned it; do not force a duplicate
full-episode review in the morning. Recheck release indexes and changed claims.
Before any state write, reread the current record and reconcile any later run
or independent work; never replace the entire cursor or queue from an old copy.
Carry incomplete work with its exact next action and retry trigger. A missed
evening run requires a full research recovery before morning publication.

Continue the two September 5 research-impact signals through the existing
Learning System inbox. The loop-practice request now has a receiving-owner
assessment in the September 5 editorial intake; its narrow extension and source
checks remain pending. Do not leave accepted actions indefinitely labelled
banked. Keep a named actual task/lane and checkpoint when work is dispatched.
The broader Control Room remains paused; this NewsStand task owns follow-through
for its research until the receiving work is completed or explicitly held.

The September model-routing instruction supersedes any older suggestion of a
synthetic model tournament: calibrate using completed real tasks and the shared
September table. Task-specific cost stays UNKNOWN unless actually exposed.

Research the rolling seven-day window and unresolved candidates against the
actual published story IDs, not only announcements posted on the issue date.
"No new AIDB edition today" is not "nothing left worth reporting." Keep the
source's event or discovery date distinct from the newspaper's publication
date. A worthwhile story may be published after it was announced or first
found. Its visible `publishedAt` date is the date LAiDIES actually puts it on
the site; do not backdate it to the announcement or discovery date. State the
earlier event date accurately in the article and judge whether the development
is still useful and relevant at publication time. Prioritize useful unreported
developments, merge duplicate events and record the reason for rejection/hold.
A blocked review must be reported as a blocked review, not converted to QUIET.
An existing same-day issue with no admitted delta stays unchanged; do not
overwrite it with a freshly dated quiet envelope.

### Failed stories must repair, not disappear

Before drafting a new ordinary story, classify it with
`operations/product-stewards/newsstand/story-type-modules.json`. Select one
primary type and every applicable overlay from: model/tool release,
research/benchmark, safety incident, legal/policy, health/science, work/economy
and company/business. Complete the universal reporting spine and every question
in every selected module. From the September 5 issue onward, new ordinary
candidate packages use `newsstand-ordinary-story-candidate-v2` and bind this
exact `storyTypeCoverage` object.

Run `scripts/validate-newsstand-story-type-coverage.mjs` before producer review.
The independent reviewer then checks whether the actual prose answers those
questions accurately and understandably; populated metadata is not proof. A
story whose topics require an unselected module fails. Mixed stories must pass
all selected modules—for example, a model release with a safety dispute must
pass both model/tool and safety requirements. These are internal reporting
questions, not extra public headings: the published article keeps the existing
NewsStand reading structure.

Complete the translation layer in the same `storyTypeCoverage` object before
review. Bind the exact reader-facing sentences that perform four moves: “what
you may have seen,” “what it actually means,” the smallest accurate explanation
of the mechanism, and one familiar work or life example. List every necessary
AI term and its plain-language meaning. The validator confirms that these exact
sentences and meanings appear in the article rather than living only in private
metadata.

For every durable concept, search the governed LAiDIES learning surfaces. If an
exact relevant Library lesson exists, record its destination and learning
payoff and put that exact link in `class_notes`. If none exists, explain the
concept fully inside the story and record an owned learning gap with a durable
record path and trigger. A generic Library link, a semantically unrelated
chapter, or an invented fragment is not a pass. Link existence is checked
mechanically; learning relevance remains an explicit independent-review duty.

Before selecting a lower-priority new candidate or declaring a quiet research
result, run the durable story-recovery queue through:

```sh
node scripts/advance-newsstand-story-recovery.mjs select path/to/story-recovery-queue.json
```

`ACTIVE_RECOVERY_MUST_CONTINUE` means the selected item owns the primary-story
slot. Preserve its exact source identity, artifact hash, independent review,
stable defect IDs and next action. A repairable failure becomes
`REPAIR_REQUIRED`; create a new exact artifact that addresses the named defects
without weakening any gate, then obtain maker-independent review of that new
hash. If the same stable defect survives two reviews, the state becomes
`SYSTEM_REPAIR_REQUIRED`: update the responsible producer instruction,
validator or reviewer calibration, forward-test it against the known-bad
artifact, and only then redraft.

One exact artifact receives one independent editorial decision. Do not send an
unchanged artifact through another review in the hope of a different answer.
The first complete independent PASS advances directly to issue admission; do
not invent optional review rounds after the mandatory gates pass. Review only
the repaired exact artifact, with the prior defects retained as regression
checks.

An evidence gap becomes `EVIDENCE_BLOCKED`, remains active and is rechecked on
later cycles. Selection returns due source checks in `evidenceRechecks`,
separately from the primary production `candidate`, even when another repair
is actionable. `EVIDENCE_RECHECK_DUE` means check those exact sources; it does
not yet authorize another drafting/review cycle. `EVIDENCE_WAIT` means all
remaining evidence checks are scheduled for later. Both retain
`quietAllowed:false` and `candidate:null` when no production repair is ready;
continue other eligible stories and due columns rather than occupying the
primary slot with an unchanged evidence gap.

After a source check, preserve the actual result and set `nextCheckAt` to an
ISO timestamp with timezone and a justified next check. Set
`newEvidenceAvailable:true` only with a recorded material source change; it
makes recovery actionable even before the scheduled recheck. This signal is
not factual admission: update the exact source/artifact package and complete
the existing reviews before publication. A fresh evidence-required review
clears the consumed signal and obsolete schedule. Older holds with no schedule
are due for a source check, not silently deferred. Invalid schedules, active
flags or unknown active states fail instead of becoming quiet. The selector
is read-only; the cycle must persist the actual source check separately.

This is not a quiet result, and without new evidence it does not monopolize
the primary-story slot or stop another eligible story publishing.
There is no attempt limit that silently drops a repairable story. A story
leaves active recovery only after exact
public verification or an independently supported durable terminal disposition:
named duplicate, false premise, no distinct reader value or no longer relevant.

Advance a completed independent review with:

```sh
node scripts/advance-newsstand-story-recovery.mjs review story-state.json independent-review.json
```

After admission, deployment and live verification, bind the exact public
receipt with:

```sh
node scripts/advance-newsstand-story-recovery.mjs publish story-state.json publication-verification.json
```

The publication objective is not merely a passing story. It is an explanation
a non-technical reader can rely on as her primary AI news briefing: what the
thing is, what changed, the mechanism that matters, familiar consequences,
what remains uncertain, realistic choices and a useful next action or question.

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
  `editionDate` is the intended LAiDIES publication date, not the source's
  announcement date or the date the story was discovered.
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

When an already published ordinary story is corrected after its dated issue was
admitted, use `prepare-newsstand-daily-story-correction.mjs` and a separately
reviewed `daily-issue-story-correction-admission-v1` decision. The decision binds
the exact predecessor issue, the one corrected story ID, the current approved
story evidence and the successor envelope. This path may replace only that
dated story snapshot and its story-source identity. It cannot change the date,
story membership/order, services, Front PAiGE, Weekly, or any other story.

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
independent reviewer, LAiDIES publication date, service date, quiet disposition
or reader tests do not match. Publishing a still-relevant story after its event
or discovery date is allowed; falsely backdating it or relabelling an already
published story as newly published is not.
The scripts themselves do not deploy or restart any dispatcher. The existing
heartbeat's explicitly granted publication authority applies only after every
candidate admission, artifact scope and live-verification gate succeeds.

For an authorized proving run or the existing heartbeat, recover the exact provider-
confirmed production artifact, overlay only admitted NewsStand files and compare
the complete manifests with `check-newsstand-release-scope.mjs`. Commit the exact
source before deployment. Verify both immutable and custom origins on desktop
and mobile; a local check is not a published issue. The August 30 proving run did
not create a scheduler. That historical app update retained the existing 07:00
cadence, task and notification setting. The September 5 adoption section above
is the current scheduling record. Local tests or a prior publicly verified
issue do not prove a later unattended run or notification delivery.
