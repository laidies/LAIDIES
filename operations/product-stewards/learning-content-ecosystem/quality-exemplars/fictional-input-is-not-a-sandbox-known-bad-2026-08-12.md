# Known-bad calibration — fictional input mistaken for isolation

**Candidate:** LCWO-013 / Paige's Practical AI Tip

**Incident:** BTB-472

**Disposition:** REJECT — CALIBRATION ONLY / NEVER PUBLISH

## Rejected exact prose

### Give one repeat task a dress rehearsal—not the keys.

A reusable AI skill can save instructions, scripts and reference files so the
same process is available when a matching job comes up. Start with one low-risk
task you already know how to judge, such as turning fictional meeting notes
into a draft action list. Outside work, run the same rehearsal with an imaginary
trip before a packing skill sees real bookings. Read every bundled file, check
what it can access, and test a normal case, an awkward case and a case where it
should not run. If you cannot spot a bad result or stop the workflow, it is not
ready for real work.

## Exact missed defect

The fictional notes and imaginary trip protect only those example inputs. They
do not restrict files, accounts, tools, network access or other authority that
an unknown executable skill may already possess. The source/provenance decision
and least-privilege environment must occur before execution; behavior testing
comes after those boundaries exist.
