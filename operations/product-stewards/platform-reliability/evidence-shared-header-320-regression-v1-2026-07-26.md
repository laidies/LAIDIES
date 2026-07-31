# Evidence — shared header 320px regression v1

**Status:** DETERMINISTIC CHECK BUILT; SHARED HEADER HOLD; VISITOR CONTAINMENT PASS  
**Observed:** 2026-07-26 12:20 PDT  
**Scope:** Platform-owned test/evidence only  
**Production/shared visual files changed:** none

## Dependency receipt

The current Visitor live-route admission is checksum-equivalent:

```text
de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743  visitors-centre.html
68eab175cb61065e554ab8ad2fb20eac9b22fc8b38ad9b6d3aa88178e1ea425e  content/site/readiness/v1/readiness-runtime-v1.js
adce724425984cb67a39ec5f8013e0a6e3dd341e3b40d09e8714b83940e37880  content/site/readiness/v1/entry-readiness-projection.v1.json
```

Platform reran the exact owner test:

```text
node operations/product-stewards/visitors-centre/test-live-route-readiness-v1.mjs
checks=779
failures=[]
```

This verifies local route composition and receiver behavior only. It does not
admit owner receipts, deploy, prove public origin, or change any destination
status.

## Deterministic header characterization

Test:

`operations/product-stewards/platform-reliability/shared-header/v1/test-shared-header-320.mjs`

The harness serves the current Visitor route twice at 320×700 in headless
Chrome 1.61.1:

1. the current route, including its route-local containment;
2. an in-memory copy with exactly that one containment rule removed, leaving
   the current shared header source unchanged.

It asserts the expected containment rule exists exactly once, blocks external
network requests, waits two animation frames, and measures actual DOM geometry.

| Surface | `.svgh-nav` right | nav width | document width | Verdict |
|---|---:|---:|---:|---|
| Raw shared header | 333.94px | 244.63px | 334px | **HOLD — exceeds 320px** |
| Visitor route-local containment | 312px | 179.84px | 320px | **PASS** |

Bound hashes:

```text
f500707712e100e45d972daada9dc60a7801ced07f6f517ff8c41752d2761d93  content/site/sv-global-header.js
de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743  visitors-centre.html
```

Characterization command:

```text
node operations/product-stewards/platform-reliability/shared-header/v1/test-shared-header-320.mjs
SHARED HEADER 320 CHARACTERIZATION PASS shared_status=HOLD raw_nav_right=333.94 visitor_nav_right=312
```

Release-gate command:

```text
node operations/product-stewards/platform-reliability/shared-header/v1/test-shared-header-320.mjs --gate
SHARED HEADER 320 GATE FAIL navRight=333.94 scrollWidth=334 viewport=320
exit=1
```

The nonzero gate is intentional and remains the authoritative shared result
until the shared component itself fits. The characterization mode exits zero
only because it successfully detects the known defect and proves the current
Visitor containment.

## Downstream handoff

**Repair owner:** Shared Header visual/component owner, with Platform retaining
the regression gate.  
**Integration authority required:** a separate checksum-bound lock naming
`content/site/sv-global-header.js`, representative downstream routes and the
independent responsive/accessibility judge.  
**Acceptance proof:** raw shared-header mode must exit zero at 320px without
route-local CSS; 320/390/1440 representative routes must preserve brand, Menu,
account status, Join, focus, 44px targets, text spacing and reduced motion; no
route may silently drop account or navigation semantics. Visitor independently
rechecks its exact route before any local containment is removed.

**Exact next action:** Control Room assigns the shared-file integration lock to
the Shared Header owner. That owner implements the smallest shared CSS repair,
runs `--gate`, then routes exact hashes to Platform and the affected page owners
for independent acceptance. Platform must not make the visual repair under the
current test-only lock.
