# Independent review — NewsStand Wave 2 building candidate

**Verdict:** `HOLD — candidate-only; do not integrate, admit Paige/rack art, or
present for Brand/Ali building approval`

**Reviewer scope:** independent product, trust, interaction and responsive
review of the isolated candidate only. No candidate, dataset, production route,
art or shared input was edited.

**Review time:** 2026-07-27T03:15:13-0700 (America/Vancouver)

## Exact reviewed inputs

| Input | SHA-256 |
| --- | --- |
| `operations/design-explorations/building-wave-2/newsstand/index.html` | `e48ddf7321d54dfb1a61d3d5b2607146bae901770ce15af04ebb42284f5aacfa` |
| `candidate.css` | `1a42000b6dde824e9048cff14d97bdbf8668132a8d0c4e9b75e3a5ae499e8d32` |
| `candidate.js` | `4833354b31dd105393432d8823a2a2d078f255b920d513086e40a211c9c7f84e` |
| `test-candidate.mjs` | `98287bec5dc2e0d1a6ceed8c59c52c90d53d341a26a4795b4cfca6207c3e1215` |
| maker test record | `a703be8f990d5b0b13b8fafe3b9a10f4473f2cc639784720544b1d0bf6c4928c` |
| Paige/rack source art | `6f68b6d25bea566217551ccfbab496daa93bc6dceb90fc0af4ba9936ba85ebc5` |

The candidate was served locally from the repository root. Its production
NewsStand data and reader contract were consumed read-only from the candidate's
declared absolute paths.

## What passes

- The room is a credible, colourful NewsStand: Paige, a visible desk board,
  four large paper objects, a crate and optional radio make the environment the
  interface rather than a generic feed. At 1440, 390 and 320 the paper controls
  are visible and no horizontal overflow occurred (`body` widths 1424/374/304
  at viewports 1440/390/320).
- The exact four live mastheads are present: The Breaking, The Daily, The
  Weekly and The Tribune. Candidate UI contains no legacy `TODAY` or
  `WEDNESDAY` masthead claim. Functional publication text, dates, states,
  reader body and archive results are DOM text, not painted into the Paige/rack
  image.
- Baseline correctly exposes quiet Breaking/Daily, held Weekly and one current
  Tribune story. Paper-opening, in-place reader, keyboard activation and
  put-back return work: activation moves focus to `#reader-title`; put-back
  returns it to the original Tribune paper.
- The archive returns one eligible `verification` match and gives an honest
  eligible-no-result message for `zzzzzz`. It suppresses held/stale/unavailable
  and retracted bodies in the tested fixture paths.
- Quiet, stale and malformed fixtures suppress all story bodies. Retracted
  direct-hash access suppresses the body and shows the withdrawal reason.
- Radio changes its explicit `aria-pressed` state from false to true after a
  successful local play invocation. Reduced-motion media query was active and
  produced `0s` transition duration plus `scroll-behavior: auto`.
- Existing maker test reran: `NEWSSTAND WAVE 2 CANDIDATE PASS checks=15`.

## Hold findings

### P1 — desk-wide failure contradicts the visible per-paper state

`?fixture=hold` correctly blocks every paper body and the board says
“Editorial hold.” But the four visible paper labels still read
`quiet / quiet / hold / current`; in particular Tribune visibly claims
`current`. `?fixture=malformed` has the same defect: the board says the record
failed and every paper fails closed if activated, while its visible rack labels
still report the prior quiet/hold/current state. A visitor can therefore see a
current paper precisely when the reader says nothing is available.

**Required repair:** derive displayed paper state from the desk/dataset gate
before rendering each paper label, so a global hold/load-failure causes all
four controls to show the same truthful global state or a clear unavailable
marker. Re-run the hold and malformed browser paths; test both visible label
and reader result together.

### P1 — direct retracted hash does not receive required focus

For the retracted direct hash, the page shows `Retracted.` and the fixture
withdrawal notice, but leaves `document.activeElement` on the document body.
The experience brief requires direct/hash failure focus. The normal paper-open
path correctly focuses `#reader-title`; `showStory` does not do so in its
missing/retracted/ineligible returns.

**Required repair:** focus the reader title (or an equivalent labelled notice)
after every direct hash success and every direct hash failure, without changing
editorial data. Re-run direct retracted, malformed and unknown hash tests.

### P2 — Paige/rack broken-image state is silent and not a usable room fallback

When the exact Paige/rack image request was forced to return HTTP 404, the
candidate retained its title and desk board but the primary room became a dark
empty image region. The image has alt text, but no visible recovery state,
fallback composition or error handling. Exact-use of this candidate art also
remains unadmitted by Brand, as the maker record correctly states.

**Required repair:** add a candidate-local, visibly usable room fallback for
failed Paige/rack art (while retaining live four-paper controls and desk state)
and test the forced-404 result at desktop and mobile. Brand must separately
rule on exact use of the source image; this judge does not grant that use.

### P2 — no-JS exposes four apparently active dead paper buttons

At 320px with JavaScript disabled, the no-JS boundary text is honest and the
layout has no horizontal overflow. However, all four `<button>` elements remain
enabled with `Checking…` labels and have no action. This is a misleading
keyboard/control state rather than an explicit progressive-enhancement
boundary.

**Required repair:** either render the objects as non-actionable with an
unambiguous no-JS boundary, or provide a meaningful no-JS destination. Re-run
keyboard navigation at 320px with JavaScript disabled.

## Scope limits and unproved gates

This review does not accept the Paige/rack asset, four-paper final artwork,
editorial publication freshness, canonical writer/correction lifecycle,
account/history, shared rewards, native assistive technology, release or public
origin. The fixture's dated values prove the candidate's deterministic behavior
only; they do not make a publication current today.

## Exact next action

NewsStand maker repairs only the four candidate-local findings above, reseals
the exact candidate inputs and returns the new tuple for fresh independent
review. No production or shared reader/data change is authorized by this HOLD.
