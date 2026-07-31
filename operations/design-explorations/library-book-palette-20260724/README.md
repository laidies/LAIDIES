# LIBRAiRY book palette exploration

**Date:** 2026-07-24  
**Status:** THREE COMPLETE BOOK-FAMILY PROOFS — OWNER REVIEW REQUIRED  
**Scope:** colour and series-system direction only; no live book assets replaced

## Diagnosis

The current project-owned covers use a faded mid-century educational palette:
powder blue, rust, mustard, burgundy, dark green and aged cream. That is why the
books pull the LIBRAiRY away from the brighter adult 1990s comic direction even
when the room improves.

## Proof set

`vocab-101-palette-proof-v1.png` tests one controlled system on the real Vocab
101 design:

- electric cobalt as the dominant field;
- raspberry/hot pink as the primary warm accent;
- vivid cyan and rich violet as secondary accents;
- warm off-white for illustration and title legibility;
- midnight for outlines and the LIBRAiRY band; and
- the original worn hardcover texture and 3D geometry.

The proof preserves the title, illustration and book structure, but its
generated checkerboard is baked into an RGB image. It is therefore a **palette
proof only**, not a production replacement.

Ali approved the Vocab colour direction and clarified that the first three
cover designs were preferable. The only problem was that the original dark
purple Concepts field looked too similar to the adjacent blue Vocab field.
Production-alpha owner-review candidates now preserve that design system:

- `production-candidates/textbook-vocab-101-v2.png` — cobalt-dominant, with
  cyan, raspberry and violet accents;
- `production-candidates/textbook-concepts-101-v3.png` — the original Concepts
  design with only its dark blue-purple field shifted to a brighter, clearly
  royal violet; and
- `production-candidates/textbook-briefing-101-first-v1.png` — the original
  raspberry/pink Briefing design;
- `production-candidates/textbook-setup-101-v2.png` — turquoise body; and
- `production-candidates/textbook-accounts-101-v2.png` — coral body.

All five preserve the preferred original shared geometry, off-white
illustration panel and 101-series typography. Their locked family marker is the
same top sequence: cyan diagonal wedge, hot-pink upper field, electric-cobalt
band and narrow royal-violet edge. Only the large body field changes: blue,
royal violet, raspberry, turquoise and coral.

The wider redesign experiments remain preserved but are superseded. Ali's
comment that the earlier books “looked the same” referred specifically to
insufficient hue separation between the blue and purple neighbours, not to the
shared cover construction.

`three-cover-preferred-proof-v3.png` places the corrected preferred candidates
on one neutral review surface in shelf order: Vocab, Concepts, Briefing. This
is the current owner-review comparison.

`three-cover-system-proof-v2.png` is superseded evidence of the misread wider
redesign direction. It must not be used for approval or downstream production.

`101-family-proof.png` is the current five-cover side-by-side owner proof.
`101-family-proof.html` is its locally rendered source.

## Complete family system

The full candidate set now contains three related but distinguishable
families:

### The 101s — five covers

The fixed family marker is the cyan diagonal wedge, hot-pink upper field,
electric-cobalt band, narrow royal-violet edge and midnight base. The body
field changes by title:

- Vocab — cobalt;
- Concepts — royal violet;
- Briefing — raspberry;
- Setup — turquoise; and
- Accounts — coral.

### The Tools — six covers

The fixed family marker is a warm off-white title/illustration panel,
violet-and-pink title frame, warm-yellow catalogue tab, hot-pink title
underline, pink/cyan/yellow lower stripes and midnight base. The body field
changes by title:

- Who's Who in AI — cobalt;
- ChatGPT — turquoise;
- Claude — coral-orange;
- Gemini — royal violet;
- Copilot — raspberry; and
- Perplexity — saffron yellow.

### Reference — four covers

The fixed family marker is a warm off-white title/illustration panel, cyan
reference tab, midnight-and-yellow title frame, hot-pink title underline,
cobalt/violet/cyan lower stripes and midnight base. The body field changes by
title:

