# Move 37

## The breakthroughs that changed what AI could do — and what they did not prove

### Start here: surprise is not the same as evidence

On 10 March 2016, AlphaGo placed a black stone on the fifth line of a Go board during its second game against Lee Sedol. Professional commentators initially thought the move looked wrong. Much later, its strategic value became clear.

That stone became known as Move 37. It is often retold as the instant a machine became creative, outgrew humanity, or revealed a new kind of mind. None of those conclusions follows from the match. *Straight Answers About AI* already owns the short practical lesson that a strange output must be checked rather than admired. This book asks the historical question underneath it: what chain of earlier ideas made this result possible, what exactly did the match test, and what later work inherited the mechanism?

This book follows selected moments when a reusable idea removed a real constraint: networks learned internal features; computers learned to see patterns at scale; attention changed how sequences were handled; learned evaluation made impossible-looking search useful; structure prediction altered the starting point of biological research. The selection is argued, not sacred. Each moment must show six things:

1. **Before:** what could not be done reliably or practically?
2. **Mechanism:** what reusable idea changed the attempt?
3. **Observed change:** what result was measured, and against what comparison?
4. **Boundary:** what did the result not establish?
5. **Consequence:** what later work became possible or materially easier?
6. **Bigger claim:** what evidence would be needed before believing the grander version?

That is the breakthrough receipt. It protects us from two equally unhelpful reactions: “machines are magic now” and “nothing has really changed.” Quite a lot has changed. The receipt tells us what.

## Move 37: how a machine found a move people did not expect

Go looks simple from across the room: black and white stones on a grid. Its strategy is not. The number of possible continuations grows too quickly for a computer to calculate every future game. AlphaGo did not win by exhaustively checking them all.

Its 2016 system combined three jobs. A **policy network** proposed moves that looked promising. A **value network** estimated which player was likely to win from a position. **Tree search** used those learned estimates to spend computation on useful continuations instead of treating every legal move as equally deserving. The system first learned from expert games, then improved through reinforcement-learning self-play.

In plainer English: it learned where to look, learned how to judge what it saw, and searched selectively. That combination mattered more than any single exotic move.

Google DeepMind describes Move 37 as having roughly a one-in-ten-thousand likelihood under the relevant move prediction. That does not mean no human had ever imagined that point on the board. It means the move sat far outside the patterns considered likely in that context. Its value was not certified because the machine looked confident or because the audience gasped. It was tested under Go’s shared rules and the delayed result of the game.

This is the crucial distinction:

> **A surprising output becomes evidence for a bounded claim only when an appropriate test supports it. Without that test, it remains a hypothesis.**

In Go, everyone can agree whether a move was legal and who won. That validates AlphaGo’s match performance. It does **not** prove that Move 37 alone caused the win, that it was the only winning move, or that it was globally optimal. Its rarity comes from DeepMind’s reported move prediction; its strategic importance is an expert and historical interpretation. Those are three different claims.

Most of life does not supply even Go’s bounded shared result. A chatbot’s startling legal interpretation, medical suggestion, hiring judgment or historical claim does not become wise because it feels like Move 37. It needs evidence suited to that domain.

The story also did not end with humans becoming spectators. Lee Sedol won Game 4 with his own highly improbable Move 78. AlphaGo won the match 4–1, but the complete case contains machine surprise, human counterplay and a bounded test. That is a better account than the mythology because it shows where the achievement actually lived.

### The receipt

- **Before:** Go’s search space defeated practical brute-force search, and earlier systems lacked sufficiently strong ways to propose and judge positions.
- **Mechanism:** learned policy and value networks focused tree search; expert play and self-play supplied training.
- **Observed change:** AlphaGo defeated Lee Sedol 4–1, including a strategically consequential move that contemporary professionals initially found counterintuitive.
- **Boundary:** this did not establish consciousness, general intelligence, universal creativity or correctness outside a bounded game.
- **Consequence:** later work did not stop at this one Go match. Silver and colleagues’ AlphaZero system used self-play reinforcement learning with search to master chess, shogi and Go, a traceable extension of the learned-evaluation-plus-search lineage across multiple bounded games.
- **Bigger claim test:** transfer to another domain requires that domain’s own objective, evidence and validation—not a borrowed glow from Go.

