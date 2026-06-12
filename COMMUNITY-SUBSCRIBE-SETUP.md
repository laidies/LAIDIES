# lAIdies Community + Subscribe Setup

This is the practical wiring plan for two things the site needs before launch:

1. A real newsletter signup and sending flow.
2. A real public discussion space so the site stops pretending the room exists before it does.
3. A human-approved AI support workflow for community comment triage and reply drafting.

## Recommended Stack

- Newsletter sending: Buttondown first.
- Community comments: Hyvor Talk first.
- Hosting: keep GitHub Pages for now.
- Domain later: `laidies.co` or `wearelaidies.com`, plus `hello@...` when ready.

## Part 1: Newsletter Signup With Buttondown

### Why Buttondown

Buttondown is the lightest fit for where lAIdies is right now. The website can stay as the branded home base, and Buttondown can handle the list, unsubscribe links, sending, and deliverability.

### What Ali Needs To Do

1. Create a Buttondown account.
2. Create the publication/newsletter.
3. Set the sender name to `lAIdies`.
4. Add the newsletter description exactly as:
   `AI fluency for women with full calendars, high standards, and no patience for beige tech explanations.`
5. Set the publication/newsletter name to `lAIdies`, not `LAIDIES` and not `laidies`.
6. Add the lAIdies logo icon from `assets/laidies-logo-square.png`.
7. Set the tint/accent color to `#ff2d9b`.
8. Replace the default confirmation and welcome emails with the templates in `email/buttondown/transactional-email-templates.md`.
9. Decide the Buttondown username/publication slug.
10. Send Codex the slug.

### What Codex Needs To Wire

Replace the placeholder form in `index.html`:

```html
<form class="subscribe-form" action="#" method="post">
```

with a real Buttondown endpoint:

```html
<form
  class="subscribe-form"
  action="https://buttondown.com/api/emails/embed-subscribe/YOUR-BUTTONDOWN-USERNAME"
  method="post"
  target="laidiesSubscribeFrame"
>
```

Do not open the public Buttondown publication page after signup. It can show an empty archive and creates an unfinished first impression. Submit the form into the hidden `laidiesSubscribeFrame` iframe and keep the subscriber on the lAIdies website with a branded "check your inbox" message.

Keep the input name as `email`:

```html
<input id="email" name="email" type="email" placeholder="you@example.com" required />
```

Optional but useful: add a hidden tag so early subscribers are marked as launch subscribers.

```html
<input type="hidden" name="tag" value="website-launch" />
```

### Weekly Sending Flow

1. Finish the web version of the episode.
2. Create a short Buttondown email that links to the episode.
3. Include the weekly Try-On prompt and community discussion links.
4. Test-send to Gmail, Outlook, and phone.
5. Send every Wednesday.

Do not send the full complex website-style HTML through email unless it has been tested hard. Email clients are much more limited than browsers.

## Part 2: The lAIdies Room With Hyvor Talk

### Why Hyvor Talk

Hyvor Talk gives the site real threaded comments without building a custom forum. It can be embedded into plain HTML pages, moderated by Ali, and separated by page IDs so each room topic has its own discussion thread.

### What Ali Needs To Do

1. Create a Hyvor Talk account.
2. Add the lAIdies website in the Hyvor console.
3. Copy the `website-id`.
4. Choose whether comments require login or allow name-only commenting.
5. Add the current local/preview domain and the final GitHub Pages/domain in Hyvor settings when needed.
6. Send Codex the `website-id`. Current Hyvor Talk website ID: `15519`.

### What Codex Needs To Build

Create one page per room thread:

| File | Room Thread | Page ID |
|---|---|---|
| `community/ask-the-room.html` | Ask the Room | `ask-the-room` |
| `community/send-it-energy.html` | Send It Energy | `send-it-energy` |
| `community/try-on-debrief.html` | The Try-On Debrief | `try-on-debrief` |
| `community/wins.html` | Wins of the Week | `wins` |
| `community/dear-laidies.html` | Dear lAIdies | `dear-laidies` |
| `community/burn-book.html` | Put It in the Burn Book | `burn-book` |

