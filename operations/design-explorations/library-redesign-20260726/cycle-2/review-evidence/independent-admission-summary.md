# LIBRAiRY Experience Design Cycle 2 — independent admission summary

**Status:** INDEPENDENT REVIEW COMPLETE — 0 ADMITTED, 3 REJECTED  
**Reviewer:** `library_redesign_independent_admission_cycle2`  
**Maker:** `library_redesign_maker_cycle2`  
**Owner-entry preflight:** PASS (`owner_entry_product=library:PASS`)

## Decision

| Candidate | Product | LAiDIES brand | UX/accessibility | Quality/trust | Result |
| --- | ---: | ---: | ---: | ---: | --- |
| A · Hall Catalogue | 13/20 | 15/20 | 10/20 | 4/20 | REJECTED |
| B · Rotunda Loop | 12/20 | 16/20 | 8/20 | 4/20 | REJECTED |
| C · Gallery Rooms | 14/20 | 14/20 | 10/20 | 4/20 | REJECTED |

No candidate clears the non-compensable 17/20 floors. Ali should see none.

## Shared hard failures

1. The authoritative Library functionality map has zero admitted production
   books. All candidates label and operate Vocab 101, Concepts 101, Who's Who
   in AI and Straight Answers About AI as `OPEN BOOK`.
2. Each `OPEN BOOK` trigger opens a source-less mock reader and exposes an
   inert `Place a Puffy here` control. No candidate implements the admitted
   source, canonical device-local write/read-back, failure or Closet consumer
   contract.
3. Miss Jeeves claims or implies an admitted-catalogue direct answer but
   returns only placeholder policy copy with no answer, source or working
   destination.
4. All reader dialogs leave focus on the launching cover, do not close on
   Escape, do not trap focus and leave focus on the hidden close button after
   dismissal.
5. All book controls have repeated status-only accessible names because cover
   images have empty alt text. Mobile/desktop target-size and tiny status-label
   failures remain.
6. None separately designs and verifies first-time, returning-without-Card,
   device-local Card and verified-account visitor states and transitions.

## Visual result

The full-resolution plates avoid Cycle 1's futuristic/sci-fi chrome, mystery
symbols, app docks, fake covers and generated people. They use the intended
daylight comic direction and real Library assets. That is a real improvement,
but it cannot admit a complete candidate whose visible interface contradicts
the product's authority and whose primary controls are inaccessible or fake.

## Evidence

- `capture-report.json`: runtime, response, external-request, body text, every
  visible control/image/heading, bounds, overflow and interaction outcomes.
- Fresh full-page and viewport captures: current homepage, current Library and
  all candidates at 1440 × 900 and 390 × 844.
- Fresh open-book and Miss Jeeves captures for all candidates at both
  viewports.
- Candidate-specific `REVIEW.md` and `ADMISSION.json` files under
  `cycle-2/_rejected/`.

External network was deliberately blocked. Google Fonts therefore used local
fallbacks; no other candidate asset failed. Headless Chrome is not Safari,
VoiceOver, native zoom, physical-device, newcomer or public-origin proof.

## Learning scan

No new painpoint entry. The failures are direct recurrences already covered by
BTB-050, BTB-058, BTB-062, BTB-063, BTB-127, BTB-130, BTB-135 and BTB-136 and
by the Cycle 1 rejection. The prevention rule remains: visual admission judges
the complete rendered candidate against both intended experience and
authoritative capability/state, not only whether its environment plate looks
better.

