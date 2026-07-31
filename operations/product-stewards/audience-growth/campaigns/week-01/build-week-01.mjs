import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const repo = path.resolve(import.meta.dirname, "../../../../..");
const outDir = import.meta.dirname;
const assetsDir = path.join(outDir, "assets");
const instagramDir = path.join(assetsDir, "instagram");
const linkedinDir = path.join(assetsDir, "linkedin");
const carouselDir = path.join(assetsDir, "instagram-carousels");
const storyDir = path.join(assetsDir, "instagram-stories");
const motionDir = path.join(assetsDir, "instagram-motion");
const linkedinDocumentDir = path.join(assetsDir, "linkedin-documents");
const linkedinDocumentPageDir = path.join(assetsDir, "linkedin-document-pages");
const routeAdmission = {
  observedAt: "2026-07-26T11:48:54-07:00",
  receipt: "operations/product-stewards/episode-experience/audience-campaign-issue-route-admission-2026-07-26.md",
  receiptSha256: "241381d47d17fef011260007657f6b414cd13cfcec5cebddfb52df1af1a08a9c",
  machineRecord: "operations/product-stewards/episode-experience/evidence/audience-week-01-issue-route-admission-2026-07-26.json",
  machineRecordSha256: "50edb84df1cb5d8133c0a41722024fd6a7b44a142f6775d6c2edc0b9fa258eb5",
};
fs.mkdirSync(instagramDir, { recursive: true });
fs.mkdirSync(linkedinDir, { recursive: true });
fs.mkdirSync(carouselDir, { recursive: true });
fs.mkdirSync(storyDir, { recursive: true });
fs.mkdirSync(motionDir, { recursive: true });
fs.mkdirSync(linkedinDocumentDir, { recursive: true });
fs.mkdirSync(linkedinDocumentPageDir, { recursive: true });

const sources = {
  issue01: {
    label: "LAiDIES · ISSUE 01",
    title: "On Wednesdays We Do AI",
    path: "content/issues/issue-01.md",
    route: "https://laidies.ai/issues/issue-01.html",
    art: "approved-assets/brand-logos/laidies-masthead-object-world-issue-01-objects-v1.png",
    accent: "#27d4d0",
    admission: "SOURCE OWNER ADMITTED WITH TITLE CORRECTION — USE ONLY “ON WEDNESDAYS WE DO AI”; STALE “USE AI” HEADING HELD",
  },
  issue02: {
    label: "LAiDIES · ISSUE 02",
    title: "Tell Me What You Want",
    path: "content/issues/issue-02.md",
    route: "https://laidies.ai/issues/issue-02.html",
    art: "approved-assets/episode-section-art/issue-02-hero.png",
    accent: "#ff4f9d",
    admission: "SOURCE OWNER ADMITTED — SPECIFICITY, CONTEXT AND PROMPTING-AS-DELEGATION",
  },
  issue03: {
    label: "LAiDIES · ISSUE 03",
    title: "The Burn Book Problem",
    path: "content/issues/issue-03.md",
    route: "https://laidies.ai/issues/issue-03.html",
    art: "approved-assets/episode-section-art/issue-03-hero.png",
    accent: "#a5eef0",
    admission: "SOURCE OWNER ADMITTED — VERIFICATION AND CONFIDENCE-IS-NOT-EVIDENCE; NO HIGH-STAKES ASSURANCE",
  },
  issue04: {
    label: "LAiDIES · ISSUE 04",
    title: "The Founding Mothers",
    paths: [
      "content/episodes/issue-04.json",
      "content/episodes/episode-04.canon.md",
    ],
    route: "https://laidies.ai/issues/issue-04.html",
    art: "approved-assets/brand-logos/laidies-homepage-masthead-bg-approved-v1.png",
    accent: "#f7d46d",
    admission: "SOURCE OWNER ADMITTED ONLY FROM ISSUE-04 JSON + CANON; DRAFT content/issues/issue-04.md REJECTED",
  },
};

