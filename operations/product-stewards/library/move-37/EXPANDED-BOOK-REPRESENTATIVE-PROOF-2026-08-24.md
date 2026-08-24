# The Breakthroughs That Changed AI — representative explanation proof

Status: INTERNAL PROOF — NOT A BOOK OR PUBLIC CANDIDATE

This proof deliberately crosses three eras and three kinds of problem. It tests
whether the successor can explain importance before terminology and whether a
reader can follow the change without knowing computer science.

## 1957 — A machine that could learn where the line goes

Imagine sorting application forms into two piles. At first you know nothing
about what separates them. Someone shows you examples from each pile. Every
time you put one in the wrong place, you shift your dividing rule slightly.
After enough corrections, new forms begin landing on the right side.

That was the exciting idea behind the **perceptron**. Earlier computers were
usually given exact instructions: when this happens, do that. The perceptron
could instead adjust its own numerical settings after examples. Frank
Rosenblatt demonstrated the idea in the late 1950s. It helped establish a
possibility that now feels ordinary but was then radical: a machine might learn
a decision boundary rather than receive every decision rule from a programmer.

Here is the movement without the name:

`example arrives -> machine guesses -> answer is checked -> settings move -> next guess changes`

Why did that matter? The same basic ambition—alter internal settings using
examples—runs through modern systems that recognise speech, inspect images and
generate text. The machines became vastly larger and the training methods
changed, but the shift from writing every rule to learning from examples was
foundational.

It also had a hard limit. One perceptron could draw only a simple kind of
boundary. It could not understand a photograph, hold a conversation or learn
every pattern. Early publicity raced far ahead of the evidence. The important
breakthrough was not “a mechanical brain had arrived.” It was that learning a
rule from corrected examples had become a concrete engineering programme.

Where might you meet its descendant? When an email service learns to separate
spam from ordinary mail, the scale and machinery are different, but the human
question is recognisable: can examples shape the decision instead of someone
writing a rule for every possible message?

**Check the idea:** If the machine guesses once and nobody tells it whether the
guess was wrong, has this learning loop happened? No. The correction is the
part that changes the next attempt.

Source: Frank Rosenblatt, *The Perceptron: A Perceiving and Recognizing
Automaton*, Cornell Aeronautical Laboratory (1957),
https://hdl.handle.net/1813/8365

## 2016 — The move that looked like a mistake

Go has more possible games than anyone could sensibly list and check. A
computer could not win simply by racing through every future. It needed to
spend its effort on the continuations most worth examining.

AlphaGo learned two useful judgments from games. The first was, “Which moves
look promising here?” The second was, “From a position like this, who appears
more likely to win?” It used the first judgment to choose a few routes through
the enormous maze and the second to estimate where those routes were heading.
It also improved by playing games against versions of itself.

Only after that picture is clear do the technical labels help. Researchers
called the move-suggesting system a **policy network**, the position-judging
system a **value network**, and the selective look-ahead process **tree
search**. The labels name three jobs: propose, estimate, investigate.

Move 37 in the second game against Lee Sedol became famous because strong Go
players initially found it strange. Its value emerged through the rest of the
game. This was not just a surprising computer output posted online. Go supplied
a severe answer key: both players followed the same rules, Lee Sedol could
fight back, and the match produced a winner.

Why did it matter beyond Go? It showed how learned judgment could guide search
when checking everything was impossible. Later systems such as AlphaZero and
MuZero developed parts of that combination further. The larger idea—learn
which possibilities deserve attention, then test promising routes—became
important well beyond one celebrated stone.

What did it not prove? AlphaGo did not wake up, understand beauty or become
generally wise. A move can be validated by a game result. A surprising medical
suggestion, hiring recommendation or legal answer does not arrive with such a
clean referee. Outside a game, finding the answer key is often the difficult
part.

**Check the idea:** Why not call every strange AI answer “another Move 37”?
Because strangeness is not evidence. Move 37 survived a demanding test inside
shared rules; an unsupported answer is still only a proposal.

Sources: Silver et al., *Mastering the game of Go with deep neural networks and
tree search*, Nature (2016), https://www.nature.com/articles/nature16961;
Google DeepMind AlphaGo record, https://deepmind.google/research/alphago/

## 2020–2022 — How text prediction became something people could instruct

