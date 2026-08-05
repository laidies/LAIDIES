# NewsStand v22 frontend maker receipt

Date: 2026-08-05 America/Vancouver  
Role: frontend maker / whole-town integrator  
Status: BUILT LOCALLY — INDEPENDENT ADMISSION REQUIRED

## Exact candidate

- `newsstand.html` — `f1f6ae95eae82d81b847f3e3f474a834b379010cac87ced60f70697b90449967`
- `content/newsstand.css` — `422531dda4fa6c1435d4b293b575a9f1c39336d0039cd95601d28d70642ad3b2`
- `content/site/newsstand-catchup-v1.js` — `f2193796a6e09383bf6130a80307b74619b9623a1e17a984bf9294c9a63397d6`
- `scripts/test-newsstand-reader-contract.mjs` — `06b2a48d0819a175316014062a53725acfce2632ae985aa3511752b1d0efc3ae`
- `scripts/test-newsstand-reader-browser.mjs` — `aa88c8c02d2aa8e6359ae55687cecbb6f8c5584b7013e66a2d38842338f9f028`

## V21 containment repair

The compact mobile date is now `Mon D ’YY`; the 10px status chip may wrap onto two deliberate lines within the paper face. Status/action no longer rely on 8px/9px text or a forced one-line string. The 320px Daily and Tribune chips keep the complete state and date inside their mint fields.

The geometry guard now checks `scrollWidth <= clientWidth` for every visible masthead, job, status and action. Readability assertions target `.ns-paper-index`, the actual mobile control, and require a 10px floor. The old hidden-desktop proxy is no longer treated as mobile evidence.

## Evidence and checks

- Captures: `operations/product-stewards/newsstand/evidence-newsstand-rack-successor-v22-2026-08-05/`
- Contract suite: PASS, 10 state fixtures.
- Browser suite: PASS, 210 rendered checks.
- `NEWSSTAND_LAYOUT_CALIBRATION=overlap-mobile-paper-labels ...` — expected FAIL at the sibling-overlap guard, exit 1.
- `NEWSSTAND_LAYOUT_CALIBRATION=overflow-mobile-paper-status ...` — expected FAIL at the visible-label containment guard, exit 1.

## Scope limit

Local visual/frontend candidate only. Exact V22 asset-scope renewal, final visual admission, deployment, publication, public verification, native assistive technology and the paused dispatcher remain separate.
