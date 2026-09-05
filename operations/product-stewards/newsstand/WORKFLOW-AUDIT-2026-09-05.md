# NewsStand workflow audit and editorial recommendations

Date: September 5, 2026, America/Vancouver. Tier 2 internal audit.

Implementation update: the recovery scheduling repair and the AIDB discovery guard described below are VERIFIED LOCALLY. Other audit findings remain a baseline or proposed work unless explicitly updated. The running automation and public newspaper have not adopted these local patches.

**Verdict: ADAPT.** Keep the existing newspaper, seven story types, ordinary-news autonomy, exact-content review, source controls, original dates and scoped publication process. Repair the parts that mistake a complete record for a useful article, broaden discovery, and give Weekly and the service desks a dependable production cycle. More features will increase the maintenance burden unless those foundations work.

Ali's reader promise and new feature directions are recorded in [NEWSSTAND-EDITORIAL-PROMISE-2026-09-05.md](NEWSSTAND-EDITORIAL-PROMISE-2026-09-05.md). Those are DECIDED purpose or explicitly CAPTURED directions. Changes, names, cadences and experiments below are PROPOSED unless individually marked implemented. The original audit changed internal records only; subsequent local helper repairs do not establish scheduler adoption or public results.

## What was inspected and what that proves

The audit followed current authority beyond the preservation-sensitive iCloud checkout. The current September 5 research worktree is `/private/tmp/laidies-newsstand-cycle-20260905.WBY0n4`, commit `8c426fac4b47ed7ffb9433939b0ddfac78f4e93b`. Its ancestry includes the recovery changes (`95eea207`), story modules (`943d7cc7`), reader translation changes (`308e7b17`) and September 4 public correction records. Unless otherwise stated, relative implementation references below belong to that base, which this audit branch preserves in Git.

Read-only inspection covered the current runbook, policy, discovery records and cursor, candidate/review contracts, story modules, recovery code, service preparation, canonical stories, prior release records, the active automation configuration and its target task's September 5 completed run. The older iCloud checkout was not edited. A bounded independent reading lane informed the synthesis; its suggestions were reconciled against current code, live articles and Ali's latest distinctions between Weekly, Front PAiGE and Big Picture.

