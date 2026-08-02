# LAiDIES class-media production standard

Status: **CANONICAL INTERNAL PRODUCTION ORDER**

Applies to: every narrated course, class, lab, tutorial, demonstration and
instructional animation on the site.

## The controlling order

1. **Approve the teaching design.** Before writing narration, define why the
   learner would take the class, the questions it answers, the mechanism she
   must understand, the observable things she will be able to do, the worked
   examples, guided practice, failure diagnosis, assessment and intended next
   experience. A topic list or runtime target is not a teaching design.
2. **Lock the evidence and course outline.** Verify changing claims against
   primary sources, distinguish durable mechanism from product-specific
   implementation, and approve the chapter-level teaching sequence.
3. **Write and approve the canonical teaching script.** Narration is written
   from the approved design and evidence. Never shorten the teaching job to
   fit an animatic, placeholder voice or predetermined runtime.
4. **Approve the narration performance.** Prepare the performance workbench,
   render or record the intended course voice, listen at 1×, log changes and
   reconcile an as-recorded transcript to canon.
5. **Build the final clock from that audio.** The approved narration—not a
   storyboard, estimated reading time or system voice—controls the picture.
6. **Generate captions from that exact audio.** Restore public brand spelling,
   align every cue to what is heard, wrap accessibly and check reading speed.
7. **Finish picture and animation.** Every occurrence must match the narration
   at that time, preserve required subjects, avoid occlusion/cropping and add
   semantic motion only where it clarifies the lesson.
8. **Mix and review the exact master.** Check loudness, true peak, speech
   intelligibility, caption sync, complete sound-on 1× playback, responsive
   player behaviour and the surrounding interactive class journey.
9. **Admit one checksum-bound successor.** Only an independently accepted
   master, captions, poster and catalogue/player receipt may become public.

## Mechanism before procedure

LAiDIES does not teach learners to memorize recipes for one interface. Every
substantial class must make the underlying system legible enough that the
learner can reason about a new tool or a changed interface.

For each rule, memory, file, instruction, tool result or other input, the
teaching must answer:

1. Where does this information live before the task begins?
2. Which product layer selects or retrieves it?
3. Does it enter the model's active context for this request—and how can the
   learner tell?
4. What can the model do with it once supplied?
5. What does the model still not know, see, remember or verify?
6. How would the learner diagnose the result if it does not work as expected?

Do not say that the model has “learned,” “remembered” or “ingested” a user's
information unless the exact mechanism supports that claim. Account memory,
chat history, project files, standing instructions, retrieved sources, active
context and trained model weights are different things. Product-specific
interfaces may expose these building blocks differently, but the class should
leave the learner able to identify their jobs and transfer the mental model.

## What a review animatic is allowed to prove

A provisional animatic may test visual direction, scene order, approximate
runtime and whether the teaching sequence needs more or fewer beats. It may use
a system voice and estimated captions only when both are visibly labelled as
non-release witnesses.

It does **not** prove:

- final narration quality or pronunciation;
- final scene timing;
- final captions or accessibility;
- narration-to-picture alignment;
- final sound mix; or
- readiness for the catalogue or public player.

Once a teaching script is approved, do not polish or rebuild final animation
against a provisional voice. Produce and approve narration first.

## Required narration identities

Keep these separate and checksum-bound:

1. canonical teaching script;
2. tool-facing performance workbench;
3. approved final narration audio;
4. as-recorded transcript with public spelling;
5. captions timed from the approved audio.

Any semantic recording change returns to the canonical class and every related
surface before picture lock. Pronunciation-only and delivery-only changes stay
in the performance layer but still require new caption timing from final audio.

## Course voice

The selected opening-day course narrator is **Hope — upbeat and clear** in
ElevenLabs Studio (voice ID `tnSpp4vdxKPjI9w0GnoV`), using **Eleven v3**
(`eleven_v3`). Before full renders, capture the exact remaining voice settings
and approve one representative 30–45 second sample. Use that same accepted
identity, model and settings across the opening-day course series.

The performance must be warm, smart and conversational, speaking to an adult
peer. No announcer unless a class explicitly calls for one. Never cartoonish,
babyish, schoolmarmish, breathless, condescending or motivational-speaker
copy. Voice selection alone does not authorize a final render: the exact voice
identity/settings, sample, script and content/source gate must also be ready.

The writing and delivery test is: **teach it the way you would teach your
smartest best friend**. Assume intelligence, not prior product knowledge. Start
with why the learner would care, explain one idea at a time in plain language,
show a real example, name the important limitation without scolding, and leave
her able to do or decide something. Conversational does not mean chatty filler,
false intimacy or oversimplification. If the script sounds like a conference
panel, product advert, school lecture or compliance module, rewrite it before
voice production.

