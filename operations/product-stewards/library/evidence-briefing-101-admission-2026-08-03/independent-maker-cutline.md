# Briefing 101 — independent maker cutline

**Verdict:** `HOLD — REPAIR REQUIRED BEFORE CONTENT ADMISSION`
**Audit mode:** independent, read-only
**Audited:** 2026-08-03 America/Vancouver

## Exact predecessor tuple

| Artifact | SHA-256 |
| --- | --- |
| Rendered candidate: `content/library-books/rendered/briefing-101.html` | `47ac2a1027fd1032c0c6284b638f260ab3cfabbdb399ef4899c4a5f717efee77` |
| Named source: `content/library-books/handbook-ch2.md` | `17b200094f028326cf66278118df601c1cb2d1f57813ba49e76599fd36a39df8` |
| Admission manifest | `b7bcb021900444c2cf7ac73e9173844766c7719dccff0a6ef5c821928b0ad342` |
| Learning relationship graph | `b6c7e50a820441d8f2cc5b0c4ac59727fbcb8ebc5f39598c1e8948141a1ecee6` |
| Learning-content inventory | `2963fee9df7d1ad4d0355229a0f82c38ebd7f388af343a8b1775dd6be9bbf57a` |
| Learning Content Standard | `d139158454b816eaef07cb10e61b0c63683274037e2c57c4ea026768dd60a856` |
| Library operating spec | `20cd5c9ad21f0e2957ce56c5e520e64dbf347163ed8f986853f8c83ada1a5065` |

The candidate is held in the Library; it is not listed in the admission manifest. The relationship graph and learning inventory correctly place it as a durable procedure adjacent to, but distinct from, Episode 2.

## What passes conceptually

Briefing 101 has a distinct reader job: turn a real request into a usable brief. It must remain a scannable procedural reference, not a class clone. Its one optional before/after comparison of the same task is a proportionate way to make the procedure visible. It does not need a quiz, lesson sequence, invented practice flow, or an additional class.

The held shelf state is honest. The current shelf copy, however, does not predict enough of the book's coverage or depth before opening.

## Admission blockers

1. **Unbound source/provenance.** The rendered candidate contains `The Anatomy of a Brief` material after the named `handbook-ch2.md` source. There is no `briefing-101` canonical final source record, claim ledger, or manifest entry to bind the complete final body.
2. **Ownership overlap.** The book repeats too much of Episode 2's David Rose/Romy & Michele narrative and vague-email demonstration. Episode 2 owns the narrative demonstration; Briefing 101 should own the reusable five-part procedure and one controlled worked comparison.
3. **Overbroad or unsupported claims.** Repair or qualify these claims before a source packet is made:
   - “the core skills are the same across every one [of sixteen tools]” and “every tool ... gets sharper”;
   - “A prompt ... [is] not a search query. Not a command.”;
   - “one rule ... across every tool, every model, every version”;
   - “the variable isn't AI. It is the brief.”;
   - “positive instructions outperform negative ones” and its asserted universal causal mechanism.
4. **Analogy boundary missing.** The new-hire analogy is useful for missing task context, not for competence, truth, confidentiality, memory, permissions, or access. Romy & Michele can illustrate generic drafting, not verification. David/Moira can illustrate ambiguity, not a proof that a model understands. Attach those limits where the analogies appear.
5. **Currentness/claim routing missing.** Receipts alone do not provide claim-level source mapping, checked date, volatility/recheck trigger, owner, or correction route.
6. **Continuation and pre-open clarity missing.** Include a direct Episode 2 cross-reference as the narrative demonstration, not an implied class requirement. Replace the held shelf summary with copy that names the actual procedure and scope. A candidate phrasing, only if the repaired body supports it: “Turn a vague request into a usable brief: job, audience, format, tone and constraints — plus what to check before you send.”

## Primary-source boundary

The current Anthropic prompt-engineering documentation supports a provider-scoped recommendation to be clear and direct, specify desired output and constraints, and provide relevant context. It uses the “brilliant but new employee” analogy and recommends telling Claude what to do rather than only what not to do. It does **not** support treating that metaphor, or the positive-instruction advice, as a universal causal rule for every AI product or task. The current OpenAI prompt-engineering guide likewise treats prompting as model- and task-dependent and describes instructions, examples and context as distinct prompt components. Do not use either source to promise quality, understanding, truth, or a result across all tools.

Sources checked 2026-08-03:

- https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- https://developers.openai.com/api/docs/guides/prompt-engineering

## Smallest safe maker repair

1. Establish exactly one canonical final Briefing 101 body and a checksum-bound claim/source ledger; reconcile or remove any material not in that final source.
2. Condense the episode-derived narrative. Retain one useful example, the five-part brief, a limited same-task comparison, and a direct Episode 2 link.
3. Replace the listed universal claims with qualified, reader-useful guidance. Make the comparison about fit to the stated job and its constraints, not proof of a universal performance law.
4. Attach the three analogy limits above. Keep the book short; do not turn it into a class.
5. Record currentness fields for each external/provider claim: source URL, exact supported claim, access/check date, scope, owner, recheck trigger and correction route.
6. Update the held shelf summary only after the final body is settled. Keep status `Editorial review` until independent admission accepts the exact final tuple.

## Required validation and next judge packet

The maker should add one narrow validator, for example:

```sh
node scripts/check-briefing-101-claims.mjs
```

It must bind the exact rendered body, canonical source and claims ledger; reject the unqualified phrases listed above; require analogy boundaries, a direct Episode 2 cross-reference, and complete currentness/correction fields for mutable claims. It must not auto-admit the book.

Then run:

```sh
node scripts/check-product-stewards.mjs --owner-entry library
node scripts/check-briefing-101-claims.mjs
node scripts/test-library-product.cjs
node scripts/test-library-modular-reading-system.mjs
```

Current technical tests pass (`LIBRAiRY PRODUCT PASS`, 68 checks; modular reading system pass at 1440/390/320). They demonstrate Library behavior and growth mechanics, **not** Briefing source integrity, teaching quality, claim truth, or admission.

Request a separate independent content judge only with the final rendered/canonical/claims/manifest hashes, exact source packet, narrow-validator result and changed shelf copy. The judge must assess the repaired bytes against this cutline and the Learning Content Standard; no maker may self-admit.

## Authority and non-mutation statement

This audit did not alter `briefing-101.html`, its source, Library UI, admission manifest, relationship graph, inventory, release state, or public site. It authorizes no content change, admission, deployment, publication, credential use, or release claim. It is a read-only maker cutline only.
