# LAiDIES autonomous delivery runtime

**Status:** CONTROL LAYER ACTIVE — LIVE OWNER/JUDGE PILOT IN PROGRESS; SCHEDULED DISPATCHER PAUSED  
**Owner:** Control Room  
**Purpose:** turn the existing champion, specialist, guild and release system into an executable delivery flow with Ali in the loop only where human judgment is genuinely required.

## The operating graph

- **Control Room / portfolio orchestrator** selects work, resolves collisions, dispatches owners and keeps state truthful.
- **Building champion** is accountable for the complete visitor experience and integrates every owned subproduct.
- **Subproduct champion** owns one bounded feature, publication, class, tool, game or service.
- **Craft specialists** create the required writing, teaching, research, design, art, animation, audio, code and data artifacts.
- **Creative experience designer** turns research and Ali's building intent into a coherent, expandable page architecture before art or code; it is not a literal brief transcriber.
- **Independent guild judges** inspect the real artifact against the original brief. A maker cannot judge her own work.
- **Release owner** binds exact checksums, runs release checks and verifies public bytes.
- **Ali** decides taste, mission, identity, spend/authority and irreducible human-sensory questions only after objective gates pass.

The 67-product registry and guild registry name the accountable products and specialist capabilities. Custom Codex agent profiles define reusable execution modes; they do not replace those owners.

## Mandatory state machine

`CAPTURED → SPECIFIED → READY_TO_DISPATCH → BUILDING → MAKER_EVIDENCE → INDEPENDENT_GATE → OWNER_INTEGRATION → ALI_REVIEW_READY (only if required) → RELEASE_READY → DEPLOYED → VERIFIED_PUBLICLY`

An objective failure routes to `INTERNAL_REPAIR_REQUIRED`, with the same accountable owner, exact defects and the smallest repair. It never routes to Ali. `BLOCKED` requires the exact missing dependency, owner and next action. Recommendations may not remain inert: Control Room dispatches accepted work on the next collision-free cycle.

Dispatch admission is outcome-based, not inventory-based. `READY_TO_DISPATCH`
requires a concrete visitor problem, evidence that the existing experience
does not already solve it, the smallest complete change and explicit
non-goals. Missing metadata or an optional enhancement cannot create work by
itself; without a visitor delta the item is rejected before owner dispatch.

## Efficient production rules

1. **One accountable owner.** Every lane names one product ID, owner, outcome, write scope and acceptance owner.
2. **Inputs before production.** Canon, approved references, exclusions, source evidence, dependencies and acceptance tests must resolve before expensive generation or assembly.
3. **Pilot before batch.** Prove the smallest representative artifact in the real destination. No full batch or full-title build starts until that pilot passes.
4. **Build-time enforcement.** Objective rules run before or during creation. Release review is a backstop, not the first time requirements are applied.
5. **Independent artifact review.** Judges inspect the rendered page, playable film, audible mix, functioning journey or other real output—not prompts, filenames, manifests or maker claims.
6. **Stop-loss.** After two failed repair cycles on the same requirement, stop variant production. Diagnose the brief, asset authority, tool capability or workflow fault; issue one corrected production packet before resuming.
7. **Bounded repairs.** Preserve passing work and repair only named occurrences or components. A broad rebuild requires evidence that narrower repair cannot meet the goal.
8. **Evidence reuse.** Reuse valid checksum-bound evidence unless identity changed, evidence expired, a contradiction appeared or the active decision requires renewal.
9. **WIP limit.** At most two concurrent lanes, including the foreground; only one integration lane may write a shared visitor surface. Parallel work must have disjoint paths or isolated worktrees. A second lane is earned only by real independence or breadth-first read-only work.
10. **Timebox by outcome.** A task that exceeds its estimate by 2× triggers scope/root-cause review. It does not silently become a longer task.

## Required handoff

Every handoff records:

- product and accountable owner;
- user outcome and current state;
- exact artifact paths/checksums;
- original brief and acceptance criteria;
- approved and forbidden inputs;
- tests actually run and evidence paths;
- unresolved objective defects;
- recipient, requested action and deadline/trigger;
- whether Ali action is required, and why only she can perform it.

## Ali review admission

An item may enter `review_now` only when all objective prerequisite gates are `PASS`, the exact artifact identity is bound, and the remaining question genuinely requires Ali. Failed, held, incomplete, stale or contradictory work stays under `INTERNAL_REPAIR_REQUIRED`, `BUILDING` or `BLOCKED`. The owner-review admission checker enforces this rule.

