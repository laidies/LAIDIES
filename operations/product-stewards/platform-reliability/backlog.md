# Platform Reliability Backlog

**Status:** BUILDING — recommendations only; no item is accepted implementation or release work.

| ID | Status | Launch class | Work | Why / dependency | Done when |
|---|---|---|---|---|---|
| PR-01 | SPECIFIED | FIX BEFORE LAUNCH | Create one release evidence manifest. | Source, artifact, deployment and public checks can otherwise be confused or drift. | Manifest binds commit/source, artifact hash/build report, deployment ID/URL, public-origin checks, service verdicts, known limits, owner sign-offs and rollback reference. |
| PR-02 | SPECIFIED | FIX BEFORE LAUNCH | Enforce artifact size budget and dependency diff gate. | EOD audit recorded 1,039.41 MiB, above warning budget and near hard limit. | Explicit approved exception or size reduction; build rejects unexplained growth and reports largest dependencies/diff. |
| PR-03 | SPECIFIED | FIX BEFORE LAUNCH | Establish route/redirect/runtime dependency contract. | Link checks passed yet runtime High data/assets 404ed; static links do not prove runtime fetches. | Sitemap, redirects, runtime fetches, media, generated assets and fallback paths are enumerated and browser-tested in the exact artifact. |
| PR-04 | SPECIFIED | FIX BEFORE LAUNCH | Execute controlled real-service verification. | Buttondown, Supabase, Hyvor, Workers and sharing/auth flows remain NOT TESTED without approved mutations. | Test accounts/addresses and rollback/cleanup plan prove success, validation, error, retry, rate/CORS, privacy and idempotency; secrets never logged. |
| PR-05 | SPECIFIED | FIX BEFORE LAUNCH | Define shared privacy-safe analytics event dictionary and delivery health checks. | Plausible/Clarity embed presence is not an instrumentation or learning loop. | Event names/properties/privacy/owner/retention and production delivery test exist; product owners supply semantics and interpretation. |
| PR-06 | SPECIFIED | FIX BEFORE LAUNCH | Run representative browser/accessibility/performance suite. | Existing fallback route checks lack field LCP/CLS/INP, full keyboard/screen-reader and real-device coverage. | Named mobile/desktop/browser/device set; Core Web Vitals trace or explicit limitation; accessibility errors classified/owned. |
| PR-07 | SPECIFIED | FIX BEFORE LAUNCH | Formalize rollback, correction and incident runbook. | A deployment is not recoverable merely because an older commit exists. | Tested rollback target/process, service incident paths, evidence capture, owner/escalation, public correction and post-incident retest. |
| PR-08 | SPECIFIED | FIX BEFORE LAUNCH | Establish daily/weekly shared health and freshness checks. | Cron/workflows, sources and services can silently stop after release. | Bounded scheduled/triggered checks report route/build/service/analytics/freshness state to one evidence record; failures notify a named owner. |
| PR-09 | CAPTURED | POST-LAUNCH EXPERIMENT | Build privacy-bounded observability dashboard. | Could speed diagnosis only after event semantics and privacy controls are real. | Aggregated health/SLO/error view with no private content, clear limits and alert ownership. |

## Do not pursue without new evidence

- Calling a build, HTTP 200, deployment, cron run, analytics tag or code path “live” as a substitute for a public complete journey.
- Logging secrets, private content, raw session replay, user prompts, emails or referral data to debug reliability.
- Global platform changes that mask a product-specific broken promise instead of returning it to the responsible champion.
