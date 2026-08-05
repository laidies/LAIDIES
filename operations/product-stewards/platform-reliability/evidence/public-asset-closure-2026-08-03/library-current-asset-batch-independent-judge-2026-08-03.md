# Independent asset-authority judgment — current LIBRAiRY 19-asset batch

**Verdict:** `PASS — EXACT 19-PATH LIBRARY-ONLY ACTIVE BATCH ACCEPTED`  
**Judged:** 2026-08-03T16:07:12-0700  
**Scope:** one exact enumerated registry batch for the current `library.html` visual consumer only. No source, builder, manifest, deployment, publication, book-admission or content-release action occurred in this judgment.

## Bound inputs independently verified

| Input | Verified exact value |
| --- | --- |
| Current candidate | `library.html` SHA-256 `7f0a4ca7b27fbc0ffde7b00773cf80dfeec443a1a8a9acbb97541b1e3f7bcb38` |
| LIBRAiRY owner reconciliation | `library-current-asset-owner-reconciliation-2026-08-03.json` SHA-256 `39046596c52cceb65cbea294e9bd97bf5fbc546a6d708e4617e4f2068fa86839` |
| Current owner inventory | `VISUAL-ASSET-INVENTORY.md` SHA-256 `731001b9755f6f3593c3d12c21e991edfda99f67af30318aa566bcf056f260b6` |
| Brand/visual judgment | SHA-256 `51b262516ce1cbee6678e949ef03a48672aac0b370beb1f48dca904fb1cd40e3` — exact-byte visual `ADMIT` |
| Product/UX judgment | SHA-256 `cdf3ad2db6e12b3166fead414aee15ed7a21fbd418fbaa03129fd13493a37313` — bounded local `PASS` |
| Runtime-family manifest | SHA-256 `0eec69f1053eb74c924eed55e10af996bce307420140dd2878eb04a65f7574a7` — 14 Library bright-family members |
| Public inventory | SHA-256 `c812be84600edd562d699de1abb5000faf6574fa89370bd22b77b898270db0f7` — 581 binaries, ACTIVE=2, default-denied=579, prohibited source references=21, missing=0 |
| Active registry before integration | SHA-256 `40558077f56c372d8beac10706a65604d5347a05fe835a53285d4b05f1ece927` — default `DENY` |

## Independent findings

All **19/19** owner-listed binary hashes match direct SHA-256 recomputation. All 19 are source-consumed by the exact candidate: five are literal route references (arrival image, three signs and the case); fourteen are the current `library-bright-family-v2` runtime members used by the frozen listed catalogue. The inventory independently marks all 19 `UNREGISTERED_DEFAULT_DENY`, with no semantic non-admit or restricted-source flag.

The correction holds: the current source contains `img:''` on the legacy `listed:false` Vocab record, contains no `textbook-vocab-101.png` string, and the current runtime family contains 14—not 15—members. This corrects the prior overbroad 20-asset proposal rather than admitting a hidden fixture.

Calibration is meaningful: replacing the required masthead checksum with `00f0385499b96cdb3ebaf2a18c6cb012b5481189ddb24d898c61180101cc86ba` fails against the direct actual checksum `f0f0385499b96cdb3ebaf2a18c6cb012b5481189ddb24d898c61180101cc86ba`.

The current owner inventory explicitly supersedes the stale sign `VISUAL REWORK REQUIRED` disposition for the exact mounted-fascia use. The Brand decision independently accepts that use, and the owner reconciliation records every bright-family cover as visual-only / content-held. This is now sufficient LIBRAiRY-owner plus Brand authority for this **enumerated, Library-only** asset batch; no additional Ali visual review is required for this registry admission.

## Accepted registry scope — exactly these 19 paths

```text
assets/building-interiors/delivery-20260722-library-interior-reroll-v1/library-interior-from-credits-dechromed-v3-lighter-carpet.png
assets/building-interiors/library-shelf/delivery-20260721-signs-v1/library-shelf-sign-101s-v1.png
assets/building-interiors/library-shelf/delivery-20260721-signs-v1/library-shelf-sign-tools-v1.png
assets/building-interiors/library-shelf/delivery-20260721-signs-v1/library-shelf-sign-reference-v1.png
assets/building-interiors/library-shelf/delivery-20260722-3bay-wall-case-v2-even-spacing/library-wall-case-3bay-v1.png
assets/library-101/bright-family-v2/book-chatgpt.png
assets/library-101/bright-family-v2/book-claude.png
assets/library-101/bright-family-v2/book-copilot.png
assets/library-101/bright-family-v2/book-gemini.png
assets/library-101/bright-family-v2/book-how-to-check-ai-work.png
assets/library-101/bright-family-v2/book-perplexity.png
assets/library-101/bright-family-v2/book-straight-answers-about-ai.png
assets/library-101/bright-family-v2/book-the-prompt-cookbook.png
assets/library-101/bright-family-v2/book-what-not-to-paste.png
assets/library-101/bright-family-v2/book-whos-who.png
assets/library-101/bright-family-v2/textbook-accounts-101.png
assets/library-101/bright-family-v2/textbook-briefing-101.png
assets/library-101/bright-family-v2/textbook-concepts-101.png
assets/library-101/bright-family-v2/textbook-setup-101.png
```

## Explicit exclusion

`assets/library-101/bright-family-v2/textbook-vocab-101.png` (`6e5675686526d31c213ef83253966a4e6e0bba767efe555db46fe0ee6828ee00`) remains default-denied and excluded from both runtime family and registry batch. It is a non-rendering legacy fixture, not a current visual asset.

## Conditions on Platform integration

Platform may now create the 19 exact `ACTIVE` registry entries, each binding the path, verified hash, `library.html` consumer and the visual-only scope above. It must retain the default-deny policy, leave every other binary denied, and then rerun builder/inventory parity and exact Library checks against the resulting registry.

This PASS does **not** make any book `available`, add a book source to `ADMITTED_BOOK_RECORDS`, approve sources/currentness, permit a reader, change Puffy/Closet authority, pass the remaining 21 prohibited source references, pass the whole public build, authorize deployment, publish content, or verify anything publicly. All of those remain separate holds.
