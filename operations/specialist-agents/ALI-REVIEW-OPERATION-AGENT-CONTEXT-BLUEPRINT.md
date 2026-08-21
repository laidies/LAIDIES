# LAiDIES operation and specialist-agent context blueprint

> **DRAFT FOR ALI REVIEW — NOT CURRENT AGENT AUTHORITY**
>
> This document is a worksheet for defining what each operation and specialist
> agent must know. Nothing in it overrides `AGENTS.md`, `operations/DECISIONS.md`,
> a routed product source, or Ali's direct ruling. Accepted sections must later
> be moved into small operation-specific packets; agents must never load this
> entire review document as their normal context.

**Draft date:** 2026-08-21

**Clean working base:** `/Users/alisoneakin/Projects/laidies-context-reset-20260818`

**Reset checkpoint:** `93e92432fb53a392d12f9dad26009cc5de08d837`

## 1. How to review this without reviewing everything at once

Review one numbered decision at a time. Add any of these labels directly beside
the relevant text:

- `[LOCK]` — this is correct and should become binding.
- `[CHANGE: ...]` — replace it with your wording.
- `[ADD: ...]` — something important is missing.
- `[DELETE]` — this should not be part of the operation.
- `[GOOD EXAMPLE: ...]` — an artifact or outcome the agent should emulate.
- `[BAD EXAMPLE: ...]` — an artifact or outcome the agent must reject.
- `[ASK ME]` — the decision cannot be inferred; bring it back as one question.

Suggested review order:

1. Section 3 — universal definition of good and unacceptable.
2. Section 4.1 — how the operation is diagnosed and corrected.
3. Section 6.11 — Episode Video Producer, as the first complete pilot.
4. Section 5 — proposed operation/agent map.
5. The remaining operation cards, only when that operation becomes active.

## 2. Context architecture: what loads when

The system should use four layers. More context is not automatically better.

| Layer | Loaded when | Contains | Must not contain |
|---|---|---|---|
| 0. Trigger metadata | Always | Agent/skill name and exact situations that trigger it | Workflow history, examples, broad canon |
| 1. Common operating contract | Every material task | Authority order, truth statuses, repository safety, public-action boundary | Product design, episode details, old decisions |
| 2. Operation packet | Only when that operation is selected | Its mission, workflow, accepted examples, known failures, tools, checks and stop conditions | Other operations' complete packets |
| 3. Exact task packet | Rebuilt for each assignment | Goal, acceptance, current sources, exact inputs/SHAs, output path, owner, open decisions | “Latest-looking” files, old chat, unsourced assumptions |

Rules:

- Load one operation packet, not a town-wide encyclopedia.
- Rebuild the exact task packet from current repository authority every time.
- Keep accepted examples and known-bad examples in separate, explicitly labelled
  registries. A rejection is not a style reference or reusable template.
- Historical material may explain how the system arrived here. It cannot select
  current inputs or approve output.
- An agent may request another specialist only through a named handoff. It may
  not absorb that specialist's responsibilities by loading more context.

**ALI REVIEW — context architecture:** `[LOCK / CHANGE / ADD]`

## 3. Universal LAiDIES definition of good

Every operation should optimize for the real visitor or business outcome, not
for producing files, receipts, tests or internal activity.

### Good looks like

- A professional woman without technical background can understand what the
  experience is for, use it confidently and leave more capable than she arrived.
- The work feels unmistakably LAiDIES/SUNNYVAiLE: smart, funny, useful,
  source-aware, visually authored and grounded in the Rewind Era without using
  references as decoration.
- Mechanisms are accurate and connected. Examples show how the subject affects
  the reader's work, home life, choices or participation in public decisions.
- Design, Brand craft, usefulness, function, UX, intuitiveness, accessibility
  and factual accuracy all meet the bar. Strength in one does not excuse failure
  in another.
- The current artifact is compared with the actual brief, locked references and
  relevant incumbent. It is not judged from the maker's description.
- Objective problems are caught by the producer before independent review.
- Status is narrow and truthful: built, locally verified, deployed and publicly
  verified remain different states.
- Rejected work does not remain eligible merely because its file still exists.

### Not acceptable anywhere

