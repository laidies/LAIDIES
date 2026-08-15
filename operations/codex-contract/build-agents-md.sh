#!/bin/bash
# Render the repository AGENTS.md from the canonical template.
# From the canonical Website-homepage checkout, also render LAIDIES/AGENTS.md.
# An isolated worktree must never infer its parent directory is LAIDIES.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE="$HERE/AGENTS.template.md"
SITE_ROOT="$(cd "$HERE/../.." && pwd)"
SITE_BASENAME="$(basename "$SITE_ROOT")"
WORKSPACE="$(cd "$SITE_ROOT/.." && pwd)"
CHECK=0
[ "${1:-}" = "--check" ] && CHECK=1

validate_router() {
  local source="$1"
  local words
  words="$(wc -w < "$source" | tr -d ' ')"
  if [ "$words" -gt 1200 ]; then
    echo "FAIL   repository router is $words words; maximum is 1200" >&2
    return 1
  fi
  if grep -Eq '^## (Video pipeline|PROSE AND TEACHING PRODUCTION|END-TO-END PRODUCTION DESIGN|EPISODE VISUAL SYSTEM|PARALLEL WORK — mandatory)' "$source"; then
    echo "FAIL   product-specific production rules returned to the repository router" >&2
    return 1
  fi
  if grep -Eq 'Every rejection updates|every substantial explanation.*workplace|read (both|all).*before any material task' "$source"; then
    echo "FAIL   an unbounded mandatory workflow returned to the repository router" >&2
    return 1
  fi
}

if [ "${1:-}" = "--validate-source" ]; then
  [ -n "${2:-}" ] || { echo "FAIL   --validate-source requires a path" >&2; exit 2; }
  validate_router "$2"
  echo "OK     compact repository router"
  exit 0
fi

validate_router "$TEMPLATE"

render() {
  local source_prefix="$2"
  printf '<!-- GENERATED FILE — DO NOT EDIT.\n'
  printf '     Source: %soperations/codex-contract/AGENTS.template.md\n' "$source_prefix"
  printf '     Rebuild: ./%soperations/codex-contract/build-agents-md.sh -->\n\n' "$source_prefix"
  sed -e "s|{{OPS}}|$1|g" -e "s|{{ROOT}}|$2|g" "$TEMPLATE"
}

status=0
emit() {
  local dest="$1" ops="$2" root="$3" label="$4"
  local tmp
  tmp="$(mktemp)"
  render "$ops" "$root" > "$tmp"
  if [ "$CHECK" = "1" ]; then
    if cmp -s "$tmp" "$dest"; then
      echo "OK     $label"
    else
      echo "STALE  $label — run build-agents-md.sh" >&2
      status=1
    fi
    rm -f "$tmp"
  else
    mv "$tmp" "$dest"
    echo "wrote  $label ($(wc -l < "$dest" | tr -d ' ') lines)"
  fi
}

emit "$SITE_ROOT/AGENTS.md" "operations" "" "repository AGENTS.md"

if [ "$SITE_BASENAME" = "Website-homepage" ]; then
  emit "$WORKSPACE/AGENTS.md" "Website-homepage/operations" "Website-homepage/" "LAIDIES/AGENTS.md"
else
  echo "SKIP   outer workspace AGENTS.md — checkout basename is '$SITE_BASENAME'"
fi

exit "$status"
