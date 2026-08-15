# Known bad — source story and sharing journey missing

**Authority:** direct Ali rejection, August 15, 2026.
**Required verdict:** REJECT.
**Reuse:** calibration only; never copy.
**Rejected artifact:**
`operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-headline-reality-check-v2.md`
at SHA-256
`a3b3c128d0b1678912a4eef4b98a707f7f9b5db4f6f5ae396532949ecdf97e7a`.

## Rejected pattern

> No, this study did not find your private AI chats online
>
> Researchers studied complete behind-the-scenes files that developers and
> researchers had deliberately posted publicly.

The opening corrects one fear, but it still asks the reader to accept a vague
replacement story. It never identifies the exact public item, its headline,
publisher or date. It also substitutes `complete behind-the-scenes file` and
`AI-work file` for the earlier jargon without showing the exact sequence that
creates and publishes such a record.

## Ali's rejection

- A reader may not have seen the original story. The article must first show
  the actual headline and fairly explain what it said.
- `Full work file` remains undefined.
- `Copying and pasting an answer` remains unclear: what is being selected,
  where is it pasted and why is that different?
- The article does not show when the reported situation can happen and when it
  cannot.
- It does not explain why an ordinary user would ever share such a file or what
  unintended material could be inside it.
- The result still fails the Hannah Fry and Feynman explanatory layer.

## Missed defects

### `sourceStoryNotIntroduced`

A Headline Reality Check must identify the exact public item before correcting
it: headline or title, publisher, date, link and a fair summary of what it
claimed. The reader cannot assess a correction to an unnamed story.

### `undefinedSharingObject`

`Complete file`, `full work file` and `behind-the-scenes file` do not become
plain language through repetition. The producer must show what creates the
record and what it visibly contains: an AI coding or research tool saves a
machine-readable history of one run, including the person's instructions, the
AI's responses, tool actions and opaque carry-along fields.

### `sharingJourneyMissing`

The producer must reconstruct the complete route: person uses the tool → tool
saves the run record → person deliberately uploads that original record to a
public repository so others can inspect or reproduce the work → another person
downloads it. Without this sequence, `shared publicly` is a label, not an
explanation.

### `canAndCannotHappenBoundaryMissing`

The story must separate: ordinary private chat; selecting visible words and
pasting only those words elsewhere; creating a public share link for the
visible conversation; sending a requested diagnostic record; and publishing a
raw developer/research run. Only the last category was directly studied here.
Related precautions must be labelled as precautions, not findings.

### `unintendedContentsAndOriginMissing`

The reader needs concrete examples and their possible route into the record.
The paper found API keys, passwords, access tokens, private keys, email
addresses, names and postal addresses. One example involved an AI asked to
clean a software repository: its hidden reasoning repeated the same API keys
it was meant to remove. The paper could not determine the origin of every
item; uncertainty must remain explicit.

## Required successor proof

Before technical explanation, an unfamiliar reader must be able to answer:

1. What exact public item are we checking, who published it and when?
2. What did it actually claim?
3. What software-created record did the study examine?
4. Who deliberately uploaded it, where and why?
5. How is that different from selecting visible answer text and pasting it?
6. When can this situation happen and when can it not?
7. What unintended material could be inside, and how might it have arrived?
8. Which finding was directly observed and which advice is a precaution?

The exact rejected artifact must fail the repaired reader-entry check unaided.
A successor cannot pass through synonyms; it must reconstruct the complete
reader journey.
