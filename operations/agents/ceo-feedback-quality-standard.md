# CEO Feedback Quality Standard

Purpose: encode Ali's feedback pattern so the Agent Council catches high-standard product, UX, brand, and detail issues before they reach CEO review.

## Operating Principle

Ali should not be the first person to notice obvious user-flow gaps, broken visuals, missing persistence logic, confusing naming, wrong brand treatment, hidden dependencies, or weak interaction design.

Every agent must review as if Ali will inspect the surface closely, ask how it works for real readers, and expect the answer to hold up across current, future, desktop, mobile, returning, and late-reader scenarios.

## AI Credibility Principle

The Agent Council is part of the proof of the Laidies message. Laidies tells women and smart professionals that learning AI and using AI agents can improve the quality, speed, imagination, and execution of their work. The agents therefore must demonstrate that claim through the website itself.

If the agents miss obvious UX, design, naming, persistence, brand, or interaction issues, they weaken the credibility of the message that AI-supported work can be better. If the agents anticipate those issues, coordinate across roles, and produce stronger work before CEO review, they strengthen the case for why women should learn AI and use it actively.

Agent success is therefore not only internal process success. It is public product evidence.

Every agent review must ask:

- Does this work prove that AI-supported execution can be sharper than a normal manual review?
- Did the agents catch issues before Ali had to?
- Did the agents coordinate like a real high-performing team?
- Would this output make a skeptical smart professional more likely to believe that learning AI is worth it?
- Does this site feel like it was helped by excellent AI systems, or like the human CEO still had to catch the basics?

## CEO-Level Detail Bar

A recommendation is not CEO-ready until it has answered:

- What happens for a first-time reader?
- What happens for a returning reader?
- What happens for a reader who joins several weeks late and wants to start at Issue 01?
- What happens when the reader leaves and comes back later?
- What happens when the reader switches device or browser?
- What is permanent, what is issue-specific, and what is archived?
- What gets saved, where is it saved, and what wording prevents overpromising?
- What does every button, panel, card, quiz, wheel, form, or playlist visibly do?
- What are the empty, loading, completed, error, duplicate, and signed-out states?
- Does the visual treatment look intentional, polished, and brand-specific?
- Are all names, issue titles, labels, logos, and inline brand treatments correct?
- Does the feature still make sense when there are 24 issues?

If any answer is unknown, the agent must mark `INCOMPLETE - NEEDS UX/QA`, not `PASS`.

## Mandatory UX Journey Audit

The UX / Product Experience Agent owns this audit, but cannot complete it alone. UX must coordinate with:

- Chief Design Agent for visual hierarchy, density, blank space, mobile layout, and polish.
- Front-End Engineering Agent for state management, storage, routing, cache, and implementation feasibility.
- Website QA Lead for desktop/mobile browser evidence and visible interaction testing.
- Chief Product Agent for reader jobs, retention loops, late-reader paths, and durable product logic.
- Chief Learning Design Agent for whether the flow deepens the lesson instead of becoming extra clutter.
- Member Card Agent for identity, progress, rewards, consent, and cross-device persistence.
- Data Stewardship & Privacy Agent for what data is collected, where it lives, and what is disclosed.
- Content Operations Agent for issue archive structure, release status, and 24-issue scalability.
- Chief Brand Agent and Editor-in-Chief Agent for naming, voice, copy clarity, and whether the feature belongs in the story.

## Required Flow Coverage

For every major website surface, UX must test and document:

| Flow | Required question |
| --- | --- |
| First-time reader | Can they tell where to start without explanation? |
| Current-issue reader | Can they understand what is live this week and what to do next? |
| Late reader | Can they start at Issue 01 and access earlier packs in order? |
| Returning same-device reader | Does progress, state, or collection behavior match the promise? |
| Returning different-device reader | Is the limitation or login requirement clear? |
| Guest user | Is the site honest about local-only progress? |
| Signed-in user | If login exists, does synced progress clearly attach to the member card? |
| Completion | Does the user know what they earned, where it went, and what to do next? |
| Error/empty state | Is there a clear, non-confusing path when data, content, or auth is missing? |
| Mobile reader | Does the whole journey work without horizontal scroll, overlap, tiny controls, or hidden context? |
| Desktop reader | Does the layout feel intentional, not sparse, chaotic, or overbuilt? |

## Pre-CEO Stop Conditions

Any of these must block or improve before CEO review:

- Ali would have to ask "where did this go?"
- Ali would have to ask "what happens if someone joins later?"
- Ali would have to ask "how is this saved?"
- Ali would have to ask "where does this live: permanent, issue-specific, or archive?"
- Ali would have to ask "why is the label/title/logo/brand styling wrong?"
- Ali would have to ask "did anyone actually click through this?"
- Ali would have to ask "why does this look chaotic, blank, cramped, fake, or unfinished?"
- Ali would have to ask "how does this scale to 24 issues?"
- A feature promises account, collection, sync, personalization, playlist, quiz, wheel, card, or form behavior that has not been tested or honestly scoped.

## UX Evidence Standard

The UX / Product Experience Agent must provide:

- page URL and state/hash tested
- first action observed
- full path through each major section
- desktop viewport evidence
- mobile viewport evidence
- interaction result for each major control
- where user state is stored or why it is not stored
- exact confusing point found, if any
- exact fix, owner, and dependency

No UX agent may score above 3 without journey evidence. No UX agent may score 5 if Ali later catches a basic flow, persistence, naming, visual, or state issue that the agent's mandate covered.
