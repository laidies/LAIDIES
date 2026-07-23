#!/usr/bin/env bash
# gate.sh <EP> [--scope episode|site|all]
#
# ONE command that runs every check that exists for an episode and prints ONE
# verdict. Exits non-zero if any BLOCKING check failed.
#
#   bash operations/engine/gate.sh 5
#
# Nothing here is new analysis. It is the wiring for checks that were already
# written and connected to nothing:
#   operations/check-episode.sh        (was: a PostToolUse hook only)
#   scripts/check-episode-cues.js      (was: orphaned)
#   scripts/check-local-links.js       (was: orphaned)
#   scripts/check-inline-js.js         (was: orphaned)
#   scripts/check-town.js              (was: a pre-commit hook that almost never fires)
# plus three new guards in operations/engine/checks/ that close fail-open holes.
#
# DESIGN RULE: a check that finds nothing to read FAILS. It never passes.
set -uo pipefail

N="${1:?usage: gate.sh <episode number>   e.g. bash operations/engine/gate.sh 5}"
shift || true
# DEFAULT = episode. "Is THIS episode ready?" must NOT depend on whether every
# other page on the site is perfect right now — the whole site is edited by
# several windows at once, so a site-wide scan makes the episode verdict flicker
# for reasons that have nothing to do with the episode. Site health is a separate
# question: run it deliberately with --scope site (or --scope all before a deploy).
SCOPE="episode"
while [ $# -gt 0 ]; do
  case "$1" in
    --scope) SCOPE="${2:-all}"; shift 2 ;;
    *) shift ;;
  esac
done

NN=$(printf "%02d" "$((10#$N))" 2>/dev/null || echo "$N")
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT" || exit 2

# One stable place for the full output, so failures don't litter /tmp and you
# always know where to look. Overwritten each run.
mkdir -p "build/ep${NN}" 2>/dev/null || true
LOG="build/ep${NN}/last-gate.log"
: > "$LOG" 2>/dev/null || LOG="$(mktemp -t laidies-gate)"

BLOCKERS=()
WARNS=()
PASSED=0
TOTAL=0

bold=$'\033[1m'; red=$'\033[31m'; grn=$'\033[32m'; yel=$'\033[33m'; off=$'\033[0m'

# run <blocking|advisory> <name> <one-line description> -- <command...>
run() {
  local mode="$1" name="$2" desc="$3"; shift 3
  [ "${1:-}" = "--" ] && shift
  TOTAL=$((TOTAL+1))
  local out rc
  out="$("$@" 2>&1 </dev/null)"; rc=$?
  if [ "$rc" -eq 0 ]; then
    PASSED=$((PASSED+1))
    printf "  ${grn}PASS${off}  %-14s %s\n" "$name" "$desc"
  else
    if [ "$mode" = "blocking" ]; then
      printf "  ${red}FAIL${off}  %-14s %s\n" "$name" "$desc"
      BLOCKERS+=("$name")
    else
      printf "  ${yel}WARN${off}  %-14s %s\n" "$name" "$desc"
      WARNS+=("$name")
    fi
    printf '%s\n' "$out" | sed 's/^/        /' | head -25
  fi
  printf '\n===== %s (exit %s) =====\n%s\n' "$name" "$rc" "$out" >> "$LOG"
}

# check-episode.sh reports failures in its own summary line rather than its exit
# code in some paths, and it prints green ticks when it has no files to read.
# This wrapper refuses both.
structural() {
  local out; out="$(bash operations/check-episode.sh "$NN" 2>&1 </dev/null)"
  if printf '%s' "$out" | grep -q 'unbound variable'; then
    echo "    check-episode.sh found NO surfaces to search for episode ${NN}."
    echo "    Its green ticks below would be meaningless — 'searched nothing,"
    echo "    found nothing' is not a pass. Rejecting the whole run."
    return 1
  fi
  local f
  f=$(printf '%s' "$out" | sed -nE 's/.*result: ([0-9]+) fail.*/\1/p' | tail -1)
  if [ -z "$f" ]; then
    printf '%s\n' "$out" | tail -20
    echo "    check-episode.sh produced no result line — treat as failed."
    return 1
  fi
  if [ "$f" -gt 0 ]; then
    printf '%s\n' "$out" | grep -A2 -E 'FAIL|✗' | head -30
    echo "    → ${f} FAIL(s). Full detail: bash operations/check-episode.sh ${NN}"
    return 1
  fi
  return 0
}

echo
echo "${bold}════════ WEDNESDAY ENGINE · GATE · EPISODE ${NN} ════════${off}"
echo "  repo: $ROOT"
echo

if [ "$SCOPE" = "episode" ] || [ "$SCOPE" = "all" ]; then
  echo "${bold}THIS EPISODE${off}"
  run blocking inputs      "canon + narration script exist and are not stubs" \
      -- bash operations/engine/checks/check-inputs.sh "$NN"
  run blocking must-match  "canon declares the signature lines both surfaces must carry" \
      -- bash operations/engine/checks/check-must-match.sh "$NN"
  run blocking structure   "banned phrases, self-hyping tells, spelling, txt/md sync, MUST-MATCH verbatim" \
      -- structural
  run blocking voice       "no comparison tables, no 'member', no 'course', AI is 'it'" \
      -- bash operations/engine/checks/check-prose-voice.sh "$NN"
  run blocking cues        "this episode's cue sheet: valid order, every image/video file really on disk" \
      -- node scripts/check-episode-cues.js
  echo
fi

if [ "$SCOPE" = "site" ] || [ "$SCOPE" = "all" ]; then
  echo "${bold}THE SITE THIS EPISODE LANDS IN${off}"
  run blocking links       "every local link and asset on every live page resolves" \
      -- node scripts/check-local-links.js
  run blocking inline-js   "every inline script on every live page parses" \
      -- node scripts/check-inline-js.js
  run blocking town        "episode titles, index, rewards and quizzes all agree across surfaces" \
      -- node scripts/check-town.js
  echo
fi

# ── the one verdict ──────────────────────────────────────────────────────────
if [ "${#BLOCKERS[@]}" -eq 0 ]; then
  echo "${bold}${grn}════ VERDICT: PASS ════${off}  ${PASSED}/${TOTAL} checks green"
  if [ "${#WARNS[@]}" -gt 0 ]; then
    echo "  advisory: ${WARNS[*]}"
  fi
  echo
  echo "  ${bold}These checks are mechanical.${off} They prove nothing is BROKEN."
  echo "  They cannot tell you the teaching is any good — that is still the"
  echo "  quality battery (operations/workflows/review-content.mjs) and then Ali."
  echo
  exit 0
fi

echo "${bold}${red}════ VERDICT: FAIL ════${off}  ${#BLOCKERS[@]} blocking check(s) failed: ${BLOCKERS[*]}"
echo "  ${PASSED}/${TOTAL} green."
echo "  Every check's full output: $ROOT/$LOG"
echo
exit 1
