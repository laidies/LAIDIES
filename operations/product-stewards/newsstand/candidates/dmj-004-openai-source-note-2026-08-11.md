# DMJ-004 source note — OpenAI model guidance

- **Checked:** 2026-08-11
- **Authority:** first-party product guidance
- **Source:** https://developers.openai.com/api/docs/guides/latest-model
- **Status:** current when checked; the page does not expose a stable update date

## What the source establishes

OpenAI's current model guidance says long sessions can amplify repeated prompt
and tool content. It recommends leaner prompts, stating an instruction once,
validating changes on representative tasks, changing one instruction, example
or tool group at a time and rerunning the same evaluations. It also says an
efficiency improvement counts only when the final result still passes the
existing quality bar.

## What it does not establish

The page does not say every long conversation deteriorates, provide a universal
revision limit or establish that all AI products manage context identically. It
does not say a new session is the universal remedy. LAiDIES' external brief,
versioned-artifact, checkpoint and validator prescription is a bounded workflow
recommendation derived from the observed failure and existing production method;
it is not presented as an OpenAI product feature.

## Recheck

Recheck if OpenAI changes its long-session, prompting or evaluation guidance, or
if the column names a specific model, context-window size, memory feature,
project behavior or performance figure.
