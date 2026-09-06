# Actual CD image replacement

Status: LOCAL PREVIEW / OWNER REVIEW PENDING. Not published.

User rulings: update the awful CD image; no bad CSS graphics anywhere on the site. Both procedural CD treatments are rejected. The bright turquoise/lime player remains the colour candidate, not a newly approved full site theme.

Source JS SHA256: ab0dd58e1344e6390017f7fd9acc96914e3412a5daa89beffae643261ef9baea
Image: `assets/ksvl/player-cd-silver-v1.png`, SHA256 f7c42ed425ebc6fdb9ac6ddd22438b0612fda609181fbd920701db39a169bc46.
Generated using the built-in imagegen tool, copied unaltered from its generated-images output. Transparent PNG,1254px square, about2MB. Full-resolution preview source; optimized web export remains a release step. No people, identity, text, geography or narration dependencies. Intended display44px; decorative alt is empty because now-playing text and controls convey the functional state.

Changes: both deck and no-cover mix fallback now use img elements. Their procedural disc drawing rules and fake jewel reflection are removed. Static deck image intentionally avoids blur from spinning tiny artwork. Other playback code, colour controls and responsive layout retained. Existing named album images are untouched. The remaining rack containers are HTML layout and flip controls, not replacement art.

Maker inspected the full image and actual desktop/390px screenshots `image-cd-desktop.png` and `image-cd-mobile.png`. Actual image decoded at1254px and rendered44px; centre and rim visible, no square backdrop; no mobile horizontal overflow. Resume and pause tested with real track status. Reopened preview restored the saved track/position in paused state. Mix fallback substitution checked in source; full Mix-CD drawer journey was not newly browser-tested. No full-site audit or public-origin verification of this candidate.

Guard: node scripts/check-ksvl-disc-assets.mjs. New candidate succeeds. With /tmp/ksvl-player-live-20260906.js as source, it fails six checks for pseudo-element disc parts, procedural gradients and missing image elements. This enforces the known defect, not subjective image quality. JS syntax and whitespace checks also pass.

Inventory: the shared music code contained the deck disc and mix fallback disc; both corrected. Shared functional controls, transport SVGs, abstract backgrounds and status dots are not automatically bad artwork. Broader site decorative-art audit remains open.

## Final generation prompt

Create ONE finished transparent PNG image asset, square composition: a single genuine late-1990s silver compact disc for a small music player on LAiDIES, a bright playful adult Rewind Era website. Asset type: polished product cutout, not a UI mockup. Show the circular data/read side directly face-on, perfectly circular flat thin disc, physically correct small open centre hole about one eighth of the disc diameter with a visible concentric clear polycarbonate hub. Crisp metallic silver surface, realistic controlled prismatic reflections in electric turquoise, lime, tangerine and violet; retain unmistakable silver material and hard edges. Product photography quality with tactile dimensional rim and subtle fine circular mastering tracks; no synthetic rainbow blob, no glowing orb, no fuzzy gradient-ball appearance, no clipart, no CSS/vector icon style, no cartoon face. The silhouette and hole must read clearly at 44–52 CSS pixels. Disc fills 90% of square image, centred, fully visible. True transparent background including the central hole; no checkerboard drawn into image, no floor, no environment, no rectangular background, no cast shadow outside the disc. No lettering, no logos, no symbols, no extra objects, no people. No motion; static cutout to be used as the actual image in existing player. Save as a PNG with alpha.

Independent Terra/Low review inspected the actual44px desktop/mobile object before the source image. ADMIT_FOR_OWNER_REVIEW, no blockers, bound to both hashes above; explicitly not owner taste approval.
