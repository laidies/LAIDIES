# Native Safari accessibility-tree witness — current NewsStand candidate

**Result:** PASS — native Safari semantics and state transitions / VOICEOVER ANNOUNCEMENT HOLD

**Observed:** 2026-08-11 America/Vancouver

**Exact source:** commit `a8ef971fc56ad41be2b28e7d0b4805eb52b3285c`; `newsstand.html` SHA-256 `5af8beb902d4c04de853e156b72c80160eceeaa89145484b0c0c27abd3edb4d7`

The local exact candidate was opened in native Safari at `http://127.0.0.1:8765/newsstand.html` and inspected through macOS's accessibility tree.

## Observed native semantics

- The page exposes one H1, section H2 headings, a Skip to content link, primary navigation, three arrival buttons, a labelled four-publication container, four toggle buttons, a date control, labelled search field and archive controls.
- Safari exposed the current truthful state as `Paige's check is overdue` and `PUBLICATION CHECK OVERDUE`.
- The Breaking and Weekly exposed `QUIET · CHECKED AUGUST 3, 2026` and `NO ISSUE TODAY`.
- The Daily and Tribune exposed `CHECK OVERDUE · NOT CURRENT` and `SOURCE UPDATE NEEDED`.
- Choosing the Daily changed its toggle value from `off` to `on`, exposed the reading-space heading and only the non-exposing message `This story needs an update before it can be shown again.`
- `PUT THE PAPER BACK` removed the reading space and restored the Daily toggle to `off`.
- Catch Me Up exposed `Catch Me Up is unavailable until the publication record is current. No held or unverified item is shown.`

## Boundary

This is a native Safari accessibility-tree and interaction-state witness. VoiceOver was not toggled because that changes a user-level system setting and no separate approval was obtained. Spoken announcement order and wording therefore remain unverified. This witness does not cover deployment or public behavior.
