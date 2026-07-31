# Episode 03 v13 representative-player harness — maker evidence

**Status:** VERIFIED LOCALLY — PLAYER FUNCTIONAL GATE ONLY / NOT PUBLIC / INDEPENDENT REVIEW REQUIRED  
**Scope:** an isolated local review harness. It does not alter `watch.html`, media bytes, any public route, deployment, release state, or the outstanding human full 1× unmuted audible watch.

## Exact frozen inputs

| Input | SHA-256 | Result |
| --- | --- | --- |
| `assets/video/episode-03-full-v13-cue30-law-library-repaired-review.mp4` | `bcea0457b9b985558ace3581e4c18b4601173d8d668db4284c9e7589aca5a56f` | MATCH; 436,491,858 bytes |
| `assets/captions/episode-03.vtt` | `aed14506fe7d399f0a77c391fa1e046746a920d86b65880093b30f0fc83c66be` | MATCH; 211 cues; final end 1046.950 s |

The harness binds only those declared local paths. It contains no `<video src>` in static HTML: JavaScript supplies the declared source only after local harness initialization. With JavaScript disabled, the video remains unbound and the exact identities remain visible.

## Local evidence

| Harness artifact | SHA-256 |
| --- | --- |
| `binding.json` | `3408bccc7629d96d839e82495457037bc513bdf08d4ae02941a4d1c2f0d27d4b` |
| `index.html` | `65e00a4d98d7ced1b2cf750287c407f2f2ab20c3f2330f1636b498a21c9e296e` |
| `player.css` | `1cfc5e4901607a01c17d80e72b92253269e44ae576f6da5fc01364ce9cd13e66` |
| `player.js` | `52caf780f6891c766c4fe8acf0b999c35cc41a132dffea308f6ae0ae9d947a95` |
| deterministic static result | `4296e662c9f49a927448b11694610de903cbab49bfd5cb260dacb4661608188d` |
| actual-browser result | `2332375436cde763a2ddf0f273a84f9e23cbfa4ecc87bc6bd8cdb6e80481cc99` |

`node test-static.mjs` returned **PASS 10/10**. It recomputed both source hashes and verifies the declared byte count, 211 VTT cues, voice-markup stripping, normal-speed control contract, retry/failure boundary, no-JS boundary, responsive focus treatment, and reduced-motion rule.

`node test-browser.mjs` returned **PASS 11/11** in local Chromium against a temporary localhost server. It verified:

- the exact v13 MP4 source mounts and exposes the 1048-second programme duration;
- the external VTT produces a below-picture caption rail without raw `<v …>` markup;
- a user-initiated play is 1× and unmuted;
- keyboard seek and caption toggle work with player focus;
- 390×844 has no horizontal overflow, a 48px-plus control, and active reduced-motion treatment;
- a missing MP4 fails closed with disabled controls and an exact-source retry; and
- a JavaScript-disabled page keeps media unbound and exposes its safe boundary.

Screenshots are `browser-desktop.png` and `browser-mobile-390-reduced.png`; they are evidence, not approval.

## Explicit limits and independent packet

This maker does **not** admit Episode 03 v13, the player, release, deployment, or public availability. The assigned human full-title 1× unmuted audible-watch witness remains unperformed and must not be inferred from this interaction check.

**Independent EMQ reviewer packet:** verify the two frozen input hashes above; independently rerun `test-static.mjs` and `test-browser.mjs`; inspect the harness’s normal playback, sanitized captions, keyboard, reduced motion, 390px, retry/failure, and no-JS boundary; then return a reason-coded **PASS/HOLD for the isolated player-functional gate only**. Preserve the separate human audible-watch hold and do not mutate the MP4, VTT, `watch.html`, public routes, or release state.

## Learning scan

No new qualifying system-level learning item. This applies the existing delivery rule: a full-title visual judgment cannot stand in for real player behavior, and a player-functional pass cannot stand in for a human full 1× unmuted audible watch.
