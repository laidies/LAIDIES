# Reference Validation System

## Goal

When someone submits a reference through Put It in the Burn Book, lAIdies should:

1. Check whether the reference fits the brand and audience.
2. Explain why it passes, needs work, or should be rejected.
3. Generate a draft Reference Closet card if it passes.
4. Queue the card for Ali/Savina approval.
5. Add approved cards to the reference bank and eventually the website.

This should be a human-approved workflow. The AI can score, draft, and organize. It should not auto-publish.

## Current Canon

### Issue 1 References

- Clueless
- Dolly Parton
- Sex and the City
- The Devil Wears Prada

### Issue 2 References

- Spice Girls
- Schitt's Creek / David Rose
- Britney Spears
- Friends
- Clueless
- Legally Blonde
- The Devil Wears Prada
- Buffy

### Existing Reference Closet Rules

- References should be widely known enough that the audience gets the joke quickly.
- The audience is women in corporate roles, roughly 30-50, who grew up with 90s/2000s pop culture.
- The reference must help explain an AI/work concept, not just be nostalgic.
- David Rose is the standing exception because specificity is the point.
- The vibe is warm, funny, useful, human, and group-chat smart. Not random, obscure, mean, or overly online.

## Validation Criteria

Each submitted reference should be scored 1-5 on:

- Audience recognition: Will lAIdies readers get it quickly?
- Brand fit: Does it feel 90s/Y2K, girl-power, workplace-adjacent, or culturally aligned?
- Usefulness: Can it explain an AI concept, work behavior, community ritual, or confidence shift?
- Freshness: Does it add something new to the canon instead of duplicating Clueless/Mean Girls/Dolly?
- Safety: Is it unlikely to create copyright, reputational, political, or insensitive issues?
- Tone fit: Can it be used warmly without punching down?

Recommended decision:

- 24-30: Pass. Generate a card.
- 18-23: Maybe. Ask for an angle or hold for later.
- Under 18: Reject politely or keep in a private "not for now" list.

## Generated Reference Card

If a reference passes, generate:

- Reference name.
- Category: screen, music, object, work, beauty, tech, or wildcard.
- Why it fits.
- AI/work concept it explains.
- One lAIdies-style analogy line.
- One possible episode fit.
- One community prompt.
- Risk note, if any.
- Suggested homepage card copy.

Example card format:

```html
<article class="reference-card" data-reference-type="screen">
  <p class="eyebrow">Screen</p>
  <h3>Reference Name</h3>
  <p>Short explanation of how this reference helps explain AI, work, confidence, judgment, or the lAIdies community.</p>
</article>
```

## Recommended Workflow

### MVP

1. Member submits a reference in a form.
2. Form asks for the reference, category, why it belongs, and optional AI/work concept.
3. AI validates it against this rubric.
4. AI generates a draft card if it passes.
5. Ali/Savina approve, edit, or reject.
6. Approved references are added to `REFERENCE-CLOSET.md`.
7. Website cards are updated manually or through a later generator.

### Later Automation

Move Reference Closet cards into structured data:

- `content/references/reference-bank.json`

Then generate:

- homepage Reference Closet cards
- Burn Book accepted cards
- per-episode suggested references
- Instagram/story prompts

## Questions To Answer Before Build

1. Should people submit references through Hyvor comments, a private form, or both?
2. Should accepted references show the submitter's name, first name only, or no credit?
3. Do you want rejected references to get a public response, or should rejection stay private?
4. Should the AI validator be strict about "widely known," or allow niche references if the explanation is strong?
5. Which categories should be official: screen, music, objects, work, beauty, tech, office, wildcard?
6. Should we allow references from outside the 90s/Y2K era if they strongly fit corporate women and AI?
7. Should approved references immediately appear in the public Reference Closet, or sit in an approval queue until a future episode uses them?
8. Should each accepted reference generate a collectible trading card too?
9. Should submitters earn a community card for getting a reference accepted?
10. What backend should hold submissions first: Airtable, Tally, Google Sheet, or Hyvor plus manual copy/paste?

## Recommended Answers

- Use a private form first, not just Hyvor, because validation and approval need structure.
- Allow public discussion in Hyvor, but official submissions should go through a form.
- Credit submitters only if they opt in.
- Be strict on usefulness, moderately strict on recognizability.
- Use categories: screen, music, objects, beauty, tech, work, wildcard.
- Allow non-90s/Y2K references only if Ali/Savina approve them as "future canon."
- Approved references should go into a private queue first, then public Reference Closet after review.
- Yes, accepted references should eventually generate collectible cards.
- Yes, an accepted reference can unlock a "Burn Book Canon" card on the member profile.
- Best first backend: Airtable or Tally feeding Airtable.
