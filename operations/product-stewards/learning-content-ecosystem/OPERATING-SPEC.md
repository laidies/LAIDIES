# Learning-content ecosystem operating specification

**Status:** BUILT LOCALLY — OWNER CONTRACT + REPRESENTATIVE CLAIM REGISTER;
SYSTEM-WIDE BACKFILL OPEN
**As of:** 2026-07-30
**Permanent owner task:** `019f9f7f-9e4c-72d2-8882-447bcbe01691`

## Identity and purpose

- **Product:** LAiDIES Learning System & Concepts.
- **Parent:** none; shared portfolio function.
- **Product type:** shared learning-system and canonical concept service.
- **Audience:** Ali at idea intake; learning-surface owners; editorial,
  accuracy, freshness, assessment and analytics specialists; ultimately every
  LAiDIES learner.
- **User job:** bring one learning idea or correction and receive a
  source-reconciled decision about what it should become, what already owns
  the truth, what the learner must know first and which owner acts next.
- **Why LAiDIES offers it:** prevent six individually strong surfaces from
  teaching duplicate, contradictory or outdated concepts.
- **Distinct contribution:** one concept graph and correction path across
  stories, reference, instruction, tools, practice and current evidence.
- **Non-goals:** unbounded or multi-surface artifact commissioning from one signal; a public curriculum page;
  teaching every concept in this dossier; rewriting surface content;
  admitting/publishing content; replacing NewsStand sourcing or a surface
  owner's production/release authority.

## Owner-entry and intake model

The permanent owner task is the human entry route. Ali may send an unformatted
idea or ask “what should this become?” The Director:

1. records the trigger without presuming a format;
2. finds or proposes the canonical concept row;
3. checks prerequisites, adjacent concepts, current evidence and freshness;
4. reconciles the complete cross-format inventory and nearest current canon;
5. assigns a distinct learner/cognitive job to each useful surface;
6. rules **link, correct, update, extend, create or decline** for each earned output and records whether the signal is its primary output, contributing evidence, an update or related reading;
7. records owner, evidence, correction path, measurement and next action; and
8. sends a durable handoff to each affected surface owner.

Every substantial candidate uses
`operations/checklists/learning-content-intake-template.md`. Until
reconciliation, its truthful status is `CAPTURED`. A `create` ruling remains
`DECIDED` or `SPECIFIED`; it is not `BUILDING` until the receiving product
owner accepts and starts production.

### Recommendation-to-result work orders

A recommendation is not allowed to end as prose in an intake, scan or review
receipt. Every NewsStand learning-impact intake and terminal Stage 4 receipt
must resolve in
`operations/product-stewards/learning-content-ecosystem/content-work-orders.json`
as one or more owned work orders, an evidenced `NO_BUILD_REQUIRED` ruling, or
a `QUEUED_WITH_TRIGGER` ruling whose trigger is exact. A selected
`READY_TO_DISPATCH` order may begin before its producer contract exists:
dispatch creates the owned lane in which that contract and artifact are made.
Only one primary output per owner may be active; every dispatch binds its
receipt, scope, collision boundary, checkpoint and SLA. The portfolio check
`node scripts/check-content-work-orders.mjs` fails when any such record is
uncovered or an actionable order lacks an owner, target, next action, trigger
or acceptance evidence. NewsStand orders additionally bind a format from
`PUBLICATION-PIPELINES.json`, its source-contribution relationship, distinct
job and exact source versions. One signal may support several outputs—for
example immediate Daily reporting and one evidence strand in a broader Big
Question—but each output keeps independent production, review and release.

Before an exact artifact may advance beyond local build, it must be hash-bound
and independently evidence all of these stop gates:

1. factual accuracy and evidence/inference separation;
2. anti-slop editorial quality: specificity, coherent synthesis and no filler;
3. current best practice, current evidence and a future freshness trigger;
4. LAiDIES voice and writing-lock compliance;
5. analogy integrity, including the mapping and limit or a ruled no-analogy decision;
6. sufficient usefulness/depth for explanation, application and misconception resistance;
7. fit for the exact publication surface, template, modality and responsive experience;
8. ingestion into the appropriate search/index/canonical discovery systems;
9. a semantic relationship scan with exact inbound/outbound links across relevant
   episodes, books, classes, news, tools and `Learn more` modules;
10. sitewide canon consistency and an explicit correction/versioning plan for conflicts;
11. any separately commissioned KSVL song child order, with learning purpose,
    rhymeable hook, analogy limits and suggested style; and
12. any separately commissioned Paige, Promptoscope, Daily, social or other
    derivative child order, with its own source, artifact and freshness limit.

Song and derivative opportunities are `PARKED` by default. They do not block
the primary output and never inherit its admission. They become applicable
only through a distinct child work order with a distinct reader job.

`PASS` is invalid without gate-specific evidence attached to the exact bound
artifact. Search, links and derivatives do not inherit publication approval;
they are part of the release package and must remain fail-closed when their
production store or public surface is not yet built.

## Canonical truth model

### Sources and precedence

