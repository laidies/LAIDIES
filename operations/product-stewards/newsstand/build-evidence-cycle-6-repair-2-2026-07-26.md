# NewsStand Cycle 6 Repair 2 maker evidence

**Status:** BUILT LOCALLY — INDEPENDENT REJUDGE REQUIRED; release HOLD**

Repair 2 addresses only the two rejudge blockers. History restoration now
records requested, reachable/clamped and actual scroll values. It settles
against the current reachable range rather than retrying an obsolete saved
offset indefinitely. Candidate routing additionally rejects duplicate/empty
Daily/Weekly work arrays, empty Breaking interruption proposals, unknown check
keys, impossible calendar dates and future/stale dates. Outcomes remain only
`REJECT` or `HOLD_FOR_INDEPENDENT_REVIEW`; publication authority remains false.

Maker checks: review-router PASS; reader contract PASS (10 fixtures); browser
PASS (89 checks); story validator PASS; scoped diff check PASS. No story,
feed, credential, visual, publication or deploy action occurred.

Still held: independent source/artifact rejudge; raw duplicate-key parsing and
cross-run candidate ledger; immutable receipts/claim binding/independent
authority; all four representative publication operations; visual approval;
native accessibility; analytics; deployment/public proof; artifact-size risk.

Rejudge allowlist: `newsstand.html`, `scripts/evaluate-newsstand-autopublish.mjs`,
`scripts/test-newsstand-autopublish-policy.mjs`, reader contract/browser tests,
`operations/newsstand-autopublish-policy.json`, and this evidence. Do not
package candidates, raw inputs, operations records or credentials.