**Primary evidence:** Silver et al., Nature (2016), https://www.nature.com/articles/nature16961; Google DeepMind’s AlphaGo record, https://deepmind.google/research/alphago/; Google DeepMind’s 2026 retrospective for the commentator and delayed-interpretation account, https://deepmind.google/blog/10-years-of-alphago/; Silver et al., Science (2018), for the later AlphaZero extension to chess, shogi and Go, https://www.science.org/doi/10.1126/science.aar6404.

## AlphaFold2: changing where biological investigation can begin

Proteins are chains of amino acids that take on three-dimensional structures. Structure matters because it helps shape what a protein can do and how it can interact. Determining a structure experimentally can be difficult and slow. Predicting it accurately from sequence had been a long-running scientific challenge.

AlphaFold2 made a major advance in **protein structure prediction from sequence**. It used evolutionary patterns in multiple-sequence alignments, learned relationships between residue pairs, a geometry-aware structure process and confidence estimates. It produced predicted three-dimensional coordinates and indicated where confidence was stronger or weaker.

The result mattered partly because the test was not only internal. CASP14 was a blind community assessment: participants predicted structures for targets that were withheld, and predictions were compared with experimental structures. AlphaFold2 substantially surpassed competing methods and reached accuracy competitive with experimental structures for many targets.

The right claim is large enough without inflating it:

> **AlphaFold changed where many structural investigations could begin: with a testable predicted structure and explicit confidence, not a blank page.**

It did not “solve biology.” A predicted structure is not automatically a protein’s function, a disease mechanism, the effect of a mutation, a drug, or experimental confirmation. Proteins can have multiple conformations. Low-confidence regions may be uncertain or disordered. Ligands, metals, nucleic acids, modifications and complexes require additional treatment. Even a plausible structure belongs in a chain of custody:

`sequence -> predicted structure + confidence -> biological hypothesis -> experiment or independent evidence`

not:

`sequence -> truth`

### The receipt

- **Before:** accurate structure prediction from sequence remained unreliable for many proteins, and experimental determination was a costly bottleneck.
- **Mechanism:** learned evolutionary and pairwise relationships fed a geometry-aware prediction system with confidence estimates.
- **Observed change:** AlphaFold2 led CASP14 by a large margin and achieved high accuracy for many blind targets.
- **Boundary:** confidence varies; prediction does not establish function, dynamics, mutation effect, complexes or a successful treatment.
- **Consequence:** researchers gained a new starting point for many structural investigations, with predictions and confidence information that still require appropriate interpretation and follow-up.
- **Bigger claim test:** biological or medical conclusions still require task-specific experiments and independent evidence.

**Primary evidence:** Jumper et al., Nature (2021), https://www.nature.com/articles/s41586-021-03819-2; CASP14 official results, https://predictioncenter.org/casp14/results.cgi?view=tb_results; EMBL-EBI AlphaFold Database FAQ, https://alphafold.ebi.ac.uk/faq.

## Your turn: is this a breakthrough yet?

A company announces: “Our new system scored 18 per cent higher than our previous model on an internal research benchmark. It is now available in our paid product. This changes everything.” No method paper, comparison with independent systems, benchmark details or external evaluation is supplied.

Try the receipt before reading on:

1. What was the prior constraint?
2. What reusable mechanism removed it?
3. What changed, compared with what?
4. Where does the evidence stop?
5. What durable consequence has been observed?
6. What would verify the bigger claim?

The honest result is **not established as a breakthrough**. We have a company-reported improvement and a product launch. The old constraint is vague. The mechanism is missing. The comparison is only with the company’s previous model on an undisclosed internal test. No downstream consequence has yet been observed. To support the bigger claim, we would need the task and benchmark, relevant baselines, reproducible or independent evaluation, evidence that the mechanism transfers beyond that test, and a consequence larger than availability in a product.

That does not prove the system is unimpressive. It tells us which parts of the receipt are still blank.

## The question to carry forward

When the next “AI breakthrough” lands, do not ask only whether the output is impressive. Ask: **what constraint disappeared, what mechanism removed it, what changed against a fair comparison, where the evidence stops, what consequence followed, and what would verify the grander claim?**

That question does not make progress smaller. It makes progress legible.
