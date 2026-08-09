# Episode Content Schema

Each issue gets one source file in `content/episodes/issue-XX.json`.

That file is the reusable episode package. The newsletter agent, website updates, Instagram kit, LinkedIn post, community prompts, and glossary updates should all pull from it.

Before filling the issue JSON, check `docs/season/24-episode-arc.md` for the episode's act, emotional goal, identity shift, core AI concept, and website module direction.

## Required Fields

- `number`: episode number.
- `slug`: URL-safe slug.
- `title`: public episode title.
- `subtitle`: one-line teaching angle.
- `status`: `published`, `draft`, or `planned`.
- `issueUrl`: website path to the issue HTML.
- `heroImage`: website path to the admitted hero/thumbnail image, or `null`
  only when `heroVisualState` is `HELD`.
- `heroVisualState`: optional. The only current exception value is `HELD`. It
  requires `heroImage: null`; every archive/season consumer must render a
  readable text-first held-artwork state and must not make an image request.
- `act`: season act name.
- `lesson`: what the reader learns.
- `emotionalBeat`: the story/emotional movement.
- `oneLineDescription`: archive card copy.
- `episodeDescription`: "On This Episode..." style description.
- `previously`: recap of the previous issue.
- `tryOn`: practical 10-minute action.
- `mainCharacterEnergy`: meeting-ready line.
- `rememberLine`: sign-off line.
- `communityPrompt`: prompt for the lAIdies Room.
- `glossaryTerms`: terms introduced or reinforced.
- `referencesUsed`: pop culture references used.
- `toolsMentioned`: AI tools mentioned.
- `newsstandItems`: optional current items proposed for one named NewsStand publication.
- `siteLinks`: issue-specific website links that should appear in the newsletter or issue page.
- `websiteModules`: website modules that should update for the issue, such as quiz, card pack, community thread, glossary terms, and homepage-only news placement.
- `social`: social media source fields.

## NewsStand Fields

Use `newsstandItems` when an episode drop includes current items for The Breaking, The Daily, The Weekly or The Tribune. Rendering is not editorial admission.

Each item should include:

- `headline`: short lAIdies-style headline.
- `source`: publication/source name.
- `url`: receipt link.
- `whyItMatters`: one plain-English workplace implication.
- `translation`: one funny, useful lAIdies-style explanation.

NewsStand items remain on the dated website publication because news gets stale. The newsletter may tease one admitted item or link to the NewsStand, but should not duplicate a whole paper by default.

## Site Link Fields

Use `siteLinks` when an issue should point readers into the current website experience.

Each item should include:

- `label`: reader-facing link text.
- `url`: relative website URL.
- `type`: `quiz`, `cardPack`, `community`, `glossary`, `reference`, `playlist`, `newsstand`, or `other`.

## Website Module Fields

Use `websiteModules` to describe which issue-specific website pieces should update when the episode is released.

Recommended fields:

- `quiz`: quiz key, for example `issue02`.
- `cardPack`: card-pack key, for example `issue02`.
- `communityThread`: relative URL for the weekly discussion or try-on thread.
- `glossaryTerms`: terms to highlight or add.
- `referenceCards`: references to highlight or add.
- `playlist`: weekly playlist or House DJ link.
- `newsstandPlacement`: the named paper or NewsStand surface; never an implied homepage publication.

## Social Fields

The `social` object should include:

- `reelHooks`: 3-5 hooks for Reels.
- `carouselIdea`: saveable carousel topic.
- `storyPoll`: one Story poll question.
- `captionAngle`: the main Instagram caption angle.
- `cta`: one action for the audience.

## Workflow

1. Draft the episode.
2. Check the issue against `docs/season/24-episode-arc.md`.
3. Fill or update `content/episodes/issue-XX.json`.
4. Run `node scripts/build-episode-assets.js`.
5. Review generated files:
   - `content/episode-index.json`
   - `content/site/site-data.js`
   - `social/episodes/issue-XX-instagram-kit.md`
   - `social/episodes/issue-XX-linkedin.md`
   - `email/buttondown/issue-XX.md`
   - `community/weekly-prompts/issue-XX.md`
6. Review the website issue page, homepage/archive card, quiz, card pack, glossary, and website-only modules.
   - Issue HTML pages should include `../content/episode-page.css`, `../content/episode-page.js`, `data-issue-number="X"` on the body, and `<div data-episode-toolkit></div>` below the issue header.
   - The issue toolkit pulls from `siteLinks`, so the article can point readers back to the right quiz, card pack, glossary, room, playlist, or game without hand-editing every link in the article.
7. Send/schedule the newsletter.
8. Post/schedule the social kit.

The JSON is not meant to contain the full article body. Put clean article-body source in `content/issues/issue-XX.md`. The JSON contains reusable metadata, module links, and promotion material so every channel stays synchronized.
