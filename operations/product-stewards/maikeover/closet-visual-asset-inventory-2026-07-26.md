# Resident Card backgrounds and Closet visual asset inventory

**Product ID:** `maikeover`  
**Owner task:** `019f9f74-712b-7400-bc07-795faaf7a6de`  
**Evidence time:** 2026-07-26T12:58:12-0700 (America/Vancouver)  
**Lane:** `RESIDENT CARD BACKGROUNDS + CLOSET VISUAL SYSTEM`  
**Status:** `SPECIFIED — VISUAL PRODUCTION QUEUED / BLOCKED PENDING BRAND`  
**Sequence ruling:** no new visual generation, style selection, crop production
or page integration until the sitewide Brand direction is selected.

Every disposition below is provisional. `KEEP`, `ADAPT` and `REJECT` mean what
to do with the evidence after the Brand ruling; none means visual approval.

## Reconciliation: “Process closet room items batch”

The prior task `019f87f4-00cb-7241-9257-b5d66cbdf195` did not complete its
named batch.

| Intended output | Expected | Found | Truth |
|---|---:|---:|---|
| Empty Closet room stage | 1 | 1 | `assets/closet/closet-room-v3-stage.png` exists |
| Revised seven-zone room | follow-up replacement/composite | 1 | `assets/closet/closet-room-v5-walkin.png` exists |
| Twelve reusable objects, full state | 12 | 0 | no matching modular files |
| Twelve reusable objects, empty state | 12 | 0 | no matching modular files |
| Total reusable object sprites | 24 | 0 | prior final explicitly stopped before objects |

The v5 image embeds clothing, binder, sticker book, jar, bracelet, sash and
board in one flattened scene. It is composition evidence, not seven reusable
objects and not the promised 24-state batch.

## A. Card-background choices

Current semantic contract:
`classic`, `pinklilac`, `peach`, `mint`, `lavender`, `holo`.

| Candidate/count/path | Current usage | Gap | Disposition |
|---|---|---|---|
| 6 IDs in `content/site/resident-card-contract-v1.js` | accepted Resident Card values | no entitlement or availability model | **KEEP — PENDING BRAND** |
| 6 CSS gradients in `laidies-card.html` (`CARD_BG`) | selectable visual backgrounds | no raster/source asset, mobile treatment, contrast matrix, locked/owned/equipped distinction or reward provenance | **ADAPT — PENDING BRAND** |

The six IDs are stable semantics, not proof the current gradients are the
selected style. Background choice currently means preference only. It must not
be presented as an unlock until Platform supplies authoritative availability
and ownership.

## B. Rooms and backdrops

| Exact asset | Size | Current usage | Evidence assessment | Disposition |
|---|---:|---|---|---|
| `assets/closet/closet-interior-hero-pixel.png` | 1672×941 | none; explicitly superseded | dark pixel-art direction conflicts with later production direction | **REJECT — PENDING BRAND** |
| `assets/closet/closet-interior-hero-v2-90s-vibrant.png` | 1672×941 | live in `laidies-card.html`; center crop | current structural incumbent only; flattened full room | **KEEP — PENDING BRAND** |
| `assets/closet/closet-room-v3-stage.png` | 2560×1440 | not integrated | useful empty-stage/composition reference; not a style approval | **ADAPT — PENDING BRAND** |
| `assets/closet/closet-room-v5-walkin.png` | 2560×1440 | not integrated | seven-zone composition reference; embedded objects are not reusable | **ADAPT — PENDING BRAND** |

There are **4 room images, 1 live and 3 unused**. There are **0
mobile-specific room sources** and **0 alternate room/backdrop choices** with a
contracted ID, ownership rule or crop manifest.

## C. Clothing and accessories

| Candidate/count/path | Current usage | Gap | Disposition |
|---|---|---|---|
| 45 files in `assets/avatars/residence-card-stock/`: 24 stock portraits, 20 ornate drafts, 1 accessory card | flattened avatar choices/reference | not separable clothing or equipable layers; ornate drafts are not admitted production assets | **ADAPT — PENDING BRAND** |
| Clothing/handbags/shoes embedded in the 4 room images | scenic decoration | cannot be equipped, owned, hidden, cropped or independently described | **REJECT — PENDING BRAND** as reusable inventory |
| Outfit/accessory/backdrop text controls in `maikeover.html` | inputs to avatar creation | no canonical inventory IDs, thumbnails, layer order, fit rules or ownership | **KEEP — PENDING BRAND** as functional vocabulary only |

Exact modular/equipable production count: **0 clothing assets, 0 accessory
assets and 0 backdrop assets**.

## D. Furniture, vessels and room objects

| Candidate/count/path | Current usage | Gap | Disposition |
|---|---|---|---|
| Furniture embedded in v3/v5 and both hero images | flattened scene | no modular placement, empty/occupied pair or safe-zone coordinates | **ADAPT — PENDING BRAND** as composition evidence |
| 8 expected vessel icons under `assets/closet/vessels/` | `laidies-card.html` requests them, then removes broken images on error | directory absent; all 8 missing: puffy board, sticker book, merit sash, charm bracelet, butterfly clip, trading-card binder, detention slip, locked diary | **ADAPT — PENDING BRAND** specification; assets missing |
| 24 object sprites from `operations/codex-prompts/closet-room-and-items-batch.md` | intended reusable full/empty pairs | **0/24 exist** | **ADAPT — PENDING BRAND** specification; assets missing |

No flattened object may be cut out and called production-ready without a
Brand-approved asset method and visual QA.

## E. Earned episode, class, book and card rewards

These are visual candidates only. Source records remain authoritative; Closet
must consume them and may not convert “file exists” into “resident owns it.”

