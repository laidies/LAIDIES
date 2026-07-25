# Platform Reliability Steward

**Status:** SPECIFIED — shared reliability dossier created; no persistent monitor, analytics pull, release runner, or autonomous repair authority is wired.
**Relationship to AW-003:** MERGE — this is the shared release-integrity contract for every product; it does not replace product ownership or product-quality rulings.
**Authority:** Read-only investigation and records in this directory. No application code, configuration, secrets, service mutation, commit/push, deployment, publication, or rollback action without the authorized implementation/release lane.

## Shared platform promise

For any LAiDIES promise, the exact intended source, artifact, deployment and public-origin journey can be identified; routes and dependencies behave honestly; failures recover safely; and the evidence names what was actually tested. A local file, passing build, HTTP 200, deployment, or script embed is not by itself proof of the product outcome.

## Boundary

**Owns:** cross-site release integrity; source/artifact/deployment/public-origin provenance; build and metadata gates; route/redirect/media/dependency checks; external-service verification contract; analytics instrumentation health; performance/accessibility baselines; security/secret/headers observations; rollback/incident/observability requirements; and platform evidence standards.

**Does not own:** whether a building/episode/game/editorial product is useful, comprehensible, aesthetically approved, factually adequate, safe in its specialist domain, or worthy of release. Each champion owns that verdict; Platform validates shared technical evidence and reports limits.

## Evidence ladder and required truth

1. **BUILT LOCALLY** — named source/artifact exists; no implication it is tested.
2. **VERIFIED LOCALLY** — exact named artifact passed a bounded, recorded local journey plus its required dependency/failure checks.
3. **DEPLOYED** — named artifact/version is published to an identified environment; no implication public journey passed.
4. **VERIFIED PUBLICLY** — the deployed public origin passed the same bounded journey with real dependencies where claimed.

Every stateful integration also records trigger, authoritative completion event, persistence scope, visible result, error/cancel/retry and duplicate prevention. If the platform cannot observe completion, the surface must say so rather than calling it verified.

## Platform service contract

| Service/area | Platform verifies | Product owner still verifies |
|---|---|---|
| Cloudflare Pages/build | Artifact provenance, routes, redirects, metadata, exact deployment/public bytes, rollback target. | Journey meaning, current content and release promise. |
| Supabase | Config reachability, auth/RLS/RPC test protocol, error/retry/observability. | Identity, privacy, reward and public-card experience. |
| Cloudflare Workers/Buttondown | Secret boundary, CORS/rate/error contract and controlled subscription test protocol. | Consent, copy, confirmation and subscriber value. |
| Hyvor | Embed availability, error/moderation test protocol. | Community norms, posting value and reward truth. |
| Media/KSVL | Asset presence/hash and player dependency checks. | Episode/audio quality, captions, rights and comprehension. |
| Plausible/Clarity | Script/config/event delivery and privacy review evidence. | Event semantics, research question and interpretation. |

## Release gate

Platform may report **VERIFIED LOCALLY** only with a named artifact, manifest/checksum where available, passing applicable static/link/media/build checks, browser journey evidence, dependency/failure results and exact limits. **VERIFIED PUBLICLY** additionally requires public-origin browser/service evidence against the deployed artifact and a rollback reference.

No product may inherit a PASS solely from shared checks. Product champions supply their own technical, comprehension, value, honesty and experience verdicts; Platform reconciles only the common evidence and blocks release on an unresolved shared failure.
