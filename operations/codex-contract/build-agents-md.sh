#!/bin/bash
# Renders both AGENTS.md files from one template.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE="$HERE/AGENTS.template.md"
SITE_ROOT="$(cd "$HERE/../.." && pwd)"
WORKSPACE="${LAIDIES_AGENTS_WORKSPACE_TARGET:-}"
# Isolated checkouts must never write into their arbitrary parent directory.
if [ -z "$WORKSPACE" ] && [ "$(basename "$SITE_ROOT")" = "Website-homepage" ]; then
  WORKSPACE="$(cd "$SITE_ROOT/.." && pwd)"
fi

[ -f "$TEMPLATE" ] || { echo "FAIL: template not found at $TEMPLATE" >&2; exit 1; }

BANNER="<!-- GENERATED FILE — DO NOT EDIT.
     Source: Website-homepage/operations/codex-contract/AGENTS.template.md
     Rebuild: ./Website-homepage/operations/codex-contract/build-agents-md.sh -->"

render() {
  printf '%s\n\n' "$BANNER"
  sed -e "s|{{OPS}}|$1|g" -e "s|{{ROOT}}|$2|g" "$TEMPLATE"
}

CHECK=0
[ "${1:-}" = "--check" ] && CHECK=1

status=0
emit() {
  local dest="$1" ops="$2" root="$3" label="$4"
  local tmp; tmp="$(mktemp)"
  render "$ops" "$root" > "$tmp"
  if [ "$CHECK" = "1" ]; then
    if cmp -s "$tmp" "$dest"; then
      echo "OK     $label"
    else
      echo "STALE  $label — run build-agents-md.sh" >&2
      status=1
    fi
  else
    mv "$tmp" "$dest"
    echo "wrote  $label ($(wc -l < "$dest" | tr -d ' ') lines)"
    return
  fi
  rm -f "$tmp"
}

if [ -n "$WORKSPACE" ]; then
  emit "$WORKSPACE/AGENTS.md" "Website-homepage/operations" "Website-homepage/" "LAIDIES/AGENTS.md"
fi
emit "$SITE_ROOT/AGENTS.md"  "operations"                  ""                  "Website-homepage/AGENTS.md"

exit $status
