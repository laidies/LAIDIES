# NewsStand V22 red-team receipt — 2026-08-05

## Verdict: UNSHAKEN

**Exact candidate identity — matched before and after review**

| File | Required and observed SHA-256 |
| --- | --- |
| `newsstand.html` | `f1f6ae95eae82d81b847f3e3f474a834b379010cac87ced60f70697b90449967` |
| `content/newsstand.css` | `422531dda4fa6c1435d4b293b575a9f1c39336d0039cd95601d28d70642ad3b2` |
| `content/site/newsstand-catchup-v1.js` | `f2193796a6e09383bf6130a80307b74619b9623a1e17a984bf9294c9a63397d6` |
| `scripts/test-newsstand-reader-contract.mjs` | `06b2a48d0819a175316014062a53725acfce2632ae985aa3511752b1d0efc3ae` |
| `scripts/test-newsstand-reader-browser.mjs` | `aa88c8c02d2aa8e6359ae55687cecbb6f8c5584b7013e66a2d38842338f9f028` |

## Attacks and results

| Attack | Result |
| --- | --- |
| 320/390 worst-case compact dates could wrap, clip, overflow the slot, or fall below readable text size | Did not reproduce. The supplied current-date rack keeps shortened truth labels such as `LATEST · AUG 4 ’26` inside their respective papers. Browser checks enforce that job/status/action text is at least 10px at both widths and that every live label remains within its exact 420:625 paper slot. |
| Sibling labels could overlap or an action line could strike through another live field | Did not reproduce. Required overlap calibration deliberately forced Daily status into the job field and failed at `390 paper labels never overlap or strike through the next live field` (exit 1). |
| An overlong status could leak beyond the painted paper or silently overflow | Did not reproduce. Required overflow calibration injected `CURRENT · SEPTEMBER 25, 2026 — UNCHECKED OVERFLOW` and failed at `390 preserves each painted slot ratio and contains every live paper label` (exit 1). |
| Current/latest date state could become misleading at rollover | Did not reproduce. Inspected next-day rack says `LATEST · AUG 4 ’26` for Daily while Tribune says `CURRENT · JUL 25 ’26`; the normal suite verifies the detailed and compact dates agree. |
| Prior interaction/failure risks — choose CTA, direct hash/return, focus/history, quiet Daily, stale/hold/unavailable, correction/retraction, and growth | Did not reproduce. The V22 normal suites passed 10 state fixtures and 210 rendered browser checks covering those paths. |
| Asset/wordmark identity could regress | Did not reproduce. Mobile paper assets remain edition-bound, the continuous desktop rack and Paige references remain present, and the `SUNNYVAiLE` lowercase `i` remains protected in primary and generated headings. |

## Evidence inspected

All supplied V22 captures under `operations/product-stewards/newsstand/evidence-newsstand-rack-successor-v22-2026-08-05/`, including 320/390 chooser and current-date rack, desktop 1440/counter/archive/Catch Me Up/Daily, and mobile Daily.

## Scope and limits

This is local/headless candidate evidence. The 10px value is a constrained visual floor, not native assistive-technology proof. No deployment, public-origin verification, forced asset-network outage, or native assistive-technology test occurred. No candidate source, asset, manifest, registry, or shared operations record was changed; this receipt is the sole red-team write.

Reviewed by: `/root/newsstand_red_team` with read-only state/failure lane `/root/newsstand_red_team/v17_state_assets`.