const days = [
  {
    day: 1,
    date: "2026-07-26",
    theme: "Specificity is not prompt engineering theatre",
    source: "issue02",
    units: [
      {
        job: "STOP",
        title: "Tell it what useful looks like.",
        hooks: [
          "Specificity is not secret syntax. It is a useful brief.",
          "Your AI prompt has “the usual” energy at a café that has never met you.",
          "A vague prompt is “fold in the cheese” for a machine.",
        ],
        payoff: "Specificity—not secret syntax—gives AI a better chance of producing something you can use.",
        igFormat: "Reel cover + 20-second direct-to-camera script",
        igCaption: "Prompting is not coding. It is briefing a smart new hire who has never met your director, your project or your office politics. Give it the audience, context, tone, constraints and definition of good.",
        liFormat: "Founder/workplace text post with square visual",
        liCopy: "Prompting is not coding. It is delegation. If the output sounds generic, inspect the brief before blaming the tool: who is this for, what do they care about, what should success look like, and what should the draft leave out?",
        metric: "Qualified three-second holds and saves",
        guardrail: "Do not imply specificity guarantees factual accuracy.",
      },
      {
        job: "TEACH",
        title: "Brief the smart new hire",
        hooks: [
          "AI cannot read your mind, your meeting notes or your office politics.",
          "The tool is new here. Give it the first-week briefing.",
          "Before you rewrite the output, rewrite the assignment.",
        ],
        payoff: "A useful brief names audience, goal, context, tone, constraints, length and exclusions.",
        igFormat: "Seven-frame carousel",
        igCaption: "Before you ask AI to make something better, define better. Audience. Goal. Context. Tone. Constraints. Length. What not to include. That is the brief.",
        liFormat: "Document carousel",
        liCopy: "The practical prompt checklist I use is the same checklist I would use with a capable new teammate: audience, goal, context, tone, constraints, length and exclusions. Better delegation is more reusable than memorizing a magic prompt formula.",
        metric: "Carousel completion and saves",
        guardrail: "Teach the checklist, not a universal formula.",
      },
      {
        job: "SAVE/SEND",
        title: "The seven-part prompt brief",
        hooks: [
          "Save this before your next “make it better” prompt.",
          "Seven briefing lines. A better chance at a usable first pass.",
          "The prompt checklist your future Tuesday afternoon needs.",
        ],
        payoff: "A compact seven-question card gives someone a reusable workplace tool.",
        igFormat: "Saveable checklist card",
        igCaption: "WHO is it for? WHAT do they need? WHY now? CONTEXT? TONE? LENGTH? WHAT SHOULD IT AVOID? Save the brief; reuse it on the next low-risk work task.",
        liFormat: "One-page document/checklist",
        liCopy: "A reusable AI brief: Who is it for? What do they need? Why now? What context matters? What tone fits? How long? What must it avoid? If a colleague would need the answer, the tool probably does too.",
        metric: "Saves and sends",
        guardrail: "No confidential work details in example prompts.",
      },
      {
        job: "JOIN",
        title: "Which briefing detail goes missing?",
        hooks: [
          "Which part of the brief do you skip when you are rushing?",
          "Be honest: audience, context, tone or constraints—which one disappears first?",
          "What does your AI have to guess most often?",
        ],
        payoff: "A low-friction poll surfaces real briefing friction without asking for private examples.",
        igFormat: "Story poll card",
        igCaption: "Poll: when the prompt goes vague, what usually went missing—audience, context, tone or constraints?",
        liFormat: "Conversation post",
        liCopy: "When an AI draft comes back generic, which briefing detail was most likely missing: audience, context, tone or constraints? No confidential examples—just the pattern.",
        metric: "Poll votes and qualified replies",
        guardrail: "Do not solicit private prompts or workplace documents.",
      },
      {
        job: "VISIT/RETURN",
        title: "Read the full specificity lesson",
        hooks: [
          "Your next better prompt starts with a better brief.",
          "Same tool. Same Tuesday. Better assignment.",
          "Be specific about the job, the audience and the boundary.",
        ],
        payoff: "The visitor gets the Issue 02 lesson and a concrete before/after prompt.",
        igFormat: "Feed invitation + Story link candidate",
        igCaption: "The full lesson is Issue 02: Tell Me What You Want. Read the before/after prompt and take the idea into one low-risk task.",
        liFormat: "Value-first link post",
        liCopy: "The full LAiDIES lesson turns “prompt engineering” into a familiar workplace skill: writing a good brief. Issue 02 includes the vague version, the better version and the questions that changed the output.",
        metric: "Verified destination opens and meaningful-action starts",
        guardrail: "Publication HOLD until fresh route proof and exact batch approval.",
      },
    ],
  },
  {
    day: 2,
    date: "2026-07-27",
    theme: "Confidence is not evidence",
    source: "issue03",
    units: [
      {
        job: "STOP",
        title: "Helpful and wrong",
        hooks: [
          "AI can be helpful and wrong in the same answer.",
          "The dangerous sentence is the one that looks ready to leave your laptop.",
          "Full Regina George confidence is not a source.",
        ],
        payoff: "Readers learn that polished tone and factual reliability are separate judgments.",
        igFormat: "Reel cover + 15-second contrast",
        igCaption: "The output can be useful, polished and wrong in the same paragraph. Tone is not a receipt.",
        liFormat: "Short workplace observation",
        liCopy: "The most dangerous AI error is rarely obvious nonsense. It is the normal-looking sentence sitting beside two supported ones. Treat fluency and evidence as separate checks.",
        metric: "Hold/watch and qualified comments",
        guardrail: "Avoid fear-based “AI lies” framing.",
      },
      {
        job: "TEACH",
        title: "Draft or claim?",
        hooks: [
          "Before you fact-check everything, decide what kind of sentence you are holding.",
          "Drafting help and factual claims need different checks.",
          "Not every sentence needs a trial. Some definitely need receipts.",
        ],
        payoff: "Classifying output as draft, claim or inference focuses verification effort.",
        igFormat: "Three-frame teaching carousel",
        igCaption: "DRAFT: edit for usefulness. CLAIM: verify. INFERENCE: label and challenge. The first move is knowing which one you are holding.",
        liFormat: "Mini framework post",
        liCopy: "A practical review shortcut: classify the output. Drafting language needs editing. Factual claims need sources. Inferences need assumptions made visible. The categories keep verification proportionate.",
        metric: "Completions and framework saves",
        guardrail: "High-stakes work still requires domain review.",
      },
      {
        job: "SAVE/SEND",
        title: "The receipt pass",
        hooks: [
          "Names. Dates. Numbers. Quotes. Links. Check these first.",
          "Five tiny details most likely to embarrass a polished draft.",
          "Save the receipt pass before the answer borrows your name.",
        ],
        payoff: "A five-item check gives readers an immediately reusable verification habit.",
        igFormat: "Checklist carousel",
        igCaption: "Before your name goes on it: check every NAME, DATE, NUMBER, QUOTE and LINK. Then check whether the source actually supports the sentence.",
        liFormat: "One-page document",
        liCopy: "My fastest first verification pass is boring on purpose: names, dates, numbers, quotes and links. Each can look plausible while being wrong, stale or attached to the wrong context.",
        metric: "Saves and sends",
        guardrail: "A checklist is a first pass, not full assurance.",
      },
      {
        job: "JOIN",
        title: "The confident-wrong moment",
        hooks: [
          "What is the most confident wrong AI answer you have seen?",
          "Which tiny detail made the whole answer collapse?",
          "When did the polished paragraph lose the case?",
        ],
        payoff: "Responses reveal recurring trust failures without asking for sensitive content.",
        igFormat: "Question sticker card",
        igCaption: "Without sharing private work: what kind of detail gave the error away—a date, link, quote, number or wrong context?",
        liFormat: "Discussion prompt",
        liCopy: "What category of detail most often exposes a confident-wrong AI answer in your work: date, link, quote, number or wrong context? Please keep examples non-sensitive.",
        metric: "Qualified replies by failure category",
        guardrail: "Explicitly exclude confidential examples.",
      },
      {
        job: "VISIT/RETURN",
        title: "Read The Burn Book Problem",
        hooks: [
          "Before the answer borrows your name, check the book.",
          "Do not be Chutney on the stand.",
          "The full receipt lesson is waiting in Issue 03.",
        ],
        payoff: "The visitor gets the complete published verification lesson.",
        igFormat: "Static feature invitation",
        igCaption: "Issue 03 turns AI verification into a practical workplace habit: spot the claim, find the receipt, check the context.",
        liFormat: "Value-first link post",
        liCopy: "Issue 03 is the full LAiDIES verification lesson: why confidence is not evidence, which claims deserve receipts and how to keep a useful draft from becoming an embarrassing final.",
        metric: "Verified destination opens and reading depth",
        guardrail: "Publication HOLD until fresh route proof and exact batch approval.",
      },
    ],
  },
  {
    day: 3,
    date: "2026-07-28",
    theme: "Make the first useful AI try small",
    source: "issue01",
    units: [
      {
        job: "STOP",
        title: "You do not need the 40-hour course",
        hooks: [
          "You do not need a 40-hour AI course before you open the tab.",
          "Ten useful minutes beats waiting for a mythical free weekend.",
          "AI fluency can start with one low-risk Tuesday task.",
        ],
        payoff: "A smaller first step reduces shame and makes action plausible.",
        igFormat: "Reel cover + direct-to-camera script",
        igCaption: "Start with one low-risk task. Compare the result. Keep your judgment. That is a real beginning.",
        liFormat: "Founder perspective post",
        liCopy: "People are being told to “get good at AI” as if a free weekend is about to appear. A more credible start is one low-risk task, ten useful minutes and a deliberate review of what helped.",
        metric: "Qualified reach and comments indicating intent",
        guardrail: "Do not minimize organization-specific AI policies.",
      },
      {
        job: "TEACH",
        title: "Not Google in a blazer",
        hooks: [
          "Generative AI is not Google in a blazer.",
          "Search retrieves. Generative AI produces a new draft.",
          "The first useful distinction: finding versus generating.",
        ],
        payoff: "Readers gain a simple, bounded mental model for generative AI.",
        igFormat: "Two-column carousel",
        igCaption: "Search helps you find existing pages. Generative AI produces a new response from patterns in its training and your context. New output still needs review.",
        liFormat: "Plain-language explainer",
        liCopy: "A useful first distinction: search retrieves existing information; generative AI produces a new response. That is why the result can help draft, summarize or compare—and why it still needs judgment.",
        metric: "Carousel completion and concept replies",
        guardrail: "Keep the model accurate; do not claim search never generates.",
      },
      {
        job: "SAVE/SEND",
        title: "Five low-risk first tasks",
        hooks: [
          "Five AI tasks you can try without handing over the company secrets.",
          "Start small: explain, reorganize, compare, tone-check, brainstorm.",
          "Your first AI task should be useful and boring enough to be safe.",
        ],
        payoff: "A safe task menu turns interest into action.",
        igFormat: "Five-card carousel",
        igCaption: "Try AI on non-sensitive material: explain a public concept, reorganize your own draft, compare two public options, suggest tone alternatives, or brainstorm questions.",
        liFormat: "Saveable checklist",
        liCopy: "Five low-risk starting jobs: explain a public concept, reorganize a draft you can safely share, compare public options, suggest tone alternatives, and brainstorm questions. Check your workplace policy first.",
        metric: "Saves, sends and self-reported trials",
        guardrail: "No confidential, personal or regulated data.",
      },
      {
        job: "JOIN",
        title: "What would you try for ten minutes?",
        hooks: [
          "If you had ten minutes, what safe task would you test?",
          "Which tiny work task would be worth one AI comparison?",
          "What is small enough to try and useful enough to matter?",
        ],
        payoff: "A bounded question surfaces real beginner jobs.",
        igFormat: "Story poll/question card",
        igCaption: "Choose one: explain, reorganize, compare, tone-check or brainstorm questions.",
        liFormat: "Comment prompt",
        liCopy: "What is one low-risk task you would actually give AI ten minutes to help with? Keep the details general; I am interested in the job, not private content.",
        metric: "Replies categorized by task job",
        guardrail: "No requests for private work samples.",
      },
      {
        job: "VISIT/RETURN",
        title: "Start at Issue 01",
        hooks: [
          "Start at the beginning: open the tab, try one thing, keep your judgment.",
          "The first LAiDIES lesson is deliberately small.",
          "One safe interaction is enough for day one.",
        ],
        payoff: "The visitor receives the published introductory lesson.",
        igFormat: "Feed invitation + Story link candidate",
        igCaption: "Issue 01 is the small-start lesson: what generative AI can help with, where judgment stays yours and how to try one low-risk task.",
        liFormat: "Beginner-friendly link post",
        liCopy: "If “learn AI” feels like a second unpaid job, start with Issue 01. It is a small, practical introduction built around one safe interaction rather than a new technical identity.",
        metric: "Verified destination opens and reading starts",
        guardrail: "Publication HOLD until fresh route proof and exact batch approval.",
      },
    ],
  },
  {
    day: 4,
    date: "2026-07-29",
    theme: "Same task, better ask",
    source: "issue02",
    units: [
      {
        job: "STOP",
        title: "The LinkedIn throw pillow test",
        hooks: [
          "Does the draft sound useful—or like a LinkedIn quote printed on a throw pillow?",
          "Generic output has a very specific throw-pillow energy.",
          "If the paragraph could belong to every company, it belongs to none.",
        ],
        payoff: "A vivid quality test helps readers recognize generic output.",
        igFormat: "Short performance Reel",
        igCaption: "If the paragraph could be sent by every company to every audience, the brief probably left the tool guessing.",
        liFormat: "Self-aware LinkedIn text post",
        liCopy: "A slightly dangerous LinkedIn test: could this AI draft be printed on a motivational throw pillow without changing a word? If yes, the assignment probably needs a real audience and a concrete decision.",
        metric: "Qualified shares and comments",
        guardrail: "Critique generic output, not people using LinkedIn.",
      },
      {
        job: "TEACH",
        title: "Same task, better context",
        hooks: [
          "Same tool. Same task. One useful variable changed.",
          "The second prompt worked because the audience finally existed.",
          "Context is the difference between a paragraph and your paragraph.",
        ],
        payoff: "A before/after demonstration makes the mechanism visible.",
        igFormat: "Before/after carousel",
        igCaption: "Vague: summarize this policy. Better: name the six readers, their two-minute window, what changed, what action they need and what background to omit.",
        liFormat: "Before/after document",
        liCopy: "A better prompt does not need ornamental syntax. It needs the reader, their priorities, the decision, the constraints and the exclusions. The improvement is visible because the assignment changed.",
        metric: "Document dwell and saves",
        guardrail: "Examples must stay synthetic and low risk.",
      },
      {
        job: "SAVE/SEND",
        title: "The two-minute manager brief",
        hooks: [
          "Steal this shape for the manager who has two minutes.",
          "A prompt brief for six senior readers and one actual decision.",
          "Save the version that tells AI what the meeting needs.",
        ],
        payoff: "A synthetic prompt scaffold gives immediate workplace utility.",
        igFormat: "Prompt card carousel",
        igCaption: "Audience: six senior managers. Time: two minutes. Need: what changed, when, team action, budget effect. Exclude: history and regulatory background. Tone: direct. Length: 150 words.",
        liFormat: "Copyable prompt scaffold",
        liCopy: "A reusable scaffold: “This is for [audience] with [time]. They need [decision-relevant points]. Exclude [noise]. Tone [x]. Length [y]. Success means [observable result].” Fill it with information you are authorized to share.",
        metric: "Saves, sends and copy intent",
        guardrail: "Explicit authorization/privacy reminder.",
      },
      {
        job: "JOIN",
        title: "What did the tool have to guess?",
        hooks: [
          "What did your last prompt force the tool to guess?",
          "Audience, purpose, tone or constraints: name the missing clue.",
          "The output is generic. What was absent from the assignment?",
        ],
        payoff: "A diagnostic question teaches through participation.",
        igFormat: "Story quiz card",
        igCaption: "Pick the missing clue: audience / decision / tone / constraints.",
        liFormat: "Diagnostic discussion post",
        liCopy: "Think of a generic AI draft you received. Without sharing the content, what did the tool have to guess: audience, purpose, tone or constraints?",
        metric: "Responses by missing-brief category",
        guardrail: "No private prompt collection.",
      },
      {
        job: "VISIT/RETURN",
        title: "Try the before-and-after lesson",
        hooks: [
          "Run the same task twice and change only the brief.",
          "The useful experiment is a side-by-side, not a vibe.",
          "Compare vague versus specific on one safe task.",
        ],
        payoff: "The reader receives a controlled practice idea from Issue 02.",
        igFormat: "Practice invitation card",
        igCaption: "Use one safe task. Run the vague version. Then add audience, context, tone, length and exclusions. Compare usefulness, voice and time saved.",
        liFormat: "Workplace experiment post",
        liCopy: "A clean AI experiment for one low-risk task: hold the tool and task constant, then compare a vague assignment with a properly briefed one. Judge usefulness, voice and actual time saved.",
        metric: "Verified destination opens and self-reported completion",
        guardrail: "Publication HOLD until destination proof and exact approval.",
      },
    ],
  },
  {
    day: 5,
    date: "2026-07-30",
    theme: "Check whether the answer belongs in this room",
    source: "issue03",
    units: [
      {
        job: "STOP",
        title: "She does not even go here",
        hooks: [
          "A perfectly polished answer can still be in the wrong room.",
          "That is a U.S. HR answer in a Canadian workplace.",
          "Useful draft. Wrong company, country, date or decision.",
        ],
        payoff: "Relevance is exposed as a separate quality dimension from plausibility.",
        igFormat: "Reel cover + examples",
        igCaption: "The answer may be correct somewhere. Your job is to check whether it belongs to this company, country, customer, tool, date and decision.",
        liFormat: "Workplace trust post",
        liCopy: "A common AI failure is not fabrication; it is misplaced relevance. The answer may be true for another jurisdiction, product version or organization. “Correct somewhere” is not the same as usable here.",
        metric: "Qualified comments and saves",
        guardrail: "No legal or HR advice.",
      },
      {
        job: "TEACH",
        title: "The relevance check",
        hooks: [
          "Before you ask “is it true?”, ask “is it true here?”",
          "Truth has a company, country, product and date.",
          "Context is part of correctness.",
        ],
        payoff: "Readers learn to bind a claim to its actual scope.",
        igFormat: "Six-frame carousel",
        igCaption: "Check: our company? our country? this customer? this tool/version? this date? this decision? Context is not decoration; it is part of correctness.",
        liFormat: "Mini-framework document",
        liCopy: "A source can be real and the answer still unusable. Bind the claim to company, jurisdiction, customer, product version, date and decision before it enters the final work.",
        metric: "Saves and document completion",
        guardrail: "Do not imply the framework replaces expert review.",
      },
      {
        job: "SAVE/SEND",
        title: "Six questions before send",
        hooks: [
          "Save this before the polished answer leaves your laptop.",
          "Six “does it belong here?” checks.",
          "The context receipt your final draft needs.",
        ],
        payoff: "A compact relevance checklist is useful alone and easy to forward.",
        igFormat: "Checklist card",
        igCaption: "Is it about OUR company, country, customer, tool/version, date and decision? If not, keep it in the prep pile.",
        liFormat: "One-page checklist",
        liCopy: "Before send: Is the answer about our company, country, customer, current tool/version, relevant date and actual decision? A smooth paragraph does not get to choose its own jurisdiction.",
        metric: "Saves and sends",
        guardrail: "Keep examples general.",
      },
      {
        job: "JOIN",
        title: "Which context error appears most?",
        hooks: [
          "What goes stale first: date, product version or policy context?",
          "Which wrong-room answer have you learned to spot?",
          "Where does AI most often import the wrong context?",
        ],
        payoff: "The poll identifies recurring relevance failures for future teaching.",
        igFormat: "Story poll",
        igCaption: "Poll: wrong date / wrong product version / wrong jurisdiction / wrong company context.",
        liFormat: "Conversation prompt",
        liCopy: "Which misplaced-context failure do you encounter most often: stale date, wrong product version, wrong jurisdiction or generic company assumptions?",
        metric: "Votes/replies by error class",
        guardrail: "No sensitive case details.",
      },
      {
        job: "VISIT/RETURN",
        title: "Use the full verification lesson",
        hooks: [
          "The answer can stay in the prep pile until the receipts match.",
          "Check the alibi before it gets on the stand.",
          "Return to Issue 03 for the complete relevance pass.",
        ],
        payoff: "Readers receive the full source, claim and context lesson.",
        igFormat: "Feature invitation",
        igCaption: "Issue 03 covers the wrong-room answer, fake and misplaced sources, and the receipt pass before your name goes on the work.",
        liFormat: "Value-first link post",
        liCopy: "The Burn Book Problem is a practical guide to checking not only whether an AI answer sounds right, but whether its claims, sources and context actually belong to the work.",
        metric: "Verified route opens and reading depth",
        guardrail: "Publication HOLD until fresh route proof and exact approval.",
      },
    ],
  },
  {
    day: 6,
    date: "2026-07-31",
    theme: "The women in computing history are the lesson, not a sidebar",
    source: "issue04",
    units: [
      {
        job: "STOP",
        title: "AI was not invented last Tuesday",
        hooks: [
          "AI was not invented by guys in hoodies last Tuesday.",
          "The history of computing has women’s names all over it.",
          "The newest AI headline sits on nearly two centuries of work.",
        ],
        payoff: "The audience receives a corrective historical frame without a novelty myth.",
        igFormat: "Reel cover + narrated history hook",
        igCaption: "Algorithms, communication systems, compilers, search and computer vision did not arrive as one invention. Women helped build the sequence of ideas underneath today’s AI.",
        liFormat: "Historical perspective post",
        liCopy: "The AI story did not begin with the latest product release. It is a long chain of mathematical, engineering and computing advances—and women’s work belongs in the main narrative, not a heritage-month sidebar.",
        metric: "Qualified reach, shares and profile actions",
        guardrail: "Named historical claims require Issue 04 source receipts.",
      },
      {
        job: "TEACH",
        title: "AI is a chain of advances",
        hooks: [
          "There was no single birthday for AI.",
          "Algorithm, compiler, search, vision: the story is a relay.",
          "The better mental model is a chain, not a lightning bolt.",
        ],
        payoff: "Readers gain a more accurate history model than “one invention.”",
        igFormat: "Timeline carousel without unsupported dates",
        igCaption: "Think chain, not lightning bolt: mathematical procedures, programmable machines, communication, compilers, information retrieval and computer vision accumulated into today’s systems.",
        liFormat: "Document carousel",
        liCopy: "A better history model for AI is accumulation. Mathematical procedures, programmable machines, communications, compilers, information retrieval and computer vision developed over time. Current products inherit that chain.",
        metric: "Carousel completion and saves",
        guardrail: "Do not add dates or priority claims beyond approved sources.",
      },
      {
        job: "SAVE/SEND",
        title: "Five fields worth learning",
        hooks: [
          "Save the fields behind the phrase “AI history.”",
          "Five doors into the women who built computing.",
          "Algorithm. Communication. Compiler. Search. Vision.",
        ],
        payoff: "A field-based card invites durable curiosity without tokenizing people.",
        igFormat: "Five-card field carousel",
        igCaption: "Five doors into the story: algorithms, communication systems, compilers, information retrieval and computer vision. Learn the work, then learn the women’s names attached to it.",
        liFormat: "Saveable field guide",
        liCopy: "A practical reading map for computing history: algorithms, communication systems, compilers, information retrieval and computer vision. The point is not a trivia list; it is understanding the work and who advanced it.",
        metric: "Saves and sends",
        guardrail: "Avoid flattening contributions into slogans.",
      },
      {
        job: "JOIN",
        title: "Which name was new to you?",
        hooks: [
          "Which woman in computing history did school skip?",
          "Whose work did you learn before you learned her name?",
          "Name one computing pioneer you discovered embarrassingly late.",
        ],
        payoff: "Participation reveals knowledge gaps and candidates for future sourced teaching.",
        igFormat: "Question sticker",
        igCaption: "Which woman’s computing work did you discover later than you should have? Names only; we will source before teaching.",
        liFormat: "Conversation post",
        liCopy: "Whose contribution to computing did you learn before you learned her name? Suggestions are research leads, not automatic factual claims; LAiDIES will source before publishing.",
        metric: "Named research leads and qualified replies",
        guardrail: "Treat replies as leads requiring verification.",
      },
      {
        job: "VISIT/RETURN",
        title: "Meet The Founding Mothers",
        hooks: [
          "Take the field trip to Issue 04.",
          "Meet the women underneath the newest AI headline.",
          "The history belongs in the main building.",
        ],
        payoff: "The visitor gets the published Issue 04 historical narrative.",
        igFormat: "Feature invitation",
        igCaption: "Issue 04 is the LAiDIES field trip through the women and advances underneath modern AI.",
        liFormat: "Value-first link post",
        liCopy: "Issue 04, The Founding Mothers, puts women’s computing work back into the central AI story. Read it as history and as a better mental model for how technology actually develops.",
        metric: "Verified destination opens and reading depth",
        guardrail: "Publication HOLD until route/source freshness and exact approval.",
      },
    ],
  },
  {
    day: 7,
    date: "2026-08-01",
    theme: "Make the lesson memorable without making nostalgia the lesson",
    source: "issue01",
    units: [
      {
        job: "STOP",
        title: "Your pop-culture encyclopedia has a job",
        hooks: [
          "The pop-culture encyclopedia in your head finally has a job.",
          "You remember the plot. Good. Use it to remember the AI idea.",
          "Nostalgia is useful when it carries the lesson.",
        ],
        payoff: "The audience understands the distinctive LAiDIES teaching proposition.",
        igFormat: "Reel cover + brand explanation",
        igCaption: "The reference is not decoration. It earns its place when it makes the technical idea easier to understand, remember and use.",
        liFormat: "Founder/brand perspective post",
        liCopy: "LAiDIES uses familiar cultural references as retrieval cues, not wallpaper. The test is simple: if you remove the reference, does the explanation become harder to understand or remember? If not, the reference was decoration.",
        metric: "Qualified reach and “this is for me” replies",
        guardrail: "No unlicensed clips or long quotations.",
      },
      {
        job: "TEACH",
        title: "The load-bearing analogy test",
        hooks: [
          "A good analogy explains the machinery and names where it stops.",
          "If the reference cannot survive one follow-up question, it is decoration.",
          "The analogy has two jobs: click and limits.",
        ],
        payoff: "Readers learn how to judge analogy quality.",
        igFormat: "Four-frame carousel",
        igCaption: "A useful analogy names the matching mechanism, makes one hard idea click, and tells you where the comparison stops matching reality.",
        liFormat: "Mini-framework post",
        liCopy: "A strong teaching analogy does three things: maps a real mechanism, reduces confusion and states its limits. Recognition alone is not explanatory power.",
        metric: "Saves and high-quality discussion",
        guardrail: "Do not present metaphor as literal technical truth.",
      },
      {
        job: "SAVE/SEND",
        title: "Three checks for any AI analogy",
        hooks: [
          "Save this before the next cute AI metaphor.",
          "Does it match? Does it help? Where does it break?",
          "The three-question analogy quality gate.",
        ],
        payoff: "A reusable quality gate helps readers judge teaching content.",
        igFormat: "Checklist card",
        igCaption: "1. What mechanism matches? 2. What becomes easier to understand? 3. Where does the comparison break?",
        liFormat: "One-page checklist",
        liCopy: "Before repeating an AI analogy: What mechanism actually matches? What becomes easier to understand? Where does the comparison break? Cute is optional. Accuracy is not.",
        metric: "Saves and sends",
        guardrail: "No claim that one analogy fully explains a system.",
      },
      {
        job: "JOIN",
        title: "What reference made a work idea click?",
        hooks: [
          "What movie, song or object genuinely helped a work idea click?",
          "Which cultural reference earned its place in the explanation?",
          "What analogy did you remember because it actually matched?",
        ],
        payoff: "Audience replies become consented theme signals, not ready-made canon.",
        igFormat: "Question sticker",
        igCaption: "What reference made a difficult work or tech idea easier to understand—not just funnier?",
        liFormat: "Conversation post",
        liCopy: "What cultural reference genuinely helped you understand a difficult work or technology idea? I am interested in the mechanism it clarified, not nostalgia for its own sake.",
        metric: "Qualified examples and recurring themes",
        guardrail: "Replies are research signals; rights and accuracy still apply.",
      },
      {
        job: "VISIT/RETURN",
        title: "Start the LAiDIES sequence",
        hooks: [
          "Start with one useful lesson, then follow the thread.",
          "Open the tab. Brief it better. Check the receipts.",
          "Three lessons: try, brief, verify.",
        ],
        payoff: "The visitor receives a coherent sequence across Issues 1–3.",
        igFormat: "Three-panel sequence card",
        igCaption: "A useful starting sequence: Issue 01—try one safe task. Issue 02—brief it properly. Issue 03—verify the claims before your name goes on them.",
        liFormat: "Learning-path link post",
        liCopy: "The first three LAiDIES lessons form a practical sequence: try one safe task, improve the brief, then verify the claims. Start at Issue 01 and move at your own pace.",
        metric: "Verified Issue 01 opens and sequential navigation",
        guardrail: "Publication HOLD until exact route sequence and batch approval pass.",
      },
    ],
  },
];

