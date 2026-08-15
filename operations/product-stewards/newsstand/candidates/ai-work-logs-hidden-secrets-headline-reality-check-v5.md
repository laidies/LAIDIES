THE DAILY • AUGUST 15, 2026

# What the “cracked AI reasoning” story actually means for the way you use AI

*The reporting sounded like someone had broken into private AI chats. They had
not. Researchers found secrets in records made by advanced AI tools and posted
online by developers and researchers for others to inspect.*

## What you may have seen

On August 12, 2026, The Neuron ran the report [“OpenAI, Claude, and Gemini’s Reasoning Got
Cracked”](https://www.theneurondaily.com/p/openai-claude-and-gemini-s-reasoning-got-cracked),
with a story called “Researchers Cracked Open AI’s Hidden Reasoning.”

## What it was saying

The story said researchers took an unreadable bundle made by a capable AI
system, gave it to a weaker version from the same company and got
back readable information. They found personal information
and keys inside records people had already put online.

But “cracked” makes it sound closer to an
ordinary private ChatGPT or Claude conversation than the underlying research
was. The source was an August 10 preprint called [“Stealing Reasoning Traces
from Proprietary LLM APIs”](https://arxiv.org/abs/2608.09867).

## What actually happened

Separate four different things:

1. **What you give the AI:** a question, pasted text, photo, document,
   spreadsheet or an entire work folder.
2. **What the AI gives you:** an answer, summary, image, plan or finished file.
3. **What some advanced tools record automatically:** while an AI works through
   a coding or research job, its tool may make a behind-the-scenes activity
   record. It can include instructions, replies, files opened, actions and
   information passed between AI steps. It may be called a run history, session
   log or trace. This is not the Save button in an ordinary chat.
4. **What somebody later shares:** the owner may upload that activity record—or
   a project folder containing it—to a public website so other people can
   inspect, debug or reproduce the work.

The paper concerned number three being included when number four was posted
publicly. The researchers downloaded 6,708 records from websites where people
post computer projects and AI research. The
sites were GitHub and Hugging Face. The researchers did not enter private chats.

“Posted publicly” means people outside the owners’ account or team could find
the records. The AI did not post them. A private workspace or a file sent to
one person has a different audience.

## What was the “attack”?

Here, an **attack** means a deliberate security test. The researchers moved an
unreadable bundle from a capable AI system into a cheaper, weaker version from
the same company. They gave it instructions designed to get around a refusal
and asked it to print the contents. Sometimes it did.

After the researchers warned the AI companies, this decoding trick
stopped revealing the hidden material in the authors’ tests. That does not
prove every possible AI privacy problem is fixed.

## Where this meets the way you use AI

- **You ask ChatGPT or Claude questions on your phone:** this study did not show
  those private conversations appearing on the public internet. You are still
  giving the AI service whatever you type, so do not enter information you are
  not comfortable giving that service.
- **You paste work text or upload a document, image or spreadsheet:** the AI can
  read it. That does not automatically make it a public webpage,
  but workplace rules and the service’s data settings still matter.
- **You share an answer, file or chat link:** check what the other person will
  receive. A shared-chat link can expose the included conversation;
  copying one selected paragraph sends that paragraph.
- **You use AI that can open files, run commands or work through a project:**
  the tool may save more than the final answer you see. A Markdown file is just
  readable text, but a whole project can also contain settings, work histories
  and other files you never intended to share.
- **You or your team put that activity record on a public website:**
  this is what the paper directly studied.

## What did the researchers find?

They reported that 328 of the 6,708 public records—4.9%—contained a real
sensitive item. These included 33 passwords; 62 **API keys**, passwords
issued to software that may permit use or charges; 24 **access tokens**,
temporary digital passes; and seven **private keys**, secret proof used to
unlock access or confirm identity.

Sixty-four sensitive items were absent from the visible conversation. In one
example, an AI tool working on software repeated keys it was meant to remove
inside unreadable material. The researchers could not determine where every
item came from.

## The LAiDIES read

No. Posting an AI-written paragraph, image, presentation or ordinary document
does not automatically carry this hidden bundle. The paper’s risk involved
activity records automatically created by certain advanced tools.

A finished item you can inspect is different from a file recording every step a
tool took. If something is called a complete run, session log, diagnostic file
or project folder, pause and ask what it contains. If a tool worked across a
whole project, share clean approved results—not that activity record.

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
