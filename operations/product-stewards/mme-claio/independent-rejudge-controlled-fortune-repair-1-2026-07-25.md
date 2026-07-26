# Mme CLAi-O controlled-fortune Repair 1 independent rejudge

**Judge verdict:** **FAIL — ONE P0 DATA-CONTRACT REPAIR REMAINS**  
**Review date:** 2026-07-25  
**Authority:** Independent local source and exact-artifact review only. No
source, test, state, backlog, queue, painpoint, Git, deployment, public-origin
or external mutation was performed.

## Executive judgment

Repair 1 resolves the original product-intent, safety-router, benign
false-positive and safety-contrast failures. Mme CLAi-O no longer collects
free text or pretends to classify it. The visitor is plainly told that every
draw is one random authored card, not tailored to her, not an analysis or
answer, and not prediction or professional advice. A permanent, humane
high-stakes/current-information boundary remains visible before and after every
draw. The previously unreadable heading now computes to approximately 17.53:1
against its actual background.

The interaction, canonical history, count, keepsake, reset, responsive,
keyboard, live-status, redirect and separate-product contracts also pass the
maker suite under independent rerun against source and a fresh exact artifact.
The 100-card deck and delivered art set are unchanged.

One P0 remains. Badge timestamps are not validated according to the exact
contract. The implementation deliberately accepts timestamps up to five
minutes in the future and uses permissive `Date.parse` normalization. In both
source and the exact artifact:

- a badge dated one millisecond in the future was accepted;
- a badge dated 60 seconds in the future was accepted; and
- `2026-02-31T12:00:00.000Z`, an impossible calendar timestamp normalized by
  JavaScript, was accepted.

The operating specification and original P0 require invalid and future badge
timestamps to be discarded. The current contract test instead asserts the
five-minute tolerance, while the browser suite tests only a date 24 hours in
the future. This is an implementation-shaped evidence gap as well as a runtime
defect.

This is a narrow repair, but it remains a launch floor. The candidate must not
be described as release-ready until exact timestamp validation and the missing
adversarial fixtures pass source and fresh-artifact rejudgment.

## Original P0 disposition

| Original P0 | Verdict | Independent evidence |
|---|---|---|
| P0-1 — remove unsafe free-text classification | **PASS** | No textarea, `#claioQuestion`, `BOUNDARIES`, `classifyBoundary`, `showBoundary`, prompt selector or prompt event path exists in the governed page, CSS or enhancement script. Draws depend only on explicit deck activation. |
| P0-2 — make random/non-tailored mechanic explicit | **PASS** | Visible arrival copy says every draw is “one random authored card”; it is “not tailored,” does not “analyze or answer a question,” and is not “a prediction or professional advice.” The meta description carries the same truthful model. |
| P0-3 — repair the entire safety-state contrast | **PASS — automated proxy scope** | Rendered heading and paragraph compute as white over `#111735`, approximately 17.53:1. The white focus outline is 17.53:1 and cyan focus ring approximately 8.43:1 against the same panel. The boundary is permanently visible and programmatically focusable. |
| P0-4 — sanitize the complete local data contract | **FAIL — P0** | Count bounds, canonical history, forged copy, unknown card, oversized history, wrong-scope Hotline Regular, malformed structures and scoped reset pass. Any future timestamp within five minutes and an impossible-but-parseable calendar timestamp are trusted, contrary to the contract. |
| P0-5 — independent fixture gate | **PARTIAL FAIL** | Source/exact-artifact browser coverage is materially stronger and no longer tests a phrase router. However, the contract test explicitly requires the flawed five-minute future tolerance, and the rendered suite exercises only a +24-hour future badge. Near-future, invalid-calendar and parseable-non-ISO timestamp fixtures are missing. |
| P0-6 — independent judgment | **COMPLETE** | This rejudge was performed independently from the maker and reproduces the remaining defect in both source and a newly built exact artifact. |

## Quality floors

