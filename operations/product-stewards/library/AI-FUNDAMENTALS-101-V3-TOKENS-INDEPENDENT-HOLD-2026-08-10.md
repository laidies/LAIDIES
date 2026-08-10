# AI Fundamentals 101 v3 Tokens — independent review HOLD

**Evidence time:** 2026-08-10 PDT

**Candidate branch:** `library/ai-fundamentals-v3-representative-proof`

**Candidate head reviewed:** `492833e90bd3d1c5088c216d670fce83e35787d4`

**Exact status:** `BUILDING — PRODUCER PASS / INDEPENDENT HOLD / NOT DEPLOYED / NOT PUBLICLY VERIFIED`

## Exact artifact identity

- Prose: `content/library-books/pilots/ai-fundamentals-101-v3-representative-proof/review-text.md`
  - SHA-256: `65f070f99db037aef7875e277705fab6ea410c6bc0db899ffa63cd7afe4aea05`
- Render: `content/library-books/pilots/ai-fundamentals-101-v3-representative-proof/review.html`
  - SHA-256: `ebb89a32261ca4c8e6b5ba22c34e8547db35e678714e013d233f763930cac23f`
- Desktop diagram: `content/library-books/pilots/ai-fundamentals-101-v3-representative-proof/visuals/strawberry-token-route.svg`
  - SHA-256: `479883a54875c6ccb0ec2ace5ace46535814aec6a497de2cb1ea5c157c957e27`
- Mobile diagram: `content/library-books/pilots/ai-fundamentals-101-v3-representative-proof/visuals/strawberry-token-route-mobile.svg`
  - SHA-256: `2f5b4feeb4a278d2e3d1e5583ca8673e2e125757ea5c6cd50005e58af4ed72fa`
- Cold-reader protocol: `content/library-books/pilots/ai-fundamentals-101-v3-representative-proof/cold-reader-session-protocol.md`
  - SHA-256: `39f3a536ecf976d6933dd329f33d788ab99699eb8904e2dc92cd9b425b67c8d4`
- Recovered visual known-bad registry consumed read-only from
  `integration/release-dependency-recovery-20260808`:
  `operations/product-stewards/learning-content-ecosystem/visual-media-quality-exemplars.json`
  - Blob: `709c5a4e1c768487440541a70d9d3ffd0b19ce06`
  - SHA-256: `5aeb36e8a5a442870e322f07b1a6d730069c16d5892564da303233bbc33a294d`

The protocol commit did not change the prose, render or diagram bytes.

## Independent semantic verdict — HOLD

Artifact-first review found the prose strong: the reader payoff is immediate;
the mechanism is connected; the strawberry example is bounded to the named
encoding; the analogy performs one teaching job and states its limit; the
Concept Index remains distinct; the section is adult, practical and recognisably
LAiDIES; and the Hannah Fry communication mechanics are present without
imitation.

One objective evidence defect blocks semantic admission:

1. The prose says, `Processing more tokens creates more work for the hardware
   running the model`, then correctly rejects a fixed energy-per-token rule.
   The current claim packet does not bind that exact hardware/energy claim
   family to an exact primary-source excerpt. D-099 requires the binding rather
   than reviewer inference. The prose need not change if a primary source
   directly supports the current bounded wording.

The maker's `simulatedReaderProbe` fields have diagnostic authority only. Their
`PASS` labels are not observed-human evidence and may not be consumed by D-106.

## Independent visual verdict — HOLD

The exact mobile diagram passes responsive and semantic inspection. The desktop
diagram does not:

1. In Step 2, the required encoding qualification visibly clips after
   `another encoding may split it diff…`. Hiding this wording can make the
   `o200k_base` split look universal.
2. In Step 3, the label clips to `MODEL PROCESSES THE ORDERED…`, truncating the
   route's core model-processing stage.
3. The pink highlighted `r` letters on the yellow Step 1 card measure about
   `2.43:1` contrast. The nearby words preserve meaning, but the emphasis does
   not meet the intended large-text contrast floor or remain strong in
   monochrome.

Observed at `1440x1000`, `390x844`, grayscale, image-failure semantics and a
`720 CSS px / DPR 2` zoom-equivalent render. The mobile source selected and
rendered correctly; alt text preserved the mechanism when the image failed.

## Human evidence truth

The cold-reader protocol is artifact-specific and non-leading. It covers
orientation, lookup, explain-back and unseen transfer. It contains no outcomes
and therefore does not satisfy D-106.

Full Library admission still requires three unique unfamiliar
`OBSERVED_HUMAN` participants, administered independently of the maker, with
participant-specific verbatim evidence bound to the exact rendered artifact.

## Smallest ordered repair

1. Producer adds an exact primary-source excerpt binding for the current
   hardware/energy wording to the claim packet and producer factual map.
2. Visual maker changes only the desktop SVG: fit the Step 2 qualification and
   Step 3 title inside their panels, and strengthen the `r` emphasis with a
   higher-contrast/non-colour cue.
3. Rebuild and rerun the calibrated proof tests; the maker inspects exact
   desktop/mobile pixels.
4. Fresh role-distinct semantic and visual judges review the successor bytes.
5. Only after both independent reviews pass may an independent administrator
   conduct the three real unfamiliar-reader sessions.

Do not expand the rest of the book, integrate the Library route, deploy or
publish from this HOLD.

## Authority truth

- No candidate artifact was changed by either judge.
- No merge, Library integration, deployment, publication, spending or Ali
  approval was performed or inferred.
