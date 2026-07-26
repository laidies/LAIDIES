# Blend & Snap weekly-pack availability manifest — maker evidence

**Date:** 2026-07-25  
**Status:** BUILT LOCALLY — MAKER TESTS PASS; INDEPENDENT JUDGMENT REQUIRED  
**Trigger:** `WEEKLY_PACK_AVAILABILITY_MANIFEST_DECISION`  
**Boundary:** Blend & Snap source/data/tests/dossier and its owned Try-On
storage-failure truth only. No central queue, Git, deploy, publication,
external-service mutation, account/reward implementation or visual creation.

## Reconciled product contract

`OPERATING-SPEC.md` now distinguishes:

- the **Episode**, which explains;
- **Study Sheet**, compact review;
- **Try-On**, applied practice;
- **Cheat Sheet**, durable reference;
- **Trading Cards**, collection/memory reinforcement; and
- **Quiz**, assessment beside—not inside—the Study Pack.

The locked café verb remains **ORDER**. Ordering opens a menu/receipt; it is
not study, completion, reward or account history. The usual and opened-pack
marker are explicitly device-local and optional.

## Exact released inventory

| Episode | Episode | Study Sheet | Try-On | Cheat Sheet | Cards | Quiz |
|---|---|---|---|---|---|---|
| 01 | available | planned | available | available | held | available |
| 02 | available | planned | available | available | held | available |
| 03 | available | planned | available | available | held | available |
| 04 | available | planned | available | available | unavailable | available |

Evidence behind the non-ready states:

- no episode-specific Study Sheet route/product is built; the planning
  architecture explicitly prohibits placeholders;
- Episodes 1–3 have a client-side randomized card implementation, but the
  locked economy requires server-authoritative pack opening and its current
  trading/Closet claims lack authoritative proof, so it is held rather than
  offered as an admitted pack component;
- Episode 4 declares no card pack in the episode index and has no pack selector
  entry, so it is unavailable rather than “coming soon.”

## Canonical manifest

`content/blend-snap-weekly-packs.json` is schema `1.0.0` and records:

- exact published episode identity/route;
- all five component jobs;
- `available`, `held`, `planned` or `unavailable`;
- truthful status label;
- a route only for `available`;
- evidence owner, observed basis and verification date; and
- manifest owner, source index, update date and `freshThrough`.

The deterministic validator rejects:

- unsupported schema/status;
- invalid/reversed/stale dates;
- duplicate/missing published episodes or components;
- episode-index identity/route disagreement;
- unsafe or missing available routes;
- a route on any non-available component;
- missing evidence ownership/freshness;
- a fabricated Study Sheet; and
- card admission that disagrees with episode-index/economy truth.

## Café and Try-On repairs

`blend-snap.html` now:

- disables every ORDER control until index and manifest independently load,
  validate and agree;
- fails closed for load failure, stale manifest, missing component and index
  disagreement;
- shows the exact count of ready pack pieces and states that Quiz is adjacent;
- renders all component statuses, but creates links only for `available`;
- opens current or historical episode pack menus in the in-place receipt;
- moves focus into the receipt and restores it to the originating order/menu
  button on close;
- says a pack menu was opened on this device rather than “all caught up”;
- removes the future Closet/card-drop promise; and
- keeps browsing/order usable when localStorage is blocked while explaining
  that JoJo cannot remember.

`try-on.html` now treats `localStorage.setItem` as a fallible operation. A
blocked save no longer says “Saved”: the visitor is told the text remains on
the page and should be copied before leaving.

## Rendered coverage

`node scripts/test-blend-snap-browser.mjs` passes **49** headless Chrome checks:

- new visitor and exact current Episode 04 partial-pack inventory;
- status labels and route suppression;
- native keyboard activation, receipt focus and return focus;
- current opened marker and device-local usual;
- historical Episode 03 menu and held-card status;
- storage-blocked café/receipt/usual and Try-On save failure;
- manifest failure, index failure, stale manifest, missing component and index
  mismatch;
- 390px mobile layout/no overflow;
- desktop inventory; and
- reduced-motion recognition/focus.

## Full verification

| Check | Result |
|---|---|
| `node scripts/validate-blend-snap-packs.mjs --as-of=2026-07-25` | PASS — 4 menus; 12 available, 3 held, 4 planned, 1 unavailable |
| `node scripts/test-blend-snap-browser.mjs` | PASS — 49 rendered checks |
| `node scripts/check-inline-js.js` | PASS — 353 scripts across 132 live pages |
| `node scripts/check-local-links.js` | PASS — 1,940 local references across 110 pages |
| `node scripts/check-town.js` | PASS |
| `node scripts/check-product-stewards.mjs` | PASS — 65 products; 3/3 active |
| Manifest/state JSON and scoped `git diff --check` | PASS |

## Exact candidate hashes

| Artifact | SHA-256 |
|---|---|
| `blend-snap.html` | `382cd2f58095bf6dcbffa7bcb594de08dfff89b4eb6f7e3e67bbe06c74d20fe5` |
| `try-on.html` | `168eae8f0adb704abae51aa43f2282e4aa206585c7b7708d4a370797a18140a0` |
| `content/blend-snap-weekly-packs.json` | `1f5be9d9d4a80c8baff1cb098179859b2294ed6ad1f298bfef3d58ea12277f75` |
| `scripts/validate-blend-snap-packs.mjs` | `78316de61dc310441ee81b3af06e84ef1de95e8c684f45b60912775a6fa7b346` |
| `scripts/test-blend-snap-browser.mjs` | `fc123bf606502cf1e6e1d02e9711a44f55113a94ad370c46cda7bbe4f0a7215c` |

## Independent judge packet

The judge should inspect the exact hashes above and attempt:

1. manifest/index mismatch and same-count remapping;
2. malformed/stale dates and a missing/duplicate component;
3. non-available rows carrying a hidden route;
4. direct and keyboard current/past receipt journeys;
5. storage denial before and after a usual/order/Try-On save;
6. mobile 320/390, 200% zoom and native screen-reader announcement/focus;
7. whether a newcomer correctly distinguishes all six product jobs; and
8. whether ORDER/café hospitality still feels like Blend & Snap without
   implying a complete pack.

Required independent roles: product/learning, accuracy/trust and
identity/reward truth, LAiDIES brand, UX/accessibility, frontend/data, and
release candidate identity.

## Still open

- Independent judgment; Safari/VoiceOver/native zoom; exact release artifact,
  deployment and public-origin verification.
- First real Study Sheet content/route/visual requires owner/content approval.
- Trading Cards require their separate authority, economy, copy and rendered
  admission repair.
- Existing Episode-page generic `Study Pack · Try-On · Cheat Sheet · Cards`
  labels are an Episode Experience handoff; they were identified but not edited
  outside this building-owned lane.
- No product analytics baseline or customer-comprehension evidence exists.
- Current café visuals remain candidates; this packet grants no visual
  approval.

## Learning scan

**BTB-053 extension recorded.** A published parent is not evidence that every
child in a composite product is ready. The prevention control is an explicit
component manifest with separate admission states, evidence owner, freshness
and missing/stale rendered tests.
