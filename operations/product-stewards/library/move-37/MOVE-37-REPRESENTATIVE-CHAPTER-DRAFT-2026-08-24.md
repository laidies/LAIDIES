# The move that looked like a mistake

Picture a board game played with black and white stones. The board is a plain
grid. There are no dice, no cards and no pieces with different jobs. On each
turn, a player places one stone on an empty crossing point.

That is Go.

The aim is to surround more territory than your opponent. The rules can be
explained over tea. Playing well is another matter entirely.

A strong player is not merely asking, “What can I capture now?” She is watching
how a stone placed in one quiet corner might change a fight twenty moves later.
She has to recognize when a sacrifice creates influence, when safe-looking
territory is not safe at all, and when the sensible move is exactly the move her
opponent is waiting for.

For decades, Go seemed to protect a particularly human kind of expertise. A
computer could not simply inspect every possible continuation. After the first
move there are hundreds of possible replies; after each reply, hundreds more.
The number of possible games grows so violently that “check them all” stops
being a plan.

Then, in March 2016, a computer program placed a white stone where many of the
best human players thought it did not belong.

The program was AlphaGo. The move was the thirty-seventh move of the second game
in a five-game match. Sitting opposite the machine was Lee Sedol, one of the
world's leading Go players.

The stone did not capture a dramatic group. It did not announce its cleverness.
It landed on the fifth line of the board, farther from the edge than tradition
usually favoured at that stage. To experienced eyes, it looked strange—possibly
wrong.

Lee Sedol left the room. When he returned, he took nearly twelve minutes to
answer.

This is often where the story turns into mythology: the machine displayed
creativity; the machine had an intuition; the machine saw what humans could not.
Those claims run ahead of the evidence. Anyone can make a surprising move. A
toddler could place a stone in an unexpected spot, although she might also eat
it. Surprise is not the same thing as insight.

Move 37 became extraordinary because the game tested it.

## Looking everywhere was impossible

To understand what changed, imagine choosing a restaurant in a city you do not
know. You cannot visit every restaurant, read every review, inspect every menu
and live out every possible evening before deciding where to eat. You narrow the
field.

You might begin with a friend who says, “These places look promising.” Then ask
someone with good judgement which of them is most likely to be worthwhile.
Finally, you investigate the strongest candidates more closely: the menu, the
distance, whether a table is available.

AlphaGo divided its impossible decision in a similar way.

One learned component proposed promising moves. A second estimated which player
seemed more likely to win from a given arrangement of stones. A search process
then spent extra effort investigating the continuations that looked most useful.

The researchers called these a **policy network**, a **value network** and
**Monte Carlo tree search**. The technical names matter less than the movement:
propose, estimate, investigate.

The first part answered: where might it be worth looking?

The second answered: how favourable does this position appear?

The third answered: which promising routes deserve more checking before we
commit to one?

AlphaGo was not calmly calculating every future with a very large computer.
There were far too many futures. It learned how to direct limited attention
toward the ones most likely to matter.

## How did it learn what looked promising?

The first AlphaGo learned from two kinds of experience.

It studied positions and moves from recorded games played by strong human
players. That gave it an initial sense of which choices experts tended to make.
Then versions of the program played games against one another. After each game,
the result supplied a brutally simple answer: this sequence ended in a win; that
one ended in a loss. The system adjusted so that choices associated with winning
became more likely.

This second method belongs to a family called **reinforcement learning**. The
name can sound as though someone rewards the computer with a biscuit. In plain
language, the system tries actions, receives feedback about the eventual result
and changes its future choices in response.

Go is unusually generous to this method. The rules are stable. Legal moves are
clear. A final winner can be determined. The program can play an enormous number
of practice games without injuring a patient, rejecting a job applicant or
starting an international incident.

That clean answer key is one reason the achievement was so strong—and one reason
we must be careful when applying its lesson elsewhere.

## Why Move 37 earned the amazement

