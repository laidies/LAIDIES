# Design QA — first-visit introduction v1

**Status:** MAKER PASS — INDEPENDENT PRODUCT ACCEPTANCE REQUIRED  
**Evidence time:** 2026-07-26T13:25:09-07:00  
**Scope:** isolated local prototype only; no live route, shared token, deploy or
public mutation.

## Comparison

| View | Reference | Implementation | Result |
|---|---|---|---|
| Desktop 1440×900 | `evidence/source-live-baseline-desktop-1440x900.png` | `evidence/prototype-first-desktop-1440x900.png` | PASS — exact luminous-dusk masthead asset and full-bleed composition retained; hierarchy/copy only |
| Mobile 390×844 | Current masthead asset/composition invariant | `evidence/prototype-first-mobile-390x844.png` | PASS — one primary start is visible in the first viewport; no horizontal overflow |
| Mobile 320×800 | Current masthead asset/composition invariant | `evidence/prototype-first-mobile-320x800.png` | PASS — raw containment, complete CTA and readable answer grid |
| Resident desktop 1440×900 | State contract | `evidence/prototype-resident-desktop-1440x900.png` | PASS — distinct truthful Card hierarchy; public routes remain available |

Reference image SHA-256:
`ae8b3d3cbfc5ac150cee40bffd6531a9961ec524837cbc622c99ec82f37870f6`.
Desktop implementation SHA-256:
`8bb97d70fb5fbf4f3386925bec0a530d03b214684ff699cf4e5fbe9ebbdf3ee2`.

## QA history

1. `P1 FIXED` — the 390px hero initially pushed the primary CTA below the
   first viewport. Compact spacing/type was reduced without changing the
   masthead asset or introducing a new visual system.
2. `P1 FIXED` — mobile Menu gained Escape close and initiating-button focus
   return; selecting a navigation item also closes the menu.
3. `P2 FIXED` — removed the Google Fonts network import so explanatory content
   and the primary action do not wait on a third-party font.
4. Final maker inspection: no P0/P1/P2 visual or interaction defect observed
   at 1440, 720 layout proxy, 390 or 320. Native Safari, VoiceOver and actual
   browser 200% zoom remain independent admission limits.

