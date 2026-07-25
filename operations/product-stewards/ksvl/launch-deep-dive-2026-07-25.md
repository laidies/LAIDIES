# KSVL Community RAiDIO — launch deep dive

**Status:** REPORT READY — evidence-limited, read-only assessment
**Date:** 2026-07-25
**Scope:** `/radio`, DJ Booth, shared/miniplayer code, current catalogue/rotation, request path, audio metadata/asset evidence, rights/privacy/safety and listening analytics. No audio was played, request submitted, external playlist opened, rights claim made, deploy or public change performed.
**Relationship to AW-003:** MERGE.

## Executive verdict

KSVL has a differentiated LAiDIES job: original music, fictional broadcast texture and lesson-linked memory hooks can make an AI idea retrievable later. The implementation has a substantial local catalogue and player surface, and the EOD artifact hash-matched 83 audio dependencies. The listening product remains **PARTIAL** because the full playback journey—controls, audio failure, device/browser behaviour, metadata truth, source links and request handling—has not been verified as a complete experience.

## New and returning listening journeys

| Journey | Evidence | Technical | Comprehension | Value | Honesty | Experience | Classification |
|---|---|---:|---:|---:|---:|---:|---|
| First radio play | Radio describes a continuous town broadcast; `ksvl-player.js` defines mixes/tracks and audio event handling. | **PARTIAL** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **NOT TESTED** | **FIX BEFORE LAUNCH** real device/browser playback suite |
| Browse/select a mix | Radio and DJ Booth expose mixes, albums/track controls and all-songs routes. | **PARTIAL** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **FIX BEFORE LAUNCH** metadata/source/keyboard/mobile verification |
| Returning listening | Player code stores some state and coordinates one audio source; no account-level listening proof. | **PARTIAL** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **NOT TESTED** | **HIDE/LABEL FOR LAUNCH** device-local only |
| Episode song → lesson | Episode canon/quotables direction defines song hooks and source links. | **PARTIAL** | **PARTIAL** | **PASS — strategy** | **PARTIAL** | **NOT TESTED** | **FIX BEFORE LAUNCH** current rotation/canon/source-link reconciliation |
| Request a song | Radio has validation, signed-out local hold and signed-in database insert code. | **NOT TESTED** | **PARTIAL** | **PARTIAL** | **PARTIAL** | **NOT TESTED** | **FIX BEFORE LAUNCH** controlled service/failure/privacy test |

The reopening matrix records representative public playback as passed but retains all controls, media failures, persistent-player conflicts and mobile as open. That supports **PARTIAL**, not a broadcast clearance.

## Audio, metadata, brand and accessibility

The station's best brand contribution is a real sonic world with a learning job: original episode songs and DJ texture should return a listener to the lesson, not just provide background ambience. The canonical quotables/memory-hooks system requires each promoted lyric/hook to preserve source, context, rights state and a route back to the episode.

The EOD closure confirms 83 KSVL audio dependencies hash-match source/artifact, a strong asset-integrity check. It does not prove decode/playback, loudness, captions/transcripts where applicable, accurate title/artist/episode metadata, rights, accessible controls, safe autoplay behaviour or outbound playlist experience. A player must offer understandable control state, keyboard labels/focus, non-audio route/lesson context and a visible recovery message when media fails.

## Playback, data, privacy and rights

`ksvl-player.js` and DJ Booth use browser `Audio`, `play/pause/ended/timeupdate` handling and a shared one-audio-at-a-time policy. This is implementation evidence, not proof of audible output. `games/dj-booth.html` also exposes Spotify outbound links; external service availability and account/region behaviour are outside the local player.

Every track needs provenance and a rights status before it is treated as a catalogued product. Use original LAiDIES lyrics/music and rights-safe short original hooks by default. Do not market borrowed dialogue/lyrics as downloadable content, omit context that changes teaching meaning, accept raw listener text into analytics, or store listening/request history beyond its disclosed purpose.

## Analytics and listening signals

Plausible is embedded, but no aggregate listening packet or event contract was available. Track only privacy-safe aggregates: play attempt/result, media error category, selected mix, source lesson opened, control/fallback use and later return. Do not log exact listening position by person, raw request/lyric text, browser identity, contact data or sensitive inferred interests. A play click is neither completed listening nor learning success.

## Launch blockers and improvement direction

1. **FIX BEFORE LAUNCH:** test actual audible playback and all principal controls/failure paths across representative devices/browsers.
2. **FIX BEFORE LAUNCH:** create/verify the catalogued track provenance, metadata, rights and episode-source registry.
3. **FIX BEFORE LAUNCH:** reconcile weekly song, liner note and lesson hook against final episode canon before rotation.
4. **HIDE/LABEL FOR LAUNCH:** keep local preference/request state and untested request outcomes bounded; do not promise sync, DJ selection or delivery.
5. **POST-LAUNCH:** optimize one lesson-linked listening route using source retrieval and voluntary return, not autoplay or listening-time maximization.
6. **REVENUE DEFERRED:** earn trust and delivery/rights discipline before optional original objects.

## Evidence limits and next trigger

This deep dive inspected source and release records; it did not play audio, test volume/autoplay/seek, use a mobile or assistive technology, submit a request, inspect a database, confirm rights, validate Spotify, access analytics or test public-origin media failure. It cannot mark playback, metadata, rights, request or retention outcomes as passed.

**Next trigger:** run the SHA-bound real-device playback/metadata/failure suite on the exact public release, then reconcile the listening outcome and rotation status into AW-003.

## Learning scan

No new painpoint entry is created by this documentation-only pass. Reapplied the standing control: asset existence/hash and a UI click do not establish audible, accessible public playback; source/provenance and user-visible failure evidence are separate gates.
