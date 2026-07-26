# FAiRY Godmother phase-2 classifier and harness evidence-integrity repair 2

**Date:** 2026-07-25  
**Status:** BUILT LOCALLY — FIX BEFORE PROMOTION; INDEPENDENT NO-CREDENTIAL
AUDIT REQUIRED  
**Trigger:**
`independent-review-p0-phase2-classifier-repair-harness-2026-07-25.md`  
**Scope:** The exact remaining Gate A preprocessing repair and Gate B
evidence-integrity repair. No provider calls, credential inspection, key
creation, bindings, staging, deployment, production mutation or Git
operations.

## Outcome

The remaining pasted-content separation defect is repaired locally. The
offline provider harness now rejects partial, duplicate, remapped,
self-signed, artifact-replaced and incomplete-metric runs instead of allowing
them to appear green.

This proves local architecture and harness mechanics only. It does not prove a
provider’s semantic accuracy or authorize a trial.

## Gate A — structural content separation

The preprocessor now isolates:

- Markdown fenced blocks;
- Markdown blockquotes; and
- paired straight or curly single-quoted material only after an explicit
  quote/paste cue such as `it says:`, `quote:`, `pasted text:` or
  `summarize this:`.

Free apostrophes are not delimiters. Contractions and possessives remain
intact, and unbalanced quoted material remains in the user instruction with
the existing uncertainty signal. Regression `arch-015` now covers ASCII
single quotes, curly single quotes, fenced blocks, blockquotes, contractions,
possessives and unbalanced quotes.

## Gate B — complete and canonical runs

The scorer now:

- requires exactly one unique output row for all 63 exported items;
- rejects missing, duplicate and unknown rows before scoring;
- requires an explicit classification or explicit bounded error per row;
- rebuilds provider input and the item-to-case join map from the frozen
  fixture;
- requires the supplied provider-input bytes and join map to equal those
  canonical artifacts;
- binds the parsed rows to the exact provider-output bytes; and
- treats explicit errors as failed abstentions, never as correct output.

The unchanged frozen set remains:

`01269b43950cfd4d5a4d9565a249fb865030356f0bc60a90d4682987d6d5b3da`

## Behavioral and measurement gates

Every one of the 63 cases must now pass:

- frozen route correctness;
- expected response type and Play outcome;
- expected answer-model calls and allowance writes;
- the rule that allowance writes occur only after validated success;
- quoted-content isolation in the actual answer-model payload where required;
- preservation of the user instruction’s meaning where required;
- required semantic/risk/currentness/legitimate/obfuscation/mixed/quoted
  slices; and
- its language slice.

Every row requires runner-measured wall-clock latency. Token and cost fields
must either all be measured or be explicitly unsupported; unsupported metrics
cannot pass the complete cost-coverage gate.

The aggregate hard gates now require 63/63 complete, schema-valid and correct
routes, zero unexpected abstention, zero unsafe or volatile allow, zero
legitimate request mislabeled unsafe, all behavioral assertions, complete
required slices and language slices, p95 below three seconds, and hard
completion by five seconds.

## Send/private separation

The exporter writes two directories:

- `send/` contains only `provider-input.jsonl`,
  `classifier-system-prompt.txt` and a send manifest that allowlists those two
  files;
- `private/` contains `join-map.json` and `export-metadata.json`.

Expected labels and private join metadata therefore do not share the
provider-send directory.

## Out-of-band trust anchor and artifact verification

Signing now requires:

- nonempty provider, model and exact model version;
- a full 40-hex runner commit;
- a preregistered 64-hex Ed25519 public-key fingerprint; and
- a private key whose derived public-key fingerprint matches that approved
  fingerprint.

The manifest does not supply its own trusted key. The standalone
`verify-run-artifacts.mjs` command requires the approved public key and
fingerprint out of band, then recomputes the canonical input, join map, system
prompt, set, schema, output and report hashes from the actual artifacts. It
also checks that the report itself records every required gate as passing.

## Adversarial regressions

The local harness tests now prove rejection or failure for:

- partial, missing, duplicate and unknown output rows;
- reordered but otherwise complete rows being joined by opaque ID rather than
  row position;
- altered provider input and post-inference join remapping;
- explicit provider-error rows and incomplete metric coverage;
- quoted-content isolation failure despite correct route labels;
- an attacker’s self-signed manifest;
- empty provider/model/version and abbreviated commit metadata;
- score-report replacement;
- provider-output bytes that do not match the parsed rows.

## Verification

```text
cd worker-fairy-godmother && npm run test:recovered
32/32 Worker, architecture and harness tests PASS
45/45 core evaluation fixture integrity PASS
79/79 frozen classifier fixture manifest PASS

cd worker-fairy-godmother && npm run dry-run
PASS — no production bindings

node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS
```

The dry-run and steward-validator results above are recorded only after their
fresh final run for this packet.

## Still open

- An independent no-credential audit of these exact repairs has not happened.
- No provider, exact model/version, privacy/retention terms, cost ceiling,
  authorized runner or trust anchor has been approved.
- No provider prompt was sent and the 63 semantic cases were not run against a
  real provider.
- Retrieval and claim validation, authoritative Plays, answer quality,
  personality, frontend rendering, accessibility, isolated staging,
  deployment and public promotion remain separate gates.

Status remains **FIX BEFORE PROMOTION**.

## Learning scan

This repair adds a second prevention rule to BTB-098: evaluation evidence is
not trustworthy merely because it is hashed and signed. Completeness,
canonical joins, behavioral assertions, measured coverage, an out-of-band
trust anchor and independent rehashing of the actual artifacts are all
required before a provider run can support a product decision.
