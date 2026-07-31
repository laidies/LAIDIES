# Build packet — Resident Card backgrounds + Closet visual system

**Named production lane:** `RESIDENT CARD BACKGROUNDS + CLOSET VISUAL SYSTEM`  
**Status:** `SPECIFIED — VISUAL PRODUCTION QUEUED / BLOCKED PENDING BRAND`  
**Owner:** MAiKEOVER on MAiN (`maikeover`)  
**Owner task:** `019f9f74-712b-7400-bc07-795faaf7a6de`  
**Inventory:** `closet-visual-asset-inventory-2026-07-26.md`

## Outcome

After Brand selects the shared visual direction, ship one coherent, responsive
and accessible visual system for Resident Card backgrounds and the full Closet.
It must show empty, locked, owned and equipped truth using shared identity,
ownership, rewards and cross-device contracts. This lane consumes those
contracts; it does not replace them.

No visual generation, style selection, asset adaptation, crop production or
page integration is authorized by this packet before the Brand gate opens.

## Gate 0 — current reversible prep

Complete now:

- preserve the 4 room candidates and their exact provenance;
- retain the 6 background IDs as semantic contract values;
- retain source catalogues without asserting ownership;
- keep the missing-asset manifests for 8 vessel icons and 24 full/empty object
  sprites;
- obtain producer manifests and Platform schemas only.

Do not rename live IDs, overwrite images, generate variants, extract flattened
objects, select a style, wire v3/v5, or change public copy.

## Gate 1 — Brand unblock receipt

**Dependency:** Brand Experience Director.

Required receipt:

1. selected sitewide direction/name and dated authority;
2. palette, typography, texture/material, illustration/rendering and icon rules;
3. source examples and forbidden treatments;
4. desktop/mobile composition and image-density rules;
5. contrast, focus, motion and reduced-motion requirements;
6. whether the four room candidates are `KEEP`, `ADAPT` or `REJECT`.

The provisional inventory labels stay suffixed **PENDING BRAND** until this
receipt exists. No Ali choice is requested from this lane unless Brand presents
a bounded final tie that cannot be resolved against the shared system.

## Gate 2 — producer and Platform manifests

| Dependency | Exact input required | Acceptance owner |
|---|---|---|
| Trading Cards | admitted card and pack IDs; concept/character distinction; front/back/foil assets; award/open/duplicate/correction rules | Trading Cards owner |
| Library | 75-file Puffy catalogue, stable labels, publication recheck and device-local semantics; no ownership inflation | Library owner |
| Episodes/High/Express | released episode/class reward IDs, source event, title, art candidate, correction/revoke behavior | respective producer owners |
| Brand | Gate 1 receipt and asset QA owner | Brand Experience Director |
| Platform/Identity/Rewards | resident/source IDs; `locked/owned/equipped` read model; visibility; grant/revoke/correction; local/account merge; cross-device conflict; privacy-safe public projection | Functionality & Platform Director |

No producer manifest means the corresponding vessel may have a truthful empty
or unavailable state, but no invented item count.

## Gate 3 — exact production manifest

Brand-approved maker work must produce:

### Resident Card backgrounds

- 6 admitted treatments mapped one-to-one to `classic`, `pinklilac`, `peach`,
  `mint`, `lavender`, `holo`;
- 6 thumbnails;
- contrast proof for resident name, fields, focus and status overlays;
- one fallback treatment for unknown/deprecated IDs;
- state treatment must come from Platform, not baked into the art.

### Closet room

- 1 desktop master;
- 1 tablet art-directed crop;
- 1 mobile portrait art-directed crop;
- focal-point/safe-zone metadata for 320/390/768/1440 CSS-pixel viewports;
- 7 named vessel zones: Puffy Board, Sticker Book, Merit Sash, Charm
  Bracelet, Butterfly Clip Jar, Trading-card Binder, Locked Diary/Detention
  area;
- separate background and interactive objects; no text baked into scenery.

### Vessels and room objects

- 8 missing vessel icons at
  `assets/closet/vessels/{puffy-board,sticker-book,merit-sash,charm-bracelet,butterfly-clip,trading-card-binder,detention-slip,locked-diary}-[brand-suffix].png`;
- 12 reusable object families from
  `operations/codex-prompts/closet-room-and-items-batch.md`;
- 2 base variants per family (`full`, `empty`) = **24 sprites**;
- transparent masters, consistent camera/light/scale, safe padding and no
  embedded labels;
- locked/owned/equipped overlays must be reusable UI state components, not
  destructive alternate artwork.

### Clothing and accessories

- first release inventory is **not yet countable**: Platform must supply
  category/equipped rules and Brand must define the layer method;
- each admitted item requires stable ID, category, thumbnail, display art,
  layer order/anchor, compatible avatar/body contract, source/provenance,
  availability and accessible name;
- flattened stock portraits remain avatar choices, not equipable items.

### Rewards

- render only admitted producer IDs;
- bind the 28 weekly charm candidates, 75 Puffy files, admitted stickers and
  admitted cards by stable source ID;
- do not render a file merely because it exists;
- empty, unavailable, locked, owned, equipped, revoked and corrected results
  come from the shared read model.

## Asset manifest schema

Every admitted output must add one row with:

`asset_id`, `source_product`, `source_object_id`, `category`, `state_support`,
`ownership_source`, `availability_source`, `equipped_source`, `desktop_path`,
`tablet_path`, `mobile_path`, `focal_point`, `alt_or_decorative`,
`brand_direction`, `brand_approval`, `qa_receipt`, `version`.

## Integration order

1. Brand receipt.
2. Platform state/ownership/visibility contract.
3. Producer catalogues and source-event admission.
4. Brand-aligned generation/adaptation in a reversible candidate directory.
5. Brand visual QA and accessibility/content QA.
6. MAiKEOVER/Closet renderer binds stable IDs to accepted assets.
7. Owner/private/public and four visitor-state tests.
8. Functionality & Platform integration lock and cross-device tests.
9. Independent acceptance.
10. Deployment and exact public-origin verification.

## Required test matrix

- first-time visitor, returning visitor without Card, device-local Card holder,
  verified account-backed Card holder;
- empty, locked, owned and equipped for every eligible category;
- unknown/deprecated asset and missing-image fallback;
- grant, duplicate, correction, revoke, equip, unequip and account conflict;
- local → account migration, two tabs, two devices and signed-out return;
- own/private/public projection with collections private unless admitted;
- 320/390/768/1440 widths, keyboard, screen reader, reduced motion, storage
  denied and 200%/400% zoom;
- Library save → Closet → exact publication; Episode/class reward → Closet;
  Trading Card award/open → binder; Book Fair purchase → exact delivery or
  refund.

## Acceptance

- **Visual system:** Brand Experience Director.
- **Identity/ownership/rewards/cross-device contracts:** Functionality &
  Platform Director plus the relevant source owner.
- **Resident Card/Closet experience:** MAiKEOVER owner.
- **Final candidate:** independent acceptance owner designated by Control Room.
- **Public truth:** Control Room only after deployment and exact-origin proof.

## Blocker and next trigger

**Blocker:** sitewide Brand direction is not selected.  
**Unblock:** dated Brand receipt satisfying Gate 1.  
**Next action after unblock:** reclassify every inventory row without the
`PENDING BRAND` suffix, freeze the admitted asset manifest and dispatch the
first bounded candidate batch.

No public, deployment, spend or Ali-approval authority is used by this packet.
