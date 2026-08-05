# NewsStand rack successor V22 — product UX admission

**Verdict: ACCEPT — local candidate only.** This is a V22 product-UX admission, not deployment, public-origin verification, publication, or release approval.

## Exact candidate judged

| Dependency | SHA-256 |
| --- | --- |
| `newsstand.html` | `f1f6ae95eae82d81b847f3e3f474a834b379010cac87ced60f70697b90449967` |
| `content/newsstand.css` | `422531dda4fa6c1435d4b293b575a9f1c39336d0039cd95601d28d70642ad3b2` |
| `content/site/newsstand-catchup-v1.js` | `f2193796a6e09383bf6130a80307b74619b9623a1e17a984bf9294c9a63397d6` |

## Judgment

- **Visible mobile labels: pass.** The inspected 320px and 390px two-by-two chooser has all four live title/job/status/action fields inside their paper slots. Compact dated labels are readable, not struck through or overlapped, and each visible job, status, and action meets the 10px floor.
- **Date and action truth: pass.** The current rack says Daily is current; the rollover rack switches Daily to `LATEST · AUG 4 ’26` / `OPEN LATEST` while Tribune remains current. Quiet papers say `NO ISSUE TODAY`. These claims agree with the desktop counter.
- **Desktop and breakpoint integrity: pass.** The 1440px rack is legible and contained. The live browser suite covers the mobile 620px side of the 720px breakpoint and the desktop 900px side; V22’s exact 720px breakpoint is the two-column mobile chooser rule.
- **Quiet, Catch Up, and return paths: pass.** Quiet Daily remains an honest collapsed nine-desk record. Catch Up remains contained and date-led. Mobile Choose focuses a visible paper; direct-hash Return focuses the matching visible paper; story Back restores its headline and subsequent Return restores that visible paper.
- **Failure states: pass.** Held, stale, no-data, and load-failure cases remain non-exposing and do not call a paper current.

## Verification

```text
node scripts/test-newsstand-reader-contract.mjs
✓ NEWSSTAND READER: 10 state fixtures · canonical editions · focus/ARIA/failure-state contracts

node scripts/test-newsstand-reader-browser.mjs
✓ NEWSSTAND BROWSER: 210 rendered checks · three repeated paper/search history cycles at 620/900px · hold/stale/correction/retraction/focus/mobile/motion/zoom
```

The V22 guard checks each visible label node for `scrollWidth <= clientWidth` and containment. Its deliberate bad inputs rejected correctly:

- overlap mutation: `390 paper labels never overlap or strike through the next live field` (exit 1);
- overflow mutation: `390 preserves each painted slot ratio and contains every live paper label` (exit 1).

## Scope limits

Reviewed the V22 local evidence and exact tuple. I did not deploy, publish, alter product sources/data, or verify a public URL.
