# Independent verdict — Blend & Snap Wave 1 café candidate

**Verdict:** `HOLD — REPAIR REQUIRED`  
**Review time:** 2026-07-27T01:42:17-0700  
**Scope:** candidate-only `operations/design-explorations/building-wave-1/blend-snap/**`; no maker, route, manifest, shared asset, integration, deployment, or public change.

## Bound inputs

- Maker handoff: `CONTROL-ROOM-HANDOFF-WAVE-1-CAFE-CANDIDATE-2026-07-27.md`, SHA-256 `25524a22b3a22f8310017a3552b7367f6c4e52d8dbb7089bbac99aa042df3355`.
- Candidate identity: `index.html` `473652ddd7bf74a708bda05c92e237bd04731697998463f6d33dc9dd7989f4e5`; `candidate.css` `2bd6b6980c0b6bbca77570b5c72f126a64cfd1152bdca3d028fa468cc0ebf950`; `candidate.js` `dbe54cf38a6ce4da4692779900dba723af7dd0a2e594fbd44c498b3b51354826`; test `606abab67e31ec3a0da5dc8b563d8e9d20b8eb28a3614e74c808f4959077379d`.
- Rerun deterministic result: `94 checks PASS`.
- Fresh rendered evidence inspected: desktop healthy `eed359b02ca69280a1597a55cc85844e6fcde4f2bc63fdfd7fe68cfd06877051`, mobile healthy `42cdeed1d23081f7e760c42adc60e36fd5db728eeca08ba8baac667801e41690`, desktop offline `21676759164649a2ed8e2fd3f12083c84e695a46ccda041f074c86f592fb1955`, mobile 320 offline `ac2c7209dabe864691d83f2c6ece923170f06dc13a70faedb9968accd6966520`.

## What passes

- The candidate is recognisably JoJo’s café: counter, live Special, order rail, receipt ritual and noticeboard form one place rather than a generic link grid.
- Healthy desktop/390 evidence clearly separates the five component jobs and states: Study Sheet planned, Try-On and reference available, cards unavailable, Quiz a separate next-door assessment.
- The current menu, receipt and all handoffs keep account, reward, ownership, completion, collection and cross-device claims out of scope.
- The 94-check suite covers 1440/390/320, storage-denied, retry/focus, reduced motion, no-JS boundary, and failure closures. It correctly removes pack links and current availability claims when validation fails.

## Reason-coded hold

### `BAS-FAILURE-01` — archive recovery copy has unreadable contrast

The supplied offline desktop and 320px renders show the `The receipt archive is temporarily closed` article as near-white text on a white panel in the maroon `The Regulars` section. Its explanatory text is likewise not meaningfully legible. The recovery itself is structurally present, but users cannot read it.

The source establishes the underlying style collision: failure inventory uses `background:#fff` (`candidate.css` lines 274–280); the completed café skin changes `.back-rail` to a light text color (`#fff7e8`) (`candidate.css` line 451). The dynamically inserted `inventory-failure` does not reset its inherited foreground color.

This fails the required honest failure/retry experience at both desktop and mobile: a fail-closed archive state must be legible, not merely present in the DOM.

## Exact repair and rejudge boundary

1. In the isolated candidate only, explicitly set a high-contrast foreground color for `.back-rail .inventory-failure` (including its heading and body text); preserve the existing failure semantics and no-link behavior.
2. Add a rendered/asserted contrast or computed-color check for the archive failure state and recapture offline desktop plus 320 evidence.
3. Re-run the 94-check suite and independent visual check of healthy and offline desktop/390/320, no-JS, keyboard/focus and reduced motion.

## Evidence limits

The interactive browser binding was unavailable in this judge session. This review used the candidate’s freshly rendered evidence, static source inspection, and rerun deterministic suite. Native Safari/VoiceOver, 200% zoom, receiving-component outcomes, final JoJo/art authority and public-origin verification remain separate gates.

No production or public acceptance is granted.
