# The Daily

**Wednesday, August 12, 2026**

## AI work logs can carry secrets you cannot see. Here’s what to share instead

**A new security study found real passwords, access keys and personal information inside technical AI session files—even when some of that information was missing from the visible conversation. The specific attacks were disclosed and stopped working, according to the researchers.**

If you opened ChatGPT this morning, asked for dinner ideas and closed the tab, breathe. This is not a story about every private chat suddenly appearing online.

It matters most to people and teams who build with AI models, use coding assistants or publish raw work logs so somebody else can inspect or replay an AI task. If that is not you, the useful part is still worth knowing: a chat window is not an inventory of everything inside its technical file. The gap between the page you can see and the file being carried is the whole story.

### The file is bigger than the chat window

Some AI applications need to carry unfinished work from one step to the next. A model provider may therefore send the application two things:

1. the answer a person can read; and
2. an opaque, sealed-looking piece of data that helps the model continue its earlier work later.

The technical names vary—reasoning item, thought signature, thinking block—but the point is the same: the second item travels with the technical session even though the person reading the chat cannot inspect what is inside it.

Researchers found that, during their test period, some of these sealed items were too portable. A record created for one session or model could be handed to another model in the same provider family. A less-protected sibling model could then be induced to print out the hidden reasoning represented by the sealed item—including secrets inside it.

That is the security failure. The seal itself was not the problem; the surrounding system accepted the sealed item in places where it should not have worked.

In Rewind Era terms, the visible chat is a photocopied page somebody hands you. The raw technical session is the whole Burn Book in the bag. Cleaning the photocopy does not clean the book. In this case, part of the technical file was also sealed, so the person sharing it could not read everything she was carrying. Regina does not get to run data security.

### The number to circle is 64

In an August 2026 preprint, Panfilov and colleagues examined 6,708 technical AI-task records that people had published on GitHub and Hugging Face. Across those records, the researchers reconstructed 315,320 hidden reasoning traces.

That giant number makes a dramatic graphic. It is not the number that should make your decision. Most traces did not contain a privacy leak. But 328 of the 6,708 records—4.9%—contained at least one real sensitive item, according to the paper.

This is where the numbers need name labels. The 328 figure counts affected session files. The 704 figure counts separate sensitive items found inside genuine-user sessions, because one file can carry several. Those items included 62 API keys, 33 passwords, 24 access tokens, 7 private keys, plus personal emails, names, postal addresses, IP addresses and other private details.

The number to circle is 64. Of those 704 separate items, 64 did not appear in the visible chat history at all. Someone could remove a password from the conversation she could see and still publish a raw technical file carrying another representation of it. A cleaned photocopy can still travel inside a very unclean Burn Book.

The paper is a preprint, and the scan was not a complete audit of every public AI log. The researchers did not possess the original plain-text reasoning needed to prove every reconstructed word was exact. Some personal information in the paper’s larger totals also came from synthetic benchmark characters, not real people. Those limits matter because precision is not optional. They narrow the finding; they do not erase the real credentials found in genuine user records.

### Patched does not mean “nothing to learn here”

The researchers disclosed their methods to the affected model providers, and separately to Microsoft and Hugging Face. They report that all model providers acknowledged the report and that afterward they could no longer make the same attacks work.

This is the part headlines tend to flatten. By publication time, the exact attacks in the paper were no longer working. That closes the demonstrated route. It does not turn a raw technical file into a sensible thing to publish. The providers fixed the door; the release lesson survives it.

### Where this becomes your problem

At work, a coding assistant may briefly read a deployment key while diagnosing why a website failed, then show a clean final answer. A raw log can still carry the invisible key. Your colleagues need the approved question, result and evidence—not every byte the tool carried around while producing them. Handing over the whole session because somebody asked for the result is the digital equivalent of delivering the filing cabinet with the memo.

The same mechanism follows you home. A home-made travel assistant connected to email and a booking account may produce a perfectly shareable itinerary while its raw export carries account details or the sealed carry-over data described above. The itinerary belongs in the group chat. The assistant’s backstage file does not.

### Before you hit Share

For an ordinary chat user, the rule is familiar: do not put secrets into an AI tool unless the product and your organization permit it. This paper did not show that simply using a private consumer chat publishes it.

When you want to share an AI result, copy the finished result you actually mean to share, check it and remove private details. Share the memo, not the filing cabinet. Proof of work is not improved by including everything the tool touched.

If your team publishes developer or agent logs, build a fresh release file from an approved list of fields. Strip those hidden session fields rather than trying to edit what you cannot inspect. If a raw log that touched secrets is already public, remove access and rotate the credentials; deleting the file later cannot prove nobody copied it while it was available.

One tempting shortcut fails: asking the AI to “show your work” is not a security scan. Providers may offer a readable summary, but that is not the complete hidden state, and no ordinary prompt proves the raw file contains nothing else. The model cannot give you a reliable inventory of a sealed field you cannot inspect.

A sealed package is only safe when the system also checks who may use it, where it may travel and when it expires. The tested systems did not enforce those boundaries tightly enough. The reported patches stopped the demonstrated attacks; careful release files keep the same mistake from becoming your problem by another route.

Before you share, ask one question: **am I sending the result I chose, or the entire technical session that made it?** If it is the whole session, stop. Share the checked result instead; if your team publishes logs, build a clean release file.

### The cocktail-party version

“Researchers found that some public AI work logs carried passwords and access keys outside the visible chat. The companies patched the specific attacks, but a cleaned transcript still is not the same as a safe raw log. Share the finished result—not the whole technical session that made it.”

## Sources

- Panfilov et al., “Stealing Reasoning Traces from Proprietary LLM APIs,” arXiv:2608.09867, August 10, 2026: https://arxiv.org/abs/2608.09867
- Anthropic, “Thinking,” checked August 12, 2026: https://platform.claude.com/docs/en/about-claude/models/extended-thinking-models
- Google AI for Developers, “Gemini thinking” and “Thought Signatures,” checked August 12, 2026: https://ai.google.dev/gemini-api/docs/thinking and https://ai.google.dev/gemini-api/docs/generate-content/thought-signatures
- OpenAI Developers, “Reasoning models,” sections “Keeping reasoning items in context” and “Preserve reasoning without stored responses,” checked August 12, 2026: https://developers.openai.com/api/docs/guides/reasoning

**Correction note:** This article describes a preprint and the authors’ reported disclosure result. If the paper, affected providers or reproduction evidence materially changes, LAiDIES will publish a dated follow-up and link both stories.
