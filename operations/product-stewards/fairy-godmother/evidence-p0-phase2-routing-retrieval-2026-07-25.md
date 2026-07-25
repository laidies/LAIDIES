# FAiRY Godmother P0 phase 2 — routing and retrieval evidence

**Status:** BUILT LOCALLY — bounded deterministic worker evidence; not staging,
deployed, independently judged or publicly verified.

## Scope completed

- FG-05: deterministic pre-generation boundary/risk/domain/task routing in
  `worker-fairy-godmother/src/index.js`.
- FG-06: current-information gate. No verified retrieval provider or claim
  validator exists in this Worker, so source-dependent requests return the
  typed `needs_verified_information` state with a verification plan. They do
  not reach the language model and no citation-shaped facts are generated.

The gate includes short no-charge boundaries for medical, crisis/emergency,
individualized legal, individualized regulated-financial, dangerous/abusive
and deliberate-evidence-fabrication requests. It returns one focused
clarification for under-specified requests. Stable, in-scope work is routed
before its existing generation path and carries route metadata in its typed
response.

## Local proof

- `npm run test:recovered` — 16/16 PASS, including no-upstream-call assertions
  for boundary, verification-needed and clarification paths; 40 directly
  prompt-routable evaluation cases exactly match their expected domain, task
  and risk. Four service/revision fixtures exercise lifecycle states before or
  after prompt routing. The deliberate citation-fabrication fixture is
  normalized to the contract's safer `out_of_scope`/`boundary` route rather
  than its older AI/current-fact label.
- `node ../scripts/validate-fairy-godmother-evals.mjs` — 45/45 fixture
  integrity PASS. This validates the fixture file, not API/page execution.
- `node scripts/check-product-stewards.mjs` — PASS.

## Limits and remaining gates

- No retrieval provider, primary-source fetch, source validator, citation
  renderer or current-fact `case_success` exists yet. The interface reports
  that absence truthfully rather than simulating retrieval.
- This is a deterministic conservative heuristic, not a trained/evaluated
  classifier. It intentionally uses contextual patterns rather than blocking
  all mentions of words such as “medical”, “legal”, “investment”, “price” or
  “research”: a medical-leave email, legal-review brief, investment
  presentation, freelance pricing discussion and research-interview question
  remain eligible in-scope work. The 45 cases have not been executed against
  the Worker API/page, and no browser/page, mobile/accessibility, staging or
  independent safety/accuracy/brand review has occurred.
- The existing presentation prompt and energy behavior remain outside this
  phase; FG-07 must constrain presentation after routing and retrieval.
- No case ledger or authoritative FAiRY Plays implementation exists. The
  temporary phase-1 allowance remains separate and must not be read as an
  authoritative spend record.
- Production source, bindings, secrets, default Wrangler target and frozen
  recovery artifact were not changed.

## Learning scan

No qualifying new painpoint was found. This implementation applies
**BTB-089**: a request for receipts must change the generation path; when
verified retrieval is unavailable, return a verification plan rather than
model-authored findings. A possible public Behind the Build angle remains the
existing one: “Our receipts coach invented the receipts—and that is exactly
why we test the live tool.”

## Next action

Define and provision an isolated, privacy-reviewed verified retrieval provider
and claim/source validator; then test the versioned cases at the Worker API
and typed page layers before any staging or production promotion.
