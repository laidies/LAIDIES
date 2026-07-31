# Post Office Wave 3 complete-counter candidate — maker evidence

Evidence time: 2026-07-27T03:57:32-0700  
Status: BUILT LOCALLY — INDEPENDENT REVIEW REQUIRED  
Public status: unchanged; no deploy or production-route mutation

## Literal visible output

The isolated candidate at
`operations/design-explorations/building-wave-3/post-office/index.html`
turns the Post Office into one Penny-owned counter experience with four visible,
distinct jobs:

1. Wednesday mail request preparation with local validation and an explicit
   `request is not a subscription` boundary.
2. Resident Card desk with the explicit boundary that a local Card is not an
   account, invitation, delivery or reward state.
3. A governed 11-postcard rack, selected-card proof desk and public-card-ID-only
   handoff to the existing writing room.
4. A published-issue drawer sourced from the canonical episode index.

The current strong Penny counter artwork is retained as the hero. The existing
postcard art remains live HTML content rather than baked navigation or status
text.

## Frozen maker tuple

- `index.html` — `75801aa1db5a933f23e07ba1038aa626e4cac203e98fdd762581db5f97b17265`
- `post-office-candidate.css` — `108388b7f2b7307b7c25f6cee3b8061480b32a126f68b59198eee4cad7b9b542`
- `post-office-candidate.js` — `11d6f76b8ce84b8f425c2b1d2d30a1bb7ef6e2a4d653487857c48b6e2ae22cb3`
- `postcard-catalog-candidate.json` — `79d46ce24c070f2a2d48068b38b48a3f5e2ae70122ae5b67af990697ae9407a1`
- `test-candidate.mjs` — `e1d9595a091c3a440e8cdab490da53d4e8e2922ebeed691e8bab7d3c33c118a8`
- Penny hero artwork — `dadbc66da668a2afec17f7824982e6bbd9e246b7ebf226a0dd09e6065ca2b497`

## Maker verification

- JavaScript syntax: PASS.
- Candidate contract: `POST OFFICE WAVE 3 CANDIDATE PASS cards=11
  counters=4 catalog=governed archive=fail-closed
  newsletter=non-authoritative responsive=320,390,1440`.
- Post Office owner entry: PASS.
- `git diff --check` for the candidate: PASS.
- All 11 catalog assets exist and all catalog IDs and image paths are unique.
- In-app browser: 11 rack cards, 4 published drawer entries, no broken images,
  selection updates exactly one `aria-pressed` state, focuses the writing desk
  and hands off only `/postcard.html?pc=<public-id>`.
- In-app browser newsletter states: invalid email focuses the field and sets
  `aria-invalid`; valid input says only that a Buttondown handoff is prepared
  and explicitly does not claim subscription or delivery.
- Failure fixtures: malformed catalog fails closed; unavailable archive fails
  closed; blocked newsletter preparation preserves the entered address without
  claiming transmission; image failure supplies a labeled local fallback.
- Exact device emulation at 320, 390 and 1440 CSS pixels: document width equals
  viewport width, 11 rack cards and 4 drawer entries render, hero and ticket
  bounds remain inside the viewport, and no loaded image is broken.
- Visible mobile controls measured at 49 CSS pixels or more.
- Script-disabled Chromium at 390 CSS pixels: all four counter tickets remain
  usable anchors, the Resident Card destination remains reachable, the
  newsletter boundary remains readable, the rack exposes its writing-room
  fallback, document width equals viewport width and no image is broken.

## Defects found and corrected during the real browser pass

1. The initial archive adapter rejected the canonical episode index because its
   safe site-relative paths omit a leading slash. The adapter now validates
   both safe canonical forms and normalizes them to root-relative URLs.
2. The global button layout made postcard labels share a row with their images.
   Postcard cards now use a block layout so each label occupies the card width.
3. A failed catalog could leave the initial postcard picture visually present.
   The writing desk now switches to an explicit unavailable state.

## Authority ceiling and remaining work

This candidate does not transmit email, create an account, send a postcard,
issue an invitation, grant a reward or claim delivery. Buttondown, identity,
delivery/open/join receipts, reward ledgers, native/human accessibility,
production integration and public release remain separate owner gates.

The maker cannot accept this result. Exact next action: an independent Post
Office product/browser judge verifies the frozen tuple against the Experience
Brief, Functionality Map and build packet, returning a reason-coded ACCEPT or
HOLD with an exact evidence path.

## Proactive improvement

Opportunity advanced: replace duplicated postcard arrays with the governed
candidate catalogue and make the production writing room consume the same
public ID contract. Expected value: one inventory, fewer mismatched cards and a
testable return path. Status remains candidate-only until receiver acceptance.
