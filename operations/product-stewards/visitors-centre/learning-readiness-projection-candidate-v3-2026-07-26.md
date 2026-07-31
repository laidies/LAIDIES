# Learning scan — Visitor's Centre readiness-projection candidate v3

**Status:** `LOCAL LEARNING RECORDED — CANONICAL LEDGER NOT EDITED UNDER ISOLATED SCOPE`

## Reusable success

An already admitted artifact should not be edited in place. The v3 builder
requires the exact admitted v2 SHA-256, then derives a new candidate and new
acceptance tuple. This preserves the prior receipt and makes the semantic
integration independently reviewable.

Prevention rule: every post-admission integration creates a new artifact
identity and stops if its declared admitted base bytes differ.

Possible Behind the Build angle: “Why adding one data receiver made a new
version—even though the room looked the same.”

## Local test surprise

The first v3 browser run stopped on a JavaScript test variable shadowing error.
After repair, the next run revealed that `innerText` reflected the status
pill's visual uppercase transform, while the semantic contract correctly
preserved mixed-case text content.

Prevention rule: assert contract strings with normalized `textContent`; assert
visual casing separately through computed styles or screenshots.

Possible Behind the Build angle: “The label was right, but the browser read
what the typography showed.”

## Scope truth

No private data, external service, shared system, live route, deployment,
publication or spend was involved. The synthetic Platform fixture is not
destination-owner readiness.
