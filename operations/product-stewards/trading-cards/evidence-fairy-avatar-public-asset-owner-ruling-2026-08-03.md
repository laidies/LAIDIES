# FAiRY Godmother public Resident Card avatar — joint owner ruling

**Status:** `REPLACE — EXACT CURRENT BYTE IS NOT AN ADMIT CANDIDATE`

**Date:** 2026-08-03

**Decision owners represented:** Trading Cards / Town character catalogue + Town Hall / Regulars consumer + Brand

**Scope:** the one public fictional-resident avatar job supplied by `content/data/character-cards.json`. This ruling does not create, register, package, deploy, publish or delete an asset.

## Exact candidate and current consumer

| Item | Exact identity |
| --- | --- |
| Candidate asset | `assets/laidy-fairy-godmother-portrait-v3.png` |
| Candidate SHA-256 | `d9cb840d8d0809be3a1ec55f606dbdf0978b51a74f18273ffc1c004a81b38281` |
| Raster receipt | PNG; 1024 × 1536; RGB; no alpha; 3,706,648 bytes |
| Current character data | `content/data/character-cards.json` |
| Current character-data SHA-256 | `64f3bdfca9afc060ac7e2f8b9b40106c23dadb0ce68dc30e84637564c2f29e50` |
| Exact current field | `characters.fairy-godmother.avatar = "/assets/laidy-fairy-godmother-portrait-v3.png"` |
| Current runtime-family manifest | SHA-256 `0eec69f1053eb74c924eed55e10af996bce307420140dd2878eb04a65f7574a7`; candidate disposition `CURATION_REDO` |
| Current public-asset inventory | SHA-256 `0d9dd1cb867f5adfc38479fe345d45f5a27a53be200beaab0fdd5bf1bf7b81bf`; candidate remains a prohibited source reference |

The byte-identical copy at `approved-assets/town-characters/laidy-fairy-godmother-portrait-v3.png` has the same SHA-256. Its folder name is not authority and does not create a second candidate or cure the current hold.

## Ruling

**REPLACE this exact SHA for the public FAiRY Godmother Resident Card avatar job.**

The strongest case for retaining it is narrow: it is a technically intact portrait, its face remains recognisable in the current square crop, and a 2026-07-27 independent card review used the same SHA as an identity reference for an unadmitted Town-card successor. That earlier review expressly admitted neither the portrait nor the resulting product. It is superseded for this decision by Ali's later identity ruling and current production authority:

- Ledger decision D-2026-07-28-077 says the known-wrong FAiRY reference remains blocked regardless of card-format approval.
- `operations/building-design-briefs/fairy-godmother.md` explicitly marks this exact file `redo`, prohibits it as a reference, and binds FAiRY likeness to `assets/video/sunnyvaile-credits-v1-plates/opening-05-fairy-godmother-rerender-lit-v2.png`.
- `operations/trailer-comic-storyboard.md` calls that credits plate **THE approved FG** and this exact portrait the dead tarot portrait.
- The Trading Cards owner record says the existing FAiRY identity is wrong and blocks a successor until the governing identity is bound.

Current use in JSON and a historical independent comparison cannot override those later owner and identity authorities.

## Exact assessment

### Canonical identity — FAIL

The current image depicts a light-skinned older woman with silver-gold curls, wire glasses, a heart tiara, pink robe, large wings and a heart wand. The current approved likeness anchor is a Black adult woman with a dark curly updo, small star tiara, warm direct expression and silver wand, bound at:

`assets/video/sunnyvaile-credits-v1-plates/opening-05-fairy-godmother-rerender-lit-v2.png`

SHA-256 `9d360be4ba61601563b2def6a5d15c065b43016dec197bcb5a6b3f1eb0c41752`.

These are different character identities, not styling variants. The current portrait therefore cannot represent the canonical FAiRY on a public Resident Card.

### Role fitness — HOLD / not enough to rescue the byte

Letters, a wand, a cottage, tea and an adult Godmother make the wishmaking role legible. However, the heart-heavy fairy-tale tableau overstates romance and generic wish fulfilment while underrepresenting the actual case-desk job: practical AI, work/career and everyday-life guidance that turns a problem into a usable next move. The image may suggest a magical correspondence character, but it does not truthfully anchor the current approved person or the product's practical judgment.

### LAiDIES / Rewind Era / Trading Cards Brand — FAIL

The byte uses photorealistic fantasy painting, ornate gold scrollwork, rose-and-heart repetition, soft glossy modelling and a dark plum/gold tarot frame. It does not use the locked Trading Cards language: bold black ink, flat saturated 1990s pop-art colour, Ben-Day halftone, decisive banner/burst construction and white/cream relief. The earlier card judge identified this same ornate heart/gold/rose register as the retired saint-card direction. A Resident Card avatar need not contain a full Trading Card frame, but it must still belong to the same adult, vivid 1990s LAiDIES character world. This byte does not.

### Crop and small-size fitness — HOLD

The actual `laidies-card.html` consumer renders a 240 × 240 square with `object-fit: cover`. I inspected the full-resolution byte and its equivalent centred 240px square crop. The face remains visible, but the crop retains dense wings, roses, envelopes, wand sparkle and gold filigree; most fine detail collapses at avatar size and the image reads as an ornate miniature rather than a clean character identifier. Because there is no `object-position` or dedicated crop asset, the current 2:3 composition is also more fragile than a purpose-built square.

