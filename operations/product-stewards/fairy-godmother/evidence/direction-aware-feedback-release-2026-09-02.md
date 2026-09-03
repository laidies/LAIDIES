# FAiRY direction-aware feedback release — 2026-09-02

## Verdict

DEPLOYED / PUBLICLY VERIFIED for the bounded Worker release. No Pages file or
deployment changed.

## Visitor change

FAiRY now distinguishes three feedback relationships:

- a manager giving timely private feedback to a team member;
- a peer raising an observed effect on shared work without claiming managerial
  authority; and
- an employee giving upward feedback only after checking hierarchy and
  retaliation exposure, with a lower-exposure option when needed.

All three require observable work, work impact, a clear request and genuine
inquiry. The manager route also requires support and follow-up. Active harm or
wrong information is corrected before coaching. “Care personally and challenge
directly” is used as a design constraint, not permission for bluntness,
personality judgments or public criticism.

## Exact release identity

- implementation commits: `40a6fc87` and `b3f7ec57`
- Worker: `laidies-fairy-godmother`
- version: `0c181537-b120-4f62-998e-b0605399d18f`
- deployment: `2a841e28-76bb-4b23-b3d0-ceaaedfdfd92`
- traffic: 100%
- upload size: 205.45 KiB; gzip 60.38 KiB
- uploaded script etag: `7820952dc55cf41b6fc951334a2cba99169bd9a0129fd2abc9714a5dcdaec3e9`

The inspected version preserves all four production secrets, Supabase URL and
publishable key, Durable Object namespace
`0b28843154d9485085390b27f9b3dedf`, rate-limit namespace `26090101`,
`gpt-5.6-sol`, the career pilot flag, the US$10 daily cap and the existing
attempt reservation. It contains no staging QA flag or secret.

## Actual-model evidence

The staging Worker returned complete `case_success` answers for all three
directions:

- manager output SHA-256 `c12ca09cb006a764fcfdaef5f008d984e71cd5b961b4eaec65f971c3c0a934f0`;
- peer output SHA-256 `095a95dc4c16927c3a283c176272bcd0c98624edc1d94a5671450fb7b0a23f72`;
- upward output SHA-256 `aad5189e689327aa225f7f92cdc791128821eb712cc58844f5983097e4433bb4`.

The first upward attempt timed out in the classifier, returned
`classification_uncertain`, called no answer model and spent zero. Its output
SHA-256 is `8b8afa098ca6fe3a88cf29eba1fd0a318986a8f45b0e896de7e2a4765a5ef08c`.

Two independent artifact-first reviews found no P0 or P1 issue across the
three successful answers. One P2 found that the manager deliverable mentioned
correcting the live wrong report only after the coaching script. The released
deterministic task and source decision now require containment or correction
before coaching; the returned model answer had already stated that order in its
`nextMove`.

## Mechanical and live checks

- focused direction-route suite: 22/22;
- complete Worker suite: 99/99;
- frozen answer fixture: 45/45;
- frozen classifier fixture: 79/79;
- content-producer contract: integrity match;
- calibrated harmful mutations reject personality labels, public criticism,
  delayed-review stockpiling, peer authority claims and unsafe upward
  confrontation;
- live CORS preflight: HTTP 200 with the laidies.ai origin and expected headers;
- live GET: typed HTTP 405 `input_invalid`, no spend;
- live short POST: typed HTTP 400 `input_invalid`, no spend;
- canonical `https://laidies.ai/games/fairy-godmother`: HTTP 200 and connected
  to the production Worker.

A live paid guest answer was attempted after deployment, but the existing guest
identity had already used today's one-case beta allowance. Production returned
HTTP 429 `rate_limited`, explicitly reported zero spend and did not generate an
answer. The release therefore has complete real-model staging evidence for all
three new routes but no fresh paid production answer for this version.

## Source boundary

Current source records bind the method to the official Radical Candor framework
(care personally plus challenge directly), CCL guidance on timely specific
behaviour-and-impact feedback, Lara Hogan's no-surprise performance-review
practice and Amy Edmondson's leader-created conditions for speaking up. The
visitor-facing scripts are original LAiDIES adaptations. Named-expert credit in
generated answers remains held; a source's presence in the bank does not prove
that it supports every generated sentence.

## Not claimed

- no new Pages release or page-byte change;
- no fresh paid production answer after deployment because the allowance guard
  correctly stopped it;
- no claim that ordinary coaching replaces formal performance, legal,
  accommodation, safety, discrimination or abuse processes;
- no claim that upward feedback is safe merely because its wording is careful.
