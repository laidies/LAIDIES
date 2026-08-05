# Mme CLAi-O public character-card avatar — joint owner ruling

**Status:** `REPLACE — EXACT CURRENT BYTE IS NOT AN ADMIT CANDIDATE`  
**Date:** 2026-08-03  
**Decision owners represented:** Mme CLAi-O + Trading Cards / Town-character catalogue + Town Hall / Regulars + Brand + Episode Experience  
**Scope:** the public fictional-resident avatar supplied by `content/data/character-cards.json` and the byte-identical Episode 01 Extra Credit cue. This ruling does not create, edit, register, package, deploy, publish or delete an asset.

## Exact candidate and current bindings

| Item | Exact identity |
| --- | --- |
| Candidate asset | `assets/madame-claio-portrait-v3.png` |
| Candidate SHA-256 | `f367682ec09e909d70ea6b0f00cae90a11ca01d3ea080310ea283a7f0feba44b` |
| Raster receipt | PNG; 1024 × 1536; RGB; no alpha; 3,727,247 bytes |
| Current character data | `content/data/character-cards.json` |
| Character-data SHA-256 | `64f3bdfca9afc060ac7e2f8b9b40106c23dadb0ce68dc30e84637564c2f29e50` |
| Exact character field | `characters.mme-claio.avatar = "/assets/madame-claio-portrait-v3.png"` |
| Current Episode 01 cue sheet | `content/episodes/episode-01-cues.json` |
| Episode 01 cue SHA-256 | `73b308d3f9f628557147706daeb804eba21e29de4ace74fbc18101f177bacc95` |
| Exact Episode 01 occurrence | `cues[]` CTA at `t=1076.3`, `src="/assets/madame-claio-portrait-v3.png"`, destination `/games/madame-claio.html` |
| Runtime-family manifest | SHA-256 `0eec69f1053eb74c924eed55e10af996bce307420140dd2878eb04a65f7574a7`; exact SHA is excluded as `CURATION_REDO` with `Do not package` |
| Public-asset inventory | SHA-256 `0d9dd1cb867f5adfc38479fe345d45f5a27a53be200beaab0fdd5bf1bf7b81bf`; exact path is a prohibited source reference |
| Curation authority | `operations/ops/curation.json` SHA-256 `f6a97d4b7acd9263cb9ee3562da12fc6ed0eeaeae6e39ef5139adf0e4c731528`; key `madame-claio-portrait-v3 = redo` |

The current public inventory contains 581 reachable binaries, 21 exact `ACTIVE`, 560 `UNREGISTERED_DEFAULT_DENY`, nine prohibited source references and no missing dependency. These counts describe a local fail-closed inventory, not a release or public state.

## Ruling

**REPLACE this exact SHA for every current public rendering job. RETAIN it only as historical identity-development evidence; HOLD all registry, build and public use.**

The strongest retention case is limited. The portrait is technically intact; the mature blonde Mme CLAi-O, rhinestone cat-ear clips, purple round glasses, dramatic eye makeup, fuchsia feathers, jewellery and reading-room props are unmistakable; and earlier working material used it to carry identity into later scene/card candidates. None of that establishes current public authority:

- Current curation says `redo`, and the default-DENY builder already refuses the exact byte.
- The Brand portrait brief explicitly identifies the `*-portrait-v3.png` family as dark, ornate Victorian/tarot drift: halo, roses, heart gems, gold filigree and a dim jewel-tone ground are named rejection features.
- The current episode visual lock binds Mme CLAi-O identity to `assets/video/delivery-20260714-opening-v6/shots/opening-03-mme-claio-clean-face.png`, not this portrait.
- The Town Character front derived from this portrait remains unadmitted. Its earlier isolated visual acceptance cannot override the later Trading Cards rejection/hold, and its baked `PAUSE. NOTICE WHAT YOU KNOW.` bubble remains candidate copy rather than exact public authority.
- Town Hall has already removed its rejected portrait consumer and deliberately renders an accessible `Portrait held` state while preserving Mme CLAi-O's role and shop route.
- No checksum-bound creation, source, licence or public-use-rights receipt was found for this exact byte.

Current use is evidence of an unresolved consumer collision, not a reason to admit the image.

