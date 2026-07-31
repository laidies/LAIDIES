#!/usr/bin/env bash
set -euo pipefail

# This validates only a supplied address shape. It never sends, reads, stores,
# prints, or otherwise contacts the mailbox or an identity provider.
test -n "${LAIDIES_TEST_EMAIL:-}" || {
  echo "BLOCKED: set LAIDIES_TEST_EMAIL to the dedicated test address." >&2
  exit 2
}
if [[ ! "$LAIDIES_TEST_EMAIL" =~ ^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$ ]]; then
  echo "BLOCKED: LAIDIES_TEST_EMAIL is not an email-shaped value." >&2
  exit 2
fi
echo "ADDRESS PREFLIGHT PASS: no delivery request was sent."
