# LAiDIES operating audit and implementation plan

Date: September 6, 2026. Owner: operating-system review task
`01a077d0-0775-7af2-b631-c311573f0e0e`.
Status: **AUDIT / PROPOSED OPERATING DESIGN; IMPLEMENTATION IN PROGRESS**.
Latest sequence: Ali requires the full [end-to-end operating map](OPERATING-SYSTEM-MAP.md)
and human/manual boundaries before selecting an architecture or standardizing
quality tools. The map is integrated through PR105; representative executable traces now
prioritize the missing transitions below. The sequence is a proposed remediation
plan, not a claim that the whole operating system has been implemented. PR104 retired the legacy publisher;
the larger learning and delivery loops remain unverified.
This replaces the July 10 v1 at this path. The prior version remains in Git
history (37fe77ae); its operator/watchdog descriptions were not proof of running
services. Product decisions and current product owners remain authoritative.

## Verdict

LAiDIES has useful running services, substantial production work and many
careful controls. The central failure is that **a local repair, a successful
check and an accepted operating change are not reliably connected**. New rules
and code accumulate on branches; old jobs and summaries keep running elsewhere;
review findings do not consistently reach the next maker. More instructions or
another project-management subscription would reproduce that problem.

The recommended solution is to finish the existing delivery and learning loops,
use one current source per job, separate machine checks from quality judgments,
and operate a small hybrid of cloud checks and subscription-funded building.
No new purchase is recommended as a prerequisite. This is not a certification
that every visitor feature or all unpublished artifacts were inspected.

## What was checked

- Re-read the September 5 whole-operation audit in the preserved episode-delivery
  checkout, current shared canon/router/agreement and current owner records.
- Inspected all 58 registered worktrees at metadata level; inspected bounded
  dirty-state/ancestry and current task-owner candidates. This is not a byte-level
  reconciliation of every worktree or a declaration that any folder is expendable.
- Compared current main with shared producer/review/learning scripts, registry,
  source bindings and tests; inspected one actual owner-rejected carousel.
- Checked current main CI, a failing active NewsStand branch, scheduled source
  intake, the obsolete publisher, local schedule definitions and the existing
  private Cloud maintenance result. Did not repeat settled phone pairing.
- Checked current official OpenAI Cloud/subscription/scheduling documentation
  and GitHub/Cloudflare billing documentation. Exact existing invoices, complete
  account entitlements and task-specific costs were not available.

## Ranked findings

| Priority | Verified finding | Effect | Correction / owner |
|---|---|---|---|
| P0 | Continuation registration silently excludes successor tasks: direct current-session checker blocks premature stop, but the outer command returns empty success. Only 2/19 work items are session-bound and Stop permits one reminder. | Ali becomes the scheduler despite explicit continuation instructions. | Repair obsolete routing, verify native activation, and use explicitly activated native Goal mode for sustained work; enroll each accepted objective without taking over unrelated tasks. |
| P0 | Main referenced mandatory prose producer/review tools that it does not contain. The shared checkout contains them, their tests and the exemplar registry. | A new cloud checkout cannot follow the same process as the local maker. | Integration owner ports one complete dependency package from exact reviewed source; do not merge the mixed shared branch. |
| FIXED | PR104 retired the legacy Hot Goss scheduled rewrite/direct-push path. | The obsolete unattended editorial route is removed. | Keep the manual-only artifact route; no automatic publication is inferred. |
| P1 | Shared quality calibrations pass, but all 17 real content work orders are held. Bare release checking permits a green integrity result with zero ready content; strict candidate selection rejects held work. | Green CI is being overinterpreted as delivery/quality. | Preserve integrity CI; require exact candidate ID for admission/release. Report ready/held counts separately. |
| P1 | The shared Straight Answers positive exemplar expects SHA8cd3d008… but current file is1c50762d…. Pending reusable lessons require PENDING_OWNER_ADMISSION, with no verified executable admission transition into the registry. | The maker either cannot pass its input contract or relies on manual knowledge transfer. | Learning owner recovers exact admitted exemplar or reviews a replacement; integration owner connects explicit owner admission to next-maker invalidation. Never replace the hash just to clear the check. |
| P1 | Ali rejected the carousel after AI admissions: the invented pension/marketing exercise displaced the intended LUMINAiRY discovery journey. | Correct arithmetic/export tests missed the actual product purpose. | Test maker and judge on the exact known-bad artifact without supplying the expected defect; then test a new example. A checklist alone cannot establish semantic learning. |
| P1 | Current working tasks and old central records disagree; the dispatcher is intentionally paused and work events remain an opt-in pilot. | Work can have a task, files and a handoff without accountable continuation. | Bind one existing real job through owner acceptance, execution, outcome, next owner and closure; extend only after it works. |
| P1 | Main CI passed after PR103; the current NewsStand branch has repeated minimum-session-context failures. | Integration failures are mixed with product progress. | Reconcile that branch's standing-card/source bindings before integration; do not disable the guard or restart the editorial work. |
| P2 | 58 registered worktrees: one clean ancestor of main, two ancestors with local state, 55 not proven integrated by ancestry/unknown. No prunable registrations at this snapshot. | Folder age cannot safely identify obsolete work. Non-ancestry also includes cherry-picked equivalent work. | Reuse the existing clean-worktree recovery plan and work index; classify exact owned packages and recovery links before archive. |
| P2 | Local schedules still own editorial/freshness work; a Cloud maintenance result exists but independent trigger/phone/Mac-off evidence is incomplete. | Laptop availability remains a hidden dependency; notification delivery is not demonstrated for the proposed whole loop. | Prove one existing Cloud maintenance result -> actionable decision -> reply -> resumed job. Do not buy a notification system before testing this route. |

