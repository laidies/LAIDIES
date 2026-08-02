#!/usr/bin/env bash
set -euo pipefail

usage() {
  printf '%s\n' \
    'Usage: restore-runtime.sh [--force]' \
    '' \
    'Restores the versioned LAiDIES Codex automations and product-champion skill.' \
    'Set CODEX_HOME to restore into an isolated location for testing.'
}

force=0
case "${1:-}" in
  '') ;;
  --force) force=1 ;;
  -h|--help) usage; exit 0 ;;
  *) usage >&2; exit 2 ;;
esac

script_dir="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
repo_root="$(CDPATH= cd -- "$script_dir/../.." && pwd)"
automation_source="$repo_root/operations/runtime/automations"
skill_source="$repo_root/.agents/skills/laidies-product-champion"
codex_root="${CODEX_HOME:-${HOME:?HOME is required}/.codex}"
automation_target="$codex_root/automations"
skill_target="$codex_root/skills/laidies-product-champion"

mapfile_compat() {
  while IFS= read -r line; do
    AUTOMATION_FILES+=("$line")
  done
}

AUTOMATION_FILES=()
mapfile_compat < <(find "$automation_source" -mindepth 2 -maxdepth 2 -name automation.toml -type f | LC_ALL=C sort)

if [[ ${#AUTOMATION_FILES[@]} -ne 8 ]]; then
  printf 'ERROR: expected 8 versioned automations, found %s\n' "${#AUTOMATION_FILES[@]}" >&2
  exit 1
fi

for required in "$skill_source/SKILL.md" "$skill_source/agents/openai.yaml" "$skill_source/scripts/champion_status.mjs"; do
  if [[ ! -f "$required" ]]; then
    printf 'ERROR: missing versioned skill file: %s\n' "$required" >&2
    exit 1
  fi
done

check_collision() {
  local source=$1 target=$2
  if [[ -e "$target" ]] && ! cmp -s "$source" "$target" && [[ $force -ne 1 ]]; then
    printf 'ERROR: refusing to overwrite changed runtime file: %s (rerun with --force)\n' "$target" >&2
    exit 1
  fi
}

for source in "${AUTOMATION_FILES[@]}"; do
  name="$(basename -- "$(dirname -- "$source")")"
  target="$automation_target/$name/automation.toml"
  check_collision "$source" "$target"
done

while IFS= read -r -d '' source; do
  relative=${source#"$skill_source/"}
  check_collision "$source" "$skill_target/$relative"
done < <(find "$skill_source" -type f -print0)

for source in "${AUTOMATION_FILES[@]}"; do
  name="$(basename -- "$(dirname -- "$source")")"
  target="$automation_target/$name/automation.toml"
  install -d "$(dirname -- "$target")"
  install -m 0644 "$source" "$target"
done

install -d "$skill_target"
while IFS= read -r -d '' directory; do
  relative=${directory#"$skill_source/"}
  install -d "$skill_target/$relative"
done < <(find "$skill_source" -mindepth 1 -type d -print0)

while IFS= read -r -d '' source; do
  relative=${source#"$skill_source/"}
  target="$skill_target/$relative"
  install -d "$(dirname -- "$target")"
  mode=0644
  [[ -x "$source" ]] && mode=0755
  install -m "$mode" "$source" "$target"
done < <(find "$skill_source" -type f -print0)

for source in "${AUTOMATION_FILES[@]}"; do
  name="$(basename -- "$(dirname -- "$source")")"
  cmp -s "$source" "$automation_target/$name/automation.toml"
done

while IFS= read -r -d '' source; do
  relative=${source#"$skill_source/"}
  cmp -s "$source" "$skill_target/$relative"
done < <(find "$skill_source" -type f -print0)

printf 'Restored 8 LAiDIES automations and the product-champion skill to %s\n' "$codex_root"
