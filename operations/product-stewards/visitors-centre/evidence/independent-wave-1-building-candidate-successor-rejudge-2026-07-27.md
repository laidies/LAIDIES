# Independent successor rejudge — Visitor’s Centre Wave 1 candidate

**Verdict:** `ACCEPT — VIS-FAILURE-01 CLOSED / LOCAL CANDIDATE REVIEW CLEARED`  
**Review time:** 2026-07-27 America/Vancouver  
**Scope:** exact isolated candidate only; no maker, live route, shared data, integration, deployment or public mutation.

## Bound inputs

- Maker handoff: `operations/product-stewards/visitors-centre/control-room-handoff-building-wave-1-candidate-2026-07-27.md`, SHA-256 `97d6bcacb26c992d3ad7acb11a9358ab94e94a027671b3cbf0d088c481b4f56f`.
- Candidate: `operations/design-explorations/building-wave-1/visitors-centre/index.html`, SHA-256 `55434c0cce88ad2cd30099ffb184bd8cc5f3d3ce6a3a1b85a98d4cad350df563`.
- Candidate test: `operations/design-explorations/building-wave-1/visitors-centre/test-candidate.mjs`, SHA-256 `1f628a7d14cbd8394ff89f77b75bbbcfa19507000315998ab96f671cff4f9584`.

## Independent result

I copied the bound candidate to an isolated temporary mirror, leaving maker
bytes and candidate evidence untouched, and executed its browser suite against
that mirror. The suite returned **41/41 PASS**.

At both 390px and 320px after an induced map-image failure:

- the recovery panel is visible and states that the illustrated map is
  unavailable;
- visible hotspots = `0`;
- enabled/focusable hotspots = `0`;
- the complete directory remains available with exactly `17` destination
  controls.

Regression coverage also passed for desktop, 390px, 320px, storage denial,
selection/reveal, exact destination handoff, Escape return, no-JS structural
directory and horizontal-overflow checks. The independently rendered mobile
failure view confirms that recovery copy is unobscured and the directory is the
only remaining destination-control surface.

## Acceptance boundary

`VIS-FAILURE-01` is closed. This clears the bounded Wave 1 local candidate
review only. It does not approve production integration, image/Brand authority,
shared directory truth, receiving-route outcomes, native assistive technology,
public origin or deployment.

