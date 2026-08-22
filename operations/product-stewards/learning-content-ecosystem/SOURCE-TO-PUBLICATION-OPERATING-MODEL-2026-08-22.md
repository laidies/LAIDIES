# LAiDIES source-to-publication operating model

**Status:** PROPOSED SYSTEM FOR ALI REVIEW — NOT YET THE RUNNING EXECUTOR

**Ali-confirmed direction captured:** 2026-08-22

## The decision

Use one shared content-intelligence spine to turn current evidence into a
canonical concept decision, then dispatch compact destination-specific work
orders to the existing product owners. Do not create a permanent research,
writing, visual and review agent team for every book, article, class or
episode.

The shared spine owns verified evidence, concept identity, correction impact
and routing. Each destination owns its distinct treatment, production,
admission and release. Temporary craft specialists join only when the selected
artifact needs them.

## Why the existing system has not delivered this reliably

The repository already contains most of the intended policy: source-first
research, a concept map, format jobs, product champions, specialist guilds,
content work orders, independent gates and a twice-daily Learning executor.
Those records are not the same as a running conveyor belt.

Verified on 2026-08-22:

- the automation configuration still labels
  `laidies-learning-system-execution-recovery` as `ACTIVE` at 09:30 and 16:30;
- `executor-state.json` records its last heartbeat as
  `2026-08-11T23:01:32.936Z`; and
- `node scripts/check-learning-executor.mjs` fails with
  `EXECUTION_STALLED: heartbeat expired`.

The current failure is therefore not a shortage of agent names. It is a broken
operational bridge between source intake, routing, receiving ownership and the
next exact production action. Adding another agent roster would increase
context and produce more handoffs without repairing that bridge.

## The smallest complete system

```text
source signal
    ↓
1. evidence and claim record
    ↓
2. concept and correction owner
    ↓
3. destination routing decision
    ↓
4. one primary work order + any explicitly justified linked orders
    ↓
5. destination producer + only the specialists that artifact needs
    ↓
6. maker preflight → independent review → product-owner integration
    ↓
7. release candidate → deployment → public verification
    ↓
8. freshness monitor and correction fan-out to every registered consumer
```

### 1. Evidence and claim record

The source/accuracy function creates one compact, immutable evidence item. It
contains:

- exact original source, author/provider, date and access date;
- the exact relevant excerpt or bounded finding;
- individual claim IDs and whether each is fact, inference, opinion,
  disagreement, forecast or unknown;
- version, product, plan, region or other boundaries;
- confidence, limitations and conflicting evidence;
- recheck trigger and responsible freshness owner; and
- the reviewer who verified it.

AIDB, creators and social posts may trigger this record but cannot supply its
authority by themselves. This stage verifies the technical truth; it does not
draft public copy or silently edit an existing artifact.

### 2. Concept and correction owner

The Learning System compares the claim with the current concept map and
existing coverage. It records:

- the canonical concept owner;
- the reader's real question and prerequisite knowledge;
- the mechanism and adjacent concepts that must not be confused;
- whether this is new evidence, an update, a correction, an example or a
  duplicate;
- every existing consumer affected by a correction; and
- `LINK`, `CORRECT`, `UPDATE`, `EXTEND`, `CREATE`, `WATCH` or `DECLINE`.

This is one durable truth decision, not a new publication.

### 3. Destination routing

The router may select zero, one or several destinations, but every selected
surface must perform a different job:

| Destination | Distinct job |
| --- | --- |
| LIBRAiRY book or section | durable, revisable conceptual understanding and later lookup |
| NewsStand | what changed now, evidence, consequences, uncertainty and who it affects |
| Class | demonstration, controlled comparison, practice, diagnosis, feedback and transfer |
| Episode | human stakes, memorable narrative encounter and the concept operating in a situation |
| Tool | solve an immediate task while exposing the useful reasoning and limits |
| Game, quiz or Study Pack | retrieve, rehearse or apply an already ruled idea with meaningful feedback |

