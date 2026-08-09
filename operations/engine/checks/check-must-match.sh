#!/usr/bin/env bash
# check-must-match.sh <EP>
#
# The canon file's MUST-MATCH block holds the exact strings that must appear
# verbatim in the script AND the article. It is the only mechanism stopping the
# two surfaces from drifting apart.
#
# check-episode.sh already compares those strings — but if the block is MISSING
# or EMPTY it only prints a WARN and still exits 0. So an episode with no
# MUST-MATCH strings at all sails through the drift check by having nothing to
# check. This promotes that to a FAIL.
#
# ENGINE_ROOT overrides the repo root for testing.
set -uo pipefail

N="${1:?usage: check-must-match.sh <episode number>}"
NN=$(printf "%02d" "$((10#$N))" 2>/dev/null || echo "$N")
ROOT="${ENGINE_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)}"
cd "$ROOT" || exit 2

CANON="content/episodes/episode-${NN}.canon.md"

if [ ! -f "$CANON" ]; then
  echo "    MISSING  canon file: $ROOT/$CANON"
  exit 1
fi

if ! grep -qE '^##[[:space:]]+MUST-MATCH' "$CANON"; then
  echo "    canon has no '## MUST-MATCH' section at all: $ROOT/$CANON"
  echo "    → add the exact signature lines that must appear word-for-word in"
  echo "      both the narration script and the article."
  exit 1
fi

MM=$(awk '/^##[[:space:]]+MUST-MATCH/{f=1;next} /^## /{f=0} f&&/^- /{sub(/^- /,"");print}' "$CANON")
COUNT=$(printf '%s\n' "$MM" | grep -c '[^[:space:]]' || true)

if [ "${COUNT:-0}" -lt 1 ]; then
  echo "    canon has a MUST-MATCH heading but NO strings under it: $ROOT/$CANON"
  echo "    → an empty block means the drift check has nothing to compare, and"
  echo "      an episode with nothing to compare passes by default. Not allowed."
  exit 1
fi

echo "    ok       $COUNT MUST-MATCH string(s) declared in $CANON"
exit 0
