import { useEffect, useState } from "react";
import sheet from "../../../../episode-editorial-review-2026-09-06/episode-01/cheat-sheet.md?raw";
import previousSheet from "../../../../episode-editorial-review-2026-09-06/episode-01/cheat-sheet-2026-09-06-v1.md?raw";
import {useCardBinder} from "../../../episode-01-trading-card-pack-20260728/prototype/src/useCardBinder.js";


const episodes = [
  {
    number: 1,
    title: "On Wednesdays We Do AI",
    short: "Open the Tab",
    image: "/assets/episodes/episode-01-chick-flicks.jpg",
    theme: "episode-one",
    description:
      "The one where opening the tab becomes a first safe, useful step—not another thing you were supposed to know already.",
    items: [
      {
        name: "Everything to Remember",
        type: "Cheat Sheet",
        job: "The lesson summary and critical ideas to return to.",
        image: "/assets/items/episode-01-cheat.png",
        status: "READY",
        action: "cheat-sheet",
        actionLabel: "OPEN CHEAT SHEET",
      },
      {
        name: "Three Tabs, One Task",
        type: "Try-On",
        job: "Try one small task in an available tool. Add another if you want to compare.",
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

function Inline({text}) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part,index)=>part.startsWith('**')?<strong key={index}>{part.slice(2,-2)}</strong>:part);
}
function CheatSheet({onBack, fromSavedLink}) {
  const requested = fromSavedLink ? new URLSearchParams(location.search).get('packVersion') : null;
  if (requested !== null && !['2026-09-06-v1','2026-09-06-v2'].includes(requested)) return <main className="cheat-view"><section className="cheat-actions"><div><h1>This saved edition cannot be opened here.</h1><p>Your saved Cheat Sheet has not been changed.</p><a href="/laidies-card.html#episodeBinderVessel">Return to my Episode Binder</a></div></section></main>;
  return <CurrentCheatSheet key={requested || '2026-09-06-v2'} onBack={onBack} version={requested || '2026-09-06-v2'} />;
}

function CurrentCheatSheet({onBack,version}) {
  const binder=useCardBinder([{id:'episode-01-cheat-sheet'}],version,'packs');
  const content = version === '2026-09-06-v1' ? previousSheet : sheet;
  const sections=content.split(/^## /m).slice(1).map(block=>{const [title,...lines]=block.trim().split('\n');return {title,blocks:lines.join('\n').trim().split(/\n\n+/)};});
  return <main className="cheat-view" data-clarity-mask="True">
    <nav className="study-pack-breadcrumb" aria-label="Study Pack breadcrumb"><button type="button" className="back-button" onClick={onBack}>← BACK TO EPISODE 01 PACK</button><span>EPISODE 01 · CHEAT SHEET</span></nav>
    <section className="cheat-actions" aria-label="Save the Cheat Sheet">
      <div><strong>Keep the lesson handy.</strong><p role="status">{binder.message}</p></div>
      <div className="pdf-actions">{binder.guest?<a href="/laidies-card.html" target="_blank" rel="noreferrer">SIGN IN TO SAVE</a>:<button type="button" disabled={binder.busy} onClick={binder.save}>{binder.retry?'RETRY SAVE':'SAVE TO MY BINDER'}</button>}<a href="/laidies-card.html#episodeBinderVessel">OPEN MY BINDER</a></div>
    </section>
    <article className="cheat-sheet cheat-sheet-detail-source current-summary">
      <header className="cheat-hero"><img src="/assets/episodes/episode-01-chick-flicks.jpg" alt="On Wednesdays We Do AI episode artwork"/><div className="cheat-hero-copy"><p>EPISODE 01 · CHEAT SHEET</p><h1>On Wednesdays We Do AI</h1></div></header>
      <div className="summary-sections">{sections.map(({title,blocks},index)=><section className={`summary-section summary-section-${index}`} key={title}><h2>{title}</h2>{blocks.map((block,i)=>block.startsWith('- ')?<ul key={i}>{block.split('\n').map((line,j)=><li key={j}><Inline text={line.slice(2)}/></li>)}</ul>:<p key={i}><Inline text={block}/></p>)}</section>)}</div>
      <figure className="learning-visual takeaway-learning-visual"><img src="/assets/episode-01-canon/10-three-step-path-v2.png" alt="Choose one small task, provide the person, goal and facts, then check and edit the draft."/></figure>
    </article>
  </main>;
}

function EpisodeOnePack({onOpen}) {
  return <main className="study-desk">
    <div className="pack-desk-label"><span>BLEND &amp; SNAP</span><h1>Episode 01 · Your study pack</h1><a href="/laidies-card.html#episodeBinderVessel">Keep it in my Closet ↗</a></div>
    <div className="study-binder">
      <div className="binder-rings" aria-hidden="true"><i/><i/><i/></div>
      <section className="binder-leaf binder-left" aria-label="Episode cover and Cheat Sheet">
        <div className="binder-cover"><img src="/assets/episodes/episode-01-chick-flicks.jpg" alt="Episode 01: On Wednesdays We Do AI. The current pink, purple and electric-blue Chick Flicks cover."/></div>
        <button className="pack-summary-sheet" onClick={()=>onOpen('cheat-sheet')}>
          <span className="sheet-corner" aria-hidden="true"/><span className="pack-object-label">01 / THE CHEAT SHEET</span>
          <strong>The lesson.<br/>All the useful bits.</strong>
          <span className="pack-highlight">Why women need a say.</span>
          <span>What AI does. What to question.<br/>One small place to start.</span>
          <b className="pack-object-action">Open your lesson summary ↗</b>
        </button>
        <p className="binder-left-note">On Wednesdays we learn it.<br/><strong>Then we make it useful.</strong></p>
      </section>
      <section className="binder-leaf binder-right" aria-label="Your exercises and trading cards">
        <a className="pack-exercise-book" href="/episode-01-try-on/index.html">
          <span className="exercise-binding" aria-hidden="true"/>
          <span className="pack-object-label">02 / YOUR TRY-ON</span>
          <strong>Three tabs.<br/>One task.<span className="hand-drawn-underline" aria-hidden="true"/></strong>
          <span className="exercise-prompt">Your request → their drafts → your edit.</span>
          <b className="pack-object-action">Open your exercise ↗</b>
        </a>
        <a className="pack-card-pocket" href="/episode-01-cards/index.html" aria-label="Open your four trading cards">
          <div className="pocket-card-fan" aria-hidden="true"><img src="/episode-01-cards/assets/cards/hallucination-episode-art-v2.png" alt=""/><img src="/episode-01-cards/assets/cards/model-episode-art-v3.png" alt=""/><img src="/episode-01-cards/assets/cards/generative-ai-episode-art-v2.png" alt=""/></div>
          <div className="pocket-front"><span className="pack-object-label">03 / TRADING CARDS</span><strong>Four ideas.<br/>Worth keeping.</strong><b className="pack-object-action">Open the card pack ↗</b></div>
        </a>
      </section>
      <nav className="binder-divider-tabs" aria-label="Open a study pack item"><button onClick={()=>onOpen('cheat-sheet')}>Summary</button><a href="/episode-01-try-on/index.html">Try-On</a><a href="/episode-01-cards/index.html">Cards</a></nav>
    </div>
    <a className="pack-quiz-ticket" href="/learn/quiz.html?issue=1&version=2026-09-06-v3"><span>UP NEXT<br/><b>SUNNYVAiLE HIGH</b></span><strong>Ready for your Pop Quiz?</strong><span>Test what stuck. ↗</span></a>
  </main>;
}

export function App() {
  const reviewTarget = new URLSearchParams(window.location.search).get("review");
  const directCheatSheet = reviewTarget === "episode-01-cheat-sheet" || location.hash === "#episode-01-cheat-sheet";
  const directEpisodePack = reviewTarget === "episode-01-pack" || location.hash === "#episode-01-pack";
  const [selected, setSelected] = useState(directCheatSheet || directEpisodePack ? episodes[0] : null);
  const [activeItem, setActiveItem] = useState(directCheatSheet ? "cheat-sheet" : null);
  useEffect(() => {
    const syncLocation = () => {
      if (location.hash === '#episode-01-pack' || location.hash === '#episode-01-cheat-sheet') {
        setSelected(episodes[0]);
        setActiveItem(location.hash === '#episode-01-cheat-sheet' ? 'cheat-sheet' : null);
      }
    };
    window.addEventListener('hashchange', syncLocation);
    window.addEventListener('popstate', syncLocation);
    return () => { window.removeEventListener('hashchange', syncLocation); window.removeEventListener('popstate', syncLocation); };
  }, []);
  const openEpisodeItem = item => {
    const url = new URL(location.href);
    url.hash = item === 'cheat-sheet' ? 'episode-01-cheat-sheet' : 'episode-01-pack';
    url.searchParams.delete('review');
    if (item === 'cheat-sheet') url.searchParams.set('packVersion', '2026-09-06-v2');
    history.pushState({}, '', url);
    setActiveItem(item);
  };


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [selected, activeItem]);

  if (selected?.number === 1 && activeItem === "cheat-sheet") {
    return <CheatSheet fromSavedLink={directCheatSheet} onBack={() => openEpisodeItem(null)} />;
  }

  if (selected?.number === 1) return <EpisodeOnePack onOpen={openEpisodeItem} />;

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
          <a className="back-button" href={`/issues/issue-${String(selected.number).padStart(2, "0")}.html`}>READ THE EPISODE</a>
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
            <span>Check your understanding, see why each answer fits and keep your attempt in the Episode Binder.</span>
          </div>
          <a href={`/learn/quiz.html?issue=${selected.number}${selected.number===1?"&version=2026-09-06-v3":""}#quiz-start`}>GO TO THE POP QUIZ</a>
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
