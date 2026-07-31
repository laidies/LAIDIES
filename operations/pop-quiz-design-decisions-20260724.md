# Pop Quiz v2 construction decisions

Date: 2026-07-24

## Source truth

The inherited Pop Quiz already carried five released papers, live question
data, best-score storage, Report Card rewards, sticker drops, butterfly-clip
ratings, reread routes, and answer explanations. Its default presentation was
a classroom image followed by a cream article heading, rounded quiz cards, and
all questions expanded at once.

Quiz data, scoring, rewards, and storage were not rewritten.

## Construction

The Pop Quiz now behaves like sitting an exam:

- the real quiz classroom is the full arrival;
- a near-black school band introduces the ritual;
- the five available papers are one ruled register rather than a card grid;
- choosing a paper removes the room and register so the paper has full focus;
- exactly one question is visible at a time;
- the next control stays disabled until the current question has an answer;
- progress advances from question to question;
- the paper includes a working Change paper route;
- scoring, review, Report Card, sticker, and butterfly-clip behavior remain
  owned by the existing quiz system.

## Visual language

- the current light site gradient remains outside the exam paper;
- midnight blue carries the school bands and rule work;
- vivid pink, purple, cyan, cobalt, coral, and mint provide hierarchy;
- Anton is limited to display/quiz-title lettering; Jost carries all questions
  and answers;
- squared ruled paper, register rows, and scantron answer lines replace rounded
  cards;
- the question background uses restrained blue rule lines to keep the page
  legible rather than decorative.

## Boundaries

- `content/site/quizzes.json` remains the content source;
- the current classroom image is a structural bridge and not a future rendering
  reference;
- the approved Episode 04 Heroine face remains the character rendering lock;
- opening, answering, and navigating a paper does not save a score;
- score storage still occurs only through the existing grading path.