Evidence anchors: `scripts/check-content-producer-contract.mjs`,
`check-prose-quality-admission.mjs`, `check-content-release-readiness.mjs` and
`operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json`
are **shared-checkout sources absent from main at audit**, not working main paths.
Shared `state.json` explicitly records local build and surface-adoption holds.
Shared carousel evidence: `operations/product-stewards/blend-snap/candidates/tryon-ep04-2026-09-05/v3/ALI-REJECTION.md`.
[Failing legacy scheduled run](https://github.com/laidies/LAIDIES/actions/runs/34039375615).
[Successful main intake, schedule event](https://github.com/laidies/LAIDIES/actions/runs/34051864764).
[Main CI after PR103](https://github.com/laidies/LAIDIES/actions/runs/34050169026).
[NewsStand branch failure](https://github.com/laidies/LAIDIES/actions/runs/34054701646).
The historical issue82-versus78 mismatch was rechecked and **not substantiated**;
it is not a current finding.

## Recommended cloud, API and laptop split

| Job | Execution home | Charging route | Required result |
|---|---|---|---|
| Link/endpoint checks, schema/source parity, artifact integrity, scheduled source polling, stale/failed-run detection | Existing GitHub Actions; existing Cloudflare runtime only where persistent service state is needed | No model call. Runner/storage/platform limits still apply. | Machine-readable finding, run ID, owner and next action; quiet unchanged result. |
| Bounded source research, triage and operating summaries | Existing ChatGPT Work Cloud where its supported tools suffice | Shared ChatGPT/Codex allowance; not an API-key bill | Exact sources, change/no-change judgment, bounded output and saved continuation. |
| Programmatic work that cannot fit the subscription Cloud route; visitor-triggered production AI | Existing appropriate API/Worker services, each with a specific job | Separately metered API/platform usage | Explicit per-job limits, deduplication, measured usage, failure state and approved budget. |
| New features, debugging, substantial writing/design iteration, visual/media production and interactive acceptance | Laptop Codex and existing subscribed applications | Existing subscriptions/allowances; tool-specific generation credits can still apply | Committed candidate, real maker inspection, applicable independent review and owner decision. |
| Authorized release of an exact accepted candidate | Existing serialized release path | Existing hosting/runner route | Target source identity, preserved unrelated production bytes, rollback and live journey proof. |
| Backup of files that exist only on the laptop | Existing local backup process | Existing backup/storage arrangements | Verified backup and recovery; cloud checks cannot back up unavailable local bytes. |

Cloud does not require an API key in every case. Official documentation says
Work Cloud can continue with the computer off, and Work/Codex share allowance.
Local scheduled tasks still require the computer/app and local project.
A subscription is not unlimited: large cloud runs compete with interactive
building for the same allowance. Use deterministic checks first, send only
meaningful deltas to a model, and reserve large tasks for the most suitable route.
[Work local/cloud](https://learn.chatgpt.com/docs/get-started-with-work),
[pricing and allowance](https://learn.chatgpt.com/docs/pricing),
[scheduled tasks](https://learn.chatgpt.com/docs/automations).

## Communication and decisions

Use the **existing private Cloud maintenance conversation** as the initial
operating communication channel. Keep product tasks for product collaboration;
Ali should not transport context between them. A finding notification must say:
what changed, consequence, what is already fixed, the one decision (if any),
exact candidate/evidence, recommended choice, and the next action after reply.
A failed check without a decision is an owned repair, not homework for Ali.
Unchanged checks stay quiet. Urgent failures notify promptly; routine decisions
are bundled into one short review window. These are proposed operating rules,
not a claim that the notification/resumption path is implemented.

The run record must link the job, exact source/candidate, result, accountable
owner, wait reason and next trigger. A reply must be captured against that job
before resumption; a general 'yes' cannot approve a changed artifact. Native
phone pairing is settled; test actual new-job delivery and resumption only.
Scheduled task findings appear in Scheduled according to official docs, but
phone push delivery for this proposed loop still needs observation. No extra
messaging app is required unless the existing route fails the real acceptance
journey or an alert urgency requirement exceeds it.

The GitHub repository is PUBLIC. Technical issues/PRs and source-source signals
are not a private founder inbox. Keep personal decisions, credentials, sensitive
source material and unpublished private feedback out of public issues. The
existing private decision/inbox pilot remains parked; do not activate it merely
to solve an unproven notification gap.

## Organization and context

Use the existing `operations/control-room/CLEAN-WORKTREE-RECOVERY-PLAN.md` and
work index; do not add another portfolio database. Each active work package needs
one confirmed owner/task, source branch/path, exact next action, finish condition,
and receiving integration/release owner. Give old packages one disposition:
continue, integrate selected work, superseded with successor, parked with trigger,
or unknown/preserve. A task is not finished because its branch is old or clean.

Keep sustained work in bounded non-iCloud checkouts. Preserve the shared tree:
its inventory had642 tracked and3264 untracked status entries (entries, not a
validated file total). One episode-delivery checkout had9729 tracked differences;
that does not mean9729 obsolete files. No deletion or archival decision follows
from these counts. The one clean merged worktree was already in LAIDIES-ARCHIVE.

New jobs load a small current entry packet and retrieve their exact relevant
rules, examples and defects. Historical documents remain searchable, but leave
the default packet. Retired/superseded status must be visible before the body.
Do not delete useful detail simply to reduce prompt size; route it. Stop adding
universal rules for one product's exception. A generated summary must be tested
against current authority, not trusted because it regenerates successfully.

## A learning loop that changes the next attempt

1. Maker receives the reader/user outcome, exact accepted references and relevant
   admitted failure examples before producing a small representative artifact.
2. Mechanical checks reject objective breakage. Their verdict is integrity only.
3. A distinct reviewer sees the real artifact and original purpose before maker
   receipts; rejects visible/semantic failures and states limits of evidence.
4. A rejection invalidates that artifact's admission. The learning owner decides
   whether it is candidate-only, missing evidence, or a reusable defect.
5. Reusable defects become a small admitted rule/example or executable test.
   Update the responsible maker input and expire old bound contracts. Merely
   writing a pending lesson or appending a painpoint does not finish this step.
6. Test the repaired maker/reviewer on the known-bad artifact without coaching,
   then on a new case. Only observed improved performance closes the learning.

Do not claim model-weight training from this process. Its durable mechanism is
better source selection, maker instructions/examples, executable guards and
verified use by the next run. Do not turn every minor rejection into a universal
instruction. Track repeated defects and review burden; prune redundant active
rules once a reliable narrow guard owns them. The current strict-decrease ratchet
also needs a floor policy so zero defects does not make a subsequent zero-defect
candidate impossible; audit that rule before changing its approved semantics.

## Implementation sequence and acceptance

| Order | Package and accountable lane | Finished only when |
|---|---|---|
| 1 | Operating integration: obsolete job and instruction distribution | Exact repair merged; native/default source verified; no automatic legacy model rewrite/push remains; independent scheduling limits explicit. PR103 already merged; legacy job retirement is this audit's bounded repair. |
| 2 | Operating integration with learning owner: one complete quality dependency package | Main contains the required tools and exact valid exemplars; one actual held candidate is explained truthfully; bare integrity cannot be used as candidate admission; no public content imported blindly. |
| 3 | Learning owner plus integration: close one real rejection loop | Exact rejection -> owner-admitted lesson -> changed maker input -> unaided known-bad rejection -> improved new artifact. Preserve Ali's original purpose, not just more fields. |
| 4 | Operating owner: one cloud decision/resumption loop | Scheduled/cloud run, meaningful finding, phone-accessible result, exact decision capture, resumed same job, final result and no duplicate effect; laptop-independent execution distinguished from local stages. |
| 5 | Integration owner with existing product owners: finish selected stranded packages | Each accepted package reaches its intended receiving branch/release, while superseded/parked/unknown packages are explicit. Reconcile active owners first; no mass merge or cleanup. |
| 6 | NewsStand, reference and Episode owners: extend the proven pattern | Each selected end-to-end product journey meets its own content/visual/functional and release conditions; no 'weekly operation' claim from a timer alone. |
| 7 | Operating owner: sustainable upkeep | Two measured weeks of due-job coverage, no silent missing owner, bounded decision waiting, actual cost and repeat-defect reporting before retiring predecessor status systems. |

These are dependency-ordered packages, not calendar promises. Start with one
representative job per mechanism; expand after evidence. Do not halt current
Homepage/NewsStand/media owners while central integration catches up.

## Costs and third-party tools

Recommended starting increment: **no new subscription and no new API job**.
This excludes already-paid services and their existing usage; it is not a zero
operating-cost claim. Confirm current invoices/allowances before any cancellation
or plan change. Additional-budget preference was requested; absent an answer,
use existing subscriptions and justify every proposed increment.

- GitHub Actions is already running. LAIDIES is public; standard hosted runner
  usage is free, but artifact/cache storage and larger runners have separate
  allowances/prices. Do not move private operations into public Git just to save
  runner costs. [GitHub billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions).
- Work Cloud uses the same allowance as Codex. Choose bounded cadence/deltas so
  monitoring does not consume the building budget. API-key use is separate.
  [OpenAI pricing](https://learn.chatgpt.com/docs/pricing).
- Cloudflare Workers is an existing architectural option, not a required new
  purchase. Its paid plan starts atUS$5/month plus applicable usage; verify the
  existing account plan before adding anything.
  [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/).
- Do not add Zapier/Make/n8n, a VPS/Mac mini, Slack/Trello/Asana, another database,
  or another AI subscription now. None closes the demonstrated authority,
  integration or learning failures by itself. Reconsider a connector/alerting
  service only against a proven missing capability and measured operating cost.

For any later API job: estimate runs/month × measured input/output/tool use,
include retries and storage, set an enforceable job ceiling, alert before the
ceiling and stop safely at it. Provider alerts alone are not a spend cap. Do not
repurpose the separate Miss Jeeves budget or infer cost from account-wide usage.

## Going forward

The operating owner maintains one prioritized integration queue and one concise
status view; product owners retain their products. Review active work and overdue
handoffs weekly, schedules and cost monthly, and archive only after exact
recovery/successor proof. Measure complete jobs, missing/failed runs, waiting
for owner/decision, repeat defects, Ali review rounds and actual per-job usage.
Unmeasured values stay unknown. The next work is package2, not another audit
report: integrate one complete existing quality package after resolving its
source bindings, then demonstrate package3 on a real rejection.

## Limits and changes in this audit

The worktree classification is metadata-level. I did not audit every page,
review all media, reconcile every dirty file, verify all bills, observe Mac-off
phone delivery, change private account state, or activate the parked inbox.
No proposed broad solution is labelled deployed. Earlier PR103 repairs are
merged. No provider call was made by this audit. A manual legacy dispatch may call
Anthropic and may retain the old feed when no new stories arrive; its artifact
is inspection material, not an admitted or necessarily fresh candidate. The
workflow guard checks current YAML structure, not every possible indirect write
route or editorial quality. The exact legacy publisher retirement is implemented
locally with negative workflow tests; its remote merge/run state is recorded in the PR and
`OPERATING-RECOVERY-NEXT.md`. All uncertain source/owner gaps above stay open.


## Keep, combine, repair, retire — decisions from the mapped traces

| Component | Recommendation | Why / exit condition |
|---|---|---|
| Native task + Goal mode | KEEP; explicitly activate for sustained accepted work | Native continuation is simpler than an agent repeatedly messaging itself. Verify milestones do not end the goal; retain existing permission boundaries. |
| Existing work events/handoffs | REPAIR coverage and routing | They preserve objective/state but are an opt-in pilot, not a live dispatcher. New session -> bound objective -> real checkpoint -> continuation/wait/resolution must be exercised. |
| 67 product roles and 34 specialists | KEEP responsibilities; COMBINE runtime execution where one competent agent suffices | Roles need not be permanent workers. Spawn a distinct reviewer only when independent judgment can reject a real failure; use specialists on demand. |
| Baseline CI | KEEP as integrity checks | Do not label schema/fixture success content quality or end-to-end completion. Each quality claim needs its actual artifact and purpose. |
| Shared learning guards/registry | REPAIR as one complete distributed package | Resolve admitted positive-source drift, connect pending -> admitted lesson, and run a blind real-artifact trial before trusting the evaluator. |
| GitHub source polling / private Cloud maintenance | KEEP bounded polling; REPAIR receiver and notification evidence | Existing services already perform parts of the cloud job. One finding must reach a live owner and resume without Ali relaying context. |
| Legacy HotGoss publisher | RETIRED by PR104 | Keep it from returning through old branches or generated instructions. |
| Current visual reference entry | KEEP small; integrate PR106 with its current owner | Selection consumer tests matter alongside the view. Do not expand into an all-artwork archive or infer public reuse. |
| Old worktrees and historical instructions | PRESERVE, then disposition exact packages | Start with active owner/integration gaps. Archive only after unique uncommitted work is preserved and a successor/source is verified. |
| New project manager, graph database or messaging subscription | DEFER | No measured failure currently requires one; they would add another state store and another inbox. Reconsider only after the existing supported route fails its acceptance trial. |

### How to manage this without a new bureaucracy

At intake, the agent captures one outcome and acceptance condition in the existing
work record, identifies its receiving owner and takes a bounded file lane.
During work, checkpoints update that record and the same task continues through
available steps. A dependency gets an exact trigger and accountable receiver;
it does not halt unrelated authorized work. At closure, the receiving artifact,
commit/release state and actual outcome are reconciled before the task is marked
done. Recurring deterministic checks report exceptions; the model interprets
only material deltas. Ali sees a decision only for her reserved authority or a
real new constraint, with the prepared choice in the message.

Use the existing operating review cadence to examine unresolved handoffs,
repeated defects, stale instructions, orphaned work and measured usage together.
Do not create another timer while local/cloud ownership is being reconciled.
Track elapsed time waiting for 'continue' as a failure, independent of code-test
success. Cost reporting separates subscription allowance, API tokens and
platform/storage charges; account-wide usage is not a task cost measurement.

### Remaining proof before calling this a working system

1. Native continuation actually invokes for this task and a fresh admitted task;
   completed, user-stopped and genuinely waiting work is not restarted.
2. One rejected real artifact changes the maker's applicable preflight and the
   repaired reviewer rejects that artifact unaided; a new case demonstrates the
   intended user result. Fixture verdicts do not satisfy this.
3. One scheduled signal reaches an executable owned candidate on the receiving
   branch, through exact preview and applicable release approval to a live check.
4. One meaningful cloud result reaches Ali privately and a reply resumes the same
   job without the laptop for cloud-compatible steps. No invented test decision.
5. Selected old work packages are integrated/superseded/parked with preserved
   originals and verified receiving sources. No mass cleanup based on folder age.

These are finite acceptance trials followed by measured operation; they cannot
be honestly certified from a diagram, repository presence or current green CI.
