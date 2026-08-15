# Known-bad calibration — reporting, attack and consumer files unexplained

**Exemplar ID:** CQX-BAD-018
**Incident:** BTB-496
**Authority:** Direct Ali rejection, 2026-08-15
**Required verdict:** REJECT
**Artifact:** `operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-headline-reality-check-v3.md`
**Artifact SHA-256:** `7eea9d8953299d1299629b47cb5afd1c5854a65229e11a4cd1a648440af83053`

## Why this fails

The candidate improved the sharing route but still failed an ordinary ChatGPT
reader in four connected ways.

1. It treated the research paper as the item readers encountered. The actual
   reporting in Ali's forwarded August 12 AI Intelligence Brief used the
   headline `How Reasoning Models Think (and Why "Hidden" Isn't "Safe")`, the
   section headline `What "Hidden Reasoning" Really Is — and How Researchers
   Cracked the Envelope`, and the linked public report `OpenAI, Claude, and
   Gemini's Reasoning Got Cracked` from The Neuron. A reader is unlikely to have
   encountered the paper title itself.
2. It later said `the attacks stopped working` without first showing what the
   researchers deliberately did. `Attack` arrived as an unexplained security
   label.
3. It named API keys, access tokens and private keys without explaining what
   harm each represents in an ordinary person's terms.
4. It did not anchor the boundaries in the life of someone whose only AI use is
   a normal ChatGPT conversation. It also omitted a likely adjacent question:
   whether a Markdown (`.md`) file is one of the risky hidden records.

## Failure families

- `encounteredReportingNotIdentified`
- `attackNamedBeforeAction`
- `consumerChatMentalModelMissing`
- `ordinaryFileQuestionUnanswered`
- `securityCredentialJargonUntranslated`

## Required successor behavior

A successor must:

1. quote and link the exact reporting headline readers could have encountered,
   state its apparent meaning fairly and then identify the underlying preprint;
2. explain the tested extraction action before using `attack`: researchers
   deliberately moved an unreadable reasoning bundle from one model to a
   weaker sibling model from the same provider and prompted it to reveal the
   contents;
3. state exactly what `the attack stopped working` means: the same deliberate
   model-to-model decoding technique no longer produced the hidden contents in
   the authors' post-disclosure tests;
4. begin the reader boundary with an ordinary ChatGPT use case and distinguish
   typing in a private chat, copying selected visible text, creating a public
   share link, uploading or sending an ordinary file, exporting diagnostics and
   publishing a developer/research session record;
5. explain that a Markdown file is a readable plain-text file ending in `.md`,
   not an encrypted reasoning trace by default; sharing it shares what is
   written in it, while sharing a whole project folder can also release other
   files the person did not inspect;
6. translate every security credential into consequence: a program password,
   a temporary digital pass or the secret proof of identity; and
7. preserve the paper boundary: it did not enter ordinary private consumer
   chat accounts or study every adjacent way a person can share content.

## Calibration use

The exact v3 artifact must fail future producer and reader-entry checks without
being told Ali's expected verdict. Never copy its reporting-paper substitution,
undefined `attacks`, credential list without meaning or incomplete
consumer-file boundary.
