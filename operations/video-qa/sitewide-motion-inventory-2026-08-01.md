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
- Runtime animation definitions discovered: 149
- Runtime animation definitions reviewed: 2
- Runtime animation definitions admitted: 2
- Runtime animation definitions still held: 147
- Semantic/instructional runtime animations: 71

## Release rule

Every unregistered literal motion reference and dynamic video renderer stays **HOLD**. A runtime animation can leave HOLD only through an exact source-bound registry review. Semantic or instructional motion needs an occurrence-level description, purpose or contemporaneous narration comparison, responsive proof and reduced-motion behavior. Decorative/UI motion must be classified and checked for responsive, accessibility and interaction correctness. A PASS for interface motion does not admit a separate video asset.

## Unregistered or missing literal motion

- None.

## Dynamic video renderers

- `learn/class.html:1360` — return '<video controls playsinline preload="metadata"' +
- `preview-homepage.html:829` — <video autoplay muted playsinline preload="auto"
- `watch.html:550` — var v = document.createElement('video');
- `watch.html:624` — el.innerHTML = '<video class="scene-img" src="' + esc(c.src) + '" muted autoplay loop playsinline></video>';
- `watch.pre-mp4.html:285` — el.innerHTML = '<video class="scene-img" src="' + esc(c.src) + '" muted autoplay loop playsinline></video>';

## Runtime motion by source

