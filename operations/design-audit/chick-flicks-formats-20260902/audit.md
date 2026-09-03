# Chick Flicks format experience audit — 2026-09-02

## Current rendered findings

1. **Identity breaks after the shelf.** The Read page carries episode art, but Listen and Watch open on a large, sparse navy title field with no VHS cover or visible store object.
2. **The format path is inconsistent.** Episode 01 has a Read / Listen / Watch control; Episodes 02–04 do not, so moving between formats depends on finding scattered links.
3. **Listen and Watch are visually indistinguishable above the player.** The active tab changes, but the page hierarchy and opening composition are otherwise the same.
4. **Mobile Read has a collision.** The episode metadata label overlaps the title because it is absolutely positioned into the text stack.
5. **The player itself is usable.** Playback, captions, episode selection and return links are present and should be preserved rather than rebuilt.

## Design response

- Carry the approved episode-specific VHS case into the Listen and Watch arrival.
- Use the current LAiDIES cream/lilac, deep navy, pink, cyan and purple family from the live Homepage/LIBRAiRY/Chick Flicks system.
- Keep Read light and editorial, Listen audio-first, and Watch dark around the film.
- Put one consistent Read / Listen / Watch switcher on Episodes 01–04.
- Preserve player truth, captions, programme selection, return links and current media status wording.

The PNG files in this folder are the same-viewport before and after evidence used for the review.
