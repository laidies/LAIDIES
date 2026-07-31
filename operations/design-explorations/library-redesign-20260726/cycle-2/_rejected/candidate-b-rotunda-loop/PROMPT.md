# Candidate B environment-plate provenance

- Status: `_rough`; maker-only output; no review, score, recommendation or admission.
- Owner-entry preflight: passed under `OWNER-ENTRY-CONTRACT / D-052`, reported by the root product owner on 2026-07-26.
- Generator: built-in Image Gen.
- Final generated source receipt: `/Users/alisoneakin/.codex/generated_images/019f9f45-4e50-7182-9094-03b66df6f133/call_91lASUQ97WksbrMvskVvUrhC.png`.
- Workspace artifact: `environment-plate.png`, 1505 × 1045, SHA-256 `8aada302739bb6fef19a4221738aa4fed690e2e238b86859320dfae2bf86b411`.
- Reference 1 role: environment rendering only — `operations/reference/episode-style-popart/epstyle-scene-01.png`, SHA-256 `3385f2572ffd3a6502220366b3457ec5dbaae58ae5d370d0656499eab90b6984`.
- Reference 2 role: SUNNYVAiLE daytime palette only — `assets/episodes/ep-04/pixel/ep04-daytime-colorsetter-sunnyvaile-main-street-v1.png`, SHA-256 `f50e9f86898106ccab2e2a2debf420ecc206e14dc3d8b60b7fd7c3e224d6b24e`.
- One bounded edit changed only the floor motif; the original rotunda generation was not saved as a candidate.

## Exact base prompt

```text
Use case: stylized-concept
Asset type: 1440×1024 desktop web experience environmental backplate only, for a deterministic HTML/CSS LIBRAiRY interface layered above it
Input images: Image 1 is the approved environment-rendering reference for bold adult graphic-novel architecture, variable-width ink contours, faceted light, dimensional depth and restrained printed texture; Image 2 is the approved SUNNYVAiLE daytime colour-setter for vibrant turquoise, deep plum, periwinkle, coral, candy pink and sunlit cream palette only—ignore its people, signs, words and storefront content
Primary request: Create a wide circular public-library rotunda viewed from the entrance, with a strong curved balcony and an open central floor. Preserve generous architectural zones around the perimeter where real shelf components can later be placed in HTML, and a clear side zone where the approved Miss Jeeves art can later sit.
Scene/backdrop: round room, high skylight, curved balcony rail, sunlit cream and warm lavender walls, deep plum and teal structural accents, terrazzo floor with restrained geometric inlay, a few plants; leave the lower perimeter and central floor uncluttered
Style/medium: adult dimensional comic/graphic-novel environment illustration; elegant black ink; faceted hard-edged light and shadow; rich color; controlled printed texture; not photorealistic
Composition/framing: landscape 1440×1024; wide rotunda vista; curved circulation is the dominant architecture; no close-up focal object; no built-in interface
Lighting/mood: coherent bright daytime skylight, welcoming civic energy, legible rather than theatrical
Constraints: ENVIRONMENT ART PLATE ONLY. No user interface, no navigation, no app chrome, no panels, no cards, no controls, no icons, no logos, no labels, no signage, no letters, no numbers, no words, no book covers, no books, no people, no characters, no librarian, no desk, no display screens, no floating symbols. No empty UI rectangles. Do not create shelving or furniture that looks clickable; the actual shelves, books, Miss Jeeves and controls will be added later from approved assets in deterministic HTML.
Avoid: futuristic chrome, sci-fi dashboard, holograms, neon-tech lab, corporate photorealism, generic luxury library, mystery symbols, fake book art, baked text, white/pink overlay masthead, spotlight beams, interface-like blank boards, watermarks
```

## Exact floor-only correction prompt

```text
Use case: precise-object-edit
Asset type: 1440×1024 desktop web experience environmental backplate only
Input image: Image 1 is the edit target, a circular SUNNYVAiLE public-library rotunda environment plate
Primary request: Change only the floor treatment. Replace the central compass/star/radial medallion with a restrained non-symbolic terrazzo pattern made from irregular small plum, teal, coral and cream chips plus simple perimeter bands. It must not resemble a sun, star, compass, seal, logo, target, icon, glyph or symbol.
Constraints: Preserve the exact room geometry, skylight, balcony, columns, doorways, plants, wall colors, viewpoint, lighting, dimensions, adult graphic-novel ink rendering and every other detail. Environment art plate only. No user interface, no navigation, no app chrome, no panels, no cards, no controls, no icons, no logos, no labels, no signage, no letters, no numbers, no words, no books, no people, no characters, no desk, no display screens, no floating symbols, no watermark.
```

## Deterministic reference roles

- Current inner-page header behavior: `/content/site/sv-global-header.js?v=20260715-1`.
- Real two-row shelf: `/assets/building-interiors/library-shelf/delivery-20260722-transparent-v1/size-variants-v4/library-shelf-unit-2-row-full-width-v1.png`.
- Real current book family: `/assets/library-101/bright-family-v2/`.
- Miss Jeeves identity/art: `/assets/pixel-restyle/characters/miss-jeeves-portrait-pixel-v1.png`.
- Puffy: `/assets/puffies/usable-25/01-heart-sunglasses.png`.
- All labels, controls, status words and cross-building routes are live HTML.
