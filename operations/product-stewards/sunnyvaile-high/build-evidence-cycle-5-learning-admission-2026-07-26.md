# Build evidence — Cycle 5 High learning admission

**Result:** VERIFIED LOCALLY; independent review required; no Git, deploy,
publication, production mutation, credential use or class/quiz admission.

## Functional evidence

- High contract: **PASS — 13 groups**.
- Source browser: **PASS — 16 journeys**.
- Fresh exact artifact browser: **PASS — 16 journeys**.
- Inline JavaScript: **PASS — 352 scripts / 132 pages**.
- Local links: **PASS — 1,975 references / 110 pages**.
- Town consistency: **PASS**.
- Product steward checker: **PASS — 65 products, 3/3 active lanes**.
- Public metadata: **PASS**.
- Scoped `git diff --check`: **PASS**.
- JSON parsing for register, ledger and state: **PASS**.

The new journeys prove that a 503 learning ledger disables the classroom and
that a synthetic `live` row with a video remains held/non-playable while the
independent learning record is held.

## Fresh artifact

Path: `/tmp/laidies-high-cycle5-r2.S0cFzj`

Builder result: **1,087 files / 961.53 MiB / 0 missing / 0 oversized**. The
existing warning above the internal 750 MiB threshold remains a release-owner
hold.

An initial artifact omitted the new runtime ledger, causing the exact-artifact
journey to fail closed. `scripts/build-public-site.mjs` was repaired to include
the ledger explicitly; the fresh r2 artifact then passed all 16 journeys.

| Runtime file | Matching source/artifact SHA-256 |
|---|---|
| `learn/class.html` | `b35fbcd9405ec9b2f615005f41dcfe286473041f2ac77d4565b216d29f2d8872` |
| `content/site/high-classes.json` | `d3f83e65895f809d02f6c17a08a6e2784e4ad6c3f5910d2fbdb4b465461f7962` |
| `content/site/high-learning-ledger.json` | `7aa0230f040f1e9b5f06b72ea167ccebc15720559e45c1459b81bf643cd11fef` |

## Truth and admission

- Register: 4 subjects / 37 rows / 0 live / 0 video / 0 verified dates.
- Learning ledger: 1 held class candidate, 1 held quiz candidate, 0 admitted.
- Representative content status: repaired-awaiting-independent-review.
- Existing runtime quiz bank was not expanded or approved.
- Repair 4's independent PASS is preserved in state/backlog.

## Independent holds

The candidate is not evidence of approved learning, media, rewards, accounts,
analytics, deployability or public readiness. Use the judge contract in
`build-packet-cycle-5-learning-admission-2026-07-26.md`.

## Learning scan

**Surprise:** a valid source implementation did not mean the runtime JSON
would enter the curated artifact; the dependency crawler could not infer the
variable fetch target.

**Prevention rule:** every runtime-selected data file needs an explicit release
manifest entry plus a fresh-artifact browser journey; a source-only pass is
insufficient.

**Behind the Build angle:** “The class failed safely—and revealed the missing
piece before a learner did.”

The parent-owned canonical painpoints ledger was read but not edited in this
bounded lane.

