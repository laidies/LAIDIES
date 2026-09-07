# “Saved” is a sentence. A task ID is evidence.

The summary worked. The save did not.

That distinction matters because the assistant completed two different kinds of work. First, its model used the meeting notes to generate a summary. The summary matched those notes, so that language task succeeded. But writing “Saved to the team board” was still only more generated language. It did not, by itself, change the board.

Changing the board required a second operation. The app’s task-board integration sent a create-tasks request to the board service. That service checked the connected account and found that it could read tasks but could not create them. It returned a permission-denied response. No task IDs came back, and no tasks appeared on the board.

So why did the chat look successful? The app displayed the model’s “Saved” sentence instead of the service error. The interface let a proposed outcome stand in for the actual outcome. That is a product failure: the part showing status was listening to the polished sentence when it needed to listen to the system that performed the write.

For the project lead, the practical result is simple. The actions exist in the summary, but colleagues cannot find, assign or complete them on the shared board. Treat this attempt as a failed save.

The repair begins with evidence, not a more confident prompt. Check three things together: the board service’s response, the task IDs returned by the create request, and the board itself. Here, they agree: permission denied, no IDs, no new tasks.

The access problem also has an authority boundary. The lead is not the board administrator, so she should not treat new creation access as a routine setting she is entitled to change. An administrator can decide whether that permission is appropriate. That decision may involve more than convenience: creation access changes what the connected app can do to a shared work system.

If an administrator changes the access, the app can retry—but this case does not tell us how repeat calls behave. A retry might be safe, or it might create duplicates if the surrounding state changes. Before retrying, inspect the board for any existing versions of the tasks. After retrying, require returned task IDs and confirm that those exact tasks appear once on the board. Until then, “ready to retry” is not “saved.”

The same reasoning travels. Suppose a travel assistant drafts an itinerary and says a hotel is booked. The itinerary can be excellent while the booking fails. The useful evidence would be the booking service’s result, a reservation number and the hotel record. An absent booking would show that the action did not complete; it would not prove that permissions were the cause. You would inspect that service’s response rather than borrow the diagnosis from this board incident.

The better next question for any AI action is: **what did the external service return, and what new record now proves the action exists?** Fluent wording can describe completion. Only the system of record can establish it.
