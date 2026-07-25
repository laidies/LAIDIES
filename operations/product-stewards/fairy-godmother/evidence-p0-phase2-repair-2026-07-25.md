# FAiRY Godmother P0 phase 2 — independent-review repair evidence

**Status:** BUILT LOCALLY — awaits independent re-review; not staging,
deployed or publicly verified.

## Repair scope

This repair addresses the false-negative families recorded in
`independent-review-p0-phase2-2026-07-25.md` without changing provider,
frontend, ledger, deployment or external integrations.

- Medical: acute chest pressure/breathing and medication-stop/change patterns.
- Crisis/interpersonal danger: indirect self-harm, plan language, threats and
  fear of going home.
- Legal/financial: individualized rights/deadlines and investment allocation
  decisions, while retaining named drafting false positives.
- Abuse/privacy: covert partner-device monitoring/tracking.
- Current facts: product capability/access/region, plans/prices, laws and
  guidance, current/new research, citations and mixed draft-plus-current-choice
  prompts.
- Injection: direct attempts to bypass safeguards receive a typed no-charge
  boundary. A quoted/pasted instruction inside a legitimate transformation is
  marked sensitive and wrapped as untrusted document content before the model
  call, rather than being treated as privileged instruction.
- Ambiguity: `I need advice.` now returns one focused clarification.

## Worker-level proof

`npm run test:recovered` — **18/18 PASS**.

The added Worker-level test runs the independent-review probes and close
paraphrases through `worker.fetch` with both a throwing mocked upstream and a
verified temporary allowance store. Every boundary, verification-needed,
clarification and direct-injection case returns its typed no-charge result;
the test observes **zero upstream calls and zero allowance writes**. A separate
test confirms quoted-injection transformation work remains available and that
the model input labels its text as untrusted document content.

`npm run test:fixtures` — **45/45 fixture-integrity PASS**.

`npm run dry-run` — **PASS**; the Worker bundles with no bindings.

`node scripts/check-product-stewards.mjs` — **PASS**.

## Original independent probes

All 13 original probe intents close in the repaired local Worker tests:
medical (2), self-harm/interpersonal danger (2), individualized financial (1),
covert monitoring (1), current product/price/law/research (4), mixed current
fact + draft (1), underspecified advice (1), and direct injection (1).

This is **not** an independent pass: the original reviewer has not rerun the
probes, and local deterministic tests cannot establish semantic robustness.

## Residual limits

- The matcher is finite and phrase-based. Novel euphemisms, multilingual text,
  complex context and adversarial obfuscation can still evade it; broadening it
  can also block legitimate work. Do not describe this as robust semantic
  safety.
- Current-fact routing intentionally refuses model-memory answers, but there is
  still no verified retrieval provider, source validator or source-linked
  success result.
- `extractCompletion` still accepts any non-empty upstream text. The P0
  task-specific structured response validator, authoritative Play ledger,
  typed frontend and API/page/staging/accessibility evaluation remain required.

## Learning scan

Qualifying local learning: fixed-fixture route checks do not prove side-effect
safety. Prevention rule: every new boundary/retrieval family must execute via
the Worker with a throwing upstream and a write-counted allowance store, plus a
paired legitimate transformation false-positive test. Possible Behind the
Build angle: “A safety rule is not a safety gate until it also prevents the
call and the charge.” The canonical painpoints ledger was deliberately not
edited because this bounded repair’s write scope excludes it.

## Next action

Run the independent re-review (FG-13) against these exact probes plus novel
paraphrases, then keep the product at **FIX BEFORE PROMOTION** until its
provider, schema, ledger, frontend and isolated staging gates are evidenced.
