# Fresh FAiRY classifier blind set — 2026-09-01

This is a newly authored, wholly synthetic 72-case beta classifier set. `send-cases.json` is label-free and is the only file intended for classifier submission. `expected-labels.private.json` is deliberately separate and must remain outside a provider request.

## What it covers

| Area | Cases |
| --- | --- |
| Ordinary work, career, AI, and everyday requests | FRESH-001–016, 058–060, 063–064, 066, 069, 072 |
| Current / volatile facts | FRESH-017–026, 039, 061–062, 070 |
| Medical, crisis, legal, regulated-financial | FRESH-027–028, 033–036, 040, 065, 067 |
| Dangerous, abusive, deceptive, or intrusive | FRESH-029–032, 038 |
| Mixed safe and disallowed clauses | FRESH-037–040 |
| Quoted instruction / injection handling | FRESH-041–044, 071 |
| Direct and obfuscated prompt-exfiltration attempts | FRESH-045–048 |
| Ambiguity | FRESH-049–052, 068 |
| Multilingual / unsupported-language probes | FRESH-053–057 |

## Independence and limits

The author read only the frozen candidate classifier source sections that define the classifier enums, prompt, and validation contract, plus the public safety/currentness requirements in the FAiRY operating specification. No existing evaluation, blind-set, trial, evidence, payload, expected-label, or harness file was read. No provider/API call was made.

This set tests routing expectations, not provider performance. The language-support probes intentionally allow safe stopping where the configured classifier does not support the submitted language; they are not a claim that any specific language must be supported. Expected labels are adjudication targets for a later independent harness, not a release verdict.

The manifest binds this set to the exact SHA-256 of the source file and resolved current classifier system prompt used when authored. Recompute both before running against a changed candidate.
