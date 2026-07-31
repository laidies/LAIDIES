# The Breaking: Google's new Flash models change the price of getting work done

Google released Gemini 3.6 Flash and Gemini 3.5 Flash-Lite on July 21. Both are
generally available in Google's developer tools and consumer Gemini app.
Gemini 3.6 Flash keeps the predecessor's $1.50-per-million input-token price
but cuts output tokens from $9 to $7.50 per million. Flash-Lite costs $0.30 for
input and $2.50 for output.

This belongs in The Breaking because a model choice changed now. The useful
story is not that Google added two more names to an already crowded menu.
Google has made its everyday Flash lane cheaper, changed Antigravity's default
model and introduced API migration requirements. People already using Gemini
for repeated coding, document, image, video or agent work have a reason to
test—not automatically switch.

Think of it like a coffee shop changing both the barista and the till. The new
barista may finish some complicated orders with fewer steps, and the price of
each step has fallen. But that does not guarantee every order is better or
that your old loyalty-card routine still scans. The cost that matters is the
whole receipt: quality, retries, time and total tokens.

In Rewind Era terms, this is less like a new supercomputer and more like a
faster everyday machine with cheaper printer ink—and a few old peripherals
that may need new drivers. The analogy stops at reliability: AI output varies
with the task, and independent testing has already found uneven results.

## What changes for readers

- Test 3.6 Flash if you already pay for 3.5 Flash or use Gemini for multi-step,
  multimodal or coding work.
- Test Flash-Lite for high-volume extraction, classification, translation and
  lower-cost subagent tasks.
- Do not switch production work without regression tests. Google's API guide
  documents changed parameters and conversation rules.
- If precise object detection or strict structured output matters, wait for
  your own comparison: Roboflow found a marked object-detection regression and
  malformed JSON despite stronger video and data-extraction results.

Google also announced Gemini 3.5 Flash Cyber, a specialized vulnerability
model. It is not publicly available: Google says a limited pilot for
governments and trusted partners is coming soon. Treat it as a capability and
access story, not a tool readers can choose today.

What remains uncertain: real-world performance across ordinary workflows,
country and plan-specific availability, total cost after retries and tool use,
and whether early regressions improve.

Sources: [Google launch](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/),
[Google developer guide](https://ai.google.dev/gemini-api/docs/latest-model),
[Roboflow evaluation](https://blog.roboflow.com/gemini-3-6-flash-for-vision/).