| Floor | Result | Evidence |
|---|---|---|
| Non-predictive product intent and accuracy | **PASS** | The ten-second mental model is explicit: random authored reflection, optional to keep/adapt/ignore, no tailoring, analysis, answer, prediction or professional authority. |
| Safety and humane boundaries | **PASS** | Arbitrary sensitive text is no longer collected. The permanent boundary names emergencies, immediate danger, personal safety/abuse, health, legal, financial and current-fact decisions, then routes humanely to local emergency services, a trusted nearby person, qualified professionals or reliable current primary sources. No location-specific number is invented. |
| Benign usefulness / false-positive control | **PASS BY DESIGN** | There is no classifier and therefore no route that can falsely block a harmless phrase or falsely reassure a dangerous paraphrase. Every visitor receives the same visible boundary and authored random-card mechanic. |
| Brand contribution | **PASS WITH OWNER HOLD** | The Y2K hotline/reading-room voice remains distinctive while the truth and safety copy are direct, non-performative and humane. Ali's visual/creative approval remains outside this judgment. |
| Keyboard, focus and live status | **PASS — automated Chromium scope** | Enter activation, draw locking, focused result, live completion status, focused reset return and permanent boundary focus all pass. |
| Contrast and accessible safety state | **PASS — automated proxy scope** | Heading, paragraph and focus colors clear 4.5:1 against their rendered panel. Safari, VoiceOver and native zoom remain held. |
| Reduced motion and reflow proxies | **PASS** | Reduced motion removes the timed reveal/smooth scroll. Source and exact artifact show no page-level overflow at 320 or 390 CSS pixels before or after a draw. |
| Local persistence, non-repeat and reset | **FAIL — P0 timestamp edge** | Valid count/history, returning non-repeat, count extremes, canonical display rehydration, history cap, unknown-card rejection, local keepsake and unrelated-badge preservation pass. Invalid/future badge timestamps do not fully fail closed. |
| Privacy | **PROVISIONAL PASS; PLATFORM/OWNER HOLD** | The reading surface collects no visitor-authored text and has no reading backend. Production Plausible/Clarity configuration and network/event-property behavior were not independently verified. |
| Redirect and product separation | **PASS LOCALLY** | Cocktail Fortune recovers to canonical Mme CLAi-O and describes the retired product honestly. Businesswomen's Special remains a separately framed drink picker with a spirit-free lane. |
| Exact artifact and integration integrity | **PASS LOCALLY** | Fresh 1,077-file / 961.39 MiB artifact matches all five governed source hashes. Exact-artifact browser, metadata, inline JavaScript, local links and town checks pass. The internal 750 MiB advisory remains. |
| Deck and art continuity | **PASS** | The governed deck still contains exactly 100 cards; its extracted source hash is `f3408d996e7628a52d6af65c69b2ad2c792fe86cc4b1ff87d96f3fe0a264c6c3`. No deck-entry diff was present. The 192-file reading-card set has aggregate review hash `ac231423f10307897fbfb17e798645bddfda555ce9434e8b2a32d35ed430e6c3`, with no asset diff. |
| Maintainability and evidence quality | **PARTIAL FAIL** | Removing the embedded keyword router substantially improves maintainability. Timestamp policy remains embedded as permissive parsing, and its test asserts implementation behavior rather than the stricter product contract. |

## Weighted score

Quality, accuracy/trust and LAiDIES brand contribution remain heavily
weighted. The score does not override the failed local-data floor.

| Dimension | Weight | Score |
|---|---:|---:|
| Safety, trust and humane handling | 25 | 23 |
| Product intent, accuracy and user truth | 15 | 15 |
| LAiDIES brand contribution and craft | 15 | 13 |
| UX and accessibility | 15 | 13 |
| Technical integrity and reliability | 15 | 11 |
| Privacy and data truth | 10 | 9 |
| Maintainability and evidence quality | 5 | 3 |
| **Total** | **100** | **87 / 100 — FAIL: P0 floor** |

## Independent evidence

### Source reruns

