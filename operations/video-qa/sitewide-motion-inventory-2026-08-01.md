# Sitewide motion inventory — 2026-08-01

**Status:** HOLD

This is a deterministic, visitor-surface inventory under the active site-video review contract. It does not admit any media or animation. It identifies what must be classified and reviewed before release. Stored experiments are not treated as live merely because their files exist.

## Coverage

- Sitemap routes: 28
- Visitor candidate pages: 99
- Source files reached through pages and dependencies: 224
- Literal motion references: 5
- Registered literal references: 5
- Unregistered literal references held: 0
- Missing literal motion files: 0
- Dynamic video renderers held: 5
- Runtime animation definitions held for classification: 149
- Semantic/instructional runtime animations: 71

## Release rule

Every unregistered literal motion reference, dynamic video renderer and runtime animation stays **HOLD**. Semantic or instructional motion needs an occurrence-level description, purpose or contemporaneous narration comparison, responsive proof, reduced-motion behavior and independent review. Decorative/UI motion must first be classified and then checked for responsive, accessibility and interaction correctness.

## Unregistered or missing literal motion

- None.

## Dynamic video renderers

- `learn/class.html:1360` — return '<video controls playsinline preload="metadata"' +
- `preview-homepage.html:829` — <video autoplay muted playsinline preload="auto"
- `watch.html:550` — var v = document.createElement('video');
- `watch.html:624` — el.innerHTML = '<video class="scene-img" src="' + esc(c.src) + '" muted autoplay loop playsinline></video>';
- `watch.pre-mp4.html:285` — el.innerHTML = '<video class="scene-img" src="' + esc(c.src) + '" muted autoplay loop playsinline></video>';

## Runtime motion by source

- `bookfair.html`: 1 (bfshake)
- `bronze-aige.html`: 1 (bzGlow)
- `chick-flicks.html`: 2 (animation_frame_loop-361, animation_frame_loop-574)
- `community.html`: 2 (holoShift, chromeShift)
- `community/.versions/laidy-spotlight_clubhouse-era.html`: 2 (cardJiggle, cardJiggle)
- `content/fairy-godmother-v2.css`: 1 (fgReveal)
- `content/grimoire.css`: 3 (gr-twinkle, gr-fade, gr-glitter-float)
- `content/luminairy-v2.css`: 1 (lum-chamber-arrive)
- `content/madame-claio-v2.css`: 1 (claioReveal)
- `content/site/bronze-aige-v2.js`: 1 (timed_media_swap-367)
- `content/site/charm-hunt.js`: 3 (charm-sparkle-glint, charm-hunt-confetti, animation_frame_loop-261)
- `content/site/ksvl-player.js`: 4 (ksvl-spin, ksvl-np-onair, animation_frame_loop-487, ksvlNudgePulse)
- `content/site/laidies-bg.css`: 3 (laidies-bg-twinkle, laidies-bg-rise, laidies-bg-shine)
- `content/site/mini-player.css`: 1 (mp-scroll-title)
- `content/site/sunnyvaile-directory.js`: 2 (sv-preview-fade, sv-preview-pop)
- `content/site/sv-global-header.js`: 3 (svgh-pulse, animation_frame_loop-300, animation_frame_loop-302)
- `content/site/sv-topbar.css`: 1 (sv-topbar-pulse)
- `content/site/sv-topbar.js`: 2 (animation_frame_loop-54, animation_frame_loop-57)
- `content/site/sv-you-are-here.js`: 1 (svYahPulse)
- `games/.versions/businesswomens-special_001.html`: 5 (fortuneFold, shuffleSpin, fortuneCount, shuffleFlicker, badgePop)
- `games/.versions/businesswomens-special_002-clubhouse-era.html`: 5 (fortuneFold, shuffleSpin, fortuneCount, shuffleFlicker, badgePop)
- `games/businesswomens-special.html`: 3 (timed_media_swap-323, timed_media_swap-329, timed_media_swap-331)
- `games/dj-booth.html`: 2 (spin, eqBounce)
- `games/dream-phone-game.html`: 1 (rise)
- `games/dream-phone.html`: 7 (pulse-glow, dp-badge-in, dp-medal-pop, dp-medal-glow, dp-badge-shimmer, dp-tray-pulse, animation_frame_loop-908)
- `games/fairy-godmother.html`: 7 (glitterFloat, glowPulse, gentleFloat, sparkleAnim, wandTrailAnim, wandWiggle, scrollReveal)
- `games/girl-talk.html`: 3 (rewardPop, stickerSettle, animation_frame_loop-1128)
- `games/madame-claio.html`: 14 (counterPulse, crystalGlow, crystalFloat, sparkleRotate, sparkleFloat, buttonPulse, buttonShine, dotPulse, dotsAnim, starsFloat, cardReveal, fadeIn, flourishIn, badgeGlow)
- `games/trading-cards.html`: 4 (pulseGlow, slideIn, holoShimmer, foilSweep)
- `index.html`: 6 (blink, onair, animation_frame_loop-792, animation_frame_loop-798, animation_frame_loop-813, animation_frame_loop-815)
- `issues/issue-01-magazine.html`: 1 (miniPlayerSlideUp)
- `issues/issue-03-magazine.html`: 1 (animation_frame_loop-3220)
- `laidies-card.html`: 1 (dashVesselFlash)
- `learn/class.html`: 2 (tvpulse, crton)
- `learn/quiz.html`: 2 (quizSparkle, quizRewardGlow)
- `library.html`: 1 (animation_frame_loop-886)
- `logo-preview.html`: 2 (animation_frame_loop-97, animation_frame_loop-99)
- `luminairy.html`: 3 (wingPanelIn, foundress-holo, mvbio-in)
- `newsstand.html`: 4 (animation_frame_loop-329, animation_frame_loop-373, animation_frame_loop-378, animation_frame_loop-390)
- `preview-homepage.html`: 6 (sv-sweep, sv-flick, sv-drift, sv-idle-glitch, sv-fade-up, sv-block-in)
- `preview-luminairy.html`: 3 (wingPanelIn, foundress-holo, mvbio-in)
- `radio.html`: 2 (ksvl-onair, ksvlPanelIn)
- `script.js`: 3 (animation_frame_loop-3228, animation_frame_loop-3400, animation_frame_loop-3991)
- `styles.css`: 14 (hotlinePulse, aliveCtaPulse, wheelIdle, fortuneCount, djBoothGlow, packWrapperShine, mixCdTilt, tryOnNudge, stickerWiggle, badgeGlow, cardDeckLift, keypadGlow, softPinkPulse, activeSoftPinkPulse)
- `sunnyvaile-high.html`: 1 (shPanelIn)
- `town-hall.html`: 1 (thPanelIn)
- `watch.html`: 5 (panLtr, panRtl, panZoom, trackJitter, animation_frame_loop-679)
- `watch.pre-mp4.html`: 5 (panLtr, panRtl, panZoom, trackJitter, animation_frame_loop-331)
