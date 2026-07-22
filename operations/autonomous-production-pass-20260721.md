# Autonomous production pass — 2026-07-21

This is the handoff for the unattended all-episodes / all-webpages pass.

## Production rules locked during this pass

- A scene may use many images. The limit is **1–2 fully animated shots per scene**, not 1–2 images.
- Remaining shots stay still or use small source-native motion such as blinking lights, screen glow, smoke, rain, or a very slow camera settle.
- Do not turn every still into a five-second animation.
- Transitions carry the continuity: use clean 0.4–0.7 second crossfades, motivated cuts, match cuts, or a dip to black only for a real time/place jump.
- Do not use face morphs or novelty transitions.
- No approved original was overwritten, moved, or deleted in this pass.

The shared rules were updated in:

- `operations/codex-prompts/episode-animation-spec.md`
- `operations/codex-prompts/episode-pixel-motion-style-locked.md`

## Website work completed

### Screening room

`watch.html` now renders image-bearing `strip`, `emph`, and `timejump` cues instead of leaving them blank. Image-only title cues also render. Scene changes now use a polished eased crossfade with a small scale/saturation settle and a reduced-motion fallback.

### Extra Credit / Fun Pack

`games/fun-pack.html` had a JavaScript syntax error that stopped episode switching. It is fixed. Episode 04 is now present and current. Dream Phone and Girl Talk are linked as available rather than inaccurately parked as future features.

### Quiz fallback

The quiz page has five selectors: Foundation and Episodes 01–04. All five have data. The embedded `site-data.js` fallback is now synchronized with `content/site/quizzes.json`, including the current Episode 02 coffee-order question and the current Fun Pack wording. `scripts/check-town.js` now fails if a quiz selector has no data or the two quiz stores drift apart again.

### Missing Closet art

The first missing-hero fill, `assets/closet/closet-interior-hero-pixel.png`, was rejected on review for pixelation and a brown/non-vibrant treatment. It remains untouched as a superseded draft. The live page now uses `assets/closet/closet-interior-hero-v2-90s-vibrant.png` (1672×941): crisp cinematic 1990s fashion-tech, bright pink/turquoise/yellow/lavender, and normal browser rendering.

### New static QA gates

- `scripts/check-local-links.js` checks local `href`, `src`, `poster`, and `srcset` references across live-facing pages.
- `scripts/check-inline-js.js` parses inline JavaScript across live-facing pages.
- `scripts/check-episode-cues.js` validates cue order, media paths, duplicate assets, cue density, and long holds.
- `scripts/check-town.js` excludes internal underscore pages and now includes quiz selector/data parity.

Current results:

- 101 live-facing pages checked.
- 2,091 local references resolve.
- 303 inline scripts parse.
- Shared `script.js` parses.
- Canon, titles, site index, rewards, and quizzes agree.
- No deployment was attempted.

## Episode 01 — ready for image approval / timing polish

- Expanded the active cue sheet from 36 to 56 main-story cues (72 total cues; 55 media cues).
- Longest measured image hold reduced from about 190 seconds to 71 seconds.
- Wired the latest existing story art in narration order.
- Created two isolated 1920×1080 rerolls in `assets/episodes/ep-01/pixel/delivery-20260721-autonomous-rerolls/`:
  - `ep01-new-hire-comic-v5-fix.png`
  - `ep01-next-week-comic-v5-fix.png`
- The new-hire frame now shows the heroine managing an eager assistant in the Y2K workroom; it is not a café/barista or paper-handoff scene.
- The next-week frame is a comic burst for Episode Two with David, the heroine, and the iBook; no ribbon/scroll treatment.

## Episode 02 — active cue sheet already healthy

- 42 total cues; 31 media cues; longest measured hold 60 seconds.
- 53 comic assets exist, but no explicit approved-image manifest was found. Existing active choices were preserved rather than guessing.
- Script/article/canon lint has zero failures.

## Episode 03 — sequence substantially completed

