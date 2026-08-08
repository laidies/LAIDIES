#!/usr/bin/env bash
# check-inputs.sh <EP>  —  the anti-fail-open guard.
#
# WHY THIS EXISTS (measured, 2026-07-22):
#     $ bash operations/check-episode.sh 99      # an episode that does not exist
#     ════ result: 0 fail · 2 warn ════          EXIT 0
# Every grep in that script silently matched nothing because it had no files to
# search, so "nothing found" was reported as "nothing wrong". A green light on
# an empty episode is worse than no light at all.
#
# So: before any other check is allowed to say PASS, this one asserts the
# episode's inputs are actually there and actually have words in them. If they
# are not, the whole gate fails here and the downstream greens are never trusted.
#
# Root can be overridden for testing:  ENGINE_ROOT=/path/to/fixture check-inputs.sh 99
set -uo pipefail

N="${1:?usage: check-inputs.sh <episode number>}"
NN=$(printf "%02d" "$((10#$N))" 2>/dev/null || echo "$N")
ROOT="${ENGINE_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)}"
cd "$ROOT" || exit 2

CANON="content/episodes/episode-${NN}.canon.md"
SCRIPT="operations/audio/episode-${NN}-elevenlabs-v3-tagged.txt"

MIN_CANON_WORDS=200      # a real canon file is 1,000+; 200 catches a stub
MIN_SCRIPT_WORDS=300     # a real narration script is 1,400+

fails=0
note() { echo "    $1"; }

for pair in "canon|$CANON|$MIN_CANON_WORDS" "narration script|$SCRIPT|$MIN_SCRIPT_WORDS"; do
  label="${pair%%|*}"; rest="${pair#*|}"; f="${rest%%|*}"; min="${rest##*|}"
  if [ ! -f "$f" ]; then
    note "MISSING  $label: $ROOT/$f"
    fails=$((fails+1)); continue
  fi
  w=$(wc -w < "$f" | tr -d ' ')
  if [ "$w" -lt "$min" ]; then
    note "TOO THIN $label: $ROOT/$f has $w words, needs at least $min"
    note "         (a stub file must never be able to pass a gate)"
    fails=$((fails+1)); continue
  fi
  note "ok       $label: $f ($w words)"
done

if [ "$fails" -gt 0 ]; then
  echo "    → episode ${NN} does not have the inputs a check could even read."
  exit 1
fi
exit 0
