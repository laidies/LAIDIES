checked_utc: 2026-07-22

# How to teach — what good software tutorials actually look like

Research for Part 2 of the tutorials brief. This is about the teaching craft, not the interface
facts (those belong in the per-tool files). Findings only, no teaching copy.

---

## Sources used

| # | Source | Publisher | Date | Tier |
|---|--------|-----------|------|------|
| 1 | Guo, Kim & Rubin, "How Video Production Affects Student Engagement: An Empirical Study of MOOC Videos" | ACM Learning@Scale '14 (peer-reviewed conference proceedings), DOI 10.1145/2556325.2566239 | 2014 | 1 — peer-reviewed |
| 2 | Van der Meij & Van der Meij, "Eight Guidelines for the Design of Instructional Videos for Software Training" | *Journal of Computer Assisted Learning* / summarized by STC *TechComm* | Study 2013; STC summary dated 2013-10-11 | 1 — peer-reviewed (STC summary is tier 2) |
| 3 | Van der Meij & Van der Meij, "A test of the design of a video tutorial for software training" | *Journal of Computer Assisted Learning* (Wiley) | 2015 | 1 — peer-reviewed |
| 4 | "Some do's and don'ts of Educational Videos" | *Learning and Instruction* (Elsevier/ScienceDirect), special issue on educational video | 2024 | 1 — peer-reviewed (could not confirm author names past the 403 paywall — flagged) |
| 5 | Narciss & Steuer (eds.), "Learning from errors and failure in educational contexts: new insights and future directions" | *British Journal of Educational Psychology* (Wiley) | 2025 | 1 — peer-reviewed |
| 6 | "How to make failure productive: Fostering learning from errors through elaboration prompts" | ScienceDirect / *Learning and Instruction* | 2018 (older, background only) | 1 — peer-reviewed |
| 7 | Laubheimer, "Onboarding Tutorials vs. Contextual Help" | Nielsen Norman Group | 2023-02-12 | 2 — established practitioner/research org, individually credited, dated |
| 8 | "Beyond Blue Links: Making Clickable Elements Recognizable" and related signifier articles | Nielsen Norman Group | various, NN/G house style always dated | 2 |
| 9 | OpenAI Academy (academy.openai.com) | OpenAI | courses listed as new June 2026; page shows live event dates through July 2026 | 1 — vendor |
| 10 | Anthropic Academy (anthropic.com/learn, anthropic.skilljar.com) | Anthropic | platform launched March 2026 per secondary reporting; "AI Fluency: Framework & Foundations" course live as of April 2026 | 1 — vendor |
| 11 | Google Skillshop — Gemini for Workspace certification | Google | certification live as of mid-2026 per Skillshop/Coursera listings | 1 — vendor |
| 12 | Kevin Stratvert, "How to Use ChatGPT" and Gemini/Claude comparison videos | kevinstratvert.com / YouTube @KevinStratvert | 2025-02-11 (ChatGPT guide); weekly cadence continuing into 2026 | 3 — named practitioner, ex-Microsoft PM, dated and consistently updated, checkable track record |
| 13 | SUNY OSCQR, "How Long Should Instructional Videos Be?" | SUNY Online Course Quality Review Rubric (higher-ed instructional design body) | undated page, but cites dated primary research (Guo et al. 2014, Berg et al. 2014) | 2 — institutional, secondary synthesis |
| 14 | Advancing Women in Tech (AWIT) × Anthropic × 1Password, "Real-World AI For Everyone" Specialization | Coursera / advancingwomenintech.org | course launch announced 2025-11-18 (BusinessWire), live 2026 | 2 — named org with track record, vendor-backed, dated |
| 15 | AI Literacy Institute, "Gender and Age Gaps in Generative AI" | AI Literacy Institute (research-synthesis org) | page undated, but synthesizes dated primary studies: Oliver Wyman Forum (2023–24), Humlum & Westergaard (2023–24, Danish worker study), BCG Women in Tech Survey (2024), NY Fed consumer survey (2024), Otis/Delecourt/Cranney/Koning working paper (2024–25) | 2 — synthesis of tier-1 primary studies, each independently dated |
| 16 | ITPro, "Want to get the most out of Anthropic's Claude AI assistant?" | ITPro (established tech trade publication) | 2025 (coverage of AWIT/Anthropic course launch) | 2 |

