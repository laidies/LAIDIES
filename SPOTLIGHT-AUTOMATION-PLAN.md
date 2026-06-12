# Laidy Spotlight Automation Plan

## Goal

Collect Laidy Spotlight submissions privately, including photos, then turn each response into draft content Ali can review before publishing.

## Recommended Launch Version

Use Tally for the form.

Why:
- Easy private form.
- Supports file upload.
- Can embed on the website.
- Can send responses to Google Sheets, Airtable, Zapier, or Make.
- Much faster than building a custom database and upload system.

## Form Fields

- Name as shown.
- Role, team, or short work description.
- Optional public link.
- What are you nervous about in your AI journey?
- What are you excited for?
- What are you hoping to learn next?
- What is something recent, AI or not, that you are really proud of?
- Current lAIdies energy.
- Photo upload.
- Permission checkbox for website/newsletter/LinkedIn/Instagram use.
- Anything not to include.

## Automation Flow

1. Person submits the private form.
2. Form stores answers and photo.
3. Automation sends the text answers into an AI drafting step.
4. AI creates:
   - 2-3 sentence website spotlight.
   - Newsletter version.
   - LinkedIn caption.
   - Instagram caption.
   - Follow-up questions if anything is missing.
5. Draft lands somewhere Ali controls: Google Doc, Airtable field, or email.
6. Ali reviews and edits before publishing.

## Drafting Prompt

Use this prompt in Zapier, Make, or another automation tool:

```text
You are helping draft a Laidy Spotlight for lAIdies, a 90s/Y2K-inspired newsletter for successful, stylish women building AI confidence.

Voice:
- Warm, specific, clever, and polished.
- No corporate filler.
- No fake empowerment slogans.
- Use one light lAIdies-style reference only if it fits naturally.
- Do not invent facts.

Inputs:
Name: {{name}}
Role: {{role}}
Public link: {{link}}
Nervous about: {{nervous}}
Excited for: {{excited}}
Hoping to learn: {{learn}}
Proud of: {{proud}}
Current lAIdies energy: {{energy}}
Anything not to include: {{exclusions}}

Create:
1. A 2-3 sentence website spotlight.
2. A 100-150 word newsletter spotlight.
3. A LinkedIn caption.
4. An Instagram caption.
5. Any follow-up questions Ali should ask before publishing.

Keep everything accurate to the inputs. If something is missing, say so instead of filling it in.
```

## What Codex Needs From Ali To Make It Live

Send one of these:

- Tally embed code, or
- Typeform embed code, or
- Jotform embed code, or
- Airtable form embed code, or
- Google Form link.

Then Codex can replace the local preview form with the live private form.
