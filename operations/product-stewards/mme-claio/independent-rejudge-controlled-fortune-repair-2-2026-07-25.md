# Mme CLAi-O controlled-fortune Repair 2 final independent rejudge

**Judge verdict:** **PASS — LOCAL P0 CONTRACT CLEARED**  
**Review date:** 2026-07-25  
**Release status:** **VERIFIED LOCALLY · NOT DEPLOYED · NOT PUBLICLY VERIFIED**  
**Authority:** Independent local source and newly built exact-artifact review
only. No source, test, state, backlog, queue, painpoint, Git, deployment,
public-origin or external mutation was performed.

## Executive judgment

Repair 2 closes the sole timestamp/data-contract blocker from the Repair 1
rejudge.

Mme CLAi-O now admits a stored badge timestamp only when all of the following
are true:

1. it is a string in the exact emitted UTC shape
   `YYYY-MM-DDTHH:mm:ss.sssZ`;
2. every captured component is arithmetically valid;
3. Gregorian leap-year and month-length rules admit the date;
4. hour, minute, second and millisecond values are in range;
5. parsing is finite;
6. `new Date(timestamp).toISOString()` exactly equals the stored value; and
7. `timestamp <= Date.now()` with **zero future tolerance**.

Source and a fresh judge-built exact artifact both rejected `+1 ms`, `+60 s`,
impossible February dates, a non-leap February 29, a century non-leap February
29, April 31, month zero, time-component overflow, malformed widths,
non-contract timezone/date forms and malformed input. They preserved exact
past/current UTC values, the valid 2024 leap day and the valid year-2000
century leap day.

Invalid members were removed independently without deleting valid siblings.
A scoped reset removed valid device-local Hotline Regular while preserving an
unrelated valid badge.

Every previously closed Repair 1 contract remains closed: no free-text
classifier, explicit random/non-tailored/non-predictive product truth,
permanent humane safety boundary, passing safety contrast, keyboard/focus/live
status, canonical bounded history, non-repeat behavior, local keepsake truth,
scoped reset, storage-denial recovery, responsive/reduced-motion proxies,
unchanged 100-card deck and art, Cocktail Fortune recovery and
Businesswomen's Special separation.

This is a local product/data-contract pass. It does not clear owner visual,
native accessibility, production analytics/privacy, public-origin or release
holds.

## Repair 2 blocker disposition

| Repair 1 blocker | Final verdict | Independent evidence |
|---|---|---|
| Exact timestamp shape | **PASS** | Only four-digit year, two-digit date/time components, exactly three milliseconds and uppercase terminal `Z` are admitted. One-digit month, missing/four-digit milliseconds, lowercase `z`, offsets, spaces and date-only values were discarded. |
| Gregorian date validity | **PASS** | Arithmetic leap-year and month-length checks rejected `2026-02-31`, `2025-02-29`, `1900-02-29`, `2026-04-31` and month zero; `2024-02-29` and `2000-02-29` were preserved. |
| Time-component validity | **PASS** | Hour 24, minute 60 and second 60 were discarded. |
| Exact ISO UTC round trip | **PASS** | The implementation requires `new Date(parsed).toISOString() === storedValue`; normalized or alternate date representations fail. |
| Zero future tolerance | **PASS** | Exact current millisecond was preserved. Current time plus 1 millisecond and plus 60 seconds were discarded in source and exact artifact. The five-minute tolerance is absent. |
| Sibling preservation | **PASS** | Valid past/current/leap/unrelated records survived beside invalid members. |
| Hotline Regular scope/reset | **PASS** | Future Hotline Regular was discarded; a separate valid device-local Hotline Regular was removed by reset without removing the unrelated valid sibling. |
| Permanent regression evidence | **PASS** | Contract assertions and rendered source/exact-artifact suites enforce exact width, Gregorian arithmetic, round trip and zero tolerance. The independent judge added a separate runtime matrix rather than relying only on maker fixtures. |

## Mandatory quality floors

| Mandatory floor | Score | Result | Evidence |
|---|---:|---|---|
| Product quality and user value | 18/20 | **PASS** | The 100-card random reflection experience, non-repeat return journey, local history, keepsake and reset are coherent and useful without pretending to know the visitor. |
| Accuracy, safety and trust | 19/20 | **PASS** | Product truth and humane boundaries remain explicit; corrupt/future local evidence now fails closed at the exact contract boundary. |
| Positive LAiDIES brand contribution | 18/20 | **PASS WITH OWNER VISUAL HOLD** | The Y2K hotline/reading-room character remains distinctive while safety and truth are direct. Automated review does not replace Ali's visual approval. |

All non-compensable championship floors clear 17/20.

## Weighted score

| Dimension | Weight | Score |
|---|---:|---:|
| Safety, trust and humane handling | 25 | 24 |
| Product intent, accuracy and user truth | 15 | 15 |
| LAiDIES brand contribution and craft | 15 | 13 |
| UX and accessibility | 15 | 13 |
| Technical integrity and reliability | 15 | 15 |
| Privacy and data truth | 10 | 9 |
| Maintainability and evidence quality | 5 | 4 |
| **Total** | **100** | **93 / 100 — PASS LOCALLY** |

The score does not imply public, owner, native-accessibility or production
approval.

## Prior P0 regression disposition

