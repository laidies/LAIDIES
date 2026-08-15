THE DAILY • AUGUST 15, 2026

# No, “Stealing Reasoning Traces” did not mean your private AI chats were posted online

*This was a research paper about saved records that developers and researchers
had already uploaded to public websites. It did not find that simply talking to
ChatGPT or Claude puts your private conversation on the internet.*

## What you may have seen

On August 10, 2026, researchers published a preprint on arXiv called
[“Stealing Reasoning Traces from Proprietary LLM
APIs”](https://arxiv.org/abs/2608.09867). The paper examined systems from
Anthropic, OpenAI and Google, plus 6,708 records of AI work that developers and
researchers had deliberately posted on GitHub and Hugging Face so other people
could inspect or reproduce it. The researchers did **not** enter ordinary
people's private chat accounts.

## What it was saying

Some AI tools save the conversation you can read plus an unreadable bundle that
helps the AI continue a longer job. The researchers found that, during their
tests, another model from the same company could sometimes make the hidden
material readable. In records people had already posted publicly, that material
included passwords and other private information.

That is a genuine security problem. But the words **people had already posted
publicly** are the hinge of this story.

## How this happened

Picture a developer who used an AI coding tool to clean up a software project.
The tool saved a machine-readable record of the run: the developer's
instructions, the answers she could see, actions the tool took and an unreadable
string carried between steps.

The developer uploaded that original record to GitHub so another researcher
could download it and reproduce the experiment. She could check the readable
conversation, but not the extra string. The paper's researchers downloaded
public records like this and recovered some of what the strings contained.

She published a record designed to preserve the whole AI run without being able
to inspect every part of it.

## When this can happen — and when it cannot

- **You have a normal private chat:** this paper did not show the provider
  secretly publishing it.
- **You select visible words and paste only those words into an email or
  document:** you move the selected words, not the saved run record.
- **You create a public chat link:** you deliberately make the visible
  conversation available. That deserves its own privacy check, but it is a
  different route.
- **Support asks for a diagnostic or troubleshooting record:** ask what it
  contains and where it will go. That is a precaution; the paper did not study
  support requests.
- **You publish a raw developer or research run:** this is the situation the
  researchers directly examined.

## What could be included without realizing it

Among the genuine user records, the researchers reported 62 API keys, 33
passwords, 24 access tokens and seven private keys. These are different kinds
of digital keys software uses to enter an account or service.

In one example, a developer asked an AI coding tool to remove private keys from
a software project. The tool repeated the keys inside material the user could
not read.

The study found 328 of 6,708 public records—4.9%—contained at least one real
sensitive item. Sixty-four recovered items were absent from the visible chat.
The researchers could not determine every item's origin: some may have remained
after visible text was cleaned; others may have come from model memory.

## The LAiDIES read

The paper describes a narrow but serious problem. “Secrets were recovered from
public AI records” does not mean “your private AI chats are online.”

If you only use ordinary private chat, this study gives you no reason to assume
your conversations were published. If you release AI development records,
create a fresh example containing only approved information—never publish the
original run. If a password or digital key was already public, remove it and
replace the key so the old one stops working.

The authors say the attacks stopped working after they alerted the model
companies. That is not independent proof that every current system is fixed.
The durable lesson: readable text can be clean while an unreadable part of the
same published record is not.

## Sources and correction note

- Panfilov et al., [“Stealing Reasoning Traces from Proprietary LLM
  APIs”](https://arxiv.org/abs/2608.09867), preprint submitted August 10, 2026.

LAiDIES will publish a dated follow-up if the paper is corrected, independently
replicated or materially contradicted, or if a provider publishes a current
account of what changed.
