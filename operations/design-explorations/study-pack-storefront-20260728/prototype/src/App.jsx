import { useEffect, useState } from "react";

const episodes = [
  {
    number: 1,
    title: "On Wednesdays We Do AI",
    short: "Open the Tab",
    image: "/assets/episodes/episode-01.png",
    theme: "episode-one",
    description:
      "The one where opening the tab becomes a first safe, useful step—not another thing you were supposed to know already.",
    items: [
      {
        name: "Everything to Remember",
        type: "Cheat Sheet",
        job: "The whole lesson on one printable page.",
        image: "/assets/items/episode-01-cheat.png",
        status: "READY",
        action: "cheat-sheet",
        actionLabel: "OPEN CHEAT SHEET",
      },
      {
        name: "Three Tabs, One Task",
        type: "Try-On",
        job: "Put one small task into ChatGPT, Claude and Gemini. Compare what comes back.",
        image: "/assets/items/episode-01-try-on.png",
        status: "READY",
      route: "/episode-01-try-on/index.html",
        actionLabel: "START TRY-ON",
      },
      {
        name: "Things Worth Keeping",
        type: "Trading Card Pack",
        job: "Flip the colourful cards and keep the concepts that make the lesson stick.",
        image: "/assets/items/episode-01-cards.png",
        status: "READY",
      route: "/episode-01-cards/index.html",
        actionLabel: "OPEN CARD PACK",
      },
    ],
  },
  {
    number: 2,
    title: "Tell Me What You Want",
    short: "Make the Ask Useful",
    image: "/assets/episodes/episode-02.png",
    theme: "episode-two",
    description:
      "The one where a vague ask becomes a useful brief—and the answer finally starts helping.",
    items: [
      { name: "Prompting Cheat Sheet", job: "A one-page guide to clearer asks.", status: "READY" },
      { name: "The Brief Fitting Room", type: "Try-On", job: "Turn a fuzzy request into a useful brief.", status: "READY" },
      { name: "Prompt Pieces", type: "Concept Card Pack", job: "Remember the parts that shape a useful ask.", status: "PLANNED" },
    ],
  },
  {
    number: 3,
    title: "The Burn Book Problem",
    short: "Check the Receipts",
    image: "/assets/episodes/episode-03.png",
    theme: "episode-three",
    description:
      "The one where a confident answer gets checked before it borrows your name.",
    items: [
      { name: "Receipt Check Cheat Sheet", job: "The quick guide to checking important claims.", status: "READY" },
      { name: "Show Me the Receipts", type: "Try-On", job: "Challenge one polished answer and inspect its support.", status: "READY" },
      { name: "Trust, But Verify", type: "Concept Card Pack", job: "Remember the moves that keep confidence from becoming proof.", status: "PLANNED" },
    ],
  },
  {
    number: 4,
    title: "The Founding Mothers",
    short: "Meet the Women Behind AI",
    image: "/assets/episodes/episode-04.png",
    theme: "episode-four",
    description:
      "The one where AI stops looking brand-new and starts looking like a long history built by women.",
    items: [
      { name: "Founding Mothers Timeline", job: "See the people and breakthroughs in order.", status: "READY" },
      { name: "The LUMINAiRY Field Trip", type: "Try-On", job: "Follow one idea through the women who moved it forward.", status: "READY" },
      { name: "Founding Mothers", type: "Concept Card Pack", job: "Collect the names, ideas and leaps worth remembering.", status: "PLANNED" },
    ],
  },
];

function EpisodeCard({ episode, onOpen, compact = false }) {
  return (
    <button
      className={`episode-card ${episode.theme} ${compact ? "is-compact" : "is-featured"}`}
      type="button"
      onClick={() => onOpen(episode)}
      aria-label={`Open Episode ${String(episode.number).padStart(2, "0")} Study Pack: ${episode.title}`}
    >
      <div className="episode-art">
        <img src={episode.image} alt="" />
      </div>
      <div className="episode-copy">
        <span className="episode-number">EP {String(episode.number).padStart(2, "0")}</span>
        <div className="episode-details">
          <p>{compact ? "STUDY PACK" : "LATEST · THIS WEEK"}</p>
          <h2>{episode.title}</h2>
          <strong>{episode.short}</strong>
          {!compact && <span>{episode.description}</span>}
        </div>
        <b>OPEN THE PACK</b>
      </div>
    </button>
  );
}