### Sources rejected
- General "best cursor-highlighting tool" blog posts (Focusee, Rekort, CapCut, Presentify marketing pages) — vendor/affiliate content selling screen-recording software, not evidence of what works. Used only to describe the *convention* (zoom/callout/cursor-highlight), not as evidence it improves learning.
- "9 Best YouTube Channels for ChatGPT Tutorials" (awisee.com) — SEO listicle, no dated methodology. Rejected as a ranking; used only as a pointer to confirm the field is crowded.
- Individual "ChatGPT Tutorial 2026" / "FULL Claude Tutorial for Beginners" YouTube video results — not vetted as individually "best," used only as volume evidence for the "already covered to death" section, not as models to imitate.
- dev.to "10 years recording coding tutorials" comparison post — practitioner blog, no verifiable author credentials found; not used as an evidence source, only noted that this genre of self-published tool-comparison exists.
- learnaiwithlisa.com — could not fetch past a 403; cited secondhand via search-result summary only. Flagged as **NOT VERIFIED** directly — see Genuine Gap section.

---

## What the best tutorials do

**Vendor academies (OpenAI Academy, Anthropic Academy, Google Skillshop) — evidence: sources 9, 10, 11.**
All three vendors moved in 2026 to structured, role-based or level-based course catalogs rather than a flat help center: OpenAI Academy sequences "AI Foundations → Applied AI Foundations → Agents and Workflows"; Anthropic Academy splits into six non-coding and seven developer-focused courses on Skilljar; Google runs Gemini for Workspace as a formal Skillshop certification. This is a **structural** finding, not a stylistic one — none of the three vendor pages I could fetch specified video length, cursor-callout conventions, or click-path detail. That is a real gap in what I could verify: the vendors describe *curriculum architecture* in their marketing pages, but the actual lesson videos sit behind login/paywall-like course flows I did not screen-record or review frame-by-frame. **This should be read as NOT VERIFIED for craft technique, corroborated only for structure.**

**Named practitioners (Kevin Stratvert — source 12).**
Checkable pattern: single-topic videos ("How to Use ChatGPT," "Google Gemini PRO Tutorial for Beginners"), dated, revised annually ("2025," "2026" versions), weekly cadence, ex-Microsoft PM credibility, comparison content (Claude vs ChatGPT vs Gemini) that is explicitly evaluative rather than promotional. His Gemini beginner video runs roughly 25 minutes — longer than the peer-reviewed 6-minute engagement peak (source 1), which is itself worth flagging as a tension: **practitioner convention and cognitive-load research disagree on length**, see below.

---

## What the research says about length and pacing

**Optimal length — evidence-backed, but context-dependent.**
Guo, Kim & Rubin (2014, ACM Learning@Scale, source 1) analyzed 6.9 million MOOC video-watching sessions and found engagement drops sharply past 6 minutes, and videos of 9+ minutes are rarely watched past the halfway point. This is the most-cited number in instructional video design and is corroborated by SUNY OSCQR's synthesis (source 13), which also cites Berg et al. (2014) for a "under 15 minutes" preference band in a separate study population.

**Disagreement to report, not resolve:** the 6-minute MOOC finding is about *conceptual/lecture* video engagement telemetry (auto-generated academic video), not procedural software tutorials specifically. Van der Meij & Van der Meij's software-training research (2013/2015, sources 2–3) says simply "keep videos short" as one of eight guidelines but does not give a number, and their own experimental tutorials in the 2015 study ran longer than 6 minutes while still outperforming paper instructions on retention. Practitioner tutorials in the wild (Stratvert, and the vendor academies' multi-module courses) routinely run 15–30+ minutes per topic. **We could not corroborate a single "correct" number for procedural (as opposed to lecture) tutorials.** The safest evidence-backed read: 6 minutes is the *engagement* ceiling before drop-off risk rises, not a hard cap — segmenting a longer topic into distinct sub-6-minute chapters is supported by both the MOOC data and by Mayer's segmenting principle (below).

