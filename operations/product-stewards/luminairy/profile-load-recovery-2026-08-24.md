# LUMINAiRY profile-load recovery — 2026-08-24

## Root cause verdict

The screenshot is the page's fail-closed state: its profile/admission request did not complete, so it rendered zero fallback cards. On reproduction, the exact local URL returned the profile file, claim file and editorial receipts at `200` and rendered all 13 Saints cards. The most likely bounded cause is a request made while the local preview server was restarting or a tab retaining that earlier failed state; persistent data loss was not reproduced.

## Visitor defect

Failing closed was correct. The visible result was not: a large block exposed internal archive/admission language, offered only a full-page retry instruction and left the visitor without an operable recovery action.

## Repair

- Retry one transient load failure automatically with cache bypass.
- After the bounded retry fails, render zero cards and show `We couldn’t open the LUMINAiRY just now.`
- Explain `Nothing has been changed. Try again when you’re ready.`
- Provide one operable `Try again` button that starts another bounded retry cycle.
- Keep claim admission fail-closed; never render invented or unadmitted records.
- Remove remaining all-guides wording from metadata and public section/action labels.

## Calibrated prevention

- A simulated first-request `503` had to recover on request two; the predecessor timed out with no cards.
- A simulated persistent admission failure had to stop after two requests, render zero cards, expose plain visitor language and one retry button, and perform exactly two more requests after manual retry.
- The semantic guard first rejected `43 illustrated guides` metadata, then bound the corrected wing-specific nouns.

## Behind the Build angle

Fail-closed does not have to mean user-hostile. The safe system can refuse to invent data while still explaining the interruption plainly and giving the person a real recovery action.

This is isolated-branch evidence only. It is not deployment or public verification.