| Original P0 / floor | Verdict | Final evidence |
|---|---|---|
| Remove unsafe free-text classification | **PASS** | No arbitrary-text input, semantic router or prompt-dependent result path exists. |
| Explicit random/non-tailored mechanic | **PASS** | Arrival and metadata identify one random authored card, no analysis/answer, no prediction and no professional advice. |
| Permanent humane safety boundary | **PASS** | The visible boundary continues to cover emergencies, immediate danger, safety/abuse, health, legal, financial and current-fact decisions without inventing a location-specific hotline. |
| Safety contrast and focus | **PASS — AUTOMATED PROXY** | Heading/paragraph contrast, programmatic boundary focus and visible focus indicator remain passing. |
| Canonical state and persistence | **PASS** | Count bounds, exact decimal form, canonical history rehydration, ten-entry cap, forged-copy/unknown-card rejection, non-repeat return and storage-denial recovery remain passing. |
| Complete badge sanitizer | **PASS** | Plain-object, exact ID, bounded string, Hotline scope and strict timestamp requirements fail closed while valid siblings survive. |
| Local keepsake and scoped reset truth | **PASS** | Hotline Regular remains explicitly device-local and not an account reward; reset removes Mme CLAi-O state only. |
| Keyboard, focus and live result | **PASS — CHROMIUM SCOPE** | Enter draw, result focus, live completion, reset focus and announcement remain passing. |
| Reduced motion and 320/390 reflow | **PASS — CHROMIUM PROXY** | Reveal delay is removed for reduced motion; pre/post-draw layouts remain without page-level overflow. |
| Cocktail Fortune redirect | **PASS LOCALLY** | Exact artifact recovers to canonical Mme CLAi-O and truthfully describes the retired product. |
| Businesswomen's Special separation | **PASS LOCALLY** | It remains a separate drink-picker and exposes its spirit-free lane. |
| Deck and art continuity | **PASS** | The deck remains exactly 100 cards with extracted-source SHA-256 `f3408d996e7628a52d6af65c69b2ad2c792fe86cc4b1ff87d96f3fe0a264c6c3`; no deck or art work was performed. |

## Independent verification

### Source

```text
MME CLAi-O CONTRACT PASS
deck_cards=100

MME CLAi-O BROWSER PASS
journeys=random-truth,no-free-text,keyboard,focus,live-result,non-repeat,
badge-local,scoped-reset,storage-denial,count-extremes,canonical-history,
unknown-card,strict-iso-utc-badge-time,reduced-motion,320-390-reflow,
contrast,redirect,bws-boundary

inline JavaScript: PASS — 353 scripts / 132 pages
local links: PASS — 1,953 references / 110 pages
town contract: PASS
product steward system: PASS — 65 products / 3 of 3 active
scoped git diff check: PASS
```

The judge-authored source probe produced:

```text
INDEPENDENT TIMESTAMP PROBE PASS
preserved=valid-past,valid-current,valid-leap,valid-century-leap
discarded=future-1ms,future-60s,feb-31,non-leap,century-non-leap,
short-month,month-zero,hour-24,minute-60,second-60,short-width,
missing-ms,four-ms,offset,lower-z,space,date-only,malformed,future-hotline
reset=valid-sibling-preserved,hotline-regular-removed
```

### Fresh exact artifact

Fresh judge artifact:
`/tmp/laidies-mme-claio-rejudge-r2.o7K48j`

```text
Public artifact: 1077 files, 961.39 MiB
Warning: artifact exceeds 750 MiB.
exact-artifact browser suite: PASS
independent exact-artifact timestamp probe: PASS
public metadata validator: PASS
private product dossier absent from artifact: PASS
```

| Governed file | Matching source/artifact SHA-256 |
|---|---|
| `games/madame-claio.html` | `55f8e6deefe9c079630f7ab89d183e02487e5d7d332fe44d9c0fc06b34db518e` |
| `content/madame-claio-v2.css` | `3e01ae24344d99d416a6b8b43106ac84ae6164fa26f139407af19ccaa4cedf81` |
| `content/site/madame-claio-v2.js` | `567c2d0116ef2bc5abf62899945fb66d5bc00e0ea532cfd06e40a64d1914ed93` |
| `games/cocktail-fortune.html` | `0b1486e191272b7980d476ef35298bd866d8b01eee8ef5fa0cd56d4276f50603` |
| `games/businesswomens-special.html` | `80da00f08a31608bc89c15a078eefa6c100d91a3eb466ee7c978ece42c36e928` |

## Why the timestamp repair is correct

The repair does not ask JavaScript's permissive parser to decide the product
contract by itself.

First, the regex fixes the accepted representation. Next, explicit component
arithmetic determines whether the represented calendar instant can exist,
including the divisible-by-4 / century / divisible-by-400 leap rule. The exact
round trip rejects any value the platform would normalize or reinterpret.
Finally, the direct `timestamp > Date.now()` comparison makes the boundary
inclusive of the current millisecond and exclusive of every future
millisecond.

That sequence separates format, calendar validity, platform interpretation and
evidence timing instead of treating “parseable” as “trustworthy.”

## Preserved holds

This local PASS does not clear or narrow:

- Safari keyboard, storage, animation or redirect behavior;
- VoiceOver reading order, boundary, result, returning-state or reset
  announcements;
- native browser zoom/text scaling, contrast review beyond the automated proxy
  or representative physical-device touch;
- Ali's visual and creative approval;
- production Plausible/Clarity privacy configuration, masking, network
  behavior or event-property review;
- real public-origin canonical and retired-route behavior;
- backend, account, cross-device or durable-reward claims;
- deployment, publication, promotion or any external mutation; or
- the existing artifact-size advisory above 750 MiB.

The fresh artifact is evidence only and must not be deployed or promoted by
implication.

No further local Repair 2 code change is required by this judgment. The next
work is the preserved owner, native-accessibility, production-privacy and
public-origin gates, each under its own authority.