const jobLabels = {
  STOP: "STOP",
  TEACH: "TEACH",
  "SAVE/SEND": "SAVE / SEND",
  JOIN: "JOIN",
  "VISIT/RETURN": "VISIT / RETURN",
};

const channelExpansion = {
  STOP: {
    YouTube: "Shorts: 20–30 seconds; hook in first spoken line, one complete payoff, captioned, no link dependency.",
    TikTok: "Native direct-to-camera or character beat; fast first frame, no recycled watermark, one on-screen idea.",
    Threads: "One sharp observation plus one clarifying reply; invite experience, not a link dump.",
    X: "Concise conversational observation with image; no hashtag clutter.",
  },
  TEACH: {
    YouTube: "Shorts: one mechanism, one example, one limit; searchable title and full captions.",
    TikTok: "Demonstrate the before/after or framework on screen; preserve useful payoff without click.",
    Threads: "Three-post serial explanation ending with a genuine question.",
    X: "Compact teaching thread of 3–4 posts with source link in final post when admitted.",
  },
  "SAVE/SEND": {
    YouTube: "Shorts checklist with each item spoken and displayed; description holds accessible text.",
    TikTok: "Photo-mode checklist or narrated screen cards; final frame gives the complete reusable object.",
    Threads: "Numbered checklist in one post or short serial; invite saves/bookmarks without engagement bait.",
    X: "One compact checklist card plus accessible text in the post.",
  },
  JOIN: {
    YouTube: "Community post after account eligibility; otherwise end a Short with the bounded question.",
    TikTok: "Reply-friendly question or response format; explicitly exclude sensitive examples.",
    Threads: "Native question with topic tag; follow up by synthesizing themes, not copying replies.",
    X: "One bounded question; use replies as research leads only.",
  },
  "VISIT/RETURN": {
    YouTube: "Shorts description and pinned comment point to one verified route after admission.",
    TikTok: "Value-first video; link-in-bio wording only after exact route/account setup.",
    Threads: "Explain the value on-platform, then add one verified link.",
    X: "Concise lesson payoff plus one UTM destination after route admission.",
  },
};

