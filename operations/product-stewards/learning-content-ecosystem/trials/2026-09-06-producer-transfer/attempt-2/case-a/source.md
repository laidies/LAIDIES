# Case A — fictional evidence packet

All names, policies, amounts and system behavior below are invented for this
internal explanatory test. They describe only this case, not a real AI product.

A team lead asks a workplace assistant: “Draft tomorrow's shift handover, including
our current taxi reimbursement limit.” She attaches Taxi policy v4.pdf.
The returned draft says the limit is $25. The team's approved policy is now v5,
effective September 1, with a $40 limit. The supplied v4 file says $25.

The application's request record lists: the lead's request, her attached v4 text,
and instructions to draft a handover from supplied documents. It does not list
v5, a policy-library lookup or a search result. The assistant uses a language
model to generate the draft from that assembled request. A policy-library tool
exists elsewhere in the organization, but is not connected to this assistant.
The model's training history is not supplied and must not be invented.

The lead can obtain approved v5 from the policy owner, replace the attachment
and request a new draft. That replacement does not alter the model's training.
No corrected run has happened yet. There is no evidence that a new draft will
be correct merely because a current document is attached. Actual reimbursement
rules must still be verified by the organization's policy owner.

Reader goal: a capable adult beginner should understand why this particular
wrong answer occurred, identify what to inspect and change, and know what
would establish that the resulting handover is usable. Explain the relevant
parts of the system only insofar as they help her reason and act.