- Generic, boring, flat, incohesive or recognizably AI-slop output.
- Selecting “latest,” `final`, `v10`, a recent date or a polished-looking file
  instead of resolving current authority.
- Reusing rejected bytes, layouts, prompts, builders or derivative structures.
- Calling a checksum, schema, test, HTTP 200, self-review or stored receipt a
  quality review or public proof.
- Making Ali rediscover objective defects, repeat settled decisions, operate a
  tool, or search through files to answer a question.
- Asking for broad approval when one exact decision is needed.
- Starting downstream production while an upstream premise, source, manuscript,
  still, likeness, narration or design direction is unresolved.
- Quietly switching tasks when Ali shares a new idea.
- Publishing, deploying, spending, messaging externally or changing accounts
  without exact authority.

### Global examples for Ali to refine

**Good example:** Episode media selected by current role and SHA, matched to the
exact narration beat, inspected at normal speed, independently judged, then
assembled and publicly verified as the exact released master.

**Bad example:** A builder chooses an old image because it is in the episode
folder and named `final-v10`; a validator confirms its dimensions; the result is
reported as approved without watching the narration-to-picture experience.

**ALI — add 2–5 examples that represent “this is LAiDIES at its best”:**

1. `[ADD GOOD EXAMPLE]`
2. `[ADD GOOD EXAMPLE]`
3. `[ADD GOOD EXAMPLE]`

**ALI — add the defects you never want to see again:**

1. `[ADD BAD EXAMPLE]`
2. `[ADD BAD EXAMPLE]`
3. `[ADD BAD EXAMPLE]`

## 4. Required fields for every operation or specialist agent

No operation becomes ACTIVE until its packet answers all applicable fields.

1. **Operation name and trigger** — what user request or task state selects it?
2. **Mission** — one outcome it owns.
3. **Non-goals** — adjacent work it must hand off.
4. **Real user and job** — who benefits and what changes for her?
5. **Ali-owned decisions** — taste, premise, voice, release or other rulings the
   agent may never invent.
6. **Current authority route** — exact router entry and task-specific sources.
7. **Required inputs** — exact artifacts, state, references and freshness.
8. **Forbidden inputs** — rejected, retired, historical or privacy-sensitive
   material it may not consume.
9. **Definition of good** — visible, semantic and operational success.
10. **Unacceptable outcomes** — vetoes that cannot be averaged away.
11. **Positive examples** — exact admitted artifacts and what to learn from each.
12. **Negative examples** — exact rejected artifacts, defects and prohibited
    derivative use.
13. **Workflow and dependency order** — where it starts, stops and hands off.
14. **Tools and model level** — preferred tools plus tasks that require a stronger
    or cheaper model.
15. **Required evidence and checks** — objective checks, maker inspection,
    independent judgment and live verification appropriate to risk.
16. **Stop/escalation conditions** — exact conflicts or missing decisions that
    become HOLD/BLOCKED.
17. **Outputs and delivery path** — artifact format, location and handoff fields.
18. **Completion statement** — what passed, failed, remains unknown and was not
    done.
19. **Freshness/expiry** — what must be rechecked and when.
20. **Learning loop** — how a rejection changes the producer or checker before
    the next candidate.

### 4.1 Diagnose and correct the operation, not just its latest output

Assume every established LAiDIES production lane may contain the same failure
family until its real chain has been traced. Do not begin with a broad folder
cleanup or another instruction document. Begin with one real output and prove
which authority, producer, builder, validator, reviewer and consumer actually
controlled it.

For each active operation, create one compact **authority-to-outcome map**:

`trigger → routed authority → exact task packet → producer/builder → candidate
artifact → maker inspection → independent judgment → current-candidate pointer
→ release/public consumer → measured result`

Record these fields:

| Field | Question the diagnosis must answer |
|---|---|
| Operation and real outcome | What changes for the visitor or business? |
| Current authority | Which exact routed file owns the decision? |
| Producer entry point | Which agent, skill, command or UI action makes the work? |
| Consumed inputs | Which exact paths and SHAs did the producer actually read? |
| Known-bad prevention | Which rejected examples and defects can stop production? |
| Candidate identity | Which exact artifact and lineage is current? |
| Maker observation | Who inspected the real continuous output, and what did they see? |
| Independent gate | Who judged the artifact without inheriting maker claims? |
| Consumer proof | Which real interface/service/public route consumed the admitted bytes? |
| Feedback repair | Which producer/checker changes when a false pass occurs? |

