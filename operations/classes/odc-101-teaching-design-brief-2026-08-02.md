# ODC-101 teaching design brief — What You're Looking At

Status: **TEACHING-DESIGN CANDIDATE / NARRATION REJECTED PENDING APPROVAL**

This document controls the course outline. It comes before narration, picture,
runtime and voice production. The existing short narration workbench does not
satisfy this design and must not be recorded as the class.

## Why a learner would take this class

AI products often make very different machinery look like one empty box. When
an answer is generic, outdated, unexpectedly personal or confidently wrong,
the user is left wondering whether she wrote the wrong prompt, chose the wrong
tool, forgot a setting or expected the product to know something it never had.

This class gives her a dependable map of what is actually happening. It helps
her stop copying isolated tricks and start diagnosing the task. That makes her
better at using the product she has today and much faster at moving among
ChatGPT, Claude, Gemini and later tools whose buttons and labels will change.

## The learner promise

By the end, the learner can look at an AI task and work out:

- what belongs to the product or app;
- what the model is responsible for;
- what information was supplied for this specific request;
- whether saved memory, history, instructions, files or tool results actually
  entered the active context;
- which extra capability, if any, the product used; and
- what evidence, decision or verification still belongs to her.

The class does not promise that she will know the internal proprietary
architecture of every product. It gives her a correct, useful model of the
shared building blocks and teaches her how to inspect product-specific claims.

## Teaching goals

1. Replace the false “one magic box” model with a layered request-flow model.
2. Explain the causal chain between the information supplied and the output
   produced—not merely tell the learner which button to press.
3. Separate trained model weights from active context and separate both from
   product-level storage such as chat history or saved memory.
4. Show that information being saved somewhere does not mean it is present in
   every request, and information being present does not make it true.
5. Teach a reusable diagnosis method that survives interface and vendor
   changes.
6. Give the learner practice making a better context/tool/verification choice
   for a real task.

## Questions the teaching must answer

### What am I actually using?

- What is the difference between an AI product or app and a model?
- What jobs can the product perform around the model?
- Why can two apps using similar models behave differently?

### What does the model have for this request?

- What is active context?
- How can a request, prior conversation, standing instruction, file, saved
  memory or tool result become part of it?
- What is the difference between information being stored and information
  being selected for the current task?
- Why is a new chat not always a blank slate—and why is an old saved chat not
  necessarily “in the room”?
- Why does saved memory not mean the model's trained weights were rewritten?

### Why did the result behave that way?

- Why does missing context invite a plausible generic answer?
- Why can conflicting, irrelevant or stale context make an answer worse?
- Why can the same short request behave differently under different account,
  project, instruction, memory, file or tool states?
- How can the learner identify which variable changed?

### When do tools and retrieval matter?

- What is the difference between generating from supplied context and using a
  tool such as current web search, file retrieval or calculation?
- How does a selected tool result become additional context?
- Why does a citation create an inspection path rather than prove the claim?

### What still belongs to the learner?

- Which facts or outcomes require verification?
- What information should not be supplied?
- How can she describe the failure precisely enough to fix it rather than
  repeatedly trying random prompts?

## Observable end-of-class abilities

The learner passes only if she can do all of the following with a new example,
not by repeating the lesson wording:

1. Label the product, model, active context, optional capability and human
   verification boundary in a real task.
2. Explain why “it is saved” and “the model used it in this response” are not
   equivalent statements.
3. Sort information into the right home: stable account-level preference,
   project/source material, current-task brief, tool-retrieved evidence or
   “do not provide.”
4. Compare two outputs, identify the one meaningful variable that changed and
   explain the causal effect of that change.
5. Diagnose at least three failure types: missing context, conflicting/stale
   context and missing current evidence/tool use.
6. Move the same task to a second AI product and identify which underlying jobs
   remain the same even though the controls differ.
7. State what must still be checked before acting on the answer.

## What the class should help her do in real life

- Stop blaming herself or endlessly rewriting a prompt when the real problem
  is missing information, the wrong information source or a disabled tool.
- Set up recurring work more deliberately instead of copying viral “turn this
  on and AI does everything” instructions.
- Decide whether a preference belongs in memory, standing instructions, a
  project or the current brief.
- Recognize when an answer needs live evidence rather than a more elaborate
  prompt.
- Transfer her judgement to a new app without relearning AI from zero.

## Class architecture before narration

ODC-101 is a multi-lesson class. It is not one extended video. Each lesson has
one primary outcome, a short navigable teaching video, an example or
demonstration, a learner action and a return point. The exact runtime follows
the approved teaching—not the reverse.

### Recurring story spine — candidate to specify before scripting

The six lessons must follow one recognizable SUNNYVAiLE job from beginning to
end rather than presenting six disconnected demonstrations. A resident asks an
AI product to help produce something real for the town. The first answer looks
polished but is not usable. Each lesson reveals one more part of why:

1. the product and model are not the same thing;
2. the necessary information was not all in active context;
3. some information had been stored in the wrong place;
4. the task required a current source or tool result;
5. an old instruction conflicted with the new brief; and
6. the resident must move the job to another product without losing the mental
   model.

The exact resident, town job and safe demonstration data remain to be approved.
They must feel relevant to an adult learner, plausibly recur across all six
lessons and support the mechanism without adding fictional clutter. Each lesson
opens by returning to the unresolved job, asks the learner to predict the next
result, reveals the causal mechanism, lets her choose a repair and shows the
consequence. The final lesson gives the equivalent unfamiliar case to the
learner.

Every lesson design must explicitly bind these fields before narration:

