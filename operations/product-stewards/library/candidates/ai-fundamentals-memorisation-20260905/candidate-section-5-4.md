## 5.4 — Weights and Parameters: What the Model "Knows"


**Before training:** All those numbers are essentially random. The network knows nothing. It produces garbage.

**During training:** The guess-check-adjust loop tunes each number slightly, billions of times, until the network produces good predictions.

**After training:** Those numbers are frozen. They don't change anymore. The trained model is, physically, just a very large file of numbers — the learned weights. When you ask ChatGPT a question, you're running your tokens through that file of numbers. The "knowledge" lives in the specific values of those billions of parameters.

**How big are these files?**

| Model | Parameters | Approximate file size |
| --- | --- | --- |
| A small model (phone-sized) | 3 billion | ~6 GB |
| GPT-3 (2020) | 175 billion | ~350 GB |
| GPT-4 (2023) | ~1.8 trillion (estimated) | ~3.6 TB |
| Largest open models (2026) | 2.8 trillion | ~5.6 TB |
| Current frontier (2026): GPT-5.6, Claude Opus 5, Gemini 3.5 | Undisclosed (estimated 2T+) | Undisclosed |

Those weights are numbers, not a searchable collection of articles. But, as we saw in Section 5.1, a model can still reproduce some training passages word for word. Learning patterns and memorising examples are both possible; the fact that the result is a file of numbers does not rule either one out.

---

