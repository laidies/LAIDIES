# Resident Card Repair 1 maker evidence

**Date:** 2026-07-26  
**Verdict:** **LOCAL REPAIR PASS — READY FOR INDEPENDENT REJUDGE**  
**Maker score:** **82/100**

## Reproduced before repair

The independent payload was reproduced against the source Closet:

```text
judge_xss=1
avatar_html=<img src="/assets/nope.png"
  onerror="window.__residentJudgeXss=1" x=""
  alt="Resident Card portrait" ...>
```

## Result after repair

The same fixture returns:

```text
judge_xss=0
avatar_html=
card_name=Your Name
```

The rejected record is not treated as a supported Card anywhere.

## Source evidence

- Shared validator: **34/34 PASS**
- Cross-product static contract: **31/31 PASS**
- Whole-journey browser suite: **127/127 PASS**
- MAiKEOVER existing browser suite: **PASS**
- Inline JavaScript: **351 scripts / 132 pages PASS**
- Local links: **1,968 references / 110 pages PASS**
- Town contract: **PASS**
- `git diff --check`: **PASS**

The hostile matrix includes exact quote/attribute XSS, JavaScript/data/
external/protocol-relative/traversal/double-slash/encoded/query/fragment/SVG
avatar values, malicious avatar slugs, malformed JSON, null/array/extra/plain
object violations, prototype-shaped keys, unknown fields, markup/control/bidi/
overlength text and old per-field records. It asserts zero execution, event
attributes, unsupported avatars, prototype pollution, page errors and
reward/community mutation across Resident status, Closet and Sorority House.

## Fresh exact artifact

- Path: `/tmp/laidies-resident-card-repair1-final.5TabWG`
- Files: **1,087**
- Size: **959.59 MiB**
- Missing dependencies: **0**
- Oversized dependencies: **0**
- Internal 750 MiB warning remains a portfolio/release hold.
- Shared validator: **34/34 PASS**
- Cross-product contract: **31/31 PASS**
- Whole-journey browser suite: **127/127 PASS**
- SHA-256 parity: **PASS** for `resident-card.html`,
  `resident-card-v2.js`, `resident-card-contract-v1.js`,
  `laidies-card.html` and `maikeover.html`.

## Score

| Independent-compatible category | Maker score | Basis |
|---|---:|---|
| Product clarity and newcomer/returning UX | 17/20 | Adds non-destructive legacy-review state |
| Accuracy, privacy and trust | 18/20 | Shared fail-closed boundary; independent acceptance open |
| LAiDIES brand contribution | 14/20 | No visual redesign; owner approval open |
| Accessibility and resilience | 15/20 | Chromium/reflow/error fixtures pass; native gates open |
| Technical contract and release evidence | 18/20 | Source/artifact hostile parity and exact bytes; no committed/public proof |
| **Total** | **82/100** | **Independent rejudge and release holds remain** |

## Remaining holds

- Independent Repair 1 rejudge
- Ali visual/taste and newcomer-comprehension approval
- Shared-header Account status / Join reconciliation
- Safari, VoiceOver and 200%/400% zoom
- Privacy-safe analytics/VOC
- Account/public Card/reserved-handle/cross-device architecture
- Committed release provenance and public-origin verification
- Deployment
