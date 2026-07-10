#!/usr/bin/env bash
# check-episode.sh N  —  pre-ship linter for a LAiDIES episode.
# Greps every surface (script .txt + .md, article, canon) for the error
# classes that keep recurring, so they're caught before anything ships.
#   FAIL = must fix before recording/publishing.  WARN = look, probably fix.
# Usage:  bash operations/check-episode.sh 2
set -uo pipefail

N="${1:?usage: check-episode.sh <episode number, e.g. 2>}"
NN=$(printf "%02d" "$N" 2>/dev/null || echo "$N")

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"   # -> Website-homepage/
cd "$ROOT" || exit 2

TXT="operations/audio/episode-${NN}-elevenlabs-v3-tagged.txt"
MD="operations/audio/episode-${NN}-script.md"
CANON="content/episodes/episode-${NN}.canon.md"
ART=""
[ -f "issues/issue-${NN}.html" ] && ART="issues/issue-${NN}.html"
[ -z "$ART" ] && [ -f "content/issues/issue-${NN}.md" ] && ART="content/issues/issue-${NN}.md"

SURFACES=(); for f in "$TXT" "$MD" "$ART" "$CANON"; do [ -n "$f" ] && [ -f "$f" ] && SURFACES+=("$f"); done

FAIL=0; WARN=0
red(){ printf "  \033[31m✗ FAIL\033[0m  %s\n" "$1"; FAIL=$((FAIL+1)); }
yel(){ printf "  \033[33m⚠ WARN\033[0m  %s\n" "$1"; WARN=$((WARN+1)); }
grn(){ printf "  \033[32m✓\033[0m       %s\n" "$1"; }

echo "════ check-episode ${NN} ════"
printf "  script .txt : %s\n" "$([ -f "$TXT" ] && echo "$TXT" || echo '‹missing›')"
printf "  script .md  : %s\n" "$([ -f "$MD" ] && echo "$MD" || echo '‹missing›')"
printf "  article     : %s\n" "${ART:-‹missing›}"
printf "  canon       : %s\n" "$([ -f "$CANON" ] && echo "$CANON" || echo '‹missing›')"
echo

# 1 · BANNED phrases (slop / false-exclusivity) — FAIL
echo "· banned phrases"
BANNED=( "move nobody makes" "secret nobody says" "nobody says out loud" "thing nobody tells you" \
         "in today's fast-paced world" "AI can be a powerful tool" "whether you're a beginner or an expert" )
hit=0
for b in "${BANNED[@]}"; do
  m=$(grep -niF "$b" "${SURFACES[@]}" 2>/dev/null)
  [ -n "$m" ] && { red "banned: \"$b\""; echo "$m" | sed 's/^/          /'; hit=1; }
done
[ "$hit" = 0 ] && grn "none found"
echo

# 2 · SPELLING — FAIL (double-Y is the recurring one)
echo "· spelling"
m=$(grep -niE "SUNNYYV" "${SURFACES[@]}" 2>/dev/null)
[ -n "$m" ] && { red "double-Y 'SUNNYYVAiLE'"; echo "$m" | sed 's/^/          /'; } || grn "no double-Y SUNNYVAiLE"
echo

# 3 · STALE terms (retired eras) — WARN
echo "· stale terms"
STALE=( "SANCTUAiRY" "Cathedral Hill" "DJ JAiDY" "104.7" "this-week.html" "Grimoire" )
hit=0
for s in "${STALE[@]}"; do
  m=$(grep -niF "$s" "${SURFACES[@]}" 2>/dev/null)
  [ -n "$m" ] && { yel "stale: \"$s\" (confirm it's intentional)"; echo "$m" | sed 's/^/          /' | head -3; hit=1; }
done
[ "$hit" = 0 ] && grn "none found"
echo

# 4 · script .txt ↔ .md in sync — WARN
echo "· .txt ↔ .md sync"
if [ -f "$TXT" ] && [ -f "$MD" ]; then
  norm(){ sed -E 's/^#+ .*$//; s/^>.*$//; s/^---+.*$//; s/^=== .*===$//; s/\[tv announcer\]//g' "$1" | tr -s ' \t\n' ' '; }
  [ "$(norm "$TXT")" = "$(norm "$MD")" ] && grn "content identical (ignoring headers/voice markers)" \
    || yel ".txt and .md prose differ — reconcile before recording"
else
  yel "one audio file missing — can't compare"
fi
echo

# 5 · canon MUST-MATCH strings present verbatim in script + article — FAIL
echo "· canon MUST-MATCH → present in script + article"
if [ -f "$CANON" ]; then
  MM=$(awk '/^##[[:space:]]+MUST-MATCH/{f=1;next} /^##/{f=0} f&&/^- /{sub(/^- /,"");print}' "$CANON")
  if [ -z "$MM" ]; then
    yel "no '## MUST-MATCH' block in canon — add the exact prompt/quote strings so drift gets caught"
  else
    ARTTXT=""; [ -n "$ART" ] && ARTTXT=$(sed 's/<[^>]*>//g' "$ART")
    while IFS= read -r line; do
      [ -z "$line" ] && continue
      miss=""
      { [ -f "$TXT" ] && ! grep -qF "$line" "$TXT"; } && miss="$miss script"
      { [ -n "$ART" ] && ! grep -qF "$line" <<< "$ARTTXT"; } && miss="$miss article"
      [ -n "$miss" ] && red "missing from$miss: \"$line\"" || grn "\"$line\""
    done <<< "$MM"
  fi
else
  yel "canon file missing — no source of truth to check against"
fi
echo

# 6 · written-version outro nod (standing convention) — WARN
echo "· written-version outro nod"
if [ -f "$TXT" ] && grep -qiE "written up|read than listen|read it" "$TXT"; then
  grn "script points to the written version"
else
  yel "script doesn't nod to the written version (standing outro convention)"
fi
echo

echo "════ result: ${FAIL} fail · ${WARN} warn ════"
[ "$FAIL" -gt 0 ] && exit 1 || exit 0
