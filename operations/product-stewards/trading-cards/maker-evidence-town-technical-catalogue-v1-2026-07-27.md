# Town technical catalogue v1 — maker evidence

**Status:** `BUILT LOCALLY — INDEPENDENT TECHNICAL REVIEW PENDING`  
**Date:** 2026-07-27

## Literal output

`town-character-technical-catalogue-candidate-v1-2026-07-27.json` maps the 13
content-accepted Town records into the exact field shape required by the
Trading Cards operating specification:

`card_key`, `deck`, `catalog_version`, `release_state`,
`episode_or_roster`, `front_title`, `front_hook`, `back_heading`,
`back_copy`, `source_authority`, `source_locator`, `image_front`,
`image_back_or_rendered_copy`, `alt_front`, `alt_back`, `pack_keys`,
`identity_ref`, `visual_review_receipt`, `editorial_review_receipt`,
`correction_owner` and `updated_at`.

The candidate binds the accepted content verdict and isolated rendered
consumer verdict. Every record independently rebinds its front hash, roster
authority, visual receipt, editorial receipt and accessibility/consumer
receipt.

## Exact bytes

- Technical catalogue JSON SHA-256:
  `b6b4b3a57b923a77db12dc156b5ed598ad92ba8ca2acdb3e3de4475fad2273c2`
- Builder SHA-256:
  `4ff12fa1bf9cd88369f78ae6fd0110261bae8b5cc6f77a09279d94cb5e5de0a6`
- Validator SHA-256:
  `e260329a1a911c84a686368b1997b9d6e96572c7947286849abc41d6d7c2f270`

The builder fails closed unless the exact content candidate, content verdict,
rendered-consumer verdict, Town roster and visual-admission matrix hashes
match their accepted inputs.

## Validation

`TOWN TECHNICAL CATALOGUE PASS records=13 required-fields=21 fronts=13 receipts=52 release=held pack=not-created ownership=none`

The validator proves:

- 13 unique card keys and identity references;
- all required operating-spec fields on every record;
- all 13 exact front files and hashes;
- 52 exact authority/review receipt checks;
- held release, empty `pack_keys`, no ownership and no Closet projection;
- no entitlement, resident, opening, odds or idempotency fields.

## Boundary

This catalogue is a held technical-shape candidate, not an admitted catalogue.
It does not create or select a pack, grant or open a card, record ownership,
project to Closet, change a route, deploy or authorize public use. Product and
release admission remain separate.

