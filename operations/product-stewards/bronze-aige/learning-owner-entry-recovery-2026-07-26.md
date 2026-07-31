# Bronze AiGE owner-entry recovery learning scan

**Status:** LOCAL QUALIFYING LEARNING — CENTRAL PROMOTION QUEUED  
**Date:** 2026-07-26  
**Scope rule:** this initialization may edit only the Bronze dossier/evidence
area, so the canonical painpoints ledger was not changed directly.

## Observation

The first targeted preflight after recovery still failed with
`incomplete_functionality_visitor_states` even though the functionality map
contained the complete matrix and transition suite.

## Diagnosis

The owner-entry validator intentionally recognizes a canonical heading that
begins exactly `## Visitor-state`. The recovered map used the numbered template
heading `## 2. Visitor-state recognition and continuity`, so human-complete
content did not satisfy the machine entry contract.

## Fix and prevention rule

The map now uses the canonical heading and the targeted preflight passes.
Future templates and generated dossiers should share one machine-readable
section marker rather than depending on agents to infer a validator-specific
heading from prose. Acceptance must run the exact targeted preflight, not only
a human section inventory.

## Reusable success

Tracing the complete room tree—not only the six Bronze stations—surfaced
shared scripts that write tour, FAiRY Play, ritual, charm and visit-like state.
The functionality map now treats these as shared producer/consumer
transactions and queues them through Control Room instead of silently
excluding them from the building or creating a Bronze-local reward ledger.

## Possible Behind the Build angle

“The dossier had the right chapter, but the robot librarian could not find its
catalogue card” can teach the difference between human-readable completeness
and an executable interface contract. The stronger companion lesson is that a
page's invisible shared scripts are still part of the product a building owner
must map.

## Control changed

- Exact targeted owner-entry preflight is now part of the Bronze recovery
  acceptance sequence.
- Shared injected scripts are included in the complete visible/service
  inventory even when their code lives outside the building dossier.
- Central painpoints promotion is queued through the dossier's Control Room
  handoff rather than violating the initialization write boundary.
