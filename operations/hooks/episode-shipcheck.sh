#!/usr/bin/env bash
# PostToolUse ship-check.
# After ANY Edit/Write to a LAiDIES episode surface, this fires check-episode.sh for
# that episode and surfaces any FAILs back to Claude (exit 2). The voice/tells check no
# longer depends on Claude remembering to run it before calling an episode "ready."
# Non-episode edits exit silently. Clean episodes exit silently. Only FAILs speak up.
set -uo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"   # -> Website-homepage/

payload="$(cat)"
numbers="$(printf '%s' "$payload" | grep -oE '(episode|issue)-[0-9]+' | grep -oE '[0-9]+' | sort -u || true)"
[ -z "${numbers:-}" ] && exit 0

while IFS= read -r n; do
  [ -z "$n" ] && continue
  out="$(cd "$ROOT" && bash operations/check-episode.sh "$n" 2>&1)"; rc=$?
  if [ "$rc" -ne 0 ]; then
    {
      echo "⛔ EPISODE $n SHIP-CHECK FAILED — do NOT call this ready to review until it's clean:"
      printf '%s\n' "$out" | grep -E 'FAIL|no episode surfaces' | sed 's/^/   /' || true
      echo "   (run: bash operations/check-episode.sh $n)"
    } >&2
    exit 2
  fi
  prose="$(cd "$ROOT" && bash operations/engine/checks/check-prose-voice.sh "$n" 2>&1)"; prose_rc=$?
  if [ "$prose_rc" -ne 0 ]; then
    {
      echo "⛔ EPISODE $n PROSE-VOICE CHECK FAILED:"
      printf '%s\n' "$prose" | sed 's/^/   /'
    } >&2
    exit 2
  fi
done <<< "$numbers"
exit 0