- `bookfair.html`: 1 (bfshake: HOLD)
- `bronze-aige.html`: 1 (bzGlow: HOLD)
- `chick-flicks.html`: 2 (animation_frame_loop-361: HOLD, animation_frame_loop-574: HOLD)
- `community.html`: 2 (holoShift: HOLD, chromeShift: HOLD)
- `community/.versions/laidy-spotlight_clubhouse-era.html`: 2 (cardJiggle: HOLD, cardJiggle: HOLD)
- `content/fairy-godmother-v2.css`: 1 (fgReveal: HOLD)
- `content/grimoire.css`: 3 (gr-twinkle: HOLD, gr-fade: HOLD, gr-glitter-float: HOLD)
- `content/luminairy-v2.css`: 1 (lum-chamber-arrive: HOLD)
- `content/madame-claio-v2.css`: 1 (claioReveal: HOLD)
- `content/site/bronze-aige-v2.js`: 1 (timed_media_swap-367: HOLD)
- `content/site/charm-hunt.js`: 3 (charm-sparkle-glint: HOLD, charm-hunt-confetti: HOLD, animation_frame_loop-261: HOLD)
- `content/site/ksvl-player.js`: 4 (ksvl-spin: HOLD, ksvl-np-onair: HOLD, animation_frame_loop-487: HOLD, ksvlNudgePulse: HOLD)
- `content/site/laidies-bg.css`: 3 (laidies-bg-twinkle: HOLD, laidies-bg-rise: HOLD, laidies-bg-shine: HOLD)
- `content/site/mini-player.css`: 1 (mp-scroll-title: HOLD)
- `content/site/sunnyvaile-directory.js`: 2 (sv-preview-fade: HOLD, sv-preview-pop: HOLD)
- `content/site/sv-global-header.js`: 3 (svgh-pulse: HOLD, animation_frame_loop-300: HOLD, animation_frame_loop-302: HOLD)
- `content/site/sv-topbar.css`: 1 (sv-topbar-pulse: HOLD)
- `content/site/sv-topbar.js`: 2 (animation_frame_loop-54: HOLD, animation_frame_loop-57: HOLD)
- `content/site/sv-you-are-here.js`: 1 (svYahPulse: HOLD)
- `games/.versions/businesswomens-special_001.html`: 5 (fortuneFold: HOLD, shuffleSpin: HOLD, fortuneCount: HOLD, shuffleFlicker: HOLD, badgePop: HOLD)
- `games/.versions/businesswomens-special_002-clubhouse-era.html`: 5 (fortuneFold: HOLD, shuffleSpin: HOLD, fortuneCount: HOLD, shuffleFlicker: HOLD, badgePop: HOLD)
- `games/businesswomens-special.html`: 3 (timed_media_swap-323: HOLD, timed_media_swap-329: HOLD, timed_media_swap-331: HOLD)
- `games/dj-booth.html`: 2 (spin: HOLD, eqBounce: HOLD)
- `games/dream-phone-game.html`: 1 (rise: HOLD)
- `games/dream-phone.html`: 7 (pulse-glow: HOLD, dp-badge-in: HOLD, dp-medal-pop: HOLD, dp-medal-glow: HOLD, dp-badge-shimmer: HOLD, dp-tray-pulse: HOLD, animation_frame_loop-908: HOLD)
- `games/fairy-godmother.html`: 7 (glitterFloat: HOLD, glowPulse: HOLD, gentleFloat: HOLD, sparkleAnim: HOLD, wandTrailAnim: HOLD, wandWiggle: HOLD, scrollReveal: HOLD)
- `games/girl-talk.html`: 3 (rewardPop: HOLD, stickerSettle: HOLD, animation_frame_loop-1128: HOLD)
- `games/madame-claio.html`: 14 (counterPulse: HOLD, crystalGlow: HOLD, crystalFloat: HOLD, sparkleRotate: HOLD, sparkleFloat: HOLD, buttonPulse: HOLD, buttonShine: HOLD, dotPulse: HOLD, dotsAnim: HOLD, starsFloat: HOLD, cardReveal: HOLD, fadeIn: HOLD, flourishIn: HOLD, badgeGlow: HOLD)
- `games/trading-cards.html`: 4 (pulseGlow: HOLD, slideIn: HOLD, holoShimmer: HOLD, foilSweep: HOLD)
- `index.html`: 6 (blink: HOLD, onair: HOLD, animation_frame_loop-792: HOLD, animation_frame_loop-798: HOLD, animation_frame_loop-813: HOLD, animation_frame_loop-815: HOLD)
- `issues/issue-01-magazine.html`: 1 (miniPlayerSlideUp: HOLD)
- `issues/issue-03-magazine.html`: 1 (animation_frame_loop-3220: HOLD)
- `laidies-card.html`: 1 (dashVesselFlash: HOLD)
- `learn/class.html`: 2 (tvpulse: PASS, crton: PASS)
- `learn/quiz.html`: 2 (quizSparkle: HOLD, quizRewardGlow: HOLD)
- `library.html`: 1 (animation_frame_loop-886: HOLD)
- `logo-preview.html`: 2 (animation_frame_loop-97: HOLD, animation_frame_loop-99: HOLD)
- `luminairy.html`: 3 (wingPanelIn: HOLD, foundress-holo: HOLD, mvbio-in: HOLD)
- `newsstand.html`: 4 (animation_frame_loop-329: HOLD, animation_frame_loop-373: HOLD, animation_frame_loop-378: HOLD, animation_frame_loop-390: HOLD)
- `preview-homepage.html`: 6 (sv-sweep: HOLD, sv-flick: HOLD, sv-drift: HOLD, sv-idle-glitch: HOLD, sv-fade-up: HOLD, sv-block-in: HOLD)
- `preview-luminairy.html`: 3 (wingPanelIn: HOLD, foundress-holo: HOLD, mvbio-in: HOLD)
- `radio.html`: 2 (ksvl-onair: HOLD, ksvlPanelIn: HOLD)
- `script.js`: 3 (animation_frame_loop-3228: HOLD, animation_frame_loop-3400: HOLD, animation_frame_loop-3991: HOLD)
- `styles.css`: 14 (hotlinePulse: HOLD, aliveCtaPulse: HOLD, wheelIdle: HOLD, fortuneCount: HOLD, djBoothGlow: HOLD, packWrapperShine: HOLD, mixCdTilt: HOLD, tryOnNudge: HOLD, stickerWiggle: HOLD, badgeGlow: HOLD, cardDeckLift: HOLD, keypadGlow: HOLD, softPinkPulse: HOLD, activeSoftPinkPulse: HOLD)
- `sunnyvaile-high.html`: 1 (shPanelIn: HOLD)
- `town-hall.html`: 1 (thPanelIn: HOLD)
- `watch.html`: 5 (panLtr: HOLD, panRtl: HOLD, panZoom: HOLD, trackJitter: HOLD, animation_frame_loop-679: HOLD)
- `watch.pre-mp4.html`: 5 (panLtr: HOLD, panRtl: HOLD, panZoom: HOLD, trackJitter: HOLD, animation_frame_loop-331: HOLD)