1. Ali's explicit ruling and locked decisions.
2. Accepted, current primary-source evidence and ruled concept records.
3. Approved product/learning briefs and the last approved artifact.
4. Verified learner/product evidence.
5. Current surface implementation and inventory observation.
6. Research and comparables as proposals.

`concept-map.md` is authoritative for cross-product concept IDs, owner,
relationships, prerequisites, progression and evidence state. It is not
evidence that an `INFERENCE`, `OPEN`, `HOLD` or observed explanation is
correct. Concept substance becomes governing only when its claim/evidence
packet and required instructional/accuracy review pass.

`inventory.json` is authoritative for the ecosystem audit index and overlap
reconciliation. Each source surface remains authoritative for its own
admission/publication status. Conflicts fail closed and are recorded; neither
source silently overwrites the other.

`claim-register.json` is authoritative for admitted claim identity, current
wording/evidence boundary, review timing and the known consumer graph.
`freshness-signal-inbox.json` receives bounded AIDB, NewsStand, primary-check,
episode and Ali-correction signals. A signal is not canon and cannot edit a
surface; the Director accepts, declines, watches or routes it.

### Required concept record

Every governed concept must eventually include:

- stable ID and learner question;
- plain-language mechanism and adjacent distinctions;
- canonical owner and public durable treatment owner;
- prerequisites and intended next experiences;
- present capability, uncertainty, disagreement, forecast/scenario boundary;
- misconceptions and misleading-claim tests;
- analogy plus its limit where used;
- source packet, observation date, freshness trigger and correction owner;
- format complement map and every consuming item/version; and
- explanation, application, transfer and misconception-resistance checks.

## Cross-format operating rules

`LEARNING-ORCHESTRATION-GUIDE.md` is the controlling role, depth, style,
learner-life, connection and anti-duplication contract for every format. A
surface list in this specification is only a summary.

- **LIBRAiRY:** durable, revisable reference treatment. A book needs a distinct
  lookup job and must not become a class transcript or episode recap.
- **Classes:** observable skill through narration, animation, current
  demonstration, controlled comparison, guided practice, failure diagnosis,
  feedback and transfer. Product volatility belongs in dated/reshootable
  material.
- **Weekly Episodes:** narrative need, mental model and memorable
  demonstration. `library_impacts[]` and `class_impacts[]` are mandatory owner
  reviews, not commissions.
- **NewsStand:** dated reporting and reality application under its separate
  sourcing/editorial/correction system and canonical publication registry; it
  may trigger a durable correction without becoming the textbook. Daily and
  Weekly are multi-element papers; The Big Question is the public longform
  question/argument (`tribune` remains a machine compatibility key).
- **Interactive tools:** complete the real job and expose the useful
  transformation/limits; they do not need to force practice.
- **Games/quizzes/practice:** exercise a ruled behavior or judgment with
  feedback and replay; presence, clicks and completion do not establish
  learning.
- **Study Packs:** retrieve, rehearse or apply already ruled learning in a
  compact format; they do not originate canonical explanations.
- **Daily tips and Promptoscope:** may remix a verified concept into a bounded,
  source-linked daily form. They do not originate canon, silently broaden a
  claim or retain a volatile recommendation beyond its freshness limit.
- **Dear Miss Jeeves:** draws from a governed common-problems bank, explains
  the mechanism and one useful recovery, and publishes at most one admitted
  column per week. Future visitor questions remain private until a separate
  intake contract exists and never publish automatically.
- **Career/work-life AI mirrors:** begin with a genuine workplace situation,
  provide practical choices and use the AI parallel only when the mapping and
  limit are faithful. AI must not be presented as the answer to a structural or
  interpersonal problem it cannot solve.
- **KSVL songs:** reinforce one ruled idea or behaviour through a strong hook
  and correct metadata; they cannot carry the only explanation of a nuanced
  concept.
- **Community and Town Group Chat:** create application, explanation, humour
  and mutual support without requiring sensitive disclosure or duplicating the
  lesson.

If two items perform the same job, prefer link, correction, update, merge or
extension. A new item needs a remaining learner job that the current owner
cannot cleanly perform.

## Episode, class and Library reconciliation

The Weekly Episode Engine supplies a structured impact proposal with episode
and concept identity, ruled source, learner need, possible practical/lookup
job, evidence and freshness risk. The Director checks the concept map and
complete inventory, then sends:

- a Library review when a durable lookup/revision job remains;
- a Classes review when observable practice and modality advantage remain; or
- link/update/decline when an existing owner already performs the job.

Classes, Library and Weekly Episodes independently own production decisions.
No surface is permitted to backfill missing concept truth merely to keep its
schedule.

## Correction propagation

A material concept correction records:

1. affected concept/claim and old/new evidence;
2. severity, effective date and whether use must hold immediately;
3. every known consuming episode, book, class, tool, game, quiz, Study Pack
   and NewsStand link;
4. assigned surface owner and required action;
5. acknowledgement, implementation and exact verification status; and
6. public correction/retraction handling where applicable.

The representative machine-readable register, signal inbox and consumer graph
are implemented under this dossier and checked by
`scripts/check-content-freshness.mjs`. Coverage is still
`PARTIAL_BACKFILL`: propagation cannot be claimed complete beyond the
registered consumers, and no surface is publicly corrected until its owner
implements and verifies the exact derivative.

