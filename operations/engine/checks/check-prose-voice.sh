#!/usr/bin/env bash
# check-prose-voice.sh <EP>
#
# Writing-lock rules that check-episode.sh does not cover, checked on the
# READER-FACING prose only (narration script + article). Canon and the substance
# sheet are internal working documents and are allowed to use tables.
#
# Rule 1 is here because of a real incident on 2026-07-22: a draft came back
# with a product-comparison table minutes after the writing lock had been quoted
# in the same conversation. The lock says LAiDIES must not read like "a product
# comparison blog". Quoting a rule does not enforce it. This does.
#
# ENGINE_ROOT overrides the repo root for testing.
set -uo pipefail

N="${1:?usage: check-prose-voice.sh <episode number>}"
NN=$(printf "%02d" "$((10#$N))" 2>/dev/null || echo "$N")
ROOT="${ENGINE_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)}"
cd "$ROOT" || exit 2

SURFACES=()
for f in "operations/audio/episode-${NN}-elevenlabs-v3-tagged.txt" \
         "operations/audio/episode-${NN}-script.md" \
         "content/issues/issue-${NN}.md"; do
  [ -f "$f" ] && SURFACES+=("$f")
done

if [ "${#SURFACES[@]}" -eq 0 ]; then
  # Never report "clean" when there was nothing to read. That is the fail-open
  # this whole engine exists to stop.
  echo "    NO PROSE FOUND for episode ${NN} — nothing to check, so this cannot pass."
  echo "    looked for: operations/audio/episode-${NN}-elevenlabs-v3-tagged.txt"
  echo "                operations/audio/episode-${NN}-script.md"
  echo "                content/issues/issue-${NN}.md"
  exit 1
fi

fails=0

# 1 · comparison tables — "a product comparison blog", banned by the writing lock
hits=$(grep -nE '^[[:space:]]*\|[^|]*\|' "${SURFACES[@]}" 2>/dev/null | head -6)
if [ -n "$hits" ]; then
  echo "    FAIL  comparison table in reader-facing prose (writing lock: never 'a product comparison blog')"
  printf '%s\n' "$hits" | sed 's/^/          /' | cut -c1-140
  fails=$((fails+1))
fi

# 2 · "members" — the ruling is Resident, not member
hits=$(grep -niE 'members?-only|our members\b|become a member\b' "${SURFACES[@]}" 2>/dev/null | head -4)
if [ -n "$hits" ]; then
  echo "    FAIL  'member' language — the ruling is RESIDENT, not member"
  printf '%s\n' "$hits" | sed 's/^/          /' | cut -c1-140
  fails=$((fails+1))
fi

# 3 · "course" — the 101s are textbooks, never courses
hits=$(grep -niE '\b(our|the|this|a) (course|courses)\b|sign up for the course' "${SURFACES[@]}" 2>/dev/null | head -4)
if [ -n "$hits" ]; then
  echo "    FAIL  'course' — the 101s are TEXTBOOKS, never courses"
  printf '%s\n' "$hits" | sed 's/^/          /' | cut -c1-140
  fails=$((fails+1))
fi

# 4 · AI as "she" — AI is always "it"
#     Deliberately narrow. "…versus Claude, she is comparing two products" is the
#     READER being "she" and must not trip this. Only an AI directly wearing the
#     pronoun, or a pronoun doing something only an AI does, counts.
#     The trick: the pronoun must be in the SAME clause as the AI — no comma,
#     quote mark, dash or full stop may sit between them.
hits=$(grep -niE '(the (model|app|assistant|chatbot)|ChatGPT|Claude|Gemini|Copilot)[^,."'"'"'”“—!?]{0,22}\b(she|her)\b|\b(she|her) (hallucinat|was trained on|is trained on|makes (things|stuff) up|invents citations)' "${SURFACES[@]}" 2>/dev/null | head -4)
if [ -n "$hits" ]; then
  echo "    FAIL  an AI referred to as 'she/her' — AI is always 'it'"
  printf '%s\n' "$hits" | sed 's/^/          /' | cut -c1-140
  fails=$((fails+1))
fi

if [ "$fails" -gt 0 ]; then
  echo "    → source of these rules: $ROOT/operations/voice/laidies-writing-lock.md"
  exit 1
fi

echo "    ok       ${#SURFACES[@]} prose surface(s) clean: ${SURFACES[*]}"
exit 0
