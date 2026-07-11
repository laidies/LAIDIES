#!/usr/bin/env bash
# PostToolUse ship-check.
# After ANY Edit/Write to a LAiDIES episode surface, this fires check-episode.sh for
# that episode and surfaces any FAILs back to Claude (exit 2). The voice/tells check no
# longer depends on Claude remembering to run it before calling an episode "ready."
# Non-episode edits exit silently. Clean episodes exit silently. Only FAILs speak up.
set -uo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"   # -> Website-homepage/

payload="$(cat)"
fp="$(printf '%s' "$payload" | grep -oE '"file_path"[[:space:]]*:[[:space:]]*"[^"]+"' | head -1 | sed -E 's/.*"([^"]+)"$/\1/')"
[ -z "${fp:-}" ] && exit 0

# Only episode surfaces: episode-NN-*.txt / episode-NN.canon.md / issue-NN.html
case "$fp" in
  *episode-[0-9]*|*issue-[0-9]*) : ;;
  *) exit 0 ;;
esac
n="$(printf '%s' "$fp" | grep -oE '(episode|issue)-[0-9]+' | head -1 | grep -oE '[0-9]+')"
[ -z "${n:-}" ] && exit 0

out="$(cd "$ROOT" && bash operations/check-episode.sh "$n" 2>&1)"; rc=$?
if [ "$rc" -ne 0 ]; then
  {
    echo "⛔ EPISODE $n SHIP-CHECK FAILED — do NOT call this ready to review until it's clean:"
    printf '%s\n' "$out" | grep -E 'FAIL' | sed 's/^/   /'
    echo "   (run: bash operations/check-episode.sh $n)"
  } >&2
  exit 2
fi
exit 0
