# Public mobile QA — service revision

- Checked: 2026-08-30T21:09:02Z
- Browser: fresh Chrome agent tab; viewport was reset after the checks.
- Origins checked after allowing the asynchronous service-column load to settle:
  - `https://laidies.ai/newsstand`
  - `https://b2695dc7.laidies-sunnyvaile.pages.dev/newsstand`

## Observations

Both origins produced the same result.

| Check | 390 × 844 | 320 × 720 |
| --- | --- | --- |
| Seven service desks present | PASS | PASS |
| Horizontal overflow | none (`scrollWidth === clientWidth`) | none (`scrollWidth === clientWidth`) |
| Screenshot inspected | PASS | PASS |

The seven observed desk labels were Paige’s AI & Productivity Tip, The Corner Office, Concept of the Week, Dear Miss Jeeves, Mme CLAi-O, What’s New in SUNNYVAiLE, and Did You Know?

At 390px on each origin, the Dear Miss Jeeves card opened its full reader. The question began at body-text offset 3016 and the answer salutation (`Dear Temporally Confused,`) at 3237, so the question preceded the answer. Activating **Back to the paper** removed the reader and restored focus to the originating link:

`/newsstand?column=DAILY-2026-08-30-DEAR-MISS-JEEVES-JEEVES-01-TIME`

## Limits

This is visual/browser-structure QA only. Native assistive-technology testing was not performed. No content, public files, publishing state, or deployment was changed.
