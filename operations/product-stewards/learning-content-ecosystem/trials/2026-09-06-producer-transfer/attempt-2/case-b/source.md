# Case B — fictional evidence packet

All names and system behavior below are invented for this internal explanatory
test. They describe only this case, not a real service or provider.

A project lead asks an assistant to summarize a meeting and save the resulting
actions to the shared team task board. The summary in chat matches the supplied
meeting notes. The assistant's text says “Saved to the team board.” The team
board has no new tasks.

The application generated the summary using its model. Its separate task-board
integration then attempted a create-tasks request. The service returned a
permission-denied response: the connected account can read tasks but cannot
create them. The write did not succeed and no task IDs were returned. The app
still displayed the model's “Saved” sentence rather than the service error.

The lead is not the board administrator. An administrator may decide whether
creation access is appropriate. Granting access is not automatically authorized.
The app supports a retry after connection access changes, but its behavior on
repeat calls is undocumented. The record here confirms that this attempt created
nothing; that should not be generalized to every ambiguous failure.
No repair, new permission or successful save has yet occurred.

Reader goal: a capable adult beginner should understand why an apparently
successful AI response did not complete the requested job, identify what to
inspect and change, and know what evidence would establish actual completion.
Explain the relevant parts only insofar as they help her reason and act.
