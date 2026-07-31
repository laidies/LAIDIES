# Episode 01 v26 representative-player harness — maker evidence

**Status:** VERIFIED LOCALLY — PLAYER-FUNCTIONAL GATE ONLY / NOT PUBLIC / INDEPENDENT REVIEW REQUIRED

This is a small, isolated local review harness. It does not change `watch.html`, the frozen media or captions, a public route, deployment, release state, or the outstanding human full-title 1× unmuted audible-watch requirement.

## Exact frozen inputs

| Input | SHA-256 | Result |
| --- | --- | --- |
| `assets/video/episode-01-full-v26-source-admitted-review.mp4` | `f5985a39363eb75514766186817d0105beab9fa6695accf40e0972698e1d1351` | MATCH; 627,122,305 bytes |
| `assets/captions/episode-01.vtt` | `191938a9879883d9439c4ff35c319c40c54fec09855c4c72ba66bd7cdcbd9539` | MATCH; 246 ordered cues; final end 1171.420 s |

The harness binds only these declared local paths after JavaScript initialization. With JavaScript disabled, the film remains unbound while the exact identities and explicit boundary remain visible.

## Local checks

- `node test-static.mjs`: **PASS 10/10** — recomputed media/caption hashes and bytes; 246-cue structure; voice-markup stripping; normal-speed keyboard contract; retry/failure behavior; reduced motion and 390px focus/size contract; safe no-JS boundary.
- `node test-browser.mjs`: **PASS 11/11** in local Chromium. Exact source mounted with full 1172.233333-second metadata duration; an external rail displayed sanitized text (`This is Episode One: On Wednesdays We Do AI.`) with no raw `<v …>` markup; user play was unmuted at 1×; player-focused keyboard seek and caption toggle worked; 390×844 did not overflow and exposed a 56.78px control under reduced motion; missing media failed closed with a retry; and JavaScript-disabled loading kept the media source unbound.

Screenshots are `browser-desktop.png` and `browser-mobile-390-reduced.png`. They are evidence, not acceptance.

## Harness artifact hashes

| Artifact | SHA-256 |
| --- | --- |
| `binding.json` | `e7db56402513334b0bec9d484e2001065c8a86a5bc7795f91fd553b4eaa35d83` |
| `index.html` | `61f14da419493aa2a51b45e705567ba57d665b4912e1055d19552d72eb711f3c` |
| `player.css` | `1cfc5e4901607a01c17d80e72b92253269e44ae576f6da5fc01364ce9cd13e66` |
| `player.js` | `e8c1123c2a79cc3c5a040a91bbe4ed34d5c9583c496972341bfb4dd36859257d` |
| `test-static.mjs` | `c7fd1fb5122b4ef40cf8a999b7cdecfd83d25e7f1aacc052088ea4fea0951c34` |
| `test-browser.mjs` | `24fb917a54376c09d51bd6ff039113615cf3c02cc5c6923e9e3bd0325f9f1508` |
| static result | `bbefccbdca5a9177590042353b2867ef285b42919e9eee6e382951ceb08e9ca6` |
| browser result | `27823bc522ed71988d52d6cf87d24bf6c93b425ee8708b9e61ed5894200afeff` |

## Independent review packet

Independently recompute the two frozen input hashes, rerun both harness tests, and inspect actual normal-speed/unmuted playback, external caption sanitization, keyboard control, reduced motion, 390px behavior, retry/failure, and no-JS boundary. Return a reason-coded **PASS/HOLD for this isolated player-functional gate only**.

The independent reviewer must preserve the separate identified human full-title 1× unmuted audible-watch hold. This harness does not admit the film, player, release, deployment, or public availability.