```text
node scripts/test-mme-claio-contract.mjs
MME CLAi-O CONTRACT PASS
deck_cards=100

PLAYWRIGHT_CORE_PATH=... node scripts/test-mme-claio-browser.mjs
MME CLAi-O BROWSER PASS
journeys=random-truth,no-free-text,keyboard,focus,live-result,non-repeat,
badge-local,scoped-reset,storage-denial,count-extremes,canonical-history,
unknown-card,future-badge,reduced-motion,320-390-reflow,contrast,redirect,
bws-boundary

obsolete prompt/classifier source scan: ABSENT
inline JavaScript: PASS — 353 scripts / 132 live pages
local links: PASS — 1,949 references / 110 pages
town contract: PASS
```

### Fresh exact artifact

Fresh independent build:
`/tmp/laidies-mme-claio-rejudge-r1.DzhnpX`

```text
Public artifact: 1077 files, 961.39 MiB
Warning: artifact exceeds 750 MiB.
exact-artifact Mme CLAi-O browser suite: PASS
public metadata validator: PASS
```

| Governed file | Matching source/artifact SHA-256 |
|---|---|
| `games/madame-claio.html` | `508783bcf297aecf5686df1f9dc64901961a5561d34fd8e1b5d7313d527f4f15` |
| `content/madame-claio-v2.css` | `3e01ae24344d99d416a6b8b43106ac84ae6164fa26f139407af19ccaa4cedf81` |
| `content/site/madame-claio-v2.js` | `567c2d0116ef2bc5abf62899945fb66d5bc00e0ea532cfd06e40a64d1914ed93` |
| `games/cocktail-fortune.html` | `0b1486e191272b7980d476ef35298bd866d8b01eee8ef5fa0cd56d4276f50603` |
| `games/businesswomens-special.html` | `80da00f08a31608bc89c15a078eefa6c100d91a3eb466ee7c978ece42c36e928` |

### Independent timestamp matrix

Synthetic badge records used no personal data and made no external mutation.
Each record was seeded before page initialization, then the repaired on-load
sanitizer result was read. Source and exact artifact produced the same result.

| Fixture | Expected | Source | Exact artifact |
|---|---|---|---|
| valid exact past ISO timestamp | preserve | preserved | preserved |
| `Date.now() + 1 ms` | discard | **preserved** | **preserved** |
| `Date.now() + 60 s` | discard | **preserved** | **preserved** |
| `2026-02-31T12:00:00.000Z` | discard | **preserved** | **preserved** |

Cause:

```text
const unlockedAt = Date.parse(member.unlockedAt);
unlockedAt > Date.now() + 5 * 60 * 1000
```

`Date.parse` accepts and normalizes more than the governed exact ISO timestamp
shape, and the five-minute allowance explicitly admits future evidence. The
contract test currently looks for that allowance, so it cannot catch this
contract breach.

## Required Repair 2

This packet has one bounded P0 repair:

1. Require the exact timestamp shape emitted by the product, for example
   `YYYY-MM-DDTHH:mm:ss.sssZ`.
2. Parse it and require `new Date(parsed).toISOString() === storedValue` so an
   impossible or normalized calendar value fails.
3. Require `parsed <= Date.now()` with no future tolerance.
4. Add independently authored source and exact-artifact fixtures for:
   - +1 millisecond and +60 seconds;
   - impossible calendar dates;
   - parseable but non-contract date strings;
   - malformed/non-finite timestamps;
   - one exact valid past timestamp;
   - future/invalid Hotline Regular and unrelated badge members;
   - preservation of unrelated valid members while invalid siblings are
     removed; and
   - scoped reset after sanitation.
5. Remove the contract assertion that requires the five-minute tolerance.
6. Repeat independent rejudgment of the timestamp/data gate. The other repaired
   P0s need regression reruns, not redesign.

## Preserved holds

This judgment does not clear or narrow:

- Safari keyboard, storage and motion behavior;
- VoiceOver reading, permanent-boundary, reset and returning-state
  announcements;
- native browser zoom/text scaling and real-device touch behavior;
- Ali's visual and creative approval;
- production Plausible/Clarity privacy configuration, masking, network
  behavior and event-property review;
- real public-origin canonical and retired-route behavior;
- exact release-artifact naming;
- backend/account reward claims;
- deployment, publication, promotion or any external mutation.

The fresh artifact is evidence only. It must not be deployed or promoted as an
approved Mme CLAi-O release.