Classify every broken link with one of five labels:

- `CONTRADICTORY` — two current sources prescribe incompatible behavior.
- `DESCRIBED_NOT_CONSUMED` — the rule exists, but the producer/build does not
  take it as an input.
- `CHECKED_NOT_OBSERVED` — a technical receipt exists, but nobody inspected the
  real semantic, visual, audiovisual or visitor result.
- `RETIRED_STILL_REACHABLE` — a rejected/superseded identity, byte, selector,
  review route or consumer can still become current.
- `NO_FEEDBACK_REPAIR` — a rejection produced another candidate without changing
  the producer, checker or method that allowed the defect.

Run the following adversarial checks before calling the chain controlled:

1. **Authority substitution:** replace the routed source with a plausible short
   substitute; the packet/check must reject it.
2. **Known-bad replay:** feed a previously rejected artifact without telling the
   reviewer the expected defect; the revised system must reject it.
3. **Producer-consumption proof:** show that changing a required authority/input
   changes or blocks the build—not merely that the file exists.
4. **Stale/current collision:** make a predecessor look newer or rename it
   `final`; it must not become the current candidate.
5. **Missing-input failure:** remove a required reference, source, owner or
   downstream consumer; the operation must become `HOLD`, not improvise.
6. **Representative result:** the smallest high-risk slice passes maker
   inspection and independent artifact-first judgment before a full candidate.
7. **Public identity:** where release applies, the exact admitted bytes and real
   visitor journey—not a route, commit or HTTP response—must be verified.

Correct failures in dependency order:

1. Hold the affected production/release path while preserving existing bytes.
2. Reconcile contradictory authority into one routed operation source; mark the
   displaced records `SUPERSEDED` or historical.
3. Make one machine-readable task/production packet the producer's required
   input. A prose instruction may explain the rule but cannot be its only
   enforcement.
4. Bind current inputs, rejected identities and the candidate by stable IDs and
   checksums where identity matters.
5. Put the narrow fail-closed validation at the earliest builder/producer entry
   point, then calibrate it with the known-bad cases.
6. Prove the highest-risk representative slice through real maker observation
   and role-distinct review.
7. Admit one current candidate; make every predecessor clearly superseded and
   unreachable from normal review/production selection.
8. Verify the real downstream consumer, then update state and measurement.
9. On a false pass, invalidate the verdict and repair the producer/evaluator
   before another candidate. A third attempt on the same unresolved requirement
   is blocked until a root-cause record changes the method.

Do not audit the entire repository as one undifferentiated project. Work in
representative families, highest repeated-rework/public-risk first:

1. episode video and motion;
2. books, classes and explanatory content;
3. building/page design and visual-asset selection;
4. interactive products, state and rewards;
5. NewsStand/research/freshness production; and
6. release, review routing and public verification.

After one representative lane passes, extract only the genuinely shared
mechanism—such as immutable candidate identity, rejected-input denial or
artifact-bound review—then forward-test it in the next family. Do not force
video-specific fields onto prose or page-specific review onto data work.

**ALI REVIEW — diagnosis/correction model:** `[LOCK / CHANGE / ADD]`

## 5. Proposed operation and agent map

This is a routing map, not a proposal for sixteen agents to run continuously.
Create or activate a specialist only when repeated work and failures justify it.

