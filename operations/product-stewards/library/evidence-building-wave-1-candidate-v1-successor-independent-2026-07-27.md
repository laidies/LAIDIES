# Independent successor rejudge — LIBRAiRY building Wave 1 candidate v1

**Verdict:** `ACCEPT — LOCAL WAVE 1 CANDIDATE REVIEW CLEARED`  
**Review time:** 2026-07-27 America/Vancouver  
**Scope:** exact candidate-only successor. No maker, Library production route, shared Puffy/Closet authority, catalogue/admission, integration, deployment, or public file was changed.

## Bound inputs

| Input | SHA-256 |
|---|---|
| Maker handoff | `4a6a168f3d7059bd7785086b7d86e16abd06ce8cb0a7c368134801b67b200f96` |
| Successor manifest | `e00a2279c700dcd190d0e67cf76fd4e7fe54290456f9f3536ad56b2175326409` |
| `index.html` | `c9b8e44a58575ffb26032744feb079602a0b6d7c2f4bb44fa27964411ee6e566` |
| `library-candidate.css` | `b0e474c210bf902d890379810bdba25ad675e520d7f72674073190269f8e51be` |
| `library-candidate.js` | `bff1197f534366c0948e4295bffb23386552c15436659bb2a30446f65e967b4d` |

## Independent result

The sealed candidate was copied to an isolated temporary HTTP mirror. The source candidate and its maker evidence were left untouched.

- The candidate static gate passed.
- The successor browser suite passed at 1440 × 900, 390 × 844 and 320 × 800, with zero broken images.
- At 390px, `documentElement.scrollWidth = body.scrollWidth = 390`; at 320px, both values are `320`.
- `html` and `body` use visible horizontal overflow; no page-level overflow is hidden or clipped. The intentionally horizontal shelf rail remains `overflow-x: auto` and is genuinely scrollable (`379px` content in a `308px` 390-width rail; `379px` content in a `262px` 320-width rail). No oversized hidden-overflow element was found clipping mobile content.
- Roving tab semantics passed: ArrowRight moves Vocab → Concepts → Tools and wraps, ArrowLeft wraps Tools, and Home/End select and focus the first/last tab. Each step leaves exactly one selected tab and one `tabIndex=0` tab, and synchronizes `#shelf-panel[aria-labelledby]` with that active tab.
- The pre-existing required flows remain correct: held books do not open or expose Puffy saving; the available review fixture focuses Return to shelf; Puffy save → resume → remove is browser/device-local; storage denial truthfully reports no save; Miss Jeeves returns a bounded answer and an explicit unavailable state; and the 320px no-JS shelf remains truthful and contained.

## Acceptance boundary

This closes the prior responsive and tab-keyboard HOLDs and clears the bounded Library Wave 1 **local candidate review**. It does **not** approve production integration, an admitted production catalogue, account/sync behavior, shared Closet authority, editorial/currentness claims, native assistive-technology proof, deployment, or public release.

## Learning scan

The repaired successor demonstrates the reusable prevention rule: test horizontal page width separately from intentional internal rails, and test the full ARIA tab state transition—not merely visual tab clicks—at both 390px and 320px. No new material failure was found in this independent rejudge.
