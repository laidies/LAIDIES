# Tutorial research — what is actually out there, and what it shows

**Ali, 2026-07-22:** *"you need to research it. your training data is out of date… go research
tutorials, what is out there from reputable sources to build the training courses."*

## Why this exists — read this before you start
A previous research pass read **vendor help centres only** and treated a URL plus a date as
proof. It was wrong. Ali sent a screenshot of her ChatGPT desktop Settings containing **Hooks,
Appshots, Pets, Configuration, Computer use, Worktrees, Environments** — panes that appeared in
**none** of the help articles fetched. The help centre documents the product; the shipped app is
ahead of it, and our training data is behind both.

**So: your own knowledge is out of date, and so are the docs. Find what people have actually
published recently, and prefer material that SHOWS the interface.**

## ⚠ SCOPE WIDENED — Ali, 2026-07-22
*"tutorials might be too narrow — there has to be a lot of content out there on this."*

Correct. "Tutorial" is one format among many, and not the one where the freshest or the most
honest information lives. The full landscape worth mining:

| Kind | Why it matters to us |
|---|---|
| Vendor docs, release notes, changelogs | Authoritative on policy and limits. Lags the app. |
| Tutorials and walkthroughs | Show the interface. Vary wildly in quality and age. |
| **Courses and structured curricula** | How serious educators SEQUENCE this. Directly informs our running order. |
| **Community — forums, Reddit, Discord, Q&A** | Where people say what actually confused them, and where UI changes get reported first, often weeks before docs. |
| **Newsletters and changelog trackers** | People who follow these products weekly. The fastest signal on what moved. |
| Books and long-form | What the considered written treatments cover. |
| Reviews, comparisons, critical writing | Where the honest assessment of limits lives. |
| Conference talks, university syllabi | What is considered worth teaching, by people with reputations at stake. |

**Community sources are lower-authority but higher-recency.** Use them to find out WHAT changed
and WHERE to look, then corroborate before asserting. A Reddit thread is a lead, not a fact —
but a lead is exactly what we are missing.

## What we are building
Deep video tutorials for a smart woman with no computer-science background — *where things are
and how to set them up*, on the real screen. We need two things from you: **current facts about
the interface**, and **a read on what good teaching material for this already looks like.**

---

## PART 1 — What is out there (the main job)

For your assigned tool, find and assess the **best current teaching material**, and pull out
what it shows about the interface as it exists now.

### Source quality — in this order
1. **The vendor's own tutorials, courses and release notes** (not just the help centre —
   look for their academy/learning hub, changelog, blog, YouTube channel).
2. **Established training organisations and educational institutions** — universities, well
   known professional-training providers, major technology publications with a real editorial
   standard.
3. **Named practitioners with a track record** — people whose work is checkable, who date their
   material and correct it.
4. ⛔ **Reject**: undated posts · SEO listicles · content farms · anything that reads as
   auto-generated · affiliate roundups · anything that will not say when it was written.

### Recency is a hard filter
- **Prefer 2026 material. Anything older than mid-2025 is background at best** — say so.
- **Record the publication date for every source. If it has no date, do not use it.**
- Where a source is older than six months, treat every menu path in it as suspect and say so.

### 🔴 The rule that fixes the last failure — CORROBORATION
- **Never assert a menu path, a pane name, or a click sequence on the strength of one source.**
- Two or more independent, recent sources agreeing = `corroborated`.
- One source only = `single-source, unconfirmed`.
- **Sources that disagree = the strongest possible signal that the interface changed.** Do not
  pick a winner. Report both, with dates, and flag it as `CHANGED — verify in app`.
- Anything you cannot corroborate: **NOT VERIFIED**. That is a perfectly good answer and is far
  more useful to us than a confident guess.

### What to bring back per tool
For each of: **memory · custom instructions · projects or containers · file upload · connectors
· skills, plug-ins and extensions · scheduled tasks · hooks · the modes people miss**

- **What the current interface actually looks like** — the settings sections and pane names as
  recent material shows them. Include the *whole* settings sidebar if any source reveals it.
- **The click path**, with a corroboration label against each one.
- **What changed recently** and roughly when — renames, moves, removals, new panes.
- **Which tier it needs**, if a reputable source states it.
- **Where the good tutorials disagree with the vendor's own docs.** This is valuable; log it.

---

## PART 2 — What good teaching material looks like (the smaller job)

While you are in there, assess the material itself:
- **What do the best tutorials do well?** Structure, pacing, how they handle "where to click",
  how they use highlighting/zoom/callouts, how long they run.
- **What do they all do badly?** Where does a beginner get lost?
- **What is already covered to death**, so we do not repeat it?
- **What is genuinely missing** — the gap LAiDIES could fill?
- Note anything specifically aimed at non-technical women, and whether it is any good.

---

## Deliverable
Write to `operations/research/tutorials/<tool>.md`:

```
tool:
checked_utc:
sources_used:        # each: title · publisher · URL · PUBLICATION DATE · quality tier 1-3
sources_rejected:    # and why — undated, content farm, too old
```

Then one section per topic, each carrying:
**What current material shows · Click path · CORROBORATION: corroborated / single-source /
CHANGED / NOT VERIFIED · Date of the newest source supporting it · What changed recently**

End with:
- `## What the good tutorials do well` and `## What they all get wrong`
- `## Already covered to death` and `## The gap`
- `## 🔴 Confidence` — say plainly which of your findings you would stake something on and
  which you would not. **Under-claim.** An honest "unconfirmed" costs us nothing; a confident
  wrong menu path costs us a filmed class.

## Rules
- **AI is always both capitals.** Never personify the tools. Western majors only, no Grok.
- Do not write teaching copy. Findings only.
- **Do not smooth over contradictions to make a tidy file.** The contradictions are the finding.
