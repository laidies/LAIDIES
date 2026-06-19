# Dream Phone Content Model

Date: 2026-06-19

Status: internal content model. Not implementation-ready. Not for Ali review yet.

Live Dream Phone files were not edited. No staging, commit, push, or `git add` was performed.

## Content Goal

Dream Phone content should make the user think:

> Of course this is what that caller would say.

It must not feel like random fortunes with character names attached.

## Caller Schema

Each caller needs:

```text
id
display name
role
number
image
featured weight
quick-call domains
play-game clue tags
voice rules
advice templates
remix rules
safe fallback
```

## Required Character Mapping

Future requirement:

- Ali image -> Founder.
- Current Founder image -> Boss.
- Deb -> Icon.
- Mme CLAi-O -> Psychic.
- LAiDY -> Wishmaker.

This mapping can stay, but future UI must avoid awkward cropping, giant portraits, and tiny unreadable avatars.

## Caller Roles

Core callers:

| Caller | Role | Quick Call Strength | Play The Game Tags |
| --- | --- | --- | --- |
| Founder | Vision / priority | What matters most, strategy, product taste | Priority, Strategy, Risk |
| Boss | Leadership | Executive framing, meeting judgment | Decision, Priority, Context |
| Icon | Confidence / office lore | Social read, confidence, presentation | Confidence, Pattern, Voice |
| Psychic | Pattern recognition | What keeps showing up, intuition + receipts | Pattern, Context, Human Review |
| Wishmaker | Prompt magic | Turn vague want into a better ask | Prompt, Context, Cleaner Ask |
| Receipts | Evidence | Verification, source check, don't forward nonsense | Evidence, Second Source, Human Review |
| AI Help | Tool use | Prompt structure, verification, AI workflow | Prompt, Tool Use, Human Review |
| Boundary | Boundaries | Say no, scope, clean limits | Boundary, Decision |
| Comms | Voice | Say it clearly, shorten, meeting-safe language | Voice, Cleaner Ask |
| Data | Evidence / analysis | What the numbers prove and don't prove | Evidence, Signal, Context |

Full directory can exist, but the first screen should not require users to browse every caller.

## Quick Call Output Model

Input can be:

- caller selected,
- need selected,
- Surprise Me,
- dialed caller number.

Output structure:

```text
[Caller] says:
[role-specific advice]

Why this matters:
[short usefulness line]

Try next:
[one concise action]
```

Example: Receipts

```text
Receipts says:
Before you forward that answer, check the source, date, and claim that would matter if it were wrong.

Why this matters:
The vibe can be right and the citation can still be fake.

Try next:
Verify one named source before you trust the summary.
```

Example: Wishmaker

```text
Wishmaker says:
Your prompt is asking for magic without giving the spell ingredients. Add audience, context, constraints, and what good looks like.

Why this matters:
AI can draft faster when the ask stops playing hard to get.

Try next:
Rewrite the ask in one sentence: "Help me make [thing] for [audience] so it can [goal]."
```

Example: Boss

```text
Boss says:
Lead with the decision, then the tradeoff, then what you need from the room.

Why this matters:
If the recommendation is hiding in paragraph four, the room will make a worse one first.

Try next:
Move your ask into the first sentence.
```

## Remix Cards

Remix cards modify the active caller's advice. They do not create unrelated output.

### Share a Secret

Purpose:

- Friend version.
- Share-with-the-girls version.
- More intimate, still useful.

Template:

```text
Share a Secret from [Caller]:
[same advice, but in private/bestie language]
```

Example: Receipts + Share a Secret

```text
Receipts whispers:
Do not let a confident-looking answer embarrass you in public. Check one source before the group chat gets theatrical.
```

### Speaker Phone

Purpose:

- Work / meeting version.
- Professional phrasing.
- Something the user could say out loud.

Template:

```text
Speaker Phone from [Caller]:
[meeting-ready wording]
```

Example: Receipts + Speaker Phone

```text
Receipts on Speaker Phone:
Before we use this, I want to verify the source, date, and any claim that would materially change the recommendation.
```

### Mom Says Hang Up

Purpose:

- Stop overthinking.
- One next step.
- Decisive close.

Template:

```text
Mom Says Hang Up:
[single next move from the caller's angle]
```

Example: Wishmaker + Mom Says Hang Up

```text
Mom Says Hang Up:
Add audience, context, and output format to the prompt. Then run it once. No more regenerating the vague version.
```

## Play The Game Clue Model

Each clue needs:

- caller source,
- clue text,
- signal tags,
- saved state,
- optional special-card interpretation.

Clue structure:

```text
Clue [n] from [Caller]:
[voice-specific clue]

Signals:
[Tag 1] + [Tag 2]
```

Example: AI Help

```text
Clue 2 from AI Help:
The tool is not being mysterious. Your prompt is missing audience, constraints, and what a good answer should include.

Signals:
Prompt + Context
```

Example: Psychic

```text
Clue 3 from Psychic:
The same problem has appeared in three outfits. That is no longer a coincidence; it is a pattern asking for a receipt.

Signals:
Pattern + Human Review
```

## Outcome Resolver

Outcome categories:

- Receipts.
- Better Prompt.
- Context.
- Boundaries.
- Human Review.
- Stop Overthinking.
- Elle Woods Check.
- Miranda Pass.
- Cleaner Ask.
- Second Source.

Simple resolver:

```text
start score at 0 for each outcome
for each clue:
  add 2 to caller primary tag
  add 1 to caller secondary tag
  add 1 if special card interpretation reinforces a tag
after 3 clues:
  highest score wins
  tie breaker = last clue tag, then safer outcome
show "why" using the top two clues
```

Example:

Calls:

- Receipts -> Evidence + Second Source.
- AI Help -> Prompt + Context.
- Psychic -> Pattern + Human Review.

Reveal:

```text
You need Human Review.

Why:
The clues point to a tool answer that needs evidence and a human read before it moves.

Next move:
Ask a real person to check one claim, one source, and one consequence.
```

## Content Risks

- Too much copy on mobile.
- The reveal feels arbitrary.
- The same advice appears for every caller.
- Remix cards feel decorative.
- Play clues do not produce a meaningfully different outcome.

## Content Readiness

Ready enough for internal prototype:

- caller schema,
- remix rules,
- clue tags,
- resolver concept.

Not ready for implementation:

- final caller copy,
- full 27-caller tuning,
- QA for repeated sessions,
- safety copy for career/AI advice,
- charm persistence language.