const units = [];
for (const day of days) {
  day.units.forEach((unit, index) => {
    const id = `W01-D${day.day}-${String(index + 1).padStart(2, "0")}`;
    const source = sources[day.source];
    units.push({
      id,
      day: day.day,
      date: day.date,
      dailyTheme: day.theme,
      job: unit.job,
      title: unit.title,
      hooks: unit.hooks,
      selectedHook: unit.hooks[0],
      payoff: unit.payoff,
      source: {
        label: source.label,
        title: source.title,
        paths: source.paths || [source.path],
        status: `${source.admission}; CAMPAIGN OBJECT STILL REQUIRES BRAND/RIGHTS/NEWSSTAND/CONTROL ROOM/ALI ADMISSION`,
        admissionReceipt: routeAdmission,
      },
      sourceAsset: source.art,
      instagram: {
        format: unit.job === "STOP"
          ? "Captioned 9:16 motion-text Reel candidate plus 4:5 feed cover; founder performance remains optional"
          : ["TEACH", "SAVE/SEND"].includes(unit.job)
            ? "Five-frame 4:5 carousel plus 9:16 Story companion"
            : unit.job === "JOIN"
              ? "9:16 Story question/poll candidate plus 4:5 feed cover"
              : "4:5 feed invitation plus 9:16 Story link candidate",
        caption: unit.igCaption,
        asset: `assets/instagram/${id.toLowerCase()}.png`,
        storyAsset: `assets/instagram-stories/${id.toLowerCase()}.png`,
        carouselAssets: ["TEACH", "SAVE/SEND"].includes(unit.job)
          ? Array.from({ length: 5 }, (_, slide) => `assets/instagram-carousels/${id.toLowerCase()}-slide-${slide + 1}.png`)
          : [],
        motionAsset: unit.job === "STOP" ? `assets/instagram-motion/${id.toLowerCase()}.mp4` : null,
        captionAsset: unit.job === "STOP" ? `assets/instagram-motion/${id.toLowerCase()}.vtt` : null,
        status: "BUILT LOCALLY — BRAND/ALI EXACT-USE APPROVAL REQUIRED",
      },
      linkedin: {
        format: ["TEACH", "SAVE/SEND"].includes(unit.job)
          ? "Five-page LinkedIn document PDF plus square preview"
          : `${unit.liFormat} with square visual`,
        copy: unit.liCopy,
        asset: `assets/linkedin/${id.toLowerCase()}.png`,
        documentAsset: ["TEACH", "SAVE/SEND"].includes(unit.job)
          ? `assets/linkedin-documents/${id.toLowerCase()}.pdf`
          : null,
        documentPageAssets: ["TEACH", "SAVE/SEND"].includes(unit.job)
          ? Array.from({ length: 5 }, (_, page) => `assets/linkedin-document-pages/${id.toLowerCase()}-page-${page + 1}.png`)
          : [],
        status: "BUILT LOCALLY — ALI VOICE/EXACT-USE APPROVAL REQUIRED",
      },
      activationAdaptations: channelExpansion[unit.job],
      destination: {
        url: source.route,
        status: unit.job === "VISIT/RETURN"
          ? "ADMITTED — EXACT READ-ISSUE DESTINATION ONLY; LISTEN IS HELD COVER-ONLY AUDIO; BRAND/RIGHTS/NEWSSTAND/CAMPAIGN/CHANNEL/ALI GATES REMAIN HOLD"
          : "NO CLICK REQUIRED; EXACT READ-ISSUE SOURCE ROUTE IS ADMITTED, BUT LINK USE STILL REQUIRES EXACT CAMPAIGN OBJECT APPROVAL",
      },
      metric: unit.metric,
      guardrail: unit.guardrail,
      productionStatus: "BUILT LOCALLY",
      readyStatus: "HOLD",
      publishedStatus: "NOT PUBLISHED",
      altText: `LAiDIES ${jobLabels[unit.job]} editorial card. Large text reads: “${unit.hooks[0]}” Supporting line: “${unit.payoff}”`,
      accessibleText: [
        `${jobLabels[unit.job]}: ${id === "W01-D1-01" ? unit.title.replace(/\.+$/, "") : unit.title}.`,
        `Opening: ${unit.hooks[0]}`,
        `Alternative openings: ${unit.hooks[1]} / ${unit.hooks[2]}`,
        `Lesson: ${unit.payoff}`,
        `Instagram text: ${unit.igCaption}`,
        `LinkedIn text: ${unit.liCopy}`,
        `Safety note: ${unit.guardrail}`,
      ].join(" "),
    });
  });
}

