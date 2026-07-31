# Homepage route-level Platform projection v1 integration evidence

**Evidence time:** 2026-07-26 11:37:06 PDT (America/Vancouver)  
**Owner task:** `019f9f7f-9cd2-7e33-a1a3-f61b0b9c9ca1`  
**Status:** VERIFIED LOCALLY — INDEPENDENT ACCEPT 18/20 PRODUCT, 19/20 TRUST, 18/20 BRAND  
**Lock:** Control Room bounded isolated Homepage/Start Here candidate integration  
**Public/deploy status:** not deployed, not public, no release authority used

## Literal output

The accepted isolated Homepage/Start Here candidate now consumes Platform
readiness projection v1 instead of its two hand-written content/readiness JSON
snapshots.

The build-time bridge imports Platform’s exact sealer, receiver and synthetic
fixtures. It emits one immutable envelope plus the semantic result produced by
`entryCurrentContentReceiver()`, and compiles the exact expected projection
ID, sequence, payload SHA-256 and 17-destination crosswalk into the client
binding.

At the route, the client:

- verifies the bound envelope type/version, projection ID, sequence and
  canonical payload SHA-256;
- verifies all 17 destination identities across public and registry ID
  namespaces and all three current-content slots;
- rejects expired envelope or per-item freshness;
- promotes only Platform receiver items marked `available`;
- draws destination label, summary and limitation from Platform records;
- keeps the accepted first/returning/no-Card/local-Card/verified-held hierarchy;
- fails closed on missing, stale, same-ID conflict and payload tamper; and
- keeps named routes for status checking while making zero current promotion
  or downstream-completion claim.

The six-card readiness selection now uses projection IDs only. The former
duplicate Episode readiness card is removed because Episode is a
current-content slot, and the projection-backed Chick Flicks route takes that
discovery position.

## Exact candidate paths

| State | Route |
|---|---|
| Fresh Platform fixture | `/` |
| Returning without Card | `/?visitor=returning` |
| Device-local Card | `/?visitor=local-card` |
| Verified account held | `/?visitor=verified-held` |
| Missing receipt | `/?projection=missing` |
| Stale receipt | `/?projection=stale` |
| Same-ID conflict | `/?projection=conflict` |
| Payload tamper | `/?projection=tampered` |
| Start Here fresh | `/start-here.html` |
| Start Here missing receipt | `/start-here.html?projection=missing` |

## Exact file identity

| File | SHA-256 |
|---|---|
| `package.json` | `601b202588bb0fd73a90d0187c5ab7aeb9ad324dd12a37e9abca8a29d2967372` |
| `scripts/prepare-platform-projection.mjs` | `a9604947f7e43d45950a9680204c64b5efa8b58bbb795cd8e3fbf56087ef4da7` |
| `src/App.jsx` | `8204cfa77d0de0483436a64b64e7e15069a66bcbd30bc8181c901fb72a3cbf50` |
| `src/styles.css` | `d45b91b227f6dfec5f0a6378b6847d60068544d45dabc688d6f70f4ba3ad77b2` |
| `src/generated/platform-projection-binding-v1.js` | `1b3506b574622d8a35a94cf7f1c5f0c5b798dd81e0c32a14ae8b5a765f1d819f` |
| `public/data/readiness-current-projection-v1.json` | `abeeac339e8dbf305a1a73f7d253ccaf1ce7ac7fa31893f62a3ff0abf901c55c` |
| `tests/candidate-browser.cjs` | `63ed5b09458aa8128f038d47353ff39ce6cf689a7e353aca4ad3d804db099c78` |
| `tests/render-candidate.cjs` | `1eddceb1402524dc4aa1f6b170847b9fe037375230ae221ab4df2578ed8aaab6` |
| `dist/client/index.html` | `47f532ec474ca934195fa935ae8814f1f90ce12c6245fcf539ee7d79305f6a31` |
| built CSS | `8016bd0c3bc97260633de01ef6065fe733fa600231a5b4bfc2f41a9d20ba3b96` |
| built JS | `c0303130f8fd851a65b334959ed02527b16bb7e64aac0f333a784492aff46006` |

Bound Platform payload SHA-256:
`ff422f00ae68cc7b01fadaa1438771742416d14207bbf2394a5eae808734b9ec`.

## Tests and renders

| Test | Result |
|---|---|
| Platform v1 source suite | PASS — destinations=17, current=3, fail_closed=12, idempotency=3, schema=draft2020 |
| `npm run build` | PASS — projection preparation, Vite build and Sites artifact |
| `npm run test:sites` | PASS — 4/4 |
| bundled-runtime `npm run test:candidate` | PASS — 11/11 |
| bundled-runtime `npm run render:candidate` | PASS — 6 scenes |

The browser suite covers 1440, 390 and 320 pixel widths, all four visitor
presentations, Start Here, missing/stale/conflict/tamper projection states,
menu/Escape, zero console/page errors and zero horizontal overflow.

Six full-page PNGs and `render-matrix.json` are beside this record.

## Evidence ceiling and remaining proof

Observed: exact local source/output, Platform receiver consumption, bound
projection identity, failure contraction, projection-backed wording and named
browser/render states.

Not proved: any real destination/content owner receipt; production projection
generation; cache/correction propagation; live identity/provider/receiver
outcomes; human comprehension; Safari/VoiceOver; real 200% zoom; performance;
exact-use global visual admission; clean release artifact; deployment,
rollback or public origin.

The candidate visibly labels its data as a synthetic Platform contract fixture.
It does not upgrade any destination’s status.

## Independent acceptance trigger

An independent Town Entry product/trust judge must reproduce the 11-scene
suite and inspect the exact rendered failure states. Acceptance must confirm
that Platform is the only source of destination/current prose, only fresh
`available` current items are promoted, every named failure contracts without
an unbound current/readiness claim, and the accepted entry hierarchy remains
comprehensible. Runtime/accessibility and receiver-owner gates remain separate.

**Result:** PASS. The independent judge reproduced the file identities,
Platform suite and 11-scene browser matrix and accepted the bounded isolated
consumer. See `independent-verdict.md`.

## Evidence-backed improvement opportunity

**Opportunity:** keep Episode exclusively in the current-content area and use
the recovered readiness slot for a distinct receiving route.

**Evidence:** the v1 contract models Episode as `latest-episode`, separate from
the canonical 17 destinations. The earlier candidate repeated Episode in both
the hero/current area and the readiness grid. The integrated candidate removes
that duplicate and uses projection-backed Chick Flicks instead.

**Expected benefit:** clearer action hierarchy and broader cross-building
discovery without adding another CTA or inventing destination copy.

**Measurement after approved instrumentation:** clean-user route-purpose
comprehension and correct destination choice, not click-through alone.

## Learning scan

This integration reused BTB-142’s explicit cross-namespace identity rule for
`ksvl-radio → ksvl` and `sanctuary → luminairy`. No new qualifying canonical
learning was created.
