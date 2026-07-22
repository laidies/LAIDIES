# Episode RECURRING SEGMENTS — locked show-format templates (same every episode; only content changes)

The show has structural beats that appear EVERY episode. Each gets a **locked visual format + treatment**
that is IDENTICAL across episodes — only the episode-specific content swaps in. This gives the series its
consistency (like a TV show's recap / title / "next time") AND is a production template (reuse the frame,
swap the content). Build each ONCE; reuse the shell forever.

Also: **deliberately VARY the 4 formats through each episode** (scene ↔ text card ↔ emphasis burst ↔ a
comic-book page now and then) — for visual interest AND storytelling. Never stack many identical full scenes.
Formats + animation: `episode-comic-grammar.md` + `comic-animation-frame-spec.md`.

## THE RECURRING SEGMENTS (locked template each)
| # | Segment | Format (locked) | Same every ep | Changes per ep |
|---|---|---|---|---|
| 1 | **PREVIOUSLY ON** | comic STRIP (3 panels) + caption `PREVIOUSLY ON LAiDIES` | the strip layout + caption style | the prior ep's recapped beats |
| 2 | **THIS WEEK / on this episode** | teaser strip/montage + caption `THIS WEEK` | teaser format + caption | this ep's hook imagery |
| 3 | **TITLE CARD** | bold comic title lettering `EPISODE N · [TITLE]` | lettering style + layout | the number + title |
| 4 | **WELCOME BACK TO LADIES** | host/heroine welcome frame ("smart, busy women… one Wednesday at a time… SUNNYVAiLE") | the composition + branded treatment | nothing (or subtle: her outfit = the week's) |
| 5 | **"I COULDN'T HELP BUT WONDER"** | CLOSE-UP of the heroine thinking (the Carrie beat), screen-glow/contemplative | the framing (tight, reflective) | her expression + the ep's question |
| 6 | **✨ TRANSFORMATION** | the reusable 5-frame sequence (corporate → FAiRY G. wand → sparkle/POOF → reveal) | frames 1–4 (corporate, wand, sparkle ×2) | ONLY frame 5 = the week's SUNNYVAiLE outfit reveal |
| 7 | **CONCEPT TEXT-CARDS** | bold comic term lettering `TERM` + one-line def, graphic ground | the card treatment/lettering | which terms (the ep's concepts) |
| 8 | **EMPHASIS BURSTS** | word-burst comic lettering (POW!/AS-IF! language, `reference/font-and-text-emphasis/`) | the burst visual language | the ep's punchlines |
| 9 | **COMIC-BOOK PAGE** | a multi-panel full PAGE (style-echo `reference/comic-book-page-style/comicpage-01.webp`) — the ep's ONE biggest dramatic beat, used ~once | the "full comic page" treatment | which beat gets the page |
| 10 | **COCKTAIL PARTY** | text card, "say-it-at-happy-hour" line, cocktail/Bronze-AiGE motif | the card treatment | the ep's cocktail line |
| 11 | **SIGN-OFF / "remember, ladies"** | big emphasis frame: the remember line + `See you next Wednesday… in SUNNYVAiLE` | the sign-off treatment (locked) | the ep's remember line |
| 12 | **NEXT WEEK ON** | teaser strip + caption `NEXT WEEK ON LAiDIES` | teaser format + caption | next ep's hook |

## Rules
- Segments 1–6, 10–12 are **STRUCTURAL** — same shell every episode; the announcer/host lines drive the swap.
- Segments 7–9 **recur as FORMATS** — every episode uses concept cards + emphasis bursts + (usually) one
  comic page; which/how-many is episode-driven.
- The **transformation** (6) is the big reuse win: 4 shared frames + 1 new reveal per episode.
- **Consistency check:** the "Previously on / This week / Welcome back / I couldn't help but wonder /
  transformation / cocktail / sign-off / Next week" beats must LOOK the same across Ep1–N — a viewer should
  recognize the show's rhythm. Only content changes.
- **Trailer** shares the DNA (title/host-welcome/sign-off treatments) but is its own structure (a tour).

## Output naming (so shared shells are reusable)
Shared shells: `recurring-<segment>-shell.png` (e.g. `recurring-previously-strip-shell`, `recurring-
transformation-f1..f4`). Per-episode swap-ins: `ep0N-<segment>.png`. This lets the shell be reused and only
the swap-in re-generated each week.