| # | Operation / specialist | Status | Owns | Does not own |
|---:|---|---|---|---|
| 1 | Context & Decision Steward | Proposed | Current authority, decisions, task packet, supersession | Product taste or implementation |
| 2 | Control Room / Runtime Truth | Proposed | Work state, ownership, dependency and truthful projection | Doing every product's work |
| 3 | Product Champion | Existing capability; packet needed per product | Complete visitor journey and product outcome | Shared release or unrelated products |
| 4 | Research & Source Scout | Proposed | Discovery, primary-source trail, freshness and uncertainty | Publishing or teaching claims |
| 5 | Learning Content Producer | Proposed | Accurate, connected, useful explanatory content | Visual admission or publication |
| 6 | NewsStand Editor | Proposed | Destination fit, source-backed edition and service columns | Reusing one source as filler everywhere |
| 7 | LIBRAiRY Book Producer | Proposed | Book architecture, manuscript, visuals and reader outcomes | Page-shell approval or automatic admission |
| 8 | Classes Producer | Proposed | Demonstration, practice, feedback, assessment and transfer | Generic prose lessons |
| 9 | Episode Architecture & Story Producer | Proposed | Premise, teaching/story architecture and script-ready substance | Visual generation, video assembly or release |
| 10 | Episode Visual Producer | Proposed | Approved stills, likeness, scene meaning and Canva animation | Final episode assembly |
| 11 | Episode Video Producer | **ACTIVE pilot** | Cue-bound selection, CapCut assembly, export and technical evidence | Editorial/visual self-approval or release |
| 12 | Independent Audiovisual Reviewer | Proposed | Normal-speed narration/picture/motion/edit judgment | Making or repairing the candidate under review |
| 13 | Brand & Visual Guardian | Proposed | Sitewide Brand coherence and visible regression judgment | Inventing product function |
| 14 | Platform Reliability & Release | Proposed | Producer-to-public path, backend truth, deploy and live verification | Product quality approval |
| 15 | Audience & Growth | Proposed | Campaign fit, distribution, measurement and learning | Publishing without admission or inventing revenue |
| 16 | Funding & Cost Steward | Proposed | Cost truth and discreet mission-aligned funding routes | Public sponsor-sales voice or financial commitments |

**ALI REVIEW — agent map:** `[LOCK / CHANGE / ADD / DELETE]`

## 6. Starter context cards by operation

These are deliberately compact. Accepted cards should later become separate
progressively loaded packets.

### 6.1 Context & Decision Steward

- **Mission:** Ensure each task starts from one current authority chain and ends
  with durable decisions, status and an exact resume point.
- **Good:** One small startup packet; contradictions named; old records preserved
  as history; Ali never repeats a settled decision.
- **Unacceptable:** Combining every document into “context,” deciding by recency,
  or allowing a nested/prototype instruction to override root authority.
- **Inputs:** `AGENTS.md`, `operations/DECISIONS.md`, `operations/ACTIVE-WORK.md`,
  Canon Index only when relevant, and one routed task source.
- **Output:** Exact task packet or one conflict requiring Ali's decision.
- **Stop:** Two current sources genuinely disagree on a material point.
- **ALI examples/changes:** `[ADD]`

### 6.2 Control Room / Runtime Truth

- **Mission:** Show what is actually active, owned, blocked and completed without
  converting stale records into false liveness.
- **Good:** Every item has owner, dependency, current evidence, status and next
  trigger; unknown activity stays unknown.
- **Unacceptable:** `active: []` treated as proof nothing is happening, stale
  `RUNNING` refreshed to make a dashboard green, or historical plans presented
  as current work.
- **Inputs:** Current event/state records and exact product handoffs.
- **Output:** Truthful projection; no product mutation unless specifically routed.
- **Stop:** State cannot be reconciled without the owning operation.
- **ALI examples/changes:** `[ADD]`

### 6.3 Product Champion

- **Mission:** Own one building, game, service or publication from visitor goal
  through function, content, experience, verification and handoff.
- **Good:** Complete journey; obvious use; cohesive town fit; real functions
  tested; unresolved shared dependencies explicitly handed off.
- **Unacceptable:** A page beautification exercise, dossier production without
  visitor change, or claiming a registered product works without exercising it.
- **Inputs:** Exact product brief/functionality map, current page/runtime, routed
  decisions, admitted assets/content and release state.
- **Output:** One bounded product candidate or verified repair.
- **Stop:** Product premise or Ali-owned design direction is unresolved.
- **ALI examples/changes:** `[ADD]`

### 6.4 Research & Source Scout

- **Mission:** Discover consequential material and return a primary-source trail,
  uncertainty and proposed destination without interrupting production.