Several destinations do not mean several automatic commissions. The router
names one primary time-sensitive or dependency-leading treatment. Other
treatments become linked work orders only when they add a distinct learner job
and have an owner, trigger and priority. Otherwise they remain `LINK`, `WATCH`
or `NONE`.

### 4. Shared explanation brief, then destination adaptation

There should not be a generic “Hannah Fry and Richard Feynman agent” that
writes every format. Their methods are shared quality lenses, not a uniform
voice, template or permanent author.

Before drafting, the shared explanation brief binds:

- the source-supported mechanism, cause by cause;
- the human reason to care and the real question;
- the misconception or confusing boundary to repair;
- the familiar example and how it reconnects to the mechanism;
- an analogy and its limit, or an explicit decision that no analogy is clearer;
- the useful consequence, action and better next question;
- what may change and when it must be rechecked; and
- the exact destination job and expected depth.

The Hannah Fry lens asks whether the explanation earns curiosity, makes an
invisible mechanism concrete, moves accurately between familiar experience
and technical abstraction, preserves limits and consequences, and lands in a
useful next question without imitation or forced theatre.

The Feynman lens is enforced as a comprehension test: can the mechanism be
explained in plain language without hiding gaps behind jargon; can an
unfamiliar learner explain it back accurately; and can she apply it to a new
example? A simpler sentence that becomes technically false fails. Naming
Feynman or merely removing technical words proves nothing.

The destination producer then adapts that shared truth:

- a book makes it scannable, resumable and useful for both linear reading and
  exact lookup;
- a NewsStand editor makes it dated, consequential and explicit about what is
  known now;
- a class producer turns it into demonstration, practice, feedback and
  transfer;
- an episode producer turns it into a truthful story in which the mechanism
  creates stakes and an earned understanding; and
- a tool/game producer makes the user perform the relevant reasoning.

Shared facts and claim IDs may be reused. Public prose is independently
authored for its destination and is never copied automatically across formats.

### 5. Production and safe parallelism

One product champion owns the complete result. It creates a bounded build
packet and invokes only the temporary specialists required by the artifact:

- technical/accuracy;
- learning/editorial;
- visual teaching and image production;
- motion, narration, captions or video assembly;
- frontend, backend, identity/rewards or analytics; and
- accessibility, brand and release review.

Independent research, visual production, frontend work and accessibility
preparation may run in parallel only when their inputs are stable and their
write paths do not overlap. Dependency-linked work remains sequential. The
champion reconciles every result against the original destination brief before
integration.

### 6. Automatic state progression

Every transaction moves through one machine-readable state system:

```text
SIGNAL
→ VERIFIED_EVIDENCE
→ ROUTED
→ OWNER_ACCEPTED
→ PRODUCER_CONTRACT
→ CANDIDATE_BUILT
→ MAKER_PREFLIGHT_PASS
→ INDEPENDENT_REVIEW_PASS
→ RELEASE_CANDIDATE
→ DEPLOYED
→ PUBLICLY_VERIFIED
```

`WATCH`, `DUPLICATE`, `DECLINED`, `HELD`, `REJECTED`, `EXECUTION_STALLED` and
`SUPERSEDED` are honest terminal or waiting states. Each transition requires
the exact input/output identity and a named next owner. A routed order that is
not accepted by its receiving owner before its service limit becomes
`EXECUTION_STALLED`; it cannot remain labelled active.

The runner advances the next eligible stage automatically. It stops only when:

- required evidence is missing or contradictory;
- the exact producer or reviewer gate fails;
- a dependency or external service is unavailable;
- files or services would collide with live work;
- publication, spending, private-data access or another protected external
  action needs authority; or
- Ali must decide taste, premise, mission, public identity or a consequential
  product trade-off.

It does not stop to ask Ali to run a test, find a file, choose an ordinary
specialist, say “continue,” or route a routine handoff.

### 7. What Ali sees and controls

The Control Room should show only:

- the current primary order and stage;
- what moved since the previous run;
- who owns the next action and its deadline/recheck trigger;
- any failed gate and the exact repair underway;
- the public status separately from local/build/review/deploy status;
- one bounded decision when Ali is actually required; and
- improvement recommendations supported by evidence.

Ali communicates in the main operating task or the relevant guided product
walkthrough. The orchestrator converts that ordinary-language ruling into the
canonical product record and resumes the affected transaction. Ali should not
have to message each specialist or manage handoffs.

## Context-bloat prevention

Permanent ownership lives in compact durable files, not a permanently loaded
conversation. Each dispatched role receives only:

1. its short role card;
2. the exact current destination contract;
3. the evidence/claim IDs and only the relevant excerpts;
4. the exact artifact or paths it owns;
5. applicable approved and rejected exemplar IDs;
6. acceptance/rejection conditions; and
7. its required output schema and next recipient.

The task packet must not paste the entire repository, workbook, decision
history, other product dossiers or every guild instruction. Older sources are
retrievable evidence only. A current packet may point to them when a specific
question requires them.

Every authority-bearing record needs a status and successor link. Superseded
records leave the active packet and cannot be loaded by default. Rejected
artifacts stay in a guarded registry/quarantine for prevention but are removed
from active selectors and production search paths. Work orders store IDs and
links to immutable evidence rather than copying long prose between agents.

## Example: one model change, several possible surfaces

1. A provider announces a change to model context length, access or price.
2. Accuracy verifies the exact provider/version/plan/region claim, checks
   independent evidence where consequential and creates claim IDs.
3. Learning finds the existing context-window concept and every consumer.
4. NewsStand becomes the primary order if the change matters now: what changed,
   who is affected, what to test and what remains uncertain.
5. The relevant AI Fundamentals section receives a linked impact order only if
   its durable explanation, product-specific example or freshness note must
   change.
6. A class is proposed only if learners need a new controlled comparison or
   practice task. An Episode is proposed only if it creates a distinct
   memorable story and not another explanation of the same job.
7. Every treatment binds the same claim IDs but has its own prose, visuals,
   review, release and correction state.
8. If the provider later corrects the announcement, the claim version changes
   and every registered consumer must record `UPDATED`, `HELD`, `SUPERSEDED` or
   `UNAFFECTED`; no page changes silently.

## Implementation order

1. **Reconcile the existing executor.** Determine why the configured active
   heartbeat has produced no durable heartbeat since August 11. Mark every
   conflicting `ACTIVE` claim stale until a real cycle succeeds.
2. **Create one compact transaction schema.** Bind evidence IDs, concept owner,
   routing, primary order, linked impacts, state, next owner and deadlines in
   one record rather than several prose handoffs.
3. **Repair receiving-owner dispatch.** A routed order must become a live owned
   action, a named wait, or a terminal disposition within its service limit.
4. **Pilot one real source transaction.** Use one small current source with one
   primary destination and at most one justified linked destination. Prove the
   pipeline can fail, repair and resume without Ali saying “continue.”
5. **Add the compact Control Room view and exception notification.** Do not
   scale until the pilot is publicly verified or truthfully declined.
6. **Scale by destination adapter.** Reuse the shared spine and add only the
   format-specific producer/review steps needed for Library, NewsStand,
   Classes, Episodes, tools and games.

## Acceptance conditions for calling the system operational

The system is not operational because this document, an agent roster, a queue
row or an automation configuration exists. It becomes operational only when a
real source transaction proves:

1. trigger capture and exact evidence verification;
2. deduplication, concept ownership and distinct surface routing;
3. receiving-owner acceptance without Ali prompting;
4. automatic advancement through a real production or terminal disposition;
5. maker/judge separation and a calibrated gate that rejects known-bad input;
6. exact local, review, deployment and public statuses kept separate;
7. a compact Ali exception/decision message when genuinely required; and
8. correction or freshness fan-out to every registered consumer.