- **Mechanism / why**
- **Controlled comparison**
- **Guided Try-On**
- **Diagnose and repair**
- **Transfer between products or contexts**
- **Narrative problem and prediction**
- **Story-to-system bridge and analogy boundary**
- **Consequence and learner agency**

### Lesson 1 — The box is not the brain

**Learner question:** What am I actually using when I open an AI app?

Open with two visibly different outputs generated from the same short request.
Ask what changed. Pull back the curtain on the layered request flow:

`stored information → product selection/retrieval → active context → model → optional tool/result loop → response → human check`

Separate the product, the trained model and the response. Show why similar
models can behave differently inside different products or account states.

**Learner action:** label product, model and response in a familiar task.

**Exit evidence:** explain why “ChatGPT,” “Claude” or “Gemini” can name a whole
product experience rather than one isolated model.

### Lesson 2 — What is actually in the room?

**Learner question:** What information can affect this response right now?

Explain active context and distinguish:

- the current request and conversation;
- stored history;
- saved memory;
- standing instructions;
- project files or sources;
- retrieved tool results; and
- trained model weights.

Teach the key causal distinction: stored information can influence a response
only when the product makes relevant information available to the task. Saved
does not automatically mean selected; selected does not mean true.

**Learner action:** sort six pieces of information into “stored,” “active now,”
“may be retrieved” and “not supplied.”

**Exit evidence:** explain why an old chat can be saved without being in active
context and why a saved memory is not the same as retraining model weights.

### Lesson 3 — Put the right thing in the right place

**Learner question:** Should this go in memory, instructions, a project, the
current brief—or nowhere near the tool?

Use stable, harmless examples to distinguish the jobs of account-level
preference, standing instruction, project source, current-task detail and
private material that should stay out. Introduce the distinctions without
turning this into the later product-specific setup classes.

Run the stored-preference comparison and show how to test whether the intended
information actually affected a fresh response.

**Learner action:** classify a realistic bundle of preferences, source files,
deadlines, confidential details and one-off instructions.

**Exit evidence:** choose an information home and justify it by mechanism, not
by remembering a product menu.

### Lesson 4 — When the app goes to get something

**Learner question:** What changes when the app searches, reads a file,
calculates or uses a connected service?

Use the reimbursement-rule comparison. Keep the request identical and change
one variable: whether the operative notice is supplied or retrieved. Then run
one harmless current question without search and with visible search. Inspect
one cited source.

**Learner action:** identify the tool call or supplied source, the result added
to context and the claim that still needs inspection.

**Exit evidence:** explain why a citation creates a route to evidence rather
than proof that the answer is correct.

### Lesson 5 — Why it went wrong

**Learner question:** Is this a bad prompt—or the wrong information, state,
tool or expectation?

Teach a diagnosis sequence using controlled failures:

1. missing context;
2. conflicting or stale context;
3. irrelevant context overload;
4. missing current evidence or unavailable tool;
5. a product/account limitation; and
6. a decision that still requires human verification.

Show the conflicting-old-instruction comparison. Correct the smallest causal
problem instead of adding random detail or repeatedly trying new prompts.

**Learner action:** diagnose three unlabeled failures and choose the smallest
useful repair.

**Exit evidence:** describe what failed using the underlying layer rather than
“the AI is bad” or “I need a magic prompt.”

### Lesson 6 — Make the map travel

**Learner question:** Can I use this understanding in another tool and on my
own work?

Show the same task in a second product. The learner identifies different
controls but the same underlying jobs. Then she completes the full App / Model
/ Context / Capability / Check map for a low-risk task of her own, predicts one
failure, runs the task and revises the map from the result.

**Learner action:** complete the guided Try-On and cross-product transfer.

**Exit evidence:** explain why an AI app is more than a model, why saved is not
the same as active context, and what she will inspect the next time an output
does not behave as expected.

The class ends with a cumulative assessment, take-home map and a next-class
recommendation based on the learner's diagnosis—not with one two-hour video.

## Examples required before script approval

The outline is not script-ready until these examples are specified with exact
inputs, observable outputs and a single controlled variable:

1. missing current source versus supplied/retrieved source;
2. stored preference versus demonstrated use in active context;
3. current brief versus conflicting old instruction;
4. no tool versus visible current-information tool; and
5. one cross-product transfer example.

No example may rely on a real personal account or private data. Product claims
must be checked against official current sources, and proprietary internal
selection behaviour must be labelled when it cannot be directly observed.

## Assessment design

The assessment is not a vocabulary quiz. It combines:

- one layer-labeling task;
- one information-home sorting task;
- one controlled-comparison explanation;
- one failure-diagnosis and repair decision;
- one verification-boundary decision; and
- one explain-back in the learner's own words.

Passing evidence is the learner's reasoning. Completion, clicking every card
or repeating “app, model, context, tools” is not evidence of understanding.

## Explicit non-goals

- Do not teach detailed menu paths for every product in this class.
- Do not imply every product implements memory, history or retrieval the same
  way.
- Do not turn this into the complete memory, instructions, projects, privacy or
  prompting curriculum.
- Do not claim undocumented access to proprietary retrieval or memory
  internals.
- Do not reduce the class to “use better prompts” or “remember to verify.”

## Gate before narration

Narration may begin only when an instructional reviewer can answer yes:

- Does the class have a compelling real learner problem and useful promise?
- Does every chapter answer a named learner question?
- Are the causal mechanisms accurate and sourced?
- Are adjacent concepts separated without swallowing later classes?
- Do the controlled examples change one meaningful variable?
- Does the learner practise, diagnose, transfer and explain back?
- Can success be observed without relying on completion or recall alone?

Until then, runtime, voice and visual production remain HOLD.