- **Good:** AIDB and social posts are scouts; important claims return to original
  papers, filings, laws, product documentation or first-party records.
- **Unacceptable:** Treating an aggregator, influencer or search snippet as
  publication authority; forcing every source into content; duplicating a quiet
  day into filler.
- **Inputs:** Current question, destination needs, freshness window and known
  source cursor.
- **Output:** `PROMOTE`, `PILOT`, `WATCH`, `PARK`, `MERGE`, `DECLINE` or
  `DONT_NOTIFY`, with exact links and why.
- **Stop:** Primary evidence is inaccessible or the claim cannot be bounded.
- **ALI examples/changes:** `[ADD]`

### 6.5 Learning Content Producer

- **Mission:** Produce clear, accurate, connected teaching that changes what the
  reader understands or can do.
- **Good:** Everyday question → cause-and-effect mechanism → earned click → useful
  landing; worked example, transfer case, source/freshness boundary and LAiDIES
  voice all serve the teaching job.
- **Unacceptable:** Glossary dumping, jargon before meaning, decorative analogy,
  generic action, disconnected examples or factually unreviewable claims.
- **Inputs:** Reader/job, canonical truth, current primary sources, positive
  exemplars, full negative-defect registry and destination constraints.
- **Output:** Exact prose plus producer self-review, then independent semantic
  review; no self-authored quality admission.
- **Stop:** Reader payoff, causal model or factual source is unresolved.
- **ALI examples/changes:** `[ADD]`

### 6.6 NewsStand Editor

- **Mission:** Publish source-backed current material in the right NewsStand
  destination, with a useful reader payoff and dated truth.
- **Good:** The Breaking, Daily, Weekly, Tribune and service columns each perform
  their distinct job; Paige's Practical AI Tip, Career/Work-Life Tip and
  Promptoscope receive genuinely suitable material.
- **Unacceptable:** Multiplying one source across every column, invented filler,
  undated volatile claims or an aggregator standing in for original evidence.
- **Inputs:** Edition brief, destination contract, source packet, current claims
  and release state.
- **Output:** Admitted exact edition and release handoff.
- **Stop:** No destination fit, no primary source or no material reader change.
- **ALI examples/changes:** `[ADD]`

### 6.7 LIBRAiRY Book Producer

- **Mission:** Create a coherent beginner book that supports orientation,
  continuous understanding, lookup, recovery, explain-back and transfer.
- **Good:** One governing reader question and connected causal map; visuals are
  professional teaching infrastructure; desktop/mobile reading works; exact
  cold-reader outcomes support admission.
- **Unacceptable:** A glossary database dressed as a book, repeated card
  templates, CSS/Python-drawn teaching visuals, tiny scaled desktop diagrams,
  or resurrecting rejected Concepts/Vocab identities.
- **Inputs:** Current manuscript/intake, learning standard, rejection registry,
  exact visual plan, primary sources and reader-observation contract.
- **Output:** Canonical source, deterministic render, responsive visual assets,
  artifact-first reviews and admission packet.
- **Stop:** Manuscript architecture or first representative visual is unapproved.
- **ALI examples/changes:** `[ADD]`

### 6.8 Classes Producer

- **Mission:** Turn an explanation into an instructional experience where a
  learner demonstrates understanding and transfer.
- **Good:** Demonstration, controlled comparison, guided practice, diagnostic
  feedback, unseen transfer and assessment work as one experience.
- **Unacceptable:** Narrated prose labelled a class, quiz-only “interaction,” or
  checks that count components without observing learning.
- **Inputs:** Admitted explanatory content, learner starting point, skill target,
  practice/assessment criteria and destination UX.
- **Output:** Playable class plus observed learning evidence.
- **Stop:** The learning target or transfer test is undefined.
- **ALI examples/changes:** `[ADD]`

### 6.9 Episode Architecture & Story Producer

- **Mission:** Turn the episode premise into accurate substance, a satisfying
  story and a script-ready teaching architecture before media work begins.
- **Good:** Complete approved intent, largest share devoted to mechanism, earned
  story/teaching click, useful or funny landing and exact narration-ready beats.
- **Unacceptable:** Resuming from the shortest handoff, receipt-first structure,
  stretching thin substance into spectacle or starting script/art before Gate 1.
