# Verification — Matron Lumen LUMINAiRY plant-free successor v3

Status: APPROVED BY ALI AND WIRED LOCALLY — not pushed or deployed
Date: 2026-09-05

## Exact candidate

- `assets/building-interiors/delivery-20260905-luminairy-matron-lumen-plant-free-successor-v3/luminairy-nave-matron-lumen-site-palette-plant-free-v3.png`
- 1500 × 844 PNG
- SHA-256: `0d7cc3a48e0baeadc0e16269f64df59b8e92b596030b6b7814298de630420964`

## Maker pixel review

- All visible potted plants, leafy planters, hanging vines and physical flower arrangements have been removed.
- Removed areas continue as clean nave walls, arches, columns or reflective floor; no substitute décor was introduced.
- Architectural floral/star patterns in stained glass and the floor medallion remain intact.
- The v2 ink-navy, raspberry, violet, cyan and teal colour system remains dominant.
- Matron remains recognisable with her approved silver-streaked curls, raspberry glasses and blazer, peacock blouse, keys and practical candle-tending action.
- No added person, generated text, halo, clergy styling or magic is present. Hands, taper, candles and lantern remain physically coherent.

## Rendered page checks

- `page-v3-1440x1000.png`: uncluttered left copy field; title and pledge remain readable; Matron's face is unobstructed.
- `page-v3-390x844.png`: right-biased crop retains Matron's face and glasses; copy remains legible.
- `page-v3-320x760.png`: zero horizontal overflow; face and copy remain visible.

## Production method

Built-in image editing, `precise-object-edit`, using v2 as the exact edit target and the approved Matron identity as an immutable reference. The prompt removed physical plants only and explicitly preserved architectural glass patterns and every character/action invariant. Output resized from 1672 × 941 to 1500 × 844.

## Release boundary

The real page source was changed only transiently for screenshots and restored. Candidate is not wired, pushed or deployed. Ali approval remains required.

## Independent visual admission

Verdict: PASS

- All visible physical plants, vines, flowers, planters and hanging greenery from v2 are removed. Clean stone architecture and reflective floor continue behind them without replacement clutter.
- Stained-glass floral geometry remains intact.
- Matron's approved identity, wardrobe and practical action remain recognisable; no anatomy, physics, clergy, magic, text or additional-person defect was found.
- Desktop and phone copy remain legible with no overflow. The phone crops reduce visible working-prop detail but retain her face, glasses and wardrobe identity.
- The spare nave is intentional. Do not backfill it with decorative filler in later edits.

Admission recommendation: show this exact v3 to Ali for bounded LUMINAiRY hero approval only.

## Ali approval and local integration

Ali approved this exact v3 on 2026-09-05. `luminairy.html` now consumes the exact approved asset with deterministic HTML copy, and `content/luminairy-v2.css` uses `object-position: 92% center` at widths up to 760px. Public release remains separate and has not occurred.

## Final local browser verification

- 1440 × 1000: exact 1500 × 844 source loaded; title and supporting copy visible; computed crop `50% 50%`; horizontal overflow `0`.
- 390 × 844: Matron's face, hair and glasses remain recognizable above the title; computed crop `92% 50%`; horizontal overflow `0`.
- 320 × 760: the same identity remains recognizable; the complete title and supporting copy remain readable; computed crop `92% 50%`; horizontal overflow `0`.
- Browser console: no page errors. One expected localhost-only Plausible warning (`Ignoring Event: localhost`) does not affect the page.
- Targeted source check: the page references the exact approved v3 pathname and natural 1500 × 844 pixels. The existing untracked held-asset validator was not changed because it belongs to another unfinished lane and still encodes the predecessor held state.

Local integration verdict: PASS. This is not evidence of a push, deployment or public verification.

## Hero text-colour correction

Ali rejected the mixed in-word accent colours in SUNNYVAiLE and SAiNTS as distracting and found the inherited text accent off-brand. The scoped correction keeps canonical spelling but makes embedded `Ai` spans inherit the surrounding phrase colour. The full LUMINAiRY title remains the single raspberry display accent and now resolves to the current `--lum-pink` (`#f357a0`) instead of the older shared burgundy.

Browser verification at desktop, 390 × 844 and 320 × 760 confirmed the intended computed colours, complete title visibility, retained `92% 50%` phone crop and zero horizontal overflow. No page errors were recorded; only the expected localhost Plausible warning remained.
