# Learning scan — E2 v19 player witness v2

**Result:** qualifying prevention rule recorded in this scoped maker evidence.

The independent v1 verdict demonstrated that a caption control can claim “on”
while the native track remains disabled, and that raw WebVTT voice markup can
reach the reader even after a track loads. The v2 prevention rule is:

`caption UI claim → native TextTrack.mode → exact first VTT request → sanitized rendered cue text`

must be tested as one chain. A track element, a later load event or a source
hash alone is insufficient.

The browser policy blocked the non-public `file://` witness, so the no-network
result is correctly labelled pure-function/static proof. It does not establish
actual media playback, final visual/player behavior, or the required full human
audible witness. The canonical painpoint ledger is intentionally not modified:
the judge's collision boundary limits this repair to new E2-specific evidence.
