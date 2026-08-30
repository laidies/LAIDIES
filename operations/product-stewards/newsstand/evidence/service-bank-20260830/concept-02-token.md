# Tokens: the pieces a language model processes.

A token is not reliably one word, so word counts and token limits differ.

Before a language model works with text, a tokeniser breaks it into reusable pieces and represents them as numbers. A piece might be a whole word, part of a word, punctuation or a single character. The exact split depends on the tokeniser.

That is why a limit of 10,000 tokens does not mean 10,000 words. The document, instructions and conversation can all take up space, and the system also needs room to produce its answer.

If a document is too large for a task, shorten irrelevant material or work on clearly labelled sections. Keep the passages needed to interpret each section together. Cutting a policy into pieces is not helpful if the exception ends up separated from the rule.

[Read AI Fundamentals 101: tokens](https://laidies.ai/library.html#ai-fundamentals-101::%40ch-4-4-2-what-a-token-actually-is)
