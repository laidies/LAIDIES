# NewsStand Wave 2 candidate — maker evidence

**Status:** `BUILT LOCALLY — independent HOLD successor re-review required`

## Inputs

- `operations/product-stewards/newsstand/EXPERIENCE-BRIEF.md`
- `operations/product-stewards/newsstand/FUNCTIONALITY-MAP.md`
- `newsstand.html`, `content/newsstand.css`, `content/newsstand-stories.js`,
  `content/newsstand-reader-contract.js` (read-only)

## Candidate assertions

The test suite verifies a real four-paper interaction surface, each required
publication identity, in-place reader and focus return, explicit radio state,
archive search, 1440/390/320 containment, reduced-motion declaration, and
deterministic quiet/hold/stale/retracted/malformed/no-result suppression.

Chromium was also used to render the frozen `baseline` at 1440×900, `quiet` at
390×844, and `retracted` at 320×700. The resulting captures are in
`evidence/`; the mobile render initially exposed a cropped board heading, which
was corrected before the final captures. `evidence/test-result.json` records
the bounded assertions and limits.

## HOLD successor repair

The first independent review returned HOLD on four candidate-local issues.
This successor:

1. gives every rack label the desk-wide `desk hold`, `desk unavailable`, or
   `no approved data` state when the global dataset gate blocks access;
2. focuses `#reader-title` for missing, malformed/ineligible and retracted
   direct hashes;
3. exposes a visible room fallback if the Paige/rack request errors before or
   after the listener is attached; and
4. starts the paper, radio and search controls disabled so the no-JS boundary
   contains no enabled dead controls.

`test-browser-successor.mjs` uses real Chrome Tab/Space input and passed 34
checks across 1440/390/320, desk hold, malformed, retracted, missing hash,
forced image 404, JavaScript-disabled and reduced-motion states. The static
suite passed 20 checks.

## Remaining gates

1. Independent product, editorial/trust, Brand and accessibility review.
2. Exact-use decision for the existing Paige/rack candidate image.
3. Authoritative four-paper visual/asset admission; CSS objects are a candidate
   interface grammar, not final art.
4. Reader canonical-write, correction lifecycle, public-origin and actual
   assistive-technology proof remain separate product/platform obligations.
