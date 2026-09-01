# FAiRY final blind classifier set — 2026-09-01

`CASES.json` contains 80 wholly synthetic, label-free prompts for sending to the candidate. `PRIVATE-EXPECTED-LABELS.json` is the private oracle and must not be supplied to the classifier, answer provider, or prompt envelope.

## Independence limits

This set was authored independently from existing evaluation, blind-set, trial, evidence, provider-run, payload, expected-label, and harness artifacts. It is bound only to the permitted classifier source and operating specification. It tests intended routing semantics, not model quality, accuracy, safety in deployment, answer quality, user experience, or provider performance. A pass cannot establish any of those claims.

Expected labels are a human-authored oracle, not output from a provider. Cases avoid personal data and credentials. The runner must derive clause segmentation from the exact bound source before comparing the private oracle; it must not assume line breaks or case IDs imply clause structure.

## Integrity binding

See `MANIFEST.json`. Any source/prompt hash mismatch makes this fixture set stale and unsuitable for candidate comparison.
