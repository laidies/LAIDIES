# Evidence Log

## Claim-to-Source Mapping

| Claim in proposal.md | Source | Detail |
|---|---|---|
| 18 adult attendees, CAD 600 total budget incl. reserve | S1 | Organizer brief states 18 adults, CAD 600 all-in budget |
| 90-minute duration incl. 10-minute break | S1 | Brief specifies duration and break length |
| No paid AI subscriptions required for participants | S1 | Explicit constraint in brief |
| No-account paired-paper fallback, fictional practice data | S1 | Explicit requirement in brief |
| Accessible venue with room for all attendees required | S1 | Explicit requirement in brief |
| Reserve = 10% of venue+catering+delivery+printing, after applicable tax, once | S1 | Explicit calculation rule in brief |
| Do not book/contact/publish/purchase | S1 | Explicit constraint, respected — no such actions taken |
| North Hall room cost CAD 240, tax included | S2 | Quoted room cost |
| North Hall capacity 20 | S2 | Quoted capacity, ≥ 18 attendees required |
| Step-free access and accessible washroom confirmed | S2 | Explicitly confirmed in quote |
| Projector included | S2 | Stated in quote |
| Availability for our date not checked | S2 | Quote explicitly states this is unchecked |
| Catering CAD 9/attendee, tax included | S3 | Quoted rate |
| Delivery CAD 25, tax included, no minimum headcount | S3 | Quoted terms |
| Dietary needs not collected | S3 | Quote explicitly states this |
| Printing CAD 2/attendee, tax included, one pack per attendee | S4 | Quoted rate and coverage |

## Budget Calculation Check

- Venue: 240.00 (S2, tax included)
- Catering: 9 × 18 = 162.00 (S3, tax included)
- Delivery: 25.00 (S3, tax included)
- Printing: 2 × 18 = 36.00 (S4, tax included)
- Subtotal: 240.00 + 162.00 + 25.00 + 36.00 = **463.00**
- All four inputs are already tax-included per their quotes, so no additional tax step is needed before computing the reserve.
- Reserve: 10% × 463.00 = **46.30**
- Total: 463.00 + 46.30 = **509.30**
- Remaining: 600.00 − 509.30 = **90.70**
- Recheck of arithmetic: 240+162=402; 402+25=427; 427+36=463 ✓. 463×0.10=46.30 ✓. 463+46.30=509.30 ✓. 600−509.30=90.70 ✓.

## Venue Eligibility Check

- Only one venue quote was supplied (S2, North Hall); no alternative venues were provided in the source material, so North Hall is the only eligible candidate to evaluate.
- Capacity check: 20 ≥ 18 attendees — passes.
- Accessibility check: step-free access and accessible washroom explicitly confirmed in S2 — passes.
- Date availability: **not checked**, because S1 states the date is unconfirmed and S2 explicitly states availability for our (unconfirmed) date has not been checked. This is carried into proposal.md as an open item, not assumed resolved.

## Checks Performed

1. Confirmed every cost figure used in proposal.md traces to an explicit number in S2, S3, or S4 — no costs were invented or inferred.
2. Recomputed the subtotal, reserve, total, and remaining budget independently (shown above) and cross-checked against the figures placed in proposal.md — they match.
3. Verified the agenda in proposal.md sums to exactly 90 minutes and contains one 10-minute break, per S1's requirement.
4. Verified the draft invitation word count (78 words) is at or under the 120-word cap from the brief.
5. Checked that no dietary requirements were stated or invented anywhere in proposal.md, consistent with S3's explicit statement that none were collected.
6. Checked that no date, booking, contact, or purchase action is described as taken or completed in proposal.md — only planning language is used.
7. Confirmed North Hall's capacity (20) and accessibility features (S2) satisfy S1's requirement for an accessible venue fitting all 18 attendees.

## Unresolved Facts (not invented, flagged instead)

1. **Event date** — not confirmed by the organizer (S1). Without it, North Hall's availability cannot be verified against S2.
2. **North Hall date-specific availability** — explicitly stated as unchecked in S2; contingent on item 1.
3. **Dietary needs** — explicitly not yet collected per S3; none assumed or invented in proposal.md.
