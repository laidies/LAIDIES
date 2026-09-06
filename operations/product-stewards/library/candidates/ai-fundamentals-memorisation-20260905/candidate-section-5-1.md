## 5.1 — First: What IS a Model?

We've been saying "the system" since Chapter 1. The spam filter learned. The face grouper recognised. The chatbot generated. But what *is* the thing that does the learning and the recognising and the generating?

It's called a **model.**

A model is the finished product of training. It's the thing that took in all that data, did all that learning, and came out the other side as something that can make predictions or generate output. When you hear "ChatGPT" or "Claude" or "Gemini" — those are products built on top of specific models.

**What it is, physically:** Imagine a recipe with billions of ingredients. Each ingredient has a specific amount — a pinch of this, a cup of that. Before training, all the amounts are random garbage. The dish tastes terrible. During training, the system tweaks the amount of every single ingredient, a tiny bit at a time, testing the result each time. After billions of adjustments, the amounts are dialled in and the dish tastes right.

A trained AI model is like that finished recipe: a long list of specific amounts (called **weights**) that, together, produce good output. No single amount does anything meaningful on its own. It's the combination of all of them — billions working together — that makes the system work. You can't point to one weight and say "that's where it learned grammar." The knowledge is spread across all of them.

Those learned settings can capture general patterns, such as how sentences are structured. A model can also reproduce particular passages from its training data word for word. Learning patterns and memorising text can happen in the same model. So “it learns patterns” does not mean “it cannot repeat a source.”

In a [2021 study](https://www.usenix.org/conference/usenixsecurity21/presentation/carlini-extracting), researchers queried GPT-2 and recovered hundreds of word-for-word sequences from its training data. That is evidence of **memorisation** in that model, not proof that every model remembers every article. It also does not turn a model into a dependable archive where you can look up any document it encountered.

The useful distinction: an answer that sounds like a quotation is not proof of its source. If you need someone's exact words for a work document, open the original and compare the passage before you attribute it.

---

> 💡 **Architecture vs Model vs Weights — three words you'll keep hearing** Sticking with the recipe analogy: **Architecture** = the recipe structure. Which ingredients are included, what order the steps go in, how the whole thing is organised. Two different companies might design completely different recipe structures — and then train (adjust the amounts) independently. The architecture is designed by humans before training begins. **Weights** = the specific amounts. After training, these are the numbers that make the system produce good output. If you copied all the amounts onto another computer, you'd have an exact copy of the model — it would produce the same results. **Model** = both together. The recipe structure filled in with trained amounts. When you "use a model," you're running your input through that structure with those specific amounts. When someone says "we fine-tuned the model" — they mean: we took amounts someone else already trained and adjusted them further for our specific purpose. When someone says "we designed a new architecture" — they mean: we changed the structure itself (different ingredients, different steps) and trained from scratch.

---

