# The Daily

**Wednesday, August 12, 2026**

## A study found passwords in shared AI work logs. Here’s what that means

**Researchers found real passwords, access keys and personal information inside technical records that people had publicly shared from AI tasks. Some of the information was not visible in the chat. The researchers say the companies stopped the specific attacks after disclosure.**

This is not a report that everyone’s private ChatGPT conversations appeared online. It is about a narrower—and useful—problem: people publishing the raw backstage file from an AI task because they thought the visible conversation showed everything they were sharing.

### The chat and the work log are not the same file

An AI application may need to carry unfinished work from one step to the next. To do that, it can receive two different things:

1. the answer a person can read; and
2. an opaque piece of data that helps the model continue its earlier work.

The second item travels inside the technical session even though the person looking at the chat cannot inspect it. Providers use names such as *reasoning item*, *thought signature* or *thinking block*.

During the researchers’ tests, some systems accepted that opaque item in places where it should not have worked. A record made for one session or model could be handed to another model in the same provider family. The researchers could then induce a less-protected model to reveal material represented inside the item, including secrets carried by public work logs.

That is the mechanism. The data may be sealed, but the surrounding system still has to check who may use it, where it may travel and when it should stop working.

Think of the visible chat as one photocopied page from a Burn Book. The raw work log is the whole book in the bag. Cleaning the page does not prove the rest of the book is clean.

### What the study found—and what it did not

In an August 2026 preprint, Panfilov and colleagues examined 6,708 AI-task records published on GitHub and Hugging Face. They reconstructed 315,320 hidden reasoning traces, but most did not contain a privacy leak.

The decision-relevant number is 328: that many session files, or 4.9% of the 6,708, contained at least one real sensitive item, according to the paper. The researchers counted 704 separate sensitive items inside those genuine-user sessions because one file can contain several. They included 62 API keys, 33 passwords, 24 access tokens, 7 private keys and personal details. Sixty-four of the 704 items did not appear in the visible chat history.

The paper is a preprint, not a complete audit of every public AI log. The researchers did not have the original plain-text reasoning needed to prove every reconstructed word was exact. Those limits narrow the finding. They do not erase the real credentials found in genuine-user files.

The researchers say they disclosed the methods to the affected model providers, as well as Microsoft and Hugging Face, and could no longer make the same attacks work afterward. That means the demonstrated route was patched. It does not mean every raw technical file is now a sensible thing to publish.

### Where this could affect you

At work, a coding assistant might read a deployment key while investigating why a website failed, then produce a clean final answer. If somebody publishes the entire technical session to show how the task was done, the invisible key may travel with it. Your colleague needs the checked result and approved evidence—not the filing cabinet that produced the memo.

The same distinction applies outside work. A home-made travel assistant connected to email and booking accounts may produce an itinerary you want to send to friends. Share the checked itinerary. Do not publish the assistant’s raw backstage export simply because the visible plan looks clean.

### What to share instead

For an ordinary chat user, the familiar rule still applies: do not put secrets into an AI tool unless the product and your organization permit it. This study did not show that using a private consumer chat publishes the conversation.

When you want to share an AI result, copy the finished result you mean to share, check it and remove private details. If your team publishes developer or agent logs, create a fresh release file from an approved list of fields rather than editing a raw session you cannot fully inspect. If a public log touched real credentials, remove access and rotate those credentials; deleting the file later cannot prove nobody copied them.

Asking the AI to “show your work” is not a security scan. A readable summary is not an inventory of the hidden technical state.

Before you share, ask: **am I sending the result I chose, or the entire technical session that made it?** Share the checked result.

## Sources

- Panfilov et al., “Stealing Reasoning Traces from Proprietary LLM APIs,” arXiv:2608.09867, August 10, 2026: https://arxiv.org/abs/2608.09867
- Anthropic, “Thinking,” checked August 12, 2026: https://platform.claude.com/docs/en/about-claude/models/extended-thinking-models
- Google AI for Developers, “Gemini thinking” and “Thought Signatures,” checked August 12, 2026: https://ai.google.dev/gemini-api/docs/thinking and https://ai.google.dev/gemini-api/docs/generate-content/thought-signatures
- OpenAI Developers, “Reasoning models,” checked August 12, 2026: https://developers.openai.com/api/docs/guides/reasoning

**Correction note:** This article describes a preprint and the authors’ reported disclosure result. If the paper, affected providers or reproduction evidence materially changes, LAiDIES will publish a dated follow-up and link both stories.
