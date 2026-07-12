# Codex brief — Girl Talk card restyle (2026-07-12)

Ali's ruling: the current Girl Talk cards read too gothic for the site now (deep plum velvet
field + ornate gold filigree border). Regenerate all three pieces to match the current
homepage palette. Composition stays; only the field and border change.

Files to replace (same names, same 2:3 portrait ratio):
- `assets/games/girl-talk/card-back.png`
- `assets/games/girl-talk/truth-card-face.png`
- `assets/games/girl-talk/dare-card-face.png`

Shared treatment (all three):
- Field: soft cream-to-blush gradient with a whisper of lavender — light, warm, Y2K-sweet
  (homepage families: cream #fffdfb, blush pink, lavender #cabbe8).
- Border: one clean rounded-rectangle keyline (the site uses 10px-rounded rectangles, no
  ornate filigree, no pointed gothic corners). Thin inner pinstripe is fine; keep it simple.
- Gold: sparingly — lettering and small sparkle accents only, not frames.
- Keep: the illustration register of the patron saint card portraits, the Y2K charms
  (flip phones, butterfly clips, speech bubbles, lipstick, hearts), the sparkles.

Per piece:
- Card back: keep the faceted gem heart (pink half / teal half) and the "GiRL TALK"
  gold lettering. Accent colour: pink #e982ab.
- Truth face: same system, accent teal #3aa8a4.
- Dare face: same system, accent sunset coral #e8875f.

After Ali approves the new set: update the locked visual benchmark entry in
`operations/voice/laidies-canon-index.md` §9 (Girl Talk card faces) to reference the new
treatment, and bump any cache-busted references to these files.

## Addition (2026-07-12 late) — landscape homepage tile
Fourth asset: `assets/games/girl-talk/girl-talk-tile.png`, LANDSCAPE 4:3, for the homepage
activity card (current portrait card-back letterboxed on a colour field reads inconsistent
next to the other full-bleed photo tiles). Same restyled treatment as the new card back —
the card (or a small fanned stack) laid on a styled scene/flat lay that fills the frame
edge-to-edge, field in the cream/blush/lavender family. No letterboxing needed once done.
