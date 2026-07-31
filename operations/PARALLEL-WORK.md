# Parallel work

**Last reconciled:** 2026-07-30
**Owner:** Codex (traffic control, reconciliation and truthful status)
**Purpose:** let independent backstage work advance without giving Ali several
simultaneous decisions or losing unfinished work in separate chats.

The foreground objective remains in `operations/ACTIVE-WORK.md`. This file
tracks bounded supporting lanes. A lane report is evidence or a candidate
input—not automatic authorization to edit canon, deploy, publish, cancel a
service or change external state.

## Lane contract

Every lane must record:

- one bounded objective and named owner;
- stable inputs and known dependencies;
- read/write authority, including exact disjoint paths if edits are allowed;
- a definition of done and evidence expected;
- a hand-back/integration gate;
- current status and exact next action.

The default for delegated lanes is **read-only**. Agents in the same Codex task
share a filesystem, so two agents editing overlapping files can overwrite or
invalidate each other even when their conversations are separate.

## Safe to parallelize

- read-only research, audits and inventories;
- verification/tests against stable inputs;
- isolated drafts or assets with disjoint output paths;
- independent analysis that returns to one owner for reconciliation.

## Keep sequenced

- overlapping file or canonical-copy edits;
- downstream work built on an unapproved lesson/product decision;
- deploys, merges, migrations, billing/cancellation or authentication changes;
- simultaneous Git/history operations;
- anything whose results cannot be reconciled into one source of truth.

## Current lanes

