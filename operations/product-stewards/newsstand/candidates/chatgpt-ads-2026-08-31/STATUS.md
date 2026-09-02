# REVIEWED — ready for issue admission, not published

Private ordinary-news candidate only. No issue admission, canonical promotion or
deployment has happened yet. The headline and full reader text are in `article.md`;
the exact record and review boundary are `story.json` and `review-text.json`.

The current exact prose now has a different-model independent editorial PASS in
`independent-review-final-v2.json`, bound to the factual claim map, source receipts,
the ordinary-news explanation policy and `independent-raw-report-final-v2.json`.
It explicitly records AI editorial assessment rather than observed human evidence,
and does not claim browser, native-zoom or public-release verification. The passing
receipt validates structurally with `scripts/check-prose-quality-admission.mjs`.

The first attempted cross-family review produced zero output. The provider
reported `stop_reason: refusal`, `terminal_reason: api_error`, request
`req_011Ceb2HgB37UTYcpk455Lxd`. `independent-attempt-failure.json` retains the
observed failure and the limitation that the wrapper did not persist its raw
response before throwing. This is neither a positive nor negative prose verdict.
The wrapper now saves a failed response before throwing, but was not rerun.
That attempt remains a failure and is not treated as a verdict. A separately
authorized Cloudflare Workers AI review used a different model family from the
producer and produced the bound PASS above. Intermediate provider outputs and
corrections are retained as audit evidence; only the `-final-v2` receipt, analysis
and report form the candidate's independent admission chain.

The exact attempted input remains in `failed-attempt/review-text.json`, SHA-256
`25dace0a3b013f2b55291cc023c8e578809767269024bd80910701c8ef81b05f`.
The other files there preserve the original draft/manifest/producer bytes as
historical evidence, not current valid review chains. Their original embedded
paths have not been rewritten to masquerade as new review.

After the failed attempt, a maker metadata error was corrected: `updatedAt` and
`lastCheckedAt` had been set later than the original producer review. They now
use its observed August31 14:55:47.941Z checkpoint. The full article was reread;
reader prose and source claims were not changed. Current manifest and producer
self-review bind the corrected record. This does not renew, replace or imply
independent review, nor is it grounds to retry a refused request.

Sources were read from the exact OpenAI announcement and two current help pages.
The article distinguishes announced expansion from country-by-country availability,
OpenAI's claims from independent verification, and conversation context from ad
personalisation. The saved source notes are bounded evidence excerpts, not full
copied editions. No current user-account experiment or independent ad-system audit
was performed. Recheck rollout status before any later review/publication.