Suppose an extremely well-read autocomplete system has absorbed patterns from
huge amounts of text. Ask it to continue a paragraph and it may produce fluent
language. But fluency is not the same as doing the job you asked for. It might
ignore the requested format, invent a fact or continue in an unwanted tone.

Three changes helped turn raw text prediction into the assistants people now
recognise.

First, researchers found that a sufficiently large language model could often
pick up a task from instructions or a few examples placed directly in the
request. Show it two examples of turning messy notes into tidy summaries, then
give it a third set of notes, and it may continue the pattern without its
internal settings being retrained. This became known as **few-shot prompting**.
It made ordinary text a practical way to specify a task.

Second, researchers separated the model’s learned language patterns from an
outside collection of documents. The system could search that collection,
place relevant passages beside the question and use them while drafting the
answer. This is **retrieval-augmented generation**, usually shortened to RAG.
It made “answer from these documents” a different job from “answer from
whatever patterns training left inside the model.”

Third, people wrote example instructions and ranked alternative answers.
Training then pushed the model toward responses people preferred. This family
of methods includes **reinforcement learning from human feedback**, or RLHF.
It helped models behave more like assistants responding to a request and less
like machines blindly continuing text.

Why did this cluster matter? It changed the interface. A person no longer
needed to commission a separately programmed system for every small language
task. She could describe a job, supply examples or documents, and receive a
useful first attempt. That opened the door to writing aids, document question
answering, coding assistance and many other products.

None of the three changes guarantees truth. A prompt can be misunderstood. A
retrieval system can fetch the wrong passage. Human raters can disagree or
encode narrow preferences. A polished assistant can still be confidently
wrong. The breakthrough was greater usefulness and adaptability—not a machine
becoming an unquestionable expert.

**Check the idea:** If an assistant answers from your policy handbook, which
question matters more than “Does it use RAG?” Ask whether it retrieved the
right passage and whether its answer is actually supported by that passage.

If two examples in your request help the model perform a third case, did the
model have to be retrained? No. The examples supplied a pattern inside that
request; they did not permanently rewrite the model.

If people prefer an answer, does RLHF prove the answer is true? No. Preference
feedback can shape helpfulness, tone and instruction-following. People can
still prefer a confident mistake.

Sources: Brown et al., *Language Models are Few-Shot Learners* (2020),
https://arxiv.org/abs/2005.14165; Lewis et al., *Retrieval-Augmented Generation
for Knowledge-Intensive NLP Tasks* (2020), https://arxiv.org/abs/2005.11401;
Ouyang et al., *Training language models to follow instructions with human
feedback* (2022), https://arxiv.org/abs/2203.02155

## 2021 — A useful first map for a scientific experiment

A protein begins as a chain of small chemical building blocks. The chain folds
into a three-dimensional shape, and that shape helps determine what the protein
can do. Scientists can measure structures experimentally, but the work may be
difficult, slow or impossible for a particular protein.

The number of possible shapes is far too large to try one by one. AlphaFold2
learned clues from known protein sequences and structures. One especially
useful clue comes from evolution: if two positions in related proteins tend to
change together, they may influence one another in the folded structure. The
system combined such clues with learned spatial relationships, proposed a
three-dimensional arrangement and repeatedly refined it. It also reported
where its own prediction was more or less confident.

In a blind assessment called CASP14, teams received protein sequences whose
experimental structures were not yet public. AlphaFold2’s predictions marked
a major improvement. The hidden answers mattered: the system was not being
graded only by its maker on examples it had selected.

Why was this important? A scientist could begin with a plausible structural
map and decide which questions or experiments were worth pursuing first. At
large scale, this changed the starting point for research across biology.

It did not “solve biology.” One predicted structure may not show how a protein
moves, what it does, how a mutation changes it, which molecules bind to it or
whether a proposed drug works. A map can guide the expedition without becoming
the territory.

**Check the idea:** Why does a confidence score matter? Because a useful
prediction is not equally reliable in every region. It helps a scientist see
where the map is firm and where experiment or caution is still needed.

Sources: Jumper et al., *Highly accurate protein structure prediction with
AlphaFold* (2021), https://www.nature.com/articles/s41586-021-03819-2; CASP14
official results, https://predictioncenter.org/casp14/results.cgi?view=tb_results
