# Maker evidence — KSVL Wave 3 complete-station candidate

**Evidence time:** 2026-07-27 America/Vancouver  
**Status:** `BUILT LOCALLY — INDEPENDENT REVIEW REQUIRED`

## Literal visitor-usable output

The isolated candidate is:

`operations/design-explorations/building-wave-3/ksvl/index.html`

It provides:

- explicit-action local playback for all 29 governed KSVL tracks;
- previous, next, stop, seek, volume, mute and retry controls;
- six registry-derived mixes and ten band shelves;
- exact source handbacks where the registry supplies a source route;
- 18 governed stickers, with 13 local declaration stickers selectable and five
  achievement stickers truthfully held;
- a signed-out, device-only request draft with validation, edit, reload and
  delete behavior;
- a strict six-hour, registry-bound, paused-only return record;
- recoverable malformed-catalogue, media-failure, storage-denied, stale-state
  and corrupt-state fixtures;
- script-disabled fallbacks that preserve station and site destinations without
  leaving dead controls active.

No public or shared KSVL route was changed.

## Frozen maker tuple

- HTML `890820b3bf531376812ec405595337d449421034a80a426e3d022a31883dbd40`
- CSS `5760d34ddf1a417514d1fd6b23ada2ccc400c41d821ee838200d7ffbdbe8f208`
- controller `87a87b1652990031ce8cd35f73177fc4448e526c5ea06ac2034fda91f4b268ea`
- deterministic candidate test `cfa9e00f398c25a0083343695e3066357d010f633d86df49dc1068ce551a334f`
- booth artwork `7dc6778f73c6391f286f2aa63cbd6dc9067af764c1015d0a892ee0ecb3bd3155`
- sticker banner `2f219b7a197a261fce08f36f9d70425ff5262b3d2c5e892c59b069a7ffd65833`
- governed track registry `68c128827d87971879cb6d67b48b2b5bb139a7e588e63c236e586957e6fa5a65`

## Maker checks

Deterministic checks pass:

- `node --check .../ksvl-candidate.js`
- `node .../test-candidate.mjs`
- `node scripts/validate-ksvl-catalogue.mjs`
- scoped `git diff --check`

Literal outputs:

`KSVL WAVE 3 CANDIDATE PASS tracks=29 mixes=6 bands=10 stickers=18 local-return=paused request=draft-only provider=held responsive=320,390,1440`

`KSVL CATALOGUE CONTRACT PASS tracks=29 playable=29`

Real browser checks established:

- 29 governed tracks, six mixes, ten bands and 18 stickers load with zero
  broken images;
- the hero action plays
  `/content/music/sunnyvaile-town-anthem.mp3`; after 1.37 seconds the audio was
  unmuted, still playing, at readiness state 4;
- Episode 04 playback and its exact Issue 04 handback work;
- a paused track survives reload with its exact registry identity and time;
- the three-sticker limit, save/reload/clear journey and truthful device-only
  message work;
- invalid request drafts focus the first invalid field; a valid draft survives
  reload and can be deleted;
- malformed catalogue, denied storage, stale/corrupt state and simulated media
  failure remain explicit and recoverable;
- the media error cannot be overwritten by a later pause event;
- true 320, 390 and 1440 viewport emulation has no horizontal overflow and
  retains at least 44px visible controls;
- reduced motion suppresses decorative animation;
- skip-link activation focuses `MAIN#station`;
- with scripts disabled, no JS-only button or form field remains enabled while
  the four station tickets and three site handbacks remain available.

## Authority ceiling and held claims

This candidate does **not** claim or implement:

- authenticated provider request delivery;
- Closet propagation;
- listening achievements or rewards;
- external playlist creation;
- shared player or DJ Booth integration;
- production route integration, deployment or public release.

Native Safari/VoiceOver, human product/Brand judgment, production-route
integration, public-origin parity and release authority remain separate.

## Independent acceptance request

An independent judge must recompute the frozen tuple and test:

1. actual 29-track playback plus seek, volume, mute, retry and keyboard use;
2. all six mix and ten band derivations against the exact registry;
3. paused-return, sticker and request-draft lifecycle including stale/corrupt
   and storage-denied states;
4. 1440/390/320 containment, reduced motion, skip-link/focus behavior and
   script-disabled fallbacks;
5. authority truth and the absence of account, provider, reward, Closet,
   integration or public claims.

The maker must not judge its own tuple.
