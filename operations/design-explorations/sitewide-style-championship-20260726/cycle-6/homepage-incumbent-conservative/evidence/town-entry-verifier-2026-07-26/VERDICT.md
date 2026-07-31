# Town Entry independent verification — Cycle 6 conservative Homepage

**Verdict: HOLD — canonical public-name repair required before Ali review.**

## Exact candidate bound and rendered

- Clean incumbent: `8231d1290b15a0a867ee063e947f39b3cc22a8c54a4efa741eff60e0c75a1eb3`
- Loader: `40f4bcc3f05d24b0a161d2d894e0ec8a494a52b8cf194232395134e4d35578cf`
- Runtime: `daef4e6241ae5cba12bbde2d28e803bbbb1c921673b16166bfb6281ee7c40bec`
- CSS: `09dfc10d78919805bb993bd867617bf1568e18407a39d7a8f575ed51efbabba5`
- Manifest: `0c21f6925ebe4f823fdb777d033c423843ab0949c78f8da4b821bb3e815b85e7`

Fresh isolated Chromium renders reproduce both sealed full-page outputs:

| Viewport | Verifier render | SHA-256 |
| --- | --- | --- |
| 1440×900 | `homepage-cycle6-1440.png` (1440×11881) | `e2eefeb89b8f950d522d2932c22b2530fc6b71e0676dc7c81c361f2d918ba257` |
| 390×844 | `homepage-cycle6-390.png` (390×18066) | `f05c8faa9a77bd0b7a2a2119c76388e0043fb67b01805ebb54de993625c45700` |

## Independent findings

- **BIND-001 PASS:** loader, clean incumbent, runtime, CSS, manifest and both
  rendered image hashes match the handoff exactly; the loader did not enter its
  checksum-hold state.
- **ENTRY-002 PASS:** the exact locked hero/method copy, information
  architecture, navigation/control counts and destinations remain intact. No
  Cycle 5 readiness/receiver/receipt/status-copy regression appears.
- **VISUAL-003 PASS:** full desktop/mobile inspection confirms one luminous
  masthead, no broken images or horizontal overflow, no white status-card grid,
  zero rejected FAiRY scene, one approved FAiRY-house image, and zero unaudited
  Dream Phone/NewsStand raster uses. The conservative colour-bearing treatment
  is visibly coherent at both widths.
- **CANON-NAME-004 HOLD:** the rendered candidate retains five current public
  `Visitor Centre` instances, contrary to locked `Visitor’s Centre` canon:
  the map hotspot `aria-label` and `data-name`, its activated popup title, the
  Civic Square description, and the town-directory link. The map action still
  correctly targets `/visitors-centre.html`, but its visible and accessible
  name is wrong at both 1440 and 390 widths.

The failure is not historical evidence, a path-bound filename or map artwork:
it is mutable active DOM copy/ARIA produced by the exact candidate. It cannot
be waived by the candidate's claim to preserve all public copy, because the
locked canonical-name ruling is an explicit allowed/required correction.

## Required successor

Brand must create a candidate-only successor that changes all five active
instances to exactly `Visitor’s Centre`, including the interactive hotspot and
popup output, then reseal runtime, manifest and full-page renders. Return the
new exact tuple for Town Entry re-verification. Do not present Cycle 6 to Ali
until that succeeds.

This HOLD does not alter live routes, global style, deployment, public state or
Ali authority.

## Learning scan

Cycle 6 confirms the prior prevention rule: a clean restored copy snapshot can
still contain superseded current canon. Verify rendered text, ARIA/data labels
and popup output independently of copy-parity claims before admitting a visual
candidate.