| Lane | Objective | Authority | Dependency / integration gate | Status | Exact next action |
|---|---|---|---|---|---|
| PW-001 | Audit Episode 5 and the 24-episode arc; propose the lesson boundary, sequence, analogy limits and useful worked example | Read-only; no Episode 5 source edits | Findings must be presented to Ali before substance/canon/script changes | REJECTED AS GATE 1 AUTHORITY | Preserve technical cautions, but do not reuse its unauthorized scope narrowing or “whole industry” exclusion |
| PW-002 | Design the smallest safe NewsStand/deployment repair path from the verified live-status audit | Read-only report; implementation reconciled by the foreground owner | Public contract is WEDNESDAY + Tribune; TODAY is retired; candidate automation cannot publish | INTEGRATED | Current stories, public validator and manual-only intake are in the release candidate; Stage 2 remains deferred |
| PW-003 | Inventory locally evidenced subscription/tool dependencies and gaps in the private cost baseline | Read-only/private; no secret values, billing access, cancellation or endpoint calls | Any billing confirmation/change requires Ali; avatar deployment controls require read-only verification before repair | REPORT READY — P0 RISK FOUND | Review `operations/finance/subscription-local-dependency-inventory-2026-07-24.md`; verify deployed avatar source/usage controls without invoking generation |
| PW-004 | Red-team the replacement Episode 5 substance for technical accuracy and analogy boundaries | Read-only; no episode edits | Root must verify and reconcile findings before presenting Gate 1 | REJECTED AS SUFFICIENT GATE | Technical cautions remain useful; the review did not test fidelity to Ali's complete concept or the episode template |
| PW-005 | Red-team the replacement Episode 5 substance for instructional depth, usefulness and sequence | Read-only; no episode edits | Root must verify and reconcile findings before presenting Gate 1 | REJECTED AS SUFFICIENT GATE | The review validated the narrowed receipt assignment instead of the approved fashion-system episode |
| PW-006 | Identify the smallest safe season-map/audio-bible corrections after the Episode 5 ruling | Read-only; no season-source edits | Only approved/verified rows may change; unresolved 24-episode resequencing remains a separate Ali decision | INTEGRATED — SAFE SPINE ONLY | Episode 1/4/5/6 authority warnings corrected; Episode 6 is **Strike a Mode**; rows 7–24 remain unruled |
| PW-007 | Rehydrate the complete Episode 5 fashion-system intent and map it into the locked LAiDIES episode format | May write only `operations/research/episode-05-concept-recovery-2026-07-24.md`; no canon, substance, site, season, art or audio edits | Report returns to AW-001 when the current LIBRAiRY/Visitor's Centre foreground reaches its design ruling; it cannot become Gate 1 or canon by implication | REPORT READY | Integrate the recovered intent, concept map, technical seams and episode beat map when AW-001 returns; then run the blind fidelity gate before Ali sees Gate 1 |
| PW-008 | Produce the corrected LIBRAiRY book-cover palette families and one owner-review shelf proof | Audit task `019f904a…`; originally isolated to palette/candidate folders and BTB-067 | The completed 15-cover family was later integrated into the local LIBRAiRY candidate during owner-directed work; this does not approve the room art, books or public release | INTEGRATED | No more cover-lane generation. Preserve the local candidate for the whole-site release review and keep editorial/visual gates separate |
| PW-009 | Specify the existing Tour Guide as a reactive, source-grounded discovery companion | Foreground task; may write only `docs/product/tour-guide-companion.md`, the idea-backlog entry and this lane record | No character generation or live UI/event wiring until the current Library/Visitor Centre ruling and a three-direction visual selection | REPORT READY | Review the V1 boundary after the launch-critical Library ruling; then create exactly three character/interface directions before any implementation |
| PW-010 | Audit Episodes, LIBRAiRY, SUNNYVAiLE High, interactive tools, games and NewsStand as one complementary learning system | Read-only audit of public/canonical content; may write only audit reports, continuity records and the learning log | Findings require Ali's architecture rulings before book, class, tool, game, episode-order or NewsStand curriculum changes | REPORT READY — P0 TOOL/REWARD FAILURE FOUND | Review the learning-system audit, live logic audit and `operations/research/fairy-godmother-hero-product-strategy-2026-07-25.md`; repair answer safety and the grant/display/spend/refund loop before promoting FAiRY Godmother as the hero reward |
| PW-011 | Define and recover the P0 FAiRY Godmother implementation and evaluation baseline | May write the product contract, isolated test fixtures, fixture validator, recovered Worker project and continuity records; no live Worker, allowance, account, reward or production deployment changes | Remote staging requires isolated bindings and a staging secret; exact allowances and durable identity/Play ledger remain unruled | SOURCE RECOVERED — SPEC READY — LOCAL TESTS PASS | Refactor the recovered working mirror behind typed response helpers, verified identity boundaries, honest failure status, input/timeout controls and domain/task/safety routing; provision only isolated staging bindings before any remote test |
| PW-012 | Establish the Product Stewardship League and run the first launch-readiness pilot for FAiRY Godmother, Girl Talk, Dream Phone and Trailer/Episodes 1–4 | May write only `operations/product-stewards/`, the stewardship design, idea-backlog record and this lane; no product, deployment, account, analytics, reward or canon changes | Dossiers and scores inform AW-003 but do not approve implementation or release; persistent runner, scheduler, analytics pulls and notifications require separate wiring and verification | REPORT READY — P0 FAILURES FOUND | Use `operations/product-stewards/portfolio-launch-reconciliation-2026-07-25.md` as the P0 sequencing queue; keep all five motion candidates on hold pending the remaining audio/caption/full-motion gate |
| PW-013 | Build the smallest isolated resident account-entry test harness: local Supabase plus captured non-personal email, released migrations, disposable users and cleanup | May write only `operations/product-stewards/resident-card/staging-harness-2026-07-30/` and necessary ignored test-only local configuration; no production Supabase, personal email, Homepage, deploy, public or Git-history mutation | Existing deployed RLS/continuation proof remains valid; account-aware Homepage claims remain gated until magic-link entry/recovery, UI sign-out and Closet-native cross-context add/remove pass in isolation | BUILD REQUIRED — HARNESS READY / RUNTIME MISSING | Static harness, guarded scripts, pinned migrations and Inbucket configuration exist. Next dependency is Supabase CLI plus Docker (or a named isolated remote project and dedicated test alias); production remains blocked by guard |
| PW-014 | Inventory every public visitor page and the strongest existing candidates/assets before further page redesign | Read-only repository/release/public evidence; may write only `operations/product-stewards/control-room/sitewide-page-improvement-inventory-2026-07-30.md` | Must reconcile all release branches and receipts before declaring a gap; report informs sequencing but cannot edit pages or override the active Homepage design system | REPORT READY — RECONCILE CURRENT TREE BEFORE DISPATCH | Reuse-first 28-page inventory exists; direct current-tree inspection already prevented reopening one completed Sorority/Girl Talk repair. Use the report as a candidate list, not as a substitute for literal source reconciliation |

## Reconciliation rule

When a lane returns, Codex records one of:

- **INTEGRATED** — accepted into named foreground/source files and verified;
- **REPORT READY** — useful findings exist, but no implementation is implied;
- **DEFERRED** — preserved with a return trigger;
- **REJECTED** — not adopted, with a reason; or
- **BLOCKED** — missing dependency, owner and next action are explicit.

Only the foreground owner closes the loop. Ali may continue adding ideas at
any time; Codex decides whether each is captured, merged, sequenced or assigned
to a safe lane.
