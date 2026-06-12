# AI Chat Room Digest Plan

## Product Goal

The lAIdies Room should not become a pile of useful comments nobody can find again.

The digest should monitor community threads and produce a navigable board that helps members quickly find:

- questions with helpful answers
- useful tips worth saving
- unanswered questions that need the room
- repeated themes that deserve an FAQ, glossary entry, issue example, or Instagram post
- factual or sensitive claims that need receipts before being treated as guidance

## Current Chat Provider

The community pages use Hyvor Talk embeds with website ID `15519`.

Examples:

- `community/ask-the-room.html` uses `page-id="ask-the-room"`
- `community/send-it-energy.html` uses `page-id="send-it-energy"`
- `community/try-on-debrief.html` uses `page-id="try-on-debrief"`

Hyvor supports:

- Public/comment data access through the Data API.
- Private moderation and comment operations through the Console API.
- Webhooks for comment, vote, reaction, flag, user, and media events, subject to plan availability.

## Digest Categories

### Answered And Useful

Comments should land here when they have strong usefulness signals:

- moderator marks as featured/loved
- upvotes or positive replies
- replies containing phrases like "this worked," "thank you," "I tried this," or "solved it"
- AI classification says the reply gives a concrete, actionable answer

### Tips Worth Saving

Short reusable advice, workflows, prompt patterns, tool settings, examples, or resources.

Signals:

- contains a concrete step
- mentions a tool, setting, prompt, workflow, checklist, source, or template
- can be reused outside the original question

### Unanswered

Questions that need someone to respond.

Signals:

- top-level comment with question language
- no replies
- replies exist but none are classified as useful
- comment is older than 24 hours and still unresolved

### Needs Receipts

Anything that might be useful but should not become guidance yet.

Signals:

- factual claim without a source
- legal, tax, HR, medical, financial, privacy, or policy implication
- specific model/tool capability claim
- named person, company, date, statistic, quote, law, policy, price, or product detail

### Repeated Themes

Question clusters that keep showing up across rooms.

Signals:

- repeated terms and intents
- similar questions across different page IDs
- unresolved confusion that should become a glossary entry, issue sidebar, or future episode example

## AI Agent Behavior

The AI agent should classify and summarize. It should not silently turn community comments into official advice.

For each new or changed comment, the agent should output:

- category labels
- short member-facing summary
- source page ID
- source comment ID
- whether the item needs human review
- why it was categorized that way
- recommended action: publish, hold for receipts, ask the room, turn into FAQ, turn into issue example, or ignore

## Human Review Rules

Automatically publish only low-risk navigation metadata, such as:

- unanswered question links
- non-sensitive tips that are clearly phrased as member suggestions
- high-level repeated themes

Require human review before publishing:

- legal, tax, HR, privacy, policy, medical, or financial guidance
- claims about current AI tools, pricing, model names, laws, studies, numbers, quotes, dates, or companies
- anything framed as "correct" rather than "helpful"
- anything that might expose private/confidential workplace information

## Technical Shape

Implemented V0:

1. `scripts/build-chat-room-digest.js` can pull published comments from Hyvor's Console API.
2. The script classifies comments with conservative rules into answered, unanswered, tips, needs-receipts, and repeated-theme buckets.
3. It writes `content/community/chat-room-digest.json`.
4. `community/chat-room-digest.html` renders that JSON in the browser.
5. API keys stay out of browser code.

Preferred V1:

1. Hyvor Talk sends webhooks for comment, vote, reaction, update, and flag events to a small backend endpoint.
2. The backend stores normalized comments and AI classifications.
3. The AI digest agent classifies new or changed items.
4. Human-review items go into a review queue.
5. Approved digest items publish to a static JSON file or API endpoint consumed by `community/chat-room-digest.html`.

Fallback V1 if webhooks are not available:

1. A scheduled job calls Hyvor's Console API every few hours.
2. It pulls recent comments across the community page IDs.
3. It runs the same classification and review workflow.
4. It publishes the digest output.

## Public Digest Page Requirements

`community/chat-room-digest.html` should show:

- Answered and useful
- Unanswered questions
- Tips worth saving
- Needs receipts
- Repeated themes

Each item should include:

- short summary
- source room
- status
- link back to the source thread/comment when available
- reviewed/not reviewed indicator

## Implementation Notes

- Do not expose Hyvor Console API keys or AI API keys in browser JavaScript.
- Browser-side code may read public digest JSON, but classification must happen server-side.
- Keep source links back to the original Hyvor thread so members can inspect context.
- Avoid saying an answer is "correct" unless a human reviewer has checked the relevant receipts.
- Setup details live in `operations/community-digest-setup.md`.
