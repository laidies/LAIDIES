# Visitor's Centre repair — rendered local browser review — 2026-07-25

**Status:** VERIFIED LOCALLY for the named interaction/recovery states only. Visual approval, assistive-technology announcement, real-device and public verification remain open.

## Exact source and environment

Rendered `visitors-centre.html` SHA-256 `69c7af47f2a2cc4b89cb05429e372221ea260b83fc2d7cb3e547c9045149a181` from a local server in the in-app browser. Tests ran at the default desktop viewport and an explicit `390×844` viewport.

## Results

| Required behavior | Result | Rendered observation |
|---|---|---|
| Named directory reveal | PASS | Selecting `library` opened the card, set `#library`, showed `SUNNYVAiLE LIBRAiRY`, and bound `Step inside` to `/library.html`. |
| Directory Escape/focus restoration | PASS | Escape closed the open card, cleared the hash, and returned focus to `#vc-directory`. |
| Map Escape/focus restoration | PASS | Clicking the uniquely named `SUNNYVAiLE LIBRAiRY · Civic Square` map button opened the card; Escape closed it and returned focus to the same labelled button. |
| Mobile layout and interaction | PASS for 390×844 | Directory remained visible; reveal and Escape/focus behavior passed; document width equalled the 390px viewport with no horizontal overflow. |
| Missing shared directory | PASS | A controlled local copy without `sunnyvaile-directory.js` disabled the empty select, showed the named `LAiDIES homepage` recovery link, created no map buttons, and did not overflow at 390×844. |
| Truthful copy | PASS for rendered text | Resident Card described device-local setup; Post Office described a request/inbox confirmation; postcard controls described opening external handoffs rather than delivery. |

## Limits

No screen reader, real mobile Safari, zoom-to-400%, no-JS, reduced-motion computation, native share/text/email application, clipboard, downstream destination, public-origin, or clean-user comprehension test was performed. The room-first visual direction still requires Ali's ruling. The bounded repair therefore does not admit the Centre or homepage to a grand-reopening candidate by itself.
