# KSVL real-listening controls, failure and rights packet

**Status:** BUILDING LOCALLY — maker packet, independent judgment required
**Trigger:** `REAL_LISTENING_CONTROLS_FAILURE_AND_RIGHTS_SUITE`

## Problem and evidence

Several hard-coded catalogues and player implementations can expose a file as
playable without one rights/provenance admission. The shared player silently
skips errors, attempts cross-page autoplay, has no mute/volume/seek control in
its persistent deck and treats local state/request text too optimistically.
Asset hashes alone do not prove decoding, audible state, rights or learning.

## Intended bounded outcome

One public fail-closed registry, explicit device-local state, truthful request
receipt language and a deterministic/rendered playback state machine covering
principal controls and failures. No audio, art, rights state or public service
is created or changed by implication.

## Work boundaries

- Maker: KSVL source/data/tests/dossier only.
- Independent judge: must not reuse maker conclusions.
- No request submission, private-data access, rights assertion, new media,
  deployment, publication, queue or Git mutation.

## Acceptance evidence

1. Registry schema/source/canon validator and hostile fixtures.
2. Browser test with controlled `HTMLAudioElement` proxy: denial; playing/time
   advance; pause/resume; seek/seek failure; repeat/end/advance; mute/volume;
   missing/corrupt/network/metadata/waiting/stalled; retry; one-audio owner;
   local-state/storage denial; keyboard/focus; reduced-motion; 320/390/1280.
3. Request path test proves unsigned-in device hold only after successful local
   save and signed-in copy is a review receipt only; no real insert.
4. Site-wide inline JS, local links, town and steward checks.
5. Fresh public artifact excludes private steward evidence and preserves the
   exact public registry.

## Release and rollback

This packet may reach `BUILT LOCALLY` or `VERIFIED LOCALLY`; it cannot clear
rights, media craft, Safari, VoiceOver, native zoom, physical listening,
request-service, deployment or public-origin gates. Rollback is the exact
scoped source/data/test set; no external state exists.
