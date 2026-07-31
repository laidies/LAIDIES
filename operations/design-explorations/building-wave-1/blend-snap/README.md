# Blend & Snap — JoJo’s pickup-rail candidate

**Status:** `BUILT LOCALLY — candidate-only; independent review required`  
**Scope:** `operations/design-explorations/building-wave-1/blend-snap/**` only

This is a complete candidate for the café ritual, not a live-route replacement:

`enter café → understand the verified weekly offer → optionally choose a device-local usual → ORDER → receive a truthful receipt → take one admitted handoff or return`.

The current candidate shows the Episode 04 menu as a bounded fixture. It keeps the five component jobs visibly distinct:

| Component | Job | Candidate truth |
| --- | --- | --- |
| Study Sheet | compact review | Planned; no link |
| Try-On | applied practice | Available handoff |
| Cheat Sheet / timeline | printable reference | Available handoff |
| Concept cards | remember / future collect | Unavailable; no link or ownership claim |
| Quiz | separate assessment | Available next-door handoff |

The art contains no changing availability, episode number, route, account, reward or completion text. Those facts are live HTML. A no-JS fallback preserves only the bounded released-Episode, Try-On, reference and Quiz handoffs; it does not fabricate the live validated menu.

## Files

- `index.html` — candidate page and semantic/failure fallback.
- `candidate.css` — local composition only; no shared CSS.
- `candidate.js` — candidate-local fixture/state controller only.
- `assets/` — copied candidate-only art inputs, not production assets.
- `evidence/` — desktop/mobile/receipt/failure screenshots made by the suite.
- `KEEP-ADAPT-REJECT.md` — exact source/art disposition.
- `MAKER-EVIDENCE.md` — tests, limits and next review.

## Explicit limits

- JoJo is a provisional continuity study, not final identity approval.
- The candidate uses a fixed Episode 04 fixture. It does not replace the live weekly-pack validator or manifest.
- No card opening, award, reward, ownership, Closet delivery, account read/write, cross-device continuity, completion or audio claim is implemented.
- This does not admit the Study Sheet, Episode 04 cards, noticeboard destinations, visual direction or any public release.

