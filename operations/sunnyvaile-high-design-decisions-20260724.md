# SUNNYVAiLE High v2 construction decisions

Date: 2026-07-24

## Source truth

The inherited page contained the complete school functions, but presented the
journey as a narrow article followed by six repeated rounded cards. The live
functions were already valuable:

- Wednesday Pop Quiz;
- AV-cart class catalogue from `content/site/high-classes.json`;
- computed Report Card;
- computed Yearbook superlative;
- Season 1 reading list;
- rotating Book Fair;
- next-season state.

No curriculum or quiz logic was rewritten.

## Construction

SUNNYVAiLE High now behaves like a school:

- the real locker hallway is the full arrival;
- a split homeroom stage introduces the school and places the real Pop Quiz
  desk opposite it;
- the quiz action reads as the live scantron/check-in object, not a generic
  CTA card;
- one ruled corridor register names the six actual rooms;
- selecting a room opens it in place and closes the previous room;
- the AV class catalogue is a continuous period ledger;
- the Report Card remains a real printable document;
- the Yearbook is an open superlative spread;
- the Season 1 shelf is a continuous reading register;
- the Book Fair is a horizontal merchandise rack;
- the next-season state is a closed dark room, not a fake available class.

The page defaults to the AV class room because “watch it done” is SUNNYVAiLE
High's distinct teaching job.

## Visual language

- light lilac/blush/cyan site gradients remain;
- near-black midnight blue carries the classroom and navigation bands;
- vivid pink, cyan, cobalt, purple, coral, and mint divide functions;
- Anton is used only for display/comic word art; Jost remains the reading face;
- squared ruled documents and continuous registers replace rounded card grids;
- yellow/gold remains a small school-record accent.

## Boundaries

- `content/site/high-classes.json` remains the single class-register source;
- the existing hallway, Pop Quiz, and classroom images are structural sources,
  not approved future rendering references;
- no new person, keeper, mascot, or room illustration was invented;
- the existing Report Card, quiz storage, Yearbook calculation, Book Fair
  schedule, and localStorage keys are preserved.
