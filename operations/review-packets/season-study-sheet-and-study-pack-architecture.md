# Season Study Sheet And Study Pack Architecture

Date: 2026-06-21

Status: **Planning standard, with one safe Season-page copy update**

## Why This Exists

The Season page should frame LAiDIES as a 24-Episode season, not as a magazine stack or unordered archive. Readers should understand that Episode 1 starts the arc, each Episode builds on the last, and returning readers need a quick way to refresh the core idea without rereading the full article every time.

## Season Intro Language Recommendation

Recommended public direction:

> Episode Archive / 24-Episode Season
>
> Read the LAiDIES season in order.
>
> Start with Episode 1 and keep going. Each Episode builds on the last. The Wednesday Bag turns the current Episode into a ritual, and Episode Study Packs keep the key ideas easy to review, practice, and use later. The Study Sheet is the quick-refresh version: core lesson, key concepts, what to remember, and how to use it at work.

This replaces:

- `Read the LAiDIES season like a weekly magazine stack.`
- `Learn keeps the durable concepts findable...`

Do not use `Learn` as the main durable label for this page. The Season page should point to the Episode system: Episode, Study Pack, Study Sheet, Wednesday Bag, and Quiz.

## Study Sheet Pattern

The Study Sheet is not marketing copy and not a normal recap. It is the sheet a reader would bring into a test: compact, useful, and directly instructional.

Each Episode Study Sheet should include:

- **Core lesson**: 2-3 short paragraphs that teach the concept directly.
- **Key concepts**: three core terms or ideas with short definitions.
- **Remember this**: one sticky LAiDIES line.
- **Use it at work**: one practical action for a meeting, email, planning task, manager moment, or team workflow.
- **Use it outside work**: optional, only when the Episode concept naturally applies to life admin, planning, family logistics, or personal projects.

Study Sheet buttons:

- `Read Full Episode`
- `Open Study Pack`
- `Take Quiz`

Do not create placeholder Study Sheets that pretend to be complete. Each Study Sheet needs real Episode-specific teaching content.

## Study Pack Architecture

**Episode Study Pack**

Purpose: help readers understand, review, and apply the Episode.

Inside:

- **The Study Sheet**
  - Purpose: get the concept fast.
  - Includes: core lesson, key concepts, what to remember, and practical takeaway.
- **The Try-On**
  - Purpose: apply the concept to a real work or life scenario.
- **The Cheat Sheet**
  - Purpose: save or print the practical reference.
  - Naming note: use `Cheat Sheet` as the public purpose label where possible. `Printable` describes the format, not the job.
- **The Trading Cards**
  - Purpose: make key terms, tools, characters, or concepts memorable.

## Quiz Placement Rule

The Quiz should live beside the Study Pack, not inside it.

Short rule:

> Study Pack = learn and practice. Quiz = check and earn.

Why:

- The Study Pack helps readers review and apply the concept.
- The Quiz checks understanding after the Episode and Try-On.
- Keeping the Quiz separate makes the reader journey clearer: read, practice, then check.

## Weekly Bag Connection

The Wednesday Bag remains the current-week ritual hub. It can surface the Study Pack, Cheat Sheet, Try-On, Trading Cards, and Quiz, but it should not blur their jobs.

Recommended future relationship:

- Season page: find Episodes in order and preview the Study Sheet purpose.
- Episode page: read the full article and use the after-read path.
- Episode Study Pack: review and practice the Episode concept.
- Wednesday Bag: complete the weekly ritual around the current Episode.
- Quiz: check understanding and earn/progress.

## Implement Now

- Update `episodes.html` intro copy to remove magazine-stack framing.
- Replace `Learn` in the Season intro with Episode Study Pack / Study Sheet language.
- Keep the Episode card list in order.
- Keep Episode 3 visible.
- Document the Study Sheet and Study Pack naming architecture.

## Implement Later

- Design the actual Study Sheet card pattern.
- Write Episode-specific Study Sheets for Episode 1, Episode 2, and Episode 3.
- Decide where Study Sheet links appear on each Season card.
- Decide whether Study Sheets live in new routes, existing Study Pack surfaces, or a data-driven drawer/modal.
- Rename remaining `Printable` labels to `Cheat Sheet` only where the destination and user expectation are clear.
- Align Weekly Bag labels with the approved Study Pack architecture.

## Not Approved In This Pass

- Building full Study Sheets for every Episode.
- Adding fake Study Sheet links.
- Creating placeholder Study Sheet pages.
- Renaming routes.
- Modifying live Episode article files.

## Recommended Next Implementation Slice

Create one review-only Study Sheet prototype for Episode 1 using real Episode 1 content, then evaluate:

- whether the Study Sheet is useful without rereading the article;
- whether the Season card should expose it directly;
- whether the Study Sheet belongs in a drawer, a Study Pack page, or a compact inline card.
