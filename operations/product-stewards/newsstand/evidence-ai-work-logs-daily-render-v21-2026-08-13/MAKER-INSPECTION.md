# Complete Daily successor — maker visual inspection

Observed: `2026-08-13T01:27:39-07:00`

Status: `MAKER_VISUAL_PASS_PRIVATE_CANDIDATE_ONLY`

## Exact candidate

- Prose: `operations/product-stewards/newsstand/candidates/ai-work-files-private-details-2026-08-12-exact-prose-v3.md` — SHA-256 `1423ad53502f58d6c87eae251b6ce2edb6e8f36eda324c9933fbc2a06fbe8255`
- Story record: `operations/product-stewards/newsstand/candidates/ai-work-files-private-details-2026-08-12-story-record-candidate-v3.json` — SHA-256 `bad8a35fac5c1c02a8dca28a2ca1ef9d892145e9e8bbed3aa40ae6a4f6eff484`
- Producer proof: `operations/product-stewards/newsstand/candidates/ai-work-files-private-details-2026-08-12-producer-proof-v3.json` — SHA-256 `13547499ccc07881b77cd174126f12433767e76750a99871feba4cb0b5fc8a0c`

## Exact pixels inspected

| Rendered viewport | Artifact | SHA-256 | Maker observation |
|---|---|---|---|
| 1440 × 1000 Daily front | `daily-review-default-1440.png` | `eebfbfc57778502afe81fd692175c5f029b6bf23bc6429c8d2d592501aa50c16` | Newspaper masthead, dated edition rail, lead hierarchy, interpretation, action object and three distinct side-column features are coherent. No blank operational boxes or internal production language remain. |
| 390 × 844 Daily front | `daily-review-default-390.png` | `dd28bdce0b1e147045a873bdb5def65258a8a046c5c29f4b731d2e58384552e2` | The paper collapses to one column without losing the four top-level routes, service identities or action hierarchy. |
| 320 × 844 Daily front | `daily-review-default-320.png` | `32ad65c2b4c87e26b324d60a446cdeb36e792d1d1083786fa2e9307ad0c331ad` | All content remains contained and legible. Archive + Topics wraps and topic chips form three rows, but neither blocks use. |
| 1440 × 1000 full article | `daily-review-article-1440.png` | `89f3d4912252355c10c94234aae678d49b4676dc915087185c9322331183f0fb` | The article element is a 1040-pixel readable column rendered inside the 1440 viewport. Alternating sections, the Before You Share object, sources and evidence note are distinct. |
| 390 × 844 full article | `daily-review-article-390.png` | `a09e5c93571e24ebc5c33df46d2b42c189d08b2a90ac941f719537967ab0de89` | Longform hierarchy and body measure survive without clipping or horizontal overflow. |
| 320 × 844 full article | `daily-review-article-320.png` | `20c69572c4f1c2fdc549f655d5315851d77a823ec521e421e9a6f70615082e79` | The narrow article is dense but readable; every section, action and source remains intact. |

## Checks and limits

- `node scripts/test-newsstand-reader-browser.mjs` passed `236` rendered checks across routing, history, hold/stale/correction/retraction states, focus, reduced motion, zoom and 1440/390/320 candidate rendering.
- The maker directly inspected the six rendered files at original resolution.
- The known-bad predecessor was not used as visual authority. It remains rejected.
- The article screenshots crop to the article element, so they do not show the surrounding site shell. This does not claim a standalone article-navigation judgment.

This maker pass authorizes only a role-distinct visual judgment. It is not Ali approval, unfamiliar-reader evidence, positive-exemplar admission, canonical write, deployment or public verification.
