# Independent consumer acceptance — shared header SVGH-320-2026-07-26-v1

**Verdict:** **HOLD — exact receipt mismatch.**

**Acceptance owner:** `visitors_centre_independent_shared_header_consumer_acceptance_20260726`.

## Binding check

| Artifact | Expected SHA-256 | Observed SHA-256 | Result |
| --- | --- | --- | --- |
| Shared source `content/site/sv-global-header.js` | `807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa` | same | PASS |
| Frozen Visitor route `visitors-centre.html` | `de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743` | same | PASS |
| Candidate receipt `operations/product-stewards/platform-reliability/evidence-shared-header-320-repair-candidate-v1-2026-07-26.md` | `299876c0962e45f282579e4c61d61bb4365a5ddbf91a7efaf3d3375e71d9c049` | `1a36e936a35558bc2297a35090fabc63825e750d7d260b641bcf18bca1c94370` | **FAIL** |

The route and candidate source are correctly frozen, but the evidence document
is not the supplied immutable receipt. It could have changed after sealing, or
the supplied checksum could name a different revision. Either explanation
makes the requested exact candidate unverifiable.

## Scope and non-findings

I read the current receipt and confirmed that it describes a 320px shared
geometry repair, consumer-matrix coverage at 320/390/1440, keyboard/Menu/
Escape/focus, no-JS fallbacks and a 200% reflow proxy. Those are maker claims
in a receipt whose exact binding failed; they are not independently accepted
here. I intentionally did not promote its matrix results to a consumer PASS or
run a successor candidate under a mismatched receipt.

This HOLD says nothing about the previously rejected Visitor page model. It
does not revive, validate or reconsider that model. The Visitor route-local
header containment remains in place until a separately locked route change and
new independent route acceptance authorize its removal.

## Next trigger

Platform must reseal the exact evidence receipt (or provide the correct
immutable receipt checksum) against shared source
`807bbe6…1efa` and Visitor route `de8e53…7743`. Then submit that tuple for a
fresh consumer acceptance covering raw 320 containment, 390/1440 parity,
keyboard/Menu/focus/Escape, no-JS and the stated 200% reflow proxy.

No shared source, Visitor route, acceptance file, state/backlog record,
deployment or publication was changed.
