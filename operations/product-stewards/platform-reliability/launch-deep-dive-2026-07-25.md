# Platform Reliability — launch deep dive

**Status:** REPORT READY — shared platform assessment; not a deployment, public verification, service mutation, or product-release approval.

## Intent and ownership boundary

Platform Reliability makes release truth inspectable across a large static/dynamic site. It owns the common rails—what source became which artifact, where that artifact was deployed, which public bytes/services were actually tested, and how failure is recovered. It does not decide whether a specific building is good, understandable or safe to promise; that belongs to its product champion and specialist guilds.

The governing release rule is deliberately strict: a route loading, a button responding, an HTTP 200, or a static check passing does not certify the visitor journey. Each product retains five independent verdicts: technical, comprehension, value, honesty and experience.

## Current baseline

| Layer | Evidence | Truthful state/limit |
|---|---|---|
| Source/static | Inline JS parse passed (353 scripts/132 pages); local links passed (1,942 refs/110 pages); town consistency passed. | **VERIFIED LOCALLY** foundation only. |
| Artifact | Public metadata and KSVL artifact gates passed; KSVL validated 83 hash-matched audio dependencies. | **VERIFIED LOCALLY** for named artifact checks, not all runtime journeys. |
| Browser | Candidate rendered 27 sitemap routes at 390×844, focused routes at 1440×900; selected public route checks found no page errors/loaded broken images/overflow. | **PARTIAL**; browser render/loading does not cover actions, service outcomes or comprehension. |
| Public origin | Named prior release had public route/selected journey evidence and current sitemap reachability checks. | **PARTIAL**; evidence belongs to particular commit/deployment/time and must not be inherited by later candidates. |
| External services | Worker secret boundary/CORS observations, Buttons/Hyvor/Supabase integration code, Plausible/Clarity embeds exist. | **NOT YET EXECUTED** for controlled real mutations/full lifecycle. |
| Non-functional | TTFB/navigation diagnostics and mobile fallback observations exist. | **PARTIAL**; no field Core Web Vitals, complete accessibility suite, or real-device matrix. |

## Routes, builds and dependency integrity

The project has useful validators—local links, inline JS, town consistency, public metadata, KSVL artifact, NewsStand/fairy evaluation fixtures—and a curated build artifact. The EOD audit also exposed the essential limitation: static link resolution passed while live/candidate runtime fetches for `high-classes.json` and two constructed Puffy asset paths failed. Platform must therefore move from “all links resolve” to an explicit runtime dependency manifest tested in the exact artifact.

Artifact size is a material release risk. The EOD report recorded 1,039.41 MiB, above the 750 MiB warning budget and only 60.59 MiB below the 1,100 MiB hard limit. That is neither a reason to claim failure nor a reason to ignore it: a justified exception or size reduction, plus dependency-diff discipline, is required before a broad release claim.

## Real-service verification

Services in scope include Cloudflare Pages/Workers, Supabase auth/database/RLS/RPC, Buttondown subscriptions, Hyvor posting/moderation, native sharing, media and analytics. Their correct test unit is a controlled full lifecycle with an approved test identity/data plan: success, validation, timeout/failure, retry, duplicate/idempotency, privacy, cost/rate limit and cleanup/rollback. The read-only EOD audit deliberately did not mutate these services; its NOT TESTED verdicts must remain visible.

## Analytics, observability and privacy

Plausible and Clarity appear on much of the site, but script loading does not prove events are defined, delivered, privacy-compliant, interpretable or acted on. Platform should provide one dictionary and delivery-health method; each product steward owns event meaning, experiment hypothesis and interpretation. No reliability diagnostic warrants collecting raw prompts, emails, postcard text, referral details, full session content or secrets.

Continuous monitoring/notifications are not currently demonstrated. Workflows and scripts are components, not proof of a monitored production system; they need a trigger, recipient, failure record and response rule.

## Performance and accessibility

Fallback checks observed 70–124 ms document TTFB on the sampled public origin and no loaded broken images, duplicate IDs or horizontal overflow on core mobile routes. These diagnostics are valuable but expressly do not measure LCP, CLS or INP. Open work includes real-device browser coverage, keyboard/screen-reader walkthroughs, contrast review, reduced motion and slow-network service recovery. Platform supplies the representative matrix and evidence capture; each product fixes its own interaction/content defects.

## Release provenance, rollback and live-state truth

A reliable release needs a record connecting source commit, build settings/artifact hash, deployment ID/immutable URL, public domain/alias, route/service test timestamps, known limitations, rollback target and responsible owner. Existing cutover notes contain parts of this evidence across several documents, but no single current manifest is the unambiguous source for the exact next release. Rollback must be drilled, not merely inferred from a previous commit or deployment.

## Launch gaps

| Classification | Finding | Required next step |
|---|---|---|
| FIX BEFORE LAUNCH | No single authoritative provenance/evidence record for exact release candidate. | PR-01 release manifest. |
| FIX BEFORE LAUNCH | Artifact exceeds warning budget and runtime dependency checks have gaps. | PR-02/PR-03 gate and disposition. |
| FIX BEFORE LAUNCH | Controlled real-service/auth/form/community/share lifecycle tests remain unperformed. | PR-04 scoped test protocol. |
| FIX BEFORE LAUNCH | Analytics instrumentation/health and continuous observability are unwired. | PR-05/PR-08. |
| FIX BEFORE LAUNCH | Performance/accessibility evidence is baseline-only, not full representative proof. | PR-06. |
| FIX BEFORE LAUNCH | Rollback/incident/correction response is not demonstrated as an operational drill. | PR-07. |

## Verdict

Platform Reliability is **SPECIFIED**, with several meaningful **VERIFIED LOCALLY** static/artifact checks and **PARTIAL** selected public/browser observations. The next release must not collapse those layers into a “site works” verdict. The smallest high-value platform move is a manifest-backed, exact-artifact public smoke with controlled service tests and rollback evidence; product champions then supply their own outcome verdicts.
