#!/usr/bin/env bash
# where.sh [EP]  —  "where are we?", answered in plain English.
#
# Everything below is worked out FRESH, every time, by looking at the actual
# files and running the actual checks. There is no status file to go stale.
# (The one status file this project already had — operations/ops/state.json —
# has "generated": null in it, because nothing kept it honest.)
#
#   bash operations/engine/where.sh 5
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT" || exit 2

# Which episode? If not told, the highest-numbered canon file that exists.
if [ $# -ge 1 ] && [ -n "${1:-}" ]; then
  NN=$(printf "%02d" "$((10#$1))")
else
  NN=$(ls content/episodes/episode-*.canon.md 2>/dev/null \
       | sed -E 's/.*episode-([0-9]+)\.canon\.md/\1/' | sort -n | tail -1)
  NN=${NN:-05}
fi

B="build/ep${NN}"
have() { [ -f "$1" ]; }
E()    { printf '%s\n' "$1"; }

# ── work out the state of every stage, live ─────────────────────────────────
STAGES=(
  "substance|the one-page substance sheet|content/episodes/episode-${NN}.substance.md"
  "canon|the master canon file|content/episodes/episode-${NN}.canon.md"
  "scripts|the narration script and the written article|operations/audio/episode-${NN}-elevenlabs-v3-tagged.txt"
  "audio|the recorded narration|content/music/episode-${NN}-narration.mp3"
  "timing|the timing map every image is placed against|operations/captions/episode-${NN}-timing-map.json"
  "art|the images and their coverage of the episode|content/episodes/episode-${NN}-cues.json"
  "cut|the assembled video|"
  "surfaces|the rest of the week (study pack, quiz, cards, charms, mall, closet)|"
)
GATE_AT=( "canon:G1:the substance sheet" "cut:G2:the art" "surfaces:G3:the cut" )

DONE=(); NEXT=""; NEXT_LABEL=""; NEXT_INPUT=""
for row in "${STAGES[@]}"; do
  id="${row%%|*}"; rest="${row#*|}"; label="${rest%%|*}"; input="${rest##*|}"
  if have "$B/${id}.stamp"; then DONE+=("$label"); continue; fi
  NEXT="$id"; NEXT_LABEL="$label"; NEXT_INPUT="$input"; break
done

# is a human approval the thing standing in the way?
WAITING_G=""; WAITING_FOR=""
for g in "${GATE_AT[@]}"; do
  s="${g%%:*}"; r="${g#*:}"; gid="${r%%:*}"; what="${r##*:}"
  if [ "$NEXT" = "$s" ] && ! have "$B/${gid}.approved"; then
    WAITING_G="$gid"; WAITING_FOR="$what"
  fi
done

TODAY=$(date "+%A %-d %B")

echo
echo "  SUNNYVAiLE · Episode ${NN} · ${TODAY}"
echo "  ──────────────────────────────────────────────────────────"

if [ "${#DONE[@]}" -eq 0 ]; then
  if have "content/issues/issue-${NN}.md" || have "issues/issue-${NN}.html"; then
    echo "  This episode already went out. The engine has simply never been"
    echo "  run on it, so it has no stages ticked off. That is expected."
  else
    echo "  Nothing is finished yet. This episode hasn't started."
  fi
else
  echo "  Finished:"
  for d in "${DONE[@]}"; do echo "    · ${d}"; done
fi
echo

if [ -z "$NEXT" ]; then
  echo "  Every stage is through. The episode is ready to publish."
  echo
  echo "  THE NEXT THING: say the word and it goes live."
  echo
  exit 0
fi

# ── run the checks live so "what's broken" is true right now ────────────────
CHECKFAIL=""
if have "content/episodes/episode-${NN}.canon.md"; then
  bash operations/engine/checks/check-inputs.sh "$NN"      >/dev/null 2>&1 || CHECKFAIL="$CHECKFAIL the-canon-or-script-is-missing-or-a-stub"
  bash operations/engine/checks/check-must-match.sh "$NN"  >/dev/null 2>&1 || CHECKFAIL="$CHECKFAIL the-canon-has-no-signature-lines"
  bash operations/engine/checks/check-prose-voice.sh "$NN" >/dev/null 2>&1 || CHECKFAIL="$CHECKFAIL the-writing-breaks-a-house-rule"
fi

echo "  Not done yet:"
echo "    · ${NEXT_LABEL}"
echo

if [ -n "$WAITING_G" ]; then
  echo "  WAITING ON YOU"
  echo "    Nothing is broken and nothing else can move until you look at"
  echo "    ${WAITING_FOR}. That is the only thing holding the week up."
  case "$WAITING_G" in
    G1) echo "    Read: ${ROOT}/content/episodes/episode-${NN}.substance.md" ;;
    G2) echo "    Look at the flagged frames only — the rest already passed." ;;
    G3) echo "    Watch the cut once. Coverage is already green, so nothing is missing." ;;
  esac
  echo
  echo "  THE NEXT THING: say yes, and I'll record it."
  echo
  exit 0
fi

if [ -n "$NEXT_INPUT" ] && ! have "$NEXT_INPUT"; then
  echo "  BLOCKED"
  echo "    This file doesn't exist yet, and nothing downstream can start:"
  echo "    ${ROOT}/${NEXT_INPUT}"
  echo
  echo "  THE NEXT THING: make that file. Ask me to, and I will."
  echo
  exit 0
fi

if [ -n "$CHECKFAIL" ]; then
  echo "  A CHECK IS RED right now:"
  for c in $CHECKFAIL; do echo "    · $(echo "$c" | tr '-' ' ')"; done
  echo
  echo "  THE NEXT THING: I fix that, then this stage runs. You do nothing."
  echo
  exit 0
fi

echo "  Everything this stage needs is in place and every check is green."
echo
echo "  THE NEXT THING: run the stage. Ask me to, or:"
echo "    cd \"${ROOT}\" && make -f operations/engine/Makefile EP=${NN} ${NEXT}"
echo
