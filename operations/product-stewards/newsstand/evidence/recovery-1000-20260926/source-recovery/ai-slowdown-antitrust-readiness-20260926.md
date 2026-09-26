# Buist AI-slowdown complaint — private readiness check (2026-09-26)

**Verdict: HOLD — viable allegation-only Daily story, but not ready for an independent review or issue admission.** The primary filing is present and the draft has the right core limit (a complaint is not a finding). Its production package is incomplete, its docket/response freshness has not been bound into the candidate, and there is no admitted art. No public or candidate file was changed.

## Evidence recovered and limits

- The retained primary is the 29-page complaint, `sources/complaint.pdf` (`cabf650266e3bfb5f6441d3b374c519a6600bc67fc8926093cf014aad6ff783f`), with matching text (`5949a985106dda6757673a5873d9e4406be64e8322f83fa34eb270ab67b4f85e`). The recovery record only inspected pages 1–5 and 22–29; its allowed claims are the named plaintiffs/defendants, allegations about subscription value, the distinction from independent safety actions, a *proposed* class, and requested relief. It also correctly records two claims in the filing, so the contrary one-claim secondary summary cannot be used.
- On 2026-09-26, CourtListener’s current docket page for case `3:26-cv-10693` displayed a September 25 last-known filing and September 21–22 summons/scheduling entries. That is newer procedural context than the candidate’s September 20 recovery, but this check did not recover a docket ruling, an amended complaint, or a company response. Bloomberg Law’s retained context says only that no immediate response was received as of September 18. The story must not say the allegations are proved, a class is certified, relief was granted, safety work is barred, or companies never responded.
- The current `research-recovery.json` hash is `1d2863a7f372ce473c6808753f4d2e75c746c27e8aa7ff063d27c0f09cb57680`; its 200-derived-word-per-source budget remains binding.

## Concrete blockers and producer work

1. **Complete the ordinary-candidate package.** The folder has only `prose-draft.json` (`PRIVATE_DRAFT_NOT_READY_FOR_REVIEW`), `writer-input.json`, the contract, and source material. It lacks the runtime-required `story.json`, `writer-input-current.json`, `producer-observations.json`, `story-type-coverage.json`, `producer-publication-review.json`, complete claim/source bindings, frozen publication base, and review text. This is a producer gate, not a missing-source excuse.
2. **Refresh and bind dated evidence.** Recheck the docket and company-response reporting at admission, then add exact passages/locations and preserve the allegation/procedural limits in the final claim map and source budget. The current CourtListener observation is useful routing evidence, not a complete new primary-evidence record.
3. **Supply the real learning connection.** The draft’s Class Notes link is still open; ordinary review requires an actual relevant admitted target, not a guessed section.
4. **Make and admit story-specific art.** The candidate contains no image or visual-admission record. Its producer contract says art is unmade/unadmitted. No existing approved art is attached or available for reuse here; MAiVEN and TRAiLBLAZER portraits must not be reused. The replacement needs descriptive alt text and admission before the editorial call.
5. **Run genuine reviews only after 1–4.** Producer self-review and the maker-independent editorial result are absent. At 2026-09-26T17:20:12Z, `claude auth status` returned `loggedIn: true`, Claude.ai/Max, exit 0. This removes the stale Keychain/login hold, but it does **not** prove an eligible reviewer has assessed this candidate. Do not manufacture a pass from authentication.

## Exact next gate command

After the producer has created the complete package and preserved a qualified calibration directory, run this no-spend preflight before any reviewer request:

```sh
node operations/product-stewards/newsstand/review-runtime/run-pilot.mjs article claude \
  --candidate-dir operations/product-stewards/newsstand/candidates/buist-ai-slowdown-20260920 \
  --calibration operations/product-stewards/newsstand/review-runtime/<qualified-calibration-dir> \
  --output operations/product-stewards/newsstand/candidates/buist-ai-slowdown-20260920/editorial-review-20260926-v1 \
  --preflight-only
```

Do not replace `<qualified-calibration-dir>` with an invented path. A clean preflight is the point at which the same command without `--preflight-only` may request the genuine independent review.