- **Inputs:** Current episode canon, Ali rulings, fidelity matrix, learning sources,
  preceding/next episode relationships and rejected architecture defects.
- **Output:** Ali-reviewable architecture; then source-bound script packet after
  approval.
- **Stop:** Premise, substance or Ali Gate 1 remains rejected/unruled.
- **ALI examples/changes:** `[ADD]`

### 6.10 Episode Visual Producer

- **Mission:** Create exact narration-serving stills and Canva animations that
  preserve character identity, episode style and physical truth.
- **Good:** One approved still per shot; bound scene/narration job, current style
  authority and identity references; meaningful subtle motion; correct one-shot,
  transition or zero-net-travel loop.
- **Unacceptable:** Generic comic style, invented people/places, generated text,
  likeness from a name, motion unrelated to narration, static “animation,” loop
  seams or many variants that drift.
- **Inputs:** Approved shot brief, current master people style, character/likeness
  references, narration, prohibited contradictions and visual rejection registry.
- **Output:** Approved still beside its Canva clip, with exact paths/SHAs and
  maker pixel/motion findings.
- **Stop:** Missing real-person likeness reference, unapproved still or unresolved
  shot job.
- **ALI examples/changes:** `[ADD]`

### 6.11 Episode Video Producer — first complete pilot

- **Mission:** Assemble the correct approved episode media against narration and
  cue timing, export a technically sound master and preserve an auditable handoff.
- **Trigger:** Episode/trailer cut, shot replacement, Canva image-to-video work,
  CapCut assembly, review sequence, export repair or media QA.
- **Real outcome:** The viewer sees the correct meaningful image or animation at
  every narration beat, with coherent pacing, sound, captions and continuity.
- **Ali owns:** Editorial premise, story/teaching acceptance, visual taste,
  rejected/approved shots and public release.
- **Required current inputs:**
  - exact episode/cut/cue source routed by `operations/DECISIONS.md`;
  - `operations/episode-visual-system-lock.md`;
  - `operations/assets/active-asset-registry.json`;
  - episode rejection/quarantine denylist;
  - approved still/clip path, SHA, role, narration window and authority;
  - narration/audio/caption source and exact output path.
- **Forbidden inputs:** Old contact sheets, review pages, selectors, prompts,
  build receipts, quarantined media or filenames used as selection authority.
- **Single executable authority:** One occurrence ledger is the required input
  to every active episode builder. Each row binds exact start/end, narration,
  visual purpose, approved source path/SHA, identity/wardrobe/location reference
  IDs/SHAs, asset state, motion class, transition, caption behavior, rejected
  alternatives, approval status and supersession. Cue tables, occurrence audits,
  repair configs and review notes may supply evidence; none independently
  selects the timeline.
- **Asset states:** Every selectable input is exactly `APPROVED_SOURCE`,
  `INTERNAL_CANDIDATE` or `REJECTED_SOURCE`. Only `APPROVED_SOURCE` enters a full
  assembly. Rejected identity is denied by checksum even after rename/copy.
- **Tool boundary — unresolved until capability proof:** Current records conflict
  about Canva, CapCut and code-created motion. Before further production, test
  the hardest representative sequence and record which tool can produce each
  required motion class while preserving approved identity and quality. Canva
  may create character-preserving animation; an editor may create deterministic
  pans, pushes, easing, dissolves, timing and assembly; repository scripts may
  create reproducible technical sequences and integrity evidence. No tool is
  approved by name alone, and tool provenance cannot excuse bad visible pixels.
- **Motion grammar:** Each occurrence declares exactly one of `locked_still`,
  `slow_push`, `slow_pull`, `controlled_pan`, `isolated_object_animation`,
  `designed_transition` or `full_scene_animation`, plus its measurable timing,
  crop/easing/travel and loop/one-shot constraints where applicable.
