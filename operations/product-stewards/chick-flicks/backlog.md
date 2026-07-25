# Chick Flicks Building Backlog

**Status:** BUILDING — recommendations only; no item is accepted implementation work.

| ID | Status | Launch class | Work | Why / dependency | Done when |
|---|---|---|---|---|---|
| CF-01 | SPECIFIED | FIX BEFORE LAUNCH | Prove current-week/index consistency across storefront, homepage, issue page, watch route and KSVL. | Chick Flicks runtime reads the episode index but ships Episode 04 copy; mismatches can create a false “new release.” | Exact artifact matrix names one source, current release, title, issue/watch route, anthem, empty/stale-index fallback and retest. |
| CF-02 | SPECIFIED | FIX BEFORE LAUNCH | Run clean-state episode-discovery comprehension tests. | Route loading does not prove users understand the rental metaphor, availability, episode order, “rent,” or first route. | Named sessions test store job, released/forthcoming distinction, aisle choice, handoff and next step; observations separate from recommendations. |
| CF-03 | SPECIFIED | FIX BEFORE LAUNCH | Execute mobile/accessibility/recovery storefront suite. | No recorded test spans filters, selection, favourite, focus, reduced motion, missing index/asset, bad issue URL and assistive technology. | Exact-artifact mobile/desktop matrix with keyboard/focus semantics and failure recovery; each failure has owner/retest. |
| CF-04 | SPECIFIED | HIDE/LABEL FOR LAUNCH | Audit all favourite, rental, trailer and post-episode route language. | A favourite is device-local until proven otherwise; “rent” and linked media cannot claim completion or media quality. | Labels state scope/action honestly and no downstream reward, playback, subscription or completion claim exceeds evidence. |
| CF-05 | SPECIFIED | FIX BEFORE LAUNCH | Define privacy-safe Chick Flicks event requirements. | Plausible presence is not an analytics learning loop; raw page views cannot show discovery failure. | Platform/Privacy-approved events for store view, aisle selection, published/coming-soon selection, rental handoff, favourite action and error; validate after implementation. |
| CF-06 | CAPTURED | POST-LAUNCH EXPERIMENT | Test interest-led aisle recommendations after baseline data. | Aisles can make a four-plus episode season browsable, but taxonomy must aid discovery rather than create false topical precision. | Approved hypothesis measures successful first useful episode choice and comprehension, with editorial and brand guardrails. |
| CF-07 | CAPTURED | POST-LAUNCH EXPERIMENT | Evaluate ethical rental-store extensions. | Potential non-paywalled collectible/physical or membership value must never gate core learning or misrepresent fulfilment. | Revenue owner validates value exchange, cost, fulfilment, accessibility, rights and no-paywall guardrails before a concept championship. |

## Do not pursue without new evidence

- Paywall or “late fee” mechanics for core episodes.
- Treating a tape click, room visit, or favourite selection as episode completion or a reward event.
- Listing unreleased titles as rentable merely to make the wall look full.
