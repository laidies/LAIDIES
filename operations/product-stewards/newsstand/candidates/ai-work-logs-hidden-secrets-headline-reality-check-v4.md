THE DAILY • AUGUST 15, 2026

# What the “cracked AI reasoning” headline actually found—and what it means for your ChatGPT files

*The reporting sounded like a breach of private chats. It was not. Researchers
found real secrets inside specialised AI-work records posted publicly so others
could inspect or reproduce them. Here is what that changes for you.*

## What you may have seen

The August 12, 2026 headline was [“OpenAI, Claude, and Gemini’s Reasoning Got
Cracked”](https://www.theneurondaily.com/p/openai-claude-and-gemini-s-reasoning-got-cracked)
from The Neuron. Inside was “Researchers Cracked Open AI’s Hidden Reasoning.”

## What it was saying

The story said researchers got weaker sibling models to turn hidden blocks from
Claude, ChatGPT and Gemini back into readable text.

“Cracked” can sound like someone broke into ChatGPT accounts. The story was
actually reporting on an August 10 research preprint called
[“Stealing Reasoning Traces from Proprietary LLM
APIs”](https://arxiv.org/abs/2608.09867).

## What actually happened

In ChatGPT, you type words and read an answer. Specialised coding and research
tools can also plan, open files, run commands and save a job record. That record
can include the conversation
and an unreadable bundle passed between models to continue the work.

The researchers downloaded 6,708 of these records from public GitHub and
Hugging Face pages, where they had been posted for inspection or reuse. The
researchers did not enter private ChatGPT accounts.

## What was the “attack”?

Here, an **attack** means a deliberate security test—not
something that happened automatically to every AI user.

They moved a powerful model’s bundle into a cheaper, weaker model from the
same company, gave it instructions designed to get around a refusal and asked
it to print the contents. Sometimes it did.

After the researchers warned the AI companies, this exact model-to-model
decoding trick stopped revealing hidden material in the authors’ tests. That
does not prove every possible AI privacy problem is fixed.

## What does this mean if I only use ChatGPT?

The important question is not simply, “Did AI touch this?” It is, “What exactly
am I sharing, and with whom?”

- **Type something into a private chat:** you are giving that information to
  ChatGPT so it can answer. This paper did not show private chats appearing on
  the public internet. Storage and use are separate questions governed partly
  by your account and Data Controls.
- **Attach a document to a chat:** ChatGPT can read the document. Attaching it
  does not by itself create a public webpage, but it does give the service the
  file. Check it for confidential material first.
- **Create a shared-chat link:** anyone who receives that link can see the
  conversation included in it and can pass the link on. This is not the route
  the paper studied.
- **Copy part of an answer into an email:** only the words you selected move.
  The specialised saved record does not secretly travel with them.
- **Post a saved coding or research run online:** this is the route the paper
  studied. A job record may contain the chat, the AI’s actions and extra data
  that was never visible on screen.

## What about a Markdown file?

A Markdown (`.md`) file is readable plain text. People use simple marks inside
it to make headings and lists.

A Markdown file is **not** an unreadable reasoning bundle simply because AI
helped create it. Sharing one Markdown file sends its readable words: uploading
`meeting-notes.md` gives them to ChatGPT; emailing it gives them to the
recipient. Check for names, confidential facts, links and unexpected AI text.

An entire project folder may also contain settings, AI-session records or files
you did not inspect. The study examined public session records with unreadable
bundles—not ordinary Markdown documents.

## What private information did they find?

The researchers reported that 328 of the 6,708 public records—4.9%—contained at
least one real sensitive item. These included 33 passwords; 62 **API keys**,
passwords issued to software that may permit use or charges; 24 **access
tokens**, temporary digital passes; and seven **private keys**, secret proof
used to unlock access or confirm identity.

Sixty-four items were absent from the visible conversation. In one example, an
AI coding tool repeated keys it was meant to remove inside unreadable material.

The researchers could not determine every item’s origin. Some may have survived
visible-text cleaning; others may have been recalled by the model.

## The LAiDIES read

The reporting made a specialised flaw sound much closer to every person’s
private chatbot account than it was. The real finding is narrower: some public
records from advanced AI work contained an unreadable layer the researchers
could decode in their tests.

If you use ordinary private chat, this paper does not show your chats were made
public. Before typing or attaching something, ask whether you would be
comfortable giving it to that AI service. Before sharing a link or file, open
exactly what another person will receive. For a software project or saved AI
run, publish a clean set of approved files—not the raw record of the AI’s work.

## Sources and correction note

- The Neuron, [“OpenAI, Claude, and Gemini’s Reasoning Got
  Cracked”](https://www.theneurondaily.com/p/openai-claude-and-gemini-s-reasoning-got-cracked).
- Panfilov et al., [“Stealing Reasoning Traces from Proprietary LLM
  APIs”](https://arxiv.org/abs/2608.09867), preprint submitted August 10, 2026.
- OpenAI, [ChatGPT Data Controls](https://help.openai.com/en/articles/7730893-chatgpt-data-controls)
  and [Shared Links FAQ](https://help.openai.com/en/articles/7925741-chatgpt-shared-links-),
  checked August 15, 2026.

LAiDIES will publish a dated follow-up if the paper is corrected, independently
replicated or materially contradicted, or if a provider publishes a current
account of what changed.
