# Miss Jeeves continuation — BUILDING / paid pilot held

Governing programme: existing homepage corrections, then LIBRAiRY/Miss Jeeves → FAiRY → Episodes → Blend & Snap → LUMINAiRY. Homepage preview and assets remain unchanged. This is not programme completion or public release.

Current signed-in OpenAI session was inspected on September 7. Personal / Default project `proj_vo3D0Bt93Hv7pgLid07mESbZ` contains existing FAiRY and avatar API keys. Its Limits page says “No spend limit set”; its Set spend limit dialog exposes “Enforce a hard limit”, currently off. Dialog cancelled. No credit, limit, key, project, provider or deployment was changed. Prior funding/sign-in completion is not being reopened. A dedicated Miss Jeeves project with hard US$100/month and restricted key was proposed for approval, because changing the existing project would affect other products. Approval remains pending.

Production Worker currently points at version `220e952d-5e3c-4301-bef5-b0882cfa5777` (Wrangler deployment inventory, read September 7). That is distinct from local guarded backend `d0ec6d17`. Local production configuration keeps research disabled and provider-limit verification false. No claim that those local switches describe the current hosted version.

## Implemented and tested locally

The real guidance handler previously accepted a provider response with status `incomplete`, `failed`, `cancelled`, `in_progress`, or missing status if an allowed citation existed. New calibrated regression rejected the predecessor (8 failures, including actual HTTP 200 versus expected 502). The repair requires a completed provider response and completed message, rejects empty cited text, and preserves usage for settlement. Standard service tier is explicit, and the existing hashed rate identity is sent as the provider safety identifier.

Independent Terra review inspected the code and found no same-path display bypass. Its requested service-level test now proves a billable incomplete answer settles exactly once, retains 29,250 micro-US dollars in the fixture ledger, emits no answer, and cannot trigger another provider request when retried. All 146 Worker tests plus the existing 45-answer and 79-classifier fixture-integrity suites pass. These are local controls, not live answer-quality or billing evidence.

The exact service entry is the sole caller of the guidance handler; repository search found no second implementation to repair. Provider/model/source-price freshness and broader moderation/answer-reuse controls remain separate release work.

## Bounded pilot prepared

`worker-fairy-godmother/harness/miss-jeeves-pilot.mjs` captures the actual outbound guidance requests for three invented cases: workplace document permission, preparing a weekly project update safely, and an ambiguous question requiring clarification. Offline preflight captures all three with no network calls or spend. Live mode requires a private key file and fresh dedicated-project evidence containing projectId, hardLimitUsd=100, hardLimitEnforced=true and verifiedAt. The request pins that project in the provider header. Each attempt is journalled before dispatch, there are no retries, and outputs retain provider usage separately from conservative application estimates. Pilot reservations are not provider-bill proof. The hard provider ceiling must be established before execution.

Current check intentionally rejects `--live` without credentials: “Live pilot requires an explicitly supplied private key file. No provider calls made.” No actual Sol answer, latency or invoice/cost measurement is claimed. No fair-access quantity is recommended from mocks.

Next: upon explicit approval, create and verify the dedicated hard-limited project/key without exposing secret values, run the three private cases, inspect exact answers against their cited primary passages, reconcile actual usage and failed attempts, then finish scoped release admission. Preserve free unlimited search and the existing Answer Bank / Straight Answers / Dear Miss Jeeves boundaries. Do not turn on public research from these local results.

Primary reference inspected: https://developers.openai.com/api/docs/models/gpt-5.6-sol (September 7), plus current Responses parameter documentation. Current promotional token prices are $4 input / $20 output per million through at least November 21; conservative application estimates are not the invoice.