Opening, linking, attaching or navigating Ali to a local building visual counts
as review admission. Agents must obtain its URL through
`node scripts/resolve-design-review-url.mjs <candidate-path>`; a raw `file://`
path, chat attachment or browser navigation is not an alternate review path.
The resolver fails unless the exact path and SHA-256 are in `review_now` and
the complete design-admission checker passes.

Content and teaching artifacts use the same single-door rule. Start review with

`node scripts/serve-review-door.mjs --type content --work-order <exact-id> <exact-candidate>`

The server rehashes the current candidate, requires the complete ordered
producer/self-review/role-distinct-judge/source/reader/release chain and starts
only when the work order and manifest bind those bytes. It serves the candidate
through a random no-store ticket and requires that ticket for subsequent files.
A raw candidate path on a generic local server, a `file://` URL, an attachment or
a typed localhost URL bypasses the Door and therefore has no review authority.
`scripts/resolve-review-url.mjs` is the non-serving admission diagnostic; it no
longer emits a raw file URL.

For a building-page visual candidate or pre-implementation concept, admission additionally requires a
`design_admission` record checked by
`node scripts/check-design-review-admission.mjs`. It must bind the original
brief, research input, four-state journey/handoff map, incumbent, candidate and
current screenshots; keep champion, researcher, creative experience designer,
environment artwork maker, frontend implementer, product/UX judge,
brand/visual judge, red team, Claude Opus 5 reviewer and Control Room admission
identities distinct; clear six non-compensable 17/20 floors; prove visible
spatial growth rather than dropdown-only growth; prove first-time, returning-
without-Card, device-local Card and verified account-backed states plus their
failure/recovery paths; bind Closet, Puffy, charm/reward and Miss Jeeves
handoffs; contain no retained holds; and survive the exact-SHA rejection
quarantine. A mechanics-
only or technical-evidence PASS is never eligible for Ali review.
The same gate fails a declared fixed-canvas/single-image information
architecture, misplaced cross-building product, missing core feature,
undersized primary object, object with no pre-open explanation, content model
that cannot add items and new feature zones without redesign, or unjustified
decorative filler. Independent judges inspect the real artifact; the checker
verifies their distinct, current, exact-byte evidence rather than claiming to
infer visual quality from JSON. Concept review uses the same researcher, creative designer,
information-architecture, UX, Brand, red-team and Claude Opus separation; only
the frontend implementer waits until a direction has been selected.

Every visual admission also binds a same-viewport incumbent comparison with no
unresolved regression or locked-decision violation. Its independent reviewers
must first reject a quarantined known-bad artifact in a blind calibration. A
previous Ali rejection therefore changes the evaluator, not only the candidate;
the old verdicts are invalid and a score cannot compensate for a regression.
The maker preflight must report zero repeated known defects and zero objective
defects deferred to review. Product state records total review issues and review
cycles for comparison with the preceding candidate; a repeat defect blocks the
successor until the producer instruction or checker is repaired.

## Asset admission

Production may consume only assets resolved through `operations/assets/active-asset-registry.json` or an artifact-specific checksum-bound manifest whose sources have passed the same authority checks. Directory names, version numbers, “approved” in a filename and visual similarity are not authority. See `operations/assets/ASSET-CONTROL.md`.

## Runtime enforcement

- Project startup context points every agent to this contract.
- A Stop hook runs the bounded operational-integrity checker.
- Product-specific builders run their own earliest-stage validators.
- The review-inbox checker blocks false `ALI_REVIEW_READY` claims.
- Building-page admission re-hashes every current review artifact and runs
  thirty-seven fail-closed negative fixtures plus implemented/concept passing
  twins, including stale bytes,
  self-approval, scoped review, missing Brand judgment, rejected-candidate
  resubmission, technical-only evidence, selector-only growth, single-image
  overload, undersized primary objects, fixed-scene growth, misplaced products
  and decorative filler.
- Asset admission rejects retired, unresolved or checksum-mismatched inputs.

Hooks do not replace product tests. They prevent a task from ending while the shared operating truth is contradictory.

## Operational proof gate

Configuration, schemas, hooks, generated dashboards and passing local validators
do not by themselves prove this runtime operational. Before the scheduled
dispatcher may resume, one bounded pilot must prove the complete chain against
current app-task liveness: a real owner task accepts a collision-free dispatch,
produces artifact-bound maker evidence, a different live task independently
judges that exact output, Control Room integrates the verdict, and the durable
ledger/run queue agree on the same task IDs and heartbeats. Any missing link
keeps the system `ATTENTION_REQUIRED` and the dispatcher `PAUSED`.