const manifest = {
  schemaVersion: 1,
  campaignId: "audience-week-01-2026-07-26",
  ownerTaskId: "019f9f7f-9fad-7d73-84fa-ba6f37e6ade1",
  status: "BUILT LOCALLY — 35 PLANNED; 0 READY TO PUBLISH; 0 PUBLISHED",
  period: { start: "2026-07-26", end: "2026-08-01", timezone: "America/Vancouver" },
  truth: "All 35 units have copy, three hooks, Instagram and LinkedIn candidates, activation adaptations and measurement intent. Weekly Episodes admitted only the four exact read-issue destinations and the campaign-provided 01→02→03 individual-link sequence. Visual/copy candidates are not Brand/Ali approved; Brand/rights/NewsStand/Control Room/channel/Ali gates remain. Listen is held cover-only audio and no finished-motion or site-linked-sequence claim is allowed. No account, schedule or publication action occurred.",
  counts: {
    planned: units.length,
    builtLocally: units.length,
    readyToPublish: 0,
    published: 0,
    perDay: days.map((d) => ({ date: d.date, planned: 5, builtLocally: 5, readyToPublish: 0, published: 0 })),
  },
  sourceRules: {
    admittedEditorialSources: Object.values(sources).map(({ label, title, path: sourcePath, paths }) => ({
      label,
      title,
      paths: paths || [sourcePath],
    })),
    excluded: [
      "Held NewsStand current-news candidates",
      "Full-motion episode claims",
      "Unverified newsletter delivery, referral, reward, account or community outcomes",
      "Unapproved grand-reopening claims and visuals",
      "Issue 01 stale “Use AI” title; use only “On Wednesdays We Do AI”",
      "Issue 04 draft content/issues/issue-04.md",
      "Finished-motion claims or claims that issue pages themselves provide a linked next-issue sequence",
    ],
    routeAdmission,
  },
  units,
};

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]);
}