## Owner dispositions

| Owner / surface | Disposition for this exact SHA | Visitor job preserved | Required successor or removal action |
| --- | --- | --- | --- |
| Mme CLAi-O | **REPLACE PUBLIC / RETAIN HISTORICAL ONLY** | A recognisable warm, mature Town psychic who anchors the reading-room ritual without claiming prediction or authority | Use the current identity anchor below to make one purpose-built public avatar. This receipt does not replace the incumbent reading-room art or the governed 100-card deck. |
| Trading Cards / Resident Card | **REPLACE / CATALOGUE HOLD** | Identify the fictional resident `Mme CLAi-O · Town Psychic · Reading-Card Oracle` on her public Resident Card | Replace only after one exact square avatar passes identity, Brand, crop, accessibility and rights judgment. Do not substitute the unadmitted 2026-07-27 full card front or crop its baked title/speech bubble into the avatar. |
| Town Hall Regulars | **RETAIN CURRENT HELD STATE; DO NOT REINTRODUCE THIS SHA** | Preserve Mme CLAi-O's name, role, shop explanation and `/games/madame-claio.html` route | Keep the current image-free `Portrait held` consumer until the same admitted square avatar is accepted. Then Town Hall may consume that one exact avatar; it must not independently choose another identity. |
| Brand | **REPLACE** | One coherent vivid adult 1990s LAiDIES character world, distinct from retired saint/tarot ornament | Reject the current photoreal ornate composition. The successor must use adult graphic-novel/pop-comic rendering, crisp black ink, flat saturated colour and restrained printed texture without tarot/saint framing. |
| Episode Experience / Episode 01 | **REPLACE OCCURRENCE OR REMOVE THE CTA FROM THE RELEASE CUE SET** | The optional Extra Credit invitation to visit Mme CLAi-O after the episode | Preferred: bind the same admitted square avatar as the CTA `src` and independently inspect the real 16:9 player occurrence. Fail-closed fallback: if no admitted avatar exists at Episode 01 release sealing, remove the complete optional Mme CLAi-O CTA occurrence rather than retain a broken/blocked `src` or substitute unrelated art. Preserve CTA copy only when its visual and route remain truthful. |
| Platform / public builder | **HOLD / DEFAULT DENY** | Package only owner-admitted exact bytes and preserve dependency closure | Keep the current exclusion until an accepted successor replaces both executable source references or the Episode occurrence is removed. Registry/build changes follow, never create, owner authority. |

## Executable consumer inventory

Only two current runtime chains can render the exact byte:

1. `laidies-card.html` fetches `content/data/character-cards.json`, maps `characters["mme-claio"].avatar` to `card_avatar_url`, and renders it in `#cardAvatar` through `replaceWithSafeImage`.
2. `watch.html?ep=01` fetches `content/episodes/episode-01-cues.json`; the `t=1076.3` CTA becomes a full-frame `<img class="scene-img">` linking to Mme CLAi-O's shop.

The public builder is an executable enforcement consumer: it traverses the Episode 01 cue file, resolves this exact SHA through the runtime-family exclusion, and fails closed. `scripts/test-trading-cards-held-character-scenes-browser.mjs` is test-only and asserts that the Trading Cards decorative strip does not request the image while the separate Resident Card record remains unchanged.

The following references are not additional current rendering consumers: `assets/video/episode-01-production-cues-v2.json`, `_cut-review.html`, historical local-public artifacts, release manifests, storyboard/prompt records and the `candidate_unadmitted` Town-card manifest.

## Exact assessment

### Canonical identity — FAIL for public authority

The exact portrait and later outputs share useful identity cues, but the current episode identity authority is:

`assets/video/delivery-20260714-opening-v6/shots/opening-03-mme-claio-clean-face.png`  
SHA-256 `31dddad67d3592d5c46246299ea323efff0234480211655b989b80b12b99da51`.

That authority retains the mature blonde sweep/curls, rhinestone cat-ear clips, purple glasses, fuchsia/plum wardrobe, jewellery and reading-room identity in the current ensemble's governed source. This rejected portrait may document earlier identity development, but it must not govern or visually override the current anchor.

