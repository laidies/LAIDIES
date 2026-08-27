# ImageGen prompts — AI Fundamentals reader frame v5

Built-in ImageGen was used. No CLI/API fallback was used.

## Desktop frame

Reference image:

- `/Users/alisoneakin/.codex/generated_images/01a02f80-da71-7c03-9874-ffff309f2e40/exec-6ffbe44e-7d11-4ae4-8884-546946b2a867.png`

Prompt:

> Use case: precise-object-edit. Asset type: responsive desktop digital textbook page background, landscape approximately 7:5. Image 1 is the approved AI Fundamentals 101 page design and is the exact visual authority. Create a clean background-art-only version of this approved landscape composition for a responsive digital book reader. Preserve its sophisticated 1990s LAiDIES pop-art language: warm white paper, soft lavender angular upper-left plane, continuous lavender halftone and speckled left border, restrained lavender and cyan halftone at the upper-right, and a cyan and lavender navy-outlined comic burst entering only from the lower-right edge. Replace the mouth and tongue and cassette with a small number of puffy-sticker-style AI or computer objects at the far margins only: a 1990s desktop computer, floppy disk, cursor, microchip, or small network-node motif. Use the approved deep navy, lavender, cyan and restrained pink accents. The entire frame must be a single, seamless illustration across the full landscape canvas. No horizontal bands, no repeated or stacked strips, no pasted-looking layers, no duplicated burst, no abrupt seams. Keep the central 70 percent of the canvas quiet warm white for live readable content. Decorations must remain at the outer edges and never enter the main reading column or right-side card area. Remove all existing text and UI from the reference: no book title, no 101, no Preface heading, no Contents, no buttons, no cards, no body copy, no labels, no numbers, no letters, no pseudo-text, no watermarks or logos. This is one polished raster background asset only.

Saved project asset:

- `assets/library-reader/ai-fundamentals-frame-imagegen-v5.png`

## Mobile frame

Reference images:

- Initial tall ImageGen frame: `/Users/alisoneakin/.codex/generated_images/01a02f80-da71-7c03-9874-ffff309f2e40/exec-529e9b8b-b939-4815-bd7b-01f93ab702f9.png`
- Approved design: `/Users/alisoneakin/.codex/generated_images/01a02f80-da71-7c03-9874-ffff309f2e40/exec-6ffbe44e-7d11-4ae4-8884-546946b2a867.png`

Prompt:

> Use case: precise-object-edit. Asset type: mobile digital textbook page background, tall phone portrait approximately 9:19. Image 1 is the current tall background to simplify. Image 2 is the approved AI Fundamentals visual authority. Create a single seamless mobile book-page background that preserves the approved warm-white paper, pale lavender and cyan halftone, and refined 1990s LAiDIES pop-art feel. The central reading area must remain completely quiet and warm white across at least 86 percent of the width for live text. Constrain decoration to extremely narrow outer-edge slivers only, no more than about 5 percent of either side. Keep only: a soft lavender diagonal corner at the very top-left, a faint lavender and cyan halftone fade at the very top-right, and one small restrained lavender-cyan comic accent in the bottom-right corner. At most two tiny puffy computer or AI stickers may appear, each almost clipped off the outer edge and never behind the reading column. Remove the large computer, floppy disk, cursor, chips, network nodes, stars, lightning and every mid-page object from Image 1. The background must be one continuous illustration with no bands, repeated strips, stacked pieces, seams, or pasted layers. No text, letters, numbers, headings, labels, buttons, cards, logos, watermarks, pseudo-text, people, mouths, tongues, cassettes, books, or magic imagery. Background artwork only.

Saved project asset:

- `assets/library-reader/ai-fundamentals-frame-mobile-imagegen-v5.png`

## Mobile collision correction

The first mobile frame's lower-right burst entered the protected live-text area because the tall raster remains fixed behind the internally scrolling manuscript. Built-in ImageGen edited the frame rather than recreating the visual in CSS.

Prompt:

> Use case: precise-object-edit. Asset type: mobile continuous book-page perimeter frame. Remove the entire large purple-and-cyan comic burst and its halftone spray from the lower-right corner so it can never enter the live reading area. Reconstruct that lower-right area as the same uninterrupted warm white paper as the surrounding page. Preserve the image dimensions and all pixels except the lower-right burst/halftone removal and seamless warm-white repair. Keep the lavender upper-left diagonal edge and the subtle upper-right halftone exactly as they are. Keep the full centre and the entire lower half quiet, clean warm white with no objects, shapes, borders, stickers, marks, shadows, seams or decoration. No text, logos or new artwork; no visible patch edge, tiling or colour shift.

Saved project asset:

- `assets/library-reader/ai-fundamentals-frame-mobile-imagegen-v6.png`

The same collision pattern existed in the shared mobile frame used by Working with AI 101, Straight Answers About AI and The AI Dictionary. A second ImageGen edit removed its right-side burst and horizontal strip seams while preserving the far-left perimeter artwork.

Saved project asset:

- `assets/library-reader/library-book-page-art-mobile-v4.png`