function wrap(s, maxChars) {
  const words = s.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + " " + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

function svgText(lines, x, y, size, lineHeight, weight, fill, maxLines = 6) {
  return lines.slice(0, maxLines).map((line, i) =>
    `<text x="${x}" y="${y + i * lineHeight}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(line)}</text>`
  ).join("");
}

async function renderCard(unit, channel) {
  const isIg = channel === "instagram";
  const width = isIg ? 1080 : 1200;
  const height = isIg ? 1350 : 1200;
  const source = sources[days[unit.day - 1].source];
  const job = jobLabels[unit.job];
  const titleLines = wrap(unit.selectedHook, isIg ? 24 : 28);
  const payoffLines = wrap(unit.payoff, isIg ? 43 : 50);
  const sourcePath = path.join(repo, unit.sourceAsset);
  const background = await sharp(sourcePath)
    .resize(width, height, { fit: "cover", position: "attention" })
    .modulate({ saturation: 0.65, brightness: 0.55 })
    .blur(1.2)
    .png()
    .toBuffer();
  const overlay = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#201522" fill-opacity="0.62"/>
      <rect x="${Math.round(width * 0.055)}" y="${Math.round(height * 0.055)}" width="${Math.round(width * 0.89)}" height="${Math.round(height * 0.89)}" rx="36" fill="#2b1830" fill-opacity="0.90" stroke="${source.accent}" stroke-width="4"/>
      <circle cx="${Math.round(width * 0.84)}" cy="${Math.round(height * 0.16)}" r="${Math.round(width * 0.09)}" fill="${source.accent}" fill-opacity="0.95"/>
      <text x="${Math.round(width * 0.84)}" y="${Math.round(height * 0.17)}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${isIg ? 34 : 38}" font-weight="900" fill="#241425">${esc(job.split(" ")[0])}</text>
      ${svgText([unit.source.label], Math.round(width * 0.1), Math.round(height * 0.14), isIg ? 30 : 32, 38, 800, "#f7efe6")}
      ${svgText(titleLines, Math.round(width * 0.1), Math.round(height * 0.31), isIg ? 76 : 72, isIg ? 88 : 84, 900, "#ffffff", 6)}
      <rect x="${Math.round(width * 0.1)}" y="${Math.round(height * 0.72)}" width="${Math.round(width * 0.14)}" height="10" rx="5" fill="${source.accent}"/>
      ${svgText(payoffLines, Math.round(width * 0.1), Math.round(height * 0.78), isIg ? 34 : 36, isIg ? 46 : 48, 500, "#f7efe6", 4)}
      <text x="${Math.round(width * 0.1)}" y="${Math.round(height * 0.91)}" font-family="Arial, Helvetica, sans-serif" font-size="${isIg ? 28 : 30}" font-weight="800" fill="${source.accent}">LAiDIES · BE KIND, REWIND</text>
    </svg>`;
  const target = path.join(channel === "instagram" ? instagramDir : linkedinDir, `${unit.id.toLowerCase()}.png`);
  await sharp(background).composite([{ input: Buffer.from(overlay) }]).png().toFile(target);
  return target;
}

async function renderNativePanel(unit, {
  width,
  height,
  eyebrow,
  title,
  body,
  target,
  slideNumber = null,
}) {
  const source = sources[days[unit.day - 1].source];
  const sourcePath = path.join(repo, unit.sourceAsset);
  const background = await sharp(sourcePath)
    .resize(width, height, { fit: "cover", position: "attention" })
    .modulate({ saturation: 0.55, brightness: 0.48 })
    .blur(1.4)
    .png()
    .toBuffer();
  const titleSize = height > 1500
    ? (title.length > 85 ? 62 : title.length > 55 ? 70 : 78)
    : (title.length > 85 ? 54 : title.length > 55 ? 62 : 70);
  const bodySize = height > 1500 ? 42 : 34;
  const titleLines = wrap(title, width > 1100 ? 24 : 18);
  const bodyLines = wrap(body, width > 1100 ? 44 : 34);
  const footer = slideNumber ? `${slideNumber}/5 · ${unit.id}` : unit.id;
  const overlay = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1b101d" fill-opacity="0.68"/>
      <rect x="${Math.round(width * 0.06)}" y="${Math.round(height * 0.06)}" width="${Math.round(width * 0.88)}" height="${Math.round(height * 0.88)}" rx="42" fill="#2b1830" fill-opacity="0.94" stroke="${source.accent}" stroke-width="4"/>
      ${svgText([eyebrow], Math.round(width * 0.11), Math.round(height * 0.14), 30, 38, 900, source.accent)}
      ${svgText(titleLines, Math.round(width * 0.11), Math.round(height * 0.28), titleSize, titleSize + 12, 900, "#ffffff", 6)}
      <rect x="${Math.round(width * 0.11)}" y="${Math.round(height * 0.66)}" width="${Math.round(width * 0.15)}" height="10" rx="5" fill="${source.accent}"/>
      ${svgText(bodyLines, Math.round(width * 0.11), Math.round(height * 0.72), bodySize, bodySize + 13, 500, "#f7efe6", 5)}
      <text x="${Math.round(width * 0.11)}" y="${Math.round(height * 0.90)}" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="800" fill="${source.accent}">${esc(footer)}</text>
      <text x="${Math.round(width * 0.89)}" y="${Math.round(height * 0.90)}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="800" fill="#f7efe6">LAiDIES</text>
    </svg>`;
  await sharp(background).composite([{ input: Buffer.from(overlay) }]).png().toFile(target);
}

function carouselPanels(unit) {
  return [
    { eyebrow: `${jobLabels[unit.job]} · OPEN`, title: unit.hooks[0], body: "Swipe for the complete idea." },
    { eyebrow: `${jobLabels[unit.job]} · LESSON`, title: unit.title, body: unit.payoff },
    { eyebrow: `${jobLabels[unit.job]} · ANOTHER WAY IN`, title: unit.hooks[1], body: unit.instagram.caption },
    { eyebrow: `${jobLabels[unit.job]} · LIMIT`, title: "Keep the useful boundary.", body: unit.guardrail },
    { eyebrow: `${jobLabels[unit.job]} · KEEP IT`, title: unit.hooks[2], body: unit.job === "SAVE/SEND" ? "Save or send the complete checklist. Keep private material out." : "Save the framework and try it on one low-risk task." },
  ];
}

async function renderNativeAssets(unit) {
  const slug = unit.id.toLowerCase();
  await renderNativePanel(unit, {
    width: 1080,
    height: 1920,
    eyebrow: `${jobLabels[unit.job]} · STORY`,
    title: unit.selectedHook,
    body: unit.job === "JOIN" ? `${unit.payoff} Respond by category only; do not share private work.` : unit.payoff,
    target: path.join(storyDir, `${slug}.png`),
  });

  if (["TEACH", "SAVE/SEND"].includes(unit.job)) {
    const panels = carouselPanels(unit);
    for (let i = 0; i < panels.length; i += 1) {
      await renderNativePanel(unit, {
        width: 1080,
        height: 1350,
        ...panels[i],
        slideNumber: i + 1,
        target: path.join(carouselDir, `${slug}-slide-${i + 1}.png`),
      });
      await renderNativePanel(unit, {
        width: 1200,
        height: 1200,
        ...panels[i],
        slideNumber: i + 1,
        target: path.join(linkedinDocumentPageDir, `${slug}-page-${i + 1}.png`),
      });
    }
  }

  if (unit.job === "STOP") {
    const frameDir = path.join(motionDir, `${slug}-frames`);
    fs.mkdirSync(frameDir, { recursive: true });
    const frames = [
      { eyebrow: "STOP · 0:00", title: unit.hooks[0], body: "Stay for the useful distinction." },
      { eyebrow: "STOP · 0:02", title: unit.title, body: unit.payoff },
      { eyebrow: "STOP · 0:04", title: "Keep your judgment.", body: unit.guardrail },
    ];
    for (let i = 0; i < frames.length; i += 1) {
      await renderNativePanel(unit, {
        width: 1080,
        height: 1920,
        ...frames[i],
        target: path.join(frameDir, `frame-${i + 1}.png`),
      });
    }
    const vtt = [
      "WEBVTT",
      "",
      "00:00:00.000 --> 00:00:02.000",
      unit.hooks[0],
      "",
      "00:00:02.000 --> 00:00:04.000",
      unit.payoff,
      "",
      "00:00:04.000 --> 00:00:06.000",
      unit.guardrail,
      "",
    ].join("\n");
    fs.writeFileSync(path.join(motionDir, `${slug}.vtt`), vtt);
    const ffmpeg = "/Users/alisoneakin/.local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1";
    const inputs = frames.flatMap((_, i) => ["-loop", "1", "-t", "2", "-i", path.join(frameDir, `frame-${i + 1}.png`)]);
    const filter = frames.map((_, i) => `[${i}:v]fps=30,format=yuv420p[v${i}]`).join(";")
      + ";" + frames.map((_, i) => `[v${i}]`).join("") + `concat=n=${frames.length}:v=1:a=0[outv]`;
    const result = spawnSync(ffmpeg, [
      "-y",
      ...inputs,
      "-filter_complex", filter,
      "-map", "[outv]",
      "-c:v", "libx264",
      "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      path.join(motionDir, `${slug}.mp4`),
    ], { encoding: "utf8" });
    if (result.status !== 0) {
      throw new Error(`ffmpeg failed for ${unit.id}: ${result.stderr}`);
    }
  }
}

async function renderStoryAsset(unit) {
  const slug = unit.id.toLowerCase();
  await renderNativePanel(unit, {
    width: 1080,
    height: 1920,
    eyebrow: `${jobLabels[unit.job]} · STORY`,
    title: unit.selectedHook,
    body: unit.job === "JOIN" ? `${unit.payoff} Respond by category only; do not share private work.` : unit.payoff,
    target: path.join(storyDir, `${slug}.png`),
  });
}

async function repairStopMotion(unit) {
  const slug = unit.id.toLowerCase();
  const frameDir = path.join(motionDir, `${slug}-frames`);
  const frames = [
    { eyebrow: "STOP · 0:00", title: unit.hooks[0], body: "Stay for the useful distinction." },
    { eyebrow: "STOP · 0:02", title: unit.title, body: unit.payoff },
    { eyebrow: "STOP · 0:04", title: "Keep your judgment.", body: unit.guardrail },
  ];
  await renderNativePanel(unit, {
    width: 1080,
    height: 1920,
    ...frames[1],
    target: path.join(frameDir, "frame-2.png"),
  });
  fs.writeFileSync(path.join(motionDir, `${slug}.vtt`), [
    "WEBVTT",
    "",
    "00:00:00.000 --> 00:00:02.000",
    unit.hooks[0],
    "",
    "00:00:02.000 --> 00:00:04.000",
    unit.payoff,
    "",
    "00:00:04.000 --> 00:00:06.000",
    unit.guardrail,
    "",
  ].join("\n"));
  const ffmpeg = "/Users/alisoneakin/.local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1";
  const inputs = frames.flatMap((_, i) => ["-loop", "1", "-t", "2", "-i", path.join(frameDir, `frame-${i + 1}.png`)]);
  const filter = frames.map((_, i) => `[${i}:v]fps=30,format=yuv420p[v${i}]`).join(";")
    + ";" + frames.map((_, i) => `[v${i}]`).join("") + `concat=n=${frames.length}:v=1:a=0[outv]`;
  const result = spawnSync(ffmpeg, [
    "-y",
    ...inputs,
    "-filter_complex", filter,
    "-map", "[outv]",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    path.join(motionDir, `${slug}.mp4`),
  ], { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed for ${unit.id}: ${result.stderr}`);
  }
}

async function renderNewsStandDay01RepairAssets() {
  const unit01 = units.find((unit) => unit.id === "W01-D1-01");
  const unit03 = units.find((unit) => unit.id === "W01-D1-03");
  const unit05 = units.find((unit) => unit.id === "W01-D1-05");

  await renderCard(unit01, "instagram");
  await renderCard(unit01, "linkedin");
  await renderStoryAsset(unit01);
  await repairStopMotion(unit01);

  const panel03 = carouselPanels(unit03)[2];
  await renderNativePanel(unit03, {
    width: 1080,
    height: 1350,
    ...panel03,
    slideNumber: 3,
    target: path.join(carouselDir, "w01-d1-03-slide-3.png"),
  });
  await renderNativePanel(unit03, {
    width: 1200,
    height: 1200,
    ...panel03,
    slideNumber: 3,
    target: path.join(linkedinDocumentPageDir, "w01-d1-03-page-3.png"),
  });

  await renderCard(unit05, "instagram");
  await renderCard(unit05, "linkedin");
  await renderStoryAsset(unit05);
}

const brandSuccessorWordmark = path.join(
  repo,
  "approved-assets/brand-logos/laidies-wordmark-final-b-dark.svg"
);

function brandSuccessorSvg(unit, {
  width,
  height,
  eyebrow,
  title,
  body,
  slideNumber = null,
  story = false,
}) {
  const margin = Math.round(width * 0.085);
  const titleWidth = width > 1100 ? 25 : 20;
  const bodyWidth = width > 1100 ? 49 : 39;
  const titleSize = height > 1500
    ? (title.length > 85 ? 62 : title.length > 55 ? 72 : 84)
    : (title.length > 85 ? 52 : title.length > 55 ? 62 : 72);
  const bodySize = height > 1500 ? 38 : 32;
  const titleLines = wrap(title, titleWidth);
  const bodyLines = wrap(body, bodyWidth);
  const job = unit.job;
  const isSevenFieldRepair = unit.id === "W01-D1-03";
  const slideLabel = slideNumber ? `${String(slideNumber).padStart(2, "0")} / 05` : unit.id;
  const sevenFieldLabels = ["WHO", "WHAT", "WHY NOW", "CONTEXT", "TONE", "LENGTH", "AVOID"];
  const sevenFieldIndex = isSevenFieldRepair
    ? sevenFieldLabels.map((label, index) => {
      const column = index < 4 ? 0 : 1;
      const row = column === 0 ? index : index - 4;
      const x = margin + column * Math.round(width * 0.43);
      const y = Math.round(height * (0.70 + row * 0.046));
      return `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${height > 1500 ? 30 : 26}" font-weight="900" letter-spacing="2" fill="#f7d46d">${String(index + 1).padStart(2, "0")} · ${label}</text><line x1="${x}" y1="${y + 12}" x2="${x + Math.round(width * 0.34)}" y2="${y + 12}" stroke="#f7efe6" stroke-opacity=".28" stroke-width="3"/>`;
    }).join("")
    : "";
  const geometry = {
    STOP: `
      <rect x="0" y="0" width="${Math.round(width * 0.075)}" height="${height}" fill="#ef4b94"/>
      <path d="M ${width} 0 L ${Math.round(width * 0.58)} 0 L ${width} ${Math.round(height * 0.42)} Z" fill="#57b6c0" fill-opacity=".20"/>
      <text x="${margin}" y="${Math.round(height * 0.18)}" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="800" letter-spacing="5" fill="#f3b7d0">A USEFUL DISTINCTION</text>
    `,
    TEACH: `
      <rect x="${margin}" y="${Math.round(height * 0.12)}" width="8" height="${Math.round(height * 0.72)}" fill="#57b6c0"/>
      <text x="${Math.round(width * 0.83)}" y="${Math.round(height * 0.18)}" text-anchor="end" font-family="Georgia, serif" font-size="${Math.round(width * 0.15)}" font-weight="700" fill="#57b6c0" fill-opacity=".30">${slideNumber ? String(slideNumber).padStart(2, "0") : "02"}</text>
    `,
    "SAVE/SEND": `
      <rect x="${margin}" y="${Math.round(height * 0.12)}" width="${Math.round(width * 0.18)}" height="8" fill="#f7d46d"/>
      ${isSevenFieldRepair ? sevenFieldIndex : [0, 1, 2, 3].map((i) => `<rect x="${margin}" y="${Math.round(height * (0.68 + i * 0.047))}" width="18" height="18" fill="none" stroke="#f7d46d" stroke-width="4"/><line x1="${margin + 34}" y1="${Math.round(height * (0.69 + i * 0.047))}" x2="${Math.round(width * 0.72)}" y2="${Math.round(height * (0.69 + i * 0.047))}" stroke="#f7efe6" stroke-opacity=".38" stroke-width="4"/>`).join("")}
    `,
    JOIN: `
      <path d="M 0 ${Math.round(height * 0.78)} L ${width} ${Math.round(height * 0.62)} L ${width} ${height} L 0 ${height} Z" fill="#57b6c0" fill-opacity=".12"/>
      ${story ? `<text x="${margin}" y="${Math.round(height * 0.55)}" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="800" letter-spacing="3" fill="#57b6c0">CATEGORY ONLY · DO NOT SHARE PRIVATE WORK</text>${[0, 1, 2, 3].map((i) => `<rect x="${margin}" y="${Math.round(height * (0.58 + i * 0.075))}" width="${Math.round(width * 0.76)}" height="${Math.round(height * 0.052)}" fill="none" stroke="#f3b7d0" stroke-width="3"/><text x="${margin + 24}" y="${Math.round(height * (0.615 + i * 0.075))}" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#f7efe6">${["AUDIENCE", "CONTEXT", "TONE", "CONSTRAINTS"][i]}</text>`).join("")}` : ""}
    `,
    "VISIT/RETURN": `
      <text x="${Math.round(width * 0.82)}" y="${Math.round(height * 0.30)}" text-anchor="end" font-family="Georgia, serif" font-size="${Math.round(width * 0.24)}" font-weight="700" fill="#ef4b94" fill-opacity=".24">02</text>
      <rect x="${margin}" y="${Math.round(height * 0.68)}" width="${Math.round(width * 0.28)}" height="8" fill="#57b6c0"/>
      <text x="${margin}" y="${Math.round(height * 0.76)}" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="900" letter-spacing="4" fill="#57b6c0">READ ISSUE 02</text>
    `,
  }[job];
  const titleY = job === "JOIN" && story
    ? Math.round(height * 0.25)
    : isSevenFieldRepair
      ? Math.round(height * 0.23)
      : Math.round(height * 0.31);
  const bodyY = job === "JOIN" && story
    ? Math.round(height * 0.49)
    : isSevenFieldRepair
      ? Math.round(height * 0.51)
      : Math.round(height * 0.62);
  const footerY = Math.round(height * (isSevenFieldRepair ? 0.95 : 0.90));
  const contentX = job === "TEACH" ? margin + Math.round(width * 0.035) : margin;
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#1f1028"/>
          <stop offset=".55" stop-color="#351336"/>
          <stop offset="1" stop-color="#102b34"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <path d="M 0 ${Math.round(height * 0.16)} L ${width} 0 L ${width} ${Math.round(height * 0.10)} L 0 ${Math.round(height * 0.29)} Z" fill="#ef4b94" fill-opacity=".08"/>
      ${geometry}
      <text x="${margin}" y="${Math.round(height * 0.10)}" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="800" letter-spacing="4" fill="#57b6c0">${esc(eyebrow)}</text>
      ${svgText(titleLines, contentX, titleY, titleSize, titleSize + 12, 700, "#ffffff", job === "JOIN" && story ? 4 : 6).replaceAll('font-family="Arial, Helvetica, sans-serif"', 'font-family="Georgia, Times New Roman, serif"')}
      ${job === "JOIN" && story ? "" : svgText(bodyLines, contentX, bodyY, bodySize, bodySize + 13, 500, "#f7efe6", 5)}
      <text x="${margin}" y="${footerY}" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="800" letter-spacing="3" fill="#f3b7d0">${esc(slideLabel)}</text>
      <text x="${Math.round(width * 0.91)}" y="${footerY}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" letter-spacing="2" fill="#f7efe6">ISSUE 02 · TELL ME WHAT YOU WANT</text>
    </svg>`;
}

async function renderBrandSuccessorPanel(unit, options) {
  const canvas = sharp({
    create: {
      width: options.width,
      height: options.height,
      channels: 4,
      background: "#1f1028",
    },
  });
  const wordmarkWidth = Math.round(options.width * 0.20);
  const wordmark = await sharp(brandSuccessorWordmark)
    .resize({ width: wordmarkWidth })
    .png()
    .toBuffer();
  await canvas
    .composite([
      { input: Buffer.from(brandSuccessorSvg(unit, options)) },
      {
        input: wordmark,
        left: Math.round(options.width * 0.71),
        top: Math.round(options.height * 0.035),
      },
    ])
    .png()
    .toFile(options.target);
}

async function renderBrandSuccessorCard(unit, channel) {
  const instagram = channel === "instagram";
  await renderBrandSuccessorPanel(unit, {
    width: instagram ? 1080 : 1200,
    height: instagram ? 1350 : 1200,
    eyebrow: `${jobLabels[unit.job]} · ${unit.source.label}`,
    title: unit.selectedHook,
    body: unit.payoff,
    target: path.join(instagram ? instagramDir : linkedinDir, `${unit.id.toLowerCase()}.png`),
  });
}

async function renderBrandSuccessorStory(unit) {
  const body = unit.job === "JOIN"
    ? "Choose one category. Do not share private work."
    : unit.payoff;
  await renderBrandSuccessorPanel(unit, {
    width: 1080,
    height: 1920,
    eyebrow: `${jobLabels[unit.job]} · STORY · ${unit.source.label}`,
    title: unit.selectedHook,
    body,
    story: true,
    target: path.join(storyDir, `${unit.id.toLowerCase()}.png`),
  });
}

async function renderBrandSuccessorCarousel(unit) {
  const panels = carouselPanels(unit);
  for (let index = 0; index < panels.length; index += 1) {
    const panel = panels[index];
    await renderBrandSuccessorPanel(unit, {
      width: 1080,
      height: 1350,
      ...panel,
      slideNumber: index + 1,
      target: path.join(carouselDir, `${unit.id.toLowerCase()}-slide-${index + 1}.png`),
    });
    await renderBrandSuccessorPanel(unit, {
      width: 1200,
      height: 1200,
      ...panel,
      slideNumber: index + 1,
      target: path.join(linkedinDocumentPageDir, `${unit.id.toLowerCase()}-page-${index + 1}.png`),
    });
  }
}

async function renderBrandSuccessorMotion(unit) {
  const slug = unit.id.toLowerCase();
  const frameDir = path.join(motionDir, `${slug}-frames`);
  fs.mkdirSync(frameDir, { recursive: true });
  const frames = [
    { eyebrow: "STOP · 0:00", title: unit.hooks[0], body: "A useful brief gives the tool a real job." },
    { eyebrow: "STOP · 0:02", title: unit.title, body: unit.payoff },
    { eyebrow: "STOP · 0:04", title: "Keep your judgment.", body: unit.guardrail },
  ];
  for (let index = 0; index < frames.length; index += 1) {
    await renderBrandSuccessorPanel(unit, {
      width: 1080,
      height: 1920,
      ...frames[index],
      target: path.join(frameDir, `frame-${index + 1}.png`),
    });
  }
  fs.writeFileSync(path.join(motionDir, `${slug}.vtt`), [
    "WEBVTT",
    "",
    "00:00:00.000 --> 00:00:02.000",
    unit.hooks[0],
    "",
    "00:00:02.000 --> 00:00:04.000",
    unit.payoff,
    "",
    "00:00:04.000 --> 00:00:06.000",
    unit.guardrail,
    "",
  ].join("\n"));
  const ffmpeg = "/Users/alisoneakin/.local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1";
  const inputs = frames.flatMap((_, index) => ["-loop", "1", "-t", "2", "-i", path.join(frameDir, `frame-${index + 1}.png`)]);
  const filter = frames.map((_, index) => `[${index}:v]fps=30,format=yuv420p[v${index}]`).join(";")
    + ";" + frames.map((_, index) => `[v${index}]`).join("") + `concat=n=${frames.length}:v=1:a=0[outv]`;
  const result = spawnSync(ffmpeg, [
    "-y",
    ...inputs,
    "-filter_complex", filter,
    "-map", "[outv]",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    path.join(motionDir, `${slug}.mp4`),
  ], { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed for ${unit.id}: ${result.stderr}`);
  }
}