### Role fitness — PARTIAL / not enough to rescue the byte

The crystal ball, reading cards, knowing expression and lavish psychic-room setting make Mme CLAi-O's role legible. They also overstate mystical authority: the halo, tarot-card posture and devotional ornament read closer to a supernatural oracle than the actual product contract—one honest randomized authored reflection that the visitor may keep, adapt or ignore. A successor should retain one card/crystal cue but foreground warm theatrical reflection rather than foresight.

### LAiDIES / Rewind Era / Trading Cards Brand — FAIL

The exact byte is a dark, photoreal fantasy-tarot portrait with a neon halo, gold baroque frame, roses, heart gems, glossy material detail and dense plum/gold ornament. The current Trading Cards reference family requires bold black ink, saturated 1990s pop-art colour, Ben-Day/printed texture, decisive banner/burst grammar and white/cream relief; the master people register rejects photorealism and soft digital-paint modelling. A Resident Card avatar need not contain the full Trading Card frame, but it must belong beside that adult vivid character family. This byte does not.

### Crop and small-size fitness — FAIL across the two current jobs

- `laidies-card.html` renders a centred 240 × 240 square with `object-fit: cover`. The face remains recognisable, but the dedicated 2:3 composition is reduced to a dense crop of glasses, hair, feathers and ornament; the frame and role objects collapse rather than becoming a clean avatar.
- `watch.html` renders CTA images as an overscanned 16:9 full frame (`inset:-6%`, `112% × 112%`, `object-fit: cover`). A 2:3 portrait therefore loses most of the card/rose tableau and risks destructive face/prop cropping during its timed zoom. This is not a placement-specific Episode 01 cue asset.

One source file cannot pass merely because both consumers can technically request it; each real crop must be accepted.

### Accessibility — HOLD

The character data supplies no avatar-alt field. `laidies-card.html` hard-codes `Resident Card portrait`, which does not identify Mme CLAi-O; if adjacent name/role text makes the avatar decorative, the image should instead receive intentional empty alt. The Episode CTA image is currently empty-alt while its visible caption and link carry the meaning, which can be appropriate only if the replacement remains decorative and the CTA text stays complete. The successor integration must make these two decisions explicit.

### Source rights / provenance — HOLD

The file first appears in Git commit `011bf759d757b9729c6ab88db580fa7a47e9e573` as a binary checkpoint. Repository search found no checksum-bound creation/generation receipt, model/source declaration, licence or public-use-rights record for SHA-256 `f36768…a44b`. The filesystem provenance attribute and historical prompt references are not rights evidence. Rights are unverified, so public admission fails even if the visual defects were ignored. This is an evidence gap, not a claim that LAiDIES lacks the rights.

## Narrow retained scope

The exact SHA may remain preserved as **historical/rejected identity-development evidence only**. It may be consulted to understand the earlier blonde hair, rhinestone cat-ear clips, glasses, makeup, fuchsia/plum wardrobe and jewellery, but the current identity anchor above has precedence and must govern any new output.

This scope does not permit the byte to be registered, packaged, displayed publicly, used as a public-generation reference, cropped into an avatar, inserted into Episode 01, reintroduced at Town Hall, or used to admit the unadmitted Town-card front.

## Exact successor brief

Produce **one** purpose-built public character-card avatar; no variants.

