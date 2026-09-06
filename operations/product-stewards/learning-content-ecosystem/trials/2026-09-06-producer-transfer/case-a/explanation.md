# Why the draft used the old taxi limit

The assistant gave the wrong current limit for a very ordinary reason: the material supplied to this run was out of date. The lead attached Taxi policy v4, which says $25. The approved policy is now v5, with a $40 limit, but v5 never reached the assistant.

You can see the whole path in the request record. The application assembled three things for the job: the lead's request, the text from attached v4 and instructions to draft a handover from the supplied documents. A language model then generated the handover from that assembled material. Since the policy in front of it said $25, the draft repeated $25.

That assembled working material is often called the **context** for a run. The useful point is simpler than the term: information can exist in your organisation without being available to this particular answer. The request record contains no v5 text, no policy-library lookup and no search result. The organisation does have a policy-library tool, but it is not connected to this assistant. A tool sitting elsewhere does not wander into the request on its own, helpful little briefcase in hand.

This means the draft is not evidence that the model somehow chose v4 over v5. There is no sign it was offered both. It also gives us no basis for a theory about the model's training history; that history was not supplied. The traceable failure is upstream of the wording: the app passed along the old source and no operation fetched the new one.

The repair is specific. The lead should obtain approved v5 from the policy owner, replace the v4 attachment and request a new draft. That changes the context for the next run. It does **not** retrain the model or change what it learned before this job.

And one more boundary matters: a better source makes a correct answer possible; it does not make one inevitable. No corrected run has happened yet. After rerunning, the lead still needs to inspect the new request record to confirm v5 was actually included, check that the draft states the $40 limit accurately and verify the reimbursement rule with the policy owner before anyone relies on the handover. A polished sentence is not approval, and an attachment is not a completed check.

The same diagnosis works whenever an assistant handles a dated procedure, price list or staff guide. Ask two questions: **What exact material and operations reached this run?** Then: **Who or what can verify the consequential claim?** Here, those answers are “v4 and no lookup” for the failed run, followed by “approved v5 and the policy owner” for a usable handover.
