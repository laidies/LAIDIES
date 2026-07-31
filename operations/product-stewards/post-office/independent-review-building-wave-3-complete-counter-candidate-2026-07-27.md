# Independent review — Post Office Wave 3 complete-counter candidate

**Reviewer:** independent Post Office product/browser judge  
**Review date:** 2026-07-27 (America/Vancouver)  
**Scope:** frozen isolated candidate only. No candidate, source, provider, live route, media, deployment, or public mutation was made.

## Verdict: HOLD — two bounded experience/accessibility repairs required

The candidate is a substantial, truthful Penny-counter experience. Its four jobs, governed postcard selection, canonical published-issue drawer, failure states, catalog contract, truth boundaries, and desktop visual quality all pass. It cannot yet be accepted because the exact responsive/keyboard contract has two observable failures:

1. **`HOLD_SKIP_TARGET_DOES_NOT_RECEIVE_FOCUS`** — the visible “Skip to Penny’s counter” anchor targets `#counter`, but that section has no focusable target. At 1440 and 390, activating it left focus on `BODY`, rather than establishing a meaningful keyboard location. This fails the required keyboard/focus recovery semantics.
2. **`HOLD_MOBILE_PENNY_COUNTER_CROPS_OUT_PENNY`** — at 390×844 the hero’s actual visible crop shows only a narrow shelf/counter fragment; Penny is not visible. The page still reads as a colourful Post Office, but it does not satisfy the promised **Penny-owned counter** arrival on mobile. The desktop crop is strong and shows Penny clearly; mobile needs a distinct safe composition/object position or responsive artwork treatment.

Neither issue permits a claim that the building is accepted, integrated, deployed, or public.

## Frozen tuple independently recomputed

| Artifact | Required SHA-256 | Observed SHA-256 | Result |
| --- | --- | --- | --- |
| Candidate HTML `operations/design-explorations/building-wave-3/post-office/index.html` | `75801aa1db5a933f23e07ba1038aa626e4cac203e98fdd762581db5f97b17265` | same | PASS |
| Candidate CSS `post-office-candidate.css` | `108388b7f2b7307b7c25f6cee3b8061480b32a126f68b59198eee4cad7b9b542` | same | PASS |
| Candidate JS `post-office-candidate.js` | `11d6f76b8ce84b8f425c2b1d2d30a1bb7ef6e2a4d653487857c48b6e2ae22cb3` | same | PASS |
| Governed postcard catalogue `postcard-catalog-candidate.json` | `79d46ce24c070f2a2d48068b38b48a3f5e2ae70122ae5b67af990697ae9407a1` | same | PASS |
| Candidate test `test-candidate.mjs` | `e1d9595a091c3a440e8cdab490da53d4e8e2922ebeed691e8bab7d3c33c118a8` | same | PASS |

`node test-candidate.mjs` returned the declared contract pass: 11 governed cards, four counters, fail-closed archive/catalog, non-authoritative newsletter, and 320/390/1440 scope.

## Independent product and browser checks

| Reason code | Result | Direct finding |
| --- | --- | --- |
| `PASS_FOUR_PENNY_COUNTER_JOBS` | PASS | The arrival exposes exactly four physical jobs: Wednesday-mail request preparation, Resident Card desk, postcard rack → writing desk handoff, and published-issue drawer. Each has a live heading, action, state/result language, and next step. |
| `PASS_NEWSLETTER_TRUTH` | PASS | Invalid email sets `aria-invalid`, focuses the email field, and announces recovery. Valid preparation says only that a Buttondown handoff is ready; blocked preparation preserves the address and does not claim transmission, subscription, or delivery. |
| `PASS_ACCOUNT_REWARD_DELIVERY_BOUNDARIES` | PASS | The Card desk says a local Card is not an account and does not infer sign-in, invitation, delivery, or reward state. No invitation/reward success UI or provider/account completion claim is present. |
| `PASS_GOVERNED_RACK_WRITING_HANDOFF` | PASS | All 11 unique catalogue IDs/assets pass validation. A selected card has exactly one `aria-pressed=true`, moves keyboard focus to the writing desk, and hands off only `/postcard.html?pc=<public-id>`; the note/signature are explicitly excluded from the URL. Keyboard focus on horizontally overflowed rack cards scrolls the rack until the focused card is fully visible. |
| `PASS_CANONICAL_PUBLISHED_DRAWER` | PASS | The drawer accepts the canonical `content/episode-index.json`, filters to four published issues, normalizes safe site-relative paths, and labels the archive as website publication—not newsletter delivery. Direct loaded-card inspection found all four canonical images intact. |
| `PASS_FAILURE_AND_NO_JS_BOUNDARIES` | PASS | Malformed catalogue clears the rack and removes the postcard ID; archive failure clears drawer results; image failure gives a labelled local fallback; no-JS makes the interactive rack unavailable and retains a safe writing-room link. |
| `PASS_320_390_1440_CONTAINMENT` | PASS | At 1440×900, 390×844, and 320×800 there is no document horizontal overflow. All four counter sections render; 11 rack cards and four issue records load in JS mode. Reduced-motion query is active. |
| `PASS_DESKTOP_VISUAL_PRODUCT_QUALITY` | PASS | At desktop, Penny is legible at the counter and the counter, tickets, rack, writing desk, and archive read as operated elements rather than a generic dashboard. Live HTML owns all job/status text. |
| `HOLD_SKIP_TARGET_DOES_NOT_RECEIVE_FOCUS` | HOLD | See verdict item 1. |
| `HOLD_MOBILE_PENNY_COUNTER_CROPS_OUT_PENNY` | HOLD | See verdict item 2. |

## Exact next action

Post Office maker may change **only** the isolated Wave 3 candidate to:

1. make the `#counter` skip target programmatically focusable and move focus there on skip activation; and
2. provide a responsive hero crop/treatment that keeps Penny visibly present at 390 and 320 pixels without concealing the four counter tickets or changing truth/copy/contracts.

Then reseal the five-file tuple and return it for a fresh independent rejudge across 1440/390/320, including real skip activation, card selection/focus restoration, failure fixtures, reduced motion, and no-JS. Provider delivery, account lifecycle, native/mobile assistive technology, invitation/reward systems, integration, release, and public-origin proof remain separate work.

## Proactive improvement

**Evidence-backed opportunity:** the responsive hero needs an explicit `Penny-visible` crop assertion in its browser test—not merely no-overflow/image-loaded checks. This prevents the building’s named host from disappearing on mobile while all mechanical layout tests pass. Status: direct candidate repair above.

## Authority truth

No production/live/deploy/provider/public mutation, provider request, account action, or reward action occurred during this review.