Each page gets this embed, with the real website ID:

```html
<script async src="https://talk.hyvor.com/embed/embed.js" type="module"></script>
<hyvor-talk-comments
  website-id="15519"
  page-id="ask-the-room"
></hyvor-talk-comments>
```

The `page-id` matters. It keeps each thread stable even if URLs change later.

### Homepage CTA Changes Once Hyvor Is Live

After the pages exist, update the current room links:

- `Ask the Room` -> `community/ask-the-room.html`
- `Send It Energy` -> `community/send-it-energy.html`
- `The Try-On Debrief` -> `community/try-on-debrief.html`
- `Wins of the Week` -> `community/wins.html`
- `Dear lAIdies` -> `community/dear-laidies.html`
- `Put It in the Burn Book` -> `community/burn-book.html`
- `Member Profiles` -> `community/laidy-spotlight.html` as a private profile and optional spotlight intake form, not Hyvor comments.

## Part 3: Member Profiles + Optional Laidy Spotlight Intake

Member profiles should not be a public comment thread. People are sharing career details, AI confidence gaps, tools they use, support needs, places they can help, and photos; they should submit privately and choose what can become public. Future Laidy Spotlight features should be opt-in, not assumed.

## Part 3A: Clubhouse Pass Auth Email Delivery

The Clubhouse Pass uses Supabase Auth for email-based login. Supabase's built-in email sender is only acceptable for early local testing; it is rate-limited, confusing during repeated QA, and not launch-grade. Before public testing with real users, configure a custom SMTP sender.

### Recommended Sender

Use Resend first.

Why:

- It is built for transactional product emails.
- It has a simple SMTP setup that works with Supabase Auth.
- It keeps Clubhouse Pass emails separate from Buttondown newsletter emails.
- It gives delivery logs, which makes QA much easier than guessing whether Supabase sent anything.

### What Ali Needs To Do

1. Create a Resend account.
2. Add and verify the sending domain.
   - Preferred production sender: `clubhouse@wearelaidies.com` or `hello@wearelaidies.com`.
   - If the final domain is not ready, use a verified temporary sender only for testing.
3. In Resend, create SMTP credentials.
4. In Supabase, open the project.
5. Go to `Authentication` -> email/SMTP settings.
6. Enable custom SMTP.
7. Enter the Resend SMTP values:
   - Host: from Resend SMTP settings.
   - Port: use the Resend-recommended TLS port.
   - Username: from Resend SMTP settings.
   - Password: from Resend SMTP settings.
   - Sender email: the verified sender address.
   - Sender name: `lAIdies Clubhouse`.
8. Save.
9. Send one test Clubhouse Pass email to a fresh address.
10. Confirm that Resend shows the email as delivered.

### Test Rule

Do not test Clubhouse Pass and newsletter opt-in at the same time until auth email delivery works.

Test order:

1. Click `Start fresh`.
2. Leave newsletter unchecked.
3. Send one Clubhouse Pass email.
4. Confirm it arrives quickly.
5. Open the link from the same browser/device.
6. Confirm the page changes to signed-in state.
7. Only then test newsletter opt-in.

### Product Rule

Users should experience this as one action: `Email me my Clubhouse Pass`.

Do not expose Supabase language such as magic link, OTP, confirm signup, or auth email in the lAIdies interface unless it is unavoidable error recovery copy.

### Recommended Stack

- Intake form: Tally, Typeform, Jotform, Airtable Forms, or Google Forms.
- Photo upload: use the form tool's file upload field.
- Storage: Airtable, Google Sheets, or the form tool's built-in responses.
- Drafting automation: Zapier or Make sends opt-in feature responses to an AI drafting step, then creates a Google Doc, Airtable field, or email draft for Ali.
- Final approval: Ali reviews, edits, and publishes. No auto-publishing.

### Suggested Form Fields

