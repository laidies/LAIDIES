# Resident Card independent review — Cycle 6 local identity P0

**Judge:** independent product/security/accessibility review
**Date:** 2026-07-26
**Candidate judged:** uncommitted local Cycle 6 Resident Card slice
**Verdict:** **FAIL — FIX BEFORE PROMOTION**

The status route itself is materially improved and its local-only language is
clear. It does **not** clear the Resident Card P0, because its supported
"Open this device’s Closet" continuation consumes the same untrusted envelope
without the status route’s validation. A malformed local `cardAvatarUrl`
executes JavaScript in the Closet. That is a cross-product contract break, not
a cosmetic issue.

This report is independent of the maker’s 71/100 score and 19/19 + 28/28
claims. It does not modify runtime code, maker evidence or public state.

## Scope and provenance

- Read the Resident Card charter, operating spec, deep dive, build packet,
  evidence, external-capability review, state and backlog.
- Read the active-work, ledger, champion contract/orchestrator and the shared
  MAiKEOVER, Closet and Sorority House contracts.
- The candidate is currently unstaged/uncommitted: `resident-card.html`,
  `content/site/resident-card-v2.js`, its two tests and its dossier directory.
  `laidies-card.html` and `maikeover.html` are pre-existing tracked shared
  consumers/producers, not modified by this candidate.
- A fresh artifact was built at
  `/tmp/laidies-resident-card-judge.PGq5d3`: 1,083 files, 959.57 MiB, no
  missing or oversized dependency reported by the builder. Candidate and
  artifact bytes matched for `resident-card.html`,
  `content/site/resident-card-v2.js` and `laidies-card.html`.
- No deployment, provider call, account operation, social/public action or
  approval was performed.

## Reproduction and evidence

The supplied checks reproduce as passing, but they are not sufficient:

- `node scripts/check-product-stewards.mjs` — PASS (`products=65`, `active=0/3`).
- Fresh artifact: `scripts/test-resident-card-contract.mjs` — PASS 19/19.
- Fresh artifact: `scripts/test-resident-card-browser.mjs` — PASS 28/28.

The independent adversarial fixture set one local value only:

```json
{
  "version": 1,
  "fields": {
    "displayName": "Judge",
    "cardAvatarUrl": "/assets/nope.png\" onerror=\"window.__residentJudgeXss=1\" x=\""
  }
}
```

On the fresh artifact’s `/laidies-card.html`, `window.__residentJudgeXss`
became `1`. The resulting DOM was:

```html
<img src="/assets/nope.png" onerror="window.__residentJudgeXss=1" x="" alt="Resident Card portrait" style="width:100%;height:100%;object-fit:cover;">
```

Cause: `laidies-card.html` accepts any v1 object shape at lines 2072–2107,
copies `cardAvatarUrl` unchanged, then concatenates it into `innerHTML` at
lines 2164–2166. The status route correctly applies an allowlist, bounded text
test and `textContent`, but the supported Closet continuation bypasses all
three. The `^/assets/` prefix check is not HTML-attribute escaping.

## Scoring

| Category | Score | Judge finding |
|---|---:|---|
| Product clarity and newcomer/returning UX | 16/20 | Status states are legible; no email/account ambiguity on this route. |
| Accuracy, privacy and trust | 5/20 | P0 cross-product stored-XSS defect; trust floor fails. |
| LAiDIES brand contribution | 14/20 | Intentional local-card voice and visual direction, but owner visual approval remains open. |
| Accessibility and resilience | 15/20 | DOM status semantics, link actions, narrow-width and Chromium keyboard checks pass; native Safari/VoiceOver/zoom remain unproved. |
| Technical contract and release evidence | 8/20 | Status reader is fail-closed, yet its declared Closet continuation breaks the same contract. Fresh artifact was local only. |
| **Total** | **58/100** | **FAIL** |

### Non-compensable floors

- **Trust/security floor: FAIL (5/20; required 17/20).** Local data is not
  automatically harmless when it is rendered into the shared site origin.
- **Technical/product-boundary floor: FAIL (8/20; required 17/20).** One
  product cannot claim a safe projection while its named consumer reads a
  looser projection from the same authority key.
- **Release floor: HOLD.** Native accessibility, owner visual/comprehension,
  exact committed binding and public-origin proof are not present.

## What did pass within the narrow status route

- Empty, saved, invalid/unsupported and storage-denied states are distinct and
  non-destructive.
- Unknown fields and markup-like display names are not rendered on the status
  route.
- The route has no email form, magic-link/account SDK/config or account/profile
  backend request.
- The local handle is correctly presented as a draft label, not an account or
  entitlement.
- Invalid records do not reveal the Closet shortcut on the status route;
  Chromium 320/390/1280 reflow/focus checks pass.
- The shared Sorority House copy observed does not use a local Card as Hyvor
  sign-in or room authority. This does not mitigate the Closet XSS.

## Required repair order

1. **P0 — create one shared read-only Card projection/validator.** It must be
   used by Resident Card status, Closet and every other consumer of
   `laidies_resident_card_v1`; reject non-plain objects, unknown fields,
   overlong/control/bidi-unacceptable strings and malformed values. A record
   rejected by this projection must not render as a supported Card anywhere.
2. **P0 — remove string-built avatar HTML.** Build the image with DOM APIs;
   allow only a canonical, decode-tested same-origin asset path or a tightly
   specified safe image representation. Do not use prefix regexes as HTML
   escaping. Treat `data:` conservatively; it is not needed for the local-card
   P0 unless separately safety-reviewed.
3. **P0 — test the whole declared continuation.** Add fresh-artifact browser
   fixtures for quote/attribute injection, `javascript:`, malformed JSON,
   `null`, arrays, prototype-shaped fields, overlength/control/bidi text,
   bad avatars and old per-field records. Assert no executable DOM, no console
   error, no unsupported field output and no privilege/reward/community change
   in Resident Card, Closet and Sorority House.
4. **P1 — reconcile producer/consumer migration.** The status page labels
   legacy fields unsupported while MAiKEOVER imports them. Define one explicit
   read-only legacy-detection/recovery message so a returning pre-envelope user
   is not told to make a first card; do not silently upgrade/delete the record.
5. Re-run independent source, source-browser and exact-artifact checks. Only
   then proceed to owner visual/comprehension, native Safari/VoiceOver/zoom,
   committed provenance and public-origin gates.

## Packaging allowlist after repair

Only stage these paths plus a new independent rejudge report and any explicitly
required product-state reconciliation:

- `resident-card.html`
- `content/site/resident-card-v2.js`
- `scripts/test-resident-card-contract.mjs`
- `scripts/test-resident-card-browser.mjs`
- `operations/product-stewards/resident-card/**`
- the smallest necessary `laidies-card.html` hunk **only** for the shared safe
  projection/DOM avatar repair
- a new shared validator file, if introduced, and its exact test

Do **not** stage unrelated dirty work, raw visual evidence from other lanes,
the historic release packet, or unrelated MAiKEOVER/Closet changes. Do not
deploy this candidate.

## Remaining holds after the P0 repair

Ali’s visual/taste approval, newcomer comprehension evidence, native
Safari/VoiceOver/zoom, privacy-safe analytics/VOC, account/public/handle/
cross-device architecture, exact committed artifact provenance and public
verification all remain separate holds. This review makes no visual approval
judgement beyond noting that the supplied 320px and 1280px captures are
mechanical evidence, not Ali approval.
