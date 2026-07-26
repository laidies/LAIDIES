# Blend & Snap weekly-pack manifest build packet

**Status:** REPAIRED LOCALLY — REPAIR 2 TESTS PASS; INDEPENDENT RE-JUDGE PENDING

## Outcome

- **Product:** Blend & Snap weekly Study Pack coordinator.
- **Problem:** a published episode currently becomes “this week’s Study Pack”
  even when Study Sheet/cards or other components are absent or unadmitted.
- **Outcome:** one versioned manifest controls exact component availability,
  labels and routes; the café fails closed rather than presenting completeness.
- **Scope:** manifest, café controller/copy, owned local persistence failure,
  judge-named Welcome Tour/directory/Episode 01–04 cross-entry copy,
  validation/browser tests and dossier evidence.
- **Non-goals:** Study Sheet placeholder, account/reward system, card-economy
  repair, visual creation/replacement, external mutation or release.

## Direction

Preserve the café ORDER ritual, but make the ordered object a truthful
episode-specific menu. Only `available` rows become links. `held`, `planned`
and `unavailable` remain visible with reason/next-action copy.

No external dependency is proposed: a small local JSON contract plus
deterministic validation is cheaper, auditable, offline-capable and reversible.
A schema library may be reconsidered only if this contract grows beyond one
owned dataset.

## Work breakdown

| Work item | Craft owner | Output | Status |
|---|---|---|---|
| Reconcile operating contract | Blend & Snap champion | `OPERATING-SPEC.md` | COMPLETE |
| Inventory released episodes/components | Data/content maker | Evidence + manifest | COMPLETE |
| Implement fail-closed café | Frontend maker | `blend-snap.html` | COMPLETE |
| Repair storage-denied save truth | Try-On maker | `try-on.html` | COMPLETE |
| Deterministic validator | Quality automation maker | `scripts/validate-blend-snap-packs.mjs` | PASS |
| Cross-entry contract suite | Quality automation maker | `scripts/test-blend-snap-cross-entry.mjs` | PASS — 54 |
| Rendered journey suite | Accessibility/frontend maker | `scripts/test-blend-snap-browser.mjs` | PASS — 90 |
| P0 contradiction repair | Blend & Snap maker | café overlay, public notes, tour/directory/Episode rails | COMPLETE |
| Public/private evidence split | Data/trust maker | minimal public manifest + private dossier evidence ledger | COMPLETE |
| Accessible failure/retry | Accessibility/frontend maker | persistent live status, timeout, retry and deterministic focus | COMPLETE |
| Independent re-judge | Separate judge | dated independent review | PENDING |

## Acceptance and independent review

| Gate | Exact evidence | Independent owner | Result |
|---|---|---|---|
| Product/learning quality | Distinct jobs and no false complete-pack or weekly/card guarantee | editorial-learning director | RE-JUDGE PENDING |
| Accuracy/safety/trust | Exact route/status inventory; no private metadata in source/artifact payload | identity/reward truth judge | RE-JUDGE PENDING |
| Brand | ORDER/café hospitality retained without productivity coercion | brand creative director | PENDING |
| UX/accessibility | Rendered new/return/fail/live-status/retry/storage/mobile/keyboard/motion/cross-entry suite | accessibility-responsive QA | RE-JUDGE PENDING; NATIVE HOLDS OPEN |
| Frontend/data | Schema, stale/index disagreement, route, cross-entry and global checks | independent technical judge | RE-JUDGE PENDING |
| Visual/media | Existing art preserved; stale wording covered with accessible text | visual/brand judge | ALI APPROVAL PENDING |

## Integration and release

- Affected champions: Episode Experience, Try-On, Trading Cards, High, Welcome
  Tour and town directory.
- No shared canon, identity, reward or analytics contract is changed.
- Candidate is local source plus exact manifest/evidence hashes.
- Release requires separate artifact identity, independent admission, rollback
  and public-origin checks.
- Rollback: restore the prior café controller/copy and remove the new manifest;
  do not touch downstream component data.

## Measurement and learning

- Baseline absent; no click is treated as learning.
- First post-release review would inspect controlled pack-data failures,
  component choices and qualitative comprehension without personal content.
- Dossier/state/backlog updated after exact local and fresh-artifact tests;
  Repair 2 evidence is
  `evidence-weekly-pack-manifest-repair-2-maker-2026-07-25.md`.
