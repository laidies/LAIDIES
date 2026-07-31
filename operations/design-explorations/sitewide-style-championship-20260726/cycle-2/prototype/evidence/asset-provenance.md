# SVC-01 asset provenance

**Status:** CONTROLLED PROTOTYPE EVIDENCE — NOT PRODUCTION-APPROVED  
**Generated:** built-in OpenAI image generation, 2026-07-26  
**Authority:** assets are comparison inputs only; they do not propagate a style
or replace any live route.

## Shared source geometry

| Role | Source | SHA-256 | Use |
|---|---|---|---|
| Desktop room geometry | `operations/design-explorations/library-building-championship-20260726/candidate-assets/shelf-to-desk-room-wide-unapproved-v2.png` | `cfd993fe3b6f021ab50aef5d120c60a3393e880a82b6cad0faa68ce4eae8e42c` | Geometry/architecture reference for A and B/C desktop plates |
| Mobile room geometry | `operations/design-explorations/library-building-championship-20260726/candidate-assets/_rejected/shelf-to-desk-room-mobile-unapproved-v1-WRONG_STYLE_PHOTOREALISTIC_CORPORATE.png` | `d48ef62c7caae36d15f5d8c87be277be7a076816627d422ff44ce0aa38f6e8f7` | Geometry/crop reference only; rejected photoreal style was explicitly not retained |
| Miss Jeeves identity seed | `assets/pixel-restyle/characters/miss-jeeves-portrait-pixel-v1.png` | `313a22b168f2d49877602a02cb2569379fdb112897b7b12f579eeaf1a6f73a47` | Identity/pose seed for comparison portraits; not treated as final canon approval |
| Miss Jeeves approved exact identity reference | `assets/video/delivery-20260714-opening-v6/shots/_miss-jeeves-approved-reference.png` | `1250e3a1828752e61dcbaf61dad96159f93182d0eeae476231d0135366020d56` | Canon/identity preflight authority; compared at full resolution in `qa/character-identity-comparison.png` |
| Puffy save device | `approved-assets/stickers-charms/puffies/puffy-butterfly-holo.png` | `3971b018b2b491d0b9d52ff85ef00a87569e13921e4ccd0793d0ddd0aeab7f30` | Shared approved interface asset, unchanged in A/B/C |

Paths above are relative to `Website-homepage/`.

## Generated comparison plates

| Prototype asset | Preserved constraint | Direction-specific production instruction | Generator output |
|---|---|---|---|
| `public/assets/library-room-comic-desktop.png` | Exact desktop architecture, perspective, shelves, desk, crop and empty placement zones | Adult graphic-novel environment; decisive hard ink, faceted light, restrained print texture; remove all books, labels, signage, UI and pseudo-writing | `call_26o5RoprJGVgeOsWg8FFXUpG.png` |
| `public/assets/library-room-painterly-desktop.png` | Same desktop geometry/crop as comic plate | Painterly dimensional storybook environment; authored brush planes and materials; no comic outline; remove all books, labels, signage, UI and pseudo-writing | `call_lkxtUfgDQakN1qFI3FGF9PuD.png` |
| `public/assets/library-room-comic-mobile.png` | Authored 390px composition using the same room identity and shelf/desk zones | Adult graphic-novel environment; hard ink/faceted planes; no typography, books, UI or pseudo-writing | `call_AILaDk7UoE2gmY3aW7yb0W8R.png` |
| `public/assets/library-room-painterly-mobile.png` | Same authored compact composition as comic mobile plate | Painterly dimensional construction; no comic outline; no typography, books, UI or pseudo-writing | `call_6LKcf6Rjl9JsD01BCf6YuJWE.png` |
| `public/assets/miss-jeeves-painterly.png` | Same Black woman librarian identity, age, glasses, locs/updo, warm competent expression and desk pose | Painterly site register; simplified library background; zero typography/logos/UI/pseudo-writing | `call_1TScDMakby6E9udZZLX3fQ6A.png` |
| `public/assets/miss-jeeves-comic-v2.png` | Same identity and pose | Sophisticated adult hard-ink graphic novel; selective magenta/teal/ochre blocks, halftone/paper grain; not pixel art or superhero; zero typography/logos/UI/pseudo-writing | `call_LYAPJsrr3NY6C0vb2QRnrMMu.png` |

The immutable generator originals remain under:

`/Users/alisoneakin/.codex/generated_images/019f9f7a-1337-7fc0-a37a-74c8a88bbe49/`

## Deterministic text/UI boundary

- The environment plates contain no intended sign, title, status, control,
  result, price, data mark or logo.
- Every visible masthead, book title, department, availability state, Puffy
  state, prompt, answer, reader passage and continuation is rendered by
  `src/App.jsx` and `src/styles.css`.
- Any incidental rectangle in the room art is architecture or an empty object;
  no raster mark is authoritative product information.
- `evidence/manifest.json` binds the exact prototype assets, source, UI and
  screenshots by SHA-256.

## Known provenance limits

- The seed Miss Jeeves image is not the canon authority. The separately listed
  approved exact identity reference is the authority for the bound
  full-resolution comparison; independent image/canon review still owns the
  pass/fail.
- The rejected mobile source contributes geometry only. It carries no style
  authority.
- Generated comparison plates are intentionally unapproved. Ali’s ruling would
  select a system direction, not automatically approve these exact images for
  production use.