async function renderBrandDay01Successor() {
  const day01Units = units.filter((unit) => unit.day === 1);
  for (const unit of day01Units) {
    await renderBrandSuccessorCard(unit, "instagram");
    await renderBrandSuccessorCard(unit, "linkedin");
    await renderBrandSuccessorStory(unit);
    if (["TEACH", "SAVE/SEND"].includes(unit.job)) {
      await renderBrandSuccessorCarousel(unit);
    }
    if (unit.job === "STOP") {
      await renderBrandSuccessorMotion(unit);
    }
  }
}

async function renderNarrowDay01AccessibilitySaveRepair() {
  const unit = units.find((candidate) => candidate.id === "W01-D1-03");
  await renderBrandSuccessorCard(unit, "instagram");
  await renderBrandSuccessorCard(unit, "linkedin");
  await renderBrandSuccessorStory(unit);
  await renderBrandSuccessorCarousel(unit);
}

function makeBoardMarkdown() {
  const lines = [
    "# LAiDIES rolling seven-day content board · Week 01",
    "",
    "**Status:** BUILT LOCALLY — 35 PLANNED; 0 READY TO PUBLISH; 0 PUBLISHED  ",
    "**Period:** 2026-07-26 through 2026-08-01 · America/Vancouver  ",
    "**Owner task:** `019f9f7f-9fad-7d73-84fa-ba6f37e6ade1`",
    "",
    "Each day has one Stop, Teach, Save/Send, Join and Visit/Return unit. Every unit has three hooks, a complete on-platform payoff, native Instagram and LinkedIn treatment, activation adaptations for YouTube/TikTok/Threads/X, an exact source, a measure and a guardrail.",
    "",
    "These are production candidates, not publication authority. Brand/Ali exact-use approval and the applicable destination/product/Control Room gate remain required.",
    "",
  ];
  for (const day of days) {
    lines.push(`## Day ${day.day} · ${day.date} · ${day.theme}`, "");
    for (const unit of units.filter((u) => u.day === day.day)) {
      lines.push(
        `### ${unit.id} · ${jobLabels[unit.job]} · ${unit.title}`,
        "",
        `- **Source:** ${unit.source.paths.map((p) => `\`${p}\``).join(" + ")} — ${unit.source.status}`,
        `- **Hook A:** ${unit.hooks[0]}`,
        `- **Hook B:** ${unit.hooks[1]}`,
        `- **Hook C:** ${unit.hooks[2]}`,
        `- **On-platform payoff:** ${unit.payoff}`,
        `- **Instagram:** ${unit.instagram.format}. ${unit.instagram.caption}`,
        `- **LinkedIn:** ${unit.linkedin.format}. ${unit.linkedin.copy}`,
        `- **YouTube:** ${unit.activationAdaptations.YouTube}`,
        `- **TikTok:** ${unit.activationAdaptations.TikTok}`,
        `- **Threads:** ${unit.activationAdaptations.Threads}`,
        `- **X:** ${unit.activationAdaptations.X}`,
        `- **Destination:** ${unit.destination.url} — ${unit.destination.status}`,
        `- **Measure:** ${unit.metric}`,
        `- **Guardrail:** ${unit.guardrail}`,
        `- **Assets:** \`${unit.instagram.asset}\` · \`${unit.instagram.storyAsset}\`${unit.instagram.carouselAssets.length ? ` · ${unit.instagram.carouselAssets.map((p) => `\`${p}\``).join(" · ")}` : ""}${unit.instagram.motionAsset ? ` · \`${unit.instagram.motionAsset}\` · \`${unit.instagram.captionAsset}\`` : ""} · \`${unit.linkedin.asset}\`${unit.linkedin.documentAsset ? ` · \`${unit.linkedin.documentAsset}\`` : ""}`,
        `- **Status:** ${unit.productionStatus}; ${unit.readyStatus}; ${unit.publishedStatus}`,
        ""
      );
    }
  }
  return lines.join("\n");
}

function makeActivationPacket() {
  const leadIds = ["W01-D1-01", "W01-D1-02", "W01-D2-01", "W01-D3-01", "W01-D6-01"];
  const lead = leadIds.map((id) => units.find((u) => u.id === id));
  const lines = [
    "# Missing-channel activation packet",
    "",
    "**Status:** DECISION READY — ACCOUNT CREATION/PUBLICATION NOT AUTHORIZED  ",
    "**Channels:** YouTube · TikTok · Threads · X",
    "",
    "## Shared authority and security gate",
    "",
    "- Ali confirms the exact public handle, display name, bio, profile art and account owner.",
    "- Use a project-controlled email/recovery method, MFA and least-privilege publisher access.",
    "- Record recovery owner and remove access when a collaborator no longer publishes.",
    "- Do not upload contacts, import private audiences or connect an external scheduler by default.",
    "- Profile art is a candidate from `approved-assets/brand-logos/social/`; exact-use Brand/Ali approval is still required.",
    "- No first post goes live until the exact object, account identity, destination and measurement receipt are approved.",
    "",
    "## Shared identity candidate",
    "",
    "- **Display name:** LAiDIES",
    "- **Handle preference:** `@laidies.ai`; fallback choices require Ali because public identity is consequential.",
    "- **Short bio:** Practical AI fluency for women with full calendars, high standards and no patience for beige tech explanations. Welcome to SUNNYVAiLE.",
    "- **Long bio/description:** LAiDIES teaches practical AI fluency through memorable stories, useful workplace tools and the Rewind Era references many of us never forgot. The reference earns its place by making the lesson easier to understand, remember and use.",
    "- **Profile image candidate:** `approved-assets/brand-logos/social/laidies-logo-square-social-pearl-1080-v2.png`",
    "- **Canonical link candidate:** `https://laidies.ai/` — final profile use remains held with the reopening/product gate.",
    "",
  ];
  for (const channel of ["YouTube", "TikTok", "Threads", "X"]) {
    lines.push(`## ${channel}`, "");
    const role = {
      YouTube: "Durable video discovery: captioned Shorts first; admitted episodes/classes only after media/product proof.",
      TikTok: "Native performance discovery: fast direct-to-camera teaching, character bits and demonstrations; no watermarked reposts.",
      Threads: "Conversation and idea testing: observations, serial explanations, questions and useful replies before links.",
      X: "Concise real-time and evergreen commentary: media-supported, conversational, sourced when factual and free of hashtag clutter.",
    }[channel];
    lines.push(
      `- **Native role:** ${role}`,
      "- **Launch batch:**",
    );
    for (const unit of lead) {
      lines.push(`  - \`${unit.id}\` — ${unit.activationAdaptations[channel]} Hook: “${unit.selectedHook}” Payoff: ${unit.payoff}`);
    }
    lines.push(
      "- **First-week measure:** profile completeness; qualified reach; hold/watch or dwell; saves/bookmarks; replies; verified destination actions only after link admission.",
      "- **Stop/repair trigger:** wrong identity, unapproved visual/copy, broken destination, privacy/rights issue, low-quality copied adaptation or audience confusion.",
      "- **Account/publication authority:** ALI REQUIRED.",
      ""
    );
  }
  lines.push(
    "## Decision Ali receives",
    "",
    "Approve or revise, per channel: exact handle, profile bio, exact profile art and the five-object launch batch. Approval does not automatically create the account or publish; the authorized operator records each resulting account and live URL separately.",
    ""
  );
  return lines.join("\n");
}

