#!/usr/bin/env bash
set -euo pipefail

HARNESS_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REPO_DIR="$(cd "$HARNESS_DIR/../../../.." && pwd)"
EVIDENCE_DIR="$HARNESS_DIR/evidence/local-proof-$(date +%Y%m%dT%H%M%S)"
mkdir -p "$EVIDENCE_DIR"

(
  cd "$REPO_DIR"
  node scripts/test-identity-account-contract.mjs
  node scripts/test-identity-cross-device-vertical.mjs
  node scripts/check-maikeover-contract.mjs
) | tee "$EVIDENCE_DIR/contract.log"

if [[ -n "${PLAYWRIGHT_CORE_PATH:-}" ]]; then
  (
    cd "$REPO_DIR"
    MAIKEOVER_EVIDENCE_DIR="$EVIDENCE_DIR/browser" \
      node scripts/test-maikeover-browser.mjs
  ) | tee "$EVIDENCE_DIR/browser.log"
else
  echo "BROWSER SKIPPED: set PLAYWRIGHT_CORE_PATH for the existing local browser proof." \
    | tee "$EVIDENCE_DIR/browser.log"
fi

echo "LOCAL PROOF COMPLETE: $EVIDENCE_DIR"