Write delivery guidance as short square-bracket cues immediately before the
words they govern, using the same convention as episode narration. In
ElevenLabs Studio, paste the complete approved course script into one chapter
and generate it as one continuous performance. Do not generate every scene as
a separate clip: repeated initialization can change pace, tone and voice
character. Section headings and production notes are edit boundaries, not
spoken copy. If a correction is necessary, replace the smallest clean passage
that can be reconciled without creating an audible patchwork, then recheck the
complete joined performance at 1x.

The model is part of the immutable voice identity. Eleven v3 interprets audio
tags such as `[warm]` and `[whispers]`; Studio's default Multilingual v2 model
does not use the same audio-tag system and may speak bracketed directions as
literal copy. Confirm `eleven_v3` visibly before every audition, correction and
full narration render. Official references checked 2026-08-02:

- https://elevenlabs.io/docs/best-practices/prompting
- https://elevenlabs.io/docs/overview/models

## Recorded-lesson design standard

Every class is a learner journey, not a continuous voiceover with decorative
pictures. A class may—and substantial classes normally should—contain several
lessons. Do not force a complete class into one long video or treat one short
explainer as the complete class.

- **Class:** owns the complete learner promise, prerequisite, sequence,
  cumulative practice, final transfer check and next experience.
- **Lesson:** owns one coherent learning outcome and can be completed or
  resumed independently.
- **Chapter:** a navigable segment inside a lesson video; it is not a substitute
  for a lesson outcome or practice.

Each lesson should use the shortest duration that fully teaches its job. Split
when a video develops multiple primary teaching jobs, when the learner needs
practice before the next concept, or when a natural return point would reduce
cognitive load. Do not split merely to manufacture more completion events.

The class production plan must provide:

1. **A useful promise.** State what the learner will understand, do or decide
   and why that matters before explaining the machinery.
2. **Short, named chapters.** Segment the lesson into meaningful steps with
   pause, replay and direct chapter navigation. One segment should carry one
   primary teaching job.
3. **A worked example.** Show the task, inputs, action, result and check. Change
   one meaningful variable when teaching a comparison.
4. **Guided practice.** Give the learner a low-risk Try-On, not merely another
   example to watch.
5. **Useful feedback.** Explain why a choice worked, what is missing and what
   to try next. Do not reduce feedback to correct/incorrect decoration.
6. **Retrieval and transfer.** End with an explain-back, decision or new example
   that makes the learner use the idea away from the demonstration.
7. **Learner control and access.** Provide captions, a findable descriptive
   transcript, keyboard-operable controls, speed control where the player
   supports it, and a non-video route to every required action or resource.
8. **Progress and return.** Save completed lessons and the learner's next useful
   step. A returning learner should not have to scrub through a long video to
   recover her place.

Use signaling, segmentation, coherence and spatial/temporal contiguity: direct
attention to the exact control or evidence being discussed; remove unrelated
motion; and show the relevant visual when the narration needs it. Do not read
paragraphs of duplicate on-screen text over narration. LAiDIES colour, humour,
characters and Rewind Era references can make a lesson memorable, but each
must support the teaching job rather than compete with it.

Research basis checked 2026-08-02:

- https://pmc.ncbi.nlm.nih.gov/articles/PMC13233991/
- https://pmc.ncbi.nlm.nih.gov/articles/PMC5132380/
- https://ies.ed.gov/ncee/wwc/PracticeGuide/25
- https://www.w3.org/WAI/media/av/transcripts/

## Story-led explanation of difficult ideas

Storytelling is part of the teaching mechanism, not a decorative wrapper. It
must create a reason to need the technical idea, preserve the causal chain and
lead to a decision or action the learner can make. A memorable story that does
not leave the learner able to explain or use the mechanism is not sufficient.

This deliberately continues the LAiDIES episode method. Episodes introduce an
AI idea through a character, desire, conflict and consequence; classes pick up
that same story thread and open the technical hinge. The class must explain why
the result happened, show the relevant system components, test a changed
variable and let the learner use the idea herself. It must feel like the next
part of one LAiDIES learning journey—not a generic tutorial attached afterward.

For a learner with no background in the subject, use this sequence:

1. **Human situation:** begin with a recognizable person, goal, tension or
   mistake—not a glossary term.
2. **Curiosity question:** let the learner predict what will happen or name the
   thing that does not make sense yet.
3. **Essential cast:** pre-teach only the components needed for this mechanism
   and give each one a clear job.
4. **Causal reveal:** show, step by step, what moves where, what makes a choice,
   what changes and why the observed result follows.
5. **Concrete and abstract bridge:** connect the SUNNYVAiLE story or Rewind Era
   analogy to a faithful diagram or model. Name exactly where the analogy stops.
6. **Controlled contrast:** replay the situation with one meaningful change so
   the learner can see what caused the different result.
7. **Learner decision:** ask what she would do next, then give explanatory and
   diagnostic feedback.
8. **Transfer:** change the tool, setting or surface details and ask her to use
   the same mental model again.
9. **Consequence and agency:** return to the human stakes and show what the new
   understanding lets her notice, choose, challenge or create.

