# Cycle 8I — Town Entry independent full-page verdict

**Verdict:** HOLD — full-page visual evidence is invalid; do not admit, present, integrate, deploy or propagate this tuple.

**Evidence time:** 2026-07-27T16:12:09-07:00 (America/Vancouver)  
**Judge scope:** Frozen Cycle 8I tuple only. No candidate, render, manifest or receipt byte was changed by this review.

## Bound object

- Successor manifest: `SUCCESSOR-MANIFEST.json`  
  SHA-256 `52c41416d138d8344f7b0e28f11c84030335b991d2b10e27b5799dd7570632de`
- Local pre-judge receipt: `LOCAL-PREJUDGE-RECEIPT.md`  
  SHA-256 `a2bcc3f427d8c1a564a1dc53c11ec70814c555f5e4f0a622bdabaddfb5cf149b`
- Diagnostics: `evidence/DIAGNOSTICS.json`  
  SHA-256 `47632a2af556eb3bd03e9320fe4cc97ee32a0402b5115efe7352617de22c790d`

## Reproduced source and diagnostic checks

- Baseline source matches the released binding: `ed8ae2b0390ac734c03f6960438ee76af6580f537c746e9c8668184a56d4b1f5`.
- Candidate markup is byte-identical to frozen Cycle 8H candidate; baseline markup is byte-identical to frozen Cycle 8H baseline.
- CSS diff from Cycle 8H is limited to appended colour-token/foreground/background rules. It does not alter markup, IDs, hrefs, controls, runtime, hero selector, or image source.
- The supplied diagnostic reports text/ID/href/control/runtime parity, source-and-geometry hero equality, 18/18 candidate governed images complete, zero hidden/broken, and `scrollWidth === clientWidth` at both requested widths.
- Render bytes reproduce the manifest:

  | Evidence | SHA-256 | Native size |
  | --- | --- | --- |
  | Desktop incumbent | `507eaf3a5cd66fed01d7fbc5677be6a5280cf655dd84d0f4862b92e0e28e3545` | 1440×11941 |
  | Desktop successor | `95ec1546e70fdae4a9098d7e871c67fe420818e10312f273c53bc89d99b18c97` | 1440×13946 |
  | Mobile incumbent | `9516888b35a92ef833d67f23ba89c33d7bcd46929f701ab4880a42cb7b9939e0` | 390×18950 |
  | Mobile successor | `88ecde20ee2d99d2b1a1e6f5e646666cc1c5bd3c4d0507d8381111fd38459b44` | 390×18582 |

## Blocking visual finding

Direct full-resolution inspection of all four supplied “full-page” PNGs shows a repeated first viewport/masthead separated by large blank white bands. Neither the incumbent nor successor render visibly carries through the required downstream sections (explainer, weekly content, town, Closet, footer). The desktop comparison repeats the same invalid capture pattern.

This is not a minor crop discrepancy: it prevents independent confirmation of the required full-page geometry, visible image jobs, absence of clipping, and mobile product boundary. Diagnostic counters cannot substitute for missing visual proof, especially because the evidence required by the brief is fresh full-page incumbent/successor capture at 1440×900 and 390×844.

The existing hero evidence is also qualified by the manifest as a predecessor pixel PASS plus static scope argument rather than a fresh, symmetric pixel comparison. That caveat is not independently fatal on its own, but cannot remedy the invalid full-page screenshots.

## Required next action

Close this frozen tuple as HOLD. Do not repair the frozen source in place. A separately authorized successor may use a capture method that produces one continuous, inspectable full-page page at each viewport, then reseal diagnostics and send a fresh independent review. No Ali decision, public/live/shared/production mutation, deployment or publication is authorized by this verdict.