### Accessibility — FAIL for the current integration contract

`content/data/character-cards.json` supplies no avatar-alt field. `laidies-card.html` hard-codes the generic alternative text `Resident Card portrait`, even for this named fictional resident. That text neither identifies the FAiRY nor explains a meaningful distinguishing visual; if the adjacent character name makes the image decorative, it should instead be deliberately empty. A successor must make that decision explicitly rather than inheriting generic alt text.

### Source rights / provenance — HOLD

No checksum-bound creation, model/source, licence or public-use rights receipt for this exact SHA was found in the inspected owner, Brand, curation, release or public-asset records. The byte-identical `approved-assets/` copy and a filesystem provenance attribute are not a rights record. Rights are therefore unverified and cannot support admission. This is an evidence gap, not a claim that LAiDIES lacks the rights.

## Narrow admitted scope

There is **no admitted scope for this exact SHA** in the current public character-card avatar job.

The byte may remain preserved as historical/rejected evidence. It must not be reselected through the byte-identical `approved-assets/` copy, treated as canonical identity, used to derive a successor, added to the active-asset registry, or packaged by the public builder. This ruling does not decide unrelated historical artifacts, approve the credits plate itself as a shippable avatar, admit a Trading Card face, or change any route, data, registry, manifest, build or release state.

## Exact successor brief

Produce **one** purpose-built public Resident Card avatar; no variants.

- **Identity anchor:** use only `assets/video/sunnyvaile-credits-v1-plates/opening-05-fairy-godmother-rerender-lit-v2.png` at SHA-256 `9d360be4ba61601563b2def6a5d15c065b43016dec197bcb5a6b3f1eb0c41752` for face and character identity: adult Black FAiRY, dark curly updo, small star tiara, warm direct expression and silver wand.
- **Job:** identify `The FAiRY Godmother · Wishmaker · Willow Lane` instantly on the public fictional Resident Card; imply warm, capable wish-to-practical-plan guidance without generated words, a speech bubble, a tarot frame or invented dialogue.
- **Format:** 1024 × 1024 PNG, sRGB, no baked UI, no name text, no logo and no frame that duplicates the Resident Card chrome. Keep face, tiara and one clear silver-wand cue readable in both 240 × 240 and 64 × 64 centred crops.
- **Rendering:** adult 1990s LAiDIES pop/comic character portrait using the locked people identity discipline and the Trading Cards reference family: crisp black ink, flat saturated colour, controlled halftone/printed texture and simple high-contrast composition. Use the character's established colours in a vivid treatment without soft pink fantasy gloss.
- **Exclude:** the rejected silver-haired/light-skinned identity; wings/heart-tiara/heart-wand identity substitution; ornate gold scrollwork; roses/envelope clutter; tarot or saint-card framing; photorealism; painterly or airbrushed fantasy; generic glamour cartoon; dark plum/gold governing palette; readable generated text; speech bubbles; hands/anatomy defects.
- **Accessibility:** bind a character-specific `avatarAlt` such as `The FAiRY Godmother with her silver wand` if the image is meaningful; otherwise implement an intentional empty alt because the adjacent real text already names her. Do not retain `Resident Card portrait` as the unexplained default.
- **Rights:** attach a checksum-bound source/generation and public-use-rights receipt for the delivered byte.

## Fail condition

**Fail closed if the delivered successor does not visibly match the approved-identity anchor at SHA-256 `9d360b…1752` in a centred 240px square crop.** A technically valid PNG, a matching prompt, or similarity to this rejected portrait cannot pass that gate.

Rights absence, generic alt, unreadable 64px identity, ornate tarot/saint styling, or any reuse of SHA-256 `d9cb84…8281` are additional independent holds.

## Exact next integration action

Do **not** change `content/data/character-cards.json` yet. Route the successor brief to the image-production owner for one checksum-bound square avatar, then obtain role-distinct FAiRY identity, Trading Cards/Town Hall product, Brand, accessibility and rights judgments on the exact delivered bytes. After those pass, one integration owner may:

1. update only the FAiRY `avatar` and explicit alt contract in `content/data/character-cards.json`;
2. remove the rejected source request;
3. add the accepted successor to the active-asset registry and reconcile the runtime manifest;
4. regenerate the public-asset inventory; and
5. require exact-set builder parity, affected Resident Card/Town Hall browser checks and an independent admission verdict.

Platform registry/build integration follows the owner verdict; it does not manufacture it. Deployment, publication and public-origin verification remain separate.

## Verification and limits

- Recomputed the asset, character data, manifest and current inventory hashes.
- Confirmed the byte-identical alternate and every current source occurrence.
- Inspected the exact candidate at original resolution and as the current centred 240px square crop.
- Inspected the exact approved identity anchor at original resolution.
- Ran targeted product-steward owner-entry checks for Trading Cards, Town Hall and FAiRY Godmother: all structural preflights passed.
- Performed no asset generation, source/data edit, registry/manifest/builder mutation, deployment, publication, credential action or public verification.

**Learning scan:** the reusable issue is already governed by D-2026-07-28-077 and the default-deny public-asset closure: a historical identity-reference verdict cannot override a later canonical-identity rejection. No shared painpoints-log edit was made because this lane's exclusive write scope is this receipt only.
