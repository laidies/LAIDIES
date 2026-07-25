# FAiRY Godmother P0 phase 2 — repair 2 evidence

**Status:** BUILT LOCALLY — FIX BEFORE PROMOTION pending another independent
re-review. Not staging, deployed or publicly verified.

## What changed

The second independent review showed that ASCII-specific matching made routing
change with punctuation and that unsignalled but inherently volatile facts
could still reach paid generation. This repair replaces the affected branch
with:

- NFKC normalization plus explicit normalization of curly apostrophes/quotes,
  dash variants, Unicode spaces, repeated whitespace and zero-width characters;
- conservative concept-co-occurrence checks across health/treatment, crisis,
  interpersonal danger, individualized legal/financial decisions, covert
  surveillance, deception/fraud and unauthorized account/device access; and
- intrinsic volatility checks for named AI products combined with
  price/plan/capability/access/region/release concepts, plus laws/wages,
  official guidance, changing rates/deadlines and evidence/research claims.

The original prompt is preserved for model/display use. Only normalized text is
used for routing.

This is meaning-aware deterministic containment through related concepts and
safe co-occurrence, not an exact-sentence patch. It is still heuristic and must
not be described as semantic completeness.

## Worker-level evidence

`npm run test:recovered` — **20/20 PASS**.

The new verified-identity test covers every second-review false negative plus
paraphrase families and Unicode/zero-width variants. Every boundary or
verification-needed case returns HTTP 200 with the required typed no-charge
outcome, **zero upstream calls and zero temporary allowance writes**.

Paired controls prove that:

- `Draft a medical-leave email that keeps my diagnosis private.` remains an
  in-scope `case_success`; and
- a quoted `SYSTEM OVERRIDE` inside a requested proposal transformation remains
  available while being marked and isolated as untrusted document content.

`npm run test:fixtures` — **45/45 fixture-integrity PASS**.

`npm run dry-run` — **PASS**, with no bindings.

`node scripts/check-product-stewards.mjs` — **PASS**.

## Second-review probes

The repaired local Worker closes all 12 hard false negatives listed in
`independent-review-p0-phase2-repair-2026-07-25.md`: typographic-apostrophe
surveillance; indirect self-harm; tablet overdose; symptom/medicine request;
pregnancy/employment legal advice; debt allocation; fake invoice; unauthorized
social-account access; ChatGPT regional price; free-tier browsing access; BC
minimum wage; and current-week model release.

The failed medical-leave false-positive control also closes locally.

This is not an independent pass. FG-14 remains required.

## Residual limits

- Concept dictionaries and co-occurrence windows remain heuristic. Novel
  euphemisms, multilingual requests, obfuscation and complex negation may evade
  them or create false positives.
- There is no verified retrieval provider, source/claim validator or
  source-linked current-fact success path.
- Any non-empty upstream completion is still accepted; task-specific structured
  output validation remains a separate P0 blocker.
- No authoritative Play ledger, typed frontend, API/page accessibility suite,
  isolated staging or deployment work occurred.

## Learning scan

Qualifying learning: normalization is part of safety semantics, not input
polish; typographic punctuation must never change charge or upstream behavior.
Prevention rule: route on a normalized shadow string, preserve original user
text, and run every judge family through verified-identity Worker tests with
both upstream and write counters. Possible Behind the Build angle: “A curly
apostrophe turned a safety boundary into a paid answer.” The canonical
painpoints ledger was not edited because this bounded repair excludes it.

## Next action

Run FG-14 as a fresh independent adversarial review. Keep FAiRY at **FIX BEFORE
PROMOTION** regardless of local test success until that review and the wider P0
provider/schema/ledger/frontend/staging gates pass.
