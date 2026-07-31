# Integration handoff — entry readiness projection v1

**Status:** PLATFORM SHARED BUILD PASS — OWNER/CONSUMER INTEGRATION REQUIRED  
**Sender:** Functionality & Platform Director  
**Recipients:** Control Room; Town Entry/Homepage owner; Visitor's Centre
owner; destination/content owners; Release  
**Evidence:** `evidence-entry-readiness-projection-v1-local-2026-07-26.md`

## Literal output

Platform built and placed the smallest shared contract needed to replace
manual entry status duplication:

- one 17-destination + three-current-slot schema;
- owner-evidence verification and immutable seal;
- 24-hour maximum freshness and per-item deadlines;
- correction/predecessor and replay protection;
- fail-closed Homepage current-content output;
- fail-closed 17-route Visitor's Centre semantic receiver; and
- privacy-safe projection health events.

The curated build now contains the exact versioned schema, browser runtime,
canonical crosswalk and sealed fail-closed envelope under
`content/site/readiness/v1/`. The owner intake names all 17 destination slots
and three current-content slots. All 20 receipt paths are null, so no owner
status is inferred and no current item is promotable.

No Homepage, Start Here, Visitor's Centre or live route changed. No provider,
credential, migration, deployment or public state changed.

## Requested integration lock

Control Room should create one bounded lock with these non-overlapping stages:

1. **Owner receipts:** destination, Episode and NewsStand owners publish exact
   contributions in their own scopes.
2. **Platform build:** DONE LOCALLY for the all-null fail-closed candidate;
   Platform recompiles/seals an owner-backed successor after receipts are
   independently admitted.
3. **Town Entry receiver:** Homepage/Start Here owner wires only its consumer
   and failure UI.
4. **Visitor receiver:** Visitor's Centre owner replaces manual readiness copy
   with the semantic receiver while preserving static 17-route fallback.
5. **Independent gate:** runtime/accessibility judge verifies current, stale,
   corrupt, correction, no-JS/data failure, Escape/focus and route-arrival
   semantics.
6. **Release:** exact projection and page artifact ship/rollback together only
   under separate deployment authority.

## Acceptance ownership

- Platform accepts only schema, seal, integrity and receiver semantics.
- Town Entry accepts Homepage/Start Here product behavior.
- Visitor's Centre accepts its map/directory/reveal behavior.
- Every destination/content owner accepts only her own public claim.
- Independent accessibility/runtime judges accept rendered behavior.
- Control Room/Release owns integration identity, deploy, rollback and public
  proof.

## Exact blocker and next trigger

The shared Platform artifact lane is complete. The next action requires
destination/content-owner receipts or consumer-owned files and therefore
stops at those named locks.

Both consumer owners have now returned exact isolated candidates:

- Town Entry/Homepage and Start Here: VERIFIED LOCALLY, maker + independent
  browser PASS 11/11, payload
  `ff422f00ae68cc7b01fadaa1438771742416d14207bbf2394a5eae808734b9ec`;
- Visitor's Centre v3: VERIFIED LOCALLY and independently admitted, Platform
  rerun PASS 389/389, candidate
  `d8f16d86ea71c1f81c9d57fb4e3da1ec7cb91b02900bc9e5f7202aa6e4b17a5e`.

These receipts clear isolated receiver compatibility only. Trigger: the 17
destination owners plus Episode/NewsStand owners submit checksum-bound
receipts, then Control Room grants the exact two-consumer shared integration
lock. No staging provider is needed until that exact integrated build is ready
for cache/correction/runtime and optional analytics delivery verification.

Evidence:
`evidence-entry-readiness-shared-build-v1-2026-07-26.md` and
`evidence-entry-readiness-consumer-receipts-v1-2026-07-26.md`.