function PackItem({ item, episode, index, onOpen }) {
  const ready = item.status === "READY";
  const fallbackImage = episode.image;
  const content = (
    <>
      <div className="item-image">
        <img src={item.image || fallbackImage} alt="" />
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="item-copy">
        <p>{item.type || item.name}</p>
        <h3>{item.name}</h3>
        <span>{item.job}</span>
        <div className="item-footer">
          <em data-status={item.status}>{item.status}</em>
          <strong>{ready ? item.actionLabel || "OPEN" : item.note || "COMING TO THIS PACK"}</strong>
        </div>
      </div>
    </>
  );

  if (ready && item.route) {
    return (
      <a className="pack-item" href={item.route}>
        {content}
      </a>
    );
  }

  if (ready && item.action) {
    return (
      <button className="pack-item" type="button" onClick={() => onOpen(item.action)}>
        {content}
      </button>
    );
  }

  return (
    <article className={`pack-item ${ready ? "ready-no-route" : "is-held"}`}>
      {content}
    </article>
  );
}

function CheatSheet({ onBack }) {
  useEffect(() => {
    const scan = () => {
      window.svPuffyScan?.();
      const saveRow = document.querySelector("#episode-01-cheat-sheet-save .puffy-save-row");
      const pdfActions = document.querySelector("#episode-01-cheat-sheet-save .pdf-actions");
      if (saveRow && pdfActions && saveRow.parentElement !== pdfActions) {
        pdfActions.prepend(saveRow);
      }
    };
    scan();
    const retry = window.setTimeout(scan, 150);
    return () => window.clearTimeout(retry);
  }, []);

  return (
    <main className="cheat-view">
      <nav className="study-pack-breadcrumb" aria-label="Study Pack breadcrumb">
        <button type="button" className="back-button" onClick={onBack}>
          ← BACK TO EPISODE 01 PACK
        </button>
        <span>EPISODE 01 · CHEAT SHEET</span>
      </nav>

      <section
        className="cheat-actions closet-save term"
        id="episode-01-cheat-sheet-save"
        aria-label="Save, download or print the Cheat Sheet"
        data-puffy-id="study-pack-episode-01-cheat-sheet"
        data-puffy-title="Episode 01 · On Wednesdays We Do AI Cheat Sheet"
        data-puffy-kind="Cheat Sheet"
        data-puffy-action-label="Add Cheat Sheet to your Closet"
        data-puffy-summary="The story, key concepts, memorable analogies and takeaways from Episode 01."
        data-puffy-url="/blend-snap.html#episode-01-cheat-sheet"
        data-puffy-content-version="episode-01-cheat-sheet-2026-07-28"
      >
        <div>
          <p>EPISODE 01 · CHEAT SHEET</p>
          <strong>Read it here—or keep a copy.</strong>
          <span>Add it to your Closet with a Puffy Sticker, download the PDF or print it.</span>
        </div>
        <div className="pdf-actions">
          <a href="/downloads/episode-01-open-the-tab-cheat-sheet-letter.pdf" download>
            DOWNLOAD PDF
          </a>
          <button
            type="button"
            onClick={() => window.open("/downloads/episode-01-open-the-tab-cheat-sheet-letter.pdf", "_blank", "noopener,noreferrer")}
          >
            PRINT PDF
          </button>
        </div>
      </section>

      <article className="cheat-sheet cheat-sheet-detail-source">
        <header className="cheat-hero">
          <img src="/assets/episodes/episode-01.png" alt="On Wednesdays We Do AI episode artwork" />
          <div className="cheat-hero-copy">
            <p>EPISODE 01 · ON WEDNESDAYS WE DO AI</p>
            <h1>Everything to remember.</h1>
            <strong>The story, the point, the funny bits and the AI basics—without squinting at a printable.</strong>
          </div>
        </header>

        <section className="episode-recap" aria-labelledby="recap-title">
          <div className="recap-copy">
            <p>THE EPISODE IN 60 SECONDS</p>
            <h2 id="recap-title">Steve got the standing ovation. She got another thing to learn.</h2>
            <p>At 4:52 on a Tuesday, Steve presents a clean AI-assisted analysis and gets called a visionary. Her better, footnoted version is still sitting in drafts after two weekends.</p>
            <p>He is not smarter. He found the shortcut first. Meanwhile, the AI on-ramp offered her fleece-vest tutorials, empty hype and a forty-hour course she did not have forty hours to take.</p>
            <p className="recap-punchline">That is not a confidence problem. It is a physics problem: you cannot add hours to a day that is already full.</p>
          </div>
          <aside className="episode-point">
            <span>THE POINT</span>
            <strong>AI is being shaped right now. Women need to be learning it, using it and deciding what it becomes.</strong>
            <p>The gap is a starting line—not a finish line. Women bring the thing AI cannot replicate: a career’s worth of judgment.</p>
          </aside>
        </section>

        <figure className="canonical-story-board">
          <article className="story-panel story-panel-wide">
            <img src="/assets/episode-01-canon/01-steve-ovation.png" alt="The Episode 01 boardroom scene: Steve receives applause while the heroine holds her footnoted draft." />
            <div className="story-panel-copy">
              <strong>1 · STEVE FOUND THE SHORTCUT FIRST</strong>
              <p>He got the applause while her careful version stayed in drafts.</p>
            </div>
          </article>
          <article className="story-panel">
            <img src="/assets/episode-01-canon/02-invisible-load.png" alt="The Episode 01 heroine juggles the meeting deck, action items and her own deadline while AI appears as one more demand on her time." />
            <div className="story-panel-copy">
              <strong>2 · THE SHORTCUT LOOKED LIKE ONE MORE JOB</strong>
              <p>The tool that might save her time first looked like one more thing she had to find time to learn.</p>
            </div>
          </article>
          <article className="story-panel">
            <img src="/assets/episode-01-canon/03-first-tiny-win.png" alt="At the Blend and Snap, the Episode 01 heroine tries one real email and reviews the AI first draft with her own judgment." />
            <div className="story-panel-copy">
              <strong>3 · ONE SMALL TASK GOT HER STARTED</strong>
              <p>She skipped the grand project, tried one real email and kept her judgment on the draft.</p>
            </div>
          </article>
        </figure>

        <section className="tiny-win" aria-labelledby="win-title">
          <div>
            <p>THE FIRST TINY WIN</p>
            <h2 id="win-title">Four days of dread. Eleven minutes of work.</h2>
            <p>She gives AI the truth about one delicate email: who it is for, what she needs and what she cannot say out loud. Nine seconds later, there is a first draft.</p>
            <p>The first draft is fast. The useful version still needs the context and judgment only she can supply. The timings belong to this episode’s story—not a benchmark or promise.</p>
          </div>
          <div className="tiny-win-numbers" aria-label="Four days avoiding the email, nine seconds for the first AI draft and eleven minutes to review and send it.">
            <span><b>4 DAYS</b>avoiding it</span><i>→</i>
            <span><b>9 SEC</b>first draft</span><i>→</i>
            <span><b>11 MIN</b>reviewed + sent</span>
          </div>
        </section>

        <section className="analogy-board" aria-labelledby="analogies-title">
          <div className="analogy-heading">
            <p>THE ANALOGIES THAT MAKE IT STICK</p>
            <h2 id="analogies-title">Four ways to explain what AI is doing.</h2>
          </div>
          <div className="analogy-list">
            <article>
              <img src="/assets/episode-01-canon/04-new-hire.png" alt="Episode 01 visual explaining AI as a talented new hire." />
              <div>
                <b>THE TALENTED NEW HIRE</b>
                <p>AI has astonishing range and speed—and zero lived judgment. You onboard it, manage it and review its work.</p>
              </div>
            </article>
            <article>
              <img src="/assets/episode-01-canon/07-carrie-generative-ai.png" alt="Episode 01 visual explaining generative AI through a Carrie Bradshaw analogy." />
              <div>
                <b>CARRIE BRADSHAW IN YOUR LAPTOP</b>
                <p>Give it a subject, useful context and a format, and generative AI can create a new column. The result is not automatic proof.</p>
              </div>
            </article>
            <article>
              <img src="/assets/episode-01-canon/05-cher-context.png" alt="Episode 01 visual explaining context through Cher's closet computer." />
              <div>
                <b>CHER’S CLOSET COMPUTER</b>
                <p>Endless combinations; no idea the meeting is with a hostile client unless you hand over the context.</p>
              </div>
            </article>
            <article>
              <img src="/assets/episode-01-canon/06-burn-book.png" alt="Episode 01 visual explaining hallucination through the Burn Book." />
              <div>
                <b>THE BURN BOOK</b>
                <p>Every entry used in Episode 01 was invented, and every one arrived with the same unbothered confidence. That is the hallucination warning.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="what-it-does" aria-labelledby="does-title">
          <div className="what-it-does-copy">
            <p>UNDER THE HOOD—WITHOUT THE FLEECE VEST</p>
            <h2 id="does-title">Patterns and context produce a new response. The model has not lived your life.</h2>
          </div>
          <div className="concept-visual-column">
            <figure className="learning-visual concept-learning-visual">
              <img
                src="/assets/episode-01-canon/09-concepts-visual-path-v1.png"
                alt="Three Episode 01 comic memory cues: a retro computer creates a fresh page, three different magazine editors work behind three covers, and a magnifying glass reveals problems in a polished document."
              />
            </figure>
            <blockquote className="concept-quote">“It read everything. It’s lived nothing. And it never says ‘I don’t know.’”</blockquote>
            <p className="concept-explainer">A generative-AI product uses a model plus the instructions, context and tools available for the task. The result can be fast, fluent and useful—and still miss the point or invent something.</p>
          </div>
          <dl className="key-terms">
            <div><dt>GENERATIVE AI</dt><dd>AI designed to create content using learned patterns and the instructions or material it receives.</dd></div>
            <div><dt>MODEL</dt><dd>A core component of an AI system that uses inputs to produce outputs. Products can combine models with tools and other components.</dd></div>
            <div><dt>HALLUCINATION</dt><dd>False, erroneous or unsupported content presented as part of an answer. Confidence is not evidence.</dd></div>
          </dl>
        </section>

        <section className="takeaway-map" aria-labelledby="takeaway-title">
          <div>
            <p>WHAT TO REMEMBER WHEN YOU OPEN THE TAB</p>
            <h2 id="takeaway-title">Start before you feel ready. Keep your judgment.</h2>
          </div>
          <figure className="learning-visual takeaway-learning-visual">
            <img
              src="/assets/episode-01-canon/10-three-step-path-v2.png"
              alt="A three-panel Episode 01 comic: the heroine chooses one small email task, gives the AI a person, goal and factual checklist as context, then reviews and corrects the draft herself."
            />
          </figure>
          <ol className="takeaway-list">
            <li><b>1</b><strong>START SMALL</strong><span>Choose one low-risk task you already understand.</span></li>
            <li><b>2</b><strong>GIVE CONTEXT</strong><span>Say who it is for, what you need and what matters.</span></li>
            <li><b>3</b><strong>MAKE THE FINAL CALL</strong><span>Check the result, change what needs changing and decide whether to use it.</span></li>
          </ol>
        </section>

        <section className="phrase-strip" aria-labelledby="episode-lines-title">
          <h2 id="episode-lines-title">THE FUNNY BITS</h2>
          <div className="phrase-cards">
            <blockquote>“Get in, loser. We’re learning AI.”</blockquote>
            <blockquote>“Steve has never once refilled the printer.”</blockquote>
            <blockquote>“Regina George energy. But make it AI.”</blockquote>
          </div>
        </section>

        <footer className="cheat-footer">
          <div className="cheat-sources">
            <p><strong>SOURCES / FRESHNESS</strong> Checked 28 July 2026.</p>
            <p>
              <a href="https://www.library.hbs.edu/working-knowledge/women-are-avoiding-using-artificial-intelligence-can-that-hurt-their-careers">HBS Working Knowledge</a>
              {" · "}
              <a href="https://libertystreeteconomics.newyorkfed.org/2024/10/exposure-to-generative-ai-and-expectations-about-inequality/">New York Fed</a>
              {" · "}
              <a href="https://www.bcg.com/publications/2024/women-leaders-in-tech-are-paving-the-way-in-genai">BCG</a>
            </p>
            <p>Updated 28 July 2026: readable web Cheat Sheet plus a separate one-page PDF.</p>
          </div>
        </footer>
      </article>
    </main>
  );
}

