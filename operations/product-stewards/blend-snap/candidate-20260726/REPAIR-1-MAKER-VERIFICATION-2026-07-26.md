# Blend & Snap candidate repair 1 maker verification

**Status:** VERIFIED LOCALLY — BOUNDED REPAIR; INDEPENDENT REJUDGE REQUIRED  
**Evidence time:** 2026-07-26 11:22:53 PDT  
**Trigger:** `INDEPENDENT-HOLD-1-2026-07-26.md`  
**Scope lock:** `operations/product-stewards/blend-snap/candidate-20260726/**`

## Exact repair

No product direction, learning content, style or shared dependency changed.
The repair only changed failure-state admission:

- failed loading/offline/stale/disagreement replaces the current menu list
  with “withheld until validation passes”;
- the current ticket rail is replaced by a non-interactive failure notice;
- the receipt archive is replaced by a non-interactive closed notice;
- exact Try-On/reference/Quiz handoff board is hidden during failure;
- only the released-Episodes fallback and Retry remain operable;
- successful Retry re-renders the healthy inventory, archive and handoffs.

## Test expansion and result

The candidate suite increased from 69 to **92 checks**. New assertions prove:

- zero current ticket-rail links in offline, stale, disagreement and loading;
- zero current ticket-rail keyboard targets;
- zero “Available” or “ready next door” claims in the failed rail/menu;
- exact component handoff board hidden during failure;
- successful Retry restores healthy inventory and useful focus;
- desktop, 390px and 320px failure layouts have no horizontal overflow and no
  current-pack links or keyboard targets.

Result:

```text
✓ BLEND & SNAP ISOLATED CANDIDATE: 92 checks · desktop/mobile/four visitor states/inventory/study/cards/failures/focus/storage/handoffs
✓ BLEND & SNAP PACKS: schema 1.0.0 · 4 published episode menus · 12 available · 3 held · 4 planned · 1 unavailable · fresh through 2026-08-01
✓ BLEND & SNAP CROSS-ENTRY: 54 deterministic checks · café/welcome/directory/episodes/manifest
✓ BLEND & SNAP BROWSER: 90 rendered checks · new/return/storage/index/stale/missing/mobile/keyboard/focus/motion/cross-entry
```

## Repaired visible evidence

- `evidence/desktop-1440-offline.png`
- `evidence/mobile-390-offline-full.png`
- `evidence/mobile-320-offline-full.png`

Maker inspection confirms the current pack rail and archive are replaced by
explicit non-interactive failure notices and the exact handoff board is absent.
This remains maker evidence.

## Exact repaired candidate identity

```text
13e233be52b325fa4604c573cb93c8445aff2be4610f1df330f69208f0b94c3f  index.html
8eff5fe5922f6f1869aa60d86c1e2cad87a859e7b0d032a06a9d5c0971b93cb7  candidate.css
dbe54cf38a6ce4da4692779900dba723af7dd0a2e594fbd44c498b3b51354826  candidate.js
f13ca9c07f1d0075b2f2bae1bffa801c7d8297c3c9637e60d0869f25bd223916  test-candidate.mjs
9a88cf963cc05bd143a40e0c181faa55ab9f6326c1db8c77ed630bb6ff748613  evidence/desktop-1440-full.png
9fe5af258bfe98e63b24bb80fe920bb53c7b7197f2465f0e0a42834bf7725ef2  evidence/desktop-1440-offline.png
74242caacaa01ef62dddf55012a9440e1eec14d8216396121364c071b5d7ef64  evidence/desktop-1440-receipt.png
6862048787dbe2e98aaf8468de02c2959e68692f561d867c428581d395184725  evidence/mobile-320-offline-full.png
2d85093c6c5d0cf146191aa00eec24514c9e41e9783460222f8d766a729acc20  evidence/mobile-390-full.png
b445bca2db204fe89f05d5c3328cbed4a91e53eed15f3dbdafa5bfae5b8ad27b  evidence/mobile-390-offline-full.png
```

