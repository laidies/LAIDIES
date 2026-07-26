# Post Office — Independent Repair 1 Rejudge

**Date:** 2026-07-26  
**Scope:** Service-truth P0 Repair 1 only  
**Decision:** **PASS — bounded Repair 1 accepted locally; product promotion remains held**

## Executive verdict

Repair 1 closes the prior independent P0 failure. The Post Office archive now treats its data file as untrusted input, rejects hostile or non-canonical image and issue paths before building any archive DOM, and makes zero attacker-origin attempts in the fresh source and release-artifact browser suites. A postcard signature is now presentation text only: it can appear in the local preview and native-share/copy text, but not in the canonical postcard URL, local storage or custom analytics fields.

The repaired product, accuracy/privacy/trust and LAiDIES-brand floors all pass. This is not launch approval: provider, identity, analytics, native-device, owner-visual, reward and public-origin evidence remain outside this bounded repair.

The independent rejudge found one new **P1 data-integrity defect**: two identical published episode records render as two archive cards. Duplicate episode numbers and issue URLs are not rejected. That is not a reopening of the original privacy/trust P0, but it must be repaired before product promotion.

## Weighted score and non-compensable floors

| Dimension | Score | Rejudge |
|---|---:|---|
| Product usefulness and coherence | 18/20 | Pass |
| Accuracy, privacy and trust | 18/20 | Pass |
| LAiDIES brand contribution | 18/20 | Pass |
| UX and accessibility | 17/20 | Pass locally; native assistive-tech evidence held |
| Technical and data integrity | 16/20 | P1 duplicate-record defect; large artifact |
| **Total** | **87/100** | **Bounded PASS** |

Non-compensable floors:

- **Product:** 18/20 — pass.
- **Accuracy/privacy/trust:** 18/20 — pass.
- **LAiDIES brand:** 18/20 — pass.

## Evidence examined

- Prior independent failure: `independent-review-service-truth-p0-2026-07-26.md`
- Repair packet: `build-packet-service-truth-repair-1-2026-07-26.md`
- Maker evidence: `maker-evidence-service-truth-repair-1-2026-07-26.md`
- Exact shared/runtime sources: `post-office.html`, `postcard.html`, `content/site/post-office.js`, `content/site/sv-global-header.js`, `content/site/sv-welcome-tour.js`, `content/site/sunnyvaile-directory.js`, `index.html`, `preview-homepage.html`, and `chick-flicks.html`
- Deterministic source and artifact contract/browser suites
- Repair 1 loaded desktop/mobile screenshots, inspected as decoded images rather than accepted from filenames or claims

## Archive parser rejudge

The parser admits only canonical same-origin paths:

- images under `/assets/` with an admitted raster extension;
- issue links matching `/issues/issue-NN.html` or `/issues/issue-NNN.html`.

It rejects leading/trailing whitespace, control characters, backslashes, percent encoding, query strings, fragments, protocol-relative paths, repeated leading slashes, empty/dot/traversal segments, absolute external URLs and unexpected local routes.

The supplied 64-check browser suite attacked protocol-relative image and issue paths, absolute external paths, encoded origin syntax, backslashes, control characters, traversal, an unexpected route and malformed JavaScript-style values. Every hostile row produced the visible fail-closed archive state, created no archive link or image, and made zero attacker-origin attempts. The implementation validates every published row before replacing the archive DOM, so a valid row cannot partially render beside a malformed row.

Additional independent attacks covered image query strings, issue fragments, encoded traversal, issue backslashes and a mixed valid/malformed dataset. All failed closed with zero archive nodes and zero attacker-origin attempts.

### New P1: duplicate published rows

Two identical admitted published rows currently render twice. The next smallest repair must:

1. require unique positive integer `episode.number` values across admitted published rows;
2. require unique canonical `issueUrl` values;
3. fail the entire archive closed before DOM replacement on exact or conflicting duplicates;
4. add source and release-artifact fixtures proving no partial DOM and no external attempt.

## Signature and privacy rejudge

The optional signed handle:

- is normalized and capped at 24 characters;
- appears only in the visible postcard preview and share/copy message text;
- is excluded from the canonical `?pc=<public-card-id>` URL;
- is not persisted in local storage;
- is not placed into a custom analytics payload.

