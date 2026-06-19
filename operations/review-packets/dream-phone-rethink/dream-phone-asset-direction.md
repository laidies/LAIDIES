# Dream Phone Asset Direction

Date: 2026-06-19

Status: production asset direction. No assets generated in this pass. Not implementation-ready.

Live Dream Phone files were not edited. No staging, commit, push, or `git add` was performed.

## Asset Needed

Dream Phone needs a purpose-made production object-world asset:

- elevated soft-blush LAiDIES phone,
- hotline desk setting,
- receipt pad,
- caller cards / phone book,
- charm tray,
- optional phone cord motif,
- polished Y2K object-world energy,
- grown-up, not toy-store childish.

This asset is central. It cannot be unresolved during implementation.

## Existing Assets That Can Be Used

Useful as supporting assets after QA:

- `assets/dream-phone-boss-ali.webp` for Founder.
- `assets/dream-phone-founder.jpg` for Boss.
- `assets/deb-80s-portrait-v1.png` for Icon.
- `assets/madame-claio-character-v1.png` for Psychic caller card only.
- `assets/laidy-character-v1.png` for Wishmaker caller card only.
- Current Dream Phone caller portraits if image framing passes QA.
- LAiDIES logo/brand assets.
- Charm assets if they fit the final tray.

## Existing Assets That Should Not Be Used As Dream Phone Object

Do not use:

- `assets/madame-claio-hotline-phone.png`
- `assets/madame-claio-crystal-phone-v2.png`
- `assets/madame-claio-crystal-phone-v3.png`

Reason:

- Those belong to Mme CLAi-O's world and should not be repurposed for Dream Phone.

Rejected as production direction:

- `assets/dream-phone-cordless-crop.png`
- `assets/dream-phone-cordless.png`
- `assets/dream-phone-toy.png`
- `assets/dream-phone-toy-chroma.png`
- CSS-only phone art.

Reason:

- Current review feedback says the phone looked cheap/toy-like or unresolved.
- CSS art is not acceptable as production art.

## Production Requirements

The final phone/object art must:

- feel polished beside Mme CLAi-O / FAiRY GODMOTHER / LAiDY.
- be recognizable as Dream Phone without cloning the original.
- avoid fake brand logos, fake UI, fake text, and unreadable numbers.
- support mobile cropping.
- work as a hero/object-world anchor without blocking first action.
- be usable in both Quick Call and Play The Game.
- leave room for live UI layers: Receipt Pad, active caller, special cards.
- include no important visual text inside the image.

Recommended deliverable types:

1. Desktop object-world image:
   - 1600 x 1100 or similar.
   - Phone desk with pad/cards/charms.
2. Mobile crop:
   - 900 x 1200.
   - Same world, tighter composition.
3. Transparent/isolated phone object:
   - PNG with transparent background.
   - Used where layout needs real DOM around it.
4. Optional texture/background:
   - soft phone-cord pattern or desk surface.

## Production Art Direction

Direction:

> A grown-up LAiDIES hotline desk: soft blush cordless phone, pearl/plum accents, editorial object lighting, receipt pad, caller cards, tiny charm tray, subtle phone cord curve, polished Y2K nostalgia, useful not childish.

Avoid:

- neon nightclub.
- black/purple generic mystic UI.
- plastic toy hot pink.
- fake readable labels.
- fake LAiDIES logos.
- hands with distorted fingers.
- giant phone that consumes the page.
- phone so small it loses object-world presence.

## Future Image Generation Prompt Direction

Use later with ImageGen or an approved asset workflow:

```text
Create a polished editorial object-world image for a LAiDIES interactive web activity called Dream Phone. Scene: a soft blush cordless hotline phone on a pearl desk, plum and rose accents, subtle gold highlights, a receipt pad, small stacked caller cards, a tiny charm tray, and a gentle phone-cord motif. Mood: grown-up Y2K nostalgia, magical girls' night desk, premium magazine object photography, soft glow, tactile, warm, useful, not childish. No readable text, no logos, no brand names, no numbers, no hands, no people. Leave visual breathing room for web UI overlays.
```

Negative prompt / risks:

```text
Avoid toy-store plastic, harsh neon, black nightclub lighting, fake UI screens, fake logos, fake phone numbers, distorted keypad text, illegible labels, childish board-game styling, cropped objects, cluttered desk, hands, people, or any resemblance to Mme CLAi-O's crystal phone scene.
```

## Caller Image Requirements

Caller cards need:

- no head cropping,
- consistent crop framing,
- readable small card version,
- alternate compact row version,
- alt text per caller,
- no giant portrait-only layout,
- no tiny useless avatar layout.

Recommended UI treatment:

- compact collectible mini-card,
- image area 64-96px tall on mobile,
- role/category line,
- caller name,
- call button or full-card button,
- full directory row alternative.

## Asset Gate

Dream Phone cannot pass `PASS FOR IMPLEMENTATION` until:

- final phone/object asset is approved,
- mobile crop is approved,
- caller image framing is QA'd,
- any generated image is checked for fake text/logos/artifacts,
- asset file names and usage are explicit.
