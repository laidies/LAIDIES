# SEC 8-K repair handoff — private candidate only

## Exact stale prose

`story.json` and the bound producer/reviewer artifacts say: “We have not
verified a closing timetable.” That is stale after the current SEC Form 8-K.

## Minimal corrected prose

Replace the third `what_this_means` paragraph with:

> The next concrete developments to look for are confirmation that the deal has
> closed, published changes to platform terms, and evidence about the options
> builders can actually use. NVIDIA's September 3 SEC filing says it expects
> the transaction to close in the first half of 2027, subject to customary
> closing conditions and regulatory approvals. That is an expectation, not a
> completed deal. The company's commitment is something to check against those
> developments, rather than a result we can report in advance.

Add `nvidia-sec-8k-2026-09-03` to the public story source list and a
`closing-expectation-and-conditions` claim-map row bound to
`sec-8k-primary-verification.json`. Update the producer's limit answer,
explain-back and freshness trigger to distinguish an expected close from an
actual close.

## Admission boundary

The complete-story bytes change, so the former producer and independent PASS
records remain historical only. Reader-review reuse is unavailable. Regenerate
the exact story, rendered HTML, review text, source packet, producer review,
claim map and ordinary candidate; then run a new full independent editorial and
factual review. Only a new PASS assembly can be registered in the recovery
queue. This handoff is not ready for queue admission.