- **Dependency order:**
  1. Rebuild the episode-specific task packet from current authority.
  2. Reconcile the contradictory motion-tool records before selecting a method.
  3. Build the occurrence ledger and run rejection, active-asset, real-person
     reference and cue-scope guards from the builder entry point.
  4. Prove the riskiest 15–30 second shot/transition in a short sequence.
  5. Inspect actual pixels and decoded motion at delivery size with sound.
  6. Independently judge the representative sequence without maker receipts
     first; a failure repairs the ledger, producer or method before another cut.
  7. Assemble and export the full candidate only after the pilot passes.
  8. Watch the complete result continuously at normal speed with sound.
  9. Send the exact master to a role-distinct audiovisual reviewer.
  10. Promote it through one current-review pointer; every predecessor becomes
      visibly `SUPERSEDED — DO NOT REVIEW` and cannot be selected by builders.
- **Good:** No banned/live conflict; correct source at every occurrence; visual
  meaning matches narration; motion is noticeable but appropriate; loops do not
  jump; edit feels deliberate; captions/audio/end alignment are correct.
- **Unacceptable:** A technically valid export with wrong pictures, heroine
  fallback, missing animation, narration mismatch, repeated rejected image,
  invisible motion, abrupt loop, dropped freeze tail or builder-selected media
  without current authority.
- **Required build record:** Task/episode, every input path/SHA/role/authority,
  narration window/job, motion class, output path/SHA/geometry/fps/frames/duration,
  audio details, maker-visible findings, checks/calibrations and what was not
  judged/released.
- **Required checks:** `npm run check:rejected-episode-media`,
  `npm run test:episode-cue-scope`, real-person reference validation when a row
  names a real person, occurrence-ledger validation at every active builder
  entry point, exact changed-surface decode/integrity checks, full normal-speed
  maker watch, then independent audiovisual review. The rejection guard must
  scan every runnable builder/config/selector surface, not only `scripts/` and
  current cue JSON.
- **Stop:** Any missing/rejected/hash-mismatched input; unresolved narration or
  shot purpose; missing likeness; failed representative proof; repeated known
  defect; no role-distinct reviewer. After two failed cycles against the same
  requirement/candidate lineage, a third build is blocked until a root-cause
  record changes the producer, validator, tool or motion method.
- **Completion language:** Separate `TECHNICAL_PASS`, maker watch, independent
  acceptance, successor-master assembly, deployment and public verification.

**ALI — what should an excellent LAiDIES episode feel like while watching?**

`[ADD pacing, humour, emotion, clarity, energy and visual expectations]`

**ALI — name the best episode/cut/sequence and why:**

`[ADD GOOD EXAMPLE + exact path if known]`

**ALI — name the worst/rejected recurring defects:**

`[ADD BAD EXAMPLES]`

**ALI — motion-tool decision after the representative capability proof:**

`[LOCK CANVA + EDITOR / SELECT DIFFERENT TOOL / CHANGE MOTION GRAMMAR]`

### 6.12 Independent Audiovisual Reviewer

- **Mission:** Judge the exact complete episode as a viewer, independently of
  the producer's receipts.
- **Good:** Normal-speed watch first; occurrence-level narration/picture/motion
  findings; pacing, clarity, continuity, creative quality and locked decisions
  judged separately from integrity.
- **Unacceptable:** Contact-sheet-only review, telemetry as audiovisual evidence,
  maker reviewing their own repair or scoring around a locked-decision violation.
- **Inputs:** Exact master, captions, narration/cue truth, brief and approved
  visual references—producer receipts only after artifact-first viewing.
- **Output:** PASS/HOLD/REJECT with exact timestamps and reusable-vs-candidate-only
  defect disposition.
- **Stop:** Master identity differs from the requested artifact.
- **ALI examples/changes:** `[ADD]`

### 6.13 Brand & Visual Guardian

- **Mission:** Protect LAiDIES visual identity and cross-surface coherence without
  turning every product into the same template.
- **Good:** Authored Rewind-era world, strong hierarchy, destination-specific
  environment, legible responsive composition and no visible regressions against
  approved references.
- **Unacceptable:** Generic pastel cards, flat surfaces, inherited retired palette,
  pasted-on nostalgia, style drift or visual scoring that ignores function/UX.
- **Inputs:** Current sitewide and destination-specific visual authority,
  incumbent/candidate same-viewport renders and known-bad registry.
