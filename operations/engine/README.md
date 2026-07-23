# The Wednesday Engine

This folder runs the week.

You do not have to use any of it directly. It exists so that the machine —
not you — is the one that notices when something is missing, stale, off-voice
or broken. Your job stays four questions a week, and none of them is
"is this broken?"

Everything here is plain text and plain commands. Nothing runs in the
background. Nothing has a dashboard. Nothing needs an account.

---

## The one command

```
cd "/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage"
bash operations/engine/where.sh
```

That prints, in English, what episode we're on, what's finished, what's
blocked, what's waiting on you, and the single next thing to do. It works
everything out fresh every time — it never reads a saved status file, because
saved status files go stale and lie. (This project already has one that says
`"generated": null`.)

Add a number to ask about a specific episode:

```
bash operations/engine/where.sh 5
```

---

## The four times the week stops for you

The engine runs every stage it can, on its own, and stops at exactly four
places. At each one it prints one line saying what it needs and where to look.

| | What you look at | How long | What you're deciding |
|---|---|---|---|
| **Gate 1** | the substance sheet | ~10 min | Does a smart, busy woman learn something here she didn't know? |
| **Gate 2** | only the flagged art | ~20 min | Keep or reroll these frames. |
| **Gate 3** | the cut, once | ~15 min | Does it feel right? |
| **Gate 4** | publish | ~5 min | Ship it. |

**Gate 1 is the important one.** It happens *before any prose exists*. If the
substance is thin, the script, the article, the images, the quiz and the cards
built on top of it are all thin, and all of that work is wasted. Episode 5
stopped for exactly this reason. Approving a one-page sheet is much cheaper
than rejecting a finished episode.

To say yes to a gate, you (not an agent) run one line — the engine prints the
exact line when it stops. For example:

```
touch build/ep05/G1.approved
```

An agent is blocked from creating those files. That is deliberate: if a machine
could approve on your behalf, the gate wouldn't be a gate.

---

## Running a week

Ask in chat, or run:

```
cd "/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage"
make -f operations/engine/Makefile EP=05 week
```

It goes as far as it can and then stops, printing the plain-English "where are
we" block. Run it again after anything changes — **re-running is always safe.**
It never redoes work that's already done; it picks up where it stopped.

If it stops, the last line you'll see from the computer is
`make: *** [week] Error 1`. That is not a crash. It means "stopped, waiting" —
the readable explanation is in the block just above it.

### The stages, in order

```
substance → canon → scripts → audio → timing → art → cut → surfaces
```

- **substance** — the one page you rule on, before prose exists
- **canon** — the master file, the source everything else comes from
- **scripts** — the narration script and the written article
- **audio** — the recorded narration
- **timing** — the clock. Every image is placed against real seconds of real
  audio, never guessed.
- **art** — the images, and whether they actually cover the whole episode
- **cut** — the assembled video (CapCut, by hand — that part can't be scripted)
- **surfaces** — the rest of the week: study pack, quiz, cards, charms, mall,
  closet, glossary

You can run one stage on its own:

```
make -f operations/engine/Makefile EP=05 art
```

### Why "surfaces" refuses to run

It stops with a message explaining itself. Short version: the canon files were
built backwards — copied out of episodes that had already gone out — so they
carry those episodes' mistakes, including one statistic that has been formally
corrected elsewhere. Generating eleven surfaces from canon would turn one
mistake into eleven, automatically. So automatic generation stays off until the
canon files have been swept and each open question actually *decided*.

Nothing is lost by this. The surfaces get built the way they're built today,
and the checklist is in
`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/weekly-cycle-map.md`.

When the sweep is done, one command switches it on:

```
touch "/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/engine/CANON-RULED"
```

---

## Checking an episode

```
bash operations/engine/gate.sh 5
```

One command, one verdict, every check that exists. It prints a line per check
with PASS or FAIL and the reason, then a single verdict at the bottom.

What it checks:

**About the episode**
- the canon file and the narration script exist and are real, not stubs
- the canon declares the signature lines that must appear word-for-word in both
  the script and the article
- banned phrases, self-hyping openers, the SUNNYVAiLE misspelling, script/article
  drift
- no comparison tables in the prose, no "member" (it's Resident), no "course"
  (they're textbooks), and an AI is never "she"

**About the site the episode lands in**
- every cue points at an image or video that is genuinely on disk
- every link and asset on every live page resolves
- every inline script on every page parses
- episode titles, the index, the rewards and the quizzes all agree with each
  other

**What it cannot check:** whether the teaching is any good. No script can. That
is the five-reviewer quality battery at
`operations/workflows/review-content.mjs`, and then you.

---

## If something looks stuck

**Force one stage to run again** — delete its stamp:

```
rm build/ep05/art.stamp
make -f operations/engine/Makefile EP=05 week
```

**Start the whole episode over** (approvals kept):

```
make -f operations/engine/Makefile EP=05 clean-stamps
```

**See what's been ticked off:**

```
make -f operations/engine/Makefile EP=05 stages
```

Nothing in `build/` is precious. It is bookkeeping. Deleting the whole folder
loses no work — it just means the engine re-checks everything.

---

## Two things the machine can't do here

**No ffmpeg.** This Mac doesn't have it, so the engine cannot measure the
exported video's length or audio track. It says so plainly and carries on
rather than stopping. If you ever want that check: `brew install ffmpeg`.

**No CapCut.** There's no way to drive CapCut from a command. The engine's job
is to hand that session a complete, ordered, verified folder plus the cue sheet,
so none of your time goes on hunting for assets.

---

## What lives here

| File | What it is |
|---|---|
| `Makefile` | the spine — the stages, in order, resumable |
| `gate.sh` | every check, one verdict |
| `where.sh` | "where are we?", in English |
| `hashstamp.sh` | decides whether a file really changed (by content, not by clock) |
| `checks/` | three guards that close holes the older checks left open |
| `CANON-RULED` | doesn't exist yet — creating it switches on surface generation |

Related, elsewhere:

- `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/hooks/enforce-voice-spec.py`
  — refuses to let anyone write episode prose without opening the voice rules first
- `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/hooks/block-approval-forgery.py`
  — refuses to let an agent approve anything on your behalf
- `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/workflows/review-content.mjs`
  — the five-reviewer quality battery
- `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/scripts/run-weekly-production.js`
  — **retire this.** 1,365 lines, Windows-only launchers, and its output is a
  dashboard. Superseded by this folder.