The fresh browser suite covered empty, leading-`@`, Unicode and maximum-length signatures plus native-share text and URL exclusion. The static contract also rejects private note/handle/message fields in custom Plausible payloads.

This does **not** establish provider-side analytics privacy. Microsoft Clarity remains present, so actual provider masking and captured payloads remain a promotion hold.

## Shared experience/copy reconciliation

The shared header, homepage, preview homepage, Chick Flicks, directory and welcome-tour language now consistently describes:

- an **Account status** surface rather than an available sign-in flow;
- newsletter **requests** rather than guaranteed delivery or membership;
- local postcard selection/sharing rather than a tracked delivery lifecycle;
- held account functionality without invented account, reward or delivery outcomes.

No reviewed shared surface makes the removed sign-in, delivered-email, opened-postcard or reward-lifecycle claims. `preview-homepage.html` is source-only and is not included in the public artifact.

## Loaded visual evidence

The three Repair 1 evidence PNGs decode successfully and visibly contain populated imagery:

- Post Office desktop: 1440 × 5412, 18/18 expected images loaded.
- Post Office mobile: 320 × 6918, 18/18 expected images loaded.
- Postcard mobile: 320 × 3789, 15/15 expected images loaded.

The reviewed frames are legible and coherent with the comic Post Office direction. Owner visual approval and native-device visual/accessibility checks remain separate holds.

## Fresh release-artifact verification

Fresh artifact:

- Path: `/tmp/laidies-post-office-r1-rejudge.OKQ4oi`
- Contents: 1,081 files
- Size: 959.56 MiB
- Builder result: success, with the existing over-750-MiB warning
- Public metadata validator: pass
- Exact source/artifact runtime parity: pass

Fresh artifact test results:

- Post Office local contract: **PASS**
- Post Office browser suite: **PASS — 64 checks**
- External attempts blocked by the deterministic harness: 51
- External requests completed: 0
- Attacker-origin attempts from hostile archive fixtures: 0

Artifact SHA-256 values:

| Runtime file | SHA-256 |
|---|---|
| `post-office.html` | `0553f954fcdd8dd360389ec8a5225e4caa420a5440be799b9534211e38071b6c` |
| `postcard.html` | `058a55537782f0082c141d602cf520c6b87f13b44e383d33e5e1e8d9cc0b8dfd` |
| `content/site/post-office.js` | `9190de21d1db79e35a977e695d6b4b39e445b0852883154c204f147da74794f7` |
| `content/site/sv-welcome-tour.js` | `5d36298d6c41b0476a356da223ca43926cadec78ff2b43073b4c613053071511` |
| `content/site/sunnyvaile-directory.js` | `f96b8b7f3fcec181f7953a251888b09e87c6e7092b36b586b10fb4c2967b5151` |
| `content/site/sv-global-header.js` | `f500707712e100e45d972daada9dc60a7801ced07f6f517ff8c41752d2761d93` |
| `index.html` | `1a07003d01a9344898eda7fd359581fa60fe491622e0219fb82374e8f49c2d79` |
| `chick-flicks.html` | `990b4123d4945499c00aee5ed63791b2d6be3ab4404f61e6cdcd6aa1abbc4381` |

## Exact remaining holds

The bounded Repair 1 pass does not clear:

1. the duplicate-archive-row P1 above;
2. Buttondown provider acceptance, confirmation, duplicate, unsubscribe, delivery and failure receipts;
3. Supabase magic-link and session lifecycle;
4. Clarity masking and actual analytics payload evidence, including legacy-query retention at the CDN/provider boundary;
5. native Safari, VoiceOver, TalkBack, zoom/reflow and real mobile-share evidence;
6. owner visual approval;
7. any referral/reward lifecycle;
8. the 959.56 MiB artifact-size warning;
9. deploy and public-origin verification.

No public sign-in, newsletter-delivery, postcard-delivery/open, account or reward claim is accepted by this report.

## Learning scan

Qualifying reusable prevention rule: validate collection-level invariants, not only each record. A parser can correctly reject hostile fields while still admitting duplicate canonical identities. Add duplicate exact/conflicting fixtures to future archive and registry contracts before promotion. The parent release owner should reconcile this lesson with the canonical pain-points ledger; this independent rejudge intentionally changed no shared operating record.
