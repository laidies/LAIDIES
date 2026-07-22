# TRAILER — full-video plan ("Welcome to SUNNYVAiLE") · Ali wants it produced as a full video like the episodes

Narration: `operations/audio/trailer-elevenlabs-v3-tagged.txt` (~967s, host/heroine narrating a town tour).
Existing cue sheet (timestamps + building sequence): `content/episodes/episode-trailer-cues.json`.
Audio: `content/music/trailer-narration.mp3`.

## STYLE = COMIC (Ali, 2026-07-19: "everything should be comic book style for the videos")
The trailer is a VIDEO, so it's **COMIC** — same locked graphic-novel style as the episodes (bold ink,
hard angular grey planes, no dots). This means the **town buildings, the heroine, and the town characters
are all rendered COMIC for the trailer video** (generate FRESH in comic — don't convert the painterly
originals; painpoints #25). NOTE: the buildings' *browsable website pages* stay painterly — only the VIDEO
is comic. The trailer's pitch ("we built a town, not a glowing brain") still lands — it's now a *comic-book
town*. Still weave the heroine through (her SUNNYVAiLE Clueless look) + intro the town characters, all comic.

## Shot backbone (from the cue sheet + narration) — timed
| ~Time | Beat | Image | Have? |
|---|---|---|---|
| 0:00 | "Welcome to ladies… I owe you a tour" | title / `pc-welcome` + **heroine (host) intro** | need heroine |
| 0:06 | "a show about learning AI… like the TV we grew up on" | Chick Flicks storefront | ✅ y2k-v3 |
| 0:43 | "I'm your heroine… a few steps ahead, reporting back" | **heroine at her corner table / walking Main St** | need heroine |
| 1:40 | "So — SUNNYVAiLE… the whole era that raised us" | Welcome-Wagon / town wide + Y2K era montage | ✅ + maybe montage |
| 3:15 | "the town IS the teaching method" | town wide, buildings echoing | ✅ |
| 4:00 | "on Wednesdays we do AI… the town dresses for it" | Main St + Wednesday dressing (anthem/pack/charms) | ✅ + maybe |
| 6:22 | "two types of tours" → **8 stops** (NewsStand→Delta LAi Nu) | each building in walking order | ✅ y2k-v3 (all 8) |
| 12:22 | "the radio — KSVL 99.9" + **DJ SunnyV** | KSVL building + **DJ SunnyV intro** | building ✅ / SunnyV needs shot |
| 13:45 | Post Office / Mall / **Mayor Deb** intro | those buildings + **Deb** | buildings ✅ / Deb has painterly portrait |
| 14:40 | "up on Lantern Hill — the LUMINAiRY (3 wings)" | LUMINAiRY | ✅ |
| 15:07 | "everything lives at ladies.ai… see you next Wednesday" | ladies.ai / dial-up outro | ✅ |
| end | town anthem, "See you next Wednesday in SUNNYVAiLE" | dial-up postcard | ✅ |

## Images the trailer needs — ALL COMIC (generate fresh; painterly originals = composition refs only)
- **Buildings (comic):** all the tour stops — NewsStand, Chick Flicks, Blend & Snap, SUNNYVAiLE High, Mme
  CLAi-O's, Dream Phone booth, FAiRY Godmother house, MAiKEOVER, Bronze AiGE, Delta LAi Nu, KSVL, Post
  Office, Mall, Town Hall, LUMINAiRY, Welcome-Wagon — each rendered COMIC (comp ref the existing y2k-v3
  webp of the same building). Sign text rendered in-gen.
- **Heroine (comic, SUNNYVAiLE look):** host-intro · corner table · walking Main St · on the tour (a few).
- **Town characters (comic):** DJ SunnyV (likeness `assets/pixel-restyle/characters/dj-sunnyv-portrait-pixel-v2.png`),
  Mayor Deb (we have her comic test `ep04-character-test-mayor-deb-comic-…`), FAiRY Godmother (likeness
  `assets/video/sunnyvaile-credits-v1-plates/opening-05-fairy-godmother-rerender-lit-v2.png`), Mme CLAi-O.
- Opening-credits cast card (redo in comic — see INTRO/OUTRO redo).
The "Have?" column above = painterly exists, **comic version still needed**.

## Production
Video = the comic building renders + comic heroine/character shots + motion + transitions, assembled to
`trailer-narration.mp3` (Codex/CapCut). Big batch (~16 buildings + ~7 character/heroine shots) — same
recipe as the Ep4 beats. This is a large generation set; prioritize the 8 Full-Tour stops + heroine intro first.