- Name as shown.
- Role, team, or short work description.
- Location or time zone.
- LinkedIn or optional public link.
- AI journey status, selected from fun low-pressure responses across the spectrum.
- Tools being used or tested.
- What are you struggling with?
- What are you hoping to learn next?
- Where can you offer help?
- What kind of support would be useful?
- Open to member connection through the approved community channel?
- Current lAIdies energy.
- Photo upload, or no-photo stand-in preference such as a favourite 90s/Y2K character, item, singer, actor, or classic school-photo laser background.
- Profile visibility preference.
- Optional AI-edited Y2K yearbook photo interest checkbox.
- Optional feature opt-in checkbox.
- If opted into feature consideration: what should we celebrate, what are you excited about, and what would make this a great feature?
- Permission checkbox for directory and feature use.

### Automation Output

The automation should create:

- A private member-directory record.
- A short 90s trading-card style member summary for Ali/Savina review.
- A 2-3 sentence website spotlight.
- A slightly longer newsletter version.
- A LinkedIn caption.
- An Instagram caption.
- A list of any missing info Ali should request before publishing.

### Public Directory Shape

The public member directory should be searchable and filterable by:

- AI journey status.
- Tools being used.
- What members are struggling with.
- What members want to learn.
- Where members can offer help.
- Location or time zone.
- Open to connect.

The visual treatment should use 90s trading-card styling: laser or holographic school-picture backgrounds, strong borders, useful tags, and optional Y2K yearbook photo edits. Photo sharing must be optional. Members who do not want to show their face can choose a no-photo card based on a favourite 90s/Y2K character, item, singer, actor, or general vibe.

Full design spec: `COMMUNITY-MEMBER-DIRECTORY-DESIGN.md`.

Until Hyvor is live, keep the site honest: use "opening soon," "get the launch note," or "join the waitlist."

## Part 4: AI Community Ops Assistant

The AI layer should support Ali/Savina, not replace them. At launch, use AI for private triage, summaries, tags, and reply drafts. Do not let AI auto-post public replies.

Useful jobs:

- daily digest of new comments and unanswered questions
- suggested replies in the lAIdies voice
- tags such as `needs-reply`, `good-question`, `win`, `tool-recommendation`, `potential-spotlight`, and `moderation-review`
- moderation-risk flags for spam, harassment, sensitive personal details, high-stakes advice, or claims needing receipts
- member matching based on profile data and community posts
- future content mining for glossary terms, episode ideas, and newsletter fuel

Recommended first workflow:

1. Ali reviews comments in Hyvor.
2. Ali copies selected threads into AI.
3. AI summarizes, tags, drafts replies, and flags risks.
4. Ali edits and posts manually.

Recommended automated workflow after the room has volume:

1. Hyvor sends new-comment events through webhooks.
2. Make/Zapier validates and stores comments in Airtable or Google Sheets.
3. AI tags, summarizes, and drafts suggested replies.
4. Ali reviews a private queue and posts approved replies.

Full plan: `AI-COMMUNITY-OPS-PLAN.md`.

## Community Launch Plan

### Before Public Launch

Seed the room with 10-20 women from Ali's network before announcing it broadly.

Starter posts:

- "What AI question are you embarrassed to ask at work?"
- "What did AI save you from this week?"
- "Drop one prompt that made your week easier."
- "What 90s/Y2K reference belongs in the lAIdies canon?"
- "What is one win from this week that deserves applause?"

### Weekly Rituals

- Wednesday Drop: new episode thread.
- The Try-On Debrief: try-on results and butterfly clip ratings.
- Send It Energy: prompt, workflow, receipt, article, screenshot, or tiny trick that worked.
- Wins of the Week: AI not required.
- The Burn Book: reference nominations.

### Later, Not First

- Badges.
- Monthly lAIdies Awards.
- Referral rewards.
- LAIDY as a real AI bot inside the community.

Launch the useful room first. Add sparkle after the room has people in it.

## What Codex Needs From Ali

To wire the newsletter:

- Buttondown username/publication slug.

To wire the community:

- Hyvor Talk `website-id`.
- Decision: name-only comments allowed, or login required?
- Decision: launch with all seven board pages, or start with three?

Recommended first three boards:

1. Ask the Room.
2. The Try-On Debrief.
3. Wins of the Week.
