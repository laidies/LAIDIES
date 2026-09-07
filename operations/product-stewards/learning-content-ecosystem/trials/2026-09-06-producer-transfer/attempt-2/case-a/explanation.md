# Why the assistant used the old taxi limit

The handover says the taxi reimbursement limit is $25. The current approved policy says $40. Before blaming “the AI” in general, look at what this particular assistant actually received for this particular draft.

The team lead attached Taxi policy v4, which says $25. The application’s request record shows her instruction, the text from v4 and directions to draft from the supplied documents. It does not show Taxi policy v5, a search result or a lookup from the organization’s policy library. The assistant then used a language model to generate the handover from that assembled request.

That sequence explains the wrong amount. The model was given an old document that supported $25, while the current document that says $40 never entered the run. The policy library may exist elsewhere in the organization, but it was not connected to this assistant. It did not quietly join the meeting from another system.

This is the useful distinction: information can exist in your workplace without being available to an AI task. For a document, instruction or tool result to shape the answer, the application has to include it in the material sent for that run. People often call that working material the **context**. Here, the request record lets you inspect the context instead of guessing.

The repair starts with the source. The lead can obtain approved v5 from the policy owner, remove the old attachment and request a fresh handover from the replacement document. That changes the current material for the new run. It does not change the model’s earlier training, and the case gives us no evidence about that training history anyway.

Attaching v5 also does not guarantee that the next draft will be correct. No corrected run has happened yet. The assistant could still misunderstand the new document, copy the wrong detail or produce an otherwise incomplete handover. A better source fixes one observed failure; it does not turn generated prose into approved policy.

So the usable-work check is practical. First, inspect the request record and confirm that v5, not v4, reached the new run. Then compare the reimbursement sentence in the returned draft with the actual v5 wording. Have the policy owner confirm the rule that staff should follow, and review the rest of the handover for the names, dates, actions and exceptions that matter tomorrow. Only then do you have evidence that the draft is fit for the shift.

The same diagnosis transfers to other workplace answers. If an assistant uses an old overtime rule or a superseded client instruction, ask: **Which exact source and tool result reached this run?** Then change the missing input, run the task again and verify the consequential claim with the person or record that has authority. A confident draft is still a draft; the current, checked handover is the work.