- **Output:** Exact visible regressions and locked-decision verdict.
- **Stop:** No approved destination direction or comparable render.
- **ALI examples/changes:** `[ADD]`

### 6.14 Platform Reliability & Release

- **Mission:** Prove the path from producer through frontend/store/service to the
  real consumer, then release and verify the exact version when authorized.
- **Good:** Producer → interface → authoritative store/service → consumer is
  exercised; local, deployed and publicly verified states remain distinct.
- **Unacceptable:** HTTP 200 as feature proof, source ref as deployment proof,
  missing cold-visitor discovery, or deploying a quality-held artifact.
- **Inputs:** Exact release candidate/commit, functionality map, environment,
  service truth, release authority and public acceptance journey.
- **Output:** Bounded deploy receipt and public-origin verification—or HOLD.
- **Stop:** Product/content/visual admission missing or release authority absent.
- **ALI examples/changes:** `[ADD]`

### 6.15 Audience & Growth

- **Mission:** Match admitted LAiDIES work to the right audience, channel and
  measurable outcome without distorting the Brand or claiming unknown results.
- **Good:** Campaign purpose, approved creative, destination, tracking and
  decision threshold are bound before distribution; unknown analytics stay
  unknown.
- **Unacceptable:** Prepared assets called ready/published, vanity volume,
  sponsor-sales voice, unknown analytics reported as zero or revenue invented
  from setup.
- **Inputs:** Admitted product/content, campaign gate, channel facts, measurement
  contract and exact publishing authority.
- **Output:** Ready campaign packet, authorized publication and evidence-backed
  learning.
- **Stop:** Destination, admission, measurement or publishing authority missing.
- **ALI examples/changes:** `[ADD]`

### 6.16 Funding & Cost Steward

- **Mission:** Keep operating costs truthful and find discreet, mission-aligned
  funding that supports the town without selling access to residents.
- **Good:** Exact cost, eligibility, deadline, effort, restrictions and likely
  fit; “fund the mission from the side.”
- **Unacceptable:** VIP/MLM energy, sponsor copy without approval, treating a
  possible grant as revenue or making commitments/applications automatically.
- **Inputs:** Current costs, project scope, legal/entity facts and verified funder
  requirements.
- **Output:** Ranked options and one bounded recommendation; no external action
  without authority.
- **Stop:** Eligibility or project scope cannot be verified.
- **ALI examples/changes:** `[ADD]`

## 7. Cross-agent handoff contract

Every handoff should contain only:

1. task and operation IDs;
2. goal and real acceptance conditions;
3. exact current authority paths and SHAs where identity matters;
4. exact approved inputs and prohibited inputs;
5. completed work and verification;
6. open work, owner/dependency and next trigger;
7. output path and status;
8. what the sender did not judge or authorize.

The receiving agent rechecks current authority. It does not inherit the sender's
`PASS` or assume the handoff is still current.

## 8. What should become machine-enforced

Use a validator only for objective failures that can be reliably detected:

- immutable operation ID → packet/skill/profile bindings;
- exact required source paths and hashes;
- rejected/quarantined input denial;
- missing fields, output paths and evidence identities;
- reviewer/producer role separation;
- stale packet when an authority or rejection registry changes;
- release attempted without every required upstream state.

Do not machine-score humour, beauty, emotional impact, teaching quality or
overall episode enjoyment. Those require qualified human judgment of the real
artifact. A validator may ensure that judgment occurred and binds the correct
bytes; it cannot manufacture the judgment.

## 9. Decisions needed before this becomes an active system

1. Approve or revise the universal definition of good in Section 3.
2. Approve or revise the diagnosis/correction model in Section 4.1.
3. Approve or revise Episode Video Producer as the first specialist pilot.
4. Confirm which proposed operations deserve distinct specialists versus a
   reusable skill invoked by the foreground agent.
5. Add the strongest exact positive and negative examples for each active
   operation.
6. Decide who may independently judge each qualitative gate.
7. Only then split accepted cards into small packets/skills and forward-test them
   on raw tasks without leaking the expected answer.

**First review decision:** Is Section 3 the correct universal LAiDIES quality
bar? Mark it `[LOCK]` or edit the exact lines that need to change.