DeepMind's published account says its system assigned Move 37 a probability of
roughly one in ten thousand under the human-play model it had learned. That does
not mean there was a universal one-in-ten-thousand chance that any human would
ever play it. It means the move sat far outside the patterns that particular
model expected from its human game data.

AlphaGo played it anyway because the rest of its machinery judged the resulting
position differently. Its search and win estimates suggested that this unusual
move deserved attention.

Then Lee Sedol fought back. That part matters. The move was not declared brilliant
by the company that made the program and left unchallenged. One of the strongest
players alive tested it across the remainder of a real game. The pressures it
created continued to matter. AlphaGo won Game Two and eventually won the match
four games to one.

The wonder lies in that chain of evidence. The system produced a move that did
not merely copy what expert players usually did. The move looked dubious to
experts. It survived opposition. Its value became visible through what followed.

This did not prove that AlphaGo experienced intuition or knew that it had created
something beautiful. It proved something both narrower and more useful: learned
judgement could guide search into parts of an enormous possibility space that
human convention rarely visited.

## Lee Sedol's move

The human side of the story did not end with stunned silence.

In Game Four, with AlphaGo already leading the match, Lee Sedol played his own
startling move: Move 78. It created a difficult situation that AlphaGo handled
badly. The program began making a series of poor choices. Lee won the game.

Calling this simply “the human fights back” misses the richer point. AlphaGo was
stronger overall and still vulnerable. A system can dominate a demanding test
and make consequential mistakes. Strength is not perfection. Excellence inside
one clear game is not wisdom about the open world.

The defeat also gave researchers valuable evidence. It exposed a kind of
position the system evaluated poorly. A worthy opponent does more than certify a
victory; she reveals where the winner's understanding stops.

## What changed after the match

The research continued. AlphaGo had begun by learning from human games and then
improving through self-play. Its successor AlphaZero began with the rules but no
library of expert moves. By playing against itself, it learned strong strategies
for Go, chess and shogi.

Another successor, MuZero, was not handed all the rules it needed for planning.
It learned an internal working sketch of what helped predict three things: the
next reward, which choices might be useful and how favourable the future looked.
It did not recreate a perfect miniature copy of the game. It learned enough of a
map to decide which paths deserved exploration.

The deeper legacy reaches beyond board games. Many AI systems face more options
than they can examine. A scientific system choosing which possible material to
test, or an assistant deciding which document to open, faces a distant relative
of the same problem: attention is limited, so where should effort go?

But Move 37 is not a permission slip for every surprising machine output.

When an AI recommends a medical treatment, selects a job candidate or ranks the
news, the answer key is no longer clean. People disagree about the goal. Effects
may appear years later. The easiest number to measure may not represent what
people truly value. A system can become very good at chasing a score and still
chase the wrong score.

That is why Move 37 matters to someone who never plans to learn Go. It gives us
better questions for the next astonishing AI claim:

What options did the system propose? How did it estimate which looked promising?
What did it investigate? What feedback taught it that an outcome was good? And
who decided that the feedback represented what mattered?

Move 37 was not the moment a machine became a person. It was the moment a machine
showed, in front of the world, that it could learn where to look when looking
everywhere was impossible.

That is astonishing enough.

## Sources and boundaries

- David Silver and colleagues, “Mastering the game of Go with deep neural
  networks and tree search”: https://www.nature.com/articles/nature16961
- Google DeepMind's AlphaGo research record and match account:
  https://deepmind.google/research/alphago/
- David Silver and colleagues, AlphaZero:
  https://www.science.org/doi/10.1126/science.aar6404
- Julian Schrittwieser and colleagues, MuZero:
  https://www.nature.com/articles/s41586-020-03051-4

The one-in-ten-thousand description is DeepMind's characterization of its
policy model's expectation, not an independent universal measure of human
creativity. Claims about Lee Sedol's timing and match play must be checked
against the official game record before publication. This chapter does not
claim that AlphaGo was conscious, generally intelligent or creative in the
human psychological sense.
