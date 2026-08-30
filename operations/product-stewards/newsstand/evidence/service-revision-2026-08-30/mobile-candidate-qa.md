# Mobile candidate QA — 2026-08-30

Candidate: `http://127.0.0.1:56350/newsstand.html` from `/tmp/laidies-newsstand-bank-successor.grAiqm`.

Observed in a separate Chrome browser session with explicit viewport overrides:

- **390 × 844:** `documentElement.clientWidth` and `scrollWidth` were both `390`; no horizontal overflow. Seven populated Useful this week desks were present: Paige, Corner Office, Concept, Dear Miss Jeeves, Mme CLAi-O, What's New, and Did You Know. Five rich-column reader links were present; Corner Office and Mme CLAi-O retain their existing direct destinations.
- **320 × 720:** `documentElement.clientWidth` and `scrollWidth` were both `320`; no horizontal overflow. The same seven desk labels were visible in the mobile reading order.
- **Dear Miss Jeeves:** Opening its reader focused the article heading. The reader displayed the signed question before the answer (`Dear Temporally Confused,`). Returning with **Back to the paper** removed the reader and restored focus to the originating Dear Miss Jeeves column link.

Scope limits: no native assistive-technology pass, publication, deployment, or public-origin check was performed. The Crossword was correctly held as not published today.