export function App() {
  const reviewTarget = new URLSearchParams(window.location.search).get("review");
  const directCheatSheet = reviewTarget === "episode-01-cheat-sheet";
  const directEpisodePack = reviewTarget === "episode-01-pack";
  const [selected, setSelected] = useState(directCheatSheet || directEpisodePack ? episodes[0] : null);
  const [activeItem, setActiveItem] = useState(directCheatSheet ? "cheat-sheet" : null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [selected, activeItem]);

  if (selected?.number === 1 && activeItem === "cheat-sheet") {
    return <CheatSheet onBack={() => setActiveItem(null)} />;
  }

  if (selected) {
    return (
      <main className={`storefront pack-page ${selected.theme}`}>
        <nav className="study-pack-breadcrumb" aria-label="Study Pack breadcrumb">
          <button type="button" className="back-button" onClick={() => {
            setActiveItem(null);
            setSelected(null);
          }}>
            ← ALL STUDY PACKS
          </button>
          <span>EPISODE {String(selected.number).padStart(2, "0")} · STUDY PACK</span>
        </nav>

        <section className="pack-hero">
          <div className="pack-hero-image">
            <img src={selected.image} alt="" />
          </div>
          <div className="pack-hero-copy">
            <p>EPISODE {String(selected.number).padStart(2, "0")} · STUDY PACK</p>
            <h1>{selected.title}</h1>
            <strong>{selected.short}</strong>
            <span>{selected.description}</span>
          </div>
        </section>

        <section className="inside-pack">
          <div className="section-heading">
            <div>
              <p>OPEN THE PACK</p>
              <h2>Choose where you want to begin.</h2>
            </div>
            <span>
              Each item has one job. Start with the one that helps you now—or use all three.
            </span>
          </div>
          <div className="item-grid">
            {selected.items.map((item, index) => (
              <PackItem
                item={item}
                episode={selected}
                index={index}
                onOpen={setActiveItem}
                key={item.name}
              />
            ))}
          </div>
        </section>

        <section className="quiz-next">
          <div>
            <p>NEXT DOOR · SUNNYVAiLE HIGH</p>
            <h2>Ready to see what stuck?</h2>
            <span>The Pop Quiz checks understanding. It is a next step—not another item stuffed into the pack.</span>
          </div>
          <a href="http://127.0.0.1:4183/learn/quiz.html#quiz-start">GO TO THE POP QUIZ</a>
        </section>
      </main>
    );
  }

  const releasedPacks = [...episodes].sort((a, b) => a.number - b.number);
  const thisWeek = releasedPacks.at(-1);
  const otherPacks = releasedPacks.slice(0, -1);

  return (
    <main className="storefront">
      <section className="storefront-intro">
        <div>
          <p>THE STUDY PACKS AT BLEND &amp; SNAP</p>
          <h1>Pick the lesson you want to keep.</h1>
        </div>
        <span>
          Cheat Sheet, Try-On and cards—all together for every episode.
        </span>
      </section>

      <section className="pack-board" aria-labelledby="pack-board-title">
        <div className="pack-board-header">
          <div>
            <p>BLEND &amp; SNAP · ALL ON THE HOUSE</p>
            <h2 id="pack-board-title">The Study Pack Board</h2>
          </div>
          <span>Choose an episode, then choose where to begin.</span>
        </div>

        <div className="this-week" aria-labelledby="latest-pack-title">
          <div className="latest-heading">
            <span>LATEST</span>
            <strong id="latest-pack-title">
              Episode {String(thisWeek.number).padStart(2, "0")} · This week’s Study Pack
            </strong>
          </div>
          <EpisodeCard episode={thisWeek} onOpen={(episode) => {
            setActiveItem(null);
            setSelected(episode);
          }} />
        </div>

        <div className="board-divider" aria-hidden="true">
          <span>MORE PACKS</span>
        </div>

        <div className="all-packs">
          <div className="section-heading">
            <div>
              <p>EARLIER EPISODES</p>
              <h2>Pick another pack</h2>
            </div>
            <span>Every released Study Pack stays available here.</span>
          </div>
          <div className="episode-grid">
            {otherPacks.map((episode) => (
              <EpisodeCard
                episode={episode}
                onOpen={(nextEpisode) => {
                  setActiveItem(null);
                  setSelected(nextEpisode);
                }}
                compact
                key={episode.number}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
