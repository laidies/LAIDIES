# Canonical Episode Source — spec (sketch, Ali 2026-07-07)

## The problem
One episode's content is currently hand-authored across ~11 surfaces that drift apart. Today's proof:
the Ep1 "14 points" fact was corrected in the audio scripts but still lived, wrong, in the article —
because they're separate files with no single source.

## The fix
**One canonical source file per episode.** Every other surface is *derived* from it — the script is the
narrative slice (spoken), the article is the read slice + visuals, the quiz pulls the questions, the
Bronze AiGE wall pulls the cocktail line, KSVL pulls the track, etc. Edit once → propagate.

## The canonical file (per episode)
Proposed: `content/episodes/episode-0N.canon.md` (or `.yaml`) holding:

- **meta** — number, title, premise, release date, patron saint, previously-on hook, next-time hook
- **lesson** — the one-line takeaway
- **narrative** — the story spine (the beats the script + article both render)
- **concepts[]** — `{ term, plain_def, analogy }` (each concept's canonical definition + pop-culture hook)
- **facts[]** — `{ claim, measures (scope/caveat), source_url, verified_date }` — the per-episode ledger
- **comparison** — the generalized before/after: the flat way vs the fluent way (topic-agnostic; this
  week a vague vs specific prompt, Ep3 a trusted vs verified claim, etc.)
- **cocktail_party** — the "what is X, really?" one-liner
- **quotables[]** — the memorable, *selectable* lines (the "remember, LAiDIES" sign-off, the cocktail
  line, key pull-quotes) → the pool the MAiKEOVER favourite-quote picker draws from
- **discussion_prompt** — the weekly thread-starter / challenge ("post it in the rooms")
- **try_on** — the exercise
- **quiz[]** — `{ prompt, options, answer, explain, review }` (per episode; foundation quiz is separate)
- **track** — `{ title, callout_line, lyrics }` (the Wednesday Anthem)
- **references[]** — further reading
- **artwork[]** — `{ slot, image, alt }`

## Propagation map — where each field goes
| Canonical field | Surfaces it feeds |
|---|---|
| narrative | script (audio) · article (read + visuals) |
| lesson | article kit-card · quiz · homepage |
| concepts[] | article glossary · LIBRAiRY · concept cards · SUNNYVAiLE High course |
| facts[] | article stat blocks · facts-and-citations-ledger · quiz · references |
| comparison | article prompt-lab block · FAiRY Godmother |
| **cocktail_party** | **BRONZE AiGE wall** · article cocktail section · script |
| try_on | try-on.html · article · study pack (Blend & Snap) |
| quiz[] | quizzes.json · SUNNYVAiLE High course |
| **track** | **KSVL / radio** · track callout (script + article) · Bronze AiGE |
| references[] | LIBRAiRY |
| artwork[] | article · episode player |
| meta + lesson + a hero fact + cocktail_party | **NewsStand** WEDNESDAY Edition cover/lead (the episode as news) |
| quotables[] | **MAiKEOVER** favourite-quote picker → **Closet** (display) |
| discussion_prompt | **Delta LAi Nu** (Sorority) weekly room/thread · article challenge box · script sign-off |

**Hybrid-surface note:** the **NewsStand** is only a *partial* consumer — its WEDNESDAY Edition pulls the
episode as its cover/lead, but it also carries **independent** content (opinion, culture, timely AI news)
that is NOT episode-derived. Any AI claim it runs still passes [[fact-verification-rule]], and it's the
natural home for the "Current AI models" freshness callout ([[ai-model-currency-freshness-system]]).
(BRONZE AiGE has a mild version of this too — the cocktail wall is episode-fed, but the bar has its own life.)

**Two surface classes.** (A) **Content surfaces** = derived *renders* of the canonical content (article,
quiz, study pack, LIBRAiRY, High course, cards, Bronze wall, KSVL, NewsStand cover). (B) **Personalization
/ community surfaces** = user state that consumes only *selectable bits*: `quotables[]` feeds the
**MAiKEOVER** favourite-quote picker; `discussion_prompt` seeds the **Delta LAi Nu** rooms; the **Closet**
displays the user's own picks + collected episode items and **never re-derives** (records only).

## Fact-rule integration
Every `facts[]` entry must be verified + logged per [[fact-verification-rule]] (source + WHAT IT
MEASURES). Article stat blocks, the quiz, and references all cite from `facts[]`, so a fact is fixed
ONCE and propagates — no more script-vs-article drift.

## Rollout (pragmatic)
- **v1 (now):** author/edit episode content ONLY in the canonical file; propagate to surfaces in one
  pass with a surface checklist. Kills drift because there's one place to change + a known list to sync.
- **v2 (later):** a build step that generates the surface files from the canonical source automatically.
- **Backfill:** Ep1–3 already have rich articles/scripts/quizzes — reverse-extract their canonical files
  from what exists (don't rewrite working content), reconcile drift once, then forward-derive.

See [[article-derived-from-script]], [[episode-content-sync-surfaces]], [[fact-verification-rule]],
[[bronze-aige-cocktail-party-wall]].