**Cognitive load and segmenting — evidence-backed.**
Mayer's multimedia learning principles (widely cited, foundational — not independently re-verified as a single dated 2026 source here, but corroborated across multiple current secondary summaries in the search results) hold that learners do better when a lesson is broken into learner-paced segments rather than one continuous stream, and that highlighting/cueing ("signaling") the relevant on-screen element reduces extraneous cognitive load. Van der Meij's guideline 6 — "make tasks clear and simple... use the highlighter function to highlight particular objects or functions onscreen" — is the software-training-specific version of the same principle. **Two independent lines of research (multimedia learning theory + software-training-specific studies) agree on this: corroborated.**

**Should the video show errors? — genuinely disputed in the literature, not settled.**
This is a real, current research question, not a solved one. The 2025 *British Journal of Educational Psychology* special issue (source 5) frames "learning from errors and failure" as an active area with new insights still emerging in 2025 — i.e., not a closed question instructional designers can cite a single settled answer for. Earlier work (2018, source 6) found that prompting learners to *compare* correct vs. incorrect examples, with elaboration, outperforms showing only correct examples — but the same body of work stresses that **showing an error without elaboration/reflection is not automatically beneficial**, and can backfire if the learner isn't prompted to actively process why it was wrong. For our format (short procedural video, no interactive prompts), the safe, corroborated takeaway is narrower than "show mistakes": **briefly narrating what a wrong-looking screen means and what to do next (a recognizable error state, not a staged failure-and-recovery arc) is defensible; a full "watch me mess up" segment is not supported by evidence for passive video with no reflection prompt.**

**Practice/review — evidence-backed.**
Van der Meij's guideline 8 (source 2) and the 2015 follow-up study (source 3) both found that pairing the demonstration with an explicit recap ("here's what we just did, in order") measurably improved one-week retention over demonstration alone. This is corroborated across two papers from the same research group, which is a caveat — it is not independently replicated by a different lab in what I found — but it is peer-reviewed, methodologically an experiment (not opinion), and directly on-topic (software tutorials specifically, not general multimedia learning).

---

## Signalling and visual callouts

**Evidence-backed:** Mayer's signaling principle — visual cues (color highlight, cursor emphasis, arrows) that draw attention to the actionable element reduce the learner's search cost and extraneous cognitive load. Van der Meij's software-training guidelines independently arrive at the same recommendation ("use the highlighter function"). Two independent traditions agreeing = corroborated.

**Practitioner convention (not independently evidence-tested in what I found, but consistent across screen-recording tool documentation and tutorial-production guides):** a "full screen → cue → zoom → return" pattern — show the whole interface briefly so the viewer keeps their bearings, point at or highlight the target, zoom in for the actual click, then pull back out before the next step. This matches Nielsen Norman Group's broader finding (source 7) that people lose track of *where they are* when a tutorial pulls them out of context — NN/G's finding is about contextual help vs. push tutorials generally, not zoom techniques specifically, so treat the zoom-pattern claim as **single-source practitioner convention, not independently verified against a controlled study.**

**Cursor visibility** is a real, underdiscussed problem: on a high-resolution display a default OS cursor is a tiny fraction of the visible frame. This was raised in screen-recording-tool marketing copy (tier 3, vendor-motivated) rather than a research source, so treat as **plausible, unconfirmed by independent research**, but it aligns with basic legibility guidance (see accessibility below) and is easy to just fix (use a cursor-highlight tool) regardless of formal proof.

---

## Accessibility and craft basics