- Expanded the cue sheet from 9 main visuals to 49 main-story cues (64 total; 62 media cues).
- Longest measured hold reduced from 150 seconds to 62.6 seconds.
- Existing final comic assets are now arranged in narration order: opening, cold open, NewsStand, Burn Book, Bethany, wrong room, Elle/Chutney, draft-claim-receipt, verification, cocktail, try-on, sign-off, and next week.
- Cue times are proportional estimates. Final human timing pass remains available at `/watch.html?ep=03&tune=1`.
- Fixed the canon MUST-MATCH checker so intentional capitalization differences such as `SHE DOESN'T EVEN GO HERE!` do not create false drift.
- One narration lint failure remains in the already-recorded wording `here's the twist`. The audio/script was not silently rewritten because that would desynchronize the recording.

## Episode 04 — active review corrections applied

The cue sheet has 53 media cues, not 23.

The active sequence now obeys the review decisions:

- **Ada:** uses `ep04-scene-03-ada-comic-v4-timnit-style-lock-black-gloves-1920.png`; black gloves and approved likeness.
- **Hedy:** uses the approved Hedy frame plus b-mid. The byte-identical c-end is not wired.
- **ENIAC:** the seven-woman `ep04-scene-04b-eniac-a-start-comic-v1-locked-1920.png` is rejected and not wired. The active hero is the six-woman v4 frame.
- **Grace application:** the uniformed application frame is rejected and not wired. The sequence uses the existing civilian application handoff and photo-free review frames, followed by the later Grace beats.
- **Lights up:** start-dim at 1003.68 seconds and end-blazing at 1040 seconds now form a real two-still progression.

All Episode 04 cue media resolves. Longest measured hold is 73.8 seconds.

## Episode 05 — obsolete concept corrected; production seeded

The stale town-tour concept was replaced with **The Super Models** across the episode metadata, unrecorded narration, and draft article.

- The analogy is now AI models as major 1990s-style supermodels.
- Visual direction is women only on a high-tech runway. No Nova, Prism, Orbit, or unexplained men.
- Corrected the factual explanation of Microsoft 365 Copilot: it can provide Microsoft-operated, OpenAI, and Anthropic model experiences depending on product surface, settings, region, and routing. It is not described as a company that designs nothing itself.
- The unrecorded narration now passes banned-phrase, self-hype, spelling, stale-term, and MUST-MATCH checks.
- Added `content/issues/issue-05.md` as the pre-publication article draft.
- Kept Episode 05 marked draft/not-built; no unfinished public issue page was exposed.
- Generated a reviewed 1920×1080 hero at `assets/episodes/ep-05/comic/delivery-20260721-production-seeds/ep05-supermodels-tech-runway-hero.png`.
- Added a 33-shot production plan at `operations/codex-prompts/ep05-visual-storyboard-v1.md`, including the 1–2-full-animations-per-scene budget and transition plan.

Remaining blockers are real production dependencies:

1. Record/approve narration.
2. Recheck moving product facts immediately before recording/publication.
3. Generate and review the numbered storyboard stills.
4. Build/tune the cue sheet after the final narration duration exists.

## Episode 06 — intentionally not invented

Only a drafting-stage canon exists. There is no locked script, narration, article, cue sheet, or approved art direction. No production assets were invented while the founder was away.

## Trailer — valid but needs editorial approval

All 33 cue media paths resolve. Three long holds remain (about 83–89 seconds). Several review exports and a newer v16 exist, but no explicit approval was found, so they were not silently promoted or used to overwrite active choices.

## Verification commands

Run from `Website-homepage/`:

```sh
node scripts/check-inline-js.js
node scripts/check-local-links.js
node scripts/check-town.js
node scripts/check-episode-cues.js
bash operations/check-episode.sh 1
bash operations/check-episode.sh 2
bash operations/check-episode.sh 3
bash operations/check-episode.sh 4
bash operations/check-episode.sh 5
bash operations/check-episode.sh 6
```

Expected exception: Episode 03 retains one self-hype phrase in already-recorded narration. Episode 06 reports drafting-stage warnings. Trailer cue audit reports three long holds.
