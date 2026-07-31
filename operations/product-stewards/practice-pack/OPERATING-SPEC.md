# Study Pack operating specification

**Status:** SPECIFIED — EPISODE 01 ENTRY AND PERSONALIZATION CONTRACT

## Entry and navigation

The public entry is Blend & Snap:

`Blend & Snap → ORDER Episode 01 Study Pack → pickup receipt → OPEN THE PACK`

`OPEN THE PACK` opens one episode-specific cover/contents experience. It does
not open the Try-On by default and does not present three unrelated downloads.

The cover contains three clearly different actions:

| Item | Plain-language job | Primary action |
| --- | --- | --- |
| Cheat Sheet | Get the whole lesson on one useful page | Read / print / download |
| Try-On | Put one small task through ChatGPT, Claude and Gemini | Start / resume |
| Trading Card Pack | Flip and remember the six key ideas | Open the pack |

Below the pack, not inside it:

`Ready to check yourself? Take the Episode 01 Pop Quiz next door at SUNNYVAiLE High.`

Every component provides `Back to Study Pack`, `Back to Blend & Snap` and
`Back to Episode 01` where context makes the destination useful.

## Puffy Sticker Drawer

The same named control appears on the Cheat Sheet, Try-On result and Trading
Card Pack. It supports:

- choose an admitted Puffy sticker;
- place it in an allowed decorative zone;
- drag with pointer or keyboard;
- resize and rotate;
- bring forward/send backward where supported;
- undo, redo and reset;
- preview clean or decorated;
- print/download clean or decorated where the component supports output; and
- save the decorated artifact to My Closet.

Stickers cannot cover required lesson text, form controls, source/freshness
notes, model receipts, card explanations, focus indicators or safety/privacy
copy. On Trading Cards, placement belongs to a sleeve, wrapper or display mat
unless the card owner explicitly admits a card-face decoration zone.

## Decorated-artifact contract

The producer record is versioned and contains:

```json
{
  "schemaVersion": 1,
  "artifactId": "uuid",
  "episodeNumber": 1,
  "component": "cheat_sheet|try_on_receipt|trading_card_pack",
  "baseArtifactId": "stable-id",
  "baseArtifactVersion": "version",
  "inputState": {
    "task": "user text where applicable",
    "responses": {
      "chatgpt": "user-pasted response",
      "claude": "user-pasted response",
      "gemini": "user-pasted response"
    },
    "ratings": "component-specific structured values",
    "notes": "user text where applicable",
    "chosenResult": "user selection or final edit where applicable",
    "currentStep": "stable step id"
  },
  "placements": [
    {
      "stickerId": "stable-admitted-id",
      "x": 0.5,
      "y": 0.5,
      "scale": 1,
      "rotation": 0,
      "z": 1
    }
  ],
  "retention": "verified_account",
  "updatedAt": "ISO-8601"
}
```

Coordinates are normalized so the same composition can reopen responsively.
Unknown, removed or corrected stickers receive a truthful fallback; the
remaining composition must still open.

My Closet delivery is account-backed. A successful write must bind the
artifact to the authenticated owner and restore it across their signed-in
devices. A device-local draft may protect work during editing or sign-in, but
it is not a completed Closet save and must not produce `Saved to My Closet`.

A signed-out visitor can decorate and download. Choosing `Save to My Closet`
opens the account/sign-in handoff while preserving the current item state.
After successful sign-in, the save resumes idempotently and returns the user to
the decorated item with a route to open it in My Closet. Cancellation or
failure leaves the decoration available and truthfully unsaved.

For the Try-On, the value of saving is the ability to resume the actual work.
The account artifact therefore includes:

- the selected example or custom task;
- pasted ChatGPT, Claude and Gemini responses;
- ratings and response-trait selections;
- comparison notes;
- the chosen response and any final edit;
- the current completed/resume step; and
- Puffy sticker placements.

The first save clearly says what will be kept in My Closet. The artifact is
private to its owner by default and protected by account-level access rules.
Raw tasks, pasted responses, notes and edits are not copied into aggregate
analytics, public profiles, feeds or trading systems. The owner can reopen,
edit, export and delete the saved work; deletion propagates across devices.
Public sharing, collaboration and provider sending remain separate, explicit
future actions.

## My Closet consumer

My Closet adds one Study Pack keepsake area that can:

- show the component and episode;
- show a generated thumbnail or safe reconstruction;
- reopen the exact decorated artifact;
- resume the saved inputs and current step;
- rename if admitted;
- remove it; and
- recover from missing base content, stale versions or failed storage.

The Closet consumes the producer record. It does not infer completion,
learning, ownership or reward from its presence.

## Failure and accessibility

- Storage failure leaves the current work visible and offers retry/download;
  it never says saved.
- Sign-in cancellation leaves the current work visible and unsaved.
- Repeated save/retry is idempotent and cannot create duplicate Closet items.
- Sign-out removes the local authenticated view without deleting the
  account-owned keepsake.
- Corrupt placements are rejected or bounded individually; one bad sticker
  cannot erase the whole artifact.
- Every pointer action has a keyboard alternative.
- Decorative stickers are hidden from assistive technology; named controls
  announce selected sticker, position and action result.
- Reduced motion removes sticker bounce/peel animation.
- Reset requires confirmation only when it would destroy unsaved placement
  work; delete from Closet is a separate explicit action.

## Acceptance evidence

- café receipt → pack cover → each component → pack/café return;
- new, returning, storage-denied and corrupt-state journeys;
- clean and decorated print/download proof for eligible pieces;
- keyboard, screen reader, touch, 320/390/1440 and native 200% proof;
- signed-out decorate → sign-in → resumed save;
- account save → second-device restore → reopen → delete → deletion
  propagation;
- two-account ownership isolation, expired session, retry/idempotency and
  sign-out proof;
- exact saved-field disclosure, private-by-default access, edit/export/delete
  and raw-content analytics exclusion review;
- exact component-owner and Closet-owner receipts; and
- independent product, learning, accessibility, trust and Brand admission.