The story must carry the explanation rather than interrupt it. Do not open with
a long fictional scene and then switch to an unrelated lecture. Do not force a
pop-culture reference where it distorts the mechanism. Do not hide an important
qualification to preserve a tidy ending.

### The Hannah Fry communication benchmark

This is an internal quality benchmark inferred from Hannah Fry's publicly
available talks, books and science communication—not an instruction to imitate
her voice, mannerisms or identity.

A strong LAiDIES explanation should:

- find the mathematics, logic or system inside a human question people already
  care about;
- establish curiosity before supplying terminology;
- make an invisible process visible with a concrete demonstration, data,
  diagram or experiment;
- retain the real mechanism and its limitations rather than stopping at a
  catchy conclusion;
- move confidently between familiar experience and technical abstraction;
- use humour and surprise without making the learner or subject childish;
- show uses, misuses, uncertainty and consequences; and
- leave the audience thinking differently and able to ask a better next
  question.

The resulting LAiDIES arc is:

`human story -> curiosity -> prediction -> visible mechanism -> contrast -> learner action -> consequence -> transfer`

Research and benchmark basis checked 2026-08-02:

- https://ies.ed.gov/ncee/wwc/practiceguide/1
- https://doi.org/10.1016/j.learninstruc.2024.101944
- https://www.ucl.ac.uk/impact/case-studies/2022/apr/public-and-media-impact-arising-mathematical-research-ucl
- https://www.ucl.ac.uk/mathematical-physical-sciences/news/2024/aug/ucl-mathematician-among-royal-society-medal-winners
- https://www.rigb.org/explore-science/explore/person/hannah-fry

## Visual evidence: show the job, not a decorative substitute

Every visual occurrence must declare its instructional job. Choose the least
elaborate medium that proves the point:

- **Screen recording** for a sequence, changing state, setup, comparison or
  action the learner must be able to repeat. Show the pointer deliberately,
  hold each destination long enough to find, and edit out waiting that teaches
  nothing.
- **Screenshot** for one stable control, setting, state, result or source where
  motion would add no information. Crop around the useful context without
  hiding the product, platform, state or account boundary the learner needs.
- **Diagram or animation** for stable mental models, invisible data flow or an
  analogy—not as a replacement for a real interface walkthrough.
- **Text/card** only for a short decision rule, recap or learner prompt. It may
  not impersonate a demonstration.

Real interface footage must use a purpose-built, non-personal demonstration
account or fixture. Remove private data, notifications, unrelated browser
chrome and accidental account identifiers. A capture is rejected if a learner
cannot tell what changed, where to act next, or how the picture relates to the
narration at that exact time.

## Durable narration and replaceable current-path inserts

Product interfaces change. Keep the enduring explanation separate from the
current route through one particular product:

- **Durable narration** teaches the job, concept, decision, risk and transfer.
  Avoid speaking brittle menu paths when the path is not itself the lesson.
- **Current-path insert** is a short, replaceable screen recording or screenshot
  showing where the control lives today. Put exact menu names in its captions,
  callouts or optional insert narration.
- Label every insert with product, platform, plan/account boundary, capture
  date, source check and the exact class occurrences that consume it.
- Keep current-path insert audio on its own clean edit boundary when spoken
  directions are unavoidable. Never bury a volatile path inside a long
  otherwise-durable narration take.

Freshness triage is proportional:

1. **Location or label only changed:** replace and re-review the current-path
   insert, its callout, transcript fragment and related search metadata.
2. **Capability, access, privacy, risk or workflow changed:** reopen the source
   claim, durable narration, practice, captions, related content and picture.
3. **No longer available or safe:** suppress the affected class path until a
   corrected checksum-bound successor passes.

The freshness receipt must name what changed and what did not. A replaced
insert never silently inherits approval for the rest of the master, and an
unchanged durable narration track should not be rerecorded merely because a
button moved.

## Pre-release instructional review gate

For every scene, the reviewer must be able to answer yes to all applicable
questions:

- Does the narration sound like a smart friend teaching, without condescension,
  hype or unexplained jargon?
- Does the visual help explain, demonstrate, compare, signal or prompt practice?
- If it is procedural, does it use a current real screenshot/screen recording
  rather than decorative imagery?
- Is the relevant control, action, result or source visible at the moment it is
  discussed, long enough to follow, without cropping or occlusion?
- Is volatile product navigation isolated in a replaceable current-path insert?
- Does the learner practise, receive useful feedback and retrieve or transfer
  the idea?
- Does the story create and carry the technical question, rather than merely
  decorate the lesson?
- Can a true beginner see the causal chain and identify the exact boundary of
  the analogy?
- Does the learner predict, decide or explain before the lesson supplies the
  answer?
- Do captions and the descriptive transcript provide the necessary information
  without forcing a learner to see or hear the video?

Any no is a timecoded HOLD with the smallest corrective action. The review
receipt must distinguish a narration defect, current-path defect, visual-job
defect, accessibility defect and full-workflow defect.