Live browser observations on September 5 covered [NewsStand](https://laidies.ai/newsstand), its corrected Astra article, the [retained Weekly](https://laidies.ai/newsstand#weekly-accountable-systems-2026-08-24), and [LUMINAiRY](https://laidies.ai/luminairy). A live web check of [AIDB](https://www.aidailybrief.ai/) confirmed the September 5 masthead alongside the September 3 complete edition; a page's masthead date is not its newest complete reporting edition. These checks establish the displayed content and destinations at inspection time, not a new factual review of every underlying claim or proof of ongoing scheduler reliability.

Four existing focused suites passed, including deliberately rejected fixtures: `test-newsstand-story-type-coverage.mjs`, `test-newsstand-story-recovery.mjs`, `test-select-aidb-edition.mjs`, and `test-newsstand-model-release-utility.mjs`. Additional pure, in-memory probes exposed the gaps below without changing candidates, state or public files. No full release, accessibility admission, new reader study or end-to-end unattended publication was run. No credible longitudinal failure rate or coverage percentage can be inferred from this bounded audit.

## Ranked findings

### 1. Coverage is narrower than the desk labels suggest — certain

The September 4 research ledger explicitly reports missing permanent legal/accountability, medical/public-benefit, security-reporting and industry-critical routes. September 5 marks those desks considered using provider indexes, existing watches and AIDB's caveats. That is useful intake, but it cannot establish that independent investigations, clinical advances or criticism were comprehensively checked. A company has no duty to publish the strongest investigation of itself.

Evidence: `operations/agents/aidb-intelligence-desk/daily/2026-09-04.md:84–104` and `2026-09-05.md:74–89`. AIDB remains a scout, not authority. Its new late-edition/backfill selector is a good correction and passed the focused tests; retain it.

**Change:** create a NewsStand-owned coverage ledger that reconciles all due source families before selection. Include provider releases; independent reported news and investigations; public authorities/courts/regulators; research and reproducibility; medicine/STEM and public benefit; work, access and inequality; practical tools; and criticism. Match primary evidence to the claim: a vendor document can establish what was announced, but cannot independently establish superiority, clinical benefit or a disputed incident account. Record unavailable sources as coverage gaps. Maintain an explicit disposition for every consequential headline considered, including relevant stories the newspaper did not commission.

This does not mean reproducing every mainstream headline or filling every desk daily. Cluster duplicates, assess consequence, and make the omission reviewable. Quiet days remain valid; unchecked coverage and unresolved held material must not be labelled quiet.

**September 5 live follow-up — confirmed channel lag, locally repaired status.**
The [AIDB website](https://www.aidailybrief.ai/) still leads with September 3,
but its publisher-linked [Apple Podcasts listing](https://podcasts.apple.com/us/podcast/the-ai-daily-brief-artificial-intelligence-news/id1680633614)
has a newer episode, “How AI Changed This Summer,” released September 4 at
20:03 UTC / 13:03 Vancouver. The September 5 morning inventory omitted it.
This is a discovery omission, not evidence that its full contents were
available on the website. The podcast description was inspected; the full
episode remains unreviewed. The daily ledger now carries a correction and a
separate supplement preserves the new pending item without rewriting the
original inventory or advancing the cursor.

The old selector also returned QUIET for an explicitly incomplete released
episode. A new regression test reproduced that wrong result. The local repair
exposes pending episodes and missing website/podcast reconciliation, checks that
observed release URLs reach inventory, and permits useful complete work to
proceed alongside a gap. Legacy arrays cannot certify quiet. Thirteen focused
cases pass, including the real release metadata and rejection calibrations;
independent Terra code review found no blocking defect within this scope. The
supplement returns `HOLD_AIDB_RELEASE_REVIEW`, one pending episode, two honest
PARTIAL channel checks and `quietAllowed:false`. It is a focused audit supplement,
not a completed rolling-week source run. Validation checks the recorded inputs;
it cannot establish that a feed was actually read or an article understood.

The external spot check also found a [September 4 agent-board research
report](https://collusion.wiki/) with independent Reuters coverage and a
[September 1 Nature research lead](https://www.nature.com/articles/d41586-026-02609-y)
without exact matches in the inspected September 1–5 intake/canonical coverage.
They are now explicit research leads in the existing September 5 intake. The
agent report is preliminary and requires careful attribution; the underlying
genome study was not read. Conversely, Fable/Mythos was already covered, and the
Nvidia/Hugging Face acquisition claim was already an evidence hold. Discovery,
verification and duplicate suppression must be measured separately. This small
sample establishes specific gaps, not a headline coverage percentage.

**Timing direction captured, not activated.** Ali proposed end-of-day preparation
for next-day publication to incorporate AIDB's treatment. Recommend 20:00
Vancouver main research/private drafting and the existing 07:00 morning delta,
with independent headlines checked in both phases. The runbook specifies late
releases, missed-evening recovery, unchanged-prose reuse and honest publication
dates. The active automation remains 07:00 only and still needs to adopt the
local fixes. Next: complete the real rolling-week reconciliation and missing
independent reporting routes, adopt the fixed inputs in that existing automation,
then prove a paired run. An evening schedule alone cannot fix a lagging website,
missing source family, unheard episode or unresolved publication hold.

### Research reuse and Ali-facing internal guidance — September 5 follow-up

The existing Learning System freshness route is the right shared mechanism;
do not create a competing research database. Its current claim register contains
five claims and 25 consumer references, updated August 5; its signal inbox had
only two entries, last updated July 30. Both files are byte-identical between
the September 5 complete source worktree and the iCloud Website-homepage copy.
This is not sufficient coverage of the newer books or September news research.

The current `check-content-freshness.mjs --as-of 2026-09-05 --strict` run exited
1 with `CONTENT FRESHNESS HOLD`: five registered claims, 25 consumers, one due
claim, ten open consumer actions, one unmatched signal, 4,504 scanner candidates
and three validation errors. All three errors are references to the absent
legacy `content/library-books/rendered/concepts-101.html`. They establish stale
registry references in that source tree, not three broken public URLs. Scanner
candidates are text requiring review, not 4,504 proven false claims. This was a
read-only baseline; no report was written into the source repository. The gate
also uses matched material signals in its release-hold decision; unmatched
signals are reported but do not themselves hold an otherwise clear evaluated
set. Claim mapping remains necessary before claiming affected-content coverage.

The September 3 loop material already has a relevant AI Fundamentals 101
Chapter 15 treatment, including stopping conditions and budgets. Its smallest
possible reuse is a better example or link, subject to exact comparison and
current product guidance. New model releases instead trigger review of specific
model/access/privacy/instruction claims; they do not automatically invalidate
the foundations. Two OPEN review requests are now recorded in the existing
freshness inbox for those distinct jobs. They retain unmatched status and
receiving-owner actions. No canonical claim was accepted and no book or public
derivative was edited or recertified. The full correction path must include
rendered chapters, reference/search answers and affected lessons, practice and
media, with one explicit disposition and verification per actual consumer.

Internal research has three different statuses: bounded goals, caps and role
separation already exist in LAiDIES' operating contract; complete source-item
dispositions have been applied, with the new channel guard only local; and
personal benchmarks for recurring LAiDIES tasks remain an untested proposal.
The existing September 5 editorial intake now records those statuses and next
actions explicitly. No comparative model test or new routing/framework change
was performed in this follow-up.

Automatic surfacing is not assured. The NewsStand heartbeat's actual
notification policy is `failed_runs_only`; the Control Room twice-daily
dispatcher is PAUSED. The inspected recent records contain internal hypotheses
without a demonstrated receiving-owner delivery. The runbook now requires a
compact impact brief covering site actions, internal changes, holds and any
concrete Ali decision, while keeping unchanged cycles quiet. That is a specified
delivery requirement, not a changed schedule, resumed dispatcher or verified
notification. Do not reopen the whole Control Room merely to deliver this brief.

### 2. Reader understanding is partly checked as paperwork — certain

The first published Astra piece passed review and subsequently needed a reader-fit correction for missing identity, range, task fit and comparison. The corrected live article includes those answers. That is evidence of a repaired article and an earlier evaluation miss, not evidence that all future stories now meet the reader promise.

The current coverage validator checks that reporting answers are sufficiently long and distinct. It checks four declared explanation sentences and definitions occur somewhere in the prose. It does not establish that all substantive answers reach the article, definitions appear before the reader needs them, the explanation preserves causality, or the selected type fits the story.

The in-memory probe supplied the `company-business` module with actual display topics `model releases` and `safety and security`, sufficiently long distinct answers, and an article missing its type-specific answers. The validator returned `[]` — no errors. Using its recognized `medical` topic correctly rejected the wrong type. Real topic labels and the contract's exact IDs do not consistently match. This is a coverage-helper gap, not proof that the entire public admission chain can be bypassed.

Evidence: `scripts/validate-newsstand-story-type-coverage.mjs:81–139`; `story-type-modules.json`; `evidence/astra-reader-fit-correction-2026-09-04.md` under the NewsStand steward; and the corrected public article.

**Change:** normalize governed topic IDs at the boundary; require every material answer to point to its supporting evidence and location in the actual article. Let an independent reviewer classify the story and inspect the article before seeing the maker's answers. Have that reviewer explain the mechanism and apply it to a different realistic case. Keep this honestly labelled AI analysis; sampled human reading is a separate source of evidence. Do not turn all reporting questions into visible repetitive headings. Permit a justified 'not relevant' instead of forcing a tip, analogy or newly introduced jargon into every item.

### 3. Weekly persists correctly but does not fulfil the new reader promise — certain for the inspected article

The public Weekly remained dated August 26, updated/checked September 1, while the newspaper said Weekly and Big Picture were current on September 5. The body was a short thematic synthesis naming several developments without individually explaining their key messages. Its Class Notes text did not provide an actual learning link. Some listed sources were not developed in the narrative. A reader who missed the daily coverage could not recover the biggest stories of the current covered week from that text alone.

Persistence itself is correct: Wednesday is a review cadence, not an automatic expiry. The failure is treating retained content as sufficient evidence of fresh weekly coverage.

**Change:** give Weekly its own commissioning and admission branch. Use an explicit coverage window and a short, ranked set of the week's consequential stories. For each: what happened, the minimum mechanism needed to understand it, why it matters, what remains uncertain, and a link to the full article or original evidence. Then explain the pattern connecting them where one exists. Compare with the prior Weekly and ask what changed. A news item need not already have a Daily article to deserve a properly sourced Weekly explanation. Preserve the previous edition until its successor is admitted; label its actual dates honestly and stop claiming newly current coverage solely because it remains selected.

Front PAiGE retains a different job: an especially relevant interest feature that earns its place and need not rotate to a calendar. Do not force Weekly into supporting an existing Front PAiGE thesis, or require every Front PAiGE to derive from Big Picture.

### 4. Recovery can preserve a story while still choosing the wrong next action — certain at helper level

Existing recovery usefully prevents silently discarding repairable stories, rejects repeat review of unchanged prose, and escalates a repeated defect to producer/checker repair. Keep these properties.

However, a test queue containing `EVIDENCE_BLOCKED`, `newEvidenceAvailable:false` and a future `nextCheckAt` still selected that story as `ACTIVE_RECOVERY_MUST_CONTINUE`. Selection does not use the due date or evidence signal, and sorts status before consequence. Separately, `completePublication` accepted a syntactically valid but invented deployment receipt with arbitrary HTTPS origins, a hash and true booleans, and returned `PUBLISHED_VERIFIED`. It does not itself bind the candidate to the public issue/manifest or read verification evidence. No fake receipt was saved or used to publish. Other release controls exist; this finding concerns the tracker falsely certifying its own state.

Evidence: `scripts/advance-newsstand-story-recovery.mjs:103–125`; `story-recovery-policy.json`.

**Change:** select due, actionable recovery by consequence and age; preserve evidence-held work without letting it monopolize unrelated news. Require publication state to consume the exact admitted candidate membership, issue, full artifact manifest and verified custom/immutable results. Reject stale, unrelated, forged or merely self-asserted completion evidence.

Another governance conflict needs explicit correction: `scripts/check-prose-quality-admission.mjs:294–305` requires both review issues and cycles to be strictly less than the prior comparable. A clean predecessor at zero cannot be improved below zero; a successor also cannot reduce cumulative review cycles. **Proposed policy change, not implemented:** retain zero known defects as a release condition, allow sustained first-pass quality, and measure improvement across comparable batches rather than demand impossible arithmetic for every successor. Keep the ban on repeating a known defect.

### 5. The service bank is held, and a successful command exit conceals that distinction — certain

The read-only September 5 service preparation check returned:

```text
SERVICE BANK CHECK HOLD date=2026-09-05 isolated_from_ordinary_news=true proposal_created=false public_write=false reason="mme-jelly-sandal review chain failed: producer:calibration registrySha256 is stale; independent:calibration registrySha256 is stale"
```

It exited 0 because service failure is deliberately isolated from ordinary news. The isolation is correct. A monitor that equates exit 0 with all desks healthy would miss the service failure. The live newspaper carried several August 30 services and a September 2 Corner Office entry. Age alone does not make those items wrong; the observed blocker shows that reliable replenishment has not been established.

**Change:** refresh the affected evidence through its proper review path and report lane status separately from process success. Partition eligibility by entry and its actual dependencies so an unrelated unusable entry does not automatically prevent all valid services from being considered. Do not ignore an updated shared defect registry: recheck every genuinely affected entry. Keep original dates, source checks and reuse history. Maintain a modest reviewed reserve and alert on depleted or overdue desks rather than manufacture filler.

### 6. Execution exists, but its source/state/release handoffs remain fragmented — certain; reliability impact is likely

The existing automation is ACTIVE and a September 5 run completed in its target task. Its prompt bootstraps through the August 30 runbook and explicitly requires newer recovery and reporting commits. Claims that there is no active schedule or that it blindly runs only August 30 logic would be inaccurate. The old paused dispatcher is a different mechanism.

Nevertheless, bootstrapping, current code, source cursor, per-day records, summary state and release artifacts span several worktrees. September 4 initially could not release a partial reconstruction because the complete current production artifact was missing; a later record shows that blocker was resolved and the corrected article was publicly verified. The latest AIDB cursor correction also demonstrates that a human-readable 'read' record and the machine's cursor can diverge.

**Change:** retain isolated execution worktrees, but resolve them from one versioned release manifest and one reconciled operational state source. Save the complete deployed artifact in durable storage, not solely a temporary directory. Advance the exact transcript cursor atomically with the reconciled item ledger. Record actual source, review and publication timestamps. Preserve the existing authorization and quiet-notification intent; do not create a second competing automation.

## Target workflow

1. **Reconcile and scan.** Resolve current code, production identity and pending work. Check due source families and urgent corrections before committing the writing slot. Process the newest complete unprocessed AIDB edition even if its date precedes today; retain a rolling catch-up window and transcript-change detection.
2. **Select deliberately.** Cluster the same event across sources. Rank consequence, relevance, evidence and timeliness; consider omitted major headlines and overlooked public-interest work. Choose one primary production story while preserving other candidates and due recovery. An urgent safety or accountability development can pre-empt a routine launch.
3. **Build the reporting packet.** Bind the reader's real question and payoff; confirmed claims and source excerpts; disputed/unknown claims; one primary type and necessary overlays; likely misconceptions; mechanism; affected people; exact learning destinations; and a useful action when earned. Give uncertain claims a disposition, not cosmetic softer wording.
4. **Draft and self-check.** Write a connected article that works alone. Explain meaning at first use, including who a named company/product/person is where needed. Make an earned memory connection and return to the real mechanism. Remove objective errors before independent review.
5. **Review the artifact.** One required maker-independent combined factual/editorial review of the exact candidate. Conditional specialist review serves a real medical, legal, security or methodological issue; a second generic review is not a default. Inspect the headline and actual prose first, then reconcile evidence. Explain-back and a different-case application must be concrete observations, not tick boxes.
6. **Repair or hold precisely.** Repair the failed requirement, not the entire article by habit. Same defect twice triggers producer/checker repair. Await unavailable evidence with an owner and due trigger; move unrelated ready work forward. If evidence supports a narrower useful account, publish only that bounded account under normal gates. Do not promise eventual publication of a story that may never be substantiated.
7. **Admit and publish.** A first valid independent pass moves to exact-issue admission without optional review churn. Build from the current full production artifact, preserve unrelated bytes, verify changed routes and both public origins, and only then record publication. Do not confuse a process exit, commit or tracker label with public truth.
8. **Follow through.** Watch disputed claims, changed tool guidance and material corrections. Revisit dependencies when evidence changes even if prose has not. Feed actual defects into prevention. Record themes and service opportunities as the work produces them.

Proposed retry discipline: two bounded retries for transient retrieval failures, with increasing delays; record a source gap if unsuccessful. Within a cycle, preserve a compute/time budget and checkpoint unresolved work rather than loop indefinitely. A story-specific evidence hold should have a named next check; repeated infrastructure failure, an overdue critical correction or two consecutive due runs with the same unresolved system defect should create one actionable escalation. No notification is needed for every unchanged watch item. Exact thresholds should be tuned from actual runs, not represented as measured service levels.

## Keep the seven reporting modules, with proportional questions

| Existing story type | What the reader must be able to understand |
|---|---|
| Model/tool release | What it is; where it fits in the product range; what changed; useful tasks and unsuitable tasks; nearest alternatives; actual access, cost and limits; vendor claim versus independently established result. |
| Research/benchmark | The question and method; what the test measured; comparison and sample; result and uncertainty; replication/sponsor limits; what it does and does not imply about real work. |
| Safety incident | What happened; confirmed versus alleged; affected people; mechanism and failed control; responsibility; remedy and what still needs investigation. |
| Legal/policy | Jurisdiction, proposal versus enacted rule versus ruling, affected parties, what changes now, what remains contested, and the next decision/date. |
| Health/science | Exact AI and human roles; simulation/lab/animal/clinical/deployed stage; comparator and measured benefit; errors and access; what further validation is needed. 'Impossible without AI' requires specific supporting evidence. |
| Work/economy | Which workers and tasks; observed scale versus forecast; distribution of gains/costs; power and access; realistic choices for readers and institutions. |
| Company/business | What changed; why it matters; who pays, benefits and bears risk; business incentives; customer effects; substantiated numbers. |

Use overlays when a launch also changes safety or access, or research becomes medical advice. Misleading coverage is a reporting move across types: identify the exact framing, explain what the evidence shows, show the missing mechanism, and explain the consequence of the difference. It is not permission to assume the mainstream is wrong. The existing OpenAI/Hugging Face packet explicitly separated earlier agent notes from the investigated incident; verify primary evidence before combining that with the message-board evolution Ali wants explored.

## Make the learning memorable without flattening the reporting

Use the Hannah Fry benchmark's communication mechanics in LAiDIES' own voice: start with a human question, make an invisible process observable, explain cause and effect, earn the click, and land with something precise or funny. A smart beginner should never have to know the term to understand its definition.

A Rewind Era connection earns its place when it helps recall a particular relationship. The writer should name that relationship, map the familiar detail to the real process and retain the limit. Ali's remembered Scream/synthetic-data connection is a useful qualitative signal; it is not evidence that every joke improves learning. Do not force nostalgia into harm reporting or turn an analogy into the whole explanation.

Explain the needed concept inside the article. Then offer a small number of exact links labelled by the learning payoff, including admitted chapters, concepts and relevant LUMINAiRY profiles. Verify the real destination and anchor; a local file's existence is insufficient. If no resource exists, explain it now and record a learning need. Keep internal evidence fields out of the reader's experience.

For Big Picture, maintain a compact theme bank containing the question, supporting and contradicting developments, affected groups, mechanisms, gaps and what new evidence would make commissioning worthwhile. Front PAiGE can draw on that bank when it has a distinct, timely human interest. Neither needs a compulsory publication quota.

The data-centre article has useful mechanisms, public-interest questions and attention to accountability. Its next improvement would be one concrete proposal followed through electricity, water, costs, promises and enforcement, with clear comparisons between conditions, alternative sites/scales and not proceeding. Evaluate each solution's owner, evidence, cost, enforceability and remaining harm. Connect any scientific-benefit argument to demonstrated work and actual access arrangements; a hypothetical benefit cannot settle a local cost dispute. This is an editorial recommendation, not a new factual review or approval of a rewritten article.

## Existing columns: give each a distinct job and replenishment rule

| Desk | Reader payoff | Proposed maintenance |
|---|---|---|
| Dear Miss Jeeves | One recognizable question or friction, the direct answer, why it works, and the next useful step. Tool claims need current surface/access evidence. | Check relevance each edition; commission from real reader questions, repeated confusion and changes in tools. Preserve the existing Miss Jeeves/FAiRY product boundaries rather than inventing a new assistant role. |
| Corner Office | A real non-AI workplace situation, words to say, why that approach helps, and a follow-up if the first attempt fails. | Maintain a varied reserve covering credit, pay, promotion, boundaries and difficult conversations. Do not replace it with AI prompts. |
| Concept of the Week | One concept needed to understand recent coverage, a faithful memorable example and a small new case the reader can solve. | Consider a successor on Wednesday; preserve current dates until admitted. Avoid repeating a term merely because it fits a puzzle. |
| Paige / practical tips | A useful task, realistic steps, expected result, limits and what to check. | Verify volatile instructions at commissioning and reuse. Distinguish hands-on testing from advice supported by documentation. |
| What's New / discovery | One real, available LAiDIES destination and what the reader can get from it. | Check the visitor journey and remove expired announcements. Do not advertise a held prototype. |

An initial operating experiment could replenish Jeeves and Corner Office twice weekly, select Concept on Wednesday, and keep two or three eligible rotations in reserve. These are proposed production targets, not promises to date-stamp a replacement regardless of quality. Every entry needs an owner, source-check date, relevance trigger, expiry/review rule where appropriate, last use and destination. Evergreen material can remain useful; volatile instructions need event-driven rechecks. Do not equate article age with correctness or newly written copy with freshness.

### September 5 clarification: follow content all the way into the newspaper

Ali explicitly reiterated that Corner Office, Paige's Tip and Concept of the Week need proper updating **and surfacing**. The editorial promise now makes their recurring assessment and follow-through mandatory. This supersedes optional treatment as a purpose requirement; the executable runbook has not yet been changed.

The follow-up inspection found a specific handoff gap. `editorial-intake/2026-09-05.md:3–14` banks a loop-versus-schedule idea and names Concept and Paige as possible treatments, with status `BANKED / NO PUBLIC COPY`. `scripts/prepare-newsstand-service-bank.mjs:224–235` reads the service bank and dated columns, not that intake. A useful banked note can therefore remain outside production. Once admitted material enters an issue, `scripts/build-newsstand-derivatives.mjs:119–151` does bind service records into downstream discovery. The runbook still calls service rotation optional at lines 93–101.

Proposed completion rule: every relevant intake gets a named primary desk, a distinct payoff and a disposition such as commissioned, merged into a named item, already covered, rejected, or held with owner and next check. 'Admitted to bank' requires actual content review; it cannot be inferred from the intake label. Each cycle checks the three desks and reserves bounded production capacity for due service work. A blocked headline must not prevent an otherwise admitted service-only update through the existing issue/publication path; implementation must prove that path before calling it supported. Likewise a blocked service does not stop unrelated news.

For a column update, acceptance follows the selected item through bank → admitted dated issue → card → full reader → archive/catch-up. Check record identity, full body, dates, source and learning destinations, repeat-use history, and correction propagation. Select new content only when due and useful; if retaining an eligible incumbent, keep its original date and record why. Alert on a missed due action or depleted eligible reserve instead of repeatedly recording an unchanged bank check.

Live follow-up: all three cards were visible in 'Useful this week' at `https://laidies.ai/newsstand`. Opening each showed its full column: Paige's meeting follow-up (August 30), Corner Office's conflicting priorities (September 2), and Concept's context explanation (August 30). Return-to-paper worked between the columns. The independent read-only lane also ran `test-newsstand-service-reader.mjs`: full-body and eight-slot checks passed, including rejection of candidate, expired and orphaned records. These checks establish the inspected current card-to-reader paths, not fresh replenishment, full factual re-review, linked-destination usability, mobile layout, or a new service-only publication. Those remain explicit implementation/verification work.

## New features worth piloting

Names below are working concepts. Start with one rotating Saint slot, one people slot and one short learning game. Occasional house advertisements can connect them to the town. Do not add every idea as a permanent section.

### PATRON SAiNTS: one lesson, one move to pass on

Show the Saint, the canonical teaching message, one small real application, and two clear destinations: listen to the available song and visit the exact LUMINAiRY card. A relevant community invitation can be a third link when the actual room and experience are ready.

For Sister Mary Clarence, the useful move is to share a method another woman can adapt: the task, how it was approached, what failed, what to check and where human judgment mattered. Invite someone else to improve it. That makes the chorus/community message concrete and connects learning with helping another woman gain capability. It should not become a generic inspirational quote or an instruction to upload private work.

The live LUMINAiRY card already calls her the Choir Director, assigns Teaching, and explains making the method usable by someone else. The card and song control were observed; audio playback was not tested. Some other songs are deferred, so the slot must respect per-person availability. Do not change Saint lanes or portray LAiDIES' interpretation as a character's endorsement.

### MAiVENS and TRAiLBLAZERS: “Because of Her”

A short feature connects a specific contribution to an ordinary experience: what she contributed, what that helped enable, where the reader encounters it, and a concept that becomes clearer through her work. Credit teams and predecessors; avoid a false lone-genius claim or a simplistic 'one person invented everything you use' chain.

For a living person, add what she is doing now and one current, worthwhile appearance, publication or project with its actual date and access limits. A generic social-profile link is not itself recent work. For a historical person, offer a strong archive/resource and explain the continuing legacy. Link to the exact LUMINAiRY profile. Preserve canonical wing membership: living status alone does not define the wing.

Hannah Fry could make an especially relevant explanation feature: help the reader notice the way an ordinary situation reveals a technical mechanism, then try explaining a concept to someone else. Her profile already contains media destinations; verify the selected item, publication date and availability before commissioning a 'watch/listen now' recommendation. This audit does not certify those programmes as current or playable.

### A small games desk with feedback that teaches

| Working concept | The enjoyable interaction | What it teaches and how to keep it honest |
|---|---|---|
| **The Headline Detective** | Inspect a short headline and choose which part is demonstrated, promised or still assumed. Reveal the missing context. | Evidence levels, scope and reading beyond framing. Avoid simple true/false where the evidence is mixed; identify invented practice headlines as fictional before showing them. |
| **The SUNNYVAiLE Misprint** | Find the planted problem in a mock newspaper snippet: a denominator, unsupported citation, hidden paid-tier condition or confident leap. | One practical verification habit, followed by the corrected interpretation and source. The fictional exercise must never be mistaken for reporting. |
| **Help Wanted in SUNNYVAiLE** | Take a short town job and choose what to give AI, what permission to allow and what a person should check. | Transfer from a taught concept to a different task. Explain the consequence of each choice; use synthetic practice information. |
| **The Mixtape Test** | Pick an order for three or four task steps, then see where one missing check changes the result. | Workflow and judgment, rather than collecting clever prompt slogans. The era reference serves the sequencing idea. |
| **The advice has changed** | Compare a familiar old tip with the current situation and decide when each still applies. | Freshness and context. Date and source the guidance; don't declare an older technique obsolete solely to make a reveal. |
| **Mini crossword** | A small, optional puzzle using concepts encountered that week, with reveal/check controls and explanations. | Vocabulary retrieval followed by meaning and use. Avoid obscure-name trivia, speed pressure and clues that require prior technical knowledge. |

Reuse the existing crossword work before commissioning a replacement. The current runbook explicitly says its candidate still needs native assistive-technology review. A puzzle route or passing browser script is not that admission. Require usable keyboard/screen-reader interaction and a non-grid equivalent; learning feedback must remain available when the reader reveals an answer.

One thoughtful interaction is sufficient for a first edition. Next-day recall or success with a different case is a more meaningful learning signal than completing the grid or collecting points.

### Fictional ads and a town noticeboard

Use occasional visibly fictional SUNNYVAiLE classifieds to reinforce an idea or reveal a real destination. Possible concepts include a 'lost citation' notice that teaches source checking; a town repair service that demonstrates improving a vague brief; or a tape-counter-style recommendation connecting this week's concept to an existing lesson. These are internal creative directions, not approved advertisements or claims that those businesses exist.

Label fictional material before its premise can be mistaken for fact. Label promotions of real LAiDIES resources as house advertisements and show the actual benefit and destination. Never invent availability, fake reader testimonials, pretend urgency, endorsements or offers. A town noticeboard can surface real chat-room events, new learning and useful community contributions when those exist and the applicable consent/moderation rules are met. An empty noticeboard should not be filled with fictional members or conversations.

## Implementation order and acceptance

These changes should extend the existing pipeline. They are not a proposed rebuild or a new daily approval burden for Ali.

1. **Make status and recovery truthful.** Normalize topic bindings; repair due recovery selection and publication identity binding; separately expose service HOLD; resolve the impossible ratchet through the governing policy. Add negative fixtures for the exact observed gaps. Preserve existing review, source and public-release protections.
2. **Broaden discovery and unify handoffs.** Establish the missing independent source routes, coverage dispositions, atomic AIDB cursor/ledger update and durable full-artifact reference. Resolve the current automation through that authority. Exercise late editions, changed transcripts, unavailable sources and an urgent story arriving during carryover.
3. **Prove one complete editorial cycle.** Run a representative mixed-type article through sourcing, plain explanation, a useful concept link, independent review and existing release checks. Run a Weekly successor that makes sense without prior Daily reading. Fix the maker when either fails; do not build a larger output queue on a weak example.
4. **Restore service replenishment.** Repair affected reviews, check each desk independently, populate a small eligible reserve and verify real reading journeys. Retained dates and unavailable states must stay honest.
5. **Pilot the additions.** One Saint, one MAiVEN/TRAiLBLAZER and one game; use a real working destination for an occasional house ad. Complete applicable content/accessibility review before any public use. Expand only when usefulness and maintenance capacity justify it.

Suggested evaluation window: two weekly cycles, including two Wednesdays, with production logs and a small consented sample of readers. Proposed acceptance measures:

- Every due source family has a completed check or explicit gap; every independently sampled consequential headline has an inclusion, watch or rejection disposition. Measure discovery delay against an external sample, not just the stories the system already found. Do not claim 'all main headlines' from the number of issued articles.
- Every material published claim is supported at its stated scope and freshness; every correction has an owner, discovery time and correction time. A claim-count score must not hide one serious unsupported statement.
- Every sampled article can be accurately explained back and applied to a different case without importing missing knowledge. Report actual reader observations separately from AI assessments. Track useful learning navigation, optional helpfulness feedback and later recall; clicks and time on page alone cannot prove learning.
- No known defect repeats after its preventive correction; no unchanged complete candidate receives an optional duplicate review. A clean first pass is allowed to remain clean. Measure median and slowest ordinary source-to-publication times and distinguish reporting, review, evidence and release delays.
- Each Weekly identifies its actual coverage window, explains its selected stories and states what changed since the prior edition. A held successor cannot silently generate a freshness badge.
- Every displayed service is eligible, useful for its desk and honestly dated; every advertised destination and selected media route works at publication. Track overdue rechecks, depleted reserves and repetition rather than force daily novelty.
- A blocked evidence item cannot monopolize unrelated publishable work; fabricated/stale publication receipts fail; source failures and service holds remain distinguishable from quiet news. Validate these as deliberately bad cases before relying on the checks.

Ali retains mission, taste, editorial positions, meaningful authority changes and the existing exact-version Big Picture decision. Ordinary news continues under the authority already granted, with independent factual/editorial assessment. This audit does not seek a new daily sign-off requirement.

## Original audit delivery boundary

Internal files added or updated: this audit, the editorial promise, the decision router, ACTIVE-WORK and one consolidated painpoints entry. No production story, canonical newspaper data, service entry, game, media, website code, automation configuration or public deployment was changed. No memories were written. The iCloud checkout's existing dirty work was preserved.

Implementation remains outstanding in the existing `DAILY-MANUAL-RUNBOOK.md`, `story-type-modules.json`, `ordinary-news-editorial-policy.json`, recovery policy/helpers, prose ratchet contract, source roster/cursor, service-bank preparation and reader/publication routes. Their current behavior is not silently superseded by this recommendations document. The new editorial-purpose route records Ali's ruling; translating it into those mechanisms is the work ordered above.

The audit is a completed internal work product once these exact paths are committed. All workflow repairs and feature production remain PROPOSED; the live newspaper has not been certified against the complete new promise.

## Implementation sequence and first repair — September 5

**Visitor problem:** useful reporting and columns can stall behind a story with no new evidence. **Smallest first change:** separate due source checks and future evidence waits from the production candidate, retain held work visibly, and reject malformed scheduling rather than silently report quiet. This implements an existing recovery-policy requirement, not new publication authority.

Foreground-owned implementation paths are `scripts/advance-newsstand-story-recovery.mjs`, `scripts/test-newsstand-story-recovery.mjs` and the current runbook. The existing audit/promise route, ACTIVE-WORK and consolidated BTB-500 entry carry scope and continuity. No public prose, website layout, canonical publication data or scheduler configuration is owned by this first repair.

**Verification:** the new future-evidence fixture failed against the incumbent with actual `ACTIVE_RECOVERY_MUST_CONTINUE`, expected `EVIDENCE_WAIT`. The corrected suite passes due/equal-time/future/offset-time/new-evidence/legacy/malformed cases, keeps waits non-quiet, and preserves review/terminal transitions. The command against the actual preserved September 5 queue still returns `NO_ACTIVE_RECOVERY` because its only story is already terminal. A separate Terra reviewer inspected the actual patch and reran the suite, finding no blocking defect within this scope. This is local component evidence, not proof that the automation consumes the new outputs or that publication receipts are valid.

The runbook now requires recurring service-desk assessment and follow-through instead of calling it optional. Executable due-service tracking and actual replenishment remain outstanding. A contradictory preliminary suggestion to create a new service-only envelope was rejected: `compose-daily-edition.mjs:139` and `promote-daily-edition.mjs:109,218–219` already implement `SERVICE_READY`; `test-prepare-newsstand-service-bank.mjs` already contains candidate/expiry/reuse/source checks. Reuse that path and prove the complete journey rather than introduce another publisher.

**Order of delivery from here:**

1. **Reliable orchestration:** integrate the reviewed local recovery change through the existing automation's versioned inputs; add accountable intake-to-desk dispositions and due-service scheduling; repair stale bank evidence through the real review path; report desk HOLD separately from process success. Exercise a held headline alongside a ready service update. Bind publication completion to the actual admitted issue and public artifact before trusting that tracker label.
2. **Reliable reporting:** close the independent-source coverage gaps, normalize story-topic bindings, and bind material reporting answers to the exact article. Reconcile the zero-defect ratchet policy rather than silently weakening it. Review the headline and prose, source claims and understanding separately from form completeness.
3. **Representative publication pilot:** source and review a useful Daily story, a standalone Weekly and a fresh eligible item for Corner Office, Paige and Concept. Test a separate quiet-news/service-only case. Inspect the complete card-to-reader, learning links, archive and catch-up paths on desktop/mobile, plus failure and retained-incumbent states. Keep original dates. Publication uses the existing admissions, current complete production artifact and verified custom/immutable origins.
4. **Small feature pilot:** one Patron Saint, one MAiVEN and one TRAiLBLAZER treatment, followed by one accessible learning interaction. Bind the Saint's actual message/song/card and each real woman's contribution/current source/media availability. Qualitative voice and teaching review precede public use. Stage these sequentially in existing slots to avoid a speculative page rebuild.
5. **Operational proving period:** observe two weekly cycles, including two Wednesdays, with a small consented reader sample. Monitor missed due work, independent headline coverage, correction time, stale tips, repeated defects and reader understanding. Fix recurrent causes; notify Ali only on a meaningful exception under existing preferences. This task has not started a new schedule or enrolled readers.

**Prevention is a release condition:** before a stage is called working, demonstrate that it rejects or handles the realistic bad case: unprocessed intake, all-candidate bank, expired advice, missing clinical comparator, misleading title, unrelated learning link, stale Weekly, false 'published' receipt, unchanged evidence hold, dead media link or a candidate visible as public. Use mechanical tests for deterministic failures and artifact-first independent judgment for meaning, voice and fidelity. Genuine human learning observations must remain distinct from model simulations.

Ali's role is limited to the existing consequential decisions: mission/taste choices, exact-version Big Picture approval and any substantive authority/policy change. Routine source checks, drafting, fixes, testing and ordinary-news publishing do not require a new daily approval burden. No dates for completion are promised before the representative pilot reveals actual throughput. Each stage ends with an exact scoped result, not a blanket 'NewsStand works' claim.