- **Captions**: WCAG requires captions be a true text equivalent of spoken content and meaningful sound effects, minimum 4.5:1 contrast (7:1 for AAA), and recommends open-format caption files (e.g. VTT) over burned-in text so the viewer can resize/toggle. Multiple current WCAG-compliance explainer sites agree on this (2025–2026 dated pages) — this is standard, uncontested guidance, not a disputed research question.
- **On-screen text legibility for small screens**: general video-accessibility guidance (UC Davis Communications Guide; legibility.info) recommends large font sizes (roughly 40–60px equivalent at delivery resolution), short lines (~30 characters), and generous on-screen dwell time (roughly 1 second per 13 characters) — this becomes acute for a screen-recording tutorial because the *source material* (a browser or app UI) was never designed to be legible at phone-video scale. **This is the single most concrete, checkable craft risk for our format**: a ChatGPT/Claude/Gemini settings pane recorded at native desktop resolution and then watched on a phone will very plausibly have unreadable menu text unless we deliberately zoom/crop/enlarge for each callout.
- **What breaks on a phone**: I found no single controlled study on this specific failure mode for AI-tool tutorials; the risk above is inferred from general legibility guidance plus first-principles (small source UI text + small viewing screen = compounding problem), so this is **reasoned, not independently verified for our exact use case** — worth a real test recording before we scale production.

---

## What everyone gets wrong

- **Interrupting instead of contextualizing.** NN/G's core finding (source 7, 2023) is that push tutorials — including video walkthroughs shown before the user has a reason to care — are measurably worse for task performance and retention than help that arrives when the user is already trying to do the thing. Our format (a standalone class watched before touching the tool) is structurally the *less effective* mode NN/G describes, unless we compensate by keeping tasks concrete and immediately usable (which is also Van der Meij's guideline 4 — preview a real task, not an abstract feature tour).
- **Length creep.** The vendor academies and most YouTube "FULL tutorial" content (source 12 and the "already covered to death" search results) run well past the 6-minute engagement ceiling with no visible segmenting into learner-controlled chapters — a single 25–40 minute video with a linear timeline, not chaptered stops.
- **No corroborated finding on narration style** (describe vs. explain the "why") turned up a dedicated study in this search; this is a real open question we could not answer from what we found. Flag as **NOT VERIFIED — do not build a rule on it.**

---

## Already covered to death

Extremely crowded, corroborated by direct search volume: "ChatGPT tutorial for beginners," "ChatGPT for Beginners 2026 edition," multiple "FULL COURSE 2026" uploads from established teaching channels (Simplilearn) and individual creators, refreshed annually. The same pattern repeats for "FULL Claude Tutorial for Beginners in 2026," "Claude Code Tutorial for Non-Technical Beginners," and Gemini beginner walkthroughs from at least one high-track-record creator (Stratvert). Generic "how to sign up and send your first prompt" content, and generic "ChatGPT vs Claude vs Gemini" comparison content, are both saturated across all three tools. **Do not build a generic "getting started" video for any of the three tools — that exact video already exists in volume, including 2026-dated versions.**

---

## The genuine gap

Two separate things are true and should not be collapsed into one:

**1. The "for women" AI-training market is not empty — it is a real, active field.** Advancing Women in Tech's Coursera specialization ("Real-World AI For Everyone," sources 14, 16) is directly co-sponsored by Anthropic, launched November 2025, live through 2026, with credentialed instructors including a former Anthropic API team manager. Founderz × Microsoft run "AI Skills 4 Women," free, in 13+ languages. These are legitimate, vendor-endorsed, checkable programs — this space is **not uncontested territory**.

**2. But the evidence on who is actually being reached is a genuine, well-documented gap, not a hunch.** Multiple independently dated primary studies (Oliver Wyman Forum 2023–24; Humlum & Westergaard on Danish workers 2023–24; BCG Women in Tech Survey 2024; NY Fed 2024; synthesized in source 15) converge on: women are 7–20% less likely to use generative AI than men depending on country/study, the gap is largest for younger women in self-reported confidence (56% vs 74% in one Australian youth study) even though usage-gap literature elsewhere shows the opposite skew by age, and — separately and important for our audience — adoption drops sharply with age for *everyone*, faster than the gender gap alone would predict (roughly 1% adoption-likelihood decline per year of age in one study). One source (secondhand only, could not fetch directly — **NOT VERIFIED**) suggests existing "AI for women" content clusters around career-advancement and prompting *strategy* rather than literally showing a beginner, on the real screen, where the settings are.

