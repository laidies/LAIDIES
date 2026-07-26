# ECO-01 independent-review repair evidence

**Date:** 2026-07-25  
**Status:** REPAIRED LOCALLY — HOLD / FIX BEFORE LAUNCH  
**Input verdict:** `independent-review-eco-01-verification-rulebook-2026-07-25.md`
— HARD FAIL  
**Maker boundary:** this repair cannot approve itself

## Repair outcome, in review order

### 1. Exact reader claim binding

`content/library-books/verification-rulebook.json` is now the only editorial
source for:

- the 14 exact public claim wordings;
- stable `VR-C###` IDs;
- source IDs and exact support locations;
- version/access/currentness records;
- scope and qualification;
- correction history and next-review triggers; and
- the reader nodes that place claims beside the relevant teaching.

The renderer generates both
`content/library-books/verification-rulebook.claims.json` and
`grimoire/verification-rulebook.html` from that source. Every rendered
material claim shows its ID, exact wording, status, source links,
qualification and an ID-filled correction link. The Source drawer exposes the
plain claim ledger. The contract fails on any wording, ID, source,
qualification, currentness or generated-source-hash drift.

### 2. Current and entailing sources

- `VR-C007` and the source drawer now use C2PA Specifications 2.4, with support
  bound to §§1.2, 1.3 and 2.3.
- The claim history records the triggered 2.2 → 2.4 correction.
- `scripts/check-eco01-source-versions.mjs` checks the official C2PA index and
  fails when it exposes a newer version. The live check reports 2.4; a
  synthetic 2.5 fixture is rejected by the contract test.
- `VR-C006` now uses Digital Inquiry Group’s **Intro to Lateral Reading**
  lesson, whose opening description explicitly defines leaving the page and
  consulting trusted websites in another tab.
- Synthesized claims C005 and C011 are labelled qualified LAiDIES syntheses,
  with exact source contributions and limits rather than false direct
  attribution.

### 3. Locked interaction architecture

The rendered candidate now implements:

- Chapter 1: eight line classifications;
- Chapter 2: five artifact-to-operation matches;
- Chapter 3: three vague/compound-claim repairs;
- Chapter 4: three-source comparison plus required reason and evidence action;
- Chapter 5: a three-row claim table, verdicts and required reasoning;
- Chapter 6: separate freshness and media-provenance cases with reasoning;
- Chapter 7: low, material and high-stakes action choices; and
- closing transfer: a required 120-character evidence plan before the rubric
  can be revealed.

Native radios, selects, textareas, fieldsets and buttons remain keyboard
operable. Chapters 4–7 and the transfer cannot reveal feedback until required
reasoning fields meet their minimum length. A reveal is explicitly not a
completion award.

### 4. Evaluation taxonomy and false-confidence probe

All 18 cases now separate:

- `evidenceVerdict`;
- `qualification`; and
- `requiredAction`.

Only the canonical evidence verdicts are accepted: `SUPPORTED`,
`CONTRADICTED`, `UNRESOLVED`, `NOT APPLICABLE`.

- E08 splits the supported arithmetic (two to one is a 50% fall) from the
  unresolved claim of meaningful improvement without volume/method.
- E18 uses `UNRESOLVED` for the evidence and separately requires stopping and
  escalating to a prescriber/qualified professional.
- E13 now tests an official primary source with missing method, interested
  incentives and uncertain applicability. A passing response may neither
  accept nor reject it solely because it is official/primary.
- Counts remain exactly 18 with 4 explanation, 6 application, 4 misconception
  resistance and 4 transfer cases.

### 5. Accessibility source repairs

- All anchor targets receive `scroll-margin-top: 5.5rem` for the sticky bar.
- Feedback is deliberately announced in place using
  `role="status" aria-live="polite" aria-atomic="true"`; the ineffective
  `feedback.focus()` call was removed.
- Required interaction fields use native constraint validation.
- The deterministic test checks unique IDs, exact interaction quantities,
  scroll margin, in-place live-region strategy and all claim/source bindings.

Playwright is not installed in this workspace, so no claim is made that the
manual/browser acceptance matrix passed.

## Exact repaired candidate

| Artifact | SHA-256 |
| --- | --- |
| Canonical source | `be70dae96ac602653304bb031f4e6834cb0c7e6bf17b8efa157d0cb394ebc3f9` |
| Generated claim ledger | `3074c44618e7213c9fdca2e833705a045ec8e3f22e2fe02603588b7bb167dd82` |
| Evaluation suite | `168246804ce9deb2723a0cf3a8c90e19d06d936093afc6e84e0e8a106cf8bdc5` |
| Rendered HOLD candidate | `63bdc8a6b790dc8a8bf2f1ead37832385612683ac3591b65670091b7bfdcb2e4` |
| Renderer | `cac244a5096c78641ed88a02472293a03248598b159df0405356ac78b9032ff6` |
| Contract test | `9e666645243c8458855020d66ca86a8771ce14f3545cc65d934046b3104f590d` |
| Source-version monitor | `c2aa72144b9b34234e7f1f1bcc10d8f3349e6fc511d2b35afa8ccdf8458b28bc` |

## Verification

Passed after the final deterministic render:

```text
node scripts/test-eco01-verification-rulebook.mjs
  ECO-01 CONTRACT PASS
  chapters=7 claims=14 evals=18 status=HOLD

node scripts/check-eco01-source-versions.mjs
  ECO-01 SOURCE VERSION PASS: C2PA 2.4

node scripts/check-inline-js.js
  PASS — 353 scripts / 132 live pages

node scripts/check-local-links.js
  PASS — 1,943 local references / 110 pages

node scripts/check-town.js
  PASS

node scripts/check-product-stewards.mjs
  PASS — 65 products; active 3/3

git diff --check -- <ECO-01 paths>
  PASS
```

## Still mandatory

The independent review’s remaining sequence is unchanged:

1. independent accuracy/instructional/brand/accessibility re-review against
   the exact new hashes;
2. complete Chrome/Safari widths, keyboard, zoom, reduced-motion, focus,
   clipboard and current VoiceOver/Safari evidence; and
3. the separate eight-newcomer study with the locked 7/8 floors.

The Library shelf and Miss Jeeves remain PREVIEW/HOLD. No deploy, publication
or public-state change occurred.