- Straight Answers About AI — royal purple;
- How to Check AI's Work — cobalt;
- What Not to Paste — coral red; and
- The Prompt Cookbook — turquoise.

`all-families-proof.png` is the current 15-cover owner-review sheet.
`all-families-proof.html` is its locally rendered source. The proof makes the
rule visible: construction identifies the family; dominant body colour
identifies the individual title.

## Technical verification

- All 15 production candidates are PNGs with real alpha.
- Chroma sources are preserved beside the processed candidates.
- 101 candidate dimensions and SHA-256:
  - Vocab: 1023 × 1537
    — `6e5675686526d31c213ef83253966a4e6e0bba767efe555db46fe0ee6828ee00`
  - Concepts: 1032 × 1523
    — `fd65b76dea6bdcf3a382173d0c27f61d4c52ede2a7c08e3f43912db162df29ee`
  - Briefing: 1023 × 1537
    — `14ca5b9aefb36214439799eaff0af63f866508fda5f2ae7347c31b1a2701094e`
  - Setup: 1024 × 1535
    — `fd17e26790f6ebd8713e6e615ed7d8fd35a51cff345bd9c8fcb87fd8b2ed0721`
  - Accounts: 1024 × 1536
    — `78e6d61954aa464ea1877f4420a995280786be1487aa58eb14a235c9365e35d7`
- Tools candidate dimensions and SHA-256:
  - Who's Who in AI: 1009 × 1559
    — `a9eb187f256101ca62de5fbef61ed6bbfed7ce35798352d60a55b2f873b57f35`
  - ChatGPT: 1011 × 1556
    — `b8db282ab487fbb91c1f4aabd61e828f49b391e0453a62d996b137ad1ce8b908`
  - Claude: 1013 × 1553
    — `1caf70ef72104e1d9237f30924da61831947fb227c7f5c36837df24f00956b3a`
  - Gemini: 1008 × 1561
    — `0044f61bab2cdb28c1b18bb44cb840f27502b029f49993910f2210ea9dcc6612`
  - Copilot: 1011 × 1556
    — `ea06fcd2b036a13651a688669e398ef1f3a0af698a62d13d4ff43c6cd1e183a8`
  - Perplexity: 1013 × 1552
    — `cee0d07fd141ff858d77884b8e3e0010cfecbd03ee2bff5696b4540263b11a8a`
- Reference candidate dimensions and SHA-256:
  - Straight Answers About AI: 996 × 1579
    — `5d31b121ae51445e4b06f3dc18349280f64cda412e6d39896437f59d5543be13`
  - How to Check AI's Work: 997 × 1577
    — `76ac98a5e26b48310ed79e3cd697235ccc0f4c0f630bf49269b039fdcb17fc78`
  - What Not to Paste: 1013 × 1553
    — `9f6416147ba6ef548e0bd4d185e3fa9667b2e4cfc6a98e91e7ea2f6928947232`
  - The Prompt Cookbook: 1011 × 1555
    — `b6c140ca64a78c7cf98bb4ee493a29c21d362f6289f510aa4a959ed2186d9ab9`
- Candidates that differ from the live 1024 × 1536 101 canvas must be
  normalized non-destructively after owner approval and before replacement.
  The side-by-side proof uses `object-fit: contain`, so these small canvas
  differences do not affect the palette ruling.
- Combined proof: 1280 × 1944, SHA-256
  `7c11c8349433e3ef09e47dea168c8488708c2367cd18c04b623d8fa69e074f96`.
- Pixel QA confirmed all 15 candidates have an alpha channel, four fully
  transparent corner pixels and zero opaque key-green pixels. Browser review
  of the combined proof found no broken cover images, collapsed transparent
  edges or illegible front-cover titles. Copilot's first low-contrast title
  attempt was rejected and replaced before this proof.

## Gate

Do not replace live assets until Ali rules on the combined 15-cover proof.
All three candidate families are complete. After approval, normalize each
approved image to its corresponding live asset's exact canvas, back up the
current live files, replace only the approved covers and test them in the
actual shelf composition at desktop and mobile sizes. Rejected and superseded
attempts remain evidence and must not be promoted downstream.