**Where I believe the actual gap sits, stated plainly and distinct from evidence above:** none of the AWIT/Founderz/Anthropic-backed "for women" programs I found are structured as short (5–10 min), single-topic, screen-recorded "here is exactly where memory lives in your settings" videos — they are multi-week strategy/prompting curricula. The vendor academies (OpenAI, Anthropic, Google) cover the settings-level mechanics but are not audience-adapted for a non-technical viewer and are not demonstrably built around the instructional-design evidence above (no confirmed segment length, no confirmed error-handling policy). The named individual practitioner with the clearest track record on exactly this mechanical, "where do I click" register (Stratvert) is not audience-adapted for women specifically and runs longer than the evidence-backed engagement window. **This combination — short, chaptered, screen-accurate, settings-level, audience-adapted to a non-technical woman, grounded in the segmenting/signaling/practice research above — is where I did not find an existing match.** That is an inference from absence across everything searched, not a proven gap; a negative claim from a search, however broad, is weaker evidence than the positive claims above and should be held with appropriate humility.

---

## Concrete recommendations for our format

1. **Chapter, don't sprawl.** Treat 5–10 minutes as the outer shell, but segment internally into sub-6-minute, single-task chapters with clear markers — corroborated by both the MOOC engagement data (source 1) and Mayer's segmenting principle.
2. **Preview the real task before demonstrating it**, in plain language, before showing any screen — corroborated by Van der Meij guideline 4 and consistent with why NN/G finds push-tutorials underperform (give the viewer a reason to care before showing the click).
3. **Use active on-screen signaling (highlight/cursor-emphasis/zoom) on the exact clickable element every time**, not just narration — corroborated across multimedia learning theory and software-training-specific research.
4. **Do not stage a "watch me fail" segment.** If an error state is worth showing, narrate what it means and the fix in one breath, without a manufactured mistake-and-recovery arc — the research is genuinely unsettled on staged failure, but is more supportive of brief error-recognition than dramatized failure.
5. **End each chapter with an explicit spoken recap of the steps in order** — the single most directly corroborated, software-training-specific finding in this whole file (Van der Meij, two papers, same finding both times).
6. **Design for the phone screen from the start**: assume settings-pane text will be too small at native resolution; plan deliberate zoom/crop framing for every callout, not just a full-screen recording with a voiceover.
7. **Caption everything to WCAG contrast/format standards** (VTT, not burned-in, 4.5:1 minimum) — uncontested standard, not a disputed research point.
8. **Do not make another generic "getting started with ChatGPT/Claude/Gemini" video** — this exact content is saturated and refreshed annually by multiple creators including at least one with a strong, checkable track record.

---

## 🔴 Confidence

**Would stake something on:**
- The 6-minute engagement-drop finding for video generally (source 1, peer-reviewed, large dataset) — but flagged as MOOC-lecture data, not procedural-tutorial-specific.
- Segmenting and signaling reduce cognitive load and improve software-tutorial learning specifically (two independent research traditions agree).
- Explicit end-of-segment recap improves retention in software tutorials specifically (Van der Meij, twice).
- The "for women in AI" training space is real and vendor-backed, not empty (AWIT/Anthropic, Founderz/Microsoft — both independently confirmed, dated, checkable).
- The gender/age adoption-confidence gap is real and multiply corroborated across independent 2023–2025 studies.
- "ChatGPT/Claude tutorial for beginners" content is saturated (direct search-volume evidence).
- WCAG caption/contrast requirements as stated (uncontested standard).

**Would NOT stake something on:**
- Any specific optimal length for a *procedural* (as opposed to lecture) tutorial — no source gave one directly; 6 minutes is borrowed from adjacent research.
- Whether tutorial videos should show errors at all — the literature itself says this is unresolved (2025 special issue framing it as open).
- The "full screen → cue → zoom → return" pattern as evidence-based — it's consistent practitioner convention, not a tested claim.
- Cursor-visibility-as-a-measured-problem — plausible, inferred, not independently studied in what I found.
- The exact craft techniques used inside OpenAI Academy, Anthropic Academy, or Google Skillshop lesson videos — I could describe their course architecture from public pages but could not screen the actual lesson videos, so anything about their internal pacing/callout technique is **NOT VERIFIED**.
- The claim that no one has built "our exact video" — this is an absence-of-evidence inference from a broad but not exhaustive search, not a proven gap.
