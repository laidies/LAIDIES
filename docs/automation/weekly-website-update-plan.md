# Weekly Website Update Plan

Issue 2 showed the current gap: the episode metadata lives in `content/episodes/`, but the homepage issue cards, quiz questions, card-pack cards, Hot Goss, glossary cards, and issue page links are still edited directly in `index.html`, `script.js`, and `issues/issue-XX.html`.

## Release Rule

The newsletter article should teach the week's lesson and link to the website modules for the issue. Time-sensitive or interactive pieces should live on the website:

- Hot Goss/news headlines: homepage only.
- Quiz: homepage module, archived by issue.
- Card pack: homepage module, archived by issue.
- Community prompt: community page or weekly thread.
- Glossary/reference additions: website modules.
- Playlist/House DJ: website module.

## Source Of Truth

Keep one episode source package per issue:

- `content/episodes/issue-XX.json`: reusable metadata, issue links, quiz/card module keys, social prompts, glossary terms, references, and website-only placements.
- `content/issues/issue-XX.md`: clean article body source, used for maintainable issue drafting and future issue-page generation.

## Build Sequence

1. Draft the issue.
2. Update `content/episodes/issue-XX.json`.
3. Run `node scripts/build-episode-assets.js`.
4. Generate or update:
   - `content/episode-index.json`
   - `content/site/site-data.js`
   - social kit
   - LinkedIn draft
   - homepage issue archive data
   - quiz data
   - card-pack data
   - website-only Hot Goss
   - Buttondown email draft
   - community prompt
5. Review the generated website locally.
6. Publish Wednesday.

## Recommended Next Build

Do not rewrite the whole static site at once. Move one surface at a time into data:

1. Add `content/site/homepage.json` for homepage sections that change weekly.
2. Move homepage issue cards into generated data rendering.
3. Move Reference Closet and glossary additions into structured data.
4. Generate issue pages from `content/issues/issue-XX.md`.
5. Generate website-only Hot Goss from a small weekly data file, not from the email article.

## Issue 2 Immediate Standard

For Issue 2, the article links into the website for:

- Issue 2 quiz
- Issue 2 card pack
- Try-On Debrief
- Glossary
- Hot Goss

That is the right editorial shape: teach in the issue, play/update on the website.