function makeContentPack() {
  const lines = [
    "# Instagram + LinkedIn Week 01 production pack",
    "",
    "**Status:** BUILT LOCALLY — NATIVE-SHAPE INSTAGRAM/LINKEDIN CANDIDATES EXIST; 0 READY TO PUBLISH  ",
    "**Decision owner:** Ali for exact public voice/use; Brand for eligibility; product owners and Control Room for destination promises.",
    "",
    "The manifest and board hold the complete copy. This index gives the exact candidate asset and alt-text map.",
    "",
    "| ID | Job | Instagram deliverables | LinkedIn deliverables | Accessible equivalent |",
    "|---|---|---|---|---|",
  ];
  for (const unit of units) {
    const ig = [
      unit.instagram.asset,
      unit.instagram.storyAsset,
      ...unit.instagram.carouselAssets,
      unit.instagram.motionAsset,
      unit.instagram.captionAsset,
    ].filter(Boolean).map((p) => `\`${p}\``).join("<br>");
    const li = [unit.linkedin.asset, unit.linkedin.documentAsset, ...unit.linkedin.documentPageAssets].filter(Boolean).map((p) => `\`${p}\``).join("<br>");
    lines.push(`| ${unit.id} | ${jobLabels[unit.job]} | ${ig} | ${li} | \`ACCESSIBILITY-MANIFEST.json#${unit.id}\` |`);
  }
  lines.push(
    "",
    "## Admission truth",
    "",
    "- `BUILT LOCALLY` means the files and copy exist.",
    "- `READY TO PUBLISH` remains zero until exact-use visual/copy approval, product/Control Room destination admission and publisher authority pass.",
    "- `PUBLISHED` remains zero until the live object and destination are verified with URL/time evidence.",
    ""
  );
  return lines.join("\n");
}

fs.writeFileSync(path.join(outDir, "seven-day-content-board.json"), JSON.stringify(manifest, null, 2) + "\n");
fs.writeFileSync(path.join(outDir, "SEVEN-DAY-CONTENT-BOARD.md"), makeBoardMarkdown() + "\n");
fs.writeFileSync(path.join(outDir, "MISSING-CHANNEL-ACTIVATION-PACKET.md"), makeActivationPacket() + "\n");
fs.writeFileSync(path.join(outDir, "INSTAGRAM-LINKEDIN-PRODUCTION-PACK.md"), makeContentPack() + "\n");
fs.writeFileSync(path.join(outDir, "ACCESSIBILITY-MANIFEST.json"), JSON.stringify({
  schemaVersion: 1,
  status: "BUILT LOCALLY — ACCESSIBLE TEXT/CAPTIONS REQUIRE FINAL FORMAT AND HUMAN REVIEW",
  rules: [
    "Every visual has a full-text equivalent; do not rely on image text alone.",
    "Motion candidates include WebVTT captions and contain no audio.",
    "Carousel equivalents preserve slide order and repeat the complete teaching object.",
    "Poll/question units request categorical, non-sensitive responses.",
  ],
  units: Object.fromEntries(units.map((unit) => [unit.id, {
    altText: unit.altText,
    fullText: unit.accessibleText,
    slideText: ["TEACH", "SAVE/SEND"].includes(unit.job) ? carouselPanels(unit) : [],
    captionFile: unit.instagram.captionAsset,
    pollAccessibility: unit.job === "JOIN"
      ? "The same bounded question must appear in post text. Respondents are told not to share private or workplace-sensitive examples."
      : null,
  }])),
}, null, 2) + "\n");

const newsStandDay01Repair = process.argv.includes("--newsstand-day01-source-use-repair");
const brandDay01Successor = process.argv.includes("--brand-day01-successor");
const narrowDay01AccessibilitySaveRepair = process.argv.includes("--narrow-day01-accessibility-save-repair");
if (narrowDay01AccessibilitySaveRepair) {
  await renderNarrowDay01AccessibilitySaveRepair();
} else if (brandDay01Successor) {
  await renderBrandDay01Successor();
} else if (newsStandDay01Repair) {
  await renderNewsStandDay01RepairAssets();
} else {
  for (const unit of units) {
    await renderCard(unit, "instagram");
    await renderCard(unit, "linkedin");
    await renderNativeAssets(unit);
  }
}

const sampleUnits = units.slice(0, 5);
const thumbWidth = 270;
const thumbHeight = 300;
const sheet = sharp({
  create: {
    width: thumbWidth * 5,
    height: thumbHeight * 2,
    channels: 4,
    background: "#160f18",
  },
});
const composites = [];
for (let i = 0; i < sampleUnits.length; i += 1) {
  const id = sampleUnits[i].id.toLowerCase();
  const igThumb = await sharp(path.join(instagramDir, `${id}.png`))
    .resize(thumbWidth, thumbHeight, { fit: "cover", position: "top" })
    .toBuffer();
  const liThumb = await sharp(path.join(linkedinDir, `${id}.png`))
    .resize(thumbWidth, thumbHeight, { fit: "cover", position: "top" })
    .toBuffer();
  composites.push({ input: igThumb, left: i * thumbWidth, top: 0 });
  composites.push({ input: liThumb, left: i * thumbWidth, top: thumbHeight });
}
await sheet
  .composite(composites)
  .png()
  .toFile(path.join(assetsDir, "day-01-instagram-linkedin-contact-sheet.png"));

console.log(`built ${units.length} units`);
console.log(newsStandDay01Repair
  ? "rendered NewsStand source-use repair derivatives for W01-D1-01, W01-D1-03 and W01-D1-05"
  : narrowDay01AccessibilitySaveRepair
    ? "rendered narrow accessibility/save repair derivatives for W01-D1-03; W01-D1-01 visual bytes preserved"
  : brandDay01Successor
    ? "rendered bounded Brand-successor derivatives for W01-D1-01 through W01-D1-05"
  : `rendered ${units.length * 2} candidate assets`);
if (!newsStandDay01Repair && !brandDay01Successor && !narrowDay01AccessibilitySaveRepair) {
  console.log("rendered 35 Story assets, 70 carousel frames, 70 LinkedIn document pages, 7 motion candidates and 7 WebVTT caption files");
}
console.log("rendered Day 01 contact sheet");
