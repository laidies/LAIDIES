# Independent verdict — Visitor’s Centre Wave 1 candidate

**Verdict:** `HOLD — REPAIR REQUIRED`  
**Review time:** 2026-07-27T01:42:17-0700  
**Scope:** candidate-only `operations/design-explorations/building-wave-1/visitors-centre/**`; no maker, route, asset, integration, deployment, or public change.

## Bound inputs

- Maker handoff: `control-room-handoff-building-wave-1-candidate-2026-07-27.md`, SHA-256 `19a8be3c542bc828cf02997efcbf0154af1e4170b83c5426f89d3e55d87994f8`.
- Candidate `index.html`: SHA-256 `3fda4a4f48fd7bc4567009e2e663ea4c4a3c1a6a8d8845728f69054c0d02d822`.
- Candidate test: SHA-256 `cd6bc96ae67ba1d02af77c59866a5d3b42fe4eaeb9fa20e6430116e7630f65df`; rerun result: `34/34 PASS`.
- Fresh rendered evidence inspected: desktop `9648d17a…48f2`, mobile 390 `f6731200…d333`, mobile 320 `cd9f2057…9c75`, image failure `204c587f43759346d13ea82d6b674f92c008ec3751985bd41ae0a1a01131f9cc`, and no-JS `9eab52158d940e97c94680dc9a715a35d23b46d49ecd792c8582303206066a8e`.

## What passes

- The first view is an inhabited, colourful orientation room with the town map as an operated object; it is not the rejected neutral front-desk/card-grid model.
- `Visitor’s Centre` is canonical throughout the inspected candidate.
- Desktop, 390 and 320 evidence show one named-directory route equal to map access, 17 destinations, no visible horizontal overflow, and clear candidate-only/non-completion language.
- The directory, map controls, status reveal, exact handoff, Escape close, storage-denied state and structural no-JS directory all pass the bound deterministic suite.
- The candidate does not infer account, reward, ownership, destination completion, postcard delivery, tour completion or trailer playback.

## Reason-coded hold

### `VIS-FAILURE-01` — broken-map recovery is visibly obstructed

The supplied 390px image-failure render shows the intended recovery text underneath all seventeen active map hotspot buttons. The message therefore cannot serve as a readable recovery state, despite the test only asserting that `#mapFallback` becomes visible.

The source confirms the failure: on image error it only adds `.is-on` to `#mapFallback`; it does not hide, disable, or remove `.spot` controls. Both fallback and spots are absolutely positioned inside `.map-stage`.

This violates the required image-failure journey: the named-directory recovery must be readable and the map must not remain a confusing active control surface once its illustrated basis is unavailable.

## Exact repair and rejudge boundary

1. In the isolated candidate only, change image-error handling so all map hotspots are unavailable/hidden from pointer and keyboard interaction while the fallback is displayed; preserve the complete named directory as the equal recovery path.
2. Update the candidate test to assert zero visible/focusable hotspots in image-failure state, then recapture 390 and 320 failure evidence.
3. Re-run the full 34-check suite plus an independent visual check of desktop, 390, 320, no-JS and image failure.

## Evidence limits

The interactive browser binding was unavailable in this judge session. This review used the candidate’s own fresh rendered screenshots, static source inspection, and rerun deterministic suite. Native Safari/VoiceOver, real receiving-route outcome, public-origin, and final visual authority remain separate gates.

No production or public acceptance is granted.