- **Identity anchor:** use `assets/video/delivery-20260714-opening-v6/shots/opening-03-mme-claio-clean-face.png` at SHA-256 `31dddad67d3592d5c46246299ea323efff0234480211655b989b80b12b99da51` for the current character identity. Preserve mature blonde sweep/curls, rhinestone cat-ear clips, purple round glasses, confident warm expression, fuchsia/plum clothing and jewellery.
- **Job:** identify `Mme CLAi-O · Town Psychic · Reading-Card Oracle` instantly on the public fictional Resident Card and support the optional Episode 01 shop CTA without implying real prediction.
- **Format:** 1024 × 1024 PNG, sRGB, no baked UI, name text, logo, border or speech bubble. Keep the face, glasses, cat-ear clips and one restrained card/crystal cue readable in centred 240 × 240 and 64 × 64 crops.
- **Rendering:** adult 1990s LAiDIES graphic-novel/pop-comic portrait: crisp variable black ink, anatomically informed mature face, hard-edged dimensional colour, saturated pink/purple/teal/cobalt accents and controlled halftone/printed texture. The category treatment supports identity; it does not flatten the face into generic pop art.
- **Role truth:** warm, theatrical and knowing; one reading-card or crystal cue is enough. Do not depict prediction, a devotional halo or mystical certainty.
- **Exclude:** photorealism; painterly/airbrushed fantasy; neon halo; roses/floral swags; heart gems; stained glass; ornate gold scrollwork; dark plum/gold tarot/saint frame; glitter/foil overload; readable generated text; invented dialogue; speech bubble; generic glamour cartoon; anatomy defects.
- **Accessibility:** add a character-specific data contract such as `avatarAlt: "Mme CLAi-O with purple glasses and reading cards"` if the Resident Card image is meaningful; otherwise implement intentional empty alt because adjacent text already supplies name and role. Keep the Episode CTA image decorative only while its visible caption/link completely supplies the action.
- **Rights:** attach a checksum-bound source/generation and public-use-rights receipt for the delivered byte.
- **Episode placement proof:** judge the accepted square candidate in the real Episode 01 16:9 CTA treatment. If its crop fails, produce a checksum-bound placement derivative from the same admitted master without changing identity; do not fall back to this rejected portrait.

## Fail condition

**Fail closed if the successor does not visibly match the current identity anchor at SHA-256 `31ddda…a51` in a centred 240px square crop and the actual Episode 01 16:9 CTA placement.** A technically valid PNG, a matching prompt, similarity to this rejected portrait or a historical visual receipt cannot pass.

Any of the following independently retains HOLD: no rights/provenance receipt; generic Resident Card alt; unreadable identity at 64px; photoreal/tarot/saint drift; baked words or invented speech; use of the unadmitted full Town-card front; or any reuse of SHA-256 `f36768…a44b` in a public source.

## Exact next integration action

Do **not** change `content/data/character-cards.json` or the Episode 01 cue yet. Route the successor brief to the image-production owner for one checksum-bound square avatar, then obtain role-distinct Mme CLAi-O identity, Trading Cards/Resident Card, Town Hall, Episode Experience, Brand, accessibility and rights judgments on the exact delivered byte and its two real crops.

After those pass, one integration owner may:

1. update only `characters.mme-claio.avatar` plus the explicit avatar-alt contract in `content/data/character-cards.json`;
2. update the Episode 01 CTA to the same admitted master or an admitted placement derivative, or remove the complete optional CTA if no valid visual exists at release sealing;
3. preserve Town Hall's held state until it consumes that same admitted identity;
4. remove every current request for SHA-256 `f36768…a44b`;
5. add only the accepted successor byte(s) to the active-asset registry and reconcile the runtime manifest;
6. regenerate the public-asset inventory; and
7. require exact-set builder parity, the affected Resident Card, Town Hall, Trading Cards and Screening Room checks, an exact Episode 01 occurrence verdict, and an independent public-asset admission verdict.

Platform integration follows the joint owner ruling; it does not manufacture it. Deployment, publication, human Episode/media acceptance and public-origin verification remain separate.

## Verification and limits

- Recomputed the exact asset, character-data, Episode 01 cue, manifest, inventory and curation hashes.
- Inspected the exact candidate at original resolution and evaluated its current 240px square and overscanned 16:9 consumer crops from executable CSS.
- Inspected the current Mme CLAi-O identity anchor and the unadmitted Town-card candidate at original resolution.
- Enumerated every executable current consumer and separated runtime/build/test consumers from historical records.
- Ran targeted product-steward owner-entry preflights for Mme CLAi-O, Trading Cards, Town Hall and Episode Experience; all passed structurally.
- Performed no image generation, asset/source/data edit, registry/manifest/builder mutation, deployment, publication, credential/provider action or public verification.

**Learning scan:** the reusable failure is already governed by the default-DENY public-asset closure and current identity/Brand locks: runtime use and an earlier candidate review cannot override a later curation, identity, placement or rights hold. No shared painpoints-log edit was made because this lane's exclusive write scope is this receipt only.
