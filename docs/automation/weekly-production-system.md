# Weekly Production System

This is the one-woman-show workflow for lAIdies.

The goal is not to remove Ali from the newsletter. The goal is to make the system do the repetitive setup, cross-channel generation, and first QA pass before Ali reviews.

## Weekly Command

Run this for the current draft issue:

```powershell
.\scripts\run-weekly-production.ps1
```

Run this for a specific issue:

```powershell
.\scripts\run-weekly-production.ps1 3
```

The command:

1. Rebuilds generated episode assets.
2. Checks the episode package.
3. Checks generated outputs.
4. Checks quiz, card pack, community, and site-link coverage.
5. Scans for obvious voice issues.
6. Flags receipt-sensitive technical lines for review.
7. Writes a review packet in `operations/weekly-reviews/`.
8. Creates an issue growth scorecard in `operations/growth/` if one does not already exist.
9. Creates an issue Agent Council review in `operations/agent-council/` if one does not already exist.

## What Ali Reviews

Ali should spend review time on:

- whether the concept is right for this point in the 24-episode arc
- whether the lesson has enough depth for a smart corporate reader
- whether the analogies teach instead of decorate
- whether the Try-On is actually useful in under 10 minutes
- whether the piece sounds like Ali
- whether technical claims have receipts
- whether the website modules make sense for the issue
- whether the Agent Council Top 5 recommendations are worth implementing
- whether the Reputation/Safety and Professional Reputation gates are clear

Ali should not have to manually rebuild:

- Buttondown draft
- LinkedIn draft
- Instagram kit
- community prompt
- homepage issue data
- quiz/card-pack selectors
- basic production QA packet
- first-pass growth scorecard
- first-pass Agent Council recommendation packet

## Source Of Truth

Use these files in this order:

1. `docs/season/24-episode-arc.md`
2. `content/episodes/issue-XX.json`
3. `content/issues/issue-XX.md`
4. `issues/issue-XX.html`
5. `content/site/quizzes.json`
6. `content/site/card-packs.json`

The season bible controls the teaching order. The issue JSON controls reusable metadata and generated channel drafts. The article Markdown controls the durable article body.

## Weekly Rhythm

### Thursday Or Friday: Seed The Next Issue

- Confirm the issue title, concept, emotional beat, and teaching goal.
- Fill or revise `content/episodes/issue-XX.json`.
- Draft the article body in `content/issues/issue-XX.md`.

### Weekend Or Monday: Build The Package

- Run `.\scripts\run-weekly-production.ps1 XX`.
- Use the review packet to fix missing modules and weak spots.
- Add quiz/card-pack data if missing.
- Read the Agent Council review for cross-functional recommendations and risks.

### Tuesday: Ali Review

- Read the article first.
- Review the packet second.
- Check the website issue page and module links.
- Review the Agent Council Top 5 recommendations.
- Confirm Reputation/Safety and Professional Reputation gate items.
- Confirm technical receipts.
- Approve newsletter/social/community drafts.

### Wednesday: Publish

- Publish or schedule Buttondown.
- Publish website updates.
- Post social launch content.
- Refresh Hot Goss if relevant.
- Refresh community digest after comments begin.

## Current Automation Boundary

Automated now:

- generated episode index
- generated website data
- generated Buttondown draft
- generated Instagram kit
- generated LinkedIn draft
- generated community prompt
- generated issue web pages from article Markdown for future issues
- generated production review packet
- generated issue growth scorecard
- generated issue Agent Council review packet
- Hyvor digest refresh, when the private key is supplied

Still needs human or future backend:

- final article writing/taste approval
- final technical source verification
- final image generation/selection
- true background-only member-card image generation
- scheduled Hyvor digest refresh
- deployment/publishing
- final approval of Agent Council recommendations
