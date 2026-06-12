# Community Digest Setup

## What Is Already Wired

The community pages use Hyvor Talk comments with website ID `15519`.

The Chat Room Digest page now reads:

`content/community/chat-room-digest.json`

The private updater script is:

`scripts/build-chat-room-digest.js`

It pulls published comments from Hyvor, classifies them into digest sections, and rewrites the public JSON file.

## Required Hyvor Setup

In Hyvor Talk Console:

1. Confirm the site ID is `15519`.
2. Create a Console API key.
3. Keep that key private. Do not paste it into HTML, browser JavaScript, or `content/`.

## Local Refresh Command

Easiest option: run the helper script. It will ask for the key, use it only for that refresh, and then clear it from the shell session.

```powershell
.\scripts\run-chat-room-digest.ps1
```

Manual option: set the API key in the shell session, then run the updater.

```powershell
$env:HYVOR_WEBSITE_ID = "15519"
$env:HYVOR_CONSOLE_API_KEY = "paste-private-key-here"
& 'C:\Users\alieakin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' scripts\build-chat-room-digest.js
```

The script writes:

`content/community/chat-room-digest.json`

## Seed Test Comments

To post one test comment in each Hyvor room and immediately refresh the digest, run:

```powershell
.\scripts\seed-chat-room-test-comments.ps1
```

This uses the same private-key prompt pattern. It posts synthetic test comments through the Hyvor Console API. This validates the digest pipeline, but it does not replace a final manual browser test of the real member comment experience.

## What The Script Classifies

- Answered + useful: replies or questions with useful signals.
- Unanswered: top-level questions with no useful reply yet.
- Tips: prompt patterns, workflow shortcuts, settings, checklists, examples, and links.
- Needs receipts: legal, tax, HR, privacy, policy, tool, price, date, number, company, quote, source, or other sensitive/factual claims.
- Repeated themes: repeated topics across rooms.

## Human Review Rule

The digest can help people navigate. It should not silently turn member comments into official guidance.

Human review is required before publishing anything as correct guidance when it touches:

- legal
- tax
- HR
- privacy
- policy
- medical
- financial
- current AI tool details
- prices
- companies
- dates
- numbers
- quotes
- sources

## Future Automation

For a full live workflow:

1. Add Hyvor webhooks for comment, update, vote, reaction, and flag events.
2. Send those events to a private backend or scheduled worker.
3. Run the digest classifier after each event or on a recurring schedule.
4. Publish the approved JSON output.
5. Add an admin review queue before anything sensitive becomes public guidance.
