# Episode Production Checklist

Use this for every Wednesday episode.

## 0. Weekly Command

Run the weekly production command before Ali review:

```powershell
.\scripts\run-weekly-production.ps1 XX
```

This rebuilds generated assets and writes:

`operations/weekly-reviews/issue-XX-production-review.md`

Use that packet to focus review on concept order, teaching depth, voice, receipts, module gaps, and launch readiness.

## 1. Episode Source

- Read `docs/season/24-episode-arc.md`.
- Draft newsletter.
- Confirm the central lesson.
- Confirm the emotional beat.
- Confirm the issue advances the reader identity shift for its act.
- Confirm the website/module pack for the issue.
- Confirm the 90s/Y2K references.
- Confirm the practical try-on/homework.

## 2. Website Updates

- Add or update article source in `content/issues/issue-XX.md`; the weekly command generates future issue pages in `issues/`.
- Add episode metadata in `content/episodes/`.
- Add website links in the issue page for quiz, card pack, Try-On, glossary/reference, and Hot Goss when relevant.
- Add quiz to the quiz archive.
- Add card pack cards for that issue.
- Add glossary terms if new concepts appear.
- Add reference-bank entries if new references are used.
- Add playlist or House DJ slot if applicable.
- Keep fast-moving news on the website by default. Do not duplicate the full Hot Goss block in the newsletter.

## 3. Social Updates

- Create carousel copy.
- Create story prompts/polls.
- Create reel script.
- Create caption.
- Save episode kit in `social/instagram/episodes/`.

## 4. Community Updates

- Add weekly discussion prompt.
- Add try-on debrief prompt.
- Add any reference request or feedback prompt.

## 5. Assets

- List images needed.
- Generate/edit assets.
- Save final assets to the project `assets/` folder.
- Check mobile crop and readability.

## 6. QA

- Load the local website.
- Check mobile and desktop.
- Check links.
- Check quiz scoring.
- Check card pack pulls.
- Check the generated Buttondown, LinkedIn, Instagram, and community prompt files.
- Check the issue against the season bible.
- Check technical accuracy and source links for claims, names, numbers, model names, companies, laws, policies, studies, and dates.
- Check that no section feels crammed or duplicated.