| Candidate/count/path | Producer/touchpoint | Current truth and gap | Disposition |
|---|---|---|---|
| 33 files in `assets/charms/`: 1 bracelet base, 28 week 1–4 PNG charms, 4 extra charm candidates | Episodes/town charm hunt → Closet bracelet | local collection renderer exists; released-week, correction and account ownership are not authoritative | **KEEP — PENDING BRAND** as candidate catalogue |
| 75 admitted Puffy sticker files named in `content/site/puffy-bookmarks.js`; 10 default pouch choices | Library/Handbook → Puffy Board | verified device-local retrieval shortcuts; explicitly not identity, ownership, reward or sync | **KEEP — PENDING BRAND** |
| 12 card images in `assets/cards/`: 8 concept cards and 4 Jojo front/back/foil candidates | Trading Cards/Blend & Snap → binder | files exist, but admitted pack/card registry, award/open/duplicate rules and ownership do not | **ADAPT — PENDING BRAND** |
| 22 files in `assets/stickers/` plus separate Girl Talk sticker sources | quizzes/Express/Girl Talk → Sticker Book | multiple catalogues; no single admission/ownership/correction contract | **ADAPT — PENDING BRAND** |
| Quiz/Express clip records rendered in `laidies-card.html` | High/Express → clip jar | balance is locally derived, not an authoritative grant/spend/refund ledger | **ADAPT — PENDING BRAND** |
| Merit badge, detention slip, diary, Book Fair delivery and BEST FRIENDS necklace candidates | Episodes/classes/games/Book Fair/Post Office | vessels or proposed records exist; exact admitted art and authoritative delivery/ownership are missing | **ADAPT — PENDING BRAND** |

## F. Required object states

| State | Current evidence | Missing production requirement |
|---|---|---|
| Empty | CSS placeholder slots and empty copy exist for several vessels; v3 is an empty room stage | per-object empty art/geometry, helpful empty copy and no false promise |
| Locked | diary/lock motifs exist in flattened art and CSS | shared availability reason, accessible label, action and entitlement truth |
| Owned | scattered local records and reward-event rendering | authoritative ownership/entitlement read model; provenance, correction and revoke |
| Equipped | selected Card background behaves like a preference | canonical equipped field per eligible category, exclusivity rules, rollback and sync |

Platform must provide the shared state vocabulary and source contract. The
visual system must render it; MAiKEOVER/Closet must not invent a second
ownership ledger.

## G. Mobile crops and responsive assets

All 4 room candidates are landscape. The live hero uses one desktop source
with `object-fit: cover`, `object-position: center 48%` and a clamped height.
There is no authored 390 px or 320 px crop, art-direction source, focal-point
manifest, or proof that all vessels remain discoverable.

Post-Brand required crop set for each admitted room/backdrop:

- desktop master at 2560×1440 or approved equivalent;
- tablet crop at 1440×1200;
- mobile portrait crop at 1080×1440;
- safe focal coordinates for 320, 390, 768 and 1440 CSS-pixel viewports;
- 200% and 400% zoom/reflow proof with no action or vessel hidden.

Until those files exist and pass, the exact count is **0 admitted mobile
crops**. All proposed crop outputs are **ADAPT — PENDING BRAND**.

## H. Alt text and non-visual equivalents

| Surface | Current truth | Required |
|---|---|---|
| Live Closet hero | one descriptive `alt` in `laidies-card.html` | rewrite only after Brand selects final content; mark decorative if it conveys no task information |
| Puffy items | names are available; board art receives labels | preserve exact catalogue labels and purpose fields |
| Charms | asset-derived names exist | admitted human names plus earned-source/state text |
| Missing vessel icons | intended decorative `alt=""` and `aria-hidden="true"` | keep decorative; vessel control itself needs an accessible name/state |
| Cards/rewards | CSS initials/titles often stand in for actual art | card title, category, state, producer and unavailable reason; never encode ownership by color alone |
| v3/v5/unwired candidates | no companion alt manifest | one asset manifest row per admitted output |

Exact companion alt-manifest count today: **0**. The live hero’s one string is
implementation copy, not a production asset manifest.

## I. Cross-surface touchpoints and ownership boundaries

| Touchpoint | What this lane consumes | Dependency owner |
|---|---|---|
| `/maikeover.html` | Card background choice and avatar vocabulary | MAiKEOVER + Brand |
| `/resident-card.html` | exact Resident Card projection/contract | Resident Card + Identity |
| `/laidies-card.html` own/private/public modes | Closet room, vessels, collections and safe public projection | MAiKEOVER/Closet + Platform/Privacy |
| Library/Handbook | exact Puffy retrieval record and current publication check | Library |
| Episodes/High/Express | admitted completion and reward source event | Episodes + High/Express |
| Blend & Snap/Study Packs | admitted card/pack catalogue and award/open result | Trading Cards |
| Book Fair | exact entitlement delivery or refund | Book Fair + Rewards + Platform |
| Post Office and FAiRY | necklace and Plays ledger results | respective product owner + Rewards/Platform |

## Source evidence

- `operations/codex-prompts/closet-room-and-items-batch.md`
- `operations/codex-prompts/closet-room-v5.md`
- prior task `019f87f4-00cb-7241-9257-b5d66cbdf195`
- `operations/product-stewards/maikeover/FUNCTIONALITY-MAP.md`
- `content/site/resident-card-contract-v1.js`
- `content/site/puffy-bookmarks.js`
- `laidies-card.html`
- filesystem inventory under `assets/closet/`, `assets/cards/`,
  `assets/charms/`, `assets/stickers/`, `assets/puffies/` and
  `assets/avatars/residence-card-stock/`

This inventory is repository evidence, not public-origin, account, ownership,
deployment or Brand approval evidence.
