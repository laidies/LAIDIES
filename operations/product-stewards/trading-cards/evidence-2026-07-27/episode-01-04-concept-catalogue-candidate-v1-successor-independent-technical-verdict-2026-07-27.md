# Episode 01–04 Concept Catalogue Candidate v1 Successor — Independent Technical Verdict

**Verdict:** ACCEPT — exact candidate catalogue only. This supersedes the narrow contract-shape HOLD in `episode-01-04-concept-catalogue-candidate-v1-independent-technical-verdict-2026-07-27.md`.

## Frozen tuple

| Input | SHA-256 |
|---|---|
| Builder | `7bc6391ce85d4fae0d2be0b42b17b459bb92c09a25ba88611643bc905a6cfb72` |
| Candidate catalogue | `e1f13299417d38853a234de2838ed305a56fbb0716dcc2a81aa5f4602cf4658b` |
| `CARD-MATRIX.md` | `233ed575aabfa9afca874b2fd8d4cd88e14d7debae623a134ed7454fe1b74071` |

## Independent results

- Exact matrix hash matches candidate; independently parsed comparison found **20/20** card keys, title/hook, back heading/copy, source locator, alt-front seed and pack key exact.
- **20 unique immutable card keys**; exactly five each in `s01:e01`, `s01:e02`, `s01:e03` and `s01:e04`.
- Recomputed every front image against both catalogue and episode manifest: **20/20 SHA-256 exact**; full per-image inventory remains bound in the predecessor verdict.
- Recomputed all six unique review receipt hashes, unchanged from the predecessor verdict: E01 front `160a35cd…a037`; E01 Human Judgment v3 successor `2803c327…1712`; E02 `392e2323…4556`; E03 `cf758943…5efc`; E04 front `4dd7d12c…a39c`; E04 AI Winter v2 successor `cf5ac95a…9ded7`.
- All required `OPERATING-SPEC.md` fields now exist on every card. The repair correctly supplies both singular `visual_review_receipt` and `editorial_review_receipt` fields in addition to the supplemental plural provenance arrays.
- Receipt selection is exact: E01 Human Judgment uses its v3 successor receipt; E04 AI Winter uses its v2 successor receipt; all other cards use their accepted episode-front receipt.
- Isolated rebuild reproduced byte-identical candidate SHA `e1f13299417d38853a234de2838ed305a56fbb0716dcc2a81aa5f4602cf4658b`.
- Fail-closed probes still pass: stale manifest image hash exits non-zero with `image hash mismatch`; missing front image exits non-zero with `ENOENT`.
- Candidate boundary remains honest: status `candidate_unadmitted`; each card is `candidate`; backs are real text with `image_back_or_rendered_copy: null`; `identity_ref` and `alt_back` remain deliberately null. No card or pack is admitted, openable, owned, rewarded or public.
- `node scripts/check-product-stewards.mjs --owner-entry trading-cards` and scoped `git diff --check` PASS.

## Remaining boundary

This is a checksum-bound technical catalogue candidate acceptance only. It does not admit any card, back artwork, pack, binder, ownership, reward, opening flow, public route, release or deployment. Accessibility, technical catalogue/platform, product/ownership and pack-admission reviews remain separate.

**Authority truth:** The independent judge changed only this evidence file. No builder, catalogue, card image, manifest, live-card data, pack, reward, public route, deployment, spend or external service changed.
