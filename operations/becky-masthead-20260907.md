# Becky masthead — BUILDING

## Ali's successor direction — September 7

V2 generated with built-in image editing and saved at
`assets/chick-flicks/masthead-20260907/becky-clerk-v2-candidate.png`.
Maker sees correct mint/pink polo, exact Becky badge, high-waisted blue jeans,
pink digital sports watch and a physically held VHS. Youthfulness remains an
Ali-owned visual judgment. Output has no alpha: checkerboard is baked in, so
it is a character review candidate only, not a deployable masthead cutout.
No HTML asset swap or public deployment made. Extract background after the
character direction is accepted; do not treat a checkerboard as transparency.

V1 outfit/age treatment is superseded: Becky is in her early twenties,
possibly working at the rental store while attending college. Her uniform is a
mint polo with pink collar trim, high-waisted jeans, a Becky name badge and a
chunky pink Baby-G digital watch. She holds a VHS case so her clerk role is
immediately legible. Keep her recognizable brunette bob and inked/faceted
character language. No denim jacket, burgundy/mustard shirt, mature glamour
styling, fashion pose, modern smartwatch or invented VHS lettering. The badge
must spell `Becky` exactly. V2 is a review candidate, not public approval.

Ali requested a compact character masthead like the live NewsStand and confirmed
on September 7 that the Chick Flicks keeper is Becky and needs new artwork.
This supersedes the oversized title plus full-height room arrival, not the
approved VHS shelf artwork or episode interactions. No release is implied.

## Single-asset preflight

- Destination: Chick Flicks masthead, character beside live HTML title; desktop
  about 190–220px tall, responsive phone composition; shelves easily reached.
- Identity: `assets/town-characters/scenes/becky-scene.png`, brunette bob,
  adult face, gold hoops, denim jacket and striped shirt. Identity only;
  its painterly treatment is not the style reference.
- Style only: `assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png`.
  Preserve Becky's identity, never substitute the blonde Heroine.
- Layout reference: live https://laidies.ai/newsstand, September 7: keeper at
  left, compact title, dark ink on warm pop-art field.
- Output: one waist-up transparent PNG, head/arms/hands intact, no scene,
  counter, props, words, badge lettering, logos or extra people. Static asset.
- Era: 1999 video-store keeper. Friendly adult, not glamour model or child.
- Known-bad exclusions from episode-visual-system-lock: painterly blur,
  airbrushed glamour, flat vector faces, oversized eyes, malformed hands,
  substituted identity, invented wordmarks, generated UI text.
- Maker checks exact pixels for identity, ink/faceted shading, anatomy,
  clean silhouette/transparency and legibility at masthead size. Independent
  review follows maker inspection before presentation or integration approval.

## Built locally

Built-in image generation produced a first character with an opaque checkerboard;
maker rejected it for compositing. A background-extraction successor has actual
RGBA alpha (verified with sips and image metadata), 1024×1536:
`assets/chick-flicks/masthead-20260907/becky-masthead-v1.png`, SHA-256
`33e0ce2eeedb5d026757d2670aa490052d73e8fb8b04069086e59c1a1634ecd3`.

Prompt: preserve Becky's brunette bob, adult face, gold hoops, denim jacket and
striped crew-neck tee from the identity scene; draw in the master inked,
hard-faceted graphic-novel style; relaxed waist-up stance with natural hands;
transparent background, no scene, lettering, props or logos. Extraction prompt:
remove the checkerboard only and return actual RGBA transparency.

Local HTML/CSS integrates the keeper with live title, warm site-token comic
field and compact room strip. Source contract: 12 checks passed. Existing
browser interaction checks passed at 1440/390/320: eight tapes, three inactive
future tapes, all images loaded, dialogs 01–04, Read/Listen/Watch routes,
Escape/focus return, direct hash, no overflow or script errors. Measured masthead
194px desktop / 158px phone. Top viewport renders inspected by maker at
`/private/tmp/becky-masthead-{1440,390,320}.png`.

Independent Sol/Medium pixel review found no blocking defect: recognizable
Becky, adult inked/faceted style, coherent anatomy, clean composited silhouette,
and no portrait/title clipping at 1440/390/320. Slightly more polished than the
master; 320px is the practical minimum before title/navigation expansion needs
another check. This is a bounded asset/current-render review only.

Status: BUILT LOCALLY, independently checked. Full design admission
and production release not performed; current live page remains unchanged.
