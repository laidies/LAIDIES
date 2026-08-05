# NewsStand V22 information-architecture admission — independent judge

Date: 2026-08-05  
Verdict: **ACCEPT**

## Exact candidate verified

| File | SHA-256 |
| --- | --- |
| `newsstand.html` | `f1f6ae95eae82d81b847f3e3f474a834b379010cac87ced60f70697b90449967` |
| `content/newsstand.css` | `422531dda4fa6c1435d4b293b575a9f1c39336d0039cd95601d28d70642ad3b2` |
| `content/site/newsstand-catchup-v1.js` | `f2193796a6e09383bf6130a80307b74619b9623a1e17a984bf9294c9a63397d6` |
| `scripts/test-newsstand-reader-contract.mjs` | `06b2a48d0819a175316014062a53725acfce2632ae985aa3511752b1d0efc3ae` |
| `scripts/test-newsstand-reader-browser.mjs` | `aa88c8c02d2aa8e6359ae55687cecbb6f8c5584b7013e66a2d38842338f9f028` |

All five hashes match the supplied V22 candidate.

## Judgment

V22 clears information-architecture admission.

- At 320px and 390px, compact paper states use a scannable state-plus-date grammar: **Quiet · Aug 3 ’26**, **Current · Aug 4 ’26**, and **Current · Jul 25 ’26**. The narrow 320px state strips wrap the date only within their own field; no state, job, or action fields overlap.
- At the current-date capture, Daily changes truthfully to **Latest · Aug 4 ’26** with **Open latest**. Quiet papers retain **No issue today** and the still-current Tribune retains **Open issue**. The short labels describe availability rather than falsely claiming currency.
- The 2 × 2 chooser still exposes four simultaneous paper controls at both mobile widths. Each remains a distinct physical paper object with a visible job, state, and action.
- The visible-control resolver continues to choose the rendered paper-index control rather than a hidden desktop counterpart. The arrival CTA and return/history paths therefore preserve visible, usable focus on mobile.
- The arrival composition remains contained at 320px and 390px; its primary action, Catch Me Up, and radio controls stay legible and in the viewport.

## Evidence inspected

- `mobile-chooser-320.png` and `mobile-chooser-390.png` for state wrapping, field separation, and the four-paper comparison.
- `current-date-rack-390.png` and `current-date-state-390.png` for rollover grammar and action truthfulness.
- `mobile-arrival-320.png` and `mobile-arrival-390.png` for the visible arrival controls.
- Exact V22 source and browser exercises for the visible-control, direct-hash return, and story Back-then-return routes.

Mechanical supporting checks passed locally: 10 reader-state fixtures and 210 browser-rendered checks. They support the implementation; this admission is based on direct inspection of the named V22 pixels and controls.

## Scope boundary

This is a local, hash-bound visual/IA admission only. It does not claim deployment, public verification, publication, or release approval.