Every weekly episode cycle runs the checker after premise selection and again
before recording/release using
`operations/checklists/weekly-claim-freshness-gate-template.md`. Due or blocked
claims, unresolved material signals and open consumer actions hold the affected
package. The site-wide scanner creates registration candidates; it is
discovery, not evidence or an automatic materiality ruling.

## Learner evidence and measurement

### Outcomes

Representative unfamiliar learners should be able to:

- explain the mechanism in their own words;
- distinguish it from named adjacent concepts;
- apply it to a new task or example;
- resist a representative misconception or misleading claim;
- qualify uncertainty and identify evidence that would change the conclusion;
  and
- choose the next useful experience without being routed to a hold,
  placeholder or duplicate.

### Evidence contract

Use version-bound assessments and a representative unfamiliar-learner sample.
Record aggregate outcome classes only. Do not collect raw prompts, private
work, names, email addresses, message bodies or sensitive learner content in
the ecosystem evidence.

Proposed privacy-safe properties are `concept_id`, `surface_id`,
`item_version`, `check_type`, `outcome_class`, `attempt_band` and
`new_or_returning`. These are proposals until accepted into the shared event
dictionary and wired. Current baseline: no shared comprehension or transfer
measurement exists.

Completion, watch/play, page load, quiz exhaustion or reward grant is not
transfer evidence.

## Experience and technical contract

- **Public routes:** none.
- **Owner-entry route:** permanent Codex task
  `019f9f7f-9e4c-72d2-8882-447bcbe01691`.
- **Canonical files:** this dossier, `concept-map.md`, `inventory.json`,
  `SOURCE-REGISTRY.json`, `PUBLICATION-PIPELINES.json`, `claim-register.json`, `freshness-signal-inbox.json`,
  intake/handoff/correction records created under this folder, and surface
  sources linked from those records.
- **Frontend/backend:** no public interface; local Node validation/report
  runner at `scripts/check-content-freshness.mjs`.
- **Identity/persistence/rewards:** none.
- **Privacy/safety:** source only public/project-approved evidence; keep
  private learner material out of records; escalate high-stakes content to the
  relevant safety/accuracy owner.
- **Reliability:** explicit evidence/status labels, stable IDs, schema
  validation, source dates, consumer/version identities and fail-closed
  routing.
- **Fallback:** if concept authority, currency or surface admission is
  unresolved, return `CAPTURED`, `HOLD`, `CORRECTION REQUIRED` or `OWNER
  DECISION REQUIRED`; do not invent a format or route.
- **Rollback:** restore the last accepted concept/inventory record and issue a
  correction transaction to consumers; never roll back by leaving consumers
  silently mixed.

There is no visual or diegetic interface in this function. Any future public
curriculum view requires a separate product decision, experience brief and
release cycle.

## Dependencies and ownership

- **Director:** Learning System & Concepts Director, permanent task above.
- **Decision owner:** Ali for mission, concept rulings with genuine editorial
  trade-offs and new public learning formats.
- **Upstream:** Ali ideas, locked decisions, primary/official evidence,
  learner evidence, weekly episode opportunity scans, surface corrections and
  freshness triggers.
- **Downstream:** LIBRAiRY, Classes, Weekly Episodes, NewsStand, tool, game,
  quiz, Study Pack and other learning-product owners.
- **Required specialists:** editorial-learning director,
  AI-research/accuracy, content freshness, UX/accessibility, analytics/VOC and
  safety/privacy as triggered.
- **Cross-product rule:** durable dossier records are the message bus. A direct
  task message is coordination, not canonical acceptance.

## Acceptance and current truth

Owner initialization passes only when:

- Charter, operating spec, state and backlog agree;
- task ID and no-public-route scope are explicit;
- concept-map and inventory authority are separated from surface
  publication authority;
- Ali's intake route and link/correct/update/extend/create/decline decision
  contract are visible;
- smallest current gaps have owner, status, trigger and evidence; and
- the targeted owner-entry preflight passes after Control Room binds the
  proposed registry row.

Current status is `SPECIFIED — REGISTRY-BOUND OWNER CONTRACT`. The existing
22 item-level records plus the 37-row High aggregate are a useful
2026-07-25 audit foundation, not a complete current cross-format inventory or
item-level content audit. Existing ECO-01 local evidence remains subject to
its recorded independent/native/newcomer gates and does not publish a book.

## Source trail

- D-2026-07-25-044, D-2026-07-25-045 and D-2026-07-26-051
- `operations/product-stewards/LEARNING-CONTENT-STANDARD.md`
- `operations/CONTENT-PUBLISHING-STANDARD.md`
- `operations/checklists/learning-content-intake-template.md`
- `operations/checklists/episode-opportunity-scan-template.md`
- `operations/weekly-engine-ingestion-map.md`
- Classes, LIBRAiRY and Weekly Episode owner dossiers/states
- `concept-map.md`, `inventory.json` and the 2026-07-25 audit/evidence packet
- BTB-087, BTB-088 and BTB-133 prevention rules
